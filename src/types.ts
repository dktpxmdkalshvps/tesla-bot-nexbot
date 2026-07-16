export interface BotFinish {
  id: string;
  name: string;
  colorHex: string;
  accentHex: string;
  price: number;
  description: string;
  imageAlt: string;
}

export interface TaskModule {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  features: string[];
}

export interface BotUpgrade {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface TechSpecItem {
  label: string;
  value: string;
  details: string;
}

export interface TechSpecGroup {
  category: string;
  items: TechSpecItem[];
}
