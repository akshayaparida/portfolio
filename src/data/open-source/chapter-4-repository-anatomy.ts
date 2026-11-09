import { LearningModule } from "@/types/learning";

export const chapter4Module: LearningModule = {
  id: "repository-anatomy-and-dx",
  title: "Chapter 4: Repository Anatomy & Contributor DX",
  description:
    "Design high-converting READMEs, frictionless local development environments, structured GitHub issue forms, and comprehensive contribution guidelines.",
  status: "completed",
  tags: [
    "Developer Experience",
    "README",
    "Contribution Guidelines",
    "Issue Templates",
    "Tooling",
  ],
  estimatedHours: 6,
  skills: [
    "High-Converting README Architecture",
    "GitHub Issue Forms (YAML schema)",
    "Contributor Onboarding Optimization",
    "Automated Code Quality & Git Hooks",
  ],
  keyLearnings: [
    "How to structure a README using the 5-second rule (Badges, Value Prop, 60-Second Quickstart, Architecture).",
    "Designing structured GitHub Issue Forms (.github/ISSUE_TEMPLATE/*.yml) for high-signal bug reporting.",
    "Formulating CONTRIBUTING.md guidelines covering branch naming, testing conventions, and PR expectations.",
    "Setting up zero-friction local developer tooling using Husky, Biome/Prettier, and single-command test suites.",
  ],
  subModules: [
    {
      id: "readme-5-second-rule",
      title: "1. The 5-Second Rule README Architecture",
      description:
        "Convert first-time visitors into active users and contributors within seconds.",
      status: "completed",
    },
    {
      id: "contributing-handbook",
      title: "2. The Frictionless CONTRIBUTING.md Blueprint",
      description:
        "Document prerequisites, git workflows, testing commands, and code review standards.",
      status: "completed",
    },
    {
      id: "issue-and-pr-forms",
      title: "3. GitHub Issue Forms & PR Checklists",
      description:
        "Eliminate low-effort issues using YAML schema forms and structured PR checklists.",
      status: "completed",
    },
    {
      id: "dx-and-git-hooks",
      title: "4. Developer Tooling: Husky, Linters & Task Runners",
      description:
        "Enforce pre-commit formatting, type-safety, and commitlint standards locally.",
      status: "completed",
    },
  ],
  detailedContent: `# Chapter 4: Repository Anatomy & Contributor DX

First impressions in open source dictate adoption. A developer evaluating your library spends less than 30 seconds scanning your \`README.md\` before deciding to try it or close the tab. Similarly, a potential contributor encountering broken local setup instructions will abandon their pull request immediately.

---

## 1. The 5-Second Rule README Architecture

A production-grade \`README.md\` must answer five questions immediately:
1. **What is it?** (Clear elevator pitch)
2. **Is it healthy and maintained?** (Badges for CI, coverage, version, license)
3. **What does it look like?** (Terminal GIF, screenshot, or ASCII diagram)
4. **How do I run it in 60 seconds?** (Copy-paste quickstart)
5. **Where do I learn more?** (Links to documentation, roadmap, and contributing)

\`\`\`markdown
<div align="center">
  <img src="./docs/assets/banner.png" alt="RIP Social Banner" width="100%" />

  # RIP Social
  **AI-moderated civic engagement platform connecting verified citizens directly to government action.**

  [![CI](https://github.com/RIP-Foundation/rip_social/actions/workflows/ci.yml/badge.svg)](https://github.com/RIP-Foundation/rip_social/actions)
  [![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  [![Version](https://img.shields.io/github/v/release/RIP-Foundation/rip_social)](https://github.com/RIP-Foundation/rip_social/releases)
  [![Discord](https://img.shields.io/discord/123456789?color=5865F2&logo=discord&logoColor=white)](https://discord.gg/your-invite)
</div>

---

### Quickstart (Under 60 Seconds)

\`\`\`bash
# 1. Clone the repository
git clone https://github.com/RIP-Foundation/rip_social.git && cd rip_social

# 2. Install dependencies via Bun or pnpm
bun install

# 3. Spin up local PostgreSQL & Redis containers
docker compose up -d

# 4. Start development server
bun dev
\`\`\`
\`\`\`

---

## 2. Structured GitHub Issue Forms (\`.github/ISSUE_TEMPLATE/\`)

Avoid free-form markdown issue templates. GitHub supports structured **Issue Forms** using YAML schemas that force reporters to provide environment versions, steps to reproduce, and minimal reproduction links:

\`\`\`yaml
# .github/ISSUE_TEMPLATE/bug_report.yml
name: 🐛 Bug Report
description: File a bug report to help us improve the software
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: "Thanks for reporting a bug! Please ensure you test against the latest release."
  - type: input
    id: version
    attributes:
      label: Software Version
      placeholder: "e.g., v1.4.2"
    validations:
      required: true
  - type: textarea
    id: reproduction
    attributes:
      label: Steps to Reproduce
      placeholder: "1. Run command '...'\n2. Click on '...'\n3. Observe error: ..."
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      placeholder: "What should have happened instead?"
    validations:
      required: true
\`\`\`

---

## 3. Pull Request Template (\`.github/PULL_REQUEST_TEMPLATE.md\`)

Standardize PR descriptions with an actionable verification checklist:

\`\`\`markdown
## Summary of Changes
<!-- Describe the problem and your solution. -->

## Linked Issues
Fixes #<!-- Issue number -->

## Contributor Checklist
- [ ] Code follows project style guidelines (\`bun run lint\`).
- [ ] Unit or integration tests added and passing (\`bun test\`).
- [ ] Documentation updated in \`docs/\` (if applicable).
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/).
\`\`\`

---

## 4. Zero-Friction Local DX: Husky & Linters

Enforce clean code before commits ever touch GitHub Actions. Use **Husky** paired with **lint-staged**:

\`\`\`json
// package.json
{
  "scripts": {
    "prepare": "husky",
    "lint": "biome check --write .",
    "test": "vitest run"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "biome check --write"
    ]
  }
}
\`\`\`

\`\`\`bash
# .husky/pre-commit
npx lint-staged

# .husky/commit-msg
npx --no -- commitlint --edit "\$1"
\`\`\`
`,
};
