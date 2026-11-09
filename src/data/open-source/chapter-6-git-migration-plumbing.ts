import { LearningModule } from "@/types/learning";

export const chapter6Module: LearningModule = {
  id: "git-migration-and-plumbing",
  title: "Chapter 6: Git Plumbing, SSH Diagnostics & Zero-Loss Migration",
  description:
    "Master low-level Git mechanics, troubleshoot network-level SSH handshake failures, refactor remotes, and execute zero-loss repository migrations into organizations.",
  status: "completed",
  tags: ["Git Plumbing", "SSH", "Repository Migration", "DevOps", "Networking"],
  estimatedHours: 5,
  skills: [
    "Git Plumbing & Tree Inspection",
    "SSH Port & Fingerprint Diagnostics",
    "Multi-Remote Architecture & Refactoring",
    "Zero-Loss Repository Migration",
  ],
  keyLearnings: [
    "Understanding Git internals: how commits, trees, and blobs compose a deterministic DAG.",
    "Diagnosing SSH handshake rejections on port 443 vs standard port 22 in restricted network environments.",
    "Using `git ls-remote` to query remote references without cloning.",
    "Refactoring remotes (`personal` vs `origin`) and executing forced root overwrites safely without losing commit history.",
  ],
  subModules: [
    {
      id: "git-internals-and-plumbing",
      title: "1. Git Internals: DAGs, Trees & Refs",
      description:
        "How Git represents project history and why branch pointers can be rewritten safely.",
      status: "completed",
    },
    {
      id: "ssh-diagnostics-port-routing",
      title: "2. SSH Port Diagnostics & Known Hosts Management",
      description:
        "Debug `Connection closed by port 443` and configure `~/.ssh/config` for reliable authentication.",
      status: "completed",
    },
    {
      id: "remote-refactoring",
      title: "3. Remote Refactoring: Upstream, Origin & Personal",
      description:
        "Manage multiple remotes cleanly when migrating projects between accounts.",
      status: "completed",
    },
    {
      id: "zero-loss-migration",
      title: "4. Executing Zero-Loss Organization Migrations",
      description:
        "Migrate entire histories, tags, and commits into fresh organization repositories.",
      status: "completed",
    },
  ],
  detailedContent: `# Chapter 6: Git Plumbing, SSH Diagnostics & Zero-Loss Migration

As projects mature, code must frequently transition from an engineer's personal sandbox into an organizational namespace. Understanding Git plumbing and SSH networking enables seamless migrations without losing a single commit, author attribution, or tag.

---

## 1. Git Internals: The Directed Acyclic Graph (DAG)

Git is not an incremental delta engine; it is a content-addressable storage system built on four cryptographic object primitives:
* **Blob:** Stores raw file data (unaware of filename or directory).
* **Tree:** Represents a directory structure, mapping filenames to blob hashes and subtrees.
* **Commit:** An immutable snapshot pointing to a top-level Tree, author/committer metadata, and parent commit SHAs.
* **Ref:** A mutable pointer (e.g., \`refs/heads/main\`) to a commit SHA.

\`\`\`text
[Commit: 6a644a2] ---> [Tree: 4b825dc] ---> [Blob: package.json]
       |                               ---> [Tree: src/] ---> [Blob: index.ts]
       v
[Parent: 0b1c04a] ---> [Tree: 8f219aa]
\`\`\`

Because commit SHAs are cryptographic hashes of their tree and parents, **migrating a repository simply means copying the object database** and updating remote refs.

---

## 2. SSH Diagnostics: Port 22 vs Port 443 Routing

Developers often encounter network firewalls that terminate SSH traffic or drop port 443 connections to \`ssh.github.com\`:

\`\`\`bash
# Symptom: Connection drops immediately
ssh -T git@github.com
# Connection closed by 20.207.73.83 port 443 (exit code 255)
\`\`\`

### The Fix: Direct Port 22 Routing with ED25519
Update \`~/.ssh/config\` to explicitly map \`github.com\` to standard port 22 with the designated keypair:

\`\`\`ssh-config
Host github.com
  Hostname github.com
  Port 22
  User git
  IdentityFile ~/.ssh/id_ed25519
\`\`\`

Verify host authenticity and store the fingerprint in \`~/.ssh/known_hosts\`:
\`\`\`bash
ssh -o StrictHostKeyChecking=accept-new git@github.com
# Response: "Hi akshayaparida! You've successfully authenticated..."
\`\`\`

---

## 3. Remote Verification with Git Plumbing (\`git ls-remote\`)

Before cloning or pushing, use the low-level plumbing command \`git ls-remote\` to inspect remote heads without downloading objects:

\`\`\`bash
# Inspect commit SHA on personal repo
git ls-remote git@github.com:akshayaparida/rip_social.git
# 6a644a27bfbdd9909e4ce3142655428f7641b174    HEAD

# Inspect commit SHA on new empty org repo
git ls-remote git@github.com:RIP-Foundation/rip_social.git
# becff9d35adc85c161d88bea34ccfa8904d7e8cd    HEAD (Initial commit)
\`\`\`

---

## 4. The Zero-Loss Migration Playbook

When the destination organization repo is initialized with a default commit (\`becff9d\`), pushing normally fails due to non-fast-forward divergence. Here is the step-by-step migration procedure:

\`\`\`bash
# Step 1: Clone the authoritative personal repository with full history
cd ~/Desktop
git clone git@github.com:akshayaparida/rip_social.git
cd rip_social

# Step 2: Rename origin to personal to preserve fallback access
git remote rename origin personal

# Step 3: Add the new organization repository as canonical origin
git remote add origin git@github.com:RIP-Foundation/rip_social.git

# Step 4: Verify the dual-remote configuration
git remote -v
# origin    git@github.com:RIP-Foundation/rip_social.git (fetch & push)
# personal  git@github.com:akshayaparida/rip_social.git (fetch & push)

# Step 5: Force-push main branch to overwrite dummy init commit
# (This pushes all 86 objects, trees, and full commit DAG losslessly)
git push -u origin main --force

# Step 6: Verify upstream tracking
git status
# "On branch main. Your branch is up to date with 'origin/main'."
\`\`\`
`,
};
