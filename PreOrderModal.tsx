import { BotFinish, TaskModule, BotUpgrade, TechSpecGroup } from "./types";

export const FINISHES: BotFinish[] = [
  {
    id: "titanium",
    name: "Tesla Titanium",
    colorHex: "#D1D5DB",
    accentHex: "#EF4444",
    price: 0,
    description: "Sleek and brushed aerospace-grade titanium alloy with high-contrast red laser accents.",
    imageAlt: "Tesla Titanium Finish"
  },
  {
    id: "obsidian",
    name: "Obsidian Dark",
    colorHex: "#1F2937",
    accentHex: "#10B981",
    price: 1500,
    description: "Deep matte satin black with vibrant emerald green light rings and a carbon-fiber woven cover.",
    imageAlt: "Obsidian Dark Finish"
  },
  {
    id: "ceramic",
    name: "Ceramic Pearl",
    colorHex: "#F9FAFB",
    accentHex: "#3B82F6",
    price: 2200,
    description: "Pristine gloss ceramic white with active self-cleaning surface nanotechnology and dynamic blue laser lines.",
    imageAlt: "Ceramic Pearl Finish"
  },
  {
    id: "cyber-gold",
    name: "Cyber Anodized Gold",
    colorHex: "#F59E0B",
    accentHex: "#F43F5E",
    price: 4500,
    description: "Ultra-limited series gold anodized exterior shell. High-gloss polished finish designed to stand out.",
    imageAlt: "Cyber Anodized Gold Finish"
  }
];

export const TASK_MODULES: TaskModule[] = [
  {
    id: "companion",
    name: "Companion & Care",
    description: "Designed for warm, supportive physical assistance, personal companionship, and automated health monitoring.",
    price: 3000,
    icon: "Heart",
    features: [
      "Gentle 5-axis haptic hands with skin-mimicking texture",
      "Thermal vitals scanner and early anomaly detection",
      "Soft-voiced conversational speech (custom voices available)",
      "Emergency medical alerts & companion follow-me protocols"
    ]
  },
  {
    id: "kitchen",
    name: "Culinary & Kitchen",
    description: "Fully certified NSF-grade food preparation module with high thermal resistance and precision fluid manipulation.",
    price: 4500,
    icon: "ChefHat",
    features: [
      "Dual induction-safe hands for active pan cooking",
      "Calibrated taste & volatile odor chemical analysis sensors",
      "Automatic cooking tool integration (knives, spatulas, mixers)",
      "Sterilized steam-wash self-cleaning capabilities"
    ]
  },
  {
    id: "security",
    name: "Sentinel Guard",
    description: "Equipped with advanced 360° LiDAR patrols, real-time threat detection, and encrypted local security dispatch.",
    price: 3500,
    icon: "ShieldAlert",
    features: [
      "Infrared thermal vision and low-light vision amplifiers",
      "Encrypted satellite backlink and custom geofencing patrols",
      "Autonomous home perimeter mapping and object tagging",
      "Instant security alert and audio deterrent broadcast"
    ]
  },
  {
    id: "industrial",
    name: "Industrial & Logistics",
    description: "Strengthened core hydraulics and high-grade armor designed for heavy lifting, manufacturing, and rough environments.",
    price: 5000,
    icon: "Hammer",
    features: [
      "Reinforced joint support carrying up to 80kg load",
      "Arc welding and soldering safety certifications",
      "Particulate filtration and waterproofing (IP67 certification)",
      "Predictive industrial machinery diagnostics logger"
    ]
  }
];

export const UPGRADES: BotUpgrade[] = [
  {
    id: "battery-long",
    name: "Long-Range Solid-State Core",
    description: "Upgrades internal batteries from standard 8 hours to 16 hours of continuous high-load work.",
    price: 2500
  },
  {
    id: "haptic-gloves",
    name: "Nano-Sensory Tactile Hands",
    description: "Equips mechanical hands with 4,096 tactile sensors per square centimeter for handling extremely delicate work.",
    price: 1800
  },
  {
    id: "neural-cloud",
    name: "Tesla Neural Cloud Subscription",
    description: "Enables continuous real-time model updates, synthetic spatial simulation trials, and custom gesture learning.",
    price: 1500
  }
];

export const TECH_SPECS: TechSpecGroup[] = [
  {
    category: "Physical & Dimensions",
    items: [
      {
        label: "Height",
        value: "173 cm (5'8\")",
        details: "Human-proportioned structure, ideally matched to navigate home and commercial doorways."
      },
      {
        label: "Total Weight",
        value: "56.5 kg (125 lbs)",
        details: "Optimized through lightweight carbon-fiber skin and aircraft-grade honeycombed titanium."
      },
      {
        label: "Walking Speed",
        value: "8.5 km/h (5.3 mph)",
        details: "Natural dynamic humanoid balance utilizing a fast heel-to-toe stride."
      },
      {
        label: "Carrying Capacity",
        value: "25 kg (55 lbs)",
        details: "Dual-arm lifting weight capable of carrying heavy boxes, groceries, or luggage effortlessly."
      }
    ]
  },
  {
    category: "Neural Compute & AI",
    items: [
      {
        label: "Processor",
        value: "Dual Tesla HW5 Neural Chip",
        details: "Liquid-cooled hardware running local deep learning models with 1,200 TFLOPS inference."
      },
      {
        label: "Sensors & Vision",
        value: "360° Multi-spectral LiDAR",
        details: "Provides dynamic depth maps, pedestrian prediction, and instant millimeter accurate path planning."
      },
      {
        label: "Connectivity",
        value: "Global Starlink Link + 6G",
        details: "Maintains a constant secure connection for automatic fleet-wide learning and system upgrades."
      },
      {
        label: "Acoustic System",
        value: "Beamforming Spatial Array",
        details: "4 premium microphones isolate human speech from complex background noise for commands."
      }
    ]
  },
  {
    category: "Actuation & Power",
    items: [
      {
        label: "Degrees of Freedom",
        value: "40 Joint DOFs",
        details: "28 in the structural chassis, 12 in the multi-jointed hands providing natural manual flexibility."
      },
      {
        label: "Solid-State Battery",
        value: "2.3 kWh Core Power",
        details: "Thermal-controlled solid-state battery cells designed for maximum density and fire safety."
      },
      {
        label: "Actuators",
        value: "Tesla Strain Wave Gears",
        details: "Custom-designed high torque density actuators with integrated micro strain gauges."
      },
      {
        label: "Grip Force Range",
        value: "0.1 N to 150 N Max",
        details: "Can pick up a raw egg, write with a pencil, or hold heavy power tools without slipping."
      }
    ]
  }
];
