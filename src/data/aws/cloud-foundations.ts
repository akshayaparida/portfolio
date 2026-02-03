import { LearningModule } from "@/types/learning";

export const cloudFoundationsModule: LearningModule = {
  id: "cloud-foundations",
  title: "Module 1: Cloud Foundations",
  description: "Understanding cloud computing concepts and AWS fundamentals",
  status: "in-progress",
  detailedContent: `# Cloud Foundations

Before diving into AWS services, you need to understand the fundamentals of cloud computing and why it matters.

## What You'll Learn

| # | Topic |
|:--|:------|
| 1 | What is Cloud Computing? |
| 2 | IaaS vs PaaS vs SaaS |
| 3 | Public vs Private vs Hybrid Cloud |
| 4 | Introduction to AWS |
| 5 | AWS Global Infrastructure |
| 6 | Shared Responsibility Model |
| 7 | Well Architected Framework |

---

## 1. What is Cloud Computing?

Cloud computing is the **on-demand delivery of IT resources** over the internet with **pay-as-you-go pricing**.

Instead of buying, owning, and maintaining physical data centers and servers, you can access technology services (computing power, storage, databases) from a cloud provider like AWS.

### Key Characteristics

| Characteristic | Description |
|:---------------|:------------|
| **On-demand self-service** | Provision resources without human interaction |
| **Broad network access** | Access from anywhere via internet |
| **Resource pooling** | Provider's resources shared among customers |
| **Rapid elasticity** | Scale up/down instantly based on demand |
| **Measured service** | Pay only for what you use |

### Benefits of Cloud

- **No upfront cost** — No need to buy expensive hardware
- **Pay-as-you-go** — Like electricity, pay for what you consume
- **Elastic capacity** — Scale to millions of users or down to zero
- **Speed & agility** — Deploy globally in minutes
- **No maintenance** — Provider handles hardware failures

---

## 2. IaaS vs PaaS vs SaaS

Cloud services are categorized into three models based on what the provider manages vs what you manage.

### Service Models Comparison

| Model | You Manage | Provider Manages | Examples |
|:------|:-----------|:-----------------|:---------|
| **IaaS** | OS, Runtime, Apps, Data | Hardware, Networking, Virtualization | EC2, VPC, EBS |
| **PaaS** | Apps, Data | Everything else | Elastic Beanstalk, Lambda, RDS |
| **SaaS** | Just use it | Everything | Gmail, Slack, Salesforce |

### Visual Stack

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    Applications                      │ ← You manage (IaaS)
├─────────────────────────────────────────────────────┤
│                       Data                           │ ← You manage (IaaS, PaaS)
├─────────────────────────────────────────────────────┤
│                      Runtime                         │ ← Provider manages (PaaS)
├─────────────────────────────────────────────────────┤
│                    Middleware                        │ ← Provider manages (PaaS)
├─────────────────────────────────────────────────────┤
│                   Operating System                   │ ← Provider manages (PaaS)
├─────────────────────────────────────────────────────┤
│                   Virtualization                     │ ← Provider manages (all)
├─────────────────────────────────────────────────────┤
│                      Servers                         │ ← Provider manages (all)
├─────────────────────────────────────────────────────┤
│                      Storage                         │ ← Provider manages (all)
├─────────────────────────────────────────────────────┤
│                     Networking                       │ ← Provider manages (all)
└─────────────────────────────────────────────────────┘
\`\`\`

### When to Use Each

- **IaaS**: Maximum control, migrating existing apps ("lift and shift")
- **PaaS**: Focus on code, not infrastructure (startups, new apps)
- **SaaS**: Just need the service working (email, CRM, collaboration)

---

## 3. Public vs Private vs Hybrid Cloud

### Deployment Models

| Model | Description | Pros | Cons |
|:------|:------------|:-----|:-----|
| **Public Cloud** | Resources owned by provider, shared across customers | Low cost, no maintenance, elastic | Less control, shared resources |
| **Private Cloud** | Dedicated infrastructure for one organization | Full control, security, compliance | High cost, limited scalability |
| **Hybrid Cloud** | Combination of public and private | Flexibility, gradual migration | Complexity, integration challenges |

### When to Use

- **Public Cloud**: Web apps, dev/test, variable workloads
- **Private Cloud**: Sensitive data, strict compliance (banks, healthcare)
- **Hybrid Cloud**: Gradual cloud migration, burst capacity, data sovereignty

---

## 4. Introduction to AWS

**Amazon Web Services (AWS)** is the world's most comprehensive and widely adopted cloud platform.

### AWS History

| Year | Milestone |
|:-----|:----------|
| 2002 | AWS founded (originally for Amazon.com internal use) |
| 2006 | S3 and EC2 launched publicly |
| 2010 | All of Amazon.com moved to AWS |
| 2024 | 200+ services, 99 Availability Zones |

### Why AWS?

- **Market leader** — Largest cloud provider (~32% market share)
- **Most services** — 200+ fully-featured services
- **Global reach** — Data centers in 32 regions worldwide
- **Mature ecosystem** — Documentation, training, community
- **Enterprise-ready** — Used by Netflix, Airbnb, NASA, etc.

### AWS vs Azure vs GCP

| Aspect | AWS | Azure | GCP |
|:-------|:----|:------|:----|
| **Best for** | Everything | Microsoft shops | Data/ML |
| **Market share** | ~32% | ~23% | ~10% |
| **Services** | 200+ | 200+ | 100+ |
| **Strengths** | Maturity, breadth | Enterprise, hybrid | ML, Kubernetes |

---

## 5. AWS Global Infrastructure

AWS infrastructure is designed for **high availability** and **low latency**.

### Key Concepts

| Concept | Description |
|:--------|:------------|
| **Region** | Geographic location with multiple data centers (e.g., ap-south-1 = Mumbai) |
| **Availability Zone (AZ)** | One or more discrete data centers within a region |
| **Edge Location** | CDN endpoints for CloudFront (caching content close to users) |
| **Local Zone** | Extends a region closer to end-users for ultra-low latency |

### Current Scale (2024)

- **32 Regions** globally
- **99+ Availability Zones**
- **400+ Edge Locations**

### How to Choose a Region

1. **Compliance** — Data residency requirements (e.g., data must stay in India)
2. **Latency** — Closest to your users
3. **Service availability** — Not all services available in all regions
4. **Cost** — Pricing varies by region

### High Availability Design

\`\`\`
                    Region: ap-south-1 (Mumbai)
    ┌──────────────────────────────────────────────────┐
    │                                                  │
    │   ┌─────────────┐       ┌─────────────┐         │
    │   │    AZ-1a    │       │    AZ-1b    │         │
    │   │             │       │             │         │
    │   │   [EC2]     │       │   [EC2]     │         │
    │   │   [RDS]     │  ←──→ │   [RDS]     │ Replica │
    │   └─────────────┘       └─────────────┘         │
    │                                                  │
    └──────────────────────────────────────────────────┘
    
    Best Practice: Deploy across multiple AZs for fault tolerance
\`\`\`

---

## 6. Shared Responsibility Model

AWS security is a **shared responsibility** between AWS and the customer.

### The Division

| Responsibility | AWS ("Security OF the Cloud") | You ("Security IN the Cloud") |
|:---------------|:------------------------------|:------------------------------|
| **Physical** | Data centers, hardware, networking | - |
| **Infrastructure** | Compute, storage, database, networking | - |
| **Platform** | Managed services (RDS, Lambda) | Configuration, access control |
| **Data** | - | Encryption, access policies |
| **Identity** | - | IAM users, roles, MFA |
| **Application** | - | Code, patching (EC2), firewall rules |

### Visual Model

\`\`\`
┌─────────────────────────────────────────────────────┐
│                 CUSTOMER RESPONSIBILITY              │
│  ┌───────────────────────────────────────────────┐  │
│  │ Customer Data                                  │  │
│  │ Platform, Applications, Identity & Access      │  │
│  │ Operating System, Network & Firewall Config   │  │
│  │ Client-side & Server-side Encryption          │  │
│  └───────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│                   AWS RESPONSIBILITY                 │
│  ┌───────────────────────────────────────────────┐  │
│  │ Software: Compute, Storage, Database, Network │  │
│  │ Hardware/AWS Global Infrastructure            │  │
│  │ Regions, Availability Zones, Edge Locations   │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
\`\`\`

### Key Takeaway

- **AWS**: Responsible for security OF the cloud (infrastructure)
- **You**: Responsible for security IN the cloud (your data, configurations)

---

## 7. Well-Architected Framework

AWS Well-Architected Framework helps you build secure, high-performing, resilient, and efficient infrastructure.

### The 6 Pillars

| Pillar | Focus | Key Questions |
|:-------|:------|:--------------|
| **Operational Excellence** | Run and monitor systems | How do you respond to events? |
| **Security** | Protect data and systems | How do you manage identities? |
| **Reliability** | Recover from failures | How do you handle changes? |
| **Performance Efficiency** | Use resources efficiently | How do you select your resources? |
| **Cost Optimization** | Avoid unnecessary costs | How do you decommission resources? |
| **Sustainability** | Minimize environmental impact | How do you reduce impact? |

### Best Practices Summary

**1. Operational Excellence**
- Perform operations as code (Infrastructure as Code)
- Make frequent, small, reversible changes
- Learn from all operational failures

**2. Security**
- Implement strong identity foundation (IAM, MFA)
- Enable traceability (CloudTrail, logs)
- Apply security at all layers
- Encrypt data at rest and in transit

**3. Reliability**
- Automatically recover from failure
- Test recovery procedures
- Scale horizontally (multiple small instances > one large)
- Manage change through automation

**4. Performance Efficiency**
- Use serverless where possible
- Go global in minutes (multi-region)
- Experiment often

**5. Cost Optimization**
- Adopt consumption model (pay for what you use)
- Stop guessing capacity (use auto-scaling)
- Analyze and attribute expenditure

**6. Sustainability**
- Understand your impact
- Maximize utilization
- Use managed services

---

## TL;DR - Quick Recall

| Topic | Key Takeaway |
|:------|:-------------|
| **Cloud Computing** | On-demand IT resources, pay-as-you-go, no hardware maintenance |
| **IaaS/PaaS/SaaS** | IaaS = most control, SaaS = least control, PaaS = balanced |
| **Cloud Types** | Public (shared), Private (dedicated), Hybrid (mix) |
| **AWS** | Market leader, 200+ services, global infrastructure |
| **Infrastructure** | Regions → AZs → Edge Locations (design for multi-AZ) |
| **Shared Responsibility** | AWS secures the cloud, you secure what's IN the cloud |
| **Well-Architected** | 6 pillars: Operations, Security, Reliability, Performance, Cost, Sustainability |
`,
  practiceQuiz: [
    {
      id: "cloud-1",
      question:
        "Which characteristic of cloud computing allows you to scale resources up or down based on demand?",
      options: [
        "On-demand self-service",
        "Broad network access",
        "Rapid elasticity",
        "Resource pooling",
      ],
      correctAnswer: 2,
      explanation:
        "Rapid elasticity allows cloud resources to be scaled up or down quickly based on demand, providing flexibility.",
      difficulty: "easy" as const,
    },
    {
      id: "cloud-2",
      question:
        "Which cloud service model requires you to manage the operating system?",
      options: ["SaaS", "PaaS", "IaaS", "All of them"],
      correctAnswer: 2,
      explanation:
        "With IaaS (Infrastructure as a Service), you manage the OS, runtime, and applications. The provider only manages virtualization, servers, storage, and networking.",
      difficulty: "easy" as const,
    },
    {
      id: "cloud-3",
      question:
        "A company needs to keep sensitive data on their own servers but wants to use cloud for variable workloads. What deployment model should they use?",
      options: [
        "Public Cloud",
        "Private Cloud",
        "Hybrid Cloud",
        "Community Cloud",
      ],
      correctAnswer: 2,
      explanation:
        "Hybrid Cloud combines private and public cloud, allowing sensitive data to stay on-premises while using public cloud for scalable workloads.",
      difficulty: "medium" as const,
    },
    {
      id: "cloud-4",
      question: "What is an AWS Availability Zone?",
      options: [
        "A geographic location like Mumbai or Virginia",
        "One or more discrete data centers within a region",
        "An endpoint for content delivery",
        "A service for managing DNS",
      ],
      correctAnswer: 1,
      explanation:
        "An Availability Zone (AZ) is one or more discrete data centers with redundant power, networking, and connectivity within an AWS Region.",
      difficulty: "easy" as const,
    },
    {
      id: "cloud-5",
      question:
        "According to the Shared Responsibility Model, who is responsible for patching the operating system on an EC2 instance?",
      options: [
        "AWS",
        "The customer",
        "Shared between AWS and customer",
        "Neither - it's automatic",
      ],
      correctAnswer: 1,
      explanation:
        "On EC2 instances, the customer is responsible for patching the guest OS and any applications. AWS only manages the underlying infrastructure.",
      difficulty: "medium" as const,
    },
    {
      id: "cloud-6",
      question:
        "Which pillar of the Well-Architected Framework focuses on avoiding unnecessary costs?",
      options: [
        "Operational Excellence",
        "Reliability",
        "Performance Efficiency",
        "Cost Optimization",
      ],
      correctAnswer: 3,
      explanation:
        "The Cost Optimization pillar focuses on avoiding unnecessary costs, understanding spending, and using the most cost-effective resources.",
      difficulty: "easy" as const,
    },
    {
      id: "cloud-7",
      question: "What should you consider FIRST when choosing an AWS Region?",
      options: [
        "Cost of services",
        "Available services",
        "Compliance requirements",
        "Latency to users",
      ],
      correctAnswer: 2,
      explanation:
        "Compliance requirements should be the first consideration. If data must legally stay within a country, that limits your region choices regardless of cost or latency.",
      difficulty: "medium" as const,
    },
    {
      id: "cloud-8",
      question: "AWS Lambda is an example of which service model?",
      options: ["IaaS", "PaaS", "SaaS", "None of these"],
      correctAnswer: 1,
      explanation:
        "Lambda is a PaaS (Platform as a Service) offering. You only manage your code; AWS manages the runtime, OS, servers, and infrastructure.",
      difficulty: "medium" as const,
    },
    {
      id: "cloud-9",
      question:
        "How many Availability Zones should you use for high availability?",
      options: [
        "1 - it's already redundant",
        "At least 2",
        "Exactly 3",
        "All AZs in the region",
      ],
      correctAnswer: 1,
      explanation:
        "For high availability, deploy across at least 2 Availability Zones. If one AZ fails, your application continues running in the other.",
      difficulty: "easy" as const,
    },
    {
      id: "cloud-10",
      question:
        "Which of these is AWS's responsibility in the Shared Responsibility Model?",
      options: [
        "Configuring security groups",
        "Encrypting customer data",
        "Physical security of data centers",
        "Managing IAM users",
      ],
      correctAnswer: 2,
      explanation:
        "Physical security of data centers is AWS's responsibility (Security OF the Cloud). Security groups, encryption, and IAM are customer responsibilities.",
      difficulty: "easy" as const,
    },
  ],
};
