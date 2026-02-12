import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Krishnan",
    company: "Zoho",
    salary: "₹9.2 LPA",
    text: "Fortune Innovatives completely changed my trajectory. I went from being confused about my future to landing a role at Zoho in just 5 months.",
  },
  {
    name: "Arjun Selvam",
    company: "TCS",
    salary: "₹7.5 LPA",
    text: "The live projects and mock interviews gave me the confidence I needed. I cleared my TCS interview on the first attempt.",
  },
  {
    name: "Divya Lakshmi",
    company: "Freshworks",
    salary: "₹12 LPA",
    text: "The Data Science course was incredibly comprehensive. My mentors pushed me beyond what I thought was possible.",
  },
  {
    name: "Karthik Rajan",
    company: "Infosys",
    salary: "₹8 LPA",
    text: "From a non-CS background to a tech career – Fortune Innovatives made the impossible possible for me.",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="section-light py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Success Stories</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Hear From Our <span className="text-gradient-gold">Alumni</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <Quote size={40} className="text-accent/30 mx-auto mb-6" />
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-8">
                "{t.text}"
              </p>
              <div className="font-display font-bold text-foreground text-lg">{t.name}</div>
              <div className="text-muted-foreground text-sm">
                Placed at <span className="text-accent font-semibold">{t.company}</span> · {t.salary}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-border"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
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
