import { db } from "@/db/db";
import { athletes, contestants, contests, contestGames, games, rosterMembers, teams, users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contestants/[id]/roster/route";

describe("Contestants API", () => {
  let teamId: string;
  let gameId: string;
  let contestId: string;
  let userId: string;
  let contestantId: string;
  let athleteIds: string[];

  beforeAll(async () => {
    // Create test data in correct order
    teamId = randomUUID();
    const [team] = await db
      .insert(teams)
      .values({
        id: teamId,
        name: "Test Team",
        league: "nba",
      })
      .returning();

    gameId = randomUUID();
    const [game] = await db
      .insert(games)
      .values({
        id: gameId,
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
    contestId = contest.id;

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
    userId = user.id;

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
    contestantId = contestant.id;

    // Create 5 test athletes
    athleteIds = [];
    for (let i = 1; i <= 5; i++) {
      const athleteId = randomUUID();
      const [athlete] = await db
        .insert(athletes)
        .values({
          id: athleteId,
          name: `Test Athlete ${i}`,
          teamId: team.id,
          position: ["PG", "SG", "SF", "PF", "C"][i - 1],
          cost: 100,
        })
        .returning();
      athleteIds.push(athlete.id);
    }
  });

  afterAll(async () => {
    // Clean up in reverse order of dependencies
    await db.delete(rosterMembers).where(eq(rosterMembers.contestantId, contestantId));
    await db.delete(contestants).where(eq(contestants.id, contestantId));
    await db.delete(users).where(eq(users.id, userId));
    for (const athleteId of athleteIds) {
      await db.delete(athletes).where(eq(athletes.id, athleteId));
    }
    await db.delete(contestGames).where(eq(contestGames.contestId, contestId));
    await db.delete(games).where(eq(games.id, gameId));
    await db.delete(contests).where(eq(contests.id, contestId));
    await db.delete(teams).where(eq(teams.id, teamId));
  });

  it("should submit a valid roster", async () => {
    const request = new NextRequest(new URL(`http://localhost:3000/api/contestants/${contestantId}/roster`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        athleteIds: athleteIds,
      }),
    });

    const response = await POST(request, { params: Promise.resolve({ id: contestantId }) });
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toEqual({ message: "Roster submitted successfully" });

    // Verify roster was created in database
    const rosterMembers = await db.query.rosterMembers.findMany({
      where: (rosterMembers, { eq }) => eq(rosterMembers.contestantId, contestantId),
    });
    expect(rosterMembers.length).toBe(5);
    expect(rosterMembers.map((rm) => rm.athleteId).sort()).toEqual(athleteIds.sort());
  });
});
