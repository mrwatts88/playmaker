"use client";

import { useEffect, useState } from "react";
import { useContestGameState } from "@/app/hooks/useContestGameState";
import { useParams } from "next/navigation";
import { GameCircle } from "@/components/court/GameCircle";
import { GameCircleVertical } from "@/components/court/GameCircleVertical";

export default function GamePage() {
  const [isVertical, setIsVertical] = useState(false);
  const params = useParams();
  const contestId = typeof params.contestId === "string" ? params.contestId : Array.isArray(params.contestId) ? params.contestId[0] : undefined;
  const { contestGameState, isLoading, isError } = useContestGameState(contestId || null);

  useEffect(() => {
    const checkOrientation = () => {
      // Use window.innerHeight > window.innerWidth as the condition for vertical layout
      setIsVertical(window.innerHeight > window.innerWidth);
    };

    // Initial check
    checkOrientation();

    // Add resize listener
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-[#2E2A24] text-white">Loading...</div>;
  }
  if (isError || !contestGameState) {
    return <div className="flex justify-center items-center min-h-screen bg-[#2E2A24] text-red-500">Error loading contest state</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#2E2A24] overflow-hidden">
      {isVertical ? <GameCircleVertical contest={contestGameState} /> : <GameCircle contest={contestGameState} />}
    </div>
  );
}
