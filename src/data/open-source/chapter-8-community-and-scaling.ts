import { LearningModule } from "@/types/learning";

export const chapter8Module: LearningModule = {
  id: "community-and-scaling",
  title: "Chapter 8: Community Growth, Issue Triage & Long-Term Maintenance",
  description:
    "Grow a thriving contributor base, triage issues at scale, foster empathetic code reviews, build documentation hubs, and achieve financial sustainability.",
  status: "completed",
  tags: [
    "Community",
    "Issue Triage",
    "Sustainability",
    "Documentation",
    "GitHub Sponsors",
  ],
  estimatedHours: 5,
  skills: [
    "Community Onboarding Architecture",
    "High-Throughput Issue Triage",
    "Empathetic Code Review Etiquette",
    "Open Source Financial Sustainability",
  ],
  keyLearnings: [
    "Curating beginner-friendly entry points using standard `good first issue` and `help wanted` labels.",
    "Using GitHub Discussions to separate conversational Q&A from actionable bug reports.",
    "Maintaining high contributor retention through rapid review turnaround and public attribution (All Contributors).",
    "Setting up diversified financial backing via GitHub Sponsors, Open Collective, and corporate grants.",
  ],
  subModules: [
    {
      id: "contributor-funnels",
      title: "1. Contributor Onboarding Funnels & Labeling",
      description:
        "Convert curious lurkers into reliable core contributors through structured pathways.",
      status: "completed",
    },
    {
      id: "github-discussions-and-rfcs",
      title: "2. GitHub Discussions & Asynchronous RFCs",
      description:
        "Prevent issue tracker clutter by steering design discussions and questions into dedicated forums.",
      status: "completed",
    },
    {
      id: "review-etiquette-and-attribution",
      title: "3. Empathetic Review Etiquette & Contributor Recognition",
      description:
        "Cultivate psychological safety and acknowledge community contributions publicly.",
      status: "completed",
    },
    {
      id: "financial-sustainability",
      title: "4. Financial Sustainability: Sponsors & Foundations",
      description:
        "Establish transparent funding models to support infrastructure costs and maintainer time.",
      status: "completed",
    },
  ],
  detailedContent: `# Chapter 8: Community Growth, Issue Triage & Long-Term Maintenance

Writing code is only 20% of open source; the remaining 80% is community orchestration, communication, and maintenance. Sustainable projects outlive their founders because they foster a culture where contributors feel welcomed, valued, and empowered.

---

## 1. Contributor Onboarding Funnels

Great projects deliberately build a **contributor pipeline**:

\`\`\`text
[Casual User] 
       │ (encounters small bug / typo)
       ▼
[First-Time Contributor] ───> Solves a \`good first issue\`
       │ (receives welcoming, rapid PR review)
       ▼
[Repeat Contributor]     ───> Tackles \`help wanted\` feature tasks
       │ (granted triage rights)
       ▼
[Core Maintainer]        ───> Reviews PRs, shapes roadmap, authors RFCs
\`\`\`

### Issue Labeling Taxonomy:
* \`good first issue\`: Self-contained tasks with clear solutions and reproduction steps (GitHub highlights these to millions of developers globally).
* \`help wanted\`: Complex features or performance improvements where core maintainers welcome external expertise.
* \`needs reproduction\`: Issues requiring proof before maintainers spend triage time.
* \`rfc / discussion\`: Architectural proposals open for community feedback.

---

## 2. GitHub Discussions vs Issue Trackers

A common mistake is allowing bug trackers to devolve into support forums. Enable **GitHub Discussions** to separate support from work:

| Feature | GitHub Issues | GitHub Discussions |
|:--------|:--------------|:-------------------|
| **Purpose** | Actionable tasks: bugs, features, security alerts | Open-ended topics: Q&A, RFCs, ideas, showcase |
| **Lifecycle** | Has clear definition of done (\`Open\` $\rightarrow$ \`Closed\`) | Ongoing discussion with marked "Accepted Answers" |
| **Notifications** | Alerts maintainers for triaging | Community-moderated forum |

---

## 3. Empathetic Code Review Etiquette

Code review in open source is public and personal. Reviewers represent the project's brand:

### Best Practices for Maintainers:
* **Acknowledge Fast:** Respond within 24–48 hours, even if it's just: *"Thank you for submitting this PR! I'm reviewing it this Thursday."*
* **Separate Nitpicks from Blockers:** Prefix minor styling comments with \`nit:\` so contributors know it isn't blocking their merge.
* **Explain the "Why":** Never simply say *"Change this"*. Say: *"We avoid this pattern here because it causes memory leaks under high concurrency. Here's how we can restructure it..."*
* **Celebrate Milestones:** Use tools like the **All Contributors Bot** (\`@all-contributors please add @username for code, doc\`) to add them to your README hall of fame.

---

## 4. Financial Sustainability & Grants

Long-term maintenance requires resources to cover CI compute, domain names, test servers, and maintainer time.

### Funding Channels:
1. **GitHub Sponsors:** Zero-fee sponsorship directly linked to your organization with tier badges.
2. **Open Collective:** Provides transparent, tax-exempt fiscal sponsorship where community members can audit expenses and payouts.
3. **Corporate Grants & Foundations:** Once mature, projects can apply to foundations like the **Linux Foundation**, **Apache Software Foundation**, or **Open Source Collective** for legal protection and governance stewardship.
`,
};
