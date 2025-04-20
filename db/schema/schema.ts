import { pgTable, text, integer, timestamp, primaryKey, jsonb, numeric, pgEnum, unique, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  league: leagueType("league"),
});

export const athletes = pgTable("athletes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  teamId: uuid("team_id")
    .references(() => teams.id)
    .notNull(),
  position: text("position"),
  cost: integer("cost").notNull(),
});

// Relations
export const athletesRelations = relations(athletes, ({ one }: { one: any }) => ({
  team: one(teams, {
    fields: [athletes.teamId],
    references: [teams.id],
  }),
}));

export const contests = pgTable("contests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  startTime: timestamp("start_time"),
  status: contestStatus("status"),
  league: leagueType("league").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  // consider adding teamIds to show teams in a contest
  // consider adding athleteIds to this table to show athletes in a contest (aka draftable athletes)
  // consider adding gameIds to this table to show game events and contestgames
});

export const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  startTime: timestamp("start_time"),
  status: gameStatus("status"),
  homeTeamId: uuid("home_team_id")
    .references(() => teams.id)
    .notNull(),
  awayTeamId: uuid("away_team_id")
    .references(() => teams.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contestGames = pgTable(
  "contest_games",
  {
    gameId: uuid("game_id")
      .references(() => games.id)
      .notNull(),
    contestId: uuid("contest_id")
      .references(() => contests.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    pk: primaryKey(t.gameId, t.contestId),
  })
);

// Relations for contestGames
export const contestGamesRelations = relations(contestGames, ({ one }: { one: any }) => ({
  game: one(games, {
    fields: [contestGames.gameId],
    references: [games.id],
  }),
  contest: one(contests, {
    fields: [contestGames.contestId],
    references: [contests.id],
  }),
}));

export const gameEvents = pgTable("game_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  gameId: uuid("game_id")
    .references(() => games.id)
    .notNull(),
  athleteId: uuid("athlete_id").references(() => athletes.id),
  eventType: eventType("event_type"),
  value: integer("value"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contestants = pgTable(
  "contestants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    contestId: uuid("contest_id")
      .references(() => contests.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    name: text("name").notNull(),
    totalXp: integer("total_xp").default(0).notNull(),
    spendableXp: integer("spendable_xp").default(0).notNull(),
    statPower: jsonb("stat_power").default({}).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    uniqueUserContest: unique().on(t.userId, t.contestId),
  })
);

export const rosterMembers = pgTable(
  "roster_members",
  {
    contestantId: uuid("contestant_id")
      .references(() => contestants.id)
      .notNull(),
    athleteId: uuid("athlete_id")
      .references(() => athletes.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    pk: primaryKey(t.contestantId, t.athleteId),
  })
);

// Relations for rosterMembers
export const rosterMembersRelations = relations(rosterMembers, ({ one }: { one: any }) => ({
  athlete: one(athletes, {
    fields: [rosterMembers.athleteId],
    references: [athletes.id],
  }),
  contestant: one(contestants, {
    fields: [rosterMembers.contestantId],
    references: [contestants.id],
  }),
}));

export const boosts = pgTable("boosts", {
  id: uuid("id").primaryKey().defaultRandom(),
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
  id: uuid("id").primaryKey().defaultRandom(),
  contestId: uuid("contest_id")
    .references(() => contests.id)
    .notNull(),
  boostId: uuid("boost_id")
    .references(() => boosts.id)
    .notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations for contestBoosts
export const contestBoostsRelations = relations(contestBoosts, ({ one }: { one: any }) => ({
  boost: one(boosts, {
    fields: [contestBoosts.boostId],
    references: [boosts.id],
  }),
  contest: one(contests, {
    fields: [contestBoosts.contestId],
    references: [contests.id],
  }),
}));

export const contestantBoosts = pgTable("contestant_boosts", {
  id: uuid("id").primaryKey().defaultRandom(),
  contestantId: uuid("contestant_id")
    .references(() => contestants.id)
    .notNull(),
  boostId: uuid("boost_id")
    .references(() => boosts.id)
    .notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations for contestantBoosts
export const contestantBoostsRelations = relations(contestantBoosts, ({ one }: { one: any }) => ({
  boost: one(boosts, {
    fields: [contestantBoosts.boostId],
    references: [boosts.id],
  }),
  contestant: one(contestants, {
    fields: [contestantBoosts.contestantId],
    references: [contestants.id],
  }),
}));
