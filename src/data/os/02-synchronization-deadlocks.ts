import { LearningModule } from "@/types/learning";

export const synchronizationDeadlocksModule: LearningModule = {
  id: "synchronization-deadlocks",
  title: "2. Synchronization & Deadlocks",
  description: "Critical section, semaphores, mutex, and deadlock handling",
  status: "in-progress",
  tags: ["Theory"],
  detailedContent: `# Synchronization & Deadlocks

> **Concurrency Control** - Managing shared resources safely

---

## What You'll Learn

1. Understand the critical section problem
2. Learn synchronization mechanisms (mutex, semaphore)
3. Master deadlock conditions and handling
4. Apply Banker's algorithm for deadlock avoidance

---

## 1. Critical Section Problem

**Critical Section**: Code that accesses shared resources

\`\`\`text
Entry Section     → Request permission
Critical Section  → Access shared resource  
Exit Section      → Release permission
Remainder Section → Non-critical code
\`\`\`

### Requirements for Solution

| Requirement | Description |
|:------------|:------------|
| **Mutual Exclusion** | Only one process in CS at a time |
| **Progress** | If CS empty, selection can't be postponed indefinitely |
| **Bounded Waiting** | Limit on how long a process waits |

---

## 2. Synchronization Mechanisms

### Mutex (Mutual Exclusion Lock)

\`\`\`python
# Binary lock: locked (1) or unlocked (0)
mutex = 1

def acquire():
    while mutex == 0:
        pass  # busy wait
    mutex = 0  # lock it

def release():
    mutex = 1  # unlock it

# Usage
acquire()
# ... critical section ...
release()
\`\`\`

### Semaphore

\`\`\`python
# Counting semaphore: can be > 1
# Binary semaphore: 0 or 1 (like mutex)

class Semaphore:
    def __init__(self, value):
        self.value = value
    
    def wait(self):  # P operation
        while self.value <= 0:
            pass
        self.value -= 1
    
    def signal(self):  # V operation
        self.value += 1

# Producer-Consumer Example
empty = Semaphore(n)  # n empty slots
full = Semaphore(0)   # 0 full slots
mutex = Semaphore(1)  # mutual exclusion

# Producer
empty.wait()
mutex.wait()
# add item to buffer
mutex.signal()
full.signal()

# Consumer
full.wait()
mutex.wait()
# remove item from buffer
mutex.signal()
empty.signal()
\`\`\`

### Mutex vs Semaphore

| Mutex | Semaphore |
|:------|:----------|
| Binary (0/1) | Counting (0 to n) |
| Ownership (same thread unlocks) | No ownership |
| For mutual exclusion | For synchronization + ME |

---

## 3. Classical Synchronization Problems

### Producer-Consumer Problem

\`\`\`text
Producer: Creates items, adds to buffer
Consumer: Removes items from buffer
Buffer: Fixed size (n slots)

Issues to handle:
- Producer waits if buffer full
- Consumer waits if buffer empty
- Only one accesses buffer at a time
\`\`\`

### Readers-Writers Problem

\`\`\`text
Multiple readers can read simultaneously
Only one writer at a time
No reader while writing, no writer while reading

Solution: Use mutex for writers, allow multiple readers
\`\`\`

### Dining Philosophers Problem

\`\`\`text
5 philosophers, 5 forks
Each needs 2 forks to eat
Can cause deadlock if all pick left fork first

Solutions:
- Allow only 4 to sit
- Pick both forks atomically
- Odd picks left first, even picks right first
\`\`\`

---

## 4. Deadlock

**Deadlock**: Set of processes blocked, each waiting for resource held by another

### Deadlock Conditions (ALL must hold)

| Condition | Description |
|:----------|:------------|
| **Mutual Exclusion** | Resource held by only one process |
| **Hold and Wait** | Process holds resource while waiting for another |
| **No Preemption** | Resources can't be forcibly taken |
| **Circular Wait** | Circular chain of processes waiting |

### Resource Allocation Graph

\`\`\`text
Process → Resource: Request edge
Resource → Process: Assignment edge

Deadlock if cycle exists (single instance per resource)

P1 → R1 → P2 → R2 → P1  ← DEADLOCK!
\`\`\`

---

## 5. Deadlock Handling

### 1. Prevention (Break a condition)

| Condition | Prevention |
|:----------|:-----------|
| Mutual Exclusion | Make resources sharable (not always possible) |
| Hold and Wait | Request all resources at once |
| No Preemption | Allow preemption |
| Circular Wait | Order resources, request in order |

### 2. Avoidance (Banker's Algorithm)

\`\`\`text
System checks if granting request leads to safe state
Safe state: Can complete all processes in some order

Banker's Algorithm:
- Available: Resources currently available
- Max: Maximum each process may need
- Allocation: Currently allocated
- Need = Max - Allocation

Safe sequence example:
Available = [3, 3, 2]
Can P1 finish? Need[P1] <= Available?
If yes, allocate, let finish, reclaim resources
Continue until all processes finish
\`\`\`

### 3. Detection and Recovery

\`\`\`text
Detection: Find cycles in resource graph

Recovery options:
- Terminate deadlocked processes
- Preempt resources
- Rollback to checkpoint
\`\`\`

### 4. Ignorance (Ostrich Algorithm)

\`\`\`text
Ignore the problem!
Used when deadlock is rare and detection is expensive
Most OSes (Windows, Linux) use this approach
\`\`\`

---

## Key Takeaways

| Concept | Key Point |
|:--------|:----------|
| Critical Section | Needs mutual exclusion |
| Mutex | Binary lock with ownership |
| Semaphore | Counting, P(wait) and V(signal) |
| Deadlock conditions | ME, Hold-Wait, No-Preempt, Circular |
| Banker's Algorithm | Safe state = can finish all |
| Prevention | Break one condition |
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "os-sd-q1",
      question: "Which is NOT a necessary condition for deadlock?",
      options: [
        "Mutual Exclusion",
        "Hold and Wait",
        "Starvation",
        "Circular Wait",
      ],
      correctAnswer: 2,
      explanation:
        "4 conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. Starvation is different.",
      difficulty: "easy",
    },
    {
      id: "os-sd-q2",
      question: "Semaphore wait operation is also called:",
      options: ["V operation", "P operation", "Signal", "Release"],
      correctAnswer: 1,
      explanation:
        "P = wait/down (decrement). V = signal/up (increment). From Dutch: Proberen, Verhogen.",
      difficulty: "easy",
    },
    {
      id: "os-sd-q3",
      question: "Banker's algorithm is used for:",
      options: [
        "Deadlock prevention",
        "Deadlock avoidance",
        "Deadlock detection",
        "Deadlock recovery",
      ],
      correctAnswer: 1,
      explanation:
        "Banker's checks if granting request keeps system in safe state. That's avoidance.",
      difficulty: "medium",
    },
    {
      id: "os-sd-q4",
      question: "Mutual exclusion ensures:",
      options: [
        "Multiple processes in CS",
        "Only one process in CS",
        "No process in CS",
        "All processes in CS",
      ],
      correctAnswer: 1,
      explanation:
        "Mutual exclusion = only one process in critical section at a time.",
      difficulty: "easy",
    },
    {
      id: "os-sd-q5",
      question: "In Producer-Consumer, 'empty' semaphore is initialized to:",
      options: ["0", "1", "n (buffer size)", "n-1"],
      correctAnswer: 2,
      explanation:
        "empty = n (all slots empty). full = 0 (no items). mutex = 1.",
      difficulty: "medium",
    },
    {
      id: "os-sd-q6",
      question: "Circular wait can be prevented by:",
      options: [
        "Using more resources",
        "Ordering resources and requesting in order",
        "Removing mutex",
        "Ignoring deadlock",
      ],
      correctAnswer: 1,
      explanation:
        "Assign order to resources. Request in increasing order. Prevents circular chain.",
      difficulty: "medium",
    },
    {
      id: "os-sd-q7",
      question: "A binary semaphore is similar to:",
      options: ["Counting semaphore", "Mutex", "Spinlock", "Monitor"],
      correctAnswer: 1,
      explanation:
        "Binary semaphore has values 0 or 1, similar to mutex. Counting can be 0 to n.",
      difficulty: "easy",
    },
    {
      id: "os-sd-q8",
      question: "Safe state means:",
      options: [
        "No deadlock currently",
        "System can complete all processes",
        "All resources free",
        "No processes waiting",
      ],
      correctAnswer: 1,
      explanation:
        "Safe state = exists a sequence to complete all processes. No deadlock possible.",
      difficulty: "medium",
    },
    {
      id: "os-sd-q9",
      question: "Ostrich algorithm handles deadlock by:",
      options: ["Prevention", "Avoidance", "Detection", "Ignoring it"],
      correctAnswer: 3,
      explanation:
        "Ostrich algorithm = ignore deadlock. Used when rare and detection expensive. Most OSes use this.",
      difficulty: "easy",
    },
    {
      id: "os-sd-q10",
      question: "In dining philosophers, deadlock occurs when:",
      options: [
        "All eat simultaneously",
        "None can eat",
        "All pick left fork first",
        "Only one eats",
      ],
      correctAnswer: 2,
      explanation:
        "If all pick left fork, each waits for right fork held by neighbor. Circular wait = deadlock.",
      difficulty: "medium",
    },
  ],
};
