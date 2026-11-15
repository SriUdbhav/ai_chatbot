/**
 * Binary Trees Module
 * BST, Construction & Traversals, Tree Terminology, and Traversals Master Guide.
 */

module.exports = {
  title: 'Binary Trees & Binary Search Tree (BST)',
  syllabus_code: 'DS-UNIT-6',
  bst: {
    name: 'Binary Search Tree (BST)',
    type: 'data_structure',
    definition: 'A Binary Search Tree (BST) is a hierarchical node-based binary tree data structure where each node has at most two children, and the key in each node is strictly greater than all keys in its left subtree and strictly less than all keys in its right subtree.',
    working_principle: 'BST enforces the binary search property across all nodes: left->data < root->data < right->data. An Inorder Traversal (Left, Root, Right) of a BST always yields values in ascending sorted order. Search, insertion, and deletion operate in O(log n) average time by halving search directions at each node.',
    step_by_step: '1. Node Definition: struct TreeNode { int data; struct TreeNode *left, *right; }.\n2. Search: if root == NULL or root->data == key, return root; if key < root->data, recurse left; else recurse right.\n3. Insertion: find empty leaf position following search property and link new node.\n4. Deletion (3 cases):\n   a. Leaf Node: simply free node and set parent link to NULL.\n   b. One Child: bypass node by linking parent directly to the single child.\n   c. Two Children: find Inorder Successor (minimum node in right subtree), copy its value, and recursively delete the successor.\n5. Height: 1 + max(height(left), height(right)).\n6. Leaf Count: if null return 0; if leaf return 1; else return count(left) + count(right).',
    example: `        50
       /  \\
      30   70
     / \\   / \\
    20 40 60 80
Inorder Traversal: 20 30 40 50 60 70 80 (Ascending sorted order!)`,
    advantages: '• O(log n) average time for search, insertion, and deletion\n• Inorder traversal yields sorted order without additional sorting algorithms\n• Dynamic size without fixed capacity boundaries',
    disadvantages: '• Degenerates into a skewed linear linked list with O(n) worst-case time if elements are inserted in sorted order\n• Extra memory for two child pointers per node\n• Self-balancing (AVL, Red-Black) required to guarantee logarithmic bounds',
    applications: '• Database indexing and filesystem directory indexing\n• Symbol tables in compilers\n• Efficient dictionary and set lookups',
    time_complexity: '• Search / Insert / Delete (Average): O(log n)\n• Search / Insert / Delete (Worst - Skewed): O(n)\n• Traversal: O(n)',
    space_complexity: 'O(n) heap memory; O(h) recursion call stack where h is tree height.',
    conclusion: 'BST provides logarithmic search and insertion when balanced, with the unique property that Inorder traversal always yields sorted keys.',
    comparison_table: `| Parameter | Binary Tree | Binary Search Tree (BST) |
| :--- | :--- | :--- |
| **Definition** | A tree where each node has at most 2 children | A binary tree following the binary search ordering property |
| **Ordering Property** | **No ordering rules** between parent and children | **Left < Root < Right** for all subtrees |
| **Duplicate Keys** | Can contain arbitrary duplicates | Disallows duplicates (or stores them on right) |
| **Search Time Complexity** | **O(n)** (must examine all nodes) | **O(log n)** average (O(n) if skewed) |
| **Insertion / Deletion** | Arbitrary placement: O(1) to O(n) | Value-driven placement: O(log n) average |
| **Inorder Traversal** | Arbitrary sequence | **Guaranteed Ascending Sorted Sequence** |`,
    aim: 'Implement a Binary Search Tree (BST) in C supporting insertion, search, and Inorder, Preorder, and Postorder traversals.',
    algorithm: '1. Define struct TreeNode with data, left, right.\n2. insertBST(root, val): if root==NULL return createNode(val); if val < root->data root->left=insert(root->left, val); else root->right=insert(root->right, val).\n3. searchBST(root, key): if root==NULL or match return root; if key < root->data return search(root->left); else return search(root->right).\n4. Inorder(root): Left -> Root -> Right.\n5. Preorder(root): Root -> Left -> Right.\n6. Postorder(root): Left -> Right -> Root.\n7. Test in main().',
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
};

struct TreeNode* createNode(int val) {
    struct TreeNode *node = (struct TreeNode *)malloc(sizeof(struct TreeNode));
    if (!node) return NULL;
    node->data = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

struct TreeNode* insertBST(struct TreeNode *root, int val) {
    if (root == NULL) return createNode(val);
    if (val < root->data) {
        root->left = insertBST(root->left, val);
    } else if (val > root->data) {
        root->right = insertBST(root->right, val);
    }
    return root;
}

struct TreeNode* searchBST(struct TreeNode *root, int key) {
    if (root == NULL || root->data == key) return root;
    if (key < root->data) return searchBST(root->left, key);
    return searchBST(root->right, key);
}

void inorder(struct TreeNode *root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

void preorder(struct TreeNode *root) {
    if (root == NULL) return;
    printf("%d ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void postorder(struct TreeNode *root) {
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->data);
}

// Function to count leaf nodes in a binary tree
int countLeafNodes(struct TreeNode *root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL) return 1; // Found a leaf node
    return countLeafNodes(root->left) + countLeafNodes(root->right);
}

int treeHeight(struct TreeNode *root) {
    if (root == NULL) return 0;
    int lh = treeHeight(root->left);
    int rh = treeHeight(root->right);
    return 1 + (lh > rh ? lh : rh);
}

void freeTree(struct TreeNode *root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

int main(void) {
    struct TreeNode *root = NULL;
    root = insertBST(root, 50);
    insertBST(root, 30);
    insertBST(root, 20);
    insertBST(root, 40);
    insertBST(root, 70);
    insertBST(root, 60);
    insertBST(root, 80);

    printf("--- Binary Search Tree in C ---\\n");
    printf("Inorder Traversal:   ");
    inorder(root);
    printf("\\n");

    printf("Preorder Traversal:  ");
    preorder(root);
    printf("\\n");

    printf("Postorder Traversal: ");
    postorder(root);
    printf("\\n");

    printf("Tree Height: %d\\n", treeHeight(root));
    printf("Leaf Count:  %d\\n", countLeafNodes(root));

    int key = 60;
    struct TreeNode *found = searchBST(root, key);
    printf("Search for %d: %s\\n", key, found ? "FOUND" : "NOT FOUND");

    freeTree(root);
    return 0;
}`,
    important_statements: '• if (val < root->data) root->left = insertBST(root->left, val) routes smaller values left.\n• countLeafNodes recursively counts leaf nodes where left == NULL && right == NULL.\n• inorder traversal visits left, prints root, visits right, producing sorted order.\n• 1 + (lh > rh ? lh : rh) calculates tree height recursively.\n• freeTree performs a postorder deallocation, safely deleting children before parents.',
    sample_input: 'Insert: 50, 30, 20, 40, 70, 60, 80. Search: 60',
    expected_output: `--- Binary Search Tree in C ---
Inorder Traversal:   20 30 40 50 60 70 80 
Preorder Traversal:  50 30 20 40 70 60 80 
Postorder Traversal: 20 40 30 60 80 70 50 
Tree Height: 3
Leaf Count:  4
Search for 60: FOUND`,
    dry_run: `BST Construction:
1. Root = 50.
2. 30 < 50 -> Left child of 50.
3. 20 < 50, 20 < 30 -> Left child of 30.
4. 40 < 50, 40 > 30 -> Right child of 30.
5. 70 > 50 -> Right child of 50.
6. 60 > 50, 60 < 70 -> Left child of 70.
7. 80 > 50, 80 > 70 -> Right child of 70.
Inorder visits (L, N, R): 20, 30, 40, 50, 60, 70, 80 (Ascending sorted output).`,
    viva_questions: [
      { q: 'Why does an inorder traversal of a BST always produce sorted output?', a: 'Because the BST property guarantees that all values in the left subtree are smaller than the node, and all values in the right subtree are greater. Inorder processes Left, then Node, then Right, respecting this numerical order recursively.' },
      { q: 'What is the worst-case time complexity of searching in an unbalanced BST?', a: 'O(n), occurring when elements are inserted in ascending or descending sorted order, collapsing the tree into a skewed linear chain.' }
    ]
  },

  tree_construction_and_traversals: {
    name: 'Construct Binary Tree and Perform All Traversals',
    type: 'algorithm',
    definition: 'Binary Tree Construction creates a linked hierarchical structure of nodes. Traversal is the process of visiting every node in the tree exactly once in a systematic order (Preorder, Inorder, Postorder).',
    working_principle: 'A binary tree node contains data and two pointers: left and right. Traversals differ by when the parent node is processed relative to its subtrees:\n• Preorder (Root, Left, Right) [NLR]\n• Inorder (Left, Root, Right) [LNR]\n• Postorder (Left, Right, Root) [LRN]',
    step_by_step: '1. Build tree structure by linking allocated nodes:\n       1\n      / \\\n     2   3\n    / \\\n   4   5\n2. Preorder: Visit Root(1) -> Left Subtree (Root 2, Left 4, Right 5) -> Right Subtree (Root 3) -> Output: 1 2 4 5 3\n3. Inorder: Left Subtree (Left 4, Root 2, Right 5) -> Root(1) -> Right Subtree (Root 3) -> Output: 4 2 5 1 3\n4. Postorder: Left Subtree (Left 4, Right 5, Root 2) -> Right Subtree (Root 3) -> Root(1) -> Output: 4 5 2 3 1\n5. Free all allocated nodes using postorder traversal.',
    example: `Tree Structure:
       1
      / \\
     2   3
    / \\
   4   5

Preorder (NLR):  1 2 4 5 3
Inorder (LNR):   4 2 5 1 3
Postorder (LRN): 4 5 2 3 1`,
    advantages: '• Hierarchical representation of mathematical expressions and nested documents\n• Preorder is ideal for cloning/serializing trees\n• Inorder produces sorted order on BSTs\n• Postorder is ideal for bottom-up computation and freeing tree memory',
    disadvantages: '• Recursive traversals consume O(h) call stack memory proportional to tree height\n• Unbalanced trees can cause stack overflow on very deep inputs',
    applications: '• Syntax analysis and expression trees (AST)\n• Huffman coding trees in data compression\n• Directory tree representation in filesystems',
    time_complexity: 'O(n) time for each traversal (every node visited exactly once).',
    space_complexity: 'O(h) call stack space, where h is tree height (O(log n) balanced, O(n) skewed).',
    conclusion: 'Understanding the relative placement of Root (First in Preorder, Middle in Inorder, Last in Postorder) is critical for tree reconstruction algorithms.',
    aim: 'Construct a binary tree using dynamic linked structures and execute Preorder, Inorder, and Postorder traversals in C.',
    algorithm: '1. Create node constructor createNode(val).\n2. Construct tree manually:\n   root = createNode(1)\n   root->left = createNode(2)\n   root->right = createNode(3)\n   root->left->left = createNode(4)\n   root->left->right = createNode(5)\n3. Implement preorder(root): print root, recurse left, recurse right.\n4. Implement inorder(root): recurse left, print root, recurse right.\n5. Implement postorder(root): recurse left, recurse right, print root.\n6. Print outputs in main and free tree memory.',
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
};

struct TreeNode* createNode(int data) {
    struct TreeNode *newNode = (struct TreeNode *)malloc(sizeof(struct TreeNode));
    if (!newNode) return NULL;
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// Preorder Traversal: Root -> Left -> Right
void preorder(struct TreeNode *root) {
    if (root == NULL) return;
    printf("%d ", root->data);
    preorder(root->left);
    preorder(root->right);
}

// Inorder Traversal: Left -> Root -> Right
void inorder(struct TreeNode *root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

// Postorder Traversal: Left -> Right -> Root
void postorder(struct TreeNode *root) {
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->data);
}

void freeTree(struct TreeNode *root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

int main(void) {
    /* Construct sample binary tree:
             1
            / \\
           2   3
          / \\
         4   5
    */
    struct TreeNode *root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);

    printf("=== Binary Tree Construction & Traversals ===\\n");
    printf("Preorder  (Root, Left, Right): ");
    preorder(root);
    printf("\\n");

    printf("Inorder   (Left, Root, Right): ");
    inorder(root);
    printf("\\n");

    printf("Postorder (Left, Right, Root): ");
    postorder(root);
    printf("\\n");

    freeTree(root);
    return 0;
}`,
    important_statements: '• struct TreeNode *newNode allocates individual heap nodes with left and right children.\n• preorder prints root->data before calling left and right subtrees.\n• inorder prints root->data between left and right calls.\n• postorder prints root->data after both subtrees finish.\n• freeTree safely deallocates bottom-up (children before parent) to avoid dangling pointer faults.',
    sample_input: 'Construct Binary Tree with Root 1, Children 2 and 3, Grandchildren 4 and 5',
    expected_output: `=== Binary Tree Construction & Traversals ===
Preorder  (Root, Left, Right): 1 2 4 5 3 
Inorder   (Left, Root, Right): 4 2 5 1 3 
Postorder (Left, Right, Root): 4 5 2 3 1`,
    dry_run: `Tree:
       1
      / \\
     2   3
    / \\
   4   5

1. Preorder Traversal Trace:
   Visit 1 -> visit 2 -> visit 4 -> visit 5 -> visit 3.
   Sequence: 1 2 4 5 3.

2. Inorder Traversal Trace:
   Leftmost is 4 -> visit 4 -> visit 2 -> visit 5 -> visit 1 -> visit 3.
   Sequence: 4 2 5 1 3.

3. Postorder Traversal Trace:
   Bottom-left: 4 -> 5 -> 2 -> 3 -> 1.
   Sequence: 4 5 2 3 1.`,
    viva_questions: [
      { q: 'Given Inorder and Preorder traversals, can a unique binary tree be constructed?', a: 'Yes. The first element of Preorder identifies the Root, and locating this root in the Inorder traversal splits the tree into exact Left and Right subtrees.' },
      { q: 'Why is Postorder traversal always used to free the memory of a dynamically allocated tree?', a: 'Because Postorder visits children before their parent. Freeing children first ensures you never dereference an already-freed parent node pointer.' }
    ]
  },

  tree_terminology: {
    name: 'Binary Tree Terminology & Structure Types',
    type: 'concept',
    definition: 'Tree terminology comprises the formal vocabulary used to define the components, hierarchical relationships, and metric dimensions of tree data structures, including Full, Complete, and Perfect Binary Trees.',
    working_principle: 'A tree is an acyclic connected graph consisting of N nodes and N-1 edges. It is organized into levels starting with the root at level 0. Structural types include: (1) Full Binary Tree: every node has 0 or 2 children, (2) Complete Binary Tree: all levels filled except possibly the last which is filled left-to-right, (3) Perfect Binary Tree: all internal nodes have 2 children and all leaves are at the same level.',
    terminology_breakdown: `• **Root**: The topmost node of the tree with no parent (Level 0).
• **Edge**: The directed link connecting a parent node to a child node.
• **Parent**: An immediate predecessor node.
• **Child**: An immediate successor node directed from a parent.
• **Leaf (Terminal Node)**: A node with zero children (both left == NULL and right == NULL).
• **Internal Node**: A non-leaf node with at least one child.
• **Siblings**: Nodes that share the exact same parent node.
• **Subtree**: Any node in the tree along with all its descendants.
• **Degree of a Node**: The number of children a node has (for a binary tree, at most 2).
• **Degree of a Tree**: The maximum degree of any node in the tree.
• **Level**: The distance of a node from the root (Root is at Level 0 or 1).
• **Depth of a Node**: The number of edges from the root to the node.
• **Height of a Node**: The number of edges on the longest downward path from the node to a leaf.
• **Height of a Tree**: The height of the root node (maximum depth).`,
    example: `        [A] (Root, Depth=0, Height=2)
       /   \\
     [B]   [C] (Siblings, Depth=1)
     / \\     \\
   [D] [E]   [F] (Leaves, Depth=2, Height=0)`,
    advantages: '• Standardized formal communication for university examinations and interviews\n• Precise boundary definitions for tree metrics and mathematical proofs',
    disadvantages: '• Differing conventions: some textbooks index root at Level 0, others at Level 1 (always state your convention in exams)',
    applications: '• Formal algorithm specification, AVL tree balance factor calculations, B-Tree order analysis',
    time_complexity: '• Height calculation: O(n)\n• Leaf counting: O(n)',
    space_complexity: 'O(h) call stack.',
    conclusion: 'Mastering tree terminology is essential for understanding advanced balanced trees, heaps, and graph algorithms.',
    aim: 'Demonstrate tree terminology calculations (height, depth, leaf count) in C.',
    algorithm: '1. Create tree.\n2. Compute height = 1 + max(left_h, right_h).\n3. Compute leafCount = sum of leaves in left and right.\n4. Print metrics in main().',
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    char name;
    struct Node *left, *right;
};

struct Node* createNode(char name) {
    struct Node* n = (struct Node*)malloc(sizeof(struct Node));
    if (!n) return NULL;
    n->name = name;
    n->left = n->right = NULL;
    return n;
}

int getHeight(struct Node* root) {
    if (root == NULL) return 0;
    int lh = getHeight(root->left);
    int rh = getHeight(root->right);
    return 1 + (lh > rh ? lh : rh);
}

int countLeaves(struct Node* root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL) return 1;
    return countLeaves(root->left) + countLeaves(root->right);
}

void freeTree(struct Node* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

int main(void) {
    struct Node* root = createNode('A');
    root->left = createNode('B');
    root->right = createNode('C');
    root->left->left = createNode('D');
    root->left->right = createNode('E');
    root->right->right = createNode('F');

    printf("=== Tree Terminology Demonstration ===\\n");
    printf("Root Node:        %c\\n", root->name);
    printf("Tree Height:      %d levels\\n", getHeight(root));
    printf("Total Leaf Nodes: %d\\n", countLeaves(root));

    freeTree(root);
    return 0;
}`,
    important_statements: '• getHeight recursively computes 1 + max(lh, rh).\n• countLeaves tests if (left == NULL && right == NULL) to identify terminal leaf nodes.',
    sample_input: 'Tree with nodes A, B, C, D, E, F',
    expected_output: `=== Tree Terminology Demonstration ===
Root Node:        A
Tree Height:      3 levels
Total Leaf Nodes: 3`,
    dry_run: 'Root A has height 3. Leaves are D, E, and F (total 3 leaves). Internal nodes are A, B, C.',
    viva_questions: [
      { q: 'What is the maximum number of nodes in a binary tree of height h?', a: '2^h - 1 nodes (when the tree is a full complete binary tree).' },
      { q: 'What is the relationship between the number of leaves (L) and nodes with two children (T) in a binary tree?', a: 'L = T + 1. The number of leaf nodes is always exactly one greater than the number of internal nodes with two children.' }
    ]
  },

  all_traversals: {
    name: 'Binary Tree Traversals (Master Guide)',
    type: 'concept',
    definition: 'Binary Tree Traversal is the systematic visitation of all nodes in a tree data structure. The four primary traversals are Preorder, Inorder, Postorder, and Level-Order (Breadth-First).',
    working_principle: 'Traversals are characterized by their visitation strategy:\n• Depth-First Traversals (DFS): Preorder, Inorder, Postorder (implemented via recursion or stack)\n• Breadth-First Traversal (BFS): Level-Order (implemented using a FIFO Queue)',
    overview: `Traversals differ based on when the root node is visited relative to its subtrees:

1. **Preorder Traversal (NLR: Root -> Left -> Right)**: Visits root first, then left, then right. Used to copy/serialize trees and generate prefix expressions.
2. **Inorder Traversal (LNR: Left -> Root -> Right)**: Visits left subtree, then root, then right subtree. Produces sorted numerical output on Binary Search Trees.
3. **Postorder Traversal (LRN: Left -> Right -> Root)**: Visits left, then right, then root. Used to delete trees (bottom-up), compute directory space, and generate postfix expressions.
4. **Level-Order Traversal (BFS)**: Visits nodes level by level from top to bottom, left to right using a FIFO Queue.`,
    comparison_table: `| Traversal | Sequence Order | Data Structure Used | Root Placement | Primary Application |
| :--- | :--- | :--- | :--- | :--- |
| **Preorder** | Root -> Left -> Right (NLR) | Call Stack / LIFO | First | Tree serialization, cloning, prefix expressions |
| **Inorder** | Left -> Root -> Right (LNR) | Call Stack / LIFO | Middle | Sorted order in BST, infix expressions |
| **Postorder** | Left -> Right -> Root (LRN) | Call Stack / LIFO | Last | Deleting trees, bottom-up metric calculation |
| **Level-Order**| Level by Level (Top to Bottom)| **FIFO Queue** | Level 0 | Shortest path, tree breadth, visualization |`,
    verdict: `### 🎯 Exam Selection Verdict:
• Use **Inorder** when you need sorted data from a BST.
• Use **Preorder** when saving/serializing a tree to reconstruct it later.
• Use **Postorder** when freeing/deleting a tree to avoid accessing deleted memory.
• Use **Level-Order** when processing nodes level by level.`,
    aim: 'Implement Binary Tree Traversals (Inorder, Preorder, Postorder) in C and demonstrate order of visitation.',
    algorithm: '1. Inorder: recursively traverse left subtree, print root, recursively traverse right subtree.\n2. Preorder: print root, recursively traverse left subtree, recursively traverse right subtree.\n3. Postorder: recursively traverse left subtree, recursively traverse right subtree, print root.',
    c_program: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
};

struct TreeNode* createNode(int val) {
    struct TreeNode *node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    if (!node) {
        printf("Memory allocation failed!\\n");
        exit(1);
    }
    node->data = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

void inorder(struct TreeNode* root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

void preorder(struct TreeNode* root) {
    if (root == NULL) return;
    printf("%d ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void postorder(struct TreeNode* root) {
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->data);
}

void freeTree(struct TreeNode* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

int main(void) {
    struct TreeNode *root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);

    printf("=== Binary Tree Traversals in C ===\\n");
    printf("Preorder  (Root, Left, Right): ");
    preorder(root);
    printf("\\n");

    printf("Inorder   (Left, Root, Right): ");
    inorder(root);
    printf("\\n");

    printf("Postorder (Left, Right, Root): ");
    postorder(root);
    printf("\\n");

    freeTree(root);
    return 0;
}`,
    important_statements: '• preorder prints root->data before calling left and right subtrees.\n• inorder prints root->data between left and right calls.\n• postorder prints root->data after both subtrees finish.\n• freeTree safely deallocates bottom-up to prevent memory leaks.',
    sample_input: 'Construct Binary Tree with Root 1, Left 2, Right 3, Left-Left 4, Left-Right 5',
    expected_output: `=== Binary Tree Traversals in C ===
Preorder  (Root, Left, Right): 1 2 4 5 3 
Inorder   (Left, Root, Right): 4 2 5 1 3 
Postorder (Left, Right, Root): 4 5 2 3 1`,
    dry_run: `Tree:
       1
      / \\
     2   3
    / \\
   4   5

1. Preorder (NLR): 1 -> 2 -> 4 -> 5 -> 3
2. Inorder (LNR):  4 -> 2 -> 5 -> 1 -> 3
3. Postorder (LRN): 4 -> 5 -> 2 -> 3 -> 1`
  }
};
