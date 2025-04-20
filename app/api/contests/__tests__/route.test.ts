import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/contests/route";
import { db } from "@/db/db";
import { contests, games, teams, contestGames } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

describe("GET /api/contests", () => {
  // Store original db.select
  const originalSelect = db.select;

  // Restore original function after all tests
  afterAll(() => {
    db.select = originalSelect;
  });

  // Restore original function after each test
  afterEach(() => {
    db.select = originalSelect;
  });

  it("should return all contests", async () => {
    // Create a test contest
    const [contest] = await db
      .insert(contests)
      .values({
        name: "Test Contest",
        league: "nba",
        status: "upcoming",
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/contests");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toContainEqual(
      expect.objectContaining({
        id: contest.id,
        name: "Test Contest",
        league: "nba",
        status: "upcoming",
      })
    );

    // Clean up
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should filter contests by league", async () => {
    // Create test contests
    const [nbaContest] = await db
      .insert(contests)
      .values({
        name: "NBA Contest",
        league: "nba",
        status: "upcoming",
      })
      .returning();

    const [nflContest] = await db
      .insert(contests)
      .values({
        name: "NFL Contest",
        league: "nfl",
        status: "upcoming",
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/contests?league=nba");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toContainEqual(
      expect.objectContaining({
        id: nbaContest.id,
        name: "NBA Contest",
        league: "nba",
      })
    );
    expect(data).not.toContainEqual(
      expect.objectContaining({
        id: nflContest.id,
        name: "NFL Contest",
        league: "nfl",
      })
    );

    // Clean up
    await db.delete(contests).where(eq(contests.id, nbaContest.id));
    await db.delete(contests).where(eq(contests.id, nflContest.id));
  });

  it("should return 400 for invalid league parameter", async () => {
    const request = new NextRequest("http://localhost:3000/api/contests?league=invalid");
    const response = await GET(request);
    expect(response.status).toBe(400);
  });

  it("should return 500 for database errors", async () => {
    // Mock db.select to throw an error
    db.select = jest.fn().mockImplementation(() => {
      throw new Error("Database error");
    });

    const request = new NextRequest("http://localhost:3000/api/contests");
    const response = await GET(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ error: "Internal Server Error" });
  });
});

describe("POST /api/contests", () => {
  // Store original db.transaction
  const originalTransaction = db.transaction;

  // Restore original function after all tests
  afterAll(() => {
    db.transaction = originalTransaction;
  });

  // Restore original function after each test
  afterEach(() => {
    db.transaction = originalTransaction;
  });

  it("should create a new contest with games", async () => {
    // Create test teams
    const [team1] = await db
      .insert(teams)
      .values({
        name: "Test Team 1",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [team2] = await db
      .insert(teams)
      .values({
        name: "Test Team 2",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [team3] = await db
      .insert(teams)
      .values({
        name: "Test Team 3",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [team4] = await db
      .insert(teams)
      .values({
        name: "Test Team 4",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [team5] = await db
      .insert(teams)
      .values({
        name: "Test Team 5",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [team6] = await db
      .insert(teams)
      .values({
        name: "Test Team 6",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    // Create test game
    const [game1] = await db
      .insert(games)
      .values({
        name: "Test Game 1",
        homeTeamId: team1.id,
        awayTeamId: team2.id,
        startTime: new Date(),
        status: "upcoming",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [game2] = await db
      .insert(games)
      .values({
        name: "Test Game 2",
        homeTeamId: team1.id,
        awayTeamId: team2.id,
        startTime: new Date(),
        status: "upcoming",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [game3] = await db
      .insert(games)
      .values({
        name: "Test Game 3",
        homeTeamId: team3.id,
        awayTeamId: team4.id,
        startTime: new Date(),
        status: "upcoming",
        league: "nfl",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    // Mock db.transaction to pass through
    db.transaction = jest.fn().mockImplementation((fn) => fn(db));

    const requestBody = {
      name: "Test Contest",
      league: "nba",
      gameIds: [game1.id, game2.id, game3.id],
    };

    const request = new NextRequest("http://localhost:3000/api/contests", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    expect(response.status).toBe(201);

    const data = await response.json();
    expect(data).toEqual(
      expect.objectContaining({
        name: "Test Contest",
        league: "nba",
      })
    );

    // Clean up
    await db.delete(contestGames).where(eq(contestGames.contestId, data.id));
    await db.delete(contests).where(eq(contests.id, data.id));
    await db.delete(games).where(eq(games.id, game1.id));
    await db.delete(games).where(eq(games.id, game2.id));
    await db.delete(games).where(eq(games.id, game3.id));
    await db.delete(teams).where(eq(teams.id, team1.id));
    await db.delete(teams).where(eq(teams.id, team2.id));
    await db.delete(teams).where(eq(teams.id, team3.id));
    await db.delete(teams).where(eq(teams.id, team4.id));
    await db.delete(teams).where(eq(teams.id, team5.id));
    await db.delete(teams).where(eq(teams.id, team6.id));
  });

  it("should return 400 for invalid request body", async () => {
    const request = new NextRequest("http://localhost:3000/api/contests", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("should return 404 for non-existent games", async () => {
    // Mock db.transaction to pass through
    db.transaction = jest.fn().mockImplementation((fn) => fn(db));

    const requestBody = {
      name: "Test Contest",
      league: "nba",
      gameIds: [randomUUID()],
    };

    const request = new NextRequest("http://localhost:3000/api/contests", {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    expect(response.status).toBe(404);
  });

  it("should return 400 for games from different leagues", async () => {
    // Create test teams
    const [team1] = await db
      .insert(teams)
      .values({
        name: "Test Team 1",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [team2] = await db
      .insert(teams)
      .values({
        name: "Test Team 2",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [team3] = await db
      .insert(teams)
      .values({
        name: "Test Team 3",
        league: "nfl",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [team4] = await db
      .insert(teams)
      .values({
        name: "Test Team 4",
        league: "nfl",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [game1] = await db
      .insert(games)
      .values({
        name: "Test Game 1",
        homeTeamId: team1.id,
        awayTeamId: team2.id,
        startTime: new Date(),
        status: "upcoming",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [game2] = await db
      .insert(games)
      .values({
        name: "Test Game 2",
        homeTeamId: team3.id,
        awayTeamId: team4.id,
        startTime: new Date(),
        status: "upcoming",
        league: "nfl",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const data = {
      name: "Test Contest",
      league: "nba",
      gameIds: [game1.id, game2.id],
    };

    // Mock db.transaction to pass through
    db.transaction = jest.fn().mockImplementation((fn) => fn(db));

    const request = new NextRequest(new URL("http://localhost:3000/api/contests"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: "One or more games belong to a different league" });

    // Clean up
    await db.delete(games).where(eq(games.id, game1.id));
    await db.delete(games).where(eq(games.id, game2.id));
    await db.delete(teams).where(eq(teams.id, team1.id));
    await db.delete(teams).where(eq(teams.id, team2.id));
    await db.delete(teams).where(eq(teams.id, team3.id));
    await db.delete(teams).where(eq(teams.id, team4.id));
  });

  it("should return 500 for database errors", async () => {
    // Create test teams
    const [team1] = await db
      .insert(teams)
      .values({
        name: "Test Team 1",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [team2] = await db
      .insert(teams)
      .values({
        name: "Test Team 2",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const [game1] = await db
      .insert(games)
      .values({
        name: "Test Game 1",
        homeTeamId: team1.id,
        awayTeamId: team2.id,
        startTime: new Date(),
        status: "upcoming",
        league: "nba",
        dataSource: "manual",
        apiId: randomUUID(),
      })
      .returning();

    const data = {
      name: "Test Contest",
      league: "nba",
      gameIds: [game1.id],
    };

    // Mock db.transaction to throw an error
    db.transaction = jest.fn().mockImplementation(() => {
      throw new Error("Database error");
    });

    const request = new NextRequest(new URL("http://localhost:3000/api/contests"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: "Internal Server Error" });

    // Clean up
    await db.delete(games).where(eq(games.id, game1.id));
    await db.delete(teams).where(eq(teams.id, team1.id));
    await db.delete(teams).where(eq(teams.id, team2.id));
  });
});
