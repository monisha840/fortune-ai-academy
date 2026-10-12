import { motion } from "framer-motion";
import { Play } from "lucide-react";
import StageTabs from "./StageTabs";
import { useStageCycle, useVisualPlayback } from "./useVisualPlayback";

// Video Editing signature visual: an editing timeline. Clips are cut on the
// timeline, graded (the preview and clips take on colour), then the project is
// exported with a progress bar, while a playhead sweeps across continuously.
// Decorative only. Playback rule is shared with the other visuals (desktop on
// load, mobile on scroll).

const STAGES = ["Cut", "Grade", "Export"] as const;
const TOOL = ["Premiere Pro", "DaVinci Resolve", "After Effects"] as const;

// Clip layout on the main video track, in % of the track width.
const CLIPS = [
  { left: 0, width: 27 },
  { left: 29, width: 24 },
  { left: 55, width: 20 },
  { left: 77, width: 23 },
];
// Graded colours per clip (stage 1 and 2).
const GRADED = ["from-teal-400 to-teal-600", "from-orange-300 to-orange-500", "from-sky-400 to-indigo-500", "from-amber-300 to-amber-500"];
// Deterministic waveform heights.
const WAVE = Array.from({ length: 44 }, (_, i) => 22 + Math.round(Math.abs(Math.sin(i * 1.7) * 55 + Math.cos(i * 0.6) * 20)));

const TimelineVisual = () => {
  const { ref, started, reduce } = useVisualPlayback();
  const stage = useStageCycle(started, reduce, STAGES.length, 3800);
  const graded = stage >= 1;
  const exporting = stage === 2;

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto lg:mx-0 pb-6" aria-hidden="true">
      <StageTabs
        stages={STAGES}
        stage={stage}
        layoutId="timeline-pill"
        tool={TOOL[stage]}
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={started ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative rounded-2xl border overflow-hidden bg-[#0a2247] p-3 sm:p-4 transition-all duration-700 ${
          exporting ? "border-accent/40 shadow-[0_30px_80px_-20px_hsl(37_70%_50%/0.35)]" : "border-white/15"
        }`}
      >
        {/* Preview monitor */}
        <div
          className={`relative aspect-video rounded-xl overflow-hidden border border-white/10 transition-all duration-1000 ${
            stage === 0
              ? "bg-gradient-to-br from-slate-600 to-slate-800"
              : stage === 1
                ? "bg-gradient-to-br from-teal-500 via-sky-600 to-orange-400"
                : "bg-gradient-to-br from-amber-300 via-accent to-[#8a6a1c]"
          }`}
        >
          {/* Safe-area frame */}
          <span className="absolute inset-3 sm:inset-4 rounded-md border border-white/30" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/35 backdrop-blur">
              <Play size={22} className="ml-0.5 text-white" fill="white" />
            </span>
          </span>
          <span className="absolute left-3 top-3 rounded bg-black/45 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white">
            {stage === 0 ? "RAW" : stage === 1 ? "GRADED" : "4K"}
          </span>
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded bg-black/45 px-1.5 py-0.5 text-[9px] font-bold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> REC
          </span>
          <span className="absolute left-3 right-3 bottom-3 h-1 rounded-full bg-white/25 overflow-hidden">
            <motion.span
              className="block h-full w-full origin-left bg-white"
              initial={{ scaleX: 0 }}
              animate={started && !reduce ? { scaleX: [0, 1] } : { scaleX: 0.6 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </span>
        </div>

        {/* Timeline */}
        <div className="relative mt-3 sm:mt-4 space-y-1.5">
          {/* Title track */}
          <div className="relative h-4 sm:h-5">
            {[
              { left: 6, width: 18 },
              { left: 58, width: 16 },
            ].map((c) => (
              <span
                key={c.left}
                style={{ left: `${c.left}%`, width: `${c.width}%` }}
                className={`absolute inset-y-0 rounded-md transition-colors duration-700 ${exporting ? "bg-accent" : "bg-white/25"}`}
              />
            ))}
          </div>

          {/* Main video track */}
          <div className="relative h-9 sm:h-11">
            {CLIPS.map((c, i) => (
              <span
                key={i}
                style={{ left: `${c.left}%`, width: `${c.width}%` }}
                className={`absolute inset-y-0 rounded-md bg-gradient-to-r transition-all duration-1000 ${
                  graded ? GRADED[i] : "from-slate-500 to-slate-600"
                }`}
              >
                {/* Frame ticks */}
                <span className="absolute inset-0 rounded-md opacity-25 bg-[repeating-linear-gradient(90deg,transparent_0_9px,rgba(0,0,0,0.5)_9px_10px)]" />
              </span>
            ))}
          </div>

          {/* Audio track */}
          <div className="flex h-7 sm:h-8 items-center gap-[2px] rounded-md bg-white/[0.06] px-1.5">
            {WAVE.map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-full transition-colors duration-700 ${exporting ? "bg-accent" : "bg-white/35"}`}
              />
            ))}
          </div>

          {/* Playhead */}
          <motion.span
            className="pointer-events-none absolute -top-1 bottom-0 w-px bg-accent"
            initial={{ left: "0%" }}
            animate={started && !reduce ? { left: ["0%", "100%"] } : { left: "62%" }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-1 -left-[5px] h-0 w-0 border-x-[5.5px] border-t-[8px] border-x-transparent border-t-accent" />
          </motion.span>
        </div>

        {/* Export bar */}
        <motion.div
          animate={{ opacity: exporting ? 1 : 0, y: exporting ? 0 : 8 }}
          transition={{ duration: 0.5 }}
          className="mt-3 flex items-center gap-3"
        >
          <span className="text-[10px] font-bold tracking-wider text-white/70">EXPORT</span>
          <span className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
            <motion.span
              key={exporting ? "run" : "idle"}
              className="block h-full origin-left rounded-full bg-gradient-to-r from-accent to-gold-light"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: exporting ? 1 : 0 }}
              style={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
          </span>
          <span className="text-[10px] font-bold text-accent">H.264</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TimelineVisual;
