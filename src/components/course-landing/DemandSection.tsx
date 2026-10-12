import { motion } from "framer-motion";
import type { CourseLandingContent } from "@/content/courses";
import SectionHeading from "./SectionHeading";

const DemandSection = ({ c }: { c: CourseLandingContent }) => {
  const { demand } = c;
  const max = Math.max(...demand.chart.points.map((p) => p.value));

  return (
    <section id="market" className="relative section-dark py-20 md:py-28 overflow-hidden scroll-mt-20">
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeading eyebrow="A career with real demand" title={demand.title} sub={demand.sub} dark />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {demand.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 md:p-6 hover-glow-gold"
            >
              <p className="font-display font-bold text-3xl md:text-4xl text-gradient-gold">{s.value}</p>
              <p className="mt-2 text-xs md:text-sm text-white/65 leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <figure className="mt-10 md:mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-10">
          <figcaption className="font-display font-semibold text-white text-lg md:text-xl">
            {demand.chart.title}
          </figcaption>
          <p className="mt-1 text-sm text-white/60">{demand.chart.caption}</p>

          <ul className="mt-8 space-y-4">
            {demand.chart.points.map((p, i) => (
              <li key={p.year} className="grid grid-cols-[2.75rem_1fr_6.25rem] md:grid-cols-[4rem_1fr_8rem] items-center gap-3">
                <span className="text-sm font-medium text-white/70">{p.year}</span>
                <div className="h-3 md:h-4 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(p.value / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-gold-light"
                  />
                </div>
                <span className="text-xs md:text-base font-display font-bold text-white text-right whitespace-nowrap">{p.label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[11px] md:text-xs leading-relaxed text-white/40">{demand.sources}</p>
        </figure>
      </div>
    </section>
  );
};

export default DemandSection;
