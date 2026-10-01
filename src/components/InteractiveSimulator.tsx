import React, { useState, useEffect } from 'react';
import { Camera, Radio, Send, RefreshCw, Eye, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

interface InteractiveSimulatorProps {
  initialMarker?: number;
}

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({ initialMarker = 1 }) => {
  const [activeMarker, setActiveMarker] = useState<number>(initialMarker);
  const [marker2Color, setMarker2Color] = useState<string>('#808080');
  const [sensorPayload, setSensorPayload] = useState<string>('21.5');
  const [sliderTemp, setSliderTemp] = useState<number>(21.5);
  const [mqttStatus, setMqttStatus] = useState<'connected' | 'connecting' | 'error'>('connected');
  const [groupId, setGroupId] = useState<string>('AR1');
  const [piLedColor, setPiLedColor] = useState<string>('#000000');
  const [mqttLogs, setMqttLogs] = useState<Array<{ time: string; topic: string; msg: string; direction: 'in' | 'out' }>>([
    { time: '10:00:01', topic: 'workshop/AR1/sensorData', msg: '21.5', direction: 'in' },
  ]);

  // Sync initial marker if passed
  useEffect(() => {
    setActiveMarker(initialMarker);
  }, [initialMarker]);

  // Threshold logic for Step 5:
  // < 22: groen (#00ff00)
  // > 27: rood (#ff0000)
  // tussenin: geel (#ffff00)
  const computeStep5Color = (valStr: string) => {
    const num = parseFloat(valStr);
    if (isNaN(num)) return '#00ff00'; // fallback
    if (num < 22) return '#00ff00';
    if (num > 27) return '#ff0000';
    return '#ffff00';
  };

  const block4Color = computeStep5Color(sensorPayload);

  const handleSendSensorData = (val: string) => {
    setSensorPayload(val);
    const timeStr = new Date().toTimeString().split(' ')[0];
    setMqttLogs((prev) => [
      { time: timeStr, topic: `workshop/${groupId}/sensorData`, msg: val, direction: 'in' },
      ...prev.slice(0, 9),
    ]);
  };

  const handleButtonClick = (colorName: 'GROEN' | 'ROOD') => {
    const hex = colorName === 'GROEN' ? '#00ff00' : '#ff0000';
    const rgbStr = colorName === 'GROEN' ? '0,255,0' : '255,0,0';
    setMarker2Color(hex);
    setPiLedColor(hex);

    const timeStr = new Date().toTimeString().split(' ')[0];
    setMqttLogs((prev) => [
      { time: timeStr, topic: `workshop/${groupId}/led`, msg: rgbStr, direction: 'out' },
      ...prev.slice(0, 9),
    ]);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Simulator Top Bar */}
      <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Virtuele WebAR &amp; IoT Testomgeving
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            · Real-time A-Frame &amp; MQTT simulatie
          </span>
        </div>

        {/* Marker Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 px-2 font-medium">Houd voor camera:</span>
          {[1, 2, 4].map((mNum) => (
            <button
              key={mNum}
              onClick={() => setActiveMarker(mNum)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeMarker === mNum
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Marker {mNum}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Main AR Camera Viewport (Left/Center: 8 cols) */}
        <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[440px] bg-slate-900 overflow-hidden flex items-center justify-center select-none">
          {/* Simulated webcam room environment texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 opacity-90" />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* 2D SCREEN OVERLAY (Matches what students build in Steps 2 & 3) */}
          {/* Step 3: Status Bar */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black/85 text-cyan-400 px-4 py-1.5 rounded-full text-xs font-bold border border-cyan-500/30 shadow-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>MQTT: Verbonden ({groupId})</span>
          </div>

          {/* Step 3: Sensor Panel */}
          <div className="absolute top-12 left-3 z-20 bg-black/80 text-white p-3 rounded-xl border-l-4 border-cyan-400 text-xs shadow-xl max-w-[220px]">
            <div className="font-bold text-cyan-400 text-[11px] truncate font-mono">
              workshop/{groupId}/sensorData
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[11px] text-slate-300">Waarde:</span>
              <span className="text-xl font-bold font-mono text-white">{sensorPayload}</span>
            </div>
          </div>

          {/* Step 2: Controls Buttons (GROEN / ROOD) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            <button
              onClick={() => handleButtonClick('GROEN')}
              className="bg-[#00aa00] hover:bg-[#00cc00] active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg transition-transform cursor-pointer border border-emerald-400/40"
            >
              GROEN
            </button>
            <button
              onClick={() => handleButtonClick('ROOD')}
              className="bg-[#cc0000] hover:bg-[#ee0000] active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-lg transition-transform cursor-pointer border border-rose-400/40"
            >
              ROOD
            </button>
          </div>

          {/* 3D AR SCENE STAGE (Simulating camera tracking of the active marker) */}
          <div className="relative z-10 flex flex-col items-center justify-center p-6">
            {/* The physical marker print on the table (perspective) */}
            <div
              className="relative w-48 h-48 bg-white rounded-lg p-2.5 shadow-2xl border-2 border-slate-700 transition-transform duration-300"
              style={{
                transform: 'perspective(600px) rotateX(48deg) rotateZ(-2deg)',
              }}
            >
              {/* Barcode visual border */}
              <div className="w-full h-full bg-black p-4 rounded flex items-center justify-center">
                <div className="grid grid-cols-3 gap-1 w-full h-full bg-black p-1">
                  {/* Visual 3x3 pattern representation */}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (activeMarker === 1 && (i === 4 || i === 7)) ||
                        (activeMarker === 2 && (i === 2 || i === 4 || i === 7 || i === 8)) ||
                        (activeMarker === 4 && (i === 1 || i === 4 || i === 7))
                          ? 'bg-white'
                          : 'bg-black'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Marker Label Tag */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-slate-900/90 text-[10px] text-cyan-300 font-mono px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap">
                Barcode Marker {activeMarker} (op tafel)
              </div>
            </div>

            {/* VIRTUAL 3D OBJECTS FLOATING ABOVE THE MARKER */}
            <div className="absolute -translate-y-16 pointer-events-none">
              {/* MARKER 1: Box & Sphere */}
              {activeMarker === 1 && (
                <div className="flex items-center gap-6 animate-bounce duration-1000">
                  {/* Box (Orange) */}
                  <div className="relative w-16 h-16 bg-[#ff6600] rounded-sm shadow-2xl transform rotate-12 border border-amber-300/40 flex items-center justify-center text-[10px] font-bold text-white shadow-orange-500/40">
                    &lt;a-box&gt;
                  </div>
                  {/* Sphere (Cyan) */}
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-600 to-cyan-300 shadow-2xl border border-cyan-200/50 flex items-center justify-center text-[9px] font-bold text-black shadow-cyan-500/50">
                    &lt;sphere&gt;
                  </div>
                </div>
              )}

              {/* MARKER 2: Interactive Color Changing Cube */}
              {activeMarker === 2 && (
                <div className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 rounded-md shadow-2xl flex flex-col items-center justify-center text-xs font-bold text-white transition-colors duration-300 border border-white/20"
                    style={{
                      backgroundColor: marker2Color,
                      boxShadow: `0 10px 30px ${marker2Color}66`,
                    }}
                  >
                    <span>#stap2-kubus</span>
                    <span className="text-[10px] opacity-80">{marker2Color}</span>
                  </div>
                  <span className="mt-2 text-[10px] font-semibold text-slate-300 bg-black/60 px-2 py-0.5 rounded-full">
                    Klik GROEN of ROOD onderin!
                  </span>
                </div>
              )}

              {/* MARKER 4: Live MQTT Sensor Data Block */}
              {activeMarker === 4 && (
                <div className="flex flex-col items-center animate-pulse duration-1000">
                  <div
                    className="relative w-24 h-24 rounded-lg shadow-2xl flex flex-col items-center justify-center transition-colors duration-300 border-2 border-white/40"
                    style={{
                      backgroundColor: block4Color,
                      boxShadow: `0 15px 35px ${block4Color}88`,
                    }}
                  >
                    {/* The 3D text on position z=0.51 */}
                    <div className="text-black font-extrabold text-2xl font-mono tracking-wider drop-shadow-sm">
                      {sensorPayload}
                    </div>
                    <span className="text-[10px] text-black font-bold uppercase tracking-tight mt-0.5">
                      #stap4-tekst
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] font-semibold text-slate-200 bg-black/70 px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1.5">
                    <span>Drempelstatus:</span>
                    <span
                      className="font-bold uppercase"
                      style={{ color: block4Color }}
                    >
                      {parseFloat(sensorPayload) < 22
                        ? 'GROEN (<22)'
                        : parseFloat(sensorPayload) > 27
                        ? 'ROOD (>27)'
                        : 'GEEL (22-27)'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Hardware & MQTT Controls (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950 p-4 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-4">
          {/* Virtual Raspberry Pi Sense HAT 8x8 Matrix Display */}
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>🍓</span> Raspberry Pi Sense HAT
              </span>
              <span className="text-[10px] font-mono text-cyan-400">8x8 RGB LEDs</span>
            </div>

            {/* 8x8 Grid of 64 RGB pixels */}
            <div className="bg-black p-2.5 rounded-lg border border-slate-800 grid grid-cols-8 gap-1 aspect-square max-w-[170px] mx-auto">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xs transition-colors duration-200"
                  style={{
                    backgroundColor: piLedColor === '#000000' ? '#222' : piLedColor,
                    boxShadow:
                      piLedColor !== '#000000' ? `0 0 6px ${piLedColor}` : 'none',
                  }}
                />
              ))}
            </div>

            <div className="mt-2 text-[11px] text-center text-slate-400">
              LED status: <span className="font-mono text-white font-bold">{piLedColor === '#000000' ? 'Uit (klik een knop)' : piLedColor}</span>
            </div>
          </div>

          {/* MQTT Test Console (Simulates sending sensor data) */}
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400" /> MQTT Sensor Injector
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Simuleer Pi</span>
            </div>

            <div className="space-y-2.5">
              {/* Slider for live temperature */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                  <span>Temperatuur:</span>
                  <span className="text-cyan-400 font-mono font-bold">{sliderTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="33"
                  step="0.5"
                  value={sliderTemp}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSliderTemp(val);
                    handleSendSensorData(val.toString());
                  }}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  onClick={() => {
                    setSliderTemp(18.5);
                    handleSendSensorData('18.5');
                  }}
                  className="px-2 py-1 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/40 text-emerald-300 rounded text-[11px] font-bold cursor-pointer"
                >
                  18.5 (Grn)
                </button>
                <button
                  onClick={() => {
                    setSliderTemp(24.0);
                    handleSendSensorData('24.0');
                  }}
                  className="px-2 py-1 bg-yellow-950/60 hover:bg-yellow-900/80 border border-yellow-600/40 text-yellow-300 rounded text-[11px] font-bold cursor-pointer"
                >
                  24.0 (Gel)
                </button>
                <button
                  onClick={() => {
                    setSliderTemp(29.5);
                    handleSendSensorData('29.5');
                  }}
                  className="px-2 py-1 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-600/40 text-rose-300 rounded text-[11px] font-bold cursor-pointer"
                >
                  29.5 (Rd)
                </button>
                <button
                  onClick={() => handleSendSensorData('hallo')}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded text-[11px] font-mono cursor-pointer"
                  title="Test isNaN check"
                >
                  "hallo"
                </button>
              </div>
            </div>
          </div>

          {/* Live MQTT Packet Log */}
          <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800/80 font-mono text-[10px]">
            <div className="text-slate-400 font-bold mb-1 flex items-center justify-between">
              <span>MQTT LIVE LOGS</span>
              <span className="text-[9px] text-cyan-400">topic: workshop/{groupId}/*</span>
            </div>
            <div className="max-h-20 overflow-y-auto space-y-1">
              {mqttLogs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                  <span className={log.direction === 'in' ? 'text-emerald-400' : 'text-cyan-400'}>
                    {log.direction === 'in' ? '▼ IN' : '▲ OUT'}
                  </span>
                  <span className="text-slate-500">{log.time}</span>
                  <span className="text-slate-400 truncate">{log.topic.split('/').pop()}</span>
                  <span className="text-white font-bold ml-auto">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
