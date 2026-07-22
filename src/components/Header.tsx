import React, { useState, useEffect } from "react";
import { Cpu, Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  onPreOrderClick: () => void;
  activeSection: string;
}

export default function Header({ onPreOrderClick, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMobileMenuOpen(false);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "overview", label: "Overview" },
    { id: "technology", label: "Technology" },
    { id: "customizer", label: "Customizer" },
    { id: "specs", label: "Specifications" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-white text-neutral-950 transition-transform duration-300 group-hover:scale-105">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-widest text-white block">
              NEXBOT
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 block -mt-1">
              TESLA COLLABORATIVE
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`font-sans text-xs tracking-widest uppercase transition-all duration-300 relative py-1 cursor-pointer ${
                activeSection === item.id
                  ? "text-white font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="header-preorder-btn"
            onClick={onPreOrderClick}
            className="group flex items-center gap-2 bg-white text-neutral-950 font-display text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full hover:bg-neutral-200 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Pre-order
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          className="md:hidden text-white hover:text-neutral-300 focus-visible:ring-2 focus-visible:outline-none transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-neutral-950 border-b border-white/5 py-6 px-6 shadow-2xl transition-all duration-300">
          <div className="flex flex-col gap-5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left font-display text-sm tracking-wider uppercase py-2 border-b border-white/5 cursor-pointer ${
                  activeSection === item.id ? "text-white" : "text-neutral-400"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              id="mobile-preorder-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onPreOrderClick();
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-neutral-950 font-display text-xs font-bold tracking-wider uppercase py-3.5 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Pre-order Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
