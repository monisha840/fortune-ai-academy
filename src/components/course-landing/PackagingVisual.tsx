import { motion } from "framer-motion";
import StageTabs from "./StageTabs";
import { useStageCycle, useVisualPlayback } from "./useVisualPlayback";

// Packaging signature visual: a flat dieline is drawn (cut lines solid, fold
// lines dashed, crop marks), its side panels fold in, and a finished 3D box
// mockup appears with a CMYK chip. Decorative only. Playback rule is shared
// with the other visuals (desktop on load, mobile on scroll).

const STAGES = ["Dieline", "Fold", "Mockup"] as const;
const TOOL = ["Illustrator", "Dieline", "KeyShot"] as const;

const CUT = "#7dd3fc";
const FOLD = "#fca5a5";
const GOLD = "#D4AF37";

const PackagingVisual = () => {
  const { ref, started, reduce } = useVisualPlayback();
  const stage = useStageCycle(started, reduce, STAGES.length, 3600);

  const draw = (delay = 0) => ({
    initial: { pathLength: 0 },
    // Re-draws every time the cycle returns to the dieline stage.
    animate: { pathLength: started ? (stage === 0 ? [0, 1] : 1) : 0 },
    transition: { duration: 1.6, delay, ease: "easeInOut" as const },
  });

  const mock = stage === 2;
  const sideScale = [1, 0.32, 0][stage];

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto lg:mx-0 pb-6" aria-hidden="true">
      <StageTabs
        stages={STAGES}
        stage={stage}
        layoutId="packaging-pill"
        tool={TOOL[stage]}
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={started ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative rounded-2xl border overflow-hidden bg-[#0a2247] transition-all duration-700 ${
          mock ? "border-accent/40 shadow-[0_30px_80px_-20px_hsl(37_70%_50%/0.35)]" : "border-white/15"
        }`}
      >
        <svg viewBox="0 0 420 300" className="block w-full h-auto" role="presentation">
          <defs>
            <pattern id="pk-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="white" strokeOpacity="0.06" />
            </pattern>
            <linearGradient id="pk-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F3DA85" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="pk-left" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E0BA45" />
              <stop offset="100%" stopColor="#B08A22" />
            </linearGradient>
          </defs>
          <rect width="420" height="300" fill="url(#pk-grid)" />

          {/* Crop marks */}
          <motion.g
            animate={{ opacity: stage === 2 ? 0 : 0.7 }}
            transition={{ duration: 0.5 }}
            stroke="#fff"
            strokeOpacity="0.6"
            strokeWidth="1"
          >
            <path d="M96 52 v14 M90 58 h14" />
            <path d="M414 52 v14 M408 58 h14" />
            <path d="M96 252 v-14 M90 246 h14" />
            <path d="M414 252 v-14 M408 246 h14" />
          </motion.g>

          {/* DIELINE */}
          <motion.g
            animate={{ opacity: [1, 0.75, 0][stage] }}
            transition={{ duration: 0.7 }}
          >
            {/* Centre column: top flap, front panel, bottom panel */}
            <motion.path
              d="M150 110 L150 82 Q150 72 160 72 L240 72 Q250 72 250 82 L250 110"
              fill="rgba(125,211,252,0.06)"
              stroke={CUT}
              strokeWidth="2"
              {...draw(0)}
            />
            <motion.rect x="150" y="110" width="100" height="90" fill="rgba(125,211,252,0.1)" stroke={CUT} strokeWidth="2" {...draw(0.2)} />
            <motion.rect x="150" y="200" width="100" height="40" fill="rgba(125,211,252,0.06)" stroke={CUT} strokeWidth="2" {...draw(0.4)} />

            {/* Left side panel folds towards the front panel */}
            <motion.g animate={{ scaleX: sideScale }} transition={{ duration: 0.9, ease: "easeInOut" }} style={{ originX: 1, originY: 0.5 }}>
              <motion.rect x="110" y="110" width="40" height="90" fill="rgba(125,211,252,0.08)" stroke={CUT} strokeWidth="2" {...draw(0.6)} />
            </motion.g>

            {/* Right side, back panel and glue flap fold together */}
            <motion.g animate={{ scaleX: sideScale }} transition={{ duration: 0.9, ease: "easeInOut" }} style={{ originX: 0, originY: 0.5 }}>
              <motion.rect x="250" y="110" width="40" height="90" fill="rgba(125,211,252,0.08)" stroke={CUT} strokeWidth="2" {...draw(0.8)} />
              <motion.rect x="290" y="110" width="100" height="90" fill="rgba(125,211,252,0.1)" stroke={CUT} strokeWidth="2" {...draw(1)} />
              <motion.path d="M390 116 L406 126 L406 184 L390 194" fill="none" stroke={CUT} strokeWidth="2" {...draw(1.2)} />
            </motion.g>

            {/* Fold lines (dashed) */}
            <motion.g
              animate={{ opacity: stage === 0 ? 1 : 0.6 }}
              stroke={FOLD}
              strokeWidth="1.5"
              strokeDasharray="5 4"
            >
              <line x1="150" y1="110" x2="150" y2="200" />
              <line x1="250" y1="110" x2="250" y2="200" />
              <line x1="290" y1="110" x2="290" y2="200" />
              <line x1="150" y1="110" x2="250" y2="110" />
              <line x1="150" y1="200" x2="250" y2="200" />
            </motion.g>

            {/* Brand mark on the front panel */}
            <circle cx="200" cy="148" r="10" fill="none" stroke={GOLD} strokeWidth="2" />
            <rect x="178" y="168" width="44" height="4" rx="2" fill="#fff" fillOpacity="0.45" />
            <rect x="186" y="177" width="28" height="3" rx="1.5" fill="#fff" fillOpacity="0.25" />
          </motion.g>

          {/* 3D BOX MOCKUP */}
          <motion.g
            animate={{ opacity: [0, 0.3, 1][stage], scale: mock ? 1 : 0.92, y: mock ? 0 : 6 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <polygon points="130,120 220,150 220,250 130,220" fill="url(#pk-left)" stroke={GOLD} strokeWidth="1.5" />
            <polygon points="220,150 310,120 310,220 220,250" fill="#7a5c12" stroke={GOLD} strokeWidth="1.5" />
            <polygon points="130,120 220,90 310,120 220,150" fill="url(#pk-top)" stroke={GOLD} strokeWidth="1.5" />
            {/* Label printed on the left face, skewed to match its slope */}
            <g transform="matrix(1 0.3333 0 1 0 -43.33)">
              <rect x="146" y="150" width="60" height="44" rx="4" fill="#0a2247" fillOpacity="0.9" />
              <circle cx="176" cy="166" r="7" fill="none" stroke={GOLD} strokeWidth="1.8" />
              <rect x="158" y="179" width="36" height="3" rx="1.5" fill="#fff" fillOpacity="0.7" />
              <rect x="164" y="186" width="24" height="2.5" rx="1.2" fill="#fff" fillOpacity="0.4" />
            </g>
            {/* Soft shadow */}
            <ellipse cx="220" cy="262" rx="92" ry="9" fill="#000" fillOpacity="0.25" />
          </motion.g>
        </svg>

        {/* CMYK chip (mockup stage) */}
        <motion.div
          animate={{ opacity: mock ? 1 : 0, y: mock ? 0 : 8 }}
          transition={{ duration: 0.5 }}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-navy-deep/90 backdrop-blur px-2.5 py-1.5"
        >
          <span className="h-3.5 w-3.5 rounded-full bg-cyan-400" />
          <span className="h-3.5 w-3.5 rounded-full bg-fuchsia-500" />
          <span className="h-3.5 w-3.5 rounded-full bg-yellow-300" />
          <span className="h-3.5 w-3.5 rounded-full bg-black ring-1 ring-white/30" />
          <span className="ml-1 text-[10px] font-semibold text-white/80">CMYK</span>
        </motion.div>

        {/* Die-cut legend (dieline stage) */}
        <motion.div
          animate={{ opacity: stage === 0 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute left-3 bottom-3 flex items-center gap-3 rounded-full border border-white/15 bg-navy-deep/90 backdrop-blur px-3 py-1.5 text-[10px] font-semibold text-white/75"
        >
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-sky-300" /> Cut
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 border-t-2 border-dashed border-red-300" /> Fold
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PackagingVisual;
