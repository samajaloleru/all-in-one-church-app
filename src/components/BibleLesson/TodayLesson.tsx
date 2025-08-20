import { bibleLessonTranslations } from "@/constant/translations/bible-lesson";
import { useLanguage } from "@/context/LanguageContext";

interface DateSchedule {
  date: string;
  day: string;
  sessions: Session[];
}

interface Session {
  id: string;
  timeOfTheDay: string;
  time: string;
  bibleReadings: BibleReading[];
}

interface BibleReading {
  lesson: string;
  passage: string;
}
export const TodayLesson = ({ schedule }: { schedule: DateSchedule | null }) => {
  const { locale, language } = useLanguage();
  const t = bibleLessonTranslations[language]; 

  if (!schedule) return null;
  
  return (
    <div className="mb-10 mt-5 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl shadow-lg border border-amber-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-amber-800">{t.todayLesson}</h2>
        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {t.today}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">{t.date}</h3>
          <p className="text-lg font-bold capitalize">
            {new Date(schedule.date).toLocaleDateString(locale, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">{t.day}</h3>
          <p className="text-lg font-bold">{schedule.day}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">{t.sessions}</h3>
          {schedule.sessions.map((session) => (
            <div key={session.id} className="mb-3">
              <p className="font-medium">{session.timeOfTheDay}: {session.time}</p>
              <div className="mt-1">
                {session.bibleReadings.map((reading, idx) => (
                  <p key={idx} className="text-sm">
                    {reading.lesson}: {reading.passage}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};