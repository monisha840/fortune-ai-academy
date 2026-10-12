import { motion } from "framer-motion";

interface StageTabsProps {
  stages: readonly string[];
  stage: number;
  /** Unique per visual so the sliding pill animates within its own tabs. */
  layoutId: string;
  /** Optional chip on the right, e.g. the tool used in the current stage. */
  tool?: string;
}

/**
 * Shared stage switcher for the hero visuals.
 *
 * Mobile rules (320px and up): tabs share the row evenly and never wrap their
 * labels. The tool chip drops onto its own line instead of squeezing the tabs.
 */
const StageTabs = ({ stages, stage, layoutId, tool }: StageTabsProps) => (
  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
    <div className="flex w-full items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.05] p-1 sm:w-fit sm:gap-1.5">
      {stages.map((label, i) => (
        <span
          key={label}
          className={`relative flex-1 whitespace-nowrap rounded-full px-1 py-1 text-center text-[9px] font-semibold uppercase tracking-normal transition-colors duration-500 sm:flex-none sm:px-3 sm:text-[11px] sm:tracking-wider ${
            stage === i ? "text-accent-foreground" : "text-white/45"
          }`}
        >
          {stage === i && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-full bg-accent"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative">{label}</span>
        </span>
      ))}
    </div>
    {tool && (
      <span className="w-fit rounded-full border border-white/15 bg-navy-deep/80 px-3 py-1 text-[10px] font-semibold text-white/80 sm:text-[11px]">
        {tool}
      </span>
    )}
  </div>
);

export default StageTabs;
