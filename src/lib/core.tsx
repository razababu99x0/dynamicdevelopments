import { useEffect } from "react";
import Lenis from "lenis";

/* ------------------------------------------------------------------ */
/*  Lenis smooth scroll singleton                                      */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;

export function initLenis() {
  if (lenis) return lenis;
  lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.4 });
  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return lenis;
}

export function scrollToId(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -90, duration: 1.4 });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
}

export function stopScroll() { lenis?.stop(); document.body.style.overflow = "hidden"; }
export function startScroll() { lenis?.start(); document.body.style.overflow = ""; }

/* ------------------------------------------------------------------ */
/*  Ambient section store — drives the magical scroll color journey    */
/* ------------------------------------------------------------------ */
type AmbientListener = (section: string) => void;
const ambientListeners = new Set<AmbientListener>();

export function setAmbientSection(section: string) {
  ambientListeners.forEach((l) => l(section));
}

export function onAmbientChange(listener: AmbientListener) {
  ambientListeners.add(listener);
  return () => { ambientListeners.delete(listener); };
}

/** Attach to a section — when it dominates the viewport, ambient light shifts. */
export function useAmbientSection(id: string) {
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setAmbientSection(id); }); },
      { rootMargin: "-38% 0px -38% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);
}

/* ------------------------------------------------------------------ */
/*  Quote hand-off: estimator -> contact form                          */
/* ------------------------------------------------------------------ */
export interface QuoteDetail {
  type: string;
  low: number;
  high: number;
}
export function sendQuoteToForm(detail: QuoteDetail) {
  window.dispatchEvent(new CustomEvent<QuoteDetail>("dd:quote", { detail }));
}
