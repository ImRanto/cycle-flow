"use client";

import React from "react";
import {
  Calendar,
  Heart,
  TrendingUp,
  Egg,
  Droplets,
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
    <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-violet-300/20 rounded-full -translate-y-6 translate-x-6 blur-2xl"></div>

      <div className="relative z-10 p-6">
        {/* En-tête */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-violet-100 shadow-sm">
            <TrendingUp className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Prédictions</h2>
            <p className="text-xs text-gray-400">Calculs automatiques du cycle</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Date d'ovulation */}
          <div className="relative overflow-hidden rounded-xl border border-white/60 bg-white/50 backdrop-blur-sm p-4 hover:bg-white/70 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-pink-200/30 rounded-full -translate-y-4 translate-x-4 blur-xl group-hover:scale-125 transition-transform duration-500"></div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-md shadow-pink-500/20">
                <Egg className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Ovulation</h3>
                <p className="text-xs text-gray-400">Fertilité maximale</p>
              </div>
            </div>

            <div className="text-center py-1">
              <div className="text-xl font-extrabold text-gray-900 tabular-nums">
                {new Date(results.ovulationDate).toLocaleDateString("fr-FR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatDate(results.ovulationDate)}
              </p>
            </div>

            <div className="mt-2 text-center">
              <span className="inline-block bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full border border-pink-200">
                Période critique
              </span>
            </div>
          </div>

          {/* Fenêtre fertile */}
          <div className="relative overflow-hidden rounded-xl border border-white/60 bg-white/50 backdrop-blur-sm p-4 hover:bg-white/70 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-200/30 rounded-full -translate-y-4 translate-x-4 blur-xl group-hover:scale-125 transition-transform duration-500"></div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Fenêtre fertile</h3>
                <p className="text-xs text-gray-400">Meilleure période pour concevoir</p>
              </div>
            </div>

            <div className="text-center py-1">
              <div className="text-xl font-extrabold text-gray-900 tabular-nums">
                {formatFertileRange()}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                6 jours de fertilité
              </p>
            </div>

            {/* Jours fertiles */}
            <div className="mt-2 flex justify-center gap-1">
              {[...Array(6)].map((_, i) => {
                const date = new Date(results.fertileWindow.start);
                date.setDate(date.getDate() + i);
                const isOvulation = date.toISOString().split("T")[0] === results.ovulationDate;
                return (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                      isOvulation
                        ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 scale-110"
                        : "bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200"
                    }`}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prochaines règles */}
          <div className="relative overflow-hidden rounded-xl border border-white/60 bg-white/50 backdrop-blur-sm p-4 hover:bg-white/70 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/30 rounded-full -translate-y-4 translate-x-4 blur-xl group-hover:scale-125 transition-transform duration-500"></div>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Prochaines règles</h3>
                <p className="text-xs text-gray-400">Préparation recommandée</p>
              </div>
            </div>

            <div className="text-center py-1">
              <div className="text-xl font-extrabold text-gray-900 tabular-nums">
                {new Date(results.nextPeriod).toLocaleDateString("fr-FR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatDate(results.nextPeriod)}
              </p>
            </div>

            <div className="mt-2 text-center">
              <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                <Droplets className="w-3 h-3" />
                Période menstruelle à venir
              </span>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Phase</div>
              <div className="font-bold text-sm text-purple-700">
                {results.currentPhase === "menstrual" && "Menstruelle"}
                {results.currentPhase === "follicular" && "Folliculaire"}
                {results.currentPhase === "ovulation" && "Ovulation"}
                {results.currentPhase === "luteal" && "Lutéale"}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Progression</div>
              <div className="font-bold text-sm text-pink-600 tabular-nums">
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
