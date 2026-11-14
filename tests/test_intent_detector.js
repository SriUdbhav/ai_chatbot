'use strict';
const assert = require('assert');

const IMAGE_NOUNS = 'image|picture|photo|photograph|illustration|drawing|artwork|wallpaper|poster|graphic|sketch|portrait|visual|cartoon|render|painting|banner';

function isImageGenerationIntent(text) {
  if (!text || typeof text !== 'string') return false;
  const t = text.trim();

  // 1. Explicit slash command
  if (/^\/image\s+/i.test(t)) return true;

  // 2. Negative guards: user asking for code, programming, explanation, theory, or reading
  const hasCodeOrExplain = /\b(code|python|script|programming\s+language|html|css|svg|function|algorithm|opencv|canvas|pil|pillow|matplotlib)\b/i.test(t) ||
                           /\b(explain|how\s+to|how\s+does|how\s+do|what\s+is|tell\s+me\s+about|describe\s+how|difference\s+between|tutorial|history\s+of|why\s+do)\b/i.test(t) ||
                           /\b(read|analyze|describe|summarize|extract|transcribe|what\s+is\s+in)\s+(this|the|attached)\s+(image|picture|photo)\b/i.test(t);
  if (hasCodeOrExplain) return false;

  // 3. Positive intent matching
  const p1 = new RegExp(`\\b(generate|create|draw|paint|make|produce|render|illustrate)\\s+(me\\s+)?(a|an|the|some)?\\s*([a-z0-9_-]+\\s+){0,3}(${IMAGE_NOUNS})\\b`, 'i');
  if (p1.test(t)) return true;

  if (/^\s*(draw|paint|sketch|illustrate)\s+(a|an|the|me)\s+/i.test(t)) return true;

  const p2 = new RegExp(`\\b(can\\s+you|please|could\\s+you)\\s+(generate|create|draw|paint|make|render|illustrate)\\s+(me\\s+)?(an?|the)?\\s*([a-z0-9_-]+\\s+){0,2}(${IMAGE_NOUNS})\\b`, 'i');
  if (p2.test(t)) return true;

  return false;
}

const tests = [
  ['Generate an image of a futuristic city at night.', true],
  ['Create a cartoon robot studying computer science.', true],
  ['Generate a beautiful mountain wallpaper.', true],
  ['Explain how image generation works.', false],
  ['Write Python code to generate a simple image.', false],
  ['Draw a cartoon robot.', true],
  ['Make an illustration of a student studying.', true],
  ['Generate an image of a sunset over mountains.', true],
  ['What is the difference between Stable Diffusion and GANs?', false],
  ['How does convolutional neural network process an image?', false],
  ['Show me CSS code for an image card.', false],
  ['Can you generate an image of a medieval library?', true],
  ['Create a retro synthwave wallpaper for my desktop.', true],
  ['Write a function to crop an image in JavaScript.', false]
];

let allPassed = true;
tests.forEach(([input, expected]) => {
  const result = isImageGenerationIntent(input);
  const ok = result === expected;
  if (!ok) allPassed = false;
  console.log((ok ? '✔' : '✖') + ' [' + result + ' === ' + expected + '] ' + input);
});
console.log('Result:', allPassed ? 'ALL PASSED!' : 'SOME FAILED');
assert.strictEqual(allPassed, true);
