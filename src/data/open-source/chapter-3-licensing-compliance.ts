import { LearningModule } from "@/types/learning";

export const chapter3Module: LearningModule = {
  id: "licensing-and-compliance",
  title: "Chapter 3: Open Source Licensing, Patents & Standards",
  description:
    "Navigate open-source legal foundations: compare permissive vs copyleft licenses, understand patent clauses, enforce Codes of Conduct, and design responsible security disclosure policies.",
  status: "completed",
  tags: [
    "Licensing",
    "MIT",
    "Apache 2.0",
    "GPL",
    "Security",
    "Code of Conduct",
  ],
  estimatedHours: 5,
  skills: [
    "Open Source Licensing Analysis",
    "Patent & Trademark Compliance",
    "Code of Conduct Enforcement",
    "Coordinated Vulnerability Disclosure",
  ],
  keyLearnings: [
    "The legal distinctions between permissive (MIT, Apache 2.0) and copyleft (GPLv3, AGPLv3) licenses.",
    "Why enterprise adoption often favors Apache 2.0 for its explicit patent grants and trademark protections.",
    "Implementing the Contributor Covenant v2.1 and clear escalation workflows.",
    "Configuring GitHub Private Vulnerability Reporting to handle zero-day disclosures ethically.",
  ],
  subModules: [
    {
      id: "license-selection",
      title: "1. The Open Source License Matrix",
      description: "Compare MIT, Apache 2.0, BSD 3-Clause, GPLv3, and AGPLv3.",
      status: "completed",
    },
    {
      id: "patents-and-trademarks",
      title: "2. Software Patents & Commercial Protections",
      description:
        "Protect your project from patent trolls and preserve trademark rights.",
      status: "completed",
    },
    {
      id: "code-of-conduct",
      title: "3. Contributor Covenant & Incident Escalation",
      description:
        "Establish safe, inclusive community standards with verifiable enforcement pathways.",
      status: "completed",
    },
    {
      id: "security-disclosure",
      title: "4. Security Disclosure Policies & CVE Workflow",
      description:
        "Deploy SECURITY.md and GitHub Private Vulnerability Reporting (PVR).",
      status: "completed",
    },
  ],
  detailedContent: `# Chapter 3: Open Source Licensing, Patents & Standards

Code without an explicit open-source license is legally **all rights reserved** by default under international copyright law. Anyone using, cloning, or distributing unlicensed code does so under legal risk. Choosing the right license and security posture sets your software's legal boundaries for life.

---

## 1. The Open Source License Matrix

Licenses fall primarily into two philosophical camps: **Permissive** (do whatever you want with attribution) and **Copyleft** (modifications must also be open-sourced).

| License | Category | Commercial Use | Closed Source Derivative Allowed? | Patent Grant Clause? | Best Suited For |
|:--------|:---------|:---------------|:----------------------------------|:---------------------|:----------------|
| **MIT** | Permissive | Yes | Yes | Implicit | Libraries, UI components, utilities aiming for universal adoption. |
| **Apache 2.0** | Permissive | Yes | Yes | **Explicit** (Protection against contributor patent claims) | Enterprise-grade platforms, infrastructure, machine learning runtimes. |
| **BSD 3-Clause** | Permissive | Yes | Yes | Implicit (Explicit non-endorsement clause) | Tools preventing contributors from using the project's name for marketing. |
| **GNU GPLv3** | Strong Copyleft | Yes | **No** (Derivative works must also be GPLv3) | Explicit | Standalone desktop apps, OS tools, community-defensive software. |
| **GNU AGPLv3** | Network Copyleft | Yes | **No** (Hosting code over a SaaS network triggers source code disclosure) | Explicit | SaaS-vulnerable backend engines (preventing cloud providers from repackaging). |

---

## 2. Why Apache 2.0 is the Enterprise Standard

While MIT is short (170 words), **Apache 2.0** is the favored license for global, venture-backed, or foundation-led software for two critical reasons:

1. **Explicit Patent License (Section 3):**
   * Every contributor grants the recipient a perpetual, worldwide, non-exclusive, royalty-free patent license to make, use, sell, and offer the software.
   * If a contributor sues a user alleging patent infringement over the software, the contributor's license terminates automatically (*defensive patent termination*).
2. **Trademark Reservation (Section 6):**
   * Apache 2.0 explicitly clarifies that the license does **not** grant rights to use the trademarks, trade names, or service marks of the licensor.

---

## 3. Contributor Covenant & Community Safety

A vibrant open-source ecosystem requires a safe environment. Global standard practice is adopting the [Contributor Covenant v2.1](https://www.contributor-covenant.org/).

### Structure of \`CODE_OF_CONDUCT.md\`:
* **Our Pledge:** Commitment to making participation harassment-free for everyone.
* **Our Standards:** Concrete examples of positive behavior (constructive feedback, graceful acceptance of critique) and unacceptable behavior (harassment, trolling, personal attacks).
* **Enforcement Responsibilities & Scope:** Clarify who enforces the standards and where (issues, PRs, Discord, conferences).
* **Reporting Channel:** Provide a designated, non-public email (e.g., \`conduct@rip-foundation.org\`).

---

## 4. Responsible Vulnerability Disclosure (\`SECURITY.md\`)

Never allow security researchers to disclose zero-day vulnerabilities in public GitHub issues. Standardize a **Coordinated Vulnerability Disclosure (CVD)** policy:

\`\`\`markdown
# Security Policy

## Supported Versions
| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability
**Do NOT report security vulnerabilities in public issues or discussions.**

Instead, report them privately via **GitHub Private Vulnerability Reporting**:
1. Navigate to the **Security** tab of this repository.
2. Under "Reporting", click **Report a vulnerability**.
3. Detail the impact, affected versions, and a reproducible Proof-of-Concept (PoC).

Our security team will acknowledge receipt within 48 hours and work with you on a patched advisory and CVE assignment.
\`\`\`
`,
};
