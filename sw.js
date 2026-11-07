"use strict";

const cachePrefix = "dub-siren:";
const cacheName = cachePrefix + "v0.3.1";
const scope = new URL(self.registration.scope);
const indexPath = new URL("index.html", scope).pathname;
const appPage = scope.href;
const assets = new Set([
  "./",
  "manifest.webmanifest",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "air-horn.wav",
  "thunder.wav?v=2"
].map(path => new URL(path, scope).href));

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    // The host redirects /index.html to /. Cache the final URL directly.
    await cache.addAll([...assets].map(url => new Request(url, { cache: "reload", redirect: "error" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter(name => name.startsWith(cachePrefix) && name !== cacheName)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  const isAppPage = url.origin === scope.origin &&
    (url.pathname === scope.pathname || url.pathname === indexPath);
  const cachedUrl = request.mode === "navigate" && isAppPage ? appPage : url.href;
  if (!assets.has(cachedUrl)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const response = await cache.match(cachedUrl);
    return response && !response.redirected ? response : fetch(request);
  })());
});
