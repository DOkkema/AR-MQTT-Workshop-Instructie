import React, { useState } from 'react';
import {
  MousePointerClick,
  Play,
  ZoomIn,
} from 'lucide-react';
import { ImageLightboxModal } from './ImageLightboxModal';

export const VsCodeTour: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'explorer' | 'editor' | 'liveserver' | 'starten'>('overview');
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string; title: string; caption?: string } | null>(null);

  return (
    <div className="bg-white border border-[#b5e2fa] rounded-3xl overflow-hidden shadow-sm mb-8">
      {/* Top VS Code Mock Titlebar */}
      <div className="bg-[#f9f7f3] px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
          </div>
          <span className="text-xs font-bold text-slate-800 ml-2">
            Visual Studio Code (VS Code) — Jouw Digitale Werkplaats
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
          {[
            { id: 'overview', label: '1. Overzicht' },
            { id: 'explorer', label: '2. Bestanden & Mappen' },
            { id: 'editor', label: '3. Code Editor' },
            { id: 'liveserver', label: '4. Live Server Installeren' },
            { id: 'starten', label: '5. Live Server Starten' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0fa3b1] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Mockup Body */}
      <div className="p-6 sm:p-7">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#f9f7f3] p-5 rounded-2xl border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-[#0fa3b1]/20 text-[#0fa3b1] flex items-center justify-center font-bold mb-2">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Wat is VS Code?</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  VS Code is een teksteditor speciaal voor programmeurs. Zie het als een soort Word, maar dan met
                  regelnummers, syntaxkleuren en directe koppeling naar je browser.
                </p>
              </div>

              <div className="bg-[#f9f7f3] p-5 rounded-2xl border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Waarom Live Server?</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Zonder Live Server moet je elke keer handmatig je browser verversen. Met Live Server vernieuwt je
                  webpagina automatisch direct zodra je op <strong>Ctrl + S</strong> (opslaan) drukt!
                </p>
              </div>

              <div className="bg-[#f9f7f3] p-5 rounded-2xl border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-[#eddea4] text-amber-900 flex items-center justify-center font-bold mb-2">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">De Gouden Regel</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Verander per keer <strong>één klein ding</strong>, sla op (Ctrl+S), kijk wat er gebeurt. Werkt het
                  niet? Dan weet je direct welke aanpassing het deed!
                </p>
              </div>
            </div>

            {/* Visual Overview Schematic */}
            <div className="bg-[#f9f7f3] border border-slate-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0fa3b1] uppercase tracking-wider">
                  📸 Schema van de Workshop (Ontwikkelen, Testen, Publiceren, Gebruiken)
                </span>
                <button
                  onClick={() =>
                    setLightboxImg({
                      src: './images/VSCode1.png',
                      alt: 'Overzichtsschema 4 fases',
                      title: 'De 4 fases van de workshop',
                      caption: '1. Ontwikkelen in VS Code, 2. Testen via Live Server, 3. Publiceren via GitHub, 4. Gebruiken met MQTT & Barcodes',
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
                    src: './images/VSCode1.png',
                    alt: 'Overzichtsschema 4 fases',
                    title: 'De 4 fases van de workshop',
                    caption: '1. Ontwikkelen in VS Code, 2. Testen via Live Server, 3. Publiceren via GitHub, 4. Gebruiken met MQTT & Barcodes',
                  })
                }
                className="cursor-pointer group rounded-xl overflow-hidden border border-slate-200 bg-white"
              >
                <img
                  src="./images/VSCode1.png"
                  alt="Overzichtsschema van de workshop"
                  className="w-full max-h-72 object-contain mx-auto group-hover:scale-[1.01] transition-transform"
                />
              </div>
            </div>

            <div className="p-4 bg-[#b5e2fa]/25 border border-[#b5e2fa] rounded-2xl flex items-center justify-between">
              <span className="text-xs text-[#0fa3b1] font-semibold">
                Klaar om de mappenstructuur te bekijken?
              </span>
              <button
                onClick={() => setActiveTab('explorer')}
                className="px-4 py-2 bg-[#0fa3b1] hover:bg-[#0fa3b1]/90 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Volgende: Bestanden &amp; Mappen →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: EXPLORER & FILES */}
        {activeTab === 'explorer' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-700">
              In VS Code werk je altijd in een <strong>map</strong> (Folder). Open linksboven via{' '}
              <code className="text-[#0fa3b1] bg-slate-100 px-1.5 py-0.5 rounded font-bold">File → Open Folder...</code> jouw
              workshopmap. Links zie je dan deze mappenstructuur:
            </p>

            <div className="bg-[#18232c] rounded-2xl border border-slate-700 overflow-hidden font-mono text-xs shadow-md">
              <div className="bg-[#0f171e] px-4 py-2.5 text-[11px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-700">
                EXPLORER: AR WORKSHOP BESTANDEN
              </div>
              <div className="p-4 space-y-2 text-slate-300">
                <div className="flex items-center gap-2 text-[#b5e2fa] font-bold">
                  <span>▾ 📁 AR workshop bestanden</span>
                </div>
                <div className="pl-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-300">
                    <span>▾ 📁 js</span>
                    <span className="text-[10px] text-slate-400 font-sans font-normal">
                      ← Belangrijk! Hierin moet mqttws31.min.js zitten!
                    </span>
                  </div>
                  <div className="pl-6 flex items-center gap-2 text-slate-400">
                    <span>📄 mqttws31.min.js</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold bg-slate-800/80 p-2 rounded-xl border border-emerald-500/40">
                    <span>📄 AR1.html</span>
                    <span className="text-[10px] text-emerald-300 font-sans font-semibold">
                      ← Jouw startbestand! Hier klik je op om te bewerken.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#eddea4]/30 border border-[#eddea4] rounded-2xl text-xs text-amber-950">
              <strong>Let op:</strong> Als je alleen een los bestand opent i.p.v. de hele map, kan Live Server soms
              moeite hebben met het vinden van de <code className="text-black font-bold">js/</code> map. Open dus altijd de hele
              map!
            </div>
          </div>
        )}

        {/* TAB 3: THE CODE EDITOR */}
        {activeTab === 'editor' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-700">
              Als je op <code className="text-[#0fa3b1] bg-slate-100 px-1.5 py-0.5 rounded font-bold">AR1.html</code> klikt, opent
              de code groot in het midden. Dit is hoe een HTML-bestand is opgebouwd:
            </p>

            <div className="bg-[#18232c] rounded-2xl border border-slate-700 overflow-hidden font-mono text-xs shadow-md">
              <div className="bg-[#0f171e] px-4 py-2 border-b border-slate-700 flex items-center gap-2 text-slate-300">
                <span className="text-[#f7a072]">📄 AR1.html</span>
              </div>
              <div className="p-4 space-y-2 text-[11px] leading-relaxed">
                <div className="text-slate-500">
                  <span className="inline-block w-6 text-slate-600">1</span>
                  &lt;!-- Post-it briefje voor mensen: de browser negeert dit --&gt;
                </div>
                <div className="text-[#b5e2fa]">
                  <span className="inline-block w-6 text-slate-600">2</span>
                  &lt;head&gt;
                </div>
                <div className="text-purple-300 pl-4">
                  <span className="inline-block w-6 text-slate-600">3</span>
                  &lt;style&gt; <span className="text-slate-400 font-sans">/* Kleding: knoppen en kleuren */</span> &lt;/style&gt;
                </div>
                <div className="text-[#b5e2fa]">
                  <span className="inline-block w-6 text-slate-600">4</span>
                  &lt;body&gt;
                </div>
                <div className="text-emerald-300 pl-4 bg-emerald-950/40 border-l-2 border-emerald-500 py-1">
                  <span className="inline-block w-6 text-slate-600">5</span>
                  &lt;a-scene ...&gt; <span className="text-slate-300 font-sans font-bold">← Hier staan de barcode-markers en 3D-objecten</span>
                </div>
                <div className="text-amber-300 pl-4">
                  <span className="inline-block w-6 text-slate-600">6</span>
                  &lt;script&gt; <span className="text-slate-400 font-sans">/* Hersenen: JavaScript logica &amp; MQTT */</span> &lt;/script&gt;
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              💡 <strong>Handige sneltoets:</strong> Gebruik <code className="text-black bg-slate-200 px-1.5 py-0.5 rounded font-bold">Ctrl + F</code> om
              snel een woord in je bestand te zoeken (bijvoorbeeld <code className="text-[#0fa3b1] font-bold">color="#ff6600"</code>).
            </p>
          </div>
        )}

        {/* TAB 4: INSTALL LIVE SERVER */}
        {activeTab === 'liveserver' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-700">
              Live Server is een gratis extensie voor VS Code. Dit hoef je maar <strong>één keer</strong> te installeren:
            </p>

            <div className="bg-[#f9f7f3] p-5 rounded-2xl border border-slate-200 space-y-3.5">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#0fa3b1] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div className="text-xs">
                  <strong className="text-slate-900 block">Klik links op het Extensions-icoon:</strong>
                  <span className="text-slate-600">Vier blokjes aan de linkerkant van het scherm (of druk op Ctrl+Shift+X).</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#0fa3b1] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div className="text-xs">
                  <strong className="text-slate-900 block">Typ in de zoekbalk: live server</strong>
                  <span className="text-slate-600">Er verschijnen verschillende resultaten.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#0fa3b1] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div className="text-xs">
                  <strong className="text-slate-900 block">Kies het resultaat van Ritwick Dey:</strong>
                  <span className="text-slate-600">
                    Dit is de populairste (miljoenen downloads). Klik op de blauwe knop{' '}
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-bold">Install</span>.
                  </span>
                </div>
              </div>
            </div>

            {/* Screenshot of Live Server extension search */}
            <div className="bg-[#f9f7f3] border border-slate-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0fa3b1] uppercase tracking-wider">
                  📸 Screenshot: Live Server in het Extensions paneel
                </span>
                <button
                  onClick={() =>
                    setLightboxImg({
                      src: './images/VSCode2.png',
                      alt: 'Live Server installeren in VS Code',
                      title: 'Live Server van Ritwick Dey installeren',
                      caption: 'Zoek "live server" in het Extensions paneel (Ctrl+Shift+X) en klik op Install.',
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
                    src: './images/VSCode2.png',
                    alt: 'Live Server installeren in VS Code',
                    title: 'Live Server van Ritwick Dey installeren',
                    caption: 'Zoek "live server" in het Extensions paneel (Ctrl+Shift+X) en klik op Install.',
                  })
                }
                className="cursor-pointer group rounded-xl overflow-hidden border border-slate-200 bg-white"
              >
                <img
                  src="./images/VSCode2.png"
                  alt="Live Server installeren in VS Code"
                  className="w-full max-h-72 object-contain mx-auto group-hover:scale-[1.01] transition-transform"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: STARTING LIVE SERVER */}
        {activeTab === 'starten' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-700">
              Als Live Server geïnstalleerd is, start je hem bij elke werksessie zo op:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f9f7f3] p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-[#0fa3b1] uppercase tracking-wider flex items-center gap-1.5">
                  <MousePointerClick className="w-4 h-4" />
                  <span>Methode A: Rechtsklikken (Aanbevolen)</span>
                </div>
                <p className="text-xs text-slate-600">
                  Rechtsklik in het bestandenlijstje links op <code className="text-black font-bold">AR1.html</code> en kies:
                </p>
                <div className="p-3 bg-white rounded-xl border-2 border-rose-400 text-slate-900 font-mono text-xs font-bold text-center shadow-xs">
                  👉 Open with Live Server (Alt+L Alt+O)
                </div>
              </div>

              <div className="bg-[#f9f7f3] p-5 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Play className="w-4 h-4 text-emerald-600" />
                  <span>Methode B: De knop rechtsonder</span>
                </div>
                <p className="text-xs text-slate-600">
                  Klik helemaal onderin de statusbalk op:
                </p>
                <div className="p-3 bg-white rounded-xl border-2 border-emerald-500 text-slate-900 font-mono text-xs font-bold text-center shadow-xs">
                  📡 "Go Live" of "Port: 5500"
                </div>
              </div>
            </div>

            {/* Screenshot of right-click Open with Live Server */}
            <div className="bg-[#f9f7f3] border border-slate-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0fa3b1] uppercase tracking-wider">
                  📸 Screenshot: Rechtsklik op AR1.html → Open with Live Server
                </span>
                <button
                  onClick={() =>
                    setLightboxImg({
                      src: './images/VSCode3.png',
                      alt: 'Rechtsklikken op AR1.html en Open with Live Server kiezen',
                      title: 'Live Server starten vanuit VS Code',
                      caption: 'Rechtsklik op AR1.html in de Explorer links en klik op "Open with Live Server".',
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
                    src: './images/VSCode3.png',
                    alt: 'Rechtsklikken op AR1.html en Open with Live Server kiezen',
                    title: 'Live Server starten vanuit VS Code',
                    caption: 'Rechtsklik op AR1.html in de Explorer links en klik op "Open with Live Server".',
                  })
                }
                className="cursor-pointer group rounded-xl overflow-hidden border border-slate-200 bg-white"
              >
                <img
                  src="./images/VSCode3.png"
                  alt="Rechtsklikken op AR1.html en Open with Live Server kiezen"
                  className="w-full max-h-72 object-contain mx-auto group-hover:scale-[1.01] transition-transform"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900">
              ✓ Er opent nu automatisch een browsertabblad met jouw AR-applicatie. Elke keer als je opslaat (Ctrl+S),
              ververst het browsertabblad vanzelf!
            </div>
          </div>
        )}
      </div>

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
