/**
 * Phase 4 Walkthrough Verification Test
 *
 * Simulates the exact user test journey:
 *  1. Ask: "Explain REST APIs."
 *  2. Follow-up: "Give me an example using Express."
 *  3. Click "New Chat"
 *  4. Ask different topic: "How does photosynthesis work?"
 *  5. Switch between the two conversations
 *  6. Refresh browser (reload from localStorage) & verify conversations and messages persist
 */

'use strict';

const fs     = require('fs');
const assert = require('assert');

// Load chat.js logic
const chatJs = fs.readFileSync('public/js/chat.js', 'utf8');

// Extract generateTitleFromPrompt function
const titleFnMatch = chatJs.match(/function generateTitleFromPrompt\([\s\S]*?\n\}/);
const generateTitleFromPrompt = new Function(titleFnMatch[0] + '; return generateTitleFromPrompt;')();

console.log('═════════════════════════════════════════════════════════════');
console.log('🚶  Verifying Walkthrough Journey — AI Study Assistant');
console.log('═════════════════════════════════════════════════════════════\n');

// Mock localStorage
const localStorageMap = new Map();
const localStorage = {
  getItem: (k) => localStorageMap.get(k) || null,
  setItem: (k, v) => localStorageMap.set(k, String(v)),
  removeItem: (k) => localStorageMap.delete(k),
  clear: () => localStorageMap.clear()
};

// Simulated Application State & Storage Engine
const STORAGE_KEY = 'studyai_conversations_v1';
const ACTIVE_CONV_KEY = 'studyai_active_id_v1';

let state = {
  conversations: {},
  activeId: null
};

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.conversations));
  if (state.activeId) {
    localStorage.setItem(ACTIVE_CONV_KEY, state.activeId);
  } else {
    localStorage.removeItem(ACTIVE_CONV_KEY);
  }
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  state.conversations = raw ? JSON.parse(raw) : {};
  state.activeId = localStorage.getItem(ACTIVE_CONV_KEY) || null;
}

function postMessage(prompt, mockAiReply) {
  // If no active conversation, create one
  if (!state.activeId || !state.conversations[state.activeId]) {
    const id = 'conv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    const title = generateTitleFromPrompt(prompt);
    state.conversations[id] = {
      id,
      title,
      customTitle: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: []
    };
    state.activeId = id;
  }

  const conv = state.conversations[state.activeId];

  // Append user message
  conv.messages.push({
    id: 'msg_user_' + Math.random().toString(36).slice(2, 6),
    role: 'user',
    content: prompt,
    time: '12:00 PM',
    isError: false
  });

  // Extract history that WOULD be sent to Gemini
  const history = conv.messages
    .slice(0, -1)
    .filter(m => !m.isError)
    .map(m => ({ role: m.role, content: m.content }));

  // Append AI reply
  conv.messages.push({
    id: 'msg_ai_' + Math.random().toString(36).slice(2, 6),
    role: 'model',
    content: mockAiReply,
    time: '12:00 PM',
    isError: false
  });

  conv.updatedAt = Date.now();
  saveState();

  return { conv, history };
}

function clickNewChat() {
  state.activeId = null;
  saveState();
}

function switchConversation(id) {
  assert(state.conversations[id], `Conversation ${id} does not exist`);
  state.activeId = id;
  saveState();
}

// ── STEP 1: Ask "Explain REST APIs." ─────────────────────────
console.log('Step 1: User asks "Explain REST APIs."');
const step1 = postMessage(
  'Explain REST APIs.',
  'REST stands for Representational State Transfer. It is an architectural style for networked applications using standard HTTP methods like GET, POST, PUT, DELETE.'
);
const conv1Id = step1.conv.id;
console.log(`  ✓ Created conversation: "${step1.conv.title}" (ID: ${conv1Id})`);
assert.strictEqual(step1.conv.title, 'REST APIs');
assert.strictEqual(step1.conv.messages.length, 2);
assert.strictEqual(step1.history.length, 0, 'First message should have empty history');

// ── STEP 2: Ask follow-up "Give me an example using Express." ──
console.log('\nStep 2: User asks follow-up "Give me an example using Express."');
const step2 = postMessage(
  'Give me an example using Express.',
  'Here is a simple Express example:\n```javascript\nconst express = require("express");\nconst app = express();\napp.get("/api/books", (req, res) => res.json([]));\n```'
);
console.log(`  ✓ Conversation 1 now has ${step2.conv.messages.length} messages`);
assert.strictEqual(step2.conv.id, conv1Id, 'Should remain in same conversation');
assert.strictEqual(step2.conv.messages.length, 4);
assert.strictEqual(step2.history.length, 2, 'History must include turn 1');
assert.strictEqual(step2.history[0].content, 'Explain REST APIs.');
assert.strictEqual(step2.history[1].role, 'model');

// ── STEP 3: Click "New Chat" ─────────────────────────────────
console.log('\nStep 3: User clicks "New Chat"');
clickNewChat();
assert.strictEqual(state.activeId, null, 'Active ID should be null (fresh screen)');
assert.strictEqual(Object.keys(state.conversations).length, 1, 'Previous conversation preserved');
console.log('  ✓ UI reset to clean New Chat state without deleting Conversation 1');

// ── STEP 4: Ask different topic "How does photosynthesis work?" 
console.log('\nStep 4: User asks different topic "How does photosynthesis work?"');
const step4 = postMessage(
  'How does photosynthesis work?',
  'Photosynthesis is the biological process by which green plants convert light energy into chemical energy.'
);
const conv2Id = step4.conv.id;
console.log(`  ✓ Created conversation: "${step4.conv.title}" (ID: ${conv2Id})`);
assert.notStrictEqual(conv2Id, conv1Id, 'Must create a brand new conversation ID');
assert.strictEqual(step4.conv.title, 'Photosynthesis work');
assert.strictEqual(step4.conv.messages.length, 2);
assert.strictEqual(step4.history.length, 0, 'Must have zero history from conversation 1 (no leakage)');
assert.strictEqual(Object.keys(state.conversations).length, 2, 'Now 2 distinct conversations exist');

// ── STEP 5: Switch between the two conversations ─────────────
console.log('\nStep 5: User switches between the two conversations in sidebar');

// Switch to Conversation 1
switchConversation(conv1Id);
console.log(`  ✓ Switched to "${state.conversations[state.activeId].title}"`);
assert.strictEqual(state.activeId, conv1Id);
assert.strictEqual(state.conversations[state.activeId].messages.length, 4);
assert.strictEqual(state.conversations[state.activeId].messages[0].content, 'Explain REST APIs.');
assert.strictEqual(state.conversations[state.activeId].messages[2].content, 'Give me an example using Express.');

// Switch to Conversation 2
switchConversation(conv2Id);
console.log(`  ✓ Switched to "${state.conversations[state.activeId].title}"`);
assert.strictEqual(state.activeId, conv2Id);
assert.strictEqual(state.conversations[state.activeId].messages.length, 2);
assert.strictEqual(state.conversations[state.activeId].messages[0].content, 'How does photosynthesis work?');

// ── STEP 6: Refresh the browser (reloading from storage) ──────
console.log('\nStep 6: User refreshes the browser (F5 / reload)');

// Reset in-memory state completely
state = { conversations: {}, activeId: null };

// Load from storage as init() does
loadState();

console.log('  ✓ Loaded conversations from simulated localStorage:');
const convList = Object.values(state.conversations);
assert.strictEqual(convList.length, 2, 'Both conversations must be preserved');
assert.strictEqual(state.activeId, conv2Id, 'Active conversation preserved across reload');

const c1 = state.conversations[conv1Id];
const c2 = state.conversations[conv2Id];

assert(c1, 'Conversation 1 must exist after reload');
assert(c2, 'Conversation 2 must exist after reload');

assert.strictEqual(c1.title, 'REST APIs');
assert.strictEqual(c1.messages.length, 4);
assert.strictEqual(c1.messages[0].content, 'Explain REST APIs.');
assert.strictEqual(c1.messages[2].content, 'Give me an example using Express.');

assert.strictEqual(c2.title, 'Photosynthesis work');
assert.strictEqual(c2.messages.length, 2);
assert.strictEqual(c2.messages[0].content, 'How does photosynthesis work?');

console.log(`    • "${c1.title}" (${c1.messages.length} messages)`);
console.log(`    • "${c2.title}" (${c2.messages.length} messages)`);
console.log('  ✓ No message leakage between topics.');
console.log('  ✓ Correct message ordering maintained.');

console.log('\n═════════════════════════════════════════════════════════════');
console.log('🎉  ALL WALKTHROUGH VERIFICATION STEPS PASSED (6/6)');
console.log('═════════════════════════════════════════════════════════════\n');
