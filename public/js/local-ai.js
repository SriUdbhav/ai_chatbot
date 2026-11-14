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
      max_tokens: 1536
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

