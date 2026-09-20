import React, { useEffect, useRef, useState } from "react";
import {
  motion, AnimatePresence, useMotionValue, useSpring,
  useInView, useScroll, useMotionTemplate,
} from "framer-motion";
import { onAmbientChange, startScroll, stopScroll } from "../lib/core";
import { SITE } from "../config";
import Logo from "./Logo";

/* ================================================================== */
/*  CUSTOM CURSOR — desktop only, context aware                        */
/* ================================================================== */
type CursorVariant = { label: string | null; color: string; scale: number };

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>({ label: null, color: "#f4f8ff", scale: 1 });
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.7 });
  const trailX = useSpring(x, { stiffness: 60, damping: 20 });
  const trailY = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-desktop");

    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setVisible(true); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const tagged = t.closest("[data-cursor]") as HTMLElement | null;
      if (tagged) {
        const kind = tagged.dataset.cursor;
        if (kind === "view") setVariant({ label: "VIEW", color: "#25e3ff", scale: 2.6 });
        else if (kind === "open") setVariant({ label: "OPEN", color: "#f4f8ff", scale: 2.6 });
        else if (kind === "drag") setVariant({ label: "DRAG", color: "#8b5cff", scale: 2.9 });
        else if (kind === "lime") setVariant({ label: null, color: "#c8ff32", scale: 2.2 });
        else setVariant({ label: null, color: "#f4f8ff", scale: 1.9 });
        return;
      }
      const interactive = t.closest("a, button, input, select, textarea, [role='button']");
      if (interactive) setVariant({ label: null, color: "#f4f8ff", scale: 1.9 });
      else setVariant({ label: null, color: "#f4f8ff", scale: 1 });
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[96] h-24 w-24 rounded-full"
        style={{
          x: trailX, y: trailY, translateX: "-50%", translateY: "-50%",
          background: `radial-gradient(circle, ${variant.color}26 0%, transparent 65%)`,
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[97] flex items-center justify-center rounded-full border"
        style={{
          x: ringX, y: ringY, translateX: "-50%", translateY: "-50%",
          borderColor: variant.color + "88",
          backgroundColor: variant.label ? variant.color + "1a" : "transparent",
          backdropFilter: variant.label ? "blur(2px)" : "none",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: variant.label ? 64 : 34 * variant.scale,
          height: variant.label ? 64 : 34 * variant.scale,
          scale: pressed ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        <AnimatePresence>
          {variant.label && (
            <motion.span
              key={variant.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[9px] font-bold tracking-[0.22em]"
              style={{ color: variant.color }}
            >
              {variant.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[98] h-1.5 w-1.5 rounded-full"
        style={{
          x: dotX, y: dotY, translateX: "-50%", translateY: "-50%",
          backgroundColor: variant.color,
          boxShadow: `0 0 12px ${variant.color}`,
          opacity: visible ? (variant.label ? 0 : 1) : 0,
        }}
        animate={{ scale: pressed ? 2 : 1 }}
      />
    </>
  );
}

/* ================================================================== */
/*  MAGNETIC — elements gently pulled toward the cursor                */
/* ================================================================== */
export function Magnetic({
  children, strength = 0.4, className = "",
}: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  TILT — 3D pointer tilt wrapper                                     */
/* ================================================================== */
export function Tilt({
  children, amount = 7, className = "",
}: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const transform = useMotionTemplate`rotateX(${srx}deg) rotateY(${sry}deg)`;

  return (
    <div className={`h-full [perspective:1200px] ${className}`}>
      <motion.div
        ref={ref}
        className="h-full"
        style={{ transform, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry.set(px * amount);
          rx.set(-py * amount);
        }}
        onMouseLeave={() => { rx.set(0); ry.set(0); }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ================================================================== */
/*  GLOBAL SPOTLIGHT — feeds --mx / --my to every .spot element         */
/* ================================================================== */
export function SpotlightSystem() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(".spot") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return null;
}

/* ================================================================== */
/*  STARFIELD — slow drifting energy points                            */
/* ================================================================== */
function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const COLORS = ["#f4f8ff", "#25e3ff", "#3d8bff", "#8b5cff", "#c8ff32"];
    const N = isMobile ? 42 : 120;
    const stars = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.3 + 0.3,
      vy: -(Math.random() * 0.00012 + 0.00003),
      vx: (Math.random() - 0.5) * 0.00006,
      tw: Math.random() * Math.PI * 2,
      tws: Math.random() * 0.02 + 0.005,
      c: COLORS[Math.random() < 0.12 ? 4 : Math.floor(Math.random() * 4)],
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 1.5);
      h = canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 1.5);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y += s.vy; s.x += s.vx; s.tw += s.tws;
        if (s.y < -0.02) { s.y = 1.02; s.x = Math.random(); }
        if (s.x < -0.02) s.x = 1.02;
        if (s.x > 1.02) s.x = -0.02;
        const a = 0.25 + Math.abs(Math.sin(s.tw)) * 0.55;
        ctx.globalAlpha = a;
        ctx.fillStyle = s.c;
        const px = s.x * w, py = s.y * h, rr = s.r * (w / 1600);
        ctx.beginPath();
        ctx.arc(px, py, rr, 0, Math.PI * 2);
        ctx.fill();
        if (rr > 1) {
          ctx.globalAlpha = a * 0.35;
          ctx.beginPath();
          ctx.arc(px, py, rr * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0" />;
}

/* ================================================================== */
/*  SCROLL PROGRESS                                                     */
/* ================================================================== */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[88] h-[2.5px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #c8ff32, #25e3ff, #3d8bff, #8b5cff)",
        boxShadow: "0 0 12px rgba(37,227,255,.55)",
      }}
    />
  );
}

/* ================================================================== */
/*  AMBIENT BACKGROUND — mouse reactive + scroll color journey          */
/* ================================================================== */
const AMBIENTS: Record<string, string> = {
  home: `
    radial-gradient(circle at 18% 24%, rgba(200,255,50,.09), transparent 42%),
    radial-gradient(circle at 84% 16%, rgba(37,227,255,.13), transparent 44%),
    radial-gradient(circle at 70% 78%, rgba(47,92,255,.12), transparent 48%),
    radial-gradient(circle at 30% 88%, rgba(139,92,255,.08), transparent 46%)`,
  services: `
    radial-gradient(circle at 20% 22%, rgba(37,227,255,.13), transparent 42%),
    radial-gradient(circle at 82% 30%, rgba(61,139,255,.14), transparent 46%)`,
  work: `
    radial-gradient(circle at 24% 24%, rgba(47,92,255,.15), transparent 44%),
    radial-gradient(circle at 80% 28%, rgba(139,92,255,.15), transparent 46%)`,
  beforeafter: `
    radial-gradient(circle at 50% 38%, rgba(139,92,255,.12), transparent 46%),
    radial-gradient(circle at 82% 72%, rgba(37,227,255,.1), transparent 42%)`,
  process: `
    radial-gradient(circle at 22% 28%, rgba(37,227,255,.12), transparent 42%),
    radial-gradient(circle at 78% 72%, rgba(200,255,50,.09), transparent 40%)`,
  pricing: `
    radial-gradient(circle at 20% 28%, rgba(200,255,50,.12), transparent 42%),
    radial-gradient(circle at 82% 24%, rgba(255,227,78,.1), transparent 42%)`,
  tech: `
    radial-gradient(circle at 24% 26%, rgba(37,227,255,.12), transparent 42%),
    radial-gradient(circle at 76% 72%, rgba(139,92,255,.13), transparent 46%),
    radial-gradient(circle at 50% 40%, rgba(47,92,255,.08), transparent 50%)`,
  contact: `
    radial-gradient(circle at 14% 24%, rgba(200,255,50,.11), transparent 40%),
    radial-gradient(circle at 86% 24%, rgba(37,227,255,.13), transparent 42%),
    radial-gradient(circle at 50% 88%, rgba(139,92,255,.15), transparent 48%)`,
};

export function AmbientBackground() {
  const [section, setSection] = useState("home");
  useEffect(() => onAmbientChange(setSection), []);

  const mx = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const my = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 3 : 0);
  const sx = useSpring(mx, { stiffness: 30, damping: 20 });
  const sy = useSpring(my, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  const glowA = useMotionTemplate`radial-gradient(580px circle at ${sx}px ${sy}px, rgba(37,227,255,.08), transparent 68%)`;
  const glowB = useMotionTemplate`radial-gradient(440px circle at calc(${sx}px + 110px) calc(${sy}px + 80px), rgba(61,139,255,.07), transparent 66%)`;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #070c1d 0%, #060a18 45%, #080d22 100%)" }} />
      <Starfield />
      <AnimatePresence>
        <motion.div
          key={section}
          className="absolute inset-0"
          style={{ background: AMBIENTS[section] ?? AMBIENTS.home }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <motion.div className="absolute inset-0" style={{ background: glowA }} />
      <motion.div className="absolute inset-0" style={{ background: glowB }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 48%, transparent 52%, rgba(4,7,17,.82) 100%)" }} />
    </div>
  );
}

/* ================================================================== */
/*  MAGICAL PRELOADER — logo assembles, then brand reveals              */
/* ================================================================== */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem("dd-intro")) {
      setShow(false); startScroll(); onDone(); return;
    }
    stopScroll();
    sessionStorage.setItem("dd-intro", "1");
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1250),
      setTimeout(() => setPhase(3), 1750),
      setTimeout(() => setPhase(4), 2050),
      setTimeout(() => finish(), 2600),
    ];
    return () => { timers.forEach(clearTimeout); startScroll(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    if (fired.current) return;
    fired.current = true;
    setShow(false);
    startScroll();
    onDone();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "radial-gradient(circle at 50% 45%, #0a1230 0%, #060a18 62%)" }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          onClick={finish}
        >
          {/* expanding light */}
          <motion.div
            className="absolute rounded-full"
            style={{ background: "radial-gradient(circle, rgba(37,227,255,.85), rgba(47,92,255,.3) 42%, transparent 72%)" }}
            initial={{ width: 6, height: 6, opacity: 0 }}
            animate={phase >= 1 ? { width: 420, height: 420, opacity: [0, 0.9, 0.22] } : {}}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <Logo size={148} animated glow />
          </motion.div>

          <div className="relative z-10 mt-9 flex flex-col items-center">
            <div className="flex overflow-hidden">
              {"DYNAMIC".split("").map((l, i) => (
                <motion.span
                  key={i}
                  className="font-display text-[clamp(1.6rem,5.4vw,3.2rem)] font-bold tracking-[0.16em] text-ice"
                  initial={{ y: 44, opacity: 0, filter: "blur(8px)" }}
                  animate={phase >= 2 ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
                  transition={{ delay: i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <div className="flex overflow-hidden">
              {"DEVELOPMENTS".split("").map((l, i) => (
                <motion.span
                  key={i}
                  className="font-display text-[clamp(1.6rem,5.4vw,3.2rem)] font-bold tracking-[0.12em] text-gradient-azure"
                  initial={{ y: 44, opacity: 0, filter: "blur(8px)" }}
                  animate={phase >= 2 ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
                  transition={{ delay: 0.12 + i * 0.035, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="mt-4 h-px w-0 bg-gradient-to-r from-transparent via-cyan to-transparent"
              animate={phase >= 3 ? { width: "min(380px, 70vw)" } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ boxShadow: "0 0 18px rgba(37,227,255,.8)" }}
            />
            <motion.p
              className="mt-4 font-mono text-[10px] tracking-[0.5em] text-teal"
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
            >
              SINCE 2025 · FROM IDEA TO INTERACTIVE REALITY
            </motion.p>
          </div>

          {/* lime-lime flash */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 48%, rgba(200,255,50,.13), transparent 62%)" }}
            initial={{ opacity: 0 }}
            animate={phase >= 4 ? { opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.button
            className="absolute bottom-10 z-20 font-mono text-[10px] tracking-[0.4em] text-white/30 transition-colors hover:text-cyan"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            onClick={(e) => { e.stopPropagation(); finish(); }}
          >
            SKIP
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  FLOATING WHATSAPP                                                  */
/* ================================================================== */
export function WhatsAppButton() {
  if (!SITE.whatsappNumber) return null;
  return (
    <motion.a
      href={`https://wa.me/${SITE.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="glass-strong fixed bottom-6 right-6 z-[80] flex h-13 w-13 items-center justify-center rounded-full"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 34px rgba(200,255,50,.25)" }}
      data-cursor="open"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#c8ff32]">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.81.82-3-.2-.31a8.07 8.07 0 0 1-1.24-4.31c0-4.47 3.64-8.1 8.12-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.48-3.63 8.12-8.1 8.12zm4.45-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.5.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.03 0 1.2.87 2.35 1 2.51.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
      </svg>
    </motion.a>
  );
}

/* ================================================================== */
/*  BRAND LINES MARQUEE                                                 */
/* ================================================================== */
const BRAND_LINES = [
  "We Build Websites That Feel Alive.",
  "Your Vision. Our Code. One Powerful Digital Experience.",
  "Designed to Impress. Built to Perform.",
  "Turning Businesses Into Digital Experiences.",
  "Not Just Websites — Digital Worlds.",
  "Build Different. Grow Faster.",
  "Your Business Deserves More Than a Template.",
];

export function BrandMarquee() {
  const items = [...BRAND_LINES, ...BRAND_LINES];
  return (
    <div className="relative z-10 overflow-hidden border-y border-[rgba(160,190,255,0.08)] bg-white/[0.015] py-5">
      <div className="animate-marquee flex w-max items-center">
        {items.map((line, i) => (
          <span key={i} className="flex items-center">
            <span className={`font-display text-sm font-medium tracking-wide ${i % 3 === 1 ? "text-gradient-azure" : "text-white/55"}`}>
              {line}
            </span>
            <span className="mx-8 h-1.5 w-1.5 rotate-45 bg-lime/70 shadow-[0_0_10px_#c8ff32]" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060a18] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060a18] to-transparent" />
    </div>
  );
}

/* ================================================================== */
/*  SHARED PRIMITIVES                                                   */
/* ================================================================== */
export function Reveal({
  children, delay = 0, y = 34, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  kicker, title, sub, center = true,
}: { kicker: string; title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={`${center ? "mx-auto text-center items-center" : "text-left items-start"} flex max-w-3xl flex-col`}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(160,190,255,0.14)] bg-white/[0.03] px-4 py-1.5 font-mono text-[10px] tracking-[0.35em] text-cyan">
          <span className="h-1 w-1 rounded-full bg-lime shadow-[0_0_8px_#c8ff32]" />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-ice text-balance">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-soft">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{prefix}{display.toLocaleString("en-IN")}{suffix}</span>;
}
