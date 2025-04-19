import { pgTable, text, integer, timestamp, primaryKey, jsonb, numeric, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const leagueType = pgEnum("league_type", ["nba", "nfl", "nhl", "mlb"]);
export const contestStatus = pgEnum("contest_status", ["upcoming", "active", "completed"]);
export const gameStatus = pgEnum("game_status", ["upcoming", "active", "completed"]);
export const eventType = pgEnum("event_type", ["points", "rebounds", "assists", "steals", "blocks"]);
export const boostType = pgEnum("boost_type", ["multiplicative", "additive", "conditional", "instant", "action"]);
export const statType = pgEnum("stat_type", ["points", "rebounds", "assists", "steals", "blocks"]);
export const boostAction = pgEnum("boost_action", ["extraPlayer", "stealPlayer"]);

// Tables
export const teams = pgTable("teams", {
  id: text("id").primaryKey(),
  name: text("name"),
  league: leagueType("league"),
});

export const athletes = pgTable("athletes", {
  id: text("id").primaryKey(),
  name: text("name"),
  teamId: text("team_id").references(() => teams.id),
  position: text("position"),
  cost: integer("cost").notNull(),
});

export const contests = pgTable("contests", {
  id: text("id").primaryKey(),
  name: text("name"),
  startTime: timestamp("start_time"),
  status: contestStatus("status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const games = pgTable("games", {
  id: text("id").primaryKey(),
  name: text("name"),
  startTime: timestamp("start_time"),
  status: gameStatus("status"),
  homeTeamId: text("home_team_id").references(() => teams.id),
  awayTeamId: text("away_team_id").references(() => teams.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contestGames = pgTable(
  "contest_games",
  {
    gameId: text("game_id").references(() => games.id),
    contestId: text("contest_id").references(() => contests.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    pk: primaryKey(t.gameId, t.contestId),
  })
);

export const gameEvents = pgTable("game_events", {
  id: text("id").primaryKey(),
  gameId: text("game_id").references(() => games.id),
  athleteId: text("athlete_id").references(() => athletes.id),
  eventType: eventType("event_type"),
  value: integer("value"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contestants = pgTable(
  "contestants",
  {
    id: text("id").primaryKey(),
    contestId: text("contest_id").references(() => contests.id),
    userId: text("user_id").references(() => users.id),
    name: text("name"),
    totalXp: integer("total_xp").default(0).notNull(),
    spendableXp: integer("spendable_xp").default(0).notNull(),
    statPower: jsonb("stat_power").default({}).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    uniqueUserContest: primaryKey(t.userId, t.contestId),
  })
);

export const rosterMembers = pgTable(
  "roster_members",
  {
    contestantId: text("contestant_id").references(() => contestants.id),
    athleteId: text("athlete_id").references(() => athletes.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    pk: primaryKey(t.contestantId, t.athleteId),
  })
);

export const boosts = pgTable("boosts", {
  id: text("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  cost: integer("cost"),
  type: boostType("type"),
  stat: statType("stat"),
  requirement: integer("requirement"),
  value: numeric("value"),
  action: boostAction("action"),
  duration: integer("duration"),
});

export const contestBoosts = pgTable("contest_boosts", {
  id: text("id").primaryKey(),
  contestId: text("contest_id").references(() => contests.id),
  boostId: text("boost_id").references(() => boosts.id),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contestantBoosts = pgTable("contestant_boosts", {
  id: text("id").primaryKey(),
  contestantId: text("contestant_id").references(() => contestants.id),
  boostId: text("boost_id").references(() => boosts.id),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
