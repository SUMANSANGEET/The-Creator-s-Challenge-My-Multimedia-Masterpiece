import { SceneConfig, Subsystem, ScienceDiscovery, BudgetComparison } from '../types/mission';

export const SCENES: SceneConfig[] = [
  {
    id: 'act-1-launch',
    actNumber: 1,
    title: 'Dawn Ignition at Sriharikota',
    subtitle: 'LVM3-M4 Heavy Lift-off into the Golden Dawn Sky',
    timeRange: [0, 6],
    location: 'Satish Dhawan Space Centre, Sriharikota, Bay of Bengal',
    lightingTone: 'warm-golden',
    cameraMotion: 'Sweeping upward aerial tilt & slow pan across launchpad',
    depthOfField: 'Foreground crowd silhouetted with soft focus; rocket pinned in sharp focal plane',
    imageSrc: '/src/assets/images/chandrayaan_dawn_launch_1793519391086.jpg',
    narration:
      'Sriharikota at dawn. As golden light crests the Bay of Bengal, the massive LVM3 launcher ignites with searing orange fury, carrying the hopes of 1.4 billion people toward the lunar frontier.',
    telemetry: {
      altitude: '14.2 km',
      velocity: '1,620 m/s (Mach 4.8)',
      stage: 'S200 Solid Boosters + L110 Liquid Core Burn',
      coordinates: '13.72° N, 80.23° E',
    },
    keyEvents: [
      'Simultaneous ignition of twin S200 solid rocket boosters',
      'Over 100,000 citizens and engineers watch along the Pulicat Lake coast',
      'Hyper-detailed golden exhaust plume billowing across the launch facility',
      'Insertion into nominal 170 x 36,500 km elliptical parking orbit',
    ],
  },
  {
    id: 'act-2-descent',
    actNumber: 2,
    title: 'The Polar Descent',
    subtitle: 'Vikram Enters the Hazardous Lunar South Pole',
    timeRange: [6, 12],
    location: 'Lunar South Pole, 69.37° S (Manzinus C Crater Rim)',
    lightingTone: 'cold-silver-blue',
    cameraMotion: 'Dramatic tracking descent camera following lander profile',
    depthOfField: 'Shallow focus on Vikram thruster bells; jagged crater ridges softly softened in background',
    imageSrc: '/src/assets/images/vikram_lunar_descent_1793519392081.jpg',
    narration:
      'Approaching the desolate south pole. Vikram fires its throttleable retro-thrusters, autonomously mapping jagged boulders and treacherous craters in the stark silver-blue shadows of eternity.',
    telemetry: {
      altitude: '12.8 m (Vertical Terminal Descent)',
      velocity: '0.78 m/s (Braking nominal)',
      stage: 'Fine Braking & Hazard Avoidance Maneuver',
      coordinates: '69.373° S, 32.319° E',
    },
    keyEvents: [
      'Rough braking phase sheds 1.68 km/s of orbital velocity',
      'Lander Hazard Detection and Avoidance Camera (LHDAC) evaluates landing site',
      'Four 800N liquid throttleable thrusters ignite into lunar vacuum',
      'Regolith dust curtain kicks outward as touchdown velocity reaches near zero',
    ],
  },
  {
    id: 'act-3-rollout',
    actNumber: 3,
    title: 'First Treads in Virgin Regolith',
    subtitle: 'Pragyan Rover Rollout onto Pristine Polar Soil',
    timeRange: [12, 16],
    location: 'Shiv Shakti Point, Lunar South Polar Highlands',
    lightingTone: 'cold-silver-blue',
    cameraMotion: 'Low macro-angle tracking rover wheel rotation down deployment ramp',
    depthOfField: 'Extreme macro shallow depth; crisp wheel cleat tracks in foreground dust',
    imageSrc: '/src/assets/images/pragyan_ramp_deployment_1793519392871.jpg',
    narration:
      'Touchdown confirmed. The two-segment ramp unfolds, and the six-wheeled Pragyan rover slowly crawls into the ancient grey regolith, embossing the Ashoka Chakra into the lunar surface.',
    telemetry: {
      altitude: 'Surface Contact (0.0 m)',
      velocity: '1.0 cm/s (Rocker-Bogie Drive)',
      stage: 'Ramp Deployment & Solar Array Extension',
      coordinates: 'Shiv Shakti Point (69.373° S, 32.319° E)',
    },
    keyEvents: [
      'Touchdown telemetry: 18:04 IST, August 23, 2023',
      'Ramp deployed with 26-kilogram Pragyan rover roll-down',
      'Rear wheels imprint Indian state emblem and ISRO insignia onto lunar soil',
      'Solar array deployed, pointing at low 6-degree polar sun angle',
    ],
  },
  {
    id: 'act-4-earthrise',
    actNumber: 4,
    title: 'The Tricolour on the Moon',
    subtitle: 'Shiv Shakti Point & The Majestic Earthrise Horizon',
    timeRange: [16, 20],
    location: 'Shiv Shakti Point — Panoramic View looking back to Earth',
    lightingTone: 'triumphant-contrast',
    cameraMotion: 'Slow majestic cinematic crane pull-back across lunar crater horizon',
    depthOfField: 'Deep cinematic documentary staging with radiant Earth framed above golden Vikram',
    imageSrc: '/src/assets/images/shiv_shakti_earthrise_1793519392150.jpg',
    narration:
      'As camera pulls back over the silent craters, the Indian Tricolour stands proudly in gold foil, with Earth glowing brilliant blue on the horizon. India has reached where no nation has gone before.',
    telemetry: {
      altitude: 'Lunar Surface',
      velocity: '0.0 m/s',
      stage: 'Mission Objective Accomplished: Science Phase Active',
      coordinates: 'Shiv Shakti Point, Moon (Named 26 August 2023)',
    },
    keyEvents: [
      '"India is now on the Moon" — historic proclamation heard across the globe',
      'First nation in human history to land in the lunar south polar zone',
      'Subsurface thermal probes and elemental laser spectrometers begin active discovery',
      'Earth seen glowing blue and serene across the southern lunar horizon',
    ],
  },
];

export const MISSION_METRICS = {
  landingDate: '23 August 2023',
  landingTimeIST: '18:04 IST (12:34 UTC)',
  landingSite: 'Shiv Shakti Point (69.373° S, 32.319° E)',
  totalMissionCost: '$75 Million USD (₹615 Crore)',
  launcher: 'LVM3-M4 (Launch Vehicle Mark-3)',
  payloadMass: '3,900 kg total (Propulsion: 2,148 kg, Lander: 1,752 kg with Rover)',
  lunarDayDuration: '14 Earth Days (Solar Powered)',
  countriesWithMoonLanding: 4, // USSR, USA, China, India
  countriesAtSouthPole: 1, // Only India
};

export const SUBSYSTEMS: Subsystem[] = [
  {
    id: 'vikram-lander',
    name: 'Vikram Lander Module',
    category: 'Vikram Lander',
    role: 'Autonomous Soft-Landing & Scientific Research Station',
    techDetails:
      'Features 4 throttleable liquid engines (800N each) burning monomethylhydrazine and MON-3. Fitted with advanced hazard detection cameras and reinforced landing legs designed to withstand vertical velocities up to 3.0 m/s.',
    historicalSignificance:
      'Engineered with extensive fail-safe redundancy ("failure-based design") following Chandrayaan-2 insights, enabling fully autonomous obstacle avoidance in low-light polar conditions.',
    specs: [
      { label: 'Dry Mass', value: '626 kg' },
      { label: 'Total Mass', value: '1,752 kg (with propellants)' },
      { label: 'Power Output', value: '738 Watts (Dual Gallium-Arsenide arrays)' },
      { label: 'Engines', value: '4 x 800N Throttleable Liquid Bi-propellant' },
      { label: 'Attitude Control', value: '8 x 58N RCS thrusters' },
    ],
  },
  {
    id: 'pragyan-rover',
    name: 'Pragyan Lunar Rover',
    category: 'Pragyan Rover',
    role: 'Mobile In-Situ Chemical & Mineralogical Explorer',
    techDetails:
      'A 6-wheeled robotic rover built on a custom Rocker-Bogie mechanical suspension system. Custom wheel cleats are stamped with the Lion Capital of Ashoka and ISRO logos to emboss them into the regolith with every rotation.',
    historicalSignificance:
      'Traversed over 100 meters across rugged polar terrain, confirming the unambiguous presence of elemental Sulfur and measuring lunar soil temperatures for the first time.',
    specs: [
      { label: 'Mass', value: '26 kg' },
      { label: 'Mobility Range', value: 'Up to 500 meters' },
      { label: 'Drive Speed', value: '1 cm per second' },
      { label: 'Power', value: '50 Watts (Solar Paneled Chassis)' },
      { label: 'Communications', value: 'Direct RF link to Vikram Lander' },
    ],
  },
  {
    id: 'chaste-payload',
    name: "ChaSTE (Chandra's Surface Thermophysical Experiment)",
    category: 'Vikram Lander',
    role: 'Subsurface Thermal Conductivity Probe',
    techDetails:
      'Equipped with 10 high-precision temperature sensors mounted on a penetrator mechanism capable of driving 10 cm deep into virgin lunar regolith.',
    historicalSignificance:
      'Discovered a dramatic thermal gradient at the south pole: from +50°C at the sunlit surface to -10°C just 8 cm below, proving the incredible insulating properties of lunar soil.',
    specs: [
      { label: 'Penetration Depth', value: 'Up to 100 mm' },
      { label: 'Sensor Count', value: '10 Precision Platinum RTDs' },
      { label: 'Temperature Range', value: '-200°C to +100°C' },
      { label: 'Data Resolution', value: '0.1°C thermal accuracy' },
    ],
  },
  {
    id: 'libs-payload',
    name: 'LIBS (Laser-Induced Breakdown Spectroscope)',
    category: 'Pragyan Rover',
    role: 'Elemental Composition Analyzer',
    techDetails:
      'Fires high-energy laser pulses onto lunar rocks and soil to generate hot micro-plasmas. Spectrographs analyze the light emitted to determine elemental signatures.',
    historicalSignificance:
      'Provided the first in-situ confirmation of Sulfur (S) on the lunar south pole, alongside Aluminum, Calcium, Iron, Chromium, Titanium, and Oxygen.',
    specs: [
      { label: 'Laser Source', value: 'Pulsed Nd:YAG Laser' },
      { label: 'Pulse Energy', value: 'High peak micro-plasma discharge' },
      { label: 'Spectral Range', value: '200 nm to 800 nm' },
      { label: 'Target Elements', value: 'S, Al, Ca, Fe, Cr, Ti, Mn, Si, O' },
    ],
  },
  {
    id: 'lvm3-rocket',
    name: 'LVM3 Launch Vehicle Mark-3',
    category: 'LVM3 Rocket',
    role: 'Heavy-Lift Geostationary Launch System',
    techDetails:
      'India’s most powerful operational rocket. Comprises two massive S200 solid rocket boosters, an L110 twin-Vikas liquid core stage, and the high-efficiency indigenous C25 cryogenic upper stage.',
    historicalSignificance:
      'Executed a flawless trajectory insertion with precision so tight that ISRO was able to conserve substantial propellant for extended orbital maneuvers.',
    specs: [
      { label: 'Height', value: '43.5 meters' },
      { label: 'Lift-off Mass', value: '640 tonnes' },
      { label: 'Payload to GTO', value: '4,000 kg' },
      { label: 'Cryogenic Stage', value: 'Indigenously developed CE-20 engine' },
    ],
  },
];

export const BUDGET_COMPARISONS: BudgetComparison[] = [
  {
    name: 'Chandrayaan-3 (Actual Moon Landing)',
    category: 'Space Mission',
    costMillionsUSD: 75,
    year: 2023,
    outcomeOrBoxOffice: 'Historic Soft-Landing at South Pole',
  },
  {
    name: 'Interstellar (Hollywood Movie)',
    category: 'Hollywood Film',
    costMillionsUSD: 165,
    year: 2014,
    outcomeOrBoxOffice: 'Christopher Nolan Sci-Fi Film',
  },
  {
    name: 'The Martian (Hollywood Movie)',
    category: 'Hollywood Film',
    costMillionsUSD: 108,
    year: 2015,
    outcomeOrBoxOffice: 'Ridley Scott Sci-Fi Film',
  },
  {
    name: 'Gravity (Hollywood Movie)',
    category: 'Hollywood Film',
    costMillionsUSD: 100,
    year: 2013,
    outcomeOrBoxOffice: 'Alfonso Cuarón Space Film',
  },
  {
    name: 'Luna-25 (Russian Lunar Lander)',
    category: 'Space Mission',
    costMillionsUSD: 200,
    year: 2023,
    outcomeOrBoxOffice: 'Failed descent 4 days prior',
  },
  {
    name: 'NASA Artemis Program (Total To Date)',
    category: 'Space Mission',
    costMillionsUSD: 93000,
    year: 2024,
    outcomeOrBoxOffice: 'Multi-year crewed lunar initiative',
  },
];

export const SCIENCE_DISCOVERIES: ScienceDiscovery[] = [
  {
    id: 'sulfur-discovery',
    title: 'First In-Situ Confirmation of Sulfur at Lunar South Pole',
    instrument: 'LIBS (Laser Induced Breakdown Spectroscope)',
    finding: 'Distinct spectral peaks of Sulfur (S) unambiguously recorded in the regolith near Shiv Shakti Point.',
    significance: 'Sulfur sheds critical light on the Moon’s volcanic past and thermal evolution, and can serve as raw material for waterless construction concrete in future lunar bases.',
    dataMetric: 'Detected: S, Al, Ca, Fe, Cr, Ti, Mn, Si, O',
  },
  {
    id: 'thermal-inversion',
    title: 'Extreme 60°C Subsurface Thermal Inversion',
    instrument: 'ChaSTE Thermal Probe',
    finding: 'Surface temperature measured at +50°C, plummeting sharply to -10°C just 8 centimeters below the surface.',
    significance: 'Demonstrates that lunar regolith is one of nature’s most effective thermal insulators, shielding underlying water ice deposits from sublimation.',
    dataMetric: 'Gradient: ΔT = 60°C within 80mm depth',
  },
  {
    id: 'lunar-hop',
    title: 'Historic In-Flight "Hop Experiment"',
    instrument: 'Vikram Lander Engine Re-ignition',
    finding: 'On command from Bengaluru, Vikram fired engines, elevated 40 cm, translated 30-40 cm sideways, and soft-landed again.',
    significance: 'Proves the capability to re-ignite rocket engines and lift off from the Moon—a foundational prerequisite for future sample-return and human return missions.',
    dataMetric: 'Hop Altitude: ~40 cm | Lateral shift: 35 cm',
  },
  {
    id: 'lunar-plasma',
    title: 'Sparse Lunar Surface Plasma Density',
    instrument: 'RAMBHA-LP (Langmuir Probe)',
    finding: 'Measured electron density of 5 to 30 million electrons per cubic meter near the south pole during daytime.',
    significance: 'Confirms that lunar surface plasma is relatively benign and will not severely impede optical and radio communications for future astronaut outposts.',
    dataMetric: 'Plasma density: 5 - 30 x 10^6 m⁻³',
  },
];

export const DESCENT_PHASES = [
  {
    phase: 'Rough Braking Phase',
    duration: '11.5 minutes',
    altitudeRange: '30 km down to 7.4 km',
    horizontalVelocity: 'Reduced from 1.68 km/s to 358 m/s',
    description: 'All 4 liquid engines fire at full thrust to shed nearly 80% of horizontal orbital velocity while tilting Vikram toward vertical orientation.',
  },
  {
    phase: 'Attitude Hold Phase',
    duration: '10 seconds',
    altitudeRange: '7.4 km down to 6.8 km',
    horizontalVelocity: '358 m/s to 336 m/s',
    description: 'Sensors align and verify spacecraft attitude with lunar horizon. Velocity and distance to surface calibrated by laser and radio altimeters.',
  },
  {
    phase: 'Fine Braking Phase',
    duration: '3.0 minutes',
    altitudeRange: '6.8 km down to 800 m / 150 m',
    horizontalVelocity: 'Dropped to 0 m/s (perfect vertical stance)',
    description: 'Vikram transitions to vertical posture. Position detection cameras photograph terrain to spot boulders, steep slopes, or deep shadows.',
  },
  {
    phase: 'Hazard Detection & Soft Touchdown',
    duration: '1.5 minutes',
    altitudeRange: '150 m down to 0 m',
    horizontalVelocity: 'Vertical speed cushioned to < 1.0 m/s',
    description: 'Autonomous Lander Hazard Detection and Avoidance Camera (LHDAC) selects final safe landing coordinates at Shiv Shakti Point; engines shut down 2m above ground.',
  },
];
