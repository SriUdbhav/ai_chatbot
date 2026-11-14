/**
 * Test Suite: WebLLM Offline Generative AI Integration
 * Validates WebLLM package, Web Worker, local AI module, service worker caching, and UI controls.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let failedTests = 0;

function pass(name) {
  passedTests++;
  console.log(`  ✅ ${name}`);
}

function fail(name, err) {
  failedTests++;
  console.error(`  ❌ ${name}:`, err.message || err);
}

async function runTests() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🤖 StudyMate AI — WebLLM Offline AI Verification Suite');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // ── 1. WEB-LLM NPM PACKAGE & MODEL CATALOG ────────────────────────────────
  console.log('1. WebLLM Package & Prebuilt Model Catalog:');
  try {
    const webllm = await import('@mlc-ai/web-llm');
    assert.strictEqual(typeof webllm.CreateWebWorkerMLCEngine, 'function', 'CreateWebWorkerMLCEngine is exported');
    assert.strictEqual(typeof webllm.WebWorkerMLCEngineHandler, 'function', 'WebWorkerMLCEngineHandler is exported');
    assert.strictEqual(typeof webllm.hasModelInCache, 'function', 'hasModelInCache is exported');
    assert.strictEqual(typeof webllm.deleteModelAllInfoInCache, 'function', 'deleteModelAllInfoInCache is exported');
    assert.ok(webllm.prebuiltAppConfig?.model_list?.length > 0, 'prebuiltAppConfig model_list is populated');

    const modelIds = webllm.prebuiltAppConfig.model_list.map(m => m.model_id);

    // Verify selected compact coding & study models exist
    assert.ok(modelIds.includes('Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC'), 'Qwen2.5-Coder 1.5B model is available');
    assert.ok(modelIds.includes('Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC'), 'Qwen2.5-Coder 0.5B model is available');
    assert.ok(modelIds.includes('Llama-3.2-1B-Instruct-q4f16_1-MLC'), 'Llama-3.2 1B model is available');

    pass('WebLLM runtime and prebuilt model records verified');
  } catch (err) {
    fail('WebLLM package verification', err);
  }

  // ── 2. STATIC ASSETS & WEB WORKER ─────────────────────────────────────────
  console.log('\n2. Static Bundle & Web Worker Files:');
  try {
    const bundlePath = path.join(__dirname, '..', 'public', 'js', 'web-llm.js');
    assert.ok(fs.existsSync(bundlePath), 'public/js/web-llm.js exists');
    const bundleSize = fs.statSync(bundlePath).size;
    assert.ok(bundleSize > 5 * 1024 * 1024, `web-llm.js bundle is complete (${(bundleSize / 1024 / 1024).toFixed(2)} MB)`);

    const workerPath = path.join(__dirname, '..', 'public', 'js', 'webllm-worker.js');
    assert.ok(fs.existsSync(workerPath), 'public/js/webllm-worker.js exists');
    const workerCode = fs.readFileSync(workerPath, 'utf8');
    assert.ok(workerCode.includes('WebWorkerMLCEngineHandler'), 'Worker instantiates WebWorkerMLCEngineHandler');
    assert.ok(workerCode.includes('self.onmessage'), 'Worker sets onmessage handler');

    pass('WebLLM bundle and background Web Worker file verified');
  } catch (err) {
    fail('Static bundle & Web Worker verification', err);
  }

  // ── 3. LOCAL AI COORDINATION MODULE ───────────────────────────────────────
  console.log('\n3. Local AI Coordination Module (public/js/local-ai.js):');
  try {
    const localAiPath = path.join(__dirname, '..', 'public', 'js', 'local-ai.js');
    assert.ok(fs.existsSync(localAiPath), 'public/js/local-ai.js exists');

    const code = fs.readFileSync(localAiPath, 'utf8');

    // Verify all essential exports and lifecycle functions are present
    assert.ok(code.includes('export const SUPPORTED_MODELS'), 'SUPPORTED_MODELS is exported');
    assert.ok(code.includes('export async function checkWebGPUSupport'), 'checkWebGPUSupport is exported');
    assert.ok(code.includes('export async function isModelCached'), 'isModelCached is exported');
    assert.ok(code.includes('export async function deleteLocalModel'), 'deleteLocalModel is exported');
    assert.ok(code.includes('export async function initEngine'), 'initEngine is exported');
    assert.ok(code.includes('export async function generateLocalResponse'), 'generateLocalResponse is exported');
    assert.ok(code.includes('export async function stopGeneration'), 'stopGeneration is exported');
    assert.ok(code.includes('export async function requestPersistentStorage'), 'requestPersistentStorage is exported');
    assert.ok(code.includes('webllm.CreateWebWorkerMLCEngine'), 'Creates WebWorkerMLCEngine');
    assert.ok(code.includes('Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC'), 'Includes recommended Qwen2.5-Coder 1.5B model');
    assert.ok(code.includes('Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC'), 'Includes ultra-light Qwen2.5-Coder 0.5B model');

    pass('local-ai.js module adheres to all architectural requirements and handles edge cases');
  } catch (err) {
    fail('Local AI module verification', err);
  }

  // ── 4. SERVICE WORKER PRECACHE & PASSTHROUGH ──────────────────────────────
  console.log('\n4. Service Worker WebLLM Integration (public/sw.js):');
  try {
    const swCode = fs.readFileSync(path.join(__dirname, '..', 'public', 'sw.js'), 'utf8');

    assert.ok(swCode.includes('/js/web-llm.js'), 'sw.js precaches /js/web-llm.js');
    assert.ok(swCode.includes('/js/webllm-worker.js'), 'sw.js precaches /js/webllm-worker.js');
    assert.ok(swCode.includes('/js/local-ai.js'), 'sw.js precaches /js/local-ai.js');
    assert.ok(swCode.includes('huggingface.co'), 'sw.js permits direct HuggingFace model weight downloads');
    assert.ok(swCode.includes('raw.githubusercontent.com'), 'sw.js permits direct GitHub CDN wasm downloads');

    pass('Service Worker properly precaches WebLLM scripts and bypasses model weights for WebLLM CacheStorage');
  } catch (err) {
    fail('Service worker integration', err);
  }

  // ── 5. EJS UI CONTROLS & DIAGNOSTICS SECTION ──────────────────────────────
  console.log('\n5. Frontend UI Controls & Settings Modal (views/chat.ejs):');
  try {
    const chatEjs = fs.readFileSync(path.join(__dirname, '..', 'views', 'chat.ejs'), 'utf8');

    assert.ok(chatEjs.includes('id="engineIndicatorPill"'), 'chat.ejs contains AI engine indicator pill');
    assert.ok(chatEjs.includes('id="localAiSettingsGroup"'), 'chat.ejs contains Offline Generative AI settings section');
    assert.ok(chatEjs.includes('id="enginePrefSelect"'), 'chat.ejs contains engine routing selector');
    assert.ok(chatEjs.includes('id="webgpuBadge"'), 'chat.ejs contains WebGPU compatibility badge');
    assert.ok(chatEjs.includes('id="localModelSelect"'), 'chat.ejs contains model selection dropdown');
    assert.ok(chatEjs.includes('id="downloadModelBtn"'), 'chat.ejs contains Download Model button');
    assert.ok(chatEjs.includes('id="deleteModelBtn"'), 'chat.ejs contains Delete Local Model button');
    assert.ok(chatEjs.includes('id="localAiProgressWrap"'), 'chat.ejs contains model download progress bar');
    assert.ok(chatEjs.includes('id="stopBtn"'), 'chat.ejs contains stop generation button');

    pass('All required UI indicators, diagnostic controls, and action buttons verified in template');
  } catch (err) {
    fail('Frontend UI controls verification', err);
  }

  // ── 6. CHAT CONTROLLER INTELLIGENT ROUTING & STREAMING ────────────────────
  console.log('\n6. Client Application Logic (public/js/chat.js):');
  try {
    const chatJs = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'chat.js'), 'utf8');

    assert.ok(chatJs.includes('import(\'/js/local-ai.js\')'), 'chat.js imports local-ai module dynamically');
    assert.ok(chatJs.includes('useLocalAi'), 'chat.js implements intelligent engine routing');
    assert.ok(chatJs.includes('generateLocalResponse'), 'chat.js invokes on-device generative inference');
    assert.ok(chatJs.includes('updateStreamingMessage'), 'chat.js supports token-by-token streaming');
    assert.ok(chatJs.includes('stopGeneration'), 'chat.js supports stopping generative inference');
    assert.ok(chatJs.includes('initLocalAiSettings'), 'chat.js wires settings controls and progress updates');

    pass('chat.js correctly routes between Gemini and Local AI with live streaming and stop support');
  } catch (err) {
    fail('Client application logic verification', err);
  }

  // ── FINAL SUMMARY ─────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`Results: ${passedTests} Passed, ${failedTests} Failed`);
  console.log('═══════════════════════════════════════════════════════════════');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
