import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "Do you offer placement assistance after the course?",
        answer: "Yes, we provide 100% placement support. Our dedicated career cell works with top tech companies and design firms to ensure our students get placed in their dream roles."
    },
    {
        question: "Are these courses suitable for absolute beginners?",
        answer: "Absolutely. Our curriculum is designed to take you from zero to expert. We start with fundamental concepts and gradually move towards advanced, industry-level projects."
    },
    {
        question: "Do I get a certificate upon completion?",
        answer: "Yes, you will receive an industry-recognized certification from Fortune Academy, along with a portfolio of live projects that you can showcase to employers."
    },
    {
        question: "What is the mode of training?",
        answer: "We offer both classroom-based intensive training and interactive online sessions. Both modes involve hands-on projects and direct mentorship from industry experts."
    },
    {
        question: "Can I pay the course fee in installments?",
        answer: "Yes, we have flexible payment plans and EMI options to make our premium education accessible to everyone."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative py-24 md:py-32 bg-[#0B1C2D] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Left Side: Bold Header */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="sticky top-32"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-1 bg-[#D4AF37] rounded-full" />
                                <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm">Got Questions?</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
                                Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1C40F] italic">Queries</span>
                            </h2>

                            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-md mb-12">
                                Everything you need to know about our programs, placements, and how to start your journey with us.
                            </p>

                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="flex items-center gap-6 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-[#D4AF37] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                        <HelpCircle className="w-8 h-8 text-[#0B1C2D]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Still have questions?</h4>
                                        <p className="text-white/40 text-sm">Reach out to our experts anytime.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Innovative Accordion */}
                    <div className="lg:col-span-7 space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`group relative rounded-[2rem] transition-all duration-500 ${isOpen
                                            ? "bg-white/[0.04] border-[#D4AF37]/40 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                                            : "bg-white/[0.02] border-white/5 hover:bg-white/[0.03] hover:border-white/10"
                                        } border`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                        className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-6 outline-none"
                                    >
                                        <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? "text-[#D4AF37]" : "text-white group-hover:text-white/90"
                                            }`}>
                                            {faq.question}
                                        </span>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${isOpen ? "bg-[#D4AF37] text-[#0B1C2D] rotate-180" : "bg-white/5 text-white/40 group-hover:bg-white/10"
                                            }`}>
                                            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            >
                                                <div className="px-6 md:px-8 pb-8">
                                                    <div className="h-px w-full bg-white/5 mb-6" />
                                                    <p className="text-white/60 text-base md:text-lg leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
