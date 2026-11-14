/**
 * Test Suite: WebLLM Production Model Download Failure Fix Verification
 * Validates SW passthrough for external CDNs (HF, GitHub, LFS), storage quota validation,
 * diagnostic error categories, Web Worker resilience, and UI retry state.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ ${name}`);
  } catch (err) {
    console.error(`  ❌ ${name}\n     Error: ${err.message}`);
    throw err;
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`  ✅ ${name}`);
  } catch (err) {
    console.error(`  ❌ ${name}\n     Error: ${err.message}`);
    throw err;
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('🧪 StudyMate AI — WebLLM Production Download Fix Verification Suite');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  const swPath = path.join(__dirname, '../public/sw.js');
  const swCode = fs.readFileSync(swPath, 'utf8');

  const workerPath = path.join(__dirname, '../public/js/webllm-worker.js');
  const workerCode = fs.readFileSync(workerPath, 'utf8');

  const localAiPath = path.join(__dirname, '../public/js/local-ai.js');
  const localAiCode = fs.readFileSync(localAiPath, 'utf8');

  const chatJsPath = path.join(__dirname, '../public/js/chat.js');
  const chatJsCode = fs.readFileSync(chatJsPath, 'utf8');

  const chatEjsPath = path.join(__dirname, '../views/chat.ejs');
  const chatEjsCode = fs.readFileSync(chatEjsPath, 'utf8');

  // ── 1. SERVICE WORKER CDN BYPASS & CACHE CONFLICT RESOLUTION ──────────────
  console.log('1. Service Worker CDN Bypass & Cache Isolation:');
  runTest('Service Worker bypasses ALL non-origin requests (except Google Fonts)', () => {
    assert.ok(swCode.includes('const isSameOrigin = url.origin === self.location.origin'), 'Checks same-origin');
    assert.ok(swCode.includes('if (!isSameOrigin && !isGoogleFont)'), 'Bypasses non-origin requests');
    assert.ok(swCode.includes('huggingface.co'), 'Documents Hugging Face domain');
    assert.ok(swCode.includes('raw.githubusercontent.com'), 'Documents GitHub CDN');
  });

  runTest('Service Worker explicitly bypasses binary weight extensions (.bin, .wasm, .safetensors)', () => {
    assert.ok(swCode.includes("url.pathname.endsWith('.bin')"), 'Bypasses .bin weight shards');
    assert.ok(swCode.includes("url.pathname.endsWith('.wasm')"), 'Bypasses .wasm compiled programs');
    assert.ok(swCode.includes("url.pathname.endsWith('ndarray-cache.json')"), 'Bypasses tensor manifests');
  });

  runTest('Service Worker activation only purges studymate- caches (never webllm/* or tvmjs*)', () => {
    assert.ok(swCode.includes("name.startsWith('studymate-')"), 'Only purges studymate- prefixed caches');
    assert.ok(swCode.includes("CACHE_VERSION = 'v1.2.1'"), 'Cache version bumped to invalidate stale SW');
  });

  // ── 2. WEB WORKER RESILIENCE & ERROR HANDLING ─────────────────────────────
  console.log('\n2. Web Worker Resilience & Error Handling:');
  runTest('webllm-worker.js wraps handler creation and execution with try-catch', () => {
    assert.ok(workerCode.includes('try {'), 'Try-catch present in worker');
    assert.ok(workerCode.includes('self.onerror'), 'Uncaught worker error handler registered');
    assert.ok(workerCode.includes('WebWorkerMLCEngineHandler'), 'Uses WebWorkerMLCEngineHandler');
  });

  runTest('local-ai.js wires activeWorker.onerror for fast failure detection', () => {
    assert.ok(localAiCode.includes('activeWorker.onerror = (e) =>'), 'Registers worker onerror callback');
    assert.ok(localAiCode.includes('WORKER_INIT_FAILED'), 'Includes WORKER_INIT_FAILED error code');
  });

  // ── 3. STORAGE QUOTA VALIDATION BEFORE DOWNLOAD ───────────────────────────
  console.log('\n3. Storage Quota Validation:');
  runTest('local-ai.js defines requiredStorageMB for all supported models', () => {
    assert.ok(localAiCode.includes('requiredStorageMB: 1100'), 'Qwen 1.5B requires 1100MB buffer');
    assert.ok(localAiCode.includes('requiredStorageMB: 480'), 'Qwen 0.5B requires 480MB buffer');
    assert.ok(localAiCode.includes('requiredStorageMB: 800'), 'Llama 1B requires 800MB buffer');
  });

  runTest('local-ai.js exports checkStorageQuotaForModel to prevent QuotaExceeded errors', () => {
    assert.ok(localAiCode.includes('export async function checkStorageQuotaForModel'), 'Exported quota check');
    assert.ok(localAiCode.includes('Storage quota exceeded'), 'Explicit error message on insufficient quota');
  });

  // ── 4. DIAGNOSTIC ERROR CATEGORIES (REQUIREMENT 4) ────────────────────────
  console.log('\n4. Diagnostic Error Categories & Classification:');
  runTest('local-ai.js exports parseLocalAIError supporting all 7 diagnostic categories', () => {
    assert.ok(localAiCode.includes('export function parseLocalAIError'), 'parseLocalAIError exported');
    assert.ok(localAiCode.includes('WebGPU unavailable'), 'Category 1: WebGPU unavailable');
    assert.ok(localAiCode.includes('Worker initialization failed'), 'Category 2: Worker initialization failed');
    assert.ok(localAiCode.includes('Model repository unavailable'), 'Category 3: Model repository unavailable');
    assert.ok(localAiCode.includes('Model download failed'), 'Category 4: Model download failed');
    assert.ok(localAiCode.includes('Storage quota exceeded'), 'Category 5: Storage quota exceeded');
    assert.ok(localAiCode.includes('Download interrupted'), 'Category 6: Download interrupted');
    assert.ok(localAiCode.includes('Model initialization failed'), 'Category 7: Model initialization failed');
  });

  // ── 5. OFFLINE AI UI DIAGNOSTICS & RETRY WORKFLOW ─────────────────────────
  console.log('\n5. Offline AI Settings UI & Retry Workflow:');
  runTest('views/chat.ejs includes dedicated #localAiDiagnosticBox elements', () => {
    assert.ok(chatEjsCode.includes('id="localAiDiagnosticBox"'), 'Diagnostic box present in EJS');
    assert.ok(chatEjsCode.includes('id="localAiDiagnosticBadge"'), 'Diagnostic badge present in EJS');
    assert.ok(chatEjsCode.includes('id="localAiDiagnosticTitle"'), 'Diagnostic title present in EJS');
    assert.ok(chatEjsCode.includes('id="localAiDiagnosticMessage"'), 'Diagnostic message present in EJS');
    assert.ok(chatEjsCode.includes('id="localAiDiagnosticDetails"'), 'Diagnostic details present in EJS');
  });

  runTest('chat.js updates download button to Retry Download on interruption/failure', () => {
    assert.ok(chatJsCode.includes("downloadModelBtn.textContent = 'Retry Download'"), 'Updates button to Retry Download');
    assert.ok(chatJsCode.includes('showLocalAiDiagnostic'), 'Displays diagnostic panel on error');
    assert.ok(chatJsCode.includes('hideLocalAiDiagnostic'), 'Hides diagnostic panel on retry/success');
  });

  // ── 6. VERIFIED SUPPORTED MODEL RECORDS IN WEBLLM ─────────────────────────
  console.log('\n6. Verified Supported WebLLM Model Catalog:');
  await runAsyncTest('All 3 models in SUPPORTED_MODELS exist in @mlc-ai/web-llm prebuiltAppConfig', async () => {
    const webllm = await import('@mlc-ai/web-llm');
    const availableModelIds = webllm.prebuiltAppConfig.model_list.map(m => m.model_id);

    const requiredModels = [
      'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC',
      'Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC',
      'Llama-3.2-1B-Instruct-q4f16_1-MLC'
    ];

    for (const id of requiredModels) {
      assert.ok(availableModelIds.includes(id), `Model ${id} is present in prebuiltAppConfig`);
      const record = webllm.prebuiltAppConfig.model_list.find(m => m.model_id === id);
      assert.ok(record.model.startsWith('https://huggingface.co/mlc-ai/'), `Model URL valid: ${record.model}`);
      assert.ok(record.model_lib.includes('.wasm'), `Model WASM valid: ${record.model_lib}`);
    }
  });

  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log(`🎉 ALL ${passedTests}/${totalTests} PRODUCTION DOWNLOAD VERIFICATIONS PASSED (100%)`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('\nTest suite execution failed:', err);
  process.exit(1);
});

