import { LearningModule } from "@/types/learning";

export const chapter7Module: LearningModule = {
  id: "versioning-and-releases",
  title:
    "Chapter 7: Semantic Versioning, Conventional Commits & Global Releases",
  description:
    "Automate versioning, changelog generation, and multi-channel artifact distribution across npm, PyPI, Docker Hub, and GitHub Releases using Conventional Commits.",
  status: "completed",
  tags: [
    "SemVer",
    "Conventional Commits",
    "Release Automation",
    "npm",
    "Docker",
    "DevOps",
  ],
  estimatedHours: 6,
  skills: [
    "Semantic Versioning (SemVer 2.0.0)",
    "Conventional Commits Specification",
    "Automated Release Pipelines (Release Please / Changesets)",
    "Multi-Platform Artifact Distribution",
  ],
  keyLearnings: [
    "Strict implementation of Semantic Versioning (MAJOR.MINOR.PATCH) and pre-release identifiers.",
    "Using Conventional Commits as machine-readable triggers for automatic changelog updates.",
    "Setting up Release Please and Changesets for automated PR-based release orchestration.",
    "Publishing signed binaries, container images to Docker Hub, and packages to registries with provenance.",
  ],
  subModules: [
    {
      id: "semver-rules",
      title: "1. Semantic Versioning (SemVer 2.0.0)",
      description:
        "Define breaking changes, backward-compatible additions, and patch fix protocols.",
      status: "completed",
    },
    {
      id: "conventional-commits",
      title: "2. The Conventional Commits Standard",
      description:
        "Standardize commit messages to power automated version bumps and release notes.",
      status: "completed",
    },
    {
      id: "release-automation",
      title: "3. Automated Release Orchestration: Release Please & Changesets",
      description:
        "Eliminate manual release chores with automated changelog and tag PR generators.",
      status: "completed",
    },
    {
      id: "registry-publishing",
      title: "4. Multi-Registry Publishing & Build Provenance",
      description:
        "Publish packages to npm/PyPI and container registries with SLSA build provenance.",
      status: "completed",
    },
  ],
  detailedContent: `# Chapter 7: Semantic Versioning, Conventional Commits & Global Releases

Releasing software manually—manually updating version numbers in \`package.json\`, typing release notes, and uploading zip files—is error-prone and unsustainable. Global open-source projects rely on deterministic versioning machines driven by commit history.

---

## 1. Semantic Versioning (SemVer 2.0.0)

Under [SemVer 2.0.0](https://semver.org/), version numbers follow the format \`MAJOR.MINOR.PATCH\`:

\`\`\`text
v 2 . 4 . 1
  │   │   └── PATCH: Backward-compatible bug fixes
  │   └────── MINOR: Backward-compatible new functionality
  └────────── MAJOR: Breaking changes (incompatible API changes)
\`\`\`

### Golden Rules of SemVer:
* Before \`1.0.0\`, everything is unstable; rapid experimentation is acceptable, but breaking changes should bump \`0.X.0\`.
* Once \`1.0.0\` is released, **never** break backward compatibility without incrementing the \`MAJOR\` version.
* Deprecation warnings must precede breaking changes by at least one \`MINOR\` release cycle.

---

## 2. The Conventional Commits Specification

Standardized commit messages allow machines to automatically determine whether a commit requires a Patch, Minor, or Major version bump:

\`\`\`text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
\`\`\`

| Commit Prefix | SemVer Target | Description | Example |
|:--------------|:--------------|:------------|:--------|
| \`fix:\` | **PATCH** | A bug fix | \`fix(auth): resolve token expiration race condition\` |
| \`feat:\` | **MINOR** | A new feature | \`feat(cli): add --json output formatting flag\` |
| \`BREAKING CHANGE:\` | **MAJOR** | Incompatible API change | \`feat(db)!: drop postgres 12 compatibility\` |
| \`docs:\` | None | Documentation changes | \`docs: update quickstart guide with bun commands\` |
| \`refactor:\` | None / PATCH | Internal code refactor | \`refactor(router): simplify request pipeline\` |
| \`chore:\` | None | Tooling, dependencies, CI | \`chore(deps): bump vite from 5.1 to 5.2\` |

---

## 3. Automated Release Orchestration: Release Please

Google's **Release Please** is a GitHub Action that parses Conventional Commits and automatically maintains a standing **Release PR**:

\`\`\`yaml
# .github/workflows/release-please.yml
name: Release Orchestrator

on:
  push:
    branches:
      - main

permissions:
  contents: write
  pull-requests: write

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        id: release
        with:
          release-type: node

      # Trigger publishing when the Release PR is merged
      - uses: actions/checkout@v4
        if: \${{ steps.release.outputs.release_created }}
      - uses: oven-sh/setup-bun@v2
        if: \${{ steps.release.outputs.release_created }}
      - run: bun install --frozen-lockfile
        if: \${{ steps.release.outputs.release_created }}
      - run: bun run build
        if: \${{ steps.release.outputs.release_created }}
      - name: Publish to npm
        if: \${{ steps.release.outputs.release_created }}
        run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
\`\`\`

When this runs:
1. Every merged \`feat:\` or \`fix:\` updates a persistent Release PR with an automated \`CHANGELOG.md\`.
2. When maintainers merge the Release PR, it tags the Git release, creates a GitHub Release, and publishes to registries.

---

## 4. Multi-Platform Artifact Distribution

Global software must be accessible wherever developers work:
* **Package Registries:** npm (Node), PyPI (Python), Crates.io (Rust) using \`--provenance\` to verify that packages were built in GitHub Actions without tampering.
* **Containers:** Multi-arch Docker images (\`linux/amd64\`, \`linux/arm64\`) pushed to GitHub Container Registry (\`ghcr.io\`) and Docker Hub.
* **Binary Releases:** Compiled binaries (macOS Apple Silicon, Linux x64, Windows exe) built with Go or Rust attached directly to the GitHub Release.
`,
};
