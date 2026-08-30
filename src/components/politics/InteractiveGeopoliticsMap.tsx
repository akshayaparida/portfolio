"use client";

import React, { useState } from "react";

export interface StrategicHotspot {
  id: string;
  name: string;
  front:
    | "Northern (LAC)"
    | "Western (LoC/IB)"
    | "Southern Maritime (IOR)"
    | "Eastern (Myanmar)"
    | "Strategic Corridor";
  category: "lac" | "loc" | "ior" | "myanmar" | "corridor";
  x: number; // coordinates in SVG viewBox (950 x 850)
  y: number;
  opposingParty: string;
  significance: string;
  forcePosture: string;
  keyAssets: string[];
  infrastructure: string[];
  status:
    | "Active Vigil"
    | "High Alert"
    | "Strategic Chokepoint"
    | "Under Construction"
    | "Illegally Occupied";
}

export const strategicHotspots: StrategicHotspot[] = [
  {
    id: "aksai-chin-g219",
    name: "Aksai Chin (Chinese-Occupied Ladakh Plateau)",
    front: "Northern (LAC)",
    category: "lac",
    x: 345,
    y: 95,
    opposingParty:
      "China (PLA Western Theater Command / Xinjiang Military District)",
    significance:
      "38,000 sq km of Indian territory in Ladakh illegally occupied by China since the 1950s/1962. Traversed by China's strategic National Highway G219 connecting Tibet with Xinjiang. Features extensive PLA subterranean fortifications, hardened aircraft shelters at Hotan/Ngari Gunsa, and surface-to-air missile batteries.",
    forcePosture:
      "Indian Army 14 Corps forward deployment, K9 Vajra 155mm self-propelled howitzers, T-90 Bhishma tanks, and Dhanush artillery regiments mirroring Chinese positions along the LAC.",
    keyAssets: [
      "T-90 Bhishma Tank Regiments",
      "K9 Vajra 155mm Howitzers",
      "Akash Prime SAM Squadrons",
      "P-8I High-Altitude Reconnaissance",
    ],
    infrastructure: [
      "Nyoma Fighter Airfield Upgrade",
      "Shyok-DBO All-Weather Axis",
      "Vibrant Villages Network",
    ],
    status: "Illegally Occupied",
  },
  {
    id: "pok-gilgit-cpec",
    name: "Pakistan-Occupied Kashmir (PoK) & Gilgit-Baltistan",
    front: "Western (LoC/IB)",
    category: "loc",
    x: 200,
    y: 75,
    opposingParty:
      "Pakistan Army (10 Corps & FCNA) / China (CPEC Infrastructure)",
    significance:
      "Sovereign Indian territory illegally occupied by Pakistan since 1947. Forms the land transit corridor for the China-Pakistan Economic Corridor (CPEC) and Karakoram Highway linking Kashgar to Gwadar. Houses terror launchpads (LeT/JeM) along the Neelum and Lipa valleys.",
    forcePosture:
      "High-density Indian counter-infiltration grid, Swathi weapon locating radars, automated thermal sensors, and integrated multi-tier artillery fire coordination.",
    keyAssets: [
      "Swathi Weapon Locating Radars",
      "Special Forces Ghatak Platoons",
      "Integrated Drone Jamming Systems",
    ],
    infrastructure: [
      "CIBMS Smart Laser Fencing",
      "Zojila & Z-Morh Tunnels",
      "Forward Defense Helipads",
    ],
    status: "Illegally Occupied",
  },
  {
    id: "shaksgam-valley",
    name: "Shaksgam Valley (Trans-Karakoram Tract Ceded to China)",
    front: "Northern (LAC)",
    category: "lac",
    x: 265,
    y: 40,
    opposingParty: "China & Pakistan (Illegally Ceded in 1963)",
    significance:
      "5,180 sq km tract of northern Jammu & Kashmir illegally ceded by Pakistan to China under the 1963 Sino-Pakistan boundary pact. Recent Chinese military road construction directly threatens Siachen's northern flanks (Indira Col) and the Karakoram Pass.",
    forcePosture:
      "Operation Meghdoot high-altitude mountain positions, satellite optical surveillance, and long-range airborne radar sweeps.",
    keyAssets: [
      "High-Altitude Satellite Tracking",
      "Siachen Glacial Troops",
      "Airborne Multi-Sensor Drones",
    ],
    infrastructure: [
      "Northern Glacial All-Weather Routes",
      "Specialized High-Altitude Survival Shelters",
    ],
    status: "Illegally Occupied",
  },
  {
    id: "lac-depsang-galwan",
    name: "Depsang Plains & Galwan Valley (Eastern Ladakh)",
    front: "Northern (LAC)",
    category: "lac",
    x: 295,
    y: 120,
    opposingParty: "China (PLA Western Theater Command)",
    significance:
      "Strategic plateau dominating access to the Daulat Beg Oldie (DBO) advanced landing ground and Karakoram Pass. Crucial buffer preventing Chinese-Pakistani collusion.",
    forcePosture:
      "Mirror deployment of 50,000+ Indian Army troops, T-90 Bhishma main battle tanks, K9 Vajra artillery, and S-400 Triumf air defense batteries.",
    keyAssets: [
      "T-90 Bhishma Tanks",
      "K9 Vajra Howitzers",
      "S-400 Squadrons",
      "P-8I Reconnaissance",
    ],
    infrastructure: [
      "Darbuk-Shyok-DBO All-Weather Road",
      "Nyoma Advanced Landing Ground Upgrade",
      "Vibrant Villages Solar Grid",
    ],
    status: "Active Vigil",
  },
  {
    id: "lac-tawang-arunachal",
    name: "Tawang & Yangtse Ridge (Arunachal Pradesh)",
    front: "Northern (LAC)",
    category: "lac",
    x: 740,
    y: 275,
    opposingParty: "China (PLA Eastern Theater Command)",
    significance:
      "High-altitude ridge commanding the McMahon Line in the Eastern Sector. Historical Buddhist monastery hub fiercely defended against repeated Chinese intrusion bids.",
    forcePosture:
      "High-altitude mountain strike corps, BrahMos supersonic cruise missile batteries, and Su-30MKI fighter jets based at Tezpur/Chabua.",
    keyAssets: [
      "BrahMos Missile Regiments",
      "Su-30MKI Fighters",
      "LCH Prachand Combat Helicopters",
    ],
    infrastructure: [
      "Sela Tunnel (World's longest twin-lane tunnel at 13,000 ft)",
      "Nechiphu Tunnel",
      "Frontier Highway",
    ],
    status: "High Alert",
  },
  {
    id: "loc-kashmir-siachen",
    name: "Line of Control (LoC) & Siachen Glacier",
    front: "Western (LoC/IB)",
    category: "loc",
    x: 245,
    y: 105,
    opposingParty: "Pakistan (Pak Army 10 Corps & ISI)",
    significance:
      "World's highest battlefield at 20,000 ft. Denies Pakistan and China physical territorial linkup between Gilgit-Baltistan and Shaksgam Valley.",
    forcePosture:
      "Operation Meghdoot permanent glacier posts, Anti-Infiltration Obstacle System (AIOS), BFSR battlefield radars, and anti-drone electronic jamming grids.",
    keyAssets: [
      "Artillery Gun Regiments",
      "Thermal Imaging AIOS Grid",
      "Anti-Drone Kinetic Jammers",
    ],
    infrastructure: [
      "Zojila Tunnel (All-weather Ladakh link)",
      "CIBMS Laser Smart Fencing",
      "High-altitude Fiber Optic Network",
    ],
    status: "High Alert",
  },
  {
    id: "sir-creek-punjab-ib",
    name: "Punjab Border & Sir Creek Marshlands",
    front: "Western (LoC/IB)",
    category: "loc",
    x: 170,
    y: 350,
    opposingParty: "Pakistan (Pak Rangers & Maritime Security Agency)",
    significance:
      "Marshland dispute in Gujarat along the 24th parallel and dense agricultural border in Punjab targeted for cross-border drone arms and narcotics delivery.",
    forcePosture:
      "Border Security Force (BSF) water-wing hovercraft patrols, fast interceptor boats, and automated drone capture radars.",
    keyAssets: [
      "BSF Fast Patrol Hovercrafts",
      "DRDO Anti-Drone Systems",
      "Thermal Sensor Towers",
    ],
    infrastructure: [
      "Integrated Check Posts (Attari)",
      "Floodlit Smart Border Fencing",
      "Coastal Radar Chain",
    ],
    status: "Active Vigil",
  },
  {
    id: "anc-malacca-surveillance",
    name: "Andaman & Nicobar Command (ANC) - Malacca Strait",
    front: "Southern Maritime (IOR)",
    category: "ior",
    x: 770,
    y: 690,
    opposingParty: "China (PLAN Submarines & Research Vessels)",
    significance:
      "India's tri-service sentinel command anchoring the Western entrance of the Strait of Malacca, where 80%+ of China's maritime crude oil imports transit.",
    forcePosture:
      "Tri-service Command with runway extensions hosting P-8I maritime patrol aircraft, fighter squadrons, and frontline missile destroyers.",
    keyAssets: [
      "INS Baaz Runway",
      "P-8I Poseidon Sub-Hunters",
      "P-15B Stealth Destroyers",
      "Naval Drone Squadrons",
    ],
    infrastructure: [
      "Great Nicobar International Transshipment Port",
      "Undersea Submarine Sensor Array",
      "Deep-Water Berthing Wharfs",
    ],
    status: "Strategic Chokepoint",
  },
  {
    id: "ins-jatayu-arabian-sea",
    name: "INS Jatayu & Lakshadweep Outpost (Minicoy)",
    front: "Southern Maritime (IOR)",
    category: "ior",
    x: 215,
    y: 720,
    opposingParty: "Indian Ocean Piracy & Chinese Maritime Incursions",
    significance:
      "Strategic island base commanding the 9-Degree Channel connecting Gulf energy routes to Southeast Asia. Enhanced surveillance across the Arabian Sea and Maldives corridor.",
    forcePosture:
      "Commissioned in 2024 as a forward operational naval base with radar chains, fast attack craft, and airfield upgrade plans.",
    keyAssets: [
      "INS Jatayu Naval Air Base",
      "Fast Attack Crafts",
      "Coastal Radar Chain Station",
    ],
    infrastructure: [
      "Minicoy Island Airfield Expansion",
      "Desalination & Solar Power Plants",
      "Helicopter Hangars",
    ],
    status: "Strategic Chokepoint",
  },
  {
    id: "myanmar-fmr-moreh",
    name: "Indo-Myanmar Frontier (Moreh - Tamu Transit)",
    front: "Eastern (Myanmar)",
    category: "myanmar",
    x: 820,
    y: 350,
    opposingParty: "Myanmar Junta / Insurgent Armed Groups / Narco Syndicates",
    significance:
      "Crucial land gateway for the Act East Policy (India-Myanmar-Thailand Trilateral Highway). Border fortified post-revocation of the Free Movement Regime (FMR).",
    forcePosture:
      "Assam Rifles battalions, biometric border check-gates, and joint counter-insurgency operational sweeps.",
    keyAssets: [
      "Assam Rifles Border Battalions",
      "Biometric Identification Gates",
      "Thermal Night Scopes",
    ],
    infrastructure: [
      "₹31,000 Cr Smart Border Fencing Project (1,643 km)",
      "Integrated Check Post Moreh",
      "Border Helipads",
    ],
    status: "Under Construction",
  },
  {
    id: "imec-chabahar-corridor",
    name: "IMEC Trade Corridor & Chabahar Port Gateway",
    front: "Strategic Corridor",
    category: "corridor",
    x: 100,
    y: 430,
    opposingParty: "Geopolitical Alternative to China's BRI / CPEC",
    significance:
      "Strategic multimodal transit artery: India-Middle East-Europe Economic Corridor (IMEC) via UAE/Saudi/Israel and India-operated Shahid Beheshti terminal at Chabahar (Iran) to bypass Pakistan into Central Asia.",
    forcePosture:
      "10-year bilateral port operation agreement with Iran; joint defense escort coordination in Arabian Sea merchant lanes.",
    keyAssets: [
      "Shahid Beheshti Terminal (Chabahar)",
      "Kandla & Mundra Port Terminals",
      "Western Dedicated Freight Corridor",
    ],
    infrastructure: [
      "Chabahar-Zahedan Rail Link",
      "IMEC High-Speed Data & Hydrogen Pipeline",
      "Green Shipping Corridors",
    ],
    status: "Strategic Chokepoint",
  },
];

export default function InteractiveGeopoliticsMap() {
  const [selectedHotspot, setSelectedHotspot] = useState<StrategicHotspot>(
    strategicHotspots[0],
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredHotspots = strategicHotspots.filter(
    (h) => activeCategory === "all" || h.category === activeCategory,
  );

  return (
    <div className="pol-map-wrapper">
      {/* Map Header & Interactive Filter Bar */}
      <div className="pol-map-top-bar">
        <div className="pol-map-heading">
          <div className="pol-radar-indicator">
            <span className="pol-radar-dot"></span>
            <span className="pol-radar-ping"></span>
          </div>
          <div>
            <h3 className="pol-map-title">
              Interactive Strategic Security &amp; Geopolitical Map of India
            </h3>
            <p className="pol-map-subtitle">
              Click any pulsating tactical radar beacon, disputed border line,
              or occupied territory to inspect real-time force postures,
              flashpoints, and strategic defense infrastructure.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pol-map-filters">
          <button
            onClick={() => setActiveCategory("all")}
            className={`pol-map-filter-btn ${activeCategory === "all" ? "active" : ""}`}
          >
            All Sectors ({strategicHotspots.length})
          </button>
          <button
            onClick={() => setActiveCategory("lac")}
            className={`pol-map-filter-btn ${activeCategory === "lac" ? "active" : ""}`}
          >
            🏔️ LAC &amp; Aksai Chin
          </button>
          <button
            onClick={() => setActiveCategory("loc")}
            className={`pol-map-filter-btn ${activeCategory === "loc" ? "active" : ""}`}
          >
            ⚔️ LoC &amp; PoK
          </button>
          <button
            onClick={() => setActiveCategory("ior")}
            className={`pol-map-filter-btn ${activeCategory === "ior" ? "active" : ""}`}
          >
            🌊 Maritime (IOR)
          </button>
          <button
            onClick={() => setActiveCategory("myanmar")}
            className={`pol-map-filter-btn ${activeCategory === "myanmar" ? "active" : ""}`}
          >
            🌿 Myanmar Frontier
          </button>
          <button
            onClick={() => setActiveCategory("corridor")}
            className={`pol-map-filter-btn ${activeCategory === "corridor" ? "active" : ""}`}
          >
            🚢 IMEC / Chabahar
          </button>
        </div>
      </div>

      {/* Main Split Layout: Interactive Vector Map + Tactical Dossier Card */}
      <div className="pol-map-split-grid">
        {/* Left: Vector Map Container */}
        <div className="pol-map-canvas-card">
          <div className="pol-map-canvas-inner">
            <svg
              viewBox="0 0 950 850"
              className="pol-svg-map"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Subtle Grid Pattern */}
                <pattern
                  id="tacticalGrid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="0.6"
                    strokeDasharray="2,2"
                  />
                </pattern>

                {/* Pattern for PoK / Gilgit-Baltistan (Amber/Rose Diagonal Hatching) */}
                <pattern
                  id="pokHatch"
                  width="8"
                  height="8"
                  patternTransform="rotate(45 0 0)"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="8"
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                    opacity="0.6"
                  />
                </pattern>

                {/* Pattern for Aksai Chin (Red Diagonal Crossed Hatching) */}
                <pattern
                  id="aksaiChinHatch"
                  width="8"
                  height="8"
                  patternTransform="rotate(-45 0 0)"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="8"
                    stroke="#ef4444"
                    strokeWidth="1.2"
                    opacity="0.6"
                  />
                </pattern>

                {/* Pattern for Shaksgam Valley (Purple Hatching) */}
                <pattern
                  id="shaksgamHatch"
                  width="6"
                  height="6"
                  patternTransform="rotate(30 0 0)"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="6"
                    stroke="#a855f7"
                    strokeWidth="1.1"
                    opacity="0.7"
                  />
                </pattern>
              </defs>

              {/* Background Grid & Sea Lanes */}
              <rect
                width="100%"
                height="100%"
                fill="url(#tacticalGrid)"
                opacity="0.6"
              />

              {/* Maritime Sea Lanes & EEZ Indicators */}
              <g
                className="pol-sea-lanes"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4,4"
              >
                <path
                  d="M 60 480 Q 200 700 770 700"
                  fill="none"
                  opacity="0.4"
                />
                <path d="M 770 700 L 920 700" fill="none" opacity="0.4" />
                <text x="100" y="660" className="pol-svg-watermark">
                  ARABIAN SEA
                </text>
                <text x="560" y="550" className="pol-svg-watermark">
                  BAY OF BENGAL
                </text>
                <text x="380" y="790" className="pol-svg-watermark">
                  INDIAN OCEAN (IOR)
                </text>
              </g>

              {/* Sovereign Map Vector Silhouette of India (Constitutional Boundary of India) */}
              <g className="pol-india-silhouette">
                {/* Main Sovereign Landmass Outline */}
                <path
                  d="M 285 45 
                     L 340 75 L 385 85 L 360 145 L 350 170 L 400 175 L 430 200 L 470 205 L 500 230 
                     L 540 235 L 580 230 L 600 260 L 650 250 L 710 240 L 760 230 L 800 250 L 840 280
                     L 850 320 L 830 360 L 810 390 L 780 370 L 760 340 L 730 350 L 700 370 L 660 360
                     L 630 380 L 600 420 L 590 460 L 550 490 L 530 530 L 500 580 L 470 630 L 430 680
                     L 400 730 L 375 755 L 350 720 L 330 670 L 300 620 L 270 560 L 240 500 L 200 460
                     L 150 450 L 130 420 L 160 380 L 180 340 L 170 300 L 200 260 L 220 220 L 210 180
                     L 240 140 L 210 100 L 230 65 Z"
                  className="pol-map-landmass"
                />

                {/* Shaded Territory: Pakistan Occupied Kashmir (PoK) & Gilgit-Baltistan */}
                <path
                  data-testid="pok-zone"
                  d="M 230 65 L 285 45 L 265 80 L 245 105 L 215 130 L 205 165 L 185 160 L 195 130 L 210 100 Z"
                  fill="url(#pokHatch)"
                  stroke="#f59e0b"
                  strokeWidth="1.2"
                  className="pol-occupied-zone"
                  onClick={() => {
                    const hotspot = strategicHotspots.find(
                      (h) => h.id === "pok-gilgit-cpec",
                    );
                    if (hotspot) setSelectedHotspot(hotspot);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <title>
                    Pakistan-Occupied Kashmir (PoK) &amp; Gilgit-Baltistan
                    (Illegally Occupied)
                  </title>
                </path>

                {/* Shaded Territory: Aksai Chin (Chinese Occupied Ladakh) */}
                <path
                  data-testid="aksai-chin-zone"
                  d="M 340 75 L 385 85 L 360 145 L 315 135 L 330 95 Z"
                  fill="url(#aksaiChinHatch)"
                  stroke="#ef4444"
                  strokeWidth="1.2"
                  className="pol-occupied-zone"
                  onClick={() => {
                    const hotspot = strategicHotspots.find(
                      (h) => h.id === "aksai-chin-g219",
                    );
                    if (hotspot) setSelectedHotspot(hotspot);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <title>Aksai Chin (Chinese-Occupied Ladakh Plateau)</title>
                </path>

                {/* Shaded Territory: Shaksgam Valley (Ceded to China 1963) */}
                <path
                  data-testid="shaksgam-zone"
                  d="M 285 45 L 340 75 L 305 70 L 265 80 Z"
                  fill="url(#shaksgamHatch)"
                  stroke="#a855f7"
                  strokeWidth="1.1"
                  className="pol-occupied-zone"
                  onClick={() => {
                    const hotspot = strategicHotspots.find(
                      (h) => h.id === "shaksgam-valley",
                    );
                    if (hotspot) setSelectedHotspot(hotspot);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <title>
                    Shaksgam Valley (Trans-Karakoram Tract Ceded to China in
                    1963)
                  </title>
                </path>

                {/* Sovereign Territories Labels */}
                <g className="pol-region-labels">
                  <text x="145" y="85" className="pol-map-region-tag pok">
                    PoK (Gilgit-Baltistan)
                  </text>
                  <text x="360" y="70" className="pol-map-region-tag china">
                    Aksai Chin (China Occ.)
                  </text>
                  <text x="270" y="32" className="pol-map-region-tag shaksgam">
                    Shaksgam (Ceded 1963)
                  </text>
                  <text x="265" y="165" className="pol-map-region-tag india">
                    Ladakh
                  </text>
                  <text x="195" y="195" className="pol-map-region-tag india">
                    J&amp;K
                  </text>
                  <text x="730" y="245" className="pol-map-region-tag india">
                    Arunachal Pradesh
                  </text>
                  <text x="590" y="245" className="pol-map-region-tag india">
                    Sikkim
                  </text>
                </g>

                {/* Island Outposts: Andaman & Nicobar */}
                <g className="pol-island-group">
                  <ellipse
                    cx="770"
                    cy="650"
                    rx="10"
                    ry="22"
                    className="pol-map-island"
                  />
                  <ellipse
                    cx="775"
                    cy="700"
                    rx="8"
                    ry="16"
                    className="pol-map-island"
                  />
                  <ellipse
                    cx="780"
                    cy="740"
                    rx="12"
                    ry="18"
                    className="pol-map-island"
                  />
                  <text x="795" y="700" className="pol-map-island-label">
                    Andaman &amp; Nicobar
                  </text>
                </g>

                {/* Island Outposts: Lakshadweep & Minicoy */}
                <g className="pol-island-group">
                  <ellipse
                    cx="230"
                    cy="650"
                    rx="6"
                    ry="12"
                    className="pol-map-island"
                  />
                  <ellipse
                    cx="225"
                    cy="680"
                    rx="5"
                    ry="9"
                    className="pol-map-island"
                  />
                  <ellipse
                    cx="215"
                    cy="730"
                    rx="7"
                    ry="12"
                    className="pol-map-island"
                  />
                  <text x="140" y="735" className="pol-map-island-label">
                    Lakshadweep (Minicoy)
                  </text>
                </g>
              </g>

              {/* International Borders & Frontier Lines */}
              <g className="pol-frontier-lines">
                {/* Line of Control (LoC with Pakistan) */}
                <path
                  d="M 245 105 L 215 130 L 205 165 L 185 160 L 170 230 L 170 300 L 150 450"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.2"
                  strokeDasharray="5,3"
                  className="pol-loc-line"
                />

                {/* Line of Actual Control (LAC with China) */}
                <path
                  d="M 305 70 L 315 135 L 360 145 L 430 200 L 600 260 L 760 230 L 840 280"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.4"
                  strokeDasharray="4,3"
                  className="pol-lac-line"
                />

                {/* 1963 Trans-Karakoram Boundary (Shaksgam Ceded Line) */}
                <path
                  d="M 285 45 L 305 70 L 340 75"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="1.8"
                  strokeDasharray="3,3"
                  className="pol-shaksgam-line"
                />
              </g>

              {/* Tactical Hotspot Beacons */}
              {filteredHotspots.map((hotspot) => {
                const isSelected = selectedHotspot.id === hotspot.id;
                return (
                  <g
                    key={hotspot.id}
                    className={`pol-hotspot-group ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedHotspot(hotspot)}
                    transform={`translate(${hotspot.x}, ${hotspot.y})`}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Animated Pulsating Wave */}
                    <circle
                      r={isSelected ? "18" : "12"}
                      className={`pol-beacon-pulse ${hotspot.category}`}
                    />

                    {/* Outer Target Ring */}
                    <circle
                      r={isSelected ? "9" : "6"}
                      className={`pol-beacon-ring ${hotspot.category}`}
                    />

                    {/* Central Core Pin */}
                    <circle
                      r={isSelected ? "4.5" : "3"}
                      className={`pol-beacon-core ${hotspot.category}`}
                    />

                    {/* Hotspot Label */}
                    <text
                      x="14"
                      y="4"
                      className={`pol-beacon-text ${isSelected ? "active" : ""}`}
                    >
                      {hotspot.name.split("(")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Tactical Map Overlay Legend */}
            <div className="pol-map-legend">
              <div className="pol-legend-item">
                <span className="pol-legend-box red-hatch"></span>
                <span>Aksai Chin (China Occ.)</span>
              </div>
              <div className="pol-legend-item">
                <span className="pol-legend-box amber-hatch"></span>
                <span>PoK &amp; Gilgit-Baltistan</span>
              </div>
              <div className="pol-legend-item">
                <span className="pol-legend-box purple-hatch"></span>
                <span>Shaksgam (Ceded 1963)</span>
              </div>
              <div className="pol-legend-item">
                <span className="pol-legend-dot red"></span>
                <span>LAC (China)</span>
              </div>
              <div className="pol-legend-item">
                <span className="pol-legend-dot amber"></span>
                <span>LoC (Pakistan)</span>
              </div>
              <div className="pol-legend-item">
                <span className="pol-legend-dot blue"></span>
                <span>Maritime IOR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Selected Dossier Card */}
        <div className="pol-dossier-card">
          <div className="pol-dossier-header">
            <div className="pol-dossier-status-row">
              <span
                className={`pol-status-badge ${selectedHotspot.status.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <i className="fa-solid fa-satellite-dish mr-1"></i>
                {selectedHotspot.status}
              </span>
              <span className="pol-front-badge">{selectedHotspot.front}</span>
            </div>
            <h4 className="pol-dossier-title">{selectedHotspot.name}</h4>
            <p className="pol-dossier-opposing">
              <strong>Adversary / Focus:</strong>{" "}
              {selectedHotspot.opposingParty}
            </p>
          </div>

          <div className="pol-dossier-body">
            {/* Strategic Significance */}
            <div className="pol-dossier-section">
              <span className="pol-dossier-label">
                <i className="fa-solid fa-crosshairs mr-1 text-rose-500"></i>
                Strategic Significance
              </span>
              <p className="pol-dossier-text">{selectedHotspot.significance}</p>
            </div>

            {/* Force Posture */}
            <div className="pol-dossier-section">
              <span className="pol-dossier-label">
                <i className="fa-solid fa-shield-halved mr-1 text-emerald-500"></i>
                Current Force Posture &amp; Vigil
              </span>
              <p className="pol-dossier-text">{selectedHotspot.forcePosture}</p>
            </div>

            {/* Key Military Assets */}
            <div className="pol-dossier-section">
              <span className="pol-dossier-label">
                <i className="fa-solid fa-jet-fighter mr-1 text-sky-500"></i>
                Key Strategic Assets Deployed
              </span>
              <div className="pol-dossier-pills">
                {selectedHotspot.keyAssets.map((asset) => (
                  <span key={asset} className="pol-asset-pill">
                    {asset}
                  </span>
                ))}
              </div>
            </div>

            {/* Modernization & Infrastructure */}
            <div className="pol-dossier-section">
              <span className="pol-dossier-label">
                <i className="fa-solid fa-road mr-1 text-amber-500"></i>
                Infrastructure &amp; Engineering Projects
              </span>
              <div className="pol-dossier-pills">
                {selectedHotspot.infrastructure.map((infra) => (
                  <span key={infra} className="pol-infra-pill">
                    <i className="fa-solid fa-check mr-1 text-xs"></i>
                    {infra}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
