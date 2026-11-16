/**
 * DS Complete Answers — 100% Offline Complete Knowledge Base
 * Bundled automatically for StudyMate AI. Contains all 108 Operations across 7 Units.
 * Auto-generated on: 2026-11-16T02:10:25.599Z
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.DS_COMPLETE_DATA = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CATEGORIES = [
  {
    "id": "searching",
    "name": "Searching Techniques",
    "icon": "search",
    "count": 2,
    "subcategories": [
      {
        "id": "linear_search",
        "name": "Linear Search",
        "topics": [
          "linear_search"
        ]
      },
      {
        "id": "binary_search",
        "name": "Binary Search",
        "topics": [
          "binary_search"
        ]
      }
    ]
  },
  {
    "id": "sorting",
    "name": "Sorting Algorithms",
    "icon": "arrow-down-up",
    "count": 5,
    "subcategories": [
      {
        "id": "comparison_sorts",
        "name": "Standard Sorts",
        "topics": [
          "bubble_sort",
          "selection_sort",
          "insertion_sort",
          "merge_sort",
          "quick_sort"
        ]
      }
    ]
  },
  {
    "id": "linked_lists",
    "name": "Linked Lists",
    "icon": "link-2",
    "count": 28,
    "subcategories": [
      {
        "id": "singly_linked_list",
        "name": "Singly Linked List (12 Ops)",
        "topics": [
          "sll_create",
          "sll_insert_beginning",
          "sll_insert_end",
          "sll_insert_pos",
          "sll_delete_beginning",
          "sll_delete_end",
          "sll_delete_val",
          "sll_delete_pos",
          "sll_display",
          "sll_search",
          "sll_count",
          "sll_reverse"
        ]
      },
      {
        "id": "doubly_linked_list",
        "name": "Doubly Linked List (10 Ops)",
        "topics": [
          "dll_create",
          "dll_insert_beginning",
          "dll_insert_end",
          "dll_insert_pos",
          "dll_delete_beginning",
          "dll_delete_end",
          "dll_delete_node",
          "dll_traverse_forward",
          "dll_traverse_backward",
          "dll_search"
        ]
      },
      {
        "id": "circular_linked_list",
        "name": "Circular Linked List (6 Ops)",
        "topics": [
          "cll_create",
          "cll_insert_beginning",
          "cll_insert_end",
          "cll_delete_node",
          "cll_display",
          "cll_search"
        ]
      }
    ]
  },
  {
    "id": "stacks",
    "name": "Stacks",
    "icon": "layers",
    "count": 19,
    "subcategories": [
      {
        "id": "stack_array",
        "name": "Array-Based Stack (8 Ops)",
        "topics": [
          "stack_array_create",
          "stack_array_push",
          "stack_array_pop",
          "stack_array_peek",
          "stack_array_display",
          "stack_array_isempty",
          "stack_array_isfull",
          "stack_array_overflow_underflow"
        ]
      },
      {
        "id": "stack_linked_list",
        "name": "Linked List Stack (7 Ops)",
        "topics": [
          "stack_ll_create",
          "stack_ll_push",
          "stack_ll_pop",
          "stack_ll_peek",
          "stack_ll_display",
          "stack_ll_isempty",
          "stack_ll_overflow_underflow"
        ]
      },
      {
        "id": "stack_applications",
        "name": "Stack Applications (4 Ops)",
        "topics": [
          "stack_lifo_principle",
          "stack_infix_to_postfix",
          "stack_postfix_evaluation",
          "stack_parentheses_matching"
        ]
      }
    ]
  },
  {
    "id": "queues",
    "name": "Queues",
    "icon": "list-ordered",
    "count": 21,
    "subcategories": [
      {
        "id": "queue_array",
        "name": "Linear Queue (Array) (7 Ops)",
        "topics": [
          "queue_array_create",
          "queue_array_enqueue",
          "queue_array_dequeue",
          "queue_array_peek",
          "queue_array_display",
          "queue_array_isempty",
          "queue_array_isfull"
        ]
      },
      {
        "id": "circular_queue",
        "name": "Circular Queue (6 Ops)",
        "topics": [
          "cqueue_create",
          "cqueue_enqueue",
          "cqueue_dequeue",
          "cqueue_display",
          "cqueue_front_rear",
          "cqueue_full_empty"
        ]
      },
      {
        "id": "queue_linked_list",
        "name": "Linked List Queue (6 Ops)",
        "topics": [
          "queue_ll_create",
          "queue_ll_enqueue",
          "queue_ll_dequeue",
          "queue_ll_peek",
          "queue_ll_display",
          "queue_ll_empty"
        ]
      },
      {
        "id": "queue_special",
        "name": "Specialized Queues (2 Ops)",
        "topics": [
          "queue_deque",
          "queue_priority"
        ]
      }
    ]
  },
  {
    "id": "trees",
    "name": "Trees",
    "icon": "git-branch",
    "count": 22,
    "subcategories": [
      {
        "id": "binary_tree",
        "name": "Binary Tree (10 Ops)",
        "topics": [
          "tree_bt_create",
          "tree_bt_linked_rep",
          "tree_bt_preorder",
          "tree_bt_inorder",
          "tree_bt_postorder",
          "tree_bt_level_order",
          "tree_bt_count_nodes",
          "tree_bt_count_leaves",
          "tree_bt_height",
          "tree_bt_search"
        ]
      },
      {
        "id": "binary_search_tree",
        "name": "Binary Search Tree (BST) (12 Ops)",
        "topics": [
          "tree_bst_create",
          "tree_bst_insert",
          "tree_bst_search",
          "tree_bst_delete_leaf",
          "tree_bst_delete_one_child",
          "tree_bst_delete_two_children",
          "tree_bst_find_min",
          "tree_bst_find_max",
          "tree_bst_inorder",
          "tree_bst_preorder",
          "tree_bst_postorder",
          "tree_bst_level_order"
        ]
      }
    ]
  },
  {
    "id": "graphs",
    "name": "Graphs",
    "icon": "network",
    "count": 11,
    "subcategories": [
      {
        "id": "graph_representation",
        "name": "Representations (3 Ops)",
        "topics": [
          "graph_representation",
          "graph_adj_matrix",
          "graph_adj_list"
        ]
      },
      {
        "id": "graph_traversal",
        "name": "Traversals (5 Ops)",
        "topics": [
          "graph_bfs",
          "graph_dfs",
          "graph_bfs_queue",
          "graph_dfs_recursion",
          "graph_dfs_stack"
        ]
      },
      {
        "id": "graph_types",
        "name": "Graph Variations (3 Ops)",
        "topics": [
          "graph_directed",
          "graph_undirected",
          "graph_weighted"
        ]
      }
    ]
  }
];
  var TOPICS = {
  "linear_search": {
    "id": "linear_search",
    "title": "Linear Search (Sequential Search)",
    "category": "searching",
    "categoryName": "Searching Techniques",
    "subcategory": "linear_search",
    "subcategoryName": "Linear Search",
    "keywords": [
      "linear search",
      "sequential search",
      "search array",
      "find element sequentially",
      "linear find"
    ],
    "definition": "Linear Search (also known as Sequential Search) is the simplest search algorithm that traverses an array or list sequentially from the first element to the last, comparing each element with the target key until a match is found or the end of the collection is reached.",
    "concept_explanation": "Linear search operates on the principle of exhaustive sequential verification. It requires no preconditions—the collection can be ordered or completely disordered. Starting at index 0, the algorithm inspects each contiguous memory location. If the target value equals the current item, the search terminates immediately and reports the index. If the index reaches the array boundary n without encountering the key, the algorithm concludes that the key is absent.",
    "algorithm": "Step 1: Start from the leftmost element of array arr[] at index i = 0.\nStep 2: Compare target key with arr[i].\nStep 3: If arr[i] == key, return the index i (Successful Search).\nStep 4: If arr[i] != key, increment i by 1 (i = i + 1).\nStep 5: Repeat Steps 2 to 4 until i < n (where n is the number of elements).\nStep 6: If i reaches n and no match was found, return -1 (Key Not Found).",
    "pseudocode": "function linearSearch(arr, n, key):\n    for i from 0 to n - 1 do:\n        if arr[i] == key then:\n            return i    // Element found at index i\n    return -1           // Element not present in array",
    "c_program": "#include <stdio.h>\n\n/**\n * Performs linear search on an array of integers.\n * @param arr Array to search\n * @param n Number of elements in array\n * @param key Target value to find\n * @return Index of key if found, or -1 if not found\n */\nint linearSearch(int arr[], int n, int key) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == key) {\n            return i; // Target located at index i\n        }\n    }\n    return -1; // Target not present in collection\n}\n\nint main(void) {\n    int arr[] = {12, 45, 67, 23, 89, 34};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int key1 = 67;\n    int key2 = 99;\n\n    printf(\"=== Linear Search Demonstration ===\\n\");\n    printf(\"Array elements: \");\n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\\n\");\n\n    // Case 1: Existing element\n    int result1 = linearSearch(arr, n, key1);\n    if (result1 != -1) {\n        printf(\"Search for %d: Found at index %d (position %d)\\n\", key1, result1, result1 + 1);\n    } else {\n        printf(\"Search for %d: Not found in array\\n\", key1);\n    }\n\n    // Case 2: Non-existent element\n    int result2 = linearSearch(arr, n, key2);\n    if (result2 != -1) {\n        printf(\"Search for %d: Found at index %d\\n\", key2, result2);\n    } else {\n        printf(\"Search for %d: Not found in array (-1)\\n\", key2);\n    }\n\n    return 0;\n}",
    "sample_input": "Array: [12, 45, 67, 23, 89, 34], Search Targets: 67 and 99",
    "sample_output": "=== Linear Search Demonstration ===\nArray elements: 12 45 67 23 89 34 \n\nSearch for 67: Found at index 2 (position 3)\nSearch for 99: Not found in array (-1)",
    "dry_run": "Target Key = 67 on Array arr[] = [12, 45, 67, 23, 89, 34] (n = 6):\n\n| Step | Index (i) | arr[i] | Comparison (arr[i] == 67) | Action / Result |\n| :--- | :--- | :--- | :--- | :--- |\n| 1 | 0 | 12 | 12 == 67 -> False | Continue to next index (i = 1) |\n| 2 | 1 | 45 | 45 == 67 -> False | Continue to next index (i = 2) |\n| 3 | 2 | 67 | 67 == 67 -> True | Match found! Terminate and return index 2 |\n\nTotal Comparisons = 3. Search status: Successful.",
    "time_complexity": "• Best Case: O(1) — The target key is located at the first position (index 0). Only 1 comparison is performed.\n• Average Case: O(n) — On average, the target element is found around index n/2, requiring (n + 1)/2 comparisons.\n• Worst Case: O(n) — The target key is at the last position (index n - 1) or does not exist at all, requiring all n comparisons.",
    "space_complexity": "• Auxiliary Space: O(1) — Operates directly on the input array in-place using only loop counter variables. Zero auxiliary allocations.",
    "advantages_disadvantages": "Advantages:\n• Universally applicable: Works seamlessly on both sorted and unsorted collections.\n• Data structure independence: Can be applied to contiguous arrays as well as node-linked lists.\n• Simplicity: Minimal instruction footprint, zero setup overhead, ideal for tiny datasets (n < 20).\n• Online algorithm: Can process a stream of incoming items one by one.\n\nDisadvantages:\n• Inefficient for large datasets: Scaling time is linear O(n). For 1,000,000 items, worst-case requires 1,000,000 comparisons.\n• Outperformed by Binary Search (O(log n)) and Hash Tables (O(1)) when data can be preprocessed.",
    "applications": "• Searching small unordered local cache buffers and lookup tables.\n• Finding an item in singly or doubly linked lists where direct index jumping is impossible.\n• Debugging and verifying correctness of complex indexing structures.\n• Searching transient real-time sensor streams before storing to disk.",
    "viva_questions": [
      {
        "q": "What is the average number of comparisons in a successful linear search on n elements?",
        "a": "The average number of comparisons is (n + 1) / 2, which asymptotically evaluates to O(n)."
      },
      {
        "q": "Can linear search be applied to a linked list?",
        "a": "Yes. Linear search is the native search method for linked lists because nodes can only be accessed sequentially via next pointers."
      },
      {
        "q": "How does sentinel linear search improve standard linear search?",
        "a": "By placing the target key at the end of the array (as a sentinel), the boundary check (i < n) inside the loop is eliminated, reducing loop instruction overhead."
      }
    ],
    "edge_cases": "• Empty array (n = 0): Loop terminates immediately and returns -1 without segmentation fault.\n• Single-element array (n = 1): Checks arr[0] and correctly handles both hit and miss.\n• Target at last index (i = n - 1): Full loop executes without out-of-bounds error.\n• Duplicate keys: Returns the first occurrence encountered from the left.",
    "diagram": "Index:     0      1      2      3      4      5\nArray:  [ 12 ] [ 45 ] [ 67 ] [ 23 ] [ 89 ] [ 34 ]\n           |      |      |\nStep 1:   12!=67  |      |\nStep 2:         45!=67   |\nStep 3:                67==67  ==> FOUND at Index 2!"
  },
  "binary_search": {
    "id": "binary_search",
    "title": "Binary Search (Logarithmic Search)",
    "category": "searching",
    "categoryName": "Searching Techniques",
    "subcategory": "binary_search",
    "subcategoryName": "Binary Search",
    "keywords": [
      "binary search",
      "logarithmic search",
      "divide and conquer search",
      "bsearch",
      "sorted array search"
    ],
    "definition": "Binary Search is an optimal search algorithm based on the Divide-and-Conquer paradigm that repeatedly halves the search space of a sorted array by comparing the target key with the middle element.",
    "concept_explanation": "Binary search requires one mandatory precondition: the collection must be sorted in ascending (or descending) order. The algorithm maintains two pointers: low (beginning of search space) and high (end of search space). In each iteration, it computes mid = low + (high - low) / 2. If arr[mid] matches the key, the search succeeds. If the key is smaller than arr[mid], the target must reside in the left half, so high is updated to mid - 1. If larger, low is updated to mid + 1. The search terminates when the key is found or when low > high.",
    "algorithm": "Step 1: Ensure array arr[] is sorted in ascending order.\nStep 2: Initialize low = 0 and high = n - 1.\nStep 3: While low <= high, repeat Steps 4 to 7:\nStep 4:   Calculate mid = low + (high - low) / 2 (avoids integer overflow).\nStep 5:   If arr[mid] == key, return mid (Target Found).\nStep 6:   If key < arr[mid], set high = mid - 1 (Search Left Subarray).\nStep 7:   If key > arr[mid], set low = mid + 1 (Search Right Subarray).\nStep 8: If low exceeds high, return -1 (Target Not Present).",
    "pseudocode": "function binarySearch(arr, low, high, key):\n    while low <= high do:\n        mid = low + (high - low) / 2\n        if arr[mid] == key then:\n            return mid\n        else if key < arr[mid] then:\n            high = mid - 1\n        else:\n            low = mid + 1\n    return -1",
    "c_program": "#include <stdio.h>\n\n/**\n * Iterative implementation of Binary Search on a sorted array.\n * @param arr Sorted array of integers\n * @param n Size of the array\n * @param key Target value to search for\n * @return Zero-based index of key if found, or -1 if not found\n */\nint binarySearchIterative(int arr[], int n, int key) {\n    int low = 0;\n    int high = n - 1;\n\n    while (low <= high) {\n        // Safe midpoint calculation avoiding integer overflow (low + high)\n        int mid = low + (high - low) / 2;\n\n        if (arr[mid] == key) {\n            return mid; // Key located at index mid\n        }\n        else if (key < arr[mid]) {\n            high = mid - 1; // Discard right half; search left\n        }\n        else {\n            low = mid + 1;  // Discard left half; search right\n        }\n    }\n    return -1; // Key absent\n}\n\n/**\n * Recursive implementation of Binary Search.\n */\nint binarySearchRecursive(int arr[], int low, int high, int key) {\n    if (low > high) {\n        return -1; // Base case: search interval exhausted\n    }\n\n    int mid = low + (high - low) / 2;\n\n    if (arr[mid] == key) {\n        return mid;\n    }\n    if (key < arr[mid]) {\n        return binarySearchRecursive(arr, low, mid - 1, key);\n    }\n    return binarySearchRecursive(arr, mid + 1, high, key);\n}\n\nint main(void) {\n    int arr[] = {11, 22, 33, 44, 55, 66, 77, 88, 99};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int key1 = 55;\n    int key2 = 25;\n\n    printf(\"=== Binary Search Demonstration ===\\n\");\n    printf(\"Sorted array: \");\n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\\n\");\n\n    // Test Iterative Binary Search\n    int idx1 = binarySearchIterative(arr, n, key1);\n    printf(\"Iterative Search for %d: %s (Index %d)\\n\", \n           key1, (idx1 != -1) ? \"FOUND\" : \"NOT FOUND\", idx1);\n\n    int idx2 = binarySearchIterative(arr, n, key2);\n    printf(\"Iterative Search for %d: %s (Index %d)\\n\", \n           key2, (idx2 != -1) ? \"FOUND\" : \"NOT FOUND\", idx2);\n\n    // Test Recursive Binary Search\n    int recIdx1 = binarySearchRecursive(arr, 0, n - 1, key1);\n    printf(\"Recursive Search for %d: FOUND at index %d\\n\", key1, recIdx1);\n\n    return 0;\n}",
    "sample_input": "Sorted Array: [11, 22, 33, 44, 55, 66, 77, 88, 99], Keys: 55, 25",
    "sample_output": "=== Binary Search Demonstration ===\nSorted array: 11 22 33 44 55 66 77 88 99 \n\nIterative Search for 55: FOUND (Index 4)\nIterative Search for 25: NOT FOUND (Index -1)\nRecursive Search for 55: FOUND at index 4",
    "dry_run": "Target Key = 55 on Sorted Array [11, 22, 33, 44, 55, 66, 77, 88, 99] (n = 9):\n\n| Iteration | low | high | mid = low + (high - low)/2 | arr[mid] | Comparison | Action |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| 1 | 0 | 8 | 0 + (8 - 0)/2 = 4 | 55 | 55 == 55 -> Match! | Search succeeds immediately at index 4. |\n\nTarget Key = 25 (Key absent):\n| Iteration | low | high | mid | arr[mid] | Comparison | Action |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| 1 | 0 | 8 | 4 | 55 | 25 < 55 -> Left | high = mid - 1 = 3 |\n| 2 | 0 | 3 | 1 | 22 | 25 > 22 -> Right| low = mid + 1 = 2 |\n| 3 | 2 | 3 | 2 | 33 | 25 < 33 -> Left | high = mid - 1 = 1 |\n| 4 | 2 | 1 | — | — | low (2) > high (1)| Terminate. Return -1. |",
    "time_complexity": "• Best Case: O(1) — Target is located at the initial midpoint.\n• Average Case: O(log n) — Search space is halved on each iteration. For n = 1,000,000, maximum comparisons <= 20.\n• Worst Case: O(log n) — Target is at an extreme leaf or absent from the array.\n• Recurrence Relation: T(n) = T(n/2) + O(1) => Master Theorem Case 2 gives O(log2 n).",
    "space_complexity": "• Iterative Version: O(1) auxiliary space (operates with only low, high, mid scalar pointers).\n• Recursive Version: O(log n) auxiliary stack space due to function call recursion frames.",
    "advantages_disadvantages": "Advantages:\n• Exponentially faster than linear search for large datasets (20 steps for 1 million items vs 1,000,000 steps).\n• Deterministic logarithmic boundary guarantee.\n• Optimal comparison-based searching efficiency.\n\nDisadvantages:\n• Strict sorted precondition: Unsorted data must be sorted first (costing O(n log n)).\n• Contiguous access requirement: Inefficient for standard linked lists due to lack of O(1) random indexing.\n• Static data bias: Frequent insertions/deletions in arrays incur costly O(n) shifts.",
    "applications": "• Database B-Tree and LSM-tree indexing algorithms.\n• System libraries: C standard library bsearch() and C++ std::binary_search / std::lower_bound.\n• Finding monotonic boundary points in numerical optimization and git bisect bug localization.\n• IP routing prefix lookup tables.",
    "viva_questions": [
      {
        "q": "Why is mid = low + (high - low) / 2 preferred over mid = (low + high) / 2?",
        "a": "When low and high are large (e.g. close to INT_MAX 2^31 - 1), (low + high) overflows into a negative number in 32-bit signed integers, causing array index out-of-bounds exceptions."
      },
      {
        "q": "Why is binary search unsuitable for standard singly linked lists?",
        "a": "Because linked lists do not support O(1) random access to the middle element; traversing to mid requires O(n/2) time, increasing total search complexity back to O(n)."
      },
      {
        "q": "What is the maximum number of comparisons for binary search on an array of size 1024?",
        "a": "log2(1024) + 1 = 10 + 1 = 11 comparisons maximum."
      }
    ],
    "edge_cases": "• Target at extreme left index (0) or extreme right index (n - 1): Correct boundary decrement/increment.\n• Two-element array: mid calculates to low; handles both elements without infinite loop.\n• Large array indexes: Prevent integer overflow with low + (high - low) / 2.\n• Absent elements smaller than arr[0] or greater than arr[n - 1]: cleanly returns -1.",
    "diagram": "Initial:   [ 11 | 22 | 33 | 44 | 55 | 66 | 77 | 88 | 99 ]\n             ^                   ^                   ^\n            low=0              mid=4               high=8\n                           arr[mid]=55 (MATCH!)"
  },
  "bubble_sort": {
    "id": "bubble_sort",
    "title": "Bubble Sort (Comparison & Adjacent Exchange)",
    "category": "sorting",
    "categoryName": "Sorting Techniques",
    "subcategory": "bubble_sort",
    "subcategoryName": "Bubble Sort",
    "keywords": [
      "bubble sort",
      "sinking sort",
      "adjacent swap",
      "bubble sorting algorithm"
    ],
    "definition": "Bubble Sort is a straightforward comparison-based sorting algorithm that repeatedly steps through an array, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements bubble up to the end of the array with each pass.",
    "concept_explanation": "Bubble sort works by making multiple passes across the array. In pass i, adjacent pairs (arr[j] and arr[j+1]) are compared from j = 0 to n - i - 1. If the left element exceeds the right, they are exchanged. By the end of the first pass, the maximum element is guaranteed to reside at the final position (n - 1). Subsequent passes place the second-largest, third-largest, etc., at their correct resting positions. An optimized variant employs a swapped flag to detect when the array has become fully sorted early, yielding O(n) best-case runtime.",
    "algorithm": "Step 1: Given array arr of size n.\nStep 2: Loop for i from 0 to n - 2 (total n - 1 passes):\nStep 3:   Set swapped = 0.\nStep 4:   Loop for j from 0 to n - i - 2:\nStep 5:     If arr[j] > arr[j + 1], swap(arr[j], arr[j + 1]) and set swapped = 1.\nStep 6:   If swapped == 0 (no swaps occurred), the array is already sorted; break early.\nStep 7: The array is now fully sorted in ascending order.",
    "pseudocode": "function bubbleSort(arr, n):\n    for i from 0 to n - 2 do:\n        swapped = false\n        for j from 0 to n - i - 2 do:\n            if arr[j] > arr[j + 1] then:\n                swap(arr[j], arr[j + 1])\n                swapped = true\n        if not swapped then:\n            break",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n\n/**\n * Optimized Bubble Sort using a swapped flag.\n * @param arr Array to sort\n * @param n Number of elements\n */\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        bool swapped = false;\n\n        // Last i elements are already in place\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n\n        // Optimization: if no two elements were swapped, array is sorted\n        if (!swapped) {\n            break;\n        }\n    }\n}\n\nvoid printArray(int arr[], int size) {\n    for (int i = 0; i < size; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    int arr[] = {64, 34, 25, 12, 22, 11, 90};\n    int n = sizeof(arr) / sizeof(arr[0]);\n\n    printf(\"=== Optimized Bubble Sort Demonstration ===\\n\");\n    printf(\"Original array: \");\n    printArray(arr, n);\n\n    bubbleSort(arr, n);\n\n    printf(\"Sorted array:   \");\n    printArray(arr, n);\n\n    // Demonstrate Best-case O(n) early break on already sorted array\n    int sortedArr[] = {1, 2, 3, 4, 5};\n    int n2 = 5;\n    printf(\"\\nSorting already sorted array: \");\n    printArray(sortedArr, n2);\n    bubbleSort(sortedArr, n2);\n    printf(\"Finished in 1 pass with 0 swaps!\\n\");\n\n    return 0;\n}",
    "sample_input": "Array: [64, 34, 25, 12, 22, 11, 90] (n = 7)",
    "sample_output": "=== Optimized Bubble Sort Demonstration ===\nOriginal array: 64 34 25 12 22 11 90 \nSorted array:   11 12 22 25 34 64 90 \n\nSorting already sorted array: 1 2 3 4 5 \nFinished in 1 pass with 0 swaps!",
    "dry_run": "Dry run on arr = [64, 34, 25, 12, 22]:\n• Pass 1 (i = 0):\n  - Compare 64 > 34: Swap -> [34, 64, 25, 12, 22]\n  - Compare 64 > 25: Swap -> [34, 25, 64, 12, 22]\n  - Compare 64 > 12: Swap -> [34, 25, 12, 64, 22]\n  - Compare 64 > 22: Swap -> [34, 25, 12, 22, 64] (64 is in final position)\n• Pass 2 (i = 1):\n  - Compare 34 > 25: Swap -> [25, 34, 12, 22, 64]\n  - Compare 34 > 12: Swap -> [25, 12, 34, 22, 64]\n  - Compare 34 > 22: Swap -> [25, 12, 22, 34, 64] (34 is in final position)\n• Pass 3 (i = 2):\n  - Compare 25 > 12: Swap -> [12, 25, 22, 34, 64]\n  - Compare 25 > 22: Swap -> [12, 22, 25, 34, 64] (25 is in final position)\n• Pass 4 (i = 3):\n  - Compare 12 > 22: No swap. swapped = false. Array sorted!",
    "time_complexity": "• Best Case: O(n) — When the array is already sorted, the swapped flag remains false in pass 1, triggering an early break after n - 1 comparisons.\n• Average Case: O(n^2) — On average, n(n - 1)/4 swaps and comparisons are executed.\n• Worst Case: O(n^2) — When array is reverse sorted, n(n - 1)/2 comparisons and swaps occur.",
    "space_complexity": "• Auxiliary Space: O(1) — In-place algorithm requiring only a single temporary variable for swapping.",
    "advantages_disadvantages": "Advantages:\n• Stable sort: Preserves the relative order of identical elements (equal items are never swapped).\n• In-place: Zero auxiliary dynamic memory required.\n• Adaptive: Achieves linear O(n) performance on pre-sorted data when optimized.\n\nDisadvantages:\n• Highly inefficient: Excessive CPU cycle consumption and memory writes compared to Quick Sort or Insertion Sort.\n• Not suitable for production or datasets exceeding a few hundred records.",
    "applications": "• Academic computer science education for introducing comparison sorting and invariant concepts.\n• Verifying hardware graphics sorting circuits.\n• Operating system routines verifying if a small buffer is already sorted.",
    "viva_questions": [
      {
        "q": "Is Bubble Sort stable? Why?",
        "a": "Yes, Bubble Sort is stable because the comparison condition is strictly greater than (arr[j] > arr[j+1]). Equal keys are never swapped across each other."
      },
      {
        "q": "What is the maximum number of swaps in Bubble Sort for n elements?",
        "a": "n(n - 1) / 2 swaps, which occurs when the array is sorted in reverse order."
      }
    ],
    "edge_cases": "• Already sorted input: Handled in O(n) with swapped flag.\n• Reverse sorted input: Maximum swaps performed safely.\n• Identical elements array ([5, 5, 5]): Zero swaps, terminates in 1 pass.",
    "diagram": "Pass 1: [ 64 , 34 , 25 , 12 ] -> [ 34 , 25 , 12 | 64 ] (64 bubbled to end)\nPass 2: [ 34 , 25 , 12 | 64 ] -> [ 25 , 12 | 34 , 64 ] (34 bubbled)\nPass 3: [ 25 , 12 | 34 , 64 ] -> [ 12 , 25 , 34 , 64 ] (Sorted!)"
  },
  "selection_sort": {
    "id": "selection_sort",
    "title": "Selection Sort (Minimum Selection & Placement)",
    "category": "sorting",
    "categoryName": "Sorting Techniques",
    "subcategory": "selection_sort",
    "subcategoryName": "Selection Sort",
    "keywords": [
      "selection sort",
      "min element sort",
      "find minimum swap",
      "selection sorting algorithm"
    ],
    "definition": "Selection Sort is an in-place comparison sort that divides the input array into a sorted subarray on the left and an unsorted subarray on the right. In each iteration, it finds the minimum element in the unsorted subarray and swaps it with the first unsorted position.",
    "concept_explanation": "Selection sort maintains two conceptual partitions: a sorted prefix (indices 0 to i - 1) and an unsorted suffix (indices i to n - 1). In pass i, the algorithm scans the entire unsorted suffix to identify the index min_idx containing the smallest key. Exactly one swap is then made between arr[i] and arr[min_idx]. This guarantees that the sorted boundary expands rightward by one element per pass. Because it performs at most n - 1 swaps in total, Selection Sort minimizes write operations to memory.",
    "algorithm": "Step 1: Set i = 0.\nStep 2: While i < n - 1:\nStep 3:   Set min_idx = i.\nStep 4:   Loop j from i + 1 to n - 1:\nStep 5:     If arr[j] < arr[min_idx], update min_idx = j.\nStep 6:   If min_idx != i, swap(arr[i], arr[min_idx]).\nStep 7:   Increment i by 1.\nStep 8: The array is sorted.",
    "pseudocode": "function selectionSort(arr, n):\n    for i from 0 to n - 2 do:\n        min_idx = i\n        for j from i + 1 to n - 1 do:\n            if arr[j] < arr[min_idx] then:\n                min_idx = j\n        if min_idx != i then:\n            swap(arr[i], arr[min_idx])",
    "c_program": "#include <stdio.h>\n\n/**\n * Implements Selection Sort algorithm.\n * @param arr Array of integers to sort\n * @param n Size of array\n */\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        // Assume the first unsorted element is the minimum\n        int min_idx = i;\n\n        // Search the unsorted subarray for the true minimum\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n\n        // Swap the found minimum element with the first unsorted element\n        if (min_idx != i) {\n            int temp = arr[i];\n            arr[i] = arr[min_idx];\n            arr[min_idx] = temp;\n        }\n    }\n}\n\nvoid printArray(int arr[], int n) {\n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    int arr[] = {29, 10, 14, 37, 13};\n    int n = sizeof(arr) / sizeof(arr[0]);\n\n    printf(\"=== Selection Sort Demonstration ===\\n\");\n    printf(\"Original array: \");\n    printArray(arr, n);\n\n    selectionSort(arr, n);\n\n    printf(\"Sorted array:   \");\n    printArray(arr, n);\n    return 0;\n}",
    "sample_input": "Array: [29, 10, 14, 37, 13] (n = 5)",
    "sample_output": "=== Selection Sort Demonstration ===\nOriginal array: 29 10 14 37 13 \nSorted array:   10 13 14 29 37",
    "dry_run": "Dry run on [29, 10, 14, 37, 13]:\n• Pass 0: Find minimum in [29, 10, 14, 37, 13] -> min is 10 at index 1.\n  Swap arr[0] (29) with arr[1] (10) -> [10 | 29, 14, 37, 13]\n• Pass 1: Find minimum in [29, 14, 37, 13] -> min is 13 at index 4.\n  Swap arr[1] (29) with arr[4] (13) -> [10, 13 | 14, 37, 29]\n• Pass 2: Find minimum in [14, 37, 29] -> min is 14 at index 2 (already in place).\n  No swap -> [10, 13, 14 | 37, 29]\n• Pass 3: Find minimum in [37, 29] -> min is 29 at index 4.\n  Swap arr[3] (37) with arr[4] (29) -> [10, 13, 14, 29 | 37]\nArray sorted with exactly 3 swaps!",
    "time_complexity": "• Best Case: O(n^2) — Even if array is sorted, the inner loop still scans all remaining elements to verify the minimum.\n• Average Case: O(n^2) — Requires n(n - 1)/2 comparisons regardless of initial key ordering.\n• Worst Case: O(n^2) — n(n - 1)/2 comparisons.",
    "space_complexity": "• Auxiliary Space: O(1) — Completely in-place; uses only scalar variables (i, j, min_idx, temp).",
    "advantages_disadvantages": "Advantages:\n• Minimal memory writes: Performs at most O(n) swaps (at most n - 1 swaps total), making it ideal when write operations to memory (like Flash/EEPROM) are physically expensive.\n• Simple logic and small code size.\n\nDisadvantages:\n• Unstable by default: Long-range swaps can invert the relative order of duplicate elements.\n• Non-adaptive: Performance remains O(n^2) even on an already sorted list.",
    "applications": "• Flash memory microcontrollers where flash write endurance is limited and minimizing erase/write cycles is critical.\n• Small embedded systems with strict RAM and instruction size limits.",
    "viva_questions": [
      {
        "q": "Why is Selection Sort considered optimal in terms of memory write cycles?",
        "a": "Because it performs at most n - 1 swaps across the entire sort (O(n) writes), unlike Bubble Sort or Insertion Sort which may perform O(n^2) writes."
      },
      {
        "q": "Why is Selection Sort unstable? Give an example.",
        "a": "Consider [4a, 4b, 2]. The minimum is 2, so 4a swaps with 2, giving [2, 4b, 4a]. The relative order of 4a and 4b is inverted."
      }
    ],
    "edge_cases": "• Array already sorted: Executes comparisons but makes zero swaps.\n• Array with duplicate elements: Correctly sorts keys but instability may alter identical item ordering.\n• Array with all equal elements: min_idx never changes, 0 swaps made.",
    "diagram": "[ 29 | 10 | 14 | 37 | 13 ]  ==> min is 10 (idx 1)\n   ^----' (swap 29 and 10)\n[ 10 | 29 | 14 | 37 | 13 ]  ==> min is 13 (idx 4)\n        ^------------' (swap 29 and 13)\n[ 10 | 13 | 14 | 29 | 37 ] (Sorted)"
  },
  "insertion_sort": {
    "id": "insertion_sort",
    "title": "Insertion Sort (Card Player’s Sorting Algorithm)",
    "category": "sorting",
    "categoryName": "Sorting Techniques",
    "subcategory": "insertion_sort",
    "subcategoryName": "Insertion Sort",
    "keywords": [
      "insertion sort",
      "adaptive sort",
      "playing card sort",
      "online sort",
      "nearly sorted algorithm"
    ],
    "definition": "Insertion Sort is an intuitive, stable comparison sorting algorithm that builds the final sorted array one element at a time by picking the next element and shifting larger elements in the sorted prefix to make room for its insertion.",
    "concept_explanation": "Insertion sort mirrors the way human players arrange cards in hand. Elements from index 0 to i - 1 form an already-sorted sub-hand. At step i, the value key = arr[i] is extracted. The algorithm compares key with preceding elements from right to left (index j = i - 1 down to 0). As long as arr[j] is greater than key, arr[j] is shifted one position to the right (arr[j + 1] = arr[j]). Once a smaller element or the beginning of the array is encountered, key is inserted into the opened slot (arr[j + 1] = key).",
    "algorithm": "Step 1: Loop for i from 1 to n - 1:\nStep 2:   Set key = arr[i] and j = i - 1.\nStep 3:   While j >= 0 and arr[j] > key:\nStep 4:     Shift arr[j] rightward: arr[j + 1] = arr[j].\nStep 5:     Decrement j by 1 (j = j - 1).\nStep 6:   Insert key at correct position: arr[j + 1] = key.\nStep 7: The array is sorted.",
    "pseudocode": "function insertionSort(arr, n):\n    for i from 1 to n - 1 do:\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key do:\n            arr[j + 1] = arr[j]\n            j = j - 1\n        arr[j + 1] = key",
    "c_program": "#include <stdio.h>\n\n/**\n * Implements Insertion Sort algorithm.\n * @param arr Array to sort\n * @param n Size of the array\n */\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n\n        // Move elements of arr[0..i-1] that are greater than key\n        // to one position ahead of their current position\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}\n\nvoid printArray(int arr[], int n) {\n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    int arr[] = {12, 11, 13, 5, 6};\n    int n = sizeof(arr) / sizeof(arr[0]);\n\n    printf(\"=== Insertion Sort Demonstration ===\\n\");\n    printf(\"Original array: \");\n    printArray(arr, n);\n\n    insertionSort(arr, n);\n\n    printf(\"Sorted array:   \");\n    printArray(arr, n);\n\n    // Demonstrate adaptive O(n) on nearly sorted data\n    int nearlySorted[] = {1, 2, 4, 3, 5, 6};\n    int n2 = sizeof(nearlySorted) / sizeof(nearlySorted[0]);\n    printf(\"\\nNearly sorted array before: \");\n    printArray(nearlySorted, n2);\n    insertionSort(nearlySorted, n2);\n    printf(\"Nearly sorted array after:  \");\n    printArray(nearlySorted, n2);\n\n    return 0;\n}",
    "sample_input": "Array: [12, 11, 13, 5, 6] (n = 5)",
    "sample_output": "=== Insertion Sort Demonstration ===\nOriginal array: 12 11 13 5 6 \nSorted array:   5 6 11 12 13 \n\nNearly sorted array before: 1 2 4 3 5 6 \nNearly sorted array after:  1 2 3 4 5 6",
    "dry_run": "Dry run on [12, 11, 13, 5, 6]:\n• i = 1, key = 11: 12 > 11 -> Shift 12 right. Place 11 at arr[0] -> [11, 12, 13, 5, 6]\n• i = 2, key = 13: 12 < 13 -> No shift. Place 13 at arr[2] -> [11, 12, 13, 5, 6]\n• i = 3, key = 5:  13>5, 12>5, 11>5 -> Shift 13, 12, 11 right. Place 5 at arr[0] -> [5, 11, 12, 13, 6]\n• i = 4, key = 6:  13>6, 12>6, 11>6 -> Shift 13, 12, 11 right. 5 < 6 -> Place 6 at arr[1] -> [5, 6, 11, 12, 13]\nArray fully sorted!",
    "time_complexity": "• Best Case: O(n) — When the array is already sorted, the while loop condition fails immediately on every i. Only n - 1 comparisons and 0 shifts occur.\n• Average Case: O(n^2) — Approximately n^2 / 4 comparisons and shifts.\n• Worst Case: O(n^2) — When array is reverse sorted, every element must shift across the entire sorted prefix.",
    "space_complexity": "• Auxiliary Space: O(1) — In-place; requires only scalar storage for key, i, and j.",
    "advantages_disadvantages": "Advantages:\n• Highly adaptive: Runs in near O(n) time on data that is already mostly sorted.\n• Stable sort: Never changes relative order of equivalent items.\n• Online algorithm: Can sort a live data stream as elements arrive in real-time.\n• Minimal overhead: Outperforms Quick Sort and Merge Sort on small collections (n < 30). Used as base case in hybrid algorithms like Timsort and Introsort.\n\nDisadvantages:\n• Quadratic scaling: O(n^2) average and worst-case time makes it slow for massive random arrays.",
    "applications": "• Hybrid sorting engines: Used as the base-case sorter in Python's Timsort and V8's sorting engine for sub-arrays of size <= 32.\n• Sorting nearly-sorted real-time data feeds (e.g. stock market updates with occasional out-of-order ticks).",
    "viva_questions": [
      {
        "q": "Why is Insertion Sort adaptive?",
        "a": "Because its inner while loop terminates as soon as arr[j] <= key. For nearly-sorted data, it executes very few shifts, approaching O(n) time complexity."
      },
      {
        "q": "What is an online sorting algorithm?",
        "a": "An algorithm that can process and sort inputs on the fly as they arrive sequentially, without requiring access to the full dataset upfront."
      }
    ],
    "edge_cases": "• Single element array (n = 1): Loop for i does not execute; array is inherently sorted.\n• Reverse sorted: Triggers worst-case shifts, verified safe without index underflow (j >= 0 guard).\n• Identical keys: Maintained in original relative position (stability guaranteed).",
    "diagram": "Key = 5:\n[ 11 | 12 | 13 |  5 |  6 ]\n  -->   -->  --> (shift 13, 12, 11 right)\n[  5 | 11 | 12 | 13 |  6 ]"
  },
  "merge_sort": {
    "id": "merge_sort",
    "title": "Merge Sort (Divide-and-Conquer Sorting)",
    "category": "sorting",
    "categoryName": "Sorting Techniques",
    "subcategory": "merge_sort",
    "subcategoryName": "Merge Sort",
    "keywords": [
      "merge sort",
      "divide and conquer sort",
      "merge algorithm",
      "mergesort",
      "stable nlogn sort"
    ],
    "definition": "Merge Sort is a highly efficient, general-purpose, comparison-based sorting algorithm that operates on the Divide-and-Conquer paradigm, recursively dividing an array into two halves until single-element subarrays remain, and then merging them into sorted order.",
    "concept_explanation": "Merge sort follows three fundamental steps: 1) Divide: Compute mid = low + (high - low) / 2 and split array into left subarray arr[low..mid] and right subarray arr[mid+1..high]. 2) Conquer: Recursively sort both subarrays. 3) Combine: Merge the two sorted subarrays into a single sorted array by using two pointers to compare elements and copy the smaller item into an auxiliary array. Because the recursion tree has a depth of log2(n) and each level does O(n) total merging work, Merge Sort guarantees O(n log n) runtime in ALL cases.",
    "algorithm": "Step 1: If low < high:\nStep 2:   Calculate mid = low + (high - low) / 2.\nStep 3:   Recursively call mergeSort(arr, low, mid).\nStep 4:   Recursively call mergeSort(arr, mid + 1, high).\nStep 5:   Call merge(arr, low, mid, high) to merge the two sorted halves:\nStep 6:     Create auxiliary arrays L[] and R[] and copy data.\nStep 7:     Use two pointers i and j to pick smaller element and place into arr[k].\nStep 8:     Copy any remaining elements from L[] or R[].",
    "pseudocode": "function mergeSort(arr, low, high):\n    if low < high then:\n        mid = low + (high - low) / 2\n        mergeSort(arr, low, mid)\n        mergeSort(arr, mid + 1, high)\n        merge(arr, low, mid, high)\n\nfunction merge(arr, low, mid, high):\n    // Copy to temporary arrays L and R\n    // Merge back into arr[low..high] in sorted order",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\n/**\n * Merges two sorted subarrays arr[low..mid] and arr[mid+1..high].\n */\nvoid merge(int arr[], int low, int mid, int high) {\n    int n1 = mid - low + 1;\n    int n2 = high - mid;\n\n    // Create temporary arrays\n    int *L = (int *)malloc(n1 * sizeof(int));\n    int *R = (int *)malloc(n2 * sizeof(int));\n\n    // Copy data to temp arrays\n    for (int i = 0; i < n1; i++)\n        L[i] = arr[low + i];\n    for (int j = 0; j < n2; j++)\n        R[j] = arr[mid + 1 + j];\n\n    // Merge the temp arrays back into arr[low..high]\n    int i = 0, j = 0, k = low;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) { // '<=' ensures stability\n            arr[k] = L[i];\n            i++;\n        } else {\n            arr[k] = R[j];\n            j++;\n        }\n        k++;\n    }\n\n    // Copy remaining elements of L[], if any\n    while (i < n1) {\n        arr[k] = L[i];\n        i++;\n        k++;\n    }\n\n    // Copy remaining elements of R[], if any\n    while (j < n2) {\n        arr[k] = R[j];\n        j++;\n        k++;\n    }\n\n    // Free dynamically allocated auxiliary buffers\n    free(L);\n    free(R);\n}\n\n/**\n * Recursive Merge Sort implementation.\n */\nvoid mergeSort(int arr[], int low, int high) {\n    if (low < high) {\n        int mid = low + (high - low) / 2;\n\n        mergeSort(arr, low, mid);\n        mergeSort(arr, mid + 1, high);\n        merge(arr, low, mid, high);\n    }\n}\n\nvoid printArray(int arr[], int size) {\n    for (int i = 0; i < size; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    int arr[] = {38, 27, 43, 3, 9, 82, 10};\n    int n = sizeof(arr) / sizeof(arr[0]);\n\n    printf(\"=== Merge Sort Demonstration ===\\n\");\n    printf(\"Original array: \");\n    printArray(arr, n);\n\n    mergeSort(arr, 0, n - 1);\n\n    printf(\"Sorted array:   \");\n    printArray(arr, n);\n\n    return 0;\n}",
    "sample_input": "Array: [38, 27, 43, 3, 9, 82, 10] (n = 7)",
    "sample_output": "=== Merge Sort Demonstration ===\nOriginal array: 38 27 43 3 9 82 10 \nSorted array:   3 9 10 27 38 43 82",
    "dry_run": "Recursion Tree on [38, 27, 43, 3]:\n1. Divide: [38, 27] and [43, 3]\n2. Divide further: [38], [27], [43], [3]\n3. Conquer & Merge:\n   - merge([38], [27]) -> compares 38 and 27 -> [27, 38]\n   - merge([43], [3])  -> compares 43 and 3  -> [3, 43]\n4. Final Merge:\n   - merge([27, 38], [3, 43]):\n     - compare 27 vs 3  -> take 3\n     - compare 27 vs 43 -> take 27\n     - compare 38 vs 43 -> take 38\n     - copy remaining 43 -> [3, 27, 38, 43]",
    "time_complexity": "• Best Case: O(n log n)\n• Average Case: O(n log n)\n• Worst Case: O(n log n) — Recurrence T(n) = 2T(n/2) + O(n). By Master Theorem Case 2, T(n) = Theta(n log2 n) unconditionally. Guaranteed upper bound.",
    "space_complexity": "• Auxiliary Space: O(n) — Requires an auxiliary buffer to merge subarrays.\n• Call Stack Space: O(log n) recursive frame depth.",
    "advantages_disadvantages": "Advantages:\n• Guaranteed O(n log n) performance even in the worst-case (no degradation like Quick Sort).\n• Stable sorting: Identical keys retain original order (crucial when sorting records with secondary keys).\n• Excellent for linked lists: Can sort linked lists in O(n log n) with O(1) auxiliary space (by manipulating pointers without copying).\n\nDisadvantages:\n• Requires O(n) auxiliary memory for arrays, which may be prohibitive on constrained memory systems.\n• Lower cache locality compared to in-place Quick Sort.",
    "applications": "• External sorting: Sorting massive files stored on hard drives that cannot fit into RAM simultaneously.\n• Standard sorting for linked lists in databases.\n• Core component of Python's Timsort algorithm.",
    "viva_questions": [
      {
        "q": "What is the recurrence relation for Merge Sort and its solution?",
        "a": "T(n) = 2T(n/2) + O(n). Solving with the Master Theorem yields T(n) = O(n log n)."
      },
      {
        "q": "Why is Merge Sort preferred for sorting Linked Lists?",
        "a": "Because merging two sorted linked lists requires only pointer adjustments without copying data into an auxiliary array, giving O(1) extra space."
      }
    ],
    "edge_cases": "• Empty array or single element (low >= high): Base case terminates recursion safely.\n• Odd-sized arrays: Handled smoothly by integer division for mid.\n• Already sorted array: Still performs O(n log n) comparisons; stable output preserved.",
    "diagram": "        [ 38, 27, 43, 3 ]\n             /          \\\n       [ 38, 27 ]     [ 43, 3 ]\n        /      \\       /     \\\n      [38]    [27]   [43]    [3]\n        \\      /       \\     /\n       [ 27, 38 ]     [ 3, 43 ]\n             \\          /\n        [ 3, 27, 38, 43 ]"
  },
  "quick_sort": {
    "id": "quick_sort",
    "title": "Quick Sort (Partition-Exchange Sorting)",
    "category": "sorting",
    "categoryName": "Sorting Techniques",
    "subcategory": "quick_sort",
    "subcategoryName": "Quick Sort",
    "keywords": [
      "quick sort",
      "quicksort",
      "partition exchange",
      "lomuto partition",
      "in place nlogn sort"
    ],
    "definition": "Quick Sort is a highly efficient, cache-friendly in-place sorting algorithm based on the Divide-and-Conquer paradigm that chooses a pivot element, partitions the array so smaller elements lie to the left and larger to the right, and then recursively sorts the sub-partitions.",
    "concept_explanation": "Quick sort operates on partitioning. A pivot element is selected (commonly the last element in Lomuto partition). The partition algorithm iterates across the array, placing all elements smaller than the pivot into a left segment, and placing the pivot at its exact final sorted index p. Then, Quick Sort recursively sorts the left subarray arr[low..p-1] and the right subarray arr[p+1..high]. Unlike Merge Sort, no merging step is needed because the pivot is already placed at its final destination. In practice, Quick Sort is the fastest general-purpose comparison sort due to outstanding CPU cache locality.",
    "algorithm": "Step 1: If low < high:\nStep 2:   Partition the array: p = partition(arr, low, high).\nStep 3:     Choose pivot = arr[high].\nStep 4:     Set index i = low - 1.\nStep 5:     For j = low to high - 1:\nStep 6:       If arr[j] <= pivot:\nStep 7:         Increment i, swap(arr[i], arr[j]).\nStep 8:     Swap(arr[i + 1], arr[high]).\nStep 9:     Return pivot index i + 1.\nStep 10:  Recursively call quickSort(arr, low, p - 1).\nStep 11:  Recursively call quickSort(arr, p + 1, high).",
    "pseudocode": "function quickSort(arr, low, high):\n    if low < high then:\n        pi = partition(arr, low, high)\n        quickSort(arr, low, pi - 1)\n        quickSort(arr, pi + 1, high)\n\nfunction partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    for j = low to high - 1 do:\n        if arr[j] <= pivot then:\n            i = i + 1\n            swap(arr[i], arr[j])\n    swap(arr[i + 1], arr[high])\n    return i + 1",
    "c_program": "#include <stdio.h>\n\n/**\n * Swaps two integers.\n */\nvoid swap(int *a, int *b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\n/**\n * Lomuto partition scheme.\n * Takes the last element as pivot and places it at its correct sorted position.\n */\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high]; // Pivot element\n    int i = (low - 1);     // Index of smaller element\n\n    for (int j = low; j <= high - 1; j++) {\n        // If current element is smaller than or equal to pivot\n        if (arr[j] <= pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return (i + 1);\n}\n\n/**\n * Recursive Quick Sort algorithm.\n */\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        // pi is partitioning index, arr[pi] is now at right place\n        int pi = partition(arr, low, high);\n\n        // Separately sort elements before partition and after partition\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n\nvoid printArray(int arr[], int size) {\n    for (int i = 0; i < size; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    int arr[] = {10, 80, 30, 90, 40, 50, 70};\n    int n = sizeof(arr) / sizeof(arr[0]);\n\n    printf(\"=== Quick Sort (Lomuto Partition) Demonstration ===\\n\");\n    printf(\"Original array: \");\n    printArray(arr, n);\n\n    quickSort(arr, 0, n - 1);\n\n    printf(\"Sorted array:   \");\n    printArray(arr, n);\n\n    return 0;\n}",
    "sample_input": "Array: [10, 80, 30, 90, 40, 50, 70] (n = 7)",
    "sample_output": "=== Quick Sort (Lomuto Partition) Demonstration ===\nOriginal array: 10 80 30 90 40 50 70 \nSorted array:   10 30 40 50 70 80 90",
    "dry_run": "Partition on [10, 80, 30, 90, 40, 50, 70]:\n• Pivot = 70. low = 0, high = 6. i = -1.\n• j = 0: arr[0]=10 <= 70 -> i=0, swap(10, 10) -> [10, 80, 30, 90, 40, 50, 70]\n• j = 1: arr[1]=80 > 70  -> No swap\n• j = 2: arr[2]=30 <= 70 -> i=1, swap(80, 30) -> [10, 30, 80, 90, 40, 50, 70]\n• j = 3: arr[3]=90 > 70  -> No swap\n• j = 4: arr[4]=40 <= 70 -> i=2, swap(80, 40) -> [10, 30, 40, 90, 80, 50, 70]\n• j = 5: arr[5]=50 <= 70 -> i=3, swap(90, 50) -> [10, 30, 40, 50, 80, 90, 70]\n• End loop: swap(arr[i+1], arr[high]) -> swap(arr[4]=80, arr[6]=70)\n  Result: [10, 30, 40, 50, 70, 90, 80]. Pivot 70 placed at index 4!\nLeft subarray: [10, 30, 40, 50], Right subarray: [90, 80].",
    "time_complexity": "• Best Case: O(n log n) — Occurs when the partition always divides the array into two equal halves. T(n) = 2T(n/2) + O(n).\n• Average Case: O(n log n) — Highly consistent in practice; random inputs exhibit O(1.38 n log n).\n• Worst Case: O(n^2) — Occurs when the pivot is always the smallest or largest element (e.g. sorted array with last element pivot). T(n) = T(n - 1) + O(n).",
    "space_complexity": "• Auxiliary Space: O(1) extra array memory (completely in-place).\n• Stack Memory: O(log n) average recursive stack frames; O(n) worst-case.",
    "advantages_disadvantages": "Advantages:\n• Fastest in practice: Extremely high CPU cache hit rates due to in-place sequential memory scanning.\n• In-place: Requires zero auxiliary buffer allocations (unlike Merge Sort).\n• Widely implemented: Standard algorithm behind C qsort() and C++ std::sort.\n\nDisadvantages:\n• Worst-case degradation: Can degrade to O(n^2) if pivot selection is poor on sorted/reverse data.\n• Unstable: Swapping around the pivot can change relative order of identical elements.",
    "applications": "• Standard system libraries: C standard library qsort() and Unix system utilities.\n• Fast in-memory sorting of primitive types (integers, floats, structs) where stability is not required.",
    "viva_questions": [
      {
        "q": "When does Quick Sort exhibit its worst-case O(n^2) performance?",
        "a": "When the chosen pivot is always the extreme element (smallest or largest), which occurs when the array is already sorted or reverse-sorted with a naive first/last element pivot."
      },
      {
        "q": "How can the worst-case of Quick Sort be mitigated in production?",
        "a": "By using Randomized Pivot Selection or Median-of-Three pivot selection (median of first, middle, and last elements)."
      }
    ],
    "edge_cases": false,
    "diagram": "Array: [ 10 | 80 | 30 | 90 | 40 | 50 | 70 ]  (Pivot = 70)\n           <= 70               > 70\n[ 10, 30, 40, 50 ]  <-- [ 70 ] -->  [ 80, 90 ]\n   (Left Subarray)      (Pivot)     (Right Subarray)"
  },
  "sll_create": {
    "id": "sll_create",
    "title": "Singly Linked List — Creation & Memory Allocation",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "create singly linked list",
      "linked list creation",
      "allocate node",
      "struct node c",
      "create node"
    ],
    "definition": "Singly Linked List creation involves defining a self-referential structure in C containing a data field and a next pointer, followed by dynamic heap memory allocation using malloc() to instantiate the head node.",
    "concept_explanation": "A singly linked list is a linear data collection composed of individual nodes connected by directional pointers. Each node occupies two fields in memory: the payload data and a pointer next pointing to the successor node. Creation begins with a NULL pointer representing an empty list. When a node is created, malloc(sizeof(struct Node)) requests heap memory. The node is initialized with the payload, and its next pointer is set to NULL.",
    "algorithm": "Step 1: Define structure Node with int data and struct Node* next.\nStep 2: Declare head pointer initialized to NULL (struct Node* head = NULL).\nStep 3: Allocate memory for a new node using malloc(sizeof(struct Node)).\nStep 4: Check if allocation was successful (newNode != NULL).\nStep 5: Assign newNode->data = value and newNode->next = NULL.\nStep 6: Set head = newNode.",
    "pseudocode": "struct Node:\n    data: Integer\n    next: Pointer to Node\n\nfunction createNode(val):\n    newNode = allocate(Node)\n    if newNode == NULL then error(\"Out of Memory\")\n    newNode.data = val\n    newNode.next = NULL\n    return newNode",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\n// Function to create a new node on the heap\nstruct Node* createNode(int value) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    if (newNode == NULL) {\n        printf(\"Memory allocation failed!\\n\");\n        exit(1);\n    }\n    newNode->data = value;\n    newNode->next = NULL;\n    return newNode;\n}\n\nint main(void) {\n    printf(\"=== Singly Linked List Creation ===\\n\");\n    struct Node* head = createNode(10);\n    head->next = createNode(20);\n    head->next->next = createNode(30);\n\n    printf(\"Created 3-node linked list: \");\n    struct Node* temp = head;\n    while (temp != NULL) {\n        printf(\"[%d] -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n\n    // Clean up heap memory\n    while (head != NULL) {\n        struct Node* next = head->next;\n        free(head);\n        head = next;\n    }\n    return 0;\n}",
    "sample_input": "Values: 10, 20, 30",
    "sample_output": "=== Singly Linked List Creation ===\nCreated 3-node linked list: [10] -> [20] -> [30] -> NULL",
    "dry_run": "1. malloc allocates 16 bytes for Node 1 -> addr 0x1000. data=10, next=NULL. head=0x1000.\n2. malloc allocates 16 bytes for Node 2 -> addr 0x1010. data=20, next=NULL. head->next=0x1010.\n3. malloc allocates 16 bytes for Node 3 -> addr 0x1020. data=30, next=NULL. Node2->next=0x1020.\nTraversal visits 0x1000 (10) -> 0x1010 (20) -> 0x1020 (30) -> NULL.",
    "time_complexity": "• Node Creation: O(1) time complexity.\n• Total List Creation (n nodes): O(n) time.",
    "space_complexity": "• O(1) auxiliary space per node. Total memory: O(n) heap allocation.",
    "advantages_disadvantages": "Advantages:\n• Dynamic sizing: Expands and contracts at runtime without fixed capacity boundaries.\n• Zero memory waste compared to pre-allocated static arrays.\n\nDisadvantages:\n• Extra memory overhead: Requires 8 bytes per node for the next pointer on 64-bit systems.\n• Non-contiguous heap allocation reduces CPU cache locality.",
    "applications": "• Dynamic symbol tables in compilers.\n• Memory pool allocation blocks in operating systems.",
    "viva_questions": [
      {
        "q": "Why is struct Node considered a self-referential structure in C?",
        "a": "Because it contains a pointer member (struct Node* next) that points to another instance of the exact same structure type."
      }
    ],
    "edge_cases": "• Memory exhaustion: malloc returns NULL; checked and handled with exit condition.",
    "diagram": "[ head ] --> [ 10 | * ] --> [ 20 | * ] --> [ 30 | NULL ]"
  },
  "sll_insert_beginning": {
    "id": "sll_insert_beginning",
    "title": "Singly Linked List — Insert at Beginning (Prepend)",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "insert at beginning",
      "prepend node",
      "insert head linked list",
      "insert first node"
    ],
    "definition": "Insertion at the beginning of a singly linked list adds a new node before the current head, making the new node the first element of the list in constant O(1) time.",
    "concept_explanation": "To insert at the beginning, allocate a new node and assign its payload. Set the new node's next pointer to point to the current head node. Finally, update the head pointer to reference the new node. Because no traversal of existing nodes is necessary, insertion at the head is strictly an O(1) constant-time operation regardless of whether the list holds 0 or 1,000,000 items.",
    "algorithm": "Step 1: Allocate memory for newNode.\nStep 2: Assign newNode->data = value.\nStep 3: Set newNode->next = head.\nStep 4: Update head = newNode.\nStep 5: Return updated head.",
    "pseudocode": "function insertAtBeginning(head, value):\n    newNode = allocate(Node)\n    newNode.data = value\n    newNode.next = head\n    head = newNode\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\n// Inserts a new node at the beginning of the list using double pointer\nvoid insertAtBeginning(struct Node** headRef, int value) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    if (newNode == NULL) {\n        printf(\"Heap Overflow! Cannot allocate memory.\\n\");\n        return;\n    }\n    newNode->data = value;\n    newNode->next = *headRef; // Point new node to current first node\n    *headRef = newNode;       // Move head pointer to new node\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] -> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* head = NULL; // Initially empty list\n\n    printf(\"=== Singly Linked List: Insert at Beginning ===\\n\");\n    printf(\"Initial list: \");\n    printList(head);\n\n    insertAtBeginning(&head, 30);\n    printf(\"After inserting 30: \");\n    printList(head);\n\n    insertAtBeginning(&head, 20);\n    printf(\"After inserting 20: \");\n    printList(head);\n\n    insertAtBeginning(&head, 10);\n    printf(\"After inserting 10: \");\n    printList(head);\n\n    // Free memory\n    while (head != NULL) {\n        struct Node* temp = head;\n        head = head->next;\n        free(temp);\n    }\n    return 0;\n}",
    "sample_input": "Insert sequentially: 30, then 20, then 10",
    "sample_output": "=== Singly Linked List: Insert at Beginning ===\nInitial list: NULL\nAfter inserting 30: [30] -> NULL\nAfter inserting 20: [20] -> [30] -> NULL\nAfter inserting 10: [10] -> [20] -> [30] -> NULL",
    "dry_run": "Initial: head = NULL\n1. insert(30): newNode->data = 30, newNode->next = NULL. head = newNode. List: [30]->NULL.\n2. insert(20): newNode->data = 20, newNode->next = 30. head = newNode. List: [20]->[30]->NULL.\n3. insert(10): newNode->data = 10, newNode->next = 20. head = newNode. List: [10]->[20]->[30]->NULL.",
    "time_complexity": "• Time Complexity: O(1) strictly — Zero loops, instantaneous pointer reassignment.",
    "space_complexity": "• O(1) extra space per insertion.",
    "advantages_disadvantages": "Advantages:\n• Fastest insertion operation possible in linked data structures.\n• Natural mechanism for implementing Stacks (LIFO push).\n\nDisadvantages:\n• Inverts the natural arrival order if elements are appended repeatedly.",
    "applications": "• Implementing the push() operation of an array-less dynamic Stack.\n• Undo history buffers in text editors.",
    "viva_questions": [
      {
        "q": "Why is insertion at the beginning of a singly linked list O(1)?",
        "a": "Because we only update two pointers (newNode->next = head and head = newNode) without traversing the list."
      }
    ],
    "edge_cases": "• Empty list (head == NULL): Correctly sets newNode->next = NULL and head = newNode.",
    "diagram": "[ newNode: 10 ] ---> [ head: 20 ] ---> [ 30 ] ---> NULL\n      |\n    (head points here now)"
  },
  "sll_insert_end": {
    "id": "sll_insert_end",
    "title": "Singly Linked List — Insert at End (Append)",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "insert at end",
      "append node",
      "insert tail linked list",
      "insert last node"
    ],
    "definition": "Insertion at the end of a singly linked list traverses to the last node whose next pointer is NULL, and attaches a newly created node to it.",
    "concept_explanation": "To insert at the end without a tail pointer, traverse from head using a temporary pointer until temp->next == NULL is reached. Then attach temp->next = newNode. If the list was initially empty, head is updated directly to newNode. Because the entire list must be traversed to reach the tail, this operation takes O(n) time (or O(1) if a tail pointer is maintained).",
    "algorithm": "Step 1: Allocate newNode with value and newNode->next = NULL.\nStep 2: If head is NULL, set head = newNode and return.\nStep 3: Initialize temp = head.\nStep 4: Traverse while temp->next != NULL: temp = temp->next.\nStep 5: Set temp->next = newNode.",
    "pseudocode": "function insertAtEnd(head, value):\n    newNode = allocate(Node)\n    newNode.data = value\n    newNode.next = NULL\n    if head == NULL then:\n        return newNode\n    temp = head\n    while temp.next != NULL do:\n        temp = temp.next\n    temp.next = newNode\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid insertAtEnd(struct Node** headRef, int value) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = value;\n    newNode->next = NULL;\n\n    // If list is empty, new node becomes head\n    if (*headRef == NULL) {\n        *headRef = newNode;\n        return;\n    }\n\n    // Traverse to the last node\n    struct Node* temp = *headRef;\n    while (temp->next != NULL) {\n        temp = temp->next;\n    }\n    temp->next = newNode;\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] -> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* head = NULL;\n    printf(\"=== Singly Linked List: Insert at End ===\\n\");\n\n    insertAtEnd(&head, 10);\n    insertAtEnd(&head, 20);\n    insertAtEnd(&head, 30);\n\n    printf(\"Final list after appending 10, 20, 30: \");\n    printList(head);\n\n    // Free memory\n    while (head != NULL) {\n        struct Node* temp = head;\n        head = head->next;\n        free(temp);\n    }\n    return 0;\n}",
    "sample_input": "Append: 10, 20, 30",
    "sample_output": "=== Singly Linked List: Insert at End ===\nFinal list after appending 10, 20, 30: [10] -> [20] -> [30] -> NULL",
    "dry_run": "1. insert(10): head is NULL -> head = [10]->NULL.\n2. insert(20): temp points to 10 (temp->next==NULL). temp->next = [20]->NULL. List: [10]->[20]->NULL.\n3. insert(30): temp moves 10 -> 20. temp->next = [30]->NULL. List: [10]->[20]->[30]->NULL.",
    "time_complexity": "• Time Complexity: O(n) without tail pointer; O(1) if a tail pointer is maintained.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages:\n• Preserves natural chronological arrival sequence.\n• Natural mechanism for implementing Queue enqueue().\n\nDisadvantages:\n• Requires O(n) traversal if only a head pointer is kept.",
    "applications": "• Queue enqueue operation.\n• Appending log events to a singly-linked audit trail.",
    "viva_questions": [
      {
        "q": "How can insertion at the end of a singly linked list be optimized to O(1)?",
        "a": "By maintaining an auxiliary tail pointer pointing directly to the last node."
      }
    ],
    "edge_cases": "• Empty list (head == NULL): Sets *headRef = newNode directly.",
    "diagram": "[ 10 | * ] -> [ 20 | * ] -> [ 30 | * ] ----> [ newNode: 40 | NULL ]\n                               temp (last node)"
  },
  "sll_insert_pos": {
    "id": "sll_insert_pos",
    "title": "Singly Linked List — Insert at Specific Position",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "insert at position",
      "insert middle linked list",
      "insert at index",
      "insert given position"
    ],
    "definition": "Insertion at a specific position inserts a new node at a 1-based index pos in the linked list, adjusting surrounding next pointers.",
    "concept_explanation": "To insert at position pos, traverse pos - 2 steps from head to reach the node immediately preceding the target location. Allocate the new node, assign its next pointer to temp->next, and then set temp->next to newNode. If pos is 1, it delegates to insertAtBeginning. If pos is greater than length + 1, it reports an invalid position error.",
    "algorithm": "Step 1: If pos == 1, insert at beginning and update head.\nStep 2: Initialize temp = head and count = 1.\nStep 3: Traverse while count < pos - 1 and temp != NULL: temp = temp->next, count++.\nStep 4: If temp is NULL, position is invalid (out of bounds).\nStep 5: Allocate newNode with value.\nStep 6: Set newNode->next = temp->next.\nStep 7: Set temp->next = newNode.",
    "pseudocode": "function insertAtPosition(head, pos, val):\n    if pos == 1 then:\n        return insertAtBeginning(head, val)\n    temp = head\n    for i from 1 to pos - 2 do:\n        if temp == NULL then error(\"Invalid position\")\n        temp = temp.next\n    newNode = allocate(Node, val)\n    newNode.next = temp.next\n    temp.next = newNode\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid insertAtPosition(struct Node** headRef, int value, int pos) {\n    if (pos < 1) {\n        printf(\"Invalid position %d! Positions start at 1.\\n\", pos);\n        return;\n    }\n\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = value;\n\n    // Case 1: Insert at position 1 (head)\n    if (pos == 1) {\n        newNode->next = *headRef;\n        *headRef = newNode;\n        return;\n    }\n\n    // Traverse to node at position pos - 1\n    struct Node* temp = *headRef;\n    for (int i = 1; i < pos - 1 && temp != NULL; i++) {\n        temp = temp->next;\n    }\n\n    // Out of bounds check\n    if (temp == NULL) {\n        printf(\"Position %d exceeds list length! Insertion aborted.\\n\", pos);\n        free(newNode);\n        return;\n    }\n\n    newNode->next = temp->next;\n    temp->next = newNode;\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] -> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* head = NULL;\n    printf(\"=== Singly Linked List: Insert at Position ===\\n\");\n\n    insertAtPosition(&head, 10, 1); // Pos 1\n    insertAtPosition(&head, 30, 2); // Pos 2\n    insertAtPosition(&head, 20, 2); // Insert 20 between 10 and 30\n    insertAtPosition(&head, 40, 4); // Pos 4 (end)\n\n    printf(\"List after insertions: \");\n    printList(head);\n\n    printf(\"Attempting invalid position 10:\\n\");\n    insertAtPosition(&head, 99, 10);\n\n    // Free memory\n    while (head != NULL) {\n        struct Node* temp = head;\n        head = head->next;\n        free(temp);\n    }\n    return 0;\n}",
    "sample_input": "Insert 10 at pos 1, 30 at pos 2, 20 at pos 2, 40 at pos 4",
    "sample_output": "=== Singly Linked List: Insert at Position ===\nList after insertions: [10] -> [20] -> [30] -> [40] -> NULL\nAttempting invalid position 10:\nPosition 10 exceeds list length! Insertion aborted.",
    "dry_run": "Initial: [10]->[30]->NULL. Insert 20 at pos 2:\n1. temp points to node at pos 1 ([10]).\n2. newNode([20])->next = temp->next ([30]).\n3. temp->next = newNode([20]).\nResult: [10]->[20]->[30]->NULL.",
    "time_complexity": "• Best Case: O(1) if pos == 1.\n• Worst Case: O(n) to traverse to position pos - 1.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages:\n• Does not require shifting subsequent elements like an array.\n\nDisadvantages:\n• Requires O(pos) sequential traversal to find the node.",
    "applications": "• Priority insertion in sorted linked lists.\n• Inserting text tokens at specific cursor line/character positions.",
    "viva_questions": [
      {
        "q": "Why does inserting at position k in a linked list take O(k) time?",
        "a": "Because we must traverse sequentially through k - 1 preceding nodes to reach the insertion point."
      }
    ],
    "edge_cases": "• pos == 1: Correctly prepends without NULL dereference.\n• pos > length + 1: Reports error and frees unused node to prevent memory leak.",
    "diagram": "[ temp: 10 ] -------------> [ 30 ]\n       \\                     ^\n        \\-> [ newNode: 20 ] -/"
  },
  "sll_delete_beginning": {
    "id": "sll_delete_beginning",
    "title": "Singly Linked List — Delete from Beginning",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "delete from beginning",
      "delete head linked list",
      "pop front linked list",
      "remove first node"
    ],
    "definition": "Deleting from the beginning removes the first node of the singly linked list and updates head to point to the second node in O(1) time.",
    "concept_explanation": "Before deletion, check for underflow (head == NULL). If list has nodes, store head in a temporary pointer temp. Advance head to head->next. Finally, call free(temp) to return the deleted node's memory to the operating system heap. This executes in constant O(1) time.",
    "algorithm": "Step 1: If head == NULL, report \"Underflow: List is empty\" and return.\nStep 2: Store temp = head.\nStep 3: Update head = head->next.\nStep 4: Release memory: free(temp).\nStep 5: Return updated head.",
    "pseudocode": "function deleteFromBeginning(head):\n    if head == NULL then error(\"Underflow\")\n    temp = head\n    head = head.next\n    free(temp)\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid deleteFromBeginning(struct Node** headRef) {\n    if (*headRef == NULL) {\n        printf(\"Underflow! List is already empty.\\n\");\n        return;\n    }\n    struct Node* temp = *headRef;\n    int deletedVal = temp->data;\n    *headRef = (*headRef)->next; // Move head to next node\n    free(temp);                  // Deallocate old head\n    printf(\"Deleted node with value: %d\\n\", deletedVal);\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] -> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    // Setup initial list: [10] -> [20] -> [30] -> NULL\n    struct Node* head = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 10;\n    head->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->data = 20;\n    head->next->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->next->data = 30;\n    head->next->next->next = NULL;\n\n    printf(\"=== Singly Linked List: Delete from Beginning ===\\n\");\n    printf(\"Initial list: \");\n    printList(head);\n\n    deleteFromBeginning(&head);\n    printf(\"After 1st deletion: \");\n    printList(head);\n\n    deleteFromBeginning(&head);\n    printf(\"After 2nd deletion: \");\n    printList(head);\n\n    deleteFromBeginning(&head);\n    printf(\"After 3rd deletion: \");\n    printList(head);\n\n    deleteFromBeginning(&head); // Underflow test\n\n    return 0;\n}",
    "sample_input": "List: [10]->[20]->[30]->NULL. Delete 3 times.",
    "sample_output": "=== Singly Linked List: Delete from Beginning ===\nInitial list: [10] -> [20] -> [30] -> NULL\nDeleted node with value: 10\nAfter 1st deletion: [20] -> [30] -> NULL\nDeleted node with value: 20\nAfter 2nd deletion: [30] -> NULL\nDeleted node with value: 30\nAfter 3rd deletion: NULL\nUnderflow! List is already empty.",
    "dry_run": "1. head = [10]->[20]->[30]. temp = 10. head = [20]->[30]. free(temp).\n2. head = [20]->[30]. temp = 20. head = [30]. free(temp).\n3. head = [30]. temp = 30. head = NULL. free(temp).\n4. head = NULL -> Underflow error!",
    "time_complexity": "• Time Complexity: O(1) constant time — Immediate pointer update.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages:\n• O(1) deallocation with no element shifting.\n• Natural mechanism for Stack pop() and Queue dequeue().\n\nDisadvantages:\n• None.",
    "applications": "• Stack pop() operation.\n• Queue dequeue() in FIFO structures.",
    "viva_questions": [
      {
        "q": "What happens if you do head = head->next without saving head in a temporary pointer first?",
        "a": "The original head node becomes unreachable in memory, creating a memory leak because its address is lost and cannot be freed."
      }
    ],
    "edge_cases": "• Empty list (head == NULL): Caught by underflow guard.\n• Single-node list: Leaves head == NULL safely.",
    "diagram": "[ temp: 10 ]  -- (freed)\n      |\n[ head: 20 ] ---> [ 30 ] ---> NULL"
  },
  "sll_delete_end": {
    "id": "sll_delete_end",
    "title": "Singly Linked List — Delete from End",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "delete from end",
      "delete tail linked list",
      "pop back linked list",
      "remove last node"
    ],
    "definition": "Deleting from the end of a singly linked list removes the last node and sets the second-to-last node's next pointer to NULL.",
    "concept_explanation": "To delete the last node, traverse the list until reaching the second-to-last node (temp->next->next == NULL). Free temp->next and set temp->next = NULL. If the list has only 1 node, free head and set head = NULL. Because traversal to the second-to-last node is required, this is an O(n) operation.",
    "algorithm": "Step 1: If head == NULL, report underflow and return.\nStep 2: If head->next == NULL (only one node), free(head), set head = NULL, and return.\nStep 3: Initialize temp = head.\nStep 4: Traverse while temp->next->next != NULL: temp = temp->next.\nStep 5: Free memory: free(temp->next).\nStep 6: Set temp->next = NULL.",
    "pseudocode": "function deleteFromEnd(head):\n    if head == NULL then error(\"Underflow\")\n    if head.next == NULL then:\n        free(head)\n        return NULL\n    temp = head\n    while temp.next.next != NULL do:\n        temp = temp.next\n    free(temp.next)\n    temp.next = NULL\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid deleteFromEnd(struct Node** headRef) {\n    if (*headRef == NULL) {\n        printf(\"Underflow! List is empty.\\n\");\n        return;\n    }\n\n    // Case 1: Single node list\n    if ((*headRef)->next == NULL) {\n        printf(\"Deleted last remaining node: %d\\n\", (*headRef)->data);\n        free(*headRef);\n        *headRef = NULL;\n        return;\n    }\n\n    // Case 2: Traverse to second-to-last node\n    struct Node* temp = *headRef;\n    while (temp->next->next != NULL) {\n        temp = temp->next;\n    }\n\n    printf(\"Deleted last node: %d\\n\", temp->next->data);\n    free(temp->next);\n    temp->next = NULL; // Terminate list\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] -> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* head = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 10;\n    head->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->data = 20;\n    head->next->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->next->data = 30;\n    head->next->next->next = NULL;\n\n    printf(\"=== Singly Linked List: Delete from End ===\\n\");\n    printList(head);\n\n    deleteFromEnd(&head);\n    printList(head);\n\n    deleteFromEnd(&head);\n    printList(head);\n\n    deleteFromEnd(&head);\n    printList(head);\n\n    return 0;\n}",
    "sample_input": "List: [10]->[20]->[30]->NULL",
    "sample_output": "=== Singly Linked List: Delete from End ===\n[10] -> [20] -> [30] -> NULL\nDeleted last node: 30\n[10] -> [20] -> NULL\nDeleted last node: 20\n[10] -> NULL\nDeleted last remaining node: 10\nNULL",
    "dry_run": "Initial: [10]->[20]->[30]->NULL.\n1. temp starts at 10. temp->next->next is 30 (not NULL).\n2. temp moves to 20. temp->next->next is NULL (temp is second-to-last).\n3. free(temp->next) frees 30. temp->next = NULL.\nResult: [10]->[20]->NULL.",
    "time_complexity": "• Time Complexity: O(n) — Must traverse to the (n-1)-th node.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages:\n• Safely deallocates tail node and ensures clean NULL termination.\n\nDisadvantages:\n• O(n) runtime even with a tail pointer, because we cannot move backwards to the second-to-last node in a singly linked list.",
    "applications": "• Trimming buffer histories.\n• Rolling back state in transaction logs.",
    "viva_questions": [
      {
        "q": "Can deleting from the end of a singly linked list be O(1) if we maintain a tail pointer?",
        "a": "No! Even with a tail pointer, we cannot find the second-to-last node in O(1) because pointers are unidirectional. Doubly linked lists solve this."
      }
    ],
    "edge_cases": "• Single node: Clears head to NULL properly without dereferencing temp->next->next.",
    "diagram": "[ 10 | * ] -> [ 20 | NULL ]   (X) [ 30 | NULL ] freed\n                     temp"
  },
  "sll_delete_val": {
    "id": "sll_delete_val",
    "title": "Singly Linked List — Delete a Specific Value",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "delete specific value",
      "delete key linked list",
      "remove value from list",
      "delete node by value"
    ],
    "definition": "Deleting a specific value searches the list for the first node matching a target key and removes it, maintaining list continuity.",
    "concept_explanation": "To delete by value, check if head contains the key. If so, delete head and update head. Otherwise, maintain two pointers: curr (traversing node) and prev (preceding node). When curr->data == key is found, bridge the list by setting prev->next = curr->next, and then free(curr). If the key is not found, output an appropriate message.",
    "algorithm": "Step 1: If head == NULL, list is empty; return.\nStep 2: If head->data == key:\nStep 3:   temp = head, head = head->next, free(temp), return.\nStep 4: Set prev = head and curr = head->next.\nStep 5: While curr != NULL and curr->data != key:\nStep 6:   prev = curr, curr = curr->next.\nStep 7: If curr == NULL, key was not found.\nStep 8: Else: prev->next = curr->next, free(curr).",
    "pseudocode": "function deleteByValue(head, key):\n    if head == NULL then return NULL\n    if head.data == key then:\n        temp = head\n        head = head.next\n        free(temp)\n        return head\n    prev = head\n    curr = head.next\n    while curr != NULL and curr.data != key do:\n        prev = curr\n        curr = curr.next\n    if curr != NULL then:\n        prev.next = curr.next\n        free(curr)\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid deleteByValue(struct Node** headRef, int key) {\n    if (*headRef == NULL) {\n        printf(\"List is empty! Cannot delete %d.\\n\", key);\n        return;\n    }\n\n    struct Node* temp = *headRef;\n\n    // Case 1: Key is in the head node\n    if (temp->data == key) {\n        *headRef = temp->next;\n        free(temp);\n        printf(\"Deleted key %d from head.\\n\", key);\n        return;\n    }\n\n    // Case 2: Search for key maintaining prev pointer\n    struct Node* prev = NULL;\n    while (temp != NULL && temp->data != key) {\n        prev = temp;\n        temp = temp->next;\n    }\n\n    // Key not present in list\n    if (temp == NULL) {\n        printf(\"Key %d not found in the list.\\n\", key);\n        return;\n    }\n\n    // Unlink the node from linked list\n    prev->next = temp->next;\n    free(temp);\n    printf(\"Deleted key %d from list.\\n\", key);\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] -> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* head = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 10;\n    head->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->data = 20;\n    head->next->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->next->data = 30;\n    head->next->next->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->next->next->data = 40;\n    head->next->next->next->next = NULL;\n\n    printf(\"=== Singly Linked List: Delete by Value ===\\n\");\n    printList(head);\n\n    deleteByValue(&head, 30); // Middle node\n    printList(head);\n\n    deleteByValue(&head, 10); // Head node\n    printList(head);\n\n    deleteByValue(&head, 99); // Non-existent key\n\n    // Free remainder\n    while (head != NULL) {\n        struct Node* t = head;\n        head = head->next;\n        free(t);\n    }\n    return 0;\n}",
    "sample_input": "List: [10, 20, 30, 40]. Delete 30, then 10, then 99.",
    "sample_output": "=== Singly Linked List: Delete by Value ===\n[10] -> [20] -> [30] -> [40] -> NULL\nDeleted key 30 from list.\n[10] -> [20] -> [40] -> NULL\nDeleted key 10 from head.\n[20] -> [40] -> NULL\nKey 99 not found in the list.",
    "dry_run": "Delete 30 from [10, 20, 30, 40]:\n• head (10) != 30.\n• prev = 10, temp = 20. 20 != 30.\n• prev = 20, temp = 30. Match!\n• prev->next = temp->next ([40]). free(30).\nResult: [10]->[20]->[40]->NULL.",
    "time_complexity": "• Best Case: O(1) if target is at head.\n• Worst/Average Case: O(n) if key is in the middle, end, or absent.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages:\n• Dynamically removes any element without leaving gaps or requiring shifting.\n\nDisadvantages:\n• Requires O(n) search time to locate key.",
    "applications": "• Deleting a student record by roll number in an academic database.\n• Removing completed process IDs from an active OS process list.",
    "viva_questions": [
      {
        "q": "Why do we need a prev pointer when deleting a node from a singly linked list?",
        "a": "Because singly linked list pointers are unidirectional. To remove node curr, we must adjust prev->next to bypass curr; without prev, we cannot access the preceding node."
      }
    ],
    "edge_cases": "• Key in head node: Handled separately.\n• Key absent: Traversal reaches NULL, reports error safely.",
    "diagram": "[ prev: 20 ] --------(bypass)-------> [ 40 ]\n       \\                                ^\n        \\---> [ curr: 30 (freed) ] ----/"
  },
  "sll_delete_pos": {
    "id": "sll_delete_pos",
    "title": "Singly Linked List — Delete from Specific Position",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "delete at position",
      "delete from index",
      "delete specific position linked list"
    ],
    "definition": "Deleting from a specific position removes the node at 1-based index pos in the linked list, updating surrounding pointers.",
    "concept_explanation": "To delete at index pos, if pos == 1, delete from beginning. Otherwise, traverse pos - 2 steps to reach the node immediately preceding the target. Save target node in temp = prev->next, update prev->next = temp->next, and call free(temp). If pos exceeds list length, an invalid position error is displayed.",
    "algorithm": "Step 1: If head == NULL, return underflow.\nStep 2: If pos == 1, temp = head, head = head->next, free(temp), return.\nStep 3: Set prev = head.\nStep 4: For i = 1 to pos - 2: prev = prev->next (if prev == NULL or prev->next == NULL, position is invalid).\nStep 5: Set temp = prev->next.\nStep 6: Set prev->next = temp->next.\nStep 7: free(temp).",
    "pseudocode": "function deleteAtPosition(head, pos):\n    if head == NULL then error(\"Empty\")\n    if pos == 1 then:\n        temp = head\n        head = head.next\n        free(temp)\n        return head\n    prev = head\n    for i from 1 to pos - 2 do:\n        if prev == NULL or prev.next == NULL then error(\"Out of bounds\")\n        prev = prev.next\n    temp = prev.next\n    prev.next = temp.next\n    free(temp)\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid deleteAtPosition(struct Node** headRef, int pos) {\n    if (*headRef == NULL || pos < 1) {\n        printf(\"Invalid deletion position or empty list!\\n\");\n        return;\n    }\n\n    struct Node* temp = *headRef;\n\n    // Case 1: Delete head\n    if (pos == 1) {\n        *headRef = temp->next;\n        free(temp);\n        printf(\"Deleted node at position 1.\\n\");\n        return;\n    }\n\n    // Traverse to node at position pos - 1\n    for (int i = 1; temp != NULL && i < pos - 1; i++) {\n        temp = temp->next;\n    }\n\n    if (temp == NULL || temp->next == NULL) {\n        printf(\"Position %d exceeds list length!\\n\", pos);\n        return;\n    }\n\n    // Node temp->next is to be deleted\n    struct Node* nodeToDelete = temp->next;\n    temp->next = nodeToDelete->next;\n    free(nodeToDelete);\n    printf(\"Deleted node at position %d.\\n\", pos);\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] -> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* head = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 10;\n    head->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->data = 20;\n    head->next->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->next->data = 30;\n    head->next->next->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->next->next->data = 40;\n    head->next->next->next->next = NULL;\n\n    printf(\"=== Singly Linked List: Delete at Position ===\\n\");\n    printList(head);\n\n    deleteAtPosition(&head, 2); // Delete position 2 (value 20)\n    printList(head);\n\n    deleteAtPosition(&head, 1); // Delete position 1 (value 10)\n    printList(head);\n\n    deleteAtPosition(&head, 99); // Out of bounds\n\n    while (head != NULL) {\n        struct Node* t = head;\n        head = head->next;\n        free(t);\n    }\n    return 0;\n}",
    "sample_input": "List: [10, 20, 30, 40]. Delete at pos 2, pos 1, pos 99.",
    "sample_output": "=== Singly Linked List: Delete at Position ===\n[10] -> [20] -> [30] -> [40] -> NULL\nDeleted node at position 2.\n[10] -> [30] -> [40] -> NULL\nDeleted node at position 1.\n[30] -> [40] -> NULL\nPosition 99 exceeds list length!",
    "dry_run": "Delete at pos 2 from [10, 20, 30, 40]:\n• pos = 2 -> loop i=1 to pos-2 does not run. temp = 10.\n• nodeToDelete = temp->next = 20.\n• temp->next = nodeToDelete->next = 30.\n• free(20).\nResult: [10]->[30]->[40]->NULL.",
    "time_complexity": "• Best Case: O(1) for pos == 1.\n• Worst Case: O(pos) to traverse to position pos - 1.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages:\n• Precise removal of indexed items without array copying.\n\nDisadvantages:\n• Requires linear traversal to find the node.",
    "applications": "• Removing an item from a specific user-selected index in a UI menu.",
    "viva_questions": [
      {
        "q": "What boundary condition must be checked when deleting by position?",
        "a": "We must verify temp != NULL and temp->next != NULL to prevent NULL pointer dereferencing when pos exceeds list length."
      }
    ],
    "edge_cases": "• pos == 1: Properly handled by updating head.\n• pos > length: Safely caught with no crashes.",
    "diagram": "[ temp (pos-1): 10 ] ---------> [ pos+1: 30 ]\n           \\                      ^\n            \\-> [ pos: 20 (freed) ]/"
  },
  "sll_display": {
    "id": "sll_display",
    "title": "Singly Linked List — Display / Traverse",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "display linked list",
      "traverse linked list",
      "print linked list",
      "print elements"
    ],
    "definition": "Display or Traversal sequentially visits every node of a singly linked list from head to tail, printing or processing the data field of each node.",
    "concept_explanation": "Traversal starts with a pointer ptr initialized to head. A while loop checks ptr != NULL. In each iteration, ptr->data is accessed and printed, and ptr is updated to ptr = ptr->next. The loop terminates when ptr becomes NULL, guaranteeing that every element is visited exactly once in O(n) time.",
    "algorithm": "Step 1: Set ptr = head.\nStep 2: If ptr == NULL, print \"List is empty\" and exit.\nStep 3: While ptr != NULL:\nStep 4:   Print ptr->data.\nStep 5:   Set ptr = ptr->next.\nStep 6: Print \"NULL\" to denote list termination.",
    "pseudocode": "function display(head):\n    ptr = head\n    while ptr != NULL do:\n        print(ptr.data)\n        ptr = ptr.next",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid displayList(struct Node* head) {\n    if (head == NULL) {\n        printf(\"List is empty! (NULL)\\n\");\n        return;\n    }\n    struct Node* ptr = head;\n    printf(\"List elements: \");\n    while (ptr != NULL) {\n        printf(\"[%d] -> \", ptr->data);\n        ptr = ptr->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* head = NULL;\n    displayList(head); // Empty test\n\n    // Create 3-node list\n    head = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 100;\n    head->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->data = 200;\n    head->next->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->next->data = 300;\n    head->next->next->next = NULL;\n\n    displayList(head);\n\n    while (head != NULL) {\n        struct Node* t = head;\n        head = head->next;\n        free(t);\n    }\n    return 0;\n}",
    "sample_input": "List with 100, 200, 300",
    "sample_output": "List is empty! (NULL)\nList elements: [100] -> [200] -> [300] -> NULL",
    "dry_run": "ptr = 100: prints 100 -> ptr becomes 200\nptr = 200: prints 200 -> ptr becomes 300\nptr = 300: prints 300 -> ptr becomes NULL -> Loop ends.",
    "time_complexity": "• Time Complexity: O(n) — Each of the n nodes is visited exactly once.",
    "space_complexity": "• O(1) auxiliary space — Uses a single pointer variable.",
    "advantages_disadvantages": "Advantages:\n• Simple, non-destructive sequential inspection.\n\nDisadvantages:\n• Cannot jump or traverse backwards.",
    "applications": "• Printing inventory, serializing linked lists to disk or network sockets.",
    "viva_questions": [
      {
        "q": "Why does the traversal loop check ptr != NULL instead of ptr->next != NULL?",
        "a": "Checking ptr != NULL processes the last node as well. Checking ptr->next != NULL would stop before printing the final node."
      }
    ],
    "edge_cases": "• Empty list (head == NULL): Prints \"List is empty\" without crash.",
    "diagram": "ptr: [ 100 | * ] ===> [ 200 | * ] ===> [ 300 | * ] ===> NULL"
  },
  "sll_search": {
    "id": "sll_search",
    "title": "Singly Linked List — Search an Element",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "search linked list",
      "find node",
      "search element linked list",
      "locate key linked list"
    ],
    "definition": "Searching in a singly linked list sequentially checks each node's data against a target key, returning its 1-based position or -1 if absent.",
    "concept_explanation": "Because linked list nodes are distributed across arbitrary heap locations, binary search cannot be applied. Linear traversal inspects each node. A counter pos tracks the 1-based index. If curr->data == key, pos is returned. If curr reaches NULL, the key is absent.",
    "algorithm": "Step 1: Set curr = head and pos = 1.\nStep 2: While curr != NULL:\nStep 3:   If curr->data == key, return pos (Found).\nStep 4:   curr = curr->next, pos = pos + 1.\nStep 5: Return -1 (Not Found).",
    "pseudocode": "function search(head, key):\n    curr = head\n    pos = 1\n    while curr != NULL do:\n        if curr.data == key then:\n            return pos\n        curr = curr.next\n        pos = pos + 1\n    return -1",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint searchElement(struct Node* head, int key) {\n    struct Node* curr = head;\n    int pos = 1;\n    while (curr != NULL) {\n        if (curr->data == key) {\n            return pos; // 1-based position found\n        }\n        curr = curr->next;\n        pos++;\n    }\n    return -1; // Not found\n}\n\nint main(void) {\n    struct Node* head = (struct Node*)malloc(sizeof(struct Node));\n    head->data = 15;\n    head->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->data = 30;\n    head->next->next = (struct Node*)malloc(sizeof(struct Node));\n    head->next->next->data = 45;\n    head->next->next->next = NULL;\n\n    printf(\"=== Singly Linked List: Search Element ===\\n\");\n    int key1 = 30;\n    int pos1 = searchElement(head, key1);\n    printf(\"Search for %d: %s (Position %d)\\n\", key1, pos1 != -1 ? \"FOUND\" : \"NOT FOUND\", pos1);\n\n    int key2 = 99;\n    int pos2 = searchElement(head, key2);\n    printf(\"Search for %d: %s\\n\", key2, pos2 != -1 ? \"FOUND\" : \"NOT FOUND\");\n\n    while (head != NULL) {\n        struct Node* t = head;\n        head = head->next;\n        free(t);\n    }\n    return 0;\n}",
    "sample_input": "List: [15, 30, 45]. Keys: 30, 99",
    "sample_output": "=== Singly Linked List: Search Element ===\nSearch for 30: FOUND (Position 2)\nSearch for 99: NOT FOUND",
    "dry_run": "Search 30:\n• curr = 15 (pos=1): 15 != 30 -> curr = 30, pos = 2.\n• curr = 30 (pos=2): 30 == 30 -> Return 2.",
    "time_complexity": "• Best Case: O(1) if target is at head.\n• Worst/Average Case: O(n) if at end or absent.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages:\n• Simple to implement.\n\nDisadvantages:\n• Cannot utilize binary search; always O(n).",
    "applications": "• Checking membership in linked symbol tables.",
    "viva_questions": [
      {
        "q": "Can binary search be used on a sorted singly linked list?",
        "a": "No, because finding the midpoint requires traversing O(n/2) nodes, making binary search run in O(n) time on linked lists."
      }
    ],
    "edge_cases": "• Empty list returns -1 safely.",
    "diagram": "[ 15 ] -> [ 30 ] (MATCH at pos 2) -> [ 45 ] -> NULL"
  },
  "sll_count": {
    "id": "sll_count",
    "title": "Singly Linked List — Count Nodes",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "count nodes",
      "length of linked list",
      "size of linked list",
      "number of nodes"
    ],
    "definition": "Counting nodes calculates the total length of the singly linked list by sequentially incrementing a counter until the terminating NULL pointer is reached.",
    "concept_explanation": "A counter count is initialized to 0. A pointer curr begins at head. In each step of a while loop, count is incremented by 1 and curr advances to curr->next. When curr is NULL, count contains the total number of nodes.",
    "algorithm": "Step 1: Set count = 0.\nStep 2: Set curr = head.\nStep 3: While curr != NULL:\nStep 4:   count = count + 1.\nStep 5:   curr = curr->next.\nStep 6: Return count.",
    "pseudocode": "function countNodes(head):\n    count = 0\n    curr = head\n    while curr != NULL do:\n        count = count + 1\n        curr = curr.next\n    return count",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\n// Iterative count\nint getCount(struct Node* head) {\n    int count = 0;\n    struct Node* curr = head;\n    while (curr != NULL) {\n        count++;\n        curr = curr->next;\n    }\n    return count;\n}\n\n// Recursive count\nint getCountRecursive(struct Node* head) {\n    if (head == NULL) return 0;\n    return 1 + getCountRecursive(head->next);\n}\n\nint main(void) {\n    struct Node* head = NULL;\n    printf(\"=== Singly Linked List: Count Nodes ===\\n\");\n    printf(\"Empty list count: %d\\n\", getCount(head));\n\n    // Build list: 5 -> 10 -> 15 -> 20\n    for (int i = 4; i >= 1; i--) {\n        struct Node* n = (struct Node*)malloc(sizeof(struct Node));\n        n->data = i * 5;\n        n->next = head;\n        head = n;\n    }\n\n    printf(\"Iterative node count: %d\\n\", getCount(head));\n    printf(\"Recursive node count: %d\\n\", getCountRecursive(head));\n\n    while (head != NULL) {\n        struct Node* t = head;\n        head = head->next;\n        free(t);\n    }\n    return 0;\n}",
    "sample_input": "List with 4 nodes: [5, 10, 15, 20]",
    "sample_output": "=== Singly Linked List: Count Nodes ===\nEmpty list count: 0\nIterative node count: 4\nRecursive node count: 4",
    "dry_run": "curr: 5 (count=1) -> 10 (count=2) -> 15 (count=3) -> 20 (count=4) -> NULL (terminates). Total = 4.",
    "time_complexity": "• Time Complexity: O(n) — visits every node once.",
    "space_complexity": "• Iterative: O(1).\n• Recursive: O(n) stack space.",
    "advantages_disadvantages": "Advantages:\n• Reliable length computation.\n\nDisadvantages:\n• O(n) cost unless list maintains an updated size field in a wrapper struct.",
    "applications": "• Validating position parameters before insertion/deletion.",
    "viva_questions": [
      {
        "q": "How can node counting be made O(1)?",
        "a": "By maintaining an integer variable size in a wrapper struct (e.g. struct LinkedList { Node* head; int size; }) that increments on insert and decrements on delete."
      }
    ],
    "edge_cases": "• Empty list returns 0 immediately.",
    "diagram": "[ 5 ] -> [ 10 ] -> [ 15 ] -> [ 20 ] -> NULL  ==> Count = 4"
  },
  "sll_reverse": {
    "id": "sll_reverse",
    "title": "Singly Linked List — Reverse a Linked List",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "reverse linked list",
      "invert linked list",
      "reverse singly linked list",
      "reverse list 3 pointers"
    ],
    "definition": "Reversing a singly linked list inverts the direction of all next pointers so that the tail node becomes the new head, executed in O(n) time and O(1) auxiliary space using 3 pointers.",
    "concept_explanation": "The standard iterative reversal uses three sliding pointers: prev (starts NULL), curr (starts head), and next (tracks next node). In each step: 1) Save next = curr->next. 2) Invert the pointer: curr->next = prev. 3) Advance prev = curr. 4) Advance curr = next. When curr becomes NULL, prev points to the newly inverted head node.",
    "algorithm": "Step 1: Initialize prev = NULL, curr = head, next = NULL.\nStep 2: While curr != NULL:\nStep 3:   next = curr->next (save next node).\nStep 4:   curr->next = prev (invert link).\nStep 5:   prev = curr (advance prev).\nStep 6:   curr = next (advance curr).\nStep 7: Set head = prev.\nStep 8: Return updated head.",
    "pseudocode": "function reverse(head):\n    prev = NULL\n    curr = head\n    while curr != NULL do:\n        next = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next\n    return prev",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\n// Iterative 3-pointer reversal\nstruct Node* reverseList(struct Node* head) {\n    struct Node* prev = NULL;\n    struct Node* curr = head;\n    struct Node* next = NULL;\n\n    while (curr != NULL) {\n        next = curr->next; // Store next node\n        curr->next = prev; // Reverse current node's pointer\n        prev = curr;       // Move prev forward\n        curr = next;       // Move curr forward\n    }\n    return prev; // prev is the new head\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] -> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    // Create list: [1] -> [2] -> [3] -> [4] -> NULL\n    struct Node* head = NULL;\n    for (int i = 4; i >= 1; i--) {\n        struct Node* n = (struct Node*)malloc(sizeof(struct Node));\n        n->data = i;\n        n->next = head;\n        head = n;\n    }\n\n    printf(\"=== Singly Linked List: Reverse ===\\n\");\n    printf(\"Original list: \");\n    printList(head);\n\n    head = reverseList(head);\n\n    printf(\"Reversed list: \");\n    printList(head);\n\n    while (head != NULL) {\n        struct Node* t = head;\n        head = head->next;\n        free(t);\n    }\n    return 0;\n}",
    "sample_input": "List: [1] -> [2] -> [3] -> [4] -> NULL",
    "sample_output": "=== Singly Linked List: Reverse ===\nOriginal list: [1] -> [2] -> [3] -> [4] -> NULL\nReversed list: [4] -> [3] -> [2] -> [1] -> NULL",
    "dry_run": "Initial: prev = NULL, curr = [1]->[2]->[3]->[4]\n• Iter 1: next = 2. curr->next = NULL. prev = 1. curr = 2. List: [1]->NULL\n• Iter 2: next = 3. curr->next = 1. prev = 2. curr = 3. List: [2]->[1]->NULL\n• Iter 3: next = 4. curr->next = 2. prev = 3. curr = 4. List: [3]->[2]->[1]->NULL\n• Iter 4: next = NULL. curr->next = 3. prev = 4. curr = NULL.\nLoop terminates. New head is prev = [4]->[3]->[2]->[1]->NULL.",
    "time_complexity": "• Time Complexity: O(n) — single pass through the list.",
    "space_complexity": "• Auxiliary Space: O(1) in-place — only 3 scalar pointers used.",
    "advantages_disadvantages": "Advantages:\n• Pure in-place pointer reversal; zero memory allocation.\n\nDisadvantages:\n• Destructive: Modifies original structure.",
    "applications": "• Reversing polynomials and big numbers represented as linked lists.\n• Testing palindrome linked lists.",
    "viva_questions": [
      {
        "q": "How many pointers are required to reverse a singly linked list iteratively?",
        "a": "Three pointers: prev, curr, and next."
      }
    ],
    "edge_cases": "• Empty list (head == NULL): Returns NULL.\n• Single-node list: Remains unchanged safely.",
    "diagram": "Before: [ 1 ] ---> [ 2 ] ---> [ 3 ] ---> NULL\nAfter:  NULL <--- [ 1 ] <--- [ 2 ] <--- [ 3 ] (head)"
  },
  "dll_create": {
    "id": "dll_create",
    "title": "Doubly Linked List — Creation & Structure",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "create doubly linked list",
      "dll create",
      "struct dnode",
      "prev next pointer c"
    ],
    "definition": "A Doubly Linked List (DLL) is a linear data structure where each node contains three fields: data, a next pointer pointing to the successor, and a prev pointer pointing to the predecessor, enabling bidirectional traversal.",
    "concept_explanation": "Doubly linked lists overcome the primary limitation of singly linked lists by allowing bidirectional movement. In a DLL node, prev points backwards and next points forwards. For the first node, prev is NULL; for the last node, next is NULL. This allows O(1) deletion when a node pointer is given and bidirectional traversal.",
    "algorithm": "Step 1: Define struct Node with int data, struct Node* prev, struct Node* next.\nStep 2: Allocate memory using malloc(sizeof(struct Node)).\nStep 3: Assign newNode->data = val, newNode->prev = NULL, newNode->next = NULL.\nStep 4: Return newNode.",
    "pseudocode": "struct Node:\n    data: Integer\n    prev: Pointer to Node\n    next: Pointer to Node\n\nfunction createNode(val):\n    newNode = allocate(Node)\n    newNode.data = val\n    newNode.prev = NULL\n    newNode.next = NULL\n    return newNode",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* prev;\n    struct Node* next;\n};\n\nstruct Node* createNode(int val) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->prev = NULL;\n    newNode->next = NULL;\n    return newNode;\n}\n\nint main(void) {\n    printf(\"=== Doubly Linked List Creation ===\\n\");\n    struct Node* n1 = createNode(10);\n    struct Node* n2 = createNode(20);\n    struct Node* n3 = createNode(30);\n\n    // Link nodes together\n    n1->next = n2;\n    n2->prev = n1;\n    n2->next = n3;\n    n3->prev = n2;\n\n    printf(\"Forward traversal: \");\n    struct Node* temp = n1;\n    while (temp != NULL) {\n        printf(\"[%d] <-> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n\n    // Clean up\n    free(n1); free(n2); free(n3);\n    return 0;\n}",
    "sample_input": "Values: 10, 20, 30",
    "sample_output": "=== Doubly Linked List Creation ===\nForward traversal: [10] <-> [20] <-> [30] <-> NULL",
    "dry_run": "n1: prev=NULL, next=n2. n2: prev=n1, next=n3. n3: prev=n2, next=NULL. Bilateral links formed.",
    "time_complexity": "• Creation per node: O(1).",
    "space_complexity": "• O(1) auxiliary per node. Total O(n). Extra pointer (prev) costs 8 bytes per node on 64-bit systems.",
    "advantages_disadvantages": "Advantages:\n• Bidirectional traversal (forward and backward).\n• Deletion of a given node in O(1) without requiring preceding node traversal.\n\nDisadvantages:\n• Higher memory overhead (2 pointers per node instead of 1).\n• More pointer assignments to maintain during insert/delete.",
    "applications": "• Web browser back and forward button navigation.\n• LRU (Least Recently Used) cache implementation.\n• Media player playlist next/previous track switching.",
    "viva_questions": [
      {
        "q": "What is the main advantage of a doubly linked list over a singly linked list?",
        "a": "It allows traversal in both directions and enables deleting a given node in O(1) time without searching for its predecessor."
      }
    ],
    "edge_cases": "• Empty DLL: head == NULL.",
    "diagram": "NULL <--- [ prev | 10 | next ] <===> [ prev | 20 | next ] ---> NULL"
  },
  "dll_insert_beginning": {
    "id": "dll_insert_beginning",
    "title": "Doubly Linked List — Insert at Beginning",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll insert at beginning",
      "dll insert head",
      "doubly linked list prepend"
    ],
    "definition": "Inserts a new node at the beginning of a doubly linked list and updates the former head's prev pointer in O(1) time.",
    "concept_explanation": "Allocate newNode. Set newNode->next = head and newNode->prev = NULL. If head != NULL, set head->prev = newNode. Then update head = newNode. Executes in O(1) time.",
    "algorithm": "Step 1: Allocate newNode with value.\nStep 2: Set newNode->prev = NULL, newNode->next = *headRef.\nStep 3: If *headRef != NULL, set (*headRef)->prev = newNode.\nStep 4: Set *headRef = newNode.",
    "pseudocode": "function insertAtBeginning(head, val):\n    newNode = allocate(Node, val)\n    newNode.next = head\n    newNode.prev = NULL\n    if head != NULL then:\n        head.prev = newNode\n    head = newNode\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* prev;\n    struct Node* next;\n};\n\nvoid insertAtBeginning(struct Node** headRef, int val) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->prev = NULL;\n    newNode->next = *headRef;\n\n    if (*headRef != NULL) {\n        (*headRef)->prev = newNode;\n    }\n    *headRef = newNode;\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] <-> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* head = NULL;\n    printf(\"=== Doubly Linked List: Insert at Beginning ===\\n\");\n\n    insertAtBeginning(&head, 30);\n    insertAtBeginning(&head, 20);\n    insertAtBeginning(&head, 10);\n\n    printList(head);\n\n    while (head != NULL) {\n        struct Node* t = head;\n        head = head->next;\n        free(t);\n    }\n    return 0;\n}",
    "sample_input": "Insert 30, then 20, then 10 at head",
    "sample_output": "=== Doubly Linked List: Insert at Beginning ===\n[10] <-> [20] <-> [30] <-> NULL",
    "dry_run": "1. insert(30): head is NULL -> [30].\n2. insert(20): newNode->next=30, 30->prev=20. head=20.\n3. insert(10): newNode->next=20, 20->prev=10. head=10.",
    "time_complexity": "• Time Complexity: O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages: Instantaneous O(1) prepend. Disadvantages: Requires 4 pointer operations.",
    "applications": "• Most recently visited cache inserts.",
    "viva_questions": [
      {
        "q": "How many pointer updates occur when inserting at the head of a DLL?",
        "a": "Up to 4 pointer assignments: newNode->prev, newNode->next, head->prev, and head pointer."
      }
    ],
    "edge_cases": "• Empty DLL: Handled by if (*headRef != NULL) guard.",
    "diagram": "[ newNode: 10 ] <===> [ head: 20 ] <===> [ 30 ]"
  },
  "dll_insert_end": {
    "id": "dll_insert_end",
    "title": "Doubly Linked List — Insert at End",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll insert at end",
      "dll append",
      "doubly linked list append"
    ],
    "definition": "Appends a new node to the tail of a doubly linked list, connecting bidirectional links with the former last node.",
    "concept_explanation": "Traverse to the last node (temp->next == NULL). Set temp->next = newNode and newNode->prev = temp. Set newNode->next = NULL. If list was empty, newNode becomes head. O(n) without tail pointer; O(1) with tail pointer.",
    "algorithm": "Step 1: Allocate newNode with value and newNode->next = NULL.\nStep 2: If head == NULL, set newNode->prev = NULL, head = newNode, return.\nStep 3: Traverse to last node temp.\nStep 4: Set temp->next = newNode, newNode->prev = temp.",
    "pseudocode": "function insertAtEnd(head, val):\n    newNode = allocate(Node, val)\n    newNode.next = NULL\n    if head == NULL then:\n        newNode.prev = NULL\n        return newNode\n    temp = head\n    while temp.next != NULL do: temp = temp.next\n    temp.next = newNode\n    newNode.prev = temp\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* prev;\n    struct Node* next;\n};\n\nvoid insertAtEnd(struct Node** headRef, int val) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->next = NULL;\n\n    if (*headRef == NULL) {\n        newNode->prev = NULL;\n        *headRef = newNode;\n        return;\n    }\n\n    struct Node* temp = *headRef;\n    while (temp->next != NULL) {\n        temp = temp->next;\n    }\n    temp->next = newNode;\n    newNode->prev = temp;\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] <-> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* head = NULL;\n    printf(\"=== Doubly Linked List: Insert at End ===\\n\");\n    insertAtEnd(&head, 10);\n    insertAtEnd(&head, 20);\n    insertAtEnd(&head, 30);\n    printList(head);\n\n    while (head != NULL) {\n        struct Node* t = head;\n        head = head->next;\n        free(t);\n    }\n    return 0;\n}",
    "sample_input": "Append: 10, 20, 30",
    "sample_output": "=== Doubly Linked List: Insert at End ===\n[10] <-> [20] <-> [30] <-> NULL",
    "dry_run": "temp walks to 20. temp->next = 30. 30->prev = 20. 30->next = NULL.",
    "time_complexity": "• O(n) without tail pointer; O(1) with tail pointer.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages: Natural FIFO append.",
    "applications": "• Double-ended queue (Deque) tail insertion.",
    "viva_questions": [
      {
        "q": "Why is maintaining a tail pointer useful in a DLL?",
        "a": "It enables O(1) append and O(1) pop from the end without traversing."
      }
    ],
    "edge_cases": "• Empty list handled safely.",
    "diagram": "[ 20 ] <===> [ temp: 30 ] <===> [ newNode: 40 ] ---> NULL"
  },
  "dll_insert_pos": {
    "id": "dll_insert_pos",
    "title": "Doubly Linked List — Insert at a Specific Position",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll insert position",
      "dll insert index",
      "doubly linked list insert middle"
    ],
    "definition": "Inserts a node at 1-based index pos in a doubly linked list, updating 4 surrounding pointers (prev and next links).",
    "concept_explanation": "Traverse pos - 2 steps to node temp. The new node will be inserted between temp and temp->next. Set newNode->next = temp->next, newNode->prev = temp, temp->next->prev = newNode (if temp->next != NULL), and temp->next = newNode. If pos == 1, delegates to insertAtBeginning.",
    "algorithm": "Step 1: If pos == 1, insert at beginning.\nStep 2: Traverse to temp at pos - 1.\nStep 3: Allocate newNode.\nStep 4: Set newNode->next = temp->next, newNode->prev = temp.\nStep 5: If temp->next != NULL, set temp->next->prev = newNode.\nStep 6: Set temp->next = newNode.",
    "pseudocode": "function insertAtPosition(head, pos, val):\n    if pos == 1 then return insertAtBeginning(head, val)\n    temp = head\n    for i from 1 to pos - 2 do: temp = temp.next\n    newNode = allocate(Node, val)\n    newNode.next = temp.next\n    newNode.prev = temp\n    if temp.next != NULL then temp.next.prev = newNode\n    temp.next = newNode\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* prev;\n    struct Node* next;\n};\n\nvoid insertAtPos(struct Node** headRef, int val, int pos) {\n    if (pos < 1) return;\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = val;\n\n    if (pos == 1) {\n        newNode->prev = NULL;\n        newNode->next = *headRef;\n        if (*headRef != NULL) (*headRef)->prev = newNode;\n        *headRef = newNode;\n        return;\n    }\n\n    struct Node* temp = *headRef;\n    for (int i = 1; i < pos - 1 && temp != NULL; i++) {\n        temp = temp->next;\n    }\n\n    if (temp == NULL) {\n        printf(\"Position %d out of bounds!\\n\", pos);\n        free(newNode);\n        return;\n    }\n\n    newNode->next = temp->next;\n    newNode->prev = temp;\n    if (temp->next != NULL) {\n        temp->next->prev = newNode;\n    }\n    temp->next = newNode;\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] <-> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* head = NULL;\n    printf(\"=== Doubly Linked List: Insert at Position ===\\n\");\n    insertAtPos(&head, 10, 1);\n    insertAtPos(&head, 30, 2);\n    insertAtPos(&head, 20, 2); // Insert 20 at position 2\n    printList(head);\n\n    while (head != NULL) {\n        struct Node* t = head;\n        head = head->next;\n        free(t);\n    }\n    return 0;\n}",
    "sample_input": "Insert 10 at 1, 30 at 2, 20 at 2",
    "sample_output": "=== Doubly Linked List: Insert at Position ===\n[10] <-> [20] <-> [30] <-> NULL",
    "dry_run": "temp is 10. temp->next is 30. newNode(20)->next = 30. 20->prev = 10. 30->prev = 20. 10->next = 20.",
    "time_complexity": "• O(pos) time. O(1) auxiliary space.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Advantages: Bilateral link integrity preserved.",
    "applications": "• Inserting playlist track at a specific index.",
    "viva_questions": [
      {
        "q": "How many pointer adjustments are required to insert into the middle of a DLL?",
        "a": "Four pointer adjustments: newNode->next, newNode->prev, temp->next->prev, and temp->next."
      }
    ],
    "edge_cases": "• Insertion at tail (temp->next == NULL): Guard prevents dereferencing NULL->prev.",
    "diagram": "[ temp: 10 ] <==========> [ 30 ]\n       ^\\                     /^\n         \\-> [ newNode: 20 ] -/"
  },
  "dll_delete_beginning": {
    "id": "dll_delete_beginning",
    "title": "Doubly Linked List — Delete from Beginning",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll delete beginning",
      "dll delete head",
      "doubly linked list pop front"
    ],
    "definition": "Removes the first node of a doubly linked list, updates head to the second node, and sets the new head's prev pointer to NULL.",
    "concept_explanation": "If head is NULL, return underflow. Otherwise store temp = head, update head = head->next. If head != NULL, set head->prev = NULL. Finally, free(temp). Executes in O(1) time.",
    "algorithm": "Step 1: If head == NULL, return underflow.\nStep 2: Store temp = head.\nStep 3: Update head = head->next.\nStep 4: If head != NULL, set head->prev = NULL.\nStep 5: Free temp.",
    "pseudocode": "function deleteFromBeginning(head):\n    if head == NULL then error(\"Underflow\")\n    temp = head\n    head = head.next\n    if head != NULL then head.prev = NULL\n    free(temp)\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* prev;\n    struct Node* next;\n};\n\nvoid deleteBeginning(struct Node** headRef) {\n    if (*headRef == NULL) {\n        printf(\"Underflow! DLL is empty.\\n\");\n        return;\n    }\n    struct Node* temp = *headRef;\n    *headRef = (*headRef)->next;\n    if (*headRef != NULL) {\n        (*headRef)->prev = NULL;\n    }\n    printf(\"Deleted: %d\\n\", temp->data);\n    free(temp);\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] <-> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));\n    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));\n    n1->data = 10; n1->prev = NULL; n1->next = n2;\n    n2->data = 20; n2->prev = n1; n2->next = NULL;\n    struct Node* head = n1;\n\n    printf(\"=== Doubly Linked List: Delete from Beginning ===\\n\");\n    printList(head);\n    deleteBeginning(&head);\n    printList(head);\n    deleteBeginning(&head);\n    printList(head);\n\n    return 0;\n}",
    "sample_input": "DLL: [10] <-> [20] <-> NULL. Delete twice.",
    "sample_output": "=== Doubly Linked List: Delete from Beginning ===\n[10] <-> [20] <-> NULL\nDeleted: 10\n[20] <-> NULL\nDeleted: 20\nNULL",
    "dry_run": "temp = 10. head = 20. 20->prev = NULL. free(10). List: [20]->NULL.",
    "time_complexity": "• Time Complexity: O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages: Instant O(1) removal. Disadvantages: None.",
    "applications": "• Deque pop_front().",
    "viva_questions": [
      {
        "q": "Why must head->prev be set to NULL after deleting the first node?",
        "a": "Because the new head has no predecessor; leaving a dangling pointer causes undefined behavior."
      }
    ],
    "edge_cases": "• Single node list: Leaves head == NULL safely without dereferencing head->prev.",
    "diagram": "(freed) [ 10 ]  x-- [ head: 20 ] <===> [ 30 ]"
  },
  "dll_delete_end": {
    "id": "dll_delete_end",
    "title": "Doubly Linked List — Delete from End",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll delete end",
      "dll delete tail",
      "doubly linked list pop back"
    ],
    "definition": "Removes the last node of a doubly linked list and sets the predecessor's next pointer to NULL in O(n) without tail pointer or O(1) with tail pointer.",
    "concept_explanation": "Traverse to the last node temp (temp->next == NULL). Set temp->prev->next = NULL. Then free(temp). If only one node exists, free head and set head = NULL.",
    "algorithm": "Step 1: If head == NULL, return underflow.\nStep 2: If head->next == NULL, free(head), head = NULL, return.\nStep 3: Traverse to last node temp.\nStep 4: Set temp->prev->next = NULL.\nStep 5: Free temp.",
    "pseudocode": "function deleteFromEnd(head):\n    if head == NULL then return NULL\n    if head.next == NULL then:\n        free(head)\n        return NULL\n    temp = head\n    while temp.next != NULL do: temp = temp.next\n    temp.prev.next = NULL\n    free(temp)\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* prev;\n    struct Node* next;\n};\n\nvoid deleteEnd(struct Node** headRef) {\n    if (*headRef == NULL) {\n        printf(\"Underflow!\\n\");\n        return;\n    }\n    struct Node* temp = *headRef;\n    if (temp->next == NULL) {\n        printf(\"Deleted only node: %d\\n\", temp->data);\n        free(temp);\n        *headRef = NULL;\n        return;\n    }\n    while (temp->next != NULL) {\n        temp = temp->next;\n    }\n    printf(\"Deleted last node: %d\\n\", temp->data);\n    temp->prev->next = NULL;\n    free(temp);\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] <-> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));\n    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));\n    n1->data = 10; n1->prev = NULL; n1->next = n2;\n    n2->data = 20; n2->prev = n1; n2->next = NULL;\n    struct Node* head = n1;\n\n    printf(\"=== Doubly Linked List: Delete from End ===\\n\");\n    printList(head);\n    deleteEnd(&head);\n    printList(head);\n    deleteEnd(&head);\n    printList(head);\n\n    return 0;\n}",
    "sample_input": "DLL: [10] <-> [20]. Delete twice.",
    "sample_output": "=== Doubly Linked List: Delete from End ===\n[10] <-> [20] <-> NULL\nDeleted last node: 20\n[10] <-> NULL\nDeleted only node: 10\nNULL",
    "dry_run": "temp walks to 20. 20->prev is 10. 10->next = NULL. free(20).",
    "time_complexity": "• O(n) without tail pointer; O(1) with tail pointer.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages: Clean tail removal with prev pointer.",
    "applications": "• Deque pop_back().",
    "viva_questions": [
      {
        "q": "Why is delete from end O(1) in a DLL with tail pointer, but O(n) in a SLL with tail pointer?",
        "a": "Because a DLL tail node can access its predecessor directly via tail->prev, whereas SLL cannot move backwards."
      }
    ],
    "edge_cases": "• Single node handled safely.",
    "diagram": "[ 10 | next: NULL ] <===x=== [ temp: 20 (freed) ]"
  },
  "dll_delete_node": {
    "id": "dll_delete_node",
    "title": "Doubly Linked List — Delete a Specific Node",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll delete specific node",
      "dll delete node pointer",
      "doubly linked list delete node"
    ],
    "definition": "Deletes a given node pointer del from a doubly linked list in O(1) time without requiring list traversal.",
    "concept_explanation": "Given a pointer del directly, if del is head, update head = del->next. If del->prev != NULL, set del->prev->next = del->next. If del->next != NULL, set del->next->prev = del->prev. Finally, free(del). Because del contains pointers to both neighbors, no search is required—executing in O(1) time.",
    "algorithm": "Step 1: If head == NULL or del == NULL, return.\nStep 2: If head == del, set head = del->next.\nStep 3: If del->prev != NULL, set del->prev->next = del->next.\nStep 4: If del->next != NULL, set del->next->prev = del->prev.\nStep 5: Free del.",
    "pseudocode": "function deleteNode(head, del):\n    if head == NULL or del == NULL then return head\n    if head == del then head = del.next\n    if del.prev != NULL then del.prev.next = del.next\n    if del.next != NULL then del.next.prev = del.prev\n    free(del)\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* prev;\n    struct Node* next;\n};\n\nvoid deleteNode(struct Node** headRef, struct Node* del) {\n    if (*headRef == NULL || del == NULL) return;\n\n    // If node to be deleted is head\n    if (*headRef == del) {\n        *headRef = del->next;\n    }\n\n    // Change next only if node to be deleted is NOT the last node\n    if (del->next != NULL) {\n        del->next->prev = del->prev;\n    }\n\n    // Change prev only if node to be deleted is NOT the first node\n    if (del->prev != NULL) {\n        del->prev->next = del->next;\n    }\n\n    printf(\"Deallocated node containing: %d\\n\", del->data);\n    free(del);\n}\n\nvoid printList(struct Node* node) {\n    while (node != NULL) {\n        printf(\"[%d] <-> \", node->data);\n        node = node->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));\n    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));\n    struct Node* n3 = (struct Node*)malloc(sizeof(struct Node));\n    n1->data = 10; n1->prev = NULL; n1->next = n2;\n    n2->data = 20; n2->prev = n1; n2->next = n3;\n    n3->data = 30; n3->prev = n2; n3->next = NULL;\n    struct Node* head = n1;\n\n    printf(\"=== Doubly Linked List: Delete Given Node Pointer ===\\n\");\n    printList(head);\n\n    deleteNode(&head, n2); // Delete middle node directly in O(1)\n    printList(head);\n\n    deleteNode(&head, n1); // Delete head directly in O(1)\n    printList(head);\n\n    free(n3);\n    return 0;\n}",
    "sample_input": "DLL: [10, 20, 30]. Delete node n2 (20) directly.",
    "sample_output": "=== Doubly Linked List: Delete Given Node Pointer ===\n[10] <-> [20] <-> [30] <-> NULL\nDeallocated node containing: 20\n[10] <-> [30] <-> NULL\nDeallocated node containing: 10\n[30] <-> NULL",
    "dry_run": "Delete n2:\n• del->prev is n1. del->next is n3.\n• n1->next = n3. n3->prev = n1. free(n2).\nResult: [10] <-> [30] <-> NULL in O(1)!",
    "time_complexity": "• Time Complexity: O(1) strictly — No loops.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages: Instant O(1) deletion given a node pointer. Disadvantages: Requires double-link safety checks.",
    "applications": "• LRU Cache node eviction in O(1) when linked to hash table map.",
    "viva_questions": [
      {
        "q": "Why is deleteNode O(1) in DLL but O(n) in SLL?",
        "a": "Because del->prev gives direct access to the preceding node without traversing from head."
      }
    ],
    "edge_cases": "• del is head or tail: Covered by NULL checks on del->prev and del->next.",
    "diagram": "[ n1: 10 ] <========================> [ n3: 30 ]\n        x-- [ del: n2 (20) ] --x"
  },
  "dll_traverse_forward": {
    "id": "dll_traverse_forward",
    "title": "Doubly Linked List — Forward Traversal",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll forward traversal",
      "dll traverse forward",
      "doubly linked list display"
    ],
    "definition": "Forward traversal visits nodes sequentially from head to tail using next pointers in O(n) time.",
    "concept_explanation": "Starting at head, follow next pointers until NULL is encountered, visiting each node.",
    "algorithm": "Step 1: Set temp = head. Step 2: While temp != NULL: print temp->data, temp = temp->next.",
    "pseudocode": "function traverseForward(head):\n    temp = head\n    while temp != NULL do:\n        print(temp.data)\n        temp = temp.next",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* prev; struct Node* next; };\n\nvoid traverseForward(struct Node* head) {\n    struct Node* temp = head;\n    printf(\"Forward: \");\n    while (temp != NULL) {\n        printf(\"[%d] -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));\n    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));\n    n1->data = 100; n1->prev = NULL; n1->next = n2;\n    n2->data = 200; n2->prev = n1; n2->next = NULL;\n\n    traverseForward(n1);\n    free(n1); free(n2);\n    return 0;\n}",
    "sample_input": "DLL: [100, 200]",
    "sample_output": "Forward: [100] -> [200] -> NULL",
    "dry_run": "temp visits 100, then 200, then NULL.",
    "time_complexity": "• O(n) time, O(1) space.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Advantages: Natural sequential access.",
    "applications": "• Standard list display.",
    "viva_questions": [
      {
        "q": "What marks the end of a forward traversal in DLL?",
        "a": "temp == NULL."
      }
    ],
    "edge_cases": "• Empty list handled safely.",
    "diagram": "[ 100 ] ===> [ 200 ] ===> NULL"
  },
  "dll_traverse_backward": {
    "id": "dll_traverse_backward",
    "title": "Doubly Linked List — Backward Traversal",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll backward traversal",
      "dll traverse backward",
      "doubly linked list reverse print"
    ],
    "definition": "Backward traversal navigates from tail to head using prev pointers in O(n) time.",
    "concept_explanation": "First find the tail node by traversing to the end. Then iterate backwards using temp = temp->prev until temp == NULL. In a DLL with a tail pointer, backward traversal begins instantly in O(1) setup time.",
    "algorithm": "Step 1: Traverse to last node tail (temp->next == NULL).\nStep 2: While tail != NULL: print tail->data, tail = tail->prev.",
    "pseudocode": "function traverseBackward(head):\n    tail = head\n    while tail.next != NULL do: tail = tail.next\n    while tail != NULL do:\n        print(tail.data)\n        tail = tail.prev",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* prev; struct Node* next; };\n\nvoid traverseBackward(struct Node* head) {\n    if (head == NULL) return;\n    struct Node* tail = head;\n    while (tail->next != NULL) tail = tail->next;\n\n    printf(\"Backward: \");\n    while (tail != NULL) {\n        printf(\"[%d] -> \", tail->data);\n        tail = tail->prev;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));\n    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));\n    struct Node* n3 = (struct Node*)malloc(sizeof(struct Node));\n    n1->data = 10; n1->prev = NULL; n1->next = n2;\n    n2->data = 20; n2->prev = n1; n2->next = n3;\n    n3->data = 30; n3->prev = n2; n3->next = NULL;\n\n    traverseBackward(n1);\n    free(n1); free(n2); free(n3);\n    return 0;\n}",
    "sample_input": "DLL: [10, 20, 30]",
    "sample_output": "Backward: [30] -> [20] -> [10] -> NULL",
    "dry_run": "tail reaches 30. Prints 30 -> moves to 20 -> prints 20 -> moves to 10 -> prints 10 -> terminates.",
    "time_complexity": "• O(n) time, O(1) space.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Advantages: Native backwards navigation without recursion or reversing list.",
    "applications": "• Undo history traversal in editors.",
    "viva_questions": [
      {
        "q": "Can a singly linked list perform backward traversal in O(1) space?",
        "a": "No, SLL requires O(n) stack space or reversing the list pointers."
      }
    ],
    "edge_cases": "• Empty list handled safely.",
    "diagram": "NULL <=== [ 10 ] <=== [ 20 ] <=== [ tail: 30 ]"
  },
  "dll_search": {
    "id": "dll_search",
    "title": "Doubly Linked List — Search an Element",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll search",
      "search doubly linked list",
      "find key dll"
    ],
    "definition": "Locates a target key in a doubly linked list, returning its node pointer or index in O(n) time.",
    "concept_explanation": "Traverse from head comparing temp->data with key. Return index if found, -1 if absent.",
    "algorithm": "Step 1: Set temp = head, pos = 1. Step 2: While temp != NULL: if temp->data == key return pos; temp = temp->next, pos++. Step 3: Return -1.",
    "pseudocode": "function search(head, key):\n    temp = head; pos = 1\n    while temp != NULL do:\n        if temp.data == key then return pos\n        temp = temp.next; pos = pos + 1\n    return -1",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* prev; struct Node* next; };\n\nint searchDLL(struct Node* head, int key) {\n    struct Node* temp = head;\n    int pos = 1;\n    while (temp != NULL) {\n        if (temp->data == key) return pos;\n        temp = temp->next;\n        pos++;\n    }\n    return -1;\n}\n\nint main(void) {\n    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));\n    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));\n    n1->data = 50; n1->prev = NULL; n1->next = n2;\n    n2->data = 100; n2->prev = n1; n2->next = NULL;\n\n    printf(\"Search 100: Position %d\\n\", searchDLL(n1, 100));\n    printf(\"Search 999: %d (Not found)\\n\", searchDLL(n1, 999));\n    free(n1); free(n2);\n    return 0;\n}",
    "sample_input": "DLL: [50, 100]. Search 100 and 999",
    "sample_output": "Search 100: Position 2\nSearch 999: -1 (Not found)",
    "dry_run": "Node 1 (50) != 100. Node 2 (100) == 100 -> Returns 2.",
    "time_complexity": "• O(n) time, O(1) space.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Advantages: Can also be searched bidirectionally from head and tail.",
    "applications": "• Cache key lookup.",
    "viva_questions": [
      {
        "q": "Can a doubly linked list be searched from both ends?",
        "a": "Yes, if both head and tail pointers are available, two pointers can search inwards simultaneously."
      }
    ],
    "edge_cases": "• Absent key returns -1 safely.",
    "diagram": "[ 50 ] <===> [ 100 (MATCH) ] ---> NULL"
  },
  "cll_create": {
    "id": "cll_create",
    "title": "Circular Linked List — Creation & Circular Linkage",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "create circular linked list",
      "cll create",
      "circular linked list structure"
    ],
    "definition": "A Circular Linked List (CLL) is a linked list where the last node points back to the first node (head), forming a continuous circular ring with no NULL terminator.",
    "concept_explanation": "In a circular linked list, no node has a next pointer equal to NULL. Traversal terminates when a pointer returns to head. A common optimization keeps a tail pointer pointing to the last node; this allows accessing head in O(1) via tail->next, enabling O(1) insertion at both beginning and end.",
    "algorithm": "Step 1: Allocate newNode. Step 2: Set newNode->data = val. Step 3: Set newNode->next = newNode (points to itself). Step 4: Return newNode as head.",
    "pseudocode": "function createCLL(val):\n    newNode = allocate(Node, val)\n    newNode.next = newNode\n    return newNode",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\n\nstruct Node* createCircular(int val) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->next = newNode; // Points to itself\n    return newNode;\n}\n\nint main(void) {\n    printf(\"=== Circular Linked List Creation ===\\n\");\n    struct Node* head = createCircular(10);\n    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));\n    n2->data = 20;\n    n2->next = head;\n    head->next = n2;\n\n    printf(\"CLL traversal: \");\n    struct Node* temp = head;\n    if (head != NULL) {\n        do {\n            printf(\"[%d] -> \", temp->data);\n            temp = temp->next;\n        } while (temp != head);\n    }\n    printf(\"(Back to Head %d)\\n\", head->data);\n\n    free(head); free(n2);\n    return 0;\n}",
    "sample_input": "CLL with 10 and 20",
    "sample_output": "=== Circular Linked List Creation ===\nCLL traversal: [10] -> [20] -> (Back to Head 10)",
    "dry_run": "head is 10. 10->next is 20. 20->next points back to 10. Loop terminates when temp == head.",
    "time_complexity": "• O(1) creation time.",
    "space_complexity": "• O(1) auxiliary per node.",
    "advantages_disadvantages": "Advantages: Any node can be a starting point; continuous cycling without NULL checks. Disadvantages: Risk of infinite loops if termination condition is incorrect.",
    "applications": "• Round-robin OS CPU task schedulers.",
    "viva_questions": [
      {
        "q": "How does the termination condition in a CLL differ from a SLL?",
        "a": "In SLL, loop terminates when temp == NULL; in CLL, loop terminates when temp == head (using do-while)."
      }
    ],
    "edge_cases": "• Single node points to itself (head->next == head).",
    "diagram": "[ head: 10 ] ---> [ 20 ]\n        ^               |\n        \\---------------/"
  },
  "cll_insert_beginning": {
    "id": "cll_insert_beginning",
    "title": "Circular Linked List — Insert at Beginning",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "cll insert beginning",
      "cll insert head",
      "circular linked list insert start"
    ],
    "definition": "Inserts a new node at the beginning of a circular linked list, updating the last node's next pointer to maintain the ring.",
    "concept_explanation": "Allocate newNode. If head is NULL, set newNode->next = newNode, head = newNode. Otherwise find last node (temp->next == head), set newNode->next = head, temp->next = newNode, and update head = newNode. (With a tail pointer, this is O(1)).",
    "algorithm": "Step 1: Allocate newNode. Step 2: If head == NULL: newNode->next = newNode, head = newNode, return. Step 3: Traverse to last node temp (temp->next == head). Step 4: Set newNode->next = head, temp->next = newNode, head = newNode.",
    "pseudocode": "function insertAtBeginning(head, val):\n    newNode = allocate(Node, val)\n    if head == NULL then:\n        newNode.next = newNode; return newNode\n    temp = head\n    while temp.next != head do: temp = temp.next\n    newNode.next = head\n    temp.next = newNode\n    return newNode",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\n\nvoid insertBeginning(struct Node** headRef, int val) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = val;\n\n    if (*headRef == NULL) {\n        newNode->next = newNode;\n        *headRef = newNode;\n        return;\n    }\n\n    struct Node* temp = *headRef;\n    while (temp->next != *headRef) {\n        temp = temp->next;\n    }\n    newNode->next = *headRef;\n    temp->next = newNode;\n    *headRef = newNode; // New node becomes head\n}\n\nvoid printCLL(struct Node* head) {\n    if (head == NULL) return;\n    struct Node* temp = head;\n    do {\n        printf(\"[%d] -> \", temp->data);\n        temp = temp->next;\n    } while (temp != head);\n    printf(\"(head)\\n\");\n}\n\nint main(void) {\n    struct Node* head = NULL;\n    insertBeginning(&head, 30);\n    insertBeginning(&head, 20);\n    insertBeginning(&head, 10);\n    printCLL(head);\n    return 0;\n}",
    "sample_input": "Insert 30, 20, 10 into CLL",
    "sample_output": "[10] -> [20] -> [30] -> (head)",
    "dry_run": "Last node (30)->next points to new head (10). New head points to 20. Ring preserved.",
    "time_complexity": "• O(n) without tail pointer; O(1) with tail pointer.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages: Instant prepend when tail pointer is kept.",
    "applications": "• Round-robin queue prepends.",
    "viva_questions": [
      {
        "q": "Why does insert at beginning take O(n) in a CLL without tail pointer?",
        "a": "Because we must traverse to the last node to update its next pointer to the new head."
      }
    ],
    "edge_cases": "• Empty list handled safely.",
    "diagram": "[ newNode: 10 ] ---> [ 20 ] ---> [ last: 30 ]\n          ^                                   |\n          \\-----------------------------------/"
  },
  "cll_insert_end": {
    "id": "cll_insert_end",
    "title": "Circular Linked List — Insert at End",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "cll insert end",
      "cll append",
      "circular linked list append"
    ],
    "definition": "Appends a new node to the end of a circular linked list, linking it to the head to maintain circularity.",
    "concept_explanation": "Traverse to last node temp (temp->next == head). Set temp->next = newNode, and newNode->next = head.",
    "algorithm": "Step 1: Allocate newNode. Step 2: If head == NULL: newNode->next = newNode, head = newNode, return. Step 3: Traverse while temp->next != head: temp = temp->next. Step 4: Set temp->next = newNode, newNode->next = head.",
    "pseudocode": "function insertAtEnd(head, val):\n    newNode = allocate(Node, val)\n    if head == NULL then: newNode.next = newNode; return newNode\n    temp = head\n    while temp.next != head do: temp = temp.next\n    temp.next = newNode\n    newNode.next = head\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\n\nvoid insertEnd(struct Node** headRef, int val) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = val;\n\n    if (*headRef == NULL) {\n        newNode->next = newNode;\n        *headRef = newNode;\n        return;\n    }\n    struct Node* temp = *headRef;\n    while (temp->next != *headRef) temp = temp->next;\n    temp->next = newNode;\n    newNode->next = *headRef;\n}\n\nvoid printCLL(struct Node* head) {\n    if (head == NULL) return;\n    struct Node* temp = head;\n    do {\n        printf(\"[%d] -> \", temp->data);\n        temp = temp->next;\n    } while (temp != head);\n    printf(\"(head)\\n\");\n}\n\nint main(void) {\n    struct Node* head = NULL;\n    insertEnd(&head, 10);\n    insertEnd(&head, 20);\n    insertEnd(&head, 30);\n    printCLL(head);\n    return 0;\n}",
    "sample_input": "Append 10, 20, 30 to CLL",
    "sample_output": "[10] -> [20] -> [30] -> (head)",
    "dry_run": "Node 20 points to 30. 30->next points back to head (10).",
    "time_complexity": "• O(n) without tail pointer; O(1) with tail pointer.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Advantages: Ring closure guaranteed.",
    "applications": "• Media playlist loop play.",
    "viva_questions": [
      {
        "q": "How does maintaining a tail pointer make append O(1) in CLL?",
        "a": "Because tail->next is head, so we attach newNode after tail and update tail = newNode in O(1)."
      }
    ],
    "edge_cases": "• Empty list handled safely.",
    "diagram": "[ head: 10 ] ---> [ 20 ] ---> [ newNode: 30 ]\n          ^                                   |\n          \\-----------------------------------/"
  },
  "cll_delete_node": {
    "id": "cll_delete_node",
    "title": "Circular Linked List — Delete a Node",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "cll delete node",
      "delete circular linked list",
      "remove node cll"
    ],
    "definition": "Deletes a node by value from a circular linked list, updating predecessor pointers and head if necessary.",
    "concept_explanation": "If list is empty, return. If deleting head, traverse to last node, update last->next = head->next, set new head, and free old head. If deleting an internal node, maintain prev and curr pointers, bridge prev->next = curr->next, and free curr.",
    "algorithm": "Step 1: If head == NULL, return underflow.\nStep 2: If head is only node and matches key: free(head), head = NULL, return.\nStep 3: If head matches key: find last node, last->next = head->next, temp = head, head = head->next, free(temp).\nStep 4: Else traverse with prev and curr: if curr->data == key, prev->next = curr->next, free(curr).",
    "pseudocode": "function deleteCLL(head, key):\n    if head == NULL then return NULL\n    // Handle head deletion and internal deletion with circular loop",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\n\nvoid deleteNodeCLL(struct Node** headRef, int key) {\n    if (*headRef == NULL) return;\n    struct Node *curr = *headRef, *prev = NULL;\n\n    // Check if head is the node to delete\n    if (curr->data == key) {\n        if (curr->next == *headRef) { // Only 1 node\n            free(curr);\n            *headRef = NULL;\n            return;\n        }\n        struct Node* last = *headRef;\n        while (last->next != *headRef) last = last->next;\n        last->next = curr->next;\n        *headRef = curr->next;\n        free(curr);\n        return;\n    }\n\n    // Search for key\n    while (curr->next != *headRef && curr->data != key) {\n        prev = curr;\n        curr = curr->next;\n    }\n\n    if (curr->data == key) {\n        prev->next = curr->next;\n        free(curr);\n    } else {\n        printf(\"Key %d not found!\\n\", key);\n    }\n}\n\nvoid printCLL(struct Node* head) {\n    if (head == NULL) { printf(\"CLL is empty.\\n\"); return; }\n    struct Node* temp = head;\n    do {\n        printf(\"[%d] -> \", temp->data);\n        temp = temp->next;\n    } while (temp != head);\n    printf(\"(head)\\n\");\n}\n\nint main(void) {\n    struct Node* head = NULL;\n    // Build CLL with 10, 20, 30\n    struct Node *n1 = malloc(sizeof(struct Node)), *n2 = malloc(sizeof(struct Node)), *n3 = malloc(sizeof(struct Node));\n    n1->data = 10; n1->next = n2;\n    n2->data = 20; n2->next = n3;\n    n3->data = 30; n3->next = n1;\n    head = n1;\n\n    printCLL(head);\n    deleteNodeCLL(&head, 20); // Delete middle\n    printCLL(head);\n    deleteNodeCLL(&head, 10); // Delete head\n    printCLL(head);\n\n    return 0;\n}",
    "sample_input": "CLL: [10, 20, 30]. Delete 20, then 10.",
    "sample_output": "[10] -> [20] -> [30] -> (head)\n[10] -> [30] -> (head)\n[30] -> (head)",
    "dry_run": "Delete 20: prev is 10, curr is 20. 10->next = 30. free(20). Ring remains intact.",
    "time_complexity": "• O(n) worst-case time, O(1) space.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Advantages: Preserves circular topology after removal.",
    "applications": "• Removing an expired process from circular scheduling table.",
    "viva_questions": [
      {
        "q": "What extra step is required when deleting the head node in a CLL?",
        "a": "The last node's next pointer must be updated to point to the new head node."
      }
    ],
    "edge_cases": "• Only 1 node in list: Clears head to NULL safely.",
    "diagram": "[ 10 ] -------------> [ 30 ]\n      ^                   |\n      \\-------------------/"
  },
  "cll_display": {
    "id": "cll_display",
    "title": "Circular Linked List — Display / Traverse",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "cll display",
      "cll traverse",
      "print circular linked list"
    ],
    "definition": "Traverses and prints each element of a circular linked list once using a do-while loop in O(n) time.",
    "concept_explanation": "Because a CLL has no NULL pointer, a while (temp != NULL) loop would run infinitely. Instead, initialize temp = head and use a do-while loop that continues while temp != head.",
    "algorithm": "Step 1: If head == NULL, print empty and return.\nStep 2: Set temp = head.\nStep 3: Do: print temp->data, temp = temp->next while temp != head.",
    "pseudocode": "function printCLL(head):\n    if head == NULL then return\n    temp = head\n    do:\n        print(temp.data)\n        temp = temp.next\n    while temp != head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\n\nvoid displayCLL(struct Node* head) {\n    if (head == NULL) {\n        printf(\"List is empty.\\n\");\n        return;\n    }\n    struct Node* temp = head;\n    printf(\"CLL: \");\n    do {\n        printf(\"[%d] -> \", temp->data);\n        temp = temp->next;\n    } while (temp != head);\n    printf(\"(head: %d)\\n\", head->data);\n}\n\nint main(void) {\n    struct Node *n1 = malloc(sizeof(struct Node)), *n2 = malloc(sizeof(struct Node));\n    n1->data = 10; n1->next = n2;\n    n2->data = 20; n2->next = n1;\n    displayCLL(n1);\n    free(n1); free(n2);\n    return 0;\n}",
    "sample_input": "CLL: [10, 20]",
    "sample_output": "CLL: [10] -> [20] -> (head: 10)",
    "dry_run": "temp starts at 10. Prints 10 -> temp moves to 20 -> prints 20 -> temp moves to 10 == head -> terminates.",
    "time_complexity": "• O(n) time, O(1) space.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Advantages: Traverses every node exactly once.",
    "applications": "• Viewing active loop processes.",
    "viva_questions": [
      {
        "q": "Why is do-while preferred over while for CLL traversal?",
        "a": "Because temp is initially equal to head. A standard while (temp != head) loop would evaluate to false immediately and not execute."
      }
    ],
    "edge_cases": "• Empty list handled safely.",
    "diagram": "[ 10 ] -> [ 20 ] -> (back to 10)"
  },
  "cll_search": {
    "id": "cll_search",
    "title": "Circular Linked List — Search an Element",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "cll search",
      "find circular linked list",
      "search cll element"
    ],
    "definition": "Sequentially searches for target key in a circular linked list, terminating when found or when the cycle completes back to head.",
    "concept_explanation": "Use a do-while loop to inspect temp->data == key. Track position with pos counter.",
    "algorithm": "Step 1: If head == NULL return -1. Step 2: Set temp = head, pos = 1. Step 3: Do: if temp->data == key return pos; temp = temp->next, pos++ while temp != head. Step 4: Return -1.",
    "pseudocode": "function searchCLL(head, key):\n    if head == NULL then return -1\n    temp = head; pos = 1\n    do:\n        if temp.data == key then return pos\n        temp = temp.next; pos = pos + 1\n    while temp != head\n    return -1",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\n\nint searchCLL(struct Node* head, int key) {\n    if (head == NULL) return -1;\n    struct Node* temp = head;\n    int pos = 1;\n    do {\n        if (temp->data == key) return pos;\n        temp = temp->next;\n        pos++;\n    } while (temp != head);\n    return -1;\n}\n\nint main(void) {\n    struct Node *n1 = malloc(sizeof(struct Node)), *n2 = malloc(sizeof(struct Node));\n    n1->data = 15; n1->next = n2;\n    n2->data = 30; n2->next = n1;\n    printf(\"Search 30: Pos %d\\n\", searchCLL(n1, 30));\n    printf(\"Search 99: %d (Not found)\\n\", searchCLL(n1, 99));\n    free(n1); free(n2);\n    return 0;\n}",
    "sample_input": "CLL: [15, 30]. Search 30 and 99",
    "sample_output": "Search 30: Pos 2\nSearch 99: -1 (Not found)",
    "dry_run": "temp 15 != 30. temp 30 == 30 -> returns pos 2.",
    "time_complexity": "• O(n) time, O(1) space.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Advantages: Circular bounds guard against infinite loop.",
    "applications": "• Searching game player turns.",
    "viva_questions": [
      {
        "q": "What happens if you search for a non-existent element in CLL?",
        "a": "The loop completes one full rotation back to head and returns -1."
      }
    ],
    "edge_cases": "• Key not present: Safely completes 1 cycle.",
    "diagram": "[ 15 ] -> [ 30 (MATCH) ] -> (head)"
  },
  "stack_array_create": {
    "id": "stack_array_create",
    "title": "Stack Creation using Array",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "create stack array",
      "initialize stack",
      "stack declaration",
      "top pointer",
      "array stack init"
    ],
    "definition": "Stack creation using an array involves allocating a fixed-size contiguous memory block (array) and initializing an integer index variable `top` to -1 to represent an empty stack.",
    "concept_explanation": "A stack is an abstract linear data structure adhering strictly to the LIFO (Last-In, First-Out) protocol. When implemented with a static array, the maximum capacity is capped at `MAX`. An integer variable `top` keeps track of the index of the most recently inserted element. Initializing `top = -1` indicates that no items currently occupy the stack. All stack operations (push, pop, peek) are directed by the `top` index.",
    "algorithm": "Step 1: Define maximum capacity constant MAX (e.g., #define MAX 5).\nStep 2: Declare an integer array stack[MAX] of size MAX.\nStep 3: Declare and initialize an integer top to -1 (int top = -1).\nStep 4: Output confirmation message confirming stack is initialized and empty.",
    "pseudocode": "constant MAX = 5\narray stack[MAX]\ninteger top = -1\n\nfunction initStack():\n    top = -1\n    print \"Stack created successfully with capacity MAX\"",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint stack[MAX];\nint top = -1;\n\nvoid initStack(void) {\n    top = -1;\n    printf(\"Stack initialized successfully with capacity %d.\\n\", MAX);\n    printf(\"Current top index: %d (Empty Stack)\\n\", top);\n}\n\nint main(void) {\n    printf(\"=== Stack Creation using Array ===\\n\");\n    initStack();\n    return 0;\n}",
    "sample_input": "Define MAX = 5, top = -1",
    "sample_output": "=== Stack Creation using Array ===\nStack initialized successfully with capacity 5.\nCurrent top index: -1 (Empty Stack)",
    "dry_run": "1. Memory for stack[5] allocated in data segment.\n2. top initialized to -1.\n3. initStack() executed: prints confirmation.",
    "time_complexity": "• O(1) initialization time.",
    "space_complexity": "• O(MAX) contiguous static memory.",
    "advantages_disadvantages": "Advantages:\n• Extremely simple to implement.\n• Zero dynamic memory overhead or pointer manipulation.\nDisadvantages:\n• Static size cannot grow or shrink dynamically at runtime.",
    "applications": "• Small local buffers, fixed-size history trackers, microcontroller memory structures.",
    "viva_questions": [
      {
        "q": "Why is top initialized to -1 instead of 0 in array stack?",
        "a": "Because array indexing starts at 0. top = 0 would imply an element already exists at index 0."
      },
      {
        "q": "What is the space complexity of an array stack of size MAX?",
        "a": "O(MAX) static contiguous memory."
      }
    ]
  },
  "stack_array_push": {
    "id": "stack_array_push",
    "title": "Push Operation in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "push stack array",
      "insert stack",
      "stack push operation",
      "add to stack"
    ],
    "definition": "The push operation inserts a new element at the top of the stack after verifying that the stack is not already full (preventing Stack Overflow).",
    "concept_explanation": "Before adding an item, the stack capacity must be verified. If `top == MAX - 1`, the stack is completely full, and pushing causes a Stack Overflow error. Otherwise, `top` is pre-incremented by 1 (`++top`), and the new element is assigned to `stack[top]`. This operation takes constant O(1) time.",
    "algorithm": "Step 1: Check if top == MAX - 1 (Stack Overflow condition).\nStep 2: If true, print \"Stack Overflow\" error and exit function.\nStep 3: If false, increment top by 1: top = top + 1.\nStep 4: Store value in stack at index top: stack[top] = value.\nStep 5: Return success.",
    "pseudocode": "function push(val):\n    if top == MAX - 1 then:\n        print \"Stack Overflow\"\n        return\n    top = top + 1\n    stack[top] = val\n    print \"Pushed:\", val",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define MAX 4\n\nint stack[MAX];\nint top = -1;\n\nbool isFull(void) {\n    return top == MAX - 1;\n}\n\nvoid push(int value) {\n    if (isFull()) {\n        printf(\"Stack Overflow! Cannot push %d. Stack is full.\\n\", value);\n        return;\n    }\n    top++;\n    stack[top] = value;\n    printf(\"Successfully pushed %d at index %d (top = %d)\\n\", value, top, top);\n}\n\nint main(void) {\n    printf(\"=== Push Operation in Array Stack ===\\n\");\n    push(10);\n    push(20);\n    push(30);\n    push(40);\n    push(50); // Overflow test\n    return 0;\n}",
    "sample_input": "Push sequence: 10, 20, 30, 40, 50 (MAX = 4)",
    "sample_output": "=== Push Operation in Array Stack ===\nSuccessfully pushed 10 at index 0 (top = 0)\nSuccessfully pushed 20 at index 1 (top = 1)\nSuccessfully pushed 30 at index 2 (top = 2)\nSuccessfully pushed 40 at index 3 (top = 3)\nStack Overflow! Cannot push 50. Stack is full.",
    "dry_run": "Initial: top = -1.\n1. push(10): top becomes 0, stack[0] = 10.\n2. push(20): top becomes 1, stack[1] = 20.\n3. push(30): top becomes 2, stack[2] = 30.\n4. push(40): top becomes 3, stack[3] = 40.\n5. push(50): top == 3 (MAX - 1), Overflow triggered!",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages: Instant O(1) insertion.\nDisadvantages: Fails with overflow if array limit is exceeded.",
    "applications": "• Storing function return addresses, undo history items.",
    "viva_questions": [
      {
        "q": "What is the pre-condition for a push operation?",
        "a": "The stack must not be full (top < MAX - 1)."
      }
    ]
  },
  "stack_array_pop": {
    "id": "stack_array_pop",
    "title": "Pop Operation in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "pop stack array",
      "delete stack element",
      "remove from stack",
      "stack pop operation"
    ],
    "definition": "The pop operation removes and returns the most recently inserted element located at the top of the stack, provided the stack is not empty (preventing Stack Underflow).",
    "concept_explanation": "Before removing an element, the stack is checked for underflow (`top == -1`). If empty, an underflow error is raised. Otherwise, the element at `stack[top]` is retrieved, and `top` is decremented by 1 (`top--`). The removed slot is not erased physically from memory; decrementing `top` logically invalidates it.",
    "algorithm": "Step 1: Check if top == -1 (Stack Underflow condition).\nStep 2: If true, print \"Stack Underflow\" error and return sentinel value (-1).\nStep 3: Retrieve value: int val = stack[top].\nStep 4: Decrement top: top = top - 1.\nStep 5: Return retrieved value val.",
    "pseudocode": "function pop():\n    if top == -1 then:\n        print \"Stack Underflow\"\n        return -1\n    val = stack[top]\n    top = top - 1\n    return val",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define MAX 5\n\nint stack[MAX];\nint top = -1;\n\nbool isEmpty(void) {\n    return top == -1;\n}\n\nint pop(void) {\n    if (isEmpty()) {\n        printf(\"Stack Underflow! Stack is empty, cannot pop.\\n\");\n        return -1;\n    }\n    int poppedVal = stack[top];\n    top--;\n    return poppedVal;\n}\n\nint main(void) {\n    printf(\"=== Pop Operation in Array Stack ===\\n\");\n    stack[++top] = 100;\n    stack[++top] = 200;\n    stack[++top] = 300;\n    printf(\"Initial stack has 3 items: 100, 200, 300 (top = %d)\\n\", top);\n\n    printf(\"Popped: %d (new top = %d)\\n\", pop(), top);\n    printf(\"Popped: %d (new top = %d)\\n\", pop(), top);\n    printf(\"Popped: %d (new top = %d)\\n\", pop(), top);\n    printf(\"Attempting extra pop:\\n\");\n    pop(); // Underflow\n    return 0;\n}",
    "sample_input": "Stack: [100, 200, 300]. Pop 4 times.",
    "sample_output": "=== Pop Operation in Array Stack ===\nInitial stack has 3 items: 100, 200, 300 (top = 2)\nPopped: 300 (new top = 1)\nPopped: 200 (new top = 0)\nPopped: 100 (new top = -1)\nAttempting extra pop:\nStack Underflow! Stack is empty, cannot pop.",
    "dry_run": "1. top = 2 (val = 300) -> pop returns 300, top = 1.\n2. top = 1 (val = 200) -> pop returns 200, top = 0.\n3. top = 0 (val = 100) -> pop returns 100, top = -1.\n4. top = -1 -> underflow detected.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages: Instant O(1) deletion without shifting elements.\nDisadvantages: Requires boundary checking before every removal.",
    "applications": "• Redo/Undo history retraction, exiting nested recursive scopes.",
    "viva_questions": [
      {
        "q": "Does popping an element delete it physically from memory?",
        "a": "No, it simply decrements the top index, logically excluding the item."
      }
    ]
  },
  "stack_array_peek": {
    "id": "stack_array_peek",
    "title": "Peek / Top Operation in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "peek stack array",
      "top of stack",
      "inspect top element",
      "stack peek"
    ],
    "definition": "The peek (or top) operation inspects and returns the element at the top of the stack without modifying the stack or changing the `top` index.",
    "concept_explanation": "Unlike pop, peek is a non-destructive read. It inspects `stack[top]` if `top != -1`. The top index remains unchanged, leaving the stack intact.",
    "algorithm": "Step 1: Check if top == -1 (isEmpty check).\nStep 2: If true, print error message and return sentinel value.\nStep 3: If false, return stack[top].",
    "pseudocode": "function peek():\n    if top == -1 then:\n        print \"Stack is empty\"\n        return -1\n    return stack[top]",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint stack[MAX];\nint top = -1;\n\nint peek(void) {\n    if (top == -1) {\n        printf(\"Stack is empty! Cannot peek.\\n\");\n        return -1;\n    }\n    return stack[top];\n}\n\nint main(void) {\n    printf(\"=== Peek Operation in Array Stack ===\\n\");\n    printf(\"Peek on empty stack: %d\\n\", peek());\n    stack[++top] = 25;\n    printf(\"Pushed 25. Peek: %d\\n\", peek());\n    stack[++top] = 50;\n    printf(\"Pushed 50. Peek: %d\\n\", peek());\n    printf(\"Top index remains: %d (Stack unaffected)\\n\", top);\n    return 0;\n}",
    "sample_input": "Empty stack -> push 25 -> push 50 -> peek",
    "sample_output": "=== Peek Operation in Array Stack ===\nStack is empty! Cannot peek.\nPeek on empty stack: -1\nPushed 25. Peek: 25\nPushed 50. Peek: 50\nTop index remains: 1 (Stack unaffected)",
    "dry_run": "1. top = -1 -> peek prints empty message.\n2. top = 0 (25) -> returns 25, top unchanged.\n3. top = 1 (50) -> returns 50, top unchanged.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages: Instant non-destructive inspection.",
    "applications": "• Checking operator precedence in expression parsing.",
    "viva_questions": [
      {
        "q": "How does peek differ from pop?",
        "a": "Pop removes the element and decrements top; peek only reads the top element without removing it."
      }
    ]
  },
  "stack_array_display": {
    "id": "stack_array_display",
    "title": "Display Stack Elements in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "display stack array",
      "print stack",
      "traverse stack",
      "view stack elements"
    ],
    "definition": "The display operation iterates through all elements in the stack from top down to index 0, printing them in LIFO order.",
    "concept_explanation": "A stack is displayed from top down to the bottom (index 0) to visually represent the LIFO hierarchy. If `top == -1`, the function notifies the user that the stack is empty.",
    "algorithm": "Step 1: If top == -1, print \"Stack is empty\" and return.\nStep 2: Loop for i = top down to 0:\nStep 3: Print stack[i].\nStep 4: Print newline.",
    "pseudocode": "function display():\n    if top == -1 then:\n        print \"Stack is empty\"\n        return\n    print \"Stack (top to bottom):\"\n    for i = top down to 0:\n        print stack[i]",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint stack[MAX];\nint top = -1;\n\nvoid display(void) {\n    if (top == -1) {\n        printf(\"Stack is empty! Nothing to display.\\n\");\n        return;\n    }\n    printf(\"Stack [Top -> Bottom]: \");\n    for (int i = top; i >= 0; i--) {\n        printf(\"%d \", stack[i]);\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    printf(\"=== Display Stack Elements ===\\n\");\n    display(); // empty\n    stack[++top] = 10;\n    stack[++top] = 20;\n    stack[++top] = 30;\n    display();\n    return 0;\n}",
    "sample_input": "Push 10, 20, 30. Call display().",
    "sample_output": "=== Display Stack Elements ===\nStack is empty! Nothing to display.\nStack [Top -> Bottom]: 30 20 10",
    "dry_run": "top = 2 (items: 10 at 0, 20 at 1, 30 at 2).\nLoop i = 2: prints 30.\nLoop i = 1: prints 20.\nLoop i = 0: prints 10.",
    "time_complexity": "• O(n) where n is the number of elements in the stack.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Advantages: Clear visualization of stack contents.\nDisadvantages: Traverses internal elements, violating pure abstraction for debugging purposes.",
    "applications": "• Debugging, inspecting execution frames.",
    "viva_questions": [
      {
        "q": "Why do we print a stack from top to 0 instead of 0 to top?",
        "a": "To emphasize the LIFO order where the top element is the next one to be accessed."
      }
    ]
  },
  "stack_array_isempty": {
    "id": "stack_array_isempty",
    "title": "isEmpty Check in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "isEmpty stack array",
      "check empty stack",
      "stack isempty condition"
    ],
    "definition": "The isEmpty operation tests whether the stack contains zero elements by checking if the `top` index equals -1.",
    "concept_explanation": "Testing whether a stack is empty is a fundamental guard condition before executing pop or peek operations. It executes in O(1) time and returns a boolean value.",
    "algorithm": "Step 1: Check condition (top == -1).\nStep 2: If true, return true (1).\nStep 3: Else return false (0).",
    "pseudocode": "function isEmpty():\n    return top == -1",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define MAX 5\n\nint stack[MAX];\nint top = -1;\n\nbool isEmpty(void) {\n    return top == -1;\n}\n\nint main(void) {\n    printf(\"=== isEmpty Check Demonstration ===\\n\");\n    printf(\"Initial isEmpty: %s\\n\", isEmpty() ? \"TRUE (Empty)\" : \"FALSE (Not Empty)\");\n    stack[++top] = 42;\n    printf(\"After pushing 42, isEmpty: %s\\n\", isEmpty() ? \"TRUE (Empty)\" : \"FALSE (Not Empty)\");\n    top--;\n    printf(\"After popping, isEmpty: %s\\n\", isEmpty() ? \"TRUE (Empty)\" : \"FALSE (Not Empty)\");\n    return 0;\n}",
    "sample_input": "Check empty -> push 42 -> check empty -> pop -> check empty",
    "sample_output": "=== isEmpty Check Demonstration ===\nInitial isEmpty: TRUE (Empty)\nAfter pushing 42, isEmpty: FALSE (Not Empty)\nAfter popping, isEmpty: TRUE (Empty)",
    "dry_run": "top = -1 -> returns true.\ntop = 0 -> returns false.\ntop = -1 -> returns true.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Guards against Stack Underflow.",
    "applications": "• Loop termination conditions in syntax parsers and depth-first searches.",
    "viva_questions": [
      {
        "q": "What is the condition for isEmpty in an array stack?",
        "a": "top == -1."
      }
    ]
  },
  "stack_array_isfull": {
    "id": "stack_array_isfull",
    "title": "isFull Check in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "isFull stack array",
      "check full stack",
      "stack capacity check",
      "isFull condition"
    ],
    "definition": "The isFull operation tests whether the stack has reached its maximum allocated capacity by checking if `top` equals `MAX - 1`.",
    "concept_explanation": "In static array implementations, memory cannot be expanded automatically. Testing isFull prevents index out-of-bounds memory corruption prior to push operations.",
    "algorithm": "Step 1: Check condition (top == MAX - 1).\nStep 2: If true, return true (1).\nStep 3: Else return false (0).",
    "pseudocode": "function isFull():\n    return top == MAX - 1",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define MAX 3\n\nint stack[MAX];\nint top = -1;\n\nbool isFull(void) {\n    return top == MAX - 1;\n}\n\nint main(void) {\n    printf(\"=== isFull Check Demonstration (MAX = 3) ===\\n\");\n    printf(\"At start, isFull: %s\\n\", isFull() ? \"TRUE\" : \"FALSE\");\n    stack[++top] = 10;\n    stack[++top] = 20;\n    printf(\"With 2 elements, isFull: %s\\n\", isFull() ? \"TRUE\" : \"FALSE\");\n    stack[++top] = 30;\n    printf(\"With 3 elements, isFull: %s\\n\", isFull() ? \"TRUE\" : \"FALSE\");\n    return 0;\n}",
    "sample_input": "MAX = 3, push 3 items",
    "sample_output": "=== isFull Check Demonstration (MAX = 3) ===\nAt start, isFull: FALSE\nWith 2 elements, isFull: FALSE\nWith 3 elements, isFull: TRUE",
    "dry_run": "top starts at -1 (isFull = false).\ntop becomes 1 (isFull = false).\ntop becomes 2 == MAX - 1 (isFull = true).",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Guards against Stack Overflow and segmentation faults.",
    "applications": "• Memory safety verification in embedded devices and fixed buffers.",
    "viva_questions": [
      {
        "q": "Why does a linked list stack usually not require an isFull check?",
        "a": "Because memory is allocated dynamically from the heap until system RAM is exhausted."
      }
    ]
  },
  "stack_array_overflow_underflow": {
    "id": "stack_array_overflow_underflow",
    "title": "Stack Overflow and Underflow Handling",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "stack overflow",
      "stack underflow",
      "stack boundary conditions",
      "stack errors"
    ],
    "definition": "Stack Overflow occurs when an attempt is made to push an element into an already full stack; Stack Underflow occurs when an attempt is made to pop from an empty stack.",
    "concept_explanation": "Robust stack implementations must trap these two boundary errors to prevent system crashes or corrupted memory. Overflow happens when `top == MAX - 1` and push is called. Underflow happens when `top == -1` and pop is called.",
    "algorithm": "Push Guard: If top >= MAX - 1, raise Overflow Error and abort push.\nPop Guard: If top < 0, raise Underflow Error and abort pop.",
    "pseudocode": "if push and top == MAX - 1: error(\"Stack Overflow\")\nif pop and top == -1: error(\"Stack Underflow\")",
    "c_program": "#include <stdio.h>\n#define MAX 2\n\nint stack[MAX];\nint top = -1;\n\nvoid push(int val) {\n    if (top == MAX - 1) {\n        printf(\"[ERROR] Stack Overflow! Cannot push %d (MAX=%d reached)\\n\", val, MAX);\n        return;\n    }\n    stack[++top] = val;\n    printf(\"Pushed: %d\\n\", val);\n}\n\nint pop(void) {\n    if (top == -1) {\n        printf(\"[ERROR] Stack Underflow! Cannot pop from empty stack\\n\");\n        return -1;\n    }\n    return stack[top--];\n}\n\nint main(void) {\n    printf(\"=== Stack Overflow & Underflow Protection ===\\n\");\n    pop(); // Trigger Underflow\n    push(10);\n    push(20);\n    push(30); // Trigger Overflow\n    printf(\"Popped: %d\\n\", pop());\n    printf(\"Popped: %d\\n\", pop());\n    pop(); // Trigger Underflow again\n    return 0;\n}",
    "sample_input": "Pop empty -> push 10, 20, 30 -> pop 3 times",
    "sample_output": "=== Stack Overflow & Underflow Protection ===\n[ERROR] Stack Underflow! Cannot pop from empty stack\nPushed: 10\nPushed: 20\n[ERROR] Stack Overflow! Cannot push 30 (MAX=2 reached)\nPopped: 20\nPopped: 10\n[ERROR] Stack Underflow! Cannot pop from empty stack",
    "dry_run": "1. pop() with top = -1 -> triggers Underflow.\n2. push(10) top=0, push(20) top=1.\n3. push(30) with top=1 (MAX-1) -> triggers Overflow.\n4. pop() returns 20, 10. Next pop triggers Underflow.",
    "time_complexity": "• O(1) constant time checks.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Prevents segmentation faults and undefined behaviors.",
    "applications": "• Production runtime safety, defensive programming.",
    "viva_questions": [
      {
        "q": "What are the two primary boundary conditions in stacks?",
        "a": "Stack Overflow (pushing when full) and Stack Underflow (popping when empty)."
      }
    ]
  },
  "stack_ll_create": {
    "id": "stack_ll_create",
    "title": "Stack Creation using Linked List",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "create linked list stack",
      "dynamic stack",
      "stack using linked list",
      "linked stack init"
    ],
    "definition": "A Linked List Stack dynamically implements a stack by representing the top of the stack with the head pointer of a singly linked list, eliminating fixed-size constraints.",
    "concept_explanation": "In a linked list implementation, every element is a dynamic node containing data and a pointer to the previous top node. The pointer `top` is initialized to NULL, signifying an empty stack. Memory is allocated on demand on the heap.",
    "algorithm": "Step 1: Define node structure with data and next pointer.\nStep 2: Declare pointer struct Node* top = NULL.\nStep 3: Stack is ready to grow dynamically.",
    "pseudocode": "struct Node:\n    data: int\n    next: pointer to Node\n\ntop = NULL\nprint \"Linked list stack created\"",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* top = NULL;\n\nvoid initStack(void) {\n    top = NULL;\n    printf(\"Linked List Stack initialized. top = NULL (Empty Stack)\\n\");\n}\n\nint main(void) {\n    printf(\"=== Stack Creation using Linked List ===\\n\");\n    initStack();\n    return 0;\n}",
    "sample_input": "Initialize top = NULL",
    "sample_output": "=== Stack Creation using Linked List ===\nLinked List Stack initialized. top = NULL (Empty Stack)",
    "dry_run": "top pointer set to NULL. No memory allocated yet.",
    "time_complexity": "• O(1) initialization time.",
    "space_complexity": "• O(1) initial auxiliary space.",
    "advantages_disadvantages": "Advantages: Dynamic sizing, no fixed capacity limits.\nDisadvantages: Overhead of storing pointer in every node.",
    "applications": "• Stacks where maximum size is unknown or varies widely.",
    "viva_questions": [
      {
        "q": "Why is the top of a linked list stack placed at the head instead of the tail?",
        "a": "Because insertion and deletion at the head take O(1) time without traversing the list."
      }
    ]
  },
  "stack_ll_push": {
    "id": "stack_ll_push",
    "title": "Push Operation in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "push linked list stack",
      "insert dynamic stack",
      "stack ll push"
    ],
    "definition": "Push in a linked list stack inserts a newly allocated node at the beginning (head) of the linked list and updates the `top` pointer to reference this new node in O(1) time.",
    "concept_explanation": "A new node is allocated using `malloc()`. If allocation succeeds, its `next` pointer is set to the current `top`, and `top` is updated to point to the new node. This prepends the node, maintaining LIFO order.",
    "algorithm": "Step 1: Allocate newNode = malloc(sizeof(struct Node)).\nStep 2: Check if newNode == NULL (Heap Out of Memory / Overflow).\nStep 3: Set newNode->data = val.\nStep 4: Set newNode->next = top.\nStep 5: Set top = newNode.",
    "pseudocode": "function push(val):\n    newNode = allocate(Node)\n    if newNode == NULL: error(\"Heap Overflow\")\n    newNode.data = val\n    newNode.next = top\n    top = newNode",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* top = NULL;\n\nvoid push(int val) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    if (newNode == NULL) {\n        printf(\"Heap Overflow! Cannot allocate memory for %d\\n\", val);\n        return;\n    }\n    newNode->data = val;\n    newNode->next = top;\n    top = newNode;\n    printf(\"Pushed %d onto linked stack (top node = %d)\\n\", val, top->data);\n}\n\nint main(void) {\n    printf(\"=== Push Operation in Linked List Stack ===\\n\");\n    push(10);\n    push(20);\n    push(30);\n    return 0;\n}",
    "sample_input": "Push 10, 20, 30",
    "sample_output": "=== Push Operation in Linked List Stack ===\nPushed 10 onto linked stack (top node = 10)\nPushed 20 onto linked stack (top node = 20)\nPushed 30 onto linked stack (top node = 30)",
    "dry_run": "1. newNode(10)->next = NULL, top = newNode(10).\n2. newNode(20)->next = newNode(10), top = newNode(20).\n3. newNode(30)->next = newNode(20), top = newNode(30).",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) per node inserted.",
    "advantages_disadvantages": "Advantages: O(1) push with no maximum stack capacity constraint.",
    "applications": "• Unlimited backtrack history buffers.",
    "viva_questions": [
      {
        "q": "When can a push operation fail in a linked list stack?",
        "a": "Only when system heap memory is completely exhausted and malloc() returns NULL."
      }
    ]
  },
  "stack_ll_pop": {
    "id": "stack_ll_pop",
    "title": "Pop Operation in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "pop linked list stack",
      "delete dynamic stack",
      "stack ll pop"
    ],
    "definition": "Pop in a linked list stack removes the top node, frees its dynamically allocated heap memory, and updates `top` to point to the next node in line.",
    "concept_explanation": "If `top == NULL`, Stack Underflow is reported. Otherwise, a temporary pointer `temp` captures `top`, the popped value is saved, `top` advances to `top->next`, and `free(temp)` releases the allocated memory.",
    "algorithm": "Step 1: If top == NULL, print Underflow error and return -1.\nStep 2: Set temp = top.\nStep 3: Save val = top->data.\nStep 4: Update top = top->next.\nStep 5: Call free(temp).\nStep 6: Return val.",
    "pseudocode": "function pop():\n    if top == NULL then:\n        print \"Stack Underflow\"\n        return -1\n    temp = top\n    val = top.data\n    top = top.next\n    free(temp)\n    return val",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* top = NULL;\n\nvoid push(int val) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->next = top;\n    top = newNode;\n}\n\nint pop(void) {\n    if (top == NULL) {\n        printf(\"Stack Underflow! Linked stack is empty.\\n\");\n        return -1;\n    }\n    struct Node* temp = top;\n    int val = temp->data;\n    top = top->next;\n    free(temp);\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Pop Operation in Linked List Stack ===\\n\");\n    push(50);\n    push(100);\n    printf(\"Popped: %d\\n\", pop());\n    printf(\"Popped: %d\\n\", pop());\n    printf(\"Attempting extra pop:\\n\");\n    pop();\n    return 0;\n}",
    "sample_input": "Push 50, 100 -> Pop 3 times",
    "sample_output": "=== Pop Operation in Linked List Stack ===\nPopped: 100\nPopped: 50\nAttempting extra pop:\nStack Underflow! Linked stack is empty.",
    "dry_run": "1. pop(): temp points to node(100), top advances to node(50), 100 returned, memory freed.\n2. pop(): temp points to node(50), top advances to NULL, 50 returned.\n3. pop(): top is NULL -> Underflow!",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Frees heap memory immediately, preventing memory leaks.",
    "applications": "• Garbage collection call stack unwinding.",
    "viva_questions": [
      {
        "q": "Why is free() crucial during a linked list pop?",
        "a": "To release dynamically allocated heap memory and avoid memory leaks."
      }
    ]
  },
  "stack_ll_peek": {
    "id": "stack_ll_peek",
    "title": "Peek / Top Operation in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "peek linked list stack",
      "top element linked stack",
      "ll stack peek"
    ],
    "definition": "The peek operation retrieves the data value from the node referenced by `top` without modifying the pointer or freeing any memory.",
    "concept_explanation": "Checks if `top != NULL` and returns `top->data`. It is a non-destructive read taking O(1) time.",
    "algorithm": "Step 1: If top == NULL, print \"Stack is empty\" and return -1.\nStep 2: Else return top->data.",
    "pseudocode": "function peek():\n    if top == NULL then:\n        print \"Stack empty\"\n        return -1\n    return top.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* top = NULL;\n\nint peek(void) {\n    if (top == NULL) {\n        printf(\"Stack is empty! Cannot peek.\\n\");\n        return -1;\n    }\n    return top->data;\n}\n\nvoid push(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->next = top; top = n;\n}\n\nint main(void) {\n    printf(\"=== Peek in Linked List Stack ===\\n\");\n    peek();\n    push(45);\n    printf(\"Top after pushing 45: %d\\n\", peek());\n    push(90);\n    printf(\"Top after pushing 90: %d\\n\", peek());\n    return 0;\n}",
    "sample_input": "Push 45, 90; peek",
    "sample_output": "=== Peek in Linked List Stack ===\nStack is empty! Cannot peek.\nTop after pushing 45: 45\nTop after pushing 90: 90",
    "dry_run": "top NULL -> empty message.\ntop points to 45 -> peek returns 45.\ntop points to 90 -> peek returns 90.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Non-destructive O(1) inspection.",
    "applications": "• Checking top token in grammar parsers.",
    "viva_questions": [
      {
        "q": "What does peek return when stack is empty?",
        "a": "Typically a sentinel value like -1 or raises an exception."
      }
    ]
  },
  "stack_ll_display": {
    "id": "stack_ll_display",
    "title": "Display Stack Elements in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "display linked list stack",
      "print dynamic stack",
      "ll stack traversal"
    ],
    "definition": "Display iterates from the `top` pointer through subsequent `next` pointers until reaching NULL, printing each node value.",
    "concept_explanation": "Traverses the linked list linearly. Since the head represents the top, elements are printed in natural LIFO order (top to bottom).",
    "algorithm": "Step 1: If top == NULL, print \"Stack is empty\" and return.\nStep 2: Declare temp = top.\nStep 3: While temp != NULL:\n        print temp->data\n        temp = temp->next\nStep 4: Print newline.",
    "pseudocode": "function display():\n    temp = top\n    while temp != NULL:\n        print temp.data\n        temp = temp.next",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* top = NULL;\n\nvoid push(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->next = top; top = n;\n}\n\nvoid display(void) {\n    if (top == NULL) {\n        printf(\"Stack is empty!\\n\");\n        return;\n    }\n    struct Node* temp = top;\n    printf(\"Linked Stack [Top -> Bottom]: \");\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    printf(\"=== Display Linked List Stack ===\\n\");\n    display();\n    push(10);\n    push(20);\n    push(30);\n    display();\n    return 0;\n}",
    "sample_input": "Push 10, 20, 30; call display()",
    "sample_output": "=== Display Linked List Stack ===\nStack is empty!\nLinked Stack [Top -> Bottom]: 30 -> 20 -> 10 -> NULL",
    "dry_run": "temp starts at 30 -> prints 30, temp moves to 20 -> prints 20, temp moves to 10 -> prints 10, temp becomes NULL -> loop terminates.",
    "time_complexity": "• O(n) where n is node count.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Shows dynamic pointer connections clearly.",
    "applications": "• Debugging dynamic call stacks.",
    "viva_questions": [
      {
        "q": "What indicates the bottom of a linked list stack?",
        "a": "The last node has its next pointer set to NULL."
      }
    ]
  },
  "stack_ll_isempty": {
    "id": "stack_ll_isempty",
    "title": "isEmpty Check in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "isEmpty linked list stack",
      "empty check dynamic stack",
      "ll stack isempty"
    ],
    "definition": "The isEmpty check verifies whether the `top` pointer is NULL, indicating zero nodes in the stack.",
    "concept_explanation": "Executes a simple pointer comparison `top == NULL` in O(1) time.",
    "algorithm": "Step 1: Check if top == NULL.\nStep 2: Return true if top == NULL, else return false.",
    "pseudocode": "function isEmpty():\n    return top == NULL",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* top = NULL;\n\nbool isEmpty(void) {\n    return top == NULL;\n}\n\nint main(void) {\n    printf(\"=== Linked List Stack isEmpty Check ===\\n\");\n    printf(\"Is empty at start? %s\\n\", isEmpty() ? \"YES\" : \"NO\");\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = 100; n->next = NULL; top = n;\n    printf(\"Is empty after 1 node? %s\\n\", isEmpty() ? \"YES\" : \"NO\");\n    return 0;\n}",
    "sample_input": "Check top == NULL",
    "sample_output": "=== Linked List Stack isEmpty Check ===\nIs empty at start? YES\nIs empty after 1 node? NO",
    "dry_run": "top == NULL is true initially; becomes false when node attached.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Clean O(1) guard check.",
    "applications": "• Loop termination in graph traversals.",
    "viva_questions": [
      {
        "q": "How does isEmpty check differ between array and linked list stack?",
        "a": "Array checks top == -1, linked list checks top == NULL."
      }
    ]
  },
  "stack_ll_overflow_underflow": {
    "id": "stack_ll_overflow_underflow",
    "title": "Overflow & Underflow in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "overflow underflow dynamic stack",
      "heap exhaustion stack",
      "ll stack boundary"
    ],
    "definition": "In a Linked List Stack, Underflow occurs when popping from `top == NULL`; Overflow occurs only when system heap memory is exhausted and `malloc()` fails.",
    "concept_explanation": "Unlike array stacks with fixed maximum capacities, a linked stack grows until physical RAM or swap is exhausted. Thus, overflow is an operating system heap exhaustion event (`malloc() == NULL`).",
    "algorithm": "Push Guard: If malloc returns NULL -> Heap Overflow.\nPop Guard: If top == NULL -> Stack Underflow.",
    "pseudocode": "if malloc fails: Overflow\nif top == NULL on pop: Underflow",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* top = NULL;\n\nint pop(void) {\n    if (top == NULL) {\n        printf(\"[ERROR] Stack Underflow: top is NULL\\n\");\n        return -1;\n    }\n    struct Node* t = top;\n    int val = t->data;\n    top = top->next;\n    free(t);\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Dynamic Stack Overflow & Underflow ===\\n\");\n    pop(); // Underflow\n    printf(\"Note: Stack Overflow in linked stack only occurs if malloc() returns NULL (RAM full).\\n\");\n    return 0;\n}",
    "sample_input": "Pop empty linked stack",
    "sample_output": "=== Dynamic Stack Overflow & Underflow ===\n[ERROR] Stack Underflow: top is NULL\nNote: Stack Overflow in linked stack only occurs if malloc() returns NULL (RAM full).",
    "dry_run": "pop() on NULL top triggers underflow branch immediately.",
    "time_complexity": "• O(1) check.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Much higher capacity than static array stacks.",
    "applications": "• Enterprise server software handling variable workloads.",
    "viva_questions": [
      {
        "q": "Can a linked list stack overflow?",
        "a": "Yes, but only when system heap memory is exhausted and malloc() returns NULL."
      }
    ]
  },
  "stack_lifo_principle": {
    "id": "stack_lifo_principle",
    "title": "LIFO Principle and Practical Applications",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_applications",
    "subcategoryName": "Stack Applications",
    "keywords": [
      "lifo principle",
      "last in first out",
      "stack applications",
      "why stack is lifo"
    ],
    "definition": "The LIFO (Last-In, First-Out) principle states that the most recently inserted element must be the first element retrieved and processed.",
    "concept_explanation": "LIFO naturally models nesting, backtracking, and hierarchical contexts. For example, when function A calls B and B calls C, C finishes and returns before B can resume. Similarly, undo/redo mechanisms restore the most recent action first.",
    "algorithm": "Demonstrate LIFO:\n1. Insert elements A, B, C in sequence.\n2. Remove elements: C emerges first, followed by B, then A.",
    "pseudocode": "push(A), push(B), push(C)\npop() -> C\npop() -> B\npop() -> A",
    "c_program": "#include <stdio.h>\n#define MAX 3\n\nint stack[MAX];\nint top = -1;\n\nvoid push(int x) { stack[++top] = x; }\nint pop(void) { return stack[top--]; }\n\nint main(void) {\n    printf(\"=== LIFO Principle Demonstration ===\\n\");\n    printf(\"Pushing 10, then 20, then 30...\\n\");\n    push(10);\n    push(20);\n    push(30);\n\n    printf(\"Retrieving items:\\n\");\n    while (top >= 0) {\n        printf(\"Popped: %d (Notice: 30 was inserted last, emerges first!)\\n\", pop());\n    }\n    return 0;\n}",
    "sample_input": "Push 10, 20, 30",
    "sample_output": "=== LIFO Principle Demonstration ===\nPushing 10, then 20, then 30...\nRetrieving items:\nPopped: 30 (Notice: 30 was inserted last, emerges first!)\nPopped: 20 (Notice: 30 was inserted last, emerges first!)\nPopped: 10 (Notice: 30 was inserted last, emerges first!)",
    "dry_run": "Input order: 10, 20, 30. Output order: 30, 20, 10.",
    "time_complexity": "• O(1) per operation.",
    "space_complexity": "• O(n) total elements.",
    "advantages_disadvantages": "Natural fit for recursion and backtracking.",
    "applications": "• Function call stack, browser back button history, syntax parsing.",
    "viva_questions": [
      {
        "q": "Give real-world examples of LIFO.",
        "a": "A stack of plates in a cafeteria, undo stack in text editors, call stack in program execution."
      }
    ]
  },
  "stack_infix_to_postfix": {
    "id": "stack_infix_to_postfix",
    "title": "Infix to Postfix Conversion",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_applications",
    "subcategoryName": "Stack Applications",
    "keywords": [
      "infix to postfix",
      "shunting yard",
      "convert expression",
      "operator precedence stack"
    ],
    "definition": "Infix to Postfix conversion transforms expressions with operators placed between operands into Reverse Polish Notation (RPN), where operators follow their operands, eliminating operator precedence ambiguities and parentheses.",
    "concept_explanation": "Computers cannot easily evaluate infix expressions directly due to operator precedence rules (e.g. * before +) and parentheses. Postfix notation removes parentheses and allows single-pass linear evaluation using a stack. The algorithm pushes operators onto an operator stack, popping higher or equal precedence operators to the output when a lower precedence operator is encountered.",
    "algorithm": "Step 1: Scan infix expression character by character from left to right.\nStep 2: If scanned character is an operand, append it to postfix output.\nStep 3: If '(', push onto stack.\nStep 4: If ')', pop from stack to output until '(' is encountered; discard '('.\nStep 5: If operator:\n        While stack not empty and precedence(stack[top]) >= precedence(token), pop operator to output.\n        Push current operator onto stack.\nStep 6: Pop all remaining operators from stack to output.",
    "pseudocode": "function infixToPostfix(exp):\n    for char c in exp:\n        if operand(c): output += c\n        else if c == '(': push(c)\n        else if c == ')':\n            while top != '(': output += pop()\n            pop() // discard '('\n        else: // operator\n            while stack and precedence(top) >= precedence(c):\n                output += pop()\n            push(c)\n    while stack: output += pop()\n    return output",
    "c_program": "#include <stdio.h>\n#include <ctype.h>\n#include <string.h>\n\n#define MAX 100\n\nchar stack[MAX];\nint top = -1;\n\nvoid push(char c) { stack[++top] = c; }\nchar pop(void) { return (top == -1) ? -1 : stack[top--]; }\nchar peek(void) { return (top == -1) ? -1 : stack[top]; }\n\nint precedence(char op) {\n    if (op == '+' || op == '-') return 1;\n    if (op == '*' || op == '/') return 2;\n    if (op == '^') return 3;\n    return 0;\n}\n\nvoid infixToPostfix(const char* infix, char* postfix) {\n    int k = 0;\n    for (int i = 0; infix[i] != '\\0'; i++) {\n        char c = infix[i];\n        if (isalnum(c)) {\n            postfix[k++] = c;\n        } else if (c == '(') {\n            push(c);\n        } else if (c == ')') {\n            while (top != -1 && peek() != '(') {\n                postfix[k++] = pop();\n            }\n            pop(); // Remove '('\n        } else { // Operator\n            while (top != -1 && precedence(peek()) >= precedence(c)) {\n                postfix[k++] = pop();\n            }\n            push(c);\n        }\n    }\n    while (top != -1) {\n        postfix[k++] = pop();\n    }\n    postfix[k] = '\\0';\n}\n\nint main(void) {\n    const char* infix = \"(A+B)*(C-D)\";\n    char postfix[MAX];\n    printf(\"=== Infix to Postfix Conversion ===\\n\");\n    printf(\"Infix expression:   %s\\n\", infix);\n    infixToPostfix(infix, postfix);\n    printf(\"Postfix expression: %s\\n\", postfix);\n    return 0;\n}",
    "sample_input": "Infix: (A+B)*(C-D)",
    "sample_output": "=== Infix to Postfix Conversion ===\nInfix expression:   (A+B)*(C-D)\nPostfix expression: AB+CD-*",
    "dry_run": "1. '(' pushed.\n2. 'A' -> output: A.\n3. '+' -> pushed.\n4. 'B' -> output: AB.\n5. ')' -> pop '+' to output (AB+), discard '('.\n6. '*' -> pushed.\n7. '(' -> pushed.\n8. 'C' -> output: AB+C.\n9. '-' -> pushed.\n10. 'D' -> output: AB+CD.\n11. ')' -> pop '-' to output (AB+CD-), discard '('.\n12. End of expression -> pop '*' (AB+CD-*).",
    "time_complexity": "• O(n) where n is expression length.",
    "space_complexity": "• O(n) auxiliary operator stack.",
    "advantages_disadvantages": "Removes operator precedence ambiguity; parentheses free.",
    "applications": "• Compiler design, expression parser engines, HP financial calculators.",
    "viva_questions": [
      {
        "q": "Why do we convert infix to postfix before evaluation?",
        "a": "Postfix expressions can be evaluated in a single linear pass from left to right without needing parentheses or backtracking."
      }
    ]
  },
  "stack_postfix_evaluation": {
    "id": "stack_postfix_evaluation",
    "title": "Postfix Expression Evaluation",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_applications",
    "subcategoryName": "Stack Applications",
    "keywords": [
      "postfix evaluation",
      "evaluate rpn",
      "stack math expression",
      "postfix compute"
    ],
    "definition": "Postfix Expression Evaluation uses an operand stack to compute the numerical value of a postfix string by pushing operands and popping two operands whenever an operator is encountered.",
    "concept_explanation": "When reading from left to right, operands (numbers) are pushed onto the operand stack. When an operator is encountered, the top two operands are popped (val2 first, then val1), the operation `val1 <op> val2` is calculated, and the result is pushed back onto the stack. At the end, the stack top holds the final evaluation result.",
    "algorithm": "Step 1: Create an empty operand stack.\nStep 2: Scan postfix expression from left to right.\nStep 3: If character is digit, push (c - '0') onto stack.\nStep 4: If character is operator:\n        val2 = pop()\n        val1 = pop()\n        result = val1 <op> val2\n        push(result)\nStep 5: Return pop() as final answer.",
    "pseudocode": "function evalPostfix(exp):\n    for char c in exp:\n        if isDigit(c): push(c - '0')\n        else:\n            v2 = pop(), v1 = pop()\n            push(compute(v1, c, v2))\n    return pop()",
    "c_program": "#include <stdio.h>\n#include <ctype.h>\n\n#define MAX 50\n\nint stack[MAX];\nint top = -1;\n\nvoid push(int val) { stack[++top] = val; }\nint pop(void) { return stack[top--]; }\n\nint evaluatePostfix(const char* exp) {\n    for (int i = 0; exp[i] != '\\0'; i++) {\n        char c = exp[i];\n        if (isdigit(c)) {\n            push(c - '0');\n        } else {\n            int val2 = pop();\n            int val1 = pop();\n            switch (c) {\n                case '+': push(val1 + val2); break;\n                case '-': push(val1 - val2); break;\n                case '*': push(val1 * val2); break;\n                case '/': push(val1 / val2); break;\n            }\n        }\n    }\n    return pop();\n}\n\nint main(void) {\n    const char* exp = \"231*+9-\";\n    printf(\"=== Postfix Expression Evaluation ===\\n\");\n    printf(\"Postfix Expression: %s\\n\", exp);\n    int result = evaluatePostfix(exp);\n    printf(\"Evaluated Result:   %d\\n\", result);\n    return 0;\n}",
    "sample_input": "Postfix: 231*+9-",
    "sample_output": "=== Postfix Expression Evaluation ===\nPostfix Expression: 231*+9-\nEvaluated Result:   -4",
    "dry_run": "1. '2' -> push 2\n2. '3' -> push 3\n3. '1' -> push 1\n4. '*' -> pop 1, 3; 3 * 1 = 3; push 3 (stack: [2, 3])\n5. '+' -> pop 3, 2; 2 + 3 = 5; push 5 (stack: [5])\n6. '9' -> push 9 (stack: [5, 9])\n7. '-' -> pop 9, 5; 5 - 9 = -4; push -4. Result: -4.",
    "time_complexity": "• O(n) single pass evaluation.",
    "space_complexity": "• O(n) stack space for operands.",
    "advantages_disadvantages": "Extremely fast, linear evaluation without parentheses overhead.",
    "applications": "• Bytecode interpreters (JVM, Python bytecode), math calculators.",
    "viva_questions": [
      {
        "q": "Why is val2 popped before val1?",
        "a": "Because the stack is LIFO. In an expression like 5 - 9, 9 was pushed last, so it pops first as the second operand."
      }
    ]
  },
  "stack_parentheses_matching": {
    "id": "stack_parentheses_matching",
    "title": "Parentheses Balancing / Matching",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_applications",
    "subcategoryName": "Stack Applications",
    "keywords": [
      "parentheses matching",
      "balanced brackets",
      "bracket syntax checker",
      "parentheses stack"
    ],
    "definition": "Parentheses matching verifies that every opening delimiter ((, {, [) has a corresponding and correctly nested closing delimiter (), }, ]) using a stack.",
    "concept_explanation": "As the string is scanned, every opening delimiter is pushed onto the stack. When a closing delimiter is reached, the stack must not be empty, and the popped top delimiter must match the closing delimiter type. If the stack is empty at the end, the string is balanced.",
    "algorithm": "Step 1: Initialize stack with top = -1.\nStep 2: Traverse string:\n        If char is '(', '{', or '[', push onto stack.\n        If char is ')', '}', or ']':\n            If stack empty, return false (unmatched closing).\n            Pop top char. If it doesn't match current closer, return false (mismatch).\nStep 3: Return true if stack is empty, else false.",
    "pseudocode": "function isBalanced(str):\n    for c in str:\n        if c in ['(', '{', '[']: push(c)\n        else if c in [')', '}', ']']:\n            if isEmpty(): return false\n            topChar = pop()\n            if not match(topChar, c): return false\n    return isEmpty()",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n\n#define MAX 100\n\nchar stack[MAX];\nint top = -1;\n\nvoid push(char c) { stack[++top] = c; }\nchar pop(void) { return (top == -1) ? '\\0' : stack[top--]; }\n\nbool matches(char open, char close) {\n    if (open == '(' && close == ')') return true;\n    if (open == '{' && close == '}') return true;\n    if (open == '[' && close == ']') return true;\n    return false;\n}\n\nbool isBalanced(const char* expr) {\n    top = -1; // Reset stack\n    for (int i = 0; expr[i] != '\\0'; i++) {\n        char c = expr[i];\n        if (c == '(' || c == '{' || c == '[') {\n            push(c);\n        } else if (c == ')' || c == '}' || c == ']') {\n            if (top == -1) return false;\n            char openChar = pop();\n            if (!matches(openChar, c)) return false;\n        }\n    }\n    return top == -1;\n}\n\nint main(void) {\n    printf(\"=== Parentheses Matching Demonstration ===\\n\");\n    const char* test1 = \"{[()]}\";\n    const char* test2 = \"{[(])}\";\n    const char* test3 = \"((())\";\n\n    printf(\"%-15s -> %s\\n\", test1, isBalanced(test1) ? \"BALANCED\" : \"NOT BALANCED\");\n    printf(\"%-15s -> %s\\n\", test2, isBalanced(test2) ? \"BALANCED\" : \"NOT BALANCED\");\n    printf(\"%-15s -> %s\\n\", test3, isBalanced(test3) ? \"BALANCED\" : \"NOT BALANCED\");\n    return 0;\n}",
    "sample_input": "Test cases: \"{[()]}\", \"{[(])}\", \"((())\"",
    "sample_output": "=== Parentheses Matching Demonstration ===\n{[()]}          -> BALANCED\n{[(])}          -> NOT BALANCED\n((())           -> NOT BALANCED",
    "dry_run": "Test 1 '{[()]}':\nPush '{', push '[', push '('.\n')' matches '(', pop.\n']' matches '[', pop.\n'}' matches '{', pop.\nStack empty -> BALANCED!",
    "time_complexity": "• O(n) where n is string length.",
    "space_complexity": "• O(n) stack space in worst case (all openers).",
    "advantages_disadvantages": "Guarantees syntax correctness of nested constructs.",
    "applications": "• IDE syntax highlighters, compiler parsers, XML/HTML validators.",
    "viva_questions": [
      {
        "q": "What error occurs if the stack is not empty after scanning the string?",
        "a": "There are unclosed opening parentheses in the expression."
      }
    ]
  },
  "queue_array_create": {
    "id": "queue_array_create",
    "title": "Queue Creation using Array",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "create linear queue",
      "array queue initialization",
      "queue declaration",
      "front rear pointers"
    ],
    "definition": "Queue creation using an array involves allocating a contiguous buffer of fixed capacity `MAX` and initializing two tracking pointers: `front = -1` and `rear = -1` to designate an empty queue.",
    "concept_explanation": "A queue is a linear collection adhering strictly to the FIFO (First-In, First-Out) principle. Insertions happen at the back (`rear`) while deletions happen at the front (`front`). In a static array, `front` and `rear` both start at -1. The first enqueued item sets both pointers to 0.",
    "algorithm": "Step 1: Define MAX size capacity (e.g., #define MAX 5).\nStep 2: Declare array queue[MAX].\nStep 3: Declare and set front = -1, rear = -1.\nStep 4: Queue is created and ready for operations.",
    "pseudocode": "constant MAX = 5\narray queue[MAX]\ninteger front = -1, rear = -1\n\nfunction initQueue():\n    front = -1; rear = -1\n    print \"Linear Queue initialized\"",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint queue[MAX];\nint front = -1;\nint rear = -1;\n\nvoid initQueue(void) {\n    front = -1;\n    rear = -1;\n    printf(\"Linear Queue initialized with capacity %d.\\n\", MAX);\n    printf(\"front = %d, rear = %d (Empty Queue)\\n\", front, rear);\n}\n\nint main(void) {\n    printf(\"=== Linear Queue Creation using Array ===\\n\");\n    initQueue();\n    return 0;\n}",
    "sample_input": "Initialize queue with MAX = 5",
    "sample_output": "=== Linear Queue Creation using Array ===\nLinear Queue initialized with capacity 5.\nfront = -1, rear = -1 (Empty Queue)",
    "dry_run": "front = -1, rear = -1. Zero items in queue.",
    "time_complexity": "• O(1) initialization.",
    "space_complexity": "• O(MAX) contiguous static memory.",
    "advantages_disadvantages": "Advantages: Simple and direct. Disadvantages: Fixed capacity; memory cannot be reused after deletions in linear queue without shifting or circular buffers.",
    "applications": "• CPU process scheduling queues, print spoolers.",
    "viva_questions": [
      {
        "q": "What do front = -1 and rear = -1 represent?",
        "a": "They signify that the linear queue is currently empty."
      }
    ]
  },
  "queue_array_enqueue": {
    "id": "queue_array_enqueue",
    "title": "Enqueue Operation in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "enqueue linear queue",
      "insert queue",
      "add to queue",
      "queue enqueue"
    ],
    "definition": "Enqueue inserts a new element at the rear end of the queue after checking that the queue is not full.",
    "concept_explanation": "Before adding an element, check if `rear == MAX - 1`. If true, the queue is full (Queue Overflow). Otherwise, if the queue is currently empty (`front == -1`), both `front` and `rear` are set to 0. Otherwise, `rear` is incremented, and the element is stored at `queue[rear]`.",
    "algorithm": "Step 1: If rear == MAX - 1, print \"Queue Overflow\" and exit.\nStep 2: If front == -1, set front = 0.\nStep 3: Increment rear = rear + 1.\nStep 4: Set queue[rear] = value.\nStep 5: Output success message.",
    "pseudocode": "function enqueue(val):\n    if rear == MAX - 1: error(\"Queue Overflow\")\n    if front == -1: front = 0\n    rear = rear + 1\n    queue[rear] = val",
    "c_program": "#include <stdio.h>\n#define MAX 4\n\nint queue[MAX];\nint front = -1;\nint rear = -1;\n\nvoid enqueue(int val) {\n    if (rear == MAX - 1) {\n        printf(\"Queue Overflow! Cannot enqueue %d\\n\", val);\n        return;\n    }\n    if (front == -1) front = 0;\n    rear++;\n    queue[rear] = val;\n    printf(\"Enqueued %d (front = %d, rear = %d)\\n\", val, front, rear);\n}\n\nint main(void) {\n    printf(\"=== Enqueue Operation in Array Queue ===\\n\");\n    enqueue(10);\n    enqueue(20);\n    enqueue(30);\n    enqueue(40);\n    enqueue(50); // Overflow\n    return 0;\n}",
    "sample_input": "Enqueue 10, 20, 30, 40, 50 (MAX = 4)",
    "sample_output": "=== Enqueue Operation in Array Queue ===\nEnqueued 10 (front = 0, rear = 0)\nEnqueued 20 (front = 0, rear = 1)\nEnqueued 30 (front = 0, rear = 2)\nEnqueued 40 (front = 0, rear = 3)\nQueue Overflow! Cannot enqueue 50",
    "dry_run": "1. 10 inserted: front = 0, rear = 0.\n2. 20 inserted: rear = 1.\n3. 30 inserted: rear = 2.\n4. 40 inserted: rear = 3.\n5. 50: rear == 3 == MAX - 1 -> Overflow.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Constant time insertion. Subject to false overflow in linear queues when earlier slots are vacated.",
    "applications": "• Submitting background batch jobs.",
    "viva_questions": [
      {
        "q": "What is false overflow in a linear queue?",
        "a": "When rear reaches MAX-1, no new elements can be enqueued even if elements were dequeued from the front."
      }
    ]
  },
  "queue_array_dequeue": {
    "id": "queue_array_dequeue",
    "title": "Dequeue Operation in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "dequeue linear queue",
      "delete queue element",
      "remove from queue",
      "queue dequeue"
    ],
    "definition": "Dequeue removes and returns the front element from the queue after checking that the queue is not empty.",
    "concept_explanation": "Before deletion, check if `front == -1` or `front > rear` (Queue Underflow). If valid, read `queue[front]` and increment `front++`. If `front > rear` after deletion, reset both `front = rear = -1` to clean up the queue.",
    "algorithm": "Step 1: If front == -1 or front > rear, print \"Queue Underflow\" and return -1.\nStep 2: Retrieve val = queue[front].\nStep 3: Increment front = front + 1.\nStep 4: If front > rear, reset front = rear = -1.\nStep 5: Return val.",
    "pseudocode": "function dequeue():\n    if front == -1 or front > rear: error(\"Queue Underflow\")\n    val = queue[front]\n    front = front + 1\n    if front > rear: front = rear = -1\n    return val",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint queue[MAX];\nint front = -1;\nint rear = -1;\n\nint dequeue(void) {\n    if (front == -1 || front > rear) {\n        printf(\"Queue Underflow! Queue is empty.\\n\");\n        return -1;\n    }\n    int val = queue[front++];\n    if (front > rear) {\n        front = rear = -1; // Reset\n    }\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Dequeue Operation in Array Queue ===\\n\");\n    queue[0] = 100; queue[1] = 200; front = 0; rear = 1;\n    printf(\"Initial queue has 100, 200\\n\");\n    printf(\"Dequeued: %d\\n\", dequeue());\n    printf(\"Dequeued: %d\\n\", dequeue());\n    printf(\"Dequeued: %d (Underflow test)\\n\", dequeue());\n    return 0;\n}",
    "sample_input": "Queue [100, 200], Dequeue 3 times",
    "sample_output": "=== Dequeue Operation in Array Queue ===\nInitial queue has 100, 200\nDequeued: 100\nDequeued: 200\nQueue Underflow! Queue is empty.\nDequeued: -1 (Underflow test)",
    "dry_run": "front=0, rear=1:\n1. dequeue() returns 100, front becomes 1.\n2. dequeue() returns 200, front becomes 2 > rear -> resets front=rear=-1.\n3. dequeue() -> Underflow detected.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Constant time removal obeying FIFO order.",
    "applications": "• Servicing customer tickets, handling packet arrivals in network routers.",
    "viva_questions": [
      {
        "q": "Why do we reset front and rear to -1 when front > rear?",
        "a": "To recycle the queue so that new elements can be enqueued starting from index 0 again."
      }
    ]
  },
  "queue_array_peek": {
    "id": "queue_array_peek",
    "title": "Peek / Front Element in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "peek queue array",
      "front element queue",
      "inspect queue head"
    ],
    "definition": "The peek operation retrieves the element at the front of the queue without removing it or altering queue pointers.",
    "concept_explanation": "Inspects `queue[front]` if the queue contains elements (`front != -1 && front <= rear`). Leaves `front` and `rear` unchanged.",
    "algorithm": "Step 1: If front == -1 or front > rear, print empty message and return -1.\nStep 2: Return queue[front].",
    "pseudocode": "function peek():\n    if front == -1 or front > rear: return -1\n    return queue[front]",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint queue[MAX];\nint front = -1;\nint rear = -1;\n\nint peek(void) {\n    if (front == -1 || front > rear) {\n        printf(\"Queue is empty!\\n\");\n        return -1;\n    }\n    return queue[front];\n}\n\nint main(void) {\n    printf(\"=== Peek in Array Queue ===\\n\");\n    peek();\n    front = 0; rear = 0; queue[0] = 77;\n    printf(\"Front element: %d\\n\", peek());\n    rear++; queue[1] = 88;\n    printf(\"Front element remains: %d\\n\", peek());\n    return 0;\n}",
    "sample_input": "Empty queue -> insert 77 -> insert 88 -> peek",
    "sample_output": "=== Peek in Array Queue ===\nQueue is empty!\nFront element: 77\nFront element remains: 77",
    "dry_run": "front=0, queue[0]=77. Peek returns 77 without moving front.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Non-destructive inspection of upcoming job.",
    "applications": "• Checking next print job without de-spooling it.",
    "viva_questions": [
      {
        "q": "Does peek change front or rear pointers?",
        "a": "No, peek is strictly a read-only inspection."
      }
    ]
  },
  "queue_array_display": {
    "id": "queue_array_display",
    "title": "Display Queue Elements in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "display queue",
      "print array queue",
      "traverse queue"
    ],
    "definition": "Display traverses and prints all active elements currently resident in the queue from index `front` up to `rear`.",
    "concept_explanation": "Iterates sequentially from `front` to `rear`. If `front == -1` or `front > rear`, the queue is empty.",
    "algorithm": "Step 1: If front == -1 or front > rear, print \"Queue is empty\" and return.\nStep 2: For i = front to rear:\n        print queue[i]\nStep 3: Print newline.",
    "pseudocode": "function display():\n    if front == -1 or front > rear: print \"Empty\"\n    for i = front to rear: print queue[i]",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint queue[MAX] = {10, 20, 30, 40, 50};\nint front = 1;\nint rear = 3;\n\nvoid display(void) {\n    if (front == -1 || front > rear) {\n        printf(\"Queue is empty!\\n\");\n        return;\n    }\n    printf(\"Queue elements [Front -> Rear]: \");\n    for (int i = front; i <= rear; i++) {\n        printf(\"%d \", queue[i]);\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    printf(\"=== Display Queue Elements ===\\n\");\n    display();\n    return 0;\n}",
    "sample_input": "Queue with front = 1, rear = 3, elements: 20, 30, 40",
    "sample_output": "=== Display Queue Elements ===\nQueue elements [Front -> Rear]: 20 30 40",
    "dry_run": "i runs from 1 to 3: prints 20, 30, 40.",
    "time_complexity": "• O(n) where n is active queue size.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Provides full visibility into queue state.",
    "applications": "• Debugging waiting queues.",
    "viva_questions": [
      {
        "q": "Why do we start printing at front instead of 0?",
        "a": "Because slots before front have already been dequeued and are no longer part of the active queue."
      }
    ]
  },
  "queue_array_isempty": {
    "id": "queue_array_isempty",
    "title": "isEmpty Check in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "isEmpty queue array",
      "check empty queue",
      "queue isempty condition"
    ],
    "definition": "The isEmpty check verifies whether the queue contains zero elements by checking if `front == -1` or `front > rear`.",
    "concept_explanation": "A boolean check executing in O(1) time. Guards against Queue Underflow before dequeue operations.",
    "algorithm": "Step 1: If front == -1 or front > rear, return true (1).\nStep 2: Else return false (0).",
    "pseudocode": "function isEmpty():\n    return (front == -1 or front > rear)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n\nint front = -1, rear = -1;\n\nbool isEmpty(void) {\n    return (front == -1 || front > rear);\n}\n\nint main(void) {\n    printf(\"=== isEmpty Check in Array Queue ===\\n\");\n    printf(\"Initially: %s\\n\", isEmpty() ? \"EMPTY\" : \"NOT EMPTY\");\n    front = 0; rear = 0;\n    printf(\"After 1 enqueue: %s\\n\", isEmpty() ? \"EMPTY\" : \"NOT EMPTY\");\n    front = 1; // Dequeued\n    printf(\"After dequeue: %s\\n\", isEmpty() ? \"EMPTY\" : \"NOT EMPTY\");\n    return 0;\n}",
    "sample_input": "front=-1, rear=-1 -> front=0, rear=0 -> front=1, rear=0",
    "sample_output": "=== isEmpty Check in Array Queue ===\nInitially: EMPTY\nAfter 1 enqueue: NOT EMPTY\nAfter dequeue: EMPTY",
    "dry_run": "front=-1 -> true. front=0, rear=0 -> false. front=1 > rear=0 -> true.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Instant check preventing memory underflow.",
    "applications": "• Task schedulers checking if idle.",
    "viva_questions": [
      {
        "q": "Why can front be greater than rear in a linear queue?",
        "a": "When all enqueued elements have been dequeued one by one."
      }
    ]
  },
  "queue_array_isfull": {
    "id": "queue_array_isfull",
    "title": "isFull Check in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "isFull queue array",
      "queue capacity check",
      "check full linear queue"
    ],
    "definition": "The isFull check tests whether the rear pointer has reached the maximum capacity boundary of the array (`rear == MAX - 1`).",
    "concept_explanation": "In a linear queue, when `rear == MAX - 1`, no more items can be enqueued. This condition triggers even if previous deletions have left empty space at the front (false overflow).",
    "algorithm": "Step 1: If rear == MAX - 1, return true.\nStep 2: Else return false.",
    "pseudocode": "function isFull():\n    return rear == MAX - 1",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define MAX 3\n\nint rear = -1;\n\nbool isFull(void) {\n    return rear == MAX - 1;\n}\n\nint main(void) {\n    printf(\"=== isFull Check in Array Queue (MAX = 3) ===\\n\");\n    printf(\"rear = -1: %s\\n\", isFull() ? \"FULL\" : \"NOT FULL\");\n    rear = 2;\n    printf(\"rear = 2 (MAX-1): %s\\n\", isFull() ? \"FULL\" : \"NOT FULL\");\n    return 0;\n}",
    "sample_input": "MAX = 3, rear = -1, then rear = 2",
    "sample_output": "=== isFull Check in Array Queue (MAX = 3) ===\nrear = -1: NOT FULL\nrear = 2 (MAX-1): FULL",
    "dry_run": "rear == 2 == 3-1 -> returns true.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Guards against array out-of-bounds writes.",
    "applications": "• Flow control and network throttling.",
    "viva_questions": [
      {
        "q": "Does isFull in linear queue guarantee all array slots are occupied?",
        "a": "No, due to false overflow, elements before front may be vacant."
      }
    ]
  },
  "cqueue_create": {
    "id": "cqueue_create",
    "title": "Circular Queue Creation",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "create circular queue",
      "circular buffer init",
      "modulo queue creation"
    ],
    "definition": "Circular Queue creation involves allocating an array of size `MAX` and initializing `front = -1` and `rear = -1`, using modulo arithmetic `% MAX` to treat the array as a continuous ring.",
    "concept_explanation": "A circular queue connects the last index of the array back to the first index (index 0). This completely eliminates the false overflow limitation of linear queues by reusing vacant space created by dequeuing.",
    "algorithm": "Step 1: Define MAX size.\nStep 2: Declare array cqueue[MAX].\nStep 3: Set front = -1, rear = -1.\nStep 4: All pointer updates use modulo: (index + 1) % MAX.",
    "pseudocode": "constant MAX = 5\narray cqueue[MAX]\nfront = -1, rear = -1\nprint \"Circular queue initialized\"",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint cqueue[MAX];\nint front = -1;\nint rear = -1;\n\nvoid initCircularQueue(void) {\n    front = -1;\n    rear = -1;\n    printf(\"Circular Queue created with capacity %d.\\n\", MAX);\n    printf(\"Formula for advance: (index + 1) %% %d\\n\", MAX);\n}\n\nint main(void) {\n    printf(\"=== Circular Queue Creation ===\\n\");\n    initCircularQueue();\n    return 0;\n}",
    "sample_input": "MAX = 5, front = -1, rear = -1",
    "sample_output": "=== Circular Queue Creation ===\nCircular Queue created with capacity 5.\nFormula for advance: (index + 1) % 5",
    "dry_run": "front = -1, rear = -1. Ready for circular insertion.",
    "time_complexity": "• O(1) initialization.",
    "space_complexity": "• O(MAX) contiguous memory.",
    "advantages_disadvantages": "Solves memory wastage of linear queues without dynamic reallocation.",
    "applications": "• Ring buffers in audio/video streaming, OS round-robin schedulers.",
    "viva_questions": [
      {
        "q": "Why is circular queue preferred over linear queue in fixed arrays?",
        "a": "It reuses memory slots vacated by previous dequeues, preventing false overflow."
      }
    ]
  },
  "cqueue_enqueue": {
    "id": "cqueue_enqueue",
    "title": "Enqueue in Circular Queue using Modulo",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "enqueue circular queue",
      "circular queue insert",
      "modulo enqueue",
      "cqueue enqueue"
    ],
    "definition": "Enqueue in a circular queue inserts a new element at position `(rear + 1) % MAX` after verifying that the queue is not full.",
    "concept_explanation": "The full condition is `(rear + 1) % MAX == front`. If not full: if `front == -1`, set `front = rear = 0`; otherwise update `rear = (rear + 1) % MAX`. Then write to `cqueue[rear]`.",
    "algorithm": "Step 1: Check if (rear + 1) % MAX == front (Queue Full condition).\nStep 2: If true, print \"Circular Queue is Full\" and return.\nStep 3: If front == -1, set front = 0, rear = 0.\nStep 4: Else, set rear = (rear + 1) % MAX.\nStep 5: Store value: cqueue[rear] = val.",
    "pseudocode": "function enqueue(val):\n    if (rear + 1) % MAX == front: error(\"Queue Full\")\n    if front == -1: front = rear = 0\n    else: rear = (rear + 1) % MAX\n    cqueue[rear] = val",
    "c_program": "#include <stdio.h>\n#define MAX 3\n\nint cqueue[MAX];\nint front = -1, rear = -1;\n\nvoid enqueue(int val) {\n    if ((rear + 1) % MAX == front) {\n        printf(\"Circular Queue Full! Cannot enqueue %d\\n\", val);\n        return;\n    }\n    if (front == -1) {\n        front = rear = 0;\n    } else {\n        rear = (rear + 1) % MAX;\n    }\n    cqueue[rear] = val;\n    printf(\"Enqueued %d at index %d (front=%d, rear=%d)\\n\", val, rear, front, rear);\n}\n\nint main(void) {\n    printf(\"=== Enqueue in Circular Queue (MAX = 3) ===\\n\");\n    enqueue(10);\n    enqueue(20);\n    enqueue(30);\n    enqueue(40); // Full\n    return 0;\n}",
    "sample_input": "Enqueue 10, 20, 30, 40 (MAX = 3)",
    "sample_output": "=== Enqueue in Circular Queue (MAX = 3) ===\nEnqueued 10 at index 0 (front=0, rear=0)\nEnqueued 20 at index 1 (front=0, rear=1)\nEnqueued 30 at index 2 (front=0, rear=2)\nCircular Queue Full! Cannot enqueue 40",
    "dry_run": "1. 10 at index 0 (front=0, rear=0)\n2. 20 at index 1 (rear=1)\n3. 30 at index 2 (rear=2)\n4. (2 + 1) % 3 == 0 == front -> Full!",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Optimal space utilization.",
    "applications": "• Keyboard input buffer (ring buffer).",
    "viva_questions": [
      {
        "q": "What is the condition for a circular queue to be full?",
        "a": "(rear + 1) % MAX == front."
      }
    ]
  },
  "cqueue_dequeue": {
    "id": "cqueue_dequeue",
    "title": "Dequeue in Circular Queue using Modulo",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "dequeue circular queue",
      "circular queue delete",
      "modulo dequeue",
      "cqueue dequeue"
    ],
    "definition": "Dequeue in a circular queue removes the front element and advances `front = (front + 1) % MAX`, resetting both to -1 if the queue becomes empty.",
    "concept_explanation": "If `front == -1`, Queue Underflow occurs. If `front == rear`, only one element exists; remove it and reset `front = rear = -1`. Otherwise, retrieve `cqueue[front]` and advance `front = (front + 1) % MAX`.",
    "algorithm": "Step 1: If front == -1, print \"Queue Underflow\" and return -1.\nStep 2: val = cqueue[front].\nStep 3: If front == rear: front = rear = -1.\nStep 4: Else: front = (front + 1) % MAX.\nStep 5: Return val.",
    "pseudocode": "function dequeue():\n    if front == -1: error(\"Queue Underflow\")\n    val = cqueue[front]\n    if front == rear: front = rear = -1\n    else: front = (front + 1) % MAX\n    return val",
    "c_program": "#include <stdio.h>\n#define MAX 3\n\nint cqueue[MAX];\nint front = -1, rear = -1;\n\nint dequeue(void) {\n    if (front == -1) {\n        printf(\"Circular Queue Underflow!\\n\");\n        return -1;\n    }\n    int val = cqueue[front];\n    if (front == rear) {\n        front = rear = -1; // Reset when last element dequeued\n    } else {\n        front = (front + 1) % MAX;\n    }\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Dequeue in Circular Queue ===\\n\");\n    front = 0; rear = 1; cqueue[0] = 11; cqueue[1] = 22;\n    printf(\"Dequeued: %d (front now: %d)\\n\", dequeue(), front);\n    printf(\"Dequeued: %d (front now: %d)\\n\", dequeue(), front);\n    dequeue(); // Underflow\n    return 0;\n}",
    "sample_input": "Queue [11, 22], Dequeue twice, then 3rd time",
    "sample_output": "=== Dequeue in Circular Queue ===\nDequeued: 11 (front now: 1)\nDequeued: 22 (front now: -1)\nCircular Queue Underflow!",
    "dry_run": "front=0, rear=1:\n1. dequeue returns 11, front advances to 1.\n2. front == rear == 1: returns 22, resets front=rear=-1.\n3. front == -1: Underflow.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Constant time removal with instant recycling of slots.",
    "applications": "• Real-time operating system scheduler dispatch.",
    "viva_questions": [
      {
        "q": "What happens when front == rear during dequeue?",
        "a": "It indicates that the last remaining item is being dequeued, so both front and rear are reset to -1."
      }
    ]
  },
  "cqueue_display": {
    "id": "cqueue_display",
    "title": "Display Circular Queue Elements",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "display circular queue",
      "print cqueue",
      "traverse circular queue"
    ],
    "definition": "Display traverses and prints all active elements in a circular queue from `front` to `rear` taking pointer wrapping around the array boundary into account.",
    "concept_explanation": "Because `rear` can be less than `front` when wrapped, a simple `for (int i = front; i <= rear; i++)` does not suffice. Instead, a while or do-while loop increments `i = (i + 1) % MAX` until reaching `rear`.",
    "algorithm": "Step 1: If front == -1, print \"Queue is empty\" and return.\nStep 2: Initialize i = front.\nStep 3: Print cqueue[i].\nStep 4: While i != rear:\n        i = (i + 1) % MAX\n        Print cqueue[i]\nStep 5: Print newline.",
    "pseudocode": "function display():\n    if front == -1: print \"Empty\"; return\n    i = front\n    while true:\n        print cqueue[i]\n        if i == rear: break\n        i = (i + 1) % MAX",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint cqueue[MAX] = {50, 0, 0, 30, 40};\nint front = 3; // Wrapped around\nint rear = 0;\n\nvoid display(void) {\n    if (front == -1) {\n        printf(\"Circular Queue is empty!\\n\");\n        return;\n    }\n    printf(\"Circular Queue [Front -> Rear]: \");\n    int i = front;\n    while (1) {\n        printf(\"%d \", cqueue[i]);\n        if (i == rear) break;\n        i = (i + 1) % MAX;\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    printf(\"=== Display Circular Queue ===\\n\");\n    display();\n    return 0;\n}",
    "sample_input": "cqueue with front = 3, rear = 0, elements at 3 (30), 4 (40), 0 (50)",
    "sample_output": "=== Display Circular Queue ===\nCircular Queue [Front -> Rear]: 30 40 50",
    "dry_run": "i = 3: prints 30. i = (3+1)%5 = 4: prints 40. i = (4+1)%5 = 0: prints 50. i == rear (0) -> break.",
    "time_complexity": "• O(n) where n is active elements count.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Correctly visualizes wrapped circular elements.",
    "applications": "• Inspecting ring buffers during debugging.",
    "viva_questions": [
      {
        "q": "Why can i = (i + 1) % MAX wrap around?",
        "a": "Because the modulo operator resets index MAX back to 0."
      }
    ]
  },
  "cqueue_front_rear": {
    "id": "cqueue_front_rear",
    "title": "Front & Rear Pointer Movement in Circular Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "front rear pointer movement",
      "circular queue wrapping",
      "cqueue index math"
    ],
    "definition": "Front and Rear pointer movement governs how indices cycle through `0, 1, ..., MAX-1, 0, 1...` using the formula `(index + 1) % MAX`.",
    "concept_explanation": "In a circular queue, when `rear` reaches `MAX - 1`, the next advance sets `rear = (MAX - 1 + 1) % MAX = 0`, as long as index 0 is vacant (`front != 0`). Similarly, `front` wraps to 0 upon reaching `MAX - 1`.",
    "algorithm": "Pointer Advance Rule:\nnextIndex = (currentIndex + 1) % MAX",
    "pseudocode": "rear = (rear + 1) % MAX\nfront = (front + 1) % MAX",
    "c_program": "#include <stdio.h>\n#define MAX 4\n\nint main(void) {\n    printf(\"=== Front & Rear Pointer Movement Demonstration ===\\n\");\n    printf(\"Capacity MAX = %d\\n\", MAX);\n    for (int i = 0; i < 8; i++) {\n        printf(\"Step %d: index %d -> next index = (%d + 1) %% %d = %d\\n\",\n               i, i % MAX, i % MAX, MAX, (i % MAX + 1) % MAX);\n    }\n    return 0;\n}",
    "sample_input": "Cycle 8 steps on MAX = 4",
    "sample_output": "=== Front & Rear Pointer Movement Demonstration ===\nCapacity MAX = 4\nStep 0: index 0 -> next index = (0 + 1) % 4 = 1\nStep 1: index 1 -> next index = (1 + 1) % 4 = 2\nStep 2: index 2 -> next index = (2 + 1) % 4 = 3\nStep 3: index 3 -> next index = (3 + 1) % 4 = 0\nStep 4: index 0 -> next index = (0 + 1) % 4 = 1\nStep 5: index 1 -> next index = (1 + 1) % 4 = 2\nStep 6: index 2 -> next index = (2 + 1) % 4 = 3\nStep 7: index 3 -> next index = (3 + 1) % 4 = 0",
    "dry_run": "Index wraps continuously: 0 -> 1 -> 2 -> 3 -> 0 -> 1 -> 2 -> 3.",
    "time_complexity": "• O(1) per pointer update.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Continuous circular flow without memory relocation.",
    "applications": "• Clock replacement page algorithms, streaming media buffers.",
    "viva_questions": [
      {
        "q": "What happens when rear is at MAX - 1 and index 0 is free?",
        "a": "rear wraps around to 0 via (rear + 1) % MAX."
      }
    ]
  },
  "cqueue_full_empty": {
    "id": "cqueue_full_empty",
    "title": "Full and Empty Conditions in Circular Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "circular queue full condition",
      "cqueue empty condition",
      "cqueue boundary logic"
    ],
    "definition": "In a Circular Queue, Empty condition is `front == -1`; Full condition is `(rear + 1) % MAX == front`.",
    "concept_explanation": "These two mathematical conditions distinguish an empty queue from a full queue unambiguously. Full occurs when advancing `rear` by one would collide with `front`. Empty occurs when `front == -1`.",
    "algorithm": "Condition Empty: front == -1\nCondition Full: (rear + 1) % MAX == front",
    "pseudocode": "function isEmpty(): return front == -1\nfunction isFull(): return (rear + 1) % MAX == front",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define MAX 3\n\nint front = -1, rear = -1;\n\nbool isEmpty(void) { return front == -1; }\nbool isFull(void) { return (rear + 1) % MAX == front; }\n\nint main(void) {\n    printf(\"=== Circular Queue Full & Empty Conditions ===\\n\");\n    printf(\"1. Initial state (front=-1, rear=-1):\\n\");\n    printf(\"   isEmpty: %s, isFull: %s\\n\", isEmpty() ? \"TRUE\" : \"FALSE\", isFull() ? \"TRUE\" : \"FALSE\");\n\n    front = 0; rear = 2; // Array indices 0, 1, 2 filled\n    printf(\"2. Full state (front=0, rear=2 on MAX=3):\\n\");\n    printf(\"   isEmpty: %s, isFull: %s\\n\", isEmpty() ? \"TRUE\" : \"FALSE\", isFull() ? \"TRUE\" : \"FALSE\");\n    return 0;\n}",
    "sample_input": "Evaluate conditions at start and when full",
    "sample_output": "=== Circular Queue Full & Empty Conditions ===\n1. Initial state (front=-1, rear=-1):\n   isEmpty: TRUE, isFull: FALSE\n2. Full state (front=0, rear=2 on MAX=3):\n   isEmpty: FALSE, isFull: TRUE",
    "dry_run": "Initial: front=-1 -> isEmpty=true.\nFull: (2+1)%3 = 0 == front -> isFull=true.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Clean mathematical boundaries without ambiguity.",
    "applications": "• Hardware FIFO buffer controllers.",
    "viva_questions": [
      {
        "q": "Why is full condition (rear + 1) % MAX == front?",
        "a": "Because if rear advances one more step circularly, it will overwrite the unread front element."
      }
    ]
  },
  "queue_ll_create": {
    "id": "queue_ll_create",
    "title": "Queue Creation using Linked List",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "create linked list queue",
      "dynamic queue",
      "queue ll init",
      "front rear pointers null"
    ],
    "definition": "Queue creation using a linked list involves initializing two node pointers: `front = NULL` and `rear = NULL`, allowing the queue to grow dynamically without size limits.",
    "concept_explanation": "Each element in a linked queue is a dynamic node containing `data` and `next`. `front` points to the head node (where dequeue occurs), and `rear` points to the tail node (where enqueue occurs). Initially both are NULL.",
    "algorithm": "Step 1: Define structure Node with int data and struct Node* next.\nStep 2: Set struct Node* front = NULL; struct Node* rear = NULL.\nStep 3: Queue is ready for dynamic operations.",
    "pseudocode": "struct Node:\n    data: int\n    next: pointer to Node\n\nfront = NULL\nrear = NULL",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* front = NULL;\nstruct Node* rear = NULL;\n\nvoid initQueue(void) {\n    front = NULL;\n    rear = NULL;\n    printf(\"Linked List Queue initialized. front = NULL, rear = NULL (Empty Queue)\\n\");\n}\n\nint main(void) {\n    printf(\"=== Queue Creation using Linked List ===\\n\");\n    initQueue();\n    return 0;\n}",
    "sample_input": "front = NULL, rear = NULL",
    "sample_output": "=== Queue Creation using Linked List ===\nLinked List Queue initialized. front = NULL, rear = NULL (Empty Queue)",
    "dry_run": "Pointers initialized to NULL. Zero memory consumed.",
    "time_complexity": "• O(1) initialization.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Dynamic capacity, never full unless system RAM exhausted.",
    "applications": "• Web server request queues with unpredictable traffic.",
    "viva_questions": [
      {
        "q": "Where do enqueue and dequeue occur in a linked list queue?",
        "a": "Enqueue occurs at rear (tail); dequeue occurs at front (head)."
      }
    ]
  },
  "queue_ll_enqueue": {
    "id": "queue_ll_enqueue",
    "title": "Enqueue Operation in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "enqueue linked list queue",
      "insert dynamic queue",
      "queue ll enqueue"
    ],
    "definition": "Enqueue dynamically allocates a new node, appends it after `rear->next`, and updates `rear` to point to the new node in O(1) time.",
    "concept_explanation": "Allocate `newNode`. Set `newNode->data = val` and `newNode->next = NULL`. If `rear == NULL`, the queue was empty, so set `front = rear = newNode`. Otherwise, set `rear->next = newNode` and `rear = newNode`.",
    "algorithm": "Step 1: Allocate newNode = malloc(sizeof(struct Node)).\nStep 2: Check if newNode == NULL (Heap full).\nStep 3: newNode->data = val; newNode->next = NULL.\nStep 4: If rear == NULL:\n        front = rear = newNode\nStep 5: Else:\n        rear->next = newNode\n        rear = newNode",
    "pseudocode": "function enqueue(val):\n    newNode = allocate(Node)\n    newNode.data = val; newNode.next = NULL\n    if rear == NULL:\n        front = rear = newNode\n    else:\n        rear.next = newNode\n        rear = newNode",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* front = NULL;\nstruct Node* rear = NULL;\n\nvoid enqueue(int val) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    if (newNode == NULL) {\n        printf(\"Memory allocation failed!\\n\");\n        return;\n    }\n    newNode->data = val;\n    newNode->next = NULL;\n    if (rear == NULL) {\n        front = rear = newNode;\n    } else {\n        rear->next = newNode;\n        rear = newNode;\n    }\n    printf(\"Enqueued %d (front node: %d, rear node: %d)\\n\", val, front->data, rear->data);\n}\n\nint main(void) {\n    printf(\"=== Enqueue in Linked List Queue ===\\n\");\n    enqueue(10);\n    enqueue(20);\n    enqueue(30);\n    return 0;\n}",
    "sample_input": "Enqueue 10, 20, 30",
    "sample_output": "=== Enqueue in Linked List Queue ===\nEnqueued 10 (front node: 10, rear node: 10)\nEnqueued 20 (front node: 10, rear node: 20)\nEnqueued 30 (front node: 10, rear node: 30)",
    "dry_run": "1. newNode(10): front = rear = newNode(10).\n2. newNode(20): rear->next = newNode(20), rear = newNode(20).\n3. newNode(30): rear->next = newNode(30), rear = newNode(30).",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) per node.",
    "advantages_disadvantages": "No capacity limit; O(1) insertion.",
    "applications": "• Asynchronous event queues.",
    "viva_questions": [
      {
        "q": "Why is linked list enqueue O(1)?",
        "a": "Because the rear pointer directly references the last node, avoiding traversal."
      }
    ]
  },
  "queue_ll_dequeue": {
    "id": "queue_ll_dequeue",
    "title": "Dequeue Operation in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "dequeue linked list queue",
      "delete dynamic queue",
      "queue ll dequeue"
    ],
    "definition": "Dequeue removes the front node from the queue, advances `front = front->next`, frees the memory, and resets `rear = NULL` if the queue becomes empty.",
    "concept_explanation": "If `front == NULL`, the queue is empty (Underflow). Otherwise, save `temp = front`, retrieve `val = temp->data`, advance `front = front->next`. If `front == NULL`, set `rear = NULL` as well. Free `temp` and return `val`.",
    "algorithm": "Step 1: If front == NULL, print Underflow and return -1.\nStep 2: temp = front, val = temp->data.\nStep 3: front = front->next.\nStep 4: If front == NULL, rear = NULL.\nStep 5: free(temp).\nStep 6: Return val.",
    "pseudocode": "function dequeue():\n    if front == NULL: error(\"Underflow\")\n    temp = front\n    val = temp.data\n    front = front.next\n    if front == NULL: rear = NULL\n    free(temp)\n    return val",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* front = NULL;\nstruct Node* rear = NULL;\n\nvoid enqueue(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->next = NULL;\n    if (rear == NULL) front = rear = n;\n    else { rear->next = n; rear = n; }\n}\n\nint dequeue(void) {\n    if (front == NULL) {\n        printf(\"Queue Underflow!\\n\");\n        return -1;\n    }\n    struct Node* temp = front;\n    int val = temp->data;\n    front = front->next;\n    if (front == NULL) rear = NULL;\n    free(temp);\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Dequeue in Linked List Queue ===\\n\");\n    enqueue(100);\n    enqueue(200);\n    printf(\"Dequeued: %d\\n\", dequeue());\n    printf(\"Dequeued: %d\\n\", dequeue());\n    dequeue(); // Underflow\n    return 0;\n}",
    "sample_input": "Enqueue 100, 200, Dequeue 3 times",
    "sample_output": "=== Dequeue in Linked List Queue ===\nDequeued: 100\nDequeued: 200\nQueue Underflow!",
    "dry_run": "1. dequeue: front points to 100, front advances to 200, 100 freed.\n2. dequeue: front points to 200, front becomes NULL -> rear becomes NULL, 200 freed.\n3. dequeue: front is NULL -> Underflow!",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Frees memory immediately; O(1) deletion.",
    "applications": "• Worker thread task processing.",
    "viva_questions": [
      {
        "q": "What happens to rear when the last node is dequeued?",
        "a": "rear must be explicitly set to NULL because front becomes NULL."
      }
    ]
  },
  "queue_ll_peek": {
    "id": "queue_ll_peek",
    "title": "Peek / Front Operation in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "peek linked list queue",
      "head element dynamic queue",
      "queue ll peek"
    ],
    "definition": "Peek reads the data value of the `front` node in a linked list queue without removing it or altering any pointers.",
    "concept_explanation": "Checks if `front != NULL` and returns `front->data` in O(1) time.",
    "algorithm": "Step 1: If front == NULL, print empty and return -1.\nStep 2: Return front->data.",
    "pseudocode": "function peek():\n    if front == NULL: return -1\n    return front.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* front = NULL;\nstruct Node* rear = NULL;\n\nint peek(void) {\n    if (front == NULL) {\n        printf(\"Queue is empty!\\n\");\n        return -1;\n    }\n    return front->data;\n}\n\nint main(void) {\n    printf(\"=== Peek in Linked List Queue ===\\n\");\n    peek();\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = 888; n->next = NULL; front = rear = n;\n    printf(\"Front node value: %d\\n\", peek());\n    return 0;\n}",
    "sample_input": "Peek empty, then peek node with 888",
    "sample_output": "=== Peek in Linked List Queue ===\nQueue is empty!\nFront node value: 888",
    "dry_run": "front=NULL -> empty message. front points to 888 -> returns 888.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Non-destructive inspection.",
    "applications": "• Peeking upcoming customer order in processing pipeline.",
    "viva_questions": [
      {
        "q": "Does peek affect the rear pointer?",
        "a": "No, peek only reads front->data."
      }
    ]
  },
  "queue_ll_display": {
    "id": "queue_ll_display",
    "title": "Display Queue Elements in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "display linked list queue",
      "print dynamic queue",
      "queue ll traversal"
    ],
    "definition": "Display traverses and prints all nodes in the linked queue from `front` to `rear` sequentially.",
    "concept_explanation": "Initializes a temporary pointer `temp = front` and loops until `temp == NULL`, printing `temp->data`.",
    "algorithm": "Step 1: If front == NULL, print \"Queue is empty\" and return.\nStep 2: temp = front.\nStep 3: While temp != NULL:\n        print temp->data\n        temp = temp->next\nStep 4: Print newline.",
    "pseudocode": "function display():\n    temp = front\n    while temp != NULL:\n        print temp.data\n        temp = temp.next",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* front = NULL;\nstruct Node* rear = NULL;\n\nvoid enqueue(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->next = NULL;\n    if (rear == NULL) front = rear = n;\n    else { rear->next = n; rear = n; }\n}\n\nvoid display(void) {\n    if (front == NULL) {\n        printf(\"Queue is empty!\\n\");\n        return;\n    }\n    struct Node* temp = front;\n    printf(\"Linked Queue [Front -> Rear]: \");\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    printf(\"=== Display Linked List Queue ===\\n\");\n    display();\n    enqueue(10);\n    enqueue(20);\n    enqueue(30);\n    display();\n    return 0;\n}",
    "sample_input": "Enqueue 10, 20, 30; call display()",
    "sample_output": "=== Display Linked List Queue ===\nQueue is empty!\nLinked Queue [Front -> Rear]: 10 -> 20 -> 30 -> NULL",
    "dry_run": "temp runs: 10 -> 20 -> 30 -> NULL.",
    "time_complexity": "• O(n) where n is node count.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Displays dynamic structure accurately.",
    "applications": "• Debugging waiting pipeline buffers.",
    "viva_questions": [
      {
        "q": "What marks the end of a linked list queue?",
        "a": "rear->next == NULL."
      }
    ]
  },
  "queue_ll_empty": {
    "id": "queue_ll_empty",
    "title": "Empty Condition in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "empty condition linked list queue",
      "check empty ll queue",
      "queue ll isempty"
    ],
    "definition": "In a Linked List Queue, the queue is empty if and only if `front == NULL`.",
    "concept_explanation": "A single pointer comparison `front == NULL` determines whether the queue contains any active nodes.",
    "algorithm": "Step 1: If front == NULL return true.\nStep 2: Else return false.",
    "pseudocode": "function isEmpty():\n    return front == NULL",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* front = NULL;\n\nbool isEmpty(void) {\n    return front == NULL;\n}\n\nint main(void) {\n    printf(\"=== Linked List Queue Empty Condition ===\\n\");\n    printf(\"Is queue empty? %s\\n\", isEmpty() ? \"YES\" : \"NO\");\n    return 0;\n}",
    "sample_input": "Check front == NULL",
    "sample_output": "=== Linked List Queue Empty Condition ===\nIs queue empty? YES",
    "dry_run": "front is NULL -> returns true.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "O(1) guard condition.",
    "applications": "• Polling loops in async workers.",
    "viva_questions": [
      {
        "q": "If front is NULL, what must rear be in a consistent queue?",
        "a": "rear should also be NULL."
      }
    ]
  },
  "queue_deque": {
    "id": "queue_deque",
    "title": "Double-Ended Queue (Deque)",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_special",
    "subcategoryName": "Specialized Queues",
    "keywords": [
      "deque",
      "double ended queue",
      "insert front insert rear",
      "delete front delete rear"
    ],
    "definition": "A Double-Ended Queue (Deque) is a generalized queue in which elements can be inserted and deleted at both ends (front and rear).",
    "concept_explanation": "A Deque combines the capabilities of both Stacks and Queues. It supports four primary operations: `insertFront()`, `insertRear()`, `deleteFront()`, and `deleteRear()`. Can be implemented using a circular array or doubly linked list.",
    "algorithm": "Operations:\n1. insertFront: insert at (front - 1 + MAX) % MAX\n2. insertRear: insert at (rear + 1) % MAX\n3. deleteFront: remove from front, front = (front + 1) % MAX\n4. deleteRear: remove from rear, rear = (rear - 1 + MAX) % MAX",
    "pseudocode": "class Deque:\n    insertFront(x)\n    insertRear(x)\n    deleteFront()\n    deleteRear()",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint deque[MAX];\nint front = -1, rear = -1;\n\nvoid insertRear(int val) {\n    if ((rear + 1) % MAX == front) { printf(\"Deque Full!\\n\"); return; }\n    if (front == -1) { front = rear = 0; }\n    else { rear = (rear + 1) % MAX; }\n    deque[rear] = val;\n    printf(\"insertRear: %d\\n\", val);\n}\n\nvoid insertFront(int val) {\n    if ((rear + 1) % MAX == front) { printf(\"Deque Full!\\n\"); return; }\n    if (front == -1) { front = rear = 0; }\n    else { front = (front - 1 + MAX) % MAX; }\n    deque[front] = val;\n    printf(\"insertFront: %d\\n\", val);\n}\n\nint deleteFront(void) {\n    if (front == -1) { printf(\"Deque Empty!\\n\"); return -1; }\n    int val = deque[front];\n    if (front == rear) { front = rear = -1; }\n    else { front = (front + 1) % MAX; }\n    return val;\n}\n\nint deleteRear(void) {\n    if (front == -1) { printf(\"Deque Empty!\\n\"); return -1; }\n    int val = deque[rear];\n    if (front == rear) { front = rear = -1; }\n    else { rear = (rear - 1 + MAX) % MAX; }\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Double-Ended Queue (Deque) ===\\n\");\n    insertRear(10);\n    insertRear(20);\n    insertFront(5);\n    printf(\"deleteFront: %d\\n\", deleteFront());\n    printf(\"deleteRear:  %d\\n\", deleteRear());\n    return 0;\n}",
    "sample_input": "insertRear(10), insertRear(20), insertFront(5), deleteFront(), deleteRear()",
    "sample_output": "=== Double-Ended Queue (Deque) ===\ninsertRear: 10\ninsertRear: 20\ninsertFront: 5\ndeleteFront: 5\ndeleteRear:  20",
    "dry_run": "1. insertRear(10): deque = [10]\n2. insertRear(20): deque = [10, 20]\n3. insertFront(5): deque = [5, 10, 20]\n4. deleteFront(): 5 removed\n5. deleteRear(): 20 removed",
    "time_complexity": "• O(1) for all 4 operations.",
    "space_complexity": "• O(MAX) array storage.",
    "advantages_disadvantages": "Combines stack and queue behaviors in one structure.",
    "applications": "• Sliding window maximum algorithm, undo/redo buffers, web browser tab history.",
    "viva_questions": [
      {
        "q": "What are the two variants of restricted deques?",
        "a": "Input-restricted deque (deletion at both ends, insertion at one end) and Output-restricted deque (insertion at both ends, deletion at one end)."
      }
    ]
  },
  "queue_priority": {
    "id": "queue_priority",
    "title": "Priority Queue Implementation",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_special",
    "subcategoryName": "Specialized Queues",
    "keywords": [
      "priority queue",
      "pq c program",
      "priority scheduling",
      "ordered queue"
    ],
    "definition": "A Priority Queue is an abstract data structure where each element is assigned a priority, and elements with higher priority are dequeued before elements with lower priority.",
    "concept_explanation": "Unlike standard FIFO queues, order of arrival does not solely determine processing order. When elements have equal priority, they are served according to FIFO order. Commonly implemented using sorted arrays, linked lists, or binary heaps.",
    "algorithm": "Ascending Priority Queue (Lowest value = Highest priority):\n1. enqueue(val, priority): insert element into array sorted by priority.\n2. dequeue(): remove element with highest priority (index 0).",
    "pseudocode": "function enqueue(val, pr):\n    find index where pr fits\n    shift elements right\n    insert item at index\n\nfunction dequeue():\n    return item at index 0",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nstruct Element {\n    int value;\n    int priority; // Lower integer = Higher priority\n};\n\nstruct Element pq[MAX];\nint size = 0;\n\nvoid enqueue(int val, int pr) {\n    if (size == MAX) {\n        printf(\"Priority Queue Full!\\n\");\n        return;\n    }\n    int i = size - 1;\n    // Shift elements with lower priority (higher pr value) to the right\n    while (i >= 0 && pq[i].priority > pr) {\n        pq[i + 1] = pq[i];\n        i--;\n    }\n    pq[i + 1].value = val;\n    pq[i + 1].priority = pr;\n    size++;\n    printf(\"Enqueued Value: %d (Priority: %d)\\n\", val, pr);\n}\n\nint dequeue(void) {\n    if (size == 0) {\n        printf(\"Priority Queue Empty!\\n\");\n        return -1;\n    }\n    int val = pq[0].value;\n    for (int i = 0; i < size - 1; i++) {\n        pq[i] = pq[i + 1];\n    }\n    size--;\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Priority Queue Demonstration (Lower number = Higher priority) ===\\n\");\n    enqueue(100, 3);\n    enqueue(200, 1); // High priority\n    enqueue(300, 2);\n    printf(\"Dequeued: %d (Highest priority)\\n\", dequeue());\n    printf(\"Dequeued: %d\\n\", dequeue());\n    printf(\"Dequeued: %d\\n\", dequeue());\n    return 0;\n}",
    "sample_input": "Enqueue (100, pr 3), (200, pr 1), (300, pr 2)",
    "sample_output": "=== Priority Queue Demonstration (Lower number = Higher priority) ===\nEnqueued Value: 100 (Priority: 3)\nEnqueued Value: 200 (Priority: 1)\nEnqueued Value: 300 (Priority: 2)\nDequeued: 200 (Highest priority)\nDequeued: 300\nDequeued: 100",
    "dry_run": "Items sorted by priority: (200, 1), (300, 2), (100, 3). Dequeued in that exact priority order.",
    "time_complexity": "• Enqueue: O(n), Dequeue: O(1) with sorted array (or O(log n) with Binary Heap).",
    "space_complexity": "• O(MAX) storage.",
    "advantages_disadvantages": "Ensures critical tasks are serviced immediately.",
    "applications": "• Dijkstra shortest path algorithm, Huffman coding, OS preemptive CPU scheduling.",
    "viva_questions": [
      {
        "q": "What data structure provides the most efficient implementation of a Priority Queue?",
        "a": "A Binary Heap (Min-Heap or Max-Heap), providing O(log n) insertion and deletion."
      }
    ]
  },
  "tree_bt_create": {
    "id": "tree_bt_create",
    "title": "Binary Tree Creation",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "create binary tree",
      "binary tree node",
      "init binary tree",
      "root node c"
    ],
    "definition": "Binary tree creation involves declaring a node structure containing a data field and two self-referential pointers (`left` and `right`), and dynamically allocating memory for the root node.",
    "concept_explanation": "A Binary Tree is a non-linear hierarchical data structure in which each node has at most two children, referred to as the left child and the right child. The topmost node is called the root. Nodes without children are called leaf nodes.",
    "algorithm": "Step 1: Define structure Node with int data, struct Node* left, struct Node* right.\nStep 2: Define function createNode(val) that allocates memory using malloc.\nStep 3: Assign data = val, left = NULL, right = NULL.\nStep 4: Return newNode pointer.",
    "pseudocode": "struct Node:\n    data: int\n    left: pointer to Node\n    right: pointer to Node\n\nfunction createNode(val):\n    newNode = allocate(Node)\n    newNode.data = val\n    newNode.left = NULL\n    newNode.right = NULL\n    return newNode",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* createNode(int value) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = value;\n    newNode->left = NULL;\n    newNode->right = NULL;\n    return newNode;\n}\n\nint main(void) {\n    printf(\"=== Binary Tree Creation Demonstration ===\\n\");\n    struct Node* root = createNode(1);\n    root->left = createNode(2);\n    root->right = createNode(3);\n    root->left->left = createNode(4);\n\n    printf(\"Root: %d\\n\", root->data);\n    printf(\"Root->Left: %d, Root->Right: %d\\n\", root->left->data, root->right->data);\n    printf(\"Root->Left->Left: %d\\n\", root->left->left->data);\n    return 0;\n}",
    "sample_input": "Create root 1 with children left=2, right=3, left-left=4",
    "sample_output": "=== Binary Tree Creation Demonstration ===\nRoot: 1\nRoot->Left: 2, Root->Right: 3\nRoot->Left->Left: 4",
    "dry_run": "Root node 1 allocated. Left child 2 attached. Right child 3 attached. Left-left leaf 4 attached.",
    "time_complexity": "• O(1) per node creation.",
    "space_complexity": "• O(1) per node.",
    "advantages_disadvantages": "Hierarchical representation of data with logarithmic potential.",
    "applications": "• File directory trees, decision trees, DOM trees.",
    "viva_questions": [
      {
        "q": "What is the maximum number of nodes at level i of a binary tree?",
        "a": "2^i nodes (assuming root is at level 0)."
      }
    ]
  },
  "tree_bt_linked_rep": {
    "id": "tree_bt_linked_rep",
    "title": "Linked Representation of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "linked representation binary tree",
      "binary tree node pointers",
      "tree memory layout"
    ],
    "definition": "Linked representation stores a binary tree in memory using dynamically allocated nodes where each node contains three fields: data, pointer to left child, and pointer to right child.",
    "concept_explanation": "Unlike sequential array representation (which wastes memory on skewed or sparse trees), linked representation only allocates memory for active nodes. NULL pointers designate missing or empty subtrees.",
    "algorithm": "Node layout:\n[ left child pointer | data | right child pointer ]\nLeaves have left = NULL and right = NULL.",
    "pseudocode": "struct Node:\n    data: int\n    left: Node*\n    right: Node*",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* newNode(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = NULL; n->right = NULL;\n    return n;\n}\n\nint main(void) {\n    printf(\"=== Linked Representation of Binary Tree ===\\n\");\n    struct Node* root = newNode(10);\n    root->left = newNode(20);\n    root->right = newNode(30);\n\n    printf(\"Node at %p: data = %d, left = %p, right = %p\\n\", (void*)root, root->data, (void*)root->left, (void*)root->right);\n    printf(\"Node at %p (Left child):  data = %d\\n\", (void*)root->left, root->left->data);\n    printf(\"Node at %p (Right child): data = %d\\n\", (void*)root->right, root->right->data);\n    return 0;\n}",
    "sample_input": "Create node 10 with children 20 and 30",
    "sample_output": "=== Linked Representation of Binary Tree ===\nNode at [addr]: data = 10, left = [addr], right = [addr]\nNode at [addr] (Left child):  data = 20\nNode at [addr] (Right child): data = 30",
    "dry_run": "Root node holds memory addresses pointing directly to heap allocations of its children.",
    "time_complexity": "• O(1) allocation per node.",
    "space_complexity": "• O(n) total node storage with pointer overhead.",
    "advantages_disadvantages": "No wasted array slots for sparse trees. Pointer storage overhead (2 pointers per node).",
    "applications": "• Parsing syntax expressions, game decision hierarchies.",
    "viva_questions": [
      {
        "q": "How many NULL pointers exist in a binary tree with n nodes?",
        "a": "Exactly n + 1 NULL pointers."
      }
    ]
  },
  "tree_bt_preorder": {
    "id": "tree_bt_preorder",
    "title": "Preorder Traversal of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "preorder traversal",
      "root left right",
      "binary tree preorder",
      "tree preorder c"
    ],
    "definition": "Preorder traversal is a depth-first traversal technique that visits the current node (Root) first, then traverses the Left subtree, and finally traverses the Right subtree (Root -> Left -> Right).",
    "concept_explanation": "Because the root is visited before its subtrees, preorder traversal is naturally suited for duplicating a tree, expression prefix notation, and serializing tree structures to files.",
    "algorithm": "preorder(root):\nStep 1: If root == NULL, return.\nStep 2: Visit and print root->data.\nStep 3: Recursively call preorder(root->left).\nStep 4: Recursively call preorder(root->right).",
    "pseudocode": "function preorder(node):\n    if node == NULL: return\n    print node.data\n    preorder(node.left)\n    preorder(node.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nvoid preorder(struct Node* root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== Preorder Traversal (Root -> Left -> Right) ===\\n\");\n    // Tree: 1 -> left: 2, right: 3, 2->left: 4, 2->right: 5\n    struct Node* root = create(1);\n    root->left = create(2);\n    root->right = create(3);\n    root->left->left = create(4);\n    root->left->right = create(5);\n\n    printf(\"Preorder: \");\n    preorder(root);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Tree with root 1, children 2 and 3, grandchildren 4 and 5",
    "sample_output": "=== Preorder Traversal (Root -> Left -> Right) ===\nPreorder: 1 2 4 5 3",
    "dry_run": "1. Visit 1\n2. Left to 2: visit 2\n3. Left to 4: visit 4, left/right NULL\n4. Right of 2 to 5: visit 5, left/right NULL\n5. Right of 1 to 3: visit 3. Traversal complete.",
    "time_complexity": "• O(n) visits each node once.",
    "space_complexity": "• O(h) recursion stack space, where h is tree height (O(log n) balanced, O(n) skewed).",
    "advantages_disadvantages": "Generates prefix expression; useful for cloning tree structure.",
    "applications": "• Cloning trees, prefix notation generation in compilers.",
    "viva_questions": [
      {
        "q": "What is the visiting order of preorder traversal?",
        "a": "Root -> Left subtree -> Right subtree."
      }
    ]
  },
  "tree_bt_inorder": {
    "id": "tree_bt_inorder",
    "title": "Inorder Traversal of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "inorder traversal",
      "left root right",
      "binary tree inorder",
      "tree inorder c"
    ],
    "definition": "Inorder traversal visits the Left subtree first, then visits the current node (Root), and finally visits the Right subtree (Left -> Root -> Right).",
    "concept_explanation": "In a Binary Search Tree (BST), inorder traversal visits nodes in non-decreasing (sorted ascending) order. In expression trees, inorder yields the infix expression.",
    "algorithm": "inorder(root):\nStep 1: If root == NULL, return.\nStep 2: Recursively call inorder(root->left).\nStep 3: Visit and print root->data.\nStep 4: Recursively call inorder(root->right).",
    "pseudocode": "function inorder(node):\n    if node == NULL: return\n    inorder(node.left)\n    print node.data\n    inorder(node.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nvoid inorder(struct Node* root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== Inorder Traversal (Left -> Root -> Right) ===\\n\");\n    struct Node* root = create(1);\n    root->left = create(2);\n    root->right = create(3);\n    root->left->left = create(4);\n    root->left->right = create(5);\n\n    printf(\"Inorder: \");\n    inorder(root);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Tree with root 1, children 2 and 3, grandchildren 4 and 5",
    "sample_output": "=== Inorder Traversal (Left -> Root -> Right) ===\nInorder: 4 2 5 1 3",
    "dry_run": "1. Left subtree of 1: node 2.\n2. Left subtree of 2: node 4. Left is NULL, print 4. Right is NULL.\n3. Print 2.\n4. Right subtree of 2: node 5. Print 5.\n5. Back to 1: print 1.\n6. Right subtree of 1: node 3. Print 3. Result: 4 2 5 1 3.",
    "time_complexity": "• O(n) visits all nodes once.",
    "space_complexity": "• O(h) call stack memory.",
    "advantages_disadvantages": "Produces sorted sequence when applied to a BST.",
    "applications": "• Sorting BST items, infix arithmetic expression generation.",
    "viva_questions": [
      {
        "q": "What traversal of a BST produces elements in sorted ascending order?",
        "a": "Inorder traversal."
      }
    ]
  },
  "tree_bt_postorder": {
    "id": "tree_bt_postorder",
    "title": "Postorder Traversal of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "postorder traversal",
      "left right root",
      "binary tree postorder",
      "tree postorder c"
    ],
    "definition": "Postorder traversal visits the Left subtree first, then the Right subtree, and finally the current node (Root) (Left -> Right -> Root).",
    "concept_explanation": "Because child subtrees are visited before their parent root node, postorder traversal is the standard method for deleting or freeing nodes in a tree, computing directory sizes, and postfix notation.",
    "algorithm": "postorder(root):\nStep 1: If root == NULL, return.\nStep 2: Recursively call postorder(root->left).\nStep 3: Recursively call postorder(root->right).\nStep 4: Visit and print root->data.",
    "pseudocode": "function postorder(node):\n    if node == NULL: return\n    postorder(node.left)\n    postorder(node.right)\n    print node.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nvoid postorder(struct Node* root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\nint main(void) {\n    printf(\"=== Postorder Traversal (Left -> Right -> Root) ===\\n\");\n    struct Node* root = create(1);\n    root->left = create(2);\n    root->right = create(3);\n    root->left->left = create(4);\n    root->left->right = create(5);\n\n    printf(\"Postorder: \");\n    postorder(root);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Tree with root 1, children 2 and 3, grandchildren 4 and 5",
    "sample_output": "=== Postorder Traversal (Left -> Right -> Root) ===\nPostorder: 4 5 2 3 1",
    "dry_run": "1. Bottom-left: node 4 visited.\n2. Bottom-right of 2: node 5 visited.\n3. Node 2 visited.\n4. Right child of 1: node 3 visited.\n5. Root node 1 visited last. Result: 4 5 2 3 1.",
    "time_complexity": "• O(n) visits all nodes once.",
    "space_complexity": "• O(h) recursion stack space.",
    "advantages_disadvantages": "Perfect for bottom-up cleanup and memory deallocation.",
    "applications": "• Deallocating/freeing tree memory, calculating folder disk space, postfix expressions.",
    "viva_questions": [
      {
        "q": "Why is postorder traversal used when deleting a tree from heap memory?",
        "a": "Because children must be freed before freeing the parent root node to prevent dangling pointers."
      }
    ]
  },
  "tree_bt_level_order": {
    "id": "tree_bt_level_order",
    "title": "Level Order Traversal / BFS of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "level order traversal",
      "bfs binary tree",
      "breadth first tree traversal",
      "tree queue traversal"
    ],
    "definition": "Level order traversal (Breadth-First Search) visits all nodes level by level from top to bottom (root at level 0) and from left to right within each level using a queue.",
    "concept_explanation": "Unlike depth-first traversals (pre, in, post) which use call stack recursion, level order uses a FIFO queue. The root is enqueued first. In each iteration, a node is dequeued, visited, and its non-null left and right children are enqueued.",
    "algorithm": "Step 1: If root == NULL return.\nStep 2: Create a queue Q, enqueue(root).\nStep 3: While Q is not empty:\n        node = dequeue(Q)\n        print node->data\n        if node->left != NULL: enqueue(node->left)\n        if node->right != NULL: enqueue(node->right)",
    "pseudocode": "function levelOrder(root):\n    if root == NULL: return\n    queue Q\n    enqueue(Q, root)\n    while not isEmpty(Q):\n        curr = dequeue(Q)\n        print curr.data\n        if curr.left: enqueue(Q, curr.left)\n        if curr.right: enqueue(Q, curr.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\n#define MAX 50\nstruct Node* queue[MAX];\nint front = 0, rear = 0;\n\nvoid levelOrder(struct Node* root) {\n    if (root == NULL) return;\n    front = rear = 0;\n    queue[rear++] = root;\n\n    while (front < rear) {\n        struct Node* curr = queue[front++];\n        printf(\"%d \", curr->data);\n        if (curr->left != NULL) queue[rear++] = curr->left;\n        if (curr->right != NULL) queue[rear++] = curr->right;\n    }\n}\n\nint main(void) {\n    printf(\"=== Level Order Traversal (BFS) ===\\n\");\n    struct Node* root = create(1);\n    root->left = create(2);\n    root->right = create(3);\n    root->left->left = create(4);\n    root->left->right = create(5);\n    root->right->right = create(6);\n\n    printf(\"Level Order: \");\n    levelOrder(root);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Tree with nodes 1 (lvl 0), 2,3 (lvl 1), 4,5,6 (lvl 2)",
    "sample_output": "=== Level Order Traversal (BFS) ===\nLevel Order: 1 2 3 4 5 6",
    "dry_run": "Q: [1] -> pop 1, push 2, 3.\nQ: [2, 3] -> pop 2, push 4, 5.\nQ: [3, 4, 5] -> pop 3, push 6.\nQ: [4, 5, 6] -> pop 4, pop 5, pop 6. Traversal complete: 1 2 3 4 5 6.",
    "time_complexity": "• O(n) visits all nodes once.",
    "space_complexity": "• O(w) where w is the maximum width of the tree (up to n/2 in complete tree).",
    "advantages_disadvantages": "Traverses closest nodes first; ideal for finding shortest path in unweighted trees.",
    "applications": "• Finding minimum depth, serialization/deserialization of trees, network broadcasting.",
    "viva_questions": [
      {
        "q": "Which auxiliary data structure is required for level order traversal?",
        "a": "A FIFO Queue."
      }
    ]
  },
  "tree_bt_count_nodes": {
    "id": "tree_bt_count_nodes",
    "title": "Count Total Nodes in Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "count nodes binary tree",
      "total nodes in tree",
      "tree size c"
    ],
    "definition": "Counting total nodes calculates the total count of all vertices in the binary tree by recursively summing: `1 + count(left) + count(right)`.",
    "concept_explanation": "Base case: if the current node is NULL, count is 0. Otherwise, count is 1 (for current node) plus the node count of the left subtree and the node count of the right subtree.",
    "algorithm": "countNodes(root):\nStep 1: If root == NULL, return 0.\nStep 2: Return 1 + countNodes(root->left) + countNodes(root->right).",
    "pseudocode": "function countNodes(node):\n    if node == NULL: return 0\n    return 1 + countNodes(node.left) + countNodes(node.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nint countNodes(struct Node* root) {\n    if (root == NULL) return 0;\n    return 1 + countNodes(root->left) + countNodes(root->right);\n}\n\nint main(void) {\n    printf(\"=== Count Total Nodes in Binary Tree ===\\n\");\n    struct Node* root = create(10);\n    root->left = create(20);\n    root->right = create(30);\n    root->left->left = create(40);\n    root->left->right = create(50);\n\n    printf(\"Total nodes in tree: %d\\n\", countNodes(root));\n    return 0;\n}",
    "sample_input": "Tree with 5 nodes: 10, 20, 30, 40, 50",
    "sample_output": "=== Count Total Nodes in Binary Tree ===\nTotal nodes in tree: 5",
    "dry_run": "count(40)=1, count(50)=1.\ncount(20)=1 + 1 + 1 = 3.\ncount(30)=1.\ncount(10)=1 + 3 + 1 = 5.",
    "time_complexity": "• O(n) visits each node once.",
    "space_complexity": "• O(h) call stack memory.",
    "advantages_disadvantages": "Clean recursive formulation.",
    "applications": "• Memory estimation, load balancing in hierarchical networks.",
    "viva_questions": [
      {
        "q": "What is the base condition for counting nodes recursively?",
        "a": "If root == NULL, return 0."
      }
    ]
  },
  "tree_bt_count_leaves": {
    "id": "tree_bt_count_leaves",
    "title": "Count Leaf Nodes in Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "count leaf nodes",
      "number of leaves binary tree",
      "leaf node count c"
    ],
    "definition": "A leaf node is a node with zero children (`left == NULL && right == NULL`). Counting leaves recursively aggregates all terminal vertices in the tree.",
    "concept_explanation": "Base cases: if `root == NULL`, return 0. If `root->left == NULL && root->right == NULL`, this node is a leaf, so return 1. Otherwise, return `countLeaves(root->left) + countLeaves(root->right)`.",
    "algorithm": "countLeaves(root):\nStep 1: If root == NULL, return 0.\nStep 2: If root->left == NULL && root->right == NULL, return 1.\nStep 3: Return countLeaves(root->left) + countLeaves(root->right).",
    "pseudocode": "function countLeaves(node):\n    if node == NULL: return 0\n    if node.left == NULL and node.right == NULL: return 1\n    return countLeaves(node.left) + countLeaves(node.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nint countLeaves(struct Node* root) {\n    if (root == NULL) return 0;\n    if (root->left == NULL && root->right == NULL) return 1;\n    return countLeaves(root->left) + countLeaves(root->right);\n}\n\nint main(void) {\n    printf(\"=== Count Leaf Nodes in Binary Tree ===\\n\");\n    // Leaves will be 40, 50, and 30\n    struct Node* root = create(10);\n    root->left = create(20);\n    root->right = create(30);\n    root->left->left = create(40);\n    root->left->right = create(50);\n\n    printf(\"Total leaf nodes: %d\\n\", countLeaves(root));\n    return 0;\n}",
    "sample_input": "Tree with nodes 10, 20, 30, 40, 50 (leaves: 40, 50, 30)",
    "sample_output": "=== Count Leaf Nodes in Binary Tree ===\nTotal leaf nodes: 3",
    "dry_run": "Node 40: leaf -> 1. Node 50: leaf -> 1. Node 20: 1 + 1 = 2. Node 30: leaf -> 1. Root: 2 + 1 = 3.",
    "time_complexity": "• O(n) visits each node once.",
    "space_complexity": "• O(h) call stack memory.",
    "advantages_disadvantages": "Directly identifies all endpoint nodes.",
    "applications": "• Evaluating game tree end outcomes, syntax parse tree token counts.",
    "viva_questions": [
      {
        "q": "What is the relationship between the number of leaf nodes L and degree-2 internal nodes I in a full binary tree?",
        "a": "L = I + 1."
      }
    ]
  },
  "tree_bt_height": {
    "id": "tree_bt_height",
    "title": "Calculate Height / Depth of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "height binary tree",
      "depth binary tree",
      "max height tree c",
      "tree height algorithm"
    ],
    "definition": "The height (or maximum depth) of a binary tree is the number of edges or nodes along the longest path from the root node down to the farthest leaf node.",
    "concept_explanation": "Recursively computed as: `1 + max(height(left), height(right))`. An empty tree has height 0 (or -1 in edge-based convention; here node-count height convention is used).",
    "algorithm": "height(root):\nStep 1: If root == NULL, return 0.\nStep 2: leftHeight = height(root->left).\nStep 3: rightHeight = height(root->right).\nStep 4: Return 1 + max(leftHeight, rightHeight).",
    "pseudocode": "function height(node):\n    if node == NULL: return 0\n    l = height(node.left)\n    r = height(node.right)\n    return 1 + max(l, r)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nint max(int a, int b) { return (a > b) ? a : b; }\n\nint height(struct Node* root) {\n    if (root == NULL) return 0;\n    int leftH = height(root->left);\n    int rightH = height(root->right);\n    return 1 + max(leftH, rightH);\n}\n\nint main(void) {\n    printf(\"=== Calculate Height of Binary Tree ===\\n\");\n    struct Node* root = create(1);\n    root->left = create(2);\n    root->right = create(3);\n    root->left->left = create(4);\n    root->left->left->left = create(5); // Deepest path: 1 -> 2 -> 4 -> 5\n\n    printf(\"Height (in nodes) of the tree: %d\\n\", height(root));\n    return 0;\n}",
    "sample_input": "Tree path 1 -> 2 -> 4 -> 5",
    "sample_output": "=== Calculate Height of Binary Tree ===\nHeight (in nodes) of the tree: 4",
    "dry_run": "height(5) = 1.\nheight(4) = 2.\nheight(2) = 3.\nheight(3) = 1.\nheight(1) = 1 + max(3, 1) = 4.",
    "time_complexity": "• O(n) visits every node once.",
    "space_complexity": "• O(h) call stack memory.",
    "advantages_disadvantages": "Essential for detecting tree imbalance in AVL or Red-Black trees.",
    "applications": "• AVL tree balance factor calculation (height(left) - height(right)).",
    "viva_questions": [
      {
        "q": "What is the minimum height of a binary tree with n nodes?",
        "a": "ceil(log2(n + 1))."
      }
    ]
  },
  "tree_bt_search": {
    "id": "tree_bt_search",
    "title": "Search an Element in Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "search binary tree",
      "find node binary tree",
      "search value tree c"
    ],
    "definition": "Searching in an arbitrary binary tree requires traversing both subtrees recursively since there is no ordering property governing left and right child values.",
    "concept_explanation": "Unlike a BST where search can prune subtrees, a generic binary tree requires inspecting the root, and if unmatched, searching the left subtree, and if still unmatched, searching the right subtree.",
    "algorithm": "search(root, key):\nStep 1: If root == NULL, return false.\nStep 2: If root->data == key, return true.\nStep 3: If search(root->left, key) is true, return true.\nStep 4: Return search(root->right, key).",
    "pseudocode": "function search(node, key):\n    if node == NULL: return false\n    if node.data == key: return true\n    return search(node.left, key) or search(node.right, key)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nbool search(struct Node* root, int key) {\n    if (root == NULL) return false;\n    if (root->data == key) return true;\n    return search(root->left, key) || search(root->right, key);\n}\n\nint main(void) {\n    printf(\"=== Search in Binary Tree ===\\n\");\n    struct Node* root = create(10);\n    root->left = create(20);\n    root->right = create(30);\n    root->left->right = create(25);\n\n    printf(\"Search 25: %s\\n\", search(root, 25) ? \"FOUND\" : \"NOT FOUND\");\n    printf(\"Search 99: %s\\n\", search(root, 99) ? \"FOUND\" : \"NOT FOUND\");\n    return 0;\n}",
    "sample_input": "Tree: 10, 20, 30, 25. Search 25 and 99",
    "sample_output": "=== Search in Binary Tree ===\nSearch 25: FOUND\nSearch 99: NOT FOUND",
    "dry_run": "Search 25: root 10 != 25 -> search left 20 -> 20 != 25 -> search right 25 -> match found, returns true.",
    "time_complexity": "• Worst-case: O(n) when element is absent or at the last visited leaf.",
    "space_complexity": "• O(h) recursion stack space.",
    "advantages_disadvantages": "Exhaustive search; no sorting prerequisite. Slower than BST search.",
    "applications": "• Locating elements in unsorted hierarchies.",
    "viva_questions": [
      {
        "q": "Why is searching in an arbitrary binary tree O(n) instead of O(log n)?",
        "a": "Because without the BST ordering property, both subtrees must be checked in the worst case."
      }
    ]
  },
  "tree_bst_create": {
    "id": "tree_bst_create",
    "title": "Binary Search Tree Creation",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "create bst",
      "bst initialization",
      "binary search tree properties",
      "bst c"
    ],
    "definition": "A Binary Search Tree (BST) is a node-based binary tree data structure where all keys in the left subtree are strictly smaller than the root key, and all keys in the right subtree are strictly greater.",
    "concept_explanation": "The BST property enables efficient binary search on dynamic collections. Insertion, deletion, and lookup all take average O(log n) time. Creation begins with `struct Node* root = NULL`.",
    "algorithm": "BST Invariant for every node N:\n1. For all X in left subtree: X->data < N->data\n2. For all Y in right subtree: Y->data > N->data\n3. Subtrees must also be BSTs.",
    "pseudocode": "root = NULL\nfunction initBST(): root = NULL",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* createNode(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nint main(void) {\n    printf(\"=== Binary Search Tree Creation ===\\n\");\n    struct Node* root = NULL;\n    printf(\"BST initialized with root = NULL\\n\");\n    root = createNode(50);\n    root->left = createNode(30);  // 30 < 50\n    root->right = createNode(70); // 70 > 50\n    printf(\"Root: %d, Left Child: %d, Right Child: %d\\n\", root->data, root->left->data, root->right->data);\n    printf(\"BST Property satisfies: 30 < 50 < 70\\n\");\n    return 0;\n}",
    "sample_input": "Create BST root 50 with left 30 and right 70",
    "sample_output": "=== Binary Search Tree Creation ===\nBST initialized with root = NULL\nRoot: 50, Left Child: 30, Right Child: 70\nBST Property satisfies: 30 < 50 < 70",
    "dry_run": "Root 50 created. 30 placed in left subtree. 70 placed in right subtree. Invariant verified.",
    "time_complexity": "• O(1) initialization.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Provides fast search, insertion, and deletion. Degenerates to O(n) if unbalanced.",
    "applications": "• Database indexing (B-trees, BSTs), dynamic sets and lookup dictionaries.",
    "viva_questions": [
      {
        "q": "State the Binary Search Tree property.",
        "a": "For every node, all values in its left subtree are less than its value, and all values in its right subtree are greater."
      }
    ]
  },
  "tree_bst_insert": {
    "id": "tree_bst_insert",
    "title": "Insert a Node in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "insert bst",
      "bst insertion c",
      "add node to bst",
      "insert binary search tree"
    ],
    "definition": "BST insertion recursively navigates left if the new key is smaller than the current node or right if greater, attaching the new leaf node at the correct position to preserve the BST invariant.",
    "concept_explanation": "If `root == NULL`, the new node becomes the root. Otherwise, compare `key` with `root->data`. If `key < root->data`, recurse on `root->left`. If `key > root->data`, recurse on `root->right`. Duplicates are typically ignored.",
    "algorithm": "insert(root, val):\nStep 1: If root == NULL, return createNode(val).\nStep 2: If val < root->data, root->left = insert(root->left, val).\nStep 3: Else if val > root->data, root->right = insert(root->right, val).\nStep 4: Return root.",
    "pseudocode": "function insert(root, val):\n    if root == NULL: return createNode(val)\n    if val < root.data: root.left = insert(root.left, val)\n    else if val > root.data: root.right = insert(root.right, val)\n    return root",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* createNode(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) return createNode(val);\n    if (val < root->data) {\n        root->left = insert(root->left, val);\n    } else if (val > root->data) {\n        root->right = insert(root->right, val);\n    }\n    return root;\n}\n\nvoid inorder(struct Node* root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== BST Insertion Demonstration ===\\n\");\n    struct Node* root = NULL;\n    int keys[] = {50, 30, 20, 40, 70, 60, 80};\n    int n = sizeof(keys) / sizeof(keys[0]);\n\n    for (int i = 0; i < n; i++) {\n        root = insert(root, keys[i]);\n    }\n\n    printf(\"Inorder Traversal after insertions: \");\n    inorder(root);\n    printf(\"\\n(Notice: output is automatically sorted!)\\n\");\n    return 0;\n}",
    "sample_input": "Insert keys: 50, 30, 20, 40, 70, 60, 80",
    "sample_output": "=== BST Insertion Demonstration ===\nInorder Traversal after insertions: 20 30 40 50 60 70 80 \n(Notice: output is automatically sorted!)",
    "dry_run": "50 becomes root. 30 < 50 -> left. 20 < 30 -> left of 30. 40 > 30 -> right of 30. 70 > 50 -> right. 60 < 70 -> left of 70. 80 > 70 -> right of 70.",
    "time_complexity": "• Average: O(log n), Worst-case: O(n) for skewed BST.",
    "space_complexity": "• O(h) recursion stack space.",
    "advantages_disadvantages": "Dynamic sorted collection; maintains sort without explicit re-sorting.",
    "applications": "• Symbol tables, maintaining dynamically sorted leaderboards.",
    "viva_questions": [
      {
        "q": "Where are new nodes always inserted in a standard BST?",
        "a": "As a leaf node."
      }
    ]
  },
  "tree_bst_search": {
    "id": "tree_bst_search",
    "title": "Search a Node in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "search bst",
      "bst lookup",
      "find in bst",
      "binary search tree search c"
    ],
    "definition": "BST search compares the target key with the current node: if equal, the key is found; if smaller, search continues exclusively in the left subtree; if larger, in the right subtree.",
    "concept_explanation": "By pruning half of the remaining tree at each step, BST search mimics binary search on a sorted array, achieving O(log n) efficiency in balanced trees without contiguous memory constraints.",
    "algorithm": "search(root, key):\nStep 1: If root == NULL or root->data == key, return root.\nStep 2: If key < root->data, return search(root->left, key).\nStep 3: Return search(root->right, key).",
    "pseudocode": "function search(root, key):\n    if root == NULL or root.data == key: return root\n    if key < root.data: return search(root.left, key)\n    return search(root.right, key)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nstruct Node* search(struct Node* root, int key) {\n    if (root == NULL || root->data == key) return root;\n    if (key < root->data) return search(root->left, key);\n    return search(root->right, key);\n}\n\nint main(void) {\n    printf(\"=== BST Search Demonstration ===\\n\");\n    struct Node* root = NULL;\n    int items[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) root = insert(root, items[i]);\n\n    int key1 = 40, key2 = 95;\n    printf(\"Search %d: %s\\n\", key1, search(root, key1) != NULL ? \"FOUND\" : \"NOT FOUND\");\n    printf(\"Search %d: %s\\n\", key2, search(root, key2) != NULL ? \"FOUND\" : \"NOT FOUND\");\n    return 0;\n}",
    "sample_input": "BST with items [50, 30, 70, 20, 40, 60, 80]. Search 40 and 95",
    "sample_output": "=== BST Search Demonstration ===\nSearch 40: FOUND\nSearch 95: NOT FOUND",
    "dry_run": "Search 40: 40 < 50 -> go left (30). 40 > 30 -> go right (40). Match found! Total comparisons = 3.",
    "time_complexity": "• Average: O(log n), Worst-case: O(n).",
    "space_complexity": "• O(h) recursion stack (or O(1) iterative).",
    "advantages_disadvantages": "Extremely fast average lookup time.",
    "applications": "• Dictionary lookups, IP routing table prefix lookups.",
    "viva_questions": [
      {
        "q": "What is the time complexity to search an element in a balanced BST?",
        "a": "O(log n)."
      }
    ]
  },
  "tree_bst_delete_leaf": {
    "id": "tree_bst_delete_leaf",
    "title": "Delete a Leaf Node in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "delete leaf bst",
      "bst leaf deletion",
      "remove leaf node bst"
    ],
    "definition": "Deleting a leaf node (a node with no children, `left == NULL && right == NULL`) involves freeing the node memory and updating its parent pointer to NULL.",
    "concept_explanation": "Case 1 of BST deletion: the node has no children. Simply call `free(root)` and return `NULL` to the parent caller.",
    "algorithm": "If node to delete is a leaf:\n1. free(root)\n2. return NULL",
    "pseudocode": "if root.left == NULL and root.right == NULL:\n    free(root)\n    return NULL",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nstruct Node* deleteLeaf(struct Node* root, int key) {\n    if (root == NULL) return NULL;\n    if (key < root->data) root->left = deleteLeaf(root->left, key);\n    else if (key > root->data) root->right = deleteLeaf(root->right, key);\n    else {\n        // Node found, verify it is a leaf\n        if (root->left == NULL && root->right == NULL) {\n            free(root);\n            printf(\"Leaf node %d deleted successfully.\\n\", key);\n            return NULL;\n        }\n    }\n    return root;\n}\n\nvoid inorder(struct Node* root) {\n    if (root == NULL) return;\n    inorder(root->left); printf(\"%d \", root->data); inorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== Delete Leaf Node in BST ===\\n\");\n    struct Node* root = NULL;\n    root = insert(root, 50); root = insert(root, 30); root = insert(root, 20); // 20 is a leaf\n    printf(\"Before deletion: \"); inorder(root); printf(\"\\n\");\n    root = deleteLeaf(root, 20);\n    printf(\"After deleting 20: \"); inorder(root); printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "BST: 50, 30, 20. Delete leaf 20",
    "sample_output": "=== Delete Leaf Node in BST ===\nBefore deletion: 20 30 50 \nLeaf node 20 deleted successfully.\nAfter deleting 20: 30 50",
    "dry_run": "20 has left=NULL, right=NULL. Node freed, parent (30)->left updated to NULL.",
    "time_complexity": "• O(h) to locate node, O(1) to delete.",
    "space_complexity": "• O(h) recursion stack.",
    "advantages_disadvantages": "Simplest deletion case in BST.",
    "applications": "• Pruning decision trees.",
    "viva_questions": [
      {
        "q": "What is returned to the parent pointer when deleting a leaf node?",
        "a": "NULL."
      }
    ]
  },
  "tree_bst_delete_one_child": {
    "id": "tree_bst_delete_one_child",
    "title": "Delete a Node with One Child in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "delete single child node bst",
      "bst delete one child",
      "remove degree 1 node bst"
    ],
    "definition": "Deleting a node with a single child involves bypassing the node to be deleted by linking its parent directly to its sole child, then freeing the node.",
    "concept_explanation": "Case 2 of BST deletion: if `root->left == NULL`, save `temp = root->right`, free `root`, and return `temp`. If `root->right == NULL`, save `temp = root->left`, free `root`, and return `temp`.",
    "algorithm": "If node has only right child:\n    temp = root->right; free(root); return temp;\nIf node has only left child:\n    temp = root->left; free(root); return temp;",
    "pseudocode": "if root.left == NULL:\n    temp = root.right; free(root); return temp\nif root.right == NULL:\n    temp = root.left; free(root); return temp",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nstruct Node* deleteNode(struct Node* root, int key) {\n    if (root == NULL) return NULL;\n    if (key < root->data) root->left = deleteNode(root->left, key);\n    else if (key > root->data) root->right = deleteNode(root->right, key);\n    else {\n        // Single child cases\n        if (root->left == NULL) {\n            struct Node* temp = root->right;\n            free(root);\n            return temp;\n        } else if (root->right == NULL) {\n            struct Node* temp = root->left;\n            free(root);\n            return temp;\n        }\n    }\n    return root;\n}\n\nvoid inorder(struct Node* root) {\n    if (root == NULL) return;\n    inorder(root->left); printf(\"%d \", root->data); inorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== Delete Node with One Child in BST ===\\n\");\n    struct Node* root = NULL;\n    root = insert(root, 50); root = insert(root, 30); root = insert(root, 40); // 30 has single child 40\n    printf(\"Before deletion: \"); inorder(root); printf(\"\\n\");\n    root = deleteNode(root, 30);\n    printf(\"After deleting 30: \"); inorder(root); printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "BST: 50 -> left 30 -> right 40. Delete 30.",
    "sample_output": "=== Delete Node with One Child in BST ===\nBefore deletion: 30 40 50 \nAfter deleting 30: 40 50",
    "dry_run": "Node 30 has left=NULL, right=40. temp captures 40, node 30 is freed, 40 attached to 50->left.",
    "time_complexity": "• O(h) where h is tree height.",
    "space_complexity": "• O(h) stack space.",
    "advantages_disadvantages": "Clean splice operation preserving BST order.",
    "applications": "• Restructuring tree indices after item removal.",
    "viva_questions": [
      {
        "q": "How does deleting a node with one child affect the height of that subtree?",
        "a": "It decreases the height of that subtree path by 1."
      }
    ]
  },
  "tree_bst_delete_two_children": {
    "id": "tree_bst_delete_two_children",
    "title": "Delete a Node with Two Children in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "delete two children bst",
      "inorder successor deletion",
      "bst node deletion case 3",
      "delete bst node"
    ],
    "definition": "Deleting a node with two children involves finding its inorder successor (smallest node in right subtree) or inorder predecessor, copying that value into the current node, and recursively deleting the successor node.",
    "concept_explanation": "Case 3 of BST deletion: when a node has both left and right children, it cannot be simply removed without breaking connections. Replacing its value with its inorder successor guarantees the BST property remains intact because the successor is greater than all left children and less than all other right children.",
    "algorithm": "deleteNode(root, key):\nStep 1: If key < root->data, root->left = deleteNode(root->left, key).\nStep 2: Else if key > root->data, root->right = deleteNode(root->right, key).\nStep 3: Else (node found):\n        If root has two children:\n            temp = minValueNode(root->right) // Inorder successor\n            root->data = temp->data\n            root->right = deleteNode(root->right, temp->data)\nStep 4: Return root.",
    "pseudocode": "function delete(root, key):\n    if key < root.data: root.left = delete(root.left, key)\n    else if key > root.data: root.right = delete(root.right, key)\n    else:\n        if both children exist:\n            succ = minNode(root.right)\n            root.data = succ.data\n            root.right = delete(root.right, succ.data)\n        else:\n            return child or NULL\n    return root",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nstruct Node* minValueNode(struct Node* node) {\n    struct Node* current = node;\n    while (current && current->left != NULL) current = current->left;\n    return current;\n}\n\nstruct Node* deleteNode(struct Node* root, int key) {\n    if (root == NULL) return NULL;\n    if (key < root->data) root->left = deleteNode(root->left, key);\n    else if (key > root->data) root->right = deleteNode(root->right, key);\n    else {\n        // Case 1 & 2: 0 or 1 child\n        if (root->left == NULL) {\n            struct Node* temp = root->right; free(root); return temp;\n        } else if (root->right == NULL) {\n            struct Node* temp = root->left; free(root); return temp;\n        }\n        // Case 3: Two children\n        struct Node* temp = minValueNode(root->right); // Inorder successor\n        root->data = temp->data;\n        root->right = deleteNode(root->right, temp->data);\n    }\n    return root;\n}\n\nvoid inorder(struct Node* root) {\n    if (root == NULL) return;\n    inorder(root->left); printf(\"%d \", root->data); inorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== Delete Node with Two Children in BST ===\\n\");\n    struct Node* root = NULL;\n    int items[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) root = insert(root, items[i]);\n\n    printf(\"Original BST (Inorder): \"); inorder(root); printf(\"\\n\");\n    printf(\"Deleting root node 50 (has two children 30 and 70)...\\n\");\n    root = deleteNode(root, 50);\n    printf(\"After deleting 50:       \"); inorder(root); printf(\"\\n\");\n    printf(\"New root is now inorder successor: %d\\n\", root->data);\n    return 0;\n}",
    "sample_input": "BST: 50, 30, 70, 20, 40, 60, 80. Delete 50.",
    "sample_output": "=== Delete Node with Two Children in BST ===\nOriginal BST (Inorder): 20 30 40 50 60 70 80 \nDeleting root node 50 (has two children 30 and 70)...\nAfter deleting 50:       20 30 40 60 70 80 \nNew root is now inorder successor: 60",
    "dry_run": "1. Inorder successor of 50 in right subtree (70, 60, 80) is minimum node 60.\n2. 50 is overwritten with 60.\n3. Node 60 in right subtree is deleted as a leaf/single child node. Result is valid BST.",
    "time_complexity": "• O(h) where h is tree height.",
    "space_complexity": "• O(h) recursion stack space.",
    "advantages_disadvantages": "Maintains complete BST invariant after removing complex internal nodes.",
    "applications": "• Deleting database index records, memory management tables.",
    "viva_questions": [
      {
        "q": "What is the inorder successor of a node in a BST?",
        "a": "The node with the smallest key in its right subtree."
      }
    ]
  },
  "tree_bst_find_min": {
    "id": "tree_bst_find_min",
    "title": "Find Minimum Value in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "find min bst",
      "minimum element bst",
      "bst smallest value",
      "bst min c"
    ],
    "definition": "Finding the minimum value in a BST involves traversing left child pointers until reaching the leftmost node whose `left == NULL`.",
    "concept_explanation": "Due to the BST invariant, smaller values always reside in left subtrees. Therefore, the leftmost node in any non-empty BST is guaranteed to hold the minimum value in the entire tree.",
    "algorithm": "findMin(root):\nStep 1: If root == NULL, return -1 (or error).\nStep 2: While root->left != NULL: root = root->left.\nStep 3: Return root->data.",
    "pseudocode": "function findMin(root):\n    while root.left != NULL: root = root.left\n    return root.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nint findMin(struct Node* root) {\n    if (root == NULL) return -1;\n    struct Node* curr = root;\n    while (curr->left != NULL) {\n        curr = curr->left;\n    }\n    return curr->data;\n}\n\nint main(void) {\n    printf(\"=== Find Minimum Value in BST ===\\n\");\n    struct Node* root = NULL;\n    int items[] = {45, 23, 67, 12, 34, 89, 5};\n    for (int i = 0; i < 7; i++) root = insert(root, items[i]);\n\n    printf(\"Minimum value in BST: %d\\n\", findMin(root));\n    return 0;\n}",
    "sample_input": "BST with items: 45, 23, 67, 12, 34, 89, 5",
    "sample_output": "=== Find Minimum Value in BST ===\nMinimum value in BST: 5",
    "dry_run": "Traverse: 45 -> left 23 -> left 12 -> left 5. 5 has left == NULL. Returns 5.",
    "time_complexity": "• O(h) where h is tree height (O(log n) balanced, O(n) skewed).",
    "space_complexity": "• O(1) iterative space.",
    "advantages_disadvantages": "Extremely efficient O(h) search without scanning whole tree.",
    "applications": "• Finding lowest priority task, minimum price lookup.",
    "viva_questions": [
      {
        "q": "Where does the minimum value always reside in a BST?",
        "a": "At the leftmost node of the tree."
      }
    ]
  },
  "tree_bst_find_max": {
    "id": "tree_bst_find_max",
    "title": "Find Maximum Value in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "find max bst",
      "maximum element bst",
      "bst largest value",
      "bst max c"
    ],
    "definition": "Finding the maximum value in a BST involves traversing right child pointers until reaching the rightmost node whose `right == NULL`.",
    "concept_explanation": "Due to the BST invariant, greater values always reside in right subtrees. The rightmost node in any non-empty BST is guaranteed to hold the maximum value.",
    "algorithm": "findMax(root):\nStep 1: If root == NULL, return -1.\nStep 2: While root->right != NULL: root = root->right.\nStep 3: Return root->data.",
    "pseudocode": "function findMax(root):\n    while root.right != NULL: root = root.right\n    return root.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nint findMax(struct Node* root) {\n    if (root == NULL) return -1;\n    struct Node* curr = root;\n    while (curr->right != NULL) {\n        curr = curr->right;\n    }\n    return curr->data;\n}\n\nint main(void) {\n    printf(\"=== Find Maximum Value in BST ===\\n\");\n    struct Node* root = NULL;\n    int items[] = {45, 23, 67, 12, 34, 89, 5};\n    for (int i = 0; i < 7; i++) root = insert(root, items[i]);\n\n    printf(\"Maximum value in BST: %d\\n\", findMax(root));\n    return 0;\n}",
    "sample_input": "BST with items: 45, 23, 67, 12, 34, 89, 5",
    "sample_output": "=== Find Maximum Value in BST ===\nMaximum value in BST: 89",
    "dry_run": "Traverse: 45 -> right 67 -> right 89. 89 has right == NULL. Returns 89.",
    "time_complexity": "• O(h) where h is tree height.",
    "space_complexity": "• O(1) iterative space.",
    "advantages_disadvantages": "Instant logarithmic lookup of maximum key.",
    "applications": "• Highest score leaderboards, maximum capacity tracking.",
    "viva_questions": [
      {
        "q": "Where does the maximum value always reside in a BST?",
        "a": "At the rightmost node of the tree."
      }
    ]
  },
  "tree_bst_inorder": {
    "id": "tree_bst_inorder",
    "title": "Inorder Traversal of BST — Sorted Output",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "inorder bst",
      "bst sorted output",
      "bst inorder traversal",
      "sorted tree traversal"
    ],
    "definition": "Inorder traversal of a BST visits nodes in Left -> Root -> Right order, which mathematically guarantees printing the keys in strictly ascending sorted order.",
    "concept_explanation": "Because every left descendant is smaller than the parent and every right descendant is greater, Left-Root-Right traversal yields monotonic increasing values. This forms the basis of Tree Sort.",
    "algorithm": "inorder(root):\nStep 1: If root == NULL, return.\nStep 2: inorder(root->left).\nStep 3: print root->data.\nStep 4: inorder(root->right).",
    "pseudocode": "function inorder(root):\n    if root == NULL: return\n    inorder(root.left)\n    print root.data\n    inorder(root.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nvoid inorder(struct Node* root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== BST Inorder Traversal (Sorted Output) ===\\n\");\n    struct Node* root = NULL;\n    int data[] = {40, 20, 60, 10, 30, 50, 70};\n    for (int i = 0; i < 7; i++) root = insert(root, data[i]);\n\n    printf(\"Inorder Traversal: \");\n    inorder(root);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Insert: 40, 20, 60, 10, 30, 50, 70",
    "sample_output": "=== BST Inorder Traversal (Sorted Output) ===\nInorder Traversal: 10 20 30 40 50 60 70",
    "dry_run": "Leftmost leaf 10 printed first -> 20 -> 30 -> 40 -> 50 -> 60 -> 70. Perfectly sorted!",
    "time_complexity": "• O(n) visits each node once.",
    "space_complexity": "• O(h) call stack memory.",
    "advantages_disadvantages": "Natural sorted order retrieval without external sorting algorithm.",
    "applications": "• Tree Sort algorithm, validating if a binary tree is a valid BST.",
    "viva_questions": [
      {
        "q": "How can you verify whether a binary tree is a BST in linear time?",
        "a": "Perform an inorder traversal and verify that the output sequence is strictly increasing."
      }
    ]
  },
  "tree_bst_preorder": {
    "id": "tree_bst_preorder",
    "title": "Preorder Traversal of BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "preorder bst",
      "bst preorder traversal",
      "reconstruct bst preorder"
    ],
    "definition": "Preorder traversal of a BST visits the Root first, then Left subtree, then Right subtree (Root -> Left -> Right).",
    "concept_explanation": "A unique property of BSTs: a BST can be uniquely reconstructed from its preorder traversal sequence alone (without needing inorder), because the first element is the root and elements smaller than it belong to the left subtree.",
    "algorithm": "preorder(root):\nStep 1: If root == NULL, return.\nStep 2: print root->data.\nStep 3: preorder(root->left).\nStep 4: preorder(root->right).",
    "pseudocode": "function preorder(root):\n    if root == NULL: return\n    print root.data\n    preorder(root.left)\n    preorder(root.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nvoid preorder(struct Node* root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== BST Preorder Traversal ===\\n\");\n    struct Node* root = NULL;\n    int data[] = {40, 20, 60, 10, 30, 50, 70};\n    for (int i = 0; i < 7; i++) root = insert(root, data[i]);\n\n    printf(\"Preorder Traversal: \");\n    preorder(root);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "BST with root 40, subtrees 20 and 60",
    "sample_output": "=== BST Preorder Traversal ===\nPreorder Traversal: 40 20 10 30 60 50 70",
    "dry_run": "40 -> left (20) -> left (10) -> right (30) -> right of 40 (60) -> left (50) -> right (70).",
    "time_complexity": "• O(n) traversal.",
    "space_complexity": "• O(h) recursion stack.",
    "advantages_disadvantages": "Can serialize and reconstruct the exact BST structure.",
    "applications": "• Serializing BST to compact file format.",
    "viva_questions": [
      {
        "q": "Can a BST be reconstructed from only preorder traversal?",
        "a": "Yes, because the root is the first element and partition points can be identified using the BST property."
      }
    ]
  },
  "tree_bst_postorder": {
    "id": "tree_bst_postorder",
    "title": "Postorder Traversal of BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "postorder bst",
      "bst postorder traversal",
      "delete bst postorder"
    ],
    "definition": "Postorder traversal of a BST visits Left subtree, then Right subtree, and finally the Root (Left -> Right -> Root).",
    "concept_explanation": "Standard order for bottom-up node processing, tree destruction, and computing subtree statistics.",
    "algorithm": "postorder(root):\nStep 1: If root == NULL, return.\nStep 2: postorder(root->left).\nStep 3: postorder(root->right).\nStep 4: print root->data.",
    "pseudocode": "function postorder(root):\n    if root == NULL: return\n    postorder(root.left)\n    postorder(root.right)\n    print root.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nvoid postorder(struct Node* root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\nint main(void) {\n    printf(\"=== BST Postorder Traversal ===\\n\");\n    struct Node* root = NULL;\n    int data[] = {40, 20, 60, 10, 30, 50, 70};\n    for (int i = 0; i < 7; i++) root = insert(root, data[i]);\n\n    printf(\"Postorder Traversal: \");\n    postorder(root);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "BST with 40, 20, 60, 10, 30, 50, 70",
    "sample_output": "=== BST Postorder Traversal ===\nPostorder Traversal: 10 30 20 50 70 60 40",
    "dry_run": "Left leaf 10, right leaf 30 -> 20. Left leaf 50, right leaf 70 -> 60. Root 40 last.",
    "time_complexity": "• O(n) traversal.",
    "space_complexity": "• O(h) recursion stack space.",
    "advantages_disadvantages": "Safely frees children before parents.",
    "applications": "• Deallocating BST memory dynamically.",
    "viva_questions": [
      {
        "q": "When is postorder traversal preferred in BST operations?",
        "a": "When deallocating all nodes in a tree, since child nodes are deleted before parents."
      }
    ]
  },
  "tree_bst_level_order": {
    "id": "tree_bst_level_order",
    "title": "Level Order Traversal of BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "level order bst",
      "bst bfs",
      "breadth first search bst",
      "bst level traversal"
    ],
    "definition": "Level order traversal of a BST visits nodes row by row from top to bottom (level 0 root down to deepest level) using a FIFO queue.",
    "concept_explanation": "Level order traversal provides an intuitive geometric view of the BST, showing which keys are at which depth from the root.",
    "algorithm": "Step 1: If root == NULL return.\nStep 2: Enqueue root into Q.\nStep 3: While Q not empty:\n        curr = dequeue(Q)\n        print curr->data\n        if curr->left: enqueue(curr->left)\n        if curr->right: enqueue(curr->right)",
    "pseudocode": "function levelOrder(root):\n    queue Q; enqueue(Q, root)\n    while not empty(Q):\n        n = dequeue(Q); print n.data\n        if n.left: enqueue(Q, n.left)\n        if n.right: enqueue(Q, n.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\n#define MAX 50\nstruct Node* queue[MAX];\nint front = 0, rear = 0;\n\nvoid levelOrder(struct Node* root) {\n    if (root == NULL) return;\n    front = rear = 0;\n    queue[rear++] = root;\n    while (front < rear) {\n        struct Node* curr = queue[front++];\n        printf(\"%d \", curr->data);\n        if (curr->left) queue[rear++] = curr->left;\n        if (curr->right) queue[rear++] = curr->right;\n    }\n}\n\nint main(void) {\n    printf(\"=== BST Level Order Traversal ===\\n\");\n    struct Node* root = NULL;\n    int data[] = {40, 20, 60, 10, 30, 50, 70};\n    for (int i = 0; i < 7; i++) root = insert(root, data[i]);\n\n    printf(\"Level Order: \");\n    levelOrder(root);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "BST with 40 (lvl 0), 20,60 (lvl 1), 10,30,50,70 (lvl 2)",
    "sample_output": "=== BST Level Order Traversal ===\nLevel Order: 40 20 60 10 30 50 70",
    "dry_run": "Level 0: 40. Level 1: 20, 60. Level 2: 10, 30, 50, 70.",
    "time_complexity": "• O(n) visits each node once.",
    "space_complexity": "• O(w) queue storage where w is maximum level width.",
    "advantages_disadvantages": "Reveals tree balance visually level by level.",
    "applications": "• Level-by-level tree visualization in GUI debuggers.",
    "viva_questions": [
      {
        "q": "What traversal is also known as Breadth-First Search (BFS)?",
        "a": "Level Order Traversal."
      }
    ]
  },
  "graph_representation": {
    "id": "graph_representation",
    "title": "Graph Representation Overview — Matrix vs List",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_representation",
    "subcategoryName": "Graph Representations",
    "keywords": [
      "graph representation",
      "adjacency matrix vs list",
      "graph storage",
      "graph data structures"
    ],
    "definition": "A Graph is a non-linear data structure G = (V, E) consisting of a set of vertices (V) and edges (E) connecting pairs of vertices, commonly represented using an Adjacency Matrix or an Adjacency List.",
    "concept_explanation": "An Adjacency Matrix uses a 2D V x V array where `matrix[u][v] = 1` indicates an edge between u and v. It requires O(V^2) space regardless of the number of edges, making it ideal for dense graphs. An Adjacency List uses an array of linked lists of size V, where index `u` holds a list of neighbors adjacent to `u`. It consumes O(V + E) space, making it optimal for sparse graphs (E << V^2).",
    "algorithm": "Representation Comparison:\n• Dense Graph (E ~ V^2): Adjacency Matrix preferred (O(1) edge lookup).\n• Sparse Graph (E << V^2): Adjacency List preferred (O(V + E) memory).",
    "pseudocode": "Matrix: int adj[V][V]\nList:   Node* adjList[V]",
    "c_program": "#include <stdio.h>\n#define V 4\n\nvoid printComparison(void) {\n    printf(\"=== Graph Representation Overview ===\\n\");\n    printf(\"| Feature          | Adjacency Matrix | Adjacency List   |\\n\");\n    printf(\"|------------------|------------------|------------------|\\n\");\n    printf(\"| Memory Space     | O(V^2)           | O(V + E)         |\\n\");\n    printf(\"| Edge Lookup      | O(1)             | O(degree(v))     |\\n\");\n    printf(\"| Add Edge         | O(1)             | O(1)             |\\n\");\n    printf(\"| Iterate Neighbors| O(V)             | O(degree(v))     |\\n\");\n    printf(\"| Best Suited For  | Dense Graphs     | Sparse Graphs    |\\n\");\n}\n\nint main(void) {\n    printComparison();\n    return 0;\n}",
    "sample_input": "Comparison of Matrix vs List for V = 4",
    "sample_output": "=== Graph Representation Overview ===\n| Feature          | Adjacency Matrix | Adjacency List   |\n|------------------|------------------|------------------|\n| Memory Space     | O(V^2)           | O(V + E)         |\n| Edge Lookup      | O(1)             | O(degree(v))     |\n| Add Edge         | O(1)             | O(1)             |\n| Iterate Neighbors| O(V)             | O(degree(v))     |\n| Best Suited For  | Dense Graphs     | Sparse Graphs    |",
    "dry_run": "Demonstrates the trade-offs between dense matrix lookups and sparse linked list memory footprints.",
    "time_complexity": "• Matrix: O(1) lookup, List: O(deg(u)) lookup.",
    "space_complexity": "• Matrix: O(V^2), List: O(V + E).",
    "advantages_disadvantages": "Matrix offers instant edge verification; List saves massive memory on real-world sparse graphs.",
    "applications": "• Social network connections (List), small dense routing circuits (Matrix).",
    "viva_questions": [
      {
        "q": "When is an adjacency matrix preferred over an adjacency list?",
        "a": "When the graph is dense (E is close to V^2) or when frequent O(1) edge lookups are required."
      }
    ]
  },
  "graph_adj_matrix": {
    "id": "graph_adj_matrix",
    "title": "Adjacency Matrix Implementation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_representation",
    "subcategoryName": "Graph Representations",
    "keywords": [
      "adjacency matrix",
      "graph 2d array",
      "matrix representation graph",
      "adj matrix c"
    ],
    "definition": "An Adjacency Matrix is a 2D boolean array `adj[V][V]` where `adj[i][j] = 1` indicates an edge from vertex i to vertex j, and 0 indicates no edge.",
    "concept_explanation": "For an undirected graph, the matrix is symmetric across the main diagonal (`adj[i][j] == adj[j][i]`). For a directed graph, the matrix may be asymmetric. Diagonal entries `adj[i][i]` represent self-loops.",
    "algorithm": "Step 1: Declare adj[V][V] initialized to 0.\nStep 2: addEdge(u, v):\n        adj[u][v] = 1\n        adj[v][u] = 1 (if undirected)\nStep 3: printMatrix():\n        Loop i = 0 to V-1, j = 0 to V-1: print adj[i][j].",
    "pseudocode": "int adj[V][V] = {0}\nfunction addEdge(u, v):\n    adj[u][v] = 1\n    adj[v][u] = 1",
    "c_program": "#include <stdio.h>\n#define V 4\n\nint adj[V][V];\n\nvoid initGraph(void) {\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) adj[i][j] = 0;\n    }\n}\n\nvoid addEdge(int u, int v) {\n    adj[u][v] = 1;\n    adj[v][u] = 1; // Undirected graph\n}\n\nvoid printMatrix(void) {\n    printf(\"Adjacency Matrix (%dx%d):\\n   \", V, V);\n    for (int i = 0; i < V; i++) printf(\"%d \", i);\n    printf(\"\\n  -------\\n\");\n    for (int i = 0; i < V; i++) {\n        printf(\"%d| \", i);\n        for (int j = 0; j < V; j++) {\n            printf(\"%d \", adj[i][j]);\n        }\n        printf(\"\\n\");\n    }\n}\n\nint main(void) {\n    printf(\"=== Adjacency Matrix Implementation ===\\n\");\n    initGraph();\n    addEdge(0, 1);\n    addEdge(0, 2);\n    addEdge(1, 2);\n    addEdge(2, 3);\n    printMatrix();\n    return 0;\n}",
    "sample_input": "Edges: (0,1), (0,2), (1,2), (2,3) on 4 vertices",
    "sample_output": "=== Adjacency Matrix Implementation ===\nAdjacency Matrix (4x4):\n   0 1 2 3 \n  -------\n0| 0 1 1 0 \n1| 1 0 1 0 \n2| 1 1 0 1 \n3| 0 0 1 0 ",
    "dry_run": "adj[0][1]=1, adj[1][0]=1. adj[0][2]=1, adj[2][0]=1. Symmetrical matrix constructed.",
    "time_complexity": "• Add Edge: O(1), Check Edge: O(1), Display: O(V^2).",
    "space_complexity": "• O(V^2) static contiguous storage.",
    "advantages_disadvantages": "O(1) edge lookup; high memory overhead O(V^2) for sparse graphs.",
    "applications": "• Dense circuit design, All-Pairs Shortest Path (Floyd-Warshall algorithm).",
    "viva_questions": [
      {
        "q": "Why is the adjacency matrix of an undirected graph symmetric?",
        "a": "Because an undirected edge between u and v represents a bidirectional link: (u, v) and (v, u) are identical."
      }
    ]
  },
  "graph_adj_list": {
    "id": "graph_adj_list",
    "title": "Adjacency List Implementation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_representation",
    "subcategoryName": "Graph Representations",
    "keywords": [
      "adjacency list",
      "graph linked list array",
      "sparse graph representation",
      "adj list c"
    ],
    "definition": "An Adjacency List represents a graph using an array of linked lists, where array index `i` heads a linked list containing all vertices directly adjacent to vertex `i`.",
    "concept_explanation": "Rather than reserving space for non-existent edges, each vertex only maintains pointers to its immediate neighbors. This reduces space complexity from O(V^2) to O(V + E).",
    "algorithm": "Step 1: Declare array of node pointers: struct Node* adjList[V] = {NULL}.\nStep 2: addEdge(u, v):\n        Allocate newNode with dest = v, prepend to adjList[u].\n        Allocate newNode with dest = u, prepend to adjList[v] (if undirected).",
    "pseudocode": "struct Node: dest, next\nNode* adjList[V] = {NULL}\nfunction addEdge(u, v):\n    adjList[u] = prepend(adjList[u], v)\n    adjList[v] = prepend(adjList[v], u)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n#define V 4\n\nstruct Node {\n    int dest;\n    struct Node* next;\n};\n\nstruct Node* adjList[V];\n\nvoid addEdge(int src, int dest) {\n    // Add edge src -> dest\n    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));\n    n1->dest = dest;\n    n1->next = adjList[src];\n    adjList[src] = n1;\n\n    // Add edge dest -> src (Undirected)\n    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));\n    n2->dest = src;\n    n2->next = adjList[dest];\n    adjList[dest] = n2;\n}\n\nvoid printGraph(void) {\n    printf(\"Adjacency List Representation:\\n\");\n    for (int i = 0; i < V; i++) {\n        struct Node* temp = adjList[i];\n        printf(\"Vertex %d: \", i);\n        while (temp) {\n            printf(\"-> %d \", temp->dest);\n            temp = temp->next;\n        }\n        printf(\"-> NULL\\n\");\n    }\n}\n\nint main(void) {\n    printf(\"=== Adjacency List Implementation ===\\n\");\n    for (int i = 0; i < V; i++) adjList[i] = NULL;\n    addEdge(0, 1);\n    addEdge(0, 2);\n    addEdge(1, 2);\n    addEdge(2, 3);\n    printGraph();\n    return 0;\n}",
    "sample_input": "Edges: (0,1), (0,2), (1,2), (2,3) on 4 vertices",
    "sample_output": "=== Adjacency List Implementation ===\nAdjacency List Representation:\nVertex 0: -> 2 -> 1 -> NULL\nVertex 1: -> 2 -> 0 -> NULL\nVertex 2: -> 3 -> 1 -> 0 -> NULL\nVertex 3: -> 2 -> NULL",
    "dry_run": "Vertex 0 links to 2 and 1. Vertex 2 links to 3, 1, 0. Memory allocated dynamically per edge.",
    "time_complexity": "• Add Edge: O(1), Space: O(V + E), Iterating neighbors: O(deg(v)).",
    "space_complexity": "• O(V + E) heap dynamic storage.",
    "advantages_disadvantages": "Optimal space for sparse graphs; checking if edge (u, v) exists takes O(degree(u)).",
    "applications": "• Web graph links, road networks, BFS/DFS traversal algorithms.",
    "viva_questions": [
      {
        "q": "What is the total number of nodes across all linked lists in an undirected graph?",
        "a": "2 * E nodes (since each edge appears twice)."
      }
    ]
  },
  "graph_bfs": {
    "id": "graph_bfs",
    "title": "Breadth-First Search (BFS) Traversal",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "bfs traversal",
      "breadth first search graph",
      "bfs c",
      "shortest path unweighted"
    ],
    "definition": "Breadth-First Search (BFS) traverses a graph in breadth-first fashion, visiting all immediate neighbors of the starting vertex first (distance 1), then all unvisited vertices at distance 2, and so forth using a queue and a visited array.",
    "concept_explanation": "BFS explores vertices layer by layer like ripples in water. A boolean `visited[]` array prevents cycles and redundant processing. BFS is guaranteed to discover the shortest path between two vertices in an unweighted graph.",
    "algorithm": "Step 1: Mark startVertex as visited: visited[startVertex] = true.\nStep 2: Enqueue startVertex into queue Q.\nStep 3: While Q is not empty:\n        u = dequeue(Q)\n        Visit u (print u)\n        For each unvisited neighbor v of u:\n            visited[v] = true\n            enqueue(Q, v)",
    "pseudocode": "function BFS(start):\n    visited = [false]*V\n    queue Q\n    visited[start] = true; enqueue(Q, start)\n    while Q not empty:\n        u = dequeue(Q)\n        print u\n        for v in adj[u]:\n            if not visited[v]:\n                visited[v] = true\n                enqueue(Q, v)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define V 5\n\nint adj[V][V];\nbool visited[V];\nint queue[V];\nint front = 0, rear = 0;\n\nvoid addEdge(int u, int v) { adj[u][v] = 1; adj[v][u] = 1; }\n\nvoid bfs(int startVertex) {\n    for (int i = 0; i < V; i++) visited[i] = false;\n    front = rear = 0;\n\n    visited[startVertex] = true;\n    queue[rear++] = startVertex;\n\n    printf(\"BFS Order starting from %d: \", startVertex);\n    while (front < rear) {\n        int u = queue[front++];\n        printf(\"%d \", u);\n\n        for (int v = 0; v < V; v++) {\n            if (adj[u][v] == 1 && !visited[v]) {\n                visited[v] = true;\n                queue[rear++] = v;\n            }\n        }\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    printf(\"=== Breadth-First Search (BFS) ===\\n\");\n    for (int i = 0; i < V; i++) for (int j = 0; j < V; j++) adj[i][j] = 0;\n    addEdge(0, 1); addEdge(0, 2); addEdge(1, 3); addEdge(2, 4);\n    bfs(0);\n    return 0;\n}",
    "sample_input": "Graph with edges (0,1), (0,2), (1,3), (2,4). Start BFS at 0",
    "sample_output": "=== Breadth-First Search (BFS) ===\nBFS Order starting from 0: 0 1 2 3 4",
    "dry_run": "Q: [0] -> pop 0, push 1, 2.\nQ: [1, 2] -> pop 1, push 3.\nQ: [2, 3] -> pop 2, push 4.\nQ: [3, 4] -> pop 3, pop 4. Result: 0 1 2 3 4.",
    "time_complexity": "• O(V + E) with adjacency list; O(V^2) with adjacency matrix.",
    "space_complexity": "• O(V) for queue and visited array.",
    "advantages_disadvantages": "Finds shortest path in unweighted graphs; requires extra memory for queue.",
    "applications": "• Peer-to-peer torrent discovery, GPS unweighted route mapping, social network 1st/2nd degree friends.",
    "viva_questions": [
      {
        "q": "Why is a visited array mandatory in graph BFS unlike tree level-order traversal?",
        "a": "Because graphs can contain cycles, which would cause an infinite loop without a visited tracking array."
      }
    ]
  },
  "graph_dfs": {
    "id": "graph_dfs",
    "title": "Depth-First Search (DFS) Traversal",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "dfs traversal",
      "depth first search graph",
      "dfs c",
      "backtracking graph"
    ],
    "definition": "Depth-First Search (DFS) is a traversal technique that starts at a designated vertex and explores as deeply as possible along each branch before backtracking, using recursion or an explicit stack.",
    "concept_explanation": "DFS dives along paths until reaching a dead end (a vertex with no unvisited neighbors), then backtracks to previous decision points. A visited array tracks explored vertices.",
    "algorithm": "DFS(u):\nStep 1: Mark visited[u] = true.\nStep 2: Print / process u.\nStep 3: For each neighbor v of u:\n        If visited[v] == false:\n            DFS(v)",
    "pseudocode": "function DFS(u):\n    visited[u] = true\n    print u\n    for v in adj[u]:\n        if not visited[v]:\n            DFS(v)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define V 5\n\nint adj[V][V];\nbool visited[V];\n\nvoid addEdge(int u, int v) { adj[u][v] = 1; adj[v][u] = 1; }\n\nvoid dfs(int u) {\n    visited[u] = true;\n    printf(\"%d \", u);\n\n    for (int v = 0; v < V; v++) {\n        if (adj[u][v] == 1 && !visited[v]) {\n            dfs(v);\n        }\n    }\n}\n\nint main(void) {\n    printf(\"=== Depth-First Search (DFS) Traversal ===\\n\");\n    for (int i = 0; i < V; i++) {\n        visited[i] = false;\n        for (int j = 0; j < V; j++) adj[i][j] = 0;\n    }\n    addEdge(0, 1); addEdge(0, 2); addEdge(1, 3); addEdge(2, 4);\n\n    printf(\"DFS Order starting from 0: \");\n    dfs(0);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Edges: (0,1), (0,2), (1,3), (2,4). Start DFS at 0",
    "sample_output": "=== Depth-First Search (DFS) Traversal ===\nDFS Order starting from 0: 0 1 3 2 4",
    "dry_run": "Visit 0 -> neighbor 1 unvisited -> visit 1 -> neighbor 3 unvisited -> visit 3 (dead end, backtrack to 1, backtrack to 0) -> neighbor 2 unvisited -> visit 2 -> visit 4. Result: 0 1 3 2 4.",
    "time_complexity": "• O(V + E) with adjacency list; O(V^2) with matrix.",
    "space_complexity": "• O(V) call stack / visited array.",
    "advantages_disadvantages": "Memory efficient for deep paths; detects cycles and connected components.",
    "applications": "• Cycle detection, topological sorting, solving mazes and puzzles.",
    "viva_questions": [
      {
        "q": "What data structure implicitly powers recursive DFS?",
        "a": "The system function call stack."
      }
    ]
  },
  "graph_bfs_queue": {
    "id": "graph_bfs_queue",
    "title": "BFS Traversal using Queue Data Structure",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "bfs queue c",
      "explicit queue bfs",
      "graph bfs fifo",
      "breadth first queue"
    ],
    "definition": "BFS Traversal using a Queue demonstrates the explicit FIFO queue mechanics (enqueue, dequeue, front, rear) that enforce breadth-first level order discovery in graphs.",
    "concept_explanation": "Vertices are processed in strict arrival order. Enqueueing marks a node visited so no node enters the queue multiple times.",
    "algorithm": "1. Enqueue root, mark visited.\n2. While queue not empty, dequeue current, inspect all neighbors, enqueue unvisited.",
    "pseudocode": "enqueue(start); visited[start] = true\nwhile queue:\n    curr = dequeue()\n    for neighbor in adj(curr):\n        if unvisited: mark and enqueue",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define V 4\n\nint queue[V];\nint front = 0, rear = 0;\n\nvoid enqueue(int x) { queue[rear++] = x; }\nint dequeue(void) { return queue[front++]; }\nbool isQueueEmpty(void) { return front == rear; }\n\nint main(void) {\n    int adj[V][V] = {\n        {0, 1, 1, 0},\n        {1, 0, 0, 1},\n        {1, 0, 0, 1},\n        {0, 1, 1, 0}\n    };\n    bool visited[V] = {false};\n\n    printf(\"=== BFS with Explicit Queue ===\\n\");\n    int start = 0;\n    visited[start] = true;\n    enqueue(start);\n\n    printf(\"BFS Sequence: \");\n    while (!isQueueEmpty()) {\n        int u = dequeue();\n        printf(\"%d \", u);\n        for (int v = 0; v < V; v++) {\n            if (adj[u][v] && !visited[v]) {\n                visited[v] = true;\n                enqueue(v);\n            }\n        }\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Square graph (0-1-3-2-0), start at 0",
    "sample_output": "=== BFS with Explicit Queue ===\nBFS Sequence: 0 1 2 3",
    "dry_run": "Q: [0]. Dequeue 0, enqueue 1, 2. Dequeue 1, enqueue 3. Dequeue 2. Dequeue 3. Output: 0 1 2 3.",
    "time_complexity": "• O(V^2) with matrix.",
    "space_complexity": "• O(V) queue buffer.",
    "advantages_disadvantages": "Clean separation of queue data structure from traversal logic.",
    "applications": "• Level-synchronous graph analytics.",
    "viva_questions": [
      {
        "q": "Why do we mark a vertex visited upon enqueueing rather than dequeueing?",
        "a": "To prevent the same neighbor from being enqueued multiple times by different predecessors."
      }
    ]
  },
  "graph_dfs_recursion": {
    "id": "graph_dfs_recursion",
    "title": "DFS Traversal using Recursion",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "recursive dfs",
      "dfs recursion c",
      "graph dfs recursive code"
    ],
    "definition": "Recursive DFS relies on the call stack to explore adjacent nodes, automatically unwinding (backtracking) when all edges from a vertex have been exhausted.",
    "concept_explanation": "Directly maps the graph traversal definition into recursive subproblems: visiting vertex u entails recursively visiting each unvisited neighbor v.",
    "algorithm": "dfsRecursive(u):\nvisited[u] = true\nprint u\nfor each neighbor v of u:\n    if not visited[v]:\n        dfsRecursive(v)",
    "pseudocode": "function dfsRec(u):\n    visited[u] = true\n    print u\n    for v in adj[u]:\n        if not visited[v]: dfsRec(v)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define V 4\n\nint adj[V][V] = {\n    {0, 1, 1, 0},\n    {1, 0, 0, 1},\n    {1, 0, 0, 1},\n    {0, 1, 1, 0}\n};\nbool visited[V];\n\nvoid dfsRecursive(int u) {\n    visited[u] = true;\n    printf(\"%d \", u);\n    for (int v = 0; v < V; v++) {\n        if (adj[u][v] && !visited[v]) {\n            dfsRecursive(v);\n        }\n    }\n}\n\nint main(void) {\n    printf(\"=== DFS Traversal using Recursion ===\\n\");\n    for (int i = 0; i < V; i++) visited[i] = false;\n    printf(\"DFS Path: \");\n    dfsRecursive(0);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Square graph (0-1-3-2-0), start at 0",
    "sample_output": "=== DFS Traversal using Recursion ===\nDFS Path: 0 1 3 2",
    "dry_run": "0 -> 1 -> 3 -> 2. All 4 nodes visited. Backtracks to 0.",
    "time_complexity": "• O(V + E) list, O(V^2) matrix.",
    "space_complexity": "• O(V) call stack.",
    "advantages_disadvantages": "Extremely concise and elegant code.",
    "applications": "• Pathfinding, flood fill algorithm, Kosaraju strongly connected components.",
    "viva_questions": [
      {
        "q": "What is the maximum recursion depth of DFS?",
        "a": "V (in a linear or chain graph)."
      }
    ]
  },
  "graph_dfs_stack": {
    "id": "graph_dfs_stack",
    "title": "DFS Traversal using Explicit Stack",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "iterative dfs",
      "dfs explicit stack",
      "stack based dfs c",
      "non recursive dfs"
    ],
    "definition": "Iterative DFS avoids recursion by explicitly maintaining a LIFO stack to store vertices to visit, eliminating the danger of system call stack overflow on deep graphs.",
    "concept_explanation": "Push the start vertex onto an explicit stack. While the stack is not empty, pop vertex u. If u has not been visited, mark it visited and process it. Then push all unvisited neighbors of u onto the stack.",
    "algorithm": "Step 1: Push startVertex onto stack S.\nStep 2: While S is not empty:\n        u = pop(S)\n        If visited[u] is false:\n            visited[u] = true\n            Print u\n            For each neighbor v of u:\n                If not visited[v]:\n                    push(S, v)",
    "pseudocode": "function iterativeDFS(start):\n    stack S; push(S, start)\n    while not empty(S):\n        u = pop(S)\n        if not visited[u]:\n            visited[u] = true; print u\n            for v in adj[u]:\n                if not visited[v]: push(S, v)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define V 4\n\nint stack[V * 2];\nint top = -1;\n\nvoid push(int x) { stack[++top] = x; }\nint pop(void) { return stack[top--]; }\nbool isStackEmpty(void) { return top == -1; }\n\nint main(void) {\n    int adj[V][V] = {\n        {0, 1, 1, 0},\n        {1, 0, 0, 1},\n        {1, 0, 0, 1},\n        {0, 1, 1, 0}\n    };\n    bool visited[V] = {false};\n\n    printf(\"=== DFS Traversal using Explicit Stack ===\\n\");\n    push(0);\n\n    printf(\"Iterative DFS Order: \");\n    while (!isStackEmpty()) {\n        int u = pop();\n        if (!visited[u]) {\n            visited[u] = true;\n            printf(\"%d \", u);\n            // Push unvisited neighbors\n            for (int v = V - 1; v >= 0; v--) {\n                if (adj[u][v] && !visited[v]) {\n                    push(v);\n                }\n            }\n        }\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Square graph, start at 0",
    "sample_output": "=== DFS Traversal using Explicit Stack ===\nIterative DFS Order: 0 1 3 2",
    "dry_run": "Stack: [0] -> pop 0, push 2, 1. Pop 1, push 3. Pop 3, push 2. Pop 2. Output: 0 1 3 2.",
    "time_complexity": "• O(V + E) list, O(V^2) matrix.",
    "space_complexity": "• O(V) stack storage.",
    "advantages_disadvantages": "Immune to call-stack overflow crashes on very deep graphs.",
    "applications": "• Production graph databases where graphs contain millions of sequential vertices.",
    "viva_questions": [
      {
        "q": "Why might you choose iterative DFS over recursive DFS?",
        "a": "To prevent stack overflow errors when exploring extremely large or deep graphs with small system call stacks."
      }
    ]
  },
  "graph_directed": {
    "id": "graph_directed",
    "title": "Directed Graph (Digraph) Representation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_types",
    "subcategoryName": "Graph Variations",
    "keywords": [
      "directed graph",
      "digraph c",
      "in degree out degree",
      "directed adjacency matrix"
    ],
    "definition": "A Directed Graph (Digraph) consists of vertices connected by directional edges (arcs), where edge (u, v) allows traversal exclusively from u to v.",
    "concept_explanation": "In a directed graph, the adjacency matrix is generally asymmetric (`adj[u][v] != adj[v][u]`). The out-degree of vertex u is the row sum of row u. The in-degree of vertex v is the column sum of column v.",
    "algorithm": "Step 1: addEdge(u, v): set adj[u][v] = 1 (do not set adj[v][u]).\nStep 2: inDegree(v): count 1s in column v.\nStep 3: outDegree(u): count 1s in row u.",
    "pseudocode": "function addDirectedEdge(u, v):\n    adj[u][v] = 1\noutDegree(u) = sum(adj[u][*])\ninDegree(v)  = sum(adj[*][v])",
    "c_program": "#include <stdio.h>\n#define V 3\n\nint adj[V][V] = {0};\n\nvoid addArc(int u, int v) {\n    adj[u][v] = 1; // Directed: u -> v only\n}\n\nint main(void) {\n    printf(\"=== Directed Graph (Digraph) Representation ===\\n\");\n    addArc(0, 1); // 0 -> 1\n    addArc(0, 2); // 0 -> 2\n    addArc(1, 2); // 1 -> 2\n\n    printf(\"Digraph Matrix:\\n\");\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) printf(\"%d \", adj[i][j]);\n        printf(\"\\n\");\n    }\n\n    printf(\"\\nDegrees:\\n\");\n    for (int i = 0; i < V; i++) {\n        int inDeg = 0, outDeg = 0;\n        for (int j = 0; j < V; j++) {\n            if (adj[i][j]) outDeg++;\n            if (adj[j][i]) inDeg++;\n        }\n        printf(\"Vertex %d: In-degree = %d, Out-degree = %d\\n\", i, inDeg, outDeg);\n    }\n    return 0;\n}",
    "sample_input": "Arcs: 0->1, 0->2, 1->2 on 3 vertices",
    "sample_output": "=== Directed Graph (Digraph) Representation ===\nDigraph Matrix:\n0 1 1 \n0 0 1 \n0 0 0 \n\nDegrees:\nVertex 0: In-degree = 0, Out-degree = 2\nVertex 1: In-degree = 1, Out-degree = 1\nVertex 2: In-degree = 2, Out-degree = 0",
    "dry_run": "Vertex 0 sends 2 arcs (out=2, in=0). Vertex 2 receives 2 arcs (in=2, out=0).",
    "time_complexity": "• Degree calculation: O(V) per vertex.",
    "space_complexity": "• O(V^2) matrix.",
    "advantages_disadvantages": "Accurately captures one-way dependencies.",
    "applications": "• Task dependency build graphs (Makefiles), webpage hyperlinks (PageRank).",
    "viva_questions": [
      {
        "q": "What is a vertex with in-degree 0 called?",
        "a": "A Source vertex."
      },
      {
        "q": "What is a vertex with out-degree 0 called?",
        "a": "A Sink vertex."
      }
    ]
  },
  "graph_undirected": {
    "id": "graph_undirected",
    "title": "Undirected Graph Representation & Degree Calculation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_types",
    "subcategoryName": "Graph Variations",
    "keywords": [
      "undirected graph",
      "degree of vertex",
      "handshaking lemma",
      "undirected graph c"
    ],
    "definition": "An Undirected Graph consists of vertices connected by bidirectional edges, where the degree of a vertex is the total count of edges incident to it.",
    "concept_explanation": "According to the Handshaking Lemma, the sum of degrees of all vertices equals twice the number of edges: `sum(deg(v)) = 2 * |E|`. Hence, the number of odd-degree vertices must always be even.",
    "algorithm": "1. addEdge(u, v): adj[u][v] = 1; adj[v][u] = 1;\n2. degree(u) = count 1s in row u.\n3. Verify Handshaking Lemma: sum(deg) == 2 * edges.",
    "pseudocode": "function degree(u):\n    return count 1s in adj[u]",
    "c_program": "#include <stdio.h>\n#define V 4\n\nint adj[V][V] = {0};\nint edgeCount = 0;\n\nvoid addEdge(int u, int v) {\n    adj[u][v] = 1;\n    adj[v][u] = 1;\n    edgeCount++;\n}\n\nint main(void) {\n    printf(\"=== Undirected Graph & Degree Calculation ===\\n\");\n    addEdge(0, 1);\n    addEdge(1, 2);\n    addEdge(2, 3);\n    addEdge(3, 0);\n    addEdge(0, 2);\n\n    int sumDegrees = 0;\n    for (int i = 0; i < V; i++) {\n        int deg = 0;\n        for (int j = 0; j < V; j++) if (adj[i][j]) deg++;\n        printf(\"Degree of vertex %d = %d\\n\", i, deg);\n        sumDegrees += deg;\n    }\n\n    printf(\"\\nTotal Edges: %d\\n\", edgeCount);\n    printf(\"Sum of Degrees: %d\\n\", sumDegrees);\n    printf(\"Handshaking Lemma holds: Sum (%d) == 2 * E (%d) -> %s\\n\",\n           sumDegrees, 2 * edgeCount, (sumDegrees == 2 * edgeCount) ? \"TRUE\" : \"FALSE\");\n    return 0;\n}",
    "sample_input": "Edges: (0,1), (1,2), (2,3), (3,0), (0,2)",
    "sample_output": "=== Undirected Graph & Degree Calculation ===\nDegree of vertex 0 = 3\nDegree of vertex 1 = 2\nDegree of vertex 2 = 3\nDegree of vertex 3 = 2\n\nTotal Edges: 5\nSum of Degrees: 10\nHandshaking Lemma holds: Sum (10) == 2 * E (10) -> TRUE",
    "dry_run": "Degrees: 3 + 2 + 3 + 2 = 10. Total edges = 5. 10 == 2 * 5. Proves Handshaking Lemma.",
    "time_complexity": "• O(V) per degree query.",
    "space_complexity": "• O(V^2) matrix.",
    "advantages_disadvantages": "Symmetric relations.",
    "applications": "• Mutual friendship networks, 2-way road transit maps.",
    "viva_questions": [
      {
        "q": "State the Handshaking Lemma for undirected graphs.",
        "a": "The sum of the degrees of all vertices is equal to twice the total number of edges in the graph."
      }
    ]
  },
  "graph_weighted": {
    "id": "graph_weighted",
    "title": "Weighted Graph Representation & Edge Weights",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_types",
    "subcategoryName": "Graph Variations",
    "keywords": [
      "weighted graph",
      "edge weights",
      "cost matrix graph",
      "weighted graph c"
    ],
    "definition": "A Weighted Graph assigns a numerical value (weight, cost, or distance) to each edge, represented using a weight matrix where `matrix[u][v] = weight` (or INF if no edge exists).",
    "concept_explanation": "Used whenever edges represent costs, bandwidth, latency, or distances. In an unweighted graph, an edge is 1 or 0; in a weighted graph, it stores the real cost. Non-edges are represented with a sentinel value like 0 or infinity (INF).",
    "algorithm": "1. Initialize weightMatrix[V][V] with INF (or 0).\n2. addWeightedEdge(u, v, weight):\n   weightMatrix[u][v] = weight\n   weightMatrix[v][u] = weight (if undirected)",
    "pseudocode": "int weightMatrix[V][V]\nfunction addEdge(u, v, w):\n    weightMatrix[u][v] = w",
    "c_program": "#include <stdio.h>\n#define V 4\n#define INF 99999\n\nint cost[V][V];\n\nvoid initGraph(void) {\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) {\n            cost[i][j] = (i == j) ? 0 : INF;\n        }\n    }\n}\n\nvoid addEdge(int u, int v, int w) {\n    cost[u][v] = w;\n    cost[v][u] = w; // Undirected\n}\n\nvoid printCostMatrix(void) {\n    printf(\"Weighted Cost Matrix:\\n\");\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) {\n            if (cost[i][j] == INF) printf(\"INF \");\n            else printf(\"%3d \", cost[i][j]);\n        }\n        printf(\"\\n\");\n    }\n}\n\nint main(void) {\n    printf(\"=== Weighted Graph Representation ===\\n\");\n    initGraph();\n    addEdge(0, 1, 10);\n    addEdge(0, 2, 15);\n    addEdge(1, 3, 20);\n    addEdge(2, 3, 35);\n    printCostMatrix();\n    return 0;\n}",
    "sample_input": "Edges with weights: (0,1,10), (0,2,15), (1,3,20), (2,3,35)",
    "sample_output": "=== Weighted Graph Representation ===\nWeighted Cost Matrix:\n  0  10  15 INF \n 10   0 INF  20 \n 15 INF   0  35 \nINF  20  35   0 ",
    "dry_run": "Diagonal has cost 0. Direct edges show respective weights. Disconnected pairs show INF.",
    "time_complexity": "• O(1) edge lookup and addition.",
    "space_complexity": "• O(V^2) matrix.",
    "advantages_disadvantages": "Models real-world distances and costs directly.",
    "applications": "• Shortest path algorithms (Dijkstra, Bellman-Ford), Minimum Spanning Tree (Kruskal, Prim).",
    "viva_questions": [
      {
        "q": "What is usually used to represent the absence of an edge in a weighted graph matrix?",
        "a": "Infinity (INF) or a sentinel value such as 0 or -1."
      }
    ]
  }
};
  var ALL_TOPICS = [
  {
    "id": "linear_search",
    "title": "Linear Search (Sequential Search)",
    "category": "searching",
    "categoryName": "Searching Techniques",
    "subcategory": "linear_search",
    "subcategoryName": "Linear Search",
    "keywords": [
      "linear search",
      "sequential search",
      "search array",
      "find element sequentially",
      "linear find"
    ]
  },
  {
    "id": "binary_search",
    "title": "Binary Search (Logarithmic Search)",
    "category": "searching",
    "categoryName": "Searching Techniques",
    "subcategory": "binary_search",
    "subcategoryName": "Binary Search",
    "keywords": [
      "binary search",
      "logarithmic search",
      "divide and conquer search",
      "bsearch",
      "sorted array search"
    ]
  },
  {
    "id": "bubble_sort",
    "title": "Bubble Sort (Comparison & Adjacent Exchange)",
    "category": "sorting",
    "categoryName": "Sorting Techniques",
    "subcategory": "bubble_sort",
    "subcategoryName": "Bubble Sort",
    "keywords": [
      "bubble sort",
      "sinking sort",
      "adjacent swap",
      "bubble sorting algorithm"
    ]
  },
  {
    "id": "selection_sort",
    "title": "Selection Sort (Minimum Selection & Placement)",
    "category": "sorting",
    "categoryName": "Sorting Techniques",
    "subcategory": "selection_sort",
    "subcategoryName": "Selection Sort",
    "keywords": [
      "selection sort",
      "min element sort",
      "find minimum swap",
      "selection sorting algorithm"
    ]
  },
  {
    "id": "insertion_sort",
    "title": "Insertion Sort (Card Player’s Sorting Algorithm)",
    "category": "sorting",
    "categoryName": "Sorting Techniques",
    "subcategory": "insertion_sort",
    "subcategoryName": "Insertion Sort",
    "keywords": [
      "insertion sort",
      "adaptive sort",
      "playing card sort",
      "online sort",
      "nearly sorted algorithm"
    ]
  },
  {
    "id": "merge_sort",
    "title": "Merge Sort (Divide-and-Conquer Sorting)",
    "category": "sorting",
    "categoryName": "Sorting Techniques",
    "subcategory": "merge_sort",
    "subcategoryName": "Merge Sort",
    "keywords": [
      "merge sort",
      "divide and conquer sort",
      "merge algorithm",
      "mergesort",
      "stable nlogn sort"
    ]
  },
  {
    "id": "quick_sort",
    "title": "Quick Sort (Partition-Exchange Sorting)",
    "category": "sorting",
    "categoryName": "Sorting Techniques",
    "subcategory": "quick_sort",
    "subcategoryName": "Quick Sort",
    "keywords": [
      "quick sort",
      "quicksort",
      "partition exchange",
      "lomuto partition",
      "in place nlogn sort"
    ]
  },
  {
    "id": "sll_create",
    "title": "Singly Linked List — Creation & Memory Allocation",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "create singly linked list",
      "linked list creation",
      "allocate node",
      "struct node c",
      "create node"
    ]
  },
  {
    "id": "sll_insert_beginning",
    "title": "Singly Linked List — Insert at Beginning (Prepend)",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "insert at beginning",
      "prepend node",
      "insert head linked list",
      "insert first node"
    ]
  },
  {
    "id": "sll_insert_end",
    "title": "Singly Linked List — Insert at End (Append)",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "insert at end",
      "append node",
      "insert tail linked list",
      "insert last node"
    ]
  },
  {
    "id": "sll_insert_pos",
    "title": "Singly Linked List — Insert at Specific Position",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "insert at position",
      "insert middle linked list",
      "insert at index",
      "insert given position"
    ]
  },
  {
    "id": "sll_delete_beginning",
    "title": "Singly Linked List — Delete from Beginning",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "delete from beginning",
      "delete head linked list",
      "pop front linked list",
      "remove first node"
    ]
  },
  {
    "id": "sll_delete_end",
    "title": "Singly Linked List — Delete from End",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "delete from end",
      "delete tail linked list",
      "pop back linked list",
      "remove last node"
    ]
  },
  {
    "id": "sll_delete_val",
    "title": "Singly Linked List — Delete a Specific Value",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "delete specific value",
      "delete key linked list",
      "remove value from list",
      "delete node by value"
    ]
  },
  {
    "id": "sll_delete_pos",
    "title": "Singly Linked List — Delete from Specific Position",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "delete at position",
      "delete from index",
      "delete specific position linked list"
    ]
  },
  {
    "id": "sll_display",
    "title": "Singly Linked List — Display / Traverse",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "display linked list",
      "traverse linked list",
      "print linked list",
      "print elements"
    ]
  },
  {
    "id": "sll_search",
    "title": "Singly Linked List — Search an Element",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "search linked list",
      "find node",
      "search element linked list",
      "locate key linked list"
    ]
  },
  {
    "id": "sll_count",
    "title": "Singly Linked List — Count Nodes",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "count nodes",
      "length of linked list",
      "size of linked list",
      "number of nodes"
    ]
  },
  {
    "id": "sll_reverse",
    "title": "Singly Linked List — Reverse a Linked List",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "singly_linked_list",
    "subcategoryName": "Singly Linked List",
    "keywords": [
      "reverse linked list",
      "invert linked list",
      "reverse singly linked list",
      "reverse list 3 pointers"
    ]
  },
  {
    "id": "dll_create",
    "title": "Doubly Linked List — Creation & Structure",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "create doubly linked list",
      "dll create",
      "struct dnode",
      "prev next pointer c"
    ]
  },
  {
    "id": "dll_insert_beginning",
    "title": "Doubly Linked List — Insert at Beginning",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll insert at beginning",
      "dll insert head",
      "doubly linked list prepend"
    ]
  },
  {
    "id": "dll_insert_end",
    "title": "Doubly Linked List — Insert at End",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll insert at end",
      "dll append",
      "doubly linked list append"
    ]
  },
  {
    "id": "dll_insert_pos",
    "title": "Doubly Linked List — Insert at a Specific Position",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll insert position",
      "dll insert index",
      "doubly linked list insert middle"
    ]
  },
  {
    "id": "dll_delete_beginning",
    "title": "Doubly Linked List — Delete from Beginning",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll delete beginning",
      "dll delete head",
      "doubly linked list pop front"
    ]
  },
  {
    "id": "dll_delete_end",
    "title": "Doubly Linked List — Delete from End",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll delete end",
      "dll delete tail",
      "doubly linked list pop back"
    ]
  },
  {
    "id": "dll_delete_node",
    "title": "Doubly Linked List — Delete a Specific Node",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll delete specific node",
      "dll delete node pointer",
      "doubly linked list delete node"
    ]
  },
  {
    "id": "dll_traverse_forward",
    "title": "Doubly Linked List — Forward Traversal",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll forward traversal",
      "dll traverse forward",
      "doubly linked list display"
    ]
  },
  {
    "id": "dll_traverse_backward",
    "title": "Doubly Linked List — Backward Traversal",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll backward traversal",
      "dll traverse backward",
      "doubly linked list reverse print"
    ]
  },
  {
    "id": "dll_search",
    "title": "Doubly Linked List — Search an Element",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "doubly_linked_list",
    "subcategoryName": "Doubly Linked List",
    "keywords": [
      "dll search",
      "search doubly linked list",
      "find key dll"
    ]
  },
  {
    "id": "cll_create",
    "title": "Circular Linked List — Creation & Circular Linkage",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "create circular linked list",
      "cll create",
      "circular linked list structure"
    ]
  },
  {
    "id": "cll_insert_beginning",
    "title": "Circular Linked List — Insert at Beginning",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "cll insert beginning",
      "cll insert head",
      "circular linked list insert start"
    ]
  },
  {
    "id": "cll_insert_end",
    "title": "Circular Linked List — Insert at End",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "cll insert end",
      "cll append",
      "circular linked list append"
    ]
  },
  {
    "id": "cll_delete_node",
    "title": "Circular Linked List — Delete a Node",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "cll delete node",
      "delete circular linked list",
      "remove node cll"
    ]
  },
  {
    "id": "cll_display",
    "title": "Circular Linked List — Display / Traverse",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "cll display",
      "cll traverse",
      "print circular linked list"
    ]
  },
  {
    "id": "cll_search",
    "title": "Circular Linked List — Search an Element",
    "category": "linked_lists",
    "categoryName": "Linked Lists",
    "subcategory": "circular_linked_list",
    "subcategoryName": "Circular Linked List",
    "keywords": [
      "cll search",
      "find circular linked list",
      "search cll element"
    ]
  },
  {
    "id": "stack_array_create",
    "title": "Stack Creation using Array",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "create stack array",
      "initialize stack",
      "stack declaration",
      "top pointer",
      "array stack init"
    ]
  },
  {
    "id": "stack_array_push",
    "title": "Push Operation in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "push stack array",
      "insert stack",
      "stack push operation",
      "add to stack"
    ]
  },
  {
    "id": "stack_array_pop",
    "title": "Pop Operation in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "pop stack array",
      "delete stack element",
      "remove from stack",
      "stack pop operation"
    ]
  },
  {
    "id": "stack_array_peek",
    "title": "Peek / Top Operation in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "peek stack array",
      "top of stack",
      "inspect top element",
      "stack peek"
    ]
  },
  {
    "id": "stack_array_display",
    "title": "Display Stack Elements in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "display stack array",
      "print stack",
      "traverse stack",
      "view stack elements"
    ]
  },
  {
    "id": "stack_array_isempty",
    "title": "isEmpty Check in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "isEmpty stack array",
      "check empty stack",
      "stack isempty condition"
    ]
  },
  {
    "id": "stack_array_isfull",
    "title": "isFull Check in Array Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "isFull stack array",
      "check full stack",
      "stack capacity check",
      "isFull condition"
    ]
  },
  {
    "id": "stack_array_overflow_underflow",
    "title": "Stack Overflow and Underflow Handling",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_array",
    "subcategoryName": "Array-Based Stack",
    "keywords": [
      "stack overflow",
      "stack underflow",
      "stack boundary conditions",
      "stack errors"
    ]
  },
  {
    "id": "stack_ll_create",
    "title": "Stack Creation using Linked List",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "create linked list stack",
      "dynamic stack",
      "stack using linked list",
      "linked stack init"
    ]
  },
  {
    "id": "stack_ll_push",
    "title": "Push Operation in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "push linked list stack",
      "insert dynamic stack",
      "stack ll push"
    ]
  },
  {
    "id": "stack_ll_pop",
    "title": "Pop Operation in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "pop linked list stack",
      "delete dynamic stack",
      "stack ll pop"
    ]
  },
  {
    "id": "stack_ll_peek",
    "title": "Peek / Top Operation in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "peek linked list stack",
      "top element linked stack",
      "ll stack peek"
    ]
  },
  {
    "id": "stack_ll_display",
    "title": "Display Stack Elements in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "display linked list stack",
      "print dynamic stack",
      "ll stack traversal"
    ]
  },
  {
    "id": "stack_ll_isempty",
    "title": "isEmpty Check in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "isEmpty linked list stack",
      "empty check dynamic stack",
      "ll stack isempty"
    ]
  },
  {
    "id": "stack_ll_overflow_underflow",
    "title": "Overflow & Underflow in Linked List Stack",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_linked_list",
    "subcategoryName": "Linked List Stack",
    "keywords": [
      "overflow underflow dynamic stack",
      "heap exhaustion stack",
      "ll stack boundary"
    ]
  },
  {
    "id": "stack_lifo_principle",
    "title": "LIFO Principle and Practical Applications",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_applications",
    "subcategoryName": "Stack Applications",
    "keywords": [
      "lifo principle",
      "last in first out",
      "stack applications",
      "why stack is lifo"
    ]
  },
  {
    "id": "stack_infix_to_postfix",
    "title": "Infix to Postfix Conversion",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_applications",
    "subcategoryName": "Stack Applications",
    "keywords": [
      "infix to postfix",
      "shunting yard",
      "convert expression",
      "operator precedence stack"
    ]
  },
  {
    "id": "stack_postfix_evaluation",
    "title": "Postfix Expression Evaluation",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_applications",
    "subcategoryName": "Stack Applications",
    "keywords": [
      "postfix evaluation",
      "evaluate rpn",
      "stack math expression",
      "postfix compute"
    ]
  },
  {
    "id": "stack_parentheses_matching",
    "title": "Parentheses Balancing / Matching",
    "category": "stacks",
    "categoryName": "Stacks",
    "subcategory": "stack_applications",
    "subcategoryName": "Stack Applications",
    "keywords": [
      "parentheses matching",
      "balanced brackets",
      "bracket syntax checker",
      "parentheses stack"
    ]
  },
  {
    "id": "queue_array_create",
    "title": "Queue Creation using Array",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "create linear queue",
      "array queue initialization",
      "queue declaration",
      "front rear pointers"
    ]
  },
  {
    "id": "queue_array_enqueue",
    "title": "Enqueue Operation in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "enqueue linear queue",
      "insert queue",
      "add to queue",
      "queue enqueue"
    ]
  },
  {
    "id": "queue_array_dequeue",
    "title": "Dequeue Operation in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "dequeue linear queue",
      "delete queue element",
      "remove from queue",
      "queue dequeue"
    ]
  },
  {
    "id": "queue_array_peek",
    "title": "Peek / Front Element in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "peek queue array",
      "front element queue",
      "inspect queue head"
    ]
  },
  {
    "id": "queue_array_display",
    "title": "Display Queue Elements in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "display queue",
      "print array queue",
      "traverse queue"
    ]
  },
  {
    "id": "queue_array_isempty",
    "title": "isEmpty Check in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "isEmpty queue array",
      "check empty queue",
      "queue isempty condition"
    ]
  },
  {
    "id": "queue_array_isfull",
    "title": "isFull Check in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "isFull queue array",
      "queue capacity check",
      "check full linear queue"
    ]
  },
  {
    "id": "cqueue_create",
    "title": "Circular Queue Creation",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "create circular queue",
      "circular buffer init",
      "modulo queue creation"
    ]
  },
  {
    "id": "cqueue_enqueue",
    "title": "Enqueue in Circular Queue using Modulo",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "enqueue circular queue",
      "circular queue insert",
      "modulo enqueue",
      "cqueue enqueue"
    ]
  },
  {
    "id": "cqueue_dequeue",
    "title": "Dequeue in Circular Queue using Modulo",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "dequeue circular queue",
      "circular queue delete",
      "modulo dequeue",
      "cqueue dequeue"
    ]
  },
  {
    "id": "cqueue_display",
    "title": "Display Circular Queue Elements",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "display circular queue",
      "print cqueue",
      "traverse circular queue"
    ]
  },
  {
    "id": "cqueue_front_rear",
    "title": "Front & Rear Pointer Movement in Circular Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "front rear pointer movement",
      "circular queue wrapping",
      "cqueue index math"
    ]
  },
  {
    "id": "cqueue_full_empty",
    "title": "Full and Empty Conditions in Circular Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "circular queue full condition",
      "cqueue empty condition",
      "cqueue boundary logic"
    ]
  },
  {
    "id": "queue_ll_create",
    "title": "Queue Creation using Linked List",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "create linked list queue",
      "dynamic queue",
      "queue ll init",
      "front rear pointers null"
    ]
  },
  {
    "id": "queue_ll_enqueue",
    "title": "Enqueue Operation in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "enqueue linked list queue",
      "insert dynamic queue",
      "queue ll enqueue"
    ]
  },
  {
    "id": "queue_ll_dequeue",
    "title": "Dequeue Operation in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "dequeue linked list queue",
      "delete dynamic queue",
      "queue ll dequeue"
    ]
  },
  {
    "id": "queue_ll_peek",
    "title": "Peek / Front Operation in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "peek linked list queue",
      "head element dynamic queue",
      "queue ll peek"
    ]
  },
  {
    "id": "queue_ll_display",
    "title": "Display Queue Elements in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "display linked list queue",
      "print dynamic queue",
      "queue ll traversal"
    ]
  },
  {
    "id": "queue_ll_empty",
    "title": "Empty Condition in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "empty condition linked list queue",
      "check empty ll queue",
      "queue ll isempty"
    ]
  },
  {
    "id": "queue_deque",
    "title": "Double-Ended Queue (Deque)",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_special",
    "subcategoryName": "Specialized Queues",
    "keywords": [
      "deque",
      "double ended queue",
      "insert front insert rear",
      "delete front delete rear"
    ]
  },
  {
    "id": "queue_priority",
    "title": "Priority Queue Implementation",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_special",
    "subcategoryName": "Specialized Queues",
    "keywords": [
      "priority queue",
      "pq c program",
      "priority scheduling",
      "ordered queue"
    ]
  },
  {
    "id": "tree_bt_create",
    "title": "Binary Tree Creation",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "create binary tree",
      "binary tree node",
      "init binary tree",
      "root node c"
    ]
  },
  {
    "id": "tree_bt_linked_rep",
    "title": "Linked Representation of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "linked representation binary tree",
      "binary tree node pointers",
      "tree memory layout"
    ]
  },
  {
    "id": "tree_bt_preorder",
    "title": "Preorder Traversal of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "preorder traversal",
      "root left right",
      "binary tree preorder",
      "tree preorder c"
    ]
  },
  {
    "id": "tree_bt_inorder",
    "title": "Inorder Traversal of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "inorder traversal",
      "left root right",
      "binary tree inorder",
      "tree inorder c"
    ]
  },
  {
    "id": "tree_bt_postorder",
    "title": "Postorder Traversal of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "postorder traversal",
      "left right root",
      "binary tree postorder",
      "tree postorder c"
    ]
  },
  {
    "id": "tree_bt_level_order",
    "title": "Level Order Traversal / BFS of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "level order traversal",
      "bfs binary tree",
      "breadth first tree traversal",
      "tree queue traversal"
    ]
  },
  {
    "id": "tree_bt_count_nodes",
    "title": "Count Total Nodes in Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "count nodes binary tree",
      "total nodes in tree",
      "tree size c"
    ]
  },
  {
    "id": "tree_bt_count_leaves",
    "title": "Count Leaf Nodes in Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "count leaf nodes",
      "number of leaves binary tree",
      "leaf node count c"
    ]
  },
  {
    "id": "tree_bt_height",
    "title": "Calculate Height / Depth of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "height binary tree",
      "depth binary tree",
      "max height tree c",
      "tree height algorithm"
    ]
  },
  {
    "id": "tree_bt_search",
    "title": "Search an Element in Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "search binary tree",
      "find node binary tree",
      "search value tree c"
    ]
  },
  {
    "id": "tree_bst_create",
    "title": "Binary Search Tree Creation",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "create bst",
      "bst initialization",
      "binary search tree properties",
      "bst c"
    ]
  },
  {
    "id": "tree_bst_insert",
    "title": "Insert a Node in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "insert bst",
      "bst insertion c",
      "add node to bst",
      "insert binary search tree"
    ]
  },
  {
    "id": "tree_bst_search",
    "title": "Search a Node in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "search bst",
      "bst lookup",
      "find in bst",
      "binary search tree search c"
    ]
  },
  {
    "id": "tree_bst_delete_leaf",
    "title": "Delete a Leaf Node in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "delete leaf bst",
      "bst leaf deletion",
      "remove leaf node bst"
    ]
  },
  {
    "id": "tree_bst_delete_one_child",
    "title": "Delete a Node with One Child in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "delete single child node bst",
      "bst delete one child",
      "remove degree 1 node bst"
    ]
  },
  {
    "id": "tree_bst_delete_two_children",
    "title": "Delete a Node with Two Children in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "delete two children bst",
      "inorder successor deletion",
      "bst node deletion case 3",
      "delete bst node"
    ]
  },
  {
    "id": "tree_bst_find_min",
    "title": "Find Minimum Value in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "find min bst",
      "minimum element bst",
      "bst smallest value",
      "bst min c"
    ]
  },
  {
    "id": "tree_bst_find_max",
    "title": "Find Maximum Value in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "find max bst",
      "maximum element bst",
      "bst largest value",
      "bst max c"
    ]
  },
  {
    "id": "tree_bst_inorder",
    "title": "Inorder Traversal of BST — Sorted Output",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "inorder bst",
      "bst sorted output",
      "bst inorder traversal",
      "sorted tree traversal"
    ]
  },
  {
    "id": "tree_bst_preorder",
    "title": "Preorder Traversal of BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "preorder bst",
      "bst preorder traversal",
      "reconstruct bst preorder"
    ]
  },
  {
    "id": "tree_bst_postorder",
    "title": "Postorder Traversal of BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "postorder bst",
      "bst postorder traversal",
      "delete bst postorder"
    ]
  },
  {
    "id": "tree_bst_level_order",
    "title": "Level Order Traversal of BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "level order bst",
      "bst bfs",
      "breadth first search bst",
      "bst level traversal"
    ]
  },
  {
    "id": "graph_representation",
    "title": "Graph Representation Overview — Matrix vs List",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_representation",
    "subcategoryName": "Graph Representations",
    "keywords": [
      "graph representation",
      "adjacency matrix vs list",
      "graph storage",
      "graph data structures"
    ]
  },
  {
    "id": "graph_adj_matrix",
    "title": "Adjacency Matrix Implementation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_representation",
    "subcategoryName": "Graph Representations",
    "keywords": [
      "adjacency matrix",
      "graph 2d array",
      "matrix representation graph",
      "adj matrix c"
    ]
  },
  {
    "id": "graph_adj_list",
    "title": "Adjacency List Implementation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_representation",
    "subcategoryName": "Graph Representations",
    "keywords": [
      "adjacency list",
      "graph linked list array",
      "sparse graph representation",
      "adj list c"
    ]
  },
  {
    "id": "graph_bfs",
    "title": "Breadth-First Search (BFS) Traversal",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "bfs traversal",
      "breadth first search graph",
      "bfs c",
      "shortest path unweighted"
    ]
  },
  {
    "id": "graph_dfs",
    "title": "Depth-First Search (DFS) Traversal",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "dfs traversal",
      "depth first search graph",
      "dfs c",
      "backtracking graph"
    ]
  },
  {
    "id": "graph_bfs_queue",
    "title": "BFS Traversal using Queue Data Structure",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "bfs queue c",
      "explicit queue bfs",
      "graph bfs fifo",
      "breadth first queue"
    ]
  },
  {
    "id": "graph_dfs_recursion",
    "title": "DFS Traversal using Recursion",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "recursive dfs",
      "dfs recursion c",
      "graph dfs recursive code"
    ]
  },
  {
    "id": "graph_dfs_stack",
    "title": "DFS Traversal using Explicit Stack",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "iterative dfs",
      "dfs explicit stack",
      "stack based dfs c",
      "non recursive dfs"
    ]
  },
  {
    "id": "graph_directed",
    "title": "Directed Graph (Digraph) Representation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_types",
    "subcategoryName": "Graph Variations",
    "keywords": [
      "directed graph",
      "digraph c",
      "in degree out degree",
      "directed adjacency matrix"
    ]
  },
  {
    "id": "graph_undirected",
    "title": "Undirected Graph Representation & Degree Calculation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_types",
    "subcategoryName": "Graph Variations",
    "keywords": [
      "undirected graph",
      "degree of vertex",
      "handshaking lemma",
      "undirected graph c"
    ]
  },
  {
    "id": "graph_weighted",
    "title": "Weighted Graph Representation & Edge Weights",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_types",
    "subcategoryName": "Graph Variations",
    "keywords": [
      "weighted graph",
      "edge weights",
      "cost matrix graph",
      "weighted graph c"
    ]
  }
];

  return {
    CATEGORIES: CATEGORIES,
    TOPICS: TOPICS,
    ALL_TOPICS: ALL_TOPICS,
    totalCount: 108
  };
});
