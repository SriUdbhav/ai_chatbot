/**
 * StudyMate AI — WebLLM Web Worker
 * Offloads WebGPU LLM model loading and text generation from the UI thread.
 */

import { WebWorkerMLCEngineHandler } from './web-llm.js';

let handler;
try {
  handler = new WebWorkerMLCEngineHandler();
} catch (err) {
  console.error('[WebLLM Worker] Failed to instantiate WebWorkerMLCEngineHandler:', err);
}

self.onmessage = (msg) => {
  if (handler) {
    try {
      handler.onmessage(msg);
    } catch (err) {
      console.error('[WebLLM Worker] Error processing message:', err);
    }
  } else {
    console.error('[WebLLM Worker] Handler not initialized when message arrived:', msg.data);
  }
};

self.onerror = (err) => {
  console.error('[WebLLM Worker Uncaught Error]', err);
};
