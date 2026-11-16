/**
 * Complete Queues Knowledge Module (21 Operations with Full 14-Section Schemas)
 * Covers Linear Queue (7 ops), Circular Queue (6 ops), Linked List Queue (6 ops), Deque (1 op), Priority Queue (1 op).
 */

module.exports = [
  {
    "id": "queue_array_create",
    "title": "Queue Creation using Array",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "create linear queue",
      "array queue initialization",
      "queue declaration",
      "front rear pointers"
    ],
    "definition": "Queue creation using an array involves allocating a contiguous buffer of fixed capacity `MAX` and initializing two tracking pointers: `front = -1` and `rear = -1` to designate an empty queue.",
    "concept_explanation": "A queue is a linear collection adhering strictly to the FIFO (First-In, First-Out) principle. Insertions happen at the back (`rear`) while deletions happen at the front (`front`). In a static array, `front` and `rear` both start at -1. The first enqueued item sets both pointers to 0.",
    "algorithm": "Step 1: Define MAX size capacity (e.g., #define MAX 5).\nStep 2: Declare array queue[MAX].\nStep 3: Declare and set front = -1, rear = -1.\nStep 4: Queue is created and ready for operations.",
    "pseudocode": "constant MAX = 5\narray queue[MAX]\ninteger front = -1, rear = -1\n\nfunction initQueue():\n    front = -1; rear = -1\n    print \"Linear Queue initialized\"",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint queue[MAX];\nint front = -1;\nint rear = -1;\n\nvoid initQueue(void) {\n    front = -1;\n    rear = -1;\n    printf(\"Linear Queue initialized with capacity %d.\\n\", MAX);\n    printf(\"front = %d, rear = %d (Empty Queue)\\n\", front, rear);\n}\n\nint main(void) {\n    printf(\"=== Linear Queue Creation using Array ===\\n\");\n    initQueue();\n    return 0;\n}",
    "sample_input": "Initialize queue with MAX = 5",
    "sample_output": "=== Linear Queue Creation using Array ===\nLinear Queue initialized with capacity 5.\nfront = -1, rear = -1 (Empty Queue)",
    "dry_run": "front = -1, rear = -1. Zero items in queue.",
    "time_complexity": "• O(1) initialization.",
    "space_complexity": "• O(MAX) contiguous static memory.",
    "advantages_disadvantages": "Advantages: Simple and direct. Disadvantages: Fixed capacity; memory cannot be reused after deletions in linear queue without shifting or circular buffers.",
    "applications": "• CPU process scheduling queues, print spoolers.",
    "viva_questions": [
      {
        "q": "What do front = -1 and rear = -1 represent?",
        "a": "They signify that the linear queue is currently empty."
      }
    ]
  },
  {
    "id": "queue_array_enqueue",
    "title": "Enqueue Operation in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "enqueue linear queue",
      "insert queue",
      "add to queue",
      "queue enqueue"
    ],
    "definition": "Enqueue inserts a new element at the rear end of the queue after checking that the queue is not full.",
    "concept_explanation": "Before adding an element, check if `rear == MAX - 1`. If true, the queue is full (Queue Overflow). Otherwise, if the queue is currently empty (`front == -1`), both `front` and `rear` are set to 0. Otherwise, `rear` is incremented, and the element is stored at `queue[rear]`.",
    "algorithm": "Step 1: If rear == MAX - 1, print \"Queue Overflow\" and exit.\nStep 2: If front == -1, set front = 0.\nStep 3: Increment rear = rear + 1.\nStep 4: Set queue[rear] = value.\nStep 5: Output success message.",
    "pseudocode": "function enqueue(val):\n    if rear == MAX - 1: error(\"Queue Overflow\")\n    if front == -1: front = 0\n    rear = rear + 1\n    queue[rear] = val",
    "c_program": "#include <stdio.h>\n#define MAX 4\n\nint queue[MAX];\nint front = -1;\nint rear = -1;\n\nvoid enqueue(int val) {\n    if (rear == MAX - 1) {\n        printf(\"Queue Overflow! Cannot enqueue %d\\n\", val);\n        return;\n    }\n    if (front == -1) front = 0;\n    rear++;\n    queue[rear] = val;\n    printf(\"Enqueued %d (front = %d, rear = %d)\\n\", val, front, rear);\n}\n\nint main(void) {\n    printf(\"=== Enqueue Operation in Array Queue ===\\n\");\n    enqueue(10);\n    enqueue(20);\n    enqueue(30);\n    enqueue(40);\n    enqueue(50); // Overflow\n    return 0;\n}",
    "sample_input": "Enqueue 10, 20, 30, 40, 50 (MAX = 4)",
    "sample_output": "=== Enqueue Operation in Array Queue ===\nEnqueued 10 (front = 0, rear = 0)\nEnqueued 20 (front = 0, rear = 1)\nEnqueued 30 (front = 0, rear = 2)\nEnqueued 40 (front = 0, rear = 3)\nQueue Overflow! Cannot enqueue 50",
    "dry_run": "1. 10 inserted: front = 0, rear = 0.\n2. 20 inserted: rear = 1.\n3. 30 inserted: rear = 2.\n4. 40 inserted: rear = 3.\n5. 50: rear == 3 == MAX - 1 -> Overflow.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Constant time insertion. Subject to false overflow in linear queues when earlier slots are vacated.",
    "applications": "• Submitting background batch jobs.",
    "viva_questions": [
      {
        "q": "What is false overflow in a linear queue?",
        "a": "When rear reaches MAX-1, no new elements can be enqueued even if elements were dequeued from the front."
      }
    ]
  },
  {
    "id": "queue_array_dequeue",
    "title": "Dequeue Operation in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "dequeue linear queue",
      "delete queue element",
      "remove from queue",
      "queue dequeue"
    ],
    "definition": "Dequeue removes and returns the front element from the queue after checking that the queue is not empty.",
    "concept_explanation": "Before deletion, check if `front == -1` or `front > rear` (Queue Underflow). If valid, read `queue[front]` and increment `front++`. If `front > rear` after deletion, reset both `front = rear = -1` to clean up the queue.",
    "algorithm": "Step 1: If front == -1 or front > rear, print \"Queue Underflow\" and return -1.\nStep 2: Retrieve val = queue[front].\nStep 3: Increment front = front + 1.\nStep 4: If front > rear, reset front = rear = -1.\nStep 5: Return val.",
    "pseudocode": "function dequeue():\n    if front == -1 or front > rear: error(\"Queue Underflow\")\n    val = queue[front]\n    front = front + 1\n    if front > rear: front = rear = -1\n    return val",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint queue[MAX];\nint front = -1;\nint rear = -1;\n\nint dequeue(void) {\n    if (front == -1 || front > rear) {\n        printf(\"Queue Underflow! Queue is empty.\\n\");\n        return -1;\n    }\n    int val = queue[front++];\n    if (front > rear) {\n        front = rear = -1; // Reset\n    }\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Dequeue Operation in Array Queue ===\\n\");\n    queue[0] = 100; queue[1] = 200; front = 0; rear = 1;\n    printf(\"Initial queue has 100, 200\\n\");\n    printf(\"Dequeued: %d\\n\", dequeue());\n    printf(\"Dequeued: %d\\n\", dequeue());\n    printf(\"Dequeued: %d (Underflow test)\\n\", dequeue());\n    return 0;\n}",
    "sample_input": "Queue [100, 200], Dequeue 3 times",
    "sample_output": "=== Dequeue Operation in Array Queue ===\nInitial queue has 100, 200\nDequeued: 100\nDequeued: 200\nQueue Underflow! Queue is empty.\nDequeued: -1 (Underflow test)",
    "dry_run": "front=0, rear=1:\n1. dequeue() returns 100, front becomes 1.\n2. dequeue() returns 200, front becomes 2 > rear -> resets front=rear=-1.\n3. dequeue() -> Underflow detected.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Constant time removal obeying FIFO order.",
    "applications": "• Servicing customer tickets, handling packet arrivals in network routers.",
    "viva_questions": [
      {
        "q": "Why do we reset front and rear to -1 when front > rear?",
        "a": "To recycle the queue so that new elements can be enqueued starting from index 0 again."
      }
    ]
  },
  {
    "id": "queue_array_peek",
    "title": "Peek / Front Element in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "peek queue array",
      "front element queue",
      "inspect queue head"
    ],
    "definition": "The peek operation retrieves the element at the front of the queue without removing it or altering queue pointers.",
    "concept_explanation": "Inspects `queue[front]` if the queue contains elements (`front != -1 && front <= rear`). Leaves `front` and `rear` unchanged.",
    "algorithm": "Step 1: If front == -1 or front > rear, print empty message and return -1.\nStep 2: Return queue[front].",
    "pseudocode": "function peek():\n    if front == -1 or front > rear: return -1\n    return queue[front]",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint queue[MAX];\nint front = -1;\nint rear = -1;\n\nint peek(void) {\n    if (front == -1 || front > rear) {\n        printf(\"Queue is empty!\\n\");\n        return -1;\n    }\n    return queue[front];\n}\n\nint main(void) {\n    printf(\"=== Peek in Array Queue ===\\n\");\n    peek();\n    front = 0; rear = 0; queue[0] = 77;\n    printf(\"Front element: %d\\n\", peek());\n    rear++; queue[1] = 88;\n    printf(\"Front element remains: %d\\n\", peek());\n    return 0;\n}",
    "sample_input": "Empty queue -> insert 77 -> insert 88 -> peek",
    "sample_output": "=== Peek in Array Queue ===\nQueue is empty!\nFront element: 77\nFront element remains: 77",
    "dry_run": "front=0, queue[0]=77. Peek returns 77 without moving front.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Non-destructive inspection of upcoming job.",
    "applications": "• Checking next print job without de-spooling it.",
    "viva_questions": [
      {
        "q": "Does peek change front or rear pointers?",
        "a": "No, peek is strictly a read-only inspection."
      }
    ]
  },
  {
    "id": "queue_array_display",
    "title": "Display Queue Elements in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "display queue",
      "print array queue",
      "traverse queue"
    ],
    "definition": "Display traverses and prints all active elements currently resident in the queue from index `front` up to `rear`.",
    "concept_explanation": "Iterates sequentially from `front` to `rear`. If `front == -1` or `front > rear`, the queue is empty.",
    "algorithm": "Step 1: If front == -1 or front > rear, print \"Queue is empty\" and return.\nStep 2: For i = front to rear:\n        print queue[i]\nStep 3: Print newline.",
    "pseudocode": "function display():\n    if front == -1 or front > rear: print \"Empty\"\n    for i = front to rear: print queue[i]",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint queue[MAX] = {10, 20, 30, 40, 50};\nint front = 1;\nint rear = 3;\n\nvoid display(void) {\n    if (front == -1 || front > rear) {\n        printf(\"Queue is empty!\\n\");\n        return;\n    }\n    printf(\"Queue elements [Front -> Rear]: \");\n    for (int i = front; i <= rear; i++) {\n        printf(\"%d \", queue[i]);\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    printf(\"=== Display Queue Elements ===\\n\");\n    display();\n    return 0;\n}",
    "sample_input": "Queue with front = 1, rear = 3, elements: 20, 30, 40",
    "sample_output": "=== Display Queue Elements ===\nQueue elements [Front -> Rear]: 20 30 40",
    "dry_run": "i runs from 1 to 3: prints 20, 30, 40.",
    "time_complexity": "• O(n) where n is active queue size.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Provides full visibility into queue state.",
    "applications": "• Debugging waiting queues.",
    "viva_questions": [
      {
        "q": "Why do we start printing at front instead of 0?",
        "a": "Because slots before front have already been dequeued and are no longer part of the active queue."
      }
    ]
  },
  {
    "id": "queue_array_isempty",
    "title": "isEmpty Check in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "isEmpty queue array",
      "check empty queue",
      "queue isempty condition"
    ],
    "definition": "The isEmpty check verifies whether the queue contains zero elements by checking if `front == -1` or `front > rear`.",
    "concept_explanation": "A boolean check executing in O(1) time. Guards against Queue Underflow before dequeue operations.",
    "algorithm": "Step 1: If front == -1 or front > rear, return true (1).\nStep 2: Else return false (0).",
    "pseudocode": "function isEmpty():\n    return (front == -1 or front > rear)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n\nint front = -1, rear = -1;\n\nbool isEmpty(void) {\n    return (front == -1 || front > rear);\n}\n\nint main(void) {\n    printf(\"=== isEmpty Check in Array Queue ===\\n\");\n    printf(\"Initially: %s\\n\", isEmpty() ? \"EMPTY\" : \"NOT EMPTY\");\n    front = 0; rear = 0;\n    printf(\"After 1 enqueue: %s\\n\", isEmpty() ? \"EMPTY\" : \"NOT EMPTY\");\n    front = 1; // Dequeued\n    printf(\"After dequeue: %s\\n\", isEmpty() ? \"EMPTY\" : \"NOT EMPTY\");\n    return 0;\n}",
    "sample_input": "front=-1, rear=-1 -> front=0, rear=0 -> front=1, rear=0",
    "sample_output": "=== isEmpty Check in Array Queue ===\nInitially: EMPTY\nAfter 1 enqueue: NOT EMPTY\nAfter dequeue: EMPTY",
    "dry_run": "front=-1 -> true. front=0, rear=0 -> false. front=1 > rear=0 -> true.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Instant check preventing memory underflow.",
    "applications": "• Task schedulers checking if idle.",
    "viva_questions": [
      {
        "q": "Why can front be greater than rear in a linear queue?",
        "a": "When all enqueued elements have been dequeued one by one."
      }
    ]
  },
  {
    "id": "queue_array_isfull",
    "title": "isFull Check in Array Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_array",
    "subcategoryName": "Linear Queue (Array)",
    "keywords": [
      "isFull queue array",
      "queue capacity check",
      "check full linear queue"
    ],
    "definition": "The isFull check tests whether the rear pointer has reached the maximum capacity boundary of the array (`rear == MAX - 1`).",
    "concept_explanation": "In a linear queue, when `rear == MAX - 1`, no more items can be enqueued. This condition triggers even if previous deletions have left empty space at the front (false overflow).",
    "algorithm": "Step 1: If rear == MAX - 1, return true.\nStep 2: Else return false.",
    "pseudocode": "function isFull():\n    return rear == MAX - 1",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define MAX 3\n\nint rear = -1;\n\nbool isFull(void) {\n    return rear == MAX - 1;\n}\n\nint main(void) {\n    printf(\"=== isFull Check in Array Queue (MAX = 3) ===\\n\");\n    printf(\"rear = -1: %s\\n\", isFull() ? \"FULL\" : \"NOT FULL\");\n    rear = 2;\n    printf(\"rear = 2 (MAX-1): %s\\n\", isFull() ? \"FULL\" : \"NOT FULL\");\n    return 0;\n}",
    "sample_input": "MAX = 3, rear = -1, then rear = 2",
    "sample_output": "=== isFull Check in Array Queue (MAX = 3) ===\nrear = -1: NOT FULL\nrear = 2 (MAX-1): FULL",
    "dry_run": "rear == 2 == 3-1 -> returns true.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Guards against array out-of-bounds writes.",
    "applications": "• Flow control and network throttling.",
    "viva_questions": [
      {
        "q": "Does isFull in linear queue guarantee all array slots are occupied?",
        "a": "No, due to false overflow, elements before front may be vacant."
      }
    ]
  },
  {
    "id": "cqueue_create",
    "title": "Circular Queue Creation",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "create circular queue",
      "circular buffer init",
      "modulo queue creation"
    ],
    "definition": "Circular Queue creation involves allocating an array of size `MAX` and initializing `front = -1` and `rear = -1`, using modulo arithmetic `% MAX` to treat the array as a continuous ring.",
    "concept_explanation": "A circular queue connects the last index of the array back to the first index (index 0). This completely eliminates the false overflow limitation of linear queues by reusing vacant space created by dequeuing.",
    "algorithm": "Step 1: Define MAX size.\nStep 2: Declare array cqueue[MAX].\nStep 3: Set front = -1, rear = -1.\nStep 4: All pointer updates use modulo: (index + 1) % MAX.",
    "pseudocode": "constant MAX = 5\narray cqueue[MAX]\nfront = -1, rear = -1\nprint \"Circular queue initialized\"",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint cqueue[MAX];\nint front = -1;\nint rear = -1;\n\nvoid initCircularQueue(void) {\n    front = -1;\n    rear = -1;\n    printf(\"Circular Queue created with capacity %d.\\n\", MAX);\n    printf(\"Formula for advance: (index + 1) %% %d\\n\", MAX);\n}\n\nint main(void) {\n    printf(\"=== Circular Queue Creation ===\\n\");\n    initCircularQueue();\n    return 0;\n}",
    "sample_input": "MAX = 5, front = -1, rear = -1",
    "sample_output": "=== Circular Queue Creation ===\nCircular Queue created with capacity 5.\nFormula for advance: (index + 1) % 5",
    "dry_run": "front = -1, rear = -1. Ready for circular insertion.",
    "time_complexity": "• O(1) initialization.",
    "space_complexity": "• O(MAX) contiguous memory.",
    "advantages_disadvantages": "Solves memory wastage of linear queues without dynamic reallocation.",
    "applications": "• Ring buffers in audio/video streaming, OS round-robin schedulers.",
    "viva_questions": [
      {
        "q": "Why is circular queue preferred over linear queue in fixed arrays?",
        "a": "It reuses memory slots vacated by previous dequeues, preventing false overflow."
      }
    ]
  },
  {
    "id": "cqueue_enqueue",
    "title": "Enqueue in Circular Queue using Modulo",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "enqueue circular queue",
      "circular queue insert",
      "modulo enqueue",
      "cqueue enqueue"
    ],
    "definition": "Enqueue in a circular queue inserts a new element at position `(rear + 1) % MAX` after verifying that the queue is not full.",
    "concept_explanation": "The full condition is `(rear + 1) % MAX == front`. If not full: if `front == -1`, set `front = rear = 0`; otherwise update `rear = (rear + 1) % MAX`. Then write to `cqueue[rear]`.",
    "algorithm": "Step 1: Check if (rear + 1) % MAX == front (Queue Full condition).\nStep 2: If true, print \"Circular Queue is Full\" and return.\nStep 3: If front == -1, set front = 0, rear = 0.\nStep 4: Else, set rear = (rear + 1) % MAX.\nStep 5: Store value: cqueue[rear] = val.",
    "pseudocode": "function enqueue(val):\n    if (rear + 1) % MAX == front: error(\"Queue Full\")\n    if front == -1: front = rear = 0\n    else: rear = (rear + 1) % MAX\n    cqueue[rear] = val",
    "c_program": "#include <stdio.h>\n#define MAX 3\n\nint cqueue[MAX];\nint front = -1, rear = -1;\n\nvoid enqueue(int val) {\n    if ((rear + 1) % MAX == front) {\n        printf(\"Circular Queue Full! Cannot enqueue %d\\n\", val);\n        return;\n    }\n    if (front == -1) {\n        front = rear = 0;\n    } else {\n        rear = (rear + 1) % MAX;\n    }\n    cqueue[rear] = val;\n    printf(\"Enqueued %d at index %d (front=%d, rear=%d)\\n\", val, rear, front, rear);\n}\n\nint main(void) {\n    printf(\"=== Enqueue in Circular Queue (MAX = 3) ===\\n\");\n    enqueue(10);\n    enqueue(20);\n    enqueue(30);\n    enqueue(40); // Full\n    return 0;\n}",
    "sample_input": "Enqueue 10, 20, 30, 40 (MAX = 3)",
    "sample_output": "=== Enqueue in Circular Queue (MAX = 3) ===\nEnqueued 10 at index 0 (front=0, rear=0)\nEnqueued 20 at index 1 (front=0, rear=1)\nEnqueued 30 at index 2 (front=0, rear=2)\nCircular Queue Full! Cannot enqueue 40",
    "dry_run": "1. 10 at index 0 (front=0, rear=0)\n2. 20 at index 1 (rear=1)\n3. 30 at index 2 (rear=2)\n4. (2 + 1) % 3 == 0 == front -> Full!",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Optimal space utilization.",
    "applications": "• Keyboard input buffer (ring buffer).",
    "viva_questions": [
      {
        "q": "What is the condition for a circular queue to be full?",
        "a": "(rear + 1) % MAX == front."
      }
    ]
  },
  {
    "id": "cqueue_dequeue",
    "title": "Dequeue in Circular Queue using Modulo",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "dequeue circular queue",
      "circular queue delete",
      "modulo dequeue",
      "cqueue dequeue"
    ],
    "definition": "Dequeue in a circular queue removes the front element and advances `front = (front + 1) % MAX`, resetting both to -1 if the queue becomes empty.",
    "concept_explanation": "If `front == -1`, Queue Underflow occurs. If `front == rear`, only one element exists; remove it and reset `front = rear = -1`. Otherwise, retrieve `cqueue[front]` and advance `front = (front + 1) % MAX`.",
    "algorithm": "Step 1: If front == -1, print \"Queue Underflow\" and return -1.\nStep 2: val = cqueue[front].\nStep 3: If front == rear: front = rear = -1.\nStep 4: Else: front = (front + 1) % MAX.\nStep 5: Return val.",
    "pseudocode": "function dequeue():\n    if front == -1: error(\"Queue Underflow\")\n    val = cqueue[front]\n    if front == rear: front = rear = -1\n    else: front = (front + 1) % MAX\n    return val",
    "c_program": "#include <stdio.h>\n#define MAX 3\n\nint cqueue[MAX];\nint front = -1, rear = -1;\n\nint dequeue(void) {\n    if (front == -1) {\n        printf(\"Circular Queue Underflow!\\n\");\n        return -1;\n    }\n    int val = cqueue[front];\n    if (front == rear) {\n        front = rear = -1; // Reset when last element dequeued\n    } else {\n        front = (front + 1) % MAX;\n    }\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Dequeue in Circular Queue ===\\n\");\n    front = 0; rear = 1; cqueue[0] = 11; cqueue[1] = 22;\n    printf(\"Dequeued: %d (front now: %d)\\n\", dequeue(), front);\n    printf(\"Dequeued: %d (front now: %d)\\n\", dequeue(), front);\n    dequeue(); // Underflow\n    return 0;\n}",
    "sample_input": "Queue [11, 22], Dequeue twice, then 3rd time",
    "sample_output": "=== Dequeue in Circular Queue ===\nDequeued: 11 (front now: 1)\nDequeued: 22 (front now: -1)\nCircular Queue Underflow!",
    "dry_run": "front=0, rear=1:\n1. dequeue returns 11, front advances to 1.\n2. front == rear == 1: returns 22, resets front=rear=-1.\n3. front == -1: Underflow.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Constant time removal with instant recycling of slots.",
    "applications": "• Real-time operating system scheduler dispatch.",
    "viva_questions": [
      {
        "q": "What happens when front == rear during dequeue?",
        "a": "It indicates that the last remaining item is being dequeued, so both front and rear are reset to -1."
      }
    ]
  },
  {
    "id": "cqueue_display",
    "title": "Display Circular Queue Elements",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "display circular queue",
      "print cqueue",
      "traverse circular queue"
    ],
    "definition": "Display traverses and prints all active elements in a circular queue from `front` to `rear` taking pointer wrapping around the array boundary into account.",
    "concept_explanation": "Because `rear` can be less than `front` when wrapped, a simple `for (int i = front; i <= rear; i++)` does not suffice. Instead, a while or do-while loop increments `i = (i + 1) % MAX` until reaching `rear`.",
    "algorithm": "Step 1: If front == -1, print \"Queue is empty\" and return.\nStep 2: Initialize i = front.\nStep 3: Print cqueue[i].\nStep 4: While i != rear:\n        i = (i + 1) % MAX\n        Print cqueue[i]\nStep 5: Print newline.",
    "pseudocode": "function display():\n    if front == -1: print \"Empty\"; return\n    i = front\n    while true:\n        print cqueue[i]\n        if i == rear: break\n        i = (i + 1) % MAX",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint cqueue[MAX] = {50, 0, 0, 30, 40};\nint front = 3; // Wrapped around\nint rear = 0;\n\nvoid display(void) {\n    if (front == -1) {\n        printf(\"Circular Queue is empty!\\n\");\n        return;\n    }\n    printf(\"Circular Queue [Front -> Rear]: \");\n    int i = front;\n    while (1) {\n        printf(\"%d \", cqueue[i]);\n        if (i == rear) break;\n        i = (i + 1) % MAX;\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    printf(\"=== Display Circular Queue ===\\n\");\n    display();\n    return 0;\n}",
    "sample_input": "cqueue with front = 3, rear = 0, elements at 3 (30), 4 (40), 0 (50)",
    "sample_output": "=== Display Circular Queue ===\nCircular Queue [Front -> Rear]: 30 40 50",
    "dry_run": "i = 3: prints 30. i = (3+1)%5 = 4: prints 40. i = (4+1)%5 = 0: prints 50. i == rear (0) -> break.",
    "time_complexity": "• O(n) where n is active elements count.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Correctly visualizes wrapped circular elements.",
    "applications": "• Inspecting ring buffers during debugging.",
    "viva_questions": [
      {
        "q": "Why can i = (i + 1) % MAX wrap around?",
        "a": "Because the modulo operator resets index MAX back to 0."
      }
    ]
  },
  {
    "id": "cqueue_front_rear",
    "title": "Front & Rear Pointer Movement in Circular Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "front rear pointer movement",
      "circular queue wrapping",
      "cqueue index math"
    ],
    "definition": "Front and Rear pointer movement governs how indices cycle through `0, 1, ..., MAX-1, 0, 1...` using the formula `(index + 1) % MAX`.",
    "concept_explanation": "In a circular queue, when `rear` reaches `MAX - 1`, the next advance sets `rear = (MAX - 1 + 1) % MAX = 0`, as long as index 0 is vacant (`front != 0`). Similarly, `front` wraps to 0 upon reaching `MAX - 1`.",
    "algorithm": "Pointer Advance Rule:\nnextIndex = (currentIndex + 1) % MAX",
    "pseudocode": "rear = (rear + 1) % MAX\nfront = (front + 1) % MAX",
    "c_program": "#include <stdio.h>\n#define MAX 4\n\nint main(void) {\n    printf(\"=== Front & Rear Pointer Movement Demonstration ===\\n\");\n    printf(\"Capacity MAX = %d\\n\", MAX);\n    for (int i = 0; i < 8; i++) {\n        printf(\"Step %d: index %d -> next index = (%d + 1) %% %d = %d\\n\",\n               i, i % MAX, i % MAX, MAX, (i % MAX + 1) % MAX);\n    }\n    return 0;\n}",
    "sample_input": "Cycle 8 steps on MAX = 4",
    "sample_output": "=== Front & Rear Pointer Movement Demonstration ===\nCapacity MAX = 4\nStep 0: index 0 -> next index = (0 + 1) % 4 = 1\nStep 1: index 1 -> next index = (1 + 1) % 4 = 2\nStep 2: index 2 -> next index = (2 + 1) % 4 = 3\nStep 3: index 3 -> next index = (3 + 1) % 4 = 0\nStep 4: index 0 -> next index = (0 + 1) % 4 = 1\nStep 5: index 1 -> next index = (1 + 1) % 4 = 2\nStep 6: index 2 -> next index = (2 + 1) % 4 = 3\nStep 7: index 3 -> next index = (3 + 1) % 4 = 0",
    "dry_run": "Index wraps continuously: 0 -> 1 -> 2 -> 3 -> 0 -> 1 -> 2 -> 3.",
    "time_complexity": "• O(1) per pointer update.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Continuous circular flow without memory relocation.",
    "applications": "• Clock replacement page algorithms, streaming media buffers.",
    "viva_questions": [
      {
        "q": "What happens when rear is at MAX - 1 and index 0 is free?",
        "a": "rear wraps around to 0 via (rear + 1) % MAX."
      }
    ]
  },
  {
    "id": "cqueue_full_empty",
    "title": "Full and Empty Conditions in Circular Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "circular_queue",
    "subcategoryName": "Circular Queue",
    "keywords": [
      "circular queue full condition",
      "cqueue empty condition",
      "cqueue boundary logic"
    ],
    "definition": "In a Circular Queue, Empty condition is `front == -1`; Full condition is `(rear + 1) % MAX == front`.",
    "concept_explanation": "These two mathematical conditions distinguish an empty queue from a full queue unambiguously. Full occurs when advancing `rear` by one would collide with `front`. Empty occurs when `front == -1`.",
    "algorithm": "Condition Empty: front == -1\nCondition Full: (rear + 1) % MAX == front",
    "pseudocode": "function isEmpty(): return front == -1\nfunction isFull(): return (rear + 1) % MAX == front",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define MAX 3\n\nint front = -1, rear = -1;\n\nbool isEmpty(void) { return front == -1; }\nbool isFull(void) { return (rear + 1) % MAX == front; }\n\nint main(void) {\n    printf(\"=== Circular Queue Full & Empty Conditions ===\\n\");\n    printf(\"1. Initial state (front=-1, rear=-1):\\n\");\n    printf(\"   isEmpty: %s, isFull: %s\\n\", isEmpty() ? \"TRUE\" : \"FALSE\", isFull() ? \"TRUE\" : \"FALSE\");\n\n    front = 0; rear = 2; // Array indices 0, 1, 2 filled\n    printf(\"2. Full state (front=0, rear=2 on MAX=3):\\n\");\n    printf(\"   isEmpty: %s, isFull: %s\\n\", isEmpty() ? \"TRUE\" : \"FALSE\", isFull() ? \"TRUE\" : \"FALSE\");\n    return 0;\n}",
    "sample_input": "Evaluate conditions at start and when full",
    "sample_output": "=== Circular Queue Full & Empty Conditions ===\n1. Initial state (front=-1, rear=-1):\n   isEmpty: TRUE, isFull: FALSE\n2. Full state (front=0, rear=2 on MAX=3):\n   isEmpty: FALSE, isFull: TRUE",
    "dry_run": "Initial: front=-1 -> isEmpty=true.\nFull: (2+1)%3 = 0 == front -> isFull=true.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Clean mathematical boundaries without ambiguity.",
    "applications": "• Hardware FIFO buffer controllers.",
    "viva_questions": [
      {
        "q": "Why is full condition (rear + 1) % MAX == front?",
        "a": "Because if rear advances one more step circularly, it will overwrite the unread front element."
      }
    ]
  },
  {
    "id": "queue_ll_create",
    "title": "Queue Creation using Linked List",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "create linked list queue",
      "dynamic queue",
      "queue ll init",
      "front rear pointers null"
    ],
    "definition": "Queue creation using a linked list involves initializing two node pointers: `front = NULL` and `rear = NULL`, allowing the queue to grow dynamically without size limits.",
    "concept_explanation": "Each element in a linked queue is a dynamic node containing `data` and `next`. `front` points to the head node (where dequeue occurs), and `rear` points to the tail node (where enqueue occurs). Initially both are NULL.",
    "algorithm": "Step 1: Define structure Node with int data and struct Node* next.\nStep 2: Set struct Node* front = NULL; struct Node* rear = NULL.\nStep 3: Queue is ready for dynamic operations.",
    "pseudocode": "struct Node:\n    data: int\n    next: pointer to Node\n\nfront = NULL\nrear = NULL",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* front = NULL;\nstruct Node* rear = NULL;\n\nvoid initQueue(void) {\n    front = NULL;\n    rear = NULL;\n    printf(\"Linked List Queue initialized. front = NULL, rear = NULL (Empty Queue)\\n\");\n}\n\nint main(void) {\n    printf(\"=== Queue Creation using Linked List ===\\n\");\n    initQueue();\n    return 0;\n}",
    "sample_input": "front = NULL, rear = NULL",
    "sample_output": "=== Queue Creation using Linked List ===\nLinked List Queue initialized. front = NULL, rear = NULL (Empty Queue)",
    "dry_run": "Pointers initialized to NULL. Zero memory consumed.",
    "time_complexity": "• O(1) initialization.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Dynamic capacity, never full unless system RAM exhausted.",
    "applications": "• Web server request queues with unpredictable traffic.",
    "viva_questions": [
      {
        "q": "Where do enqueue and dequeue occur in a linked list queue?",
        "a": "Enqueue occurs at rear (tail); dequeue occurs at front (head)."
      }
    ]
  },
  {
    "id": "queue_ll_enqueue",
    "title": "Enqueue Operation in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "enqueue linked list queue",
      "insert dynamic queue",
      "queue ll enqueue"
    ],
    "definition": "Enqueue dynamically allocates a new node, appends it after `rear->next`, and updates `rear` to point to the new node in O(1) time.",
    "concept_explanation": "Allocate `newNode`. Set `newNode->data = val` and `newNode->next = NULL`. If `rear == NULL`, the queue was empty, so set `front = rear = newNode`. Otherwise, set `rear->next = newNode` and `rear = newNode`.",
    "algorithm": "Step 1: Allocate newNode = malloc(sizeof(struct Node)).\nStep 2: Check if newNode == NULL (Heap full).\nStep 3: newNode->data = val; newNode->next = NULL.\nStep 4: If rear == NULL:\n        front = rear = newNode\nStep 5: Else:\n        rear->next = newNode\n        rear = newNode",
    "pseudocode": "function enqueue(val):\n    newNode = allocate(Node)\n    newNode.data = val; newNode.next = NULL\n    if rear == NULL:\n        front = rear = newNode\n    else:\n        rear.next = newNode\n        rear = newNode",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* front = NULL;\nstruct Node* rear = NULL;\n\nvoid enqueue(int val) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    if (newNode == NULL) {\n        printf(\"Memory allocation failed!\\n\");\n        return;\n    }\n    newNode->data = val;\n    newNode->next = NULL;\n    if (rear == NULL) {\n        front = rear = newNode;\n    } else {\n        rear->next = newNode;\n        rear = newNode;\n    }\n    printf(\"Enqueued %d (front node: %d, rear node: %d)\\n\", val, front->data, rear->data);\n}\n\nint main(void) {\n    printf(\"=== Enqueue in Linked List Queue ===\\n\");\n    enqueue(10);\n    enqueue(20);\n    enqueue(30);\n    return 0;\n}",
    "sample_input": "Enqueue 10, 20, 30",
    "sample_output": "=== Enqueue in Linked List Queue ===\nEnqueued 10 (front node: 10, rear node: 10)\nEnqueued 20 (front node: 10, rear node: 20)\nEnqueued 30 (front node: 10, rear node: 30)",
    "dry_run": "1. newNode(10): front = rear = newNode(10).\n2. newNode(20): rear->next = newNode(20), rear = newNode(20).\n3. newNode(30): rear->next = newNode(30), rear = newNode(30).",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) per node.",
    "advantages_disadvantages": "No capacity limit; O(1) insertion.",
    "applications": "• Asynchronous event queues.",
    "viva_questions": [
      {
        "q": "Why is linked list enqueue O(1)?",
        "a": "Because the rear pointer directly references the last node, avoiding traversal."
      }
    ]
  },
  {
    "id": "queue_ll_dequeue",
    "title": "Dequeue Operation in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "dequeue linked list queue",
      "delete dynamic queue",
      "queue ll dequeue"
    ],
    "definition": "Dequeue removes the front node from the queue, advances `front = front->next`, frees the memory, and resets `rear = NULL` if the queue becomes empty.",
    "concept_explanation": "If `front == NULL`, the queue is empty (Underflow). Otherwise, save `temp = front`, retrieve `val = temp->data`, advance `front = front->next`. If `front == NULL`, set `rear = NULL` as well. Free `temp` and return `val`.",
    "algorithm": "Step 1: If front == NULL, print Underflow and return -1.\nStep 2: temp = front, val = temp->data.\nStep 3: front = front->next.\nStep 4: If front == NULL, rear = NULL.\nStep 5: free(temp).\nStep 6: Return val.",
    "pseudocode": "function dequeue():\n    if front == NULL: error(\"Underflow\")\n    temp = front\n    val = temp.data\n    front = front.next\n    if front == NULL: rear = NULL\n    free(temp)\n    return val",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* front = NULL;\nstruct Node* rear = NULL;\n\nvoid enqueue(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->next = NULL;\n    if (rear == NULL) front = rear = n;\n    else { rear->next = n; rear = n; }\n}\n\nint dequeue(void) {\n    if (front == NULL) {\n        printf(\"Queue Underflow!\\n\");\n        return -1;\n    }\n    struct Node* temp = front;\n    int val = temp->data;\n    front = front->next;\n    if (front == NULL) rear = NULL;\n    free(temp);\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Dequeue in Linked List Queue ===\\n\");\n    enqueue(100);\n    enqueue(200);\n    printf(\"Dequeued: %d\\n\", dequeue());\n    printf(\"Dequeued: %d\\n\", dequeue());\n    dequeue(); // Underflow\n    return 0;\n}",
    "sample_input": "Enqueue 100, 200, Dequeue 3 times",
    "sample_output": "=== Dequeue in Linked List Queue ===\nDequeued: 100\nDequeued: 200\nQueue Underflow!",
    "dry_run": "1. dequeue: front points to 100, front advances to 200, 100 freed.\n2. dequeue: front points to 200, front becomes NULL -> rear becomes NULL, 200 freed.\n3. dequeue: front is NULL -> Underflow!",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Frees memory immediately; O(1) deletion.",
    "applications": "• Worker thread task processing.",
    "viva_questions": [
      {
        "q": "What happens to rear when the last node is dequeued?",
        "a": "rear must be explicitly set to NULL because front becomes NULL."
      }
    ]
  },
  {
    "id": "queue_ll_peek",
    "title": "Peek / Front Operation in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "peek linked list queue",
      "head element dynamic queue",
      "queue ll peek"
    ],
    "definition": "Peek reads the data value of the `front` node in a linked list queue without removing it or altering any pointers.",
    "concept_explanation": "Checks if `front != NULL` and returns `front->data` in O(1) time.",
    "algorithm": "Step 1: If front == NULL, print empty and return -1.\nStep 2: Return front->data.",
    "pseudocode": "function peek():\n    if front == NULL: return -1\n    return front.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* front = NULL;\nstruct Node* rear = NULL;\n\nint peek(void) {\n    if (front == NULL) {\n        printf(\"Queue is empty!\\n\");\n        return -1;\n    }\n    return front->data;\n}\n\nint main(void) {\n    printf(\"=== Peek in Linked List Queue ===\\n\");\n    peek();\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = 888; n->next = NULL; front = rear = n;\n    printf(\"Front node value: %d\\n\", peek());\n    return 0;\n}",
    "sample_input": "Peek empty, then peek node with 888",
    "sample_output": "=== Peek in Linked List Queue ===\nQueue is empty!\nFront node value: 888",
    "dry_run": "front=NULL -> empty message. front points to 888 -> returns 888.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Non-destructive inspection.",
    "applications": "• Peeking upcoming customer order in processing pipeline.",
    "viva_questions": [
      {
        "q": "Does peek affect the rear pointer?",
        "a": "No, peek only reads front->data."
      }
    ]
  },
  {
    "id": "queue_ll_display",
    "title": "Display Queue Elements in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "display linked list queue",
      "print dynamic queue",
      "queue ll traversal"
    ],
    "definition": "Display traverses and prints all nodes in the linked queue from `front` to `rear` sequentially.",
    "concept_explanation": "Initializes a temporary pointer `temp = front` and loops until `temp == NULL`, printing `temp->data`.",
    "algorithm": "Step 1: If front == NULL, print \"Queue is empty\" and return.\nStep 2: temp = front.\nStep 3: While temp != NULL:\n        print temp->data\n        temp = temp->next\nStep 4: Print newline.",
    "pseudocode": "function display():\n    temp = front\n    while temp != NULL:\n        print temp.data\n        temp = temp.next",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* front = NULL;\nstruct Node* rear = NULL;\n\nvoid enqueue(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->next = NULL;\n    if (rear == NULL) front = rear = n;\n    else { rear->next = n; rear = n; }\n}\n\nvoid display(void) {\n    if (front == NULL) {\n        printf(\"Queue is empty!\\n\");\n        return;\n    }\n    struct Node* temp = front;\n    printf(\"Linked Queue [Front -> Rear]: \");\n    while (temp != NULL) {\n        printf(\"%d -> \", temp->data);\n        temp = temp->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main(void) {\n    printf(\"=== Display Linked List Queue ===\\n\");\n    display();\n    enqueue(10);\n    enqueue(20);\n    enqueue(30);\n    display();\n    return 0;\n}",
    "sample_input": "Enqueue 10, 20, 30; call display()",
    "sample_output": "=== Display Linked List Queue ===\nQueue is empty!\nLinked Queue [Front -> Rear]: 10 -> 20 -> 30 -> NULL",
    "dry_run": "temp runs: 10 -> 20 -> 30 -> NULL.",
    "time_complexity": "• O(n) where n is node count.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "Displays dynamic structure accurately.",
    "applications": "• Debugging waiting pipeline buffers.",
    "viva_questions": [
      {
        "q": "What marks the end of a linked list queue?",
        "a": "rear->next == NULL."
      }
    ]
  },
  {
    "id": "queue_ll_empty",
    "title": "Empty Condition in Linked List Queue",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_linked_list",
    "subcategoryName": "Linked List Queue",
    "keywords": [
      "empty condition linked list queue",
      "check empty ll queue",
      "queue ll isempty"
    ],
    "definition": "In a Linked List Queue, the queue is empty if and only if `front == NULL`.",
    "concept_explanation": "A single pointer comparison `front == NULL` determines whether the queue contains any active nodes.",
    "algorithm": "Step 1: If front == NULL return true.\nStep 2: Else return false.",
    "pseudocode": "function isEmpty():\n    return front == NULL",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n\nstruct Node { int data; struct Node* next; };\nstruct Node* front = NULL;\n\nbool isEmpty(void) {\n    return front == NULL;\n}\n\nint main(void) {\n    printf(\"=== Linked List Queue Empty Condition ===\\n\");\n    printf(\"Is queue empty? %s\\n\", isEmpty() ? \"YES\" : \"NO\");\n    return 0;\n}",
    "sample_input": "Check front == NULL",
    "sample_output": "=== Linked List Queue Empty Condition ===\nIs queue empty? YES",
    "dry_run": "front is NULL -> returns true.",
    "time_complexity": "• O(1) constant time.",
    "space_complexity": "• O(1) auxiliary space.",
    "advantages_disadvantages": "O(1) guard condition.",
    "applications": "• Polling loops in async workers.",
    "viva_questions": [
      {
        "q": "If front is NULL, what must rear be in a consistent queue?",
        "a": "rear should also be NULL."
      }
    ]
  },
  {
    "id": "queue_deque",
    "title": "Double-Ended Queue (Deque)",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_special",
    "subcategoryName": "Specialized Queues",
    "keywords": [
      "deque",
      "double ended queue",
      "insert front insert rear",
      "delete front delete rear"
    ],
    "definition": "A Double-Ended Queue (Deque) is a generalized queue in which elements can be inserted and deleted at both ends (front and rear).",
    "concept_explanation": "A Deque combines the capabilities of both Stacks and Queues. It supports four primary operations: `insertFront()`, `insertRear()`, `deleteFront()`, and `deleteRear()`. Can be implemented using a circular array or doubly linked list.",
    "algorithm": "Operations:\n1. insertFront: insert at (front - 1 + MAX) % MAX\n2. insertRear: insert at (rear + 1) % MAX\n3. deleteFront: remove from front, front = (front + 1) % MAX\n4. deleteRear: remove from rear, rear = (rear - 1 + MAX) % MAX",
    "pseudocode": "class Deque:\n    insertFront(x)\n    insertRear(x)\n    deleteFront()\n    deleteRear()",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nint deque[MAX];\nint front = -1, rear = -1;\n\nvoid insertRear(int val) {\n    if ((rear + 1) % MAX == front) { printf(\"Deque Full!\\n\"); return; }\n    if (front == -1) { front = rear = 0; }\n    else { rear = (rear + 1) % MAX; }\n    deque[rear] = val;\n    printf(\"insertRear: %d\\n\", val);\n}\n\nvoid insertFront(int val) {\n    if ((rear + 1) % MAX == front) { printf(\"Deque Full!\\n\"); return; }\n    if (front == -1) { front = rear = 0; }\n    else { front = (front - 1 + MAX) % MAX; }\n    deque[front] = val;\n    printf(\"insertFront: %d\\n\", val);\n}\n\nint deleteFront(void) {\n    if (front == -1) { printf(\"Deque Empty!\\n\"); return -1; }\n    int val = deque[front];\n    if (front == rear) { front = rear = -1; }\n    else { front = (front + 1) % MAX; }\n    return val;\n}\n\nint deleteRear(void) {\n    if (front == -1) { printf(\"Deque Empty!\\n\"); return -1; }\n    int val = deque[rear];\n    if (front == rear) { front = rear = -1; }\n    else { rear = (rear - 1 + MAX) % MAX; }\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Double-Ended Queue (Deque) ===\\n\");\n    insertRear(10);\n    insertRear(20);\n    insertFront(5);\n    printf(\"deleteFront: %d\\n\", deleteFront());\n    printf(\"deleteRear:  %d\\n\", deleteRear());\n    return 0;\n}",
    "sample_input": "insertRear(10), insertRear(20), insertFront(5), deleteFront(), deleteRear()",
    "sample_output": "=== Double-Ended Queue (Deque) ===\ninsertRear: 10\ninsertRear: 20\ninsertFront: 5\ndeleteFront: 5\ndeleteRear:  20",
    "dry_run": "1. insertRear(10): deque = [10]\n2. insertRear(20): deque = [10, 20]\n3. insertFront(5): deque = [5, 10, 20]\n4. deleteFront(): 5 removed\n5. deleteRear(): 20 removed",
    "time_complexity": "• O(1) for all 4 operations.",
    "space_complexity": "• O(MAX) array storage.",
    "advantages_disadvantages": "Combines stack and queue behaviors in one structure.",
    "applications": "• Sliding window maximum algorithm, undo/redo buffers, web browser tab history.",
    "viva_questions": [
      {
        "q": "What are the two variants of restricted deques?",
        "a": "Input-restricted deque (deletion at both ends, insertion at one end) and Output-restricted deque (insertion at both ends, deletion at one end)."
      }
    ]
  },
  {
    "id": "queue_priority",
    "title": "Priority Queue Implementation",
    "category": "queues",
    "categoryName": "Queues",
    "subcategory": "queue_special",
    "subcategoryName": "Specialized Queues",
    "keywords": [
      "priority queue",
      "pq c program",
      "priority scheduling",
      "ordered queue"
    ],
    "definition": "A Priority Queue is an abstract data structure where each element is assigned a priority, and elements with higher priority are dequeued before elements with lower priority.",
    "concept_explanation": "Unlike standard FIFO queues, order of arrival does not solely determine processing order. When elements have equal priority, they are served according to FIFO order. Commonly implemented using sorted arrays, linked lists, or binary heaps.",
    "algorithm": "Ascending Priority Queue (Lowest value = Highest priority):\n1. enqueue(val, priority): insert element into array sorted by priority.\n2. dequeue(): remove element with highest priority (index 0).",
    "pseudocode": "function enqueue(val, pr):\n    find index where pr fits\n    shift elements right\n    insert item at index\n\nfunction dequeue():\n    return item at index 0",
    "c_program": "#include <stdio.h>\n#define MAX 5\n\nstruct Element {\n    int value;\n    int priority; // Lower integer = Higher priority\n};\n\nstruct Element pq[MAX];\nint size = 0;\n\nvoid enqueue(int val, int pr) {\n    if (size == MAX) {\n        printf(\"Priority Queue Full!\\n\");\n        return;\n    }\n    int i = size - 1;\n    // Shift elements with lower priority (higher pr value) to the right\n    while (i >= 0 && pq[i].priority > pr) {\n        pq[i + 1] = pq[i];\n        i--;\n    }\n    pq[i + 1].value = val;\n    pq[i + 1].priority = pr;\n    size++;\n    printf(\"Enqueued Value: %d (Priority: %d)\\n\", val, pr);\n}\n\nint dequeue(void) {\n    if (size == 0) {\n        printf(\"Priority Queue Empty!\\n\");\n        return -1;\n    }\n    int val = pq[0].value;\n    for (int i = 0; i < size - 1; i++) {\n        pq[i] = pq[i + 1];\n    }\n    size--;\n    return val;\n}\n\nint main(void) {\n    printf(\"=== Priority Queue Demonstration (Lower number = Higher priority) ===\\n\");\n    enqueue(100, 3);\n    enqueue(200, 1); // High priority\n    enqueue(300, 2);\n    printf(\"Dequeued: %d (Highest priority)\\n\", dequeue());\n    printf(\"Dequeued: %d\\n\", dequeue());\n    printf(\"Dequeued: %d\\n\", dequeue());\n    return 0;\n}",
    "sample_input": "Enqueue (100, pr 3), (200, pr 1), (300, pr 2)",
    "sample_output": "=== Priority Queue Demonstration (Lower number = Higher priority) ===\nEnqueued Value: 100 (Priority: 3)\nEnqueued Value: 200 (Priority: 1)\nEnqueued Value: 300 (Priority: 2)\nDequeued: 200 (Highest priority)\nDequeued: 300\nDequeued: 100",
    "dry_run": "Items sorted by priority: (200, 1), (300, 2), (100, 3). Dequeued in that exact priority order.",
    "time_complexity": "• Enqueue: O(n), Dequeue: O(1) with sorted array (or O(log n) with Binary Heap).",
    "space_complexity": "• O(MAX) storage.",
    "advantages_disadvantages": "Ensures critical tasks are serviced immediately.",
    "applications": "• Dijkstra shortest path algorithm, Huffman coding, OS preemptive CPU scheduling.",
    "viva_questions": [
      {
        "q": "What data structure provides the most efficient implementation of a Priority Queue?",
        "a": "A Binary Heap (Min-Heap or Max-Heap), providing O(log n) insertion and deletion."
      }
    ]
  }
];
