import { leagueType } from "@/db/schema/schema";

type NBAStatPower = {
  points: number;
  rebounds: number;
  assists: number;
  defense: number;
};

type NFLStatPower = {
  passing: number;
  rushing: number;
  receiving: number;
  defense: number;
};

type NHLStatPower = {
  goals: number;
  assists: number;
  hits: number;
  blocks: number;
};

type MLBStatPower = {
  hits: number;
  runs: number;
  pitching: number;
  outfield: number;
};

type LeagueStatPower = NBAStatPower | NFLStatPower | NHLStatPower | MLBStatPower;

export const leagueStatPower: Record<(typeof leagueType.enumValues)[number], LeagueStatPower> = {
  nba: {
    points: 0,
    rebounds: 0,
    assists: 0,
    defense: 0,
  },
  nfl: {
    passing: 0,
    rushing: 0,
    receiving: 0,
    defense: 0,
  },
  nhl: {
    goals: 0,
    assists: 0,
    hits: 0,
    blocks: 0,
  },
  mlb: {
    hits: 0,
    runs: 0,
    pitching: 0,
    outfield: 0,
  },
};

export const startingContestantXp = 1000;
