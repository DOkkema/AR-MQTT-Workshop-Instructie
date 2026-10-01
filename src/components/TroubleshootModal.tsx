import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

interface TroubleshootModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IssueItem {
  problem: string;
  cause: string;
  solution: string;
  category: 'camera' | 'mqtt' | 'github' | 'pi';
}

const ISSUES: IssueItem[] = [
  {
    category: 'camera',
    problem: 'Camera start niet op mijn smartphone',
    cause: 'Cameratoegang is geweigerd bij het eerste bezoek of de site draait niet op HTTPS.',
    solution:
      'Tik op het slotje 🔒 in de browser-adresbalk → Site-instellingen → Camera → Toestaan. Controleer daarnaast of je adres begint met https:// (GitHub Pages).',
  },
  {
    category: 'camera',
    problem: '3D-objecten verschijnen niet op de marker',
    cause: 'Te weinig licht, marker te ver weg, print plooit/glanst, of verkeerde marker.',
    solution:
      'Houd de marker mooi vlak, zorg voor helder licht zonder felle glansreflectie. Houd de camera op 10-20 cm afstand. Controleer of je het juiste marker-nummer voor de opdracht gebruikt!',
  },
  {
    category: 'camera',
    problem: 'Foutmelding "Cannot enlarge memory arrays"',
    cause: 'Verouderde AR.js versie met .patt pattern markers bug.',
    solution:
      'In deze workshop gebruiken we daarom stabiele AR.js 2.1.4 met ingebouwde 3x3 barcode markers (<a-marker type="barcode" value="X">). Controleer of je de standaard script-tags niet per ongeluk hebt aangepast.',
  },
  {
    category: 'mqtt',
    problem: 'Statusbalk blijft hangen op "MQTT: Verbinden..."',
    cause: 'Het bestand js/mqttws31.min.js ontbreekt of is niet in de submap js geplaatst.',
    solution:
      'Druk op F12 op je laptop en bekijk de Console. Zie je "Paho is not defined"? Zorg dat de map js/ met daarin mqttws31.min.js in dezelfde map staat als je HTML-bestand (ook op GitHub!).',
  },
  {
    category: 'mqtt',
    problem: 'Statusbalk toont "MQTT: Verbinding mislukt"',
    cause: 'Brokeradres verkeerd gespeld of schoolbroker niet bereikbaar buiten schoolwifi.',
    solution:
      'Zit je thuis? Gebruik de publieke broker wss://broker.emqx.io:8084/mqtt. Zit je op school en gebruik je de NUC? Zorg dat je laptop en smartphone op dezelfde school-wifi zitten.',
  },
  {
    category: 'mqtt',
    problem: 'Waarde in het paneel verandert niet als ik zend',
    cause: 'Topicnaam in MQTTBox komt niet overeen met het geabonneerde topic in de app.',
    solution:
      'Kijk naar de titel van het paneel linksboven: dat is exact het topic waarop jouw app luistert! Vul in MQTTBox exact datzelfde topic in.',
  },
  {
    category: 'github',
    problem: 'GitHub Pages geeft een 404 (File not found)',
    cause: 'Verkeerde bestandsnaam in de URL of GitHub is nog bezig met publiceren.',
    solution:
      'Let op hoofdletters! /AR1.html is niet hetzelfde als /ar1.html. Wacht daarnaast bij de allereerste keer 1 tot 3 minuten tot de oranje bol bij Actions groen wordt.',
  },
  {
    category: 'github',
    problem: 'Mijn nieuwe code verschijnt niet op de smartphone (oude versie blijft)',
    cause: 'De browser op je smartphone bewaart de oude pagina in zijn cachegeheugen.',
    solution:
      'Veeg omlaag om hard te verversen, of zet "?v=2" (of "?v=3") achteraan in de adresbalk van je telefoon om de nieuwste code direct af te dwingen!',
  },
  {
    category: 'pi',
    problem: 'LEDs op de Sense HAT reageren niet op de knoppen',
    cause: 'Node-RED flow luistert op een ander topic of ontvangt geen geldige "R,G,B" string.',
    solution:
      'Test eerst handmatig via MQTTBox door "0,255,0" te sturen naar workshop/<jouw-groep>/led. Gaan de lampjes dan wél branden? Dan zit de fout in je JavaScript knoppenkoppeling.',
  },
  {
    category: 'pi',
    problem: 'Foutmelding "Cannot read properties of null" in de console (F12)',
    cause: 'Typfout in een getElementById naam.',
    solution:
      'Als je document.getElementById("stap4-tekst") aanroept maar je HTML heet per ongeluk id="stap4tekst" (zonder streepje), kan JavaScript het element niet vinden en krijg je null!',
  },
];

export const TroubleshootModal: React.FC<TroubleshootModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'camera' | 'mqtt' | 'github' | 'pi'>('all');

  if (!isOpen) return null;

  const filteredIssues = filter === 'all' ? ISSUES : ISSUES.filter((i) => i.category === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border border-[#b5e2fa] w-full max-w-4xl rounded-3xl shadow-2xl p-6 sm:p-8 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#f7a072]/20 text-[#f7a072] flex items-center justify-center text-xl border border-[#f7a072]/40">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                EHBO &amp; Problemen Oplossen
              </h2>
              <p className="text-xs text-slate-500">
                Werkt er iets niet direct zoals verwacht? Vind hier razendsnel de oplossing!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {[
            { id: 'all', label: 'Alle problemen' },
            { id: 'camera', label: 'Camera & AR' },
            { id: 'mqtt', label: 'MQTT Verbinding' },
            { id: 'github', label: 'GitHub Pages & Cache' },
            { id: 'pi', label: 'Raspberry Pi & Node-RED' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#0fa3b1] text-white shadow-xs'
                  : 'bg-[#f9f7f3] text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Issue Cards */}
        <div className="mt-4 space-y-3 overflow-y-auto pr-1 flex-1">
          {filteredIssues.map((issue, idx) => (
            <div
              key={idx}
              className="bg-[#f9f7f3] border border-slate-200 rounded-2xl p-4 space-y-2 hover:border-[#0fa3b1]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f7a072]" />
                  {issue.problem}
                </span>
                <span className="text-[10px] font-mono uppercase bg-white px-2 py-0.5 rounded-md text-slate-500 border border-slate-200">
                  {issue.category}
                </span>
              </div>
              <div className="text-xs text-slate-600">
                <strong className="text-slate-800">Mogelijke oorzaak:</strong> {issue.cause}
              </div>
              <div className="text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-800">Oplossing:</strong> {issue.solution}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Gouden regel: Open de console met F12 op je laptop om foutmeldingen direct te zien!</span>
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
