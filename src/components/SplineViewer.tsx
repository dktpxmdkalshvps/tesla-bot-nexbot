import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function SplineViewer() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[550px] md:h-[650px] lg:h-[750px] rounded-3xl overflow-hidden border border-white/10 bg-[#09090b] shadow-2xl group">
      {/* Dynamic Grid Background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      
      {/* Laser line guides */}
      <div className="absolute top-0 bottom-0 left-12 w-px bg-white/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-12 w-px bg-white/5 pointer-events-none" />
      <div className="absolute left-0 right-0 top-12 h-px bg-white/5 pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-12 h-px bg-white/5 pointer-events-none" />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 z-20">
          <div className="relative flex items-center justify-center w-20 h-20 mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-neutral-800" />
            <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin" />
            <span className="font-mono text-xs font-semibold text-white">3D</span>
          </div>
          <p className="font-display text-sm tracking-widest text-neutral-400 uppercase animate-pulse">
            Connecting to 3D Interface...
          </p>
          <p className="font-mono text-[10px] text-neutral-500 uppercase mt-2">
            Loading nexbot robot character concept
          </p>
        </div>
      )}

      {/* Active Spline 3D Embed */}
      <iframe
        src="https://my.spline.design/nexbotrobotcharacterconcept-5VztGCi5Suv6HE0QYmvKpuog/"
        frameBorder="0"
        width="100%"
        height="100%"
        className="relative z-10 w-full h-full scale-[1.02]"
        onLoad={() => setIsLoading(false)}
        allow="autoplay; fullscreen"
        sandbox="allow-scripts allow-same-origin"
      />

      {/* Luxury Interactive HUD Overlay - Non-larp, purely elegant alignment brackets */}
      <div className="absolute inset-0 pointer-events-none z-10 p-8 flex flex-col justify-between">
        {/* Top bar indicators */}
        <div className="flex justify-between items-start">
          <div className="bg-neutral-950/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5">
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">
              MODEL GENERATION
            </span>
            <span className="font-display text-sm font-semibold text-white tracking-wide">
              Nexbot Optimus v2.0
            </span>
          </div>

          <div className="bg-neutral-950/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] text-neutral-300 tracking-wider">
              INTERACTIVE CANVAS
            </span>
          </div>
        </div>

        {/* Bottom bar controls and notes */}
        <div className="flex justify-between items-end">
          <div className="bg-neutral-950/60 backdrop-blur-md p-4 rounded-xl border border-white/5 max-w-xs">
            <div className="flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span className="font-display text-xs font-bold text-white uppercase tracking-wider">
                Full-Axis Simulation
              </span>
            </div>
            <p className="font-sans text-[11px] text-neutral-400 leading-relaxed">
              Drag mouse directly to orbit. Scroll to zoom. Hover over specific limbs to test active kinematics.
            </p>
          </div>

          <div className="flex flex-col gap-2 pointer-events-auto">
            <div className="flex gap-2">
              <div className="bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                LAT: 37.42° N
              </div>
              <div className="bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                LNG: 122.08° W
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
