import useSWR from "swr";
import type { Contest } from "./useContests";
import type { Contestant } from "@/types/api";
import type { Game } from "@/types/db";

interface EventHistoryItem {
  [key: string]: unknown;
}

interface AvailableBoost {
  [key: string]: unknown;
}

interface ContestDetails extends Contest {
  games: Game[];
  contestants: Contestant[];
  eventHistory: EventHistoryItem[];
  availableBoosts: AvailableBoost[];
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
