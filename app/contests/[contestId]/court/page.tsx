"use client";

import { useEffect, useState } from "react";
import { useContestGameState } from "@/app/hooks/useContestGameState";
import { useParams } from "next/navigation";
import GameRoom from "@/components/court/GameRoom";
import GameRoomVerticle from "@/components/court/GameRoomVerticle";

export default function GamePage() {
  const [isVertical, setIsVertical] = useState(false);
  const params = useParams();
  const contestId =
    typeof params.contestId === "string"
      ? params.contestId
      : Array.isArray(params.contestId)
      ? params.contestId[0]
      : undefined;
  const { contestGameState, isLoading, isError } = useContestGameState(
    contestId || null
  );

  useEffect(() => {
    const checkOrientation = () => {
      setIsVertical(window.innerHeight > window.innerWidth);
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#2E2A24] text-white">
        Loading...
      </div>
    );
  }
  if (isError || !contestGameState) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#2E2A24] text-red-500">
        Error loading contest state
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-[#2E2A24] min-h-screen overflow-hidden">
      {isVertical ? (
        <GameRoomVerticle />
      ) : (
        <GameRoom contest={contestGameState} />
      )}
    </div>
  );
}
