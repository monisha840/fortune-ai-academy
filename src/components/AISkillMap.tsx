import { motion } from "framer-motion";

const nodes = [
  { label: "Foundation", desc: "Core programming & logic" },
  { label: "Development", desc: "Full stack building" },
  { label: "AI / ML", desc: "Intelligent systems" },
  { label: "Deployment", desc: "Cloud & DevOps" },
  { label: "Career", desc: "Placement & growth" },
];

const AISkillMap = () => {
  return (
    <section className="section-dark py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Skill Pipeline</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">
            AI-Era <span className="text-gradient-gold">Skill Map</span>
          </h2>
        </motion.div>

        {/* Desktop pipeline */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-secondary" />

          {nodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative z-10 flex flex-col items-center group"
            >
              <div className="w-20 h-20 rounded-full border-2 border-accent bg-primary flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors duration-300 animate-pulse-gold">
                <span className="font-display text-accent font-bold text-lg">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-display font-bold text-primary-foreground text-lg">{node.label}</h3>
              <p className="text-primary-foreground/50 text-sm mt-1">{node.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-8">
          {nodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 shrink-0 rounded-full border-2 border-accent bg-primary flex items-center justify-center">
                <span className="font-display text-accent font-bold">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-primary-foreground">{node.label}</h3>
                <p className="text-primary-foreground/50 text-sm">{node.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISkillMap;
