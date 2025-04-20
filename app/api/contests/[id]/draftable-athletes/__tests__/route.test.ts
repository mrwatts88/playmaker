import { NextRequest } from "next/server";
import { GET } from "../route";
import { db } from "@/db/db";
import { contests, athletes, teams, games, contestGames } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

describe("GET /api/contests/[id]/draftable-athletes", () => {
  it("should return draftable athletes for a contest", async () => {
    // Create a test contest
    const [contest] = await db
      .insert(contests)
      .values({
        name: "Test Contest",
        league: "nba",
        status: "upcoming",
      })
      .returning();

    // Create a test team
    const [team] = await db
      .insert(teams)
      .values({
        name: "Test Team",
        league: "nba",
      })
      .returning();

    // Create a test game
    const [game] = await db
      .insert(games)
      .values({
        name: "Test Game",
        homeTeamId: team.id,
        awayTeamId: team.id, // Using same team for simplicity
        status: "upcoming",
      })
      .returning();

    // Link game to contest
    await db
      .insert(contestGames)
      .values({
        contestId: contest.id,
        gameId: game.id,
      })
      .returning();

    // Create a test athlete
    const [athlete] = await db
      .insert(athletes)
      .values({
        name: "Test Athlete",
        teamId: team.id,
        position: "PG",
        cost: 100,
      })
      .returning();

    const request = new NextRequest(`http://localhost:3000/api/contests/${contest.id}/draftable-athletes`);
    const params = Promise.resolve({ id: contest.id });
    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toContainEqual(
      expect.objectContaining({
        id: athlete.id,
        name: "Test Athlete",
        teamId: team.id,
        position: "PG",
        cost: 100,
      })
    );

    // Clean up
    await db.delete(athletes).where(eq(athletes.id, athlete.id));
    await db.delete(contestGames).where(eq(contestGames.gameId, game.id));
    await db.delete(games).where(eq(games.id, game.id));
    await db.delete(teams).where(eq(teams.id, team.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 404 if contest not found", async () => {
    const request = new NextRequest("http://localhost:3000/api/contests/non-existent-id/draftable-athletes");
    const params = Promise.resolve({ id: randomUUID() });
    const response = await GET(request, { params });
    expect(response.status).toBe(404);
  });

  it("should return 400 with invalid id", async () => {
    const request = new NextRequest("http://localhost:3000/api/contests/123/draftable-athletes");
    const params = Promise.resolve({ id: "invalid-id" });
    const response = await GET(request, { params });
    expect(response.status).toBe(400);
  });
});
