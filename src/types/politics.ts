export type PartyCategory = "national" | "regional" | "identity-religious";

export type AllianceType = "NDA" | "I.N.D.I.A" | "Unallied / Independent";

export interface PoliticalParty {
  id: string;
  name: string;
  abbreviation: string;
  symbol: string;
  category: PartyCategory;
  categoryLabel: string;
  alliance: AllianceType;
  foundedYear: number;
  founderOrKeyFigures: string[];
  currentLeader: string;
  politicalPosition:
    | "Right-wing"
    | "Centre-Right"
    | "Centrist"
    | "Centre-Left"
    | "Left-wing"
    | "Regionalist / Federal"
    | "Panthic / Identity";
  governanceStatus: string;
  headquarters: string;
  coreIdeologies: string[];
  corePhilosophy: string;
  economicVision: string;
  foreignPolicyStance: string;
  primaryBase: string;
  officialWebsite?: string;
}

export interface StudentWing {
  id: string;
  name: string;
  abbreviation: string;
  parentPartyOrIdeology: string;
  foundedYear: number;
  motto: string;
  ideologicalStance: string;
  description: string;
  keyCampusHubs: string[];
  coreIssues: string[];
  historicalSignificance: string;
}

export interface RulingGovernment {
  lokSabhaTerm: string;
  electionYear: string;
  primeMinister: string;
  speakerLokSabha: string;
  leaderOfHouseRajyaSabha: string;
  leaderOfOppositionLokSabha: string;
  leaderOfOppositionRajyaSabha: string;
  governingAlliance: string;
  governingSeats: number;
  principalOppositionAlliance: string;
  oppositionSeats: number;
  totalLokSabhaSeats: number;
  majorityMark: number;
  cabinetMinisters: {
    portfolio: string;
    minister: string;
    party: string;
    description: string;
  }[];
  keyAlliancePartners: {
    party: string;
    seats: number;
    role: string;
  }[];
}

export interface BilateralRelation {
  id: string;
  country: string;
  flag: string;
  partnershipTitle: string;
  status: string;
  executiveSummary: string;
  keyStrategicConvergences: string[];
  frictionPointsAndChallenges: string[];
  economicAndTradeDynamics: string;
  defenseAndTechCooperation: string;
  multilateralCorrelation: string;
}

export interface BorderChallenge {
  id: string;
  borderName: string;
  front: string;
  counterpartCountry: string;
  borderLength: string;
  keySectors: string[];
  strategicSignificance: string;
  currentSecurityPosture: string;
  majorFlashpointsAndChallenges: string[];
  infrastructureAndDefensiveMeasures: string[];
}

export interface InternalSecurityThreat {
  id: string;
  title: string;
  category:
    | "foreign-funding"
    | "extremism-radicalization"
    | "cyber-hybrid"
    | "narco-terror";
  categoryLabel: string;
  threatDescription: string;
  mechanismsAndVectors: string[];
  regulatoryAndLegalFramework: string[];
  enforcementAgencies: string[];
  majorInterventionsAndBans: string[];
}

export interface PolicyThinkTank {
  id: string;
  name: string;
  organization: string;
  url: string;
  country: string;
  focusAreas: string[];
  description: string;
  tier:
    | "Premier Think Tank"
    | "Official Ministry Portal"
    | "International Journal";
}
