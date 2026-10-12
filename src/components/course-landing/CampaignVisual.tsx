import { motion, type Variants } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Heart } from "lucide-react";
import StageTabs from "./StageTabs";
import { useStageCycle, useVisualPlayback } from "./useVisualPlayback";

// Digital Marketing signature visual: a live campaign dashboard. A funnel fills
// stage by stage (awareness to revenue), a growth line draws itself, channel
// chips light up in turn, and KPI chips and an ad preview float around it.
// Decorative only: no real numbers are claimed. Playback rule is shared with
// the other visuals (desktop on load, mobile on scroll).

const STAGES = ["Awareness", "Traffic", "Leads", "Revenue"] as const;
const FUNNEL = [
  { label: "Impressions", width: 100 },
  { label: "Clicks", width: 74 },
  { label: "Leads", width: 49 },
  { label: "Customers", width: 28 },
];
const CHANNELS = ["Google Ads", "Meta Ads", "SEO", "Email"];

const container: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CampaignVisual = () => {
  const { ref, started, reduce } = useVisualPlayback();
  const stage = useStageCycle(started, reduce, STAGES.length, 2800);

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto lg:mx-0 pb-10 pr-3 sm:pr-8" aria-hidden="true">
      <StageTabs
        stages={STAGES}
        stage={stage}
        layoutId="campaign-pill"
      />

      <motion.div variants={container} initial="hidden" animate={started ? "show" : "hidden"} className="relative">
        <div className="relative rounded-2xl border border-accent/25 bg-[#102a52] overflow-hidden shadow-[0_30px_80px_-20px_hsl(37_70%_50%/0.3)]">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
            <span className="flex items-center gap-2 min-w-0">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wider uppercase text-white/70 truncate">
                Campaign live
              </span>
            </span>
            <span className="h-2 w-20 rounded bg-white/15" />
          </div>

          <div className="p-4 space-y-4">
            {/* Channels */}
            <motion.ul variants={item} className="flex flex-wrap gap-2">
              {CHANNELS.map((c, i) => (
                <li
                  key={c}
                  className={`rounded-full border px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold transition-all duration-500 ${
                    stage % CHANNELS.length === i
                      ? "border-accent bg-accent text-accent-foreground shadow-[0_0_16px_hsl(37_70%_50%/0.45)]"
                      : "border-white/15 bg-white/[0.05] text-white/55"
                  }`}
                >
                  {c}
                </li>
              ))}
            </motion.ul>

            {/* Funnel */}
            <motion.ul variants={item} className="space-y-2">
              {FUNNEL.map((f, i) => {
                const reached = i <= stage;
                return (
                  <li key={f.label} className="grid grid-cols-[4.75rem_1fr] sm:grid-cols-[5.5rem_1fr] items-center gap-3">
                    <span className={`text-[10px] sm:text-xs transition-colors duration-500 ${reached ? "text-white" : "text-white/40"}`}>
                      {f.label}
                    </span>
                    <span className="h-3.5 sm:h-4 rounded-full bg-white/10 overflow-hidden">
                      <span
                        style={{ width: reached ? `${f.width}%` : "6%" }}
                        className={`block h-full rounded-full transition-all duration-1000 ease-out ${
                          i === stage ? "bg-gradient-to-r from-accent to-gold-light" : "bg-white/35"
                        }`}
                      />
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            {/* Growth line */}
            <motion.div variants={item} className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
              <svg viewBox="0 0 300 90" className="w-full h-20 sm:h-24" role="presentation">
                <defs>
                  <linearGradient id="dm-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 45, 70].map((y) => (
                  <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="white" strokeOpacity="0.08" />
                ))}
                <motion.path
                  d="M0 78 C30 74 45 68 70 60 S115 52 140 42 S190 30 215 22 S265 10 300 6 L300 90 L0 90 Z"
                  fill="url(#dm-area)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: started ? 1 : 0 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
                <motion.path
                  d="M0 78 C30 74 45 68 70 60 S115 52 140 42 S190 30 215 22 S265 10 300 6"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: started ? 1 : 0 }}
                  transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
                />
              </svg>
            </motion.div>

            {/* Phones: KPI chips sit in the card instead of floating over it */}
            <div className="flex flex-wrap gap-2 sm:hidden">
              {[
                { label: "CTR", up: true, on: stage >= 1 },
                { label: "Cost per lead", up: false, on: stage >= 2 },
                { label: "ROAS", up: true, on: stage >= 3 },
              ].map((k) => (
                <span
                  key={k.label}
                  className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all duration-500 ${
                    k.on ? "border-accent/40 bg-white/[0.08] text-white opacity-100" : "border-white/10 text-white/30 opacity-60"
                  }`}
                >
                  {k.label}
                  {k.up ? <ArrowUpRight size={12} className="text-emerald-400" /> : <ArrowDownRight size={12} className="text-emerald-400" />}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* KPI chips */}
        <motion.div
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 8 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-3 right-6 hidden items-center gap-1.5 rounded-full border border-white/15 bg-navy-deep/90 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-white sm:flex"
        >
          CTR <ArrowUpRight size={13} className="text-emerald-400" />
        </motion.div>
        <motion.div
          animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 8 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-3 right-[8.25rem] hidden items-center gap-1.5 rounded-full border border-white/15 bg-navy-deep/90 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-white sm:flex"
        >
          Cost per lead <ArrowDownRight size={13} className="text-emerald-400" />
        </motion.div>
        <motion.div
          animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 8 }}
          transition={{ duration: 0.5 }}
          className="absolute left-8 -bottom-4 hidden items-center gap-1.5 rounded-full border border-accent/40 bg-navy-deep/90 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-accent sm:flex"
        >
          ROAS <ArrowUpRight size={13} />
        </motion.div>

        {/* Ad preview */}
        <motion.div
          animate={started && !reduce ? { y: [0, -9, 0] } : { y: 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mt-4 ml-auto w-[62%] max-w-[210px] rounded-2xl border border-white/20 bg-white p-3 shadow-2xl sm:absolute sm:-right-6 sm:-bottom-8 sm:mt-0 sm:w-[44%]"
        >
          <span className="flex items-center gap-1.5">
            <span className="rounded bg-navy px-1 py-0.5 text-[8px] font-bold text-white">Ad</span>
            <span className="h-1.5 w-16 rounded bg-slate-300" />
          </span>
          <span className="mt-2 block h-2.5 w-4/5 rounded bg-[#1a56db]" />
          <span className="mt-1.5 block h-1.5 w-full rounded bg-slate-200" />
          <span className="mt-1 block h-1.5 w-2/3 rounded bg-slate-200" />
          <span className="mt-3 flex items-center justify-between">
            <span className="h-5 w-16 rounded-full bg-accent" />
            <motion.span
              animate={stage === 2 ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Heart size={14} className={stage >= 2 ? "fill-red-500 text-red-500" : "text-slate-300"} />
            </motion.span>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CampaignVisual;
