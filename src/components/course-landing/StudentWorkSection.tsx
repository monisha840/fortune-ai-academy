import { motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/landingConfig";
import SectionHeading from "./SectionHeading";

// Real student work from the Gallery CMS (type = portfolio, tagged with this
// course). Not rendered at all when there is none, so no empty frames.
const StudentWorkSection = ({ items, title }: { items: PortfolioItem[]; title: string }) => {
  if (items.length === 0) return null;

  return (
    <section className="section-light py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeading eyebrow="Student work" title={title} />

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {items.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.45 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {p.media_type === "video" ? (
                  <video
                    src={p.image_url}
                    className="h-full w-full object-cover"
                    controls
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={p.image_url}
                    alt={p.title || (p.student_name ? `Work by ${p.student_name}` : "Student project")}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              {(p.title || p.student_name) && (
                <div className="p-3 md:p-4">
                  {p.title && (
                    <p className="font-display text-sm md:text-base font-semibold text-foreground line-clamp-1">{p.title}</p>
                  )}
                  {p.student_name && (
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">by {p.student_name}</p>
                  )}
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StudentWorkSection;
