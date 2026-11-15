/**
 * Linked Lists Module
 * Singly, Doubly, Circular Linked Lists, Insertion, Deletion, Reversal, and Master Guide.
 */

module.exports = {
  title: 'Linked Lists',
  syllabus_code: 'DS-UNIT-3',
  singly_linked_list: {
    name: 'Singly Linked List',
    type: 'data_structure',
    definition: 'A Singly Linked List is a linear dynamic data structure composed of self-referential nodes, where each node holds data and a single pointer pointing to the next node in the sequence.',
    working_principle: 'Nodes are scattered arbitrarily in heap memory and connected via next pointers. The list is accessed through a head pointer. The last node points to NULL. Insertions and deletions at the head are O(1) pointer updates without shifting elements.',
    step_by_step: '1. Node Creation: Allocate heap memory via malloc(sizeof(struct Node)).\n2. Set node->data = val and node->next = NULL.\n3. Insertion: Reassign pointer links (e.g. newNode->next = head; head = newNode).\n4. Traversal: Start at head; while curr != NULL, process curr->data and advance curr = curr->next.\n5. Deletion: Bypass target node (prev->next = curr->next) and release memory using free(curr).',
    example: 'head -> [10 | *] -> [20 | *] -> [30 | NULL]',
    advantages: '• Dynamic size: grows and shrinks at runtime without pre-allocated capacity\n• Efficient O(1) insertion and deletion at the beginning\n• No memory wasted on pre-allocated empty array slots',
    disadvantages: '• No O(1) random access: must traverse sequentially in O(n) time\n• Memory overhead: requires 4 or 8 bytes per node for the next pointer\n• Poor CPU cache locality compared to contiguous arrays',
    applications: '• Implementation of Stacks, Queues, and Adjacency Lists for Graphs\n• Polynomial arithmetic representation in symbolic algebra\n• Dynamic memory management free-lists in operating systems',
    time_complexity: '• Insert at beginning: O(1)\n• Delete at beginning: O(1)\n• Search / Access: O(n)\n• Insert/Delete at end or position: O(n)',
    space_complexity: 'O(n) heap memory plus pointer overhead.',
    conclusion: 'Linked lists are ideal when frequent insertions and deletions occur and total collection size is unpredictable.',
    aim: 'Implement a Singly Linked List in C supporting insertion at beginning, insertion at end, deletion, traversal, and dynamic memory cleanup.',
    algorithm: '1. Define struct Node { int data; struct Node* next; }.\n2. createNode(val): malloc node, set data=val, next=NULL, return node.\n3. insertAtBeginning(head, val): newNode->next = *head; *head = newNode.\n4. deleteNode(head, key): traverse with prev and curr, link prev->next = curr->next, free(curr).\n5. displayList(head): loop curr while curr != NULL and print data.',
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int data) {
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    if (!newNode) return NULL;
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

void insertAtBeginning(struct Node **head, int data) {
    struct Node *newNode = createNode(data);
    if (!newNode) return;
    newNode->next = *head;
    *head = newNode;
}

void deleteFromBeginning(struct Node **head) {
    if (*head == NULL) return;
    struct Node *temp = *head;
    *head = (*head)->next;
    free(temp);
}

void displayList(struct Node *head) {
    struct Node *curr = head;
    printf("List: ");
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

void freeList(struct Node *head) {
    struct Node *curr = head;
    while (curr != NULL) {
        struct Node *temp = curr;
        curr = curr->next;
        free(temp);
    }
}

int main(void) {
    struct Node *head = NULL;

    insertAtBeginning(&head, 30);
    insertAtBeginning(&head, 20);
    insertAtBeginning(&head, 10);
    displayList(head);

    deleteFromBeginning(&head);
    printf("After deleting head: ");
    displayList(head);

    freeList(head);
    return 0;
}`,
    important_statements: '• struct Node *next holds the address of the subsequent heap-allocated node.\n• newNode->next = *head; *head = newNode; inserts node at beginning in O(1) time.\n• free(temp) releases memory to prevent memory leaks.\n• freeList() iterates through entire chain deallocating all nodes.',
    sample_input: 'Insert 30, 20, 10; then delete head',
    expected_output: `List: 10 -> 20 -> 30 -> NULL
After deleting head: List: 20 -> 30 -> NULL`,
    dry_run: `1. head = NULL.
2. insert 30: node(30)->next = NULL, head points to 30.
3. insert 20: node(20)->next = node(30), head points to 20.
4. insert 10: node(10)->next = node(20), head points to 10. List: 10 -> 20 -> 30 -> NULL.
5. deleteFromBeginning: temp = node(10), head advances to node(20), free(temp). List: 20 -> 30 -> NULL.`,
    viva_questions: [
      { q: 'Why is insertion at the beginning of a singly linked list O(1)?', a: 'Because it only requires updating the new node pointer to the current head and pointing head to the new node, requiring no element shifting or traversal.' },
      { q: 'What is a memory leak in the context of linked lists?', a: 'A memory leak occurs when nodes are unlinked from the list without calling free(), leaving unreachable heap memory allocated.' }
    ]
  },

  singly_linked_list_insertion: {
    name: 'Singly Linked List Insertion',
    type: 'algorithm',
    definition: 'Insertion in a Singly Linked List adds a new node into the list at one of three positions: at the beginning (O(1)), at the end (O(n)), or at a specified 1-based index (O(n)).',
    working_principle: '1. At Beginning: newNode->next = *head; *head = newNode (O(1)).\n2. At End: Traverse until curr->next == NULL, then curr->next = newNode (O(n)).\n3. At Position: Traverse to pos - 1, set newNode->next = curr->next; curr->next = newNode (O(n)).',
    step_by_step: '1. Allocate new node on heap: newNode = (struct Node*)malloc(sizeof(struct Node)).\n2. Check if newNode is NULL.\n3. Assign newNode->data = val.\n4. Adjust pointers according to target position.\n5. If inserting at position 1, treat as beginning.\n6. Update list and maintain link continuity.',
    example: 'Given list 10 -> 20 -> 30 -> NULL:\n• Insert 5 at beginning -> 5 -> 10 -> 20 -> 30 -> NULL\n• Insert 40 at end -> 5 -> 10 -> 20 -> 30 -> 40 -> NULL\n• Insert 25 at pos 4 -> 5 -> 10 -> 20 -> 25 -> 30 -> 40 -> NULL.',
    advantages: '• Insertion at beginning requires zero shifting (O(1))\n• List capacity is bounded only by available system RAM\n• Memory allocation is performed on-demand per node',
    disadvantages: '• Insertion at end or arbitrary position requires O(n) sequential traversal\n• Pointer manipulation mistakes cause broken chains or memory leaks',
    applications: '• Building dynamic stacks and queues\n• Real-time logging where items are constantly prepended or appended',
    time_complexity: '• Beginning: O(1)\n• End: O(n) (O(1) if tail pointer is maintained)\n• Specific Position: O(n)',
    space_complexity: 'O(1) auxiliary memory per insertion.',
    conclusion: 'Linked list insertion is flexible and dynamic, with instant O(1) performance at the head.',
    aim: 'Demonstrate insertion at beginning, end, and specific position in a Singly Linked List in C.',
    algorithm: '1. Implement insertAtBeginning(head, val).\n2. Implement insertAtEnd(head, val).\n3. Implement insertAtPosition(head, val, pos).\n4. In main(), test all 3 operations and display results.',
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int data) {
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    if (!newNode) return NULL;
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

void insertAtBeginning(struct Node **head, int data) {
    struct Node *newNode = createNode(data);
    if (!newNode) return;
    newNode->next = *head;
    *head = newNode;
}

void insertAtEnd(struct Node **head, int data) {
    struct Node *newNode = createNode(data);
    if (!newNode) return;
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    struct Node *curr = *head;
    while (curr->next != NULL) {
        curr = curr->next;
    }
    curr->next = newNode;
}

void insertAtPosition(struct Node **head, int data, int pos) {
    if (pos == 1) {
        insertAtBeginning(head, data);
        return;
    }
    struct Node *newNode = createNode(data);
    if (!newNode) return;
    struct Node *curr = *head;
    for (int i = 1; curr != NULL && i < pos - 1; i++) {
        curr = curr->next;
    }
    if (curr == NULL) {
        free(newNode);
        return;
    }
    newNode->next = curr->next;
    curr->next = newNode;
}

void displayList(struct Node *head) {
    struct Node *curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

void freeList(struct Node *head) {
    struct Node *curr = head;
    while (curr != NULL) {
        struct Node *temp = curr;
        curr = curr->next;
        free(temp);
    }
}

int main(void) {
    struct Node *head = NULL;
    printf("--- Singly Linked List Insertions ---\\n");
    insertAtBeginning(&head, 20);
    insertAtBeginning(&head, 10);
    insertAtEnd(&head, 40);
    insertAtPosition(&head, 30, 3);

    printf("Final List: ");
    displayList(head);

    freeList(head);
    return 0;
}`,
    important_statements: '• insertAtBeginning updates *head in O(1).\n• insertAtEnd traverses to the tail (curr->next == NULL).\n• insertAtPosition links newNode->next = curr->next, then curr->next = newNode.',
    sample_input: 'Insert 20 at beg, 10 at beg, 40 at end, 30 at pos 3',
    expected_output: `--- Singly Linked List Insertions ---
Final List: 10 -> 20 -> 30 -> 40 -> NULL`,
    dry_run: `1. insertAtBeginning(20): List = 20 -> NULL
2. insertAtBeginning(10): List = 10 -> 20 -> NULL
3. insertAtEnd(40): Traverse to 20, link 20->next = 40. List = 10 -> 20 -> 40 -> NULL
4. insertAtPosition(30, pos 3): Traverse to node 2 (value 20). Set 30->next = 40, 20->next = 30.
Final List: 10 -> 20 -> 30 -> 40 -> NULL.`,
    viva_questions: [
      { q: 'How can insertion at the end of a singly linked list be optimized to O(1)?', a: 'By maintaining an auxiliary tail pointer pointing directly to the last node.' }
    ]
  },

  singly_linked_list_deletion: {
    name: 'Singly Linked List Deletion',
    type: 'algorithm',
    definition: 'Deletion in a Singly Linked List removes an existing node from the list (from the beginning, end, or by key/position) and deallocates its heap memory using free().',
    working_principle: '1. Delete from beginning: temp = *head; *head = (*head)->next; free(temp) (O(1)).\n2. Delete from end: traverse with curr until curr->next->next == NULL; free(curr->next); curr->next = NULL (O(n)).\n3. Delete by value: traverse with prev and curr until curr->data == key; prev->next = curr->next; free(curr) (O(n)).',
    step_by_step: '1. Handle Empty List: if (*head == NULL) return immediately.\n2. Handle Head Deletion: if key is at head, advance head and free original head.\n3. Search Target: traverse with prev and curr pointers.\n4. Check Found: if curr == NULL, key was not in list.\n5. Unlink & Free: prev->next = curr->next; free(curr).',
    example: 'Given list 10 -> 20 -> 30 -> 40 -> NULL:\n• Delete node with value 30: prev=20, curr=30. prev->next = 40. free(30). Result: 10 -> 20 -> 40 -> NULL.',
    advantages: '• Memory of deleted node is immediately returned to the system\n• O(1) time when deleting from beginning\n• Dynamic shrinking without array compaction',
    disadvantages: '• Deleting from end or by value requires O(n) traversal to find previous node\n• Forgetting to call free() causes silent memory leaks',
    applications: '• Task queue cancellation\n• Memory buffer deallocation\n• Cache eviction algorithms (LRU cache)',
    time_complexity: '• Beginning: O(1)\n• End / Specific Value: O(n)',
    space_complexity: 'O(1) auxiliary space.',
    conclusion: 'Always preserve the address of the deleted node in a temporary pointer and call free() to avoid memory leaks.',
    aim: 'Implement complete deletion operations in a Singly Linked List in C (delete beginning, delete by value) with proper memory cleanup.',
    algorithm: '1. deleteFromBeginning(head): temp = *head; *head = (*head)->next; free(temp).\n2. deleteByValue(head, key):\n   If *head has key, delete head.\n   Traverse with prev and curr until curr->data == key.\n   prev->next = curr->next; free(curr).\n3. Test and print in main().',
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int data) {
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    if (!newNode) return NULL;
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

void append(struct Node **head, int data) {
    struct Node *newNode = createNode(data);
    if (!newNode) return;
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    struct Node *curr = *head;
    while (curr->next != NULL) curr = curr->next;
    curr->next = newNode;
}

void deleteNode(struct Node **head, int key) {
    struct Node *temp = *head, *prev = NULL;

    // Case 1: Target is head node
    if (temp != NULL && temp->data == key) {
        *head = temp->next;
        free(temp);
        return;
    }

    // Case 2: Search for key
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }

    // Case 3: Key not found
    if (temp == NULL) {
        printf("Key %d not found in list.\\n", key);
        return;
    }

    // Unlink and free
    prev->next = temp->next;
    free(temp);
}

void displayList(struct Node *head) {
    struct Node *curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

void freeList(struct Node *head) {
    struct Node *curr = head;
    while (curr != NULL) {
        struct Node *temp = curr;
        curr = curr->next;
        free(temp);
    }
}

int main(void) {
    struct Node *head = NULL;
    append(&head, 10);
    append(&head, 20);
    append(&head, 30);
    append(&head, 40);

    printf("Original List: ");
    displayList(head);

    printf("Deleting node 30:\\n");
    deleteNode(&head, 30);
    displayList(head);

    freeList(head);
    return 0;
}`,
    important_statements: '• struct Node *temp = *head, *prev = NULL tracks both target and preceding node.\n• if (temp != NULL && temp->data == key) handles head node deletion in O(1).\n• prev->next = temp->next bridges the gap around the deleted node.\n• free(temp) deallocates heap memory.',
    sample_input: 'List: [10, 20, 30, 40], Delete key: 30',
    expected_output: `Original List: 10 -> 20 -> 30 -> 40 -> NULL
Deleting node 30:
10 -> 20 -> 40 -> NULL`,
    dry_run: `1. List: 10 -> 20 -> 30 -> 40 -> NULL. Target key = 30.
2. temp starts at 10 (not 30), prev becomes 10, temp advances to 20.
3. temp at 20 (not 30), prev becomes 20, temp advances to 30.
4. temp at 30 (matches key 30!).
5. Set prev->next = temp->next (node 20 points to node 40).
6. free(temp) releases node 30.
Result: 10 -> 20 -> 40 -> NULL.`,
    viva_questions: [
      { q: 'Why do we need a prev pointer when deleting a node from a singly linked list?', a: 'Because singly linked list nodes only have forward next pointers. To bypass and delete a node, the preceding node next pointer must be updated.' }
    ]
  },

  doubly_linked_list: {
    name: 'Doubly Linked List',
    type: 'data_structure',
    definition: 'A Doubly Linked List is a linear data structure where each node contains data and two pointers: one pointing to the next node and one pointing to the previous node, enabling bidirectional traversal.',
    working_principle: 'Every node has struct Node *prev and struct Node *next. The head node prev pointer is NULL and the tail node next pointer is NULL. Given a pointer to any node, deletion or predecessor inspection takes O(1) time without needing to traverse from head.',
    step_by_step: '1. Node definition: struct Node { int data; struct Node *prev; struct Node *next; }.\n2. Insert at beginning: newNode->next = head; if (head) head->prev = newNode; head = newNode.\n3. Traverse forward using next; traverse backward using prev.\n4. Deletion: node->prev->next = node->next; node->next->prev = node->prev; free(node).',
    example: 'NULL <- [10] <=> [20] <=> [30] -> NULL',
    advantages: '• Bidirectional traversal: can traverse forwards and backwards\n• O(1) deletion of a node when given a direct pointer to that node (no prev search needed)\n• Simpler insertion and deletion before a given node',
    disadvantages: '• Higher memory overhead: requires two pointers per node (8 to 16 bytes overhead)\n• More complex pointer manipulation (4 pointer updates per insertion/deletion)',
    applications: '• Browser forward and back navigation history\n• Music playlist player (Next / Previous track)\n• Undo / Redo functionality in text editors',
    time_complexity: '• Insert/Delete at beginning: O(1)\n• Delete given node pointer: O(1)\n• Search: O(n)',
    space_complexity: 'O(n) heap memory with two pointers per node.',
    conclusion: 'Doubly linked lists trade extra pointer memory for bidirectional traversal and O(1) node deletion.',
    aim: 'Implement Doubly Linked List in C with forward and backward traversal and memory cleanup.',
    algorithm: '1. Define struct Node with data, prev, next.\n2. Implement insertFront(head, val).\n3. Implement displayForward(head) and displayBackward(head).\n4. In main(), test and clean memory.',
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
};

struct Node* createNode(int data) {
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    if (!newNode) return NULL;
    newNode->data = data;
    newNode->prev = NULL;
    newNode->next = NULL;
    return newNode;
}

void insertFront(struct Node **head, int data) {
    struct Node *newNode = createNode(data);
    if (!newNode) return;
    newNode->next = *head;
    if (*head != NULL) {
        (*head)->prev = newNode;
    }
    *head = newNode;
}

void displayForward(struct Node *head) {
    struct Node *curr = head;
    printf("Forward:  ");
    while (curr != NULL) {
        printf("%d <-> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

void displayBackward(struct Node *head) {
    if (head == NULL) return;
    struct Node *curr = head;
    while (curr->next != NULL) curr = curr->next; // Go to tail

    printf("Backward: ");
    while (curr != NULL) {
        printf("%d <-> ", curr->data);
        curr = curr->prev;
    }
    printf("NULL\\n");
}

void freeList(struct Node *head) {
    struct Node *curr = head;
    while (curr != NULL) {
        struct Node *temp = curr;
        curr = curr->next;
        free(temp);
    }
}

int main(void) {
    struct Node *head = NULL;
    insertFront(&head, 30);
    insertFront(&head, 20);
    insertFront(&head, 10);

    printf("--- Doubly Linked List Demonstration ---\\n");
    displayForward(head);
    displayBackward(head);

    freeList(head);
    return 0;
}`,
    important_statements: '• struct Node *prev enables backward traversal.\n• (*head)->prev = newNode links current head back to new node.\n• displayBackward traverses to tail and walks back using curr->prev.',
    sample_input: 'Insert 30, 20, 10 at front',
    expected_output: `--- Doubly Linked List Demonstration ---
Forward:  10 <-> 20 <-> 30 <-> NULL
Backward: 30 <-> 20 <-> 10 <-> NULL`,
    dry_run: `1. insert 30: head=30, prev=NULL, next=NULL.
2. insert 20: 20->next = 30, 30->prev = 20, head = 20.
3. insert 10: 10->next = 20, 20->prev = 10, head = 10.
4. Forward: 10 -> 20 -> 30. Backward: 30 -> 20 -> 10.`,
    viva_questions: [
      { q: 'What is the main advantage of a doubly linked list over a singly linked list?', a: 'Bidirectional traversal and O(1) deletion of a node when given a direct reference to that node, without needing to traverse from head to find the predecessor.' }
    ]
  },

  circular_linked_list: {
    name: 'Circular Linked List',
    type: 'data_structure',
    definition: 'A Circular Linked List is a sequence of nodes where the last node points back to the first node (head), forming a continuous closed loop with no NULL pointers.',
    working_principle: 'Traversal starts at head and continues using do { ... } while (curr != head); until it loops back to the start. Any node can act as the starting point for a full list traversal. Can be implemented singly circular or doubly circular.',
    step_by_step: '1. Node creation: allocate node, set newNode->next = newNode (for single node loop).\n2. Insert at beginning: find tail (node where tail->next == head), set newNode->next = head; tail->next = newNode; head = newNode.\n3. Traversal: curr = head; do { print curr->data; curr = curr->next; } while (curr != head);\n4. Deletion: adjust tail or preceding node next pointer and free target.',
    example: '[10] -> [20] -> [30] -> (loops back to [10])',
    advantages: '• Entire list can be traversed starting from any node\n• No NULL pointers to check for termination\n• Naturally models round-robin structures and circular turn-taking',
    disadvantages: '• Risk of infinite loops if termination condition curr != head is incorrect\n• Insertion at beginning or end takes O(n) to find tail if tail pointer is not maintained',
    applications: '• Round-Robin CPU process scheduling\n• Multiplayer board games (turn rotation)\n• Media player repeat/loop-all playback',
    time_complexity: '• Insert at beginning: O(1) if tail pointer maintained, O(n) otherwise\n• Traversal: O(n)\n• Deletion: O(1) to O(n)',
    space_complexity: 'O(n) heap memory.',
    conclusion: 'Circular linked lists eliminate NULL pointers and provide seamless infinite-loop cycling.',
    aim: 'Implement a Circular Linked List in C with insertion and do-while traversal.',
    algorithm: '1. Define struct Node.\n2. insertEnd(head, val): if *head==NULL set *head=newNode, newNode->next=*head. Else find tail and link.\n3. display(head): do-while loop until curr reaches head.\n4. Free memory carefully to prevent infinite loops.',
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int data) {
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    if (!newNode) return NULL;
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

void insertEnd(struct Node **head, int data) {
    struct Node *newNode = createNode(data);
    if (!newNode) return;

    if (*head == NULL) {
        *head = newNode;
        newNode->next = *head; // Point to itself
        return;
    }

    struct Node *curr = *head;
    while (curr->next != *head) {
        curr = curr->next;
    }
    curr->next = newNode;
    newNode->next = *head;
}

void displayList(struct Node *head) {
    if (head == NULL) return;
    struct Node *curr = head;
    printf("Circular List: ");
    do {
        printf("%d -> ", curr->data);
        curr = curr->next;
    } while (curr != head);
    printf("(head %d)\\n", head->data);
}

void freeCircularList(struct Node *head) {
    if (head == NULL) return;
    struct Node *curr = head;
    struct Node *temp;
    while (curr->next != head) {
        temp = curr;
        curr = curr->next;
        free(temp);
    }
    free(curr); // Free last node
}

int main(void) {
    struct Node *head = NULL;
    insertEnd(&head, 10);
    insertEnd(&head, 20);
    insertEnd(&head, 30);

    printf("--- Circular Linked List in C ---\\n");
    displayList(head);

    freeCircularList(head);
    return 0;
}`,
    important_statements: '• newNode->next = *head establishes the circular wrap-around link.\n• do { ... } while (curr != head) guarantees that the loop runs once before verifying termination.\n• freeCircularList safely deallocates circular nodes without infinite loop.',
    sample_input: 'Insert 10, 20, 30',
    expected_output: `--- Circular Linked List in C ---
Circular List: 10 -> 20 -> 30 -> (head 10)`,
    dry_run: `1. insert 10: head points to 10; 10->next points to 10.
2. insert 20: tail 10 points to 20; 20->next points to 10.
3. insert 30: tail 20 points to 30; 30->next points to 10.
4. do-while prints 10, 20, 30, and stops when curr reaches head (10).`,
    viva_questions: [
      { q: 'How does the termination condition in a circular linked list differ from a singly linked list?', a: 'In a singly linked list, traversal terminates when curr == NULL. In a circular linked list, it terminates when curr == head.' }
    ]
  },

  list_reversal: {
    name: 'Linked List Reversal',
    type: 'algorithm',
    definition: 'Linked List Reversal inverts the orientation of pointers in a singly linked list so that the tail node becomes the new head, and the original head points to NULL.',
    working_principle: 'Iterative reversal uses three pointers: prev (initially NULL), curr (initially head), and next (temporarily storing curr->next). In each step, next saves curr->next, curr->next is reversed to point to prev, prev advances to curr, and curr advances to next.',
    step_by_step: '1. Initialize struct Node *prev = NULL, *curr = head, *next = NULL.\n2. While curr != NULL:\n   a. next = curr->next (Save next node)\n   b. curr->next = prev (Reverse link)\n   c. prev = curr (Move prev forward)\n   d. curr = next (Move curr forward)\n3. Return prev as the new head pointer.',
    example: 'Initial: 10 -> 20 -> 30 -> NULL\nReversed: 30 -> 20 -> 10 -> NULL.',
    advantages: '• In-place reversal with O(1) auxiliary space\n• Linear O(n) runtime with a single pass',
    disadvantages: '• Mutates the original list in place\n• Requires careful pointer bookkeeping to avoid losing remaining nodes',
    applications: '• Reversing sequences, undo stacks, polynomial evaluation',
    time_complexity: 'O(n) single pass through all nodes.',
    space_complexity: 'O(1) auxiliary space (uses only 3 pointers).',
    conclusion: 'Iterative reversal with 3 pointers is optimal in both time (O(n)) and memory (O(1)).',
    aim: 'Reverse a Singly Linked List iteratively using 3 pointers in C.',
    algorithm: '1. reverseList(head):\n   prev = NULL, curr = head, next = NULL\n   While curr != NULL:\n     next = curr->next\n     curr->next = prev\n     prev = curr\n     curr = next\n   Return prev.',
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int data) {
    struct Node *n = (struct Node *)malloc(sizeof(struct Node));
    if (!n) return NULL;
    n->data = data;
    n->next = NULL;
    return n;
}

struct Node* reverseList(struct Node *head) {
    struct Node *prev = NULL;
    struct Node *curr = head;
    struct Node *next = NULL;

    while (curr != NULL) {
        next = curr->next; // Store next node
        curr->next = prev; // Reverse current node link
        prev = curr;       // Move prev one step forward
        curr = next;       // Move curr one step forward
    }
    return prev; // New head of reversed list
}

void printList(struct Node *head) {
    struct Node *curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

void freeList(struct Node *head) {
    struct Node *curr = head;
    while (curr != NULL) {
        struct Node *temp = curr;
        curr = curr->next;
        free(temp);
    }
}

int main(void) {
    struct Node *head = createNode(10);
    head->next = createNode(20);
    head->next->next = createNode(30);

    printf("Original: ");
    printList(head);

    head = reverseList(head);

    printf("Reversed: ");
    printList(head);

    freeList(head);
    return 0;
}`,
    important_statements: '• Three pointers (prev, curr, next) prevent losing access to the tail when reversing links.\n• curr->next = prev inverts the edge.\n• return prev returns the new head.',
    sample_input: 'List: 10 -> 20 -> 30 -> NULL',
    expected_output: `Original: 10 -> 20 -> 30 -> NULL
Reversed: 30 -> 20 -> 10 -> NULL`,
    dry_run: `Initial: prev = NULL, curr = node(10).
Iteration 1: next = node(20). node(10)->next = NULL. prev = node(10), curr = node(20).
Iteration 2: next = node(30). node(20)->next = node(10). prev = node(20), curr = node(30).
Iteration 3: next = NULL. node(30)->next = node(20). prev = node(30), curr = NULL.
Loop terminates. New head is prev = node(30).
Reversed List: 30 -> 20 -> 10 -> NULL.`,
    viva_questions: [
      { q: 'How many pointers are required to reverse a singly linked list iteratively?', a: 'Three pointers: prev, curr, and next.' }
    ]
  },

  all_linked_lists: {
    name: 'Types of Linked Lists (Master Guide)',
    type: 'concept',
    definition: 'A Linked List is a linear data structure of nodes connected by pointers. The three primary forms are Singly Linked List, Doubly Linked List, and Circular Linked List.',
    working_principle: 'Singly Linked Lists use forward next pointers ending in NULL. Doubly Linked Lists add backward prev pointers for bidirectional traversal. Circular Linked Lists loop the tail back to head eliminating NULL pointers.',
    overview: `Linked lists come in three primary forms, each optimized for specific traversal and memory requirements:

1. **Singly Linked List**: Each node contains data and a single next pointer ending in NULL. Minimal memory overhead, fast O(1) operations at head, but strictly unidirectional.
2. **Doubly Linked List**: Each node contains data, next pointer, and prev pointer. Enables bidirectional traversal and O(1) node deletion with direct node pointer, at the cost of extra memory.
3. **Circular Linked List**: The last node points back to the head node. Perfect for continuous cyclic processes like Round-Robin scheduling and loop-playback.`,
    comparison_table: `| Parameter | Singly Linked List | Doubly Linked List | Circular Linked List |
| :--- | :--- | :--- | :--- |
| **Pointers per Node** | 1 (next) | 2 (prev, next) | 1 (or 2 if doubly circular) |
| **Traversal Direction** | Unidirectional (forward only) | Bidirectional (forward & backward) | Unidirectional or Bidirectional in loop |
| **Last Node Link** | Points to NULL | Points to NULL | Points back to Head |
| **Memory Overhead** | Lowest (1 pointer/node) | Highest (2 pointers/node) | Low (1 pointer/node) |
| **Node Deletion Given Pointer** | O(n) (requires search for prev) | **O(1)** (prev pointer accessible) | O(n) (requires search for prev) |
| **Primary Use Cases** | Simple lists, stacks, queues | Browser history, text editor undo | Round-Robin CPU scheduling, media loop |`,
    verdict: `### 🎯 Exam Selection Verdict:
• Choose **Singly Linked List** when memory is constrained and traversal is strictly forward.
• Choose **Doubly Linked List** when bidirectional traversal or frequent middle-node deletion is required.
• Choose **Circular Linked List** when elements must be processed repeatedly in round-robin turns.`
  }
};

