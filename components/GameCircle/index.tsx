"use client";

import { useEffect, useState } from "react";
import { PlayerCard } from "../PlayerCard";

const BASE_WIDTH = 1200;
const BASE_HEIGHT = 750;

export const GameCircle = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const availableWidth = window.innerWidth * 0.9;
      const newScale = Math.min(availableWidth / BASE_WIDTH, 1);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {/* Background */}
        <img src="/images/football-bg.png" alt="Football Background" className="absolute inset-0 w-full h-full object-contain z-0" />

        {/* Player cards */}
        <div className="absolute top-[20px] left-[200px]">
          <PlayerCard winner />
        </div>
        <div className="absolute top-[20px] right-[200px]">
          <PlayerCard />
        </div>
        <div className="absolute top-1/2 left-[-50px] -translate-y-1/2">
          <PlayerCard />
        </div>
        <div className="absolute top-1/2 right-[-50px] -translate-y-1/2">
          <PlayerCard />
        </div>
        <div className="absolute bottom-[20px] left-[200px]">
          <PlayerCard />
        </div>
        <div className="absolute bottom-[20px] right-[200px]">
          <PlayerCard />
        </div>
      </div>
    </div>
  );
};
