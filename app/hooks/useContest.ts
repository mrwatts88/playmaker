import useSWR from "swr";
import { Contest } from "./useContests";

interface Game {
  id: string;
  apiId: string;
  dataSource: string;
  league: "nba" | "nfl" | "nhl" | "mlb";
  name: string;
  startTime: string;
  status: "upcoming" | "active" | "completed";
  homeTeamId: string;
  awayTeamId: string;
  createdAt: string;
  updatedAt: string;
}

interface ContestDetails extends Contest {
  games: Game[];
  contestants: any[];
  eventHistory: any[];
  availableBoosts: any[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useContest(contestId: string) {
  const { data, error, isLoading } = useSWR<ContestDetails>(contestId ? `/api/contests/${contestId}/game` : null, fetcher, {
    refreshInterval: 5000, // Poll every 5 seconds for updates
    revalidateOnFocus: true,
    dedupingInterval: 1000,
  });

  return {
    contest: data,
    isLoading,
    isError: error,
  };
}
