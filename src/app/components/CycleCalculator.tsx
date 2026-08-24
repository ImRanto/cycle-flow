"use client"

import React, { useState, useEffect } from "react";
import { CycleData, CycleResults } from "../types/cycle.types";
import {
  calculateCycle,
  formatDate,
  formatShortDate,
} from "../utils/cycleCalculations";
import CycleCalendar from "./CycleCalendar";
import CycleStats from "./CycleStats";
import PhaseIndicator from "./PhaseIndicator";
import { Calendar, Droplets, Moon, Save, Target, FileText, BarChart3, Lightbulb, AlertTriangle } from "lucide-react";

const CycleCalculator: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [todayStr, setTodayStr] = useState("");
  const [todayDisplay, setTodayDisplay] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const now = new Date();
    setTodayStr(now.toISOString().split("T")[0]);
    setTodayDisplay(now.toLocaleDateString("fr-FR"));
    setCurrentYear(now.getFullYear());
    setMounted(true);
  }, []);

  const defaultStartDate = todayStr || new Date().toISOString().split("T")[0];

  const [cycleData, setCycleData] = useState<CycleData>({
    startDate: defaultStartDate,
    cycleLength: 28,
    periodLength: 4,
    lutealPhaseLength: 14,
  });

  const [results, setResults] = useState<CycleResults | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    if (!todayStr) return;
    try {
      const savedData = localStorage.getItem("lastCycleData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setCycleData(parsedData);
        calculateAndSetResults(parsedData);
      } else {
        const defaultData = { ...cycleData, startDate: todayStr };
        setCycleData(defaultData);
        calculateAndSetResults(defaultData);
      }
    } catch (error) {
      console.error("Erreur lors de la lecture des données sauvegardées:", error);
      const defaultData = { ...cycleData, startDate: todayStr };
      calculateAndSetResults(defaultData);
    }
  }, [todayStr]);

  const calculateAndSetResults = (data: CycleData) => {
    const calculatedResults = calculateCycle(data);
    setResults(calculatedResults);
    setIsCalculated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    const newValue = type === "number" ? parseInt(value) || 0 : value;

    const updatedData = {
      ...cycleData,
      [name]: newValue,
    };

    setCycleData(updatedData);

    // Recalcul automatique si toutes les données sont valides
    if (updatedData.startDate && updatedData.cycleLength > 0) {
      calculateAndSetResults(updatedData);
    }
  };

  const handleCycleLengthChange = (value: number) => {
    const updatedData = {
      ...cycleData,
      cycleLength: value,
    };

    setCycleData(updatedData);
    calculateAndSetResults(updatedData);
  };

  const handleQuickSelect = (days: number) => {
    const updatedData = {
      ...cycleData,
      cycleLength: days,
    };

    setCycleData(updatedData);
    calculateAndSetResults(updatedData);
  };

  const handleSave = () => {
    localStorage.setItem("lastCycleData", JSON.stringify(cycleData));

    // Animation de confirmation
    const button = document.getElementById("saveButton");
    if (button) {
      button.textContent = "✓ Enregistré !";
      setTimeout(() => {
        button.textContent = "💾 Enregistrer les préférences";
      }, 2000);
    }
  };

  const quickCycleOptions = [
    { days: 26, label: "Court" },
    { days: 28, label: "Standard" },
    { days: 30, label: "Long" },
    { days: 32, label: "Très long" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-gray-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto pr-16 lg:pr-20">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Calculateur de Cycle Intelligent
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Suivez votre cycle menstruel avec précision. Calculs automatiques,
            prédictions fiables et interface élégante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Formulaire */}
          <div className="lg:col-span-2 space-y-8">
            {/* Carte principale du formulaire — Premium Glass */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50"></div>
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-pink-200/20 rounded-full blur-3xl"></div>

              <div className="relative z-10 p-6 md:p-8">
                <div className="flex items-center mb-8">
                  <div className="relative">
                    <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      Informations du cycle
                    </h2>
                    <p className="text-gray-500">
                      Renseignez vos données pour des calculs précis
                    </p>
                  </div>
                </div>

                <form className="space-y-6">
                {/* Date de début — Premium Glass */}
                <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-300/20 rounded-full -translate-y-8 translate-x-8 blur-2xl"></div>

                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-purple-100 shadow-sm">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Date de début des règles
                        </h3>
                        <p className="text-xs text-gray-400">Sélectionnez la date de vos dernières règles</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <label htmlFor="startDate" className="sr-only">
                        Date de début des règles
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={cycleData.startDate}
                        onChange={handleInputChange}
                        aria-label="Date de début des règles"
                        className="flex-1 px-5 py-4 bg-white/60 backdrop-blur-sm border-2 border-purple-200/60 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-lg text-gray-800"
                        required
                      />
                      <div className="sm:w-48 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60">
                        <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Aujourd'hui</div>
                        <div className="font-bold text-gray-800 text-lg mt-0.5">
                          {mounted ? todayDisplay : "\u00A0"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Durées — Premium Glass */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Durée du cycle */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-violet-300/20 rounded-full -translate-y-6 translate-x-6 blur-2xl"></div>

                    <div className="relative z-10 p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-violet-100 shadow-sm">
                          <Target className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Durée du cycle
                          </h3>
                          <p className="text-xs text-gray-400">Typiquement 28 jours</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-5">
                        <label htmlFor="cycleLength" className="text-sm text-gray-500">
                          Nombre de jours
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            id="cycleLength"
                            name="cycleLength"
                            min="21"
                            max="45"
                            value={cycleData.cycleLength}
                            onChange={handleInputChange}
                            aria-label="Durée du cycle en jours"
                            className="w-20 px-3 py-2 text-center text-2xl font-extrabold text-violet-600 bg-white/60 backdrop-blur-sm border-2 border-violet-200/60 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all tabular-nums"
                          />
                          <span className="text-sm text-gray-400" aria-hidden="true">j</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {quickCycleOptions.map((option) => (
                          <button
                            key={option.days}
                            type="button"
                            onClick={() => handleQuickSelect(option.days)}
                            aria-label={`Cycle de ${option.days} jours - ${option.label}`}
                            aria-pressed={cycleData.cycleLength === option.days}
                            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                              cycleData.cycleLength === option.days
                                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25 scale-105"
                                : "bg-white/50 text-gray-600 hover:bg-white/80 border border-gray-200/50"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Durée des règles */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-rose-300/20 rounded-full -translate-y-6 translate-x-6 blur-2xl"></div>

                    <div className="relative z-10 p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-rose-100 shadow-sm">
                          <Droplets className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Durée des règles
                          </h3>
                          <p className="text-xs text-gray-400">Typiquement 3-7 jours</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-5">
                        <label htmlFor="periodLength" className="text-sm text-gray-500">
                          Nombre de jours
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            id="periodLength"
                            name="periodLength"
                            min="2"
                            max="10"
                            value={cycleData.periodLength}
                            onChange={handleInputChange}
                            aria-label="Durée des règles en jours"
                            className="w-20 px-3 py-2 text-center text-2xl font-extrabold text-rose-600 bg-white/60 backdrop-blur-sm border-2 border-rose-200/60 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all tabular-nums"
                          />
                          <span className="text-sm text-gray-400" aria-hidden="true">j</span>
                        </div>
                      </div>

                      {/* Date de fin estimée */}
                      <div className="p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-rose-100/50">
                        <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
                          Fin estimée
                        </div>
                        <div className="text-lg font-bold text-rose-600">
                          {results ? formatShortDate(results.periodEndDate) : "\u00A0"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase lutéale — Style classique */}
                <div className="relative overflow-hidden rounded-2xl border border-white/40 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-300/20 rounded-full -translate-y-6 translate-x-6 blur-2xl"></div>

                  <div className="relative z-10 p-6">
                    {/* En-tête */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm">
                          <Moon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Phase lutéale</h3>
                          <p className="text-xs text-gray-400">Après l'ovulation · standard 14 jours</p>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-indigo-600 tabular-nums">
                          {cycleData.lutealPhaseLength}
                        </span>
                        <span className="text-sm font-medium text-gray-400">j</span>
                      </div>
                    </div>

                    {/* Barre de progression */}
                    <div className="mb-5">
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Court</span>
                        <span>Standard</span>
                        <span>Long</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${((cycleData.lutealPhaseLength - 10) / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Slider */}
                    <div className="mb-4">
                      <label htmlFor="lutealPhaseLength" className="sr-only">
                        Durée de la phase lutéale en jours
                      </label>
                      <input
                        type="range"
                        id="lutealPhaseLength"
                        name="lutealPhaseLength"
                        min="10"
                        max="18"
                        value={cycleData.lutealPhaseLength}
                        onChange={handleInputChange}
                        aria-label="Durée de la phase lutéale en jours"
                        aria-valuemin={10}
                        aria-valuemax={18}
                        aria-valuenow={cycleData.lutealPhaseLength}
                        aria-valuetext={`${cycleData.lutealPhaseLength} jours`}
                        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200"
                      />
                    </div>

                    {/* Chips de sélection rapide */}
                    <div className="flex gap-2">
                      {[10, 11, 12, 13, 14, 15, 16, 17, 18].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => {
                            const updatedData = { ...cycleData, lutealPhaseLength: val };
                            setCycleData(updatedData);
                            calculateAndSetResults(updatedData);
                          }}
                          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            cycleData.lutealPhaseLength === val
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105"
                              : "bg-white/50 text-gray-600 hover:bg-white/80 border border-gray-200/50"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bouton d'enregistrement — Premium */}
                <button
                  type="button"
                  id="saveButton"
                  onClick={handleSave}
                  className="group relative w-full overflow-hidden rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-violet-600 to-pink-600"></div>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 py-4 px-6 flex items-center justify-center gap-3">
                    <Save className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-white font-semibold text-lg">Enregistrer mes préférences</span>
                  </div>
                </button>
              </form>
              </div>
            </div>

            {/* Calendrier */}
            {results && (
              <CycleCalendar
                startDate={cycleData.startDate}
                cycleLength={cycleData.cycleLength}
                periodLength={cycleData.periodLength}
                results={results}
              />
            )}
          </div>

          {/* Colonne droite - Résultats */}
          <div className="space-y-8">
            {results && (
              <>
                <CycleStats results={results} />
                <PhaseIndicator
                  currentPhase={results.currentPhase}
                  phaseProgress={results.phaseProgress}
                />

                {/* Carte d'information */}
                <div className="bg-linear-to-r from-white to-purple-50 rounded-2xl shadow-xl p-6 border border-purple-100">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-5 h-5 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-800">
                      Statistiques du cycle
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-xl border">
                      <span className="text-gray-600">Jour actuel</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {results.cycleDay > 0 ? `J${results.cycleDay}` : "--"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-xl border">
                      <span className="text-gray-600">Cycle total</span>
                      <span className="text-xl font-bold text-gray-800">
                        {cycleData.cycleLength} jours
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-xl border">
                      <span className="text-gray-600">Phase lutéale</span>
                      <span className="text-xl font-bold text-indigo-600">
                        {cycleData.lutealPhaseLength} jours
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-white rounded-xl border">
                      <span className="text-gray-600">Règles</span>
                      <span className="text-xl font-bold text-pink-600">
                        {cycleData.periodLength} jours
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rappel */}
                <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-amber-200">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-amber-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-amber-400/20 flex-shrink-0">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-800 mb-2">Conseil</h4>
                      <p className="text-amber-700 text-sm">
                        La phase lutéale est généralement constante. Si votre
                        cycle varie, c'est souvent la phase folliculaire qui
                        change.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Avertissement */}
        <div className="mt-12 p-6 bg-linear-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl shadow-sm">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="font-bold text-rose-800 mb-2">
                Avertissement médical
              </h4>
              <p className="text-rose-700">
                Cette application fournit des estimations basées sur des
                moyennes statistiques et ne remplace pas un avis médical
                professionnel. Consultez un professionnel de santé pour des
                conseils personnalisés et pour toute question concernant votre
                santé reproductive.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            <p>
              CycleFlow by Ranto • Application de suivi menstruel •{" "}
              {currentYear || new Date().getFullYear()}
            </p>
            <p className="mt-2">Conçu avec soin pour votre bien-être</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CycleCalculator;
