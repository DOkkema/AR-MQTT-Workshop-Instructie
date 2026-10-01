import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onStart: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onStart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="bg-white border-2 border-[#0fa3b1]/40 w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 relative">
        {/* Top celebratory icon & badge */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#0fa3b1] to-[#b5e2fa] shadow-lg shadow-[#0fa3b1]/20 text-3xl mb-1">
            🥽
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#b5e2fa]/30 border border-[#b5e2fa] rounded-full text-[#0fa3b1] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#f7a072]" />
              <span>Welkom bij de WebAR &amp; IoT Workshop</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bouw je eigen AR-app met MQTT
            </h1>
          </div>

          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            In deze interactieve workshop tover je jouw smartphone en laptop om in een Augmented Reality scanner die live
            communiceert met een Raspberry Pi en de Sense HAT!
          </p>
        </div>

        {/* 3 Step Visual Flow with warm pastel cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-slate-100">
          <div className="bg-[#f9f7f3] p-4 rounded-2xl border border-slate-200 flex flex-col items-center text-center space-y-2">
            <span className="text-2xl">💻</span>
            <div className="text-xs font-bold text-slate-900">1. Stap voor stap bouwen</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Je werkt in Visual Studio Code met A-Frame en test alles direct via Live Server.
            </p>
          </div>

          <div className="bg-[#b5e2fa]/20 p-4 rounded-2xl border border-[#b5e2fa]/60 flex flex-col items-center text-center space-y-2">
            <span className="text-2xl">🧠</span>
            <div className="text-xs font-bold text-slate-900">2. Checks &amp; Unlocken</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Vink alle controlepunten af en beantwoord de vraag om de volgende opdracht vrij te spelen.
            </p>
          </div>

          <div className="bg-[#eddea4]/25 p-4 rounded-2xl border border-[#eddea4] flex flex-col items-center text-center space-y-2">
            <span className="text-2xl">🏷️</span>
            <div className="text-xs font-bold text-slate-900">3. Stickervel vullen!</div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Bij elke goed voltooide stap mag je een vette technologie-sticker uitkiezen voor jouw stickervel.
            </p>
          </div>
        </div>

        {/* Motivational Callout */}
        <div className="mt-5 p-4 bg-[#eddea4]/30 border border-[#eddea4] rounded-2xl flex items-center gap-3 text-xs text-amber-950">
          <span className="text-xl">💡</span>
          <div>
            <strong>Nog nooit geprogrammeerd?</strong> Geen zorgen! Deze workshop legt alles uit voor absolute
            beginners. Verander één ding, sla op en kijk direct wat er gebeurt!
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0fa3b1] to-[#f7a072] hover:opacity-95 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-[#0fa3b1]/20 flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
          >
            <span>Aan de slag! 🚀</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
