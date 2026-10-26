/**
 * Application Routes — Phase 5 (Advanced AI Study Tools & Learning Modes)
 */

const express = require('express');
const router = express.Router();

const chatController  = require('../controllers/chatController');
const homeController  = require('../controllers/homeController');
const toolsController = require('../controllers/toolsController');

// ── Main Chatbot UI ───────────────────────────────────────────────────────────
router.get('/', chatController.getChatPage);

// ── Chat API (Multi-turn conversations & learning mode support) ───────────────
router.post('/api/chat', chatController.postChat);

// ── Study Tools APIs (Phase 5) ────────────────────────────────────────────────
router.post('/api/tools/explain', toolsController.postConceptExplain);
router.post('/api/tools/programming', toolsController.postProgrammingHelp);
router.post('/api/tools/summarize', toolsController.postNotesSummarize);
router.post('/api/tools/quiz', toolsController.postQuizGenerate);
router.post('/api/tools/quiz/evaluate', toolsController.postQuizEvaluate);

// ── Server Health Check ───────────────────────────────────────────────────────
router.get('/api/status', homeController.getApiStatus);

module.exports = router;
