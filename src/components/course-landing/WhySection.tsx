import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  FolderKanban,
  MessagesSquare,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { CourseLandingContent } from "@/content/courses";
import type { WhyIcon } from "@/content/courses/types";
import SectionHeading from "./SectionHeading";

const icons: Record<WhyIcon, LucideIcon> = {
  mentor: BadgeCheck,
  projects: FolderKanban,
  feedback: MessagesSquare,
  placement: BriefcaseBusiness,
  beginner: Sprout,
  certificate: Award,
};

const WhySection = ({ c }: { c: CourseLandingContent }) => (
  <section id="why" className="section-light py-20 md:py-28 scroll-mt-20">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <SectionHeading eyebrow="Why Fortune Innovatives" title={c.why.title} sub={c.why.sub} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {c.why.cards.map((card, i) => {
          const Icon = icons[card.icon];
          // Bento layout on lg (3 cols): first card spans 2, last card spans the
          // full row, so any 6-card set tiles with no gaps.
          const featured = i === 0;
          const isLast = i === c.why.cards.length - 1 && c.why.cards.length % 3 === 0;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.07, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-3xl p-7 md:p-8 transition-shadow hover:shadow-xl ${
                featured
                  ? "lg:col-span-2 bg-primary text-primary-foreground"
                  : isLast
                    ? "md:col-span-2 lg:col-span-3 bg-accent/10 border border-accent/30"
                    : "bg-card border border-border"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl mb-5 transition-transform group-hover:scale-110 ${
                  featured ? "bg-accent text-accent-foreground" : "bg-accent/15 text-accent"
                }`}
              >
                <Icon size={24} />
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-2">{card.title}</h3>
              <p className={featured ? "text-white/70" : "text-muted-foreground"}>{card.body}</p>
              {featured && (
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
              )}
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhySection;
