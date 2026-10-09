"use client";

import { useEffect } from "react";

export function RetireLegacyServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const retireWorker = async () => {
      const root = new URL("/", window.location.href);
      const registration = await navigator.serviceWorker.getRegistration(root.href);
      const worker = registration?.active ?? registration?.waiting ?? registration?.installing;
      if (!registration || !worker || registration.scope !== root.href) return;

      const script = new URL(worker.scriptURL);
      if (script.origin === root.origin && script.pathname === "/sw.js") {
        // Update an existing registration only; PhilWatch has no offline worker.
        await registration.update();
      }
    };

    retireWorker().catch((error) => {
      console.warn("Unable to retire legacy service worker", error);
    });
  }, []);

  return null;
}
