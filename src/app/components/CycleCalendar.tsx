"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  Droplets,
  Egg,
  CircleDot,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MonthlyCalendarDay, CycleResults } from "../types/cycle.types";
import { generateMonthlyCalendar } from "../utils/cycleCalculations";

interface CycleCalendarProps {
  startDate: string;
  cycleLength: number;
  periodLength: number;
  results: CycleResults | null;
}

const MONTH_NAMES = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const WEEKDAY_HEADERS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const CycleCalendar: React.FC<CycleCalendarProps> = ({
  startDate,
  cycleLength,
  periodLength,
  results,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

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

  let calendarDays: MonthlyCalendarDay[] = [];
  try {
    calendarDays = generateMonthlyCalendar(
      currentYear,
      currentMonth,
      startDate,
      cycleLength,
      periodLength,
      results.lutealPhaseLength
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

  if (!Array.isArray(calendarDays) || calendarDays.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center text-gray-500 py-8">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>Aucune donnée de calendrier disponible</p>
        </div>
      </div>
    );
  }

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const getDayColor = (day: MonthlyCalendarDay): string => {
    if (!day.isCurrentMonth) return "bg-gray-50/50 text-gray-300";
    if (day.isOvulation)
      return "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg";
    if (day.isFertile)
      return "bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200";
    if (day.isPeriod)
      return "bg-gradient-to-br from-rose-100 to-red-100 text-rose-800 border border-rose-200";
    if (day.isToday)
      return "bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-800 border-2 border-purple-500 shadow-md";
    if (day.isWeekend) return "bg-gray-50 text-gray-600";
    return "bg-white text-gray-700 hover:bg-gray-50";
  };

  const getDayIcon = (day: MonthlyCalendarDay) => {
    if (day.isOvulation) return <Egg className="w-3 h-3" />;
    if (day.isPeriod) return <Droplets className="w-3 h-3" />;
    if (day.isFertile) return <CircleDot className="w-3 h-3" />;
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in hover:shadow-2xl transition-shadow duration-300">
      {/* En-tête avec navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <CalendarDays className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Calendrier du cycle
            </h3>
            <p className="text-gray-500 text-sm">Visualisation mensuelle</p>
          </div>
        </div>
        <div className="text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full font-semibold shadow-sm">
          {cycleLength} jours
        </div>
      </div>

      {/* Navigation du mois */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
          aria-label="Mois précédent"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-3">
          <h4 className="text-xl font-bold text-gray-900">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h4>
          <button
            onClick={goToToday}
            className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors font-medium"
          >
            Aujourd'hui
          </button>
        </div>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
          aria-label="Mois suivant"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Grille des jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAY_HEADERS.map((day, index) => (
          <div
            key={index}
            className={`text-center font-bold py-2 text-sm ${
              index >= 5 ? "text-pink-400" : "text-gray-400"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const icon = getDayIcon(day);

          return (
            <div
              key={`${day.date}-${index}`}
              className={`
                relative p-2 md:p-3 rounded-xl text-center transition-all duration-200
                hover:scale-105 hover:shadow-lg hover:z-10 cursor-default
                ${getDayColor(day)}
                ${day.isCurrentMonth ? "" : "opacity-40"}
                transform hover:-translate-y-0.5
              `}
            >
              <div
                className={`font-bold text-sm md:text-base mb-0.5 ${
                  day.isToday
                    ? "bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center mx-auto"
                    : ""
                }`}
              >
                {day.dayOfMonth}
              </div>

              {day.cycleDay > 0 && day.isCurrentMonth && (
                <div className="text-[10px] text-gray-400 mb-1">
                  J{day.cycleDay}
                </div>
              )}

              {icon && day.isCurrentMonth && (
                <div className="flex justify-center mt-0.5">{icon}</div>
              )}

              {day.isOvulation && day.isCurrentMonth && (
                <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Légende */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5 mt-5 border-t border-gray-100">
        <LegendItem
          color="bg-gradient-to-br from-rose-100 to-red-100 border-rose-200"
          icon={<Droplets className="w-3.5 h-3.5 text-rose-600" />}
          label="Règles"
        />
        <LegendItem
          color="bg-gradient-to-br from-emerald-100 to-green-100 border-emerald-200"
          icon={<CircleDot className="w-3.5 h-3.5 text-emerald-600" />}
          label="Fertile"
        />
        <LegendItem
          color="bg-gradient-to-br from-pink-500 to-rose-500"
          icon={<Egg className="w-3.5 h-3.5 text-white" />}
          label="Ovulation"
          textWhite
        />
        <LegendItem
          color="bg-gradient-to-br from-purple-100 to-indigo-100 border-purple-500"
          icon={
            <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
          }
          label="Aujourd'hui"
        />
      </div>

      {/* Résumé du mois */}
      <div className="mt-5 pt-5 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl">
            <div className="text-xs text-gray-500">Période fertile</div>
            <div className="font-bold text-gray-900 text-sm">
              {new Date(results.fertileWindow.start).getDate()} -{" "}
              {new Date(results.fertileWindow.end).getDate()}{" "}
              {MONTH_NAMES[new Date(results.fertileWindow.start).getMonth()]
                .slice(0, 3)
                .toLowerCase()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl">
            <div className="text-xs text-gray-500">Ovulation</div>
            <div className="font-bold text-gray-900 text-sm">
              {new Date(results.ovulationDate).getDate()}{" "}
              {MONTH_NAMES[new Date(results.ovulationDate).getMonth()]
                .slice(0, 3)
                .toLowerCase()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl">
            <div className="text-xs text-gray-500">Prochaines règles</div>
            <div className="font-bold text-gray-900 text-sm">
              {new Date(results.nextPeriod).getDate()}{" "}
              {MONTH_NAMES[new Date(results.nextPeriod).getMonth()]
                .slice(0, 3)
                .toLowerCase()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl">
            <div className="text-xs text-gray-500">Cycle actuel</div>
            <div className="font-bold text-gray-900 text-sm">
              J{results.cycleDay > 0 ? results.cycleDay : "--"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      className={`text-xs ${textWhite ? "text-gray-900" : "text-gray-600"}`}
    >
      {label}
    </span>
  </div>
);

export default CycleCalendar;
