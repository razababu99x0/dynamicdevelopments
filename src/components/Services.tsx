import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, ShoppingBag, Layers, Code2, Sparkles, Boxes, BrainCircuit,
  GraduationCap, Rocket, UserRound, UtensilsCrossed, Building2, HeartPulse,
  AppWindow, RefreshCw, Wrench,
} from "lucide-react";
import { SectionHead, Reveal, Tilt } from "./Effects";
import { useAmbientSection } from "../lib/core";
import Logo from "./Logo";

/* ================================================================== */
/*  Miniature interface previews                                       */
/* ================================================================== */
const previewCls =
  "pointer-events-none absolute right-4 top-4 hidden translate-y-3 scale-90 rotate-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 md:block";

function BrowserPreview() {
  return (
    <div className={`${previewCls} w-40`}>
      <div className="glass rounded-xl p-2 shadow-2xl">
        <div className="mb-1.5 flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        </div>
        <div className="space-y-1 rounded-md bg-[#0a1228] p-2">
          <div className="h-1.5 w-3/5 rounded-full bg-cyan/60" />
          <div className="h-1 w-2/5 rounded-full bg-white/15" />
          <div className="flex gap-1 pt-1">
            <div className="h-3.5 w-10 rounded-full bg-cyan/80" />
            <div className="h-3.5 w-10 rounded-full border border-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StorePreview() {
  return (
    <div className={`${previewCls} w-44`}>
      <div className="glass rounded-xl p-2.5 shadow-2xl">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-1.5 w-10 rounded-full bg-lime/70" />
          <ShoppingBag className="h-3 w-3 text-lime" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-1 rounded-md bg-[#0a1228] p-1.5">
              <div
                className="h-6 rounded-sm"
                style={{ background: i % 2 ? "linear-gradient(135deg,#c8ff3233,#25e3ff22)" : "linear-gradient(135deg,#25e3ff33,#8b5cff22)" }}
              />
              <div className="h-1 w-3/4 rounded-full bg-white/20" />
              <div className="h-1 w-1/2 rounded-full bg-lime/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioPreview() {
  return (
    <div className={`${previewCls} w-40`}>
      <div className="glass rounded-xl p-2 shadow-2xl">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="col-span-2 h-10 rounded-md" style={{ background: "linear-gradient(120deg,#3d8bff44,#25e3ff22)" }} />
          <div className="h-8 rounded-md bg-white/10" />
          <div className="h-8 rounded-md bg-eblue/25" />
        </div>
        <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-eblue/60" />
      </div>
    </div>
  );
}

function SaasPreview() {
  return (
    <div className={`${previewCls} w-44`}>
      <div className="glass rounded-xl p-2.5 shadow-2xl">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-[7px] tracking-[0.2em] text-white/40">DASHBOARD</span>
          <span className="h-1 w-1 rounded-full bg-eblue" />
        </div>
        <div className="flex h-12 items-end gap-1">
          {[0.4, 0.7, 0.5, 0.95, 0.6, 0.85].map((h, i) => (
            <div
              key={i}
              className="flex-1 origin-bottom rounded-sm"
              style={{
                height: `${h * 100}%`,
                background: "linear-gradient(180deg,#3d8bff,#3d8bff22)",
                animation: `bar-rise ${1.4 + i * 0.15}s ease-in-out ${i * 0.1}s infinite`,
              }}
            />
          ))}
        </div>
        <div className="mt-1.5 h-1 w-1/2 rounded-full bg-eblue/60" />
      </div>
    </div>
  );
}

function CubePreview() {
  const face = "absolute inset-0 rounded-sm border border-ultra/50 bg-ultra/10 backdrop-blur-sm";
  return (
    <div className={`${previewCls} flex w-24 items-center justify-center`} style={{ perspective: "240px" }}>
      <div className="animate-cube relative h-14 w-14" style={{ transformStyle: "preserve-3d" }}>
        <div className={face} style={{ transform: "translateZ(28px)", background: "linear-gradient(135deg,#8b5cff44,#25e3ff22)" }} />
        <div className={face} style={{ transform: "rotateY(180deg) translateZ(28px)", background: "linear-gradient(135deg,#ff3cac33,#8b5cff22)" }} />
        <div className={face} style={{ transform: "rotateY(90deg) translateZ(28px)" }} />
        <div className={face} style={{ transform: "rotateY(-90deg) translateZ(28px)" }} />
        <div className={face} style={{ transform: "rotateX(90deg) translateZ(28px)", background: "linear-gradient(135deg,#c8ff3222,#25e3ff22)" }} />
        <div className={face} style={{ transform: "rotateX(-90deg) translateZ(28px)" }} />
      </div>
    </div>
  );
}

function AIPreview() {
  return (
    <div className={`${previewCls} w-36`}>
      <div className="glass rounded-xl p-2 shadow-2xl">
        <svg viewBox="0 0 120 70" className="w-full">
          <defs>
            <linearGradient id="ai-g" x1="0" x2="1">
              <stop offset="0" stopColor="#25e3ff" />
              <stop offset="1" stopColor="#8b5cff" />
            </linearGradient>
          </defs>
          {[
            [60, 35, 20, 14], [60, 35, 100, 14], [60, 35, 20, 56], [60, 35, 100, 56],
            [60, 35, 60, 8], [60, 35, 60, 62], [20, 14, 20, 56], [100, 14, 100, 56],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#ai-g)" strokeWidth="0.8" opacity="0.5"
              strokeDasharray="3 3" className="animate-dash" />
          ))}
          {[[60, 35, "#c8ff32", 5], [20, 14, "#25e3ff", 3.5], [100, 14, "#8b5cff", 3.5], [20, 56, "#3d8bff", 3], [100, 56, "#25e3ff", 3], [60, 8, "#8b5cff", 2.6], [60, 62, "#c8ff32", 2.6]].map(([cx, cy, c, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={c as string} opacity="0.9">
              <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Featured services                                                   */
/* ================================================================== */
const FEATURED = [
  { icon: Layers, title: "Business Websites", color: "#25e3ff", rgb: "37,227,255", desc: "Credibility-driven websites that turn visitors into customers.", preview: <BrowserPreview /> },
  { icon: ShoppingBag, title: "E-Commerce Websites", color: "#c8ff32", rgb: "200,255,50", desc: "Stores engineered for speed, trust and conversion.", preview: <StorePreview /> },
  { icon: UserRound, title: "Portfolio Websites", color: "#3d8bff", rgb: "61,139,255", desc: "Personal brands presented like premium products.", preview: <PortfolioPreview /> },
  { icon: AppWindow, title: "SaaS Platforms", color: "#3d8bff", rgb: "61,139,255", desc: "Dashboards, onboarding flows and product experiences.", preview: <SaasPreview /> },
  { icon: Boxes, title: "3D Websites", color: "#8b5cff", rgb: "139,92,255", desc: "Interactive WebGL worlds people remember.", preview: <CubePreview /> },
  { icon: BrainCircuit, title: "AI-Powered Websites", color: "#25e3ff", rgb: "37,227,255", desc: "Intelligent experiences with smart automation.", preview: <AIPreview /> },
];

const MORE = [
  { icon: GraduationCap, label: "Educational Websites" },
  { icon: Rocket, label: "Landing Pages" },
  { icon: Sparkles, label: "Personal Branding Websites" },
  { icon: UtensilsCrossed, label: "Restaurant Websites" },
  { icon: Building2, label: "Real Estate Websites" },
  { icon: HeartPulse, label: "Healthcare Websites" },
  { icon: Code2, label: "Custom Web Applications" },
  { icon: RefreshCw, label: "Website Redesign" },
  { icon: Wrench, label: "Website Maintenance" },
];

function Services() {
  useAmbientSection("services");
  return (
    <section id="services" className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHead
        kicker="SERVICES / 01"
        title={<>Everything You Need <br className="hidden md:block" /> To Build Your <span className="text-gradient">Digital Presence.</span></>}
        sub="Fifteen specialised services. One obsession — websites that feel alive and perform even better."
      />

      <div className="services-grid mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <Tilt amount={5} className="h-full">
              <div
                className="service-card spot group relative h-full overflow-hidden rounded-3xl border border-[rgba(160,190,255,0.09)] bg-white/[0.025] p-7 backdrop-blur-sm"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 18px 60px rgba(2,8,26,.5), 0 0 55px rgba(${s.rgb},0.14), inset 0 0 30px rgba(${s.rgb},0.04)`;
                  e.currentTarget.style.borderColor = `rgba(${s.rgb},0.38)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "";
                }}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, rgba(${s.rgb},0.17), transparent 70%)` }}
                />
                {s.preview}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: s.color }}>0{i + 1}</span>
                    <s.icon className="h-5 w-5" style={{ color: s.color }} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-ice">{s.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-soft">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-[11px] font-medium tracking-wide" style={{ color: s.color }}>
                    EXPLORE SERVICE
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.color})` }}
                />
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MORE.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.04}>
            <div className="spot group flex items-center gap-4 rounded-2xl border border-[rgba(160,190,255,0.08)] bg-white/[0.02] px-5 py-4 transition-all duration-400 hover:border-cyan/30 hover:bg-cyan/[0.04]">
              <m.icon className="h-4 w-4 text-white/40 transition-colors group-hover:text-cyan" strokeWidth={1.5} />
              <span className="flex-1 text-[13px] font-medium text-soft transition-colors group-hover:text-ice">{m.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-white/20 transition-all duration-300 group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Audience — Built For Every Ambition                                 */
/* ================================================================== */
const AUDIENCE = [
  "Startups", "Local Businesses", "Creators", "Schools", "Institutes", "Restaurants",
  "Healthcare", "Real Estate", "E-Commerce Brands", "Fashion Brands", "Agencies",
  "Professionals", "Growing Companies",
];

function Audience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [activePill, setActivePill] = useState<string | null>(null);

  const drawLine = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pill = e.currentTarget.getBoundingClientRect();
    const center = centerRef.current?.getBoundingClientRect();
    const box = containerRef.current?.getBoundingClientRect();
    if (!center || !box) return;
    setLine({
      x1: pill.left + pill.width / 2 - box.left,
      y1: pill.top + pill.height / 2 - box.top,
      x2: center.left + center.width / 2 - box.left,
      y2: center.top + center.height / 2 - box.top,
    });
    setActivePill(e.currentTarget.textContent);
  };

  return (
    <section id="audience" className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-32">
      <SectionHead
        kicker="WHO WE BUILD FOR"
        title={<>Built For <span className="text-gradient">Every Ambition.</span></>}
        sub="From a first idea to a growing company — if you need a digital presence, we build for you."
      />

      <div ref={containerRef} className="relative mt-16 flex flex-col items-center" onMouseLeave={() => { setLine(null); setActivePill(null); }}>
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible">
          <AnimatePresence>
            {line && (
              <>
                <motion.line
                  x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                  stroke="url(#aud-g)" strokeWidth="1.4" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
                <motion.circle
                  r="3.5" fill="#c8ff32"
                  animate={{ cx: [line.x1, line.x2], cy: [line.y1, line.y2] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                />
              </>
            )}
          </AnimatePresence>
          <defs>
            <linearGradient id="aud-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#c8ff32" />
              <stop offset="1" stopColor="#25e3ff" />
            </linearGradient>
          </defs>
        </svg>

        {/* central node — the brand mark */}
        <div ref={centerRef} className="relative z-10">
          <div className="absolute inset-0 -m-5 rounded-full border border-cyan/20 animate-ping-ring" />
          <div className="absolute inset-0 -m-5 rounded-full border border-cyan/20 animate-pulse-core" />
          <div className="absolute inset-0 -m-11 rounded-full border border-eblue/10" />
          <div className="glass-strong animate-glow-breathe flex h-44 w-44 flex-col items-center justify-center rounded-full text-center md:h-52 md:w-52">
            <Logo size={58} glow />
            <span className="mt-2 font-display text-[11px] font-bold tracking-[0.14em] text-gradient-azure">DEVELOPMENTS</span>
            <span className="mt-1 font-mono text-[7.5px] tracking-[0.3em] text-white/40">EVERY AMBITION · EST. 2025</span>
          </div>
        </div>

        <div className="relative z-10 mt-14 flex max-w-3xl flex-wrap justify-center gap-3">
          {AUDIENCE.map((a, i) => (
            <motion.button
              key={a}
              className={`chip px-5 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                activePill === a ? "border-lime/60 bg-lime/[0.08] text-ice shadow-[0_0_26px_rgba(200,255,50,0.16)]" : "text-soft"
              }`}
              onMouseEnter={drawLine}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.045, type: "spring", stiffness: 260, damping: 20 }}
            >
              {a}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesSection() {
  return (
    <>
      <Services />
      <Audience />
    </>
  );
}
