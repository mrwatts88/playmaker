import { NextRequest } from "next/server";
import { POST } from "@/app/api/contestants/[id]/roster/route";
import { db } from "@/db/db";
import { contestants, athletes, rosterMembers, teams, contests, users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

describe("POST /api/contestants/{id}/roster", () => {
  it("should submit a roster successfully", async () => {
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

    const [team] = await db
      .insert(teams)
      .values({
        name: "Test Team",
        league: "nba",
      })
      .returning();

    const [athlete1] = await db
      .insert(athletes)
      .values({
        name: "Test Athlete 1",
        teamId: team.id,
        position: "PG",
        cost: 100,
      })
      .returning();

    const [athlete2] = await db
      .insert(athletes)
      .values({
        name: "Test Athlete 2",
        teamId: team.id,
        position: "SG",
        cost: 100,
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: [athlete1.id, athlete2.id],
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual({ message: "Roster submitted successfully" });

    // Verify roster members were created
    const roster = await db.query.rosterMembers.findMany({
      where: eq(rosterMembers.contestantId, contestant.id),
    });
    expect(roster).toHaveLength(2);
    expect(roster).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contestantId: contestant.id,
          athleteId: athlete1.id,
        }),
        expect.objectContaining({
          contestantId: contestant.id,
          athleteId: athlete2.id,
        }),
      ])
    );

    // Clean up
    await db.delete(rosterMembers).where(eq(rosterMembers.contestantId, contestant.id));
    await db.delete(athletes).where(eq(athletes.id, athlete1.id));
    await db.delete(athletes).where(eq(athletes.id, athlete2.id));
    await db.delete(teams).where(eq(teams.id, team.id));
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 404 if contestant not found", async () => {
    const request = new NextRequest("http://localhost:3000/api/contestants/00000000-0000-4000-a000-000000000000/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: ["00000000-0000-4000-a000-000000000000"],
      }),
    });
    const response = await POST(request, {
      params: Promise.resolve({ id: "00000000-0000-4000-a000-000000000000" }),
    });
    expect(response.status).toBe(404);
  });

  it("should return 400 with invalid id", async () => {
    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: ["00000000-0000-4000-a000-000000000000"],
      }),
    });
    const response = await POST(request, {
      params: Promise.resolve({ id: "invalid-id" }),
    });
    expect(response.status).toBe(400);
  });

  it("should return 404 if athlete not found", async () => {
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

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: ["00000000-0000-4000-a000-000000000000"],
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(404);

    // Clean up
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 400 for invalid request body", async () => {
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

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        // Missing athleteIds
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(400);

    // Clean up
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });
});
