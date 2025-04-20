import { POST } from "@/app/api/contestants/[id]/roster/route";
import { db } from "@/db/db";
import { athletes, contestGames, contestants, contests, games, rosterMembers, teams, users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { randomUUID } from "crypto";

// Mock console.error to keep test output clean
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

type ContestantWithRoster = typeof contestants.$inferSelect & {
  roster: (typeof rosterMembers.$inferSelect)[];
};

type AthleteWithTeam = typeof athletes.$inferSelect & {
  team: typeof teams.$inferSelect;
};

describe("POST /api/contestants/{id}/roster", () => {
  it("should submit a roster successfully", async () => {
    // Create test data in correct order
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

    const [contest] = await db
      .insert(contests)
      .values({
        name: "Test Contest",
        league: "nba",
        status: "upcoming",
        startTime: new Date(),
      })
      .returning();

    await db.insert(contestGames).values({
      contestId: contest.id,
      gameId: game.id,
    });

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

    // Clean up in reverse order
    await db.delete(rosterMembers).where(eq(rosterMembers.contestantId, contestant.id));
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(athletes).where(eq(athletes.id, athlete1.id));
    await db.delete(athletes).where(eq(athletes.id, athlete2.id));
    await db.delete(athletes).where(eq(athletes.id, athlete3.id));
    await db.delete(athletes).where(eq(athletes.id, athlete4.id));
    await db.delete(athletes).where(eq(athletes.id, athlete5.id));
    await db.delete(contestGames).where(eq(contestGames.contestId, contest.id));
    await db.delete(games).where(eq(games.id, game.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
    await db.delete(teams).where(eq(teams.id, team.id));
  }, 10000);

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

  it("should return 400 if contestant already has a roster", async () => {
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

    // Create existing roster
    await db.insert(rosterMembers).values({
      contestantId: contestant.id,
      athleteId: athlete1.id,
    });

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: [athlete1.id],
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(400);

    // Clean up
    await db.delete(rosterMembers).where(eq(rosterMembers.contestantId, contestant.id));
    await db.delete(contestGames).where(eq(contestGames.contestId, contest.id));
    await db.delete(games).where(eq(games.id, game.id));
    await db.delete(athletes).where(eq(athletes.id, athlete1.id));
    await db.delete(teams).where(eq(teams.id, team.id));
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 400 if athletes are not draftable in contest", async () => {
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

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: [athlete1.id],
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(400);

    // Clean up
    await db.delete(athletes).where(eq(athletes.id, athlete1.id));
    await db.delete(teams).where(eq(teams.id, team.id));
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 400 if wrong number of athletes provided", async () => {
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

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: ["00000000-0000-4000-a000-000000000000"], // Only 1 athlete
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(400);

    // Clean up
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 400 if athlete IDs are not valid strings", async () => {
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

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: ["", "id-1", "id-2", "id-3", "id-4"],
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(400);

    // Clean up
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 400 if request body is missing athleteIds", async () => {
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
      body: JSON.stringify({}),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(400);

    // Clean up
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 400 if number of athletes is not exactly 5", async () => {
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
        athleteIds: ["00000000-0000-4000-a000-000000000000"],
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(400);

    // Clean up
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 404 if athletes are not in contest", async () => {
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

    // Create a different team and athlete not in the contest
    const otherTeamId = randomUUID();
    const [otherTeam] = await db
      .insert(teams)
      .values({
        id: otherTeamId,
        name: "Other Team",
        league: "nba",
      })
      .returning();

    const otherAthleteId = randomUUID();
    const [otherAthlete] = await db
      .insert(athletes)
      .values({
        id: otherAthleteId,
        name: "Other Athlete",
        teamId: otherTeam.id,
        position: "PG",
        cost: 100,
      })
      .returning();

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: [athlete1.id, otherAthlete.id, athlete1.id, athlete1.id, athlete1.id],
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(404);

    // Clean up
    await db.delete(contestGames).where(eq(contestGames.contestId, contest.id));
    await db.delete(games).where(eq(games.id, game.id));
    await db.delete(athletes).where(eq(athletes.id, athlete1.id));
    await db.delete(athletes).where(eq(athletes.id, otherAthlete.id));
    await db.delete(teams).where(eq(teams.id, team.id));
    await db.delete(teams).where(eq(teams.id, otherTeam.id));
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 400 if contestant already has a roster", async () => {
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

    // Create initial roster
    await db.insert(rosterMembers).values({
      contestantId: contestant.id,
      athleteId: athlete1.id,
    });

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: [athlete1.id, athlete1.id, athlete1.id, athlete1.id, athlete1.id],
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(400);

    // Clean up
    await db.delete(rosterMembers).where(eq(rosterMembers.contestantId, contestant.id));
    await db.delete(contestGames).where(eq(contestGames.contestId, contest.id));
    await db.delete(games).where(eq(games.id, game.id));
    await db.delete(athletes).where(eq(athletes.id, athlete1.id));
    await db.delete(teams).where(eq(teams.id, team.id));
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
  });

  it("should return 500 for internal server error", async () => {
    // Create test data
    const contestId = randomUUID();
    const userId = randomUUID();
    const contestantId = randomUUID();
    const teamId = randomUUID();

    await db.insert(contests).values({
      id: contestId,
      name: "Test Contest",
      league: "nba",
      startTime: new Date(),
      status: "upcoming",
    });

    await db.insert(users).values({
      id: userId,
      name: "Test User",
    });

    await db.insert(teams).values({
      id: teamId,
      name: "Test Team",
      league: "nba",
    });

    await db.insert(contestants).values({
      id: contestantId,
      name: "Test Contestant",
      contestId,
      userId,
      totalXp: 0,
      spendableXp: 0,
      statPower: {},
    });

    // Mock query to return contestant
    jest.spyOn(db.query.contestants, "findFirst").mockResolvedValue({
      id: contestantId,
      name: "Test Contestant",
      contestId,
      userId,
      totalXp: 0,
      spendableXp: 0,
      statPower: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      roster: [],
    } as ContestantWithRoster);

    // Mock query to return athletes
    const athleteIds = [randomUUID(), randomUUID(), randomUUID(), randomUUID(), randomUUID()];

    jest.spyOn(db.query.athletes, "findMany").mockResolvedValue(
      athleteIds.map((id) => ({
        id,
        name: "Test Athlete",
        teamId,
        position: "PG",
        cost: 100,
        team: {
          id: teamId,
          name: "Test Team",
          league: "nba",
        },
      })) as AthleteWithTeam[]
    );

    // Mock getDraftableAthletes to return athletes
    jest.spyOn(require("@/app/service/contest"), "getDraftableAthletes").mockResolvedValue(
      athleteIds.map((id) => ({
        id,
        name: "Test Athlete",
        teamId,
        position: "PG",
        cost: 100,
      }))
    );

    // Mock insert to throw error
    jest.spyOn(db, "insert").mockImplementation(() => {
      throw new Error("Database error");
    });

    const request = new NextRequest(`http://localhost:3000/api/contestants/${contestantId}/roster`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        athleteIds,
      }),
    });

    const response = await POST(request, { params: Promise.resolve({ id: contestantId }) });

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ error: "Internal Server Error" });

    // Restore original methods
    jest.restoreAllMocks();

    // Clean up test data
    await db.delete(contestants).where(eq(contestants.id, contestantId));
    await db.delete(users).where(eq(users.id, userId));
    await db.delete(teams).where(eq(teams.id, teamId));
    await db.delete(contests).where(eq(contests.id, contestId));
  });

  it("should return 400 if one or more athletes are not in contest", async () => {
    // Create test data in correct order
    const contestTeamId = randomUUID();
    const [contestTeam] = await db
      .insert(teams)
      .values({
        id: contestTeamId,
        name: "Contest Team",
        league: "nba",
      })
      .returning();

    const [contestGame] = await db
      .insert(games)
      .values({
        id: randomUUID(),
        homeTeamId: contestTeam.id,
        awayTeamId: contestTeam.id,
        startTime: new Date(),
        status: "upcoming",
      })
      .returning();

    const [contest] = await db
      .insert(contests)
      .values({
        name: "Test Contest",
        league: "nba",
        status: "upcoming",
        startTime: new Date(),
      })
      .returning();

    await db.insert(contestGames).values({
      contestId: contest.id,
      gameId: contestGame.id,
    });

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

    // Create a team that's not in the contest
    const otherTeamId = randomUUID();
    const [otherTeam] = await db
      .insert(teams)
      .values({
        id: otherTeamId,
        name: "Other Team",
        league: "nba",
      })
      .returning();

    // Create a game for the other team (not in the contest)
    const [otherGame] = await db
      .insert(games)
      .values({
        id: randomUUID(),
        homeTeamId: otherTeam.id,
        awayTeamId: otherTeam.id,
        startTime: new Date(),
        status: "upcoming",
      })
      .returning();

    // Create athletes from both teams
    const contestAthleteId = randomUUID();
    const [contestAthlete] = await db
      .insert(athletes)
      .values({
        id: contestAthleteId,
        name: "Contest Athlete",
        teamId: contestTeam.id,
        position: "PG",
        cost: 100,
      })
      .returning();

    // Create 5 athletes from the other team
    const otherAthletes = await Promise.all(
      Array.from({ length: 5 }, async (_, i) => {
        const [athlete] = await db
          .insert(athletes)
          .values({
            id: randomUUID(),
            name: `Other Athlete ${i + 1}`,
            teamId: otherTeam.id,
            position: "SG",
            cost: 100,
          })
          .returning();
        return athlete;
      })
    );

    const request = new NextRequest("http://localhost:3000/api/contestants/123/roster", {
      method: "POST",
      body: JSON.stringify({
        athleteIds: [contestAthlete.id, ...otherAthletes.map((a) => a.id)].slice(0, 5),
      }),
    });
    const response = await POST(request, { params: Promise.resolve({ id: contestant.id }) });
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("One or more athletes not in contest");

    // Clean up in reverse order
    await db.delete(athletes).where(eq(athletes.id, contestAthlete.id));
    for (const athlete of otherAthletes) {
      await db.delete(athletes).where(eq(athletes.id, athlete.id));
    }
    await db.delete(games).where(eq(games.id, otherGame.id));
    await db.delete(contestants).where(eq(contestants.id, contestant.id));
    await db.delete(users).where(eq(users.id, user.id));
    await db.delete(contestGames).where(eq(contestGames.contestId, contest.id));
    await db.delete(games).where(eq(games.id, contestGame.id));
    await db.delete(contests).where(eq(contests.id, contest.id));
    await db.delete(teams).where(eq(teams.id, contestTeam.id));
    await db.delete(teams).where(eq(teams.id, otherTeam.id));
  });
});
