/**
 * Data Structures Fundamentals Module
 */

module.exports = {
  title: 'Data Structures Fundamentals',
  syllabus_code: 'DS-UNIT-0',
  introduction: {
    name: 'Introduction to Data Structures',
    type: 'concept',
    definition: 'A Data Structure is a specialized format for organizing, storing, retrieving, and manipulating data in computer memory efficiently. Data structures are broadly categorized into Primitive data structures (basic atomic types like int, float, char, pointer) and Non-Primitive data structures (composite collections like Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs).',
    working_principle: 'Data structures organize primitive data elements into composite non-primitive abstractions (Arrays, Linked Lists, Stacks, Queues, Trees, Graphs) matching real-world problem domains to minimize CPU instruction cycles and RAM consumption.',
    step_by_step: '1. Problem Analysis: Identify required operations (insertion, deletion, search, traversal).\n2. Abstraction Choice: Formulate an Abstract Data Type defining logical behavior.\n3. Physical Representation: Select contiguous (array) or node-pointer (linked) memory model.\n4. Implementation: Code data layout and boundary conditions in C.\n5. Complexity Verification: Measure time and space resource scaling.',
    example: 'Primitive types (int, float, char, pointers) store single machine words. User-defined composite structures (struct Student) group multiple heterogeneous fields to model a complex real-world entity.',
    advantages: '• Reusability across software systems\n• Algorithmic efficiency and reduced execution latency\n• Modularity via encapsulation of data representation',
    disadvantages: '• Memory overhead for pointer-linked structures\n• Fixed capacity boundaries in static array allocations\n• Structural complexity in balancing trees and managing graphs',
    applications: '• Operating system process scheduling tables and page directories\n• Database indexing using B-Trees and Hash Tables\n• Compiler syntax parsing and symbol table management',
    time_complexity: '• Primitive access: O(1)\n• Array index lookup: O(1)\n• Sequential search: O(n)',
    space_complexity: 'O(n) memory allocation corresponding to the stored element count.',
    conclusion: 'Selecting the appropriate data structure is the fundamental determinant of software scalability and algorithmic runtime.',
    aim: 'Demonstrate the difference between primitive data types and user-defined composite data structures in C.',
    algorithm: '1. Declare primitive integer variable.\n2. Define composite struct Student with id, name, and gpa.\n3. Instantiate and initialize struct instance.\n4. Access and print primitive and composite fields.\n5. Return 0.',
    c_program: `#include <stdio.h>

// Demonstrating primitive vs user-defined non-primitive structure
struct Student {
    int id;
    char name[50];
    float gpa;
};

int main(void) {
    int semester = 3; // Primitive type directly supported by hardware
    struct Student s1 = {101, "Alice Smith", 3.85f}; // Non-primitive composite

    printf("=== Primitive vs Non-Primitive ===\\n");
    printf("Primitive: Semester = %d\\n", semester);
    printf("Composite Struct: ID = %d, Name = %s, GPA = %.2f\\n", s1.id, s1.name, s1.gpa);
    return 0;
}`,
    important_statements: '• struct Student defines a non-primitive composite data structure.\n• s1 groups integer, char array, and float into one contiguous stack memory record.\n• Dot operator (.) provides O(1) field access.',
    sample_input: 'None (Automated code validation)',
    expected_output: '=== Primitive vs Non-Primitive ===\nPrimitive: Semester = 3\nComposite Struct: ID = 101, Name = Alice Smith, GPA = 3.85',
    dry_run: '1. int semester allocated 4 bytes at stack offset.\n2. struct Student s1 allocated contiguous memory block.\n3. Fields initialized: s1.id = 101, s1.name = "Alice Smith", s1.gpa = 3.85.\n4. printf outputs values to stdout.',
    viva_questions: [
      { q: 'What is an Abstract Data Type (ADT)?', a: 'An ADT is a mathematical model defining WHAT operations can be performed on data without detailing HOW they are implemented in memory.' },
      { q: 'What is the difference between linear and non-linear data structures?', a: 'Linear structures (Array, Linked List, Stack, Queue) store elements sequentially in a single level. Non-linear structures (Tree, Graph) store elements hierarchically or interconnectedly.' }
    ]
  },

  linear_vs_non_linear: {
    name: 'Linear vs Non-Linear Data Structures',
    type: 'concept',
    definition: 'Linear data structures store elements sequentially where every element has a unique predecessor and successor (except the first and last). Non-linear data structures store elements hierarchically or interconnectedly with multiple relationships.',
    working_principle: 'Linear structures arrange items in a single sequential dimension traversed in a single pass. Non-linear structures organize items in multiple dimensions (parent-child or vertex-edge) requiring recursive or queue/stack traversals.',
    step_by_step: '1. Linear: Element i connects only to element i-1 and element i+1.\n2. Non-linear: Element can branch to multiple children (trees) or arbitrary neighbors (graphs).\n3. Traversal: Linear uses simple for/while loop; Non-linear uses Inorder/Preorder/Postorder or BFS/DFS.',
    example: 'Linear: int arr[4] = {10, 20, 30, 40}; Non-linear: Binary Tree root=1 with left child=2 and right child=3.',
    advantages: '• Linear: Easy to implement, sequential memory access, high cache locality\n• Non-linear: Efficient hierarchical modeling, fast search in balanced trees (O(log n))',
    disadvantages: '• Linear: Inflexible relationships, slow search (O(n)) in unsorted lists\n• Non-linear: Complex pointer manipulation, higher memory overhead per node',
    applications: '• Linear: Execution stacks, print queues, sequential lists\n• Non-linear: File system directories, DOM tree, routing graphs',
    time_complexity: '• Linear search: O(n)\n• Balanced BST search: O(log n)\n• Graph traversal: O(V + E)',
    space_complexity: 'O(n) elements storage.',
    conclusion: 'Choose linear structures for ordered collections and buffers; choose non-linear structures for hierarchical categorization and relational networks.',
    aim: 'Demonstrate traversal of a linear sequential array in C.',
    algorithm: '1. Declare integer array with 4 elements.\n2. Iterate from index 0 to 3 using a single linear loop.\n3. Print each element.\n4. Return 0.',
    c_program: `#include <stdio.h>

int main(void) {
    int linearArr[4] = {10, 20, 30, 40};
    printf("Linear Array Traversal: ");
    for (int i = 0; i < 4; i++) {
        printf("%d ", linearArr[i]);
    }
    printf("\\n");
    return 0;
}`,
    important_statements: '• int linearArr[4] allocates a contiguous 1D block of 4 integers.\n• for (int i = 0; i < 4; i++) performs a single sequential traversal in O(n) time.',
    sample_input: 'None (Direct execution)',
    expected_output: 'Linear Array Traversal: 10 20 30 40',
    dry_run: 'i=0: print 10 -> i=1: print 20 -> i=2: print 30 -> i=3: print 40 -> loop terminates.',
    comparison_table: `| Parameter | Linear Data Structures | Non-Linear Data Structures |
| :--- | :--- | :--- |
| **Organization** | Sequential (single level) | Hierarchical / Network (multi-level) |
| **Traversal** | Single linear pass can visit all elements | Requires recursive or queue/stack traversals (DFS, BFS) |
| **Examples** | Arrays, Linked Lists, Stacks, Queues | Binary Trees, BST, Heaps, Graphs |
| **Memory Allocation** | Contiguous or linear node chains | Non-contiguous node pointer branches |
| **Search Time** | O(n) (O(log n) if sorted array) | O(log n) in balanced BST, O(V+E) in Graphs |
| **Best For** | Ordered lists, buffers, undo histories | Hierarchical files, social networks, shortest paths |`,
    viva_questions: [
      { q: 'Can a tree be traversed in a single simple linear loop?', a: 'No, trees require recursive traversal (Inorder, Preorder, Postorder) or an auxiliary Queue for Level-Order traversal.' }
    ]
  },

  static_vs_dynamic_memory: {
    name: 'Static vs Dynamic Memory Allocation in C',
    type: 'concept',
    definition: 'Static memory allocation allocates fixed memory at compile time on the Stack or Data segment. Dynamic memory allocation allocates flexible memory at runtime on the Heap using malloc, calloc, realloc, and free.',
    working_principle: 'Static memory has fixed lifetime bound to variable scope and size decided before compilation. Dynamic memory allocates heap chunks at runtime whose lifetime persists until explicitly deallocated with free().',
    step_by_step: '1. Allocate: int *p = (int *)malloc(n * sizeof(int));\n2. Verify: if (p == NULL) handle allocation failure.\n3. Use: manipulate p[i] as an array.\n4. Release: free(p) to return memory to operating system.\n5. Nullify: p = NULL to avoid dangling pointer.',
    example: 'Static: int arr[100]; (fixed 400 bytes). Dynamic: int *arr = malloc(n * sizeof(int)); (exact bytes needed at runtime).',
    advantages: '• Static: Fast allocation, zero management overhead, impossible to leak\n• Dynamic: Exact size allocated, resizable with realloc, efficient RAM utilization',
    disadvantages: '• Static: Cannot change size during execution, wasted memory or buffer overflows\n• Dynamic: Risk of memory leaks, dangling pointers, heap fragmentation',
    applications: '• Static: Fixed-size lookup tables, small local buffers\n• Dynamic: Linked lists, dynamic arrays, trees, graphs, long-lived data caches',
    time_complexity: '• Static allocation: O(1) at compile-time/stack pointer adjustment\n• Dynamic malloc/free: O(1) average heap manager operations',
    space_complexity: 'O(n) auxiliary heap memory.',
    conclusion: 'Dynamic memory is indispensable for variable data workloads but requires rigorous pair programming: every malloc must have a corresponding free.',
    aim: 'Demonstrate dynamic memory allocation using malloc(), element population, traversal, and memory cleanup using free() in C.',
    algorithm: '1. Declare pointer int *arr.\n2. Allocate n integers on heap using malloc(n * sizeof(int)).\n3. Check if pointer is NULL; if so, exit with error.\n4. Populate array elements.\n5. Print array elements.\n6. Deallocate memory with free(arr) and set arr = NULL.\n7. Return 0.',
    c_program: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 4;
    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    printf("Dynamic Heap Array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr); // Prevent memory leak
    arr = NULL; // Prevent dangling pointer
    return 0;
}`,
    important_statements: '• malloc(n * sizeof(int)) requests n * 4 bytes from heap and returns void* cast to int*.\n• if (arr == NULL) guarantees safety if OS runs out of RAM.\n• free(arr) releases heap memory back to the OS memory manager.\n• arr = NULL neutralizes dangling pointer.',
    sample_input: 'None (Direct execution)',
    expected_output: 'Dynamic Heap Array: 10 20 30 40',
    dry_run: '1. malloc allocates 16 bytes on heap at address 0x1000.\n2. arr receives 0x1000. Check arr != NULL (True).\n3. Loop sets arr[0]=10, arr[1]=20, arr[2]=30, arr[3]=40.\n4. Loop prints 10 20 30 40.\n5. free(arr) releases 16 bytes; arr set to NULL.',
    comparison_table: `| Parameter | Static Memory Allocation | Dynamic Memory Allocation |
| :--- | :--- | :--- |
| **Allocation Time** | Compile time | Runtime |
| **Memory Region** | Stack Segment | Heap Segment |
| **Size Flexibility** | Fixed (cannot resize) | Resizable using realloc() |
| **Deallocation** | Automatic when variable goes out of scope | Manual using free() |
| **Memory Leaks** | Impossible | Possible if free() is omitted |
| **Example** | \`int arr[100];\` | \`int *p = (int *)malloc(n * sizeof(int));\` |`,
    viva_questions: [
      { q: 'What is a memory leak and how do you prevent it in C?', a: 'A memory leak occurs when heap memory allocated with malloc() is not released with free(). Prevent by pairing every malloc() with free() and setting pointer to NULL.' },
      { q: 'What is a dangling pointer?', a: 'A pointer pointing to a memory location that has already been deallocated by free().' }
    ]
  },

  adt: {
    name: 'Abstract Data Types (ADT)',
    type: 'concept',
    definition: 'An Abstract Data Type (ADT) is a mathematical specification of a collection of data values and the operations that can be performed on them, without specifying how the data is stored in memory or how the operations are implemented.',
    working_principle: 'ADT enforces data abstraction and encapsulation by separating the logical interface (WHAT operations can be done) from the physical implementation (HOW the data is stored in arrays or linked lists). Common examples include List ADT, Stack ADT, and Queue ADT.',
    step_by_step: '1. Logical Specification: Define data set and operation signatures (e.g., push(x), pop()).\n2. Implementation Choice: Choose array or linked list representation.\n3. Encapsulation: Restrict direct field access and manipulate state solely through defined interface functions.\n4. Memory Management: Allocate and release memory safely.',
    example: 'Stack ADT specifies: push(element), pop() -> element, peek() -> element, isEmpty() -> bool. It can be implemented physically using either a static contiguous array or dynamic heap linked nodes.',
    advantages: '• Modularity: Implementation can be swapped without affecting calling code\n• Information Hiding: Internal data representation is shielded from accidental corruption\n• Code Maintainability: Debugging is localized to interface functions',
    disadvantages: '• Function call overhead for every data access\n• Slower execution compared to raw pointer or array access in performance-critical code\n• Additional boilerplate code',
    applications: '• Standard template libraries (C++ STL, Java Collections)\n• Operating system system call interfaces\n• Database management systems and query processors',
    time_complexity: '• Interface operations: O(1) for stack/queue push/pop/peek; O(1) to O(n) for list operations.',
    space_complexity: 'O(n) storage depending on underlying container representation.',
    conclusion: 'ADTs provide the fundamental architectural boundary in software engineering, decoupling what code does from how it is physically executed.',
    aim: 'Implement a complete Stack ADT in C demonstrating clear separation of interface operations (push, pop, peek) from underlying array storage.',
    algorithm: '1. Define Stack struct containing array data and top index.\n2. Implement initStack() to set top = -1.\n3. Implement push() checking overflow top == MAX - 1.\n4. Implement pop() checking underflow top == -1.\n5. Implement peek() returning data[top].\n6. Demonstrate operations in main().',
    c_program: `#include <stdio.h>
#include <stdbool.h>

#define MAX 5

// Stack ADT Data Specification
typedef struct {
    int items[MAX];
    int top;
} StackADT;

// Stack ADT Operations (Interface)
void initStack(StackADT *s) {
    s->top = -1;
}

bool isFull(StackADT *s) {
    return s->top == MAX - 1;
}

bool isEmpty(StackADT *s) {
    return s->top == -1;
}

bool push(StackADT *s, int val) {
    if (isFull(s)) {
        printf("Stack ADT Overflow! Cannot push %d\\n", val);
        return false;
    }
    s->items[++(s->top)] = val;
    return true;
}

int pop(StackADT *s) {
    if (isEmpty(s)) {
        printf("Stack ADT Underflow! Cannot pop\\n");
        return -1;
    }
    return s->items[(s->top)--];
}

int peek(StackADT *s) {
    if (isEmpty(s)) return -1;
    return s->items[s->top];
}

int main(void) {
    StackADT s;
    initStack(&s);

    printf("=== Stack ADT Demonstration ===\\n");
    push(&s, 10);
    push(&s, 20);
    push(&s, 30);

    printf("Top element (peek): %d\\n", peek(&s));
    printf("Popped: %d\\n", pop(&s));
    printf("Popped: %d\\n", pop(&s));
    printf("Current top: %d\\n", peek(&s));
    return 0;
}`,
    important_statements: '• StackADT encapsulates items array and top index in a single user-defined type.\n• Functions push, pop, peek, isEmpty, isFull define the formal ADT interface.\n• Direct manipulation of s.top is restricted to interface functions.',
    sample_input: 'None (Automated ADT demonstration)',
    expected_output: '=== Stack ADT Demonstration ===\nTop element (peek): 30\nPopped: 30\nPopped: 20\nCurrent top: 10',
    dry_run: '1. initStack sets top = -1.\n2. push(10): top becomes 0, items[0] = 10.\n3. push(20): top becomes 1, items[1] = 20.\n4. push(30): top becomes 2, items[2] = 30.\n5. peek returns items[2] = 30.\n6. pop returns items[2] = 30 and decrements top to 1.\n7. pop returns items[1] = 20 and decrements top to 0.\n8. peek returns items[0] = 10.',
    viva_questions: [
      { q: 'What is the main advantage of an Abstract Data Type?', a: 'Encapsulation and modularity: the user only interacts with the defined interface, so the underlying storage can be altered without rewriting application logic.' },
      { q: 'Give three examples of standard Abstract Data Types.', a: 'List ADT, Stack ADT, and Queue ADT.' }
    ]
  },

  asymptotic_notations: {
    name: 'Asymptotic Notations (Big-O, Big-Omega, Big-Theta)',
    type: 'concept',
    definition: 'Asymptotic notations (Big-O, Big-Omega, Big-Theta) are formal mathematical tools used to describe algorithm resource consumption (time and space) as input size n tends to infinity, establishing Worst Case upper bounds and Best Case lower bounds.',
    working_principle: 'Asymptotic notations describe the rate of growth of execution time or memory as input size n grows large, ignoring machine-dependent constant factors and low-order terms. Big-O defines the Worst Case upper bound.',
    step_by_step: '1. Express runtime as function T(n).\n2. For Big-O: find constant c and n0 such that T(n) <= c * g(n) for all n >= n0 (Worst Case Upper bound).\n3. For Big-Omega: find constant c and n0 such that T(n) >= c * g(n) for all n >= n0 (Best Case Lower bound).\n4. For Big-Theta: find constants c1, c2 such that c1*g(n) <= T(n) <= c2*g(n) (Tight bound).',
    example: 'Linear search on n elements: Best Case is Omega(1) (key found at index 0); Worst Case is Big-O O(n) (key at end or absent); Average Case is Theta(n).',
    advantages: '• Machine-independent evaluation of algorithms\n• Predicts performance scalability for massive data sizes\n• Standardized scientific comparison across different approaches',
    disadvantages: '• Ignores constant factors which may matter for small n\n• Does not account for cache hierarchy or hardware pipelining',
    applications: '• Benchmarking competing algorithms before system implementation\n• Guaranteeing real-time system response deadlines\n• Cloud computing resource scaling and cost estimation',
    time_complexity: '• Big-O (O): Upper bound / Worst Case guarantee\n• Big Omega (Ω): Lower bound / Best Case minimum\n• Big Theta (Θ): Tight bound / exact growth rate',
    space_complexity: 'Auxiliary memory scaling as a function of input size n.',
    conclusion: 'Big-O provides the critical Worst Case engineering guarantee needed for dependable computer systems.',
    aim: 'Demonstrate asymptotic growth rate comparison in C.',
    algorithm: '1. Set input size n.\n2. Compute linear operations O(n).\n3. Compute quadratic operations O(n^2).\n4. Print operations count showing growth rate gap.\n5. Return 0.',
    c_program: `#include <stdio.h>

int main(void) {
    int n = 10;
    int linear_ops = 0;
    int quadratic_ops = 0;

    for (int i = 0; i < n; i++) linear_ops++;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            quadratic_ops++;
        }
    }

    printf("=== Asymptotic Growth Demonstration (n = %d) ===\\n", n);
    printf("Linear O(n) Operations:     %d\\n", linear_ops);
    printf("Quadratic O(n^2) Operations: %d\\n", quadratic_ops);
    return 0;
}`,
    important_statements: '• Single loop runs n times -> O(n) linear complexity.\n• Nested double loop runs n * n times -> O(n^2) quadratic complexity.',
    sample_input: 'n = 10',
    expected_output: '=== Asymptotic Growth Demonstration (n = 10) ===\nLinear O(n) Operations:     10\nQuadratic O(n^2) Operations: 100',
    dry_run: 'n=10: linear_ops = 10. quadratic_ops = 10 * 10 = 100. Gap shows exponential divergence as n grows.',
    comparison_table: `| Notation | Formal Definition | Mathematical Role | Practical Meaning |
| :--- | :--- | :--- | :--- |
| **Big-O (O)** | f(n) <= c * g(n) for all n >= n0 | **Upper Bound** | Worst Case maximum execution time |
| **Big Omega (Ω)** | f(n) >= c * g(n) for all n >= n0 | **Lower Bound** | Best-case minimum execution time |
| **Big Theta (Θ)** | c1*g(n) <= f(n) <= c2*g(n) | **Tight Bound** | Exact growth rate when bounds match |`,
    growth_hierarchy: 'O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(n^3) < O(2^n) < O(n!)',
    viva_questions: [
      { q: 'Why is Big O the industry standard for complexity analysis?', a: 'Big O guarantees an upper bound on worst-case execution time, ensuring latency deadlines are never exceeded.' },
      { q: 'What does O(1) space complexity mean?', a: 'It means the algorithm requires a constant amount of memory regardless of the input size n.' }
    ]
  }
};
