import { DateSchedule } from "./dateSchedule";

export interface MonthSchedule {
  month: string;
  year: number;
  dates: DateSchedule[];
  key?: string;
}