export interface SceneConfig {
  id: string;
  actNumber: number;
  title: string;
  subtitle: string;
  timeRange: [number, number]; // in seconds, e.g. [0, 6]
  location: string;
  lightingTone: 'warm-golden' | 'cold-silver-blue' | 'triumphant-contrast';
  cameraMotion: string;
  depthOfField: string;
  imageSrc: string;
  narration: string;
  telemetry: {
    altitude: string;
    velocity: string;
    stage: string;
    coordinates: string;
  };
  keyEvents: string[];
}

export interface Subsystem {
  id: string;
  name: string;
  category: 'Vikram Lander' | 'Pragyan Rover' | 'LVM3 Rocket';
  role: string;
  techDetails: string;
  historicalSignificance: string;
  specs: { label: string; value: string }[];
}

export interface ScienceDiscovery {
  id: string;
  title: string;
  instrument: string;
  finding: string;
  significance: string;
  dataMetric: string;
}

export interface BudgetComparison {
  name: string;
  category: 'Space Mission' | 'Hollywood Film';
  costMillionsUSD: number;
  year: number;
  outcomeOrBoxOffice: string;
}
