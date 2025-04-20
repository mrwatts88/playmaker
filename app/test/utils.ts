import { db } from "@/db/db";
import { athletes, contestGames, contestants, contests, games, rosterMembers, teams, users } from "@/db/schema/schema";
import { randomUUID } from "crypto";
import { inArray } from "drizzle-orm";

export const cleanupTestData = async (testIds: {
  teamIds?: string[];
  gameIds?: string[];
  contestIds?: string[];
  userIds?: string[];
  athleteIds?: string[];
  contestantIds?: string[];
}) => {
  // Delete in correct order to handle foreign key constraints
  if (testIds.contestantIds?.length) {
    await db.delete(rosterMembers).where(inArray(rosterMembers.contestantId, testIds.contestantIds));
    await db.delete(contestants).where(inArray(contestants.id, testIds.contestantIds));
  }

  if (testIds.contestIds?.length) {
    await db.delete(contestGames).where(inArray(contestGames.contestId, testIds.contestIds));
    await db.delete(contests).where(inArray(contests.id, testIds.contestIds));
  }

  if (testIds.athleteIds?.length) {
    await db.delete(athletes).where(inArray(athletes.id, testIds.athleteIds));
  }

  if (testIds.gameIds?.length) {
    await db.delete(games).where(inArray(games.id, testIds.gameIds));
  }

  if (testIds.teamIds?.length) {
    await db.delete(teams).where(inArray(teams.id, testIds.teamIds));
  }

  if (testIds.userIds?.length) {
    await db.delete(users).where(inArray(users.id, testIds.userIds));
  }
};

export const createTestTeam = async (options: { name?: string; league?: "nba" | "nfl" | "nhl" | "mlb" } = {}) => {
  const [team] = await db
    .insert(teams)
    .values({
      name: options.name || "Test Team",
      league: options.league || "nba",
      apiId: randomUUID(),
      dataSource: "manual",
    })
    .returning();
  return team;
};

export const createTestUser = async (options: { name?: string } = {}) => {
  const [user] = await db
    .insert(users)
    .values({
      name: options.name || "Test User",
    })
    .returning();
  return user;
};

export const createTestContest = async (
  options: {
    name?: string;
    league?: "nba" | "nfl" | "nhl" | "mlb";
    status?: "upcoming" | "active" | "completed";
  } = {}
) => {
  const [contest] = await db
    .insert(contests)
    .values({
      name: options.name || "Test Contest",
      league: options.league || "nba",
      status: options.status || "upcoming",
      startTime: new Date(),
    })
    .returning();
  return contest;
};

export const createTestGame = async (options: { homeTeamId: string; awayTeamId: string; status?: "upcoming" | "active" | "completed" }) => {
  const [game] = await db
    .insert(games)
    .values({
      name: "Test Game",
      homeTeamId: options.homeTeamId,
      awayTeamId: options.awayTeamId,
      startTime: new Date(),
      status: options.status || "upcoming",
      apiId: randomUUID(),
      dataSource: "manual",
      league: "nba", // Default to NBA for tests
    })
    .returning();
  return game;
};

export const createTestAthlete = async (options: { name?: string; teamId: string; position?: string; cost?: number }) => {
  const [athlete] = await db
    .insert(athletes)
    .values({
      name: options.name || "Test Athlete",
      teamId: options.teamId,
      position: options.position || "PG",
      cost: options.cost || 100,
      apiId: randomUUID(),
      dataSource: "manual",
      league: "nba", // Default to NBA for tests
    })
    .returning();
  return athlete;
};

export const createTestContestant = async (options: { name?: string; contestId: string; userId: string; totalXp?: number; spendableXp?: number }) => {
  const [contestant] = await db
    .insert(contestants)
    .values({
      name: options.name || "Test Contestant",
      contestId: options.contestId,
      userId: options.userId,
      totalXp: options.totalXp || 0,
      spendableXp: options.spendableXp || 0,
      statPower: {},
    })
    .returning();
  return contestant;
};

export const linkGameToContest = async (contestId: string, gameId: string) => {
  await db.insert(contestGames).values({
    contestId,
    gameId,
  });
};

export const createTestRoster = async (contestantId: string, athleteIds: string[]) => {
  const rosterEntries = athleteIds.map((athleteId) => ({
    contestantId,
    athleteId,
  }));
  await db.insert(rosterMembers).values(rosterEntries);
};
