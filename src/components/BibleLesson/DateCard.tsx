import { useLanguage } from "@/context/LanguageContext";
import { convert24HourTo12Hour, parseBiblePassage } from "@/lib/helper";
import { DateSchedule } from "@/types/bible-lession";
import { useRouter } from "next/router";

export const DateCard = ({ 
  dateSchedule,
  isToday 
}: { 
  dateSchedule: DateSchedule;
  isToday: boolean;
}) => {
  const router = useRouter();
  const { locale } = useLanguage();
  const formattedDate = new Date(dateSchedule.date).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric'
  });

  const handleBiblePassageClick = (passage: string) => {
    const parsed = parseBiblePassage(passage);
    if (parsed) {
      // Navigate to the Bible chapter page with the verse as a hash
      router.push(`/bible/${parsed.book}/${parsed.chapter}#verse-${parsed.verse}`);
    }
  };
  
  return (
    <div 
      className={`bg-white mb-5 rounded-2xl shadow-md overflow-hidden transition-transform break-inside-avoid relative group ${
        isToday ? 'border-2 border-rose-400' : 'border border-rose-200'
      }`}
    >
      <div className="p-5">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="">
              <h3 className="text-xl font-bold text-zinc-900 capitalize">
                {formattedDate}
              </h3>
              <p className="text-rose-800 text-sm items-center-safe">{dateSchedule.day}</p>
            </div>
            <div className="bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full text-sm font-semibold">
              {dateSchedule.date.split('-')[2]} {dateSchedule.day.substring(0, 3)} 
            </div>
          </div>
          <p className="text-rose-500 text-xs font-semibold tracking-tight">{dateSchedule.serviceName}</p>
        </div>
        
        <div className="space-y-5 text-sm">
          {dateSchedule.sessions.map((session) => (
            <div key={session.id} className="border-t border-rose-100 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-zinc-500 rounded-full"></div>
                <p className="font-medium text-zinc-700">
                  {session.timeOfTheDay} · {convert24HourTo12Hour(session.time)}
                </p>
              </div>
              
              <div className="space-y-3">
                {session.bibleReadings.map((reading, idx) => {
                  const parsedPassage = parseBiblePassage(reading.passage);
                  return (
                    <div key={idx} className="p-3 bg-zinc-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-rose-600 mb-1">
                        {reading.lesson}
                      </h4>
                      {parsedPassage ? (
                        <button
                          onClick={() => handleBiblePassageClick(reading.passage)}
                          className="font-medium text-zinc-900 hover:text-zinc-700 underline cursor-pointer text-left"
                        >
                          {reading.passage}
                        </button>
                      ) : (
                        <p className="font-medium text-zinc-900">{reading.passage}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};