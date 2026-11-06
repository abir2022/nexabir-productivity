/* NexaBir Productivity — service worker
   Bump VERSION on every deploy that changes the demo data or shell assets,
   so returning visitors never see a stale cached build. */
const VERSION = "nexabir-productivity-v2";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./data/analytics.js",
  "./data/opencode.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Demo data changes often: always revalidate it.
  if (url.pathname.endsWith("/data/opencode.json") || url.pathname.endsWith("/data/analytics.js")) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // App shell: cache-first with background refresh.
  e.respondWith(
    caches.match(req).then((hit) => {
      const network = fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => hit);
      return hit || network;
    })
  );
});
