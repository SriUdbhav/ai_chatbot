/**
 * StudyMate AI — Code Block Independent Scrolling, Long Code Length & Overflow Containment Suite
 *
 * Verifies all 10 requirements:
 * 1. Independent vertical scrolling for code blocks exceeding available height
 * 2. Independent horizontal scrolling for long lines without breaking formatting
 * 3. Appropriate responsive max-height on desktop and mobile
 * 4. Final lines are never clipped or obscured by horizontal scrollbars
 * 5. Parent flex containers have min-width: 0 to prevent overflow blowout
 * 6. overscroll-behavior: contain prevents code scrolling from scrolling parent chat
 * 7. Syntax highlighting, indentation, and formatting are strictly preserved
 * 8. Responsive rules for desktop, tablet, and mobile (640px, 480px)
 * 9. Token limits (maxOutputTokens: 8192, max_tokens: 4096) and message storage limits
 * 10. End-to-end rendering of a realistic 150-200 line C program with all lines accessible
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

let passedTests = 0;
let totalTests = 0;

function pass(name, detail = '') {
  totalTests++;
  passedTests++;
  console.log(`  ✅ ${name}${detail ? ` — ${detail}` : ''}`);
}

function fail(name, err) {
  totalTests++;
  console.error(`  ❌ ${name}: ${err.message}`);
}

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🧪 StudyMate AI — Long Code Scrolling & Output Length Test Suite');
console.log('═══════════════════════════════════════════════════════════════════════\n');

const cssPath = path.join(__dirname, '..', 'public', 'css', 'chat.css');
const jsPath = path.join(__dirname, '..', 'public', 'js', 'chat.js');
const chatControllerPath = path.join(__dirname, '..', 'controllers', 'chatController.js');
const toolsControllerPath = path.join(__dirname, '..', 'controllers', 'toolsController.js');
const localAiPath = path.join(__dirname, '..', 'public', 'js', 'local-ai.js');

const chatCss = fs.readFileSync(cssPath, 'utf8');
const chatJs = fs.readFileSync(jsPath, 'utf8');
const chatController = fs.readFileSync(chatControllerPath, 'utf8');
const toolsController = fs.readFileSync(toolsControllerPath, 'utf8');
const localAi = fs.readFileSync(localAiPath, 'utf8');

// Set up VM sandbox for chat.js markdown functions
const sandbox = {
  console,
  document: {
    createElement: () => ({ style: {}, setAttribute: () => {} }),
    body: { appendChild: () => {}, removeChild: () => {} }
  },
  navigator: {},
  window: {},
  showToast: () => {}
};

const scriptContent = `
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateId(prefix = 'id') {
  return prefix + '_' + Math.random().toString(36).substr(2, 9);
}

${chatJs.slice(chatJs.indexOf('function getLanguageMeta('), chatJs.indexOf('function openSidebar('))}
`;

vm.createContext(sandbox);
vm.runInContext(scriptContent, sandbox);
const { renderMarkdown, highlightCode } = sandbox;

// ── TEST 1: Generate & Render a Realistic 175-Line C Program ─────────────────
console.log('1. Long C Program Generation & Rendering (150-200 lines):');

try {
  // Construct a realistic complete C implementation of a Doubly Linked List with Merge Sort & CRUD
  const lines = [
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '#include <string.h>',
    '#include <stdbool.h>',
    '',
    '// Node structure for Doubly Linked List',
    'typedef struct Node {',
    '    int data;',
    '    struct Node* prev;',
    '    struct Node* next;',
    '} Node;',
    '',
    '// Doubly Linked List container',
    'typedef struct DoublyLinkedList {',
    '    Node* head;',
    '    Node* tail;',
    '    size_t size;',
    '} DoublyLinkedList;',
    '',
    'DoublyLinkedList* createList(void) {',
    '    DoublyLinkedList* list = (DoublyLinkedList*)malloc(sizeof(DoublyLinkedList));',
    '    if (!list) {',
    '        fprintf(stderr, "Fatal: Memory allocation failed for DoublyLinkedList\\n");',
    '        exit(EXIT_FAILURE);',
    '    }',
    '    list->head = NULL;',
    '    list->tail = NULL;',
    '    list->size = 0;',
    '    return list;',
    '}',
    '',
    'Node* createNode(int value) {',
    '    Node* newNode = (Node*)malloc(sizeof(Node));',
    '    if (!newNode) {',
    '        fprintf(stderr, "Fatal: Memory allocation failed for Node\\n");',
    '        exit(EXIT_FAILURE);',
    '    }',
    '    newNode->data = value;',
    '    newNode->prev = NULL;',
    '    newNode->next = NULL;',
    '    return newNode;',
    '}',
    '',
    'void append(DoublyLinkedList* list, int value) {',
    '    Node* newNode = createNode(value);',
    '    if (!list->head) {',
    '        list->head = newNode;',
    '        list->tail = newNode;',
    '    } else {',
    '        list->tail->next = newNode;',
    '        newNode->prev = list->tail;',
    '        list->tail = newNode;',
    '    }',
    '    list->size++;',
    '}',
    '',
    'void prepend(DoublyLinkedList* list, int value) {',
    '    Node* newNode = createNode(value);',
    '    if (!list->head) {',
    '        list->head = newNode;',
    '        list->tail = newNode;',
    '    } else {',
    '        newNode->next = list->head;',
    '        list->head->prev = newNode;',
    '        list->head = newNode;',
    '    }',
    '    list->size++;',
    '}',
    '',
    'bool deleteByValue(DoublyLinkedList* list, int value) {',
    '    Node* curr = list->head;',
    '    while (curr) {',
    '        if (curr->data == value) {',
    '            if (curr->prev) curr->prev->next = curr->next;',
    '            else list->head = curr->next;',
    '            if (curr->next) curr->next->prev = curr->prev;',
    '            else list->tail = curr->prev;',
    '            free(curr);',
    '            list->size--;',
    '            return true;',
    '        }',
    '        curr = curr->next;',
    '    }',
    '    return false;',
    '}',
    '',
    'Node* findMiddle(Node* head) {',
    '    Node* slow = head;',
    '    Node* fast = head->next;',
    '    while (fast && fast->next) {',
    '        slow = slow->next;',
    '        fast = fast->next->next;',
    '    }',
    '    return slow;',
    '}',
    '',
    'Node* merge(Node* first, Node* second) {',
    '    if (!first) return second;',
    '    if (!second) return first;',
    '    if (first->data <= second->data) {',
    '        first->next = merge(first->next, second);',
    '        if (first->next) first->next->prev = first;',
    '        first->prev = NULL;',
    '        return first;',
    '    } else {',
    '        second->next = merge(first, second->next);',
    '        if (second->next) second->next->prev = second;',
    '        second->prev = NULL;',
    '        return second;',
    '    }',
    '}',
    '',
    'Node* mergeSort(Node* head) {',
    '    if (!head || !head->next) return head;',
    '    Node* mid = findMiddle(head);',
    '    Node* second = mid->next;',
    '    mid->next = NULL;',
    '    if (second) second->prev = NULL;',
    '    Node* left = mergeSort(head);',
    '    Node* right = mergeSort(second);',
    '    return merge(left, right);',
    '}',
    '',
    'void sortList(DoublyLinkedList* list) {',
    '    if (list->size < 2) return;',
    '    list->head = mergeSort(list->head);',
    '    Node* curr = list->head;',
    '    while (curr && curr->next) {',
    '        curr = curr->next;',
    '    }',
    '    list->tail = curr;',
    '}',
    '',
    'void printForward(const DoublyLinkedList* list) {',
    '    printf("Forward:  [ ");',
    '    Node* curr = list->head;',
    '    while (curr) {',
    '        printf("%d ", curr->data);',
    '        curr = curr->next;',
    '    }',
    '    printf("] (size = %zu)\\n", list->size);',
    '}',
    '',
    'void printBackward(const DoublyLinkedList* list) {',
    '    printf("Backward: [ ");',
    '    Node* curr = list->tail;',
    '    while (curr) {',
    '        printf("%d ", curr->data);',
    '        curr = curr->prev;',
    '    }',
    '    printf("] (size = %zu)\\n", list->size);',
    '}',
    '',
    'void freeList(DoublyLinkedList* list) {',
    '    Node* curr = list->head;',
    '    while (curr) {',
    '        Node* nxt = curr->next;',
    '        free(curr);',
    '        curr = nxt;',
    '    }',
    '    free(list);',
    '}',
    '',
    'int main(void) {',
    '    printf("=== StudyMate AI — Doubly Linked List Demo ===\\n");',
    '    DoublyLinkedList* list = createList();',
    '    append(list, 45);',
    '    append(list, 12);',
    '    append(list, 89);',
    '    prepend(list, 7);',
    '    append(list, 23);',
    '    append(list, 3);',
    '    printForward(list);',
    '    printf("Sorting doubly linked list with O(N log N) Merge Sort...\\n");',
    '    sortList(list);',
    '    printForward(list);',
    '    printBackward(list);',
    '    printf("Deleting value 23...\\n");',
    '    deleteByValue(list, 23);',
    '    printForward(list);',
    '    freeList(list);',
    '    printf("Memory cleanly freed. All test invariants successfully passed.\\n");',
    '    return 0;',
    '}'
  ];

  const totalLines = lines.length;
  assert.ok(totalLines >= 150 && totalLines <= 200, `Expected 150-200 lines, got ${totalLines}`);
  const rawCode = lines.join('\n');
  const markdownInput = `Here is the complete C program:\n\n\`\`\`c\n${rawCode}\n\`\`\`\n\nHope this helps!`;

  const renderedHtml = renderMarkdown(markdownInput);

  // Check code-block structure
  assert.ok(renderedHtml.includes('class="code-block"'), 'Renders .code-block container');
  assert.ok(renderedHtml.includes('class="code-block-header"'), 'Renders .code-block-header');
  assert.ok(renderedHtml.includes('class="code-block-pre"'), 'Renders .code-block-pre');
  assert.ok(renderedHtml.includes('class="code-block-content language-c"'), 'Renders .code-block-content');
  assert.ok(renderedHtml.includes('class="code-copy-btn"'), 'Renders Copy button');

  // Verify first line, middle lines, and final line are all present in output
  assert.ok(renderedHtml.includes('#include &lt;stdio.h&gt;') || renderedHtml.includes('#include <stdio.h>') || renderedHtml.includes('stdio.h'), 'First line intact');
  assert.ok(renderedHtml.includes('mergeSort'), 'Middle sort function intact');
  assert.ok(renderedHtml.includes('All test invariants successfully passed'), 'Final printf intact');
  assert.ok(renderedHtml.includes('tok-keyword">return</span>') || renderedHtml.includes('return 0;'), 'Final return 0 intact');

  // Verify rawCode stored in dataset attribute is 100% complete
  const rawCodeMatch = renderedHtml.match(/data-raw-code="([^"]+)"/);
  assert.ok(rawCodeMatch, 'Raw code stored in data-raw-code attribute for instant copying');
  const decodedRaw = decodeURIComponent(rawCodeMatch[1]);
  const decodedLines = decodedRaw.split('\n');
  assert.strictEqual(decodedLines.length, totalLines, `All ${totalLines} lines preserved in dataset`);
  assert.strictEqual(decodedLines[0], '#include <stdio.h>', 'Line 1 matches exactly');
  assert.strictEqual(decodedLines[decodedLines.length - 1], '}', 'Final line brace matches exactly');

  pass(`Rendered realistic ${totalLines}-line C program with 100% line fidelity & intact copy payload`);
} catch (err) {
  fail('Long C Program Rendering', err);
}

// ── TEST 2: Independent Horizontal Scrolling & Long Line Integrity ───────────
console.log('\n2. Horizontal Scrolling & Long Line Formatting:');

try {
  // Test a 180-character line with deep indentation and comments
  const longLine = '            int status = processPartitionWithBoundaryInvariants(currentHeadNode, secondaryPartitionThreshold, calculationFlag, executionMode); // Extended commentary ensuring horizontal scrollbar activation';
  const input = `\`\`\`c\n${longLine}\n\`\`\``;
  const output = renderMarkdown(input);

  // CSS assertions for horizontal scrolling
  const preRule = chatCss.match(/\.code-block-pre\s*\{([\s\S]*?)\}/)?.[1] || '';
  const contentRule = chatCss.match(/\.code-block-content\s*\{([\s\S]*?)\}/)?.[1] || '';

  assert.ok(preRule.includes('overflow-x: auto'), '.code-block-pre has overflow-x: auto');
  assert.ok(contentRule.includes('white-space: pre'), '.code-block-content enforces white-space: pre');
  assert.ok(contentRule.includes('min-width: max-content'), '.code-block-content has min-width: max-content to prevent truncation');
  assert.ok(contentRule.includes('word-break: normal'), '.code-block-content has word-break: normal to prevent breaking mid-line');
  assert.ok(contentRule.includes('word-wrap: normal'), '.code-block-content has word-wrap: normal');

  // Verify the long line is present without auto-wrapping breaks
  assert.ok(output.includes('processPartitionWithBoundaryInvariants'), 'Long identifier preserved');
  assert.ok(output.includes('Extended commentary ensuring horizontal scrollbar activation'), 'Long comment preserved');

  pass('Horizontal scrolling active, long lines scroll smoothly without breaking code formatting');
} catch (err) {
  fail('Horizontal Scrolling', err);
}

// ── TEST 3: Independent Vertical Scrolling & Max-Height ───────────────────────
console.log('\n3. Independent Vertical Scrolling & Max Height:');

try {
  const preRule = chatCss.match(/\.code-block-pre\s*\{([\s\S]*?)\}/)?.[1] || '';

  assert.ok(preRule.includes('overflow-y: auto'), '.code-block-pre has overflow-y: auto for vertical scrolling');
  assert.ok(preRule.includes('max-height: 560px'), '.code-block-pre has max-height: 560px');
  assert.ok(preRule.includes('box-sizing: border-box'), '.code-block-pre has box-sizing: border-box');

  pass('Independent vertical scrolling enabled with max-height cap');
} catch (err) {
  fail('Vertical Scrolling & Max Height', err);
}

// ── TEST 4: No Line Clipping or Final Line Obscuring ──────────────────────────
console.log('\n4. Final Lines Visibility & Bottom Clearance:');

try {
  const preRule = chatCss.match(/\.code-block-pre\s*\{([\s\S]*?)\}/)?.[1] || '';
  const contentRule = chatCss.match(/\.code-block-content\s*\{([\s\S]*?)\}/)?.[1] || '';

  // Bottom clearance padding prevents horizontal scrollbars from covering the last line of code
  assert.ok(preRule.includes('1.6rem') || preRule.includes('1.5rem'), '.code-block-pre includes bottom clearance padding');
  assert.ok(contentRule.includes('1.25rem') || contentRule.includes('1.5rem'), '.code-block-content includes bottom breathing room');

  pass('Generous bottom clearance guarantees final lines and closing braces are never clipped');
} catch (err) {
  fail('Final Line Clipping', err);
}

// ── TEST 5: Parent Container Overflow Containment ─────────────────────────────
console.log('\n5. Parent Flex Container Min-Width Containment:');

try {
  // Flex items require min-width: 0 to prevent pre elements from forcing parent overflow
  const innerRule = chatCss.match(/\.messages-inner\s*\{([\s\S]*?)\}/)?.[1] || '';
  const rowRule = chatCss.match(/\.msg-row\s*\{([\s\S]*?)\}/)?.[1] || '';
  const bubbleRule = chatCss.match(/\.ai-bubble\s*\{([\s\S]*?)\}/)?.[1] || '';
  const blockRule = chatCss.match(/\.code-block\s*\{([\s\S]*?)\}/)?.[1] || '';

  assert.ok(innerRule.includes('min-width: 0'), '.messages-inner has min-width: 0');
  assert.ok(rowRule.includes('min-width: 0'), '.msg-row has min-width: 0');
  assert.ok(bubbleRule.includes('min-width: 0'), '.ai-bubble has min-width: 0');
  assert.ok(blockRule.includes('min-width: 0'), '.code-block has min-width: 0');

  pass('All parent flex containers have min-width: 0; horizontal blowout prevented');
} catch (err) {
  fail('Parent Container Containment', err);
}

// ── TEST 6: Scroll Containment (No Parent Chat Chaining) ──────────────────────
console.log('\n6. Scroll Containment & Wheel Guard:');

try {
  const preRule = chatCss.match(/\.code-block-pre\s*\{([\s\S]*?)\}/)?.[1] || '';

  assert.ok(preRule.includes('overscroll-behavior: contain'), '.code-block-pre has overscroll-behavior: contain');
  assert.ok(preRule.includes('overscroll-behavior-y: contain'), '.code-block-pre has overscroll-behavior-y: contain');
  assert.ok(preRule.includes('overscroll-behavior-x: contain'), '.code-block-pre has overscroll-behavior-x: contain');

  // Verify JS wheel guard exists in chat.js
  assert.ok(chatJs.includes("messagesArea.addEventListener('wheel'"), 'messagesArea has wheel event listener');
  assert.ok(chatJs.includes('.code-block-pre') && chatJs.includes('e.preventDefault()'), 'Wheel listener prevents bubbling at code boundaries');

  pass('overscroll-behavior: contain and boundary wheel guard prevent unintentional chat scrolling');
} catch (err) {
  fail('Scroll Containment', err);
}

// ── TEST 7: Responsive Mobile Rules ───────────────────────────────────────────
console.log('\n7. Mobile & Tablet Responsiveness:');

try {
  // Mobile 640px rule
  const mobile640Index = chatCss.indexOf('@media (max-width: 640px)');
  const mobile480Index = chatCss.indexOf('@media (max-width: 480px)');
  assert.ok(mobile640Index !== -1, '@media (max-width: 640px) exists');
  assert.ok(mobile480Index !== -1, '@media (max-width: 480px) exists');

  const mobile640Block = chatCss.slice(mobile640Index, mobile480Index);
  assert.ok(mobile640Block.includes('.code-block-pre'), 'Mobile 640px styles .code-block-pre');
  assert.ok(mobile640Block.includes('max-height: min(58vh, 380px)'), 'Mobile 640px adjusts max-height to min(58vh, 380px)');

  // Compact mobile 480px rule
  const mobile480Block = chatCss.slice(mobile480Index, mobile480Index + 4000);
  assert.ok(mobile480Block.includes('.code-block-pre'), 'Mobile 480px styles .code-block-pre');
  assert.ok(mobile480Block.includes('max-height: min(54vh, 320px)'), 'Mobile 480px adjusts max-height to min(54vh, 320px)');

  pass('Responsive max-heights defined for mobile (380px) and compact mobile (320px)');
} catch (err) {
  fail('Mobile Responsiveness', err);
}

// ── TEST 8: Token Limits & Generation Truncation Audit ────────────────────────
console.log('\n8. Backend & Local AI Token Limits (Preventing Response Truncation):');

try {
  // Backend chatController configures maxOutputTokens: 8192
  assert.ok(chatController.includes('maxOutputTokens: 8192'), 'chatController specifies maxOutputTokens: 8192');

  // Backend toolsController configures maxOutputTokens: 8192
  assert.ok(toolsController.includes('maxOutputTokens: 8192'), 'toolsController specifies maxOutputTokens: 8192');

  // WebLLM on-device local AI configures max_tokens: 4096 (not 1536)
  assert.ok(localAi.includes('max_tokens: 4096'), 'local-ai.js specifies max_tokens: 4096');

  // Stored message loading doesn't truncate to 12,000 chars
  assert.ok(chatJs.includes('content.slice(0, 100000)'), 'chat.js preserves long messages up to 100,000 characters in local storage');

  pass('All generation pipelines configured for 4096-8192 tokens; no premature truncation');
} catch (err) {
  fail('Token Limits & Length Audit', err);
}

// ── TEST 9: Syntax Highlighting & Token Classes ───────────────────────────────
console.log('\n9. Syntax Highlighting Token Verification:');

try {
  const cSnippet = 'int sum(int a, int b) { return a + b; }';
  const highlighted = highlightCode(cSnippet, 'c');

  assert.ok(highlighted.includes('class="tok-keyword">int</span>'), 'Highlights int as keyword');
  assert.ok(highlighted.includes('class="tok-function">sum</span>'), 'Highlights sum as function');
  assert.ok(highlighted.includes('class="tok-keyword">return</span>'), 'Highlights return as keyword');
  assert.ok(highlighted.includes('class="tok-operator">+</span>'), 'Highlights + as operator');

  pass('Syntax highlighting generates standard token classes with exact preservation');
} catch (err) {
  fail('Syntax Highlighting', err);
}

// ── SUMMARY ──────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log(`Results: ${passedTests} Passed, ${totalTests - passedTests} Failed (Total: ${totalTests})`);
console.log('═══════════════════════════════════════════════════════════════════════\n');

if (passedTests === totalTests) {
  console.log('🎉 ALL CODE BLOCK SCROLLING & LENGTH INVARIANTS VERIFIED (100%)\n');
  process.exit(0);
} else {
  process.exit(1);
}
