import React from 'react';
import { Film, Palette, Video, Sparkles, HeartHandshake } from 'lucide-react';

export const DirectorNotes: React.FC = () => {
  return (
    <div id="directornotes" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
          <span>Cinematography & Documentary Direction</span>
          <span aria-hidden="true">·</span>
          <span>Director's Vision</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-tech text-white">
          Visual Language: Lighting, Motion & Cinematic Pacing
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-3xl leading-relaxed">
          The 20-second documentary structure was designed to mirror the emotional journey of the mission:
          grounded human awe in golden dawn light, followed by the silent tension of lunar descent, culminating
          in the triumph of the Tricolour against the blue marble of Earth.
        </p>
      </div>

      {/* Visual Contrast Grid: Warm Earth vs Cold Moon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Earth Palette */}
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Earth Sequence (0:00 - 0:06)</span>
            <span className="text-xs font-mono text-slate-400">Warm Golden Grade</span>
          </div>
          <h3 className="text-lg font-bold font-tech text-white">Sriharikota Dawn & Blazing Exhaust</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Framed at dawn as sunlight glances across the Bay of Bengal. The color timing utilizes rich amber and golden-orange
            tones for the LVM3 twin solid booster exhaust, contrasting with deep silhouetted spectators in the foreground
            to ground the immense human scale of India's space program.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <div className="h-6 flex-1 rounded bg-[#ff8c00]" title="Exhaust Orange" />
            <div className="h-6 flex-1 rounded bg-[#ffd700]" title="Sunrise Gold" />
            <div className="h-6 flex-1 rounded bg-[#2a1705]" title="Crowd Silhouette" />
          </div>
        </div>

        {/* Moon Palette */}
        <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Moon Sequence (0:06 - 0:20)</span>
            <span className="text-xs font-mono text-slate-400">Cold Silver-Blue Grade</span>
          </div>
          <h3 className="text-lg font-bold font-tech text-white">Polar Vacuum & Regolith Dust</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            A deliberate shift to cold silver-blue monochrome grading emphasizes the harsh vacuum of the lunar south pole.
            Deep shadows in the craters create high geometric drama, punctuated by the soft grey regolith dust kicked up
            by Vikram's thrusters and the radiant blue hue of Earth.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <div className="h-6 flex-1 rounded bg-[#94a3b8]" title="Lunar Silver" />
            <div className="h-6 flex-1 rounded bg-[#0f172a]" title="Crater Void" />
            <div className="h-6 flex-1 rounded bg-[#38bdf8]" title="Earth Blue" />
          </div>
        </div>
      </div>

      {/* Mission Control Archival Shot */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Documentary Archival Reference
            </span>
            <h3 className="text-xl font-bold font-tech text-white mt-0.5">
              The Climax at ISTRAC Bengaluru (18:04 IST)
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 self-start sm:self-center">
            Historic Soft Landing Confirmed
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-800 bg-black aspect-video">
            <img
              src="/src/assets/images/isro_mission_control_1793519394636.jpg"
              alt="ISRO Mission Control celebration at ISTRAC Bengaluru"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              At 18:04 IST on August 23, 2023, mission control erupted in tears, cheers, and applause as Vikram transmitted
              its final telemetry beacon confirming zero vertical velocity on the lunar soil.
            </p>
            <blockquote className="border-l-2 border-amber-400 pl-3 py-1 text-sm italic text-amber-200">
              "India is on the Moon. We have achieved a soft landing on the south pole of the Moon.
              This success belongs to all of humanity."
            </blockquote>
            <div className="text-xs font-mono text-slate-400 pt-1">
              — S. Somanath, Chairman, Indian Space Research Organisation (ISRO)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
