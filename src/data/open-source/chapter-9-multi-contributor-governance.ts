import { LearningModule } from "@/types/learning";

export const chapter9Module: LearningModule = {
  id: "multi-contributor-governance",
  title: "Chapter 9: Multi-Contributor Workflows, CODEOWNERS & Security",
  description:
    "Scale open-source collaboration cleanly: master the Fork & Pull model, automate code review routing with CODEOWNERS, isolate untrusted PR workflows, and build an active contributor ladder.",
  status: "completed",
  tags: [
    "Multi-Contributor",
    "CODEOWNERS",
    "Security",
    "GitHub Flow",
    "Open Source",
  ],
  estimatedHours: 5,
  skills: [
    "Fork & Pull Architecture",
    "Automated Code Ownership (CODEOWNERS)",
    "External CI Security & Secret Isolation",
    "Contributor Ladder & Community Attribution",
  ],
  keyLearnings: [
    "The operational boundaries between external contributors (Fork & Pull) and core maintainers (shared feature branches).",
    "Preventing the bystander effect by automatically routing PR reviews using `.github/CODEOWNERS`.",
    "Hardening GitHub Actions against malicious external PRs using workflow execution approvals and secret isolation.",
    "Designing contributor progression ladders and using the All Contributors specification for public recognition.",
  ],
  subModules: [
    {
      id: "fork-and-pull-model",
      title: "1. The Two Contribution Models: Fork & Pull vs Shared Branching",
      description:
        "Define distinct permission boundaries for outside contributors and internal core maintainers.",
      status: "completed",
    },
    {
      id: "codeowners-routing",
      title: "2. Automated Review Routing with .github/CODEOWNERS",
      description:
        "Route pull request reviews automatically based on touched file paths and monorepo boundaries.",
      status: "completed",
    },
    {
      id: "fork-ci-security",
      title: "3. Fork CI Security: Workflow Isolation & Secret Masking",
      description:
        "Protect repository infrastructure and secrets against malicious pull requests from external forks.",
      status: "completed",
    },
    {
      id: "contributor-ladder",
      title: "4. The Contributor Ladder & Community Recognition",
      description:
        "Cultivate new co-maintainers and recognize community contributions using the All Contributors specification.",
      status: "completed",
    },
  ],
  detailedContent: `# Chapter 9: Multi-Contributor Workflows, CODEOWNERS & Security

When an open-source project gains traction, dozens of developers across the globe begin submitting pull requests simultaneously. Without structured contribution models and automated guardrails, maintainers quickly become overwhelmed by merge conflicts, low-signal PRs, and potential security threats.

---

## 1. The Two Contribution Models

In production-grade open source, contributors operate under two distinct workflows depending on their trust tier:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ 1. External Community (Public / Outside Collaborators) │
│    Fork repo -> Push to personal fork -> Submit PR     │
│    • Zero direct write access to your repository       │
│    • Workflows require maintainer approval to run      │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ 2. Core Maintainers (Internal Organization Members)    │
│    Direct clone -> Push to feat/branch -> Internal PR  │
│    • Branch creation rights in canonical repo          │
│    • Direct push to main is permanently blocked        │
└────────────────────────────────────────────────────────┘
\`\`\`

### Fork & Pull Model (External)
1. The contributor forks \`RIP-Foundation/rip_social\` to their personal account (\`username/rip_social\`).
2. They develop on a branch inside their fork and open a PR targeting \`RIP-Foundation/rip_social:main\`.
3. They never possess branch creation, deletion, or label rights in the upstream organization repository.

### Shared Branch Model (Internal)
1. Core maintainers clone \`RIP-Foundation/rip_social\` directly.
2. They push isolated feature branches (e.g., \`feat/citizen-auth\`) directly to the org repository.
3. Protected branch rules require that their internal PRs undergo automated CI validation and peer review before merging.

---

## 2. Automated Review Routing: \`.github/CODEOWNERS\`

In large monorepos, pull requests often stall because team members assume someone else will review them (the *bystander effect*). GitHub's \`CODEOWNERS\` file automatically assigns designated reviewers based on file paths:

\`\`\`text
# .github/CODEOWNERS

# Default fallback: Org owners review everything by default
*                   @RIP-Foundation/owners

# Backend services & database schemas require DB team review
packages/db/**      @akshayaparida
apps/api/**         @akshayaparida

# Frontend applications & UI components
apps/web/**         @RIP-Foundation/frontend-team

# Critical infrastructure, monorepo configs, and CI/CD pipelines
.github/**          @akshayaparida
turbo.json          @akshayaparida
bun.lock            @akshayaparida
\`\`\`

### Key Best Practices:
* **Enforce Code Owner Reviews:** Under **Settings > Branches**, check **"Require review from Code Owners"**. A pull request affecting \`packages/db\` cannot merge until the designated owner approves it.
* **Use Teams Rather Than Individuals:** Assign reviews to teams (e.g., \`@org/backend\`) to distribute review load across multiple engineers.

---

## 3. Fork CI Security: Workflow Isolation & Secret Masking

Untrusted community PRs present a severe attack vector: malicious actors can open pull requests containing code that steals environment secrets, compromises CI runners, or mines cryptocurrency.

### Ironclad GitHub Actions Security Rules:
1. **Require Approval for First-Time Contributors:**
   * In GitHub **Settings > Actions > General > Fork pull request workflows**, select:  
     ✅ **"Require approval for all outside collaborators"** (or *first-time contributors*).
   * Workflows will **not** execute until an organization maintainer inspects the diff and clicks **"Approve and run"**.
2. **Never Expose Repository Secrets to Forks:**
   * GitHub Actions automatically omits repository secrets on \`pull_request\` events originating from forks. Keep this default intact.
   * **Caution:** Avoid \`pull_request_target\` unless you strictly isolate checkout steps. \`pull_request_target\` runs in the context of the base branch with full access to secrets, creating severe security vulnerabilities if misconfigured.
3. **Limit GITHUB_TOKEN Permissions:**
   * Enforce least-privilege token permissions by default:
   \`\`\`yaml
   permissions:
     contents: read
     pull-requests: write
   \`\`\`

---

## 4. The Contributor Ladder & Community Recognition

Great open-source projects convert one-time contributors into lifelong maintainers through a transparent progression ladder:

\`\`\`text
[First-Time Contributor] 
       │ (solves a 'good first issue')
       ▼
[Active Contributor]     
       │ (submits multiple high-quality PRs)
       ▼
[Triage Team Member]     
       │ (granted rights to label, assign, and reproduce issues)
       ▼
[Core Maintainer]        
         (granted branch creation and merge rights on canonical repo)
\`\`\`

### Community Attribution (All Contributors):
Recognize non-code contributions (documentation, issue reproduction, design, review) directly in your project README using the **All Contributors** standard:

\`\`\`markdown
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/12345" width="100px;"/><br /><sub><b>Jane Doe</b></sub>](https://github.com/janedoe)<br /><a href="#code" title="Code">💻</a> <a href="#doc" title="Documentation">📖</a> <a href="#bug" title="Bug Reports">🐛</a> |
<!-- ALL-CONTRIBUTORS-LIST:END -->
\`\`\`
`,
};
