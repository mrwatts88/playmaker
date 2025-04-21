export const StatContainer = () => {
  return (
    <div className="rounded-2xl border-1 border-gray-700 p-3 pt-4 bg-[#0A0A0A] w-[210px] h-[200px] shadow-[0_0_15px_rgba(0,0,0,0.3)] -mt-6 flex flex-col justify-center">
      <div className="text-white text-center text-2xl mb-2">MATT</div>
      <div className="flex items-center justify-center mb-2">
        <div className="text-center flex items-center justify-center mr-4">
          <span className="text-[#FFD84D] text-lg">SXP&nbsp;</span>
          <span className="text-white text-2xl">100</span>
        </div>
        <div className="text-center flex items-center justify-center">
          <span className="text-[#FFD84D] text-lg">XP&nbsp;</span>
          <span className="text-white text-2xl">200</span>
        </div>
      </div>
      <StatBar value={15} label="PTS" labelValue="15" />
      <StatBar value={8} label="REB" labelValue="8" />
      <StatBar value={4} label="AST" labelValue="4" />
    </div>
  );
};

const StatBar = ({ value, label, labelValue }: { value: number; label: string; labelValue: string }) => {
  return (
    <div className="flex flex-row items-center justify-between mb-2">
      <div className="text-[#FFD84D] text-sm mr-2">{label}</div>
      <div className="flex-1 h-2 bg-gray-800 rounded-full">
        <div className="h-full bg-orange-500 rounded-full relative" style={{ width: `${value * 5}%` }}></div>
      </div>
      <div className="text-[#FFD84D] text-sm ml-2 w-[20px]">{labelValue}</div>
    </div>
  );
};
