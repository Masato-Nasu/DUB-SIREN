"use strict";

const cachePrefix = "dub-siren:";
const cacheName = cachePrefix + "v0.3.0";
const scope = new URL(self.registration.scope);
const index = new URL("index.html", scope).href;
const assets = new Set([
  "index.html",
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
    await cache.addAll([...assets].map(url => new Request(url, { cache: "reload" })));
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
    (url.pathname === scope.pathname || url.pathname === new URL(index).pathname);
  const cachedUrl = request.mode === "navigate" && isAppPage ? index : url.href;
  if (!assets.has(cachedUrl)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    return (await cache.match(cachedUrl)) ?? fetch(request);
  })());
});
