import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { CinematicPlayer } from './components/CinematicPlayer';
import { MissionTelemetry } from './components/MissionTelemetry';
import { HardwareInspector } from './components/HardwareInspector';
import { BudgetEngineering } from './components/BudgetEngineering';
import { ScienceDiscoveries } from './components/ScienceDiscoveries';
import { DirectorNotes } from './components/DirectorNotes';
import { Compass, Film, Layers, Award, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('player');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayNow = () => {
    scrollToSection('player');
    const playBtn = document.querySelector('button[aria-label="Play 20-Second Clip"]') as HTMLButtonElement | null;
    if (playBtn) {
      playBtn.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar adhering to the 3-Zone Contract */}
      <TopBar
        onPlayClick={handlePlayNow}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 space-y-12 pb-20">
        {/* Master 20-Second Cinematic Documentary Player */}
        <CinematicPlayer />

        {/* Section Navigation Tabs */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto">
            <button
              onClick={() => scrollToSection('player')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'player'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              20s Documentary Film
            </button>
            <button
              onClick={() => scrollToSection('telemetry')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'telemetry'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Descent Telemetry
            </button>
            <button
              onClick={() => scrollToSection('hardware')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'hardware'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Lander & Rover Specs
            </button>
            <button
              onClick={() => scrollToSection('budget')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'budget'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              $75M Cost Efficiency
            </button>
            <button
              onClick={() => scrollToSection('science')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'science'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Polar Discoveries
            </button>
            <button
              onClick={() => scrollToSection('directornotes')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'directornotes'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Cinematography Notes
            </button>
          </div>
        </div>

        {/* Section 1: Descent Telemetry & 40-Day Trajectory */}
        <section>
          <MissionTelemetry />
        </section>

        {/* Section 2: Subsystems & Failure-Tolerant Engineering */}
        <section>
          <HardwareInspector />
        </section>

        {/* Section 3: Cost Efficiency & Frugal Space Engineering */}
        <section>
          <BudgetEngineering />
        </section>

        {/* Section 4: Scientific Discoveries at Lunar South Pole */}
        <section>
          <ScienceDiscoveries />
        </section>

        {/* Section 5: Director's Notes & Cinematography Breakdown */}
        <section>
          <DirectorNotes />
        </section>
      </main>

      {/* Clean Editorial Footer adhering to anti-slop guidelines */}
      <footer className="border-t border-slate-800/80 bg-[#06080d] py-10 px-6">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            <div className="text-sm font-bold font-tech text-slate-200">Chandrayaan-3 Mission Report</div>
            <p className="mt-1">
              Commemorating ISRO's historic landing at Shiv Shakti Point (69.373° S, 32.319° E) on 23 August 2023.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span>ISRO Telemetry</span>
            <span aria-hidden="true">·</span>
            <span>LVM3-M4</span>
            <span aria-hidden="true">·</span>
            <span>Vikram & Pragyan</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => scrollToSection('player')}
              className="text-amber-400 hover:underline"
            >
              Back to Film
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
