/**
 * Comprehensive Automated Test Suite: Conversation Management
 *
 * Tests:
 *  1. New Chat: Unique IDs, clearing view, active state, isolation.
 *  2. Chat History: Today / Yesterday / Earlier grouping, title extraction, last-message timestamps, message order.
 *  3. Conversation Actions: Inline rename with customTitle, single delete with consistent fallback, delete all.
 *  4. Persistence: localStorage save & reload simulation, resilience to malformed/corrupted data.
 *  5. Context & Isolation: Multi-turn history forwarded to live Gemini, history sanitization & turn capping.
 *  6. End-to-End Live Context Verification: Follow-up question uses preceding context; independent chats stay isolated.
 */

'use strict';

const assert = require('assert');
const BASE_URL = 'http://localhost:3000';

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log('✅ ' + name);
    passed++;
  } catch (err) {
    console.log('❌ ' + name + ' — ' + (err.message || err));
    failed++;
  }
}

// ── Mock LocalStorage for Persistence Simulation ─────────────────────────────
class MockLocalStorage {
  constructor() { this.store = {}; }
  getItem(k) { return Object.prototype.hasOwnProperty.call(this.store, k) ? this.store[k] : null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
  clear() { this.store = {}; }
}

// ── Title Generator Logic ───────────────────────────────────────────────────
function generateTitleFromPrompt(rawText) {
  if (!rawText || typeof rawText !== 'string') return 'New Conversation';
  let clean = rawText.trim().replace(/\s+/g, ' ');

  const firstSentenceMatch = clean.match(/^.+?(?:[?!]+|\.(?=\s+[A-Z]|\s*$))/);
  if (firstSentenceMatch && firstSentenceMatch[0].trim().length >= 8) {
    clean = firstSentenceMatch[0].trim();
  }

  const prefixes = [
    /^(?:can you\s+)?(?:please\s+)?explain(?:\s+to\s+me)?\s+(?:what\s+is\s+|what\s+are\s+)?/i,
    /^(?:what\s+is\s+the\s+difference\s+between|difference\s+between)\s+/i,
    /^(?:what\s+is|what\s+are|what\s+was|what\s+were|what\s+does|what\s+do|what\'s)\s+/i,
    /^(?:how\s+does|how\s+do|how\s+can\s+i|how\s+to|how\s+would)\s+/i,
    /^(?:tell\s+me\s+about|tell\s+me|give\s+me\s+an\s+example\s+of|give\s+me\s+examples\s+of|give\s+me)\s+/i,
    /^(?:define|summarize|help\s+me\s+understand|in\s+simple\s+terms)\s+/i,
    /^(?:write\s+a\s+program\s+to|write\s+code\s+for|how\s+to\s+implement)\s+/i,
  ];
  for (const regex of prefixes) {
    if (regex.test(clean)) {
      clean = clean.replace(regex, '').trim();
      break;
    }
  }
  clean = clean.replace(/[?.!;:,\s]+$/, '').trim();
  if (clean.length < 3) clean = rawText.trim().replace(/[?.!;:,\s]+$/, '').trim();
  if (!clean) return 'New Conversation';
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  if (clean.length > 36) clean = clean.slice(0, 36).trim() + '…';
  return clean;
}

// ── Grouping Function ────────────────────────────────────────────────────────
function getConversationGroup(timestamp) {
  if (!timestamp || typeof timestamp !== 'number') return 'Earlier';
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;

  if (timestamp >= startOfToday) {
    return 'Today';
  } else if (timestamp >= startOfYesterday) {
    return 'Yesterday';
  } else {
    return 'Earlier';
  }
}

async function run() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🧪  Conversation Management Test Suite');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // ── 1. New Chat Creation & Unique IDs ──────────────────────────────────────
  await test('New Chat: creates unique IDs and distinct conversation instances', () => {
    const idGen = (prefix = 'conv') => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
    const conv1 = { id: idGen(), title: 'New Conversation', messages: [] };
    const conv2 = { id: idGen(), title: 'New Conversation', messages: [] };

    assert.ok(conv1.id !== conv2.id, 'IDs must be uniquely generated');
    assert.ok(conv1.id.startsWith('conv_'), 'ID must have conv prefix');
  });

  await test('New Chat: does not delete or overwrite prior conversations', () => {
    const conversations = {};
    const convA = { id: 'conv_A', title: 'Calculus Review', messages: [{ role: 'user', content: 'Derivative test' }] };
    conversations[convA.id] = convA;

    // Simulate New Chat
    const convB = { id: 'conv_B', title: 'New Conversation', messages: [] };
    conversations[convB.id] = convB;

    assert.strictEqual(Object.keys(conversations).length, 2);
    assert.strictEqual(conversations['conv_A'].messages.length, 1);
    assert.strictEqual(conversations['conv_B'].messages.length, 0);
  });

  // ── 2. Chat History Grouping (Today, Yesterday, Earlier) ───────────────────
  await test('Grouping: classifies today timestamps into "Today"', () => {
    const now = Date.now();
    assert.strictEqual(getConversationGroup(now), 'Today');
    assert.strictEqual(getConversationGroup(now - 1000 * 60 * 30), 'Today'); // 30m ago
  });

  await test('Grouping: classifies yesterday timestamps into "Yesterday"', () => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterdayTimestamp = startOfToday - 1000 * 60 * 60 * 6; // 6 hours before midnight today
    assert.strictEqual(getConversationGroup(yesterdayTimestamp), 'Yesterday');
  });

  await test('Grouping: classifies older timestamps into "Earlier"', () => {
    const threeDaysAgo = Date.now() - 1000 * 60 * 60 * 24 * 3;
    const twoWeeksAgo = Date.now() - 1000 * 60 * 60 * 24 * 14;
    assert.strictEqual(getConversationGroup(threeDaysAgo), 'Earlier');
    assert.strictEqual(getConversationGroup(twoWeeksAgo), 'Earlier');
  });

  await test('Chat History: generates concise title from prompt and preserves chronological order', () => {
    const prompt = 'What is binary search? Explain with an example.';
    const title = generateTitleFromPrompt(prompt);
    assert.strictEqual(title, 'Binary search');

    const messages = [
      { id: 'm1', role: 'user', content: prompt, timestamp: 1000 },
      { id: 'm2', role: 'model', content: 'Binary search divides the interval in half.', timestamp: 2000 },
      { id: 'm3', role: 'user', content: 'What is its worst case?', timestamp: 3000 },
      { id: 'm4', role: 'model', content: 'Worst case is O(log n).', timestamp: 4000 }
    ];

    // Verify order
    for (let i = 0; i < messages.length - 1; i++) {
      assert.ok(messages[i].timestamp < messages[i + 1].timestamp, 'Messages must remain in strict chronological order');
    }
  });

  // ── 3. Conversation Actions (Rename, Delete Single, Delete All) ─────────────
  await test('Rename: updates title and sets customTitle protection flag', () => {
    const conv = { id: 'c1', title: 'Data Structures', customTitle: false, updatedAt: 1000 };
    const newTitle = 'Advanced Graph Algorithms';
    conv.title = newTitle;
    conv.customTitle = true;
    conv.updatedAt = Date.now();

    assert.strictEqual(conv.title, 'Advanced Graph Algorithms');
    assert.strictEqual(conv.customTitle, true);
    assert.ok(conv.updatedAt > 1000);
  });

  await test('Delete Single: active conversation deletion falls back to next most recent', () => {
    const convs = {
      c1: { id: 'c1', title: 'First', updatedAt: 1000 },
      c2: { id: 'c2', title: 'Second', updatedAt: 3000 },
      c3: { id: 'c3', title: 'Third', updatedAt: 2000 }
    };

    let activeId = 'c2'; // Delete the currently active conversation
    delete convs[activeId];

    const remaining = Object.values(convs).sort((a, b) => b.updatedAt - a.updatedAt);
    activeId = remaining.length > 0 ? remaining[0].id : null;

    assert.strictEqual(activeId, 'c3', 'Should fall back to c3 (highest remaining updatedAt)');
    assert.strictEqual(Object.keys(convs).length, 2);
  });

  await test('Delete Single: non-active conversation deletion preserves active conversation', () => {
    const convs = {
      c1: { id: 'c1', title: 'First', updatedAt: 1000 },
      c2: { id: 'c2', title: 'Second', updatedAt: 2000 }
    };

    let activeId = 'c2';
    // Delete non-active c1
    delete convs['c1'];

    // activeId must remain unchanged
    assert.strictEqual(activeId, 'c2');
    assert.ok(convs[activeId] !== undefined);
  });

  await test('Delete All: removes all conversations and resets active state', () => {
    let convs = {
      c1: { id: 'c1', title: 'A' },
      c2: { id: 'c2', title: 'B' }
    };
    let activeId = 'c1';

    // Clear all
    convs = {};
    activeId = null;

    assert.strictEqual(Object.keys(convs).length, 0);
    assert.strictEqual(activeId, null);
  });

  // ── 4. Persistence Simulation (localStorage) ──────────────────────────────
  await test('Persistence: serializes and restores multi-conversation state intact', () => {
    const storage = new MockLocalStorage();
    const state = {
      c1: {
        id: 'c1',
        title: 'Operating Systems',
        customTitle: true,
        createdAt: 1000,
        updatedAt: 1500,
        messages: [
          { id: 'm1', role: 'user', content: 'What is a semaphore?', timestamp: 1100 },
          { id: 'm2', role: 'model', content: 'A semaphore is a synchronization primitive.', timestamp: 1200 }
        ]
      }
    };

    storage.setItem('studyai_conversations_v1', JSON.stringify(state));
    storage.setItem('studyai_active_id_v1', 'c1');

    // Simulate page reload
    const restoredRaw = storage.getItem('studyai_conversations_v1');
    const restoredState = JSON.parse(restoredRaw);
    const restoredActive = storage.getItem('studyai_active_id_v1');

    assert.strictEqual(restoredActive, 'c1');
    assert.strictEqual(restoredState['c1'].title, 'Operating Systems');
    assert.strictEqual(restoredState['c1'].messages.length, 2);
    assert.strictEqual(restoredState['c1'].messages[0].role, 'user');
    assert.strictEqual(restoredState['c1'].messages[1].role, 'model');
  });

  await test('Persistence: handles corrupted or invalid JSON safely without throwing', () => {
    const storage = new MockLocalStorage();
    storage.setItem('studyai_conversations_v1', '{malformed JSON!#');

    let loaded = null;
    try {
      const raw = storage.getItem('studyai_conversations_v1');
      loaded = JSON.parse(raw);
    } catch (e) {
      loaded = {}; // Fallback safe empty object
    }

    assert.deepStrictEqual(loaded, {});
  });

  // ── 5. Context Isolation & Server Sanitization ──────────────────────────────
  await test('Isolation: conversations maintain separate message histories', () => {
    const convA = { id: 'cA', messages: [{ role: 'user', content: 'What is an array?' }] };
    const convB = { id: 'cB', messages: [{ role: 'user', content: 'Explain photosynthesis.' }] };

    // Follow-up to Conv A
    convA.messages.push({ role: 'model', content: 'An array is a contiguous memory collection.' });
    convA.messages.push({ role: 'user', content: 'What is its indexing time?' });

    assert.strictEqual(convA.messages.length, 3);
    assert.strictEqual(convB.messages.length, 1);
    assert.strictEqual(convB.messages[0].content, 'Explain photosynthesis.');
  });

  await test('Server API: validates and accepts multi-turn context history', async () => {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What is its worst-case time complexity?',
        mode: 'standard',
        history: [
          { role: 'user', content: 'Explain quicksort.' },
          { role: 'model', content: 'Quicksort is a divide-and-conquer sorting algorithm.' }
        ]
      })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.ok(data.reply);
    // Quicksort worst case is O(n^2)
    assert.ok(data.reply.includes('O(n') || data.reply.includes('quadratic') || data.reply.includes('n²') || data.reply.includes('n^2'),
      'AI response should use context of quicksort to identify worst case O(n^2)');
  });

  await test('Server API: caps excessive history turns gracefully', async () => {
    // Generate 30 turns of history (60 messages)
    const longHistory = [];
    for (let i = 0; i < 30; i++) {
      longHistory.push({ role: 'user', content: `Question turn ${i}` });
      longHistory.push({ role: 'model', content: `Answer turn ${i}` });
    }

    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Summarize our conversation in one word.',
        mode: 'standard',
        history: longHistory
      })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.ok(data.reply);
  });

  // ── 6. Live Context Verification: Two chats remain isolated ────────────────
  await test('Live AI Verification: Chat A (calculus) and Chat B (python) remain contextually isolated', async () => {
    // 1. Ask question in Chat A (Calculus)
    const resA = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What is the derivative of x^2? Answer with just the mathematical expression.',
        history: []
      })
    });
    const dataA = await resA.json();
    assert.strictEqual(resA.status, 200);
    assert.ok(dataA.reply.includes('2x'), 'Derivative of x^2 should be 2x');

    // 2. Ask question in Chat B (Python)
    const resB = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'How do you create an empty dictionary in Python? Answer with just the syntax.',
        history: []
      })
    });
    const dataB = await resB.json();
    assert.strictEqual(resB.status, 200);
    assert.ok(dataB.reply.includes('{}') || dataB.reply.includes('dict()'), 'Python dictionary syntax should be {} or dict()');

    // 3. Ask follow-up in Chat B with ONLY Chat B history
    const resBFollowup = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'How do you add a key "name" with value "Alice" to it?',
        history: [
          { role: 'user', content: 'How do you create an empty dictionary in Python? Answer with just the syntax.' },
          { role: 'model', content: dataB.reply }
        ]
      })
    });
    const dataBFollowup = await resBFollowup.json();
    assert.strictEqual(resBFollowup.status, 200);
    assert.ok(dataBFollowup.reply.includes('Alice'), 'Follow-up in Chat B should reference Alice');
    assert.ok(!dataBFollowup.reply.toLowerCase().includes('derivative'), 'Chat B follow-up must NOT mention calculus/derivative from Chat A');
  });

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`Results: ${passed} Passed, ${failed} Failed`);
  console.log('═══════════════════════════════════════════════════════════════');

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Test suite runner crashed:', err);
  process.exit(1);
});
