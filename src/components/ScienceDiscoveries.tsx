import React, { useState } from 'react';
import { SCIENCE_DISCOVERIES } from '../data/chandrayaanData';
import { Sparkles, Thermometer, TestTubes, Compass, Rocket, Droplets } from 'lucide-react';

export const ScienceDiscoveries: React.FC = () => {
  const [activeDiscoveryId, setActiveDiscoveryId] = useState<string>(SCIENCE_DISCOVERIES[0].id);
  const activeDiscovery = SCIENCE_DISCOVERIES.find((d) => d.id === activeDiscoveryId) || SCIENCE_DISCOVERIES[0];

  return (
    <div id="science" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
          <span>In-Situ Lunar Science</span>
          <span aria-hidden="true">·</span>
          <span>Shiv Shakti Point Findings</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-tech text-white">
          Scientific Discoveries at the Lunar South Pole
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-3xl leading-relaxed">
          The lunar south pole is humanity's most sought-after destination because its permanently shadowed craters
          contain primordial water ice. Chandrayaan-3 delivered groundbreaking empirical data directly from the polar surface.
        </p>
      </div>

      {/* Main Discoveries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Discovery Selection Cards */}
        <div className="lg:col-span-5 space-y-3">
          {SCIENCE_DISCOVERIES.map((disc) => {
            const isSelected = disc.id === activeDiscovery.id;
            return (
              <button
                key={disc.id}
                onClick={() => setActiveDiscoveryId(disc.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-cyan-950/30 border-cyan-500/50 text-white shadow-lg shadow-cyan-950/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                  <span>{disc.instrument}</span>
                </div>
                <div className="text-sm sm:text-base font-semibold text-white">{disc.title}</div>
                <div className="mt-1.5 text-xs text-amber-300 font-mono truncate">{disc.dataMetric}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Discovery Console */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              {activeDiscovery.instrument}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-tech text-white mt-1">
              {activeDiscovery.title}
            </h3>
          </div>

          {/* Metric Highlight Box */}
          <div className="bg-slate-950/90 border border-cyan-500/20 p-4 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Key Telemetry Finding</span>
              <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300 mt-0.5">
                {activeDiscovery.dataMetric}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Observation Details */}
          <div className="space-y-4">
            <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-lg">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Empirical Finding
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{activeDiscovery.finding}</p>
            </div>

            <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-lg">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                Planetary Science Significance
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{activeDiscovery.significance}</p>
            </div>
          </div>

          {/* Special Visual: ChaSTE Thermal Gradient or LIBS Spectrum Graphic */}
          {activeDiscovery.id === 'thermal-inversion' && (
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-lg space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                ChaSTE Subsurface Thermal Gradient (Depth vs Temp)
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between text-rose-400">
                  <span>Surface (0 mm)</span>
                  <span>+50.0 °C [Direct Solar Illumination]</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-rose-500" style={{ width: '100%' }} />
                </div>
                <div className="flex items-center justify-between text-cyan-300 pt-1">
                  <span>Depth (-80 mm)</span>
                  <span>-10.0 °C [Deep Regolith Insulated Subsurface]</span>
                </div>
              </div>
            </div>
          )}

          {activeDiscovery.id === 'sulfur-discovery' && (
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-lg space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                LIBS Spectral Emission Wavelength Profile
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Sulfur (S)', 'Aluminum (Al)', 'Calcium (Ca)', 'Iron (Fe)', 'Chromium (Cr)', 'Titanium (Ti)', 'Oxygen (O)'].map((el) => (
                  <span
                    key={el}
                    className={`px-2 py-1 text-xs font-mono rounded border ${
                      el.includes('Sulfur')
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    {el}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shiv Shakti Point Geography & Permanently Shadowed Regions */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-4 h-4" />
            <span>Exact Coordinates</span>
          </div>
          <div className="text-xl font-bold font-mono text-white">69.373° S, 32.319° E</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Officially approved by the International Astronomical Union (IAU) Working Group for Planetary System Nomenclature.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Droplets className="w-4 h-4" />
            <span>Water Ice Prospecting</span>
          </div>
          <div className="text-xl font-bold font-mono text-white">Permanently Shadowed</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Near Manzinus C and Simpelius craters, where temperatures stay below -200°C in shadow, preserving volatile water ice reserves.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Rocket className="w-4 h-4" />
            <span>Future Artemis & Base Utility</span>
          </div>
          <div className="text-xl font-bold font-mono text-white">In-Situ Resource Utilization</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Water ice can be split into hydrogen and liquid oxygen rocket propellant, making the south pole the gateway for deep space exploration.
          </p>
        </div>
      </div>
    </div>
  );
};
