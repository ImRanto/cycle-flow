"use client";

import React, { useState } from "react";
import {
  User,
  Heart,
  X,
  Coffee,
  Mail,
  ChevronLeft,
  Github,
  Linkedin,
  ExternalLink,
  Zap,
  Crown,
} from "lucide-react";

export const ModernCreatorPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleOpen = () => {
    setIsExpanded(true);
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
      {!isExpanded && (
        <div className="relative flex items-center">
          <button
            onClick={handleOpen}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="Ouvrir le panneau du développeur"
            aria-expanded={isExpanded}
            className="group relative bg-white border-l border-y border-gray-100 shadow-lg pl-4 pr-2 py-5 rounded-l-2xl transition-all duration-500 hover:pl-6 hover:bg-gray-50 active:scale-95"
          >
            <div className="flex flex-col items-center gap-3">
              <ChevronLeft
                className={`w-4 h-4 text-purple-400 transition-transform duration-500 ${
                  isHovering ? "-translate-x-1" : ""
                }`}
              />

              <div className="relative">
                <div className="w-9 h-9 bg-linear-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <User size={18} />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <Crown size={8} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* PANNEAU DÉROULANT */}
      <div
        className={`
          bg-white border-l border-y border-gray-100 shadow-2xl
          rounded-l-4xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden
          ${
            isExpanded
              ? "w-[320px] sm:w-[360px] opacity-100 translate-x-0"
              : "w-0 opacity-0 translate-x-10 pointer-events-none"
          }
        `}
      >
        <div className="w-[320px] sm:w-[360px] p-6 sm:p-8 relative">
          <button
            onClick={() => setIsExpanded(false)}
            aria-label="Fermer le panneau"
            className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-transform hover:rotate-90 duration-300"
          >
            <X size={20} />
          </button>

          {/* Profil */}
          <div className="flex flex-col items-center text-center mt-4 mb-6">
            <div className="w-16 h-16 bg-linear-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg rotate-3 mb-4 transition-transform hover:rotate-0 duration-500">
              <User size={32} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Ranto Handraina
            </h3>
            <p className="text-sm text-purple-600">Développeur Full-Stack</p>
          </div>

          {/* Bio */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "Je conçois des applications qui allient beauté et utilité.
              CycleFlow est mon engagement pour une santé mieux comprise."
            </p>
          </div>

          {/* Contacts */}
          <div className="space-y-2 mb-6">
            <ContactLink
              icon={<Mail size={14} />}
              label="Email"
              value="hei.ranto.2@gmail.com"
              href="mailto:hei.ranto.2@gmail.com"
              color="text-purple-600"
            />
            <ContactLink
              icon={<Coffee size={14} />}
              label="Portfolio"
              value="ranto-io.vercel.app"
              href="https://ranto-io.vercel.app"
              color="text-orange-500"
            />
            <div className="flex gap-2">
              <SocialIcon
                icon={<Github size={16} />}
                href="https://github.com/ImRanto"
                label="Profil GitHub"
              />
              <SocialIcon
                icon={<Linkedin size={16} />}
                href="https://www.linkedin.com/in/handraina-ranto-78a00b299"
                label="Profil LinkedIn"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-gray-400">
              <Heart
                size={10}
                className="text-rose-500 fill-rose-500 animate-pulse"
              />
              <span>Fait avec passion • 2026</span>
            </div>
            <Zap size={12} className="text-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactLink = ({ icon, label, value, href, color }: { icon: React.ReactNode; label: string; value: string; href: string; color: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-purple-200 transition-all text-left"
  >
    <div
      className={`p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors ${color}`}
    >
      {icon}
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-[9px] text-gray-400 uppercase tracking-tight">
        {label}
      </p>
      <p className="text-xs font-medium text-gray-700 truncate">{value}</p>
    </div>
    <ExternalLink
      size={12}
      className="text-gray-300 group-hover:text-purple-400 transition-colors"
    />
  </a>
);

const SocialIcon = ({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex-1 flex items-center justify-center p-3 bg-gray-50 rounded-xl text-gray-400 hover:bg-gray-900 hover:text-white transition-all shadow-sm"
  >
    {icon}
  </a>
);
