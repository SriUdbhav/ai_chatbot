/**
 * Complete Stacks Knowledge Module (19 Operations with Full 14-Section Schemas)
 * Covers Array-Based Stack (8 ops), Linked List Stack (7 ops), and Theory/Applications (4 ops).
 */

module.exports = [
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
  }
];
