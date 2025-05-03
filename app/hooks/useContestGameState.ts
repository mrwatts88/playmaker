import useSWR from "swr";
import type { Contestant } from "@/types/api";
import type { Game } from "@/types/db";

interface EventHistoryItem {
  // TODO: define fields based on your event structure
  [key: string]: unknown;
}

interface AvailableBoost {
  // TODO: define fields based on your boost structure
  [key: string]: unknown;
}

export interface ContestGameState {
  id: string;
  name: string;
  league: string;
  status: string;
  startTime: string;
  contestants: Contestant[];
  eventHistory: EventHistoryItem[];
  availableBoosts: AvailableBoost[];
  games: Game[];
  // Add more fields as needed
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useContestGameState(contestId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<ContestGameState>(contestId ? `/api/contests/${contestId}/game` : null, fetcher, {
    refreshInterval: 5000, // Poll every 5 seconds for updates
    revalidateOnFocus: true,
    dedupingInterval: 1000,
  });

  return {
    contestGameState: data,
    isLoading,
    isError: error,
    mutate,
  };
}
