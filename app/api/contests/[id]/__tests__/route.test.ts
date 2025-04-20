import { NextRequest } from "next/server";
import { GET } from "@/app/api/contests/[id]/route";
import { db } from "@/db/db";
import { contests } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

describe("GET /api/contests/{id}", () => {
  it("should return contest details", async () => {
    // Create a test contest
    const [contest] = await db
      .insert(contests)
      .values({
        name: "Test Contest",
        league: "nba",
        status: "upcoming",
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/contests/123");
    const response = await GET(request, { params: Promise.resolve({ id: contest.id }) });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      id: contest.id,
      name: "Test Contest",
      league: "nba",
      status: "upcoming",
    });

    // Clean up
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 404 if contest not found", async () => {
    // Store original findFirst
    const originalFindFirst = db.query.contests.findFirst;

    // Mock findFirst to return null
    db.query.contests.findFirst = jest.fn().mockResolvedValue(null);

    const request = new NextRequest("http://localhost:3000/api/contests/123");
    const response = await GET(request, { params: Promise.resolve({ id: "00000000-0000-4000-a000-000000000000" }) });
    expect(response.status).toBe(404);

    // Restore original findFirst
    db.query.contests.findFirst = originalFindFirst;
  });

  it("should return 400 for invalid ID format", async () => {
    const request = new NextRequest("http://localhost:3000/api/contests/123");
    const response = await GET(request, { params: Promise.resolve({ id: "invalid-id" }) });
    expect(response.status).toBe(400);
  });

  it("should return 500 for internal server error", async () => {
    // Store original findFirst
    const originalFindFirst = db.query.contests.findFirst;

    // Mock findFirst to throw error
    db.query.contests.findFirst = jest.fn().mockRejectedValue(new Error("Database error"));

    const request = new NextRequest("http://localhost:3000/api/contests/123");
    const response = await GET(request, { params: Promise.resolve({ id: "00000000-0000-4000-a000-000000000000" }) });

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ error: "Internal Server Error" });

    // Restore original findFirst
    db.query.contests.findFirst = originalFindFirst;
  });
});
