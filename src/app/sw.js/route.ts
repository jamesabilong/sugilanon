// Keep the legacy URL available: a 404 does not retire an installed worker.
const retirementWorker = `
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // Only reload windows already controlled by the legacy worker.
    const windows = await self.clients.matchAll({ type: "window" });
    await self.registration.unregister();

    // Cache cleanup is best effort; it must not prevent retirement.
    const names = await caches.keys().catch(() => []);
    await Promise.allSettled(names
      .filter((name) => name.startsWith("workbox-precache-") &&
        name.endsWith(self.registration.scope))
      .map((name) => caches.delete(name)));

    await Promise.allSettled(windows.map((client) => client.navigate(client.url)));
  })());
});
`;

export function GET() {
  return new Response(retirementWorker, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store",
      "CDN-Cache-Control": "no-store",
      "Cloudflare-CDN-Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
