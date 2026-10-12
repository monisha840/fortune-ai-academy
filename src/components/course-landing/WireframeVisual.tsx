import { motion, type Variants } from "framer-motion";
import StageTabs from "./StageTabs";
import { useStageCycle, useVisualPlayback } from "./useVisualPlayback";

// UI/UX signature visual: a product dashboard that is designed in front of the
// visitor, moving from wireframe, to prototype, to polished high-fidelity UI,
// with a designer cursor, measurement guides, a palette chip and a phone mockup.
//
// Playback rule:
//   desktop (>= lg): starts on every page load / reload
//   mobile / tablet: starts only once the visual is scrolled into view
// Decorative only (aria-hidden). Reduced-motion users get the final design.

const STAGES = ["Wireframe", "Prototype", "High-fidelity"] as const;

// Stage-dependent classes: [wireframe, prototype, hi-fi]
const pick = (stage: number, a: string, b: string, c: string) => [a, b, c][stage];

const container: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.09, delayChildren: 0.2 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Designer-cursor waypoints per stage, in % of the browser body.
const CURSOR = [
  { left: "26%", top: "16%" },
  { left: "52%", top: "74%" },
  { left: "40%", top: "47%" },
];

const WireframeVisual = () => {
  const { ref: rootRef, started, reduce } = useVisualPlayback();
  const stage = useStageCycle(started, reduce, STAGES.length, 3200);

  const wire = stage === 0;
  const hifi = stage === 2;
  const bars = [
    [22, 38, 30, 46, 34],
    [40, 55, 48, 66, 58],
    [52, 72, 60, 92, 78],
  ][stage];

  return (
    <div ref={rootRef} className="relative w-full max-w-xl mx-auto lg:mx-0 pb-10 pr-4 sm:pr-8" aria-hidden="true">
      <StageTabs
        stages={STAGES}
        stage={stage}
        layoutId="stage-pill"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        className="relative"
      >
        {/* Browser window */}
        <div
          className={`relative rounded-2xl border overflow-hidden transition-all duration-700 ${pick(
            stage,
            "border-white/15 bg-navy-deep/70",
            "border-white/20 bg-[#0e2547]/80",
            "border-accent/30 bg-[#102a52] shadow-[0_30px_80px_-20px_hsl(37_70%_50%/0.35)]",
          )}`}
        >
          {/* Chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/10">
            <span className="w-2 h-2 rounded-full bg-white/25" />
            <span className="w-2 h-2 rounded-full bg-white/25" />
            <span className="w-2 h-2 rounded-full bg-white/25" />
            <span className="ml-3 h-4 flex-1 max-w-[55%] rounded-full bg-white/[0.07] flex items-center px-2">
              <span className="h-1 w-16 rounded bg-white/25" />
            </span>
          </div>

          <div className="relative flex gap-3 p-3 sm:p-4 min-h-[270px] sm:min-h-[320px]">
            {/* Sidebar */}
            <motion.div variants={item} className="flex flex-col items-center gap-3 pt-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`block h-6 w-6 rounded-lg transition-all duration-700 ${
                    wire
                      ? "border border-dashed border-white/30"
                      : i === 0
                        ? "bg-accent shadow-[0_0_14px_hsl(37_70%_50%/0.5)]"
                        : "bg-white/10"
                  }`}
                />
              ))}
            </motion.div>

            <div className="flex-1 min-w-0 space-y-3">
              {/* Top bar */}
              <motion.div variants={item} className="flex items-center justify-between gap-3">
                <span
                  className={`h-6 flex-1 max-w-[60%] rounded-full transition-all duration-700 ${pick(
                    stage,
                    "border border-dashed border-white/30",
                    "bg-white/[0.08]",
                    "bg-white/[0.12] border border-white/10",
                  )}`}
                />
                <span className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full transition-colors duration-700 ${hifi ? "bg-emerald-400" : "bg-white/25"}`} />
                  <span
                    className={`h-6 w-6 rounded-full transition-all duration-700 ${
                      wire ? "border border-dashed border-white/30" : "bg-gradient-to-br from-accent to-gold-light"
                    }`}
                  />
                </span>
              </motion.div>

              {/* Hero banner */}
              <motion.div
                variants={item}
                className={`relative rounded-xl p-4 overflow-hidden transition-all duration-700 ${pick(
                  stage,
                  "border border-dashed border-white/30",
                  "bg-white/[0.08] border border-white/10",
                  "bg-gradient-to-br from-accent via-[#e0b94a] to-[#8a6a1c] border border-white/10",
                )}`}
              >
                <span className={`block h-2.5 w-2/3 rounded transition-colors duration-700 ${hifi ? "bg-navy" : "bg-white/35"}`} />
                <span className={`mt-2 block h-1.5 w-1/2 rounded transition-colors duration-700 ${hifi ? "bg-navy/55" : "bg-white/20"}`} />
                <span
                  className={`mt-4 inline-block h-6 w-24 rounded-full transition-all duration-700 ${pick(
                    stage,
                    "border border-dashed border-white/30",
                    "bg-white/20",
                    "bg-navy shadow-lg",
                  )}`}
                />
                {hifi && (
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/25 blur-xl"
                  />
                )}
              </motion.div>

              {/* Stat cards with live bars */}
              <div className="grid grid-cols-3 gap-2.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    variants={item}
                    className={`rounded-xl p-2.5 h-[88px] sm:h-[100px] flex flex-col justify-between transition-all duration-700 ${pick(
                      stage,
                      "border border-dashed border-white/30",
                      "bg-white/[0.07] border border-white/10",
                      "bg-white/[0.1] border border-white/15 shadow-lg",
                    )}`}
                  >
                    <span className={`block h-1.5 w-1/2 rounded transition-colors duration-700 ${hifi ? "bg-white/60" : "bg-white/25"}`} />
                    <div className="flex items-end gap-1 h-12 sm:h-14">
                      {bars.map((h, b) => (
                        <span
                          key={b}
                          style={{ height: `${Math.min(100, h + i * 6)}%`, transitionDelay: `${b * 60}ms` }}
                          className={`flex-1 rounded-sm transition-all duration-700 ${
                            wire ? "bg-white/15" : hifi && b === 3 ? "bg-accent" : "bg-white/35"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Measurement guide (prototype stage) */}
            <span
              className={`absolute left-[18%] right-[8%] top-[63%] flex items-center transition-opacity duration-500 ${
                stage === 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="h-px flex-1 bg-sky-400/80" />
              <span className="mx-1.5 rounded bg-sky-400 px-1.5 py-0.5 text-[9px] font-bold text-navy-deep">24 px</span>
              <span className="h-px flex-1 bg-sky-400/80" />
            </span>

            {/* Designer cursor */}
            <motion.div
              className="pointer-events-none absolute z-10"
              animate={started ? CURSOR[stage] : CURSOR[0]}
              transition={{ type: "spring", stiffness: 70, damping: 16 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" className="drop-shadow-lg">
                <path d="M2 2l6.5 15 2.2-6.1L17 8.7z" fill="#D4AF37" stroke="#0B1E3A" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <span className="ml-4 -mt-1 hidden rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold text-accent-foreground sm:inline-block">
                Mentor
              </span>
              {hifi && (
                <motion.span
                  key="click"
                  initial={{ scale: 0.4, opacity: 0.9 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 1.1, delay: 0.9, repeat: Infinity, repeatDelay: 1.6 }}
                  className="absolute -left-2 -top-2 h-8 w-8 rounded-full border-2 border-accent"
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Palette + type chips (appear as the design matures) */}
        <motion.div
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 8 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-3 right-2 sm:right-6 flex items-center gap-1.5 rounded-full border border-white/15 bg-navy-deep/90 backdrop-blur px-2.5 py-1.5"
        >
          <span className="h-3.5 w-3.5 rounded-full bg-accent" />
          <span className="h-3.5 w-3.5 rounded-full bg-navy ring-1 ring-white/30" />
          <span className="h-3.5 w-3.5 rounded-full bg-white" />
          <span className="ml-1 text-[10px] font-semibold text-white/80">#D4AF37</span>
        </motion.div>

        <motion.div
          animate={{ opacity: hifi ? 1 : 0, x: hifi ? 0 : -10 }}
          transition={{ duration: 0.5 }}
          className="absolute -left-5 bottom-14 hidden rounded-xl border border-white/15 bg-navy-deep/90 backdrop-blur px-3 py-2 sm:block"
        >
          <span className="block font-display font-bold text-white text-lg leading-none">Aa</span>
          <span className="block text-[9px] text-white/55 mt-1">Space Grotesk</span>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          animate={started && !reduce ? { y: [0, -9, 0] } : { y: 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-6 -bottom-8 hidden w-[27%] max-w-[132px] sm:block"
        >
          <div
            className={`rounded-[1.6rem] border-2 p-1.5 transition-all duration-700 ${pick(
              stage,
              "border-white/20 bg-navy-deep/80",
              "border-white/30 bg-[#0e2547]",
              "border-accent/50 bg-[#102a52] shadow-[0_20px_50px_-10px_hsl(37_70%_50%/0.45)]",
            )}`}
          >
            <div className="rounded-[1.2rem] bg-navy-deep/70 p-2 space-y-2 aspect-[9/17]">
              <span className="mx-auto block h-1 w-8 rounded bg-white/20" />
              <span className="flex items-center gap-1.5">
                <span className={`h-5 w-5 rounded-full transition-all duration-700 ${wire ? "border border-dashed border-white/30" : "bg-accent"}`} />
                <span className="h-1.5 flex-1 rounded bg-white/25" />
              </span>
              <span
                className={`block h-[34%] rounded-lg transition-all duration-700 ${pick(
                  stage,
                  "border border-dashed border-white/30",
                  "bg-white/10",
                  "bg-gradient-to-br from-accent to-[#8a6a1c]",
                )}`}
              />
              <span className="block h-1.5 w-4/5 rounded bg-white/25" />
              <span className="block h-1.5 w-3/5 rounded bg-white/15" />
              <span
                className={`block h-5 rounded-full transition-all duration-700 ${wire ? "border border-dashed border-white/30" : "bg-accent"}`}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WireframeVisual;
