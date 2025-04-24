"use client";

import { AvatarContainer } from "@/components/court/AvatarContainer";
import { useEffect, useRef, useState } from "react";

const BASE_WIDTH = 1200;
const BASE_HEIGHT = 750;
const BASE_WIDTH_VERTICAL = 750;
const BASE_HEIGHT_VERTICAL = 1200;

export default function Contestant() {
  const [scale, setScale] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const badgesContainerRef = useRef<HTMLDivElement>(null);

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

  const handleScroll = () => {
    if (badgesContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = badgesContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollBadges = (direction: "left" | "right") => {
    if (badgesContainerRef.current) {
      const scrollAmount = 200; // Adjust this value to control scroll distance
      badgesContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!isLoaded) {
    return null;
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
                        <h1 className="text-xl font-bold">John Smith</h1>
                        <p className="text-sm text-gray-400">1st out of 6</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-400">Spendable XP</span>
                          <div className="text-lg font-bold text-green-400">1,500</div>
                        </div>
                        <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-400">Total XP</span>
                          <div className="text-lg font-bold text-blue-400">3,750</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stat Upgrade Section */}
                  <div className="mb-6">
                    <div className="space-y-3">
                      {/* Rushing */}
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <span className="font-medium">Rushing</span>
                          </div>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                            <span>+10%</span>
                            <span className="text-xs">(100 XP)</span>
                          </button>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>

                      {/* Passing */}
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                              </svg>
                            </div>
                            <span className="font-medium">Passing</span>
                          </div>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                            <span>+10%</span>
                            <span className="text-xs">(150 XP)</span>
                          </button>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                      </div>

                      {/* Touchdowns */}
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                              </svg>
                            </div>
                            <span className="font-medium">Touchdowns</span>
                          </div>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                            <span>+10%</span>
                            <span className="text-xs">(200 XP)</span>
                          </button>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Badges Section */}
                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-3">
                      {/* Placeholder for purchasable badges - replace with actual badge components */}
                      {[
                        { icon: "M13 10V3L4 14h7v7l9-11h-7z", name: "Speed Demon", xp: 500 },
                        {
                          icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                          name: "Power Player",
                          xp: 750,
                        },
                        {
                          icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                          name: "Team Captain",
                          xp: 1000,
                        },
                      ].map((badge, index) => (
                        <div key={index} className="bg-gray-800/50 p-3 rounded-lg text-center">
                          <div className="w-12 h-12 mx-auto mb-1 bg-gray-700 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
                            </svg>
                          </div>
                          <p className="text-xs font-medium">{badge.name}</p>
                          <p className="text-xs text-green-400">{badge.xp} XP</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Badges Section */}
                  <div className="mb-6">
                    <div className="relative">
                      {/* Left Arrow */}
                      {showLeftArrow && (
                        <button
                          onClick={() => scrollBadges("left")}
                          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      )}

                      {/* Badges Container */}
                      <div
                        ref={badgesContainerRef}
                        onScroll={handleScroll}
                        className="flex gap-3 overflow-x-auto scrollbar-hide"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                      >
                        {/* Placeholder for badges - replace with actual badge components */}
                        {[
                          {
                            icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                            name: "Star Player",
                          },
                          {
                            icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                            name: "Defense Master",
                          },
                          { icon: "M13 10V3L4 14h7v7l9-11h-7z", name: "Speed Demon" },
                          {
                            icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                            name: "Trophy Hunter",
                          },
                          {
                            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                            name: "Shield Guard",
                          },
                          { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", name: "Time Master" },
                          {
                            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                            name: "Shield Guard",
                          },
                          { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", name: "Time Master" },
                          {
                            icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                            name: "Star Player",
                          },
                          {
                            icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                            name: "Defense Master",
                          },
                        ].map((badge, index) => (
                          <div key={index} className="flex-shrink-0 w-[100px] bg-gray-800/50 p-3 rounded-lg text-center">
                            <div className="w-12 h-12 mx-auto mb-1 bg-gray-700 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
                              </svg>
                            </div>
                            <p className="text-xs">{badge.name}</p>
                          </div>
                        ))}
                      </div>

                      {/* Right Arrow */}
                      {showRightArrow && (
                        <button
                          onClick={() => scrollBadges("right")}
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Roster Section */}
                  <div className="mb-6">
                    <div className="grid grid-cols-5 gap-3">
                      {/* Placeholder for roster - replace with actual athlete components */}
                      {[1, 2, 3, 4, 5].map((athlete) => (
                        <div key={athlete} className="bg-gray-800/50 p-3 rounded-lg text-center flex flex-col items-center">
                          <img
                            src={`https://i.pravatar.cc/150?img=${athlete + 10}`}
                            alt={`Athlete ${athlete}`}
                            className="w-12 h-12 rounded-full mb-2"
                          />
                          <p className="text-xs font-medium">Athlete {athlete}</p>
                          <p className="text-xs text-gray-400">Position</p>
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
                        <h1 className="text-xl font-bold">John Smith</h1>
                        <p className="text-sm text-gray-400">1st out of 6</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-400">Spendable XP</span>
                          <div className="text-lg font-bold text-green-400">1,500</div>
                        </div>
                        <div className="bg-gray-800/50 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-gray-400">Total XP</span>
                          <div className="text-lg font-bold text-orange-500">3,750</div>
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
                          {/* Rushing */}
                          <div className="bg-gray-800/50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                  </svg>
                                </div>
                                <span className="font-medium">Rushing</span>
                              </div>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                                <span>+10%</span>
                                <span className="text-xs">(100 XP)</span>
                              </button>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                          </div>

                          {/* Passing */}
                          <div className="bg-gray-800/50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                                  </svg>
                                </div>
                                <span className="font-medium">Passing</span>
                              </div>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                                <span>+10%</span>
                                <span className="text-xs">(150 XP)</span>
                              </button>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                            </div>
                          </div>

                          {/* Touchdowns */}
                          <div className="bg-gray-800/50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                  </svg>
                                </div>
                                <span className="font-medium">Touchdowns</span>
                              </div>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                                <span>+10%</span>
                                <span className="text-xs">(200 XP)</span>
                              </button>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                            </div>
                          </div>

                          {/* Special Teams */}
                          <div className="bg-gray-800/50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                  </svg>
                                </div>
                                <span className="font-medium">Special Teams</span>
                              </div>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                                <span>+10%</span>
                                <span className="text-xs">(175 XP)</span>
                              </button>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "30%" }}></div>
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
                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                  </svg>
                                </div>
                                <span className="font-medium">Defense</span>
                              </div>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 transition-colors text-sm">
                                <span>+10%</span>
                                <span className="text-xs">(225 XP)</span>
                              </button>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Purchase Badges Section - Moved to top */}
                      <div>
                        <div className="grid grid-cols-3 gap-3">
                          {/* Placeholder for purchasable badges - replace with actual badge components */}
                          {[
                            { icon: "M13 10V3L4 14h7v7l9-11h-7z", name: "Speed Demon", xp: 500 },
                            {
                              icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                              name: "Power Player",
                              xp: 750,
                            },
                            {
                              icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                              name: "Team Captain",
                              xp: 1000,
                            },
                          ].map((badge, index) => (
                            <div key={index} className="bg-gray-800/50 p-3 rounded-lg text-center">
                              <div className="w-12 h-12 mx-auto mb-1 bg-gray-700 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
                                </svg>
                              </div>
                              <p className="text-xs font-medium">{badge.name}</p>
                              <p className="text-xs text-green-400">{badge.xp} XP</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Badges Section */}
                      <div>
                        <div className="relative">
                          {/* Left Arrow */}
                          {showLeftArrow && (
                            <button
                              onClick={() => scrollBadges("left")}
                              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors"
                            >
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                          )}

                          {/* Badges Container */}
                          <div
                            ref={badgesContainerRef}
                            onScroll={handleScroll}
                            className="flex gap-3 overflow-x-auto scrollbar-hide"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                          >
                            {/* Placeholder for badges - replace with actual badge components */}
                            {[
                              {
                                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                                name: "Star Player",
                              },
                              {
                                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                                name: "Defense Master",
                              },
                              { icon: "M13 10V3L4 14h7v7l9-11h-7z", name: "Speed Demon" },
                              {
                                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                                name: "Trophy Hunter",
                              },
                              {
                                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                                name: "Shield Guard",
                              },
                              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", name: "Time Master" },
                              {
                                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                                name: "Shield Guard",
                              },
                              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", name: "Time Master" },
                              {
                                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                                name: "Star Player",
                              },
                              {
                                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                                name: "Defense Master",
                              },
                            ].map((badge, index) => (
                              <div key={index} className="flex-shrink-0 w-[100px] bg-gray-800/50 p-3 rounded-lg text-center">
                                <div className="w-12 h-12 mx-auto mb-1 bg-gray-700 rounded-full flex items-center justify-center">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
                                  </svg>
                                </div>
                                <p className="text-xs">{badge.name}</p>
                              </div>
                            ))}
                          </div>

                          {/* Right Arrow */}
                          {showRightArrow && (
                            <button
                              onClick={() => scrollBadges("right")}
                              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors"
                            >
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Roster Section */}
                      <div>
                        <div className="grid grid-cols-5 gap-3">
                          {/* Placeholder for roster - replace with actual athlete components */}
                          {[1, 2, 3, 4, 5].map((athlete) => (
                            <div key={athlete} className="bg-gray-800/50 p-3 rounded-lg text-center flex flex-col items-center">
                              <img
                                src={`https://i.pravatar.cc/150?img=${athlete + 10}`}
                                alt={`Athlete ${athlete}`}
                                className="w-12 h-12 rounded-full mb-2"
                              />
                              <p className="text-xs font-medium">Athlete {athlete}</p>
                              <p className="text-xs text-gray-400">Position</p>
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
