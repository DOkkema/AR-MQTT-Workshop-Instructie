import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Lightbulb,
  AlertCircle,
  Clock,
  Sparkles,
  Eye,
  Info,
  Lock,
  Unlock,
  ZoomIn,
  ArrowDown,
} from 'lucide-react';
import { WorkshopStep, CompletedStepState } from '../types';
import { AiStudioAssistant } from './AiStudioAssistant';
import { InteractiveSimulator } from './InteractiveSimulator';
import { VsCodeTour } from './VsCodeTour';
import { Opdracht1MiniViewer } from './Opdracht1MiniViewer';
import { ImageLightboxModal } from './ImageLightboxModal';

interface StepContentProps {
  step: WorkshopStep;
  stepState?: CompletedStepState;
  onCompleteStep: (stepKey: string) => void;
  onOpenStickerPicker: (stepKey: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isNextStepUnlocked: boolean;
  nextStepTitle?: string;
  onOpenBarcodeModal: () => void;
}

export const StepContent: React.FC<StepContentProps> = ({
  step,
  stepState,
  onCompleteStep,
  onOpenStickerPicker,
  onNextStep,
  onPrevStep,
  isFirstStep,
  isLastStep,
  isNextStepUnlocked,
  nextStepTitle,
  onOpenBarcodeModal,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeHintIndex, setActiveHintIndex] = useState<number | null>(null);

  // Progressive disclosure: which section is revealed (0-indexed)
  // If the step was already completed, reveal all sections!
  const [revealedSectionIndex, setRevealedSectionIndex] = useState<number>(() =>
    stepState?.completed ? step.sections.length : 0
  );

  // Reset or reveal when step changes
  useEffect(() => {
    setRevealedSectionIndex(stepState?.completed ? step.sections.length : 0);
    setQuizAnswers({});
    setCheckedCriteria({});
  }, [step.key, stepState?.completed]);

  // Lightbox state for screenshots
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string; title?: string; caption?: string } | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  // Check criteria state (must all be checked to complete!)
  const [checkedCriteria, setCheckedCriteria] = useState<Record<number, boolean>>({});

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleAdvanceSection = (currentIndex: number) => {
    const nextIdx = currentIndex + 1;
    setRevealedSectionIndex(nextIdx);
  };

  // Evaluation of requirements:
  const totalCriteria = step.checkCriteria.length;
  const checkedCriteriaCount = step.checkCriteria.filter((_, idx) => !!checkedCriteria[idx]).length;
  const areAllCriteriaChecked = totalCriteria === 0 || checkedCriteriaCount === totalCriteria;

  const totalQuizQuestions = step.quiz.length;
  const correctQuizCount = step.quiz.filter((q, idx) => quizAnswers[idx] === q.correctIndex).length;
  const isQuizAllCorrect = totalQuizQuestions === 0 || correctQuizCount === totalQuizQuestions;

  // Have all subsections in this step been unfolded?
  const areAllSectionsUnfolded = revealedSectionIndex >= step.sections.length;

  // Fully ready to complete if all sections unfolded, all criteria checked, and quiz is 100% correct
  const isReadyToComplete = areAllSectionsUnfolded && areAllCriteriaChecked && isQuizAllCorrect;

  const handleFinishStep = () => {
    if (isReadyToComplete || stepState?.completed) {
      onCompleteStep(step.key);
      onOpenStickerPicker(step.key);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Step Header Card */}
      <div className="bg-white border border-[#b5e2fa] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-[#0fa3b1] font-extrabold uppercase tracking-wider font-mono bg-[#b5e2fa]/30 px-2.5 py-1 rounded-md">
              {step.stepNumber}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>ca. {step.estimatedMinutes} minuten</span>
            </span>
          </div>

          {step.usedMarker !== 'Nog geen marker nodig' &&
            step.usedMarker !== 'Geen marker nodig — dit gebeurt op het scherm zelf' &&
            step.usedMarker !== 'Virtuele demo (alle markers)' && (
              <button
                onClick={onOpenBarcodeModal}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#eddea4]/40 hover:bg-[#eddea4]/70 text-slate-800 rounded-full font-mono text-[11px] transition-colors cursor-pointer border border-[#eddea4]"
              >
                <span>🏁 {step.usedMarker}</span>
                <span className="underline ml-1 font-bold">Bekijk</span>
              </button>
            )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
          {step.title}
        </h1>
        <p className="text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          {step.subtitle}
        </p>

        {/* Progress pills */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span
            className={`px-3 py-1 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
              areAllSectionsUnfolded
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-[#b5e2fa]/20 text-[#0fa3b1] border border-[#b5e2fa]'
            }`}
          >
            <span>{areAllSectionsUnfolded ? '✓' : '📖'}</span>
            <span>
              Deelopdrachten: {Math.min(revealedSectionIndex, step.sections.length)}/{step.sections.length} zichtbaar
            </span>
          </span>

          <span
            className={`px-3 py-1 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
              areAllCriteriaChecked
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {areAllCriteriaChecked ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span>☐</span>}
            <span>
              Controlepunten: {checkedCriteriaCount}/{totalCriteria}
            </span>
          </span>

          {totalQuizQuestions > 0 && (
            <span
              className={`px-3 py-1 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
                isQuizAllCorrect
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {isQuizAllCorrect ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span>❓</span>}
              <span>
                Begripsvragen: {correctQuizCount}/{totalQuizQuestions}
              </span>
            </span>
          )}

          {stepState?.completed && (
            <span className="px-3 py-1 rounded-xl font-semibold bg-[#f7a072]/20 text-[#f7a072] border border-[#f7a072]/50 flex items-center gap-1.5">
              <span>🏷️ Sticker op stickervel</span>
            </span>
          )}
        </div>

        {/* What & Why Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
          <div className="bg-[#f9f7f3] p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-[#0fa3b1] uppercase tracking-wider flex items-center gap-1.5">
              <span>🛠️</span> Wat ga je doen?
            </h4>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              {step.whatYouWillBuild}
            </p>
          </div>
          <div className="bg-[#eddea4]/20 p-4 rounded-2xl border border-[#eddea4]/60">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>💡</span> Waarom is dit belangrijk?
            </h4>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              {step.whyThisMatters}
            </p>
          </div>
        </div>
      </div>

      {/* SPECIAL INTERACTIVE VIEWERS */}
      {step.key === 'doel' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0fa3b1] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f7a072]" />
              <span>Demo van het Eindresultaat: Ervaar wat je gaat bouwen!</span>
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Dit is de werkende WebAR &amp; IoT app waar je in opdracht 1 t/m 6 naartoe bouwt. Test de knoppen, wissel van
            marker en verstel de temperatuur in de MQTT sensor injector!
          </p>
          <InteractiveSimulator initialMarker={1} />
        </div>
      )}

      {step.key === 'vscode' && <VsCodeTour />}

      {step.key === 'opdracht1' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0fa3b1] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#f7a072]" />
              <span>Live Visualizer: Alleen Marker 1 &amp; Het Eerste Blokje</span>
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Geen verwarring met latere stappen: in deze opdracht werk je uitsluitend met Marker 1, het oranje kubusje en
            straks jouw tweede vorm!
          </p>
          <Opdracht1MiniViewer />
        </div>
      )}

      {(step.key === 'opdracht2' ||
        step.key === 'opdracht3' ||
        step.key === 'opdracht4' ||
        step.key === 'opdracht5' ||
        step.key === 'opdracht6') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0fa3b1] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#f7a072]" />
              <span>Interactieve Simulator voor deze Opdracht</span>
            </h3>
          </div>
          <InteractiveSimulator
            initialMarker={
              step.key === 'opdracht2' || step.key === 'opdracht6'
                ? 2
                : step.key === 'opdracht4' || step.key === 'opdracht5'
                ? 4
                : 1
            }
          />
        </div>
      )}

      {/* PROGRESSIVE DISCLOSURE: Section by section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span>Stap-voor-stap uitvoeren</span>
            <span className="text-xs text-[#0fa3b1] font-mono normal-case font-normal">
              (ontvouwt na elke klik)
            </span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Deel {Math.min(revealedSectionIndex + 1, step.sections.length)} van {step.sections.length}
          </span>
        </div>

        {step.sections.map((sec, sIdx) => {
          // Only show sections that have been revealed so far!
          const isRevealed = sIdx <= revealedSectionIndex;
          const isCurrentActive = sIdx === revealedSectionIndex;
          const isDone = sIdx < revealedSectionIndex;

          if (!isRevealed) return null;

          return (
            <div
              key={sIdx}
              className={`bg-white border rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 transition-all duration-300 animate-in fade-in slide-in-from-top-3 ${
                isCurrentActive
                  ? 'border-[#0fa3b1] ring-2 ring-[#0fa3b1]/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-[#0fa3b1] text-white shadow-sm'
                    }`}
                  >
                    {isDone ? '✓' : sIdx + 1}
                  </span>
                  <span>{sec.title}</span>
                </h3>

                {isDone && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Uitgevoerd</span>
                  </span>
                )}
              </div>

              {/* Description Paragraphs */}
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {sec.description}
              </div>

              {/* Screenshots (if section has an image) */}
              {sec.image && (
                <div className="mt-4 bg-[#f9f7f3] border border-slate-200 rounded-2xl overflow-hidden p-3 space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-[#0fa3b1] uppercase tracking-wider">
                      📸 {sec.image.badge || 'Schermafbeelding'}
                    </span>
                    <button
                      onClick={() =>
                        setLightboxImg({
                          src: sec.image!.src,
                          alt: sec.image!.alt,
                          title: sec.image!.badge || sec.title,
                          caption: sec.image!.caption,
                        })
                      }
                      className="text-xs text-[#0fa3b1] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Vergroot afbeelding</span>
                    </button>
                  </div>

                  <div
                    onClick={() =>
                      setLightboxImg({
                        src: sec.image!.src,
                        alt: sec.image!.alt,
                        title: sec.image!.badge || sec.title,
                        caption: sec.image!.caption,
                      })
                    }
                    className="relative cursor-pointer group rounded-xl overflow-hidden border border-slate-200 bg-white"
                  >
                    <img
                      src={sec.image.src}
                      alt={sec.image.alt}
                      className="w-full max-h-80 object-contain mx-auto group-hover:scale-[1.01] transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-slate-800 text-xs font-bold gap-1 bg-white/40 backdrop-blur-xs">
                      <ZoomIn className="w-4 h-4" /> Klik om te vergroten
                    </div>
                  </div>

                  {sec.image.caption && (
                    <p className="text-xs text-slate-500 italic px-1">
                      {sec.image.caption}
                    </p>
                  )}
                </div>
              )}

              {/* Substeps List if any */}
              {sec.substeps && sec.substeps.length > 0 && (
                <div className="bg-[#f9f7f3] p-4 rounded-2xl border border-slate-200 space-y-2.5">
                  {sec.substeps.map((sub, subIdx) => (
                    <div key={subIdx} className="text-xs text-slate-700 flex items-start gap-2.5">
                      <span className="text-[#0fa3b1] font-bold shrink-0 mt-0.5">→</span>
                      <span className="leading-relaxed">{sub}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Code Block with Target Location */}
              {sec.codeBlock && (
                <div className="mt-4 rounded-2xl overflow-hidden border border-slate-700 bg-[#18232c] shadow-md">
                  <div className="bg-[#0f171e] px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#f7a072] font-bold">📍 Waar plak ik dit?</span>
                      <span className="text-slate-300 font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-600">
                        {sec.codeBlock.targetLocation}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(sec.codeBlock!.code, sIdx)}
                      className="flex items-center gap-1.5 px-3 py-1 bg-[#0fa3b1] hover:bg-[#0fa3b1]/90 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      {copiedIndex === sIdx ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedIndex === sIdx ? 'Gekopieerd!' : 'Kopieer code'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-[#b5e2fa] overflow-x-auto leading-relaxed">
                    {sec.codeBlock.code}
                  </pre>
                </div>
              )}

              {/* Callouts */}
              {sec.callout && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
                    sec.callout.type === 'gouden-regel'
                      ? 'bg-[#eddea4]/30 border-[#eddea4] text-amber-900'
                      : sec.callout.type === 'warning'
                      ? 'bg-rose-50 border-rose-200 text-rose-800'
                      : 'bg-[#b5e2fa]/25 border-[#b5e2fa] text-[#0fa3b1]'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {sec.callout.type === 'gouden-regel' && <Sparkles className="w-4 h-4 text-[#f7a072]" />}
                    {sec.callout.type === 'warning' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                    {sec.callout.type === 'info' && <Info className="w-4 h-4 text-[#0fa3b1]" />}
                  </div>
                  <div>
                    <strong className="block text-sm font-bold mb-1">
                      {sec.callout.title}
                    </strong>
                    <span className="whitespace-pre-line text-slate-700">{sec.callout.text}</span>
                  </div>
                </div>
              )}

              {/* ACTION BUTTON TO REVEAL NEXT SUBSECTION */}
              {isCurrentActive && sIdx < step.sections.length - 1 && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleAdvanceSection(sIdx)}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#0fa3b1] to-[#0d8a96] hover:from-[#0d8a96] hover:to-[#0fa3b1] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Ik heb dit uitgevoerd! Toon deel {sIdx + 2}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {isCurrentActive && sIdx === step.sections.length - 1 && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleAdvanceSection(sIdx)}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Alles uitgevoerd! Ga naar de Checks &amp; Vragen</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {step.key === 'opdracht7' && areAllSectionsUnfolded && <AiStudioAssistant />}

      {/* CHECKPOINTS & QUIZ (Only revealed once all subsections are done!) */}
      {areAllSectionsUnfolded ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Mandatory Check Criteria Checklist (Vinkjes) */}
          <div className="bg-white border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Verplichte Controlepunten (Vink alles af om door te gaan)</span>
              </h3>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                  areAllCriteriaChecked
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-[#eddea4]/40 text-amber-900 border border-[#eddea4]'
                }`}
              >
                {checkedCriteriaCount} / {totalCriteria} afgevinkt
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Controleer elk punt zorgvuldig in je browser of code. Pas als alles is aangevinkt, kun je door naar de
              volgende stap!
            </p>

            <div className="space-y-2.5">
              {step.checkCriteria.map((crit, cIdx) => {
                const isChecked = !!checkedCriteria[cIdx];
                return (
                  <label
                    key={cIdx}
                    onClick={() =>
                      setCheckedCriteria((prev) => ({ ...prev, [cIdx]: !prev[cIdx] }))
                    }
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-xs'
                        : 'bg-[#f9f7f3] hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded accent-[#0fa3b1] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs leading-relaxed select-none">
                      {crit}
                    </span>
                    {isChecked && <Check className="w-4 h-4 text-emerald-600 ml-auto shrink-0" />}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Check je Begrip: Mandatory Quiz Questions */}
          {step.quiz && step.quiz.length > 0 && (
            <div className="bg-white border-2 border-[#0fa3b1]/30 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-xl">🧠</span>
                  <span>Check je begrip (Beantwoord juist om te ontgrendelen)</span>
                </h3>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                    isQuizAllCorrect
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-[#b5e2fa]/30 text-[#0fa3b1] border border-[#b5e2fa]'
                  }`}
                >
                  {correctQuizCount} / {totalQuizQuestions} juist
                </span>
              </div>

              <div className="space-y-5">
                {step.quiz.map((q, qIdx) => {
                  const selectedOpt = quizAnswers[qIdx];
                  const hasAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div key={qIdx} className="bg-[#f9f7f3] p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                      <div className="text-xs font-bold text-slate-900 flex items-start gap-2">
                        <span className="text-[#0fa3b1] font-mono font-extrabold">Vraag {qIdx + 1}:</span>
                        <span>{q.question}</span>
                      </div>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedOpt === optIdx;
                          let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-[#0fa3b1]';

                          if (hasAnswered) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold shadow-xs';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && optIdx === q.correctIndex && (
                                <span className="text-emerald-700 font-bold ml-2 shrink-0">✓ Juist!</span>
                              )}
                              {hasAnswered && isOptionSelected && optIdx !== q.correctIndex && (
                                <span className="text-rose-600 font-bold ml-2 shrink-0">✕ Probeer opnieuw</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div
                          className={`text-xs p-3.5 rounded-xl mt-2 leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-100/70 border border-emerald-300 text-emerald-900'
                              : 'bg-rose-100/70 border border-rose-300 text-rose-900'
                          }`}
                        >
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hints Accordion */}
          {step.hints && step.hints.length > 0 && (
            <div className="bg-[#eddea4]/20 border border-[#eddea4] rounded-3xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Hulp nodig? Open een hint</span>
              </h4>

              <div className="space-y-2">
                {step.hints.map((hint, hIdx) => {
                  const isOpen = activeHintIndex === hIdx;
                  return (
                    <div
                      key={hIdx}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveHintIndex(isOpen ? null : hIdx)}
                        className="w-full text-left p-3.5 text-xs font-semibold text-slate-800 hover:text-[#0fa3b1] flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>
                          Hint {hIdx + 1}: {hint.title}
                        </span>
                        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                      </button>
                      {isOpen && (
                        <div className="p-3.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                          {hint.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completion & Sticker Reward Card */}
          <div
            className={`border-2 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${
              stepState?.completed || isReadyToComplete
                ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-[#b5e2fa]/30 border-emerald-400'
                : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {stepState?.completed || isReadyToComplete ? '🎉' : '🔒'}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {stepState?.completed
                    ? 'Stap is voltooid! Sticker behaald!'
                    : isReadyToComplete
                    ? 'Geweldig! Alle checks zijn gehaald!'
                    : 'Volgende stap vrijspelen'}
                </h3>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                {stepState?.completed
                  ? 'Je hebt deze stap succesvol afgerond en jouw sticker behaald. Je kunt nu door naar de volgende stap!'
                  : isReadyToComplete
                  ? 'Laat je werk kort zien aan de docent en klik hieronder om jouw sticker uit te zoeken en de volgende opdracht te ontgrendelen!'
                  : `Om de volgende opdracht te ontgrendelen moet je nog ${
                      !areAllCriteriaChecked
                        ? `${totalCriteria - checkedCriteriaCount} controlepunt(en) afvinken`
                        : ''
                    }${!areAllCriteriaChecked && !isQuizAllCorrect ? ' én ' : ''}${
                      !isQuizAllCorrect ? 'de begripsvraag juist beantwoorden' : ''
                    }.`}
              </p>
            </div>

            <button
              onClick={handleFinishStep}
              disabled={!isReadyToComplete && !stepState?.completed}
              className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-md shrink-0 ${
                stepState?.completed || isReadyToComplete
                  ? 'bg-gradient-to-r from-[#0fa3b1] to-[#f7a072] hover:opacity-95 text-white shadow-[#0fa3b1]/20 cursor-pointer hover:scale-105'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
            >
              {stepState?.completed || isReadyToComplete ? (
                <Unlock className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span>
                {stepState?.completed
                  ? 'Kies andere sticker'
                  : isReadyToComplete
                  ? 'Ontgrendel volgende stap & Kies Sticker! ✨'
                  : 'Nog vergrendeld 🔒'}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-[#b5e2fa]/20 border border-[#b5e2fa] rounded-2xl text-center text-xs text-slate-600">
          <span>
            👉 Voer de bovenstaande deelopdracht(en) uit en klik op <strong>"Ik heb dit uitgevoerd!"</strong> om de rest
            van deze opdracht en de checks te ontgrendelen.
          </span>
        </div>
      )}

      {/* Bottom Step Navigation (Prev / Next) */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={onPrevStep}
          disabled={isFirstStep}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            isFirstStep
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 cursor-pointer shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Vorige stap</span>
        </button>

        <button
          onClick={onNextStep}
          disabled={isLastStep || !isNextStepUnlocked}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            isLastStep || !isNextStepUnlocked
              ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
              : 'text-white bg-[#0fa3b1] hover:bg-[#0fa3b1]/90 shadow-md cursor-pointer'
          }`}
          title={
            !isNextStepUnlocked
              ? 'Voltooi eerst de huidige stap om deze vrij te spelen!'
              : nextStepTitle
          }
        >
          {!isNextStepUnlocked && <Lock className="w-3.5 h-3.5" />}
          <span>{isNextStepUnlocked ? 'Volgende stap' : 'Volgende stap (Locked 🔒)'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <ImageLightboxModal
          isOpen={true}
          imageSrc={lightboxImg.src}
          imageAlt={lightboxImg.alt}
          title={lightboxImg.title}
          description={lightboxImg.caption}
          onClose={() => setLightboxImg(null)}
        />
      )}
    </div>
  );
};
