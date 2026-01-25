import { LearningModule } from "@/types/learning";

export const transactionsConcurrencyModule: LearningModule = {
  id: "transactions-concurrency",
  title: "Transactions & Concurrency Control",
  description:
    "ACID properties, serializability, locking protocols, deadlocks, and recovery",
  status: "in-progress",
  detailedContent: `# Transactions & Concurrency Control

Transaction management ensures database consistency when multiple users access data simultaneously. This module covers ACID properties, concurrency control, and recovery mechanisms.

## 🎯 What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Transaction Basics** | States, ACID properties |
| 2 | **Serializability** | Conflict, View serializability |
| 3 | **Locking** | 2PL, deadlock handling |
| 4 | **Timestamps** | Timestamp-based protocols |
| 5 | **Recovery** | Log-based recovery, checkpoints |

---

## 1. Transaction Fundamentals

**What is a Transaction?**
A transaction is a logical unit of work that consists of one or more database operations. Either ALL operations succeed, or NONE take effect.

\`\`\`sql path=null start=null
-- Bank Transfer Transaction
BEGIN TRANSACTION;
    UPDATE Accounts SET balance = balance - 500 WHERE id = 1;  -- Debit
    UPDATE Accounts SET balance = balance + 500 WHERE id = 2;  -- Credit
COMMIT;

-- If any operation fails, ROLLBACK undoes all changes
\`\`\`

**Transaction States:**

\`\`\`text path=null start=null
┌─────────┐    begin    ┌──────────────┐
│  Active │ ──────────> │ Partially    │
│         │             │ Committed    │
└────┬────┘             └──────┬───────┘
     │                         │
     │ failure                 │ commit
     ↓                         ↓
┌─────────┐             ┌──────────────┐
│ Failed  │             │  Committed   │
└────┬────┘             └──────────────┘
     │
     │ rollback
     ↓
┌─────────┐
│ Aborted │
└─────────┘
\`\`\`

**ACID Properties:**

| Property | Description | Implementation |
|:---------|:------------|:---------------|
| **A**tomicity | All or nothing | Rollback on failure |
| **C**onsistency | Valid state → Valid state | Constraints, triggers |
| **I**solation | Concurrent txns don't interfere | Locking, MVCC |
| **D**urability | Committed changes survive crashes | Write-ahead logging |

\`\`\`python path=null start=null
# ACID Example: Bank Transfer

# Atomicity: 
# If credit fails after debit, entire transaction rolls back
# Money doesn't disappear!

# Consistency:
# Total balance before = Total balance after
# CHECK constraints enforced

# Isolation:
# Two transfers happening simultaneously don't mix up
# Each sees consistent snapshot

# Durability:
# Once COMMIT returns, changes are permanent
# Survives power failure, crashes
\`\`\`

---

## 2. Schedules and Serializability

**Schedule:** Order in which operations of multiple transactions execute.

\`\`\`text path=null start=null
Transaction T1: R(A), W(A), R(B), W(B)
Transaction T2: R(A), W(A), R(B), W(B)

Serial Schedule S1: T1 then T2
R1(A) W1(A) R1(B) W1(B) R2(A) W2(A) R2(B) W2(B)

Serial Schedule S2: T2 then T1
R2(A) W2(A) R2(B) W2(B) R1(A) W1(A) R1(B) W1(B)

Interleaved Schedule:
R1(A) R2(A) W1(A) W2(A) R1(B) R2(B) W1(B) W2(B)
(May or may not be correct!)
\`\`\`

**Conflict Operations:**
Two operations conflict if:
1. They belong to different transactions
2. They access the same data item
3. At least one is a WRITE

\`\`\`text path=null start=null
Conflicting Pairs:
• R1(A) ... W2(A)  ← Read-Write conflict
• W1(A) ... R2(A)  ← Write-Read conflict
• W1(A) ... W2(A)  ← Write-Write conflict

Non-conflicting:
• R1(A) ... R2(A)  ← Both reads (OK!)
• R1(A) ... W2(B)  ← Different items (OK!)
\`\`\`

**Conflict Serializability:**

\`\`\`text path=null start=null
A schedule is CONFLICT SERIALIZABLE if it can be transformed 
into a serial schedule by swapping non-conflicting operations.

Testing: Build Precedence Graph
• Node for each transaction
• Edge Ti → Tj if conflicting operation of Ti precedes Tj

If graph has NO CYCLE → Conflict Serializable!
Any topological order gives equivalent serial schedule.
\`\`\`

**Precedence Graph Example:**

\`\`\`python path=null start=null
# Schedule: R1(A) W2(A) R2(B) W1(B)

# Conflicts:
# R1(A) before W2(A): T1 → T2 (read-write on A)
# R2(B) before W1(B): T2 → T1 (read-write on B)

# Precedence Graph:
# T1 → T2 (from A)
# T2 → T1 (from B)

# CYCLE DETECTED: T1 → T2 → T1
# Schedule is NOT conflict serializable!
\`\`\`

**View Serializability:**

\`\`\`text path=null start=null
More permissive than conflict serializability.

Schedule is view equivalent to serial if:
1. Same initial reads (Ti reads initial value of X in both)
2. Same write-read dependency (if Ti reads X from Tj in S, same in S')
3. Same final writes (last write on X is by same Ti)

View Serializable ⊇ Conflict Serializable
Testing is NP-Complete!
\`\`\`

---

## 3. Lock-Based Protocols

**Binary Locks:**

\`\`\`text path=null start=null
Lock Types:
• Shared Lock (S): For reading, multiple allowed
• Exclusive Lock (X): For writing, exclusive access

Compatibility Matrix:
         | S-lock | X-lock |
---------|--------|--------|
S-lock   |   ✓    |   ✗    |
X-lock   |   ✗    |   ✗    |

Rules:
• Read: Acquire S or X lock
• Write: Acquire X lock
• Release when done
\`\`\`

**Two-Phase Locking (2PL):**

\`\`\`text path=null start=null
Phase 1 (Growing): Only acquire locks, never release
Phase 2 (Shrinking): Only release locks, never acquire

┌──────────────────────────────────────────┐
│  Growing Phase    │   Shrinking Phase    │
│  (acquire only)   │   (release only)     │
│                   │                      │
│     /\    LOCK   │       \    UNLOCK     │
│    /  \   POINT   │        \             │
│   /    \         │          \            │
│──/──────\────────│───────────\───────────│
│                  │                        │
└──────────────────────────────────────────┘
                Time →

2PL GUARANTEES: Conflict Serializability
\`\`\`

**2PL Variants:**

| Variant | Description |
|:--------|:------------|
| Basic 2PL | Lock point exists, may cause cascading rollback |
| Strict 2PL | Hold ALL locks until commit/abort |
| Rigorous 2PL | Hold ALL locks (S and X) until end |
| Conservative 2PL | Acquire ALL locks before execution |

\`\`\`sql path=null start=null
-- Strict 2PL Example
BEGIN;
LOCK TABLE Accounts IN ROW EXCLUSIVE MODE;

-- All operations...
UPDATE Accounts SET balance = balance - 100 WHERE id = 1;
UPDATE Accounts SET balance = balance + 100 WHERE id = 2;

-- Locks held until COMMIT
COMMIT;  -- Now all locks released
\`\`\`

---

## 4. Deadlock Handling

**Deadlock Example:**

\`\`\`text path=null start=null
T1: Lock(A), Lock(B)
T2: Lock(B), Lock(A)

Timeline:
T1: Lock(A) ✓
T2: Lock(B) ✓
T1: Lock(B) - WAIT (T2 holds B)
T2: Lock(A) - WAIT (T1 holds A)

DEADLOCK! Both waiting forever.
\`\`\`

**Deadlock Prevention:**

| Method | Description |
|:-------|:------------|
| Wait-Die | Older waits, younger aborts (dies) |
| Wound-Wait | Older wounds (aborts) younger, younger waits |
| Timeout | Abort if waiting too long |
| Conservative 2PL | Lock everything upfront |

\`\`\`python path=null start=null
# Wait-Die (older waits, younger dies)
# If Ti requests lock held by Tj:
#   if Ti is older: Ti waits
#   if Ti is younger: Ti aborts (dies)

# Wound-Wait (older wounds, younger waits)
# If Ti requests lock held by Tj:
#   if Ti is older: Tj aborts (wounded by Ti)
#   if Ti is younger: Ti waits

# Both prevent deadlock by ensuring one direction of waiting
\`\`\`

**Deadlock Detection:**

\`\`\`text path=null start=null
Wait-For Graph:
• Node for each transaction
• Edge Ti → Tj if Ti is waiting for Tj

If graph has CYCLE → DEADLOCK!

Resolution: Pick a victim transaction and abort it
Victim selection criteria:
• Least work done
• Most locks held
• Newest transaction
• Least likely to deadlock again
\`\`\`

---

## 5. Timestamp-Based Protocols

**Timestamp Ordering:**

\`\`\`text path=null start=null
Each transaction Ti gets timestamp TS(Ti) when it starts.

For each data item X:
• WTS(X) = Timestamp of last successful write
• RTS(X) = Timestamp of last successful read

Read Rule (Ti wants to read X):
• If TS(Ti) < WTS(X): Ti too old, ABORT and restart
• Else: Read OK, update RTS(X) = max(RTS(X), TS(Ti))

Write Rule (Ti wants to write X):
• If TS(Ti) < RTS(X): Someone newer already read, ABORT
• If TS(Ti) < WTS(X): Thomas Write Rule (skip or abort)
• Else: Write OK, update WTS(X) = TS(Ti)
\`\`\`

**Thomas Write Rule:**

\`\`\`text path=null start=null
If TS(Ti) < WTS(X):
• Standard: Abort Ti
• Thomas Rule: Ignore obsolete write (don't abort!)

Why? The value Ti would write is already obsolete.
A newer transaction has already written.
So we can skip Ti's write without affecting correctness.

Benefits: Fewer aborts, better throughput
\`\`\`

---

## 6. Recovery System

**Write-Ahead Logging (WAL):**

\`\`\`text path=null start=null
Rule: Log record written to disk BEFORE data page.

Log Record Format:
<Ti, X, old_value, new_value>

Operations:
UNDO(Ti): Restore X to old_value
REDO(Ti): Apply new_value to X

Recovery guarantees durability even after crash.
\`\`\`

**ARIES Recovery:**

\`\`\`text path=null start=null
ARIES = Algorithms for Recovery and Isolation

Three Phases:
1. ANALYSIS: Scan log, identify dirty pages and active txns
2. REDO: Reapply all logged changes (even for aborted txns)
3. UNDO: Undo changes of uncommitted transactions

Key Concepts:
• LSN (Log Sequence Number): Unique ID for each log record
• Pagelsn: LSN of last log record affecting page
• Checkpointing: Periodic snapshot to limit recovery work
\`\`\`

**Checkpoint:**

\`\`\`text path=null start=null
Checkpoint = Consistent snapshot point in log

Simple Checkpoint:
1. Stop all transactions
2. Write dirty pages to disk
3. Write checkpoint record to log

Fuzzy Checkpoint:
• Allows transactions to continue
• Records active transactions and dirty pages
• Recovery starts from checkpoint
\`\`\`

---

## 7. Isolation Levels

\`\`\`sql path=null start=null
-- SQL Standard Isolation Levels
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\`

| Level | Dirty Read | Non-repeatable Read | Phantom |
|:------|:-----------|:--------------------|:--------|
| Read Uncommitted | ✓ | ✓ | ✓ |
| Read Committed | ✗ | ✓ | ✓ |
| Repeatable Read | ✗ | ✗ | ✓ |
| Serializable | ✗ | ✗ | ✗ |

**Read Phenomena:**

\`\`\`text path=null start=null
Dirty Read:
T1 writes, T2 reads, T1 aborts
→ T2 read uncommitted (dirty) data

Non-repeatable Read:
T1 reads X, T2 updates X, T1 reads X again
→ T1 sees different values for same read!

Phantom Read:
T1 reads rows matching condition, T2 inserts new matching row
→ T1's second read sees "phantom" new rows
\`\`\`

---

## TL;DR - Quick Reference

| Concept | Key Point |
|:--------|:----------|
| ACID | Atomicity, Consistency, Isolation, Durability |
| Conflict | Same item, different txns, at least one write |
| Precedence Graph | No cycle → Conflict serializable |
| 2PL | Growing phase → Shrinking phase |
| Strict 2PL | Hold all locks until commit |
| Deadlock | Cycle in wait-for graph |
| Wait-Die | Older waits, younger dies |
| Wound-Wait | Older wounds, younger waits |
| WAL | Log before data write |
| Checkpoint | Recovery starting point |

---

## 📚 Resources

- [Transaction Processing Concepts](https://www.geeksforgeeks.org/transaction-in-dbms/)
- [Concurrency Control Tutorial](https://www.tutorialspoint.com/dbms/dbms_concurrency_control.htm)
- [ARIES Recovery Algorithm](https://en.wikipedia.org/wiki/Algorithms_for_Recovery_and_Isolation_Exploiting_Semantics)
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "txn-q1",
      question: "ACID property that ensures transaction is 'all or nothing':",
      options: ["Consistency", "Isolation", "Durability", "Atomicity"],
      correctAnswer: 3,
      explanation:
        "ACID Properties:\\n\\n• Atomicity: All operations succeed or all fail\\n• Consistency: Valid state to valid state\\n• Isolation: Concurrent txns don't interfere\\n• Durability: Committed changes persist",
      difficulty: "easy",
    },
    {
      id: "txn-q2",
      question: "Two-Phase Locking guarantees:",
      options: [
        "Deadlock freedom",
        "Conflict serializability",
        "View serializability",
        "Recoverability",
      ],
      correctAnswer: 1,
      explanation:
        "2PL Guarantees:\\n\\n• Ensures CONFLICT SERIALIZABILITY\\n• Does NOT prevent deadlocks\\n• Strict 2PL also provides recoverability\\n\\nGrowing → Lock point → Shrinking",
      difficulty: "medium",
    },
    {
      id: "txn-q3",
      question: "Precedence graph is used to test for:",
      options: [
        "Deadlock",
        "Conflict serializability",
        "Recoverability",
        "Durability",
      ],
      correctAnswer: 1,
      explanation:
        "Precedence Graph:\\n\\n• Edge Ti → Tj if Ti's conflict op precedes Tj's\\n• NO CYCLE = Conflict Serializable\\n• Topological order gives equivalent serial schedule",
      difficulty: "easy",
    },
    {
      id: "txn-q4",
      question:
        "In Wait-Die scheme, when older transaction requests lock held by younger:",
      options: ["Older aborts", "Younger aborts", "Older waits", "Both abort"],
      correctAnswer: 2,
      explanation:
        'Wait-Die Scheme:\\n\\n• If Ti (req) is OLDER than Tj (holds): Ti WAITS\\n• If Ti (req) is YOUNGER: Ti DIES (aborts)\\n\\n"Older has priority - waits or wounds"',
      difficulty: "medium",
    },
    {
      id: "txn-q5",
      question: "Which is NOT a conflict pair?",
      options: ["R1(A), W2(A)", "W1(A), W2(A)", "R1(A), R2(A)", "W1(A), R2(A)"],
      correctAnswer: 2,
      explanation:
        "Conflict Requirements:\\n\\n• Different transactions\\n• Same data item\\n• At least one WRITE\\n\\nR1(A), R2(A) = Both reads, NO conflict!",
      difficulty: "easy",
    },
    {
      id: "txn-q6",
      question: "A schedule is recoverable if:",
      options: [
        "No deadlocks occur",
        "Txn commits after all txns it read from commit",
        "Uses 2PL protocol",
        "All reads are before writes",
      ],
      correctAnswer: 1,
      explanation:
        "Recoverability:\\n\\nSchedule is recoverable if:\\n• If Ti reads from Tj, then Tj commits before Ti commits\\n\\nPrevents cascading rollback problem!\\nStrict 2PL ensures recoverability.",
      difficulty: "hard",
    },
    {
      id: "txn-q7",
      question: "Thomas Write Rule allows:",
      options: [
        "Reading uncommitted data",
        "Skipping obsolete writes",
        "Holding locks longer",
        "Parallel commits",
      ],
      correctAnswer: 1,
      explanation:
        "Thomas Write Rule:\\n\\n• If TS(Ti) < WTS(X): Ti's write is obsolete\\n• Standard: Abort Ti\\n• Thomas Rule: SKIP the write (don't abort)\\n\\nReduces unnecessary aborts!",
      difficulty: "hard",
    },
    {
      id: "txn-q8",
      question:
        "Dirty read anomaly is prevented at which minimum isolation level?",
      options: [
        "Read Uncommitted",
        "Read Committed",
        "Repeatable Read",
        "Serializable",
      ],
      correctAnswer: 1,
      explanation:
        "Isolation Levels (lowest → highest):\\n\\n• Read Uncommitted: Allows dirty read\\n• Read Committed: Prevents dirty read ✓\\n• Repeatable Read: Also prevents non-repeatable\\n• Serializable: Prevents all anomalies",
      difficulty: "medium",
    },
    {
      id: "txn-q9",
      question: "WAL (Write-Ahead Logging) requires:",
      options: [
        "Data written before log",
        "Log written before data",
        "Checkpoint before write",
        "Commit before log",
      ],
      correctAnswer: 1,
      explanation:
        "Write-Ahead Logging:\\n\\n• Log record MUST be written to disk\\n  BEFORE the data page is written\\n• Ensures we can UNDO if crash occurs\\n• Foundation of ARIES recovery",
      difficulty: "medium",
    },
    {
      id: "txn-q10",
      question: "Phantom read occurs when:",
      options: [
        "Reading uncommitted data",
        "Reading deleted rows",
        "New rows appear in range query",
        "Deadlock causes rollback",
      ],
      correctAnswer: 2,
      explanation:
        'Phantom Read:\\n\\n• T1: SELECT * WHERE salary > 50000\\n• T2: INSERT row with salary 60000\\n• T1: Same SELECT sees new "phantom" row!\\n\\nPrevented only at Serializable level.',
      difficulty: "medium",
    },
  ],
};
