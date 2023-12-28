import { DB } from "./deps.ts";
import type { LogEntry } from "./types.ts";

const db = new DB("test.db");

export function log(logEntry: LogEntry) {
  try {
    const { ua, url, referrer, visitorId } = logEntry;
    const browser = ua.browser.name;
    const browserVersion = ua.browser.version;
    const os = ua.os.name;
    const osVersion = ua.os.version;
    const fullUa = ua.toString();

    db.query(
      `INSERT INTO visits (datetime, browser, browserVersion, os, osVersion, fullUa,  url, referrer, visitorId)
              VALUES (DATETIME('now'),  ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        browser,
        browserVersion,
        os,
        osVersion,
        fullUa,
        url,
        referrer,
        visitorId,
      ],
    );
  } catch (error) {
    console.error("error inserting", error);
  }
}

export function read() {
  try {
    const data = db.query(`SELECT * FROM visits`);
    return data;
  } catch (error) {
    console.error("error reading", error);
  }
}
