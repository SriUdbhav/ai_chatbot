/**
 * Test Suite: Progressive Web App & Offline Functionality Verification
 * Validates manifest, service worker, precache assets, offline fallback, and Express routes.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let failedTests = 0;

function pass(name) {
  passedTests++;
  console.log(`  ✅ ${name}`);
}

function fail(name, err) {
  failedTests++;
  console.error(`  ❌ ${name}:`, err.message || err);
}

function runTests() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('📱 StudyMate AI — PWA & Offline Verification Suite');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // ── 1. MANIFEST VERIFICATION ──────────────────────────────────────────────
  console.log('1. Web App Manifest (manifest.webmanifest & manifest.json):');
  try {
    const manifestPath = path.join(__dirname, '..', 'public', 'manifest.webmanifest');
    assert.ok(fs.existsSync(manifestPath), 'manifest.webmanifest exists');

    const raw = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(raw);

    assert.strictEqual(manifest.name, 'StudyMate AI', 'App name is StudyMate AI');
    assert.strictEqual(manifest.short_name, 'StudyMate AI', 'Short name is StudyMate AI');
    assert.strictEqual(manifest.start_url, '/', 'start_url is /');
    assert.strictEqual(manifest.scope, '/', 'scope is /');
    assert.strictEqual(manifest.display, 'standalone', 'display mode is standalone');
    assert.strictEqual(manifest.theme_color, '#4f46e5', 'theme_color is #4f46e5');
    assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 4, 'Manifest contains required icons');

    // Check each icon exists on disk
    for (const icon of manifest.icons) {
      const iconPath = path.join(__dirname, '..', 'public', icon.src.replace(/^\//, ''));
      assert.ok(fs.existsSync(iconPath), `Icon file ${icon.src} exists on disk`);
      const stat = fs.statSync(iconPath);
      assert.ok(stat.size > 0, `Icon file ${icon.src} is not empty (${stat.size} bytes)`);
    }

    // Verify manifest.json exists as well
    const manifestJsonPath = path.join(__dirname, '..', 'public', 'manifest.json');
    assert.ok(fs.existsSync(manifestJsonPath), 'manifest.json exists');

    pass('Web App Manifest is valid JSON and all referenced icons exist on disk');
  } catch (err) {
    fail('Web App Manifest validation', err);
  }

  // ── 2. SERVICE WORKER ARCHITECTURE ────────────────────────────────────────
  console.log('\n2. Service Worker (public/sw.js):');
  try {
    const swPath = path.join(__dirname, '..', 'public', 'sw.js');
    assert.ok(fs.existsSync(swPath), 'sw.js exists in public directory');

    const swCode = fs.readFileSync(swPath, 'utf8');

    // Versioned cache check
    assert.ok(/CACHE_VERSION\s*=\s*['"]v[0-9.]+['"]/.test(swCode), 'Service worker defines a versioned cache');
    assert.ok(swCode.includes('install'), 'Service worker handles install event');
    assert.ok(swCode.includes('activate'), 'Service worker handles activate event');
    assert.ok(swCode.includes('fetch'), 'Service worker handles fetch event');
    assert.ok(swCode.includes('caches.delete'), 'Service worker purges outdated caches on activate');
    assert.ok(swCode.includes('clients.claim()'), 'Service worker claims clients on activation');
    assert.ok(swCode.includes('skipWaiting()'), 'Service worker supports skipWaiting');

    // Security & exclusion rules
    assert.ok(swCode.includes("request.method !== 'GET'"), 'SW does not cache non-GET requests (e.g. POST)');
    assert.ok(swCode.includes("url.pathname.startsWith('/api/')"), 'SW does not cache /api/ endpoints');

    // Navigation fallback check
    assert.ok(swCode.includes("request.mode === 'navigate'"), 'SW intercepts HTML navigation requests');
    assert.ok(swCode.includes('/offline.html'), 'SW includes offline.html as fallback for navigations');

    pass('Service worker code adheres to all architectural and caching safety rules');
  } catch (err) {
    fail('Service Worker validation', err);
  }

  // ── 3. PRECACHED ASSETS DISK INTEGRITY ────────────────────────────────────
  console.log('\n3. Precache Assets Verification:');
  try {
    const swCode = fs.readFileSync(path.join(__dirname, '..', 'public', 'sw.js'), 'utf8');
    const match = swCode.match(/const PRECACHE_ASSETS\s*=\s*\[([\s\S]*?)\];/);
    assert.ok(match, 'PRECACHE_ASSETS array found in sw.js');

    const assetUrls = match[1]
      .split(',')
      .map(s => s.trim().replace(/['"]/g, ''))
      .filter(s => s.length > 0 && s !== '/');

    for (const assetUrl of assetUrls) {
      const diskPath = path.join(__dirname, '..', 'public', assetUrl.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), `Precached asset exists on disk: ${assetUrl}`);
    }
    pass(`All ${assetUrls.length} precached static assets verified on disk`);
  } catch (err) {
    fail('Precache asset disk integrity', err);
  }

  // ── 4. OFFLINE FALLBACK PAGE (public/offline.html) ─────────────────────────
  console.log('\n4. Offline Fallback Page (public/offline.html):');
  try {
    const offlinePath = path.join(__dirname, '..', 'public', 'offline.html');
    assert.ok(fs.existsSync(offlinePath), 'offline.html exists');

    const html = fs.readFileSync(offlinePath, 'utf8');
    assert.ok(html.includes('StudyMate AI'), 'offline.html contains StudyMate AI brand');
    assert.ok(html.includes('Offline') || html.includes('offline'), 'offline.html indicates offline status');
    assert.ok(html.includes('Gemini'), 'offline.html explains Gemini AI requires internet');
    assert.ok(html.includes('Retry Connection') || html.includes('reload'), 'offline.html provides retry action');
    pass('Offline fallback page is complete, styled, and self-contained');
  } catch (err) {
    fail('Offline fallback page validation', err);
  }

  // ── 5. EJS TEMPLATE INTEGRATION ───────────────────────────────────────────
  console.log('\n5. Frontend Template Integration (views/chat.ejs):');
  try {
    const chatEjs = fs.readFileSync(path.join(__dirname, '..', 'views', 'chat.ejs'), 'utf8');

    assert.ok(chatEjs.includes('rel="manifest" href="/manifest.webmanifest"'), 'chat.ejs links manifest.webmanifest');
    assert.ok(chatEjs.includes('theme-color'), 'chat.ejs sets theme-color meta tag');
    assert.ok(chatEjs.includes('apple-mobile-web-app-capable'), 'chat.ejs sets iOS web app capable');
    assert.ok(chatEjs.includes('offlineIndicatorBadge'), 'chat.ejs contains offline indicator badge');
    assert.ok(chatEjs.includes('offlineBanner'), 'chat.ejs contains offline status banner');
    assert.ok(chatEjs.includes('pwaInstallBtn'), 'chat.ejs contains PWA install trigger button');

    const chatJs = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'chat.js'), 'utf8');
    assert.ok(chatJs.includes('navigator.serviceWorker.register'), 'chat.js registers Service Worker');
    assert.ok(chatJs.includes('beforeinstallprompt'), 'chat.js handles PWA install prompt');
    assert.ok(chatJs.includes('offlineIndicatorBadge'), 'chat.js updates offline badge on connectivity change');
    assert.ok(chatJs.includes('!navigator.onLine'), 'chat.js contains offline guard before chat submission');

    pass('EJS templates and client script include all required PWA and offline components');
  } catch (err) {
    fail('Frontend template integration', err);
  }

  // ── 6. ROUTE CONFIGURATION & SERVER HEADERS ───────────────────────────────
  console.log('\n6. Express Route & Static Headers Verification:');
  try {
    const routes = require('../routes/index');
    assert.ok(routes && routes.stack, 'Express routes router is exported');

    // Extract all registered route paths and methods
    const registeredRoutes = routes.stack
      .filter(r => r.route)
      .map(r => ({
        path: r.route.path,
        methods: Object.keys(r.route.methods)
      }));

    const homeRoute = registeredRoutes.find(r => r.path === '/');
    assert.ok(homeRoute && homeRoute.methods.includes('get'), 'GET / route is registered');

    const offlineRoute = registeredRoutes.find(r => r.path === '/offline');
    assert.ok(offlineRoute && offlineRoute.methods.includes('get'), 'GET /offline route is registered');

    const chatApiRoute = registeredRoutes.find(r => r.path === '/api/chat');
    assert.ok(chatApiRoute && chatApiRoute.methods.includes('post'), 'POST /api/chat route is registered');

    // Test server static headers configuration in server.js
    const serverCode = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');
    assert.ok(serverCode.includes('Service-Worker-Allowed'), 'server.js sets Service-Worker-Allowed header');
    assert.ok(serverCode.includes('no-cache'), 'server.js sets no-cache header on sw.js');
    assert.ok(serverCode.includes('application/manifest+json'), 'server.js sets manifest mime type header');

    pass('Express routes (/ and /offline) and static service-worker headers are properly configured');
  } catch (err) {
    fail('Express route and headers verification', err);
  }

  // ── FINAL SUMMARY ─────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`Results: ${passedTests} Passed, ${failedTests} Failed`);
  console.log('═══════════════════════════════════════════════════════════════');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
