import {
  CycleData,
  CycleResults,
  MonthlyCalendarDay,
  PhaseInfo,
} from "../types/cycle.types";
import { Droplets, Sprout, Egg, Moon } from "lucide-react";

export const calculateCycle = (data: CycleData): CycleResults => {
  const startDate = new Date(data.startDate);
  const cycleLength = data.cycleLength;
  const periodLength = data.periodLength || 5;
  const lutealPhaseLength = data.lutealPhaseLength || 14;

  // Calcul de la date de fin des règles
  const periodEndDate = new Date(startDate);
  periodEndDate.setDate(periodEndDate.getDate() + periodLength - 1);

  // Date d'ovulation = Date de début + (cycleLength - lutealPhaseLength)
  const ovulationDate = new Date(startDate);
  ovulationDate.setDate(
    ovulationDate.getDate() + (cycleLength - lutealPhaseLength)
  );

  // Fenêtre fertile = 5 jours avant l'ovulation + jour de l'ovulation
  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(fertileStart.getDate() - 5);

  const fertileEnd = new Date(ovulationDate);

  // Prochaine période = Date de début + cycleLength
  const nextPeriod = new Date(startDate);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  // Jour actuel du cycle
  const today = new Date();
  const cycleDay =
    Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  // Déterminer la phase actuelle
  let currentPhase: CycleResults["currentPhase"] = "menstrual";
  let phaseProgress = 0;

  if (cycleDay <= periodLength) {
    currentPhase = "menstrual";
    phaseProgress = (cycleDay / periodLength) * 100;
  } else if (cycleDay <= cycleLength - lutealPhaseLength - 1) {
    currentPhase = "follicular";
    const follicularDays = cycleLength - lutealPhaseLength - periodLength;
    phaseProgress = ((cycleDay - periodLength) / follicularDays) * 100;
  } else if (cycleDay === cycleLength - lutealPhaseLength) {
    currentPhase = "ovulation";
    phaseProgress = 100;
  } else {
    currentPhase = "luteal";
    const lutealStartDay = cycleLength - lutealPhaseLength + 1;
    phaseProgress = ((cycleDay - lutealStartDay) / lutealPhaseLength) * 100;
  }

  return {
    ovulationDate: ovulationDate.toISOString().split("T")[0],
    fertileWindow: {
      start: fertileStart.toISOString().split("T")[0],
      end: fertileEnd.toISOString().split("T")[0],
    },
    nextPeriod: nextPeriod.toISOString().split("T")[0],
    cycleDay: cycleDay > 0 && cycleDay <= cycleLength ? cycleDay : 0,
    periodEndDate: periodEndDate.toISOString().split("T")[0],
    currentPhase,
    phaseProgress: Math.min(Math.max(phaseProgress, 0), 100),
    lutealPhaseLength,
  };
};

export const generateMonthlyCalendar = (
  year: number,
  month: number,
  cycleStartDate: string,
  cycleLength: number,
  periodLength: number,
  lutealPhaseLength: number
): MonthlyCalendarDay[] => {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    // Premier jour du mois
    const firstDay = new Date(year, month, 1);
    // Dernier jour du mois
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Jour de la semaine du premier jour (0=Dimanche, 1=Lundi...)
    // On convertit en commençant par Lundi (0=Lun, 6=Dim)
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;

    const calendarDays: MonthlyCalendarDay[] = [];
    const startDateObj = new Date(cycleStartDate);

    // Remplir les cases vides avant le premier jour du mois
    for (let i = 0; i < firstDayOfWeek; i++) {
      const d = new Date(firstDay);
      d.setDate(d.getDate() - (firstDayOfWeek - i));
      const dateStr = d.toISOString().split("T")[0];
      const dayOfWeek = (d.getDay() + 6) % 7;
      const cycleDayNum = getCycleDayForDate(d, startDateObj, cycleLength);
      const phaseInfo = getPhaseForDay(cycleDayNum, cycleLength, periodLength, lutealPhaseLength);
      const ovulationDay = cycleLength - lutealPhaseLength;
      const fertileStartDay = ovulationDay - 5;
      const fertileEndDay = ovulationDay;

      calendarDays.push({
        date: dateStr,
        dayOfMonth: d.getDate(),
        isCurrentMonth: false,
        isOvulation: cycleDayNum === ovulationDay,
        isFertile: cycleDayNum >= fertileStartDay && cycleDayNum <= fertileEndDay,
        isPeriod: cycleDayNum >= 1 && cycleDayNum <= periodLength,
        isToday: dateStr === todayStr,
        isWeekend: dayOfWeek === 5 || dayOfWeek === 6,
        phase: phaseInfo,
        cycleDay: cycleDayNum,
      });
    }

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dateStr = d.toISOString().split("T")[0];
      const dayOfWeek = (d.getDay() + 6) % 7;
      const cycleDayNum = getCycleDayForDate(d, startDateObj, cycleLength);
      const phaseInfo = getPhaseForDay(cycleDayNum, cycleLength, periodLength, lutealPhaseLength);
      const ovulationDay = cycleLength - lutealPhaseLength;
      const fertileStartDay = ovulationDay - 5;
      const fertileEndDay = ovulationDay;

      calendarDays.push({
        date: dateStr,
        dayOfMonth: day,
        isCurrentMonth: true,
        isOvulation: cycleDayNum === ovulationDay,
        isFertile: cycleDayNum >= fertileStartDay && cycleDayNum <= fertileEndDay,
        isPeriod: cycleDayNum >= 1 && cycleDayNum <= periodLength,
        isToday: dateStr === todayStr,
        isWeekend: dayOfWeek === 5 || dayOfWeek === 6,
        phase: phaseInfo,
        cycleDay: cycleDayNum,
      });
    }

    // Compléter la grille (toujours 42 cases = 6 lignes)
    const remaining = 42 - calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      const dateStr = d.toISOString().split("T")[0];
      const dayOfWeek = (d.getDay() + 6) % 7;
      const cycleDayNum = getCycleDayForDate(d, startDateObj, cycleLength);
      const phaseInfo = getPhaseForDay(cycleDayNum, cycleLength, periodLength, lutealPhaseLength);
      const ovulationDay = cycleLength - lutealPhaseLength;
      const fertileStartDay = ovulationDay - 5;
      const fertileEndDay = ovulationDay;

      calendarDays.push({
        date: dateStr,
        dayOfMonth: i,
        isCurrentMonth: false,
        isOvulation: cycleDayNum === ovulationDay,
        isFertile: cycleDayNum >= fertileStartDay && cycleDayNum <= fertileEndDay,
        isPeriod: cycleDayNum >= 1 && cycleDayNum <= periodLength,
        isToday: dateStr === todayStr,
        isWeekend: dayOfWeek === 5 || dayOfWeek === 6,
        phase: phaseInfo,
        cycleDay: cycleDayNum,
      });
    }

    return calendarDays;
  } catch (error) {
    console.error("Erreur dans generateMonthlyCalendar:", error);
    return [];
  }
};

// Calcule le jour du cycle pour une date donnée (en projetant le cycle dans le passé et le futur)
const getCycleDayForDate = (
  date: Date,
  cycleStartDate: Date,
  cycleLength: number
): number => {
  const diffMs = date.getTime() - cycleStartDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // Utiliser le modulo pour gérer les cycles passés et futurs
  let cycleDay = (diffDays % cycleLength) + 1;
  // Gérer les jours négatifs (avant la première date de cycle)
  if (cycleDay <= 0) cycleDay += cycleLength;
  return cycleDay;
};

// Détermine la phase pour un jour donné du cycle
const getPhaseForDay = (
  cycleDay: number,
  cycleLength: number,
  periodLength: number,
  lutealPhaseLength: number
): string => {
  const ovulationDay = cycleLength - lutealPhaseLength;
  if (cycleDay <= periodLength) return "menstrual";
  if (cycleDay < ovulationDay) return "follicular";
  if (cycleDay === ovulationDay) return "ovulation";
  return "luteal";
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
};

export const getPhaseInfo = (phase: string): PhaseInfo => {
  const phases: Record<string, PhaseInfo> = {
    menstrual: {
      name: "Menstruelle",
      description: "Phase des règles",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <Droplets className="w-4 h-4" />,
      duration: 5,
    },
    follicular: {
      name: "Folliculaire",
      description: "Préparation à l'ovulation",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Sprout className="w-4 h-4" />,
      duration: 10,
    },
    ovulation: {
      name: "Ovulation",
      description: "Libération de l'ovule",
      color: "bg-pink-100 text-pink-800 border-pink-200",
      icon: <Egg className="w-4 h-4" />,
      duration: 1,
    },
    luteal: {
      name: "Lutéale",
      description: "Après l'ovulation",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: <Moon className="w-4 h-4" />,
      duration: 14,
    },
  };

  return phases[phase] || phases.follicular;
};
