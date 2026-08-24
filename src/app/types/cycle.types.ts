export interface CycleData {
  startDate: string;
  cycleLength: number;
  periodLength: number;
  lutealPhaseLength: number;
}

export interface CycleResults {
  ovulationDate: string;
  fertileWindow: {
    start: string;
    end: string;
  };
  nextPeriod: string;
  cycleDay: number;
  periodEndDate: string;
  currentPhase: "menstrual" | "follicular" | "ovulation" | "luteal";
  phaseProgress: number;
  lutealPhaseLength: number;
}

export interface MonthlyCalendarDay {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isOvulation: boolean;
  isFertile: boolean;
  isPeriod: boolean;
  isToday: boolean;
  isWeekend: boolean;
  phase: string;
  cycleDay: number;
}

import React from "react";

export interface PhaseInfo {
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  duration: number;
}
