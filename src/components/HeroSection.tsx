import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const stats = [
  { label: "Students Trained", target: 10000, suffix: "+" },
  { label: "Placement Rate", target: 98.4, suffix: "%", decimal: true },
  { label: "Hiring Partners", target: 25, suffix: "+" },
  { label: "Branches", target: 4, suffix: "" },
];

function AnimatedCounter({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = Date.now();
          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 2 + Math.random() * 3,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent/20"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center gradient-navy-animated hero-grid overflow-hidden">
      {/* Background Video */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.35] pointer-events-none"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </motion.video>

      <FloatingParticles />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-accent font-semibold tracking-widest uppercase text-sm mb-6"
        >
          Tamil Nadu's #1 Skill Development Institute
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
        >
          Build a{" "}
          <span className="text-gradient-gold">₹8–12 LPA</span>{" "}
          Career
          <br />
          in 6 Months
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Industry-Focused Training · Live Projects · 98.4% Placement Support
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#demo"
            className="bg-accent text-accent-foreground px-8 py-3.5 rounded-lg font-semibold text-lg hover-scale gold-glow-box flex items-center gap-2 transition-all duration-300"
          >
            Book Free Demo <ArrowRight size={18} />
          </a>
          <a
            href="#courses"
            className="border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-lg hover:border-accent hover:text-accent transition-all duration-300"
          >
            Explore Courses
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-primary-foreground/50 text-sm font-medium mb-14"
        >
          <span>98.4% Placement</span>
          <span className="hidden sm:inline text-accent/40">|</span>
          <span>10,000+ Students</span>
          <span className="hidden sm:inline text-accent/40">|</span>
          <span>25+ Hiring Partners</span>
          <span className="hidden sm:inline text-accent/40">|</span>
          <span>4 Branches</span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-3xl mx-auto"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-accent gold-glow">
                <AnimatedCounter target={s.target} suffix={s.suffix} decimal={s.decimal} />
              </div>
              <div className="text-primary-foreground/60 text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <a href="#journey" className="inline-block text-primary-foreground/40 animate-bounce">
            <ChevronDown size={28} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
