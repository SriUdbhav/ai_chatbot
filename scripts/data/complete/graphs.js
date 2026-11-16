/**
 * Complete Graphs Knowledge Module (11 Operations with Full 14-Section Schemas)
 * Covers Representations (Matrix, List), Traversals (BFS, DFS variants), and Graph Types (Directed, Undirected, Weighted).
 */

module.exports = [
  {
    "id": "graph_representation",
    "title": "Graph Representation Overview — Matrix vs List",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_representation",
    "subcategoryName": "Graph Representations",
    "keywords": [
      "graph representation",
      "adjacency matrix vs list",
      "graph storage",
      "graph data structures"
    ],
    "definition": "A Graph is a non-linear data structure G = (V, E) consisting of a set of vertices (V) and edges (E) connecting pairs of vertices, commonly represented using an Adjacency Matrix or an Adjacency List.",
    "concept_explanation": "An Adjacency Matrix uses a 2D V x V array where `matrix[u][v] = 1` indicates an edge between u and v. It requires O(V^2) space regardless of the number of edges, making it ideal for dense graphs. An Adjacency List uses an array of linked lists of size V, where index `u` holds a list of neighbors adjacent to `u`. It consumes O(V + E) space, making it optimal for sparse graphs (E << V^2).",
    "algorithm": "Representation Comparison:\n• Dense Graph (E ~ V^2): Adjacency Matrix preferred (O(1) edge lookup).\n• Sparse Graph (E << V^2): Adjacency List preferred (O(V + E) memory).",
    "pseudocode": "Matrix: int adj[V][V]\nList:   Node* adjList[V]",
    "c_program": "#include <stdio.h>\n#define V 4\n\nvoid printComparison(void) {\n    printf(\"=== Graph Representation Overview ===\\n\");\n    printf(\"| Feature          | Adjacency Matrix | Adjacency List   |\\n\");\n    printf(\"|------------------|------------------|------------------|\\n\");\n    printf(\"| Memory Space     | O(V^2)           | O(V + E)         |\\n\");\n    printf(\"| Edge Lookup      | O(1)             | O(degree(v))     |\\n\");\n    printf(\"| Add Edge         | O(1)             | O(1)             |\\n\");\n    printf(\"| Iterate Neighbors| O(V)             | O(degree(v))     |\\n\");\n    printf(\"| Best Suited For  | Dense Graphs     | Sparse Graphs    |\\n\");\n}\n\nint main(void) {\n    printComparison();\n    return 0;\n}",
    "sample_input": "Comparison of Matrix vs List for V = 4",
    "sample_output": "=== Graph Representation Overview ===\n| Feature          | Adjacency Matrix | Adjacency List   |\n|------------------|------------------|------------------|\n| Memory Space     | O(V^2)           | O(V + E)         |\n| Edge Lookup      | O(1)             | O(degree(v))     |\n| Add Edge         | O(1)             | O(1)             |\n| Iterate Neighbors| O(V)             | O(degree(v))     |\n| Best Suited For  | Dense Graphs     | Sparse Graphs    |",
    "dry_run": "Demonstrates the trade-offs between dense matrix lookups and sparse linked list memory footprints.",
    "time_complexity": "• Matrix: O(1) lookup, List: O(deg(u)) lookup.",
    "space_complexity": "• Matrix: O(V^2), List: O(V + E).",
    "advantages_disadvantages": "Matrix offers instant edge verification; List saves massive memory on real-world sparse graphs.",
    "applications": "• Social network connections (List), small dense routing circuits (Matrix).",
    "viva_questions": [
      {
        "q": "When is an adjacency matrix preferred over an adjacency list?",
        "a": "When the graph is dense (E is close to V^2) or when frequent O(1) edge lookups are required."
      }
    ]
  },
  {
    "id": "graph_adj_matrix",
    "title": "Adjacency Matrix Implementation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_representation",
    "subcategoryName": "Graph Representations",
    "keywords": [
      "adjacency matrix",
      "graph 2d array",
      "matrix representation graph",
      "adj matrix c"
    ],
    "definition": "An Adjacency Matrix is a 2D boolean array `adj[V][V]` where `adj[i][j] = 1` indicates an edge from vertex i to vertex j, and 0 indicates no edge.",
    "concept_explanation": "For an undirected graph, the matrix is symmetric across the main diagonal (`adj[i][j] == adj[j][i]`). For a directed graph, the matrix may be asymmetric. Diagonal entries `adj[i][i]` represent self-loops.",
    "algorithm": "Step 1: Declare adj[V][V] initialized to 0.\nStep 2: addEdge(u, v):\n        adj[u][v] = 1\n        adj[v][u] = 1 (if undirected)\nStep 3: printMatrix():\n        Loop i = 0 to V-1, j = 0 to V-1: print adj[i][j].",
    "pseudocode": "int adj[V][V] = {0}\nfunction addEdge(u, v):\n    adj[u][v] = 1\n    adj[v][u] = 1",
    "c_program": "#include <stdio.h>\n#define V 4\n\nint adj[V][V];\n\nvoid initGraph(void) {\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) adj[i][j] = 0;\n    }\n}\n\nvoid addEdge(int u, int v) {\n    adj[u][v] = 1;\n    adj[v][u] = 1; // Undirected graph\n}\n\nvoid printMatrix(void) {\n    printf(\"Adjacency Matrix (%dx%d):\\n   \", V, V);\n    for (int i = 0; i < V; i++) printf(\"%d \", i);\n    printf(\"\\n  -------\\n\");\n    for (int i = 0; i < V; i++) {\n        printf(\"%d| \", i);\n        for (int j = 0; j < V; j++) {\n            printf(\"%d \", adj[i][j]);\n        }\n        printf(\"\\n\");\n    }\n}\n\nint main(void) {\n    printf(\"=== Adjacency Matrix Implementation ===\\n\");\n    initGraph();\n    addEdge(0, 1);\n    addEdge(0, 2);\n    addEdge(1, 2);\n    addEdge(2, 3);\n    printMatrix();\n    return 0;\n}",
    "sample_input": "Edges: (0,1), (0,2), (1,2), (2,3) on 4 vertices",
    "sample_output": "=== Adjacency Matrix Implementation ===\nAdjacency Matrix (4x4):\n   0 1 2 3 \n  -------\n0| 0 1 1 0 \n1| 1 0 1 0 \n2| 1 1 0 1 \n3| 0 0 1 0 ",
    "dry_run": "adj[0][1]=1, adj[1][0]=1. adj[0][2]=1, adj[2][0]=1. Symmetrical matrix constructed.",
    "time_complexity": "• Add Edge: O(1), Check Edge: O(1), Display: O(V^2).",
    "space_complexity": "• O(V^2) static contiguous storage.",
    "advantages_disadvantages": "O(1) edge lookup; high memory overhead O(V^2) for sparse graphs.",
    "applications": "• Dense circuit design, All-Pairs Shortest Path (Floyd-Warshall algorithm).",
    "viva_questions": [
      {
        "q": "Why is the adjacency matrix of an undirected graph symmetric?",
        "a": "Because an undirected edge between u and v represents a bidirectional link: (u, v) and (v, u) are identical."
      }
    ]
  },
  {
    "id": "graph_adj_list",
    "title": "Adjacency List Implementation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_representation",
    "subcategoryName": "Graph Representations",
    "keywords": [
      "adjacency list",
      "graph linked list array",
      "sparse graph representation",
      "adj list c"
    ],
    "definition": "An Adjacency List represents a graph using an array of linked lists, where array index `i` heads a linked list containing all vertices directly adjacent to vertex `i`.",
    "concept_explanation": "Rather than reserving space for non-existent edges, each vertex only maintains pointers to its immediate neighbors. This reduces space complexity from O(V^2) to O(V + E).",
    "algorithm": "Step 1: Declare array of node pointers: struct Node* adjList[V] = {NULL}.\nStep 2: addEdge(u, v):\n        Allocate newNode with dest = v, prepend to adjList[u].\n        Allocate newNode with dest = u, prepend to adjList[v] (if undirected).",
    "pseudocode": "struct Node: dest, next\nNode* adjList[V] = {NULL}\nfunction addEdge(u, v):\n    adjList[u] = prepend(adjList[u], v)\n    adjList[v] = prepend(adjList[v], u)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n#define V 4\n\nstruct Node {\n    int dest;\n    struct Node* next;\n};\n\nstruct Node* adjList[V];\n\nvoid addEdge(int src, int dest) {\n    // Add edge src -> dest\n    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));\n    n1->dest = dest;\n    n1->next = adjList[src];\n    adjList[src] = n1;\n\n    // Add edge dest -> src (Undirected)\n    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));\n    n2->dest = src;\n    n2->next = adjList[dest];\n    adjList[dest] = n2;\n}\n\nvoid printGraph(void) {\n    printf(\"Adjacency List Representation:\\n\");\n    for (int i = 0; i < V; i++) {\n        struct Node* temp = adjList[i];\n        printf(\"Vertex %d: \", i);\n        while (temp) {\n            printf(\"-> %d \", temp->dest);\n            temp = temp->next;\n        }\n        printf(\"-> NULL\\n\");\n    }\n}\n\nint main(void) {\n    printf(\"=== Adjacency List Implementation ===\\n\");\n    for (int i = 0; i < V; i++) adjList[i] = NULL;\n    addEdge(0, 1);\n    addEdge(0, 2);\n    addEdge(1, 2);\n    addEdge(2, 3);\n    printGraph();\n    return 0;\n}",
    "sample_input": "Edges: (0,1), (0,2), (1,2), (2,3) on 4 vertices",
    "sample_output": "=== Adjacency List Implementation ===\nAdjacency List Representation:\nVertex 0: -> 2 -> 1 -> NULL\nVertex 1: -> 2 -> 0 -> NULL\nVertex 2: -> 3 -> 1 -> 0 -> NULL\nVertex 3: -> 2 -> NULL",
    "dry_run": "Vertex 0 links to 2 and 1. Vertex 2 links to 3, 1, 0. Memory allocated dynamically per edge.",
    "time_complexity": "• Add Edge: O(1), Space: O(V + E), Iterating neighbors: O(deg(v)).",
    "space_complexity": "• O(V + E) heap dynamic storage.",
    "advantages_disadvantages": "Optimal space for sparse graphs; checking if edge (u, v) exists takes O(degree(u)).",
    "applications": "• Web graph links, road networks, BFS/DFS traversal algorithms.",
    "viva_questions": [
      {
        "q": "What is the total number of nodes across all linked lists in an undirected graph?",
        "a": "2 * E nodes (since each edge appears twice)."
      }
    ]
  },
  {
    "id": "graph_bfs",
    "title": "Breadth-First Search (BFS) Traversal",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "bfs traversal",
      "breadth first search graph",
      "bfs c",
      "shortest path unweighted"
    ],
    "definition": "Breadth-First Search (BFS) traverses a graph in breadth-first fashion, visiting all immediate neighbors of the starting vertex first (distance 1), then all unvisited vertices at distance 2, and so forth using a queue and a visited array.",
    "concept_explanation": "BFS explores vertices layer by layer like ripples in water. A boolean `visited[]` array prevents cycles and redundant processing. BFS is guaranteed to discover the shortest path between two vertices in an unweighted graph.",
    "algorithm": "Step 1: Mark startVertex as visited: visited[startVertex] = true.\nStep 2: Enqueue startVertex into queue Q.\nStep 3: While Q is not empty:\n        u = dequeue(Q)\n        Visit u (print u)\n        For each unvisited neighbor v of u:\n            visited[v] = true\n            enqueue(Q, v)",
    "pseudocode": "function BFS(start):\n    visited = [false]*V\n    queue Q\n    visited[start] = true; enqueue(Q, start)\n    while Q not empty:\n        u = dequeue(Q)\n        print u\n        for v in adj[u]:\n            if not visited[v]:\n                visited[v] = true\n                enqueue(Q, v)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define V 5\n\nint adj[V][V];\nbool visited[V];\nint queue[V];\nint front = 0, rear = 0;\n\nvoid addEdge(int u, int v) { adj[u][v] = 1; adj[v][u] = 1; }\n\nvoid bfs(int startVertex) {\n    for (int i = 0; i < V; i++) visited[i] = false;\n    front = rear = 0;\n\n    visited[startVertex] = true;\n    queue[rear++] = startVertex;\n\n    printf(\"BFS Order starting from %d: \", startVertex);\n    while (front < rear) {\n        int u = queue[front++];\n        printf(\"%d \", u);\n\n        for (int v = 0; v < V; v++) {\n            if (adj[u][v] == 1 && !visited[v]) {\n                visited[v] = true;\n                queue[rear++] = v;\n            }\n        }\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    printf(\"=== Breadth-First Search (BFS) ===\\n\");\n    for (int i = 0; i < V; i++) for (int j = 0; j < V; j++) adj[i][j] = 0;\n    addEdge(0, 1); addEdge(0, 2); addEdge(1, 3); addEdge(2, 4);\n    bfs(0);\n    return 0;\n}",
    "sample_input": "Graph with edges (0,1), (0,2), (1,3), (2,4). Start BFS at 0",
    "sample_output": "=== Breadth-First Search (BFS) ===\nBFS Order starting from 0: 0 1 2 3 4",
    "dry_run": "Q: [0] -> pop 0, push 1, 2.\nQ: [1, 2] -> pop 1, push 3.\nQ: [2, 3] -> pop 2, push 4.\nQ: [3, 4] -> pop 3, pop 4. Result: 0 1 2 3 4.",
    "time_complexity": "• O(V + E) with adjacency list; O(V^2) with adjacency matrix.",
    "space_complexity": "• O(V) for queue and visited array.",
    "advantages_disadvantages": "Finds shortest path in unweighted graphs; requires extra memory for queue.",
    "applications": "• Peer-to-peer torrent discovery, GPS unweighted route mapping, social network 1st/2nd degree friends.",
    "viva_questions": [
      {
        "q": "Why is a visited array mandatory in graph BFS unlike tree level-order traversal?",
        "a": "Because graphs can contain cycles, which would cause an infinite loop without a visited tracking array."
      }
    ]
  },
  {
    "id": "graph_dfs",
    "title": "Depth-First Search (DFS) Traversal",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "dfs traversal",
      "depth first search graph",
      "dfs c",
      "backtracking graph"
    ],
    "definition": "Depth-First Search (DFS) is a traversal technique that starts at a designated vertex and explores as deeply as possible along each branch before backtracking, using recursion or an explicit stack.",
    "concept_explanation": "DFS dives along paths until reaching a dead end (a vertex with no unvisited neighbors), then backtracks to previous decision points. A visited array tracks explored vertices.",
    "algorithm": "DFS(u):\nStep 1: Mark visited[u] = true.\nStep 2: Print / process u.\nStep 3: For each neighbor v of u:\n        If visited[v] == false:\n            DFS(v)",
    "pseudocode": "function DFS(u):\n    visited[u] = true\n    print u\n    for v in adj[u]:\n        if not visited[v]:\n            DFS(v)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define V 5\n\nint adj[V][V];\nbool visited[V];\n\nvoid addEdge(int u, int v) { adj[u][v] = 1; adj[v][u] = 1; }\n\nvoid dfs(int u) {\n    visited[u] = true;\n    printf(\"%d \", u);\n\n    for (int v = 0; v < V; v++) {\n        if (adj[u][v] == 1 && !visited[v]) {\n            dfs(v);\n        }\n    }\n}\n\nint main(void) {\n    printf(\"=== Depth-First Search (DFS) Traversal ===\\n\");\n    for (int i = 0; i < V; i++) {\n        visited[i] = false;\n        for (int j = 0; j < V; j++) adj[i][j] = 0;\n    }\n    addEdge(0, 1); addEdge(0, 2); addEdge(1, 3); addEdge(2, 4);\n\n    printf(\"DFS Order starting from 0: \");\n    dfs(0);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Edges: (0,1), (0,2), (1,3), (2,4). Start DFS at 0",
    "sample_output": "=== Depth-First Search (DFS) Traversal ===\nDFS Order starting from 0: 0 1 3 2 4",
    "dry_run": "Visit 0 -> neighbor 1 unvisited -> visit 1 -> neighbor 3 unvisited -> visit 3 (dead end, backtrack to 1, backtrack to 0) -> neighbor 2 unvisited -> visit 2 -> visit 4. Result: 0 1 3 2 4.",
    "time_complexity": "• O(V + E) with adjacency list; O(V^2) with matrix.",
    "space_complexity": "• O(V) call stack / visited array.",
    "advantages_disadvantages": "Memory efficient for deep paths; detects cycles and connected components.",
    "applications": "• Cycle detection, topological sorting, solving mazes and puzzles.",
    "viva_questions": [
      {
        "q": "What data structure implicitly powers recursive DFS?",
        "a": "The system function call stack."
      }
    ]
  },
  {
    "id": "graph_bfs_queue",
    "title": "BFS Traversal using Queue Data Structure",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "bfs queue c",
      "explicit queue bfs",
      "graph bfs fifo",
      "breadth first queue"
    ],
    "definition": "BFS Traversal using a Queue demonstrates the explicit FIFO queue mechanics (enqueue, dequeue, front, rear) that enforce breadth-first level order discovery in graphs.",
    "concept_explanation": "Vertices are processed in strict arrival order. Enqueueing marks a node visited so no node enters the queue multiple times.",
    "algorithm": "1. Enqueue root, mark visited.\n2. While queue not empty, dequeue current, inspect all neighbors, enqueue unvisited.",
    "pseudocode": "enqueue(start); visited[start] = true\nwhile queue:\n    curr = dequeue()\n    for neighbor in adj(curr):\n        if unvisited: mark and enqueue",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define V 4\n\nint queue[V];\nint front = 0, rear = 0;\n\nvoid enqueue(int x) { queue[rear++] = x; }\nint dequeue(void) { return queue[front++]; }\nbool isQueueEmpty(void) { return front == rear; }\n\nint main(void) {\n    int adj[V][V] = {\n        {0, 1, 1, 0},\n        {1, 0, 0, 1},\n        {1, 0, 0, 1},\n        {0, 1, 1, 0}\n    };\n    bool visited[V] = {false};\n\n    printf(\"=== BFS with Explicit Queue ===\\n\");\n    int start = 0;\n    visited[start] = true;\n    enqueue(start);\n\n    printf(\"BFS Sequence: \");\n    while (!isQueueEmpty()) {\n        int u = dequeue();\n        printf(\"%d \", u);\n        for (int v = 0; v < V; v++) {\n            if (adj[u][v] && !visited[v]) {\n                visited[v] = true;\n                enqueue(v);\n            }\n        }\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Square graph (0-1-3-2-0), start at 0",
    "sample_output": "=== BFS with Explicit Queue ===\nBFS Sequence: 0 1 2 3",
    "dry_run": "Q: [0]. Dequeue 0, enqueue 1, 2. Dequeue 1, enqueue 3. Dequeue 2. Dequeue 3. Output: 0 1 2 3.",
    "time_complexity": "• O(V^2) with matrix.",
    "space_complexity": "• O(V) queue buffer.",
    "advantages_disadvantages": "Clean separation of queue data structure from traversal logic.",
    "applications": "• Level-synchronous graph analytics.",
    "viva_questions": [
      {
        "q": "Why do we mark a vertex visited upon enqueueing rather than dequeueing?",
        "a": "To prevent the same neighbor from being enqueued multiple times by different predecessors."
      }
    ]
  },
  {
    "id": "graph_dfs_recursion",
    "title": "DFS Traversal using Recursion",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "recursive dfs",
      "dfs recursion c",
      "graph dfs recursive code"
    ],
    "definition": "Recursive DFS relies on the call stack to explore adjacent nodes, automatically unwinding (backtracking) when all edges from a vertex have been exhausted.",
    "concept_explanation": "Directly maps the graph traversal definition into recursive subproblems: visiting vertex u entails recursively visiting each unvisited neighbor v.",
    "algorithm": "dfsRecursive(u):\nvisited[u] = true\nprint u\nfor each neighbor v of u:\n    if not visited[v]:\n        dfsRecursive(v)",
    "pseudocode": "function dfsRec(u):\n    visited[u] = true\n    print u\n    for v in adj[u]:\n        if not visited[v]: dfsRec(v)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define V 4\n\nint adj[V][V] = {\n    {0, 1, 1, 0},\n    {1, 0, 0, 1},\n    {1, 0, 0, 1},\n    {0, 1, 1, 0}\n};\nbool visited[V];\n\nvoid dfsRecursive(int u) {\n    visited[u] = true;\n    printf(\"%d \", u);\n    for (int v = 0; v < V; v++) {\n        if (adj[u][v] && !visited[v]) {\n            dfsRecursive(v);\n        }\n    }\n}\n\nint main(void) {\n    printf(\"=== DFS Traversal using Recursion ===\\n\");\n    for (int i = 0; i < V; i++) visited[i] = false;\n    printf(\"DFS Path: \");\n    dfsRecursive(0);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Square graph (0-1-3-2-0), start at 0",
    "sample_output": "=== DFS Traversal using Recursion ===\nDFS Path: 0 1 3 2",
    "dry_run": "0 -> 1 -> 3 -> 2. All 4 nodes visited. Backtracks to 0.",
    "time_complexity": "• O(V + E) list, O(V^2) matrix.",
    "space_complexity": "• O(V) call stack.",
    "advantages_disadvantages": "Extremely concise and elegant code.",
    "applications": "• Pathfinding, flood fill algorithm, Kosaraju strongly connected components.",
    "viva_questions": [
      {
        "q": "What is the maximum recursion depth of DFS?",
        "a": "V (in a linear or chain graph)."
      }
    ]
  },
  {
    "id": "graph_dfs_stack",
    "title": "DFS Traversal using Explicit Stack",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_traversal",
    "subcategoryName": "Graph Traversals",
    "keywords": [
      "iterative dfs",
      "dfs explicit stack",
      "stack based dfs c",
      "non recursive dfs"
    ],
    "definition": "Iterative DFS avoids recursion by explicitly maintaining a LIFO stack to store vertices to visit, eliminating the danger of system call stack overflow on deep graphs.",
    "concept_explanation": "Push the start vertex onto an explicit stack. While the stack is not empty, pop vertex u. If u has not been visited, mark it visited and process it. Then push all unvisited neighbors of u onto the stack.",
    "algorithm": "Step 1: Push startVertex onto stack S.\nStep 2: While S is not empty:\n        u = pop(S)\n        If visited[u] is false:\n            visited[u] = true\n            Print u\n            For each neighbor v of u:\n                If not visited[v]:\n                    push(S, v)",
    "pseudocode": "function iterativeDFS(start):\n    stack S; push(S, start)\n    while not empty(S):\n        u = pop(S)\n        if not visited[u]:\n            visited[u] = true; print u\n            for v in adj[u]:\n                if not visited[v]: push(S, v)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#define V 4\n\nint stack[V * 2];\nint top = -1;\n\nvoid push(int x) { stack[++top] = x; }\nint pop(void) { return stack[top--]; }\nbool isStackEmpty(void) { return top == -1; }\n\nint main(void) {\n    int adj[V][V] = {\n        {0, 1, 1, 0},\n        {1, 0, 0, 1},\n        {1, 0, 0, 1},\n        {0, 1, 1, 0}\n    };\n    bool visited[V] = {false};\n\n    printf(\"=== DFS Traversal using Explicit Stack ===\\n\");\n    push(0);\n\n    printf(\"Iterative DFS Order: \");\n    while (!isStackEmpty()) {\n        int u = pop();\n        if (!visited[u]) {\n            visited[u] = true;\n            printf(\"%d \", u);\n            // Push unvisited neighbors\n            for (int v = V - 1; v >= 0; v--) {\n                if (adj[u][v] && !visited[v]) {\n                    push(v);\n                }\n            }\n        }\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Square graph, start at 0",
    "sample_output": "=== DFS Traversal using Explicit Stack ===\nIterative DFS Order: 0 1 3 2",
    "dry_run": "Stack: [0] -> pop 0, push 2, 1. Pop 1, push 3. Pop 3, push 2. Pop 2. Output: 0 1 3 2.",
    "time_complexity": "• O(V + E) list, O(V^2) matrix.",
    "space_complexity": "• O(V) stack storage.",
    "advantages_disadvantages": "Immune to call-stack overflow crashes on very deep graphs.",
    "applications": "• Production graph databases where graphs contain millions of sequential vertices.",
    "viva_questions": [
      {
        "q": "Why might you choose iterative DFS over recursive DFS?",
        "a": "To prevent stack overflow errors when exploring extremely large or deep graphs with small system call stacks."
      }
    ]
  },
  {
    "id": "graph_directed",
    "title": "Directed Graph (Digraph) Representation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_types",
    "subcategoryName": "Graph Variations",
    "keywords": [
      "directed graph",
      "digraph c",
      "in degree out degree",
      "directed adjacency matrix"
    ],
    "definition": "A Directed Graph (Digraph) consists of vertices connected by directional edges (arcs), where edge (u, v) allows traversal exclusively from u to v.",
    "concept_explanation": "In a directed graph, the adjacency matrix is generally asymmetric (`adj[u][v] != adj[v][u]`). The out-degree of vertex u is the row sum of row u. The in-degree of vertex v is the column sum of column v.",
    "algorithm": "Step 1: addEdge(u, v): set adj[u][v] = 1 (do not set adj[v][u]).\nStep 2: inDegree(v): count 1s in column v.\nStep 3: outDegree(u): count 1s in row u.",
    "pseudocode": "function addDirectedEdge(u, v):\n    adj[u][v] = 1\noutDegree(u) = sum(adj[u][*])\ninDegree(v)  = sum(adj[*][v])",
    "c_program": "#include <stdio.h>\n#define V 3\n\nint adj[V][V] = {0};\n\nvoid addArc(int u, int v) {\n    adj[u][v] = 1; // Directed: u -> v only\n}\n\nint main(void) {\n    printf(\"=== Directed Graph (Digraph) Representation ===\\n\");\n    addArc(0, 1); // 0 -> 1\n    addArc(0, 2); // 0 -> 2\n    addArc(1, 2); // 1 -> 2\n\n    printf(\"Digraph Matrix:\\n\");\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) printf(\"%d \", adj[i][j]);\n        printf(\"\\n\");\n    }\n\n    printf(\"\\nDegrees:\\n\");\n    for (int i = 0; i < V; i++) {\n        int inDeg = 0, outDeg = 0;\n        for (int j = 0; j < V; j++) {\n            if (adj[i][j]) outDeg++;\n            if (adj[j][i]) inDeg++;\n        }\n        printf(\"Vertex %d: In-degree = %d, Out-degree = %d\\n\", i, inDeg, outDeg);\n    }\n    return 0;\n}",
    "sample_input": "Arcs: 0->1, 0->2, 1->2 on 3 vertices",
    "sample_output": "=== Directed Graph (Digraph) Representation ===\nDigraph Matrix:\n0 1 1 \n0 0 1 \n0 0 0 \n\nDegrees:\nVertex 0: In-degree = 0, Out-degree = 2\nVertex 1: In-degree = 1, Out-degree = 1\nVertex 2: In-degree = 2, Out-degree = 0",
    "dry_run": "Vertex 0 sends 2 arcs (out=2, in=0). Vertex 2 receives 2 arcs (in=2, out=0).",
    "time_complexity": "• Degree calculation: O(V) per vertex.",
    "space_complexity": "• O(V^2) matrix.",
    "advantages_disadvantages": "Accurately captures one-way dependencies.",
    "applications": "• Task dependency build graphs (Makefiles), webpage hyperlinks (PageRank).",
    "viva_questions": [
      {
        "q": "What is a vertex with in-degree 0 called?",
        "a": "A Source vertex."
      },
      {
        "q": "What is a vertex with out-degree 0 called?",
        "a": "A Sink vertex."
      }
    ]
  },
  {
    "id": "graph_undirected",
    "title": "Undirected Graph Representation & Degree Calculation",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_types",
    "subcategoryName": "Graph Variations",
    "keywords": [
      "undirected graph",
      "degree of vertex",
      "handshaking lemma",
      "undirected graph c"
    ],
    "definition": "An Undirected Graph consists of vertices connected by bidirectional edges, where the degree of a vertex is the total count of edges incident to it.",
    "concept_explanation": "According to the Handshaking Lemma, the sum of degrees of all vertices equals twice the number of edges: `sum(deg(v)) = 2 * |E|`. Hence, the number of odd-degree vertices must always be even.",
    "algorithm": "1. addEdge(u, v): adj[u][v] = 1; adj[v][u] = 1;\n2. degree(u) = count 1s in row u.\n3. Verify Handshaking Lemma: sum(deg) == 2 * edges.",
    "pseudocode": "function degree(u):\n    return count 1s in adj[u]",
    "c_program": "#include <stdio.h>\n#define V 4\n\nint adj[V][V] = {0};\nint edgeCount = 0;\n\nvoid addEdge(int u, int v) {\n    adj[u][v] = 1;\n    adj[v][u] = 1;\n    edgeCount++;\n}\n\nint main(void) {\n    printf(\"=== Undirected Graph & Degree Calculation ===\\n\");\n    addEdge(0, 1);\n    addEdge(1, 2);\n    addEdge(2, 3);\n    addEdge(3, 0);\n    addEdge(0, 2);\n\n    int sumDegrees = 0;\n    for (int i = 0; i < V; i++) {\n        int deg = 0;\n        for (int j = 0; j < V; j++) if (adj[i][j]) deg++;\n        printf(\"Degree of vertex %d = %d\\n\", i, deg);\n        sumDegrees += deg;\n    }\n\n    printf(\"\\nTotal Edges: %d\\n\", edgeCount);\n    printf(\"Sum of Degrees: %d\\n\", sumDegrees);\n    printf(\"Handshaking Lemma holds: Sum (%d) == 2 * E (%d) -> %s\\n\",\n           sumDegrees, 2 * edgeCount, (sumDegrees == 2 * edgeCount) ? \"TRUE\" : \"FALSE\");\n    return 0;\n}",
    "sample_input": "Edges: (0,1), (1,2), (2,3), (3,0), (0,2)",
    "sample_output": "=== Undirected Graph & Degree Calculation ===\nDegree of vertex 0 = 3\nDegree of vertex 1 = 2\nDegree of vertex 2 = 3\nDegree of vertex 3 = 2\n\nTotal Edges: 5\nSum of Degrees: 10\nHandshaking Lemma holds: Sum (10) == 2 * E (10) -> TRUE",
    "dry_run": "Degrees: 3 + 2 + 3 + 2 = 10. Total edges = 5. 10 == 2 * 5. Proves Handshaking Lemma.",
    "time_complexity": "• O(V) per degree query.",
    "space_complexity": "• O(V^2) matrix.",
    "advantages_disadvantages": "Symmetric relations.",
    "applications": "• Mutual friendship networks, 2-way road transit maps.",
    "viva_questions": [
      {
        "q": "State the Handshaking Lemma for undirected graphs.",
        "a": "The sum of the degrees of all vertices is equal to twice the total number of edges in the graph."
      }
    ]
  },
  {
    "id": "graph_weighted",
    "title": "Weighted Graph Representation & Edge Weights",
    "category": "graphs",
    "categoryName": "Graphs",
    "subcategory": "graph_types",
    "subcategoryName": "Graph Variations",
    "keywords": [
      "weighted graph",
      "edge weights",
      "cost matrix graph",
      "weighted graph c"
    ],
    "definition": "A Weighted Graph assigns a numerical value (weight, cost, or distance) to each edge, represented using a weight matrix where `matrix[u][v] = weight` (or INF if no edge exists).",
    "concept_explanation": "Used whenever edges represent costs, bandwidth, latency, or distances. In an unweighted graph, an edge is 1 or 0; in a weighted graph, it stores the real cost. Non-edges are represented with a sentinel value like 0 or infinity (INF).",
    "algorithm": "1. Initialize weightMatrix[V][V] with INF (or 0).\n2. addWeightedEdge(u, v, weight):\n   weightMatrix[u][v] = weight\n   weightMatrix[v][u] = weight (if undirected)",
    "pseudocode": "int weightMatrix[V][V]\nfunction addEdge(u, v, w):\n    weightMatrix[u][v] = w",
    "c_program": "#include <stdio.h>\n#define V 4\n#define INF 99999\n\nint cost[V][V];\n\nvoid initGraph(void) {\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) {\n            cost[i][j] = (i == j) ? 0 : INF;\n        }\n    }\n}\n\nvoid addEdge(int u, int v, int w) {\n    cost[u][v] = w;\n    cost[v][u] = w; // Undirected\n}\n\nvoid printCostMatrix(void) {\n    printf(\"Weighted Cost Matrix:\\n\");\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) {\n            if (cost[i][j] == INF) printf(\"INF \");\n            else printf(\"%3d \", cost[i][j]);\n        }\n        printf(\"\\n\");\n    }\n}\n\nint main(void) {\n    printf(\"=== Weighted Graph Representation ===\\n\");\n    initGraph();\n    addEdge(0, 1, 10);\n    addEdge(0, 2, 15);\n    addEdge(1, 3, 20);\n    addEdge(2, 3, 35);\n    printCostMatrix();\n    return 0;\n}",
    "sample_input": "Edges with weights: (0,1,10), (0,2,15), (1,3,20), (2,3,35)",
    "sample_output": "=== Weighted Graph Representation ===\nWeighted Cost Matrix:\n  0  10  15 INF \n 10   0 INF  20 \n 15 INF   0  35 \nINF  20  35   0 ",
    "dry_run": "Diagonal has cost 0. Direct edges show respective weights. Disconnected pairs show INF.",
    "time_complexity": "• O(1) edge lookup and addition.",
    "space_complexity": "• O(V^2) matrix.",
    "advantages_disadvantages": "Models real-world distances and costs directly.",
    "applications": "• Shortest path algorithms (Dijkstra, Bellman-Ford), Minimum Spanning Tree (Kruskal, Prim).",
    "viva_questions": [
      {
        "q": "What is usually used to represent the absence of an edge in a weighted graph matrix?",
        "a": "Infinity (INF) or a sentinel value such as 0 or -1."
      }
    ]
  }
];
