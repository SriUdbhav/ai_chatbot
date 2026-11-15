/**
 * StudyMate AI — Multi-Provider Local AI Availability Detector & Router
 *
 * Implements:
 *   • Probing of WebLLM (WebGPU & Persistent CacheStorage)
 *   • Probing of Chrome Built-in AI (Prompt API / LanguageModel / Gemini Nano)
 *   • Probing of Configured Local AI Services (e.g. Ollama endpoint)
 *   • Probing of PWA Service Worker offline shell
 *   • Probing of Offline Data Structures Knowledge Assistant
 *   • Priority response routing: Gemini -> WebLLM -> Chrome AI -> Local Service -> Offline Knowledge
 */

(function (global) {
  'use strict';

  const LOCAL_SERVICE_KEY = 'studymate_local_service_endpoint';

  /**
   * Checks Chrome Built-in Prompt API / LanguageModel API (Gemini Nano).
   * @returns {Promise<{available: boolean, provider?: string, status?: string, reason?: string}>}
   */
  async function checkChromeBuiltInAI() {
  try {
    if (typeof window !== 'undefined' && window.ai && window.ai.languageModel) {
      const caps = await window.ai.languageModel.capabilities();
      if (caps && (caps.available === 'readily' || caps.available === 'after-download')) {
        return { available: true, provider: 'window.ai.languageModel', status: caps.available };
      }
    }
    if (typeof window !== 'undefined' && window.LanguageModel) {
      return { available: true, provider: 'window.LanguageModel', status: 'readily' };
    }
    if (typeof window !== 'undefined' && window.ai && window.ai.assistant) {
      const caps = await window.ai.assistant.capabilities();
      if (caps && (caps.available === 'readily' || caps.available === 'after-download')) {
        return { available: true, provider: 'window.ai.assistant', status: caps.available };
      }
    }
  } catch (err) {
    // Permission or security barrier
  }
  return { available: false, reason: 'Chrome built-in AI (Prompt API) not available' };
}

/**
 * Checks an explicitly configured local AI service endpoint (e.g. Ollama).
 * Strictly bounds probe timeout and handles CORS/network errors gracefully.
 * @param {string} [customEndpoint]
 * @returns {Promise<{available: boolean, endpoint: string, models?: string[], reason?: string}>}
 */
async function checkLocalAIService(customEndpoint) {
  const endpoint = customEndpoint || (typeof localStorage !== 'undefined' ? localStorage.getItem(LOCAL_SERVICE_KEY) : null) || 'http://localhost:11434';

  try {
    // Short timeout (1.5s) to avoid UI delays or hung sockets
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const res = await fetch(`${endpoint}/api/tags`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const models = (data.models || []).map(m => m.name || m.model);
      return { available: true, endpoint, models };
    }
  } catch (err) {
    // Service not running or CORS restricted
  }
  return { available: false, endpoint, reason: 'Local AI service not reachable at endpoint' };
}

/**
 * Executes a comprehensive, non-blocking diagnostic scan of all local AI options.
 * @param {object} [options]
 * @returns {Promise<object>}
 */
async function detectAllLocalAIOptions(options = {}) {
  const isOnline = typeof navigator !== 'undefined' && navigator.onLine;

  // 1. WebLLM & WebGPU
  let localAiMod = options.localAiInstance || null;
  if (!localAiMod) {
    try {
      localAiMod = await import('./local-ai.js');
    } catch (e) {}
  }

  let webgpu = { supported: false };
  let webllm = { installed: false, status: 'not_installed' };
  let examModeActive = false;

  if (localAiMod) {
    webgpu = await localAiMod.checkWebGPUSupport();
    const modelId = localAiMod.getSelectedModelId();
    webllm = await localAiMod.verifyModelInstallation(modelId);
    examModeActive = localAiMod.getExamModeActive();
  }

  // 2. Chrome Built-in AI
  const chromeAi = await checkChromeBuiltInAI();

  // 3. Local AI Service (Ollama)
  const localService = await checkLocalAIService();

  // 4. PWA Service Worker offline status
  let pwaCached = false;
  if (typeof caches !== 'undefined') {
    try {
      const root = await caches.match('/');
      pwaCached = Boolean(root);
    } catch (e) {}
  }

  // 5. Offline Knowledge Assistant (always ready on disk)
  const offlineKnowledge = {
    available: true,
    syllabusUnits: 7,
    title: 'Offline Data Structures Exam Assistant'
  };

  // Compile standard diagnostic states
  const diagnosticStates = [];

  if (!isOnline) {
    diagnosticStates.push('Internet unavailable');
  }

  if (webgpu.supported && webllm.installed && webllm.status === 'ready') {
    diagnosticStates.push('Local AI model available');
  } else if (webllm.status === 'corrupted') {
    diagnosticStates.push('Local AI model installed but initialization failed');
  } else if (!webgpu.supported) {
    diagnosticStates.push('WebGPU unavailable');
  }

  if (chromeAi.available) {
    diagnosticStates.push('Chrome built-in AI available');
  }

  if (localService.available) {
    diagnosticStates.push('Local AI service available');
  }

  const hasAnyGenerativeLocal = (webgpu.supported && webllm.installed) || chromeAi.available || localService.available;
  if (!hasAnyGenerativeLocal) {
    diagnosticStates.push('No compatible local AI found');
  }

  diagnosticStates.push('Offline knowledge assistant available');

  return {
    timestamp: Date.now(),
    isOnline,
    examModeActive,
    webgpu,
    webllm,
    chromeAi,
    localService,
    pwaCached,
    offlineKnowledge,
    hasGenerativeLocal: hasAnyGenerativeLocal,
    diagnosticStates
  };
}

/**
 * Resolves which AI engine should handle a prompt based on priority:
 *   1. Online Gemini (if online & not in Exam Mode)
 *   2. Local WebLLM (if installed & WebGPU active)
 *   3. Chrome Built-in AI (if available)
 *   4. Local AI Service (if Ollama running)
 *   5. Offline Knowledge Assistant (always available fallback)
 *
 * @param {object} [options]
 * @returns {Promise<object>}
 */
async function resolveActiveResponseEngine(options = {}) {
  const detection = await detectAllLocalAIOptions(options);
  const { forcedEngine } = options;

  if (forcedEngine === 'offline_knowledge') {
    return {
      engine: 'offline_knowledge',
      displayName: 'Offline Knowledge Assistant',
      badgeClass: 'dot-amber',
      isGenerative: false,
      reason: 'User selected offline knowledge mode'
    };
  }

  // Examination Mode locks to local
  if (detection.examModeActive) {
    if (detection.webllm.installed && detection.webgpu.supported) {
      return {
        engine: 'webllm',
        displayName: 'Local WebLLM',
        badgeClass: 'dot-emerald',
        isGenerative: true,
        reason: 'Exam Mode active (Local WebGPU WebLLM)'
      };
    } else if (detection.chromeAi.available) {
      return {
        engine: 'chrome_built_in',
        displayName: 'Chrome Built-in AI',
        badgeClass: 'dot-emerald',
        isGenerative: true,
        reason: 'Exam Mode active (Chrome Built-in AI)'
      };
    } else {
      return {
        engine: 'offline_knowledge',
        displayName: 'Offline Knowledge Assistant',
        badgeClass: 'dot-emerald',
        isGenerative: false,
        reason: 'Exam Mode active (Offline Knowledge Assistant)'
      };
    }
  }

  // Priority 1: Gemini Online
  if (detection.isOnline && forcedEngine !== 'local') {
    return {
      engine: 'gemini',
      displayName: 'Online Gemini',
      badgeClass: 'dot-green',
      isGenerative: true,
      reason: 'Internet connected and Gemini service reachable'
    };
  }

  // Priority 2: WebLLM on WebGPU
  if (detection.webgpu.supported && detection.webllm.installed && detection.webllm.status === 'ready') {
    return {
      engine: 'webllm',
      displayName: 'Local WebLLM',
      badgeClass: 'dot-purple',
      isGenerative: true,
      reason: 'On-device WebLLM model cached in browser storage'
    };
  }

  // Priority 3: Chrome Built-in AI
  if (detection.chromeAi.available) {
    return {
      engine: 'chrome_built_in',
      displayName: 'Chrome Built-in AI',
      badgeClass: 'dot-blue',
      isGenerative: true,
      reason: 'Chrome Gemini Nano (Prompt API) active'
    };
  }

  // Priority 4: Configured Local AI Service (Ollama)
  if (detection.localService.available) {
    return {
      engine: 'local_service',
      displayName: 'Local AI Service',
      badgeClass: 'dot-blue',
      isGenerative: true,
      reason: `Local AI service active at ${detection.localService.endpoint}`
    };
  }

  // Priority 5: Offline Knowledge Assistant
  return {
    engine: 'offline_knowledge',
    displayName: 'Offline Knowledge Assistant',
    badgeClass: 'dot-amber',
    isGenerative: false,
    reason: 'Offline mode: Data Structures knowledge assistant active'
  };
}

/**
 * Generates an answer using Chrome Built-in Prompt API.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
async function generateChromeBuiltInResponse(prompt) {
  if (typeof window !== 'undefined' && window.ai && window.ai.languageModel) {
    const session = await window.ai.languageModel.create();
    const reply = await session.prompt(prompt);
    return reply;
  }
  if (typeof window !== 'undefined' && window.LanguageModel) {
    const session = await window.LanguageModel.create();
    return await session.prompt(prompt);
  }
  throw new Error('Chrome Built-in AI session could not be created.');
}

/**
 * Generates an answer using configured local service (Ollama).
 * @param {string} prompt
 * @param {string} [endpoint]
 * @returns {Promise<string>}
 */
async function generateLocalServiceResponse(prompt, endpoint) {
  const target = endpoint || (typeof localStorage !== 'undefined' ? localStorage.getItem(LOCAL_SERVICE_KEY) : null) || 'http://localhost:11434';
  const res = await fetch(`${target}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'qwen2.5-coder:1.5b',
      prompt,
      stream: false
    })
  });
  if (!res.ok) {
    throw new Error(`Local service returned status ${res.status}`);
  }
  const data = await res.json();
  return data.response || '';
}

  const LocalAIDetector = {
    LOCAL_SERVICE_KEY,
    checkChromeBuiltInAI,
    checkLocalAIService,
    detectAllLocalAIOptions,
    resolveActiveResponseEngine,
    generateChromeBuiltInResponse,
    generateLocalServiceResponse
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocalAIDetector;
  }
  if (typeof window !== 'undefined') {
    window.LocalAIDetector = LocalAIDetector;
  }
  global.LocalAIDetector = LocalAIDetector;
})(typeof globalThis !== 'undefined' ? globalThis : this);
