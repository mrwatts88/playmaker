import { NextRequest } from "next/server";
import { POST } from "@/app/api/contests/[id]/user/[userId]/route";
import { db } from "@/db/db";
import { contests, users, contestants } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { startingContestantXp } from "@/app/constants/statPower";
import { randomUUID } from "crypto";

describe("POST /api/contests/{id}/user/{userId}", () => {
  it("should create a contestant when entering a contest", async () => {
    // Create test data
    const [contest] = await db
      .insert(contests)
      .values({
        name: "Test Contest",
        league: "nba",
        status: "upcoming",
      })
      .returning();

    const [user] = await db
      .insert(users)
      .values({
        name: "Test User",
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/contests/123/user/456", {
      method: "POST",
    });
    const response = await POST(request, {
      params: Promise.resolve({ id: contest.id, userId: user.id }),
    });
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toMatchObject({
      userId: user.id,
      name: "Test User",
      contestId: contest.id,
      totalXp: startingContestantXp,
      spendableXp: startingContestantXp,
    });

    // Clean up
    await db.delete(contestants).where(eq(contestants.id, data.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 404 if contest not found", async () => {
    const [user] = await db
      .insert(users)
      .values({
        name: "Test User",
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/contests/123/user/456", {
      method: "POST",
    });
    const response = await POST(request, {
      params: Promise.resolve({ id: randomUUID(), userId: user.id }),
    });
    expect(response.status).toBe(404);

    // Clean up
    await db.delete(users).where(eq(users.id, user.id));
  });

  it("should return 404 if user not found", async () => {
    const [contest] = await db
      .insert(contests)
      .values({
        name: "Test Contest",
        league: "nba",
        status: "upcoming",
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/contests/123/user/456", {
      method: "POST",
    });
    const response = await POST(request, {
      params: Promise.resolve({ id: contest.id, userId: "00000000-0000-4000-a000-000000000000" }),
    });
    expect(response.status).toBe(404);

    // Clean up
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 400 if contest is not joinable", async () => {
    const [contest] = await db
      .insert(contests)
      .values({
        name: "Test Contest",
        league: "nba",
        status: "active",
      })
      .returning();

    const [user] = await db
      .insert(users)
      .values({
        name: "Test User",
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/contests/123/user/456", {
      method: "POST",
    });
    const response = await POST(request, {
      params: Promise.resolve({ id: contest.id, userId: user.id }),
    });
    expect(response.status).toBe(400);

    // Clean up
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 400 if user is already in contest", async () => {
    const [contest] = await db
      .insert(contests)
      .values({
        name: "Test Contest",
        league: "nba",
        status: "upcoming",
      })
      .returning();

    const [user] = await db
      .insert(users)
      .values({
        name: "Test User",
      })
      .returning();

    // First entry
    const request1 = new NextRequest("http://localhost:3000/api/contests/123/user/456", {
      method: "POST",
    });
    await POST(request1, {
      params: Promise.resolve({ id: contest.id, userId: user.id }),
    });

    // Second entry
    const request2 = new NextRequest("http://localhost:3000/api/contests/123/user/456", {
      method: "POST",
    });
    const response = await POST(request2, {
      params: Promise.resolve({ id: contest.id, userId: user.id }),
    });
    expect(response.status).toBe(400);

    // Clean up
    await db.delete(contestants).where(eq(contestants.contestId, contest.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 400 with invalid id", async () => {
    const request = new NextRequest("http://localhost:3000/api/contests/123/user/456", {
      method: "POST",
    });
    const response = await POST(request, {
      params: Promise.resolve({ id: "invalid-id", userId: "00000000-0000-4000-a000-000000000000" }),
    });
    expect(response.status).toBe(400);
  });

  it("should return 500 for internal server error", async () => {
    // Store original methods
    const originalFindFirst = db.query.contests.findFirst;

    // Mock the database query to throw an error
    db.query.contests.findFirst = jest.fn().mockImplementation(() => {
      throw new Error("Database error");
    });

    const request = new NextRequest("http://localhost:3000/api/contests/123/user/456", {
      method: "POST",
    });
    const response = await POST(request, {
      params: Promise.resolve({
        id: "00000000-0000-4000-a000-000000000000",
        userId: "00000000-0000-4000-a000-000000000001",
      }),
    });

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ error: "Internal Server Error" });

    // Restore original methods
    db.query.contests.findFirst = originalFindFirst;
  });
});
