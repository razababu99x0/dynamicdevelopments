import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHead, Reveal } from "./Effects";
import { useAmbientSection } from "../lib/core";

const FAQS = [
  {
    q: "How much does a website cost?",
    a: "Our website projects start from ₹10,000. Final pricing depends on design complexity, pages, functionality and integrations. Use our cost estimator for an instant approximate range.",
  },
  {
    q: "How long does development take?",
    a: "A standard business website typically takes 1–3 weeks. Larger platforms, e-commerce or 3D experiences take longer depending on scope. We share a clear timeline before starting.",
  },
  {
    q: "Do you build e-commerce websites?",
    a: "Yes — from small catalogues to full stores with cart, payments, inventory and admin dashboards.",
  },
  {
    q: "Can you redesign existing websites?",
    a: "Absolutely. Redesigns are one of our specialities — we transform outdated sites into modern, fast, premium experiences.",
  },
  {
    q: "Can you build 3D websites?",
    a: "Yes. We build interactive 3D experiences using WebGL, Three.js and modern animation tools.",
  },
  {
    q: "Do you provide hosting?",
    a: "We assist with deployment and can set up hosting on reliable platforms like Vercel. Ownership and control always stay with you.",
  },
  {
    q: "Will my website work on mobile?",
    a: "Every website we build is fully responsive — designed mobile-first and tested across devices and browsers.",
  },
  {
    q: "Can you create admin dashboards?",
    a: "Yes — custom admin panels, analytics dashboards and content management systems tailored to your operations.",
  },
  {
    q: "Can you integrate payments?",
    a: "Yes — payment gateways, subscriptions and checkout flows can be integrated into your website or platform.",
  },
  {
    q: "Do you provide maintenance?",
    a: "Yes — ongoing updates, improvements and support plans are available after launch.",
  },
];

function Item({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div
      className={`spot overflow-hidden rounded-2xl border transition-all duration-500 ${
        open ? "border-cyan/30 bg-cyan/[0.035] shadow-[0_0_40px_rgba(37,227,255,.07)]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <button onClick={onClick} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className={`font-display text-[15px] font-semibold transition-colors ${open ? "text-ice" : "text-soft"}`}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${open ? "border-cyan/50 text-cyan" : "border-white/15 text-white/50"}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 text-[13.5px] leading-relaxed text-soft">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);
  useAmbientSection("tech");
  return (
    <section id="faq" className="relative z-10 mx-auto max-w-3xl px-6 py-24 md:py-32">
      <SectionHead
        kicker="FAQ"
        title={<>Questions, <span className="text-gradient">Answered.</span></>}
      />
      <div className="mt-12 space-y-3">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.04}>
            <Item q={f.q} a={f.a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
