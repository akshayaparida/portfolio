import { LearningModule } from "@/types/learning";

export const discreteMathWeek2Module: LearningModule = {
  id: "discrete-math-week-2",
  title: "Discrete Math: Week 2 — Set Theory & Counting",
  description:
    "Comprehensive cheatsheet for NPTEL Discrete Mathematics Week 2: All 20 syllabus topics covering Set Theory, Venn Diagrams, Principle of Inclusion-Exclusion, single/double set counting, power sets, non-empty subsets, permutations, combinations, committee selections, and complement identities.",
  status: "completed",
  tags: [
    "Discrete Mathematics",
    "NPTEL",
    "Set Theory",
    "Venn Diagrams",
    "Inclusion-Exclusion",
    "Combinatorics",
    "Permutations",
    "Combinations",
    "Power Sets",
    "Committee Selection",
  ],
  detailedContent: `# Discrete Mathematics: Week 2 — Set Theory & Counting Cheatsheet

Welcome to the **NPTEL Discrete Mathematics: Week 2 Quick Recall Cheatsheet**. This comprehensive study guide condenses all **20 syllabus topics** into rapid formula lookup cards, Venn diagram region breakdowns, step-by-step counting methods, Python implementations, and high-yield NPTEL / GATE CS exam traps.

---

## ⚡ 10-Second Quick Recall Formula Card (All 20 Topics)

| # | Topic | Primary Mathematical Formula / Identity | Rapid Exam Trick / Key Insight |
|:--|:------|:----------------------------------------|:-------------------------------|
| 1 | **Set Theory** | $S = \\{x \\mid P(x)\\}$ (ZFC Axiomatic Foundations) | Naive set comprehension fails on Russell's paradox ($R \\in R \\iff R \\notin R$). Modern CS uses typed universes. |
| 2 | **Sets & Notation** | Roster: $\\{a, b, c\\}$ \| Builder: $\\{x \\in \\mathbb{N} \\mid P(x)\\}$ | $\\in$ is element-to-set; $\\subseteq$ is set-to-set. $\\emptyset = \\{\\}$; $\\|\\emptyset\\| = 0$, but $\\|\\{\\emptyset\\}\\| = 1$. |
| 3 | **Union ($\\cup$)** | $A \\cup B = \\{x \\mid x \\in A \\lor x \\in B\\}$ | Logical **OR**. In bitmasks: bitwise OR (\`A \| B\`). Cardinality: $\\|A \\cup B\\| \\le \\|A\\| + \\|B\\|$. |
| 4 | **Intersection ($\\cap$)** | $A \\cap B = \\{x \\mid x \\in A \\land x \\in B\\}$ | Logical **AND**. In bitmasks: bitwise AND (\`A & B\`). If $A \\cap B = \\emptyset$, sets are **disjoint**. |
| 5 | **Set Difference (—)** | $A - B = \\{x \\mid x \\in A \\land x \\notin B\\} = A \\cap B'$ | Non-commutative: $A - B \\neq B - A$. In bitmasks: bitwise AND-NOT (\`A & ~B\`). |
| 6 | **Complement ($'$)** | $A' = U - A = \\{x \\in U \\mid x \\notin A\\}$ | Absolute complement relative to universe $U$. In bitmasks: bitwise NOT (\`~A & U\`). |
| 7 | **Subsets & Proper ($\\subseteq$)** | $A \\subseteq B \\iff \\forall x(x \\in A \\implies x \\in B)$ | Proper: $A \\subset B \\iff (A \\subseteq B \\land A \\neq B)$. $\\emptyset \\subseteq A$ is vacuously true for every $A$. |
| 8 | **De Morgan's Laws** | $(A \\cup B)' = A' \\cap B'$<br>$(A \\cap B)' = A' \\cup B'$ | Complement flips the operator: $\\cup \\leftrightarrow \\cap$. Generalized: $(\\bigcup A_i)' = \\bigcap A_i'$. |
| 9 | **Venn Diagrams** | 2 sets $\\implies 2^2 = 4$ disjoint regions<br>3 sets $\\implies 2^3 = 8$ disjoint regions | Work from innermost intersection outward: start by placing $\\|A \\cap B \\cap C\\|$ in the central core. |
| 10 | **Inclusion–Exclusion (PIE)** | $\\|A \\cup B\\| = \\|A\\| + \\|B\\| - \\|A \\cap B\\|$<br>$\\|A \\cup B \\cup C\\| = \\sum \\|A\\| - \\sum \\|A \\cap B\\| + \\|A \\cap B \\cap C\\|$ | Alternating signs: add singletons, subtract double overlaps, add triple overlaps. |
| 11 | **Counting Exactly One Set** | 3 sets: $\\sum \\|A\\| - 2\\sum \\|A \\cap B\\| + 3\\|A \\cap B \\cap C\\|$ | Each double intersection counts for two sets, so subtract with weight 2; center counts for three, so add with weight 3. |
| 12 | **Counting Exactly Two Sets** | 3 sets: $\\sum \\|A \\cap B\\| - 3\\|A \\cap B \\cap C\\|$ | Sum of pairwise intersections minus 3 times the triple intersection. |
| 13 | **Counting Only One Specific Set** | Only $A = \\|A \\cap B' \\cap C'\\| = \\|A\\| - \\|A \\cap B\\| - \\|A \\cap C\\| + \\|A \\cap B \\cap C\\|$ | Subtract overlaps involving $A$, then restore the triple intersection subtracted twice. |
| 14 | **Power Set / Subsets** | $\\|\\mathcal{P}(A)\\| = 2^n$ where $n = \\|A\\|$ | Each element has 2 independent choices: include ($1$) or exclude ($0$). $\\|\\mathcal{P}(\\emptyset)\\| = 2^0 = 1$. |
| 15 | **Non-empty Subsets** | $\\text{Non-empty Subsets} = 2^n - 1$ | Excludes the single empty set $\\emptyset$. Proper non-empty subsets $= 2^n - 2$ (excludes both $\\emptyset$ and $A$). |
| 16 | **Fundamental Counting** | Sum Rule: $m + n$ (disjoint OR)<br>Product Rule: $m \\times n$ (sequential AND) | Complement counting trick: $\\text{Valid Outcomes} = \\text{Total} - \\text{Forbidden Outcomes}$. |
| 17 | **Permutations $P(n, r)$** | $P(n, r) = \\frac{n!}{(n - r)!}$ | **Order MATTERS**. With repetition: $n^r$. Identical items: $\\frac{n!}{n_1! n_2! \\dots}$. Circular: $(n - 1)!$. |
| 18 | **Combinations $C(n, r)$** | $C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}$ | **Order DOES NOT matter**. Symmetry: $\\binom{n}{r} = \\binom{n}{n - r}$. Pascal: $\\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r}$. |
| 19 | **Committee Selection** | Pool selection with gender/category constraints | Use Case Splitting or Complement: "at least 1 woman" $= \\text{Total} - \\text{All Men}$. |
| 20 | **Complement Relationships** | $A - B = A \\cap B'$<br>$A \\subseteq B \\iff B' \\subseteq A'$ | Involution: $(A')' = A$. Contrapositive duality: subset containment reverses order under complementation. |

---

## What You'll Learn & Master (All 20 Topics)

| # | Topic | Core Competency for NPTEL & GATE CS |
|:--|:------|:------------------------------------|
| 1 | **Set Theory** | Understand mathematical collections, Russell's paradox, and formal axiomatic definitions |
| 2 | **Sets and Set Notation** | Distinguish roster form, set-builder notation, standard number sets, and membership vs subset |
| 3 | **Union ($\\cup$)** | Compute set unions, understand algebraic properties, and map to bitwise OR operations |
| 4 | **Intersection ($\\cap$)** | Compute shared elements, verify disjoint sets ($A \\cap B = \\emptyset$), and map to bitwise AND |
| 5 | **Set Difference (—)** | Calculate relative complements ($A - B = A \\cap B'$), symmetric differences, and bitwise masks |
| 6 | **Complement of a Set ($'$)** | Derive absolute complements with respect to $U$, understand boundaries, and compute bitwise NOT |
| 7 | **Subset and Proper/Non-proper Subset ($\\subseteq$)** | Differentiate proper ($A \\subset B$) vs improper ($A \\subseteq A$), and prove vacuous truth of $\\emptyset \\subseteq A$ |
| 8 | **De Morgan's Laws** | Apply $(A \\cup B)' = A' \\cap B'$ and $(A \\cap B)' = A' \\cup B'$ to logic, sets, and digital circuits |
| 9 | **Venn Diagrams** | Break down 2-set and 3-set spaces into independent atomic disjoint regions for visual problem solving |
| 10 | **Principle of Inclusion–Exclusion (PIE)** | Solve 2-set and 3-set union problems using alternating sum expansions |
| 11 | **Counting Exactly One Set** | Calculate elements belonging strictly to any single set in a 3-set system without overcounting |
| 12 | **Counting Exactly Two Sets** | Isolate elements belonging to pairwise intersections while strictly excluding triple overlaps |
| 13 | **Counting Only One Specific Set** | Determine elements strictly confined to a single target set ($A \\cap B' \\cap C'$) |
| 14 | **Power Set / Number of Subsets** | Prove $\\|\\mathcal{P}(A)\\| = 2^n$ via binary characteristic strings and binomial expansion |
| 15 | **Non-empty Subsets** | Solve constrained subset problems requiring at least one element ($2^n - 1$) or proper subsets ($2^n - 2$) |
| 16 | **Fundamental Counting Principle** | Apply the addition rule, multiplication rule, and complementary counting to multi-stage problems |
| 17 | **Permutations $P(n, r)$** | Calculate linear arrangements, multiset anagrams, circular seating, and consecutive blocks |
| 18 | **Combinations $C(n, r)$** | Form unordered selections, evaluate Pascal identities, and leverage algebraic binomial symmetries |
| 19 | **Committee/Group Selection** | Form constrained advisory teams under "at least", "at most", and mandatory member rules |
| 20 | **Complement Relationships of Sets** | Manipulate algebraic identities ($A - B = A \\cap B'$, $A \\subseteq B \\iff B' \\subseteq A'$) for theorem proofs |

---

## 20 Topics Detailed Reference & Problem Solving

### Topic 1: Set Theory Foundations & Russell's Paradox

A **set** is an unordered collection of distinct, well-defined mathematical objects.

#### Naive vs. Axiomatic Set Theory
In the late 19th century, **Georg Cantor** formulated *Naive Set Theory*, stating that any condition $P(x)$ forms a set $S = \\{x \\mid P(x)\\}$. In 1901, **Bertrand Russell** discovered that unrestricted set comprehension leads to fatal contradictions:

$$\\text{Russell's Set: } R = \\{x \\mid x \\notin x\\}$$

- If $R \\in R$, then by definition $R \\notin R$ (Contradiction).
- If $R \\notin R$, then by definition $R \\in R$ (Contradiction).
- Therefore, $R \\in R \\iff R \\notin R$, destroying naive set logic.

> [!IMPORTANT]
> **CS & Type Theory Resolution:**
> Modern computer science and mathematics resolve Russell's paradox using **Zermelo-Fraenkel Set Theory (ZFC)** and **Type Systems** (as used in TypeScript, Haskell, and Rust), preventing sets or types from containing themselves without universe stratification.

---

### Topic 2: Sets and Set Notation

#### 1. Roster (Tabular) Form
Explicitly list every member between curly braces:
$$A = \\{2, 4, 6, 8, 10\\}$$

#### 2. Set-Builder Form
Specify the predicate property governing membership:
$$A = \\{x \\in \\mathbb{N} \\mid x \\text{ is even and } x \\le 10\\}$$

#### Standard Number Universes
- $\\mathbb{N}$: Natural numbers $\\{0, 1, 2, 3, \\dots\\}$ or $\\{1, 2, 3, \\dots\\}$
- $\\mathbb{Z}$: Integers $\\{\\dots, -2, -1, 0, 1, 2, \\dots\\}$
- $\\mathbb{Q}$: Rational numbers $\\{\\frac{p}{q} \\mid p, q \\in \\mathbb{Z}, q \\neq 0\\}$
- $\\mathbb{R}$: Real numbers (continuous number line)
- $\\mathbb{C}$: Complex numbers $\\{a + bi \\mid a, b \\in \\mathbb{R}, i = \\sqrt{-1}\\}$
- $U$: The Universal Set containing all context objects

#### Membership ($\in$) vs Subset ($\subseteq$) Trap
- $\\in$ relates an **element** to a set: $3 \\in \\{1, 2, 3\\}$.
- $\\subseteq$ relates a **set** to a set: $\\{3\\} \\subseteq \\{1, 2, 3\\}$.
- If $S = \\{1, \\{2\\}\\}$, then $2 \\notin S$, but $\\{2\\} \\in S$ and $\\{\\{2\\}\\} \\subseteq S$.

---

### Topic 3: Union ($\cup$)

The union of $A$ and $B$ contains all elements that belong to $A$, or $B$, or both:

$$A \\cup B = \\{x \\mid x \\in A \\lor x \\in B\\}$$

\`\`\`text
         Universal Set U
    +-----------------------+
    |   /-------\\ /-------\\  |
    |  |  [A]   X   [B]   | |  <-- All shaded regions belong to A ∪ B
    |   \\-------/ \\-------/  |
    +-----------------------+
\`\`\`

#### Key Properties of Union
1. **Idempotent:** $A \\cup A = A$
2. **Identity:** $A \\cup \\emptyset = A$
3. **Domination:** $A \\cup U = U$
4. **Commutative:** $A \\cup B = B \\cup A$
5. **Associative:** $(A \\cup B) \\cup C = A \\cup (B \\cup C)$

---

### Topic 4: Intersection ($\cap$)

The intersection of $A$ and $B$ contains only the elements common to both sets:

$$A \\cap B = \\{x \\mid x \\in A \\land x \\in B\\}$$

#### Disjoint Sets
Two sets are **mutually disjoint** if they share zero elements:
$$A \\cap B = \\emptyset \\implies \\|A \\cup B\\| = \\|A\\| + \\|B\\|$$

#### Key Properties of Intersection
1. **Idempotent:** $A \\cap A = A$
2. **Identity:** $A \\cap U = A$
3. **Domination:** $A \\cap \\emptyset = \\emptyset$
4. **Distributive over Union:** $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$

---

### Topic 5: Set Difference (—)

The **set difference** $A - B$ (also denoted $A \\setminus B$) contains elements belonging to $A$ that do **not** belong to $B$:

$$A - B = \\{x \\mid x \\in A \\land x \\notin B\\} = A \\cap B'$$

#### Crucial Identities
- $A - B \\neq B - A$ (Set difference is **not commutative**).
- $A - B = A - (A \\cap B) = (A \\cup B) - B$.
- If $A \\cap B = \\emptyset$, then $A - B = A$.
- If $A \\subseteq B$, then $A - B = \\emptyset$.

#### Symmetric Difference ($\bigtriangleup$)
$$A \\bigtriangleup B = (A - B) \\cup (B - A) = (A \\cup B) - (A \\cap B)$$
Elements in either $A$ or $B$, but **not both**.

---

### Topic 6: Complement of a Set ($'$)

The **absolute complement** $A'$ (or $A^c$, $\\overline{A}$) consists of all elements in the universal set $U$ that are not in $A$:

$$A' = U - A = \\{x \\in U \\mid x \\notin A\\}$$

#### Fundamental Complement Axioms
1. $A \\cup A' = U$ (Law of excluded middle for sets)
2. $A \\cap A' = \\emptyset$ (Law of contradiction for sets)
3. $(A')' = A$ (Law of Involution / Double Complement)
4. $U' = \\emptyset$ and $\\emptyset' = U$

---

### Topic 7: Subset and Proper/Non-proper Subset ($\subseteq, \subset$)

#### Formal Subset Definition
$$A \\subseteq B \\iff \\forall x (x \\in A \\implies x \\in B)$$

#### Proper Subset ($A \\subset B$ or $A \\subsetneq B$)
$A$ is a **proper subset** of $B$ if every element of $A$ is in $B$, and $B$ contains at least one element not in $A$:
$$A \\subset B \\iff (A \\subseteq B \\land A \\neq B)$$

#### Improper (Non-proper) Subsets
- Every set is an **improper subset** of itself: $A \\subseteq A$.
- The only improper subset of $A$ is $A$ itself.
- For a set with $n$ elements, total subsets $= 2^n$, proper subsets $= 2^n - 1$.

#### The Empty Set Theorem
> **Theorem:** $\\emptyset \\subseteq A$ for every set $A$.
> **Proof:** By conditional logic, $x \\in \\emptyset \\implies x \\in A$ is **vacuously true** because the antecedent $x \\in \\emptyset$ is always false.

---

### Topic 8: De Morgan's Laws

De Morgan's Laws provide the mathematical bridge between union, intersection, and complementation.

$$\\text{Law 1: } (A \\cup B)' = A' \\cap B'$$
$$\\text{Law 2: } (A \\cap B)' = A' \\cup B'$$

#### Element-Wise Proof of $(A \\cup B)' = A' \\cap B'$
1. **LHS $\\subseteq$ RHS:**
   Let $x \\in (A \\cup B)'$.
   $\\implies x \\notin (A \\cup B)$
   $\\implies \\neg (x \\in A \\lor x \\in B)$
   $\\implies (x \\notin A) \\land (x \\notin B)$ (by propositional De Morgan)
   $\\implies x \\in A' \\land x \\in B'$
   $\\implies x \\in (A' \\cap B')$.
2. **RHS $\\subseteq$ LHS:**
   Let $x \\in (A' \\cap B')$.
   $\\implies x \\in A' \\land x \\in B'$
   $\\implies (x \\notin A) \\land (x \\notin B)$
   $\\implies \\neg (x \\in A \\lor x \\in B)$
   $\\implies x \\notin (A \\cup B) \\implies x \\in (A \\cup B)'$.
3. Since both contain each other, $(A \\cup B)' = A' \\cap B'$. $\\blacksquare$

---

### Topic 9: Venn Diagrams

Venn diagrams visually partition the universal set into mutually disjoint atomic regions.

#### 2-Set Venn Partition (4 Disjoint Regions)
\`\`\`text
                 Universal Set U
    +-----------------------------------------+
    |         Set A             Set B         |
    |      +---------+-------+---------+      |
    |      | Region 1|Region2| Region 3|      |
    |      |  Only A | A ∩ B |  Only B |      |
    |      +---------+-------+---------+      |
    |                                         |
    |             Region 4: Neither           |
    +-----------------------------------------+
\`\`\`

1. Region 1: $A - B = A \\cap B'$
2. Region 2: $A \\cap B$
3. Region 3: $B - A = B \\cap A'$
4. Region 4: $(A \\cup B)' = A' \\cap B'$

#### 3-Set Venn Partition (8 Disjoint Regions)
For 3 sets $A, B, C$, the space is partitioned into $2^3 = 8$ mutually disjoint atomic regions:
- **Core (1 region):** $A \\cap B \\cap C$
- **Pairwise Only (3 regions):** $(A \\cap B) - C$, $(B \\cap C) - A$, $(A \\cap C) - B$
- **Single Set Only (3 regions):** $A - (B \\cup C)$, $B - (A \\cup C)$, $C - (A \\cup B)$
- **Outside All (1 region):** $(A \\cup B \\cup C)'$

---

### Topic 10: Principle of Inclusion–Exclusion (PIE)

When calculating the size of a union, adding individual sizes double-counts elements in intersections. PIE systematically corrects for this using alternating addition and subtraction.

#### 2-Set Formula
$$\\|A \\cup B\\| = \\|A\\| + \\|B\\| - \\|A \\cap B\\|$$

#### 3-Set Formula
$$\\|A \\cup B \\cup C\\| = \\|A\\| + \\|B\\| + \\|C\\| - (\\|A \\cap B\\| + \\|B \\cap C\\| + \\|A \\cap C\\|) + \\|A \\cap B \\cap C\\|$$

#### Worked Problem (NPTEL Assignment Classic)
In a class of 120 CS students:
- 65 study Python ($P$), 50 study Java ($J$), 45 study C++ ($C$)
- 25 study Python & Java ($P \\cap J$), 20 study Python & C++ ($P \\cap C$), 15 study Java & C++ ($J \\cap C$)
- 10 study all three languages ($P \\cap J \\cap C$)

$$\\|P \\cup J \\cup C\\| = (65 + 50 + 45) - (25 + 20 + 15) + 10 = 160 - 60 + 10 = 110$$
Students studying **none** of these languages $= 120 - 110 = 10$.

---

### Topic 11: Counting Exactly One Set

How many elements belong to **exactly one** of the three sets $A, B, C$?

#### Formula Derivation
Summing $\\|A\\| + \\|B\\| + \\|C\\|$ counts:
- Elements in exactly 1 set: counted **once**.
- Elements in exactly 2 sets: counted **twice**.
- Elements in all 3 sets: counted **three times**.

To keep only elements in exactly 1 set:
- Subtract pairwise overlaps with coefficient $2$: $-2(\\|A \\cap B\\| + \\|B \\cap C\\| + \\|A \\cap C\\|)$.
- The center region $A \\cap B \\cap C$ was counted $+3$ times in the first term, and $-2 \\times 3 = -6$ times in the second term (net: $-3$).
- To make its count $0$, we must add $+3\\|A \\cap B \\cap C\\|$!

$$\\text{Count (Exactly 1 Set)} = \\|A\\| + \\|B\\| + \\|C\\| - 2(\\|A \\cap B\\| + \\|B \\cap C\\| + \\|A \\cap C\\|) + 3\\|A \\cap B \\cap C\\|$$

#### Worked Calculation:
Using our previous example data:
$$\\text{Count (Exactly 1 Set)} = 160 - 2(60) + 3(10) = 160 - 120 + 30 = 70 \\text{ students}$$

---

### Topic 12: Counting Exactly Two Sets

How many elements belong to **exactly two** of the sets $A, B, C$?

#### Formula Derivation
Summing pairwise intersections $(\\|A \\cap B\\| + \\|B \\cap C\\| + \\|A \\cap C\\|)$:
- Each pairwise-only region is counted **once**.
- The triple intersection $A \\cap B \\cap C$ is contained in all 3 pairwise intersections, so it is counted **three times**.
- To isolate elements belonging to *exactly two* sets, we must subtract the triple intersection $3$ times!

$$\\text{Count (Exactly 2 Sets)} = (\\|A \\cap B\\| + \\|B \\cap C\\| + \\|A \\cap C\\|) - 3\\|A \\cap B \\cap C\\|$$

#### Worked Calculation:
Using our previous example data:
$$\\text{Count (Exactly 2 Sets)} = (25 + 20 + 15) - 3(10) = 60 - 30 = 30 \\text{ students}$$

> [!NOTE]
> **Verification Check:**
> - Exactly 1 set: $70$
> - Exactly 2 sets: $30$
> - Exactly 3 sets: $10$
> - Total in at least one set: $70 + 30 + 10 = 110$. Matches $\\|P \\cup J \\cup C\\| = 110$ perfectly!

---

### Topic 13: Counting Only One Specific Set

How many elements belong strictly to **Set A alone** (neither $B$ nor $C$)?

$$\\text{Only } A = \\|A \\cap B' \\cap C'\\| = \\|A - (B \\cup C)\\|$$

#### Algebraic Expansion
$$\\|A \\cap B' \\cap C'\\| = \\|A\\| - \\|A \\cap B\\| - \\|A \\cap C\\| + \\|A \\cap B \\cap C\\|$$

#### Worked Calculation:
- Only Python: $65 - 25 - 20 + 10 = 30$
- Only Java: $50 - 25 - 15 + 10 = 20$
- Only C++: $45 - 20 - 15 + 10 = 20$
- Sum of single sets: $30 + 20 + 20 = 70$. Exactly matches **Topic 11**!

---

### Topic 14: Power Set / Number of Subsets

The **Power Set** $\\mathcal{P}(A)$ (or $2^A$) is the set of all subsets of $A$, including $\\emptyset$ and $A$ itself.

#### Cardinality Formula
$$\\|A\\| = n \\implies \\|\\mathcal{P}(A)\\| = 2^n$$

#### Combinatorial Proof via Binary Bitstrings
For every element $x_i \\in A$, we make an independent binary choice:
- **0:** Exclude $x_i$ from the subset
- **1:** Include $x_i$ in the subset

For $n$ elements, there are $2 \\times 2 \\times \\dots \\times 2 = 2^n$ unique bitstrings.

#### Binomial Coefficient Connection
The total number of subsets is the sum of subsets of size $0, 1, 2, \\dots, n$:
$$\\sum_{k=0}^n \\binom{n}{k} = \\binom{n}{0} + \\binom{n}{1} + \\dots + \\binom{n}{n} = 2^n$$

#### Power Set of Empty Set Traps
- $\\mathcal{P}(\\emptyset) = \\{\\emptyset\\} \\implies \\|\\mathcal{P}(\\emptyset)\\| = 2^0 = 1$ (Not $0$!).
- $\\mathcal{P}(\\mathcal{P}(\\emptyset)) = \\{\\emptyset, \\{\\emptyset\\}\\} \\implies \\|\\mathcal{P}(\\mathcal{P}(\\emptyset))\\| = 2^1 = 2$.
- $\\|\\mathcal{P}(\\mathcal{P}(\\mathcal{P}(\\emptyset)))\\| = 2^2 = 4$.

---

### Topic 15: Non-empty Subsets

Many competitive exam and assignment problems ask for **non-empty subsets** or **proper non-empty subsets**.

#### 1. Non-empty Subsets
A non-empty subset must contain at least one element. We simply exclude the single empty set $\\emptyset$:
$$\\text{Non-empty Subsets} = 2^n - 1$$

#### 2. Proper Non-empty Subsets
Excludes both the empty set $\\emptyset$ and the entire set $A$ itself:
$$\\text{Proper Non-empty Subsets} = 2^n - 2$$

#### 3. Subsets Containing at Least $k$ Elements
$$\\text{Count} = \\sum_{r=k}^n \\binom{n}{r} = 2^n - \\sum_{r=0}^{k-1} \\binom{n}{r}$$

---

### Topic 16: Fundamental Counting Principle

The foundation of all combinatorics rests on two fundamental rules:

#### 1. The Rule of Sum (Addition Principle)
If task $A$ can be completed in $m$ ways and disjoint task $B$ in $n$ ways:
$$\\text{Ways to do } A \\text{ OR } B = m + n$$

#### 2. The Rule of Product (Multiplication Principle)
If task $A$ can be completed in $m$ ways and independent sequential task $B$ in $n$ ways:
$$\\text{Ways to do } A \\text{ AND } B = m \\times n$$

#### 3. Complementary Counting Principle
When counting valid outcomes with messy multiple cases, count the forbidden states and subtract:
$$\\text{Valid Outcomes} = \\text{Total Unrestricted Outcomes} - \\text{Forbidden Outcomes}$$

---

### Topic 17: Permutations $P(n, r)$

A **permutation** is an **ordered arrangement** of $r$ elements selected from $n$ distinct elements.

$$P(n, r) = \\frac{n!}{(n - r)!} = n \\times (n - 1) \\times \\dots \\times (n - r + 1)$$

#### Permutations with Repetition
If elements can be reused across $r$ positions:
$$\\text{Total Permutations} = n^r$$
*(e.g., 4-digit PIN using digits 0–9 $= 10^4 = 10,000$)*

#### Multiset Permutations (Repeated Identical Elements)
Arranging $n$ objects where item 1 repeats $n_1$ times, item 2 repeats $n_2$ times, etc.:
$$\\text{Permutations} = \\frac{n!}{n_1! \\times n_2! \\times \\dots \\times n_k!}$$
*(e.g., Letters in \`SUCCESS\` (7 letters: 3 S, 2 C, 1 U, 1 E) $= \\frac{7!}{3! \\times 2! \\times 1! \\times 1!} = 420$)*

#### Circular Permutations
Arranging $n$ distinct people around a circular table:
$$\\text{Circular Permutations} = (n - 1)!$$
*(Fixing one person breaks rotational symmetry. If reversible like beads on a necklace, divide by 2: $\\frac{(n-1)!}{2}$)*

---

### Topic 18: Combinations $C(n, r)$

A **combination** is an **unordered selection** of $r$ elements from $n$ distinct elements.

$$C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}$$

#### Connection Between Permutation and Combination
$$P(n, r) = r! \\times C(n, r) \\iff C(n, r) = \\frac{P(n, r)}{r!}$$
*(Select the $r$ objects first, then arrange them in $r!$ ways.)*

#### Key Combinatorial Identities
1. **Symmetry:** $\\binom{n}{r} = \\binom{n}{n - r}$ (Choosing who to include is identical to choosing who to leave out).
2. **Boundary Values:** $\\binom{n}{0} = \\binom{n}{n} = 1$; $\\binom{n}{1} = n$.
3. **Pascal's Identity:** $\\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r}$.
4. **Subset Sum:** $\\sum_{r=0}^n \\binom{n}{r} = 2^n$.

---

### Topic 19: Committee/Group Selection

Forming committees or teams under specific selection rules is a primary NPTEL Assignment question type.

#### Scenario 1: A Particular Member Must Always Be Included
If 1 specific person must be on a committee of $r$ selected from $n$:
$$\\text{Ways} = \\binom{n - 1}{r - 1}$$

#### Scenario 2: A Particular Member Must Always Be Excluded
If 1 specific person must be banned:
$$\\text{Ways} = \\binom{n - 1}{r}$$

#### Scenario 3: At Least One Category Selected ("At Least One Woman")
From a pool of 6 men and 5 women, form a committee of 4 containing **at least one woman**:
- Total unrestricted selections $= \\binom{11}{4} = \\frac{11 \\times 10 \\times 9 \\times 8}{4 \\times 3 \\times 2 \\times 1} = 330$.
- Forbidden selections (all men) $= \\binom{6}{4} = 15$.
- Valid selections $= 330 - 15 = 315$.

---

### Topic 20: Complement Relationships of Sets

Deep algebraic relationships of complements simplify complex proofs:

1. **Relative to Universal Set:** $A - B = A \\cap B'$.
2. **Subset Contrapositive:** $A \\subseteq B \\iff B' \\subseteq A'$.
3. **Involution:** $(A')' = A$.
4. **Difference Duality:** $A - B = B' - A'$.
5. **Distribution over Difference:** $A \\cap (B - C) = (A \\cap B) - (A \\cap C)$.
6. **Symmetric Complement:** $(A \\bigtriangleup B)' = (A \\cap B) \\cup (A' \\cap B')$.

---

## 🐍 Python Implementation: Bitwise & Set Logic

\`\`\`python
# Python implementation of Set Theory & Counting
from itertools import combinations
import math

def nCr(n, r):
    return math.comb(n, r)

def nPr(n, r):
    return math.perm(n, r)

# Universe of CS student IDs: 1 to 10
U = set(range(1, 11))
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7}
C = {1, 4, 7, 9}

# Set Operations
union_AB = A | B
inter_AB = A & B
diff_AB = A - B
symm_diff = A ^ B
comp_A = U - A

# De Morgan's Law Verification: (A ∪ B)' == A' ∩ B'
lhs = U - (A | B)
rhs = (U - A) & (U - B)
assert lhs == rhs, "De Morgan's 1st Law Verified!"

# 3-Set Inclusion-Exclusion
pie_union = (
    len(A) + len(B) + len(C)
    - len(A & B) - len(B & C) - len(A & C)
    + len(A & B & C)
)
assert pie_union == len(A | B | C)

# Counting Exactly 1 Set
exactly_one = (
    len(A) + len(B) + len(C)
    - 2 * (len(A & B) + len(B & C) + len(A & C))
    + 3 * len(A & B & C)
)

print(f"|A ∪ B ∪ C|: {pie_union}")
print(f"Elements in Exactly 1 Set: {exactly_one}")
print(f"Power Set size of A: 2^{len(A)} = {2**len(A)}")
print(f"Non-empty Subsets of A: {2**len(A) - 1}")
\`\`\`
`,
  subModules: [
    {
      id: "discrete-math-week2-lab",
      title: "Week 2: Set Theory, Venn & Counting Playground",
      description:
        "Interactive visualizer for Venn diagrams, 2/3-set Inclusion-Exclusion, power set bitmasks, and committee selection calculations.",
      status: "completed",
    },
  ],
  practiceQuiz: [
    {
      id: "dm-w2-q1",
      question:
        "In a group of 100 students, 60 like Mathematics, 45 like Physics, and 35 like Chemistry. 20 like both Math and Physics, 15 like both Math and Chem, and 10 like both Physics and Chem. 5 students like all three subjects. How many students like EXACTLY ONE of the three subjects?",
      options: ["45", "55", "65", "75"],
      correctAnswer: 2,
      explanation:
        "Using Topic 11 formula for Exactly One Set: \\n\\nExactly One = (|M| + |P| + |C|) - 2(|M ∩ P| + |P ∩ C| + |M ∩ C|) + 3|M ∩ P ∩ C|\\n\\n= (60 + 45 + 35) - 2(20 + 10 + 15) + 3(5)\\n= 140 - 2(45) + 15 = 140 - 90 + 15 = 65.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Counting Exactly One Set",
    },
    {
      id: "dm-w2-q2",
      question:
        "Using the same data (|M|=60, |P|=45, |C|=35, |M∩P|=20, |P∩C|=10, |M∩C|=15, |M∩P∩C|=5), how many students like EXACTLY TWO of the three subjects?",
      options: ["25", "30", "35", "40"],
      correctAnswer: 1,
      explanation:
        "Using Topic 12 formula for Exactly Two Sets: \\n\\nExactly Two = (|M ∩ P| + |P ∩ C| + |M ∩ C|) - 3|M ∩ P ∩ C|\\n\\n= (20 + 10 + 15) - 3(5) = 45 - 15 = 30.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Counting Exactly Two Sets",
    },
    {
      id: "dm-w2-q3",
      question:
        "Let set S have 6 distinct elements. What is the number of PROPER NON-EMPTY subsets of S?",
      options: ["62", "63", "64", "61"],
      correctAnswer: 0,
      explanation:
        "Total subsets = 2^n = 2^6 = 64. Proper non-empty subsets exclude both the empty set ∅ and the set S itself: 2^n - 2 = 64 - 2 = 62.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Non-empty Subsets",
    },
    {
      id: "dm-w2-q4",
      question:
        "A committee of 5 members is to be formed from 7 men and 4 women. In how many ways can the committee be formed if it must contain AT LEAST ONE woman?",
      options: ["441", "462", "420", "440"],
      correctAnswer: 0,
      explanation:
        "Using Topic 19 complementary counting: \\nTotal unrestricted selections = C(11, 5) = 462.\\nForbidden selections with zero women (all men) = C(7, 5) = 21.\\nValid selections with at least 1 woman = 462 - 21 = 441.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Committee/Group Selection",
    },
    {
      id: "dm-w2-q5",
      question:
        "Which of the following is equivalent to the set expression (A - B) ∪ (B - A)?",
      options: ["(A ∪ B) - (A ∩ B)", "A' ∪ B'", "(A ∩ B) - (A ∪ B)", "A ∩ B'"],
      correctAnswer: 0,
      explanation:
        "The symmetric difference A △ B is defined as (A - B) ∪ (B - A), which represents elements in A or B but not both: (A ∪ B) - (A ∩ B).",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Set Difference (—)",
    },
    {
      id: "dm-w2-q6",
      question:
        "If A ⊆ B, which of the following statements must ALWAYS be true? (Select all that apply)",
      options: ["A ∩ B = A", "A ∪ B = B", "A - B = ∅", "B' ⊆ A'"],
      correctAnswer: [0, 1, 2, 3],
      explanation:
        "All four statements are fundamental subset equivalences. If A ⊆ B: (1) every element of A is in B, so A ∩ B = A; (2) A ∪ B = B; (3) A - B = ∅; and (4) by contrapositive complement duality, B' ⊆ A'.",
      difficulty: "hard",
      type: "MSQ",
      topicTag: "Complement Relationships of Sets",
    },
  ],
};
