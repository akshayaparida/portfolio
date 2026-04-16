import { LearningModule } from "@/types/learning";

export const ec2DeepDiveModule: LearningModule = {
  id: "ec2-deep-dive",
  title: "Module 4: EC2 Deep Dive",
  description:
    "Master Amazon EC2: Instances, AMIs, Pricing, Storage, Security, and ML Workloads",
  status: "in-progress",
  detailedContent: `# EC2 Deep Dive

**Amazon Elastic Compute Cloud (EC2)** — virtual servers in the cloud. You rent compute capacity by the second, scale up/down on demand, and pay only for what you use.

## What You'll Learn

| # | Topic |
|:--|:------|
| 1 | Instance Lifecycle |
| 2 | AMI (Amazon Machine Image) |
| 3 | Instance Types |
| 4 | Pricing Models |
| 5 | Security Groups |
| 6 | Key Pairs & Connecting to Instances |
| 7 | User Data (Bootstrap Scripts) |
| 8 | EBS (Elastic Block Store) |
| 9 | Elastic IP |
| 10 | IAM Roles for EC2 |
| 11 | Placement Groups |
| 12 | EC2 for ML/AI Workloads |
| 13 | Hibernation |
| 14 | Networking Essentials |

---

## 1. Instance Lifecycle

Every EC2 instance goes through these states:

\`\`\`
Launch → pending → running → (stopping → stopped) → (shutting-down → terminated)
\`\`\`

### Instance States

| State | Billing? | What's Happening |
|:------|:---------|:-----------------|
| **pending** | No | Instance is being provisioned |
| **running** | Yes | Instance is live and usable |
| **stopping** | No | Shutting down (EBS-backed only) |
| **stopped** | No (compute) | No compute charges; EBS still billed |
| **terminated** | No | Instance deleted, EBS deleted (unless "Delete on Termination" is off) |

### Key Points

| Action | What Happens |
|:-------|:-------------|
| **Stop** | Pause compute, keep EBS data. Public IP changes on restart. Use Elastic IP to keep it. |
| **Terminate** | Destroy everything. Data on instance store is **ALWAYS** lost. |
| **Reboot** | Restart without changing public IP or losing instance store data. |

---

## 2. AMI (Amazon Machine Image)

An AMI is a **template** to launch instances — contains OS, pre-installed software, and configurations.

### Types of AMIs

| Type | Description | Examples |
|:-----|:------------|:---------|
| **AWS-provided** | Maintained by AWS | Amazon Linux 2023, Ubuntu 22.04, Windows Server |
| **Marketplace** | Pre-configured for specific use cases | Deep Learning AMI, NVIDIA GPU Cloud |
| **Custom AMI** | Your own golden image | Your app + dependencies baked in |

### Why Custom AMIs Matter (SDE & MLOps)

- **Reproducible environments** — Same dependencies every time, no "works on my machine"
- **Faster boot** — Pre-bake your app/ML dependencies instead of installing via User Data every launch
- **Golden image pipeline** — Build AMI → test → deploy to Auto Scaling Group

### Creating a Custom AMI

| Step | Action |
|:-----|:-------|
| 1 | Launch instance, install everything you need |
| 2 | **Actions → Image and Templates → Create Image** |
| 3 | AMI is stored in S3 (you pay for storage) |
| 4 | AMIs are **REGION-SPECIFIC** — copy to other regions if needed |

> ⚠ **Important**: AMIs are region-specific. If you create an AMI in \`ap-south-1\`, you must copy it to \`us-east-1\` before launching instances there.

---

## 3. Instance Types

Format: \`<family><generation>.<size>\` → e.g., \`t3.medium\`, \`g5.xlarge\`

### Families You Must Know

| Family | Optimized For | Use Case |
|:-------|:-------------|:---------|
| **t3/t4g** | Burstable general purpose | Dev/staging, small APIs, microservices |
| **m5/m6i/m7i** | General purpose (balanced) | Web apps, backend services, CI/CD runners |
| **c5/c6i/c7i** | Compute optimized | Data processing, batch jobs, scientific computing |
| **r5/r6i/r7i** | Memory optimized | In-memory DBs (Redis), data analytics, caching |
| **g4dn/g5** | GPU (NVIDIA) | ML training, inference, video encoding |
| **p3/p4d/p5** | High-end GPU | Large-scale ML training, distributed deep learning |
| **inf2** | AWS Inferentia | Cost-effective ML inference |
| **i3/i4i** | Storage optimized | High I/O databases, data warehousing |

### Burstable Instances (t3/t4g) — How Credits Work

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  CPU Credits:                                                │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Earn credits when idle → Spend when bursting       │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Unlimited mode (default):                                   │
│    Burst beyond credits but pay extra — watch your bill      │
│                                                              │
│  Standard mode:                                              │
│    Throttled when credits run out — safer for cost control   │
│                                                              │
│  Monitor: CloudWatch → CPUCreditBalance metric              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

> 💡 **Rule of thumb**: \`t3.medium\` for dev, \`m5.large\` or higher for production workloads.

---

## 4. Pricing Models (Critical for Cost Optimization)

### Pricing Comparison

| Model | Savings | Commitment | Best For |
|:------|:--------|:-----------|:---------|
| **On-Demand** | 0% (baseline) | None | Dev/test, unpredictable workloads |
| **Reserved Instances** | Up to 72% | 1 or 3 year | Steady-state production servers |
| **Savings Plans** | Up to 72% | 1 or 3 year ($/hr commitment) | Flexible across instance types |
| **Spot Instances** | Up to 90% | None (can be interrupted) | ML training, batch jobs, CI/CD |
| **Dedicated Hosts** | Varies | Per-host billing | Compliance, licensing requirements |

### Spot Instances — Deep Dive (Essential for ML)

**How Spot Works:**

1. You request a Spot instance
2. AWS gives you unused capacity at **60-90% discount**
3. AWS can reclaim with **2-MINUTE WARNING**
4. Your workload must handle interruptions

| ✅ Use for | ❌ Don't use for |
|:----------|:----------------|
| ML training (checkpoint every epoch) | Production web servers |
| Batch processing | Databases |
| CI/CD pipelines | Anything that **CANNOT** be interrupted |
| Data analysis | |

### Reserved vs Savings Plans

| Aspect | Reserved Instances | Savings Plans |
|:-------|:-------------------|:--------------|
| **Lock-in** | Specific instance type + region | Commit to $/hr spend |
| **Flexibility** | Low | High — works across instance families |
| **Recommendation** | When you know exact needs | Most cases — more flexible |

> 💡 **MLOps tip**: Use **Spot** for training (save 60-90%), **On-Demand/Reserved** for inference endpoints.

---

## 5. Security Groups (Stateful Firewall)

Security Groups control inbound/outbound traffic at the **instance level**.

### Key Concepts

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  Security Group Rules:                                       │
│                                                              │
│  • STATEFUL — Allow inbound? Response outbound is auto      │
│  • Default: All inbound BLOCKED, all outbound ALLOWED       │
│  • An instance can have MULTIPLE security groups             │
│  • NO deny rules — you can only ALLOW (default is deny)     │
│  • Changes take effect IMMEDIATELY                          │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Common Rules

| Purpose | Protocol | Port | Source |
|:--------|:---------|:-----|:-------|
| SSH | TCP | 22 | Your IP only (**never** 0.0.0.0/0 in prod) |
| HTTP | TCP | 80 | 0.0.0.0/0 |
| HTTPS | TCP | 443 | 0.0.0.0/0 |
| Custom app | TCP | 8080/3000/5000 | 0.0.0.0/0 or specific CIDR |
| PostgreSQL | TCP | 5432 | App server SG only |
| MySQL | TCP | 3306 | App server SG only |
| Redis | TCP | 6379 | App server SG only |

### SG Referencing (Important Pattern)

Instead of hardcoding IPs, reference another security group:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌───────────────┐         ┌──────────────┐                 │
│  │  Web Server   │         │   Database   │                 │
│  │  SG: web-sg   │────────→│  SG: db-sg   │                 │
│  │               │         │              │                 │
│  │  Inbound:     │         │  Inbound:    │                 │
│  │  80 from      │         │  5432 from   │                 │
│  │  0.0.0.0/0    │         │  web-sg ONLY │                 │
│  └───────────────┘         └──────────────┘                 │
│                                                              │
│  Result: Only web servers can talk to the database          │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 6. Key Pairs & Connecting to Instances

### Method 1: SSH with Key Pair

\`\`\`bash
# Set permissions (required — SSH rejects open keys)
chmod 400 my-key.pem

# Connect (Ubuntu)
ssh -i my-key.pem ubuntu@<public-ip>

# Connect (Amazon Linux)
ssh -i my-key.pem ec2-user@<public-ip>
\`\`\`

### Method 2: EC2 Instance Connect

- Browser-based SSH — no key pair needed
- Works on Amazon Linux 2 and Ubuntu 20.04+
- Requires port 22 open to AWS IP ranges

### Method 3: Systems Manager Session Manager (Recommended for Production)

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  Session Manager Advantages:                                 │
│                                                              │
│  ✓ No SSH port needed (port 22 can be CLOSED)               │
│  ✓ No key pairs to manage                                   │
│  ✓ All sessions logged in CloudTrail for audit              │
│  ✓ Works through browser or CLI                             │
│                                                              │
│  Setup:                                                      │
│  1. Attach IAM role with AmazonSSMManagedInstanceCore       │
│  2. SSM agent pre-installed on Amazon Linux, Ubuntu         │
│  3. Connect: aws ssm start-session --target i-xxxxx        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 7. User Data (Bootstrap Scripts)

Scripts that run **once** at first boot. Used to automate instance setup.

### Example: Setting Up an ML API Server

\`\`\`bash
#!/bin/bash
# Runs as root at first boot

apt-get update -y
apt-get install -y python3-pip python3-venv nginx

# Create app directory
mkdir -p /opt/ml-api
cd /opt/ml-api

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn boto3 scikit-learn

# Download model from S3 (using IAM role — no credentials needed)
aws s3 cp s3://my-bucket/model.pkl /opt/ml-api/model.pkl

# Start the API
uvicorn app:app --host 0.0.0.0 --port 8000 &
\`\`\`

### Key Points

| Property | Detail |
|:---------|:-------|
| **Runs as** | root user |
| **Runs** | Once at first boot only |
| **Logs** | \`/var/log/cloud-init-output.log\` — check here for debugging |
| **Max size** | 16 KB (use S3 for larger scripts) |
| **Best practice** | For complex setups, bake into a **custom AMI** instead |

---

## 8. EBS (Elastic Block Store)

Persistent block storage that attaches to EC2 instances — like a virtual hard drive.

### Volume Types

| Type | IOPS | Throughput | Use Case |
|:-----|:-----|:-----------|:---------|
| **gp3** (default) | 3,000 baseline (up to 16,000) | 125 MB/s (up to 1,000) | Boot volumes, apps, dev DBs |
| **io2 Block Express** | Up to 256,000 | 4,000 MB/s | Production DBs needing sub-ms latency |
| **st1** | 500 | 500 MB/s | Big data, log processing (sequential reads) |
| **sc1** | 250 | 250 MB/s | Infrequent access, cold storage |

### Key Concepts

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  EBS Rules:                                                  │
│                                                              │
│  • AZ-locked: Volume in us-east-1a can ONLY attach to      │
│    instances in us-east-1a                                   │
│                                                              │
│  • Multi-attach (io2 only): Attach same volume to multiple  │
│    instances in same AZ                                      │
│                                                              │
│  • Encryption: Enable by default — uses AWS KMS,            │
│    no performance impact                                     │
│                                                              │
│  • Delete on Termination:                                    │
│    Root volume = ON by default                               │
│    Additional volumes = OFF by default                       │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Snapshots

- Point-in-time backup stored in S3
- **Incremental** — Only changed blocks are saved after the first snapshot
- Can create AMIs from snapshots
- Cross-region copy for disaster recovery
- Automate with **Data Lifecycle Manager (DLM)**

### Instance Store vs EBS

| | Instance Store | EBS |
|:--|:--------------|:----|
| **Persistence** | Lost on stop/terminate | Persists independently |
| **Performance** | Very high (physically attached NVMe) | Good (network-attached) |
| **Use for** | Temp cache, scratch data, shuffle space for Spark/ML | OS, databases, app data, ML models |
| **Backup** | You manage | Snapshots |

---

## 9. Elastic IP

A **static public IPv4 address** that you own until you release it.

| Property | Detail |
|:---------|:-------|
| **Cost when attached** | Free (to a running instance) |
| **Cost when idle** | $0.005/hr ≈ $3.60/month |
| **Limit** | 5 per region (can request increase) |
| **Better alternative** | Use DNS (Route 53) + ALB instead |

> ⚠ **Warning**: Unused Elastic IPs cost money! Always release IPs you're not using.

---

## 10. IAM Roles for EC2 (Security — Critical!)

### The Golden Rule

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  NEVER hardcode AWS credentials (access keys) in code       │
│  or on EC2 instances.                                        │
│                                                              │
│  NEVER store access keys as environment variables           │
│  on instances.                                               │
│                                                              │
│  ALWAYS use IAM Roles instead.                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### How It Works

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  EC2 Instance                                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Instance Profile (container)                          │  │
│  │  ┌───────────────────────────────────────────────┐    │  │
│  │  │  IAM Role                                      │    │  │
│  │  │  - Trust: ec2.amazonaws.com                    │    │  │
│  │  │  - Permissions: S3 Read, CloudWatch Logs       │    │  │
│  │  └───────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  AWS SDK auto-picks temporary credentials from metadata     │
│  Credentials rotate automatically — zero management         │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Example: EC2 Accessing S3

\`\`\`python
import boto3

# No credentials needed — IAM role handles it
s3 = boto3.client('s3')
s3.download_file('my-ml-bucket', 'model.pkl', '/tmp/model.pkl')
\`\`\`

### Common Role Policies

| Use Case | Policy |
|:---------|:-------|
| Read S3 | \`AmazonS3ReadOnlyAccess\` |
| Read/Write S3 | \`AmazonS3FullAccess\` |
| Session Manager | \`AmazonSSMManagedInstanceCore\` |
| CloudWatch Logs | \`CloudWatchAgentServerPolicy\` |
| ECR (pull Docker images) | \`AmazonEC2ContainerRegistryReadOnly\` |
| SQS access | \`AmazonSQSFullAccess\` |

> ⚠ **Best Practice**: Create **custom policies** with least privilege instead of using \`*FullAccess\` managed policies.

---

## 11. Placement Groups

Control **how instances are physically placed** on AWS hardware.

### Placement Strategies

| Strategy | Behavior | Use Case |
|:---------|:---------|:---------|
| **Cluster** | All instances on same rack | HPC, distributed ML training (low latency, high throughput) |
| **Spread** | Each instance on different hardware | HA — max 7 instances per AZ |
| **Partition** | Instances grouped into partitions on separate racks | Large distributed systems (Hadoop, Cassandra, Kafka) |

### Visual

\`\`\`
Cluster (low latency):           Spread (high availability):
┌──────────────────────┐         ┌────────┐  ┌────────┐  ┌────────┐
│  Same Rack           │         │ Rack 1 │  │ Rack 2 │  │ Rack 3 │
│  [i1] [i2] [i3] [i4]│         │  [i1]  │  │  [i2]  │  │  [i3]  │
│                      │         └────────┘  └────────┘  └────────┘
│  ↔ Ultra-low latency │         Each on separate hardware
└──────────────────────┘
\`\`\`

> 💡 **ML tip**: Use **Cluster** placement for distributed training with multiple GPU instances to minimize network latency between nodes.

---

## 12. EC2 for ML/AI Workloads

### GPU Instance Selection Guide

| Instance | GPU | GPU Memory | Best For |
|:---------|:----|:-----------|:---------|
| **g4dn.xlarge** | 1x T4 | 16 GB | Inference, small model training |
| **g5.xlarge** | 1x A10G | 24 GB | Medium training, fine-tuning |
| **p3.2xlarge** | 1x V100 | 16 GB | Training, NLP |
| **p4d.24xlarge** | 8x A100 | 320 GB total | Large-scale training, LLMs |
| **inf2.xlarge** | AWS Inferentia2 | — | Cost-effective inference |

### ML Workflow on EC2

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│  Recommended ML Setup on EC2:                                │
│                                                              │
│  1. Use Deep Learning AMI                                    │
│     → Comes with PyTorch, TensorFlow, CUDA pre-installed    │
│                                                              │
│  2. Spot Instances for training                              │
│     → Checkpoint every epoch, use Spot Fleet                │
│                                                              │
│  3. IAM Role for S3 access                                   │
│     → Datasets in, model artifacts out                      │
│                                                              │
│  4. User Data to auto-setup environment on launch           │
│                                                              │
│  5. EBS gp3 for datasets                                     │
│     → Instance store for shuffle/temp data                  │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### EC2 vs SageMaker — When to Use What

| Aspect | EC2 | SageMaker |
|:-------|:----|:----------|
| **Control** | Full control over environment | Managed, less control |
| **Setup** | Manual (or via AMI/User Data) | Built-in training jobs |
| **Cost** | Pay for instance uptime | Pay for training job time + markup |
| **Best for** | Custom environments, research, full flexibility | Production ML pipelines, built-in HPO |

---

## 13. Hibernation

**Saves the contents of RAM to EBS**, then restores on start — like closing a laptop lid.

| Property | Detail |
|:---------|:-------|
| **Use case** | Long-running ML experiments, dev environments you want to resume |
| **Requirements** | EBS root volume must be encrypted, volume must be large enough for RAM |
| **Supported on** | On-Demand and Reserved instances only (not Spot) |
| **Max hibernation** | 60 days |

---

## 14. Networking Essentials

### ENI (Elastic Network Interface)

- Virtual network card attached to an instance
- Has: private IP, (optional) public IP, MAC address, security groups
- Can attach **multiple ENIs** to one instance (e.g., management network + data network)
- ENIs persist independently — detach from one instance, attach to another

### Enhanced Networking (ENA)

| Property | Detail |
|:---------|:-------|
| **Technology** | SR-IOV for higher bandwidth and lower latency |
| **Support** | Most modern instance types |
| **Matters for** | ML training (inter-node communication), high-throughput apps |
| **Max bandwidth** | Up to 100 Gbps on supported instances |

---

## TL;DR - Quick Recall

| Topic | Must Know |
|:------|:----------|
| **Instance Lifecycle** | pending → running → stopped → terminated; public IP changes on stop |
| **AMI** | Template to launch instances; custom AMI for reproducibility |
| **Instance Types** | t3 (burstable), m5 (general), c5 (compute), r5 (memory), g4dn/p3 (GPU) |
| **Pricing** | On-Demand vs Reserved vs Spot — Spot saves 90% for ML training |
| **Security Groups** | Stateful, no deny rules, SG referencing |
| **Connecting** | SSH (dev), Session Manager (prod — no port 22 needed) |
| **User Data** | Bootstrap scripts, runs once at first boot as root |
| **EBS** | gp3 default, AZ-locked, snapshots, instance store is ephemeral |
| **IAM Roles** | Never hardcode creds, instance profile, auto credential rotation |
| **Placement Groups** | Cluster for ML training, Spread for HA |
| **Spot Instances** | 2-min warning, checkpoint frequently, use for training |
`,
  practiceQuiz: [
    {
      id: "ec2-1",
      question:
        "What happens to the public IP address when you stop and restart an EC2 instance?",
      options: [
        "It stays the same",
        "It changes to a new public IP",
        "The instance loses public IP permanently",
        "AWS sends you the new IP via email",
      ],
      correctAnswer: 1,
      explanation:
        "When you stop and restart an EC2 instance, it gets a new public IP. To keep a fixed IP, use an Elastic IP.",
      difficulty: "easy" as const,
    },
    {
      id: "ec2-2",
      question:
        "Which pricing model offers up to 90% discount but can be interrupted by AWS with a 2-minute warning?",
      options: [
        "Reserved Instances",
        "On-Demand Instances",
        "Spot Instances",
        "Savings Plans",
      ],
      correctAnswer: 2,
      explanation:
        "Spot Instances offer up to 90% discount but AWS can reclaim them with a 2-minute interruption notice. Ideal for fault-tolerant workloads like ML training with checkpointing.",
      difficulty: "easy" as const,
    },
    {
      id: "ec2-3",
      question: "Security Groups are stateful. What does this mean?",
      options: [
        "Rules are saved to a database",
        "If you allow inbound traffic, the return outbound traffic is automatically allowed",
        "Security groups track the number of connections",
        "Rules persist across instance reboots",
      ],
      correctAnswer: 1,
      explanation:
        "Stateful means if an inbound rule allows traffic in, the response traffic is automatically allowed out — you don't need a separate outbound rule for it.",
      difficulty: "medium" as const,
    },
    {
      id: "ec2-4",
      question:
        "Your Python app on EC2 needs to download ML models from S3. What is the correct and secure way?",
      options: [
        "Hardcode AWS access keys in the Python code",
        "Store access keys as environment variables on the instance",
        "Attach an IAM Role with S3 permissions to the EC2 instance",
        "Make the S3 bucket public",
      ],
      correctAnswer: 2,
      explanation:
        "Attach an IAM Role to the EC2 instance. The AWS SDK (boto3) automatically retrieves temporary credentials from the instance metadata. Never hardcode or store access keys.",
      difficulty: "easy" as const,
    },
    {
      id: "ec2-5",
      question:
        "Which EBS volume type should you use as the default for most workloads?",
      options: ["gp2", "gp3", "io2", "st1"],
      correctAnswer: 1,
      explanation:
        "gp3 is the recommended default. It provides 3,000 IOPS baseline with the ability to scale IOPS independently of storage size, and is cheaper than gp2.",
      difficulty: "easy" as const,
    },
    {
      id: "ec2-6",
      question:
        "What is the key difference between Instance Store and EBS storage?",
      options: [
        "Instance Store is slower than EBS",
        "Instance Store data persists after instance termination",
        "Instance Store data is lost when the instance is stopped or terminated",
        "EBS cannot be encrypted",
      ],
      correctAnswer: 2,
      explanation:
        "Instance Store provides high-performance ephemeral storage physically attached to the host. Data is lost on stop/terminate. Use EBS for persistent data.",
      difficulty: "medium" as const,
    },
    {
      id: "ec2-7",
      question:
        "Which placement group strategy should you use for distributed ML training across multiple GPU instances?",
      options: [
        "Spread — for maximum fault tolerance",
        "Partition — for large distributed systems",
        "Cluster — for low latency, high throughput between instances",
        "No placement group needed",
      ],
      correctAnswer: 2,
      explanation:
        "Cluster placement group places instances on the same rack, providing low-latency and high-throughput networking — crucial for distributed ML training where GPUs need to communicate frequently.",
      difficulty: "medium" as const,
    },
    {
      id: "ec2-8",
      question: "What does EC2 User Data allow you to do?",
      options: [
        "Store user profile information",
        "Run bootstrap scripts automatically at first instance launch",
        "Configure IAM permissions for the instance",
        "Set up billing alerts",
      ],
      correctAnswer: 1,
      explanation:
        "User Data scripts run once at first boot as root. They are used to automate instance setup — installing packages, downloading code, starting services.",
      difficulty: "easy" as const,
    },
    {
      id: "ec2-9",
      question:
        "You need to run ML training that takes 12 hours. Which is the most cost-effective approach?",
      options: [
        "Use an On-Demand p3.2xlarge for the full run",
        "Use a Spot p3.2xlarge with frequent checkpointing to S3",
        "Use a Reserved p3.2xlarge with 1-year commitment",
        "Use a t3.medium with GPU sharing",
      ],
      correctAnswer: 1,
      explanation:
        "Spot Instances offer up to 90% savings. For ML training, checkpoint your model to S3 every epoch. If the instance is reclaimed, resume from the last checkpoint on a new Spot instance.",
      difficulty: "hard" as const,
    },
    {
      id: "ec2-10",
      question:
        "Why would you create a Custom AMI instead of using User Data scripts to set up an instance?",
      options: [
        "Custom AMIs are free while User Data costs money",
        "Custom AMIs boot faster since dependencies are pre-installed",
        "User Data scripts cannot install packages",
        "Custom AMIs work in all regions automatically",
      ],
      correctAnswer: 1,
      explanation:
        "Custom AMIs have all dependencies pre-baked, so instances launch faster. User Data scripts run at boot time and can take minutes to install packages. AMIs are region-specific — you need to copy them to other regions.",
      difficulty: "medium" as const,
    },
  ],
};
