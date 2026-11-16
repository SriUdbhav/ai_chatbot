/**
 * StudyMate AI — Service Worker
 * Versioned caching, offline navigation support, and zero-caching of API/private data.
 */

'use strict';

// History: CACHE_VERSION = 'v1.2.0', 'v1.4.0', 'v1.5.0', 'v1.6.0', 'v1.7.0'
const CACHE_VERSION = 'v1.8.0';
const STATIC_CACHE = `studymate-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `studymate-runtime-${CACHE_VERSION}`;

/**
 * Essential assets required to run the core StudyMate AI interface offline,
 * including local AI detectors, data structures complete learning module, and syllabus knowledge base.
 */
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/css/chat.css',
  '/css/style.css',
  '/js/chat.js',
  '/js/main.js',
  '/js/local-ai.js',
  '/js/local-ai-detector.js',
  '/js/ds-knowledge-engine.js',
  '/js/ds-complete-data.js',
  '/js/ds-learning-module.js',
  '/js/offline-package-manager.js',
  '/js/webllm-worker.js',
  '/js/web-llm.js',
  '/js/jszip.min.js',
  '/knowledge/data-structures/fundamentals.json',
  '/knowledge/data-structures/searching.json',
  '/knowledge/data-structures/sorting.json',
  '/knowledge/data-structures/linked-lists.json',
  '/knowledge/data-structures/stacks.json',
  '/knowledge/data-structures/queues.json',
  '/knowledge/data-structures/circular-queues.json',
  '/knowledge/data-structures/binary-trees.json',
  '/knowledge/data-structures/graphs.json',
  '/knowledge/data-structures/hashing.json',
  '/knowledge/data-structures/heaps.json',
  '/knowledge/data-structures/recursion.json',
  '/knowledge/data-structures/complexity.json',
  '/knowledge/data-structures/viva.json',
  '/manifest.webmanifest',
  '/manifest.json',
  '/icons/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-192-maskable.png',
  '/icons/icon-512-maskable.png',
  '/favicon.ico',
  '/favicon.png'
];

/**
 * 1. INSTALL LIFECYCLE
 * Pre-caches the full application shell and all essential assets.
 * Dual-keys the root URL and notifies all clients when offline caching is complete.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      console.log(`[SW ${CACHE_VERSION}] Installing and precaching essential offline assets...`);

      // 1. Explicitly prefetch and cache the primary application shell ('/')
      try {
        const rootResponse = await fetch('/', { cache: 'no-cache' });
        if (rootResponse && rootResponse.status === 200) {
          await cache.put('/', rootResponse.clone());
          await cache.put(self.location.origin + '/', rootResponse.clone());
          await cache.put(self.location.origin, rootResponse.clone());
        }
      } catch (err) {
        console.warn('[SW] Could not precache root app shell (/):', err.message);
      }

      // 2. Explicitly prefetch and cache the offline fallback page
      try {
        const offlineResponse = await fetch('/offline.html', { cache: 'no-cache' });
        if (offlineResponse && offlineResponse.status === 200) {
          await cache.put('/offline.html', offlineResponse.clone());
          await cache.put(self.location.origin + '/offline.html', offlineResponse.clone());
        }
      } catch (err) {
        console.warn('[SW] Could not precache offline.html:', err.message);
      }

      // 3. Pre-cache all remaining static assets in parallel with individual error resilience
      await Promise.all(
        PRECACHE_ASSETS.map(async (url) => {
          if (url === '/' || url === '/offline.html') return;
          try {
            const response = await fetch(url, { cache: 'no-cache' });
            if (response && response.status === 200) {
              await cache.put(url, response.clone());
              // Also map full origin URL to ensure hit on exact navigation paths
              try {
                const fullUrl = new URL(url, self.location.origin).href;
                await cache.put(fullUrl, response);
              } catch (_) {}
            }
          } catch (err) {
            console.warn('[SW] Could not precache:', url, err.message);
          }
        })
      );

      console.log(`[SW ${CACHE_VERSION}] Pre-caching completed successfully.`);

      // 4. Notify open windows that offline preparation is complete
      try {
        const clientsList = await self.clients.matchAll({ includeUncontrolled: true });
        for (const client of clientsList) {
          client.postMessage({
            type: 'SW_OFFLINE_READY',
            version: CACHE_VERSION,
            message: 'StudyMate AI is ready for offline use.'
          });
        }
      } catch (_) {}
    })().then(() => self.skipWaiting())
  );
});

/**
 * 2. ACTIVATE LIFECYCLE
 * Purges any outdated caches from previous versions and claims all clients immediately.
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return (
              name.startsWith('studymate-') &&
              name !== STATIC_CACHE &&
              name !== RUNTIME_CACHE
            );
          })
          .map((name) => {
            console.log('[SW] Removing stale cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

/**
 * Helper to match the application shell from cache across multiple key variations.
 */
async function matchCachedAppShell(request) {
  // 1. Try exact requested URL in cache
  let cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  // 2. Try relative root ('/')
  cached = await caches.match('/', { ignoreSearch: true });
  if (cached) return cached;

  // 3. Try absolute origin root ('https://origin/')
  cached = await caches.match(self.location.origin + '/', { ignoreSearch: true });
  if (cached) return cached;

  // 4. Try absolute origin ('https://origin')
  cached = await caches.match(self.location.origin, { ignoreSearch: true });
  if (cached) return cached;

  // 5. Try offline.html fallback
  cached = await caches.match('/offline.html', { ignoreSearch: true });
  if (cached) return cached;

  cached = await caches.match(self.location.origin + '/offline.html', { ignoreSearch: true });
  return cached;
}

/**
 * 3. FETCH LIFECYCLE
 * Strategic cache routing:
 *  - Non-GET requests: bypass SW completely (never cached)
 *  - API requests (/api/*): network-only with graceful offline JSON fallback (never cached)
 *  - HTML Navigations: If offline -> instant cached shell; if online -> network with fast timeout fallback
 *  - Static assets (CSS/JS/Fonts/Icons): Stale-While-Revalidate / Cache-first
 */
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Rule A: Never intercept or cache non-GET requests (POST, PUT, DELETE, etc.)
  // All Gemini chat, tools, and doc endpoints use POST.
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Rule 0: Bypass Service Worker for external AI model weights & CDNs
  // WebLLM manages its own persistent CacheStorage ('webllm/model', 'webllm/wasm', 'webllm/config')
  // We MUST NEVER intercept or proxy Hugging Face, GitHub, LFS CDNs, or external AI assets.
  const isSameOrigin = url.origin === self.location.origin;
  const isGoogleFont = url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com');

  if (!isSameOrigin && !isGoogleFont) {
    return;
  }

  // Also explicitly bypass any model weights, wasm binaries, or tensor manifests even if requested relatively
  if (
    url.pathname.endsWith('.bin') ||
    url.pathname.endsWith('.wasm') ||
    url.pathname.endsWith('.safetensors') ||
    url.pathname.endsWith('ndarray-cache.json') ||
    url.pathname.endsWith('mlc-chat-config.json') ||
    url.pathname.includes('/mlc-ai/')
  ) {
    return;
  }

  // Rule B: Do NOT cache Gemini API responses, server endpoints, or failed API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({
            status: 'error',
            code: 'OFFLINE',
            message: 'You are currently offline. Gemini AI and server features require an active internet connection. Please use DS Complete Answers or Offline AI mode.'
          }),
          {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'application/json' }
          }
        );
      })
    );
    return;
  }

  // Rule C: Navigation requests (HTML pages)
  // When offline, immediately return the cached application shell without waiting for network timeout.
  // When online, attempt network with a fast timeout (1800ms) and fallback to cache to prevent dinosaur screens.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        // Condition 1: If browser indicates device is offline, serve cached app shell immediately
        if (!self.navigator.onLine) {
          const cachedShell = await matchCachedAppShell(request);
          if (cachedShell) {
            return cachedShell;
          }
        }

        // Condition 2: Online or unknown status — race network fetch with a 1800ms timeout
        try {
          const fetchPromise = fetch(request);
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('SW navigation network timeout')), 1800)
          );

          const networkResponse = await Promise.race([fetchPromise, timeoutPromise]);
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
            cache.put('/', networkResponse.clone());
            cache.put(self.location.origin + '/', networkResponse.clone());
            return networkResponse;
          }
        } catch (networkErr) {
          // Network failed or timed out (offline, spotty connection, server asleep)
          console.log('[SW] Navigation fetch timed out or offline. Serving from cache:', networkErr.message);
        }

        // Fallback: Return cached app shell or offline.html
        const cachedResponse = await matchCachedAppShell(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Ultimate fallback: styled 200 HTML response so Chrome never displays Dinosaur screen
        return new Response(
          '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>StudyMate AI — Offline</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0d1117;color:#e6edf3;padding:2rem;text-align:center;margin-top:10vh;}h1{color:#818cf8;}a{color:#60a5fa;}</style></head><body><h1>StudyMate AI</h1><p>StudyMate AI is currently operating offline.</p><p><a href="/">Reload StudyMate AI Workspace</a></p></body></html>',
          {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          }
        );
      })()
    );
    return;
  }

  // Rule D: Static assets (CSS, JS, Fonts, Images, Manifest)
  // Cache-first with background revalidation (Stale-While-Revalidate)
  event.respondWith(
    (async () => {
      // 1. Check cache first with search parameter flexibility
      let cachedResponse = await caches.match(request, { ignoreSearch: true });
      if (!cachedResponse && url.origin === self.location.origin) {
        cachedResponse = await caches.match(url.pathname, { ignoreSearch: true });
      }

      if (cachedResponse) {
        // Return cached copy immediately.
        // Revalidate in background only when the device is online
        if (self.navigator.onLine) {
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const targetCache = url.origin === self.location.origin
                  ? STATIC_CACHE
                  : RUNTIME_CACHE;
                caches.open(targetCache).then((cache) => {
                  cache.put(request, networkResponse);
                });
              }
            })
            .catch(() => {
              // Ignore background revalidation failure when offline
            });
        }
        return cachedResponse;
      }

      // 2. Not in cache: fetch from network
      try {
        const networkResponse = await fetch(request);

        // Cache valid responses for static assets and Google Fonts
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          (url.origin === self.location.origin ||
           url.hostname.includes('fonts.googleapis.com') ||
           url.hostname.includes('fonts.gstatic.com'))
        ) {
          const targetCache = url.origin === self.location.origin
            ? STATIC_CACHE
            : RUNTIME_CACHE;
          const toCache = networkResponse.clone();
          caches.open(targetCache).then((cache) => {
            cache.put(request, toCache);
          });
        }

        return networkResponse;
      } catch (fetchErr) {
        // Safe offline fallbacks: prevent CSS/JS font network errors from breaking page layout
        if (url.pathname.endsWith('.css') || url.hostname.includes('fonts.googleapis.com')) {
          return new Response('/* offline font/css fallback */', {
            status: 200,
            headers: { 'Content-Type': 'text/css' }
          });
        }
        if (url.pathname.endsWith('.js')) {
          return new Response('/* offline script fallback */', {
            status: 200,
            headers: { 'Content-Type': 'application/javascript' }
          });
        }
        return cachedResponse || new Response('', { status: 200, statusText: 'Offline' });
      }
    })()
  );
});

/**
 * 4. MESSAGE EVENT
 * Allows clients to prompt skipWaiting during service worker upgrades.
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
