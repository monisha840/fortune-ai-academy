import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
  align?: "center" | "left";
}

const SectionHeading = ({ eyebrow, title, sub, dark = false, align = "center" }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5 }}
    className={`max-w-3xl mb-12 md:mb-16 ${align === "center" ? "mx-auto text-center" : ""}`}
  >
    <p className="text-accent font-semibold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">{eyebrow}</p>
    <h2
      className={`font-display font-bold text-3xl md:text-5xl leading-tight ${
        dark ? "text-white" : "text-foreground"
      }`}
    >
      {title}
    </h2>
    {sub && (
      <p className={`mt-4 text-base md:text-lg leading-relaxed ${dark ? "text-white/65" : "text-muted-foreground"}`}>
        {sub}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
