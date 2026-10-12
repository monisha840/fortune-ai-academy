import { motion } from "framer-motion";
import StageTabs from "./StageTabs";
import { useStageCycle, useVisualPlayback } from "./useVisualPlayback";

// Textile & Garment signature visual: a garment is designed in front of the
// visitor. A flat sketch is drawn, turned into a pattern piece (seam allowance,
// grain line, notches, tape measure), then finished as stitched fabric with
// swatches. Decorative only. Playback rule is shared with the other visuals
// (desktop on load, mobile on scroll).

const STAGES = ["Sketch", "Pattern", "Garment"] as const;
const TOOL = ["Illustrator", "Pattern making", "CLO 3D"] as const;

const LINE = "#7dd3fc";
const GOLD = "#D4AF37";

// A simple tee silhouette, centred on x = 210.
const TEE =
  "M150 60 L180 48 Q210 68 240 48 L270 60 L320 100 L292 134 L266 116 L266 252 L154 252 L154 116 L128 134 L100 100 Z";

const SWATCHES = [
  { name: "Gold", color: "#D4AF37" },
  { name: "Navy", color: "#1b3a6b" },
  { name: "Ivory", color: "#f4efe2" },
];

const GarmentVisual = () => {
  const { ref, started, reduce } = useVisualPlayback();
  const stage = useStageCycle(started, reduce, STAGES.length, 3600);

  const draw = (delay = 0) => ({
    initial: { pathLength: 0 },
    // Re-drafts every time the cycle returns to the sketch stage.
    animate: { pathLength: started ? (stage === 0 ? [0, 1] : 1) : 0 },
    transition: { duration: 1.8, delay, ease: "easeInOut" as const },
  });

  const finished = stage === 2;

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto lg:mx-0 pb-6" aria-hidden="true">
      <StageTabs
        stages={STAGES}
        stage={stage}
        layoutId="garment-pill"
        tool={TOOL[stage]}
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={started ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative rounded-2xl border overflow-hidden bg-[#0a2247] transition-all duration-700 ${
          finished ? "border-accent/40 shadow-[0_30px_80px_-20px_hsl(37_70%_50%/0.35)]" : "border-white/15"
        }`}
      >
        <svg viewBox="0 0 420 300" className="block w-full h-auto" role="presentation">
          <defs>
            <pattern id="g-mat" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.12" />
            </pattern>
            <pattern id="g-weave" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#fff" strokeOpacity="0.2" strokeWidth="3" />
            </pattern>
            <pattern id="g-tape" width="10" height="14" patternUnits="userSpaceOnUse">
              <line x1="0.5" y1="0" x2="0.5" y2="7" stroke="#0a2247" strokeWidth="1.2" />
            </pattern>
            <linearGradient id="g-fab" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E7C65A" />
              <stop offset="100%" stopColor="#9a7620" />
            </linearGradient>
          </defs>

          {/* Cutting mat */}
          <rect width="420" height="300" fill="url(#g-mat)" />

          {/* Fabric fill + weave (garment stage) */}
          <motion.path
            d={TEE}
            fill="url(#g-fab)"
            animate={{ fillOpacity: finished ? 1 : 0 }}
            transition={{ duration: 0.9 }}
          />
          <motion.path d={TEE} fill="url(#g-weave)" animate={{ opacity: finished ? 1 : 0 }} transition={{ duration: 0.9 }} />

          {/* Seam allowance (pattern stage and later) */}
          <motion.path
            d={TEE}
            fill="none"
            stroke={finished ? "#fff" : LINE}
            strokeOpacity={finished ? 0.55 : 0.8}
            strokeWidth="1.4"
            strokeDasharray="6 5"
            transform="translate(210 150) scale(0.93) translate(-210 -150)"
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />

          {/* Collar rib */}
          <motion.path
            d="M182 52 Q210 76 238 52"
            fill="none"
            stroke={finished ? "#0a2247" : LINE}
            strokeWidth="5"
            strokeLinecap="round"
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />

          {/* Outline: drafted line by line */}
          <motion.path
            d={TEE}
            fill="none"
            stroke={finished ? GOLD : LINE}
            strokeWidth="2.6"
            strokeLinejoin="round"
            {...draw(0)}
          />

          {/* Grain line + notches (pattern stage and later) */}
          <motion.g
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            stroke={finished ? "#0a2247" : "#fca5a5"}
            strokeWidth="1.6"
            fill="none"
          >
            <line x1="210" y1="104" x2="210" y2="226" />
            <path d="M204 112 L210 102 L216 112" />
            <path d="M204 218 L210 228 L216 218" />
            <path d="M154 176 h9" />
            <path d="M266 176 h-9" />
            <path d="M154 232 h9" />
            <path d="M266 232 h-9" />
          </motion.g>
          <motion.text
            x="222"
            y="170"
            fontSize="9"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
            fill={finished ? "#0a2247" : "#fecaca"}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            GRAIN
          </motion.text>

          {/* Stitching along the hem and sleeves (garment stage) */}
          <motion.g
            animate={{ opacity: finished ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          >
            <motion.line
              x1="162"
              y1="242"
              x2="258"
              y2="242"
              strokeDasharray="6 5"
              animate={reduce ? undefined : { strokeDashoffset: [0, -22] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.line
              x1="108"
              y1="106"
              x2="132"
              y2="124"
              strokeDasharray="5 4"
              animate={reduce ? undefined : { strokeDashoffset: [0, -18] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.line
              x1="312"
              y1="106"
              x2="288"
              y2="124"
              strokeDasharray="5 4"
              animate={reduce ? undefined : { strokeDashoffset: [0, -18] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </motion.g>

          {/* Tape measure (pattern stage and later) */}
          <motion.g animate={{ opacity: stage >= 1 ? 1 : 0 }} transition={{ duration: 0.6 }}>
            <rect x="96" y="268" width="228" height="14" rx="2" fill="#E7C65A" />
            <rect x="96" y="268" width="228" height="14" rx="2" fill="url(#g-tape)" />
          </motion.g>
        </svg>

        {/* Fabric swatches (garment stage) */}
        <motion.div
          animate={{ opacity: finished ? 1 : 0, y: finished ? 0 : 8 }}
          transition={{ duration: 0.5 }}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-navy-deep/90 backdrop-blur px-2.5 py-1.5"
        >
          {SWATCHES.map((s) => (
            <span key={s.name} className="h-4 w-4 rounded-full ring-1 ring-white/30" style={{ background: s.color }} />
          ))}
          <span className="ml-1 text-[10px] font-semibold text-white/80">Fabric</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GarmentVisual;
