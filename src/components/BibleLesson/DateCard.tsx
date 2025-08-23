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
        isToday ? 'border-2 border-amber-400' : 'border border-gray-200'
      }`}
    >
      <div className="p-5">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="">
              <h3 className="text-xl font-bold text-indigo-900 capitalize">
                {formattedDate}
              </h3>
              <p className="text-gray-800 text-sm items-center-safe">{dateSchedule.day}</p>
            </div>
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
              {dateSchedule.date.split('-')[2]} {dateSchedule.day.substring(0, 3)} 
            </div>
          </div>
          <p className="text-gray-500 text-xs font-semibold tracking-tight">{dateSchedule.serviceName}</p>
        </div>
        
        <div className="space-y-5 text-sm">
          {dateSchedule.sessions.map((session) => (
            <div key={session.id} className="border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <p className="font-medium text-indigo-700">
                  {session.timeOfTheDay} · {convert24HourTo12Hour(session.time)}
                </p>
              </div>
              
              <div className="space-y-3">
                {session.bibleReadings.map((reading, idx) => {
                  const parsedPassage = parseBiblePassage(reading.passage);
                  return (
                    <div key={idx} className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-600 mb-1">
                        {reading.lesson}
                      </h4>
                      {parsedPassage ? (
                        <button
                          onClick={() => handleBiblePassageClick(reading.passage)}
                          className="font-medium text-indigo-900 hover:text-indigo-700 underline cursor-pointer text-left"
                        >
                          {reading.passage}
                        </button>
                      ) : (
                        <p className="font-medium text-indigo-900">{reading.passage}</p>
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