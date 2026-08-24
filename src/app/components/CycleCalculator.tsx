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
import { Calendar, Droplets, Moon, Save, Target } from "lucide-react";

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
            {/* Carte principale du formulaire */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl text-white">📝</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Informations du cycle
                  </h2>
                  <p className="text-gray-500">
                    Renseignez vos données pour des calculs précis
                  </p>
                </div>
              </div>

              <form className="space-y-8">
                {/* Date de début */}
                <div className="bg-linear-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Date de début des règles
                    </h3>
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
                      className="flex-1 px-5 py-4 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 text-lg"
                      required
                    />
                    <div className="sm:w-48 p-4 bg-white rounded-xl border border-gray-200">
                      <div className="text-sm text-gray-500">Aujourd'hui</div>
                      <div className="font-semibold text-gray-800">
                        {mounted ? todayDisplay : "\u00A0"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Durées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Durée du cycle */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="w-6 h-6 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Durée de votre cycle
                      </h3>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <label htmlFor="cycleLength" className="text-gray-600">
                          Jours
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
                            className="w-24 px-4 py-3 text-center text-2xl font-bold text-purple-600 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                          />
                          <span className="text-sm text-gray-400" aria-hidden="true">jours</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-6">
                        {quickCycleOptions.map((option) => (
                          <button
                            key={option.days}
                            type="button"
                            onClick={() => handleQuickSelect(option.days)}
                            aria-label={`Cycle de ${option.days} jours - ${option.label}`}
                            aria-pressed={cycleData.cycleLength === option.days}
                            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                              cycleData.cycleLength === option.days
                                ? "bg-purple-600 text-white shadow-lg"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {option.label} ({option.days}j)
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium">Standard :</span> 28 jours
                    </div>
                  </div>

                  {/* Durée des règles */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <Droplets className="w-6 h-6 text-pink-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Durée des règles
                      </h3>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <label htmlFor="periodLength" className="text-gray-600">
                          Jours
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
                            className="w-24 px-4 py-3 text-center text-2xl font-bold text-pink-600 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                          />
                          <span className="text-sm text-gray-400" aria-hidden="true">jours</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="text-sm text-gray-500 mb-2">
                          Date de fin estimée :
                        </div>
                        {results && (
                          <div className="text-lg font-semibold text-gray-800 bg-pink-50 p-3 rounded-lg">
                            {formatShortDate(results.periodEndDate)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium">Typique :</span> 3-7 jours
                    </div>
                  </div>
                </div>

                {/* Phase lutéale */}
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                  <label htmlFor="lutealPhaseLength" className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Moon className="w-5 h-5 text-indigo-600" />
                    Phase lutéale
                  </label>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="text-gray-600 mb-2">Durée (jours)</div>
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
                        className="w-full h-3 bg-linear-to-r from-blue-200 to-indigo-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>10</span>
                        <span>14 (standard)</span>
                        <span>18</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-indigo-600">
                        {cycleData.lutealPhaseLength}
                      </div>
                      <div className="text-sm text-gray-500">jours</div>
                    </div>
                  </div>
                </div>

                {/* Bouton d'enregistrement */}
                <button
                  type="button"
                  id="saveButton"
                  onClick={handleSave}
                  className="group w-full bg-linear-to-r from-gray-900 to-black text-white font-semibold py-4 px-6 rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1"
                >
                  <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Enregistrer mes préférences</span>
                </button>
              </form>
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
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    📊 Statistiques du cycle
                  </h3>

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
                    <div className="text-2xl mr-4">💡</div>
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
            <div className="text-2xl mr-4">⚠️</div>
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
