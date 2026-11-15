/**
 * Searching Algorithms Module
 */

module.exports = {
  title: 'Searching Algorithms',
  syllabus_code: 'DS-UNIT-1',
  linear_search: {
    name: 'Linear Search (Sequential Search)',
    type: 'algorithm',
    definition: 'Linear Search is a sequential algorithm that inspects every element in a list one by one until the target key is found or the end of the collection is reached.',
    working_principle: 'Linear search requires no preconditions: the array can be completely unsorted. It begins at index 0 and evaluates arr[i] == key. If matched, it returns the index. If the loop completes without a match, it returns -1.',
    step_by_step: '1. Initialize index i = 0.\n2. While i < n, check if arr[i] == key.\n3. If arr[i] matches key, return index i immediately (Search Successful).\n4. Otherwise increment i = i + 1.\n5. If loop completes without match, return -1 (Key Absent).',
    example: 'Given array [10, 25, 45, 60, 75] and key 60: compares 10!=60, 25!=60, 45!=60, 60==60 (found at index 3 after 4 comparisons).',
    advantages: '• Works on unsorted or sorted data alike\n• Simplist implementation with zero preprocessing\n• Works efficiently on linked lists and streaming data',
    disadvantages: '• Very slow for large datasets (O(n) comparisons)\n• Inefficient for repeated searches',
    applications: '• Searching small or unsorted lists\n• Searching singly linked lists where random access is impossible\n• Finding items in continuous hardware input streams',
    time_complexity: '• Best Case: O(1) (Key is at index 0)\n• Average Case: O(n) (Requires ~n/2 comparisons)\n• Worst Case: O(n) (Key at last index or absent)',
    space_complexity: 'O(1) auxiliary memory for iterative implementation; O(n) call stack for recursive.',
    conclusion: 'Linear search is ideal for small or unsorted collections where the overhead of sorting exceeds the search savings.',
    aim: 'Implement Linear Search in C to find the index of a target element in an integer array using both iterative and recursive approaches.',
    algorithm: '1. Start function linearSearch(arr, n, key).\n2. Loop i from 0 to n - 1.\n3. If arr[i] == key, return i.\n4. If loop ends without match, return -1.\n5. In main, test with sample array and print result.',
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
    important_statements: '• for (int i = 0; i < n; i++) traverses array from left to right.\n• if (arr[i] == key) performs equality check on each element.\n• return -1 indicates failure after exhaustive search.',
    sample_input: 'Array: [10, 25, 45, 60, 75], Search Key: 60',
    expected_output: 'Result: Element 60 found at index 3 (Position 4).',
    dry_run: `Target Array: [10, 25, 45, 60, 75], Search Key: 60
Pass 0: i = 0 -> arr[0] is 10. Check 10 == 60? False.
Pass 1: i = 1 -> arr[1] is 25. Check 25 == 60? False.
Pass 2: i = 2 -> arr[2] is 45. Check 45 == 60? False.
Pass 3: i = 3 -> arr[3] is 60. Check 60 == 60? TRUE!
Return index 3. Total comparisons: 4.`,
    viva_questions: [
      { q: 'What is the average number of comparisons in linear search?', a: '(n + 1) / 2 comparisons, which asymptotically evaluates to O(n).' },
      { q: 'Can linear search be used on linked lists?', a: 'Yes, linear search is the only standard searching algorithm suitable for singly linked lists.' }
    ]
  },

  binary_search: {
    name: 'Binary Search (Logarithmic Search)',
    type: 'algorithm',
    definition: 'Binary Search is an efficient divide-and-conquer search algorithm that locates a key in a sorted array by repeatedly dividing the search space in half.',
    working_principle: 'Binary search requires the array to be sorted. It compares the target key to the middle element. If equal, search terminates successfully. If key < middle, search continues in the left half; if key > middle, in the right half. Each step cuts remaining candidates by 50%.',
    step_by_step: '1. Set low = 0 and high = n - 1.\n2. While low <= high, compute overflow-safe midpoint: mid = low + (high - low) / 2.\n3. If arr[mid] == key, return mid (Match Found).\n4. If arr[mid] < key, set low = mid + 1 (Discard left half).\n5. If arr[mid] > key, set high = mid - 1 (Discard right half).\n6. If low > high, return -1 (Key not present).',
    example: 'Given sorted array [11, 22, 33, 44, 55, 66, 77] and key 55:\nPass 1: low=0, high=6, mid=3 (44 < 55) -> low=4.\nPass 2: low=4, high=6, mid=5 (66 > 55) -> high=4.\nPass 3: low=4, high=4, mid=4 (55 == 55) -> Found at index 4 in 3 comparisons!',
    advantages: '• Extremely fast logarithmic time complexity O(log n)\n• Highly efficient for large datasets (e.g. 1,000,000 items takes at most 20 comparisons)\n• Low auxiliary memory usage (O(1) iterative)',
    disadvantages: '• Array MUST be sorted in advance\n• Requires O(1) random access (cannot be applied to standard singly linked lists)\n• High sorting overhead if data changes frequently',
    applications: '• Database B-Tree and index lookups\n• System call symbol lookups and routing tables\n• Standard library functions (bsearch() in C stdlib)',
    time_complexity: '• Best Case: O(1) (Key is at mid on first check)\n• Average Case: O(log n)\n• Worst Case: O(log n)',
    space_complexity: 'O(1) auxiliary space for iterative version; O(log n) call stack for recursive.',
    conclusion: 'Binary search is the industry standard for fast searching in static or rarely modified sorted datasets.',
    aim: 'Implement Binary Search in C to find a key in a sorted array in O(log n) time using overflow-safe midpoint calculation.',
    algorithm: '1. Initialize low = 0, high = n - 1.\n2. While low <= high:\n   a. Calculate mid = low + (high - low) / 2.\n   b. If arr[mid] == key, return mid.\n   c. Else if arr[mid] < key, set low = mid + 1.\n   d. Else set high = mid - 1.\n3. Return -1 if not found.',
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
    important_statements: '• mid = low + (high - low) / 2 prevents 32-bit signed integer overflow when low + high exceeds INT_MAX.\n• low = mid + 1 discards left half when key is strictly greater.\n• high = mid - 1 discards right half when key is strictly smaller.',
    sample_input: 'Sorted Array: [11, 22, 33, 44, 55, 66, 77], Key: 55',
    expected_output: 'Result: Element 55 found at index 4 (Position 5).',
    dry_run: `Array: [11, 22, 33, 44, 55, 66, 77], Target: 55
Step 1: low=0, high=6 -> mid = 0 + (6-0)/2 = 3. arr[3]=44.
        Check 44 == 55? False. Is 44 < 55? True -> low = mid + 1 = 4.
Step 2: low=4, high=6 -> mid = 4 + (6-4)/2 = 5. arr[5]=66.
        Check 66 == 55? False. Is 66 < 55? False -> high = mid - 1 = 4.
Step 3: low=4, high=4 -> mid = 4 + (4-4)/2 = 4. arr[4]=55.
        Check 55 == 55? TRUE! Return index 4. Total comparisons: 3.`,
    viva_questions: [
      { q: 'Why do we compute mid = low + (high - low) / 2 instead of (low + high) / 2?', a: 'To prevent 32-bit signed integer overflow when low + high exceeds 2,147,483,647.' },
      { q: 'Why is binary search unsuitable for standard singly linked lists?', a: 'Linked lists do not allow O(1) random indexing; finding the middle node takes O(n), destroying the logarithmic O(log n) performance.' }
    ]
  }
};

