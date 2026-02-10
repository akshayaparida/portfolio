import { LearningModule } from "@/types/learning";

export const diskFileSystemsModule: LearningModule = {
  id: "disk-file-systems",
  title: "4. Disk & File Systems",
  description: "Disk scheduling algorithms, file allocation, directories",
  status: "in-progress",
  tags: ["Theory"],
  detailedContent: `# Disk & File Systems

> **Storage Management** - Organizing and accessing data on disk

---

## What You'll Learn

1. Understand disk structure and access time
2. Learn disk scheduling algorithms
3. Master file allocation methods
4. Know directory structures

---

## 1. Disk Structure

### Physical Structure

\`\`\`text
Disk Anatomy:
┌─────────────────────────────────┐
│         Multiple Platters        │
│   ┌───────────────────────┐     │
│   │    Track (cylinder)    │     │
│   │  ┌─────────────────┐  │     │
│   │  │     Sector      │  │     │
│   │  │   (512B-4KB)    │  │     │
│   │  └─────────────────┘  │     │
│   └───────────────────────┘     │
│         Read/Write Head          │
└─────────────────────────────────┘

Terms:
- Platter: Circular disk surface
- Track: Concentric circle on platter
- Sector: Smallest unit (typically 512B)
- Cylinder: Same track on all platters
\`\`\`

### Disk Access Time

\`\`\`text
Access Time = Seek Time + Rotational Latency + Transfer Time

Seek Time: Move head to correct track (dominant)
Rotational Latency: Wait for sector to rotate under head
Transfer Time: Read/write the data

Example:
Seek = 10ms, Rotation = 5ms (avg), Transfer = 0.1ms
Total = 10 + 5 + 0.1 = 15.1ms
\`\`\`

---

## 2. Disk Scheduling Algorithms

Goal: Minimize seek time (head movement)

### 1. FCFS (First Come First Serve)

\`\`\`text
Service in request order

Queue: 98, 183, 37, 122, 14, 124, 65, 67
Head starts at: 53

Movement: 53→98→183→37→122→14→124→65→67

Total head movement = 
|53-98| + |98-183| + |183-37| + |37-122| + 
|122-14| + |14-124| + |124-65| + |65-67|
= 45 + 85 + 146 + 85 + 108 + 110 + 59 + 2
= 640 cylinders
\`\`\`

### 2. SSTF (Shortest Seek Time First)

\`\`\`text
Service closest request first

Queue: 98, 183, 37, 122, 14, 124, 65, 67
Head at: 53

Nearest to 53: 65 (distance 12)
Nearest to 65: 67 (distance 2)
Continue picking closest...

Movement: 53→65→67→37→14→98→122→124→183

Total = 12+2+30+23+84+24+2+59 = 236 cylinders
(Much better than FCFS!)

Problem: Starvation of far requests
\`\`\`

### 3. SCAN (Elevator)

\`\`\`text
Move in one direction, service all requests
At end, reverse direction

Queue: 98, 183, 37, 122, 14, 124, 65, 67
Head at 53, moving toward 0

Movement: 53→37→14→0→65→67→98→122→124→183

Goes to end (0), then reverses
Total = 53 + 183 = 236 cylinders

Like an elevator going up/down
\`\`\`

### 4. C-SCAN (Circular SCAN)

\`\`\`text
Move in one direction only
Jump back to beginning without servicing

Queue: 98, 183, 37, 122, 14, 124, 65, 67
Head at 53, moving toward 199

Movement: 53→65→67→98→122→124→183→199→0→14→37

Provides more uniform wait time
\`\`\`

### 5. LOOK / C-LOOK

\`\`\`text
Like SCAN/C-SCAN but don't go to disk end
Only go as far as last request

LOOK: Go to 183 (not 199), reverse to 14 (not 0)
C-LOOK: Go to 183, jump to 14 (not 0)
\`\`\`

### Algorithm Comparison

| Algorithm | Seek Movement | Starvation | Fairness |
|:----------|:-------------|:-----------|:---------|
| FCFS | High | No | Yes |
| SSTF | Low | Yes | No |
| SCAN | Medium | No | Medium |
| C-SCAN | Medium | No | Yes |
| LOOK/C-LOOK | Optimal | No | Yes |

---

## 3. File Allocation Methods

### 1. Contiguous Allocation

\`\`\`text
File stored in consecutive blocks

Directory Entry: [Filename] [Start] [Length]
myfile.txt        10        5

Blocks: 10, 11, 12, 13, 14

Pros: Simple, fast sequential & random access
Cons: External fragmentation, file can't grow
\`\`\`

### 2. Linked Allocation

\`\`\`text
Each block points to next block

Directory: [Filename] [Start] [End]
myfile.txt    10        20

Block 10 → Block 15 → Block 18 → Block 20 → NULL

Pros: No external fragmentation, can grow
Cons: Slow random access, pointer overhead
\`\`\`

### 3. Indexed Allocation

\`\`\`text
Index block contains pointers to all data blocks

Directory: [Filename] [Index Block]
myfile.txt     100

Index Block 100: [10, 15, 18, 20, 25, ...]

Pros: Good random access, no fragmentation
Cons: Index block overhead
\`\`\`

### Comparison

| Method | Random Access | Fragmentation | Growth |
|:-------|:-------------|:--------------|:-------|
| Contiguous | Fast | External | Hard |
| Linked | Slow | None | Easy |
| Indexed | Medium | None | Easy |

---

## 4. Directory Structure

### Single-Level Directory

\`\`\`text
All files in one directory
Problem: Name conflicts, hard to organize

[file1] [file2] [file3] [file4]
\`\`\`

### Two-Level Directory

\`\`\`text
User directories under root

/root
  /user1
    [file1] [file2]
  /user2
    [file1] [file3]

Same filename allowed for different users
\`\`\`

### Hierarchical (Tree) Directory

\`\`\`text
Nested directories

/
├── home
│   ├── user1
│   │   └── docs
│   └── user2
├── etc
└── var

Most common in modern systems
\`\`\`

---

## 5. Free Space Management

### Bit Vector (Bitmap)

\`\`\`text
1 bit per block: 0 = free, 1 = allocated

Blocks: 0 1 2 3 4 5 6 7
Bitmap: 1 1 0 1 0 0 1 1

Find free: Scan for 0 bits
Efficient for finding contiguous space
\`\`\`

### Linked List

\`\`\`text
Free blocks linked together

Free List Head → Block 2 → Block 4 → Block 5 → NULL

No extra space needed (use free blocks)
Slow to find contiguous space
\`\`\`

---

## Key Takeaways

| Concept | Key Point |
|:--------|:----------|
| Seek Time | Dominant factor in disk access |
| SSTF | Best seek time, can starve |
| SCAN | Elevator algorithm, fair |
| Contiguous | Fast but fragments |
| Indexed | Good balance, uses index block |
| Bitmap | Efficient free space tracking |
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "os-df-q1",
      question: "SSTF disk scheduling may cause:",
      options: ["Deadlock", "Starvation", "Thrashing", "Fragmentation"],
      correctAnswer: 1,
      explanation:
        "SSTF always picks nearest. Requests far from current position may starve.",
      difficulty: "easy",
    },
    {
      id: "os-df-q2",
      question: "SCAN algorithm is also called:",
      options: [
        "Shortest Job First",
        "Elevator algorithm",
        "Round Robin",
        "Priority",
      ],
      correctAnswer: 1,
      explanation:
        "SCAN moves like elevator: go one direction, reverse at end. Also called Elevator.",
      difficulty: "easy",
    },
    {
      id: "os-df-q3",
      question: "Contiguous file allocation suffers from:",
      options: [
        "Internal fragmentation",
        "External fragmentation",
        "No fragmentation",
        "Pointer overhead",
      ],
      correctAnswer: 1,
      explanation:
        "Contiguous needs consecutive blocks. Deletion creates holes = external fragmentation.",
      difficulty: "easy",
    },
    {
      id: "os-df-q4",
      question: "Linked allocation is poor for:",
      options: [
        "Sequential access",
        "Random access",
        "File growth",
        "Small files",
      ],
      correctAnswer: 1,
      explanation:
        "Linked must follow chain from start. Random access is O(n). Sequential is fine.",
      difficulty: "medium",
    },
    {
      id: "os-df-q5",
      question: "Index block in indexed allocation contains:",
      options: [
        "File data",
        "Pointers to data blocks",
        "Directory entries",
        "Free space list",
      ],
      correctAnswer: 1,
      explanation:
        "Index block stores pointers to all data blocks. Enables random access.",
      difficulty: "easy",
    },
    {
      id: "os-df-q6",
      question: "Seek time is the time to:",
      options: [
        "Rotate disk",
        "Move head to track",
        "Transfer data",
        "Find free block",
      ],
      correctAnswer: 1,
      explanation:
        "Seek = move head to correct track. Usually the dominant access time component.",
      difficulty: "easy",
    },
    {
      id: "os-df-q7",
      question: "C-SCAN differs from SCAN by:",
      options: [
        "Moving faster",
        "Only servicing in one direction",
        "Using SSTF",
        "Going to disk end",
      ],
      correctAnswer: 1,
      explanation:
        "C-SCAN services only in one direction, jumps back. More uniform wait times.",
      difficulty: "medium",
    },
    {
      id: "os-df-q8",
      question: "Bitmap for free space uses:",
      options: [
        "1 bit per file",
        "1 bit per block",
        "1 byte per block",
        "1 pointer per block",
      ],
      correctAnswer: 1,
      explanation:
        "Bitmap: 1 bit per block. 0=free, 1=allocated. Efficient for finding contiguous space.",
      difficulty: "easy",
    },
    {
      id: "os-df-q9",
      question: "In hierarchical directory, path /home/user/file uses:",
      options: ["Single-level", "Two-level", "Tree structure", "Linked list"],
      correctAnswer: 2,
      explanation:
        "Hierarchical = tree structure. Nested directories with paths.",
      difficulty: "easy",
    },
    {
      id: "os-df-q10",
      question: "LOOK algorithm improves SCAN by:",
      options: [
        "Going faster",
        "Not going to disk end",
        "Using SSTF",
        "Ignoring some requests",
      ],
      correctAnswer: 1,
      explanation:
        "LOOK only goes to last request, not disk end. Saves unnecessary head movement.",
      difficulty: "medium",
    },
  ],
};
