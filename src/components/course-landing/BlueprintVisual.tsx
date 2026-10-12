import { motion } from "framer-motion";
import StageTabs from "./StageTabs";
import { useStageCycle, useVisualPlayback } from "./useVisualPlayback";

// CAD signature visual: an engineering drawing that builds itself. The part
// outline is drafted line by line, dimensions and centre lines appear, then the
// part is extruded into a shaded 3D model. Decorative only. Playback rule is
// shared with the other visuals (desktop on load, mobile on scroll).

const STAGES = ["2D Drafting", "Dimensioning", "3D Model"] as const;

const LINE = "#7dd3fc"; // blueprint line colour
const GOLD = "#D4AF37";

const BlueprintVisual = () => {
  const { ref, started, reduce } = useVisualPlayback();
  const stage = useStageCycle(started, reduce, STAGES.length, 3600);

  const draw = (delay = 0) => ({
    initial: { pathLength: 0 },
    // Re-draws every time the cycle returns to stage 0.
    animate: { pathLength: started ? (stage === 0 ? [0, 1] : 1) : 0 },
    transition: { duration: 1.8, delay, ease: "easeInOut" as const },
  });

  const model = stage === 2;

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto lg:mx-0 pb-6" aria-hidden="true">
      <StageTabs
        stages={STAGES}
        stage={stage}
        layoutId="blueprint-pill"
        tool={stage === 2 ? "SolidWorks" : "AutoCAD"}
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={started ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative rounded-2xl border overflow-hidden transition-all duration-700 ${
          model
            ? "border-accent/40 shadow-[0_30px_80px_-20px_hsl(37_70%_50%/0.35)]"
            : "border-white/15"
        } bg-[#0a2247]`}
      >
        <svg viewBox="0 0 420 290" className="block w-full h-auto" role="presentation">
          <defs>
            <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="white" strokeOpacity="0.06" />
            </pattern>
            <linearGradient id="bp-front" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E7C65A" />
              <stop offset="100%" stopColor="#9a7620" />
            </linearGradient>
          </defs>
          <rect width="420" height="290" fill="url(#bp-grid)" />

          {/* Centre lines */}
          <motion.g
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            stroke={LINE}
            strokeOpacity="0.7"
            strokeDasharray="10 4 2 4"
          >
            <line x1="52" y1="155" x2="298" y2="155" />
            <line x1="175" y1="72" x2="175" y2="238" />
          </motion.g>

          {/* 3D faces (top + right) */}
          <motion.polygon
            points="70,90 100,66 310,66 280,90"
            fill="#c9a22f"
            stroke={GOLD}
            strokeWidth="1.5"
            animate={{ opacity: model ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.polygon
            points="280,90 310,66 310,196 280,220"
            fill="#7a5c12"
            stroke={GOLD}
            strokeWidth="1.5"
            animate={{ opacity: model ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />

          {/* Front face: drafted outline, then filled */}
          <motion.rect
            x="70"
            y="90"
            width="210"
            height="130"
            fill="url(#bp-front)"
            animate={{ fillOpacity: model ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            stroke={model ? GOLD : LINE}
            strokeWidth="2"
          />
          <motion.rect
            x="70"
            y="90"
            width="210"
            height="130"
            fill="none"
            stroke={model ? GOLD : LINE}
            strokeWidth="2.5"
            {...draw(0)}
          />

          {/* Holes */}
          <motion.circle
            cx="175"
            cy="155"
            r="34"
            fill="#0a2247"
            animate={{ fillOpacity: model ? 1 : 0 }}
            stroke={model ? "#fff" : LINE}
            strokeWidth="2"
            {...draw(0.5)}
          />
          {[
            [96, 114],
            [254, 114],
            [96, 196],
            [254, 196],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="8"
              fill="#0a2247"
              stroke={model ? "#fff" : LINE}
              strokeWidth="2"
              {...draw(0.9 + i * 0.12)}
            />
          ))}

          {/* Dimensions */}
          <motion.g
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            stroke="#fca5a5"
            strokeWidth="1.5"
            fill="none"
          >
            <line x1="70" y1="256" x2="280" y2="256" />
            <line x1="70" y1="248" x2="70" y2="264" />
            <line x1="280" y1="248" x2="280" y2="264" />
            <line x1="338" y1="90" x2="338" y2="220" />
            <line x1="330" y1="90" x2="346" y2="90" />
            <line x1="330" y1="220" x2="346" y2="220" />
          </motion.g>
          <motion.g
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            fill="#fecaca"
            fontSize="12"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            <text x="175" y="249" textAnchor="middle">210</text>
            <text x="352" y="160" textAnchor="start">130</text>
            <text x="175" y="160" textAnchor="middle" fill="#fff">Ø68</text>
          </motion.g>

          {/* Title block */}
          <g fill="none" stroke="white" strokeOpacity="0.35">
            <rect x="296" y="238" width="116" height="42" />
            <line x1="296" y1="252" x2="412" y2="252" />
            <line x1="346" y1="252" x2="346" y2="280" />
          </g>
          <g fill="white" fillOpacity="0.7" fontSize="7.5" fontFamily="Inter, sans-serif" fontWeight="600">
            <text x="301" y="248">PART: FLANGE-01</text>
            <text x="301" y="269">SCALE 1:2</text>
            <text x="351" y="269">AL 6061</text>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default BlueprintVisual;
