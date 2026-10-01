import React, { useState } from 'react';
import { Sliders, PlusCircle } from 'lucide-react';

export const Opdracht1MiniViewer: React.FC = () => {
  const [cubeColor, setCubeColor] = useState<string>('#ff6600');
  const [posX, setPosX] = useState<number>(-0.4);
  const [posY, setPosY] = useState<number>(0.4);
  const [posZ, setPosZ] = useState<number>(0);
  const [hasSphere, setHasSphere] = useState<boolean>(false);
  const [sphereColor, setSphereColor] = useState<string>('#00ffff');
  const [sphereRadius, setSphereRadius] = useState<number>(0.3);

  return (
    <div className="bg-white border border-[#b5e2fa] rounded-3xl overflow-hidden shadow-sm mb-6">
      {/* Header */}
      <div className="bg-[#f9f7f3] px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f7a072] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Opdracht 1 Visualizer: Alléén Marker 1 &amp; Je Eerste 3D-Objecten
          </span>
        </div>
        <span className="text-[11px] text-[#0fa3b1] font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200">
          &lt;a-box position="{posX} {posY} {posZ}" color="{cubeColor}"&gt;
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* 3D AR Camera stage showing ONLY marker 1 and the cube/sphere */}
        <div className="md:col-span-7 relative min-h-[300px] bg-[#18232c] flex items-center justify-center p-6 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#18232c] to-[#0f171e] opacity-95" />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(#b5e2fa 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Physical Barcode Marker 1 on desk */}
          <div
            className="relative w-44 h-44 bg-white rounded-xl p-2.5 shadow-2xl border-2 border-slate-600"
            style={{ transform: 'perspective(500px) rotateX(46deg)' }}
          >
            <div className="w-full h-full bg-black p-3 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-3 gap-1 w-full h-full bg-black p-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${i === 4 || i === 7 ? 'bg-white' : 'bg-black'}`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-[10px] text-slate-900 font-mono font-bold px-2 py-0.5 rounded-md border border-slate-300 shadow-xs whitespace-nowrap">
              Barcode Marker 1
            </div>
          </div>

          {/* Floating Objects above marker 1 */}
          <div
            className="absolute transition-all duration-200 flex items-center gap-4 pointer-events-none"
            style={{
              transform: `translate(${posX * 70}px, ${-posY * 70}px) scale(${1 + posZ * 0.2})`,
            }}
          >
            {/* The First Cube */}
            <div
              className="relative w-16 h-16 rounded-sm shadow-2xl flex flex-col items-center justify-center text-[10px] font-bold text-white transition-colors duration-200"
              style={{
                backgroundColor: cubeColor,
                boxShadow: `0 10px 25px ${cubeColor}66`,
              }}
            >
              <span>&lt;a-box&gt;</span>
              <span className="text-[9px] opacity-80">{cubeColor}</span>
            </div>

            {/* Optional Second Sphere */}
            {hasSphere && (
              <div
                className="relative rounded-full shadow-2xl flex items-center justify-center text-[9px] font-bold text-black transition-all duration-300"
                style={{
                  width: `${sphereRadius * 80}px`,
                  height: `${sphereRadius * 80}px`,
                  backgroundColor: sphereColor,
                  boxShadow: `0 10px 25px ${sphereColor}66`,
                }}
              >
                &lt;sphere&gt;
              </div>
            )}
          </div>
        </div>

        {/* Right Interactive Sliders */}
        <div className="md:col-span-5 bg-[#f9f7f3] p-5 border-t md:border-t-0 md:border-l border-slate-200 space-y-4 text-xs">
          <div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#0fa3b1]" />
              <span>Begrijp Positie X Y Z (Live Test)</span>
            </div>

            {/* X Slider */}
            <div className="space-y-1 mb-2">
              <div className="flex justify-between text-slate-600">
                <span>X (links / rechts):</span>
                <span className="font-mono text-[#0fa3b1] font-bold">{posX}</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                step="0.1"
                value={posX}
                onChange={(e) => setPosX(parseFloat(e.target.value))}
                className="w-full accent-[#0fa3b1] cursor-pointer h-1.5 bg-slate-200 rounded"
              />
            </div>

            {/* Y Slider */}
            <div className="space-y-1 mb-2">
              <div className="flex justify-between text-slate-600">
                <span>Y (hoogte boven marker):</span>
                <span className="font-mono text-[#f7a072] font-bold">{posY}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.1"
                value={posY}
                onChange={(e) => setPosY(parseFloat(e.target.value))}
                className="w-full accent-[#f7a072] cursor-pointer h-1.5 bg-slate-200 rounded"
              />
            </div>

            {/* Color Selector */}
            <div className="space-y-1 pt-2 border-t border-slate-200">
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Kleur van de kubus:</span>
                <span className="font-mono text-slate-900 font-bold">{cubeColor}</span>
              </div>
              <div className="flex gap-2">
                {['#ff6600', '#0fa3b1', '#f7a072', '#39ff14', '#9d4edd'].map((col) => (
                  <button
                    key={col}
                    onClick={() => setCubeColor(col)}
                    className="w-6 h-6 rounded-full border border-slate-300 transition-transform hover:scale-110 cursor-pointer shadow-xs"
                    style={{ backgroundColor: col }}
                    title={col}
                  />
                ))}
              </div>
            </div>

            {/* Add Sphere Toggle */}
            <div className="pt-3 border-t border-slate-200">
              <label className="flex items-center justify-between text-slate-800 cursor-pointer font-bold">
                <span className="flex items-center gap-1.5">
                  <PlusCircle className="w-3.5 h-3.5 text-[#0fa3b1]" />
                  <span>Tweede vorm toevoegen (&lt;a-sphere&gt;)</span>
                </span>
                <input
                  type="checkbox"
                  checked={hasSphere}
                  onChange={(e) => setHasSphere(e.target.checked)}
                  className="rounded accent-[#0fa3b1] w-4 h-4 cursor-pointer"
                />
              </label>

              {hasSphere && (
                <div className="mt-2 space-y-2 pl-2 border-l-2 border-[#0fa3b1] animate-in fade-in">
                  <div className="flex justify-between text-slate-600">
                    <span>Straal van bol (radius):</span>
                    <span className="font-mono text-[#0fa3b1] font-bold">{sphereRadius}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.6"
                    step="0.05"
                    value={sphereRadius}
                    onChange={(e) => setSphereRadius(parseFloat(e.target.value))}
                    className="w-full accent-[#0fa3b1] cursor-pointer h-1.5 bg-slate-200 rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
