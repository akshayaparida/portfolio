import { LearningModule } from "@/types/learning";

export const stringAlgorithmsModule: LearningModule = {
  id: "09-string-algorithms",
  title: "9. String Matching & Pattern Algorithms",
  description:
    "Naive pattern matching, Knuth-Morris-Pratt (KMP) with LPS array preprocessing, Rabin-Karp rolling hash, and Z-Algorithm across C, C++, and Python",
  status: "completed",
  tags: ["Algorithm", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# String Matching & Pattern Recognition Algorithms

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: KMP LPS (Longest Prefix which is also a Suffix) array construction, linear matching proof ($O(n + m)$), Rabin-Karp rolling hash arithmetic with collisions, and Z-array calculation.

---

## 1. Prerequisites & What You Should Know

Before analyzing string matching algorithms, ensure you understand:
- **Prefixes and Suffixes**:
  - A **Prefix** of string $S$ is any substring starting at index 0 ($S[0 \\dots k]$).
  - A **Suffix** of string $S$ is any substring ending at the final index ($S[k \\dots |S|-1]$).
  - A **Proper** prefix or suffix cannot be equal to the entire string itself.
- **Modulo Arithmetic**: $(A + B) \\pmod q = ((A \\pmod q) + (B \\pmod q)) \\pmod q$, essential for rolling hashes.
- **ASCII & Character Encoding**: Characters mapped to numerical byte values (e.g. \`'A'\` = 65, \`'a'\` = 97).

---

## 2. Problem Formulation & Why Naive Matching Fails

Given a Text $T[0 \\dots n-1]$ and a Pattern $P[0 \\dots m-1]$ ($m \\le n$), find all starting indices (shifts) $s$ where:
$$T[s \\dots s+m-1] = P[0 \\dots m-1]$$

### The Naive Matcher's Blind Spot ($O(n \\cdot m)$)
The naive algorithm tests every possible shift $s \\in [0, n - m]$ by comparing characters left to right.
Whenever a mismatch occurs, it moves the text pointer back by $m-1$ positions:

\`\`\`
Text:    A A A A A A A A A B
Pattern: A A A B
         ^ ^ ^ X  (Mismatch at index 3: Text pointer rewinds!)
           ^ ^ ^ X
             ^ ^ ^ X
Each shift wastes up to m comparisons!
Worst-case runtime: O((n - m + 1) * m) ≈ O(n * m).
\`\`\`

---

## 3. Knuth-Morris-Pratt (KMP) Deep Dive

### 3.1 The Golden Rule of KMP
> **THE TEXT POINTER \`i\` NEVER GOES BACKWARD!**
> Once a character in $T$ has been examined, it is never re-examined.
> Runtime is strictly linear: $\\Theta(n)$ matching $+ \\; \\Theta(m)$ preprocessing = $\\Theta(n + m)$.

### 3.2 The LPS Array (Longest Proper Prefix which is also a Suffix)
\`lps[i]\` stores the length of the longest proper prefix of $P[0 \\dots i]$ that is identical to a suffix of $P[0 \\dots i]$.

\`\`\`
Worked Example: Pattern P = "A A B A A C A A B A A"
Index i:    0   1   2   3   4   5   6   7   8   9   10
Pattern:    A   A   B   A   A   C   A   A   B   A   A
LPS Value:  0   1   0   1   2   0   1   2   3   4   5

Explanation of indices:
- i = 1 ("AA"):       Proper prefix "A" == Suffix "A" -> LPS = 1
- i = 2 ("AAB"):      No matching prefix/suffix       -> LPS = 0
- i = 4 ("AABAA"):    Proper prefix "AA" == Suffix "AA" -> LPS = 2
- i = 10 (Full):      Prefix "AABAA" == Suffix "AABAA" -> LPS = 5
\`\`\`

### 3.3 The KMP Shift Mechanic
When a mismatch occurs at pattern index $j$ after matching $j$ characters:
- We already know that $P[0 \\dots j-1]$ matched $T[i-j \\dots i-1]$.
- The suffix of the matched text matches the prefix of the pattern up to length \`lps[j-1]\`.
- Therefore, we simply reset:
  $$j = \\text{lps}[j - 1]$$
  and continue comparing against $T[i]$ without rewinding $i$!

---

## 4. Rabin-Karp Rolling Hash

Treats the pattern and each text window of length $m$ as integers in base $d$ (alphabet size, usually 256) modulo a large prime $q$:

$$H(P) = \\left( \\sum_{i=0}^{m-1} P[i] \\cdot d^{m-1-i} \\right) \\pmod q$$

### The $O(1)$ Rolling Hash Transition:
To shift from window $T[i \\dots i+m-1]$ to window $T[i+1 \\dots i+m]$:
1. Subtract the leading character: $- T[i] \\cdot d^{m-1}$
2. Multiply the remaining hash by base $d$: $\\times d$
3. Add the incoming character: $+ T[i+m]$
4. Take modulo $q$:

$$H_{\\text{next}} = \\left( d \\cdot \\left( H_{\\text{curr}} - T[i] \\cdot d^{m-1} \\right) + T[i+m] \\right) \\pmod q$$

\`\`\`
Window 1: "3 1 4" -> Hash = 314
Slide to: "1 4 1"
Step 1: 314 - (3 * 10^2) = 14
Step 2: 14 * 10          = 140
Step 3: 140 + 1          = 141!  (Computed in O(1) time without reading middle digits!)
\`\`\`

*Spurious Hits*: If hashes match ($H(P) == H(T_{\\text{sub}})$), characters must be compared explicitly to verify against hash collisions.

---

## 5. Algorithmic Comparison

| Algorithm | Preprocessing Time | Matching Time | Total Time | Auxiliary Space | Best Suited For |
|:---|:---|:---|:---|:---|:---|
| **Naive Matcher** | $0$ | $O(n \\cdot m)$ | $O(n \\cdot m)$ | $O(1)$ | Tiny strings / one-off checks |
| **Rabin-Karp** | $\\Theta(m)$ | Avg $O(n+m)$, Worst $O(nm)$ | $O(n+m)$ | $O(1)$ | Multi-pattern search & plagiarism |
| **KMP** | $\\Theta(m)$ | $\\Theta(n)$ | $\\Theta(n+m)$ | $\\Theta(m)$ | General linear string matching |
| **Z-Algorithm** | $\\Theta(n+m)$ | $\\Theta(n+m)$ | $\\Theta(n+m)$ | $\\Theta(n+m)$ | Suffix-prefix string analysis |

---

## 6. Real-World Applications

1. **Text Editors & Command-Line Search (\`grep\`, \`ripgrep\`, \`awk\`)**: Modern search tools implement variants of Boyer-Moore and KMP for blazing-fast in-memory text searching.
2. **Bioinformatics (DNA / Genome Sequencing)**: Searching for nucleotide sequences (e.g., finding the CRISPR target motif \`"NGG"\` across a 3-billion-base human genome).
3. **Plagiarism Detection (Turnitin, MOSS)**: Uses Rabin-Karp rolling hashes to generate $k$-gram fingerprint tokens across millions of student papers.
4. **Network Intrusion Detection Systems (Snort, Zeek)**: Inspects live packet payloads against thousands of malware and exploit signatures in wire-speed network streams.

---

## 7. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (KMP LPS Construction & Matching Routine)

\`\`\`c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/**
 * C Syntax Logic Note:
 * 1. strlen(): String length calculation runs in O(n) by counting until null terminator '\0'.
 * 2. LPS state machine: If pattern mismatch occurs, j retreats to lps[j - 1] without moving i.
 * 3. Dynamic allocation: malloc(sizeof(int) * M) allocates the LPS lookup table on the heap.
 */

void computeLPSArray(const char* pat, int M, int* lps) {
    int len = 0; // Length of previous longest prefix suffix
    lps[0] = 0;  // lps[0] is always 0
    int i = 1;

    while (i < M) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1]; // Fallback to prior prefix match without advancing i
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

void KMPSearch(const char* pat, const char* txt) {
    int M = strlen(pat);
    int N = strlen(txt);

    int* lps = (int*)malloc(sizeof(int) * M);
    computeLPSArray(pat, M, lps);

    int i = 0; // Index for txt[]
    int j = 0; // Index for pat[]

    while (i < N) {
        if (pat[j] == txt[i]) {
            j++;
            i++;
        }

        if (j == M) {
            printf("Found pattern at index %d\\n", i - j);
            j = lps[j - 1]; // Look for subsequent overlapping occurrences
        } else if (i < N && pat[j] != txt[i]) {
            if (j != 0) {
                j = lps[j - 1]; // Key KMP shift: i does NOT backtrack!
            } else {
                i++;
            }
        }
    }
    free(lps);
}
\`\`\`

---

### C++ Implementation (Rabin-Karp Rolling Hash with Modular Arithmetic)

\`\`\`cpp
#include <iostream>
#include <string>
#include <vector>

/**
 * C++ Syntax Logic Note:
 * 1. Rolling Hash: Uses polynomial base d=256 and prime modulus q=101.
 * 2. Next hash computation in O(1):
 *    hash = (d * (hash - txt[i]*h) + txt[i+m]) % q;
 * 3. Handling negative modulo: In C++, modulo of negative number can be negative.
 *    Adding q ensures the result stays strictly within [0, q-1].
 */

std::vector<int> rabinKarp(const std::string& pat, const std::string& txt, int q = 101) {
    int d = 256;
    int M = static_cast<int>(pat.size());
    int N = static_cast<int>(txt.size());
    int p = 0, t = 0, h = 1;
    std::vector<int> matches;

    // h = (d^(M-1)) % q
    for (int i = 0; i < M - 1; ++i) {
        h = (h * d) % q;
    }

    // Calculate initial hash values for pattern and first text window
    for (int i = 0; i < M; ++i) {
        p = (d * p + pat[i]) % q;
        t = (d * t + txt[i]) % q;
    }

    for (int i = 0; i <= N - M; ++i) {
        if (p == t) {
            // Hash match: Verify characters to eliminate spurious collisions
            bool match = true;
            for (int j = 0; j < M; ++j) {
                if (txt[i + j] != pat[j]) { match = false; break; }
            }
            if (match) matches.push_back(i);
        }

        if (i < N - M) {
            t = (d * (t - txt[i] * h) + txt[i + M]) % q;
            if (t < 0) t = (t + q); // Keep within [0, q-1]
        }
    }
    return matches;
}
\`\`\`

---

### Python Implementation (Z-Algorithm in O(n + m))

\`\`\`python
"""
Python Syntax Logic Note:
1. Z-Algorithm: For concatenated string S = Pattern + '$' + Text,
   Z[i] stores the length of the longest substring starting at i that matches S's prefix.
2. If Z[i] == len(Pattern), an exact match is found at index i - len(Pattern) - 1.
3. The '$' sentinel guarantees the prefix match cannot bleed across the pattern boundary.
"""

from typing import List

def z_algorithm(pattern: str, text: str) -> List[int]:
    concat = pattern + "$" + text
    n = len(concat)
    Z = [0] * n
    left = right = 0

    for i in range(1, n):
        if i <= right:
            Z[i] = min(right - i + 1, Z[i - left])
        while i + Z[i] < n and concat[Z[i]] == concat[i + Z[i]]:
            Z[i] += 1
        if i + Z[i] - 1 > right:
            left = i
            right = i + Z[i] - 1

    # Filter occurrences in text
    p_len = len(pattern)
    matches = []
    for i in range(p_len + 1, n):
        if Z[i] == p_len:
            matches.append(i - p_len - 1)

    return matches
\`\`\`
`,
};
