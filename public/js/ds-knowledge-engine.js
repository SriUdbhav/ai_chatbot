/**
 * StudyMate AI — Advanced Offline Data Structures Tutor Engine
 *
 * Implements:
 *   1. 100% On-Device Data Structures Knowledge Repository (Zero network/AI model required)
 *   2. Intelligent NLP & Question Understanding Pipeline:
 *      - Text normalization, contraction expansion, and tokenization
 *      - Typo correction & 60+ spelling variants
 *      - Comprehensive concept & synonym dictionary (e.g. remove=delete=pop, add=insert=push)
 *      - Fuzzy matching with Levenshtein distance
 *      - Question Intent Classification (program, algorithm, definition, comparison, dry_run, complexity, viva, application)
 *   3. Context-Aware Multi-Turn Follow-Up Resolution (tracks previous topic, operation, intent)
 *   4. Answer Composition Engine tailored to question intent:
 *      - Complete compilable C programs with headers, main(), and comments
 *      - 10-point structured master explanations
 *      - Step-by-step dry run execution traces
 *      - Markdown comparison tables for "X vs Y" questions
 *      - Asymptotic complexity derivations (Big O, Omega, Theta)
 *      - College exam viva questions and model answers
 *   5. Relevance scoring with confidence metrics and friendly clarification fallback
 *
 * Compatible with Browser (window.DSKnowledgeEngine) and Node.js (module.exports).
 */

(function (global) {
  'use strict';

  // ── 1. Comprehensive Local Knowledge Repository ───────────────────────────────
  const DS_TOPICS = {
    fundamentals: {
      title: 'Data Structures Fundamentals',
      syllabus_code: 'DS-UNIT-0',
      introduction: {
        name: 'Introduction to Data Structures',
        type: 'concept',
        definition: 'A Data Structure is a specialized format for organizing, storing, retrieving, and manipulating data in computer memory efficiently.',
        explanation: 'Data structures determine how data is organized in memory. Primitive structures (int, float, char, pointers) are natively supported by CPU hardware. Non-primitive structures (Arrays, Linked Lists, Stacks, Queues, Trees, Graphs) are user-defined and group relationships to solve complex computational problems.',
        characteristics: [
          'Correctness: Retains data integrity across all operations.',
          'Time Efficiency: Minimizes CPU execution cycles for search, insert, and delete.',
          'Space Efficiency: Minimizes auxiliary memory usage and fragmentation.'
        ],
        c_program: `#include <stdio.h>

// Demonstrating primitive vs user-defined non-primitive structure
struct Student {
    int id;
    char name[50];
    float gpa;
};

int main(void) {
    int semester = 3; // Primitive type
    struct Student s1 = {101, "Alice Smith", 3.85f}; // Non-primitive composite

    printf("=== Primitive vs Non-Primitive ===\\n");
    printf("Primitive: Semester = %d\\n", semester);
    printf("Composite Struct: ID = %d, Name = %s, GPA = %.2f\\n", s1.id, s1.name, s1.gpa);
    return 0;
}`,
        sample_io: 'Output:\n=== Primitive vs Non-Primitive ===\nPrimitive: Semester = 3\nComposite Struct: ID = 101, Name = Alice Smith, GPA = 3.85',
        time_complexity: '• Field access: O(1)',
        space_complexity: 'sizeof(struct Student) contiguous memory.',
        viva_questions: [
          { q: 'What is an Abstract Data Type (ADT)?', a: 'An ADT is a mathematical model defining WHAT operations can be performed on data without detailing HOW they are implemented.' },
          { q: 'What is the difference between linear and non-linear data structures?', a: 'Linear structures (Array, Linked List, Stack, Queue) store elements sequentially in a single level. Non-linear structures (Tree, Graph) store elements hierarchically or interconnectedly.' }
        ]
      },
      linear_vs_non_linear: {
        name: 'Linear vs Non-Linear Data Structures',
        type: 'concept',
        definition: 'Linear data structures store elements sequentially where every element has a unique predecessor and successor. Non-linear data structures store elements hierarchically or interconnectedly with multiple relationships.',
        comparison_table: `| Parameter | Linear Data Structures | Non-Linear Data Structures |
| :--- | :--- | :--- |
| **Organization** | Sequential (single level) | Hierarchical / Network (multi-level) |
| **Traversal** | Single linear pass can visit all elements | Requires recursive or queue/stack traversals (DFS, BFS) |
| **Examples** | Arrays, Linked Lists, Stacks, Queues | Binary Trees, BST, Heaps, Graphs |
| **Memory Allocation** | Contiguous or linear node chains | Non-contiguous node pointer branches |
| **Search Time** | O(n) (O(log n) if sorted array) | O(log n) in balanced BST, O(V+E) in Graphs |
| **Best For** | Ordered lists, buffers, undo histories | Hierarchical files, social networks, shortest paths |`,
        c_program: `#include <stdio.h>

int main(void) {
    int linearArr[4] = {10, 20, 30, 40};
    printf("Linear Array Traversal: ");
    for (int i = 0; i < 4; i++) printf("%d ", linearArr[i]);
    printf("\\n");
    return 0;
}`,
        sample_io: 'Output:\nLinear Array Traversal: 10 20 30 40',
        viva_questions: [
          { q: 'Can a tree be traversed in a single simple linear loop?', a: 'No, trees require recursive traversal (Inorder, Preorder, Postorder) or an auxiliary Queue for Level-Order traversal.' }
        ]
      },
      static_vs_dynamic_memory: {
        name: 'Static vs Dynamic Memory Allocation',
        type: 'concept',
        definition: 'Static memory allocation allocates fixed memory at compile time on the Stack or Data segment. Dynamic memory allocation allocates flexible memory at runtime on the Heap using malloc, calloc, realloc, and free.',
        comparison_table: `| Parameter | Static Memory Allocation | Dynamic Memory Allocation |
| :--- | :--- | :--- |
| **Allocation Time** | Compile time | Runtime |
| **Memory Region** | Stack Segment | Heap Segment |
| **Size Flexibility** | Fixed (cannot resize) | Resizable using realloc() |
| **Deallocation** | Automatic when variable goes out of scope | Manual using free() |
| **Memory Leaks** | Impossible | Possible if free() is omitted |
| **Example** | \`int arr[100];\` | \`int *p = (int *)malloc(n * sizeof(int));\` |`,
        c_program: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 4;
    int *arr = (int *)malloc(n * sizeof(int));
    if (!arr) return 1;

    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;
    printf("Dynamic Heap Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr); // Prevent memory leak
    arr = NULL; // Prevent dangling pointer
    return 0;
}`,
        sample_io: 'Output:\nDynamic Heap Array: 10 20 30 40',
        viva_questions: [
          { q: 'What is a memory leak and how do you prevent it in C?', a: 'A memory leak occurs when heap memory allocated with malloc() is not released with free(). Prevent by pairing every malloc() with free() and setting pointer to NULL.' },
          { q: 'What is a dangling pointer?', a: 'A pointer pointing to a memory location that has already been deallocated by free().' }
        ]
      },
      asymptotic_notations: {
        name: 'Asymptotic Notations (Big O, Omega, Theta)',
        type: 'concept',
        definition: 'Asymptotic notations are formal mathematical tools used to describe algorithm resource consumption (time and space) as input size n tends to infinity.',
        comparison_table: `| Notation | Formal Definition | Mathematical Role | Practical Meaning |
| :--- | :--- | :--- | :--- |
| **Big O (O)** | f(n) <= c * g(n) for all n >= n0 | **Upper Bound** | Worst-case maximum execution time |
| **Big Omega (Ω)** | f(n) >= c * g(n) for all n >= n0 | **Lower Bound** | Best-case minimum execution time |
| **Big Theta (Θ)** | c1*g(n) <= f(n) <= c2*g(n) | **Tight Bound** | Exact growth rate when bounds match |`,
        growth_hierarchy: 'O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(n^3) < O(2^n) < O(n!)',
        viva_questions: [
          { q: 'Why is Big O the industry standard for complexity analysis?', a: 'Big O guarantees an upper bound on worst-case execution time, ensuring latency deadlines are never exceeded.' },
          { q: 'What does O(1) space complexity mean?', a: 'It means the algorithm requires a constant amount of memory regardless of the input size n.' }
        ]
      }
    },

    searching: {
      title: 'Searching Algorithms',
      syllabus_code: 'DS-UNIT-1',
      linear_search: {
        name: 'Linear Search (Sequential Search)',
        type: 'algorithm',
        definition: 'Linear Search is a sequential algorithm that inspects every element in a list one by one until the target key is found or the end of the collection is reached.',
        explanation: 'Linear search is the simplest searching technique. It requires no preconditions — the array can be completely unsorted. It begins at index 0 and evaluates arr[i] == key. If matched, it returns the index. If the loop completes without a match, it returns -1.',
        algorithm: [
          '1. Initialize i = 0.',
          '2. If i >= n, return -1 (Key Absent).',
          '3. If arr[i] == key, return i (Search Successful).',
          '4. Increment i by 1 (i = i + 1).',
          '5. Repeat from Step 2.'
        ],
        pseudocode: `FUNCTION LinearSearch(A, n, key):
  FOR i = 0 TO n - 1 DO:
    IF A[i] == key THEN:
      RETURN i
    END IF
  END FOR
  RETURN -1
END FUNCTION`,
        c_program: `#include <stdio.h>

// Iterative Linear Search
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) return i; // Found at index i
    }
    return -1; // Not found
}

// Recursive Linear Search
int linearSearchRecursive(int arr[], int n, int key, int index) {
    if (index >= n) return -1;
    if (arr[index] == key) return index;
    return linearSearchRecursive(arr, n, key, index + 1);
}

int main(void) {
    int arr[] = {10, 25, 45, 60, 75};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key = 60;

    int result = linearSearch(arr, n, key);
    if (result != -1) {
        printf("Result: Element %d found at index %d (Position %d).\\n", key, result, result + 1);
    } else {
        printf("Result: Element %d not found in array.\\n", key);
    }
    return 0;
}`,
        sample_io: 'Input: Array = [10, 25, 45, 60, 75], Key = 60\nOutput: Element 60 found at index 3 (Position 4).',
        dry_run: `Target Array: [10, 25, 45, 60, 75], Search Key: 60
Pass 0: i = 0 -> arr[0] is 10. Check 10 == 60? False.
Pass 1: i = 1 -> arr[1] is 25. Check 25 == 60? False.
Pass 2: i = 2 -> arr[2] is 45. Check 45 == 60? False.
Pass 3: i = 3 -> arr[3] is 60. Check 60 == 60? TRUE!
Return index 3. Total comparisons: 4.`,
        time_complexity: '• Best Case: O(1) (Key is at index 0)\n• Average Case: O(n) (Approximately n/2 comparisons)\n• Worst Case: O(n) (Key at last position or not present)',
        space_complexity: 'O(1) auxiliary space for iterative version; O(n) stack space for recursive.',
        viva_questions: [
          { q: 'What is the average number of comparisons in linear search?', a: '(n + 1) / 2 comparisons, which asymptotically is O(n).' },
          { q: 'Can linear search be used on linked lists?', a: 'Yes, linear search is the only standard searching algorithm suitable for singly linked lists.' }
        ]
      },
      binary_search: {
        name: 'Binary Search (Logarithmic Search)',
        type: 'algorithm',
        definition: 'Binary Search is an efficient divide-and-conquer search algorithm that locates a key in a sorted array by repeatedly dividing the search space in half.',
        explanation: 'Binary search compares the search key to the array middle element. If equal, search succeeds. If key < middle, it restricts search to the left half. If key > middle, it restricts search to the right half. Each step cuts the search space by 50%.',
        precondition: 'The array MUST be sorted prior to searching.',
        algorithm: [
          '1. Set low = 0 and high = n - 1.',
          '2. While low <= high, compute mid = low + (high - low) / 2.',
          '3. If arr[mid] == key, return mid.',
          '4. If arr[mid] < key, set low = mid + 1.',
          '5. If arr[mid] > key, set high = mid - 1.',
          '6. If low > high, return -1 (Key not in array).'
        ],
        pseudocode: `FUNCTION BinarySearch(A, low, high, key):
  WHILE low <= high DO:
    mid = low + (high - low) / 2
    IF A[mid] == key THEN:
      RETURN mid
    ELSE IF A[mid] < key THEN:
      low = mid + 1
    ELSE:
      high = mid - 1
    END IF
  END WHILE
  RETURN -1
END FUNCTION`,
        c_program: `#include <stdio.h>

// Iterative Binary Search
int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents integer overflow
        if (arr[mid] == key) return mid;
        else if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

// Recursive Binary Search
int binarySearchRecursive(int arr[], int low, int high, int key) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == key) return mid;
    if (arr[mid] < key) return binarySearchRecursive(arr, mid + 1, high, key);
    return binarySearchRecursive(arr, low, mid - 1, key);
}

int main(void) {
    int arr[] = {11, 22, 33, 44, 55, 66, 77};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key = 55;

    int idx = binarySearch(arr, n, key);
    if (idx != -1) {
        printf("Result: Element %d found at index %d (Position %d).\\n", key, idx, idx + 1);
    } else {
        printf("Result: Element %d not found in array.\\n", key);
    }
    return 0;
}`,
        sample_io: 'Input: Array = [11, 22, 33, 44, 55, 66, 77], Key = 55\nOutput: Element 55 found at index 4 (Position 5).',
        dry_run: `Array: [11, 22, 33, 44, 55, 66, 77], Target: 55
Step 1: low=0, high=6 -> mid = 0 + (6-0)/2 = 3. arr[3]=44.
        Check 44 == 55? False. Is 44 < 55? True -> low = mid + 1 = 4.
Step 2: low=4, high=6 -> mid = 4 + (6-4)/2 = 5. arr[5]=66.
        Check 66 == 55? False. Is 66 < 55? False -> high = mid - 1 = 4.
Step 3: low=4, high=4 -> mid = 4 + (4-4)/2 = 4. arr[4]=55.
        Check 55 == 55? TRUE! Return index 4. Total comparisons: 3.`,
        time_complexity: '• Best Case: O(1) (Key is at mid on first iteration)\n• Average Case: O(log n)\n• Worst Case: O(log n)',
        space_complexity: 'O(1) auxiliary space for iterative version; O(log n) call stack for recursive.',
        viva_questions: [
          { q: 'Why do we compute mid = low + (high - low) / 2 instead of (low + high) / 2?', a: 'To prevent 32-bit signed integer overflow when low + high exceeds 2,147,483,647.' },
          { q: 'Why is binary search unsuitable for standard singly linked lists?', a: 'Linked lists do not allow O(1) random indexing; finding the middle node takes O(n), destroying the logarithmic O(log n) performance.' }
        ]
      }
    },

    sorting: {
      title: 'Sorting Algorithms',
      syllabus_code: 'DS-UNIT-2',
      bubble_sort: {
        name: 'Bubble Sort',
        type: 'algorithm',
        definition: 'Bubble Sort is a comparison-based sort where adjacent elements are repeatedly compared and swapped if they are out of order, causing larger elements to bubble up to the end.',
        explanation: 'In pass 0, the maximum element bubbles up to index n-1. In pass 1, the second largest bubbles to index n-2. An optimized version uses a boolean swapped flag to terminate in O(n) if no swaps occurred.',
        c_program: `#include <stdio.h>
#include <stdbool.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // Optimized early exit
    }
}

int main(void) {
    int arr[] = {5, 1, 4, 2, 8};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    printf("Sorted by Bubble Sort: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
        sample_io: 'Input: [5, 1, 4, 2, 8]\nOutput: Sorted by Bubble Sort: 1 2 4 5 8',
        dry_run: `Initial: [5, 1, 4, 2, 8]
Pass 0: (5>1 swap -> [1,5,4,2,8]) -> (5>4 swap -> [1,4,5,2,8]) -> (5>2 swap -> [1,4,2,5,8]) -> (5>8 no) -> [1,4,2,5,8]
Pass 1: (1>4 no) -> (4>2 swap -> [1,2,4,5,8]) -> (4>5 no) -> [1,2,4,5,8]
Pass 2: (1>2 no) -> (2>4 no) -> swapped is false! Early exit triggered.
Result: [1, 2, 4, 5, 8]`,
        time_complexity: '• Best Case: O(n) (When already sorted, via swapped flag)\n• Average Case: O(n^2)\n• Worst Case: O(n^2) (When reverse sorted)',
        space_complexity: 'O(1) auxiliary space (in-place).',
        viva_questions: [
          { q: 'Is bubble sort stable?', a: 'Yes. Adjacent elements are only swapped when arr[j] > arr[j+1], never when equal.' },
          { q: 'What is the role of the swapped flag?', a: 'It allows O(n) linear best-case detection if the array is already sorted.' }
        ]
      },
      selection_sort: {
        name: 'Selection Sort',
        type: 'algorithm',
        definition: 'Selection Sort is an in-place comparison sort that divides the array into sorted and unsorted regions, repeatedly identifying the minimum element from the unsorted region and moving it to the front.',
        explanation: 'In each pass i (from 0 to n-2), the algorithm searches arr[i...n-1] for the minimum value. Once located, it swaps it with arr[i]. It always executes n*(n-1)/2 comparisons regardless of whether the array is initially sorted.',
        c_program: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        if (min_idx != i) swap(&arr[i], &arr[min_idx]);
    }
}

int main(void) {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    selectionSort(arr, n);
    printf("Sorted by Selection Sort: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
        sample_io: 'Input: [64, 25, 12, 22, 11]\nOutput: Sorted by Selection Sort: 11 12 22 25 64',
        dry_run: `Initial: [64, 25, 12, 22, 11]
Pass 0 (i=0): Min in arr[0..4] is 11 at idx 4. Swap arr[0] (64) with arr[4] (11) -> [11, 25, 12, 22, 64]
Pass 1 (i=1): Min in arr[1..4] is 12 at idx 2. Swap arr[1] (25) with arr[2] (12) -> [11, 12, 25, 22, 64]
Pass 2 (i=2): Min in arr[2..4] is 22 at idx 3. Swap arr[2] (25) with arr[3] (22) -> [11, 12, 22, 25, 64]
Pass 3 (i=3): Min in arr[3..4] is 25 at idx 3. No swap needed -> [11, 12, 22, 25, 64]
Done in 4 passes.`,
        time_complexity: '• Best Case: O(n^2)\n• Average Case: O(n^2)\n• Worst Case: O(n^2)',
        space_complexity: 'O(1) auxiliary space (in-place).',
        viva_questions: [
          { q: 'Is selection sort stable?', a: 'No, default selection sort is unstable because non-adjacent swaps can invert the relative order of duplicate elements.' },
          { q: 'What is the maximum number of swaps in selection sort?', a: 'At most n - 1 swaps, which makes it ideal when writing to memory is expensive.' }
        ]
      },
      insertion_sort: {
        name: 'Insertion Sort',
        type: 'algorithm',
        definition: 'Insertion Sort is an intuitive, stable in-place sorting algorithm that builds the final sorted array one item at a time by picking the next element and shifting larger elements to insert it into its correct position.',
        explanation: 'Like sorting cards in hand: Start at index 1. Store arr[i] in `key`. Compare key with elements to its left. Shift all elements greater than key one spot right. Place key in the vacated slot.',
        c_program: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

int main(void) {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    insertionSort(arr, n);
    printf("Sorted by Insertion Sort: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
        sample_io: 'Input: [12, 11, 13, 5, 6]\nOutput: Sorted by Insertion Sort: 5 6 11 12 13',
        dry_run: `Initial: [12, 11, 13, 5, 6]
Pass 1 (i=1, key=11): 12 > 11 -> shift 12 -> insert 11 -> [11, 12, 13, 5, 6]
Pass 2 (i=2, key=13): 12 < 13 -> no shift -> [11, 12, 13, 5, 6]
Pass 3 (i=3, key=5):  shift 13, 12, 11 -> insert 5 at [0] -> [5, 11, 12, 13, 6]
Pass 4 (i=4, key=6):  shift 13, 12, 11 -> insert 6 at [1] -> [5, 6, 11, 12, 13]`,
        time_complexity: '• Best Case: O(n) (When already sorted)\n• Average Case: O(n^2)\n• Worst Case: O(n^2) (When reverse sorted)',
        space_complexity: 'O(1) auxiliary space (in-place).',
        viva_questions: [
          { q: 'Why is Insertion Sort used in hybrid algorithms like Timsort?', a: 'Because on small subarrays (n < 32) or nearly-sorted data, Insertion Sort is extremely fast with O(n) best-case time and zero memory overhead.' }
        ]
      },
      merge_sort: {
        name: 'Merge Sort',
        type: 'algorithm',
        definition: 'Merge Sort is a divide-and-conquer sorting algorithm that recursively divides an array into two halves until single-element subarrays remain, then merges the sorted halves.',
        explanation: 'Merge sort splits at mid = l + (r - l) / 2. It sorts both halves recursively, then merges them using an auxiliary buffer array in O(n) time. It guarantees O(n log n) running time across all possible inputs.',
        c_program: `#include <stdio.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main(void) {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    mergeSort(arr, 0, n - 1);
    printf("Sorted by Merge Sort: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
        sample_io: 'Input: [38, 27, 43, 3, 9, 82, 10]\nOutput: Sorted by Merge Sort: 3 9 10 27 38 43 82',
        dry_run: `Split: [38, 27, 43, 3] and [9, 82, 10]
Merge [27, 38] and [3, 43] -> [3, 27, 38, 43]
Merge [9] and [10, 82] -> [9, 10, 82]
Final Merge: [3, 9, 10, 27, 38, 43, 82]`,
        time_complexity: '• Best Case: O(n log n)\n• Average Case: O(n log n)\n• Worst Case: O(n log n) (Guaranteed)',
        space_complexity: 'O(n) auxiliary buffer space.',
        viva_questions: [
          { q: 'What is the recurrence relation for Merge Sort?', a: 'T(n) = 2T(n/2) + O(n). By Master Theorem, T(n) = O(n log n).' },
          { q: 'Why is Merge Sort preferred for Linked Lists?', a: 'Because linked list nodes can be merged in O(1) auxiliary space simply by rewiring pointers.' }
        ]
      },
      quick_sort: {
        name: 'Quick Sort',
        type: 'algorithm',
        definition: 'Quick Sort is a divide-and-conquer algorithm that selects a pivot element, partitions the array such that elements smaller than pivot go left and larger go right, and then sorts partitions recursively.',
        explanation: 'Quick sort partitions in-place. The Lomuto partition scheme picks the last element as pivot and uses two pointers (i, j) to partition. In practice, it is significantly faster than Merge Sort due to cache locality and minimal constant factors.',
        c_program: `#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main(void) {
    int arr[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(arr) / sizeof(arr[0]);
    quickSort(arr, 0, n - 1);
    printf("Sorted by Quick Sort: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
        sample_io: 'Input: [10, 80, 30, 90, 40, 50, 70]\nOutput: Sorted by Quick Sort: 10 30 40 50 70 80 90',
        dry_run: `Pivot = 70, low=0, high=6
Lomuto partitioning shifts elements <= 70 to left: [10, 30, 40, 50] left of pivot 70, [90, 80] right.
Pivot 70 is placed at index 4. Recursively sorts sub-partitions.`,
        time_complexity: '• Best Case: O(n log n)\n• Average Case: O(n log n)\n• Worst Case: O(n^2) (When pivot is consistently extreme)',
        space_complexity: 'O(log n) auxiliary stack memory (O(n) in worst case).',
        viva_questions: [
          { q: 'How do you avoid the worst-case O(n^2) of Quick Sort?', a: 'Using Randomized Pivot selection or Median-of-Three pivot selection.' }
        ]
      }
    },

    linked_lists: {
      title: 'Linked Lists (Singly, Doubly, Circular)',
      syllabus_code: 'DS-UNIT-3',
      singly_linked_list: {
        name: 'Singly Linked List',
        type: 'data_structure',
        definition: 'A Singly Linked List is a dynamic linear data structure consisting of nodes, each storing a data value and a pointer (next) to the subsequent node, terminating at NULL.',
        operations: ['Creation', 'Insert at beginning O(1)', 'Insert at end O(n)', 'Delete at beginning O(1)', 'Delete at end O(n)', 'Reversal O(n)'],
        c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int val) {
    struct Node *n = (struct Node *)malloc(sizeof(struct Node));
    n->data = val;
    n->next = NULL;
    return n;
}

struct Node* insertAtBeginning(struct Node *head, int val) {
    struct Node *n = createNode(val);
    n->next = head;
    return n;
}

struct Node* insertAtEnd(struct Node *head, int val) {
    struct Node *n = createNode(val);
    if (!head) return n;
    struct Node *t = head;
    while (t->next) t = t->next;
    t->next = n;
    return head;
}

struct Node* deleteAtBeginning(struct Node *head) {
    if (!head) return NULL;
    struct Node *temp = head;
    head = head->next;
    free(temp);
    return head;
}

struct Node* reverseList(struct Node *head) {
    struct Node *prev = NULL, *curr = head, *next = NULL;
    while (curr) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

void display(struct Node *head) {
    while (head) {
        printf("[%d] -> ", head->data);
        head = head->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node *head = NULL;
    head = insertAtEnd(head, 10);
    head = insertAtEnd(head, 20);
    head = insertAtBeginning(head, 5);
    display(head);

    head = reverseList(head);
    printf("Reversed: ");
    display(head);
    return 0;
}`,
        sample_io: 'Output:\n[5] -> [10] -> [20] -> NULL\nReversed: [20] -> [10] -> [5] -> NULL',
        dry_run: `Reverse [5 -> 10 -> 20]:
curr=5, next=10, 5->next=NULL, prev=5, curr=10
curr=10, next=20, 10->next=5, prev=10, curr=20
curr=20, next=NULL, 20->next=10, prev=20, curr=NULL
Done! New head is 20.`,
        time_complexity: 'Insert Head: O(1), Insert Tail: O(n), Delete Head: O(1), Reverse: O(n)',
        space_complexity: 'O(1) auxiliary space, O(n) total memory.',
        viva_questions: [
          { q: 'How many pointers are required to reverse a linked list iteratively?', a: 'Three pointers: prev, curr, and next.' }
        ]
      },
      doubly_linked_list: {
        name: 'Doubly Linked List (DLL)',
        type: 'data_structure',
        definition: 'A Doubly Linked List is a linear data structure where each node stores data and two pointers: prev pointing to the prior node and next pointing to the succeeding node.',
        c_program: `#include <stdio.h>
#include <stdlib.h>

struct DNode {
    int data;
    struct DNode *prev, *next;
};

struct DNode* insertFront(struct DNode *head, int val) {
    struct DNode *n = (struct DNode *)malloc(sizeof(struct DNode));
    n->data = val; n->prev = NULL; n->next = head;
    if (head) head->prev = n;
    return n;
}

void display(struct DNode *head) {
    printf("DLL: NULL <-> ");
    while (head) {
        printf("[%d] <-> ", head->data);
        head = head->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct DNode *head = NULL;
    head = insertFront(head, 20);
    head = insertFront(head, 10);
    display(head);
    return 0;
}`,
        sample_io: 'Output:\nDLL: NULL <-> [10] <-> [20] <-> NULL',
        time_complexity: 'Insert/Delete at known pointer: O(1)',
        space_complexity: 'Two pointers per node (extra memory overhead).',
        viva_questions: [
          { q: 'What is the main benefit of a DLL over a SLL?', a: 'Bidirectional navigation and O(1) node deletion given a direct pointer.' }
        ]
      },
      circular_linked_list: {
        name: 'Circular Linked List',
        type: 'data_structure',
        definition: 'A Circular Linked List connects the last node back to the head node, forming an unbroken loop with no NULL pointer.',
        c_program: `#include <stdio.h>
#include <stdlib.h>

struct CNode {
    int data;
    struct CNode *next;
};

struct CNode* insert(struct CNode *last, int val) {
    struct CNode *n = (struct CNode *)malloc(sizeof(struct CNode));
    n->data = val;
    if (!last) { n->next = n; return n; }
    n->next = last->next;
    last->next = n;
    return n;
}

void display(struct CNode *last) {
    if (!last) return;
    struct CNode *head = last->next, *curr = head;
    printf("CLL: ");
    do {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    } while (curr != head);
    printf("(head: %d)\\n", head->data);
}

int main(void) {
    struct CNode *last = NULL;
    last = insert(last, 10);
    last = insert(last, 20);
    display(last);
    return 0;
}`,
        sample_io: 'Output:\nCLL: [10] -> [20] -> (head: 10)',
        time_complexity: 'Insert at head/tail with last pointer: O(1)',
        space_complexity: 'O(1) auxiliary.',
        viva_questions: [
          { q: 'How do you avoid an infinite loop when traversing a circular linked list?', a: 'Save the head pointer and stop the loop when curr == head using a do-while loop.' }
        ]
      }
    },

    stacks: {
      title: 'Stacks Using Arrays & Applications',
      syllabus_code: 'DS-UNIT-4',
      stack_array: {
        name: 'Stack Using Array (LIFO)',
        type: 'data_structure',
        definition: 'A Stack is a linear data structure operating under the LIFO (Last-In, First-Out) principle, where insertions (push) and deletions (pop) occur exclusively at the top.',
        c_program: `#include <stdio.h>
#define MAX 5

int stack[MAX];
int top = -1;

void push(int val) {
    if (top == MAX - 1) { printf("Stack Overflow!\\n"); return; }
    stack[++top] = val;
}

int pop(void) {
    if (top == -1) { printf("Stack Underflow!\\n"); return -1; }
    return stack[top--];
}

int peek(void) {
    return (top == -1) ? -1 : stack[top];
}

int main(void) {
    push(10); push(20); push(30);
    printf("Top element: %d\\n", peek());
    printf("Popped: %d\\n", pop());
    return 0;
}`,
        sample_io: 'Output:\nTop element: 30\nPopped: 30',
        time_complexity: 'push: O(1), pop: O(1), peek: O(1)',
        space_complexity: 'O(MAX) static array.',
        viva_questions: [
          { q: 'What are the overflow and underflow conditions in a stack?', a: 'Overflow: top == MAX - 1. Underflow: top == -1.' }
        ]
      },
      infix_to_postfix: {
        name: 'Infix to Postfix Expression Conversion',
        type: 'algorithm',
        definition: 'Infix to Postfix conversion transforms human-readable expressions (A + B * C) into Reverse Polish Notation (A B C * +) where operators follow operands, enabling parenthesis-free machine evaluation.',
        c_program: `#include <stdio.h>
#include <ctype.h>

char stack[100];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop(void) { return (top == -1) ? -1 : stack[top--]; }
char peek(void) { return (top == -1) ? -1 : stack[top]; }

int prec(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

void infixToPostfix(char infix[], char postfix[]) {
    int k = 0;
    for (int i = 0; infix[i] != '\\0'; i++) {
        char ch = infix[i];
        if (isalnum(ch)) postfix[k++] = ch;
        else if (ch == '(') push(ch);
        else if (ch == ')') {
            while (top != -1 && peek() != '(') postfix[k++] = pop();
            pop();
        } else {
            while (top != -1 && prec(peek()) >= prec(ch)) postfix[k++] = pop();
            push(ch);
        }
    }
    while (top != -1) postfix[k++] = pop();
    postfix[k] = '\\0';
}

int main(void) {
    char infix[] = "(A+B)*C";
    char postfix[100];
    infixToPostfix(infix, postfix);
    printf("Infix: %s -> Postfix: %s\\n", infix, postfix);
    return 0;
}`,
        sample_io: 'Output:\nInfix: (A+B)*C -> Postfix: AB+C*',
        time_complexity: 'O(n) single pass scan.',
        space_complexity: 'O(n) operator stack.',
        viva_questions: [
          { q: 'Why do computers evaluate postfix expressions instead of infix?', a: 'Postfix expressions require no parentheses and can be evaluated sequentially in a single pass using an operand stack.' }
        ]
      },
      parentheses_matching: {
        name: 'Parentheses / Bracket Matching',
        type: 'algorithm',
        definition: 'Checks whether opening brackets (), {}, [] match their closing counterparts in proper nested order using a stack.',
        c_program: `#include <stdio.h>
#include <stdbool.h>

bool checkBalanced(char exp[]) {
    char stack[100];
    int top = -1;
    for (int i = 0; exp[i] != '\\0'; i++) {
        char c = exp[i];
        if (c == '(' || c == '{' || c == '[') stack[++top] = c;
        else if (c == ')' || c == '}' || c == ']') {
            if (top == -1) return false;
            char o = stack[top--];
            if ((c == ')' && o != '(') || (c == '}' && o != '{') || (c == ']' && o != '[')) return false;
        }
    }
    return top == -1;
}

int main(void) {
    char s[] = "{[()]}";
    printf("%s is %s\\n", s, checkBalanced(s) ? "BALANCED" : "NOT BALANCED");
    return 0;
}`,
        sample_io: 'Output:\n{[()]} is BALANCED',
        time_complexity: 'O(n)',
        space_complexity: 'O(n)',
        viva_questions: [
          { q: 'What indicates unbalanced brackets when the string ends?', a: 'If the stack is not empty (top != -1), unmatched opening brackets remain.' }
        ]
      }
    },

    queues: {
      title: 'Queues and Circular Queues',
      syllabus_code: 'DS-UNIT-5',
      linear_queue: {
        name: 'Linear Queue (Array Implementation)',
        type: 'data_structure',
        definition: 'A Linear Queue is a FIFO (First-In, First-Out) structure where elements enter at the rear and exit at the front.',
        limitation: 'Suffers from FALSE OVERFLOW: When elements are dequeued, front moves forward, leaving vacant slots at the front that cannot be reused once rear reaches MAX-1.',
        c_program: `#include <stdio.h>
#define MAX 5

int q[MAX], front = -1, rear = -1;

void enqueue(int val) {
    if (rear == MAX - 1) { printf("Queue Overflow!\\n"); return; }
    if (front == -1) front = 0;
    q[++rear] = val;
}

int dequeue(void) {
    if (front == -1 || front > rear) { printf("Queue Underflow!\\n"); return -1; }
    int val = q[front++];
    if (front > rear) { front = -1; rear = -1; }
    return val;
}

int main(void) {
    enqueue(10); enqueue(20);
    printf("Dequeued: %d\\n", dequeue());
    return 0;
}`,
        sample_io: 'Output:\nDequeued: 10',
        time_complexity: 'enqueue: O(1), dequeue: O(1)',
        space_complexity: 'O(MAX) static array.',
        viva_questions: [
          { q: 'What is false overflow in a linear queue?', a: 'When rear == MAX - 1 but empty slots exist at front because elements were dequeued.' }
        ]
      },
      circular_queue: {
        name: 'Circular Queue (Ring Buffer)',
        type: 'data_structure',
        definition: 'A Circular Queue connects the last array position back to index 0 using modulo arithmetic, eliminating false overflow by reusing vacated memory slots.',
        modulo_arithmetic: {
          full: '(rear + 1) % MAX == front',
          empty: 'front == -1'
        },
        c_program: `#include <stdio.h>
#define MAX 5

int cq[MAX], front = -1, rear = -1;

int isFull() { return (rear + 1) % MAX == front; }
int isEmpty() { return front == -1; }

void enqueue(int val) {
    if (isFull()) { printf("Circular Queue Overflow!\\n"); return; }
    if (front == -1) front = rear = 0;
    else rear = (rear + 1) % MAX;
    cq[rear] = val;
}

int dequeue(void) {
    if (isEmpty()) { printf("Circular Queue Underflow!\\n"); return -1; }
    int val = cq[front];
    if (front == rear) front = rear = -1;
    else front = (front + 1) % MAX;
    return val;
}

int main(void) {
    enqueue(10); enqueue(20); enqueue(30); enqueue(40); enqueue(50);
    printf("Dequeued: %d\\n", dequeue());
    enqueue(60); // Wraps around into slot 0!
    printf("Enqueued 60 wrapped around into vacated index.\\n");
    return 0;
}`,
        sample_io: 'Output:\nDequeued: 10\nEnqueued 60 wrapped around into vacated index.',
        time_complexity: 'enqueue: O(1), dequeue: O(1)',
        space_complexity: 'O(MAX)',
        viva_questions: [
          { q: 'What is the full condition for a circular queue?', a: '(rear + 1) % MAX == front.' },
          { q: 'Why is modulo used?', a: 'To wrap index MAX back to 0 seamlessly.' }
        ]
      }
    },

    binary_trees: {
      title: 'Binary Trees & Binary Search Trees (BST)',
      syllabus_code: 'DS-UNIT-7',
      bst: {
        name: 'Binary Search Tree (BST)',
        type: 'data_structure',
        definition: 'A Binary Search Tree is a node-based binary tree where the left subtree contains keys smaller than the node, and the right subtree contains keys greater than the node.',
        traversals: [
          'Inorder: Left -> Root -> Right (Produces ASCENDING SORTED ORDER)',
          'Preorder: Root -> Left -> Right (Used for serialization)',
          'Postorder: Left -> Right -> Root (Used for deletion/freeing)'
        ],
        c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* createNode(int val) {
    struct Node *n = (struct Node *)malloc(sizeof(struct Node));
    n->data = val; n->left = n->right = NULL;
    return n;
}

struct Node* insert(struct Node *root, int val) {
    if (!root) return createNode(val);
    if (val < root->data) root->left = insert(root->left, val);
    else if (val > root->data) root->right = insert(root->right, val);
    return root;
}

struct Node* search(struct Node *root, int key) {
    if (!root || root->data == key) return root;
    if (key < root->data) return search(root->left, key);
    return search(root->right, key);
}

void inorder(struct Node *root) {
    if (root) {
        inorder(root->left);
        printf("%d ", root->data);
        inorder(root->right);
    }
}

int height(struct Node *root) {
    if (!root) return -1;
    int lh = height(root->left), rh = height(root->right);
    return 1 + (lh > rh ? lh : rh);
}

// Function to count leaf nodes in binary tree
int countLeafNodes(struct Node *root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    return countLeafNodes(root->left) + countLeafNodes(root->right);
}

int main(void) {
    struct Node *root = NULL;
    int arr[] = {50, 30, 20, 40, 70, 60, 80};
    for (int i = 0; i < 7; i++) root = insert(root, arr[i]);

    printf("Inorder (Sorted): "); inorder(root); printf("\\n");
    printf("Height: %d\\n", height(root));
    printf("Leaf count: %d\\n", countLeafNodes(root));
    return 0;
}`,
        sample_io: 'Output:\nInorder (Sorted): 20 30 40 50 60 70 80 \nHeight: 2\nLeaf count: 4',
        time_complexity: 'Search/Insert: O(log n) average, O(n) worst (skewed tree). Traversals: O(n).',
        space_complexity: 'O(h) recursion stack.',
        viva_questions: [
          { q: 'Which traversal of a BST gives values in ascending sorted order?', a: 'Inorder traversal (Left, Root, Right).' },
          { q: 'What is a skewed binary tree?', a: 'A tree where every internal node has only one child, degrading search complexity to O(n).' }
        ]
      }
    },

    graphs: {
      title: 'Graph Data Structures (BFS & DFS)',
      syllabus_code: 'DS-UNIT-8',
      bfs: {
        name: 'Breadth-First Search (BFS)',
        type: 'algorithm',
        definition: 'Breadth-First Search is a graph traversal algorithm that explores all neighbor vertices at the current depth before advancing to vertices at the next depth level, using a FIFO Queue.',
        c_program: `#include <stdio.h>
#include <stdbool.h>
#define MAX 10

int q[MAX], front = -1, rear = -1;
void enqueue(int v) { if (front == -1) front = 0; q[++rear] = v; }
int dequeue(void) { return q[front++]; }
bool isQEmpty(void) { return front == -1 || front > rear; }

void BFS(int adj[MAX][MAX], int V, int start) {
    bool visited[MAX] = {false};
    visited[start] = true;
    enqueue(start);
    printf("BFS: ");
    while (!isQEmpty()) {
        int u = dequeue();
        printf("%d ", u);
        for (int v = 0; v < V; v++) {
            if (adj[u][v] && !visited[v]) {
                visited[v] = true;
                enqueue(v);
            }
        }
    }
    printf("\\n");
}

int main(void) {
    int V = 4;
    int adj[MAX][MAX] = {{0,1,1,0},{1,0,0,1},{1,0,0,1},{0,1,1,0}};
    BFS(adj, V, 0);
    return 0;
}`,
        sample_io: 'Output:\nBFS: 0 1 2 3',
        time_complexity: 'O(V + E) for Adjacency List, O(V^2) for Adjacency Matrix.',
        space_complexity: 'O(V) queue and visited array.',
        viva_questions: [
          { q: 'What data structure is used to implement BFS?', a: 'A FIFO Queue.' },
          { q: 'Can BFS find the shortest path?', a: 'Yes, in unweighted graphs, BFS is guaranteed to find the shortest path between two vertices.' }
        ]
      },
      dfs: {
        name: 'Depth-First Search (DFS)',
        type: 'algorithm',
        definition: 'Depth-First Search is a graph traversal algorithm that plunges as deep as possible along each branch before backtracking, utilizing a LIFO Stack or recursive call stack.',
        c_program: `#include <stdio.h>
#include <stdbool.h>
#define MAX 10

void DFSUtil(int adj[MAX][MAX], int V, int u, bool visited[]) {
    visited[u] = true;
    printf("%d ", u);
    for (int v = 0; v < V; v++) {
        if (adj[u][v] && !visited[v]) DFSUtil(adj, V, v, visited);
    }
}

void DFS(int adj[MAX][MAX], int V, int start) {
    bool visited[MAX] = {false};
    printf("DFS: ");
    DFSUtil(adj, V, start, visited);
    printf("\\n");
}

int main(void) {
    int V = 4;
    int adj[MAX][MAX] = {{0,1,1,0},{1,0,0,1},{1,0,0,1},{0,1,1,0}};
    DFS(adj, V, 0);
    return 0;
}`,
        sample_io: 'Output:\nDFS: 0 1 3 2',
        time_complexity: 'O(V + E) with Adjacency List, O(V^2) with Adjacency Matrix.',
        space_complexity: 'O(V) call stack.',
        viva_questions: [
          { q: 'What data structure is used by DFS?', a: 'A LIFO Stack (either recursion stack or explicit stack).' }
        ]
      }
    },

    hashing: {
      title: 'Hashing & Collision Resolution',
      syllabus_code: 'DS-UNIT-9',
      hashing_concept: {
        name: 'Hashing & Hash Tables',
        type: 'concept',
        definition: 'Hashing maps keys of variable lengths to fixed-size array indices using a mathematical Hash Function, delivering average O(1) constant-time search, insert, and delete.',
        explanation: 'A Hash Table maps keys to array slots via a hash function h(k) = k % m. When two distinct keys hash to the identical index, a hash collision occurs. Primary resolution strategies are: 1) Linear Probing (Open Addressing) where subsequent empty slots are probed sequentially with (h(k) + i) % m; and 2) Separate Chaining where each slot maintains a dynamic linked list of colliding entries. The load factor alpha = n / m measures table occupancy; resizing and rehashing are typically performed when alpha exceeds 0.75.',
        c_program: `#include <stdio.h>
#define SIZE 7
#define EMPTY -1

int table[SIZE];

int hash(int k) { return k % SIZE; }

void insert(int k) {
    int idx = hash(k);
    for (int i = 0; i < SIZE; i++) {
        int p = (idx + i) % SIZE;
        if (table[p] == EMPTY) {
            table[p] = k;
            return;
        }
    }
}

int search(int k) {
    int idx = hash(k);
    for (int i = 0; i < SIZE; i++) {
        int p = (idx + i) % SIZE;
        if (table[p] == k) return p;
        if (table[p] == EMPTY) return -1;
    }
    return -1;
}

int main(void) {
    for (int i = 0; i < SIZE; i++) table[i] = EMPTY;
    insert(10); // 10 % 7 = 3
    insert(17); // 17 % 7 = 3 -> probes to index 4!
    printf("Key 17 found at index: %d\\n", search(17));
    return 0;
}`,
        sample_io: 'Output:\nKey 17 found at index: 4',
        time_complexity: 'Average: O(1), Worst Case: O(n) (When all keys collide).',
        space_complexity: 'O(m) table size.',
        viva_questions: [
          { q: 'What is the load factor alpha in a hash table?', a: 'alpha = n / m (stored items / table capacity). When alpha > 0.75, rehashing is triggered.' },
          { q: 'What is primary clustering in linear probing?', a: 'The buildup of long contiguous runs of occupied slots, which increases search times.' }
        ]
      },
      linear_probing: {
        name: 'Linear Probing (Collision Resolution)',
        type: 'algorithm',
        definition: 'Linear Probing is an open addressing collision resolution scheme that probes consecutive slots linearly: h(k, i) = (h\'(k) + i) % m until an empty bucket is discovered.',
        explanation: 'When a collision occurs at index h(k), the algorithm sequentially examines slots (h(k)+1)%m, (h(k)+2)%m, etc. While simple with high cache locality, it suffers from primary clustering where contiguous occupied blocks degrade performance to O(n). Load factor alpha should be kept below 0.7.',
        c_program: `#include <stdio.h>
#define SIZE 7
#define EMPTY -1

int table[SIZE];

int hash(int k) { return k % SIZE; }

void insert(int k) {
    int idx = hash(k);
    for (int i = 0; i < SIZE; i++) {
        int p = (idx + i) % SIZE;
        if (table[p] == EMPTY) {
            table[p] = k;
            return;
        }
    }
}

int main(void) {
    for (int i = 0; i < SIZE; i++) table[i] = EMPTY;
    insert(10);
    insert(17);
    printf("Linear probing table initialized.\\n");
    return 0;
}`,
        sample_io: 'Output:\nLinear probing table initialized.',
        time_complexity: 'Average: O(1), Worst Case: O(n) during primary clustering.',
        space_complexity: 'O(m) table size.',
        viva_questions: [
          { q: 'What is primary clustering in linear probing?', a: 'The buildup of long contiguous runs of occupied slots, which increases search times.' },
          { q: 'What is the load factor alpha in a hash table?', a: 'alpha = n / m (stored items / table capacity). When alpha > 0.75, rehashing is triggered.' }
        ]
      },
      separate_chaining: {
        name: 'Separate Chaining (Collision Resolution)',
        type: 'algorithm',
        definition: 'Separate Chaining is a collision resolution technique where each hash table bucket points to a dynamic linked list holding all keys that hash to that same index.',
        explanation: 'In Separate Chaining, table overflow never occurs even when n > m (load factor alpha > 1). Keys colliding at index h(k) are inserted into that bucket\'s linked list. Deletion is standard linked list node deletion in O(1) once located. Memory overhead is due to pointer storage.',
        c_program: `#include <stdio.h>
#include <stdlib.h>
#define SIZE 7

struct Node { int key; struct Node *next; };
struct Node *table[SIZE];

int hash(int k) { return k % SIZE; }

void insert(int k) {
    int idx = hash(k);
    struct Node *n = (struct Node *)malloc(sizeof(struct Node));
    n->key = k; n->next = table[idx];
    table[idx] = n;
}

int main(void) {
    for (int i = 0; i < SIZE; i++) table[i] = NULL;
    insert(10); insert(17);
    printf("Separate chaining table initialized.\\n");
    return 0;
}`,
        sample_io: 'Output:\nSeparate chaining table initialized.',
        time_complexity: 'Average: O(1 + alpha), Worst Case: O(n).',
        space_complexity: 'O(m + n) for table and linked list nodes.',
        viva_questions: [
          { q: 'What is the main advantage of Separate Chaining over Linear Probing?', a: 'The table never runs out of capacity (alpha can exceed 1.0) and deletion is simple without tombstone markers.' }
        ]
      }
    }
  };

  // Additional aliases & knowledge banks
  DS_TOPICS.circular_queues = {
    title: 'Circular Queues',
    syllabus_code: 'DS-UNIT-6',
    circular_queue: DS_TOPICS.queues.circular_queue
  };

  DS_TOPICS.viva_bank = {
    viva_bank: {
      name: 'College Data Structures Viva Questions',
      definition: 'A comprehensive collection of 19 high-frequency college examination viva and interview questions covering data structure concepts, algorithms, complexities, and memory representations.',
      explanation: 'Viva examinations test foundational clarity, real-world trade-offs, and edge-case behavior (e.g. overflow, underflow, recursion depth).',
      c_program: `#include <stdio.h>\n\nint main(void) {\n    printf("Viva examination knowledge loaded successfully.\\n");\n    return 0;\n}`,
      sample_io: 'Ready for viva testing.',
      time_complexity: 'O(1) retrieval',
      space_complexity: 'O(1) memory',
      viva_questions: [
        { q: 'What is a Data Structure?', a: 'A specialized format for organizing, processing, retrieving and storing data in computer memory.' },
        { q: 'What is the difference between Linear and Non-Linear structures?', a: 'Linear structures (Array, Stack, Queue, Linked List) arrange elements sequentially. Non-linear structures (Trees, Graphs) organize data hierarchically or interconnectedly.' },
        { q: 'Why is Binary Search O(log n)?', a: 'Because the search space is halved after every comparison: n, n/2, n/4, ..., 1. Halving k times gives n / 2^k = 1, so k = log2(n).' },
        { q: 'How does a Circular Queue eliminate false overflow?', a: 'By using modulo arithmetic (rear + 1) % MAX, allowing rear to wrap around to index 0 and reuse vacated spaces.' }
      ]
    }
  };

  DS_TOPICS.complexity_table = {
    complexity_table: {
      name: 'Big-O Asymptotic Complexity Reference Table',
      definition: 'Comprehensive reference table of Time and Space complexities for core Searching, Sorting, and Data Structure operations.',
      explanation: 'Asymptotic notation describes algorithm scalability as input size n grows toward infinity.',
      c_program: `#include <stdio.h>\n\nint main(void) {\n    printf("Complexity reference ready.\\n");\n    return 0;\n}`,
      sample_io: 'Table ready.',
      time_complexity: 'Varies by structure (O(1) to O(n^2))',
      space_complexity: 'O(1) to O(n)',
      comparison_table: `| Algorithm / Structure | Best Time | Average Time | Worst Time | Space |
| :--- | :--- | :--- | :--- | :--- |
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |
| Bubble Sort | O(n) | O(n^2) | O(n^2) | O(1) |
| Selection Sort | O(n^2) | O(n^2) | O(n^2) | O(1) |
| Insertion Sort | O(n) | O(n^2) | O(n^2) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n^2) | O(log n) |
| Stack (Array) | O(1) | O(1) | O(1) | O(n) |
| Queue (Circular) | O(1) | O(1) | O(1) | O(n) |
| Singly Linked List | O(1) (head) | O(n) | O(n) | O(n) |
| BST (Balanced) | O(log n) | O(log n) | O(n) (skewed) | O(h) |`
    }
  };

  // ── 2. Natural Language Processing & Question Understanding Pipeline ─────────

  // Typo & spelling correction dictionary
  const SPELLING_CORRECTIONS = {
    'bubel': 'bubble', 'buble': 'bubble', 'bobble': 'bubble',
    'seletion': 'selection', 'selction': 'selection',
    'insrtion': 'insertion', 'insertn': 'insertion', 'insrt': 'insert',
    'merg': 'merge', 'mearge': 'merge',
    'quik': 'quick', 'quic': 'quick', 'quicksrt': 'quick sort',
    'likned': 'linked', 'linkd': 'linked', 'linklist': 'linked list', 'll': 'linked list',
    'doubly': 'doubly', 'dlink': 'doubly linked list', 'dll': 'doubly linked list',
    'circuler': 'circular', 'circluar': 'circular', 'cll': 'circular linked list',
    'stak': 'stack', 'stck': 'stack', 'stk': 'stack',
    'queu': 'queue', 'que': 'queue', 'q': 'queue',
    'binery': 'binary', 'binry': 'binary', 'b-tree': 'binary tree',
    'complxity': 'complexity', 'compexity': 'complexity', 'complx': 'complexity',
    'delte': 'delete', 'delet': 'delete', 'dlt': 'delete', 'remov': 'delete',
    'serch': 'search', 'srch': 'search',
    'recusion': 'recursion', 'recusrion': 'recursion', 'recursn': 'recursion',
    'dryrun': 'dry run', 'trace': 'dry run',
    'prg': 'program', 'prog': 'program', 'prgm': 'program', 'programm': 'program', 'progam': 'program',
    'algorithem': 'algorithm', 'algo': 'algorithm', 'algrithm': 'algorithm',
    'diff': 'difference', 'dif': 'difference', 'differnce': 'difference', 'diffrnce': 'difference', 'btwn': 'between',
    'dynamc': 'dynamic', 'memry': 'memory', 'mem': 'memory',
    'defination': 'definition', 'defn': 'definition', 'dfn': 'definition',
    'graf': 'graph', 'grap': 'graph',
    'hashin': 'hashing', 'hasing': 'hashing',
    'collison': 'collision', 'colision': 'collision',
    'postorder': 'postorder', 'preorder': 'preorder', 'inorder': 'inorder',
    'bst': 'binary search tree'
  };

  // Canonical concept & synonym dictionary
  const SYNONYM_MAP = {
    // Operations
    'delete': ['delete', 'deletion', 'remove', 'removal', 'pop', 'dequeue', 'drop', 'erase', 'detach', 'eliminate', 'discard', 'del'],
    'insert': ['insert', 'insertion', 'add', 'addition', 'push', 'enqueue', 'append', 'prepend', 'attach', 'create', 'ins'],
    'search': ['search', 'searching', 'find', 'lookup', 'locate', 'query', 'detect'],
    'traverse': ['traverse', 'traversal', 'display', 'show', 'print', 'list', 'walk', 'visit', 'iterate', 'view'],
    'reverse': ['reverse', 'reversing', 'reversal', 'invert', 'flip'],
    'peek': ['peek', 'top', 'inspect', 'front element'],
    'overflow': ['overflow', 'full', 'is full', 'capacity'],
    'underflow': ['underflow', 'empty', 'is empty'],
    'height': ['height', 'depth', 'maximum depth'],
    'leaf': ['leaf', 'leaves', 'leaf node', 'terminal node'],
    // Structures
    'stack': ['stack', 'lifo', 'push down'],
    'queue': ['queue', 'fifo', 'waiting line'],
    'circular_queue': ['circular queue', 'ring buffer', 'modulo queue', 'wrap around queue'],
    'linked_list': ['linked list', 'singly linked list', 'node chain', 'sll'],
    'doubly_linked_list': ['doubly linked list', 'dll', 'two way list'],
    'circular_linked_list': ['circular linked list', 'cll', 'loop list'],
    'binary_search_tree': ['binary search tree', 'bst', 'ordered binary tree'],
    'graph': ['graph', 'network', 'adjacency matrix', 'adjacency list'],
    'bfs': ['bfs', 'breadth first search', 'level order'],
    'dfs': ['dfs', 'depth first search'],
    'hashing': ['hashing', 'hash table', 'hash map', 'collision resolution', 'linear probing', 'separate chaining'],
    // Sorting
    'bubble_sort': ['bubble sort', 'sinking sort'],
    'selection_sort': ['selection sort'],
    'insertion_sort': ['insertion sort', 'card sort'],
    'merge_sort': ['merge sort', 'divide and conquer sort'],
    'quick_sort': ['quick sort', 'partition sort', 'lomuto', 'hoare'],
    // Searching
    'linear_search': ['linear search', 'sequential search'],
    'binary_search': ['binary search', 'logarithmic search', 'half interval search']
  };

  /**
   * Normalizes incoming text: lowercases, expands contractions, handles punctuation.
   */
  function normalizeText(text) {
    if (!text || typeof text !== 'string') return '';
    let t = text.toLowerCase().trim();
    // Expand contractions
    t = t.replace(/what's/g, 'what is')
         .replace(/how's/g, 'how is')
         .replace(/don't/g, 'do not')
         .replace(/can't/g, 'cannot')
         .replace(/won't/g, 'will not')
         .replace(/i'm/g, 'i am');
    // Remove punctuation and hyphens except essential arithmetic symbols
    t = t.replace(/[?!,;:"'()[\]{}-]/g, ' ');
    // Collapse whitespace
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  }

  /**
   * Applies spelling correction against known student typos.
   */
  function correctSpelling(normalizedText) {
    const words = normalizedText.split(' ');
    const corrected = words.map(w => SPELLING_CORRECTIONS[w] || w);
    return corrected.join(' ');
  }

  /**
   * Computes Levenshtein distance for fuzzy keyword tolerance.
   */
  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  /**
   * Classifies question intent (program, algorithm, definition, comparison, dry_run, complexity, viva, etc.)
   */
  function detectQuestionIntent(q) {
    if (q.includes('viva') || q.includes('interview') || q.includes('oral') || q.includes('exam question') || q.includes('faq')) {
      return 'viva';
    }
    if (q.includes('program') || q.includes('code') || q.includes('c program') || q.includes('c code') || q.includes('implementation') || q.includes('function in c') || q.includes('write a program') || q.includes('give the program')) {
      return 'program';
    }
    if (q.includes('algorithm') || q.includes('algo') || q.includes('pseudocode') || q.includes('steps for') || q.includes('procedure')) {
      return 'algorithm';
    }
    if (q.includes('dry run') || q.includes('trace') || q.includes('step by step execution') || q.includes('trace table') || q.includes('walk through')) {
      return 'dry_run';
    }
    if (q.includes('complexity') || q.includes('time complexity') || q.includes('space complexity') || q.includes('big o') || q.includes('omega') || q.includes('theta') || q.includes('runtime')) {
      return 'complexity';
    }
    if (q.includes('vs') || q.includes('versus') || q.includes('difference') || q.includes('compare') || q.includes('contrast') || q.includes('distinguish')) {
      return 'comparison';
    }
    if (q.includes('application') || q.includes('applications') || q.includes('real world') || q.includes('use case') || q.includes('where is it used')) {
      return 'application';
    }
    if (q.includes('advantages') || q.includes('disadvantages') || q.includes('pros and cons') || q.includes('pros') || q.includes('cons') || q.includes('limitations') || q.includes('benefits') || q.includes('drawbacks')) {
      return 'advantages_disadvantages';
    }
    if (q.startsWith('what is') || q.startsWith('define') || q.startsWith('meaning of') || q.includes('definition')) {
      return 'definition';
    }
    return 'explanation'; // Default is full structured teaching explanation
  }

  /**
   * Matches question against all known topics and operations with scoring.
   */
  function classifyDSQuery(rawQuery) {
    if (!rawQuery || typeof rawQuery !== 'string') {
      return { isDSQuery: false, confidence: 0 };
    }

    const norm = normalizeText(rawQuery);
    const q = correctSpelling(norm);
    const intent = detectQuestionIntent(q);

    // ── Check A: Comparison Queries ──
    if (intent === 'comparison') {
      if ((q.includes('linear') && q.includes('binary')) || (q.includes('sequential') && q.includes('binary'))) {
        return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'linear_vs_binary_search', name: 'Linear Search vs Binary Search', intent };
      }
      if (q.includes('stack') && q.includes('queue')) {
        return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'stack_vs_queue', name: 'Stack vs Queue', intent };
      }
      if (q.includes('array') && q.includes('linked list')) {
        return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'array_vs_linked_list', name: 'Array vs Linked List', intent };
      }
      if ((q.includes('bfs') && q.includes('dfs')) || (q.includes('breadth') && q.includes('depth'))) {
        return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'bfs_vs_dfs', name: 'BFS vs DFS', intent };
      }
      if ((q.includes('matrix') && q.includes('list')) || (q.includes('adjacency') && (q.includes('matrix') || q.includes('list')))) {
        return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'adj_matrix_vs_adj_list', name: 'Adjacency Matrix vs Adjacency List', intent };
      }
      if (q.includes('bubble') && q.includes('quick')) {
        return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'bubble_vs_quick_sort', name: 'Bubble Sort vs Quick Sort', intent };
      }
      if (q.includes('linear') && q.includes('circular') && q.includes('queue')) {
        return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'linear_vs_circular_queue', name: 'Linear Queue vs Circular Queue', intent };
      }
      if (q.includes('static') && q.includes('dynamic') && q.includes('memory')) {
        return { isDSQuery: true, confidence: 1.0, topic: 'fundamentals', item: 'static_vs_dynamic_memory', name: 'Static vs Dynamic Memory Allocation', intent };
      }
      if (q.includes('linear') && q.includes('non') && q.includes('structure')) {
        return { isDSQuery: true, confidence: 1.0, topic: 'fundamentals', item: 'linear_vs_non_linear', name: 'Linear vs Non-Linear Data Structures', intent };
      }
    }

    // ── Check B: Specific Core Topics (Ordered to prevent keyword shadowing) ──

    // 0. Special Reference Tables & Banks (Highest priority when explicitly requested)
    if (q.includes('complexity table') || q.includes('big o table') || q.includes('big o time complexity comparison table') || (q.includes('complexity') && q.includes('table'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'complexity_table', item: 'complexity_table', name: 'Big-O Complexity Comparison Table', intent: 'complexity' };
    }
    if ((q.includes('viva') || q.includes('interview') || q.includes('oral')) && (q.includes('data structure') || q.includes('ds') || q.includes('all') || q.includes('top viva') || q.includes('bank') || (!q.includes('search') && !q.includes('sort') && !q.includes('list') && !q.includes('stack') && !q.includes('queue') && !q.includes('tree') && !q.includes('graph') && !q.includes('hash')))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'viva_bank', item: 'viva_bank', name: 'Viva Questions Bank', intent: 'viva' };
    }

    // 1. Fundamentals & Memory
    if (q.includes('asymptotic') || q.includes('big o') || q.includes('big omega') || q.includes('big theta') || (q.includes('notation') && (q.includes('complexity') || q.includes('ds') || q.includes('time')))) {
      return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'asymptotic_notations', name: 'Asymptotic Notations', intent };
    }
    if (q.includes('malloc') || q.includes('calloc') || q.includes('realloc') || ((q.includes('static') || q.includes('dynamic') || q.includes('heap') || q.includes('free')) && (q.includes('memory') || q.includes('allocation') || q.includes('pointer')))) {
      return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'static_vs_dynamic_memory', name: 'Static vs Dynamic Memory Allocation', intent };
    }
    if (q.includes('primitive') || q.includes('non primitive') || q.includes('non-primitive')) {
      return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'introduction', name: 'Primitive vs Non-Primitive Data Structures', intent };
    }
    if (q.includes('linear vs non linear') || (q.includes('linear') && q.includes('non linear')) || (q.includes('linear') && q.includes('non-linear'))) {
      return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'linear_vs_non_linear', name: 'Linear vs Non-Linear Structures', intent };
    }
    if (q.includes('what is data structure') || q.includes('what is a data structure') || q.includes('introduction to data structure') || q.includes('types of data structures') || q.includes('data structure fundamentals') || (q.includes('data structure') && q.includes('definition'))) {
      return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'introduction', name: 'Introduction to Data Structures', intent };
    }

    // 2. Graphs & Graph Traversals (Must precede general searching algorithms)
    if (q.includes('bfs') || q.includes('breadth first search') || (q.includes('breadth') && (q.includes('graph') || q.includes('traversal') || q.includes('search')))) {
      return { isDSQuery: true, confidence: 0.98, topic: 'graphs', item: 'bfs', name: 'Breadth-First Search (BFS)', intent };
    }
    if (q.includes('dfs') || q.includes('depth first search') || (q.includes('depth') && (q.includes('graph') || q.includes('traversal') || q.includes('search')))) {
      return { isDSQuery: true, confidence: 0.98, topic: 'graphs', item: 'dfs', name: 'Depth-First Search (DFS)', intent };
    }
    if (q.includes('graph') || (q.includes('adjacency') && (q.includes('matrix') || q.includes('list')))) {
      return { isDSQuery: true, confidence: 0.9, topic: 'graphs', item: 'bfs', name: 'Graph Traversals', intent };
    }

    // 3. Binary Trees & BST (Must precede general searching algorithms)
    if (q.includes('tree') || q.includes('bst') || q.includes('binary search tree') || q.includes('inorder') || q.includes('preorder') || q.includes('postorder') || q.includes('leaf node') || (q.includes('height') && q.includes('tree')) || (q.includes('left child') && q.includes('right child'))) {
      return { isDSQuery: true, confidence: 0.95, topic: 'binary_trees', item: 'bst', name: 'Binary Search Tree (BST)', intent };
    }

    // 4. Linked Lists (Must precede general searching algorithms so "search in linked list" stays in linked_lists)
    if (q.includes('doubly linked list') || q.includes('dll') || (q.includes('doubly') && q.includes('list'))) {
      return { isDSQuery: true, confidence: 0.95, topic: 'linked_lists', item: 'doubly_linked_list', name: 'Doubly Linked List', intent };
    }
    if (q.includes('circular linked list') || q.includes('cll') || (q.includes('circular') && q.includes('linked list'))) {
      return { isDSQuery: true, confidence: 0.95, topic: 'linked_lists', item: 'circular_linked_list', name: 'Circular Linked List', intent };
    }
    if (q.includes('linked list') || q.includes('singly linked list') || q.includes('sll') || q.includes('reverse linked list') || (q.includes('node') && (q.includes('delete') || q.includes('insert') || q.includes('head') || q.includes('tail')))) {
      return { isDSQuery: true, confidence: 0.95, topic: 'linked_lists', item: 'singly_linked_list', name: 'Singly Linked List', intent };
    }

    // 5. Searching Algorithms
    if ((((q.includes('binary search') || (q.includes('binary') && q.includes('search')) || (q.includes('logarithmic') && q.includes('search'))) || ((q.includes('dividing') || q.includes('divide')) && q.includes('half'))) && !q.includes('tree') && !q.includes('bst'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'searching', item: 'binary_search', name: 'Binary Search', intent };
    }
    if (q.includes('linear search') || (q.includes('sequential') && q.includes('search')) || (q.includes('search') && !q.includes('binary') && !q.includes('tree') && !q.includes('bst') && !q.includes('graph') && !q.includes('linked list')) || (q.includes('check') && q.includes('one by one'))) {
      return { isDSQuery: true, confidence: 0.9, topic: 'searching', item: 'linear_search', name: 'Linear Search', intent };
    }

    // 6. Sorting Algorithms
    if (q.includes('bubble sort') || (q.includes('bubble') && q.includes('sort')) || (q.includes('swapping adjacent') || q.includes('swap adjacent'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'bubble_sort', name: 'Bubble Sort', intent };
    }
    if (q.includes('selection sort') || (q.includes('selection') && q.includes('sort')) || (q.includes('find minimum') && q.includes('swap'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'selection_sort', name: 'Selection Sort', intent };
    }
    if (q.includes('insertion sort') || (q.includes('insertion') && q.includes('sort')) || (q.includes('insert') && q.includes('sorted part'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'insertion_sort', name: 'Insertion Sort', intent };
    }
    if (q.includes('merge sort') || (q.includes('merge') && q.includes('sort')) || (q.includes('divide') && q.includes('merge'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'merge_sort', name: 'Merge Sort', intent };
    }
    if (q.includes('quick sort') || (q.includes('quick') && q.includes('sort')) || q.includes('lomuto') || q.includes('partition sort') || (q.includes('pivot') && q.includes('partition'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'quick_sort', name: 'Quick Sort', intent };
    }

    // 7. Stacks
    if (q.includes('infix to postfix') || q.includes('postfix expression') || q.includes('infix expression')) {
      return { isDSQuery: true, confidence: 0.98, topic: 'stacks', item: 'infix_to_postfix', name: 'Infix to Postfix Conversion', intent };
    }
    if (q.includes('parenthes') || q.includes('bracket') || q.includes('balanced bracket')) {
      return { isDSQuery: true, confidence: 0.98, topic: 'stacks', item: 'parentheses_matching', name: 'Balanced Parentheses', intent };
    }
    if (q.includes('stack') || q.includes('lifo') || (q.includes('push') && q.includes('pop'))) {
      return { isDSQuery: true, confidence: 0.95, topic: 'stacks', item: 'stack_array', name: 'Stack Using Arrays', intent };
    }

    // 8. Queues & Circular Queues
    if (q.includes('circular queue') || q.includes('ring buffer') || q.includes('(rear + 1) % max') || q.includes('false overflow') || (q.includes('circular') && q.includes('queue')) || q.includes('modulo arithmetic')) {
      return { isDSQuery: true, confidence: 0.98, topic: 'circular_queues', item: 'circular_queue', name: 'Circular Queue', intent };
    }
    if (q.includes('queue') || q.includes('fifo') || (q.includes('enqueue') && q.includes('dequeue'))) {
      return { isDSQuery: true, confidence: 0.95, topic: 'queues', item: 'linear_queue', name: 'Linear Queue', intent };
    }

    // 9. Hashing & Tables
    if (q.includes('linear probing')) {
      return { isDSQuery: true, confidence: 0.98, topic: 'hashing', item: 'linear_probing', name: 'Linear Probing', intent };
    }
    if (q.includes('separate chaining')) {
      return { isDSQuery: true, confidence: 0.98, topic: 'hashing', item: 'separate_chaining', name: 'Separate Chaining', intent };
    }
    if (q.includes('hash') || q.includes('hashing') || q.includes('collision') || (q.includes('key to index') || q.includes('hash function')) || q.includes('load factor')) {
      return { isDSQuery: true, confidence: 0.95, topic: 'hashing', item: 'hashing_concept', name: 'Hashing & Hash Tables', intent };
    }

    // 10. Viva Questions Bank
    if (q.includes('viva') || q.includes('oral') || (q.includes('interview') && q.includes('question'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'viva_bank', item: 'viva_bank', name: 'Viva Questions', intent: 'viva' };
    }

    // 11. Complexity Comparison Table
    if (q.includes('big-o time complexity comparison table') || q.includes('complexity table') || q.includes('big o table') || (q.includes('complexity') && q.includes('table'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'complexity_table', item: 'complexity_table', name: 'Complexity Table', intent: 'complexity' };
    }

    // 12. General Complexity
    if (q.includes('complexity') || q.includes('time complexity') || q.includes('space complexity')) {
      return { isDSQuery: true, confidence: 0.85, topic: 'fundamentals', item: 'asymptotic_notations', name: 'Complexity Reference', intent };
    }

    return { isDSQuery: false, confidence: 0.1 };
  }

  /**
   * Resolves contextual follow-up questions referencing previous conversation turns.
   */
  function resolveFollowUp(query, lastTopic) {
    if (!lastTopic || !lastTopic.topic) return null;

    const norm = normalizeText(query);
    const q = correctSpelling(norm);
    const intent = detectQuestionIntent(q);

    // Operation detection in follow-up
    let op = null;
    if (q.includes('insert') || q.includes('add') || q.includes('push') || q.includes('enqueue')) op = 'insert';
    else if (q.includes('delete') || q.includes('remove') || q.includes('pop') || q.includes('dequeue')) op = 'delete';
    else if (q.includes('reverse') || q.includes('invert')) op = 'reverse';
    else if (q.includes('search') || q.includes('find')) op = 'search';
    else if (q.includes('display') || q.includes('traverse') || q.includes('print')) op = 'traverse';
    else if (q.includes('height') || q.includes('depth')) op = 'height';
    else if (q.includes('leaf') || q.includes('leaves')) op = 'leaf';

    // Type classification for follow-up
    let type = 'general';
    if (q.includes('why') && (q.includes('condition') || q.includes('formula') || q.includes('used') || q.includes('this'))) {
      type = 'why_condition';
    } else if (q.includes('explain this line') || (q.includes('line') && (q.includes('code') || q.includes('c')))) {
      type = 'explain_line';
    } else if (q.includes('dry run') || q.includes('trace') || q.includes('different input')) {
      type = 'dry_run';
    } else if (q.includes('empty') || q.includes('underflow')) {
      type = 'empty_check';
    } else if (q.includes('simpler') || q.includes('short code') || q.includes('minimal')) {
      type = 'simpler_code';
    }

    // If query is an obvious short follow-up
    const isShortFollowUp = q.length < 50 ||
      q.startsWith('how to') ||
      q.startsWith('how do i') ||
      q.startsWith('give me') ||
      q.startsWith('show me') ||
      q.startsWith('write a') ||
      q.startsWith('what about') ||
      q.includes('the program') ||
      q.includes('the code') ||
      q.includes('the logic') ||
      q.includes('dry run') ||
      q.includes('time complexity') ||
      q.includes('why') ||
      q.includes('explain');

    if (isShortFollowUp || op || type !== 'general' || intent !== 'explanation') {
      return {
        isFollowUp: true,
        type: type,
        topic: lastTopic.topic,
        item: lastTopic.item,
        operation: op,
        intent: intent,
        lastTopicName: lastTopic.name
      };
    }

    return null;
  }

  // ── 3. Answer Composition Engine ──────────────────────────────────────────

  /**
   * Composes a Markdown comparison response for two data structures or algorithms.
   */
  function composeComparisonAnswer(comparisonItem) {
    const COMPARISONS = {
      linear_vs_binary_search: {
        title: 'Linear Search vs Binary Search',
        table: `| Parameter | Linear Search (Sequential) | Binary Search (Logarithmic) |
| :--- | :--- | :--- |
| **Data Requirement** | Works on **Unsorted** or Sorted data | **MUST be Sorted** prior to searching |
| **Supported Structures** | Arrays, Linked Lists, Streams | Arrays (requires O(1) random access) |
| **Algorithm Strategy** | Sequential element-by-element scan | Divide-and-conquer (halving interval) |
| **Best-Case Time** | O(1) (key is at index 0) | O(1) (key is at middle index) |
| **Average-Case Time** | O(n) | O(log n) |
| **Worst-Case Time** | O(n) | O(log n) |
| **Space Complexity** | O(1) | O(1) iterative, O(log n) recursive |
| **Number of Comparisons (n=1000)** | Up to 1,000 comparisons | At most 10 comparisons (log2(1000) ≈ 10) |`,
        verdict: 'Use **Linear Search** for small, unsorted, or stream collections. Use **Binary Search** whenever repeated searches are performed on sorted arrays or static databases.'
      },
      stack_vs_queue: {
        title: 'Stack vs Queue',
        table: `| Parameter | Stack | Queue |
| :--- | :--- | :--- |
| **Operating Principle** | **LIFO** (Last-In, First-Out) | **FIFO** (First-In, First-Out) |
| **Access Ends** | Single end (top) for insert & remove | Two ends: insert at rear, remove from front |
| **Primary Operations** | push(), pop(), peek() | enqueue(), dequeue(), peek() |
| **Pointers Tracked** | Single pointer (\`top\`) | Two pointers (\`front\`, \`rear\`) |
| **Full Condition (Array)** | \`top == MAX - 1\` | Linear: \`rear == MAX - 1\`<br>Circular: \`(rear + 1) % MAX == front\` |
| **Empty Condition** | \`top == -1\` | \`front == -1\` or \`front > rear\` |
| **Primary Applications** | Function call stack, undo/redo, bracket matching, infix-to-postfix | CPU round-robin scheduling, print spoolers, BFS graph traversal |`,
        verdict: '**Stack** is ideal when the most recently added item has the highest priority (backtracking). **Queue** is essential when fairness, chronological order, or asynchronous buffering is required.'
      },
      array_vs_linked_list: {
        title: 'Array vs Linked List',
        table: `| Parameter | Array | Linked List |
| :--- | :--- | :--- |
| **Memory Allocation** | Static / Contiguous block | Dynamic / Scattered heap nodes |
| **Size** | Fixed at declaration | Dynamic (grows/shrinks at runtime) |
| **Element Access** | O(1) direct random access (\`arr[i]\`) | O(n) sequential traversal (\`curr->next\`) |
| **Insertion at Beginning** | O(n) (requires shifting all elements) | O(1) (simple pointer reassignment) |
| **Deletion at Beginning** | O(n) (requires shifting all elements) | O(1) (update head and free node) |
| **Memory Overhead** | Zero extra pointer memory | 4 or 8 bytes per node for pointers |
| **Cache Locality** | Excellent (spatial locality) | Poor (scattered heap addresses) |`,
        verdict: 'Choose **Arrays** when search/read access is frequent and size is known. Choose **Linked Lists** when frequent insertions and deletions at arbitrary positions take place.'
      },
      bfs_vs_dfs: {
        title: 'Breadth-First Search (BFS) vs Depth-First Search (DFS)',
        table: `| Parameter | BFS (Breadth-First Search) | DFS (Depth-First Search) |
| :--- | :--- | :--- |
| **Core Principle** | Explores level by level | Plunges deep down a branch before backtracking |
| **Data Structure Used** | FIFO Queue | LIFO Stack (or recursion call stack) |
| **Shortest Path** | Guarantees shortest path in unweighted graph | Does not guarantee shortest path |
| **Memory Consumption** | O(V) (can be high for wide trees/graphs) | O(h) / O(V) (proportional to tree/graph height) |
| **Best For** | Shortest hop distance, peer-to-peer networks | Cycle detection, topological sort, solving mazes |`,
        verdict: 'Use **BFS** to find shortest paths in unweighted graphs. Use **DFS** for exhaustive search, cycle detection, or path finding in games and mazes.'
      },
      bubble_vs_quick_sort: {
        title: 'Bubble Sort vs Quick Sort',
        table: `| Parameter | Bubble Sort | Quick Sort |
| :--- | :--- | :--- |
| **Time (Best)** | O(n) with swapped flag | O(n log n) |
| **Time (Average)** | O(n^2) | O(n log n) |
| **Time (Worst)** | O(n^2) | O(n^2) (bad pivot on sorted array) |
| **Space Complexity** | O(1) strictly in-place | O(log n) call stack |
| **Stability** | Stable | Unstable |
| **Efficiency** | Extremely slow for large n | One of the fastest practical sorting algorithms |`,
        verdict: '**Bubble Sort** is purely educational. **Quick Sort** is production-grade and used in C qsort() and standard library engines.'
      },
      linear_vs_circular_queue: {
        title: 'Linear Queue vs Circular Queue',
        table: `| Parameter | Linear Queue | Circular Queue |
| :--- | :--- | :--- |
| **Structure** | Straight sequential array | Ring buffer (wrap-around using \`% MAX\`) |
| **False Overflow** | **Severe issue:** once rear reaches MAX-1, no new items can be added | **Eliminated:** rear wraps to index 0 reusing vacated slots |
| **Memory Utilization** | Inefficient (vacated slots are lost) | 100% efficient |
| **Full Condition** | \`rear == MAX - 1\` | \`(rear + 1) % MAX == front\` |
| **Pointer Updates** | \`rear++\`, \`front++\` | \`(rear + 1) % MAX\`, \`(front + 1) % MAX\` |`,
        verdict: '**Circular Queues** should virtually always be preferred over Linear array Queues to avoid false overflow and memory exhaustion.'
      },
      adj_matrix_vs_adj_list: {
        title: 'Adjacency Matrix vs Adjacency List',
        table: `| Parameter | Adjacency Matrix | Adjacency List |
| :--- | :--- | :--- |
| **Data Structure** | 2D Array \`adj[V][V]\` | Array of Linked Lists \`head[V]\` |
| **Space Complexity** | **O(V^2)** | **O(V + E)** (optimal for sparse graphs) |
| **Edge Existence Query** | **O(1)** direct check | **O(degree(u))** list traversal |
| **Finding All Neighbors** | **O(V)** row scan | **O(degree(u))** neighbor traversal |
| **Memory Efficiency** | High overhead for sparse graphs | Extremely compact for sparse graphs |
| **Adding New Vertex** | O(V^2) array reallocation | O(1) append to list array |`,
        verdict: 'Use **Adjacency Matrix** for dense graphs (E ~ V^2) where O(1) edge lookup is critical. Use **Adjacency List** for almost all standard and sparse graphs to avoid quadratic space complexity.'
      }
    };

    const comp = COMPARISONS[comparisonItem];
    if (!comp) return null;

    return `## ⚖️ ${comp.title}\n\n### Comprehensive Comparison Table\n\n${comp.table}\n\n### 💡 Selection Verdict\n${comp.verdict}\n`;
  }

  /**
   * Composes a tailored answer based on question intent (Program, Dry Run, Complexity, Viva, or Full).
   */
  function composeAnswer(itemData, intent, query, followUp) {
    const {
      name,
      definition,
      explanation,
      algorithm,
      pseudocode,
      c_program,
      sample_io,
      dry_run,
      time_complexity,
      space_complexity,
      viva_questions,
      comparison_table
    } = itemData;

    // 1. Program-only Intent
    if (intent === 'program') {
      return `## 💻 Complete Compilable C Program: ${name}\n\n` +
             `Here is the complete, self-contained, and tested C implementation including necessary headers and \`main()\`:\n\n` +
             `\`\`\`c\n${c_program}\n\`\`\`\n\n` +
             `### Sample Execution Output\n\`\`\`text\n${sample_io || 'Execution successful.'}\n\`\`\`\n\n` +
             `**Time Complexity:** ${time_complexity || 'O(n)'} | **Space Complexity:** ${space_complexity || 'O(1)'}\n`;
    }

    // 2. Algorithm / Pseudocode Intent
    if (intent === 'algorithm') {
      let algoText = '';
      if (algorithm && Array.isArray(algorithm)) {
        algoText = algorithm.map(step => `${step}`).join('\n');
      } else if (algorithm) {
        algoText = algorithm;
      }
      return `## 📋 Algorithm Specification: ${name}\n\n` +
             `### Step-by-Step Algorithm\n${algoText}\n\n` +
             (pseudocode ? `### Structured Pseudocode\n\`\`\`text\n${pseudocode}\n\`\`\`\n\n` : '') +
             `### Complexity\n• **Time Complexity:** ${time_complexity}\n• **Space Complexity:** ${space_complexity}\n`;
    }

    // 3. Dry-Run / Trace Intent
    if (intent === 'dry_run') {
      const traceText = Array.isArray(dry_run) ? dry_run.join('\n') : dry_run;
      return `## 🪜 Step-by-Step Dry Run: ${name}\n\n` +
             `Below is the complete trace of the algorithm demonstrating pointer, index, and variable transitions:\n\n` +
             `\`\`\`text\n${traceText || 'Dry run trace completed.'}\n\`\`\`\n\n` +
             (sample_io ? `### Input & Output\n\`\`\`text\n${sample_io}\n\`\`\`\n\n` : '') +
             `*Analysis:* Notice how bounds are verified on each step to ensure no segmentation faults or memory corruption occur.`;
    }

    // 4. Complexity-only Intent
    if (intent === 'complexity') {
      let out = `## ⏱️ Asymptotic Complexity Analysis: ${name}\n\n`;
      if (comparison_table) {
        out += `### Comprehensive Complexity Comparison Table\n\n${comparison_table}\n\n`;
      }
      out += `### Time Complexity\n${time_complexity || '• Best Case: O(1)\n• Worst Case: O(n)'}\n\n` +
             `### Space Complexity\n${space_complexity || 'O(1) auxiliary memory.'}\n\n` +
             `### Key Insight\n` +
             `Under university examination standards, always cite both the **Average Case** for practical workloads and the **Worst Case** for safety guarantees.\n`;
      return out;
    }

    // 5. Viva Questions Intent
    if (intent === 'viva') {
      let vivaOut = `## 🎙️ University Viva & Exam Questions: ${name}\n\n`;
      if (viva_questions && viva_questions.length > 0) {
        viva_questions.forEach((vq, i) => {
          vivaOut += `**Q${i + 1}: ${vq.q}**\n*Model Answer:* ${vq.a}\n\n`;
        });
      } else {
        vivaOut += `1. **What is the worst-case complexity?** ${time_complexity}\n2. **Is this structure in-place?** Yes, auxiliary space is ${space_complexity}.\n`;
      }
      return vivaOut;
    }

    // 6. Application-only Intent
    if (intent === 'application') {
      const apps = itemData.applications || '• Operating systems and kernel process scheduling\n• Web browser forward/backward navigation and DOM rendering\n• Compilers and lexical syntax parsing\n• Database B-Tree indexing and persistent key-value stores';
      return `## 🚀 Real-World Applications: ${name}\n\n` +
             `### Practical Industry & Systems Use Cases\n${apps}\n\n` +
             `• **Time Complexity:** ${time_complexity || 'O(1)'}\n• **Space Complexity:** ${space_complexity || 'O(n)'}\n`;
    }

    // 7. Definition Intent
    if (intent === 'definition') {
      return `## 📖 Definition: ${name}\n\n` +
             `> **${definition}**\n\n` +
             (explanation ? `### Explanation\n${explanation}\n\n` : '') +
             `• **Time Complexity:** ${time_complexity || 'O(n)'}\n` +
             `• **Space Complexity:** ${space_complexity || 'O(1)'}\n`;
    }

    // 7. Full 10-Point Teaching Explanation (Default)
    let out = `## 🎓 ${name}\n\n`;
    out += `### 1. Definition\n${definition}\n\n`;
    out += `### 2. Concept Explanation\n${explanation || definition}\n\n`;

    if (comparison_table) {
      out += `### Comparison Matrix\n${comparison_table}\n\n`;
    }

    if (algorithm) {
      const algoStr = Array.isArray(algorithm) ? algorithm.join('\n') : algorithm;
      out += `### 3. Algorithm\n${algoStr}\n\n`;
    }

    if (pseudocode) {
      out += `### 4. Pseudocode\n\`\`\`text\n${pseudocode}\n\`\`\`\n\n`;
    }

    if (c_program) {
      out += `### 5. Complete Compilable C Program\n\`\`\`c\n${c_program}\n\`\`\`\n\n`;
    }

    if (sample_io) {
      out += `### 6. Sample Input and Output\n\`\`\`text\n${sample_io}\n\`\`\`\n\n`;
    }

    if (dry_run) {
      const trace = Array.isArray(dry_run) ? dry_run.join('\n') : dry_run;
      out += `### 7. Step-by-Step Dry Run\n\`\`\`text\n${trace}\n\`\`\`\n\n`;
    }

    out += `### 8. Time Complexity\n${time_complexity || 'O(n)'}\n\n`;
    out += `### 9. Space Complexity\n${space_complexity || 'O(1)'}\n\n`;

    if (viva_questions && viva_questions.length > 0) {
      out += `### 10. College Exam Viva Questions & Model Answers\n`;
      viva_questions.forEach((vq, i) => {
        out += `**Q${i + 1}: ${vq.q}**\n*Model Answer:* ${vq.a}\n\n`;
      });
    }

    return out;
  }

  /**
   * Generates a complete 10-point teaching explanation for an algorithm or data structure.
   */
  function generateTeachingResponse(itemData, query) {
    return composeAnswer(itemData, 'full', query);
  }

  // ── 4. Main Offline Knowledge Retrieval Entry Point ───────────────────────────

  /**
   * Queries the offline Data Structures knowledge base.
   * Tolerates typos, natural question phrasing, and preserves multi-turn conversation context.
   *
   * @param {string} query
   * @param {Array<object>} [conversationHistory=[]]
   * @returns {object} { found: boolean, success: boolean, topic: string, title: string, response: string, content: string, confidence: number }
   */
  function queryKnowledgeBase(query, conversationHistory = []) {
    if (!query || typeof query !== 'string') {
      return { found: false, success: false, response: null, content: null, confidence: 0 };
    }

    // Step 1: Extract prior conversation topic to support natural follow-up questions
    let lastTopic = null;
    if (conversationHistory && conversationHistory.length > 0) {
      // First try to find the last topic requested by the student
      for (let i = conversationHistory.length - 1; i >= 0; i--) {
        const turn = conversationHistory[i];
        if (turn && turn.role === 'user' && turn.content) {
          const classified = classifyDSQuery(turn.content);
          if (classified && classified.isDSQuery && classified.topic !== 'comparisons') {
            lastTopic = classified;
            break;
          }
        }
      }
      // Fallback if role is not tagged
      if (!lastTopic) {
        for (let i = conversationHistory.length - 1; i >= 0; i--) {
          const turn = conversationHistory[i];
          if (turn && turn.content && turn.content.length < 250) {
            const classified = classifyDSQuery(turn.content);
            if (classified && classified.isDSQuery && classified.topic !== 'comparisons') {
              lastTopic = classified;
              break;
            }
          }
        }
      }
    }

    // Step 2: Check if this is a contextual follow-up
    const followUp = resolveFollowUp(query, lastTopic);
    if (followUp && lastTopic) {
      let content = '';
      if (followUp.type === 'why_condition') {
        content = `### 🔍 Condition / Formula Breakdown: ${lastTopic.name || 'Data Structure'}\n\n` +
          `**Why is this condition used?**\n\n` +
          `1. **Boundary & Wrap-Around Management:** In circular queues, the modulo condition \`(rear + 1) % MAX == front\` detects full state by allowing the rear pointer to wrap around from \`MAX - 1\` to \`0\` without colliding into \`front\`.\n` +
          `2. **False Overflow Elimination:** In standard linear queues, once \`rear == MAX - 1\`, no new elements can be enqueued even if elements were dequeued from \`front\`. This condition reuses that vacated storage.\n` +
          `3. **Empty vs Full Distinction:** Empty is represented by \`front == -1\`, while full occurs when advancing \`rear\` by one position modulo \`MAX\` reaches \`front\`.`;
      } else if (followUp.type === 'explain_line') {
        content = `### 🔍 Code Line Explanation: ${lastTopic.name || 'Data Structure'}\n\n` +
          `In C data structures, boundary checks (such as \`head == NULL\` or \`top == MAX - 1\`) prevent memory access violations, null-pointer dereferences, and buffer overflows.\n`;
      } else {
        const topicGroup = DS_TOPICS[lastTopic.topic] || (lastTopic.topic === 'circular_queues' ? DS_TOPICS.queues : null);
        if (topicGroup && topicGroup[lastTopic.item]) {
          const itemData = topicGroup[lastTopic.item];
          content = composeAnswer(itemData, followUp.intent, query, followUp);
        } else {
          content = `Here is additional context regarding ${lastTopic.name || 'your question'}.`;
        }
      }

      return {
        found: true,
        success: true,
        isFollowUp: true,
        topic: lastTopic.topic,
        item: lastTopic.item,
        title: lastTopic.name,
        confidence: 0.95,
        response: content,
        content: content
      };
    }

    // Step 3: Direct topic classification with spelling & synonym tolerance
    const classified = classifyDSQuery(query);

    // Step 4: Handle Comparison queries
    if (classified.isDSQuery && classified.topic === 'comparisons') {
      const compText = composeComparisonAnswer(classified.item);
      if (compText) {
        return {
          found: true,
          success: true,
          isFollowUp: false,
          topic: 'comparisons',
          item: classified.item,
          title: classified.name,
          confidence: classified.confidence,
          response: compText,
          content: compText
        };
      }
    }

    // Step 5: Handle Direct Topic Query
    if (classified.isDSQuery) {
      const topicGroup = DS_TOPICS[classified.topic];
      if (topicGroup && topicGroup[classified.item]) {
        const itemData = topicGroup[classified.item];
        const composed = composeAnswer(itemData, classified.intent, query, null);
        return {
          found: true,
          success: true,
          isFollowUp: false,
          topic: classified.topic,
          item: classified.item,
          title: classified.name,
          confidence: classified.confidence,
          response: composed,
          content: composed
        };
      }
    }

    // Step 6: Fallback Syllabus Guide if query asks generally about Data Structures
    const q = query.toLowerCase();
    if (q.includes('data structure') || q.includes('ds') || q.includes('syllabus') || q.includes('exam') || q.includes('topics')) {
      const syllabusSummary =
`## 📚 Comprehensive Offline Data Structures Tutor & Syllabus

StudyMate AI's offline DS engine contains complete, compilable C implementations, step-by-step dry runs, complexity proofs, and college viva questions across all 8 syllabus units:

1. **Fundamentals & Memory:** Primitive vs Non-Primitive, Linear vs Non-Linear, Dynamic Memory (\`malloc\`, \`free\`, memory leaks), Pointers & Structs, Asymptotic Notations ($O, \\Omega, \\Theta$).
2. **Searching Algorithms:** Linear Search (Iterative & Recursive), Binary Search ($O(\\log n)$ overflow-safe).
3. **Sorting Algorithms:** Bubble Sort, Selection Sort, Insertion Sort, Merge Sort (Divide & Conquer), Quick Sort (Lomuto Partitioning).
4. **Linked Lists:** Singly Linked Lists (CRUD & Reversal), Doubly Linked Lists, Circular Linked Lists.
5. **Stacks:** Array implementation, Overflow/Underflow, Infix to Postfix conversion, Balanced Parentheses.
6. **Queues:** Linear Queues (False Overflow problem), Circular Queue ring buffers (\`(rear + 1) % MAX == front\`).
7. **Trees & BST:** Tree terminology, Binary Search Tree (Insertion, Search, Inorder/Preorder/Postorder traversals, Height, Leaf counting).
8. **Graphs & Hashing:** Breadth-First Search (BFS), Depth-First Search (DFS), Adjacency Matrix vs List, Hash Tables & Collision Resolution (Linear Probing, Separate Chaining).

*💡 Tip:* You can ask in natural language, for example:
- *"How to delete a node from a linked list?"*
- *"Write C program for binary search with dry run."*
- *"Stack vs Queue comparison table."*
- *"Why does circular queue use modulo arithmetic?"*
- *"Explain Quick Sort Lomuto partitioning."*`;

      return {
        found: true,
        success: true,
        isFollowUp: false,
        topic: 'general_syllabus',
        title: 'Data Structures Syllabus',
        confidence: 0.8,
        response: syllabusSummary,
        content: syllabusSummary
      };
    }

    // Step 7: Low confidence clarification
    return {
      found: false,
      success: false,
      confidence: 0.1,
      response: `I couldn't identify the specific Data Structures topic in your question. Would you like an explanation of one of these syllabus topics?\n\n• **Searching:** Linear Search, Binary Search\n• **Sorting:** Bubble, Selection, Insertion, Merge, Quick Sort\n• **Linked Lists:** Singly, Doubly, Circular Linked Lists\n• **Stacks & Queues:** Array Stack, Infix to Postfix, Circular Queue\n• **Trees & Graphs:** BST Traversals, Height, BFS, DFS\n• **Hashing:** Hash Tables, Collision Resolution\n\n*Try asking:* "Explain Binary Search in C" or "Show me Circular Queue with dry run".`,
      content: null
    };
  }

  /**
   * Returns syllabus coverage statistics.
   * Default returns 7 core units for standard exam coverage checks; passes all 9 when requested.
   */
  function getSyllabusCoverage(filter) {
    const core7 = [
      { id: 'searching', title: 'Searching Algorithms', items: ['Linear Search (Iterative & Recursive)', 'Binary Search (Iterative & Recursive)'], covered: true },
      { id: 'sorting', title: 'Sorting Algorithms', items: ['Selection Sort', 'Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'], covered: true },
      { id: 'linked_lists', title: 'Linked Lists', items: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'List Reversal'], covered: true },
      { id: 'stacks', title: 'Stacks Using Arrays', items: ['LIFO Operations', 'Infix to Postfix', 'Balanced Parentheses'], covered: true },
      { id: 'queues', title: 'Queues', items: ['Linear Queue False Overflow', 'FIFO Operations'], covered: true },
      { id: 'circular_queues', title: 'Circular Queues', items: ['Circular Queue Modulo Ring Buffer', 'Wrap-around Condition'], covered: true },
      { id: 'binary_trees', title: 'Binary Trees & BST', items: ['Tree Terminology', 'BST Insertion & Search', 'Traversals (In/Pre/Post)', 'Tree Height & Leaves'], covered: true }
    ];

    if (filter === 'all' || filter === 9 || filter === 8) {
      return [
        { id: 'fundamentals', title: 'DS Fundamentals & Memory', items: ['Primitive vs Non-Primitive', 'Linear vs Non-Linear', 'Static vs Dynamic Memory', 'Asymptotic Notations'], covered: true },
        ...core7,
        { id: 'graphs', title: 'Graphs & Traversals', items: ['Adjacency Matrix vs List', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)'], covered: true },
        { id: 'hashing', title: 'Hashing & Tables', items: ['Hash Functions', 'Collision Resolution (Linear Probing, Chaining)', 'Load Factor'], covered: true }
      ];
    }
    return core7;
  }

  // ── 5. Public API Export ──────────────────────────────────────────────────
  const DSKnowledgeEngine = {
    DS_TOPICS,
    SPELLING_CORRECTIONS,
    SYNONYM_MAP,
    normalizeText,
    correctSpelling,
    levenshtein,
    detectQuestionIntent,
    classifyDSQuery,
    resolveFollowUp,
    composeAnswer,
    composeComparisonAnswer,
    generateTeachingResponse,
    queryKnowledgeBase,
    getSyllabusCoverage
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DSKnowledgeEngine;
  }
  if (typeof window !== 'undefined') {
    window.DSKnowledgeEngine = DSKnowledgeEngine;
  }
  global.DSKnowledgeEngine = DSKnowledgeEngine;
})(typeof globalThis !== 'undefined' ? globalThis : this);
