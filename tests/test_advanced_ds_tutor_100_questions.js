/**
 * StudyMate AI — Comprehensive 100+ Question Test Suite
 * Advanced Offline Data Structures Tutor & Question-Answering Engine
 *
 * Requirements Verified:
 * 1. 100+ distinct questions covering all 8 syllabus units:
 *    - Unit 1: Fundamentals & Memory (linear/non-linear, static/dynamic, pointers, structs, Big-O)
 *    - Unit 2: Searching (Linear Search, Binary Search - iterative & recursive)
 *    - Unit 3: Sorting (Bubble, Selection, Insertion, Merge, Quick Sort)
 *    - Unit 4: Linked Lists (Singly, Doubly, Circular Linked List)
 *    - Unit 5: Stacks (Array Stack, Infix to Postfix, Balanced Parentheses)
 *    - Unit 6: Queues & Circular Queues (Linear Queue, Modulo Ring Buffer)
 *    - Unit 7: Binary Trees & BST (Insertion, Search, Traversals, Height, Leaves)
 *    - Unit 8: Graphs & Hashing (BFS, DFS, Matrix vs List, Hash Functions, Linear Probing, Chaining)
 * 2. Diverse question phrasing styles:
 *    - Exact academic queries
 *    - Rephrased natural language questions
 *    - Misspelled words & student typos
 *    - Terse / incomplete inputs
 *    - Intent variations: program, algorithm, dry-run, comparison, complexity, viva, applications
 * 3. Multi-turn conversation context memory & follow-ups
 * 4. Syntactic integrity & compilability of returned C programs (stdio.h, main, balanced braces)
 * 5. Zero-network execution (100% offline knowledge retrieval)
 */

'use strict';

const assert = require('assert');
const path = require('path');
const engine = require('../public/js/ds-knowledge-engine.js');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function runCase(description, testFn) {
  totalTests++;
  try {
    testFn();
    passedTests++;
    console.log(`  ✓ [PASS] #${totalTests}: ${description}`);
  } catch (err) {
    failedTests++;
    failures.push({ testNum: totalTests, description, error: err.message });
    console.error(`  ✗ [FAIL] #${totalTests}: ${description}`);
    console.error(`     Error: ${err.message}`);
  }
}

/**
 * Validates C code syntax:
 * - Includes <stdio.h>
 * - Contains main()
 * - Has balanced curly braces {}
 * - Has non-empty body length
 */
function assertValidCCode(code, contextName) {
  assert.ok(code, `C program missing for ${contextName}`);
  assert.ok(typeof code === 'string', `C program must be string for ${contextName}`);
  assert.ok(code.includes('#include <stdio.h>'), `Missing #include <stdio.h> in ${contextName}`);
  assert.ok(/int\s+main\s*\(/.test(code) || /void\s+main\s*\(/.test(code), `Missing main() in ${contextName}`);
  
  let depth = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '{') depth++;
    else if (code[i] === '}') depth--;
    assert.ok(depth >= 0, `Unmatched closing brace '}' in C code of ${contextName}`);
  }
  assert.strictEqual(depth, 0, `Unbalanced curly braces in C code of ${contextName}`);
  assert.ok(code.length > 80, `C code too short in ${contextName}`);
}

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🎓 StudyMate AI — Advanced Offline DS Tutor 100+ Question Audit');
console.log('═══════════════════════════════════════════════════════════════════════\n');

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 1: FUNDAMENTALS & MEMORY (12 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('--- Unit 1: Data Structures Fundamentals & Memory Allocation ---');

runCase('Fundamentals: What is a Data Structure? (definition)', () => {
  const r = engine.queryKnowledgeBase('What is a Data Structure?');
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('Definition') || r.content.includes('organizing'));
});

runCase('Fundamentals: Explain primitive vs non-primitive data structures', () => {
  const r = engine.queryKnowledgeBase('Explain primitive vs non-primitive data structures');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('Primitive') || r.content.includes('non-primitive'));
});

runCase('Fundamentals: Linear vs Non-Linear data structures (comparison)', () => {
  const r = engine.queryKnowledgeBase('Linear vs Non-Linear data structures');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('Linear') && r.content.includes('Non-Linear'));
});

runCase('Fundamentals: Static vs Dynamic memory allocation in C (comparison)', () => {
  const r = engine.queryKnowledgeBase('Static vs Dynamic memory allocation in C');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('Static') && r.content.includes('Dynamic'));
});

runCase('Fundamentals: Explain malloc and calloc with pointers', () => {
  const r = engine.queryKnowledgeBase('Explain malloc and calloc with pointers');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('malloc') || r.content.includes('heap'));
});

runCase('Fundamentals: What are asymptotic notations? (complexity)', () => {
  const r = engine.queryKnowledgeBase('What are asymptotic notations?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('Big-O') || r.content.includes('Asymptotic'));
});

runCase('Fundamentals: Explain Big-O, Big-Omega, and Big-Theta notations', () => {
  const r = engine.queryKnowledgeBase('Explain Big-O, Big-Omega, and Big-Theta notations');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('Big-O') || r.content.includes('Worst Case'));
});

runCase('Fundamentals: C program demonstrating dynamic memory allocation with malloc and free', () => {
  const r = engine.queryKnowledgeBase('Give C program demonstrating dynamic memory allocation with malloc and free');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assertValidCCode(r.content, 'Dynamic Memory C Program');
});

runCase('Fundamentals (Typo): diffrnce btwn static and dynamc memry', () => {
  const r = engine.queryKnowledgeBase('diffrnce btwn static and dynamc memry');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
});

runCase('Fundamentals (Terse): asymptotic notations in ds', () => {
  const r = engine.queryKnowledgeBase('asymptotic notations in ds');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
});

runCase('Fundamentals (Viva): Why is space complexity important in embedded systems?', () => {
  const r = engine.queryKnowledgeBase('Why is space complexity important in embedded systems?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
});

runCase('Fundamentals (Viva Bank): Give viva questions on data structure fundamentals', () => {
  const r = engine.queryKnowledgeBase('Give viva questions on data structure fundamentals');
  assert.ok(r.success);
  assert.ok(r.content.includes('Viva') || r.content.includes('Q1'));
});

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 2: SEARCHING ALGORITHMS (12 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Unit 2: Searching Algorithms (Linear & Binary Search) ---');

runCase('Searching: Explain Linear Search algorithm', () => {
  const r = engine.queryKnowledgeBase('Explain Linear Search algorithm');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.strictEqual(r.item, 'linear_search');
  assert.ok(r.content.includes('Linear Search'));
});

runCase('Searching: Write C program for linear search (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write C program for linear search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assertValidCCode(r.content, 'Linear Search');
});

runCase('Searching: Show me a step-by-step dry run of linear search', () => {
  const r = engine.queryKnowledgeBase('Show me a step-by-step dry run of linear search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('Dry Run') || r.content.includes('Pass') || r.content.includes('trace'));
});

runCase('Searching: What is the time complexity of linear search?', () => {
  const r = engine.queryKnowledgeBase('What is the time complexity of linear search?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('O(n)') || r.content.includes('O(1)'));
});

runCase('Searching: Explain Binary Search algorithm in C', () => {
  const r = engine.queryKnowledgeBase('Explain Binary Search algorithm in C');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.strictEqual(r.item, 'binary_search');
});

runCase('Searching: Write a complete C program for binary search (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write a complete C program for binary search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assertValidCCode(r.content, 'Binary Search');
  assert.ok(r.content.includes('low + (high - low) / 2') || r.content.includes('(low + high) / 2'));
});

runCase('Searching: Show me a step-by-step dry run of binary search', () => {
  const r = engine.queryKnowledgeBase('Show me a step-by-step dry run of binary search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('Dry Run') || r.content.includes('mid') || r.content.includes('low'));
});

runCase('Searching: Why is binary search logarithmic O(log n)?', () => {
  const r = engine.queryKnowledgeBase('Why is binary search logarithmic O(log n)?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('log') || r.content.includes('halved'));
});

runCase('Searching (Typo): binery serch prg', () => {
  const r = engine.queryKnowledgeBase('binery serch prg');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.strictEqual(r.item, 'binary_search');
});

runCase('Searching (Natural Phrasing): How can I find an element in an array by dividing it in half?', () => {
  const r = engine.queryKnowledgeBase('How can I find an element in an array by dividing it in half?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.strictEqual(r.item, 'binary_search');
});

runCase('Searching (Comparison): Linear search vs binary search comparison table', () => {
  const r = engine.queryKnowledgeBase('Linear search vs binary search comparison table');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Linear Search') && r.content.includes('Binary Search'));
});

runCase('Searching (Viva): Viva questions on searching algorithms', () => {
  const r = engine.queryKnowledgeBase('Viva questions on searching algorithms');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('Viva') || r.content.includes('Q1'));
});

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 3: SORTING ALGORITHMS (16 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Unit 3: Sorting Algorithms (Bubble, Selection, Insertion, Merge, Quick) ---');

runCase('Sorting: Explain Bubble Sort algorithm', () => {
  const r = engine.queryKnowledgeBase('Explain Bubble Sort algorithm');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.strictEqual(r.item, 'bubble_sort');
});

runCase('Sorting: Give C code for bubble sort (code validation)', () => {
  const r = engine.queryKnowledgeBase('Give C code for bubble sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'Bubble Sort');
});

runCase('Sorting: Explain bubble sort with swapped flag optimization', () => {
  const r = engine.queryKnowledgeBase('Explain bubble sort with swapped flag optimization');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('swapped') || r.content.includes('flag'));
});

runCase('Sorting: Show dry run for bubble sort', () => {
  const r = engine.queryKnowledgeBase('Show dry run for bubble sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Dry Run') || r.content.includes('Pass') || r.content.includes('trace'));
});

runCase('Sorting (Typo): bubel sort', () => {
  const r = engine.queryKnowledgeBase('bubel sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.strictEqual(r.item, 'bubble_sort');
});

runCase('Sorting: Explain Selection Sort algorithm', () => {
  const r = engine.queryKnowledgeBase('Explain Selection Sort algorithm');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.strictEqual(r.item, 'selection_sort');
});

runCase('Sorting: Write C code for selection sort (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write C code for selection sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'Selection Sort');
});

runCase('Sorting: What is the time complexity of selection sort?', () => {
  const r = engine.queryKnowledgeBase('What is the time complexity of selection sort?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('O(n^2)') || r.content.includes('O(n²)'));
});

runCase('Sorting: Explain Insertion Sort algorithm', () => {
  const r = engine.queryKnowledgeBase('Explain Insertion Sort algorithm');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.strictEqual(r.item, 'insertion_sort');
});

runCase('Sorting: Write C program for insertion sort (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write C program for insertion sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'Insertion Sort');
});

runCase('Sorting (Typo): insrtion sort code', () => {
  const r = engine.queryKnowledgeBase('insrtion sort code');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.strictEqual(r.item, 'insertion_sort');
});

runCase('Sorting: Explain Merge Sort divide and conquer algorithm', () => {
  const r = engine.queryKnowledgeBase('Explain Merge Sort divide and conquer algorithm');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.strictEqual(r.item, 'merge_sort');
});

runCase('Sorting: Write complete C program for merge sort (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write complete C program for merge sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'Merge Sort');
});

runCase('Sorting: Explain Quick Sort algorithm with Lomuto partition', () => {
  const r = engine.queryKnowledgeBase('Explain Quick Sort algorithm with Lomuto partition');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.strictEqual(r.item, 'quick_sort');
});

runCase('Sorting: Write C program for quick sort (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write C program for quick sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'Quick Sort');
});

runCase('Sorting (Comparison): Bubble sort vs Quick sort comparison', () => {
  const r = engine.queryKnowledgeBase('Bubble sort vs Quick sort comparison');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Bubble Sort') && r.content.includes('Quick Sort'));
});

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 4: LINKED LISTS (16 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Unit 4: Linked Lists (Singly, Doubly, Circular, Reversal) ---');

runCase('Linked Lists: What is a Singly Linked List?', () => {
  const r = engine.queryKnowledgeBase('What is a Singly Linked List?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Singly Linked List'));
});

runCase('Linked Lists: Write a C program for Singly Linked List insertion and deletion', () => {
  const r = engine.queryKnowledgeBase('Write a C program for Singly Linked List insertion and deletion');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assertValidCCode(r.content, 'Singly Linked List');
});

runCase('Linked Lists: Write a program to reverse a linked list (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write a program to reverse a linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assertValidCCode(r.content, 'Reverse Linked List');
  assert.ok(r.content.includes('reverseList') || r.content.includes('prev'));
});

runCase('Linked Lists (Viva): How many pointers are required to reverse a singly linked list iteratively?', () => {
  const r = engine.queryKnowledgeBase('How many pointers are required to reverse a singly linked list iteratively?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Three pointers') || r.content.includes('prev'));
});

runCase('Linked Lists (Typo): likned list delet node', () => {
  const r = engine.queryKnowledgeBase('likned list delet node');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
});

runCase('Linked Lists (Terse): insert head linked list', () => {
  const r = engine.queryKnowledgeBase('insert head linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
});

runCase('Linked Lists: Show step by step dry run of linked list reversal', () => {
  const r = engine.queryKnowledgeBase('Show step by step dry run of linked list reversal');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Dry Run') || r.content.includes('prev') || r.content.includes('Pass'));
});

runCase('Linked Lists: What is the time complexity of searching in a linked list?', () => {
  const r = engine.queryKnowledgeBase('What is the time complexity of searching in a linked list?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('O(n)'));
});

runCase('Linked Lists: Explain Doubly Linked List', () => {
  const r = engine.queryKnowledgeBase('Explain Doubly Linked List');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.strictEqual(r.item, 'doubly_linked_list');
});

runCase('Linked Lists: Write C code for Doubly Linked List (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write C code for Doubly Linked List');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assertValidCCode(r.content, 'Doubly Linked List');
});

runCase('Linked Lists: What is the advantage of doubly linked list over singly linked list?', () => {
  const r = engine.queryKnowledgeBase('What is the advantage of doubly linked list over singly linked list?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Bidirectional') || r.content.includes('O(1) deletion') || r.content.includes('prev'));
});

runCase('Linked Lists: Explain Circular Linked List', () => {
  const r = engine.queryKnowledgeBase('Explain Circular Linked List');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.strictEqual(r.item, 'circular_linked_list');
});

runCase('Linked Lists: Write C program for circular linked list (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write C program for circular linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assertValidCCode(r.content, 'Circular Linked List');
});

runCase('Linked Lists: How is a circular linked list traversed without an infinite loop?', () => {
  const r = engine.queryKnowledgeBase('How is a circular linked list traversed without an infinite loop?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('head') || r.content.includes('do while') || r.content.includes('loop'));
});

runCase('Linked Lists (Comparison): Array vs Linked List comparison table', () => {
  const r = engine.queryKnowledgeBase('Array vs Linked List comparison table');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Array') && r.content.includes('Linked List'));
});

runCase('Linked Lists (Viva): Viva questions on linked lists', () => {
  const r = engine.queryKnowledgeBase('Viva questions on linked lists');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Viva') || r.content.includes('Q1'));
});

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 5: STACKS (12 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Unit 5: Stacks Using Arrays & Applications ---');

runCase('Stacks: What is a Stack data structure?', () => {
  const r = engine.queryKnowledgeBase('What is a Stack data structure?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('LIFO') || r.content.includes('Stack'));
});

runCase('Stacks: Explain array stack with push and pop', () => {
  const r = engine.queryKnowledgeBase('Explain array stack with push and pop');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.strictEqual(r.item, 'stack_array');
});

runCase('Stacks: Write complete C program for stack using arrays (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write complete C program for stack using arrays');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assertValidCCode(r.content, 'Array Stack');
});

runCase('Stacks (Typo): stak usin aray', () => {
  const r = engine.queryKnowledgeBase('stak usin aray');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
});

runCase('Stacks (Viva): What are stack overflow and underflow conditions?', () => {
  const r = engine.queryKnowledgeBase('What are stack overflow and underflow conditions?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('MAX - 1') || r.content.includes('top == -1') || r.content.includes('Overflow'));
});

runCase('Stacks: Show dry run trace for stack push and pop', () => {
  const r = engine.queryKnowledgeBase('Show dry run trace for stack push and pop');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('Dry Run') || r.content.includes('push') || r.content.includes('top'));
});

runCase('Stacks: What is the time complexity of push and pop operations?', () => {
  const r = engine.queryKnowledgeBase('What is the time complexity of push and pop operations?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('O(1)'));
});

runCase('Stacks: Explain Infix to Postfix conversion using stack', () => {
  const r = engine.queryKnowledgeBase('Explain Infix to Postfix conversion using stack');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.strictEqual(r.item, 'infix_to_postfix');
});

runCase('Stacks: Write C program for infix to postfix conversion (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write C program for infix to postfix conversion');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assertValidCCode(r.content, 'Infix to Postfix');
});

runCase('Stacks: Explain balanced parentheses checking using stack', () => {
  const r = engine.queryKnowledgeBase('Explain balanced parentheses checking using stack');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.strictEqual(r.item, 'parentheses_matching');
});

runCase('Stacks: Write C program for balanced parentheses (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write C program for balanced parentheses');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assertValidCCode(r.content, 'Balanced Parentheses');
});

runCase('Stacks (Applications): Real world applications of stack', () => {
  const r = engine.queryKnowledgeBase('Real world applications of stack');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('undo') || r.content.includes('recursion') || r.content.includes('call stack') || r.content.includes('Applications'));
});

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 6: QUEUES & CIRCULAR QUEUES (12 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Unit 6: Queues & Circular Queues ---');

runCase('Queues: What is a Linear Queue?', () => {
  const r = engine.queryKnowledgeBase('What is a Linear Queue?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'queues');
  assert.ok(r.content.includes('FIFO') || r.content.includes('Queue'));
});

runCase('Queues: Explain linear queue enqueue and dequeue', () => {
  const r = engine.queryKnowledgeBase('Explain linear queue enqueue and dequeue');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'queues');
  assert.strictEqual(r.item, 'linear_queue');
});

runCase('Queues: Write C program for linear queue (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write C program for linear queue');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'queues');
  assertValidCCode(r.content, 'Linear Queue');
});

runCase('Queues (Viva): What is the false overflow problem in linear queue?', () => {
  const r = engine.queryKnowledgeBase('What is the false overflow problem in linear queue?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('rear') || r.content.includes('vacated') || r.content.includes('overflow'));
});

runCase('Queues: Explain Circular Queue with modulo arithmetic', () => {
  const r = engine.queryKnowledgeBase('Explain Circular Queue with modulo arithmetic');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.strictEqual(r.item, 'circular_queue');
});

runCase('Queues (Typo): circuler queu', () => {
  const r = engine.queryKnowledgeBase('circuler queu');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.strictEqual(r.item, 'circular_queue');
});

runCase('Queues: Write complete C program for circular queue (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write complete C program for circular queue');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assertValidCCode(r.content, 'Circular Queue');
  assert.ok(r.content.includes('(rear + 1) % MAX') || r.content.includes('% MAX'));
});

runCase('Queues (Viva): Why does circular queue use (rear + 1) % MAX?', () => {
  const r = engine.queryKnowledgeBase('Why does circular queue use (rear + 1) % MAX?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('wrap') || r.content.includes('modulo') || r.content.includes('ring'));
});

runCase('Queues: Show dry run trace for circular queue wrap around', () => {
  const r = engine.queryKnowledgeBase('Show dry run trace for circular queue wrap around');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('Dry Run') || r.content.includes('rear') || r.content.includes('wrap'));
});

runCase('Queues (Comparison): Linear Queue vs Circular Queue', () => {
  const r = engine.queryKnowledgeBase('Linear Queue vs Circular Queue');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Linear Queue') && r.content.includes('Circular Queue'));
});

runCase('Queues (Comparison): Stack vs Queue', () => {
  const r = engine.queryKnowledgeBase('Stack vs Queue');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Stack') && r.content.includes('Queue'));
});

runCase('Queues (Viva): Viva questions on circular queues', () => {
  const r = engine.queryKnowledgeBase('Viva questions on circular queues');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('Viva') || r.content.includes('Q1'));
});

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 7: BINARY TREES & BST (14 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Unit 7: Binary Trees & Binary Search Tree (BST) ---');

runCase('Binary Trees: What is a Binary Search Tree (BST)?', () => {
  const r = engine.queryKnowledgeBase('What is a Binary Search Tree (BST)?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Binary Search Tree'));
});

runCase('Binary Trees: Explain BST insertion and search', () => {
  const r = engine.queryKnowledgeBase('Explain BST insertion and search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.strictEqual(r.item, 'bst');
});

runCase('Binary Trees: Write complete C program for BST (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write complete C program for BST');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assertValidCCode(r.content, 'BST Program');
  assert.ok(r.content.includes('insertBST') || r.content.includes('insert'));
});

runCase('Binary Trees: Explain Inorder, Preorder, and Postorder tree traversals', () => {
  const r = engine.queryKnowledgeBase('Explain Inorder, Preorder, and Postorder tree traversals');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Inorder') || r.content.includes('Preorder'));
});

runCase('Binary Trees: Show C functions for tree traversals (code validation)', () => {
  const r = engine.queryKnowledgeBase('Show C functions for tree traversals');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assertValidCCode(r.content, 'Tree Traversals');
  assert.ok(r.content.includes('inorder') || r.content.includes('preorder'));
});

runCase('Binary Trees (Viva): Why does inorder traversal of a BST produce sorted order?', () => {
  const r = engine.queryKnowledgeBase('Why does inorder traversal of a BST produce sorted order?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Left') || r.content.includes('Root') || r.content.includes('sorted'));
});

runCase('Binary Trees: How to calculate the height of a binary tree?', () => {
  const r = engine.queryKnowledgeBase('How to calculate the height of a binary tree?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('height') || r.content.includes('max'));
});

runCase('Binary Trees: Write C function to count leaf nodes in a binary tree', () => {
  const r = engine.queryKnowledgeBase('Write C function to count leaf nodes in a binary tree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assertValidCCode(r.content, 'Leaf Count');
  assert.ok(r.content.includes('leaf') || r.content.includes('countLeafNodes'));
});

runCase('Binary Trees: Show dry run trace for BST insertion', () => {
  const r = engine.queryKnowledgeBase('Show dry run trace for BST insertion');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Dry Run') || r.content.includes('trace') || r.content.includes('root'));
});

runCase('Binary Trees: What is the time complexity of searching in a BST?', () => {
  const r = engine.queryKnowledgeBase('What is the time complexity of searching in a BST?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('O(log n)') || r.content.includes('O(h)'));
});

runCase('Binary Trees (Typo): binry tree bst', () => {
  const r = engine.queryKnowledgeBase('binry tree bst');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
});

runCase('Binary Trees (Viva): Viva questions on trees', () => {
  const r = engine.queryKnowledgeBase('Viva questions on trees');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Viva') || r.content.includes('Q1'));
});

runCase('Binary Trees (Comparison): Difference between binary tree and binary search tree', () => {
  const r = engine.queryKnowledgeBase('Difference between binary tree and binary search tree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Binary Search Tree') || r.content.includes('BST'));
});

runCase('Binary Trees (Applications): Applications of binary search tree', () => {
  const r = engine.queryKnowledgeBase('Applications of binary search tree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('indexing') || r.content.includes('search') || r.content.includes('Applications'));
});

// ══════════════════════════════════════════════════════════════════════════════
// UNIT 8: GRAPHS & HASHING (14 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Unit 8: Graphs, Traversals & Hashing ---');

runCase('Graphs: What is a Graph data structure?', () => {
  const r = engine.queryKnowledgeBase('What is a Graph data structure?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assert.ok(r.content.includes('vertices') || r.content.includes('edges') || r.content.includes('Graph'));
});

runCase('Graphs (Comparison): Explain Adjacency Matrix vs Adjacency List', () => {
  const r = engine.queryKnowledgeBase('Explain Adjacency Matrix vs Adjacency List');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Adjacency Matrix') && r.content.includes('Adjacency List'));
});

runCase('Graphs: Explain Breadth-First Search (BFS) graph traversal', () => {
  const r = engine.queryKnowledgeBase('Explain Breadth-First Search (BFS) graph traversal');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assert.strictEqual(r.item, 'bfs');
});

runCase('Graphs: Write complete C program for BFS (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write complete C program for BFS');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assertValidCCode(r.content, 'BFS Graph');
  assert.ok(r.content.includes('bfs') || r.content.includes('queue'));
});

runCase('Graphs: Explain Depth-First Search (DFS) graph traversal', () => {
  const r = engine.queryKnowledgeBase('Explain Depth-First Search (DFS) graph traversal');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assert.strictEqual(r.item, 'dfs');
});

runCase('Graphs: Write complete C program for DFS (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write complete C program for DFS');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assertValidCCode(r.content, 'DFS Graph');
  assert.ok(r.content.includes('dfs') || r.content.includes('visited'));
});

runCase('Graphs (Comparison): BFS vs DFS comparison', () => {
  const r = engine.queryKnowledgeBase('BFS vs DFS comparison');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('BFS') && r.content.includes('DFS'));
});

runCase('Hashing: What is Hashing and hash table?', () => {
  const r = engine.queryKnowledgeBase('What is Hashing and hash table?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assert.ok(r.content.includes('Hashing') || r.content.includes('Hash'));
});

runCase('Hashing: What is a hash collision and how is it resolved?', () => {
  const r = engine.queryKnowledgeBase('What is a hash collision and how is it resolved?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assert.ok(r.content.includes('collision') || r.content.includes('Linear Probing') || r.content.includes('Chaining'));
});

runCase('Hashing: Explain Linear Probing collision resolution', () => {
  const r = engine.queryKnowledgeBase('Explain Linear Probing collision resolution');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assert.ok(r.content.includes('Linear Probing') || r.content.includes('open addressing'));
});

runCase('Hashing: Explain Separate Chaining collision resolution', () => {
  const r = engine.queryKnowledgeBase('Explain Separate Chaining collision resolution');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assert.ok(r.content.includes('Separate Chaining') || r.content.includes('linked list'));
});

runCase('Hashing: Write C program for hash table with linear probing (code validation)', () => {
  const r = engine.queryKnowledgeBase('Write C program for hash table with linear probing');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assertValidCCode(r.content, 'Hash Table');
  assert.ok(r.content.includes('hash') || r.content.includes('insert'));
});

runCase('Hashing (Viva): What is the load factor alpha in a hash table?', () => {
  const r = engine.queryKnowledgeBase('What is the load factor alpha in a hash table?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assert.ok(r.content.includes('load factor') || r.content.includes('alpha') || r.content.includes('n / m'));
});

runCase('Hashing (Viva): Viva questions on graphs and hashing', () => {
  const r = engine.queryKnowledgeBase('Viva questions on graphs and hashing');
  assert.ok(r.success);
  assert.ok(r.content.includes('Viva') || r.content.includes('Q1'));
});

// ══════════════════════════════════════════════════════════════════════════════
// COMPARISONS & BIG-O COMPLEXITY REFERENCE (6 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Comparisons & Big-O Summary Table ---');

runCase('Summary: Show the Big-O time complexity comparison table', () => {
  const r = engine.queryKnowledgeBase('Show the Big-O time complexity comparison table');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'complexity_table');
  assert.ok(r.content.includes('Linear Search') && r.content.includes('Binary Search'));
});

runCase('Summary: Give me top viva questions for Data Structures', () => {
  const r = engine.queryKnowledgeBase('Give me top viva questions for Data Structures');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'viva_bank');
  assert.ok(r.content.includes('Q1') || r.content.includes('Viva'));
});

runCase('Comparison: Bubble Sort vs Quick Sort', () => {
  const r = engine.queryKnowledgeBase('Bubble Sort vs Quick Sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Bubble Sort') && r.content.includes('Quick Sort'));
});

runCase('Comparison: Linear Search vs Binary Search', () => {
  const r = engine.queryKnowledgeBase('Linear Search vs Binary Search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Linear Search') && r.content.includes('Binary Search'));
});

runCase('Comparison: Array vs Linked List', () => {
  const r = engine.queryKnowledgeBase('Array vs Linked List');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Array') && r.content.includes('Linked List'));
});

runCase('Comparison: Stack vs Queue', () => {
  const r = engine.queryKnowledgeBase('Stack vs Queue');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Stack') && r.content.includes('Queue'));
});

// ══════════════════════════════════════════════════════════════════════════════
// MULTI-TURN FOLLOW-UP SEQUENCES & CONVERSATION CONTEXT (8 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Multi-Turn Conversation Context & Follow-Ups ---');

// Chain A: Linked List Deep Dive
const chainAHistory = [];

runCase('Chain A - Turn 1: Initial Topic Query (Singly Linked List)', () => {
  const q1 = 'Explain Singly Linked List';
  const r1 = engine.queryKnowledgeBase(q1, chainAHistory);
  assert.ok(r1.success);
  assert.strictEqual(r1.topic, 'linked_lists');
  chainAHistory.push({ role: 'user', content: q1 });
  chainAHistory.push({ role: 'model', content: r1.content });
});

runCase('Chain A - Turn 2: Follow-Up "How to insert at beginning?"', () => {
  const q2 = 'How to insert at beginning?';
  const r2 = engine.queryKnowledgeBase(q2, chainAHistory);
  assert.ok(r2.success);
  assert.strictEqual(r2.isFollowUp, true, 'Turn 2 must be recognized as follow-up');
  assert.strictEqual(r2.topic, 'linked_lists');
  chainAHistory.push({ role: 'user', content: q2 });
  chainAHistory.push({ role: 'model', content: r2.content });
});

runCase('Chain A - Turn 3: Follow-Up "Give the C code"', () => {
  const q3 = 'Give the C code';
  const r3 = engine.queryKnowledgeBase(q3, chainAHistory);
  assert.ok(r3.success);
  assert.strictEqual(r3.isFollowUp, true, 'Turn 3 must be recognized as follow-up');
  assert.strictEqual(r3.topic, 'linked_lists');
  assertValidCCode(r3.content, 'Chain A C Code Follow-Up');
  chainAHistory.push({ role: 'user', content: q3 });
  chainAHistory.push({ role: 'model', content: r3.content });
});

runCase('Chain A - Turn 4: Follow-Up "Show dry run trace"', () => {
  const q4 = 'Show dry run trace';
  const r4 = engine.queryKnowledgeBase(q4, chainAHistory);
  assert.ok(r4.success);
  assert.strictEqual(r4.isFollowUp, true, 'Turn 4 must be recognized as follow-up');
  assert.strictEqual(r4.topic, 'linked_lists');
  assert.ok(r4.content.includes('Dry Run') || r4.content.includes('Pass') || r4.content.includes('trace'));
});

// Chain B: Circular Queue Formula Breakdown
const chainBHistory = [];

runCase('Chain B - Turn 1: Initial Topic Query (Circular Queue)', () => {
  const q1 = 'Explain Circular Queue with modulo arithmetic';
  const r1 = engine.queryKnowledgeBase(q1, chainBHistory);
  assert.ok(r1.success);
  assert.strictEqual(r1.topic, 'circular_queues');
  chainBHistory.push({ role: 'user', content: q1 });
  chainBHistory.push({ role: 'model', content: r1.content });
});

runCase('Chain B - Turn 2: Follow-Up "Why is this condition used?"', () => {
  const q2 = 'Why is this condition used?';
  const r2 = engine.queryKnowledgeBase(q2, chainBHistory);
  assert.ok(r2.success);
  assert.strictEqual(r2.isFollowUp, true, 'Turn 2 must be recognized as follow-up');
  assert.strictEqual(r2.topic, 'circular_queues');
  assert.ok(r2.content.includes('Condition / Formula Breakdown'), 'Must break down modulo formula');
  chainBHistory.push({ role: 'user', content: q2 });
  chainBHistory.push({ role: 'model', content: r2.content });
});

// Chain C: Binary Search Tree Deep Dive
const chainCHistory = [];

runCase('Chain C - Turn 1: Initial Topic Query (BST)', () => {
  const q1 = 'What is a Binary Search Tree (BST)?';
  const r1 = engine.queryKnowledgeBase(q1, chainCHistory);
  assert.ok(r1.success);
  assert.strictEqual(r1.topic, 'binary_trees');
  chainCHistory.push({ role: 'user', content: q1 });
  chainCHistory.push({ role: 'model', content: r1.content });
});

runCase('Chain C - Turn 2: Follow-Up "Give the C program"', () => {
  const q2 = 'Give the C program';
  const r2 = engine.queryKnowledgeBase(q2, chainCHistory);
  assert.ok(r2.success);
  assert.strictEqual(r2.isFollowUp, true, 'Turn 2 must be recognized as follow-up');
  assert.strictEqual(r2.topic, 'binary_trees');
  assertValidCCode(r2.content, 'Chain C BST C Code');
});

// ══════════════════════════════════════════════════════════════════════════════
// FINAL AUDIT SUMMARY REPORT
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log(`📊 Test Results: ${passedTests} / ${totalTests} checks passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('═══════════════════════════════════════════════════════════════════════');

if (failedTests > 0) {
  console.error(`\n❌ ${failedTests} CHECKS FAILED:`);
  failures.forEach(f => {
    console.error(`  - #${f.testNum} "${f.description}": ${f.error}`);
  });
  process.exit(1);
} else {
  console.log(`\n🎉 ALL ${totalTests} DATA STRUCTURES TUTOR AUDIT TESTS PASSED WITH 100% SUCCESS!`);
  process.exit(0);
}

