import { LearningModule } from "@/types/learning";

export const transportLayerModule: LearningModule = {
  id: "transport-layer",
  title: "4. Transport Layer",
  description: "TCP, UDP, flow control, congestion control, and ports",
  status: "in-progress",
  tags: ["Theory"],
  detailedContent: `# Transport Layer

> **Layer 4** - End-to-end reliable data transfer

---

## What You'll Learn

1. Understand TCP vs UDP differences
2. Learn TCP connection management
3. Master flow and congestion control
4. Know common port numbers

---

## 1. Transport Layer Functions

| Function | Description |
|:---------|:------------|
| Segmentation | Break data into segments |
| Multiplexing | Multiple apps share network |
| Port Addressing | Identify applications |
| Flow Control | Prevent receiver overflow |
| Error Control | Reliable delivery (TCP) |

---

## 2. TCP vs UDP

### Comparison

| Feature | TCP | UDP |
|:--------|:----|:----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Reliable (ACKs, retransmit) | Unreliable |
| Ordering | Guaranteed order | No ordering |
| Speed | Slower (overhead) | Faster |
| Header | 20-60 bytes | 8 bytes |
| Use Case | Web, Email, File transfer | Streaming, DNS, Gaming |

### When to Use

\`\`\`text
TCP: When data integrity matters
- Web browsing (HTTP)
- Email (SMTP)
- File transfer (FTP)
- Database transactions

UDP: When speed matters
- Video streaming
- Online gaming
- DNS queries
- VoIP calls
\`\`\`

---

## 3. TCP Header

\`\`\`text
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────────────────────────────┬───────────────────────────────┐
│         Source Port           │       Destination Port        │
├───────────────────────────────┴───────────────────────────────┤
│                      Sequence Number                          │
├───────────────────────────────────────────────────────────────┤
│                   Acknowledgment Number                       │
├───────┬───────┬─┬─┬─┬─┬─┬─┬───────────────────────────────────┤
│ Offset│Reserved│U│A│P│R│S│F│           Window Size            │
├───────┴───────┴─┴─┴─┴─┴─┴─┴───────────────────────────────────┤
│           Checksum            │        Urgent Pointer         │
└───────────────────────────────┴───────────────────────────────┘

Flags: URG, ACK, PSH, RST, SYN, FIN
\`\`\`

### TCP Flags

| Flag | Name | Purpose |
|:-----|:-----|:--------|
| SYN | Synchronize | Connection establishment |
| ACK | Acknowledge | Acknowledge received data |
| FIN | Finish | Connection termination |
| RST | Reset | Abort connection |
| PSH | Push | Send immediately |
| URG | Urgent | Priority data |

---

## 4. TCP Connection Management

### Three-Way Handshake (Connection Establishment)

\`\`\`text
Client                     Server
   |                          |
   |------- SYN -------->     |  (seq=x)
   |                          |
   |<---- SYN + ACK ----      |  (seq=y, ack=x+1)
   |                          |
   |------- ACK -------->     |  (ack=y+1)
   |                          |
   |   CONNECTION OPEN        |
\`\`\`

### Four-Way Handshake (Connection Termination)

\`\`\`text
Client                     Server
   |                          |
   |------- FIN -------->     |  Client wants to close
   |                          |
   |<------ ACK -------       |  Server acknowledges
   |                          |
   |<------ FIN -------       |  Server ready to close
   |                          |
   |------- ACK -------->     |  Client acknowledges
   |                          |
   |   CONNECTION CLOSED      |
\`\`\`

---

## 5. Flow Control

**Prevent sender from overwhelming receiver**

### Sliding Window

\`\`\`text
Sender Window = min(Receiver Window, Congestion Window)

Receiver advertises its buffer space in Window Size field
Sender adjusts sending rate accordingly

Example:
Receiver says: "Window = 4000 bytes"
Sender can send 4000 bytes before waiting for ACK
\`\`\`

---

## 6. Congestion Control

**Prevent sender from overwhelming network**

### TCP Congestion Algorithms

\`\`\`text
1. Slow Start
   - Start with cwnd = 1 MSS
   - Double cwnd each RTT (exponential)
   - Until threshold (ssthresh)

2. Congestion Avoidance
   - After threshold, increase cwnd by 1/RTT (linear)
   - Gentle growth to probe capacity

3. Fast Retransmit
   - 3 duplicate ACKs = packet loss
   - Retransmit without waiting for timeout

4. Fast Recovery
   - After fast retransmit
   - cwnd = ssthresh + 3 MSS
   - Avoid slow start
\`\`\`

### Congestion Window Growth

\`\`\`text
cwnd                     
  |                   ***
  |              ****   |  congestion avoidance
  |         ****        |  (linear)
  |    ****-------------|---- ssthresh
  |  **                 |
  | *                   |
  |*  slow start        |
  |   (exponential)     |
  +---------------------+---> Time
\`\`\`

---

## 7. Port Numbers

### Well-Known Ports (0-1023)

| Port | Protocol | Service |
|:-----|:---------|:--------|
| 20 | TCP | FTP Data |
| 21 | TCP | FTP Control |
| 22 | TCP | SSH |
| 23 | TCP | Telnet |
| 25 | TCP | SMTP |
| 53 | TCP/UDP | DNS |
| 80 | TCP | HTTP |
| 110 | TCP | POP3 |
| 143 | TCP | IMAP |
| 443 | TCP | HTTPS |

### Port Ranges

\`\`\`text
0-1023:     Well-known (system)
1024-49151: Registered (applications)
49152-65535: Dynamic/Private (ephemeral)
\`\`\`

---

## 8. UDP Header

\`\`\`text
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌───────────────────────────────┬───────────────────────────────┐
│         Source Port           │       Destination Port        │
├───────────────────────────────┼───────────────────────────────┤
│            Length             │           Checksum            │
└───────────────────────────────┴───────────────────────────────┘

Only 8 bytes! (vs TCP's 20+ bytes)
\`\`\`

---

## Key Takeaways

| Concept | Key Point |
|:--------|:----------|
| TCP | Reliable, connection-oriented, slower |
| UDP | Fast, connectionless, unreliable |
| 3-way handshake | SYN → SYN-ACK → ACK |
| 4-way handshake | FIN → ACK → FIN → ACK |
| Flow Control | Receiver's window size |
| Congestion Control | Slow start → congestion avoidance |
| HTTP Port | 80 (HTTP), 443 (HTTPS) |
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "tl-q1",
      question: "TCP is:",
      options: ["Connectionless", "Connection-oriented", "Both", "Neither"],
      correctAnswer: 1,
      explanation:
        "TCP is connection-oriented (3-way handshake before data transfer). UDP is connectionless.",
      difficulty: "easy",
    },
    {
      id: "tl-q2",
      question: "UDP header size is:",
      options: ["4 bytes", "8 bytes", "20 bytes", "Variable"],
      correctAnswer: 1,
      explanation:
        "UDP header is 8 bytes (source port, dest port, length, checksum). TCP is 20+ bytes.",
      difficulty: "easy",
    },
    {
      id: "tl-q3",
      question: "TCP three-way handshake uses which flags?",
      options: [
        "FIN, ACK, RST",
        "SYN, ACK",
        "SYN, SYN-ACK, ACK",
        "PSH, ACK, FIN",
      ],
      correctAnswer: 2,
      explanation:
        "Three-way handshake: SYN → SYN+ACK → ACK. Establishes connection and sync sequence numbers.",
      difficulty: "easy",
    },
    {
      id: "tl-q4",
      question: "HTTP default port is:",
      options: ["21", "25", "80", "443"],
      correctAnswer: 2,
      explanation: "HTTP = port 80. HTTPS = port 443. FTP = 21. SMTP = 25.",
      difficulty: "easy",
    },
    {
      id: "tl-q5",
      question: "Slow start in TCP refers to:",
      options: [
        "Starting with small congestion window",
        "Delayed connection",
        "Slow data transmission",
        "Reduced window size",
      ],
      correctAnswer: 0,
      explanation:
        "Slow start begins with cwnd=1 MSS, doubles each RTT exponentially until threshold.",
      difficulty: "medium",
    },
    {
      id: "tl-q6",
      question: "Which protocol is used for video streaming?",
      options: ["TCP", "UDP", "ICMP", "ARP"],
      correctAnswer: 1,
      explanation:
        "UDP for streaming - speed matters more than reliability. Lost frames are acceptable.",
      difficulty: "easy",
    },
    {
      id: "tl-q7",
      question: "TCP connection is closed using:",
      options: [
        "Two-way handshake",
        "Three-way handshake",
        "Four-way handshake",
        "Single FIN",
      ],
      correctAnswer: 2,
      explanation:
        "Four-way: FIN → ACK → FIN → ACK. Both sides independently close their direction.",
      difficulty: "medium",
    },
    {
      id: "tl-q8",
      question: "Fast retransmit is triggered by:",
      options: [
        "Timeout",
        "1 duplicate ACK",
        "3 duplicate ACKs",
        "Window size 0",
      ],
      correctAnswer: 2,
      explanation:
        "3 duplicate ACKs indicate packet loss. Retransmit immediately without timeout wait.",
      difficulty: "medium",
    },
    {
      id: "tl-q9",
      question: "Well-known ports range is:",
      options: ["0-255", "0-1023", "1024-49151", "49152-65535"],
      correctAnswer: 1,
      explanation:
        "0-1023 = well-known. 1024-49151 = registered. 49152-65535 = dynamic/ephemeral.",
      difficulty: "medium",
    },
    {
      id: "tl-q10",
      question: "Window size field in TCP is for:",
      options: [
        "Error detection",
        "Flow control",
        "Congestion control",
        "Routing",
      ],
      correctAnswer: 1,
      explanation:
        "Window size advertises receiver buffer space for flow control. Prevents overflow.",
      difficulty: "easy",
    },
  ],
};
