import useSWR from "swr";

export interface Contest {
  id: string;
  name: string;
  status: "upcoming" | "active" | "completed";
  league: "nba" | "nfl" | "nhl" | "mlb";
  startTime: string;
}

interface UseContestsOptions {
  league?: Contest["league"];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useContests(options: UseContestsOptions = {}) {
  const { league } = options;
  const queryString = league ? `?league=${league}` : "";

  const { data, error, isLoading, mutate } = useSWR<Contest[]>(`/api/contests${queryString}`, fetcher);

  return {
    contests: data,
    isLoading,
    isError: error,
    mutate,
  };
}
