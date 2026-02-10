import { LearningModule } from "@/types/learning";

export const dataLinkLayerModule: LearningModule = {
  id: "data-link-layer",
  title: "2. Data Link Layer",
  description: "Framing, error detection, MAC addressing, and access control",
  status: "in-progress",
  tags: ["Theory"],
  detailedContent: `# Data Link Layer

> **Layer 2** - Reliable node-to-node data transfer

---

## What You'll Learn

1. Understand framing and addressing
2. Learn error detection techniques
3. Master MAC addressing concepts
4. Know flow control and access methods

---

## 1. Data Link Layer Functions

| Function | Description |
|:---------|:------------|
| Framing | Divide data into manageable frames |
| Addressing | MAC (physical) addressing |
| Error Detection | CRC, checksum, parity |
| Flow Control | Prevent buffer overflow |
| Access Control | Manage shared medium access |

### Two Sublayers

\`\`\`text
┌─────────────────────────────────┐
│         LLC (Logical Link       │ ← Flow control, error detection
│            Control)             │ ← Interface to Network layer
├─────────────────────────────────┤
│        MAC (Media Access        │ ← Physical addressing
│            Control)             │ ← Channel access control
└─────────────────────────────────┘
\`\`\`

---

## 2. Framing

**Frame = Data Link PDU**

\`\`\`text
┌────────┬──────────────┬─────────────┬────────┬─────────┐
│ Header │ Source MAC   │ Dest MAC    │ Data   │ Trailer │
│ (Flag) │ (6 bytes)    │ (6 bytes)   │(Payload)│ (CRC)  │
└────────┴──────────────┴─────────────┴────────┴─────────┘
\`\`\`

### Framing Methods

| Method | Description |
|:-------|:------------|
| Character Count | First byte = frame length |
| Byte Stuffing | Special flag bytes mark start/end |
| Bit Stuffing | Flag pattern with stuffed bits |

**Bit Stuffing Example:**
\`\`\`text
Flag: 01111110

Data: 011111110 (problematic - looks like flag!)
After stuffing: 0111110110 (add 0 after five 1s)
Receiver removes extra 0s
\`\`\`

---

## 3. Error Detection

### Parity Bit

\`\`\`text
Even Parity: Total 1s should be even
Data: 1011001 (four 1s) → Parity bit = 0 → 10110010
Data: 1011011 (five 1s) → Parity bit = 1 → 10110111

Limitation: Only detects odd number of errors!
\`\`\`

### Checksum

\`\`\`python
# Add all data bytes, take complement
data = [0x1234, 0x5678, 0x9ABC]
total = sum(data)  # = 0x1E248
# Fold overflow and complement
checksum = ~total & 0xFFFF

# Receiver adds all including checksum
# Result should be 0xFFFF (all 1s)
\`\`\`

### CRC (Cyclic Redundancy Check)

Most powerful error detection method.

\`\`\`text
CRC Process:
1. Append n-1 zeros to data (where n = divisor bits)
2. Divide by generator polynomial using XOR
3. Remainder = CRC (append to data)
4. Receiver divides: remainder 0 = no error

Example:
Data: 1010, Generator: 1011 (CRC-3)
Append 3 zeros: 1010000
Divide by 1011 → Remainder = 011
Send: 1010011
\`\`\`

---

## 4. MAC Addressing

**MAC = Media Access Control** (Physical Address)

\`\`\`text
Format: XX:XX:XX:XX:XX:XX (48 bits / 6 bytes)
Example: 00:1A:2B:3C:4D:5E

First 3 bytes (OUI): Manufacturer ID
Last 3 bytes (NIC): Device ID

Special Addresses:
FF:FF:FF:FF:FF:FF = Broadcast (all devices)
\`\`\`

### MAC vs IP

| MAC Address | IP Address |
|:------------|:-----------|
| Physical (hardware) | Logical (software) |
| 48 bits (6 bytes) | 32 bits (IPv4) |
| Never changes | Can change |
| Local network use | Global routing |
| Layer 2 | Layer 3 |

---

## 5. Flow Control

### Stop-and-Wait

\`\`\`text
Sender              Receiver
  |---Frame 0--->|
  |<----ACK------|
  |---Frame 1--->|
  |<----ACK------|

Simple but slow (waits for each ACK)
\`\`\`

### Sliding Window

\`\`\`text
Window Size = 4
Sender can send frames 0,1,2,3 without waiting

Sender              Receiver
  |---Frame 0--->|
  |---Frame 1--->|
  |---Frame 2--->|
  |<----ACK 2----|
  |---Frame 3--->|
  |---Frame 4--->|

Efficient use of bandwidth!
\`\`\`

---

## 6. Multiple Access Protocols

### ALOHA

\`\`\`text
Pure ALOHA:
- Send whenever you have data
- Collision? Wait random time, resend
- Efficiency: 18.4%

Slotted ALOHA:
- Send only at slot boundaries
- Efficiency: 36.8% (double!)
\`\`\`

### CSMA/CD (Ethernet)

**Carrier Sense Multiple Access with Collision Detection**

\`\`\`text
1. Listen before sending (Carrier Sense)
2. If busy, wait
3. If idle, send
4. While sending, listen for collision (CD)
5. Collision? Send jam signal, wait random time
\`\`\`

### CSMA/CA (Wi-Fi)

**Collision Avoidance** (can't detect collision in wireless)

\`\`\`text
1. Listen before sending
2. Send RTS (Request to Send)
3. Receive CTS (Clear to Send)
4. Send data
5. Receive ACK
\`\`\`

---

## Key Takeaways

| Concept | Key Point |
|:--------|:----------|
| Frame | Data Link PDU with header and trailer |
| CRC | Most reliable error detection |
| MAC | 48-bit physical address |
| CSMA/CD | Ethernet collision handling |
| CSMA/CA | Wi-Fi collision avoidance |
| Sliding Window | Efficient flow control |
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "dl-q1",
      question: "CRC stands for:",
      options: [
        "Cyclic Redundancy Check",
        "Code Repeat Check",
        "Carrier Rate Control",
        "Circuit Routing Code",
      ],
      correctAnswer: 0,
      explanation:
        "CRC = Cyclic Redundancy Check. Most powerful error detection using polynomial division.",
      difficulty: "easy",
    },
    {
      id: "dl-q2",
      question: "MAC address is how many bits?",
      options: ["32 bits", "48 bits", "64 bits", "128 bits"],
      correctAnswer: 1,
      explanation:
        "MAC is 48 bits (6 bytes), written as XX:XX:XX:XX:XX:XX in hexadecimal.",
      difficulty: "easy",
    },
    {
      id: "dl-q3",
      question: "Which protocol is used in Ethernet for collision handling?",
      options: ["CSMA/CA", "CSMA/CD", "ALOHA", "Token Ring"],
      correctAnswer: 1,
      explanation:
        "CSMA/CD (Collision Detection) is used in wired Ethernet. CSMA/CA is for Wi-Fi.",
      difficulty: "easy",
    },
    {
      id: "dl-q4",
      question: "Parity bit can detect:",
      options: [
        "All errors",
        "Even number of bit errors",
        "Odd number of bit errors",
        "No errors",
      ],
      correctAnswer: 2,
      explanation:
        "Parity detects only odd number of bit errors. Even errors cancel out and go undetected.",
      difficulty: "medium",
    },
    {
      id: "dl-q5",
      question: "Bit stuffing inserts a 0 after how many consecutive 1s?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation:
        "Bit stuffing adds a 0 after five consecutive 1s to prevent flag pattern (01111110) in data.",
      difficulty: "medium",
    },
    {
      id: "dl-q6",
      question: "The efficiency of Pure ALOHA is approximately:",
      options: ["18%", "36%", "50%", "100%"],
      correctAnswer: 0,
      explanation:
        "Pure ALOHA: ~18.4%. Slotted ALOHA: ~36.8% (double efficiency with time slots).",
      difficulty: "medium",
    },
    {
      id: "dl-q7",
      question: "Broadcast MAC address is:",
      options: [
        "00:00:00:00:00:00",
        "FF:FF:FF:FF:FF:FF",
        "11:11:11:11:11:11",
        "Any random address",
      ],
      correctAnswer: 1,
      explanation:
        "Broadcast address FF:FF:FF:FF:FF:FF sends to all devices on the local network.",
      difficulty: "easy",
    },
    {
      id: "dl-q8",
      question: "Sliding window protocol improves:",
      options: [
        "Error detection",
        "Bandwidth utilization",
        "Physical speed",
        "MAC addressing",
      ],
      correctAnswer: 1,
      explanation:
        "Sliding window sends multiple frames before waiting for ACK, improving bandwidth utilization.",
      difficulty: "medium",
    },
    {
      id: "dl-q9",
      question: "LLC sublayer is responsible for:",
      options: [
        "Physical addressing",
        "Collision detection",
        "Flow control and error handling",
        "Bit transmission",
      ],
      correctAnswer: 2,
      explanation:
        "LLC (Logical Link Control) handles flow control and error handling. MAC handles addressing.",
      difficulty: "medium",
    },
    {
      id: "dl-q10",
      question: "CSMA/CA is used in:",
      options: ["Ethernet", "Wi-Fi", "Token Ring", "FDDI"],
      correctAnswer: 1,
      explanation:
        "CSMA/CA (Collision Avoidance) is used in Wi-Fi because wireless can't detect collisions.",
      difficulty: "easy",
    },
  ],
};
