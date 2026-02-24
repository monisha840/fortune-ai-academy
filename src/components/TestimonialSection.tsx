import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { Sparkles, MapPin, Building2, CheckCircle } from "lucide-react";
import { placedStudentsData as initialStudents } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

const DESKTOP_CARD_WIDTH = 280;
const DESKTOP_CARD_GAP = 24;
const MOBILE_CARD_WIDTH = 150;
const MOBILE_CARD_GAP = 14;
const SPEED = 0.55;

function useCardDimensions() {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < 640 : false
    );
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return isMobile
        ? { cardWidth: MOBILE_CARD_WIDTH, cardGap: MOBILE_CARD_GAP }
        : { cardWidth: DESKTOP_CARD_WIDTH, cardGap: DESKTOP_CARD_GAP };
}

const PlacementCard = ({
    student,
    status,
    cardWidth,
    cardGap,
}: {
    student: any;
    status: "active" | "faded";
    cardWidth: number;
    cardGap: number;
}) => {
    const isMobile = cardWidth < 200;

    return (
        <div
            className="flex-shrink-0 relative transition-all duration-500"
            style={{
                width: cardWidth,
                paddingTop: isMobile ? "2.5rem" : "4rem",
            }}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                <div
                    className={`${isMobile ? "w-16 h-16" : "w-28 h-28"} rounded-full overflow-hidden border-[3px] shadow-2xl`}
                    style={{
                        borderColor: "rgba(212,175,55,0.35)",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.5), 0 0 0 4px rgba(212,175,55,0.08)",
                    }}
                >
                    <img
                        src={student.image_url}
                        alt={student.name}
                        className="w-full h-full object-cover object-center"
                        draggable={false}
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-[#0b1c2d] shadow-lg">
                    <CheckCircle size={11} className="text-white" />
                </div>
            </div>

            <div
                className={`rounded-[20px] border border-white/[0.08] flex flex-col items-center text-center ${isMobile ? "gap-1.5 px-3 pt-10 pb-4" : "gap-3 px-6 pt-16 pb-8"}`}
                style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
            >
                <h3 className={`text-white font-bold leading-tight tracking-tight ${isMobile ? "text-[11px]" : "text-lg"}`}>
                    {student.name}
                </h3>
                <div className="flex items-center gap-1">
                    <Building2 size={isMobile ? 10 : 13} className="text-accent flex-shrink-0" />
                    <span className={`text-accent font-semibold tracking-wide ${isMobile ? "text-[10px]" : "text-sm"}`}>
                        {student.company}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPin size={isMobile ? 9 : 12} className="text-white/40 flex-shrink-0" />
                    <span className={`text-white/50 font-medium ${isMobile ? "text-[9px]" : "text-xs"}`}>
                        {student.location}
                    </span>
                </div>
                <div className="mt-1 pt-3 border-t border-white/[0.07] w-full">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">
                        Successfully Placed
                    </span>
                </div>
            </div>
        </div>
    );
};

const TestimonialSection = () => {
    const [placedStudents, setPlacedStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const trackRef = useRef<HTMLDivElement>(null);
    const xRef = useRef(0);
    const isPausedRef = useRef(false);
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        const fetchStudents = async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('display_order', { ascending: true });

            if (data && !error && data.length > 0) {
                setPlacedStudents(data);
            } else {
                setPlacedStudents(initialStudents);
            }
            setLoading(false);
        };
        fetchStudents();
    }, []);

    const { cardWidth, cardGap } = useCardDimensions();
    const cardTotal = cardWidth + cardGap;
    const items = placedStudents.length > 0 ? [...placedStudents, ...placedStudents, ...placedStudents] : [];
    const totalWidth = placedStudents.length * cardTotal;

    useAnimationFrame(() => {
        if (isPausedRef.current || loading || placedStudents.length === 0) return;
        xRef.current -= SPEED;
        if (Math.abs(xRef.current) >= totalWidth) {
            xRef.current += totalWidth;
        }
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${xRef.current}px)`;
        }
        forceUpdate((n) => n + 1);
    });

    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-navy-deep">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[120px] opacity-25"
                    style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.2) 0%, transparent 70%)" }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
                >
                    <Sparkles size={13} className="text-accent" />
                    <span className="text-accent text-[11px] font-bold uppercase tracking-[0.2em]">Placement Success</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight"
                >
                    Career <span className="text-gradient-gold">Transformations</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white/40 text-sm mt-4 max-w-md mx-auto"
                >
                    Real students. Real placements. An endless stream of success.
                </motion.p>
            </div>

            <div
                className="relative w-full overflow-hidden"
                style={{ paddingTop: "4.5rem", paddingBottom: "2.5rem" }}
                onMouseEnter={() => { isPausedRef.current = true; }}
                onMouseLeave={() => { isPausedRef.current = false; }}
            >
                <div className="absolute left-0 top-0 h-full w-[160px] z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #0b1c2d 0%, transparent 100%)" }} />
                <div className="absolute right-0 top-0 h-full w-[160px] z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #0b1c2d 0%, transparent 100%)" }} />

                <div
                    ref={trackRef}
                    className="flex"
                    style={{ gap: cardGap, willChange: "transform", backfaceVisibility: "hidden" }}
                >
                    {items.map((student, index) => (
                        <PlacementCard
                            key={`${student.name}-${index}`}
                            student={student}
                            status="active"
                            cardWidth={cardWidth}
                            cardGap={cardGap}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
