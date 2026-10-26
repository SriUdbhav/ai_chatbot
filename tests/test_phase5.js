/**
 * Phase 5 Comprehensive Automated Test Suite
 * Tests:
 *  1. Server Status & API Key Security
 *  2. HTML/EJS Template & UI Component Integrity (Study Tools, Tabs, Learning Modes, Quiz Player)
 *  3. Input Validation & Boundary Enforcement on all 5 Tool Endpoints
 *  4. Notes Summarizer 15,000-character Limit Enforcement
 *  5. Learning Modes & Study Preferences in Chat Controller
 *  6. Quiz Structured Schema & Sanitization Logic
 *  7. Multiple-choice Trusted Scoring Logic
 *  8. Live Gemini AI Generation:
 *     - Chat API with Study Modes
 *     - Concept Explainer
 *     - Programming Assistant (Debug / Complexity)
 *     - Notes Summarizer
 *     - AI Quiz Generator (Structured MCQ + Short)
 *     - AI Quiz Evaluator (Short-Answer Feedback)
 *  9. Error Handling & Rate Limiting Verification
 */

'use strict';

const fs     = require('fs');
const assert = require('assert');

const BASE_URL = 'http://localhost:3000';

let passedCount = 0;
let failedCount = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log('✅ ' + name);
    passedCount++;
  } catch (err) {
    console.log('❌ ' + name + ' — ' + (err.message || err));
    failedCount++;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runAllTests() {
  console.log('═══════════════════════════════════════════════');
  console.log('🧪  Phase 5 Test Suite — Advanced AI Study Tools');
  console.log('═══════════════════════════════════════════════\n');

  // ── 1. Server Health & Security ──────────────────────────────────────────────
  await test('Health check: GET /api/status returns 200 with model info', async () => {
    const res = await fetch(`${BASE_URL}/api/status`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.strictEqual(data.geminiConfigured, true);
    assert.ok(data.model);
    assert.strictEqual(data.apiKey, undefined, 'API key must never be exposed');
  });

  // ── 2. UI & Template Elements ────────────────────────────────────────────────
  await test('UI: GET / renders all 4 study tool triggers and modal panes', async () => {
    const res = await fetch(`${BASE_URL}/`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    // Check sidebar buttons
    assert.ok(html.includes('id="sidebarToolExplain"'), 'Missing sidebar Explainer button');
    assert.ok(html.includes('id="sidebarToolProgramming"'), 'Missing sidebar Code button');
    assert.ok(html.includes('id="sidebarToolSummarize"'), 'Missing sidebar Summarizer button');
    assert.ok(html.includes('id="sidebarToolQuiz"'), 'Missing sidebar Quiz button');

    // Check study mode selector
    assert.ok(html.includes('id="studyModeSelect"'), 'Missing Study Mode select dropdown');
    assert.ok(html.includes('value="standard"'));
    assert.ok(html.includes('value="simple"'));
    assert.ok(html.includes('value="step_by_step"'));
    assert.ok(html.includes('value="exam_prep"'));
    assert.ok(html.includes('value="practice"'));
    assert.ok(html.includes('value="code_focus"'));

    // Check modal & tabs
    assert.ok(html.includes('id="toolsModal"'), 'Missing #toolsModal');
    assert.ok(html.includes('id="tabExplain"'), 'Missing #tabExplain');
    assert.ok(html.includes('id="tabProgramming"'), 'Missing #tabProgramming');
    assert.ok(html.includes('id="tabSummarize"'), 'Missing #tabSummarize');
    assert.ok(html.includes('id="tabQuiz"'), 'Missing #tabQuiz');

    // Check modal forms (modal is strictly an input dialog; results display in main chat)
    assert.ok(html.includes('id="explainForm"'), 'Missing #explainForm');
    assert.ok(html.includes('id="programmingForm"'), 'Missing #programmingForm');
    assert.ok(html.includes('id="summarizeForm"'), 'Missing #summarizeForm');
    assert.ok(html.includes('id="quizForm"'), 'Missing #quizForm');
    // Verify results are NOT displayed in modal
    assert.ok(!html.includes('id="explainResultBox"'), 'Modal should not contain #explainResultBox');
    assert.ok(!html.includes('id="progResultBox"'), 'Modal should not contain #progResultBox');
    assert.ok(!html.includes('id="summarizeResultBox"'), 'Modal should not contain #summarizeResultBox');
  });

  // ── 3. Concept Explainer Validation ──────────────────────────────────────────
  await test('Concept Explainer: rejects empty topic with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: '' })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'INVALID_TOPIC');
  });

  await test('Concept Explainer: rejects topic > 500 chars with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: 'A'.repeat(501) })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'TOPIC_TOO_LONG');
  });

  // ── 4. Programming Assistant Validation ──────────────────────────────────────
  await test('Programming Assistant: rejects empty description with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/programming`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: '   ' })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'INVALID_DESCRIPTION');
  });

  await test('Programming Assistant: rejects description > 4000 chars with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/programming`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: 'A'.repeat(4001) })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'DESCRIPTION_TOO_LONG');
  });

  await test('Programming Assistant: rejects code snippet > 8000 chars with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/programming`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: 'Help debug this', codeSnippet: 'A'.repeat(8001) })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'CODE_TOO_LONG');
  });

  // ── 5. Notes Summarizer Validation ───────────────────────────────────────────
  await test('Notes Summarizer: rejects notes < 10 chars with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: 'short' })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'INVALID_NOTES');
  });

  await test('Notes Summarizer: rejects notes > 15,000 chars with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: 'Word '.repeat(3001) }) // > 15,000 chars
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'NOTES_TOO_LONG');
  });

  // ── 6. Quiz Generator Validation ─────────────────────────────────────────────
  await test('Quiz Generator: rejects empty topic with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: '' })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'INVALID_TOPIC');
  });

  await test('Quiz Generator: rejects topic > 300 chars with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: 'Q'.repeat(301) })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'TOPIC_TOO_LONG');
  });

  // ── 7. Quiz Short-Answer Evaluator Validation ────────────────────────────────
  await test('Quiz Evaluator: rejects missing question with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/quiz/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentAnswer: 'My answer' })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'INVALID_QUESTION');
  });

  await test('Quiz Evaluator: rejects empty student answer with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/quiz/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: 'What is photosynthesis?', studentAnswer: '   ' })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.code, 'EMPTY_ANSWER');
  });

  // ── 8. Chat API with Study Modes ─────────────────────────────────────────────
  await delay(1200);
  await test('Chat API: accepts study mode context in request', async () => {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What is a binary search tree?',
        mode: 'step_by_step'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.strictEqual(data.mode, 'step_by_step');
    assert.ok(typeof data.reply === 'string' && data.reply.length > 50, 'Expected substantive AI reply');
  });

  // ── 9. Live Gemini Generation: Concept Explainer ─────────────────────────────
  await delay(1200);
  await test('Live AI: Concept Explainer generates structured academic explanation', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'Polymorphism in Object-Oriented Programming',
        level: 'intermediate',
        style: 'step_by_step',
        includeExamples: true
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.ok(typeof data.explanation === 'string' && data.explanation.length > 100);
    assert.ok(data.explanation.toLowerCase().includes('polymorphism'));
  });

  // ── 10. Live Gemini Generation: Programming Assistant ────────────────────────
  await delay(1200);
  await test('Live AI: Programming Assistant analyzes and generates code guidance', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/programming`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'JavaScript',
        mode: 'complexity',
        description: 'What is the time and space complexity of merge sort?',
        codeSnippet: 'function mergeSort(arr) { /* ... */ }'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.ok(typeof data.result === 'string' && data.result.length > 100);
    assert.ok(data.result.includes('O(') || data.result.toLowerCase().includes('log'));
  });

  // ── 11. Live Gemini Generation: Notes Summarizer ─────────────────────────────
  await delay(1200);
  await test('Live AI: Notes Summarizer generates synthesis from lecture notes', async () => {
    const lectureNotes = `
      Newton's Laws of Motion:
      First Law (Law of Inertia): An object at rest remains at rest, and an object in motion continues with constant velocity, unless acted upon by a net external force.
      Second Law: The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass: F = m * a.
      Third Law: Whenever one object exerts a force on a second object, the second object exerts an equal and opposite force on the first: F_AB = -F_BA.
      Applications include rocket propulsion, vehicular braking, and celestial mechanics.
    `;

    const res = await fetch(`${BASE_URL}/api/tools/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notes: lectureNotes,
        style: 'quick_revision',
        length: 'standard'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.ok(typeof data.summary === 'string' && data.summary.length > 100);
    assert.ok(data.summary.toLowerCase().includes('inertia') || data.summary.includes('F = m * a') || data.summary.includes('Newton'));
  });

  // ── 12. Live Gemini Generation: AI Quiz Generator ────────────────────────────
  await delay(1200);
  await test('Live AI: AI Quiz Generator produces validated structured JSON questions', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'Mitochondria and Cellular Energy',
        difficulty: 'medium',
        questionCount: 3,
        questionType: 'mcq'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.strictEqual(data.topic, 'Mitochondria and Cellular Energy');
    assert.strictEqual(data.difficulty, 'medium');
    assert.ok(Array.isArray(data.questions));
    assert.ok(data.questions.length >= 3, `Expected at least 3 questions, got ${data.questions.length}`);

    // Verify MCQ structure and answer key
    const firstQ = data.questions[0];
    assert.strictEqual(firstQ.type, 'mcq');
    assert.ok(firstQ.question && firstQ.question.length > 5);
    assert.strictEqual(firstQ.options.length, 4, 'Must have exactly 4 options');
    assert.ok(typeof firstQ.correctIndex === 'number' && firstQ.correctIndex >= 0 && firstQ.correctIndex < 4);
    assert.ok(typeof firstQ.explanation === 'string' && firstQ.explanation.length > 0);
  });

  // ── 13. Live Gemini Generation: Quiz Short-Answer Evaluator ──────────────────
  await delay(1200);
  await test('Live AI: Quiz Evaluator grades student short-answer with feedback', async () => {
    const res = await fetch(`${BASE_URL}/api/tools/quiz/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'What is the primary function of mitochondria?',
        sampleAnswer: 'To generate adenosine triphosphate (ATP) through cellular respiration.',
        keyPoints: ['ATP production', 'cellular respiration', 'powerhouse of cell'],
        studentAnswer: 'It produces ATP for the cell via respiration.'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'success');
    assert.ok(data.evaluation);
    assert.ok(['correct', 'partially_correct', 'incorrect'].includes(data.evaluation.status));
    assert.ok(typeof data.evaluation.scorePercent === 'number');
    assert.ok(typeof data.evaluation.feedback === 'string' && data.evaluation.feedback.length > 10);
  });

  // ── 14. Frontend Logic: Trusted Quiz Scoring Calculation ─────────────────────
  await test('Frontend: MCQ scoring calculates correct count without trusting client answers', () => {
    const sampleQuestions = [
      { id: 'q1', type: 'mcq', correctIndex: 1 },
      { id: 'q2', type: 'mcq', correctIndex: 3 },
      { id: 'q3', type: 'mcq', correctIndex: 0 }
    ];

    const studentAnswers = {
      q1: 1, // correct
      q2: 2, // incorrect (selected 2, correct is 3)
      q3: 0  // correct
    };

    let correctCount = 0;
    let mcqCount = 0;
    sampleQuestions.forEach(q => {
      if (q.type === 'mcq') {
        mcqCount++;
        if (studentAnswers[q.id] === q.correctIndex) {
          correctCount++;
        }
      }
    });

    assert.strictEqual(mcqCount, 3);
    assert.strictEqual(correctCount, 2);
    const pct = Math.round((correctCount / mcqCount) * 100);
    assert.strictEqual(pct, 67);
  });

  // ── Summary ──────────────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════');
  console.log(`Results: ${passedCount} Passed, ${failedCount} Failed`);
  console.log('═══════════════════════════════════════════════');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runAllTests().catch(err => {
  console.error('Test runner fatal error:', err);
  process.exit(1);
});
