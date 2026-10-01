import React, { useState } from 'react';
import { X, Download, FileCode, Lock, Unlock, Sparkles } from 'lucide-react';

interface CodeInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeFile?: 'AR1.html' | 'webar01.html' | 'mqttws31.min.js';
  isMastercodeUnlocked: boolean;
}

export const CodeInspectorModal: React.FC<CodeInspectorModalProps> = ({
  isOpen,
  onClose,
  activeFile = 'AR1.html',
  isMastercodeUnlocked,
}) => {
  const [selectedTab, setSelectedTab] = useState<'AR1.html' | 'webar01.html' | 'mqttws31.min.js'>(activeFile);

  if (!isOpen) return null;

  const getDownloadUrl = () => {
    const base = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    if (selectedTab === 'AR1.html') return `${base}AR1.html`;
    if (selectedTab === 'webar01.html') return `${base}webar01.html`;
    return `${base}js/mqttws31.min.js`;
  };

  const isCurrentTabLocked = selectedTab === 'webar01.html' && !isMastercodeUnlocked;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#0fa3b1]/40 w-full max-w-4xl rounded-3xl shadow-2xl p-6 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0fa3b1]/15 text-[#0fa3b1] flex items-center justify-center font-bold">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                Bestanden &amp; Download Center
              </h2>
              <p className="text-xs text-slate-500">
                Download het startbestand of ontgrendel de mastercode na opdracht 6.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
          <button
            onClick={() => setSelectedTab('AR1.html')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedTab === 'AR1.html'
                ? 'bg-[#0fa3b1] text-white shadow-xs'
                : 'bg-[#f9f7f3] text-slate-700 hover:bg-[#b5e2fa]/20 border border-slate-200'
            }`}
          >
            <span>AR1.html</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded ${
                selectedTab === 'AR1.html' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              Startbestand
            </span>
          </button>

          <button
            onClick={() => setSelectedTab('mqttws31.min.js')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedTab === 'mqttws31.min.js'
                ? 'bg-[#0fa3b1] text-white shadow-xs'
                : 'bg-[#f9f7f3] text-slate-700 hover:bg-[#b5e2fa]/20 border border-slate-200'
            }`}
          >
            <span>js/mqttws31.min.js</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded ${
                selectedTab === 'mqttws31.min.js' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              MQTT Library
            </span>
          </button>

          <button
            onClick={() => setSelectedTab('webar01.html')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedTab === 'webar01.html'
                ? isMastercodeUnlocked
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-amber-600 text-white shadow-xs'
                : 'bg-[#f9f7f3] text-slate-700 hover:bg-[#b5e2fa]/20 border border-slate-200'
            }`}
          >
            {isMastercodeUnlocked ? (
              <Unlock className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span>webar01.html</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                isMastercodeUnlocked
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-[#eddea4] text-amber-950 border border-amber-400/50'
              }`}
            >
              {isMastercodeUnlocked ? 'Ontgrendeld! 🎉' : 'Locked tot Opdracht 6 🔒'}
            </span>
          </button>
        </div>

        {/* Download & Action bar */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-mono">
            Bestand: <span className="text-[#0fa3b1] font-bold">{selectedTab}</span>
          </span>

          {!isCurrentTabLocked ? (
            <div className="flex gap-2">
              <a
                href={getDownloadUrl()}
                download={selectedTab.split('/').pop()}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#0fa3b1] hover:bg-[#0fa3b1]/90 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {selectedTab.split('/').pop()}</span>
              </a>
            </div>
          ) : (
            <span className="text-amber-800 font-semibold flex items-center gap-1.5 bg-[#eddea4]/40 px-3 py-1.5 rounded-xl border border-[#eddea4]">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Vergrendeld tot na afronding van Opdracht 6</span>
            </span>
          )}
        </div>

        {/* Preview Frame or Locked State */}
        <div className="mt-3 flex-1 min-h-[320px] overflow-hidden bg-[#f9f7f3] border border-slate-200 rounded-2xl relative flex items-center justify-center">
          {isCurrentTabLocked ? (
            <div className="p-8 text-center max-w-md space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-3xl bg-[#eddea4] border-2 border-amber-400 flex items-center justify-center text-3xl mx-auto shadow-md">
                🔒
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                De Mastercode is nog vergrendeld!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Het is veel leerzamer om de stappen eerst zelf op te bouwen. Zodra je{' '}
                <strong className="text-[#0fa3b1]">Opdracht 6 (MQTT sturen naar de Raspberry Pi)</strong> met succes
                hebt afgerond, speel je de complete mastercode vrij als beloning en naslagwerk voor je slotopdracht!
              </p>
              <div className="p-3 bg-[#eddea4]/50 border border-amber-300 rounded-xl text-xs text-amber-950 font-medium">
                💡 Voltooi Opdracht 1 t/m 6 om dit bestand te ontgrendelen.
              </div>
            </div>
          ) : (
            <>
              {selectedTab === 'webar01.html' && isMastercodeUnlocked && (
                <div className="absolute top-2 left-2 right-2 z-10 p-2.5 bg-emerald-100/90 border border-emerald-300 rounded-xl text-xs text-emerald-950 flex items-center gap-2 backdrop-blur-xs shadow-xs">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    🎉 <strong>Gefeliciteerd!</strong> Je hebt Opdracht 6 voltooid! De mastercode is nu ontgrendeld
                    als handig naslagwerk voor je slotopdracht.
                  </span>
                </div>
              )}
              <iframe
                src={getDownloadUrl()}
                title={selectedTab}
                className="w-full h-full min-h-[360px] border-none text-slate-800 bg-white font-mono text-xs p-2 rounded-xl"
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap justify-between items-center gap-2 text-xs text-slate-500">
          <span>💡 Tip: Plaats <code className="text-[#0fa3b1] font-bold">mqttws31.min.js</code> altijd in de submap <code className="text-[#0fa3b1] font-bold">js/</code> van je project!</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
