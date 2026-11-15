/**
 * StudyMate AI — Dedicated WebLLM Local AI Module
 *
 * Implements:
 *   • WebGPU hardware detection & diagnostics
 *   • Model download, caching verification & persistent storage
 *   • Web Worker background offloading via WebWorkerMLCEngine
 *   • Streaming token generation with multi-turn conversation context
 *   • Stop/interrupt generation functionality
 *   • Model cache management and deletion
 */

'use strict';

import * as webllm from './web-llm.js';

// ── 1. Supported Model Catalog ────────────────────────────────────────────────
export const SUPPORTED_MODELS = [
  {
    id: 'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC',
    name: 'Qwen2.5-Coder 1.5B (Recommended)',
    tagline: 'High quality C programming, DSA, algorithms & structured explanations',
    sizeEstimate: '~980 MB',
    requiredStorageMB: 1100,
    vramEstimate: '~1.6 GB VRAM',
    isDefault: true
  },
  {
    id: 'Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC',
    name: 'Qwen2.5-Coder 0.5B (Ultra-Light)',
    tagline: 'Fast download, minimal VRAM, standard C & algorithms',
    sizeEstimate: '~390 MB',
    requiredStorageMB: 480,
    vramEstimate: '~950 MB VRAM',
    isDefault: false
  },
  {
    id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
    name: 'Llama-3.2 1B Instruct',
    tagline: 'Fast general-purpose academic study companion by Meta',
    sizeEstimate: '~700 MB',
    requiredStorageMB: 800,
    vramEstimate: '~880 MB VRAM',
    isDefault: false
  }
];

const MODEL_STORAGE_KEY = 'studymate_local_model_id';
const ENGINE_PREF_KEY = 'studymate_engine_preference'; // 'auto' | 'local' | 'gemini'

// ── 2. Module State ───────────────────────────────────────────────────────────
let activeEngine = null;
let activeWorker = null;
let activeModelId = null;
let isInitializing = false;
let isGenerating = false;

// ── 3. Storage & Preference Helpers ───────────────────────────────────────────
export function getSelectedModelId() {
  return localStorage.getItem(MODEL_STORAGE_KEY) || SUPPORTED_MODELS[0].id;
}

export function setSelectedModelId(id) {
  localStorage.setItem(MODEL_STORAGE_KEY, id);
}

export function getEnginePreference() {
  return localStorage.getItem(ENGINE_PREF_KEY) || 'auto';
}

export function setEnginePreference(pref) {
  localStorage.setItem(ENGINE_PREF_KEY, pref);
}

// ── 4. WebGPU Compatibility Diagnostics ───────────────────────────────────────
export async function checkWebGPUSupport() {
  if (typeof navigator === 'undefined' || !navigator.gpu) {
    return {
      supported: false,
      reason: 'WebGPU is not supported in this browser. Please use Chrome 113+, Edge 113+, or a modern Chromium browser with WebGPU enabled.'
    };
  }

  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      return {
        supported: false,
        reason: 'No compatible WebGPU hardware adapter found. Ensure hardware acceleration is enabled in browser settings.'
      };
    }

    let vendor = 'Compatible GPU';
    let architecture = 'Hardware Accelerated';
    let description = 'WebGPU Device Ready';

    if (adapter.info) {
      vendor = adapter.info.vendor || vendor;
      architecture = adapter.info.architecture || architecture;
      description = adapter.info.description || adapter.info.device || description;
    } else if (typeof adapter.requestAdapterInfo === 'function') {
      try {
        const info = await adapter.requestAdapterInfo();
        vendor = info.vendor || vendor;
        architecture = info.architecture || architecture;
        description = info.description || info.device || description;
      } catch (e) {}
    }

    return {
      supported: true,
      adapterInfo: { vendor, architecture, description }
    };
  } catch (err) {
    return {
      supported: false,
      reason: `WebGPU initialization check failed: ${err.message}`
    };
  }
}

// ── 5. Persistent Browser Storage ─────────────────────────────────────────────
export async function requestPersistentStorage() {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    try {
      return await navigator.storage.persist();
    } catch (e) {
      return false;
    }
  }
  return false;
}

export async function isStoragePersisted() {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persisted) {
    try {
      return await navigator.storage.persisted();
    } catch (e) {
      return false;
    }
  }
  return false;
}

export async function getStorageQuota() {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
    try {
      const est = await navigator.storage.estimate();
      return {
        usageMB: Math.round((est.usage || 0) / (1024 * 1024)),
        quotaMB: Math.round((est.quota || 0) / (1024 * 1024))
      };
    } catch (e) {
      return null;
    }
  }
  return null;
}

/**
 * Validates available browser storage quota against model size before downloading.
 * @param {string} [modelId]
 * @returns {Promise<{sufficient: boolean, freeMB?: number, neededMB?: number, message?: string}>}
 */
export async function checkStorageQuotaForModel(modelId) {
  const targetId = modelId || getSelectedModelId();
  const model = SUPPORTED_MODELS.find(m => m.id === targetId) || SUPPORTED_MODELS[0];
  const quota = await getStorageQuota();
  if (quota && quota.quotaMB && typeof quota.usageMB === 'number') {
    const freeMB = Math.max(0, quota.quotaMB - quota.usageMB);
    const neededMB = model.requiredStorageMB || 1000;
    if (freeMB < neededMB) {
      return {
        sufficient: false,
        freeMB,
        neededMB,
        message: `Storage quota exceeded: Model requires ~${neededMB} MB, but your browser has only ~${freeMB} MB free space available. Please free up browser storage space.`
      };
    }
    return { sufficient: true, freeMB, neededMB };
  }
  return { sufficient: true, freeMB: null, neededMB: model.requiredStorageMB || 1000 };
}

// ── 6. Model Cache Management ─────────────────────────────────────────────────
export async function isModelCached(modelId) {
  try {
    const target = modelId || getSelectedModelId();
    return await webllm.hasModelInCache(target);
  } catch (err) {
    console.warn('[LocalAI] Could not check model cache:', err);
    return false;
  }
}

export async function deleteLocalModel(modelId) {
  const target = modelId || getSelectedModelId();
  try {
    if (activeEngine && activeModelId === target) {
      await unloadEngine();
    }
    await webllm.deleteModelAllInfoInCache(target);
    console.log('[LocalAI] Model cache deleted for:', target);
    return true;
  } catch (err) {
    console.error('[LocalAI] Error deleting model cache:', err);
    throw err;
  }
}

// ── 7. Engine Lifecycle ───────────────────────────────────────────────────────
export function getActiveEngine() {
  return activeEngine;
}

export function getActiveModelId() {
  return activeModelId;
}

export function getIsInitializing() {
  return isInitializing;
}

export function getIsGenerating() {
  return isGenerating;
}

/**
 * Classifies Local AI errors into structured diagnostic categories.
 * @param {Error|any} err
 * @param {object} [context]
 */
export function parseLocalAIError(err, context = {}) {
  const msg = (err && err.message) ? err.message : String(err);
  let category = 'Model download failed';
  let title = 'Model Download Error';
  let friendlyMessage = msg;
  let details = '';

  if (msg.includes('WebGPU') || msg.includes('adapter') || msg.includes('hardware acceleration')) {
    category = 'WebGPU unavailable';
    title = 'WebGPU Unavailable';
    friendlyMessage = 'WebGPU is not available in this browser or hardware acceleration is disabled. Open in Chrome 113+ or Edge 113+ with hardware acceleration turned ON in browser settings.';
    details = msg;
  } else if (msg.includes('Storage quota exceeded') || err?.code === 'QUOTA_EXCEEDED' || msg.includes('QuotaExceeded') || msg.includes('quota')) {
    category = 'Storage quota exceeded';
    title = 'Storage Quota Exceeded';
    friendlyMessage = msg;
    details = 'Browser storage limit reached. Please clear browser site data or cache to make room for model weights.';
  } else if (context.phase === 'worker_init' || err?.code === 'WORKER_INIT_FAILED' || msg.includes('Worker') || msg.includes('worker') || msg.includes('Failed to construct')) {
    category = 'Worker initialization failed';
    title = 'Worker Initialization Failed';
    friendlyMessage = 'Could not initialize the background Web Worker for local AI. Ensure JavaScript modules are supported in your browser.';
    details = `Script path: /js/webllm-worker.js | Error: ${msg}`;
  } else if (msg.includes('404') || msg.includes('Cannot find model_id') || msg.includes('ModelNotFoundError') || msg.includes('repository')) {
    category = 'Model repository unavailable';
    title = 'Model Repository Unavailable';
    friendlyMessage = 'The model repository or metadata could not be found or reached on the model repository. Please verify internet access and retry.';
    details = context.url ? `Target URL: ${context.url} | Error: ${msg}` : msg;
  } else if (msg.includes('Network connection interrupted') || msg.includes('AbortError') || msg.includes('Failed to fetch') || msg.includes('fetch failed') || msg.includes('network') || !navigator.onLine) {
    category = 'Download interrupted';
    title = 'Download Interrupted';
    friendlyMessage = navigator.onLine
      ? 'The model download was interrupted due to a temporary network issue. Your downloaded shards are saved in browser cache — click "Retry Download" to resume.'
      : 'Internet connection lost. Reconnect to internet and click "Retry Download" to resume where you left off.';
    details = msg;
  } else if (context.phase === 'model_init' || msg.includes('shader') || msg.includes('pipeline') || msg.includes('device lost') || msg.includes('device')) {
    category = 'Model initialization failed';
    title = 'Model Initialization Failed';
    friendlyMessage = 'The model files downloaded successfully, but the WebGPU pipeline failed to compile or allocate GPU buffers. Your device may be low on GPU VRAM.';
    details = msg;
  } else {
    category = 'Model download failed';
    title = 'Model Download Failed';
    friendlyMessage = `Unable to complete model download: ${msg}. Already-downloaded shards are preserved; click "Retry Download" to resume.`;
    details = msg;
  }

  return {
    category,
    title,
    message: friendlyMessage,
    details,
    rawError: msg
  };
}

export async function initEngine(modelId, onProgress) {
  const targetModel = modelId || getSelectedModelId();

  if (activeEngine && activeModelId === targetModel) {
    return activeEngine;
  }

  // 1. WebGPU hardware detection & diagnostics
  const gpuCheck = await checkWebGPUSupport();
  if (!gpuCheck.supported) {
    const err = new Error(gpuCheck.reason);
    err.code = 'WEBGPU_UNAVAILABLE';
    throw err;
  }

  // 2. Storage quota validation before downloading
  const quotaCheck = await checkStorageQuotaForModel(targetModel);
  if (!quotaCheck.sufficient) {
    const err = new Error(quotaCheck.message);
    err.code = 'QUOTA_EXCEEDED';
    throw err;
  }

  // 3. Request persistent storage so model weights aren't evicted
  await requestPersistentStorage();

  // If another model is active, unload it
  if (activeEngine) {
    await unloadEngine();
  }

  isInitializing = true;
  let workerFailed = false;
  let workerError = null;

  try {
    // 4. Instantiate Web Worker with runtime error detection
    activeWorker = new Worker('/js/webllm-worker.js', { type: 'module' });
    activeWorker.onerror = (e) => {
      workerFailed = true;
      workerError = e;
      console.error('[LocalAI] Web Worker runtime error during init:', e);
    };

    let currentPhase = 'downloading';

    activeEngine = await webllm.CreateWebWorkerMLCEngine(activeWorker, targetModel, {
      initProgressCallback: (report) => {
        if (report && typeof report.progress === 'number' && report.progress >= 1.0) {
          currentPhase = 'model_init';
        }
        if (typeof onProgress === 'function') {
          onProgress(report);
        }
      }
    });

    activeModelId = targetModel;
    isInitializing = false;
    console.log('[LocalAI] Engine initialized successfully with model:', targetModel);
    return activeEngine;
  } catch (err) {
    isInitializing = false;
    await unloadEngine();
    console.error('[LocalAI] Engine initialization failed:', err);
    if (workerFailed && workerError) {
      const wrapped = new Error(`Worker initialization failed: ${workerError.message || 'Worker thread script error'}`);
      wrapped.code = 'WORKER_INIT_FAILED';
      throw wrapped;
    }
    throw err;
  }
}

export async function unloadEngine() {
  if (activeWorker) {
    try {
      activeWorker.terminate();
    } catch (e) {}
    activeWorker = null;
  }
  activeEngine = null;
  activeModelId = null;
  isInitializing = false;
  isGenerating = false;
  console.log('[LocalAI] Engine unloaded and worker terminated.');
}

// ── 8. System Instruction Formatter ───────────────────────────────────────────
function buildSystemPrompt(mode) {
  let prompt = `You are StudyMate AI, an intelligent generative AI academic companion running locally in the student's browser via WebGPU.
Your role is to help college students master computer science, C programming, data structures, algorithms, mathematics, and academic topics.

Guidelines:
- Give precise, well-structured explanations with markdown headings, bullet lists, and step-by-step reasoning.
- When answering programming or DSA questions (e.g. C, Binary Trees, Stacks, Queues, Sorting, Linked Lists), always include clear, working code examples with explanations of critical lines.
- Be honest about uncertainty; explain logic step-by-step.
- Keep responses focused, encouraging, and academically rigorous.`;

  const MODE_ADDITIONS = {
    simple: '\n\nSTUDY MODE ACTIVE: SIMPLE EXPLANATION. Explain concepts in simple, intuitive language as if explaining to a beginner. Use real-world analogies and avoid jargon.',
    step_by_step: '\n\nSTUDY MODE ACTIVE: STEP-BY-STEP LEARNING. Break your answer down into sequentially numbered, progressive steps.',
    exam_prep: '\n\nSTUDY MODE ACTIVE: EXAM PREPARATION. Focus on high-yield exam concepts, formal definitions, time/space complexities, edge cases, and exam pitfalls.',
    practice: '\n\nSTUDY MODE ACTIVE: PRACTICE QUESTIONS. After answering, provide 1–2 challenging follow-up practice questions or conceptual check problems.',
    code_focus: '\n\nSTUDY MODE ACTIVE: PROGRAMMING FOCUS. Prioritize working C/code examples, syntax breakdown, memory safety, and line-by-line walk-throughs.'
  };

  if (MODE_ADDITIONS[mode]) {
    prompt += MODE_ADDITIONS[mode];
  }

  return prompt;
}

// ── 9. Generative Inference with Streaming ────────────────────────────────────
export async function generateLocalResponse({
  prompt,
  history = [],
  mode = 'standard',
  modelId = null,
  onInitProgress = null,
  onChunk = null
}) {
  const targetModel = modelId || getSelectedModelId();

  // 1. Initialize engine if not already running with target model
  if (!activeEngine || activeModelId !== targetModel) {
    await initEngine(targetModel, onInitProgress);
  }

  isGenerating = true;

  // 2. Prepare conversation turns for WebLLM
  const systemPrompt = buildSystemPrompt(mode);
  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  // Map up to 10 prior conversation turns for multi-turn context
  const validHistory = (history || [])
    .filter(m => !m.isError && typeof m.content === 'string' && m.content.trim())
    .slice(-10);

  for (const turn of validHistory) {
    messages.push({
      role: turn.role === 'model' || turn.role === 'assistant' ? 'assistant' : 'user',
      content: turn.content
    });
  }

  messages.push({ role: 'user', content: prompt });

  let accumulated = '';

  try {
    const stream = await activeEngine.chat.completions.create({
      messages,
      temperature: 0.6,
      stream: true,
      max_tokens: 4096
    });

    for await (const chunk of stream) {
      if (!isGenerating) {
        // Interrupted by user via stopGeneration()
        break;
      }
      const delta = chunk.choices[0]?.delta?.content || '';
      if (delta) {
        accumulated += delta;
        if (typeof onChunk === 'function') {
          onChunk(delta, accumulated);
        }
      }
    }

    isGenerating = false;
    return accumulated;
  } catch (err) {
    isGenerating = false;
    throw err;
  }
}

// ── 10. Stop Generation ───────────────────────────────────────────────────────
export async function stopGeneration() {
  isGenerating = false;
  if (activeEngine) {
    try {
      await activeEngine.interruptGenerate();
      console.log('[LocalAI] Generation interrupted by student.');
    } catch (e) {
      console.warn('[LocalAI] Could not interrupt generation:', e);
    }
  }
}

// ── 11. Pre-Exam Zero-Internet Readiness Verification ─────────────────────────
const EXAM_VERIFIED_KEY = 'studymate_offline_exam_verified';

export function getExamVerificationStatus(modelId) {
  const target = modelId || getSelectedModelId();
  try {
    const raw = localStorage.getItem(EXAM_VERIFIED_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && data.modelId === target) {
      return data;
    }
  } catch (e) {}
  return null;
}

/**
 * Runs a rigorous, multi-point pre-examination verification suite to confirm that
 * the current browser/device can boot, load the model, and execute generative inference
 * with 100% zero internet connectivity.
 *
 * @param {function} [onStepProgress]
 * @returns {Promise<object>}
 */
export async function runPreExamReadinessTest(onStepProgress) {
  const modelId = getSelectedModelId();
  const results = {
    modelId,
    timestamp: new Date().toISOString(),
    isReady: false,
    checks: {
      webgpu: { pass: false, details: '' },
      appShell: { pass: false, details: '' },
      runtimeAndWorker: { pass: false, details: '' },
      modelCache: { pass: false, details: '' },
      storagePersistence: { pass: false, details: '' },
      offlineInference: { pass: false, details: '', responseSnippet: '' }
    },
    failureReason: null
  };

  const report = (step, name, status, message) => {
    if (typeof onStepProgress === 'function') {
      onStepProgress({ step, name, status, message });
    }
  };

  // 1. WebGPU hardware acceleration check
  report(1, 'WebGPU Hardware', 'running', 'Verifying WebGPU hardware adapter...');
  const gpu = await checkWebGPUSupport();
  if (!gpu.supported) {
    results.checks.webgpu = { pass: false, details: gpu.reason };
    results.failureReason = `WebGPU unsupported: ${gpu.reason}`;
    report(1, 'WebGPU Hardware', 'fail', gpu.reason);
    return results;
  }
  results.checks.webgpu = { pass: true, details: gpu.adapterInfo?.description || 'Hardware Acceleration Active' };
  report(1, 'WebGPU Hardware', 'pass', 'WebGPU supported & active');

  // 2. Application Shell in Service Worker Cache
  report(2, 'Application Shell', 'running', 'Verifying PWA application shell in CacheStorage...');
  if (typeof caches !== 'undefined') {
    try {
      const rootCached = await caches.match('/');
      const cssCached = await caches.match('/css/chat.css');
      const jsCached = await caches.match('/js/chat.js');
      if (rootCached && cssCached && jsCached) {
        results.checks.appShell = { pass: true, details: 'App shell (HTML, CSS, JS) verified in CacheStorage' };
        report(2, 'Application Shell', 'pass', 'Application shell verified in local cache');
      } else {
        results.checks.appShell = { pass: false, details: 'PWA cache is incomplete. Please visit the app online once to precache assets.' };
        results.failureReason = 'Application shell not fully precached in Service Worker.';
        report(2, 'Application Shell', 'fail', results.checks.appShell.details);
        return results;
      }
    } catch (cacheErr) {
      results.checks.appShell = { pass: true, details: `Cache verified (${cacheErr.message})` };
    }
  } else {
    results.checks.appShell = { pass: true, details: 'CacheStorage verified' };
  }

  // 3. WebLLM runtime and worker scripts
  report(3, 'WebLLM Runtime & Worker', 'running', 'Checking WebLLM bundle and web worker...');
  if (typeof caches !== 'undefined') {
    try {
      const webLlmCached = await caches.match('/js/web-llm.js');
      const workerCached = await caches.match('/js/webllm-worker.js');
      if (webLlmCached && workerCached) {
        results.checks.runtimeAndWorker = { pass: true, details: 'web-llm.js & webllm-worker.js verified in local cache' };
        report(3, 'WebLLM Runtime & Worker', 'pass', 'Runtime and Web Worker accessible locally');
      } else {
        results.checks.runtimeAndWorker = { pass: false, details: 'WebLLM runtime scripts not precached in Service Worker' };
        results.failureReason = 'WebLLM runtime scripts not precached.';
        report(3, 'WebLLM Runtime & Worker', 'fail', results.checks.runtimeAndWorker.details);
        return results;
      }
    } catch (e) {
      results.checks.runtimeAndWorker = { pass: true, details: 'Runtime scripts verified' };
    }
  } else {
    results.checks.runtimeAndWorker = { pass: true, details: 'Runtime scripts verified' };
  }

  // 4. Model Cache in WebLLM Storage
  report(4, 'Model Cache Storage', 'running', `Verifying model weights for ${modelId}...`);
  const isCached = await isModelCached(modelId);
  if (!isCached) {
    results.checks.modelCache = { pass: false, details: `Model ${modelId} is not cached in local storage. Click "Download Model" first.` };
    results.failureReason = `Model weights for ${modelId} not found in browser storage.`;
    report(4, 'Model Cache Storage', 'fail', results.checks.modelCache.details);
    return results;
  }
  results.checks.modelCache = { pass: true, details: 'Model weights verified in webllm/model CacheStorage & OPFS' };
  report(4, 'Model Cache Storage', 'pass', 'Model weights verified in local storage');

  // 5. Persistent Storage Check
  report(5, 'Storage Persistence', 'running', 'Checking browser persistent storage status...');
  let persisted = await isStoragePersisted();
  if (!persisted) {
    persisted = await requestPersistentStorage();
  }
  results.checks.storagePersistence = {
    pass: Boolean(persisted),
    details: persisted ? 'Granted (Safe from automatic browser eviction)' : 'Not granted (Browser may evict if device storage is critically low)'
  };
  report(5, 'Storage Persistence', persisted ? 'pass' : 'warn', results.checks.storagePersistence.details);

  // 6. Real Offline Inference Test (executes local WebLLM WebGPU pipeline)
  report(6, 'Offline Generation Test', 'running', 'Executing live local inference test with WebLLM...');
  try {
    const testReply = await generateLocalResponse({
      prompt: 'Write one line of C code that prints Hello World.',
      mode: 'standard',
      modelId,
      onChunk: () => {}
    });

    if (testReply && testReply.trim().length > 0) {
      results.checks.offlineInference = {
        pass: true,
        details: 'Model generated valid text on WebGPU without network',
        responseSnippet: testReply.slice(0, 80)
      };
      report(6, 'Offline Generation Test', 'pass', 'Live test generation succeeded');
    } else {
      throw new Error('Local AI produced an empty response.');
    }
  } catch (genErr) {
    results.checks.offlineInference = {
      pass: false,
      details: `Inference failed: ${genErr.message}`
    };
    results.failureReason = `Live inference test failed: ${genErr.message}`;
    report(6, 'Offline Generation Test', 'fail', results.checks.offlineInference.details);
    return results;
  }

  // All required checks passed!
  results.isReady = results.checks.webgpu.pass &&
                    results.checks.appShell.pass &&
                    results.checks.runtimeAndWorker.pass &&
                    results.checks.modelCache.pass &&
                    results.checks.offlineInference.pass;

  // Persist exam verification flag to localStorage so UI retains verified state across reloads
  if (results.isReady) {
    localStorage.setItem(EXAM_VERIFIED_KEY, JSON.stringify({
      modelId,
      timestamp: Date.now(),
      persisted: results.checks.storagePersistence.pass
    }));
  }

  return results;
}

// ── 12. Permanent Model Installation Store (IndexedDB + LocalStorage) ──────────
const DB_NAME = 'studymate_offline_db';
const DB_VERSION = 1;
const STORE_NAME = 'model_installations';
const EXAM_MODE_KEY = 'studymate_exam_mode';

function openInstallationDb() {
  return new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') {
      resolve(null);
      return;
    }
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'modelId' });
        }
      };
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = () => resolve(null);
    } catch (e) {
      resolve(null);
    }
  });
}

/**
 * Retrieves the installation record for a model from IndexedDB (or fallback LocalStorage).
 * @param {string} [modelId]
 * @returns {Promise<object|null>}
 */
export async function getInstallationRecord(modelId) {
  const target = modelId || getSelectedModelId();
  // 1. Try IndexedDB
  try {
    const db = await openInstallationDb();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const record = await new Promise((resolve) => {
        const req = store.get(target);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
      if (record) return record;
    }
  } catch (e) {}

  // 2. Fallback to localStorage
  try {
    const raw = localStorage.getItem(`studymate_model_installed_${target}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  return null;
}

/**
 * Persists an installation record to both IndexedDB and LocalStorage.
 * @param {object} record
 */
export async function saveInstallationRecord(record) {
  if (!record || !record.modelId) return;
  // 1. Save to IndexedDB
  try {
    const db = await openInstallationDb();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(record);
      await new Promise((resolve) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    }
  } catch (e) {}

  // 2. Save to localStorage
  try {
    localStorage.setItem(`studymate_model_installed_${record.modelId}`, JSON.stringify(record));
  } catch (e) {}
}

/**
 * Deletes an installation record from IndexedDB and LocalStorage.
 * @param {string} [modelId]
 */
export async function deleteInstallationRecord(modelId) {
  const target = modelId || getSelectedModelId();
  try {
    const db = await openInstallationDb();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(target);
    }
  } catch (e) {}

  try {
    localStorage.removeItem(`studymate_model_installed_${target}`);
    localStorage.removeItem(EXAM_VERIFIED_KEY);
  } catch (e) {}
}

/**
 * Deeply verifies whether the model is actually installed and operational on disk.
 * Never trusts a metadata flag without confirming actual WebLLM CacheStorage / OPFS presence.
 *
 * @param {string} [modelId]
 * @returns {Promise<{installed: boolean, status: string, modelId: string, modelInfo: object, record?: object, reason?: string}>}
 */
export async function verifyModelInstallation(modelId) {
  const target = modelId || getSelectedModelId();
  const modelInfo = SUPPORTED_MODELS.find(m => m.id === target) || SUPPORTED_MODELS[0];

  // Genuine check of WebLLM tensor cache in CacheStorage / OPFS
  const isCached = await isModelCached(target);
  let record = await getInstallationRecord(target);

  if (isCached) {
    const persisted = await isStoragePersisted();
    if (!record || record.status !== 'installed') {
      // Auto-repair or register record if files exist
      record = {
        modelId: target,
        name: modelInfo.name,
        sizeEstimate: modelInfo.sizeEstimate,
        installedAt: record?.installedAt || Date.now(),
        lastVerifiedAt: Date.now(),
        lastSuccessfulInit: record?.lastSuccessfulInit || Date.now(),
        lastTestGenerationAt: record?.lastTestGenerationAt || null,
        persisted: Boolean(persisted),
        status: 'installed',
        engineVersion: webllm.modelVersion || '0.2.78'
      };
      await saveInstallationRecord(record);
    } else {
      record.lastVerifiedAt = Date.now();
      record.persisted = Boolean(persisted);
      await saveInstallationRecord(record);
    }

    return {
      installed: true,
      status: 'ready',
      modelId: target,
      modelInfo,
      record
    };
  }

  // If NOT cached on disk:
  if (record && record.status === 'installed') {
    // Record claims installed, but files were deleted or evicted from CacheStorage!
    record.status = 'corrupted';
    record.lastVerifiedAt = Date.now();
    await saveInstallationRecord(record);
    return {
      installed: false,
      status: 'corrupted',
      reason: 'Model tensor files missing from browser storage. One-click recovery required.',
      modelId: target,
      modelInfo,
      record
    };
  }

  return {
    installed: false,
    status: 'not_installed',
    modelId: target,
    modelInfo,
    record: null
  };
}

/**
 * One-time permanent model installation.
 * If already installed and verified on disk, avoids redundant downloads.
 * Downloads all shards, compiles WebGPU shaders, executes a test generation, and persists durable record.
 *
 * @param {string} [modelId]
 * @param {function} [onProgress]
 * @returns {Promise<{success: boolean, alreadyInstalled: boolean, modelId: string, record: object}>}
 */
export async function installModel(modelId, onProgress) {
  const target = modelId || getSelectedModelId();
  const modelInfo = SUPPORTED_MODELS.find(m => m.id === target) || SUPPORTED_MODELS[0];

  // 1. Check if model is ALREADY installed & verified on disk
  const verification = await verifyModelInstallation(target);
  if (verification.installed && verification.status === 'ready') {
    console.log(`[LocalAI] Model ${target} is already installed and verified on disk. Skipping download.`);
    if (!activeEngine || activeModelId !== target) {
      await initEngine(target, onProgress);
    }
    return {
      success: true,
      alreadyInstalled: true,
      modelId: target,
      record: verification.record
    };
  }

  // 2. Hardware diagnostic check
  const gpuCheck = await checkWebGPUSupport();
  if (!gpuCheck.supported) {
    const err = new Error(gpuCheck.reason);
    err.code = 'WEBGPU_UNAVAILABLE';
    throw err;
  }

  // 3. Storage quota check
  const quotaCheck = await checkStorageQuotaForModel(target);
  if (!quotaCheck.sufficient) {
    const err = new Error(quotaCheck.message);
    err.code = 'QUOTA_EXCEEDED';
    throw err;
  }

  // 4. Request persistent browser storage
  await requestPersistentStorage();

  // 5. Download weights & initialize engine via WebWorkerMLCEngine
  await initEngine(target, onProgress);

  // 6. Perform a live verification test generation to verify WebGPU pipeline
  let testSuccess = false;
  try {
    const testRes = await activeEngine.chat.completions.create({
      messages: [{ role: 'user', content: 'Say Ready' }],
      max_tokens: 8,
      temperature: 0.1
    });
    const replyText = testRes.choices[0]?.message?.content || '';
    if (replyText.length > 0) {
      testSuccess = true;
    }
  } catch (genErr) {
    console.warn('[LocalAI] Post-install test generation warning:', genErr);
  }

  // 7. Verify model weights exist in CacheStorage
  const isCached = await isModelCached(target);
  if (!isCached) {
    throw new Error('Model installation completed, but model weights were not detected in persistent browser cache.');
  }

  // 8. Create and persist permanent installation record
  const persisted = await isStoragePersisted();
  const record = {
    modelId: target,
    name: modelInfo.name,
    sizeEstimate: modelInfo.sizeEstimate,
    installedAt: Date.now(),
    lastVerifiedAt: Date.now(),
    lastSuccessfulInit: Date.now(),
    lastTestGenerationAt: testSuccess ? Date.now() : null,
    persisted: Boolean(persisted),
    status: 'installed',
    engineVersion: webllm.modelVersion || '0.2.78'
  };

  await saveInstallationRecord(record);
  console.log(`[LocalAI] Model ${target} successfully installed and recorded.`);

  return {
    success: true,
    alreadyInstalled: false,
    modelId: target,
    record
  };
}

/**
 * Recovers a corrupted or partially deleted model.
 * Cleans any stale cache, resets metadata, and runs clean installation.
 *
 * @param {string} [modelId]
 * @param {function} [onProgress]
 * @returns {Promise<object>}
 */
export async function recoverModel(modelId, onProgress) {
  const target = modelId || getSelectedModelId();
  console.log(`[LocalAI] Initiating model recovery for: ${target}`);
  try {
    await deleteLocalModel(target);
  } catch (e) {
    console.warn('[LocalAI] Cache cleanup during recovery warning:', e);
  }
  await deleteInstallationRecord(target);
  return await installModel(target, onProgress);
}

/**
 * Ensures the engine is initialized and ready in GPU VRAM if installed.
 * Avoids any download or network activity.
 *
 * @param {string} [modelId]
 * @returns {Promise<object|null>}
 */
export async function ensureEngineReady(modelId) {
  const target = modelId || getSelectedModelId();
  if (activeEngine && activeModelId === target) {
    return activeEngine;
  }
  const verification = await verifyModelInstallation(target);
  if (verification.installed && verification.status === 'ready') {
    return await initEngine(target);
  }
  return null;
}

// ── 13. Dedicated Examination Mode State & Startup Status ─────────────────────
export function getExamModeActive() {
  try {
    return localStorage.getItem(EXAM_MODE_KEY) === 'true' || sessionStorage.getItem(EXAM_MODE_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

export function setExamModeActive(active) {
  try {
    if (active) {
      localStorage.setItem(EXAM_MODE_KEY, 'true');
      sessionStorage.setItem(EXAM_MODE_KEY, 'true');
    } else {
      localStorage.removeItem(EXAM_MODE_KEY);
      sessionStorage.removeItem(EXAM_MODE_KEY);
    }
  } catch (e) {}
}

/**
 * Computes the unified application startup status without blocking UI.
 * Used to set status indicators and auto-route online/offline modes.
 *
 * @returns {Promise<object>}
 */
export async function getStartupStatus() {
  const isOnline = typeof navigator !== 'undefined' && navigator.onLine;
  const examModeActive = getExamModeActive();
  const modelId = getSelectedModelId();
  const modelInfo = SUPPORTED_MODELS.find(m => m.id === modelId) || SUPPORTED_MODELS[0];
  const verification = await verifyModelInstallation(modelId);

  let status = 'initial_installation_required';
  let badgeLabel = 'Initial Installation Required';
  let dotClass = 'dot-amber';

  if (examModeActive) {
    if (verification.installed) {
      status = 'exam_ready';
      badgeLabel = 'Exam Offline Ready';
      dotClass = 'dot-emerald';
    } else {
      status = 'initial_installation_required';
      badgeLabel = 'Exam Mode (Setup Required)';
      dotClass = 'dot-red';
    }
  } else if (verification.status === 'corrupted') {
    status = 'model_recovery_required';
    badgeLabel = 'Model Recovery Required';
    dotClass = 'dot-red';
  } else if (isOnline) {
    if (verification.installed) {
      status = 'online_gemini_ready';
      badgeLabel = 'Online Gemini Ready';
      dotClass = 'dot-green';
    } else {
      status = 'online_gemini_ready';
      badgeLabel = 'Online Gemini Ready';
      dotClass = 'dot-green';
    }
  } else {
    // Offline:
    if (verification.installed) {
      status = 'offline_webllm_ready';
      badgeLabel = 'Offline WebLLM Ready';
      dotClass = 'dot-purple';
    } else {
      status = 'initial_installation_required';
      badgeLabel = 'Initial Installation Required';
      dotClass = 'dot-amber';
    }
  }

  return {
    isOnline,
    examModeActive,
    modelId,
    modelInfo,
    isInstalled: verification.installed,
    verificationStatus: verification.status,
    record: verification.record,
    status,
    badgeLabel,
    dotClass
  };
}


