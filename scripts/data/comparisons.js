/**
 * Comprehensive Comparisons Module
 * 19 Markdown Comparison Tables and Verdicts for Data Structures and Algorithms.
 */

module.exports = {
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

  bubble_vs_selection_sort: {
    title: 'Bubble Sort vs Selection Sort',
    table: `| Parameter | Bubble Sort | Selection Sort |
| :--- | :--- | :--- |
| **Core Strategy** | Repeatedly swaps adjacent elements | Finds minimum element and performs 1 swap per pass |
| **Best Case Time** | **O(n)** (with swapped flag) | **O(n^2)** (always executes n(n-1)/2 comparisons) |
| **Average Case Time** | O(n^2) | O(n^2) |
| **Worst Case Time** | O(n^2) | O(n^2) |
| **Number of Swaps** | Up to O(n^2) swaps | **At most O(n)** swaps (at most n-1 swaps) |
| **Stability** | **Stable** (preserves duplicate order) | **Unstable** (long-distance swaps disrupt order) |
| **Adaptability** | Adaptive (detects sorted array in 1 pass) | Non-adaptive (same comparisons regardless of order) |
| **Best Used When** | Array is already or nearly sorted | Memory write cycles are expensive (Flash/EEPROM) |`,
    verdict: '**Bubble Sort** is superior when the array is nearly sorted due to its O(n) adaptive best case. **Selection Sort** is superior when write operations to memory are expensive, as it guarantees at most n-1 total swaps.'
  },

  selection_vs_insertion_sort: {
    title: 'Selection Sort vs Insertion Sort',
    table: `| Parameter | Selection Sort | Insertion Sort |
| :--- | :--- | :--- |
| **Core Strategy** | Selects global minimum from unsorted part | Inserts next element into proper place in sorted part |
| **Best Case Time** | O(n^2) | **O(n)** (when already sorted) |
| **Average Case Time** | O(n^2) | O(n^2) |
| **Worst Case Time** | O(n^2) | O(n^2) (reverse sorted) |
| **Stability** | Unstable | **Stable** |
| **Number of Writes** | **At most n-1 swaps** | Up to O(n^2) element shifts |
| **Online Processing** | No (requires full array to find minimum) | **Yes** (can sort incoming data stream on the fly) |`,
    verdict: '**Insertion Sort** is generally faster in practice and adaptive, making it preferred for small or live datasets. **Selection Sort** is chosen strictly when minimizing memory writes is paramount.'
  },

  merge_vs_quick_sort: {
    title: 'Merge Sort vs Quick Sort',
    table: `| Parameter | Merge Sort | Quick Sort |
| :--- | :--- | :--- |
| **Divide Step** | Trivial (splits array at middle index) | Complex (partitions around pivot element) |
| **Combine Step** | Complex (merges two sorted arrays in O(n)) | Trivial (no merge step needed after recursion) |
| **Best Case Time** | O(n log n) | O(n log n) |
| **Average Case Time** | O(n log n) | O(n log n) |
| **Worst Case Time** | **O(n log n)** (guaranteed) | O(n^2) (bad pivot on sorted array) |
| **Auxiliary Space** | **O(n)** auxiliary array | **O(log n)** call stack |
| **Stability** | **Stable** | Unstable |
| **In-Place?** | No (for arrays) | **Yes** |
| **Best Used On** | Linked lists, external files on disk | In-memory contiguous arrays |`,
    verdict: 'Use **Quick Sort** for general in-memory array sorting due to superior cache locality and O(1) extra space. Use **Merge Sort** when stability is required, or when sorting linked lists or massive disk files.'
  },

  preorder_vs_postorder: {
    title: 'Preorder vs Postorder Traversal',
    table: `| Parameter | Preorder Traversal (NLR) | Postorder Traversal (LRN) |
| :--- | :--- | :--- |
| **Traversal Order** | **Root -> Left Subtree -> Right Subtree** | **Left Subtree -> Right Subtree -> Root** |
| **Root Processing** | Root is visited **FIRST** | Root is visited **LAST** |
| **Expression Form** | Generates **Prefix** (Polish Notation) | Generates **Postfix** (Reverse Polish Notation) |
| **Primary Application** | **Cloning / Serializing** a tree structure | **Deleting / Freeing** tree nodes safely bottom-up |
| **Mathematical Role** | Top-down evaluation and structure reproduction | Bottom-up reduction and subtree sizing |
| **Example on Tree [1 -> (L:2, R:3)]**| **1 2 3** | **2 3 1** |`,
    verdict: 'Use **Preorder** when you need to copy or serialize a tree so the root is reconstructed first. Use **Postorder** when you need to delete a tree or calculate metrics (like tree size/height) where children must be evaluated before their parent.'
  },

  preorder_vs_inorder: {
    title: 'Preorder vs Inorder Traversal',
    table: `| Parameter | Preorder Traversal (NLR) | Inorder Traversal (LNR) |
| :--- | :--- | :--- |
| **Traversal Order** | Root -> Left -> Right | Left -> Root -> Right |
| **Root Placement** | Root is visited First | Root is visited in the Middle |
| **Output on BST** | Unsorted hierarchical stream | **Strictly Ascending Sorted Order** |
| **Expression Notation** | Prefix notation | Infix mathematical notation |
| **Primary Use** | Copying trees, prefix evaluation | Extracting sorted keys from BST, flattening tree |`,
    verdict: '**Inorder** is unique for BSTs because it guarantees sorted output. **Preorder** preserves parent-first hierarchy.'
  },

  inorder_vs_postorder: {
    title: 'Inorder vs Postorder Traversal',
    table: `| Parameter | Inorder Traversal (LNR) | Postorder Traversal (LRN) |
| :--- | :--- | :--- |
| **Traversal Order** | Left -> Root -> Right | Left -> Right -> Root |
| **Root Placement** | Root is visited in the Middle | Root is visited Last |
| **Output on BST** | Ascending sorted order | Postfix evaluation order |
| **Primary Use** | Binary Search Tree sorting and verification | Freeing memory, computing subtree height/size |`,
    verdict: 'Use **Inorder** to retrieve sorted elements. Use **Postorder** for bottom-up cleanup and post-fix evaluation.'
  },

  binary_tree_vs_bst: {
    title: 'Binary Tree vs Binary Search Tree (BST)',
    table: `| Parameter | Binary Tree | Binary Search Tree (BST) |
| :--- | :--- | :--- |
| **Definition** | A tree where each node has at most 2 children | A binary tree following the binary search ordering property |
| **Ordering Property** | **No ordering rules** between parent and children | **Left < Root < Right** for all subtrees |
| **Duplicate Keys** | Can contain arbitrary duplicates | Disallows duplicates (or stores them on right) |
| **Search Time Complexity** | **O(n)** (must examine all nodes) | **O(log n)** average (O(n) if skewed) |
| **Insertion / Deletion** | Arbitrary placement: O(1) to O(n) | Value-driven placement: O(log n) average |
| **Inorder Traversal** | Arbitrary sequence | **Guaranteed Ascending Sorted Sequence** |`,
    verdict: 'A **Binary Tree** is a general hierarchical structure. A **Binary Search Tree** is an ordered search structure optimized for logarithmic lookup, insertion, and sorted retrieval.'
  },

  singly_vs_doubly_linked_list: {
    title: 'Singly Linked List vs Doubly Linked List',
    table: `| Parameter | Singly Linked List | Doubly Linked List |
| :--- | :--- | :--- |
| **Pointers per Node** | 1 pointer (\`next\`) | 2 pointers (\`prev\` and \`next\`) |
| **Traversal Direction** | Forward only (unidirectional) | Forward and Backward (bidirectional) |
| **Memory Overhead** | Low (4 or 8 bytes per node) | High (8 or 16 bytes per node) |
| **Delete Given Node Pointer**| O(n) (must traverse from head to find prev) | **O(1)** (node->prev is immediately accessible) |
| **Insert Before Given Node** | O(n) | **O(1)** |
| **Implementation Complexity** | Simple pointer assignments | Requires managing 4 pointer links per operation |`,
    verdict: 'Use **Singly Linked List** when memory is tight and unidirectional traversal is sufficient. Use **Doubly Linked List** when backward navigation or frequent middle-node deletion is required.'
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

  static_vs_dynamic_memory: {
    title: 'Static Memory Allocation vs Dynamic Memory Allocation',
    table: `| Parameter | Static Memory Allocation | Dynamic Memory Allocation |
| :--- | :--- | :--- |
| **Allocation Time** | Compile time | Runtime |
| **Memory Region** | Stack Segment / Data Segment | Heap Segment |
| **Size Flexibility** | Fixed at declaration | Resizable at runtime using realloc() |
| **Deallocation** | Automatic when scope exits | Manual using free() |
| **Memory Leaks** | Impossible | Possible if free() is omitted |
| **Allocation Speed** | Very fast (stack pointer adjustment) | Slower (heap management lookup) |
| **Example** | \`int arr[100];\` | \`int *p = malloc(n * sizeof(int));\` |`,
    verdict: 'Use **Static Allocation** for fixed known sizes. Use **Dynamic Allocation** for variable-sized data structures like linked lists, trees, and resizing buffers.'
  },

  linear_vs_non_linear: {
    title: 'Linear vs Non-Linear Data Structures',
    table: `| Parameter | Linear Data Structures | Non-Linear Data Structures |
| :--- | :--- | :--- |
| **Organization** | Sequential (single level) | Hierarchical / Network (multi-level) |
| **Traversal** | Single linear pass can visit all elements | Requires recursive or queue/stack traversals (DFS, BFS) |
| **Examples** | Arrays, Linked Lists, Stacks, Queues | Binary Trees, BST, Heaps, Graphs |
| **Memory Allocation** | Contiguous or linear node chains | Non-contiguous node pointer branches |
| **Search Time** | O(n) (O(log n) if sorted array) | O(log n) in balanced BST, O(V+E) in Graphs |
| **Best For** | Ordered lists, buffers, undo histories | Hierarchical files, social networks, shortest paths |`,
    verdict: 'Choose **Linear structures** for sequential processing and simple buffers. Choose **Non-Linear structures** for hierarchical relationships, priority queues, and complex network modeling.'
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
  },

  linear_probing_vs_chaining: {
    title: 'Linear Probing vs Separate Chaining (Collision Resolution)',
    table: `| Parameter | Linear Probing (Open Addressing) | Separate Chaining (Closed Addressing) |
| :--- | :--- | :--- |
| **Storage Mechanism** | All keys stored directly in table array | Each slot holds a linked list of colliding keys |
| **Max Capacity** | Strictly bounded by TABLE_SIZE (alpha <= 1) | Unbounded (load factor alpha can exceed 1.0) |
| **Clustering Problem** | Suffers from Primary Clustering | **Zero clustering** between distinct slots |
| **Memory Overhead** | Zero pointer overhead | 4 or 8 bytes pointer overhead per node |
| **Cache Locality** | Excellent (contiguous memory scanning) | Poor (scattered heap nodes) |
| **Deletion Mechanism** | Requires special DELETED marker | Standard linked list node deletion |`,
    verdict: 'Use **Linear Probing** when memory is tightly constrained and cache locality is paramount. Use **Separate Chaining** when table capacity is unpredictable or load factor frequently exceeds 0.7.'
  },

  min_heap_vs_max_heap: {
    title: 'Min-Heap vs Max-Heap',
    table: `| Parameter | Min-Heap | Max-Heap |
| :--- | :--- | :--- |
| **Root Element** | Always holds the **Minimum** key | Always holds the **Maximum** key |
| **Heap Invariant** | Parent Key <= Children Keys | Parent Key >= Children Keys |
| **Primary Extraction** | extractMin() in O(log n) | extractMax() in O(log n) |
| **Primary Applications** | Dijkstra algorithm, ascending HeapSort | Priority queues for emergency tasks, descending HeapSort |`,
    verdict: 'Choose **Min-Heap** when smallest items have the highest priority. Choose **Max-Heap** when largest items have the highest priority.'
  },

  primitive_vs_non_primitive: {
    title: 'Primitive vs Non-Primitive Data Structures',
    table: `| Parameter | Primitive Data Structures | Non-Primitive Data Structures |
| :--- | :--- | :--- |
| **Definition** | Basic built-in data types provided by the language | User-defined structures composed of primitives |
| **Value Storage** | Holds a single scalar value directly | Holds a collection of multiple values or objects |
| **Memory Size** | Fixed and known at compile time (e.g. 4 bytes for int) | Dynamic or composite (depends on number of elements) |
| **Operations** | Direct hardware CPU arithmetic and logical instructions | Algorithmically managed operations (insert, delete, traverse) |
| **Examples** | int, float, char, double, pointers | Arrays, Linked Lists, Stacks, Queues, Trees, Graphs |`,
    verdict: '**Primitive types** are the elemental building blocks. **Non-Primitive structures** organize primitives to solve complex domain problems.'
  },

  time_vs_space_complexity: {
    title: 'Time Complexity vs Space Complexity',
    table: `| Parameter | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **Focus** | How execution runtime scales with input size n | How auxiliary memory usage scales with input size n |
| **Metric** | Number of elemental operations (comparisons, swaps) | Maximum memory allocated (variables, call stack frames) |
| **Notations Used** | Big-O, Big-Omega, Big-Theta | Big-O, Big-Omega, Big-Theta |
| **Trade-Off** | Often reduced by using extra auxiliary storage (e.g. Hashing) | Often reduced by in-place processing at expense of time |
| **Critical Constraints** | CPU clock cycles, response latency | RAM limits, mobile embedded devices, recursion call stack |`,
    verdict: 'In modern computing, **Time Complexity** is usually prioritized, though embedded and competitive systems require balanced optimization.'
  },

  singly_vs_circular_linked_list: {
    title: 'Singly Linked List vs Circular Linked List',
    table: `| Parameter | Singly Linked List | Circular Linked List |
| :--- | :--- | :--- |
| **Last Node Pointer** | Points to **NULL** | Points back to the **Head node** |
| **Traversal Termination** | Terminates when \`curr == NULL\` | Terminates when \`curr->next == head\` |
| **Access to Head from End** | Requires O(n) traversal from start | O(1) direct link from last node |
| **Infinite Loop Risk** | Low (natural NULL sentinel) | High if termination condition is improperly coded |
| **Applications** | Standard dynamic linear lists | Round-robin CPU scheduling, repeating media playlists |`,
    verdict: 'Use **Singly Linked List** for general dynamic collections. Use **Circular Linked List** when cyclical repetition or continuous turn-taking is required.'
  },

  stack_array_vs_linked_list: {
    title: 'Stack using Array vs Stack using Linked List',
    table: `| Parameter | Stack using Array | Stack using Linked List |
| :--- | :--- | :--- |
| **Memory Allocation** | Static contiguous memory block | Dynamic scattered heap nodes |
| **Size Limit** | Fixed maximum capacity (MAX) | Virtually unbounded (limited only by heap RAM) |
| **Overflow Condition** | Occurs when \`top == MAX - 1\` | Impossible unless system runs completely out of memory |
| **Memory Overhead** | Zero pointer overhead per element | 4 or 8 bytes pointer overhead per node |
| **Operation Speed** | Very fast due to array indexing and cache locality | Slightly slower due to malloc() and pointer dereferences |`,
    verdict: 'Use **Array Stack** when upper bound is known. Use **Linked List Stack** when stack size is volatile or unknown.'
  },

  queue_array_vs_linked_list: {
    title: 'Queue using Array vs Queue using Linked List',
    table: `| Parameter | Queue using Array | Queue using Linked List |
| :--- | :--- | :--- |
| **Memory Structure** | Contiguous array (Linear or Circular) | Node chain with \`front\` and \`rear\` pointers |
| **Capacity** | Fixed bound (\`MAX\`); prone to false overflow if linear | Dynamic; grows and shrinks with demand |
| **Enqueue/Dequeue Time**| O(1) with circular index | O(1) with pointer manipulation |
| **Memory Efficiency** | Fixed allocated memory even when queue is empty | Allocates memory strictly per active element |
| **Complexity** | Requires modulo arithmetic \`(rear+1)%MAX\` | Requires pointer memory allocation and deallocation |`,
    verdict: 'Use **Circular Array Queue** for fixed buffers and high cache performance. Use **Linked List Queue** for variable unpredictable queue depths.'
  },

  in_place_vs_out_of_place: {
    title: 'In-Place vs Out-of-Place Sorting Algorithms',
    table: `| Parameter | In-Place Sorting | Out-of-Place Sorting |
| :--- | :--- | :--- |
| **Auxiliary Memory** | **O(1)** auxiliary space | **O(n)** or greater auxiliary space |
| **Element Modification** | Modifies the input array directly by swapping | Requires creating auxiliary temporary buffers |
| **Examples** | Bubble Sort, Selection Sort, Insertion Sort, Quick Sort | Merge Sort, Counting Sort, Radix Sort |
| **Memory Overhead** | Minimal; ideal for memory-constrained embedded systems | High; doubles memory requirement during execution |
| **Implementation** | Pointer / index swapping | Allocating temporary arrays and merging |`,
    verdict: 'Choose **In-Place Sorting** when memory conservation is critical. Choose **Out-of-Place Sorting** (e.g. Merge Sort) when stable O(n log n) sorting is required.'
  },

  stable_vs_unstable_sort: {
    title: 'Stable vs Unstable Sorting Algorithms',
    table: `| Parameter | Stable Sorting | Unstable Sorting |
| :--- | :--- | :--- |
| **Relative Order** | Preserves original relative order of duplicate keys | May alter the relative order of duplicate keys |
| **Equality Swapping** | Does NOT swap elements when keys are equal | May swap elements across long distances |
| **Stable Algorithms** | **Bubble Sort, Insertion Sort, Merge Sort** | **Selection Sort, Quick Sort, Heap Sort** |
| **Multi-Key Sorting** | Essential (e.g. sort by Name, then by Score) | Cannot safely sort by multiple keys sequentially |
| **Efficiency Cost** | Often requires adjacent swaps or auxiliary arrays | Often faster due to long-distance swaps |`,
    verdict: 'Use **Stable Sorting** whenever items have secondary attributes (e.g., student records with identical exam marks sorted by roll number).'
  }
};
