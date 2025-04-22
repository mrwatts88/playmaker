"use client";

import { use } from "react";

export default function Contestant({ params }: { params: Promise<{ contestantId: string }> }) {
  const { contestantId } = use(params);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] text-white px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center w-full max-w-[90vw]">Manager View</h1>
      <p className="mb-4">Contestant ID: {contestantId}</p>
      <p className="text-center">Spend XP or view others rosters</p>
    </div>
  );
}
