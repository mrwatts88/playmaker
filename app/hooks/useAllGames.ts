import useSWR from "swr";
import { Game } from "@/types/db";

interface GamesData {
  data: Game[];
}

const fetcher = (url: string): Promise<GamesData> =>
  fetch(url).then((res) => res.json());

export function useAllGames() {
  const { data, error, isLoading } = useSWR<GamesData>(`/api/games`, fetcher);

  return {
    games: data,
    isLoading,
    isError: error,
  };
}
