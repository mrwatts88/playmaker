import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useContestTeams(contestId: string) {
  const { data, error, isLoading } = useSWR(contestId ? `/api/contests/${contestId}/teams` : null, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 1000,
  });

  return {
    teams: data || [],
    isLoading,
    isError: error,
  };
}
