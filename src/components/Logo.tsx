import { motion } from "framer-motion";

/* Palette sampled from the brand mark */
export const LOGO_COLORS = {
  frame: "#5eb4ff",
  base: "#45a0f4",
  royal: "#2f5cff",
  azure: "#3d8bff",
  light: "#6fbeff",
  white: "#f4f8ff",
  dark: "#17265e",
  teal: "#3fe0d0",
};

/* Pixel squares bursting from the laptop's open corner (viewBox 128x128) */
const PIXELS: { x: number; y: number; s: number; c: string; d: number }[] = [
  { x: 86, y: 6, s: 22, c: LOGO_COLORS.white, d: 0.95 },
  { x: 60, y: 11, s: 14, c: LOGO_COLORS.royal, d: 0.85 },
  { x: 75, y: 31, s: 18, c: LOGO_COLORS.azure, d: 0.75 },
  { x: 55, y: 30, s: 12, c: LOGO_COLORS.light, d: 0.65 },
  { x: 87, y: 49, s: 16, c: LOGO_COLORS.light, d: 0.8 },
  { x: 58, y: 49, s: 11, c: LOGO_COLORS.dark, d: 0.55 },
  { x: 70, y: 57, s: 11, c: LOGO_COLORS.dark, d: 0.7 },
  { x: 41, y: 46, s: 9, c: LOGO_COLORS.white, d: 0.5 },
  { x: 33, y: 61, s: 11, c: LOGO_COLORS.dark, d: 0.45 },
  { x: 46, y: 62, s: 10, c: LOGO_COLORS.royal, d: 0.6 },
  { x: 59, y: 68, s: 10, c: LOGO_COLORS.white, d: 0.9 },
];

const SCREEN_PATH =
  "M30 32 H70 M88 46 V70 A6 6 0 0 1 82 76 H30 A6 6 0 0 1 24 70 V38 A6 6 0 0 1 30 32";
const BASE_PATH = "M20 80 H92 L101 94 Q102.5 98.5 97.5 98.5 H14.5 Q9.5 98.5 11 94 Z";

export default function Logo({
  size = 40,
  animated = false,
  glow = false,
  className = "",
}: {
  size?: number;
  animated?: boolean;
  glow?: boolean;
  className?: string;
}) {
  const Rect = animated ? motion.rect : (props: React.SVGProps<SVGRectElement>) => <rect {...props} />;
  const Path = animated ? motion.path : (props: React.SVGProps<SVGPathElement>) => <path {...props} />;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 118"
      fill="none"
      className={className}
      style={glow ? { filter: "drop-shadow(0 0 14px rgba(61,139,255,.45))" } : undefined}
      aria-label="Dynamic Developments logo"
    >
      {animated && (
        <motion.rect
          x="34" y="84" width="60" height="30" rx="15"
          fill="url(#lg-glow)"
          style={{ transformOrigin: "64px 99px" }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0.8, 0.35], scale: [0.4, 1.3, 1.1] }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      )}
      <defs>
        <linearGradient id="lg-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#25e3ff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#2f5cff" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="lg-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5eb4ff" />
          <stop offset="1" stopColor="#2f7fe8" />
        </linearGradient>
      </defs>

      {/* screen frame (open top-right corner) */}
      <Path
        d={SCREEN_PATH}
        stroke={LOGO_COLORS.frame}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(animated
          ? {
              initial: { pathLength: 0, opacity: 0 },
              animate: { pathLength: 1, opacity: 1 },
              transition: { duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.15 },
            }
          : {})}
      />
      {/* laptop base */}
      <Path
        d={BASE_PATH}
        fill="url(#lg-base)"
        {...(animated
          ? {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] },
            }
          : {})}
      />
      {/* trackpad slot + detail line */}
      <path d="M50 86 H70 L67 90.5 H53 Z" fill="#060a18" opacity="0.85" />
      <rect x="52" y="93.5" width="16" height="2.4" rx="1.2" fill="#060a18" opacity="0.7" />

      {/* pixel burst */}
      {PIXELS.map((p, i) => (
        <Rect
          key={i}
          x={p.x}
          y={p.y}
          width={p.s}
          height={p.s}
          fill={p.c}
          rx={1.5}
          {...(animated
            ? {
                initial: { scale: 0, opacity: 0, rotate: -30 },
                animate: { scale: 1, opacity: 1, rotate: 0 },
                style: { transformOrigin: `${p.x + p.s / 2}px ${p.y + p.s / 2}px` },
                transition: { type: "spring", stiffness: 300, damping: 14, delay: p.d, mass: 0.6 },
              }
            : {})}
        />
      ))}
    </svg>
  );
}

/* Logo mark + wordmark lockup */
export function LogoLockup({
  size = 40,
  showSince = false,
  className = "",
  animated = false,
}: {
  size?: number;
  showSince?: boolean;
  className?: string;
  animated?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Logo size={size} animated={animated} glow />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-[0.14em] text-ice">DYNAMIC</span>
        <span className="mt-1 font-display text-[13px] font-bold tracking-[0.14em] text-gradient-azure">DEVELOPMENTS</span>
        {showSince && (
          <span className="mt-1 font-mono text-[7.5px] tracking-[0.42em]" style={{ color: LOGO_COLORS.teal }}>
            SINCE 2025
          </span>
        )}
      </span>
    </span>
  );
}
