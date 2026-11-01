import React, { useState } from 'react';
import { DESCENT_PHASES, MISSION_METRICS } from '../data/chandrayaanData';
import { Compass, Gauge, AlertCircle, ArrowDown, Activity, CheckCircle2 } from 'lucide-react';

export const MissionTelemetry: React.FC = () => {
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState<number>(0);
  const activePhase = DESCENT_PHASES[selectedPhaseIdx];

  // 40-day trajectory stages
  const trajectoryMilestones = [
    { date: '14 July 2023', stage: 'Launch', desc: 'LVM3 liftoff from Sriharikota into 170x36,500 km elliptical orbit' },
    { date: '15-25 July', stage: 'Earth Bound Maneuvers', desc: '5 consecutive apogee-raising orbital engine burns' },
    { date: '1 August 2023', stage: 'Trans-Lunar Injection (TLI)', desc: 'Spacecraft injected into lunar transfer trajectory' },
    { date: '5 August 2023', stage: 'Lunar Orbit Insertion (LOI)', desc: 'Captured into lunar orbit (164x18,074 km)' },
    { date: '6-16 August', stage: 'Orbit Reduction', desc: 'Gradually circularized orbit to 153x163 km, then 100x100 km' },
    { date: '17 August 2023', stage: 'Lander Separation', desc: 'Vikram Lander Module separates cleanly from Propulsion Module' },
    { date: '18-20 August', stage: 'De-Boosting', desc: 'Perilune reduced to 25 km; final checkout of guidance sensors' },
    { date: '23 August 2023', stage: 'Powered Descent & Landing', desc: 'Soft touchdown at Shiv Shakti Point, Lunar South Pole' },
  ];

  return (
    <div id="telemetry" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
          <span>Flight Dynamics & Guidance Navigation Control</span>
          <span aria-hidden="true">·</span>
          <span>Powered Descent Profile</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-tech text-white">
          The "15 Minutes of Terror": Powered Descent Phase
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-3xl leading-relaxed">
          On August 23, 2023, Vikram executed a completely autonomous descent from 30 km orbital altitude down to the
          boulder-strewn lunar south pole regolith without human intervention, overcoming the failure modes of Chandrayaan-2.
        </p>
      </div>

      {/* Interactive 4-Phase Descent Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Phase Selector Accordion / Tabs */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
            Descent Timeline Sequence
          </div>

          {DESCENT_PHASES.map((p, idx) => {
            const isSelected = selectedPhaseIdx === idx;
            return (
              <button
                key={p.phase}
                onClick={() => setSelectedPhaseIdx(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-cyan-950/30 border-cyan-500/50 text-white shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Phase 0{idx + 1}
                  </span>
                  <span className="tabular-nums">{p.duration}</span>
                </div>
                <div className="text-base font-semibold text-white">{p.phase}</div>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>Alt: {p.altitudeRange}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep Telemetry Inspection Console */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Active Simulation Step
                </span>
                <h3 className="text-xl font-bold font-tech text-white mt-0.5">{activePhase.phase}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">Duration</span>
                <div className="text-sm font-mono font-bold text-amber-400">{activePhase.duration}</div>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-lg">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Altitude Window</div>
                <div className="text-base sm:text-lg font-bold font-mono text-cyan-300 mt-1 tabular-nums">
                  {activePhase.altitudeRange}
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-lg">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Velocity Shedding</div>
                <div className="text-sm sm:text-base font-bold font-mono text-amber-300 mt-1 tabular-nums">
                  {activePhase.horizontalVelocity}
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-lg">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Engine State</div>
                <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-1">
                  {selectedPhaseIdx === 3 ? 'Terminal Cushion' : '4x 800N Throttle'}
                </div>
              </div>
            </div>

            {/* Detailed Engineering Explanation */}
            <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-lg">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Autonomous Flight Guidance Logic</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{activePhase.description}</p>
            </div>
          </div>

          {/* Graphical Descent Slope Representation */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex justify-between">
              <span>Descent Trajectory Profile (30km to Surface)</span>
              <span className="text-cyan-400 font-mono">Telemetry: Nominal</span>
            </div>
            <div className="relative h-24 w-full bg-slate-950/90 rounded-lg border border-slate-800 p-3 overflow-hidden">
              {/* Horizontal altitude gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none opacity-20">
                <div className="border-b border-dashed border-cyan-300" />
                <div className="border-b border-dashed border-cyan-300" />
                <div className="border-b border-dashed border-cyan-300" />
              </div>

              {/* SVG Curve */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 60" preserveAspectRatio="none">
                <path
                  d="M 10 10 Q 150 15 220 32 T 340 50 L 380 54"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                {/* Active Phase Marker */}
                <circle
                  cx={selectedPhaseIdx === 0 ? 50 : selectedPhaseIdx === 1 ? 160 : selectedPhaseIdx === 2 ? 260 : 370}
                  cy={selectedPhaseIdx === 0 ? 12 : selectedPhaseIdx === 1 ? 18 : selectedPhaseIdx === 2 ? 38 : 53}
                  r="5"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </svg>

              <div className="absolute bottom-1 right-2 text-[10px] font-mono text-amber-400">
                Shiv Shakti Point (Touchdown 18:04 IST)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 40-Day Mission Trajectory Roadmap */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
        <div>
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            Earth-To-Moon Journey Timeline
          </div>
          <h3 className="text-xl font-bold font-tech text-white mt-1">
            40-Day Trajectory: The Gravity-Assist Slingshot
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Instead of burning enormous quantities of propellant on direct trans-lunar injection, ISRO utilized an
            exceptionally fuel-efficient slingshot series of Earth-bound orbital burns to leverage Earth's gravitational assist.
          </p>
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trajectoryMilestones.map((m, i) => (
            <div
              key={m.stage}
              className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg space-y-1.5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-400 font-semibold">{m.date}</span>
                <span className="text-slate-500">Step 0{i + 1}</span>
              </div>
              <div className="text-sm font-semibold text-white">{m.stage}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
