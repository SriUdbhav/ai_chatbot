/**
 * StudyMate AI — Production Readiness & Deployment Verification Suite
 * Validates Render deployment configurations, health checks, static assets,
 * security boundaries, PWA manifests, and server resilience.
 */

'use strict';
require('dotenv').config();
const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ ${name}`);
  } catch (err) {
    console.error(`  ❌ ${name}\n     Error: ${err.message}`);
    throw err;
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`  ✅ ${name}`);
  } catch (err) {
    console.error(`  ❌ ${name}\n     Error: ${err.message}`);
    throw err;
  }
}

async function runAll() {
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('🚀 StudyMate AI — Production Deployment Readiness Verification');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  // ── 1. Render Web Service Architecture & Health Endpoints ──────────────────
  console.log('1. Render Web Service Architecture & Health Endpoints:');
  const homeController = require('../controllers/homeController');
  const router = require('../routes/index');
  const serverCode = fs.readFileSync(path.join(__dirname, '../server.js'), 'utf8');

  runTest('server.js binds to process.env.PORT and 0.0.0.0 for Render', () => {
    assert.ok(serverCode.includes("process.env.PORT || 3000"), 'Uses process.env.PORT with fallback');
    assert.ok(serverCode.includes("process.env.HOST || '0.0.0.0'"), 'Binds to 0.0.0.0 for containerized hosting');
    assert.ok(serverCode.includes("app.set('trust proxy'"), 'Enables trust proxy for reverse-proxy routing');
    assert.ok(serverCode.includes("process.on('SIGTERM'"), 'Handles SIGTERM graceful shutdown');
    assert.ok(serverCode.includes("process.on('uncaughtException'"), 'Includes uncaughtException handler');
    assert.ok(serverCode.includes("process.on('unhandledRejection'"), 'Includes unhandledRejection handler');
  });

  runTest('GET /health route is registered and returns HTTP 200 OK JSON status payload', () => {
    let statusCode = null;
    let payload = null;
    const mockRes = {
      status(code) {
        statusCode = code;
        return this;
      },
      json(data) {
        payload = data;
        return this;
      }
    };
    homeController.getHealth({}, mockRes);
    assert.strictEqual(statusCode, 200, 'Status code is 200');
    assert.ok(payload, 'JSON payload returned');
    assert.strictEqual(payload.status, 'ok');
    assert.strictEqual(payload.service, 'StudyMate AI');
    assert.ok(typeof payload.uptime === 'number');
    assert.ok(typeof payload.timestamp === 'string');
    assert.ok(typeof payload.geminiConfigured === 'boolean');
  });

  runTest('GET /api/status route returns HTTP 200 with server telemetry', () => {
    let payload = null;
    const mockRes = {
      json(data) {
        payload = data;
        return this;
      }
    };
    homeController.getApiStatus({}, mockRes);
    assert.ok(payload, 'JSON payload returned');
    assert.strictEqual(payload.status, 'success');
    assert.ok(payload.message.includes('healthy'));
    assert.ok(typeof payload.model === 'string');
  });

  runTest('Route index exposes /health and /api/status endpoints', () => {
    const routes = router.stack
      .filter(r => r.route)
      .map(r => ({ path: r.route.path, methods: Object.keys(r.route.methods) }));
    const healthRoute = routes.find(r => r.path === '/health');
    const statusRoute = routes.find(r => r.path === '/api/status');
    assert.ok(healthRoute && healthRoute.methods.includes('get'), '/health GET registered');
    assert.ok(statusRoute && statusRoute.methods.includes('get'), '/api/status GET registered');
  });

  // ── 2. Security, Secret Isolation & Git Governance ─────────────────────────
  console.log('\n2. Security, Secret Isolation & Git Governance:');
  runTest('.gitignore protects .env and secret files', () => {
    const gitignore = fs.readFileSync(path.join(__dirname, '../.gitignore'), 'utf8');
    assert.ok(gitignore.includes('.env'), '.env explicitly listed in .gitignore');
    assert.ok(fs.existsSync(path.join(__dirname, '../.env.example')), '.env.example template is present');
    const envExample = fs.readFileSync(path.join(__dirname, '../.env.example'), 'utf8');
    assert.ok(!envExample.includes('AQ.Ab'), '.env.example contains no real API keys');
    assert.ok(envExample.includes('GEMINI_API_KEY=your_gemini_api_key_here'), 'Placeholder used in example');
  });

  runTest('chatController passes only safe boolean apiKeyConfigured to client views', () => {
    const chatControllerCode = fs.readFileSync(path.join(__dirname, '../controllers/chatController.js'), 'utf8');
    assert.ok(!chatControllerCode.includes('apiKey: process.env.GEMINI_API_KEY'), 'Raw key never passed in view data');
    assert.ok(chatControllerCode.includes('apiKeyConfigured: isApiKeyConfigured()'), 'Only apiKeyConfigured boolean passed');
  });

  // ── 3. WebLLM Offline Assets & Worker Paths ────────────────────────────────
  console.log('\n3. WebLLM Offline Assets & Worker Paths:');
  runTest('WebLLM Worker (/js/webllm-worker.js) exists and contains handler logic', () => {
    const workerPath = path.join(__dirname, '../public/js/webllm-worker.js');
    assert.ok(fs.existsSync(workerPath), 'webllm-worker.js exists');
    const content = fs.readFileSync(workerPath, 'utf8');
    assert.ok(content.includes('WebWorkerMLCEngineHandler') || content.includes('importScripts'), 'Worker logic found');
  });

  runTest('WebLLM Module (/js/web-llm.js) is present and bundle is complete (>50KB)', () => {
    const webLlmPath = path.join(__dirname, '../public/js/web-llm.js');
    assert.ok(fs.existsSync(webLlmPath), 'web-llm.js exists');
    const stat = fs.statSync(webLlmPath);
    assert.ok(stat.size > 50000, `web-llm.js bundle size (${stat.size} bytes) >= 50KB`);
  });

  runTest('Local AI Controller (/js/local-ai.js) defines supported models and engine lifecycle', () => {
    const localAiPath = path.join(__dirname, '../public/js/local-ai.js');
    assert.ok(fs.existsSync(localAiPath), 'local-ai.js exists');
    const content = fs.readFileSync(localAiPath, 'utf8');
    assert.ok(content.includes('SUPPORTED_MODELS'), 'SUPPORTED_MODELS declared');
    assert.ok(content.includes('CreateWebWorkerMLCEngine'), 'Web Worker MLC Engine instantiated');
  });

  // ── 4. Progressive Web App (PWA) & Service Worker ──────────────────────────
  console.log('\n4. Progressive Web App (PWA) & Service Worker:');
  runTest('Service Worker (/sw.js) configured with Service-Worker-Allowed header in server.js', () => {
    assert.ok(serverCode.includes("res.setHeader('Service-Worker-Allowed', '/')"), 'SW header set to /');
    assert.ok(serverCode.includes("no-cache, no-store, must-revalidate"), 'SW Cache-Control disables caching');
  });

  runTest('Service Worker (/public/sw.js) adheres to cache lifecycle rules', () => {
    const swCode = fs.readFileSync(path.join(__dirname, '../public/sw.js'), 'utf8');
    assert.ok(/CACHE_VERSION\s*=\s*['"]v[0-9.]+['"]/.test(swCode), 'Versioned cache defined');
    assert.ok(swCode.includes("request.method !== 'GET'"), 'SW excludes non-GET mutations');
    assert.ok(swCode.includes("url.pathname.startsWith('/api/')"), 'SW excludes /api routes');
    assert.ok(swCode.includes("request.mode === 'navigate'"), 'SW intercepts navigation for offline fallback');
  });

  runTest('Web Manifest (/manifest.webmanifest & /manifest.json) are valid JSON and standalone', () => {
    const resWeb = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/manifest.webmanifest'), 'utf8'));
    assert.strictEqual(resWeb.name, 'StudyMate AI');
    assert.strictEqual(resWeb.display, 'standalone');

    const resJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/manifest.json'), 'utf8'));
    assert.strictEqual(resJson.name, 'StudyMate AI');
    assert.strictEqual(resJson.display, 'standalone');
  });

  runTest('Offline Fallback Page (/offline.html) exists and is styled', () => {
    const offlineHtml = fs.readFileSync(path.join(__dirname, '../public/offline.html'), 'utf8');
    assert.ok(offlineHtml.includes('StudyMate AI'), 'Contains StudyMate AI branding');
    assert.ok(offlineHtml.includes('Offline') || offlineHtml.includes('offline'), 'Explains offline state');
  });

  // ── 5. Ephemeral Filesystem & Storage Boundaries ───────────────────────────
  console.log('\n5. Ephemeral Filesystem & Storage Boundaries:');
  runTest('Multer uses memoryStorage (zero disk accumulation on Render)', () => {
    const docController = fs.readFileSync(path.join(__dirname, '../controllers/documentController.js'), 'utf8');
    assert.ok(docController.includes('multer.memoryStorage()'), 'multer.memoryStorage() configured');
    assert.ok(!docController.includes('multer.diskStorage('), 'diskStorage is NOT used');
  });

  // ── 6. Production Error Handling & 404 Routing ─────────────────────────────
  console.log('\n6. Production Error Handling & 404 Routing:');
  runTest('404 view and handler exist without exposing stack traces', () => {
    const view404Path = path.join(__dirname, '../views/404.ejs');
    assert.ok(fs.existsSync(view404Path), '404.ejs exists in views');
    const view404 = fs.readFileSync(view404Path, 'utf8');
    assert.ok(!view404.includes('error.stack'), 'No stack trace leak in 404 view');
    assert.ok(serverCode.includes("res.status(404).render('404'"), '404 handler renders 404 template');
    assert.ok(serverCode.includes("res.status(statusCode).json"), 'Global error handler returns JSON error without stack');
  });

  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log(`🎉 ALL ${passedTests}/${totalTests} PRODUCTION READINESS CHECKS PASSED (100%)`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');
}

runAll().catch(err => {
  console.error('\nProduction readiness verification failed:', err);
  process.exit(1);
});
