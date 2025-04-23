"use client";

import { AvatarContainer } from "../AvatarContainer";
import { StatContainer } from "../StatContainer";

interface PlayerCardProps {
  contestantId: number;
  winner?: boolean;
}

export const PlayerCard = ({ winner = false, contestantId }: PlayerCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <AvatarContainer />
      <StatContainer contestantId={contestantId} isWinner={winner} />
    </div>
  );
};
