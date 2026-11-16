const fs = require('fs');
const path = require('path');

const searching = require('./data/complete/searching.js');
const sorting = require('./data/complete/sorting.js');
const linked_lists = require('./data/complete/linked_lists.js');
const stacks = require('./data/complete/stacks.js');
const queues = require('./data/complete/queues.js');
const trees = require('./data/complete/trees.js');
const graphs = require('./data/complete/graphs.js');

const allTopics = [
  ...searching,
  ...sorting,
  ...linked_lists,
  ...stacks,
  ...queues,
  ...trees,
  ...graphs
];

// Define structured categories for accordion navigation
const categories = [
  {
    id: 'searching',
    name: 'Searching Techniques',
    icon: 'search',
    count: searching.length,
    subcategories: [
      { id: 'linear_search', name: 'Linear Search', topics: ['linear_search'] },
      { id: 'binary_search', name: 'Binary Search', topics: ['binary_search'] }
    ]
  },
  {
    id: 'sorting',
    name: 'Sorting Algorithms',
    icon: 'arrow-down-up',
    count: sorting.length,
    subcategories: [
      {
        id: 'comparison_sorts',
        name: 'Standard Sorts',
        topics: ['bubble_sort', 'selection_sort', 'insertion_sort', 'merge_sort', 'quick_sort']
      }
    ]
  },
  {
    id: 'linked_lists',
    name: 'Linked Lists',
    icon: 'link-2',
    count: linked_lists.length,
    subcategories: [
      {
        id: 'singly_linked_list',
        name: 'Singly Linked List (12 Ops)',
        topics: [
          'sll_create', 'sll_insert_beginning', 'sll_insert_end', 'sll_insert_pos',
          'sll_delete_beginning', 'sll_delete_end', 'sll_delete_val', 'sll_delete_pos',
          'sll_display', 'sll_search', 'sll_count', 'sll_reverse'
        ]
      },
      {
        id: 'doubly_linked_list',
        name: 'Doubly Linked List (10 Ops)',
        topics: [
          'dll_create', 'dll_insert_beginning', 'dll_insert_end', 'dll_insert_pos',
          'dll_delete_beginning', 'dll_delete_end', 'dll_delete_node',
          'dll_traverse_forward', 'dll_traverse_backward', 'dll_search'
        ]
      },
      {
        id: 'circular_linked_list',
        name: 'Circular Linked List (6 Ops)',
        topics: [
          'cll_create', 'cll_insert_beginning', 'cll_insert_end',
          'cll_delete_node', 'cll_display', 'cll_search'
        ]
      }
    ]
  },
  {
    id: 'stacks',
    name: 'Stacks',
    icon: 'layers',
    count: stacks.length,
    subcategories: [
      {
        id: 'stack_array',
        name: 'Array-Based Stack (8 Ops)',
        topics: [
          'stack_array_create', 'stack_array_push', 'stack_array_pop', 'stack_array_peek',
          'stack_array_display', 'stack_array_isempty', 'stack_array_isfull', 'stack_array_overflow_underflow'
        ]
      },
      {
        id: 'stack_linked_list',
        name: 'Linked List Stack (7 Ops)',
        topics: [
          'stack_ll_create', 'stack_ll_push', 'stack_ll_pop', 'stack_ll_peek',
          'stack_ll_display', 'stack_ll_isempty', 'stack_ll_overflow_underflow'
        ]
      },
      {
        id: 'stack_applications',
        name: 'Stack Applications (4 Ops)',
        topics: [
          'stack_lifo_principle', 'stack_infix_to_postfix', 'stack_postfix_evaluation', 'stack_parentheses_matching'
        ]
      }
    ]
  },
  {
    id: 'queues',
    name: 'Queues',
    icon: 'list-ordered',
    count: queues.length,
    subcategories: [
      {
        id: 'queue_array',
        name: 'Linear Queue (Array) (7 Ops)',
        topics: [
          'queue_array_create', 'queue_array_enqueue', 'queue_array_dequeue', 'queue_array_peek',
          'queue_array_display', 'queue_array_isempty', 'queue_array_isfull'
        ]
      },
      {
        id: 'circular_queue',
        name: 'Circular Queue (6 Ops)',
        topics: [
          'cqueue_create', 'cqueue_enqueue', 'cqueue_dequeue', 'cqueue_display',
          'cqueue_front_rear', 'cqueue_full_empty'
        ]
      },
      {
        id: 'queue_linked_list',
        name: 'Linked List Queue (6 Ops)',
        topics: [
          'queue_ll_create', 'queue_ll_enqueue', 'queue_ll_dequeue', 'queue_ll_peek',
          'queue_ll_display', 'queue_ll_empty'
        ]
      },
      {
        id: 'queue_special',
        name: 'Specialized Queues (2 Ops)',
        topics: ['queue_deque', 'queue_priority']
      }
    ]
  },
  {
    id: 'trees',
    name: 'Trees',
    icon: 'git-branch',
    count: trees.length,
    subcategories: [
      {
        id: 'binary_tree',
        name: 'Binary Tree (10 Ops)',
        topics: [
          'tree_bt_create', 'tree_bt_linked_rep', 'tree_bt_preorder', 'tree_bt_inorder',
          'tree_bt_postorder', 'tree_bt_level_order', 'tree_bt_count_nodes', 'tree_bt_count_leaves',
          'tree_bt_height', 'tree_bt_search'
        ]
      },
      {
        id: 'binary_search_tree',
        name: 'Binary Search Tree (BST) (12 Ops)',
        topics: [
          'tree_bst_create', 'tree_bst_insert', 'tree_bst_search', 'tree_bst_delete_leaf',
          'tree_bst_delete_one_child', 'tree_bst_delete_two_children', 'tree_bst_find_min',
          'tree_bst_find_max', 'tree_bst_inorder', 'tree_bst_preorder', 'tree_bst_postorder',
          'tree_bst_level_order'
        ]
      }
    ]
  },
  {
    id: 'graphs',
    name: 'Graphs',
    icon: 'network',
    count: graphs.length,
    subcategories: [
      {
        id: 'graph_representation',
        name: 'Representations (3 Ops)',
        topics: ['graph_representation', 'graph_adj_matrix', 'graph_adj_list']
      },
      {
        id: 'graph_traversal',
        name: 'Traversals (5 Ops)',
        topics: ['graph_bfs', 'graph_dfs', 'graph_bfs_queue', 'graph_dfs_recursion', 'graph_dfs_stack']
      },
      {
        id: 'graph_types',
        name: 'Graph Variations (3 Ops)',
        topics: ['graph_directed', 'graph_undirected', 'graph_weighted']
      }
    ]
  }
];

// Map topics by id
const topicsById = {};
allTopics.forEach(t => {
  topicsById[t.id] = t;
});

// Verify all category topic IDs exist in topicsById
let missingCategoryTopics = 0;
categories.forEach(cat => {
  cat.subcategories.forEach(sub => {
    sub.topics.forEach(tid => {
      if (!topicsById[tid]) {
        console.error(`Error: Category topic ID ${tid} not found in allTopics!`);
        missingCategoryTopics++;
      }
    });
  });
});

if (missingCategoryTopics > 0) {
  console.error(`Build failed: ${missingCategoryTopics} category topics missing!`);
  process.exit(1);
}

const bundleContent = `/**
 * DS Complete Answers — 100% Offline Complete Knowledge Base
 * Bundled automatically for StudyMate AI. Contains all 108 Operations across 7 Units.
 * Auto-generated on: ${new Date().toISOString()}
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.DS_COMPLETE_DATA = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CATEGORIES = ${JSON.stringify(categories, null, 2)};
  var TOPICS = ${JSON.stringify(topicsById, null, 2)};
  var ALL_TOPICS = ${JSON.stringify(allTopics.map(t => ({
    id: t.id,
    title: t.title,
    category: t.category,
    categoryName: t.categoryName,
    subcategory: t.subcategory,
    subcategoryName: t.subcategoryName,
    keywords: t.keywords || []
  })), null, 2)};

  return {
    CATEGORIES: CATEGORIES,
    TOPICS: TOPICS,
    ALL_TOPICS: ALL_TOPICS,
    totalCount: ${allTopics.length}
  };
});
`;

const outputPath = path.join(__dirname, '..', 'public', 'js', 'ds-complete-data.js');
fs.writeFileSync(outputPath, bundleContent, 'utf8');
console.log('Successfully bundled', allTopics.length, 'operations into', outputPath);
