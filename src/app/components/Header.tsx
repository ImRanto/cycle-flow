"use client";

import React from "react";
import { Calendar, Sparkles, ShieldCheck, Activity, Zap, Heart } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Fond gradient mesh premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-600 to-fuchsia-500"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.5),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.4),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)]"></div>

      {/* Orbes lumineuses */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-pink-400/20 rounded-full blur-[80px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-400/10 rounded-full blur-[60px] animate-float"></div>

      {/* Grille subtile en arrière-plan */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Section Texte */}
          <div className="text-center lg:text-left flex-1">
            {/* Badge premium */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl text-sm font-medium mb-8 shadow-lg shadow-black/5">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                <Activity size={12} className="text-white" />
              </div>
              <span className="text-white/90">Santé connectée & Privée</span>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="text-white drop-shadow-lg">Cycle</span>
              <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-fuchsia-300 bg-clip-text text-transparent">Flow</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Reprenez le contrôle. Une approche intuitive et élégante pour
              suivre votre cycle et comprendre votre corps.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#calculator"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-2xl shadow-xl shadow-white/20 hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Commencer maintenant
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                En savoir plus
              </a>
            </div>
          </div>

          {/* Section Cartes d'atouts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 w-full max-w-sm">
            <FeatureItem
              icon={<Calendar size={22} />}
              title="Cycle Intelligent"
              desc="Algorithmes prédictifs avancés"
              color="from-blue-400 to-indigo-500"
            />
            <FeatureItem
              icon={<Sparkles size={22} />}
              title="Prédictions"
              desc="Anticipez vos phases avec précision"
              color="from-amber-400 to-orange-500"
            />
            <FeatureItem
              icon={<ShieldCheck size={22} />}
              title="Confidentialité"
              desc="Données 100% sécurisées & locales"
              color="from-emerald-400 to-green-500"
            />
          </div>
        </div>
      </div>

      {/* Vague de transition premium */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 108C120 96 240 72 360 66C480 60 600 72 720 78C840 84 960 84 1080 78C1200 72 1320 60 1380 54L1440 48V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
          <path
            d="M0 120L60 114C120 108 240 96 360 90C480 84 600 84 720 90C840 96 960 108 1080 108C1200 108 1320 96 1380 90L1440 84V120H0Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </header>
  );
};

// Composant interne pour les éléments de fonctionnalités
const FeatureItem = ({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) => (
  <div className="group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/10">
    {/* Orbe hover */}
    <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${color} rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>

    <div className="relative z-10 flex items-center gap-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}>
        <div className="text-white">{icon}</div>
      </div>
      <div>
        <h3 className="font-bold text-white text-sm">{title}</h3>
        <p className="text-xs text-white/60 mt-0.5">{desc}</p>
      </div>
    </div>
  </div>
);

export default Header;
