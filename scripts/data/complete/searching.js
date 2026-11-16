/**
 * Complete Searching Techniques Knowledge Module (14-Section Comprehensive Schema)
 */

module.exports = [
  {
    id: 'linear_search',
    title: 'Linear Search (Sequential Search)',
    category: 'searching',
    categoryName: 'Searching Techniques',
    subcategory: 'linear_search',
    subcategoryName: 'Linear Search',
    keywords: ['linear search', 'sequential search', 'search array', 'find element sequentially', 'linear find'],
    definition: 'Linear Search (also known as Sequential Search) is the simplest search algorithm that traverses an array or list sequentially from the first element to the last, comparing each element with the target key until a match is found or the end of the collection is reached.',
    concept_explanation: 'Linear search operates on the principle of exhaustive sequential verification. It requires no preconditions—the collection can be ordered or completely disordered. Starting at index 0, the algorithm inspects each contiguous memory location. If the target value equals the current item, the search terminates immediately and reports the index. If the index reaches the array boundary n without encountering the key, the algorithm concludes that the key is absent.',
    algorithm: `Step 1: Start from the leftmost element of array arr[] at index i = 0.
Step 2: Compare target key with arr[i].
Step 3: If arr[i] == key, return the index i (Successful Search).
Step 4: If arr[i] != key, increment i by 1 (i = i + 1).
Step 5: Repeat Steps 2 to 4 until i < n (where n is the number of elements).
Step 6: If i reaches n and no match was found, return -1 (Key Not Found).`,
    pseudocode: `function linearSearch(arr, n, key):
    for i from 0 to n - 1 do:
        if arr[i] == key then:
            return i    // Element found at index i
    return -1           // Element not present in array`,
    c_program: `#include <stdio.h>

/**
 * Performs linear search on an array of integers.
 * @param arr Array to search
 * @param n Number of elements in array
 * @param key Target value to find
 * @return Index of key if found, or -1 if not found
 */
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            return i; // Target located at index i
        }
    }
    return -1; // Target not present in collection
}

int main(void) {
    int arr[] = {12, 45, 67, 23, 89, 34};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key1 = 67;
    int key2 = 99;

    printf("=== Linear Search Demonstration ===\\n");
    printf("Array elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n\\n");

    // Case 1: Existing element
    int result1 = linearSearch(arr, n, key1);
    if (result1 != -1) {
        printf("Search for %d: Found at index %d (position %d)\\n", key1, result1, result1 + 1);
    } else {
        printf("Search for %d: Not found in array\\n", key1);
    }

    // Case 2: Non-existent element
    int result2 = linearSearch(arr, n, key2);
    if (result2 != -1) {
        printf("Search for %d: Found at index %d\\n", key2, result2);
    } else {
        printf("Search for %d: Not found in array (-1)\\n", key2);
    }

    return 0;
}`,
    sample_input: 'Array: [12, 45, 67, 23, 89, 34], Search Targets: 67 and 99',
    sample_output: `=== Linear Search Demonstration ===
Array elements: 12 45 67 23 89 34 

Search for 67: Found at index 2 (position 3)
Search for 99: Not found in array (-1)`,
    dry_run: `Target Key = 67 on Array arr[] = [12, 45, 67, 23, 89, 34] (n = 6):

| Step | Index (i) | arr[i] | Comparison (arr[i] == 67) | Action / Result |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 0 | 12 | 12 == 67 -> False | Continue to next index (i = 1) |
| 2 | 1 | 45 | 45 == 67 -> False | Continue to next index (i = 2) |
| 3 | 2 | 67 | 67 == 67 -> True | Match found! Terminate and return index 2 |

Total Comparisons = 3. Search status: Successful.`,
    time_complexity: `• Best Case: O(1) — The target key is located at the first position (index 0). Only 1 comparison is performed.
• Average Case: O(n) — On average, the target element is found around index n/2, requiring (n + 1)/2 comparisons.
• Worst Case: O(n) — The target key is at the last position (index n - 1) or does not exist at all, requiring all n comparisons.`,
    space_complexity: `• Auxiliary Space: O(1) — Operates directly on the input array in-place using only loop counter variables. Zero auxiliary allocations.`,
    advantages_disadvantages: `Advantages:
• Universally applicable: Works seamlessly on both sorted and unsorted collections.
• Data structure independence: Can be applied to contiguous arrays as well as node-linked lists.
• Simplicity: Minimal instruction footprint, zero setup overhead, ideal for tiny datasets (n < 20).
• Online algorithm: Can process a stream of incoming items one by one.

Disadvantages:
• Inefficient for large datasets: Scaling time is linear O(n). For 1,000,000 items, worst-case requires 1,000,000 comparisons.
• Outperformed by Binary Search (O(log n)) and Hash Tables (O(1)) when data can be preprocessed.`,
    applications: `• Searching small unordered local cache buffers and lookup tables.
• Finding an item in singly or doubly linked lists where direct index jumping is impossible.
• Debugging and verifying correctness of complex indexing structures.
• Searching transient real-time sensor streams before storing to disk.`,
    viva_questions: [
      {
        q: 'What is the average number of comparisons in a successful linear search on n elements?',
        a: 'The average number of comparisons is (n + 1) / 2, which asymptotically evaluates to O(n).'
      },
      {
        q: 'Can linear search be applied to a linked list?',
        a: 'Yes. Linear search is the native search method for linked lists because nodes can only be accessed sequentially via next pointers.'
      },
      {
        q: 'How does sentinel linear search improve standard linear search?',
        a: 'By placing the target key at the end of the array (as a sentinel), the boundary check (i < n) inside the loop is eliminated, reducing loop instruction overhead.'
      }
    ],
    edge_cases: `• Empty array (n = 0): Loop terminates immediately and returns -1 without segmentation fault.
• Single-element array (n = 1): Checks arr[0] and correctly handles both hit and miss.
• Target at last index (i = n - 1): Full loop executes without out-of-bounds error.
• Duplicate keys: Returns the first occurrence encountered from the left.`,
    diagram: `Index:     0      1      2      3      4      5
Array:  [ 12 ] [ 45 ] [ 67 ] [ 23 ] [ 89 ] [ 34 ]
           |      |      |
Step 1:   12!=67  |      |
Step 2:         45!=67   |
Step 3:                67==67  ==> FOUND at Index 2!`
  },
  {
    id: 'binary_search',
    title: 'Binary Search (Logarithmic Search)',
    category: 'searching',
    categoryName: 'Searching Techniques',
    subcategory: 'binary_search',
    subcategoryName: 'Binary Search',
    keywords: ['binary search', 'logarithmic search', 'divide and conquer search', 'bsearch', 'sorted array search'],
    definition: 'Binary Search is an optimal search algorithm based on the Divide-and-Conquer paradigm that repeatedly halves the search space of a sorted array by comparing the target key with the middle element.',
    concept_explanation: 'Binary search requires one mandatory precondition: the collection must be sorted in ascending (or descending) order. The algorithm maintains two pointers: low (beginning of search space) and high (end of search space). In each iteration, it computes mid = low + (high - low) / 2. If arr[mid] matches the key, the search succeeds. If the key is smaller than arr[mid], the target must reside in the left half, so high is updated to mid - 1. If larger, low is updated to mid + 1. The search terminates when the key is found or when low > high.',
    algorithm: `Step 1: Ensure array arr[] is sorted in ascending order.
Step 2: Initialize low = 0 and high = n - 1.
Step 3: While low <= high, repeat Steps 4 to 7:
Step 4:   Calculate mid = low + (high - low) / 2 (avoids integer overflow).
Step 5:   If arr[mid] == key, return mid (Target Found).
Step 6:   If key < arr[mid], set high = mid - 1 (Search Left Subarray).
Step 7:   If key > arr[mid], set low = mid + 1 (Search Right Subarray).
Step 8: If low exceeds high, return -1 (Target Not Present).`,
    pseudocode: `function binarySearch(arr, low, high, key):
    while low <= high do:
        mid = low + (high - low) / 2
        if arr[mid] == key then:
            return mid
        else if key < arr[mid] then:
            high = mid - 1
        else:
            low = mid + 1
    return -1`,
    c_program: `#include <stdio.h>

/**
 * Iterative implementation of Binary Search on a sorted array.
 * @param arr Sorted array of integers
 * @param n Size of the array
 * @param key Target value to search for
 * @return Zero-based index of key if found, or -1 if not found
 */
int binarySearchIterative(int arr[], int n, int key) {
    int low = 0;
    int high = n - 1;

    while (low <= high) {
        // Safe midpoint calculation avoiding integer overflow (low + high)
        int mid = low + (high - low) / 2;

        if (arr[mid] == key) {
            return mid; // Key located at index mid
        }
        else if (key < arr[mid]) {
            high = mid - 1; // Discard right half; search left
        }
        else {
            low = mid + 1;  // Discard left half; search right
        }
    }
    return -1; // Key absent
}

/**
 * Recursive implementation of Binary Search.
 */
int binarySearchRecursive(int arr[], int low, int high, int key) {
    if (low > high) {
        return -1; // Base case: search interval exhausted
    }

    int mid = low + (high - low) / 2;

    if (arr[mid] == key) {
        return mid;
    }
    if (key < arr[mid]) {
        return binarySearchRecursive(arr, low, mid - 1, key);
    }
    return binarySearchRecursive(arr, mid + 1, high, key);
}

int main(void) {
    int arr[] = {11, 22, 33, 44, 55, 66, 77, 88, 99};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key1 = 55;
    int key2 = 25;

    printf("=== Binary Search Demonstration ===\\n");
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n\\n");

    // Test Iterative Binary Search
    int idx1 = binarySearchIterative(arr, n, key1);
    printf("Iterative Search for %d: %s (Index %d)\\n", 
           key1, (idx1 != -1) ? "FOUND" : "NOT FOUND", idx1);

    int idx2 = binarySearchIterative(arr, n, key2);
    printf("Iterative Search for %d: %s (Index %d)\\n", 
           key2, (idx2 != -1) ? "FOUND" : "NOT FOUND", idx2);

    // Test Recursive Binary Search
    int recIdx1 = binarySearchRecursive(arr, 0, n - 1, key1);
    printf("Recursive Search for %d: FOUND at index %d\\n", key1, recIdx1);

    return 0;
}`,
    sample_input: 'Sorted Array: [11, 22, 33, 44, 55, 66, 77, 88, 99], Keys: 55, 25',
    sample_output: `=== Binary Search Demonstration ===
Sorted array: 11 22 33 44 55 66 77 88 99 

Iterative Search for 55: FOUND (Index 4)
Iterative Search for 25: NOT FOUND (Index -1)
Recursive Search for 55: FOUND at index 4`,
    dry_run: `Target Key = 55 on Sorted Array [11, 22, 33, 44, 55, 66, 77, 88, 99] (n = 9):

| Iteration | low | high | mid = low + (high - low)/2 | arr[mid] | Comparison | Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 0 | 8 | 0 + (8 - 0)/2 = 4 | 55 | 55 == 55 -> Match! | Search succeeds immediately at index 4. |

Target Key = 25 (Key absent):
| Iteration | low | high | mid | arr[mid] | Comparison | Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 0 | 8 | 4 | 55 | 25 < 55 -> Left | high = mid - 1 = 3 |
| 2 | 0 | 3 | 1 | 22 | 25 > 22 -> Right| low = mid + 1 = 2 |
| 3 | 2 | 3 | 2 | 33 | 25 < 33 -> Left | high = mid - 1 = 1 |
| 4 | 2 | 1 | — | — | low (2) > high (1)| Terminate. Return -1. |`,
    time_complexity: `• Best Case: O(1) — Target is located at the initial midpoint.
• Average Case: O(log n) — Search space is halved on each iteration. For n = 1,000,000, maximum comparisons <= 20.
• Worst Case: O(log n) — Target is at an extreme leaf or absent from the array.
• Recurrence Relation: T(n) = T(n/2) + O(1) => Master Theorem Case 2 gives O(log2 n).`,
    space_complexity: `• Iterative Version: O(1) auxiliary space (operates with only low, high, mid scalar pointers).
• Recursive Version: O(log n) auxiliary stack space due to function call recursion frames.`,
    advantages_disadvantages: `Advantages:
• Exponentially faster than linear search for large datasets (20 steps for 1 million items vs 1,000,000 steps).
• Deterministic logarithmic boundary guarantee.
• Optimal comparison-based searching efficiency.

Disadvantages:
• Strict sorted precondition: Unsorted data must be sorted first (costing O(n log n)).
• Contiguous access requirement: Inefficient for standard linked lists due to lack of O(1) random indexing.
• Static data bias: Frequent insertions/deletions in arrays incur costly O(n) shifts.`,
    applications: `• Database B-Tree and LSM-tree indexing algorithms.
• System libraries: C standard library bsearch() and C++ std::binary_search / std::lower_bound.
• Finding monotonic boundary points in numerical optimization and git bisect bug localization.
• IP routing prefix lookup tables.`,
    viva_questions: [
      {
        q: 'Why is mid = low + (high - low) / 2 preferred over mid = (low + high) / 2?',
        a: 'When low and high are large (e.g. close to INT_MAX 2^31 - 1), (low + high) overflows into a negative number in 32-bit signed integers, causing array index out-of-bounds exceptions.'
      },
      {
        q: 'Why is binary search unsuitable for standard singly linked lists?',
        a: 'Because linked lists do not support O(1) random access to the middle element; traversing to mid requires O(n/2) time, increasing total search complexity back to O(n).'
      },
      {
        q: 'What is the maximum number of comparisons for binary search on an array of size 1024?',
        a: 'log2(1024) + 1 = 10 + 1 = 11 comparisons maximum.'
      }
    ],
    edge_cases: `• Target at extreme left index (0) or extreme right index (n - 1): Correct boundary decrement/increment.
• Two-element array: mid calculates to low; handles both elements without infinite loop.
• Large array indexes: Prevent integer overflow with low + (high - low) / 2.
• Absent elements smaller than arr[0] or greater than arr[n - 1]: cleanly returns -1.`,
    diagram: `Initial:   [ 11 | 22 | 33 | 44 | 55 | 66 | 77 | 88 | 99 ]
             ^                   ^                   ^
            low=0              mid=4               high=8
                           arr[mid]=55 (MATCH!)`
  }
];

