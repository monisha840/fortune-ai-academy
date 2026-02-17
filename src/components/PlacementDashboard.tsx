import { motion } from "framer-motion";

const metrics = [
  { label: "Average Salary", value: "₹8.5 LPA" },
  { label: "Highest Salary", value: "₹18 LPA" },
  { label: "Placed This Year", value: "1200+" },
];

const partnersRow1 = [
  "NITTANY", "Qrasp Clothings", "HEINI", "Code Pixel Design Studio",
  "Network Realty", "SGS & Co", "The Chennai Silks", "SAGOUS",
  "Frog Brandservices", "Palette Production", "Proprint", "NPLUS",
];

const partnersRow2 = [
  "Veepee Graphic Solutions", "Crypton", "JPG Innovation LLP",
  "RSN Infotech", "S.A. Creations", "ZIDIO Development", "XCODEFIX",
  "AppLogiQ", "Cornerstohn", "Ramya Knit Printing", "HiFresh Agro",
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 mb-10 md:mb-20">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center py-4 md:py-10 border border-secondary rounded-xl hover-glow-gold transition-all duration-300 flex flex-col justify-center"
            >
              <div className="font-display text-2xl md:text-5xl font-bold text-accent gold-glow mb-1 md:mb-2">
                {m.value}
              </div>
              <div className="text-primary-foreground/60 text-xs md:text-base">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Hiring Partners - Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2">
            Trusted by Industry Leaders Across <span className="text-gradient-gold">Tamil Nadu</span>
          </p>
          <p className="text-primary-foreground/40 text-sm uppercase tracking-widest mb-10">Our Hiring Partners</p>

          <div className="space-y-4 overflow-hidden">
            {/* Inline CSS for Mobile Scroll - Scoped to placement section */}
            <style>
              {`
              @media (max-width: 768px) {
                @keyframes partnerScrollRight {
                  0% { transform: translateX(-30%); }
                  100% { transform: translateX(0%); }
                }
                @keyframes partnerScrollLeft {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-30%); }
                }
                .partner-row-right {
                  animation: partnerScrollRight 20s linear infinite;
                }
                .partner-row-left {
                  animation: partnerScrollLeft 20s linear infinite;
                }
              }
              `}
            </style>

            {/* Mobile View: 4 Rows (Alternating) */}
            <div className="md:hidden flex flex-col gap-[14px]">
              {/* Row 1 -> scroll right */}
              <div className="flex gap-[12px] w-max partner-row-right">
                {[...partnersRow1.slice(0, 6), ...partnersRow1.slice(0, 6)].map((p, i) => (
                  <span key={`mr1-${i}`} className="inline-block px-[14px] py-[8px] border border-secondary rounded-lg text-primary-foreground/50 font-semibold text-[10px] shrink-0 whitespace-nowrap">
                    {p}
                  </span>
                ))}
              </div>
              {/* Row 2 -> scroll left */}
              <div className="flex gap-[12px] w-max partner-row-left">
                {[...partnersRow1.slice(6), ...partnersRow1.slice(6)].map((p, i) => (
                  <span key={`mr2-${i}`} className="inline-block px-[14px] py-[8px] border border-secondary rounded-lg text-primary-foreground/50 font-semibold text-[10px] shrink-0 whitespace-nowrap">
                    {p}
                  </span>
                ))}
              </div>
              {/* Row 3 -> scroll right */}
              <div className="flex gap-[12px] w-max partner-row-right">
                {[...partnersRow2.slice(0, 6), ...partnersRow2.slice(0, 6)].map((p, i) => (
                  <span key={`mr3-${i}`} className="inline-block px-[14px] py-[8px] border border-secondary rounded-lg text-primary-foreground/50 font-semibold text-[10px] shrink-0 whitespace-nowrap">
                    {p}
                  </span>
                ))}
              </div>
              {/* Row 4 -> scroll left */}
              <div className="flex gap-[12px] w-max partner-row-left">
                {[...partnersRow2.slice(6), ...partnersRow2.slice(6)].map((p, i) => (
                  <span key={`mr4-${i}`} className="inline-block px-[14px] py-[8px] border border-secondary rounded-lg text-primary-foreground/50 font-semibold text-[10px] shrink-0 whitespace-nowrap">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Desktop View: Existing 2 Rows */}
            <div className="hidden md:block space-y-4">
              {/* Row 1: scroll left */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent z-10" />
                <div className="flex animate-scroll-left whitespace-nowrap">
                  {[...partnersRow1, ...partnersRow1].map((p, i) => (
                    <span
                      key={`r1-${i}`}
                      className="inline-block px-6 py-3 mx-2 border border-secondary rounded-lg text-primary-foreground/50 font-semibold text-sm hover:border-accent/50 hover:text-accent transition-all duration-300 cursor-default"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 2: scroll right */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent z-10" />
                <div className="flex animate-scroll-right whitespace-nowrap">
                  {[...partnersRow2, ...partnersRow2].map((p, i) => (
                    <span
                      key={`r2-${i}`}
                      className="inline-block px-6 py-3 mx-2 border border-secondary rounded-lg text-primary-foreground/50 font-semibold text-sm hover:border-accent/50 hover:text-accent transition-all duration-300 cursor-default"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlacementDashboard;
