/**
 * Queues Module
 * Linear Queue (False Overflow), Circular Queue (Modulo Ring Buffer), and Master Guide.
 */

module.exports = {
  title: 'Queues & Circular Queues',
  syllabus_code: 'DS-UNIT-5',
  linear_queue: {
    name: 'Linear Queue (Array Implementation)',
    type: 'data_structure',
    definition: 'A Linear Queue is a linear data structure that operates under the FIFO (First-In, First-Out) principle, where new elements are enqueued at the rear end and existing elements are dequeued from the front end.',
    working_principle: 'Maintains two pointer indices: front (points to the element to dequeue) and rear (points to the last enqueued element). Initial state is front = -1, rear = -1. Enqueue increments rear; dequeue increments front. All operations take O(1) time.',
    step_by_step: '1. Enqueue: check if rear == MAX - 1. If so, Queue Overflow. Else if front == -1 set front = 0; increment rear and store arr[rear] = val.\n2. Dequeue: check if front == -1 or front > rear. If so, Queue Underflow. Else read val = arr[front]; front = front + 1; return val.\n3. Peek: return arr[front].\n4. Display: loop from front to rear.',
    example: 'Queue MAX=5: Enqueue 10, 20, 30 -> front=0, rear=2. Dequeue -> returns 10, front advances to 1.',
    advantages: '• Strict FIFO fairness: ensures tasks are executed in exact chronological order\n• O(1) constant time insertion and deletion\n• Simple array implementation',
    disadvantages: '• THE FALSE OVERFLOW PROBLEM: Once rear reaches MAX - 1, no new elements can be enqueued even if elements were dequeued from the front and slots 0 to front-1 are completely empty!\n• Memory is wasted in fixed arrays without shifting or wrap-around',
    applications: '• CPU process scheduling and print spooler queues\n• Breadth-First Search (BFS) graph and tree traversals\n• Network packet buffers and asynchronous message queues',
    time_complexity: '• Enqueue: O(1)\n• Dequeue: O(1)\n• Peek: O(1)\n• Display: O(n)',
    space_complexity: 'O(MAX) static array storage.',
    conclusion: 'Linear array queues suffer from false overflow, which is resolved by Circular Queues or Linked List Queues.',
    aim: 'Implement a Linear Queue in C using an array and demonstrate FIFO behavior and the false overflow limitation.',
    algorithm: '1. Set front = -1, rear = -1.\n2. enqueue(val): if rear == MAX - 1 print overflow; if front == -1 front = 0; arr[++rear] = val.\n3. dequeue(): if front == -1 or front > rear print underflow; return arr[front++].\n4. Show false overflow state.',
    c_program: `#include <stdio.h>
#include <stdbool.h>

#define MAX 5

int queue[MAX];
int front = -1;
int rear = -1;

bool isFull(void) {
    return rear == MAX - 1;
}

bool isEmpty(void) {
    return front == -1 || front > rear;
}

void enqueue(int val) {
    if (isFull()) {
        printf("Queue Overflow! Cannot enqueue %d (rear = %d)\\n", val, rear);
        return;
    }
    if (front == -1) front = 0;
    queue[++rear] = val;
    printf("Enqueued: %d (front = %d, rear = %d)\\n", val, front, rear);
}

int dequeue(void) {
    if (isEmpty()) {
        printf("Queue Underflow! Queue is empty\\n");
        return -1;
    }
    int val = queue[front++];
    printf("Dequeued: %d (front = %d, rear = %d)\\n", val, front, rear);
    return val;
}

void display(void) {
    if (isEmpty()) {
        printf("Queue is empty\\n");
        return;
    }
    printf("Queue elements: ");
    for (int i = front; i <= rear; i++) {
        printf("%d ", queue[i]);
    }
    printf("\\n");
}

int main(void) {
    printf("--- Linear Queue Demonstration in C ---\\n");
    enqueue(10);
    enqueue(20);
    enqueue(30);
    display();

    dequeue();
    display();
    return 0;
}`,
    important_statements: '• if (front == -1) front = 0 initializes front on the very first enqueue.\n• queue[++rear] = val advances rear and stores the value.\n• int val = queue[front++] advances front, abandoning previous slots (False Overflow).',
    sample_input: 'Enqueue 10, 20, 30; Display; Dequeue; Display',
    expected_output: `--- Linear Queue Demonstration in C ---
Enqueued: 10 (front = 0, rear = 0)
Enqueued: 20 (front = 0, rear = 1)
Enqueued: 30 (front = 0, rear = 2)
Queue elements: 10 20 30 
Dequeued: 10 (front = 1, rear = 2)
Queue elements: 20 30`,
    dry_run: `Initial: front = -1, rear = -1.
1. enqueue(10): front = 0, rear = 0, queue[0] = 10.
2. enqueue(20): rear = 1, queue[1] = 20.
3. enqueue(30): rear = 2, queue[2] = 30.
4. dequeue(): reads queue[0]=10, front advances to 1. Slot 0 is now vacated but cannot be reused!`,
    viva_questions: [
      { q: 'What is the False Overflow problem in a linear array queue?', a: 'In a linear queue, once rear reaches MAX-1, no further elements can be enqueued even if elements were dequeued from the front and slots 0 to front-1 are completely vacant. Memory is trapped and wasted.' },
      { q: 'How is the false overflow problem solved?', a: 'By using a Circular Queue with modulo arithmetic (rear + 1) % MAX, which allows the rear pointer to wrap around to index 0 and reuse vacated front slots.' }
    ]
  },

  circular_queue: {
    name: 'Circular Queue (Modulo Ring Buffer)',
    type: 'data_structure',
    definition: 'A Circular Queue is an optimized linear data structure where the last position connects back to the first position in a ring buffer using modulo arithmetic, completely eliminating the false overflow problem. Full condition: (rear + 1) % MAX == front. Empty condition: front == -1.',
    working_principle: 'A Circular Queue uses the formula (index + 1) % MAX to advance pointers. When rear reaches MAX - 1, advancing rear yields (MAX - 1 + 1) % MAX = 0, wrapping around to reuse vacated slots at the beginning of the array. Full condition is (rear + 1) % MAX == front; empty condition is front == -1.',
    step_by_step: '1. Full Condition: (rear + 1) % MAX == front. If true, report Queue Full.\n2. Enqueue: if front == -1, set front = 0; rear = (rear + 1) % MAX; arr[rear] = val.\n3. Empty Condition: front == -1. If true, report Queue Empty.\n4. Dequeue: val = arr[front]; if front == rear (single item), reset front = -1, rear = -1; else front = (front + 1) % MAX.\n5. Traversal: start at front; loop until index == rear; advance using (i + 1) % MAX.',
    example: 'MAX = 5: Enqueue 10, 20, 30, 40, 50 -> rear=4, front=0 (Full).\nDequeue 10, 20 -> front becomes 2. Slots 0 and 1 are free.\nEnqueue 60 -> rear = (4 + 1) % 5 = 0! Stored at queue[0] (Wrap-around successful!).',
    ring_diagram: `
       [0: 60] <--- rear wraps here!
     /        \\
 [4: 50]      [1: empty]
    |           |
 [3: 40] ---- [2: 30] <--- front
`,
    advantages: '• Eliminates false overflow: 100% memory utilization of all allocated array slots\n• O(1) constant time insertion and deletion\n• Ideal for circular streaming data and round-robin buffers',
    disadvantages: '• Slightly more complex full and empty boundary conditions\n• Still bounded by maximum static capacity MAX',
    applications: '• Round-robin CPU process scheduling and traffic light controllers\n• Audio/Video multimedia circular ring streaming buffers\n• Keyboard buffer and asynchronous hardware input interrupt queues',
    time_complexity: '• Enqueue: O(1)\n• Dequeue: O(1)\n• Peek: O(1)\n• Display: O(n)',
    space_complexity: 'O(MAX) contiguous memory buffer.',
    conclusion: 'Circular Queues represent the definitive solution to array queue memory management, combining ring buffer wrapping with O(1) operations.',
    aim: 'Implement a Circular Queue in C using modulo arithmetic (rear + 1) % MAX to eliminate false overflow.',
    algorithm: '1. Initialize front = -1, rear = -1.\n2. isFull: (rear + 1) % MAX == front.\n3. isEmpty: front == -1.\n4. enqueue(val): if isFull return; if front == -1 front = 0; rear = (rear + 1) % MAX; queue[rear] = val.\n5. dequeue(): if isEmpty return; val = queue[front]; if front == rear reset -1; else front = (front + 1) % MAX.\n6. Demonstrate wrap-around in main().',
    c_program: `#include <stdio.h>
#include <stdbool.h>

#define MAX 5

int queue[MAX];
int front = -1;
int rear = -1;

bool isFull(void) {
    return (rear + 1) % MAX == front;
}

bool isEmpty(void) {
    return front == -1;
}

void enqueue(int val) {
    if (isFull()) {
        printf("Circular Queue Full! Cannot enqueue %d\\n", val);
        return;
    }
    if (front == -1) {
        front = 0;
    }
    rear = (rear + 1) % MAX;
    queue[rear] = val;
    printf("Enqueued %d (front = %d, rear = %d)\\n", val, front, rear);
}

int dequeue(void) {
    if (isEmpty()) {
        printf("Circular Queue Empty! Cannot dequeue\\n");
        return -1;
    }
    int val = queue[front];
    if (front == rear) {
        // Last element removed, reset queue
        front = -1;
        rear = -1;
    } else {
        front = (front + 1) % MAX;
    }
    printf("Dequeued %d (front = %d, rear = %d)\\n", val, front, rear);
    return val;
}

void display(void) {
    if (isEmpty()) {
        printf("Queue is empty\\n");
        return;
    }
    printf("Queue elements: ");
    int i = front;
    while (true) {
        printf("%d ", queue[i]);
        if (i == rear) break;
        i = (i + 1) % MAX;
    }
    printf("\\n");
}

int main(void) {
    printf("--- Circular Queue in C ---\\n");
    enqueue(10);
    enqueue(20);
    enqueue(30);
    enqueue(40);
    enqueue(50); // Queue is full (rear = 4)
    display();

    // Dequeue 2 elements to create free slots at front
    dequeue();
    dequeue();
    display();

    // Wrap-around enqueue
    printf("Enqueueing after dequeue (Wrap-around test):\\n");
    enqueue(60); // Should wrap to index 0
    enqueue(70); // Should wrap to index 1
    display();
    return 0;
}`,
    important_statements: '• (rear + 1) % MAX == front checks whether advancing rear by one step collides into front (Full Condition).\n• rear = (rear + 1) % MAX executes the circular wrap-around.\n• if (front == rear) front = -1, rear = -1 resets pointers when removing the single last element.',
    sample_input: 'Enqueue 5 items, Dequeue 2 items, Enqueue 2 items (wrap-around)',
    expected_output: `--- Circular Queue in C ---
Enqueued 10 (front = 0, rear = 0)
Enqueued 20 (front = 0, rear = 1)
Enqueued 30 (front = 0, rear = 2)
Enqueued 40 (front = 0, rear = 3)
Enqueued 50 (front = 0, rear = 4)
Queue elements: 10 20 30 40 50 
Dequeued 10 (front = 1, rear = 4)
Dequeued 20 (front = 2, rear = 4)
Queue elements: 30 40 50 
Enqueueing after dequeue (Wrap-around test):
Enqueued 60 (front = 2, rear = 0)
Enqueued 70 (front = 2, rear = 1)
Queue elements: 30 40 50 60 70`,
    dry_run: `Initial: front = -1, rear = -1, MAX = 5.
1. Enqueue 10, 20, 30, 40, 50 fills indices 0..4. front=0, rear=4.
2. (rear + 1) % MAX = (4 + 1) % 5 = 0 == front (0) -> Queue is Full!
3. Dequeue twice: reads 10 (front=1), reads 20 (front=2). Indices 0 and 1 are now empty.
4. Enqueue 60: rear = (4 + 1) % 5 = 0. queue[0] = 60. Wrap-around succeeds!
5. Enqueue 70: rear = (0 + 1) % 5 = 1. queue[1] = 70.
Queue contents: 30, 40, 50, 60, 70. Zero wasted space!`,
    viva_questions: [
      { q: 'Why does circular queue use modulo arithmetic (rear + 1) % MAX?', a: 'To enable wrap-around from the end of the array (index MAX - 1) back to index 0, allowing reuse of empty slots created by dequeuing.' },
      { q: 'What is the condition for a circular queue to be full?', a: '(rear + 1) % MAX == front.' }
    ]
  },

  all_queues: {
    name: 'Types of Queues (Master Guide)',
    type: 'concept',
    definition: 'A Queue is a linear FIFO data structure. The primary variations are Linear Queue, Circular Queue, Double-Ended Queue (Deque), and Priority Queue.',
    working_principle: '1. Linear Queue: Straight array where rear and front only move forward.\n2. Circular Queue: Modulo wrap-around ring buffer preventing false overflow.\n3. Deque: Double-Ended Queue permitting insertions and deletions at both front and rear.\n4. Priority Queue: Elements are served based on priority key rather than arrival order.',
    overview: `The 4 major types of queues in computer science:

1. **Linear Queue**: Basic FIFO queue where items enter at rear and exit from front. Suffers from the false overflow problem in fixed arrays.
2. **Circular Queue**: Connected end-to-end ring buffer using (rear + 1) % MAX. Solves false overflow and provides 100% memory utilization.
3. **Double-Ended Queue (Deque)**: Supports push and pop operations at both the front and rear ends. Can act as both a Stack and a Queue.
4. **Priority Queue**: Each element has an associated priority value; highest priority element is dequeued first, implemented efficiently with Heaps.`,
    comparison_table: `| Queue Type | Insertion End | Deletion End | False Overflow? | Best Underlying Storage |
| :--- | :--- | :--- | :--- | :--- |
| **Linear Queue** | Rear only | Front only | **Yes (Major limitation)** | Singly Linked List |
| **Circular Queue** | Rear (wraps modulo) | Front (wraps modulo) | **No (Eliminated)** | Circular Array |
| **Deque** | Both Front & Rear | Both Front & Rear | No (if circular) | Doubly Linked List / Circular Array |
| **Priority Queue** | Any position | Highest priority item | No | Binary Heap (Min/Max Heap) |`,
    verdict: `### 🎯 Exam Selection Verdict:
• Use **Circular Queue** whenever implementing a fixed-size FIFO buffer in an array.
• Use **Linear Queue with Linked List** when queue capacity is unbounded.
• Use **Deque** when elements need to be added or removed from both ends (e.g. work-stealing scheduling, sliding window maximum).
• Use **Priority Queue** for emergency interrupt handlers, Dijkstra's algorithm, and process priority schedulers.`
  }
};
