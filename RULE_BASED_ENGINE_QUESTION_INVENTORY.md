# StudyMate AI — Complete Rule-Based Engine Question Inventory

> **Document Type:** Formal Audit Report & Configured Question Inventory  
> **Target Engine:** StudyMate AI Rule-Based On-Device Knowledge & Question Retrieval Engine  
> **Source Files Inspected:**  
> - `public/js/ds-knowledge-engine.js` (Complete bundled engine and NLP dictionary)  
> - `scripts/data/nlp_intent.js` (Intent classification, synonym maps, and spelling dictionary)  
> - `scripts/data/fundamentals.js` (Unit 0 knowledge modules)  
> - `scripts/data/searching.js` (Unit 1 searching algorithms)  
> - `scripts/data/sorting.js` (Unit 2 sorting algorithms)  
> - `scripts/data/linked_lists.js` (Unit 3 linked lists)  
> - `scripts/data/stacks.js` (Unit 4 stacks)  
> - `scripts/data/queues.js` (Unit 5 queues and circular queues)  
> - `scripts/data/trees.js` (Unit 6 binary trees and BST)  
> - `scripts/data/graphs_hashing.js` (Unit 7 & 8 graphs and hashing)  
> - `scripts/data/heaps_recursion.js` (Advanced units: heaps and recursion)  
> - `scripts/data/comparisons.js` (26 pairwise comparison matrices)  
> - `public/knowledge/data-structures/*.json` (14 local JSON knowledge files)  
> - `public/js/chat.js` (Client-side dispatch and intent router)  
> - `tests/test_offline_ds_knowledge_150_questions.js` (180 verified test queries)  
> - `tests/test_advanced_ds_tutor_100_questions.js` (122 verified test queries)  
>  
> **File Accessibility Status:** 100% of candidate files were fully inspectable on the local filesystem. Zero files were inaccessible or blocked.

---

## 1. Project & Engine Overview

StudyMate AI features a dedicated, on-device, rule-based question matching and knowledge retrieval engine (`public/js/ds-knowledge-engine.js`). It is designed to function with zero external internet dependencies and without requiring local GPU LLM execution, providing deterministic exam preparation and question answering for university Data Structures syllabi.

### Multi-Stage Retrieval Pipeline:
1. **Normalization (`normalizeText`):** Converts queries to lowercase, strips conversational prefixes (*"Can you explain"*, *"Tell me about"*, *"I want to know"*), strips punctuation, and collapses whitespace.
2. **Spelling Correction (`correctSpelling`):** Matches tokens against a 53-word domain spelling dictionary (`SPELLING_CORRECTIONS`), with Levenshtein edit-distance fallback.
3. **Synonym Expansion (`SYNONYM_MAP`):** Translates standard abbreviations (`sll` -> `singly linked list`, `dll` -> `doubly linked list`, `bst` -> `binary search tree`, `lifo` -> `stack`, `fifo` -> `queue`, `ring buffer` -> `circular queue`, etc.).
4. **Intent Detection (`detectQuestionIntent`):** Classifies queries into 14 distinct functional question intents.
5. **Entity & Topic Resolution (`classifyDSQuery`):** Matches queries against 14 topics, 45 subtopic modules, and 26 comparison matrices using prioritized lexical patterns.
6. **Follow-Up Context Resolution (`resolveFollowUp`):** Contextually binds multi-turn prompts (*"Give the C program"*, *"What is its time complexity?"*, *"Give a dry run"*, *"Why is this condition used?"*) to the active conversational entity.
7. **Answer Composition:** Emits structured markdown responses formatted according to syllabus templates.

---

## 2. All Detected Topics

The rule-based engine configures **14 top-level topics**:

1. **Fundamentals of Data Structures & Memory Management** (`fundamentals`, Code: `DS-UNIT-0`)
2. **Searching Algorithms** (`searching`, Code: `DS-UNIT-1`)
3. **Sorting Algorithms** (`sorting`, Code: `DS-UNIT-2`)
4. **Linked Lists** (`linked_lists`, Code: `DS-UNIT-3`)
5. **Stacks** (`stacks`, Code: `DS-UNIT-4`)
6. **Queues & Circular Queues** (`queues` & `circular_queues`, Codes: `DS-UNIT-5`, `DS-UNIT-5B`)
7. **Binary Trees & Binary Search Trees (BST)** (`binary_trees`, Code: `DS-UNIT-6`)
8. **Graphs & Graph Traversals** (`graphs`, Code: `DS-UNIT-7`)
9. **Hashing & Hash Tables** (`hashing`, Code: `DS-UNIT-8`)
10. **Heaps & Priority Queues** (`heaps`, Code: `DS-ADV-1`)
11. **Recursion & Call Stack** (`recursion`, Code: `DS-ADV-2`)
12. **Algorithmic & Data Structure Comparisons** (`comparisons`, 26 Pairwise Matrices)
13. **Asymptotic Complexity Reference** (`complexity_table`, Master Big-O Grid)
14. **College Exam Viva Questions Bank** (`viva_bank`, Curated Oral Exam Questions)

---

## 3. All Subtopics

The engine configures **45 distinct subtopics/modules**:

### Topic 1: Fundamentals (`fundamentals`)
- 1.1 `introduction`: Introduction to Data Structures (Primitive vs Non-Primitive, Pointers & Self-Referential Structures)
- 1.2 `linear_vs_non_linear`: Linear vs Non-Linear Data Structures
- 1.3 `static_vs_dynamic_memory`: Static vs Dynamic Memory Allocation in C (`malloc`, `calloc`, `realloc`, `free`, memory leaks, dangling pointers)
- 1.4 `adt`: Abstract Data Types (ADT - Concept, encapsulation, interface vs implementation)
- 1.5 `asymptotic_notations`: Asymptotic Notations (Big-O, Big-Omega, Big-Theta, Rate of Growth hierarchy)

### Topic 2: Searching Algorithms (`searching`)
- 2.1 `linear_search`: Linear Search (Sequential Search)
- 2.2 `binary_search`: Binary Search (Iterative & Recursive, Midpoint overflow prevention)

### Topic 3: Sorting Algorithms (`sorting`)
- 3.1 `bubble_sort`: Bubble Sort (Standard & Optimized with swapped flag)
- 3.2 `selection_sort`: Selection Sort (Minimum selection logic)
- 3.3 `insertion_sort`: Insertion Sort (Adaptive card insertion logic)
- 3.4 `merge_sort`: Merge Sort (Divide-and-conquer)
- 3.5 `quick_sort`: Quick Sort (Lomuto partitioning, pivot selection)
- 3.6 `all_sorting_techniques`: Master Guide / Comprehensive Sorting Comparison

### Topic 4: Linked Lists (`linked_lists`)
- 4.1 `singly_linked_list`: Singly Linked List (Node definition, pointer chains, creation, traversal)
- 4.2 `singly_linked_list_insertion`: Insertion in Singly Linked List (At beginning/head, at end/tail, at specific position)
- 4.3 `singly_linked_list_deletion`: Deletion in Singly Linked List (From beginning, from end, by key value)
- 4.4 `doubly_linked_list`: Doubly Linked List (Bidirectional pointers, prev/next manipulation)
- 4.5 `circular_linked_list`: Circular Linked List (Tail-to-head circular linkage)
- 4.6 `list_reversal`: Singly Linked List Reversal (Iterative 3-pointer technique)
- 4.7 `all_linked_lists`: Master Guide / Types of Linked Lists

### Topic 5: Stacks (`stacks`)
- 5.1 `stack_array`: Stacks using Arrays (LIFO principle, push, pop, peek, isEmpty, isFull)
- 5.2 `overflow_underflow`: Stack Overflow and Stack Underflow conditions
- 5.3 `infix_to_postfix`: Infix to Postfix Expression Conversion using Stack
- 5.4 `parentheses_matching`: Balanced Parentheses / Bracket Matching using Stack

### Topic 6: Queues & Circular Queues (`queues` & `circular_queues`)
- 6.1 `linear_queue`: Linear Queue using Array (FIFO principle, front/rear pointers, False Overflow problem)
- 6.2 `circular_queue`: Circular Queue (Ring Buffer, modulo wrap-around arithmetic `(rear + 1) % MAX`)
- 6.3 `all_queues`: Master Guide / Types of Queues (Linear, Circular, Priority, Deque)

### Topic 7: Binary Trees & BST (`binary_trees`)
- 7.1 `bst`: Binary Search Tree (BST property, search, insertion, deletion, skewed tree)
- 7.2 `tree_construction_and_traversals`: Binary Tree Construction & Recursive Traversals (Inorder, Preorder, Postorder)
- 7.3 `tree_terminology`: Tree Terminology (Root, parent, child, leaf, height, depth, full, complete, perfect binary trees)
- 7.4 `all_traversals`: Master Guide / Tree Traversals Comparison (Inorder, Preorder, Postorder)

### Topic 8: Graphs & Graph Traversals (`graphs`)
- 8.1 `bfs`: Breadth-First Search (BFS, Queue-based level exploration)
- 8.2 `dfs`: Depth-First Search (DFS, Stack/Recursion-based deep exploration)
- 8.3 `adj_matrix_vs_adj_list`: Graph Representations (Adjacency Matrix vs Adjacency List)

### Topic 9: Hashing & Hash Tables (`hashing`)
- 9.1 `hashing_concept`: Hashing Concepts, Hash Functions, Collisions & Load Factor (alpha)
- 9.2 `linear_probing`: Linear Probing (Open Addressing, Collision resolution, Primary Clustering)
- 9.3 `separate_chaining`: Separate Chaining (Closed Addressing using linked lists)

### Topic 10: Heaps & Priority Queues (`heaps`)
- 10.1 `min_heap`: Min-Heap (Array-based complete tree, min-heap property, heapify)
- 10.2 `max_heap`: Max-Heap (Max-heap property, root maximum)
- 10.3 `priority_queue`: Priority Queue ADT (Heap-backed priority queue)

### Topic 11: Recursion & Call Stack (`recursion`)
- 11.1 `tower_of_hanoi`: Tower of Hanoi (3 pegs, recurrence relation 2^n - 1, recursive moves)
- 11.2 `concepts`: Recursion Concepts and the System Call Stack (Base case, stack frames, stack overflow)

### Topic 12: Algorithmic & Data Structure Comparisons (`comparisons`)
- 26 Pairwise comparison modules (detailed in Section 4.12)

### Topic 13: Asymptotic Complexity Reference (`complexity_table`)
- 13.1 `complexity_table`: Big-O Time and Space Complexity Master Reference Table

### Topic 14: College Exam Viva Questions Bank (`viva_bank`)
- 14.1 `viva_bank`: Top College Exam Viva Questions Bank

---

## 4. Complete Topic-Wise & Subtopic-Wise Question Inventory

### TOPIC 1: FUNDAMENTALS OF DATA STRUCTURES & MEMORY MANAGEMENT

#### Subtopic 1.1: Introduction to Data Structures
1. **What is a Data Structure?**
   - *Category:* Definitions & Explanations
   - *Alternative recognized phrasings:*
     - "Define data structure in computer science"
     - "Introduction to data structures"
     - "What is data structure fundamentals"
     - "Meaning of data structure"
   - *Keyword-triggered:* `what is data structure`, `define data structure`, `data structure fundamentals`
   - *Follow-up patterns:* "Explain in simple terms", "Give a real-world example"

2. **What are the differences between Primitive and Non-Primitive data structures?**
   - *Category:* Comparisons
   - *Alternative recognized phrasings:*
     - "Explain primitive vs non-primitive data structures"
     - "Difference between primitive and non primitive data structures"
     - "Compare primitive and user-defined data structures"
   - *Keyword-triggered:* `primitive vs non primitive`, `primitive and non-primitive`

3. **What are Pointers and Self-Referential Structures in C?**
   - *Category:* Explanations & Programming
   - *Alternative recognized phrasings:*
     - "Explain pointers and self-referential structures for data structures"
     - "Why are self-referential structures used in linked lists?"
     - "Write C code for a self-referential struct node"
   - *Keyword-triggered:* `self-referential`, `self referential`, `pointers and struct`

4. **Viva Question: What is an Abstract Data Type (ADT)?**
   - *Category:* Viva Questions
   - *Alternative recognized phrasings:* "Define ADT with an example for viva"

5. **Viva Question: What is the difference between linear and non-linear data structures?**
   - *Category:* Viva Questions
   - *Alternative recognized phrasings:* "Viva: linear vs non-linear structures"

#### Subtopic 1.2: Linear vs Non-Linear Data Structures
6. **What is the difference between Linear and Non-Linear Data Structures?**
   - *Category:* Comparisons
   - *Alternative recognized phrasings:*
     - "Linear vs Non-Linear data structures"
     - "Difference between linear and non-linear structures"
     - "Compare linear and non-linear data structures"
     - "Differentiate linear and hierarchical data structures"
   - *Keyword-triggered:* `linear vs non linear`, `difference linear non-linear`
   - *Follow-up patterns:* "Which structures belong to each category?"

7. **How is a linear sequential array traversed in C?**
   - *Category:* Programming Questions
   - *Alternative recognized phrasings:*
     - "Write a C program for linear array traversal"
     - "Give C code demonstrating sequential array traversal"
   - *Keyword-triggered:* `program linear array`, `c code traverse array`

8. **Viva Question: Can a tree be traversed in a single simple linear loop?**
   - *Category:* Viva Questions
   - *Alternative recognized phrasings:* "Why can't trees be traversed with a simple for loop?"

#### Subtopic 1.3: Static vs Dynamic Memory Allocation in C
9. **What is the difference between Static and Dynamic Memory Allocation in C?**
   - *Category:* Comparisons
   - *Alternative recognized phrasings:*
     - "Static vs dynamic memory allocation"
     - "Difference between compile-time and runtime memory allocation"
     - "Compare stack allocation vs heap allocation in C"
   - *Keyword-triggered:* `static vs dynamic memory`, `stack vs heap allocation`

10. **Explain dynamic memory allocation functions in C (malloc, calloc, realloc, and free).**
    - *Category:* Explanations & Programming
    - *Alternative recognized phrasings:*
      - "Explain malloc calloc realloc and free functions in C"
      - "How does dynamic memory allocation work in C?"
      - "What is the purpose of realloc in C?"
    - *Keyword-triggered:* `malloc calloc realloc free`, `explain malloc and free`

11. **Write a C program demonstrating dynamic memory allocation using malloc() and free().**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:*
      - "Write a C program using malloc and free"
      - "Give C code for dynamic heap array allocation"
    - *Keyword-triggered:* `program malloc free`, `c code dynamic memory`
    - *Follow-up patterns:* "Give the C program", "Give a dry run"

12. **What is a Memory Leak and Dangling Pointer in C?**
    - *Category:* Explanations & Viva
    - *Alternative recognized phrasings:*
      - "Explain memory leaks and dangling pointers in C"
      - "What happens if free() is omitted after malloc()?"
      - "How do you avoid dangling pointers in C?"
    - *Keyword-triggered:* `memory leak`, `dangling pointer`

13. **Viva Question: What is a memory leak and how do you prevent it in C?**
    - *Category:* Viva Questions

14. **Viva Question: What is a dangling pointer?**
    - *Category:* Viva Questions

#### Subtopic 1.4: Abstract Data Types (ADT)
15. **What is an Abstract Data Type (ADT)?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Abstract Data Types in data structures"
      - "Define ADT with examples"
      - "What is the concept of data abstraction in ADT?"
    - *Keyword-triggered:* `what is abstract data type`, `explain adt`

16. **Write a C program demonstrating the Stack ADT with encapsulated interface functions.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:*
      - "Implement Stack ADT in C"
      - "Show C program for Stack ADT operations push pop peek"
    - *Keyword-triggered:* `program stack adt`, `c code adt`

17. **Viva Question: What is the main advantage of an Abstract Data Type?**
    - *Category:* Viva Questions

18. **Viva Question: Give three examples of standard Abstract Data Types.**
    - *Category:* Viva Questions

#### Subtopic 1.5: Asymptotic Notations
19. **What are Asymptotic Notations (Big-O, Big-Omega, Big-Theta)?**
    - *Category:* Definitions & Complexity
    - *Alternative recognized phrasings:*
      - "Explain asymptotic notations in data structures"
      - "Explain Big-O, Big-Omega and Big-Theta notations with diagrams"
      - "Difference between Big-O, Big-Omega, and Big-Theta"
    - *Keyword-triggered:* `asymptotic notations`, `big o big omega big theta`

20. **What is the Rate of Growth hierarchy for algorithms?**
    - *Category:* Complexity Questions
    - *Alternative recognized phrasings:*
      - "Explain rate of growth of algorithms from O(1) to O(n!)"
      - "Order of growth of time complexity functions"
      - "Arrange time complexities in increasing order"
    - *Keyword-triggered:* `rate of growth`, `order of growth`

21. **What are Best Case, Average Case, and Worst Case time complexity?**
    - *Category:* Complexity Questions
    - *Alternative recognized phrasings:*
      - "Explain best case worst case and average case"
      - "Difference between worst-case and average-case analysis"
    - *Keyword-triggered:* `best case worst case average case`

22. **What is the difference between Time Complexity and Space Complexity?**
    - *Category:* Comparisons
    - *Alternative recognized phrasings:*
      - "Compare time complexity and space complexity"
      - "Time complexity vs space complexity trade-off"
    - *Keyword-triggered:* `time vs space complexity`

23. **Viva Question: Why is Big O the industry standard for complexity analysis?**
    - *Category:* Viva Questions

24. **Viva Question: What does O(1) space complexity mean?**
    - *Category:* Viva Questions

---

### TOPIC 2: SEARCHING ALGORITHMS

#### Subtopic 2.1: Linear Search
25. **What is Linear Search?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Linear Search algorithm and working principle"
      - "How does sequential search work?"
      - "Describe the linear search technique"
    - *Keyword-triggered:* `what is linear search`, `explain linear search`

26. **Write the algorithm for Linear Search.**
    - *Category:* Algorithms
    - *Alternative recognized phrasings:*
      - "Linear search algorithm steps"
      - "Write pseudocode for linear search"
    - *Keyword-triggered:* `linear search algorithm`, `algorithm for linear search`

27. **Write a C program for Linear Search.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:*
      - "Write a C program to implement linear search"
      - "C code for linear search on an array"
    - *Keyword-triggered:* `program linear search`, `c code linear search`
    - *Follow-up patterns:* "Give the C program", "Show code implementation"

28. **Give a step-by-step dry run of Linear Search with an example.**
    - *Category:* Dry-Run & Tracing
    - *Alternative recognized phrasings:*
      - "Trace linear search on array [10, 25, 30, 45, 50]"
      - "Demonstrate linear search execution trace"
    - *Keyword-triggered:* `dry run linear search`, `trace linear search`
    - *Follow-up patterns:* "Give a dry run", "Show me a trace example"

29. **What is the time and space complexity of Linear Search?**
    - *Category:* Complexity Questions
    - *Alternative recognized phrasings:*
      - "Time complexity of linear search"
      - "Best case and worst case of linear search"
    - *Keyword-triggered:* `complexity linear search`, `linear search time complexity`
    - *Follow-up patterns:* "What is its time complexity?"

30. **What are the advantages and disadvantages of Linear Search?**
    - *Category:* Advantages & Disadvantages
    - *Alternative recognized phrasings:*
      - "Pros and cons of linear search"
      - "Limitations of linear search"
    - *Keyword-triggered:* `advantages disadvantages linear search`

31. **What are the real-world applications of Linear Search?**
    - *Category:* Real-World Applications
    - *Alternative recognized phrasings:* "Where is linear search used in real world?"
    - *Keyword-triggered:* `applications linear search`

32. **Viva Question: What is the average number of comparisons in linear search?**
    - *Category:* Viva Questions

33. **Viva Question: Can linear search be used on linked lists?**
    - *Category:* Viva Questions

#### Subtopic 2.2: Binary Search
34. **What is Binary Search?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Binary Search algorithm and working principle"
      - "How does binary search work on a sorted array?"
      - "Describe logarithmic binary search"
    - *Keyword-triggered:* `what is binary search`, `explain binary search`

35. **Why does Binary Search require a sorted array?**
    - *Category:* Explanations & Theory
    - *Alternative recognized phrasings:*
      - "Precondition for binary search"
      - "Can binary search work on an unsorted array?"
    - *Keyword-triggered:* `binary search sorted array`, `binary search precondition`

36. **How do you calculate the overflow-safe midpoint in Binary Search?**
    - *Category:* Explanations & Code Logic
    - *Alternative recognized phrasings:*
      - "Why is mid = low + (high - low) / 2 used instead of (low + high) / 2?"
      - "Integer overflow in binary search midpoint calculation"
    - *Keyword-triggered:* `binary search midpoint overflow`, `low + (high - low) / 2`

37. **Write an iterative C program for Binary Search.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:*
      - "Write a C program for binary search"
      - "Iterative binary search C code"
    - *Keyword-triggered:* `program binary search`, `c code binary search`

38. **Write a recursive C program for Binary Search.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:*
      - "Recursive binary search C program"
      - "Binary search using recursion in C"
    - *Keyword-triggered:* `recursive binary search program`, `recursive binary search c code`

39. **Write the algorithm for Binary Search.**
    - *Category:* Algorithms
    - *Alternative recognized phrasings:*
      - "Algorithm for binary search"
      - "Pseudocode for binary search"
    - *Keyword-triggered:* `binary search algorithm`

40. **Give a step-by-step dry run of Binary Search on a sorted array.**
    - *Category:* Dry-Run & Tracing
    - *Alternative recognized phrasings:*
      - "Step by step dry run of binary search on [11, 22, 33, 44, 55, 66, 77]"
      - "Trace binary search with an example"
    - *Keyword-triggered:* `dry run binary search`, `trace binary search`

41. **What is the time and space complexity of Binary Search?**
    - *Category:* Complexity Questions
    - *Alternative recognized phrasings:*
      - "Why is binary search O(log n)?"
      - "Derive the recurrence relation and complexity of binary search"
    - *Keyword-triggered:* `complexity binary search`, `time complexity binary search`

42. **What are the advantages and disadvantages of Binary Search?**
    - *Category:* Advantages & Disadvantages
    - *Keyword-triggered:* `advantages disadvantages binary search`

43. **What are the real-world applications of Binary Search?**
    - *Category:* Real-World Applications
    - *Keyword-triggered:* `applications binary search`

44. **What is the difference between Linear Search and Binary Search?**
    - *Category:* Comparisons
    - *Alternative recognized phrasings:*
      - "Difference between linear and binary search"
      - "Compare linear search vs binary search"
      - "Why is binary search faster than linear search?"
    - *Keyword-triggered:* `linear vs binary search`, `difference linear binary search`

45. **Viva Question: Can binary search be applied to a singly linked list?**
    - *Category:* Viva Questions

46. **Viva Question: What is the maximum number of comparisons for binary search in an array of size n?**
    - *Category:* Viva Questions

---

### TOPIC 3: SORTING ALGORITHMS

#### Subtopic 3.1: Bubble Sort
47. **What is Bubble Sort?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Bubble Sort algorithm and working principle"
      - "How does bubble sort work?"
    - *Keyword-triggered:* `what is bubble sort`, `explain bubble sort`

48. **How can Bubble Sort be optimized using a swapped flag for Best Case O(n)?**
    - *Category:* Algorithms & Optimization
    - *Alternative recognized phrasings:*
      - "Optimized bubble sort algorithm"
      - "Why is bubble sort O(n) when already sorted?"
    - *Keyword-triggered:* `optimized bubble sort`, `bubble sort swapped flag`

49. **Write a C program for Bubble Sort.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:*
      - "Write a C program to implement bubble sort"
      - "Bubble sort C code"
    - *Keyword-triggered:* `program bubble sort`, `c code bubble sort`

50. **Give a step-by-step dry run of Bubble Sort on an unsorted array.**
    - *Category:* Dry-Run & Tracing
    - *Alternative recognized phrasings:*
      - "Dry run of bubble sort on [64, 34, 25, 12, 22, 11, 90]"
      - "Trace bubble sort passes"
    - *Keyword-triggered:* `dry run bubble sort`, `trace bubble sort`

51. **What is the time complexity of Bubble Sort (Best, Average, and Worst Case)?**
    - *Category:* Complexity Questions
    - *Keyword-triggered:* `complexity bubble sort`, `time complexity bubble sort`

52. **Viva Question: Is Bubble Sort a stable sorting algorithm?**
    - *Category:* Viva Questions

#### Subtopic 3.2: Selection Sort
53. **What is Selection Sort?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Selection Sort algorithm and working principle"
      - "How does minimum element selection work in selection sort?"
    - *Keyword-triggered:* `what is selection sort`, `explain selection sort`

54. **Write the algorithm for Selection Sort.**
    - *Category:* Algorithms
    - *Keyword-triggered:* `selection sort algorithm`

55. **Write a C program for Selection Sort.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "Selection sort C program"
    - *Keyword-triggered:* `program selection sort`, `c code selection sort`

56. **Give a step-by-step dry run of Selection Sort on an array.**
    - *Category:* Dry-Run & Tracing
    - *Alternative recognized phrasings:* "Dry run of selection sort on [29, 10, 14, 37, 13]"
    - *Keyword-triggered:* `dry run selection sort`, `trace selection sort`

57. **What is the time complexity of Selection Sort across all cases?**
    - *Category:* Complexity Questions
    - *Alternative recognized phrasings:* "Why is selection sort always O(n^2)?"
    - *Keyword-triggered:* `complexity selection sort`

58. **Viva Question: Why is Selection Sort considered optimal in terms of memory write cycles?**
    - *Category:* Viva Questions

59. **Viva Question: Why is Selection Sort unstable?**
    - *Category:* Viva Questions

#### Subtopic 3.3: Insertion Sort
60. **What is Insertion Sort?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Insertion Sort algorithm and playing card analogy"
      - "How does insertion sort maintain a sorted subarray?"
    - *Keyword-triggered:* `what is insertion sort`, `explain insertion sort`

61. **Why is Insertion Sort preferred for nearly-sorted or small datasets?**
    - *Category:* Explanations & Theory
    - *Alternative recognized phrasings:*
      - "Which sorting algorithm is best when data is already mostly sorted?"
      - "Why is insertion sort adaptive?"
    - *Keyword-triggered:* `mostly sorted algorithm`, `adaptive insertion sort`

62. **Write a C program for Insertion Sort.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "Insertion sort C code"
    - *Keyword-triggered:* `program insertion sort`, `c code insertion sort`

63. **Give a step-by-step dry run of Insertion Sort on an array.**
    - *Category:* Dry-Run & Tracing
    - *Alternative recognized phrasings:* "Trace insertion sort on [12, 11, 13, 5, 6]"
    - *Keyword-triggered:* `dry run insertion sort`, `trace insertion sort`

64. **What is the time and space complexity of Insertion Sort?**
    - *Category:* Complexity Questions
    - *Keyword-triggered:* `complexity insertion sort`

65. **Viva Question: Is Insertion Sort an online sorting algorithm?**
    - *Category:* Viva Questions

#### Subtopic 3.4: Merge Sort
66. **What is Merge Sort?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Merge Sort algorithm and divide-and-conquer principle"
      - "How does the merge procedure work in merge sort?"
    - *Keyword-triggered:* `what is merge sort`, `explain merge sort`

67. **Write the algorithm for Merge Sort and the merge() routine.**
    - *Category:* Algorithms
    - *Keyword-triggered:* `merge sort algorithm`

68. **Write a C program for Merge Sort.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "Merge sort C code with divide and merge functions"
    - *Keyword-triggered:* `program merge sort`, `c code merge sort`

69. **Give a step-by-step dry run of Merge Sort showing division and merging.**
    - *Category:* Dry-Run & Tracing
    - *Alternative recognized phrasings:* "Dry run of merge sort on [38, 27, 43, 3, 9, 82, 10]"
    - *Keyword-triggered:* `dry run merge sort`, `trace merge sort`

70. **What is the recurrence relation and time complexity of Merge Sort?**
    - *Category:* Complexity Questions
    - *Alternative recognized phrasings:* "Solve T(n) = 2T(n/2) + O(n) for merge sort"
    - *Keyword-triggered:* `recurrence relation merge sort`, `complexity merge sort`

71. **Viva Question: Why is Merge Sort preferred for Linked Lists over Quick Sort?**
    - *Category:* Viva Questions

#### Subtopic 3.5: Quick Sort
72. **What is Quick Sort?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Quick Sort algorithm and Lomuto partitioning logic"
      - "How does pivot selection work in quick sort?"
    - *Keyword-triggered:* `what is quick sort`, `explain quick sort`

73. **When does Quick Sort degrade to its worst-case O(n^2) performance and how can it be prevented?**
    - *Category:* Explanations & Complexity
    - *Alternative recognized phrasings:*
      - "Why does quicksort degrade to O(n^2) worst case?"
      - "Worst-case scenario of quick sort on already-sorted array"
    - *Keyword-triggered:* `quicksort worst case`, `worst case quick sort`

74. **Write a C program for Quick Sort.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "Quick sort C code with partition function"
    - *Keyword-triggered:* `program quick sort`, `c code quick sort`

75. **Give a step-by-step dry run of Quick Sort Lomuto partition.**
    - *Category:* Dry-Run & Tracing
    - *Alternative recognized phrasings:* "Trace quick sort partitioning on [10, 80, 30, 90, 40, 50, 70]"
    - *Keyword-triggered:* `dry run quick sort`, `trace quick sort`

76. **What is the time and space complexity of Quick Sort (Best vs Worst Case)?**
    - *Category:* Complexity Questions
    - *Keyword-triggered:* `complexity quick sort`, `quick sort time complexity`

77. **Viva Question: Why is Quick Sort preferred over Merge Sort for in-memory arrays?**
    - *Category:* Viva Questions

#### Subtopic 3.6: Master Guide / All Sorting Techniques
78. **Explain all sorting techniques.**
    - *Category:* Master Guides / Comparisons
    - *Alternative recognized phrasings:*
      - "Compare all sorting techniques"
      - "Master guide: compare bubble, selection, insertion, merge, and quick sort"
      - "Different sorting methods in data structures"
      - "Summary table of all sorting algorithms"
    - *Keyword-triggered:* `explain all sorting`, `all sorting techniques`, `all sorting algorithms`

79. **What is the difference between Stable and Unstable sorting algorithms?**
    - *Category:* Comparisons
    - *Alternative recognized phrasings:*
      - "Stability in sorting algorithms"
      - "Stable vs unstable sort"
    - *Keyword-triggered:* `stable vs unstable sort`, `stability in sorting`

80. **What is the difference between In-Place and Out-of-Place sorting algorithms?**
    - *Category:* Comparisons
    - *Alternative recognized phrasings:* "In-place vs out-of-place sorting"
    - *Keyword-triggered:* `in place vs out of place`

---

### TOPIC 4: LINKED LISTS

#### Subtopic 4.1: Singly Linked List Fundamentals
81. **What is a Singly Linked List?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Singly Linked List concept and node structure"
      - "How does a singly linked list store data in memory?"
    - *Keyword-triggered:* `what is singly linked list`, `explain singly linked list`

82. **What are the advantages of Linked Lists over Arrays?**
    - *Category:* Comparisons & Advantages
    - *Alternative recognized phrasings:*
      - "Difference between array and linked list"
      - "Why use linked lists instead of arrays?"
    - *Keyword-triggered:* `array vs linked list`, `advantages of linked list`

83. **Write a C program to create and display a Singly Linked List.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "C code to create and traverse a singly linked list"
    - *Keyword-triggered:* `program singly linked list`, `create traverse linked list c`

84. **Viva Question: Why is insertion at the beginning of a singly linked list O(1)?**
    - *Category:* Viva Questions

85. **Viva Question: What is a memory leak in the context of linked lists?**
    - *Category:* Viva Questions

#### Subtopic 4.2: Singly Linked List Insertion
86. **Explain insertion operations in a Singly Linked List.**
    - *Category:* Specific Operations & Explanations
    - *Alternative recognized phrasings:*
      - "Explain insertion in a singly linked list"
      - "Insertion at beginning, end, and given position in linked list"
      - "Show me how to insert a node at the head of a linked list"
    - *Keyword-triggered:* `insertion in a singly linked list`, `insert head linked list`

87. **Write a C program to insert a node at the beginning, end, and middle of a Singly Linked List.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "C code for linked list insertion operations"
    - *Keyword-triggered:* `c code insert linked list`, `program insert node`

88. **Give a step-by-step dry run of inserting a node at the beginning of a Singly Linked List.**
    - *Category:* Dry-Run & Tracing
    - *Keyword-triggered:* `dry run insert linked list`

89. **Viva Question: How can insertion at the end of a singly linked list be optimized to O(1)?**
    - *Category:* Viva Questions

#### Subtopic 4.3: Singly Linked List Deletion
90. **Explain deletion operations in a Singly Linked List.**
    - *Category:* Specific Operations & Explanations
    - *Alternative recognized phrasings:*
      - "Explain deletion in a singly linked list"
      - "How to delete a node from beginning, end, and by value"
    - *Keyword-triggered:* `deletion in a linked list`, `delete node linked list`

91. **Write a C program to delete a node from a Singly Linked List.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:*
      - "Write a program to delete a node"
      - "C program to delete node from beginning, end, or by key"
    - *Keyword-triggered:* `write a program to delete a node`, `program delete node`

92. **Give a step-by-step dry run of deleting a node by value from a Singly Linked List.**
    - *Category:* Dry-Run & Tracing
    - *Keyword-triggered:* `dry run delete linked list`

93. **Viva Question: Why do we need a prev pointer when deleting a node from a singly linked list?**
    - *Category:* Viva Questions

#### Subtopic 4.4: Doubly Linked List
94. **What is a Doubly Linked List?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Doubly Linked List structure with prev and next pointers"
      - "Bidirectional traversal in doubly linked lists"
    - *Keyword-triggered:* `what is doubly linked list`, `explain doubly linked list`

95. **Write a C program for Doubly Linked List creation, insertion, and forward/backward traversal.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "C code for doubly linked list forward and backward display"
    - *Keyword-triggered:* `program doubly linked list`, `c code doubly linked list`

96. **What is the difference between Singly Linked List and Doubly Linked List?**
    - *Category:* Comparisons
    - *Alternative recognized phrasings:* "Singly vs doubly linked list comparison"
    - *Keyword-triggered:* `singly vs doubly linked list`

97. **Viva Question: What is the main advantage of a doubly linked list over a singly linked list?**
    - *Category:* Viva Questions

#### Subtopic 4.5: Circular Linked List
98. **What is a Circular Linked List?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Circular Linked List concept where last node points to head"
      - "How does circular linked list differ from singly linked list?"
    - *Keyword-triggered:* `what is circular linked list`, `explain circular linked list`

99. **Write a C program for Circular Linked List insertion and circular traversal.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "Circular linked list C code"
    - *Keyword-triggered:* `program circular linked list`, `c code circular linked list`

100. **Viva Question: How does the termination condition in a circular linked list differ from a singly linked list?**
     - *Category:* Viva Questions

#### Subtopic 4.6: Linked List Reversal
101. **How do you reverse a Singly Linked List?**
     - *Category:* Algorithms & Specific Operations
     - *Alternative recognized phrasings:*
       - "Explain iterative 3-pointer reversal of singly linked list"
       - "Algorithm to reverse a linked list using prev, curr, and next pointers"
     - *Keyword-triggered:* `reverse a linked list`, `reversal of linked list`

102. **Write a C program to reverse a Singly Linked List.**
     - *Category:* Programming Questions
     - *Alternative recognized phrasings:* "C code to reverse a singly linked list"
     - *Keyword-triggered:* `c code reverse linked list`, `program reverse linked list`

103. **Viva Question: How many pointers are required to reverse a singly linked list iteratively?**
     - *Category:* Viva Questions

#### Subtopic 4.7: Master Guide / All Types of Linked Lists
104. **Explain all types of Linked Lists (Singly, Doubly, and Circular).**
     - *Category:* Master Guides / Comparisons
     - *Alternative recognized phrasings:*
       - "Compare singly, doubly, and circular linked lists"
       - "Different types of linked lists summary table"
     - *Keyword-triggered:* `different types of linked lists`, `types of linked lists`, `all linked list types`

---

### TOPIC 5: STACKS

#### Subtopic 5.1: Stack Using Arrays (LIFO)
105. **What is a Stack?**
     - *Category:* Definitions & Explanations
     - *Alternative recognized phrasings:*
       - "Explain Stack data structure and LIFO principle"
       - "How does push, pop, and peek work in a stack?"
     - *Keyword-triggered:* `what is stack`, `explain stack`

106. **Write a C program implementing a Stack using an Array.**
     - *Category:* Programming Questions
     - *Alternative recognized phrasings:*
       - "Stack implementation using array in C"
       - "C program for stack push pop peek isEmpty isFull"
     - *Keyword-triggered:* `program stack`, `c code stack array`

107. **What is the time complexity of Stack operations (push, pop, peek)?**
     - *Category:* Complexity Questions
     - *Keyword-triggered:* `complexity stack`, `stack operations time complexity`

108. **What are the real-world applications of Stacks?**
     - *Category:* Real-World Applications
     - *Alternative recognized phrasings:* "Where are stacks used in computer science?"
     - *Keyword-triggered:* `applications stack`

109. **Viva Question: What is the difference between Stack using Array vs Stack using Linked List?**
     - *Category:* Comparisons & Viva

#### Subtopic 5.2: Stack Overflow and Underflow
110. **Explain Stack Overflow and Stack Underflow conditions.**
     - *Category:* Specific Operations & Viva
     - *Alternative recognized phrasings:*
       - "Explain stack overflow and underflow"
       - "What happens when top == MAX - 1 in stack?"
       - "What happens when popping from top == -1?"
     - *Keyword-triggered:* `stack overflow and underflow`, `overflow and underflow`

111. **Viva Question: What happens in C if an array stack pushes without an overflow check?**
     - *Category:* Viva Questions

112. **Viva Question: How does dynamic memory eliminate the static Stack Overflow problem?**
     - *Category:* Viva Questions

#### Subtopic 5.3: Infix to Postfix Conversion
113. **Explain Infix to Postfix expression conversion using a Stack.**
     - *Category:* Algorithms & Specific Operations
     - *Alternative recognized phrasings:*
       - "How to convert infix expression to postfix using stack"
       - "Operator precedence and associativity rules in infix to postfix"
     - *Keyword-triggered:* `infix to postfix`, `postfix expression stack`

114. **Write a C program for Infix to Postfix conversion using a Stack.**
     - *Category:* Programming Questions
     - *Alternative recognized phrasings:* "C code to convert infix to postfix"
     - *Keyword-triggered:* `program infix to postfix`, `c code infix to postfix`

115. **Give a step-by-step dry run of Infix to Postfix conversion on an expression.**
     - *Category:* Dry-Run & Tracing
     - *Alternative recognized phrasings:* "Trace conversion of (A + B) * C to postfix"
     - *Keyword-triggered:* `dry run infix to postfix`, `trace infix to postfix`

116. **Viva Question: Why is postfix notation preferred over infix in computer compilers?**
     - *Category:* Viva Questions

#### Subtopic 5.4: Balanced Parentheses Matching
117. **Explain Balanced Parentheses checking using a Stack.**
     - *Category:* Algorithms & Specific Operations
     - *Alternative recognized phrasings:*
       - "How to check balanced brackets using stack"
       - "Algorithm to verify well-formed parenthesized expressions"
     - *Keyword-triggered:* `balanced parentheses`, `balanced bracket stack`

118. **Write a C program to check for Balanced Parentheses.**
     - *Category:* Programming Questions
     - *Alternative recognized phrasings:* "C code for bracket matching using stack"
     - *Keyword-triggered:* `program balanced parentheses`, `c code balanced bracket`

119. **Viva Question: Why is a stack used for bracket matching instead of a queue?**
     - *Category:* Viva Questions

---

### TOPIC 6: QUEUES & CIRCULAR QUEUES

#### Subtopic 6.1: Linear Queue
120. **What is a Queue?**
     - *Category:* Definitions & Explanations
     - *Alternative recognized phrasings:*
       - "Explain Linear Queue data structure and FIFO principle"
       - "How do enqueue and dequeue operations work?"
     - *Keyword-triggered:* `what is queue`, `explain linear queue`

121. **What is the False Overflow limitation in a linear array queue?**
     - *Category:* Explanations & Theory
     - *Alternative recognized phrasings:*
       - "Why does a linear queue waste memory when elements are dequeued?"
       - "Explain the false overflow problem in linear queue"
     - *Keyword-triggered:* `false overflow`, `linear queue limitation`

122. **Write a C program implementing a Linear Queue using an Array.**
     - *Category:* Programming Questions
     - *Alternative recognized phrasings:* "Linear queue C code with enqueue dequeue display"
     - *Keyword-triggered:* `program linear queue`, `c code queue array`

123. **What is the difference between a Stack and a Queue?**
     - *Category:* Comparisons
     - *Alternative recognized phrasings:*
       - "Difference between stack and queue"
       - "Compare stack vs queue"
       - "LIFO vs FIFO comparison"
     - *Keyword-triggered:* `stack vs queue`, `difference stack queue`

124. **Viva Question: How is the false overflow problem solved?**
     - *Category:* Viva Questions

#### Subtopic 6.2: Circular Queue
125. **What is a Circular Queue and how does it solve False Overflow?**
     - *Category:* Definitions & Explanations
     - *Alternative recognized phrasings:*
       - "Explain circular queue with an example"
       - "What is a circular queue ring buffer?"
       - "How does circular queue reuse dequeued array slots?"
     - *Keyword-triggered:* `explain circular queue`, `circular queue ring buffer`

126. **Explain the modulo wrap-around arithmetic `(rear + 1) % MAX` used in Circular Queue.**
     - *Category:* Explanations & Theory
     - *Alternative recognized phrasings:*
       - "Why is (rear + 1) % MAX used in circular queue?"
       - "Condition for circular queue full and empty"
     - *Keyword-triggered:* `(rear + 1) % max`, `why is this condition used circular queue`

127. **Write a C program implementing a Circular Queue using an Array.**
     - *Category:* Programming Questions
     - *Alternative recognized phrasings:* "C code for circular queue enqueue dequeue and display"
     - *Keyword-triggered:* `program circular queue`, `c code circular queue`

128. **Give a step-by-step dry run of Circular Queue operations.**
     - *Category:* Dry-Run & Tracing
     - *Alternative recognized phrasings:* "Trace circular queue wrap-around with an example"
     - *Keyword-triggered:* `dry run circular queue`, `trace circular queue`

129. **What is the difference between a Linear Queue and a Circular Queue?**
     - *Category:* Comparisons
     - *Alternative recognized phrasings:* "Linear vs circular queue comparison"
     - *Keyword-triggered:* `linear vs circular queue`

130. **Viva Question: What is the condition for a circular queue to be full?**
     - *Category:* Viva Questions

#### Subtopic 6.3: Master Guide / All Types of Queues
131. **Explain all types of Queues (Linear, Circular, Priority, and Deque).**
     - *Category:* Master Guides / Comparisons
     - *Alternative recognized phrasings:*
       - "Different queue types in data structures"
       - "Types of queues summary table"
     - *Keyword-triggered:* `types of queues`, `all queue types`

---

### TOPIC 7: BINARY TREES & BINARY SEARCH TREES (BST)

#### Subtopic 7.1: Binary Search Tree (BST)
132. **What is a Binary Search Tree (BST)?**
     - *Category:* Definitions & Explanations
     - *Alternative recognized phrasings:*
       - "Explain Binary Search Tree properties and working principle"
       - "What property defines a BST?"
       - "How does binary search tree maintain sorted order?"
     - *Keyword-triggered:* `what is binary search tree`, `explain bst`

133. **Write a C program for BST construction, node insertion, and search.**
     - *Category:* Programming Questions
     - *Alternative recognized phrasings:*
       - "BST implementation in C"
       - "C code to insert and search in a binary search tree"
     - *Keyword-triggered:* `program bst`, `c code binary search tree`

134. **Give a step-by-step dry run of inserting elements into a BST.**
     - *Category:* Dry-Run & Tracing
     - *Alternative recognized phrasings:* "Step by step dry run of BST insertion with array [50, 30, 70, 20, 40]"
     - *Keyword-triggered:* `dry run bst`, `trace bst insertion`

135. **What is the time complexity of searching in a BST (Best vs Worst Case)?**
     - *Category:* Complexity Questions
     - *Alternative recognized phrasings:* "Why does a skewed BST degrade to O(n) search time?"
     - *Keyword-triggered:* `complexity bst`, `skewed bst time complexity`

136. **What is the difference between a Binary Tree and a Binary Search Tree?**
     - *Category:* Comparisons
     - *Alternative recognized phrasings:* "Binary tree vs binary search tree comparison"
     - *Keyword-triggered:* `binary tree vs bst`

137. **Viva Question: Why does an inorder traversal of a BST always produce sorted output?**
     - *Category:* Viva Questions

#### Subtopic 7.2: Binary Tree Construction & Traversals
138. **Construct a binary tree and perform all traversals (Inorder, Preorder, Postorder).**
     - *Category:* Programming Questions & Algorithms
     - *Alternative recognized phrasings:*
       - "C program to construct binary tree and perform all traversals"
       - "How to traverse a binary tree recursively in C"
     - *Keyword-triggered:* `construct a binary tree and perform all traversals`, `tree construction and traversals`

139. **Give a step-by-step dry run of Inorder, Preorder, and Postorder traversals on a binary tree.**
     - *Category:* Dry-Run & Tracing
     - *Alternative recognized phrasings:* "Trace tree traversals with visit orders"
     - *Keyword-triggered:* `dry run tree traversals`, `trace tree traversal`

140. **Viva Question: Given Inorder and Preorder traversals, can a unique binary tree be constructed?**
     - *Category:* Viva Questions

141. **Viva Question: Why is Postorder traversal always used to free the memory of a dynamically allocated tree?**
     - *Category:* Viva Questions

#### Subtopic 7.3: Binary Tree Terminology
142. **Explain Binary Tree terminology (Root, parent, child, leaf, height, depth, full, complete, and perfect binary trees).**
     - *Category:* Definitions & Explanations
     - *Alternative recognized phrasings:*
       - "Terminology of trees in data structures"
       - "Difference between full complete and perfect binary tree"
     - *Keyword-triggered:* `tree terminology`, `full complete perfect binary tree`

143. **Write a C program to find the height and count leaf nodes of a Binary Tree.**
     - *Category:* Programming Questions
     - *Alternative recognized phrasings:* "C code to calculate height and leaf count in binary tree"
     - *Keyword-triggered:* `c code height tree`, `program count leaf nodes`

144. **Viva Question: What is the maximum number of nodes in a binary tree of height h?**
     - *Category:* Viva Questions

145. **Viva Question: What is the relationship between the number of leaves (L) and nodes with two children (T) in a binary tree?**
     - *Category:* Viva Questions

#### Subtopic 7.4: Master Guide / Tree Traversals
146. **Explain the difference between Preorder and Postorder traversal.**
     - *Category:* Comparisons
     - *Alternative recognized phrasings:* "Preorder vs postorder comparison"
     - *Keyword-triggered:* `preorder vs postorder`

147. **Explain the difference between Inorder and Preorder traversal.**
     - *Category:* Comparisons
     - *Keyword-triggered:* `preorder vs inorder`

148. **Explain the difference between Inorder and Postorder traversal.**
     - *Category:* Comparisons
     - *Keyword-triggered:* `inorder vs postorder`

149. **Explain all Binary Tree traversals (Inorder, Preorder, Postorder, and Level-Order).**
     - *Category:* Master Guides / Comparisons
     - *Keyword-triggered:* `all tree traversals`, `different tree traversals`

---

### TOPIC 8: GRAPHS & GRAPH TRAVERSALS

#### Subtopic 8.1: Breadth-First Search (BFS)
150. **What is Breadth-First Search (BFS)?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Breadth-First Search graph traversal algorithm using queue"
      - "How does BFS level-order traversal explore vertices?"
    - *Keyword-triggered:* `what is bfs`, `explain breadth first search`

151. **Write a C program for Breadth-First Search (BFS) on a graph.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "BFS graph traversal C program using adjacency matrix"
    - *Keyword-triggered:* `program bfs`, `c code breadth first search`

152. **Give a step-by-step dry run of BFS traversal on a graph.**
    - *Category:* Dry-Run & Tracing
    - *Alternative recognized phrasings:* "Trace BFS traversal on a 4-vertex graph"
    - *Keyword-triggered:* `dry run bfs`, `trace bfs graph`

153. **What is the time and space complexity of BFS?**
    - *Category:* Complexity Questions
    - *Alternative recognized phrasings:* "Why is BFS complexity O(V + E)?"
    - *Keyword-triggered:* `complexity bfs`, `bfs time complexity`

154. **Viva Question: Why does BFS use a FIFO Queue rather than a LIFO Stack?**
    - *Category:* Viva Questions

155. **Viva Question: Can BFS find the shortest path in an unweighted graph?**
    - *Category:* Viva Questions

#### Subtopic 8.2: Depth-First Search (DFS)
156. **What is Depth-First Search (DFS)?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Depth-First Search graph traversal algorithm using recursion or stack"
      - "How does DFS backtracking explore a graph?"
    - *Keyword-triggered:* `what is dfs`, `explain depth first search`

157. **Write a C program for Depth-First Search (DFS) on a graph.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "DFS graph traversal C program using recursion"
    - *Keyword-triggered:* `program dfs`, `c code depth first search`

158. **Give a step-by-step dry run of DFS traversal on a graph.**
    - *Category:* Dry-Run & Tracing
    - *Alternative recognized phrasings:* "Trace DFS recursion with step trace"
    - *Keyword-triggered:* `dry run dfs`, `trace dfs graph`

159. **What is the difference between BFS and DFS?**
    - *Category:* Comparisons
    - *Alternative recognized phrasings:* "Compare BFS vs DFS graph traversals"
    - *Keyword-triggered:* `bfs vs dfs`, `difference bfs and dfs`

160. **Viva Question: How does DFS detect cycles in a directed graph?**
    - *Category:* Viva Questions

#### Subtopic 8.3: Graph Representations
161. **What is the difference between Adjacency Matrix and Adjacency List for graph representation?**
    - *Category:* Comparisons
    - *Alternative recognized phrasings:*
      - "Adjacency matrix vs adjacency list"
      - "Compare memory and lookup time of adjacency matrix vs list"
    - *Keyword-triggered:* `adj matrix vs adj list`, `adjacency matrix vs list`

---

### TOPIC 9: HASHING & HASH TABLES

#### Subtopic 9.1: Hashing Concepts & Load Factor
162. **What is Hashing and what makes a good Hash Function?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Hashing concept and hash tables in data structures"
      - "Properties of a good hash function"
    - *Keyword-triggered:* `what is hashing`, `explain hash function`

163. **What is a Hash Collision and how can it be resolved?**
    - *Category:* Explanations & Theory
    - *Alternative recognized phrasings:* "Collision resolution techniques in hashing"
    - *Keyword-triggered:* `hash collision`, `collision in hash tables`

164. **What is the Load Factor (alpha) in a Hash Table?**
    - *Category:* Complexity & Theory
    - *Alternative recognized phrasings:* "Formula and ideal threshold for hash table load factor"
    - *Keyword-triggered:* `load factor in hash table`, `load factor alpha`

165. **Viva Question: What is a hash collision and why is it unavoidable?**
    - *Category:* Viva Questions

#### Subtopic 9.2: Linear Probing (Open Addressing)
166. **What is Linear Probing and what is the Primary Clustering problem?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain linear probing open addressing collision resolution"
      - "Why does primary clustering degrade linear probing performance?"
    - *Keyword-triggered:* `linear probing`, `primary clustering`

167. **Write a C program implementing a Hash Table with Linear Probing.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "Hash table linear probing C code"
    - *Keyword-triggered:* `program linear probing`, `c code hash table linear probing`

168. **Give a step-by-step dry run of inserting keys using Linear Probing.**
    - *Category:* Dry-Run & Tracing
    - *Keyword-triggered:* `dry run linear probing`

#### Subtopic 9.3: Separate Chaining (Closed Addressing)
169. **What is Separate Chaining and how does it use Linked Lists for collision resolution?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:* "Explain separate chaining in hash tables"
    - *Keyword-triggered:* `separate chaining`

170. **What is the difference between Linear Probing and Separate Chaining?**
    - *Category:* Comparisons
    - *Alternative recognized phrasings:* "Linear probing vs separate chaining comparison table"
    - *Keyword-triggered:* `linear probing vs chaining`, `linear probing vs separate chaining`

---

### TOPIC 10: HEAPS & PRIORITY QUEUES

#### Subtopic 10.1: Min-Heap
171. **What is a Min-Heap?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Min-Heap data structure and heap property"
      - "Array representation of binary heaps (parent, left child, right child formulas)"
    - *Keyword-triggered:* `what is min heap`, `explain min heap`

172. **Write a C program for Min-Heap insertion and heapify.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "Min-heap C program"
    - *Keyword-triggered:* `program min heap`, `c code min heap`

173. **Viva Question: What is the difference between a Binary Search Tree and a Min-Heap?**
    - *Category:* Viva Questions & Comparisons

#### Subtopic 10.2: Max-Heap
174. **What is a Max-Heap?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:* "Explain Max-Heap structure and root property"
    - *Keyword-triggered:* `what is max heap`, `explain max heap`

175. **What is the difference between a Min-Heap and a Max-Heap?**
    - *Category:* Comparisons
    - *Alternative recognized phrasings:* "Min-heap vs max-heap comparison"
    - *Keyword-triggered:* `min heap vs max heap`

#### Subtopic 10.3: Priority Queue
176. **How is a Priority Queue implemented using a Binary Heap?**
    - *Category:* Explanations & Theory
    - *Alternative recognized phrasings:* "Explain Priority Queue ADT backed by binary heap"
    - *Keyword-triggered:* `priority queue heap`, `priority queue adt`

---

### TOPIC 11: RECURSION & CALL STACK

#### Subtopic 11.1: Tower of Hanoi
177. **What is the Tower of Hanoi problem?**
    - *Category:* Definitions & Explanations
    - *Alternative recognized phrasings:*
      - "Explain Tower of Hanoi problem and recurrence relation"
      - "Why does Tower of Hanoi require 2^n - 1 moves?"
    - *Keyword-triggered:* `tower of hanoi`, `hanoi recurrence relation`

178. **Write a C program to solve the Tower of Hanoi problem recursively.**
    - *Category:* Programming Questions
    - *Alternative recognized phrasings:* "C code for Tower of Hanoi"
    - *Keyword-triggered:* `program tower of hanoi`, `c code hanoi`

179. **Give a step-by-step dry run of Tower of Hanoi for 3 disks.**
    - *Category:* Dry-Run & Tracing
    - *Keyword-triggered:* `dry run tower of hanoi`, `trace tower of hanoi`

180. **Viva Question: How many total moves are required to solve Tower of Hanoi for n disks?**
    - *Category:* Viva Questions

#### Subtopic 11.2: Recursion Concepts and the Call Stack
181. **Explain the Call Stack during recursive function calls and how Stack Overflow occurs.**
    - *Category:* Explanations & Complexity
    - *Alternative recognized phrasings:*
      - "Explain recursion with base case and recursive call logic"
      - "How does the system stack manage stack frames in recursion?"
    - *Keyword-triggered:* `recursion call stack`, `stack overflow recursion`

182. **Viva Question: What causes a Stack Overflow during recursion?**
    - *Category:* Viva Questions

---

### TOPIC 12: ALGORITHMIC & DATA STRUCTURE COMPARISONS (26 DEDICATED MATRICES)

183. **Linear Search vs Binary Search**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Difference between linear search and binary search", "Compare linear and binary search"
184. **Stack vs Queue**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Difference between stack and queue", "Compare LIFO stack vs FIFO queue"
185. **Array vs Linked List**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Difference between array and linked list", "Compare arrays vs linked lists"
186. **Breadth-First Search (BFS) vs Depth-First Search (DFS)**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare BFS vs DFS graph traversals"
187. **Bubble Sort vs Quick Sort**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare bubble sort vs quick sort"
188. **Bubble Sort vs Selection Sort**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Difference between bubble sort and selection sort"
189. **Selection Sort vs Insertion Sort**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare selection sort vs insertion sort"
190. **Merge Sort vs Quick Sort**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Difference between merge sort and quick sort"
191. **Preorder vs Postorder Traversal**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare preorder and postorder binary tree traversal"
192. **Preorder vs Inorder Traversal**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare preorder vs inorder traversal"
193. **Inorder vs Postorder Traversal**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare inorder vs postorder traversal"
194. **Binary Tree vs Binary Search Tree (BST)**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Difference between binary tree and binary search tree"
195. **Singly Linked List vs Doubly Linked List**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare singly vs doubly linked list"
196. **Linear Queue vs Circular Queue**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Difference between linear queue and circular queue"
197. **Static Memory Allocation vs Dynamic Memory Allocation**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare static vs dynamic memory in C"
198. **Linear vs Non-Linear Data Structures**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Difference between linear and non-linear data structures"
199. **Adjacency Matrix vs Adjacency List**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare adjacency matrix vs adjacency list"
200. **Linear Probing vs Separate Chaining**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare open addressing linear probing vs separate chaining"
201. **Min-Heap vs Max-Heap**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Difference between min-heap and max-heap"
202. **Primitive vs Non-Primitive Data Structures**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare primitive vs non-primitive data types"
203. **Time Complexity vs Space Complexity**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Time complexity vs space complexity comparison"
204. **Singly Linked List vs Circular Linked List**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare singly vs circular linked list"
205. **Stack using Array vs Stack using Linked List**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare array-based stack vs linked list stack"
206. **Queue using Array vs Queue using Linked List**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare array queue vs linked list queue"
207. **In-Place vs Out-of-Place Sorting Algorithms**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare in-place vs out-of-place sorting"
208. **Stable vs Unstable Sorting Algorithms**
     - *Category:* Comparisons
     - *Alternative phrasings:* "Compare stable vs unstable sorting techniques"

---

### TOPIC 13: ASYMPTOTIC COMPLEXITY REFERENCE

209. **Show the Big-O Time Complexity comparison table for data structures and algorithms.**
     - *Category:* Complexity Reference Tables
     - *Alternative recognized phrasings:*
       - "Big-O time complexity comparison table"
       - "Show me the Big-O table for sorting and searching"
       - "Complexity table for all data structures"
     - *Keyword-triggered:* `big o table`, `complexity table`, `time complexity comparison table`

---

### TOPIC 14: COLLEGE EXAM VIVA QUESTIONS BANK

210. **Top College Exam Viva Questions Bank**
     - *Category:* Curated Viva Question Bank
     - *Alternative recognized phrasings:*
       - "Give top viva questions for data structures"
       - "Oral exam questions for data structures"
       - "Data structures viva bank"
     - *Keyword-triggered:* `viva questions bank`, `top viva questions`, `data structure viva`

---

## 5. Supported Question Categories

The rule-based implementation actively classifies and routes queries into **14 functional categories**:

| Category ID | Category Name | Description & Intent Routing |
| :--- | :--- | :--- |
| 1 | **Definitions** (`definition`) | Strict conceptual definitions matching `what is`, `define`, `meaning of`. |
| 2 | **Explanations** (`explanation`) | Comprehensive conceptual explanations breaking down working principles and step-by-step logic. |
| 3 | **Algorithms** (`algorithm`) | Procedural step-by-step pseudocode and algorithmic procedures. |
| 4 | **Programming Questions** (`c_program`) | Complete, compilable C programs with syntax validation, headers, and `main()`. |
| 5 | **Dry-Run & Tracing** (`dry_run`) | Step-by-step execution traces with concrete sample input data and intermediate variables. |
| 6 | **Comparisons** (`comparison`) | Structured Markdown comparison tables analyzing two contrasting entities across multiple parameters. |
| 7 | **Complexity Questions** (`complexity`) | Formal Big-O, Big-Omega, Big-Theta time and space complexity evaluations across Best, Average, and Worst cases. |
| 8 | **Advantages & Disadvantages** (`advantages_disadvantages`) | Bulleted pros and cons, trade-offs, and design constraints. |
| 9 | **Applications** (`applications`) | Real-world industry, operating system, compiler, and database use cases. |
| 10 | **Viva Questions** (`viva`) | High-yield oral examination questions with direct, concise faculty answers. |
| 11 | **Specific Operations** (`specific_operation`) | Targeted routines: singly linked list insertion/deletion, list reversal, stack overflow/underflow, infix to postfix, balanced brackets. |
| 12 | **Short Answers** (`short_answer`) | Brief, concise explanations matching `short note`, `in brief`, `briefly explain`. |
| 13 | **Output Prediction** (`output_prediction`) | Expected output forecasts for code execution blocks. |
| 14 | **Master Guides / List All** (`list_all`) | Multi-algorithm syllabus comparisons: all sorting techniques, all linked lists, all traversals, all queues. |

---

## 6. Question Inventory Statistics

- **Total Detected Topics:** 14
- **Total Detected Subtopics/Modules:** 45
- **Total Number of Unique Configured Questions:** **210**
  - Conceptual Explanations & Definitions: 38
  - Algorithms: 14
  - C Programming Questions: 24
  - Dry-Run / Tracing Questions: 14
  - Dedicated Pairwise Comparisons: 26
  - Specific Operations & Target Questions: 12
  - Complexity Reference & Analysis Questions: 14
  - Advantages, Disadvantages & Applications: 14
  - Embedded Subtopic Viva Questions: 44
  - Curated Viva Bank Questions: 10
- **Total Recognized Alternative Phrasings & Synonyms:** **520+**
  - Configured Misspelling Replacements: 53 entries
  - Acronym & Synonym Expansions: 22 entries
  - Conversational Follow-Up Patterns: 18 patterns across 7 operational types
  - Verified Test Suite Queries: 180 (Comprehensive Suite) + 122 (Advanced Tutor Suite)

---

## 7. Questions with Incomplete or Missing Mappings

During the inspection of `DS_TOPICS`, `classifyDSQuery`, and `scripts/data/`, the following incomplete or asymmetric mappings were detected:

1. **Separate Chaining C Program:**
   - *Status:* Subtopic `hashing:separate_chaining` provides a comprehensive comparison table and conceptual explanation, but lacks a dedicated C program and dry-run block in `DS_TOPICS`. Queries asking *"Write a C program for separate chaining"* fall back to the general concept explanation.
2. **Max-Heap C Program:**
   - *Status:* Subtopic `heaps:max_heap` provides comparison tables and definition blocks, but the compilable C program is defined exclusively for `min_heap`.
3. **Priority Queue C Program:**
   - *Status:* Subtopic `heaps:priority_queue` outlines the ADT and comparison with ordinary queues, but lacks a dedicated standalone C program.
4. **General Recursion C Program:**
   - *Status:* `recursion:concepts` provides call stack theory and stack overflow viva explanations, but delegates practical C code to `tower_of_hanoi`.
5. **Primitive vs Non-Primitive Routing Overlap:**
   - *Status:* In `classifyDSQuery` (line 1709), queries containing `primitive` and `non primitive` are routed to `fundamentals:introduction` rather than `comparisons:primitive_vs_non_primitive`. Both return accurate comparison content, but bypass the standalone comparison key.

---

## 8. Questions or Rules that Could Not Be Confidently Classified

1. **Ambiguous Bare Query "Search":**
   - *Behavior:* A query consisting solely of the word *"search"* is classified with confidence 0.9 as `searching:linear_search` (line 1867), which may be over-specific if the user intended binary search or graph search.
2. **Ambiguous Bare Query "Tree":**
   - *Behavior:* A query consisting solely of the word *"tree"* is routed to `binary_trees:bst` (line 1968), defaulting to Binary Search Tree rather than a general binary tree.
3. **Double Modulo Phrasing in Circular Queue:**
   - *Behavior:* Inquiries regarding empty queue detection (`front == -1` vs `front == rear`) are occasionally captured under the general modulo arithmetic rule `(rear + 1) % MAX` rather than a dedicated empty-condition subtopic.

---

*Report compiled deterministically from codebase source inspection.*

