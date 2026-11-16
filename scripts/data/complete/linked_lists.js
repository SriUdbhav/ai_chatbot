module.exports = [
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
    ],
    "definition": "Singly Linked List creation involves defining a self-referential structure in C containing a data field and a next pointer, followed by dynamic heap memory allocation using malloc() to instantiate the head node.",
    "concept_explanation": "This menu-driven program implements Singly Linked List creation, insertion at end, deletion at beginning, and display traversal through an interactive menu. It specifically focuses on these four fundamental operations (it does not implement insertion at arbitrary intermediate positions or deletion of arbitrary middle nodes in this specific program).",
    "algorithm": "Step 1: Define structure Node with int data and struct Node* next.\nStep 2: Declare head pointer initialized to NULL (struct Node* head = NULL).\nStep 3: Allocate memory for a new node using malloc(sizeof(struct Node)).\nStep 4: Check if allocation was successful (newNode != NULL).\nStep 5: Assign newNode->data = value and newNode->next = NULL.\nStep 6: Set head = newNode.",
    "pseudocode": "struct Node:\n    data: Integer\n    next: Pointer to Node\n\nfunction createNode(val):\n    newNode = allocate(Node)\n    if newNode == NULL then error(\"Out of Memory\")\n    newNode.data = val\n    newNode.next = NULL\n    return newNode",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\n// Self-referential structure definition for a singly linked list node\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\n// Global head pointer pointing to the first node of the list\nstruct Node *head = NULL;\n\n/**\n * 1. Insert at End (Append / Create)\n * Traverses to the last node and attaches the newly created node.\n * If the list is empty, assigns newNode as the head.\n */\nvoid insertAtEnd(int val) {\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) {\n        printf(\"Memory allocation failed!\\n\");\n        return;\n    }\n    newNode->data = val;\n    newNode->next = NULL;\n\n    if (head == NULL) {\n        head = newNode;\n        printf(\"Node with value %d created as head of list.\\n\", val);\n        return;\n    }\n\n    struct Node *temp = head;\n    while (temp->next != NULL) {\n        temp = temp->next;\n    }\n    temp->next = newNode;\n    printf(\"Node with value %d inserted at end.\\n\", val);\n}\n\n/**\n * 2. Delete from Beginning\n * Deletes the current head node in O(1) time and updates head to the next node.\n */\nvoid deleteAtBeginning(void) {\n    if (head == NULL) {\n        printf(\"Underflow! List is empty. Nothing to delete.\\n\");\n        return;\n    }\n    struct Node *temp = head;\n    printf(\"Node with value %d deleted from beginning.\\n\", temp->data);\n    head = head->next;\n    free(temp);\n}\n\n/**\n * 3. Display Linked List\n * Traverses from head to NULL and prints each element.\n */\nvoid displayList(void) {\n    if (head == NULL) {\n        printf(\"List is empty: NULL\\n\");\n        return;\n    }\n    struct Node *temp = head;\n    printf(\"Linked List: \");\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    printf(\"====================================================\\n\");\n    printf(\"   Menu-Driven Singly Linked List Demonstration     \\n\");\n    printf(\"   Operations: Create, Insert at End,               \\n\");\n    printf(\"               Delete at Beginning, Display         \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    // Demonstrating Creation and Insertion at End\n    printf(\"--- 1. Creating List & Inserting Elements at End ---\\n\");\n    insertAtEnd(10);\n    insertAtEnd(20);\n    insertAtEnd(30);\n    insertAtEnd(40);\n    displayList();\n    printf(\"\\n\");\n\n    // Demonstrating Deletion from Beginning\n    printf(\"--- 2. Deleting Elements from Beginning ---\\n\");\n    deleteAtBeginning();\n    displayList();\n\n    deleteAtBeginning();\n    displayList();\n    printf(\"\\n\");\n\n    // Inserting another element at end\n    printf(\"--- 3. Inserting New Element at End ---\\n\");\n    insertAtEnd(50);\n    displayList();\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "Values: 10, 20, 30",
    "sample_output": "====================================================\n   Menu-Driven Singly Linked List Demonstration     \n   Operations: Create, Insert at End,               \n               Delete at Beginning, Display         \n====================================================\n\n--- 1. Creating List & Inserting Elements at End ---\nNode with value 10 created as head of list.\nNode with value 20 inserted at end.\nNode with value 30 inserted at end.\nNode with value 40 inserted at end.\nLinked List: 10 -> 20 -> 30 -> 40 -> NULL\n\n--- 2. Deleting Elements from Beginning ---\nNode with value 10 deleted from beginning.\nLinked List: 20 -> 30 -> 40 -> NULL\nNode with value 20 deleted from beginning.\nLinked List: 30 -> 40 -> NULL\n\n--- 3. Inserting New Element at End ---\nNode with value 50 inserted at end.\nLinked List: 30 -> 40 -> 50 -> NULL",
    "dry_run": "Menu-Driven Singly Linked List Execution Trace:\n1. insertAtEnd(10): List empty -> head points to [10 | NULL].\n2. insertAtEnd(20): Traverse to 10 -> [10]->next = [20 | NULL]. List: 10 -> 20 -> NULL.\n3. insertAtEnd(30): Traverse to 20 -> [20]->next = [30 | NULL]. List: 10 -> 20 -> 30 -> NULL.\n4. insertAtEnd(40): Traverse to 30 -> [30]->next = [40 | NULL]. List: 10 -> 20 -> 30 -> 40 -> NULL.\n5. deleteAtBeginning(): temp = head (10), head advances to [20], free(temp). List: 20 -> 30 -> 40 -> NULL.\n6. deleteAtBeginning(): temp = head (20), head advances to [30], free(temp). List: 30 -> 40 -> NULL.\n7. insertAtEnd(50): Traverse to 40 -> [40]->next = [50 | NULL]. List: 30 -> 40 -> 50 -> NULL.",
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
    ],
    "definition": "Insertion at the end of a singly linked list traverses to the last node whose next pointer is NULL, and attaches a newly created node to it.",
    "concept_explanation": "This menu-driven program implements Singly Linked List creation, insertion at end, deletion at beginning, and display traversal through an interactive menu. It specifically focuses on these four fundamental operations (it does not implement insertion at arbitrary intermediate positions or deletion of arbitrary middle nodes in this specific program).",
    "algorithm": "Step 1: Allocate newNode with value and newNode->next = NULL.\nStep 2: If head is NULL, set head = newNode and return.\nStep 3: Initialize temp = head.\nStep 4: Traverse while temp->next != NULL: temp = temp->next.\nStep 5: Set temp->next = newNode.",
    "pseudocode": "function insertAtEnd(head, value):\n    newNode = allocate(Node)\n    newNode.data = value\n    newNode.next = NULL\n    if head == NULL then:\n        return newNode\n    temp = head\n    while temp.next != NULL do:\n        temp = temp.next\n    temp.next = newNode\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\n// Self-referential structure definition for a singly linked list node\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\n// Global head pointer pointing to the first node of the list\nstruct Node *head = NULL;\n\n/**\n * 1. Insert at End (Append / Create)\n * Traverses to the last node and attaches the newly created node.\n * If the list is empty, assigns newNode as the head.\n */\nvoid insertAtEnd(int val) {\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) {\n        printf(\"Memory allocation failed!\\n\");\n        return;\n    }\n    newNode->data = val;\n    newNode->next = NULL;\n\n    if (head == NULL) {\n        head = newNode;\n        printf(\"Node with value %d created as head of list.\\n\", val);\n        return;\n    }\n\n    struct Node *temp = head;\n    while (temp->next != NULL) {\n        temp = temp->next;\n    }\n    temp->next = newNode;\n    printf(\"Node with value %d inserted at end.\\n\", val);\n}\n\n/**\n * 2. Delete from Beginning\n * Deletes the current head node in O(1) time and updates head to the next node.\n */\nvoid deleteAtBeginning(void) {\n    if (head == NULL) {\n        printf(\"Underflow! List is empty. Nothing to delete.\\n\");\n        return;\n    }\n    struct Node *temp = head;\n    printf(\"Node with value %d deleted from beginning.\\n\", temp->data);\n    head = head->next;\n    free(temp);\n}\n\n/**\n * 3. Display Linked List\n * Traverses from head to NULL and prints each element.\n */\nvoid displayList(void) {\n    if (head == NULL) {\n        printf(\"List is empty: NULL\\n\");\n        return;\n    }\n    struct Node *temp = head;\n    printf(\"Linked List: \");\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    printf(\"====================================================\\n\");\n    printf(\"   Menu-Driven Singly Linked List Demonstration     \\n\");\n    printf(\"   Operations: Create, Insert at End,               \\n\");\n    printf(\"               Delete at Beginning, Display         \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    // Demonstrating Creation and Insertion at End\n    printf(\"--- 1. Creating List & Inserting Elements at End ---\\n\");\n    insertAtEnd(10);\n    insertAtEnd(20);\n    insertAtEnd(30);\n    insertAtEnd(40);\n    displayList();\n    printf(\"\\n\");\n\n    // Demonstrating Deletion from Beginning\n    printf(\"--- 2. Deleting Elements from Beginning ---\\n\");\n    deleteAtBeginning();\n    displayList();\n\n    deleteAtBeginning();\n    displayList();\n    printf(\"\\n\");\n\n    // Inserting another element at end\n    printf(\"--- 3. Inserting New Element at End ---\\n\");\n    insertAtEnd(50);\n    displayList();\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "Append: 10, 20, 30",
    "sample_output": "====================================================\n   Menu-Driven Singly Linked List Demonstration     \n   Operations: Create, Insert at End,               \n               Delete at Beginning, Display         \n====================================================\n\n--- 1. Creating List & Inserting Elements at End ---\nNode with value 10 created as head of list.\nNode with value 20 inserted at end.\nNode with value 30 inserted at end.\nNode with value 40 inserted at end.\nLinked List: 10 -> 20 -> 30 -> 40 -> NULL\n\n--- 2. Deleting Elements from Beginning ---\nNode with value 10 deleted from beginning.\nLinked List: 20 -> 30 -> 40 -> NULL\nNode with value 20 deleted from beginning.\nLinked List: 30 -> 40 -> NULL\n\n--- 3. Inserting New Element at End ---\nNode with value 50 inserted at end.\nLinked List: 30 -> 40 -> 50 -> NULL",
    "dry_run": "Menu-Driven Singly Linked List Execution Trace:\n1. insertAtEnd(10): List empty -> head points to [10 | NULL].\n2. insertAtEnd(20): Traverse to 10 -> [10]->next = [20 | NULL]. List: 10 -> 20 -> NULL.\n3. insertAtEnd(30): Traverse to 20 -> [20]->next = [30 | NULL]. List: 10 -> 20 -> 30 -> NULL.\n4. insertAtEnd(40): Traverse to 30 -> [30]->next = [40 | NULL]. List: 10 -> 20 -> 30 -> 40 -> NULL.\n5. deleteAtBeginning(): temp = head (10), head advances to [20], free(temp). List: 20 -> 30 -> 40 -> NULL.\n6. deleteAtBeginning(): temp = head (20), head advances to [30], free(temp). List: 30 -> 40 -> NULL.\n7. insertAtEnd(50): Traverse to 40 -> [40]->next = [50 | NULL]. List: 30 -> 40 -> 50 -> NULL.",
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
    ],
    "definition": "Deleting from the beginning removes the first node of the singly linked list and updates head to point to the second node in O(1) time.",
    "concept_explanation": "This menu-driven program implements Singly Linked List creation, insertion at end, deletion at beginning, and display traversal through an interactive menu. It specifically focuses on these four fundamental operations (it does not implement insertion at arbitrary intermediate positions or deletion of arbitrary middle nodes in this specific program).",
    "algorithm": "Step 1: If head == NULL, report \"Underflow: List is empty\" and return.\nStep 2: Store temp = head.\nStep 3: Update head = head->next.\nStep 4: Release memory: free(temp).\nStep 5: Return updated head.",
    "pseudocode": "function deleteFromBeginning(head):\n    if head == NULL then error(\"Underflow\")\n    temp = head\n    head = head.next\n    free(temp)\n    return head",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\n// Self-referential structure definition for a singly linked list node\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\n// Global head pointer pointing to the first node of the list\nstruct Node *head = NULL;\n\n/**\n * 1. Insert at End (Append / Create)\n * Traverses to the last node and attaches the newly created node.\n * If the list is empty, assigns newNode as the head.\n */\nvoid insertAtEnd(int val) {\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) {\n        printf(\"Memory allocation failed!\\n\");\n        return;\n    }\n    newNode->data = val;\n    newNode->next = NULL;\n\n    if (head == NULL) {\n        head = newNode;\n        printf(\"Node with value %d created as head of list.\\n\", val);\n        return;\n    }\n\n    struct Node *temp = head;\n    while (temp->next != NULL) {\n        temp = temp->next;\n    }\n    temp->next = newNode;\n    printf(\"Node with value %d inserted at end.\\n\", val);\n}\n\n/**\n * 2. Delete from Beginning\n * Deletes the current head node in O(1) time and updates head to the next node.\n */\nvoid deleteAtBeginning(void) {\n    if (head == NULL) {\n        printf(\"Underflow! List is empty. Nothing to delete.\\n\");\n        return;\n    }\n    struct Node *temp = head;\n    printf(\"Node with value %d deleted from beginning.\\n\", temp->data);\n    head = head->next;\n    free(temp);\n}\n\n/**\n * 3. Display Linked List\n * Traverses from head to NULL and prints each element.\n */\nvoid displayList(void) {\n    if (head == NULL) {\n        printf(\"List is empty: NULL\\n\");\n        return;\n    }\n    struct Node *temp = head;\n    printf(\"Linked List: \");\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    printf(\"====================================================\\n\");\n    printf(\"   Menu-Driven Singly Linked List Demonstration     \\n\");\n    printf(\"   Operations: Create, Insert at End,               \\n\");\n    printf(\"               Delete at Beginning, Display         \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    // Demonstrating Creation and Insertion at End\n    printf(\"--- 1. Creating List & Inserting Elements at End ---\\n\");\n    insertAtEnd(10);\n    insertAtEnd(20);\n    insertAtEnd(30);\n    insertAtEnd(40);\n    displayList();\n    printf(\"\\n\");\n\n    // Demonstrating Deletion from Beginning\n    printf(\"--- 2. Deleting Elements from Beginning ---\\n\");\n    deleteAtBeginning();\n    displayList();\n\n    deleteAtBeginning();\n    displayList();\n    printf(\"\\n\");\n\n    // Inserting another element at end\n    printf(\"--- 3. Inserting New Element at End ---\\n\");\n    insertAtEnd(50);\n    displayList();\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "List: [10]->[20]->[30]->NULL. Delete 3 times.",
    "sample_output": "====================================================\n   Menu-Driven Singly Linked List Demonstration     \n   Operations: Create, Insert at End,               \n               Delete at Beginning, Display         \n====================================================\n\n--- 1. Creating List & Inserting Elements at End ---\nNode with value 10 created as head of list.\nNode with value 20 inserted at end.\nNode with value 30 inserted at end.\nNode with value 40 inserted at end.\nLinked List: 10 -> 20 -> 30 -> 40 -> NULL\n\n--- 2. Deleting Elements from Beginning ---\nNode with value 10 deleted from beginning.\nLinked List: 20 -> 30 -> 40 -> NULL\nNode with value 20 deleted from beginning.\nLinked List: 30 -> 40 -> NULL\n\n--- 3. Inserting New Element at End ---\nNode with value 50 inserted at end.\nLinked List: 30 -> 40 -> 50 -> NULL",
    "dry_run": "Menu-Driven Singly Linked List Execution Trace:\n1. insertAtEnd(10): List empty -> head points to [10 | NULL].\n2. insertAtEnd(20): Traverse to 10 -> [10]->next = [20 | NULL]. List: 10 -> 20 -> NULL.\n3. insertAtEnd(30): Traverse to 20 -> [20]->next = [30 | NULL]. List: 10 -> 20 -> 30 -> NULL.\n4. insertAtEnd(40): Traverse to 30 -> [30]->next = [40 | NULL]. List: 10 -> 20 -> 30 -> 40 -> NULL.\n5. deleteAtBeginning(): temp = head (10), head advances to [20], free(temp). List: 20 -> 30 -> 40 -> NULL.\n6. deleteAtBeginning(): temp = head (20), head advances to [30], free(temp). List: 30 -> 40 -> NULL.\n7. insertAtEnd(50): Traverse to 40 -> [40]->next = [50 | NULL]. List: 30 -> 40 -> 50 -> NULL.",
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
    ],
    "definition": "Display or Traversal sequentially visits every node of a singly linked list from head to tail, printing or processing the data field of each node.",
    "concept_explanation": "This menu-driven program implements Singly Linked List creation, insertion at end, deletion at beginning, and display traversal through an interactive menu. It specifically focuses on these four fundamental operations (it does not implement insertion at arbitrary intermediate positions or deletion of arbitrary middle nodes in this specific program).",
    "algorithm": "Step 1: Set ptr = head.\nStep 2: If ptr == NULL, print \"List is empty\" and exit.\nStep 3: While ptr != NULL:\nStep 4:   Print ptr->data.\nStep 5:   Set ptr = ptr->next.\nStep 6: Print \"NULL\" to denote list termination.",
    "pseudocode": "function display(head):\n    ptr = head\n    while ptr != NULL do:\n        print(ptr.data)\n        ptr = ptr.next",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\n// Self-referential structure definition for a singly linked list node\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\n// Global head pointer pointing to the first node of the list\nstruct Node *head = NULL;\n\n/**\n * 1. Insert at End (Append / Create)\n * Traverses to the last node and attaches the newly created node.\n * If the list is empty, assigns newNode as the head.\n */\nvoid insertAtEnd(int val) {\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) {\n        printf(\"Memory allocation failed!\\n\");\n        return;\n    }\n    newNode->data = val;\n    newNode->next = NULL;\n\n    if (head == NULL) {\n        head = newNode;\n        printf(\"Node with value %d created as head of list.\\n\", val);\n        return;\n    }\n\n    struct Node *temp = head;\n    while (temp->next != NULL) {\n        temp = temp->next;\n    }\n    temp->next = newNode;\n    printf(\"Node with value %d inserted at end.\\n\", val);\n}\n\n/**\n * 2. Delete from Beginning\n * Deletes the current head node in O(1) time and updates head to the next node.\n */\nvoid deleteAtBeginning(void) {\n    if (head == NULL) {\n        printf(\"Underflow! List is empty. Nothing to delete.\\n\");\n        return;\n    }\n    struct Node *temp = head;\n    printf(\"Node with value %d deleted from beginning.\\n\", temp->data);\n    head = head->next;\n    free(temp);\n}\n\n/**\n * 3. Display Linked List\n * Traverses from head to NULL and prints each element.\n */\nvoid displayList(void) {\n    if (head == NULL) {\n        printf(\"List is empty: NULL\\n\");\n        return;\n    }\n    struct Node *temp = head;\n    printf(\"Linked List: \");\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    printf(\"====================================================\\n\");\n    printf(\"   Menu-Driven Singly Linked List Demonstration     \\n\");\n    printf(\"   Operations: Create, Insert at End,               \\n\");\n    printf(\"               Delete at Beginning, Display         \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    // Demonstrating Creation and Insertion at End\n    printf(\"--- 1. Creating List & Inserting Elements at End ---\\n\");\n    insertAtEnd(10);\n    insertAtEnd(20);\n    insertAtEnd(30);\n    insertAtEnd(40);\n    displayList();\n    printf(\"\\n\");\n\n    // Demonstrating Deletion from Beginning\n    printf(\"--- 2. Deleting Elements from Beginning ---\\n\");\n    deleteAtBeginning();\n    displayList();\n\n    deleteAtBeginning();\n    displayList();\n    printf(\"\\n\");\n\n    // Inserting another element at end\n    printf(\"--- 3. Inserting New Element at End ---\\n\");\n    insertAtEnd(50);\n    displayList();\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "List with 100, 200, 300",
    "sample_output": "====================================================\n   Menu-Driven Singly Linked List Demonstration     \n   Operations: Create, Insert at End,               \n               Delete at Beginning, Display         \n====================================================\n\n--- 1. Creating List & Inserting Elements at End ---\nNode with value 10 created as head of list.\nNode with value 20 inserted at end.\nNode with value 30 inserted at end.\nNode with value 40 inserted at end.\nLinked List: 10 -> 20 -> 30 -> 40 -> NULL\n\n--- 2. Deleting Elements from Beginning ---\nNode with value 10 deleted from beginning.\nLinked List: 20 -> 30 -> 40 -> NULL\nNode with value 20 deleted from beginning.\nLinked List: 30 -> 40 -> NULL\n\n--- 3. Inserting New Element at End ---\nNode with value 50 inserted at end.\nLinked List: 30 -> 40 -> 50 -> NULL",
    "dry_run": "Menu-Driven Singly Linked List Execution Trace:\n1. insertAtEnd(10): List empty -> head points to [10 | NULL].\n2. insertAtEnd(20): Traverse to 10 -> [10]->next = [20 | NULL]. List: 10 -> 20 -> NULL.\n3. insertAtEnd(30): Traverse to 20 -> [20]->next = [30 | NULL]. List: 10 -> 20 -> 30 -> NULL.\n4. insertAtEnd(40): Traverse to 30 -> [30]->next = [40 | NULL]. List: 10 -> 20 -> 30 -> 40 -> NULL.\n5. deleteAtBeginning(): temp = head (10), head advances to [20], free(temp). List: 20 -> 30 -> 40 -> NULL.\n6. deleteAtBeginning(): temp = head (20), head advances to [30], free(temp). List: 30 -> 40 -> NULL.\n7. insertAtEnd(50): Traverse to 40 -> [40]->next = [50 | NULL]. List: 30 -> 40 -> 50 -> NULL.",
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
  }
];
