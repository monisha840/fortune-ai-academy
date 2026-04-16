import { useState, useEffect, useCallback, useMemo, useRef, TouchEvent } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type GalleryType = "arena" | "placement";

/**
 * Row shape for `public.gallery_items` (see gallery_items_migration.sql).
 */
export interface GalleryItem {
    id: string;
    type: GalleryType;
    image_url: string;
    position: string | null;     // role the student was placed as
    company: string | null;      // partner / hiring company
    location: string | null;     // work city
    salary: string | null;       // optional salary highlight
    title: string | null;        // generic caption / headline
    description: string | null;
    display_order: number;
    is_featured: boolean;
}

/**
 * Fallback dataset used when the Supabase `gallery_items` table is empty or
 * unreachable (e.g. migration not yet run). Keeps the page functional offline.
 * Values mirror the seed block in `gallery_items_migration.sql`.
 */
const makeFallbackItem = (
    id: string,
    type: GalleryType,
    image_url: string,
    display_order: number,
    extras: Partial<GalleryItem> = {}
): GalleryItem => ({
    id,
    type,
    image_url,
    position: null,
    company: null,
    location: null,
    salary: null,
    title: null,
    description: null,
    display_order,
    is_featured: false,
    ...extras,
});

const FALLBACK_ARENA: GalleryItem[] = Array.from({ length: 15 }, (_, i) =>
    makeFallbackItem(`fallback-arena-${i + 1}`, "arena", `/gallery/arena/arena${i + 1}.png`, i + 1)
);

const FALLBACK_PLACEMENTS: GalleryItem[] = [
    ["anjalien.jpeg", "Front End Developer", "Connex", "Salem"],
    ["dhanusri.png", "Graphic Designer", "Texture Graphic Solutions", "Perundurai"],
    ["gayathri.png", "UI Designer (Creative Trainee)", "Bean Infotech", "Coimbatore"],
    ["manikandan.png", "UI/UX Designer (Intern)", "The Coding Cult", "Hyderabad"],
    ["suberiya.png", "Architect Editor", "EPYX Creations", "Kangeyam"],
    ["surya-prakash.jpeg", "Junior Graphic Designer", "Nextab Branding", "Coimbatore"],
    ["tamil.png", "UI/UX Designer", "Cloud & Clouds", "Singapore"],
    ["student1.png", "Graphic Designer + Digital Marketing", "Coimbatore Baby Props & Baby Studio", "Coimbatore"],
    ["student2.png", "Graphic Designer", "Yuga Toys", "Erode"],
    ["student3.png", "Graphic Designer", "Astro", "Chennai"],
    ["student4.png", "Graphic Designer", "Dazzle Tech Solutions", "Coimbatore"],
    ["student5.png", "Printing Designer", "AS International Zoza", "Tirupur"],
    ["student6.png", "UX/UI Designer (Intern)", "Hypergrow", "Coimbatore"],
    ["student7.png", "Frontend Developer (Intern)", "VizWeb Solutions", "Tirupur"],
    ["student8.png", "Frontend Developer (Intern)", "VizWeb Solutions", "Tirupur"],
    ["student9.png", "Graphic Designer", "Yuva FX Info Solution", "Coimbatore"],
    ["student10.png", "Graphic Designer", "Kalso Digital", "Tirupur"],
].map(([file, position, company, location], i) =>
    makeFallbackItem(
        `fallback-placement-${i + 1}`,
        "placement",
        `/gallery/placements/${file}`,
        i + 1,
        { position, company, location }
    )
);

const FALLBACK_ITEMS: GalleryItem[] = [...FALLBACK_ARENA, ...FALLBACK_PLACEMENTS];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: (i % 8) * 0.06 },
    }),
};

/* -------------------------------------------------------------------------- */
/*                              Fullscreen Modal                              */
/* -------------------------------------------------------------------------- */

interface ModalProps {
    images: GalleryItem[];
    index: number;
    onClose: () => void;
    onNav: (dir: 1 | -1) => void;
}

const ImageModal = ({ images, index, onClose, onNav }: ModalProps) => {
    const touchStart = useRef<number | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNav(1);
            if (e.key === "ArrowLeft") onNav(-1);
        };
        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose, onNav]);

    const handleTouchStart = (e: TouchEvent) => {
        touchStart.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
        if (touchStart.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 50) onNav(delta > 0 ? -1 : 1);
        touchStart.current = null;
    };

    const current = images[index];
    const altText = current.position || current.title || current.company || "Gallery image";
    const hasDetails =
        current.type === "placement" &&
        (current.position || current.company || current.location || current.salary);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#0B1C2D]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 md:top-8 md:right-8 text-white/70 hover:text-accent transition-colors z-20 bg-white/5 hover:bg-white/10 rounded-full p-2"
            >
                <X size={26} />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onNav(-1); }}
                aria-label="Previous"
                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 text-white p-3 rounded-full transition-all z-20"
            >
                <ChevronLeft size={28} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onNav(1); }}
                aria-label="Next"
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 text-white p-3 rounded-full transition-all z-20"
            >
                <ChevronRight size={28} />
            </button>

            <div
                className="relative w-full max-w-5xl flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current.id}
                        src={current.image_url}
                        alt={altText}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
                        loading="eager"
                    />
                </AnimatePresence>

                {hasDetails && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mt-5 text-center px-4"
                    >
                        {current.position && (
                            <h3 className="text-white font-display text-xl md:text-2xl font-bold tracking-tight">
                                {current.position}
                            </h3>
                        )}
                        {current.company && (
                            <p className="text-white/80 text-sm md:text-base mt-1.5 font-medium">
                                {current.company}
                            </p>
                        )}
                        {current.location && (
                            <p className="text-white/55 text-xs md:text-sm mt-1">
                                {current.location}
                            </p>
                        )}
                        {current.salary && (
                            <p className="mt-3 inline-block text-accent font-bold text-base md:text-lg px-3 py-1 rounded-full bg-accent/10 border border-accent/30">
                                {current.salary}
                            </p>
                        )}
                    </motion.div>
                )}

                <div className="mt-4 text-white/40 text-xs md:text-sm font-medium">
                    {index + 1} / {images.length}
                </div>
            </div>
        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                                Gallery Cards                               */
/* -------------------------------------------------------------------------- */

const ArenaCard = ({ item, idx, onOpen }: { item: GalleryItem; idx: number; onOpen: () => void }) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        custom={idx}
        className="break-inside-avoid mb-3 md:mb-4"
    >
        <button
            onClick={onOpen}
            className="group relative block w-full rounded-2xl overflow-hidden bg-white/5 border border-white/5 transition-all duration-500 md:hover:border-accent/40 md:hover:shadow-[0_10px_30px_rgba(212,175,55,0.18)] will-change-transform"
        >
            <img
                src={item.image_url}
                alt={item.title || "Empowerment Arena moment"}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transition-transform duration-700 md:group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-[#0B1C2D]/0 md:group-hover:bg-[#0B1C2D]/35 transition-colors duration-300 pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent md:group-hover:border-accent md:group-hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.35),0_0_20px_rgba(212,175,55,0.35)] transition-all duration-300 pointer-events-none" />
        </button>
    </motion.div>
);

const PlacementCard = ({ item, idx, onOpen }: { item: GalleryItem; idx: number; onOpen: () => void }) => {
    const hasOverlay = Boolean(item.position || item.company || item.location);

    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            custom={idx}
        >
            <button
                onClick={onOpen}
                className="group relative block w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 md:hover:border-accent/50 md:hover:shadow-[0_12px_40px_rgba(212,175,55,0.25)] will-change-transform"
            >
                <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                        src={item.image_url}
                        alt={item.position || item.company || "Placed student"}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-[1.05]"
                    />
                </div>

                {hasOverlay && (
                    <>
                        {/* Dark gradient + blur backdrop (fade-in) */}
                        <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none bg-gradient-to-t from-[#0B1C2D]/95 via-[#0B1C2D]/55 to-transparent backdrop-blur-[2px]" />

                        {/* Text block — centered, slides up on hover */}
                        <div className="hidden md:flex absolute inset-0 items-end justify-center p-6 pointer-events-none">
                            <div className="w-full text-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                                {item.position && (
                                    <p className="text-white font-display font-bold text-lg leading-tight tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                                        {item.position}
                                    </p>
                                )}
                                {item.company && (
                                    <p className="mt-1.5 text-white/80 text-sm font-medium">
                                        {item.company}
                                    </p>
                                )}
                                {item.location && (
                                    <p className="mt-1 text-accent/90 text-xs font-medium">
                                        {item.location}
                                    </p>
                                )}
                                {item.salary && (
                                    <p className="mt-2 inline-block text-accent font-bold text-sm px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/30">
                                        {item.salary}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Subtle gold glow border on hover */}
                        <div className="hidden md:block absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/70 group-hover:shadow-[inset_0_0_20px_rgba(212,175,55,0.25),0_0_20px_rgba(212,175,55,0.35)] transition-all duration-300 pointer-events-none" />
                    </>
                )}
            </button>
        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                            Skeleton placeholders                           */
/* -------------------------------------------------------------------------- */

const ArenaSkeleton = () => (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
            <div
                key={i}
                className="break-inside-avoid mb-3 md:mb-4 rounded-2xl bg-white/5 border border-white/5 animate-pulse"
                style={{ height: `${160 + (i % 4) * 40}px` }}
            />
        ))}
    </div>
);

const PlacementSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
            <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 animate-pulse aspect-[4/5]"
            />
        ))}
    </div>
);

/* -------------------------------------------------------------------------- */
/*                                Gallery Page                                */
/* -------------------------------------------------------------------------- */

const Gallery = () => {
    const [tab, setTab] = useState<GalleryType>("arena");
    const [modalIdx, setModalIdx] = useState<number | null>(null);
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const fetchItems = async () => {
            setLoading(true);
            try {
                const { data, error: err } = await supabase
                    .from("gallery_items")
                    .select("*")
                    .order("display_order", { ascending: true });

                if (cancelled) return;

                if (err || !data || data.length === 0) {
                    if (err) {
                        // eslint-disable-next-line no-console
                        console.warn("[Gallery] Supabase fetch failed, using fallback:", err.message);
                    } else {
                        // eslint-disable-next-line no-console
                        console.info("[Gallery] gallery_items table empty — using fallback data.");
                    }
                    setItems(FALLBACK_ITEMS);
                } else {
                    setItems(data as GalleryItem[]);
                }
            } catch (e) {
                if (cancelled) return;
                // eslint-disable-next-line no-console
                console.warn("[Gallery] Supabase threw, using fallback:", e);
                setItems(FALLBACK_ITEMS);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchItems();
        return () => { cancelled = true; };
    }, []);

    const arenaItems = useMemo(
        () => items.filter((i) => i.type === "arena"),
        [items]
    );
    const placementItems = useMemo(
        () => items.filter((i) => i.type === "placement"),
        [items]
    );

    const activeItems = tab === "arena" ? arenaItems : placementItems;

    const handleNav = useCallback(
        (dir: 1 | -1) => {
            setModalIdx((prev) => {
                if (prev === null) return prev;
                const len = activeItems.length;
                if (!len) return null;
                return (prev + dir + len) % len;
            });
        },
        [activeItems.length]
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0A1829] via-[#0B1C2D] to-[#0A1829] text-white">
            <Navbar />

            {/* Ambient background blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden -z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] bg-accent/5 rounded-full blur-[160px]" />
            </div>

            <main className="relative z-10 pt-24 md:pt-28">
                {/* HEADER */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="px-5 md:px-8 text-center max-w-3xl mx-auto"
                >
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        Explore Life at{" "}
                        <span className="text-accent italic">Fortune Innovatives</span>
                    </h1>
                    <p className="mt-4 md:mt-6 text-white/60 text-sm sm:text-base md:text-lg">
                        From hands-on learning to real career success.
                    </p>
                </motion.header>

                {/* STICKY TABS */}
                <div className="sticky top-16 md:top-20 z-30 mt-8 md:mt-12 backdrop-blur-xl bg-[#0B1C2D]/70 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-5 md:px-8">
                        <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 md:py-4">
                            {([
                                { key: "arena", label: "Arena" },
                                { key: "placement", label: "Placements" },
                            ] as const).map((t) => {
                                const active = tab === t.key;
                                return (
                                    <button
                                        key={t.key}
                                        onClick={() => {
                                            setTab(t.key);
                                            setModalIdx(null);
                                        }}
                                        className={`relative px-5 sm:px-8 py-2 sm:py-2.5 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
                                            active
                                                ? "text-white"
                                                : "text-white/50 hover:text-white/80"
                                        }`}
                                    >
                                        {t.label}
                                        {active && (
                                            <motion.span
                                                layoutId="tab-underline"
                                                className="absolute left-3 right-3 -bottom-0.5 h-[3px] rounded-full bg-accent shadow-[0_0_12px_rgba(212,175,55,0.7)]"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-14">
                    <AnimatePresence mode="wait">
                            {tab === "arena" ? (
                                <motion.div
                                    key="arena"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.35 }}
                                    className="relative"
                                >
                                    {loading ? (
                                        <ArenaSkeleton />
                                    ) : arenaItems.length === 0 ? (
                                        <EmptyState label="No arena photos yet." />
                                    ) : (
                                        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
                                            {arenaItems.map((item, idx) => (
                                                <ArenaCard
                                                    key={item.id}
                                                    item={item}
                                                    idx={idx}
                                                    onOpen={() => setModalIdx(idx)}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Bottom edge fade — smooths the uneven masonry tail into the page background */}
                                    {!loading && arenaItems.length > 0 && (
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-x-0 bottom-0 h-[70px] md:h-[110px] bg-gradient-to-t from-[#0A1829] via-[#0A1829]/70 to-transparent"
                                        />
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placement"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {loading ? (
                                        <PlacementSkeleton />
                                    ) : placementItems.length === 0 ? (
                                        <EmptyState label="No placement stories yet." />
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                            {placementItems.map((item, idx) => (
                                                <PlacementCard
                                                    key={item.id}
                                                    item={item}
                                                    idx={idx}
                                                    onOpen={() => setModalIdx(idx)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />

            <AnimatePresence>
                {modalIdx !== null && activeItems[modalIdx] && (
                    <ImageModal
                        images={activeItems}
                        index={modalIdx}
                        onClose={() => setModalIdx(null)}
                        onNav={handleNav}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

const EmptyState = ({ label }: { label: string }) => (
    <div className="text-center text-white/50 py-20">
        <Loader2 className="inline-block animate-spin text-accent mb-4 opacity-0" size={32} />
        <p className="font-medium">{label}</p>
    </div>
);

export default Gallery;
