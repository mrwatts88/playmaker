"use client";

import { useContest } from "@/contexts/ContestContext";

interface StatContainerProps {
  contestantId: number;
  isWinner?: boolean;
}

export const StatContainer = ({ contestantId, isWinner }: StatContainerProps) => {
  const { contestants } = useContest();
  const contestant = contestants[contestantId];

  if (!contestant) {
    return null;
  }

  return (
    <div
      className={`z-10 rounded-2xl border p-3 bg-[#0A0A0A] w-[170px] h-[150px] shadow-lg -mt-6 flex flex-col justify-center ${
        isWinner ? "border-yellow-500 shadow-[0_0_1em_rgba(245,158,11,0.8)]" : "border-gray-700"
      }`}
    >
      <div className="text-white text-center text-2xl mb-1">{contestant.name}</div>
      <div className="flex items-center justify-center mb-1 text-sm text-white">
        <span className="text-[#FFD84D] mr-1">SXP:</span>
        <span className="text-lg">{contestant.sxp}</span>&nbsp;&nbsp;
        <span className="text-[#FFD84D] mr-1">XP:</span>
        <span className="text-lg">{contestant.xp}</span>
      </div>
      <StatBar value={contestant.points} label="TDS" labelValue={contestant.points.toString()} />
      <StatBar value={contestant.rebounds} label="RSH" labelValue={contestant.rebounds.toString()} />
      <StatBar value={contestant.assists} label="PAS" labelValue={contestant.assists.toString()} />
    </div>
  );
};

const StatBar = ({ value, label, labelValue }: { value: number; label: string; labelValue: string }) => {
  return (
    <div className="flex flex-row items-center justify-center mb-1">
      <div className="text-[#FFD84D] text-xs mr-2 w-[25px]">{label}</div>
      <div className="flex-1 h-2 bg-gray-800 rounded-[2px] mx-0">
        <div className="h-full bg-orange-500 rounded-[2px]" style={{ width: `${Math.min(value * 10, 100)}%` }}></div>
      </div>
      <div className="text-[#FFD84D] text-xs ml-1 w-[25px] text-right">{labelValue}x</div>
    </div>
  );
};
