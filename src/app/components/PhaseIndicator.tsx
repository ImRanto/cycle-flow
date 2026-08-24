"use client";

import React from "react";
import { getPhaseInfo } from "../utils/cycleCalculations";

interface PhaseIndicatorProps {
  currentPhase: string;
  phaseProgress: number;
}

const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({
  currentPhase,
  phaseProgress,
}) => {
  const phaseInfo = getPhaseInfo(currentPhase);

  const phases = ["menstrual", "follicular", "ovulation", "luteal"];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Phase du cycle</h3>
        <div
          className={`px-4 py-2 rounded-full ${phaseInfo.color} border font-semibold`}
        >
          {phaseInfo.icon} {phaseInfo.name}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Progression de la phase
          </span>
          <span className="text-sm font-bold text-purple-600">
            {Math.round(phaseProgress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-linear-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${phaseProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Indicateur des phases */}
      <div className="relative pt-2">
        <div className="flex justify-between mb-8">
          {phases.map((phase, index) => {
            const info = getPhaseInfo(phase);
            const isActive = phase === currentPhase;

            return (
              <div key={phase} className="relative flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 transition-all duration-300 ${
                    isActive
                      ? "scale-125 ring-4 ring-opacity-30 ring-purple-500"
                      : "opacity-70"
                  } ${info.color
                    .replace("border", "")
                    .replace("border-blue-200", "")}`}
                >
                  {info.icon}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {info.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-6 w-2 h-2 bg-purple-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ligne de connexion */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-linear-to-r from-red-300 via-pink-300 to-purple-300 transform -translate-y-1/2"></div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Phase actuelle :</span>{" "}
          {phaseInfo.description}
        </p>
      </div>
    </div>
  );
};

export default PhaseIndicator;
