import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, MessageCircle, Navigation, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Branch Data Structure with Coordinates
const branches = [
  {
    city: "Erode",
    address: "123, Brough Road, Erode - 638001",
    phone: "+91 94433 00001",
    tagline: "Headquarters",
    lat: 11.3424,
    lng: 77.7282,
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=11.3424,77.7282",
  },
  {
    city: "Coimbatore",
    address: "45, RS Puram, Coimbatore - 641002",
    phone: "+91 94433 00002",
    tagline: "Innovation Hub",
    lat: 11.0104,
    lng: 76.9499,
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=11.0104,76.9499",
  },
  {
    city: "Salem",
    address: "78, Junction Main Road, Salem - 636007",
    phone: "+91 94433 00003",
    tagline: "Tech Center",
    lat: 11.6643,
    lng: 78.1460,
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=11.6643,78.1460",
  },
  {
    city: "Tiruppur",
    address: "12, College Road, Tiruppur - 641601",
    phone: "+91 94433 00004",
    tagline: "Design Studio",
    lat: 11.1107,
    lng: 77.3480,
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=11.1107,77.3480",
  },
];

const BranchSection = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section id="branches" className="section-light py-24 md:py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Our Network</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            4 Branches Across <span className="text-gradient-gold">Tamil Nadu</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Visit our premium campuses designed for the AI era. Experience state-of-the-art infrastructure and collaborative learning spaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 perspective-1000">
          {branches.map((branch, index) => (
            <div
              key={branch.city}
              className={cn(
                "relative h-[220px] md:h-[420px] w-full cursor-pointer group perspective-container",
                flippedIndex !== null && flippedIndex !== index && "opacity-60 blur-[1px] scale-95 transition-all duration-500"
              )}
              onClick={() => handleFlip(index)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-700 ease-in-out"
                animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
              >
                {/* --- FRONT SIDE --- */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl md:rounded-2xl bg-white/50 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300 flex flex-col items-center justify-between p-3 md:p-6 text-center group-hover:-translate-y-2">
                  <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center mb-1 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-4 h-4 md:w-8 md:h-8 text-accent" />
                  </div>

                  <div>
                    <h3 className="font-display text-sm md:text-2xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                      {branch.city}
                    </h3>

                    {/* Decorative Separator in place of text */}
                    <div className="h-0.5 w-12 md:w-20 bg-gradient-to-r from-transparent via-accent/50 to-transparent mx-auto my-3 md:my-6" />

                  </div>

                  <div className="mt-auto pt-2 md:pt-4 border-t border-border w-full flex items-center justify-center gap-1 text-primary font-medium opacity-80">
                    <span className="text-[9px] md:text-sm">Tap to Explore</span>
                  </div>
                </div>

                {/* --- BACK SIDE --- */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-primary text-white shadow-2xl overflow-hidden border border-accent/20">
                  {/* Map Iframe */}
                  <div className="h-[48%] w-full relative bg-muted">
                    <iframe
                      src={`https://www.google.com/maps?q=${branch.lat},${branch.lng}&z=15&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 transition-all duration-500"
                    />

                    {/* Close/Flip Back Button for mobile/easier capability */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlip(index);
                      }}
                      className="absolute top-2 right-2 p-1.5 md:p-2 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors z-10"
                    >
                      <X className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="h-[52%] p-2.5 md:p-6 flex flex-col justify-between bg-gradient-to-b from-primary to-[#0a1630]">
                    <div>
                      <h4 className="font-display text-sm md:text-xl font-bold text-white mb-0.5 md:mb-1">{branch.city}</h4>
                      <p className="text-white/70 text-[9px] md:text-xs mb-1 md:mb-4 leading-tight">{branch.address}</p>
                    </div>

                    <div className="space-y-1 md:space-y-3">
                      <a
                        href={`tel:${branch.phone}`}
                        className="flex items-center gap-1.5 md:gap-3 text-[10px] md:text-sm text-white/80 hover:text-accent transition-colors w-full p-1 md:p-2 rounded-lg hover:bg-white/5 tracking-tighter sm:tracking-normal"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone size={12} className="md:size-4" />
                        <span>{branch.phone}</span>
                      </a>

                      <a
                        href={branch.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center justify-center gap-1 md:gap-2 w-full py-1.5 md:py-3 rounded-md md:rounded-xl bg-gradient-to-r from-accent to-yellow-500 text-primary font-bold text-[10px] md:text-sm shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="relative z-10 flex items-center gap-1 md:gap-2">
                          <Navigation className="w-3 h-3 md:w-4 md:h-4" />
                          View Directions
                        </span>
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-white/30 translate-x-[-100%] skewed-x-12 group-hover/btn:animate-shine" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Global CSS for 3D flip */}
      <style>{`
        .perspective-container {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes shine {
          100% {
            transform: translateX(100%);
          }
        }
        .group-hover\\/btn\\:animate-shine:hover {
            animation: shine 0.7s;
        }
      `}</style>
    </section>
  );
};

export default BranchSection;
