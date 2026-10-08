"use client";

import { useSyncExternalStore } from "react";

// One timer for the whole page: every row that shows a delivery state reads the
// same "now", so there is a single 30-second tick however many rows are on screen.

const TICK_MS = 30 * 1000;

let now = Date.now();
let timer: ReturnType<typeof setInterval> | undefined;
const listeners = new Set<() => void>();

function tick() {
  now = Date.now();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  if (!listeners.size) {
    now = Date.now();
    timer = setInterval(tick, TICK_MS);
    // a background tab throttles timers — catch up as soon as it is visible again
    document.addEventListener("visibilitychange", tick);
  }
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    }
  };
}

/**
 * Current time, refreshed every 30 seconds. null on the server and during
 * hydration — callers fall back to the state the API sent until it is known.
 */
export function useDeliveryClock(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => now,
    () => null,
  );
}
