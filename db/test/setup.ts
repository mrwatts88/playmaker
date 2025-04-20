import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../schema/schema";

if (!process.env.TEST_DATABASE_URL) {
  throw new Error("TEST_DATABASE_URL is not set");
}

const sql = neon(process.env.TEST_DATABASE_URL);
export const testDb = drizzle(sql, { schema });

export async function setupTestDb() {
  // Create tables if they don't exist
  await testDb.execute(sql`
    CREATE TABLE IF NOT EXISTS teams (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT,
      league league_type
    );

    CREATE TABLE IF NOT EXISTS athletes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT,
      team_id UUID REFERENCES teams(id) NOT NULL,
      position TEXT,
      cost INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contests (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      start_time TIMESTAMP,
      status contest_status,
      league league_type NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS games (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT,
      start_time TIMESTAMP,
      status game_status,
      home_team_id UUID REFERENCES teams(id) NOT NULL,
      away_team_id UUID REFERENCES teams(id) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS contest_games (
      game_id UUID REFERENCES games(id) NOT NULL,
      contest_id UUID REFERENCES contests(id) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (game_id, contest_id)
    );

    CREATE TABLE IF NOT EXISTS game_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      game_id UUID REFERENCES games(id) NOT NULL,
      athlete_id UUID REFERENCES athletes(id),
      event_type event_type,
      value INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS contestants (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      contest_id UUID REFERENCES contests(id) NOT NULL,
      user_id UUID REFERENCES users(id) NOT NULL,
      name TEXT NOT NULL,
      total_xp INTEGER DEFAULT 0 NOT NULL,
      spendable_xp INTEGER DEFAULT 0 NOT NULL,
      stat_power JSONB DEFAULT '{}' NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      UNIQUE (user_id, contest_id)
    );

    CREATE TABLE IF NOT EXISTS roster_members (
      contestant_id UUID REFERENCES contestants(id) NOT NULL,
      athlete_id UUID REFERENCES athletes(id) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (contestant_id, athlete_id)
    );

    CREATE TABLE IF NOT EXISTS boosts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT,
      description TEXT,
      cost INTEGER,
      type boost_type,
      stat stat_type,
      requirement INTEGER,
      value NUMERIC,
      action boost_action,
      duration INTEGER
    );

    CREATE TABLE IF NOT EXISTS contest_boosts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      contest_id UUID REFERENCES contests(id) NOT NULL,
      boost_id UUID REFERENCES boosts(id) NOT NULL,
      expires_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function cleanupTestDb() {
  // Drop all tables
  await testDb.execute(sql`
    DROP TABLE IF EXISTS contest_boosts CASCADE;
    DROP TABLE IF EXISTS boosts CASCADE;
    DROP TABLE IF EXISTS roster_members CASCADE;
    DROP TABLE IF EXISTS contestants CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS game_events CASCADE;
    DROP TABLE IF EXISTS contest_games CASCADE;
    DROP TABLE IF EXISTS games CASCADE;
    DROP TABLE IF EXISTS contests CASCADE;
    DROP TABLE IF EXISTS athletes CASCADE;
    DROP TABLE IF EXISTS teams CASCADE;
  `);
}
