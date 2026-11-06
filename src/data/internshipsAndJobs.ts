export interface InternshipPortal {
  id: string;
  name: string;
  category: "academic" | "opensource" | "startup" | "jobboard" | "government";
  categoryLabel: string;
  targetAudience: string;
  stipendRange: string;
  applicationWindow: string;
  location: string;
  description: string;
  officialUrl: string;
  verified: boolean;
  tags: string[];
  keyTips: string[];
}

export interface OutreachTemplate {
  id: string;
  title: string;
  purpose: string;
  targetRecipient: string;
  subjectLine: string;
  body: string;
  guidelines: string[];
}

export interface CareerGuideline {
  step: number;
  title: string;
  summary: string;
  checklist: string[];
}

export const internshipCategories = [
  { id: "all", label: "All Opportunities" },
  { id: "academic", label: "Academic & Research Fellowships" },
  { id: "opensource", label: "Open Source Fellowships" },
  { id: "startup", label: "Startup & High-Growth AI" },
  { id: "jobboard", label: "Verified Job Portals" },
  { id: "government", label: "Government & PSUs" },
] as const;

export const verifiedPortals: InternshipPortal[] = [
  // --- Academic & Research Fellowships ---
  {
    id: "iasc-srfp",
    name: "IASc-INSA-NASI Summer Research Fellowship (SRFP)",
    category: "academic",
    categoryLabel: "Academic Fellowship",
    targetAudience: "B.Tech, M.Sc, M.Tech, Integrated Ph.D. students",
    stipendRange:
      "Monthly stipend (~₹10,000 - ₹12,500) + Round-trip train fare",
    applicationWindow:
      "October - November annually (Summer tenure: May - July)",
    location: "IISc, IITs, TIFR, IISERs, CSIR Labs across India",
    description:
      "India's most prestigious national research fellowship jointly conducted by the three national science academies (Indian Academy of Sciences, INSA New Delhi, NASI Prayagraj). Fellows are paired with Academy Fellows to conduct intensive 2-month research.",
    officialUrl: "https://web-japps.ias.ac.in:8443/fellowship2024/",
    verified: true,
    tags: [
      "Prestigious",
      "Govt Recognized",
      "Pure & Applied Research",
      "IISc/IIT Mentors",
    ],
    keyTips: [
      "Craft a specific 150-250 word research proposal aligned with the mentor's recent publications.",
      "Secure a strong recommendation letter from your department Head or faculty mentor.",
      "Mention prior coursework in Linear Algebra, Algorithms, or relevant domain topics.",
    ],
  },
  {
    id: "iit-bombay-surp",
    name: "IIT Bombay Summer Undergraduate Research Program (SURP)",
    category: "academic",
    categoryLabel: "Academic Fellowship",
    targetAudience: "Pre-final year undergraduates & Master's students",
    stipendRange:
      "Certificate of Merit + Hostel Accommodation (subsidized) / Faculty funding",
    applicationWindow: "February - March annually (Summer: May - July)",
    location: "IIT Bombay, Powai, Mumbai",
    description:
      "Flagship research internship conducted by the Academic Affairs wing at IIT Bombay. Students work directly in cutting-edge computer science, robotics, AI, and systems engineering labs alongside IITB faculty.",
    officialUrl: "https://www.iitb.ac.in/en/education/summer-internship",
    verified: true,
    tags: ["IIT Bombay", "AI & Robotics Labs", "Faculty Mentored"],
    keyTips: [
      "Filter project listings by the Department of Computer Science and Centre for Machine Intelligence and Data Science (C-MInDS).",
      "Highlight verifiable GitHub implementations or research paper summaries in your statement of purpose.",
    ],
  },
  {
    id: "iit-madras-summer",
    name: "IIT Madras Summer Fellowship Programme",
    category: "academic",
    categoryLabel: "Academic Fellowship",
    targetAudience: "3rd Year B.Tech / 1st Year M.Sc & M.Tech students",
    stipendRange: "₹6,000 / month for 2 months + Free campus accommodation",
    applicationWindow: "January - February annually (Summer: May - July)",
    location: "IIT Madras, Chennai, Tamil Nadu",
    description:
      "Two-month fully residential research fellowship program at IIT Madras designed to expose students to state-of-the-art computational infrastructure, AI research centres (including Wadhwani AI / RBCDSAI), and engineering labs.",
    officialUrl: "https://sfp.iitm.ac.in/",
    verified: true,
    tags: ["IIT Madras", "RBCDSAI", "Stipend Included", "Residential"],
    keyTips: [
      "Prepare your academic transcripts and top 5% class rank certificate if available.",
      "Emphasize practical proficiency in PyTorch, scientific Python (NumPy, SciPy), or C++.",
    ],
  },
  {
    id: "iit-roorkee-spark",
    name: "IIT Roorkee SPARK Research Fellowship",
    category: "academic",
    categoryLabel: "Academic Fellowship",
    targetAudience:
      "UG and PG students across Indian & international universities",
    stipendRange: "₹2,500 / week (Total ₹20,000 - ₹25,000 for tenure)",
    applicationWindow: "February - March annually",
    location: "IIT Roorkee, Uttarakhand",
    description:
      "Institute-funded initiative to attract bright undergraduate and postgraduate talent. Offers access to high-performance computing clusters and direct research collaboration with IIT Roorkee faculty members.",
    officialUrl: "https://spark.iitr.ac.in/",
    verified: true,
    tags: ["IIT Roorkee", "Competitive Stipend", "HPC Access"],
    keyTips: [
      "CGPA cutoff is typically ≥ 7.5 for IIT/NIT/CFTI applicants and ≥ 8.0 for others.",
      "Match your prior projects closely to the faculty’s advertised project codes.",
    ],
  },
  {
    id: "iit-gandhinagar-srip",
    name: "IIT Gandhinagar Summer Research Internship (SRIP)",
    category: "academic",
    categoryLabel: "Academic Fellowship",
    targetAudience: "Undergraduate and Master's students",
    stipendRange: "₹2,000 / week + Free on-campus hostel stay",
    applicationWindow: "February - March annually",
    location: "IIT Gandhinagar, Gujarat",
    description:
      "Open to students from all universities. Focuses on multidisciplinary scientific computing, deep learning, natural language processing, and smart systems with dedicated project mentors.",
    officialUrl: "https://srip.iitgn.ac.in/",
    verified: true,
    tags: ["IIT Gandhinagar", "Interdisciplinary", "Hostel Included"],
    keyTips: [
      "Faculty shortlist candidates based on explicit project code applications.",
      "Include a direct link to a concise 1-page CV hosted on GitHub or Google Drive.",
    ],
  },
  {
    id: "iiit-hyderabad-internship",
    name: "IIIT Hyderabad Research Internships (CVIT & LTRC)",
    category: "academic",
    categoryLabel: "Academic Fellowship",
    targetAudience:
      "B.Tech, M.Sc, M.Tech with strong coding & mathematical foundations",
    stipendRange:
      "Competitive monthly stipend (₹15,000 - ₹25,000 based on lab & funding)",
    applicationWindow: "Rolling / Spring & Summer calls (Check lab portal)",
    location: "IIIT Hyderabad, Gachibowli, Telangana",
    description:
      "Intern in India's leading computer vision and natural language processing institutes — the Centre for Visual Information Technology (CVIT) and Language Technologies Research Centre (LTRC). Known for high publication rates at CVPR, ICCV, and ACL.",
    officialUrl: "https://cvit.iiit.ac.in/internships",
    verified: true,
    tags: ["IIIT Hyderabad", "A* Paper Track Record", "CVIT", "NLP"],
    keyTips: [
      "Proficiency in PyTorch and baseline reproduction of classic vision/NLP papers is highly valued.",
      "Demonstrate competitive programming rank or open-source ML contributions in your application.",
    ],
  },
  {
    id: "mitacs-globalink",
    name: "Mitacs Globalink Research Internship (GRI)",
    category: "academic",
    categoryLabel: "Academic Fellowship",
    targetAudience:
      "Pre-final year undergraduates from eligible partner countries (including India)",
    stipendRange:
      "Fully funded: Airfare + Housing + Health Insurance + Weekly stipend (CAD $10,000+ total value)",
    applicationWindow: "August - September annually (for the following summer)",
    location: "Canadian Universities (Toronto, UBC, McGill, Waterloo, etc.)",
    description:
      "Elite competitive research internship pairing top international students with Canadian university professors for 12 weeks of intensive research. Includes Canadian graduate school pathway fellowships.",
    officialUrl:
      "https://www.mitacs.ca/our-programs/globalink-research-internship-students/",
    verified: true,
    tags: ["Global", "Canada", "Fully Funded", "Top Universities"],
    keyTips: [
      "Select 3 to 7 candidate projects distributed across multiple provinces and universities.",
      "Get two detailed academic letters of recommendation from professors who know your technical rigor.",
      "Proofread your rationale for each chosen project to explain your unique skillset fit.",
    ],
  },
  {
    id: "daad-wise",
    name: "DAAD WISE (Working Internships in Science and Engineering)",
    category: "academic",
    categoryLabel: "Academic Fellowship",
    targetAudience:
      "5th/6th semester B.Tech or Master's students in Indian institutions",
    stipendRange:
      "Monthly scholarship (€934) + Travel allowance (€1,050) + Health insurance",
    applicationWindow: "September - November annually (for following summer)",
    location:
      "Public universities and research institutes across Germany (MPI, Fraunhofer, TU9)",
    description:
      "German Academic Exchange Service flagship program targeting Indian engineering and computer science students to perform 2 to 3-month research under leading German scientists and Max Planck / Fraunhofer researchers.",
    officialUrl:
      "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    verified: true,
    tags: ["Germany", "Europe", "Max Planck / TU9", "High Stipend"],
    keyTips: [
      "You must secure an official invitation / acceptance letter from a German professor first.",
      "Initiate cold emails to German professors between July and September before the DAAD portal closes.",
    ],
  },

  // --- Open Source Fellowships ---
  {
    id: "gsoc",
    name: "Google Summer of Code (GSoC)",
    category: "opensource",
    categoryLabel: "Open Source Fellowship",
    targetAudience:
      "Students & beginner open-source developers worldwide (18+)",
    stipendRange:
      "Global stipend tier: ~$1,500 - $3,300 USD (based on regional PPP & project size)",
    applicationWindow:
      "Organizations announced in February; Student proposals in March - April",
    location: "100% Remote Global",
    description:
      "Global mentorship program bringing new contributors into open source software development. Work with top organisations like Linux Foundation, PyTorch, TensorFlow, Apache, Blender, and Wikimedia over 12 to 22 weeks.",
    officialUrl: "https://summerofcode.withgoogle.com/",
    verified: true,
    tags: [
      "Google Sponsored",
      "Remote",
      "Top Tier Open Source",
      "Global Prestige",
    ],
    keyTips: [
      "Start contributing early (December - February) before proposals open: fix 'good first issues' and submit clean PRs.",
      "Engage respectfully on organisation Slack/Discord/Mailing lists with mentors.",
      "Write a detailed proposal with weekly deliverables, architecture diagrams, and testing methodologies.",
    ],
  },
  {
    id: "lfx-mentorship",
    name: "Linux Foundation Mentorship (LFX)",
    category: "opensource",
    categoryLabel: "Open Source Fellowship",
    targetAudience:
      "Developers looking to work on mission-critical open infrastructure",
    stipendRange: "Stipend of $3,000 - $6,600 USD based on country tier",
    applicationWindow:
      "Three terms per year: Spring (Jan-Feb), Summer (April-May), Fall (July-Aug)",
    location: "100% Remote Global",
    description:
      "Direct paid mentorship program backed by The Linux Foundation, Cloud Native Computing Foundation (CNCF), Hyperledger, PyTorch, and LF AI & Data. Work directly with core maintainers of Kubernetes, Envoy, and Linux.",
    officialUrl: "https://lfx.linuxfoundation.org/tools/mentorship/",
    verified: true,
    tags: ["Linux Foundation", "CNCF", "Remote", "Cloud & AI"],
    keyTips: [
      "Build a portfolio of pull requests solving real issues in CNCF or LF AI repositories.",
      "Review the project prerequisites carefully; maintainers often select candidates who demonstrate prior familiarity with Go, Rust, or C++.",
    ],
  },
  {
    id: "mlh-fellowship",
    name: "Major League Hacking (MLH) Fellowship",
    category: "opensource",
    categoryLabel: "Open Source Fellowship",
    targetAudience: "Aspiring software engineers and open-source contributors",
    stipendRange: "Need-based educational stipend up to $5,000 USD",
    applicationWindow:
      "Rolling admissions year-round across Spring, Summer, and Fall batches",
    location: "100% Remote Global",
    description:
      "12-week intensive remote internship alternative. Fellows collaborate on real-world open-source projects used by millions or build solutions alongside corporate sponsor engineering teams (Meta, GitHub, AWS).",
    officialUrl: "https://fellowship.mlh.io/",
    verified: true,
    tags: ["MLH", "Sponsored by Meta & GitHub", "Team Based", "Remote"],
    keyTips: [
      "Code sample review is the first elimination round: submit a project with clean modular architecture, unit tests, and a descriptive README.",
      "Prepare for a live technical interview explaining your design decisions and code tradeoffs.",
    ],
  },
  {
    id: "outreachy",
    name: "Outreachy Diversity Internships",
    category: "opensource",
    categoryLabel: "Open Source Fellowship",
    targetAudience:
      "Individuals facing systemic bias or underrepresented in the tech industry",
    stipendRange: "$7,000 USD stipend + $500 USD travel/conference fund",
    applicationWindow:
      "Two cohorts: Mid-Jan to mid-Feb (May batch) & Early Aug to mid-Sept (Dec batch)",
    location: "100% Remote Global",
    description:
      "Provides paid, 3-month remote internships in free and open-source software (FOSS). Interns work with mentors from Mozilla, Wikimedia, Fedora, GNOME, and OpenStack on development, UX, and ML data engineering.",
    officialUrl: "https://www.outreachy.org/",
    verified: true,
    tags: ["Outreachy", "FOSS", "Remote", "Diversity Focused"],
    keyTips: [
      "Initial essay application evaluates background and systemic obstacles — be authentic and specific.",
      "The contribution phase requires recording real, verifiable contributions on the public project tracker.",
    ],
  },

  // --- Startup & High-Growth AI ---
  {
    id: "wellfound",
    name: "Wellfound (Formerly AngelList Talent)",
    category: "startup",
    categoryLabel: "Startup & AI",
    targetAudience: "Engineers, ML practitioners, full-stack builders",
    stipendRange:
      "Market rate / Equity options / Full compensation transparency",
    applicationWindow: "Continuous year-round hiring",
    location:
      "Global / Remote & Hybrid / India Tech Hubs (Bengaluru, NCR, Hyderabad)",
    description:
      "The premier global platform for startup hiring. Unlike traditional job boards, Wellfound lets you apply directly to founding teams, CTOs, and engineering directors with clear compensation benchmarks, seed funding details, and zero recruiter spam.",
    officialUrl: "https://wellfound.com/jobs",
    verified: true,
    tags: [
      "Startup",
      "Direct Founder Access",
      "Equity & Salary Visible",
      "AI Startups",
    ],
    keyTips: [
      "Write a tailored, personalized candidate pitch note (100 words) addressing why you care about their specific product.",
      "Highlight live demo URLs and GitHub repositories directly in your profile.",
    ],
  },
  {
    id: "yc-workatastartup",
    name: "Y Combinator — Work at a Startup",
    category: "startup",
    categoryLabel: "Startup & AI",
    targetAudience:
      "Builders, AI developers, CS students seeking high-growth teams",
    stipendRange: "Competitive US & Global startup compensation + Early equity",
    applicationWindow: "Continuous year-round hiring",
    location: "San Francisco, New York, Bengaluru, Remote Global",
    description:
      "Official hiring platform for Y Combinator-backed startups (the incubator behind Stripe, Airbnb, Dropbox, OpenAI, Scale AI). One single standardized profile allows you to apply to hundreds of fast-growing, venture-backed companies.",
    officialUrl: "https://www.workatastartup.com/",
    verified: true,
    tags: [
      "Y Combinator",
      "Silicon Valley",
      "Cutting-edge AI",
      "Zero Middlemen",
    ],
    keyTips: [
      "YC founders prioritize demonstrated shipping capability: showcase side projects that solve real problems.",
      "Be explicit about your technical stack and availability for internships or new-grad roles.",
    ],
  },
  {
    id: "simplify-jobs",
    name: "Simplify & Summer 2026 Tech Internships Tracker",
    category: "jobboard",
    categoryLabel: "Curated Tracker",
    targetAudience: "Undergraduate & Graduate Computer Science candidates",
    stipendRange:
      "Varies ($25 - $75+/hr US / ₹30k - ₹1.5L+/mo India for Tier-1 firms)",
    applicationWindow:
      "Opens as early as July-August for following year summer internships",
    location: "India, US, Europe, Remote",
    description:
      "Community-driven verified repository and 1-click application autofill tool maintained by university students and engineers. Continuously updates open software engineering, machine learning, and quant internship openings across FAANG, Fortune 500, and unicorns.",
    officialUrl: "https://simplify.jobs/",
    verified: true,
    tags: [
      "Auto Apply",
      "Fastest Updates",
      "FAANG & Unicorns",
      "Verified Openings",
    ],
    keyTips: [
      "Apply within the first 48 hours of an opening going live to maximize resume screening rates.",
      "Maintain a clean, ATS-compliant single-column resume with standard fonts.",
    ],
  },

  // --- Verified Job Portals ---
  {
    id: "levels-fyi",
    name: "Levels.fyi Jobs & Compensation Intelligence",
    category: "jobboard",
    categoryLabel: "Verified Job Board",
    targetAudience: "Software Engineers, ML Engineers, Systems Developers",
    stipendRange: "Top-tier verified compensation data and internship listings",
    applicationWindow: "Continuous year-round hiring",
    location: "Global / India / Remote",
    description:
      "Known globally for transparent engineering salaries and levels. Its verified job portal features direct postings from companies that match verified salary benchmarks with zero ghost-job clutter.",
    officialUrl: "https://www.levels.fyi/jobs",
    verified: true,
    tags: ["Compensation Verified", "High Paying Tech", "Intern & New Grad"],
    keyTips: [
      "Use their internship salary benchmark tool to evaluate standard industry rates before interview negotiations.",
      "Filter by specific roles such as 'Machine Learning Engineer' or 'Software Engineer Intern'.",
    ],
  },
  {
    id: "linkedin-jobs-boolean",
    name: "LinkedIn Jobs (Precision Boolean Search)",
    category: "jobboard",
    categoryLabel: "Enterprise Hiring",
    targetAudience: "All students and engineering professionals",
    stipendRange: "Enterprise & startup ranges",
    applicationWindow: "Continuous year-round",
    location: "Global",
    description:
      'The largest professional network. The key to extracting value is using precise boolean filters (e.g. title:"Machine Learning Intern" AND ("2026" OR "Summer") NOT "Senior"), combined with finding alumni connections.',
    officialUrl: "https://www.linkedin.com/jobs/",
    verified: true,
    tags: ["Networking", "Alumni Referral", "Enterprise Portal"],
    keyTips: [
      "Never apply only through the 'Easy Apply' button; identify the recruiter or university relations team and send a short note.",
      "Check who in your college alumni network works at the target firm and request a referral.",
    ],
  },

  // --- Government & Public Sector ---
  {
    id: "aicte-internship",
    name: "AICTE National Internship Portal",
    category: "government",
    categoryLabel: "Government Scheme",
    targetAudience: "Indian engineering & computer science college students",
    stipendRange:
      "₹5,000 - ₹20,000 / month (or certificate + project allowance)",
    applicationWindow: "Continuous active cycles throughout academic terms",
    location: "Pan-India across Smart Cities, PSUs, and Tech Clusters",
    description:
      "Government of India official portal mandated by the Ministry of Education. Offers verified government agency internships (Smart Cities Mission, NHAI, Railways, MSME) and certified corporate partner openings.",
    officialUrl: "https://internship.aicte-india.org/",
    verified: true,
    tags: [
      "Govt of India",
      "AICTE Approved",
      "Smart City Projects",
      "Official Certification",
    ],
    keyTips: [
      "Register with your college roll number and ensure your institution is accredited.",
      "Search for 'AI / Data Analytics' tags in municipal governance and smart transport projects.",
    ],
  },
  {
    id: "drdo-isro-internship",
    name: "DRDO & ISRO Student Apprenticeships & Projects",
    category: "government",
    categoryLabel: "Government Scheme",
    targetAudience:
      "B.Tech and M.Sc Computer Science / IT / Electronics students",
    stipendRange:
      "Official government apprentice stipend or academic project credits",
    applicationWindow:
      "Bi-annual (May-June for Summer, Nov-Dec for Winter / Final semester)",
    location:
      "DRDO / ISRO centres across Bengaluru, Hyderabad, Delhi, Thiruvananthapuram",
    description:
      "India's premier defence and space research organizations offer final-year and summer academic project training. Students work on satellite image processing, embedded telemetry, high-performance computing, and cybersecurity.",
    officialUrl: "https://www.drdo.gov.in/drdo/careers",
    verified: true,
    tags: [
      "DRDO",
      "ISRO",
      "National Importance",
      "Cybersecurity & Satellite ML",
    ],
    keyTips: [
      "Applications must be officially forwarded by your College Principal or University Registrar.",
      "Prepare a clean transcript and police verification / Indian citizenship documentation as required.",
    ],
  },
];

export const outreachTemplates: OutreachTemplate[] = [
  {
    id: "professor-research",
    title: "Cold Email to University Professors (Research Internship)",
    purpose:
      "For securing summer or semester research internships under IIT/IISc or international professors",
    targetRecipient: "Academic Professors, Lab Directors, Research Scientists",
    subjectLine:
      "Prospective Research Intern: [Your Name] | Interest in [Specific Lab Topic / Paper Name]",
    body: `Respected Professor [Last Name],

I hope this email finds you in good health and high spirits.

My name is [Your Name], and I am currently pursuing my [Degree, e.g., M.Sc in Computer Science (AI & ML) / B.Tech in CSE] at [Your University], with an academic CGPA of [Your CGPA / 10].

I have been following your lab's recent work on [Specific Research Area], particularly your paper titled "[Specific Paper Title published by the professor]". I was particularly intrigued by your approach of [mention 1 precise mathematical insight, architecture, or evaluation result from their paper, e.g., utilizing contrastive learning to mitigate representation drift].

Over the past year, I have built practical research competency in [List 2-3 specific skills, e.g., PyTorch, Graph Neural Networks, Transformer fine-tuning], and recently developed [Name of a project/repo with hyperlink] where I [quantifiable outcome, e.g., reproduced an NLP baseline and achieved 91.2% F1 on benchmark X].

I would be deeply honored to contribute to your ongoing research as a research intern during [Timeframe, e.g., May to July 2026 / 8-10 weeks]. I am willing to work on any sub-problem your group is currently investigating in [Lab Topic].

I have attached my 1-page CV and highlighted project portfolio for your review: [Direct Link to GitHub/CV].

Thank you very much for your time and consideration.

Warm regards,
[Your Name]
[Phone Number] | [LinkedIn Profile URL] | [GitHub Profile URL]
[Your Department & University Name]`,
    guidelines: [
      "Never mass-email or use generic copy-paste templates; cite an actual recent paper from the professor's lab.",
      "Send emails between 8:30 AM and 9:30 AM in the recipient's local timezone (Tuesday to Thursday works best).",
      "Keep the email under 200 words — professors typically review emails on mobile screens.",
      "Always host your CV as a clean view-only link or small PDF attachment (< 500 KB).",
    ],
  },
  {
    id: "startup-founder-message",
    title: "Direct Outreach to Startup Founders & Engineering Leads",
    purpose:
      "For securing high-impact internships or early engineering roles at AI startups on LinkedIn or Twitter/X",
    targetRecipient: "Co-founders, CTOs, VP of Engineering, Head of AI",
    subjectLine:
      "Quick thought on [Company Name]'s [Feature/Product] + AI Engineering candidate",
    body: `Hi [First Name],

Loved what your team shipped recently with [Specific product feature or recent company milestone]. Noticed on [LinkedIn/X] that you are scaling the [Engineering/AI] team.

I am an AI & Software Engineering student with strong production fundamentals in [e.g., Next.js, PyTorch, FastAPI, Docker, Vector Databases]. Recently, I built [Project Name + Link] which [specific engineering metric, e.g., handles automated semantic search over 50k documents with <150ms latency].

I took a look at [Company Product] and saw an opportunity where [mention 1 concrete idea, edge case, or optimization you could help implement].

Would love to contribute to [Company Name] as an engineering / ML intern for [Timeframe]. Even if there isn't a formal opening right now, I'd welcome 10 minutes to learn more about the technical challenges your team is solving.

Best,
[Your Name]
[Link to Portfolio / GitHub]`,
    guidelines: [
      "Keep it under 150 words — founders read messages between meetings.",
      "Show that you actually tested or explored their product before reaching out.",
      "Focus on what value you can deliver to them, rather than asking for mentorship.",
    ],
  },
];

export const atsResumeChecklist: CareerGuideline[] = [
  {
    step: 1,
    title: "The Google X-Y-Z Impact Formula",
    summary:
      "Write every bullet point using: 'Accomplished [X] as measured by [Y], by doing [Z]'.",
    checklist: [
      "Bad: 'Trained a machine learning model on image dataset.'",
      "Good: 'Engineered a ResNet-50 vision classifier achieving 94.2% top-1 accuracy on 50k images, by implementing cosine annealing and CutMix augmentation in PyTorch.'",
      "Include latency, throughput, accuracy, compression ratio, or cost reduction numbers.",
    ],
  },
  {
    step: 2,
    title: "Clean ATS-Friendly Layout",
    summary:
      "ATS (Applicant Tracking Systems) parse plain-text tokens. Avoid complex design gimmicks.",
    checklist: [
      "Use single-column layout only; avoid two-column sidebars, tables, and graphic skill bars.",
      "Standard readable typography: Inter, Arial, Calibri, or Roboto at 10-11pt font.",
      "Section headers must be standard: 'Education', 'Technical Skills', 'Projects', 'Experience'.",
      "Ensure all hyperlinks (GitHub, Live Demos, LinkedIn) are active and clickable.",
    ],
  },
  {
    step: 3,
    title: "AI & ML Technical Skill Categorization",
    summary:
      "Cluster technical competencies cleanly so technical screeners scan them in 5 seconds.",
    checklist: [
      "Languages: Python (NumPy, SciPy, Pandas), C/C++, TypeScript, SQL.",
      "Frameworks & Tools: PyTorch, Hugging Face Transformers, Scikit-Learn, Docker, FastAPI, Git.",
      "Cloud & Compute: AWS (EC2, S3), Linux, Weights & Biases, Google Cloud / Colab.",
      "Theory: Optimization (SGD, Adam), Probability & Statistics, Deep Learning architectures.",
    ],
  },
];
