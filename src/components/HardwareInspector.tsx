import React, { useState } from 'react';
import { SUBSYSTEMS } from '../data/chandrayaanData';
import { ShieldCheck, Cpu, Zap, Radio, Compass, Wrench, Layers } from 'lucide-react';

export const HardwareInspector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Vikram Lander' | 'Pragyan Rover' | 'LVM3 Rocket'>('All');
  const [activeSubsystemId, setActiveSubsystemId] = useState<string>(SUBSYSTEMS[0].id);

  const filteredSubsystems =
    selectedCategory === 'All'
      ? SUBSYSTEMS
      : SUBSYSTEMS.filter((s) => s.category === selectedCategory);

  const activeSubsystem = SUBSYSTEMS.find((s) => s.id === activeSubsystemId) || SUBSYSTEMS[0];

  return (
    <div id="hardware" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
          <span>Indigenous Spacecraft Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Failure-Based Design Philosophy</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-tech text-white">
          Lander & Rover Hardware Subsystems
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-3xl leading-relaxed">
          Following Chandrayaan-2, ISRO shifted from a "success-based" architecture to a "failure-based" architecture.
          Every subsystem was re-engineered with redundant sensors, larger fuel margins, strengthened legs, and expanded
          hazard tolerance to guarantee landing success.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['All', 'Vikram Lander', 'Pragyan Rover', 'LVM3 Rocket'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              const firstMatching = cat === 'All' ? SUBSYSTEMS[0] : SUBSYSTEMS.find((s) => s.category === cat);
              if (firstMatching) setActiveSubsystemId(firstMatching.id);
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Subsystem Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Subsystem List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredSubsystems.map((sub) => {
            const isSelected = sub.id === activeSubsystem.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubsystemId(sub.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-lg shadow-amber-950/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span className="text-amber-400 font-semibold">{sub.category}</span>
                </div>
                <div className="text-base font-semibold text-white">{sub.name}</div>
                <p className="mt-1 text-xs text-slate-400 line-clamp-1">{sub.role}</p>
              </button>
            );
          })}
        </div>

        {/* Detailed Spec Inspection Card */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              {activeSubsystem.category}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-tech text-white mt-1">
              {activeSubsystem.name}
            </h3>
            <p className="text-sm font-medium text-slate-300 mt-1">{activeSubsystem.role}</p>
          </div>

          {/* Technical Specifications Matrix */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Technical Parameters</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeSubsystem.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-lg flex flex-col justify-between"
                >
                  <span className="text-[11px] font-mono text-slate-400">{spec.label}</span>
                  <span className="text-sm font-semibold font-mono text-slate-100 mt-0.5 tabular-nums">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Mechanism Details */}
          <div className="space-y-4">
            <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-lg">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Architecture & Failure-Tolerant Features</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{activeSubsystem.techDetails}</p>
            </div>

            <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-lg">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Mission Impact & Ground-Truth Verification</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{activeSubsystem.historicalSignificance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
