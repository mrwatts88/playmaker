import { NextRequest } from "next/server";
import { GET } from "@/app/api/contests/route";
import { db } from "@/db/db";
import { contests } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

describe("GET /api/contests", () => {
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
});
