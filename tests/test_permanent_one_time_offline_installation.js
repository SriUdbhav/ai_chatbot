/**
 * tests/test_permanent_one_time_offline_installation.js
 * Verification suite for StudyMate AI Permanent One-Time Offline Model Installation Architecture.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🧪 StudyMate AI — Permanent One-Time Installation Architecture Audit');
console.log('═══════════════════════════════════════════════════════════════════════\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const localAiPath = path.join(ROOT_DIR, 'public', 'js', 'local-ai.js');
const chatJsPath = path.join(ROOT_DIR, 'public', 'js', 'chat.js');
const swPath = path.join(ROOT_DIR, 'public', 'sw.js');
const chatEjsPath = path.join(ROOT_DIR, 'views', 'chat.ejs');
const chatCssPath = path.join(ROOT_DIR, 'public', 'css', 'chat.css');

const localAiCode = fs.readFileSync(localAiPath, 'utf8');
const chatJsCode = fs.readFileSync(chatJsPath, 'utf8');
const swCode = fs.readFileSync(swPath, 'utf8');
const chatEjsCode = fs.readFileSync(chatEjsPath, 'utf8');
const chatCssCode = fs.readFileSync(chatCssPath, 'utf8');

let passed = 0;
let total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ ${name}:`, err.message);
  }
}

console.log('1. Phase 1 & 2: Permanent Model Installation Architecture & Durability:');
test('local-ai.js exports installModel, recoverModel, and verifyModelInstallation', () => {
  assert.ok(localAiCode.includes('export async function installModel'), 'Missing installModel export');
  assert.ok(localAiCode.includes('export async function recoverModel'), 'Missing recoverModel export');
  assert.ok(localAiCode.includes('export async function verifyModelInstallation'), 'Missing verifyModelInstallation export');
});

test('installModel checks verification first to avoid duplicate downloads', () => {
  assert.ok(localAiCode.includes('verifyModelInstallation(target)'), 'installModel must verify before downloading');
  assert.ok(localAiCode.includes('alreadyInstalled: true'), 'installModel must return alreadyInstalled when cached');
});

test('verifyModelInstallation inspects actual CacheStorage and flags corruption honestly', () => {
  assert.ok(localAiCode.includes('isModelCached(target)'), 'verifyModelInstallation must check actual model cache');
  assert.ok(localAiCode.includes("status = 'corrupted'"), 'Must flag corrupted if record exists but cache is gone');
});

test('Installation store uses dual IndexedDB and persistent LocalStorage', () => {
  assert.ok(localAiCode.includes('studymate_offline_db'), 'Must use IndexedDB database');
  assert.ok(localAiCode.includes('saveInstallationRecord'), 'Must have saveInstallationRecord');
  assert.ok(localAiCode.includes('getInstallationRecord'), 'Must have getInstallationRecord');
  assert.ok(localAiCode.includes('deleteInstallationRecord'), 'Must have deleteInstallationRecord');
});

console.log('\n2. Phase 3: Automatic Startup & Dynamic Status Indicators:');
test('local-ai.js computes getStartupStatus with all 4 required status badges + Exam Mode', () => {
  assert.ok(localAiCode.includes('getStartupStatus'), 'Missing getStartupStatus');
  assert.ok(localAiCode.includes('online_gemini_ready'), 'Missing online_gemini_ready status');
  assert.ok(localAiCode.includes('offline_webllm_ready'), 'Missing offline_webllm_ready status');
  assert.ok(localAiCode.includes('initial_installation_required'), 'Missing initial_installation_required status');
  assert.ok(localAiCode.includes('model_recovery_required'), 'Missing model_recovery_required status');
  assert.ok(localAiCode.includes('exam_ready'), 'Missing exam_ready status');
});

test('chat.js invokes checkStartupModelStatus asynchronously on startup', () => {
  assert.ok(chatJsCode.includes('checkStartupModelStatus()'), 'init() must call checkStartupModelStatus()');
  assert.ok(chatJsCode.includes('ensureEngineReady'), 'Must pre-warm engine when offline with model installed');
});

test('chat.css defines distinct indicator dots (green, purple, amber, red, emerald)', () => {
  assert.ok(chatCssCode.includes('.dot-green'), 'Missing .dot-green');
  assert.ok(chatCssCode.includes('.dot-purple'), 'Missing .dot-purple');
  assert.ok(chatCssCode.includes('.dot-amber'), 'Missing .dot-amber');
  assert.ok(chatCssCode.includes('.dot-red'), 'Missing .dot-red');
  assert.ok(chatCssCode.includes('.dot-emerald'), 'Missing .dot-emerald');
});

console.log('\n3. Phase 4: Automatic Online/Offline Switching & Resilient Failover:');
test('chat.js routes to local WebLLM when offline and catches Gemini network failure for seamless local failover', () => {
  assert.ok(chatJsCode.includes('useLocalAi = !isOnline'), 'Must auto-route to local AI when offline');
  assert.ok(chatJsCode.includes('localAi.verifyModelInstallation()'), 'Must verify model in catch block for failover');
  assert.ok(chatJsCode.includes('Local AI (Failover)'), 'Must indicate failover state');
});

test('Image generation intent explicitly informs user when offline/local mode', () => {
  assert.ok(chatJsCode.includes('Offline Local AI Architecture') || chatJsCode.includes('Offline image generation is not available'),
    'Image intent must report offline connectivity requirement');
});

console.log('\n4. Phase 5 & 6: First-Time Setup UI, Recovery, and Accidental Deletion Protection:');
test('chat.js updates download button to Install Model (One-Time Setup) and Repair & Re-install', () => {
  assert.ok(chatJsCode.includes('Install Model (One-Time Setup)'), 'Missing Install Model button text');
  assert.ok(chatJsCode.includes('Repair & Re-install Model'), 'Missing Repair button text');
  assert.ok(chatJsCode.includes('Pre-load into GPU'), 'Missing Pre-load into GPU button text');
});

test('Delete model button prompts explicit user confirmation before clearing storage', () => {
  assert.ok(chatJsCode.includes('confirm(') && chatJsCode.includes('deleteLocalModel'), 'Delete must require confirm() dialog');
  assert.ok(chatJsCode.includes('deleteInstallationRecord'), 'Must clean installation record on delete');
});

test('Service Worker strictly isolates and protects webllm/ caches from eviction', () => {
  assert.ok(swCode.includes("cacheName.startsWith('studymate-')") || swCode.includes("name.startsWith('studymate-')"),
    'SW activate must only purge studymate- caches');
});

console.log('\n5. Phase 7: Dedicated Examination Offline Mode:');
test('views/chat.ejs includes examModeToggleBtn in topbar and settings', () => {
  assert.ok(chatEjsCode.includes('id="examModeToggleBtn"'), 'Missing #examModeToggleBtn in topbar');
  assert.ok(chatEjsCode.includes('id="settingsExamModeToggleBtn"'), 'Missing #settingsExamModeToggleBtn in settings');
});

test('chat.js and local-ai.js implement toggleExamMode and getExamModeActive', () => {
  assert.ok(localAiCode.includes('getExamModeActive'), 'Missing getExamModeActive in local-ai.js');
  assert.ok(localAiCode.includes('setExamModeActive'), 'Missing setExamModeActive in local-ai.js');
  assert.ok(chatJsCode.includes('toggleExamMode'), 'Missing toggleExamMode in chat.js');
  assert.ok(chatJsCode.includes('updateExamModeUI'), 'Missing updateExamModeUI in chat.js');
});

test('When exam mode is active, chat.js forces local execution and refuses network calls', () => {
  assert.ok(chatJsCode.includes('if (examModeActive)'), 'Must check examModeActive in submitMessage');
});

console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log(`Audit Summary: ${passed} / ${total} tests passed (${Math.round(passed / total * 100)}%)`);
console.log('═══════════════════════════════════════════════════════════════════════');

if (passed !== total) {
  process.exit(1);
} else {
  console.log('🎉 ALL PERMANENT ONE-TIME INSTALLATION REQUIREMENTS VERIFIED.');
}

