export interface BibleReading {
  lesson: string;
  passage: string;
}

export  interface DateSchedule {
  date: string;
  day: string;
  serviceName: string;
  sessions: Session[];
}

export interface MonthSchedule {
  month: string;
  year: number;
  dates: DateSchedule[];
  key?: string;
}

export interface Session {
  id: string;
  timeOfTheDay: string;
  time: string;
  bibleReadings: BibleReading[];
}