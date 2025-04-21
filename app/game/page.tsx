import { GameCircle } from "@/components/GameCircle";

export default function GamePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] overflow-hidden">
      <GameCircle />
    </div>
  );
}
