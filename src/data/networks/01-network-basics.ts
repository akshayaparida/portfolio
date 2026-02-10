import { LearningModule } from "@/types/learning";

export const networkBasicsModule: LearningModule = {
  id: "network-basics",
  title: "1. Network Basics & Models",
  description: "OSI model, TCP/IP model, network topologies and fundamentals",
  status: "in-progress",
  tags: ["Theory"],
  detailedContent: `# Network Basics & Models

> **Foundation Module** - Learn how networks are structured and organized

---

## What You'll Learn

1. Understand network types and topologies
2. Master the OSI 7-layer model
3. Compare OSI with TCP/IP model
4. Know common protocols at each layer

---

## 1. Introduction to Networks

**What is a Computer Network?**
A network is a collection of interconnected devices (nodes) that can share resources and communicate.

### Network Types by Size

| Type | Full Form | Range | Example |
|:-----|:----------|:------|:--------|
| PAN | Personal Area Network | ~10m | Bluetooth devices |
| LAN | Local Area Network | Building | Office network |
| MAN | Metropolitan Area Network | City | Cable TV network |
| WAN | Wide Area Network | Countries | Internet |

### Network Topologies

\`\`\`text
Bus Topology:          Star Topology:
                              Hub
[PC1]--[PC2]--[PC3]      PC1   |   PC3
       |                    \\  |  /
      Bus                     Hub
                              |
                            PC2

Ring Topology:         Mesh Topology:
    [PC1]                  PC1----PC2
   /     \\                  | \\  / |
[PC4]    [PC2]              |  \\/  |
   \\     /                  | /\\  |
    [PC3]                  PC3----PC4
\`\`\`

---

## 2. OSI Model (7 Layers)

**Open Systems Interconnection** - Standard reference model for network communication.

\`\`\`text
Layer 7: Application    - User interface (HTTP, FTP, SMTP)
Layer 6: Presentation   - Data format, encryption (SSL, JPEG)
Layer 5: Session        - Session management (NetBIOS)
Layer 4: Transport      - End-to-end delivery (TCP, UDP)
Layer 3: Network        - Routing, IP addressing (IP, ICMP)
Layer 2: Data Link      - MAC addressing, framing (Ethernet)
Layer 1: Physical       - Bits on wire (Cables, Hubs)
\`\`\`

**Memory Trick:** "All People Seem To Need Data Processing"
(Application → Physical, top to bottom)

### OSI Layers Detailed

| Layer | Name | PDU | Devices | Function |
|:------|:-----|:----|:--------|:---------|
| 7 | Application | Data | - | User services (HTTP, FTP) |
| 6 | Presentation | Data | - | Encryption, compression |
| 5 | Session | Data | - | Session control |
| 4 | Transport | Segment | - | Reliable delivery (TCP/UDP) |
| 3 | Network | Packet | Router | Routing, logical addressing |
| 2 | Data Link | Frame | Switch, Bridge | MAC addressing, error detection |
| 1 | Physical | Bits | Hub, Cables | Physical transmission |

**PDU = Protocol Data Unit** (what data is called at each layer)

---

## 3. TCP/IP Model (4 Layers)

The practical model used by the Internet.

\`\`\`text
TCP/IP Model          OSI Model
                    
Application    ←→   Application, Presentation, Session
Transport      ←→   Transport
Internet       ←→   Network
Network Access ←→   Data Link, Physical
\`\`\`

### TCP/IP Layers

| Layer | Protocols | Function |
|:------|:----------|:---------|
| Application | HTTP, FTP, SMTP, DNS | User-facing services |
| Transport | TCP, UDP | End-to-end communication |
| Internet | IP, ICMP, ARP | Logical addressing, routing |
| Network Access | Ethernet, Wi-Fi | Physical transmission |

---

## 4. OSI vs TCP/IP Comparison

| Aspect | OSI Model | TCP/IP Model |
|:-------|:----------|:-------------|
| Layers | 7 | 4 |
| Developed by | ISO | DARPA |
| Nature | Theoretical reference | Practical implementation |
| Session Layer | Separate | Merged with Application |
| Usage | For learning | For Internet |

---

## 5. Common Protocols Summary

### Application Layer
- **HTTP/HTTPS**: Web browsing (port 80/443)
- **FTP**: File transfer (port 21)
- **SMTP**: Sending email (port 25)
- **POP3/IMAP**: Receiving email (port 110/143)
- **DNS**: Domain name resolution (port 53)
- **Telnet/SSH**: Remote access (port 23/22)

### Transport Layer
- **TCP**: Reliable, connection-oriented
- **UDP**: Fast, connectionless

### Network Layer
- **IP**: Logical addressing
- **ICMP**: Error reporting (ping)
- **ARP**: IP to MAC resolution

---

## Key Takeaways

| Model | Layers | Use Case |
|:------|:-------|:---------|
| OSI | 7 | Learning, troubleshooting |
| TCP/IP | 4 | Internet, practical use |

**Remember:**
- Data flows DOWN at sender, UP at receiver
- Each layer adds its header (encapsulation)
- Router works at Layer 3, Switch at Layer 2
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "net-q1",
      question: "How many layers does the OSI model have?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 3,
      explanation:
        "OSI has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
      difficulty: "easy",
    },
    {
      id: "net-q2",
      question: "Which layer of OSI model is responsible for routing?",
      options: ["Data Link", "Network", "Transport", "Session"],
      correctAnswer: 1,
      explanation:
        "Network Layer (Layer 3) handles routing and logical addressing (IP). Routers operate at this layer.",
      difficulty: "easy",
    },
    {
      id: "net-q3",
      question: "TCP/IP model has how many layers?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 0,
      explanation:
        "TCP/IP has 4 layers: Network Access, Internet, Transport, Application.",
      difficulty: "easy",
    },
    {
      id: "net-q4",
      question: "Which device operates at the Data Link layer?",
      options: ["Router", "Hub", "Switch", "Repeater"],
      correctAnswer: 2,
      explanation:
        "Switch operates at Data Link (Layer 2) using MAC addresses. Router is Layer 3, Hub is Layer 1.",
      difficulty: "easy",
    },
    {
      id: "net-q5",
      question: "Which protocol is used for email sending?",
      options: ["HTTP", "FTP", "SMTP", "DNS"],
      correctAnswer: 2,
      explanation:
        "SMTP (Simple Mail Transfer Protocol) sends emails. POP3/IMAP receive emails.",
      difficulty: "easy",
    },
    {
      id: "net-q6",
      question: "ARP resolves:",
      options: [
        "IP to domain name",
        "Domain to IP",
        "IP to MAC address",
        "MAC to port number",
      ],
      correctAnswer: 2,
      explanation:
        "ARP (Address Resolution Protocol) converts IP address to MAC address for local delivery.",
      difficulty: "medium",
    },
    {
      id: "net-q7",
      question: "Which layer handles encryption in OSI?",
      options: ["Application", "Presentation", "Session", "Transport"],
      correctAnswer: 1,
      explanation:
        "Presentation Layer handles encryption, compression, and data format translation.",
      difficulty: "medium",
    },
    {
      id: "net-q8",
      question: "PDU at Transport layer is called:",
      options: ["Bit", "Frame", "Packet", "Segment"],
      correctAnswer: 3,
      explanation:
        "PDU names: Physical=Bit, Data Link=Frame, Network=Packet, Transport=Segment.",
      difficulty: "medium",
    },
    {
      id: "net-q9",
      question: "Which topology uses a central hub?",
      options: ["Bus", "Ring", "Star", "Mesh"],
      correctAnswer: 2,
      explanation:
        "Star topology connects all nodes to a central hub/switch. Easy to manage but hub is single point of failure.",
      difficulty: "easy",
    },
    {
      id: "net-q10",
      question: "ICMP is used for:",
      options: [
        "File transfer",
        "Email",
        "Error reporting and ping",
        "Web browsing",
      ],
      correctAnswer: 2,
      explanation:
        "ICMP (Internet Control Message Protocol) handles error messages and diagnostics like ping.",
      difficulty: "easy",
    },
  ],
};
