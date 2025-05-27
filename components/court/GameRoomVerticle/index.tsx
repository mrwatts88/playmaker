import { RefreshCcw } from "lucide-react";
import React from "react";

// interface GameRoomVerticleProps {
//   contest: ContestGameState;
// }

const GameRoomVerticle = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
        {/* Rotating Phone Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            {/* Phone Icon */}
            <div className="w-16 h-24 bg-gray-800 rounded-lg flex items-center justify-center relative">
              <div className="w-12 h-16 bg-gray-200 rounded-sm"></div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
            </div>

            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
              <RefreshCcw
                className="w-8 h-8 text-blue-500 animate-spin"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Please Rotate Your Device
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          This app is designed for landscape mode. Please turn your device
          horizontally for the best experience.
        </p>

        {/* Visual indicator */}
        <div className="mt-6 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GameRoomVerticle;
