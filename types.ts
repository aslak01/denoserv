import { UserAgent } from "./deps.ts";

export type LogEntry = {
  ua: UserAgent;
  url: string;
  referrer: string;
  visitorId: string;
};
