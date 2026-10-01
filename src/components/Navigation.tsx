import React from 'react';
import { Printer, HelpCircle, FileCode, Lock, Info } from 'lucide-react';
import { StepKey } from '../types';
import { WORKSHOP_STEPS } from '../data/workshopData';

interface NavigationProps {
  currentStepKey: StepKey;
  onSelectStep: (stepKey: StepKey) => void;
  isStepUnlocked: (stepKey: StepKey) => boolean;
  completedStepsCount: number;
  totalStepsCount: number;
  onOpenStickerSheet: () => void;
  onOpenBarcodeModal: () => void;
  onOpenTroubleshoot: () => void;
  onOpenCodeInspector: () => void;
  onOpenWelcome: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentStepKey,
  onSelectStep,
  isStepUnlocked,
  completedStepsCount,
  totalStepsCount,
  onOpenStickerSheet,
  onOpenBarcodeModal,
  onOpenTroubleshoot,
  onOpenCodeInspector,
  onOpenWelcome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#b5e2fa]/60 shadow-xs">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title, single element text wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0fa3b1] to-[#b5e2fa] flex items-center justify-center text-sm shadow-sm font-extrabold text-white">
            AR
          </div>
          <button
            onClick={onOpenWelcome}
            className="text-left group cursor-pointer"
            title="Klik voor welkomstoverzicht"
          >
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap group-hover:text-[#0fa3b1] transition-colors">
              WebAR &amp; IoT Workshop
            </span>
          </button>
        </div>

        {/* Zone 2: Step Navigation Links with Lock Indicators */}
        <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto py-2">
          {WORKSHOP_STEPS.map((step) => {
            const isActive = step.key === currentStepKey;
            const unlocked = isStepUnlocked(step.key);

            return (
              <button
                key={step.key}
                onClick={() => onSelectStep(step.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#0fa3b1] text-white font-bold shadow-xs'
                    : unlocked
                    ? 'text-slate-700 hover:bg-[#b5e2fa]/20 hover:text-[#0fa3b1]'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title={unlocked ? step.title : 'Vergrendeld 🔒 (voltooi eerst de vorige stap)'}
              >
                {!unlocked && <Lock className="w-3 h-3 text-slate-400" />}
                <span>{step.stepNumber}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Welcome Info Button */}
          <button
            onClick={onOpenWelcome}
            className="p-2 text-slate-500 hover:text-[#0fa3b1] rounded-xl hover:bg-[#b5e2fa]/20 transition-colors cursor-pointer"
            title="Welkom & Introductie"
          >
            <Info className="w-4 h-4 text-[#0fa3b1]" />
          </button>

          {/* Barcode Print Action */}
          <button
            onClick={onOpenBarcodeModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-[#0fa3b1] bg-[#f9f7f3] hover:bg-[#b5e2fa]/20 rounded-xl transition-colors cursor-pointer border border-slate-200"
            title="Bekijk en print de barcode markers 1 t/m 5"
          >
            <Printer className="w-3.5 h-3.5 text-[#0fa3b1]" />
            <span>Markers</span>
          </button>

          {/* Files Action */}
          <button
            onClick={onOpenCodeInspector}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-[#0fa3b1] bg-[#f9f7f3] hover:bg-[#b5e2fa]/20 rounded-xl transition-colors cursor-pointer border border-slate-200"
            title="Download bestanden of bekijk mastercode"
          >
            <FileCode className="w-3.5 h-3.5 text-[#0fa3b1]" />
            <span>Bestanden</span>
          </button>

          {/* Troubleshooting Button */}
          <button
            onClick={onOpenTroubleshoot}
            className="p-2 text-slate-500 hover:text-[#f7a072] rounded-xl hover:bg-[#f7a072]/15 transition-colors cursor-pointer"
            title="EHBO & Problemen Oplossen"
          >
            <HelpCircle className="w-5 h-5 text-[#f7a072]" />
          </button>

          {/* Stickervel Button (Primary Glowing Action in Tangerine/Pacific) */}
          <button
            onClick={onOpenStickerSheet}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#f7a072] hover:bg-[#f7a072]/90 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <span>🏷️ Stickervel</span>
            <span className="bg-white/40 text-slate-950 text-[11px] px-1.5 py-0.5 rounded-md font-mono font-bold">
              {completedStepsCount}/{totalStepsCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Step Scroller */}
      <div className="lg:hidden flex items-center gap-2 px-4 py-2 border-t border-slate-100 overflow-x-auto text-xs bg-[#f9f7f3]">
        {WORKSHOP_STEPS.map((step) => {
          const isActive = step.key === currentStepKey;
          const unlocked = isStepUnlocked(step.key);

          return (
            <button
              key={step.key}
              onClick={() => onSelectStep(step.key)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#0fa3b1] text-white font-bold shadow-xs'
                  : unlocked
                  ? 'bg-white text-slate-700 border border-slate-200'
                  : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}
            >
              {!unlocked && <Lock className="w-2.5 h-2.5 text-slate-400" />}
              <span>{step.stepNumber}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
