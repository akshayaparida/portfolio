import { LearningModule } from "@/types/learning";

export const ec2DeepDiveModule: LearningModule = {
  id: "ec2-deep-dive",
  title: "Module 4: EC2 Deep Dive",
  description:
    "Master Amazon EC2: Instances, AMIs, Storage, Security Groups, and Pricing Models",
  status: "in-progress",
  detailedContent: `# EC2 Deep Dive

**Amazon Elastic Compute Cloud (Amazon EC2)** is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.

## What You'll Learn

| # | Topic |
|:--|:------|
| 1 | What is EC2? |
| 2 | Instance Types & Families |
| 3 | Amazon Machine Images (AMIs) |
| 4 | EC2 Storage (EBS vs Instance Store) |
| 5 | Security Groups & Key Pairs |
| 6 | Elastic IPs |
| 7 | Launching an Instance (Hands-on) |
| 8 | User Data & Metadata |
| 9 | Pricing Models |
| 10 | Best Practices |

---

## 1. What is EC2?

**EC2 (Elastic Compute Cloud)** provides virtual servers in the cloud. These virtual servers are called **Instances**.

### Key Features
- **Elastic**: Scale capacity up and down within minutes.
- **Control**: You have complete control over your instances (root access).
- **Flexible**: Choose from multiple OS types (Linux, Windows, macOS).
- **Integrated**: Works with S3, RDS, VPC, and other AWS services.
- **Reliable**: 99.99% availability SLA for each region.

### Use Cases
- Web hosting
- Application servers
- High-performance computing (HPC)
- Batch processing
- Gaming servers

---

## 2. Instance Types & Families

AWS offers different instance types optimized for different use cases. They are named using a standard convention:

\`\`\`
   m5.2xlarge
   │ │   │
   │ │   └── size (nano, micro, small, medium, large, xlarge, 2xlarge...)
   │ └────── generation (5th generation)
   └──────── family (m = general purpose)
\`\`\`

### Instance Families (Mnemonic: "FIGHT DR MC. PXZ")

| Family Category | Use Cases | Examples | Mnemonic |
|:----------------|:----------|:---------|:---------|
| **General Purpose** | Balanced compute, memory, and networking. Web servers, code repositories. | **t**2, **t**3, **m**5 | **M**ac, **T**wo |
| **Compute Optimized** | High performance processors. Batch processing, media transcoding, gaming, ML inference. | **c**5, **c**6g | **C**ompute |
| **Memory Optimized** | Fast performance for workloads that process large data sets in memory. Databases, caching (Redis/Memcached). | **r**5, **x**1, **z**1d | **R**AM |
| **Storage Optimized** | High IOPS for local storage. NoSQL DBs (Cassandra, MongoDB), Data warehousing. | **i**3, **d**2, **h**1 | **I**OPS, **D**isc |
| **Accelerated Computing** | Hardware accelerators (GPUs, FPGAs). Machine learning, graphics processing. | **p**3, **g**4, **f**1 | **G**raphics |

> 💡 **Tip**: Start with **General Purpose (t2.micro)** for learning, as it's Free Tier eligible.

---

## 3. Amazon Machine Images (AMIs)

An **AMI** is a template that contains the software configuration (OS, application server, applications) required to launch your instance.

### Types of AMIs
1. **AWS Provided**: Public AMIs (Amazon Linux 2, Ubuntu, Windows Server).
2. **AWS Marketplace**: AMIs sold by third parties (e.g., CIS hardened images, Wordpress stacks).
3. **Community AMIs**: Created by others, use at your own risk.
4. **My AMIs (Custom)**: You configure an instance, install software, and save it as your own AMI.

### Lifecycle
\`\`\`
Launch Instance → Install Software → Create Image (AMI) → Launch New Instances from AMI
\`\`\`

> ⚠ **Region Scope**: AMIs are **Region-specific**. To use an AMI in another region, you must **copy** it.

---

## 4. EC2 Storage Options

EC2 instances need storage for the OS and data. The two main types are **EBS** and **Instance Store**.

### A. Elastic Block Store (EBS)
- **Persistent** block storage volumes.
- Network drive (not physically attached to the server).
- **Independent lifecycle**: Data persists even if the instance terminates (if configured).
- Can be detached and attached to other instances in the **same Availability Zone**.

**EBS Volume Types:**
| Type | Name | Use Case |
|:-----|:-----|:---------|
| **General Purpose SSD** | gp2, gp3 | Boot volumes, dev/test, low-latency apps. (Most common) |
| **Provisioned IOPS SSD** | io1, io2 | Critical business apps needing sustained IOPS (Databases). |
| **Throughput Optimized HDD**| st1 | Big data, data warehouses, log processing. |
| **Cold HDD** | sc1 | Infrequently accessed data (file servers). |

### B. Instance Store (Ephemeral Storage)
- Physically attached to the host computer.
- **Temporary**: Data is **LOST** if the instance stops or terminates.
- Very high I/O performance (good for buffers, caches, scratch data).
- **Cannot** be resized or detached.

| Feature | EBS | Instance Store |
|:--------|:----|:---------------|
| **Persistence** | Durable (persists after stop) | Ephemeral (lost on stop) |
| **Speed** | Network speed | Very fast (local disk) |
| **Backups** | Snapshots | None built-in |
| **Portability** | Detach/Attach | Fixed to instance |

---

## 5. Security Groups & Key Pairs

### Security Groups (Virtual Firewall)
- Controls **inbound** and **outbound** traffic.
- **Stateful**: If you allow an inbound request, the outbound response is automatically allowed.
- By default:
  - **Inbound**: Deny all (you must add rules).
  - **Outbound**: Allow all.

**Common Rules:**
- **SSH (Port 22)**: For Linux admin access (restrict to Your IP).
- **RDP (Port 3389)**: For Windows admin access.
- **HTTP (Port 80)**: Web traffic.
- **HTTPS (Port 443)**: Secure web traffic.

### Key Pairs (Login Credentials)
- EC2 uses public-key cryptography to encrypt and decrypt login information.
- **Public Key**: Stored by AWS on the instance.
- **Private Key**: You store it (\`.pem\` file). **Do not lose this!**
- You need the private key to SSH into the instance.

\`\`\`bash
# SSH into EC2 instance
chmod 400 my-key.pem  # Set permissions (mandatory)
ssh -i my-key.pem ec2-user@<public-ip-address>
\`\`\`

---

## 6. Elastic IP (EIP)

- A **Static IPv4 address** designed for dynamic cloud computing.
- Helps mask instance failures by rapidly remaping the address to another instance.
- **Cost**:
  - **Free** if attached to a running instance.
  - **Charged** if unattached or attached to a stopped instance (AWS discourages hoarding IPs).

> 💡 **Best Practice**: Use a DNS name (Route 53) or Load Balancer instead of hardcoding IPs.

---

## 7. Launching an EC2 Instance (Step-by-Step)

1. **Choose AMI**: Select OS (e.g., Amazon Linux 2023).
2. **Choose Instance Type**: Select hardware (e.g., t2.micro).
3. **Configure Instance Details**: Network (VPC), Subnet, IAM Role, User Data.
4. **Add Storage**: Size and type of EBS volume.
5. **Add Tags**: Name your instance (e.g., \`Name: WebServer\`).
6. **Configure Security Group**: Open Port 22 (SSH) and 80 (HTTP).
7. **Review and Launch**: Select existing key pair or create new one.

---

## 8. User Data & Instance Metadata

### User Data
- Scripts run only **once** during the **first boot** of the instance.
- Used to automate common tasks: update OS, install software (Apache, Docker), download files.
- Passed as shell scripts (Linux) or PowerShell (Windows).

**Example User Data Script:**
\`\`\`bash
#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html
\`\`\`

### Instance Metadata
- Data *about* your instance (IP, ID, AMI ID, type, credentials).
- Accessible from **within** the instance via a special URL:
  \`http://169.254.169.254/latest/meta-data/\`

\`\`\`bash
# Get public IP from inside the instance
curl http://169.254.169.254/latest/meta-data/public-ipv4
\`\`\`

---

## 9. Pricing Models

AWS offers 5 ways to pay for EC2 instances:

| Model | Description | Best For | Discount |
|:------|:------------|:---------|:---------|
| **On-Demand** | Pay by the second/hour. No commitment. | Short-term, spiky workloads, dev/test. | None |
| **Reserved Instances (RI)** | Commit to 1 or 3 years. | Steady-state usage (database). | Up to 72% |
| **Savings Plans** | Commit to $ amount/hour for 1 or 3 years. Flexible across families. | Flexible workloads, Lambda/Fargate usage. | Up to 72% |
| **Spot Instances** | Bid on unused capacity. Can be interrupted with 2 min notice. | Stateless, fault-tolerant, batch jobs. | Up to 90% |
| **Dedicated Hosts/Instances** | Physical server dedicated to you. | Compliance (BYOL), sensitive workloads. | Low |

---

## 10. Summary & Best Practices

| Concept | Key Takeaway |
|:--------|:-------------|
| **Instance Type** | Choose right family (Compute, Memory, General). |
| **Security** | open ports only to needed IPs (0.0.0.0/0 is risky for SSH/RDP). |
| **Role** | Use IAM Roles instead of storing credentials on EC2. |
| **Termination** | Enable "Termination Protection" for critical instances. |
| **Storage** | Use EBS for persistent data, Instance Store for cache. |
| **Design** | Design for failure (Multi-AZ, Auto Scaling). |

---
`,
  practiceQuiz: [
    {
      id: "ec2-1",
      question:
        "Which EC2 pricing model offers the highest discount (up to 90%) but comes with the risk of interruption?",
      options: [
        "On-Demand",
        "Reserved Instances",
        "Spot Instances",
        "Savings Plans",
      ],
      correctAnswer: 2,
      explanation:
        "Spot Instances let you take advantage of unused EC2 capacity in the AWS cloud and offer up to a 90% discount compared to On-Demand prices. However, AWS can reclaim the instance with a 2-minute warning.",
      difficulty: "easy",
    },
    {
      id: "ec2-2",
      question:
        "You need a storage volume for your database that requires very high, low-latency I/O performance. Which EBS volume type should you choose?",
      options: [
        "General Purpose SSD (gp3)",
        "Cold HDD (sc1)",
        "Provisioned IOPS SSD (io2)",
        "Throughput Optimized HDD (st1)",
      ],
      correctAnswer: 2,
      explanation:
        "Provisioned IOPS SSD (io1/io2) volumes are designed for critical, I/O-intensive workloads like databases that require sustained low latency and high throughput.",
      difficulty: "medium",
    },
    {
      id: "ec2-3",
      question:
        "What happens to the data on an Instance Store volume when the EC2 instance is stopped?",
      options: [
        "The data is preserved until the instance is terminated.",
        "The data is automatically backed up to S3.",
        "The data is lost.",
        "The data is moved to an EBS volume.",
      ],
      correctAnswer: 2,
      explanation:
        "Instance Store (ephemeral storage) is physically attached to the host. If the instance is stopped or terminated, the data on the instance store is lost. Use EBS for persistent storage.",
      difficulty: "medium",
    },
    {
      id: "ec2-4",
      question:
        "Which component acts as a virtual firewall for your EC2 instance, controlling inbound and outbound traffic?",
      options: ["Network ACL", "Security Group", "Route Table", "VPC Peering"],
      correctAnswer: 1,
      explanation:
        "Security Groups act as a virtual firewall for your instance to control inbound and outbound traffic. They operate at the instance level.",
      difficulty: "easy",
    },
    {
      id: "ec2-5",
      question:
        "You want to retrieve the public IP address of your EC2 instance from inside the instance using a script. Which URL should you query?",
      options: [
        "http://169.254.169.254/latest/user-data/",
        "http://169.254.169.254/latest/meta-data/",
        "http://localhost/meta-data/",
        "http://aws.amazon.com/meta-data/",
      ],
      correctAnswer: 1,
      explanation:
        "Instance metadata is available at http://169.254.169.254/latest/meta-data/. User data is available at .../user-data/.",
      difficulty: "medium",
    },
    {
      id: "ec2-6",
      question: "Which statement about Security Groups is True?",
      options: [
        "They are stateless (you must define both inbound and outbound rules).",
        "They block all outbound traffic by default.",
        "They are stateful (return traffic is automatically allowed).",
        "They operate at the subnet level.",
      ],
      correctAnswer: 2,
      explanation:
        "Security Groups are stateful. If you add an inbound rule for port 80, the response traffic is automatically allowed out, regardless of outbound rules.",
      difficulty: "medium",
    },
    {
      id: "ec2-7",
      question:
        "Which instance family is best suited for high-performance machine learning and graphics rendering workloads?",
      options: [
        "M5 (General Purpose)",
        "R5 (Memory Optimized)",
        "C5 (Compute Optimized)",
        "P3 (Accelerated Computing)",
      ],
      correctAnswer: 3,
      explanation:
        "The Accelerated Computing family (P3, G4, Inf1) uses hardware accelerators like GPUs and FPGAs, making them ideal for machine learning and graphics intensity workloads.",
      difficulty: "easy",
    },
    {
      id: "ec2-8",
      question:
        "You have an application that requires a steady state of usage for 3 years. Which pricing model offers the best cost savings?",
      options: [
        "On-Demand",
        "Spot Instances",
        "Reserved Instances (Standard)",
        "Dedicated Hosts",
      ],
      correctAnswer: 2,
      explanation:
        "For steady-state workloads with a known commitment period (1 or 3 years), Reserved Instances or Savings Plans offer significant discounts (up to 72%) compared to On-Demand pricing.",
      difficulty: "easy",
    },
    {
      id: "ec2-9",
      question:
        "Can you attach an EBS volume in 'us-east-1a' to an EC2 instance in 'us-east-1b'?",
      options: [
        "Yes, EBS volumes are regional resources.",
        "No, EBS volumes are locked to a specific Availability Zone.",
        "Yes, but only if they are in the same VPC.",
        "Yes, if you use a transit gateway.",
      ],
      correctAnswer: 1,
      explanation:
        "EBS volumes are locked to a specific Availability Zone (AZ). To move data to another AZ, you must create a snapshot and restore it in the new AZ.",
      difficulty: "hard",
    },
    {
      id: "ec2-10",
      question: "What is the function of 'User Data' in EC2?",
      options: [
        "To store user credentials for login.",
        "To define the IAM role for the instance.",
        "To run bootstrap scripts/commands during the first boot.",
        "To backup user files to S3.",
      ],
      correctAnswer: 2,
      explanation:
        "User Data is used to pass shell scripts or cloud-init directives to the instance, which run only once during the initial boot process to bootstrap the instance (e.g., install software, updates).",
      difficulty: "medium",
    },
  ],
};
