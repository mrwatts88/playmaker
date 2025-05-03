import useSWR from "swr";

export interface Team {
  id: string;
  apiId: string;
  dataSource: string;
  name: string;
  league: "nba" | "nfl" | "nhl" | "mlb";
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
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useContestant(contestantId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Contestant>(contestantId ? `/api/contestants/${contestantId}` : null, fetcher);

  return {
    contestant: data,
    isLoading,
    isError: error,
    mutate,
  };
}
