"use client";

import { memo, useEffect, useRef } from "react";

const HOT =
  'a[href], button:not(:disabled), .stamp, .way, summary, [role="button"], input[type="submit"], input[type="button"], label[for]';

const IDLE = 36;
const PAD = 6;
const RING_EASE = 0.18;

function isHotTarget(node: EventTarget | null): HTMLElement | null {
  if (!(node instanceof Element)) return null;
  const el = node.closest(HOT);
  if (!(el instanceof HTMLElement)) return null;
  if (el.closest("[data-cursor='native']")) return null;
  if (el.matches("input:not([type='submit']):not([type='button']), textarea, select")) {
    return null;
  }
  return el;
}

function PixelCursorInner() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const aimRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!rootRef.current || !ringRef.current || !aimRef.current || !frameRef.current) {
      return;
    }
    const root: HTMLDivElement = rootRef.current;
    const ring: HTMLDivElement = ringRef.current;
    const aim: HTMLDivElement = aimRef.current;
    const frame: HTMLDivElement = frameRef.current;

    // Imperative only — avoid JSX data-* defaults that React resets on parent re-render.
    root.dataset.on = "false";
    root.dataset.visible = "false";
    root.dataset.state = "idle";

    let enabled = false;
    let visible = false;
    let hot: HTMLElement | null = null;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    function setEnabled(next: boolean) {
      enabled = next;
      document.documentElement.classList.toggle("has-pixel-cursor", enabled);
      root.dataset.on = enabled ? "true" : "false";
      if (!enabled) {
        visible = false;
        hot = null;
        root.dataset.visible = "false";
        root.dataset.state = "idle";
        cancelAnimationFrame(raf);
        return;
      }
      loop();
    }

    function placeFrame(x: number, y: number, w: number, h: number) {
      frame.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame.style.width = `${w}px`;
      frame.style.height = `${h}px`;
    }

    function syncHotFrame() {
      if (!hot) {
        placeFrame(mx - IDLE / 2, my - IDLE / 2, IDLE, IDLE);
        return;
      }
      const box = hot.getBoundingClientRect();
      placeFrame(box.left - PAD, box.top - PAD, box.width + PAD * 2, box.height + PAD * 2);
    }

    function loop() {
      if (!enabled) return;
      rx += (mx - rx) * (reduce.matches ? 1 : RING_EASE);
      ry += (my - ry) * (reduce.matches ? 1 : RING_EASE);
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (!hot) placeFrame(mx - IDLE / 2, my - IDLE / 2, IDLE, IDLE);
      raf = requestAnimationFrame(loop);
    }

    function onMove(event: PointerEvent) {
      if (!enabled) return;
      mx = event.clientX;
      my = event.clientY;
      aim.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (!visible) {
        visible = true;
        root.dataset.visible = "true";
      }
      const under = document.elementFromPoint(mx, my) ?? event.target;
      const next = isHotTarget(under);
      if (next !== hot) {
        hot = next;
        root.dataset.state = hot ? "hot" : "idle";
      }
      syncHotFrame();
    }

    function onLeave() {
      visible = false;
      hot = null;
      root.dataset.visible = "false";
      root.dataset.state = "idle";
    }

    function onScroll() {
      if (hot) syncHotFrame();
    }

    setEnabled(fine.matches && !reduce.matches);
    const onFine = () => setEnabled(fine.matches && !reduce.matches);
    const onReduce = () => setEnabled(fine.matches && !reduce.matches);

    fine.addEventListener("change", onFine);
    reduce.addEventListener("change", onReduce);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-pixel-cursor");
      fine.removeEventListener("change", onFine);
      reduce.removeEventListener("change", onReduce);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  return (
    <div ref={rootRef} className="px-cursor" aria-hidden="true">
      <div ref={ringRef} className="px-cursor-ring">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="10 18.84"
            strokeLinecap="butt"
          />
        </svg>
      </div>
      <div ref={frameRef} className="px-cursor-frame">
        <i className="px-cursor-corner tl" />
        <i className="px-cursor-corner tr" />
        <i className="px-cursor-corner bl" />
        <i className="px-cursor-corner br" />
      </div>
      <div ref={aimRef} className="px-cursor-aim">
        <span className="px-cursor-cross h" />
        <span className="px-cursor-cross v" />
        <span className="px-cursor-dot" />
      </div>
    </div>
  );
}

export const PixelCursor = memo(PixelCursorInner);
