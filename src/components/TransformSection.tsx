import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ShieldCheck, UserCheck } from "lucide-react";

const panels = [
    {
        title: "Real Projects",
        icon: Briefcase,
        desc: "Work on actual industry problems with real stakes and production-grade codebases.",
        accent: "bg-blue-500/10",
    },
    {
        title: "Industry Mentors",
        icon: GraduationCap,
        desc: "1-on-1 guidance from seniors working at top tech giants like Google, Amazon, and Zoho.",
        accent: "bg-purple-500/10",
    },
    {
        title: "Career Audits",
        icon: ShieldCheck,
        desc: "In-depth analysis of your potential, identifying gaps and building a custom roadmap.",
        accent: "bg-emerald-500/10",
    },
    {
        title: "Placement Support",
        icon: UserCheck,
        desc: "Lifetime access to our hiring network and dedicated support for negotiation and interviews.",
        accent: "bg-amber-500/10",
    },
];

const TransformSection = () => {
    return (
        <section className="bg-navy py-24 md:py-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
                >
                    We Don't Just Teach.
                    <br />
                    We <span className="text-gradient-gold">Transform.</span>
                </motion.h2>
            </div>

            <div className="flex flex-col md:flex-row w-full h-[600px] md:h-[500px] gap-2 px-2">
                {panels.map((panel, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, flexGrow: 1 }}
                        whileInView={{ opacity: 1 }}
                        whileHover={{ flexGrow: 4 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.2, 0, 0.2, 1] }}
                        className={`group relative overflow-hidden rounded-2xl cursor-pointer flex flex-col justify-end p-8 md:p-12 transition-all duration-500`}
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
                                className="hidden md:block" // Hidden by default, shown on hover via motion
                            >
                                <p className="text-white/80 text-lg leading-relaxed max-w-md">
                                    {panel.desc}
                                </p>
                            </motion.div>

                            {/* Mobile Description (Always visible) */}
                            <p className="md:hidden text-white/80 text-base leading-relaxed">
                                {panel.desc}
                            </p>
                        </div>

                        {/* 3D Depth Shadow/Glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TransformSection;
