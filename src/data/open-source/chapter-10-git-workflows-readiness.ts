import { LearningModule } from "@/types/learning";

export const chapter10Module: LearningModule = {
  id: "git-workflows-and-product-readiness",
  title: "Chapter 10: Git Methodologies & Production Readiness Standards",
  description:
    "Master the modern Git workflows followed by leading product engineering companies: implement GitHub Flow, enforce Conventional Commits, maintain linear history, and satisfy the 5 Pillars of Technical Readiness.",
  status: "completed",
  tags: [
    "Git Workflow",
    "Trunk-Based Development",
    "Production Readiness",
    "12-Factor",
    "DevOps",
  ],
  estimatedHours: 6,
  skills: [
    "GitHub Flow & Trunk-Based Development",
    "Conventional Commits & Automated Bumping",
    "Squash-and-Merge Linear History",
    "Production Readiness Auditing (5 Pillars)",
  ],
  keyLearnings: [
    "Why modern product companies have abandoned complex GitFlow branching in favor of lightweight GitHub Flow.",
    "Enforcing Conventional Commits locally via Husky and commitlint to drive zero-touch release automation.",
    "Using Squash and Merge to keep the production git log linear, readable, and revert-safe.",
    "The 5-Pillar technical readiness checklist required before launching production software.",
  ],
  subModules: [
    {
      id: "github-flow-trunk-based",
      title: "1. GitHub Flow & Trunk-Based Development",
      description:
        "Understand why high-velocity engineering organizations keep main continuously green and deployable.",
      status: "completed",
    },
    {
      id: "conventional-commits-enforcement",
      title: "2. Conventional Commits & Pre-Commit Linting",
      description:
        "Automate changelogs and SemVer increments by structuring machine-readable commit headers.",
      status: "completed",
    },
    {
      id: "squash-merge-linear-history",
      title: "3. Linear History: Squash and Merge vs Merge Bubbles",
      description:
        "Prevent tangled Git commit graphs and preserve atomic revert capabilities on main.",
      status: "completed",
    },
    {
      id: "five-pillars-production-readiness",
      title: "4. The 5 Pillars of Product Company Technical Readiness",
      description:
        "Audit environment secrets, local bootstrap speed, observability, health probes, and preview deployments.",
      status: "completed",
    },
  ],
  detailedContent: `# Chapter 10: Git Methodologies & Production Readiness Standards

Engineering excellence at top-tier product companies (like Vercel, Supabase, Linear, and Stripe) is defined by strict operational discipline. Before taking on users or contributors, a codebase must adhere to established Git branching models and satisfy comprehensive technical readiness standards.

---

## 1. Branching Model: GitHub Flow (Trunk-Based Development)

Legacy branching strategies like **GitFlow** (with perpetual \`develop\`, \`release\`, \`hotfix\`, and \`feature\` branches) create painful merge conflicts and slow down deployment velocity. Modern high-agency teams follow **GitHub Flow**:

\`\`\`text
  main  ●──────────────────────────●──────────● (always green, deployable)
         \                        /          /
          \── feat/ai-moderation ──/          /
           \                                 /
            \──────── fix/jwt-expiry ───────/
\`\`\`

### Core Principles of GitHub Flow:
1. **\`main\` is Always Deployable:** Any commit landing on \`main\` has already passed all CI quality gates and can be shipped to production immediately.
2. **Short-Lived Feature Branches:** Developers create branches off \`main\` with descriptive prefixes (\`feat/\`, \`fix/\`, \`docs/\`, \`chore/\`). Branches live for hours or days, never weeks.
3. **Continuous Rebase / Synchronization:** Developers regularly synchronize their branches with \`main\` to catch integration conflicts early.
4. **Pull Requests as Gateways:** Code enters \`main\` strictly through peer-reviewed, CI-validated Pull Requests.

---

## 2. Conventional Commits & Local Quality Enforcement

Every commit message must follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) specification:

\`\`\`text
<type>(<scope>): <short imperative description>

[optional body]

[optional footer / issue reference]
\`\`\`

### Commit Type Matrix:
| Prefix | SemVer Bump | Purpose | Example |
|:-------|:-----------:|:--------|:--------|
| \`feat:\` | **MINOR** | New functionality | \`feat(api): add citizen identity verification webhook\` |
| \`fix:\` | **PATCH** | Bug fix | \`fix(db): prevent connection pool starvation during spike\` |
| \`feat!:\` | **MAJOR** | Breaking API change | \`feat(auth)!: migrate session cookies to Bearer JWT\` |
| \`refactor:\` | None / PATCH | Internal code refactor | \`refactor(web): extract reusable discussion card component\` |
| \`chore:\` | None | Tooling, deps, configs | \`chore: upgrade turborepo to v2.3.3\` |

### Automated Enforcement (Husky + Commitlint):
\`\`\`json
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
\`\`\`

\`\`\`bash
# .husky/commit-msg hook
npx --no-install commitlint --edit "\$1"
\`\`\`

---

## 3. Linear History: Squash and Merge

When merging a pull request on GitHub, three options exist:
1. **Create a merge commit:** Generates messy "merge bubbles" that pollute git history and make \`git bisect\` difficult.
2. **Rebase and merge:** Adds all individual commits (including typos and WIP commits) to \`main\`.
3. **Squash and merge (Recommended):** Combines all commits from the PR into a single, cohesive commit on \`main\`.

\`\`\`text
Feature Branch: [wip] -> [fix typo] -> [add test] -> [format]
                               │
                     Squash and Merge
                               ▼
Main Branch:    "feat(api): add citizen identity verification (#42)"
\`\`\`

### Why Squash and Merge is Industry Standard:
* Keeps the \`main\` commit history clean, atomic, and easy to read.
* Every single commit on \`main\` maps to a single feature or bug fix.
* Rolling back a failed deployment is as simple as running \`git revert <commit-sha>\`.

---

## 4. The 5 Pillars of Product Company Technical Readiness

Before declaring a project "ready for contributors or production", product companies audit against these five operational pillars:

### Pillar 1: Environment & Secrets Management (12-Factor)
* **Rule:** Zero plaintext secrets in Git.
* Commit exhaustive \`.env.example\` templates in the project root and all apps.
* Configure GitHub Secret Scanning and Push Protection to block accidental credential leaks.

### Pillar 2: The "5-Minute Bootstrap" (Local DX)
* **Rule:** Any new engineer must be able to clone and run the full stack in under 5 minutes.
* \`docker compose up -d\` spins up backing databases and cache layers cleanly.
* Add database seed scripts (\`bun run db:seed\`) that populate realistic demo data.
* A single command (\`bun run dev\`) launches all services concurrently with hot reload.

### Pillar 3: Automated Quality Gates (CI/CD)
* **Rule:** Never trust local environments.
* Every PR must pass automated CI pipelines verifying linting, type checks, unit tests, and build outputs.
* Enforce branch protection rules on \`main\` requiring passing CI status checks before merging.

### Pillar 4: Observability & Health Probes
* **Rule:** Instrument systems before users encounter bugs.
* Implement health check probes:
  * \`GET /healthz\` (Shallow: confirms web server process is responsive).
  * \`GET /readyz\` (Deep: verifies database connections and backing services are active).
* Deploy structured JSON logging with request correlation IDs.

### Pillar 5: Preview Environments & Continuous Delivery
* **Rule:** Test changes in production-like environments before merging.
* Deploy ephemeral preview environments per Pull Request (via Vercel, Railway, or AWS ECS).
* Automate changelogs and release notes using Conventional Commits.
`,
};
