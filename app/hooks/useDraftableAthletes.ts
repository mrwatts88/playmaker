import useSWR from "swr";

interface Team {
  id: string;
  apiId: string;
  dataSource: string;
  name: string;
  league: "nba" | "nfl" | "nhl" | "mlb";
}

export interface DraftableAthlete {
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDraftableAthletes(contestId: string) {
  const { data, error, isLoading } = useSWR<DraftableAthlete[]>(contestId ? `/api/contests/${contestId}/draftable-athletes` : null, fetcher, {
    refreshInterval: 5000, // Poll every 5 seconds for updates
    revalidateOnFocus: true,
    dedupingInterval: 1000,
  });

  return {
    athletes: data || [],
    isLoading,
    isError: error,
  };
}
