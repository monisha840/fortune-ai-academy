import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, UserCheck, BarChart3, Users, ArrowRight } from "lucide-react";

const panels = [
    {
        title: "Real Projects",
        icon: Briefcase,
        desc: "Work on actual industry problems with real stakes and production-grade codebases.",
        accent: "bg-blue-500/10",
    },
    {
        title: "Industry Mentors",
        icon: UserCheck,
        desc: "1-on-1 guidance from seniors working at top tech giants like Google, Amazon, and Zoho.",
        accent: "bg-purple-500/10",
    },
    {
        title: "Career Audits",
        icon: BarChart3,
        desc: "In-depth analysis of your potential, identifying gaps and building a custom roadmap.",
        accent: "bg-emerald-500/10",
    },
    {
        title: "Hiring Support",
        icon: Users,
        desc: "Lifetime access to our hiring network and dedicated support for negotiation and interviews.",
        accent: "bg-amber-500/10",
    },
];

const TransformSection = () => {
    const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(null);

    const toggleMobileActive = (index: number) => {
        setActiveMobileIndex(activeMobileIndex === index ? null : index);
    };

    return (
        <section className="bg-navy py-20 md:py-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl md:text-6xl font-bold text-white mb-6"
                >
                    We Don't Just Teach.
                    <br />
                    We <span className="text-gradient-gold">Transform.</span>
                </motion.h2>
            </div>

            {/* --- MOBILE VIEW: ICON CARDS --- */}
            <div className="md:hidden flex flex-col gap-[18px] px-4 relative z-10">
                {panels.map((panel, i) => (
                    <motion.div
                        key={i}
                        className={`bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-300 cursor-pointer ${activeMobileIndex === i ? 'bg-white/10 border-accent/30 shadow-lg shadow-accent/5' : ''}`}
                        onHoverStart={() => setActiveMobileIndex(i)}
                        onHoverEnd={() => setActiveMobileIndex(null)}
                        onClick={() => setActiveMobileIndex(i)} // Fallback for pure touch devices
                    >
                        <div className="flex flex-col items-center text-center">
                            {/* Icon Container (Mobile Only Spec) */}
                            <motion.div
                                className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#0f2a45] to-[#0b1f35] shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all duration-300"
                                animate={{ scale: activeMobileIndex === i ? 1.1 : 1 }}
                            >
                                <panel.icon size={22} className="text-[#f4b400]" />
                            </motion.div>

                            <h3 className="font-display text-lg font-bold text-white mt-4 mb-1">
                                {panel.title}
                            </h3>

                            <AnimatePresence>
                                {activeMobileIndex === i && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: "auto", y: 10 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-white/70 text-sm leading-relaxed max-w-[280px] pb-2">
                                            {panel.desc}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- DESKTOP VIEW: MULTI-PANEL SPLIT (UNCHANGED) --- */}
            <div className="hidden md:flex flex-row w-full h-[420px] gap-2 px-2">
                {panels.map((panel, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, flexGrow: 1 }}
                        whileInView={{ opacity: 1 }}
                        whileHover={{ flexGrow: 4 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.2, 0, 0.2, 1] }}
                        className={`group relative overflow-hidden rounded-2xl cursor-pointer flex flex-col justify-end p-8 transition-all duration-500`}
                    >
                        {/* Background Image/Gradient */}
                        <div className="absolute inset-0 bg-navy-deep border-x border-white/5 transition-colors group-hover:bg-accent/5" />

                        {/* Hover Glow */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                        {/* Icon & Content */}
                        <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all">
                                <panel.icon className="text-white group-hover:text-accent transition-colors" size={32} />
                            </div>

                            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 whitespace-nowrap">
                                {panel.title}
                            </h3>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="hidden md:block"
                            >
                                <p className="text-white/80 text-lg leading-relaxed max-w-md">
                                    {panel.desc}
                                </p>
                            </motion.div>
                        </div>

                        {/* 3D Depth Shadow/Glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" >
                            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TransformSection;
