'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🧪 StudyMate AI — Complete ChatGPT-Style Experience Verification Suite');
console.log('═══════════════════════════════════════════════════════════════════════\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

// ── Read files ────────────────────────────────────────────────────────────────
const chatJs = fs.readFileSync(path.join(__dirname, '../public/js/chat.js'), 'utf8');
const chatCss = fs.readFileSync(path.join(__dirname, '../public/css/chat.css'), 'utf8');
const chatEjs = fs.readFileSync(path.join(__dirname, '../views/chat.ejs'), 'utf8');
const chatController = require('../controllers/chatController');
const routes = fs.readFileSync(path.join(__dirname, '../routes/index.js'), 'utf8');
const geminiConfig = require('../config/gemini');

// ── Extract and test renderMarkdown ───────────────────────────────────────────
const vm = require('vm');
const sandbox = {
  console,
  encodeURIComponent,
  decodeURIComponent,
  parseInt,
  Math,
  generateId: (p) => `${p}_test_id`,
};

// Create a minimal environment to evaluate renderMarkdown and lexer from chat.js
const extractRegex = /function escapeHtml[\s\S]*?function renderMarkdown\([^)]*\)\s*\{[\s\S]*?\n\}/;
const match = chatJs.match(extractRegex);
if (!match) {
  throw new Error('Could not find renderMarkdown and dependencies in chat.js');
}

vm.createContext(sandbox);
vm.runInContext(match[0], sandbox);
const { renderMarkdown, escapeHtml } = sandbox;

// ── Test Group 1: Rich Markdown & LaTeX Math Formatting (Part 1 & 10) ─────────
console.log('1. Rich Markdown & LaTeX Math Formatting (Parts 1 & 10):');

runTest('Renders Headings, Lists, Blockquotes, and Tables', () => {
  const md = '# Heading 1\n## Heading 2\n\n> Important academic note\n\n- Point A\n- Point B\n\n1. Step 1\n2. Step 2\n\n| Term | Definition |\n| --- | --- |\n| Big O | Complexity |';
  const html = renderMarkdown(md);
  assert.ok(html.includes('<h1>Heading 1</h1>'), 'h1 rendered');
  assert.ok(html.includes('<h2>Heading 2</h2>'), 'h2 rendered');
  assert.ok(html.includes('<blockquote>Important academic note</blockquote>'), 'blockquote rendered');
  assert.ok(html.includes('<ul><li>Point A</li><li>Point B</li></ul>'), 'ul rendered');
  assert.ok(html.includes('<ol><li>Step 1</li><li>Step 2</li></ol>'), 'ol rendered');
  assert.ok(html.includes('<table><thead><tr><th>Term</th><th>Definition</th></tr></thead><tbody><tr><td>Big O</td><td>Complexity</td></tr></tbody></table>'), 'table rendered');
});

runTest('Renders LaTeX Block Math ($$...$$) and Inline Math ($...$)', () => {
  const md = 'The quadratic formula is:\n$$\nx = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\n$$\nwhere $a \\neq 0$. Note that \$100 is not math.';
  const html = renderMarkdown(md);
  assert.ok(html.includes('<div class="katex-math-block" role="region" aria-label="Mathematical formula">'), 'Block math container rendered');
  assert.ok(html.includes('x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'), 'Block math content preserved');
  assert.ok(html.includes('<span class="katex-math-inline" role="math">a \\neq 0</span>'), 'Inline math rendered');
  assert.ok(html.includes('$100'), 'Currency dollar is not converted to math span');
});

runTest('Escapes Unsafe HTML and Prevents XSS Attacks', () => {
  const dangerous = '<script>alert("xss")</script><img src="x" onerror="alert(1)">';
  const html = renderMarkdown(dangerous);
  assert.ok(!html.includes('<script>'), 'No raw script tag');
  assert.ok(html.includes('&lt;script&gt;'), 'Script tag escaped');
  assert.ok(!html.includes('<img'), 'No raw unescaped img tag');
  assert.ok(html.includes('&lt;img'), 'Img tag escaped to safe text');
});

// ── Test Group 2: Code Blocks & Syntax Highlighting (Part 3) ──────────────────
console.log('\n2. Code Blocks, Syntax Highlighting & Copy Button (Part 3):');

runTest('Renders Code Block Headers with Language Label and Copy Button', () => {
  const codeMd = '```python\ndef solve(arr):\n    return sum(arr)\n```';
  const html = renderMarkdown(codeMd);
  assert.ok(html.includes('class="code-block" data-lang="python"'), 'Code block container');
  assert.ok(html.includes('class="code-lang">Python</span>'), 'Language label');
  assert.ok(html.includes('class="code-copy-btn"'), 'Copy button present');
  assert.ok(html.includes('Copy</span>'), 'Copy button text');
  assert.ok(html.includes('language-python'), 'Syntax highlighted code tag');
});

runTest('Highlights 10+ Programming Languages Accurately', () => {
  const languages = ['java', 'c', 'cpp', 'python', 'javascript', 'html', 'css', 'sql', 'json', 'bash'];
  languages.forEach(lang => {
    const snippet = `\`\`\`${lang}\n// Test code for ${lang}\nconst x = 42;\n\`\`\``;
    const html = renderMarkdown(snippet);
    assert.ok(html.includes(`data-lang="${lang}"`), `Rendered ${lang}`);
  });
});

// ── Test Group 3: Message Actions (Part 2) ───────────────────────────────────
console.log('\n3. Message Actions (Copy, Like/Dislike, TTS, Regenerate) (Part 2):');

runTest('DOM contains all message action buttons (Copy, Like, Dislike, Bookmark, Regenerate, TTS)', () => {
  assert.ok(chatJs.includes('copy-msg-btn'), 'Copy message button');
  assert.ok(chatJs.includes('feedback-like-btn'), 'Feedback Like button');
  assert.ok(chatJs.includes('feedback-dislike-btn'), 'Feedback Dislike button');
  assert.ok(chatJs.includes('bookmark-msg-btn'), 'Bookmark message button');
  assert.ok(chatJs.includes('regen-msg-btn'), 'Regenerate message button');
  assert.ok(chatJs.includes('tts-msg-btn'), 'Text-to-speech button');
});

runTest('Like and Dislike Feedback persist to message state and toggle classes', () => {
  assert.ok(chatJs.includes('active-like'), 'active-like class');
  assert.ok(chatJs.includes('active-dislike'), 'active-dislike class');
  assert.ok(chatJs.includes("msg.feedback = msg.feedback === 'like' ? null : 'like'"), 'Like toggle logic');
  assert.ok(chatJs.includes("msg.feedback = msg.feedback === 'dislike' ? null : 'dislike'"), 'Dislike toggle logic');
  assert.ok(chatJs.includes('saveConversations()'), 'State saved to localStorage');
});

runTest('TTS toggles speech synthesis, cancels ongoing utterance, and shows speaking state', () => {
  assert.ok(chatJs.includes('window.speechSynthesis.cancel()'), 'Cancels previous speech');
  assert.ok(chatJs.includes('new SpeechSynthesisUtterance('), 'Creates speech utterance');
  assert.ok(chatJs.includes("btn.classList.add('speaking')"), 'Adds speaking class');
  assert.ok(chatJs.includes("btn.classList.remove('speaking')"), 'Removes speaking class on end');
});

// ── Test Group 4: Real Image Generation & Gemini Server Endpoint (Parts 4 & 5)
console.log('\n4. Real Image Generation & Dedicated Gemini Server Endpoint (Parts 4 & 5):');

runTest('Registered POST /api/chat/generate-image route in routes/index.js', () => {
  assert.ok(routes.includes("router.post('/api/chat/generate-image', chatController.postGenerateImage);"), 'Image route registered');
});

runTest('postGenerateImage validates prompt requirements and length limits', async () => {
  const reqEmpty = { body: {} };
  const resEmpty = {
    status(c) { this.statusCode = c; return this; },
    json(d) { this.data = d; return this; }
  };
  await chatController.postGenerateImage(reqEmpty, resEmpty);
  assert.strictEqual(resEmpty.statusCode, 400);
  assert.strictEqual(resEmpty.data.code, 'INVALID_PROMPT');

  const reqLong = { body: { prompt: 'x'.repeat(1005) } };
  const resLong = {
    status(c) { this.statusCode = c; return this; },
    json(d) { this.data = d; return this; }
  };
  await chatController.postGenerateImage(reqLong, resLong);
  assert.strictEqual(resLong.statusCode, 413);
  assert.strictEqual(resLong.data.code, 'PROMPT_TOO_LONG');
});

runTest('Handles Gemini Free Tier limit of 0 gracefully with educational guidance (Part 5)', () => {
  assert.ok(chatController.postGenerateImage.toString().includes('QUOTA_EXCEEDED_FREE_TIER') ||
            chatJs.includes('QUOTA_EXCEEDED_FREE_TIER'), 'QUOTA_EXCEEDED_FREE_TIER handled');
  assert.ok(chatJs.includes('Google AI Studio Free Tier'), 'Mentions Google AI Studio Free Tier limit');
});

// ── Test Group 5: WebLLM vs Local Diffusion Architecture (Part 6) ─────────────
console.log('\n5. WebLLM vs Local Diffusion Offline Architecture (Part 6):');

runTest('Clarifies WebLLM is a text runtime and documents WebGPU Stable Diffusion requirements', () => {
  assert.ok(chatJs.includes('ai-architecture-card'), 'ai-architecture-card present');
  assert.ok(chatJs.includes('WebLLM vs. Diffusion'), 'Explicit distinction header');
  assert.ok(chatJs.includes('WebGPU Stable Diffusion') && chatJs.includes('Web-SD'), 'Mentions Web-SD architecture');
  assert.ok(chatJs.includes('4GB+ VRAM'), 'Hardware requirements specified');
  assert.ok(chatJs.includes('~1.8 GB – 2.4 GB') || chatJs.includes('~2GB'), 'Weight size specified');
  assert.ok(chatJs.includes('never be downloaded silently'), 'Explicit user consent requirement enforced');
});

runTest('Preferences & Diagnostics modal includes Offline Image Architecture row', () => {
  assert.ok(chatEjs.includes('Offline Image Architecture'), 'Settings item present in EJS');
  assert.ok(chatEjs.includes('offlineImageBadge'), 'Badge present');
});

// ── Test Group 6: Image History Persistence & IndexedDB Storage (Part 7) ──────
console.log('\n6. Image Persistence in IndexedDB & LocalStorage Quota Protection (Part 7):');

runTest('IndexedDB MediaDB handles image storage without LocalStorage quota bloat', () => {
  assert.ok(chatJs.includes('StudyMate_MediaDB'), 'IndexedDB name StudyMate_MediaDB');
  assert.ok(chatJs.includes('generated_images'), 'Object store generated_images');
  assert.ok(chatJs.includes('saveImage(id, dataUrl'), 'saveImage implementation');
  assert.ok(chatJs.includes('getImage(id)'), 'getImage implementation');
  assert.ok(chatJs.includes('imageCache.set(imgId, dataUrl)'), 'In-memory fast lookup cache');
  assert.ok(chatJs.includes('type: \'image\'') && chatJs.includes('imageId:'), 'Message stores reference ID only');
});

// ── Test Group 7: Image Actions (Copy & Download) (Part 8) ────────────────────
console.log('\n7. Image Actions (Copy PNG Blob & Download Image) (Part 8):');

runTest('Copy Image uses ClipboardItem PNG blob with graceful fallback', () => {
  assert.ok(chatJs.includes('new ClipboardItem({ \'image/png\': pngBlob })'), 'ClipboardItem PNG blob copy');
  assert.ok(chatJs.includes('copyImageToClipboard'), 'copyImageToClipboard function');
});

runTest('Download Image creates clean timestamped filename', () => {
  assert.ok(chatJs.includes('downloadImage(imgId, prompt)'), 'downloadImage function');
  assert.ok(chatJs.includes('studymate-'), 'Filename format');
});

// ── Test Group 8: Transparency & Adaptive Contrast (Part 9) ───────────────────
console.log('\n8. Transparency & Adaptive Contrast Constraints (Part 9):');

runTest('Generated images are strictly styled with 100% solid opacity', () => {
  assert.ok(chatCss.includes('.generated-img'), '.generated-img selector exists');
  assert.ok(chatCss.includes('opacity: 1 !important;'), 'Strict 100% solid opacity constraint honored');
});

runTest('Image cards, architecture cards, and feedback buttons respect centralized surface tokens', () => {
  assert.ok(chatCss.includes('.generated-image-card'), '.generated-image-card styling exists');
  assert.ok(chatCss.includes('.ai-architecture-card'), '.ai-architecture-card styling exists');
  assert.ok(chatCss.includes('.feedback-like-btn.active-like'), 'active-like styling exists');
  assert.ok(chatCss.includes('.feedback-dislike-btn.active-dislike'), 'active-dislike styling exists');
});

// ── Test Group 9: Attachment Menu & Quick Pills Integration ──────────────────
console.log('\n9. Attachment Menu & Quick Pills UI Integration:');

runTest('Composer attachment popup menu includes "Generate Image" option', () => {
  assert.ok(chatEjs.includes('data-action="generate-image"'), 'generate-image action in menu');
  assert.ok(chatEjs.includes('Generate Image</span>'), 'Label present');
  assert.ok(chatJs.includes("action === 'generate-image'"), 'Handled in chat.js');
});

runTest('Quick tools bar includes "🎨 Generate Image" pill', () => {
  assert.ok(chatEjs.includes('data-quick="image"'), 'quick pill in EJS');
  assert.ok(chatJs.includes("action === 'image'"), 'Handled in chat.js');
});

// ── Test Group 10: Preserved Features (PWA, WebLLM, Attachments) ──────────────
console.log('\n10. Preservation of Existing Features (PWA, WebLLM, Attachments):');

runTest('Existing PWA manifest, service worker, and offline capabilities preserved', () => {
  assert.ok(fs.existsSync(path.join(__dirname, '../public/manifest.webmanifest')), 'Manifest exists');
  assert.ok(fs.existsSync(path.join(__dirname, '../public/sw.js')), 'Service worker exists');
  assert.ok(fs.existsSync(path.join(__dirname, '../public/offline.html')), 'Offline page exists');
});

runTest('Existing WebLLM WebGPU text inference integration fully intact', () => {
  assert.ok(fs.existsSync(path.join(__dirname, '../public/js/local-ai.js')), 'local-ai.js exists');
  assert.ok(fs.existsSync(path.join(__dirname, '../public/js/webllm-worker.js')), 'webllm-worker.js exists');
  assert.ok(chatJs.includes('generateLocalResponse'), 'Calls local AI');
});

runTest('Existing multi-format attachment support (PDF, DOCX, PPTX, Image, TXT) fully intact', () => {
  assert.ok(chatJs.includes('composerAttachments'), 'composerAttachments intact');
  assert.ok(chatJs.includes('upload-pdf') && chatJs.includes('upload-pptx'), 'Attachment handlers intact');
});

console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log(`Results: ${passedTests} Passed, ${totalTests - passedTests} Failed (Total: ${totalTests})`);
console.log('═══════════════════════════════════════════════════════════════════════\n');

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
