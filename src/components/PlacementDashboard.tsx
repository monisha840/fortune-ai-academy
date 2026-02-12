import { motion } from "framer-motion";

const metrics = [
  { label: "Average Salary", value: "₹8.5 LPA" },
  { label: "Highest Salary", value: "₹18 LPA" },
  { label: "Placed This Year", value: "1200+" },
];

const partners = [
  "TCS", "Infosys", "Wipro", "Cognizant", "HCL", "Accenture",
  "Zoho", "Freshworks", "Tech Mahindra", "Capgemini", "IBM", "Amazon",
];

const PlacementDashboard = () => {
  return (
    <section id="placements" className="bg-primary py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Placement Dashboard</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">
            Numbers That <span className="text-gradient-gold">Speak</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center py-10 border border-secondary rounded-xl hover-glow-gold transition-all duration-300"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-accent gold-glow mb-2">
                {m.value}
              </div>
              <div className="text-primary-foreground/60">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-primary-foreground/50 text-sm uppercase tracking-widest mb-8">Our Hiring Partners</p>
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((p) => (
              <div
                key={p}
                className="px-6 py-3 border border-secondary rounded-lg text-primary-foreground/50 font-semibold text-sm hover:border-accent/50 hover:text-accent transition-all duration-300 hover-scale"
              >
                {p}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlacementDashboard;
