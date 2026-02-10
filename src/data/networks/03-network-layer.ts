import { LearningModule } from "@/types/learning";

export const networkLayerModule: LearningModule = {
  id: "network-layer",
  title: "3. Network Layer",
  description: "IP addressing, subnetting, routing algorithms, and protocols",
  status: "in-progress",
  tags: ["Theory"],
  detailedContent: `# Network Layer

> **Layer 3** - Logical addressing and routing across networks

---

## What You'll Learn

1. Understand IP addressing (IPv4)
2. Master subnetting and CIDR
3. Learn routing algorithms
4. Know network layer protocols

---

## 1. Network Layer Functions

| Function | Description |
|:---------|:------------|
| Logical Addressing | IP addresses for global identification |
| Routing | Find best path from source to destination |
| Forwarding | Move packets to appropriate interface |
| Fragmentation | Break large packets for smaller MTU |

---

## 2. IPv4 Addressing

### IP Address Format

\`\`\`text
32 bits = 4 octets (bytes)
Format: X.X.X.X (each X = 0-255)
Example: 192.168.1.100
Binary: 11000000.10101000.00000001.01100100
\`\`\`

### IP Address Classes

| Class | Range | Default Mask | Networks | Hosts/Net |
|:------|:------|:-------------|:---------|:----------|
| A | 1.0.0.0 - 126.255.255.255 | 255.0.0.0 (/8) | 126 | 16M |
| B | 128.0.0.0 - 191.255.255.255 | 255.255.0.0 (/16) | 16K | 65K |
| C | 192.0.0.0 - 223.255.255.255 | 255.255.255.0 (/24) | 2M | 254 |
| D | 224.0.0.0 - 239.255.255.255 | - | Multicast | - |
| E | 240.0.0.0 - 255.255.255.255 | - | Reserved | - |

### Special IP Addresses

\`\`\`text
127.0.0.1      → Loopback (localhost)
0.0.0.0        → Default/Any
255.255.255.255 → Broadcast
10.x.x.x       → Private (Class A)
172.16.x.x - 172.31.x.x → Private (Class B)
192.168.x.x    → Private (Class C)
\`\`\`

---

## 3. Subnetting

**Dividing a network into smaller sub-networks**

### Subnet Mask

\`\`\`text
Subnet Mask: Identifies network vs host portion
255.255.255.0 = 11111111.11111111.11111111.00000000
               |----Network bits----|--Host bits--|

CIDR Notation: /24 means 24 network bits
192.168.1.0/24 = Network with 256 addresses (254 usable)
\`\`\`

### Subnetting Example

\`\`\`text
Given: 192.168.1.0/24, need 4 subnets

Step 1: Need 2 bits for 4 subnets (2² = 4)
Step 2: New mask = /26 (24 + 2)

Subnets:
192.168.1.0/26   → 192.168.1.0 - 192.168.1.63
192.168.1.64/26  → 192.168.1.64 - 192.168.1.127
192.168.1.128/26 → 192.168.1.128 - 192.168.1.191
192.168.1.192/26 → 192.168.1.192 - 192.168.1.255

Each subnet: 64 addresses (62 usable)
\`\`\`

### Quick Formulas

\`\`\`text
Number of subnets = 2^(borrowed bits)
Hosts per subnet = 2^(host bits) - 2
Network address = First address (all host bits = 0)
Broadcast = Last address (all host bits = 1)
\`\`\`

---

## 4. Routing

### Routing Table

\`\`\`text
Destination      Gateway         Interface
192.168.1.0/24   0.0.0.0        eth0 (direct)
10.0.0.0/8       192.168.1.1    eth0 (via gateway)
0.0.0.0/0        192.168.1.1    eth0 (default route)
\`\`\`

### Routing Algorithms

| Algorithm | Type | Description |
|:----------|:-----|:------------|
| RIP | Distance Vector | Hop count metric, max 15 hops |
| OSPF | Link State | Dijkstra's algorithm, fast convergence |
| BGP | Path Vector | Inter-AS routing, Internet backbone |

### Distance Vector vs Link State

| Distance Vector (RIP) | Link State (OSPF) |
|:---------------------|:------------------|
| Share with neighbors | Share with all routers |
| Simple, slow convergence | Complex, fast convergence |
| Count-to-infinity problem | No such problem |
| Uses hop count | Uses bandwidth/cost |

---

## 5. Network Layer Protocols

### IP (Internet Protocol)

\`\`\`text
IPv4 Header (20-60 bytes):
┌────────┬────────┬────────────────┬───────────────┐
│Version │IHL     │TOS             │Total Length   │
├────────┴────────┼────────────────┼───────────────┤
│Identification   │Flags│Fragment Offset          │
├────────┬────────┼────────────────┴───────────────┤
│TTL     │Protocol│Header Checksum                │
├────────┴────────┴────────────────────────────────┤
│             Source IP Address                    │
├──────────────────────────────────────────────────┤
│           Destination IP Address                 │
└──────────────────────────────────────────────────┘
\`\`\`

### ICMP (Internet Control Message Protocol)

\`\`\`text
Error and diagnostic messages:
- Echo Request/Reply (ping)
- Destination Unreachable
- Time Exceeded (TTL = 0)
- Redirect

Used by: ping, traceroute
\`\`\`

### ARP (Address Resolution Protocol)

\`\`\`text
IP → MAC address resolution

1. Host sends ARP broadcast: "Who has 192.168.1.1?"
2. Owner replies: "192.168.1.1 is at AA:BB:CC:DD:EE:FF"
3. Sender caches MAC in ARP table
\`\`\`

---

## 6. IPv6 Basics

\`\`\`text
IPv4: 32 bits → 4.3 billion addresses
IPv6: 128 bits → 340 undecillion addresses

Format: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
Shortened: 2001:db8:85a3::8a2e:370:7334 (:: = consecutive zeros)
\`\`\`

---

## Key Takeaways

| Concept | Key Point |
|:--------|:----------|
| IPv4 | 32-bit, dotted decimal |
| Classes | A (large), B (medium), C (small) |
| Subnetting | Borrow host bits for more networks |
| CIDR | /n notation for flexible subnets |
| RIP | Distance vector, hop count |
| OSPF | Link state, fastest convergence |
| ARP | IP to MAC resolution |
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "nl-q1",
      question: "IPv4 address is how many bits?",
      options: ["8 bits", "16 bits", "32 bits", "128 bits"],
      correctAnswer: 2,
      explanation:
        "IPv4 = 32 bits (4 bytes). IPv6 = 128 bits. Written as X.X.X.X (dotted decimal).",
      difficulty: "easy",
    },
    {
      id: "nl-q2",
      question: "Which class of IP address is used for multicasting?",
      options: ["Class A", "Class B", "Class C", "Class D"],
      correctAnswer: 3,
      explanation:
        "Class D (224.0.0.0 - 239.255.255.255) is reserved for multicast groups.",
      difficulty: "easy",
    },
    {
      id: "nl-q3",
      question: "The subnet mask 255.255.255.0 can be written as:",
      options: ["/8", "/16", "/24", "/32"],
      correctAnswer: 2,
      explanation:
        "/24 means 24 network bits (three full octets). 255.255.255.0 = 24 ones in binary.",
      difficulty: "easy",
    },
    {
      id: "nl-q4",
      question: "Which protocol resolves IP address to MAC address?",
      options: ["RARP", "ARP", "ICMP", "DNS"],
      correctAnswer: 1,
      explanation:
        "ARP (Address Resolution Protocol) maps IP to MAC. RARP does reverse (MAC to IP).",
      difficulty: "easy",
    },
    {
      id: "nl-q5",
      question: "RIP uses which metric for routing?",
      options: ["Bandwidth", "Delay", "Hop count", "Cost"],
      correctAnswer: 2,
      explanation:
        "RIP uses hop count (max 15). OSPF uses cost based on bandwidth.",
      difficulty: "medium",
    },
    {
      id: "nl-q6",
      question: "127.0.0.1 is:",
      options: [
        "Broadcast address",
        "Default gateway",
        "Loopback address",
        "Private IP",
      ],
      correctAnswer: 2,
      explanation:
        "127.0.0.1 is loopback (localhost). Used for testing network stack on local machine.",
      difficulty: "easy",
    },
    {
      id: "nl-q7",
      question: "How many usable hosts in a /26 subnet?",
      options: ["62", "64", "126", "254"],
      correctAnswer: 0,
      explanation:
        "/26 = 6 host bits. 2^6 = 64 addresses - 2 (network + broadcast) = 62 usable.",
      difficulty: "medium",
    },
    {
      id: "nl-q8",
      question: "OSPF is a:",
      options: [
        "Distance vector protocol",
        "Link state protocol",
        "Path vector protocol",
        "Hybrid protocol",
      ],
      correctAnswer: 1,
      explanation:
        "OSPF is link state. Each router knows full topology. Uses Dijkstra for shortest path.",
      difficulty: "medium",
    },
    {
      id: "nl-q9",
      question: "TTL field in IP header prevents:",
      options: [
        "Data corruption",
        "Infinite loops",
        "Unauthorized access",
        "Fragmentation",
      ],
      correctAnswer: 1,
      explanation:
        "TTL (Time To Live) decrements at each hop. When 0, packet is dropped. Prevents infinite loops.",
      difficulty: "medium",
    },
    {
      id: "nl-q10",
      question: "Which IP range is private Class C?",
      options: [
        "10.0.0.0 - 10.255.255.255",
        "172.16.0.0 - 172.31.255.255",
        "192.168.0.0 - 192.168.255.255",
        "169.254.0.0 - 169.254.255.255",
      ],
      correctAnswer: 2,
      explanation:
        "Private IPs: 10.x.x.x (A), 172.16-31.x.x (B), 192.168.x.x (C). 169.254.x.x is link-local.",
      difficulty: "medium",
    },
  ],
};
