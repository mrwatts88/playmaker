import useSWR from "swr";
import type { ContestantWithRoster } from "@/types/api";

interface Team {
  id: string;
  apiId: string;
  dataSource: string;
  name: string;
  league: "nba" | "nfl" | "nhl" | "mlb";
}

interface Athlete {
  id: string;
  apiId: string;
  dataSource: string;
  league: "nba" | "nfl" | "nhl" | "mlb";
  name: string;
  teamId: string;
  position: string | null;
  cost: number;
  team?: Team;
}

interface RosterMember {
  contestantId: string;
  athleteId: string;
  athlete: Athlete;
}

export interface Contestant {
  id: string;
  contestId: string;
  userId: string;
  name: string;
  totalXp: number;
  spendableXp: number;
  statPower: Record<string, number>;
  createdAt: string;
  updatedAt: string;
  roster: RosterMember[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useContestant(contestantId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<ContestantWithRoster>(contestantId ? `/api/contestants/${contestantId}` : null, fetcher);

  return {
    contestant: data,
    isLoading,
    isError: error,
    mutate,
  };
}
