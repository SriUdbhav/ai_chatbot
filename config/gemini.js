/**
 * Gemini API Configuration & Client Module — Phase 3
 *
 * Uses the official @google/genai v2.x SDK.
 * All API access is strictly server-side; the key is never surfaced to
 * any client response, log statement, or static file.
 */

'use strict';

const { GoogleGenAI } = require('@google/genai');

// ── Model selection ────────────────────────────────────────────────────────────
// Preferred model: gemini-3.5-flash-lite (fast, highly available, low latency).
// Fallback: gemini-3.8-flash.
const PREFERRED_MODEL  = 'gemini-3.5-flash-lite';
const FALLBACK_MODEL   = 'gemini-3.8-flash';

/**
 * Returns the active model name from env, or the preferred default.
 * Allows easy override via GEMINI_MODEL in .env without code changes.
 */
function getModelName() {
  return process.env.GEMINI_MODEL || PREFERRED_MODEL;
}

/**
 * Returns the fallback model name.
 */
function getFallbackModelName() {
  return FALLBACK_MODEL;
}

/**
 * Checks that GEMINI_API_KEY is present and is not the placeholder value.
 * @returns {boolean}
 */
function isApiKeyConfigured() {
  const key = process.env.GEMINI_API_KEY;
  return Boolean(
    key &&
    key.trim().length > 0 &&
    key.trim() !== 'your_gemini_api_key_here'
  );
}

/**
 * Creates and returns a GoogleGenAI client instance.
 * Returns null if the key is missing or is still a placeholder.
 * Does NOT log the key — only a redacted status is reported.
 * @returns {GoogleGenAI|null}
 */
function getGenAIClient() {
  if (!isApiKeyConfigured()) {
    console.warn('[Gemini] GEMINI_API_KEY is missing or contains the placeholder value.');
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

module.exports = {
  isApiKeyConfigured,
  getGenAIClient,
  getModelName,
  getFallbackModelName,
};
