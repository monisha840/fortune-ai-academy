import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { CourseLandingContent } from "@/content/courses";
import SectionHeading from "./SectionHeading";

const CurriculumSection = ({ c }: { c: CourseLandingContent }) => {
  const { curriculum } = c;
  const listRef = useRef<HTMLOListElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section id="syllabus" className="relative section-dark py-20 md:py-28 overflow-hidden scroll-mt-20">
      <div className="pointer-events-none absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="relative max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeading eyebrow="The curriculum" title={curriculum.title} sub={curriculum.sub} dark />

        {curriculum.modules.length > 0 && (
        <div className="relative">
          {/* Track + scroll-driven gold progress line */}
          <span className="absolute left-5 md:left-6 top-2 bottom-2 w-px bg-white/10" aria-hidden="true" />
          <motion.span
            style={{ scaleY: progress }}
            className="absolute left-5 md:left-6 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent to-gold-light"
            aria-hidden="true"
          />

          <ol ref={listRef} className="space-y-4 md:space-y-5">
            {curriculum.modules.map((m, i) => {
              const hasTopics = !!m.topics?.length;
              const isOpen = open === i;
              return (
                <motion.li
                  key={m.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45 }}
                  className="relative pl-14 md:pl-16"
                >
                  <span className="absolute left-0 top-1 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-accent/50 bg-navy-deep font-display font-bold text-accent text-sm md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] hover-glow-gold">
                    <button
                      type="button"
                      disabled={!hasTopics}
                      aria-expanded={hasTopics ? isOpen : undefined}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 md:py-5 text-left disabled:cursor-default"
                    >
                      <span className="font-display font-semibold text-white text-base md:text-lg">{m.title}</span>
                      {hasTopics && (
                        <ChevronDown
                          size={20}
                          className={`shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                    {hasTopics && isOpen && (
                      <ul className="px-5 pb-5 space-y-2 text-sm text-white/70 list-disc list-inside">
                        {m.topics!.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
        )}

        <div className={curriculum.modules.length > 0 ? "mt-14" : ""}>
          <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-5">
            Tools you'll master
          </p>
          <ul className="flex flex-wrap justify-center gap-2.5 md:gap-3">
            {curriculum.tools.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/85 hover:border-accent hover:text-accent transition-colors"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#enquire"
            className="inline-block rounded-full bg-accent text-accent-foreground font-bold px-8 py-4 hover:scale-105 transition-transform"
          >
            {curriculum.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
