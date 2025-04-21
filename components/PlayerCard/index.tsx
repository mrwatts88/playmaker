import { AvatarContainer } from "../AvatarContainer";
import { StatContainer } from "../StatContainer";

interface PlayerCardProps {
  winner?: boolean;
}

export const PlayerCard = ({ winner = false }: PlayerCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <AvatarContainer isWinner={winner} />
      <div className="mt-4">
        <StatContainer />
      </div>
    </div>
  );
};
