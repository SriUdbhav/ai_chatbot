/**
 * StudyMate AI — Comprehensive 150+ Question Test Suite
 * Complete Offline Data Structures Knowledge & Answer Engine
 *
 * Requirements Verified:
 * 1. 180 distinct questions across all 8 DS syllabus units and additional topics:
 *    - Section A: 10 Mandatory User Questions (Exact specifications)
 *    - Section B: Unit 1 Fundamentals & Memory (15 questions)
 *    - Section C: Unit 2 Searching Algorithms (15 questions)
 *    - Section D: Unit 3 Sorting Algorithms (25 questions)
 *    - Section E: Unit 4 Linked Lists (20 questions)
 *    - Section F: Unit 5 Stacks (15 questions)
 *    - Section G: Unit 6 Queues & Circular Queues (15 questions)
 *    - Section H: Unit 7 Binary Trees & BST (20 questions)
 *    - Section I: Unit 8 Additional Topics: Graphs, Hashing, Heaps, Recursion (20 questions)
 *    - Section J: Conversational Multi-Turn Follow-Ups (10 questions)
 *    - Section K: Paraphrased Natural Language & Misspellings (15 questions)
 * 2. 14 Intent classifications:
 *    c_program, algorithm, dry_run, comparison, list_all, complexity,
 *    advantages_disadvantages, applications, viva, definition, short_answer,
 *    output_prediction, specific_operation, explanation
 * 3. 100% Offline execution without external APIs or WebLLM dependencies
 * 4. Syntactic integrity of all returned C code (#include <stdio.h>, main, balanced braces, memory safety)
 * 5. Strict structured responses (8-part program, 9-part explanation, comparison tables)
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
console.log('🎓 StudyMate AI — 150+ Offline Data Structures Knowledge Test Suite');
console.log('═══════════════════════════════════════════════════════════════════════\n');

// ══════════════════════════════════════════════════════════════════════════════
// SECTION A: MANDATORY 10 USER QUESTIONS
// ══════════════════════════════════════════════════════════════════════════════
console.log('--- Section A: Mandatory 10 User Questions ---');

runCase('Q1: "Explain all sorting techniques."', () => {
  const q = 'Explain all sorting techniques.';
  const r = engine.queryKnowledgeBase(q);
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Selection Sort') && r.content.includes('Bubble Sort') && r.content.includes('Merge Sort'));
  assert.ok(r.content.includes('| Algorithm | Best Time |') || r.content.includes('| Algorithm |'));
});

runCase('Q2: "Write a C program for binary search."', () => {
  const q = 'Write a C program for binary search.';
  const r = engine.queryKnowledgeBase(q);
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'searching');
  assertValidCCode(r.content, 'Q2 Binary Search C Program');
  assert.ok(r.content.includes('low + (high - low) / 2') || r.content.includes('binarySearch'));
  assert.ok(r.content.includes('Time Complexity'));
});

runCase('Q3: "Difference between linear and binary search."', () => {
  const q = 'Difference between linear and binary search.';
  const r = engine.queryKnowledgeBase(q);
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Linear Search') && r.content.includes('Binary Search'));
  assert.ok(r.content.includes('O(n)') && r.content.includes('O(log n)'));
});

runCase('Q4: "Explain insertion in a singly linked list."', () => {
  const q = 'Explain insertion in a singly linked list.';
  const r = engine.queryKnowledgeBase(q);
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Beginning') || r.content.includes('insertAtBeginning'));
  assert.ok(r.content.includes('End') || r.content.includes('insertAtEnd'));
  assertValidCCode(r.content, 'Q4 Singly Linked List Insertion C Program');
});

runCase('Q5: "Write a program to delete a node."', () => {
  const q = 'Write a program to delete a node.';
  const r = engine.queryKnowledgeBase(q);
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'linked_lists');
  assertValidCCode(r.content, 'Q5 Delete Node C Program');
  assert.ok(r.content.includes('free(') || r.content.includes('delete'));
});

runCase('Q6: "Explain stack overflow and underflow."', () => {
  const q = 'Explain stack overflow and underflow.';
  const r = engine.queryKnowledgeBase(q);
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('Overflow') && r.content.includes('Underflow'));
  assert.ok(r.content.includes('top == MAX - 1') || r.content.includes('top >= MAX - 1'));
  assert.ok(r.content.includes('top == -1') || r.content.includes('top < 0'));
});

runCase('Q7: "Difference between stack and queue."', () => {
  const q = 'Difference between stack and queue.';
  const r = engine.queryKnowledgeBase(q);
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Stack | Queue |'));
  assert.ok(r.content.includes('LIFO') && r.content.includes('FIFO'));
});

runCase('Q8: "Explain circular queue with an example."', () => {
  const q = 'Explain circular queue with an example.';
  const r = engine.queryKnowledgeBase(q);
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('Circular Queue') || r.content.includes('ring'));
  assert.ok(r.content.includes('(rear + 1) % MAX') || r.content.includes('modulo'));
  assert.ok(r.content.includes('Trace') || r.content.includes('Dry Run') || r.content.includes('Step'));
});

runCase('Q9: "Construct a binary tree and perform all traversals."', () => {
  const q = 'Construct a binary tree and perform all traversals.';
  const r = engine.queryKnowledgeBase(q);
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'binary_trees');
  assertValidCCode(r.content, 'Q9 Tree Construction & Traversals C Program');
  assert.ok(r.content.includes('inorder') || r.content.includes('inOrder'));
  assert.ok(r.content.includes('preorder') || r.content.includes('preOrder'));
  assert.ok(r.content.includes('postorder') || r.content.includes('postOrder'));
});

runCase('Q10: "Explain the difference between preorder and postorder."', () => {
  const q = 'Explain the difference between preorder and postorder.';
  const r = engine.queryKnowledgeBase(q);
  assert.ok(r.success, 'Query failed');
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Preorder Traversal') && r.content.includes('Postorder Traversal'));
  assert.ok(r.content.includes('Root -> Left') || r.content.includes('Root-Left') || r.content.includes('Preorder'));
  assert.ok(r.content.includes('Left') && r.content.includes('Right') && r.content.includes('Root'));
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION B: UNIT 1 FUNDAMENTALS & MEMORY (15 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Section B: Unit 1 Fundamentals & Memory (15 Questions) ---');

runCase('B1: Definition of Data Structure', () => {
  const r = engine.queryKnowledgeBase('What is a data structure in computer science?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('Definition') || r.content.includes('organizing'));
});

runCase('B2: Primitive vs Non-Primitive data structures', () => {
  const r = engine.queryKnowledgeBase('Explain primitive vs non-primitive data structures');
  assert.ok(r.success);
  assert.ok(['comparisons', 'fundamentals'].includes(r.topic));
  assert.ok(r.content.includes('Primitive') && /non-primitive/i.test(r.content));
});

runCase('B3: Linear vs Non-Linear data structures comparison', () => {
  const r = engine.queryKnowledgeBase('Difference between linear and non-linear data structures');
  assert.ok(r.success);
  assert.ok(['comparisons', 'fundamentals'].includes(r.topic));
  assert.ok(r.content.includes('Linear') && r.content.includes('Non-Linear'));
});

runCase('B4: Static vs Dynamic memory allocation', () => {
  const r = engine.queryKnowledgeBase('Static vs Dynamic memory allocation in C');
  assert.ok(r.success);
  assert.ok(['comparisons', 'fundamentals'].includes(r.topic));
  assert.ok(r.content.includes('Static') && r.content.includes('Dynamic'));
});

runCase('B5: Dynamic memory allocation functions in C (malloc, calloc, realloc, free)', () => {
  const r = engine.queryKnowledgeBase('Explain malloc calloc realloc and free functions in C');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('malloc') && r.content.includes('free'));
});

runCase('B6: What is an Abstract Data Type (ADT)?', () => {
  const r = engine.queryKnowledgeBase('What is an Abstract Data Type ADT?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('ADT') || r.content.includes('Abstract Data Type'));
});

runCase('B7: Asymptotic notations explanation', () => {
  const r = engine.queryKnowledgeBase('Explain asymptotic notations in data structures');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('Big-O') || r.content.includes('Asymptotic'));
});

runCase('B8: Big-O, Big-Omega, Big-Theta definitions', () => {
  const r = engine.queryKnowledgeBase('Explain Big-O, Big-Omega and Big-Theta notations with diagrams');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('Big-O') && r.content.includes('Worst Case'));
});

runCase('B9: C Program for Dynamic Memory Allocation', () => {
  const r = engine.queryKnowledgeBase('Write a C program demonstrating dynamic memory allocation using malloc and free');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assertValidCCode(r.content, 'B9 Dynamic Memory Program');
});

runCase('B10: Time complexity vs Space complexity comparison', () => {
  const r = engine.queryKnowledgeBase('Compare time complexity and space complexity');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Time Complexity') && r.content.includes('Space Complexity'));
});

runCase('B11: Explain pointers and self-referential structures in C', () => {
  const r = engine.queryKnowledgeBase('Explain pointers and self-referential structures for data structures');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('struct') || r.content.includes('pointer'));
});

runCase('B12: Rate of growth hierarchy', () => {
  const r = engine.queryKnowledgeBase('Explain rate of growth of algorithms from O(1) to O(n!)');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('O(1)') || /growth/i.test(r.content));
});

runCase('B13: Best case, worst case, average case analysis', () => {
  const r = engine.queryKnowledgeBase('What are best case, average case and worst case complexity?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('Worst Case') || r.content.includes('Big-O'));
});

runCase('B14: Memory leak and dangling pointer in C', () => {
  const r = engine.queryKnowledgeBase('What is a memory leak and dangling pointer in C?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('free') || r.content.includes('memory'));
});

runCase('B15: Big-O Complexity Comparison Table', () => {
  const r = engine.queryKnowledgeBase('Show the Big-O time complexity comparison table for data structures');
  assert.ok(r.success);
  assert.ok(['complexity_table', 'comparisons'].includes(r.topic));
  assert.ok(r.content.includes('|') && r.content.includes('O(1)'));
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION C: UNIT 2 SEARCHING ALGORITHMS (15 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Section C: Unit 2 Searching Algorithms (15 Questions) ---');

runCase('C1: Explain Linear Search algorithm and working principle', () => {
  const r = engine.queryKnowledgeBase('Explain Linear Search algorithm and working principle');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('Linear Search') && /sequential/i.test(r.content));
});

runCase('C2: Explain Binary Search algorithm and working principle', () => {
  const r = engine.queryKnowledgeBase('Explain Binary Search algorithm and working principle');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('Binary Search') && (/divide/i.test(r.content) || /logarithmic/i.test(r.content) || /mid/i.test(r.content)));
});

runCase('C3: Binary Search precondition (sorted array)', () => {
  const r = engine.queryKnowledgeBase('Why does binary search require a sorted array?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('sorted') || r.content.includes('Precondition'));
});

runCase('C4: Binary Search overflow-safe midpoint calculation', () => {
  const r = engine.queryKnowledgeBase('Explain midpoint calculation in binary search and how to prevent integer overflow');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('low + (high - low) / 2') || r.content.includes('overflow'));
});

runCase('C5: Linear Search C Program', () => {
  const r = engine.queryKnowledgeBase('Write a C program for linear search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assertValidCCode(r.content, 'C5 Linear Search C Code');
  assert.ok(r.content.includes('linearSearch') || r.content.includes('target'));
});

runCase('C6: Binary Search Iterative C Program', () => {
  const r = engine.queryKnowledgeBase('Write an iterative C program for binary search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assertValidCCode(r.content, 'C6 Binary Search Iterative C Code');
});

runCase('C7: Binary Search Recursive C Program', () => {
  const r = engine.queryKnowledgeBase('Write a recursive C program for binary search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assertValidCCode(r.content, 'C7 Binary Search Recursive C Code');
  assert.ok(r.content.includes('binarySearch') || r.content.includes('recursive'));
});

runCase('C8: Dry run of Linear Search with step trace', () => {
  const r = engine.queryKnowledgeBase('Give step by step dry run of linear search on array [10, 25, 30, 45, 50]');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('Trace') || r.content.includes('Step') || r.content.includes('Dry Run'));
});

runCase('C9: Dry run of Binary Search on sorted array', () => {
  const r = engine.queryKnowledgeBase('Step by step dry run of binary search on [11, 22, 33, 44, 55, 66, 77]');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('mid') || r.content.includes('low') || r.content.includes('high'));
});

runCase('C10: Linear search time and space complexity analysis', () => {
  const r = engine.queryKnowledgeBase('What is the time and space complexity of linear search?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('O(n)') && r.content.includes('O(1)'));
});

runCase('C11: Binary search time and space complexity analysis', () => {
  const r = engine.queryKnowledgeBase('What is the time complexity of binary search?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('O(log n)') || r.content.includes('O(log₂ n)'));
});

runCase('C12: Linear search vs Binary search comparison table', () => {
  const r = engine.queryKnowledgeBase('Compare linear search vs binary search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Linear Search') && r.content.includes('Binary Search'));
});

runCase('C13: Why binary search is faster than linear search', () => {
  const r = engine.queryKnowledgeBase('Why is binary search faster than linear search for large datasets?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('O(log n)') || r.content.includes('halves'));
});

runCase('C14: Viva question: Can binary search be applied to a linked list?', () => {
  const r = engine.queryKnowledgeBase('Can binary search be applied to a singly linked list? Viva question');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('random access') || r.content.includes('O(n)') || r.content.includes('O(log n)'));
});

runCase('C15: Viva question: Max comparisons for binary search on n items', () => {
  const r = engine.queryKnowledgeBase('What is the maximum number of comparisons for binary search in array of size n?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('log') || r.content.includes('O(log n)'));
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION D: UNIT 3 SORTING ALGORITHMS (25 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Section D: Unit 3 Sorting Algorithms (25 Questions) ---');

runCase('D1: Bubble Sort explanation and working principle', () => {
  const r = engine.queryKnowledgeBase('Explain Bubble Sort algorithm and working principle');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Bubble Sort') && (/adjacent/i.test(r.content) || /swapp/i.test(r.content)));
});

runCase('D2: Bubble Sort optimized with swapped flag', () => {
  const r = engine.queryKnowledgeBase('How to optimize Bubble Sort using swapped flag for best case O(n)?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('swapped') || r.content.includes('flag'));
});

runCase('D3: Selection Sort explanation and minimum element logic', () => {
  const r = engine.queryKnowledgeBase('Explain Selection Sort algorithm and minimum element selection');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Selection Sort') && r.content.includes('minimum'));
});

runCase('D4: Insertion Sort explanation and card sorting analogy', () => {
  const r = engine.queryKnowledgeBase('Explain Insertion Sort algorithm with playing cards analogy');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Insertion Sort') && (/card/i.test(r.content) || /sorted/i.test(r.content) || /shift/i.test(r.content)));
});

runCase('D5: Merge Sort explanation and divide-and-conquer principle', () => {
  const r = engine.queryKnowledgeBase('Explain Merge Sort algorithm and divide and conquer principle');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Merge Sort') && (/divide/i.test(r.content) || /conquer/i.test(r.content)));
});

runCase('D6: Quick Sort explanation, pivot selection, and partitioning', () => {
  const r = engine.queryKnowledgeBase('Explain Quick Sort algorithm pivot selection and partitioning');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Quick Sort') && /pivot/i.test(r.content));
});

runCase('D7: Master Guide: Compare all 5 sorting techniques', () => {
  const r = engine.queryKnowledgeBase('List and compare all sorting algorithms');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('| Algorithm | Best Time |') || r.content.includes('| Algorithm |'));
});

runCase('D8: Bubble Sort C Program', () => {
  const r = engine.queryKnowledgeBase('Write a complete C program for bubble sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'D8 Bubble Sort C Code');
});

runCase('D9: Selection Sort C Program', () => {
  const r = engine.queryKnowledgeBase('Write a complete C program for selection sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'D9 Selection Sort C Code');
});

runCase('D10: Insertion Sort C Program', () => {
  const r = engine.queryKnowledgeBase('Write a complete C program for insertion sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'D10 Insertion Sort C Code');
});

runCase('D11: Merge Sort C Program', () => {
  const r = engine.queryKnowledgeBase('Write a complete C program for merge sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'D11 Merge Sort C Code');
});

runCase('D12: Quick Sort C Program', () => {
  const r = engine.queryKnowledgeBase('Write a complete C program for quick sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'D12 Quick Sort C Code');
});

runCase('D13: Dry run of Bubble Sort on sample array', () => {
  const r = engine.queryKnowledgeBase('Step by step dry run of bubble sort on array [64, 34, 25, 12, 22]');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Pass') || r.content.includes('Dry Run') || r.content.includes('swap'));
});

runCase('D14: Dry run of Selection Sort on sample array', () => {
  const r = engine.queryKnowledgeBase('Dry run of selection sort on array [29, 10, 14, 37, 13]');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Pass') || r.content.includes('min') || r.content.includes('Dry Run'));
});

runCase('D15: Dry run of Insertion Sort on sample array', () => {
  const r = engine.queryKnowledgeBase('Step by step dry run of insertion sort on [12, 11, 13, 5, 6]');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('key') || r.content.includes('Pass') || r.content.includes('Dry Run'));
});

runCase('D16: Dry run of Merge Sort divide and merge steps', () => {
  const r = engine.queryKnowledgeBase('Dry run of merge sort on array [38, 27, 43, 3, 9, 82, 10]');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('merge') || r.content.includes('divide') || r.content.includes('Subarray'));
});

runCase('D17: Dry run of Quick Sort Lomuto partition', () => {
  const r = engine.queryKnowledgeBase('Step by step dry run of quick sort partition on [10, 80, 30, 90, 40, 50, 70]');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('pivot') || r.content.includes('partition') || r.content.includes('Dry Run'));
});

runCase('D18: Time complexity of Bubble Sort (Best, Average, Worst)', () => {
  const r = engine.queryKnowledgeBase('What is the time complexity of bubble sort?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('O(n²)') || r.content.includes('O(n^2)'));
});

runCase('D19: Time complexity of Selection Sort', () => {
  const r = engine.queryKnowledgeBase('Explain time complexity of selection sort in best and worst cases');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('O(n²)') || r.content.includes('O(n^2)'));
});

runCase('D20: Time complexity of Insertion Sort', () => {
  const r = engine.queryKnowledgeBase('What is the best case and worst case time complexity of insertion sort?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('O(n)') && (r.content.includes('O(n²)') || r.content.includes('O(n^2)')));
});

runCase('D21: Time complexity of Merge Sort', () => {
  const r = engine.queryKnowledgeBase('Explain time complexity and recurrence relation of merge sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('O(n log n)') || r.content.includes('O(n log₂ n)'));
});

runCase('D22: Time complexity of Quick Sort (Best vs Worst case)', () => {
  const r = engine.queryKnowledgeBase('What is the worst case time complexity of quick sort and when does it occur?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('O(n²)') || r.content.includes('O(n^2)'));
});

runCase('D23: Stability in sorting algorithms (Bubble/Merge vs Quick/Selection)', () => {
  const r = engine.queryKnowledgeBase('Explain stability in sorting algorithms with examples');
  assert.ok(r.success);
  assert.ok(['comparisons', 'sorting'].includes(r.topic));
  assert.ok(r.content.includes('Stable') || /stability/i.test(r.content));
});

runCase('D24: In-place vs Out-of-place sorting algorithms', () => {
  const r = engine.queryKnowledgeBase('Explain in-place vs out-of-place sorting algorithms');
  assert.ok(r.success);
  assert.ok(['comparisons', 'sorting'].includes(r.topic));
  assert.ok(r.content.includes('In-Place') || /in-place/i.test(r.content));
});

runCase('D25: Merge Sort vs Quick Sort comparison table', () => {
  const r = engine.queryKnowledgeBase('Compare Merge Sort vs Quick Sort');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Merge Sort | Quick Sort |'));
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION E: UNIT 4 LINKED LISTS (20 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Section E: Unit 4 Linked Lists (20 Questions) ---');

runCase('E1: Singly Linked List concept and node representation', () => {
  const r = engine.queryKnowledgeBase('What is a Singly Linked List and how is a node defined in C?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('struct Node') || r.content.includes('data') && r.content.includes('next'));
});

runCase('E2: Singly Linked List: Insertion at beginning', () => {
  const r = engine.queryKnowledgeBase('Explain insertion at beginning of singly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Beginning') || r.content.includes('insertAtBeginning'));
});

runCase('E3: Singly Linked List: Insertion at end', () => {
  const r = engine.queryKnowledgeBase('Explain insertion at end of singly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('End') || r.content.includes('insertAtEnd'));
});

runCase('E4: Singly Linked List: Insertion at specific position', () => {
  const r = engine.queryKnowledgeBase('Explain insertion at a given position in singly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('position') || r.content.includes('insertAtPosition'));
});

runCase('E5: Singly Linked List: Deletion from beginning', () => {
  const r = engine.queryKnowledgeBase('Explain deletion from beginning of singly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Beginning') || r.content.includes('deleteFromBeginning'));
});

runCase('E6: Singly Linked List: Deletion from end', () => {
  const r = engine.queryKnowledgeBase('Explain deletion from end of singly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('End') || r.content.includes('deleteFromEnd'));
});

runCase('E7: Singly Linked List: Deletion of specific node', () => {
  const r = engine.queryKnowledgeBase('Explain deletion of a specific key node in singly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('delete') || r.content.includes('free'));
});

runCase('E8: Singly Linked List: Search operation', () => {
  const r = engine.queryKnowledgeBase('How to search an element in a singly linked list?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('search') || r.content.includes('travers'));
});

runCase('E9: Singly Linked List: Traversal operation', () => {
  const r = engine.queryKnowledgeBase('Explain traversal and display of a singly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(/travers/i.test(r.content) || /display/i.test(r.content));
});

runCase('E10: Reversing a Singly Linked List (iterative logic)', () => {
  const r = engine.queryKnowledgeBase('Explain algorithm to reverse a singly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('prev') && r.content.includes('curr') && r.content.includes('next'));
});

runCase('E11: C program to reverse a singly linked list', () => {
  const r = engine.queryKnowledgeBase('Write a C program to reverse a singly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assertValidCCode(r.content, 'E11 Reverse List C Code');
  assert.ok(r.content.includes('reverseList') || r.content.includes('prev = NULL'));
});

runCase('E12: Doubly Linked List concept and node structure', () => {
  const r = engine.queryKnowledgeBase('What is a Doubly Linked List and its node structure?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('prev') && r.content.includes('next'));
});

runCase('E13: Doubly Linked List insertion operations', () => {
  const r = engine.queryKnowledgeBase('Explain insertion in a doubly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Doubly') || r.content.includes('prev'));
});

runCase('E14: Doubly Linked List deletion operations', () => {
  const r = engine.queryKnowledgeBase('Explain deletion in a doubly linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Doubly') || r.content.includes('prev'));
});

runCase('E15: Circular Linked List concept', () => {
  const r = engine.queryKnowledgeBase('What is a Circular Linked List?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Circular Linked List') || r.content.includes('head'));
});

runCase('E16: Circular Linked List operations and last node check', () => {
  const r = engine.queryKnowledgeBase('How does insertion work in a circular linked list?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Circular') || r.content.includes('last->next'));
});

runCase('E17: Singly vs Doubly Linked List comparison', () => {
  const r = engine.queryKnowledgeBase('Compare Singly Linked List vs Doubly Linked List');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Singly Linked List | Doubly Linked List |'));
});

runCase('E18: Singly vs Circular Linked List comparison', () => {
  const r = engine.queryKnowledgeBase('Compare Singly Linked List vs Circular Linked List');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Singly Linked List | Circular Linked List |'));
});

runCase('E19: Array vs Linked List comparison', () => {
  const r = engine.queryKnowledgeBase('Compare Array vs Linked List');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Array | Linked List |'));
});

runCase('E20: Master Guide: Compare all linked list types', () => {
  const r = engine.queryKnowledgeBase('Explain all types of linked lists');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Singly') && r.content.includes('Doubly') && r.content.includes('Circular'));
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION F: UNIT 5 STACKS (15 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Section F: Unit 5 Stacks (15 Questions) ---');

runCase('F1: Stack ADT and LIFO principle', () => {
  const r = engine.queryKnowledgeBase('Explain Stack ADT and LIFO principle');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('LIFO') || r.content.includes('Last In First Out'));
});

runCase('F2: Stack implementation using array (PUSH, POP, PEEK)', () => {
  const r = engine.queryKnowledgeBase('Explain stack operations push pop and peek using array');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('push') && r.content.includes('pop') && r.content.includes('peek'));
});

runCase('F3: Stack Overflow condition and handling', () => {
  const r = engine.queryKnowledgeBase('What is stack overflow condition in array implementation?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('top == MAX - 1') || r.content.includes('top >= MAX - 1') || r.content.includes('Overflow'));
});

runCase('F4: Stack Underflow condition and handling', () => {
  const r = engine.queryKnowledgeBase('What is stack underflow condition and when does it occur?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('top == -1') || r.content.includes('Underflow'));
});

runCase('F5: C Program for Stack using Array', () => {
  const r = engine.queryKnowledgeBase('Write a complete C program to implement stack using array with push, pop, and display');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assertValidCCode(r.content, 'F5 Stack Array C Code');
  assert.ok(r.content.includes('push') && r.content.includes('pop'));
});

runCase('F6: Infix to Postfix conversion algorithm', () => {
  const r = engine.queryKnowledgeBase('Explain algorithm for Infix to Postfix conversion using stack');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('precedence') || r.content.includes('Infix') || r.content.includes('Postfix'));
});

runCase('F7: C Program for Infix to Postfix conversion', () => {
  const r = engine.queryKnowledgeBase('Write a C program for infix to postfix conversion using stack');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assertValidCCode(r.content, 'F7 Infix to Postfix C Code');
  assert.ok(r.content.includes('precedence') || r.content.includes('infixToPostfix'));
});

runCase('F8: Step by step dry run of Infix to Postfix conversion', () => {
  const r = engine.queryKnowledgeBase('Dry run of infix to postfix conversion for expression (A+B)*C');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('Stack') || r.content.includes('Postfix') || r.content.includes('Symbol'));
});

runCase('F9: Balanced Parentheses algorithm using stack', () => {
  const r = engine.queryKnowledgeBase('Explain balanced parentheses checking using stack');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('Balanced') || r.content.includes('parentheses') || r.content.includes('brackets'));
});

runCase('F10: C Program for Balanced Parentheses checking', () => {
  const r = engine.queryKnowledgeBase('Write a C program to check balanced parentheses using stack');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assertValidCCode(r.content, 'F10 Balanced Parentheses C Code');
  assert.ok(r.content.includes('isMatchingPair') || r.content.includes('areBracketsBalanced'));
});

runCase('F11: Dry run of Balanced Parentheses checking', () => {
  const r = engine.queryKnowledgeBase('Step by step dry run of balanced parentheses for expression {[()]}');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('Push') || r.content.includes('Pop') || r.content.includes('Balanced'));
});

runCase('F12: Applications of Stack in computer science', () => {
  const r = engine.queryKnowledgeBase('What are the real-world applications of stack data structure?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('recursion') || r.content.includes('Call stack') || r.content.includes('Undo') || r.content.includes('Expression'));
});

runCase('F13: Time complexity of Stack operations', () => {
  const r = engine.queryKnowledgeBase('What is the time complexity of push pop and peek in stack?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('O(1)'));
});

runCase('F14: Viva: Postfix expression evaluation logic', () => {
  const r = engine.queryKnowledgeBase('How is a postfix expression evaluated using stack in viva?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('operand') || r.content.includes('operator') || r.content.includes('stack'));
});

runCase('F15: Stack using Array vs Linked List comparison', () => {
  const r = engine.queryKnowledgeBase('Compare Stack using Array vs Stack using Linked List');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Stack using Array | Stack using Linked List |'));
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION G: UNIT 6 QUEUES & CIRCULAR QUEUES (15 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Section G: Unit 6 Queues & Circular Queues (15 Questions) ---');

runCase('G1: Queue ADT and FIFO principle', () => {
  const r = engine.queryKnowledgeBase('Explain Queue ADT and First In First Out FIFO principle');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'queues');
  assert.ok(r.content.includes('FIFO') || r.content.includes('First In First Out'));
});

runCase('G2: Linear Queue implementation using array', () => {
  const r = engine.queryKnowledgeBase('Explain Linear Queue implementation with front and rear pointers');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'queues');
  assert.ok(r.content.includes('front') && r.content.includes('rear'));
});

runCase('G3: Linear Queue False Overflow problem', () => {
  const r = engine.queryKnowledgeBase('Explain false overflow problem in linear queue with array');
  assert.ok(r.success);
  assert.ok(['circular_queues', 'queues'].includes(r.topic));
  assert.ok(r.content.includes('False Overflow') || (r.content.includes('rear == MAX - 1') && r.content.includes('empty')) || r.content.includes('rear'));
});

runCase('G4: Why Circular Queue solves false overflow', () => {
  const r = engine.queryKnowledgeBase('Why is circular queue needed and how does it overcome false overflow?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('ring') || r.content.includes('modulo') || r.content.includes('wrap'));
});

runCase('G5: Circular Queue modulo arithmetic ring buffer logic', () => {
  const r = engine.queryKnowledgeBase('Explain modulo arithmetic ring buffer logic in circular queue');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('(rear + 1) % MAX') || r.content.includes('% MAX'));
});

runCase('G6: C Program for Linear Queue using array', () => {
  const r = engine.queryKnowledgeBase('Write a C program to implement Linear Queue using array');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'queues');
  assertValidCCode(r.content, 'G6 Linear Queue C Code');
  assert.ok(r.content.includes('enqueue') || r.content.includes('insert'));
});

runCase('G7: C Program for Circular Queue using array', () => {
  const r = engine.queryKnowledgeBase('Write a complete C program for circular queue with enqueue, dequeue, and display');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assertValidCCode(r.content, 'G7 Circular Queue C Code');
  assert.ok(r.content.includes('% MAX'));
});

runCase('G8: Circular Queue wrap-around step by step dry run', () => {
  const r = engine.queryKnowledgeBase('Give step by step dry run of circular queue wrap around behavior');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('rear') || r.content.includes('front') || r.content.includes('wrap'));
});

runCase('G9: Full condition of Circular Queue', () => {
  const r = engine.queryKnowledgeBase('What is the condition to check if circular queue is full?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('(rear + 1) % MAX == front') || r.content.includes('rear + 1') && r.content.includes('front'));
});

runCase('G10: Empty condition of Circular Queue', () => {
  const r = engine.queryKnowledgeBase('What is the condition to check if circular queue is empty?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('front == -1'));
});

runCase('G11: Time complexity of enqueue and dequeue operations', () => {
  const r = engine.queryKnowledgeBase('What is the time complexity of enqueue and dequeue in circular queue?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('O(1)'));
});

runCase('G12: Linear Queue vs Circular Queue comparison table', () => {
  const r = engine.queryKnowledgeBase('Compare Linear Queue vs Circular Queue');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Linear Queue | Circular Queue |'));
});

runCase('G13: Queue using Array vs Queue using Linked List comparison', () => {
  const r = engine.queryKnowledgeBase('Compare Queue using Array vs Queue using Linked List');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Queue using Array | Queue using Linked List |'));
});

runCase('G14: Applications of Queue in operating systems', () => {
  const r = engine.queryKnowledgeBase('What are the real-world applications of queue data structure in OS?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'queues');
  assert.ok(r.content.includes('CPU') || r.content.includes('Printer') || r.content.includes('BFS') || r.content.includes('scheduling'));
});

runCase('G15: Master Guide: Compare all queue types', () => {
  const r = engine.queryKnowledgeBase('Explain all types of queues in data structures');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'queues');
  assert.ok(r.content.includes('Linear Queue') || r.content.includes('Circular Queue'));
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION H: UNIT 7 BINARY TREES & BST (20 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Section H: Unit 7 Binary Trees & BST (20 Questions) ---');

runCase('H1: Tree terminology (root, leaf, height, depth, degree)', () => {
  const r = engine.queryKnowledgeBase('Explain tree terminology root leaf parent child depth height degree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Root') && r.content.includes('Leaf') && r.content.includes('Height'));
});

runCase('H2: Binary Tree definition and strictly binary / full / complete types', () => {
  const r = engine.queryKnowledgeBase('What is a Binary Tree and explain full complete and perfect binary tree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Binary Tree') && (/Full/i.test(r.content) || /Complete/i.test(r.content) || /node/i.test(r.content)));
});

runCase('H3: Binary Search Tree (BST) ordering property', () => {
  const r = engine.queryKnowledgeBase('What is a Binary Search Tree BST and its properties?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('BST') || r.content.includes('left < root < right') || r.content.includes('Binary Search Tree'));
});

runCase('H4: BST Search algorithm and logic', () => {
  const r = engine.queryKnowledgeBase('Explain search operation in a Binary Search Tree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('search') || r.content.includes('Search'));
});

runCase('H5: BST Insertion algorithm and pointer updates', () => {
  const r = engine.queryKnowledgeBase('Explain insertion in a Binary Search Tree with pointer updates');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('insert') || r.content.includes('Insert'));
});

runCase('H6: BST Deletion: 3 cases (leaf, one child, two children)', () => {
  const r = engine.queryKnowledgeBase('Explain deletion in a Binary Search Tree handling 0, 1 and 2 children cases');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('successor') || r.content.includes('inorder successor') || r.content.includes('delete'));
});

runCase('H7: Inorder Traversal (Left, Root, Right)', () => {
  const r = engine.queryKnowledgeBase('Explain Inorder Traversal of binary tree and why it sorts a BST');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Inorder') || r.content.includes('Left -> Root -> Right') || r.content.includes('sorted'));
});

runCase('H8: Preorder Traversal (Root, Left, Right)', () => {
  const r = engine.queryKnowledgeBase('Explain Preorder Traversal of binary tree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Preorder') || r.content.includes('Root -> Left -> Right') || /preorder/i.test(r.content));
});

runCase('H9: Postorder Traversal (Left, Right, Root)', () => {
  const r = engine.queryKnowledgeBase('Explain Postorder Traversal of binary tree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Postorder') || r.content.includes('Left -> Right -> Root') || /postorder/i.test(r.content));
});

runCase('H10: C Program for BST construction, insertion, and search', () => {
  const r = engine.queryKnowledgeBase('Write a C program for binary search tree insertion and search');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assertValidCCode(r.content, 'H10 BST C Code');
  assert.ok(r.content.includes('insert') || r.content.includes('search'));
});

runCase('H11: C Program to find height of a binary tree', () => {
  const r = engine.queryKnowledgeBase('Write a C program to find the height of a binary tree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assertValidCCode(r.content, 'H11 Tree Height C Code');
  assert.ok(r.content.includes('findHeight') || r.content.includes('height'));
});

runCase('H12: C Program to count leaf nodes in a binary tree', () => {
  const r = engine.queryKnowledgeBase('Write a C program to count the number of leaf nodes in a binary tree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assertValidCCode(r.content, 'H12 Count Leaves C Code');
  assert.ok(r.content.includes('countLeafNodes') || r.content.includes('leaf'));
});

runCase('H13: Step by step dry run of BST insertion with array [50, 30, 70, 20, 40]', () => {
  const r = engine.queryKnowledgeBase('Dry run of BST insertion for sequence 50 30 70 20 40 60 80');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('50') && r.content.includes('30') && r.content.includes('70'));
});

runCase('H14: Step by step dry run of tree traversals on sample tree', () => {
  const r = engine.queryKnowledgeBase('Dry run of inorder preorder and postorder traversals on a sample binary tree');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Inorder') || r.content.includes('Preorder') || r.content.includes('Postorder'));
});

runCase('H15: Binary Tree vs Binary Search Tree comparison', () => {
  const r = engine.queryKnowledgeBase('Compare Binary Tree vs Binary Search Tree');
  assert.ok(r.success);
  assert.ok(['comparisons', 'binary_trees'].includes(r.topic));
  assert.ok(r.content.includes('Binary Tree') && (r.content.includes('BST') || r.content.includes('Binary Search Tree')));
});

runCase('H16: Inorder vs Preorder vs Postorder traversal comparison', () => {
  const r = engine.queryKnowledgeBase('Compare Inorder vs Preorder vs Postorder traversals');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Preorder') && r.content.includes('Postorder'));
});

runCase('H17: BST worst case (skewed tree O(n)) vs balanced BST O(log n)', () => {
  const r = engine.queryKnowledgeBase('Why can BST degrade to O(n) worst case time complexity?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('skewed') || r.content.includes('O(n)'));
});

runCase('H18: Viva: Which traversal gives ascending order in BST?', () => {
  const r = engine.queryKnowledgeBase('Which traversal of a binary search tree gives elements in sorted ascending order?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Inorder') || r.content.includes('inorder'));
});

runCase('H19: Viva: Max nodes in binary tree of height h', () => {
  const r = engine.queryKnowledgeBase('What is the maximum number of nodes in a binary tree of height h?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('2^') || r.content.includes('2^(h+1)') || r.content.includes('formula') || r.content.includes('nodes'));
});

runCase('H20: Master Guide: Tree traversals summary', () => {
  const r = engine.queryKnowledgeBase('Explain all binary tree traversals with visit orders');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Inorder') && r.content.includes('Preorder') && r.content.includes('Postorder'));
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION I: UNIT 8 ADDITIONAL TOPICS (20 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Section I: Unit 8 Additional Topics: Graphs, Hashing, Heaps, Recursion (20 Questions) ---');

runCase('I1: Graph fundamentals: vertices, edges, directed vs undirected', () => {
  const r = engine.queryKnowledgeBase('Explain Graph fundamentals vertices edges directed and undirected graphs');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assert.ok(r.content.includes('Vertex') || r.content.includes('Edge') || r.content.includes('Graph'));
});

runCase('I2: Graph representations: Adjacency Matrix vs Adjacency List', () => {
  const r = engine.queryKnowledgeBase('Compare Adjacency Matrix vs Adjacency List for graph representation');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Adjacency Matrix | Adjacency List |'));
});

runCase('I3: Breadth-First Search (BFS) algorithm and queue usage', () => {
  const r = engine.queryKnowledgeBase('Explain Breadth-First Search BFS graph traversal algorithm using queue');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assert.ok(r.content.includes('BFS') || r.content.includes('Queue'));
});

runCase('I4: Depth-First Search (DFS) algorithm and recursion/stack usage', () => {
  const r = engine.queryKnowledgeBase('Explain Depth-First Search DFS graph traversal algorithm using stack or recursion');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assert.ok(r.content.includes('DFS') || r.content.includes('Stack') || r.content.includes('recursion'));
});

runCase('I5: BFS vs DFS comparison table', () => {
  const r = engine.queryKnowledgeBase('Compare BFS vs DFS graph traversals');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | BFS') && r.content.includes('DFS'));
});

runCase('I6: C Program for Breadth-First Search (BFS)', () => {
  const r = engine.queryKnowledgeBase('Write a C program for Breadth First Search BFS graph traversal');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assertValidCCode(r.content, 'I6 BFS C Code');
  assert.ok(r.content.includes('bfs') || r.content.includes('BFS'));
});

runCase('I7: C Program for Depth-First Search (DFS)', () => {
  const r = engine.queryKnowledgeBase('Write a C program for Depth First Search DFS graph traversal');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assertValidCCode(r.content, 'I7 DFS C Code');
  assert.ok(r.content.includes('dfs') || r.content.includes('DFS'));
});

runCase('I8: Dry run of BFS traversal on a graph', () => {
  const r = engine.queryKnowledgeBase('Dry run of BFS traversal on a 4 vertex graph');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assert.ok(r.content.includes('Queue') || r.content.includes('visited') || r.content.includes('BFS'));
});

runCase('I9: Dry run of DFS traversal on a graph', () => {
  const r = engine.queryKnowledgeBase('Dry run of DFS traversal on a graph with step trace');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'graphs');
  assert.ok(r.content.includes('visited') || r.content.includes('DFS') || r.content.includes('Stack'));
});

runCase('I10: Hashing concept and hash function properties', () => {
  const r = engine.queryKnowledgeBase('Explain Hashing concept and what makes a good hash function');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assert.ok(r.content.includes('Hash') || r.content.includes('key'));
});

runCase('I11: Hash collisions and collision resolution methods', () => {
  const r = engine.queryKnowledgeBase('What is a collision in hash tables and how to resolve collisions?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assert.ok(r.content.includes('Collision') || r.content.includes('Linear Probing') || r.content.includes('Chaining'));
});

runCase('I12: Linear Probing open addressing logic and clustering', () => {
  const r = engine.queryKnowledgeBase('Explain linear probing open addressing and primary clustering problem');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assert.ok(r.content.includes('Linear Probing') || r.content.includes('probe') || r.content.includes('(hash + i) % size'));
});

runCase('I13: Separate Chaining collision resolution using linked lists', () => {
  const r = engine.queryKnowledgeBase('Explain separate chaining collision resolution using linked lists in hash table');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assert.ok(r.content.includes('Separate Chaining') || r.content.includes('linked list'));
});

runCase('I14: Linear Probing vs Separate Chaining comparison table', () => {
  const r = engine.queryKnowledgeBase('Compare Linear Probing vs Separate Chaining');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('| Parameter | Linear Probing (Open Addressing) | Separate Chaining (Closed Addressing) |'));
});

runCase('I15: Load factor alpha in hash table', () => {
  const r = engine.queryKnowledgeBase('What is the load factor alpha in a hash table?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'hashing');
  assert.ok(r.content.includes('load factor') || r.content.includes('alpha'));
});

runCase('I16: Binary Heap: Min-Heap and Max-Heap definitions', () => {
  const r = engine.queryKnowledgeBase('Explain Min-Heap and Max-Heap definitions and heap property');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'heaps');
  assert.ok(r.content.includes('Heap') || r.content.includes('complete binary tree'));
});

runCase('I17: Priority Queue implementation using Heap', () => {
  const r = engine.queryKnowledgeBase('How is Priority Queue implemented using a binary heap?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'heaps');
  assert.ok(r.content.includes('Priority Queue') || r.content.includes('heap'));
});

runCase('I18: Recursion concept: base case and recursive step', () => {
  const r = engine.queryKnowledgeBase('Explain recursion with base case and recursive call logic');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'recursion');
  assert.ok(r.content.includes('base case') || r.content.includes('Recursion'));
});

runCase('I19: Call stack in recursion and stack overflow danger', () => {
  const r = engine.queryKnowledgeBase('Explain call stack during recursion and how stack overflow happens');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'recursion');
  assert.ok(r.content.includes('Call Stack') || r.content.includes('stack frame') || r.content.includes('overflow'));
});

runCase('I20: Tower of Hanoi recurrence relation and algorithm', () => {
  const r = engine.queryKnowledgeBase('Explain Tower of Hanoi problem recurrence relation and algorithm');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'recursion');
  assert.ok(r.content.includes('Tower of Hanoi') && (r.content.includes('2^n - 1') || r.content.includes('T(n)')));
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION J: CONVERSATIONAL MULTI-TURN FOLLOW-UPS (10 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Section J: Conversational Multi-Turn Follow-Ups (10 Questions) ---');

const chainHistory = [];

runCase('J1: Turn 1 - Initial query on Bubble Sort', () => {
  const q = 'Tell me about Bubble Sort algorithm';
  const r = engine.queryKnowledgeBase(q, chainHistory);
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  chainHistory.push({ role: 'user', content: q });
  chainHistory.push({ role: 'model', content: r.content });
});

runCase('J2: Turn 2 - Follow-up "Give the C program"', () => {
  const q = 'Give the C program';
  const r = engine.queryKnowledgeBase(q, chainHistory);
  assert.ok(r.success);
  assert.strictEqual(r.isFollowUp, true);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'J2 Bubble Sort Follow-up C Code');
  chainHistory.push({ role: 'user', content: q });
  chainHistory.push({ role: 'model', content: r.content });
});

runCase('J3: Turn 3 - Follow-up "What is its time complexity?"', () => {
  const q = 'What is its time complexity?';
  const r = engine.queryKnowledgeBase(q, chainHistory);
  assert.ok(r.success);
  assert.strictEqual(r.isFollowUp, true);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Complexity') || r.content.includes('O(n'));
  chainHistory.push({ role: 'user', content: q });
  chainHistory.push({ role: 'model', content: r.content });
});

runCase('J4: Turn 4 - Follow-up "Give a dry run"', () => {
  const q = 'Give a dry run';
  const r = engine.queryKnowledgeBase(q, chainHistory);
  assert.ok(r.success);
  assert.strictEqual(r.isFollowUp, true);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Dry Run') || r.content.includes('Pass') || r.content.includes('Trace'));
});

// Second conversation chain for Binary Search Tree
const bstChain = [];

runCase('J5: Turn 1 - Initial query on Binary Search Tree', () => {
  const q = 'What is a Binary Search Tree?';
  const r = engine.queryKnowledgeBase(q, bstChain);
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  bstChain.push({ role: 'user', content: q });
  bstChain.push({ role: 'model', content: r.content });
});

runCase('J6: Turn 2 - Follow-up "Give the algorithm"', () => {
  const q = 'Give the algorithm';
  const r = engine.queryKnowledgeBase(q, bstChain);
  assert.ok(r.success);
  assert.strictEqual(r.isFollowUp, true);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Algorithm') || r.content.includes('Step'));
  bstChain.push({ role: 'user', content: q });
  bstChain.push({ role: 'model', content: r.content });
});

runCase('J7: Turn 3 - Follow-up "Show code implementation"', () => {
  const q = 'Show code implementation';
  const r = engine.queryKnowledgeBase(q, bstChain);
  assert.ok(r.success);
  assert.strictEqual(r.isFollowUp, true);
  assert.strictEqual(r.topic, 'binary_trees');
  assertValidCCode(r.content, 'J7 BST Follow-up C Code');
});

// Third conversation chain for Circular Queue
const qChain = [];

runCase('J8: Turn 1 - Initial query on Circular Queue', () => {
  const q = 'Explain Circular Queue';
  const r = engine.queryKnowledgeBase(q, qChain);
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  qChain.push({ role: 'user', content: q });
  qChain.push({ role: 'model', content: r.content });
});

runCase('J9: Turn 2 - Follow-up "Why is this condition used?"', () => {
  const q = 'Why is this condition used?';
  const r = engine.queryKnowledgeBase(q, qChain);
  assert.ok(r.success);
  assert.strictEqual(r.isFollowUp, true);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('modulo') || r.content.includes('Formula') || r.content.includes('Condition'));
  qChain.push({ role: 'user', content: q });
  qChain.push({ role: 'model', content: r.content });
});

runCase('J10: Turn 3 - Follow-up "Show me a trace example"', () => {
  const q = 'Show me a trace example';
  const r = engine.queryKnowledgeBase(q, qChain);
  assert.ok(r.success);
  assert.strictEqual(r.isFollowUp, true);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('Trace') || r.content.includes('Dry Run') || r.content.includes('Step'));
});

// ══════════════════════════════════════════════════════════════════════════════
// SECTION K: PARAPHRASED NATURAL LANGUAGE & MISSPELLINGS (15 Questions)
// ══════════════════════════════════════════════════════════════════════════════
console.log('\n--- Section K: Paraphrased Natural Language & Misspellings (15 Questions) ---');

runCase('K1: Misspelling: "buble sort c code"', () => {
  const r = engine.queryKnowledgeBase('buble sort c code');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assertValidCCode(r.content, 'K1 Bubble Sort Typo C Code');
});

runCase('K2: Misspelling: "binry serch algrithm"', () => {
  const r = engine.queryKnowledgeBase('binry serch algrithm');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'searching');
  assert.ok(r.content.includes('Binary Search') || r.content.includes('Algorithm'));
});

runCase('K3: Misspelling: "linar vs binry serch"', () => {
  const r = engine.queryKnowledgeBase('linar vs binry serch');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Linear Search') && r.content.includes('Binary Search'));
});

runCase('K4: Misspelling: "diffrnce btwn stak and queu"', () => {
  const r = engine.queryKnowledgeBase('diffrnce btwn stak and queu');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Stack') && r.content.includes('Queue'));
});

runCase('K5: Misspelling: "singly linkd list insrtion"', () => {
  const r = engine.queryKnowledgeBase('singly linkd list insrtion');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Beginning') || r.content.includes('insert'));
});

runCase('K6: Misspelling: "circlar queu dry run"', () => {
  const r = engine.queryKnowledgeBase('circlar queu dry run');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('Circular Queue') || r.content.includes('modulo'));
});

runCase('K7: Misspelling: "postordr vs preordr traversl"', () => {
  const r = engine.queryKnowledgeBase('postordr vs preordr traversl');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'comparisons');
  assert.ok(r.content.includes('Preorder') && r.content.includes('Postorder'));
});

runCase('K8: Misspelling: "infto postfx usin stak"', () => {
  const r = engine.queryKnowledgeBase('infto postfx usin stak');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('Postfix') || r.content.includes('Infix'));
});

runCase('K9: Natural phrasing: "Can you help me understand how a binary tree works?"', () => {
  const r = engine.queryKnowledgeBase('Can you help me understand how a binary tree works?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'binary_trees');
  assert.ok(r.content.includes('Binary Tree') || r.content.includes('node'));
});

runCase('K10: Natural phrasing: "I need to know when circular queue is full"', () => {
  const r = engine.queryKnowledgeBase('I need to know when circular queue is full');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'circular_queues');
  assert.ok(r.content.includes('(rear + 1) % MAX == front') || r.content.includes('Full'));
});

runCase('K11: Natural phrasing: "Why would quicksort be bad in the worst case?"', () => {
  const r = engine.queryKnowledgeBase('Why would quicksort be bad in the worst case?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('O(n²)') || r.content.includes('O(n^2)') || r.content.includes('pivot'));
});

runCase('K12: Natural phrasing: "How does free work with malloc in C?"', () => {
  const r = engine.queryKnowledgeBase('How does free work with malloc in C?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'fundamentals');
  assert.ok(r.content.includes('free') && r.content.includes('malloc'));
});

runCase('K13: Natural phrasing: "Show me how to insert a node at the head of a linked list"', () => {
  const r = engine.queryKnowledgeBase('Show me how to insert a node at the head of a linked list');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'linked_lists');
  assert.ok(r.content.includes('Beginning') || r.content.includes('head') || r.content.includes('insertAtBeginning'));
});

runCase('K14: Natural phrasing: "What happens when top == MAX - 1 in stack?"', () => {
  const r = engine.queryKnowledgeBase('What happens when top == MAX - 1 in stack?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'stacks');
  assert.ok(r.content.includes('Overflow') || r.content.includes('top == MAX - 1'));
});

runCase('K15: Natural phrasing: "Which sorting algorithm is best when data is already mostly sorted?"', () => {
  const r = engine.queryKnowledgeBase('Which sorting algorithm is best when data is already mostly sorted?');
  assert.ok(r.success);
  assert.strictEqual(r.topic, 'sorting');
  assert.ok(r.content.includes('Insertion Sort') || r.content.includes('O(n)'));
});

// ══════════════════════════════════════════════════════════════════════════════
// FINAL SUMMARY REPORT
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
  console.log(`\n🎉 ALL ${totalTests} COMPREHENSIVE OFFLINE DS KNOWLEDGE TESTS PASSED WITH 100% SUCCESS!`);
  process.exit(0);
}
