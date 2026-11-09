import { LearningModule } from "@/types/learning";

export const chapter1Module: LearningModule = {
  id: "ideation-and-architecture",
  title: "Chapter 1: Ideation, Architecture & Scope",
  description:
    "Define the problem domain, architect modular codebases, conduct global registry checks, and establish project boundaries for world-class open-source software.",
  status: "completed",
  tags: [
    "Open Source",
    "Architecture",
    "Project Design",
    "Monorepo",
    "Turborepo",
  ],
  estimatedHours: 6,
  skills: [
    "Problem Validation",
    "Registry Namespace Auditing",
    "Monorepo Architecture",
    "RFC Process Design",
  ],
  keyLearnings: [
    "How to apply the Unix philosophy: solve one problem with high agency and zero bloat.",
    "Techniques for checking namespace collisions across GitHub, npm, PyPI, Crates.io, and trademarks.",
    "Architectural blueprints for monorepos vs polyrepos using Bun, Turborepo, or pnpm workspaces.",
    "Formulating Request for Comments (RFC) frameworks to guide early architectural consensus.",
  ],
  subModules: [
    {
      id: "problem-definition",
      title: "1. Problem Definition & The 1.0 Boundary",
      description:
        "Define a razor-sharp value proposition and avoid early feature bloat.",
      status: "completed",
    },
    {
      id: "namespace-auditing",
      title: "2. Namespace Auditing & Trademark Clearing",
      description:
        "Ensure your software's name is available across package registries, domains, and legal databases.",
      status: "completed",
    },
    {
      id: "codebase-architecture",
      title: "3. Codebase Architecture: Monorepo vs Polyrepo",
      description:
        "Structure modular packages and applications for scale using Turborepo and workspace tools.",
      status: "completed",
    },
    {
      id: "rfc-process",
      title: "4. RFC Process & Architectural Decision Records (ADRs)",
      description:
        "Establish transparent technical consensus before writing production code.",
      status: "completed",
    },
  ],
  detailedContent: `# Chapter 1: Ideation, Architecture & Scope

Building global-grade open-source software starts well before writing the first line of code. Successful projects—from React and Kubernetes to Vite and Fastify—succeed because they address a concrete pain point with exceptional architectural discipline.

---

## 1. Problem Definition & The 1.0 Boundary

### The Unix Philosophy in Modern OSS
The biggest killer of fledgling open-source projects is **scope creep**. An effective open-source tool follows the core tenet of the Unix philosophy:

> *"Write programs that do one thing and do it well. Write programs to work together."*

When conceptualizing your tool:
1. **Identify the Core Inefficiency:** What takes developers 50 lines of boilerplate, 3 fragile dependencies, or manual effort today?
2. **Define the Non-Goals Early:** Explicitly list what your project will **never** do. Documenting non-goals prevents contributors from bloating the codebase with tangent features.
3. **Draft the Minimal 1.0 Feature Set:**
   * One primary command or API entry point.
   * Sensible defaults with zero configuration.
   * Extensible plugin hooks for custom behavior rather than hardcoding niche use-cases.

---

## 2. Global Namespace Auditing & Trademark Clearing

A name defines your project's identity, discoverability, and brand credibility. Before registering repositories, perform exhaustive multi-registry checks.

| Registry / Platform | Check Command / URL | Purpose |
|:-------------------|:-------------------|:--------|
| **GitHub** | \`https://github.com/<name>\` | Organization / Repository availability |
| **npm** | \`npm view <name>\` | Node.js ecosystem package registry |
| **PyPI** | \`curl -s https://pypi.org/pypi/<name>/json\` | Python package registry |
| **Crates.io** | \`cargo search <name>\` | Rust package registry |
| **Docker Hub** | \`https://hub.docker.com/v2/repositories/<name>\` | Container image repository |
| **Trademarks (USPTO / WIPO)** | \`uspto.gov/trademarks\` | Ensure no conflict with existing commercial trademarks |

\`\`\`bash
# Quick CLI script to verify package registry availability
PROJECT_NAME="rip-social"

echo "Checking npm..."
npm view $PROJECT_NAME 2>&1 | grep -q "E404" && echo "npm: Available" || echo "npm: Taken"

echo "Checking PyPI..."
curl -s -o /dev/null -w "%{http_code}" https://pypi.org/pypi/$PROJECT_NAME/json | grep -q "404" && echo "PyPI: Available" || echo "PyPI: Taken"
\`\`\`

---

## 3. Codebase Architecture: Monorepo vs Polyrepo

Modern global open-source projects typically evolve as **monorepos** because they enable synchronized testing, shared TypeScript interfaces, and unified versioning.

\`\`\`text
project-root/
├── apps/
│   ├── web/               # Next.js / Vite user interface
│   └── api/               # Backend microservice or API
├── packages/
│   ├── core/              # Shared business logic and domain entities
│   ├── sdk/               # Public client SDK for consumers
│   ├── config/            # Shared ESLint, TypeScript, and Prettier rules
│   └── ui/                # Shared UI component library
├── docs/                  # VitePress / Docusaurus documentation site
├── turbo.json             # Turborepo task pipeline configuration
├── package.json           # Workspace root manifests
└── bun.lock / pnpm-lock   # Deterministic lockfile
\`\`\`

### Monorepo Benefits for Open Source:
* **Atomic Pull Requests:** Change an API in \`packages/core\` and update its consumer in \`apps/web\` in a single atomic commit.
* **Streamlined CI:** Tools like **Turborepo** compute build graphs and cache task outputs so CI only rebuilds modified packages.

---

## 4. Architectural Decision Records (ADRs)

To foster external trust and preserve context for future contributors, record major technical choices in lightweight ADR documents in \`docs/adr/\`:

\`\`\`markdown
# ADR-001: Adopt Turborepo & Bun Workspace

## Context
We need a unified monorepo system supporting cross-package TypeScript references with sub-second local test execution.

## Decision
We select Turborepo for orchestration and Bun for package management and script execution.

## Consequences
- **Positive:** Cache sharing in GitHub Actions reduces CI runtimes by 65%.
- **Negative:** Contributors must have Bun installed locally for zero-friction setup.
\`\`\`
`,
};
