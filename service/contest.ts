import { db } from "@/db/db";
import { athletes, contestGames, contests, games } from "@/db/schema/schema";
import { eq, inArray } from "drizzle-orm";

type GameWithTeams = typeof games.$inferSelect & {
  homeTeam: { league: string };
  awayTeam: { league: string };
};

export const createContestWithGames = async (
  contestName: string,
  gameIds: string[],
  league: "nba" | "nfl" | "nhl" | "mlb"
) => {
  try {
    // Fetch all games with their team information to verify they exist and belong to the same league
    const existingGames = (await db.query.games.findMany({
      where: inArray(games.id, gameIds),
      with: {
        homeTeam: {},
        awayTeam: {},
      },
    })) as GameWithTeams[];

    if (existingGames.length !== gameIds.length) {
      throw new Error("One or more games not found");
    }

    // Verify all games belong to the same league
    const invalidLeagueGames = existingGames.filter(
      (game) =>
        game.homeTeam.league !== league || game.awayTeam.league !== league
    );

    if (invalidLeagueGames.length > 0) {
      throw new Error("One or more games belong to a different league");
    }

    // verify all games are not completed -----> Added comments as we need to check completed games
    // const completedGames = existingGames.filter(
    //   (game) => game.status === "completed"
    // );
    // if (completedGames.length > 0) {
    //   throw new Error("One or more games are completed");
    // }

    // Create contest
    const [contest] = await db
      .insert(contests)
      .values({
        name: contestName,
        league,
        status: existingGames.some((game) => game.status === "active")
          ? "active"
          : "upcoming",
        startTime: existingGames[0].startTime,
      })
      .returning();

    try {
      // Create contest games
      await Promise.all(
        existingGames.map((game) =>
          db.insert(contestGames).values({
            gameId: game.id,
            contestId: contest.id,
          })
        )
      );

      return contest;
    } catch (error) {
      // If creating contest games fails, delete the contest to maintain consistency
      await db.delete(contests).where(eq(contests.id, contest.id));
      throw error;
    }
  } catch (error) {
    console.error("Error creating contest:", error);
    if (error instanceof Error) {
      if (
        error.message === "One or more games not found" ||
        error.message === "One or more games belong to a different league" ||
        error.message === "One or more games are completed"
      ) {
        throw error;
      }
    }
    throw new Error("Internal Server Error");
  }
};

export const getDraftableAthletes = async (contestId: string) => {
  // Get all team IDs from games in this contest
  const contestGamesWithTeams = await db
    .select({
      homeTeamId: games.homeTeamId,
      awayTeamId: games.awayTeamId,
    })
    .from(games)
    .innerJoin(contestGames, eq(contestGames.gameId, games.id))
    .where(eq(contestGames.contestId, contestId));

  // Extract all valid team IDs from the contest's games
  const validTeamIds = contestGamesWithTeams.flatMap((game) => [
    game.homeTeamId,
    game.awayTeamId,
  ]);

  // Get all athletes from these teams
  return await db.query.athletes.findMany({
    where: inArray(athletes.teamId, validTeamIds),
    with: {
      team: true,
    },
  });
};
