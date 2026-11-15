/**
 * NLP & Question Understanding Pipeline Module
 * Text normalization, spelling corrections, synonym dictionary, 14-intent classifier,
 * topic classification, and follow-up resolution.
 */

const SPELLING_CORRECTIONS = {
  // Sorting typos
  'bubel': 'bubble',
  'buble': 'bubble',
  'bubbl': 'bubble',
  'bobble': 'bubble',
  'selction': 'selection',
  'selecshun': 'selection',
  'selectn': 'selection',
  'insrtion': 'insertion',
  'insertn': 'insertion',
  'inertion': 'insertion',
  'mrge': 'merge',
  'merg': 'merge',
  'quik': 'quick',
  'qick': 'quick',
  'quck': 'quick',
  'lomuto': 'lomuto',
  'partishun': 'partition',
  'partion': 'partition',

  // Searching typos
  'binery': 'binary',
  'binry': 'binary',
  'binnary': 'binary',
  'linar': 'linear',
  'liner': 'linear',
  'leniar': 'linear',
  'seqential': 'sequential',
  'serch': 'search',
  'srch': 'search',

  // Linked list typos
  'likned': 'linked',
  'linkd': 'linked',
  'linkt': 'linked',
  'singly': 'singly',
  'singley': 'singly',
  'dubly': 'doubly',
  'doubly': 'doubly',
  'circuler': 'circular',
  'circulr': 'circular',
  'circlar': 'circular',
  'traversl': 'traversal',
  'treversal': 'traversal',
  'revers': 'reverse',
  'reversal': 'reversal',
  'delet': 'delete',
  'delt': 'delete',
  'delte': 'delete',

  // Stack and Queue typos
  'stck': 'stack',
  'stk': 'stack',
  'stak': 'stack',
  'usin': 'using',
  'aray': 'array',
  'queu': 'queue',
  'que': 'queue',
  'q': 'queue',
  'enque': 'enqueue',
  'deque': 'dequeue',
  'overflw': 'overflow',
  'underflw': 'underflow',
  'paranthesis': 'parentheses',
  'parenthese': 'parentheses',
  'balancd': 'balanced',
  'infto': 'infix',
  'postfx': 'postfix',

  // Tree and Graph typos
  'tre': 'tree',
  'inordr': 'inorder',
  'preordr': 'preorder',
  'postordr': 'postorder',
  'trversals': 'traversals',
  'adjacncy': 'adjacency',
  'matrx': 'matrix',
  'hashingg': 'hashing',
  'probin': 'probing',

  // General & Complexity typos
  'complxity': 'complexity',
  'cmplexity': 'complexity',
  'asymptotik': 'asymptotic',
  'asymtotic': 'asymptotic',
  'diffrnce': 'difference',
  'diference': 'difference',
  'diffrence': 'difference',
  'btwn': 'between',
  'dynamc': 'dynamic',
  'memry': 'memory',
  'statc': 'static',
  'algrithm': 'algorithm',
  'algoritm': 'algorithm',
  'prg': 'program',
  'prog': 'program',
  'progam': 'program',
  'exm': 'exam',
  'viv': 'viva'
};

const SYNONYM_MAP = {
  'add': 'insert',
  'push': 'insert',
  'append': 'insert',
  'enqueue': 'insert',
  'remove': 'delete',
  'pop': 'delete',
  'dequeue': 'delete',
  'drop': 'delete',
  'erase': 'delete',
  'find': 'search',
  'lookup': 'search',
  'locate': 'search',
  'invert': 'reverse',
  'flip': 'reverse',
  'display': 'traverse',
  'print': 'traverse',
  'visit': 'traverse',
  'walk': 'traverse',
  'differentiate': 'compare',
  'difference': 'compare',
  'versus': 'compare',
  'vs': 'compare',
  'contrast': 'compare',
  'distinguish': 'compare'
};

function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  let t = text.toLowerCase();
  // Expand contractions
  t = t.replace(/what's/g, 'what is')
       .replace(/how's/g, 'how is')
       .replace(/don't/g, 'do not')
       .replace(/can't/g, 'cannot')
       .replace(/won't/g, 'will not')
       .replace(/i'm/g, 'i am');
  // Remove punctuation except essential symbols
  t = t.replace(/[?!,;:"'()[\]{}-]/g, ' ');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

function correctSpelling(normalizedText) {
  const words = normalizedText.split(' ');
  const corrected = words.map(w => SPELLING_CORRECTIONS[w] || w);
  return corrected.join(' ');
}

function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Classifies question intent into 14 distinct categories:
 * c_program, algorithm, dry_run, comparison, list_all, complexity,
 * advantages_disadvantages, applications, viva, definition,
 * short_answer, output_prediction, specific_operation, explanation
 */
function detectQuestionIntent(q) {
  // 1. List All / Master Guides
  if (
    (q.includes('all') && (q.includes('sort') || q.includes('linked list') || q.includes('traversal') || q.includes('queue') || q.includes('techniques') || q.includes('methods') || q.includes('types'))) ||
    q.includes('different sorting methods') ||
    q.includes('explain all sorting') ||
    q.includes('different types of linked lists') ||
    q.includes('explain different sorting') ||
    q.includes('list all') ||
    q.includes('types of data structures') ||
    q.includes('classification of data structures')
  ) {
    return 'list_all';
  }

  // 2. Viva / Oral Exam Questions
  if (q.includes('viva') || q.includes('interview') || q.includes('oral') || q.includes('exam question') || q.includes('faq')) {
    return 'viva';
  }

  // 3. Comparison / Differentiate Questions
  if (q.includes('vs') || q.includes('versus') || q.includes('difference') || q.includes('compare') || q.includes('contrast') || q.includes('distinguish') || q.includes('differentiate')) {
    return 'comparison';
  }

  // 4. Output Prediction
  if (q.includes('predict output') || q.includes('what will be the output') || q.includes('expected output of') || q.includes('what is the output')) {
    return 'output_prediction';
  }

  // 5. Dry-Run / Trace
  if (q.includes('dry run') || q.includes('trace') || q.includes('demonstrate') || q.includes('walk through') || q.includes('step by step execution') || q.includes('trace table') || (q.includes('with an example') && !q.includes('program') && !q.includes('code'))) {
    return 'dry_run';
  }

  // 6. C Programming Questions
  if (
    q.includes('program') ||
    q.includes('c program') ||
    q.includes('c code') ||
    q.includes('write a program') ||
    q.includes('write program') ||
    q.includes('write a c program') ||
    q.includes('give the program') ||
    q.includes('give c code') ||
    q.includes('show c code') ||
    q.includes('c function') ||
    q.includes('implementation in c') ||
    q.includes('code implementation') ||
    (q.includes('code') && (q.includes('for') || q.includes('to') || q.includes('in c') || q.includes('show') || q.includes('give') || q.includes('implementation') || q.includes('program')))
  ) {
    return 'c_program';
  }

  // 7. Algorithm Questions
  if (q.includes('algorithm') || q.includes('algo') || q.includes('pseudocode') || q.includes('write an algorithm') || q.includes('procedure for') || q.includes('steps for')) {
    return 'algorithm';
  }

  // 8. Complexity Questions
  if (q.includes('complexity') || q.includes('time complexity') || q.includes('space complexity') || q.includes('big o') || q.includes('omega') || q.includes('theta') || q.includes('runtime')) {
    return 'complexity';
  }

  // 9. Advantages & Disadvantages
  if (q.includes('advantages and disadvantages') || q.includes('pros and cons') || q.includes('advantages') || q.includes('disadvantages') || q.includes('merits and demerits') || q.includes('benefits') || q.includes('limitations') || q.includes('drawbacks')) {
    return 'advantages_disadvantages';
  }

  // 10. Real-World Applications
  if (q.includes('application') || q.includes('applications') || q.includes('real world') || q.includes('use case') || q.includes('where is it used')) {
    return 'applications';
  }

  // 11. Specific Operations
  if (
    q.includes('stack overflow and underflow') ||
    q.includes('overflow and underflow') ||
    q.includes('insertion in a singly linked list') ||
    q.includes('insert in a linked list') ||
    q.includes('insert at beginning') ||
    q.includes('insert at end') ||
    q.includes('delete a node') ||
    q.includes('deletion in a linked list') ||
    q.includes('delete from beginning') ||
    q.includes('delete from end') ||
    q.includes('infix to postfix') ||
    q.includes('balanced parentheses') ||
    q.includes('construct a binary tree and perform all traversals')
  ) {
    return 'specific_operation';
  }

  // 12. Short Answer
  if (q.includes('short note') || q.includes('in brief') || q.includes('briefly explain') || q.includes('short answer')) {
    return 'short_answer';
  }

  // 13. Definition
  if (q.startsWith('what is') || q.startsWith('define') || q.startsWith('meaning of') || q.includes('definition')) {
    return 'definition';
  }

  // 14. General Explanation (Default)
  return 'explanation';
}

/**
 * Matches question against all known topics and operations with scoring.
 */
function classifyDSQuery(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return { isDSQuery: false, confidence: 0 };
  }

  const norm = normalizeText(rawQuery);
  const q = correctSpelling(norm);
  const intent = detectQuestionIntent(q);

  // ── Priority 0: Comparison Queries ──
  if (intent === 'comparison') {
    if (q.includes('preorder') && q.includes('postorder')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'preorder_vs_postorder', name: 'Preorder vs Postorder Traversal', intent };
    }
    if (q.includes('preorder') && q.includes('inorder')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'preorder_vs_inorder', name: 'Preorder vs Inorder Traversal', intent };
    }
    if (q.includes('inorder') && q.includes('postorder')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'inorder_vs_postorder', name: 'Inorder vs Postorder Traversal', intent };
    }
    if (q.includes('bubble') && q.includes('selection')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'bubble_vs_selection_sort', name: 'Bubble Sort vs Selection Sort', intent };
    }
    if (q.includes('selection') && q.includes('insertion')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'selection_vs_insertion_sort', name: 'Selection Sort vs Insertion Sort', intent };
    }
    if (q.includes('merge') && q.includes('quick')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'merge_vs_quick_sort', name: 'Merge Sort vs Quick Sort', intent };
    }
    if ((q.includes('linear') && q.includes('binary')) || (q.includes('sequential') && q.includes('binary'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'linear_vs_binary_search', name: 'Linear Search vs Binary Search', intent };
    }
    if (q.includes('stack') && q.includes('queue')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'stack_vs_queue', name: 'Stack vs Queue', intent };
    }
    if (q.includes('stack') && q.includes('array') && q.includes('linked list')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'stack_array_vs_linked_list', name: 'Stack using Array vs Linked List', intent };
    }
    if (q.includes('queue') && q.includes('array') && q.includes('linked list')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'queue_array_vs_linked_list', name: 'Queue using Array vs Linked List', intent };
    }
    if (q.includes('array') && q.includes('linked list')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'array_vs_linked_list', name: 'Array vs Linked List', intent };
    }
    if ((q.includes('bfs') && q.includes('dfs')) || (q.includes('breadth') && q.includes('depth'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'bfs_vs_dfs', name: 'BFS vs DFS', intent };
    }
    if ((q.includes('matrix') && q.includes('list')) || (q.includes('adjacency') && (q.includes('matrix') || q.includes('list')))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'adj_matrix_vs_adj_list', name: 'Adjacency Matrix vs Adjacency List', intent };
    }
    if (q.includes('bubble') && q.includes('quick')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'bubble_vs_quick_sort', name: 'Bubble Sort vs Quick Sort', intent };
    }
    if (q.includes('linear') && q.includes('circular') && q.includes('queue')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'linear_vs_circular_queue', name: 'Linear Queue vs Circular Queue', intent };
    }
    if (q.includes('singly') && q.includes('circular')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'singly_vs_circular_linked_list', name: 'Singly Linked List vs Circular Linked List', intent };
    }
    if (q.includes('singly') && q.includes('doubly')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'singly_vs_doubly_linked_list', name: 'Singly Linked List vs Doubly Linked List', intent };
    }
    if (q.includes('linear probing') && q.includes('chaining')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'linear_probing_vs_chaining', name: 'Linear Probing vs Separate Chaining', intent };
    }
    if (q.includes('min heap') && q.includes('max heap')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'min_heap_vs_max_heap', name: 'Min-Heap vs Max-Heap', intent };
    }
    if (q.includes('primitive') && (q.includes('non primitive') || q.includes('non-primitive'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'fundamentals', item: 'introduction', name: 'Primitive vs Non-Primitive Data Structures', intent };
    }
    if (q.includes('time') && q.includes('space') && (q.includes('complexity') || q.includes('trade'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'time_vs_space_complexity', name: 'Time Complexity vs Space Complexity', intent };
    }
    if ((q.includes('in place') || q.includes('in-place')) && (q.includes('out of place') || q.includes('out-of-place'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'in_place_vs_out_of_place', name: 'In-Place vs Out-of-Place Sorting', intent };
    }
    if ((q.includes('stable') || q.includes('stability')) && (q.includes('unstable') || q.includes('sort'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'stable_vs_unstable_sort', name: 'Stable vs Unstable Sorting', intent };
    }
    if (q.includes('static') && q.includes('dynamic') && q.includes('memory')) {
      return { isDSQuery: true, confidence: 1.0, topic: 'fundamentals', item: 'static_vs_dynamic_memory', name: 'Static vs Dynamic Memory Allocation', intent };
    }
    if (q.includes('linear') && (q.includes('non linear') || q.includes('non-linear') || q.includes('non'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'fundamentals', item: 'linear_vs_non_linear', name: 'Linear vs Non-Linear Data Structures', intent };
    }
    if (q.includes('binary tree') && (q.includes('bst') || q.includes('binary search tree'))) {
      return { isDSQuery: true, confidence: 1.0, topic: 'binary_trees', item: 'bst', name: 'Binary Tree vs Binary Search Tree (BST)', intent };
    }
  }

  // ── Priority 1: Multi-topic / List All Queries ──
  if (
    (q.includes('all') && q.includes('sort')) ||
    q.includes('explain all sorting') ||
    q.includes('explain different sorting') ||
    q.includes('different sorting methods') ||
    q.includes('all sorting techniques') ||
    q.includes('all sorting algorithms')
  ) {
    return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'all_sorting_techniques', name: 'All Sorting Techniques', intent: 'list_all' };
  }

  if (
    (q.includes('all') && q.includes('linked list')) ||
    q.includes('different types of linked lists') ||
    q.includes('types of linked lists') ||
    q.includes('all linked list types')
  ) {
    return { isDSQuery: true, confidence: 1.0, topic: 'linked_lists', item: 'all_linked_lists', name: 'Types of Linked Lists', intent: 'list_all' };
  }

  // Construct tree & traversals (takes precedence over general traversals)
  if (q.includes('construct a binary tree') || (q.includes('construct') && q.includes('tree'))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'binary_trees', item: 'tree_construction_and_traversals', name: 'Construct Binary Tree & Traversals', intent: 'c_program' };
  }

  if (
    (q.includes('all') && q.includes('traversal')) ||
    q.includes('different tree traversals') ||
    q.includes('all tree traversals') ||
    q.includes('types of tree traversals')
  ) {
    return { isDSQuery: true, confidence: 1.0, topic: 'binary_trees', item: 'all_traversals', name: 'Binary Tree Traversals', intent: 'list_all' };
  }

  if (
    (q.includes('all') && q.includes('queue')) ||
    q.includes('different queue types') ||
    q.includes('types of queues')
  ) {
    return { isDSQuery: true, confidence: 1.0, topic: 'queues', item: 'all_queues', name: 'Types of Queues', intent: 'list_all' };
  }

  // ── Priority 2: Special Reference Tables & Viva Bank ──
  if (
    q.includes('complexity table') ||
    q.includes('big o table') ||
    q.includes('big-o time complexity comparison table') ||
    (q.includes('complexity') && q.includes('table'))
  ) {
    return { isDSQuery: true, confidence: 1.0, topic: 'complexity_table', item: 'complexity_table', name: 'Big-O Complexity Comparison Table', intent: 'complexity' };
  }

  if (
    (q.includes('viva') || q.includes('interview') || q.includes('oral')) &&
    (q.includes('data structure') || q.includes('ds') || q.includes('all') || q.includes('top viva') || q.includes('bank') ||
     (!q.includes('search') && !q.includes('sort') && !q.includes('list') && !q.includes('stack') && !q.includes('queue') && !q.includes('tree') && !q.includes('graph') && !q.includes('hash')))
  ) {
    return { isDSQuery: true, confidence: 1.0, topic: 'viva_bank', item: 'viva_bank', name: 'Viva Questions Bank', intent: 'viva' };
  }

  // ── Priority 3: Specific Operations & Targeted Questions ──
  // Construct tree & traversals
  if (q.includes('construct a binary tree') || (q.includes('construct') && q.includes('tree') && q.includes('traversal'))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'binary_trees', item: 'tree_construction_and_traversals', name: 'Construct Binary Tree & Traversals', intent: intent === 'c_program' ? 'c_program' : 'explanation' };
  }

  // Tree terminology & Structural Types (Full, Complete, Perfect)
  if (
    q.includes('tree terminology') ||
    q.includes('terminology of tree') ||
    (q.includes('terminology') && q.includes('tree')) ||
    (q.includes('tree') && (q.includes('full') || q.includes('complete') || q.includes('perfect') || q.includes('degree')))
  ) {
    return { isDSQuery: true, confidence: 1.0, topic: 'binary_trees', item: 'tree_terminology', name: 'Binary Tree Terminology', intent: 'explanation' };
  }

  // Stack overflow and underflow
  if (!q.includes('recursion') && !q.includes('recursive') && (q.includes('overflow and underflow') || (q.includes('stack') && (q.includes('overflow') || q.includes('underflow'))))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'stacks', item: 'overflow_underflow', name: 'Stack Overflow and Underflow', intent: intent === 'c_program' ? 'c_program' : 'specific_operation' };
  }

  // Singly linked list insertion
  if (
    q.includes('insertion in a singly linked list') ||
    q.includes('insert in a linked list') ||
    q.includes('insert in singly linked list') ||
    ((q.includes('insert') || q.includes('insertion')) && (q.includes('beginning') || q.includes('head') || q.includes('end') || q.includes('position'))) ||
    (q.includes('linked list') && (q.includes('insert at beginning') || q.includes('insert at head') || q.includes('insert at end'))) ||
    q.includes('insert head linked list')
  ) {
    return { isDSQuery: true, confidence: 0.98, topic: 'linked_lists', item: 'singly_linked_list_insertion', name: 'Singly Linked List Insertion', intent: intent === 'c_program' ? 'c_program' : 'specific_operation' };
  }

  // Singly linked list deletion
  if (
    q.includes('delete a node') ||
    q.includes('deletion in a linked list') ||
    q.includes('delete node from linked list') ||
    q.includes('program to delete a node') ||
    q.includes('write a program to delete a node') ||
    ((q.includes('delete') || q.includes('deletion')) && (q.includes('beginning') || q.includes('end') || q.includes('node') || q.includes('linked list')))
  ) {
    return { isDSQuery: true, confidence: 0.98, topic: 'linked_lists', item: 'singly_linked_list_deletion', name: 'Singly Linked List Deletion', intent: intent === 'c_program' ? 'c_program' : 'specific_operation' };
  }

  // Linked list reversal
  if (q.includes('reverse a linked list') || q.includes('reverse linked list') || q.includes('reversal of linked list') || (q.includes('reverse') && q.includes('list'))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'linked_lists', item: 'list_reversal', name: 'Linked List Reversal', intent: intent === 'c_program' ? 'c_program' : 'algorithm' };
  }

  // False Overflow / Circular Queue
  if (q.includes('false overflow')) {
    return { isDSQuery: true, confidence: 0.98, topic: 'circular_queues', item: 'circular_queue', name: 'Circular Queue (False Overflow Solution)', intent };
  }

  // Circular Queue
  if (q.includes('circular queue') || q.includes('ring buffer') || q.includes('(rear + 1) % max') || (q.includes('circular') && q.includes('queue'))) {
    return { isDSQuery: true, confidence: 0.98, topic: 'circular_queues', item: 'circular_queue', name: 'Circular Queue', intent };
  }

  // Searching Algorithms (Prioritized before general recursion/linked list checks, guarded against BST)
  if (
    !q.includes('tree') && !/\bbst\b/.test(q) && (
      q.includes('binary search') ||
      (q.includes('binary') && q.includes('search')) ||
      (q.includes('logarithmic') && q.includes('search')) ||
      ((q.includes('divide') || q.includes('dividing') || q.includes('halv')) && (q.includes('search') || q.includes('find') || q.includes('half')))
    )
  ) {
    return { isDSQuery: true, confidence: 1.0, topic: 'searching', item: 'binary_search', name: 'Binary Search', intent };
  }
  if (
    !q.includes('tree') && !/\bbst\b/.test(q) && !q.includes('linked list') && !q.includes('list') && (
      q.includes('linear search') ||
      (q.includes('sequential') && q.includes('search')) ||
      (q.includes('search') && !q.includes('graph') && !q.includes('hash'))
    )
  ) {
    return { isDSQuery: true, confidence: 0.9, topic: 'searching', item: 'linear_search', name: 'Linear Search', intent };
  }

  // Sorting Algorithms: Stability & In-Place Comparisons
  if (q.includes('stability') || (q.includes('stable') && q.includes('sort'))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'stable_vs_unstable_sort', name: 'Stable vs Unstable Sorting Algorithms', intent: 'comparison' };
  }
  if ((q.includes('in-place') || q.includes('in place')) && (q.includes('sort') || q.includes('algorithm'))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'comparisons', item: 'in_place_vs_out_of_place', name: 'In-Place vs Out-of-Place Sorting', intent: 'comparison' };
  }
  if ((q.includes('mostly sorted') || q.includes('nearly sorted') || q.includes('already sorted')) && (q.includes('sort') || q.includes('algorithm'))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'insertion_sort', name: 'Insertion Sort', intent };
  }
  if (q.includes('quick sort') || (q.includes('quick') && q.includes('sort')) || q.includes('lomuto') || (q.includes('pivot') && q.includes('partition')) || (q.includes('quicksort') && q.includes('worst'))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'quick_sort', name: 'Quick Sort', intent };
  }
  if (q.includes('merge sort') || (q.includes('merge') && q.includes('sort'))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'merge_sort', name: 'Merge Sort', intent };
  }
  if (q.includes('bubble sort') || (q.includes('bubble') && q.includes('sort')) || q.includes('swap adjacent')) {
    return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'bubble_sort', name: 'Bubble Sort', intent };
  }
  if (q.includes('selection sort') || (q.includes('selection') && q.includes('sort') && !q.includes('pivot')) || (q.includes('find minimum') && q.includes('swap'))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'selection_sort', name: 'Selection Sort', intent };
  }
  if (q.includes('insertion sort') || (q.includes('insertion') && q.includes('sort'))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'sorting', item: 'insertion_sort', name: 'Insertion Sort', intent };
  }
  if (q.includes('sorting algorithm') || q.includes('sorting techniques') || (q.includes('which sort') || q.includes('best sort'))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'sorting', item: 'all_sorting_techniques', name: 'All Sorting Techniques', intent };
  }

  // Graphs BFS & DFS (Prioritized before general recursion/stack checks)
  if (q.includes('bfs') || q.includes('breadth first search') || (q.includes('breadth') && (q.includes('graph') || q.includes('traversal')))) {
    return { isDSQuery: true, confidence: 0.98, topic: 'graphs', item: 'bfs', name: 'Breadth-First Search (BFS)', intent };
  }
  if (q.includes('dfs') || q.includes('depth first search') || (q.includes('depth') && (q.includes('graph') || q.includes('traversal')))) {
    return { isDSQuery: true, confidence: 0.98, topic: 'graphs', item: 'dfs', name: 'Depth-First Search (DFS)', intent };
  }
  if (q.includes('graph') || (q.includes('adjacency') && (q.includes('matrix') || q.includes('list')))) {
    return { isDSQuery: true, confidence: 0.9, topic: 'graphs', item: 'bfs', name: 'Graph Traversals', intent };
  }

  // Hashing (Prioritized before general linked list checks)
  if (q.includes('linear probing')) {
    return { isDSQuery: true, confidence: 0.98, topic: 'hashing', item: 'linear_probing', name: 'Linear Probing', intent };
  }
  if (q.includes('separate chaining') || (q.includes('chaining') && (q.includes('hash') || q.includes('collision')))) {
    return { isDSQuery: true, confidence: 0.98, topic: 'hashing', item: 'separate_chaining', name: 'Separate Chaining', intent };
  }
  if (q.includes('hash') || q.includes('hashing') || q.includes('collision') || q.includes('load factor')) {
    return { isDSQuery: true, confidence: 0.95, topic: 'hashing', item: 'hashing_concept', name: 'Hashing & Hash Tables', intent };
  }

  // Additional Concepts: Heaps & Priority Queues
  if (q.includes('heap') || q.includes('min heap') || q.includes('max heap') || q.includes('priority queue') || q.includes('heapify')) {
    let item = 'min_heap';
    if (q.includes('max heap')) item = 'max_heap';
    else if (q.includes('priority queue')) item = 'priority_queue';
    return { isDSQuery: true, confidence: 0.95, topic: 'heaps', item: item, name: 'Heaps & Priority Queues', intent };
  }

  // Additional Concepts: Recursion & Tower of Hanoi
  if (q.includes('tower of hanoi') || q.includes('hanoi') || (q.includes('recursion') && (q.includes('disk') || q.includes('rod')))) {
    return { isDSQuery: true, confidence: 1.0, topic: 'recursion', item: 'tower_of_hanoi', name: 'Tower of Hanoi', intent };
  }
  if (q.includes('recursion') || q.includes('call stack') || (q.includes('recursive') && !q.includes('search'))) {
    return { isDSQuery: true, confidence: 0.9, topic: 'recursion', item: 'concepts', name: 'Recursion and Call Stack', intent };
  }

  // Stacks
  if (q.includes('infix to postfix') || q.includes('postfix expression') || q.includes('infix expression') || (q.includes('infix') && q.includes('postfix'))) {
    return { isDSQuery: true, confidence: 0.98, topic: 'stacks', item: 'infix_to_postfix', name: 'Infix to Postfix Conversion', intent };
  }
  if (q.includes('parenthes') || q.includes('bracket') || q.includes('balanced bracket')) {
    return { isDSQuery: true, confidence: 0.98, topic: 'stacks', item: 'parentheses_matching', name: 'Balanced Parentheses', intent };
  }
  if (q.includes('stack') || q.includes('lifo') || (q.includes('push') && q.includes('pop'))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'stacks', item: 'stack_array', name: 'Stack Using Arrays', intent };
  }

  // Queues
  if (q.includes('queue') || q.includes('fifo') || (q.includes('enqueue') && q.includes('dequeue'))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'queues', item: 'linear_queue', name: 'Linear Queue', intent };
  }

  // Binary Trees & BST: Traversals & Concepts
  if (q.includes('binary search tree') || /\bbst\b/.test(q)) {
    return { isDSQuery: true, confidence: 0.98, topic: 'binary_trees', item: 'bst', name: 'Binary Search Tree (BST)', intent };
  }
  if (
    q.includes('inorder') ||
    q.includes('preorder') ||
    q.includes('postorder') ||
    (q.includes('traversal') && (q.includes('tree') || q.includes('binary')))
  ) {
    return { isDSQuery: true, confidence: 0.98, topic: 'binary_trees', item: 'all_traversals', name: 'Binary Tree Traversals', intent };
  }
  if (q.includes('tree') || q.includes('leaf node') || (q.includes('height') && q.includes('tree'))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'binary_trees', item: 'bst', name: 'Binary Search Tree (BST)', intent };
  }

  // Linked Lists
  if (q.includes('doubly linked list') || q.includes('dll') || (q.includes('doubly') && q.includes('list'))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'linked_lists', item: 'doubly_linked_list', name: 'Doubly Linked List', intent };
  }
  if (q.includes('circular linked list') || q.includes('cll') || (q.includes('circular') && q.includes('linked list'))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'linked_lists', item: 'circular_linked_list', name: 'Circular Linked List', intent };
  }
  if (q.includes('linked list') || q.includes('singly linked list') || q.includes('sll') || (q.includes('node') && (q.includes('delete') || q.includes('insert') || q.includes('head') || q.includes('tail')))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'linked_lists', item: 'singly_linked_list', name: 'Singly Linked List', intent };
  }

  // Abstract Data Types (ADT) (Only if stack/queue not already claimed)
  if (q.includes('abstract data type') || /\badt\b/.test(q)) {
    return { isDSQuery: true, confidence: 0.98, topic: 'fundamentals', item: 'adt', name: 'Abstract Data Types (ADT)', intent };
  }

  // Fundamentals & Memory
  if (q.includes('rate of growth') || q.includes('growth of algorithms') || q.includes('growth hierarchy') || (q.includes('growth') && q.includes('algorithm')) || q.includes('order of growth')) {
    return { isDSQuery: true, confidence: 0.98, topic: 'fundamentals', item: 'asymptotic_notations', name: 'Asymptotic Notations', intent };
  }
  if (q.includes('memory leak') || q.includes('dangling pointer') || (q.includes('free') && q.includes('malloc'))) {
    return { isDSQuery: true, confidence: 0.98, topic: 'fundamentals', item: 'static_vs_dynamic_memory', name: 'Static vs Dynamic Memory Allocation', intent };
  }
  if (q.includes('self-referential') || q.includes('self referential') || (q.includes('pointer') && (q.includes('struct') || q.includes('structures')))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'introduction', name: 'Pointers and Self-Referential Structures', intent };
  }
  if (q.includes('asymptotic') || q.includes('big o') || q.includes('big omega') || q.includes('big theta') || (q.includes('notation') && (q.includes('complexity') || q.includes('ds') || q.includes('time')))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'asymptotic_notations', name: 'Asymptotic Notations', intent };
  }
  if (q.includes('malloc') || q.includes('calloc') || q.includes('realloc') || ((q.includes('static') || q.includes('dynamic') || q.includes('heap') || q.includes('free')) && (q.includes('memory') || q.includes('allocation') || q.includes('pointer')))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'static_vs_dynamic_memory', name: 'Static vs Dynamic Memory Allocation', intent };
  }
  if (q.includes('primitive') || q.includes('non primitive') || q.includes('non-primitive')) {
    return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'introduction', name: 'Primitive vs Non-Primitive Data Structures', intent };
  }
  if (q.includes('linear vs non linear') || (q.includes('linear') && q.includes('non linear')) || (q.includes('linear') && q.includes('non-linear'))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'linear_vs_non_linear', name: 'Linear vs Non-Linear Structures', intent };
  }
  if (q.includes('what is data structure') || q.includes('what is a data structure') || q.includes('introduction to data structure') || q.includes('types of data structures') || q.includes('data structure fundamentals') || (q.includes('data structure') && q.includes('definition'))) {
    return { isDSQuery: true, confidence: 0.95, topic: 'fundamentals', item: 'introduction', name: 'Introduction to Data Structures', intent };
  }

  // General Complexity fallback
  if (q.includes('complexity') || q.includes('time complexity') || q.includes('space complexity')) {
    return { isDSQuery: true, confidence: 0.85, topic: 'fundamentals', item: 'asymptotic_notations', name: 'Complexity Reference', intent };
  }

  return { isDSQuery: false, confidence: 0.1 };
}

/**
 * Resolves contextual follow-up questions referencing previous conversation turns.
 */
function resolveFollowUp(query, lastTopic) {
  if (!lastTopic || !lastTopic.topic) return null;

  const norm = normalizeText(query);
  const q = correctSpelling(norm);
  const intent = detectQuestionIntent(q);

  let op = null;
  if (q.includes('insert') || q.includes('add') || q.includes('push') || q.includes('enqueue')) op = 'insert';
  else if (q.includes('delete') || q.includes('remove') || q.includes('pop') || q.includes('dequeue')) op = 'delete';
  else if (q.includes('reverse') || q.includes('invert')) op = 'reverse';
  else if (q.includes('search') || q.includes('find')) op = 'search';
  else if (q.includes('display') || q.includes('traverse') || q.includes('print')) op = 'traverse';
  else if (q.includes('height') || q.includes('depth')) op = 'height';
  else if (q.includes('leaf') || q.includes('leaves')) op = 'leaf';

  let type = 'general';
  if (q.includes('why') && (q.includes('condition') || q.includes('formula') || q.includes('used') || q.includes('this'))) {
    type = 'why_condition';
  } else if (q.includes('explain this line') || (q.includes('line') && (q.includes('code') || q.includes('c')))) {
    type = 'explain_line';
  } else if (q.includes('dry run') || q.includes('trace') || q.includes('different input')) {
    type = 'dry_run';
  } else if (q.includes('empty') || q.includes('underflow')) {
    type = 'empty_check';
  } else if (q.includes('simpler') || q.includes('short code') || q.includes('minimal')) {
    type = 'simpler_code';
  }

  const isShortFollowUp = q.length < 50 ||
    q.startsWith('how to') ||
    q.startsWith('how do i') ||
    q.startsWith('give me') ||
    q.startsWith('show me') ||
    q.startsWith('write a') ||
    q.startsWith('what about') ||
    q.includes('the program') ||
    q.includes('the code') ||
    q.includes('the logic') ||
    q.includes('dry run') ||
    q.includes('time complexity') ||
    q.includes('why') ||
    q.includes('explain');

  if (isShortFollowUp || op || type !== 'general' || intent !== 'explanation') {
    return {
      isFollowUp: true,
      type: type,
      topic: lastTopic.topic,
      item: lastTopic.item,
      operation: op,
      intent: intent,
      lastTopicName: lastTopic.name
    };
  }

  return null;
}

module.exports = {
  SPELLING_CORRECTIONS,
  SYNONYM_MAP,
  normalizeText,
  correctSpelling,
  levenshtein,
  detectQuestionIntent,
  classifyDSQuery,
  resolveFollowUp
};
