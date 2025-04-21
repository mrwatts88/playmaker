"use client";

import { useEffect, useState } from "react";
import { GameCircle } from "@/components/GameCircle";
import { GameCircleVertical } from "@/components/GameCircleVertical";

export default function GamePage() {
  const [isVertical, setIsVertical] = useState(false);

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] overflow-hidden">
      {isVertical ? <GameCircleVertical /> : <GameCircle />}
    </div>
  );
}
