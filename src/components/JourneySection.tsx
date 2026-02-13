import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { HelpCircle, BookOpen, Code, Users, Trophy, TrendingUp, Sparkles } from "lucide-react";

const steps = [
  { icon: HelpCircle, title: "Confusion", desc: "Uncertain future & skills gap" },
  { icon: BookOpen, title: "Training", desc: "Expert-led learning" },
  { icon: Code, title: "Live Projects", desc: "Hands-on experience" },
  { icon: Users, title: "Career Prep", desc: "Mock interviews & soft skills" },
  { icon: Trophy, title: "Clarity", desc: "Your dream career achieved" },
];

const WordReveal = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="inline-block mr-3 last:mr-0"
        >
          {word === "Clarity" ? <span className="text-gradient-gold">Clarity</span> : word}
        </motion.span>
      ))}
    </h2>
  );
};

const JourneySection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const opacityConfusion = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.3]);
  const opacityClarity = useTransform(scrollYProgress, [0.6, 0.8], [0.3, 1]);
  const blurConfusion = useTransform(scrollYProgress, [0.2, 0.5], [0, 10]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden gradient-navy"
    >
      {/* Parallax Background Layers */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute inset-0 hero-grid opacity-20 pointer-events-none"
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold rounded-full opacity-30"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%"
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-semibold tracking-widest uppercase text-sm mb-4"
          >
            The Path To Excellence
          </motion.p>
          <WordReveal text="From Confusion to Career Clarity" />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative">

          {/* Left Side: Confusion */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [1, 0.6]) }}
            className="w-full lg:w-1/3 p-8 rounded-3xl glass-morphism bg-navy-deep/40 relative group panel-3d hover:scale-[1.02] overflow-hidden"
          >
            {/* Dedicated Background Blur Layer (doesn't affect text) */}
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0.1, 0.4], [0, 1]) }}
              className="absolute inset-0 bg-white/5 backdrop-blur-md pointer-events-none"
            />

            <div className="relative z-10">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-navy border border-white/10 rounded-full flex items-center justify-center animate-bounce">
                <HelpCircle className="text-white/50" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The Confusion State</h3>
              <p className="text-white/70 mb-6">Disconnected skills, uncertain path, and lack of industry exposure.</p>

              {/* Scattered Icons with Continuous Floating Animation */}
              <div className="flex flex-wrap gap-3 opacity-40">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [12, 15, 12],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="p-2 bg-white/5 rounded-lg border border-white/10"
                  >
                    <Code size={16} className="text-white" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center: Animated Path */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[200px] pointer-events-none">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                  <stop offset="50%" stopColor="#F5C15D" stopOpacity="1" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <motion.path
                d="M 50,100 Q 200,50 350,100"
                fill="transparent"
                stroke="url(#goldGradient)"
                strokeWidth="4"
                strokeDasharray="10, 5"
                style={{ pathLength }}
                filter="url(#glow)"
              />
              <motion.circle
                r="6"
                fill="#F5C15D"
                filter="url(#glow)"
                style={{ offsetPath: "path('M 50,100 Q 200,50 350,100')", offsetDistance: pathLength.get() * 100 + "%" }}
              />
            </svg>
          </div>

          {/* Right Side: Clarity */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0.6, 1]) }}
            className="w-full lg:w-1/3 p-8 rounded-3xl glass-morphism bg-accent/5 border-accent/20 relative group panel-3d hover:scale-[1.02] gold-glow-box"
          >
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent border border-white/20 rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
              <TrendingUp className="text-navy" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Career Clarity</h3>
            <p className="text-white mb-6 font-medium">Defined career path, industry-ready portfolio, and high-paying roles.</p>

            {/* Structured UI Mockup */}
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-2 bg-accent/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ delay: i * 0.2, duration: 1, ease: "easeOut" }}
                    className="h-full bg-accent w-full"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-2 text-accent">
              <Sparkles size={18} className="animate-pulse" />
              <span className="font-bold text-sm uppercase tracking-tighter">Your Future Starts Here</span>
            </div>
          </motion.div>

        </div>

        {/* Floating Steps (Mobile visible, Desktop distributed) */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <step.icon className="text-accent" size={24} />
              </div>
              <h4 className="text-white font-bold mb-2">{step.title}</h4>
              <p className="text-white/50 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
