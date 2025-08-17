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
  if (!schedule) return null;
  
  return (
    <div className="mb-10 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl shadow-lg border border-amber-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-amber-800">Today&apos;s Lesson</h2>
        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          TODAY
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">Date</h3>
          <p className="text-lg font-bold">
            {new Date(schedule.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">Day</h3>
          <p className="text-lg font-bold">{schedule.day}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">Sessions</h3>
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