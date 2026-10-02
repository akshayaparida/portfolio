import { LearningModule } from "@/types/learning";

export const algocia126Module: LearningModule = {
  id: "algocia126",
  title:
    "CIA-1 Sept 2026: Official Question Paper & Verified Model Solutions (algocia126)",
  description:
    "Official CURAJ First Mid-Semester Examination (September 2026) Question Paper (algocia126.jpeg) for 6.0CSC02 Advanced Algorithms. Complete, verified 5-mark model solutions for all 4 questions covering Time & Space Complexity, 2-Way Merge comparisons, QuickSort Best-Case Recurrence, Optimal Huffman Coding (frequencies 4, 5, 7, 8, 10, 12, 20) with decode tree, and Decision vs. Counting Problems with Nondeterministic Linear Search.",
  status: "completed",
  tags: [
    "CURAJ MSc CS",
    "6.0CSC02",
    "CSC-404",
    "algocia126",
    "CIA-1 2026",
    "First Mid-Semester",
    "Advanced Algorithms",
    "QuickSort Recurrence",
    "Huffman Coding",
    "Nondeterministic Search",
    "Decision vs Counting",
    "Merge Comparisons",
  ],
  videoLectures: [
    {
      id: "lec-huffman-bari",
      title: "3.7 Huffman Coding with Complete Example & Tree Construction",
      channel: "Abdul Bari",
      youtubeId: "co4_ahEDCho",
      duration: "19:40",
      recommendedSpeed: "1.25x",
      description:
        "Step-by-step greedy prefix code tree construction, min-priority queue operations, and time complexity analysis to O(n log n).",
      examRelevance:
        "CURAJ CIA-1 2026 Q3 (5 Marks) — High Priority | Greedy Method",
      keyTopics: [
        "Greedy Choice Property in Coding",
        "Min-Heap / Priority Queue Merging",
        "Prefix-free Decode Tree Construction",
        "Average Weighted Path Length Calculation",
      ],
    },
    {
      id: "lec-quicksort-best-case-bari",
      title: "2.8.2 QuickSort Best Case Recurrence & Partition Analysis",
      channel: "Abdul Bari",
      youtubeId: "7h1s2SojIRw",
      duration: "26:45",
      recommendedSpeed: "1.25x",
      description:
        "Derivation of the balanced partition recurrence T(n) = 2T(n/2) + cn and solving with Master Theorem to Theta(n log n).",
      examRelevance:
        "CURAJ CIA-1 2026 Q2 (5 Marks) — High Priority | Recurrence Solving",
      keyTopics: [
        "Balanced Partitioning Condition",
        "Formulating T(n) = 2T(n/2) + Theta(n)",
        "Master Theorem Case 2 Application",
        "Recursion Tree Level-by-Level Work",
      ],
    },
    {
      id: "lec-time-space-complexity",
      title: "1.3 Time and Space Complexity Analysis of Algorithms",
      channel: "Abdul Bari",
      youtubeId: "9TlHvipP5yA",
      duration: "15:10",
      recommendedSpeed: "1.25x",
      description:
        "Formal mathematical definitions of time and space complexity, best vs worst cases, and comparison counting in merging.",
      examRelevance:
        "CURAJ CIA-1 2026 Q1 (5 Marks) — High Priority | Analysis Fundamentals",
      keyTopics: [
        "Time vs Space Complexity Definitions",
        "Fixed vs Variable Memory Components",
        "Best-Case vs Worst-Case Scenarios",
        "2-Way Merge Exact Comparison Bounds",
      ],
    },
    {
      id: "lec-np-nondeterministic-bari",
      title: "8.1 Introduction to NP-Completeness, P vs NP & Nondeterminism",
      channel: "Abdul Bari",
      youtubeId: "e2cF8a5aAhE",
      duration: "22:15",
      recommendedSpeed: "1.25x",
      description:
        "Formal distinction between Decision and Optimization/Counting problems, nondeterministic choice and verification, and O(1) nondeterministic search.",
      examRelevance:
        "CURAJ CIA-1 2026 Q4 (5 Marks) — High Priority | Complexity Theory",
      keyTopics: [
        "Decision Problems vs Counting Problems (#P)",
        "Nondeterministic Choice & Check Phases",
        "Nondeterministic Linear Search in O(1)",
        "Deterministic vs Nondeterministic Complexity",
      ],
    },
  ],
  resources: [
    {
      title: "Original Scanned Question Paper (algocia126.jpeg)",
      url: "/algocia126.jpeg",
      type: "documentation",
    },
    {
      title:
        "Introduction to Algorithms (CLRS 3rd/4th Edition, MIT Press) — Ch 3, 7, 16, 34",
      url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
      type: "documentation",
    },
    {
      title:
        "Algorithm Design (Jon Kleinberg & Éva Tardos, Pearson) — Greedy Algorithms & Huffman",
      url: "https://www.pearson.com/",
      type: "documentation",
    },
    {
      title:
        "NPTEL: Design and Analysis of Algorithms (Prof. Madhavan Mukund, CMI)",
      url: "https://nptel.ac.in/courses/106106131",
      type: "course",
    },
  ],
  detailedContent: `# 6.0CSC02: Advanced Algorithms — CIA-1 September 2026 (algocia126)

> **Central University of Rajasthan (CURAJ)**  
> **School of Mathematics, Statistics & Computational Sciences — Department of Computer Science**  
> **Examination**: CIA I – September 2026  
> **Degree & Semester**: M.Sc. (CS) - I Semester / Integrated M.Sc. (CS) - VII Semester  
> **Course Code & Title**: **6.0CSC02 Advanced Algorithms**  
> **Time Allowed**: 1 Hour (01 Hr.) | **Maximum Marks**: 20  
> **Exam Rubric**: *All four questions are compulsory; each carries 5 marks (4 × 5 = 20 Marks).*  
> **Question Paper Reference**: \`algocia126.jpeg\`  

---

## Official Question Paper Preview

![CURAJ First Mid-Semester Examination September 2026 Question Paper (algocia126)](/algocia126.jpeg)

* **Open Image in New Window**: [View Full Resolution (algocia126.jpeg)](/algocia126.jpeg)
* **Download Copy**: [Download Scanned Paper (algocia126.jpeg)](/algocia126.jpeg)

---

## Examination Paper Transcription & Overview

| Question No. | Prescribed Question Text | Topic Area | Prescribed Marks |
| :---: | :--- | :--- | :---: |
| **Q1** | Define time and space complexity. What do you understand by the best-case and worst-case complexity of an algorithm? Find number of comparisons required for merging two sorted lists of sizes $m$ and $n$ into a sorted list of size $m + n$. | Analysis of Algorithms & 2-Way Merge | **[5 Marks]** |
| **Q2** | Derive and solve recurrence equation for the best-case behavior of the quick sort. | Divide & Conquer / Recurrence Relations | **[5 Marks]** |
| **Q3** | Obtain a set of optimal Huffman codes for the messages $(m_1, m_2, m_3, m_4, m_5, m_6, m_7)$ with relative frequencies $(q_1, q_2, q_3, q_4, q_5, q_6, q_7) = (4, 5, 7, 8, 10, 12, 20)$. Draw the decode tree for this set of codes. Also, write time complexity for Huffman encoding. | Greedy Algorithms & Prefix Codes | **[5 Marks]** |
| **Q4** | With the help of suitable examples differentiate between decision and counting problems. Write a nondeterministic algorithm for linear search. Analyze the algorithm and determine its time complexity. | Complexity Theory & Nondeterminism | **[5 Marks]** |

---

## Question 1: Time & Space Complexity, Best/Worst Case, and 2-Way Merge Comparisons [5 Marks]

> **Official Exam Question**:  
> *Define time and space complexity. What do you understand by the best-case and worst-case complexity of an algorithm? Find number of comparisons required for merging two sorted lists of sizes $m$ and $n$ into a sorted list of size $m + n$.*

### 1.1 Definition of Time Complexity
**Time Complexity** of an algorithm quantifies the amount of computational time taken by the algorithm to run to completion as a function of the input size $n$.
- Rather than measuring wall-clock execution time (which depends heavily on hardware architecture, processor speed, operating system scheduling, compiler optimizations, and programming language), time complexity counts the **number of elementary operations** (such as arithmetic additions, variable assignments, comparisons, and pointer dereferences) executed.
- It is formally characterized using asymptotic notations:
  - Upper Bound: $O(g(n))$
  - Lower Bound: $\\Omega(g(n))$
  - Tight Bound: $\\Theta(g(n))$

### 1.2 Definition of Space Complexity
**Space Complexity** of an algorithm quantifies the total amount of memory space required by the algorithm during its execution as a function of the input size $n$.
Total memory space $S(P)$ of a program $P$ consists of two distinct components:
$$S(P) = c + S_v(n)$$
1. **Fixed Space Component ($c$)**: Independent of the characteristics of the inputs and outputs. It includes instruction space (code size), space for simple variables, fixed-size component variables, and constants.
2. **Variable Space Component ($S_v(n)$)**: Depends dynamically on the input size $n$. It includes:
   - Dynamic memory allocation on the heap (e.g., arrays, linked lists, hash tables).
   - Execution call stack memory required for recursion (each recursive frame stores return addresses, parameters, and local variables).
- **Auxiliary Space**: The temporary extra space allocated by the algorithm outside the memory taken up by the inputs themselves.

### 1.3 Best-Case and Worst-Case Complexity

| Metric | Definition & Meaning | Practical Significance | Canonical Example |
| :--- | :--- | :--- | :--- |
| **Best-Case Complexity** | The minimum number of basic operations executed by an algorithm for an input of size $n$, under the most favorable input configuration. | Provides an optimistic theoretical lower bound. Useful to identify when an algorithm can terminate early. | In **Linear Search**, finding the target element at the very first index $A[0]$ takes **$\\Theta(1)$** comparisons. In **Insertion Sort**, an already sorted array requires **$\\Theta(n)$** comparisons. |
| **Worst-Case Complexity** | The maximum number of basic operations executed by an algorithm across **all possible inputs** of size $n$. | Provides a strict, guaranteed upper bound. Crucial for real-time safety, SLA guarantees, and mission-critical systems. | In **Linear Search**, when the element is absent or at the last index $A[n-1]$, it requires **$n$ comparisons** ($\\Theta(n)$). In **QuickSort** with last-element pivot on an already sorted array, it requires **$\\Theta(n^2)$** comparisons. |

### 1.4 Number of Comparisons for Merging Two Sorted Lists of Sizes $m$ and $n$

Consider two pre-sorted lists:
- List $A = [a_1, a_2, \\dots, a_m]$ of length $m$
- List $B = [b_1, b_2, \\dots, b_n]$ of length $n$
- Target output list $C$ of length $m + n$.

The standard 2-way Merge procedure uses two cursor pointers $i$ and $j$:
\`\`\`c
void merge_sorted_lists(const int A[], int m, const int B[], int n, int C[]) {
    int i = 0, j = 0, k = 0;
    while (i < m && j < n) {
        if (A[i] <= B[j]) {      /* 1 Comparison per placed element */
            C[k++] = A[i++];
        } else {
            C[k++] = B[j++];
        }
    }
    while (i < m) C[k++] = A[i++]; /* Copied directly without comparisons */
    while (j < n) C[k++] = B[j++]; /* Copied directly without comparisons */
}
\`\`\`

#### Analysis of Comparison Bounds:
1. **Worst-Case Number of Comparisons**:
   - In each step of the \`while (i < m && j < n)\` loop, exactly **one key comparison** (\`A[i] <= B[j]\`) is made, and exactly **one element** is appended to $C$.
   - The loop continues until one of the two lists is completely exhausted.
   - At the exact moment one list is exhausted, at least $1$ element remains in the other list. In the worst scenario, exactly $1$ element remains in the second list, meaning $(m + n - 1)$ elements have already been placed via comparisons.
   - The final remaining element is transferred to $C$ by the subsequent cleanup loop without requiring any comparisons.
   - Therefore, the **maximum (worst-case) number of comparisons** is:
     $$\\text{Comparisons}_{\\max} = m + n - 1$$
   - **Condition for Worst-Case**: When the elements of $A$ and $B$ are strictly interleaved in the final sorted order.
     - *Example*: $A = [1, 3, 5]$ ($m = 3$), $B = [2, 4, 6]$ ($n = 3$).
     - Comparisons:
       1. Compare $1$ and $2 \\implies 1$ placed. (1 comp)
       2. Compare $3$ and $2 \\implies 2$ placed. (2 comps)
       3. Compare $3$ and $4 \\implies 3$ placed. (3 comps)
       4. Compare $5$ and $4 \\implies 4$ placed. (4 comps)
       5. Compare $5$ and $6 \\implies 5$ placed. (5 comps)
       6. List $A$ exhausted; $6$ copied without comparison.
     - Total comparisons $= 3 + 3 - 1 = 5$ comparisons.

2. **Best-Case Number of Comparisons**:
   - The best case occurs when all elements of one list are strictly smaller than the smallest element of the other list (e.g., all elements of $A$ precede all elements of $B$).
   - The smaller list (say size $\\min(m, n)$) is completely exhausted after comparing each of its elements with the first element of the other list.
   - The entire remaining larger list is then copied without any further comparisons.
   - Therefore, the **minimum (best-case) number of comparisons** is:
     $$\\text{Comparisons}_{\\min} = \\min(m, n)$$
   - *Example*: $A = [1, 2, 3]$ ($m = 3$), $B = [10, 20, 30, 40]$ ($n = 4$).
     - Comparisons: $1 < 10$, $2 < 10$, $3 < 10 \\implies 3$ comparisons. $A$ is exhausted; $B$ is copied directly. Total $= 3 = \\min(3, 4)$.

#### Summary of Comparison Limits:
$$\\min(m, n) \\le \\text{Comparisons} \\le m + n - 1$$
Asymptotically, merging two sorted lists requires $\\Theta(m + n)$ time and $O(m + n)$ auxiliary space.

---

## Question 2: QuickSort Best-Case Recurrence Derivation & Solution [5 Marks]

> **Official Exam Question**:  
> *Derive and solve recurrence equation for the best-case behavior of the quick sort.*

### 2.1 Mechanics of QuickSort
QuickSort is a Divide-and-Conquer sorting algorithm with three phases:
1. **Divide**: Partition the array $A[p \\dots r]$ into two subarrays $A[p \\dots q-1]$ and $A[q+1 \\dots r]$ around a pivot $A[q]$, such that every element in $A[p \\dots q-1] \\le A[q]$ and every element in $A[q+1 \\dots r] \\ge A[q]$.
   - Partitioning takes linear time $\\Theta(n) = cn$ for an array of size $n = r - p + 1$.
2. **Conquer**: Recursively sort the two subarrays by calls to QuickSort.
3. **Combine**: No combine step is required; the array is sorted in-place.

### 2.2 Derivation of the Best-Case Recurrence
The best-case behavior occurs when the partition routine always selects the **exact median** (or near median) element as the pivot at every recursive level.
- When the pivot divides the array of $n$ elements into two subproblems of almost identical sizes:
  - Left subarray size: $\\lfloor (n-1)/2 \\rfloor$
  - Right subarray size: $\\lceil (n-1)/2 \\rceil$
- In asymptotic analysis, ignoring floors and ceilings, each subproblem has size $n/2$.
- The partition subroutine on $n$ elements requires $cn$ operations ($n - 1$ comparisons plus pivot swaps).
- Base Case: An array of size $n \\le 1$ is already sorted and requires $O(1)$ time: $T(0) = T(1) = c_0$.

Thus, the exact recurrence relation for the best-case behavior is:
$$T(n) = \\begin{cases} c_0 & \\text{for } n \\le 1 \\\\[6pt] 2 T\\left(\\dfrac{n}{2}\\right) + c \\cdot n & \\text{for } n > 1 \\end{cases}$$

---

### 2.3 Solving the Recurrence Equation

#### Method 1: Master Theorem (CLRS Theorem 4.1)
The recurrence has the standard form:
$$T(n) = a T\\left(\\frac{n}{b}\\right) + f(n)$$
where:
- $a = 2$ (number of subproblems created)
- $b = 2$ (factor by which subproblem size is divided)
- $f(n) = cn = \\Theta(n^1)$ (work done outside the recursive calls)

1. Compute the critical **watershed function**:
   $$n^{\\log_b a} = n^{\\log_2 2} = n^1$$
2. Compare $f(n)$ with $n^{\\log_b a}$:
   $$f(n) = cn = \\Theta(n^1) = \\Theta(n^{\\log_b a})$$
3. This corresponds directly to **Case 2 of the Master Theorem** with $k = 0$:
   $$f(n) = \\Theta(n^{\\log_b a} \\cdot \\log^k n) \\implies T(n) = \\Theta(n^{\\log_b a} \\cdot \\log^{k+1} n)$$
4. Substituting $a = 2, b = 2, k = 0$:
   $$T(n) = \\Theta(n^1 \\cdot \\log^{0+1} n) = \\mathbf{\\Theta(n \\log_2 n)}$$

---

#### Method 2: Recursion Tree Analysis
Let us visualize the work done at each level of the tree:

\`\`\`
Level 0 (Root):                     cn                     = cn
                                  /    \\
Level 1:                     c(n/2)    c(n/2)              = cn
                            /    \\      /    \\
Level 2:                 c(n/4) c(n/4) c(n/4) c(n/4)       = cn
                          ...    ...    ...    ...
Level i:                 2^i nodes of size c(n/2^i)        = cn
                          ...    ...    ...    ...
Level log2(n) (Leaves):  n nodes of cost c0                = Theta(n)
\`\`\`

- **Depth of the tree**: The problem size shrinks as $n, n/2, n/4, \\dots, n/2^k$.
  Setting $n/2^k = 1 \\implies 2^k = n \\implies k = \\log_2 n$.
- **Number of levels**: Exactly $\\log_2 n + 1$ levels (from level $0$ to level $\\log_2 n$).
- **Work at each internal level $i$**:
  $$\\text{Work}_i = 2^i \\times c \\cdot \\left(\\frac{n}{2^i}\\right) = c \\cdot n$$
- **Summing over all levels**:
  $$T(n) = \\sum_{i=0}^{\\log_2 n - 1} (cn) + \\Theta(n) = cn \\cdot \\log_2 n + \\Theta(n) = \\mathbf{\\Theta(n \\log n)}$$

---

#### Method 3: Iterative Substitution Method
$$T(n) = 2T(n/2) + cn$$
$$= 2[2T(n/4) + c(n/2)] + cn = 2^2 T(n/2^2) + 2cn$$
$$= 2^2[2T(n/8) + c(n/4)] + 2cn = 2^3 T(n/2^3) + 3cn$$
Continuing for $k$ iterations:
$$T(n) = 2^k T\\left(\\frac{n}{2^k}\\right) + k \\cdot cn$$
Setting $n/2^k = 1 \\implies k = \\log_2 n$:
$$T(n) = n T(1) + cn \\log_2 n = c_0 n + cn \\log_2 n = \\mathbf{\\Theta(n \\log n)}$$

**Conclusion**: The best-case running time of QuickSort is strictly **$\\Theta(n \\log n)$**.

---

## Question 3: Optimal Huffman Codes, Decode Tree & Complexity [5 Marks]

> **Official Exam Question**:  
> *Obtain a set of optimal Huffman codes for the messages $(m_1, m_2, m_3, m_4, m_5, m_6, m_7)$ with relative frequencies $(q_1, q_2, q_3, q_4, q_5, q_6, q_7) = (4, 5, 7, 8, 10, 12, 20)$. Draw the decode tree for this set of codes. Also, write time complexity for Huffman encoding.*

### 3.1 Given Data & Frequency Distribution
- Messages: $m_1, m_2, m_3, m_4, m_5, m_6, m_7$
- Relative Frequencies:
  $$q_1 = 4, \\; q_2 = 5, \\; q_3 = 7, \\; q_4 = 8, \\; q_5 = 10, \\; q_6 = 12, \\; q_7 = 20$$
- Total Frequency Weight:
  $$\\sum_{i=1}^7 q_i = 4 + 5 + 7 + 8 + 10 + 12 + 20 = 66$$

---

### 3.2 Step-by-Step Huffman Tree Construction (Min-Priority Queue)

Huffman's algorithm uses a greedy approach: in each step, extract the two nodes with the lowest frequencies, merge them into a new internal node whose weight is their sum, and reinsert it into the priority queue.

**Initial Priority Queue $Q$** (sorted by frequency):
$$Q = \\{ (m_1, 4), (m_2, 5), (m_3, 7), (m_4, 8), (m_5, 10), (m_6, 12), (m_7, 20) \\}$$

1. **Step 1**:
   - Extract two minimum: $m_1 (4)$ and $m_2 (5)$.
   - Create internal node $N_1$ with frequency $= 4 + 5 = 9$.
   - Left Child: $m_1 (4)$, Right Child: $m_2 (5)$.
   - Updated $Q$: $\\{ (m_3, 7), (m_4, 8), (N_1, 9), (m_5, 10), (m_6, 12), (m_7, 20) \\}$

2. **Step 2**:
   - Extract two minimum: $m_3 (7)$ and $m_4 (8)$.
   - Create internal node $N_2$ with frequency $= 7 + 8 = 15$.
   - Left Child: $m_3 (7)$, Right Child: $m_4 (8)$.
   - Updated $Q$: $\\{ (N_1, 9), (m_5, 10), (m_6, 12), (N_2, 15), (m_7, 20) \\}$

3. **Step 3**:
   - Extract two minimum: $N_1 (9)$ and $m_5 (10)$.
   - Create internal node $N_3$ with frequency $= 9 + 10 = 19$.
   - Left Child: $N_1 (9)$, Right Child: $m_5 (10)$.
   - Updated $Q$: $\\{ (m_6, 12), (N_2, 15), (N_3, 19), (m_7, 20) \\}$

4. **Step 4**:
   - Extract two minimum: $m_6 (12)$ and $N_2 (15)$.
   - Create internal node $N_4$ with frequency $= 12 + 15 = 27$.
   - Left Child: $m_6 (12)$, Right Child: $N_2 (15)$.
   - Updated $Q$: $\\{ (N_3, 19), (m_7, 20), (N_4, 27) \\}$

5. **Step 5**:
   - Extract two minimum: $N_3 (19)$ and $m_7 (20)$.
   - Create internal node $N_5$ with frequency $= 19 + 20 = 39$.
   - Left Child: $N_3 (19)$, Right Child: $m_7 (20)$.
   - Updated $Q$: $\\{ (N_4, 27), (N_5, 39) \\}$

6. **Step 6**:
   - Extract two remaining nodes: $N_4 (27)$ and $N_5 (39)$.
   - Create the Root node $R$ with frequency $= 27 + 39 = 66$.
   - Left Child: $N_4 (27)$, Right Child: $N_5 (39)$.
   - $Q$ now contains only the Root node. Tree construction is complete!

---

### 3.3 Decode Tree Diagram

\`\`\`
                              [Root: 66]
                             /          \\
                        0   /            \\   1
                           /              \\
                     [N4: 27]            [N5: 39]
                     /      \\            /      \\
                0   /        \\  1   0   /        \\  1
                   /          \\        /          \\
               m6(12)      [N2: 15]  [N3: 19]     m7(20)
                           /      \\   /      \\
                      0   /     1  \\ /  0   1  \\
                         /          \\           \\
                      m3(7)       m4(8) [N1: 9]   m5(10)
                                       /      \\
                                  0   /        \\  1
                                     /          \\
                                  m1(4)        m2(5)
\`\`\`

#### Mermaid Graph Representation:
\`\`\`mermaid
graph TD
    R["Root (66)"] -- 0 --> N4["N4 (27)"]
    R -- 1 --> N5["N5 (39)"]
    
    N4 -- 0 --> m6["m6 (freq 12)<br><b>Code: 00</b>"]
    N4 -- 1 --> N2["N2 (15)"]
    
    N2 -- 0 --> m3["m3 (freq 7)<br><b>Code: 010</b>"]
    N2 -- 1 --> m4["m4 (freq 8)<br><b>Code: 011</b>"]
    
    N5 -- 0 --> N3["N3 (19)"]
    N5 -- 1 --> m7["m7 (freq 20)<br><b>Code: 11</b>"]
    
    N3 -- 0 --> N1["N1 (9)"]
    N3 -- 1 --> m5["m5 (freq 10)<br><b>Code: 101</b>"]
    
    N1 -- 0 --> m1["m1 (freq 4)<br><b>Code: 1000</b>"]
    N1 -- 1 --> m2["m2 (freq 5)<br><b>Code: 1001</b>"]
\`\`\`

---

### 3.4 Resulting Optimal Huffman Codes & Transmission Cost

| Message ($m_i$) | Relative Frequency ($q_i$) | Tree Path (Root $\\to$ Leaf) | Optimal Huffman Code | Code Length ($l_i$ bits) | Total Weighted Bits ($q_i \\times l_i$) |
| :---: | :---: | :--- | :---: | :---: | :---: |
| **$m_1$** | 4 | Root $\\xrightarrow{1} N_5 \\xrightarrow{0} N_3 \\xrightarrow{0} N_1 \\xrightarrow{0} m_1$ | **\`1000\`** | 4 | $4 \\times 4 = 16$ |
| **$m_2$** | 5 | Root $\\xrightarrow{1} N_5 \\xrightarrow{0} N_3 \\xrightarrow{0} N_1 \\xrightarrow{1} m_2$ | **\`1001\`** | 4 | $5 \\times 4 = 20$ |
| **$m_3$** | 7 | Root $\\xrightarrow{0} N_4 \\xrightarrow{1} N_2 \\xrightarrow{0} m_3$ | **\`010\`** | 3 | $7 \\times 3 = 21$ |
| **$m_4$** | 8 | Root $\\xrightarrow{0} N_4 \\xrightarrow{1} N_2 \\xrightarrow{1} m_4$ | **\`011\`** | 3 | $8 \\times 3 = 24$ |
| **$m_5$** | 10 | Root $\\xrightarrow{1} N_5 \\xrightarrow{0} N_3 \\xrightarrow{1} m_5$ | **\`101\`** | 3 | $10 \\times 3 = 30$ |
| **$m_6$** | 12 | Root $\\xrightarrow{0} N_4 \\xrightarrow{0} m_6$ | **\`00\`** | 2 | $12 \\times 2 = 24$ |
| **$m_7$** | 20 | Root $\\xrightarrow{1} N_5 \\xrightarrow{1} m_7$ | **\`11\`** | 2 | $20 \\times 2 = 40$ |
| **Total** | **66** | — | — | — | **175 Bits** |

- **Prefix-Free Verification**: No assigned code is a prefix of any other code. Thus, decoding is unambiguous without delimiters.
- **Average Code Length ($L_{\\text{avg}}$)**:
  $$L_{\\text{avg}} = \\frac{\\sum_{i=1}^7 q_i \\cdot l_i}{\\sum_{i=1}^7 q_i} = \\frac{175}{66} \\approx \\mathbf{2.6515 \\text{ bits/character}}$$
- *Comparison with Fixed-Length Code*: With 7 symbols, fixed-length requires $\\lceil \\log_2 7 \\rceil = 3$ bits per symbol $\\implies 66 \\times 3 = 198$ bits. Huffman coding saves $198 - 175 = 23$ bits (a **11.62%** compression improvement).

---

### 3.5 Time Complexity for Huffman Encoding
Let $n$ denote the number of unique messages/symbols (here $n = 7$).
1. **Building Min-Priority Queue**:
   - Inserting $n$ leaf nodes using \`BUILD-MIN-HEAP\` takes $O(n)$ time (or $O(n \\log n)$ with repeated insertions).
2. **Merging Loop**:
   - The loop runs for exactly $(n - 1)$ iterations.
   - In each iteration:
     - Two \`EXTRACT-MIN\` operations: $2 \\times O(\\log n) = O(\\log n)$.
     - One internal node creation: $O(1)$.
     - One \`INSERT\` operation: $O(\\log n)$.
   - Cost per iteration: $O(\\log n)$.
   - Total for $(n - 1)$ iterations: $(n - 1) \\times O(\\log n) = O(n \\log n)$.
3. **Generating Codes by Tree Traversal**:
   - Depth-First Search (DFS) / recursion on a binary tree with $2n - 1$ total nodes takes $O(n)$ time.

**Total Time Complexity**:
$$\\mathbf{T(n) = O(n \\log n)}$$

> **Important Optimization Note**: If the input frequencies are **already sorted in ascending order** (as in this examination problem where $4 \\le 5 \\le 7 \\le 8 \\le 10 \\le 12 \\le 20$), the Huffman tree can be constructed in **linear $O(n)$ time** using two standard FIFO queues (one for initial sorted leaves and one for newly merged internal nodes).

---

## Question 4: Decision vs Counting Problems & Nondeterministic Linear Search [5 Marks]

> **Official Exam Question**:  
> *With the help of suitable examples differentiate between decision and counting problems. Write a nondeterministic algorithm for linear search. Analyze the algorithm and determine its time complexity.*

### 4.1 Decision Problems vs Counting Problems

#### Formal Definitions:
1. **Decision Problem**:
   - A computational problem whose output for any given instance is binary: either **YES** (1 / True) or **NO** (0 / False).
   - Formally, a decision problem corresponds to deciding membership in a formal language $L \\subseteq \\Sigma^*$:
     $$f_D(x) = \\begin{cases} 1 & \\text{if } x \\in L \\\\ 0 & \\text{if } x \\notin L \\end{cases}$$
   - Primary complexity classes: **P** (polynomial time solvable), **NP** (polynomial time verifiable), **co-NP**, **PSPACE**, etc.

2. **Counting Problem**:
   - A computational problem where the goal is to compute the **total number of distinct valid solutions** or witnesses for a given instance.
   - Formally, a counting problem computes an integer-valued function $f_C : \\Sigma^* \\to \\mathbb{N} = \\{0, 1, 2, \\dots\\}$.
   - Primary complexity class: **#P** ("Sharp-P" / "Number-P"), defined by Leslie Valiant (1979) as the class of counting problems associated with NP decision problems.

---

#### Comprehensive Comparison Table:

| Dimension | Decision Problem | Counting Problem |
| :--- | :--- | :--- |
| **Output Type** | Boolean: $\\{\\text{YES}, \\text{NO}\\}$ | Non-negative integer: $\\mathbb{N} = \\{0, 1, 2, \\dots\\}$ |
| **Core Question** | *"Does there exist at least one valid solution?"* | *"How many distinct valid solutions exist in total?"* |
| **Foundational Complexity Classes** | **P**, **NP**, **NP-Complete**, **co-NP** | **#P**, **#P-Complete**, **FP** |
| **Computational Hardness** | If a counting problem can be solved in time $T(n)$, the corresponding decision problem is solved in $T(n)$ by checking if $\\text{Count} > 0$. | Typically **much harder** than decision. Even when the decision problem is in **P**, the counting counterpart may be **#P-complete**! |
| **Real-world Applications** | Compilers, authorization, constraint satisfiability | Network reliability, Bayesian inference, statistical physics, cryptography |

#### Concrete Examples:

1. **Boolean Satisfiability (SAT)**:
   - *Decision Problem (SAT)*: Given a Boolean formula $\\phi$ in CNF, does there exist an assignment of truth values to variables that evaluates $\\phi$ to True? (Answer: YES / NO).
   - *Counting Problem (#SAT)*: Given a Boolean formula $\\phi$, how many distinct truth assignments satisfy $\\phi$? (Answer: An integer between $0$ and $2^n$).
2. **Hamiltonian Cycle**:
   - *Decision Problem*: Given an undirected graph $G = (V, E)$, does $G$ contain a simple cycle that visits every vertex exactly once? (Answer: YES / NO).
   - *Counting Problem (#Hamiltonian Cycles)*: Given $G$, exactly how many distinct Hamiltonian cycles exist in $G$?
3. **Bipartite Matching vs 0-1 Matrix Permanent**:
   - *Decision Problem (Bipartite Matching)*: Does bipartite graph $G$ have a perfect matching? $\\implies$ Solvable in **Polynomial Time ($P$)** using Hopcroft-Karp algorithm.
   - *Counting Problem (#Perfect Matchings / Permanent)*: How many perfect matchings exist? $\\implies$ **#P-Complete** (Valiant's Theorem), despite the decision problem being in $P$!

---

### 4.2 Nondeterministic Algorithm for Linear Search

#### Concept of Nondeterministic Computation:
A nondeterministic algorithm possesses an ideal guessing mechanism that can choose among multiple execution paths simultaneously. It operates in two sequential stages:
1. **Guessing Stage**: The algorithm nondeterministically guesses a candidate solution index using the primitive $\\text{choice}(1, n)$ in a single step.
2. **Verification Stage**: The algorithm deterministically checks whether the guessed candidate satisfies the problem condition. If verified, it executes $\\text{success}()$; otherwise, it halts with $\\text{failure}()$.

#### Pseudocode Formulation:
\`\`\`
Algorithm Nondeterministic_Linear_Search(A, n, key)
// Input:  Array A[1..n] of n elements, target search key
// Output: Prints index j where A[j] == key if key exists, else failure

1.  j = choice(1, n)            // Nondeterministic guess: chooses an index j in range [1, n]
2.  if A[j] == key then
3.      write("Element found at index: ", j)
4.      success()                // Valid computation path terminates successfully
5.  else
6.      failure()                // This computational path fails
\`\`\`

#### C-Style Algorithmic Specification:
\`\`\`c
/* Theoretical Model of Nondeterministic Linear Search */
#include <stdio.h>
#include <stdbool.h>

void nondeterministic_linear_search(const int A[], int n, int key) {
    /* Step 1: Nondeterministic Choice (Executed by the hypothetical oracle) */
    int j = choice(0, n - 1); /* Non-deterministically picks an index in O(1) */

    /* Step 2: Deterministic Verification */
    if (A[j] == key) {
        printf("Success: Key %d located at index %d\\n", key, j);
        success(); /* Returns True */
    } else {
        failure(); /* Returns False */
    }
}
\`\`\`

---

### 4.3 Complexity Analysis of Nondeterministic Linear Search

#### Time Complexity Analysis:
1. **Guessing Phase**:
   - The invocation of $\\text{choice}(1, n)$ selects an integer from $\\{1, 2, \\dots, n\\}$ non-deterministically.
   - By definition of the nondeterministic computing model (Turing machine branch), this selection takes **$O(1)$** time.
2. **Verification Phase**:
   - Fetching $A[j]$ from memory: $O(1)$.
   - Comparing $A[j]$ with $key$: $O(1)$.
   - Invoking $\\text{success}()$: $O(1)$.
3. **Total Nondeterministic Time Complexity**:
   $$T_{\\text{nondet}}(n) = O(1) + O(1) = \\mathbf{O(1)} = \\mathbf{\\Theta(1)}$$

---

#### Comparison: Nondeterministic vs Deterministic Linear Search

| Parameter | Deterministic Linear Search | Nondeterministic Linear Search |
| :--- | :--- | :--- |
| **Execution Model** | Single sequential deterministic path | Tree of parallel computation paths |
| **Best-Case Time** | $\\Theta(1)$ (target is at $A[0]$) | $\\Theta(1)$ |
| **Worst-Case Time** | $\\mathbf{\\Theta(n)}$ (target is at $A[n-1]$ or absent) | $\\mathbf{\\Theta(1)}$ |
| **Average-Case Time** | $\\Theta(n/2) = \\Theta(n)$ | $\\Theta(1)$ |
| **Theoretical Meaning** | Requires inspecting elements sequentially. | Demonstrates that verification of a candidate solution can be performed in constant (polynomial) time. Hence, Linear Search is in **NP** (and also in **P**). |

---

## Academic Assessment Summary & Exam Key Takeaways

1. **2-Way Merge Exact Comparisons**: Always remember both limits:
   $$\\min(m, n) \\le \\text{Comparisons} \\le m + n - 1$$
   Never write just $m + n$; the subtraction of $1$ is critical for full marks!
2. **QuickSort Best-Case Master Theorem Case**:
   - $a = 2, b = 2 \\implies n^{\\log_2 2} = n^1$.
   - $f(n) = cn = \\Theta(n^1) \\implies$ Master Method **Case 2** ($k = 0$).
   - Yields $T(n) = \\Theta(n \\log n)$.
3. **Huffman Coding Traversal**:
   - Left edge $= 0$, Right edge $= 1$.
   - More frequent symbols receive shorter bit sequences ($m_6, m_7$ get 2-bit codes; $m_1, m_2$ get 4-bit codes).
   - Time complexity is $O(n \\log n)$ with min-heap, reducible to $O(n)$ if pre-sorted.
4. **Decision vs Counting**:
   - Decision $= \\{\\text{YES}, \\text{NO}\\}$.
   - Counting $= \\mathbb{N}$. Counting belongs to class **#P** and is at least as hard as its decision equivalent.
   - Nondeterministic linear search runs in **$O(1)$** due to constant-time guessing and constant-time checking.
`,
  practiceQuiz: [
    {
      id: "algocia126-q1",
      question:
        "What is the MAXIMUM number of comparisons required to merge two sorted arrays of sizes m = 4 and n = 6 into a sorted array of size 10?",
      options: ["10", "9", "4", "24"],
      correctAnswer: 1,
      explanation:
        "In the worst case of 2-way merge, comparisons continue until one list is exhausted and exactly 1 element remains in the other list. The maximum number of comparisons is m + n - 1 = 4 + 6 - 1 = 9.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "2-Way Merge",
    },
    {
      id: "algocia126-q2",
      question:
        "Which case of the Master Theorem is applied to solve the QuickSort best-case recurrence T(n) = 2T(n/2) + cn?",
      options: [
        "Case 1 (Leaf-dominated, f(n) = O(n^(log_b a - epsilon)))",
        "Case 2 with k = 0 (Balanced work, f(n) = Theta(n^(log_b a)))",
        "Case 3 (Root-dominated, f(n) = Omega(n^(log_b a + epsilon)))",
        "Master Theorem cannot be applied to this recurrence",
      ],
      correctAnswer: 1,
      explanation:
        "Here a = 2, b = 2, so n^(log_b a) = n^(log_2 2) = n^1. Since f(n) = cn = Theta(n^1), f(n) matches n^(log_b a). This corresponds to Case 2 with k = 0, giving T(n) = Theta(n^(log_b a) * log^(k+1) n) = Theta(n log n).",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Master Theorem",
    },
    {
      id: "algocia126-q3",
      question:
        "For frequencies (4, 5, 7, 8, 10, 12, 20), what are the lengths of the Huffman codes assigned to the lowest frequency message (m1 with freq 4) and highest frequency message (m7 with freq 20)?",
      options: [
        "m1: 3 bits, m7: 3 bits",
        "m1: 4 bits, m7: 2 bits",
        "m1: 5 bits, m7: 1 bit",
        "m1: 2 bits, m7: 4 bits",
      ],
      correctAnswer: 1,
      explanation:
        "In the constructed optimal Huffman tree, m1 (frequency 4) is merged first into N1, then N3, then N5, and finally Root, placing it at depth 4 (code '1000', length 4 bits). Symbol m7 (frequency 20) is merged directly at the second-highest level (code '11', length 2 bits).",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Huffman Coding",
    },
    {
      id: "algocia126-q4",
      question:
        "What is the time complexity of the Huffman tree construction algorithm when the input frequencies are ALREADY SORTED in ascending order?",
      options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
      correctAnswer: 2,
      explanation:
        "If the input frequencies are pre-sorted, we can maintain two FIFO queues (one containing the original sorted leaf nodes, and one containing the newly created merged internal nodes). In each step, the two smallest nodes are found at the heads of the two queues in O(1) time. For n-1 merges, the overall time is O(n).",
      difficulty: "hard",
      type: "MCQ",
      topicTag: "Huffman Coding Complexity",
    },
    {
      id: "algocia126-q5",
      question:
        "Why does Nondeterministic Linear Search have a time complexity of O(1)?",
      options: [
        "Because it sorts the array first in O(1)",
        "Because guessing the index takes O(1) and verifying that A[j] == key takes O(1)",
        "Because it uses binary search internally",
        "Because hash tables allow O(1) lookups",
      ],
      correctAnswer: 1,
      explanation:
        "In the theoretical nondeterministic computational model, the oracle selects a candidate index j via choice(1, n) in a single step (O(1)). The deterministic verification phase simply performs a single comparison A[j] == key which takes O(1). Total nondeterministic time is O(1) + O(1) = O(1).",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Complexity Theory",
    },
    {
      id: "algocia126-q6",
      question:
        "Which of the following problems belongs to the counting complexity class #P (Sharp-P)?",
      options: [
        "Finding whether an undirected graph contains an Eulerian path",
        "Determining if a 3-CNF Boolean formula is satisfiable (3-SAT)",
        "Counting the total number of satisfying truth assignments of a Boolean formula (#SAT)",
        "Sorting an array of n numbers using MergeSort",
      ],
      correctAnswer: 2,
      explanation:
        "#P is the class of counting problems associated with decision problems in NP. While 3-SAT is in NP (and NP-complete), #SAT asks for the total number of satisfying assignments and is #P-complete.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Complexity Theory",
    },
  ],
};

export const cia1OfficialPaper2026Module: LearningModule = {
  ...algocia126Module,
  id: "cia1-2026-paper",
};
