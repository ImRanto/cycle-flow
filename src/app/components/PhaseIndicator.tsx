"use client";

import React from "react";
import { getPhaseInfo } from "../utils/cycleCalculations";
import { Moon } from "lucide-react";

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
    <div className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
      {/* Fond gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(192,132,252,0.3),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.3),transparent_60%)]"></div>

      {/* Orbes lumineux */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-fuchsia-400/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 p-6">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Phase du cycle</h3>
          </div>
          <div className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 font-semibold text-white text-sm">
            {phaseInfo.icon} {phaseInfo.name}
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white/60">Progression</span>
            <span className="text-sm font-bold text-white tabular-nums">{Math.round(phaseProgress)}%</span>
          </div>
          <div
            className="w-full bg-white/10 rounded-full h-2.5"
            role="progressbar"
            aria-valuenow={Math.round(phaseProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression de la phase ${phaseInfo.name}: ${Math.round(phaseProgress)}%`}
          >
            <div
              className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 h-2.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(167,139,250,0.5)]"
              style={{ width: `${phaseProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Indicateur des phases */}
        <div className="relative pt-2 mb-4">
          <div className="flex justify-between mb-6">
            {phases.map((phase) => {
              const info = getPhaseInfo(phase);
              const isActive = phase === currentPhase;

              return (
                <div
                  key={phase}
                  className="relative flex flex-col items-center"
                  aria-current={isActive ? "step" : undefined}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-2 transition-all duration-300 ${
                      isActive
                        ? "bg-white text-purple-600 shadow-lg shadow-white/20 scale-110"
                        : "bg-white/10 text-white/60 border border-white/10"
                    }`}
                  >
                    {info.icon}
                  </div>
                  <span
                    className={`text-[10px] font-medium ${
                      isActive ? "text-white" : "text-white/40"
                    }`}
                  >
                    {info.name}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ligne de connexion */}
          <div className="absolute top-5 left-4 right-4 h-0.5 bg-gradient-to-r from-red-400/30 via-pink-400/30 to-purple-400/30"></div>
        </div>

        {/* Description */}
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
          <p className="text-sm text-white/70">
            <span className="font-semibold text-white">Phase actuelle :</span>{" "}
            {phaseInfo.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhaseIndicator;
