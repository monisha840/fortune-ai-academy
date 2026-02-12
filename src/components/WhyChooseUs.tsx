import { motion } from "framer-motion";

const features = [
  {
    stat: "98%",
    title: "Placement Assistance",
    desc: "Our dedicated placement cell ensures you land your dream job with top companies across India.",
  },
  {
    stat: "50+",
    title: "Industry Expert Trainers",
    desc: "Learn from professionals with 10+ years of real-world industry experience.",
  },
  {
    stat: "100+",
    title: "Real-Time Projects",
    desc: "Work on live projects that mirror actual industry challenges, not toy examples.",
  },
  {
    stat: "6mo",
    title: "Career-Focused Curriculum",
    desc: "Every module is designed backward from what hiring managers need, not academic theory.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="section-dark py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Why Fortune Innovatives</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground max-w-xl">
            We Don't Just Teach.
            <br />
            We <span className="text-gradient-gold">Transform.</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative border-t border-secondary py-10 md:py-14 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 hover-glow-gold transition-all duration-300"
            >
              {/* Large stat in background */}
              <div className="md:w-40 shrink-0">
                <span className="font-display text-5xl md:text-6xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors duration-500">
                  {f.stat}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2">{f.title}</h3>
                <p className="text-primary-foreground/60 max-w-lg">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
