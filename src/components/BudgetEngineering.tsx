import React from 'react';
import { BUDGET_COMPARISONS } from '../data/chandrayaanData';
import { DollarSign, TrendingUp, Award, CheckCircle, Cpu, Fuel } from 'lucide-react';

export const BudgetEngineering: React.FC = () => {
  return (
    <div id="budget" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
          <span>Economic Engineering & Frugal Innovation</span>
          <span aria-hidden="true">·</span>
          <span>$75 Million Benchmark</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-tech text-white">
          Cost Efficiency: Landing on the Moon for Less Than a Hollywood Film
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-3xl leading-relaxed">
          At approximately $75 Million USD (₹615 Crore), Chandrayaan-3 achieved humanity's first south pole soft landing
          at a fraction of the cost of contemporary space missions—and even less than fictional space movies like{' '}
          <em>Interstellar</em> and <em>The Martian</em>.
        </p>
      </div>

      {/* Comparison Chart & Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Cost Comparison Bar Chart */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Financial Expenditure Comparison
              </span>
              <h3 className="text-lg font-bold font-tech text-white mt-0.5">Budget in Millions USD</h3>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-semibold px-2.5 py-1 bg-emerald-500/10 rounded-md border border-emerald-500/20">
              Chandrayaan-3: $75M
            </div>
          </div>

          <div className="space-y-4">
            {BUDGET_COMPARISONS.filter((item) => item.costMillionsUSD <= 300).map((item) => {
              const maxBudget = 200;
              const percent = Math.min(100, (item.costMillionsUSD / maxBudget) * 100);
              const isChandrayaan = item.name.includes('Chandrayaan-3');

              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-medium ${isChandrayaan ? 'text-amber-300 font-bold' : 'text-slate-300'}`}>
                      {item.name}
                    </span>
                    <span className="font-mono font-bold text-white tabular-nums">
                      ${item.costMillionsUSD} Million
                    </span>
                  </div>

                  {/* Visual Bar */}
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      style={{ width: `${percent}%` }}
                      className={`h-full rounded-full transition-all duration-700 ${
                        isChandrayaan
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm shadow-amber-500/50'
                          : item.category === 'Hollywood Film'
                          ? 'bg-slate-600'
                          : 'bg-rose-600'
                      }`}
                    />
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
                    <span>{item.category}</span>
                    <span>{item.outcomeOrBoxOffice}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800 flex items-center justify-between font-mono">
            <span>NASA Artemis Program reference: ~$93,000 Million</span>
            <span className="text-emerald-400">ISRO ratio: ~0.08% of Artemis</span>
          </div>
        </div>

        {/* Right Column: Key Pillars of ISRO's Frugal Space Engineering */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
              Engineering Ingenuity
            </div>
            <h3 className="text-lg font-bold font-tech text-white mb-4">
              How ISRO Mastered Cost-Efficient Deep Space
            </h3>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                  <Fuel className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Gravity-Assist Trajectory
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Rather than building an enormous, billion-dollar Saturn V-class mega-rocket, ISRO utilized Earth's
                    orbital energy with sequential periapsis burns to slingshot Chandrayaan-3 toward lunar orbit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Indigenous Supply Chain
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Nearly 80% of components, sensors, and cryogenic propulsion assemblies were manufactured domestically
                    across Indian aerospace clusters (Bengaluru, Thiruvananthapuram, Hyderabad).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Modular Heritage & Simulated Regolith
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    ISRO synthesized artificial lunar regolith from anorthosite rocks in Namakkal, Tamil Nadu, to rigorously
                    test Vikram's landing sensors and Pragyan's rocker-bogie wheel cleat traction prior to launch.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-lg text-xs text-slate-300">
            <span className="text-amber-400 font-semibold font-mono">Global Impact: </span>
            Chandrayaan-3 proved that planetary exploration is no longer restricted to super-power GDP budgets, establishing
            a sustainable model for international lunar science.
          </div>
        </div>
      </div>
    </div>
  );
};
