import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

const branches = [
  { city: "Erode", address: "123, Brough Road, Erode - 638001", phone: "+91 94433 00001" },
  { city: "Coimbatore", address: "45, RS Puram, Coimbatore - 641002", phone: "+91 94433 00002" },
  { city: "Salem", address: "78, Junction Main Road, Salem - 636007", phone: "+91 94433 00003" },
  { city: "Tiruppur", address: "12, College Road, Tiruppur - 641601", phone: "+91 94433 00004" },
  { city: "Chennai", address: "56, Nungambakkam High Rd, Chennai - 600034", phone: "+91 94433 00005" },
];

const BranchSection = () => {
  return (
    <section id="branches" className="section-light py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Our Network</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            5 Branches Across <span className="text-gradient-gold">Tamil Nadu</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((b, i) => (
            <motion.div
              key={b.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group border border-border rounded-xl p-6 hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 hover-glow-gold"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {b.city}
              </h3>
              <div className="flex items-start gap-2 text-muted-foreground text-sm mb-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                {b.address}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone size={16} className="shrink-0 text-accent" />
                {b.phone}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchSection;
