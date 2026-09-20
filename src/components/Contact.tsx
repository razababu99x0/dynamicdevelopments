import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Check, ArrowRight, Mail, Send } from "lucide-react";
import { SectionHead, Reveal, Magnetic } from "./Effects";
import { useAmbientSection, scrollToId, stopScroll, startScroll } from "../lib/core";
import { SITE, NAV_LINKS } from "../config";
import Logo from "./Logo";

/* ================================================================== */
/*  CONTACT                                                             */
/* ================================================================== */
const TYPE_OPTIONS = ["Business Website", "E-Commerce", "Portfolio", "Landing Page", "Educational Website", "SaaS", "3D Website", "Custom Platform", "Other"];
const BUDGET_OPTIONS = ["₹10K – ₹20K", "₹20K – ₹50K", "₹50K – ₹1L", "₹1L+", "Need Consultation"];

const FIELD_GLOW: Record<string, string> = {
  name: "#c8ff32", business: "#25e3ff", email: "#3d8bff",
  phone: "#8b5cff", type: "#25e3ff", budget: "#c8ff32",
  description: "#8b5cff", deadline: "#25e3ff",
};

const inputCls =
  "w-full rounded-xl border border-[rgba(160,190,255,0.14)] bg-white/[0.035] px-4 py-3.5 text-[14px] text-ice placeholder:text-white/25 transition-all duration-300 focus:border-white/30 focus:bg-white/[0.06]";

function Field({ label, field, active, children }: { label: string; field: string; active: string | null; children: React.ReactNode }) {
  const isActive = active === field;
  const color = FIELD_GLOW[field] ?? "#25e3ff";
  return (
    <div className="relative">
      <label className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-white/40">{label}</label>
      <div
        className="relative rounded-xl transition-shadow duration-500"
        style={{ boxShadow: isActive ? `0 0 30px ${color}2e, inset 0 0 20px ${color}10` : "none" }}
      >
        <span
          className="pointer-events-none absolute -left-px top-8 z-10 h-6 w-[3px] rounded-full transition-all duration-500"
          style={{ background: color, opacity: isActive ? 1 : 0, boxShadow: isActive ? `0 0 12px ${color}` : "none" }}
        />
        {children}
      </div>
    </div>
  );
}

function Contact() {
  useAmbientSection("contact");
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", type: "", budget: "", description: "", deadline: "" });
  const [active, setActive] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<{ type: string; low: number; high: number }>).detail;
      const budget = d.high < 20000 ? "₹10K – ₹20K" : d.high < 50000 ? "₹20K – ₹50K" : d.high < 100000 ? "₹50K – ₹1L" : "₹1L+";
      setForm((f) => ({
        ...f, type: d.type, budget,
        description: `Project estimate request: ${d.type} (approx. ₹${d.low.toLocaleString("en-IN")} – ₹${d.high.toLocaleString("en-IN")}).`,
      }));
      setNotice(true);
      setTimeout(() => setNotice(false), 5000);
    };
    window.addEventListener("dd:quote", handler);
    return () => window.removeEventListener("dd:quote", handler);
  }, []);

  useEffect(() => {
    if (status === "sending") stopScroll();
    return () => startScroll();
  }, [status]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    /*
      ------------------------------------------------------------------
      BACKEND INTEGRATION POINT
      Connect to Supabase / Firebase / EmailJS / Resend / Formspree
      or your custom backend here using `form`.
      ------------------------------------------------------------------
    */
    setTimeout(() => setStatus("done"), 1300);
  };

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36">
      {/* soft aurora convergence */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[15%] h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(200,255,50,.09), transparent 70%)" }} />
        <div className="absolute right-[10%] top-[28%] h-80 w-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(37,227,255,.11), transparent 70%)" }} />
        <div className="absolute bottom-[8%] left-[35%] h-80 w-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(139,92,255,.11), transparent 70%)" }} />
      </div>

      <SectionHead
        kicker="CONTACT / 09"
        title={<>Have An Idea?<br /><span className="text-gradient">LET'S TURN IT INTO SOMETHING POWERFUL.</span></>}
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <form onSubmit={submit} className="glass spot relative overflow-hidden rounded-3xl p-7 md:p-9">
            {status === "done" && (
              <motion.div
                className="pointer-events-none absolute inset-0 z-10"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: "linear-gradient(100deg, transparent, rgba(200,255,50,.16), rgba(37,227,255,.12), transparent)", width: "60%" }}
              />
            )}
            {notice && (
              <motion.div
                className="mb-6 rounded-xl border border-lime/30 bg-lime/[0.07] px-4 py-3 text-[12.5px] text-lime"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              >
                Estimator details added — review and submit.
              </motion.div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="FULL NAME" field="name" active={active}>
                <input required value={form.name} onChange={set("name")} onFocus={() => setActive("name")} onBlur={() => setActive(null)} placeholder="Your name" className={inputCls} />
              </Field>
              <Field label="BUSINESS NAME" field="business" active={active}>
                <input value={form.business} onChange={set("business")} onFocus={() => setActive("business")} onBlur={() => setActive(null)} placeholder="Your business" className={inputCls} />
              </Field>
              <Field label="EMAIL" field="email" active={active}>
                <input required type="email" value={form.email} onChange={set("email")} onFocus={() => setActive("email")} onBlur={() => setActive(null)} placeholder="you@email.com" className={inputCls} />
              </Field>
              <Field label="PHONE / WHATSAPP" field="phone" active={active}>
                <input value={form.phone} onChange={set("phone")} onFocus={() => setActive("phone")} onBlur={() => setActive(null)} placeholder="+91 ..." className={inputCls} />
              </Field>
              <Field label="WEBSITE TYPE" field="type" active={active}>
                <select required value={form.type} onChange={set("type")} onFocus={() => setActive("type")} onBlur={() => setActive(null)} className={inputCls}>
                  <option value="" disabled>Select type</option>
                  {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="ESTIMATED BUDGET" field="budget" active={active}>
                <select required value={form.budget} onChange={set("budget")} onFocus={() => setActive("budget")} onBlur={() => setActive(null)} className={inputCls}>
                  <option value="" disabled>Select budget</option>
                  {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="PROJECT DESCRIPTION" field="description" active={active}>
                  <textarea required rows={4} value={form.description} onChange={set("description")} onFocus={() => setActive("description")} onBlur={() => setActive(null)} placeholder="Tell us about your idea, goals and requirements..." className={`${inputCls} resize-none`} />
                </Field>
              </div>
              <Field label="PREFERRED DEADLINE" field="deadline" active={active}>
                <input value={form.deadline} onChange={set("deadline")} onFocus={() => setActive("deadline")} onBlur={() => setActive(null)} placeholder="e.g. 4–6 weeks / flexible" className={inputCls} />
              </Field>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Magnetic strength={0.4}>
                <motion.button
                  type="submit"
                  className="btn-primary min-w-[220px]"
                  data-cursor="lime"
                  animate={status === "done" ? { background: "linear-gradient(92deg,#ffe34e,#c8ff32,#25e3ff)", scale: [1, 1.04, 1] } : {}}
                  transition={{ duration: 0.6 }}
                  disabled={status !== "idle"}
                >
                  {status === "idle" && (<>Start My Project <Send className="h-4 w-4" /></>)}
                  {status === "sending" && (
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} className="block h-4 w-4 rounded-full border-2 border-[#060a18]/30 border-t-[#060a18]" />
                  )}
                  {status === "done" && <Check className="h-5 w-5" strokeWidth={3} />}
                </motion.button>
              </Magnetic>
              <a href={`mailto:${SITE.email}`} className="btn-ghost text-[13px]" data-cursor="open">
                <Mail className="h-3.5 w-3.5" /> {SITE.email}
              </a>
            </div>

            {status === "done" && (
              <motion.div
                className="mt-7 rounded-2xl border border-lime/25 bg-lime/[0.06] p-5"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              >
                <p className="font-display text-lg font-bold tracking-wide text-lime">PROJECT REQUEST RECEIVED.</p>
                <p className="mt-1.5 text-[13.5px] text-soft">We'll review your requirements and contact you shortly.</p>
                <button type="button" onClick={() => { setStatus("idle"); setForm({ name: "", business: "", email: "", phone: "", type: "", budget: "", description: "", deadline: "" }); }} className="mt-3 font-mono text-[10px] tracking-[0.25em] text-cyan transition-colors hover:text-ice">
                  SEND ANOTHER →
                </button>
              </motion.div>
            )}
          </form>
        </Reveal>

        {/* side panel — glowing logo orb */}
        <Reveal delay={0.15}>
          <div className="relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl border border-[rgba(160,190,255,0.12)] bg-white/[0.025] p-8">
            <div className="animate-pulse-core absolute -right-16 -top-16 h-60 w-60 rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,255,.3), rgba(37,227,255,.12) 55%, transparent 72%)", filter: "blur(6px)" }} />
            <div className="relative flex flex-1 flex-col items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 -m-8 rounded-full border border-cyan/15 animate-spin-slower" />
                <div className="absolute inset-0 -m-4 rounded-full border border-ultra/20 animate-spin-slow" style={{ animationDirection: "reverse" }} />
                <Logo size={96} glow />
              </div>
              <h3 className="mt-10 text-center font-display text-4xl font-bold leading-[1.05] text-ice">
                LET'S<br /><span className="text-gradient gradient-animate">BUILD.</span>
              </h3>
              <p className="mt-4 text-center text-[13px] leading-relaxed text-soft">
                Tell us about your idea today — we usually reply within a few hours.
              </p>
            </div>
            <div className="relative space-y-3">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-[13px] text-ice transition-colors hover:text-cyan" data-cursor="open">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(160,190,255,0.14)] bg-white/[0.03]"><Mail className="h-3.5 w-3.5 text-lime" /></span>
                {SITE.email}
              </a>
              <div className="flex items-center gap-3 text-[13px] text-soft">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(160,190,255,0.14)] bg-white/[0.03]"><span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_#c8ff32]" /></span>
                Websites starting from ₹10,000
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FINAL CTA — ORDINARY dissolves into UNFORGETTABLE                   */
/* ================================================================== */
const ORD = "ORDINARY.".split("");

function OrdChar({ ch, i, progress }: { ch: string; i: number; progress: MotionValue<number> }) {
  const dx = (Math.sin(i * 71.3) * 0.5) * 240;
  const dy = (Math.sin(i * 37.7) * 0.5) * 200;
  const x = useTransform(progress, [0.34, 0.58], [0, dx]);
  const y = useTransform(progress, [0.34, 0.58], [0, dy]);
  const rotate = useTransform(progress, [0.34, 0.58], [0, (i % 2 ? 1 : -1) * 80]);
  const opacity = useTransform(progress, [0.38, 0.56], [1, 0]);
  return <motion.span style={{ x, y, rotate, opacity, display: "inline-block", whiteSpace: "pre" }}>{ch}</motion.span>;
}

function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const lineA = useTransform(scrollYProgress, [0.02, 0.2], [0, 1]);
  const lineB = useTransform(scrollYProgress, [0.1, 0.28], [0, 1]);
  const unforgetOpacity = useTransform(scrollYProgress, [0.56, 0.74], [0, 1]);
  const unforgetScale = useTransform(scrollYProgress, [0.56, 0.74], [0.8, 1]);
  const supportOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  return (
    <section ref={ref} className="relative z-10 h-[280vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <motion.div
          className="animate-aurora pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] rounded-full blur-3xl"
          style={{
            opacity: glow,
            background: "conic-gradient(from 0deg, rgba(200,255,50,.13), rgba(37,227,255,.13), rgba(61,139,255,.13), rgba(139,92,255,.15), rgba(200,255,50,.13))",
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

        <motion.h2
          className="font-display text-[clamp(2.2rem,7vw,5.5rem)] font-bold leading-[1.04] tracking-tight text-ice"
          style={{ opacity: lineA, y: useTransform(lineA, [0, 1], [30, 0]) }}
        >
          YOUR NEXT WEBSITE
        </motion.h2>
        <motion.h2
          className="font-display text-[clamp(2.2rem,7vw,5.5rem)] font-bold leading-[1.04] tracking-tight text-ice"
          style={{ opacity: lineB, y: useTransform(lineB, [0, 1], [30, 0]) }}
        >
          SHOULD NOT
        </motion.h2>
        <div className="font-display text-[clamp(2.2rem,7vw,5.5rem)] font-bold leading-[1.04] tracking-tight">
          <motion.span style={{ opacity: lineB }} className="inline-block text-ice">FEEL </motion.span>
          {ORD.map((ch, i) => <OrdChar key={i} ch={ch} i={i} progress={scrollYProgress} />)}
        </div>

        <motion.div
          className="mt-2 font-display text-[clamp(2.2rem,7vw,5.5rem)] font-bold leading-[1.04] tracking-tight"
          style={{ opacity: unforgetOpacity, scale: unforgetScale }}
        >
          <span className="text-gradient-energy" style={{ textShadow: "0 0 60px rgba(200,255,50,.3)" }}>
            FEEL UNFORGETTABLE.
          </span>
        </motion.div>

        <motion.div style={{ opacity: supportOpacity }} className="mt-10 flex flex-col items-center gap-7">
          <p className="text-[15px] text-soft">Let's build something people remember.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.5}>
              <button className="btn-primary" onClick={() => scrollToId("#contact")} data-cursor="lime">
                Start Your Project <ArrowRight className="h-4 w-4" />
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href={`mailto:${SITE.email}`} className="btn-azure" data-cursor="open">
                <Mail className="h-4 w-4" /> Email Us
              </a>
            </Magnetic>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-lime/60" />
            <span className="font-mono text-[10px] tracking-[0.35em] text-white/50">
              WEB DEVELOPMENT STARTING FROM <span className="font-semibold text-lime">₹10,000</span>
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-lime/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FOOTER                                                              */
/* ================================================================== */
const FOOTER_SERVICES = ["Business Websites", "E-Commerce", "SaaS", "3D Websites", "Landing Pages", "Custom Development"];

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(160,190,255,0.08)] bg-[#05081a]/80">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={46} glow />
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold tracking-[0.12em] text-ice">DYNAMIC</span>
                <span className="mt-1 font-display text-base font-bold tracking-[0.1em] text-gradient-azure">DEVELOPMENTS</span>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-soft">Premium Web Design & Development.</p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.25em] text-teal">SINCE 2025 · IDEA → REALITY</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.35em] text-white/40">NAVIGATION</h4>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button onClick={() => scrollToId(l.href)} className="text-[13px] text-soft transition-colors hover:text-cyan">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.35em] text-white/40">SERVICES</h4>
            <ul className="mt-5 space-y-2.5">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>
                  <button onClick={() => scrollToId("#services")} className="text-[13px] text-soft transition-colors hover:text-cyan">{s}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.35em] text-white/40">START A PROJECT</h4>
            <a href={`mailto:${SITE.email}`} className="mt-5 block break-all text-[13px] text-ice transition-colors hover:text-cyan" data-cursor="open">
              {SITE.email}
            </a>
            <p className="mt-4 text-[12.5px] leading-relaxed text-soft">
              Websites starting from <span className="text-lime">₹10,000</span>.
            </p>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 sm:flex-row">
          <span className="text-[12px] text-white/35">© Dynamic Developments. All rights reserved.</span>
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/25">DESIGNED TO IMPRESS · BUILT TO PERFORM</span>
        </div>
      </div>
    </footer>
  );
}

export default function ContactSection() {
  return (
    <>
      <Contact />
      <FinalCTA />
      <Footer />
    </>
  );
}
