"use client";

import { useEffect, useState } from "react";
import { PlayerCard } from "../PlayerCard";
import { useContest } from "@/contexts/ContestContext";
import { GameFeed } from "../GameFeed";

const BASE_WIDTH = 750;
const BASE_HEIGHT = 1200;

export const GameCircleVertical = () => {
  const [scale, setScale] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const { contestants } = useContest();

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

  if (!isLoaded || !contestants.length) {
    return null;
  }

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

        {/* Game Feed */}
        <GameFeed />

        {/* Player cards - Adjusted for vertical layout */}
        {contestants.length > 0 && (
          <div className="absolute top-[20px] left-1/2 -translate-x-1/2">
            <PlayerCard contestantId={0} winner />
          </div>
        )}
        {contestants.length > 1 && (
          <div className="absolute top-[250px] left-[20px]">
            <PlayerCard contestantId={1} />
          </div>
        )}
        {contestants.length > 2 && (
          <div className="absolute top-[250px] right-[20px]">
            <PlayerCard contestantId={2} />
          </div>
        )}
        {contestants.length > 3 && (
          <div className="absolute bottom-[250px] left-[20px]">
            <PlayerCard contestantId={3} winner />
          </div>
        )}
        {contestants.length > 4 && (
          <div className="absolute bottom-[250px] right-[20px]">
            <PlayerCard contestantId={4} />
          </div>
        )}
        {contestants.length > 5 && (
          <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2">
            <PlayerCard contestantId={5} />
          </div>
        )}
      </div>
    </div>
  );
};
