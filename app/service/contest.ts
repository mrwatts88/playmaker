import { db } from "@/db/db";
import { athletes, contestGames, contests, games } from "@/db/schema/schema";
import { eq, inArray } from "drizzle-orm";

type GameWithTeams = typeof games.$inferSelect & {
  homeTeam: { league: string };
  awayTeam: { league: string };
};

export const createContestWithGames = async (contestName: string, gameIds: string[], league: "nba" | "nfl" | "nhl" | "mlb") => {
  // Fetch all games with their team information to verify they exist and belong to the same league
  const existingGames = (await db.query.games.findMany({
    where: inArray(games.id, gameIds),
    with: {
      homeTeam: {
        columns: {
          league: true,
        },
      },
      awayTeam: {
        columns: {
          league: true,
        },
      },
    },
  })) as GameWithTeams[];

  if (existingGames.length !== gameIds.length) {
    throw new Error("One or more games not found");
  }

  // Verify all games belong to the same league
  const invalidLeagueGames = existingGames.filter((game) => game.homeTeam.league !== league || game.awayTeam.league !== league);

  if (invalidLeagueGames.length > 0) {
    throw new Error("One or more games belong to a different league");
  }

  // Create contest
  const [contest] = await db
    .insert(contests)
    .values({
      name: contestName,
      league,
      status: existingGames.some((game) => game.status === "active") ? "active" : "upcoming",
      startTime: existingGames[0].startTime,
    })
    .returning();

  // Create contest games
  for (const game of existingGames) {
    await db.insert(contestGames).values({
      gameId: game.id,
      contestId: contest.id,
    });
  }

  return contest;
};

export const getDraftableAthletes = async (contestId: string) => {
  // Get all games for this contest
  const contestGameList = await db.query.contestGames.findMany({
    where: eq(contestGames.contestId, contestId),
  });

  // Get all games with their teams
  const gamesWithTeams = await db.query.games.findMany({
    where: inArray(
      games.id,
      contestGameList.map((cg) => cg.gameId)
    ),
  });

  // Get all team IDs from the games
  const teamIds = gamesWithTeams.flatMap((game) => [game.homeTeamId, game.awayTeamId]);

  // Get all athletes from these teams
  return await db.query.athletes.findMany({
    where: inArray(athletes.teamId, teamIds),
    with: {
      team: true,
    },
  });
};
