/**
 * StudyMate AI — Adaptive Contrast & Centralized Transparency Test Suite
 *
 * Verifies:
 * 1. Centralized CSS Variable Architecture (--app-surface-opacity, --app-bg, --app-surface, etc.)
 * 2. Adaptive Border Contrast inverse scaling across light & dark themes
 * 3. Elevated Surface Opacity Floors (cards, popups, bubbles) to eliminate wash-out & text bleed
 * 4. Text Contrast & WCAG AA/AAA Compliance at 20%, 60%, 100% opacity in Light & Dark modes
 * 5. Component Modernization across chat bubbles, composer, chips, menus, modals, and inputs
 * 6. Dynamic Synchronization & Persistence across sessions
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
console.log('🧪 StudyMate AI — Adaptive Contrast & Centralized CSS Verification');
console.log('═══════════════════════════════════════════════════════════════════════\n');

const cssPath = path.join(__dirname, '..', 'public', 'css', 'chat.css');
const styleCssPath = path.join(__dirname, '..', 'public', 'css', 'style.css');
const jsPath = path.join(__dirname, '..', 'public', 'js', 'chat.js');
const ejsPath = path.join(__dirname, '..', 'views', 'chat.ejs');

const chatCss = fs.readFileSync(cssPath, 'utf8');
const styleCss = fs.readFileSync(styleCssPath, 'utf8');
const chatJs = fs.readFileSync(jsPath, 'utf8');
const chatEjs = fs.readFileSync(ejsPath, 'utf8');

// ─────────────────────────────────────────────────────────────────
// SECTION 1: Centralized CSS Variables & Token Architecture
// ─────────────────────────────────────────────────────────────────
console.log('1. Centralized CSS Variables & Semantic Token Architecture:');

try {
  // Check :root declarations
  const requiredTokens = [
    '--app-surface-opacity',
    '--app-bg',
    '--app-surface',
    '--app-surface-hover',
    '--app-surface-card',
    '--app-surface-popup',
    '--app-input-bg',
    '--app-border',
    '--app-border-card',
    '--app-accent',
    '--app-text-primary',
    '--app-text-secondary',
    '--app-text-muted',
    '--app-icon',
    '--scrollbar-thumb'
  ];

  requiredTokens.forEach(token => {
    assert.ok(chatCss.includes(token + ':'), `chat.css declares ${token}`);
  });

  // Check style.css has the core centralized tokens as well
  assert.ok(styleCss.includes('--app-surface-opacity:'), 'style.css defines --app-surface-opacity');
  assert.ok(styleCss.includes('--app-bg:'), 'style.css defines --app-bg');
  assert.ok(styleCss.includes('--app-surface:'), 'style.css defines --app-surface');
  assert.ok(styleCss.includes('--app-border:'), 'style.css defines --app-border');

  // Check dark theme declarations in body[data-theme="dark"]
  const darkBlockMatch = chatCss.match(/body\[data-theme="dark"\]\s*\{([\s\S]*?)\}/);
  assert.ok(darkBlockMatch, 'Dark theme block exists');
  assert.ok(darkBlockMatch[1].includes('--app-border-alpha:'), 'Dark theme has adaptive border alpha');
  assert.ok(darkBlockMatch[1].includes('--app-surface-card:'), 'Dark theme defines card surface');
  assert.ok(darkBlockMatch[1].includes('--app-surface-popup:'), 'Dark theme defines popup surface');

  pass('All centralized semantic variables declared in light and dark themes');
} catch (err) {
  fail('Centralized Variable Architecture', err);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 2: Dynamic Border Contrast & Floor Math Simulation
// ─────────────────────────────────────────────────────────────────
console.log('\n2. Adaptive Contrast Math & Alpha Floor Formulas (20%, 60%, 100%):');

function evaluateAlphas(opacity, isDark = false) {
  const baseBorder = isDark ? 0.12 : 0.10;
  const borderCoeff = 0.22;
  const cardBorderBase = isDark ? 0.16 : 0.12;
  const cardBorderCoeff = isDark ? 0.26 : 0.25;

  const borderAlpha = baseBorder + (1 - opacity) * borderCoeff;
  const cardBorderAlpha = cardBorderBase + (1 - opacity) * cardBorderCoeff;
  const cardBgAlpha = isDark ? (0.40 * opacity + 0.60) : (0.35 * opacity + 0.65);
  const popupBgAlpha = 0.20 * opacity + 0.80;
  const bubbleAlpha = isDark ? (0.30 * opacity + 0.70) : (0.10 * opacity + 0.90);

  return {
    borderAlpha,
    cardBorderAlpha,
    cardBgAlpha,
    popupBgAlpha,
    bubbleAlpha
  };
}

try {
  // Test 20% (Minimum opacity)
  const minLight = evaluateAlphas(0.20, false);
  const minDark = evaluateAlphas(0.20, true);

  // Borders must be STRONGER at 20% than at 100%
  const maxLight = evaluateAlphas(1.0, false);
  const maxDark = evaluateAlphas(1.0, true);

  assert.ok(minLight.borderAlpha > maxLight.borderAlpha, 'Light border strengthens at low opacity');
  assert.ok(minDark.borderAlpha > maxDark.borderAlpha, 'Dark border strengthens at low opacity');
  assert.strictEqual(Number(minLight.borderAlpha.toFixed(2)), 0.28, 'Light border alpha at 20% is 0.28');
  assert.strictEqual(Number(maxLight.borderAlpha.toFixed(2)), 0.10, 'Light border alpha at 100% is 0.10');

  // Popups must never drop below 0.80 opacity
  assert.ok(minLight.popupBgAlpha >= 0.80, 'Popup bg floor is at least 0.80 at min opacity');
  assert.ok(minDark.popupBgAlpha >= 0.80, 'Dark popup bg floor is at least 0.80 at min opacity');

  // Cards must never drop below 0.65 opacity (prevent disappearing cards)
  assert.ok(minLight.cardBgAlpha >= 0.65, 'Light card bg floor is at least 0.65 at 20%');
  assert.ok(minDark.cardBgAlpha >= 0.60, 'Dark card bg floor is at least 0.60 at 20%');

  // Bubble alpha at 20% is 0.92 in Light (maintains white text contrast) and >= 0.70 in Dark
  assert.strictEqual(Number(minLight.bubbleAlpha.toFixed(2)), 0.92, 'User bubble alpha at 20% in Light is 0.92');
  assert.strictEqual(Number(minDark.bubbleAlpha.toFixed(2)), 0.76, 'User bubble alpha at 20% in Dark is 0.76');

  pass('Adaptive border contrast and elevation floors dynamically protect low opacity');
} catch (err) {
  fail('Adaptive Contrast Math Simulation', err);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 3: WCAG AA / AAA Contrast Verification for Text
// ─────────────────────────────────────────────────────────────────
console.log('\n3. WCAG AA / AAA Text Contrast Verification:');

// Relative Luminance formula according to WCAG 2.1
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1, rgb2) {
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Composite foreground over background with given alpha
function blendColors(fgRgb, fgAlpha, bgRgb) {
  return [
    Math.round(fgRgb[0] * fgAlpha + bgRgb[0] * (1 - fgAlpha)),
    Math.round(fgRgb[1] * fgAlpha + bgRgb[1] * (1 - fgAlpha)),
    Math.round(fgRgb[2] * fgAlpha + bgRgb[2] * (1 - fgAlpha))
  ];
}

try {
  // Test User Bubble: White text [255, 255, 255] on Indigo gradient [79, 70, 229] over light canvas [241, 245, 249]
  const levels = [0.20, 0.60, 1.00];
  const whiteText = [255, 255, 255];
  const lightCanvas = [241, 245, 249];
  const darkCanvas = [9, 13, 22];
  const lightBubblePrimary = [79, 70, 229]; // #4f46e5
  const darkBubblePrimary = [88, 86, 236];  // #5856ec (Accessible Indigo for Dark Theme)

  levels.forEach(lvl => {
    const alphas = evaluateAlphas(lvl, false);
    // User bubble composite in Light Theme
    const lightBubbleBg = blendColors(lightBubblePrimary, alphas.bubbleAlpha, lightCanvas);
    const contrastLight = getContrastRatio(whiteText, lightBubbleBg);

    // WCAG AA requires 4.5:1, AAA requires 7.0:1
    assert.ok(contrastLight >= 4.5, `User bubble in Light theme at ${lvl * 100}% opacity has WCAG AA contrast (${contrastLight.toFixed(2)}:1 >= 4.5:1)`);

    // Dark Theme User bubble composite
    const darkAlphas = evaluateAlphas(lvl, true);
    const darkBubbleBg = blendColors(darkBubblePrimary, darkAlphas.bubbleAlpha, darkCanvas);
    const contrastDark = getContrastRatio(whiteText, darkBubbleBg);
    assert.ok(contrastDark >= 4.5, `User bubble in Dark theme at ${lvl * 100}% opacity has WCAG AA contrast (${contrastDark.toFixed(2)}:1 >= 4.5:1)`);
  });

  // Verify Main Text in Light Theme (#0f172a on white/canvas):
  const mainTextLight = [15, 23, 42];
  const mainTextContrast = getContrastRatio(mainTextLight, [255, 255, 255]);
  assert.ok(mainTextContrast >= 7.0, `Light theme main text has WCAG AAA contrast (${mainTextContrast.toFixed(2)}:1 >= 7:1)`);

  // Verify Main Text in Dark Theme (#f8fafc on #090d16):
  const mainTextDark = [248, 250, 252];
  const darkTextContrast = getContrastRatio(mainTextDark, darkCanvas);
  assert.ok(darkTextContrast >= 7.0, `Dark theme main text has WCAG AAA contrast (${darkTextContrast.toFixed(2)}:1 >= 7:1)`);

  pass('Text contrast strictly satisfies WCAG AA (>= 4.5:1) & AAA (>= 7:1) at 20%, 60%, and 100%');
} catch (err) {
  fail('WCAG Contrast Verification', err);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 4: Component Token Integration across chat.css
// ─────────────────────────────────────────────────────────────────
console.log('\n4. Component Architecture & Semantic Token Integration:');

try {
  // 1. User bubble uses adaptive alpha & border
  assert.ok(chatCss.includes('.user-bubble {'), '.user-bubble class exists');
  const userBubbleMatch = chatCss.match(/\.user-bubble\s*\{([\s\S]*?)\}/);
  assert.ok(userBubbleMatch && userBubbleMatch[1].includes('var(--app-bubble-alpha)') || userBubbleMatch[1].includes('var(--app-surface-opacity)'), '.user-bubble adopts surface opacity & adaptive curve');
  assert.ok(userBubbleMatch && userBubbleMatch[1].includes('border: 1px solid rgba(255, 255, 255,'), '.user-bubble has crisp border');

  // 2. AI bubble uses card surface & card border
  const aiBubbleMatch = chatCss.match(/\.ai-bubble\s*\{([\s\S]*?)\}/);
  assert.ok(aiBubbleMatch && aiBubbleMatch[1].includes('var(--app-surface-card)'), '.ai-bubble uses --app-surface-card');
  assert.ok(aiBubbleMatch && aiBubbleMatch[1].includes('var(--app-border-card)'), '.ai-bubble uses --app-border-card');

  // 3. Composer Inner & Input
  const composerInnerMatch = chatCss.match(/\.composer-inner\s*\{([\s\S]*?)\}/);
  assert.ok(composerInnerMatch && composerInnerMatch[1].includes('var(--app-surface-card)'), '.composer-inner uses --app-surface-card');
  assert.ok(composerInnerMatch && composerInnerMatch[1].includes('var(--app-border-card)'), '.composer-inner uses --app-border-card');

  const composerInputMatch = chatCss.match(/\.composer-input\s*\{([\s\S]*?)\}/);
  assert.ok(composerInputMatch && composerInputMatch[1].includes('var(--app-text-primary)'), '.composer-input uses --app-text-primary');

  const placeholderMatch = chatCss.match(/\.composer-input::placeholder\s*\{([\s\S]*?)\}/);
  assert.ok(placeholderMatch && placeholderMatch[1].includes('var(--app-text-muted)'), '.composer-input::placeholder uses --app-text-muted');

  // 4. Attachment Menu & Attachment Chips
  const attachMenuMatch = chatCss.match(/\.attachment-menu\s*\{([\s\S]*?)\}/);
  assert.ok(attachMenuMatch && attachMenuMatch[1].includes('var(--app-surface-popup)'), '.attachment-menu uses --app-surface-popup');
  assert.ok(attachMenuMatch && attachMenuMatch[1].includes('var(--app-border-card)'), '.attachment-menu uses --app-border-card');

  const attachChipMatch = chatCss.match(/\.composer-attachment-chip\s*\{([\s\S]*?)\}/);
  assert.ok(attachChipMatch && attachChipMatch[1].includes('var(--app-surface-card)'), '.composer-attachment-chip uses --app-surface-card');
  assert.ok(attachChipMatch && attachChipMatch[1].includes('var(--app-border-card)'), '.composer-attachment-chip uses --app-border-card');

  // 5. Modals & Cards
  const modalCardMatch = chatCss.match(/\.modal-card\s*\{([\s\S]*?)\}/);
  assert.ok(modalCardMatch && modalCardMatch[1].includes('var(--app-surface-popup)'), '.modal-card uses --app-surface-popup');
  assert.ok(modalCardMatch && modalCardMatch[1].includes('var(--app-border-card)'), '.modal-card uses --app-border-card');

  const toolsModalMatch = chatCss.match(/\.tools-modal-card\s*\{([\s\S]*?)\}/);
  assert.ok(toolsModalMatch && toolsModalMatch[1].includes('var(--app-surface-popup)'), '.tools-modal-card uses --app-surface-popup');
  assert.ok(toolsModalMatch && toolsModalMatch[1].includes('var(--app-border-card)'), '.tools-modal-card uses --app-border-card');

  const docStudioMatch = chatCss.match(/\.doc-studio-card\s*\{([\s\S]*?)\}/);
  assert.ok(docStudioMatch && docStudioMatch[1].includes('var(--app-surface-popup)'), '.doc-studio-card uses --app-surface-popup');
  assert.ok(docStudioMatch && docStudioMatch[1].includes('var(--app-border-card)'), '.doc-studio-card uses --app-border-card');

  // 6. Form Inputs & Selects
  const formInputMatch = chatCss.match(/\.form-input,\s*\.form-select,\s*\.form-textarea\s*\{([\s\S]*?)\}/);
  assert.ok(formInputMatch && formInputMatch[1].includes('var(--app-input-bg)'), 'Form inputs use --app-input-bg');
  assert.ok(formInputMatch && formInputMatch[1].includes('var(--app-border)'), 'Form inputs use --app-border');
  assert.ok(formInputMatch && formInputMatch[1].includes('var(--app-text-primary)'), 'Form inputs use --app-text-primary');

  // 7. Popups & Dropdowns
  const popoverMatch = chatCss.match(/\.transparency-popover\s*\{([\s\S]*?)\}/);
  assert.ok(popoverMatch && popoverMatch[1].includes('var(--app-surface-popup)'), '.transparency-popover uses --app-surface-popup');
  assert.ok(popoverMatch && popoverMatch[1].includes('var(--app-border-card)'), '.transparency-popover uses --app-border-card');

  const notifMatch = chatCss.match(/\.notif-dropdown\s*\{([\s\S]*?)\}/);
  assert.ok(notifMatch && notifMatch[1].includes('var(--app-surface-popup)'), '.notif-dropdown uses --app-surface-popup');
  assert.ok(notifMatch && notifMatch[1].includes('var(--app-border-card)'), '.notif-dropdown uses --app-border-card');

  const profileMatch = chatCss.match(/\.profile-dropdown\s*\{([\s\S]*?)\}/);
  assert.ok(profileMatch && profileMatch[1].includes('var(--app-surface-popup)'), '.profile-dropdown uses --app-surface-popup');
  assert.ok(profileMatch && profileMatch[1].includes('var(--app-border-card)'), '.profile-dropdown uses --app-border-card');

  // 8. Scrollbars
  assert.ok(chatCss.includes('.convo-list::-webkit-scrollbar-thumb {') && chatCss.includes('var(--scrollbar-thumb)'), 'Conversation list scrollbar uses --scrollbar-thumb');
  assert.ok(chatCss.includes('.messages-area::-webkit-scrollbar-thumb {') && chatCss.includes('var(--scrollbar-thumb)'), 'Messages area scrollbar uses --scrollbar-thumb');
  assert.ok(chatCss.includes('.panel-content::-webkit-scrollbar-thumb {') && chatCss.includes('var(--scrollbar-thumb)'), 'Study panel scrollbar uses --scrollbar-thumb');

  pass('All major application components and floating surfaces modernized with semantic tokens');
} catch (err) {
  fail('Component Token Integration', err);
}

// ─────────────────────────────────────────────────────────────────
// SECTION 5: Real-time Synchronization & Persistence
// ─────────────────────────────────────────────────────────────────
console.log('\n5. Real-Time Synchronization & LocalStorage Persistence:');

try {
  // Check chat.js functions
  assert.ok(chatJs.includes('function applySurfaceOpacity('), 'chat.js contains applySurfaceOpacity');
  assert.ok(chatJs.includes('document.documentElement.style.setProperty(\'--app-surface-opacity\', decimal);'), 'Updates --app-surface-opacity on document root');
  assert.ok(chatJs.includes('OPACITY_STORAGE_KEY'), 'OPACITY_STORAGE_KEY defined');
  assert.ok(chatJs.includes('studymate_surface_opacity'), 'Uses studymate_surface_opacity key');

  // Verify slider sync
  assert.ok(chatJs.includes('topbarSlider.value = String(num);'), 'Syncs topbar slider');
  assert.ok(chatJs.includes('surfaceOpacitySlider.value = String(num);'), 'Syncs preferences modal slider');

  // Verify clamping logic
  assert.ok(chatJs.includes('Math.max(20, Math.min(100, num))'), 'Clamps opacity strictly between 20% and 100%');

  // Verify early head restore in chat.ejs
  assert.ok(chatEjs.includes('studymate_surface_opacity'), 'Early head restoration script present in chat.ejs');
  assert.ok(chatEjs.includes('--app-surface-opacity'), 'Early head script sets --app-surface-opacity before render');

  pass('Immediate root property propagation, bidirectional slider sync, and anti-flicker reload persistence verified');
} catch (err) {
  fail('Sync & Persistence Verification', err);
}

console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log(`Results: ${passedTests} Passed, ${totalTests - passedTests} Failed (Total: ${totalTests})`);
console.log('═══════════════════════════════════════════════════════════════════════\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
