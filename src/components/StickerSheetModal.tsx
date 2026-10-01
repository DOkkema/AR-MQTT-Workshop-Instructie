import React from 'react';
import { X, Sparkles, CheckCircle2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CompletedStepState } from '../types';
import { STICKER_CATALOG } from '../data/stickersData';
import { WORKSHOP_STEPS } from '../data/workshopData';

interface StickerSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedSteps: Record<string, CompletedStepState>;
  onSelectStickerForStep?: (stepKey: string, stickerId: string) => void;
  activePickingStepKey?: string | null;
  onClosePicker?: () => void;
}

export const StickerSheetModal: React.FC<StickerSheetModalProps> = ({
  isOpen,
  onClose,
  completedSteps,
  onSelectStickerForStep,
  activePickingStepKey,
  onClosePicker,
}) => {
  if (!isOpen && !activePickingStepKey) return null;

  const totalSteps = WORKSHOP_STEPS.length;
  const completedCount = Object.values(completedSteps).filter((s) => s.completed).length;
  const isAllCompleted = completedCount === totalSteps;

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
    });
  };

  const handleChooseSticker = (stickerId: string) => {
    if (activePickingStepKey && onSelectStickerForStep) {
      onSelectStickerForStep(activePickingStepKey, stickerId);
      triggerConfetti();
      if (onClosePicker) onClosePicker();
    }
  };

  const activeStepObj = WORKSHOP_STEPS.find((s) => s.key === activePickingStepKey);

  // If in active sticker picker mode
  if (activePickingStepKey && activeStepObj) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
        <div className="bg-white border-2 border-[#0fa3b1] w-full max-w-3xl rounded-3xl shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center pb-4 border-b border-slate-100">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-full text-emerald-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#f7a072]" /> STAP VOLTOOID!
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Super gedaan! Kies een vette tech-sticker!
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Voor het succesvol afronden van <span className="text-[#0fa3b1] font-bold">{activeStepObj.stepNumber}: {activeStepObj.title}</span>.
              Deze sticker wordt direct op jouw persoonlijke stickervel geplakt.
            </p>
          </div>

          {/* Sticker Grid Picker */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {STICKER_CATALOG.map((stk) => (
              <button
                key={stk.id}
                onClick={() => handleChooseSticker(stk.id)}
                className="group relative bg-[#f9f7f3] hover:bg-white border border-slate-200 hover:border-[#0fa3b1] rounded-2xl p-3.5 flex flex-col items-center text-center transition-all duration-150 hover:-translate-y-1 hover:shadow-md cursor-pointer"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xs transition-transform group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle, ${stk.glowColor}25 0%, transparent 70%)`,
                  }}
                >
                  <span className="filter drop-shadow-sm select-none">{stk.emoji}</span>
                </div>
                <div className="mt-2 text-xs font-bold text-slate-900 group-hover:text-[#0fa3b1] line-clamp-1">
                  {stk.name}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                  {stk.tagline}
                </div>
                <span className="mt-2 text-[10px] font-bold text-[#0fa3b1] group-hover:underline">
                  Kies deze →
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClosePicker}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Later kiezen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full Sticker Sheet View
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-3xl shadow-2xl p-6 sm:p-8 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0fa3b1] to-[#f7a072] flex items-center justify-center text-2xl shadow-sm text-white">
              🏷️
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Mijn WebAR &amp; IoT Stickervel
              </h2>
              <p className="text-xs text-slate-500">
                Verzamel voor elke goed voltooide opdracht een unieke technologie-sticker!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar & Milestone stats */}
        <div className="mt-4 p-4 bg-[#f9f7f3] rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-700">Voortgang Stickervel</span>
              <span className="text-[#0fa3b1] font-mono font-bold">
                {completedCount} van de {totalSteps} stickers ({Math.round((completedCount / totalSteps) * 100)}%)
              </span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0fa3b1] to-[#f7a072] transition-all duration-500 rounded-full"
                style={{ width: `${(completedCount / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          {isAllCompleted && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#eddea4] border border-amber-400 rounded-xl text-amber-950 text-xs font-bold shrink-0">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>STICKERVEL IS COMPLEET! 🎉</span>
            </div>
          )}
        </div>

        {/* The Sticker Sheet Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-1">
          {WORKSHOP_STEPS.map((step) => {
            const state = completedSteps[step.key];
            const isDone = state?.completed;
            const sticker = state?.selectedStickerId
              ? STICKER_CATALOG.find((s) => s.id === state.selectedStickerId)
              : null;

            return (
              <div
                key={step.key}
                className={`relative rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between min-h-[160px] ${
                  isDone
                    ? 'bg-white border-[#0fa3b1]/40 shadow-sm'
                    : 'bg-[#f9f7f3]/50 border-slate-200 border-dashed opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#0fa3b1] font-bold uppercase tracking-wider">
                      {step.stepNumber}
                    </span>
                    {isDone ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Behaald
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Nog niet behaald</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">{step.title}</h4>
                </div>

                {/* Sticker Slot */}
                <div className="my-3 flex items-center justify-center">
                  {sticker ? (
                    <div className="flex flex-col items-center animate-in zoom-in-75 duration-300">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-[#0fa3b1]/30"
                        style={{
                          background: `radial-gradient(circle, ${sticker.glowColor}22 0%, white 80%)`,
                        }}
                      >
                        <span className="filter drop-shadow-xs">{sticker.emoji}</span>
                      </div>
                      <span className="mt-1.5 text-xs font-bold text-slate-900 text-center">{sticker.name}</span>
                      <span className="text-[10px] text-slate-500 text-center line-clamp-1">{sticker.tagline}</span>
                    </div>
                  ) : isDone ? (
                    <button
                      onClick={() => handleChooseSticker('cyber_bot')}
                      className="px-3 py-1.5 bg-[#0fa3b1]/10 hover:bg-[#0fa3b1]/20 border border-[#0fa3b1]/40 text-[#0fa3b1] rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Kies jouw sticker ✨
                    </button>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl border-2 border-slate-200 border-dashed flex items-center justify-center text-slate-300 text-xl">
                      🔒
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 text-center font-mono">
                  {step.usedMarker}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Tip: Laat aan het eind je volle stickervel aan de docent zien!</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
          >
            Terug naar Workshop
          </button>
        </div>
      </div>
    </div>
  );
};
