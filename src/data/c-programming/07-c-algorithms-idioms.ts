import { LearningModule } from "@/types/learning";

export const cAlgorithmsIdiomsModule: LearningModule = {
  id: "07-c-algorithms-idioms",
  title: "7. Canonical Algorithms & Idioms in C",
  description:
    "Pointer-to-pointer linked lists (Linus idiom), generic qsort comparators with overflow guards, generic swap with memcpy, dynamic vector doubling, and Floyd's cycle detection",
  status: "completed",
  tags: ["C Programming", "GATE CS", "UGC NET", "Algorithms"],
  detailedContent: `# Canonical Algorithms & Production Idioms in Pure C

> **GATE CS & UGC NET JRF Core Subject**
> Exam Weightage: 3–4 Questions analyzing algorithm tracing in C, double-pointer linked list mutations, custom comparator return rules in \`qsort\`, and pointer rewiring without memory leaks.

---

## 1. Technical Jargon & The Idiomatic C Mindset

Implementing algorithms in C requires direct control over memory layout, pointer indirection, and byte-level manipulation.

1. **Pointer-to-Pointer (\`T**\`)**: A pointer that stores the address of another pointer variable. Used to modify caller pointer references (such as a list head pointer) without return statements.
2. **Generic Comparator**: A function pointer matching \`int (*)(const void *, const void *)\` that returns negative, zero, or positive to dictate relative ordering.
3. **Amortized Analysis**: Averaging the running time per operation over a sequence of operations (e.g., dynamic array doubling gives $O(1)$ amortized insertion despite occasional $O(n)$ reallocations).
4. **Sentinel Node**: A dummy head/tail node used to simplify boundary conditions by ensuring every real element has a predecessor and successor.
5. **In-Place Mutation**: Modifying data structures directly within their existing memory without allocating auxiliary buffers ($O(1)$ auxiliary space).

---

## 2. Idiom 1: Pointer-to-Pointer (\`Node**\`) for Linked Lists

In traditional beginner code, inserting or deleting the head of a linked list requires a special \`if (head == NULL)\` or \`if (prev == NULL)\` check.

Linus Torvalds famously highlighted the **Pointer-to-Pointer Idiom** as the mark of "good taste" in C programming:

\`\`\`
Traditional with Special Case:
To delete node 'curr':
if (curr == *head) {
    *head = curr->next;
} else {
    prev->next = curr->next;
}

Idiomatic with Pointer-to-Pointer:
'indirect' points directly to the pointer that points to 'curr'!
Whether 'curr' is the head or in the middle, the update is IDENTICAL:
*indirect = curr->next;
\`\`\`

### 2.1 Elegant Sorted Insertion in C

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int val;
    struct Node *next;
};

// Zero special cases! Works identically whether inserting at head, middle, or tail.
void insert_sorted(struct Node **head_ref, int new_val) {
    struct Node *new_node = (struct Node *)malloc(sizeof(struct Node));
    new_node->val = new_val;

    // 'indirect' points to the pointer leading to the next node
    struct Node **indirect = head_ref;

    while (*indirect != NULL && (*indirect)->val < new_val) {
        indirect = &((*indirect)->next);
    }

    new_node->next = *indirect;
    *indirect = new_node;
}
\`\`\`

---

## 3. Idiom 2: Generic Type-Agnostic Swap with \`memcpy\`

How do you implement a single \`swap\` function in C that works for integers, doubles, strings, and custom structures?

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void generic_swap(void *a, void *b, size_t size) {
    // Allocate small stack buffer for typical primitive copies
    unsigned char temp[256];
    void *buf = (size <= sizeof(temp)) ? temp : malloc(size);

    if (!buf) return; // Allocation guard

    memcpy(buf, a, size);
    memcpy(a, b, size);
    memcpy(b, buf, size);

    if (buf != temp) {
        free(buf);
    }
}
\`\`\`

---

## 4. Idiom 3: \`qsort\` & The Integer Subtraction Overflow Trap

The C Standard Library provides \`qsort\` in \`<stdlib.h>\`:

\`\`\`c
void qsort(void *base, size_t nmemb, size_t size,
           int (*compar)(const void *, const void *));
\`\`\`

### 4.1 Comparator Contract:
- Return $< 0$ if first element should precede second element.
- Return $0$ if both elements are equivalent.
- Return $> 0$ if first element should follow second element.

### 4.2 The Dangerous Subtraction Trap in GATE:

\`\`\`c
// THE DANGEROUS WAY (Common GATE Trap):
int cmp_bad(const void *a, const void *b) {
    return (*(int *)a - *(int *)b); // BUG: INTEGER OVERFLOW!
    // If *a is INT_MAX (2,147,483,647) and *b is -1:
    // INT_MAX - (-1) overflows signed int into NEGATIVE value!
    // Result: qsort incorrectly sorts positive numbers as smaller than negative!
}

// THE SAFE DEFENSIVE WAY:
int cmp_safe(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
}
\`\`\`

---

## 5. Idiom 4: Dynamic Resizing Array (Vector) in Pure C

Implementing a growable dynamic array in C with $O(1)$ amortized insertion:

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} Vector;

Vector* vector_create(size_t initial_cap) {
    Vector *v = (Vector *)malloc(sizeof(Vector));
    if (!v) return NULL;
    v->size = 0;
    v->capacity = initial_cap ? initial_cap : 4;
    v->data = (int *)malloc(v->capacity * sizeof(int));
    if (!v->data) {
        free(v);
        return NULL;
    }
    return v;
}

void vector_push_back(Vector *v, int val) {
    if (v->size == v->capacity) {
        // Amortized doubling strategy:
        size_t new_cap = v->capacity * 2;
        int *new_data = (int *)realloc(v->data, new_cap * sizeof(int));
        if (!new_data) return; // Allocation failure
        v->data = new_data;
        v->capacity = new_cap;
    }
    v->data[v->size++] = val;
}

void vector_destroy(Vector *v) {
    if (v) {
        free(v->data);
        free(v);
    }
}
\`\`\`

---

## 6. Idiom 5: Floyd's Cycle Detection (Tortoise & Hare) in C

Given a linked list, detect whether it contains a cycle and locate the cycle's starting node in $O(n)$ time and $O(1)$ auxiliary space:

\`\`\`c
#include <stdbool.h>

struct Node {
    int val;
    struct Node *next;
};

bool has_cycle(struct Node *head) {
    struct Node *slow = head;
    struct Node *fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;          // 1 step
        fast = fast->next->next;    // 2 steps

        if (slow == fast) {
            return true; // Cycle detected!
        }
    }
    return false; // Reached end of linear list
}
\`\`\`

### Mathematical Proof: Why They Meet
Let $k$ be the distance from head to cycle entrance, $L$ be the cycle loop length, and $m$ be the distance from entrance to meeting point:
- Distance traveled by slow: $D_{\\text{slow}} = k + m$
- Distance traveled by fast: $D_{\\text{fast}} = 2(k + m)$
- Since fast is ahead by an integer number of loops $nL$:
  $$2(k + m) - (k + m) = nL \\implies k + m = nL \\implies k = nL - m$$
- **Corollary**: If one pointer resets to \`head\` and both advance at speed 1, they meet precisely at the **cycle entrance**!

---

## 7. Best Practices & Production Standards in C

1. **Always Match Function Signatures for \`qsort\` Exactly**:
   Cast parameters inside the comparator body, not in the comparator function header.
2. **Guard Free Pointers**:
   Set pointers to \`NULL\` immediately after freeing to prevent use-after-free bugs.
3. **Use \`size_t\` for Counts and Offsets**:
   Never use signed \`int\` for memory buffer sizes, loop indices on arrays, or allocation byte counts.
`,
  practiceQuiz: [
    {
      id: "c-t7-q1",
      question:
        "Why is writing 'return (*(int *)a - *(int *)b);' inside a C qsort comparator function considered dangerous?",
      options: [
        "qsort only accepts double return values",
        "It causes signed integer overflow when comparing large positive numbers with large negative numbers, yielding inverted sorting",
        "qsort requires a void* return type",
        "C compilers do not allow pointer casts inside return statements",
      ],
      correctAnswer: 1,
      explanation:
        "If *a is a large positive integer (e.g. INT_MAX) and *b is a negative integer (e.g. -1), the subtraction INT_MAX - (-1) overflows the 32-bit signed integer into negative territory. qsort interprets the negative result as *a < *b, corrupting sort ordering.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "qsort Comparator",
    },
    {
      id: "c-t7-q2",
      question:
        "In Floyd's Cycle Finding algorithm for a linked list with N nodes, what is the worst-case time complexity and auxiliary space complexity?",
      options: [
        "Time: O(N), Space: O(N)",
        "Time: O(N), Space: O(1)",
        "Time: O(N log N), Space: O(1)",
        "Time: O(N²), Space: O(1)",
      ],
      correctAnswer: 1,
      explanation:
        "Floyd's algorithm uses two pointers (slow and fast), requiring only O(1) auxiliary memory. The fast pointer gains on the slow pointer by 1 node per step within the cycle, guaranteeing detection in O(N) total iterations.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Floyd's Cycle Algorithm",
    },
    {
      id: "c-t7-q3",
      question:
        "What is the primary benefit of passing a pointer-to-pointer (Node **head_ref) to a linked list insertion function in C?",
      options: [
        "It speeds up execution by utilizing GPU memory",
        "It enables direct modification of the caller's head pointer without needing special if-branches for head vs interior nodes",
        "It converts the singly linked list into a doubly linked list automatically",
        "It prevents stack overflow",
      ],
      correctAnswer: 1,
      explanation:
        "Passing Node** head_ref allows the function to update whatever pointer points to the current node directly (*indirect = new_node). This eliminates special-case branching for inserting at the head of the list.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Double Pointer Idiom",
    },
    {
      id: "c-t7-q4",
      question:
        "What is the amortized time complexity of inserting N elements into a dynamic array (Vector) that doubles its capacity whenever full?",
      options: [
        "O(N) per insertion",
        "O(log N) per insertion",
        "O(1) per insertion",
        "O(N²) total",
      ],
      correctAnswer: 2,
      explanation:
        "When doubling capacity: inserting N elements triggers copies at powers of 2 (1 + 2 + 4 + ... + N = 2N copies). The total work for N insertions is N + 2N = 3N operations. The amortized cost per single insertion is 3N / N = O(1) constant time.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Amortized Analysis",
    },
    {
      id: "c-t7-q5",
      question:
        "Which standard library function in <stdlib.h> performs binary search on a sorted array using a function pointer comparator?",
      options: ["binsearch()", "bsearch()", "binary_search()", "search()"],
      correctAnswer: 1,
      explanation:
        "ISO C standard library provides bsearch() in <stdlib.h> with signature: void *bsearch(const void *key, const void *base, size_t nmemb, size_t size, int (*compar)(const void *, const void *)).",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Standard Library Algorithms",
    },
    {
      id: "c-t7-q6",
      question:
        "Consider reversing a singly linked list iteratively in C using three pointers: prev, curr, next. How many pointer rewiring steps occur per node?",
      options: [
        "1 pointer reversal: curr->next = prev;",
        "2 pointer reversals",
        "3 pointer reversals",
        "4 pointer reversals",
      ],
      correctAnswer: 0,
      explanation:
        "During each iteration: next = curr->next (stores next), curr->next = prev (the single reversal), prev = curr (advances prev), curr = next (advances curr). Only 1 link is reversed per node, taking O(N) time and O(1) space.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Linked List Reversal",
    },
    {
      id: "c-t7-q7",
      question:
        "What does the generic_swap(void *a, void *b, size_t size) function use to safely copy bytes between two memory locations in C?",
      options: [
        "strcpy()",
        "memcpy() with a temporary byte buffer",
        "Direct assignment *a = *b",
        "Bitwise XOR without buffer",
      ],
      correctAnswer: 1,
      explanation:
        "Because void* has no concrete type, direct dereferencing is illegal. memcpy() copies raw bytes: memcpy(temp, a, size); memcpy(a, b, size); memcpy(b, temp, size); cleanly swapping objects of arbitrary size.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Generic Swap",
    },
    {
      id: "c-t7-q8",
      question:
        "When implementing an array-based Queue in C, what technique is used to reuse empty slots at the front created by dequeue operations?",
      options: [
        "Shift all remaining elements left in O(n) time on every dequeue",
        "Circular Buffer using modulo arithmetic: (rear + 1) % capacity",
        "Dynamic realloc on every enqueue",
        "Allocating new array on the stack",
      ],
      correctAnswer: 1,
      explanation:
        "A Circular Queue wraps the index around using modulo arithmetic: rear = (rear + 1) % capacity. This achieves O(1) time for both enqueue and dequeue without shifting elements.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Circular Queue",
    },
    {
      id: "c-t7-q9",
      question:
        "In a Binary Search Tree node defined in C as: struct Node { int val; struct Node *left, *right; };, how is an Invert / Mirror Tree operation performed?",
      options: [
        "Reverse the array representation using qsort",
        "Recursively swap left and right child pointers for every node in the tree",
        "Invert the integer values stored in nodes",
        "Convert the tree into a linked list",
      ],
      correctAnswer: 1,
      explanation:
        "Mirroring a binary tree swaps the pointers: struct Node *temp = root->left; root->left = root->right; root->right = temp; and recurses on both subtrees in O(N) time.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Tree Algorithms in C",
    },
    {
      id: "c-t7-q10",
      question:
        "What happens if free() is NOT called on a deleted linked list node after rewiring pointers in C?",
      options: [
        "The node is automatically reclaimed when the function returns",
        "The deleted node becomes a Memory Leak on the heap",
        "The program triggers a segmentation fault",
        "The linked list becomes circular",
      ],
      correctAnswer: 1,
      explanation:
        "C has no garbage collection. If pointers bypass an allocated heap node without calling free(node), the memory remains allocated but unreachable, causing a Memory Leak.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Memory Management",
    },
  ],
};
