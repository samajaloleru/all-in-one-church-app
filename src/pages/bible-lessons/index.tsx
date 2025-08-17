import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import Footer from '../../components/Footer';
import { MonthSelector } from '@/components/BibleLesson/MonthSelector';
import { ScheduleGrid } from '@/components/BibleLesson/ScheduleGrid';
import { TodayLesson } from '@/components/BibleLesson/TodayLesson';
import Header from '@/components/Header';
import { scheduleData } from '@/constant/bible-lesson/2025/en';
import { DateSchedule } from '@/types/bible-lession/dateSchedule';
import { formatDateString } from '@/lib/helper';

export default function BibleLessons() {
  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [todaysSchedule, setTodaysSchedule] = useState<DateSchedule | null>(null);
  const [currentDate] = useState(new Date());
  
  // Transform schedule data
  const transformedScheduleData = useMemo(() => {
    return scheduleData.map(month => ({
      ...month,
      key: `${month.month} ${month.year}`
    }));
  }, []);

  // Function to check if a date is today
  const isTodaysDate = (dateStr: string) => {
    const today = new Date();
    const date = new Date(dateStr);
    
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  // Initialize active month to current month
  useEffect(() => {
    const currentMonth = formatDateString(new Date().toISOString());
    const foundMonth = transformedScheduleData.find(
      month => month.key === currentMonth
    );
    
    if (foundMonth) {
      setActiveMonth(foundMonth.key);
      
      // Find today's lesson
      const todaysDate = foundMonth.dates.find(date => 
        isTodaysDate(date.date)
      );
      setTodaysSchedule(todaysDate || null);
    } else if (transformedScheduleData.length > 0) {
      setActiveMonth(transformedScheduleData[0].key);
    }
  }, [transformedScheduleData]);
  
  // Update todaysLesson when active month changes
  useEffect(() => {
    if (activeMonth) {
      const monthSchedule = transformedScheduleData.find(
        month => month.key === activeMonth
      );
      
      if (monthSchedule) {
        const todaysDate = monthSchedule.dates.find(date => 
          isTodaysDate(date.date)
        );
        setTodaysSchedule(todaysDate || null);
      }
    }
  }, [activeMonth, transformedScheduleData]);
  
  // Get months for selector
  const months = useMemo(() => {
    return transformedScheduleData.map(month => month.key);
  }, [transformedScheduleData]);

  // Get active month schedule
  const activeMonthSchedule = useMemo(() => {
    if (!activeMonth) return null;
    return transformedScheduleData.find(month => month.key === activeMonth) || null;
  }, [activeMonth, transformedScheduleData]);

  return (
    <>
      <Head>
        <title>Bible Lessons Schedule</title>
        <meta name="description" content="Monthly Bible lessons schedule" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto container">
          {/* <Header 
            title="BIBLE LESSONS - LECTURES BIBLIQUES"
            subtitle={activeMonth ? activeMonth.toUpperCase() : 'LOADING...'}
          /> */}

          <TodayLesson schedule={todaysSchedule} />

          <MonthSelector 
            months={months} 
            activeMonth={activeMonth} 
            setActiveMonth={setActiveMonth} 
          />

          {activeMonthSchedule && (
            <ScheduleGrid 
              monthSchedule={activeMonthSchedule} 
              isTodaysDate={isTodaysDate} 
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}