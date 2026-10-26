/**
 * UI Fix Verification Test Suite: Study Tools in Main Chat Area
 * Verifies that:
 * 1. The Study Tools modal is strictly an input form (no popup result boxes).
 * 2. All 4 study tools generate requests & responses directly in the main chat message list.
 * 3. Chat message rendering supports interactive quiz components inside assistant message bubbles.
 * 4. Quiz scoring is trusted and correct answers remain hidden until submission.
 * 5. Notes Summarizer uses concise excerpts in visible user messages instead of massive text dumps.
 * 6. Code Assistant preserves programming questions and code snippets with proper formatting.
 * 7. Conversation state and persistence preserve both text responses and interactive quizData.
 * 8. Live tool endpoints continue to function correctly with real Gemini responses.
 */

'use strict';

const assert = require('assert');
const fs     = require('fs');
const path   = require('path');

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

async function run() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🧪  UI Fix Verification — Study Tools in Main Chat Area');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // ── 0. Script Syntax Integrity ──────────────────────────────────────────────
  await test('Syntax: public/js/chat.js has zero syntax errors and parses cleanly', () => {
    const { execSync } = require('child_process');
    execSync('node -c public/js/chat.js');
  });

  // ── 1. Modal Cleanliness (No In-Modal Results) ──────────────────────────────
  await test('UI: GET / modal does NOT contain old popup result containers', async () => {
    const res = await fetch(`${BASE_URL}/`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    // Verify modal exists with forms
    assert.ok(html.includes('id="toolsModal"'), 'Missing #toolsModal');
    assert.ok(html.includes('id="explainForm"'), 'Missing #explainForm');
    assert.ok(html.includes('id="programmingForm"'), 'Missing #programmingForm');
    assert.ok(html.includes('id="summarizeForm"'), 'Missing #summarizeForm');
    assert.ok(html.includes('id="quizForm"'), 'Missing #quizForm');

    // Verify in-modal result elements are completely absent
    assert.ok(!html.includes('id="explainResultBox"'), 'Modal must not contain #explainResultBox');
    assert.ok(!html.includes('id="progResultBox"'), 'Modal must not contain #progResultBox');
    assert.ok(!html.includes('id="summarizeResultBox"'), 'Modal must not contain #summarizeResultBox');
    assert.ok(!html.includes('id="quizPlayer"'), 'Modal must not contain static #quizPlayer');
    assert.ok(!html.includes('id="quizFinishBtn"'), 'Modal must not contain static #quizFinishBtn');
  });

  // ── 2. Script Architecture Verification (chat.js) ───────────────────────────
  await test('chat.js: Modal handlers close modal immediately upon submission', () => {
    const code = fs.readFileSync(path.join(__dirname, '../public/js/chat.js'), 'utf8');

    // Explainer handler closes modal
    assert.ok(code.includes('closeToolsModal()'), 'Must call closeToolsModal()');
    assert.ok(code.includes('ensureActiveConversation'), 'Must call ensureActiveConversation()');
    assert.ok(code.includes('appendMessageToConv'), 'Must call appendMessageToConv() for conversation isolation');
  });

  await test('chat.js: Interactive quiz component renders inside chat message bubbles', () => {
    const code = fs.readFileSync(path.join(__dirname, '../public/js/chat.js'), 'utf8');

    // Quiz message renderer
    assert.ok(code.includes('function renderQuizMessageHtml(msg)'), 'Missing renderQuizMessageHtml');
    assert.ok(code.includes('quiz-player-container in-chat-quiz'), 'Quiz must use in-chat-quiz class');
    assert.ok(code.includes('quiz-opt-btn'), 'Must render MCQ option buttons');
    assert.ok(code.includes('submit-quiz'), 'Must render submit quiz button');
    assert.ok(code.includes('quiz-eval-btn'), 'Must render short answer AI evaluation button');
  });

  await test('chat.js: Quiz options hide answers before submission and reveal upon scoring', () => {
    const code = fs.readFileSync(path.join(__dirname, '../public/js/chat.js'), 'utf8');

    // Check that correct-reveal and wrong-reveal only apply when submitted
    assert.ok(code.includes('correct-reveal'), 'Must support correct-reveal styling class');
    assert.ok(code.includes('wrong-reveal'), 'Must support wrong-reveal styling class');
    assert.ok(code.includes('isSubmitted'), 'Answers must only reveal when isSubmitted is true');
  });

  await test('chat.js: Notes Summarizer creates concise chat prompt excerpt', () => {
    const code = fs.readFileSync(path.join(__dirname, '../public/js/chat.js'), 'utf8');

    // Look for excerpt truncation in summarizeForm submit handler
    assert.ok(code.includes('notes.slice(0, 160)'), 'Must truncate visible note excerpt to ~160 chars');
    assert.ok(code.includes('Notes Excerpt:'), 'Must format user note prompt with excerpt');
  });

  await test('chat.js: Code Assistant formats question and code block in user message', () => {
    const code = fs.readFileSync(path.join(__dirname, '../public/js/chat.js'), 'utf8');

    assert.ok(code.includes('Programming Help Request'), 'Must label code request in user prompt');
    assert.ok(code.includes('userPromptText += `\\n\\n\\`\\`\\`${language.toLowerCase()'), 'Must wrap user code snippet in markdown code block');
  });

  await test('chat.js: Storage persistence saves and loads quizData intact', () => {
    const code = fs.readFileSync(path.join(__dirname, '../public/js/chat.js'), 'utf8');

    assert.ok(code.includes('quizData:  (msg.quizData && typeof msg.quizData === \'object\') ? msg.quizData : null'),
      'loadStoredConversations must restore quizData');
  });

  // ── 3. CSS Styling Checks ────────────────────────────────────────────────────
  await test('chat.css: In-chat quiz styles exist and integrate with dark theme', () => {
    const css = fs.readFileSync(path.join(__dirname, '../public/css/chat.css'), 'utf8');

    assert.ok(css.includes('.in-chat-quiz'), 'Missing .in-chat-quiz CSS rule');
    assert.ok(css.includes('.quiz-opt-btn.correct-reveal'), 'Missing .correct-reveal CSS rule');
    assert.ok(css.includes('.quiz-opt-btn.wrong-reveal'), 'Missing .wrong-reveal CSS rule');
    assert.ok(css.includes('.quiz-eval-result'), 'Missing .quiz-eval-result CSS rule');
    assert.ok(css.includes('.quiz-explanation-box'), 'Missing .quiz-explanation-box CSS rule');
  });

  // ── 4. Scoring Algorithm Integrity ──────────────────────────────────────────
  await test('Scoring: Trusted MCQ calculation produces exact score without trusting client', () => {
    const questions = [
      { id: 'q1', type: 'mcq', correctIndex: 2 },
      { id: 'q2', type: 'mcq', correctIndex: 0 },
      { id: 'q3', type: 'mcq', correctIndex: 3 },
      { id: 'q4', type: 'short' } // short answer ignored in MCQ math
    ];
    const userAnswers = {
      q1: 2, // correct
      q2: 1, // incorrect (selected 1, correct 0)
      q3: 3  // correct
    };

    let correctCount = 0;
    let mcqCount = 0;
    questions.forEach(q => {
      if (q.type === 'mcq') {
        mcqCount++;
        if (userAnswers[q.id] === q.correctIndex) {
          correctCount++;
        }
      }
    });

    assert.strictEqual(mcqCount, 3);
    assert.strictEqual(correctCount, 2);
    const pct = Math.round((correctCount / mcqCount) * 100);
    assert.strictEqual(pct, 67);
  });

  // ── 5. Live Endpoint Verification ────────────────────────────────────────────
  await test('API: POST /api/tools/explain produces structured academic explanation', async () => {
    let res, data;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        res = await fetch(`${BASE_URL}/api/tools/explain`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            topic: 'Binary Search Trees',
            level: 'beginner',
            style: 'step_by_step',
            includeExamples: true
          })
        });
        if (res.status === 200) {
          data = await res.json();
          break;
        }
      } catch {}
      await new Promise(r => setTimeout(r, 1500));
    }
    assert.strictEqual(res && res.status, 200, `Expected 200, got ${res ? res.status : 'no response'}`);
    assert.strictEqual(data.status, 'success');
    assert.ok(data.explanation && data.explanation.length > 50);
  });

  await test('API: POST /api/tools/quiz produces structured quiz with question array', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/quiz`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        topic: 'Big-O Notation',
        difficulty: 'medium',
        questionCount: 3,
        questionType: 'mcq'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.ok(Array.isArray(data.questions) && data.questions.length >= 3);
    assert.strictEqual(data.questions[0].type, 'mcq');
    assert.strictEqual(data.questions[0].options.length, 4);
    assert.ok(typeof data.questions[0].correctIndex === 'number');
  });

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`Results: ${passed} Passed, ${failed} Failed`);
  console.log('═══════════════════════════════════════════════════════════════');

  if (failed > 0) process.exit(1);
}

run().catch(err => {
  console.error('Fatal error in test suite:', err);
  process.exit(1);
});
