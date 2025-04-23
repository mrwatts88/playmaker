"use client";

import { useEffect, useState } from "react";
import { GameCircle } from "@/components/court/GameCircle";
import { GameCircleVertical } from "@/components/court/GameCircleVertical";

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
    <div className="flex justify-center items-center min-h-screen bg-[#2E2A24] overflow-hidden">
      {isVertical ? <GameCircleVertical /> : <GameCircle />}
    </div>
  );
}
