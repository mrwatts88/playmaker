import useSWR from "swr";
import { useEffect, useState } from "react";
import { Athlete } from "@/types/db";

export interface GameEvent {
  id: string;
  apiId: string;
  dataSource: "espncom" | "nbacom" | "sportradar" | "manual";
  league: "nba" | "nfl" | "nhl" | "mlb";
  createdAt: Date | null;
  gameId: string;
  athleteId: string | null;
  eventType: string;
  value: number | null;
  athlete: Athlete;
}

const fetcher = (url: string): Promise<GameEvent[]> =>
  fetch(url).then((res) => res.json());

export function useGameEvents(contestId: string) {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!contestId) return;

    const timer = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, 5 * 60 * 1000);

    return () => clearInterval(timer);
  }, [contestId]);

  const { data, error, isLoading } = useSWR<GameEvent[]>(
    contestId ? [`/api/contests/${contestId}/events`, refreshKey] : null,
    ([url]) => fetcher(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 5 * 60 * 1000,
      dedupingInterval: 5 * 60 * 1000 - 1000,
    }
  );

  return {
    gameEvents: data,
    isLoading,
    isError: error,
  };
}
