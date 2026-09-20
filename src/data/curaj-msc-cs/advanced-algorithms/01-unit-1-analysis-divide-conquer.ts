import { LearningModule } from "@/types/learning";

export const unit1AnalysisDivideConquerModule: LearningModule = {
  id: "unit-1-analysis-divide-conquer",
  title: "Unit 1: Asymptotic Analysis, Recurrences & Divide-and-Conquer",
  description:
    "Mathematical foundations of algorithm analysis (Big-O, Omega, Theta), recurrence solving (Master Method & Iteration), and classic Divide & Conquer algorithms implemented in pure C (Binary Search, Merge Sort, Quick Sort, Strassen Matrix Multiplication) with official CURAJ CIA-1 2024 solutions.",
  status: "completed",
  tags: [
    "CURAJ MSc CS",
    "Core 2: 6.0CSC02",
    "CSC-404",
    "CIA-1 Exam",
    "UGC NET JRF",
    "GATE CS",
    "C Language",
  ],
  videoLectures: [
    {
      id: "lec-asymptotic-notations-bari",
      title:
        "1.8.1 Asymptotic Notations: Big-Oh, Big-Omega, Big-Theta Definitions",
      channel: "Abdul Bari",
      youtubeId: "A03oI0znAoc",
      duration: "18:40",
      recommendedSpeed: "1.25x",
      description:
        "Rigorous mathematical breakdown of asymptotic upper, lower, and tight bounds (O, Ω, Θ), bounding constants (c, n₀), and geometric growth comparisons.",
      examRelevance: "CURAJ CIA-1 Q1 (5 Marks) ⭐⭐⭐⭐⭐ | GATE CS & UGC NET",
      keyTopics: [
        "Big-O Upper Bound Definition",
        "Big-Omega Lower Bound Definition",
        "Big-Theta Tight Bound Theorem",
        "Constants c1, c2, n0 Graphical Meaning",
      ],
      directUrl: "https://www.youtube.com/watch?v=A03oI0znAoc",
    },
    {
      id: "lec-master-theorem-bari",
      title: "2.4.1 Master's Theorem in Algorithms for Dividing Functions",
      channel: "Abdul Bari",
      youtubeId: "OynWkEj0S-s",
      duration: "17:15",
      recommendedSpeed: "1.25x",
      description:
        "Master Theorem cases 1, 2, and 3 for divide-and-conquer recurrences T(n) = aT(n/b) + f(n), watershed function n^(log_b a), and regularity conditions.",
      examRelevance:
        "CURAJ CIA-1 Q3 (5 Marks) ⭐⭐⭐⭐⭐ | GATE CS Core Formula",
      keyTopics: [
        "Watershed Function n^(log_b a)",
        "Case 1 (Root/Leaf Dominated)",
        "Case 2 (Equal Work per Level)",
        "Case 3 & Regularity Condition",
      ],
      directUrl: "https://www.youtube.com/watch?v=OynWkEj0S-s",
    },
    {
      id: "lec-binary-search-bari",
      title:
        "2.6.1 Binary Search: Iterative & Recursive Implementation Analysis",
      channel: "Abdul Bari",
      youtubeId: "C2apEw9pgtw",
      duration: "13:20",
      recommendedSpeed: "1.25x",
      description:
        "Step-by-step trace of Binary Search, recurrence relation T(n) = T(n/2) + 1, loop invariant proof, and O(log n) time complexity derivation.",
      examRelevance: "CURAJ CIA-1 Q2 (5 Marks) ⭐⭐⭐⭐⭐",
      keyTopics: [
        "Array Halving Principle",
        "Recurrence T(n) = T(n/2) + 1",
        "Best Case vs Worst Case",
        "Iterative vs Recursive Memory Cost",
      ],
      directUrl: "https://www.youtube.com/watch?v=C2apEw9pgtw",
    },
    {
      id: "lec-merge-sort-bari",
      title: "2.7.2 Merge Sort Algorithm, Recurrence & Space Complexity",
      channel: "Abdul Bari",
      youtubeId: "mB5HXBb_HY8",
      duration: "21:10",
      recommendedSpeed: "1.25x",
      description:
        "Divide and Conquer sorting: recursive splitting, two-way merging in C, recurrence T(n) = 2T(n/2) + n, and O(n log n) Master Theorem proof.",
      examRelevance: "CURAJ Semester Exams & UGC NET JRF ⭐⭐⭐⭐⭐",
      keyTopics: [
        "Divide & Conquer Paradigm",
        "Merge Subroutine in C",
        "Recurrence Tree & Height log n",
        "Auxiliary Space O(n)",
      ],
      directUrl: "https://www.youtube.com/watch?v=mB5HXBb_HY8",
    },
    {
      id: "lec-quicksort-bari",
      title: "2.8.1 QuickSort Algorithm: Partitioning & Complexity Analysis",
      channel: "Abdul Bari",
      youtubeId: "7h1s2SojIRw",
      duration: "24:35",
      recommendedSpeed: "1.25x",
      description:
        "In-place partitioning, pivot selection strategies, Lomuto vs Hoare partition, worst case O(n²), best case O(n log n), and Randomized Quick Sort.",
      examRelevance:
        "CURAJ Semester 10-Mark Question | GATE CS Partition Analysis",
      keyTopics: [
        "Partitioning Mechanics",
        "Lomuto vs Hoare Scheme",
        "Worst-case Pivot Degeneration",
        "Randomized Pivot Strategy",
      ],
      directUrl: "https://www.youtube.com/watch?v=7h1s2SojIRw",
    },
    {
      id: "lec-strassen-bari",
      title: "2.9 Strassen's Matrix Multiplication: 7 Products Subcube Method",
      channel: "Abdul Bari",
      youtubeId: "0oJyNmEbS4w",
      duration: "18:50",
      recommendedSpeed: "1.25x",
      description:
        "How Strassen reduced subproblem multiplications from 8 to 7, deriving recurrence T(n) = 7T(n/2) + O(n²) and O(n^2.807) complexity.",
      examRelevance: "CURAJ CIA-1 Q4 Direct Recurrence Formulation ⭐⭐⭐⭐⭐",
      keyTopics: [
        "Naive Matrix Multiply O(n³)",
        "Strassen Formulas P1 to P7",
        "Recurrence T(n) = 7T(n/2) + an²",
        "Sub-cubic Time Complexity",
      ],
      directUrl: "https://www.youtube.com/watch?v=0oJyNmEbS4w",
    },
  ],
  resources: [
    {
      title:
        "Official CURAJ First Mid-Term Examination (CIA-1) Question Paper (August 2024, CSC-404)",
      url: "/AIGOCIA12024.jpg",
      type: "documentation",
    },
    {
      title:
        "CLRS: Introduction to Algorithms (4th Edition, MIT Press Companion Resource)",
      url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
      type: "documentation",
    },
    {
      title:
        "Horowitz, Sahni & Rajasekaran: Fundamentals of Computer Algorithms Resource",
      url: "https://www.universitiespress.com/",
      type: "documentation",
    },
    {
      title:
        "NPTEL: Design and Analysis of Algorithms (Prof. Madhavan Mukund, CMI)",
      url: "https://nptel.ac.in/courses/106106131",
      type: "course",
    },
    {
      title: "Abdul Bari: Algorithms Lecture Series Playlist (Complete DAA)",
      url: "https://www.youtube.com/playlist?list=PLDNrQCjsFq99Z9jG41sH_L0N9835vEw1D",
      type: "video",
    },
  ],
  detailedContent: `# Unit 1: Asymptotic Analysis, Recurrences & Divide-and-Conquer

> **CURAJ M.Sc. Computer Science — Course Code: 6.0CSC02 / CSC-404 (Core 2, 4 Credits, 10 Hours)**  
> **Official CURAJ Syllabus Sequence**: Foundations of Algorithm Analysis $\to$ Asymptotic Notations (Theta $\Theta$, Omega $\Omega$, Big-Oh $O$, Little-oh $o$, Little-omega $\omega$) $\to$ Recurrence Relations (Substitution / Iteration Method, Recursion Tree Method, Master Theorem) $\to$ Divide and Conquer Paradigm (Binary Search, Merge Sort, Quick Sort, Strassen's Matrix Multiplication, Maximum & Minimum Selection) $\to$ Foundations of Greedy Strategy & Dynamic Programming.  
> **Prescribed References**: Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein (*Introduction to Algorithms*, 3rd/4th Edition, MIT Press — **CLRS**); Ellis Horowitz, Sartaj Sahni, Sanguthevar Rajasekaran (*Fundamentals of Computer Algorithms*, Universities Press); Jon Kleinberg & Éva Tardos (*Algorithm Design*, Pearson).  
> **Exam Weightage**: Continuous Internal Assessment 1 (CIA-1) (~20 Marks), End-Semester Theory Exam, **UGC NET / JRF Paper II Computer Science**, and **GATE CS**.

---

## Unit Overview & Learning Goals (Aligned with CURAJ Unit 1 Syllabus)

1. **Foundations of Algorithm Analysis**: Formal definition of algorithms (finiteness, definiteness, input, output, effectiveness), RAM model of computation, space complexity (fixed vs. variable part), and time complexity (worst-case, best-case, average-case).
2. **Asymptotic Notations & Growth of Functions**: Formal mathematical definitions of $O$, $\Omega$, $\Theta$, $o$, and $\omega$ using constants $c_1, c_2, n_0$, graphical interpretations, asymptotic properties (transitivity, symmetry, transpose symmetry), and the standard complexity hierarchy.
3. **Mathematical Recurrence Solving Techniques**:
   - **Substitution / Iteration Method**: Step-by-step unrolling, finding the general $k$-th iteration, boundary condition matching, and closed-form summation (solving CURAJ CIA-1 Q4: $T(n) = 7T(n/2) + an^2$).
   - **Recursion-Tree Method**: Visualizing cost per level, calculating tree height $\log_b n$, summing across all levels, and evaluating leaf work.
   - **Master Method**: Comprehensive coverage of CLRS Cases 1, 2, and 3, watershed function $n^{\log_b a}$, regularity conditions, and solving CURAJ CIA-1 Q3: $T(n) = T(2n/3) + 1$.
4. **Divide-and-Conquer Paradigm & Canonical Algorithms in Pure C**:
   - **Binary Search**: Complete iterative and recursive C implementations, recurrence $T(n) = T(n/2) + \Theta(1)$, loop invariant proof, and $O(\log n)$ derivation (CURAJ CIA-1 Q2).
   - **Merge Sort**: Complete C implementation with dynamic buffer allocation, recurrence $T(n) = 2T(n/2) + \Theta(n)$, and $O(n \log n)$ proof.
   - **Quick Sort**: Complete C implementation with Lomuto and Hoare partitioning, worst-case $\Theta(n^2)$, best-case $\Theta(n \log n)$, and Randomized Quick Sort in C.
   - **Strassen's Matrix Multiplication**: Naive $O(n^3)$ algorithm in C vs. Strassen's 7 submatrix products ($P_1$ to $P_7$), recurrence $T(n) = 7T(n/2) + \Theta(n^2)$, and derivation of $\Theta(n^{\log_2 7}) \approx \Theta(n^{2.807})$.
   - **Simultaneous Maximum & Minimum**: Pairwise divide-and-conquer in C achieving $\lceil 3n/2 \rceil - 2$ comparisons.
5. **Greedy Strategy & Dynamic Programming Foundations**: Greedy choice property vs. optimal substructure, Fractional Knapsack in C ($O(n \log n)$), 0/1 Knapsack in C via Dynamic Programming table ($O(n \cdot W)$), and paradigm comparison matrix.
6. **Official CURAJ CIA-1 Examination Papers & Model Solutions**: Full August 2024 Question Paper (CSC-404, 20 Marks) with photographic evidence and step-by-step marking scheme answers for Q1, Q2, Q3, and Q4.
7. **UGC NET / JRF & GATE CS Preparation Corner**: High-yield traps on Master Theorem non-applicability, tricky asymptotic comparisons, and comparison sort lower bounds $\Omega(n \log n)$.
8. **Master Formula Cheat Sheet & Quick-Reference Guide**: Rapid-revision tables for asymptotic definitions, Master theorem cases, sorting algorithm complexities, and geometric series formulas.
9. **Interactive Practice Quiz**: 20 timed examination-style questions with detailed explanations.

---

## 0. 🎬 Video-First Lecture Roadmap & Exam Strategy Matrix

> [!TIP]
> **Study Strategy (Watch First $\to$ Study Textbook Notes $\to$ Solve Exam Questions)**:
> 1. **Watch Curated Video First (10–15 mins)**: Watch Abdul Bari's conceptual breakdowns to build visual intuition (e.g. how a recursion tree splits, or how Strassen combines 7 products).
> 2. **Master C Implementations Second**: In CURAJ exams and lab assessments, algorithms must be written in **standard C language** with clean pointers, array indexing, and memory allocation.
> 3. **Revise University Model Answers (Section 6)**: Study the exact mathematical solutions for the August 2024 CURAJ CIA-1 paper.
> 4. **Memorize Cheat Sheet Formulas (Section 8)**: Master the Master Theorem decision rules, inversion parity, and geometric summation formulas.

### 📚 Syllabus-to-Video & Exam Alignment Matrix

| Syllabus Topic | Curated YouTube Lecture | Prescribed Textbook Reference | University Exam Focus (CIA-1) | UGC NET JRF / GATE CS Trap |
|:---|:---|:---|:---|:---|
| **1. Asymptotic Notations ($\Theta, \Omega, O$)** | [Abdul Bari: Asymptotic Notations #1](https://www.youtube.com/watch?v=A03oI0znAoc) | CLRS Ch 3.1; Horowitz & Sahni Ch 1.4 | **5-Mark Compulsory (CIA-1 Q1)**: Formal definitions with $c_1, c_2, n_0$ and graphs | Confusing upper bound Big-$O$ with worst-case performance (Big-$O$ is a bound, not a case!) |
| **2. Properties & Hierarchy of Functions** | [Abdul Bari: Properties of Asymptotic Notations](https://www.youtube.com/watch?v=A03oI0znAoc) | CLRS Ch 3.2; Kleinberg & Tardos Ch 2 | 3-Mark: Transitivity, symmetry, and transpose symmetry | Ranking functions like $n^{\sqrt{\log n}}$ vs $2^{\sqrt{\log n}}$ vs $n^{1/\log n}$ |
| **3. Master Theorem for Recurrences** | [Abdul Bari: Master's Theorem #1](https://www.youtube.com/watch?v=OynWkEj0S-s) | CLRS Ch 4.5; Horowitz & Sahni Ch 3.2 | **5-Mark Compulsory (CIA-1 Q3)**: State 3 cases & solve $T(n) = T(2n/3) + 1$ | Applying Master Theorem when $f(n)$ is not polynomially larger/smaller by $n^\epsilon$ |
| **4. Iteration Method for Recurrences** | [Abdul Bari: Recurrence Relations #1](https://www.youtube.com/watch?v=OynWkEj0S-s) | CLRS Ch 4.3–4.4; Horowitz & Sahni Ch 3.2 | **5-Mark Compulsory (CIA-1 Q4)**: Step-by-step unrolling of $T(n) = 7T(n/2) + an^2$ | Determining the stopping condition $n/2^k = 2$ and summing geometric series with $r > 1$ |
| **5. Binary Search (Divide & Conquer)** | [Abdul Bari: Binary Search Iterative](https://www.youtube.com/watch?v=C2apEw9pgtw) | CLRS Ch 2.3; Horowitz & Sahni Ch 3.3 | **5-Mark Compulsory (CIA-1 Q2)**: C algorithm, recurrence $T(n) = T(n/2) + c$, and $O(\log n)$ proof | Integer overflow in \`(low + high)/2\`; must use \`low + (high - low)/2\` in C |
| **6. Merge Sort Algorithm in C** | [Abdul Bari: Merge Sort Algorithm](https://www.youtube.com/watch?v=mB5HXBb_HY8) | CLRS Ch 2.3; Horowitz & Sahni Ch 3.4 | 5-Mark: C code, recursive trace, recurrence $T(n) = 2T(n/2) + \Theta(n)$ | Auxiliary memory is $O(n)$, NOT in-place; why it is preferred for linked lists |
| **7. Quick Sort & Partitioning in C** | [Abdul Bari: QuickSort Algorithm](https://www.youtube.com/watch?v=7h1s2SojIRw) | CLRS Ch 7; Horowitz & Sahni Ch 3.5 | 10-Mark: Lomuto vs Hoare partition in C, worst-case $O(n^2)$ vs best-case $O(n \log n)$ | QuickSort worst-case on already sorted array; randomized pivot eliminates input traps |
| **8. Strassen's Matrix Multiplication** | [Abdul Bari: Strassen's Matrix Multiply](https://www.youtube.com/watch?v=0oJyNmEbS4w) | CLRS Ch 4.2; Horowitz & Sahni Ch 3.6 | 10-Mark: 7 products ($P_1..P_7$), recurrence $T(n) = 7T(n/2) + O(n^2)$, $O(n^{2.807})$ | Why 18 additions are acceptable to save 1 multiplication (additions are $O(n^2)$, mults are cubic) |
| **9. Simultaneous Max & Min** | [Abdul Bari: Min-Max Divide & Conquer](https://www.youtube.com/watch?v=C2apEw9pgtw) | Horowitz & Sahni Ch 3.2; CLRS Ex 9.1 | 5-Mark: C code and proof of $\lceil 3n/2 \rceil - 2$ comparisons | Comparing elements in pairs vs naive $2n - 2$ comparisons |
| **10. Greedy vs. Dynamic Programming** | [Abdul Bari: Knapsack Problem](https://www.youtube.com/watch?v=oTTzNMHM05I) | CLRS Ch 15–16; Horowitz & Sahni Ch 4–5 | 5-Mark: Fractional Knapsack (Greedy) vs 0/1 Knapsack (DP table) in C | Why greedy fails for 0/1 Knapsack (empty space penalty destroys greedy choice) |

---

## 1. Foundations of Algorithm Analysis (CLRS Ch 1–2, Horowitz & Sahni Ch 1)

### 1.1 Formal Definition of an Algorithm
According to **Ellis Horowitz, Sartaj Sahni, and Sanguthevar Rajasekaran** (*Fundamentals of Computer Algorithms*), an algorithm is a finite set of unambiguous instructions that, given a set of initial conditions, accomplishes a well-defined task and halts in a finite amount of time.

An algorithm must satisfy the following **five fundamental criteria**:
1. **Input**: Zero or more quantities are externally supplied.
2. **Output**: At least one quantity is produced.
3. **Definiteness**: Each instruction must be clear, unambiguous, and precise.
4. **Finiteness**: For all legal inputs, the algorithm must terminate after a finite number of discrete computational steps.
5. **Effectiveness**: Every instruction must be sufficiently basic that it can in principle be carried out by a person using pencil and paper in finite time (computable).

---

### 1.2 Computational Model: The Random Access Machine (RAM)
In theoretical algorithm analysis (pioneered by **CLRS Chapter 2.2**), algorithms are analyzed under the idealized **Random Access Machine (RAM)** model:
- Instructions are executed sequentially, one after another (no concurrent operations).
- Basic operations (arithmetic addition, subtraction, multiplication, division, modulo, pointer dereferencing, assignment, and comparison) take **one constant time unit** ($O(1)$).
- Memory access is uniform: accessing any memory cell takes constant time $O(1)$, independent of the address.
- Integers are represented using $c \log n$ bits (standard word size), so basic operations on indices fit in a single machine word.

---

### 1.3 Space Complexity: Fixed vs. Variable Components
The space required by an algorithm $P$ running on input of size $n$ is divided into two distinct components:
$$S(P) = c + S_p(I)$$

Where:
1. **Fixed Space Component ($c$)**: Independent of the input characteristics. Includes:
   - Instruction code space.
   - Simple variable and constant space.
   - Fixed-size component variables.
2. **Variable Space Component ($S_p(I)$)**: Strictly depends on the problem instance $I$ with size $n$. Includes:
   - Dynamic memory allocated on the heap (e.g., \`malloc()\` in C).
   - Space required for dynamically sized arrays or structures.
   - **Recursion Stack Space**: Each recursive call creates a new stack frame containing local variables, parameters, and return addresses. If maximum recursion depth is $h$, stack space is $O(h)$.

---

### 1.4 Time Complexity Analysis Paradigms
1. **Worst-Case Time Complexity ($T_{\text{worst}}(n)$)**:
   - The **maximum** running time over all legal inputs of size $n$:
     $$T_{\text{worst}}(n) = \max_{I \in D_n} \{T(I)\}$$
   - Provides a guaranteed **upper bound / safety guarantee** that the algorithm will never exceed. Primary metric used in computer science.
2. **Best-Case Time Complexity ($T_{\text{best}}(n)$)**:
   - The **minimum** running time over all legal inputs of size $n$:
     $$T_{\text{best}}(n) = \min_{I \in D_n} \{T(I)\}$$
   - Represents optimal conditions (e.g., target element found at the exact middle index in Binary Search on the very first comparison: $T_{\text{best}}(n) = O(1)$).
3. **Average-Case Time Complexity ($T_{\text{avg}}(n)$)**:
   - The expected running time over a probabilistic distribution $P(I)$ of inputs of size $n$:
     $$T_{\text{avg}}(n) = \sum_{I \in D_n} P(I) \cdot T(I)$$
   - Often requires sophisticated mathematical tools (e.g., indicator random variables in QuickSort expected analysis).

---

## 2. Asymptotic Notations & Growth of Functions (CLRS Ch 3, Horowitz & Sahni Ch 1.4)

\`\`\`video
{
  "id": "A03oI0znAoc",
  "title": "1.8.1 Asymptotic Notations: Big-Oh, Big-Omega, Big-Theta Definitions",
  "channel": "Abdul Bari",
  "duration": "18:40",
  "speed": "1.25x",
  "relevance": "CURAJ CIA-1 Q1 Compulsory (5 Marks) \u2b50\u2b50\u2b50\u2b50\u2b50 | GATE CS & UGC NET",
  "takeaway": "Watch this lecture to clearly visualize how constants c, c1, c2 and threshold n0 define the asymptotic upper, lower, and tight envelopes for algorithm growth."
}
\`\`\`

Asymptotic analysis focuses on the behavior of functions in the limit—as the input size $n$ approaches infinity ($n \to \infty$).

### 2.1 Big-Oh Notation ($O$): Asymptotic Upper Bound

> **Formal Definition (CLRS Chapter 3.1)**:  
> For a given function $g(n)$, we denote by $O(g(n))$ the set of functions:  
> $$O(g(n)) = \{f(n) : \exists \text{ positive constants } c > 0 \text{ and } n_0 > 0 \text{ such that } 0 \le f(n) \le c \cdot g(n), \; \forall n \ge n_0\}$$

- **Intuition**: $f(n) = O(g(n))$ means that $f(n)$ grows **at most as fast as** $g(n)$ (up to a constant factor $c$) for sufficiently large $n$. $g(n)$ provides a mathematical ceiling.
- **Limit Definition**: If $\lim_{n \to \infty} \frac{f(n)}{g(n)} < \infty$, then $f(n) = O(g(n))$.

\`\`\`
  Running Time
       ^
       |                   /  c * g(n)  [Upper Bound]
       |                  / 
       |          _--""""/--_  f(n)
       |        _"      /    "_
       |       /       /       "_
       |      /       /          "_
       |     /       /
       +----+-------+---------------------> Input Size (n)
       0    |       n₀
            |<-- Region of validity -->|
\`\`\`

---

### 2.2 Big-Omega Notation ($\Omega$): Asymptotic Lower Bound

> **Formal Definition (CLRS Chapter 3.1)**:  
> For a given function $g(n)$, we denote by $\Omega(g(n))$ the set of functions:  
> $$\Omega(g(n)) = \{f(n) : \exists \text{ positive constants } c > 0 \text{ and } n_0 > 0 \text{ such that } 0 \le c \cdot g(n) \le f(n), \; \forall n \ge n_0\}$$

- **Intuition**: $f(n) = \Omega(g(n))$ means that $f(n)$ grows **at least as fast as** $g(n)$ (up to a constant factor $c$) for sufficiently large $n$. $g(n)$ provides a mathematical floor.
- **Limit Definition**: If $\lim_{n \to \infty} \frac{f(n)}{g(n)} > 0$, then $f(n) = \Omega(g(n))$.

---

### 2.3 Big-Theta Notation ($\Theta$): Asymptotically Tight Bound

> **Formal Definition (CLRS Chapter 3.1)**:  
> For a given function $g(n)$, we denote by $\Theta(g(n))$ the set of functions:  
> $$\Theta(g(n)) = \{f(n) : \exists \text{ positive constants } c_1 > 0, c_2 > 0, \text{ and } n_0 > 0 \text{ such that } 0 \le c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n), \; \forall n \ge n_0\}$$

- **Fundamental Theorem (CLRS Theorem 3.1)**:  
  $$\mathbf{f(n) = \Theta(g(n)) \iff f(n) = O(g(n)) \quad \text{and} \quad f(n) = \Omega(g(n))}$$
- **Intuition**: $f(n)$ is sandwiched between $c_1 g(n)$ and $c_2 g(n)$ for all $n \ge n_0$. Their growth rates are asymptotically identical.
- **Limit Definition**: If $\lim_{n \to \infty} \frac{f(n)}{g(n)} = L$ where $0 < L < \infty$, then $f(n) = \Theta(g(n))$.

\`\`\`
  Running Time
       ^
       |                    /  c₂ * g(n)  [Upper Envelope]
       |                   / 
       |           _--""""/--_  f(n)      [Sandwiched Function]
       |         _"      /    "_
       |        /       /  /-----"  c₁ * g(n) [Lower Envelope]
       |       /       /  /
       +------+-------+--+----------------> Input Size (n)
       0      |       n₀
\`\`\`

---

### 2.4 Little-oh ($o$) and Little-omega ($\omega$) Notations

| Notation | Defining Inequality | Limit Condition | Informal Meaning | Example |
|:---:|:---|:---:|:---|:---|
| **$o(g(n))$** | $\forall c > 0, \exists n_0 > 0 : 0 \le f(n) < c \cdot g(n), \; \forall n \ge n_0$ | $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$ | $f(n)$ becomes insignificant relative to $g(n)$ | $2n = o(n^2)$, but $2n^2 \ne o(n^2)$ |
| **$\omega(g(n))$** | $\forall c > 0, \exists n_0 > 0 : 0 \le c \cdot g(n) < f(n), \; \forall n \ge n_0$ | $\lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty$ | $f(n)$ dominates $g(n)$ strictly | $n^2 = \omega(n)$, but $n^2 \ne \omega(n^2)$ |

---

### 2.5 Mathematical Properties of Asymptotic Relations (CLRS Ch 3.2)
1. **Transitivity**:
   - $f(n) = \Theta(g(n)) \land g(n) = \Theta(h(n)) \implies f(n) = \Theta(h(n))$
   - $f(n) = O(g(n)) \land g(n) = O(h(n)) \implies f(n) = O(h(n))$
   - $f(n) = \Omega(g(n)) \land g(n) = \Omega(h(n)) \implies f(n) = \Omega(h(n))$
2. **Reflexivity**:
   - $f(n) = \Theta(f(n)), \quad f(n) = O(f(n)), \quad f(n) = \Omega(f(n))$
3. **Symmetry**:
   - $f(n) = \Theta(g(n)) \iff g(n) = \Theta(f(n))$
4. **Transpose Symmetry**:
   - $f(n) = O(g(n)) \iff g(n) = \Omega(f(n))$
   - $f(n) = o(g(n)) \iff g(n) = \omega(f(n))$

---

### 2.6 Hierarchy of Standard Growth Functions
Arranged in order of **strictly increasing asymptotic growth rate** ($f_i(n) = o(f_{i+1}(n))$):

$$1 < \log(\log n) < \log n < \sqrt{n} < n < n \log n < n^2 < n^3 < n^k < 2^n < e^n < 3^n < n! < n^n$$

> [!IMPORTANT]
> **Useful Logarithmic Identities for Competitive Exams**:
> - $\log(n!) = \Theta(n \log n)$ (by Stirling's Approximation: $n! \approx \sqrt{2\pi n} (n/e)^n$)
> - $a^{\log_b c} = c^{\log_b a}$ (crucial for Master Method derivations)
> - $2^{\log_2 n} = n$
> - $(\log n)^k = o(n^\epsilon)$ for any $k > 0$ and any $\epsilon > 0$ (any polynomial dominates any polylogarithm!)

---

## 3. Mathematical Recurrence Solving Techniques (CLRS Ch 4, Horowitz & Sahni Ch 3)

\`\`\`video
{
  "id": "OynWkEj0S-s",
  "title": "2.4.1 Master's Theorem in Algorithms for Dividing Functions",
  "channel": "Abdul Bari",
  "duration": "17:15",
  "speed": "1.25x",
  "relevance": "CURAJ CIA-1 Q3 Compulsory (5 Marks) \u2b50\u2b50\u2b50\u2b50\u2b50 | GATE CS Core",
  "takeaway": "Understand how the watershed function n^(log_b a) compares with f(n) across the three cases of Master Theorem, and why regularity conditions matter."
}
\`\`\`

A **recurrence relation** is an equation or inequality that describes a function in terms of its value on smaller inputs.

### 3.1 The Substitution / Iteration Method (Expansion Method)
In the **Iteration Method** (also called repeated substitution or backward substitution), we repeatedly expand the recurrence by substituting the recurrence relation into itself until a discernible mathematical pattern emerges, then express the general $k$-th term, substitute the base case, and sum the resulting algebraic series.

#### 4-Step Iteration Framework:
1. **Expand**: Unroll the recurrence for steps $k = 1, 2, 3$ by repeatedly replacing $T(\cdot)$.
2. **Pattern Identify**: Express $T(n)$ as a general function of iteration counter $k$.
3. **Boundary Match**: Set the subproblem argument equal to the base-case threshold (e.g. $n/b^k = 1$ or $n/b^k = 2$) to solve for $k$.
4. **Evaluate Sum**: Substitute $k$ back into the formula and evaluate the summation (arithmetic or geometric progression).

---

### 3.2 The Recursion-Tree Method (CLRS Ch 4.4)
In a **Recursion Tree**, each node represents the cost of a single subproblem in the recursive call hierarchy:
1. **Root**: Cost of dividing and combining at initial problem size $n$ ($f(n)$).
2. **Depth $i$**: $a^i$ subproblems, each operating on input size $n / b^i$, each costing $f(n / b^i)$.
3. **Tree Height**: The problem size reaches 1 when $n / b^h = 1 \implies h = \log_b n$.
4. **Number of Leaves**: At depth $h = \log_b n$, total leaf count is:
   $$a^h = a^{\log_b n} = n^{\log_b a}$$
5. **Total Cost**: Sum of costs across all levels from $i = 0$ to $h$:
   $$T(n) = \sum_{i=0}^{\log_b n - 1} a^i f(n/b^i) + \Theta(n^{\log_b a})$$

---

### 3.3 The Master Method (CLRS Ch 4.5)

> **Master Theorem (CLRS Theorem 4.1)**:  
> Let $a \ge 1$ and $b > 1$ be constants, let $f(n)$ be a function, and let $T(n)$ be defined on the non-negative integers by the recurrence:  
> $$T(n) = a T(n/b) + f(n)$$  
> Where $n/b$ can be interpreted as either $\lfloor n/b \rfloor$ or $\lceil n/b \rceil$.  
> Let the **watershed function** be $n^{\log_b a}$. Then $T(n)$ has the following asymptotic bounds:

#### Case 1: Leaf-Dominated (Cost grows toward leaves)
If $f(n) = O(n^{\log_b a - \epsilon})$ for some constant $\epsilon > 0$, then:
$$T(n) = \Theta(n^{\log_b a})$$
*(The cost is dominated by the work done at the leaves).*

#### Case 2: Balanced Work (Equal cost across all levels)
If $f(n) = \Theta(n^{\log_b a} \log^k n)$ for some constant $k \ge 0$, then:
$$T(n) = \Theta(n^{\log_b a} \log^{k+1} n)$$
*(Standard Case 2 is when $k = 0$: $f(n) = \Theta(n^{\log_b a}) \implies T(n) = \Theta(n^{\log_b a} \log n)$).*

#### Case 3: Root-Dominated (Cost dominated by root division)
If $f(n) = \Omega(n^{\log_b a + \epsilon})$ for some constant $\epsilon > 0$, **AND** if $f(n)$ satisfies the **Regularity Condition**:
$$a \cdot f(n/b) \le c \cdot f(n) \quad \text{for some constant } c < 1 \text{ and all sufficiently large } n$$
Then:
$$T(n) = \Theta(f(n))$$

#### Limitations & When Master Method Fails:
The Master Method does **NOT** apply if:
1. $a$ is not constant (e.g. $T(n) = n T(n/2) + n$).
2. $b \le 1$ (e.g. $T(n) = T(n-1) + 1$ — subtracting recurrence, not dividing).
3. $f(n)$ is not polynomially bounded (e.g. $T(n) = 2T(n/2) + 2^n$).
4. **The Polynomial Gap Trap (GATE / UGC NET)**:  
   Consider $T(n) = 2T(n/2) + \frac{n}{\log n}$.  
   Here $a=2, b=2 \implies n^{\log_2 2} = n^1$. The ratio $f(n) / n = 1/\log n$.  
   Although $f(n) < n$, it is **not polynomially smaller** by a factor of $n^\epsilon$ for any $\epsilon > 0$! Master Theorem Case 1 does NOT apply.

---

## 4. Divide-and-Conquer Paradigm & Canonical Algorithms in Pure C

The **Divide-and-Conquer** algorithmic paradigm operates on three structural pillars:
1. **Divide**: Partition the problem into a number of smaller subproblems that are smaller instances of the exact same problem.
2. **Conquer**: Solve the subproblems recursively. If subproblem size is sufficiently small (base case), solve directly.
3. **Combine**: Merge the solutions to the subproblems into the solution for the original problem.

---

### 4.1 Binary Search (CLRS Ch 2.3, Horowitz & Sahni Ch 3.3)

\`\`\`video
{
  "id": "C2apEw9pgtw",
  "title": "2.6.1 Binary Search: Iterative & Recursive Method Trace",
  "channel": "Abdul Bari",
  "duration": "13:20",
  "speed": "1.25x",
  "relevance": "CURAJ CIA-1 Q2 Compulsory (5 Marks) \u2b50\u2b50\u2b50\u2b50\u2b50",
  "takeaway": "Understand how dividing the search space by half at each step yields recurrence T(n) = T(n/2) + 1 and logarithmic time complexity."
}
\`\`\`

#### Pure C Implementation (Iterative & Recursive with Driver):

\`\`\`c
/*
 * ============================================================================
 * Program     : binary_search.c
 * Description : Pure C Implementation of Iterative & Recursive Binary Search
 * Author      : Central University of Rajasthan (CURAJ) MSc CS Curriculum
 * Complexity  : Time: O(log n), Space: O(1) iterative, O(log n) recursive
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

/*
 * Iterative Binary Search
 * Returns index of target if found in sorted array arr[], else returns -1.
 */
int binary_search_iterative(const int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;

    while (low <= high) {
        /* Prevents integer overflow when (low + high) > INT_MAX */
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid; /* Element found at index mid */
        } else if (arr[mid] < target) {
            low = mid + 1; /* Target lies in right subarray */
        } else {
            high = mid - 1; /* Target lies in left subarray */
        }
    }
    return -1; /* Target not present in array */
}

/*
 * Recursive Binary Search
 */
int binary_search_recursive(const int arr[], int low, int high, int target) {
    if (low > high) {
        return -1; /* Base case: search space exhausted */
    }

    int mid = low + (high - low) / 2;

    if (arr[mid] == target) {
        return mid;
    }
    if (arr[mid] > target) {
        return binary_search_recursive(arr, low, mid - 1, target);
    }
    return binary_search_recursive(arr, mid + 1, high, target);
}

int main(void) {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 23;

    printf("Input Sorted Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    int idx_iter = binary_search_iterative(arr, n, target);
    printf("[Iterative] Element %d found at index: %d\n", target, idx_iter);

    int idx_rec = binary_search_recursive(arr, 0, n - 1, target);
    printf("[Recursive] Element %d found at index: %d\n", target, idx_rec);

    return 0;
}
\`\`\`

#### Recurrence Formulation & Derivation:
- **Recurrence Equation**:
  $$T(n) = T\left(\left\lfloor \frac{n}{2} \right\rfloor\right) + \Theta(1)$$
- **Base Case**: $T(1) = \Theta(1)$
- **Master Method Proof**:
  - $a = 1, b = 2, f(n) = \Theta(1) = \Theta(n^0)$
  - Watershed function: $n^{\log_b a} = n^{\log_2 1} = n^0 = 1$
  - Since $f(n) = \Theta(n^{\log_b a})$, Case 2 applies with $k = 0$:
    $$T(n) = \Theta(n^0 \log n) = \mathbf{\Theta(\log_2 n)}$$

---

### 4.2 Merge Sort (CLRS Ch 2.3, Horowitz & Sahni Ch 3.4)

\`\`\`video
{
  "id": "mB5HXBb_HY8",
  "title": "2.7.2 Merge Sort Algorithm, Recurrence & Space Complexity",
  "channel": "Abdul Bari",
  "duration": "21:10",
  "speed": "1.25x",
  "relevance": "CURAJ Semester Exams & UGC NET JRF \u2b50\u2b50\u2b50\u2b50\u2b50",
  "takeaway": "Trace the recursive division into single elements and observe how linear merging achieves O(n log n) total time with O(n) temporary space."
}
\`\`\`

#### Pure C Implementation:

\`\`\`c
/*
 * ============================================================================
 * Program     : merge_sort.c
 * Description : Pure C Implementation of Merge Sort with Dynamic Buffer
 * Complexity  : Time: O(n log n) everywhere, Auxiliary Space: O(n)
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

/* Merges two sorted subarrays arr[l..m] and arr[m+1..r] */
void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    /* Dynamic allocation of auxiliary arrays */
    int *L = (int *)malloc(n1 * sizeof(int));
    int *R = (int *)malloc(n2 * sizeof(int));

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        /* Stability preserved by <= */
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    /* Copy remaining elements */
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];

    free(L);
    free(R);
}

void merge_sort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        merge_sort(arr, l, m);
        merge_sort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main(void) {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Before MergeSort: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    merge_sort(arr, 0, n - 1);

    printf("After MergeSort : ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    return 0;
}
\`\`\`

#### Recurrence & Complexity:
- Recurrence: $T(n) = 2T(n/2) + \Theta(n)$
- Master Theorem: $a=2, b=2, f(n)=\Theta(n) \implies n^{\log_2 2} = n^1$. Case 2 applies:
  $$T(n) = \mathbf{\Theta(n \log n)}$$
- **Auxiliary Space**: $\Theta(n)$ buffer required during merge. Merge Sort is **not in-place**, but is **stable**.

---

### 4.3 Quick Sort (CLRS Ch 7, Horowitz & Sahni Ch 3.5)

\`\`\`video
{
  "id": "7h1s2SojIRw",
  "title": "2.8.1 QuickSort Algorithm: Partitioning & Complexity Analysis",
  "channel": "Abdul Bari",
  "duration": "24:35",
  "speed": "1.25x",
  "relevance": "CURAJ Semester 10-Mark Question | GATE CS Partition Analysis",
  "takeaway": "Learn how in-place partitioning rearranges elements around a pivot, and how randomized pivot selection eliminates the O(n\u00b2) worst-case."
}
\`\`\`

#### Pure C Implementation (Lomuto Partition & Randomized QuickSort):

\`\`\`c
/*
 * ============================================================================
 * Program     : quick_sort.c
 * Description : Pure C Implementation of QuickSort and Randomized QuickSort
 * Author      : Central University of Rajasthan (CURAJ) Curriculum
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

/* Lomuto Partition Scheme: Pivot chosen as arr[high] */
int partition_lomuto(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1; /* Return final position of pivot */
}

/* Randomized Partition: Selects a pivot uniformly at random */
int partition_random(int arr[], int low, int high) {
    int random_idx = low + rand() % (high - low + 1);
    swap(&arr[random_idx], &arr[high]); /* Swap random element to end */
    return partition_lomuto(arr, low, high);
}

void quick_sort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition_random(arr, low, high);
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}

int main(void) {
    srand((unsigned int)time(NULL));
    int arr[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Before QuickSort: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    quick_sort(arr, 0, n - 1);

    printf("After QuickSort : ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    return 0;
}
\`\`\`

#### Recurrence Analysis:
- **Worst Case** (Unbalanced partition, e.g. sorted array with end pivot):
  $$T(n) = T(n-1) + T(0) + \Theta(n) = T(n-1) + \Theta(n) = \mathbf{\Theta(n^2)}$$
- **Best Case** (Perfect middle split):
  $$T(n) = 2T(n/2) + \Theta(n) = \mathbf{\Theta(n \log n)}$$
- **Average Case** (Randomized pivot):
  $$T_{\text{avg}}(n) = \mathbf{\Theta(n \log n)}$$

---

### 4.4 Strassen's Matrix Multiplication (CLRS Ch 4.2, Horowitz & Sahni Ch 3.6)

\`\`\`video
{
  "id": "0oJyNmEbS4w",
  "title": "2.9 Strassen's Matrix Multiplication: 7 Products Subcube Method",
  "channel": "Abdul Bari",
  "duration": "18:50",
  "speed": "1.25x",
  "relevance": "CURAJ CIA-1 Q4 Direct Recurrence Formulation \u2b50\u2b50\u2b50\u2b50\u2b50",
  "takeaway": "Understand why reducing submatrix multiplications from 8 to 7 drops the asymptotic complexity from O(n\u00b3) to O(n^2.807)."
}
\`\`\`

#### Conceptual Breakthrough:
Standard block matrix multiplication partitions two $n \times n$ matrices $A$ and $B$ into four $n/2 \times n/2$ submatrices:
$$\begin{pmatrix} C_{11} & C_{12} \\ C_{21} & C_{22} \end{pmatrix} = \begin{pmatrix} A_{11} & A_{12} \\ A_{21} & A_{22} \end{pmatrix} \begin{pmatrix} B_{11} & B_{12} \\ B_{21} & B_{22} \end{pmatrix}$$

The naive block approach requires **8 recursive multiplications** and 4 additions:
$$T(n) = 8T(n/2) + \Theta(n^2) \implies n^{\log_2 8} = n^3 \implies T(n) = \Theta(n^3)$$

Volker Strassen (1969) discovered that by taking clever linear combinations, one can compute $C$ with only **7 submatrix multiplications** ($P_1$ through $P_7$) and 18 matrix additions:

$$P_1 = A_{11} (B_{12} - B_{22})$$
$$P_2 = (A_{11} + A_{12}) B_{22}$$
$$P_3 = (A_{21} + A_{22}) B_{11}$$
$$P_4 = A_{22} (B_{21} - B_{11})$$
$$P_5 = (A_{11} + A_{22}) (B_{11} + B_{22})$$
$$P_6 = (A_{12} - A_{22}) (B_{21} + B_{22})$$
$$P_7 = (A_{11} - A_{21}) (B_{11} + B_{12})$$

Then the quadrants of $C$ are:
$$C_{11} = P_5 + P_4 - P_2 + P_6$$
$$C_{12} = P_1 + P_2$$
$$C_{21} = P_3 + P_4$$
$$C_{22} = P_1 + P_5 - P_3 - P_7$$

#### Recurrence & Master Theorem Derivation:
$$T(n) = 7 T(n/2) + \Theta(n^2)$$
- Watershed function: $n^{\log_2 7} \approx n^{2.807354...}$
- Since $f(n) = \Theta(n^2) = O(n^{\log_2 7 - \epsilon})$ where $\epsilon = \log_2 7 - 2 \approx 0.807 > 0$, Master Theorem Case 1 applies:
$$T(n) = \mathbf{\Theta\left(n^{\log_2 7}\right) \approx \Theta(n^{2.807})}$$
*(Notice: this exact recurrence $T(n) = 7T(n/2) + an^2$ is Question 4 on the official CURAJ CIA-1 2024 Examination Paper!)*

---

### 4.5 Simultaneous Maximum & Minimum in an Array (Horowitz & Sahni Ch 3.2)
To find both the maximum and minimum elements in an array of $n$ numbers:
- **Naive Approach**: Linear scan finding max ($n-1$ comparisons), then linear scan finding min ($n-1$ comparisons). Total = $2n - 2$ comparisons.
- **Divide-and-Conquer / Pairwise Approach**:
  - Compare elements in pairs.
  - Compare the larger element with the current maximum.
  - Compare the smaller element with the current minimum.
  - **Total Comparisons**: Exactly $\lceil 3n/2 \rceil - 2$ comparisons (a 25% reduction in comparison operations!).

\`\`\`c
/* Pure C implementation of Pairwise Simultaneous Min-Max */
typedef struct {
    int min;
    int max;
} MinMax;

MinMax find_min_max(const int arr[], int low, int high) {
    MinMax res, left, right;
    if (low == high) {
        res.min = arr[low];
        res.max = arr[low];
        return res;
    }
    if (high == low + 1) {
        if (arr[low] < arr[high]) {
            res.min = arr[low];
            res.max = arr[high];
        } else {
            res.min = arr[high];
            res.max = arr[low];
        }
        return res;
    }
    int mid = low + (high - low) / 2;
    left = find_min_max(arr, low, mid);
    right = find_min_max(arr, mid + 1, high);
    res.min = (left.min < right.min) ? left.min : right.min;
    res.max = (left.max > right.max) ? left.max : right.max;
    return res;
}
\`\`\`

---

## 5. Greedy Strategy & Dynamic Programming Foundations (CLRS Ch 15–16, Horowitz & Sahni Ch 4–5)

### 5.1 The Greedy-Choice Property vs. Optimal Substructure
1. **Greedy-Choice Property**: A globally optimal solution can be arrived at by making locally optimal (greedy) choices at each step, without backtracking.
2. **Optimal Substructure**: An optimal solution to the problem contains within it optimal solutions to subproblems.

### 5.2 Fractional Knapsack (Greedy) vs. 0/1 Knapsack (Dynamic Programming)
- In **Fractional Knapsack**, items can be broken into arbitrary fractions. We sort items by value-to-weight density $v_i / w_i$ and greedily consume highest-density items. Solvable in $O(n \log n)$ time.
- In **0/1 Knapsack**, items are indivisible (either take entirely or leave). Greedy fails because taking a high-density item can leave unused weight capacity that lowers total value. Solved via **Dynamic Programming**:
  $$dp[i][w] = \begin{cases} dp[i-1][w], & \text{if } w_i > w \\ \max(dp[i-1][w], v_i + dp[i-1][w - w_i]), & \text{if } w_i \le w \end{cases}$$
  Complexity: $O(n \cdot W)$ pseudo-polynomial time.

\`\`\`c
/* Pure C implementation of 0/1 Knapsack via Dynamic Programming */
#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int knapsack_01(int W, const int wt[], const int val[], int n) {
    int dp[n + 1][W + 1];
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            } else if (wt[i - 1] <= w) {
                dp[i][w] = max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}
\`\`\`

---

## 6. Official CURAJ CIA-1 Examination Papers & Comprehensive Model Solutions (August 2024, CSC-404)

> [!IMPORTANT]
> **Official University Examination Paper Analysis**:
> - **Institution**: Central University of Rajasthan (CURAJ)
> - **Department**: Department of Computer Science, School of Mathematics, Statistics & Computational Sciences
> - **Examination**: Continuous Internal Assessment I (CIA-1) — August 2024
> - **Degree & Branch**: M.Sc. (CS) - I Semester / Integrated M.Sc. (CS) - VII Semester
> - **Course Code & Title**: **CSC-404 Advanced Algorithms**
> - **Exam Duration**: 1 Hour | **Maximum Marks**: 20 Marks
> - **Coverage**: Asymptotic Measures ($\Theta, \Omega, O$), Binary Search Analysis & Recurrence, Master Method, Iteration Method

### 📸 Official Examination Question Paper (August 2024)

![Official CURAJ First Mid-Term Examination (August-2024) Question Paper for CSC-404 Advanced Algorithms](/AIGOCIA12024.jpg)

---

### Question 1: Give formal definitions for complexity measures - Theta ($\Theta$), Omega ($\Omega$), and big oh ($O$). [5 Marks]

> **CURAJ Marking Scheme Rubric**:
> - **Definition of Big-Oh ($O$) with inequality, constants, and geometric graph**: 1.5 Marks
> - **Definition of Big-Omega ($\Omega$) with inequality, constants, and graph**: 1.5 Marks
> - **Definition of Big-Theta ($\Theta$) and Equivalence Theorem**: 2.0 Marks

#### Model Solution:

##### 1. Big-Oh ($O$) Notation — Asymptotic Upper Bound:
For a given function $g(n)$, $O(g(n))$ is defined as:
$$O(g(n)) = \{f(n) : \exists \text{ positive constants } c > 0 \text{ and } n_0 > 0 \text{ such that } 0 \le f(n) \le c \cdot g(n), \; \forall n \ge n_0\}$$
- **Significance**: Specifies an asymptotic upper bound. For all input sizes at or beyond $n_0$, the value of $f(n)$ is bounded from above by $c \cdot g(n)$.
- **Example**: If $f(n) = 3n + 8$, choose $c = 4$ and $n_0 = 8$. Then $3n + 8 \le 4n$ holds $\forall n \ge 8$. Hence $3n + 8 = O(n)$.

##### 2. Big-Omega ($\Omega$) Notation — Asymptotic Lower Bound:
For a given function $g(n)$, $\Omega(g(n))$ is defined as:
$$\Omega(g(n)) = \{f(n) : \exists \text{ positive constants } c > 0 \text{ and } n_0 > 0 \text{ such that } 0 \le c \cdot g(n) \le f(n), \; \forall n \ge n_0\}$$
- **Significance**: Specifies an asymptotic lower bound. For all inputs at or beyond $n_0$, the algorithm's running time will take at least $c \cdot g(n)$ steps.
- **Example**: If $f(n) = 5n^2 - 3n$, choose $c = 4$ and $n_0 = 3$. Then $4n^2 \le 5n^2 - 3n$ holds $\forall n \ge 3$. Hence $5n^2 - 3n = \Omega(n^2)$.

##### 3. Big-Theta ($\Theta$) Notation — Asymptotically Tight Bound:
For a given function $g(n)$, $\Theta(g(n))$ is defined as:
$$\Theta(g(n)) = \{f(n) : \exists \text{ positive constants } c_1 > 0, c_2 > 0, \text{ and } n_0 > 0 \text{ such that } 0 \le c_1 g(n) \le f(n) \le c_2 g(n), \; \forall n \ge n_0\}$$
- **Equivalence Theorem (CLRS Theorem 3.1)**:  
  For any two functions $f(n)$ and $g(n)$:
  $$f(n) = \Theta(g(n)) \iff f(n) = O(g(n)) \quad \text{and} \quad f(n) = \Omega(g(n))$$
- **Significance**: $f(n)$ is bounded from above and below by constant multiples of $g(n)$. $g(n)$ is an asymptotically tight bound.

---

### Question 2: Write an algorithm for searching an element using the binary search method. Analyze the algorithm by writing the recurrence relation and solve it to determine its time complexity. [5 Marks]

> **CURAJ Marking Scheme Rubric**:
> - **Correct Binary Search Algorithm / C implementation with loop/recursive condition**: 2 Marks
> - **Formulation of Recurrence Relation with base case**: 1.5 Marks
> - **Step-by-step solving of recurrence to $O(\log n)$**: 1.5 Marks

#### Model Solution:

##### 1. Algorithm for Binary Search (in C):
\`\`\`c
int binary_search(const int A[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; /* Avoids integer overflow */
        if (A[mid] == key)
            return mid; /* Element found */
        else if (A[mid] < key)
            low = mid + 1; /* Search right half */
        else
            high = mid - 1; /* Search left half */
    }
    return -1; /* Element not present */
}
\`\`\`

##### 2. Recurrence Relation Formulation:
In each iteration, binary search performs $O(1)$ comparisons ($A[mid] == key$, $A[mid] < key$) and discards half of the remaining array. Thus:
$$T(n) = \begin{cases} c_1, & \text{if } n = 1 \\ T\left(\left\lfloor \frac{n}{2} \right\rfloor\right) + c_2, & \text{if } n > 1 \end{cases}$$
Where $c_1$ and $c_2$ are positive constants.

##### 3. Solving the Recurrence (Iteration Method):
Assume $n = 2^k$ for simplicity:
$$T(n) = T(n/2) + c_2$$
$$T(n) = [T(n/4) + c_2] + c_2 = T(n/2^2) + 2c_2$$
$$T(n) = [T(n/8) + c_2] + 2c_2 = T(n/2^3) + 3c_2$$
$$...$$
$$\text{After } k \text{ iterations: } T(n) = T\left(\frac{n}{2^k}\right) + k \cdot c_2$$

The search terminates when the subproblem size becomes $1$:
$$\frac{n}{2^k} = 1 \implies n = 2^k \implies k = \log_2 n$$

Substitute $k = \log_2 n$ and $T(1) = c_1$:
$$T(n) = T(1) + c_2 \log_2 n = c_1 + c_2 \log_2 n = \mathbf{\Theta(\log_2 n)}$$
Hence, the time complexity of Binary Search is **$\Theta(\log n)$**.

---

### Question 3: Explain the master method for solving recurrences. Use the master method to solve the following recurrence equation: [5 Marks]
$$T(n) = T\left(\frac{2n}{3}\right) + 1$$

> **CURAJ Marking Scheme Rubric**:
> - **Explanation of Master Method & statement of 3 cases**: 2.5 Marks
> - **Identification of $a, b, f(n)$, calculation of $n^{\log_b a}$**: 1 Mark
> - **Matching Case 2 and final solution $\Theta(\log n)$**: 1.5 Marks

#### Model Solution:

##### 1. Master Method Explanation (CLRS Chapter 4.5):
The Master Method provides a cookbook recipe for solving divide-and-conquer recurrences of the form:
$$T(n) = a T(n/b) + f(n)$$
where $a \ge 1$ is the number of recursive subproblems, $b > 1$ is the factor by which subproblem size is divided, and $f(n)$ is the cost of dividing and combining.

The solution is determined by comparing $f(n)$ with the watershed function $n^{\log_b a}$:
- **Case 1**: If $f(n) = O(n^{\log_b a - \epsilon})$ for some $\epsilon > 0$, then $T(n) = \Theta(n^{\log_b a})$.
- **Case 2**: If $f(n) = \Theta(n^{\log_b a} \log^k n)$ for $k \ge 0$, then $T(n) = \Theta(n^{\log_b a} \log^{k+1} n)$.
- **Case 3**: If $f(n) = \Omega(n^{\log_b a + \epsilon})$ for $\epsilon > 0$, and $a f(n/b) \le c f(n)$ for $c < 1$, then $T(n) = \Theta(f(n))$.

##### 2. Solving $T(n) = T\left(\frac{2n}{3}\right) + 1$:
Rewrite the argument as a division:
$$T(n) = T\left(\frac{n}{3/2}\right) + 1$$

- Parameter identification:
  $$a = 1, \quad b = \frac{3}{2} = 1.5, \quad f(n) = 1$$
- Compute the watershed exponent $\log_b a$:
  $$\log_b a = \log_{1.5}(1) = 0$$
- Evaluate $n^{\log_b a}$:
  $$n^{\log_b a} = n^0 = 1$$
- Compare $f(n)$ with $n^{\log_b a}$:
  $$f(n) = 1 = \Theta(1) = \Theta(n^{\log_b a})$$

This corresponds exactly to **Master Method Case 2** with $k = 0$:
$$T(n) = \Theta(n^{\log_b a} \log^{0+1} n) = \Theta(n^0 \log n) = \mathbf{\Theta(\log n)}$$
Hence, the solution is **$\Theta(\log n)$**.

---

### Question 4: Solve the following recurrence equation using iteration method: [5 Marks]
$$T(n) = \begin{cases} b, & n \le 2 \\ 7T\left(\frac{n}{2}\right) + an^2, & n > 2 \end{cases}$$
where $a$ and $b$ are constants.

> **CURAJ Marking Scheme Rubric**:
> - **Step-by-step expansion for $k = 1, 2, 3$ iterations**: 2 Marks
> - **Formulation of general $k$-th iteration term and geometric series**: 1.5 Marks
> - **Base-case stopping condition $n/2^k = 2$ and asymptotic result $\Theta(n^{\log_2 7})$**: 1.5 Marks

#### Model Solution:

##### 1. Repeated Substitution (Unrolling):
Given for $n > 2$:
$$T(n) = 7 T\left(\frac{n}{2}\right) + an^2 \quad \text{--- (1)}$$

Substitute $n/2$ into the recurrence:
$$T\left(\frac{n}{2}\right) = 7 T\left(\frac{n}{4}\right) + a\left(\frac{n}{2}\right)^2 = 7 T\left(\frac{n}{4}\right) + \frac{an^2}{4}$$

Substitute into equation (1):
$$T(n) = 7 \left[7 T\left(\frac{n}{4}\right) + \frac{an^2}{4}\right] + an^2 = 7^2 T\left(\frac{n}{4}\right) + an^2 \left[1 + \frac{7}{4}\right] \quad \text{--- (2)}$$

Substitute $n/4$ into the recurrence:
$$T\left(\frac{n}{4}\right) = 7 T\left(\frac{n}{8}\right) + a\left(\frac{n}{4}\right)^2 = 7 T\left(\frac{n}{8}\right) + \frac{an^2}{16}$$

Substitute into equation (2):
$$T(n) = 7^2 \left[7 T\left(\frac{n}{8}\right) + \frac{an^2}{16}\right] + an^2 \left[1 + \frac{7}{4}\right]$$
$$T(n) = 7^3 T\left(\frac{n}{8}\right) + an^2 \left[1 + \frac{7}{4} + \left(\frac{7}{4}\right)^2\right] \quad \text{--- (3)}$$

##### 2. General $k$-th Iteration Pattern:
$$T(n) = 7^k T\left(\frac{n}{2^k}\right) + an^2 \sum_{i=0}^{k-1} \left(\frac{7}{4}\right)^i \quad \text{--- (4)}$$

##### 3. Applying the Base Case:
The recurrence stops when the subproblem size satisfies the base condition $n \le 2$:
$$\frac{n}{2^k} = 2 \implies n = 2^{k+1} \implies k + 1 = \log_2 n \implies k = \log_2 n - 1$$
At this point, $T(n/2^k) = T(2) = b$.

Evaluate the first term $7^k T(2)$:
$$7^k = 7^{\log_2 n - 1} = \frac{7^{\log_2 n}}{7} = \frac{n^{\log_2 7}}{7}$$
$$\implies 7^k T(2) = \frac{b}{7} n^{\log_2 7}$$

##### 4. Evaluating the Geometric Progression:
The series $\sum_{i=0}^{k-1} (7/4)^i$ is a geometric series with initial term $1$, ratio $r = 7/4 > 1$, and $k$ terms:
$$\sum_{i=0}^{k-1} \left(\frac{7}{4}\right)^i = \frac{(7/4)^k - 1}{7/4 - 1} = \frac{(7/4)^k - 1}{3/4} = \frac{4}{3} \left[\left(\frac{7}{4}\right)^k - 1\right] = \frac{4}{3} \left[\frac{7^k}{4^k} - 1\right]$$

Note that:
$$4^k = 4^{\log_2 n - 1} = \frac{(2^{\log_2 n})^2}{4} = \frac{n^2}{4}, \qquad 7^k = \frac{n^{\log_2 7}}{7}$$
$$\implies \frac{7^k}{4^k} = \frac{n^{\log_2 7} / 7}{n^2 / 4} = \frac{4}{7} \cdot \frac{n^{\log_2 7}}{n^2}$$

Multiply by $a n^2$:
$$a n^2 \cdot \frac{4}{3} \left[\frac{4}{7} \cdot \frac{n^{\log_2 7}}{n^2} - 1\right] = \frac{4}{3} a n^2 \left[\frac{4}{7} \cdot \frac{n^{\log_2 7}}{n^2}\right] - \frac{4}{3} a n^2 = \frac{16 a}{21} n^{\log_2 7} - \frac{4 a}{3} n^2$$

##### 5. Final Asymptotic Solution:
Summing both terms into equation (4):
$$T(n) = \frac{b}{7} n^{\log_2 7} + \frac{16 a}{21} n^{\log_2 7} - \frac{4 a}{3} n^2 = \left(\frac{b}{7} + \frac{16 a}{21}\right) n^{\log_2 7} - \frac{4 a}{3} n^2$$

Since $\log_2 7 \approx 2.80735 > 2$, the term $n^{\log_2 7}$ asymptotically dominates $n^2$. Therefore:
$$T(n) = \mathbf{\Theta\left(n^{\log_2 7}\right) \approx \Theta(n^{2.807})}$$
*(This is the exact derivation of Strassen's Matrix Multiplication complexity!)*

---

## 7. UGC NET / JRF & GATE CS Preparation Corner

### 7.1 High-Yield Examination Points & Recurrent Traps
1. **Big-$O$ Is NOT 'Worst Case'**:
   - Big-$O$ is an **asymptotic upper bound**, not a case. It can bound best, worst, or average cases.
   - Saying 'QuickSort's best-case time complexity is $O(n \log n)$' is 100% mathematically correct!
2. **Comparison-Based Sorting Lower Bound**:
   - Any comparison-based sorting algorithm requires at least $\Omega(n \log n)$ comparisons in the worst case (proven by the binary decision tree model of height $\lceil \log_2(n!) \rceil \ge n \log_2(n/e)$).
3. **Master Theorem Case Gaps**:
   - Remember that the condition $f(n) = O(n^{\log_b a - \epsilon})$ requires a **polynomial** difference ($
^\epsilon$). It is not enough for $f(n)$ to be simply smaller than $n^{\log_b a}$.
4. **Inversion Counting**:
   - An inversion in array $A$ is a pair $(i, j)$ such that $i < j$ and $A[i] > A[j]$. Insertion Sort makes exactly (number of inversions) $+ (n - 1)$ comparisons.

---

## 8. Master Formula Cheat Sheet & Quick-Reference Guide

### 8.1 Asymptotic Notation Quick Reference

| Notation | Meaning | Mathematical Criterion | Limit Analogy |
|:---:|:---|:---|:---:|
| **$O$** | Asymptotic Upper Bound | $f(n) \le c \cdot g(n)$ for $n \ge n_0$ | $\le$ |
| **$\Omega$** | Asymptotic Lower Bound | $f(n) \ge c \cdot g(n)$ for $n \ge n_0$ | $\ge$ |
| **$\Theta$** | Asymptotically Tight Bound | $c_1 g(n) \le f(n) \le c_2 g(n)$ for $n \ge n_0$ | $=$ |
| **$o$** | Strict Asymptotic Upper Bound | $\forall c > 0, f(n) < c \cdot g(n)$ for $n \ge n_0$ | $<$ |
| **$\omega$** | Strict Asymptotic Lower Bound | $\forall c > 0, f(n) > c \cdot g(n)$ for $n \ge n_0$ | $>$ |

---

### 8.2 Master Theorem Quick Lookup Matrix

| Recurrence Form | Watershed $n^{\log_b a}$ | $f(n)$ Comparison | Case | Final Bound $T(n)$ | Canonical Example |
|---|:---:|:---:|:---:|:---:|---|
| $T(n) = T(2n/3) + 1$ | $n^0 = 1$ | $f(n) = \Theta(1)$ | Case 2 ($k=0$) | $\Theta(\log n)$ | Binary Search on 2/3 scale |
| $T(n) = T(n/2) + 1$ | $n^0 = 1$ | $f(n) = \Theta(1)$ | Case 2 ($k=0$) | $\Theta(\log n)$ | **Binary Search** |
| $T(n) = 2T(n/2) + n$ | $n^1 = n$ | $f(n) = \Theta(n)$ | Case 2 ($k=0$) | $\Theta(n \log n)$ | **Merge Sort** |
| $T(n) = 7T(n/2) + n^2$ | $n^{\log_2 7} \approx n^{2.807}$ | $f(n) = O(n^{2.807 - \epsilon})$ | Case 1 | $\Theta(n^{\log_2 7})$ | **Strassen's Matrix Multiply** |
| $T(n) = 8T(n/2) + n^2$ | $n^3$ | $f(n) = O(n^{3 - \epsilon})$ | Case 1 | $\Theta(n^3)$ | **Naive Block Matrix Multiply** |
| $T(n) = 3T(n/4) + n^2$ | $n^{\log_4 3} \approx n^{0.79}$ | $f(n) = \Omega(n^{0.79 + \epsilon})$ | Case 3 | $\Theta(n^2)$ | Root-dominated recurrence |

---

### 8.3 Sorting & Searching Complexity Master Matrix

| Algorithm | Paradigm | Best Time | Average Time | Worst Time | Space | Stable? | In-Place? |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Binary Search** | Divide & Conquer | $\Theta(1)$ | $\Theta(\log n)$ | $\Theta(\log n)$ | $O(1)$ | N/A | Yes |
| **Merge Sort** | Divide & Conquer | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n)$ | **Yes** | No |
| **Quick Sort** | Divide & Conquer | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n^2)$ | $\Theta(\log n)$ | No | **Yes** |
| **Randomized QuickSort** | Randomized D&C | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n^2)$ | $\Theta(\log n)$ | No | **Yes** |
| **Min-Max Selection** | Divide & Conquer | $\lceil 3n/2 \rceil - 2$ | $\lceil 3n/2 \rceil - 2$ | $\lceil 3n/2 \rceil - 2$ | $O(\log n)$ | N/A | Yes |
| **0/1 Knapsack** | Dynamic Programming | $\Theta(n W)$ | $\Theta(n W)$ | $\Theta(n W)$ | $\Theta(n W)$ | N/A | No |
| **Fractional Knapsack** | Greedy | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(1)$ | N/A | Yes |
`,
  practiceQuiz: [
    {
      id: "algo-u1-q1",
      question:
        "According to CLRS, what is the formal definition of the asymptotic upper bound notation f(n) = O(g(n))?",
      options: [
        "There exist positive constants c and n\u2080 such that 0 \u2264 c\u00b7g(n) \u2264 f(n) for all n \u2265 n\u2080",
        "There exist positive constants c and n\u2080 such that 0 \u2264 f(n) \u2264 c\u00b7g(n) for all n \u2265 n\u2080",
        "There exist positive constants c\u2081, c\u2082, and n\u2080 such that 0 \u2264 c\u2081\u00b7g(n) \u2264 f(n) \u2264 c\u2082\u00b7g(n) for all n \u2265 n\u2080",
        "lim_{n\u2192\u221e} f(n)/g(n) = 0",
      ],
      correctAnswer: 1,
      explanation:
        "By definition (CLRS Chapter 3), O(g(n)) denotes the set of functions {f(n) : there exist positive constants c and n\u2080 such that 0 \u2264 f(n) \u2264 c\u00b7g(n) for all n \u2265 n\u2080}. This provides an asymptotic upper bound.",
      difficulty: "easy",
      topicTag: "Asymptotic Notations",
    },
    {
      id: "algo-u1-q2",
      question: "Which asymptotic theorem guarantees that f(n) = \u0398(g(n))?",
      options: [
        "f(n) = O(g(n)) OR f(n) = \u03a9(g(n))",
        "f(n) = o(g(n)) AND f(n) = \u03c9(g(n))",
        "f(n) = O(g(n)) AND f(n) = \u03a9(g(n))",
        "lim_{n\u2192\u221e} f(n)/g(n) = 1",
      ],
      correctAnswer: 2,
      explanation:
        "CLRS Theorem 3.1 states: For any two functions f(n) and g(n), f(n) = \u0398(g(n)) if and only if f(n) = O(g(n)) and f(n) = \u03a9(g(n)). That is, g(n) is both an asymptotic upper bound and an asymptotic lower bound on f(n).",
      difficulty: "easy",
      topicTag: "Asymptotic Notations",
    },
    {
      id: "algo-u1-q3",
      question:
        "What is the solution to the recurrence relation T(n) = T(2n/3) + 1 (from CURAJ CIA-1 2024 Question 3) using the Master Method?",
      options: [
        "\u0398(1)",
        "\u0398(log n)",
        "\u0398(n^(log_{1.5} 1))",
        "\u0398(n)",
      ],
      correctAnswer: 1,
      explanation:
        "In T(n) = aT(n/b) + f(n), we have a = 1, b = 3/2, f(n) = 1. The watershed function is n^(log_{3/2} 1) = n^0 = 1. Since f(n) = \u0398(n^0), this is Master Theorem Case 2 with k = 0, giving T(n) = \u0398(n^0 \u00b7 log^{0+1} n) = \u0398(log n).",
      difficulty: "medium",
      topicTag: "Master Method",
    },
    {
      id: "algo-u1-q4",
      question:
        "In CURAJ CIA-1 2024 Question 4, the recurrence T(n) = 7T(n/2) + an\u00b2 for n > 2 with T(2) = b is solved by iteration. What is its asymptotic time complexity?",
      options: [
        "\u0398(n\u00b2)",
        "\u0398(n\u00b2 log n)",
        "\u0398(n^{log\u2082 7}) \u2248 \u0398(n^{2.807})",
        "\u0398(n\u00b3)",
      ],
      correctAnswer: 2,
      explanation:
        "Unrolling T(n) = 7^k T(n/2^k) + an\u00b2 \u2211_{i=0}^{k-1} (7/4)^i. Halting at n/2^k = 2 gives k = log\u2082 n - 1. The geometric ratio r = 7/4 > 1, meaning the sum is dominated by the highest power (7/4)^k. The total evaluates to \u0398(n^{log\u2082 7}) \u2248 \u0398(n^{2.807}), which is Strassen's matrix multiplication complexity.",
      difficulty: "hard",
      topicTag: "Recurrence by Iteration",
    },
    {
      id: "algo-u1-q5",
      question:
        "Why does the standard Master Method NOT apply to the recurrence T(n) = 2T(n/2) + n / log n?",
      options: [
        "Because a < 1",
        "Because b is not an integer",
        "Because the ratio f(n) / n^{log_b a} = 1/log n is asymptotically smaller than n^0, but not polynomially smaller by a factor of n^\u03b5",
        "Because f(n) is negative",
      ],
      correctAnswer: 2,
      explanation:
        "Here a = 2, b = 2, so n^{log_b a} = n. f(n) = n / log n. The ratio f(n)/n = 1/log n, which falls in the 'gap' between Case 1 and Case 2: f(n) is strictly smaller than n, but not polynomially smaller by n^\u03b5 for any positive \u03b5 > 0.",
      difficulty: "hard",
      topicTag: "Master Method Limitations",
    },
    {
      id: "algo-u1-q6",
      question:
        "In the C language implementation of Binary Search, why is calculating mid as 'low + (high - low) / 2' strictly preferred over '(low + high) / 2'?",
      options: [
        "Because low + (high - low) / 2 executes in fewer CPU clock cycles",
        "Because (low + high) / 2 can cause integer overflow when low + high exceeds INT_MAX",
        "Because low + (high - low) / 2 works for floating-point arrays",
        "Because (low + high) / 2 is not valid ANSI C syntax",
      ],
      correctAnswer: 1,
      explanation:
        "When low and high are large positive integers (near INT_MAX), their sum low + high can exceed 2\u00b3\u00b9 - 1, resulting in integer overflow and undefined behavior (negative index). 'low + (high - low) / 2' avoids this overflow completely.",
      difficulty: "medium",
      topicTag: "C Implementation Trap",
    },
    {
      id: "algo-u1-q7",
      question:
        "What is the worst-case number of comparisons required to simultaneously find the maximum and minimum elements in an unsorted array of n elements using Divide and Conquer?",
      options: ["2n - 2", "\u23083n/2\u2309 - 2", "n log n", "n - 1"],
      correctAnswer: 1,
      explanation:
        "By comparing elements in pairs (or dividing the array in half recursively), finding both max and min requires at most \u23083n/2\u2309 - 2 comparisons, compared to 2n - 2 comparisons in the naive linear scan.",
      difficulty: "medium",
      topicTag: "Divide and Conquer",
    },
    {
      id: "algo-u1-q8",
      question:
        "What is the auxiliary space complexity of Merge Sort implemented recursively on an array of size n in C?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 2,
      explanation:
        "Merge Sort requires an auxiliary buffer of size O(n) during the merge step to hold the sorted halves before copying back into the original array. The call stack also uses O(log n), so total auxiliary space is O(n).",
      difficulty: "easy",
      topicTag: "Merge Sort Complexity",
    },
    {
      id: "algo-u1-q9",
      question:
        "What are the worst-case and best-case time complexities of standard QuickSort with Lomuto partitioning?",
      options: [
        "Worst: O(n log n), Best: O(n)",
        "Worst: O(n\u00b2), Best: O(n log n)",
        "Worst: O(n\u00b2), Best: O(n\u00b2)",
        "Worst: O(n log n), Best: O(n log n)",
      ],
      correctAnswer: 1,
      explanation:
        "When the input array is already sorted or reverse sorted, Lomuto partition creates unbalanced splits (0 and n-1), leading to the worst-case recurrence T(n) = T(n-1) + O(n) = O(n\u00b2). When splits are balanced (n/2 and n/2), T(n) = 2T(n/2) + O(n) = O(n log n).",
      difficulty: "easy",
      topicTag: "QuickSort Complexity",
    },
    {
      id: "algo-u1-q10",
      question:
        "How does Strassen's algorithm achieve sub-cubic time complexity for matrix multiplication?",
      options: [
        "By reducing matrix additions from 18 to 7",
        "By computing 7 subproblem multiplications instead of 8 for 2\u00d72 blocks",
        "By converting matrix multiplication to fast Fourier transform",
        "By using an iterative dynamic programming lookup table",
      ],
      correctAnswer: 1,
      explanation:
        "Standard block matrix multiplication requires 8 recursive multiplications of size n/2, giving T(n) = 8T(n/2) + O(n\u00b2) = O(n\u00b3). Strassen cleverly reduced the multiplications from 8 to 7 (at the cost of 18 additions), yielding T(n) = 7T(n/2) + O(n\u00b2) = O(n^{log\u2082 7}) \u2248 O(n^{2.807}).",
      difficulty: "medium",
      topicTag: "Strassen Algorithm",
    },
    {
      id: "algo-u1-q11",
      question: "Which property describes Little-o notation f(n) = o(g(n))?",
      options: [
        "Upper bound that is asymptotically tight",
        "Upper bound that is NOT asymptotically tight; f(n) becomes insignificant relative to g(n) as n \u2192 \u221e",
        "Lower bound that holds for all constants c > 0",
        "Equality of functions up to a scalar constant",
      ],
      correctAnswer: 1,
      explanation:
        "f(n) = o(g(n)) means that for ANY positive constant c > 0, there exists n\u2080 such that 0 \u2264 f(n) < c\u00b7g(n) for all n \u2265 n\u2080. Equivalently, lim_{n\u2192\u221e} f(n)/g(n) = 0. It is an upper bound that is not tight (e.g. 2n = o(n\u00b2), but 2n\u00b2 \u2260 o(n\u00b2)).",
      difficulty: "medium",
      topicTag: "Little-o Notation",
    },
    {
      id: "algo-u1-q12",
      question:
        "Arrange the following functions in strictly increasing order of asymptotic growth rate: f\u2081(n) = 2\u207f, f\u2082(n) = n^{log n}, f\u2083(n) = n!, f\u2084(n) = n log n.",
      options: [
        "f\u2084 < f\u2082 < f\u2081 < f\u2083",
        "f\u2084 < f\u2081 < f\u2082 < f\u2083",
        "f\u2082 < f\u2084 < f\u2081 < f\u2083",
        "f\u2084 < f\u2082 < f\u2083 < f\u2081",
      ],
      correctAnswer: 0,
      explanation:
        "n log n is polynomial-logarithmic. n^{log n} = 2^{(log n)\u00b2} which is quasi-polynomial (faster than any polynomial, slower than 2\u207f). 2\u207f is exponential. n! is factorial (dominates 2\u207f by Stirling's approximation: n! \u2248 \u221a(2\u03c0n) (n/e)\u207f). Thus: n log n < n^{log n} < 2\u207f < n!.",
      difficulty: "hard",
      topicTag: "Asymptotic Hierarchy",
    },
    {
      id: "algo-u1-q13",
      question:
        "In recurrence analysis, what is the height of the recursion tree for T(n) = 3T(n/4) + cn\u00b2?",
      options: ["log\u2083 n", "log\u2084 n", "n/4", "3/4 log n"],
      correctAnswer: 1,
      explanation:
        "The problem size at depth i is n / 4\u2071. The tree reaches base case size 1 when n / 4\u2071 = 1, which implies 4\u2071 = n, or i = log\u2084 n. Thus the height of the recursion tree is log\u2084 n.",
      difficulty: "medium",
      topicTag: "Recursion Tree",
    },
    {
      id: "algo-u1-q14",
      question:
        "For the recurrence T(n) = 3T(n/4) + cn\u00b2, how does the work per level behave from root to leaves?",
      options: [
        "Increases exponentially toward the leaves (leaf-dominated)",
        "Remains constant at each level",
        "Decreases geometrically by a factor of 3/16 per level (root-dominated)",
        "Oscillates based on parity of n",
      ],
      correctAnswer: 2,
      explanation:
        "At depth i, there are 3\u2071 subproblems, each of size n/4\u2071, doing work c(n/4\u2071)\u00b2. Total work at level i is 3\u2071 \u00b7 c \u00b7 n\u00b2 / 16\u2071 = cn\u00b2 (3/16)\u2071. Since 3/16 < 1, the work decreases geometrically. The total sum is bounded by a convergent series dominated by the root cn\u00b2, yielding T(n) = \u0398(n\u00b2). This corresponds to Master Theorem Case 3.",
      difficulty: "hard",
      topicTag: "Recursion Tree Analysis",
    },
    {
      id: "algo-u1-q15",
      question:
        "Why can the Fractional Knapsack problem be solved optimally using a Greedy approach, while the 0/1 Knapsack problem cannot?",
      options: [
        "Fractional Knapsack has smaller weights than 0/1 Knapsack",
        "Fractional Knapsack exhibits the greedy-choice property (taking fractions of items with maximum value/weight ratio always leads to global optimum), whereas leaving empty space in 0/1 knapsack invalidates local greedy choices",
        "0/1 Knapsack is not an optimization problem",
        "Fractional Knapsack cannot be solved using Dynamic Programming",
      ],
      correctAnswer: 1,
      explanation:
        "In Fractional Knapsack, you can always take the highest value-to-weight density item to fill any remaining capacity. In 0/1 Knapsack, taking a high-density item might leave unused capacity that cannot be filled by another item, making a combination of lower-density items potentially more valuable overall.",
      difficulty: "medium",
      topicTag: "Greedy vs DP",
    },
    {
      id: "algo-u1-q16",
      question:
        "What is the time complexity of the Fractional Knapsack algorithm in C when using an array of n items?",
      options: [
        "O(n)",
        "O(n log n) due to sorting items by value-to-weight ratio",
        "O(n \u00b7 W) where W is the knapsack capacity",
        "O(2\u207f)",
      ],
      correctAnswer: 1,
      explanation:
        "The algorithm computes value/weight ratios for n items in O(n), sorts the items in descending order of ratio in O(n log n), and then iteratively consumes items in O(n). The bottleneck is sorting, giving overall time O(n log n).",
      difficulty: "easy",
      topicTag: "Fractional Knapsack",
    },
    {
      id: "algo-u1-q17",
      question:
        "What is the pseudo-polynomial time complexity of 0/1 Knapsack solved via Dynamic Programming with n items and maximum capacity W?",
      options: ["O(n log W)", "O(n \u00b7 W)", "O(W log n)", "O(2^{n+W})"],
      correctAnswer: 1,
      explanation:
        "The dynamic programming table has (n + 1) rows and (W + 1) columns. Filling each cell takes O(1) time using the recurrence dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]]). Total time and space is O(n \u00b7 W).",
      difficulty: "easy",
      topicTag: "0/1 Knapsack DP",
    },
    {
      id: "algo-u1-q18",
      question:
        "In QuickSort, what is the worst-case time complexity of Randomized QuickSort where the pivot is chosen uniformly at random from the subarray?",
      options: [
        "O(n log n)",
        "O(n)",
        "O(n\u00b2), though the probability of encountering this worst case is exponentially small (1/n!)",
        "O(n^{1.5})",
      ],
      correctAnswer: 2,
      explanation:
        "Randomized QuickSort still has a theoretical worst-case time complexity of O(n\u00b2) if the random choices happen to pick the absolute minimum or maximum element at every recursive step. However, its EXPECTED time complexity is strictly \u0398(n log n) regardless of the input ordering.",
      difficulty: "hard",
      topicTag: "Randomized QuickSort",
    },
    {
      id: "algo-u1-q19",
      question:
        "Which of the following sorting algorithms is comparison-based and has a guaranteed worst-case time complexity of O(n log n) and is STABLE?",
      options: ["QuickSort", "HeapSort", "MergeSort", "SelectionSort"],
      correctAnswer: 2,
      explanation:
        "MergeSort is comparison-based, has worst-case time O(n log n), and is stable (preserves the relative order of duplicate elements because in the merge step, L[i] <= R[j] prefers the left element). HeapSort is O(n log n) but unstable. QuickSort is unstable and O(n\u00b2) worst-case.",
      difficulty: "medium",
      topicTag: "Sorting Comparison",
    },
    {
      id: "algo-u1-q20",
      question:
        "In asymptotic analysis, if f(n) = \u0398(g(n)), which of the following relations MUST also be true?",
      options: [
        "f(n) = o(g(n))",
        "f(n) = \u03c9(g(n))",
        "g(n) = \u0398(f(n)) by transpose symmetry",
        "f(n) - g(n) = 0",
      ],
      correctAnswer: 2,
      explanation:
        "\u0398 is an equivalence relation on the set of functions. It satisfies reflexivity (f(n) = \u0398(f(n))), symmetry (f(n) = \u0398(g(n)) \u21d4 g(n) = \u0398(f(n))), and transitivity.",
      difficulty: "medium",
      topicTag: "Asymptotic Properties",
    },
  ],
};
