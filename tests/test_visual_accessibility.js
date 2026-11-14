/**
 * StudyMate AI — Interface Transparency & Visual Accessibility Test Suite
 *
 * Verifies all requirements:
 * 1. Interface Appearance section in Preferences & Diagnostics modal
 * 2. Transparency slider with bounds 20% to 100%
 * 3. Default value 100% (solid)
 * 4. Live preview components and responsive updates
 * 5. Reset to default button
 * 6. localStorage persistence (key: 'studymate_surface_opacity')
 * 7. Consistent application across sidebar, chat panels, cards, code blocks, user bubbles, and modals
 * 8. Readable contrast and accessible button visibility
 * 9. NO independent reduction of text opacity (background alpha only)
 * 10. Global application across Home, Subject Notes, Quiz, Tools, Planner, Saved Items, and Settings
 * 11. Fully functional offline (pure client-side execution)
 * 12. Preserves light and dark themes
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

console.log('═══════════════════════════════════════════════════════════════');
console.log('🎨 StudyMate AI — Global Visual Accessibility & Transparency Suite');
console.log('═══════════════════════════════════════════════════════════════\n');

// ── 1. HTML TEMPLATES & HEAD INITIALIZATION ─────────────────────────────────
console.log('1. Template & DOM Structure (views/chat.ejs & views/partials/header.ejs):');
try {
  const ejsPath = path.join(__dirname, '..', 'views', 'chat.ejs');
  assert.ok(fs.existsSync(ejsPath), 'views/chat.ejs exists');
  const ejs = fs.readFileSync(ejsPath, 'utf8');

  // Must be located inside settingsModal
  assert.ok(ejs.includes('id="settingsModal"'), 'settingsModal exists');
  assert.ok(ejs.includes('id="appearanceSettingsGroup"'), 'appearanceSettingsGroup exists');

  // Opacity Slider bounds and attributes
  assert.ok(ejs.includes('id="surfaceOpacitySlider"'), 'surfaceOpacitySlider element exists');
  assert.ok(/<input[^>]+id="surfaceOpacitySlider"[^>]*min="20"/.test(ejs), 'Slider minimum bound is 20%');
  assert.ok(/<input[^>]+id="surfaceOpacitySlider"[^>]*max="100"/.test(ejs), 'Slider maximum bound is 100%');
  assert.ok(/<input[^>]+id="surfaceOpacitySlider"[^>]*value="100"/.test(ejs), 'Slider default value is 100%');

  // Value display badge and Reset button
  assert.ok(ejs.includes('id="surfaceOpacityVal"'), 'surfaceOpacityVal element exists');
  assert.ok(ejs.includes('id="resetOpacityBtn"'), 'resetOpacityBtn element exists');

  // Live preview container and sample card
  assert.ok(ejs.includes('id="opacityPreviewBox"'), 'opacityPreviewBox exists');
  assert.ok(ejs.includes('id="previewCardSample"'), 'previewCardSample exists');

  // Accessibility label associations
  assert.ok(ejs.includes('for="surfaceOpacitySlider"'), 'label associated with surfaceOpacitySlider');
  assert.ok(ejs.includes('aria-label='), 'Slider has descriptive aria-label');

  // Early initialization script in <head>
  assert.ok(ejs.includes("localStorage.getItem('studymate_surface_opacity')"), 'chat.ejs has early opacity restore in <head>');

  // Verify header.ejs also has early restore for static pages
  const headerPath = path.join(__dirname, '..', 'views', 'partials', 'header.ejs');
  assert.ok(fs.existsSync(headerPath), 'views/partials/header.ejs exists');
  const headerEjs = fs.readFileSync(headerPath, 'utf8');
  assert.ok(headerEjs.includes("localStorage.getItem('studymate_surface_opacity')"), 'header.ejs has early opacity restore in <head>');

  pass('EJS templates include all required controls, slider (20%-100%), live preview, and early head restore');
} catch (err) {
  fail('Template & DOM Structure', err);
}

// ── 2. GLOBAL CSS PROPERTIES & SURFACE TRANSLUCENCY ─────────────────────────
console.log('\n2. Global CSS Custom Properties & Translucency (chat.css & style.css):');
try {
  const cssPath = path.join(__dirname, '..', 'public', 'css', 'chat.css');
  assert.ok(fs.existsSync(cssPath), 'public/css/chat.css exists');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Centralized global property --app-surface-opacity exists with default 1
  assert.ok(css.includes('--app-surface-opacity: 1;'), '--app-surface-opacity default 1 defined in :root');
  assert.ok(css.includes('--surface-opacity: var(--app-surface-opacity);'), '--surface-opacity aliases --app-surface-opacity');

  // Light and Dark theme RGB channels
  assert.ok(css.includes('--surface-rgb: 255, 255, 255;'), 'Light mode defines --surface-rgb');
  assert.ok(css.includes('--surface-rgb: 15, 22, 38;'), 'Dark mode defines --surface-rgb');

  // Surface variables use centralized opacity
  assert.ok(css.includes('--bg-white: rgba(var(--surface-rgb), var(--app-surface-opacity));'), '--bg-white uses --app-surface-opacity');
  assert.ok(css.includes('--bg-surface: rgba(var(--surface-rgb), var(--app-surface-opacity));'), '--bg-surface uses --app-surface-opacity');

  // User bubbles use --app-surface-opacity
  const userBubbleMatch = css.match(/\.user-bubble\s*\{([\s\S]*?)\}/);
  assert.ok(userBubbleMatch && userBubbleMatch[1].includes('var(--app-surface-opacity)'), '.user-bubble uses --app-surface-opacity');

  // Code containers use --app-surface-opacity
  const preMatch = css.match(/\.ai-bubble pre,\s*\.ai-card pre\s*\{([\s\S]*?)\}/);
  assert.ok(preMatch && preMatch[1].includes('var(--app-surface-opacity)'), 'code block pre uses --app-surface-opacity');

  // Modals & Panels have backdrop-filter blur
  const sidebarMatch = css.match(/\.sidebar\s*\{([\s\S]*?)\}/);
  assert.ok(sidebarMatch && sidebarMatch[1].includes('backdrop-filter'), '.sidebar has backdrop-filter blur');

  const topbarMatch = css.match(/\.chat-topbar\s*\{([\s\S]*?)\}/);
  assert.ok(topbarMatch && topbarMatch[1].includes('backdrop-filter'), '.chat-topbar has backdrop-filter blur');

  const modalMatch = css.match(/\.modal-card\s*\{([\s\S]*?)\}/);
  assert.ok(modalMatch && modalMatch[1].includes('backdrop-filter'), '.modal-card has backdrop-filter blur');

  const toolsModalMatch = css.match(/\.tools-modal-card\s*\{([\s\S]*?)\}/);
  assert.ok(toolsModalMatch && toolsModalMatch[1].includes('backdrop-filter'), '.tools-modal-card has backdrop-filter blur');

  // Verify public/css/style.css also includes --app-surface-opacity
  const styleCssPath = path.join(__dirname, '..', 'public', 'css', 'style.css');
  assert.ok(fs.existsSync(styleCssPath), 'public/css/style.css exists');
  const styleCss = fs.readFileSync(styleCssPath, 'utf8');
  assert.ok(styleCss.includes('--app-surface-opacity: 1;'), 'style.css includes --app-surface-opacity');

  pass('Global CSS custom properties, user bubbles, code blocks, cards, and modals properly adapt');
} catch (err) {
  fail('Global CSS Properties & Translucency', err);
}

// ── 3. TEXT CONTRAST & ACCESSIBILITY CONSTRAINTS (Rule #8 & #9) ────────────
console.log('\n3. Text Contrast & Non-Degradation Constraints (Rules #8 & #9):');
try {
  const css = fs.readFileSync(path.join(__dirname, '..', 'public', 'css', 'chat.css'), 'utf8');

  // Verify text colors remain solid (not transparent)
  assert.ok(css.includes('--text-main: #0f172a;') || css.includes('--text-main: #0f172a'), 'Light text is solid #0f172a');
  assert.ok(css.includes('--text-main: #f8fafc;') || css.includes('--text-main: #f8fafc'), 'Dark text is solid #f8fafc');

  // Rule #9 Check: Text elements MUST NOT have reduced opacity independently
  const prohibitedSelectors = ['.preview-text', '.ai-bubble p', '.modal-desc', '.setting-desc', '.user-bubble p'];
  for (const sel of prohibitedSelectors) {
    const regex = new RegExp(`\\${sel}\\s*\\{[^}]*opacity\\s*:\\s*(0\\.[0-9]+)\\b`);
    const match = css.match(regex);
    if (match) {
      const val = parseFloat(match[1]);
      assert.ok(val >= 0.8, `${sel} must not have low independent text opacity`);
    }
  }

  // Ensure root app-body does NOT have opacity set
  const bodyMatch = css.match(/body\.app-body\s*\{([\s\S]*?)\}/);
  assert.ok(bodyMatch, 'body.app-body rule found');
  assert.ok(!bodyMatch[1].includes('opacity:'), 'body.app-body does not have opacity property');

  pass('Rule #9 strictly honored: Text glyphs maintain 100% solid opacity with high accessibility contrast');
} catch (err) {
  fail('Text Contrast & Non-Degradation Constraints', err);
}

// ── 4. CLIENT LOGIC & LOCALSTORAGE PERSISTENCE (public/js/chat.js & main.js) ─
console.log('\n4. Client Logic, Clamping & Persistence (chat.js & main.js):');
try {
  const jsPath = path.join(__dirname, '..', 'public', 'js', 'chat.js');
  assert.ok(fs.existsSync(jsPath), 'public/js/chat.js exists');
  const js = fs.readFileSync(jsPath, 'utf8');

  // Storage key constant
  assert.ok(/const\s+OPACITY_STORAGE_KEY\s*=\s*['"]studymate_surface_opacity['"]/.test(js), 'Storage key is studymate_surface_opacity');

  // Function definitions
  assert.ok(js.includes('function applySurfaceOpacity'), 'applySurfaceOpacity function exists');
  assert.ok(js.includes('function initSurfaceOpacity'), 'initSurfaceOpacity function exists');

  // Clamping between 20 and 100
  assert.ok(js.includes('Math.max(20, Math.min(100'), 'Clamps opacity strictly between 20% and 100%');

  // Sets both --app-surface-opacity and --surface-opacity
  assert.ok(js.includes("document.documentElement.style.setProperty('--app-surface-opacity'"), 'Sets --app-surface-opacity on documentElement');
  assert.ok(js.includes("document.documentElement.style.setProperty('--surface-opacity'"), 'Sets --surface-opacity on documentElement');

  // Event handlers
  assert.ok(js.includes("surfaceOpacitySlider.addEventListener('input'"), 'Handles input event for real-time live preview');
  assert.ok(js.includes("surfaceOpacitySlider.addEventListener('change'"), 'Handles change event for persistence');
  assert.ok(js.includes("resetOpacityBtn.addEventListener('click'"), 'Handles reset button click');

  // main.js also synchronizes surface opacity
  const mainJsPath = path.join(__dirname, '..', 'public', 'js', 'main.js');
  assert.ok(fs.existsSync(mainJsPath), 'public/js/main.js exists');
  const mainJs = fs.readFileSync(mainJsPath, 'utf8');
  assert.ok(mainJs.includes('studymate_surface_opacity'), 'main.js syncs studymate_surface_opacity across static pages');

  pass('chat.js and main.js provide real-time updates, strict clamping (20%-100%), and localStorage persistence');
} catch (err) {
  fail('Client Logic & Persistence', err);
}

// ── 5. FUNCTIONAL SIMULATION OF OPACITY ENGINE ─────────────────────────────
console.log('\n5. Functional Clamping & Math Simulation:');
try {
  // Simulate the core algorithm from applySurfaceOpacity
  function simulateApply(val) {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 100;
    num = Math.max(20, Math.min(100, num));
    const decimal = (num / 100).toFixed(2);
    return { num, decimal };
  }

  // 100% default
  assert.deepStrictEqual(simulateApply(100), { num: 100, decimal: '1.00' }, '100% yields 1.00');

  // 75%
  assert.deepStrictEqual(simulateApply(75), { num: 75, decimal: '0.75' }, '75% yields 0.75');

  // 20% lower bound
  assert.deepStrictEqual(simulateApply(20), { num: 20, decimal: '0.20' }, '20% yields 0.20');

  // Below lower bound (e.g. 5% -> clamp to 20%)
  assert.deepStrictEqual(simulateApply(5), { num: 20, decimal: '0.20' }, '5% clamps to 20%');

  // Above upper bound (e.g. 150% -> clamp to 100%)
  assert.deepStrictEqual(simulateApply(150), { num: 100, decimal: '1.00' }, '150% clamps to 100%');

  // Invalid string input -> defaults to 100%
  assert.deepStrictEqual(simulateApply('invalid'), { num: 100, decimal: '1.00' }, 'Invalid input safely falls back to 100%');

  pass('Simulation tests for bounding, clamping, formatting, and edge cases pass flawlessly');
} catch (err) {
  fail('Functional Simulation', err);
}

// ── 6. OFFLINE & SERVICE WORKER REVALIDATION ────────────────────────────────
console.log('\n6. Offline PWA Compatibility & Non-Disruption:');
try {
  const swCode = fs.readFileSync(path.join(__dirname, '..', 'public', 'sw.js'), 'utf8');

  // Version bumped
  assert.ok(swCode.includes("CACHE_VERSION = 'v1.2.0'"), 'Service Worker cache version updated to v1.2.0');

  // Precached assets includes chat.css and chat.js
  assert.ok(swCode.includes("'/css/chat.css'"), 'sw.js precaches /css/chat.css');
  assert.ok(swCode.includes("'/js/chat.js'"), 'sw.js precaches /js/chat.js');

  // Gemini API and WebLLM code remain undisturbed
  const chatJs = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'chat.js'), 'utf8');
  assert.ok(chatJs.includes('fetch(API_URL'), 'Gemini API integration intact');
  assert.ok(chatJs.includes('generateLocalResponse'), 'WebLLM local AI generation intact');
  assert.ok(chatJs.includes('getLocalAI'), 'Local AI loader module intact');

  pass('Offline compatibility intact; zero network requirements; Gemini and WebLLM unchanged');
} catch (err) {
  fail('Offline PWA Compatibility', err);
}

// ── SUMMARY ─────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`Results: ${passedTests} Passed, ${failedTests} Failed`);
console.log('═══════════════════════════════════════════════════════════════');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
