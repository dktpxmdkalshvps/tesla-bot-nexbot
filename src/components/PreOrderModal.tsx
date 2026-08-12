import React, { useState, useEffect } from "react";
import { X, Check, Receipt, CreditCard, ShieldCheck, Mail, User, Phone, MapPin, Loader2, ChevronDown, Copy } from "lucide-react";
import { BotFinish, TaskModule, BotUpgrade } from "../types";

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: {
    finish: BotFinish;
    module: TaskModule;
    upgrades: BotUpgrade[];
    totalPrice: number;
    ledColor: string;
  } | null;
}

export default function PreOrderModal({ isOpen, onClose, config }: PreOrderModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "South Korea",
    agreeTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.agreeTerms) return;

    setIsSubmitting(true);

    // Simulate luxury API call delay
    setTimeout(() => {
      const generatedId = `TX-BOT-${Math.floor(100000 + Math.random() * 900000)}`;
      setReservationId(generatedId);
      setIsSubmitting(false);
    }, 1500);
  };

  const countries = ["South Korea", "United States", "Japan", "Germany", "United Kingdom", "United Arab Emirates", "Singapore"];

  const handleCopyId = () => {
    if (reservationId) {
      navigator.clipboard.writeText(reservationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh] transition-all duration-300 scale-100"
      >
        
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-white/5 bg-neutral-950">
          <div>
            <h3 id="modal-title" className="font-display text-lg font-bold text-white tracking-wider uppercase">
              {reservationId ? "Reservation Confirmed" : "Secure Your Pre-order"}
            </h3>
            <p className="font-sans text-xs text-neutral-400">
              {reservationId ? "Thank you for joining the humanoid revolution" : "Fully refundable $100 deposit required"}
            </p>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            title="Close (Esc)"
            className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white focus-visible:ring-2 focus-visible:outline-none transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-8 space-y-6">
          
          {reservationId ? (
            /* SUCCESS & RECEIPT VIEW */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-2xl font-bold text-white">Tesla Nexbot Reserved</h4>
                <p className="font-sans text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Your reservation is officially registered. A dedicated concierge will contact you at <span className="font-medium text-white">{formData.email}</span> within 24 hours to finalize details.
                </p>
              </div>

              {/* Receipt Plate */}
              <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 text-left max-w-md mx-auto space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/5 font-mono text-[10px] text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span>RECEIPT NO: {reservationId}</span>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      aria-label="Copy receipt number to clipboard"
                      title="Copy Receipt Number"
                      className="text-neutral-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <span>DATE: {new Date().toLocaleDateString()}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Reserved For</span>
                    <span className="text-white font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Model Series</span>
                    <span className="text-white font-medium">Nexbot Optimus v2.0</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Task Module Core</span>
                    <span className="text-white font-medium">{config ? config.module.name : "Companion & Care"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Est. Ship Date</span>
                    <span className="text-white font-medium">Q4 2026</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-white/10 flex justify-between items-baseline">
                  <div className="text-xs">
                    <span className="text-neutral-400 block">Total Est. Price</span>
                    <span className="font-mono text-sm text-neutral-400">${config ? config.totalPrice.toLocaleString() : "19,900"}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-400 text-[10px] block uppercase">Deposit Paid</span>
                    <span className="font-mono text-lg font-bold text-emerald-500">$100.00</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] text-neutral-500 font-sans justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Fully secured refundable holding deposit</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-white hover:bg-neutral-200 text-neutral-950 font-display text-xs font-semibold tracking-widest uppercase px-8 py-3 rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Close Portal
              </button>
            </div>
          ) : (
            /* FORM & PREVIEW CONFIG VIEW */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Form Input Columns */}
              <form onSubmit={handleSubmit} className="md:col-span-7 space-y-5">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="font-display text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                    Full Name <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      id="fullName"
                      type="text"
                      required
                      autoFocus
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-11 pr-4 font-sans text-sm text-white placeholder-neutral-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="emailAddress" className="font-display text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                    Email Address <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      id="emailAddress"
                      type="email"
                      required
                      placeholder="jane.doe@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value.replace(/[<>]/g, '') })}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-11 pr-4 font-sans text-sm text-white placeholder-neutral-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phoneNumber" className="font-display text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      id="phoneNumber"
                      type="tel"
                      placeholder="+82 10-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-11 pr-4 font-sans text-sm text-white placeholder-neutral-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="installationCountry" className="font-display text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                    Installation Country
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <select
                      id="installationCountry"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-11 pr-10 font-sans text-sm text-white transition-colors appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:border-transparent"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c} className="bg-neutral-900 text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                  </div>
                </div>

                <div className="pt-2">
                  <label htmlFor="agreeTerms" className="flex items-start gap-3 cursor-pointer group">
                    <input
                      id="agreeTerms"
                      type="checkbox"
                      required
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className={`w-5 h-5 rounded flex items-center justify-center border flex-shrink-0 transition-colors mt-0.5 peer-focus-visible:ring-2 peer-focus-visible:ring-white/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-950 ${
                      formData.agreeTerms ? "bg-white border-white text-neutral-950" : "border-white/20"
                    }`}>
                      {formData.agreeTerms && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    </div>
                    <span className="font-sans text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed">
                      I agree to the holding deposit policy ($100 refundable anytime prior to shipping invitation) and terms of service. <span className="text-red-500" aria-hidden="true">*</span>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white hover:bg-neutral-200 disabled:opacity-50 text-neutral-950 font-display text-xs font-bold tracking-widest uppercase py-4 rounded-xl transition-all duration-200 mt-2 cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing Deposit...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Submit Reservation
                    </>
                  )}
                </button>
              </form>

              {/* Order configuration overview card (right) */}
              <div className="md:col-span-5 bg-neutral-950 rounded-2xl border border-white/5 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 pb-2.5 border-b border-white/5 mb-4">
                    <Receipt className="w-4 h-4 text-neutral-400" />
                    <span className="font-display text-[10px] font-bold text-white uppercase tracking-wider">ORDER SUMMARY</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase block">PLATFORM</span>
                      <span className="font-display text-sm font-semibold text-white">Nexbot Optimus v2.0</span>
                    </div>

                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase block">FINISH ARMOR</span>
                      <span className="font-display text-sm font-semibold text-white">
                        {config ? config.finish.name : "Tesla Titanium"}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase block">AI CORE UNIT</span>
                      <span className="font-display text-sm font-semibold text-white">
                        {config ? config.module.name : "Companion & Care"}
                      </span>
                    </div>

                    {config && config.upgrades.length > 0 && (
                      <div>
                        <span className="font-mono text-[9px] text-neutral-500 uppercase block mb-1">UPGRADES</span>
                        <div className="space-y-1">
                          {config.upgrades.map((u) => (
                            <div key={u.id} className="font-sans text-[11px] text-neutral-400 flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-neutral-600" />
                              <span>{u.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-display text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Est. Price</span>
                    <span className="font-mono text-base font-bold text-white">
                      ${config ? config.totalPrice.toLocaleString() : "19,900"}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-display text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Pre-order Holding fee</span>
                    <span className="font-mono text-lg font-bold text-red-500">$100</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
