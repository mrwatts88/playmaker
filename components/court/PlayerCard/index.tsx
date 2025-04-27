"use client";

import { AvatarContainer } from "../AvatarContainer";
import { StatContainer } from "../StatContainer";
import Button from "../../Button";
import Link from "next/link";
import type { Contestant } from "@/app/hooks/useContestant";
import { MdManageAccounts } from "react-icons/md";

interface PlayerCardProps {
  contestant: Contestant;
  winner?: boolean;
}

export const PlayerCard = ({ contestant }: PlayerCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <AvatarContainer />
      <StatContainer contestant={contestant} />
      <Link href={`/contestants/${contestant.id}`} className="mt-2 w-full">
        <Button variant="xp" className="w-full">
          <MdManageAccounts className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
};
