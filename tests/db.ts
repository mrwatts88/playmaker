import * as schema from "@/db/schema/schema";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const TABLE_NAMES = [
  "teams",
  "athletes",
  "contests",
  "games",
  "contest_games",
  "game_events",
  "users",
  "contestants",
  "roster_members",
  "boosts",
  "contest_boosts",
  "contestant_boosts",
];

export async function setupTestDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("TEST_DATABASE_URL is not set");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  // Clean up any existing data
  for (const table of TABLE_NAMES) {
    await db.execute(`TRUNCATE TABLE ${table} CASCADE`);
  }

  return { db, sql };
}
