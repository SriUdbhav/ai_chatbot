/**
 * StudyMate AI — ChatGPT-Style Code Blocks & Copy Button Verification Suite
 *
 * Verifies PART 10:
 * 1. Automatic code block rendering across Java, C, C++, Python, JavaScript/Node, HTML, CSS, SQL, JSON, Bash
 * 2. Proper header rendering with language name and right-aligned Copy button
 * 3. Indentation, line breaks, and special characters preserved
 * 4. Multi-language syntax highlighting tokens
 * 5. Multiple code blocks in a single AI response
 * 6. Streaming support (incomplete Markdown code fences handled gracefully)
 * 7. Exact code clipboard copying with "Copied!" feedback and fallback
 * 8. Theme and global transparency compatibility (high opacity floor, WCAG AAA text)
 * 9. Code block responsiveness and containment without horizontal page overflow
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

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
console.log('🧪 StudyMate AI — ChatGPT-Style Code Blocks & Copy Verification Suite');
console.log('═══════════════════════════════════════════════════════════════════════\n');

const cssPath = path.join(__dirname, '..', 'public', 'css', 'chat.css');
const jsPath = path.join(__dirname, '..', 'public', 'js', 'chat.js');
const chatCss = fs.readFileSync(cssPath, 'utf8');
const chatJs = fs.readFileSync(jsPath, 'utf8');

// Extract renderMarkdown, getLanguageMeta, and highlightCode from chat.js for testing
const vm = require('vm');
const sandbox = {
  console: console,
  document: {
    createElement: () => ({ style: {}, setAttribute: () => {} }),
    body: { appendChild: () => {}, removeChild: () => {} }
  },
  navigator: {},
  window: {},
  showToast: () => {}
};

// Extract functions
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

const { renderMarkdown, getLanguageMeta, highlightCode } = sandbox;

// ─────────────────────────────────────────────────────────────────
// SECTION 1: Automatic Multi-Language Code Block Rendering
// ─────────────────────────────────────────────────────────────────
console.log('1. Multi-Language Automatic Code Block Detection & Rendering:');

const testLanguages = [
  {
    lang: 'java',
    display: 'Java',
    code: `public class BinarySearch {\n    public static int search(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == target) return mid;\n            if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}`
  },
  {
    lang: 'c',
    display: 'C',
    code: `#include <stdio.h>\n\nint main(void) {\n    printf("Memory address of main: %p\\n", (void*)main);\n    return 0;\n}`
  },
  {
    lang: 'cpp',
    display: 'C++',
    code: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4, 5};\n    for (int n : nums) {\n        std::cout << n << " ";\n    }\n    return 0;\n}`
  },
  {
    lang: 'python',
    display: 'Python',
    code: `def quicksort(arr):\n    # Divide and conquer algorithm\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)`
  },
  {
    lang: 'javascript',
    display: 'JavaScript',
    code: `async function fetchStudentData(studentId) {\n  try {\n    const response = await fetch(\`/api/students/\${studentId}\`);\n    if (!response.ok) throw new Error("Student not found");\n    return await response.json();\n  } catch (err) {\n    console.error("API error:", err);\n  }\n}`
  },
  {
    lang: 'html',
    display: 'HTML',
    code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>StudyMate App</title>\n</head>\n<body>\n  <div id="app" class="container">\n    <h1>Welcome to StudyMate AI</h1>\n  </div>\n</body>\n</html>`
  },
  {
    lang: 'css',
    display: 'CSS',
    code: `.chat-composer {\n  display: flex;\n  align-items: center;\n  background-color: var(--app-surface-card);\n  border: 1px solid var(--app-border-card);\n  border-radius: 12px;\n  padding: 0.75rem 1rem;\n}`
  },
  {
    lang: 'sql',
    display: 'SQL',
    code: `SELECT s.student_id, s.name, AVG(g.score) AS average_gpa\nFROM students s\nINNER JOIN grades g ON s.student_id = g.student_id\nWHERE g.semester = 'Fall 2026'\nGROUP BY s.student_id, s.name\nHAVING AVG(g.score) >= 3.5\nORDER BY average_gpa DESC;`
  },
  {
    lang: 'json',
    display: 'JSON',
    code: `{\n  "appName": "StudyMate AI",\n  "version": "2.0.0",\n  "features": ["WebLLM", "PWA", "Adaptive Contrast"],\n  "offlineEnabled": true\n}`
  },
  {
    lang: 'bash',
    display: 'Bash',
    code: `#!/usr/bin/env bash\n# Start offline StudyMate server\nset -euo pipefail\necho "Starting local development server..."\nnpm run dev --port=3000`
  }
];

try {
  testLanguages.forEach(test => {
    const rawMarkdown = `Here is the ${test.display} code:\n\`\`\`${test.lang}\n${test.code}\n\`\`\`\nLet me know if you need any adjustments.`;
    const rendered = renderMarkdown(rawMarkdown);

    // 1. Must contain .code-block container
    assert.ok(rendered.includes('<div class="code-block"'), `${test.display} renders inside .code-block`);

    // 2. Must display the correct language label
    assert.ok(rendered.includes(test.display), `${test.display} displays correct language label in header`);

    // 3. Must contain .code-copy-btn with data-code-id
    assert.ok(rendered.includes('class="code-copy-btn"'), `${test.display} contains copy button`);
    assert.ok(rendered.includes('data-code-id="'), `${test.display} copy button has data-code-id`);

    // 4. Must preserve indentation and linebreaks in pre/code
    assert.ok(rendered.includes('<pre class="code-block-pre">'), `${test.display} renders .code-block-pre`);
    assert.ok(rendered.includes('class="code-block-content'), `${test.display} renders .code-block-content`);

    // 5. Must store raw encoded code in data-raw-code for 100% faithful copying
    assert.ok(rendered.includes('data-raw-code="'), `${test.display} stores data-raw-code`);

    // 6. Must contain syntax highlighting tokens
    assert.ok(rendered.includes('tok-'), `${test.display} includes syntax highlighted tokens`);

    // 7. Explanations outside must remain normal paragraphs
    assert.ok(rendered.includes('<p>Here is the'), `${test.display} keeps leading explanation outside code block`);
    assert.ok(rendered.includes('<p>Let me know if you need'), `${test.display} keeps trailing explanation outside code block`);
  });

  pass('All 10 common programming languages correctly detected and formatted with syntax tokens');
} catch (err) {
  fail('Multi-Language Code Rendering', err);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 2: Indentation, Linebreaks, and Special Characters
// ─────────────────────────────────────────────────────────────────
console.log('\n2. Indentation, Linebreaks & Special Character Preservation:');

try {
  const complexCode = `#include <iostream>\n#include <vector>\n\n// Check if vector contains <T> elements\ntemplate <typename T>\nbool checkVector(const std::vector<T>& v) {\n    if (v.empty() && 1 < 2 && 5 > 3) {\n        std::cout << "Empty & Valid!" << std::endl;\n        return false;\n    }\n    return true;\n}`;

  const rendered = renderMarkdown(`\`\`\`cpp\n${complexCode}\n\`\`\``);

  // Check no raw unescaped HTML tag leakage (e.g. <iostream> or <T> disappearing)
  assert.ok(!rendered.includes('<iostream>'), '<iostream> properly escaped and not rendered as HTML tag');
  assert.ok(!rendered.includes('<typename T>'), '<typename T> properly escaped');
  assert.ok(rendered.includes('&lt;iostream&gt;'), 'HTML entities &lt; and &gt; safely escaped');

  // Check special characters in data-raw-code
  const rawCodeMatch = rendered.match(/data-raw-code="([^"]+)"/);
  assert.ok(rawCodeMatch, 'data-raw-code attribute found');
  const decoded = decodeURIComponent(rawCodeMatch[1]);
  assert.strictEqual(decoded, complexCode, 'Decoded raw code exactly matches original indentation and characters');

  pass('Indentation, line breaks, angle brackets, and ampersands completely preserved without DOM corruption');
} catch (err) {
  fail('Special Character Preservation', err);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 3: Multiple Code Blocks in One Response
// ─────────────────────────────────────────────────────────────────
console.log('\n3. Multiple Code Blocks in a Single AI Response:');

try {
  const multiResponse = `
Here is a comparison between Python and Java implementations:

### 1. Python Solution
\`\`\`python
def add(a, b):
    return a + b
\`\`\`

### 2. Java Solution
\`\`\`java
public class Calc {
    public static int add(int a, int b) {
        return a + b;
    }
}
\`\`\`

Both solutions have O(1) time complexity.
`;

  const rendered = renderMarkdown(multiResponse);

  const blockCount = (rendered.match(/class="code-block"/g) || []).length;
  assert.strictEqual(blockCount, 2, 'Exactly 2 code blocks rendered');

  assert.ok(rendered.includes('<span class="code-lang">Python</span>'), 'Python header rendered');
  assert.ok(rendered.includes('<span class="code-lang">Java</span>'), 'Java header rendered');
  assert.ok(rendered.includes('<h3>1. Python Solution</h3>'), 'Headings outside blocks preserved');
  assert.ok(rendered.includes('<p>Both solutions have O(1) time complexity.</p>'), 'Concluding text preserved');

  pass('Multiple code blocks in a single response render independently with isolated headers and copy buttons');
} catch (err) {
  fail('Multiple Code Blocks', err);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 4: Streaming Incomplete Markdown Code Fences
// ─────────────────────────────────────────────────────────────────
console.log('\n4. Streaming Incomplete Code Fence Handling:');

try {
  // Simulate chunked streaming text where closing fence ``` has not arrived yet
  const streamingText = `I will write a Python function for you:\n\`\`\`python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)`;

  const rendered = renderMarkdown(streamingText);

  // Incomplete block must NOT break layout; it should render as a live code block
  assert.ok(rendered.includes('<div class="code-block"'), 'Incomplete streaming code block rendered as .code-block');
  assert.ok(rendered.includes('<span class="code-lang">Python</span>'), 'Language header displayed during streaming');
  assert.ok(rendered.includes('fibonacci'), 'In-progress code body preserved inside code block');
  assert.ok(decodeURIComponent(rendered.match(/data-raw-code="([^"]+)"/)[1]).includes('fibonacci(n - 1) + fibonacci(n - 2)'), 'data-raw-code preserves full in-progress code string');
  assert.ok(rendered.includes('<p>I will write a Python function for you:</p>'), 'Intro text kept outside');

  pass('Incomplete streaming code blocks render cleanly without layout breaks or raw text leaks');
} catch (err) {
  fail('Streaming Incomplete Code Fences', err);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 5: Copy Button Behavior & Fallback Architecture
// ─────────────────────────────────────────────────────────────────
console.log('\n5. Copy Button Behavior, Event Listeners & Fallback:');

try {
  // Verify chat.js contains copyToClipboard with async clipboard and textarea fallback
  assert.ok(chatJs.includes('async function copyToClipboard(text, btn, label)'), 'copyToClipboard defined');
  assert.ok(chatJs.includes('navigator.clipboard.writeText'), 'Uses navigator.clipboard.writeText');
  assert.ok(chatJs.includes("document.execCommand('copy')"), 'Includes document.execCommand fallback');

  // Verify button temporary state and reset
  assert.ok(chatJs.includes("btn.classList.add('copied')"), 'Adds .copied class on click');
  assert.ok(chatJs.includes('setTimeout('), 'Sets timeout to revert button');
  assert.ok(chatJs.includes("btn.classList.remove('copied')"), 'Reverts .copied class after timeout');

  // Verify code copy delegation in messagesArea and global document
  assert.ok(chatJs.includes("e.target.closest('.code-copy-btn')"), 'Delegates click to .code-copy-btn');
  assert.ok(chatJs.includes('decodeURIComponent(codeEl.dataset.rawCode)'), 'Decodes pristine raw code from dataset');

  pass('Copy button extracts exact raw code, provides Copied! feedback, and supports textarea fallback');
} catch (err) {
  fail('Copy Button Architecture', err);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 6: CSS Appearance, Contrast & Containment
// ─────────────────────────────────────────────────────────────────
console.log('\n6. CSS Design, Transparency & Overflow Containment:');

try {
  // 1. ChatGPT-style code block rules
  assert.ok(chatCss.includes('.code-block {'), '.code-block defined in chat.css');
  assert.ok(chatCss.includes('.code-block-header {'), '.code-block-header defined in chat.css');
  assert.ok(chatCss.includes('.code-lang-label {'), '.code-lang-label defined in chat.css');
  assert.ok(chatCss.includes('.code-copy-btn {'), '.code-copy-btn defined in chat.css');
  assert.ok(chatCss.includes('.code-block-pre {'), '.code-block-pre defined in chat.css');
  assert.ok(chatCss.includes('.code-block-content {'), '.code-block-content defined in chat.css');

  // 2. High-opacity floor for code block background
  const codeBlockMatch = chatCss.match(/\.code-block\s*\{([\s\S]*?)\}/);
  assert.ok(codeBlockMatch && codeBlockMatch[1].includes('calc(0.12 * var(--app-surface-opacity) + 0.88)'), 'Code block background enforces safe 88%+ opacity floor');

  // 3. Overflow containment (no horizontal page overflow)
  assert.ok(codeBlockMatch && codeBlockMatch[1].includes('max-width: 100%'), '.code-block has max-width: 100%');
  assert.ok(codeBlockMatch && codeBlockMatch[1].includes('overflow: hidden'), '.code-block has overflow: hidden');

  const preMatch = chatCss.match(/\.code-block-pre\s*\{([\s\S]*?)\}/);
  assert.ok(preMatch && preMatch[1].includes('overflow-x: auto'), '.code-block-pre scrolls horizontally for long lines');
  assert.ok(preMatch && preMatch[1].includes('max-height: 560px'), '.code-block-pre scrolls vertically for long code blocks');

  // 4. Copied button visual feedback
  assert.ok(chatCss.includes('.code-copy-btn.copied'), '.code-copy-btn.copied green confirmation styling defined');

  // 5. Syntax tokens defined
  const tokens = ['keyword', 'string', 'comment', 'function', 'type', 'number', 'operator'];
  tokens.forEach(tok => {
    assert.ok(chatCss.includes(`.tok-${tok}`), `.tok-${tok} syntax token styled`);
  });

  // 6. Dark Theme overrides
  assert.ok(chatCss.includes('body[data-theme="dark"] .code-block'), 'Dark theme override for .code-block defined');
  assert.ok(chatCss.includes('body[data-theme="dark"] .code-block-header'), 'Dark theme override for .code-block-header defined');

  pass('Code block appearance, high opacity floor, syntax token palette, and horizontal containment verified');
} catch (err) {
  fail('CSS Design & Containment', err);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 7: System Compatibility & Non-Disruption
// ─────────────────────────────────────────────────────────────────
console.log('\n7. System Compatibility & Integration:');

try {
  // Markdown elements: lists, tables, blockquotes, bold, italic
  const mdSample = `
# Title
> Important note

| Language | Paradigm |
| --- | --- |
| Python | Multi-paradigm |
| Haskell | Functional |

- Item 1
- Item 2

\`\`\`python
print("test")
\`\`\`
`;
  const rendered = renderMarkdown(mdSample);

  assert.ok(rendered.includes('<h1>Title</h1>'), 'Markdown headings continue working');
  assert.ok(rendered.includes('<blockquote>'), 'Markdown blockquotes continue working');
  assert.ok(rendered.includes('<table>'), 'Markdown tables continue working');
  assert.ok(rendered.includes('<ul>'), 'Markdown lists continue working');
  assert.ok(rendered.includes('class="code-block"'), 'Code block rendered alongside other Markdown elements');

  pass('Complete compatibility with existing Markdown formatting and streaming architecture preserved');
} catch (err) {
  fail('System Compatibility', err);
}

console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log(`Results: ${passedTests} Passed, ${totalTests - passedTests} Failed (Total: ${totalTests})`);
console.log('═══════════════════════════════════════════════════════════════════════\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
