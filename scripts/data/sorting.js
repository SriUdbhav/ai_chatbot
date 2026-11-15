/**
 * Sorting Algorithms Module
 * Covers Bubble, Selection, Insertion, Merge, Quick Sort and All-Sorting Master Guide.
 */

module.exports = {
  title: 'Sorting Algorithms',
  syllabus_code: 'DS-UNIT-2',
  bubble_sort: {
    name: 'Bubble Sort',
    type: 'algorithm',
    definition: 'Bubble Sort is a comparison-based sorting algorithm where adjacent elements are repeatedly compared and swapped if they are in the wrong order, causing larger elements to bubble up to the end.',
    working_principle: 'In pass 0, adjacent pairs arr[j] and arr[j+1] are compared; if arr[j] > arr[j+1], they swap. The largest element bubbles up to index n-1. In pass 1, the second-largest reaches n-2. An optimized version uses a swapped boolean flag to terminate in O(n) time if no swaps occurred.',
    step_by_step: '1. Loop i from 0 to n - 2 (number of passes).\n2. Set boolean swapped = false.\n3. Loop j from 0 to n - i - 2 (unsorted portion).\n4. If arr[j] > arr[j + 1], swap them and set swapped = true.\n5. If swapped is still false after inner pass, break early (Array is sorted).\n6. Repeat until all passes complete.',
    example: 'Input: [5, 1, 4, 2, 8]\nPass 0: 5>1 swap [1,5,4,2,8] -> 5>4 swap [1,4,5,2,8] -> 5>2 swap [1,4,2,5,8] -> 5>8 no [1,4,2,5,8]\nPass 1: 1>4 no -> 4>2 swap [1,2,4,5,8] -> 4>5 no\nPass 2: 1>2 no -> 2>4 no -> No swaps! Early exit.\nResult: [1, 2, 4, 5, 8].',
    advantages: '• Extremely simple to understand and implement\n• In-place sorting with O(1) auxiliary space\n• Stable: preserves relative order of duplicate items\n• Adaptive: achieves O(n) best-case time when array is already sorted',
    disadvantages: '• Very inefficient O(n^2) average and worst-case time\n• High number of write operations due to repeated swapping',
    applications: '• Educational introduction to sorting mechanics\n• Small datasets or nearly sorted collections with few out-of-order elements',
    time_complexity: '• Best Case: O(n) (When array is already sorted and swapped flag detects no swaps)\n• Average Case: O(n^2)\n• Worst Case: O(n^2) (When array is in reverse sorted order)',
    space_complexity: 'O(1) strictly in-place auxiliary space.',
    stability: 'Stable (Adjacent elements are only swapped when strictly greater: arr[j] > arr[j+1]).',
    in_place: 'Yes (Does not require extra memory beyond a temporary swap variable).',
    conclusion: 'Bubble sort is great pedagogically and for nearly sorted data, but impractical for large datasets.',
    aim: 'Implement Bubble Sort in C with the swapped flag optimization to sort an integer array in ascending order.',
    algorithm: '1. Start bubbleSort(arr, n).\n2. For i = 0 to n - 2:\n   a. Set swapped = 0.\n   b. For j = 0 to n - i - 2:\n      i. If arr[j] > arr[j + 1], swap(arr[j], arr[j + 1]), swapped = 1.\n   c. If swapped == 0, break.\n3. Return sorted array.',
    pseudocode: `FUNCTION BubbleSort(A, n):
  FOR i = 0 TO n - 2 DO:
    swapped = FALSE
    FOR j = 0 TO n - i - 2 DO:
      IF A[j] > A[j + 1] THEN:
        SWAP(A[j], A[j + 1])
        swapped = TRUE
      END IF
    END FOR
    IF NOT swapped THEN BREAK
  END FOR
END FUNCTION`,
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
        // If no two elements were swapped in inner loop, array is sorted
        if (!swapped) break;
    }
}

int main(void) {
    int arr[] = {5, 1, 4, 2, 8};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("--- Optimized Bubble Sort in C ---\\n");
    printf("Original: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    bubbleSort(arr, n);

    printf("Sorted:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    important_statements: '• bool swapped = false initializes flag at the start of each outer pass.\n• if (arr[j] > arr[j + 1]) compares adjacent elements.\n• if (!swapped) break terminates in O(n) time if array is already sorted.',
    sample_input: 'Original Array: [5, 1, 4, 2, 8]',
    expected_output: `--- Optimized Bubble Sort in C ---
Original: 5 1 4 2 8 
Sorted:   1 2 4 5 8`,
    dry_run: `Initial: [5, 1, 4, 2, 8]
Pass 0: (5>1 swap -> [1,5,4,2,8]) -> (5>4 swap -> [1,4,5,2,8]) -> (5>2 swap -> [1,4,2,5,8]) -> (5>8 no) -> [1, 4, 2, 5, 8]
Pass 1: (1>4 no) -> (4>2 swap -> [1,2,4,5,8]) -> (4>5 no) -> [1, 2, 4, 5, 8]
Pass 2: (1>2 no) -> (2>4 no) -> No swaps occurred! Early termination triggered.
Sorted: [1, 2, 4, 5, 8] in 3 passes.`,
    viva_questions: [
      { q: 'How can bubble sort be optimized for an already-sorted array?', a: 'By using a boolean flag swapped. If an entire inner pass completes without a single swap, the array is sorted and the algorithm breaks immediately, running in O(n) time.' },
      { q: 'Is bubble sort stable?', a: 'Yes, because adjacent elements are only swapped when arr[j] > arr[j+1], preserving the relative order of duplicate values.' }
    ]
  },

  selection_sort: {
    name: 'Selection Sort',
    type: 'algorithm',
    definition: 'Selection Sort is an in-place comparison sort that divides the array into a sorted prefix and an unsorted suffix, repeatedly finding the minimum element from the unsorted suffix and swapping it with the first unsorted element.',
    working_principle: 'Selection sort maintains two subarrays: sorted (left) and unsorted (right). In each pass, it scans the unsorted subarray to find the index of the minimum element, then performs a single swap placing the minimum at the end of the sorted prefix. It always executes n*(n-1)/2 comparisons regardless of initial array order.',
    step_by_step: '1. Loop i from 0 to n - 2 (boundary of sorted prefix).\n2. Set min_idx = i.\n3. Loop j from i + 1 to n - 1 (scan unsorted suffix).\n4. If arr[j] < arr[min_idx], set min_idx = j.\n5. If min_idx != i, swap arr[i] with arr[min_idx].\n6. Repeat until whole array is sorted.',
    example: 'Input: [64, 25, 12, 22, 11]\nPass 0: Min is 11 (index 4) -> Swap with arr[0] -> [11, 25, 12, 22, 64]\nPass 1: Min is 12 (index 2) -> Swap with arr[1] -> [11, 12, 25, 22, 64]\nPass 2: Min is 22 (index 3) -> Swap with arr[2] -> [11, 12, 22, 25, 64]\nPass 3: Min is 25 (index 3) -> Already in place -> [11, 12, 22, 25, 64].',
    advantages: '• Simple logic and straightforward implementation\n• Minimal memory writes: performs at most O(n) swaps (optimal for write-costly memory like Flash/EEPROM)\n• In-place with O(1) auxiliary space',
    disadvantages: '• Fixed O(n^2) time across best, average, and worst cases\n• Non-adaptive: does not speed up on already-sorted arrays\n• Unstable by default due to long-distance swaps',
    applications: '• Embedded systems writing to Flash/EEPROM where write cycles degrade memory\n• Small arrays where simplicity is preferred over complex code',
    time_complexity: '• Best Case: O(n^2) (Still scans all remaining elements to verify minimum)\n• Average Case: O(n^2)\n• Worst Case: O(n^2)',
    space_complexity: 'O(1) strictly in-place auxiliary memory.',
    stability: 'Unstable (Long-range swap can move an equal element past an identical one, e.g. [4a, 4b, 1] -> [1, 4b, 4a]).',
    in_place: 'Yes (Sorts within original array).',
    conclusion: 'Selection sort minimizes writes (at most n-1 swaps) but suffers from quadratic O(n^2) comparisons in all cases.',
    aim: 'Implement Selection Sort in C to arrange an integer array in ascending order by repeatedly finding the minimum element.',
    algorithm: '1. Start selectionSort(arr, n).\n2. For i = 0 to n - 2:\n   a. min_idx = i.\n   b. For j = i + 1 to n - 1:\n      If arr[j] < arr[min_idx], min_idx = j.\n   c. If min_idx != i, swap(&arr[i], &arr[min_idx]).\n3. End.',
    pseudocode: `FUNCTION SelectionSort(A, n):
  FOR i = 0 TO n - 2 DO:
    min_idx = i
    FOR j = i + 1 TO n - 1 DO:
      IF A[j] < A[min_idx] THEN:
        min_idx = j
      END IF
    END FOR
    IF min_idx != i THEN:
      SWAP(A[i], A[min_idx])
    END IF
  END FOR
END FUNCTION`,
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
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        if (min_idx != i) {
            swap(&arr[i], &arr[min_idx]);
        }
    }
}

int main(void) {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("--- Selection Sort in C ---\\n");
    printf("Original: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    selectionSort(arr, n);

    printf("Sorted:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    important_statements: '• int min_idx = i tracks the index of the smallest element in unsorted subarray.\n• if (arr[j] < arr[min_idx]) finds smaller element.\n• swap(&arr[i], &arr[min_idx]) executes at most once per outer pass.',
    sample_input: 'Original Array: [64, 25, 12, 22, 11]',
    expected_output: `--- Selection Sort in C ---
Original: 64 25 12 22 11 
Sorted:   11 12 22 25 64`,
    dry_run: `Initial: [64, 25, 12, 22, 11]
Pass 0 (i=0): Minimum in [64, 25, 12, 22, 11] is 11 at index 4. Swap arr[0] and arr[4] -> [11, 25, 12, 22, 64]
Pass 1 (i=1): Minimum in [25, 12, 22, 64] is 12 at index 2. Swap arr[1] and arr[2] -> [11, 12, 25, 22, 64]
Pass 2 (i=2): Minimum in [25, 22, 64] is 22 at index 3. Swap arr[2] and arr[3] -> [11, 12, 22, 25, 64]
Pass 3 (i=3): Minimum in [25, 64] is 25 at index 3. Already at index 3 -> [11, 12, 22, 25, 64]
Sorted: [11, 12, 22, 25, 64].`,
    viva_questions: [
      { q: 'Why is selection sort considered optimal in terms of memory write cycles?', a: 'Because it performs at most O(n) total swaps (at most n-1 swaps), compared to O(n^2) swaps in bubble or insertion sort.' },
      { q: 'Why is selection sort unstable?', a: 'Because a long-distance swap can jump a minimum element across equal keys, reversing their relative initial ordering.' }
    ]
  },

  insertion_sort: {
    name: 'Insertion Sort',
    type: 'algorithm',
    definition: 'Insertion Sort is an intuitive, adaptive, in-place sorting algorithm that builds the final sorted array one element at a time by repeatedly taking the next element and inserting it into its correct position within the sorted prefix.',
    working_principle: 'Insertion sort works the way people sort playing cards in their hands. It considers arr[0] already sorted. For index i = 1 to n-1, it saves key = arr[i] and shifts all elements in arr[0..i-1] that are greater than key one position to the right, then inserts key into the vacated slot.',
    step_by_step: '1. Loop i from 1 to n - 1.\n2. Store current element in variable: key = arr[i].\n3. Initialize j = i - 1.\n4. While j >= 0 and arr[j] > key, shift arr[j] to arr[j + 1] and decrement j.\n5. Place key at arr[j + 1].\n6. Repeat until all elements are processed.',
    example: 'Input: [12, 11, 13, 5, 6]\ni=1: key=11 -> 12 shifts right -> [11, 12, 13, 5, 6]\ni=2: key=13 -> no shift -> [11, 12, 13, 5, 6]\ni=3: key=5 -> 13, 12, 11 shift right -> [5, 11, 12, 13, 6]\ni=4: key=6 -> 13, 12, 11 shift right -> [5, 6, 11, 12, 13].',
    advantages: '• Highly adaptive: O(n) time when input is already sorted or nearly sorted\n• Stable sorting algorithm\n• In-place with O(1) auxiliary space\n• Excellent for small datasets (n < 50) and online continuous streaming data',
    disadvantages: '• Quadratic O(n^2) worst and average case on randomly ordered data\n• Shifting elements is slow on large arrays compared to divide-and-conquer algorithms',
    applications: '• Sorting small datasets or subarrays in hybrid algorithms (e.g., Timsort in Python/Java, IntroSort in C++)\n• Online sorting where numbers arrive one by one in real time',
    time_complexity: '• Best Case: O(n) (When array is already sorted, while loop condition fails immediately)\n• Average Case: O(n^2)\n• Worst Case: O(n^2) (When array is in reverse sorted order)',
    space_complexity: 'O(1) strictly in-place auxiliary space.',
    stability: 'Stable (Shifting stops when arr[j] == key, preserving relative order).',
    in_place: 'Yes (Overwrites within original array).',
    conclusion: 'Insertion sort is one of the fastest algorithms in practice for small or nearly sorted collections.',
    aim: 'Implement Insertion Sort in C to sort an array by shifting elements and inserting each key into its correct sorted prefix position.',
    algorithm: '1. Start insertionSort(arr, n).\n2. For i = 1 to n - 1:\n   a. key = arr[i], j = i - 1.\n   b. While j >= 0 and arr[j] > key:\n      arr[j + 1] = arr[j], j = j - 1.\n   c. arr[j + 1] = key.\n3. End.',
    pseudocode: `FUNCTION InsertionSort(A, n):
  FOR i = 1 TO n - 1 DO:
    key = A[i]
    j = i - 1
    WHILE j >= 0 AND A[j] > key DO:
      A[j + 1] = A[j]
      j = j - 1
    END WHILE
    A[j + 1] = key
  END FOR
END FUNCTION`,
    c_program: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Shift elements of arr[0..i-1] that are greater than key
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

    printf("--- Insertion Sort in C ---\\n");
    printf("Original: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    insertionSort(arr, n);

    printf("Sorted:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    important_statements: '• int key = arr[i] captures element to be inserted into sorted prefix arr[0..i-1].\n• while (j >= 0 && arr[j] > key) shifts larger elements rightwards.\n• arr[j + 1] = key places element in its exact sorted position.',
    sample_input: 'Original Array: [12, 11, 13, 5, 6]',
    expected_output: `--- Insertion Sort in C ---
Original: 12 11 13 5 6 
Sorted:   5 6 11 12 13`,
    dry_run: `Initial: [12, 11, 13, 5, 6]
i=1: key=11, j=0. arr[0]=12 > 11 -> arr[1]=12, j=-1 -> arr[0]=11 -> [11, 12, 13, 5, 6]
i=2: key=13, j=1. arr[1]=12 <= 13 -> No shift -> arr[2]=13 -> [11, 12, 13, 5, 6]
i=3: key=5, j=2. 13>5, 12>5, 11>5 all shift right -> arr[0]=5 -> [5, 11, 12, 13, 6]
i=4: key=6, j=3. 13>6, 12>6, 11>6 shift right -> arr[1]=6 -> [5, 6, 11, 12, 13]
Sorted: [5, 6, 11, 12, 13].`,
    viva_questions: [
      { q: 'Why is insertion sort preferred for nearly-sorted data?', a: 'Because the inner while loop only executes when elements are out of order. For nearly-sorted data, it executes in nearly O(n) linear time with minimal shifts.' },
      { q: 'Is insertion sort an online sorting algorithm?', a: 'Yes, it can sort a list as it receives it one element at a time, making it suitable for live data streams.' }
    ]
  },

  merge_sort: {
    name: 'Merge Sort',
    type: 'algorithm',
    definition: 'Merge Sort is an efficient, general-purpose, comparison-based divide-and-conquer sorting algorithm that recursively divides an array into halves, sorts each half, and merges the sorted halves.',
    working_principle: 'Merge Sort breaks the array into two halves at mid = low + (high - low)/2 until subproblems reach size 1 (base case). It then uses a two-pointer merge subroutine that reads both sorted sub-arrays in linear time and outputs a merged sorted array into auxiliary memory.',
    step_by_step: '1. If low >= high, return (Base case: 0 or 1 element).\n2. Compute mid = low + (high - low) / 2.\n3. Recursively call mergeSort(arr, low, mid).\n4. Recursively call mergeSort(arr, mid + 1, high).\n5. Call merge(arr, low, mid, high) using two pointers to combine both sorted halves.\n6. Copy merged elements back into original array.',
    example: 'Input: [38, 27, 43, 3, 9, 82, 10]\nDivide: [38, 27, 43, 3] and [9, 82, 10]\nSub-divides until singletons [38], [27], [43], [3]...\nMerge [38] and [27] -> [27, 38]; Merge [43] and [3] -> [3, 43]\nMerge [27, 38] and [3, 43] -> [3, 27, 38, 43]\nFinal Merge of both halves -> [3, 9, 10, 27, 38, 43, 82].',
    advantages: '• Guaranteed O(n log n) time complexity across Best, Average, and Worst cases\n• Stable sorting: does not change relative order of identical elements\n• Optimal for sorting linked lists (requires O(1) auxiliary pointer memory on linked lists)\n• Ideal for external sorting of large datasets that exceed physical RAM',
    disadvantages: '• Requires O(n) additional auxiliary memory for temporary merge buffers\n• Not in-place on arrays\n• Higher constant factor overhead than Quick Sort for in-memory arrays',
    applications: '• External sorting of massive database records and disk files\n• Standard library sorting for linked lists (e.g. Java Collections for objects)\n• Inversion count problems in computational geometry and statistics',
    time_complexity: '• Best Case: O(n log n)\n• Average Case: O(n log n)\n• Worst Case: O(n log n) (Recurrence: T(n) = 2T(n/2) + O(n))',
    space_complexity: 'O(n) auxiliary memory for merge buffer.',
    stability: 'Stable (Left sub-array elements are chosen on equality: L[i] <= R[j]).',
    in_place: 'No for arrays (requires O(n) auxiliary storage).',
    conclusion: 'Merge sort provides predictable, guaranteed O(n log n) performance and stability, making it the choice for mission-critical and external sorting.',
    aim: 'Implement Merge Sort in C using Divide-and-Conquer to sort an array in guaranteed O(n log n) time.',
    algorithm: '1. mergeSort(arr, l, r):\n   If l < r:\n     m = l + (r - l) / 2\n     mergeSort(arr, l, m)\n     mergeSort(arr, m + 1, r)\n     merge(arr, l, m, r)\n2. merge(arr, l, m, r):\n   Create temp arrays L and R.\n   Merge L and R back into arr[l..r].',
    pseudocode: `FUNCTION MergeSort(A, l, r):
  IF l < r THEN:
    m = l + (r - l) / 2
    MergeSort(A, l, m)
    MergeSort(A, m + 1, r)
    Merge(A, l, m, r)
  END IF
END FUNCTION`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    int *L = (int *)malloc(n1 * sizeof(int));
    int *R = (int *)malloc(n2 * sizeof(int));
    if (!L || !R) {
        free(L);
        free(R);
        return;
    }

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];

    free(L);
    free(R);
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

    printf("--- Merge Sort in C ---\\n");
    printf("Original: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    mergeSort(arr, 0, n - 1);

    printf("Sorted:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    important_statements: '• int m = l + (r - l) / 2 calculates midpoint avoiding overflow.\n• mergeSort(arr, l, m) and mergeSort(arr, m + 1, r) divide problem into subproblems.\n• merge() uses two pointers to combine sorted halves in linear O(n) time.\n• free(L) and free(R) prevent memory leaks.',
    sample_input: 'Original Array: [38, 27, 43, 3, 9, 82, 10]',
    expected_output: `--- Merge Sort in C ---
Original: 38 27 43 3 9 82 10 
Sorted:   3 9 10 27 38 43 82`,
    dry_run: `Split [38, 27, 43, 3, 9, 82, 10]:
Halves: [38, 27, 43, 3] and [9, 82, 10]
Left merges: [38] & [27] -> [27, 38]; [43] & [3] -> [3, 43] -> [3, 27, 38, 43]
Right merges: [9] & [82] -> [9, 82]; [9, 82] & [10] -> [9, 10, 82]
Final Merge: [3, 27, 38, 43] + [9, 10, 82] -> [3, 9, 10, 27, 38, 43, 82].`,
    viva_questions: [
      { q: 'What is the recurrence relation for Merge Sort and its solution?', a: 'T(n) = 2T(n/2) + O(n). By Master Theorem Case 2, T(n) = O(n log n).' },
      { q: 'Why is Merge Sort preferred for Linked Lists over Quick Sort?', a: 'Because merging two sorted linked lists requires only O(1) pointer updates without allocating auxiliary arrays, eliminating the O(n) space drawback.' }
    ]
  },

  quick_sort: {
    name: 'Quick Sort',
    type: 'algorithm',
    definition: 'Quick Sort is a highly efficient divide-and-conquer algorithm that selects a pivot element and partitions the array such that elements smaller than the pivot are placed on the left, and elements greater are on the right, then recursively sorts the partitions.',
    working_principle: 'Quick Sort selects a pivot (e.g. arr[high] in Lomuto partitioning). It iterates through the array maintaining index i of the smaller elements. When arr[j] <= pivot, it increments i and swaps arr[i] with arr[j]. Finally, it places the pivot at index i+1 and recursively sorts subarrays left and right of the pivot.',
    step_by_step: '1. If low >= high, return (Base case: 0 or 1 element).\n2. Choose pivot = arr[high] and partition array using Lomuto scheme.\n3. Partition returns pivot index p: all elements in arr[low..p-1] <= pivot, all in arr[p+1..high] > pivot.\n4. Recursively call quickSort(arr, low, p - 1).\n5. Recursively call quickSort(arr, p + 1, high).\n6. Array is sorted in-place.',
    example: 'Input: [10, 80, 30, 90, 40, 50, 70]\nPivot = 70. Partition scans: 10<=70, 30<=70, 40<=70, 50<=70 placed left; 80, 90 placed right.\nPivot 70 placed at index 4 -> [10, 30, 40, 50, 70, 90, 80]\nLeft sub-array [10, 30, 40, 50] and right sub-array [90, 80] recursively sorted.\nResult: [10, 30, 40, 50, 70, 80, 90].',
    advantages: '• One of the fastest practical sorting algorithms in real-world benchmarks\n• In-place sorting with O(log n) stack memory\n• Excellent CPU cache locality due to sequential array scans\n• Standard choice in C qsort() and C++ std::sort()',
    disadvantages: '• Worst-case time is O(n^2) when poor pivots are chosen (e.g. already sorted array with last element pivot)\n• Unstable sorting algorithm\n• Recursive stack depth can reach O(n) in worst case',
    applications: '• Standard C library qsort() implementation\n• Commercial database sorting engines and operating systems\n• Graphics processing pipelines and geometric computing',
    time_complexity: '• Best Case: O(n log n) (Balanced partitions around median)\n• Average Case: O(n log n)\n• Worst Case: O(n^2) (Already sorted array with extreme pivot)',
    space_complexity: 'O(log n) auxiliary call stack space (O(n) worst case).',
    stability: 'Unstable (Long-distance swaps around pivot disrupt initial relative order of equal keys).',
    in_place: 'Yes (Permutes elements within the original array buffer).',
    conclusion: 'Quick Sort is the preeminent general-purpose sorting algorithm for arrays due to superior cache performance and minimal memory footprint.',
    aim: 'Implement Quick Sort in C using Lomuto partitioning to sort an integer array in-place.',
    algorithm: '1. partition(arr, low, high):\n   pivot = arr[high], i = low - 1\n   For j = low to high - 1:\n     If arr[j] <= pivot: i++, swap(arr[i], arr[j])\n   swap(arr[i + 1], arr[high])\n   Return i + 1\n2. quickSort(arr, low, high):\n   If low < high:\n     pi = partition(arr, low, high)\n     quickSort(arr, low, pi - 1)\n     quickSort(arr, pi + 1, high)',
    pseudocode: `FUNCTION Partition(A, low, high):
  pivot = A[high]
  i = low - 1
  FOR j = low TO high - 1 DO:
    IF A[j] <= pivot THEN:
      i = i + 1
      SWAP(A[i], A[j])
    END IF
  END FOR
  SWAP(A[i + 1], A[high])
  RETURN i + 1
END FUNCTION

FUNCTION QuickSort(A, low, high):
  IF low < high THEN:
    pi = Partition(A, low, high)
    QuickSort(A, low, pi - 1)
    QuickSort(A, pi + 1, high)
  END IF
END FUNCTION`,
    c_program: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Lomuto partitioning scheme
int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Select rightmost element as pivot
    int i = (low - 1);

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
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

    printf("--- Quick Sort (Lomuto Partition) in C ---\\n");
    printf("Original: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    quickSort(arr, 0, n - 1);

    printf("Sorted:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    important_statements: '• int pivot = arr[high] selects the rightmost element as partition benchmark.\n• if (arr[j] <= pivot) packs all smaller elements into the left region arr[low..i].\n• swap(&arr[i + 1], &arr[high]) places pivot into its permanent final sorted index.\n• quickSort() recursively sorts left and right partitions independently.',
    sample_input: 'Original Array: [10, 80, 30, 90, 40, 50, 70]',
    expected_output: `--- Quick Sort (Lomuto Partition) in C ---
Original: 10 80 30 90 40 50 70 
Sorted:   10 30 40 50 70 80 90`,
    dry_run: `Initial: [10, 80, 30, 90, 40, 50, 70], low=0, high=6, Pivot = 70
j=0: 10 <= 70 -> i=0, swap(arr[0], arr[0]) -> [10, 80, 30, 90, 40, 50, 70]
j=1: 80 > 70 -> no swap
j=2: 30 <= 70 -> i=1, swap(arr[1], arr[2]) -> [10, 30, 80, 90, 40, 50, 70]
j=3: 90 > 70 -> no swap
j=4: 40 <= 70 -> i=2, swap(arr[2], arr[4]) -> [10, 30, 40, 90, 80, 50, 70]
j=5: 50 <= 70 -> i=3, swap(arr[3], arr[5]) -> [10, 30, 40, 50, 80, 90, 70]
After loop: swap(arr[i+1=4], arr[high=6]) -> [10, 30, 40, 50, 70, 90, 80]. Pivot 70 at index 4!`,
    viva_questions: [
      { q: 'When does Quick Sort exhibit its worst-case O(n^2) performance?', a: 'When the chosen pivot is consistently the smallest or largest element, occurring on already-sorted or reverse-sorted input when choosing the first or last element as pivot.' },
      { q: 'How can the worst-case of Quick Sort be mitigated in production?', a: 'By using Randomized Pivot selection or the Median-of-Three method (median of first, middle, last elements).' }
    ]
  },

  all_sorting_techniques: {
    name: 'All Sorting Techniques (Master Guide)',
    type: 'concept',
    definition: 'Sorting is the process of arranging a collection of data items into ascending or descending order according to a predefined comparison relationship. The core 5 sorting techniques taught in Data Structures are Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.',
    working_principle: 'Sorting algorithms use different computational paradigms:\n1. Comparison & Swapping (Bubble Sort)\n2. Selection & Minimum Extraction (Selection Sort)\n3. Incremental Insertion (Insertion Sort)\n4. Divide & Conquer with Linear Merge (Merge Sort)\n5. Divide & Conquer with Pivot Partitioning (Quick Sort)',
    overview: `The 5 foundational sorting algorithms taught in computer science represent different trade-offs across runtime complexity, auxiliary space, stability, and implementation overhead:

1. **Bubble Sort**: Compares adjacent pairs and swaps them if out of order; largest element bubbles to the end in each pass. Optimized with a swapped flag for O(n) best-case.
2. **Selection Sort**: Repeatedly scans the unsorted subarray to find the minimum element, performing at most O(n) total swaps into the sorted prefix.
3. **Insertion Sort**: Inserts each new key into its proper position within the sorted prefix by shifting larger elements; adaptive and runs in O(n) on nearly-sorted data.
4. **Merge Sort**: Divide-and-conquer algorithm that recursively splits arrays into halves and merges them in linear time. Guarantees O(n log n) in all cases, stable, but requires O(n) auxiliary memory.
5. **Quick Sort**: Divide-and-conquer algorithm that partitions elements around a pivot; fast cache-friendly in-place sorting with O(n log n) average time.`,
    comparison_table: `| Algorithm | Best Time | Average Time | Worst Time | Space | Stability | In-Place? | Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | **O(n)** | O(n^2) | O(n^2) | **O(1)** | **Stable** | **Yes** | Adjacent swaps with swapped flag |
| **Selection Sort** | O(n^2) | O(n^2) | O(n^2) | **O(1)** | Unstable | **Yes** | Minimum element selection (min writes) |
| **Insertion Sort** | **O(n)** | O(n^2) | O(n^2) | **O(1)** | **Stable** | **Yes** | Shift and insert into sorted prefix |
| **Merge Sort** | **O(n log n)** | **O(n log n)** | **O(n log n)** | O(n) | **Stable** | No | Divide & conquer, 2-way merge |
| **Quick Sort** | **O(n log n)** | **O(n log n)** | O(n^2) | **O(log n)** | Unstable | **Yes** | Divide & conquer, Lomuto partition |`,
    verdict: `### 🎯 Exam Selection Guide:
• Use **Quick Sort** for general-purpose in-memory array sorting where average speed and low auxiliary space matter most.
• Use **Merge Sort** whenever **stability** is mandatory, or when sorting linked lists or massive files on disk (external sort).
• Use **Insertion Sort** for small arrays (n < 50) or live data streams that are nearly sorted.
• Use **Selection Sort** when write cycles are expensive (Flash/EEPROM memory) because it guarantees at most n-1 swaps.
• Use **Bubble Sort** primarily for educational understanding of sorting mechanics.`
  }
};

