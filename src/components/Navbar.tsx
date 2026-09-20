import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "../config";
import { scrollToId } from "../lib/core";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll spy */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const go = (href: string) => { setOpen(false); setTimeout(() => scrollToId(href), open ? 320 : 0); };
  const indicatorFor = hovered ?? active;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[85] flex justify-center px-4"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`glass-strong flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 md:px-5 ${
            scrolled ? "mt-3 py-2 shadow-[0_10px_44px_rgba(3,8,24,.6),0_0_34px_rgba(37,227,255,.07)]" : "mt-5 py-3"
          }`}
        >
          {/* logo */}
          <button onClick={() => go("#home")} className="group flex items-center gap-2.5" data-cursor="open" aria-label="Dynamic Developments home">
            <motion.span
              whileHover={{ rotate: -8, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
              className="relative"
            >
              <Logo size={scrolled ? 34 : 38} glow className="transition-all duration-500" />
            </motion.span>
            <span className="hidden flex-col items-start leading-none min-[380px]:flex">
              <span className="font-display text-[13.5px] font-bold tracking-[0.16em] text-ice">DYNAMIC</span>
              <span className="mt-0.5 font-display text-[12px] font-bold tracking-[0.14em] text-gradient-azure">DEVELOPMENTS</span>
            </span>
          </button>

          {/* desktop links */}
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((l) => {
              const isActive = indicatorFor === l.href;
              return (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  onMouseEnter={() => setHovered(l.href)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative pb-1 text-[13px] font-medium transition-colors duration-300 ${
                    isActive ? "text-ice" : "text-soft hover:text-ice"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: "linear-gradient(90deg,#c8ff32,#25e3ff)", boxShadow: "0 0 10px rgba(37,227,255,.7)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => go("#contact")} className="btn-primary !px-3.5 !py-2.5 text-[13px] sm:!px-5" data-cursor="lime">
              <span className="hidden min-[420px]:inline">Start A Project</span>
              <span className="inline text-[11px] min-[420px]:hidden">START</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(160,190,255,0.16)] text-ice lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[84] flex flex-col justify-center bg-[#060a18]/97 px-10 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute left-1/2 top-24 -translate-x-1/2 opacity-80">
              <Logo size={64} glow />
            </div>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="border-b border-white/5 py-4 text-left font-display text-3xl font-bold text-ice"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <span className="mr-3 font-mono text-xs text-cyan">0{i + 1}</span>
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <motion.a
              href={`mailto:${SITE.email}`}
              className="mt-10 font-mono text-xs tracking-widest text-lime"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            >
              {SITE.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
