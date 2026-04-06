import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Quote, CheckCircle, Star } from "lucide-react";

// Mock data enriched for the 3D wall experience
const testimonials = [
    {
        id: 1,
        image_url: "/students/student7.png",
        name: "Nithyasri V",
        role: "UI/UX Designer",
        company: "Innovation LLP",
        quote: "The personalized mentorship at Fortune Academy completely transformed my design approach. I went from struggling with layouts to landing my dream role within 3 months.",
        stats: ["Placed in 90 Days", "Top Portfolio"]
    },
    {
        id: 2,
        image_url: "/students/student8.png",
        name: "Geetha S",
        role: "Frontend Developer",
        company: "Whistle",
        quote: "It's not just about coding; it's about building production-ready applications. Their rigorous curriculum gave me the confidence to crack tough technical interviews.",
        stats: ["Multiple Offers", "Super Dream Role"]
    },
    {
        id: 3,
        image_url: "/students/student9.png",
        name: "Gayathri G",
        role: "Full Stack Engineer",
        company: "My Bean Infotech",
        quote: "I never thought I could transition into tech so seamlessly. The real-world projects and dedicated placement cell made all the difference in my career journey.",
        stats: ["6 LPA Package", "Fast-tracked"]
    },
    {
        id: 4,
        image_url: "/students/student10.png",
        name: "Manikandan M",
        role: "Data Analyst",
        company: "The Coding Cult",
        quote: "The hands-on training with modern analytics tools was a game-changer. The instructors simulate real corporate environments which made the transition incredibly smooth.",
        stats: ["Placed in 45 Days"]
    },
    {
        id: 5,
        image_url: "/students/student11.png",
        name: "Suberiya M",
        role: "Graphic Designer",
        company: "EPX Creatives",
        quote: "From understanding color theory to mastering advanced tools, the journey was fantastic. I now lead a team of junior designers thanks to the foundation I built here.",
        stats: ["Promoted Faster", "Lead Role"]
    },
    {
        id: 6,
        image_url: "/students/student12.png",
        name: "Tamizharasan J",
        role: "Cloud Engineer",
        company: "Cloud and Clouds",
        quote: "Getting placed internationally was a distant dream that Fortune Academy made a reality. Their focus on global standards and cloud architectures gave me the edge.",
        stats: ["Singapore Placement", "Global Role"]
    }
];

const FloatingReviewWall = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Mouse tracking for 3D tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smoothing the mouse values
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    // Convert mouse position to rotation degrees (max 5deg)
    const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Normalize to -0.5 to 0.5
        const normalizedX = (x / rect.width) - 0.5;
        const normalizedY = (y / rect.height) - 0.5;

        mouseX.set(normalizedX);
        mouseY.set(normalizedY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Split testimonials into columns for masonry layout
    const columns = [
        testimonials.filter((_, i) => i % 3 === 0),
        testimonials.filter((_, i) => i % 3 === 1),
        testimonials.filter((_, i) => i % 3 === 2),
    ];

    // Floating animation variants per column
    const floatVariants = [
        { animate: { y: [-10, 15, -10] }, transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const } },
        { animate: { y: [15, -15, 15] }, transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const } },
        { animate: { y: [-15, 10, -15] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } },
    ];

    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-navy-deep perspective-1000">
            {/* Background FX */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                {/* Subtle floating particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
                >
                    <Star size={14} className="text-accent fill-accent" />
                    <span className="text-accent text-[11px] font-bold uppercase tracking-[0.2em]">Student Success</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4"
                >
                    More Than Training.<br />
                    <span className="text-gradient-gold">Real Career Transformations.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 text-lg max-w-2xl mx-auto"
                >
                    Hundreds of students. Real results. Real placements. Here is what they have to say about their journey with us.
                </motion.p>
            </div>

            <motion.div
                className="max-w-7xl mx-auto px-6"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 cursor-default">
                    {(isMobile ? [testimonials] : columns).map((colItems, colIndex) => (
                        <motion.div
                            key={`col-${colIndex}`}
                            className="flex flex-col gap-6 md:gap-8"
                            animate={isMobile ? { y: 0 } : floatVariants[colIndex].animate}
                            transition={isMobile ? {} : floatVariants[colIndex].transition}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Add slight top padding to middle column for scattered look */}
                            {colIndex === 1 && !isMobile && <div className="h-12" />}

                            {colItems.map((item, itemIndex) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: itemIndex * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group relative rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-300"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.03)",
                                        backdropFilter: "blur(16px)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    {/* Subtle edge glow on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500 rounded-3xl pointer-events-none" />
                                    <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl blur pointer-events-none z-[-1]" />

                                    {/* Top Row: Student Info */}
                                    <div className="flex items-center gap-4 mb-6 relative z-10">
                                        <div className="relative">
                                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-accent/30 group-hover:border-accent/80 transition-colors duration-300">
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // Fallback if image fails
                                                        e.currentTarget.src = 'https://i.pravatar.cc/150?u=' + item.id;
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-[#0b1c2d]">
                                                <CheckCircle size={10} className="text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg md:text-xl">{item.name}</h4>
                                            <p className="text-accent font-medium text-sm">{item.role}</p>
                                            <p className="text-white/40 text-xs mt-0.5">{item.company}</p>
                                        </div>

                                        <Quote className="absolute top-0 right-0 text-white/5 group-hover:text-accent/20 transition-colors duration-500 w-12 h-12 md:w-16 md:h-16 -z-10 transform scale-x-[-1]" />
                                    </div>

                                    {/* Body: Testimonial */}
                                    <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 relative z-10 font-light">
                                        "{item.quote}"
                                    </p>

                                    {/* Bottom Row: Stats */}
                                    <div className="flex flex-wrap gap-2 relative z-10">
                                        {item.stats.map((stat, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/80 text-[10px] md:text-xs font-semibold uppercase tracking-wider group-hover:border-accent/30 transition-colors duration-300 group-hover:bg-accent/10"
                                            >
                                                {stat}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default FloatingReviewWall;
