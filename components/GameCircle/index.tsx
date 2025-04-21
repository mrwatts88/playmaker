import { PlayerCard } from "../PlayerCard";

export const GameCircle = () => {
  return (
    <div className="relative w-[800px] h-[800px]">
      {/* Center oval */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full bg-[#C44D12]/50 border-16 border-neutral-800" />

      {/* Top players */}
      <div className="absolute top-[5%] left-[15%] -translate-y-10 scale-[0.85] origin-bottom">
        <PlayerCard winner />
      </div>
      <div className="absolute top-[5%] right-[15%] -translate-y-10 scale-[0.85] origin-bottom">
        <PlayerCard />
      </div>

      {/* Side players */}
      <div className="absolute top-[55%] right-0 translate-x-36 -translate-y-1/2 scale-[0.85] origin-left">
        <PlayerCard />
      </div>
      <div className="absolute top-[55%] left-0 -translate-x-36 -translate-y-1/2 scale-[0.85] origin-right">
        <PlayerCard />
      </div>

      {/* Bottom players */}
      <div className="absolute bottom-0 left-[15%] translate-y-10 scale-[0.85] origin-top">
        <PlayerCard />
      </div>
      <div className="absolute bottom-0 right-[15%] translate-y-10 scale-[0.85] origin-top">
        <PlayerCard />
      </div>
    </div>
  );
};
