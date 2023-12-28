import { DB, UserAgent } from "./deps.ts";

const db = new DB("test.db");

export function log(UA: UserAgent, host: string, url: string) {
  try {
    const browser = UA.browser.name;
    const browserVersion = UA.browser.version;
    const os = UA.os.name;
    const osVersion = UA.os.version;
    const fullUa = UA.toString();

    db.query(
      `INSERT INTO visits (datetime, browser, browserVersion, os, osVersion, fullUa, host, url)
              VALUES (DATETIME('now'), ?, ?, ?, ?, ?, ?, ?)`,
      [browser, browserVersion, os, osVersion, fullUa, host, url],
    );
  } catch (error) {
    console.error("error inserting", error);
  }
}

export async function read() {
  try {
    const data = await db.query(`SELECT * FROM visits`);
    return data;
  } catch (error) {
    console.error("error reading", error);
  }
}
