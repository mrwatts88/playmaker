import { POST } from "@/app/api/contestants/[id]/roster/route";
import { db } from "@/db/db";
import { athletes, contestGames, contestants, contests, games, rosterMembers, teams, users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
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
        startTime: new Date(),
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

    const teamId = randomUUID();
    const [team] = await db
      .insert(teams)
      .values({
        id: teamId,
        name: "Test Team",
        league: "nba",
      })
      .returning();

    const [game] = await db
      .insert(games)
      .values({
        id: randomUUID(),
        homeTeamId: team.id,
        awayTeamId: team.id,
        startTime: new Date(),
        status: "upcoming",
      })
      .returning();

    await db.insert(contestGames).values({
      contestId: contest.id,
      gameId: game.id,
    });

    const athlete1Id = randomUUID();
    const [athlete1] = await db
      .insert(athletes)
      .values({
        id: athlete1Id,
        name: "Test Athlete 1",
        teamId: team.id,
        position: "PG",
        cost: 100,
      })
      .returning();

    const athlete2Id = randomUUID();
    const [athlete2] = await db
      .insert(athletes)
      .values({
        id: athlete2Id,
        name: "Test Athlete 2",
        teamId: team.id,
        position: "SG",
        cost: 100,
      })
      .returning();

    const athlete3Id = randomUUID();
    const [athlete3] = await db
      .insert(athletes)
      .values({
        id: athlete3Id,
        name: "Test Athlete 3",
        teamId: team.id,
        position: "SF",
        cost: 100,
      })
      .returning();

    const athlete4Id = randomUUID();
    const [athlete4] = await db
      .insert(athletes)
      .values({
        id: athlete4Id,
        name: "Test Athlete 4",
        teamId: team.id,
        position: "PF",
        cost: 100,
      })
      .returning();

    const athlete5Id = randomUUID();
    const [athlete5] = await db
      .insert(athletes)
      .values({
        id: athlete5Id,
        name: "Test Athlete 5",
        teamId: team.id,
        position: "C",
        cost: 100,
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: [athlete1.id, athlete2.id, athlete3.id, athlete4.id, athlete5.id],
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
    expect(roster).toHaveLength(5);
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
        expect.objectContaining({
          contestantId: contestant.id,
          athleteId: athlete3.id,
        }),
        expect.objectContaining({
          contestantId: contestant.id,
          athleteId: athlete4.id,
        }),
        expect.objectContaining({
          contestantId: contestant.id,
          athleteId: athlete5.id,
        }),
      ])
    );

    // Clean up
    await db.delete(rosterMembers).where(eq(rosterMembers.contestantId, contestant.id));
    await db.delete(contestGames).where(eq(contestGames.contestId, contest.id));
    await db.delete(games).where(eq(games.id, game.id));
    await db.delete(athletes).where(eq(athletes.id, athlete1.id));
    await db.delete(athletes).where(eq(athletes.id, athlete2.id));
    await db.delete(athletes).where(eq(athletes.id, athlete3.id));
    await db.delete(athletes).where(eq(athletes.id, athlete4.id));
    await db.delete(athletes).where(eq(athletes.id, athlete5.id));
    await db.delete(teams).where(eq(teams.id, team.id));
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 404 if contestant not found", async () => {
    const request = new NextRequest("http://localhost:3000/api/contestants/00000000-0000-4000-a000-000000000000/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: [
          "00000000-0000-4000-a000-000000000000",
          "00000000-0000-4000-a000-000000000001",
          "00000000-0000-4000-a000-000000000002",
          "00000000-0000-4000-a000-000000000003",
          "00000000-0000-4000-a000-000000000004",
        ],
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
        athleteIds: [
          "00000000-0000-4000-a000-000000000000",
          "00000000-0000-4000-a000-000000000001",
          "00000000-0000-4000-a000-000000000002",
          "00000000-0000-4000-a000-000000000003",
          "00000000-0000-4000-a000-000000000004",
        ],
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
        startTime: new Date(),
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
        athleteIds: [
          "00000000-0000-4000-a000-000000000000",
          "00000000-0000-4000-a000-000000000001",
          "00000000-0000-4000-a000-000000000002",
          "00000000-0000-4000-a000-000000000003",
          "00000000-0000-4000-a000-000000000004",
        ],
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
        startTime: new Date(),
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
