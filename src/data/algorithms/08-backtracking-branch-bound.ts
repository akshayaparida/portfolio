import { LearningModule } from "@/types/learning";

export const backtrackingModule: LearningModule = {
  id: "08-backtracking-branch-bound",
  title: "8. Backtracking & Branch-and-Bound",
  description:
    "State-space trees, bounding functions, pruning invalid branches, N-Queens Problem, Rat in a Maze, Sudoku Solver, and Branch-and-Bound for 0/1 Knapsack across C, C++, and Python",
  status: "completed",
  tags: ["Algorithm", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Backtracking & Branch-and-Bound Search Paradigms

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: State-space tree construction, N-Queens placement validity checks, Backtracking vs Branch-and-Bound (DFS vs BFS/Best-First with Priority Queue), and bounding function pruning efficiency.

---

## 1. Prerequisites & What You Should Know

Before studying backtracking and branch-and-bound, ensure you understand:
- **Depth-First Search (DFS) & Call Stacks**: How recursive functions remember past states and return to calling frames.
- **State-Space Trees**: Visualizing problem solutions as paths from the root to leaves in an $m$-ary decision tree.
- **Bounding Functions**: Mathematical predicates $B(x)$ that evaluate whether a partial solution can possibly lead to a globally valid or optimal solution.
- **Constraint Satisfaction Problems (CSP)**: Problems defined by variables, domains, and constraints (e.g. Sudoku, Graph Coloring).

---

## 2. Conceptual Intuition: The Labyrinth & The Undo Principle

\`\`\`
The Maze Analogy:
Imagine navigating an ancient underground maze with a chalk stick:
1. At each crossroad, mark your current spot and pick corridor #1 (CHOOSE).
2. Walk forward into corridor #1 (EXPLORE).
3. If you reach a brick wall (DEAD END):
   - You don't panic and teleport back to the dungeon entrance!
   - You simply take one step back to the chalk mark (UN-CHOOSE / BACKTRACK).
   - Then pick corridor #2 and continue.
4. If corridor #2 leads to sunlight, you have found the solution!
\`\`\`

### The Three Steps of Every Backtracking Algorithm
\`\`\`
void backtrack(State state) {
    if (isSolution(state)) {
        recordSolution(state);
        return;
    }

    for (Choice choice : getPossibleChoices(state)) {
        if (isValid(state, choice)) {
            applyChoice(state, choice);     // 1. CHOOSE
            backtrack(state);              // 2. EXPLORE (Recurse)
            revertChoice(state, choice);    // 3. UN-CHOOSE (Backtrack!)
        }
    }
}
\`\`\`

---

## 3. State-Space Trees & Pruning Mechanics

Brute force generates **all possible configurations** (e.g. for 8-Queens, placing 8 queens on 64 squares yields $\\binom{64}{8} \\approx 4.4 \\times 10^9$ possibilities).
Backtracking constructs a **State-Space Tree** dynamically, using **pruning** to slice away vast dead subtrees before visiting them!

\`\`\`
                      [ Root: Row 0 ]
                     /       |       \\
           Col 0    /     Col 1       \\ Col 2
                 [Q _ _]   [_ Q _]   [_ _ Q]
                 /     \\      |
        Col 0   /   Col 1     | Col 0
             [Dead]  [Dead]  [Q _ _]
            (Same)  (Diag)   [_ _ Q]
                                |
                             Row 2 ...
\`\`\`

- **Live Node**: A node that has been generated and whose children have not yet all been generated.
- **E-Node (Expansion Node)**: The current live node whose children are being generated.
- **Dead Node**: A node that cannot be expanded further because the bounding function declared it invalid or all its children have been explored.

---

## 4. Backtracking vs Branch-and-Bound (GATE CS Comparison)

| Metric | Backtracking | Branch-and-Bound |
|:---|:---|:---|
| **Traversal Order** | **Depth-First Search (DFS)** | **Breadth-First (BFS) / Best-First Search** |
| **Data Structure** | Implicit Recursion Call Stack | **Priority Queue (Min/Max Heap)** |
| **Problem Type** | Decision / CSP (N-Queens, Sudoku, Maze, Subset Sum) | Optimization (0/1 Knapsack, TSP, Job Shop Scheduling) |
| **Pruning Mechanism**| **Bounding Function / Constraint Check** | **Estimated Upper/Lower Bounds vs Best Known Cost** |
| **Memory Cost** | $O(\\text{depth})$ linear with tree height | $O(\\text{active frontier})$ exponential in worst case |

---

## 5. Classical Problems Deconstructed

### 5.1 The N-Queens Problem
Place $N$ non-attacking queens on an $N \\times N$ chessboard such that no two queens share the same row, column, or diagonal.
- Place queen row-by-row (Row $i$ gets queen at column $c$).
- Safety Check for queen at $(r, c)$ against existing queen at $(i, col[i])$:
  1. Same Column: $c == col[i]$
  2. Same Diagonal: $|r - i| == |c - col[i]|$ (difference of rows equals difference of columns $\\implies$ slope = $\\pm 1$)
- Pruning shrinks search space from $N^N$ to $N!$ and down to only valid board configurations!

### 5.2 Sudoku Solving
- Cell choices are digits \`'1'\` through \`'9'\`.
- Bounding function checks 3 independent constraints: Row uniqueness, Column uniqueness, and $3 \\times 3$ Box uniqueness.
- When an empty cell has no legal digit from $1$ to $9$, it immediately triggers backtracking.

---

## 6. Real-World Applications

1. **Boolean Satisfiability (SAT / SMT Solvers - Z3, MiniSat)**: Solves massive NP-hard formulas in circuit verification, CPU design validation, and software security analysis using CDCL (Conflict-Driven Clause Learning) backtracking.
2. **Operations Research & Airline Scheduling**: Branch-and-bound mixed-integer linear programming (MILP) schedules pilots, planes, and gates minimizing delays.
3. **Robotics Motion Planning**: Rat-in-a-maze pathfinding extended to continuous state-space collision avoidance in 3D environments.
4. **Game AI Engines (Chess, Go)**: Minimax search trees with alpha-beta pruning use branch-bounding to discard branches that provably cannot affect the optimal move.

---

## 7. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (N-Queens Solver with Row-by-Row Backtracking)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/**
 * C Syntax Logic Note:
 * 1. 1D Array Board representation: board[row] = col stores the column of queen at each row.
 *    Saves 2D array space and simplifies diagonal safety checks!
 * 2. abs(board[i] - col) == abs(i - row): Diagonal check using slope = ±1.
 * 3. Base case: When row reaches N, all N queens are placed legally.
 */

bool isSafe(int board[], int row, int col) {
    for (int i = 0; i < row; i++) {
        // Check same column OR same diagonal
        if (board[i] == col || abs(board[i] - col) == abs(i - row)) {
            return false;
        }
    }
    return true;
}

bool solveNQueens(int board[], int row, int N) {
    // Base Case: All N queens are successfully placed!
    if (row == N) {
        return true;
    }

    // Try placing queen in each column of current row
    for (int col = 0; col < N; col++) {
        if (isSafe(board, row, col)) {
            board[row] = col; // 1. CHOOSE

            // 2. EXPLORE: Recur to place queen in next row
            if (solveNQueens(board, row + 1, N)) {
                return true;
            }

            // 3. UN-CHOOSE: Backtrack (overwritten on next iteration)
        }
    }
    return false; // Trigger backtracking in previous row
}
\`\`\`

---

### C++ Implementation (Sudoku Solver with Constraint Validation)

\`\`\`cpp
#include <iostream>
#include <vector>

/**
 * C++ Syntax Logic Note:
 * 1. 3x3 Subgrid Indexing: 3 * (row / 3) + i / 3 and 3 * (col / 3) + i % 3 pinpoints the 9 cells of the 3x3 box.
 * 2. Recursive return bool: Returns true immediately upon reaching board completion,
 *    unwinding the entire call stack cleanly.
 * 3. Backtracking: board[r][c] = '.' restores empty state on dead ends.
 */

bool isValid(const std::vector<std::vector<char>>& board, int row, int col, char c) {
    for (int i = 0; i < 9; ++i) {
        if (board[row][i] == c) return false; // Row check
        if (board[i][col] == c) return false; // Column check
        // 3x3 box check
        if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
    }
    return true;
}

bool solveSudoku(std::vector<std::vector<char>>& board) {
    for (int r = 0; r < 9; ++r) {
        for (int c = 0; c < 9; ++c) {
            if (board[r][c] == '.') {
                for (char ch = '1'; ch <= '9'; ++ch) {
                    if (isValid(board, r, c, ch)) {
                        board[r][c] = ch; // 1. CHOOSE

                        if (solveSudoku(board)) return true; // 2. EXPLORE

                        board[r][c] = '.'; // 3. UN-CHOOSE (Backtrack!)
                    }
                }
                return false; // No digit worked, trigger backtrack
            }
        }
    }
    return true; // All cells filled successfully
}
\`\`\`

---

### Python Implementation (Rat in a Maze Path Generator)

\`\`\`python
"""
Python Syntax Logic Note:
1. In-place marking: path[r][c] = 1 marks cell as part of solution path.
2. Backtracking: Resetting path[r][c] = 0 upon recursion return restores state
   so alternative exploration paths remain valid!
"""

from typing import List

def solve_maze(maze: List[List[int]]) -> bool:
    N = len(maze)
    path = [[0] * N for _ in range(N)]

    def backtrack(r: int, c: int) -> bool:
        # Reached destination (bottom-right)
        if r == N - 1 and c == N - 1 and maze[r][c] == 1:
            path[r][c] = 1
            return True

        # Check bounds and valid path
        if 0 <= r < N and 0 <= c < N and maze[r][c] == 1:
            path[r][c] = 1 # 1. CHOOSE

            # 2. EXPLORE (Move Down then Right)
            if backtrack(r + 1, c):
                return True
            if backtrack(r, c + 1):
                return True

            # 3. UN-CHOOSE (Backtrack)
            path[r][c] = 0
            return False

        return False

    return backtrack(0, 0)
\`\`\`
`,
};
