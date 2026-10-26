/**
 * Study Tools Controller — Phase 5
 *
 * Implements AI-powered academic learning tools powered by Google Gemini API:
 *   1. Concept Explainer      (POST /api/tools/explain)
 *   2. Programming Assistant  (POST /api/tools/programming)
 *   3. Notes Summarizer       (POST /api/tools/summarize)
 *   4. AI Quiz Generator      (POST /api/tools/quiz)
 *   5. AI Quiz Evaluator      (POST /api/tools/quiz/evaluate)
 *
 * Strict Security Guarantees:
 *   • Never accepts arbitrary system instructions from the browser.
 *   • Enforces strict input validation and payload bounds.
 *   • Safe JSON extraction and fallback validation for structured data.
 *   • Redacts any sensitive keys from error logs.
 */

'use strict';

const {
  isApiKeyConfigured,
  getGenAIClient,
  getModelName,
  getFallbackModelName,
} = require('../config/gemini');

// ── Generic Gemini Caller with Automatic Model Fallback ─────────────────────────

/**
 * Calls Gemini modelsModule.generateContent with fallback on model error.
 *
 * @param {import('@google/genai').GoogleGenAI} ai
 * @param {string} systemInstruction
 * @param {string} userPrompt
 * @param {boolean} isJson
 * @returns {Promise<string>}
 */
async function callGemini(ai, systemInstruction, userPrompt, isJson = false) {
  const preferredModel = getModelName();
  const fallbackModel  = getFallbackModelName();

  const config = {
    systemInstruction,
    temperature: isJson ? 0.2 : 0.7,
  };

  if (isJson) {
    config.responseMimeType = 'application/json';
  }

  try {
    const response = await ai.models.generateContent({
      model: preferredModel,
      contents: userPrompt,
      config,
    });

    const text = typeof response.text === 'function' ? response.text() : response.text;
    if (!text || typeof text !== 'string' || text.trim() === '') {
      throw new Error('EMPTY_RESPONSE');
    }
    return text.trim();

  } catch (err) {
    const errMsg = (err.message || '').toLowerCase();
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
      console.warn(`[Tools] Primary model ${preferredModel} unavailable. Retrying with fallback: ${fallbackModel}`);
      const response = await ai.models.generateContent({
        model: fallbackModel,
        contents: userPrompt,
        config,
      });

      const text = typeof response.text === 'function' ? response.text() : response.text;
      if (!text || typeof text !== 'string' || text.trim() === '') {
        throw new Error('EMPTY_RESPONSE');
      }
      return text.trim();
    }

    throw err;
  }
}

// ── Standardized Tool Error Handler ─────────────────────────────────────────────

function handleToolError(res, err) {
  const errMsg = (err.message || '').toLowerCase();
  const errStr = String(err);

  console.error('[Tools] Error calling Gemini API:', errStr.replace(/AIza\S+/g, '[REDACTED]'));

  // Invalid / missing API key
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
      message: 'The Gemini API key is invalid or has expired. Please check your .env configuration.',
    });
  }

  // Rate limit / Quota
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

  // Safety filter block
  if (
    errMsg.includes('safety') ||
    errMsg.includes('blocked') ||
    errMsg.includes('finish_reason: safety') ||
    errMsg.includes('harm')
  ) {
    return res.status(422).json({
      status:  'error',
      code:    'SAFETY_BLOCK',
      message: 'Your prompt was flagged by the AI safety filter. Please rephrase your topic.',
    });
  }

  // Empty response
  if (errMsg.includes('empty_response')) {
    return res.status(502).json({
      status:  'error',
      code:    'EMPTY_RESPONSE',
      message: 'The AI returned an empty response. Please try with different parameters.',
    });
  }

  // Network error
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
      message: 'Could not reach the Gemini API service. Check your internet connection.',
    });
  }

  // Generic fallback
  return res.status(500).json({
    status:  'error',
    code:    'INTERNAL_ERROR',
    message: 'An unexpected error occurred while processing your study tool request.',
  });
}

// ── 1. CONCEPT EXPLAINER ────────────────────────────────────────────────────────

/**
 * POST /api/tools/explain
 * Inputs: { topic, level, style, includeExamples }
 */
exports.postConceptExplain = async (req, res) => {
  const { topic, level = 'beginner', style = 'simple', includeExamples = true } = req.body || {};

  if (!topic || typeof topic !== 'string' || topic.trim().length < 2) {
    return res.status(400).json({
      status:  'error',
      code:    'INVALID_TOPIC',
      message: 'Please provide a valid concept or topic name (at least 2 characters).',
    });
  }

  if (topic.trim().length > 500) {
    return res.status(400).json({
      status:  'error',
      code:    'TOPIC_TOO_LONG',
      message: 'Topic name exceeds the maximum length of 500 characters.',
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
      message: 'Could not initialise the AI client.',
    });
  }

  const safeLevel = ['beginner', 'intermediate', 'advanced'].includes(level) ? level : 'beginner';
  const safeStyle = ['simple', 'step_by_step', 'detailed'].includes(style) ? style : 'simple';

  const systemInstruction = `You are an expert academic educator and pedagogical specialist.
Your goal is to explain concepts clearly, accurately, and thoroughly across academic disciplines (computer science, mathematics, natural sciences, engineering, humanities, and general topics).
Structure your explanation systematically:
1. 💡 High-Level Definition: A clear, memorable explanation of what the concept is.
2. 🧠 Core Principle: The fundamental intuition explained at the ${safeLevel.toUpperCase()} level.
3. 🪜 Step-by-Step Breakdown: The inner mechanics, logic, or workflow broken down sequentially.
${includeExamples ? '4. 🔬 Concrete Real-World Examples: At least 1-2 practical, illustrative examples demonstrating the concept in action.' : ''}
5. 📖 Key Terminology: Essential terms, symbols, or definitions every student must know.
6. 🎯 Practical Applications & Common Pitfalls: Where this is applied in practice and what common student misconceptions to avoid.
Use readable GitHub markdown with headers, bold highlights, bullet points, and code/math blocks where appropriate.`;

  const userPrompt = `Please explain the concept: "${topic.trim()}"
- Target Student Level: ${safeLevel}
- Explanation Style: ${safeStyle}
- Include Examples: ${includeExamples ? 'Yes, provide concrete examples' : 'No examples needed'}`;

  try {
    const explanation = await callGemini(ai, systemInstruction, userPrompt, false);
    return res.json({ status: 'success', explanation, topic: topic.trim() });
  } catch (err) {
    return handleToolError(res, err);
  }
};

// ── 2. PROGRAMMING ASSISTANT ───────────────────────────────────────────────────

/**
 * POST /api/tools/programming
 * Inputs: { language, mode, description, codeSnippet }
 */
exports.postProgrammingHelp = async (req, res) => {
  const { language = 'JavaScript', mode = 'explain', description, codeSnippet = '' } = req.body || {};

  if (!description || typeof description !== 'string' || description.trim().length < 3) {
    return res.status(400).json({
      status:  'error',
      code:    'INVALID_DESCRIPTION',
      message: 'Please provide a clear description of your programming question, task, or bug.',
    });
  }

  if (description.trim().length > 4000) {
    return res.status(400).json({
      status:  'error',
      code:    'DESCRIPTION_TOO_LONG',
      message: 'Description exceeds maximum allowed limit of 4000 characters.',
    });
  }

  if (typeof codeSnippet === 'string' && codeSnippet.length > 8000) {
    return res.status(400).json({
      status:  'error',
      code:    'CODE_TOO_LONG',
      message: 'Code snippet exceeds maximum allowed limit of 8000 characters.',
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
      message: 'Could not initialise the AI client.',
    });
  }

  const validModes = ['explain', 'debug', 'generate', 'complexity'];
  const safeMode = validModes.includes(mode) ? mode : 'explain';
  const safeLanguage = (typeof language === 'string' && language.trim()) ? language.trim().slice(0, 50) : 'General';

  const systemInstruction = `You are a senior computer science mentor and software engineer.
Provide clear, educational, and production-quality programming guidance in ${safeLanguage}.
Follow these strict guidelines based on the requested mode:
- For 'explain': Walk through the code or logic step-by-step. Explain what each significant line accomplishes, data structures used, and memory/execution flow.
- For 'debug': Pinpoint the exact root cause of the error or bug. Explain WHY it happens, provide corrected code in a fenced code block, and list edge cases to watch for.
- For 'generate': Write clean, modular, and idiomatic code with clear inline comments. Follow with a concise breakdown of how the solution works and usage examples.
- For 'complexity': Break down the algorithm's Time Complexity (Best, Average, and Worst cases) and Space Complexity using Big-O notation with detailed mathematical/conceptual justification.
Strict safety rules:
- Never execute code on the server.
- Never claim you ran or executed the code on a live machine unless test logs were explicitly provided.
- Always wrap code in fenced code blocks with proper language syntax identifier (\`\`\`${safeLanguage.toLowerCase()}\`\`\`).`;

  let userPrompt = `Mode: ${safeMode.toUpperCase()}\nProgramming Language: ${safeLanguage}\n\nTask / Question / Error:\n${description.trim()}`;
  if (codeSnippet && typeof codeSnippet === 'string' && codeSnippet.trim()) {
    userPrompt += `\n\nCode Snippet:\n\`\`\`${safeLanguage.toLowerCase()}\n${codeSnippet.trim()}\n\`\`\``;
  }

  try {
    const result = await callGemini(ai, systemInstruction, userPrompt, false);
    return res.json({ status: 'success', result, language: safeLanguage, mode: safeMode });
  } catch (err) {
    return handleToolError(res, err);
  }
};

// ── 3. NOTES SUMMARIZER ────────────────────────────────────────────────────────

/**
 * POST /api/tools/summarize
 * Inputs: { notes, style, length }
 */
exports.postNotesSummarize = async (req, res) => {
  const { notes, style = 'quick_revision', length = 'standard' } = req.body || {};

  if (!notes || typeof notes !== 'string' || notes.trim().length < 10) {
    return res.status(400).json({
      status:  'error',
      code:    'INVALID_NOTES',
      message: 'Please paste notes or textbook excerpts containing at least 10 characters.',
    });
  }

  if (notes.trim().length > 15000) {
    return res.status(400).json({
      status:  'error',
      code:    'NOTES_TOO_LONG',
      message: 'Supplied notes exceed the maximum limit of 15,000 characters. Please split your notes into smaller sections.',
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
      message: 'Could not initialise the AI client.',
    });
  }

  const safeStyle = ['quick_revision', 'detailed', 'exam_prep'].includes(style) ? style : 'quick_revision';
  const safeLength = ['concise', 'standard', 'comprehensive'].includes(length) ? length : 'standard';

  const systemInstruction = `You are an academic summarization and synthesis expert.
Your goal is to transform student notes into a structured, faithful study synthesis.
Strict fidelity constraints:
- Faithfully preserve the original meaning of the supplied notes.
- Do NOT invent formulas, names, dates, or facts not present or directly supported in the notes.
- If providing supplemental context for clarity, clearly denote it as "[Supplemental Context]".
Format your summary with:
1. 📌 Executive Overview: A 2-3 sentence distillation of the main topic.
2. 🔑 Core Concepts & Definitions: Essential vocabulary and fundamental principles.
3. 📐 Formulas, Laws, or Rules: Exact equations or algorithmic rules found in the notes.
4. 📝 High-Yield Revision Points: Bulleted takeaway points comparing nuances and key distinctions.
5. 🎯 High-Probability Exam Questions: 2-3 sample revision questions based directly on the notes with brief answers.
Adapt depth and brevity to match requested style (${safeStyle}) and length (${safeLength}).`;

  const userPrompt = `Please summarize the following study notes:\nStyle: ${safeStyle}\nDesired Length: ${safeLength}\n\n--- NOTES CONTENT ---\n${notes.trim()}\n--- END NOTES ---`;

  try {
    const summary = await callGemini(ai, systemInstruction, userPrompt, false);
    return res.json({ status: 'success', summary, style: safeStyle, length: safeLength });
  } catch (err) {
    return handleToolError(res, err);
  }
};

// ── 4. AI QUIZ GENERATOR ───────────────────────────────────────────────────────

/**
 * POST /api/tools/quiz
 * Inputs: { topic, difficulty, questionCount, questionType }
 */
exports.postQuizGenerate = async (req, res) => {
  const { topic, difficulty = 'medium', questionCount = 5, questionType = 'mcq' } = req.body || {};

  if (!topic || typeof topic !== 'string' || topic.trim().length < 2) {
    return res.status(400).json({
      status:  'error',
      code:    'INVALID_TOPIC',
      message: 'Please provide a valid topic for quiz generation (at least 2 characters).',
    });
  }

  if (topic.trim().length > 300) {
    return res.status(400).json({
      status:  'error',
      code:    'TOPIC_TOO_LONG',
      message: 'Quiz topic exceeds the maximum length of 300 characters.',
    });
  }

  const count = Math.min(Math.max(parseInt(questionCount, 10) || 5, 3), 15);
  const safeDifficulty = ['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'medium';
  const safeType = ['mcq', 'short', 'mixed'].includes(questionType) ? questionType : 'mcq';

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
      message: 'Could not initialise the AI client.',
    });
  }

  const systemInstruction = `You are an academic assessment and quiz creation specialist.
Generate a high quality, balanced academic quiz on the requested topic.
You MUST output ONLY a valid JSON object matching this exact schema:
{
  "topic": "string",
  "difficulty": "easy|medium|hard",
  "questions": [
    {
      "id": "q1",
      "type": "mcq",
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Clear explanation of why this choice is correct and others are not"
    },
    {
      "id": "q2",
      "type": "short",
      "question": "Question text here",
      "sampleAnswer": "Ideal model answer (1-3 sentences)",
      "keyPoints": ["Key point 1", "Key point 2"],
      "explanation": "Clear rubric of what constitutes an accurate response"
    }
  ]
}

Strict requirements:
- If type is 'mcq', generate exactly 4 options per question, with 'correctIndex' as an integer 0, 1, 2, or 3.
- If type is 'short', provide 'sampleAnswer' and 'keyPoints'.
- If type is 'mixed', include a balanced mix of 'mcq' and 'short' questions.
- Generate EXACTLY ${count} questions.
- Never output markdown code fences or conversational text; output raw JSON only.`;

  const userPrompt = `Generate a ${safeDifficulty} quiz on "${topic.trim()}" with ${count} questions. Question type preference: ${safeType}.`;

  try {
    const rawJson = await callGemini(ai, systemInstruction, userPrompt, true);

    let parsedQuiz;
    try {
      let clean = rawJson.trim();
      if (clean.startsWith('```')) {
        clean = clean.replace(/^```(?:json)?\n?/, '').replace(/```$/, '').trim();
      }
      parsedQuiz = JSON.parse(clean);
    } catch (parseErr) {
      console.error('[Quiz] Failed to parse JSON from model:', rawJson);
      return res.status(502).json({
        status:  'error',
        code:    'MALFORMED_QUIZ_JSON',
        message: 'The AI generated an invalid quiz format. Please try generating again.',
      });
    }

    // Validate structured quiz data
    if (!parsedQuiz || !Array.isArray(parsedQuiz.questions) || parsedQuiz.questions.length === 0) {
      return res.status(502).json({
        status:  'error',
        code:    'INVALID_QUIZ_STRUCTURE',
        message: 'The AI did not generate questions. Please try again.',
      });
    }

    // Validate and sanitize each question
    const sanitizedQuestions = parsedQuiz.questions
      .filter((q) => q && typeof q.question === 'string' && q.question.trim())
      .map((q, idx) => {
        const id = q.id || `q_${idx + 1}`;
        const type = q.type === 'short' ? 'short' : 'mcq';

        if (type === 'mcq') {
          const rawOptions = Array.isArray(q.options) ? q.options : ['A', 'B', 'C', 'D'];
          const options = rawOptions.slice(0, 4).map((opt) => String(opt).trim());
          while (options.length < 4) {
            options.push(`Option ${options.length + 1}`);
          }

          let correctIndex = parseInt(q.correctIndex, 10);
          if (isNaN(correctIndex) || correctIndex < 0 || correctIndex >= options.length) {
            correctIndex = 0;
          }

          return {
            id,
            type: 'mcq',
            question: q.question.trim(),
            options,
            correctIndex,
            explanation: typeof q.explanation === 'string' ? q.explanation.trim() : 'Correct answer explanation.',
          };
        } else {
          return {
            id,
            type: 'short',
            question: q.question.trim(),
            sampleAnswer: typeof q.sampleAnswer === 'string' ? q.sampleAnswer.trim() : '',
            keyPoints: Array.isArray(q.keyPoints) ? q.keyPoints.map(String) : [],
            explanation: typeof q.explanation === 'string' ? q.explanation.trim() : '',
          };
        }
      });

    return res.json({
      status:     'success',
      topic:      topic.trim(),
      difficulty: safeDifficulty,
      questions:  sanitizedQuestions,
    });

  } catch (err) {
    return handleToolError(res, err);
  }
};

// ── 5. AI QUIZ SHORT-ANSWER EVALUATOR ──────────────────────────────────────────

/**
 * POST /api/tools/quiz/evaluate
 * Inputs: { question, sampleAnswer, studentAnswer, keyPoints }
 */
exports.postQuizEvaluate = async (req, res) => {
  const { question, sampleAnswer = '', studentAnswer, keyPoints = [] } = req.body || {};

  if (!question || typeof question !== 'string') {
    return res.status(400).json({
      status:  'error',
      code:    'INVALID_QUESTION',
      message: 'Original question text is required.',
    });
  }

  if (!studentAnswer || typeof studentAnswer !== 'string' || studentAnswer.trim() === '') {
    return res.status(400).json({
      status:  'error',
      code:    'EMPTY_ANSWER',
      message: 'Please write an answer to be evaluated.',
    });
  }

  if (studentAnswer.trim().length > 2000) {
    return res.status(400).json({
      status:  'error',
      code:    'ANSWER_TOO_LONG',
      message: 'Answer exceeds maximum allowed length of 2000 characters.',
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
      message: 'Could not initialise the AI client.',
    });
  }

  const systemInstruction = `You are an educational grader evaluating a student's short answer response.
Be constructive, encouraging, and fair. Accept reasonable paraphrasing, alternative valid explanations, and partial understanding.
Output ONLY raw JSON matching this schema:
{
  "status": "correct|partially_correct|incorrect",
  "scorePercent": 85,
  "feedback": "2-3 sentences of constructive feedback explaining what was accurate and what was missing",
  "strengths": ["Key point the student identified accurately"],
  "improvements": ["Key point or nuance to add for complete mastery"]
}
Strict rule: Do not present grading as absolutely objective; frame it as formative pedagogical feedback.`;

  const userPrompt = `Question:\n${question.trim()}

Expected Model Answer:\n${sampleAnswer.trim()}

Key Rubric Points:\n${Array.isArray(keyPoints) ? keyPoints.join('\n- ') : 'N/A'}

Student Submitted Answer:\n${studentAnswer.trim()}`;

  try {
    const rawJson = await callGemini(ai, systemInstruction, userPrompt, true);

    let evaluation;
    try {
      let clean = rawJson.trim();
      if (clean.startsWith('```')) {
        clean = clean.replace(/^```(?:json)?\n?/, '').replace(/```$/, '').trim();
      }
      evaluation = JSON.parse(clean);
    } catch {
      evaluation = {
        status:       'partially_correct',
        scorePercent: 70,
        feedback:     'Your answer covers core ideas. Review the sample answer to reinforce missing terminology.',
        strengths:    ['Addressed the general question'],
        improvements: ['Check key terminology'],
      };
    }

    const safeStatus = ['correct', 'partially_correct', 'incorrect'].includes(evaluation.status)
      ? evaluation.status
      : 'partially_correct';

    const safeScore = typeof evaluation.scorePercent === 'number'
      ? Math.max(0, Math.min(100, Math.round(evaluation.scorePercent)))
      : 70;

    return res.json({
      status: 'success',
      evaluation: {
        status:       safeStatus,
        scorePercent: safeScore,
        feedback:     typeof evaluation.feedback === 'string' ? evaluation.feedback : 'Good effort.',
        strengths:    Array.isArray(evaluation.strengths) ? evaluation.strengths.map(String) : [],
        improvements: Array.isArray(evaluation.improvements) ? evaluation.improvements.map(String) : [],
      },
    });

  } catch (err) {
    return handleToolError(res, err);
  }
};
