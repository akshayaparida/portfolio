import { LearningModule } from "@/types/learning";

export const unit1UninformedSearchModule: LearningModule = {
  id: "unit-1-uninformed-search",
  title: "Unit 1: Introduction, Problem Solving & Uninformed Search",
  description:
    "Foundations of AI, Turing Test, State vs Node, Evaluation Criteria, and Classical Blind Search Algorithms (BFS, DFS, DLS, IDS, UCS, Bidirectional Search) with CIA & UGC NET / JRF focus.",
  status: "completed",
  tags: ["CURAJ MSc CS", "Core 1: 6.0CSC01", "CIA-1 Exam", "UGC NET JRF"],
  videoLectures: [
    {
      id: "lec-state-space-gate-smashers",
      title:
        "Lec-4: What is State Space Search | Problem Solving in Artificial Intelligence",
      channel: "Gate Smashers (Varun Singla)",
      youtubeId: "Jb-w019Jm9w",
      duration: "11:24",
      recommendedSpeed: "1.25x – 1.5x",
      description:
        "Visual conceptual breakdown of State Space Search, initial state, actions, transition models, and state space graph representations in AI.",
      examRelevance: "CURAJ CIA-1 ⭐⭐⭐⭐⭐ | GATE CS & UGC NET",
      keyTopics: [
        "State Space Definition",
        "Initial State & Goal State",
        "Legal Moves & Operators",
        "Search Tree vs State Graph",
      ],
      directUrl: "https://www.youtube.com/watch?v=Jb-w019Jm9w",
    },
    {
      id: "lec-bfs-gate-smashers",
      title:
        "Lec-7: Breadth First Search (BFS) with Example & Trace | Uninformed Search",
      channel: "Gate Smashers (Varun Singla)",
      youtubeId: "qul0f79gxGs",
      duration: "13:45",
      recommendedSpeed: "1.25x – 1.5x",
      description:
        "Detailed step-by-step trace of Breadth-First Search (BFS) using FIFO Queue, level-by-level exploration, completeness proof, and O(b^d) complexity analysis.",
      examRelevance: "CURAJ CIA-1 ⭐⭐⭐⭐⭐ | UGC NET JRF (O(b^d) Trap)",
      keyTopics: [
        "FIFO Queue Frontier",
        "Level-by-level Traversal",
        "Completeness & Optimality",
        "Space Complexity O(b^d)",
      ],
      directUrl: "https://www.youtube.com/watch?v=qul0f79gxGs",
    },
    {
      id: "lec-dfs-gate-smashers",
      title:
        "Lec-8: Depth First Search (DFS) with Example & Backtracking | Uninformed Search",
      channel: "Gate Smashers (Varun Singla)",
      youtubeId: "f8luGFRtshY",
      duration: "12:18",
      recommendedSpeed: "1.25x – 1.5x",
      description:
        "In-depth explanation of Depth-First Search (DFS) using LIFO Stack, deep branch traversal, backtracking mechanics, and why DFS is incomplete in infinite state spaces.",
      examRelevance: "CURAJ CIA-1 ⭐⭐⭐⭐⭐ | GATE CS Complexity Matrix",
      keyTopics: [
        "LIFO Stack Frontier",
        "Backtracking Mechanism",
        "Incompleteness in Infinite Trees",
        "Linear Space O(bm)",
      ],
      directUrl: "https://www.youtube.com/watch?v=f8luGFRtshY",
    },
    {
      id: "lec-water-jug-huddar",
      title:
        "Solution to Water Jug Problem in AI (Production Rules & State Tree)",
      channel: "Dr. Mahesh Huddar",
      youtubeId: "26YyD_K-gpA",
      duration: "11:50",
      recommendedSpeed: "1.25x",
      description:
        "Clear academic walkthrough of the classic 4-Gallon & 3-Gallon Water Jug Problem: formal production rules, state representation (x, y), and the optimal 6-step solution path.",
      examRelevance: "CURAJ CIA-1 Compulsory 5-Mark Question ⭐⭐⭐⭐⭐",
      keyTopics: [
        "State Vector (x, y)",
        "8 Formal Production Rules",
        "Optimal Solution Path (0,0) -> (2,0)",
        "State Transition Table",
      ],
      directUrl: "https://www.youtube.com/watch?v=26YyD_K-gpA",
    },
    {
      id: "lec-missionaries-cannibals-huddar",
      title:
        "Missionaries and Cannibals Problem Formulation & Constraints in AI",
      channel: "Dr. Mahesh Huddar",
      youtubeId: "i7oB0OGU3fc",
      duration: "14:10",
      recommendedSpeed: "1.25x",
      description:
        "Step-by-step solution to the Missionaries and Cannibals River Crossing problem: safety constraints (M >= C on both banks), state vector (M, C, B), and 11-step optimal sequence.",
      examRelevance: "CURAJ CIA-1 Long Answer (10 Marks) ⭐⭐⭐⭐⭐",
      keyTopics: [
        "State Vector (M, C, B)",
        "Cannibal Safety Constraint",
        "Legal Boat Operations",
        "11-Step Transition Sequence",
      ],
      directUrl: "https://www.youtube.com/watch?v=i7oB0OGU3fc",
    },
    {
      id: "lec-search-khemani-nptel",
      title: "AI Search Methods for Problem Solving: State Space Foundations",
      channel: "Prof. Deepak Khemani (IIT Madras / NPTEL)",
      youtubeId: "531599865",
      duration: "42:30",
      recommendedSpeed: "1.5x",
      description:
        "Authoritative lecture by Prof. Deepak Khemani (author of 'A First Course in Artificial Intelligence', the official CURAJ prescribed textbook) covering state space representation and graph search foundations.",
      examRelevance:
        "CURAJ Official Syllabus Reference Textbook Author ⭐⭐⭐⭐⭐",
      keyTopics: [
        "State Space Graph vs Tree",
        "Systematic Exploration",
        "Uninformed Search Criteria",
        "Branching Factor & Depth Proofs",
      ],
      directUrl: "https://www.youtube.com/watch?v=531599865",
    },
  ],
  resources: [
    {
      title: "Gate Smashers: Complete Artificial Intelligence Playlist",
      url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
      type: "video",
    },
    {
      title:
        "NPTEL: AI Search Methods for Problem Solving (Prof. Deepak Khemani, IIT Madras)",
      url: "https://nptel.ac.in/courses/106106226",
      type: "course",
    },
    {
      title: "Dr. Mahesh Huddar: Water Jug Problem Step-by-Step in AI",
      url: "https://www.youtube.com/watch?v=Jb1N15lW7W0",
      type: "video",
    },
    {
      title: "Dr. Mahesh Huddar: Missionaries and Cannibals Problem in AI",
      url: "https://www.youtube.com/watch?v=kYJ7Z0wB_P0",
      type: "video",
    },
    {
      title:
        "Stuart Russell & Peter Norvig: AIMA 4th Edition Official Code Repository",
      url: "https://github.com/aimacode/aima-python",
      type: "documentation",
    },
  ],
  detailedContent: `# Unit 1: Introduction, Problem Solving & Uninformed Search

> **CURAJ M.Sc. Computer Science — Course Code: 6.0CSC01 (Core 1, 4 Credits)**  
> **Textbooks Aligned**: Stuart Russell & Peter Norvig (*AIMA 4th Ed.*), David Poole & Alan Mackworth (*Foundations of Computational Agents 3rd Ed.*), Deepak Khemani (*A First Course in AI*).  
> **Exam Weightage**: Primary focus of **Continuous Internal Assessment 1 (CIA-1)** (~20 Marks) and high-yield topic for **UGC NET / JRF (Paper II Computer Science)** and **GATE CS**.

---

## Unit Overview & Learning Goals

1. **Foundations of AI**: The four conceptual approaches (Acting Humanly, Thinking Humanly, Thinking Rationally, Acting Rationally).
2. **Historical Milestones**: Dartmouth 1956, AI Winters, Expert Systems, and the Modern Agentic Paradigm.
3. **The Turing Test & Philosophy**: Standard Test, Total Turing Test, Chinese Room Argument, and Loebner Prize.
4. **Problem Solving & State-Space Formulation**: Initial state, Actions, Transition model, Goal test, and Path cost function.
5. **State Space vs. Solution Space**: Representation differences across toy and real-world problems.
6. **State vs. Node Distinction**: Why a state in the world is fundamentally distinct from a node in a search tree.
7. **Search Strategy Evaluation Metrics**: Mathematical formulations of Completeness, Time Complexity, Space Complexity, and Optimality ($b, d, m, \\epsilon$).
8. **Uninformed (Blind) Search Algorithms**:
   - Breadth-First Search (BFS)
   - Depth-First Search (DFS)
   - Depth-Limited Search (DLS)
   - Iterative Deepening Search (IDS / IDDFS)
   - Uniform Cost Search (UCS / Dijkstra's variant)
   - Bidirectional Search
9. **CIA-1 University Model Problems**: Subjective proofs, step-by-step traces, and state-space formulations.
10. **UGC NET / JRF PYQ Corner**: High-frequency exam traps, trick questions, and quick revision cheatsheet.

---

## 0. 🎬 Video-First Lecture Roadmap & Exam Strategy Matrix

> [!TIP]
> **Study Workflow (First Video $\\to$ Then Text Notes $\\to$ Then Exam Answers)**:
> 1. **Watch On-The-Go First (10–15 mins)**: Select any lecture from the **Curated Video Hub** above. Watch at $1.25\\times$ or $1.5\\times$ speed to understand the physical and visual intuition (e.g. how water is transferred between jugs, or how a FIFO queue expands nodes level-by-level).
> 2. **Study Bookish Notes Second**: Read the formal mathematical formulations below. In CURAJ semester exams, CIA-1 tests, and competitive exams, marks are awarded for formal 5-tuple specifications $(S, A, T, G, c)$, production rule tables, and exact Big-$O$ complexity derivations.
> 3. **Revise University Model Answers (Section 6)**: Study the exact standard answers for compulsory 5-mark and 10-mark questions.
> 4. **Master Formula Cheat Sheet (Section 8)**: Memorize the comparison matrix, uniform tree node sums, and inversion parity rules.
> 5. **Practice Interactive Quiz**: Attempt the 18 timed questions with step-by-step solutions below.

### 📚 Syllabus-to-Video & Exam Alignment Matrix

| Syllabus Topic | Curated YouTube Lecture | Prescribed Textbook Reference | University Exam Focus (CIA-1) | UGC NET JRF / GATE CS Trap |
|:---|:---|:---|:---|:---|
| **AI Foundations & Approaches** | [Gate Smashers: Introduction to AI](https://www.youtube.com/watch?v=s-s9ilkMVj8) | Russell & Norvig (*AIMA*) Ch 1; Khemani Ch 1 | 2-Mark: Define Rational Agent; 4 Approaches matrix | Differentiating "Thinking Rationally" (Logic) vs "Acting Rationally" (Expected Utility) |
| **State Space Formulation** | [Gate Smashers: State Space Search (Lec-4)](https://www.youtube.com/watch?v=E5jVBqe59EE) | Deepak Khemani (*A First Course in AI*) Ch 2 | 5-Mark: State 5-tuple $(S, A, T, G, c)$ with 8-Puzzle example | Confusing state in world vs search node in tree (path, parent, depth, cost) |
| **Water Jug Problem** | [Dr. Mahesh Huddar: Water Jug Problem Step-by-Step](https://www.youtube.com/watch?v=26YyD_K-gpA) | Rich & Knight Ch 2; CURAJ Syllabus Core 1 | 5-Mark Compulsory: Write all 8 formal production rules and show optimal path to $(2, 0)$ | Forgetting edge conditions (e.g. $x + y \\ge 4$ vs $x + y < 4$ in pour operations) |
| **Missionaries & Cannibals** | [Dr. Mahesh Huddar: Missionaries & Cannibals Formulation](https://www.youtube.com/watch?v=i7oB0OGU3fc) | Russell & Norvig Ch 3; Poole & Mackworth Ch 3 | 10-Mark Long Answer: State vector $(M, C, B)$, safety constraints on both banks, and 11-step solution | Overlooking that constraint $M \\ge C$ applies to **both** banks whenever $M > 0$ |
| **Breadth-First Search (BFS)** | [Gate Smashers: BFS with Example (Lec-7)](https://www.youtube.com/watch?v=qul0f79gxGs) | Russell & Norvig Ch 3.4.1; Khemani Ch 2 | 5-Mark: Algorithm trace using FIFO queue, proof of optimality for unit step costs | Memory explosion: $O(b^d)$ space is the fatal bottleneck, NOT time |
| **Depth-First Search (DFS)** | [Gate Smashers: DFS with Example (Lec-8)](https://www.youtube.com/watch?v=f8luGFRtshY) | Russell & Norvig Ch 3.4.3; Khemani Ch 2 | 5-Mark: Algorithm trace using LIFO stack, backtracking mechanism | Incompleteness in infinite state spaces or graph search with cycles |
| **Iterative Deepening (IDS)** | [Gate Smashers: DLS & IDS in AI (Lec-13)](https://www.youtube.com/watch?v=0-vP781wblQ) | Russell & Norvig Ch 3.4.5; Khemani Ch 2 | 10-Mark: Prove that overhead of repeated node generation is $\\le \\frac{b}{b-1}$ | Thinking IDS is inefficient; for $b \\ge 2$, bottom level dominates ($> 50\\%$ of nodes) |
| **Uniform Cost Search (UCS)** | [Gate Smashers: Uniform Cost Search (UCS)](https://www.youtube.com/watch?v=w5Xawyfrf0s) | Russell & Norvig Ch 3.4.2; Khemani Ch 3 | 5-Mark: Priority queue $g(n)$ expansion; why goal test must be applied at dequeue | Applying goal test at generation instead of expansion (destroys optimality) |
| **8-Puzzle Solvability** | [Gate Smashers: 8-Puzzle Problem Formulation (Lec-14)](https://www.youtube.com/watch?v=_CrEYrcImv0) | Russell & Norvig Ch 3.2; Khemani Ch 2 | 5-Mark: Inversion count definition & parity preservation theorem | Total states $9! = 362{,}880$, but reachable state space is exactly half $\\frac{9!}{2} = 181{,}440$ |

---

## 1. Introduction to Artificial Intelligence

\`\`\`video
{
  "id": "s-s9ilkMVj8",
  "title": "Lec-3: What is Artificial Intelligence | Can Machines Think?",
  "channel": "Gate Smashers (Varun Singla)",
  "duration": "11:32",
  "speed": "1.25x – 1.5x",
  "relevance": "CURAJ CIA-1 2-Mark & 5-Mark | UGC NET JRF",
  "takeaway": "Watch this 11-min lecture to gain clear intuition on AI definitions, human vs rational agent paradigms, and problem spaces before reading the detailed textbook notes below."
}
\`\`\`

### 1.1 The Four Conceptual Approaches (Russell & Norvig)

In classical AI literature (*Russell & Norvig*), definitions of Artificial Intelligence are categorized along two independent dimensions:
1. **Thought processes & reasoning** versus **Behavior & action**.
2. **Measuring success against human fidelity** versus **Measuring success against an ideal concept of intelligence (Rationality)**.

| | Human-Centered Criterion | Rationality-Centered Criterion |
|---|---|---|
| **Thinking** | **Thinking Humanly**<br>• Cognitive Science & Modeling<br>• Validated via introspection & psychological testing | **Thinking Rationally**<br>• "Laws of Thought" approach (Formal Logic)<br>• Aristotle's syllogisms, automated deduction |
| **Acting** | **Acting Humanly**<br>• The Turing Test approach<br>• Acting indistinguishably from a human | **Acting Rationally**<br>• The Rational Agent approach (*AIMA focus*)<br>• Maximizing expected utility given available percepts |

\`\`\`
                       [THINKING]
                           ▲
     Thinking Humanly      │      Thinking Rationally
   (Cognitive Science)     │       (Laws of Thought)
                           │
[HUMAN] ───────────────────┼─────────────────── [RATIONAL]
                           │
      Acting Humanly       │       Acting Rationally
     (The Turing Test)     │       (Rational Agents)
                           ▼
                        [ACTING]
\`\`\`

#### Why Modern AI Focuses on "Acting Rationally"
- **Standard of Rationality is Mathematically Well-Defined**: Rational behavior aims to maximize an expected performance measure given the prior background knowledge and sequence of perceptions.
- **Scientific Generalizability**: Rationality is not tethered to human biological or evolutionary quirks (e.g., optical illusions, emotional fatigue, cognitive biases). An airplane flies rationally by aerodynamics without flapping its wings like a pigeon.

---

### 1.2 Historical Milestones & Chronology

| Era / Year | Milestone | Key Contributors & Impact |
|---|---|---|
| **1943** | First Mathematical Model of Artificial Neuron | **Warren McCulloch & Walter Pitts**: Boolean threshold logic networks modeling biological neurons. |
| **1950** | "Computing Machinery and Intelligence" | **Alan Turing**: Introduced the Imitation Game (Turing Test), machine learning concepts, genetic algorithms. |
| **1956** | The Dartmouth Summer Research Project | **John McCarthy, Marvin Minsky, Nathaniel Rochester, Claude Shannon**: Coined the term *"Artificial Intelligence"*. Logic Theorist program demonstrated by Allen Newell & Herbert Simon. |
| **1965** | Resolution Refutation Principle | **J. Alan Robinson**: Foundational complete inference algorithm for first-order predicate logic. |
| **1966–1974** | Early Enthusiasm & Combinatorial Explosion | Microworlds (SHRDLU by Winograd), General Problem Solver (GPS). Ended in the **First AI Winter** due to compute limitations and intractable search spaces (Lighthill Report, 1973). |
| **1980–1987** | Rise of Knowledge-Based Expert Systems | **DENDRAL** (Feigenbaum), **MYCIN** (Shortliffe), **R1/XCON** (McDermott). The **Second AI Winter** followed the collapse of specialized LISP machine hardware. |
| **1990s–2000s** | Probabilistic Revolution & Statistical Learning | Judea Pearl's **Bayesian Networks**, Vapnik's **Support Vector Machines**, Deep Blue defeats Garry Kasparov (1997). |
| **2012–Present** | Deep Learning, Transformers & Agentic AI | AlexNet (2012), Attention Mechanisms & Transformers (Vaswani et al., 2017), Large Language Models, Multi-Agent Reasoning Systems. |

---

### 1.3 The Turing Test & Philosophical Debates

Proposed by **Alan Turing (1950)** in his seminal paper *"Computing Machinery and Intelligence"*:

\`\`\`
+--------------------+        Teletype Text
|  Human Interrogator| <─────────────────────────> [ Wall / Terminal ]
+--------------------+                                   ▲
                                                         │
                                        +----------------+---------------+
                                        │                                │
                                        ▼                                ▼
                             +--------------------+            +--------------------+
                             |  Human Respondent  |            |  AI System / Agent |
                             +--------------------+            +--------------------+
\`\`\`

#### Key Components Tested:
1. **Natural Language Processing (NLP)**: To communicate fluently in English.
2. **Knowledge Representation**: To store what it knows or hears.
3. **Automated Reasoning**: To answer questions and draw new logical conclusions.
4. **Machine Learning**: To adapt to new circumstances and detect patterns.

#### The Total Turing Test:
Extends the standard test by requiring a physical interface to test interaction with objects:
- **Computer Vision**: To perceive physical objects presented by the interrogator.
- **Robotics & Manipulation**: To move and manipulate physical objects.

#### Philosophical Critique: John Searle's Chinese Room Argument (1980)
- **Premise**: A person in a closed room follows formal English rules (a syntax lookup program) to manipulate Chinese symbols. To outside native Chinese speakers, the output answers are indistinguishable from a fluent speaker.
- **Core Thesis**: *Syntax does not equate to semantics*. Simulating understanding is not the same as genuine understanding (Weak AI vs. Strong AI).

---

## 2. Problem Solving as State-Space Search

\`\`\`video
{
  "id": "E5jVBqe59EE",
  "title": "Lec-4: What is State Space Search | Problem Solving in AI",
  "channel": "Gate Smashers (Varun Singla)",
  "duration": "10:48",
  "speed": "1.25x",
  "relevance": "CURAJ CIA-1 5-Mark Compulsory Question | UGC NET JRF",
  "takeaway": "Watch this lecture to see how states, actions, transition models, and state spaces are visualized mathematically before reading the 5-tuple formalization and 8-puzzle walkthrough below."
}
\`\`\`

A problem can be formally defined as a **collection of information and mathematical constraints** that an agent uses to decide what actions to take.

### 2.1 Formal 5-Tuple Problem Formulation

Every well-defined search problem consists of 5 mathematical components:

1. **Initial State ($S_0$)**: The starting state in which the agent begins.
2. **Actions Function ($Actions(s)$)**: Returns the legal set of actions executable in state $s$:
   $$\\text{Actions}(s) = \{a_1, a_2, \\dots, a_k\}$$
3. **Transition Model ($Result(s, a)$)**: A deterministic function describing the outcome state of applying action $a$ to state $s$:
   $$s' = Result(s, a)$$
4. **Goal Test ($IsGoal(s)$)**: A Boolean predicate determining whether state $s$ satisfies the goal conditions (explicit single goal or implicit property test).
5. **Path Cost Function ($c(s, a, s')$)**: Cost assigned to stepping from $s$ to $s'$ via action $a$. The total path cost $g(n)$ is the sum of step costs along the trajectory:
   $$g(n) = \sum_{i=1}^k c(s_{i-1}, a_i, s_i)$$

A **Solution** is an action sequence mapping $S_0$ to a goal state. An **Optimal Solution** has the lowest total path cost among all solutions.

---

### 2.2 State Space vs. Solution Space

- **State Space**: The set of all possible configurations reachable from the initial state by any sequence of valid actions. Search algorithms navigate this graph.
- **Solution Space**: The set of valid candidate solutions (complete state configurations or paths). Common in optimization techniques (e.g., Genetic Algorithms, Simulated Annealing) where each point is already a complete candidate configuration.

#### Classic Examples:
1. **8-Puzzle**:
   - *State Space*: All $9! / 2 = 181,440$ reachable permutations of tiles.
   - *Action*: Blank tile moves Left, Right, Up, Down.
2. **8-Queens**:
   - *Incremental Formulation (State Space)*: Start with an empty board; add a queen to each column without conflict ($8^8$ states max).
   - *Complete-State Formulation (Solution Space)*: Start with all 8 queens on board, move queens within columns to eliminate conflicts.
3. **Water Jug Problem (4-Gallon & 3-Gallon Jugs, target 2 gallons)**:
   - *State*: Pair $(x, y)$ where $x \\in \{0, 1, 2, 3, 4\}$ and $y \\in \{0, 1, 2, 3\}$.
   - *Actions*: Fill jug, Empty jug, Pour from one jug to another until full or empty.

---

### 2.3 State vs. Node Distinction (Crucial Exam Concept!)

A frequent source of student confusion in CIA and semester exams is confusing a **State** with a **Search Node**:

\`\`\`
PHYSICAL WORLD: STATE                      DATA STRUCTURE: SEARCH NODE
┌─────────────────────────┐               ┌──────────────────────────────────────────┐
│  State:                 │               │ Node Data Structure:                     │
│  "Arad"                 │               │ • State: "Arad"                          │
│  (Physical location or  │ ◄──────────── │ • Parent Node: Pointer to "Sibiu"        │
│   board configuration)  │               │ • Action: "DriveToArad"                  │
│                         │               │ • Path Cost g(n): 140 + 118 = 258        │
│                         │               │ • Depth d: 2                             │
└─────────────────────────┘               └──────────────────────────────────────────┘
\`\`\`

| Dimension | State | Search Node |
|---|---|---|
| **What it is** | A representation of a physical configuration of the world. | A bookkeeping data structure within the search tree. |
| **Uniqueness** | Unique in the state space graph (e.g., city "Arad" exists once). | Multiple nodes can represent the exact same state if reached via different paths! |
| **Components** | Features of the environment (e.g., coordinates, tile positions). | \`node.STATE\`, \`node.PARENT\`, \`node.ACTION\`, \`node.PATH_COST\` ($g$), \`node.DEPTH\` ($d$). |
| **Generated By** | The environment transition model $Result(s, a)$. | The search algorithm expanding a parent node in memory. |

---

### 2.4 State Space Graph vs. Search Tree

- **State Space Graph**: Mathematical directed graph $G = (V, E)$ where vertices are states and edges are actions. May contain directed cycles and loops.
- **Search Tree**: A tree representing explicit paths through the state space rooted at $S_0$. If paths can contain loops, an infinite search tree can be generated from a finite state space graph!

> **Graph Search vs. Tree Search**:
> Graph search augments tree search with an **Explored Set (Closed List)** to discard any newly generated node whose state has already been expanded or exists in the frontier with lower cost. This prevents infinite cycles.

---

### 2.5 Classical Problem Formulations & Production Rules (University Favorites)

#### 1. The Water Jug Problem

\`\`\`video
{
  "id": "26YyD_K-gpA",
  "title": "Solution to Water Jug Problem Step-by-Step in AI",
  "channel": "Dr. Mahesh Huddar",
  "duration": "09:42",
  "speed": "1.25x",
  "relevance": "CURAJ CIA-1 5-Mark Compulsory Question ⭐⭐⭐⭐⭐",
  "takeaway": "Watch this video to master the state transitions (x, y) and how to apply each of the 8 production rules systematically before writing out the state table in your examination."
}
\`\`\`
- **Problem**: Given a 4-gallon jug and a 3-gallon jug, neither having measuring markings, and an endless water pump, measure exactly 2 gallons in the 4-gallon jug.
- **State Representation**: An ordered pair $(x, y)$ where $x \\in \{0, 1, 2, 3, 4\}$ denotes gallons in the 4-gallon jug, and $y \\in \{0, 1, 2, 3\}$ denotes gallons in the 3-gallon jug.
- **Initial State**: $(0, 0)$
- **Goal State**: $(2, y)$ for any $y \\in \{0, 1, 2, 3\}$.
- **Formal Production Rules**:

| Rule # | Current State Condition | Action Taken | Resulting State | Description |
|---|---|---|---|---|
| **R1** | $(x < 4, y)$ | Fill 4-Gallon Jug | $(4, y)$ | Fill the 4-gallon jug to the brim |
| **R2** | $(x, y < 3)$ | Fill 3-Gallon Jug | $(x, 3)$ | Fill the 3-gallon jug to the brim |
| **R3** | $(x > 0, y)$ | Empty 4-Gallon Jug | $(0, y)$ | Dump all water from 4-gallon jug |
| **R4** | $(x, y > 0)$ | Empty 3-Gallon Jug | $(x, 0)$ | Dump all water from 3-gallon jug |
| **R5** | $(x + y \\ge 4, y > 0)$ | Pour 3G into 4G until full | $(4, y - (4 - x))$ | Pour from 3G to 4G until 4G is full |
| **R6** | $(x + y \\ge 3, x > 0)$ | Pour 4G into 3G until full | $(x - (3 - y), 3)$ | Pour from 4G to 3G until 3G is full |
| **R7** | $(x + y \\le 4, y > 0)$ | Pour all 3G into 4G | $(x + y, 0)$ | Empty 3G completely into 4G |
| **R8** | $(x + y \\le 3, x > 0)$ | Pour all 4G into 3G | $(0, x + y)$ | Empty 4G completely into 3G |

- **Optimal Solution Trajectory (6 Steps)**:
  $$(0, 0) \\to (0, 3) \\to (3, 0) \\to (3, 3) \\to (4, 2) \\to (0, 2) \\to (2, 0) \\quad [\\text{Goal Reached: } x=2]$$

---

#### 2. The Missionaries and Cannibals Problem

\`\`\`video
{
  "id": "i7oB0OGU3fc",
  "title": "Missionaries and Cannibals Problem Solved Example in AI",
  "channel": "Dr. Mahesh Huddar",
  "duration": "10:15",
  "speed": "1.25x",
  "relevance": "CURAJ CIA-1 10-Mark Long Answer Question ⭐⭐⭐⭐⭐",
  "takeaway": "Watch this video to visualize valid boat operations and safety constraints (M >= C on both banks) before writing out the state vector (M, C, B) and 11-step solution sequence in your exam."
}
\`\`\`
- **Problem**: 3 Missionaries and 3 Cannibals must cross a river using a boat carrying at most 2 people. If cannibals ever outnumber missionaries on either bank, the missionaries are eaten.
- **State Representation**: Vector $(M, C, B)$ representing count of Missionaries, Cannibals, and Boat location on the near bank ($B \\in \{1, 0\}$, where $1 = \\text{near}, 0 = \\text{far}$).
- **Initial State**: $(3, 3, 1)$
- **Goal State**: $(0, 0, 0)$
- **Safety Constraint**: On both near and far banks, $M \\ge C$ whenever $M > 0$. That is:
  $$\\forall \\text{ bank}: \\quad M = 0 \\quad \\lor \\quad M \\ge C$$
- **Permissible Boat Actions ($\\Delta M, \\Delta C$)**:
  $\{(1, 0), (2, 0), (0, 1), (0, 2), (1, 1)\}$.
- **Optimal 11-Step Crossing Sequence**:
  $$(3,3,1) \\to (3,1,0) \\to (3,2,1) \\to (3,0,0) \\to (3,1,1) \\to (1,1,0) \\to (2,2,1) \\to (0,2,0) \\to (0,3,1) \\to (0,1,0) \\to (0,2,1) \\to (0,0,0)$$

---

#### 3. 8-Puzzle Solvability & Inversion Parity Criterion (UGC NET & GATE High-Yield)

\`\`\`video
{
  "id": "_CrEYrcImv0",
  "title": "Lec-14: 8-Puzzle Problem in AI without Heuristic | All Important Points",
  "channel": "Gate Smashers (Varun Singla)",
  "duration": "12:05",
  "speed": "1.25x",
  "relevance": "CURAJ CIA-1 5-Mark Question | Inversion Count Parity Proof",
  "takeaway": "Watch this video to visualize the 3x3 sliding tile state space and understand why exactly half (181,440) of the 9! states are reachable from any initial configuration."
}
\`\`\`
- An **Inversion** occurs whenever a tile with a higher number appears before a tile with a lower number in linear row-major array order (omitting the blank tile).
- **Parity Invariant Theorem**:
  - Horizontal blank moves shift tiles within the same row: **0 inversions changed**.
  - Vertical blank moves jump a tile over exactly 2 other tiles: **inversions change by $0, +2,$ or $-2$**.
  - Therefore, the **parity (even vs. odd) of the inversion count is an invariant** under all valid sliding moves!
- **Solvability Condition**:
  $$\\text{State } S \\text{ can reach Goal } G \\iff \\text{InversionParity}(S) \\equiv \\text{InversionParity}(G) \\pmod 2$$
  Because the standard goal has 0 inversions (even), **exactly half ($9! / 2 = 181,440$) of all configurations are reachable**, and odd configurations are mathematically impossible to solve!

---

## 3. Evaluating Search Strategies

Every search algorithm is evaluated along four fundamental performance dimensions:

1. **Completeness**: Does the algorithm always find a solution if one exists? If no solution exists, does it correctly report failure?
2. **Time Complexity**: How long does it take to find a solution? Typically quantified as the **number of nodes generated / expanded**.
3. **Space Complexity**: How much working memory does the algorithm require? Quantified as the **maximum number of nodes stored concurrently in memory**.
4. **Optimality**: Does the strategy always find the solution with the lowest path cost $g(n)$ among all possible solutions?

### Standard Notation Parameters:
- **$b$ (Branching Factor)**: Maximum number of successors (children) of any node.
- **$d$ (Shallowest Goal Depth)**: Depth of the shallowest goal node in the search tree.
- **$m$ (Maximum Depth)**: Maximum depth of the state space (can be $\\infty$ in spaces with infinite loops).
- **$\\epsilon$ (Minimum Step Cost)**: Smallest positive edge cost (strictly $\\epsilon > 0$).
- **$C^*$ (Optimal Solution Cost)**: Cost of the optimal path.

---

## 4. Uninformed (Blind) Search Algorithms

Uninformed search algorithms operate **solely with problem formulation specifications** ($S_0$, $Actions$, $Result$, $GoalTest$, $c$). They possess no domain-specific heuristic knowledge regarding how close a given state is to the goal.

\`\`\`
                               UNINFORMED SEARCH
                                       │
        ┌───────────────────┬──────────┴─────────┬───────────────────┐
        ▼                   ▼                    ▼                   ▼
 Breadth-First (BFS)  Depth-First (DFS)   Uniform Cost (UCS)   Iterative Deepening (IDS)
  • Queue (FIFO)       • Stack (LIFO)      • Priority Queue     • Incremental Depth Cutoff
  • Level-by-level     • Deepest path      • Min path cost g(n) • Linear space O(bd)
  • High memory O(bᵈ)  • Linear space O(bm)• Optimal for any c  • Optimal for unit cost
\`\`\`

---

### 4.1 Breadth-First Search (BFS)

\`\`\`video
{
  "id": "qul0f79gxGs",
  "title": "Lec-7: Breadth First Search (BFS) with Example & Trace | Uninformed Search",
  "channel": "Gate Smashers (Varun Singla)",
  "duration": "13:45",
  "speed": "1.25x – 1.5x",
  "relevance": "CURAJ CIA-1 5-Mark Question | UGC NET JRF (O(b^d) Trap)",
  "takeaway": "Watch this lecture to see level-by-level queue exploration animated before studying the formal BFS pseudocode, completeness proof, and O(b^d) time/space derivation below."
}
\`\`\`

#### Mechanism:
- The **Frontier** is implemented as a **First-In, First-Out (FIFO) Queue**.
- Nodes are expanded strictly level-by-level. Root is expanded first, then all successors of the root, then their successors.
- **Early Goal Test**: The goal test is applied to each node **at generation time**, rather than expansion time.

\`\`\`python
from collections import deque

def breadth_first_search(problem):
    node = Node(problem.initial_state)
    if problem.is_goal(node.state):
        return solution(node)
    
    frontier = deque([node])  # FIFO Queue
    explored = set()          # Closed Set
    
    while frontier:
        node = frontier.popleft()
        explored.add(node.state)
        
        for action in problem.actions(node.state):
            child = child_node(problem, node, action)
            if child.state not in explored and child.state not in frontier:
                if problem.is_goal(child.state):
                    return solution(child)
                frontier.append(child)
    return None
\`\`\`

#### Performance Analysis:
- **Completeness**: **Yes** (if branching factor $b$ is finite).
- **Time Complexity**:
  $$1 + b + b^2 + b^3 + \\dots + b^d = O(b^d)$$
- **Space Complexity**: All frontier and explored nodes must remain in memory:
  $$O(b^d)$$
- **Optimality**: **Yes** if and only if **all step costs are identical / uniform (e.g., unit cost = 1)**. In general weighted graphs, BFS is *not* optimal.

> **Critical Bottleneck of BFS**:
> Memory (Space) is the true fatal constraint of BFS. For $b = 10, d = 12$, storing $10^{12}$ nodes at 1 KB/node requires **1,000 Terabytes (1 Petabyte)** of RAM! Memory exhaustion occurs long before compute limits.

---

### 4.2 Depth-First Search (DFS)

\`\`\`video
{
  "id": "f8luGFRtshY",
  "title": "Lec-8: Depth First Search (DFS) with Example & Backtracking | Uninformed Search",
  "channel": "Gate Smashers (Varun Singla)",
  "duration": "12:18",
  "speed": "1.25x – 1.5x",
  "relevance": "CURAJ CIA-1 5-Mark Question | GATE CS Space Complexity",
  "takeaway": "Watch this lecture to master deep-branch exploration and backtracking on a stack before memorizing why DFS achieves linear space O(bm) but is incomplete in infinite state spaces."
}
\`\`\`

#### Mechanism:
- The **Frontier** is implemented as a **Last-In, First-Out (LIFO) Stack** (or call-stack via recursion).
- Always expands the deepest unexpanded node in the current frontier. It drops down along a single branch until a dead-end (leaf without goal) is hit, then backtracks.

\`\`\`python
def depth_first_search(problem):
    frontier = [Node(problem.initial_state)]  # LIFO Stack
    explored = set()
    
    while frontier:
        node = frontier.pop()  # Pop latest (deepest)
        if problem.is_goal(node.state):
            return solution(node)
        
        explored.add(node.state)
        for action in problem.actions(node.state):
            child = child_node(problem, node, action)
            if child.state not in explored and child not in frontier:
                frontier.append(child)
    return None
\`\`\`

#### Performance Analysis:
- **Completeness**:
  - *Graph Search on finite spaces*: **Yes**.
  - *Tree Search or infinite spaces*: **No** (can get trapped in infinite depth paths or loops even if a shallow goal exists on another branch).
- **Time Complexity**: In the worst case, must explore every node in the tree up to maximum depth $m$:
  $$O(b^m)$$
- **Space Complexity**: **$O(bm)$** — The massive virtue of DFS! Only stores the path from root to current node plus unexpanded siblings at each level.
- **Optimality**: **No**. DFS can return an arbitrarily deep, inefficient path to a goal on its first plunge, ignoring a 1-step solution on an adjacent branch.

---

### 4.3 Depth-Limited Search (DLS)

#### Mechanism:
DFS augmented with a predetermined depth limit $l$. Nodes at depth $l$ are treated as if they have no successors.
- Addresses the infinite-depth failure mode of DFS.
- Returns three possible outcomes:
  1. \`solution\`: Goal found.
  2. \`failure\`: Entire search space within limit exhausted without goal.
  3. \`cutoff\`: Goal not found within limit $l$, but deeper nodes existed.

#### Performance Analysis:
- **Completeness**: **No** if $d > l$ (goal is deeper than cutoff). **Yes** if $l \\ge d$ in finite spaces.
- **Time Complexity**: $O(b^l)$
- **Space Complexity**: $O(bl)$
- **Optimality**: **No** (even if $l > d$, it may find a suboptimal goal first).

---

### 4.4 Iterative Deepening Search (IDS / IDDFS)

\`\`\`video
{
  "id": "0-vP781wblQ",
  "title": "Lec-13: Iterative Deepening Depth-First Search (IDDFS) | AI",
  "channel": "Gate Smashers (Varun Singla)",
  "duration": "11:50",
  "speed": "1.25x",
  "relevance": "CURAJ CIA-1 10-Mark Compulsory Question ⭐⭐⭐⭐⭐",
  "takeaway": "Watch this video to see why IDS combines the completeness and optimality of BFS with the linear space efficiency of DFS, and why repeating shallow levels incurs very little overhead."
}
\`\`\`

#### Mechanism:
Iterative Deepening Search systematically finds the optimal depth limit by running successive Depth-Limited Searches with increasing limits $l = 0, 1, 2, 3, \\dots, d$:

\`\`\`
Level 0:  (l = 0)  Root
Level 1:  (l = 1)  Root ──> Successors (Depth 1)
Level 2:  (l = 2)  Root ──> Depth 1 ──> Successors (Depth 2)
Level 3:  (l = 3)  Root ──> Depth 1 ──> Depth 2 ──> Successors (Depth 3)
\`\`\`

\`\`\`python
def iterative_deepening_search(problem):
    depth = 0
    while True:
        result = depth_limited_search(problem, depth)
        if result != "cutoff":
            return result
        depth += 1
\`\`\`

#### The Mathematical "Overhead" Paradox:
A common intuitive objection is that IDS is wasteful because it repeatedly regenerates upper levels. Let's calculate the exact total nodes generated:
- In level $d$, nodes generated $1$ time: $b^d$
- In level $d-1$, nodes generated $2$ times: $2 b^{d-1}$
- In level $1$, nodes generated $d$ times: $d \\cdot b$

$$\\text{Total Nodes} = d \\cdot b + (d-1)b^2 + (d-2)b^3 + \\dots + 1 \\cdot b^d$$

**Concrete Comparison ($b = 10, d = 5$):**
- **BFS Nodes**: $1 + 10 + 100 + 1,000 + 10,000 + 100,000 = 111,111$
- **IDS Nodes**: $5(10) + 4(100) + 3(1,000) + 2(10,000) + 1(100,000) = 123,450$
- **Overhead**: Only $\\approx 11$%! Because an exponential tree has the vast majority of its nodes in the bottom leaf layer.

#### Performance Analysis:
- **Completeness**: **Yes** (if $b$ is finite).
- **Time Complexity**: $O(b^d)$ (Same asymptotic order as BFS).
- **Space Complexity**: **$O(bd)$** (Linear memory of DFS!).
- **Optimality**: **Yes** (for unit step costs).

> **CURAJ Exam Takeaway**:  
> **IDS is the preferred uninformed search strategy** when the search space is large and the solution depth $d$ is not known in advance. It combines the **optimality and completeness of BFS** with the **minimal linear memory footprint of DFS**.

---

### 4.5 Uniform Cost Search (UCS)

\`\`\`video
{
  "id": "w5Xawyfrf0s",
  "title": "Introduction to Uniform Cost Search (UCS) | Artificial Intelligence",
  "channel": "Gate Smashers (Varun Singla)",
  "duration": "13:20",
  "speed": "1.25x",
  "relevance": "CURAJ CIA-1 5-Mark Question | GATE CS Optimal Search",
  "takeaway": "Watch this video to understand why UCS expands the node with minimum path cost g(n) and why the goal test must be applied at dequeue/expansion time rather than generation time."
}
\`\`\`

#### Mechanism:
- Extends BFS to arbitrary non-negative step costs $c(s, a, s')$. Equivalent to **Dijkstra's Algorithm** adapted for search trees.
- **Frontier**: Priority Queue ordered by **cumulative path cost $g(n)$**.
- Expands the node with the lowest path cost $g(n)$ across the entire frontier.

\`\`\`python
import heapq

def uniform_cost_search(problem):
    node = Node(problem.initial_state, path_cost=0)
    frontier = []
    heapq.heappush(frontier, (0, node))
    explored = set()
    
    while frontier:
        cost, node = heapq.heappop(frontier)
        
        # CRITICAL RULE: Goal test applied at EXPANSION (pop), NOT generation!
        if problem.is_goal(node.state):
            return solution(node)
            
        explored.add(node.state)
        
        for action in problem.actions(node.state):
            child = child_node(problem, node, action)
            if child.state not in explored and child not in frontier:
                heapq.heappush(frontier, (child.path_cost, child))
            elif child in frontier and child.path_cost < frontier[child].path_cost:
                frontier.decrease_key(child, child.path_cost)
    return None
\`\`\`

#### Why Goal Test Must Be Applied at POP Time (Expansion), Not Push Time (Generation):
1. **Premature Goal Detection Failure**: A goal node may be generated early via an expensive, high-cost path.
2. If tested at generation, UCS would immediately terminate with this suboptimal path!
3. By waiting until the goal node is **popped from the priority queue**, UCS guarantees that **all paths costing less than $g(goal)$ have already been fully explored**.

#### Performance Analysis:
- **Completeness**: **Yes**, provided every step cost is strictly positive:
  $$c(s, a, s') \\ge \\epsilon > 0$$
  *(If step costs can be zero or negative, UCS can loop infinitely along zero-cost cycles).*
- **Time & Space Complexity**:
  $$O\\left(b^{1 + \\lfloor C^* / \\epsilon \\rfloor}\\right)$$
  Where $C^*$ is the cost of the optimal solution.
- **Optimality**: **Yes**! Always finds the lowest-cost path for any non-negative cost function.

---

### 4.6 Bidirectional Search

#### Mechanism:
- Runs two simultaneous searches:
  1. **Forward Search** starting from Initial State $S_0$.
  2. **Backward Search** starting from Goal State $S_G$.
- Stops when their frontiers **intersect** (a common node is generated in both directions).

\`\`\`
   Forward Frontier ───►                 ◄─── Backward Frontier
        [ S₀ ] ───► [ N₁ ] ───► [ M ] ◄─── [ N₂ ] ◄─── [ S_G ]
                                 ▲
                          Intersection!
\`\`\`

#### Mathematical Speedup:
Rather than expanding $b^d$ nodes, bidirectional search expands:
$$b^{d/2} + b^{d/2} = 2 b^{d/2} = O(b^{d/2})$$
For $b = 10, d = 6$:
- Single Direction: $10^6 = 1,000,000$ nodes.
- Bidirectional: $2 \\times 10^3 = 2,000$ nodes! A **500x speedup**.

#### Challenges & Practical Limitations:
1. **Predecessor Calculation**: Must be able to calculate reverse transitions $Result^{-1}(s, a)$.
2. **Multiple Goal States**: If goal is an abstract condition (e.g., "Checkmate" in Chess), generating the backward frontier is intractable.
3. **Frontier Intersection Check**: Fast $O(1)$ hash table lookups required to check if a node generated in one direction is present in the other frontier.
4. **Memory Constraint**: At least one frontier must be completely retained in memory ($O(b^{d/2})$ space).

---

## 5. Comprehensive Search Strategies Comparison

The definitive comparison matrix required for university and competitive exams:

| Search Strategy | Completeness | Time Complexity | Space Complexity | Optimality (Unit Cost) | Optimality (General Cost) | Frontier Data Structure |
|---|---|---|---|---|---|---|
| **Breadth-First Search (BFS)** | **Yes** (if $b < \\infty$) | $O(b^d)$ | $O(b^d)$ *(Memory Bottleneck)* | **Yes** | **No** | FIFO Queue |
| **Depth-First Search (DFS)** | **No** (finite graphs: Yes) | $O(b^m)$ | **$O(bm)$** *(Linear Space)* | **No** | **No** | LIFO Stack |
| **Depth-Limited Search (DLS)** | **No** (if $l < d$) | $O(b^l)$ | $O(bl)$ | **No** | **No** | LIFO Stack with depth limit |
| **Iterative Deepening (IDS)** | **Yes** (if $b < \\infty$) | $O(b^d)$ | **$O(bd)$** *(Optimal Memory)* | **Yes** | **No** | LIFO Stack (successive limits) |
| **Uniform Cost Search (UCS)** | **Yes** (if $\\epsilon > 0$) | $O(b^{1 + \\lfloor C^*/\\epsilon \\rfloor})$ | $O(b^{1 + \\lfloor C^*/\\epsilon \\rfloor})$ | **Yes** | **Yes** | Priority Queue (by $g(n)$) |
| **Bidirectional Search** | **Yes** (if $b < \\infty$) | $O(b^{d/2})$ | $O(b^{d/2})$ | **Yes** | **No** (unless UCS based) | Two Frontiers (Hash Sets) |

---

## 6. CIA-1 Internal Assessment Preparation Corner

### 6.1 Standard CURAJ Subjective Questions & Model Solutions

#### Q1: "Differentiate between a State and a Search Node with an illustrative diagram." [5 Marks]
> **Model Answer Key**:
> - **Definition**: A state is an environmental abstraction (coordinates, tile layout). A node is an in-memory data structure representing a path.
> - **Internal Structure of Node**:
>   1. \`State\`: The state in the state space to which the node corresponds.
>   2. \`Parent\`: Pointer to the node that generated this node.
>   3. \`Action\`: Action applied to parent to produce this node.
>   4. \`Path-Cost\` $g(n)$: Total accumulated cost from root to this node.
>   5. \`Depth\` $d$: Number of steps from root ($d = \\text{parent.depth} + 1$).
> - **Diagram**: Show two nodes with different parents referencing the same city state (e.g., node from Sibiu to Arad vs node from Zerind to Arad).

---

#### Q2: "Prove why Iterative Deepening Search (IDS) is asymptotically optimal in both time and space for uninformed search." [5 Marks]
> **Model Answer Key**:
> 1. **Time Complexity Derivation**:
>    $$N(\\text{IDS}) = \sum_{i=1}^d (d - i + 1) b^i = d \\cdot b + (d-1)b^2 + \\dots + 1 \\cdot b^d$$
>    Factoring the dominant term:
>    $$N(\\text{IDS}) \\le b^d \sum_{j=0}^{\\infty} (j+1) b^{-j} = b^d \\left(\\frac{b}{b-1}\\right)^2 = O(b^d)$$
>    For $b \\ge 2$, $\\left(\\frac{b}{b-1}\\right)^2 \\le 4$. Hence, time complexity matches BFS: $O(b^d)$.
> 2. **Space Complexity Derivation**:
>    At any point, IDS runs a DFS up to limit $d$. DFS only retains the current active branch and its immediate siblings. Total memory is $b \\times d$ nodes: $O(bd)$, which is linear.
> 3. **Conclusion**: IDS uniquely achieves $O(bd)$ space without sacrificing $O(b^d)$ time or unit-cost optimality.

---

#### Q3: "Trace the execution of Uniform Cost Search (UCS) on the following weighted graph from Start (S) to Goal (G)." [5 Marks]
\`\`\`
Graph Edges:
(S, A) = 2,  (S, B) = 5
(A, C) = 4,  (A, D) = 7
(B, D) = 2,  (B, G) = 9
(C, G) = 5,  (D, G) = 1
\`\`\`

> **Step-by-Step Priority Queue Trace**:
> 1. **Initialize**: Frontier = \`[(0, S)]\`, Explored = \`{}\`
> 2. **Step 1**: Pop \`(0, S)\`. Expand $S$.
>    - Generate $A$ with cost $0 + 2 = 2$.
>    - Generate $B$ with cost $0 + 5 = 5$.
>    - Frontier: \`[(2, A), (5, B)]\`. Explored: \`{S}\`.
> 3. **Step 2**: Pop \`(2, A)\` (Lowest cost). Expand $A$.
>    - Generate $C$ with cost $2 + 4 = 6$.
>    - Generate $D$ with cost $2 + 7 = 9$.
>    - Frontier: \`[(5, B), (6, C), (9, D)]\`. Explored: \`{S, A}\`.
> 4. **Step 3**: Pop \`(5, B)\`. Expand $B$.
>    - Generate $D$ with cost $5 + 2 = 7$. (Better than existing 9! Update $D$'s cost to 7).
>    - Generate $G$ with cost $5 + 9 = 14$.
>    - Frontier: \`[(6, C), (7, D), (14, G)]\`. Explored: \`{S, A, B}\`.
> 5. **Step 4**: Pop \`(6, C)\`. Expand $C$.
>    - Generate $G$ with cost $6 + 5 = 11$. (Better than existing 14! Update $G$'s cost to 11).
>    - Frontier: \`[(7, D), (11, G)]\`. Explored: \`{S, A, B, C}\`.
> 6. **Step 5**: Pop \`(7, D)\`. Expand $D$.
>    - Generate $G$ with cost $7 + 1 = 8$. (Better than existing 11! Update $G$'s cost to 8).
>    - Frontier: \`[(8, G)]\`. Explored: \`{S, A, B, C, D}\`.
> 7. **Step 6**: Pop \`(8, G)\`.
>    - **Goal Test**: State is $G$. Success!
>    - **Optimal Path**: $S \\to B \\to D \\to G$ with Total Cost **8**.

---

#### Q4: "Formulate the 4-Gallon and 3-Gallon Water Jug problem with state representation, initial state, goal state, and 4 essential production rules." [5 Marks]
> **Model Answer Key**:
> 1. **State Space**: Vector $(x, y)$ where $x \\in \{0, 1, 2, 3, 4\}$ (4-gallon jug) and $y \\in \{0, 1, 2, 3\}$ (3-gallon jug). Total possible states = $5 \\times 4 = 20$.
> 2. **Initial State**: $(0, 0)$ (both jugs empty).
> 3. **Goal State**: $(2, y)$ for any $y \\in \{0, 1, 2, 3\}$.
> 4. **Four Key Production Rules**:
>    - *Fill 3-Gallon Jug*: If $y < 3$, then $(x, y) \\to (x, 3)$.
>    - *Pour 3G into 4G (empty completely)*: If $x + y \\le 4$ and $y > 0$, then $(x, y) \\to (x + y, 0)$.
>    - *Pour 3G into 4G (until 4G is full)*: If $x + y \\ge 4$ and $y > 0$, then $(x, y) \\to (4, y - (4 - x))$.
>    - *Empty 4-Gallon Jug*: If $x > 0$, then $(x, y) \\to (0, y)$.
> 5. **Solution Trajectory**:
>    $(0,0) \\to (0,3) \\to (3,0) \\to (3,3) \\to (4,2) \\to (0,2) \\to (2,0)$.

---

#### Q5: "Explain why exactly half of all 8-puzzle configurations are solvable. Given an initial state with 9 inversions, can it reach the standard goal state?" [5 Marks]
> **Model Answer Key**:
> 1. **Definition of Inversion**: For any permutation of tiles $1$ through $8$ (ignoring the blank space), an inversion occurs when tile $i$ appears before tile $j$ but $i > j$.
> 2. **Parity Invariance**:
>    - A horizontal move slides a tile into the adjacent empty spot in the same row $\\implies$ relative order of all other tiles is unchanged $\\implies$ inversion count changes by $0$.
>    - A vertical move shifts a tile up or down by 1 row, skipping over exactly 2 tiles $\\implies$ the inversion count changes by $+2, 0,$ or $-2$ (parity remains unchanged).
> 3. **Mathematical Proof**: Because sliding moves change the inversion count by an even integer ($0, \\pm 2$), the **parity** (odd vs. even) is strictly invariant.
> 4. **Answer to Specific Question**:
>    - The standard goal state $[1, 2, 3, 4, 5, 6, 7, 8, \\text{blank}]$ has $0$ inversions (Even parity).
>    - An initial state with $9$ inversions has **Odd parity**.
>    - Since $\\text{Odd} \\not\\equiv \\text{Even} \\pmod 2$, it is **mathematically impossible** for this initial state to reach the goal state!

---

## 7. UGC NET / JRF & GATE CS Preparation Corner

### 7.1 High-Yield Examination Points & Recurrent Traps
1. **Early vs. Late Goal Test**:
   - **BFS**: Goal test applied when child node is **generated** (preserves time & space).
   - **UCS**: Goal test applied when node is **popped/selected for expansion** (mandatory for optimality).
2. **Infinite Loops in DFS**:
   - DFS on a tree structure is **incomplete** if loops exist. On a finite graph search with a closed list (explored set), DFS is **complete**.
3. **Step Cost Condition for UCS**:
   - For UCS to be complete and optimal, all step costs must satisfy $c(s, a, s') \\ge \\epsilon > 0$. If edge costs can be zero, UCS can run indefinitely expanding an infinite number of zero-cost actions without making progress toward the goal.
4. **Number of Visited Nodes in Complete Tree**:
   - In a uniform $m$-ary tree of depth $d$, total internal nodes = $\\frac{b^d - 1}{b - 1}$; total leaves = $b^d$. Total nodes = $\\frac{b^{d+1} - 1}{b - 1}$.

---

## 8. Master Formula Cheat Sheet & Quick-Reference Guide

> **Rapid Revision Guide** for **CURAJ CIA-1 Assessments**, **End-Semester Exams**, and **UGC NET / JRF Paper II**.

### 8.1 Key Mathematical Parameters Glossary

| Parameter | Formal Mathematical Meaning | Role in Search Complexity |
|:---:|---|---|
| $b$ | **Branching Factor**: Maximum number of successors (children) of any node. | Governs tree expansion rate |
| $d$ | **Shallowest Goal Depth**: Depth of the shallowest goal node in the tree. | Primary factor in BFS / IDS time & space |
| $m$ | **Maximum Search Depth**: Maximum depth of the state space (can be $\\infty$). | Worst-case depth for DFS |
| $l$ | **Depth Limit**: The cutoff limit set in Depth-Limited Search (DLS). | Bounded search horizon |
| $\\epsilon$ | **Minimum Step Cost**: Smallest positive edge cost (strictly $\\epsilon > 0$). | Guarantees UCS terminates |
| $C^*$ | **Optimal Solution Cost**: Path cost of the cheapest path to a goal. | Used in UCS complexity $\\lfloor C^* / \\epsilon \\rfloor$ |

---

### 8.2 Algorithm Complexity Cheat Sheet Matrix

| Algorithm | Frontier Data Structure | Time Complexity | Space Complexity | Complete? | Optimal? | Essential Takeaway |
|---|---|:---:|:---:|:---:|:---:|---|
| **BFS** | FIFO Queue | $\\mathcal{O}(b^d)$ | $\\mathcal{O}(b^d)$ | **Yes** $(b < \\infty)$ | **Yes** *(unit cost)* | **Memory is the fatal bottleneck** |
| **DFS** | LIFO Stack | $\\mathcal{O}(b^m)$ | $\\mathcal{O}(b \\cdot m)$ | **No** *(loops)* | **No** | **Linear memory is its superpower** |
| **DLS** | Stack with cutoff $l$ | $\\mathcal{O}(b^l)$ | $\\mathcal{O}(b \\cdot l)$ | **No** *(if $l < d$)* | **No** | Incomplete if $l < d$; prevents infinite depth |
| **IDS** | Successive LIFO Stack | $\\mathcal{O}(b^d)$ | $\\mathcal{O}(b \\cdot d)$ | **Yes** $(b < \\infty)$ | **Yes** *(unit cost)* | **Universal Uninformed Champion**: BFS optimality + DFS linear space |
| **UCS** | Priority Queue ($g(n)$) | $\\mathcal{O}\\left(b^{1 + \\lfloor C^* / \\epsilon \\rfloor}\\right)$ | $\\mathcal{O}\\left(b^{1 + \\lfloor C^* / \\epsilon \\rfloor}\\right)$ | **Yes** $(\\epsilon > 0)$ | **Yes** *(any $c \\ge 0$)* | Goal test strictly at **node expansion (pop)** |
| **Bidirectional** | Two Hash Sets | $\\mathcal{O}(b^{d/2})$ | $\\mathcal{O}(b^{d/2})$ | **Yes** $(b < \\infty)$ | **Yes** *(if BFS/UCS)* | Exponential speedup ($2 \\cdot b^{d/2} \\ll b^d$) |

---

### 8.3 Essential Derivations & Exam Formulas

#### 1. Uniform Tree Node Calculations
- **Total Leaves at Depth $d$**:
  $$L = b^d$$
- **Total Internal Nodes (from root to depth $d-1$)**:
  $$I = \\sum_{i=0}^{d-1} b^i = \\frac{b^d - 1}{b - 1}$$
- **Total Nodes in Entire Search Tree**:
  $$N = \\sum_{i=0}^d b^i = \\frac{b^{d+1} - 1}{b - 1}$$

#### 2. Iterative Deepening Search Total Generated Nodes Proof
$$N_{\\text{IDS}} = d \\cdot b + (d - 1)b^2 + (d - 2)b^3 + \\dots + 1 \\cdot b^d = \\mathcal{O}(b^d)$$
- **Concrete Numerical Ratio for $b = 10, d = 5$**:
  $$\\frac{N_{\\text{IDS}}}{N_{\\text{BFS}}} = \\frac{123{,}450}{111{,}111} \\approx 1.11 \\quad (\\text{Only } 11\\% \\text{ overhead!})$$

#### 3. Uniform Cost Search Complexity Formula
$$\\text{Time Complexity} = \\text{Space Complexity} = \\mathcal{O}\\left(b^{1 + \\lfloor C^* / \\epsilon \\rfloor}\\right)$$
- If step costs are uniform ($c = 1$), then $\\lfloor C^* / \\epsilon \\rfloor = d$, which simplifies to BFS: $\\mathcal{O}(b^{d+1})$.

#### 4. 8-Puzzle Solvability Parity Criterion
$$\\text{State } S \\text{ can reach Goal } G \\iff \\text{Inversions}(S) \\equiv \\text{Inversions}(G) \\pmod 2$$
- Total reachable states in 8-puzzle:
  $$\\text{Reachable States} = \\frac{9!}{2} = 181{,}440 \\quad (\\text{out of } 362{,}880 \\text{ total permutations})$$
`,
  practiceQuiz: [
    {
      id: "ai-u1-q1",
      question:
        "According to Russell & Norvig, modern Artificial Intelligence research predominantly defines AI under which conceptual quadrant?",
      options: [
        "Thinking Humanly (Cognitive Science approach)",
        "Acting Humanly (Turing Test approach)",
        "Thinking Rationally (Laws of Thought approach)",
        "Acting Rationally (Rational Agent approach)",
      ],
      correctAnswer: 3,
      explanation:
        "Modern AI primarily adopts the 'Acting Rationally' (Rational Agent) paradigm because rationality is mathematically well-defined (maximizing expected utility) and generalizable beyond human biological limitations.",
      difficulty: "easy",
      topicTag: "Foundations of AI",
    },
    {
      id: "ai-u1-q2",
      question:
        "In the formal definition of a search problem, which of the following is NOT one of the standard components?",
      options: [
        "Initial state S₀",
        "Transition model Result(s, a)",
        "Heuristic evaluation function h(n)",
        "Path cost function c(s, a, s')",
      ],
      correctAnswer: 2,
      explanation:
        "A heuristic function h(n) belongs to informed (heuristic) search. A formal problem definition consists strictly of 5 components: Initial state, Actions, Transition model, Goal test, and Path cost function.",
      difficulty: "easy",
      topicTag: "Problem Formulation",
    },
    {
      id: "ai-u1-q3",
      question:
        "Which statement correctly highlights the distinction between a 'State' and a 'Search Node'?",
      options: [
        "A state contains pointers to parent and child nodes, while a node is just an environmental configuration.",
        "A state represents a physical configuration of the world, whereas a node is a bookkeeping data structure in the search tree.",
        "A state can appear only once in a search tree, but a node can appear multiple times.",
        "A search node has no depth or path cost, while a state records total path cost.",
      ],
      correctAnswer: 1,
      explanation:
        "A state is an abstraction of the physical world (e.g. coordinates or board layout). A node is an in-memory data structure containing state, parent pointer, action taken, path cost g(n), and depth d.",
      difficulty: "medium",
      topicTag: "State vs Node",
    },
    {
      id: "ai-u1-q4",
      question:
        "What is the primary practical bottleneck that causes Breadth-First Search (BFS) to fail on large problems?",
      options: [
        "Execution time is exponential while memory is linear",
        "Lack of completeness when branching factor is finite",
        "Memory (Space Complexity) exhaustion long before compute time limits are reached",
        "Inability to handle trees with uniform step costs",
      ],
      correctAnswer: 2,
      explanation:
        "The space complexity of BFS is O(b^d). All frontier and explored nodes must remain in memory. At typical branching factors, RAM is exhausted in minutes long before CPU time becomes the issue.",
      difficulty: "easy",
      topicTag: "BFS Evaluation",
    },
    {
      id: "ai-u1-q5",
      question:
        "Iterative Deepening Search (IDS) is often preferred over BFS because:",
      options: [
        "IDS has smaller asymptotic time complexity than BFS",
        "IDS combines the unit-cost optimality and completeness of BFS with the linear O(bd) space complexity of DFS",
        "IDS never regenerates nodes at earlier levels",
        "IDS does not require a branching factor to be finite",
      ],
      correctAnswer: 1,
      explanation:
        "IDS achieves completeness and optimality (for unit costs) with O(b^d) time complexity while using only O(bd) linear memory, overcoming BFS's fatal memory bottleneck.",
      difficulty: "medium",
      topicTag: "Iterative Deepening",
    },
    {
      id: "ai-u1-q6",
      question:
        "Why MUST the goal test in Uniform Cost Search (UCS) be applied when a node is SELECTED FOR EXPANSION (popped from queue), rather than when it is generated?",
      options: [
        "Testing at generation causes memory overflow in the priority queue",
        "A goal node may be generated via an expensive path first; testing at expansion guarantees all cheaper paths have been explored",
        "Priority queues do not allow checking state properties at insertion time",
        "Goal testing at generation violates the FIFO ordering of the priority queue",
      ],
      correctAnswer: 1,
      explanation:
        "A goal node can be generated via a suboptimal high-cost path before a cheaper path to the same goal is discovered. By waiting until it is popped from the priority queue, UCS guarantees that no path with cost less than g(goal) remains in the frontier.",
      difficulty: "hard",
      topicTag: "Uniform Cost Search",
    },
    {
      id: "ai-u1-q7",
      question:
        "What is the mathematical condition required on step costs c(s, a, s') to guarantee the completeness and optimality of Uniform Cost Search?",
      options: [
        "c(s, a, s') ≥ 0",
        "c(s, a, s') > -1",
        "c(s, a, s') ≥ ε > 0 (for some positive constant ε)",
        "c(s, a, s') = 1 (constant unit cost)",
      ],
      correctAnswer: 2,
      explanation:
        "Step costs must be strictly bounded away from zero by some positive ε (c ≥ ε > 0). If step costs can be arbitrarily small (or zero), an infinite sequence of zero-cost actions could prevent the search from ever reaching the goal.",
      difficulty: "medium",
      topicTag: "UCS Optimality",
    },
    {
      id: "ai-u1-q8",
      question:
        "For a tree with branching factor b = 10 and shallowest goal depth d = 5, what is the ratio of nodes generated by IDS compared to BFS?",
      options: [
        "IDS generates approximately 10x more nodes than BFS",
        "IDS generates approximately 2x more nodes than BFS",
        "IDS generates only about 11% more nodes than BFS (approx 1.11x)",
        "IDS generates fewer nodes than BFS",
      ],
      correctAnswer: 2,
      explanation:
        "For b=10, d=5: BFS generates 111,111 nodes. IDS generates 123,450 nodes. The ratio is 123,450 / 111,111 ≈ 1.11. The overhead of regenerating upper levels is only ~11% because leaves dominate an exponential tree.",
      difficulty: "hard",
      topicTag: "Complexity Derivation",
    },
    {
      id: "ai-u1-q9",
      question:
        "Consider a search space with branching factor b and solution depth d. If Bidirectional Search is applied, its time and space complexity is reduced to:",
      options: ["O(b^(d - 1))", "O(b^(d/2))", "O((b/2)^d)", "O(d · b)"],
      correctAnswer: 1,
      explanation:
        "Bidirectional search runs two simultaneous searches of depth d/2 each, resulting in time and space complexity O(b^(d/2) + b^(d/2)) = O(b^(d/2)), an exponential speedup over standard single-direction search.",
      difficulty: "easy",
      topicTag: "Bidirectional Search",
    },
    {
      id: "ai-u1-q10",
      question:
        "Which philosophical thought experiment was proposed by John Searle (1980) to argue that syntax manipulation does not constitute semantic understanding in AI?",
      options: [
        "The Trolley Problem",
        "The Chinese Room Argument",
        "The Ship of Theseus",
        "The Experience Machine",
      ],
      correctAnswer: 1,
      explanation:
        "John Searle proposed the Chinese Room argument to demonstrate that a system executing formal syntactic rule-matching can produce correct outputs without genuine semantic comprehension.",
      difficulty: "easy",
      topicTag: "AI Philosophy",
    },
    {
      id: "ai-u1-q11",
      question:
        "In Depth-First Search (DFS) on an infinite state space without cycle checking, the algorithm is:",
      options: [
        "Complete and optimal",
        "Complete but non-optimal",
        "Incomplete and non-optimal",
        "Incomplete but optimal",
      ],
      correctAnswer: 2,
      explanation:
        "Without cycle checking on an infinite state space, DFS can follow an infinite branch forever and never backtrack, missing solutions that exist at shallow depths on other branches. Hence, it is neither complete nor optimal.",
      difficulty: "medium",
      topicTag: "DFS Limitations",
    },
    {
      id: "ai-u1-q12",
      question:
        "Match the search algorithm with its characteristic frontier data structure:\n1. BFS\n2. DFS\n3. UCS\n4. Bidirectional Search",
      options: [
        "1-FIFO Queue, 2-LIFO Stack, 3-Priority Queue by g(n), 4-Two Frontiers with Hash Set",
        "1-LIFO Stack, 2-FIFO Queue, 3-Priority Queue by h(n), 4-Single Queue",
        "1-Priority Queue, 2-FIFO Queue, 3-LIFO Stack, 4-Hash Set",
        "1-FIFO Queue, 2-Priority Queue, 3-LIFO Stack, 4-Deque",
      ],
      correctAnswer: 0,
      explanation:
        "BFS uses a FIFO Queue, DFS uses a LIFO Stack, UCS uses a Min-Priority Queue ordered by path cost g(n), and Bidirectional Search uses two separate frontiers checked via Hash Tables.",
      difficulty: "easy",
      topicTag: "Data Structures",
    },
    {
      id: "ai-u1-q13",
      question:
        "In the 8-puzzle problem, what is the total number of reachable states in the state space graph?",
      options: [
        "9! = 362,880",
        "9! / 2 = 181,440",
        "8! = 40,320",
        "3^8 = 6,561",
      ],
      correctAnswer: 1,
      explanation:
        "The 8-puzzle has 9! total permutations of tiles. However, the state space graph is divided into two disjoint parity equivalence classes of equal size. Exactly half (9! / 2 = 181,440) are reachable from any valid start configuration.",
      difficulty: "medium",
      topicTag: "State Space Sizes",
    },
    {
      id: "ai-u1-q14",
      question:
        "Consider the statements below regarding Depth-Limited Search (DLS):\nStatement I: DLS is complete if the cutoff limit l is strictly less than the shallowest goal depth d.\nStatement II: DLS space complexity is O(b · l).\nWhich is true?",
      options: [
        "Both Statement I and Statement II are true",
        "Statement I is true, Statement II is false",
        "Statement I is false, Statement II is true",
        "Both Statement I and Statement II are false",
      ],
      correctAnswer: 2,
      explanation:
        "Statement I is false: if l < d, DLS terminates with cutoff and never reaches the goal, making it incomplete. Statement II is true: DLS uses O(b · l) space because it searches at most depth l like DFS.",
      difficulty: "medium",
      topicTag: "DLS Evaluation",
    },
    {
      id: "ai-u1-q15",
      question:
        "In a weighted graph search, edge costs are: (S,A)=3, (S,B)=1, (B,A)=1, (A,G)=4, (B,G)=6. What path is returned by Uniform Cost Search, and what is its cost?",
      options: [
        "Path: S → B → G with cost 7",
        "Path: S → A → G with cost 7",
        "Path: S → B → A → G with cost 6",
        "Path: S → G with cost 6",
      ],
      correctAnswer: 2,
      explanation:
        "Cumulative costs: S(0) -> B(1) -> A(1+1=2) -> G(2+4=6). Compare to S -> A -> G (3+4=7) and S -> B -> G (1+6=7). UCS explores S(0), then B(1), then A(2), then expands A to reach G with optimal cost 6 via S → B → A → G.",
      difficulty: "hard",
      topicTag: "UCS Trace",
    },
    {
      id: "ai-u1-q16",
      question:
        "In the 4-gallon and 3-gallon Water Jug problem, if the current state is (4, 2) and the operation is 'Empty the 4-gallon jug', what is the resulting state?",
      options: ["(0, 0)", "(0, 2)", "(2, 0)", "(4, 0)"],
      correctAnswer: 1,
      explanation:
        "Emptying the 4-gallon jug transforms (x, y) into (0, y). Since the 3-gallon jug retains its 2 gallons, the state becomes (0, 2).",
      difficulty: "easy",
      topicTag: "Water Jug Problem",
    },
    {
      id: "ai-u1-q17",
      question:
        "An 8-puzzle configuration has 9 inversions. Can it reach the standard goal state [1, 2, 3, 4, 5, 6, 7, 8, blank] which has 0 inversions?",
      options: [
        "Yes, by using more than 30 moves",
        "Yes, by moving the blank tile diagonally",
        "No, because horizontal moves preserve inversion parity and vertical moves change inversions only by 0 or ±2, making parity invariant",
        "It depends on the position of the blank tile",
      ],
      correctAnswer: 2,
      explanation:
        "In the 8-puzzle (odd grid width 3), legal sliding moves always change the inversion count by an even number (0, +2, or -2). Parity is invariant. A state with 9 inversions (odd) can never reach a goal with 0 inversions (even).",
      difficulty: "medium",
      topicTag: "8-Puzzle Solvability",
    },
    {
      id: "ai-u1-q18",
      question:
        "In the Missionaries and Cannibals problem with 3 missionaries and 3 cannibals, which of the following states on the near bank is INVALID (violates safety constraints)?",
      options: [
        "(3, 2, 1) - 3 Missionaries, 2 Cannibals, Boat near",
        "(2, 1, 1) - 2 Missionaries, 1 Cannibal, Boat near",
        "(1, 2, 1) - 1 Missionary, 2 Cannibals, Boat near",
        "(0, 2, 1) - 0 Missionaries, 2 Cannibals, Boat near",
      ],
      correctAnswer: 2,
      explanation:
        "State (1, 2, 1) on the near bank has 1 Missionary and 2 Cannibals. Cannibals outnumber missionaries (2 > 1) when missionaries are present, causing the missionaries to be eaten. (Note: (0, 2, 1) is valid because no missionaries are present on that bank).",
      difficulty: "medium",
      topicTag: "Missionaries & Cannibals",
    },
  ],
};
