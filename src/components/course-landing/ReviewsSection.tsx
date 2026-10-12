import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import type { LandingReview } from "@/lib/landingConfig";
import SectionHeading from "./SectionHeading";

// Learner reviews approved in the CMS. Hidden entirely when there are none:
// never a placeholder quote.
const ReviewsSection = ({ reviews }: { reviews: LandingReview[] }) => {
  if (reviews.length === 0) return null;

  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeading eyebrow="What learners say" title="From confused beginners to confident professionals" />

        <ul className="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.07, duration: 0.45 }}
              className="flex flex-col rounded-3xl border border-border bg-card p-6 md:p-7 shadow-sm"
            >
              <Quote size={22} className="text-accent" aria-hidden="true" />
              {r.rating ? (
                <span className="mt-3 flex gap-0.5" role="img" aria-label={`${r.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} size={14} className={s < (r.rating ?? 0) ? "fill-accent text-accent" : "text-border"} />
                  ))}
                </span>
              ) : null}
              <blockquote className="mt-3 flex-1 leading-relaxed text-foreground/85">"{r.quote}"</blockquote>

              <div className="mt-5 flex items-center gap-3">
                {r.image_url ? (
                  <img src={r.image_url} alt="" loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display font-bold text-accent">
                    {r.name.trim().charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-foreground">{r.name}</span>
                  {(r.role || r.company) && (
                    <span className="block truncate text-xs text-muted-foreground">
                      {[r.role, r.company].filter(Boolean).join(" at ")}
                    </span>
                  )}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReviewsSection;
