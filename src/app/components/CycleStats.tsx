"use client";

import React from "react";
import {
  Calendar,
  Heart,
  TrendingUp,
  Egg,
  Droplets,
  Sparkles,
} from "lucide-react";
import { CycleResults } from "../types/cycle.types";
import { formatDate } from "../utils/cycleCalculations";

interface CycleStatsProps {
  results: CycleResults;
}

const CycleStats: React.FC<CycleStatsProps> = ({ results }) => {
  const formatFertileRange = () => {
    const start = new Date(results.fertileWindow.start);
    const end = new Date(results.fertileWindow.end);
    return `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString("fr-FR", { month: "short" })}`;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
      {/* Fond gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.3),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.3),transparent_60%)]"></div>

      {/* Orbes lumineux */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 p-6 md:p-8">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center border-2 border-white/30">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Prédictions</h2>
              <p className="text-sm text-white/60">Calculs automatiques du cycle</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Date d'ovulation */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:bg-white/10 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-pink-400/10 rounded-full -translate-y-6 translate-x-6 blur-xl group-hover:scale-125 transition-transform duration-500"></div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                <Egg className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Ovulation</h3>
                <p className="text-xs text-white/50">Fertilité maximale</p>
              </div>
            </div>

            <div className="text-center py-2">
              <div className="text-2xl font-extrabold text-white mb-1 tabular-nums">
                {new Date(results.ovulationDate).toLocaleDateString("fr-FR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <p className="text-xs text-white/50">
                {formatDate(results.ovulationDate)}
              </p>
            </div>

            <div className="mt-3 text-center">
              <span className="inline-block bg-pink-500/20 text-pink-200 text-xs font-medium px-3 py-1.5 rounded-full border border-pink-400/20">
                Période critique
              </span>
            </div>
          </div>

          {/* Fenêtre fertile */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:bg-white/10 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full -translate-y-6 translate-x-6 blur-xl group-hover:scale-125 transition-transform duration-500"></div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Fenêtre fertile</h3>
                <p className="text-xs text-white/50">Meilleure période pour concevoir</p>
              </div>
            </div>

            <div className="text-center py-2">
              <div className="text-2xl font-extrabold text-white mb-1 tabular-nums">
                {formatFertileRange()}
              </div>
              <p className="text-xs text-white/50">
                6 jours de fertilité
              </p>
            </div>

            {/* Jours fertiles */}
            <div className="mt-3 flex justify-center gap-1.5">
              {[...Array(6)].map((_, i) => {
                const date = new Date(results.fertileWindow.start);
                date.setDate(date.getDate() + i);
                const isOvulation = date.toISOString().split("T")[0] === results.ovulationDate;
                return (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                      isOvulation
                        ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-110"
                        : "bg-white/10 text-white/70 border border-white/10 hover:bg-white/20"
                    }`}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prochaines règles */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:bg-white/10 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full -translate-y-6 translate-x-6 blur-xl group-hover:scale-125 transition-transform duration-500"></div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Prochaines règles</h3>
                <p className="text-xs text-white/50">Préparation recommandée</p>
              </div>
            </div>

            <div className="text-center py-2">
              <div className="text-2xl font-extrabold text-white mb-1 tabular-nums">
                {new Date(results.nextPeriod).toLocaleDateString("fr-FR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <p className="text-xs text-white/50">
                {formatDate(results.nextPeriod)}
              </p>
            </div>

            <div className="mt-3 text-center">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-400/20">
                <Droplets className="w-3.5 h-3.5" />
                Période menstruelle à venir
              </span>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-xs text-white/50 uppercase tracking-wider font-medium mb-1">Phase</div>
              <div className="font-bold text-lg text-white">
                {results.currentPhase === "menstrual" && "Menstruelle"}
                {results.currentPhase === "follicular" && "Folliculaire"}
                {results.currentPhase === "ovulation" && "Ovulation"}
                {results.currentPhase === "luteal" && "Lutéale"}
              </div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-xs text-white/50 uppercase tracking-wider font-medium mb-1">Progression</div>
              <div className="font-bold text-lg text-white tabular-nums">
                {Math.round(results.phaseProgress)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleStats;
