import { LearningModule } from "@/types/learning";

export const processManagementModule: LearningModule = {
  id: "process-management",
  title: "1. Process Management",
  description: "Process states, PCB, CPU scheduling algorithms",
  status: "in-progress",
  tags: ["Theory"],
  detailedContent: `# Process Management

> **Core OS Concept** - How the OS manages running programs

---

## What You'll Learn

1. Understand process states and transitions
2. Learn CPU scheduling algorithms
3. Calculate waiting time and turnaround time
4. Compare scheduling algorithms

---

## 1. Process Basics

### What is a Process?
A **process** is a program in execution. It includes:
- Program code (text section)
- Current activity (program counter, registers)
- Stack (temporary data)
- Data section (global variables)
- Heap (dynamically allocated memory)

### Process vs Program

| Program | Process |
|:--------|:--------|
| Passive entity (file on disk) | Active entity (running) |
| Static | Dynamic |
| One program | Many processes of same program |

---

## 2. Process States

\`\`\`text
                    ┌─────────────────┐
    ┌──────────────►│      Ready      │◄──────┐
    │               └────────┬────────┘       │
    │                        │                │
    │              (Scheduler│Dispatch)       │
    │                        ▼                │
┌───┴────┐           ┌───────────────┐   ┌────┴─────┐
│  New   │           │   Running     │   │ Waiting  │
└────────┘           └───────┬───────┘   └──────────┘
                             │                ▲
              (I/O or event) │                │
                             └────────────────┘
                                    │
                                    ▼
                            ┌───────────────┐
                            │  Terminated   │
                            └───────────────┘
\`\`\`

### Process States

| State | Description |
|:------|:------------|
| **New** | Process is being created |
| **Ready** | Waiting to be assigned to CPU |
| **Running** | Instructions being executed |
| **Waiting** | Waiting for I/O or event |
| **Terminated** | Process finished execution |

---

## 3. Process Control Block (PCB)

Each process has a PCB containing:

\`\`\`text
┌─────────────────────────────┐
│   Process Control Block     │
├─────────────────────────────┤
│ Process ID (PID)            │
│ Process State               │
│ Program Counter             │
│ CPU Registers               │
│ CPU Scheduling Info         │
│ Memory Management Info      │
│ I/O Status Info             │
│ Accounting Info             │
└─────────────────────────────┘
\`\`\`

---

## 4. CPU Scheduling Algorithms

### Key Terms

| Term | Formula | Description |
|:-----|:--------|:------------|
| Arrival Time (AT) | Given | When process enters ready queue |
| Burst Time (BT) | Given | CPU time needed |
| Completion Time (CT) | Calculated | When process finishes |
| Turnaround Time (TAT) | CT - AT | Total time in system |
| Waiting Time (WT) | TAT - BT | Time spent waiting |
| Response Time | First run - AT | Time to first response |

### 1. FCFS (First Come First Serve)

\`\`\`text
Non-preemptive: Process runs until completion

Example:
Process | AT | BT
P1      | 0  | 4
P2      | 1  | 3
P3      | 2  | 1

Gantt Chart:
|   P1   |   P2   | P3 |
0        4        7    8

Results:
P1: CT=4, TAT=4-0=4, WT=4-4=0
P2: CT=7, TAT=7-1=6, WT=6-3=3
P3: CT=8, TAT=8-2=6, WT=6-1=5

Avg WT = (0+3+5)/3 = 2.67
\`\`\`

**Convoy Effect**: Short processes wait behind long ones

### 2. SJF (Shortest Job First)

\`\`\`text
Select process with shortest burst time

Non-preemptive SJF:
Process | AT | BT
P1      | 0  | 7
P2      | 2  | 4
P3      | 4  | 1
P4      | 5  | 4

Gantt Chart:
|  P1  |P3|  P2  |  P4  |
0      7  8     12     16

At t=7: P2,P3,P4 are ready. P3 has shortest BT(1)
\`\`\`

**SRTF (Preemptive SJF)**: Can preempt if shorter job arrives

### 3. Round Robin (RR)

\`\`\`text
Preemptive with time quantum (q)
Each process gets q time units, then goes to back of queue

Process | AT | BT
P1      | 0  | 5
P2      | 1  | 3
P3      | 2  | 1

Time Quantum = 2

Gantt Chart:
|P1|P2|P3|P1|P2|P1|
0  2  4  5  7  8  9

P1: 2 units → P2: 2 units → P3: 1 unit (done)
→ P1: 2 units → P2: 1 unit (done) → P1: 1 unit (done)
\`\`\`

**Key**: Smaller quantum = more context switches = more overhead

### 4. Priority Scheduling

\`\`\`text
Lower number = Higher priority (usually)

Process | AT | BT | Priority
P1      | 0  | 4  | 2
P2      | 0  | 3  | 1 (highest)
P3      | 0  | 2  | 3

Order: P2 → P1 → P3

Problem: Starvation (low priority waits forever)
Solution: Aging (increase priority over time)
\`\`\`

---

## 5. Scheduling Algorithm Comparison

| Algorithm | Preemptive | Starvation | Optimal |
|:----------|:-----------|:-----------|:--------|
| FCFS | No | No | No |
| SJF | No | Yes | Yes (non-preemptive) |
| SRTF | Yes | Yes | Yes (preemptive) |
| Round Robin | Yes | No | Fair |
| Priority | Both | Yes | Depends |

---

## Key Takeaways

| Concept | Key Point |
|:--------|:----------|
| Process | Program in execution |
| PCB | Contains all process info |
| FCFS | Simple but convoy effect |
| SJF | Optimal but starvation |
| Round Robin | Fair, time quantum based |
| TAT | Completion Time - Arrival Time |
| WT | Turnaround Time - Burst Time |
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "os-pm-q1",
      question: "A process in 'ready' state is waiting for:",
      options: [
        "I/O completion",
        "CPU allocation",
        "Memory allocation",
        "User input",
      ],
      correctAnswer: 1,
      explanation:
        "Ready state = process has everything it needs except CPU. Waiting for scheduler to allocate CPU.",
      difficulty: "easy",
    },
    {
      id: "os-pm-q2",
      question: "FCFS scheduling suffers from:",
      options: ["Starvation", "Convoy effect", "Deadlock", "Thrashing"],
      correctAnswer: 1,
      explanation:
        "Convoy effect: Short processes wait behind long ones. SJF solves this but causes starvation.",
      difficulty: "easy",
    },
    {
      id: "os-pm-q3",
      question: "Turnaround Time is calculated as:",
      options: [
        "Burst Time - Arrival Time",
        "Completion Time - Arrival Time",
        "Waiting Time + Arrival Time",
        "Completion Time - Burst Time",
      ],
      correctAnswer: 1,
      explanation:
        "TAT = CT - AT. Total time from arrival to completion. WT = TAT - BT.",
      difficulty: "easy",
    },
    {
      id: "os-pm-q4",
      question:
        "Which scheduling algorithm is optimal for minimizing average waiting time?",
      options: ["FCFS", "SJF", "Round Robin", "Priority"],
      correctAnswer: 1,
      explanation:
        "SJF (Shortest Job First) gives minimum average waiting time. Proven optimal.",
      difficulty: "medium",
    },
    {
      id: "os-pm-q5",
      question: "PCB stands for:",
      options: [
        "Process Control Block",
        "Program Counter Block",
        "Primary Control Base",
        "Process Counter Base",
      ],
      correctAnswer: 0,
      explanation:
        "PCB = Process Control Block. Contains PID, state, registers, scheduling info, etc.",
      difficulty: "easy",
    },
    {
      id: "os-pm-q6",
      question: "In Round Robin, if time quantum is too large:",
      options: [
        "More context switches",
        "Behaves like FCFS",
        "Starvation occurs",
        "Deadlock occurs",
      ],
      correctAnswer: 1,
      explanation:
        "Large quantum = process finishes before preemption = like FCFS. Small quantum = many switches.",
      difficulty: "medium",
    },
    {
      id: "os-pm-q7",
      question: "Starvation in priority scheduling is solved by:",
      options: ["Larger quantum", "Aging", "Preemption", "Deadlock detection"],
      correctAnswer: 1,
      explanation:
        "Aging gradually increases priority of waiting processes. Ensures all eventually run.",
      difficulty: "medium",
    },
    {
      id: "os-pm-q8",
      question: "SRTF is the preemptive version of:",
      options: ["FCFS", "SJF", "Round Robin", "Priority"],
      correctAnswer: 1,
      explanation:
        "SRTF = Shortest Remaining Time First = Preemptive SJF. Preempts if shorter job arrives.",
      difficulty: "easy",
    },
    {
      id: "os-pm-q9",
      question: "Context switch involves saving state of:",
      options: [
        "Only current process",
        "Only new process",
        "Both processes",
        "No process",
      ],
      correctAnswer: 2,
      explanation:
        "Save current process state to its PCB, load new process state from its PCB.",
      difficulty: "medium",
    },
    {
      id: "os-pm-q10",
      question: "Which is NOT stored in PCB?",
      options: [
        "Process ID",
        "Program Counter",
        "Source Code",
        "CPU Registers",
      ],
      correctAnswer: 2,
      explanation:
        "Source code is stored in text section of process memory, not in PCB. PCB has metadata.",
      difficulty: "easy",
    },
  ],
};
