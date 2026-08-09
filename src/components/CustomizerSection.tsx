import React, { useState } from "react";
import { FINISHES, TASK_MODULES, UPGRADES } from "../data";
import { BotFinish, TaskModule, BotUpgrade } from "../types";
import { Heart, Utensils, Shield, Hammer, Check, Receipt, Star } from "lucide-react";

interface CustomizerSectionProps {
  onPreOrderSubmit: (config: {
    finish: BotFinish;
    module: TaskModule;
    upgrades: BotUpgrade[];
    totalPrice: number;
    ledColor: string;
  }) => void;
}

export default function CustomizerSection({ onPreOrderSubmit }: CustomizerSectionProps) {
  // Config state
  const [selectedFinish, setSelectedFinish] = useState<BotFinish>(FINISHES[0]);
  const [selectedModule, setSelectedModule] = useState<TaskModule>(TASK_MODULES[0]);
  const [selectedUpgrades, setSelectedUpgrades] = useState<BotUpgrade[]>([]);
  const [customLedColor, setCustomLedColor] = useState<string>("");

  const basePrice = 19900;

  // Manual LED override colors
  const LED_PRESETS = [
    { name: "Chassis Default", color: "", hex: selectedFinish.accentHex },
    { name: "Laser Red", color: "Red", hex: "#EF4444" },
    { name: "Deep Cobalt", color: "Cobalt", hex: "#3B82F6" },
    { name: "Emerald Cyber", color: "Emerald", hex: "#10B981" },
    { name: "Solar Amber", color: "Amber", hex: "#F59E0B" },
    { name: "Nebula Pink", color: "Pink", hex: "#EC4899" },
  ];

  const handleUpgradeToggle = (upgrade: BotUpgrade) => {
    if (selectedUpgrades.some((u) => u.id === upgrade.id)) {
      setSelectedUpgrades(selectedUpgrades.filter((u) => u.id !== upgrade.id));
    } else {
      setSelectedUpgrades([...selectedUpgrades, upgrade]);
    }
  };

  const getModuleIcon = (id: string) => {
    switch (id) {
      case "companion":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "kitchen":
        return <Utensils className="w-5 h-5 text-amber-500" />;
      case "security":
        return <Shield className="w-5 h-5 text-emerald-500" />;
      case "industrial":
        return <Hammer className="w-5 h-5 text-blue-500" />;
      default:
        return <Star className="w-5 h-5 text-white" />;
    }
  };

  // Calculations
  const finishPrice = selectedFinish.price;
  const modulePrice = selectedModule.price;
  const upgradesPrice = selectedUpgrades.reduce((sum, u) => sum + u.price, 0);
  const totalPrice = basePrice + finishPrice + modulePrice + upgradesPrice;

  // Specs dynamic shift
  const totalWeight = 56.5 + (selectedModule.id === "industrial" ? 6.2 : 0) + (selectedUpgrades.some(u => u.id === "battery-long") ? 1.8 : 0);
  const totalBatteryRange = selectedUpgrades.some(u => u.id === "battery-long") ? "16 Hours" : "8 Hours";

  const currentLedHex = customLedColor || selectedFinish.accentHex;

  const handlePreOrderAction = () => {
    onPreOrderSubmit({
      finish: selectedFinish,
      module: selectedModule,
      upgrades: selectedUpgrades,
      totalPrice,
      ledColor: LED_PRESETS.find(p => p.hex === currentLedHex)?.name || "Chassis Default",
    });
  };

  return (
    <section id="customizer" className="py-24 bg-neutral-900 border-t border-white/5 relative overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-10 transition-colors duration-1000 pointer-events-none"
        style={{ backgroundColor: currentLedHex }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-neutral-400 font-bold uppercase block mb-3">
            INTERACTIVE BUILDER
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Configure Your Nexbot
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Tailor the physical finish, sensory upgrades, and AI task programs to fit perfectly into your environment. See pricing and mechanical tolerances change in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Visualizer Mock & Pricing Sheet (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            {/* Visualizer Card */}
            <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-neutral-900/90 border border-white/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: currentLedHex }} />
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">VISUALIZER ACTIVE</span>
              </div>

              {/* Minimalist Tech Vector Mockup */}
              <div className="h-64 flex flex-col justify-center items-center relative rounded-xl bg-neutral-900/50 border border-white/5 overflow-hidden mb-6">
                
                {/* Simulated Chassis Representation */}
                <div className="w-32 h-32 rounded-full border-4 flex items-center justify-center relative transition-all duration-700"
                  style={{ borderColor: selectedFinish.colorHex, boxShadow: `0 0 40px ${currentLedHex}33` }}>
                  
                  {/* Internal Core Light */}
                  <div className="w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-700"
                    style={{ backgroundColor: `${selectedFinish.colorHex}15` }}>
                    {getModuleIcon(selectedModule.id)}
                  </div>

                  {/* Laser Sensor Rings */}
                  <div className="absolute -inset-4 rounded-full border border-dashed animate-[spin_20s_linear_infinite]"
                    style={{ borderColor: `${currentLedHex}44` }} />
                </div>

                <div className="absolute bottom-4 inset-x-6 flex justify-between items-center text-[10px] font-mono text-neutral-400">
                  <span>FINISH: {selectedFinish.name}</span>
                  <span>ACCENT LED: <span style={{ color: currentLedHex }}>●</span></span>
                </div>
              </div>

              {/* Dynamic Tech Tolerances */}
              <div className="grid grid-cols-3 gap-3 text-center mb-6">
                <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase block mb-1">TOTAL MASS</span>
                  <span className="font-display text-sm font-semibold text-white tracking-tight">{totalWeight.toFixed(1)} kg</span>
                </div>
                <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase block mb-1">DUTY LIFE</span>
                  <span className="font-display text-sm font-semibold text-white tracking-tight">{totalBatteryRange}</span>
                </div>
                <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase block mb-1">EST. SHIPMENT</span>
                  <span className="font-display text-sm font-semibold text-white tracking-tight">Q4 2026</span>
                </div>
              </div>

              {/* Invoice breakdown sheet */}
              <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-1.5 pb-2 border-b border-white/5">
                  <Receipt className="w-4 h-4 text-neutral-400" />
                  <span className="font-display text-xs font-bold text-white uppercase tracking-wider">ESTIMATED INVOICE</span>
                </div>
                
                <div className="space-y-2 font-sans text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Base Model (Humanoid Platform)</span>
                    <span className="font-mono text-white">${basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chassis Finish ({selectedFinish.name})</span>
                    <span className="font-mono text-white">
                      {finishPrice === 0 ? "Included" : `+$${finishPrice.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Program Task ({selectedModule.name})</span>
                    <span className="font-mono text-white">
                      {modulePrice === 0 ? "Included" : `+$${modulePrice.toLocaleString()}`}
                    </span>
                  </div>
                  {selectedUpgrades.map((upgrade) => (
                    <div key={upgrade.id} className="flex justify-between">
                      <span>Upgrade: {upgrade.name}</span>
                      <span className="font-mono text-white">+${upgrade.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 flex justify-between items-baseline" aria-live="polite">
                  <span className="font-display text-sm font-bold text-white uppercase tracking-wider">Total Est. Price</span>
                  <span className="font-mono text-xl font-bold text-red-500">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                id="customizer-reserve-btn"
                onClick={handlePreOrderAction}
                className="w-full mt-6 bg-white hover:bg-neutral-200 active:scale-95 text-neutral-950 font-display text-xs font-bold tracking-widest uppercase py-4 rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Secure Reservation with this Config
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Options */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. Chassis Finishes */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center font-mono text-[10px] font-bold">1</span>
                <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase">Chassis Armor Finish</h3>
              </div>
              <p className="font-sans text-xs text-neutral-400 mb-6 -mt-2">
                Aerospace-certified exterior coatings designed for high structural resilience and scratch resistance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="group" aria-label="Chassis Armor Finish">
                {FINISHES.map((finish) => (
                  <button
                    type="button"
                    key={finish.id}
                    onClick={() => {
                      setSelectedFinish(finish);
                      // Reset custom LED if changing finish unless overridden manually
                    }}
                    aria-pressed={selectedFinish.id === finish.id}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      selectedFinish.id === finish.id
                        ? "bg-neutral-950 border-white/20 shadow-lg"
                        : "bg-neutral-950/40 border-white/5 hover:border-white/10 hover:bg-neutral-950/80"
                    }`}
                  >
                    {/* Circle finish color swatch */}
                    <div className="w-8 h-8 rounded-full flex-shrink-0 border border-white/20 relative flex items-center justify-center"
                      style={{ backgroundColor: finish.colorHex }}>
                      {selectedFinish.id === finish.id && (
                        <Check className="w-4 h-4 text-neutral-950 mix-blend-difference font-bold" />
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="font-display text-sm font-semibold text-white">{finish.name}</h4>
                        <span className="font-mono text-xs text-neutral-400">
                          {finish.price === 0 ? "Standard" : `+$${finish.price.toLocaleString()}`}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-neutral-400 leading-relaxed">
                        {finish.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. LED Accent override */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center font-mono text-[10px] font-bold">2</span>
                <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase">Custom LED Ambient Lighting</h3>
              </div>
              <p className="font-sans text-xs text-neutral-400 mb-6 -mt-2">
                Override the optical sensor ring lighting with dynamic customized visual presets.
              </p>

              <div className="flex flex-wrap gap-2.5" role="group" aria-label="LED Ambient Lighting Presets">
                {LED_PRESETS.map((preset) => {
                  const isActive = (preset.color === "" && customLedColor === "") || (preset.color !== "" && customLedColor === preset.hex);
                  return (
                  <button
                    type="button"
                    key={preset.name}
                    onClick={() => setCustomLedColor(preset.color ? preset.hex : "")}
                    aria-pressed={isActive}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-[11px] font-mono tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
                      isActive
                        ? "bg-neutral-950 border-white/20 text-white"
                        : "bg-neutral-950/40 border-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.hex }} />
                    {preset.name}
                  </button>
                )})}
              </div>
            </div>

            {/* 3. Task Modules */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center font-mono text-[10px] font-bold">3</span>
                <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase">AI Task Core Subsystems</h3>
              </div>
              <p className="font-sans text-xs text-neutral-400 mb-6 -mt-2">
                Installs specialized local neural weights, sensor calibration, and physical tool integration firmware.
              </p>

              <div className="space-y-4" role="group" aria-label="AI Task Core Subsystems">
                {TASK_MODULES.map((mod) => (
                  <button
                    type="button"
                    key={mod.id}
                    onClick={() => setSelectedModule(mod)}
                    aria-pressed={selectedModule.id === mod.id}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                      selectedModule.id === mod.id
                        ? "bg-neutral-950 border-white/20 shadow-lg"
                        : "bg-neutral-950/40 border-white/5 hover:border-white/10 hover:bg-neutral-950/80"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center flex-shrink-0">
                      {getModuleIcon(mod.id)}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider">{mod.name}</h4>
                        <span className="font-mono text-xs text-neutral-400">
                          {mod.price === 0 ? "Standard" : `+$${mod.price.toLocaleString()}`}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-neutral-400">
                        {mod.description}
                      </p>

                      {/* Display features list */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-white/5">
                        {mod.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-sans">
                            <span className="w-1 h-1 rounded-full bg-red-500" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Hardware upgrades */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center font-mono text-[10px] font-bold">4</span>
                <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase">Performance Upgrades</h3>
              </div>
              <p className="font-sans text-xs text-neutral-400 mb-6 -mt-2">
                Equip additional solid-state energy cells or micro-sensory appendages for maximum efficiency.
              </p>

              <div className="grid grid-cols-1 gap-4" role="group" aria-label="Performance Upgrades">
                {UPGRADES.map((upgrade) => {
                  const isChecked = selectedUpgrades.some((u) => u.id === upgrade.id);
                  return (
                    <button
                      type="button"
                      key={upgrade.id}
                      onClick={() => handleUpgradeToggle(upgrade)}
                      aria-pressed={isChecked}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex justify-between items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                        isChecked
                          ? "bg-neutral-950 border-white/20 shadow-lg"
                          : "bg-neutral-950/40 border-white/5 hover:border-white/10 hover:bg-neutral-950/80"
                      }`}
                    >
                      <div className="flex gap-4 items-center">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                          isChecked ? "bg-white border-white text-neutral-950" : "border-white/20"
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-semibold text-white">{upgrade.name}</h4>
                          <p className="font-sans text-[11px] text-neutral-400 leading-relaxed mt-0.5 max-w-md">
                            {upgrade.description}
                          </p>
                        </div>
                      </div>

                      <span className="font-mono text-xs text-white bg-neutral-900 border border-white/5 px-3 py-1.5 rounded-lg whitespace-nowrap">
                        +${upgrade.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
