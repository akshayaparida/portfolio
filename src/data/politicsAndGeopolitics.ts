import {
  PoliticalParty,
  StudentWing,
  RulingGovernment,
  BilateralRelation,
  BorderChallenge,
  InternalSecurityThreat,
  PolicyThinkTank,
} from "@/types/politics";

// ============================================================================
// 1. POLITICAL PARTIES OF INDIA
// ============================================================================
export const politicalParties: PoliticalParty[] = [
  // --- National Parties ---
  {
    id: "bjp",
    name: "Bharatiya Janata Party",
    abbreviation: "BJP",
    symbol: "Lotus",
    category: "national",
    categoryLabel: "National Party",
    alliance: "NDA",
    foundedYear: 1980,
    founderOrKeyFigures: [
      "Syama Prasad Mukherjee (Bharatiya Jana Sangh)",
      "Atal Bihari Vajpayee",
      "L. K. Advani",
      "Narendra Modi",
      "Amit Shah",
    ],
    currentLeader:
      "Nitin Nabin (National President) / Narendra Modi (Leader in Lok Sabha) / J. P. Nadda (Union Minister & Leader of House, Rajya Sabha)",
    politicalPosition: "Right-wing",
    governanceStatus:
      "Ruling Union Party (240 Lok Sabha seats; leads 293-seat NDA Government)",
    headquarters: "New Delhi",
    coreIdeologies: [
      "Integral Humanism",
      "Cultural Nationalism (Hindutva)",
      "Social Conservatism",
      "National Security & Strong Defense",
      "Infrastructure-Led Capital Expenditure",
    ],
    corePhilosophy:
      "Rooted in Pandit Deendayal Upadhyaya's 'Integral Humanism' and civilizational identity. Promotes a strong centralized union, cultural revitalization, national security self-reliance (Atmanirbhar Bharat), and massive state-funded physical and digital public infrastructure alongside targeted direct benefit transfers (DBT).",
    economicVision:
      "Hybrid market economy: aggressive capital expenditure on highways, ports, semiconductors, and high-speed rail combined with welfare programs (free food grains, rural housing, tap water, financial inclusion via Jan Dhan-Aadhaar-Mobile).",
    foreignPolicyStance:
      "Strategic Autonomy, multi-alignment, proactive defense deterrence, civilizational diplomacy (Global South leadership), firm stance on cross-border terrorism, and deep strategic partnerships (Quad, iCET with USA, IMEC corridor).",
    primaryBase:
      "Pan-India presence; strong in North, West, and Central India; expanding footprint in East and South.",
    officialWebsite: "https://www.bjp.org/",
  },
  {
    id: "inc",
    name: "Indian National Congress",
    abbreviation: "INC",
    symbol: "Hand",
    category: "national",
    categoryLabel: "National Party",
    alliance: "I.N.D.I.A",
    foundedYear: 1885,
    founderOrKeyFigures: [
      "Allan Octavian Hume",
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Sardar Vallabhbhai Patel",
      "Indira Gandhi",
      "Rahul Gandhi",
      "Mallikarjun Kharge",
    ],
    currentLeader:
      "Mallikarjun Kharge (President) / Rahul Gandhi (Leader of Opposition, Lok Sabha)",
    politicalPosition: "Centre-Left",
    governanceStatus:
      "Principal Opposition Party (99 Lok Sabha seats; leads 234+ seat I.N.D.I.A bloc)",
    headquarters: "New Delhi",
    coreIdeologies: [
      "Democratic Socialism",
      "Secularism",
      "Social Democracy",
      "Rights-Based Welfare Paradigm",
      "Constitutional Federalism",
    ],
    corePhilosophy:
      "Historically the umbrella movement of India's independence struggle. Advocates for pluralist secularism, protection of constitutional institutions, rights-based governance (e.g., MGNREGA, Right to Information, Food Security Act), social justice for minorities and backward classes, and socio-economic equality.",
    economicVision:
      "Mixed economy with strong public sector safety nets: universal basic income transfers (Nyay scheme), guaranteed apprenticeship for youth, farm loan waivers, MSP legal guarantees, and checks on corporate monopolies.",
    foreignPolicyStance:
      "Non-alignment traditions, active multilateralism through UN bodies, peaceful coexistence with neighbors, and balanced diplomatic engagements across global powers.",
    primaryBase:
      "Pan-India presence; governs states including Karnataka, Telangana, and Himachal Pradesh.",
    officialWebsite: "https://www.inc.in/",
  },
  {
    id: "aap",
    name: "Aam Aadmi Party",
    abbreviation: "AAP",
    symbol: "Broom",
    category: "national",
    categoryLabel: "National Party",
    alliance: "I.N.D.I.A",
    foundedYear: 2012,
    founderOrKeyFigures: [
      "Arvind Kejriwal",
      "Manish Sisodia",
      "Sanjay Singh",
      "Bhagwant Mann",
    ],
    currentLeader: "Arvind Kejriwal (National Convener)",
    politicalPosition: "Centrist",
    governanceStatus: "State Ruling Party in Punjab; National Party status",
    headquarters: "New Delhi",
    coreIdeologies: [
      "Anti-Corruption Governance",
      "Welfare Populism ('Delhi Model')",
      "Subsidized Civic Utilities (Power/Water)",
      "Public Health (Mohalla Clinics) & Education",
      "Participatory Democracy (Swaraj)",
    ],
    corePhilosophy:
      "Emerging from the 2011 India Against Corruption movement. Focuses on accountable public service delivery, zero-tolerance for administrative bribery, hyper-funded primary healthcare and public school transformation, and subsidized lifeline electricity and water.",
    economicVision:
      "Fiscal reallocation to fund social consumption goods (free bus transit for women, subsidized utilities) while maintaining balanced administrative balance sheets.",
    foreignPolicyStance:
      "Mainstream nationalist foreign policy supporting territorial defense, strategic sovereignty, and strong diaspora linkages.",
    primaryBase:
      "Delhi, Punjab, with growing municipal footprints in Gujarat, Goa, and Haryana.",
    officialWebsite: "https://aamaadmiparty.org/",
  },
  {
    id: "cpim",
    name: "Communist Party of India (Marxist)",
    abbreviation: "CPI(M)",
    symbol: "Hammer, Sickle and Star",
    category: "national",
    categoryLabel: "National Party",
    alliance: "I.N.D.I.A",
    foundedYear: 1964,
    founderOrKeyFigures: [
      "E. M. S. Namboodiripad",
      "Jyoti Basu",
      "Harkishan Singh Surjeet",
      "Sitaram Yechury",
    ],
    currentLeader: "Prakash Karat (Coordinator) / Pinarayi Vijayan (CM Kerala)",
    politicalPosition: "Left-wing",
    governanceStatus:
      "State Ruling Party (Leads Left Democratic Front in Kerala)",
    headquarters: "New Delhi",
    coreIdeologies: [
      "Marxism-Leninism",
      "Scientific Socialism",
      "Anti-Imperialism & Anti-Privatization",
      "Labor & Peasant Empowerment",
      "Radical Land Reforms",
    ],
    corePhilosophy:
      "Advocates the emancipation of the working class and peasantry through organized labor movements. Resolutely opposes privatization of state assets, neoliberal economic reforms, and imperialist foreign interventions. Emphasizes public healthcare, universal literacy, and decentralized panchayat governance.",
    economicVision:
      "State-led industrialization, strict regulation of private capital, land redistribution, public sector domination, and expansion of statutory social pensions.",
    foreignPolicyStance:
      "Firm anti-imperialism, opposition to Western military alliances (Quad, NATO partnerships), solidarity with Global South socialist movements, and peaceful neighborhood relations.",
    primaryBase:
      "Kerala, Tripura, West Bengal, and trade union belts across India.",
    officialWebsite: "https://cpim.org/",
  },
  {
    id: "bsp",
    name: "Bahujan Samaj Party",
    abbreviation: "BSP",
    symbol: "Elephant",
    category: "national",
    categoryLabel: "National Party",
    alliance: "Unallied / Independent",
    foundedYear: 1984,
    founderOrKeyFigures: ["Kanshi Ram", "Mayawati"],
    currentLeader: "Mayawati (National President)",
    politicalPosition: "Centre-Left",
    governanceStatus: "National Party / Unallied",
    headquarters: "New Delhi / Lucknow",
    coreIdeologies: [
      "Ambedkarism",
      "Bahujan Empowerment (SC, ST, OBC & Minorities)",
      "Social Equality & Anti-Casteism",
      "Self-Respect Politics",
    ],
    corePhilosophy:
      "Formed to unite and empower the 'Bahujan' (the 85% majority consisting of Scheduled Castes, Scheduled Tribes, Other Backward Classes, and religious minorities). Stresses that political power is the master key to social and economic emancipation.",
    economicVision:
      "Affirmative action in public and private sectors, land distribution to landless laborers, targeted welfare for disadvantaged communities, and rule-of-law governance.",
    foreignPolicyStance:
      "General non-alignment, focusing state resources primarily on domestic social upliftment and human development.",
    primaryBase:
      "Uttar Pradesh, with support bases in Madhya Pradesh, Rajasthan, Punjab, and Uttarakhand.",
  },
  {
    id: "npp",
    name: "National People's Party",
    abbreviation: "NPP",
    symbol: "Book",
    category: "national",
    categoryLabel: "National Party",
    alliance: "NDA",
    foundedYear: 2013,
    founderOrKeyFigures: ["P. A. Sangma", "Conrad Sangma"],
    currentLeader: "Conrad Sangma (National President & CM of Meghalaya)",
    politicalPosition: "Regionalist / Federal",
    governanceStatus:
      "State Ruling Party in Meghalaya; First National Party from Northeast India",
    headquarters: "Shillong, Meghalaya",
    coreIdeologies: [
      "Tribal & Indigenous Rights",
      "Northeast Regionalism",
      "Environmental Sustainability",
      "Cooperative Federalism",
    ],
    corePhilosophy:
      "The first national political party originating from India's North Eastern region. Dedicated to representing the distinct cultural identities, tribal aspirations, border development, and ecological preservation of the Eight Sisters states.",
    economicVision:
      "Sustainable tourism, agri-horticultural value chains, border trade infrastructure, and eco-sensitive infrastructure development.",
    foreignPolicyStance:
      "Strong support for India's Act East Policy, cross-border connectivity with ASEAN, and cultural diplomacy.",
    primaryBase: "Meghalaya, Manipur, Nagaland, Arunachal Pradesh.",
  },

  // --- Major Regional & State Parties ---
  {
    id: "dmk",
    name: "Dravida Munnetra Kazhagam",
    abbreviation: "DMK",
    symbol: "Rising Sun",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "I.N.D.I.A",
    foundedYear: 1949,
    founderOrKeyFigures: ["C. N. Annadurai", "M. Karunanidhi", "M. K. Stalin"],
    currentLeader: "M. K. Stalin (President & CM of Tamil Nadu)",
    politicalPosition: "Regionalist / Federal",
    governanceStatus: "State Ruling Party in Tamil Nadu (22 Lok Sabha seats)",
    headquarters: "Chennai, Tamil Nadu",
    coreIdeologies: [
      "Dravidian Nationalism & Self-Respect",
      "Social Justice & Anti-Brahminism",
      "State Autonomy & Federalism",
      "Linguistic Pride (Tamil Rights)",
      "Universal Social Welfare",
    ],
    corePhilosophy:
      "Rooted in Periyar's Self-Respect Movement. Champion of states' rights, equitable caste reservation, linguistic federalism against linguistic hegemony, and extensive maternal/educational welfare systems (Dravidian Model).",
    economicVision:
      "Industrial manufacturing hub (automobiles, electronics, textiles) backed by comprehensive social safety nets (free breakfast for school children, monthly basic income for women heads of households).",
    foreignPolicyStance:
      "Advocacy for Sri Lankan Tamil rights, Indo-Sri Lanka maritime fishing accords, and strong ties with the global Tamil diaspora.",
    primaryBase: "Tamil Nadu and Puducherry.",
    officialWebsite: "https://www.dmk.in/",
  },
  {
    id: "tdp",
    name: "Telugu Desam Party",
    abbreviation: "TDP",
    symbol: "Bicycle",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "NDA",
    foundedYear: 1982,
    founderOrKeyFigures: ["N. T. Rama Rao (NTR)", "N. Chandrababu Naidu"],
    currentLeader:
      "N. Chandrababu Naidu (National President & CM of Andhra Pradesh)",
    politicalPosition: "Centre-Right",
    governanceStatus:
      "State Ruling Party in Andhra Pradesh (16 Lok Sabha seats, key NDA pillar)",
    headquarters: "Amaravati / Guntur, Andhra Pradesh",
    coreIdeologies: [
      "Telugu Regional Pride (Telugu Atmagauravam)",
      "Technology & IT-Driven Development",
      "Capital Formation & Infrastructure (Amaravati)",
      "Cooperative Federalism",
    ],
    corePhilosophy:
      "Pioneered technocratic public governance and IT industrialization in South India. Balances modern corporate investments and greenfield capital cities with comprehensive rural empowerment and irrigation megaprojects (Polavaram).",
    economicVision:
      "Pro-business, high-tech industrial parks, ports and logistics corridors, deep-tech investments, combined with targeted direct welfare schemes for farmers and women.",
    foreignPolicyStance:
      "Pro-globalization, foreign direct investment attraction, and strong support for high-tech and defense manufacturing hubs.",
    primaryBase: "Andhra Pradesh and Telangana.",
  },
  {
    id: "jdu",
    name: "Janata Dal (United)",
    abbreviation: "JD(U)",
    symbol: "Arrow",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "NDA",
    foundedYear: 2003,
    founderOrKeyFigures: ["Sharad Yadav", "George Fernandes", "Nitish Kumar"],
    currentLeader: "Nitish Kumar (National President & CM of Bihar)",
    politicalPosition: "Centrist",
    governanceStatus:
      "State Ruling Coalition in Bihar (12 Lok Sabha seats, key NDA pillar)",
    headquarters: "Patna / New Delhi",
    coreIdeologies: [
      "Socialism (Lohiaite Politics)",
      "Gandhian Ethics & Prohibition",
      "Social Empowerment (Extremely Backward Castes / Mahadalit)",
      "Good Governance ('Sushasan')",
    ],
    corePhilosophy:
      "Grounded in Ram Manohar Lohia's democratic socialism. Focused on law and order restoration, targeted reservations for extremely backward castes (EBCs), women's empowerment in local panchayats (50% quota), and rural electrification.",
    economicVision:
      "State-supported agricultural growth, rural road infrastructure, universal school cycle schemes for girls, and special category status advocacy for Bihar.",
    foreignPolicyStance:
      "Supports stable relations with Nepal and regional border trade integration.",
    primaryBase: "Bihar, with minor presence in Jharkhand and Northeast.",
  },
  {
    id: "tmc",
    name: "All India Trinamool Congress",
    abbreviation: "AITC / TMC",
    symbol: "Twin Flowers (Jora Ghash Phool)",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "I.N.D.I.A",
    foundedYear: 1998,
    founderOrKeyFigures: ["Mamata Banerjee", "Abhishek Banerjee"],
    currentLeader: "Mamata Banerjee (Chairperson & CM of West Bengal)",
    politicalPosition: "Centre-Left",
    governanceStatus: "State Ruling Party in West Bengal (29 Lok Sabha seats)",
    headquarters: "Kolkata, West Bengal",
    coreIdeologies: [
      "Ma Mati Manush (Mother, Motherland, People)",
      "Bengali Regional Identity & Sub-nationalism",
      "Anti-Authoritarianism & Anti-Centralization",
      "Universal Grassroots Welfare Schemes",
    ],
    corePhilosophy:
      "Populist mass movement originating from the Singur and Nandigram land acquisition resistance. Strong proponent of regional autonomy, secular syncretism, and direct state cash transfer programs (Kanyashree, Lakshmir Bhandar).",
    economicVision:
      "Micro-enterprise support, agricultural protection, and direct welfare transfers to rural women and marginalized communities.",
    foreignPolicyStance:
      "Direct stakeholder in India-Bangladesh river water sharing treaties (Teesta river accords) and cross-border connectivity.",
    primaryBase: "West Bengal, with presence in Meghalaya, Tripura, and Assam.",
  },
  {
    id: "sp",
    name: "Samajwadi Party",
    abbreviation: "SP",
    symbol: "Bicycle",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "I.N.D.I.A",
    foundedYear: 1992,
    founderOrKeyFigures: ["Mulayam Singh Yadav", "Akhilesh Yadav"],
    currentLeader: "Akhilesh Yadav (National President)",
    politicalPosition: "Centre-Left",
    governanceStatus:
      "Principal Opposition in Uttar Pradesh (37 Lok Sabha seats - 3rd largest in House)",
    headquarters: "Lucknow / New Delhi",
    coreIdeologies: [
      "Democratic Socialism (Lohiaite)",
      "PDA Formula (Pichhda, Dalit, Alpsankhyak / Backward, Dalit, Minority)",
      "Agrarian Welfare",
      "Expressway & Urban Infrastructure Modernization",
    ],
    corePhilosophy:
      "Combines socialist principles with modern infrastructure development. Advocates for a caste census, statutory proportional reservations, farmer debt relief, and secular social harmony.",
    economicVision:
      "State-driven expressway construction (Agra-Lucknow Expressway model), laptop distribution for students, modern metro networks, and agricultural procurement price guarantees.",
    foreignPolicyStance:
      "Support for peaceful neighborly ties and non-alignment.",
    primaryBase: "Uttar Pradesh.",
  },
  {
    id: "bjd",
    name: "Biju Janata Dal",
    abbreviation: "BJD",
    symbol: "Conch (Sankha)",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "Unallied / Independent",
    foundedYear: 1997,
    founderOrKeyFigures: ["Biju Patnaik (Inspiration)", "Naveen Patnaik"],
    currentLeader: "Naveen Patnaik (Founder & President)",
    politicalPosition: "Centrist",
    governanceStatus:
      "Principal Opposition Party in Odisha (Governed Odisha for 24 continuous years from 2000 to 2024)",
    headquarters: "Sankha Bhawan, Bhubaneswar, Odisha",
    coreIdeologies: [
      "Odia Regional Pride & Identity (Odia Asmita)",
      "Universal Social Welfare & Secularism",
      "Mission Shakti (Women Self-Help Groups)",
      "World-Class Disaster Management Governance",
      "Equitable Industrialization & Mining Federalism",
    ],
    corePhilosophy:
      "Founded to uphold the transformative legacy of former Chief Minister Biju Patnaik. Transformed Odisha from a disaster-vulnerable state into an international benchmark for disaster management resilience (UN-acclaimed zero casualty cyclone protocols), global sports capital (hockey), and women-led rural SHG economic empowerment (7 million+ women under Mission Shakti). Maintains equidistant non-aligned federal relations with national coalitions.",
    economicVision:
      "KALIA scheme for small/marginal farmers and landless agricultural laborers, Biju Swasthya Kalyan Yojana (BSKY) universal health coverage, metal and mineral downstream value addition, and mega port infrastructure (Dhamra, Gopalpur, Paradip).",
    foreignPolicyStance:
      "Active promoter of Maritime Odia heritage (Bali Jatra diplomacy), international hockey tournaments hosting, and mineral export corridor integration with East and Southeast Asia.",
    primaryBase: "Odisha (Coastal, Central, Western, and Southern districts).",
    officialWebsite: "https://www.bjdodisha.org.in/",
  },
  {
    id: "ysrcp",
    name: "YSR Congress Party",
    abbreviation: "YSRCP",
    symbol: "Ceiling Fan",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "Unallied / Independent",
    foundedYear: 2011,
    founderOrKeyFigures: [
      "Y. S. Rajasekhara Reddy (Inspiration)",
      "Y. S. Jagan Mohan Reddy",
    ],
    currentLeader:
      "Y. S. Jagan Mohan Reddy (President & Former CM of Andhra Pradesh)",
    politicalPosition: "Centre-Left",
    governanceStatus:
      "State Opposition in Andhra Pradesh (Governed AP from 2019 to 2024, 4 Lok Sabha seats)",
    headquarters: "Tadepalli, Guntur / Vijayawada, Andhra Pradesh",
    coreIdeologies: [
      "Navaratnalu Welfare Model",
      "Agrarian & Farmer Direct Cash Transfers (Rythu Bharosa)",
      "Village / Ward Secretariats (Grama Sachivalayam)",
      "Social Justice for SC/ST/BC/Minorities",
    ],
    corePhilosophy:
      "Built on the populist mass legacy of former united Andhra Pradesh Chief Minister Dr. Y. S. Rajasekhara Reddy. Pioneered decentralized grassroots administration through village secretariats and universal doorstep delivery of direct benefit welfare transfers across education, healthcare, and agriculture.",
    economicVision:
      "Massive direct benefit transfers (Amma Vodi, Cheyutha, Aasara), English-medium transformation in government schools, Nadu-Nedu hospital upgrades, and greenfield port development (Machilipatnam, Ramayapatnam, Bhavanapadu).",
    foreignPolicyStance:
      "Attraction of pharmaceutical and renewable energy investments along the Visakhapatnam-Chennai industrial corridor.",
    primaryBase: "Andhra Pradesh (Rayalaseema and Coastal Andhra).",
  },
  {
    id: "shivsena-ubt",
    name: "Shiv Sena (Uddhav Balasaheb Thackeray)",
    abbreviation: "SS (UBT)",
    symbol: "Flaming Torch (Mashaal)",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "I.N.D.I.A",
    foundedYear: 1966,
    founderOrKeyFigures: [
      "Balasaheb Thackeray",
      "Uddhav Thackeray",
      "Aaditya Thackeray",
      "Sanjay Raut",
    ],
    currentLeader:
      "Uddhav Thackeray (Party President & Former CM of Maharashtra)",
    politicalPosition: "Centrist",
    governanceStatus:
      "Key Opposition Party in Maharashtra (9 Lok Sabha seats in 18th Lok Sabha)",
    headquarters: "Shiv Sena Bhavan, Dadar, Mumbai",
    coreIdeologies: [
      "Marathi Regional Identity (Marathi Manus Rights)",
      "Inclusive Cultural Nationalism (Prabodhankar Thackeray lineage)",
      "State Autonomy & Constitutional Federalism",
      "Urban Infrastructure & Environmental Sustainability",
    ],
    corePhilosophy:
      "Evolution of the historic Shiv Sena under Uddhav Thackeray into an inclusive, constitution-centric regional force within the Maha Vikas Aghadi (MVA). Prioritizes state federal rights against central overreach, urban environmental governance, and preservation of Mumbai's financial autonomy.",
    economicVision:
      "Sustainable urban development (coastal road, climate action plan for Mumbai), farmer loan waivers, and protection of local businesses.",
    foreignPolicyStance:
      "Promotes Mumbai as South Asia's premier international financial and cultural capital.",
    primaryBase: "Maharashtra (Mumbai, Konkan, Marathwada, and Vidarbha).",
  },
  {
    id: "shivsena-shinde",
    name: "Shiv Sena (Eknath Shinde)",
    abbreviation: "SHS",
    symbol: "Bow and Arrow",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "NDA",
    foundedYear: 2022,
    founderOrKeyFigures: ["Eknath Shinde", "Anand Dighe (Inspiration)"],
    currentLeader:
      "Eknath Shinde (Leader & Deputy CM / Former CM of Maharashtra)",
    politicalPosition: "Right-wing",
    governanceStatus:
      "State Ruling Coalition Partner in Maharashtra (7 Lok Sabha seats, key NDA constituent)",
    headquarters: "Thane / Mumbai, Maharashtra",
    coreIdeologies: [
      "Original Hindutva of Balasaheb Thackeray",
      "Grassroots Ground Mobilization (Shakha Network)",
      "Major Infrastructure Acceleration (Samruddhi Mahamarg)",
      "Ladki Bahin Direct Cash Transfers for Women",
    ],
    corePhilosophy:
      "Reclaims the traditional militant Hindutva and grassroots worker-centric culture of Balasaheb Thackeray in alliance with the BJP. Focused on large-scale infrastructure execution (metro lines, trans-harbour link, expressways) and massive direct cash transfer programs for women and farmers.",
    economicVision:
      "Pro-infrastructure development, fast-tracking delayed industrial megaprojects, and extensive rural and women-centric cash transfers (Majhi Ladki Bahin Yojana).",
    foreignPolicyStance:
      "Support for national security doctrines and international investment influx into Maharashtra.",
    primaryBase: "Maharashtra (Thane, Mumbai MMR, Western Maharashtra).",
  },
  {
    id: "ncp-sp",
    name: "Nationalist Congress Party – Sharadchandra Pawar",
    abbreviation: "NCPSP",
    symbol: "Man Blowing Turha (Tutari)",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "I.N.D.I.A",
    foundedYear: 1999,
    founderOrKeyFigures: ["Sharad Pawar", "Supriya Sule"],
    currentLeader:
      "Sharad Pawar (National President) / Supriya Sule (Working President & MP)",
    politicalPosition: "Centre-Left",
    governanceStatus:
      "Key Opposition Party in Maharashtra (8 Lok Sabha seats in 18th Lok Sabha)",
    headquarters: "Mumbai / New Delhi",
    coreIdeologies: [
      "Progressive Democratic Federalism",
      "Agrarian Cooperative Movement (Sugar & Dairy Co-ops)",
      "Social Justice (Phule-Shahu-Ambedkar Ideals)",
      "Inclusive Secularism",
    ],
    corePhilosophy:
      "Headed by veteran national statesman Sharad Pawar. Represents the powerful sugar, banking, and agricultural cooperative movement of Western Maharashtra while championing backward class empowerment and constitutional federalism.",
    economicVision:
      "Modernization of agricultural markets, cooperative credit societies restructuring, farm insurance, and agro-processing clusters.",
    foreignPolicyStance:
      "Support for balanced multi-alignment and regional agrarian trade.",
    primaryBase:
      "Maharashtra (Western Maharashtra, Marathwada, North Maharashtra).",
  },
  {
    id: "ncp-ajit",
    name: "Nationalist Congress Party (Ajit Pawar)",
    abbreviation: "NCP",
    symbol: "Clock",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "NDA",
    foundedYear: 2023,
    founderOrKeyFigures: ["Ajit Pawar", "Praful Patel", "Sunil Tatkare"],
    currentLeader: "Ajit Pawar (National President & Deputy CM of Maharashtra)",
    politicalPosition: "Centrist",
    governanceStatus:
      "State Ruling Coalition Partner in Maharashtra (NDA Constituent)",
    headquarters: "Mumbai, Maharashtra",
    coreIdeologies: [
      "Pragmatic Development Administration",
      "Cooperative Sector Support",
      "Budgetary Fiscal Allocation for Rural Maharashtra",
      "Cooperative Federalism with Central Government",
    ],
    corePhilosophy:
      "Emphasizes pragmatic administrative efficiency, direct participation in state governance to secure central funds for Maharashtra's irrigation and cooperative networks, and rapid project delivery.",
    economicVision:
      "Cooperative sugar mill modernization, irrigation funding, agricultural subsidies, and rural infrastructure financing.",
    foreignPolicyStance:
      "Support for national trade policies and foreign direct investment in Maharashtra's industrial zones.",
    primaryBase: "Maharashtra (Pune, Satara, Solapur, Kolhapur).",
  },
  {
    id: "rjd",
    name: "Rashtriya Janata Dal",
    abbreviation: "RJD",
    symbol: "Hurricane Lamp (Laltain)",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "I.N.D.I.A",
    foundedYear: 1997,
    founderOrKeyFigures: ["Lalu Prasad Yadav", "Rabri Devi", "Tejashwi Yadav"],
    currentLeader:
      "Lalu Prasad Yadav (National President) / Tejashwi Yadav (Leader in Bihar Assembly)",
    politicalPosition: "Centre-Left",
    governanceStatus:
      "Principal Opposition Party in Bihar (4 Lok Sabha seats in 18th Lok Sabha)",
    headquarters: "Patna, Bihar",
    coreIdeologies: [
      "Social Justice & Secularism (Samajik Nyay)",
      "Empowerment of Backward Castes, Dalits & Minorities",
      "A-to-Z Inclusive Politics (Tejashwi Model)",
      "Government Job Creation & Caste Census Implementation",
    ],
    corePhilosophy:
      "Historically the pioneer of subaltern social empowerment against upper-caste hegemony in North India. Under Tejashwi Yadav, shifted focus to massive government teacher recruitments (4 lakh+ jobs created during Mahagathbandhan tenure), statewide caste survey execution, and youth employment guarantees.",
    economicVision:
      "Government recruitment drives, state-funded higher education expansion, agrarian procurement centers, and agro-based industrial development in Bihar.",
    foreignPolicyStance:
      "Support for peace with neighbors and open cultural exchanges with Nepal.",
    primaryBase: "Bihar and Jharkhand.",
  },
  {
    id: "jmm",
    name: "Jharkhand Mukti Morcha",
    abbreviation: "JMM",
    symbol: "Bow and Arrow",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "I.N.D.I.A",
    foundedYear: 1972,
    founderOrKeyFigures: [
      "Shibu Soren (Dishom Guru)",
      "Hemant Soren",
      "Kalpana Soren",
    ],
    currentLeader: "Hemant Soren (Executive President & CM of Jharkhand)",
    politicalPosition: "Centre-Left",
    governanceStatus:
      "State Ruling Party in Jharkhand (3 Lok Sabha seats in 18th Lok Sabha)",
    headquarters: "Ranchi, Jharkhand",
    coreIdeologies: [
      "Tribal (Adivasi) Identity & Autonomy (Jal, Jungle, Jameen)",
      "Sarna Religious Code Recognition",
      "Mining Royalties & State Sovereign Rights",
      "Universal Social Security Pensions (Sarvajan Pension)",
    ],
    corePhilosophy:
      "Emerged as the militant mass movement for the creation of a separate tribal state of Jharkhand. Fights for indigenous Adivasi self-determination, statutory recognition of the Sarna religious code, 75% private job quota for locals, and claiming ₹1.36 Lakh Crore unpaid mining dues from central public sector miners.",
    economicVision:
      "Direct financial support for tribal and rural women (Mukhyamantri Maiya Samman Yojana), universal state pensions, forest produce value addition, and tribal residential education.",
    foreignPolicyStance:
      "Advocacy for indigenous rights at international environmental and tribal forums (UN Permanent Forum on Indigenous Issues).",
    primaryBase: "Jharkhand (Santhal Pargana, Kolhan, and Chota Nagpur).",
  },
  {
    id: "aiadmk",
    name: "All India Anna Dravida Munnetra Kazhagam",
    abbreviation: "AIADMK",
    symbol: "Two Leaves (Irattai Ilai)",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "Unallied / Independent",
    foundedYear: 1972,
    founderOrKeyFigures: [
      "M. G. Ramachandran (MGR)",
      "J. Jayalalithaa (Amma)",
      "Edappadi K. Palaniswami",
    ],
    currentLeader:
      "Edappadi K. Palaniswami (General Secretary & Former CM of Tamil Nadu)",
    politicalPosition: "Centrist",
    governanceStatus: "Principal Opposition Party in Tamil Nadu / Unallied",
    headquarters: "Puratchi Thalaivar MGR Maaligai, Royapettah, Chennai",
    coreIdeologies: [
      "Annaism (Dravidian Social Welfare & Syncretism)",
      "Amma Welfare Schemes (Canteens, Pharmacies, Free Mixers/Grinders)",
      "Tamil Linguistic Identity & Federal Autonomy",
      "Protection of 69% Reservation in Tamil Nadu",
    ],
    corePhilosophy:
      "Founded by legendary actor-politician M. G. Ramachandran. Pioneered universal mid-day meals in schools and under J. Jayalalithaa introduced revolutionary public welfare systems (Amma Unavagam subsidizing nutritious food for the poor, cradle baby scheme against female infanticide, free laptops for students). Resolutely defended Tamil Nadu's 69% reservation quota in the Supreme Court.",
    economicVision:
      "Industrial manufacturing incentives (electronics and auto hubs in Sriperumbudur/Hosur), water security infrastructure (Kaveri river rights defense), and comprehensive grassroots social subsidies.",
    foreignPolicyStance:
      "Advocacy for the restoration of Katchatheevu island, protection of Tamil fishermen from Sri Lankan Navy arrests, and political rights for Eelam Tamils.",
    primaryBase:
      "Tamil Nadu (Western Kongu belt, Southern districts, Northern districts).",
  },
  {
    id: "brs",
    name: "Bharat Rashtra Samithi",
    abbreviation: "BRS",
    symbol: "Car",
    category: "regional",
    categoryLabel: "State / Regional Party",
    alliance: "Unallied / Independent",
    foundedYear: 2001,
    founderOrKeyFigures: [
      "K. Chandrashekar Rao (KCR)",
      "K. T. Rama Rao (KTR)",
      "T. Harish Rao",
    ],
    currentLeader: "K. Chandrashekar Rao (President & Former CM of Telangana)",
    politicalPosition: "Centrist",
    governanceStatus:
      "Principal Opposition Party in Telangana (Governed Telangana from 2014 to 2023)",
    headquarters: "Telangana Bhavan, Banjara Hills, Hyderabad",
    coreIdeologies: [
      "Telangana Statehood & Self-Respect (Telangana Atmagauravam)",
      "Pioneering Farmer Welfare (Rythu Bandhu & Rythu Bima)",
      "Irrigation Engineering Megaprojects (Kaleshwaram Lift Irrigation)",
      "Hyderabad High-Tech & Innovation Ecosystem Expansion (T-Hub)",
    ],
    corePhilosophy:
      "The political vehicle that spearheaded the 14-year-long non-violent mass movement leading to the bifurcation of Andhra Pradesh and creation of Telangana state in 2014. Architected 24x7 free agricultural power, massive irrigation transformation (Kaleshwaram, Mission Kakatiya), and propelled Hyderabad into a top global IT/pharma hub surpassing Bangalore in tech job additions.",
    economicVision:
      "Unconditional direct farm investment support (Rythu Bandhu), universal pension transfers (Aasara), IT innovation incubation (T-Hub/We-Hub), and Hyderabad infrastructure expansion.",
    foreignPolicyStance:
      "Global outreach to Fortune 500 tech/pharma giants (Apple, Google, Novartis) and promoting federal consensus against central fiscal centralization.",
    primaryBase: "Telangana (Northern, Southern, and Hyderabad regions).",
  },

  // --- Religious & Identity-Based Parties ---
  {
    id: "aimim",
    name: "All India Majlis-e-Ittehadul Muslimeen",
    abbreviation: "AIMIM",
    symbol: "Kite",
    category: "identity-religious",
    categoryLabel: "Identity / Minority Rights Party",
    alliance: "Unallied / Independent",
    foundedYear: 1927,
    founderOrKeyFigures: [
      "Nawab Mahmood Nawaz Khan",
      "Abdul Wahid Owaisi",
      "Sultan Salahuddin Owaisi",
      "Asaduddin Owaisi",
    ],
    currentLeader: "Asaduddin Owaisi (President & MP for Hyderabad)",
    politicalPosition: "Panthic / Identity",
    governanceStatus: "Regional Minority Rights Party / Unallied",
    headquarters: "Hyderabad, Telangana",
    coreIdeologies: [
      "Muslim Minority Political Representation",
      "Constitutionalism & Civil Rights",
      "Dalit-Muslim Alliance (Jai Bheem Jai Meem)",
      "Anti-Majoritarianism",
      "Secular Federalism",
    ],
    corePhilosophy:
      "Advocates for independent, assertive political representation of Indian Muslims, Dalits, and marginalized groups within the constitutional framework of fundamental rights (Articles 14, 15, 29, 30). Opposes both majoritarian nationalism and paternalistic secular party politics.",
    economicVision:
      "Targeted budgetary allocations for minority education, skill centers, artisan cooperatives, and urban infrastructure in old city quarters.",
    foreignPolicyStance:
      "Strong support for Indian sovereign integrity, firm opposition to terror outfits (ISIS/Al-Qaeda), and advocacy for Palestinian statehood.",
    primaryBase:
      "Hyderabad (Telangana), with electoral presence in Maharashtra, Bihar (Seemanchal), and Uttar Pradesh.",
  },
  {
    id: "iuml",
    name: "Indian Union Muslim League",
    abbreviation: "IUML",
    symbol: "Ladder",
    category: "identity-religious",
    categoryLabel: "Identity / Minority Rights Party",
    alliance: "I.N.D.I.A",
    foundedYear: 1948,
    founderOrKeyFigures: [
      "M. Muhammad Ismail",
      "B. Pocker Sahib",
      "Panakkad Syed Hyderali Shihab Thangal",
    ],
    currentLeader:
      "Panakkad Syed Sadiq Ali Shihab Thangal (State President) / P. K. Kunhalikutty",
    politicalPosition: "Centre-Right",
    governanceStatus:
      "State Coalition Partner in Kerala (UDF Alliance, 3 Lok Sabha seats)",
    headquarters: "Chennai / Malappuram, Kerala",
    coreIdeologies: [
      "Democratic Constitutional Integration",
      "Muslim Minority Community Welfare",
      "Communal Harmony & Inter-faith Dialogue",
      "Educational Upliftment of Backward Classes",
    ],
    corePhilosophy:
      "Emphasizes constitutional mainstreaming, peaceful coalition politics, and high social development indices for minorities. A foundational constituent of Kerala's political consensus that has built extensive network of schools, universities, and hospitals.",
    economicVision:
      "Pro-trade, diaspora remittance management, higher education funding, and cooperative enterprise models.",
    foreignPolicyStance:
      "Fosters friendly ties with Gulf Cooperation Council (GCC) nations where millions of Indian expats reside.",
    primaryBase: "Kerala (Malabar region) and Tamil Nadu.",
  },
  {
    id: "sad",
    name: "Shiromani Akali Dal",
    abbreviation: "SAD",
    symbol: "Scales (Takki)",
    category: "identity-religious",
    categoryLabel: "Identity / Panthic Party",
    alliance: "Unallied / Independent",
    foundedYear: 1920,
    founderOrKeyFigures: [
      "Master Tara Singh",
      "Parkash Singh Badal",
      "Sukhbir Singh Badal",
    ],
    currentLeader: "Sukhbir Singh Badal (President)",
    politicalPosition: "Panthic / Identity",
    governanceStatus: "Regional Panthic Party in Punjab / Unallied",
    headquarters: "Chandigarh / Amritsar, Punjab",
    coreIdeologies: [
      "Sikh Identity (Panthic Rights)",
      "Federal Autonomy (Anandpur Sahib Resolution)",
      "Agrarian Prosperity & Farmer Rights",
      "Protection of Minorities & River Waters",
    ],
    corePhilosophy:
      "Born out of the Gurdwara Reform Movement in 1920. Represents Sikh cultural and religious institutions (SGPC) while advocating for genuine federal decentralization, state sovereignty over river waters, and preservation of Punjab's agrarian economy.",
    economicVision:
      "Free agricultural power subsidies, heavy grain procurement MSPs, crop insurance, and agro-processing industrialization.",
    foreignPolicyStance:
      "Advocacy for the Kartarpur Corridor, safety of the global Sikh diaspora, and open border transit for religious pilgrimages.",
    primaryBase: "Punjab, Haryana, and Delhi.",
  },
  {
    id: "aiudf",
    name: "All India United Democratic Front",
    abbreviation: "AIUDF",
    symbol: "Lock and Key",
    category: "identity-religious",
    categoryLabel: "Identity / Minority Rights Party",
    alliance: "Unallied / Independent",
    foundedYear: 2005,
    founderOrKeyFigures: ["Badruddin Ajmal", "Sirajuddin Ajmal"],
    currentLeader: "Badruddin Ajmal (President)",
    politicalPosition: "Centrist",
    governanceStatus: "Regional Minority Party in Assam / Unallied",
    headquarters: "Guwahati, Assam",
    coreIdeologies: [
      "Linguistic & Religious Minority Protection",
      "Legal Rights for NRC/D-Voter Accused",
      "Char (Riverine Island) Development",
      "Flood and River Erosion Relief",
    ],
    corePhilosophy:
      "Represents the socio-political interests of Bengali-origin linguistic and religious minorities in Assam. Focuses on citizenship verification defense (NRC tribunals), constitutional guarantees for disenfranchised riverine populations, and flood reconstruction.",
    economicVision:
      "Agro-based rural development, institutional flood defense investments, and micro-loan financing for marginalized tea and riverine workers.",
    foreignPolicyStance:
      "Support for legal cross-border trade and peaceful regional relations.",
    primaryBase: "Assam (Barpeta, Dhubri, Nagaon, Karimganj).",
  },
];

// ============================================================================
// 2. STUDENT POLITICAL WINGS (CAMPUS NURSERIES)
// ============================================================================
export const studentWings: StudentWing[] = [
  {
    id: "abvp",
    name: "Akhil Bharatiya Vidyarthi Parishad",
    abbreviation: "ABVP",
    parentPartyOrIdeology:
      "Ideologically aligned with Rashtriya Swayamsevak Sangh (RSS) / BJP",
    foundedYear: 1949,
    motto: "Knowledge, Character and Unity (Gyan, Sheel, Ekta)",
    ideologicalStance: "Nationalist / Integral Humanism / Cultural Revivalism",
    description:
      "India's largest student organization by membership. Serves as a major feeder of youth leadership into national governance, focusing on nationalist campus discourse, national security awareness, anti-ragging reforms, and affordable education.",
    keyCampusHubs: [
      "Delhi University (DUSU)",
      "Banaras Hindu University (BHU)",
      "University of Hyderabad",
      "Rajasthan University",
      "Panjab University",
    ],
    coreIssues: [
      "National sovereignty in curriculum",
      "Combating anti-national campus elements",
      "Educational infrastructure modernization",
      "Vocational training & skill-building",
    ],
    historicalSignificance:
      "Played a pivotal role in the 1974 JP Movement and Navnirman Movement in Gujarat against political corruption; produced numerous prominent national ministers.",
  },
  {
    id: "nsui",
    name: "National Students' Union of India",
    abbreviation: "NSUI",
    parentPartyOrIdeology: "Student wing of the Indian National Congress (INC)",
    foundedYear: 1971,
    motto: "Knowledge, Struggle, Sacrifice",
    ideologicalStance: "Social Democracy / Secularism / Student Rights",
    description:
      "Founded by Indira Gandhi through the merger of the Kerala Students Union and West Bengal State Chhatra Parishad. Fights for student welfare, democratic elections in universities, fee hike rollbacks, and reservation enforcement.",
    keyCampusHubs: [
      "Delhi University (DUSU)",
      "Aligarh Muslim University (AMU)",
      "Panjab University",
      "Osmania University",
      "Kerala University",
    ],
    coreIssues: [
      "Fee hike protests and scholarship disbursals",
      "Protection of university autonomy and campus democracy",
      "Unemployment and recruitment paper leak protests",
      "Equal opportunity cells for backward and minority students",
    ],
    historicalSignificance:
      "Central in organizing youth resistance during various national student agitations; historically one of the premier nurseries of parliamentary leaders in India.",
  },
  {
    id: "sfi",
    name: "Students' Federation of India",
    abbreviation: "SFI",
    parentPartyOrIdeology:
      "Student wing of the Communist Party of India (Marxist) [CPI(M)]",
    foundedYear: 1970,
    motto: "Independence, Democracy and Socialism",
    ideologicalStance:
      "Marxist-Leninist / Anti-Imperialist / Progressive Student Unionism",
    description:
      "Dominant left-wing student organization with massive presence in South and Eastern Indian campuses. Champions universal free education, scientific temper in pedagogy, gender equality, and resistance against education commercialization.",
    keyCampusHubs: [
      "Jawaharlal Nehru University (JNUSU)",
      "Jadavpur University",
      "Calicut & Kerala Universities",
      "Presidency University Kolkata",
      "University of Hyderabad",
    ],
    coreIssues: [
      "Resistance against privatization of public universities",
      "Hostel facility expansion & gender-neutral safety cells",
      "Anti-fascist and anti-caste campus solidarity",
      "Scientific and rationalist curriculum defense",
    ],
    historicalSignificance:
      "Has historically led student unions across JNU, Jadavpur, and Kerala for decades, producing leading intellectuals, economists, and Left political leadership.",
  },
  {
    id: "aisa",
    name: "All India Students' Association",
    abbreviation: "AISA",
    parentPartyOrIdeology: "Student wing of the CPI(ML) Liberation",
    foundedYear: 1990,
    motto: "For a Just, Democratic and Egalitarian Education",
    ideologicalStance: "Far-Left / Radical Social Justice / Anti-Privatization",
    description:
      "Known for aggressive campus activism, anti-caste struggles, and radical democratization of academic spaces. Plays a major role in northern central universities.",
    keyCampusHubs: [
      "Jawaharlal Nehru University (JNU)",
      "Delhi University",
      "Allahabad University",
      "BHU",
    ],
    coreIssues: [
      "Scrapping National Education Policy (NEP) privatization clauses",
      "Affirmative action enforcement in higher faculty recruitments",
      "Democratization of institutional decision-making bodies",
    ],
    historicalSignificance:
      "A leading force in JNUSU elections and national anti-authoritarian youth mobilizations.",
  },
  {
    id: "cyss",
    name: "Chhatra Yuva Sangharsh Samiti",
    abbreviation: "CYSS",
    parentPartyOrIdeology: "Student wing of Aam Aadmi Party (AAP)",
    foundedYear: 2014,
    motto: "Clean Politics, Clean Campuses",
    ideologicalStance:
      "Anti-Corruption / Alternative Student Politics / Civic Reform",
    description:
      "Formed to introduce alternative, transparent, money-and-muscle-free student union politics in Delhi, Punjab, and Haryana campuses.",
    keyCampusHubs: [
      "Panjab University (PUCSC)",
      "Delhi University colleges",
      "Punjab State Universities",
    ],
    coreIssues: [
      "Ending political violence and money power in campus elections",
      "Transparent admission criteria and sanitary facilities",
      "Student concession passes and library 24x7 access",
    ],
    historicalSignificance:
      "Won the prestigious Panjab University Campus Students' Council (PUCSC) presidency in 2022, marking a major breakthrough outside traditional student blocs.",
  },
  {
    id: "bcjd",
    name: "Biju Chhatra Janata Dal",
    abbreviation: "BCJD",
    parentPartyOrIdeology: "Student wing of the Biju Janata Dal (BJD)",
    foundedYear: 1997,
    motto:
      "Service, Struggle and Progress for Youth (Seva, Sangharsh, Pragati)",
    ideologicalStance: "Odia Student Welfare / Regional Youth Leadership",
    description:
      "The student wing of the Biju Janata Dal. Active across Utkal University, Ravenshaw University, Sambalpur University, and Berhampur University, championing student hostel reforms, higher education grants, skill incubation, and state sports ecosystem promotion.",
    keyCampusHubs: [
      "Utkal University (Bhubaneswar)",
      "Ravenshaw University (Cuttack)",
      "Sambalpur University (Burla)",
      "Berhampur University",
      "Fakir Mohan University (Balasore)",
    ],
    coreIssues: [
      "Digital learning access and state scholarship disbursals",
      "Campus sports infrastructure and hockey coaching facilities",
      "Protection of Odia linguistic identity in higher curricula",
      "Youth entrepreneurship seed grants",
    ],
    historicalSignificance:
      "A primary feeder of youth, municipal, and legislative leadership for the BJD across coastal and western Odisha.",
  },
  {
    id: "scs",
    name: "Samajwadi Chhatra Sabha",
    abbreviation: "SCS",
    parentPartyOrIdeology: "Student wing of Samajwadi Party (SP)",
    foundedYear: 1992,
    motto: "Socialism, Equality and Youth Struggle",
    ideologicalStance:
      "Democratic Socialism / Backward & Minority Student Mobilization",
    description:
      "Pivotal student organization across Uttar Pradesh central and state universities. Mobilizes youth around caste census demands, proportional faculty reservations, student union restoration, and affordable education.",
    keyCampusHubs: [
      "Allahabad University",
      "Lucknow University",
      "Banaras Hindu University (BHU)",
      "Chhatrapati Shahu Ji Maharaj University (Kanpur)",
    ],
    coreIssues: [
      "Restoration of university student union elections",
      "Recruitment paper leak prevention and examination integrity",
      "Hostel fee subsidies and anti-privatization resistance",
    ],
    historicalSignificance:
      "Has historically produced multiple state cabinet ministers and MPs for the Samajwadi Party in Uttar Pradesh.",
  },
];

// ============================================================================
// 3. CURRENT UNION GOVERNMENT (18th LOK SABHA: 2024–PRESENT)
// ============================================================================
export const currentGovernment: RulingGovernment = {
  lokSabhaTerm: "18th Lok Sabha",
  electionYear: "2024 (General Elections held in 7 phases)",
  primeMinister: "Narendra Modi (BJP)",
  speakerLokSabha: "Om Birla (BJP)",
  leaderOfHouseRajyaSabha: "J. P. Nadda (BJP)",
  leaderOfOppositionLokSabha: "Rahul Gandhi (INC / I.N.D.I.A)",
  leaderOfOppositionRajyaSabha: "Mallikarjun Kharge (INC / I.N.D.I.A)",
  governingAlliance: "National Democratic Alliance (NDA)",
  governingSeats: 293,
  principalOppositionAlliance:
    "Indian National Developmental Inclusive Alliance (I.N.D.I.A)",
  oppositionSeats: 234,
  totalLokSabhaSeats: 543,
  majorityMark: 272,
  keyAlliancePartners: [
    {
      party: "Bharatiya Janata Party (BJP)",
      seats: 240,
      role: "Lead Ruling Party",
    },
    {
      party: "Telugu Desam Party (TDP)",
      seats: 16,
      role: "Key Governing Partner (Andhra Pradesh)",
    },
    {
      party: "Janata Dal (United) [JD(U)]",
      seats: 12,
      role: "Key Governing Partner (Bihar)",
    },
    {
      party: "Shiv Sena (Eknath Shinde)",
      seats: 7,
      role: "Coalition Partner (Maharashtra)",
    },
    {
      party: "Lok Janshakti Party (Ram Vilas)",
      seats: 5,
      role: "Coalition Partner (Bihar)",
    },
    {
      party: "Janata Dal (Secular) [JD(S)]",
      seats: 2,
      role: "Coalition Partner (Karnataka)",
    },
  ],
  cabinetMinisters: [
    {
      portfolio: "Ministry of External Affairs (EAM)",
      minister: "Dr. S. Jaishankar",
      party: "BJP",
      description:
        "Leads India's foreign policy: strategic autonomy, multi-alignment, Quad engagement, Global South advocacy, and border diplomacy with China.",
    },
    {
      portfolio: "Ministry of Defence (MoD)",
      minister: "Rajnath Singh",
      party: "BJP",
      description:
        "Drives indigenous defense manufacturing (Atmanirbhar Raksha), theater command reorganizations, LAC/LoC defensive postures, and arms export acceleration.",
    },
    {
      portfolio: "Ministry of Home Affairs & Cooperation (MHA)",
      minister: "Amit Shah",
      party: "BJP",
      description:
        "Oversees internal security, counter-terrorism (NIA/UAPA), border management (BSF/ITBP/SSB), FCRA regulatory compliance, and state police modernization.",
    },
    {
      portfolio: "Ministry of Finance & Corporate Affairs (MoF)",
      minister: "Nirmala Sitharaman",
      party: "BJP",
      description:
        "Manages macroeconomic stability, direct and indirect taxation (GST), fiscal deficit management, and capital expenditure infrastructure budgets.",
    },
    {
      portfolio: "Ministry of Health & Family Welfare, Chemicals & Fertilizers",
      minister: "J. P. Nadda",
      party: "BJP",
      description:
        "Oversees public health mission (Ayushman Bharat / PM-JAY), universal vaccination, medical education expansion, chemical industry modernization, and serves as Leader of the House in Rajya Sabha.",
    },
    {
      portfolio: "Ministry of Agriculture & Farmers Welfare, Rural Development",
      minister: "Shivraj Singh Chouhan",
      party: "BJP",
      description:
        "Drives PM-KISAN direct farm income transfers, crop insurance schemes (PMFBY), rural employment, and gram sadak connectivity.",
    },
    {
      portfolio: "Ministry of Housing & Urban Affairs, Power",
      minister: "Manohar Lal Khattar",
      party: "BJP",
      description:
        "Heads urban transformation (Smart Cities, Metro Rail expansion, PM Awas Urban) and national electricity grid reliability.",
    },
    {
      portfolio: "Ministry of Road Transport & Highways (MoRTH)",
      minister: "Nitin Gadkari",
      party: "BJP",
      description:
        "Heads world-record highway construction, Bharatmala expressway networks, border strategic road corridors (BRO), and alternative fuel vehicle infrastructure.",
    },
    {
      portfolio: "Ministry of Electronics & IT, Railways, & I&B",
      minister: "Ashwini Vaishnaw",
      party: "BJP",
      description:
        "Drives the ₹76,000 Cr India Semiconductor Mission (ISM), AI compute infrastructure, telecom reforms (Bharat 6G), and Vande Bharat high-speed train networks.",
    },
    {
      portfolio: "Ministry of Civil Aviation",
      minister: "K. Ram Mohan Naidu",
      party: "TDP",
      description:
        "Coalition partner ministry driving regional airport connectivity (UDAN), drone airspace integration, and international hub development.",
    },
    {
      portfolio: "Ministry of Heavy Industries & Steel",
      minister: "H. D. Kumaraswamy",
      party: "JD(S)",
      description:
        "Coalition partner ministry heading public manufacturing, electric mobility subsidies (FAME / EMPS), and domestic steel production capacity.",
    },
    {
      portfolio: "Ministry of Food Processing Industries",
      minister: "Chirag Paswan",
      party: "LJP (RV)",
      description:
        "Coalition partner ministry driving agro-processing value addition, cold chain logistics, and food processing park development.",
    },
    {
      portfolio: "Ministry of Fisheries, Animal Husbandry & Panchayati Raj",
      minister: "Rajiv Ranjan (Lalan) Singh",
      party: "JD(U)",
      description:
        "Coalition partner ministry driving rural agrarian value chains, marine infrastructure, and decentralized panchayat schemes.",
    },
  ],
};

// ============================================================================
// 4. GREAT POWER RELATIONS & STRATEGIC DYNAMICS
// ============================================================================
export const bilateralRelations: BilateralRelation[] = [
  {
    id: "india-usa",
    country: "United States of America",
    flag: "🇺🇸",
    partnershipTitle: "Comprehensive Global Strategic Partnership",
    status: "Strong Strategic & Technological Convergence",
    executiveSummary:
      "India-US relations have transformed into one of the 21st century's most consequential strategic partnerships. Driven by shared interests in a Free and Open Indo-Pacific, countering Chinese assertiveness, and co-developing frontier technologies under the iCET initiative.",
    keyStrategicConvergences: [
      "The Quad (India, USA, Japan, Australia) maritime security and supply chain resilience.",
      "iCET (initiative on Critical and Emerging Technologies) spanning AI, semiconductors, quantum, and commercial spaceflight.",
      "Defense interoperability agreements (LEMOA, COMCASA, BECA) enabling deep intelligence and logistical sharing.",
      "Shared democratic values, high-skill Indian diaspora (5M+), and massive bilateral educational exchanges.",
    ],
    frictionPointsAndChallenges: [
      "Trade tariffs and market access disagreements in agricultural commodities, data localization, and IP rights.",
      "Divergent postures on Russia: US pressure over Russian crude oil purchases vs India's energy security imperatives.",
      "Visa and immigration bottlenecks (H-1B processing backlogs and Green Card waiting times).",
      "Occasional geopolitical frictions regarding alleged extra-territorial actions and intelligence oversight.",
    ],
    economicAndTradeDynamics:
      "USA is India's largest single trading partner (~$130+ Billion bilateral goods & services trade with an Indian surplus). Major destination for Indian IT software, pharmaceuticals, and engineering products.",
    defenseAndTechCooperation:
      "Historic deal for GE-F414 jet engine co-production in India with 80% tech transfer, procurement of 31 General Atomics MQ-9B SkyGuardian/SeaGuardian drones, and NASA-ISRO Axiom Space mission collaboration.",
    multilateralCorrelation:
      "Co-balancing in the Indo-Pacific, mutual coordination in I2U2 (India-Israel-UAE-USA), and Indian integration into Western critical mineral and supply chain alliances (MSP).",
  },
  {
    id: "india-russia",
    country: "Russian Federation",
    flag: "🇷🇺",
    partnershipTitle: "Special and Privileged Strategic Partnership",
    status: "Time-Tested Strategic & Energy Anchor",
    executiveSummary:
      "A cornerstone of India's post-independence foreign policy. Despite growing Western sanctions following the Ukraine conflict, India has preserved its strategic partnership with Moscow to secure discounted energy, critical defense spare parts, and prevent Russia from becoming an exclusive client state of China.",
    keyStrategicConvergences: [
      "Core supplier of legacy military hardware (60%+ of Indian military inventory has Soviet/Russian lineage).",
      "Crucial energy security partnership: Russia became India's top crude oil supplier supplying discounted Urals crude.",
      "Joint technological co-development: BrahMos supersonic cruise missiles, licensed Su-30MKI production, and Kudankulam Nuclear Power Plant.",
      "Shared support for multipolarity in international governance through BRICS+ and SCO forums.",
    ],
    frictionPointsAndChallenges: [
      "Deepening Moscow-Beijing strategic embrace ('no-limits partnership') which complicates India's security balancing against China.",
      "Delays in military deliveries (S-400 Triumf missile regiments and spare parts) due to the ongoing Ukraine war production drain.",
      "Rupee-Ruble settlement trade imbalances resulting in billions of trapped INR in Indian Vostro accounts.",
    ],
    economicAndTradeDynamics:
      "Bilateral trade surged past $65 Billion, primarily driven by Indian hydrocarbon imports. India is actively seeking Russian market access for pharmaceuticals, machinery, and agricultural exports to narrow the trade deficit.",
    defenseAndTechCooperation:
      "S-400 air defense systems deployment along LAC/LoC, leasing of nuclear-powered attack submarines (Chakra series), joint manufacturing of AK-203 assault rifles at Amethi (UP), and deep cryogenic space collaboration.",
    multilateralCorrelation:
      "Active collaboration in BRICS+ expansion, Shanghai Cooperation Organisation (SCO), and International North-South Transport Corridor (INSTC) via Iran.",
  },
  {
    id: "india-china",
    country: "People's Republic of China",
    flag: "🇨🇳",
    partnershipTitle: "Strategic Rivalry & Border Coexistence",
    status: "Adversarial Competition & Tactical De-escalation",
    executiveSummary:
      "Marked by severe structural competition across the 3,488 km Line of Actual Control (LAC), economic asymmetry, and rivalry for Asian primacy. The relationship entered a freeze post-2020 Galwan Valley clash, leading to massive military mobilization along the Himalayas. Recent patrol agreements (2024) have initiated tactical disengagement, but fundamental strategic friction persists.",
    keyStrategicConvergences: [
      "Participation in non-Western multilateral economic platforms (BRICS+, SCO, Asian Infrastructure Investment Bank - AIIB).",
      "Common positions on climate finance, carbon emission differentiation (Common But Differentiated Responsibilities - CBDR) at COP summits.",
    ],
    frictionPointsAndChallenges: [
      "Unresolved 3,488 km border dispute along LAC: Depsang, Demchok, Pangong Tso, and Chinese claims over Arunachal Pradesh.",
      "Massive trade deficit ($100+ Billion): Indian dependency on Chinese Active Pharmaceutical Ingredients (APIs), solar cells, electronics, and rare earths.",
      "China-Pakistan Economic Corridor (CPEC): Infrastructure passing through Pakistan-Occupied Kashmir (PoK), violating Indian territorial sovereignty.",
      "String of Pearls naval strategy: Chinese surveillance and naval docking access in Sri Lanka (Hambantota), Pakistan (Gwadar), Bangladesh, and Myanmar (Kyaukpyu).",
      "Cross-border trans-Himalayan dam building on the upper Brahmaputra river (Yarlung Tsangpo) with severe water weaponization risks.",
    ],
    economicAndTradeDynamics:
      "Bilateral trade exceeds $135 Billion, but heavily skewed in China's favor. India has banned 300+ Chinese mobile apps (TikTok, PUBG), subjected Chinese FDI to strict national security vetting (Press Note 3), and subsidized domestic alternatives via PLI schemes.",
    defenseAndTechCooperation:
      "Zero defense cooperation. Full-spectrum military deterrence deployed along the Northern borders, backed by mirror deployments of 50,000+ frontline troops, tanks, and S-400 batteries.",
    multilateralCorrelation:
      "Intense geopolitical competition for Global South leadership; Chinese resistance to India's permanent membership in the UN Security Council (UNSC) and Nuclear Suppliers Group (NSG).",
  },
  {
    id: "india-europe",
    country: "European Union & France",
    flag: "🇪🇺 🇫🇷",
    partnershipTitle: "Strategic Autonomy & Economic Partnership",
    status: "Deepening Strategic, Defense & Green Convergence",
    executiveSummary:
      "Europe, led by France and Germany, has emerged as a preferred strategic and technology partner that respects India's strategic autonomy. Convergence is strongest in clean energy, defense acquisitions without restrictive strings, Indo-Pacific maritime security, and supply chain de-risking.",
    keyStrategicConvergences: [
      "France is India's most dependable Western defense ally: zero political sanctions history, complete sovereign tech transfers (Rafale-M fighters, Scorpene submarines, Safran jet engine cooperation).",
      "India-EU Trade and Technology Council (TTC) for digital governance, semiconductor standards, and green hydrogen supply chains.",
      "IMEC (India-Middle East-Europe Economic Corridor) connectivity corridor linking Mumbai/Gujarat to European ports via UAE, Saudi Arabia, and Israel/Greece.",
      "Shared commitment to a multipolar world order and strategic sovereignty.",
    ],
    frictionPointsAndChallenges: [
      "EU's Carbon Border Adjustment Mechanism (CBAM) imposing carbon tariffs on Indian steel, aluminum, and fertilizers.",
      "Prolonged negotiations over the India-EU Free Trade Agreement (FTA) due to disputes on dairy tariffs, automotive market access, and labor standards.",
      "European political debates regarding human rights and democratic indices.",
    ],
    economicAndTradeDynamics:
      "EU is India's second-largest goods export destination (~$75+ Billion exports). Crucial provider of high-end industrial capital equipment, robotics, precision machine tools, and semiconductor lithography support.",
    defenseAndTechCooperation:
      "French Dassault Rafale fighters in IAF and Indian Navy, joint manufacturing of Kalvari-class diesel-electric attack submarines at Mazagon Dock, and aerospace partnerships with Airbus (C-295 transport aircraft assembly in Vadodara).",
    multilateralCorrelation:
      "Cooperation in the International Solar Alliance (ISA), trilateral maritime dialogues (India-France-UAE, India-France-Australia), and green industrial alliances.",
  },
];

// ============================================================================
// 5. BORDER SECURITY & TERRITORIAL INTEGRITY CHALLENGES
// ============================================================================
export const borderChallenges: BorderChallenge[] = [
  {
    id: "lac-china",
    borderName: "Line of Actual Control (LAC)",
    front: "Northern & Eastern Front",
    counterpartCountry: "China (Tibet Autonomous Region & Xinjiang)",
    borderLength: "3,488 km (Western, Middle, Eastern Sectors)",
    keySectors: [
      "Western Sector (Ladakh): Depsang Plains, Demchok, Galwan Valley, Pangong Tso, Chushul",
      "Middle Sector: Himachal Pradesh & Uttarakhand (Barahoti)",
      "Eastern Sector: Arunachal Pradesh (Tawang, Yangtse, Walong) & Sikkim (Doklam Plateau)",
    ],
    strategicSignificance:
      "The primary conventional military flashpoint for India. China contests the Mc-Mahon line in the East and occupies 38,000 sq km in Aksai Chin in the West. Control over high-altitude Himalayan ridges dictates surveillance, artillery vantage, and access to crucial passes.",
    currentSecurityPosture:
      "50,000+ frontline troops in permanent high-altitude deployment with T-90 Bhishma tanks, K9 Vajra artillery, and S-400 missile systems. 2024 disengagement pact enabled patrolling rights in Depsang and Demchok, maintaining active vigil.",
    majorFlashpointsAndChallenges: [
      "Chinese 'Salami Slicing' tactics: gradual nibbling of territory via grey-zone infrastructure and nomad grazing blockades.",
      "Rapid Chinese buildup of dual-use 'Xiaokang' border defense villages, heliports, and underground hardened shelters across Tibet.",
      "Winter weather challenges: sub-zero temperatures (-40°C), frostbite, and logistical maintenance at 16,000+ ft altitudes.",
    ],
    infrastructureAndDefensiveMeasures: [
      "Border Roads Organisation (BRO) capital push: Sela Tunnel (Arunachal), Atal Tunnel, Zojila Tunnel, and all-weather Darbuk-Shyok-Daulat Beg Oldie (DS-DBO) strategic road.",
      "Vibrant Villages Programme: funding 2,900+ border villages with roads, power, 4G telecom, and tourism to prevent depopulation.",
      "Indo-Tibetan Border Police (ITBP) expansion with 7 new battalions and advanced thermal drone surveillance.",
    ],
  },
  {
    id: "loc-pakistan",
    borderName: "Line of Control (LoC) & International Border (IB)",
    front: "Western Front",
    counterpartCountry: "Pakistan",
    borderLength: "3,323 km (740 km LoC + 110 km AGPL Siachen + 2,473 km IB)",
    keySectors: [
      "Kashmir Valley LoC: Kupwara, Uri, Poonch, Rajouri",
      "Siachen Glacier (Actual Ground Position Line - AGPL)",
      "International Border: Jammu, Punjab, Rajasthan, and Sir Creek (Gujarat marshlands)",
    ],
    strategicSignificance:
      "Active front for asymmetric warfare, infiltration of trained terrorists, and cross-border artillery duels. The Siachen Glacier prevents collusion between Pakistani forces and Chinese forces in the Shaksgam Valley / Karakoram Pass.",
    currentSecurityPosture:
      "Multi-tiered Anti-Infiltration Obstacle System (AIOS) fencing, thermal imagers, battlefield surveillance radars (BFSR), and round-the-clock Indian Army & BSF vigil. 2021 Ceasefire Agreement largely observed on artillery, but infiltration persists.",
    majorFlashpointsAndChallenges: [
      "Cross-border drone infiltration: weaponized quadcopters dropping assault rifles, Chinese pistols, and synthetic narcotics (heroin) into Punjab and Jammu.",
      "Pakistan's deep state (ISI) sponsoring proxy terror groups: Lashkar-e-Taiba (LeT/TRF), Jaish-e-Mohammed (JeM), and Hizbul Mujahideen.",
      "Terrorist shifting tactics from Kashmir Valley into the densely forested hill terrain of Jammu (Rajouri, Poonch, Doda).",
    ],
    infrastructureAndDefensiveMeasures: [
      "Smart Border Fencing (CIBMS) integrating thermal cameras, underground fiber-optic seismic sensors, and laser barriers.",
      "Anti-Drone Kinetic & Electronic Warfare Systems deployed across Punjab and Jammu borders.",
      "Indian Air Force and Army retaliatory strike doctrines (Balakot precedent) asserting zero tolerance for state-sponsored terror.",
    ],
  },
  {
    id: "indian-ocean-region",
    borderName: "Indian Ocean Region (IOR) & Maritime Exclusive Economic Zone",
    front: "Southern Maritime Domain",
    counterpartCountry: "Indian Ocean Littorals (China naval proxy presence)",
    borderLength: "7,516 km Coastline + 2.37 Million sq km EEZ",
    keySectors: [
      "Chokepoints: Strait of Malacca, Bab-el-Mandeb, Strait of Hormuz, Sunda Strait",
      "Island Outposts: Andaman & Nicobar Command (Port Blair), Lakshadweep (INS Jatayu)",
      "Offshore littoral waters: Arabian Sea and Bay of Bengal",
    ],
    strategicSignificance:
      "India sits at the center of the world's most critical maritime energy and commercial sea lanes (SLOCs). Over 80% of world seaborne oil trade passes through the Indian Ocean. Security of island territories is crucial to block Chinese naval encirclement.",
    currentSecurityPosture:
      "Net Security Provider posture by the Indian Navy. Dual-aircraft carrier battle groups (INS Vikramaditya & indigenous INS Vikrant), P-8I Poseidon maritime patrol aircraft, and P-15B guided-missile destroyers.",
    majorFlashpointsAndChallenges: [
      "Chinese 'String of Pearls' & dual-use ports: regular visits of PLAN Yuan-class submarines and Yuan Wang surveillance research vessels to Colombo and Hambantota (Sri Lanka).",
      "Red Sea and Gulf of Aden crisis: Houthi ballistic missile and drone attacks on commercial merchant vessels requiring active Indian Navy escort and hostage rescue missions.",
      "Illegal, Unreported and Unregulated (IUU) fishing fleets operating in sovereign waters.",
    ],
    infrastructureAndDefensiveMeasures: [
      "Commissioning of INS Jatayu naval base on Minicoy Island (Lakshadweep) for enhanced Arabian Sea monitoring.",
      "Massive militarization of the Andaman & Nicobar Command (ANC): runway extensions to host P-8I and fighter jets dominating the Malacca Strait opening.",
      "Information Fusion Centre - Indian Ocean Region (IFC-IOR) in Gurugram, sharing real-time maritime domain awareness with 25+ partner nations.",
    ],
  },
  {
    id: "myanmar-border",
    borderName: "Indo-Myanmar Border & Northeast Security",
    front: "Eastern Frontier",
    counterpartCountry: "Myanmar (Sagaing & Chin State)",
    borderLength: "1,643 km (Mizoram, Manipur, Nagaland, Arunachal Pradesh)",
    keySectors: [
      "Moreh - Tamu transit corridor (Manipur)",
      "Zokhawthar border point (Mizoram)",
      "Chassad & Somra tract (Nagaland-Manipur)",
    ],
    strategicSignificance:
      "Gateway for India's Act East Policy (Kaladan Multi-Modal Transit Transport Project and India-Myanmar-Thailand Trilateral Highway). Crucial for preventing safe havens for Northeast insurgent factions.",
    currentSecurityPosture:
      "Assam Rifles guarding the frontier. In 2024, the Government of India officially abolished the Free Movement Regime (FMR) and sanctioned ₹31,000 Crore for complete smart fencing of the 1,643 km border.",
    majorFlashpointsAndChallenges: [
      "Civil war in Myanmar post-2021 military junta coup: fighting between Tatmadaw and ethnic armed groups (PDF, Chin National Army, Arakan Army).",
      "Spillover of armed fighters, illicit golden triangle narcotics, and illegal weapon flows fueling ethnic unrest in Manipur.",
      "Refugee inflows into Mizoram and Manipur straining local demographics and administration.",
    ],
    infrastructureAndDefensiveMeasures: [
      "Complete smart fencing and hybrid surveillance towers along the entire 1,643 km border.",
      "Installation of biometric and biographic identification systems for all cross-border movements.",
      "Joint operations by Assam Rifles and Indian Army against insurgent hideouts along the zero line.",
    ],
  },
];

// ============================================================================
// 6. INTERNAL SECURITY, EXTREMISM & FOREIGN FUNDING THREATS
// ============================================================================
export const internalSecurityThreats: InternalSecurityThreat[] = [
  {
    id: "foreign-funding-fcra",
    title: "Illicit Foreign Funding & FCRA Regulatory Enforcement",
    category: "foreign-funding",
    categoryLabel: "Foreign Funding & Shell Entities",
    threatDescription:
      "Hostile foreign state actors, overseas ideological lobbies, and foreign-funded NGOs funnelling hundreds of millions of dollars to stall Indian developmental megaprojects (mining, nuclear plants, highways), create communal friction, and run anti-state influence operations.",
    mechanismsAndVectors: [
      "Misuse of FCRA-registered non-governmental organizations to route foreign donations into subversive campus agitations and legal defense for terror accused.",
      "Underground Hawala networks transferring untraceable cash through Middle Eastern and Southeast Asian trading hubs.",
      "Over-invoicing and under-invoicing in cross-border import/export shell corporations.",
      "Cryptocurrency transfers through decentralized exchanges and anonymous privacy coins to bypass central bank tracking.",
    ],
    regulatoryAndLegalFramework: [
      "Foreign Contribution (Regulation) Act (FCRA) 2010 & 2020 Amendments: mandating all foreign funding to be received strictly via the dedicated SBI New Delhi Main Branch account.",
      "Mandatory biometric and Aadhaar reporting of all key NGO functionaries and capping administrative expenses at 20%.",
      "Prevention of Money Laundering Act (PMLA) 2002: enabling asset attachment and criminal prosecution by the Enforcement Directorate.",
    ],
    enforcementAgencies: [
      "Ministry of Home Affairs (Foreigners Division - FCRA Monitoring Unit)",
      "Financial Intelligence Unit - India (FIU-IND)",
      "Enforcement Directorate (ED)",
      "Central Bureau of Investigation (CBI - Special Crimes Unit)",
    ],
    majorInterventionsAndBans: [
      "Cancellation of FCRA licenses of thousands of non-compliant foreign and domestic NGOs found diverting developmental funds.",
      "Freezing of bank accounts belonging to foreign-backed entities running covert protests against Kudankulam Nuclear Plant and Sterlite Copper plant.",
      "Compliance with Financial Action Task Force (FATF) mutual evaluations, resulting in India achieving top-tier compliance ratings for anti-money laundering (AML).",
    ],
  },
  {
    id: "radicalization-pfi-uapa",
    title: "Islamist Radicalization, Sleeper Cells & The PFI Ban",
    category: "extremism-radicalization",
    categoryLabel: "Extremism & Radical Outfits",
    threatDescription:
      "Transnational and domestic radical Islamist networks attempting to subvert India's constitutional democracy through radicalization of youth, targeted communal assassinations, running arms training camps, and establishing an extremist Islamic state structure.",
    mechanismsAndVectors: [
      "Creation of deceptive front organizations masquerading as human rights and charity outfits (e.g., Campus Front of India, Rehab India Foundation, National Women's Front).",
      "Online self-radicalization modules via encrypted messaging applications (Telegram, Signal) curated by handlers from ISIS-Khorasan and Al-Qaeda in the Indian Subcontinent (AQIS).",
      "Targeted killings of nationalist political workers, religious converts, and communal flashpoint provocations.",
      "Cross-border sleeper cells funded through Gulf charities and shell businesses.",
    ],
    regulatoryAndLegalFramework: [
      "Unlawful Activities (Prevention) Act (UAPA) 1967 & 2019 Amendment: empowering the central government to designate organizations and individuals as terrorists.",
      "National Investigation Agency (NIA) Act: granting extraterritorial and nationwide jurisdiction to investigate terror offenses without state police permission.",
      "Banning of 44+ terror organizations and designated individual terrorists under the First Schedule of UAPA.",
    ],
    enforcementAgencies: [
      "National Investigation Agency (NIA)",
      "Intelligence Bureau (IB - Multi-Agency Centre / MAC)",
      "State Police Anti-Terror Squads (ATS) and Special Operations Groups (SOG)",
      "Research & Analysis Wing (R&AW - external terror module tracing)",
    ],
    majorInterventionsAndBans: [
      "Nationwide multi-agency midnight raids (Operation Octopus) in September 2022 leading to the comprehensive 5-year ban on the Popular Front of India (PFI) and 8 affiliated front bodies under UAPA.",
      "Unearthing of PFI's 'India 2047' manifesto outlining blueprint for subverting Indian state institutions through street muscle and judicial subversion.",
      "Dismantling of cross-border ISIS modules in Kerala, Tamil Nadu, Karnataka, and Delhi involved in Coimbatore and Mangaluru blast conspiracies.",
      "Strict continuation of the ban on Students Islamic Movement of India (SIMI).",
    ],
  },
  {
    id: "cross-border-narco-terror",
    title: "Cross-Border Narco-Terrorism & Drone Infiltration",
    category: "narco-terror",
    categoryLabel: "Narco-Terror & Organized Crime",
    threatDescription:
      "Pakistan's intelligence establishment (ISI) combining illicit Afghan heroin trafficking with drone-based small arms delivery into Indian border states (Punjab, J&K) to fund terror sleeper cells and addict youth.",
    mechanismsAndVectors: [
      "Commercial and customized heavy-payload drones flying at low radar altitudes across the Punjab and Jammu International Border.",
      "Drug consignments dropped in agricultural fields, collected by local gangsters, and monetized to buy weapons for terror groups (Lashkar/TRF, Khalistani separatist gangs).",
      "Maritime drug smuggling via Pakistani dhows into Gujarat (Porbandar, Kutch) and Maharashtra coastal waters.",
    ],
    regulatoryAndLegalFramework: [
      "Narcotic Drugs and Psychotropic Substances (NDPS) Act 1985 with stringent bail provisions and property confiscation.",
      "National Cyber Coordination Centre (NCCC) & NATGRID linking border intelligence.",
    ],
    enforcementAgencies: [
      "Narcotics Control Bureau (NCB)",
      "Border Security Force (BSF)",
      "Indian Coast Guard (ICG)",
      "National Investigation Agency (NIA)",
    ],
    majorInterventionsAndBans: [
      "Seizure of tens of thousands of kilograms of high-grade heroin worth over ₹30,000 Crore in joint NCB-Indian Navy maritime interceptions (Operation Samudragupt).",
      "Destruction of 300+ cross-border drones using indigenous anti-drone jammer and capture systems developed by DRDO and Indian defense startups.",
      "Attachment of properties belonging to overseas gangster-terrorist networks operating from Canada, Pakistan, and Europe.",
    ],
  },
];

// ============================================================================
// 7. CURATED GEOPOLITICS THINK TANKS & RESEARCH JOURNALS
// ============================================================================
export const policyThinkTanks: PolicyThinkTank[] = [
  {
    id: "idsa-manohar-parrikar",
    name: "Manohar Parrikar Institute for Defence Studies and Analyses (MP-IDSA)",
    organization: "MP-IDSA / Ministry of Defence",
    url: "https://www.idsa.in/",
    country: "India",
    focusAreas: [
      "Defense Strategy & Military Doctrine",
      "China & East Asia Military Affairs",
      "Nuclear Strategy & Arms Control",
      "Internal Security & Counter-Terrorism",
    ],
    description:
      "India's foremost government-funded security and defense think tank. Publishes peer-reviewed strategic analyses, the Strategic Analysis journal, and detailed briefs on LAC border developments and defense modernization.",
    tier: "Premier Think Tank",
  },
  {
    id: "observer-research-foundation",
    name: "Observer Research Foundation (ORF)",
    organization: "ORF India",
    url: "https://www.orfonline.org/",
    country: "India",
    focusAreas: [
      "Geopolitics & International Relations",
      "The Raisina Dialogue (India's flagship security conference)",
      "Tech Policy & Digital Geoeconomics",
      "Energy Security & Climate Transition",
    ],
    description:
      "One of the Global South's most influential independent think tanks. Organizes the annual Raisina Dialogue with the Ministry of External Affairs, drawing global foreign ministers and heads of state.",
    tier: "Premier Think Tank",
  },
  {
    id: "mea-official-portal",
    name: "Ministry of External Affairs (MEA) Official Portal",
    organization: "Government of India",
    url: "https://www.mea.gov.in/",
    country: "India",
    focusAreas: [
      "Official Foreign Policy Statements",
      "Bilateral Treaties & Joint Communiqués",
      "Media Briefings by Official Spokesperson",
      "Parliamentary Q&A on Foreign Affairs",
    ],
    description:
      "The definitive canonical source for India's foreign policy doctrines, official transcripts of diplomatic meetings, boundary accords, and bilateral agreement texts.",
    tier: "Official Ministry Portal",
  },
  {
    id: "gateway-house",
    name: "Gateway House: Indian Council on Global Relations",
    organization: "Gateway House",
    url: "https://www.gatewayhouse.in/",
    country: "India",
    focusAreas: [
      "Geoeconomics & Maritime Trade",
      "Bilateral Investment & Supply Chains",
      "Fintech & Digital Public Infrastructure",
      "Space & Critical Mineral Geopolitics",
    ],
    description:
      "Mumbai-based foreign policy think tank focused on the intersection of geopolitics, business, international finance, and national economic security.",
    tier: "Premier Think Tank",
  },
  {
    id: "carnegie-india",
    name: "Carnegie India",
    organization: "Carnegie Endowment for International Peace",
    url: "https://carnegieindia.org/",
    country: "India / USA",
    focusAreas: [
      "Technology & Geopolitics (Global Tech Summit)",
      "Defense Innovation & iCET Collaboration",
      "Political Economy & Public Policy",
    ],
    description:
      "High-impact research hub organizing the annual Global Technology Summit, focusing on the geopolitical implications of semiconductors, AI governance, and India-US tech cooperation.",
    tier: "Premier Think Tank",
  },
  {
    id: "united-service-institution",
    name: "United Service Institution of India (USI)",
    organization: "USI India",
    url: "https://usiofindia.org/",
    country: "India",
    focusAreas: [
      "Tri-Service Military Operations",
      "Strategic Thought & Military History",
      "UN Peacekeeping Operations",
      "Himalayan Border Strategy",
    ],
    description:
      "Founded in 1870, USI is India's oldest defense and security think tank for tri-service military officers, conducting seminal wargames, combat doctrine assessments, and strategic military research.",
    tier: "Premier Think Tank",
  },
  {
    id: "foreign-affairs-journal",
    name: "Foreign Affairs Journal",
    organization: "Council on Foreign Relations (CFR)",
    url: "https://www.foreignaffairs.com/",
    country: "United States",
    focusAreas: [
      "Global Grand Strategy",
      "Great Power Competition (US-China-Russia)",
      "International Order & Deterrence",
    ],
    description:
      "The world's leading journal on international relations and US foreign policy, featuring seminal essays by global leaders and strategic thinkers on India's rising power.",
    tier: "International Journal",
  },
];
