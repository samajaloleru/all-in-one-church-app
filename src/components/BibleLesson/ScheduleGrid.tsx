import Masonry from "react-masonry-css";
import { DateCard } from "@/components/BibleLesson/DateCard";
import { MonthSchedule } from "@/types/bible-lession";

export const ScheduleGrid = ({ 
  monthSchedule, 
  isTodaysDate 
}: { 
  monthSchedule: MonthSchedule; 
  isTodaysDate: (dateStr: string) => boolean;
}) => {

  const breakpoints ={
    default: 4,
    1200: 3,
    1000: 2,
    500: 1,
  }

  if (!monthSchedule) return null;
  
  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex gap-5"
      columnClassName="bg-clip-padding"
    >
    {monthSchedule.dates.length === 0 ? (
      <div className="col-span-full text-center py-8">
        <p className="text-rose-500">No lessons scheduled for this month.</p>
      </div>
    ) : (
      monthSchedule.dates.map(date => (
        <DateCard 
          key={date.date} 
          dateSchedule={date}
          isToday={isTodaysDate(date.date)} 
        />
      ))
    )}
    </Masonry>
  );
};