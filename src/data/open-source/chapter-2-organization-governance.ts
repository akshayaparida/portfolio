import { LearningModule } from "@/types/learning";

export const chapter2Module: LearningModule = {
  id: "organization-and-governance",
  title: "Chapter 2: GitHub Organization & Governance",
  description:
    "Establish institutional identity, manage maintainer permissions, deploy organization-wide health defaults, and adopt robust open-source governance models.",
  status: "completed",
  tags: ["GitHub", "Governance", "Organization", "Security", "Team Management"],
  estimatedHours: 5,
  skills: [
    "GitHub Organization Setup",
    "Team Permission Hierarchies",
    "Org-wide .github Repository",
    "Open Source Governance Frameworks",
  ],
  keyLearnings: [
    "Why starting under an organization protects project longevity compared to personal accounts.",
    "Configuring base permissions, fine-grained teams (Core, Triage, Docs), and secret management.",
    "Using the special `.github` repository to establish default issue templates, Code of Conduct, and org profiles.",
    "Selecting appropriate governance models: BDFL, Meritocracy, or Steering Committee.",
  ],
  subModules: [
    {
      id: "personal-vs-org",
      title: "1. Personal Account vs GitHub Organization",
      description:
        "Understand the institutional advantages of organizations for legal, branding, and contributor scaling.",
      status: "completed",
    },
    {
      id: "org-setup-and-teams",
      title: "2. Setting Up Teams & Least Privilege Access",
      description:
        "Define Core Maintainers, Triage Teams, and security access policies.",
      status: "completed",
    },
    {
      id: "dot-github-defaults",
      title: "3. The Special .github Repository",
      description:
        "Centralize org-wide profile banners, community health files, and automated workflow triggers.",
      status: "completed",
    },
    {
      id: "governance-models",
      title: "4. Open Source Governance & Offboarding",
      description:
        "Structure decision-making frameworks, RFC approvals, and key-person risk mitigation.",
      status: "completed",
    },
  ],
  detailedContent: `# Chapter 2: GitHub Organization & Governance

One of the most consequential decisions made early in a project is **where it lives**. While hosting code under a personal profile (\`github.com/username/project\`) is common for hobby experiments, global-tier open source demands an institutional home via a **GitHub Organization** (\`github.com/org-name/project\`).

---

## 1. Personal Account vs GitHub Organization

| Factor | Personal Account (\`github.com/user\`) | GitHub Organization (\`github.com/org\`) |
|:-------|:--------------------------------------|:----------------------------------------|
| **Longevity & Bus Factor** | Tied to a single human. If the owner leaves or loses access, the project stalls. | Institutional entity. Multiple owners can be assigned to prevent lockouts. |
| **Access Control** | Binary: either a collaborator has full push access or none. | Role-Based Access Control (RBAC): Owners, Members, Triage, and Custom Teams. |
| **Branding & Ecosystem** | Projects share space with personal forks and experiments. | Unified home for multi-repo ecosystems (\`core\`, \`docs\`, \`plugins\`, \`cli\`). |
| **Financial Sponsorship** | Payouts link directly to an individual's personal tax entity. | Connects to Open Collective, GitHub Sponsors for Orgs, or 501(c)(3) foundations. |
| **Secrets & CI/CD** | Secrets must be replicated across repositories manually. | Org-level secrets and variables can be inherited securely across all repos. |

---

## 2. Setting Up Teams & Least Privilege Access

To scale contribution without risking codebase integrity, structure members into specialized functional teams:

\`\`\`text
RIP-Foundation (Organization)
├── Owners (Executive oversight, billing, security keys)
├── Core Maintainers (Merge rights on main, release publishing, RFC veto)
├── Triage Team (Label issues, verify bug reproduction, review first-time PRs)
└── Security Team (Private vulnerability disclosures, CVE management)
\`\`\`

### Recommended Base Permissions:
* **Base Role for Org Members:** \`Read\` (never \`Write\` by default).
* **Repository Creation:** Restrict repository creation to **Owners** to prevent clutter.
* **Two-Factor Authentication (2FA):** Enforce mandatory 2FA across all organization members in **Settings > Authentication Security**.

---

## 3. The Special \`.github\` Organization Repository

GitHub allows organizations to create a public repository named **\`.github\`**. This repository acts as an inheritance parent for all repositories across your organization:

\`\`\`text
RIP-Foundation/.github/
├── profile/
│   └── README.md              # Organization homepage banner, mission & quick links
├── .github/
│   ├── ISSUE_TEMPLATE/        # Fallback issue templates for any org repo without custom templates
│   │   ├── bug_report.yml
│   │   └── feature_request.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CODE_OF_CONDUCT.md     # Contributor Covenant applied org-wide
│   └── SECURITY.md            # Default vulnerability disclosure policy
└── workflows/
    └── org-linter.yml         # Reusable org-wide GitHub Actions workflow
\`\`\`

---

## 4. Open Source Governance Frameworks

Governance determines how technical decisions are debated, resolved, and documented.

### Model 1: Benevolent Dictator for Life (BDFL)
* **Examples:** Python (historically Guido van Rossum), Linux (Linus Torvalds).
* **How it works:** A single founder holds final decision authority over breaking changes and architecture.
* **Pros & Cons:** Ultra-fast decisions in early stages; high key-person risk in mature stages.

### Model 2: Steering Committee / Core Team (Recommended)
* **Examples:** Node.js, Kubernetes, Vue.js.
* **How it works:** A rotating committee of 3–7 trusted maintainers votes on RFCs. Significant architectural changes require majority approval.
* **Pros & Cons:** Balanced, durable, and resistant to burnout.

### Formal Offboarding Policy:
Define an **Inactive Maintainer Policy** in \`GOVERNANCE.md\`: Maintainers who remain inactive for $>6$ months transition to *Alumni* status, relinquishing direct merge rights until they resume active contributions. This protects project keys from stagnant accounts.
`,
};
