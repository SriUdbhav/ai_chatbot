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
} = require('../config/gemini');

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
  const { message, history, mode = 'standard' } = req.body || {};

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

  // ── 4. Call Gemini ────────────────────────────────────────────────────────
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
    const reply = await callGemini(ai, modelName, sanitisedHistory, trimmedMessage, safeMode);
    return res.json({ status: 'success', reply, mode: safeMode });

  } catch (err) {
    return handleGeminiError(res, err, ai, sanitisedHistory, trimmedMessage, safeMode);
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
 * @returns {Promise<string>}
 */
async function callGemini(ai, modelName, history, userMessage, mode = 'standard') {
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
    },
    history: sdkHistory,
  });

  const response = await chat.sendMessage({ message: userMessage });

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
async function handleGeminiError(res, err, ai, history, userMessage, mode = 'standard') {
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
      const reply = await callGemini(ai, fallback, history, userMessage, mode);
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
