import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Building2, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

const HiringPartnersSection = () => {
    const [partners, setPartners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            const { data, error } = await supabase
                .from('hiring_partners')
                .select('*')
                .order('display_order', { ascending: true });

            if (data && !error) {
                setPartners(data);
            }
            setLoading(false);
        };

        fetchPartners();
    }, []);

    if (!loading && partners.length === 0) return null;

    return (
        <section className="relative py-24 md:py-32 bg-navy-deep overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-accent rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-30 mix-blend-screen" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
                    >
                        <Briefcase size={14} className="text-accent" />
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">Industry Connections</span>
                    </motion.div>

                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white text-center mb-6">
                        Our <span className="text-gradient-gold">Hiring Partners</span>
                    </h2>

                    <p className="text-white/60 text-center max-w-2xl text-lg">
                        Our students are recruited by some of the most innovative companies in the industry.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent border-solid" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {partners.map((partner, index) => (
                            <motion.div
                                key={partner.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl h-40 flex items-center justify-center backdrop-blur-sm hover:border-accent/30 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                                    {partner.logo_url ? (
                                        <img
                                            src={partner.logo_url}
                                            alt={partner.name}
                                            className="max-h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <Building2 className="text-white/20 group-hover:text-accent transition-colors" size={32} />
                                            <span className="text-white/40 font-bold text-sm tracking-wider">{partner.name}</span>
                                        </div>
                                    )}

                                    {/* Hover glow */}
                                    <div className="absolute inset-0 bg-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 pt-10 border-t border-white/5 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-white/40">
                        <Sparkles size={16} className="text-accent/40" />
                        <span className="text-sm font-medium">Join 50+ partners hiring our graduates every month</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HiringPartnersSection;
