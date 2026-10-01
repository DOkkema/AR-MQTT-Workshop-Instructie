import React, { useState } from 'react';
import { Sparkles, Copy, Check, Terminal, Lightbulb, Compass, Code2 } from 'lucide-react';

interface ProjectIdea {
  id: string;
  title: string;
  badge: string;
  description: string;
  promptForAi: string;
  codeSnippet: string;
  explanation: string;
}

const AI_IDEAS: ProjectIdea[] = [
  {
    id: 'space_station',
    title: 'Draaiend Ruimtestation met Ringen',
    badge: 'Animatie & Geometrie',
    description:
      'Laat een futuristisch ruimtestation met een torus-ring en kern continu ronddraaien, die van snelheid verandert op basis van de MQTT sensordata!',
    promptForAi:
      'Ik doe een workshop met A-Frame 1.0.0, AR.js 2.1.4 en Paho MQTT. Ik wil op barcode-marker 3 een 3D ruimtestation bouwen met een kern (<a-sphere>) en een draaiende buitenring (<a-torus>). Geef me de HTML en het A-Frame animatie-attribuut, plus een stukje JavaScript dat de animatiesnelheid (dur) aanpast zodra er sensordata via onMessageArrived binnenkomt.',
    codeSnippet: `<!-- Ruimtestation op Barcode Marker 3 -->
<a-marker type="barcode" value="3" emitevents="true">
  <!-- Binnenkern -->
  <a-sphere position="0 0.5 0" radius="0.35" color="#00ffff"
            material="roughness: 0.2; metalness: 0.8"></a-sphere>
  
  <!-- Draaiende buitenste torus-ring -->
  <a-torus id="ruimte-ring" position="0 0.5 0" radius="0.7" radius-tubular="0.04"
           color="#ff00ff"
           animation="property: rotation; to: 0 360 360; loop: true; dur: 4000; easing: linear">
  </a-torus>
</a-marker>`,
    explanation:
      'A-Frame heeft een ingebouwde animation engine! Met property: rotation en dur: 4000 draait de torus elke 4 seconden een volledige ronde van 360 graden.',
  },
  {
    id: 'alarm_siren',
    title: 'Fabrieksalarm met Pulserende Gloed & Geluid',
    badge: 'Alarm & Multi-state',
    description:
      'Als de temperatuur boven de 28°C komt, begint het blok op de marker hevig te schudden of te pulseren in schaalgrootte, en kleurt fel waarschuwingsrood!',
    promptForAi:
      'Ik werk in A-Frame 1.0.0 en AR.js 2.1.4. Ik wil dat mijn 3D-blok (#stap4-blok) begint te pulseren (schaal groter en kleiner worden tussen scale="1 1 1" en scale="1.3 1.3 1.3") zodra de temperatuur boven 28 graden komt. Hoe kan ik met JavaScript een A-Frame animation attribuut dynamisch aanzetten en uitzetten in pasKleurAan()?',
    codeSnippet: `// In pasKleurAan(waardeAlsTekst):
if (waarde > 28) {
  // Zet alarm-puls animatie aan
  stap4Blok.setAttribute("animation", "property: scale; to: 1.25 1.25 1.25; dir: alternate; loop: true; dur: 500");
  stap4Blok.setAttribute("color", "#ff0044");
} else {
  // Stop animatie bij normale temperatuur
  stap4Blok.removeAttribute("animation");
  stap4Blok.setAttribute("scale", "1 1 1");
}`,
    explanation:
      'Met setAttribute("animation", "...") kun je live vanuit JavaScript een animatie activeren! Met removeAttribute("animation") schakel je het weer uit zodra het gevaar geweken is.',
  },
  {
    id: 'gltf_model',
    title: 'Echt 3D-Model Inladen (GLTF / GLB)',
    badge: '3D Graphics',
    description:
      'Vervang de simpele kubus door een echt 3D model van een windmolen, robotarm of ruimteschip dat je gratis kunt downloaden!',
    promptForAi:
      'In A-Frame 1.0.0 wil ik een extern 3D .gltf of .glb bestand inladen op een barcode marker. Welke tags moet ik gebruiken (<a-assets> en <a-gltf-model>)? Hoe stel ik de schaal en rotatie in zodat het model niet gigantisch groot over het scherm verschijnt?',
    codeSnippet: `<!-- 1. Laad het 3D model in de a-scene -->
<a-scene embedded arjs="...">
  <a-assets>
    <!-- Zorg dat robot.glb in je workshopmap staat -->
    <a-asset-item id="mijn-model" src="robot.glb"></a-asset-item>
  </a-assets>

  <!-- 2. Plaats het model op Marker 5 -->
  <a-marker type="barcode" value="5" emitevents="true">
    <a-gltf-model src="#mijn-model" position="0 0 0" scale="0.1 0.1 0.1"></a-gltf-model>
  </a-marker>
</a-scene>`,
    explanation:
      'Met <a-assets> laadt de browser het 3D-model vooraf in. Let goed op scale="0.1 0.1 0.1": externe 3D-modellen zijn vaak in centimeters of millimeters ontworpen en moeten meestal 10x verkleind worden.',
  },
  {
    id: 'double_marker',
    title: 'Twee Markers die Praten via MQTT',
    badge: 'Multi-Marker IoT',
    description:
      'Houd Marker 1 en Marker 4 tegelijk voor de camera: een kubus op Marker 1 "straalt" virtuele data over naar Marker 4!',
    promptForAi:
      'Ik heb in A-Frame en AR.js twee markers tegelijk in beeld (marker 1 en marker 4). Hoe kan ik detecteren of beide markers tegelijk zichtbaar zijn met de markerFound en markerLost events van AR.js? En hoe kan ik een laser-lijn of pijl tonen tussen de twee markers?',
    codeSnippet: `// Marker detectie events in JavaScript
const marker1 = document.querySelector('a-marker[value="1"]');
const marker4 = document.querySelector('a-marker[value="4"]');

marker1.addEventListener('markerFound', () => {
  console.log('Marker 1 gevonden!');
});

marker4.addEventListener('markerFound', () => {
  console.log('Marker 4 gevonden!');
});`,
    explanation:
      'Omdat we emitevents="true" op onze <a-marker> tags hebben staan, vuurt AR.js automatisch "markerFound" en "markerLost" events af die je met addEventListener kunt opvangen!',
  },
];

export const AiStudioAssistant: React.FC = () => {
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea>(AI_IDEAS[0]);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [customIdeaInput, setCustomIdeaInput] = useState<string>('');
  const [customPromptResult, setCustomPromptResult] = useState<string>('');

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleGenerateCustomPrompt = () => {
    if (!customIdeaInput.trim()) return;
    const generated = `Ik ben een student die een WebAR en IoT app bouwt met A-Frame 1.0.0, AR.js 2.1.4 (met 3x3 barcode markers) en Paho MQTT (over wss). 

Mijn huidige project heeft al:
- 3D objecten op barcode markers
- Knoppen die van kleur wisselen
- Live MQTT subscribe (sensordata) en publish (Sense HAT LED besturing met "R,G,B")

Mijn originele idee voor de slotopdracht is:
"${customIdeaInput.trim()}"

Kun je mij stap voor stap helpen om dit te bouwen? Geef me:
1. De precieze HTML/A-Frame code die ik moet toevoegen
2. De JavaScript code voor de logica
3. Waar ik dit precies in mijn bestaande bestand moet plakken
Houd de code eenvoudig, goed van commentaar voorzien en dummy-vriendelijk!`;
    setCustomPromptResult(generated);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-rose-600 flex items-center justify-center text-xl shadow-lg">
            🧠
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Slotopdracht AI Co-Pilot &amp; Prompt Generator
            </h3>
            <p className="text-xs text-slate-400">
              Gebruik AI in je VS Code chatvenster (Copilot/Gemini) of ChatGPT om jouw originele idee te bouwen!
            </p>
          </div>
        </div>
        <div className="px-3 py-1 bg-violet-950/60 border border-violet-500/40 text-violet-300 rounded-full text-xs font-semibold flex items-center gap-1.5 self-start">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Vrije Slotopdracht</span>
        </div>
      </div>

      {/* Idea Selector Cards */}
      <div>
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 block">
          1. Kies een inspirerend idee of bedenk je eigen thema:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AI_IDEAS.map((idea) => (
            <button
              key={idea.id}
              onClick={() => {
                setSelectedIdea(idea);
                setCopiedPrompt(false);
                setCopiedCode(false);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedIdea.id === idea.id
                  ? 'bg-violet-950/50 border-violet-500 shadow-md ring-1 ring-violet-500/50'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] font-semibold text-violet-400 uppercase tracking-wider">
                  {idea.badge}
                </span>
                <h4 className="text-xs font-bold text-white mt-1">{idea.title}</h4>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">{idea.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Idea Details & Ready-to-use Prompt */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 font-mono">
              2. Kopieer deze prompt naar je AI in VS Code:
            </span>
            <button
              onClick={() => handleCopyPrompt(selectedIdea.promptForAi)}
              className="flex items-center gap-1.5 px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'Gekopieerd!' : 'Kopieer Prompt'}</span>
            </button>
          </div>
          <div className="mt-2 p-3 bg-black/60 border border-slate-800 rounded-lg text-xs text-slate-200 font-mono leading-relaxed select-all">
            {selectedIdea.promptForAi}
          </div>
        </div>

        {/* Ready-to-test Code Block */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 font-mono">
              3. Of bekijk direct de voorbeeldcode:
            </span>
            <button
              onClick={() => handleCopyCode(selectedIdea.codeSnippet)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Gekopieerd!' : 'Kopieer Code'}</span>
            </button>
          </div>
          <pre className="mt-2 p-3.5 bg-black/80 border border-slate-800 rounded-lg text-xs text-emerald-300 font-mono overflow-x-auto">
            {selectedIdea.codeSnippet}
          </pre>
          <p className="mt-2 text-xs text-slate-400 flex items-start gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{selectedIdea.explanation}</span>
          </p>
        </div>
      </div>

      {/* Custom Idea Prompt Generator */}
      <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Heb je een heel eigen idee? Typ het hier in:</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customIdeaInput}
            onChange={(e) => setCustomIdeaInput(e.target.value)}
            placeholder="Bijv: 'Een 3D stoplicht dat op oranje springt en de Pi laat piepen'"
            className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleGenerateCustomPrompt}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            Maak AI Prompt ✨
          </button>
        </div>

        {customPromptResult && (
          <div className="mt-3 p-3 bg-black/70 border border-cyan-500/40 rounded-lg animate-in fade-in">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-cyan-300">Jouw op maat gemaakte prompt:</span>
              <button
                onClick={() => handleCopyPrompt(customPromptResult)}
                className="text-[10px] text-cyan-400 hover:underline font-bold"
              >
                Kopieer naar klembord
              </button>
            </div>
            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
              {customPromptResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
