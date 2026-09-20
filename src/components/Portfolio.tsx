import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MoveHorizontal, Tag, X, ArrowRight } from "lucide-react";
import { SectionHead, Reveal } from "./Effects";
import { useAmbientSection, scrollToId, stopScroll, startScroll } from "../lib/core";

/* ================================================================== */
/*  Browser frame + mock website variants                               */
/* ================================================================== */
function BrowserFrame({ url, children, tint = "#0a1228" }: { url: string; children: React.ReactNode; tint?: string }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-[rgba(160,190,255,0.12)] shadow-[0_24px_70px_rgba(2,8,26,.6)]" style={{ background: tint }}>
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
        <div className="ml-3 flex h-4 flex-1 items-center rounded-full bg-white/[0.05] px-2.5 font-mono text-[7px] tracking-wider text-white/35">
          {url}
        </div>
      </div>
      <div className="h-[calc(100%-29px)] w-full">{children}</div>
    </div>
  );
}

const navSim = "flex items-center justify-between px-4 py-2.5";

function MockBusiness() {
  return (
    <div className="h-full bg-[#0a1024]">
      <div className={navSim}>
        <div className="h-1.5 w-10 rounded-full bg-cyan/60" />
        <div className="flex gap-2"><div className="h-1 w-5 rounded-full bg-white/15" /><div className="h-1 w-5 rounded-full bg-white/15" /><div className="h-1 w-5 rounded-full bg-white/15" /></div>
        <div className="h-2.5 w-12 rounded-full bg-lime/80" />
      </div>
      <div className="px-4 pt-5 pb-3">
        <div className="h-2.5 w-3/4 rounded-full bg-gradient-to-r from-lime/90 to-cyan/80" />
        <div className="mt-1.5 h-2.5 w-1/2 rounded-full bg-white/25" />
        <div className="mt-2.5 h-1.5 w-2/3 rounded-full bg-white/10" />
        <div className="mt-3 flex gap-2">
          <div className="h-4 w-14 rounded-full bg-lime" />
          <div className="h-4 w-14 rounded-full border border-white/20" />
        </div>
      </div>
      <div className="mx-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] p-2">
            <div className="h-1.5 w-2/3 rounded-full bg-cyan/50" />
            <div className="h-1 w-full rounded-full bg-white/10" />
            <div className="h-1 w-3/4 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MockCommerce() {
  return (
    <div className="h-full bg-[#0a1024]">
      <div className={navSim}>
        <div className="h-1.5 w-12 rounded-full bg-lime/70" />
        <div className="flex gap-2">
          <div className="h-3.5 w-14 rounded-full bg-white/10" />
          <div className="h-3.5 w-14 rounded-full bg-white/10" />
          <div className="h-3.5 w-16 rounded-full bg-lime/80" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-4 pt-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-1 rounded-lg border border-white/[0.07] bg-white/[0.02] p-1.5">
            <div className="h-8 rounded-md" style={{ background: i % 2 ? "linear-gradient(135deg,#c8ff3226,#25e3ff1a)" : "linear-gradient(135deg,#8b5cff26,#3d8bff1a)" }} />
            <div className="h-1 w-3/4 rounded-full bg-white/15" />
            <div className="h-1.5 w-1/2 rounded-full bg-lime/70" />
          </div>
        ))}
      </div>
      <div className="mx-4 mt-3 flex items-center justify-between rounded-lg border border-lime/25 bg-lime/[0.06] px-3 py-2">
        <div className="h-1.5 w-16 rounded-full bg-lime/70" />
        <div className="h-3 w-10 rounded-full bg-lime" />
      </div>
    </div>
  );
}

function MockEducation() {
  return (
    <div className="h-full bg-[#0a1024]">
      <div className={navSim}>
        <div className="h-1.5 w-12 rounded-full bg-eblue/70" />
        <div className="h-3.5 w-16 rounded-full bg-eblue/70" />
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 pt-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
            <div className="flex items-center justify-between">
              <div className="h-1.5 w-2/3 rounded-full bg-eblue/60" />
              <div className="h-2 w-6 rounded-full bg-white/15" />
            </div>
            <div className="h-1 w-full rounded-full bg-white/10" />
            <div className="h-1 w-1/2 rounded-full bg-white/10" />
            <div className="h-1 w-full rounded-full bg-white/[0.07]">
              <div className="h-1 rounded-full bg-gradient-to-r from-cyan to-eblue" style={{ width: `${45 + i * 15}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockSaas() {
  return (
    <div className="flex h-full bg-[#0a1024]">
      <div className="w-12 space-y-2 border-r border-white/[0.07] p-2">
        <div className="h-2 w-6 rounded-full bg-eblue/60" />
        <div className="h-1.5 w-full rounded-full bg-white/10" />
        <div className="h-1.5 w-full rounded-full bg-white/10" />
        <div className="h-1.5 w-3/4 rounded-full bg-eblue/40" />
      </div>
      <div className="flex-1 p-3">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-16 rounded-full bg-white/20" />
          <div className="flex gap-1.5">
            <div className="h-3 w-8 rounded-full border border-eblue/40" />
            <div className="h-3 w-8 rounded-full bg-eblue/80" />
          </div>
        </div>
        <div className="mt-2.5 flex h-14 items-end gap-1.5">
          {[0.5, 0.75, 0.45, 0.9, 0.6, 1, 0.7].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h * 100}%`, background: "linear-gradient(180deg,#3d8bffcc,#3d8bff22)" }} />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-1 rounded-md bg-white/[0.03] p-1.5">
              <div className="h-1.5 w-1/2 rounded-full bg-cyan/50" />
              <div className="h-1 w-3/4 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Mock3D() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[#080d20]">
      <div className="absolute h-24 w-24 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%, #8b5cff55, #25e3ff22 55%, transparent 72%)", filter: "blur(2px)" }} />
      <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full opacity-30">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#25e3ff" strokeWidth="0.3" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={i * 10} y1="0" x2={i * 10} y2="60" stroke="#25e3ff" strokeWidth="0.3" />
        ))}
      </svg>
      <div className="relative z-10 text-center">
        <div className="mx-auto h-2 w-16 rounded-full bg-gradient-to-r from-ultra to-cyan" />
        <div className="mt-1.5 h-1.5 w-10 rounded-full bg-white/20" />
      </div>
    </div>
  );
}

function MockPortfolio() {
  return (
    <div className="h-full bg-[#0a1024] px-4 pt-4">
      <div className="h-3.5 w-2/3 rounded-full bg-gradient-to-r from-ice via-white/60 to-cyan/70" />
      <div className="mt-1 h-1.5 w-1/3 rounded-full bg-white/15" />
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        <div className="col-span-2 h-12 rounded-md" style={{ background: "linear-gradient(135deg,#25e3ff30,#8b5cff20)" }} />
        <div className="h-12 rounded-md bg-white/[0.06]" />
        <div className="h-12 rounded-md bg-white/[0.06]" />
        <div className="h-8 rounded-md bg-white/[0.06]" />
        <div className="col-span-2 h-8 rounded-md" style={{ background: "linear-gradient(135deg,#c8ff3226,#25e3ff1a)" }} />
        <div className="h-8 rounded-md bg-white/[0.06]" />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Data                                                                */
/* ================================================================== */
const CATEGORIES = ["All", "Business", "E-Commerce", "Education", "SaaS", "3D", "Portfolio"];

type Project = {
  name: string; industry: string; type: string; tech: string[]; desc: string; url: string; mock: React.ReactNode;
};

const PROJECTS: Project[] = [
  { name: "NOVA CONSULTING", industry: "Business", type: "Corporate Website", tech: ["React", "Tailwind", "Framer Motion"], desc: "A credibility-first corporate website with cinematic scroll storytelling, conversion-focused layouts and motion that guides the eye.", url: "nova-consulting.concept", mock: <MockBusiness /> },
  { name: "LUXE CART", industry: "E-Commerce", type: "Online Store", tech: ["Next.js", "Supabase", "Stripe"], desc: "A high-conversion storefront with cart, secure payments, inventory and a full admin control experience.", url: "luxecart.concept", mock: <MockCommerce /> },
  { name: "EDUSPHERE", industry: "Education", type: "Learning Platform", tech: ["React", "Node.js", "PostgreSQL"], desc: "Course platform with student dashboards, progress tracking and a calm, focused learning interface.", url: "edusphere.concept", mock: <MockEducation /> },
  { name: "ORBITLY", industry: "SaaS", type: "Product Dashboard", tech: ["Next.js", "TypeScript", "APIs"], desc: "Analytics product experience with real-time data visualisation, onboarding flows and a scalable architecture.", url: "orbitly.concept", mock: <MockSaas /> },
  { name: "DIMENSION", industry: "3D", type: "Interactive Experience", tech: ["Three.js", "R3F", "GSAP"], desc: "An immersive WebGL landing experience with interactive scenes, physics-driven motion and custom shaders.", url: "dimension.concept", mock: <Mock3D /> },
  { name: "AARAV MEHTA", industry: "Portfolio", type: "Personal Brand", tech: ["React", "Motion", "Vercel"], desc: "A personal brand site that feels like a digital gallery — fast, expressive and impossible to forget.", url: "aarav.concept", mock: <MockPortfolio /> },
];

/* ================================================================== */
/*  Project modal                                                       */
/* ================================================================== */
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-[#04081a]/85 backdrop-blur-xl" onClick={onClose} />
          <motion.div
            className="grad-border glass-strong relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl p-5 md:p-7"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ice transition-colors hover:border-magenta/60 hover:text-magenta"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="aspect-[16/9] overflow-hidden rounded-2xl">
              <BrowserFrame url={project.url}>{project.mock}</BrowserFrame>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-1.5 rounded-full border border-magenta/30 bg-magenta/10 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-magenta">
                <Tag className="h-2.5 w-2.5" /> CONCEPT PROJECT
              </span>
              <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-cyan">
                {project.industry} · {project.type}
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-wide text-ice">{project.name}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-soft">{project.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="chip px-3.5 py-1.5 font-mono text-[10px] tracking-wider text-soft">{t}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="btn-primary" onClick={() => { onClose(); scrollToId("#contact"); }} data-cursor="lime">
                Start A Similar Project <ArrowRight className="h-4 w-4" />
              </button>
              <button className="btn-secondary" onClick={onClose}>Close Preview</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  Work grid                                                           */
/* ================================================================== */
function Work() {
  useAmbientSection("work");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const shown = PROJECTS.filter((p) => filter === "All" || p.industry === filter);

  useEffect(() => {
    if (selected) stopScroll();
    else startScroll();
  }, [selected]);

  return (
    <section id="work" className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHead
        kicker="SELECTED WORK / 02"
        title={<>Selected <span className="text-gradient">Digital Experiences.</span></>}
        sub="Concept explorations from our studio — each one a study in premium craft. No invented clients, only real capability."
      />

      <Reveal className="mt-12 flex flex-wrap justify-center gap-2.5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-5 py-2 text-[12px] font-medium tracking-wide transition-all duration-300 ${
              filter === c ? "bg-signature text-[#060a18] shadow-[0_0_28px_rgba(37,227,255,.3)]" : "chip text-soft hover:text-ice"
            }`}
          >
            {c}
          </button>
        ))}
      </Reveal>

      <motion.div layout className="mt-12 grid gap-7 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.article
              layout
              key={p.name}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group [perspective:1400px]"
              data-cursor="view"
              onClick={() => setSelected(p)}
            >
              <div
                className="spot relative cursor-pointer transition-all duration-700 ease-out [transform-style:preserve-3d] group-hover:rounded-[13px]"
                style={{ transform: `perspective(1400px) rotateY(${i % 2 === 0 ? -6 : 6}deg) rotateX(4deg)` }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "perspective(1400px) rotateY(0deg) rotateX(0deg) translateY(-6px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = `perspective(1400px) rotateY(${i % 2 === 0 ? -6 : 6}deg) rotateX(4deg)`; }}
              >
                <div
                  className="gradient-animate pointer-events-none absolute -inset-px rounded-[13px] bg-signature opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 1 }}
                />
                <div className="relative aspect-[16/10.5] overflow-hidden rounded-xl transition-all duration-700 group-hover:brightness-110 brightness-[.8]">
                  <BrowserFrame url={p.url}>{p.mock}</BrowserFrame>
                  <div className="absolute inset-0 flex translate-y-4 flex-col justify-end bg-gradient-to-t from-[#04081a]/95 via-[#04081a]/55 to-transparent p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span key={t} className="rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 font-mono text-[9px] tracking-wider text-cyan">{t}</span>
                      ))}
                    </div>
                    <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-white/80">{p.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wide text-lime">
                      VIEW PROJECT <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between px-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-lg font-bold tracking-wide text-ice">{p.name}</h3>
                    <span className="flex items-center gap-1 rounded-full border border-magenta/30 bg-magenta/10 px-2 py-0.5 font-mono text-[8px] tracking-[0.18em] text-magenta">
                      <Tag className="h-2.5 w-2.5" /> CONCEPT
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-soft">{p.industry} · {p.type}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ================================================================== */
/*  BEFORE / AFTER                                                      */
/* ================================================================== */
function OldMock() {
  return (
    <div className="h-full bg-[#d9d9d4] p-4 font-serif" style={{ filter: "saturate(.55)" }}>
      <div className="flex items-center justify-between border-b border-black/15 pb-2">
        <span className="text-[11px] font-bold text-black/60">Nova Consulting</span>
        <div className="flex gap-2 text-[8px] text-black/45 underline"><span>Home</span><span>About</span><span>Contact</span></div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-[13px] font-bold text-black/65">Welcome to our website!</p>
        <p className="mx-auto mt-1.5 max-w-[75%] text-[8px] leading-relaxed text-black/45">
          We are a company that provides services. Our website contains information about our services and contact details.
        </p>
        <div className="mx-auto mt-2.5 h-4 w-16 rounded-sm border border-black/30 bg-[#b8b8b2] text-[7px] leading-4 text-black/50">Click Here</div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1 border border-black/10 bg-[#e6e6e1] p-1.5">
            <div className="h-6 bg-[#c9c9c3]" />
            <div className="h-1 w-3/4 bg-black/20" />
            <div className="h-1 w-1/2 bg-black/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function NewMock() {
  return (
    <div className="h-full bg-[#060a18]">
      <div className={navSim}>
        <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-lime to-cyan" />
        <div className="flex gap-2">
          <div className="h-2.5 w-10 rounded-full bg-white/15" />
          <div className="h-2.5 w-10 rounded-full bg-white/15" />
          <div className="h-2.5 w-12 rounded-full bg-lime" />
        </div>
      </div>
      <div className="px-5 pt-4">
        <div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-lime via-cyan to-ultra" />
        <div className="mt-1.5 h-3 w-1/2 rounded-full bg-white/30" />
        <div className="mt-2 h-1.5 w-2/3 rounded-full bg-white/10" />
        <div className="mt-3 flex gap-2">
          <div className="h-4 w-14 rounded-full bg-lime shadow-[0_0_14px_rgba(200,255,50,.4)]" />
          <div className="h-4 w-14 rounded-full border border-cyan/50" />
        </div>
      </div>
      <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2">
            <div className="h-1.5 w-2/3 rounded-full" style={{ background: ["#c8ff32aa", "#25e3ffaa", "#8b5cffaa"][i] }} />
            <div className="h-1 w-full rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BeforeAfter() {
  useAmbientSection("beforeafter");
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(94, Math.max(6, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
  };

  return (
    <section id="beforeafter" className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-32">
      <SectionHead
        kicker="TRANSFORMATION"
        title={<>From Ordinary <br className="hidden md:block" /> To <span className="text-gradient-energy">Outstanding.</span></>}
        sub="Drag the divider and watch a generic website become a Dynamic Developments experience."
      />

      <Reveal className="mt-14" delay={0.1}>
        <div
          ref={ref}
          className="relative aspect-[16/10] cursor-ew-resize select-none overflow-hidden rounded-3xl border border-[rgba(160,190,255,0.14)] shadow-[0_30px_90px_rgba(2,8,26,.6)]"
          onPointerDown={onPointerDown}
          onPointerMove={(e) => dragging.current && update(e.clientX)}
          onPointerUp={() => { dragging.current = false; }}
          onPointerLeave={() => { dragging.current = false; }}
          data-cursor="drag"
        >
          <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: 1 - value / 100, background: "radial-gradient(circle at 50% 50%, rgba(120,120,120,.16), transparent 70%)" }} />
          <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: value / 100, background: "radial-gradient(circle at 30% 30%, rgba(200,255,50,.13), transparent 55%), radial-gradient(circle at 75% 70%, rgba(139,92,255,.15), transparent 55%)" }} />

          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}><NewMock /></div>
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${value}%)` }}><OldMock /></div>

          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-mono text-[9px] tracking-[0.3em] text-white/60 backdrop-blur-sm">BEFORE</span>
          <span className="absolute right-4 top-4 rounded-full bg-lime/15 px-3 py-1 font-mono text-[9px] tracking-[0.3em] text-lime backdrop-blur-sm">AFTER</span>

          <div className="absolute inset-y-0 z-10" style={{ left: `${value}%` }}>
            <div className="absolute inset-y-0 -left-px w-0.5 bg-gradient-to-b from-lime via-cyan to-ultra shadow-[0_0_18px_rgba(37,227,255,.6)]" />
            <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan/50 bg-[#060a18]/90 shadow-[0_0_26px_rgba(37,227,255,.4)] backdrop-blur-sm">
              <MoveHorizontal className="h-4 w-4 text-cyan" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function PortfolioSection() {
  return (
    <>
      <Work />
      <BeforeAfter />
    </>
  );
}
