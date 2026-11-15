/**
 * Graphs & Hashing Module
 * BFS, DFS, Adjacency Matrix vs List, Hashing, Linear Probing, Separate Chaining.
 */

module.exports = {
  graphs: {
    title: 'Graphs & Graph Traversals',
    syllabus_code: 'DS-UNIT-7',
    bfs: {
      name: 'Breadth-First Search (BFS)',
      type: 'algorithm',
      definition: 'Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices at the current depth distance before moving on to vertices at the next depth level using a FIFO Queue.',
      working_principle: 'BFS starts at a designated source vertex, marks it visited, and enqueues it. In each iteration, it dequeues a vertex u, processes it, and examines all adjacent vertices v. If v is unvisited, it marks v as visited and enqueues v. It guarantees finding the shortest path in unweighted graphs.',
      step_by_step: '1. Create boolean array visited[V] initialized to false and a FIFO queue.\n2. Mark start vertex as visited[start] = true and enqueue(start).\n3. While queue is not empty:\n   a. u = dequeue().\n   b. Print u.\n   c. For every adjacent vertex v of u:\n      If visited[v] == false, visited[v] = true, enqueue(v).\n4. Repeat until queue is empty.',
      example: 'Graph with edges: 0-1, 0-2, 1-3, 2-4. BFS from 0:\nQueue: [0] -> dequeue 0, enqueue 1, 2. Queue: [1, 2]\nDequeue 1, enqueue 3. Queue: [2, 3]\nDequeue 2, enqueue 4. Queue: [3, 4]\nDequeue 3, dequeue 4 -> Result: 0 1 2 3 4.',
      advantages: '• Finds the shortest path in unweighted graphs\n• Visits vertices level by level\n• Never gets trapped in infinite depth branches',
      disadvantages: '• Memory intensive: Queue can grow to O(V) in wide graphs\n• Inefficient on deep narrow graphs compared to DFS',
      applications: '• Shortest path algorithms (Unweighted shortest path, Dijkstra precursor)\n• Peer-to-peer network discovery and social network degrees of separation\n• Web crawlers indexing web pages level by level',
      time_complexity: '• Adjacency List: O(V + E)\n• Adjacency Matrix: O(V^2)',
      space_complexity: 'O(V) for visited array and FIFO queue.',
      conclusion: 'BFS is the optimal search algorithm for level-order exploration and unweighted shortest hop routing.',
      aim: 'Implement Breadth-First Search (BFS) for an undirected graph using an Adjacency Matrix and FIFO Queue in C.',
      algorithm: '1. Represent graph with adj[V][V].\n2. Initialize visited[V] = false.\n3. Enqueue start node and mark visited.\n4. While queue not empty: dequeue u, print u, enqueue all unvisited neighbors of u.',
      c_program: `#include <stdio.h>
#include <stdbool.h>

#define V 5

int queue[V];
int front = -1, rear = -1;

void enqueue(int val) {
    if (rear == V - 1) return;
    if (front == -1) front = 0;
    queue[++rear] = val;
}

int dequeue(void) {
    if (front == -1 || front > rear) return -1;
    return queue[front++];
}

bool isQueueEmpty(void) {
    return front == -1 || front > rear;
}

void bfs(int adj[V][V], int startVertex) {
    bool visited[V] = {false};

    visited[startVertex] = true;
    enqueue(startVertex);

    printf("BFS Traversal starting from vertex %d: ", startVertex);
    while (!isQueueEmpty()) {
        int u = dequeue();
        printf("%d ", u);

        for (int v = 0; v < V; v++) {
            if (adj[u][v] == 1 && !visited[v]) {
                visited[v] = true;
                enqueue(v);
            }
        }
    }
    printf("\\n");
}

int main(void) {
    int adj[V][V] = {
        {0, 1, 1, 0, 0}, // 0 connects to 1, 2
        {1, 0, 0, 1, 0}, // 1 connects to 0, 3
        {1, 0, 0, 0, 1}, // 2 connects to 0, 4
        {0, 1, 0, 0, 0}, // 3 connects to 1
        {0, 0, 1, 0, 0}  // 4 connects to 2
    };

    bfs(adj, 0);
    return 0;
}`,
      important_statements: '• bool visited[V] = {false} prevents visiting a vertex multiple times in cyclic graphs.\n• adj[u][v] == 1 checks edge existence between u and v.\n• FIFO queue guarantees level-by-level vertex expansion.',
      sample_input: 'Adjacency matrix of 5 vertices, start vertex 0',
      expected_output: 'BFS Traversal starting from vertex 0: 0 1 2 3 4',
      dry_run: '1. Enqueue 0, visited[0]=true. Queue: [0].\n2. Dequeue 0. Neighbors 1, 2 enqueued. Queue: [1, 2].\n3. Dequeue 1. Neighbor 3 enqueued. Queue: [2, 3].\n4. Dequeue 2. Neighbor 4 enqueued. Queue: [3, 4].\n5. Dequeue 3, dequeue 4. Queue empty.\nTraversal: 0 1 2 3 4.',
      viva_questions: [
        { q: 'Why does BFS use a FIFO Queue rather than a LIFO Stack?', a: 'Because BFS processes vertices strictly in the order they were discovered (level-by-level), which is the defining characteristic of First-In, First-Out.' },
        { q: 'Can BFS find the shortest path in a weighted graph?', a: 'No, BFS only guarantees the shortest path when all edge weights are uniform (unweighted graphs). For weighted graphs, Dijkstra algorithm is required.' }
      ]
    },

    dfs: {
      name: 'Depth-First Search (DFS)',
      type: 'algorithm',
      definition: 'Depth-First Search (DFS) is an edge-based graph traversal algorithm that explores as deeply as possible along each branch before backtracking using recursion or an explicit LIFO Stack.',
      working_principle: 'Starting from a source vertex, DFS marks the current vertex visited, processes it, and recursively explores the first unvisited neighbor. It continues plunging deeper until a dead end (no unvisited neighbors) is reached, at which point it backtracks to previous decision points.',
      step_by_step: '1. Maintain a boolean array visited[V] initialized to false.\n2. In dfsUtil(u): mark visited[u] = true and print u.\n3. For each adjacent vertex v of u:\n   If visited[v] == false, recursively call dfsUtil(v).\n4. Backtrack automatically when all neighbors of u are visited.',
      example: 'Graph with edges: 0-1, 1-3, 0-2, 2-4. DFS from 0:\nVisits 0 -> dives to 1 -> dives to 3 (dead end, backtracks to 1, backtracks to 0) -> dives to 2 -> dives to 4.\nOutput: 0 1 3 2 4.',
      advantages: '• Memory efficient on deep narrow graphs: space is proportional to tree/graph depth O(V)\n• Naturally detects cycles in directed and undirected graphs\n• Foundation for topological sorting and strongly connected components (Kosaraju, Tarjan)',
      disadvantages: '• Does not guarantee shortest path in unweighted graphs\n• Can get trapped in infinite paths if graph is infinite and unvisited flags fail',
      applications: '• Cycle detection in computer networks and compiler dependency graphs\n• Topological sorting for build tools (Make, CMake)\n• Solving mazes, puzzles (Sudoku, N-Queens), and chess game trees',
      time_complexity: '• Adjacency List: O(V + E)\n• Adjacency Matrix: O(V^2)',
      space_complexity: 'O(V) for visited array and recursive call stack.',
      conclusion: 'DFS is the premier graph exploration algorithm for exhaustive path search, cycle detection, and topological sequencing.',
      aim: 'Implement Depth-First Search (DFS) for an undirected graph using an Adjacency Matrix and recursion in C.',
      algorithm: '1. Represent graph with adj[V][V].\n2. Initialize visited[V] = false.\n3. In dfs(u): mark visited[u] = true, print u; for each neighbor v, if unvisited dfs(v).\n4. Call from main().',
      c_program: `#include <stdio.h>
#include <stdbool.h>

#define V 5

void dfsUtil(int adj[V][V], int u, bool visited[V]) {
    visited[u] = true;
    printf("%d ", u);

    for (int v = 0; v < V; v++) {
        if (adj[u][v] == 1 && !visited[v]) {
            dfsUtil(adj, v, visited);
        }
    }
}

void dfs(int adj[V][V], int startVertex) {
    bool visited[V] = {false};
    printf("DFS Traversal starting from vertex %d: ", startVertex);
    dfsUtil(adj, startVertex, visited);
    printf("\\n");
}

int main(void) {
    int adj[V][V] = {
        {0, 1, 1, 0, 0}, // 0 connects to 1, 2
        {1, 0, 0, 1, 0}, // 1 connects to 0, 3
        {1, 0, 0, 0, 1}, // 2 connects to 0, 4
        {0, 1, 0, 0, 0}, // 3 connects to 1
        {0, 0, 1, 0, 0}  // 4 connects to 2
    };

    dfs(adj, 0);
    return 0;
}`,
      important_statements: '• dfsUtil(adj, v, visited) plunges down neighbor branch recursively.\n• visited[u] = true breaks cycles and prevents infinite recursion.\n• Return of recursive call acts as automatic backtracking.',
      sample_input: 'Adjacency matrix of 5 vertices, start vertex 0',
      expected_output: 'DFS Traversal starting from vertex 0: 0 1 3 2 4',
      dry_run: '1. Call dfs(0): visited[0]=true, print 0.\n2. Neighbor 1 is unvisited: call dfs(1) -> visited[1]=true, print 1.\n3. Neighbor 3 of 1 is unvisited: call dfs(3) -> visited[3]=true, print 3.\n4. Node 3 has no more unvisited neighbors -> backtracks to 1, then backtracks to 0.\n5. Neighbor 2 of 0 is unvisited: call dfs(2) -> visited[2]=true, print 2.\n6. Neighbor 4 of 2 is unvisited: call dfs(4) -> visited[4]=true, print 4.\nTraversal: 0 1 3 2 4.',
      viva_questions: [
        { q: 'How does DFS detect cycles in a directed graph?', a: 'By maintaining an active recursion stack array (recStack). If an adjacent vertex is currently in recStack (a back-edge), a cycle is detected.' }
      ]
    },

    adj_matrix_vs_adj_list: {
      name: 'Adjacency Matrix vs Adjacency List',
      type: 'concept',
      definition: 'Adjacency Matrix and Adjacency List are the two primary memory representations of graph data structures.',
      working_principle: '• Adjacency Matrix uses a 2D array adj[V][V] where adj[u][v] = 1 indicates an edge.\n• Adjacency List uses an array of linked lists head[V] where head[u] stores all adjacent neighbors of u.',
      comparison_table: `| Parameter | Adjacency Matrix | Adjacency List |
| :--- | :--- | :--- |
| **Data Structure** | 2D Array \`adj[V][V]\` | Array of Linked Lists \`head[V]\` |
| **Space Complexity** | **O(V^2)** | **O(V + E)** (optimal for sparse graphs) |
| **Edge Existence Query** | **O(1)** direct check | **O(degree(u))** list traversal |
| **Finding All Neighbors** | **O(V)** row scan | **O(degree(u))** neighbor traversal |
| **Memory Efficiency** | High overhead for sparse graphs | Extremely compact for sparse graphs |
| **Adding New Vertex** | O(V^2) array reallocation | O(1) append to list array |`,
      verdict: 'Use **Adjacency Matrix** for dense graphs (E ~ V^2) where O(1) edge lookup is critical. Use **Adjacency List** for almost all standard and sparse graphs to avoid quadratic space complexity.'
    }
  },

  hashing: {
    title: 'Hashing & Hash Tables',
    syllabus_code: 'DS-UNIT-8',
    hashing_concept: {
      name: 'Hashing & Hash Tables',
      type: 'concept',
      definition: 'Hashing is a technique that maps large keys of arbitrary size to fixed-size array indices using a mathematical Hash Function, providing average O(1) search, insert, and delete operations. Table fullness is quantified by the load factor alpha = n / m.',
      working_principle: 'A hash function h(k) transforms key k into an array index: index = h(k) % TABLE_SIZE. The load factor alpha = n / m measures fullness (n elements in m slots). Because the universe of keys is much larger than table size, the Pigeonhole Principle guarantees that two distinct keys will eventually hash to the identical index, producing a Hash Collision.',
      step_by_step: '1. Compute hash code: index = hash(key) % TABLE_SIZE.\n2. If slot is empty: store key at index.\n3. If collision occurs: invoke collision resolution strategy (Linear Probing or Separate Chaining).\n4. Track Load Factor: alpha = n / m (items / slots).\n5. Rehash if load factor exceeds threshold (typically 0.7 for open addressing).',
      example: 'Table Size = 10, Hash Function h(k) = k % 10. Keys: 23 -> index 3; 45 -> index 5; 33 -> index 3 (COLLISION with 23!).',
      advantages: '• Constant O(1) average-case time for search, insert, and delete\n• Extremely fast lookups compared to binary search (O(log n))\n• Flexible key types (integers, strings, objects)',
      disadvantages: '• Worst-case time degrades to O(n) if many keys collide into the same slot\n• Does not maintain sorted order (cannot perform range queries efficiently)\n• Requires good hash function distribution to avoid clustering',
      applications: '• Database index hashing and caching systems (Redis, Memcached)\n• Symbol tables in compilers and interpreters\n• Cryptography, digital signatures, and checksum verification',
      time_complexity: '• Average Case: O(1)\n• Worst Case (All keys collide): O(n)',
      space_complexity: 'O(m) table capacity plus collision nodes.',
      conclusion: 'Hashing provides unmatched constant-time performance when collisions are properly managed with open addressing or separate chaining.',
      viva_questions: [
        { q: 'What is the Load Factor (alpha) in a hash table?', a: 'The load factor alpha = n / m, where n is the number of inserted elements and m is the table capacity. It measures table fullness and dictates when to rehash.' },
        { q: 'What is a hash collision and why is it unavoidable?', a: 'A collision occurs when two distinct keys yield the same hash table index. By the Pigeonhole Principle, collisions are mathematically unavoidable because possible keys vastly exceed table capacity.' }
      ]
    },

    linear_probing: {
      name: 'Linear Probing (Open Addressing)',
      type: 'algorithm',
      definition: 'Linear Probing is an open addressing collision resolution method where, upon encountering an occupied slot, the algorithm sequentially checks consecutive adjacent slots (index + 1, index + 2, ...) modulo table size until an empty slot is located.',
      working_principle: 'Probe sequence formula: h(k, i) = (h\'(k) + i) % TABLE_SIZE, where i = 0, 1, 2, ... Primary advantage is excellent cache locality because slots are contiguous in RAM. Primary disadvantage is Primary Clustering, where occupied slots group into large blocks, increasing search times.',
      step_by_step: '1. Calculate initial index = key % TABLE_SIZE.\n2. While table[index] is occupied and not deleted:\n   index = (index + 1) % TABLE_SIZE.\n3. Insert key into the first empty slot found.\n4. On deletion: mark slot with sentinel DELETED value so probing chains are not broken.',
      example: 'Table size 7, keys: 10, 17, 24.\n10 % 7 = 3 -> table[3] = 10.\n17 % 7 = 3 (Collision!) -> probe 4 -> table[4] = 17.\n24 % 7 = 3 (Collision!) -> probe 4 (full) -> probe 5 -> table[5] = 24.',
      advantages: '• High cache locality: contiguous array scanning\n• Zero pointer memory overhead: entirely stored in array',
      disadvantages: '• Primary clustering: long clusters of occupied slots degrade performance to O(n)\n• Performance drops drastically when load factor exceeds 0.7',
      applications: '• High-performance hardware memory caches\n• Symbol tables where table size is generously preallocated',
      time_complexity: '• Average: O(1)\n• Worst (Severe clustering): O(n)',
      space_complexity: 'O(TABLE_SIZE) contiguous array storage.',
      conclusion: 'Linear probing is fast due to CPU cache effects but requires keeping load factor below 0.7 to avoid clustering.',
      aim: 'Implement a Hash Table in C with Linear Probing collision resolution.',
      algorithm: '1. Define table array with EMPTY = -1.\n2. insert(key): idx = key % SIZE; while table[idx] != EMPTY: idx = (idx + 1) % SIZE; table[idx] = key.\n3. search(key): check slots sequentially.\n4. Display in main().',
      c_program: `#include <stdio.h>
#include <stdbool.h>

#define TABLE_SIZE 7
#define EMPTY -1

int hashTable[TABLE_SIZE];

void initTable(void) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        hashTable[i] = EMPTY;
    }
}

int hashFunction(int key) {
    return key % TABLE_SIZE;
}

void insert(int key) {
    int index = hashFunction(key);
    int startIndex = index;

    while (hashTable[index] != EMPTY) {
        index = (index + 1) % TABLE_SIZE;
        if (index == startIndex) {
            printf("Hash Table Full! Cannot insert %d\\n", key);
            return;
        }
    }
    hashTable[index] = key;
    printf("Inserted %d at index %d\\n", key, index);
}

int search(int key) {
    int index = hashFunction(key);
    int startIndex = index;

    while (hashTable[index] != EMPTY) {
        if (hashTable[index] == key) return index;
        index = (index + 1) % TABLE_SIZE;
        if (index == startIndex) break;
    }
    return -1;
}

void display(void) {
    printf("Hash Table Contents:\\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (hashTable[i] != EMPTY) {
            printf("  Index %d: %d\\n", i, hashTable[i]);
        } else {
            printf("  Index %d: [EMPTY]\\n", i);
        }
    }
}

int main(void) {
    initTable();
    printf("--- Hash Table with Linear Probing ---\\n");
    insert(10); // 10 % 7 = 3
    insert(17); // 17 % 7 = 3 -> Probes to 4
    insert(24); // 24 % 7 = 3 -> Probes to 5
    insert(8);  // 8 % 7 = 1
    display();

    int key = 17;
    int pos = search(key);
    printf("Search for %d: Found at index %d\\n", key, pos);
    return 0;
}`,
      important_statements: '• index = (index + 1) % TABLE_SIZE executes the sequential linear probe with wrap-around.\n• if (index == startIndex) prevents infinite loops when the hash table is 100% full.',
      sample_input: 'Insert keys 10, 17, 24, 8 into table of size 7',
      expected_output: `--- Hash Table with Linear Probing ---
Inserted 10 at index 3
Inserted 17 at index 4
Inserted 24 at index 5
Inserted 8 at index 1
Hash Table Contents:
  Index 0: [EMPTY]
  Index 1: 8
  Index 2: [EMPTY]
  Index 3: 10
  Index 4: 17
  Index 5: 24
  Index 6: [EMPTY]
Search for 17: Found at index 4`,
      dry_run: `1. 10 % 7 = 3 -> Slot 3 is EMPTY -> table[3] = 10.
2. 17 % 7 = 3 -> Slot 3 occupied by 10! Probe (3+1)%7 = 4. Slot 4 is EMPTY -> table[4] = 17.
3. 24 % 7 = 3 -> Slot 3 occupied, slot 4 occupied! Probe (4+1)%7 = 5. Slot 5 is EMPTY -> table[5] = 24.
4. 8 % 7 = 1 -> Slot 1 is EMPTY -> table[1] = 8.`,
      viva_questions: [
        { q: 'What is Primary Clustering in Linear Probing?', a: 'Primary clustering occurs when colliding keys form continuous blocks of occupied cells. Any key hashing into a cluster must probe all the way to the end of the cluster, widening it further and degrading search time.' }
      ]
    },

    separate_chaining: {
      name: 'Separate Chaining (Closed Addressing)',
      type: 'concept',
      definition: 'Separate Chaining is a collision resolution technique where each slot of the hash table acts as the head of an independent linked list storing all keys that hash to that same index.',
      working_principle: 'When key k hashes to index = h(k), it is simply inserted into the linked list at table[index] (typically prepended at the head in O(1) time). The table can store more elements than its allocated capacity (load factor alpha > 1).',
      comparison_table: `| Parameter | Linear Probing (Open Addressing) | Separate Chaining (Closed Addressing) |
| :--- | :--- | :--- |
| **Storage Mechanism** | Keys stored directly in table array | Slots store pointers to linked lists |
| **Max Capacity** | Strictly bounded by TABLE_SIZE | Unbounded (load factor alpha can exceed 1.0) |
| **Clustering** | Suffers from Primary Clustering | **Zero clustering** between distinct buckets |
| **Memory Overhead** | Zero pointer overhead | 4/8 bytes pointer overhead per node |
| **Cache Performance** | Excellent (contiguous array memory) | Poor (scattered heap nodes) |
| **Deletion** | Requires special DELETED marker | Simple standard linked list node deletion |`,
      verdict: 'Use **Separate Chaining** when the number of keys is unpredictable or high (alpha > 0.7). Use **Linear Probing** when memory is tightly constrained and high cache locality is desired.'
    }
  }
};
