import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

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

const InputField = ({ label, type = "text", placeholder, ...props }: any) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className="relative mb-6">
            <motion.label
                initial={false}
                animate={{
                    y: focused || value ? -24 : 0,
                    scale: focused || value ? 0.85 : 1,
                    color: focused ? "#D4AF37" : "rgba(255,255,255,0.5)",
                }}
                className="absolute left-0 top-3 pointer-events-none origin-left transition-colors font-medium"
            >
                {label}
            </motion.label>
            <input
                type={type}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-accent transition-colors pb-2"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                {...props}
            />
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focused ? 1 : 0 }}
                className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-left"
            />
        </div>
    );
};

const SelectField = ({ label, options, ...props }: any) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className="relative mb-6 group">
            <label className="absolute -top-5 left-0 text-accent text-xs font-bold uppercase tracking-widest pointer-events-none">
                {label}
            </label>
            <div className="relative">
                <select
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none appearance-none cursor-pointer hover:border-white/40 transition-colors"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    {...props}
                >
                    <option value="" className="bg-navy-deep text-white/50">Select {label}</option>
                    {options.map((opt: string) => (
                        <option key={opt} value={opt} className="bg-navy-deep text-white">
                            {opt}
                        </option>
                    ))}
                </select>
                <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none group-hover:text-accent transition-colors" />
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focused ? 1 : 0 }}
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-left"
                />
            </div>
        </div>
    );
};

const Apply = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Additional submission logic here
    }

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
                    <p className="text-white/70 mb-8">Our career counselors will reach out to you shortly to finalize your spot.</p>
                    <a href="/" className="text-accent font-semibold hover:underline">Return Home</a>
                </motion.div>
            </div>
        )
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
                        <InputField label="Full Name" placeholder="John Doe" required />
                        <InputField label="Phone Number" type="tel" placeholder="+91 00000 00000" required />
                        <InputField label="Email Address" type="email" placeholder="john@example.com" required />

                        <SelectField label="Desired Course" options={courses} required />
                        <SelectField label="Preferred Branch" options={branches} required />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-accent text-navy font-black text-lg py-4 rounded-xl shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-8 relative overflow-hidden group/btn"
                        >
                            <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 pointer-events-none" />
                            SECURE MY SPOT <Sparkles size={18} />
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
