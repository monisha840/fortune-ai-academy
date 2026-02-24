import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ImageItem {
    src: string;
    alt: string;
}

const IMAGES: ImageItem[] = [
    { src: "/arena/arena1.png", alt: "Growth and Development Session" },
    { src: "/arena/arena2.png", alt: "Team Collaboration Meeting" },
    { src: "/arena/arena3.png", alt: "Leadership Workshop" },
    { src: "/arena/arena4.png", alt: "Skills Training Session" },
    { src: "/arena/arena5.png", alt: "Interactive Learning" },
    { src: "/arena/arena6.png", alt: "Student Success Moment" },
    { src: "/arena/arena7.png", alt: "Professional Development" },
    { src: "/arena/arena8.png", alt: "Practical Training" },
    { src: "/arena/arena9.png", alt: "Industry Guest Lecture" },
    { src: "/arena/arena10.png", alt: "Mentorship Session" },
    { src: "/arena/arena11.png", alt: "Hands-on Project Work" },
    { src: "/arena/arena12.png", alt: "Graduation Celebration" },
];

const Lightbox = ({
    images,
    currentIndex,
    onClose,
    onNext,
    onPrev
}: {
    images: ImageItem[],
    currentIndex: number,
    onClose: () => void,
    onNext: () => void,
    onPrev: () => void
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [onClose, onNext, onPrev]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0B1C2D]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/70 hover:text-accent transition-colors z-20"
            >
                <X size={32} />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 text-white p-3 rounded-full transition-all z-20"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 text-white p-3 rounded-full transition-all z-20"
            >
                <ChevronRight size={32} />
            </button>

            <div
                className="relative max-w-5xl w-full h-full flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    />
                </AnimatePresence>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </motion.div>
    );
};

const EmpowermentArena = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const handleNext = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % IMAGES.length);
        }
    };

    const handlePrev = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + IMAGES.length) % IMAGES.length);
        }
    };

    return (
        <section id="empowerment-arena" className="section-dark py-24 md:py-32 relative overflow-hidden bg-[#0B1C2D]">
            {/* Background Decorations */}
            <div className="absolute inset-0 hero-grid opacity-10 pointer-events-none" />
            <div className="absolute top-1/4 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Heading Section */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-white inline-block relative">
                            Empowerment <span className="text-accent italic">Arena</span>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute -bottom-2 left-0 h-[3px] bg-accent rounded-full"
                            />
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 text-white/50 text-lg md:text-xl font-medium"
                    >
                        Moments of Growth, Leadership & Success
                    </motion.p>
                </div>

                {/* Masonry Grid */}
                <div className="masonry-grid columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {IMAGES.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: idx % 4 * 0.1
                            }}
                            className="break-inside-avoid"
                        >
                            <div
                                onClick={() => setSelectedImage(idx)}
                                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-secondary/20 border border-white/5 transition-all duration-500 hover:border-accent/40 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    loading="lazy"
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-[#0B1C2D]/0 group-hover:bg-[#0B1C2D]/35 transition-all duration-300 pointer-events-none" />

                                {/* Glowy Yellow Border (Hover) */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent group-hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.4),0_0_20px_rgba(212,175,55,0.4)] rounded-2xl transition-all duration-300 pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 md:mt-32 text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                        Step Into Your Future With Confidence
                    </h3>
                    <Link
                        to="/apply"
                        className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                    >
                        Become Part of the Arena
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <Lightbox
                        images={IMAGES}
                        currentIndex={selectedImage}
                        onClose={() => setSelectedImage(null)}
                        onNext={handleNext}
                        onPrev={handlePrev}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default EmpowermentArena;
