import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/* deterministic pseudo-random */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

/* ---------------------------------------------------------------- */
type Token = { t: string; c: string };
const K = "#ff3cac";   // keywords
const S = "#c8ff32";   // strings
const F = "#25e3ff";   // functions
const P = "#9fb2d6";   // plain
const M = "#5a6478";   // muted / punctuation
const C = "#4a5568";   // comments

const CODE: Token[][] = [
  [{ t: "const", c: K }, { t: " client ", c: P }, { t: "= ", c: M }, { t: "{ vision: ", c: M }, { t: '"something powerful"', c: S }, { t: " };", c: M }],
  [{ t: "", c: P }],
  [{ t: "function", c: K }, { t: " build", c: F }, { t: "(idea) {", c: M }],
  [{ t: "  const", c: K }, { t: " design ", c: P }, { t: "= ", c: M }, { t: "craft", c: F }, { t: "(idea);", c: M }],
  [{ t: "  const", c: K }, { t: " code ", c: P }, { t: "= ", c: M }, { t: "engineer", c: F }, { t: "(design);", c: M }],
  [{ t: "  return", c: K }, { t: " new", c: K }, { t: " Experience", c: F }, { t: "(code);", c: M }],
  [{ t: "}", c: M }],
  [{ t: "", c: P }],
  [{ t: "// IDEA → CODE → EXPERIENCE", c: C }],
  [{ t: "launch", c: F }, { t: "(", c: M }, { t: "build", c: F }, { t: "(client.vision));", c: M }],
];

function Char({ ch, i, progress }: { ch: string; i: number; progress: MotionValue<number> }) {
  const dx = (rand(i) - 0.5) * 420;
  const dy = (rand(i + 97) - 0.5) * 340;
  const rot = (rand(i + 53) - 0.5) * 160;
  const x = useTransform(progress, [0.24, 0.55], [0, dx]);
  const y = useTransform(progress, [0.24, 0.55], [0, dy]);
  const rotate = useTransform(progress, [0.24, 0.55], [0, rot]);
  const opacity = useTransform(progress, [0.3, 0.5], [1, 0]);
  return (
    <motion.span style={{ x, y, rotate, opacity, display: "inline-block", whiteSpace: "pre" }}>
      {ch}
    </motion.span>
  );
}

export default function CodeExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  /* code window */
  const codeScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.06]);
  const codeFade = useTransform(scrollYProgress, [0.5, 0.62], [1, 0]);
  /* assembled interface */
  const uiOpacity = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);
  const uiScale = useTransform(scrollYProgress, [0.5, 0.64], [0.7, 1]);
  const uiY = useTransform(scrollYProgress, [0.86, 0.96], [0, -110]);
  const uiShrink = useTransform(scrollYProgress, [0.86, 0.96], [1, 0.78]);
  /* inner elements stagger */
  const nav = useTransform(scrollYProgress, [0.56, 0.66], [0, 1]);
  const heroA = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const heroB = useTransform(scrollYProgress, [0.64, 0.74], [0, 1]);
  const btn = useTransform(scrollYProgress, [0.68, 0.78], [0, 1]);
  const cards = [0, 1, 2].map((i) =>
    useTransform(scrollYProgress, [0.72 + i * 0.04, 0.82 + i * 0.04], [0, 1])
  );
  /* final text */
  const finalOpacity = useTransform(scrollYProgress, [0.88, 0.97], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.88, 0.97], [50, 0]);

  let charIndex = 0;

  return (
    <section id="code" ref={ref} className="relative z-10 h-[380vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <span className="absolute top-24 font-mono text-[10px] tracking-[0.4em] text-white/35">
          CODE → EXPERIENCE
        </span>

        {/* ---------- raw code ---------- */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale: codeScale, opacity: codeFade }}
        >
          <div className="glass w-[min(640px,92vw)] rounded-2xl p-1.5 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
            <div className="flex items-center gap-1.5 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
              <span className="ml-3 font-mono text-[9px] tracking-widest text-white/30">experience.js</span>
            </div>
            <div className="rounded-xl bg-[#0a1024]/95 px-5 py-4 font-mono text-[clamp(10px,1.5vw,13.5px)] leading-[1.9]">
              {CODE.map((line, li) => (
                <div key={li} className="flex">
                  <span className="w-7 select-none text-right text-white/15">{li + 1}</span>
                  <span className="code-line pl-4">
                    {line.map((tok, ti) =>
                      tok.t.split("").map((ch, ci) => {
                        const idx = charIndex++;
                        return <Char key={`${ti}-${ci}`} ch={ch} i={idx} progress={scrollYProgress} />;
                      })
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---------- assembled interface ---------- */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: uiOpacity, scale: uiScale, y: uiY }}
        >
          <motion.div style={{ scale: uiShrink }} className="w-[min(640px,92vw)]">
            <div className="overflow-hidden rounded-2xl border border-[rgba(160,190,255,0.12)] bg-[#0a1024] shadow-[0_30px_90px_rgba(2,8,26,.65),0_0_70px_rgba(37,227,255,.09)]">
              {/* navbar */}
              <motion.div
                className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5"
                style={{ opacity: nav, y: useTransform(nav, [0, 1], [-8, 0]) }}
              >
                <div className="h-2 w-16 rounded-full bg-gradient-to-r from-lime to-cyan" />
                <div className="flex gap-2.5">
                  <div className="h-1.5 w-8 rounded-full bg-white/15" />
                  <div className="h-1.5 w-8 rounded-full bg-white/15" />
                  <div className="h-1.5 w-10 rounded-full bg-white/15" />
                </div>
                <div className="h-3 w-12 rounded-full bg-lime/80" />
              </motion.div>
              {/* hero */}
              <div className="px-8 py-9 text-center">
                <motion.div
                  className="mx-auto h-3.5 w-3/5 rounded-full bg-gradient-to-r from-lime via-cyan to-ultra"
                  style={{ opacity: heroA, scaleY: useTransform(heroA, [0, 1], [0.4, 1]) }}
                />
                <motion.div
                  className="mx-auto mt-2.5 h-3 w-2/5 rounded-full bg-white/25"
                  style={{ opacity: heroB, scaleY: useTransform(heroB, [0, 1], [0.4, 1]) }}
                />
                <motion.div
                  className="mx-auto mt-5 h-5 w-24 rounded-full bg-lime shadow-[0_0_24px_rgba(200,255,50,.35)]"
                  style={{ opacity: btn, scale: useTransform(btn, [0, 1], [0.6, 1]) }}
                />
                {/* cards */}
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {cards.map((c, i) => (
                    <motion.div
                      key={i}
                      className="space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5"
                      style={{ opacity: c, y: useTransform(c, [0, 1], [22, 0]) }}
                    >
                      <div className="h-2 w-2/3 rounded-full" style={{ background: ["#c8ff32aa", "#25e3ffaa", "#8b5cffaa"][i] }} />
                      <div className="h-1.5 w-full rounded-full bg-white/10" />
                      <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- final statement ---------- */}
        <motion.div
          className="absolute bottom-[13%] px-6 text-center"
          style={{ opacity: finalOpacity, y: finalY }}
        >
          <h3 className="font-display text-[clamp(1.5rem,4vw,3rem)] font-bold leading-tight tracking-tight text-ice">
            BEHIND EVERY <span className="text-gradient">BEAUTIFUL INTERFACE</span>
          </h3>
          <h3 className="font-display text-[clamp(1.5rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            IS <span className="text-gradient-energy">POWERFUL ENGINEERING.</span>
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
