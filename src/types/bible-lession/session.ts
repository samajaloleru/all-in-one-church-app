import { BibleReading } from "./bible-reading";

export interface Session {
  id: string;
  timeOfTheDay: string;
  time: string;
  bibleReadings: BibleReading[];
}