"use client";

import DraftPlayerCard from "@/components/DraftPlayerCard";
import Link from "next/link";
import { use, useState } from "react";

const mockPlayers = [
  { name: "Luka Doncic", team: "DAL", position: "G", price: 45, imageUrl: "https://i.pravatar.cc/300?u=luka_doncic" },
  { name: "Joel Embiid", team: "PHI", position: "C", price: 42, imageUrl: "https://i.pravatar.cc/300?u=joel_embiid" },
  { name: "Giannis Antetokounmpo", team: "MIL", position: "F", price: 41, imageUrl: "https://i.pravatar.cc/300?u=giannis" },
  { name: "Shai Gilgeous-Alexander", team: "OKC", position: "G", price: 38, imageUrl: "https://i.pravatar.cc/300?u=sga" },
  { name: "Donovan Mitchell", team: "CLE", position: "G", price: 35, imageUrl: "https://i.pravatar.cc/300?u=spida" },
  { name: "Anthony Edwards", team: "MIN", position: "G", price: 33, imageUrl: "https://i.pravatar.cc/300?u=ant_edwards" },
  { name: "Tyrese Haliburton", team: "IND", position: "G", price: 32, imageUrl: "https://i.pravatar.cc/300?u=haliburton" },
  { name: "Jaylen Brown", team: "BOS", position: "F", price: 30, imageUrl: "https://i.pravatar.cc/300?u=jaylen_brown" },
  { name: "Bam Adebayo", team: "MIA", position: "C", price: 28, imageUrl: "https://i.pravatar.cc/300?u=bam_adebayo" },
  { name: "Jalen Brunson", team: "NYK", position: "G", price: 27, imageUrl: "https://i.pravatar.cc/300?u=brunson" },
  { name: "Domantas Sabonis", team: "SAC", position: "F", price: 26, imageUrl: "https://i.pravatar.cc/300?u=sabonis" },
  { name: "Mikal Bridges", team: "BKN", position: "F", price: 24, imageUrl: "https://i.pravatar.cc/300?u=mikal_bridges" },
];

const mockRoster = [
  { name: "Jayson Tatum", team: "BOS", position: "F", price: 40, imageUrl: "https://i.pravatar.cc/300?u=jayson_tatum" },
  { name: "Devin Booker", team: "PHX", position: "G", price: 37, imageUrl: "https://i.pravatar.cc/300?u=book" },
  { name: "Karl-Anthony Towns", team: "MIN", position: "C", price: 31, imageUrl: "https://i.pravatar.cc/300?u=kat" },
];

type Tab = "pool" | "roster";

export default function Draft({ params }: { params: Promise<{ contestId: string }> }) {
  const { contestId } = use(params);
  const [activeTab, setActiveTab] = useState<Tab>("pool");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 shadow-sm bg-white">
        <div className="flex items-center gap-4 px-4 py-4">
          <Link href={`/contests/${contestId}`} className="p-2 -m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <span className="font-bold text-xl">DRAFT</span>
              <span className="font-bold text-xl text-[#FB7B1F]">XP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Draft balance:</span>
              <span className="text-gray-600">$1000</span>
            </div>
          </div>
        </div>

        {/* Tabs - Only visible on mobile */}
        <div className="flex md:hidden border-t-1 border-t-gray-200 border-b-[#FB7B1F]">
          <button
            className={`flex-1 pt-3 pb-2 text-center font-medium ${activeTab === "pool" ? "text-[#FB7B1F] border-b-2" : "text-gray-500"}`}
            onClick={() => setActiveTab("pool")}
          >
            PLAYER POOL
          </button>
          <button
            className={`flex-1 pt-3 pb-2  text-center font-medium  ${activeTab === "roster" ? "text-[#FB7B1F] border-b-2" : "text-gray-500"}`}
            onClick={() => setActiveTab("roster")}
          >
            ROSTER
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="mx-auto w-full md:w-[90%] max-w-[1000px] flex-1 overflow-y-auto px-4">
        {/* Mobile View */}
        <div className="py-4 md:hidden">
          {activeTab === "pool" && (
            <div className="w-full flex flex-col gap-2">
              {mockPlayers.map((player, index) => (
                <DraftPlayerCard key={`${player.name}-${index}`} {...player} variant="pool" />
              ))}
            </div>
          )}
          {activeTab === "roster" && (
            <div className="w-full flex flex-col gap-2">
              {mockRoster.map((player, index) => (
                <DraftPlayerCard key={`${player.name}-${index}`} {...player} variant="roster" />
              ))}
            </div>
          )}
        </div>

        {/* Desktop/Landscape View */}
        <div className="hidden md:flex gap-4 pb-4">
          <div className="flex-1">
            <p className="text-md text-gray-500 my-2">PLAYER POOL</p>
            <div className="flex flex-col gap-2">
              {mockPlayers.map((player, index) => (
                <DraftPlayerCard key={`${player.name}-${index}`} {...player} variant="pool" />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-md text-gray-500 my-2">ROSTER</p>
            <div className="flex flex-col gap-2">
              {mockRoster.map((player, index) => (
                <DraftPlayerCard key={`${player.name}-${index}`} {...player} variant="roster" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 px-4 py-3 shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)]" style={{ backgroundColor: "var(--background-color)" }}>
        <Link
          href={`/contests/${contestId}/court`}
          className=" block w-full max-w-md mx-auto text-center rounded-lg bg-[#FB7B1F] text-white px-6 py-3 text-lg font-semibold"
        >
          SUBMIT
        </Link>
      </div>
    </div>
  );
}
