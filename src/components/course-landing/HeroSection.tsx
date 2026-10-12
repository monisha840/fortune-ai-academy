import { motion } from "framer-motion";
import { BriefcaseBusiness, Check, FolderKanban, MessagesSquare, Users } from "lucide-react";
import type { CourseLandingContent } from "@/content/courses";
import LeadForm from "./LeadForm";
import ProofStrip from "./ProofStrip";
import type { Offer } from "@/lib/landingConfig";
import WireframeVisual from "./WireframeVisual";
import CampaignVisual from "./CampaignVisual";
import BlueprintVisual from "./BlueprintVisual";
import GarmentVisual from "./GarmentVisual";
import PackagingVisual from "./PackagingVisual";
import BrandVisual from "./BrandVisual";
import TimelineVisual from "./TimelineVisual";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55 } }),
};

interface HeroSectionProps {
  c: CourseLandingContent;
  offer?: Offer | null;
  proof?: { value: string; label: string }[] | null;
}

const HeroSection = ({ c, offer, proof }: HeroSectionProps) => {
  const { hero } = c;
  const Visual = { wireframe: WireframeVisual, campaign: CampaignVisual, blueprint: BlueprintVisual, garment: GarmentVisual, packaging: PackagingVisual, brand: BrandVisual, timeline: TimelineVisual, none: null }[c.visual];
  const hasVisual = Visual !== null;
  // Keep a hyphenated last word of the lead ("job-ready") from splitting across lines.
  const leadWords = hero.lead.split(" ");
  const leadLast = leadWords.pop();
  const leadHead = leadWords.join(" ");
  const form = <LeadForm courseTitle={c.courseTitle} slug={c.slug} programName={hero.programName} offer={offer} />;

  return (
    <section className="relative overflow-x-clip gradient-navy hero-grid pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="pointer-events-none absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[460px] h-[460px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
        <div>
          <motion.ul
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2 mb-6"
            aria-label="Program highlights"
          >
            {hero.badges.map((b, i) => (
              <motion.li
                key={b}
                custom={i}
                variants={fadeUp}
                className="rounded-full border border-accent/30 bg-accent/10 text-accent text-[11px] md:text-xs font-semibold tracking-wider uppercase px-3 py-1.5"
              >
                {b}
              </motion.li>
            ))}
          </motion.ul>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight"
          >
            {leadHead} <span className="whitespace-nowrap">{leadLast}</span>{" "}
            <span className="text-gradient-gold">{hero.role}</span>
            <span className="text-white/90">{hero.tail}</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-6 text-base md:text-lg text-white/70 max-w-xl leading-relaxed"
          >
            {hero.sub}
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl"
          >
            {hero.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm md:text-[15px] text-white/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Check size={13} strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#enquire"
              className="rounded-full bg-accent text-accent-foreground font-bold px-7 py-3.5 hover:scale-105 transition-transform"
            >
              Book Your Free Counselling Call
            </a>
            <a
              href="#syllabus"
              className="rounded-full border border-white/25 text-white font-semibold px-7 py-3.5 hover:border-accent hover:text-accent transition-colors"
            >
              View Syllabus
            </a>
          </motion.div>

          {proof ? <ProofStrip items={proof} /> : null}

          <motion.ul
            initial="hidden"
            animate="show"
            custom={5}
            variants={fadeUp}
            className={`mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm text-white/55 ${hasVisual ? "lg:hidden" : ""}`}
          >
            {hero.chips.map((chip) => (
              <li key={chip} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {chip}
              </li>
            ))}
          </motion.ul>

          {hasVisual && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10"
            >
              {form}
            </motion.div>
          )}
        </div>

        {/* Right column: the animated visual when the course has one, else the form */}
        <div className="lg:sticky lg:top-28">
          {Visual ? (
            <>
              <Visual />
              {/* Desktop only: fills the column under the visual. Mobile keeps the inline chips. */}
              <ul className="hidden lg:grid grid-cols-2 gap-3 mt-10 max-w-xl">
                {hero.chips.map((chip, i) => {
                  const Icon = [FolderKanban, Users, MessagesSquare, BriefcaseBusiness][i % 4];
                  return (
                    <li
                      key={chip}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 hover:border-accent/40 transition-colors"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                        <Icon size={18} />
                      </span>
                      <span className="text-sm font-medium text-white/85">{chip}</span>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {form}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
