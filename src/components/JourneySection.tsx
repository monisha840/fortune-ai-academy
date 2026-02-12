import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HelpCircle, BookOpen, Code, Users, Trophy } from "lucide-react";

const steps = [
  { icon: HelpCircle, title: "Confused Student", desc: "Uncertain about career direction and skills gap" },
  { icon: BookOpen, title: "Skill Training", desc: "Industry-aligned curriculum with expert mentors" },
  { icon: Code, title: "Live Projects", desc: "Hands-on experience with real-world applications" },
  { icon: Users, title: "Interview Preparation", desc: "Mock interviews, soft skills & resume building" },
  { icon: Trophy, title: "Placed in Top Company", desc: "Walk into your dream role with confidence" },
];

const JourneySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="section-light py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Your Transformation</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            From Confusion to <span className="text-gradient-gold">Career Clarity</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 w-px bg-accent origin-top"
            style={{ height: inView ? "100%" : "0%" }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary border-2 border-accent flex items-center justify-center z-10">
                  <Icon size={20} className="text-accent" />
                </div>

                {/* Content */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${
                    isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left md:ml-auto"
                  }`}
                >
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
