import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import HeroScene from "./HeroScene";
import { scrollToId } from "../lib/core";
import { Magnetic } from "./Effects";

/* ---------------- floating browser ---------------- */
function FloatingBrowser({ className, depth = 1 }: { className: string; depth?: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const x = useTransform(sx, (v) => v * 26 * depth);
  const y = useTransform(sy, (v) => v * 18 * depth);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <motion.div className={`pointer-events-none absolute hidden lg:block ${className}`} style={{ x, y }}>
      <div className="animate-float-slow">
        <div className="glass w-64 rounded-2xl p-3 shadow-[0_20px_60px_rgba(2,8,26,.6)]" style={{ transform: `rotate(${depth > 0 ? -6 : 5}deg)` }}>
          <div className="mb-2.5 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 h-3 flex-1 rounded-full bg-white/5" />
          </div>
          <div className="space-y-1.5 rounded-lg bg-[#0a1228] p-3">
            <div className="flex items-center justify-between">
              <div className="h-1.5 w-10 rounded-full bg-cyan/60" />
              <div className="h-1.5 w-6 rounded-full bg-white/15" />
              <div className="h-1.5 w-6 rounded-full bg-white/15" />
              <div className="h-1.5 w-8 rounded-full bg-lime/80" />
            </div>
            <div className="space-y-1 pt-1.5">
              <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-lime/80 to-cyan/80" />
              <div className="h-2 w-1/2 rounded-full bg-white/20" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
            </div>
            <div className="flex gap-1.5 pt-1">
              <div className="h-4 w-12 rounded-full bg-lime/90" />
              <div className="h-4 w-12 rounded-full border border-white/20" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingDashboard({ className }: { className: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 36, damping: 16 });
  const sy = useSpring(my, { stiffness: 36, damping: 16 });
  const x = useTransform(sx, (v) => v * -34);
  const y = useTransform(sy, (v) => v * -22);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <motion.div className={`pointer-events-none absolute hidden lg:block ${className}`} style={{ x, y }}>
      <div className="animate-float">
        <div className="glass w-56 rounded-2xl p-3.5 shadow-[0_20px_60px_rgba(2,8,26,.6)]" style={{ transform: "rotate(4deg)" }}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] tracking-[0.25em] text-white/40">ANALYTICS</span>
            <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_8px_#c8ff32]" />
          </div>
          <div className="mt-2.5 flex h-14 items-end gap-1.5">
            {[0.5, 0.8, 0.45, 1, 0.65, 0.9, 0.55].map((h, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-sm"
                style={{
                  height: `${h * 100}%`,
                  background: i % 3 === 0 ? "linear-gradient(180deg,#c8ff32,#c8ff3222)" : "linear-gradient(180deg,#3d8bff,#25e3ff33)",
                  animation: `bar-rise ${1.6 + i * 0.18}s ease-in-out ${i * 0.12}s infinite`,
                }}
              />
            ))}
          </div>
          <div className="mt-2.5 flex justify-between font-mono text-[8px] text-white/35">
            <span>VISITORS</span>
            <span className="text-lime">+248%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingCode({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <div className={`pointer-events-none absolute hidden xl:block ${className}`}>
      <div className="animate-float" style={{ animationDelay: `${delay}s` }}>
        <div className="glass rounded-xl px-4 py-3 font-mono text-[10px] leading-relaxed" style={{ transform: "rotate(-3deg)" }}>
          <div><span className="text-magenta">const</span> <span className="text-ice">vision</span> <span className="text-white/40">=</span> <span className="text-cyan">"</span><span className="text-lime">reality</span><span className="text-cyan">"</span></div>
          <div><span className="text-magenta">build</span><span className="text-white/40">(</span><span className="text-ice">vision</span><span className="text-white/40">)</span></div>
        </div>
      </div>
    </div>
  );
}

/* rotating word after FEEL */
const WORDS = ["ALIVE.", "FAST.", "PREMIUM.", "UNFORGETTABLE."];
function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className={`inline-block ${i === 0 ? "text-gradient-energy" : i === 3 ? "text-gradient-magenta" : "text-gradient-azure"}`}
          initial={{ y: "60%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ active }: { active: boolean }) {
  const show = (delay: number) => ({
    initial: { opacity: 0, y: 40, filter: "blur(10px)" },
    animate: active ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
    transition: { duration: 1, delay, ease },
  });

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <HeroScene />

      {/* rotating aurora behind core */}
      <div
        className="animate-aurora pointer-events-none absolute left-1/2 top-1/2 h-[78vmin] w-[78vmin] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(37,227,255,.13), rgba(61,139,255,.11) 25%, rgba(139,92,255,.13) 50%, rgba(200,255,50,.09) 75%, rgba(37,227,255,.13))",
        }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />

      {/* readability scrim on small screens */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,10,24,.82)_0%,transparent_68%)] md:hidden" />

      <FloatingBrowser className="left-[5%] top-[22%]" depth={1} />
      <FloatingDashboard className="right-[5%] top-[26%]" />
      <FloatingCode className="left-[10%] bottom-[20%]" />
      <FloatingCode className="right-[11%] bottom-[26%]" delay={-3} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-24 text-center">
        <motion.div {...show(0.1)}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(160,190,255,0.16)] bg-white/[0.04] px-5 py-2 font-mono text-[10px] tracking-[0.35em] text-soft backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-lime" />
            DYNAMIC DEVELOPMENTS · DIGITAL STUDIO
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
            <span className="hidden text-teal sm:inline">SINCE 2025</span>
          </span>
        </motion.div>

        <h1 className="mt-8 font-display font-bold leading-[1.02] tracking-tight">
          <motion.span {...show(0.22)} className="block text-[clamp(2.4rem,7vw,5.4rem)] text-ice">
            WE BUILD
          </motion.span>
          <motion.span {...show(0.34)} className="text-gradient gradient-animate block text-[clamp(2.4rem,7vw,5.4rem)]">
            DIGITAL EXPERIENCES
          </motion.span>
          <motion.span {...show(0.46)} className="block text-[clamp(2.4rem,7vw,5.4rem)] text-ice">
            THAT FEEL <RotatingWord />
          </motion.span>
        </h1>

        <motion.p {...show(0.58)} className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-soft md:text-base">
          Dynamic Developments creates powerful, modern and high-converting websites for
          businesses, startups, creators and brands — starting from{" "}
          <span className="font-semibold text-lime">₹10,000</span>.
        </motion.p>

        <motion.div {...show(0.7)} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic strength={0.5}>
            <button className="btn-primary" onClick={() => scrollToId("#contact")} data-cursor="lime">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </button>
          </Magnetic>
          <Magnetic strength={0.35}>
            <button className="btn-azure" onClick={() => scrollToId("#work")}>
              Explore Our Work
            </button>
          </Magnetic>
          <button className="btn-ghost text-sm" onClick={() => scrollToId("#contact")}>
            <Play className="h-3.5 w-3.5" /> Get Free Consultation
          </button>
        </motion.div>

        <motion.div {...show(0.82)} className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-lime/60" />
            <span className="font-mono text-[10px] tracking-[0.35em] text-white/50">
              WEBSITES STARTING FROM <span className="font-semibold text-lime">₹10,000</span>
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-lime/60" />
          </div>
          {/* engineering chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 opacity-70">
            {["React", "Next.js", "Three.js", "TypeScript", "Framer Motion", "Tailwind"].map((t) => (
              <span key={t} className="chip px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-white/45">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.4em] text-white/35">SCROLL</span>
          <div className="h-10 w-px overflow-hidden bg-white/10">
            <motion.div
              className="h-4 w-px bg-cyan"
              animate={{ y: [-16, 40] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
