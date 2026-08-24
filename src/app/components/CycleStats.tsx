"use client";

import React from "react";
import {
  Target,
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

    return `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString(
      "fr-FR",
      { month: "short" }
    )}`;
  };

  return (
    <div className="bg-linear-to-r from-white to-purple-50 rounded-3xl shadow-2xl p-6 border border-purple-100">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Prédictions</h2>
          <p className="text-gray-500">Calculs automatiques</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Date d'ovulation */}
        <div className="relative overflow-hidden bg-linear-to-r from-pink-50 to-rose-50 p-6 rounded-2xl border border-pink-200 group hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-200 rounded-full -translate-y-12 translate-x-12 opacity-20 group-hover:scale-110 transition-transform duration-300"></div>

          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-linear-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
              <Egg className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Date d'ovulation</h3>
              <p className="text-sm text-gray-600">Fertilité maximale</p>
            </div>
          </div>

          <div className="text-center py-3">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {new Date(results.ovulationDate).toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
            <div className="text-gray-600">
              {formatDate(results.ovulationDate)}
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="inline-block bg-linear-to-r from-pink-100 to-rose-100 text-pink-800 text-sm font-medium px-4 py-2 rounded-full border border-pink-200">
              Période critique
            </span>
          </div>
        </div>

        {/* Fenêtre fertile */}
        <div className="relative overflow-hidden bg-linear-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 group hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-200 rounded-full -translate-y-12 translate-x-12 opacity-20 group-hover:scale-110 transition-transform duration-300"></div>

          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-linear-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Fenêtre fertile</h3>
              <p className="text-sm text-gray-600">
                Meilleure période pour concevoir
              </p>
            </div>
          </div>

          <div className="text-center py-3">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {formatFertileRange()}
            </div>
            <div className="text-gray-600">
              6 jours • {new Date(results.fertileWindow.start).getDate()}-
              {new Date(results.fertileWindow.end).getDate()}
            </div>
          </div>

          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(6)].map((_, i) => {
              const date = new Date(results.fertileWindow.start);
              date.setDate(date.getDate() + i);
              const isOvulation =
                date.toISOString().split("T")[0] === results.ovulationDate;

              return (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 hover:scale-110 ${
                    isOvulation
                      ? "bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-md"
                      : "bg-linear-to-r from-green-100 to-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Prochaines règles */}
        <div className="relative overflow-hidden bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 group hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200 rounded-full -translate-y-12 translate-x-12 opacity-20 group-hover:scale-110 transition-transform duration-300"></div>

          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Prochaines règles</h3>
              <p className="text-sm text-gray-600">Préparation recommandée</p>
            </div>
          </div>

          <div className="text-center py-3">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {new Date(results.nextPeriod).toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
            <div className="text-gray-600">
              {formatDate(results.nextPeriod)}
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full border border-blue-200">
              <Droplets className="w-4 h-4" />
              <span>Période menstruelle à venir</span>
            </div>
          </div>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Phase actuelle</div>
            <div className="font-bold text-lg text-purple-700">
              {results.currentPhase === "menstrual" && "Menstruelle"}
              {results.currentPhase === "follicular" && "Folliculaire"}
              {results.currentPhase === "ovulation" && "Ovulation"}
              {results.currentPhase === "luteal" && "Lutéale"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Progression</div>
            <div className="font-bold text-lg text-pink-600">
              {Math.round(results.phaseProgress)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleStats;
