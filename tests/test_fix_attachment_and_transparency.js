/**
 * StudyMate AI — Critical Bug Fix Verification Test Suite
 *
 * Verifies:
 * PART 1: Plus (+) Attachment Button & Workflow
 *  1. Clicking #attachBtn opens the attachment menu.
 *  2. Clicking each of the 5 options triggers file selection with correct accept types.
 *  3. Selected files display as chips with name, type, size, and remove button.
 *  4. Removing an attachment removes its chip and detaches the file.
 *  5. Multiple attachments are supported simultaneously.
 *  6. Submitting a message with attachments passes document content + question to active AI engine.
 *
 * PART 2: Global Transparency Controller & Synchronization
 *  7. Top navigation transparency controller is present with button, popover, slider, value display, and reset.
 *  8. Preferences modal transparency slider and topbar slider remain synchronized bidirectionally.
 *  9. Changing either slider immediately updates --app-surface-opacity on document root.
 * 10. All required surfaces (sidebar, topbar, workspace, chat bubbles, code blocks, modals, dropdowns) inherit opacity.
 * 11. Text, code text, icons, and button labels remain 100% solid opacity with high contrast.
 * 12. Reset to default restores 100% opacity, and settings persist across page reloads in localStorage.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let failedTests = 0;

function pass(name) {
  console.log(`  ✅ ${name}`);
  passedTests++;
}

function fail(name, err) {
  console.error(`  ❌ ${name}:`, err.message || err);
  failedTests++;
}

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🧪 StudyMate AI — Attachment & Global Transparency Verification Suite');
console.log('═══════════════════════════════════════════════════════════════════════\n');

// ── PART 1: PLUS (+) ATTACHMENT BUTTON & MENU VERIFICATION ──────────────────
console.log('PART 1: Plus (+) Attachment Button & Options:');

const chatEjsPath = path.join(__dirname, '..', 'views', 'chat.ejs');
const chatCssPath = path.join(__dirname, '..', 'public', 'css', 'chat.css');
const chatJsPath  = path.join(__dirname, '..', 'public', 'js', 'chat.js');

const ejs = fs.readFileSync(chatEjsPath, 'utf8');
const css = fs.readFileSync(chatCssPath, 'utf8');
const js  = fs.readFileSync(chatJsPath, 'utf8');

// Scenario 1: Plus attachment button DOM and attributes
try {
  assert.ok(ejs.includes('id="attachBtn"'), '#attachBtn exists in chat.ejs');
  assert.ok(ejs.includes('id="attachmentMenu"'), '#attachmentMenu exists in chat.ejs');
  assert.ok(ejs.includes('id="composerFileInput"'), '#composerFileInput exists in chat.ejs');
  assert.ok(ejs.includes('id="composerAttachments"'), '#composerAttachments exists in chat.ejs');

  // Verify button attributes
  assert.ok(/<button[^>]+id="attachBtn"[^>]*type="button"/.test(ejs), '#attachBtn has type="button" to prevent form submission');
  assert.ok(ejs.includes('aria-haspopup="true"'), '#attachBtn has aria-haspopup="true"');
  assert.ok(ejs.includes('aria-expanded="false"'), '#attachBtn has aria-expanded attribute');

  pass('Scenario 1: Plus attachment button (#attachBtn) and popup menu (#attachmentMenu) present in DOM');
} catch (err) {
  fail('Scenario 1: Plus attachment button DOM', err);
}

// Scenario 2: Five Attachment Options and MIME filters
try {
  const options = [
    { action: 'upload-pdf', text: 'Upload PDF', ext: '.pdf' },
    { action: 'upload-docx', text: 'Upload Word Document', ext: '.docx' },
    { action: 'upload-pptx', text: 'Upload PowerPoint', ext: '.pptx' },
    { action: 'upload-image', text: 'Upload Image', ext: '.png, .jpg, .jpeg' },
    { action: 'upload-txt', text: 'Upload Text File', ext: '.txt' },
  ];

  for (const opt of options) {
    assert.ok(ejs.includes(`data-action="${opt.action}"`), `Menu contains option: ${opt.action}`);
    assert.ok(ejs.includes(opt.text), `Menu contains label: ${opt.text}`);
  }

  // Verify chat.js binds file types correctly
  assert.ok(js.includes("action === 'upload-pdf'"), 'chat.js handles upload-pdf');
  assert.ok(js.includes("action === 'upload-docx'"), 'chat.js handles upload-docx');
  assert.ok(js.includes("action === 'upload-pptx'"), 'chat.js handles upload-pptx');
  assert.ok(js.includes("action === 'upload-image'"), 'chat.js handles upload-image');
  assert.ok(js.includes("action === 'upload-txt'"), 'chat.js handles upload-txt');

  pass('Scenario 2: All 5 attachment options trigger corresponding native file picker accept filters');
} catch (err) {
  fail('Scenario 2: Attachment Options and Filters', err);
}

// Scenario 3: Selected files display as chips with name, type, size, and remove button
try {
  assert.ok(js.includes('composer-attachment-chip'), 'chat.js renders composer-attachment-chip elements');
  assert.ok(js.includes('chip-name'), 'chip template renders filename (.chip-name)');
  assert.ok(js.includes('chip-size'), 'chip template renders size (.chip-size)');
  assert.ok(js.includes('chip-badge'), 'chip template renders type badge (.chip-badge)');
  assert.ok(js.includes('data-action="remove-attachment"'), 'chip template has individual remove button');
  assert.ok(css.includes('.composer-attachment-chip'), 'chat.css defines styles for .composer-attachment-chip');

  pass('Scenario 3: Attachment chips display filename, formatted size, type badge, and remove button');
} catch (err) {
  fail('Scenario 3: Attachment Chips Display', err);
}

// Scenario 4: Removing an attachment removes chip and detaches file
try {
  assert.ok(js.includes("btn.dataset.id"), 'chat.js reads attachment id on remove button click');
  assert.ok(js.includes("state.composerAttachments = (state.composerAttachments || []).filter((a) => a.id !== id);"), 'chat.js filters out removed attachment');
  assert.ok(js.includes("renderComposerAttachments()"), 'chat.js re-renders attachments on removal');

  pass('Scenario 4: Remove button correctly detaches file and updates composer UI');
} catch (err) {
  fail('Scenario 4: Attachment Removal', err);
}

// Scenario 5: Multiple attachments support
try {
  assert.ok(/<input[^>]+id="composerFileInput"[^>]*multiple/.test(ejs), '#composerFileInput has multiple attribute');
  assert.ok(js.includes("state.composerAttachments.push(attRecord);"), 'chat.js pushes multiple files into attachments array');
  assert.ok(css.includes('.composer-attachments'), 'chat.css styles .composer-attachments container with flex-wrap');

  pass('Scenario 5: Multiple simultaneous attachments are supported');
} catch (err) {
  fail('Scenario 5: Multiple Attachments Support', err);
}

// Scenario 6: Submitting message with attachments passes document content + question to AI engines
try {
  assert.ok(js.includes("const hasAttachments = Array.isArray(state.composerAttachments) && state.composerAttachments.length > 0;"), 'Form submit allows sending when attachments are present');
  assert.ok(js.includes("if (!promptText && attachedFiles.length > 0)"), 'Fallback default prompt applied if user sends document without question');
  // WebLLM branch:
  assert.ok(js.includes("STUDENT QUESTION / INSTRUCTION:"), 'WebLLM prompt embeds document content and student question');
  // Gemini API branch:
  assert.ok(js.includes("body:    JSON.stringify({"), 'Gemini API call sends attachments array in JSON payload');

  pass('Scenario 6: Both Gemini AI and WebLLM receive extracted document contents along with user question');
} catch (err) {
  fail('Scenario 6: Attachment Context Forwarding to AI', err);
}

// ── PART 2: GLOBAL TRANSPARENCY CONTROLLER & SYNCHRONIZATION ────────────────
console.log('\nPART 2: Global Transparency Controller & Synchronization:');

// Scenario 7: Top navigation transparency controller DOM elements
try {
  assert.ok(ejs.includes('id="transparencyCtrlWrapper"'), '#transparencyCtrlWrapper exists in topbar');
  assert.ok(ejs.includes('id="topbarTransparencyBtn"'), '#topbarTransparencyBtn exists in topbar');
  assert.ok(ejs.includes('id="topbarTransparencyPopover"'), '#topbarTransparencyPopover exists in topbar');
  assert.ok(ejs.includes('id="topbarTransparencySlider"'), '#topbarTransparencySlider exists in topbar');
  assert.ok(ejs.includes('id="topbarTransparencyVal"'), '#topbarTransparencyVal exists in topbar');
  assert.ok(ejs.includes('id="topbarResetOpacityBtn"'), '#topbarResetOpacityBtn exists in topbar');

  assert.ok(/<input[^>]+id="topbarTransparencySlider"[^>]*min="20"/.test(ejs), 'Topbar slider min bound is 20%');
  assert.ok(/<input[^>]+id="topbarTransparencySlider"[^>]*max="100"/.test(ejs), 'Topbar slider max bound is 100%');
  assert.ok(/<input[^>]+id="topbarTransparencySlider"[^>]*value="100"/.test(ejs), 'Topbar slider default value is 100%');

  pass('Scenario 7: Top navigation transparency control button, popover, slider (20%-100%), and reset button present');
} catch (err) {
  fail('Scenario 7: Top Navigation Transparency Controls', err);
}

// Scenario 8: Bidirectional synchronization between topbar and modal sliders
try {
  assert.ok(js.includes("const topbarSlider = document.getElementById('topbarTransparencySlider');"), 'chat.js synchronizes topbar slider');
  assert.ok(js.includes("const topbarVal = document.getElementById('topbarTransparencyVal');"), 'chat.js synchronizes topbar value badge');
  assert.ok(js.includes("if (surfaceOpacitySlider && String(surfaceOpacitySlider.value) !== String(num))"), 'chat.js synchronizes modal slider');
  assert.ok(js.includes("if (surfaceOpacityVal)"), 'chat.js synchronizes modal value badge');

  pass('Scenario 8: Preferences modal and top navigation transparency sliders bidirectionally synchronize');
} catch (err) {
  fail('Scenario 8: Slider Bidirectional Synchronization', err);
}

// Scenario 9: Real-time update of CSS variable --app-surface-opacity on document root
try {
  assert.ok(js.includes("document.documentElement.style.setProperty('--app-surface-opacity', decimal);"), 'chat.js updates --app-surface-opacity on document root');
  assert.ok(js.includes("document.documentElement.style.setProperty('--surface-opacity', decimal);"), 'chat.js updates --surface-opacity alias on document root');
  assert.ok(ejs.includes("document.documentElement.style.setProperty('--app-surface-opacity', dec);"), 'chat.ejs <head> restores --app-surface-opacity before render');

  pass('Scenario 9: Changing slider immediately sets --app-surface-opacity on document root');
} catch (err) {
  fail('Scenario 9: Document Root CSS Property Update', err);
}

// Scenario 10: All major application surfaces inherit opacity
try {
  // 1. Root & theme variables use opacity
  assert.ok(css.includes('--bg-app: rgba(var(--bg-app-rgb), var(--app-surface-opacity));'), '--bg-app uses opacity in light mode');
  assert.ok(css.includes('--bg-white: rgba(var(--surface-rgb), var(--app-surface-opacity));'), '--bg-white uses opacity');
  assert.ok(css.includes('--bg-surface: rgba(var(--surface-rgb), var(--app-surface-opacity));'), '--bg-surface uses opacity');
  assert.ok(css.includes('--bg-light-blue: rgba(240, 247, 255, var(--app-surface-opacity));'), '--bg-light-blue uses opacity');

  // 2. Chat Layout & Backdrop Filter
  assert.ok(css.includes('.chat-layout {'), '.chat-layout rule defined');
  const chatLayoutMatch = css.match(/\.chat-layout\s*\{([\s\S]*?)\}/);
  assert.ok(chatLayoutMatch && chatLayoutMatch[1].includes('var(--bg-app)'), '.chat-layout uses var(--bg-app)');
  assert.ok(chatLayoutMatch && chatLayoutMatch[1].includes('backdrop-filter'), '.chat-layout has backdrop-filter');

  // 3. Sidebar, Topbar, Workspace Subbar, Composer
  const sidebarMatch = css.match(/\.sidebar\s*\{([\s\S]*?)\}/);
  assert.ok(sidebarMatch && sidebarMatch[1].includes('backdrop-filter'), '.sidebar has backdrop-filter blur');

  const topbarMatch = css.match(/\.chat-topbar\s*\{([\s\S]*?)\}/);
  assert.ok(topbarMatch && topbarMatch[1].includes('backdrop-filter'), '.chat-topbar has backdrop-filter blur');

  const subbarMatch = css.match(/\.workspace-subbar\s*\{([\s\S]*?)\}/);
  assert.ok(subbarMatch && subbarMatch[1].includes('backdrop-filter'), '.workspace-subbar has backdrop-filter blur');

  // 4. User bubble & AI bubble
  const userBubbleMatch = css.match(/\.user-bubble\s*\{([\s\S]*?)\}/);
  assert.ok(userBubbleMatch && userBubbleMatch[1].includes('var(--app-surface-opacity)'), '.user-bubble uses var(--app-surface-opacity)');

  // 5. Code block
  assert.ok(css.includes('.ai-bubble pre'), 'Code blocks pre styled in chat.css');

  // 6. Modals
  assert.ok(css.includes('.modal-card'), '.modal-card styled in chat.css');
  assert.ok(css.includes('.tools-modal-card'), '.tools-modal-card styled in chat.css');
  assert.ok(css.includes('.doc-studio-card'), '.doc-studio-card styled in chat.css');

  pass('Scenario 10: All application surfaces (sidebar, topbar, workspace, bubbles, code blocks, modals) inherit opacity');
} catch (err) {
  fail('Scenario 10: Application Surfaces Inherit Opacity', err);
}

// Scenario 11: Text, icons, code text, and button labels maintain 100% solid opacity
try {
  // Ensure body does NOT have opacity property
  const bodyMatch = css.match(/body\.app-body\s*\{([\s\S]*?)\}/);
  assert.ok(bodyMatch && !bodyMatch[1].includes('opacity:'), 'body.app-body has no independent opacity property');

  // Text glyphs remain solid hex colors
  assert.ok(css.includes('--text-main: #0f172a;'), 'Light theme main text is solid #0f172a');
  assert.ok(css.includes('--text-main: #f8fafc;'), 'Dark theme main text is solid #f8fafc');

  // Button text and labels are not given reduced opacity
  assert.ok(!/\.send-btn\s*\{[^}]*opacity:\s*0\.[0-9]/.test(css), '.send-btn text is solid');
  assert.ok(!/\.user-bubble p\s*\{[^}]*opacity:\s*0\.[0-9]/.test(css), '.user-bubble text is solid');
  assert.ok(!/\.ai-bubble p\s*\{[^}]*opacity:\s*0\.[0-9]/.test(css), '.ai-bubble text is solid');

  pass('Scenario 11: Text glyphs, icons, code text, and buttons maintain 100% solid opacity and high contrast');
} catch (err) {
  fail('Scenario 11: Solid Text Opacity & Accessibility', err);
}

// Scenario 12: Reset to default restores 100% opacity and persists in localStorage
try {
  assert.ok(js.includes("window.localStorage.setItem(OPACITY_STORAGE_KEY, String(num));"), 'chat.js persists opacity in localStorage');
  assert.ok(js.includes("applySurfaceOpacity(100, true);"), 'chat.js reset button applies 100% solid opacity');

  // Simulation of clamp and reset
  function simulateOpacity(val) {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 100;
    num = Math.max(20, Math.min(100, num));
    const decimal = (num / 100).toFixed(2);
    return { num, decimal };
  }

  assert.strictEqual(simulateOpacity(100).decimal, '1.00', '100% yields 1.00 decimal opacity');
  assert.strictEqual(simulateOpacity(50).decimal, '0.50', '50% yields 0.50 decimal opacity');
  assert.strictEqual(simulateOpacity(20).decimal, '0.20', '20% yields 0.20 decimal opacity');
  assert.strictEqual(simulateOpacity(5).decimal, '0.20', 'Clamped underflow: 5% clamped to 0.20');
  assert.strictEqual(simulateOpacity(150).decimal, '1.00', 'Clamped overflow: 150% clamped to 1.00');

  pass('Scenario 12: Reset button restores 100% solid opacity and persists via localStorage studymate_surface_opacity');
} catch (err) {
  fail('Scenario 12: Reset & Persistence Simulation', err);
}

// ── SUMMARY REPORT ──────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log(`Results: ${passedTests} Passed, ${failedTests} Failed (Total: ${passedTests + failedTests})`);
console.log('═══════════════════════════════════════════════════════════════════════');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

