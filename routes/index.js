/**
 * Application Routes — Phase 5 (Advanced AI Study Tools & Learning Modes)
 */

const express = require('express');
const router = express.Router();

const chatController     = require('../controllers/chatController');
const homeController     = require('../controllers/homeController');
const toolsController    = require('../controllers/toolsController');
const documentController = require('../controllers/documentController');

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

// ── AI Document Reader & Study Notes APIs ─────────────────────────────────────
router.post('/api/document/read', documentController.uploadMiddleware, documentController.postDocumentRead);
router.post('/api/document/summarize', documentController.postDocumentSummarize);
router.post('/api/document/chat', documentController.postDocumentChat);

// ── Server Health Check ───────────────────────────────────────────────────────
router.get('/api/status', homeController.getApiStatus);

module.exports = router;
