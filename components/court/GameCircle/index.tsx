"use client";

import { useEffect, useState } from "react";
import { PlayerCard } from "../PlayerCard";
import { GameFeed } from "../GameFeed";
import { ContestGameState } from "@/app/hooks/useContestGameState";

const BASE_WIDTH = 1200;
const BASE_HEIGHT = 750;

interface GameCircleProps {
  contest: ContestGameState;
}

export function GameCircle({ contest }: GameCircleProps) {
  const [scale, setScale] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const availableWidth = window.innerWidth * 0.9;
      const availableHeight = window.innerHeight * 0.9;
      const scaleX = availableWidth / BASE_WIDTH;
      const scaleY = availableHeight / BASE_HEIGHT;
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
      setIsLoaded(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLoaded || !contest?.contestants?.length) {
    return null;
  }

  // Position classes for up to 6 contestants
  const positions = [
    "absolute top-[20px] left-[200px]",
    "absolute top-[20px] right-[200px]",
    "absolute top-1/2 left-[-50px] -translate-y-1/2",
    "absolute top-1/2 right-[-50px] -translate-y-1/2",
    "absolute bottom-[20px] left-[200px]",
    "absolute bottom-[20px] right-[200px]",
  ];

  return (
    <div
      className="relative px-4"
      style={{
        width: `${BASE_WIDTH * scale}px`,
        height: `${BASE_HEIGHT * scale}px`,
      }}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Background */}
        <img src="/images/football-bg.png" alt="Football Background" className="absolute inset-0 w-full h-full object-cover z-0" />
        {/* Game Feed */}
        <GameFeed />
        {/* Player cards */}
        {contest.contestants.map((contestant, idx) => (
          <div key={contestant.id} className={positions[idx] || ""}>
            <PlayerCard contestant={contestant} />
          </div>
        ))}
      </div>
    </div>
  );
}
