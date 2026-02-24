import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ChevronDown, Sparkles, AlertCircle } from "lucide-react";
import { supabase, crmSupabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

const courses = [
    "UI/UX Design",
    "Full Stack Development",
    "Graphic Designing",
    "Video Editing",
    "Textile & Garment Design",
    "Packaging Design",
    "Fashion CADD",
    "Tally Prime",
];

const branches = ["Erode", "Coimbatore", "Salem", "Tiruppur"];

const Apply = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        course: "",
        branch: "",
    });

    const [focused, setFocused] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validate all fields
        if (!form.name || !form.phone || !form.email || !form.course || !form.branch) {
            setError("Please fill in all fields before submitting.");
            setLoading(false);
            return;
        }

        try {
            // 1. Submit to Local Supabase (snake_case)
            const localPromise = supabase
                .from("leads")
                .insert([
                    {
                        name: form.name,
                        phone: form.phone,
                        email: form.email,
                        course: form.course,
                        branch: form.branch,
                        created_at: new Date().toISOString(),
                    },
                ]);

            // 2. Submit to CRM Supabase (camelCase)
            const crmPromise = crmSupabase
                .from("leads")
                .insert([
                    {
                        firstName: form.name.split(' ')[0],
                        lastName: form.name.split(' ').slice(1).join(' ') || '',
                        phone: form.phone,
                        email: form.email,
                        interestedCourse: form.course,
                        location: form.branch,
                        notes: `Preferred Branch: ${form.branch}`,
                        source: "Website Enquiry",
                        status: "NEW",
                        createdAt: new Date().toISOString(),
                    },
                ]);

            // Execute both insertions
            const [localResult, crmResult] = await Promise.all([localPromise, crmPromise]);

            if (localResult.error) throw localResult.error;
            if (crmResult.error) {
                console.error("CRM Sync Error:", crmResult.error);
                // We proceed if local was successful, but log the CRM error
            }

            setSubmitted(true);
        } catch (err: any) {
            console.error("Submission error:", err);
            setError("Something went wrong. Please try again or contact us directly.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl text-center max-w-lg w-full gold-glow-box"
                >
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-accent" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white mb-4">You're In!</h2>
                    <p className="text-white/70 mb-2">Thank you, <span className="text-accent font-semibold">{form.name}</span>!</p>
                    <p className="text-white/60 mb-8">Our career counselors will reach out to you shortly to finalize your spot.</p>
                    <Link to="/" className="text-accent font-semibold hover:underline">
                        ← Return Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-navy overflow-hidden">

            {/* Left Side: Visual Experience */}
            <div className="lg:w-1/2 relative min-h-[40vh] lg:min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-hidden">
                {/* Animated Background Mesh */}
                <div className="absolute inset-0 bg-navy-deep">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] animate-pulse-gold opacity-30" />
                </div>

                {/* Floating Shapes */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-20 w-32 h-32 border border-white/5 rounded-full hidden lg:block"
                />
                <motion.div
                    animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-20 left-20 w-24 h-24 border border-accent/10 rounded-xl hidden lg:block rotate-45"
                />

                {/* Content */}
                <div className="relative z-10 max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6"
                    >
                        <Sparkles size={14} className="text-accent" />
                        <span className="text-accent text-xs font-bold uppercase tracking-widest">Future Ready</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-display text-4xl md:text-6xl font-black text-white leading-tight mb-6"
                    >
                        Take The First Step Toward <span className="text-gradient-gold">Career Clarity</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-white/60 text-lg leading-relaxed max-w-md"
                    >
                        Join an ecosystem of innovators. Secure your spot in our industry-led programs and transform your future today.
                    </motion.p>
                </div>
            </div>

            {/* Right Side: Glass Form */}
            <div className="lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 md:p-10 shadow-2xl relative overflow-hidden group"
                >
                    {/* Glow border effect */}
                    <div className="absolute inset-0 border border-accent/20 rounded-[30px] opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <form onSubmit={handleSubmit} className="relative z-10 space-y-6 pt-4">

                        {/* Name */}
                        <div className="relative mb-6">
                            <label className={`absolute left-0 top-3 pointer-events-none font-medium transition-all duration-200 origin-left ${focused === "name" || form.name ? "-translate-y-6 scale-[0.85] text-accent" : "text-white/50"}`}>
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                onFocus={() => setFocused("name")}
                                onBlur={() => setFocused(null)}
                                required
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                            />
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${focused === "name" ? "w-full" : "w-0"}`} />
                        </div>

                        {/* Phone */}
                        <div className="relative mb-6">
                            <label className={`absolute left-0 top-3 pointer-events-none font-medium transition-all duration-200 origin-left ${focused === "phone" || form.phone ? "-translate-y-6 scale-[0.85] text-accent" : "text-white/50"}`}>
                                Phone Number
                            </label>
                            <input
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                onFocus={() => setFocused("phone")}
                                onBlur={() => setFocused(null)}
                                required
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                            />
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${focused === "phone" ? "w-full" : "w-0"}`} />
                        </div>

                        {/* Email */}
                        <div className="relative mb-6">
                            <label className={`absolute left-0 top-3 pointer-events-none font-medium transition-all duration-200 origin-left ${focused === "email" || form.email ? "-translate-y-6 scale-[0.85] text-accent" : "text-white/50"}`}>
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                onFocus={() => setFocused("email")}
                                onBlur={() => setFocused(null)}
                                required
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                            />
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${focused === "email" ? "w-full" : "w-0"}`} />
                        </div>

                        {/* Course Select */}
                        <div className="relative mb-6 group">
                            <label className="absolute -top-5 left-0 text-accent text-xs font-bold uppercase tracking-widest pointer-events-none">
                                Desired Course
                            </label>
                            <div className="relative">
                                <select
                                    name="course"
                                    value={form.course}
                                    onChange={handleChange}
                                    onFocus={() => setFocused("course")}
                                    onBlur={() => setFocused(null)}
                                    required
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none appearance-none cursor-pointer hover:border-white/40 transition-colors"
                                >
                                    <option value="" className="bg-[#0B1C2D] text-white/50">Select Course</option>
                                    {courses.map((opt) => (
                                        <option key={opt} value={opt} className="bg-[#0B1C2D] text-white">{opt}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                                <div className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${focused === "course" ? "w-full" : "w-0"}`} />
                            </div>
                        </div>

                        {/* Branch Select */}
                        <div className="relative mb-6 group">
                            <label className="absolute -top-5 left-0 text-accent text-xs font-bold uppercase tracking-widest pointer-events-none">
                                Preferred Branch
                            </label>
                            <div className="relative">
                                <select
                                    name="branch"
                                    value={form.branch}
                                    onChange={handleChange}
                                    onFocus={() => setFocused("branch")}
                                    onBlur={() => setFocused(null)}
                                    required
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none appearance-none cursor-pointer hover:border-white/40 transition-colors"
                                >
                                    <option value="" className="bg-[#0B1C2D] text-white/50">Select Branch</option>
                                    {branches.map((opt) => (
                                        <option key={opt} value={opt} className="bg-[#0B1C2D] text-white">{opt}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                                <div className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${focused === "branch" ? "w-full" : "w-0"}`} />
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            className="w-full bg-accent text-navy font-black text-lg py-4 rounded-xl shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-8 relative overflow-hidden group/btn disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 pointer-events-none" />
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                <>SECURE MY SPOT <Sparkles size={18} /></>
                            )}
                        </motion.button>

                        <p className="text-center text-white/30 text-[10px] mt-4">
                            Limited seats available for upcoming batch.
                        </p>
                    </form>
                </motion.div>
            </div>

        </div>
    );
};

export default Apply;
