/**
 * Automated Test Suite: DS Complete Answers Module
 * Validates:
 * 1. 108 Operations existence & unique IDs across 7 categories
 * 2. 14-section schema completeness for every operation
 * 3. Compilable C code structure (#include <stdio.h>, main(), balanced braces, zero truncations)
 * 4. PWA Service Worker caching & versioning
 * 5. Frontend EJS navigation buttons & workspace containers
 * 6. Local Mini Q&A topic matcher accuracy
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('═══════════════════════════════════════════════════════════════');
console.log('RUNNING DS COMPLETE ANSWERS TEST SUITE');
console.log('═══════════════════════════════════════════════════════════════\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
  }
}

// ── TEST 1: Load All Complete Data Modules ──────────────────────
runTest('All 7 Complete Data Modules Exist & Load Cleanly', () => {
  const searching = require('../scripts/data/complete/searching.js');
  const sorting = require('../scripts/data/complete/sorting.js');
  const linked_lists = require('../scripts/data/complete/linked_lists.js');
  const stacks = require('../scripts/data/complete/stacks.js');
  const queues = require('../scripts/data/complete/queues.js');
  const trees = require('../scripts/data/complete/trees.js');
  const graphs = require('../scripts/data/complete/graphs.js');

  assert.strictEqual(searching.length, 2, 'Searching should have 2 operations');
  assert.strictEqual(sorting.length, 5, 'Sorting should have 5 operations');
  assert.strictEqual(linked_lists.length, 28, 'Linked Lists should have 28 operations');
  assert.strictEqual(stacks.length, 19, 'Stacks should have 19 operations');
  assert.strictEqual(queues.length, 21, 'Queues should have 21 operations');
  assert.strictEqual(trees.length, 22, 'Trees should have 22 operations');
  assert.strictEqual(graphs.length, 11, 'Graphs should have 11 operations');

  const total = searching.length + sorting.length + linked_lists.length + stacks.length + queues.length + trees.length + graphs.length;
  assert.strictEqual(total, 108, 'Total operations must equal exactly 108');
});

// ── TEST 2: Unique IDs & Full 14-Section Schema Verification ──────
runTest('All 108 Operations Have Unique IDs and 14-Section Completeness', () => {
  const searching = require('../scripts/data/complete/searching.js');
  const sorting = require('../scripts/data/complete/sorting.js');
  const linked_lists = require('../scripts/data/complete/linked_lists.js');
  const stacks = require('../scripts/data/complete/stacks.js');
  const queues = require('../scripts/data/complete/queues.js');
  const trees = require('../scripts/data/complete/trees.js');
  const graphs = require('../scripts/data/complete/graphs.js');

  const all = [...searching, ...sorting, ...linked_lists, ...stacks, ...queues, ...trees, ...graphs];
  const seenIds = new Set();

  for (const op of all) {
    // Unique ID
    assert(op.id && typeof op.id === 'string', `Operation missing string id: ${JSON.stringify(op)}`);
    assert(!seenIds.has(op.id), `Duplicate ID detected: ${op.id}`);
    seenIds.add(op.id);

    // Required schema sections
    const requiredSections = [
      'title', 'category', 'categoryName', 'subcategory', 'subcategoryName',
      'definition', 'concept_explanation', 'algorithm', 'c_program',
      'time_complexity', 'space_complexity', 'advantages_disadvantages',
      'applications', 'viva_questions'
    ];

    for (const sec of requiredSections) {
      assert(op[sec], `Operation ${op.id} is missing required section: ${sec}`);
    }

    // Viva questions check
    assert(Array.isArray(op.viva_questions) && op.viva_questions.length > 0, `${op.id} must have viva questions`);
    assert(op.viva_questions[0].q && op.viva_questions[0].a, `${op.id} viva question must have q and a fields`);
  }
});

// ── TEST 3: Compilable Standalone C Program Structural Check ────
runTest('All 108 C Programs are Standalone, Complete & Well-Formed', () => {
  const searching = require('../scripts/data/complete/searching.js');
  const sorting = require('../scripts/data/complete/sorting.js');
  const linked_lists = require('../scripts/data/complete/linked_lists.js');
  const stacks = require('../scripts/data/complete/stacks.js');
  const queues = require('../scripts/data/complete/queues.js');
  const trees = require('../scripts/data/complete/trees.js');
  const graphs = require('../scripts/data/complete/graphs.js');

  const all = [...searching, ...sorting, ...linked_lists, ...stacks, ...queues, ...trees, ...graphs];

  for (const op of all) {
    const code = op.c_program;
    assert(code && code.length > 50, `${op.id} C program is too short or empty`);

    // Standard header
    assert(code.includes('#include <stdio.h>'), `${op.id} must include <stdio.h>`);

    // Must have main()
    assert(code.includes('main(') || code.includes('main ('), `${op.id} must contain main() function`);

    // Zero ellipses or truncations
    assert(!code.includes('// rest of code'), `${op.id} contains lazy comment truncation`);
    assert(!code.includes('/* rest of code'), `${op.id} contains lazy comment truncation`);
    assert(!code.includes('// ...'), `${op.id} contains ellipsis truncation`);

    // Balanced braces check
    let braceCount = 0;
    for (let i = 0; i < code.length; i++) {
      if (code[i] === '{') braceCount++;
      else if (code[i] === '}') braceCount--;
    }
    assert.strictEqual(braceCount, 0, `${op.id} has unbalanced curly braces (count: ${braceCount})`);
  }
});

// ── TEST 4: Client-side Bundle public/js/ds-complete-data.js ────
runTest('Client-Side Bundle public/js/ds-complete-data.js Exists & Valid', () => {
  const bundlePath = path.join(__dirname, '..', 'public', 'js', 'ds-complete-data.js');
  assert(fs.existsSync(bundlePath), 'public/js/ds-complete-data.js must exist');

  const bundle = require(bundlePath);
  assert.strictEqual(bundle.totalCount, 108, 'Bundle must report totalCount = 108');
  assert.strictEqual(bundle.CATEGORIES.length, 7, 'Bundle must have 7 categories');
  assert.strictEqual(Object.keys(bundle.TOPICS).length, 108, 'Bundle TOPICS map must have 108 keys');

  // Verify all category topic IDs map to valid topics
  let verifiedTopics = 0;
  for (const cat of bundle.CATEGORIES) {
    for (const sub of cat.subcategories) {
      for (const tid of sub.topics) {
        assert(bundle.TOPICS[tid], `Topic ${tid} listed in subcategory ${sub.id} does not exist in TOPICS map`);
        verifiedTopics++;
      }
    }
  }
  assert.strictEqual(verifiedTopics, 108, 'All 108 topics must be accessible via categories');
});

// ── TEST 5: Frontend EJS Navigation & Containers ────────────────
runTest('Frontend views/chat.ejs Contains Navigation and Workspace Elements', () => {
  const ejsPath = path.join(__dirname, '..', 'views', 'chat.ejs');
  const content = fs.readFileSync(ejsPath, 'utf8');

  assert(content.includes('id="navDSCompleteAnswers"'), 'chat.ejs must contain #navDSCompleteAnswers navigation button');
  assert(content.includes('id="dsLearningWorkspace"'), 'chat.ejs must contain #dsLearningWorkspace container');
  assert(content.includes('id="dsAccordionContainer"'), 'chat.ejs must contain #dsAccordionContainer');
  assert(content.includes('id="dsContentContainer"'), 'chat.ejs must contain #dsContentContainer');
  assert(content.includes('id="dsTopicSearchInput"'), 'chat.ejs must contain #dsTopicSearchInput');
  assert(content.includes('id="dsMiniQAInput"'), 'chat.ejs must contain #dsMiniQAInput');
  assert(content.includes('/js/ds-complete-data.js'), 'chat.ejs must include ds-complete-data.js script');
  assert(content.includes('/js/ds-learning-module.js'), 'chat.ejs must include ds-learning-module.js script');
});

// ── TEST 6: Service Worker PWA Precache & Cache Version ─────────
runTest('Service Worker Caches DS Modules with Updated Version', () => {
  const swPath = path.join(__dirname, '..', 'public', 'sw.js');
  const swContent = fs.readFileSync(swPath, 'utf8');

  assert(swContent.includes("CACHE_VERSION = 'v1.7.0'"), 'sw.js must be bumped to v1.7.0');
  assert(swContent.includes("'/js/ds-complete-data.js'"), 'sw.js must precache /js/ds-complete-data.js');
  assert(swContent.includes("'/js/ds-learning-module.js'"), 'sw.js must precache /js/ds-learning-module.js');
});

// ── TEST 7: Local Mini Q&A Search Matcher Accuracy ──────────────
runTest('Mini Q&A Topic Matcher Resolves Common Student Queries Accurately', () => {
  const bundle = require('../public/js/ds-complete-data.js');
  const topics = bundle.ALL_TOPICS;

  function matchQuery(q) {
    const query = q.toLowerCase();
    let bestTopic = null;
    let highestScore = -1;
    const queryTokens = query.split(/\s+/).filter(w => w.length > 1);

    for (const t of topics) {
      const full = bundle.TOPICS[t.id];
      let score = 0;
      const titleLower = full.title.toLowerCase();
      const idLower = full.id.toLowerCase();
      const keywords = (full.keywords || []).map(k => k.toLowerCase());

      if (titleLower.includes(query)) score += 50;
      if (idLower.includes(query)) score += 40;
      if (keywords.some(k => k.includes(query) || query.includes(k))) score += 45;

      for (const token of queryTokens) {
        if (titleLower.includes(token)) score += 10;
        if (idLower.includes(token)) score += 8;
        if (keywords.some(k => k.includes(token))) score += 7;
        if (full.category.toLowerCase().includes(token)) score += 3;
      }

      if (query.includes('doubly') && !idLower.includes('dll')) score -= 20;
      if (query.includes('circular') && !idLower.includes('cll') && !idLower.includes('cqueue')) score -= 20;
      if (query.includes('bst') && !idLower.includes('bst')) score -= 15;
      if (query.includes('stack') && !idLower.includes('stack')) score -= 20;
      if (query.includes('queue') && !idLower.includes('queue')) score -= 20;

      if (score > highestScore) {
        highestScore = score;
        bestTopic = full;
      }
    }
    return bestTopic ? bestTopic.id : null;
  }

  assert.strictEqual(matchQuery('binary search'), 'binary_search');
  assert.strictEqual(matchQuery('bubble sort'), 'bubble_sort');
  assert.strictEqual(matchQuery('insert at beginning of singly linked list'), 'sll_insert_beginning');
  assert.strictEqual(matchQuery('infix to postfix conversion'), 'stack_infix_to_postfix');
  assert.strictEqual(matchQuery('circular queue enqueue modulo'), 'cqueue_enqueue');
  assert.strictEqual(matchQuery('delete node two children bst'), 'tree_bst_delete_two_children');
  assert.strictEqual(matchQuery('breadth first search bfs traversal'), 'graph_bfs');
});

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`TEST SUITE RESULTS: ${passedTests}/${totalTests} PASSED`);
console.log('═══════════════════════════════════════════════════════════════');

if (passedTests !== totalTests) {
  process.exit(1);
}

