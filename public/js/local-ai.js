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
    vramEstimate: '~1.6 GB VRAM',
    isDefault: true
  },
  {
    id: 'Qwen2.5-Coder-0.5B-Instruct-q4f16_1-MLC',
    name: 'Qwen2.5-Coder 0.5B (Ultra-Light)',
    tagline: 'Fast download, minimal VRAM, standard C & algorithms',
    sizeEstimate: '~390 MB',
    vramEstimate: '~950 MB VRAM',
    isDefault: false
  },
  {
    id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
    name: 'Llama-3.2 1B Instruct',
    tagline: 'Fast general-purpose academic study companion by Meta',
    sizeEstimate: '~700 MB',
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

export async function initEngine(modelId, onProgress) {
  const targetModel = modelId || getSelectedModelId();

  if (activeEngine && activeModelId === targetModel) {
    return activeEngine;
  }

  const gpuCheck = await checkWebGPUSupport();
  if (!gpuCheck.supported) {
    throw new Error(gpuCheck.reason);
  }

  // Request persistent storage so model weights aren't evicted
  await requestPersistentStorage();

  // If another model is active, unload it
  if (activeEngine) {
    await unloadEngine();
  }

  isInitializing = true;
  try {
    activeWorker = new Worker('/js/webllm-worker.js', { type: 'module' });

    activeEngine = await webllm.CreateWebWorkerMLCEngine(activeWorker, targetModel, {
      initProgressCallback: (report) => {
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

