import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { CourseLandingContent } from "@/content/courses";

const FinalCta = ({ c }: { c: CourseLandingContent }) => (
  <section className="relative overflow-hidden gradient-navy hero-grid py-20 md:py-28">
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/10 blur-[140px]" />
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="relative max-w-3xl mx-auto px-4 md:px-6 text-center"
    >
      <h2 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight">
        {c.finalCta.title}
      </h2>
      <p className="mt-5 text-white/70 text-base md:text-lg">{c.finalCta.sub}</p>

      <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="#enquire"
          className="rounded-full bg-accent text-accent-foreground font-bold px-8 py-4 hover:scale-105 transition-transform"
        >
          Book Your Free Counselling Call
        </a>
        <a
          href="https://wa.me/919952270424"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white font-semibold px-8 py-4 hover:border-accent hover:text-accent transition-colors"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>
      </div>
    </motion.div>
  </section>
);

export default FinalCta;
