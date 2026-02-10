import { LearningModule } from "@/types/learning";

export const memoryManagementModule: LearningModule = {
  id: "memory-management",
  title: "3. Memory Management",
  description: "Paging, segmentation, virtual memory, page replacement",
  status: "in-progress",
  tags: ["Theory"],
  detailedContent: `# Memory Management

> **Core OS Function** - Managing RAM efficiently

---

## What You'll Learn

1. Understand memory allocation techniques
2. Learn paging and segmentation
3. Master virtual memory concepts
4. Apply page replacement algorithms

---

## 1. Memory Allocation

### Contiguous Allocation

\`\`\`text
Fixed Partitions:
|  OS  | P1 (10KB) | P2 (20KB) | P3 (15KB) |  Free  |

Variable Partitions:
|  OS  |   P1 (12KB)   |  P2 (8KB)  |    Free     |
\`\`\`

### Allocation Strategies

| Strategy | Description | Issue |
|:---------|:------------|:------|
| **First Fit** | First hole that fits | Fast but fragmentation |
| **Best Fit** | Smallest hole that fits | Minimal waste, slow |
| **Worst Fit** | Largest hole | Leaves large holes |

### Fragmentation

\`\`\`text
External Fragmentation:
Total free space enough, but not contiguous
Solution: Compaction (expensive)

Internal Fragmentation:
Allocated more than needed (within partition)
Solution: Smaller allocation units
\`\`\`

---

## 2. Paging

**Divide memory into fixed-size pages (process) and frames (physical)**

\`\`\`text
Page size = Frame size (typically 4KB)

Logical Address:
| Page Number | Offset |
     p bits      d bits

Physical Address:
| Frame Number | Offset |
     f bits       d bits
\`\`\`

### Page Table

\`\`\`text
Page Table Entry (PTE):
| Frame Number | Valid | Protection | Dirty | Reference |

Process pages map to physical frames:
Page 0 → Frame 5
Page 1 → Frame 2
Page 2 → Frame 7
\`\`\`

### Address Translation

\`\`\`text
Logical Address: Page 2, Offset 100
Page Table: Page 2 → Frame 7
Physical Address: Frame 7, Offset 100

If page size = 4KB = 4096 bytes
Physical = Frame × Page_Size + Offset
         = 7 × 4096 + 100 = 28772
\`\`\`

### TLB (Translation Lookaside Buffer)

\`\`\`text
Cache for page table entries
Hit: No memory access for translation
Miss: Access page table in memory

Effective Access Time (EAT):
EAT = hit_ratio × (TLB_time + mem_time) 
    + miss_ratio × (TLB_time + 2×mem_time)
\`\`\`

---

## 3. Segmentation

**Divide by logical units (code, data, stack)**

\`\`\`text
Segment Table:
| Segment | Base | Limit |
|    0    | 1000 |  400  | (Code)
|    1    | 2000 |  600  | (Data)
|    2    | 3000 |  300  | (Stack)

Logical Address: Segment 1, Offset 200
Physical = Base + Offset = 2000 + 200 = 2200

If Offset > Limit → Segmentation Fault!
\`\`\`

### Paging vs Segmentation

| Paging | Segmentation |
|:-------|:-------------|
| Fixed size | Variable size |
| Internal fragmentation | External fragmentation |
| Invisible to programmer | Visible (logical division) |
| No protection per unit | Protection per segment |

---

## 4. Virtual Memory

**Use disk to extend RAM**

\`\`\`text
Virtual Address Space > Physical Memory

Only needed pages in RAM
Rest on disk (swap space)

Page Fault:
1. Access page not in memory
2. OS traps, finds page on disk
3. Load page to free frame
4. Update page table
5. Restart instruction
\`\`\`

### Demand Paging

\`\`\`text
Load pages only when needed (on demand)
Initially: No pages in memory
Access → Page fault → Load from disk

Page Fault Rate (p):
EAT = (1-p) × memory_access + p × page_fault_time
\`\`\`

---

## 5. Page Replacement Algorithms

When memory full, which page to replace?

### 1. FIFO (First In First Out)

\`\`\`text
Replace oldest page in memory

Reference: 7 0 1 2 0 3 0 4
Frames = 3

|7| | |  → 7
|7|0| |  → 0
|7|0|1|  → 1
|2|0|1|  → 2 (replaces 7, oldest)
|2|0|1|  → 0 (hit)
|2|3|1|  → 3 (replaces 0)
|2|3|0|  → 0 (replaces 1)
|4|3|0|  → 4 (replaces 2)

Page faults = 7
\`\`\`

**Belady's Anomaly**: More frames can cause MORE faults in FIFO!

### 2. LRU (Least Recently Used)

\`\`\`text
Replace page not used for longest time

Reference: 7 0 1 2 0 3 0 4
Frames = 3

|7| | |  → 7
|7|0| |  → 0
|7|0|1|  → 1
|2|0|1|  → 2 (7 LRU)
|2|0|1|  → 0 (hit)
|2|0|3|  → 3 (1 LRU)
|2|0|3|  → 0 (hit)
|4|0|3|  → 4 (2 LRU)

Page faults = 6 (better than FIFO)
\`\`\`

### 3. Optimal (OPT)

\`\`\`text
Replace page not used for longest time in FUTURE
(Theoretical - needs future knowledge)

Gives minimum page faults
Used as benchmark for comparison
\`\`\`

### Algorithm Comparison

| Algorithm | Anomaly | Performance | Implementation |
|:----------|:--------|:------------|:---------------|
| FIFO | Yes (Belady's) | Poor | Simple queue |
| LRU | No | Good | Complex (timestamp/stack) |
| Optimal | No | Best | Impossible (future) |

---

## 6. Thrashing

\`\`\`text
Too many page faults!
CPU spends more time swapping than executing

Cause: Working set > available frames
Solution: 
- Reduce multiprogramming
- Increase RAM
- Use better replacement algorithm
\`\`\`

---

## Key Takeaways

| Concept | Key Point |
|:--------|:----------|
| Paging | Fixed size, no external fragmentation |
| Segmentation | Logical division, external fragmentation |
| TLB | Page table cache for speed |
| Page Fault | Page not in memory, load from disk |
| LRU | Replace least recently used |
| Optimal | Theoretical best, uses future knowledge |
| Thrashing | Too many page faults, low CPU utilization |
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "os-mm-q1",
      question: "Page size in paging is typically:",
      options: ["Variable", "Fixed", "Zero", "Infinite"],
      correctAnswer: 1,
      explanation:
        "Paging uses fixed-size pages (and frames). Segmentation uses variable size.",
      difficulty: "easy",
    },
    {
      id: "os-mm-q2",
      question: "TLB is a cache for:",
      options: [
        "Process IDs",
        "Page table entries",
        "Disk blocks",
        "CPU registers",
      ],
      correctAnswer: 1,
      explanation:
        "TLB caches page table entries. Hit = avoid memory access for translation.",
      difficulty: "easy",
    },
    {
      id: "os-mm-q3",
      question: "Belady's anomaly occurs in:",
      options: ["LRU", "FIFO", "Optimal", "LFU"],
      correctAnswer: 1,
      explanation:
        "FIFO suffers Belady's anomaly: more frames can cause more page faults!",
      difficulty: "medium",
    },
    {
      id: "os-mm-q4",
      question: "Optimal page replacement requires:",
      options: [
        "Past reference history",
        "Future reference knowledge",
        "Random selection",
        "FIFO order",
      ],
      correctAnswer: 1,
      explanation:
        "Optimal replaces page not used for longest in future. Needs future knowledge = impossible.",
      difficulty: "easy",
    },
    {
      id: "os-mm-q5",
      question: "Internal fragmentation occurs in:",
      options: ["Segmentation", "Paging", "Both", "Neither"],
      correctAnswer: 1,
      explanation:
        "Paging has internal fragmentation (allocated > needed). Segmentation has external.",
      difficulty: "medium",
    },
    {
      id: "os-mm-q6",
      question: "A page fault occurs when:",
      options: [
        "Page is corrupted",
        "Page not in memory",
        "Frame is full",
        "TLB miss",
      ],
      correctAnswer: 1,
      explanation:
        "Page fault = accessed page not in physical memory. OS loads from disk.",
      difficulty: "easy",
    },
    {
      id: "os-mm-q7",
      question: "LRU replaces the page:",
      options: [
        "First loaded",
        "Least frequently used",
        "Least recently used",
        "Randomly selected",
      ],
      correctAnswer: 2,
      explanation:
        "LRU = Least Recently Used. Replaces page not accessed for longest time.",
      difficulty: "easy",
    },
    {
      id: "os-mm-q8",
      question: "Thrashing leads to:",
      options: [
        "High CPU utilization",
        "Low CPU utilization",
        "More processes",
        "Faster execution",
      ],
      correctAnswer: 1,
      explanation:
        "Thrashing = constant page faults. CPU busy swapping, not executing. Low utilization.",
      difficulty: "medium",
    },
    {
      id: "os-mm-q9",
      question: "In segmentation, logical address has:",
      options: [
        "Page number + offset",
        "Segment number + offset",
        "Frame number + offset",
        "Only offset",
      ],
      correctAnswer: 1,
      explanation:
        "Segmentation: Segment number + Offset. Paging: Page number + Offset.",
      difficulty: "easy",
    },
    {
      id: "os-mm-q10",
      question: "Which allocation strategy finds smallest suitable hole?",
      options: ["First Fit", "Best Fit", "Worst Fit", "Next Fit"],
      correctAnswer: 1,
      explanation:
        "Best Fit finds smallest hole that fits. Minimizes waste but slower, creates tiny holes.",
      difficulty: "easy",
    },
  ],
};
