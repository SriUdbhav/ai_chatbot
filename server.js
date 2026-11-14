/**
 * AI Study Assistant — Express Server Entry Point
 * Phase 3: Gemini AI integration active
 */

'use strict';

const path      = require('path');
const express   = require('express');
const dotenv    = require('dotenv');
const rateLimit = require('express-rate-limit');

// Load .env before anything else reads process.env
dotenv.config({ path: path.join(__dirname, '.env') });

const app  = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Enable trust proxy when deployed behind reverse proxies (Render, Railway, Heroku, etc.)
if (process.env.NODE_ENV === 'production' || process.env.TRUST_PROXY === 'true') {
  app.set('trust proxy', 1);
}

// ── 1. Template engine ────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── 2. Static assets ─────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('sw.js')) {
      res.setHeader('Service-Worker-Allowed', '/');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (filePath.endsWith('.webmanifest')) {
      res.setHeader('Content-Type', 'application/manifest+json');
    }
  }
}));

// ── 3. Body parsing with a strict size limit ──────────────────────────────────
//  The JSON limit is set to 64 KB — more than enough for any reasonable chat
//  message + history payload, while blocking oversized attack payloads.
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// ── 4. Rate limiter on the chat API ──────────────────────────────────────────
//  Allows up to 30 requests per minute per IP address.
//  Protects against runaway loops, abuse, and excessive API spend.
const chatLimiter = rateLimit({
  windowMs:          60 * 1000, // 1 minute
  max:               30,
  standardHeaders:   true,
  legacyHeaders:     false,
  message: {
    status:  'error',
    code:    'RATE_LIMIT_EXCEEDED',
    message: 'Too many requests. Please wait a moment before sending another message.',
  },
});

// Apply rate limit to chat, study tools, and document API endpoints
app.use('/api/chat', chatLimiter);
app.use('/api/tools', chatLimiter);
app.use('/api/document', chatLimiter);

// ── 5. Routes ─────────────────────────────────────────────────────────────────
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// ── 6. 404 handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', {
    pageTitle:    '404 – Not Found | AI Study Assistant',
    requestedUrl: req.originalUrl,
    currentYear:  new Date().getFullYear(),
  });
});

// ── 7. Global error handler ───────────────────────────────────────────────────
//  Logs the full error server-side but never sends stack traces to the client.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  if (statusCode >= 500) {
    console.error('[Server] Unhandled error:', err);
  }
  res.status(statusCode).json({
    status:  'error',
    code:    err.code || (statusCode === 413 ? 'PAYLOAD_TOO_LARGE' : 'SERVER_ERROR'),
    message: statusCode === 413 ? 'Payload too large.' : 'An unexpected server error occurred.',
  });
});

// ── 8. Start ──────────────────────────────────────────────────────────────────
const server = app.listen(PORT, HOST, () => {
  const { isApiKeyConfigured, getModelName } = require('./config/gemini');
  console.log('═══════════════════════════════════════════════');
  console.log('🎓  AI Study Assistant — Production Server');
  console.log(`📍  Listening on http://${HOST}:${PORT}`);
  console.log(`⚡  Node.js ${process.version} | Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🤖  Gemini Model : ${getModelName()}`);
  console.log(`🔑  API Key      : ${isApiKeyConfigured() ? 'Configured ✓' : 'MISSING ✗'}`);
  console.log('═══════════════════════════════════════════════');
});

// Process-level resilience and signal handling (Phase 2)
process.on('uncaughtException', (err) => {
  console.error('[Server Error] Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[Server Error] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('[Server] HTTP server closed.');
    process.exit(0);
  });
});

module.exports = { app, server };
