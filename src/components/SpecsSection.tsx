import React, { useState } from "react";
import { TECH_SPECS } from "../data";
import { Cpu, Zap, Maximize, FileText, Compass, ChevronRight } from "lucide-react";

export default function SpecsSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedSpecIndex, setSelectedSpecIndex] = useState<number | null>(0);

  const activeCategory = TECH_SPECS[activeCategoryIndex];

  const getCategoryIcon = (category: string) => {
    if (category.includes("Compute")) return <Cpu className="w-4 h-4" />;
    if (category.includes("Actuation")) return <Zap className="w-4 h-4" />;
    return <Compass className="w-4 h-4" />;
  };

  return (
    <section id="specs" className="py-24 bg-neutral-950 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient glowing spots */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-red-500 font-bold uppercase block mb-3">
            TECHNICAL DOSSIER
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Calibrated for Perfection
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Engineered down to the micrometer. Compare the physical proportions, neural network processing, and actuator capabilities that make Nexbot an unparalleled masterpiece.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/5 pb-6">
          {TECH_SPECS.map((group, index) => (
            <button
              key={group.category}
              onClick={() => {
                setActiveCategoryIndex(index);
                setSelectedSpecIndex(0); // Reset selection
              }}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full font-display text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeCategoryIndex === index
                  ? "bg-white text-neutral-950 font-semibold"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-white/5"
              }`}
            >
              {getCategoryIcon(group.category)}
              {group.category}
            </button>
          ))}
        </div>

        {/* Two-Column Specs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Specs List Column (left) */}
          <div className="lg:col-span-7 space-y-4">
            {activeCategory.items.map((item, index) => (
              <div
                key={item.label}
                onClick={() => setSelectedSpecIndex(index)}
                className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedSpecIndex === index
                    ? "bg-neutral-900 border-white/20 shadow-xl shadow-black/40"
                    : "bg-neutral-950 border-white/5 hover:border-white/10 hover:bg-neutral-900/40"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1">
                      {item.label}
                    </span>
                    <h4 className="font-display text-xl font-bold text-white tracking-wide">
                      {item.value}
                    </h4>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      selectedSpecIndex === index
                        ? "bg-white text-neutral-950 border-white"
                        : "border-white/10 text-neutral-500 group-hover:text-white group-hover:border-white/20"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Specs Detail Panel (right) */}
          <div className="lg:col-span-5 h-full">
            {selectedSpecIndex !== null && (
              <div className="bg-neutral-900 rounded-2xl border border-white/10 p-8 sticky top-28 shadow-2xl">
                <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase block">
                      SPECIFICATION DETAILS
                    </span>
                    <span className="font-display text-sm font-semibold text-white uppercase tracking-wider">
                      Engineering Log
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="font-mono text-xs text-neutral-500 block mb-1">METRIC IDENTIFIER</span>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                    {activeCategory.items[selectedSpecIndex].label}
                  </h3>
                </div>

                <div className="mb-6">
                  <span className="font-mono text-xs text-neutral-500 block mb-1">DIAGNOSTIC VALUE</span>
                  <div className="font-mono text-xl font-bold text-red-500 tracking-wide bg-neutral-950 px-4 py-3 rounded-lg border border-white/5">
                    {activeCategory.items[selectedSpecIndex].value}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs text-neutral-500 block mb-1.5">INTEGRATION ANALYSIS</span>
                  <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                    {activeCategory.items[selectedSpecIndex].details}
                  </p>
                </div>

                {/* Simulated blueprint vector lines */}
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
                  <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
                    SYS: ALIGNED & VERIFIED
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
