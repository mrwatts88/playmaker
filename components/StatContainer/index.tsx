export const StatContainer = () => {
  return (
    <div className="rounded-2xl border border-gray-700 p-3 pt-4 bg-[#0A0A0A] w-[170px] h-[150px] shadow-[0_0_15px_rgba(0,0,0,0.3)] -mt-6 flex flex-col justify-center">
      <div className="text-white text-center text-xl mb-1">MATT</div>
      <div className="flex items-center justify-center mb-1 text-sm text-white">
        <span className="text-[#FFD84D] mr-1">SXP:</span> 100&nbsp;&nbsp;
        <span className="text-[#FFD84D] mr-1">XP:</span> 200
      </div>
      <StatBar value={15} label="PTS" labelValue="15" />
      <StatBar value={8} label="REB" labelValue="8" />
      <StatBar value={4} label="AST" labelValue="4" />
    </div>
  );
};

const StatBar = ({ value, label, labelValue }: { value: number; label: string; labelValue: string }) => {
  return (
    <div className="flex flex-row items-center justify-between mb-1">
      <div className="text-[#FFD84D] text-xs mr-2">{label}</div>
      <div className="flex-1 h-2 bg-gray-800 rounded-full">
        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${value * 5}%` }}></div>
      </div>
      <div className="text-[#FFD84D] text-xs ml-2 w-[20px] text-right">{labelValue}</div>
    </div>
  );
};
