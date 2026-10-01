import React, { useState, useEffect } from 'react';
import { StepKey, CompletedStepState } from './types';
import { WORKSHOP_STEPS } from './data/workshopData';
import { Navigation } from './components/Navigation';
import { StepContent } from './components/StepContent';
import { StickerSheetModal } from './components/StickerSheetModal';
import { BarcodeModal } from './components/BarcodeModal';
import { CodeInspectorModal } from './components/CodeInspectorModal';
import { TroubleshootModal } from './components/TroubleshootModal';
import { WelcomeModal } from './components/WelcomeModal';
import { STICKER_CATALOG } from './data/stickersData';
import {
  CheckCircle2,
  Lock,
  Printer,
  FileCode,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

const STORAGE_KEY = 'webar_workshop_completed_steps';
const WELCOME_SEEN_KEY = 'webar_workshop_welcome_dismissed';

export default function App() {
  const [currentStepKey, setCurrentStepKey] = useState<StepKey>('doel');
  const [completedSteps, setCompletedSteps] = useState<Record<string, CompletedStepState>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activePickingStepKey, setActivePickingStepKey] = useState<string | null>(null);
  const [isStickerSheetOpen, setIsStickerSheetOpen] = useState<boolean>(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState<boolean>(false);
  const [isCodeInspectorOpen, setIsCodeInspectorOpen] = useState<boolean>(false);
  const [isTroubleshootOpen, setIsTroubleshootOpen] = useState<boolean>(false);

  // Welcome modal: open on initial load
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(WELCOME_SEEN_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  // Lock notification toast when student clicks a locked step
  const [lockedToast, setLockedToast] = useState<{ message: string; stepName: string } | null>(null);

  // Persist completed steps
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps));
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }
  }, [completedSteps]);

  // Check if a step is unlocked:
  // Step 0 is always unlocked.
  // Step i is unlocked only if step i-1 is completed.
  const isStepUnlocked = (key: StepKey): boolean => {
    const idx = WORKSHOP_STEPS.findIndex((s) => s.key === key);
    if (idx <= 0) return true;
    const prevStep = WORKSHOP_STEPS[idx - 1];
    return !!completedSteps[prevStep.key]?.completed;
  };

  const handleDismissWelcome = () => {
    setIsWelcomeOpen(false);
    try {
      localStorage.setItem(WELCOME_SEEN_KEY, 'true');
    } catch {}
  };

  const handleSelectStep = (key: StepKey) => {
    if (!isStepUnlocked(key)) {
      const stepIdx = WORKSHOP_STEPS.findIndex((s) => s.key === key);
      const prevStep = WORKSHOP_STEPS[stepIdx - 1];
      setLockedToast({
        stepName: WORKSHOP_STEPS[stepIdx]?.title || 'Deze opdracht',
        message: `Deze stap is nog vergrendeld! Voltooi eerst "${prevStep?.stepNumber}: ${prevStep?.title}" (vink alle controlepunten af en beantwoord de vraag juist) om deze stap vrij te spelen.`,
      });
      setTimeout(() => setLockedToast(null), 5000);
      return;
    }

    setCurrentStepKey(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentStepIndex = WORKSHOP_STEPS.findIndex((s) => s.key === currentStepKey);
  const currentStep = WORKSHOP_STEPS[currentStepIndex] || WORKSHOP_STEPS[0];

  const nextStep = currentStepIndex < WORKSHOP_STEPS.length - 1 ? WORKSHOP_STEPS[currentStepIndex + 1] : null;
  const isNextStepUnlocked = nextStep ? isStepUnlocked(nextStep.key) : false;

  const handleNextStep = () => {
    if (nextStep && isNextStepUnlocked) {
      handleSelectStep(nextStep.key);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      handleSelectStep(WORKSHOP_STEPS[currentStepIndex - 1].key);
    }
  };

  const handleCompleteStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: {
        completed: true,
        selectedStickerId: prev[stepKey]?.selectedStickerId,
        completedAt: new Date().toISOString(),
      },
    }));
  };

  const handleSelectStickerForStep = (stepKey: string, stickerId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: {
        completed: true,
        selectedStickerId: stickerId,
        completedAt: new Date().toISOString(),
      },
    }));
  };

  const completedCount = Object.values(completedSteps).filter((s) => s.completed).length;
  const totalCount = WORKSHOP_STEPS.length;

  // Mastercode unlocks only when Opdracht 6 is completed!
  const isMastercodeUnlocked = !!completedSteps['opdracht6']?.completed;

  return (
    <div className="min-h-screen bg-[#f9f7f3] text-slate-800 flex flex-col relative">
      {/* 3-Zone Navigation Header */}
      <Navigation
        currentStepKey={currentStepKey}
        onSelectStep={handleSelectStep}
        isStepUnlocked={isStepUnlocked}
        completedStepsCount={completedCount}
        totalStepsCount={totalCount}
        onOpenStickerSheet={() => setIsStickerSheetOpen(true)}
        onOpenBarcodeModal={() => setIsBarcodeModalOpen(true)}
        onOpenTroubleshoot={() => setIsTroubleshootOpen(true)}
        onOpenCodeInspector={() => setIsCodeInspectorOpen(true)}
        onOpenWelcome={() => setIsWelcomeOpen(true)}
      />

      {/* Locked Toast Notification */}
      {lockedToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#eddea4] border-2 border-amber-500/70 text-amber-950 p-4 rounded-2xl shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-5">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 rounded-xl text-amber-800">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-1">
                🔒 {lockedToast.stepName} is vergrendeld
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed">
                {lockedToast.message}
              </p>
            </div>
            <button
              onClick={() => setLockedToast(null)}
              className="text-amber-800 hover:text-black text-xs font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Learning Hub Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sticky Progress & Step Tree (4 cols on lg) */}
        <aside className="lg:col-span-4 space-y-5">
          {/* Quick Progress Banner */}
          <div className="bg-white border border-[#b5e2fa] rounded-3xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Jouw Voortgang
              </span>
              <span className="text-xs font-mono font-bold text-[#0fa3b1]">
                {completedCount} / {totalCount} Voltooid
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-[#0fa3b1] to-[#f7a072] transition-all duration-500 rounded-full"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setIsStickerSheetOpen(true)}
              className="w-full py-2.5 px-3 bg-[#f7a072]/20 hover:bg-[#f7a072]/30 text-[#f7a072] hover:text-[#d97c50] rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#f7a072]/40"
            >
              <span>Bekijk Mijn Stickervel</span>
              <span className="text-base">🏷️</span>
            </button>
          </div>

          {/* Interactive Steps List with strict Lock indicators */}
          <div className="bg-white border border-[#b5e2fa] rounded-3xl p-4 shadow-xs space-y-1.5">
            <div className="px-2 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Stappenplan &amp; Opdrachten</span>
              <span className="text-[10px] text-slate-400 font-mono">Unlock stap voor stap</span>
            </div>

            {WORKSHOP_STEPS.map((step, idx) => {
              const isActive = step.key === currentStepKey;
              const isDone = completedSteps[step.key]?.completed;
              const unlocked = isStepUnlocked(step.key);
              const chosenSticker = completedSteps[step.key]?.selectedStickerId
                ? STICKER_CATALOG.find((s) => s.id === completedSteps[step.key].selectedStickerId)
                : null;

              return (
                <button
                  key={step.key}
                  onClick={() => handleSelectStep(step.key)}
                  className={`w-full text-left p-3 rounded-2xl transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-[#b5e2fa]/30 border-2 border-[#0fa3b1] shadow-xs text-slate-900 font-bold'
                      : unlocked
                      ? 'hover:bg-slate-50 text-slate-700 border border-transparent'
                      : 'opacity-50 text-slate-400 bg-slate-50/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                          : isActive
                          ? 'bg-[#0fa3b1] text-white shadow-xs'
                          : unlocked
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : !unlocked ? (
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono text-[#0fa3b1] uppercase font-bold tracking-wider">
                          {step.stepNumber}
                        </span>
                        {!unlocked && (
                          <span className="text-[10px] text-slate-400 font-normal">
                            (Locked 🔒)
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-slate-800 truncate">
                        {step.title}
                      </div>
                    </div>
                  </div>

                  {/* Chosen sticker icon if completed */}
                  {chosenSticker ? (
                    <span className="text-base shrink-0 filter drop-shadow-xs" title={chosenSticker.name}>
                      {chosenSticker.emoji}
                    </span>
                  ) : isDone ? (
                    <span className="text-xs text-emerald-600 font-bold shrink-0">✓</span>
                  ) : !unlocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Quick Tools & Downloads Box */}
          <div className="bg-white border border-[#b5e2fa] rounded-3xl p-4 shadow-xs space-y-2 text-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">
              Snelle Hulpmiddelen
            </span>

            <button
              onClick={() => setIsBarcodeModalOpen(true)}
              className="w-full p-2.5 bg-[#f9f7f3] hover:bg-[#b5e2fa]/20 rounded-2xl border border-slate-200 text-slate-700 flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#0fa3b1] shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-slate-900">Print Barcode Markers</div>
                <div className="text-[11px] text-slate-500">Markers 1 t/m 5 op mat papier</div>
              </div>
            </button>

            <button
              onClick={() => setIsCodeInspectorOpen(true)}
              className="w-full p-2.5 bg-[#f9f7f3] hover:bg-[#b5e2fa]/20 rounded-2xl border border-slate-200 text-slate-700 flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-[#0fa3b1] shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <span>Bestanden &amp; Mastercode</span>
                  {!isMastercodeUnlocked && <Lock className="w-3 h-3 text-amber-500" />}
                </div>
                <div className="text-[11px] text-slate-500">
                  {isMastercodeUnlocked
                    ? 'AR1.html + webar01.html (Ontgrendeld!)'
                    : 'AR1.html direct downloaden (Mastercode locked)'}
                </div>
              </div>
            </button>

            <button
              onClick={() => setIsTroubleshootOpen(true)}
              className="w-full p-2.5 bg-[#f9f7f3] hover:bg-[#f7a072]/15 rounded-2xl border border-slate-200 text-slate-700 flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#f7a072] shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-slate-900">EHBO &amp; Problemen Oplossen</div>
                <div className="text-[11px] text-slate-500">Camera, MQTT &amp; GitHub oplossingen</div>
              </div>
            </button>
          </div>
        </aside>

        {/* Right Active Step Content Area (8 cols on lg) */}
        <section className="lg:col-span-8 min-w-0">
          <StepContent
            step={currentStep}
            stepState={completedSteps[currentStep.key]}
            onCompleteStep={handleCompleteStep}
            onOpenStickerPicker={(stepKey) => setActivePickingStepKey(stepKey)}
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            isFirstStep={currentStepIndex === 0}
            isLastStep={currentStepIndex === WORKSHOP_STEPS.length - 1}
            isNextStepUnlocked={isNextStepUnlocked}
            nextStepTitle={nextStep?.title}
            onOpenBarcodeModal={() => setIsBarcodeModalOpen(true)}
          />
        </section>
      </main>

      {/* Modals */}
      <WelcomeModal
        isOpen={isWelcomeOpen}
        onStart={handleDismissWelcome}
      />

      <StickerSheetModal
        isOpen={isStickerSheetOpen}
        onClose={() => setIsStickerSheetOpen(false)}
        completedSteps={completedSteps}
        onSelectStickerForStep={handleSelectStickerForStep}
        activePickingStepKey={activePickingStepKey}
        onClosePicker={() => setActivePickingStepKey(null)}
      />

      <BarcodeModal
        isOpen={isBarcodeModalOpen}
        onClose={() => setIsBarcodeModalOpen(false)}
      />

      <CodeInspectorModal
        isOpen={isCodeInspectorOpen}
        onClose={() => setIsCodeInspectorOpen(false)}
        isMastercodeUnlocked={isMastercodeUnlocked}
      />

      <TroubleshootModal
        isOpen={isTroubleshootOpen}
        onClose={() => setIsTroubleshootOpen(false)}
      />
    </div>
  );
}
