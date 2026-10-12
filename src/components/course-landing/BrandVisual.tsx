import { motion } from "framer-motion";
import StageTabs from "./StageTabs";
import { useStageCycle, useVisualPlayback } from "./useVisualPlayback";

// Graphic Design signature visual: a brand is built in front of the visitor.
// A logo mark is constructed on guides, grows into a brand kit (palette, type,
// clear space), then lands on real applications (business card, social post,
// tote). Decorative only. Playback rule is shared with the other visuals
// (desktop on load, mobile on scroll).

const STAGES = ["Logo", "Brand kit", "Applications"] as const;
const TOOL = ["Illustrator", "InDesign", "Photoshop"] as const;

const GUIDE = "#7dd3fc";
const GOLD = "#D4AF37";
const NAVY = "#0B1E3A";

const Mark = ({ s = 1, fill = true }: { s?: number; fill?: boolean }) => (
  <g transform={`scale(${s})`}>
    <rect x="-50" y="-50" width="100" height="100" rx="26" fill={fill ? GOLD : "none"} />
    <circle cx="-8" cy="10" r="28" fill={NAVY} />
    <circle cx="20" cy="-20" r="11" fill="#fff" />
  </g>
);

const BrandVisual = () => {
  const { ref, started, reduce } = useVisualPlayback();
  const stage = useStageCycle(started, reduce, STAGES.length, 3800);

  const markPos = [
    { x: 210, y: 150, scale: 1 },
    { x: 118, y: 150, scale: 0.7 },
    { x: 210, y: 150, scale: 0.7 },
  ][stage];

  const draw = (delay = 0) => ({
    initial: { pathLength: 0 },
    animate: { pathLength: started ? (stage === 0 ? [0, 1] : 1) : 0 },
    transition: { duration: 1.6, delay, ease: "easeInOut" as const },
  });

  const apps = stage === 2;

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto lg:mx-0 pb-6" aria-hidden="true">
      <StageTabs
        stages={STAGES}
        stage={stage}
        layoutId="brand-pill"
        tool={TOOL[stage]}
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={started ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative rounded-2xl border overflow-hidden bg-[#0a2247] transition-all duration-700 ${
          apps ? "border-accent/40 shadow-[0_30px_80px_-20px_hsl(37_70%_50%/0.35)]" : "border-white/15"
        }`}
      >
        <svg viewBox="0 0 420 300" className="block w-full h-auto" role="presentation">
          <defs>
            <pattern id="bd-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.12" />
            </pattern>
            <linearGradient id="bd-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F3DA85" />
              <stop offset="100%" stopColor="#B08A22" />
            </linearGradient>
          </defs>
          <rect width="420" height="300" fill="url(#bd-dots)" />

          {/* STAGE 0 + 1: the logo mark, moving between positions */}
          <motion.g
            animate={{ x: markPos.x, y: markPos.y, scale: markPos.scale, opacity: apps ? 0 : 1 }}
            initial={false}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ originX: 0, originY: 0 }}
          >
            {/* Construction guides (logo stage) */}
            <motion.g
              animate={{ opacity: stage === 0 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              stroke={GUIDE}
              strokeOpacity="0.75"
              fill="none"
            >
              <circle r="78" strokeDasharray="5 5" />
              <circle r="52" strokeDasharray="3 4" />
              <line x1="-96" y1="0" x2="96" y2="0" strokeDasharray="8 4 2 4" />
              <line x1="0" y1="-96" x2="0" y2="96" strokeDasharray="8 4 2 4" />
              <rect x="-50" y="-50" width="100" height="100" rx="26" />
              {[
                [-50, -50],
                [50, -50],
                [50, 50],
                [-50, 50],
              ].map(([x, y]) => (
                <rect key={`${x}${y}`} x={x - 3.5} y={y - 3.5} width="7" height="7" fill={NAVY} stroke={GUIDE} />
              ))}
            </motion.g>

            {/* Mark: outline drafts, then fills */}
            <motion.rect
              x="-50"
              y="-50"
              width="100"
              height="100"
              rx="26"
              fill="url(#bd-gold)"
              animate={{ fillOpacity: stage === 0 ? [0, 0, 1] : 1 }}
              transition={{ duration: 2.2 }}
            />
            <motion.rect
              x="-50"
              y="-50"
              width="100"
              height="100"
              rx="26"
              fill="none"
              stroke={GOLD}
              strokeWidth="3"
              {...draw(0)}
            />
            <motion.circle cx="-8" cy="10" r="28" fill={NAVY} {...draw(0.5)} stroke={GUIDE} strokeWidth="1.5" />
            <motion.circle cx="20" cy="-20" r="11" fill="#fff" {...draw(0.9)} stroke={GUIDE} strokeWidth="1.5" />

            {/* Clear-space box (brand kit stage) */}
            <motion.rect
              x="-74"
              y="-74"
              width="148"
              height="148"
              rx="6"
              fill="none"
              stroke="#fca5a5"
              strokeDasharray="4 4"
              animate={{ opacity: stage === 1 ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.g>

          {/* STAGE 1: palette + type */}
          <motion.g
            animate={{ opacity: stage === 1 ? 1 : 0, x: stage === 1 ? 0 : 16 }}
            transition={{ duration: 0.7 }}
          >
            {[
              { c: GOLD, y: 62 },
              { c: NAVY, y: 106 },
              { c: "#E7C65A", y: 150 },
              { c: "#f4efe2", y: 194 },
            ].map((s) => (
              <rect key={s.c} x="232" y={s.y} width="40" height="36" rx="10" fill={s.c} stroke="#fff" strokeOpacity="0.35" />
            ))}
            <text x="290" y="86" fill="#fff" fillOpacity="0.8" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">
              #D4AF37
            </text>
            <text x="290" y="130" fill="#fff" fillOpacity="0.55" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">
              #0B1E3A
            </text>
            <text x="318" y="184" fill="#fff" fontSize="46" fontWeight="700" fontFamily="'Space Grotesk', sans-serif">
              Aa
            </text>
            <text x="290" y="212" fill="#fff" fillOpacity="0.6" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">
              Space Grotesk + Inter
            </text>
          </motion.g>

          {/* STAGE 2: applications */}
          <motion.g
            animate={{ opacity: apps ? 1 : 0, y: apps ? 0 : 14 }}
            transition={{ duration: 0.8 }}
          >
            {/* Business card (two cards, slightly rotated) */}
            <g transform="rotate(-7 120 110)">
              <rect x="44" y="70" width="150" height="88" rx="9" fill="#E7C65A" />
            </g>
            <g transform="rotate(-3 120 110) translate(0 -4)">
              <rect x="40" y="72" width="150" height="88" rx="9" fill={NAVY} stroke={GOLD} strokeWidth="1.5" />
              <g transform="translate(76 116)">
                <Mark s={0.34} />
              </g>
              <rect x="104" y="100" width="64" height="5" rx="2.5" fill="#fff" fillOpacity="0.85" />
              <rect x="104" y="112" width="44" height="4" rx="2" fill="#fff" fillOpacity="0.45" />
              <rect x="104" y="132" width="52" height="3" rx="1.5" fill={GOLD} />
            </g>

            {/* Social post */}
            <rect x="232" y="40" width="132" height="132" rx="14" fill="url(#bd-gold)" />
            <g transform="translate(298 98)">
              <circle r="38" fill="#fff" fillOpacity="0.22" />
              <Mark s={0.52} />
            </g>
            <rect x="244" y="146" width="56" height="5" rx="2.5" fill={NAVY} fillOpacity="0.75" />
            <rect x="244" y="156" width="36" height="4" rx="2" fill={NAVY} fillOpacity="0.4" />

            {/* Tote bag */}
            <path d="M82 196 q0 -26 24 -26 q24 0 24 26" fill="none" stroke="#f4efe2" strokeWidth="4" strokeLinecap="round" />
            <rect x="66" y="194" width="80" height="84" rx="7" fill="#f4efe2" />
            <g transform="translate(106 236)">
              <Mark s={0.42} />
            </g>
            <rect x="240" y="196" width="124" height="6" rx="3" fill="#fff" fillOpacity="0.4" />
            <rect x="240" y="212" width="86" height="5" rx="2.5" fill="#fff" fillOpacity="0.22" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};

export default BrandVisual;
