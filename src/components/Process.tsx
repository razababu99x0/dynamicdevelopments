import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Search, Compass, PenTool, Code2, FlaskConical, Rocket, LifeBuoy,
  Lightbulb, Map, TestTube2, TrendingUp,
} from "lucide-react";
import { SectionHead } from "./Effects";
import { useAmbientSection } from "../lib/core";

/* ================================================================== */
/*  PROCESS — glowing digital path                                      */
/* ================================================================== */
const STEPS = [
  { icon: Search, title: "Discovery", desc: "We dig into your goals, audience and competitors to define what success looks like." },
  { icon: Compass, title: "Strategy", desc: "Structure, content plan and technology choices — the blueprint of your experience." },
  { icon: PenTool, title: "UI/UX Design", desc: "Premium interfaces designed around your brand, conversion and clarity." },
  { icon: Code2, title: "Development", desc: "Clean, modern code with animation, performance and responsiveness built in." },
  { icon: FlaskConical, title: "Testing", desc: "Devices, browsers, speed and forms — everything verified before launch." },
  { icon: Rocket, title: "Launch", desc: "Deployment, domains, analytics and a smooth go-live with zero downtime." },
  { icon: LifeBuoy, title: "Support", desc: "Updates, improvements and a team that stays available after launch." },
];

function Process() {
  useAmbientSection("process");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const height = useTransform(progress, (v) => `${v * 100}%`);
  const headOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  return (
    <section id="process" className="relative z-10 mx-auto max-w-5xl px-6 py-28 md:py-36">
      <SectionHead
        kicker="PROCESS / 03"
        title={<>How We Turn Ideas <br className="hidden md:block" /> Into <span className="text-gradient">Experiences.</span></>}
        sub="Seven stages. One glowing path from first conversation to a living website."
      />

      <div ref={ref} className="relative mt-20">
        {/* base line */}
        <div className="absolute left-[19px] top-0 h-full w-px bg-white/[0.07] md:left-1/2" />
        {/* energy line */}
        <motion.div
          className="absolute left-[19px] top-0 w-[2px] md:left-1/2 md:-translate-x-1/2"
          style={{
            height,
            background: "linear-gradient(180deg, #25e3ff, #c8ff32 50%, #8b5cff)",
            boxShadow: "0 0 16px rgba(37,227,255,.5)",
          }}
        />
        {/* traveling head */}
        <motion.div
          className="absolute left-[19px] z-10 h-3 w-3 -translate-x-[5.5px] -translate-y-1/2 rounded-full bg-ice md:left-1/2 md:-translate-x-1/2"
          style={{ top: height, opacity: headOpacity, boxShadow: "0 0 22px 4px rgba(200,255,50,.7)" }}
        />

        <div className="space-y-12 md:space-y-16">
          {STEPS.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <div key={s.title} className="relative flex md:items-center">
                {/* node */}
                <div className="absolute left-[19px] top-1 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#080e24]"
                    whileInView={{ borderColor: "rgba(37,227,255,.65)", boxShadow: "0 0 26px rgba(37,227,255,.35)" }}
                    viewport={{ once: true, margin: "-60% 0px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <s.icon className="h-4 w-4 text-cyan" strokeWidth={1.5} />
                  </motion.div>
                </div>
                {/* card */}
                <motion.div
                  className={`ml-14 w-full md:ml-0 md:w-[calc(50%-3rem)] ${left ? "md:mr-auto" : "md:ml-auto"}`}
                  initial={{ opacity: 0, y: 30, x: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60% 0px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="group glass rounded-2xl p-6 transition-all duration-500 hover:border-lime/25 hover:shadow-[0_0_40px_rgba(200,255,50,.07)]">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-cyan">0{i + 1}</span>
                    <h3 className="mt-2 font-display text-xl font-bold text-ice">{s.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-soft">{s.desc}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CLIENT JOURNEY — interactive energy path                            */
/* ================================================================== */
const JOURNEY = [
  { icon: Lightbulb, label: "YOU HAVE AN IDEA", color: "#c8ff32" },
  { icon: Map, label: "WE PLAN", color: "#25e3ff" },
  { icon: PenTool, label: "WE DESIGN", color: "#3d8bff" },
  { icon: Code2, label: "WE DEVELOP", color: "#8b5cff" },
  { icon: TestTube2, label: "WE TEST", color: "#25e3ff" },
  { icon: Rocket, label: "WE LAUNCH", color: "#c8ff32" },
  { icon: TrendingUp, label: "YOU GROW", color: "#ff3cac" },
];

function ClientJourney() {
  useAmbientSection("process");
  return (
    <section id="journey" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHead
        kicker="CLIENT JOURNEY"
        title={<>Your Path To <span className="text-gradient">Digital Growth.</span></>}
      />

      <div className="mt-16 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {JOURNEY.map((j, i) => (
          <div key={j.label} className="flex flex-1 flex-col items-center md:flex-row">
            <motion.div
              className="group relative flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30% 0px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 220, damping: 18 }}
            >
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-1"
                style={{ ["--c" as string]: j.color }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = j.color + "66";
                  e.currentTarget.style.boxShadow = `0 0 34px ${j.color}2a`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <j.icon className="h-5 w-5 transition-colors duration-500" style={{ color: j.color }} strokeWidth={1.5} />
                <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" style={{ background: j.color }} />
              </div>
              <span className="max-w-[110px] text-center font-mono text-[9px] tracking-[0.22em] text-soft transition-colors duration-300 group-hover:text-ice">
                {j.label}
              </span>
            </motion.div>
            {i < JOURNEY.length - 1 && (
              <motion.div
                className="my-3 h-8 w-px md:my-0 md:h-px md:flex-1"
                style={{ background: "linear-gradient(90deg, rgba(255,255,255,.04), rgba(255,255,255,.14))" }}
                initial={{ scaleX: 0, scaleY: 0 }}
                whileInView={{ scaleX: 1, scaleY: 1 }}
                viewport={{ once: true, margin: "-30% 0px" }}
                transition={{ delay: i * 0.1 + 0.25, duration: 0.6 }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ProcessSection() {
  return (
    <>
      <Process />
      <ClientJourney />
    </>
  );
}
