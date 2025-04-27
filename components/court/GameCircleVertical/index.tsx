"use client";

import { useEffect, useState } from "react";
import { PlayerCard } from "../PlayerCard";
import { GameFeed } from "../GameFeed";
import { ContestGameState } from "@/app/hooks/useContestGameState";

const BASE_WIDTH = 750;
const BASE_HEIGHT = 1200;

interface GameCircleVerticalProps {
  contest: ContestGameState;
}

export function GameCircleVertical({ contest }: GameCircleVerticalProps) {
  const [scale, setScale] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const availableWidth = window.innerWidth * 1;
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
    "absolute top-[20px] left-1/2 -translate-x-1/2",
    "absolute top-[250px] left-[20px]",
    "absolute top-[250px] right-[20px]",
    "absolute bottom-[250px] left-[20px]",
    "absolute bottom-[250px] right-[20px]",
    "absolute bottom-[20px] left-1/2 -translate-x-1/2",
  ];

  return (
    <div
      className="relative"
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
        {/* Background - Rotated for vertical layout */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 w-[160%] h-[160%]"
            style={{
              transform: "translate(-50%, -50%) rotate(90deg)",
              transformOrigin: "center center",
            }}
          >
            <img src="/images/football-bg.png" alt="Football Background" className="w-full h-full object-contain" />
          </div>
        </div>
        <GameFeed />
        {contest.contestants.map((contestant, idx) => (
          <div key={contestant.id} className={positions[idx] || ""}>
            <PlayerCard contestant={contestant} />
          </div>
        ))}
      </div>
    </div>
  );
}
