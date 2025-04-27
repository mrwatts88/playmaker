"use client";

import { AvatarContainer } from "@/components/court/AvatarContainer";
import { useContestant } from "@/app/hooks/useContestant";
import { useEffect, useState } from "react";
import { use } from "react";

const BASE_WIDTH = 1200;
const BASE_HEIGHT = 750;
const BASE_WIDTH_VERTICAL = 750;
const BASE_HEIGHT_VERTICAL = 1200;

export default function Contestant({ params }: { params: Promise<{ contestantId: string }> }) {
  const { contestantId } = use(params);
  const { contestant, isLoading, isError } = useContestant(contestantId);
  const [scale, setScale] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check for vertical layout
      setIsVertical(window.innerHeight > window.innerWidth);

      const availableWidth = window.innerWidth * (isVertical ? 1 : 0.9);
      const availableHeight = window.innerHeight * 0.9;
      const baseWidth = isVertical ? BASE_WIDTH_VERTICAL : BASE_WIDTH;
      const baseHeight = isVertical ? BASE_HEIGHT_VERTICAL : BASE_HEIGHT;

      const scaleX = availableWidth / baseWidth;
      const scaleY = availableHeight / baseHeight;
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
      setIsLoaded(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isVertical]);

  // Loading state
  if (isLoading || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FB7B1F]"></div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading contestant</div>
      </div>
    );
  }

  // Not found state
  if (!contestant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Contestant not found</div>
      </div>
    );
  }

  const baseWidth = isVertical ? BASE_WIDTH_VERTICAL : BASE_WIDTH;
  const baseHeight = isVertical ? BASE_HEIGHT_VERTICAL : BASE_HEIGHT;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#2E2A24] overflow-hidden">
      <div
        className="relative px-4"
        style={{
          width: `${baseWidth * scale}px`,
          height: `${baseHeight * scale}px`,
        }}
      >
        <div
          className="absolute top-0 left-0"
          style={{
            width: baseWidth,
            height: baseHeight,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* Background */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            {isVertical ? (
              <div
                className="absolute top-1/2 left-1/2 w-[160%] h-[160%]"
                style={{
                  transform: "translate(-50%, -50%) rotate(90deg)",
                  transformOrigin: "center center",
                }}
              >
                <img src="/images/football-bg.png" alt="Football Background" className="w-full h-full object-contain" />
              </div>
            ) : (
              <img src="/images/football-bg.png" alt="Football Background" className="absolute inset-0 w-full h-full object-cover" />
            )}
          </div>

          {/* Avatar Container */}
          <div className="absolute top-[20px] left-1/2 -translate-x-1/2 z-10">
            <AvatarContainer />
          </div>

          {/* Content area */}
          <div
            className="absolute text-white"
            style={{
              bottom: "100px",
              top: "100px",
              left: "100px",
              right: "100px",
              borderRadius: "100px",
            }}
          >
            <div
              className="bg-black/50 p-4 rounded-lg flex flex-col justify-center"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "100px",
                padding: "50px",
              }}
            >
              {isVertical ? (
                // Vertical layout - stacked
                <>
                  {/* Player Info and XP Display */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-xl font-bold">{contestant.name}</h1>
                        <p className="text-sm text-gray-400">NBA Contestant</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-400">Spendable XP</span>
                          <div className="text-lg font-bold text-green-400">{contestant.spendableXp}</div>
                        </div>
                        <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-400">Total XP</span>
                          <div className="text-lg font-bold text-orange-500">{contestant.totalXp}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stat Upgrade Section */}
                  <div className="mb-6">
                    <div className="space-y-3">
                      {/* Points */}
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <span className="font-medium">Points</span>
                          </div>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                            <span>+10%</span>
                            <span className="text-xs">(100 XP)</span>
                          </button>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${Math.min(contestant.statPower.points * 10, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Rebounds */}
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </div>
                            <span className="font-medium">Rebounds</span>
                          </div>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                            <span>+10%</span>
                            <span className="text-xs">(175 XP)</span>
                          </button>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${Math.min(contestant.statPower.rebounds * 10, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Assists */}
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                              </svg>
                            </div>
                            <span className="font-medium">Assists</span>
                          </div>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                            <span>+10%</span>
                            <span className="text-xs">(150 XP)</span>
                          </button>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${Math.min(contestant.statPower.assists * 10, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      {/* Defense */}
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                              </svg>
                            </div>
                            <span className="font-medium">Defense</span>
                          </div>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                            <span>+10%</span>
                            <span className="text-xs">(200 XP)</span>
                          </button>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${Math.min(contestant.statPower.defense * 10, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Roster Section */}
                  <div className="mb-6">
                    <div className="grid grid-cols-5 gap-3">
                      {contestant.roster.map((member) => (
                        <div key={member.athleteId} className="bg-gray-800/50 p-3 rounded-lg text-center flex flex-col items-center">
                          <img
                            src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${member.athlete.apiId}.png`}
                            alt={member.athlete.name}
                            className="w-12 h-12 rounded-full mb-2 object-cover bg-gray-700"
                            onError={(e) => {
                              e.currentTarget.src = `https://i.pravatar.cc/150?u=${member.athlete.name.toLowerCase().replace(/\s/g, "_")}`;
                            }}
                          />
                          <p className="text-xs font-medium">{member.athlete.name}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <span>{member.athlete.position}</span>
                            <span>•</span>
                            <span>{member.athlete.team?.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // Horizontal layout
                <>
                  {/* Player Info and XP Display - Full Width */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-xl font-bold">{contestant.name}</h1>
                        <p className="text-sm text-gray-400">NBA Contestant</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-400">Spendable XP</span>
                          <div className="text-lg font-bold text-green-400">{contestant.spendableXp}</div>
                        </div>
                        <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-400">Total XP</span>
                          <div className="text-lg font-bold text-orange-500">{contestant.totalXp}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Stat Upgrade Section */}
                      <div>
                        <div className="space-y-3">
                          {/* Points */}
                          <div className="bg-gray-800/50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                  </svg>
                                </div>
                                <span className="font-medium">Points</span>
                              </div>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                                <span>+10%</span>
                                <span className="text-xs">(100 XP)</span>
                              </button>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: `${Math.min(contestant.statPower.points * 10, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Assists */}
                          <div className="bg-gray-800/50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                  </svg>
                                </div>
                                <span className="font-medium">Assists</span>
                              </div>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                                <span>+10%</span>
                                <span className="text-xs">(150 XP)</span>
                              </button>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: `${Math.min(contestant.statPower.assists * 10, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Defense */}
                          <div className="bg-gray-800/50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                  </svg>
                                </div>
                                <span className="font-medium">Defense</span>
                              </div>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                                <span>+10%</span>
                                <span className="text-xs">(200 XP)</span>
                              </button>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: `${Math.min(contestant.statPower.defense * 10, 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Rebounds */}
                          <div className="bg-gray-800/50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                  </svg>
                                </div>
                                <span className="font-medium">Rebounds</span>
                              </div>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                                <span>+10%</span>
                                <span className="text-xs">(175 XP)</span>
                              </button>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: `${Math.min(contestant.statPower.rebounds * 10, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Roster Section */}
                      <div>
                        <div className="grid grid-cols-3 gap-3">
                          {contestant.roster.map((member) => (
                            <div key={member.athleteId} className="bg-gray-800/50 p-3 rounded-lg text-center flex flex-col items-center">
                              <img
                                src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${member.athlete.apiId}.png`}
                                alt={member.athlete.name}
                                className="w-12 h-12 rounded-full mb-2 object-cover bg-gray-700"
                                onError={(e) => {
                                  e.currentTarget.src = `https://i.pravatar.cc/150?u=${member.athlete.name.toLowerCase().replace(/\s/g, "_")}`;
                                }}
                              />
                              <p className="text-xs font-medium">{member.athlete.name}</p>
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <span>{member.athlete.position}</span>
                                <span>•</span>
                                <span>{member.athlete.team?.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
