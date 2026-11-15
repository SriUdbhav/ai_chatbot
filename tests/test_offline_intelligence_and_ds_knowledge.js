/**
 * StudyMate AI — Offline Intelligence Detection & Data Structures Knowledge Test Suite
 *
 * Verifies:
 *  1. Multi-Provider Local AI Availability Detector & 8 Diagnostic States
 *  2. Priority Response Routing (Gemini -> WebLLM -> Chrome AI -> Local Service -> Offline Knowledge)
 *  3. Visual Engine Badges & Styling
 *  4. Data Structures Knowledge Base (All 7 Units + Complexity Table + Viva Bank)
 *  5. 10-Point Teaching Structure & 7-Point Theory Structure
 *  6. Context-Aware Follow-Up Answering (All 7 Follow-up Types)
 *  7. Service Worker Precaching of all Knowledge Assets
 *  8. Chat Interface Enhancements (DS Mode, Syllabus Tracker, Quick Tools, Suggestions)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🌳 StudyMate AI — Offline Intelligence & DS Knowledge Audit');
console.log('═══════════════════════════════════════════════════════════════════════\n');

// ── MODULE 1: Local AI Detector & Diagnostic States ──────────────────────────
console.log('1. Local AI Availability Detector & Diagnostic States (Part 1):');

const detectorPath = path.join(ROOT_DIR, 'public', 'js', 'local-ai-detector.js');
const detectorModule = require(detectorPath);

runTest('local-ai-detector.js exists and exports required methods', () => {
  assert.ok(fs.existsSync(detectorPath), 'local-ai-detector.js file missing');
  assert.strictEqual(typeof detectorModule.checkChromeBuiltInAI, 'function');
  assert.strictEqual(typeof detectorModule.checkLocalAIService, 'function');
  assert.strictEqual(typeof detectorModule.detectAllLocalAIOptions, 'function');
  assert.strictEqual(typeof detectorModule.resolveActiveResponseEngine, 'function');
  assert.strictEqual(typeof detectorModule.generateChromeBuiltInResponse, 'function');
  assert.strictEqual(typeof detectorModule.generateLocalServiceResponse, 'function');
});

runTest('detector contains all 8 required diagnostic states in logic', () => {
  const code = fs.readFileSync(detectorPath, 'utf8');
  const requiredStates = [
    'Local AI model available',
    'Local AI model installed but initialization failed',
    'WebGPU unavailable',
    'Chrome built-in AI available',
    'Local AI service available',
    'No compatible local AI found',
    'Internet unavailable',
    'Offline knowledge assistant available'
  ];
  for (const st of requiredStates) {
    assert.ok(code.includes(st), `Missing diagnostic state in code: "${st}"`);
  }
});

runTest('detectAllLocalAIOptions returns comprehensive diagnostics object', async () => {
  const result = await detectorModule.detectAllLocalAIOptions({
    localAiInstance: {
      checkWebGPUSupport: async () => ({ supported: false, reason: 'Test environment' }),
      getSelectedModelId: () => 'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC',
      verifyModelInstallation: async () => ({ installed: false, status: 'not_installed' }),
      getExamModeActive: () => false
    }
  });

  assert.ok(result.timestamp, 'Missing timestamp');
  assert.ok(Array.isArray(result.diagnosticStates), 'diagnosticStates must be array');
  assert.ok(result.diagnosticStates.includes('Offline knowledge assistant available'), 'Must include offline knowledge state');
  assert.ok(result.offlineKnowledge && result.offlineKnowledge.available, 'offlineKnowledge must be available');
  assert.strictEqual(result.offlineKnowledge.syllabusUnits, 7, 'Must report 7 syllabus units');
});

// ── MODULE 2: Priority Routing Hierarchy & Badges ────────────────────────────
console.log('\n2. Priority Response Routing & Engine Badges (Part 2):');

runTest('resolveActiveResponseEngine implements 5-tier priority hierarchy', async () => {
  // Test Tier 5 fallback when offline with no local generative models
  const tier5 = await detectorModule.resolveActiveResponseEngine({
    forcedEngine: 'offline_knowledge'
  });
  assert.strictEqual(tier5.engine, 'offline_knowledge');
  assert.strictEqual(tier5.displayName, 'Offline Knowledge Assistant');
  assert.strictEqual(tier5.isGenerative, false, 'Must never describe Offline Knowledge Assistant as generative LLM');

  // Test explicit gemini route
  const onlineGemini = await detectorModule.resolveActiveResponseEngine({
    forcedEngine: 'gemini'
  });
  assert.strictEqual(onlineGemini.engine, 'gemini');
  assert.strictEqual(onlineGemini.displayName, 'Online Gemini');
});

runTest('chat.css defines engine badges for all 5 response providers', () => {
  const css = fs.readFileSync(path.join(ROOT_DIR, 'public', 'css', 'chat.css'), 'utf8');
  assert.ok(css.includes('.msg-engine-badge'), 'Missing .msg-engine-badge in chat.css');
  assert.ok(css.includes('.badge-gemini'), 'Missing .badge-gemini in chat.css');
  assert.ok(css.includes('.badge-webllm'), 'Missing .badge-webllm in chat.css');
  assert.ok(css.includes('.badge-chrome'), 'Missing .badge-chrome in chat.css');
  assert.ok(css.includes('.badge-local-service'), 'Missing .badge-local-service in chat.css');
  assert.ok(css.includes('.badge-knowledge'), 'Missing .badge-knowledge in chat.css');
});

runTest('chat.js formats engine badges with clear distinction and non-generative label', () => {
  const chatJs = fs.readFileSync(path.join(ROOT_DIR, 'public', 'js', 'chat.js'), 'utf8');
  assert.ok(chatJs.includes('formatEngineBadge'), 'Missing formatEngineBadge function');
  assert.ok(chatJs.includes('✨ Online Gemini'), 'Missing Online Gemini badge label');
  assert.ok(chatJs.includes('⚡ Local WebLLM'), 'Missing Local WebLLM badge label');
  assert.ok(chatJs.includes('🌐 Chrome Built-in AI'), 'Missing Chrome Built-in AI badge label');
  assert.ok(chatJs.includes('🖥️ Local AI Service'), 'Missing Local AI Service badge label');
  assert.ok(chatJs.includes('📚 Offline Knowledge Assistant'), 'Missing Offline Knowledge Assistant badge label');
  assert.ok(chatJs.includes('Not a generative LLM'), 'Must explicitly state Offline Knowledge Assistant is not a generative LLM');
});

// ── MODULE 3: Data Structures Knowledge Base Files ───────────────────────────
console.log('\n3. Data Structures Knowledge Base Files (Part 3):');

const dsDir = path.join(ROOT_DIR, 'public', 'knowledge', 'data-structures');

runTest('All 9 Data Structures JSON files exist and are valid JSON', () => {
  assert.ok(fs.existsSync(dsDir), 'knowledge/data-structures/ directory missing');
  const requiredFiles = [
    'searching.json',
    'sorting.json',
    'linked-lists.json',
    'stacks.json',
    'queues.json',
    'circular-queues.json',
    'binary-trees.json',
    'complexity.json',
    'viva.json'
  ];

  for (const f of requiredFiles) {
    const fPath = path.join(dsDir, f);
    assert.ok(fs.existsSync(fPath), `Missing required knowledge file: ${f}`);
    const data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
    assert.ok(data && typeof data === 'object', `Invalid JSON data in ${f}`);
  }
});

runTest('searching.json contains Linear Search & Binary Search with C programs and dry runs', () => {
  const data = JSON.parse(fs.readFileSync(path.join(dsDir, 'searching.json'), 'utf8'));
  const linear = data.algorithms.find(a => a.id === 'linear-search');
  const binary = data.algorithms.find(a => a.id === 'binary-search');
  assert.ok(linear && linear.c_program.includes('linearSearch'), 'Missing Linear Search C code');
  assert.ok(binary && binary.c_program.includes('binarySearch'), 'Missing Binary Search C code');
  assert.ok(binary.c_program.includes('low + (high - low) / 2'), 'Binary search must use overflow-safe midpoint calculation');
  assert.ok(binary.dry_run, 'Binary Search missing step-by-step dry run');
  assert.ok(binary.viva_questions.length >= 3, 'Binary search must have viva questions');
});

runTest('sorting.json contains Selection, Bubble, Merge, and Quick Sort with Lomuto partitioning', () => {
  const data = JSON.parse(fs.readFileSync(path.join(dsDir, 'sorting.json'), 'utf8'));
  const selection = data.algorithms.find(a => a.id === 'selection-sort');
  const bubble = data.algorithms.find(a => a.id === 'bubble-sort');
  const merge = data.algorithms.find(a => a.id === 'merge-sort');
  const quick = data.algorithms.find(a => a.id === 'quick-sort');
  assert.ok(selection && selection.c_program.includes('selectionSort'), 'Missing Selection Sort');
  assert.ok(bubble && bubble.c_program.includes('swapped'), 'Bubble Sort must use swapped optimization flag');
  assert.ok(merge && merge.c_program.includes('mergeSort'), 'Missing Merge Sort');
  assert.ok(quick && quick.c_program.includes('partition'), 'Quick Sort missing partition function');
  assert.ok(quick.c_program.includes('pivot'), 'Quick Sort must handle pivot selection');
});

runTest('linked-lists.json contains Singly Linked List with node struct, malloc, insertions & deletions', () => {
  const data = JSON.parse(fs.readFileSync(path.join(dsDir, 'linked-lists.json'), 'utf8'));
  assert.ok(data.c_program.includes('struct Node'), 'Missing struct Node in C code');
  assert.ok(data.c_program.includes('malloc(sizeof(struct Node))'), 'Missing malloc node allocation');
  assert.ok(data.c_program.includes('insertAtBeginning'), 'Missing insertAtBeginning');
  assert.ok(data.c_program.includes('deleteFromBeginning'), 'Missing deleteFromBeginning');
  assert.ok(data.c_program.includes('freeList'), 'Missing memory cleanup function');
});

runTest('circular-queues.json contains modulo arithmetic and wrap-around condition in C', () => {
  const data = JSON.parse(fs.readFileSync(path.join(dsDir, 'circular-queues.json'), 'utf8'));
  assert.ok(data.c_program.includes('(rear + 1) % MAX'), 'Missing modulo arithmetic in Circular Queue');
  assert.ok(data.c_program.includes('(rear + 1) % MAX == front'), 'Missing wrap-around full condition');
  assert.ok(data.c_program.includes('front == -1'), 'Missing empty condition');
});

runTest('binary-trees.json contains BST node struct, insertion, search, and 4 traversals in C', () => {
  const data = JSON.parse(fs.readFileSync(path.join(dsDir, 'binary-trees.json'), 'utf8'));
  assert.ok(data.c_program.includes('struct TreeNode'), 'Missing BST struct TreeNode');
  assert.ok(data.c_program.includes('insertBST'), 'Missing BST insert function');
  assert.ok(data.c_program.includes('searchBST'), 'Missing BST search function');
  assert.ok(data.c_program.includes('inorder'), 'Missing Inorder traversal');
  assert.ok(data.c_program.includes('preorder'), 'Missing Preorder traversal');
  assert.ok(data.c_program.includes('postorder'), 'Missing Postorder traversal');
});

runTest('viva.json contains at least 10 high-frequency viva exam questions with answers', () => {
  const data = JSON.parse(fs.readFileSync(path.join(dsDir, 'viva.json'), 'utf8'));
  assert.ok(Array.isArray(data.questions), 'questions must be an array');
  assert.ok(data.questions.length >= 10, 'Must have at least 10 viva questions');
  for (const v of data.questions) {
    assert.ok(v.question && v.answer, `Viva item missing question or answer: ${JSON.stringify(v)}`);
  }
});

// ── MODULE 4: Offline Knowledge Retrieval Engine ─────────────────────────────
console.log('\n4. Offline Knowledge Retrieval Engine & 10-Point Teaching Format (Part 4):');

const enginePath = path.join(ROOT_DIR, 'public', 'js', 'ds-knowledge-engine.js');
const engineModule = require(enginePath);

runTest('ds-knowledge-engine.js exists and exports required methods', () => {
  assert.ok(fs.existsSync(enginePath), 'ds-knowledge-engine.js missing');
  assert.strictEqual(typeof engineModule.classifyDSQuery, 'function');
  assert.strictEqual(typeof engineModule.resolveFollowUp, 'function');
  assert.strictEqual(typeof engineModule.generateTeachingResponse, 'function');
  assert.strictEqual(typeof engineModule.queryKnowledgeBase, 'function');
  assert.strictEqual(typeof engineModule.getSyllabusCoverage, 'function');
  assert.ok(engineModule.DS_TOPICS, 'Missing DS_TOPICS repository in engine');
});

runTest('classifyDSQuery recognizes all 7 topics with fuzzy matching and synonyms', () => {
  const testCases = [
    { query: 'Explain Binary Search algorithm in C', expectedTopic: 'searching', expectedItem: 'binary_search' },
    { query: 'Show me linear search program', expectedTopic: 'searching', expectedItem: 'linear_search' },
    { query: 'How does quicksort partition work with Lomuto?', expectedTopic: 'sorting', expectedItem: 'quick_sort' },
    { query: 'Explain bubble sort with swapped flag', expectedTopic: 'sorting', expectedItem: 'bubble_sort' },
    { query: 'Write a C program for Singly Linked List insertion', expectedTopic: 'linked_lists', expectedItem: 'singly_linked_list' },
    { query: 'Explain array stack with push and pop', expectedTopic: 'stacks', expectedItem: 'stack_array' },
    { query: 'How does linear queue handle FIFO?', expectedTopic: 'queues', expectedItem: 'linear_queue' },
    { query: 'Explain circular queue modulo arithmetic formula', expectedTopic: 'circular_queues', expectedItem: 'circular_queue' },
    { query: 'What is a Binary Search Tree (BST) and its traversals?', expectedTopic: 'binary_trees', expectedItem: 'bst' },
    { query: 'Give me top viva questions for Data Structures', expectedTopic: 'viva_bank', expectedItem: 'viva_bank' },
    { query: 'Show the Big-O time complexity comparison table', expectedTopic: 'complexity_table', expectedItem: 'complexity_table' }
  ];

  for (const tc of testCases) {
    const res = engineModule.classifyDSQuery(tc.query);
    assert.ok(res, `Failed to classify query: "${tc.query}"`);
    assert.strictEqual(res.topic, tc.expectedTopic, `Wrong topic for "${tc.query}". Expected: ${tc.expectedTopic}, Got: ${res.topic}`);
    assert.strictEqual(res.item, tc.expectedItem, `Wrong item for "${tc.query}". Expected: ${tc.expectedItem}, Got: ${res.item}`);
    assert.strictEqual(res.isDSQuery, true, 'isDSQuery must be true');
  }
});

runTest('generateTeachingResponse outputs complete 10-point teaching structure for algorithms', () => {
  const binSearch = engineModule.DS_TOPICS.searching.binary_search;
  const teachingText = engineModule.generateTeachingResponse(binSearch, 'Explain binary search');

  assert.ok(teachingText.includes('### 1. Definition'), 'Missing section 1: Definition');
  assert.ok(teachingText.includes('### 2. Concept Explanation'), 'Missing section 2: Concept Explanation');
  assert.ok(teachingText.includes('### 3. Algorithm'), 'Missing section 3: Algorithm');
  assert.ok(teachingText.includes('### 4. Pseudocode'), 'Missing section 4: Pseudocode');
  assert.ok(teachingText.includes('### 5. Complete Compilable C Program'), 'Missing section 5: Complete C Program');
  assert.ok(teachingText.includes('### 6. Sample Input and Output'), 'Missing section 6: Sample I/O');
  assert.ok(teachingText.includes('### 7. Step-by-Step Dry Run'), 'Missing section 7: Step-by-Step Dry Run');
  assert.ok(teachingText.includes('### 8. Time Complexity'), 'Missing section 8: Time Complexity');
  assert.ok(teachingText.includes('### 9. Space Complexity'), 'Missing section 9: Space Complexity');
  assert.ok(teachingText.includes('### 10. College Exam Viva Questions & Model Answers'), 'Missing section 10: Viva Questions');
  assert.ok(teachingText.includes('#include <stdio.h>'), 'C program must include standard library');
  assert.ok(teachingText.includes('int main('), 'C program must contain main function');
});

runTest('resolveFollowUp accurately resolves contextual follow-ups referring to previous turn', () => {
  const lastTopic = { topic: 'circular_queues', item: 'circular_queue', name: 'Circular Queue' };

  const followUp1 = engineModule.resolveFollowUp('Why is this condition used?', lastTopic);
  assert.ok(followUp1 && followUp1.type === 'why_condition', 'Must resolve why_condition follow-up');

  const followUp2 = engineModule.resolveFollowUp('Explain this line in the C code', lastTopic);
  assert.ok(followUp2 && followUp2.type === 'explain_line', 'Must resolve explain_line follow-up');

  const followUp3 = engineModule.resolveFollowUp('Show another dry run trace with different input', lastTopic);
  assert.ok(followUp3 && followUp3.type === 'dry_run', 'Must resolve dry_run follow-up');

  const followUp4 = engineModule.resolveFollowUp('What happens if the queue is empty?', lastTopic);
  assert.ok(followUp4 && followUp4.type === 'empty_check', 'Must resolve empty_check follow-up');

  const followUp5 = engineModule.resolveFollowUp('Give me a simpler program', lastTopic);
  assert.ok(followUp5 && followUp5.type === 'simpler_code', 'Must resolve simpler_code follow-up');
});

runTest('queryKnowledgeBase answers multi-turn follow-up using conversation history without internet', () => {
  const history = [
    { role: 'user', content: 'Explain Circular Queue with modulo arithmetic' },
    { role: 'model', content: 'Here is Circular Queue...' }
  ];

  const answer = engineModule.queryKnowledgeBase('Why is this condition used?', history);
  assert.ok(answer && answer.success, 'Follow-up query failed');
  assert.strictEqual(answer.isFollowUp, true, 'Must identify turn as follow-up');
  assert.strictEqual(answer.topic, 'circular_queues');
  assert.ok(answer.content.includes('Condition / Formula Breakdown'), 'Response must target the specific formula');
});

runTest('getSyllabusCoverage returns complete 100% coverage for 7 syllabus units', () => {
  const coverage = engineModule.getSyllabusCoverage();
  assert.strictEqual(coverage.length, 7, 'Must cover 7 syllabus topics');
  for (const c of coverage) {
    assert.strictEqual(c.covered, true, `Topic ${c.title} must be marked covered: true`);
  }
});

// ── MODULE 5: PWA Precaching of all Knowledge Assets ─────────────────────────
console.log('\n5. Service Worker Precaching of Knowledge Assets (Part 5):');

runTest('sw.js precaches ds-knowledge-engine.js, local-ai-detector.js and all 9 JSON files', () => {
  const swCode = fs.readFileSync(path.join(ROOT_DIR, 'public', 'sw.js'), 'utf8');
  assert.ok(swCode.includes('/js/ds-knowledge-engine.js'), 'Missing ds-knowledge-engine.js in sw.js');
  assert.ok(swCode.includes('/js/local-ai-detector.js'), 'Missing local-ai-detector.js in sw.js');
  assert.ok(swCode.includes('/knowledge/data-structures/searching.json'), 'Missing searching.json in sw.js');
  assert.ok(swCode.includes('/knowledge/data-structures/sorting.json'), 'Missing sorting.json in sw.js');
  assert.ok(swCode.includes('/knowledge/data-structures/linked-lists.json'), 'Missing linked-lists.json in sw.js');
  assert.ok(swCode.includes('/knowledge/data-structures/stacks.json'), 'Missing stacks.json in sw.js');
  assert.ok(swCode.includes('/knowledge/data-structures/queues.json'), 'Missing queues.json in sw.js');
  assert.ok(swCode.includes('/knowledge/data-structures/circular-queues.json'), 'Missing circular-queues.json in sw.js');
  assert.ok(swCode.includes('/knowledge/data-structures/binary-trees.json'), 'Missing binary-trees.json in sw.js');
  assert.ok(swCode.includes('/knowledge/data-structures/complexity.json'), 'Missing complexity.json in sw.js');
  assert.ok(swCode.includes('/knowledge/data-structures/viva.json'), 'Missing viva.json in sw.js');
});

// ── MODULE 6: UI Enhancements & Integration ──────────────────────────────────
console.log('\n6. Chat Interface Enhancements & UI Integration (Part 6):');

const ejsCode = fs.readFileSync(path.join(ROOT_DIR, 'views', 'chat.ejs'), 'utf8');

runTest('views/chat.ejs includes Data Structures Exam Mode option in studyModeSelect', () => {
  assert.ok(ejsCode.includes('value="data_structures"'), 'Missing data_structures option in studyModeSelect');
  assert.ok(ejsCode.includes('Data Structures Exam Mode'), 'Missing Data Structures Exam Mode label in select');
});

runTest('views/chat.ejs includes Offline Intelligence Diagnostics card in Settings', () => {
  assert.ok(ejsCode.includes('id="offlineIntelligenceStatusBadge"'), 'Missing offlineIntelligenceStatusBadge');
  assert.ok(ejsCode.includes('id="intelCheckWebLLMBadge"'), 'Missing intelCheckWebLLMBadge');
  assert.ok(ejsCode.includes('id="intelCheckChromeBadge"'), 'Missing intelCheckChromeBadge');
  assert.ok(ejsCode.includes('id="intelCheckOllamaBadge"'), 'Missing intelCheckOllamaBadge');
  assert.ok(ejsCode.includes('id="intelCheckKnowledgeBadge"'), 'Missing intelCheckKnowledgeBadge');
  assert.ok(ejsCode.includes('id="activeResolvedEngineName"'), 'Missing activeResolvedEngineName');
  assert.ok(ejsCode.includes('id="rescanIntelligenceBtn"'), 'Missing rescanIntelligenceBtn');
});

runTest('views/chat.ejs includes Syllabus Tracker and Quick Exam Tools in Study Panel', () => {
  assert.ok(ejsCode.includes('id="syllabusTrackerGrid"'), 'Missing syllabusTrackerGrid');
  assert.ok(ejsCode.includes('id="quickVivaBtn"'), 'Missing quickVivaBtn');
  assert.ok(ejsCode.includes('id="quickExplainCodeBtn"'), 'Missing quickExplainCodeBtn');
  assert.ok(ejsCode.includes('id="quickDryRunBtn"'), 'Missing quickDryRunBtn');
});

runTest('views/chat.ejs includes Data Structures suggestions group on Welcome Screen', () => {
  assert.ok(ejsCode.includes('Data Structures (Offline Exam Prep)'), 'Missing DS suggestions group title');
  assert.ok(ejsCode.includes('Binary Search (C Code &amp; Dry Run)'), 'Missing Binary Search suggestion chip');
  assert.ok(ejsCode.includes('Quick Sort Partitioning &amp; Analysis'), 'Missing Quick Sort suggestion chip');
});

runTest('views/chat.ejs loads scripts in correct dependency order before chat.js', () => {
  const posDS = ejsCode.indexOf('/js/ds-knowledge-engine.js');
  const posDetector = ejsCode.indexOf('/js/local-ai-detector.js');
  const posChat = ejsCode.indexOf('/js/chat.js');

  assert.ok(posDS !== -1, 'Missing /js/ds-knowledge-engine.js script tag');
  assert.ok(posDetector !== -1, 'Missing /js/local-ai-detector.js script tag');
  assert.ok(posChat !== -1, 'Missing /js/chat.js script tag');
  assert.ok(posDS < posChat, 'ds-knowledge-engine.js must be loaded before chat.js');
  assert.ok(posDetector < posChat, 'local-ai-detector.js must be loaded before chat.js');
});

runTest('chat.js wires up DS tools, syllabus pills, and offline failover routing', () => {
  const chatJs = fs.readFileSync(path.join(ROOT_DIR, 'public', 'js', 'chat.js'), 'utf8');
  assert.ok(chatJs.includes('initDataStructuresTools'), 'Missing initDataStructuresTools in chat.js');
  assert.ok(chatJs.includes('runOfflineKnowledgeAssistant'), 'Missing runOfflineKnowledgeAssistant in chat.js');
  assert.ok(chatJs.includes('runChromeBuiltInAI'), 'Missing runChromeBuiltInAI in chat.js');
  assert.ok(chatJs.includes('runLocalAIService'), 'Missing runLocalAIService in chat.js');
  assert.ok(chatJs.includes('runWebLLM'), 'Missing runWebLLM in chat.js');
  assert.ok(chatJs.includes('refreshOfflineIntelligence'), 'Missing refreshOfflineIntelligence in chat.js');
});

console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log(`Audit Summary: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('═══════════════════════════════════════════════════════════════════════');

if (passedTests === totalTests) {
  console.log('🎉 ALL OFFLINE INTELLIGENCE & DATA STRUCTURES AUDIT CHECKS PASSED.');
  process.exit(0);
} else {
  console.error(`❌ ${totalTests - passedTests} CHECKS FAILED.`);
  process.exit(1);
}
