import { Session } from "./session";

export  interface DateSchedule {
  date: string;
  day: string;
  serviceName: string;
  sessions: Session[];
}