import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MiddleCTA = () => {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#0B1C2D]">
            {/* Background Design Elements */}
            <div className="absolute inset-0 z-0">
                {/* Animated Glow Wave */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-accent/20 via-transparent to-transparent blur-[120px] rounded-full pointer-events-none"
                />

                {/* Subtle Light Streak */}
                <motion.div
                    animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent skew-y-12 pointer-events-none"
                />

                {/* Faint radial spotlight */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
                >
                    Your Career <span className="text-[#D4AF37]">Breakthrough</span> Starts Here.
                </motion.h2>

                {/* Supporting Line */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="text-white/70 text-lg md:text-xl font-medium mb-12"
                >
                    Don’t wait for clarity. Create it.
                </motion.p>

                {/* Primary CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col items-center gap-6"
                >
                    <motion.div
                        animate={{
                            y: [0, -6, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Link
                            to="/apply"
                            className="group relative inline-flex items-center gap-3 bg-[#D4AF37] text-[#0B1C2D] px-8 py-4 md:px-12 md:py-5 rounded-full font-black text-base md:text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
                        >
                            {/* Pulse Glow Effect */}
                            <span className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-20 pointer-events-none group-hover:opacity-40" />

                            Start My Career Transformation
                            <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                        </Link>
                    </motion.div>

                    {/* Secondary Element */}
                    <Link
                        to="/contact"
                        className="group relative inline-block text-white/50 hover:text-[#D4AF37] transition-colors duration-300 py-1"
                    >
                        <span className="text-sm font-bold">Talk to an Expert Instead</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default MiddleCTA;
