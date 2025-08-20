import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { MonthSelector } from "@/components/BibleLesson/MonthSelector";
import { ScheduleGrid } from "@/components/BibleLesson/ScheduleGrid";
import { TodayLesson } from "@/components/BibleLesson/TodayLesson";
import { scheduleDataEn } from "@/constant/bible-lesson/2025/en";
import { scheduleDataFr } from "@/constant/bible-lesson/2025/fr";
import { DateSchedule } from "@/types/bible-lession/dateSchedule";
import { formatDateString } from "@/lib/helper";
import { useLanguage } from "@/context/LanguageContext";
import { MonthSchedule } from "@/types/bible-lession/monthSchedule";
import { BasicLayout } from "@/components/Layout/BasicLayout";

/** Mapping language → schedule */
type ScheduleMap = Record<string, MonthSchedule[]>;

type HeaderMap = Record<string, {
  title: string;
  description: string;
}>;

export default function BibleLessons() {
  const { language } = useLanguage();

  const headerDataEn = {
    title: "Bible Lessons Schedule",
    description: "Explore the monthly Bible lessons and today's lesson."
  };

  const headerDataFr= {
    title: "Calendrier des leçons bibliques",
    description: "Découvrez le calendrier mensuel des leçons bibliques et la leçon du jour."
  };

  // Language → schedule mapping
  const scheduleMap: ScheduleMap = {
    en: scheduleDataEn,
    fr: scheduleDataFr,
    // es: scheduleDataEs,
    // yo: scheduleDataYo,
  };
  
  const headerMap: HeaderMap = {
    en: headerDataEn,
    fr: headerDataFr,
    // es: scheduleDataEs,
    // yo: scheduleDataYo,
  };

  // Select schedule or fallback to English
  const scheduleData: MonthSchedule[] = scheduleMap[language] ?? scheduleDataEn;
  
  const headerData = headerMap[language] ?? headerDataEn;

  const [activeMonth, setActiveMonth] = useState<string | null>(null);
  const [todaysSchedule, setTodaysSchedule] = useState<DateSchedule | null>(null);

  // Transform schedule data (add unique key)
  const transformedScheduleData: MonthSchedule[] = useMemo(() => {
    return scheduleData.map((month) => ({
      ...month,
      key: `${month.month} ${month.year}`,
    }));
  }, [scheduleData]);

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
      (month) => month.key === currentMonth
    );

    if (foundMonth) {
      setActiveMonth(foundMonth.key ?? null);

      // Find today's lesson
      const todaysDate = foundMonth.dates.find((date) =>
        isTodaysDate(date.date)
      );
      setTodaysSchedule(todaysDate || null);
    } else if (transformedScheduleData.length > 0) {
      setActiveMonth(transformedScheduleData[0].key ?? null);
    }
  }, [transformedScheduleData]);

  // Update todaysLesson when active month changes
  useEffect(() => {
    if (activeMonth) {
      const monthSchedule = transformedScheduleData.find(
        (month) => month.key === activeMonth
      );

      if (monthSchedule) {
        const todaysDate = monthSchedule.dates.find((date) =>
          isTodaysDate(date.date)
        );
        setTodaysSchedule(todaysDate || null);
      }
    }
  }, [activeMonth, transformedScheduleData]);

  // Get months for selector
  const months: string[] = useMemo(() => {
    return transformedScheduleData.map((month) => month.key ?? "");
  }, [transformedScheduleData]);

  // Get active month schedule
  const activeMonthSchedule: MonthSchedule | null = useMemo(() => {
    if (!activeMonth) return null;
    return (
      transformedScheduleData.find((month) => month.key === activeMonth) ||
      null
    );
  }, [activeMonth, transformedScheduleData]);

  return (
    <>
      <Head>
        <title>Bible Lessons Schedule</title>
        <meta name="description" content="Monthly Bible lessons schedule" />
      </Head>
      <BasicLayout
        title={headerData.title}
        description={headerData.description}
      >
        <div className="max-w-6xl mx-auto container">
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
      </BasicLayout>
    </>
  );
}
