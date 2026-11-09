import { LearningModule } from "@/types/learning";

export const chapter5Module: LearningModule = {
  id: "cicd-and-quality-gates",
  title: "Chapter 5: Automated CI/CD Pipelines & Branch Protections",
  description:
    "Build bulletproof automated quality gates using GitHub Actions, strict branch protection rules, matrix testing, and supply chain vulnerability scanning.",
  status: "completed",
  tags: [
    "CI/CD",
    "GitHub Actions",
    "Branch Protection",
    "Automation",
    "Security Scanning",
  ],
  estimatedHours: 6,
  skills: [
    "GitHub Actions Workflow Authoring",
    "Multi-OS / Runtime Matrix Testing",
    "Branch Protection Ruleset Configuration",
    "Automated Supply Chain Security",
  ],
  keyLearnings: [
    "How to author fast, cached Continuous Integration pipelines across Node.js/Bun matrices.",
    "Configuring non-bypassable branch protection rules on `main` to safeguard production code.",
    "Integrating automated dependency vulnerability auditing via Dependabot and Renovate.",
    "Employing static security analysis with CodeQL and GitHub Secret Scanning.",
  ],
  subModules: [
    {
      id: "ci-pipeline-architecture",
      title: "1. The Automated CI Test Matrix",
      description:
        "Run linters, type checks, and unit tests across operating systems and runtime versions.",
      status: "completed",
    },
    {
      id: "branch-protection-rules",
      title: "2. Ironclad Branch Protection Rulesets",
      description:
        "Require passing checks, signed commits, and non-bypassable PR reviews on main.",
      status: "completed",
    },
    {
      id: "dependency-vulnerability-bots",
      title: "3. Dependabot & Renovate Supply Chain Auditing",
      description:
        "Automate security patch updates and lockfile synchronization.",
      status: "completed",
    },
    {
      id: "caching-and-performance",
      title: "4. CI Performance: Remote Caching & Hermetic Builds",
      description:
        "Accelerate pipeline runtimes from minutes to seconds using Turborepo and GitHub Cache.",
      status: "completed",
    },
  ],
  detailedContent: `# Chapter 5: Automated CI/CD Pipelines & Branch Protections

In an open-source project where dozens of strangers submit pull requests daily, manual code review alone cannot catch regressions. Automated **Continuous Integration (CI)** acts as the objective gatekeeper that guarantees code health before human maintainers spend time reviewing syntax or logic.

---

## 1. Production GitHub Actions Pipeline (\`.github/workflows/ci.yml\`)

A production CI pipeline should run on every pull request and push to \`main\`. It verifies linting, type-checking, and test suites in parallel:

\`\`\`yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - name: Install Dependencies
        run: bun install --frozen-lockfile
      - name: Lint Check
        run: bun run lint
      - name: TypeScript Check
        run: bun run typecheck

  test-matrix:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest]
        node-version: [20.x, 22.x]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --coverage
\`\`\`

---

## 2. Configuring Branch Protection Rules

Never allow direct pushes to \`main\`. Protect \`main\` via **Settings > Branches > Add branch protection rule** (or **Rulesets**):

1. **Require a pull request before merging:**
   * Require approvals: Minimum 1 core maintainer.
   * Dismiss stale pull request approvals when new commits are pushed.
   * Require review from Code Owners (via \`.github/CODEOWNERS\`).
2. **Require status checks to pass before merging:**
   * Select required jobs: \`lint-and-typecheck\`, \`test-matrix\`.
   * Require branches to be up to date before merging.
3. **Require linear history:** Enforces squash merging or rebase merging to prevent tangled merge bubbles.
4. **Do not allow bypassing the above settings:** Enforces that even organization owners must adhere to CI gates.

---

## 3. Automated Dependency Updates: Dependabot

Supply chain attacks (like the XZ Utils incident) demonstrate the danger of unmonitored upstream packages. Configure automated security scans via \`.github/dependabot.yml\`:

\`\`\`yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    groups:
      dev-dependencies:
        patterns:
          - "@types/*"
          - "eslint*"
          - "prettier*"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
\`\`\`

---

## 4. Pipeline Optimization: Turborepo Caching

When scaling a monorepo, running all tests on every PR becomes cost-prohibitive. Using Turborepo, tasks that haven't changed will restore directly from cache:

\`\`\`json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"],
      "cache": true
    },
    "lint": {
      "cache": true
    }
  }
}
\`\`\`
`,
};
