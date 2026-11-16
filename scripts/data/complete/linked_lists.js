/**
 * Complete Linked Lists Knowledge Module (28 Operations with Full 14-Section Schemas)
 * Covers Singly Linked List (12 ops), Doubly Linked List (10 ops), and Circular Linked List (6 ops).
 */

const sll_ops = [
  {
    id: 'sll_create',
    title: 'Singly Linked List — Creation & Memory Allocation',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['create singly linked list', 'linked list creation', 'allocate node', 'struct node c', 'create node'],
    definition: 'Singly Linked List creation involves defining a self-referential structure in C containing a data field and a next pointer, followed by dynamic heap memory allocation using malloc() to instantiate the head node.',
    concept_explanation: 'A singly linked list is a linear data collection composed of individual nodes connected by directional pointers. Each node occupies two fields in memory: the payload data and a pointer next pointing to the successor node. Creation begins with a NULL pointer representing an empty list. When a node is created, malloc(sizeof(struct Node)) requests heap memory. The node is initialized with the payload, and its next pointer is set to NULL.',
    algorithm: `Step 1: Define structure Node with int data and struct Node* next.
Step 2: Declare head pointer initialized to NULL (struct Node* head = NULL).
Step 3: Allocate memory for a new node using malloc(sizeof(struct Node)).
Step 4: Check if allocation was successful (newNode != NULL).
Step 5: Assign newNode->data = value and newNode->next = NULL.
Step 6: Set head = newNode.`,
    pseudocode: `struct Node:
    data: Integer
    next: Pointer to Node

function createNode(val):
    newNode = allocate(Node)
    if newNode == NULL then error("Out of Memory")
    newNode.data = val
    newNode.next = NULL
    return newNode`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// Function to create a new node on the heap
struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        exit(1);
    }
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

int main(void) {
    printf("=== Singly Linked List Creation ===\\n");
    struct Node* head = createNode(10);
    head->next = createNode(20);
    head->next->next = createNode(30);

    printf("Created 3-node linked list: ");
    struct Node* temp = head;
    while (temp != NULL) {
        printf("[%d] -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");

    // Clean up heap memory
    while (head != NULL) {
        struct Node* next = head->next;
        free(head);
        head = next;
    }
    return 0;
}`,
    sample_input: 'Values: 10, 20, 30',
    sample_output: `=== Singly Linked List Creation ===
Created 3-node linked list: [10] -> [20] -> [30] -> NULL`,
    dry_run: `1. malloc allocates 16 bytes for Node 1 -> addr 0x1000. data=10, next=NULL. head=0x1000.
2. malloc allocates 16 bytes for Node 2 -> addr 0x1010. data=20, next=NULL. head->next=0x1010.
3. malloc allocates 16 bytes for Node 3 -> addr 0x1020. data=30, next=NULL. Node2->next=0x1020.
Traversal visits 0x1000 (10) -> 0x1010 (20) -> 0x1020 (30) -> NULL.`,
    time_complexity: `• Node Creation: O(1) time complexity.
• Total List Creation (n nodes): O(n) time.`,
    space_complexity: `• O(1) auxiliary space per node. Total memory: O(n) heap allocation.`,
    advantages_disadvantages: `Advantages:
• Dynamic sizing: Expands and contracts at runtime without fixed capacity boundaries.
• Zero memory waste compared to pre-allocated static arrays.

Disadvantages:
• Extra memory overhead: Requires 8 bytes per node for the next pointer on 64-bit systems.
• Non-contiguous heap allocation reduces CPU cache locality.`,
    applications: `• Dynamic symbol tables in compilers.
• Memory pool allocation blocks in operating systems.`,
    viva_questions: [
      {
        q: 'Why is struct Node considered a self-referential structure in C?',
        a: 'Because it contains a pointer member (struct Node* next) that points to another instance of the exact same structure type.'
      }
    ],
    edge_cases: `• Memory exhaustion: malloc returns NULL; checked and handled with exit condition.`,
    diagram: `[ head ] --> [ 10 | * ] --> [ 20 | * ] --> [ 30 | NULL ]`
  },
  {
    id: 'sll_insert_beginning',
    title: 'Singly Linked List — Insert at Beginning (Prepend)',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['insert at beginning', 'prepend node', 'insert head linked list', 'insert first node'],
    definition: 'Insertion at the beginning of a singly linked list adds a new node before the current head, making the new node the first element of the list in constant O(1) time.',
    concept_explanation: 'To insert at the beginning, allocate a new node and assign its payload. Set the new node\'s next pointer to point to the current head node. Finally, update the head pointer to reference the new node. Because no traversal of existing nodes is necessary, insertion at the head is strictly an O(1) constant-time operation regardless of whether the list holds 0 or 1,000,000 items.',
    algorithm: `Step 1: Allocate memory for newNode.
Step 2: Assign newNode->data = value.
Step 3: Set newNode->next = head.
Step 4: Update head = newNode.
Step 5: Return updated head.`,
    pseudocode: `function insertAtBeginning(head, value):
    newNode = allocate(Node)
    newNode.data = value
    newNode.next = head
    head = newNode
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// Inserts a new node at the beginning of the list using double pointer
void insertAtBeginning(struct Node** headRef, int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Heap Overflow! Cannot allocate memory.\\n");
        return;
    }
    newNode->data = value;
    newNode->next = *headRef; // Point new node to current first node
    *headRef = newNode;       // Move head pointer to new node
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* head = NULL; // Initially empty list

    printf("=== Singly Linked List: Insert at Beginning ===\\n");
    printf("Initial list: ");
    printList(head);

    insertAtBeginning(&head, 30);
    printf("After inserting 30: ");
    printList(head);

    insertAtBeginning(&head, 20);
    printf("After inserting 20: ");
    printList(head);

    insertAtBeginning(&head, 10);
    printf("After inserting 10: ");
    printList(head);

    // Free memory
    while (head != NULL) {
        struct Node* temp = head;
        head = head->next;
        free(temp);
    }
    return 0;
}`,
    sample_input: 'Insert sequentially: 30, then 20, then 10',
    sample_output: `=== Singly Linked List: Insert at Beginning ===
Initial list: NULL
After inserting 30: [30] -> NULL
After inserting 20: [20] -> [30] -> NULL
After inserting 10: [10] -> [20] -> [30] -> NULL`,
    dry_run: `Initial: head = NULL
1. insert(30): newNode->data = 30, newNode->next = NULL. head = newNode. List: [30]->NULL.
2. insert(20): newNode->data = 20, newNode->next = 30. head = newNode. List: [20]->[30]->NULL.
3. insert(10): newNode->data = 10, newNode->next = 20. head = newNode. List: [10]->[20]->[30]->NULL.`,
    time_complexity: `• Time Complexity: O(1) strictly — Zero loops, instantaneous pointer reassignment.`,
    space_complexity: `• O(1) extra space per insertion.`,
    advantages_disadvantages: `Advantages:
• Fastest insertion operation possible in linked data structures.
• Natural mechanism for implementing Stacks (LIFO push).

Disadvantages:
• Inverts the natural arrival order if elements are appended repeatedly.`,
    applications: `• Implementing the push() operation of an array-less dynamic Stack.
• Undo history buffers in text editors.`,
    viva_questions: [
      {
        q: 'Why is insertion at the beginning of a singly linked list O(1)?',
        a: 'Because we only update two pointers (newNode->next = head and head = newNode) without traversing the list.'
      }
    ],
    edge_cases: `• Empty list (head == NULL): Correctly sets newNode->next = NULL and head = newNode.`,
    diagram: `[ newNode: 10 ] ---> [ head: 20 ] ---> [ 30 ] ---> NULL
      |
    (head points here now)`
  },
  {
    id: 'sll_insert_end',
    title: 'Singly Linked List — Insert at End (Append)',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['insert at end', 'append node', 'insert tail linked list', 'insert last node'],
    definition: 'Insertion at the end of a singly linked list traverses to the last node whose next pointer is NULL, and attaches a newly created node to it.',
    concept_explanation: 'To insert at the end without a tail pointer, traverse from head using a temporary pointer until temp->next == NULL is reached. Then attach temp->next = newNode. If the list was initially empty, head is updated directly to newNode. Because the entire list must be traversed to reach the tail, this operation takes O(n) time (or O(1) if a tail pointer is maintained).',
    algorithm: `Step 1: Allocate newNode with value and newNode->next = NULL.
Step 2: If head is NULL, set head = newNode and return.
Step 3: Initialize temp = head.
Step 4: Traverse while temp->next != NULL: temp = temp->next.
Step 5: Set temp->next = newNode.`,
    pseudocode: `function insertAtEnd(head, value):
    newNode = allocate(Node)
    newNode.data = value
    newNode.next = NULL
    if head == NULL then:
        return newNode
    temp = head
    while temp.next != NULL do:
        temp = temp.next
    temp.next = newNode
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertAtEnd(struct Node** headRef, int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = NULL;

    // If list is empty, new node becomes head
    if (*headRef == NULL) {
        *headRef = newNode;
        return;
    }

    // Traverse to the last node
    struct Node* temp = *headRef;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* head = NULL;
    printf("=== Singly Linked List: Insert at End ===\\n");

    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);

    printf("Final list after appending 10, 20, 30: ");
    printList(head);

    // Free memory
    while (head != NULL) {
        struct Node* temp = head;
        head = head->next;
        free(temp);
    }
    return 0;
}`,
    sample_input: 'Append: 10, 20, 30',
    sample_output: `=== Singly Linked List: Insert at End ===
Final list after appending 10, 20, 30: [10] -> [20] -> [30] -> NULL`,
    dry_run: `1. insert(10): head is NULL -> head = [10]->NULL.
2. insert(20): temp points to 10 (temp->next==NULL). temp->next = [20]->NULL. List: [10]->[20]->NULL.
3. insert(30): temp moves 10 -> 20. temp->next = [30]->NULL. List: [10]->[20]->[30]->NULL.`,
    time_complexity: `• Time Complexity: O(n) without tail pointer; O(1) if a tail pointer is maintained.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages:
• Preserves natural chronological arrival sequence.
• Natural mechanism for implementing Queue enqueue().

Disadvantages:
• Requires O(n) traversal if only a head pointer is kept.`,
    applications: `• Queue enqueue operation.
• Appending log events to a singly-linked audit trail.`,
    viva_questions: [
      {
        q: 'How can insertion at the end of a singly linked list be optimized to O(1)?',
        a: 'By maintaining an auxiliary tail pointer pointing directly to the last node.'
      }
    ],
    edge_cases: `• Empty list (head == NULL): Sets *headRef = newNode directly.`,
    diagram: `[ 10 | * ] -> [ 20 | * ] -> [ 30 | * ] ----> [ newNode: 40 | NULL ]
                               temp (last node)`
  },
  {
    id: 'sll_insert_pos',
    title: 'Singly Linked List — Insert at Specific Position',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['insert at position', 'insert middle linked list', 'insert at index', 'insert given position'],
    definition: 'Insertion at a specific position inserts a new node at a 1-based index pos in the linked list, adjusting surrounding next pointers.',
    concept_explanation: 'To insert at position pos, traverse pos - 2 steps from head to reach the node immediately preceding the target location. Allocate the new node, assign its next pointer to temp->next, and then set temp->next to newNode. If pos is 1, it delegates to insertAtBeginning. If pos is greater than length + 1, it reports an invalid position error.',
    algorithm: `Step 1: If pos == 1, insert at beginning and update head.
Step 2: Initialize temp = head and count = 1.
Step 3: Traverse while count < pos - 1 and temp != NULL: temp = temp->next, count++.
Step 4: If temp is NULL, position is invalid (out of bounds).
Step 5: Allocate newNode with value.
Step 6: Set newNode->next = temp->next.
Step 7: Set temp->next = newNode.`,
    pseudocode: `function insertAtPosition(head, pos, val):
    if pos == 1 then:
        return insertAtBeginning(head, val)
    temp = head
    for i from 1 to pos - 2 do:
        if temp == NULL then error("Invalid position")
        temp = temp.next
    newNode = allocate(Node, val)
    newNode.next = temp.next
    temp.next = newNode
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insertAtPosition(struct Node** headRef, int value, int pos) {
    if (pos < 1) {
        printf("Invalid position %d! Positions start at 1.\\n", pos);
        return;
    }

    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;

    // Case 1: Insert at position 1 (head)
    if (pos == 1) {
        newNode->next = *headRef;
        *headRef = newNode;
        return;
    }

    // Traverse to node at position pos - 1
    struct Node* temp = *headRef;
    for (int i = 1; i < pos - 1 && temp != NULL; i++) {
        temp = temp->next;
    }

    // Out of bounds check
    if (temp == NULL) {
        printf("Position %d exceeds list length! Insertion aborted.\\n", pos);
        free(newNode);
        return;
    }

    newNode->next = temp->next;
    temp->next = newNode;
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* head = NULL;
    printf("=== Singly Linked List: Insert at Position ===\\n");

    insertAtPosition(&head, 10, 1); // Pos 1
    insertAtPosition(&head, 30, 2); // Pos 2
    insertAtPosition(&head, 20, 2); // Insert 20 between 10 and 30
    insertAtPosition(&head, 40, 4); // Pos 4 (end)

    printf("List after insertions: ");
    printList(head);

    printf("Attempting invalid position 10:\\n");
    insertAtPosition(&head, 99, 10);

    // Free memory
    while (head != NULL) {
        struct Node* temp = head;
        head = head->next;
        free(temp);
    }
    return 0;
}`,
    sample_input: 'Insert 10 at pos 1, 30 at pos 2, 20 at pos 2, 40 at pos 4',
    sample_output: `=== Singly Linked List: Insert at Position ===
List after insertions: [10] -> [20] -> [30] -> [40] -> NULL
Attempting invalid position 10:
Position 10 exceeds list length! Insertion aborted.`,
    dry_run: `Initial: [10]->[30]->NULL. Insert 20 at pos 2:
1. temp points to node at pos 1 ([10]).
2. newNode([20])->next = temp->next ([30]).
3. temp->next = newNode([20]).
Result: [10]->[20]->[30]->NULL.`,
    time_complexity: `• Best Case: O(1) if pos == 1.
• Worst Case: O(n) to traverse to position pos - 1.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages:
• Does not require shifting subsequent elements like an array.

Disadvantages:
• Requires O(pos) sequential traversal to find the node.`,
    applications: `• Priority insertion in sorted linked lists.
• Inserting text tokens at specific cursor line/character positions.`,
    viva_questions: [
      {
        q: 'Why does inserting at position k in a linked list take O(k) time?',
        a: 'Because we must traverse sequentially through k - 1 preceding nodes to reach the insertion point.'
      }
    ],
    edge_cases: `• pos == 1: Correctly prepends without NULL dereference.
• pos > length + 1: Reports error and frees unused node to prevent memory leak.`,
    diagram: `[ temp: 10 ] -------------> [ 30 ]
       \\                     ^
        \\-> [ newNode: 20 ] -/`
  },
  {
    id: 'sll_delete_beginning',
    title: 'Singly Linked List — Delete from Beginning',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['delete from beginning', 'delete head linked list', 'pop front linked list', 'remove first node'],
    definition: 'Deleting from the beginning removes the first node of the singly linked list and updates head to point to the second node in O(1) time.',
    concept_explanation: 'Before deletion, check for underflow (head == NULL). If list has nodes, store head in a temporary pointer temp. Advance head to head->next. Finally, call free(temp) to return the deleted node\'s memory to the operating system heap. This executes in constant O(1) time.',
    algorithm: `Step 1: If head == NULL, report "Underflow: List is empty" and return.
Step 2: Store temp = head.
Step 3: Update head = head->next.
Step 4: Release memory: free(temp).
Step 5: Return updated head.`,
    pseudocode: `function deleteFromBeginning(head):
    if head == NULL then error("Underflow")
    temp = head
    head = head.next
    free(temp)
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void deleteFromBeginning(struct Node** headRef) {
    if (*headRef == NULL) {
        printf("Underflow! List is already empty.\\n");
        return;
    }
    struct Node* temp = *headRef;
    int deletedVal = temp->data;
    *headRef = (*headRef)->next; // Move head to next node
    free(temp);                  // Deallocate old head
    printf("Deleted node with value: %d\\n", deletedVal);
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    // Setup initial list: [10] -> [20] -> [30] -> NULL
    struct Node* head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 10;
    head->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->data = 20;
    head->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->data = 30;
    head->next->next->next = NULL;

    printf("=== Singly Linked List: Delete from Beginning ===\\n");
    printf("Initial list: ");
    printList(head);

    deleteFromBeginning(&head);
    printf("After 1st deletion: ");
    printList(head);

    deleteFromBeginning(&head);
    printf("After 2nd deletion: ");
    printList(head);

    deleteFromBeginning(&head);
    printf("After 3rd deletion: ");
    printList(head);

    deleteFromBeginning(&head); // Underflow test

    return 0;
}`,
    sample_input: 'List: [10]->[20]->[30]->NULL. Delete 3 times.',
    sample_output: `=== Singly Linked List: Delete from Beginning ===
Initial list: [10] -> [20] -> [30] -> NULL
Deleted node with value: 10
After 1st deletion: [20] -> [30] -> NULL
Deleted node with value: 20
After 2nd deletion: [30] -> NULL
Deleted node with value: 30
After 3rd deletion: NULL
Underflow! List is already empty.`,
    dry_run: `1. head = [10]->[20]->[30]. temp = 10. head = [20]->[30]. free(temp).
2. head = [20]->[30]. temp = 20. head = [30]. free(temp).
3. head = [30]. temp = 30. head = NULL. free(temp).
4. head = NULL -> Underflow error!`,
    time_complexity: `• Time Complexity: O(1) constant time — Immediate pointer update.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages:
• O(1) deallocation with no element shifting.
• Natural mechanism for Stack pop() and Queue dequeue().

Disadvantages:
• None.`,
    applications: `• Stack pop() operation.
• Queue dequeue() in FIFO structures.`,
    viva_questions: [
      {
        q: 'What happens if you do head = head->next without saving head in a temporary pointer first?',
        a: 'The original head node becomes unreachable in memory, creating a memory leak because its address is lost and cannot be freed.'
      }
    ],
    edge_cases: `• Empty list (head == NULL): Caught by underflow guard.
• Single-node list: Leaves head == NULL safely.`,
    diagram: `[ temp: 10 ]  -- (freed)
      |
[ head: 20 ] ---> [ 30 ] ---> NULL`
  },
  {
    id: 'sll_delete_end',
    title: 'Singly Linked List — Delete from End',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['delete from end', 'delete tail linked list', 'pop back linked list', 'remove last node'],
    definition: 'Deleting from the end of a singly linked list removes the last node and sets the second-to-last node\'s next pointer to NULL.',
    concept_explanation: 'To delete the last node, traverse the list until reaching the second-to-last node (temp->next->next == NULL). Free temp->next and set temp->next = NULL. If the list has only 1 node, free head and set head = NULL. Because traversal to the second-to-last node is required, this is an O(n) operation.',
    algorithm: `Step 1: If head == NULL, report underflow and return.
Step 2: If head->next == NULL (only one node), free(head), set head = NULL, and return.
Step 3: Initialize temp = head.
Step 4: Traverse while temp->next->next != NULL: temp = temp->next.
Step 5: Free memory: free(temp->next).
Step 6: Set temp->next = NULL.`,
    pseudocode: `function deleteFromEnd(head):
    if head == NULL then error("Underflow")
    if head.next == NULL then:
        free(head)
        return NULL
    temp = head
    while temp.next.next != NULL do:
        temp = temp.next
    free(temp.next)
    temp.next = NULL
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void deleteFromEnd(struct Node** headRef) {
    if (*headRef == NULL) {
        printf("Underflow! List is empty.\\n");
        return;
    }

    // Case 1: Single node list
    if ((*headRef)->next == NULL) {
        printf("Deleted last remaining node: %d\\n", (*headRef)->data);
        free(*headRef);
        *headRef = NULL;
        return;
    }

    // Case 2: Traverse to second-to-last node
    struct Node* temp = *headRef;
    while (temp->next->next != NULL) {
        temp = temp->next;
    }

    printf("Deleted last node: %d\\n", temp->next->data);
    free(temp->next);
    temp->next = NULL; // Terminate list
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 10;
    head->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->data = 20;
    head->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->data = 30;
    head->next->next->next = NULL;

    printf("=== Singly Linked List: Delete from End ===\\n");
    printList(head);

    deleteFromEnd(&head);
    printList(head);

    deleteFromEnd(&head);
    printList(head);

    deleteFromEnd(&head);
    printList(head);

    return 0;
}`,
    sample_input: 'List: [10]->[20]->[30]->NULL',
    sample_output: `=== Singly Linked List: Delete from End ===
[10] -> [20] -> [30] -> NULL
Deleted last node: 30
[10] -> [20] -> NULL
Deleted last node: 20
[10] -> NULL
Deleted last remaining node: 10
NULL`,
    dry_run: `Initial: [10]->[20]->[30]->NULL.
1. temp starts at 10. temp->next->next is 30 (not NULL).
2. temp moves to 20. temp->next->next is NULL (temp is second-to-last).
3. free(temp->next) frees 30. temp->next = NULL.
Result: [10]->[20]->NULL.`,
    time_complexity: `• Time Complexity: O(n) — Must traverse to the (n-1)-th node.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages:
• Safely deallocates tail node and ensures clean NULL termination.

Disadvantages:
• O(n) runtime even with a tail pointer, because we cannot move backwards to the second-to-last node in a singly linked list.`,
    applications: `• Trimming buffer histories.
• Rolling back state in transaction logs.`,
    viva_questions: [
      {
        q: 'Can deleting from the end of a singly linked list be O(1) if we maintain a tail pointer?',
        a: 'No! Even with a tail pointer, we cannot find the second-to-last node in O(1) because pointers are unidirectional. Doubly linked lists solve this.'
      }
    ],
    edge_cases: `• Single node: Clears head to NULL properly without dereferencing temp->next->next.`,
    diagram: `[ 10 | * ] -> [ 20 | NULL ]   (X) [ 30 | NULL ] freed
                     temp`
  },
  {
    id: 'sll_delete_val',
    title: 'Singly Linked List — Delete a Specific Value',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['delete specific value', 'delete key linked list', 'remove value from list', 'delete node by value'],
    definition: 'Deleting a specific value searches the list for the first node matching a target key and removes it, maintaining list continuity.',
    concept_explanation: 'To delete by value, check if head contains the key. If so, delete head and update head. Otherwise, maintain two pointers: curr (traversing node) and prev (preceding node). When curr->data == key is found, bridge the list by setting prev->next = curr->next, and then free(curr). If the key is not found, output an appropriate message.',
    algorithm: `Step 1: If head == NULL, list is empty; return.
Step 2: If head->data == key:
Step 3:   temp = head, head = head->next, free(temp), return.
Step 4: Set prev = head and curr = head->next.
Step 5: While curr != NULL and curr->data != key:
Step 6:   prev = curr, curr = curr->next.
Step 7: If curr == NULL, key was not found.
Step 8: Else: prev->next = curr->next, free(curr).`,
    pseudocode: `function deleteByValue(head, key):
    if head == NULL then return NULL
    if head.data == key then:
        temp = head
        head = head.next
        free(temp)
        return head
    prev = head
    curr = head.next
    while curr != NULL and curr.data != key do:
        prev = curr
        curr = curr.next
    if curr != NULL then:
        prev.next = curr.next
        free(curr)
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void deleteByValue(struct Node** headRef, int key) {
    if (*headRef == NULL) {
        printf("List is empty! Cannot delete %d.\\n", key);
        return;
    }

    struct Node* temp = *headRef;

    // Case 1: Key is in the head node
    if (temp->data == key) {
        *headRef = temp->next;
        free(temp);
        printf("Deleted key %d from head.\\n", key);
        return;
    }

    // Case 2: Search for key maintaining prev pointer
    struct Node* prev = NULL;
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }

    // Key not present in list
    if (temp == NULL) {
        printf("Key %d not found in the list.\\n", key);
        return;
    }

    // Unlink the node from linked list
    prev->next = temp->next;
    free(temp);
    printf("Deleted key %d from list.\\n", key);
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 10;
    head->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->data = 20;
    head->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->data = 30;
    head->next->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->next->data = 40;
    head->next->next->next->next = NULL;

    printf("=== Singly Linked List: Delete by Value ===\\n");
    printList(head);

    deleteByValue(&head, 30); // Middle node
    printList(head);

    deleteByValue(&head, 10); // Head node
    printList(head);

    deleteByValue(&head, 99); // Non-existent key

    // Free remainder
    while (head != NULL) {
        struct Node* t = head;
        head = head->next;
        free(t);
    }
    return 0;
}`,
    sample_input: 'List: [10, 20, 30, 40]. Delete 30, then 10, then 99.',
    sample_output: `=== Singly Linked List: Delete by Value ===
[10] -> [20] -> [30] -> [40] -> NULL
Deleted key 30 from list.
[10] -> [20] -> [40] -> NULL
Deleted key 10 from head.
[20] -> [40] -> NULL
Key 99 not found in the list.`,
    dry_run: `Delete 30 from [10, 20, 30, 40]:
• head (10) != 30.
• prev = 10, temp = 20. 20 != 30.
• prev = 20, temp = 30. Match!
• prev->next = temp->next ([40]). free(30).
Result: [10]->[20]->[40]->NULL.`,
    time_complexity: `• Best Case: O(1) if target is at head.
• Worst/Average Case: O(n) if key is in the middle, end, or absent.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages:
• Dynamically removes any element without leaving gaps or requiring shifting.

Disadvantages:
• Requires O(n) search time to locate key.`,
    applications: `• Deleting a student record by roll number in an academic database.
• Removing completed process IDs from an active OS process list.`,
    viva_questions: [
      {
        q: 'Why do we need a prev pointer when deleting a node from a singly linked list?',
        a: 'Because singly linked list pointers are unidirectional. To remove node curr, we must adjust prev->next to bypass curr; without prev, we cannot access the preceding node.'
      }
    ],
    edge_cases: `• Key in head node: Handled separately.
• Key absent: Traversal reaches NULL, reports error safely.`,
    diagram: `[ prev: 20 ] --------(bypass)-------> [ 40 ]
       \\                                ^
        \\---> [ curr: 30 (freed) ] ----/`
  },
  {
    id: 'sll_delete_pos',
    title: 'Singly Linked List — Delete from Specific Position',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['delete at position', 'delete from index', 'delete specific position linked list'],
    definition: 'Deleting from a specific position removes the node at 1-based index pos in the linked list, updating surrounding pointers.',
    concept_explanation: 'To delete at index pos, if pos == 1, delete from beginning. Otherwise, traverse pos - 2 steps to reach the node immediately preceding the target. Save target node in temp = prev->next, update prev->next = temp->next, and call free(temp). If pos exceeds list length, an invalid position error is displayed.',
    algorithm: `Step 1: If head == NULL, return underflow.
Step 2: If pos == 1, temp = head, head = head->next, free(temp), return.
Step 3: Set prev = head.
Step 4: For i = 1 to pos - 2: prev = prev->next (if prev == NULL or prev->next == NULL, position is invalid).
Step 5: Set temp = prev->next.
Step 6: Set prev->next = temp->next.
Step 7: free(temp).`,
    pseudocode: `function deleteAtPosition(head, pos):
    if head == NULL then error("Empty")
    if pos == 1 then:
        temp = head
        head = head.next
        free(temp)
        return head
    prev = head
    for i from 1 to pos - 2 do:
        if prev == NULL or prev.next == NULL then error("Out of bounds")
        prev = prev.next
    temp = prev.next
    prev.next = temp.next
    free(temp)
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void deleteAtPosition(struct Node** headRef, int pos) {
    if (*headRef == NULL || pos < 1) {
        printf("Invalid deletion position or empty list!\\n");
        return;
    }

    struct Node* temp = *headRef;

    // Case 1: Delete head
    if (pos == 1) {
        *headRef = temp->next;
        free(temp);
        printf("Deleted node at position 1.\\n");
        return;
    }

    // Traverse to node at position pos - 1
    for (int i = 1; temp != NULL && i < pos - 1; i++) {
        temp = temp->next;
    }

    if (temp == NULL || temp->next == NULL) {
        printf("Position %d exceeds list length!\\n", pos);
        return;
    }

    // Node temp->next is to be deleted
    struct Node* nodeToDelete = temp->next;
    temp->next = nodeToDelete->next;
    free(nodeToDelete);
    printf("Deleted node at position %d.\\n", pos);
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 10;
    head->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->data = 20;
    head->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->data = 30;
    head->next->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->next->data = 40;
    head->next->next->next->next = NULL;

    printf("=== Singly Linked List: Delete at Position ===\\n");
    printList(head);

    deleteAtPosition(&head, 2); // Delete position 2 (value 20)
    printList(head);

    deleteAtPosition(&head, 1); // Delete position 1 (value 10)
    printList(head);

    deleteAtPosition(&head, 99); // Out of bounds

    while (head != NULL) {
        struct Node* t = head;
        head = head->next;
        free(t);
    }
    return 0;
}`,
    sample_input: 'List: [10, 20, 30, 40]. Delete at pos 2, pos 1, pos 99.',
    sample_output: `=== Singly Linked List: Delete at Position ===
[10] -> [20] -> [30] -> [40] -> NULL
Deleted node at position 2.
[10] -> [30] -> [40] -> NULL
Deleted node at position 1.
[30] -> [40] -> NULL
Position 99 exceeds list length!`,
    dry_run: `Delete at pos 2 from [10, 20, 30, 40]:
• pos = 2 -> loop i=1 to pos-2 does not run. temp = 10.
• nodeToDelete = temp->next = 20.
• temp->next = nodeToDelete->next = 30.
• free(20).
Result: [10]->[30]->[40]->NULL.`,
    time_complexity: `• Best Case: O(1) for pos == 1.
• Worst Case: O(pos) to traverse to position pos - 1.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages:
• Precise removal of indexed items without array copying.

Disadvantages:
• Requires linear traversal to find the node.`,
    applications: `• Removing an item from a specific user-selected index in a UI menu.`,
    viva_questions: [
      {
        q: 'What boundary condition must be checked when deleting by position?',
        a: 'We must verify temp != NULL and temp->next != NULL to prevent NULL pointer dereferencing when pos exceeds list length.'
      }
    ],
    edge_cases: `• pos == 1: Properly handled by updating head.
• pos > length: Safely caught with no crashes.`,
    diagram: `[ temp (pos-1): 10 ] ---------> [ pos+1: 30 ]
           \\                      ^
            \\-> [ pos: 20 (freed) ]/`
  },
  {
    id: 'sll_display',
    title: 'Singly Linked List — Display / Traverse',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['display linked list', 'traverse linked list', 'print linked list', 'print elements'],
    definition: 'Display or Traversal sequentially visits every node of a singly linked list from head to tail, printing or processing the data field of each node.',
    concept_explanation: 'Traversal starts with a pointer ptr initialized to head. A while loop checks ptr != NULL. In each iteration, ptr->data is accessed and printed, and ptr is updated to ptr = ptr->next. The loop terminates when ptr becomes NULL, guaranteeing that every element is visited exactly once in O(n) time.',
    algorithm: `Step 1: Set ptr = head.
Step 2: If ptr == NULL, print "List is empty" and exit.
Step 3: While ptr != NULL:
Step 4:   Print ptr->data.
Step 5:   Set ptr = ptr->next.
Step 6: Print "NULL" to denote list termination.`,
    pseudocode: `function display(head):
    ptr = head
    while ptr != NULL do:
        print(ptr.data)
        ptr = ptr.next`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void displayList(struct Node* head) {
    if (head == NULL) {
        printf("List is empty! (NULL)\\n");
        return;
    }
    struct Node* ptr = head;
    printf("List elements: ");
    while (ptr != NULL) {
        printf("[%d] -> ", ptr->data);
        ptr = ptr->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* head = NULL;
    displayList(head); // Empty test

    // Create 3-node list
    head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 100;
    head->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->data = 200;
    head->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->data = 300;
    head->next->next->next = NULL;

    displayList(head);

    while (head != NULL) {
        struct Node* t = head;
        head = head->next;
        free(t);
    }
    return 0;
}`,
    sample_input: 'List with 100, 200, 300',
    sample_output: `List is empty! (NULL)
List elements: [100] -> [200] -> [300] -> NULL`,
    dry_run: `ptr = 100: prints 100 -> ptr becomes 200
ptr = 200: prints 200 -> ptr becomes 300
ptr = 300: prints 300 -> ptr becomes NULL -> Loop ends.`,
    time_complexity: `• Time Complexity: O(n) — Each of the n nodes is visited exactly once.`,
    space_complexity: `• O(1) auxiliary space — Uses a single pointer variable.`,
    advantages_disadvantages: `Advantages:
• Simple, non-destructive sequential inspection.

Disadvantages:
• Cannot jump or traverse backwards.`,
    applications: `• Printing inventory, serializing linked lists to disk or network sockets.`,
    viva_questions: [
      {
        q: 'Why does the traversal loop check ptr != NULL instead of ptr->next != NULL?',
        a: 'Checking ptr != NULL processes the last node as well. Checking ptr->next != NULL would stop before printing the final node.'
      }
    ],
    edge_cases: `• Empty list (head == NULL): Prints "List is empty" without crash.`,
    diagram: `ptr: [ 100 | * ] ===> [ 200 | * ] ===> [ 300 | * ] ===> NULL`
  },
  {
    id: 'sll_search',
    title: 'Singly Linked List — Search an Element',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['search linked list', 'find node', 'search element linked list', 'locate key linked list'],
    definition: 'Searching in a singly linked list sequentially checks each node\'s data against a target key, returning its 1-based position or -1 if absent.',
    concept_explanation: 'Because linked list nodes are distributed across arbitrary heap locations, binary search cannot be applied. Linear traversal inspects each node. A counter pos tracks the 1-based index. If curr->data == key, pos is returned. If curr reaches NULL, the key is absent.',
    algorithm: `Step 1: Set curr = head and pos = 1.
Step 2: While curr != NULL:
Step 3:   If curr->data == key, return pos (Found).
Step 4:   curr = curr->next, pos = pos + 1.
Step 5: Return -1 (Not Found).`,
    pseudocode: `function search(head, key):
    curr = head
    pos = 1
    while curr != NULL do:
        if curr.data == key then:
            return pos
        curr = curr.next
        pos = pos + 1
    return -1`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

int searchElement(struct Node* head, int key) {
    struct Node* curr = head;
    int pos = 1;
    while (curr != NULL) {
        if (curr->data == key) {
            return pos; // 1-based position found
        }
        curr = curr->next;
        pos++;
    }
    return -1; // Not found
}

int main(void) {
    struct Node* head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 15;
    head->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->data = 30;
    head->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->data = 45;
    head->next->next->next = NULL;

    printf("=== Singly Linked List: Search Element ===\\n");
    int key1 = 30;
    int pos1 = searchElement(head, key1);
    printf("Search for %d: %s (Position %d)\\n", key1, pos1 != -1 ? "FOUND" : "NOT FOUND", pos1);

    int key2 = 99;
    int pos2 = searchElement(head, key2);
    printf("Search for %d: %s\\n", key2, pos2 != -1 ? "FOUND" : "NOT FOUND");

    while (head != NULL) {
        struct Node* t = head;
        head = head->next;
        free(t);
    }
    return 0;
}`,
    sample_input: 'List: [15, 30, 45]. Keys: 30, 99',
    sample_output: `=== Singly Linked List: Search Element ===
Search for 30: FOUND (Position 2)
Search for 99: NOT FOUND`,
    dry_run: `Search 30:
• curr = 15 (pos=1): 15 != 30 -> curr = 30, pos = 2.
• curr = 30 (pos=2): 30 == 30 -> Return 2.`,
    time_complexity: `• Best Case: O(1) if target is at head.
• Worst/Average Case: O(n) if at end or absent.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages:
• Simple to implement.

Disadvantages:
• Cannot utilize binary search; always O(n).`,
    applications: `• Checking membership in linked symbol tables.`,
    viva_questions: [
      {
        q: 'Can binary search be used on a sorted singly linked list?',
        a: 'No, because finding the midpoint requires traversing O(n/2) nodes, making binary search run in O(n) time on linked lists.'
      }
    ],
    edge_cases: `• Empty list returns -1 safely.`,
    diagram: `[ 15 ] -> [ 30 ] (MATCH at pos 2) -> [ 45 ] -> NULL`
  },
  {
    id: 'sll_count',
    title: 'Singly Linked List — Count Nodes',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['count nodes', 'length of linked list', 'size of linked list', 'number of nodes'],
    definition: 'Counting nodes calculates the total length of the singly linked list by sequentially incrementing a counter until the terminating NULL pointer is reached.',
    concept_explanation: 'A counter count is initialized to 0. A pointer curr begins at head. In each step of a while loop, count is incremented by 1 and curr advances to curr->next. When curr is NULL, count contains the total number of nodes.',
    algorithm: `Step 1: Set count = 0.
Step 2: Set curr = head.
Step 3: While curr != NULL:
Step 4:   count = count + 1.
Step 5:   curr = curr->next.
Step 6: Return count.`,
    pseudocode: `function countNodes(head):
    count = 0
    curr = head
    while curr != NULL do:
        count = count + 1
        curr = curr.next
    return count`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// Iterative count
int getCount(struct Node* head) {
    int count = 0;
    struct Node* curr = head;
    while (curr != NULL) {
        count++;
        curr = curr->next;
    }
    return count;
}

// Recursive count
int getCountRecursive(struct Node* head) {
    if (head == NULL) return 0;
    return 1 + getCountRecursive(head->next);
}

int main(void) {
    struct Node* head = NULL;
    printf("=== Singly Linked List: Count Nodes ===\\n");
    printf("Empty list count: %d\\n", getCount(head));

    // Build list: 5 -> 10 -> 15 -> 20
    for (int i = 4; i >= 1; i--) {
        struct Node* n = (struct Node*)malloc(sizeof(struct Node));
        n->data = i * 5;
        n->next = head;
        head = n;
    }

    printf("Iterative node count: %d\\n", getCount(head));
    printf("Recursive node count: %d\\n", getCountRecursive(head));

    while (head != NULL) {
        struct Node* t = head;
        head = head->next;
        free(t);
    }
    return 0;
}`,
    sample_input: 'List with 4 nodes: [5, 10, 15, 20]',
    sample_output: `=== Singly Linked List: Count Nodes ===
Empty list count: 0
Iterative node count: 4
Recursive node count: 4`,
    dry_run: `curr: 5 (count=1) -> 10 (count=2) -> 15 (count=3) -> 20 (count=4) -> NULL (terminates). Total = 4.`,
    time_complexity: `• Time Complexity: O(n) — visits every node once.`,
    space_complexity: `• Iterative: O(1).
• Recursive: O(n) stack space.`,
    advantages_disadvantages: `Advantages:
• Reliable length computation.

Disadvantages:
• O(n) cost unless list maintains an updated size field in a wrapper struct.`,
    applications: `• Validating position parameters before insertion/deletion.`,
    viva_questions: [
      {
        q: 'How can node counting be made O(1)?',
        a: 'By maintaining an integer variable size in a wrapper struct (e.g. struct LinkedList { Node* head; int size; }) that increments on insert and decrements on delete.'
      }
    ],
    edge_cases: `• Empty list returns 0 immediately.`,
    diagram: `[ 5 ] -> [ 10 ] -> [ 15 ] -> [ 20 ] -> NULL  ==> Count = 4`
  },
  {
    id: 'sll_reverse',
    title: 'Singly Linked List — Reverse a Linked List',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'singly_linked_list',
    subcategoryName: 'Singly Linked List',
    keywords: ['reverse linked list', 'invert linked list', 'reverse singly linked list', 'reverse list 3 pointers'],
    definition: 'Reversing a singly linked list inverts the direction of all next pointers so that the tail node becomes the new head, executed in O(n) time and O(1) auxiliary space using 3 pointers.',
    concept_explanation: 'The standard iterative reversal uses three sliding pointers: prev (starts NULL), curr (starts head), and next (tracks next node). In each step: 1) Save next = curr->next. 2) Invert the pointer: curr->next = prev. 3) Advance prev = curr. 4) Advance curr = next. When curr becomes NULL, prev points to the newly inverted head node.',
    algorithm: `Step 1: Initialize prev = NULL, curr = head, next = NULL.
Step 2: While curr != NULL:
Step 3:   next = curr->next (save next node).
Step 4:   curr->next = prev (invert link).
Step 5:   prev = curr (advance prev).
Step 6:   curr = next (advance curr).
Step 7: Set head = prev.
Step 8: Return updated head.`,
    pseudocode: `function reverse(head):
    prev = NULL
    curr = head
    while curr != NULL do:
        next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    return prev`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// Iterative 3-pointer reversal
struct Node* reverseList(struct Node* head) {
    struct Node* prev = NULL;
    struct Node* curr = head;
    struct Node* next = NULL;

    while (curr != NULL) {
        next = curr->next; // Store next node
        curr->next = prev; // Reverse current node's pointer
        prev = curr;       // Move prev forward
        curr = next;       // Move curr forward
    }
    return prev; // prev is the new head
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    // Create list: [1] -> [2] -> [3] -> [4] -> NULL
    struct Node* head = NULL;
    for (int i = 4; i >= 1; i--) {
        struct Node* n = (struct Node*)malloc(sizeof(struct Node));
        n->data = i;
        n->next = head;
        head = n;
    }

    printf("=== Singly Linked List: Reverse ===\\n");
    printf("Original list: ");
    printList(head);

    head = reverseList(head);

    printf("Reversed list: ");
    printList(head);

    while (head != NULL) {
        struct Node* t = head;
        head = head->next;
        free(t);
    }
    return 0;
}`,
    sample_input: 'List: [1] -> [2] -> [3] -> [4] -> NULL',
    sample_output: `=== Singly Linked List: Reverse ===
Original list: [1] -> [2] -> [3] -> [4] -> NULL
Reversed list: [4] -> [3] -> [2] -> [1] -> NULL`,
    dry_run: `Initial: prev = NULL, curr = [1]->[2]->[3]->[4]
• Iter 1: next = 2. curr->next = NULL. prev = 1. curr = 2. List: [1]->NULL
• Iter 2: next = 3. curr->next = 1. prev = 2. curr = 3. List: [2]->[1]->NULL
• Iter 3: next = 4. curr->next = 2. prev = 3. curr = 4. List: [3]->[2]->[1]->NULL
• Iter 4: next = NULL. curr->next = 3. prev = 4. curr = NULL.
Loop terminates. New head is prev = [4]->[3]->[2]->[1]->NULL.`,
    time_complexity: `• Time Complexity: O(n) — single pass through the list.`,
    space_complexity: `• Auxiliary Space: O(1) in-place — only 3 scalar pointers used.`,
    advantages_disadvantages: `Advantages:
• Pure in-place pointer reversal; zero memory allocation.

Disadvantages:
• Destructive: Modifies original structure.`,
    applications: `• Reversing polynomials and big numbers represented as linked lists.
• Testing palindrome linked lists.`,
    viva_questions: [
      {
        q: 'How many pointers are required to reverse a singly linked list iteratively?',
        a: 'Three pointers: prev, curr, and next.'
      }
    ],
    edge_cases: `• Empty list (head == NULL): Returns NULL.
• Single-node list: Remains unchanged safely.`,
    diagram: `Before: [ 1 ] ---> [ 2 ] ---> [ 3 ] ---> NULL
After:  NULL <--- [ 1 ] <--- [ 2 ] <--- [ 3 ] (head)`
  }
];

// Combine all linked list operations into a single exported list
module.exports = [
  ...sll_ops,
  // Doubly Linked List Operations
  {
    id: 'dll_create',
    title: 'Doubly Linked List — Creation & Structure',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'doubly_linked_list',
    subcategoryName: 'Doubly Linked List',
    keywords: ['create doubly linked list', 'dll create', 'struct dnode', 'prev next pointer c'],
    definition: 'A Doubly Linked List (DLL) is a linear data structure where each node contains three fields: data, a next pointer pointing to the successor, and a prev pointer pointing to the predecessor, enabling bidirectional traversal.',
    concept_explanation: 'Doubly linked lists overcome the primary limitation of singly linked lists by allowing bidirectional movement. In a DLL node, prev points backwards and next points forwards. For the first node, prev is NULL; for the last node, next is NULL. This allows O(1) deletion when a node pointer is given and bidirectional traversal.',
    algorithm: `Step 1: Define struct Node with int data, struct Node* prev, struct Node* next.
Step 2: Allocate memory using malloc(sizeof(struct Node)).
Step 3: Assign newNode->data = val, newNode->prev = NULL, newNode->next = NULL.
Step 4: Return newNode.`,
    pseudocode: `struct Node:
    data: Integer
    prev: Pointer to Node
    next: Pointer to Node

function createNode(val):
    newNode = allocate(Node)
    newNode.data = val
    newNode.prev = NULL
    newNode.next = NULL
    return newNode`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

struct Node* createNode(int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->prev = NULL;
    newNode->next = NULL;
    return newNode;
}

int main(void) {
    printf("=== Doubly Linked List Creation ===\\n");
    struct Node* n1 = createNode(10);
    struct Node* n2 = createNode(20);
    struct Node* n3 = createNode(30);

    // Link nodes together
    n1->next = n2;
    n2->prev = n1;
    n2->next = n3;
    n3->prev = n2;

    printf("Forward traversal: ");
    struct Node* temp = n1;
    while (temp != NULL) {
        printf("[%d] <-> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");

    // Clean up
    free(n1); free(n2); free(n3);
    return 0;
}`,
    sample_input: 'Values: 10, 20, 30',
    sample_output: `=== Doubly Linked List Creation ===
Forward traversal: [10] <-> [20] <-> [30] <-> NULL`,
    dry_run: `n1: prev=NULL, next=n2. n2: prev=n1, next=n3. n3: prev=n2, next=NULL. Bilateral links formed.`,
    time_complexity: `• Creation per node: O(1).`,
    space_complexity: `• O(1) auxiliary per node. Total O(n). Extra pointer (prev) costs 8 bytes per node on 64-bit systems.`,
    advantages_disadvantages: `Advantages:
• Bidirectional traversal (forward and backward).
• Deletion of a given node in O(1) without requiring preceding node traversal.

Disadvantages:
• Higher memory overhead (2 pointers per node instead of 1).
• More pointer assignments to maintain during insert/delete.`,
    applications: `• Web browser back and forward button navigation.
• LRU (Least Recently Used) cache implementation.
• Media player playlist next/previous track switching.`,
    viva_questions: [
      {
        q: 'What is the main advantage of a doubly linked list over a singly linked list?',
        a: 'It allows traversal in both directions and enables deleting a given node in O(1) time without searching for its predecessor.'
      }
    ],
    edge_cases: `• Empty DLL: head == NULL.`,
    diagram: `NULL <--- [ prev | 10 | next ] <===> [ prev | 20 | next ] ---> NULL`
  },
  {
    id: 'dll_insert_beginning',
    title: 'Doubly Linked List — Insert at Beginning',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'doubly_linked_list',
    subcategoryName: 'Doubly Linked List',
    keywords: ['dll insert at beginning', 'dll insert head', 'doubly linked list prepend'],
    definition: 'Inserts a new node at the beginning of a doubly linked list and updates the former head\'s prev pointer in O(1) time.',
    concept_explanation: 'Allocate newNode. Set newNode->next = head and newNode->prev = NULL. If head != NULL, set head->prev = newNode. Then update head = newNode. Executes in O(1) time.',
    algorithm: `Step 1: Allocate newNode with value.
Step 2: Set newNode->prev = NULL, newNode->next = *headRef.
Step 3: If *headRef != NULL, set (*headRef)->prev = newNode.
Step 4: Set *headRef = newNode.`,
    pseudocode: `function insertAtBeginning(head, val):
    newNode = allocate(Node, val)
    newNode.next = head
    newNode.prev = NULL
    if head != NULL then:
        head.prev = newNode
    head = newNode
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

void insertAtBeginning(struct Node** headRef, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->prev = NULL;
    newNode->next = *headRef;

    if (*headRef != NULL) {
        (*headRef)->prev = newNode;
    }
    *headRef = newNode;
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] <-> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* head = NULL;
    printf("=== Doubly Linked List: Insert at Beginning ===\\n");

    insertAtBeginning(&head, 30);
    insertAtBeginning(&head, 20);
    insertAtBeginning(&head, 10);

    printList(head);

    while (head != NULL) {
        struct Node* t = head;
        head = head->next;
        free(t);
    }
    return 0;
}`,
    sample_input: 'Insert 30, then 20, then 10 at head',
    sample_output: `=== Doubly Linked List: Insert at Beginning ===
[10] <-> [20] <-> [30] <-> NULL`,
    dry_run: `1. insert(30): head is NULL -> [30].
2. insert(20): newNode->next=30, 30->prev=20. head=20.
3. insert(10): newNode->next=20, 20->prev=10. head=10.`,
    time_complexity: `• Time Complexity: O(1) constant time.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages: Instantaneous O(1) prepend. Disadvantages: Requires 4 pointer operations.`,
    applications: `• Most recently visited cache inserts.`,
    viva_questions: [{ q: 'How many pointer updates occur when inserting at the head of a DLL?', a: 'Up to 4 pointer assignments: newNode->prev, newNode->next, head->prev, and head pointer.' }],
    edge_cases: `• Empty DLL: Handled by if (*headRef != NULL) guard.`,
    diagram: `[ newNode: 10 ] <===> [ head: 20 ] <===> [ 30 ]`
  },
  {
    id: 'dll_insert_end',
    title: 'Doubly Linked List — Insert at End',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'doubly_linked_list',
    subcategoryName: 'Doubly Linked List',
    keywords: ['dll insert at end', 'dll append', 'doubly linked list append'],
    definition: 'Appends a new node to the tail of a doubly linked list, connecting bidirectional links with the former last node.',
    concept_explanation: 'Traverse to the last node (temp->next == NULL). Set temp->next = newNode and newNode->prev = temp. Set newNode->next = NULL. If list was empty, newNode becomes head. O(n) without tail pointer; O(1) with tail pointer.',
    algorithm: `Step 1: Allocate newNode with value and newNode->next = NULL.
Step 2: If head == NULL, set newNode->prev = NULL, head = newNode, return.
Step 3: Traverse to last node temp.
Step 4: Set temp->next = newNode, newNode->prev = temp.`,
    pseudocode: `function insertAtEnd(head, val):
    newNode = allocate(Node, val)
    newNode.next = NULL
    if head == NULL then:
        newNode.prev = NULL
        return newNode
    temp = head
    while temp.next != NULL do: temp = temp.next
    temp.next = newNode
    newNode.prev = temp
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

void insertAtEnd(struct Node** headRef, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;

    if (*headRef == NULL) {
        newNode->prev = NULL;
        *headRef = newNode;
        return;
    }

    struct Node* temp = *headRef;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
    newNode->prev = temp;
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] <-> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* head = NULL;
    printf("=== Doubly Linked List: Insert at End ===\\n");
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    printList(head);

    while (head != NULL) {
        struct Node* t = head;
        head = head->next;
        free(t);
    }
    return 0;
}`,
    sample_input: 'Append: 10, 20, 30',
    sample_output: `=== Doubly Linked List: Insert at End ===
[10] <-> [20] <-> [30] <-> NULL`,
    dry_run: `temp walks to 20. temp->next = 30. 30->prev = 20. 30->next = NULL.`,
    time_complexity: `• O(n) without tail pointer; O(1) with tail pointer.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages: Natural FIFO append.`,
    applications: `• Double-ended queue (Deque) tail insertion.`,
    viva_questions: [{ q: 'Why is maintaining a tail pointer useful in a DLL?', a: 'It enables O(1) append and O(1) pop from the end without traversing.' }],
    edge_cases: `• Empty list handled safely.`,
    diagram: `[ 20 ] <===> [ temp: 30 ] <===> [ newNode: 40 ] ---> NULL`
  },
  {
    id: 'dll_insert_pos',
    title: 'Doubly Linked List — Insert at a Specific Position',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'doubly_linked_list',
    subcategoryName: 'Doubly Linked List',
    keywords: ['dll insert position', 'dll insert index', 'doubly linked list insert middle'],
    definition: 'Inserts a node at 1-based index pos in a doubly linked list, updating 4 surrounding pointers (prev and next links).',
    concept_explanation: 'Traverse pos - 2 steps to node temp. The new node will be inserted between temp and temp->next. Set newNode->next = temp->next, newNode->prev = temp, temp->next->prev = newNode (if temp->next != NULL), and temp->next = newNode. If pos == 1, delegates to insertAtBeginning.',
    algorithm: `Step 1: If pos == 1, insert at beginning.
Step 2: Traverse to temp at pos - 1.
Step 3: Allocate newNode.
Step 4: Set newNode->next = temp->next, newNode->prev = temp.
Step 5: If temp->next != NULL, set temp->next->prev = newNode.
Step 6: Set temp->next = newNode.`,
    pseudocode: `function insertAtPosition(head, pos, val):
    if pos == 1 then return insertAtBeginning(head, val)
    temp = head
    for i from 1 to pos - 2 do: temp = temp.next
    newNode = allocate(Node, val)
    newNode.next = temp.next
    newNode.prev = temp
    if temp.next != NULL then temp.next.prev = newNode
    temp.next = newNode
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

void insertAtPos(struct Node** headRef, int val, int pos) {
    if (pos < 1) return;
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;

    if (pos == 1) {
        newNode->prev = NULL;
        newNode->next = *headRef;
        if (*headRef != NULL) (*headRef)->prev = newNode;
        *headRef = newNode;
        return;
    }

    struct Node* temp = *headRef;
    for (int i = 1; i < pos - 1 && temp != NULL; i++) {
        temp = temp->next;
    }

    if (temp == NULL) {
        printf("Position %d out of bounds!\\n", pos);
        free(newNode);
        return;
    }

    newNode->next = temp->next;
    newNode->prev = temp;
    if (temp->next != NULL) {
        temp->next->prev = newNode;
    }
    temp->next = newNode;
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] <-> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* head = NULL;
    printf("=== Doubly Linked List: Insert at Position ===\\n");
    insertAtPos(&head, 10, 1);
    insertAtPos(&head, 30, 2);
    insertAtPos(&head, 20, 2); // Insert 20 at position 2
    printList(head);

    while (head != NULL) {
        struct Node* t = head;
        head = head->next;
        free(t);
    }
    return 0;
}`,
    sample_input: 'Insert 10 at 1, 30 at 2, 20 at 2',
    sample_output: `=== Doubly Linked List: Insert at Position ===
[10] <-> [20] <-> [30] <-> NULL`,
    dry_run: `temp is 10. temp->next is 30. newNode(20)->next = 30. 20->prev = 10. 30->prev = 20. 10->next = 20.`,
    time_complexity: `• O(pos) time. O(1) auxiliary space.`,
    space_complexity: `• O(1).`,
    advantages_disadvantages: `Advantages: Bilateral link integrity preserved.`,
    applications: `• Inserting playlist track at a specific index.`,
    viva_questions: [{ q: 'How many pointer adjustments are required to insert into the middle of a DLL?', a: 'Four pointer adjustments: newNode->next, newNode->prev, temp->next->prev, and temp->next.' }],
    edge_cases: `• Insertion at tail (temp->next == NULL): Guard prevents dereferencing NULL->prev.`,
    diagram: `[ temp: 10 ] <==========> [ 30 ]
       ^\\                     /^
         \\-> [ newNode: 20 ] -/`
  },
  {
    id: 'dll_delete_beginning',
    title: 'Doubly Linked List — Delete from Beginning',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'doubly_linked_list',
    subcategoryName: 'Doubly Linked List',
    keywords: ['dll delete beginning', 'dll delete head', 'doubly linked list pop front'],
    definition: 'Removes the first node of a doubly linked list, updates head to the second node, and sets the new head\'s prev pointer to NULL.',
    concept_explanation: 'If head is NULL, return underflow. Otherwise store temp = head, update head = head->next. If head != NULL, set head->prev = NULL. Finally, free(temp). Executes in O(1) time.',
    algorithm: `Step 1: If head == NULL, return underflow.
Step 2: Store temp = head.
Step 3: Update head = head->next.
Step 4: If head != NULL, set head->prev = NULL.
Step 5: Free temp.`,
    pseudocode: `function deleteFromBeginning(head):
    if head == NULL then error("Underflow")
    temp = head
    head = head.next
    if head != NULL then head.prev = NULL
    free(temp)
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

void deleteBeginning(struct Node** headRef) {
    if (*headRef == NULL) {
        printf("Underflow! DLL is empty.\\n");
        return;
    }
    struct Node* temp = *headRef;
    *headRef = (*headRef)->next;
    if (*headRef != NULL) {
        (*headRef)->prev = NULL;
    }
    printf("Deleted: %d\\n", temp->data);
    free(temp);
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] <-> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));
    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));
    n1->data = 10; n1->prev = NULL; n1->next = n2;
    n2->data = 20; n2->prev = n1; n2->next = NULL;
    struct Node* head = n1;

    printf("=== Doubly Linked List: Delete from Beginning ===\\n");
    printList(head);
    deleteBeginning(&head);
    printList(head);
    deleteBeginning(&head);
    printList(head);

    return 0;
}`,
    sample_input: 'DLL: [10] <-> [20] <-> NULL. Delete twice.',
    sample_output: `=== Doubly Linked List: Delete from Beginning ===
[10] <-> [20] <-> NULL
Deleted: 10
[20] <-> NULL
Deleted: 20
NULL`,
    dry_run: `temp = 10. head = 20. 20->prev = NULL. free(10). List: [20]->NULL.`,
    time_complexity: `• Time Complexity: O(1) constant time.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages: Instant O(1) removal. Disadvantages: None.`,
    applications: `• Deque pop_front().`,
    viva_questions: [{ q: 'Why must head->prev be set to NULL after deleting the first node?', a: 'Because the new head has no predecessor; leaving a dangling pointer causes undefined behavior.' }],
    edge_cases: `• Single node list: Leaves head == NULL safely without dereferencing head->prev.`,
    diagram: `(freed) [ 10 ]  x-- [ head: 20 ] <===> [ 30 ]`
  },
  {
    id: 'dll_delete_end',
    title: 'Doubly Linked List — Delete from End',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'doubly_linked_list',
    subcategoryName: 'Doubly Linked List',
    keywords: ['dll delete end', 'dll delete tail', 'doubly linked list pop back'],
    definition: 'Removes the last node of a doubly linked list and sets the predecessor\'s next pointer to NULL in O(n) without tail pointer or O(1) with tail pointer.',
    concept_explanation: 'Traverse to the last node temp (temp->next == NULL). Set temp->prev->next = NULL. Then free(temp). If only one node exists, free head and set head = NULL.',
    algorithm: `Step 1: If head == NULL, return underflow.
Step 2: If head->next == NULL, free(head), head = NULL, return.
Step 3: Traverse to last node temp.
Step 4: Set temp->prev->next = NULL.
Step 5: Free temp.`,
    pseudocode: `function deleteFromEnd(head):
    if head == NULL then return NULL
    if head.next == NULL then:
        free(head)
        return NULL
    temp = head
    while temp.next != NULL do: temp = temp.next
    temp.prev.next = NULL
    free(temp)
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

void deleteEnd(struct Node** headRef) {
    if (*headRef == NULL) {
        printf("Underflow!\\n");
        return;
    }
    struct Node* temp = *headRef;
    if (temp->next == NULL) {
        printf("Deleted only node: %d\\n", temp->data);
        free(temp);
        *headRef = NULL;
        return;
    }
    while (temp->next != NULL) {
        temp = temp->next;
    }
    printf("Deleted last node: %d\\n", temp->data);
    temp->prev->next = NULL;
    free(temp);
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] <-> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));
    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));
    n1->data = 10; n1->prev = NULL; n1->next = n2;
    n2->data = 20; n2->prev = n1; n2->next = NULL;
    struct Node* head = n1;

    printf("=== Doubly Linked List: Delete from End ===\\n");
    printList(head);
    deleteEnd(&head);
    printList(head);
    deleteEnd(&head);
    printList(head);

    return 0;
}`,
    sample_input: 'DLL: [10] <-> [20]. Delete twice.',
    sample_output: `=== Doubly Linked List: Delete from End ===
[10] <-> [20] <-> NULL
Deleted last node: 20
[10] <-> NULL
Deleted only node: 10
NULL`,
    dry_run: `temp walks to 20. 20->prev is 10. 10->next = NULL. free(20).`,
    time_complexity: `• O(n) without tail pointer; O(1) with tail pointer.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages: Clean tail removal with prev pointer.`,
    applications: `• Deque pop_back().`,
    viva_questions: [{ q: 'Why is delete from end O(1) in a DLL with tail pointer, but O(n) in a SLL with tail pointer?', a: 'Because a DLL tail node can access its predecessor directly via tail->prev, whereas SLL cannot move backwards.' }],
    edge_cases: `• Single node handled safely.`,
    diagram: `[ 10 | next: NULL ] <===x=== [ temp: 20 (freed) ]`
  },
  {
    id: 'dll_delete_node',
    title: 'Doubly Linked List — Delete a Specific Node',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'doubly_linked_list',
    subcategoryName: 'Doubly Linked List',
    keywords: ['dll delete specific node', 'dll delete node pointer', 'doubly linked list delete node'],
    definition: 'Deletes a given node pointer del from a doubly linked list in O(1) time without requiring list traversal.',
    concept_explanation: 'Given a pointer del directly, if del is head, update head = del->next. If del->prev != NULL, set del->prev->next = del->next. If del->next != NULL, set del->next->prev = del->prev. Finally, free(del). Because del contains pointers to both neighbors, no search is required—executing in O(1) time.',
    algorithm: `Step 1: If head == NULL or del == NULL, return.
Step 2: If head == del, set head = del->next.
Step 3: If del->prev != NULL, set del->prev->next = del->next.
Step 4: If del->next != NULL, set del->next->prev = del->prev.
Step 5: Free del.`,
    pseudocode: `function deleteNode(head, del):
    if head == NULL or del == NULL then return head
    if head == del then head = del.next
    if del.prev != NULL then del.prev.next = del.next
    if del.next != NULL then del.next.prev = del.prev
    free(del)
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

void deleteNode(struct Node** headRef, struct Node* del) {
    if (*headRef == NULL || del == NULL) return;

    // If node to be deleted is head
    if (*headRef == del) {
        *headRef = del->next;
    }

    // Change next only if node to be deleted is NOT the last node
    if (del->next != NULL) {
        del->next->prev = del->prev;
    }

    // Change prev only if node to be deleted is NOT the first node
    if (del->prev != NULL) {
        del->prev->next = del->next;
    }

    printf("Deallocated node containing: %d\\n", del->data);
    free(del);
}

void printList(struct Node* node) {
    while (node != NULL) {
        printf("[%d] <-> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));
    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));
    struct Node* n3 = (struct Node*)malloc(sizeof(struct Node));
    n1->data = 10; n1->prev = NULL; n1->next = n2;
    n2->data = 20; n2->prev = n1; n2->next = n3;
    n3->data = 30; n3->prev = n2; n3->next = NULL;
    struct Node* head = n1;

    printf("=== Doubly Linked List: Delete Given Node Pointer ===\\n");
    printList(head);

    deleteNode(&head, n2); // Delete middle node directly in O(1)
    printList(head);

    deleteNode(&head, n1); // Delete head directly in O(1)
    printList(head);

    free(n3);
    return 0;
}`,
    sample_input: 'DLL: [10, 20, 30]. Delete node n2 (20) directly.',
    sample_output: `=== Doubly Linked List: Delete Given Node Pointer ===
[10] <-> [20] <-> [30] <-> NULL
Deallocated node containing: 20
[10] <-> [30] <-> NULL
Deallocated node containing: 10
[30] <-> NULL`,
    dry_run: `Delete n2:
• del->prev is n1. del->next is n3.
• n1->next = n3. n3->prev = n1. free(n2).
Result: [10] <-> [30] <-> NULL in O(1)!`,
    time_complexity: `• Time Complexity: O(1) strictly — No loops.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages: Instant O(1) deletion given a node pointer. Disadvantages: Requires double-link safety checks.`,
    applications: `• LRU Cache node eviction in O(1) when linked to hash table map.`,
    viva_questions: [{ q: 'Why is deleteNode O(1) in DLL but O(n) in SLL?', a: 'Because del->prev gives direct access to the preceding node without traversing from head.' }],
    edge_cases: `• del is head or tail: Covered by NULL checks on del->prev and del->next.`,
    diagram: `[ n1: 10 ] <========================> [ n3: 30 ]
        x-- [ del: n2 (20) ] --x`
  },
  {
    id: 'dll_traverse_forward',
    title: 'Doubly Linked List — Forward Traversal',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'doubly_linked_list',
    subcategoryName: 'Doubly Linked List',
    keywords: ['dll forward traversal', 'dll traverse forward', 'doubly linked list display'],
    definition: 'Forward traversal visits nodes sequentially from head to tail using next pointers in O(n) time.',
    concept_explanation: 'Starting at head, follow next pointers until NULL is encountered, visiting each node.',
    algorithm: `Step 1: Set temp = head. Step 2: While temp != NULL: print temp->data, temp = temp->next.`,
    pseudocode: `function traverseForward(head):
    temp = head
    while temp != NULL do:
        print(temp.data)
        temp = temp.next`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* prev; struct Node* next; };

void traverseForward(struct Node* head) {
    struct Node* temp = head;
    printf("Forward: ");
    while (temp != NULL) {
        printf("[%d] -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));
    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));
    n1->data = 100; n1->prev = NULL; n1->next = n2;
    n2->data = 200; n2->prev = n1; n2->next = NULL;

    traverseForward(n1);
    free(n1); free(n2);
    return 0;
}`,
    sample_input: 'DLL: [100, 200]',
    sample_output: 'Forward: [100] -> [200] -> NULL',
    dry_run: `temp visits 100, then 200, then NULL.`,
    time_complexity: `• O(n) time, O(1) space.`,
    space_complexity: `• O(1).`,
    advantages_disadvantages: `Advantages: Natural sequential access.`,
    applications: `• Standard list display.`,
    viva_questions: [{ q: 'What marks the end of a forward traversal in DLL?', a: 'temp == NULL.' }],
    edge_cases: `• Empty list handled safely.`,
    diagram: `[ 100 ] ===> [ 200 ] ===> NULL`
  },
  {
    id: 'dll_traverse_backward',
    title: 'Doubly Linked List — Backward Traversal',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'doubly_linked_list',
    subcategoryName: 'Doubly Linked List',
    keywords: ['dll backward traversal', 'dll traverse backward', 'doubly linked list reverse print'],
    definition: 'Backward traversal navigates from tail to head using prev pointers in O(n) time.',
    concept_explanation: 'First find the tail node by traversing to the end. Then iterate backwards using temp = temp->prev until temp == NULL. In a DLL with a tail pointer, backward traversal begins instantly in O(1) setup time.',
    algorithm: `Step 1: Traverse to last node tail (temp->next == NULL).
Step 2: While tail != NULL: print tail->data, tail = tail->prev.`,
    pseudocode: `function traverseBackward(head):
    tail = head
    while tail.next != NULL do: tail = tail.next
    while tail != NULL do:
        print(tail.data)
        tail = tail.prev`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* prev; struct Node* next; };

void traverseBackward(struct Node* head) {
    if (head == NULL) return;
    struct Node* tail = head;
    while (tail->next != NULL) tail = tail->next;

    printf("Backward: ");
    while (tail != NULL) {
        printf("[%d] -> ", tail->data);
        tail = tail->prev;
    }
    printf("NULL\\n");
}

int main(void) {
    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));
    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));
    struct Node* n3 = (struct Node*)malloc(sizeof(struct Node));
    n1->data = 10; n1->prev = NULL; n1->next = n2;
    n2->data = 20; n2->prev = n1; n2->next = n3;
    n3->data = 30; n3->prev = n2; n3->next = NULL;

    traverseBackward(n1);
    free(n1); free(n2); free(n3);
    return 0;
}`,
    sample_input: 'DLL: [10, 20, 30]',
    sample_output: 'Backward: [30] -> [20] -> [10] -> NULL',
    dry_run: `tail reaches 30. Prints 30 -> moves to 20 -> prints 20 -> moves to 10 -> prints 10 -> terminates.`,
    time_complexity: `• O(n) time, O(1) space.`,
    space_complexity: `• O(1).`,
    advantages_disadvantages: `Advantages: Native backwards navigation without recursion or reversing list.`,
    applications: `• Undo history traversal in editors.`,
    viva_questions: [{ q: 'Can a singly linked list perform backward traversal in O(1) space?', a: 'No, SLL requires O(n) stack space or reversing the list pointers.' }],
    edge_cases: `• Empty list handled safely.`,
    diagram: `NULL <=== [ 10 ] <=== [ 20 ] <=== [ tail: 30 ]`
  },
  {
    id: 'dll_search',
    title: 'Doubly Linked List — Search an Element',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'doubly_linked_list',
    subcategoryName: 'Doubly Linked List',
    keywords: ['dll search', 'search doubly linked list', 'find key dll'],
    definition: 'Locates a target key in a doubly linked list, returning its node pointer or index in O(n) time.',
    concept_explanation: 'Traverse from head comparing temp->data with key. Return index if found, -1 if absent.',
    algorithm: `Step 1: Set temp = head, pos = 1. Step 2: While temp != NULL: if temp->data == key return pos; temp = temp->next, pos++. Step 3: Return -1.`,
    pseudocode: `function search(head, key):
    temp = head; pos = 1
    while temp != NULL do:
        if temp.data == key then return pos
        temp = temp.next; pos = pos + 1
    return -1`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* prev; struct Node* next; };

int searchDLL(struct Node* head, int key) {
    struct Node* temp = head;
    int pos = 1;
    while (temp != NULL) {
        if (temp->data == key) return pos;
        temp = temp->next;
        pos++;
    }
    return -1;
}

int main(void) {
    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));
    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));
    n1->data = 50; n1->prev = NULL; n1->next = n2;
    n2->data = 100; n2->prev = n1; n2->next = NULL;

    printf("Search 100: Position %d\\n", searchDLL(n1, 100));
    printf("Search 999: %d (Not found)\\n", searchDLL(n1, 999));
    free(n1); free(n2);
    return 0;
}`,
    sample_input: 'DLL: [50, 100]. Search 100 and 999',
    sample_output: `Search 100: Position 2
Search 999: -1 (Not found)`,
    dry_run: `Node 1 (50) != 100. Node 2 (100) == 100 -> Returns 2.`,
    time_complexity: `• O(n) time, O(1) space.`,
    space_complexity: `• O(1).`,
    advantages_disadvantages: `Advantages: Can also be searched bidirectionally from head and tail.`,
    applications: `• Cache key lookup.`,
    viva_questions: [{ q: 'Can a doubly linked list be searched from both ends?', a: 'Yes, if both head and tail pointers are available, two pointers can search inwards simultaneously.' }],
    edge_cases: `• Absent key returns -1 safely.`,
    diagram: `[ 50 ] <===> [ 100 (MATCH) ] ---> NULL`
  },
  // Circular Linked List Operations (6 ops)
  {
    id: 'cll_create',
    title: 'Circular Linked List — Creation & Circular Linkage',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'circular_linked_list',
    subcategoryName: 'Circular Linked List',
    keywords: ['create circular linked list', 'cll create', 'circular linked list structure'],
    definition: 'A Circular Linked List (CLL) is a linked list where the last node points back to the first node (head), forming a continuous circular ring with no NULL terminator.',
    concept_explanation: 'In a circular linked list, no node has a next pointer equal to NULL. Traversal terminates when a pointer returns to head. A common optimization keeps a tail pointer pointing to the last node; this allows accessing head in O(1) via tail->next, enabling O(1) insertion at both beginning and end.',
    algorithm: `Step 1: Allocate newNode. Step 2: Set newNode->data = val. Step 3: Set newNode->next = newNode (points to itself). Step 4: Return newNode as head.`,
    pseudocode: `function createCLL(val):
    newNode = allocate(Node, val)
    newNode.next = newNode
    return newNode`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

struct Node* createCircular(int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = newNode; // Points to itself
    return newNode;
}

int main(void) {
    printf("=== Circular Linked List Creation ===\\n");
    struct Node* head = createCircular(10);
    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));
    n2->data = 20;
    n2->next = head;
    head->next = n2;

    printf("CLL traversal: ");
    struct Node* temp = head;
    if (head != NULL) {
        do {
            printf("[%d] -> ", temp->data);
            temp = temp->next;
        } while (temp != head);
    }
    printf("(Back to Head %d)\\n", head->data);

    free(head); free(n2);
    return 0;
}`,
    sample_input: 'CLL with 10 and 20',
    sample_output: `=== Circular Linked List Creation ===
CLL traversal: [10] -> [20] -> (Back to Head 10)`,
    dry_run: `head is 10. 10->next is 20. 20->next points back to 10. Loop terminates when temp == head.`,
    time_complexity: `• O(1) creation time.`,
    space_complexity: `• O(1) auxiliary per node.`,
    advantages_disadvantages: `Advantages: Any node can be a starting point; continuous cycling without NULL checks. Disadvantages: Risk of infinite loops if termination condition is incorrect.`,
    applications: `• Round-robin OS CPU task schedulers.`,
    viva_questions: [{ q: 'How does the termination condition in a CLL differ from a SLL?', a: 'In SLL, loop terminates when temp == NULL; in CLL, loop terminates when temp == head (using do-while).' }],
    edge_cases: `• Single node points to itself (head->next == head).`,
    diagram: `[ head: 10 ] ---> [ 20 ]
        ^               |
        \\---------------/`
  },
  {
    id: 'cll_insert_beginning',
    title: 'Circular Linked List — Insert at Beginning',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'circular_linked_list',
    subcategoryName: 'Circular Linked List',
    keywords: ['cll insert beginning', 'cll insert head', 'circular linked list insert start'],
    definition: 'Inserts a new node at the beginning of a circular linked list, updating the last node\'s next pointer to maintain the ring.',
    concept_explanation: 'Allocate newNode. If head is NULL, set newNode->next = newNode, head = newNode. Otherwise find last node (temp->next == head), set newNode->next = head, temp->next = newNode, and update head = newNode. (With a tail pointer, this is O(1)).',
    algorithm: `Step 1: Allocate newNode. Step 2: If head == NULL: newNode->next = newNode, head = newNode, return. Step 3: Traverse to last node temp (temp->next == head). Step 4: Set newNode->next = head, temp->next = newNode, head = newNode.`,
    pseudocode: `function insertAtBeginning(head, val):
    newNode = allocate(Node, val)
    if head == NULL then:
        newNode.next = newNode; return newNode
    temp = head
    while temp.next != head do: temp = temp.next
    newNode.next = head
    temp.next = newNode
    return newNode`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

void insertBeginning(struct Node** headRef, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;

    if (*headRef == NULL) {
        newNode->next = newNode;
        *headRef = newNode;
        return;
    }

    struct Node* temp = *headRef;
    while (temp->next != *headRef) {
        temp = temp->next;
    }
    newNode->next = *headRef;
    temp->next = newNode;
    *headRef = newNode; // New node becomes head
}

void printCLL(struct Node* head) {
    if (head == NULL) return;
    struct Node* temp = head;
    do {
        printf("[%d] -> ", temp->data);
        temp = temp->next;
    } while (temp != head);
    printf("(head)\\n");
}

int main(void) {
    struct Node* head = NULL;
    insertBeginning(&head, 30);
    insertBeginning(&head, 20);
    insertBeginning(&head, 10);
    printCLL(head);
    return 0;
}`,
    sample_input: 'Insert 30, 20, 10 into CLL',
    sample_output: '[10] -> [20] -> [30] -> (head)',
    dry_run: `Last node (30)->next points to new head (10). New head points to 20. Ring preserved.`,
    time_complexity: `• O(n) without tail pointer; O(1) with tail pointer.`,
    space_complexity: `• O(1) auxiliary space.`,
    advantages_disadvantages: `Advantages: Instant prepend when tail pointer is kept.`,
    applications: `• Round-robin queue prepends.`,
    viva_questions: [{ q: 'Why does insert at beginning take O(n) in a CLL without tail pointer?', a: 'Because we must traverse to the last node to update its next pointer to the new head.' }],
    edge_cases: `• Empty list handled safely.`,
    diagram: `[ newNode: 10 ] ---> [ 20 ] ---> [ last: 30 ]
          ^                                   |
          \\-----------------------------------/`
  },
  {
    id: 'cll_insert_end',
    title: 'Circular Linked List — Insert at End',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'circular_linked_list',
    subcategoryName: 'Circular Linked List',
    keywords: ['cll insert end', 'cll append', 'circular linked list append'],
    definition: 'Appends a new node to the end of a circular linked list, linking it to the head to maintain circularity.',
    concept_explanation: 'Traverse to last node temp (temp->next == head). Set temp->next = newNode, and newNode->next = head.',
    algorithm: `Step 1: Allocate newNode. Step 2: If head == NULL: newNode->next = newNode, head = newNode, return. Step 3: Traverse while temp->next != head: temp = temp->next. Step 4: Set temp->next = newNode, newNode->next = head.`,
    pseudocode: `function insertAtEnd(head, val):
    newNode = allocate(Node, val)
    if head == NULL then: newNode.next = newNode; return newNode
    temp = head
    while temp.next != head do: temp = temp.next
    temp.next = newNode
    newNode.next = head
    return head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

void insertEnd(struct Node** headRef, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;

    if (*headRef == NULL) {
        newNode->next = newNode;
        *headRef = newNode;
        return;
    }
    struct Node* temp = *headRef;
    while (temp->next != *headRef) temp = temp->next;
    temp->next = newNode;
    newNode->next = *headRef;
}

void printCLL(struct Node* head) {
    if (head == NULL) return;
    struct Node* temp = head;
    do {
        printf("[%d] -> ", temp->data);
        temp = temp->next;
    } while (temp != head);
    printf("(head)\\n");
}

int main(void) {
    struct Node* head = NULL;
    insertEnd(&head, 10);
    insertEnd(&head, 20);
    insertEnd(&head, 30);
    printCLL(head);
    return 0;
}`,
    sample_input: 'Append 10, 20, 30 to CLL',
    sample_output: '[10] -> [20] -> [30] -> (head)',
    dry_run: `Node 20 points to 30. 30->next points back to head (10).`,
    time_complexity: `• O(n) without tail pointer; O(1) with tail pointer.`,
    space_complexity: `• O(1).`,
    advantages_disadvantages: `Advantages: Ring closure guaranteed.`,
    applications: `• Media playlist loop play.`,
    viva_questions: [{ q: 'How does maintaining a tail pointer make append O(1) in CLL?', a: 'Because tail->next is head, so we attach newNode after tail and update tail = newNode in O(1).' }],
    edge_cases: `• Empty list handled safely.`,
    diagram: `[ head: 10 ] ---> [ 20 ] ---> [ newNode: 30 ]
          ^                                   |
          \\-----------------------------------/`
  },
  {
    id: 'cll_delete_node',
    title: 'Circular Linked List — Delete a Node',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'circular_linked_list',
    subcategoryName: 'Circular Linked List',
    keywords: ['cll delete node', 'delete circular linked list', 'remove node cll'],
    definition: 'Deletes a node by value from a circular linked list, updating predecessor pointers and head if necessary.',
    concept_explanation: 'If list is empty, return. If deleting head, traverse to last node, update last->next = head->next, set new head, and free old head. If deleting an internal node, maintain prev and curr pointers, bridge prev->next = curr->next, and free curr.',
    algorithm: `Step 1: If head == NULL, return underflow.
Step 2: If head is only node and matches key: free(head), head = NULL, return.
Step 3: If head matches key: find last node, last->next = head->next, temp = head, head = head->next, free(temp).
Step 4: Else traverse with prev and curr: if curr->data == key, prev->next = curr->next, free(curr).`,
    pseudocode: `function deleteCLL(head, key):
    if head == NULL then return NULL
    // Handle head deletion and internal deletion with circular loop`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

void deleteNodeCLL(struct Node** headRef, int key) {
    if (*headRef == NULL) return;
    struct Node *curr = *headRef, *prev = NULL;

    // Check if head is the node to delete
    if (curr->data == key) {
        if (curr->next == *headRef) { // Only 1 node
            free(curr);
            *headRef = NULL;
            return;
        }
        struct Node* last = *headRef;
        while (last->next != *headRef) last = last->next;
        last->next = curr->next;
        *headRef = curr->next;
        free(curr);
        return;
    }

    // Search for key
    while (curr->next != *headRef && curr->data != key) {
        prev = curr;
        curr = curr->next;
    }

    if (curr->data == key) {
        prev->next = curr->next;
        free(curr);
    } else {
        printf("Key %d not found!\\n", key);
    }
}

void printCLL(struct Node* head) {
    if (head == NULL) { printf("CLL is empty.\\n"); return; }
    struct Node* temp = head;
    do {
        printf("[%d] -> ", temp->data);
        temp = temp->next;
    } while (temp != head);
    printf("(head)\\n");
}

int main(void) {
    struct Node* head = NULL;
    // Build CLL with 10, 20, 30
    struct Node *n1 = malloc(sizeof(struct Node)), *n2 = malloc(sizeof(struct Node)), *n3 = malloc(sizeof(struct Node));
    n1->data = 10; n1->next = n2;
    n2->data = 20; n2->next = n3;
    n3->data = 30; n3->next = n1;
    head = n1;

    printCLL(head);
    deleteNodeCLL(&head, 20); // Delete middle
    printCLL(head);
    deleteNodeCLL(&head, 10); // Delete head
    printCLL(head);

    return 0;
}`,
    sample_input: 'CLL: [10, 20, 30]. Delete 20, then 10.',
    sample_output: `[10] -> [20] -> [30] -> (head)
[10] -> [30] -> (head)
[30] -> (head)`,
    dry_run: `Delete 20: prev is 10, curr is 20. 10->next = 30. free(20). Ring remains intact.`,
    time_complexity: `• O(n) worst-case time, O(1) space.`,
    space_complexity: `• O(1).`,
    advantages_disadvantages: `Advantages: Preserves circular topology after removal.`,
    applications: `• Removing an expired process from circular scheduling table.`,
    viva_questions: [{ q: 'What extra step is required when deleting the head node in a CLL?', a: 'The last node\'s next pointer must be updated to point to the new head node.' }],
    edge_cases: `• Only 1 node in list: Clears head to NULL safely.`,
    diagram: `[ 10 ] -------------> [ 30 ]
      ^                   |
      \\-------------------/`
  },
  {
    id: 'cll_display',
    title: 'Circular Linked List — Display / Traverse',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'circular_linked_list',
    subcategoryName: 'Circular Linked List',
    keywords: ['cll display', 'cll traverse', 'print circular linked list'],
    definition: 'Traverses and prints each element of a circular linked list once using a do-while loop in O(n) time.',
    concept_explanation: 'Because a CLL has no NULL pointer, a while (temp != NULL) loop would run infinitely. Instead, initialize temp = head and use a do-while loop that continues while temp != head.',
    algorithm: `Step 1: If head == NULL, print empty and return.
Step 2: Set temp = head.
Step 3: Do: print temp->data, temp = temp->next while temp != head.`,
    pseudocode: `function printCLL(head):
    if head == NULL then return
    temp = head
    do:
        print(temp.data)
        temp = temp.next
    while temp != head`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

void displayCLL(struct Node* head) {
    if (head == NULL) {
        printf("List is empty.\\n");
        return;
    }
    struct Node* temp = head;
    printf("CLL: ");
    do {
        printf("[%d] -> ", temp->data);
        temp = temp->next;
    } while (temp != head);
    printf("(head: %d)\\n", head->data);
}

int main(void) {
    struct Node *n1 = malloc(sizeof(struct Node)), *n2 = malloc(sizeof(struct Node));
    n1->data = 10; n1->next = n2;
    n2->data = 20; n2->next = n1;
    displayCLL(n1);
    free(n1); free(n2);
    return 0;
}`,
    sample_input: 'CLL: [10, 20]',
    sample_output: 'CLL: [10] -> [20] -> (head: 10)',
    dry_run: `temp starts at 10. Prints 10 -> temp moves to 20 -> prints 20 -> temp moves to 10 == head -> terminates.`,
    time_complexity: `• O(n) time, O(1) space.`,
    space_complexity: `• O(1).`,
    advantages_disadvantages: `Advantages: Traverses every node exactly once.`,
    applications: `• Viewing active loop processes.`,
    viva_questions: [{ q: 'Why is do-while preferred over while for CLL traversal?', a: 'Because temp is initially equal to head. A standard while (temp != head) loop would evaluate to false immediately and not execute.' }],
    edge_cases: `• Empty list handled safely.`,
    diagram: `[ 10 ] -> [ 20 ] -> (back to 10)`
  },
  {
    id: 'cll_search',
    title: 'Circular Linked List — Search an Element',
    category: 'linked_lists',
    categoryName: 'Linked Lists',
    subcategory: 'circular_linked_list',
    subcategoryName: 'Circular Linked List',
    keywords: ['cll search', 'find circular linked list', 'search cll element'],
    definition: 'Sequentially searches for target key in a circular linked list, terminating when found or when the cycle completes back to head.',
    concept_explanation: 'Use a do-while loop to inspect temp->data == key. Track position with pos counter.',
    algorithm: `Step 1: If head == NULL return -1. Step 2: Set temp = head, pos = 1. Step 3: Do: if temp->data == key return pos; temp = temp->next, pos++ while temp != head. Step 4: Return -1.`,
    pseudocode: `function searchCLL(head, key):
    if head == NULL then return -1
    temp = head; pos = 1
    do:
        if temp.data == key then return pos
        temp = temp.next; pos = pos + 1
    while temp != head
    return -1`,
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node { int data; struct Node* next; };

int searchCLL(struct Node* head, int key) {
    if (head == NULL) return -1;
    struct Node* temp = head;
    int pos = 1;
    do {
        if (temp->data == key) return pos;
        temp = temp->next;
        pos++;
    } while (temp != head);
    return -1;
}

int main(void) {
    struct Node *n1 = malloc(sizeof(struct Node)), *n2 = malloc(sizeof(struct Node));
    n1->data = 15; n1->next = n2;
    n2->data = 30; n2->next = n1;
    printf("Search 30: Pos %d\\n", searchCLL(n1, 30));
    printf("Search 99: %d (Not found)\\n", searchCLL(n1, 99));
    free(n1); free(n2);
    return 0;
}`,
    sample_input: 'CLL: [15, 30]. Search 30 and 99',
    sample_output: `Search 30: Pos 2
Search 99: -1 (Not found)`,
    dry_run: `temp 15 != 30. temp 30 == 30 -> returns pos 2.`,
    time_complexity: `• O(n) time, O(1) space.`,
    space_complexity: `• O(1).`,
    advantages_disadvantages: `Advantages: Circular bounds guard against infinite loop.`,
    applications: `• Searching game player turns.`,
    viva_questions: [{ q: 'What happens if you search for a non-existent element in CLL?', a: 'The loop completes one full rotation back to head and returns -1.' }],
    edge_cases: `• Key not present: Safely completes 1 cycle.`,
    diagram: `[ 15 ] -> [ 30 (MATCH) ] -> (head)`
  }
];
