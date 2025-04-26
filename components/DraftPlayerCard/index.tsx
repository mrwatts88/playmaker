import { FC } from "react";
import Image from "next/image";
import Button from "../Button";

interface DraftPlayerCardProps {
  name: string;
  team: string;
  position: string;
  price?: number;
  imageUrl: string;
  onAction?: () => void;
  variant?: "pool" | "roster";
}

const DraftPlayerCard: FC<DraftPlayerCardProps> = ({ name, team, position, price, imageUrl, onAction, variant = "pool" }) => {
  return (
    <div className="w-full flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        {/* <div className="relative w-12 h-12 rounded-lg overflow-hidden">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div> */}
        <div>
          <h3 className="text-black font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">
            {position} - {team}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {price && <span className="text-black font-semibold">${price}</span>}
        {variant === "pool" && (
          <Button variant="add" onClick={onAction}>
            {""}
          </Button>
        )}
        {variant === "roster" && (
          <Button variant="remove" onClick={onAction}>
            {""}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DraftPlayerCard;
