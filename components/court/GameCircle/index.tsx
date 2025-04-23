"use client";

import { useEffect, useState } from "react";
import { PlayerCard } from "../PlayerCard";
import { useContest } from "@/contexts/ContestContext";
import { GameFeed } from "../GameFeed";

const BASE_WIDTH = 1200;
const BASE_HEIGHT = 750;

export const GameCircle = () => {
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
        {/* Background */}
        <img src="/images/football-bg.png" alt="Football Background" className="absolute inset-0 w-full h-full object-contain z-0" />

        {/* Game Feed */}
        <GameFeed />

        {/* Player cards */}
        {contestants.length > 0 && (
          <div className="absolute top-[20px] left-[200px]">
            <PlayerCard contestantId={0} winner />
          </div>
        )}
        {contestants.length > 1 && (
          <div className="absolute top-[20px] right-[200px]">
            <PlayerCard contestantId={1} />
          </div>
        )}
        {contestants.length > 2 && (
          <div className="absolute top-1/2 left-[-50px] -translate-y-1/2">
            <PlayerCard contestantId={2} />
          </div>
        )}
        {contestants.length > 3 && (
          <div className="absolute top-1/2 right-[-50px] -translate-y-1/2">
            <PlayerCard contestantId={3} winner />
          </div>
        )}
        {contestants.length > 4 && (
          <div className="absolute bottom-[20px] left-[200px]">
            <PlayerCard contestantId={4} />
          </div>
        )}
        {contestants.length > 5 && (
          <div className="absolute bottom-[20px] right-[200px]">
            <PlayerCard contestantId={5} />
          </div>
        )}
      </div>
    </div>
  );
};
