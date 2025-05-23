import {
  pgTable,
  text,
  integer,
  timestamp,
  primaryKey,
  jsonb,
  numeric,
  pgEnum,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const leagueType = pgEnum("league_type", ["nba", "nfl", "nhl", "mlb"]);
export const contestStatus = pgEnum("contest_status", [
  "upcoming",
  "active",
  "completed",
]);
export const gameStatus = pgEnum("game_status", [
  "upcoming",
  "active",
  "completed",
]);
export const eventType = pgEnum("event_type", [
  "points",
  "rebounds",
  "assists",
  "steals",
  "blocks",
  "gamestart",
  "gameend",
]);
export const boostType = pgEnum("boost_type", ["team", "athlete"]);
export const statType = pgEnum("stat_type", [
  "points",
  "rebounds",
  "assists",
  "steals",
  "blocks",
  "3 pointers",
  "foul",
  "turnover",
  "free throw made",
]);
export const boostAction = pgEnum("boost_action", [
  "extraPlayer",
  "stealPlayer",
]);
export const dataSource = pgEnum("data_source", [
  "espncom",
  "nbacom",
  "sportradar",
  "manual",
]);

// reference table (from sports api)
export const teams = pgTable(
  "teams",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    apiId: text("api_id").notNull(),
    dataSource: dataSource("data_source").notNull(),
    name: text("name").notNull(),
    league: leagueType("league").notNull(),
  },
  (t) => ({
    uniqueDataSourceApiId: unique().on(t.league, t.dataSource, t.apiId),
  })
);

// reference table (from sports api)
export const athletes = pgTable(
  "athletes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    apiId: text("api_id").notNull(),
    dataSource: dataSource("data_source").notNull(),
    league: leagueType("league").notNull(),
    name: text("name").notNull(),
    teamId: uuid("team_id")
      .references(() => teams.id)
      .notNull(),
    position: text("position"),
  },
  (t) => ({
    uniqueDataSourceApiId: unique().on(t.league, t.dataSource, t.apiId),
  })
);

// reference table (self-created)
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

// cron job sports api table
export const games = pgTable(
  "games",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    apiId: text("api_id").notNull(),
    dataSource: dataSource("data_source").notNull(),
    league: leagueType("league").notNull(),
    name: text("name").notNull(),
    startTime: timestamp("start_time").notNull(),
    status: gameStatus("status"),
    homeTeamId: uuid("home_team_id")
      .references(() => teams.id)
      .notNull(),
    awayTeamId: uuid("away_team_id")
      .references(() => teams.id)
      .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    uniqueDataSourceApiId: unique().on(t.league, t.dataSource, t.apiId),
  })
);

// cron job sports api table
export const gameEvents = pgTable(
  "game_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    apiId: text("api_id").notNull(),
    dataSource: dataSource("data_source").notNull(),
    league: leagueType("league").notNull(),
    gameId: uuid("game_id")
      .references(() => games.id, { onDelete: "cascade" })
      .notNull(),
    athleteId: uuid("athlete_id").references(() => athletes.id, {
      onDelete: "cascade",
    }),
    eventType: eventType("event_type").notNull(),
    value: integer("value"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    uniqueDataSourceApiId: unique().on(t.league, t.dataSource, t.apiId),
  })
);

// derived from cron job sports api table
export const contests = pgTable("contests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  startTime: timestamp("start_time"),
  status: contestStatus("status"),
  league: leagueType("league").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// derived from cron job sports api table
export const contestGames = pgTable(
  "contest_games",
  {
    gameId: uuid("game_id")
      .references(() => games.id, { onDelete: "cascade" })
      .notNull(),
    contestId: uuid("contest_id")
      .references(() => contests.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    pk: primaryKey(t.gameId, t.contestId),
  })
);

// transactional table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// transactional table
export const contestants = pgTable(
  "contestants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    contestId: uuid("contest_id")
      .references(() => contests.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    name: text("name").notNull(),
    totalXp: integer("total_xp").default(0).notNull(),
    spendableXp: integer("spendable_xp").default(0).notNull(),
    statPower: jsonb("stat_power").default({}).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    teamId: uuid("team_id")
      .references(() => teams.id)
      .notNull(),
  },
  (t) => ({
    uniqueUserContest: unique().on(t.userId, t.contestId),
  })
);

// transactional table
export const contestantBoosts = pgTable("contestant_boosts", {
  id: uuid("id").primaryKey().defaultRandom(),
  contestantId: uuid("contestant_id")
    .references(() => contestants.id, { onDelete: "cascade" })
    .notNull(),
  boostId: uuid("boost_id")
    .references(() => boosts.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const processedGameEvents = pgTable(
  "processed_game_events",
  {
    gameEventId: uuid("game_event_id")
      .notNull()
      .references(() => gameEvents.id),
    contestantId: uuid("contestant_id")
      .notNull()
      .references(() => contestants.id),
    gameId: uuid("game_id")
      .notNull()
      .references(() => games.id),
    processedAt: timestamp("processed_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.gameEventId, table.contestantId] }),
    };
  }
);

// Relations //
export const gamesRelations = relations(games, ({ one }) => ({
  homeTeam: one(teams, {
    fields: [games.homeTeamId],
    references: [teams.id],
  }),
  awayTeam: one(teams, {
    fields: [games.awayTeamId],
    references: [teams.id],
  }),
}));

export const contestsRelations = relations(contests, ({ many }) => ({
  contestGames: many(contestGames),
  contestants: many(contestants, {
    relationName: "contest_contestants",
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  contestants: many(contestants),
}));

export const contestantBoostsRelations = relations(
  contestantBoosts,
  ({ one }) => ({
    boost: one(boosts, {
      fields: [contestantBoosts.boostId],
      references: [boosts.id],
    }),
    contestant: one(contestants, {
      fields: [contestantBoosts.contestantId],
      references: [contestants.id],
    }),
  })
);

export const athletesRelations = relations(athletes, ({ one }) => ({
  team: one(teams, {
    fields: [athletes.teamId],
    references: [teams.id],
  }),
}));

export const contestGamesRelations = relations(contestGames, ({ one }) => ({
  game: one(games, {
    fields: [contestGames.gameId],
    references: [games.id],
  }),
  contest: one(contests, {
    fields: [contestGames.contestId],
    references: [contests.id],
  }),
}));

export const gameEventsRelations = relations(gameEvents, ({ one }) => ({
  game: one(games, {
    fields: [gameEvents.gameId],
    references: [games.id],
  }),
  athlete: one(athletes, {
    fields: [gameEvents.athleteId],
    references: [athletes.id],
  }),
}));

export const contestantsRelations = relations(contestants, ({ one }) => ({
  contest: one(contests, {
    fields: [contestants.contestId],
    references: [contests.id],
    relationName: "contest_contestants",
  }),
  user: one(users, {
    fields: [contestants.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [contestants.teamId],
    references: [teams.id],
  }),
}));
// End Relations //
