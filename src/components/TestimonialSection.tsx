import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Krishnan",
    company: "Zoho",
    salary: "₹9.2 LPA",
    text: "Fortune Innovatives completely changed my trajectory. I went from being confused about my future to landing a role at Zoho in just 5 months.",
    role: "UI/UX Designer",
  },
  {
    name: "Arjun Selvam",
    company: "TCS",
    salary: "₹7.5 LPA",
    text: "The live projects and mock interviews gave me the confidence I needed. I cleared my TCS interview on the first attempt.",
    role: "Full Stack Developer",
  },
  {
    name: "Divya Lakshmi",
    company: "Freshworks",
    salary: "₹12 LPA",
    text: "The training was incredibly comprehensive. My mentors pushed me beyond what I thought was possible.",
    role: "Graphic Designer",
  },
  {
    name: "Karthik Rajan",
    company: "Infosys",
    salary: "₹8 LPA",
    text: "From a non-CS background to a tech career – Fortune Innovatives made the impossible possible for me.",
    role: "Video Editor",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="gradient-navy py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Placement Spotlight</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">
            Real <span className="text-gradient-gold">Success Stories</span>
          </h2>
        </motion.div>

        {/* Featured testimonial */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-secondary/30 border border-secondary rounded-2xl p-8 md:p-12 text-center relative"
            >
              {/* Gold accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-b-full" />

              <Quote size={36} className="text-accent/40 mx-auto mb-6" />

              <p className="text-lg md:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
                "{t.text}"
              </p>

              {/* Student info */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                  <span className="font-display font-bold text-accent text-lg">{t.name[0]}</span>
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-primary-foreground text-lg">{t.name}</div>
                  <div className="text-primary-foreground/50 text-sm">{t.role}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span className="px-4 py-1.5 bg-accent/10 border border-accent/30 text-accent text-sm font-semibold rounded-full">
                  {t.company}
                </span>
                <span className="px-4 py-1.5 bg-accent/10 border border-accent/30 text-accent text-sm font-bold rounded-full">
                  {t.salary}
                </span>
              </div>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-accent fill-accent" />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-secondary flex items-center justify-center hover:border-accent hover:text-accent text-primary-foreground/60 transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-accent w-6" : "bg-secondary w-2"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-secondary flex items-center justify-center hover:border-accent hover:text-accent text-primary-foreground/60 transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
