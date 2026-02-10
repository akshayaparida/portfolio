import { LearningModule } from "@/types/learning";

export const applicationLayerModule: LearningModule = {
  id: "application-layer",
  title: "5. Application Layer",
  description: "HTTP, DNS, FTP, SMTP, and other application protocols",
  status: "in-progress",
  tags: ["Theory"],
  detailedContent: `# Application Layer

> **Layer 7** - User-facing services and protocols

---

## What You'll Learn

1. Understand HTTP and web communication
2. Learn how DNS resolves names
3. Know email protocols (SMTP, POP3, IMAP)
4. Master file transfer (FTP) and remote access

---

## 1. Application Layer Protocols

| Protocol | Port | Purpose |
|:---------|:-----|:--------|
| HTTP/HTTPS | 80/443 | Web browsing |
| DNS | 53 | Name resolution |
| FTP | 20/21 | File transfer |
| SMTP | 25 | Send email |
| POP3 | 110 | Receive email |
| IMAP | 143 | Receive email (sync) |
| SSH | 22 | Secure remote access |
| Telnet | 23 | Remote access (insecure) |
| DHCP | 67/68 | IP address assignment |

---

## 2. HTTP (HyperText Transfer Protocol)

### HTTP Request/Response

\`\`\`text
Request:
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html

Response:
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234

<html>...</html>
\`\`\`

### HTTP Methods

| Method | Purpose | Safe | Idempotent |
|:-------|:--------|:-----|:-----------|
| GET | Retrieve resource | Yes | Yes |
| POST | Submit data | No | No |
| PUT | Update/Create | No | Yes |
| DELETE | Remove resource | No | Yes |
| HEAD | Get headers only | Yes | Yes |

### HTTP Status Codes

\`\`\`text
1xx - Informational
2xx - Success (200 OK, 201 Created)
3xx - Redirection (301 Moved, 302 Found)
4xx - Client Error (400 Bad Request, 404 Not Found)
5xx - Server Error (500 Internal Error, 503 Unavailable)
\`\`\`

### HTTP vs HTTPS

| HTTP | HTTPS |
|:-----|:------|
| Port 80 | Port 443 |
| Unencrypted | TLS/SSL encrypted |
| Fast | Slightly slower |
| Insecure | Secure |

---

## 3. DNS (Domain Name System)

**Translates domain names to IP addresses**

\`\`\`text
www.google.com → 142.250.190.14
\`\`\`

### DNS Hierarchy

\`\`\`text
               Root DNS (.)
                    |
    ┌───────────────┼───────────────┐
    |               |               |
  .com            .org            .edu
    |               
  google.com      
    |
www.google.com
\`\`\`

### DNS Resolution Process

\`\`\`text
1. User types www.google.com
2. Check local DNS cache
3. Query Recursive DNS resolver
4. Resolver queries Root server → .com TLD → google.com authoritative
5. Get IP address
6. Cache the result
7. Return to browser
\`\`\`

### DNS Record Types

| Type | Purpose | Example |
|:-----|:--------|:--------|
| A | IPv4 address | example.com → 93.184.216.34 |
| AAAA | IPv6 address | example.com → 2606:2800:... |
| CNAME | Alias | www.example.com → example.com |
| MX | Mail server | example.com → mail.example.com |
| NS | Name server | example.com → ns1.example.com |
| TXT | Text record | verification, SPF |

---

## 4. Email Protocols

### SMTP (Simple Mail Transfer Protocol)

\`\`\`text
Used for SENDING email (Port 25)

Client                      Server
  |---- HELO client.com ---->|
  |<--- 250 OK --------------|
  |---- MAIL FROM:<a@x.com>->|
  |<--- 250 OK --------------|
  |---- RCPT TO:<b@y.com> -->|
  |<--- 250 OK --------------|
  |---- DATA --------------->|
  |<--- 354 Send mail -------|
  |---- Subject: Hi         -|
  |---- Hello!              -|
  |---- .                   -|
  |<--- 250 OK --------------|
  |---- QUIT --------------->|
\`\`\`

### POP3 vs IMAP

| POP3 | IMAP |
|:-----|:-----|
| Port 110 | Port 143 |
| Downloads and deletes | Keeps on server |
| Single device | Multiple devices sync |
| Offline access | Requires connection |

---

## 5. FTP (File Transfer Protocol)

### Two Connections

\`\`\`text
Control Connection: Port 21 (commands)
Data Connection: Port 20 (file transfer)

Active Mode:
- Server connects TO client for data
- Client may have firewall issues

Passive Mode:
- Client connects TO server for data
- Better for firewalls
\`\`\`

### Common FTP Commands

| Command | Purpose |
|:--------|:--------|
| USER | Username |
| PASS | Password |
| LIST | Directory listing |
| RETR | Download file |
| STOR | Upload file |
| QUIT | Close connection |

---

## 6. DHCP (Dynamic Host Configuration Protocol)

**Automatically assigns IP addresses**

\`\`\`text
DORA Process:
1. Discover: Client broadcasts "I need an IP"
2. Offer: Server offers an IP address
3. Request: Client requests offered IP
4. Acknowledge: Server confirms assignment

Client gets:
- IP address
- Subnet mask
- Default gateway
- DNS server
\`\`\`

---

## 7. Network Security Basics

### Firewalls

\`\`\`text
Types:
- Packet Filter: Check source/dest IP, port
- Stateful: Track connection state
- Application: Deep packet inspection

Rule Example:
ALLOW TCP from any to 192.168.1.100:80
DENY all from any to any
\`\`\`

### Common Attacks

| Attack | Description | Layer |
|:-------|:------------|:------|
| DoS/DDoS | Overwhelm with traffic | All |
| Man-in-Middle | Intercept communication | 2-7 |
| DNS Spoofing | Fake DNS responses | 7 |
| Phishing | Fake websites | 7 |

---

## Key Takeaways

| Protocol | Port | Key Point |
|:---------|:-----|:----------|
| HTTP/HTTPS | 80/443 | Web, GET/POST methods |
| DNS | 53 | Domain → IP resolution |
| SMTP | 25 | Send email |
| POP3/IMAP | 110/143 | Receive email |
| FTP | 20/21 | File transfer (2 connections) |
| DHCP | 67/68 | Auto IP assignment (DORA) |
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "al-q1",
      question: "DNS resolves:",
      options: ["IP to MAC", "Domain to IP", "Port to service", "MAC to IP"],
      correctAnswer: 1,
      explanation:
        "DNS converts domain names (like google.com) to IP addresses for routing.",
      difficulty: "easy",
    },
    {
      id: "al-q2",
      question: "HTTPS uses which port?",
      options: ["80", "8080", "443", "22"],
      correctAnswer: 2,
      explanation:
        "HTTPS = port 443 (encrypted). HTTP = port 80 (unencrypted).",
      difficulty: "easy",
    },
    {
      id: "al-q3",
      question: "Which protocol is used for sending emails?",
      options: ["POP3", "IMAP", "SMTP", "FTP"],
      correctAnswer: 2,
      explanation:
        "SMTP sends email. POP3/IMAP receive email. FTP transfers files.",
      difficulty: "easy",
    },
    {
      id: "al-q4",
      question: "HTTP status code 404 means:",
      options: ["OK", "Redirect", "Not Found", "Server Error"],
      correctAnswer: 2,
      explanation:
        "404 = Not Found. 200 = OK. 3xx = Redirect. 5xx = Server Error.",
      difficulty: "easy",
    },
    {
      id: "al-q5",
      question: "FTP uses how many connections?",
      options: ["1", "2", "3", "Variable"],
      correctAnswer: 1,
      explanation:
        "FTP uses 2: Control (port 21) for commands, Data (port 20) for file transfer.",
      difficulty: "medium",
    },
    {
      id: "al-q6",
      question: "DHCP DORA stands for:",
      options: [
        "Discover, Offer, Request, Acknowledge",
        "Download, Open, Read, Access",
        "Data, Output, Receive, Accept",
        "None of these",
      ],
      correctAnswer: 0,
      explanation:
        "DORA: Discover → Offer → Request → Acknowledge. Client gets IP automatically.",
      difficulty: "medium",
    },
    {
      id: "al-q7",
      question: "Which HTTP method is idempotent?",
      options: ["POST", "PUT", "Neither", "Both"],
      correctAnswer: 1,
      explanation:
        "PUT is idempotent (same result regardless of repetitions). POST is not.",
      difficulty: "medium",
    },
    {
      id: "al-q8",
      question: "A record in DNS maps:",
      options: ["Alias name", "Mail server", "IPv4 address", "IPv6 address"],
      correctAnswer: 2,
      explanation: "A record = IPv4. AAAA = IPv6. MX = Mail. CNAME = Alias.",
      difficulty: "medium",
    },
    {
      id: "al-q9",
      question: "IMAP advantage over POP3:",
      options: [
        "Faster download",
        "Multi-device sync",
        "Smaller storage",
        "Offline access",
      ],
      correctAnswer: 1,
      explanation:
        "IMAP syncs across devices (keeps mail on server). POP3 downloads and deletes.",
      difficulty: "easy",
    },
    {
      id: "al-q10",
      question: "Telnet is insecure because:",
      options: [
        "Slow connection",
        "Plain text transmission",
        "Wrong port",
        "No authentication",
      ],
      correctAnswer: 1,
      explanation:
        "Telnet sends everything (including passwords) in plain text. Use SSH instead.",
      difficulty: "easy",
    },
  ],
};
