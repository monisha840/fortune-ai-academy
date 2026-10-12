import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import type { CourseLandingContent } from "@/content/courses";
import SectionHeading from "./SectionHeading";

const StuckSection = ({ c }: { c: CourseLandingContent }) => (
  <section className="section-light py-20 md:py-28">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <SectionHeading eyebrow="Why most people stay stuck" title={c.stuck.title} sub={c.stuck.sub} />

      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-x-4 mb-3 px-1 text-xs font-semibold tracking-widest uppercase">
        <span className="text-muted-foreground">The problem</span>
        <span />
        <span className="text-accent">How Fortune Innovatives fixes it</span>
      </div>

      <ul className="space-y-4">
        {c.stuck.rows.map((row, i) => (
          <motion.li
            key={row.problem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
            className="grid md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-stretch"
          >
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <X size={14} strokeWidth={3} />
              </span>
              <p className="text-foreground/80">{row.problem}</p>
            </div>

            <div className="hidden md:flex items-center justify-center text-accent">
              <ArrowRight size={20} />
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-primary p-5 text-primary-foreground shadow-lg shadow-primary/10">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check size={14} strokeWidth={3} />
              </span>
              <p className="font-medium">{row.fix}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

export default StuckSection;
