# EC2 Engineering Interview Cheat Sheet

> **Goal**: Talk about EC2 not just as "virtual servers", but as a **compute strategy** for scalability, cost-efficiency, and resilience.

---

## 1. Compute Strategy (Cost & Performance)

Don't just launch an instance. Pick the _right_ one.

- **Spot Instances**: Use for **stateless, fault-tolerant** workloads (e.g., batch processing, CI/CD agents).
  - _Key Phrase_: "I use Spot instances for non-critical background jobs to save up to 90% on compute costs, handling interruptions via Spot Interruption Warnings."
- **Graviton (ARM)**: AWS's custom silicon.
  - _Key Phrase_: "For modern stacks (Node.js, Python, Go), I prefer **Graviton (m7g/c7g)** instances because they offer up to 40% better price-performance than x86."
- **Savings Plans / RIs**: Use for **steady-state** baselines (e.g., databases, core app servers).
  - _Pro Tip_: Prefer **Compute Savings Plans** over Reserved Instances (RIs) for flexibility (allows changing instance families/regions).

## 2. Storage Mastery (EBS vs Instance Store)

Know where your data lives and dies.

- **Instance Store (Ephemeral)**: Physically attached SSDs. **Fastest** I/O, but data is **LOST** on stop/termination.
  - _Use Case_: Caches (Redis), buffers, temporary scratch data.
- **EBS (Persistent)**: Network-attached storage. Verified data persistence.
  - **gp3 vs gp2**: "I always choose **gp3** over gp2. It's 20% cheaper and lets me scale IOPS independently of storage size."
  - **io2**: Only for mission-critical databases needing >16,000 IOPS.

## 3. Networking & Security

Security is "Job Zero".

- **Security Groups vs NACLs**:
  - **Security Groups**: **Stateful**. If I allow traffic IN, the response is automatically allowed OUT. (Applied at Instance level).
  - **NACLs**: **Stateless**. Must explicitly allow IN and OUT. (Applied at Subnet level).
- **No More SSH Keys**:
  - _Key Phrase_: "I avoid managing SSH keys (`.pem` files). Instead, I use **SSM Session Manager** or **EC2 Instance Connect**. It's more secure, auditable, and doesn't require opening port 22 to the world."
- **Placement Groups**:
  - **Cluster**: Low latency (HPC, ML). All instances in one rack.
  - **Spread**: High availability (Critical DBs). Instances on distinct hardware racks.

## 4. Resilience ("Cattle, Not Pets")

servers should be disposable.

- **Auto Scaling Groups (ASG)**:
  - Feature: Automatically replaces unhealthy instances.
  - _Key Phrase_: "Even for a single instance, I put it in an ASG with min=1, max=1. If the hardware fails, the ASG automatically launches a fresh replacement."
- **Multi-AZ**:
  - Always distribute instances across at least **2 Availability Zones (AZs)** to surviving a data center outage.

## 5. Operational Excellence

- **User Data**:
  - Automate bootstrapping (installing Docker, pulling code) so instances are ready upon launch.
- **IAM Roles**:
  - **NEVER** store AWS credentials (`AWS_ACCESS_KEY_ID`) on an instance.
  - _Key Phrase_: "I attach an **IAM Role** to the instance to grant permissions (e.g., writing to S3) securely."
- **IMDSv2 (Instance Metadata Service vol 2)**:
  - "I enforce **IMDSv2** to prevent SSRF (Server-Side Request Forgery) attacks by requiring a session token."

---

## 💡 Quick-Fire FAQs

**Q: High CPU utilization alarm goes off. What do you do?**
A: Check if it's a spike or sustained. If sustained, is it a code issue (infinite loop) or legit traffic? If traffic, the **Auto Scaling Group** should already be scaling out. If not, I'd trigger a scale-out dynamically or upsizing the instance type vertically.

**Q: We need to reduce our EC2 bill by 30%. How?**
A: 1. Right-sizing (downsize underutilized instances). 2. Switch to **Graviton**. 3. Move non-critical workloads to **Spot**. 4. Purchase **Savings Plans** for the baseline. 5. Delete unattached EBS volumes and old snapshots.
