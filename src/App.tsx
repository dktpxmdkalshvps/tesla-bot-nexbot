import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SplineViewer from "./components/SplineViewer";
import SpecsSection from "./components/SpecsSection";
import CustomizerSection from "./components/CustomizerSection";
import PreOrderModal from "./components/PreOrderModal";
import NarrativesAndFAQ from "./components/NarrativesAndFAQ";
import { BotFinish, TaskModule, BotUpgrade } from "./types";
import { FINISHES, TASK_MODULES } from "./data";
import { ArrowRight, Github, Twitter, Youtube } from "lucide-react";

export default function App() {
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  const [customizerConfig, setCustomizerConfig] = useState<{
    finish: BotFinish;
    module: TaskModule;
    upgrades: BotUpgrade[];
    totalPrice: number;
    ledColor: string;
  } | null>(null);

  const [activeSection, setActiveSection] = useState("overview");
  const [currentTime, setCurrentTime] = useState("");

  // Track active section for navigation highlighting
  useEffect(() => {
    let throttleTimer: ReturnType<typeof setTimeout> | null = null;
    let lastCallTime = 0;

    const executeScrollCheck = () => {
      const sections = ["overview", "technology", "customizer", "specs"];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      const now = Date.now();
      const throttleMs = 100;

      if (now - lastCallTime >= throttleMs) {
        executeScrollCheck();
        lastCallTime = now;
      } else if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          executeScrollCheck();
          throttleTimer = null;
          lastCallTime = Date.now();
        }, throttleMs - (now - lastCallTime));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  // Live ticking elegant clock in footer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCustomizerPreOrder = (config: {
    finish: BotFinish;
    module: TaskModule;
    upgrades: BotUpgrade[];
    totalPrice: number;
    ledColor: string;
  }) => {
    setCustomizerConfig(config);
    setIsPreOrderOpen(true);
  };

  const openDefaultPreOrder = () => {
    setCustomizerConfig({
      finish: FINISHES[0],
      module: TASK_MODULES[0],
      upgrades: [],
      totalPrice: 19900 + FINISHES[0].price + TASK_MODULES[0].price,
      ledColor: "Chassis Default",
    });
    setIsPreOrderOpen(true);
  };

  const scrollToCustomizer = () => {
    const el = document.getElementById("customizer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-neutral-950">
      
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-6 focus:left-6 focus:px-5 focus:py-3 focus:bg-white focus:text-neutral-950 focus:font-display focus:text-sm focus:font-bold focus:uppercase focus:tracking-wider focus:rounded-full focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all"
      >
        Skip to main content
      </a>

      {/* Premium Header */}
      <Header onPreOrderClick={openDefaultPreOrder} activeSection={activeSection} />

      {/* Main Container */}
      <main id="main-content" tabIndex={-1} className="relative focus:outline-none">
        
        {/* SECTION 1: HERO OVERVIEW */}
        <section id="overview" className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col justify-between min-h-[90vh]">
          {/* Subtle Ambient Light Spot */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Core Branding Pitch */}
          <div className="text-center max-w-3xl mx-auto space-y-6 pt-8 z-10">
            <span className="font-mono text-xs tracking-[0.4em] text-red-500 font-bold uppercase block">
              THE NEXT ERA OF HUMANITY // ALPHA RELEASE
            </span>
            <h1 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] text-glow-white">
              Say Hello to Nexbot
            </h1>
            <p className="font-sans text-sm md:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
              Introducing the premier humanoid platform engineered to blend seamlessly into residential life and precision industries. Designed to handle the mundane, so you can focus on the extraordinary.
            </p>
            
            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                id="hero-configure-btn"
                onClick={scrollToCustomizer}
                className="bg-white hover:bg-neutral-200 text-neutral-950 font-display text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-200 cursor-pointer shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Configure Customizer
              </button>
              <button
                id="hero-preorder-btn"
                onClick={openDefaultPreOrder}
                className="bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-white/20 text-white font-display text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-200 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Reserve Now ($100 Deposit)
              </button>
            </div>
          </div>

          {/* Interactive 3D Spline Canvas */}
          <div className="mt-16 z-10">
            <SplineViewer />
          </div>
        </section>

        {/* SECTION 2: SPEC TAPE / QUICK BAR */}
        <div className="bg-neutral-950 border-y border-white/5 py-8 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">BASE INVESTMENT</span>
              <span className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">$19,900 USD</span>
            </div>
            <div className="text-center">
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">TOTAL DOF</span>
              <span className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">40 Degrees</span>
            </div>
            <div className="text-center">
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">DUTY STAMINA</span>
              <span className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">8 to 16 Hours</span>
            </div>
            <div className="text-center">
              <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">EST. DELIVERY</span>
              <span className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">Late 2026</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: DEEP NARRATIVES & COGNITION (Kitchen, Mapping, Glove) */}
        <NarrativesAndFAQ />

        {/* SECTION 4: INTERACTIVE CONFIGURATION PANEL */}
        <CustomizerSection onPreOrderSubmit={handleCustomizerPreOrder} />

        {/* SECTION 5: DETAILED TECH SPECS DOSSIER */}
        <SpecsSection />

        {/* SECTION 6: THE LUXURY FOOTER CALL TO ACTION */}
        <section className="bg-neutral-950 border-t border-white/5 py-24 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px]" />
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight text-glow-white">
              Elevate Your Daily Standard
            </h2>
            <p className="font-sans text-sm md:text-base text-neutral-400 max-w-lg mx-auto leading-relaxed">
              Join the founding family of autonomous robotics owners. Your $100 holding fee is entirely risk-free and secures your delivery sequence.
            </p>
            <div className="pt-4">
              <button
                id="footer-reserve-btn"
                onClick={openDefaultPreOrder}
                className="bg-white hover:bg-neutral-200 active:scale-95 text-neutral-950 font-display text-xs font-bold tracking-widest uppercase px-10 py-4.5 rounded-full transition-all duration-200 cursor-pointer shadow-xl inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Reserve Your Nexbot
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-neutral-950 border-t border-white/5 pt-16 pb-8 px-6 text-neutral-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-6 h-6 rounded bg-white text-neutral-950 flex items-center justify-center font-bold">
                N
              </div>
              <span className="font-display font-bold tracking-widest uppercase text-sm">NEXBOT</span>
            </div>
            <p className="font-sans text-xs leading-relaxed max-w-xs text-neutral-400">
              Forging the future of human-assistive robotics with dynamic mechanical safety, local neural inference, and premium design finishes.
            </p>
          </div>

          <div>
            <span className="font-display text-xs font-bold text-white uppercase tracking-wider block mb-4">EXPLORE</span>
            <ul className="space-y-2.5 text-xs font-sans">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Technology Core</a></li>
              <li><a href="#customizer" className="hover:text-white transition-colors">Design Customizer</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Technical specs</a></li>
            </ul>
          </div>

          <div>
            <span className="font-display text-xs font-bold text-white uppercase tracking-wider block mb-4">RESOURCES</span>
            <ul className="space-y-2.5 text-xs font-sans">
              <li><span className="text-neutral-600 block">Alpha Documentation (Q3 2026)</span></li>
              <li><span className="text-neutral-600 block">Tesla Developer API</span></li>
              <li><span className="text-neutral-600 block">Fleet Command Center</span></li>
              <li><span className="text-neutral-600 block">Haptic Glove SDK</span></li>
            </ul>
          </div>

          <div>
            <span className="font-display text-xs font-bold text-white uppercase tracking-wider block mb-4">SOCIAL & FLEET</span>
            <div className="flex gap-4">
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/15 focus-visible:ring-2 focus-visible:outline-none transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/15 focus-visible:ring-2 focus-visible:outline-none transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/15 focus-visible:ring-2 focus-visible:outline-none transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
            
            {/* Live UTC/Local clock display */}
            <div className="mt-6 bg-neutral-900/50 border border-white/5 px-4 py-2 rounded-xl inline-block">
              <span className="font-mono text-[9px] text-neutral-500 uppercase block tracking-wider">CHRONOS CLOCK</span>
              <span className="font-mono text-xs text-neutral-300 font-semibold">{currentTime || "00:00:00"}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <span>&copy; 2026 Nexbot Robotics Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy and Cookies</a>
          </div>
        </div>
      </footer>

      {/* Pre-order Modal Panel */}
      <PreOrderModal
        isOpen={isPreOrderOpen}
        onClose={() => setIsPreOrderOpen(false)}
        config={customizerConfig}
      />

    </div>
  );
}
