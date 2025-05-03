"use client";

import type { Contestant } from "@/types/api";

interface StatContainerProps {
  contestant: Contestant;
}

export const StatContainer = ({ contestant }: StatContainerProps) => {
  return (
    <div
      className={`z-10 rounded-2xl border p-3 bg-[#0A0A0A] w-[170px] h-[165px] shadow-lg -mt-6 flex flex-col justify-center ${
        false ? "border-yellow-500 shadow-[0_0_1em_rgba(245,158,11,0.8)]" : "border-gray-700"
      }`}
    >
      <div className="text-white text-center text-xl mb-1 truncate max-w-full w-full">{contestant.name}</div>
      <div className="flex items-center justify-center mb-1 text-sm text-white">
        <span className="text-lg text-green-500">{contestant.spendableXp}&nbsp;&nbsp;</span>
        <span className="text-lg text-gray-500">/&nbsp;&nbsp;</span>
        <span className="text-lg text-orange-500">{contestant.totalXp}</span>
        &nbsp;&nbsp;
        <span className="text-[#FFD84D] mr-1">XP</span>
      </div>
      {(() => {
        const statPower = contestant.statPower as Record<string, number>;
        return (
          <>
            <StatBar value={statPower.points} label="PTS" labelValue={statPower.points?.toString() ?? "0"} />
            <StatBar value={statPower.rebounds} label="REB" labelValue={statPower.rebounds?.toString() ?? "0"} />
            <StatBar value={statPower.assists} label="AST" labelValue={statPower.assists?.toString() ?? "0"} />
            <StatBar value={statPower.defense} label="DEF" labelValue={statPower.defense?.toString() ?? "0"} />
          </>
        );
      })()}
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
