/**
 * StudyMate AI — Service Worker
 * Versioned caching, offline navigation support, and zero-caching of API/private data.
 */

'use strict';

const CACHE_VERSION = 'v1.2.0';
const STATIC_CACHE = `studymate-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `studymate-runtime-${CACHE_VERSION}`;

/**
 * Essential assets required to run the core StudyMate AI interface offline.
 */
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/css/chat.css',
  '/css/style.css',
  '/js/chat.js',
  '/js/main.js',
  '/js/local-ai.js',
  '/js/webllm-worker.js',
  '/js/web-llm.js',
  '/js/jszip.min.js',
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
 * Pre-caches essential UI assets and immediately takes control.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      // Cache assets sequentially with individual resilience
      await Promise.all(
        PRECACHE_ASSETS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: 'no-cache' });
            if (response && response.status === 200) {
              await cache.put(url, response);
            }
          } catch (err) {
            console.warn('[SW] Could not precache:', url, err.message);
          }
        })
      );
    }).then(() => self.skipWaiting())
  );
});

/**
 * 2. ACTIVATE LIFECYCLE
 * Purges any outdated caches from previous versions and claims all clients.
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
 * 3. FETCH LIFECYCLE
 * Strategic cache routing:
 *  - Non-GET requests: bypass SW completely (never cached)
 *  - API requests (/api/*): network-only with graceful offline JSON fallback (never cached)
 *  - HTML Navigations: Network-first with cache fallback and offline.html fallback
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

  // Rule 0: Bypass Service Worker for external AI model weights & HuggingFace/GitHub CDN assets
  // WebLLM manages its own persistent CacheStorage ('webllm/model', 'webllm/wasm')
  if (
    url.hostname.includes('huggingface.co') ||
    url.hostname.includes('raw.githubusercontent.com') ||
    url.hostname.includes('github.com') ||
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
            message: 'You are currently offline. Gemini AI and server features require an active internet connection.'
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
  // Try network first so live updates display when connected; fallback to cached app or offline.html
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (networkErr) {
          // Device is offline:
          // 1. Try exact requested URL in cache
          const cachedExact = await caches.match(request);
          if (cachedExact) {
            return cachedExact;
          }

          // 2. Try the primary application root ('/')
          const cachedRoot = await caches.match('/');
          if (cachedRoot) {
            return cachedRoot;
          }

          // 3. Fall back to the designated offline page
          const offlinePage = await caches.match('/offline.html');
          if (offlinePage) {
            return offlinePage;
          }

          return new Response(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Offline | StudyMate AI</title></head><body><h1>Offline</h1><p>StudyMate AI requires an internet connection.</p></body></html>',
            {
              status: 503,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            }
          );
        }
      })()
    );
    return;
  }

  // Rule D: Static assets (CSS, JS, Fonts, Images, Manifest)
  // Cache-first with background revalidation (Stale-While-Revalidate)
  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(request);

      if (cachedResponse) {
        // Return cached copy immediately, revalidate in background if online
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const targetCache = request.url.startsWith(self.location.origin)
                ? STATIC_CACHE
                : RUNTIME_CACHE;
              caches.open(targetCache).then((cache) => {
                cache.put(request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Revalidation failed (device offline); cached response was already served
          });

        return cachedResponse;
      }

      // Not in cache yet: retrieve from network
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
        // Return 404 or empty response for missing static assets when offline
        return cachedResponse || new Response('', { status: 408, statusText: 'Request Timed Out (Offline)' });
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

