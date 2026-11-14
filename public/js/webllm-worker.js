/**
 * StudyMate AI — WebLLM Web Worker
 * Offloads WebGPU LLM model loading and text generation from the UI thread.
 */

import { WebWorkerMLCEngineHandler } from './web-llm.js';

const handler = new WebWorkerMLCEngineHandler();

self.onmessage = (msg) => {
  handler.onmessage(msg);
};

