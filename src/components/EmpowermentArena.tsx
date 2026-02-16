import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 1.5 + 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 20000);
            for (let i = 0; i < count; i++) particles.push(new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

const images = [
    { src: "/arena/arena1.png", height: "aspect-[4/3]" },
    { src: "/arena/arena2.png", height: "aspect-[1/1]" },
    { src: "/arena/arena3.png", height: "aspect-[3/4]" },
    { src: "/arena/arena4.png", height: "aspect-[3/2]" },
    { src: "/arena/arena5.png", height: "aspect-[4/5]" },
    { src: "/arena/arena6.png", height: "aspect-[1/1]" },
    { src: "/arena/arena7.png", height: "aspect-[3/4]" },
    { src: "/arena/arena8.png", height: "aspect-[4/3]" },
    { src: "/arena/arena9.png", height: "aspect-[1/1]" },
    { src: "/arena/arena10.png", height: "aspect-[3/2]" },
    { src: "/arena/arena11.png", height: "aspect-[4/5]" },
    { src: "/arena/arena12.png", height: "aspect-[3/4]" },
];

const EmpowermentArena = () => {
    return (
        <section id="empowerment-arena" className="relative py-24 md:py-32 bg-[#0B1C2D] overflow-hidden">
            <ParticleBackground />

            {/* Radial Glows */}
            <div className="absolute -top-48 -left-48 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        Empowerment <span className="bg-gradient-to-r from-[#D4AF37] to-[#F1C40F] bg-clip-text text-transparent italic">Arena</span>
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "120px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 bg-[#D4AF37] mx-auto rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-white/60 text-lg md:text-xl font-medium"
                    >
                        Where Learning Transforms Into Leadership
                    </motion.p>
                </div>

                {/* Masonry Layout */}
                <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
                    {images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05, duration: 0.5 }}
                            className="break-inside-avoid"
                        >
                            <div className="group relative bg-white/5 backdrop-blur-md rounded-[18px] p-2 border border-white/10 overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] cursor-pointer">
                                <div className={`relative overflow-hidden rounded-[14px] ${img.height}`}>
                                    <motion.img
                                        src={img.src}
                                        alt={`Arena moment ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-[#0B1C2D]/0 transition-colors duration-400 group-hover:bg-[#0B1C2D]/30" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Step Into Your Future With Confidence</h3>
                    <Link to="/apply" className="group relative px-10 py-4 bg-[#D4AF37] text-[#0B1C2D] font-bold rounded-full overflow-hidden transition-all duration-300 hover:bg-[#0B1C2D] hover:text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] active:scale-95 inline-block">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Become Part of the Arena <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default EmpowermentArena;
