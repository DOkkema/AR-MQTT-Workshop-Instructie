import React from 'react';
import { Printer, X, Info } from 'lucide-react';

interface BarcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MarkerData {
  id: number;
  label: string;
  usage: string;
  grid: number[][]; // 5x5 total: 1-cell black border, inner 3x3
}

const MARKERS: MarkerData[] = [
  {
    id: 1,
    label: 'Marker 1 (value="1")',
    usage: 'Opdracht 1: Projectie van kubus & bol',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  },
  {
    id: 2,
    label: 'Marker 2 (value="2")',
    usage: 'Opdracht 2 & 6: Interactieve kubus (knoppen)',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  },
  {
    id: 3,
    label: 'Marker 3 (value="3")',
    usage: 'Reserve marker / Vrije invulling',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  },
  {
    id: 4,
    label: 'Marker 4 (value="4")',
    usage: 'Opdracht 4 & 5: Live MQTT temperatuurblok & drempelkleuren',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  },
  {
    id: 5,
    label: 'Marker 5 (value="5")',
    usage: 'Opdracht 7: Slotopdracht / Extra sensordata',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],
    ],
  },
];

export const BarcodeModal: React.FC<BarcodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border border-[#b5e2fa] w-full max-w-4xl rounded-3xl shadow-2xl p-6 sm:p-8 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#0fa3b1]">🏁</span> Barcode Markers (1 t/m 5)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Print deze markers op mat papier of houd ze op je scherm voor de camera (10–20 cm afstand).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#0fa3b1] hover:bg-[#0fa3b1]/90 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Sheet</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Print instructions banner */}
        <div className="mt-4 p-4 bg-[#b5e2fa]/25 border border-[#b5e2fa] rounded-2xl text-xs text-[#0fa3b1] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#0fa3b1] shrink-0 mt-0.5" />
          <div className="text-slate-700">
            <strong className="text-[#0fa3b1]">Tips voor beste herkenning:</strong> Print op mat wit papier
            (geen glanspapier i.v.m. reflectie). Knip ruim rondom de zwarte rand uit. Houd de marker vlak voor de lens
            op 10 tot 25 centimeter afstand met helder omgevingslicht.
          </div>
        </div>

        {/* Markers Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-1">
          {MARKERS.map((m) => (
            <div
              key={m.id}
              className="bg-[#f9f7f3] border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs hover:border-[#0fa3b1]/50 transition-colors"
            >
              {/* Crisp SVG Barcode Marker */}
              <div className="p-3 bg-white rounded-xl shadow-inner border border-slate-200">
                <svg
                  viewBox="0 0 5 5"
                  className="w-44 h-44 shape-rendering-crispEdges"
                  style={{ imageRendering: 'pixelated' }}
                >
                  {m.grid.map((row, rIdx) =>
                    row.map((cell, cIdx) => (
                      <rect
                        key={`${rIdx}-${cIdx}`}
                        x={cIdx}
                        y={rIdx}
                        width="1"
                        height="1"
                        fill={cell === 0 ? '#000000' : '#ffffff'}
                      />
                    ))
                  )}
                </svg>
              </div>

              <div className="mt-3">
                <div className="text-sm font-bold text-slate-900">{m.label}</div>
                <div className="text-xs text-[#0fa3b1] font-mono font-semibold mt-0.5">{m.usage}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  matrixCodeType: 3x3 · barcode value="{m.id}"
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Stabiele AR.js 2.1.4 barcode matrix detectie</span>
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
