import { useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Zap } from "lucide-react";
import { SectionHead, Reveal, Magnetic } from "./Effects";
import { useAmbientSection, scrollToId, sendQuoteToForm } from "../lib/core";

/* ================================================================== */
/*  PRICING                                                             */
/* ================================================================== */
const PLANS = [
  {
    name: "STARTER", price: "₹10,000", prefix: "Starting at", highlight: false,
    suited: "Individuals · Small businesses · Portfolios · Basic business websites",
    features: ["Modern responsive website", "Up to ~5 pages", "Contact form", "Mobile optimization", "Basic SEO", "Social links", "Deployment assistance"],
    cta: "Start With ₹10K",
  },
  {
    name: "GROWTH", price: "₹25,000", prefix: "Starting at", highlight: true, badge: "MOST POPULAR",
    suited: "Growing companies that need more presence and power",
    features: ["Premium UI design", "More pages", "Advanced animation", "CMS", "Advanced forms", "Analytics setup", "SEO improvement", "Integrations", "Performance optimization"],
    cta: "Build My Website",
  },
  {
    name: "CUSTOM / PREMIUM", price: "Custom Quote", prefix: "Scale without limits", highlight: false,
    suited: "E-Commerce · SaaS · 3D Websites · Large platforms · Business systems",
    features: ["Authentication", "Admin dashboards", "Payment integration", "Databases", "APIs", "3D experiences", "AI features", "Automation", "Custom integrations"],
    cta: "Discuss Your Project",
  },
];

function Pricing() {
  useAmbientSection("pricing");
  return (
    <section id="pricing" className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHead
        kicker="PRICING / 04"
        title={<>Flexible Packages. <br className="hidden md:block" /><span className="text-gradient-energy">Serious Results.</span></>}
        sub="Transparent starting points — scaled to what your business actually needs."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className="h-full">
            <div
              className={`spot group relative flex h-full flex-col rounded-3xl p-8 transition-all duration-500 ${
                p.highlight ? "border border-transparent bg-white/[0.03] shadow-[0_0_60px_rgba(47,92,255,.16)]" : "glass hover:border-[rgba(160,190,255,0.22)]"
              }`}
            >
              {p.highlight && (
                <div
                  className="gradient-animate pointer-events-none absolute -inset-px rounded-3xl bg-signature opacity-90"
                  style={{ WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 1.5 }}
                />
              )}
              {p.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-signature px-4 py-1 text-[10px] font-bold tracking-[0.18em] text-[#060a18] shadow-[0_0_24px_rgba(37,227,255,.45)]">
                  {p.badge}
                </span>
              )}
              <span className="font-mono text-[11px] tracking-[0.35em] text-soft">{p.name}</span>
              <div className="mt-5">
                <span className="text-[11px] uppercase tracking-widest text-white/40">{p.prefix}</span>
                <div className={`mt-1 font-display text-[2.6rem] font-bold leading-none tracking-tight ${p.price.includes("₹") ? "text-lime" : "text-gradient"}`}
                  style={p.price.includes("₹") ? { textShadow: "0 0 34px rgba(200,255,50,.28)" } : undefined}
                >
                  {p.price}
                </div>
              </div>
              {p.price.includes("₹") && <div className="mt-3 h-px w-16 bg-energy opacity-70" />}
              <p className="mt-4 text-[12px] leading-relaxed text-soft">{p.suited}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-soft">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Magnetic strength={0.25} className="w-full">
                  <button
                    onClick={() => scrollToId("#contact")}
                    className={`${p.highlight ? "btn-primary" : "btn-secondary"} w-full !py-3.5 text-sm`}
                    data-cursor={p.highlight ? "lime" : undefined}
                  >
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </button>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-10 max-w-xl text-center text-[12px] leading-relaxed text-white/40">
          Final pricing depends on features, complexity, integrations and project requirements.
        </p>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  PROJECT COST ESTIMATOR                                              */
/* ================================================================== */
const TYPES = [
  { label: "Business Website", base: 10000 },
  { label: "Portfolio", base: 10000 },
  { label: "E-Commerce", base: 25000 },
  { label: "Landing Page", base: 8000 },
  { label: "Educational Website", base: 15000 },
  { label: "SaaS", base: 40000 },
  { label: "3D Website", base: 35000 },
  { label: "Custom Platform", base: 50000 },
];
const PAGES = [
  { label: "1–5", mult: 1 },
  { label: "6–10", mult: 1.35 },
  { label: "10+", mult: 1.8 },
];
const FEATURES = [
  { label: "Animations", cost: 3000 },
  { label: "3D", cost: 15000 },
  { label: "Admin Panel", cost: 12000 },
  { label: "Payments", cost: 10000 },
  { label: "Authentication", cost: 8000 },
  { label: "Database", cost: 8000 },
  { label: "AI", cost: 15000 },
  { label: "CMS", cost: 8000 },
  { label: "Booking", cost: 8000 },
  { label: "Dashboard", cost: 12000 },
];
const DESIGNS = [
  { label: "Standard", mult: 1 },
  { label: "Premium", mult: 1.25 },
  { label: "Advanced Interactive", mult: 1.6 },
];

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.7, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);
  return <>{display.toLocaleString("en-IN")}</>;
}

function Estimator() {
  useAmbientSection("pricing");
  const [type, setType] = useState(TYPES[0]);
  const [pages, setPages] = useState(PAGES[0]);
  const [features, setFeatures] = useState<string[]>([]);
  const [design, setDesign] = useState(DESIGNS[0]);

  const toggleFeature = (label: string) =>
    setFeatures((f) => (f.includes(label) ? f.filter((x) => x !== label) : [...f, label]));

  const featureSum = FEATURES.filter((f) => features.includes(f.label)).reduce((a, f) => a + f.cost, 0);
  const total = Math.round((type.base * pages.mult + featureSum) * design.mult);
  const low = Math.round(total / 500) * 500;
  const high = Math.round((total * 1.3) / 500) * 500;

  const Chip = ({ active, children, ...rest }: { active: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...rest}
      className={`rounded-full px-4 py-2 text-[12px] font-medium transition-all duration-300 ${
        active
          ? "border border-lime/60 bg-lime/10 text-ice shadow-[0_0_20px_rgba(200,255,50,.14)]"
          : "chip text-soft hover:text-ice"
      }`}
    >
      {children}
    </button>
  );

  return (
    <section id="estimator" className="relative z-10 mx-auto max-w-6xl px-6 pb-28 md:pb-36">
      <SectionHead
        kicker="COST ESTIMATOR / 05"
        title={<>Estimate Your <span className="text-gradient">Project.</span></>}
        sub="Answer four questions and watch an approximate budget assemble itself."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {[
            { n: "01", title: "What are we building?" },
            { n: "02", title: "Pages" },
            { n: "03", title: "Features" },
            { n: "04", title: "Design Level" },
          ].map((step, si) => (
            <Reveal key={step.n} delay={si * 0.06}>
              <div className="spot glass rounded-2xl p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-lime">{step.n}</span>
                  <h3 className="font-display text-lg font-bold text-ice">{step.title}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {si === 0 && TYPES.map((t) => (
                    <Chip key={t.label} active={type.label === t.label} onClick={() => setType(t)}>{t.label}</Chip>
                  ))}
                  {si === 1 && PAGES.map((p) => (
                    <Chip key={p.label} active={pages.label === p.label} onClick={() => setPages(p)}>{p.label}</Chip>
                  ))}
                  {si === 2 && FEATURES.map((f) => (
                    <Chip key={f.label} active={features.includes(f.label)} onClick={() => toggleFeature(f.label)}>
                      {f.label}
                      <span className="ml-1.5 text-[10px] text-white/35">+₹{(f.cost / 1000).toFixed(0)}K</span>
                    </Chip>
                  ))}
                  {si === 3 && DESIGNS.map((d) => (
                    <Chip key={d.label} active={design.label === d.label} onClick={() => setDesign(d)}>{d.label}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="spot glass-strong sticky top-28 overflow-hidden rounded-3xl p-8">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full" style={{ background: "radial-gradient(circle, rgba(200,255,50,.14), transparent 70%)" }} />
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-lime" />
              <span className="font-mono text-[10px] tracking-[0.35em] text-lime">ESTIMATED PROJECT RANGE</span>
            </div>
            <div className="mt-6 font-display">
              <motion.span key={low} className="text-[2.6rem] font-bold leading-none text-lime" style={{ textShadow: "0 0 30px rgba(200,255,50,.35)" }}>
                ₹<AnimatedPrice value={low} />
              </motion.span>
              <span className="mx-2 text-2xl text-white/30">–</span>
              <span className="text-[2.6rem] font-bold leading-none text-lime" style={{ textShadow: "0 0 30px rgba(200,255,50,.35)" }}>
                ₹<AnimatedPrice value={high} />
              </span>
            </div>
            <div className="mt-6 space-y-2 border-t border-white/[0.08] pt-5 text-[12px] text-soft">
              <div className="flex justify-between"><span className="text-white/40">Project type</span><span className="text-ice">{type.label}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Pages</span><span className="text-ice">{pages.label}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Features</span><span className="text-ice">{features.length || "None"}</span></div>
              <div className="flex justify-between"><span className="text-white/40">Design level</span><span className="text-ice">{design.label}</span></div>
            </div>
            <p className="mt-5 text-[11px] leading-relaxed text-white/40">
              This is an approximate estimate. Final pricing is confirmed after discussing project requirements.
            </p>
            <Magnetic strength={0.3} className="mt-6 w-full">
              <button
                className="btn-primary w-full"
                data-cursor="lime"
                onClick={() => {
                  sendQuoteToForm({ type: type.label, low, high });
                  scrollToId("#contact");
                }}
              >
                <Sparkles className="h-4 w-4" /> Get Exact Quote
              </button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function PricingSection() {
  return (
    <>
      <Pricing />
      <Estimator />
    </>
  );
}
