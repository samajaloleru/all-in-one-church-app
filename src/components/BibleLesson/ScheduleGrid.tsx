import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { MonthSchedule } from "@/types/bible-lession/monthSchedule";
import { DateCard } from "@/components/BibleLesson/DateCard";

export const ScheduleGrid = ({ 
  monthSchedule, 
  isTodaysDate 
}: { 
  monthSchedule: MonthSchedule; 
  isTodaysDate: (dateStr: string) => boolean;
}) => {
  const fetchMoreData = () => {
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, i) => 
        `https://picsum.photos/400/600?random=10`
      );
    }, 1500);
  };

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
        <p className="text-gray-500">No lessons scheduled for this month.</p>
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