import React from 'react';
import { Play, Sparkles } from 'lucide-react';

interface TopBarProps {
  onPlayClick: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onPlayClick, activeSection, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-4 bg-[#07090e]/90 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('player');
        }}
        className="text-lg font-bold tracking-tight text-white font-tech uppercase whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
      >
        Chandrayaan-3
      </a>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onNavigate('player')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSection === 'player' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          20s Film
        </button>
        <button
          onClick={() => onNavigate('telemetry')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSection === 'telemetry' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Descent Telemetry
        </button>
        <button
          onClick={() => onNavigate('hardware')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSection === 'hardware' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Lander & Rover
        </button>
        <button
          onClick={() => onNavigate('budget')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSection === 'budget' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Cost & Impact
        </button>
        <button
          onClick={() => onNavigate('science')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            activeSection === 'science' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Polar Discoveries
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onPlayClick}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-sm hover:shadow-amber-500/20 whitespace-nowrap shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Play Documentary</span>
        </button>
      </div>
    </header>
  );
};
