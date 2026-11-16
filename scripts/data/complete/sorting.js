/**
 * Complete Sorting Techniques Knowledge Module (14-Section Comprehensive Schema)
 */

module.exports = [
  {
    id: 'bubble_sort',
    title: 'Bubble Sort (Comparison & Adjacent Exchange)',
    category: 'sorting',
    categoryName: 'Sorting Techniques',
    subcategory: 'bubble_sort',
    subcategoryName: 'Bubble Sort',
    keywords: ['bubble sort', 'sinking sort', 'adjacent swap', 'bubble sorting algorithm'],
    definition: 'Bubble Sort is a straightforward comparison-based sorting algorithm that repeatedly steps through an array, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements bubble up to the end of the array with each pass.',
    concept_explanation: 'Bubble sort works by making multiple passes across the array. In pass i, adjacent pairs (arr[j] and arr[j+1]) are compared from j = 0 to n - i - 1. If the left element exceeds the right, they are exchanged. By the end of the first pass, the maximum element is guaranteed to reside at the final position (n - 1). Subsequent passes place the second-largest, third-largest, etc., at their correct resting positions. An optimized variant employs a swapped flag to detect when the array has become fully sorted early, yielding O(n) best-case runtime.',
    algorithm: `Step 1: Given array arr of size n.
Step 2: Loop for i from 0 to n - 2 (total n - 1 passes):
Step 3:   Set swapped = 0.
Step 4:   Loop for j from 0 to n - i - 2:
Step 5:     If arr[j] > arr[j + 1], swap(arr[j], arr[j + 1]) and set swapped = 1.
Step 6:   If swapped == 0 (no swaps occurred), the array is already sorted; break early.
Step 7: The array is now fully sorted in ascending order.`,
    pseudocode: `function bubbleSort(arr, n):
    for i from 0 to n - 2 do:
        swapped = false
        for j from 0 to n - i - 2 do:
            if arr[j] > arr[j + 1] then:
                swap(arr[j], arr[j + 1])
                swapped = true
        if not swapped then:
            break`,
    c_program: `#include <stdio.h>
#include <stdbool.h>

/**
 * Optimized Bubble Sort using a swapped flag.
 * @param arr Array to sort
 * @param n Number of elements
 */
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;

        // Last i elements are already in place
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        // Optimization: if no two elements were swapped, array is sorted
        if (!swapped) {
            break;
        }
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("=== Optimized Bubble Sort Demonstration ===\\n");
    printf("Original array: ");
    printArray(arr, n);

    bubbleSort(arr, n);

    printf("Sorted array:   ");
    printArray(arr, n);

    // Demonstrate Best-case O(n) early break on already sorted array
    int sortedArr[] = {1, 2, 3, 4, 5};
    int n2 = 5;
    printf("\\nSorting already sorted array: ");
    printArray(sortedArr, n2);
    bubbleSort(sortedArr, n2);
    printf("Finished in 1 pass with 0 swaps!\\n");

    return 0;
}`,
    sample_input: 'Array: [64, 34, 25, 12, 22, 11, 90] (n = 7)',
    sample_output: `=== Optimized Bubble Sort Demonstration ===
Original array: 64 34 25 12 22 11 90 
Sorted array:   11 12 22 25 34 64 90 

Sorting already sorted array: 1 2 3 4 5 
Finished in 1 pass with 0 swaps!`,
    dry_run: `Dry run on arr = [64, 34, 25, 12, 22]:
• Pass 1 (i = 0):
  - Compare 64 > 34: Swap -> [34, 64, 25, 12, 22]
  - Compare 64 > 25: Swap -> [34, 25, 64, 12, 22]
  - Compare 64 > 12: Swap -> [34, 25, 12, 64, 22]
  - Compare 64 > 22: Swap -> [34, 25, 12, 22, 64] (64 is in final position)
• Pass 2 (i = 1):
  - Compare 34 > 25: Swap -> [25, 34, 12, 22, 64]
  - Compare 34 > 12: Swap -> [25, 12, 34, 22, 64]
  - Compare 34 > 22: Swap -> [25, 12, 22, 34, 64] (34 is in final position)
• Pass 3 (i = 2):
  - Compare 25 > 12: Swap -> [12, 25, 22, 34, 64]
  - Compare 25 > 22: Swap -> [12, 22, 25, 34, 64] (25 is in final position)
• Pass 4 (i = 3):
  - Compare 12 > 22: No swap. swapped = false. Array sorted!`,
    time_complexity: `• Best Case: O(n) — When the array is already sorted, the swapped flag remains false in pass 1, triggering an early break after n - 1 comparisons.
• Average Case: O(n^2) — On average, n(n - 1)/4 swaps and comparisons are executed.
• Worst Case: O(n^2) — When array is reverse sorted, n(n - 1)/2 comparisons and swaps occur.`,
    space_complexity: `• Auxiliary Space: O(1) — In-place algorithm requiring only a single temporary variable for swapping.`,
    advantages_disadvantages: `Advantages:
• Stable sort: Preserves the relative order of identical elements (equal items are never swapped).
• In-place: Zero auxiliary dynamic memory required.
• Adaptive: Achieves linear O(n) performance on pre-sorted data when optimized.

Disadvantages:
• Highly inefficient: Excessive CPU cycle consumption and memory writes compared to Quick Sort or Insertion Sort.
• Not suitable for production or datasets exceeding a few hundred records.`,
    applications: `• Academic computer science education for introducing comparison sorting and invariant concepts.
• Verifying hardware graphics sorting circuits.
• Operating system routines verifying if a small buffer is already sorted.`,
    viva_questions: [
      {
        q: 'Is Bubble Sort stable? Why?',
        a: 'Yes, Bubble Sort is stable because the comparison condition is strictly greater than (arr[j] > arr[j+1]). Equal keys are never swapped across each other.'
      },
      {
        q: 'What is the maximum number of swaps in Bubble Sort for n elements?',
        a: 'n(n - 1) / 2 swaps, which occurs when the array is sorted in reverse order.'
      }
    ],
    edge_cases: `• Already sorted input: Handled in O(n) with swapped flag.
• Reverse sorted input: Maximum swaps performed safely.
• Identical elements array ([5, 5, 5]): Zero swaps, terminates in 1 pass.`,
    diagram: `Pass 1: [ 64 , 34 , 25 , 12 ] -> [ 34 , 25 , 12 | 64 ] (64 bubbled to end)
Pass 2: [ 34 , 25 , 12 | 64 ] -> [ 25 , 12 | 34 , 64 ] (34 bubbled)
Pass 3: [ 25 , 12 | 34 , 64 ] -> [ 12 , 25 , 34 , 64 ] (Sorted!)`
  },
  {
    id: 'selection_sort',
    title: 'Selection Sort (Minimum Selection & Placement)',
    category: 'sorting',
    categoryName: 'Sorting Techniques',
    subcategory: 'selection_sort',
    subcategoryName: 'Selection Sort',
    keywords: ['selection sort', 'min element sort', 'find minimum swap', 'selection sorting algorithm'],
    definition: 'Selection Sort is an in-place comparison sort that divides the input array into a sorted subarray on the left and an unsorted subarray on the right. In each iteration, it finds the minimum element in the unsorted subarray and swaps it with the first unsorted position.',
    concept_explanation: 'Selection sort maintains two conceptual partitions: a sorted prefix (indices 0 to i - 1) and an unsorted suffix (indices i to n - 1). In pass i, the algorithm scans the entire unsorted suffix to identify the index min_idx containing the smallest key. Exactly one swap is then made between arr[i] and arr[min_idx]. This guarantees that the sorted boundary expands rightward by one element per pass. Because it performs at most n - 1 swaps in total, Selection Sort minimizes write operations to memory.',
    algorithm: `Step 1: Set i = 0.
Step 2: While i < n - 1:
Step 3:   Set min_idx = i.
Step 4:   Loop j from i + 1 to n - 1:
Step 5:     If arr[j] < arr[min_idx], update min_idx = j.
Step 6:   If min_idx != i, swap(arr[i], arr[min_idx]).
Step 7:   Increment i by 1.
Step 8: The array is sorted.`,
    pseudocode: `function selectionSort(arr, n):
    for i from 0 to n - 2 do:
        min_idx = i
        for j from i + 1 to n - 1 do:
            if arr[j] < arr[min_idx] then:
                min_idx = j
        if min_idx != i then:
            swap(arr[i], arr[min_idx])`,
    c_program: `#include <stdio.h>

/**
 * Implements Selection Sort algorithm.
 * @param arr Array of integers to sort
 * @param n Size of array
 */
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Assume the first unsorted element is the minimum
        int min_idx = i;

        // Search the unsorted subarray for the true minimum
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }

        // Swap the found minimum element with the first unsorted element
        if (min_idx != i) {
            int temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;
        }
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int arr[] = {29, 10, 14, 37, 13};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("=== Selection Sort Demonstration ===\\n");
    printf("Original array: ");
    printArray(arr, n);

    selectionSort(arr, n);

    printf("Sorted array:   ");
    printArray(arr, n);
    return 0;
}`,
    sample_input: 'Array: [29, 10, 14, 37, 13] (n = 5)',
    sample_output: `=== Selection Sort Demonstration ===
Original array: 29 10 14 37 13 
Sorted array:   10 13 14 29 37`,
    dry_run: `Dry run on [29, 10, 14, 37, 13]:
• Pass 0: Find minimum in [29, 10, 14, 37, 13] -> min is 10 at index 1.
  Swap arr[0] (29) with arr[1] (10) -> [10 | 29, 14, 37, 13]
• Pass 1: Find minimum in [29, 14, 37, 13] -> min is 13 at index 4.
  Swap arr[1] (29) with arr[4] (13) -> [10, 13 | 14, 37, 29]
• Pass 2: Find minimum in [14, 37, 29] -> min is 14 at index 2 (already in place).
  No swap -> [10, 13, 14 | 37, 29]
• Pass 3: Find minimum in [37, 29] -> min is 29 at index 4.
  Swap arr[3] (37) with arr[4] (29) -> [10, 13, 14, 29 | 37]
Array sorted with exactly 3 swaps!`,
    time_complexity: `• Best Case: O(n^2) — Even if array is sorted, the inner loop still scans all remaining elements to verify the minimum.
• Average Case: O(n^2) — Requires n(n - 1)/2 comparisons regardless of initial key ordering.
• Worst Case: O(n^2) — n(n - 1)/2 comparisons.`,
    space_complexity: `• Auxiliary Space: O(1) — Completely in-place; uses only scalar variables (i, j, min_idx, temp).`,
    advantages_disadvantages: `Advantages:
• Minimal memory writes: Performs at most O(n) swaps (at most n - 1 swaps total), making it ideal when write operations to memory (like Flash/EEPROM) are physically expensive.
• Simple logic and small code size.

Disadvantages:
• Unstable by default: Long-range swaps can invert the relative order of duplicate elements.
• Non-adaptive: Performance remains O(n^2) even on an already sorted list.`,
    applications: `• Flash memory microcontrollers where flash write endurance is limited and minimizing erase/write cycles is critical.
• Small embedded systems with strict RAM and instruction size limits.`,
    viva_questions: [
      {
        q: 'Why is Selection Sort considered optimal in terms of memory write cycles?',
        a: 'Because it performs at most n - 1 swaps across the entire sort (O(n) writes), unlike Bubble Sort or Insertion Sort which may perform O(n^2) writes.'
      },
      {
        q: 'Why is Selection Sort unstable? Give an example.',
        a: 'Consider [4a, 4b, 2]. The minimum is 2, so 4a swaps with 2, giving [2, 4b, 4a]. The relative order of 4a and 4b is inverted.'
      }
    ],
    edge_cases: `• Array already sorted: Executes comparisons but makes zero swaps.
• Array with duplicate elements: Correctly sorts keys but instability may alter identical item ordering.
• Array with all equal elements: min_idx never changes, 0 swaps made.`,
    diagram: `[ 29 | 10 | 14 | 37 | 13 ]  ==> min is 10 (idx 1)
   ^----' (swap 29 and 10)
[ 10 | 29 | 14 | 37 | 13 ]  ==> min is 13 (idx 4)
        ^------------' (swap 29 and 13)
[ 10 | 13 | 14 | 29 | 37 ] (Sorted)`
  },
  {
    id: 'insertion_sort',
    title: 'Insertion Sort (Card Player’s Sorting Algorithm)',
    category: 'sorting',
    categoryName: 'Sorting Techniques',
    subcategory: 'insertion_sort',
    subcategoryName: 'Insertion Sort',
    keywords: ['insertion sort', 'adaptive sort', 'playing card sort', 'online sort', 'nearly sorted algorithm'],
    definition: 'Insertion Sort is an intuitive, stable comparison sorting algorithm that builds the final sorted array one element at a time by picking the next element and shifting larger elements in the sorted prefix to make room for its insertion.',
    concept_explanation: 'Insertion sort mirrors the way human players arrange cards in hand. Elements from index 0 to i - 1 form an already-sorted sub-hand. At step i, the value key = arr[i] is extracted. The algorithm compares key with preceding elements from right to left (index j = i - 1 down to 0). As long as arr[j] is greater than key, arr[j] is shifted one position to the right (arr[j + 1] = arr[j]). Once a smaller element or the beginning of the array is encountered, key is inserted into the opened slot (arr[j + 1] = key).',
    algorithm: `Step 1: Loop for i from 1 to n - 1:
Step 2:   Set key = arr[i] and j = i - 1.
Step 3:   While j >= 0 and arr[j] > key:
Step 4:     Shift arr[j] rightward: arr[j + 1] = arr[j].
Step 5:     Decrement j by 1 (j = j - 1).
Step 6:   Insert key at correct position: arr[j + 1] = key.
Step 7: The array is sorted.`,
    pseudocode: `function insertionSort(arr, n):
    for i from 1 to n - 1 do:
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key do:
            arr[j + 1] = arr[j]
            j = j - 1
        arr[j + 1] = key`,
    c_program: `#include <stdio.h>

/**
 * Implements Insertion Sort algorithm.
 * @param arr Array to sort
 * @param n Size of the array
 */
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Move elements of arr[0..i-1] that are greater than key
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int arr[] = {12, 11, 13, 5, 6};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("=== Insertion Sort Demonstration ===\\n");
    printf("Original array: ");
    printArray(arr, n);

    insertionSort(arr, n);

    printf("Sorted array:   ");
    printArray(arr, n);

    // Demonstrate adaptive O(n) on nearly sorted data
    int nearlySorted[] = {1, 2, 4, 3, 5, 6};
    int n2 = sizeof(nearlySorted) / sizeof(nearlySorted[0]);
    printf("\\nNearly sorted array before: ");
    printArray(nearlySorted, n2);
    insertionSort(nearlySorted, n2);
    printf("Nearly sorted array after:  ");
    printArray(nearlySorted, n2);

    return 0;
}`,
    sample_input: 'Array: [12, 11, 13, 5, 6] (n = 5)',
    sample_output: `=== Insertion Sort Demonstration ===
Original array: 12 11 13 5 6 
Sorted array:   5 6 11 12 13 

Nearly sorted array before: 1 2 4 3 5 6 
Nearly sorted array after:  1 2 3 4 5 6`,
    dry_run: `Dry run on [12, 11, 13, 5, 6]:
• i = 1, key = 11: 12 > 11 -> Shift 12 right. Place 11 at arr[0] -> [11, 12, 13, 5, 6]
• i = 2, key = 13: 12 < 13 -> No shift. Place 13 at arr[2] -> [11, 12, 13, 5, 6]
• i = 3, key = 5:  13>5, 12>5, 11>5 -> Shift 13, 12, 11 right. Place 5 at arr[0] -> [5, 11, 12, 13, 6]
• i = 4, key = 6:  13>6, 12>6, 11>6 -> Shift 13, 12, 11 right. 5 < 6 -> Place 6 at arr[1] -> [5, 6, 11, 12, 13]
Array fully sorted!`,
    time_complexity: `• Best Case: O(n) — When the array is already sorted, the while loop condition fails immediately on every i. Only n - 1 comparisons and 0 shifts occur.
• Average Case: O(n^2) — Approximately n^2 / 4 comparisons and shifts.
• Worst Case: O(n^2) — When array is reverse sorted, every element must shift across the entire sorted prefix.`,
    space_complexity: `• Auxiliary Space: O(1) — In-place; requires only scalar storage for key, i, and j.`,
    advantages_disadvantages: `Advantages:
• Highly adaptive: Runs in near O(n) time on data that is already mostly sorted.
• Stable sort: Never changes relative order of equivalent items.
• Online algorithm: Can sort a live data stream as elements arrive in real-time.
• Minimal overhead: Outperforms Quick Sort and Merge Sort on small collections (n < 30). Used as base case in hybrid algorithms like Timsort and Introsort.

Disadvantages:
• Quadratic scaling: O(n^2) average and worst-case time makes it slow for massive random arrays.`,
    applications: `• Hybrid sorting engines: Used as the base-case sorter in Python's Timsort and V8's sorting engine for sub-arrays of size <= 32.
• Sorting nearly-sorted real-time data feeds (e.g. stock market updates with occasional out-of-order ticks).`,
    viva_questions: [
      {
        q: 'Why is Insertion Sort adaptive?',
        a: 'Because its inner while loop terminates as soon as arr[j] <= key. For nearly-sorted data, it executes very few shifts, approaching O(n) time complexity.'
      },
      {
        q: 'What is an online sorting algorithm?',
        a: 'An algorithm that can process and sort inputs on the fly as they arrive sequentially, without requiring access to the full dataset upfront.'
      }
    ],
    edge_cases: `• Single element array (n = 1): Loop for i does not execute; array is inherently sorted.
• Reverse sorted: Triggers worst-case shifts, verified safe without index underflow (j >= 0 guard).
• Identical keys: Maintained in original relative position (stability guaranteed).`,
    diagram: `Key = 5:
[ 11 | 12 | 13 |  5 |  6 ]
  -->   -->  --> (shift 13, 12, 11 right)
[  5 | 11 | 12 | 13 |  6 ]`
  },
  {
    id: 'merge_sort',
    title: 'Merge Sort (Divide-and-Conquer Sorting)',
    category: 'sorting',
    categoryName: 'Sorting Techniques',
    subcategory: 'merge_sort',
    subcategoryName: 'Merge Sort',
    keywords: ['merge sort', 'divide and conquer sort', 'merge algorithm', 'mergesort', 'stable nlogn sort'],
    definition: 'Merge Sort is a highly efficient, general-purpose, comparison-based sorting algorithm that operates on the Divide-and-Conquer paradigm, recursively dividing an array into two halves until single-element subarrays remain, and then merging them into sorted order.',
    concept_explanation: 'Merge sort follows three fundamental steps: 1) Divide: Compute mid = low + (high - low) / 2 and split array into left subarray arr[low..mid] and right subarray arr[mid+1..high]. 2) Conquer: Recursively sort both subarrays. 3) Combine: Merge the two sorted subarrays into a single sorted array by using two pointers to compare elements and copy the smaller item into an auxiliary array. Because the recursion tree has a depth of log2(n) and each level does O(n) total merging work, Merge Sort guarantees O(n log n) runtime in ALL cases.',
    algorithm: `Step 1: If low < high:
Step 2:   Calculate mid = low + (high - low) / 2.
Step 3:   Recursively call mergeSort(arr, low, mid).
Step 4:   Recursively call mergeSort(arr, mid + 1, high).
Step 5:   Call merge(arr, low, mid, high) to merge the two sorted halves:
Step 6:     Create auxiliary arrays L[] and R[] and copy data.
Step 7:     Use two pointers i and j to pick smaller element and place into arr[k].
Step 8:     Copy any remaining elements from L[] or R[].`,
    pseudocode: `function mergeSort(arr, low, high):
    if low < high then:
        mid = low + (high - low) / 2
        mergeSort(arr, low, mid)
        mergeSort(arr, mid + 1, high)
        merge(arr, low, mid, high)

function merge(arr, low, mid, high):
    // Copy to temporary arrays L and R
    // Merge back into arr[low..high] in sorted order`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

/**
 * Merges two sorted subarrays arr[low..mid] and arr[mid+1..high].
 */
void merge(int arr[], int low, int mid, int high) {
    int n1 = mid - low + 1;
    int n2 = high - mid;

    // Create temporary arrays
    int *L = (int *)malloc(n1 * sizeof(int));
    int *R = (int *)malloc(n2 * sizeof(int));

    // Copy data to temp arrays
    for (int i = 0; i < n1; i++)
        L[i] = arr[low + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    // Merge the temp arrays back into arr[low..high]
    int i = 0, j = 0, k = low;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) { // '<=' ensures stability
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements of L[], if any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy remaining elements of R[], if any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

    // Free dynamically allocated auxiliary buffers
    free(L);
    free(R);
}

/**
 * Recursive Merge Sort implementation.
 */
void mergeSort(int arr[], int low, int high) {
    if (low < high) {
        int mid = low + (high - low) / 2;

        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("=== Merge Sort Demonstration ===\\n");
    printf("Original array: ");
    printArray(arr, n);

    mergeSort(arr, 0, n - 1);

    printf("Sorted array:   ");
    printArray(arr, n);

    return 0;
}`,
    sample_input: 'Array: [38, 27, 43, 3, 9, 82, 10] (n = 7)',
    sample_output: `=== Merge Sort Demonstration ===
Original array: 38 27 43 3 9 82 10 
Sorted array:   3 9 10 27 38 43 82`,
    dry_run: `Recursion Tree on [38, 27, 43, 3]:
1. Divide: [38, 27] and [43, 3]
2. Divide further: [38], [27], [43], [3]
3. Conquer & Merge:
   - merge([38], [27]) -> compares 38 and 27 -> [27, 38]
   - merge([43], [3])  -> compares 43 and 3  -> [3, 43]
4. Final Merge:
   - merge([27, 38], [3, 43]):
     - compare 27 vs 3  -> take 3
     - compare 27 vs 43 -> take 27
     - compare 38 vs 43 -> take 38
     - copy remaining 43 -> [3, 27, 38, 43]`,
    time_complexity: `• Best Case: O(n log n)
• Average Case: O(n log n)
• Worst Case: O(n log n) — Recurrence T(n) = 2T(n/2) + O(n). By Master Theorem Case 2, T(n) = Theta(n log2 n) unconditionally. Guaranteed upper bound.`,
    space_complexity: `• Auxiliary Space: O(n) — Requires an auxiliary buffer to merge subarrays.
• Call Stack Space: O(log n) recursive frame depth.`,
    advantages_disadvantages: `Advantages:
• Guaranteed O(n log n) performance even in the worst-case (no degradation like Quick Sort).
• Stable sorting: Identical keys retain original order (crucial when sorting records with secondary keys).
• Excellent for linked lists: Can sort linked lists in O(n log n) with O(1) auxiliary space (by manipulating pointers without copying).

Disadvantages:
• Requires O(n) auxiliary memory for arrays, which may be prohibitive on constrained memory systems.
• Lower cache locality compared to in-place Quick Sort.`,
    applications: `• External sorting: Sorting massive files stored on hard drives that cannot fit into RAM simultaneously.
• Standard sorting for linked lists in databases.
• Core component of Python's Timsort algorithm.`,
    viva_questions: [
      {
        q: 'What is the recurrence relation for Merge Sort and its solution?',
        a: 'T(n) = 2T(n/2) + O(n). Solving with the Master Theorem yields T(n) = O(n log n).'
      },
      {
        q: 'Why is Merge Sort preferred for sorting Linked Lists?',
        a: 'Because merging two sorted linked lists requires only pointer adjustments without copying data into an auxiliary array, giving O(1) extra space.'
      }
    ],
    edge_cases: `• Empty array or single element (low >= high): Base case terminates recursion safely.
• Odd-sized arrays: Handled smoothly by integer division for mid.
• Already sorted array: Still performs O(n log n) comparisons; stable output preserved.`,
    diagram: `        [ 38, 27, 43, 3 ]
             /          \\
       [ 38, 27 ]     [ 43, 3 ]
        /      \\       /     \\
      [38]    [27]   [43]    [3]
        \\      /       \\     /
       [ 27, 38 ]     [ 3, 43 ]
             \\          /
        [ 3, 27, 38, 43 ]`
  },
  {
    id: 'quick_sort',
    title: 'Quick Sort (Partition-Exchange Sorting)',
    category: 'sorting',
    categoryName: 'Sorting Techniques',
    subcategory: 'quick_sort',
    subcategoryName: 'Quick Sort',
    keywords: ['quick sort', 'quicksort', 'partition exchange', 'lomuto partition', 'in place nlogn sort'],
    definition: 'Quick Sort is a highly efficient, cache-friendly in-place sorting algorithm based on the Divide-and-Conquer paradigm that chooses a pivot element, partitions the array so smaller elements lie to the left and larger to the right, and then recursively sorts the sub-partitions.',
    concept_explanation: 'Quick sort operates on partitioning. A pivot element is selected (commonly the last element in Lomuto partition). The partition algorithm iterates across the array, placing all elements smaller than the pivot into a left segment, and placing the pivot at its exact final sorted index p. Then, Quick Sort recursively sorts the left subarray arr[low..p-1] and the right subarray arr[p+1..high]. Unlike Merge Sort, no merging step is needed because the pivot is already placed at its final destination. In practice, Quick Sort is the fastest general-purpose comparison sort due to outstanding CPU cache locality.',
    algorithm: `Step 1: If low < high:
Step 2:   Partition the array: p = partition(arr, low, high).
Step 3:     Choose pivot = arr[high].
Step 4:     Set index i = low - 1.
Step 5:     For j = low to high - 1:
Step 6:       If arr[j] <= pivot:
Step 7:         Increment i, swap(arr[i], arr[j]).
Step 8:     Swap(arr[i + 1], arr[high]).
Step 9:     Return pivot index i + 1.
Step 10:  Recursively call quickSort(arr, low, p - 1).
Step 11:  Recursively call quickSort(arr, p + 1, high).`,
    pseudocode: `function quickSort(arr, low, high):
    if low < high then:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)

function partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j = low to high - 1 do:
        if arr[j] <= pivot then:
            i = i + 1
            swap(arr[i], arr[j])
    swap(arr[i + 1], arr[high])
    return i + 1`,
    c_program: `#include <stdio.h>

/**
 * Swaps two integers.
 */
void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

/**
 * Lomuto partition scheme.
 * Takes the last element as pivot and places it at its correct sorted position.
 */
int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Pivot element
    int i = (low - 1);     // Index of smaller element

    for (int j = low; j <= high - 1; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

/**
 * Recursive Quick Sort algorithm.
 */
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // pi is partitioning index, arr[pi] is now at right place
        int pi = partition(arr, low, high);

        // Separately sort elements before partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int arr[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("=== Quick Sort (Lomuto Partition) Demonstration ===\\n");
    printf("Original array: ");
    printArray(arr, n);

    quickSort(arr, 0, n - 1);

    printf("Sorted array:   ");
    printArray(arr, n);

    return 0;
}`,
    sample_input: 'Array: [10, 80, 30, 90, 40, 50, 70] (n = 7)',
    sample_output: `=== Quick Sort (Lomuto Partition) Demonstration ===
Original array: 10 80 30 90 40 50 70 
Sorted array:   10 30 40 50 70 80 90`,
    dry_run: `Partition on [10, 80, 30, 90, 40, 50, 70]:
• Pivot = 70. low = 0, high = 6. i = -1.
• j = 0: arr[0]=10 <= 70 -> i=0, swap(10, 10) -> [10, 80, 30, 90, 40, 50, 70]
• j = 1: arr[1]=80 > 70  -> No swap
• j = 2: arr[2]=30 <= 70 -> i=1, swap(80, 30) -> [10, 30, 80, 90, 40, 50, 70]
• j = 3: arr[3]=90 > 70  -> No swap
• j = 4: arr[4]=40 <= 70 -> i=2, swap(80, 40) -> [10, 30, 40, 90, 80, 50, 70]
• j = 5: arr[5]=50 <= 70 -> i=3, swap(90, 50) -> [10, 30, 40, 50, 80, 90, 70]
• End loop: swap(arr[i+1], arr[high]) -> swap(arr[4]=80, arr[6]=70)
  Result: [10, 30, 40, 50, 70, 90, 80]. Pivot 70 placed at index 4!
Left subarray: [10, 30, 40, 50], Right subarray: [90, 80].`,
    time_complexity: `• Best Case: O(n log n) — Occurs when the partition always divides the array into two equal halves. T(n) = 2T(n/2) + O(n).
• Average Case: O(n log n) — Highly consistent in practice; random inputs exhibit O(1.38 n log n).
• Worst Case: O(n^2) — Occurs when the pivot is always the smallest or largest element (e.g. sorted array with last element pivot). T(n) = T(n - 1) + O(n).`,
    space_complexity: `• Auxiliary Space: O(1) extra array memory (completely in-place).
• Stack Memory: O(log n) average recursive stack frames; O(n) worst-case.`,
    advantages_disadvantages: `Advantages:
• Fastest in practice: Extremely high CPU cache hit rates due to in-place sequential memory scanning.
• In-place: Requires zero auxiliary buffer allocations (unlike Merge Sort).
• Widely implemented: Standard algorithm behind C qsort() and C++ std::sort.

Disadvantages:
• Worst-case degradation: Can degrade to O(n^2) if pivot selection is poor on sorted/reverse data.
• Unstable: Swapping around the pivot can change relative order of identical elements.`,
    applications: `• Standard system libraries: C standard library qsort() and Unix system utilities.
• Fast in-memory sorting of primitive types (integers, floats, structs) where stability is not required.`,
    viva_questions: [
      {
        q: 'When does Quick Sort exhibit its worst-case O(n^2) performance?',
        a: 'When the chosen pivot is always the extreme element (smallest or largest), which occurs when the array is already sorted or reverse-sorted with a naive first/last element pivot.'
      },
      {
        q: 'How can the worst-case of Quick Sort be mitigated in production?',
        a: 'By using Randomized Pivot Selection or Median-of-Three pivot selection (median of first, middle, and last elements).'
      }
    ],
    edge_cases: `• Sorted input: Degrades to O(n^2) in basic Lomuto; mitigated by median-of-three.
• All elements identical: Handled safely by `<=` condition without out-of-bounds indexing.
• Two elements: Partitions cleanly into one element and pivot.`,
    diagram: `Array: [ 10 | 80 | 30 | 90 | 40 | 50 | 70 ]  (Pivot = 70)
           <= 70               > 70
[ 10, 30, 40, 50 ]  <-- [ 70 ] -->  [ 80, 90 ]
   (Left Subarray)      (Pivot)     (Right Subarray)`
  }
];
