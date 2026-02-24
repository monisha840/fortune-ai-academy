import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    status: string;
    created_at: string;
}

const FALLBACK_FAQS = [
    { id: 'f1', question: "Do you offer placement assistance after the course?", answer: "Yes, we provide 100% placement support. Our dedicated career cell works with top tech companies and design firms to ensure our students get placed in their dream roles.", status: 'published' },
    { id: 'f2', question: "Are these courses suitable for absolute beginners?", answer: "Absolutely. Our curriculum is designed to take you from zero to expert. We start with fundamental concepts and gradually move towards advanced, industry-level projects.", status: 'published' },
    { id: 'f3', question: "Do I get a certificate upon completion?", answer: "Yes, you will receive an industry-recognized certification from Fortune Academy, along with a portfolio of live projects that you can showcase to employers.", status: 'published' },
    { id: 'f4', question: "What is the mode of training?", answer: "We offer both classroom-based intensive training and interactive online sessions. Both modes involve hands-on projects and direct mentorship from industry experts.", status: 'published' },
    { id: 'f5', question: "Can I pay the course fee in installments?", answer: "Yes, we have flexible payment plans and EMI options to make our premium education accessible to everyone.", status: 'published' }
];

const FAQItem = ({ question, answer, isOpen, onClick }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            className={`border border-accent/10 rounded-[12px] overflow-hidden bg-secondary/40 backdrop-blur-sm transition-all duration-300 ${isOpen ? 'bg-secondary/60 ring-1 ring-accent/30 shadow-[0_0_20px_rgba(212,175,55,0.05)]' : 'hover:border-accent/30'}`}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors group cursor-pointer"
            >
                <span className={`font-bold text-lg md:text-xl pr-8 transition-colors ${isOpen ? 'text-accent' : 'text-primary-foreground/90 group-hover:text-primary-foreground'}`}>
                    {question}
                </span>
                <div className="flex-shrink-0 relative w-6 h-6 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1, scale: isOpen ? 0.5 : 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute"
                    >
                        <Plus size={24} className="text-accent" />
                    </motion.div>
                    <motion.div
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: isOpen ? 0 : -90, opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.5 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute"
                    >
                        <Minus size={24} className="text-accent" />
                    </motion.div>
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 text-primary-foreground/70 text-[15px] md:text-base leading-relaxed whitespace-pre-line border-t border-white/5 mt-0 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaqs = async () => {
            const { data, error } = await supabase
                .from('faqs')
                .select('*')
                .eq('status', 'published')
                .order('created_at', { ascending: true });

            if (data && !error && data.length > 0) {
                setFaqs(data);
            } else {
                setFaqs(FALLBACK_FAQS as FAQ[]);
            }
            setLoading(false);
        };

        fetchFaqs();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="faq" className="section-dark py-20 md:py-32 relative overflow-hidden flex flex-col items-center">
            {/* Background pattern */}
            <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -ml-64 -mb-64" />

            <div className="max-w-[900px] w-full mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[32px] md:text-5xl font-bold font-display text-white mb-6">
                        Frequently Asked <span className="text-gradient-gold">Questions</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Find answers to common questions about our courses and placements
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="animate-spin text-accent" size={40} />
                        <p className="text-accent/60 text-sm font-medium animate-pulse">Consulting the knowledge base...</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {faqs.map((faq, index) => (
                            <motion.div key={faq.id} variants={itemVariants}>
                                <FAQItem
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 md:mt-24 text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                        Still have a question?
                    </h3>
                    <Link
                        to="/apply"
                        className="inline-block w-full sm:w-auto bg-accent text-accent-foreground px-10 py-4 rounded-xl font-bold text-lg shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 hover:brightness-90 uppercase tracking-wider"
                    >
                        Ask Question
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;
