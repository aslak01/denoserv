import { DB } from "./deps.ts";

const db = new DB("test.db");

export function seed() {
  try {
    db.execute(`
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      datetime DATETIME,
      browser TEXT,
      browserVersion TEXT,
      os TEXT,
      osVersion TEXT,
      fullUa TEXT,
      host TEXT,
      url TEXT
    )
  `);
  } catch (error) {
    console.error("error seeding", error);
  }
}

seed();
