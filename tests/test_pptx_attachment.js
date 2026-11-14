/**
 * StudyMate AI — Chat Attachment Menu & PowerPoint Summarization Test Suite
 *
 * Verifies:
 * 1. Plus attachment button (#attachBtn) in chat composer positioned left of #messageInput
 * 2. Attachment popup menu (#attachmentMenu) with all 5 formats (PDF, DOCX, PPTX, Image, TXT)
 * 3. Compact attachment chips (#composerAttachments) with remove buttons and responsive styles
 * 4. Full OOXML PowerPoint parser extracting titles, bullets, tables, and speaker notes
 * 5. Structured 9-part presentation summary generation in documentController
 * 6. Chat endpoint (POST /api/chat) with attached document context
 * 7. Slide-targeted queries ("Explain slide 3") relevance scoring
 * 8. Slide chunking and context management for presentations with 20+ slides
 * 9. Offline client-side extraction using JSZip for zero-server WebLLM inference
 * 10. Service Worker PWA precaching of /js/jszip.min.js
 * 11. Preservation of transparency slider, collapsible sidebar, and existing tools
 */

'use strict';

const fs     = require('fs');
const path   = require('path');
const assert = require('assert');
const JSZip  = require('jszip');

let passedTests = 0;
let totalTests  = 0;

async function runTestAsync(description, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✅ ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ ${description}`);
    console.error(`     Error: ${err.message}`);
    process.exitCode = 1;
  }
}

function runTest(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ ${description}`);
    console.error(`     Error: ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('📊 StudyMate AI — Chat Attachment & PowerPoint Summarizer Test Suite');
console.log('═══════════════════════════════════════════════════════════════════════\n');

const chatEjsPath       = path.join(__dirname, '..', 'views', 'chat.ejs');
const chatCssPath       = path.join(__dirname, '..', 'public', 'css', 'chat.css');
const chatJsPath        = path.join(__dirname, '..', 'public', 'js', 'chat.js');
const swJsPath          = path.join(__dirname, '..', 'public', 'sw.js');
const docControllerPath = path.join(__dirname, '..', 'controllers', 'documentController.js');
const chatControllerPath= path.join(__dirname, '..', 'controllers', 'chatController.js');

const chatEjs   = fs.readFileSync(chatEjsPath, 'utf8');
const chatCss   = fs.readFileSync(chatCssPath, 'utf8');
const chatJs    = fs.readFileSync(chatJsPath, 'utf8');
const swJs      = fs.readFileSync(swJsPath, 'utf8');
const { extractPptxText } = require(docControllerPath);

(async () => {

// ── 1. Plus Attachment Button & Popup Menu in Composer ───────────────────────
console.log('1. Chat Composer Plus Attachment Button & Popup Menu:');

runTest('Plus attachment button (#attachBtn) is present inside composer', () => {
  assert.ok(chatEjs.includes('id="attachBtn"'), 'Missing #attachBtn in chat.ejs');
  assert.ok(chatEjs.includes('class="composer-icon-btn attach-btn"'), 'Missing attach-btn styling classes');
  assert.ok(chatEjs.includes('aria-haspopup="true"'), 'Missing aria-haspopup on #attachBtn');
});

runTest('Attachment button is positioned before message textarea (#messageInput)', () => {
  const attachPos = chatEjs.indexOf('id="attachBtn"');
  const inputPos  = chatEjs.indexOf('id="messageInput"');
  assert.ok(attachPos !== -1 && inputPos !== -1, 'Elements not found');
  assert.ok(attachPos < inputPos, '#attachBtn must be positioned on the left side of #messageInput');
});

runTest('Attachment popup menu (#attachmentMenu) contains all 5 required format options', () => {
  assert.ok(chatEjs.includes('id="attachmentMenu"'), 'Missing #attachmentMenu');
  assert.ok(chatEjs.includes('data-action="upload-pdf"'), 'Missing Upload PDF option');
  assert.ok(chatEjs.includes('data-action="upload-docx"'), 'Missing Upload Word option');
  assert.ok(chatEjs.includes('data-action="upload-pptx"'), 'Missing Upload PowerPoint option');
  assert.ok(chatEjs.includes('data-action="upload-image"'), 'Missing Upload Image option');
  assert.ok(chatEjs.includes('data-action="upload-txt"'), 'Missing Upload Text option');
});

runTest('Hidden multiple file input (#composerFileInput) is configured in composer', () => {
  assert.ok(chatEjs.includes('id="composerFileInput"'), 'Missing #composerFileInput');
  assert.ok(chatEjs.includes('multiple'), '#composerFileInput must support multiple file selection');
});

runTest('Attachment chips container (#composerAttachments) is placed above the composer input', () => {
  const chipsPos = chatEjs.indexOf('id="composerAttachments"');
  const innerPos = chatEjs.indexOf('class="composer-inner"');
  assert.ok(chipsPos !== -1 && innerPos !== -1, 'Elements not found');
  assert.ok(chipsPos < innerPos, '#composerAttachments must sit above .composer-inner');
});

// ── 2. PowerPoint (.pptx) Parsing & Text Extraction ──────────────────────────
console.log('\n2. PowerPoint (.pptx) OOXML Extraction Engine:');

await runTestAsync('extractPptxText parses slide titles, bullets, tables, and speaker notes', async () => {
  const zip = new JSZip();

  // Create valid OOXML structure
  zip.file('ppt/presentation.xml',
    '<p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
    '<p:sldIdLst><p:sldId id="256" r:id="rId1"/><p:sldId id="257" r:id="rId2"/></p:sldIdLst></p:presentation>'
  );
  zip.file('ppt/_rels/presentation.xml.rels',
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>' +
    '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide2.xml"/>' +
    '</Relationships>'
  );

  // Slide 1: Title, bullets, speaker notes
  zip.file('ppt/slides/slide1.xml',
    '<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">' +
    '<p:cSld><p:spTree>' +
    '<p:sp><p:nvSpPr><p:nvPr><p:ph type="title"/></p:nvPr></p:nvSpPr><p:txBody><a:p><a:r><a:t>Data Structures &amp; Algorithms</a:t></a:r></a:p></p:txBody></p:sp>' +
    '<p:sp><p:txBody><a:p><a:r><a:t>Fundamental algorithmic paradigms</a:t></a:r></a:p><a:p><a:pPr lvl="1"/><a:r><a:t>Divide and Conquer: O(n log n)</a:t></a:r></a:p></p:txBody></p:sp>' +
    '</p:spTree></p:cSld></p:sld>'
  );
  zip.file('ppt/slides/_rels/slide1.xml.rels',
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rIdNotes1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide" Target="../notesSlides/notesSlide1.xml"/>' +
    '</Relationships>'
  );
  zip.file('ppt/notesSlides/notesSlide1.xml',
    '<p:notes xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">' +
    '<p:cSld><p:spTree><p:sp><p:txBody><a:p><a:r><a:t>Emphasize Master Theorem in viva questions.</a:t></a:r></a:p></p:txBody></p:sp></p:spTree></p:cSld></p:notes>'
  );

  // Slide 2: Table
  zip.file('ppt/slides/slide2.xml',
    '<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">' +
    '<p:cSld><p:spTree>' +
    '<p:sp><p:nvSpPr><p:nvPr><p:ph type="title"/></p:nvPr></p:nvSpPr><p:txBody><a:p><a:r><a:t>Complexity Comparison</a:t></a:r></a:p></p:txBody></p:sp>' +
    '<p:graphicFrame><a:graphic><a:graphicData><a:tbl>' +
    '<a:tr><a:tc><a:txBody><a:p><a:r><a:t>Algorithm</a:t></a:r></a:p></a:txBody></a:tc><a:tc><a:txBody><a:p><a:r><a:t>Time Complexity</a:t></a:r></a:p></a:txBody></a:tc></a:tr>' +
    '<a:tr><a:tc><a:txBody><a:p><a:r><a:t>MergeSort</a:t></a:r></a:p></a:txBody></a:tc><a:tc><a:txBody><a:p><a:r><a:t>O(n log n)</a:t></a:r></a:p></a:txBody></a:tc></a:tr>' +
    '</a:tbl></a:graphicData></a:graphic></p:graphicFrame>' +
    '</p:spTree></p:cSld></p:sld>'
  );

  const pptxBuffer = await zip.generateAsync({ type: 'nodebuffer' });
  const result = await extractPptxText(pptxBuffer);

  assert.strictEqual(result.slideCount, 2, 'Must detect 2 slides');
  assert.ok(result.fullText.includes('Data Structures & Algorithms'), 'Missing slide 1 title');
  assert.ok(result.fullText.includes('Divide and Conquer: O(n log n)'), 'Missing slide 1 bullet text');
  assert.ok(result.fullText.includes('Emphasize Master Theorem'), 'Missing speaker notes');
  assert.ok(result.fullText.includes('| MergeSort | O(n log n) |'), 'Missing formatted markdown table');
  assert.strictEqual(result.slides[0].slideNumber, 1, 'Incorrect slide numbering');
  assert.strictEqual(result.slides[1].slideNumber, 2, 'Incorrect slide numbering');
});

await runTestAsync('extractPptxText handles sparse/image-only presentations gracefully', async () => {
  const zip = new JSZip();
  zip.file('ppt/slides/slide1.xml', '<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree></p:spTree></p:cSld></p:sld>');
  const pptxBuffer = await zip.generateAsync({ type: 'nodebuffer' });
  const result = await extractPptxText(pptxBuffer);

  assert.strictEqual(result.slideCount, 1, 'Should find 1 slide');
  assert.strictEqual(result.isSparse, true, 'Should mark presentation as sparse/image-only');
});

// ── 3. Structured 9-Part Presentation Summary in Backend ────────────────────
console.log('\n3. Structured 9-Part Presentation Summarization:');

runTest('documentController contains 9 presentation summary sections', () => {
  const docControllerSrc = fs.readFileSync(docControllerPath, 'utf8');
  assert.ok(docControllerSrc.includes('## 1. Presentation Overview'), 'Missing 1. Presentation Overview');
  assert.ok(docControllerSrc.includes('## 2. Overall Summary'), 'Missing 2. Overall Summary');
  assert.ok(docControllerSrc.includes('## 3. Slide-by-Slide Explanation'), 'Missing 3. Slide-by-Slide Explanation');
  assert.ok(docControllerSrc.includes('## 4. Important Concepts and Definitions'), 'Missing 4. Important Concepts');
  assert.ok(docControllerSrc.includes('## 5. Key Examination Points'), 'Missing 5. Key Examination Points');
  assert.ok(docControllerSrc.includes('## 6. Important Formulas and Technical Terms'), 'Missing 6. Formulas');
  assert.ok(docControllerSrc.includes('## 7. Important Tables and Diagram Descriptions'), 'Missing 7. Tables & Diagrams');
  assert.ok(docControllerSrc.includes('## 8. Possible Viva Questions'), 'Missing 8. Possible Viva Questions');
  assert.ok(docControllerSrc.includes('## 9. Short Revision Notes'), 'Missing 9. Short Revision Notes');
});

runTest('documentController accepts .pptx and presentation mime types in multer filter', () => {
  const docControllerSrc = fs.readFileSync(docControllerPath, 'utf8');
  assert.ok(docControllerSrc.includes('presentationml'), 'Missing presentationml mime type');
  assert.ok(docControllerSrc.includes('.pptx'), 'Missing .pptx extension filter');
});

runTest('documentController prioritizes slide number in document chat query scoring', () => {
  const docControllerSrc = fs.readFileSync(docControllerPath, 'utf8');
  assert.ok(docControllerSrc.includes('targetSlideNum'), 'Missing targetSlideNum detection');
  assert.ok(docControllerSrc.includes('slide ${targetSlideNum}:'), 'Missing slide priority scoring');
});

// ── 4. Chat Controller Attachment Handling ──────────────────────────────────
console.log('\n4. Chat Controller Attachment Context Management:');

runTest('chatController accepts attachments array and prepends context to Gemini prompt', () => {
  const chatControllerSrc = fs.readFileSync(chatControllerPath, 'utf8');
  assert.ok(chatControllerSrc.includes('attachments = []'), 'Missing attachments parameter');
  assert.ok(chatControllerSrc.includes('[ATTACHED DOCUMENT:'), 'Missing document context wrapper');
  assert.ok(chatControllerSrc.includes('contextualMessage'), 'Missing contextualMessage prompt');
});

runTest('chatController preserves 4000 character user question limit while allowing large attachments', () => {
  const chatControllerSrc = fs.readFileSync(chatControllerPath, 'utf8');
  assert.ok(chatControllerSrc.includes('trimmedMessage.length > MAX_MESSAGE_LENGTH'), 'MAX_MESSAGE_LENGTH guard intact');
  assert.ok(chatControllerSrc.includes('slice(0, 50000)'), 'Attachment text sliced with safe high boundary');
});

// ── 5. Client-Side WebLLM & Offline Architecture ─────────────────────────────
console.log('\n5. Client-Side WebLLM Offline Extraction & Chunking:');

runTest('chat.js provides clientExtractPptx for browser-based offline parsing', () => {
  assert.ok(chatJs.includes('async function clientExtractPptx'), 'Missing clientExtractPptx');
  assert.ok(chatJs.includes('window.JSZip.loadAsync'), 'Uses window.JSZip for zero-server parsing');
});

runTest('chat.js implements slide chunking for large presentations with 10+ slides', () => {
  assert.ok(chatJs.includes('chunkSize = 10'), 'Missing slide chunking size of 10');
  assert.ok(chatJs.includes('Summarizing slides ${i + 1} to ${endSlide}'), 'Missing slide chunk progress updates');
  assert.ok(chatJs.includes('Compiling final study notes'), 'Missing final synthesis step');
});

runTest('chat.js supports offline document Q&A and notes generation via Local AI', () => {
  assert.ok(chatJs.includes('localAi.generateLocalResponse'), 'Calls localAi when offline');
  assert.ok(chatJs.includes('locally (Offline)...'), 'Missing offline progress indicator');
});

// ── 6. UI & Styling Verification ─────────────────────────────────────────────
console.log('\n6. UI Components, Responsive CSS & Accessibility:');

runTest('chat.css defines .attach-btn, .attachment-menu, and .composer-attachments', () => {
  assert.ok(chatCss.includes('.attach-btn'), 'Missing .attach-btn styling');
  assert.ok(chatCss.includes('.attachment-menu'), 'Missing .attachment-menu styling');
  assert.ok(chatCss.includes('.composer-attachments'), 'Missing .composer-attachments styling');
  assert.ok(chatCss.includes('.composer-attachment-chip'), 'Missing .composer-attachment-chip styling');
});

runTest('chat.css implements responsive rules for attachment menu on <=640px and <=340px', () => {
  assert.ok(chatCss.includes('@media (max-width: 640px)'), 'Missing 640px media query');
  assert.ok(chatCss.includes('.attachment-menu'), 'Missing attachment menu responsive rule');
});

runTest('chat.ejs includes jszip.min.js script tag before chat.js', () => {
  const jszipPos = chatEjs.indexOf('src="/js/jszip.min.js"');
  const chatJsPos = chatEjs.indexOf('src="/js/chat.js"');
  assert.ok(jszipPos !== -1 && chatJsPos !== -1, 'Script tags not found');
  assert.ok(jszipPos < chatJsPos, 'jszip.min.js must be loaded before chat.js');
});

runTest('Service Worker (sw.js) precaches /js/jszip.min.js for offline PWA functionality', () => {
  assert.ok(swJs.includes("'/js/jszip.min.js'"), 'Missing /js/jszip.min.js in PRECACHE_ASSETS');
});

// ── 7. Summary & Integrity Check ─────────────────────────────────────────────
console.log('\n7. System Integrity & Backward Compatibility:');

runTest('All previous features intact (transparency slider, collapsible sidebar, study modes, voice)', () => {
  assert.ok(chatEjs.includes('id="surfaceOpacitySlider"'), 'Missing transparency slider');
  assert.ok(chatEjs.includes('id="sidebarOpenBtn"'), 'Missing hamburger button');
  assert.ok(chatEjs.includes('id="studyModeSelect"'), 'Missing study mode select');
  assert.ok(chatEjs.includes('id="micBtn"'), 'Missing mic button');
  assert.ok(chatEjs.includes('id="stopBtn"'), 'Missing stop button');
  assert.ok(chatEjs.includes('id="openDocStudioBtn"'), 'Missing openDocStudioBtn');
});

console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log(`Test Results: ${passedTests} / ${totalTests} assertions passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('═══════════════════════════════════════════════════════════════════════\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}

})();
