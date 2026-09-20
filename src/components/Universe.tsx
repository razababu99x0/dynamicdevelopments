import { motion } from "framer-motion";
import {
  Crown, Zap, Smartphone, Code2, Cpu, Target, Network, LifeBuoy, Bot, ArrowUpRight,
} from "lucide-react";
import { SectionHead, Reveal, CountUp } from "./Effects";
import Logo from "./Logo";
import { useAmbientSection } from "../lib/core";

/* ================================================================== */
/*  WHY DYNAMIC DEVELOPMENTS                                            */
/* ================================================================== */
const REASONS = [
  { icon: Crown, title: "PREMIUM DESIGN", desc: "Every pixel intentional — interfaces built to impress." },
  { icon: Zap, title: "PERFORMANCE", desc: "Fast-loading sites that respect your visitors' time." },
  { icon: Smartphone, title: "MOBILE FIRST", desc: "Flawless experiences on every screen size." },
  { icon: Code2, title: "CUSTOM DEVELOPMENT", desc: "No bloated templates — built for your exact goals." },
  { icon: Cpu, title: "MODERN TECHNOLOGY", desc: "The latest frameworks, tools and practices." },
  { icon: Target, title: "CONVERSION FOCUS", desc: "Designed to turn visitors into customers." },
  { icon: Network, title: "SCALABLE ARCHITECTURE", desc: "Structure that grows with your business." },
  { icon: LifeBuoy, title: "CONTINUED SUPPORT", desc: "We stay available long after launch." },
];

function WhyUs() {
  return (
    <section id="why" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHead
        kicker="WHY US / 06"
        title={<>Why Businesses Choose <br className="hidden md:block" /><span className="text-gradient">Dynamic Developments.</span></>}
      />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.05}>
            <div className="spot group glass h-full rounded-2xl p-6 transition-all duration-500 hover:border-cyan/25 hover:bg-cyan/[0.02]">
              <r.icon className="h-5 w-5 text-white/35 transition-colors duration-500 group-hover:text-cyan" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-[13px] font-bold tracking-[0.12em] text-ice">{r.title}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-soft">{r.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STATS — truthful only                                               */
/* ================================================================== */
const STATS = [
  { value: "100", label: "Responsive Design", suffix: "%" },
  { value: "", label: "Technology", prefix: "Modern" },
  { value: "", label: "Focused", prefix: "Performance" },
  { value: "", label: "Solutions", prefix: "Custom" },
  { value: "24/7", label: "Inquiry Availability", suffix: "" },
];

function Stats() {
  return (
    <section id="stats" className="relative z-10 border-y border-white/[0.06] bg-white/[0.012]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 md:grid-cols-5">
        {STATS.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center py-10 text-center">
            <motion.span
              className="font-display text-2xl font-bold text-gradient md:text-3xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              {s.prefix}
              {s.value && (s.suffix ? <CountUp value={Number(s.value)} suffix={s.suffix} /> : s.value)}
            </motion.span>
            <span className="mt-2 font-mono text-[9px] tracking-[0.25em] text-white/40">{s.label.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  TECHNOLOGY UNIVERSE — orbital visualization                         */
/* ================================================================== */
const RING_1 = ["React", "Next.js", "TypeScript", "Three.js", "Tailwind", "Node.js", "GSAP", "Framer Motion"];
const RING_2 = ["Supabase", "Firebase", "PostgreSQL", "Vercel", "GitHub", "APIs"];

function OrbitLabel({ label, angle, radius, duration, reverse = false }: {
  label: string; angle: number; radius: number; duration: string; reverse?: boolean;
}) {
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: `rotate(${angle}deg) translateY(-${radius}px)` }}>
      <div style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)` }}>
        <div style={{ animation: `${reverse ? "spin-slow" : "orbit-ccw"} ${duration} linear infinite` }}>
          <span className="glass whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-wider text-soft shadow-[0_0_20px_rgba(0,0,0,.4)]">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

function TechOrbit() {
  useAmbientSection("tech");
  return (
    <section id="tech" className="relative z-10 mx-auto max-w-6xl overflow-hidden px-6 py-28 md:py-36">
      <SectionHead
        kicker="TECHNOLOGY / 07"
        title={<>Powered By <span className="text-gradient">Modern Technology.</span></>}
        sub="An ecosystem of production-grade tools, orchestrated around your project."
      />

      <div className="tech-orbit-stage mt-10">
        <div className="tech-orbit-canvas relative h-[620px] w-[620px]">
          {/* ambient depth */}
          <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,255,.09), transparent 62%)" }} />

          {/* orbital lines */}
          <svg viewBox="0 0 620 620" className="absolute inset-0 h-full w-full">
            <circle cx="310" cy="310" r="195" fill="none" stroke="rgba(37,227,255,.18)" strokeWidth="1" strokeDasharray="2 6" />
            <circle cx="310" cy="310" r="270" fill="none" stroke="rgba(139,92,255,.15)" strokeWidth="1" strokeDasharray="2 8" />
          </svg>

          {/* lime particles */}
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-lime/60"
              style={{
                left: `${50 + 46 * Math.cos((i / 14) * Math.PI * 2)}%`,
                top: `${50 + 46 * Math.sin((i / 14) * Math.PI * 2)}%`,
                animation: `pulse-core ${3 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}

          {/* center core */}
          <div className="absolute left-1/2 top-1/2 z-10 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full"
            style={{ background: "radial-gradient(circle at 32% 28%, rgba(37,227,255,.16), rgba(8,14,36,.92) 62%)", border: "1px solid rgba(160,190,255,.16)", boxShadow: "0 0 70px rgba(37,227,255,.18), inset 0 0 34px rgba(139,92,255,.1)" }}
          >
            <Logo size={56} glow />
            <span className="mt-1 font-display text-[11px] font-bold tracking-[0.12em] text-ice">DYNAMIC</span>
            <span className="font-display text-[11px] font-bold tracking-[0.1em] text-gradient-azure">DEVELOPMENTS</span>
            <span className="mt-1.5 font-mono text-[7px] tracking-[0.3em] text-teal">DIGITAL CORE</span>
          </div>

          {/* rings of labels */}
          <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "36s" }}>
            {RING_1.map((t, i) => (
              <OrbitLabel key={t} label={t} angle={(360 / RING_1.length) * i} radius={195} duration="36s" />
            ))}
          </div>
          <div className="absolute inset-0" style={{ animation: "orbit-ccw 52s linear infinite" }}>
            {RING_2.map((t, i) => (
              <OrbitLabel key={t} label={t} angle={(360 / RING_2.length) * i + 30} radius={270} duration="52s" reverse />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  ABOUT                                                               */
/* ================================================================== */
function About() {
  useAmbientSection("tech");
  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[10px] tracking-[0.35em] text-cyan">
              <span className="h-1 w-1 rounded-full bg-lime shadow-[0_0_8px_#c8ff32]" />
              ABOUT / 08
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.06] text-ice">
              We Don't Just <br />
              <span className="text-gradient">Develop Websites.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 text-[15px] leading-relaxed text-soft">
              At Dynamic Developments, we combine design, technology and strategy to create
              websites that help businesses build credibility, attract customers and grow online.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              Every project begins with understanding the client's goals. From a simple business
              website to an advanced web platform, our focus is creating digital experiences that
              look premium, perform smoothly and remain scalable for the future.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-lime to-transparent" />
              <span className="font-mono text-[11px] tracking-[0.25em] text-lime">FROM IDEA TO INTERACTIVE REALITY.</span>
            </div>
          </Reveal>
        </div>

        {/* decorative core panel */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 animate-spin-slower rounded-full border border-dashed border-cyan/20" />
            <div className="absolute inset-8 animate-spin-slow rounded-full border border-ultra/20" style={{ animationDirection: "reverse" }} />
            <div className="absolute inset-16 rounded-full border border-lime/15" />
            {/* orbiting node */}
            <div className="absolute inset-8 animate-spin-slow" style={{ animationDirection: "reverse" }}>
              <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_16px_#c8ff32]" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Logo size={64} glow />
              <span className="mt-3 font-mono text-[9px] tracking-[0.35em] text-teal">EST. 2025</span>
              <span className="mt-3 font-display text-3xl font-bold text-gradient gradient-animate">IDEA</span>
              <span className="my-1 font-mono text-[10px] text-cyan">↓</span>
              <span className="font-display text-3xl font-bold text-gradient gradient-animate">CODE</span>
              <span className="my-1 font-mono text-[10px] text-cyan">↓</span>
              <span className="font-display text-2xl font-bold text-gradient gradient-animate">EXPERIENCE</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const EXPERTISE = [
  { icon: Code2, title: "Web Development", detail: "Responsive websites and custom web applications built around your business.", tags: ["React", "TypeScript", "Full-stack"] },
  { icon: Cpu, title: "Interactive 3D", detail: "Immersive product experiences with thoughtful motion and real-time visuals.", tags: ["Three.js", "WebGL", "Motion"] },
];

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] text-cyan">SKILLS &amp; EXPERTISE</p>
          <h2 id="skills-title" className="mt-4 font-display text-4xl font-bold leading-tight text-ice md:text-5xl">Built with skill.<br /><span className="text-gradient">Powered by intelligence.</span></h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-soft">Design, engineering and AI — connected to create useful digital experiences.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="expertise-feature grad-border relative overflow-hidden rounded-3xl p-7 md:row-span-2 md:p-10">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-cyan/10 blur-3xl" />
          <div className="relative flex items-center justify-between gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan"><Bot size={28} aria-hidden="true" /></span>
            <span className="rounded-full border border-lime/25 bg-lime/10 px-3 py-1.5 font-mono text-[10px] tracking-widest text-lime">INTELLIGENT SOLUTIONS</span>
          </div>
          <h3 className="relative mt-9 font-display text-4xl font-bold text-ice">AI Expert</h3>
          <p className="relative mt-4 max-w-md text-base leading-7 text-soft">AI-powered websites, conversational assistants and automation workflows that make everyday work simpler.</p>
          <ul aria-label="AI skills" className="relative mt-7 flex flex-wrap gap-2">
            {["AI integration", "AI agents", "Prompt engineering", "Workflow automation"].map(skill => <li key={skill} className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-ice">{skill}</li>)}
          </ul>
          <a href="#contact" className="relative mt-9 inline-flex min-h-11 items-center gap-2 font-semibold text-cyan">Discuss an AI project <ArrowUpRight size={18} aria-hidden="true" /></a>
        </article>
        {EXPERTISE.map(({ icon: Icon, title, detail, tags }) => (
          <article key={title} className="expertise-card glass rounded-3xl p-7">
            <div className="flex items-center gap-3"><Icon size={22} className="text-cyan" aria-hidden="true" /><h3 className="font-display text-xl font-semibold text-ice">{title}</h3></div>
            <p className="mt-3 text-sm leading-7 text-soft">{detail}</p>
            <p className="mt-5 font-mono text-xs text-teal">{tags.join(" / ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function UniverseSection() {
  return (
    <>
      <WhyUs />
      <Stats />
      <Skills />
      <TechOrbit />
      <About />
    </>
  );
}
