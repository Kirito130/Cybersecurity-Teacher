"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "cyberxp-motion";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

type MotionSnapshot = "run" | "paused" | "reduced";

const listeners = new Set<() => void>();

function readPaused(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "paused";
  } catch {
    return false;
  }
}

let paused = typeof window !== "undefined" ? readPaused() : false;

function getSnapshot(): MotionSnapshot {
  if (window.matchMedia(REDUCED_QUERY).matches) return "reduced";
  return paused ? "paused" : "run";
}

function getServerSnapshot(): MotionSnapshot {
  return "paused";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia(REDUCED_QUERY);
  media.addEventListener("change", listener);
  function onStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY) return;
    paused = readPaused();
    listener();
  }
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function setMotionPaused(next: boolean) {
  paused = next;
  try {
    if (next) window.localStorage.setItem(STORAGE_KEY, "paused");
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be blocked; the in-memory value still applies for this tab.
  }
  for (const listener of listeners) listener();
}

/** "reduced" means the operating system asked for less motion; the toggle cannot override it. */
export function useMotionPreference(): MotionSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
