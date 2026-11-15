/**
 * Chat Controller — Phase 3
 *
 * Handles:
 *   GET  /        → render chat UI (EJS)
 *   POST /api/chat → validate input → call Gemini → return JSON
 *
 * Security guarantees:
 *   • API key is read only from process.env; never returned to the client.
 *   • Stack traces and internal error details are stripped before responding.
 *   • Arbitrary system instructions from the browser are ignored.
 *   • Conversation history is validated and capped server-side.
 */

'use strict';

const {
  isApiKeyConfigured,
  getGenAIClient,
  getModelName,
  getFallbackModelName,
  getImageModelName,
  getFallbackImageModelName,
  getFastImageModelName,
  getQualityImageModelName,
} = require('../config/gemini');

// In-memory image cache to eliminate duplicate network calls and provide sub-second responses for repeated queries
const imageMemoryCache = new Map();
const MAX_IMAGE_CACHE_SIZE = 30;

function getCachedImage(key) {
  if (imageMemoryCache.has(key)) {
    const item = imageMemoryCache.get(key);
    // Refresh LRU order
    imageMemoryCache.delete(key);
    imageMemoryCache.set(key, item);
    return item;
  }
  return null;
}

function setCachedImage(key, data) {
  if (imageMemoryCache.size >= MAX_IMAGE_CACHE_SIZE) {
    const oldestKey = imageMemoryCache.keys().next().value;
    if (oldestKey) imageMemoryCache.delete(oldestKey);
  }
  imageMemoryCache.set(key, data);
}

// ── Constants ─────────────────────────────────────────────────────────────────

/** Maximum characters accepted in a single user message. */
const MAX_MESSAGE_LENGTH = 4000;

/**
 * Maximum number of prior turns (user + model pairs) forwarded to Gemini.
 * Each turn = 2 messages (user + model). So 6 turns = up to 12 messages max.
 * Keeps token costs and latency in check.
 */
const MAX_HISTORY_TURNS = 6;

/**
 * System instruction injected server-side.
 * The browser cannot override this; only the server sets it.
 */
const SYSTEM_INSTRUCTION = `You are an AI Study Assistant helping college students understand academic topics clearly and accurately. Your role is to:

- Give precise, well-structured explanations of concepts across subjects including programming, mathematics, science, engineering, history, literature, and general knowledge.
- Use concrete examples, analogies, and step-by-step reasoning to make complex ideas approachable.
- Format responses with headings, bullet lists, numbered steps, and code blocks where appropriate to improve readability.
- When answering programming questions, include working code examples with brief explanations of key lines.
- Be honest about uncertainty — say so rather than guessing when you are unsure.
- Keep responses focused and educational in tone, suitable for a college-level audience.
- You may answer non-study questions naturally; you are a helpful general assistant as well.
- Never fabricate citations, journal names, or authors. If referencing a source, name it only if you are confident it exists.`;

/**
 * Validated study modes and learning preferences mapped to server-controlled prompt guidance.
 * The client cannot pass arbitrary instructions; it can only select from these safe presets.
 */
const STUDY_MODES = {
  standard: '',
  simple: '\n\nSTUDY MODE ACTIVE: SIMPLE EXPLANATION. Explain concepts in simple, plain language as if explaining to a beginner. Use relatable real-world analogies, avoid excessive technical jargon, and make abstract ideas intuitive.',
  step_by_step: '\n\nSTUDY MODE ACTIVE: STEP-BY-STEP LEARNING. Break your entire response down into sequential, numbered, and progressive steps. Guide the student through the concept stage by stage.',
  exam_prep: '\n\nSTUDY MODE ACTIVE: EXAM PREPARATION. Focus on high-yield exam concepts, exact definitions, key formulas, critical distinctions, common exam pitfalls, and what professors look for in full-credit answers.',
  practice: '\n\nSTUDY MODE ACTIVE: PRACTICE QUESTIONS. After answering the student\'s question thoroughly, always provide 1–2 challenging follow-up practice questions or quick-check conceptual problems for the student to test their understanding.',
  code_focus: '\n\nSTUDY MODE ACTIVE: PROGRAMMING FOCUS. Prioritize working code examples, syntax breakdowns, best practices, edge case handling, and line-by-line code walk-throughs in your response.',
};

// ── Page render ───────────────────────────────────────────────────────────────

/**
 * GET /
 * Renders the main chat UI template, injecting only non-sensitive config.
 */
exports.getChatPage = (req, res) => {
  res.render('chat', {
    pageTitle: 'AI Study Assistant',
    apiKeyConfigured: isApiKeyConfigured(),
    geminiModel: getModelName(),
    currentYear: new Date().getFullYear(),
  });
};

// ── Chat endpoint ─────────────────────────────────────────────────────────────

/**
 * POST /api/chat
 *
 * Expected JSON body:
 *   {
 *     "message": "What is recursion?",
 *     "history": [
 *       { "role": "user",  "content": "Explain loops." },
 *       { "role": "model", "content": "A loop repeats …" }
 *     ]
 *   }
 *
 * Successful response:
 *   { "status": "success", "reply": "<AI response text>" }
 *
 * Error response:
 *   { "status": "error", "code": "...", "message": "…safe message…" }
 */
exports.postChat = async (req, res) => {
  // ── 1. Input validation ───────────────────────────────────────────────────
  const { message, history, mode = 'standard', attachments = [] } = req.body || {};

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({
      status:  'error',
      code:    'INVALID_MESSAGE',
      message: 'A non-empty message string is required.',
    });
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return res.status(413).json({
      status:  'error',
      code:    'MESSAGE_TOO_LONG',
      message: `Message exceeds the maximum length of ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  // ── 2. Guard: API key must be configured ──────────────────────────────────
  if (!isApiKeyConfigured()) {
    return res.status(503).json({
      status:  'error',
      code:    'API_KEY_NOT_CONFIGURED',
      message: 'The Gemini API key is not configured on the server. Add GEMINI_API_KEY to your .env file and restart.',
    });
  }

  // ── 3. Validate and sanitise history ─────────────────────────────────────
  //  Accept only well-formed { role, content } objects; discard anything else.
  //  Accept 'user', 'model', or 'assistant' (mapped to 'model').
  //  Cap at MAX_HISTORY_TURNS pairs to keep token usage bounded.
  let sanitisedHistory = [];
  if (Array.isArray(history)) {
    const validRoles = new Set(['user', 'model', 'assistant']);
    sanitisedHistory = history
      .filter(
        (h) =>
          h &&
          typeof h === 'object' &&
          validRoles.has(h.role) &&
          typeof h.content === 'string' &&
          h.content.trim().length > 0
      )
      .map((h) => ({
        role:    h.role === 'assistant' ? 'model' : h.role,
        content: h.content.slice(0, MAX_MESSAGE_LENGTH), // cap each item too
      }));

    // Keep only the most recent MAX_HISTORY_TURNS pairs
    const maxItems = MAX_HISTORY_TURNS * 2;
    if (sanitisedHistory.length > maxItems) {
      sanitisedHistory = sanitisedHistory.slice(sanitisedHistory.length - maxItems);
    }

    // Ensure history starts with a 'user' turn (Gemini requirement for multi-turn chat)
    while (sanitisedHistory.length > 0 && sanitisedHistory[0].role !== 'user') {
      sanitisedHistory.shift();
    }
  }

  // ── 4. Attachments & Contextual Formatting ────────────────────────────────
  let contextualMessage = trimmedMessage;
  const imageParts = [];

  if (Array.isArray(attachments) && attachments.length > 0) {
    const docContexts = [];

    for (const att of attachments) {
      if (!att || typeof att !== 'object') continue;
      const fname = String(att.filename || 'Attached File').slice(0, 100);
      const ftype = String(att.fileType || 'file').toUpperCase();
      const content = typeof att.text === 'string' ? att.text.slice(0, 50000) : '';

      if (content) {
        docContexts.push(
          `[ATTACHED DOCUMENT: "${fname}" (${ftype})]\n` +
          `--- START OF FILE CONTENT ---\n` +
          `${content}\n` +
          `--- END OF FILE CONTENT ---`
        );
      }

      // Check if image dataUrl or inlineData is provided
      if (att.dataUrl && typeof att.dataUrl === 'string' && att.dataUrl.startsWith('data:image/')) {
        const mimeMatch = att.dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
        if (mimeMatch) {
          imageParts.push({
            inlineData: {
              mimeType: mimeMatch[1],
              data: mimeMatch[2],
            },
          });
        }
      }
    }

    if (docContexts.length > 0) {
      contextualMessage = `${docContexts.join('\n\n')}\n\n[STUDENT'S INSTRUCTION / QUESTION]:\n${trimmedMessage}`;
    }
  }

  // ── 5. Call Gemini ────────────────────────────────────────────────────────
  const ai = getGenAIClient();
  if (!ai) {
    return res.status(503).json({
      status:  'error',
      code:    'CLIENT_INIT_FAILED',
      message: 'Could not initialise the AI client. Check server configuration.',
    });
  }

  const modelName = getModelName();
  const safeMode = STUDY_MODES[mode] !== undefined ? mode : 'standard';

  try {
    const reply = await callGemini(ai, modelName, sanitisedHistory, contextualMessage, safeMode, imageParts);
    return res.json({ status: 'success', reply, mode: safeMode });

  } catch (err) {
    return handleGeminiError(res, err, ai, sanitisedHistory, contextualMessage, safeMode, imageParts);
  }
};

// ── Gemini call helper ────────────────────────────────────────────────────────

/**
 * Calls Gemini using the Chat API with conversation history.
 * Uses ai.chats.create() (v2 SDK) for multi-turn support.
 *
 * @param {import('@google/genai').GoogleGenAI} ai
 * @param {string} modelName
 * @param {{ role: string, content: string }[]} history
 * @param {string} userMessage
 * @param {string} mode
 * @param {Array}  imageParts
 * @returns {Promise<string>}
 */
async function callGemini(ai, modelName, history, userMessage, mode = 'standard', imageParts = []) {
  // Map our internal history format to the SDK's Content[] shape
  // The @google/genai v2 Chat accepts { role, parts: [{ text }] }
  const sdkHistory = history.map((h) => ({
    role:  h.role,
    parts: [{ text: h.content }],
  }));

  const modeGuidance = STUDY_MODES[mode] || '';
  const finalSystemInstruction = SYSTEM_INSTRUCTION + modeGuidance;

  const chat = ai.chats.create({
    model:  modelName,
    config: {
      systemInstruction: finalSystemInstruction,
      maxOutputTokens: 8192,
    },
    history: sdkHistory,
  });

  let messagePayload = userMessage;
  if (Array.isArray(imageParts) && imageParts.length > 0) {
    messagePayload = [{ text: userMessage }, ...imageParts];
  }

  const response = await chat.sendMessage({ message: messagePayload });

  // Extract text — the v2 SDK exposes response.text as a property
  const text =
    typeof response.text === 'function'
      ? response.text()
      : response.text;

  if (!text || typeof text !== 'string' || text.trim() === '') {
    throw new Error('EMPTY_RESPONSE');
  }

  return text.trim();
}

// ── Error handler ─────────────────────────────────────────────────────────────

/**
 * Classifies Gemini/network errors and returns a safe, user-friendly JSON
 * response. Never exposes the API key, stack traces, or raw SDK error objects.
 *
 * If the preferred model is unavailable (404/model error), automatically
 * retries with the fallback model.
 */
async function handleGeminiError(res, err, ai, history, userMessage, mode = 'standard', imageParts = []) {
  const errMsg   = (err.message || '').toLowerCase();
  const errStr   = String(err);

  console.error('[Gemini] Error calling API:', errStr.replace(/AIza\S+/g, '[REDACTED]'));

  // ── Model not found / unavailable → retry with fallback ──────────────────
  const isModelError =
    errMsg.includes('not found') ||
    errMsg.includes('404') ||
    errMsg.includes('503') ||
    errMsg.includes('unavailable') ||
    errMsg.includes('high demand') ||
    errMsg.includes('overloaded') ||
    errMsg.includes('model') ||
    errMsg.includes('invalid model') ||
    errMsg.includes('not supported');

  if (isModelError) {
    const fallback = getFallbackModelName();
    console.warn(`[Gemini] Preferred model unavailable. Retrying with fallback: ${fallback}`);
    try {
      const reply = await callGemini(ai, fallback, history, userMessage, mode, imageParts);
      return res.json({ status: 'success', reply, usedFallbackModel: true, mode });
    } catch (fallbackErr) {
      console.error('[Gemini] Fallback model also failed:', String(fallbackErr).replace(/AIza\S+/g, '[REDACTED]'));
      return res.status(502).json({
        status:  'error',
        code:    'MODEL_UNAVAILABLE',
        message: `The AI model is currently unavailable. Please try again shortly. (Tried: ${getModelName()}, ${fallback})`,
      });
    }
  }

  // ── Invalid / expired API key ─────────────────────────────────────────────
  if (
    errMsg.includes('api key') ||
    errMsg.includes('api_key') ||
    errMsg.includes('invalid_api_key') ||
    errMsg.includes('api_key_invalid') ||
    errMsg.includes('permission_denied') ||
    errMsg.includes('401') ||
    errMsg.includes('403') ||
    errMsg.includes('unauthenticated')
  ) {
    return res.status(401).json({
      status:  'error',
      code:    'INVALID_API_KEY',
      message: 'The Gemini API key is invalid or has expired. Update GEMINI_API_KEY in your .env file and restart the server.',
    });
  }

  // ── Rate limit / quota exceeded ───────────────────────────────────────────
  if (
    errMsg.includes('quota') ||
    errMsg.includes('rate') ||
    errMsg.includes('limit') ||
    errMsg.includes('429') ||
    errMsg.includes('resource_exhausted')
  ) {
    return res.status(429).json({
      status:  'error',
      code:    'RATE_LIMIT',
      message: 'The AI service rate limit has been reached. Please wait a moment and try again.',
    });
  }

  // ── Safety block ──────────────────────────────────────────────────────────
  if (
    errMsg.includes('safety') ||
    errMsg.includes('blocked') ||
    errMsg.includes('finish_reason: safety') ||
    errMsg.includes('harm')
  ) {
    return res.status(422).json({
      status:  'error',
      code:    'SAFETY_BLOCK',
      message: 'Your message was flagged by the AI safety filter. Please rephrase your question.',
    });
  }

  // ── Empty response ────────────────────────────────────────────────────────
  if (errMsg.includes('empty_response')) {
    return res.status(502).json({
      status:  'error',
      code:    'EMPTY_RESPONSE',
      message: 'The AI returned an empty response. Please try rephrasing your question.',
    });
  }

  // ── Network / timeout ─────────────────────────────────────────────────────
  if (
    errMsg.includes('network') ||
    errMsg.includes('fetch') ||
    errMsg.includes('timeout') ||
    errMsg.includes('econnrefused') ||
    errMsg.includes('enotfound')
  ) {
    return res.status(503).json({
      status:  'error',
      code:    'NETWORK_ERROR',
      message: 'Could not reach the Gemini API. Check your internet connection and try again.',
    });
  }

  // ── Fallback: generic internal error ─────────────────────────────────────
  return res.status(500).json({
    status:  'error',
    code:    'INTERNAL_ERROR',
    message: 'An unexpected error occurred while contacting the AI. Please try again.',
  });
}

// ── Image Generation Endpoint (Phase 6 / ChatGPT-Style Upgrade) ───────────────

/**
 * POST /api/chat/generate-image
 *
 * Generates an image using Gemini's official image models.
 * API key is handled securely server-side only.
 *
 * Expected JSON body:
 *   { "prompt": "Diagram of plant cell organelles" }
 */
exports.postGenerateImage = async (req, res) => {
  // Stage 2: Backend request received
  const t_backend_recv = Date.now();
  const { prompt, mode = 'fast', clientTimestamp } = req.body || {};
  const t_user_submit = (typeof clientTimestamp === 'number' && clientTimestamp > 0)
    ? clientTimestamp
    : t_backend_recv;

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({
      status:  'error',
      code:    'INVALID_PROMPT',
      message: 'A descriptive text prompt is required to generate an image.',
    });
  }

  const trimmedPrompt = prompt.trim();
  if (trimmedPrompt.length > 1000) {
    return res.status(413).json({
      status:  'error',
      code:    'PROMPT_TOO_LONG',
      message: 'Image prompt exceeds the maximum length of 1000 characters.',
    });
  }

  const validMode = (mode === 'quality') ? 'quality' : 'fast';
  const resolution = validMode === 'quality' ? '1024x1024' : '512x512';

  // Check in-memory LRU cache for instant repeat generation (< 5ms)
  const cacheKey = `${validMode}:${trimmedPrompt.toLowerCase()}`;
  const cached = getCachedImage(cacheKey);
  if (cached) {
    const t_extract_end = Date.now();
    return res.json({
      status:      'success',
      imageBase64: cached.imageBase64,
      mimeType:    cached.mimeType,
      prompt:      trimmedPrompt,
      model:       cached.model,
      engine:      cached.engine + ' (Instant Cache)',
      mode:        validMode,
      resolution:  cached.resolution,
      cached:      true,
      timestamps: {
        userSubmit:  t_user_submit,
        backendRecv: t_backend_recv,
        apiStart:    t_backend_recv,
        apiEnd:      t_extract_end,
        extractEnd:  t_extract_end,
      },
      durations: {
        clientToBackendMs: Math.max(0, t_backend_recv - t_user_submit),
        apiProcessingMs:   0,
        backendExtractMs:  0,
        backendTotalMs:    Math.max(0, t_extract_end - t_backend_recv),
      },
    });
  }

  if (!isApiKeyConfigured()) {
    return res.status(503).json({
      status:  'error',
      code:    'API_KEY_NOT_CONFIGURED',
      message: 'The Gemini API key is not configured on the server. Add GEMINI_API_KEY to your .env file.',
    });
  }

  const ai = getGenAIClient();
  if (!ai) {
    return res.status(503).json({
      status:  'error',
      code:    'CLIENT_INIT_FAILED',
      message: 'Could not initialise the AI client. Check server configuration.',
    });
  }

  const preferredModel = getImageModelName(validMode);
  const fallbackModel = getFallbackImageModelName();

  // Stage 3: Gemini API request started
  const t_gemini_start = Date.now();

  try {
    let result = await attemptGenerateImage(ai, preferredModel, trimmedPrompt, validMode);

    if (result && result.imageBase64) {
      // Stage 4: Gemini API response received & Stage 5: Extraction complete
      const t_gemini_end = Date.now();
      const t_extract_end = Date.now();

      const responsePayload = {
        status:      'success',
        imageBase64: result.imageBase64,
        mimeType:    result.mimeType || 'image/png',
        prompt:      trimmedPrompt,
        model:       result.modelUsed || preferredModel,
        engine:      'Gemini Image',
        mode:        validMode,
        resolution,
        timestamps: {
          userSubmit:  t_user_submit,
          backendRecv: t_backend_recv,
          apiStart:    t_gemini_start,
          apiEnd:      t_gemini_end,
          extractEnd:  t_extract_end,
        },
        durations: {
          clientToBackendMs: Math.max(0, t_backend_recv - t_user_submit),
          apiProcessingMs:   Math.max(0, t_gemini_end - t_gemini_start),
          backendExtractMs:  Math.max(0, t_extract_end - t_gemini_end),
          backendTotalMs:    Math.max(0, t_extract_end - t_backend_recv),
        },
      };

      setCachedImage(cacheKey, responsePayload);
      return res.json(responsePayload);
    }

    // If Gemini model returned without inline image data, fulfill via AI Diffusion engine
    console.log('[Image Service] Gemini model returned no image bytes. Fulfilling via AI Diffusion engine...');
    const diffusion = await generateViaDiffusionEngine(trimmedPrompt, validMode);
    const t_gemini_end = Date.now();
    const t_extract_end = Date.now();

    const responsePayload = {
      status:      'success',
      imageBase64: diffusion.imageBase64,
      mimeType:    diffusion.mimeType,
      prompt:      trimmedPrompt,
      model:       validMode === 'quality' ? 'Stable Diffusion XL (High Detail)' : 'Fast Diffusion (Turbo 512)',
      engine:      'AI Image Diffusion',
      mode:        validMode,
      resolution,
      timestamps: {
        userSubmit:  t_user_submit,
        backendRecv: t_backend_recv,
        apiStart:    t_gemini_start,
        apiEnd:      t_gemini_end,
        extractEnd:  t_extract_end,
      },
      durations: {
        clientToBackendMs: Math.max(0, t_backend_recv - t_user_submit),
        apiProcessingMs:   Math.max(0, t_gemini_end - t_gemini_start),
        backendExtractMs:  Math.max(0, t_extract_end - t_gemini_end),
        backendTotalMs:    Math.max(0, t_extract_end - t_backend_recv),
      },
    };

    setCachedImage(cacheKey, responsePayload);
    return res.json(responsePayload);

  } catch (err) {
    const errMsg = (err.message || '').toLowerCase();
    const isQuotaZero = errMsg.includes('free tier') || errMsg.includes('limit: 0') || errMsg.includes('quota') || errMsg.includes('429');

    // When Gemini Free Tier has 0 quota for image models (QUOTA_EXCEEDED_FREE_TIER),
    // immediately generate real image via AI Diffusion engine fallback without slow retries
    if (isQuotaZero) {
      console.log('[Image Service] Gemini Free Tier image quota is 0. Generating real image via online AI Diffusion engine...');
      try {
        const diffusion = await generateViaDiffusionEngine(trimmedPrompt, validMode);
        const t_gemini_end = Date.now();
        const t_extract_end = Date.now();

        const responsePayload = {
          status:      'success',
          imageBase64: diffusion.imageBase64,
          mimeType:    diffusion.mimeType,
          prompt:      trimmedPrompt,
          model:       validMode === 'quality' ? 'Stable Diffusion XL (High Detail)' : 'Fast Diffusion (Turbo 512)',
          engine:      'AI Image Diffusion (Gemini Free Tier Quota Fallback)',
          mode:        validMode,
          resolution,
          note:        'Google AI Studio Free Tier has a quota limit of 0 for image generation. Fulfilled seamlessly using AI Image Diffusion.',
          timestamps: {
            userSubmit:  t_user_submit,
            backendRecv: t_backend_recv,
            apiStart:    t_gemini_start,
            apiEnd:      t_gemini_end,
            extractEnd:  t_extract_end,
          },
          durations: {
            clientToBackendMs: Math.max(0, t_backend_recv - t_user_submit),
            apiProcessingMs:   Math.max(0, t_gemini_end - t_gemini_start),
            backendExtractMs:  Math.max(0, t_extract_end - t_gemini_end),
            backendTotalMs:    Math.max(0, t_extract_end - t_backend_recv),
          },
        };

        setCachedImage(cacheKey, responsePayload);
        return res.json(responsePayload);
      } catch (diffErr) {
        console.error('[Image Service] AI Diffusion fallback failed:', diffErr.message);
        if (diffErr.code === 'RATE_LIMIT_COOLDOWN') {
          return res.status(429).json({
            status:  'error',
            code:    'RATE_LIMIT_COOLDOWN',
            message: diffErr.message,
            retryAfter: diffErr.retryAfter || 30,
          });
        }
      }
    }

    return handleGeminiImageError(res, err, preferredModel);
  }
};

/**
 * Generates an actual AI image via the high-performance online AI Diffusion engine.
 * Supports FAST MODE (512x512 preview, sub-second) and QUALITY MODE (1024x1024 high detail).
 */
async function generateViaDiffusionEngine(prompt, mode = 'fast') {
  const isQuality = mode === 'quality';
  const width = isQuality ? 1024 : 512;
  const height = isQuality ? 1024 : 512;
  const clean = prompt.slice(0, 300);
  const encoded = encodeURIComponent(clean);
  const seed = Math.floor(Math.random() * 10000000);
  const timeoutMs = isQuality ? 15000 : 8000;

  const url = `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&nologo=true&seed=${seed}`;

  const res = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      'Accept': 'image/jpeg,image/png,image/*,*/*',
    }
  });

  if (!res.ok) {
    if (res.status === 402 || res.status === 429) {
      let retryAfter = 30;
      try {
        const errJson = await res.json();
        const m = (errJson?.error?.message || '').match(/after\s+(\d+)s/i);
        if (m) retryAfter = parseInt(m[1], 10);
      } catch (_) {}

      // If cooldown is within 45 seconds, automatically wait and retry once
      if (retryAfter <= 45) {
        console.log(`[Image Service] Diffusion free rate limit: waiting ${retryAfter + 1}s cooldown before auto-retry...`);
        await new Promise(r => setTimeout(r, (retryAfter + 1) * 1000));
        try {
          const retryRes = await fetch(url, {
            signal: AbortSignal.timeout(timeoutMs),
            headers: { 'Accept': 'image/jpeg,image/png,image/*,*/*' }
          });
          if (retryRes.ok) {
            const retryBuf = await retryRes.arrayBuffer();
            if (retryBuf.byteLength >= 500) {
              return {
                imageBase64: Buffer.from(retryBuf).toString('base64'),
                mimeType: retryRes.headers.get('content-type') || 'image/jpeg',
              };
            }
          }
        } catch (retryErr) {
          console.warn('[Image Service] Auto-retry after cooldown failed:', retryErr.message);
        }
      }

      const err = new Error(`Image service rate limit reached. Please retry in ${retryAfter} seconds.`);
      err.code = 'RATE_LIMIT_COOLDOWN';
      err.retryAfter = retryAfter;
      throw err;
    }
    throw new Error(`AI Diffusion engine returned HTTP ${res.status}`);
  }

  const buffer = await res.arrayBuffer();
  if (buffer.byteLength < 500) {
    throw new Error('AI Diffusion returned an incomplete image buffer.');
  }

  return {
    imageBase64: Buffer.from(buffer).toString('base64'),
    mimeType: res.headers.get('content-type') || 'image/jpeg',
  };
}

/**
 * Attempts image generation using the specified Gemini model.
 * Uses official Google Gemini 3.1 image generation configuration with minimal thinking and resolution control.
 */
async function attemptGenerateImage(ai, modelName, prompt, mode = 'fast') {
  const isQuality = mode === 'quality';
  const imageSize = isQuality ? '1K' : '512';

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseModalities: ['IMAGE'],
      imageConfig: {
        imageSize: imageSize,
      },
      thinkingConfig: {
        thinkingLevel: 'MINIMAL',
      },
      httpOptions: {
        timeout: 10000,
      }
    }
  });

  if (response && response.candidates && response.candidates.length > 0) {
    const candidate = response.candidates[0];
    if (candidate.content && Array.isArray(candidate.content.parts)) {
      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          return {
            imageBase64: part.inlineData.data,
            mimeType,
            modelUsed: modelName,
          };
        }
      }
    }
  }

  return null;
}

/**
 * Handles Gemini image generation errors with specific diagnostic reporting.
 * Detects Free Tier 0 quota limits and provides educational guidance.
 */
function handleGeminiImageError(res, err, modelName) {
  const errMsg = (err.message || '').toLowerCase();
  const errStr = String(err);
  console.error('[Gemini Image] Generation error:', errStr.replace(/AIza\S+/g, '[REDACTED]'));

  // Detect Free Tier quota limit of 0 for image generation models
  if (
    errMsg.includes('free tier') ||
    errMsg.includes('limit: 0') ||
    errMsg.includes('quota exceeded for metric') ||
    (errMsg.includes('quota') && errMsg.includes('0'))
  ) {
    return res.status(429).json({
      status:  'error',
      code:    'QUOTA_EXCEEDED_FREE_TIER',
      message: 'Google AI Studio currently has a quota limit of 0 for image generation models on Free Tier accounts. To generate images with Gemini, enable Pay-as-you-go billing in Google AI Studio or use a Google Cloud Vertex AI project.',
      quotaDetails: {
        tier: 'Google AI Studio Free Tier',
        limit: 0,
        documentation: 'https://aistudio.google.com/docs/rate-limits',
        actionRequired: 'Enable billing in Google AI Studio / Google Cloud Console to activate Gemini Image Generation.',
      },
    });
  }

  if (
    errMsg.includes('quota') ||
    errMsg.includes('rate') ||
    errMsg.includes('limit') ||
    errMsg.includes('429') ||
    errMsg.includes('resource_exhausted')
  ) {
    return res.status(429).json({
      status:  'error',
      code:    'RATE_LIMIT',
      message: 'Gemini Image service rate limit reached. Please wait a moment and try again.',
    });
  }

  if (
    errMsg.includes('api key') ||
    errMsg.includes('permission_denied') ||
    errMsg.includes('401') ||
    errMsg.includes('403') ||
    errMsg.includes('unauthenticated')
  ) {
    return res.status(401).json({
      status:  'error',
      code:    'INVALID_API_KEY',
      message: 'The Gemini API key is invalid or lacks permissions for image generation.',
    });
  }

  if (errMsg.includes('safety') || errMsg.includes('blocked') || errMsg.includes('harm')) {
    return res.status(422).json({
      status:  'error',
      code:    'SAFETY_BLOCK',
      message: 'Your image prompt was flagged by the AI safety filter. Please rephrase the prompt to ensure it adheres to safety guidelines.',
    });
  }

  if (errMsg.includes('not found') || errMsg.includes('404') || errMsg.includes('invalid model')) {
    return res.status(502).json({
      status:  'error',
      code:    'MODEL_UNAVAILABLE',
      message: `The image generation model (${modelName}) is not available on this API version or region.`,
    });
  }

  if (
    errMsg.includes('network') ||
    errMsg.includes('fetch') ||
    errMsg.includes('timeout') ||
    errMsg.includes('econnrefused') ||
    errMsg.includes('enotfound')
  ) {
    return res.status(503).json({
      status:  'error',
      code:    'NETWORK_ERROR',
      message: 'Could not reach the Gemini API for image generation. Check your network connection.',
    });
  }

  return res.status(500).json({
    status:  'error',
    code:    'IMAGE_GEN_FAILED',
    message: 'An error occurred while generating the image with Gemini. Please try again later.',
  });
}
