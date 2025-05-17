import { Boost } from "@/types/db";
import React from "react";

const ShowStat: React.FC<{
  boost: Boost;
}> = ({ boost }) => {
  const { name, type, stat, cost, value } = boost;
  return (
    <div className="text-xs p-2 bg-white rounded shadow-sm space-y-1 w-max min-w-[150px]">
      <div className="font-semibold text-gray-800">{name}</div>
      <div className="flex gap-6 justify-between text-gray-600">
        <span>Type:</span>
        <span className="font-medium">{type}</span>
      </div>
      <div className="flex gap-6 justify-between text-gray-600">
        <span>Stat:</span>
        <span className="font-medium">{stat}</span>
      </div>
      <div className="flex gap-6 justify-between text-gray-600">
        <span>Cost:</span>
        <span className="font-medium">{cost}XP</span>
      </div>
      <div className="flex gap-6 justify-between text-gray-600">
        <span>Value:</span>
        <span className="font-medium">{value}XP</span>
      </div>
    </div>
  );
};

export default ShowStat;
