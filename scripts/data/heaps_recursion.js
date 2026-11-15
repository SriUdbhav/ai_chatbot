/**
 * Heaps & Recursion Module (Additional Foundational Concepts)
 * Min-Heap, Max-Heap, Priority Queue, Tower of Hanoi, and Recursion Concepts.
 */

module.exports = {
  heaps: {
    title: 'Heaps & Priority Queues',
    syllabus_code: 'DS-ADV-1',
    is_additional: true,
    min_heap: {
      name: 'Min-Heap and Priority Queue',
      type: 'data_structure',
      syllabus_note: 'Additional DS Concept (Foundational extension beyond prescribed lab syllabus)',
      definition: 'A Min-Heap is a complete binary tree where the key in every parent node is less than or equal to the keys of its children, guaranteeing that the root node always contains the minimum key.',
      working_principle: 'Because a heap is a complete binary tree, it is stored compactly in an array without pointers: for a node at index i, parent is at (i - 1) / 2, left child is at 2*i + 1, and right child is at 2*i + 2. Insertion appends at the end and uses heapifyUp in O(log n). ExtractMin removes root, moves the last element to root, and uses heapifyDown in O(log n).',
      step_by_step: '1. Insert(x): place x at index size; compare with parent at (i-1)/2; swap if smaller; repeat upward (O(log n)).\n2. ExtractMin(): read root = data[0]; replace data[0] = data[size-1]; decrement size; heapifyDown by swapping with smaller child (O(log n)).\n3. Peek(): return data[0] in O(1).\n4. BuildHeap: run heapifyDown from index (size/2 - 1) down to 0 in O(n) linear time.',
      example: 'Min-Heap array: [5, 10, 20, 30, 50]. Root is 5. ExtractMin yields 5, leaving [10, 30, 20, 50].',
      advantages: '• O(log n) guaranteed insertion and extractMin\n• O(1) peek at minimum element\n• Extremely cache-friendly array representation without pointer overhead',
      disadvantages: '• Arbitrary search takes O(n) time (only root has order guarantee)\n• Not a replacement for general search structures like BST',
      applications: '• Dijkstra\'s shortest path algorithm\n• Prim\'s Minimum Spanning Tree algorithm\n• Heap Sort algorithm (O(n log n) time and O(1) space)\n• CPU interrupt priority scheduling',
      time_complexity: '• Insert: O(log n)\n• Extract-Min: O(log n)\n• Peek: O(1)\n• Build-Heap: O(n)',
      space_complexity: 'O(n) sequential array storage.',
      conclusion: 'Min-Heaps provide the optimal implementation for the Priority Queue ADT.',
      aim: 'Implement a Min-Heap in C supporting insert, extractMin, and array-based heapify operations.',
      algorithm: '1. Define MinHeap struct with array data[MAX] and size.\n2. heapifyUp(h, idx): while idx > 0 and data[idx] < data[parent], swap and idx = parent.\n3. heapifyDown(h, idx): find smallest between idx, left, right; if not idx, swap and recurse.\n4. insert(h, val): data[size++] = val, heapifyUp.\n5. extractMin(h): root = data[0], data[0] = data[--size], heapifyDown, return root.',
      c_program: `#include <stdio.h>
#include <stdlib.h>

#define MAX 100

typedef struct {
    int data[MAX];
    int size;
} MinHeap;

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapifyUp(MinHeap *h, int index) {
    while (index > 0) {
        int parent = (index - 1) / 2;
        if (h->data[index] < h->data[parent]) {
            swap(&h->data[index], &h->data[parent]);
            index = parent;
        } else {
            break;
        }
    }
}

void heapifyDown(MinHeap *h, int index) {
    int smallest = index;
    int left = 2 * index + 1;
    int right = 2 * index + 2;

    if (left < h->size && h->data[left] < h->data[smallest])
        smallest = left;
    if (right < h->size && h->data[right] < h->data[smallest])
        smallest = right;

    if (smallest != index) {
        swap(&h->data[index], &h->data[smallest]);
        heapifyDown(h, smallest);
    }
}

void insert(MinHeap *h, int val) {
    if (h->size >= MAX) {
        printf("Heap Overflow!\\n");
        return;
    }
    h->data[h->size] = val;
    heapifyUp(h, h->size);
    h->size++;
}

int extractMin(MinHeap *h) {
    if (h->size <= 0) {
        printf("Heap Underflow!\\n");
        return -1;
    }
    int root = h->data[0];
    h->data[0] = h->data[h->size - 1];
    h->size--;
    heapifyDown(h, 0);
    return root;
}

int main(void) {
    MinHeap h = {.size = 0};
    insert(&h, 30);
    insert(&h, 10);
    insert(&h, 50);
    insert(&h, 5);
    insert(&h, 20);

    printf("--- Min-Heap (Priority Queue) in C ---\\n");
    printf("Min-Heap extracted in ascending order: ");
    while (h.size > 0) {
        printf("%d ", extractMin(&h));
    }
    printf("\\n");
    return 0;
}`,
      important_statements: '• int parent = (index - 1) / 2 finds parent node without pointers.\n• heapifyUp restores min-heap order after bottom insertion.\n• heapifyDown restores min-heap order after root extraction.',
      sample_input: 'Insert 30, 10, 50, 5, 20',
      expected_output: `--- Min-Heap (Priority Queue) in C ---
Min-Heap extracted in ascending order: 5 10 20 30 50`,
      dry_run: `1. Insert 30 -> [30]
2. Insert 10 -> [10, 30] (10 swaps with parent 30)
3. Insert 50 -> [10, 30, 50]
4. Insert 5  -> [5, 10, 50, 30] (5 bubbles to root)
5. Insert 20 -> [5, 10, 50, 30, 20]
Extracting repeatedly yields sorted order: 5 10 20 30 50.`,
      viva_questions: [
        { q: 'What is the difference between a Binary Search Tree and a Min-Heap?', a: 'A BST maintains an in-order sorted relationship (left < root < right). A Min-Heap only guarantees that parent <= children, enabling compact array storage as a complete binary tree.' }
      ]
    },

    max_heap: {
      name: 'Max-Heap',
      type: 'data_structure',
      syllabus_note: 'Additional DS Concept (Foundational extension beyond prescribed lab syllabus)',
      definition: 'A Max-Heap is a complete binary tree where the key in every parent node is greater than or equal to the keys of its children, ensuring that the root node always holds the maximum key.',
      working_principle: 'Follows identical array indexing as Min-Heap, but condition in heapifyUp and heapifyDown reverses: parent must be >= children. ExtractMax removes root in O(log n) time.',
      comparison_table: `| Parameter | Min-Heap | Max-Heap |
| :--- | :--- | :--- |
| **Root Element** | Global Minimum | Global Maximum |
| **Parent-Child Invariant** | Parent <= Children | Parent >= Children |
| **Primary Extraction** | extractMin() | extractMax() |
| **Common Application** | Dijkstra algorithm, ascending HeapSort | Descending HeapSort, max priority queues |`,
      verdict: 'Use **Min-Heap** for finding smallest items or ascending sorts; use **Max-Heap** for finding largest items or descending sorts.'
    },

    priority_queue: {
      name: 'Priority Queue ADT',
      type: 'concept',
      syllabus_note: 'Additional DS Concept (Foundational extension beyond prescribed lab syllabus)',
      definition: 'A Priority Queue is an Abstract Data Type where each element has an associated priority; elements with high priority are served before elements with low priority regardless of insertion order.',
      working_principle: 'Can be implemented with arrays, linked lists, or heaps. Binary Heaps are optimal, providing O(log n) insertion and O(log n) extraction, compared to O(n) for unordered arrays or sorted linked lists.',
      comparison_table: `| Implementation | Insert Time | Extract-Min Time | Peek Time |
| :--- | :--- | :--- | :--- |
| **Unsorted Array** | O(1) | O(n) | O(n) |
| **Sorted Array** | O(n) | O(1) | O(1) |
| **Sorted Linked List** | O(n) | O(1) | O(1) |
| **Binary Heap** | **O(log n)** | **O(log n)** | **O(1)** |`,
      verdict: '**Binary Heaps** provide the gold-standard trade-off with logarithmic insert and extraction.'
    }
  },

  recursion: {
    title: 'Recursion & Call Stack',
    syllabus_code: 'DS-ADV-2',
    is_additional: true,
    tower_of_hanoi: {
      name: 'Tower of Hanoi (Recursion)',
      type: 'algorithm',
      syllabus_note: 'Additional DS Concept (Foundational extension beyond prescribed lab syllabus)',
      definition: 'Tower of Hanoi is a classic mathematical problem where n disks of different diameters must be moved from a source rod to a destination rod using an auxiliary rod, following strict rules.',
      working_principle: 'Rules:\n1. Only one disk can be moved at a time.\n2. Each move consists of taking the upper disk from one stack and placing it on another rod.\n3. No larger disk may be placed on top of a smaller disk.\n\nRecursive Strategy for n disks:\n• Step 1: Move n-1 disks from Source to Auxiliary using Destination.\n• Step 2: Move the nth (largest) disk directly from Source to Destination.\n• Step 3: Move n-1 disks from Auxiliary to Destination using Source.',
      step_by_step: '1. Base Case: if n == 1, move disk 1 from source to destination directly and return.\n2. Recurse: call towerOfHanoi(n - 1, source, aux, dest).\n3. Move nth disk from source to dest.\n4. Recurse: call towerOfHanoi(n - 1, aux, dest, source).\n5. Total moves = 2^n - 1.',
      example: 'For n = 3 disks on Rod A, target Rod C, aux Rod B: Total moves = 2^3 - 1 = 7 moves.',
      advantages: '• Elegant mathematical solution to an otherwise complex problem\n• Perfectly demonstrates divide-and-conquer recursion and the CPU call stack',
      disadvantages: '• Exponential O(2^n) time complexity makes it intractable for large n (e.g. n=64 takes trillions of years)',
      applications: '• Demonstrating recursion and call stack mechanics in computer science education\n• Backup rotation schemes in IT data management (Grandfather-Father-Son rotation)',
      time_complexity: 'O(2^n) exponential time (Recurrence: T(n) = 2T(n-1) + 1).',
      space_complexity: 'O(n) auxiliary call stack memory.',
      conclusion: 'Tower of Hanoi exemplifies how recursive divide-and-conquer can solve complex sequential movement problems with minimal code.',
      aim: 'Implement the recursive Tower of Hanoi algorithm in C to print the sequence of moves for n disks.',
      algorithm: '1. towerOfHanoi(n, from_rod, to_rod, aux_rod):\n   If n == 1: print move and return.\n   towerOfHanoi(n-1, from_rod, aux_rod, to_rod)\n   print move disk n from from_rod to to_rod\n   towerOfHanoi(n-1, aux_rod, to_rod, from_rod)',
      c_program: `#include <stdio.h>

void towerOfHanoi(int n, char from_rod, char to_rod, char aux_rod) {
    if (n == 1) {
        printf("Move disk 1 from rod %c to rod %c\\n", from_rod, to_rod);
        return;
    }
    // Step 1: Move n-1 disks from from_rod to aux_rod using to_rod
    towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
    // Step 2: Move the nth disk from from_rod to to_rod
    printf("Move disk %d from rod %c to rod %c\\n", n, from_rod, to_rod);
    // Step 3: Move n-1 disks from aux_rod to to_rod using from_rod
    towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
}

int main(void) {
    int n = 3;
    printf("--- Tower of Hanoi Solution for n = %d disks ---\\n", n);
    towerOfHanoi(n, 'A', 'C', 'B');
    printf("Total moves required: 7\\n");
    return 0;
}`,
      important_statements: '• if (n == 1) defines the base case stopping infinite recursion.\n• towerOfHanoi(n-1, from_rod, aux_rod, to_rod) moves the upper tower to auxiliary.\n• towerOfHanoi(n-1, aux_rod, to_rod, from_rod) moves upper tower from auxiliary to destination.',
      sample_input: 'n = 3 disks, rods A, B, C',
      expected_output: `--- Tower of Hanoi Solution for n = 3 disks ---
Move disk 1 from rod A to rod C
Move disk 2 from rod A to rod B
Move disk 1 from rod C to rod B
Move disk 3 from rod A to rod C
Move disk 1 from rod B to rod A
Move disk 2 from rod B to rod C
Move disk 1 from rod A to rod C
Total moves required: 7`,
      dry_run: `Initial: n=3 disks on Rod A.
Move 1: Disk 1 from A to C
Move 2: Disk 2 from A to B
Move 3: Disk 1 from C to B (Stack of 2 on B)
Move 4: Disk 3 from A to C (Largest disk on C)
Move 5: Disk 1 from B to A
Move 6: Disk 2 from B to C
Move 7: Disk 1 from A to C (All 3 disks now on C in sorted size).`,
      viva_questions: [
        { q: 'How many total moves are required to solve Tower of Hanoi for n disks?', a: '2^n - 1 moves. For n = 3, 7 moves; for n = 4, 15 moves; for n = 5, 31 moves.' }
      ]
    },

    concepts: {
      name: 'Recursion and the Call Stack',
      type: 'concept',
      syllabus_note: 'Additional DS Concept (Foundational extension beyond prescribed lab syllabus)',
      definition: 'Recursion is an algorithmic strategy where a function calls itself directly or indirectly to solve smaller instances of the same problem until a base condition is satisfied.',
      working_principle: 'Every time a recursive call executes, the CPU pushes an activation frame onto the program call stack. The frame preserves local variables, arguments, and the return address. When a base case is hit, stack frames pop sequentially in LIFO order.',
      step_by_step: '1. Base Case: The stopping condition that returns without recursion.\n2. Recursive Call: The function invocation with smaller parameters converging toward base case.\n3. Unwinding: Stack frames pop returning results up the call tree.',
      viva_questions: [
        { q: 'What causes a Stack Overflow during recursion?', a: 'When the recursive function lacks a base case, has an unreachable base condition, or recurses too deeply, consuming all available stack memory allocated by the operating system.' }
      ]
    }
  }
};

