import { GET } from "@/app/api/contests/[id]/game/route";
import { db } from "@/db/db";
import {
  athletes,
  boosts,
  contestantBoosts,
  contestants,
  contestBoosts,
  contestGames,
  contests,
  gameEvents,
  games,
  rosterMembers,
  teams,
  users,
} from "@/db/schema/schema";
import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";
import { NextRequest } from "next/server";

describe("GET /api/contests/{id}/game", () => {
  it("should return full contest state", async () => {
    // Create test data in correct order
    const [homeTeam] = await db
      .insert(teams)
      .values({
        name: "Home Team",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [awayTeam] = await db
      .insert(teams)
      .values({
        name: "Away Team",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [game] = await db
      .insert(games)
      .values({
        name: "Test Game",
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        status: "upcoming",
        startTime: new Date(),
        dataSource: "manual",
        apiId: randomUUID(),
        league: "nba",
      })
      .returning();

    const [contest] = await db
      .insert(contests)
      .values({
        name: "Test Contest",
        league: "nba",
        status: "upcoming",
      })
      .returning();

    await db.insert(contestGames).values({
      gameId: game.id,
      contestId: contest.id,
    });

    const [athlete] = await db
      .insert(athletes)
      .values({
        name: "Test Athlete",
        teamId: homeTeam.id,
        position: "PG",
        cost: 100,
        dataSource: "manual",
        apiId: randomUUID(),
        league: "nba",
      })
      .returning();

    const [user] = await db
      .insert(users)
      .values({
        name: "Test User",
      })
      .returning();

    const [contestant] = await db
      .insert(contestants)
      .values({
        contestId: contest.id,
        name: "Test Contestant",
        userId: user.id,
        totalXp: 100,
        spendableXp: 50,
        statPower: {},
      })
      .returning();

    await db.insert(rosterMembers).values({
      contestantId: contestant.id,
      athleteId: athlete.id,
    });

    const [boost] = await db
      .insert(boosts)
      .values({
        name: "Test Boost",
        description: "Test Description",
        cost: 50,
        type: "multiplicative",
        stat: "points",
        value: "1.5",
      })
      .returning();

    await db.insert(contestBoosts).values({
      contestId: contest.id,
      boostId: boost.id,
    });

    await db.insert(contestantBoosts).values({
      contestantId: contestant.id,
      boostId: boost.id,
    });

    await db.insert(gameEvents).values({
      gameId: game.id,
      athleteId: athlete.id,
      eventType: "points",
      value: 2,
      dataSource: "manual",
      apiId: randomUUID(),
      league: "nba",
    });

    const request = new NextRequest("http://localhost:3000/api/contests/123/game");
    const response = await GET(request, { params: Promise.resolve({ id: contest.id }) });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      id: contest.id,
      name: "Test Contest",
      league: "nba",
      status: "upcoming",
    });
    expect(Array.isArray(data.contestants)).toBe(true);
    expect(data.contestants[0]).toMatchObject({
      id: contestant.id,
      name: "Test Contestant",
    });
    expect(Array.isArray(data.games)).toBe(true);
    expect(data.games[0]).toMatchObject({
      id: game.id,
      name: "Test Game",
    });
    expect(Array.isArray(data.availableBoosts)).toBe(true);
    expect(data.availableBoosts[0]).toMatchObject({
      id: boost.id,
      name: "Test Boost",
    });
    expect(Array.isArray(data.eventHistory)).toBe(true);
    expect(data.eventHistory[0]).toMatchObject({
      eventType: "points",
      value: 2,
    });

    // Clean up in reverse order
    await db.delete(gameEvents).where(and(eq(gameEvents.gameId, game.id), eq(gameEvents.athleteId, athlete.id)));
    await db.delete(contestantBoosts).where(eq(contestantBoosts.contestantId, contestant.id));
    await db.delete(contestBoosts).where(eq(contestBoosts.contestId, contest.id));
    await db.delete(boosts).where(eq(boosts.id, boost.id));
    await db.delete(rosterMembers).where(eq(rosterMembers.contestantId, contestant.id));
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(athletes).where(eq(athletes.id, athlete.id));
    await db.delete(contestGames).where(eq(contestGames.contestId, contest.id));
    await db.delete(games).where(eq(games.id, game.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
    await db.delete(teams).where(eq(teams.id, homeTeam.id));
    await db.delete(teams).where(eq(teams.id, awayTeam.id));
  });

  it("should return 404 if contest not found", async () => {
    // Store original method
    const originalFindFirst = db.query.contests.findFirst;

    // Mock the database query to return null
    db.query.contests.findFirst = jest.fn().mockResolvedValue(null);

    const request = new NextRequest("http://localhost:3000/api/contests/123/game");
    const response = await GET(request, { params: Promise.resolve({ id: "00000000-0000-4000-a000-000000000000" }) });
    expect(response.status).toBe(404);

    // Restore original method
    db.query.contests.findFirst = originalFindFirst;
  });

  it("should return 400 for invalid ID format", async () => {
    const request = new NextRequest("http://localhost:3000/api/contests/123/game");
    const response = await GET(request, { params: Promise.resolve({ id: "invalid-id" }) });
    expect(response.status).toBe(400);
  });

  it("should return 500 for internal server error", async () => {
    // Store original findFirst
    const originalFindFirst = db.query.contests.findFirst;

    // Mock findFirst to throw error
    db.query.contests.findFirst = jest.fn().mockRejectedValue(new Error("Database error"));

    const request = new NextRequest("http://localhost:3000/api/contests/123/game");
    const response = await GET(request, { params: Promise.resolve({ id: "00000000-0000-4000-a000-000000000000" }) });

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ error: "Internal Server Error" });

    // Restore original findFirst
    db.query.contests.findFirst = originalFindFirst;
  });
});
