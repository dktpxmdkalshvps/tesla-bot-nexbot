import React, { useState } from "react";
import { Plus, Minus, ShieldCheck, Heart, Sparkles, ChefHat, Flame, Brain, Shield } from "lucide-react";

export default function NarrativesAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const narratives = [
    {
      id: "kitchen",
      tag: "CULINARY CORE",
      title: "Nexbot works in the kitchen",
      desc: "Armed with precise volumetric haptic hands and high-tolerance liquid dynamic scripts, Nexbot handles pan sautéing, portioning, and meticulous post-meal sterilization.",
      highlight: "Trained on over 20,000 gourmet recipes and NSF kitchen safety codes.",
      stats: [
        { label: "Precision Handling", value: "0.1 N sensitivity" },
        { label: "Thermal Range", value: "-20°C to 280°C" },
      ],
      icon: <ChefHat className="w-5 h-5 text-red-500" />
    },
    {
      id: "navigation",
      tag: "SPATIAL COGNITION",
      title: "Adapts to spaces it has never seen",
      desc: "Utilizing zero-shot generative spatial modeling, Nexbot maps your home instantly on the first walk, predicting object locations and planning ideal paths around pets, rugs, and steps.",
      highlight: "Never gets stuck. Constantly updates safe pathways.",
      stats: [
        { label: "Mapping Frequency", value: "240 frames/sec" },
        { label: "Object Recall", value: "99.8% precision" },
      ],
      icon: <Brain className="w-5 h-5 text-blue-500" />
    },
    {
      id: "learning",
      tag: "CONTINUOUS SHARING",
      title: "Always learning, always improving",
      desc: "Our neural fleet gathers anonymous pathing updates and dexterous manipulation trials from other units globally. Your Nexbot improves overnight, mastering new skills while you sleep.",
      highlight: "Enables natural intuition over simple raw imitation.",
      stats: [
        { label: "Fleet Updates", value: "Overnight OTA" },
        { label: "Skill Library", value: "4,500+ procedures" },
      ],
      icon: <Sparkles className="w-5 h-5 text-amber-500" />
    }
  ];

  const pillars = [
    {
      title: "Local Privacy First",
      desc: "All spatial mappings, voice signatures, and camera streams are fully processed on the local FSD HW5 processor. Zero private home footage is uploaded to any cloud server.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />
    },
    {
      title: "Absolute Mechanical Safety",
      desc: "Custom torque-limiting clutches immediately disengage joints if a structural collision is detected, ensuring gentle contact that is perfectly safe for children and household pets.",
      icon: <Heart className="w-6 h-6 text-red-500" />
    },
    {
      title: "Tailored to Your Space",
      desc: "Choose from an array of anodized premium armor plating and soft-fabric limb sleeves to complement the interior design aesthetic of your home or private workspace.",
      icon: <Sparkles className="w-6 h-6 text-blue-500" />
    }
  ];

  const faqs = [
    {
      question: "What domestic chores can Nexbot manage?",
      answer: "Nexbot is fully trained to manage high-dexterity kitchen cooking, automatic dishwasher loading, detailed laundry folding, heavy lifting, and customizable night-watch patrolling. It is regularly updated with new skills via the cloud-based Tesla Skill Library."
    },
    {
      question: "Is Nexbot available for purchase today?",
      answer: "Alpha pre-orders are currently open globally. Production slots are allocated based on the chronological order of the holding deposits. Initial deliveries are scheduled for late 2026."
    },
    {
      question: "What is the holding deposit policy?",
      answer: "The $100 pre-order deposit is fully refundable at any time prior to your official shipping and customization invitation. You can manage your reservation directly in your personal portal."
    },
    {
      question: "How long does the battery last and how does it charge?",
      answer: "The standard 2.3 kWh solid-state core provides 8 hours of active household labor. The Long-Range Core upgrade extends this to 16 hours. When energy falls below 15%, Nexbot returns autonomously to its compact magnetic dock to fast-charge in 45 minutes."
    },
    {
      question: "Is Nexbot safe around children and pets?",
      answer: "Yes. Nexbot utilizes custom physical strain wave actuators that actively monitor torque. If any resistance greater than 5 Newtons is met (comparable to a light tap), the actuator halts instantly. It also includes localized voice fail-safes."
    }
  ];

  return (
    <div id="technology" className="bg-neutral-950 py-24 border-t border-white/5 space-y-28 relative">
      
      {/* Decorative vector grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1e24_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Narrative blocks */}
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {narratives.map((item, index) => (
          <div 
            key={item.id} 
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Visualizer Frame */}
            <div className={`lg:col-span-6 relative ${index % 2 === 1 ? "lg:order-last" : ""}`}>
              <div className="bg-neutral-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden group shadow-2xl h-[360px] flex flex-col justify-between">
                
                {/* Tech background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-neutral-800/20 blur-3xl pointer-events-none" />

                <div className="flex justify-between items-start z-10">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
                    SYSTEM SIMULATOR // {item.id}
                  </span>
                </div>

                {/* Micro tech charts / visual indicators */}
                <div className="my-auto z-10 flex flex-col justify-center items-center h-full">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-display text-4xl font-bold text-white uppercase tracking-tight">
                      Active
                    </span>
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  </div>
                  <p className="font-mono text-xs text-neutral-400 tracking-widest text-center uppercase max-w-xs">
                    {item.highlight}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 z-10">
                  {item.stats.map((stat) => (
                    <div key={stat.label}>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase block">{stat.label}</span>
                      <span className="font-display text-sm font-semibold text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Narrative text Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs tracking-[0.25em] text-red-500 font-bold uppercase block">
                {item.tag}
              </span>
              <h3 className="font-display text-2xl md:text-4.5xl font-bold text-white tracking-tight leading-tight">
                {item.title}
              </h3>
              <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
              <div className="pt-4 flex gap-4">
                <span className="w-12 h-[1px] bg-red-500 self-center" />
                <span className="font-mono text-xs text-neutral-300 tracking-widest uppercase">
                  Fully Autonomous Delivery
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Pillars of Integrity */}
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-neutral-500 font-bold uppercase block mb-3">
            INTEGRITY & TRUST
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
            Designed for Real Use
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pil) => (
            <div key={pil.title} className="bg-neutral-900/40 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-white/10 hover:bg-neutral-900/80 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-center">
                {pil.icon}
              </div>
              <h4 className="font-display text-lg font-bold text-white tracking-wide">{pil.title}</h4>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                {pil.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordions Section */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-neutral-500 font-bold uppercase block mb-3">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${idx}`}
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-white font-display text-sm font-semibold tracking-wide hover:bg-neutral-950/40 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-none"
                >
                  <span>{faq.question}</span>
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 transition-transform">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>
                
                {isOpen && (
                  <div id={`faq-content-${idx}`} role="region" aria-labelledby={`faq-btn-${idx}`} className="px-6 pb-6 pt-1 border-t border-white/5 bg-neutral-950/20">
                    <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
