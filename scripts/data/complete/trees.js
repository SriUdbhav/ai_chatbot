module.exports = [
  {
    "id": "tree_bt_create",
    "title": "Binary Tree Creation",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "create binary tree",
      "binary tree node",
      "init binary tree",
      "root node c"
    ],
    "definition": "Binary tree creation involves declaring a node structure containing a data field and two self-referential pointers (`left` and `right`), and dynamically allocating memory for the root node.",
    "concept_explanation": "This program implements recursive Binary Tree creation where an input of -1 represents an empty node (NULL pointer), along with Preorder, Inorder, and Postorder traversals.",
    "algorithm": "Step 1: Define structure Node with int data, struct Node* left, struct Node* right.\nStep 2: Define function createNode(val) that allocates memory using malloc.\nStep 3: Assign data = val, left = NULL, right = NULL.\nStep 4: Return newNode pointer.",
    "pseudocode": "struct Node:\n    data: int\n    left: pointer to Node\n    right: pointer to Node\n\nfunction createNode(val):\n    newNode = allocate(Node)\n    newNode.data = val\n    newNode.left = NULL\n    newNode.right = NULL\n    return newNode",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left;\n    struct Node *right;\n};\n\n/**\n * Recursive Binary Tree Creation\n * Prompts user for data. An input of -1 represents an empty (NULL) node.\n */\nstruct Node* createTree(void) {\n    int data;\n    printf(\"Enter data (-1 for empty node): \");\n    if (scanf(\"%d\", &data) != 1 || data == -1) {\n        return NULL;\n    }\n\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) {\n        printf(\"Memory allocation failed!\\n\");\n        return NULL;\n    }\n    newNode->data = data;\n\n    printf(\"Enter left child of %d:\\n\", data);\n    newNode->left = createTree();\n\n    printf(\"Enter right child of %d:\\n\", data);\n    newNode->right = createTree();\n\n    return newNode;\n}\n\n/**\n * Preorder Traversal: Root -> Left -> Right\n */\nvoid preorder(struct Node *root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\n/**\n * Inorder Traversal: Left -> Root -> Right\n */\nvoid inorder(struct Node *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\n/**\n * Postorder Traversal: Left -> Right -> Root\n */\nvoid postorder(struct Node *root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\n/**\n * Helper to build a sample binary tree matching the recursive creation\n * structure for automated non-interactive terminal execution:\n *             1\n *           /   \\\n *          2     3\n *         / \\   / \\\n *        4  -1 -1  5\n */\nstruct Node* buildSampleTree(void) {\n    struct Node *root = (struct Node *)malloc(sizeof(struct Node));\n    root->data = 1;\n\n    root->left = (struct Node *)malloc(sizeof(struct Node));\n    root->left->data = 2;\n    root->left->left = (struct Node *)malloc(sizeof(struct Node));\n    root->left->left->data = 4;\n    root->left->left->left = root->left->left->right = NULL;\n    root->left->right = NULL; // Right child of 2 is empty (-1)\n\n    root->right = (struct Node *)malloc(sizeof(struct Node));\n    root->right->data = 3;\n    root->right->left = NULL; // Left child of 3 is empty (-1)\n    root->right->right = (struct Node *)malloc(sizeof(struct Node));\n    root->right->right->data = 5;\n    root->right->right->left = root->right->right->right = NULL;\n\n    return root;\n}\n\nint main(void) {\n    printf(\"====================================================\\n\");\n    printf(\"    Binary Tree Recursive Creation & Traversals     \\n\");\n    printf(\"    (Recursive creation uses -1 for an empty node)  \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    struct Node *root = buildSampleTree();\n\n    printf(\"Preorder Traversal  (Root -> Left -> Right): \");\n    preorder(root);\n    printf(\"\\n\");\n\n    printf(\"Inorder Traversal   (Left -> Root -> Right): \");\n    inorder(root);\n    printf(\"\\n\");\n\n    printf(\"Postorder Traversal (Left -> Right -> Root): \");\n    postorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "Create root 1 with children left=2, right=3, left-left=4",
    "sample_output": "====================================================\n    Binary Tree Recursive Creation & Traversals     \n    (Recursive creation uses -1 for an empty node)  \n====================================================\n\nPreorder Traversal  (Root -> Left -> Right): 1 2 4 3 5 \nInorder Traversal   (Left -> Root -> Right): 4 2 1 3 5 \nPostorder Traversal (Left -> Right -> Root): 4 2 5 3 1 ",
    "dry_run": "Root node 1 allocated. Left child 2 attached. Right child 3 attached. Left-left leaf 4 attached.",
    "time_complexity": "• O(1) per node creation.",
    "space_complexity": "• O(1) per node.",
    "advantages_disadvantages": "Hierarchical representation of data with logarithmic potential.",
    "applications": "• File directory trees, decision trees, DOM trees.",
    "viva_questions": [
      {
        "q": "What is the maximum number of nodes at level i of a binary tree?",
        "a": "2^i nodes (assuming root is at level 0)."
      }
    ]
  },
  {
    "id": "tree_bt_linked_rep",
    "title": "Linked Representation of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "linked representation binary tree",
      "binary tree node pointers",
      "tree memory layout"
    ],
    "definition": "Linked representation stores a binary tree in memory using dynamically allocated nodes where each node contains three fields: data, pointer to left child, and pointer to right child.",
    "concept_explanation": "Unlike sequential array representation (which wastes memory on skewed or sparse trees), linked representation only allocates memory for active nodes. NULL pointers designate missing or empty subtrees.",
    "algorithm": "Node layout:\n[ left child pointer | data | right child pointer ]\nLeaves have left = NULL and right = NULL.",
    "pseudocode": "struct Node:\n    data: int\n    left: Node*\n    right: Node*",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* newNode(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = NULL; n->right = NULL;\n    return n;\n}\n\nint main(void) {\n    printf(\"=== Linked Representation of Binary Tree ===\\n\");\n    struct Node* root = newNode(10);\n    root->left = newNode(20);\n    root->right = newNode(30);\n\n    printf(\"Node at %p: data = %d, left = %p, right = %p\\n\", (void*)root, root->data, (void*)root->left, (void*)root->right);\n    printf(\"Node at %p (Left child):  data = %d\\n\", (void*)root->left, root->left->data);\n    printf(\"Node at %p (Right child): data = %d\\n\", (void*)root->right, root->right->data);\n    return 0;\n}",
    "sample_input": "Create node 10 with children 20 and 30",
    "sample_output": "=== Linked Representation of Binary Tree ===\nNode at [addr]: data = 10, left = [addr], right = [addr]\nNode at [addr] (Left child):  data = 20\nNode at [addr] (Right child): data = 30",
    "dry_run": "Root node holds memory addresses pointing directly to heap allocations of its children.",
    "time_complexity": "• O(1) allocation per node.",
    "space_complexity": "• O(n) total node storage with pointer overhead.",
    "advantages_disadvantages": "No wasted array slots for sparse trees. Pointer storage overhead (2 pointers per node).",
    "applications": "• Parsing syntax expressions, game decision hierarchies.",
    "viva_questions": [
      {
        "q": "How many NULL pointers exist in a binary tree with n nodes?",
        "a": "Exactly n + 1 NULL pointers."
      }
    ]
  },
  {
    "id": "tree_bt_preorder",
    "title": "Preorder Traversal of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "preorder traversal",
      "root left right",
      "binary tree preorder",
      "tree preorder c"
    ],
    "definition": "Preorder traversal is a depth-first traversal technique that visits the current node (Root) first, then traverses the Left subtree, and finally traverses the Right subtree (Root -> Left -> Right).",
    "concept_explanation": "This program implements recursive Binary Tree creation where an input of -1 represents an empty node (NULL pointer), along with Preorder, Inorder, and Postorder traversals.",
    "algorithm": "preorder(root):\nStep 1: If root == NULL, return.\nStep 2: Visit and print root->data.\nStep 3: Recursively call preorder(root->left).\nStep 4: Recursively call preorder(root->right).",
    "pseudocode": "function preorder(node):\n    if node == NULL: return\n    print node.data\n    preorder(node.left)\n    preorder(node.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left;\n    struct Node *right;\n};\n\n/**\n * Recursive Binary Tree Creation\n * Prompts user for data. An input of -1 represents an empty (NULL) node.\n */\nstruct Node* createTree(void) {\n    int data;\n    printf(\"Enter data (-1 for empty node): \");\n    if (scanf(\"%d\", &data) != 1 || data == -1) {\n        return NULL;\n    }\n\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) {\n        printf(\"Memory allocation failed!\\n\");\n        return NULL;\n    }\n    newNode->data = data;\n\n    printf(\"Enter left child of %d:\\n\", data);\n    newNode->left = createTree();\n\n    printf(\"Enter right child of %d:\\n\", data);\n    newNode->right = createTree();\n\n    return newNode;\n}\n\n/**\n * Preorder Traversal: Root -> Left -> Right\n */\nvoid preorder(struct Node *root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\n/**\n * Inorder Traversal: Left -> Root -> Right\n */\nvoid inorder(struct Node *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\n/**\n * Postorder Traversal: Left -> Right -> Root\n */\nvoid postorder(struct Node *root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\n/**\n * Helper to build a sample binary tree matching the recursive creation\n * structure for automated non-interactive terminal execution:\n *             1\n *           /   \\\n *          2     3\n *         / \\   / \\\n *        4  -1 -1  5\n */\nstruct Node* buildSampleTree(void) {\n    struct Node *root = (struct Node *)malloc(sizeof(struct Node));\n    root->data = 1;\n\n    root->left = (struct Node *)malloc(sizeof(struct Node));\n    root->left->data = 2;\n    root->left->left = (struct Node *)malloc(sizeof(struct Node));\n    root->left->left->data = 4;\n    root->left->left->left = root->left->left->right = NULL;\n    root->left->right = NULL; // Right child of 2 is empty (-1)\n\n    root->right = (struct Node *)malloc(sizeof(struct Node));\n    root->right->data = 3;\n    root->right->left = NULL; // Left child of 3 is empty (-1)\n    root->right->right = (struct Node *)malloc(sizeof(struct Node));\n    root->right->right->data = 5;\n    root->right->right->left = root->right->right->right = NULL;\n\n    return root;\n}\n\nint main(void) {\n    printf(\"====================================================\\n\");\n    printf(\"    Binary Tree Recursive Creation & Traversals     \\n\");\n    printf(\"    (Recursive creation uses -1 for an empty node)  \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    struct Node *root = buildSampleTree();\n\n    printf(\"Preorder Traversal  (Root -> Left -> Right): \");\n    preorder(root);\n    printf(\"\\n\");\n\n    printf(\"Inorder Traversal   (Left -> Root -> Right): \");\n    inorder(root);\n    printf(\"\\n\");\n\n    printf(\"Postorder Traversal (Left -> Right -> Root): \");\n    postorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "Tree with root 1, children 2 and 3, grandchildren 4 and 5",
    "sample_output": "====================================================\n    Binary Tree Recursive Creation & Traversals     \n    (Recursive creation uses -1 for an empty node)  \n====================================================\n\nPreorder Traversal  (Root -> Left -> Right): 1 2 4 3 5 \nInorder Traversal   (Left -> Root -> Right): 4 2 1 3 5 \nPostorder Traversal (Left -> Right -> Root): 4 2 5 3 1 ",
    "dry_run": "1. Visit 1\n2. Left to 2: visit 2\n3. Left to 4: visit 4, left/right NULL\n4. Right of 2 to 5: visit 5, left/right NULL\n5. Right of 1 to 3: visit 3. Traversal complete.",
    "time_complexity": "• O(n) visits each node once.",
    "space_complexity": "• O(h) recursion stack space, where h is tree height (O(log n) balanced, O(n) skewed).",
    "advantages_disadvantages": "Generates prefix expression; useful for cloning tree structure.",
    "applications": "• Cloning trees, prefix notation generation in compilers.",
    "viva_questions": [
      {
        "q": "What is the visiting order of preorder traversal?",
        "a": "Root -> Left subtree -> Right subtree."
      }
    ]
  },
  {
    "id": "tree_bt_inorder",
    "title": "Inorder Traversal of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "inorder traversal",
      "left root right",
      "binary tree inorder",
      "tree inorder c"
    ],
    "definition": "Inorder traversal visits the Left subtree first, then visits the current node (Root), and finally visits the Right subtree (Left -> Root -> Right).",
    "concept_explanation": "This program implements recursive Binary Tree creation where an input of -1 represents an empty node (NULL pointer), along with Preorder, Inorder, and Postorder traversals.",
    "algorithm": "inorder(root):\nStep 1: If root == NULL, return.\nStep 2: Recursively call inorder(root->left).\nStep 3: Visit and print root->data.\nStep 4: Recursively call inorder(root->right).",
    "pseudocode": "function inorder(node):\n    if node == NULL: return\n    inorder(node.left)\n    print node.data\n    inorder(node.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left;\n    struct Node *right;\n};\n\n/**\n * Recursive Binary Tree Creation\n * Prompts user for data. An input of -1 represents an empty (NULL) node.\n */\nstruct Node* createTree(void) {\n    int data;\n    printf(\"Enter data (-1 for empty node): \");\n    if (scanf(\"%d\", &data) != 1 || data == -1) {\n        return NULL;\n    }\n\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) {\n        printf(\"Memory allocation failed!\\n\");\n        return NULL;\n    }\n    newNode->data = data;\n\n    printf(\"Enter left child of %d:\\n\", data);\n    newNode->left = createTree();\n\n    printf(\"Enter right child of %d:\\n\", data);\n    newNode->right = createTree();\n\n    return newNode;\n}\n\n/**\n * Preorder Traversal: Root -> Left -> Right\n */\nvoid preorder(struct Node *root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\n/**\n * Inorder Traversal: Left -> Root -> Right\n */\nvoid inorder(struct Node *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\n/**\n * Postorder Traversal: Left -> Right -> Root\n */\nvoid postorder(struct Node *root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\n/**\n * Helper to build a sample binary tree matching the recursive creation\n * structure for automated non-interactive terminal execution:\n *             1\n *           /   \\\n *          2     3\n *         / \\   / \\\n *        4  -1 -1  5\n */\nstruct Node* buildSampleTree(void) {\n    struct Node *root = (struct Node *)malloc(sizeof(struct Node));\n    root->data = 1;\n\n    root->left = (struct Node *)malloc(sizeof(struct Node));\n    root->left->data = 2;\n    root->left->left = (struct Node *)malloc(sizeof(struct Node));\n    root->left->left->data = 4;\n    root->left->left->left = root->left->left->right = NULL;\n    root->left->right = NULL; // Right child of 2 is empty (-1)\n\n    root->right = (struct Node *)malloc(sizeof(struct Node));\n    root->right->data = 3;\n    root->right->left = NULL; // Left child of 3 is empty (-1)\n    root->right->right = (struct Node *)malloc(sizeof(struct Node));\n    root->right->right->data = 5;\n    root->right->right->left = root->right->right->right = NULL;\n\n    return root;\n}\n\nint main(void) {\n    printf(\"====================================================\\n\");\n    printf(\"    Binary Tree Recursive Creation & Traversals     \\n\");\n    printf(\"    (Recursive creation uses -1 for an empty node)  \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    struct Node *root = buildSampleTree();\n\n    printf(\"Preorder Traversal  (Root -> Left -> Right): \");\n    preorder(root);\n    printf(\"\\n\");\n\n    printf(\"Inorder Traversal   (Left -> Root -> Right): \");\n    inorder(root);\n    printf(\"\\n\");\n\n    printf(\"Postorder Traversal (Left -> Right -> Root): \");\n    postorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "Tree with root 1, children 2 and 3, grandchildren 4 and 5",
    "sample_output": "====================================================\n    Binary Tree Recursive Creation & Traversals     \n    (Recursive creation uses -1 for an empty node)  \n====================================================\n\nPreorder Traversal  (Root -> Left -> Right): 1 2 4 3 5 \nInorder Traversal   (Left -> Root -> Right): 4 2 1 3 5 \nPostorder Traversal (Left -> Right -> Root): 4 2 5 3 1 ",
    "dry_run": "1. Left subtree of 1: node 2.\n2. Left subtree of 2: node 4. Left is NULL, print 4. Right is NULL.\n3. Print 2.\n4. Right subtree of 2: node 5. Print 5.\n5. Back to 1: print 1.\n6. Right subtree of 1: node 3. Print 3. Result: 4 2 5 1 3.",
    "time_complexity": "• O(n) visits all nodes once.",
    "space_complexity": "• O(h) call stack memory.",
    "advantages_disadvantages": "Produces sorted sequence when applied to a BST.",
    "applications": "• Sorting BST items, infix arithmetic expression generation.",
    "viva_questions": [
      {
        "q": "What traversal of a BST produces elements in sorted ascending order?",
        "a": "Inorder traversal."
      }
    ]
  },
  {
    "id": "tree_bt_postorder",
    "title": "Postorder Traversal of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "postorder traversal",
      "left right root",
      "binary tree postorder",
      "tree postorder c"
    ],
    "definition": "Postorder traversal visits the Left subtree first, then the Right subtree, and finally the current node (Root) (Left -> Right -> Root).",
    "concept_explanation": "This program implements recursive Binary Tree creation where an input of -1 represents an empty node (NULL pointer), along with Preorder, Inorder, and Postorder traversals.",
    "algorithm": "postorder(root):\nStep 1: If root == NULL, return.\nStep 2: Recursively call postorder(root->left).\nStep 3: Recursively call postorder(root->right).\nStep 4: Visit and print root->data.",
    "pseudocode": "function postorder(node):\n    if node == NULL: return\n    postorder(node.left)\n    postorder(node.right)\n    print node.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left;\n    struct Node *right;\n};\n\n/**\n * Recursive Binary Tree Creation\n * Prompts user for data. An input of -1 represents an empty (NULL) node.\n */\nstruct Node* createTree(void) {\n    int data;\n    printf(\"Enter data (-1 for empty node): \");\n    if (scanf(\"%d\", &data) != 1 || data == -1) {\n        return NULL;\n    }\n\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) {\n        printf(\"Memory allocation failed!\\n\");\n        return NULL;\n    }\n    newNode->data = data;\n\n    printf(\"Enter left child of %d:\\n\", data);\n    newNode->left = createTree();\n\n    printf(\"Enter right child of %d:\\n\", data);\n    newNode->right = createTree();\n\n    return newNode;\n}\n\n/**\n * Preorder Traversal: Root -> Left -> Right\n */\nvoid preorder(struct Node *root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\n/**\n * Inorder Traversal: Left -> Root -> Right\n */\nvoid inorder(struct Node *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\n/**\n * Postorder Traversal: Left -> Right -> Root\n */\nvoid postorder(struct Node *root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\n/**\n * Helper to build a sample binary tree matching the recursive creation\n * structure for automated non-interactive terminal execution:\n *             1\n *           /   \\\n *          2     3\n *         / \\   / \\\n *        4  -1 -1  5\n */\nstruct Node* buildSampleTree(void) {\n    struct Node *root = (struct Node *)malloc(sizeof(struct Node));\n    root->data = 1;\n\n    root->left = (struct Node *)malloc(sizeof(struct Node));\n    root->left->data = 2;\n    root->left->left = (struct Node *)malloc(sizeof(struct Node));\n    root->left->left->data = 4;\n    root->left->left->left = root->left->left->right = NULL;\n    root->left->right = NULL; // Right child of 2 is empty (-1)\n\n    root->right = (struct Node *)malloc(sizeof(struct Node));\n    root->right->data = 3;\n    root->right->left = NULL; // Left child of 3 is empty (-1)\n    root->right->right = (struct Node *)malloc(sizeof(struct Node));\n    root->right->right->data = 5;\n    root->right->right->left = root->right->right->right = NULL;\n\n    return root;\n}\n\nint main(void) {\n    printf(\"====================================================\\n\");\n    printf(\"    Binary Tree Recursive Creation & Traversals     \\n\");\n    printf(\"    (Recursive creation uses -1 for an empty node)  \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    struct Node *root = buildSampleTree();\n\n    printf(\"Preorder Traversal  (Root -> Left -> Right): \");\n    preorder(root);\n    printf(\"\\n\");\n\n    printf(\"Inorder Traversal   (Left -> Root -> Right): \");\n    inorder(root);\n    printf(\"\\n\");\n\n    printf(\"Postorder Traversal (Left -> Right -> Root): \");\n    postorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "Tree with root 1, children 2 and 3, grandchildren 4 and 5",
    "sample_output": "====================================================\n    Binary Tree Recursive Creation & Traversals     \n    (Recursive creation uses -1 for an empty node)  \n====================================================\n\nPreorder Traversal  (Root -> Left -> Right): 1 2 4 3 5 \nInorder Traversal   (Left -> Root -> Right): 4 2 1 3 5 \nPostorder Traversal (Left -> Right -> Root): 4 2 5 3 1 ",
    "dry_run": "1. Bottom-left: node 4 visited.\n2. Bottom-right of 2: node 5 visited.\n3. Node 2 visited.\n4. Right child of 1: node 3 visited.\n5. Root node 1 visited last. Result: 4 5 2 3 1.",
    "time_complexity": "• O(n) visits all nodes once.",
    "space_complexity": "• O(h) recursion stack space.",
    "advantages_disadvantages": "Perfect for bottom-up cleanup and memory deallocation.",
    "applications": "• Deallocating/freeing tree memory, calculating folder disk space, postfix expressions.",
    "viva_questions": [
      {
        "q": "Why is postorder traversal used when deleting a tree from heap memory?",
        "a": "Because children must be freed before freeing the parent root node to prevent dangling pointers."
      }
    ]
  },
  {
    "id": "tree_bt_level_order",
    "title": "Level Order Traversal / BFS of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "level order traversal",
      "bfs binary tree",
      "breadth first tree traversal",
      "tree queue traversal"
    ],
    "definition": "Level order traversal (Breadth-First Search) visits all nodes level by level from top to bottom (root at level 0) and from left to right within each level using a queue.",
    "concept_explanation": "Unlike depth-first traversals (pre, in, post) which use call stack recursion, level order uses a FIFO queue. The root is enqueued first. In each iteration, a node is dequeued, visited, and its non-null left and right children are enqueued.",
    "algorithm": "Step 1: If root == NULL return.\nStep 2: Create a queue Q, enqueue(root).\nStep 3: While Q is not empty:\n        node = dequeue(Q)\n        print node->data\n        if node->left != NULL: enqueue(node->left)\n        if node->right != NULL: enqueue(node->right)",
    "pseudocode": "function levelOrder(root):\n    if root == NULL: return\n    queue Q\n    enqueue(Q, root)\n    while not isEmpty(Q):\n        curr = dequeue(Q)\n        print curr.data\n        if curr.left: enqueue(Q, curr.left)\n        if curr.right: enqueue(Q, curr.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\n#define MAX 50\nstruct Node* queue[MAX];\nint front = 0, rear = 0;\n\nvoid levelOrder(struct Node* root) {\n    if (root == NULL) return;\n    front = rear = 0;\n    queue[rear++] = root;\n\n    while (front < rear) {\n        struct Node* curr = queue[front++];\n        printf(\"%d \", curr->data);\n        if (curr->left != NULL) queue[rear++] = curr->left;\n        if (curr->right != NULL) queue[rear++] = curr->right;\n    }\n}\n\nint main(void) {\n    printf(\"=== Level Order Traversal (BFS) ===\\n\");\n    struct Node* root = create(1);\n    root->left = create(2);\n    root->right = create(3);\n    root->left->left = create(4);\n    root->left->right = create(5);\n    root->right->right = create(6);\n\n    printf(\"Level Order: \");\n    levelOrder(root);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "Tree with nodes 1 (lvl 0), 2,3 (lvl 1), 4,5,6 (lvl 2)",
    "sample_output": "=== Level Order Traversal (BFS) ===\nLevel Order: 1 2 3 4 5 6",
    "dry_run": "Q: [1] -> pop 1, push 2, 3.\nQ: [2, 3] -> pop 2, push 4, 5.\nQ: [3, 4, 5] -> pop 3, push 6.\nQ: [4, 5, 6] -> pop 4, pop 5, pop 6. Traversal complete: 1 2 3 4 5 6.",
    "time_complexity": "• O(n) visits all nodes once.",
    "space_complexity": "• O(w) where w is the maximum width of the tree (up to n/2 in complete tree).",
    "advantages_disadvantages": "Traverses closest nodes first; ideal for finding shortest path in unweighted trees.",
    "applications": "• Finding minimum depth, serialization/deserialization of trees, network broadcasting.",
    "viva_questions": [
      {
        "q": "Which auxiliary data structure is required for level order traversal?",
        "a": "A FIFO Queue."
      }
    ]
  },
  {
    "id": "tree_bt_count_nodes",
    "title": "Count Total Nodes in Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "count nodes binary tree",
      "total nodes in tree",
      "tree size c"
    ],
    "definition": "Counting total nodes calculates the total count of all vertices in the binary tree by recursively summing: `1 + count(left) + count(right)`.",
    "concept_explanation": "Base case: if the current node is NULL, count is 0. Otherwise, count is 1 (for current node) plus the node count of the left subtree and the node count of the right subtree.",
    "algorithm": "countNodes(root):\nStep 1: If root == NULL, return 0.\nStep 2: Return 1 + countNodes(root->left) + countNodes(root->right).",
    "pseudocode": "function countNodes(node):\n    if node == NULL: return 0\n    return 1 + countNodes(node.left) + countNodes(node.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nint countNodes(struct Node* root) {\n    if (root == NULL) return 0;\n    return 1 + countNodes(root->left) + countNodes(root->right);\n}\n\nint main(void) {\n    printf(\"=== Count Total Nodes in Binary Tree ===\\n\");\n    struct Node* root = create(10);\n    root->left = create(20);\n    root->right = create(30);\n    root->left->left = create(40);\n    root->left->right = create(50);\n\n    printf(\"Total nodes in tree: %d\\n\", countNodes(root));\n    return 0;\n}",
    "sample_input": "Tree with 5 nodes: 10, 20, 30, 40, 50",
    "sample_output": "=== Count Total Nodes in Binary Tree ===\nTotal nodes in tree: 5",
    "dry_run": "count(40)=1, count(50)=1.\ncount(20)=1 + 1 + 1 = 3.\ncount(30)=1.\ncount(10)=1 + 3 + 1 = 5.",
    "time_complexity": "• O(n) visits each node once.",
    "space_complexity": "• O(h) call stack memory.",
    "advantages_disadvantages": "Clean recursive formulation.",
    "applications": "• Memory estimation, load balancing in hierarchical networks.",
    "viva_questions": [
      {
        "q": "What is the base condition for counting nodes recursively?",
        "a": "If root == NULL, return 0."
      }
    ]
  },
  {
    "id": "tree_bt_count_leaves",
    "title": "Count Leaf Nodes in Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "count leaf nodes",
      "number of leaves binary tree",
      "leaf node count c"
    ],
    "definition": "A leaf node is a node with zero children (`left == NULL && right == NULL`). Counting leaves recursively aggregates all terminal vertices in the tree.",
    "concept_explanation": "Base cases: if `root == NULL`, return 0. If `root->left == NULL && root->right == NULL`, this node is a leaf, so return 1. Otherwise, return `countLeaves(root->left) + countLeaves(root->right)`.",
    "algorithm": "countLeaves(root):\nStep 1: If root == NULL, return 0.\nStep 2: If root->left == NULL && root->right == NULL, return 1.\nStep 3: Return countLeaves(root->left) + countLeaves(root->right).",
    "pseudocode": "function countLeaves(node):\n    if node == NULL: return 0\n    if node.left == NULL and node.right == NULL: return 1\n    return countLeaves(node.left) + countLeaves(node.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nint countLeaves(struct Node* root) {\n    if (root == NULL) return 0;\n    if (root->left == NULL && root->right == NULL) return 1;\n    return countLeaves(root->left) + countLeaves(root->right);\n}\n\nint main(void) {\n    printf(\"=== Count Leaf Nodes in Binary Tree ===\\n\");\n    // Leaves will be 40, 50, and 30\n    struct Node* root = create(10);\n    root->left = create(20);\n    root->right = create(30);\n    root->left->left = create(40);\n    root->left->right = create(50);\n\n    printf(\"Total leaf nodes: %d\\n\", countLeaves(root));\n    return 0;\n}",
    "sample_input": "Tree with nodes 10, 20, 30, 40, 50 (leaves: 40, 50, 30)",
    "sample_output": "=== Count Leaf Nodes in Binary Tree ===\nTotal leaf nodes: 3",
    "dry_run": "Node 40: leaf -> 1. Node 50: leaf -> 1. Node 20: 1 + 1 = 2. Node 30: leaf -> 1. Root: 2 + 1 = 3.",
    "time_complexity": "• O(n) visits each node once.",
    "space_complexity": "• O(h) call stack memory.",
    "advantages_disadvantages": "Directly identifies all endpoint nodes.",
    "applications": "• Evaluating game tree end outcomes, syntax parse tree token counts.",
    "viva_questions": [
      {
        "q": "What is the relationship between the number of leaf nodes L and degree-2 internal nodes I in a full binary tree?",
        "a": "L = I + 1."
      }
    ]
  },
  {
    "id": "tree_bt_height",
    "title": "Calculate Height / Depth of Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "height binary tree",
      "depth binary tree",
      "max height tree c",
      "tree height algorithm"
    ],
    "definition": "The height (or maximum depth) of a binary tree is the number of edges or nodes along the longest path from the root node down to the farthest leaf node.",
    "concept_explanation": "Recursively computed as: `1 + max(height(left), height(right))`. An empty tree has height 0 (or -1 in edge-based convention; here node-count height convention is used).",
    "algorithm": "height(root):\nStep 1: If root == NULL, return 0.\nStep 2: leftHeight = height(root->left).\nStep 3: rightHeight = height(root->right).\nStep 4: Return 1 + max(leftHeight, rightHeight).",
    "pseudocode": "function height(node):\n    if node == NULL: return 0\n    l = height(node.left)\n    r = height(node.right)\n    return 1 + max(l, r)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nint max(int a, int b) { return (a > b) ? a : b; }\n\nint height(struct Node* root) {\n    if (root == NULL) return 0;\n    int leftH = height(root->left);\n    int rightH = height(root->right);\n    return 1 + max(leftH, rightH);\n}\n\nint main(void) {\n    printf(\"=== Calculate Height of Binary Tree ===\\n\");\n    struct Node* root = create(1);\n    root->left = create(2);\n    root->right = create(3);\n    root->left->left = create(4);\n    root->left->left->left = create(5); // Deepest path: 1 -> 2 -> 4 -> 5\n\n    printf(\"Height (in nodes) of the tree: %d\\n\", height(root));\n    return 0;\n}",
    "sample_input": "Tree path 1 -> 2 -> 4 -> 5",
    "sample_output": "=== Calculate Height of Binary Tree ===\nHeight (in nodes) of the tree: 4",
    "dry_run": "height(5) = 1.\nheight(4) = 2.\nheight(2) = 3.\nheight(3) = 1.\nheight(1) = 1 + max(3, 1) = 4.",
    "time_complexity": "• O(n) visits every node once.",
    "space_complexity": "• O(h) call stack memory.",
    "advantages_disadvantages": "Essential for detecting tree imbalance in AVL or Red-Black trees.",
    "applications": "• AVL tree balance factor calculation (height(left) - height(right)).",
    "viva_questions": [
      {
        "q": "What is the minimum height of a binary tree with n nodes?",
        "a": "ceil(log2(n + 1))."
      }
    ]
  },
  {
    "id": "tree_bt_search",
    "title": "Search an Element in Binary Tree",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_tree",
    "subcategoryName": "Binary Tree",
    "keywords": [
      "search binary tree",
      "find node binary tree",
      "search value tree c"
    ],
    "definition": "Searching in an arbitrary binary tree requires traversing both subtrees recursively since there is no ordering property governing left and right child values.",
    "concept_explanation": "Unlike a BST where search can prune subtrees, a generic binary tree requires inspecting the root, and if unmatched, searching the left subtree, and if still unmatched, searching the right subtree.",
    "algorithm": "search(root, key):\nStep 1: If root == NULL, return false.\nStep 2: If root->data == key, return true.\nStep 3: If search(root->left, key) is true, return true.\nStep 4: Return search(root->right, key).",
    "pseudocode": "function search(node, key):\n    if node == NULL: return false\n    if node.data == key: return true\n    return search(node.left, key) or search(node.right, key)",
    "c_program": "#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* create(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val; n->left = n->right = NULL;\n    return n;\n}\n\nbool search(struct Node* root, int key) {\n    if (root == NULL) return false;\n    if (root->data == key) return true;\n    return search(root->left, key) || search(root->right, key);\n}\n\nint main(void) {\n    printf(\"=== Search in Binary Tree ===\\n\");\n    struct Node* root = create(10);\n    root->left = create(20);\n    root->right = create(30);\n    root->left->right = create(25);\n\n    printf(\"Search 25: %s\\n\", search(root, 25) ? \"FOUND\" : \"NOT FOUND\");\n    printf(\"Search 99: %s\\n\", search(root, 99) ? \"FOUND\" : \"NOT FOUND\");\n    return 0;\n}",
    "sample_input": "Tree: 10, 20, 30, 25. Search 25 and 99",
    "sample_output": "=== Search in Binary Tree ===\nSearch 25: FOUND\nSearch 99: NOT FOUND",
    "dry_run": "Search 25: root 10 != 25 -> search left 20 -> 20 != 25 -> search right 25 -> match found, returns true.",
    "time_complexity": "• Worst-case: O(n) when element is absent or at the last visited leaf.",
    "space_complexity": "• O(h) recursion stack space.",
    "advantages_disadvantages": "Exhaustive search; no sorting prerequisite. Slower than BST search.",
    "applications": "• Locating elements in unsorted hierarchies.",
    "viva_questions": [
      {
        "q": "Why is searching in an arbitrary binary tree O(n) instead of O(log n)?",
        "a": "Because without the BST ordering property, both subtrees must be checked in the worst case."
      }
    ]
  },
  {
    "id": "tree_bst_create",
    "title": "Binary Search Tree Creation",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "create bst",
      "bst initialization",
      "binary search tree properties",
      "bst c"
    ],
    "definition": "A Binary Search Tree (BST) is a node-based binary tree data structure where all keys in the left subtree are strictly smaller than the root key, and all keys in the right subtree are strictly greater.",
    "concept_explanation": "This program implements Binary Search Tree (BST) creation and node insertion, strictly enforcing the ordering property: smaller values are recursively inserted into the left subtree, and larger values into the right subtree. It also performs Preorder, Inorder (which yields strictly sorted keys), and Postorder traversals. (Note: This program specifically focuses on Creation, Insertion, and Traversals; deletion and searching are maintained under their dedicated standalone topics).",
    "algorithm": "BST Invariant for every node N:\n1. For all X in left subtree: X->data < N->data\n2. For all Y in right subtree: Y->data > N->data\n3. Subtrees must also be BSTs.",
    "pseudocode": "root = NULL\nfunction initBST(): root = NULL",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left;\n    struct Node *right;\n};\n\n// Create a new BST node on the heap\nstruct Node* createNode(int val) {\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) return NULL;\n    newNode->data = val;\n    newNode->left = NULL;\n    newNode->right = NULL;\n    return newNode;\n}\n\n/**\n * Insert a value into the BST:\n * - If tree is empty, create root node.\n * - If value is smaller than current node, insert into left subtree.\n * - If value is larger than current node, insert into right subtree.\n */\nstruct Node* insertBST(struct Node *root, int val) {\n    if (root == NULL) {\n        return createNode(val);\n    }\n    if (val < root->data) {\n        root->left = insertBST(root->left, val);\n    } else if (val > root->data) {\n        root->right = insertBST(root->right, val);\n    }\n    return root;\n}\n\n/**\n * Inorder Traversal: Left -> Root -> Right\n * Property: Inorder traversal of a BST always yields values in sorted ascending order.\n */\nvoid inorder(struct Node *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\n/**\n * Preorder Traversal: Root -> Left -> Right\n */\nvoid preorder(struct Node *root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\n/**\n * Postorder Traversal: Left -> Right -> Root\n */\nvoid postorder(struct Node *root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\nint main(void) {\n    struct Node *root = NULL;\n    int values[] = {50, 30, 20, 40, 70, 60, 80};\n    int n = sizeof(values) / sizeof(values[0]);\n\n    printf(\"====================================================\\n\");\n    printf(\"   Binary Search Tree (BST) Creation & Traversals   \\n\");\n    printf(\"   Rule: Smaller values go left, larger go right    \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    printf(\"Inserting values into BST:\\n\");\n    for (int i = 0; i < n; i++) {\n        printf(\"  Insert %d\\n\", values[i]);\n        root = insertBST(root, values[i]);\n    }\n    printf(\"\\n\");\n\n    printf(\"Inorder Traversal   (Sorted Order)   : \");\n    inorder(root);\n    printf(\"\\n\");\n\n    printf(\"Preorder Traversal  (Root, Left, Right): \");\n    preorder(root);\n    printf(\"\\n\");\n\n    printf(\"Postorder Traversal (Left, Right, Root): \");\n    postorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "Create BST root 50 with left 30 and right 70",
    "sample_output": "====================================================\n   Binary Search Tree (BST) Creation & Traversals   \n   Rule: Smaller values go left, larger go right    \n====================================================\n\nInserting values into BST:\n  Insert 50\n  Insert 30\n  Insert 20\n  Insert 40\n  Insert 70\n  Insert 60\n  Insert 80\n\nInorder Traversal   (Sorted Order)   : 20 30 40 50 60 70 80 \nPreorder Traversal  (Root, Left, Right): 50 30 20 40 70 60 80 \nPostorder Traversal (Left, Right, Root): 20 40 30 60 80 70 50 ",
    "dry_run": "Root 50 created. 30 placed in left subtree. 70 placed in right subtree. Invariant verified.",
    "time_complexity": "• O(1) initialization.",
    "space_complexity": "• O(1).",
    "advantages_disadvantages": "Provides fast search, insertion, and deletion. Degenerates to O(n) if unbalanced.",
    "applications": "• Database indexing (B-trees, BSTs), dynamic sets and lookup dictionaries.",
    "viva_questions": [
      {
        "q": "State the Binary Search Tree property.",
        "a": "For every node, all values in its left subtree are less than its value, and all values in its right subtree are greater."
      }
    ]
  },
  {
    "id": "tree_bst_insert",
    "title": "Insert a Node in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "insert bst",
      "bst insertion c",
      "add node to bst",
      "insert binary search tree"
    ],
    "definition": "BST insertion recursively navigates left if the new key is smaller than the current node or right if greater, attaching the new leaf node at the correct position to preserve the BST invariant.",
    "concept_explanation": "This program implements Binary Search Tree (BST) creation and node insertion, strictly enforcing the ordering property: smaller values are recursively inserted into the left subtree, and larger values into the right subtree. It also performs Preorder, Inorder (which yields strictly sorted keys), and Postorder traversals. (Note: This program specifically focuses on Creation, Insertion, and Traversals; deletion and searching are maintained under their dedicated standalone topics).",
    "algorithm": "insert(root, val):\nStep 1: If root == NULL, return createNode(val).\nStep 2: If val < root->data, root->left = insert(root->left, val).\nStep 3: Else if val > root->data, root->right = insert(root->right, val).\nStep 4: Return root.",
    "pseudocode": "function insert(root, val):\n    if root == NULL: return createNode(val)\n    if val < root.data: root.left = insert(root.left, val)\n    else if val > root.data: root.right = insert(root.right, val)\n    return root",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left;\n    struct Node *right;\n};\n\n// Create a new BST node on the heap\nstruct Node* createNode(int val) {\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) return NULL;\n    newNode->data = val;\n    newNode->left = NULL;\n    newNode->right = NULL;\n    return newNode;\n}\n\n/**\n * Insert a value into the BST:\n * - If tree is empty, create root node.\n * - If value is smaller than current node, insert into left subtree.\n * - If value is larger than current node, insert into right subtree.\n */\nstruct Node* insertBST(struct Node *root, int val) {\n    if (root == NULL) {\n        return createNode(val);\n    }\n    if (val < root->data) {\n        root->left = insertBST(root->left, val);\n    } else if (val > root->data) {\n        root->right = insertBST(root->right, val);\n    }\n    return root;\n}\n\n/**\n * Inorder Traversal: Left -> Root -> Right\n * Property: Inorder traversal of a BST always yields values in sorted ascending order.\n */\nvoid inorder(struct Node *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\n/**\n * Preorder Traversal: Root -> Left -> Right\n */\nvoid preorder(struct Node *root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\n/**\n * Postorder Traversal: Left -> Right -> Root\n */\nvoid postorder(struct Node *root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\nint main(void) {\n    struct Node *root = NULL;\n    int values[] = {50, 30, 20, 40, 70, 60, 80};\n    int n = sizeof(values) / sizeof(values[0]);\n\n    printf(\"====================================================\\n\");\n    printf(\"   Binary Search Tree (BST) Creation & Traversals   \\n\");\n    printf(\"   Rule: Smaller values go left, larger go right    \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    printf(\"Inserting values into BST:\\n\");\n    for (int i = 0; i < n; i++) {\n        printf(\"  Insert %d\\n\", values[i]);\n        root = insertBST(root, values[i]);\n    }\n    printf(\"\\n\");\n\n    printf(\"Inorder Traversal   (Sorted Order)   : \");\n    inorder(root);\n    printf(\"\\n\");\n\n    printf(\"Preorder Traversal  (Root, Left, Right): \");\n    preorder(root);\n    printf(\"\\n\");\n\n    printf(\"Postorder Traversal (Left, Right, Root): \");\n    postorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "Insert keys: 50, 30, 20, 40, 70, 60, 80",
    "sample_output": "====================================================\n   Binary Search Tree (BST) Creation & Traversals   \n   Rule: Smaller values go left, larger go right    \n====================================================\n\nInserting values into BST:\n  Insert 50\n  Insert 30\n  Insert 20\n  Insert 40\n  Insert 70\n  Insert 60\n  Insert 80\n\nInorder Traversal   (Sorted Order)   : 20 30 40 50 60 70 80 \nPreorder Traversal  (Root, Left, Right): 50 30 20 40 70 60 80 \nPostorder Traversal (Left, Right, Root): 20 40 30 60 80 70 50 ",
    "dry_run": "50 becomes root. 30 < 50 -> left. 20 < 30 -> left of 30. 40 > 30 -> right of 30. 70 > 50 -> right. 60 < 70 -> left of 70. 80 > 70 -> right of 70.",
    "time_complexity": "• Average: O(log n), Worst-case: O(n) for skewed BST.",
    "space_complexity": "• O(h) recursion stack space.",
    "advantages_disadvantages": "Dynamic sorted collection; maintains sort without explicit re-sorting.",
    "applications": "• Symbol tables, maintaining dynamically sorted leaderboards.",
    "viva_questions": [
      {
        "q": "Where are new nodes always inserted in a standard BST?",
        "a": "As a leaf node."
      }
    ]
  },
  {
    "id": "tree_bst_search",
    "title": "Search a Node in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "search bst",
      "bst lookup",
      "find in bst",
      "binary search tree search c"
    ],
    "definition": "BST search compares the target key with the current node: if equal, the key is found; if smaller, search continues exclusively in the left subtree; if larger, in the right subtree.",
    "concept_explanation": "By pruning half of the remaining tree at each step, BST search mimics binary search on a sorted array, achieving O(log n) efficiency in balanced trees without contiguous memory constraints.",
    "algorithm": "search(root, key):\nStep 1: If root == NULL or root->data == key, return root.\nStep 2: If key < root->data, return search(root->left, key).\nStep 3: Return search(root->right, key).",
    "pseudocode": "function search(root, key):\n    if root == NULL or root.data == key: return root\n    if key < root.data: return search(root.left, key)\n    return search(root.right, key)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nstruct Node* search(struct Node* root, int key) {\n    if (root == NULL || root->data == key) return root;\n    if (key < root->data) return search(root->left, key);\n    return search(root->right, key);\n}\n\nint main(void) {\n    printf(\"=== BST Search Demonstration ===\\n\");\n    struct Node* root = NULL;\n    int items[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) root = insert(root, items[i]);\n\n    int key1 = 40, key2 = 95;\n    printf(\"Search %d: %s\\n\", key1, search(root, key1) != NULL ? \"FOUND\" : \"NOT FOUND\");\n    printf(\"Search %d: %s\\n\", key2, search(root, key2) != NULL ? \"FOUND\" : \"NOT FOUND\");\n    return 0;\n}",
    "sample_input": "BST with items [50, 30, 70, 20, 40, 60, 80]. Search 40 and 95",
    "sample_output": "=== BST Search Demonstration ===\nSearch 40: FOUND\nSearch 95: NOT FOUND",
    "dry_run": "Search 40: 40 < 50 -> go left (30). 40 > 30 -> go right (40). Match found! Total comparisons = 3.",
    "time_complexity": "• Average: O(log n), Worst-case: O(n).",
    "space_complexity": "• O(h) recursion stack (or O(1) iterative).",
    "advantages_disadvantages": "Extremely fast average lookup time.",
    "applications": "• Dictionary lookups, IP routing table prefix lookups.",
    "viva_questions": [
      {
        "q": "What is the time complexity to search an element in a balanced BST?",
        "a": "O(log n)."
      }
    ]
  },
  {
    "id": "tree_bst_delete_leaf",
    "title": "Delete a Leaf Node in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "delete leaf bst",
      "bst leaf deletion",
      "remove leaf node bst"
    ],
    "definition": "Deleting a leaf node (a node with no children, `left == NULL && right == NULL`) involves freeing the node memory and updating its parent pointer to NULL.",
    "concept_explanation": "Case 1 of BST deletion: the node has no children. Simply call `free(root)` and return `NULL` to the parent caller.",
    "algorithm": "If node to delete is a leaf:\n1. free(root)\n2. return NULL",
    "pseudocode": "if root.left == NULL and root.right == NULL:\n    free(root)\n    return NULL",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nstruct Node* deleteLeaf(struct Node* root, int key) {\n    if (root == NULL) return NULL;\n    if (key < root->data) root->left = deleteLeaf(root->left, key);\n    else if (key > root->data) root->right = deleteLeaf(root->right, key);\n    else {\n        // Node found, verify it is a leaf\n        if (root->left == NULL && root->right == NULL) {\n            free(root);\n            printf(\"Leaf node %d deleted successfully.\\n\", key);\n            return NULL;\n        }\n    }\n    return root;\n}\n\nvoid inorder(struct Node* root) {\n    if (root == NULL) return;\n    inorder(root->left); printf(\"%d \", root->data); inorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== Delete Leaf Node in BST ===\\n\");\n    struct Node* root = NULL;\n    root = insert(root, 50); root = insert(root, 30); root = insert(root, 20); // 20 is a leaf\n    printf(\"Before deletion: \"); inorder(root); printf(\"\\n\");\n    root = deleteLeaf(root, 20);\n    printf(\"After deleting 20: \"); inorder(root); printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "BST: 50, 30, 20. Delete leaf 20",
    "sample_output": "=== Delete Leaf Node in BST ===\nBefore deletion: 20 30 50 \nLeaf node 20 deleted successfully.\nAfter deleting 20: 30 50",
    "dry_run": "20 has left=NULL, right=NULL. Node freed, parent (30)->left updated to NULL.",
    "time_complexity": "• O(h) to locate node, O(1) to delete.",
    "space_complexity": "• O(h) recursion stack.",
    "advantages_disadvantages": "Simplest deletion case in BST.",
    "applications": "• Pruning decision trees.",
    "viva_questions": [
      {
        "q": "What is returned to the parent pointer when deleting a leaf node?",
        "a": "NULL."
      }
    ]
  },
  {
    "id": "tree_bst_delete_one_child",
    "title": "Delete a Node with One Child in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "delete single child node bst",
      "bst delete one child",
      "remove degree 1 node bst"
    ],
    "definition": "Deleting a node with a single child involves bypassing the node to be deleted by linking its parent directly to its sole child, then freeing the node.",
    "concept_explanation": "Case 2 of BST deletion: if `root->left == NULL`, save `temp = root->right`, free `root`, and return `temp`. If `root->right == NULL`, save `temp = root->left`, free `root`, and return `temp`.",
    "algorithm": "If node has only right child:\n    temp = root->right; free(root); return temp;\nIf node has only left child:\n    temp = root->left; free(root); return temp;",
    "pseudocode": "if root.left == NULL:\n    temp = root.right; free(root); return temp\nif root.right == NULL:\n    temp = root.left; free(root); return temp",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nstruct Node* deleteNode(struct Node* root, int key) {\n    if (root == NULL) return NULL;\n    if (key < root->data) root->left = deleteNode(root->left, key);\n    else if (key > root->data) root->right = deleteNode(root->right, key);\n    else {\n        // Single child cases\n        if (root->left == NULL) {\n            struct Node* temp = root->right;\n            free(root);\n            return temp;\n        } else if (root->right == NULL) {\n            struct Node* temp = root->left;\n            free(root);\n            return temp;\n        }\n    }\n    return root;\n}\n\nvoid inorder(struct Node* root) {\n    if (root == NULL) return;\n    inorder(root->left); printf(\"%d \", root->data); inorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== Delete Node with One Child in BST ===\\n\");\n    struct Node* root = NULL;\n    root = insert(root, 50); root = insert(root, 30); root = insert(root, 40); // 30 has single child 40\n    printf(\"Before deletion: \"); inorder(root); printf(\"\\n\");\n    root = deleteNode(root, 30);\n    printf(\"After deleting 30: \"); inorder(root); printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "BST: 50 -> left 30 -> right 40. Delete 30.",
    "sample_output": "=== Delete Node with One Child in BST ===\nBefore deletion: 30 40 50 \nAfter deleting 30: 40 50",
    "dry_run": "Node 30 has left=NULL, right=40. temp captures 40, node 30 is freed, 40 attached to 50->left.",
    "time_complexity": "• O(h) where h is tree height.",
    "space_complexity": "• O(h) stack space.",
    "advantages_disadvantages": "Clean splice operation preserving BST order.",
    "applications": "• Restructuring tree indices after item removal.",
    "viva_questions": [
      {
        "q": "How does deleting a node with one child affect the height of that subtree?",
        "a": "It decreases the height of that subtree path by 1."
      }
    ]
  },
  {
    "id": "tree_bst_delete_two_children",
    "title": "Delete a Node with Two Children in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "delete two children bst",
      "inorder successor deletion",
      "bst node deletion case 3",
      "delete bst node"
    ],
    "definition": "Deleting a node with two children involves finding its inorder successor (smallest node in right subtree) or inorder predecessor, copying that value into the current node, and recursively deleting the successor node.",
    "concept_explanation": "Case 3 of BST deletion: when a node has both left and right children, it cannot be simply removed without breaking connections. Replacing its value with its inorder successor guarantees the BST property remains intact because the successor is greater than all left children and less than all other right children.",
    "algorithm": "deleteNode(root, key):\nStep 1: If key < root->data, root->left = deleteNode(root->left, key).\nStep 2: Else if key > root->data, root->right = deleteNode(root->right, key).\nStep 3: Else (node found):\n        If root has two children:\n            temp = minValueNode(root->right) // Inorder successor\n            root->data = temp->data\n            root->right = deleteNode(root->right, temp->data)\nStep 4: Return root.",
    "pseudocode": "function delete(root, key):\n    if key < root.data: root.left = delete(root.left, key)\n    else if key > root.data: root.right = delete(root.right, key)\n    else:\n        if both children exist:\n            succ = minNode(root.right)\n            root.data = succ.data\n            root.right = delete(root.right, succ.data)\n        else:\n            return child or NULL\n    return root",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nstruct Node* minValueNode(struct Node* node) {\n    struct Node* current = node;\n    while (current && current->left != NULL) current = current->left;\n    return current;\n}\n\nstruct Node* deleteNode(struct Node* root, int key) {\n    if (root == NULL) return NULL;\n    if (key < root->data) root->left = deleteNode(root->left, key);\n    else if (key > root->data) root->right = deleteNode(root->right, key);\n    else {\n        // Case 1 & 2: 0 or 1 child\n        if (root->left == NULL) {\n            struct Node* temp = root->right; free(root); return temp;\n        } else if (root->right == NULL) {\n            struct Node* temp = root->left; free(root); return temp;\n        }\n        // Case 3: Two children\n        struct Node* temp = minValueNode(root->right); // Inorder successor\n        root->data = temp->data;\n        root->right = deleteNode(root->right, temp->data);\n    }\n    return root;\n}\n\nvoid inorder(struct Node* root) {\n    if (root == NULL) return;\n    inorder(root->left); printf(\"%d \", root->data); inorder(root->right);\n}\n\nint main(void) {\n    printf(\"=== Delete Node with Two Children in BST ===\\n\");\n    struct Node* root = NULL;\n    int items[] = {50, 30, 70, 20, 40, 60, 80};\n    for (int i = 0; i < 7; i++) root = insert(root, items[i]);\n\n    printf(\"Original BST (Inorder): \"); inorder(root); printf(\"\\n\");\n    printf(\"Deleting root node 50 (has two children 30 and 70)...\\n\");\n    root = deleteNode(root, 50);\n    printf(\"After deleting 50:       \"); inorder(root); printf(\"\\n\");\n    printf(\"New root is now inorder successor: %d\\n\", root->data);\n    return 0;\n}",
    "sample_input": "BST: 50, 30, 70, 20, 40, 60, 80. Delete 50.",
    "sample_output": "=== Delete Node with Two Children in BST ===\nOriginal BST (Inorder): 20 30 40 50 60 70 80 \nDeleting root node 50 (has two children 30 and 70)...\nAfter deleting 50:       20 30 40 60 70 80 \nNew root is now inorder successor: 60",
    "dry_run": "1. Inorder successor of 50 in right subtree (70, 60, 80) is minimum node 60.\n2. 50 is overwritten with 60.\n3. Node 60 in right subtree is deleted as a leaf/single child node. Result is valid BST.",
    "time_complexity": "• O(h) where h is tree height.",
    "space_complexity": "• O(h) recursion stack space.",
    "advantages_disadvantages": "Maintains complete BST invariant after removing complex internal nodes.",
    "applications": "• Deleting database index records, memory management tables.",
    "viva_questions": [
      {
        "q": "What is the inorder successor of a node in a BST?",
        "a": "The node with the smallest key in its right subtree."
      }
    ]
  },
  {
    "id": "tree_bst_find_min",
    "title": "Find Minimum Value in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "find min bst",
      "minimum element bst",
      "bst smallest value",
      "bst min c"
    ],
    "definition": "Finding the minimum value in a BST involves traversing left child pointers until reaching the leftmost node whose `left == NULL`.",
    "concept_explanation": "Due to the BST invariant, smaller values always reside in left subtrees. Therefore, the leftmost node in any non-empty BST is guaranteed to hold the minimum value in the entire tree.",
    "algorithm": "findMin(root):\nStep 1: If root == NULL, return -1 (or error).\nStep 2: While root->left != NULL: root = root->left.\nStep 3: Return root->data.",
    "pseudocode": "function findMin(root):\n    while root.left != NULL: root = root.left\n    return root.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nint findMin(struct Node* root) {\n    if (root == NULL) return -1;\n    struct Node* curr = root;\n    while (curr->left != NULL) {\n        curr = curr->left;\n    }\n    return curr->data;\n}\n\nint main(void) {\n    printf(\"=== Find Minimum Value in BST ===\\n\");\n    struct Node* root = NULL;\n    int items[] = {45, 23, 67, 12, 34, 89, 5};\n    for (int i = 0; i < 7; i++) root = insert(root, items[i]);\n\n    printf(\"Minimum value in BST: %d\\n\", findMin(root));\n    return 0;\n}",
    "sample_input": "BST with items: 45, 23, 67, 12, 34, 89, 5",
    "sample_output": "=== Find Minimum Value in BST ===\nMinimum value in BST: 5",
    "dry_run": "Traverse: 45 -> left 23 -> left 12 -> left 5. 5 has left == NULL. Returns 5.",
    "time_complexity": "• O(h) where h is tree height (O(log n) balanced, O(n) skewed).",
    "space_complexity": "• O(1) iterative space.",
    "advantages_disadvantages": "Extremely efficient O(h) search without scanning whole tree.",
    "applications": "• Finding lowest priority task, minimum price lookup.",
    "viva_questions": [
      {
        "q": "Where does the minimum value always reside in a BST?",
        "a": "At the leftmost node of the tree."
      }
    ]
  },
  {
    "id": "tree_bst_find_max",
    "title": "Find Maximum Value in BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "find max bst",
      "maximum element bst",
      "bst largest value",
      "bst max c"
    ],
    "definition": "Finding the maximum value in a BST involves traversing right child pointers until reaching the rightmost node whose `right == NULL`.",
    "concept_explanation": "Due to the BST invariant, greater values always reside in right subtrees. The rightmost node in any non-empty BST is guaranteed to hold the maximum value.",
    "algorithm": "findMax(root):\nStep 1: If root == NULL, return -1.\nStep 2: While root->right != NULL: root = root->right.\nStep 3: Return root->data.",
    "pseudocode": "function findMax(root):\n    while root.right != NULL: root = root.right\n    return root.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nint findMax(struct Node* root) {\n    if (root == NULL) return -1;\n    struct Node* curr = root;\n    while (curr->right != NULL) {\n        curr = curr->right;\n    }\n    return curr->data;\n}\n\nint main(void) {\n    printf(\"=== Find Maximum Value in BST ===\\n\");\n    struct Node* root = NULL;\n    int items[] = {45, 23, 67, 12, 34, 89, 5};\n    for (int i = 0; i < 7; i++) root = insert(root, items[i]);\n\n    printf(\"Maximum value in BST: %d\\n\", findMax(root));\n    return 0;\n}",
    "sample_input": "BST with items: 45, 23, 67, 12, 34, 89, 5",
    "sample_output": "=== Find Maximum Value in BST ===\nMaximum value in BST: 89",
    "dry_run": "Traverse: 45 -> right 67 -> right 89. 89 has right == NULL. Returns 89.",
    "time_complexity": "• O(h) where h is tree height.",
    "space_complexity": "• O(1) iterative space.",
    "advantages_disadvantages": "Instant logarithmic lookup of maximum key.",
    "applications": "• Highest score leaderboards, maximum capacity tracking.",
    "viva_questions": [
      {
        "q": "Where does the maximum value always reside in a BST?",
        "a": "At the rightmost node of the tree."
      }
    ]
  },
  {
    "id": "tree_bst_inorder",
    "title": "Inorder Traversal of BST — Sorted Output",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "inorder bst",
      "bst sorted output",
      "bst inorder traversal",
      "sorted tree traversal"
    ],
    "definition": "Inorder traversal of a BST visits nodes in Left -> Root -> Right order, which mathematically guarantees printing the keys in strictly ascending sorted order.",
    "concept_explanation": "This program implements Binary Search Tree (BST) creation and node insertion, strictly enforcing the ordering property: smaller values are recursively inserted into the left subtree, and larger values into the right subtree. It also performs Preorder, Inorder (which yields strictly sorted keys), and Postorder traversals. (Note: This program specifically focuses on Creation, Insertion, and Traversals; deletion and searching are maintained under their dedicated standalone topics).",
    "algorithm": "inorder(root):\nStep 1: If root == NULL, return.\nStep 2: inorder(root->left).\nStep 3: print root->data.\nStep 4: inorder(root->right).",
    "pseudocode": "function inorder(root):\n    if root == NULL: return\n    inorder(root.left)\n    print root.data\n    inorder(root.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left;\n    struct Node *right;\n};\n\n// Create a new BST node on the heap\nstruct Node* createNode(int val) {\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) return NULL;\n    newNode->data = val;\n    newNode->left = NULL;\n    newNode->right = NULL;\n    return newNode;\n}\n\n/**\n * Insert a value into the BST:\n * - If tree is empty, create root node.\n * - If value is smaller than current node, insert into left subtree.\n * - If value is larger than current node, insert into right subtree.\n */\nstruct Node* insertBST(struct Node *root, int val) {\n    if (root == NULL) {\n        return createNode(val);\n    }\n    if (val < root->data) {\n        root->left = insertBST(root->left, val);\n    } else if (val > root->data) {\n        root->right = insertBST(root->right, val);\n    }\n    return root;\n}\n\n/**\n * Inorder Traversal: Left -> Root -> Right\n * Property: Inorder traversal of a BST always yields values in sorted ascending order.\n */\nvoid inorder(struct Node *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\n/**\n * Preorder Traversal: Root -> Left -> Right\n */\nvoid preorder(struct Node *root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\n/**\n * Postorder Traversal: Left -> Right -> Root\n */\nvoid postorder(struct Node *root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\nint main(void) {\n    struct Node *root = NULL;\n    int values[] = {50, 30, 20, 40, 70, 60, 80};\n    int n = sizeof(values) / sizeof(values[0]);\n\n    printf(\"====================================================\\n\");\n    printf(\"   Binary Search Tree (BST) Creation & Traversals   \\n\");\n    printf(\"   Rule: Smaller values go left, larger go right    \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    printf(\"Inserting values into BST:\\n\");\n    for (int i = 0; i < n; i++) {\n        printf(\"  Insert %d\\n\", values[i]);\n        root = insertBST(root, values[i]);\n    }\n    printf(\"\\n\");\n\n    printf(\"Inorder Traversal   (Sorted Order)   : \");\n    inorder(root);\n    printf(\"\\n\");\n\n    printf(\"Preorder Traversal  (Root, Left, Right): \");\n    preorder(root);\n    printf(\"\\n\");\n\n    printf(\"Postorder Traversal (Left, Right, Root): \");\n    postorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "Insert: 40, 20, 60, 10, 30, 50, 70",
    "sample_output": "====================================================\n   Binary Search Tree (BST) Creation & Traversals   \n   Rule: Smaller values go left, larger go right    \n====================================================\n\nInserting values into BST:\n  Insert 50\n  Insert 30\n  Insert 20\n  Insert 40\n  Insert 70\n  Insert 60\n  Insert 80\n\nInorder Traversal   (Sorted Order)   : 20 30 40 50 60 70 80 \nPreorder Traversal  (Root, Left, Right): 50 30 20 40 70 60 80 \nPostorder Traversal (Left, Right, Root): 20 40 30 60 80 70 50 ",
    "dry_run": "Leftmost leaf 10 printed first -> 20 -> 30 -> 40 -> 50 -> 60 -> 70. Perfectly sorted!",
    "time_complexity": "• O(n) visits each node once.",
    "space_complexity": "• O(h) call stack memory.",
    "advantages_disadvantages": "Natural sorted order retrieval without external sorting algorithm.",
    "applications": "• Tree Sort algorithm, validating if a binary tree is a valid BST.",
    "viva_questions": [
      {
        "q": "How can you verify whether a binary tree is a BST in linear time?",
        "a": "Perform an inorder traversal and verify that the output sequence is strictly increasing."
      }
    ]
  },
  {
    "id": "tree_bst_preorder",
    "title": "Preorder Traversal of BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "preorder bst",
      "bst preorder traversal",
      "reconstruct bst preorder"
    ],
    "definition": "Preorder traversal of a BST visits the Root first, then Left subtree, then Right subtree (Root -> Left -> Right).",
    "concept_explanation": "This program implements Binary Search Tree (BST) creation and node insertion, strictly enforcing the ordering property: smaller values are recursively inserted into the left subtree, and larger values into the right subtree. It also performs Preorder, Inorder (which yields strictly sorted keys), and Postorder traversals. (Note: This program specifically focuses on Creation, Insertion, and Traversals; deletion and searching are maintained under their dedicated standalone topics).",
    "algorithm": "preorder(root):\nStep 1: If root == NULL, return.\nStep 2: print root->data.\nStep 3: preorder(root->left).\nStep 4: preorder(root->right).",
    "pseudocode": "function preorder(root):\n    if root == NULL: return\n    print root.data\n    preorder(root.left)\n    preorder(root.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left;\n    struct Node *right;\n};\n\n// Create a new BST node on the heap\nstruct Node* createNode(int val) {\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) return NULL;\n    newNode->data = val;\n    newNode->left = NULL;\n    newNode->right = NULL;\n    return newNode;\n}\n\n/**\n * Insert a value into the BST:\n * - If tree is empty, create root node.\n * - If value is smaller than current node, insert into left subtree.\n * - If value is larger than current node, insert into right subtree.\n */\nstruct Node* insertBST(struct Node *root, int val) {\n    if (root == NULL) {\n        return createNode(val);\n    }\n    if (val < root->data) {\n        root->left = insertBST(root->left, val);\n    } else if (val > root->data) {\n        root->right = insertBST(root->right, val);\n    }\n    return root;\n}\n\n/**\n * Inorder Traversal: Left -> Root -> Right\n * Property: Inorder traversal of a BST always yields values in sorted ascending order.\n */\nvoid inorder(struct Node *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\n/**\n * Preorder Traversal: Root -> Left -> Right\n */\nvoid preorder(struct Node *root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\n/**\n * Postorder Traversal: Left -> Right -> Root\n */\nvoid postorder(struct Node *root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\nint main(void) {\n    struct Node *root = NULL;\n    int values[] = {50, 30, 20, 40, 70, 60, 80};\n    int n = sizeof(values) / sizeof(values[0]);\n\n    printf(\"====================================================\\n\");\n    printf(\"   Binary Search Tree (BST) Creation & Traversals   \\n\");\n    printf(\"   Rule: Smaller values go left, larger go right    \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    printf(\"Inserting values into BST:\\n\");\n    for (int i = 0; i < n; i++) {\n        printf(\"  Insert %d\\n\", values[i]);\n        root = insertBST(root, values[i]);\n    }\n    printf(\"\\n\");\n\n    printf(\"Inorder Traversal   (Sorted Order)   : \");\n    inorder(root);\n    printf(\"\\n\");\n\n    printf(\"Preorder Traversal  (Root, Left, Right): \");\n    preorder(root);\n    printf(\"\\n\");\n\n    printf(\"Postorder Traversal (Left, Right, Root): \");\n    postorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "BST with root 40, subtrees 20 and 60",
    "sample_output": "====================================================\n   Binary Search Tree (BST) Creation & Traversals   \n   Rule: Smaller values go left, larger go right    \n====================================================\n\nInserting values into BST:\n  Insert 50\n  Insert 30\n  Insert 20\n  Insert 40\n  Insert 70\n  Insert 60\n  Insert 80\n\nInorder Traversal   (Sorted Order)   : 20 30 40 50 60 70 80 \nPreorder Traversal  (Root, Left, Right): 50 30 20 40 70 60 80 \nPostorder Traversal (Left, Right, Root): 20 40 30 60 80 70 50 ",
    "dry_run": "40 -> left (20) -> left (10) -> right (30) -> right of 40 (60) -> left (50) -> right (70).",
    "time_complexity": "• O(n) traversal.",
    "space_complexity": "• O(h) recursion stack.",
    "advantages_disadvantages": "Can serialize and reconstruct the exact BST structure.",
    "applications": "• Serializing BST to compact file format.",
    "viva_questions": [
      {
        "q": "Can a BST be reconstructed from only preorder traversal?",
        "a": "Yes, because the root is the first element and partition points can be identified using the BST property."
      }
    ]
  },
  {
    "id": "tree_bst_postorder",
    "title": "Postorder Traversal of BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "postorder bst",
      "bst postorder traversal",
      "delete bst postorder"
    ],
    "definition": "Postorder traversal of a BST visits Left subtree, then Right subtree, and finally the Root (Left -> Right -> Root).",
    "concept_explanation": "This program implements Binary Search Tree (BST) creation and node insertion, strictly enforcing the ordering property: smaller values are recursively inserted into the left subtree, and larger values into the right subtree. It also performs Preorder, Inorder (which yields strictly sorted keys), and Postorder traversals. (Note: This program specifically focuses on Creation, Insertion, and Traversals; deletion and searching are maintained under their dedicated standalone topics).",
    "algorithm": "postorder(root):\nStep 1: If root == NULL, return.\nStep 2: postorder(root->left).\nStep 3: postorder(root->right).\nStep 4: print root->data.",
    "pseudocode": "function postorder(root):\n    if root == NULL: return\n    postorder(root.left)\n    postorder(root.right)\n    print root.data",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left;\n    struct Node *right;\n};\n\n// Create a new BST node on the heap\nstruct Node* createNode(int val) {\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\n    if (!newNode) return NULL;\n    newNode->data = val;\n    newNode->left = NULL;\n    newNode->right = NULL;\n    return newNode;\n}\n\n/**\n * Insert a value into the BST:\n * - If tree is empty, create root node.\n * - If value is smaller than current node, insert into left subtree.\n * - If value is larger than current node, insert into right subtree.\n */\nstruct Node* insertBST(struct Node *root, int val) {\n    if (root == NULL) {\n        return createNode(val);\n    }\n    if (val < root->data) {\n        root->left = insertBST(root->left, val);\n    } else if (val > root->data) {\n        root->right = insertBST(root->right, val);\n    }\n    return root;\n}\n\n/**\n * Inorder Traversal: Left -> Root -> Right\n * Property: Inorder traversal of a BST always yields values in sorted ascending order.\n */\nvoid inorder(struct Node *root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\n/**\n * Preorder Traversal: Root -> Left -> Right\n */\nvoid preorder(struct Node *root) {\n    if (root == NULL) return;\n    printf(\"%d \", root->data);\n    preorder(root->left);\n    preorder(root->right);\n}\n\n/**\n * Postorder Traversal: Left -> Right -> Root\n */\nvoid postorder(struct Node *root) {\n    if (root == NULL) return;\n    postorder(root->left);\n    postorder(root->right);\n    printf(\"%d \", root->data);\n}\n\nint main(void) {\n    struct Node *root = NULL;\n    int values[] = {50, 30, 20, 40, 70, 60, 80};\n    int n = sizeof(values) / sizeof(values[0]);\n\n    printf(\"====================================================\\n\");\n    printf(\"   Binary Search Tree (BST) Creation & Traversals   \\n\");\n    printf(\"   Rule: Smaller values go left, larger go right    \\n\");\n    printf(\"====================================================\\n\\n\");\n\n    printf(\"Inserting values into BST:\\n\");\n    for (int i = 0; i < n; i++) {\n        printf(\"  Insert %d\\n\", values[i]);\n        root = insertBST(root, values[i]);\n    }\n    printf(\"\\n\");\n\n    printf(\"Inorder Traversal   (Sorted Order)   : \");\n    inorder(root);\n    printf(\"\\n\");\n\n    printf(\"Preorder Traversal  (Root, Left, Right): \");\n    preorder(root);\n    printf(\"\\n\");\n\n    printf(\"Postorder Traversal (Left, Right, Root): \");\n    postorder(root);\n    printf(\"\\n\");\n\n    return 0;\n}",
    "sample_input": "BST with 40, 20, 60, 10, 30, 50, 70",
    "sample_output": "====================================================\n   Binary Search Tree (BST) Creation & Traversals   \n   Rule: Smaller values go left, larger go right    \n====================================================\n\nInserting values into BST:\n  Insert 50\n  Insert 30\n  Insert 20\n  Insert 40\n  Insert 70\n  Insert 60\n  Insert 80\n\nInorder Traversal   (Sorted Order)   : 20 30 40 50 60 70 80 \nPreorder Traversal  (Root, Left, Right): 50 30 20 40 70 60 80 \nPostorder Traversal (Left, Right, Root): 20 40 30 60 80 70 50 ",
    "dry_run": "Left leaf 10, right leaf 30 -> 20. Left leaf 50, right leaf 70 -> 60. Root 40 last.",
    "time_complexity": "• O(n) traversal.",
    "space_complexity": "• O(h) recursion stack space.",
    "advantages_disadvantages": "Safely frees children before parents.",
    "applications": "• Deallocating BST memory dynamically.",
    "viva_questions": [
      {
        "q": "When is postorder traversal preferred in BST operations?",
        "a": "When deallocating all nodes in a tree, since child nodes are deleted before parents."
      }
    ]
  },
  {
    "id": "tree_bst_level_order",
    "title": "Level Order Traversal of BST",
    "category": "trees",
    "categoryName": "Trees",
    "subcategory": "binary_search_tree",
    "subcategoryName": "Binary Search Tree (BST)",
    "keywords": [
      "level order bst",
      "bst bfs",
      "breadth first search bst",
      "bst level traversal"
    ],
    "definition": "Level order traversal of a BST visits nodes row by row from top to bottom (level 0 root down to deepest level) using a FIFO queue.",
    "concept_explanation": "Level order traversal provides an intuitive geometric view of the BST, showing which keys are at which depth from the root.",
    "algorithm": "Step 1: If root == NULL return.\nStep 2: Enqueue root into Q.\nStep 3: While Q not empty:\n        curr = dequeue(Q)\n        print curr->data\n        if curr->left: enqueue(curr->left)\n        if curr->right: enqueue(curr->right)",
    "pseudocode": "function levelOrder(root):\n    queue Q; enqueue(Q, root)\n    while not empty(Q):\n        n = dequeue(Q); print n.data\n        if n.left: enqueue(Q, n.left)\n        if n.right: enqueue(Q, n.right)",
    "c_program": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node { int data; struct Node* left; struct Node* right; };\n\nstruct Node* insert(struct Node* root, int val) {\n    if (root == NULL) {\n        struct Node* n = malloc(sizeof(struct Node));\n        n->data = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\n#define MAX 50\nstruct Node* queue[MAX];\nint front = 0, rear = 0;\n\nvoid levelOrder(struct Node* root) {\n    if (root == NULL) return;\n    front = rear = 0;\n    queue[rear++] = root;\n    while (front < rear) {\n        struct Node* curr = queue[front++];\n        printf(\"%d \", curr->data);\n        if (curr->left) queue[rear++] = curr->left;\n        if (curr->right) queue[rear++] = curr->right;\n    }\n}\n\nint main(void) {\n    printf(\"=== BST Level Order Traversal ===\\n\");\n    struct Node* root = NULL;\n    int data[] = {40, 20, 60, 10, 30, 50, 70};\n    for (int i = 0; i < 7; i++) root = insert(root, data[i]);\n\n    printf(\"Level Order: \");\n    levelOrder(root);\n    printf(\"\\n\");\n    return 0;\n}",
    "sample_input": "BST with 40 (lvl 0), 20,60 (lvl 1), 10,30,50,70 (lvl 2)",
    "sample_output": "=== BST Level Order Traversal ===\nLevel Order: 40 20 60 10 30 50 70",
    "dry_run": "Level 0: 40. Level 1: 20, 60. Level 2: 10, 30, 50, 70.",
    "time_complexity": "• O(n) visits each node once.",
    "space_complexity": "• O(w) queue storage where w is maximum level width.",
    "advantages_disadvantages": "Reveals tree balance visually level by level.",
    "applications": "• Level-by-level tree visualization in GUI debuggers.",
    "viva_questions": [
      {
        "q": "What traversal is also known as Breadth-First Search (BFS)?",
        "a": "Level Order Traversal."
      }
    ]
  }
];
