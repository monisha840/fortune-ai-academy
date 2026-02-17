import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, CheckCircle, Star, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Priya Krishnan",
    company: "Zoho",
    salary: "9.2",
    text: "Fortune Innovatives completely changed my trajectory. I went from being confused about my future to landing a role at Zoho in just 5 months.",
    role: "UI/UX Designer",
  },
  {
    name: "Arjun Selvam",
    company: "TCS",
    salary: "7.5",
    text: "The live projects and mock interviews gave me the confidence I needed. I cleared my TCS interview on the first attempt.",
    role: "Full Stack Developer",
  },
  {
    name: "Divya Lakshmi",
    company: "Freshworks",
    salary: "12.0",
    text: "The training was incredibly comprehensive. My mentors pushed me beyond what I thought was possible.",
    role: "Graphic Designer",
  },
  {
    name: "Karthik Rajan",
    company: "Infosys",
    salary: "8.0",
    text: "From a non-CS background to a tech career – Fortune Innovatives made the impossible possible for me.",
    role: "Video Editor",
  },
];

const SalaryCounter = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const target = parseFloat(value);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(1)));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>₹{count.toFixed(1)} LPA</span>;
};

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden gradient-navy">
      {/* Background Motion Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-accent/10 blur-[150px] rounded-full"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles size={14} className="text-accent" />
            <span className="text-accent text-xs font-bold uppercase tracking-widest">Alumni Success</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Transformative <span className="text-gradient-gold">Journeys</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="glass-morphism bg-white/5 border-white/10 rounded-2xl md:rounded-[2.5rem] p-6 md:p-16 relative gold-glow-box"
            >
              <Quote className="absolute top-6 left-6 md:top-12 md:left-12 text-accent/10 w-12 h-12 md:w-24 md:h-24 -z-10" />

              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                {/* Profile Image Area */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 md:w-48 md:h-48 rounded-full border-2 md:border-4 border-accent p-1 md:p-2 relative">
                    <div className="w-full h-full rounded-full bg-navy-deep flex items-center justify-center overflow-hidden">
                      <span className="text-3xl md:text-7xl font-display font-bold text-accent/40">{t.name[0]}</span>
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-emerald-500 text-white p-1 md:p-2 rounded-full shadow-lg border-2 border-navy"
                  >
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                </div>

                {/* Content Area */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-3 md:mb-4 text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" />)}
                  </div>

                  <blockquote className="text-base md:text-3xl font-medium text-white/90 leading-snug mb-6 md:mb-8">
                    "{t.text}"
                  </blockquote>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                    <div>
                      <div className="text-white font-bold text-2xl mb-1">{t.name}</div>
                      <div className="text-white/70 text-base">{t.role}</div>
                    </div>

                    <div className="flex flex-col items-center md:items-end justify-center">
                      <div className="text-xs uppercase tracking-widest text-white/60 mb-1">Placed At</div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-display font-bold text-white">{t.company}</span>
                        <div className="h-6 w-px bg-white/20" />
                        <div className="text-accent font-display font-bold text-2xl">
                          <SalaryCounter value={t.salary} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Badge Overlay */}
              <div className="absolute top-8 right-8 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 tracking-tighter uppercase">
                <CheckCircle size={12} className="text-accent shadow-glow" />
                Verified Placement
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              onClick={prev}
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent hover:text-navy hover:border-accent transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === current ? "bg-accent w-12" : "bg-white/20 w-3 hover:bg-white/40"
                    }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent hover:text-navy hover:border-accent transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
