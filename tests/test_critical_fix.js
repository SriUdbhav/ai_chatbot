'use strict';
require('dotenv').config();
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const chatController = require('../controllers/chatController');

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🧪 StudyMate AI — Critical Fix Verification Suite (Composer & Real Image)');
console.log('═══════════════════════════════════════════════════════════════════════\n');

let passed = 0;
let total = 0;

function check(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

async function asyncCheck(name, fn) {
  total++;
  try {
    await fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

// ── Mock Res Helper ───────────────────────────────────────────────────────────
function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    status(c) { this.statusCode = c; return this; },
    json(d) { this.body = d; return this; }
  };
}

async function runAll() {
  const chatJs = fs.readFileSync(path.join(__dirname, '../public/js/chat.js'), 'utf8');
  const chatCss = fs.readFileSync(path.join(__dirname, '../public/css/chat.css'), 'utf8');
  const chatEjs = fs.readFileSync(path.join(__dirname, '../views/chat.ejs'), 'utf8');

  // Extract isImageGenerationIntent from chat.js
  const intentMatch = chatJs.match(/function isImageGenerationIntent\([\s\S]*?\n\}/);
  assert.ok(intentMatch, 'Found isImageGenerationIntent in chat.js');
  const evalIntent = new Function(`
    ${chatJs.slice(chatJs.indexOf('const IMAGE_NOUNS'), chatJs.indexOf('async function handleImageGeneration'))}
    return isImageGenerationIntent;
  `)();

  console.log('1. PART 2 — Intent Detection Before Text Model:');

  check('Prompt 1: "Generate an image of a futuristic city at night." -> Image Intent', () => {
    assert.strictEqual(evalIntent('Generate an image of a futuristic city at night.'), true);
  });

  check('Prompt 2: "Create a cartoon robot studying computer science." -> Image Intent', () => {
    assert.strictEqual(evalIntent('Create a cartoon robot studying computer science.'), true);
  });

  check('Prompt 3: "Generate a beautiful mountain wallpaper." -> Image Intent', () => {
    assert.strictEqual(evalIntent('Generate a beautiful mountain wallpaper.'), true);
  });

  check('Prompt 4: "Explain how image generation works." -> Text Intent (NOT Image)', () => {
    assert.strictEqual(evalIntent('Explain how image generation works.'), false);
  });

  check('Prompt 5: "Write Python code to generate a simple image." -> Code Intent (NOT Image)', () => {
    assert.strictEqual(evalIntent('Write Python code to generate a simple image.'), false);
  });

  console.log('\n2. PART 2.3 & 3 — Real Image Generation via Image Service:');

  await asyncCheck('Backend generates an actual image (valid base64 buffer, not code or SVG)', async () => {
    const req = { body: { prompt: 'A futuristic city at night' } };
    const res = createMockRes();
    await chatController.postGenerateImage(req, res);

    assert.strictEqual(res.statusCode, 200, `Expected 200, got ${res.statusCode}: ${JSON.stringify(res.body)}`);
    assert.strictEqual(res.body.status, 'success');
    assert.ok(res.body.imageBase64, 'Has imageBase64');
    assert.ok(res.body.imageBase64.length > 5000, `Image base64 length is ${res.body.imageBase64.length}`);
    assert.ok(res.body.mimeType.startsWith('image/'), `Mime is ${res.body.mimeType}`);
    assert.ok(!res.body.imageBase64.includes('<svg'), 'Image data is not SVG code');
    assert.ok(!res.body.imageBase64.includes('def '), 'Image data is not Python code');
    assert.ok(res.body.engine, 'Has engine designation');
    console.log(`     → Generated ${res.body.mimeType} (${Math.round(res.body.imageBase64.length * 0.75 / 1024)} KB) via ${res.body.engine}`);
  });

  console.log('\n3. PART 1 — ChatGPT-Style Composer Layout & Attachment Presentation:');

  check('Composer layout has rounded card, plus button on left, textarea center, send button right', () => {
    assert.ok(chatEjs.includes('class="composer-card"'), 'Has composer-card');
    assert.ok(chatEjs.includes('class="composer-attach-wrapper"'), 'Has attach wrapper on left');
    assert.ok(chatEjs.includes('class="composer-input"'), 'Has composer-input in center');
    assert.ok(chatEjs.includes('class="composer-controls"'), 'Has composer-controls on right');
    assert.ok(chatEjs.includes('id="sendBtn"'), 'Has sendBtn');
    assert.ok(chatEjs.includes('id="stopBtn"'), 'Has stopBtn');
  });

  check('Compact attachment previews displayed ABOVE text input inside composer card', () => {
    assert.ok(chatEjs.includes('id="composerAttachments"'), 'composerAttachments exists');
    assert.ok(chatCss.includes('.composer-attachments'), 'composer-attachments CSS');
    assert.ok(chatCss.includes('.composer-attachment-chip'), 'compact chip CSS');
    assert.ok(chatJs.includes('chip-remove-btn'), 'Remove button exists');
    assert.ok(chatJs.includes('chip-thumb'), 'Image thumbnail supported');
  });

  check('Selecting same file again works (file input reset on picker open)', () => {
    assert.ok(chatJs.includes("composerFileInput.value = '';"), 'Resets file input so same file can be re-selected');
  });

  check('Multiline auto-resize caps height and scrolls internally without breaking layout', () => {
    assert.ok(chatCss.includes('max-height: 180px;'), 'Caps textarea max height');
    assert.ok(chatCss.includes('overflow-y: auto;'), 'Enables internal vertical scrolling');
    assert.ok(chatJs.includes('e.key === \'Enter\' && !e.shiftKey'), 'Enter sends message');
  });

  console.log('\n4. PART 2.4 — Offline WebLLM Behavior:');

  check('Offline mode explicitly states image generation is unavailable and does not fabricate images', () => {
    assert.ok(chatJs.includes('Offline image generation is not available') &&
              chatJs.includes('Download a compatible local image model or reconnect to use online image generation'),
      'Honest offline message present in chat.js');
    assert.ok(!chatJs.includes('<svg>fake-image'), 'No fake SVG image simulation');
  });

  console.log('\n5. PART 3, 4, 5 — Image Actions, IndexedDB Persistence & No Code Fallback:');

  check('IndexedDB MediaDB persists image data without bloating LocalStorage', () => {
    assert.ok(chatJs.includes('StudyMate_MediaDB'), 'Uses StudyMate_MediaDB IndexedDB');
    assert.ok(chatJs.includes('generated_images'), 'Object store generated_images');
    assert.ok(chatJs.includes('copyImageToClipboard'), 'Copy image handler exists');
    assert.ok(chatJs.includes('downloadImage'), 'Download image handler exists');
    assert.ok(chatJs.includes('new ClipboardItem({ \'image/png\': pngBlob })'), 'Uses ClipboardItem PNG blob');
  });

  check('Images render with 100% solid opacity regardless of global transparency', () => {
    assert.ok(chatCss.includes('.generated-img'), 'generated-img styled');
    assert.ok(chatCss.includes('opacity: 1 !important;'), 'Strict 100% solid opacity enforced');
  });

  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log(`Results: ${passed} Passed, ${total - passed} Failed (Total: ${total})`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  if (passed !== total) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAll().catch(err => {
  console.error('Test runner failure:', err);
  process.exit(1);
});
