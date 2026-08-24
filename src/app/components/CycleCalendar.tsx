"use client";

import React from "react";
import { CalendarDays, Droplets, Egg, CircleDot, Calendar } from "lucide-react";
import { CalendarDay, CycleResults } from "../types/cycle.types";
import { generateCalendar } from "../utils/cycleCalculations";

interface CycleCalendarProps {
  startDate: string;
  cycleLength: number;
  periodLength: number;
  results: CycleResults | null;
}

const CycleCalendar: React.FC<CycleCalendarProps> = ({
  startDate,
  cycleLength,
  periodLength,
  results,
}) => {
  // Vérification complète des données
  if (!results || !startDate || !cycleLength || !periodLength) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <CalendarDays className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Calendrier du cycle
          </h3>
        </div>
        <div className="text-center text-gray-500 py-8">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Chargement du calendrier...</p>
        </div>
      </div>
    );
  }

  // Générer les jours du calendrier avec vérification
  let calendarDays: CalendarDay[] = [];
  try {
    calendarDays = generateCalendar(
      startDate,
      cycleLength,
      periodLength,
      results
    );
  } catch (error) {
    console.error("Erreur lors de la génération du calendrier:", error);
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
            <CalendarDays className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Calendrier du cycle
          </h3>
        </div>
        <div className="text-center text-red-500 py-8">
          <p>Erreur lors du chargement du calendrier</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }

  // Vérifier si calendarDays est un tableau valide
  if (!Array.isArray(calendarDays) || calendarDays.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg">
            <CalendarDays className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Calendrier du cycle
          </h3>
        </div>
        <div className="text-center text-gray-500 py-8">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>Aucune donnée de calendrier disponible</p>
        </div>
      </div>
    );
  }

  const getDayColor = (day: CalendarDay): string => {
    if (day.isOvulation)
      return "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg";
    if (day.isFertile)
      return "bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200";
    if (day.isPeriod)
      return "bg-gradient-to-br from-rose-100 to-red-100 text-rose-800 border border-rose-200";
    if (day.isToday)
      return "bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-800 border-2 border-purple-500 shadow-md";
    return "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 border border-gray-200";
  };

  const getDayIcon = (day: CalendarDay) => {
    if (day.isOvulation) return <Egg className="w-3 h-3" />;
    if (day.isPeriod) return <Droplets className="w-3 h-3" />;
    if (day.isFertile) return <CircleDot className="w-3 h-3" />;
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in hover:shadow-2xl transition-shadow duration-300">
      {/* En-tête avec badge */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <CalendarDays className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Calendrier du cycle
            </h3>
            <p className="text-gray-500 text-sm">Visualisation interactive</p>
          </div>
        </div>
        <div className="text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full font-semibold shadow-sm">
          {cycleLength} jours
        </div>
      </div>

      {/* Grille des jours de la semaine */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
          <div
            key={index}
            className="text-center font-bold text-gray-400 py-2 text-sm"
          >
            {day}
          </div>
        ))}

        {/* Jours du calendrier */}
        {calendarDays.map((day) => {
          const date = new Date(day.date);
          const dayOfMonth = date.getDate();
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const icon = getDayIcon(day);

          return (
            <div
              key={day.date}
              className={`
                relative p-3 rounded-xl text-center transition-all duration-300
                hover:scale-105 hover:shadow-lg hover:z-10
                ${getDayColor(day)}
                ${isWeekend ? "opacity-95" : ""}
                transform hover:-translate-y-1
              `}
            >
              <div className="font-bold text-base mb-1">{dayOfMonth}</div>
              <div className="text-xs text-gray-500 mb-2">J{day.day}</div>

              {icon && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  {icon}
                </div>
              )}

              {day.isToday && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse shadow-md"></div>
              )}

              {/* Indicateur pour les jours spéciaux */}
              {day.isOvulation && (
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Légende améliorée avec icônes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
        <LegendItem
          color="bg-gradient-to-br from-rose-100 to-red-100 border-rose-200"
          icon={<Droplets className="w-4 h-4 text-rose-600" />}
          label="Règles"
        />
        <LegendItem
          color="bg-gradient-to-br from-emerald-100 to-green-100 border-emerald-200"
          icon={<CircleDot className="w-4 h-4 text-emerald-600" />}
          label="Fertile"
        />
        <LegendItem
          color="bg-gradient-to-br from-pink-500 to-rose-500"
          icon={<Egg className="w-4 h-4 text-white" />}
          label="Ovulation"
          textWhite={true}
        />
        <LegendItem
          color="bg-gradient-to-br from-purple-100 to-indigo-100 border-purple-500"
          icon={
            <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
          }
          label="Aujourd'hui"
        />
      </div>

      {/* Statistiques rapides */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl">
            <div className="text-xs text-gray-500">Période fertile</div>
            <div className="font-bold text-gray-900">
              J{new Date(results.fertileWindow.start).getDate()}- J
              {new Date(results.fertileWindow.end).getDate()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl">
            <div className="text-xs text-gray-500">Ovulation</div>
            <div className="font-bold text-gray-900">
              J{new Date(results.ovulationDate).getDate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour les items de légende
const LegendItem = ({
  color,
  icon,
  label,
  textWhite = false,
}: {
  color: string;
  icon: React.ReactNode;
  label: string;
  textWhite?: boolean;
}) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-6 h-6 rounded-lg flex items-center justify-center ${color}`}
    >
      {icon}
    </div>
    <span
      className={`text-sm ${textWhite ? "text-gray-900" : "text-gray-600"}`}
    >
      {label}
    </span>
  </div>
);

export default CycleCalendar;
