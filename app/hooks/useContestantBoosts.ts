import { Boost } from "@/types/db";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url: string): Promise<Boost[]> =>
  fetch(url).then((res) => res.json());

export function useContestantBoosts(contestantId: string | null) {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!contestantId) return;

    const timer = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, 5 * 60 * 1000);

    return () => clearInterval(timer);
  }, [contestantId]);

  const { data, error, isLoading, mutate } = useSWR<Boost[]>(
    contestantId
      ? [`/api/contestants/${contestantId}/boost`, refreshKey]
      : null,
    ([url]) => fetcher(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 5 * 60 * 1000,
      dedupingInterval: 5 * 60 * 1000 - 1000,
    }
  );

  return {
    boost: data,
    isLoading,
    isError: error,
    mutate,
  };
}
