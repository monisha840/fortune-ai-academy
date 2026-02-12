import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="gradient-navy py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
        >
          Ready to Transform
          <br />
          <span className="text-gradient-gold">Your Career?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-primary-foreground/60 text-lg mb-10 max-w-lg mx-auto"
        >
          Join 10,000+ students who chose Fortune Innovatives and never looked back.
        </motion.p>

        <motion.a
          href="#demo"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-4 rounded-lg font-bold text-lg hover-scale gold-glow-box transition-all duration-300"
        >
          Start Your Journey <ArrowRight size={20} />
        </motion.a>
      </div>
    </section>
  );
};

export default FinalCTA;
