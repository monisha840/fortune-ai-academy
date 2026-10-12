import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SectionHeading from "./SectionHeading";

interface Partner {
  id: string;
  name: string;
  logo_url?: string | null;
}

// Hiring partners from the CMS `hiring_partners` table, shown as one
// continuously flowing row. The list is rendered twice and the track slides by
// exactly 50% (see .animate-scroll-left in index.css), so the loop is seamless.
// Pauses on hover and falls back to a swipeable row when the user prefers
// reduced motion.
const PartnersMarquee = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("hiring_partners")
      // select("*"): the live table may not have every migration column (e.g. logo_url)
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        if (!cancelled && !error && data) setPartners(data as Partner[]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (partners.length === 0) return null;

  // Make sure a short list still fills the track before it is doubled.
  const base = partners.length < 6 ? [...partners, ...partners, ...partners] : partners;
  const loop = [...base, ...base];

  return (
    <section className="relative section-dark py-20 md:py-24 overflow-hidden" aria-label="Hiring partners">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeading
          eyebrow="Industry connections"
          title="Our hiring partners"
          sub="Our students are recruited by some of the most innovative companies in the industry."
          dark
        />
      </div>

      <div
        className="group relative overflow-hidden motion-reduce:overflow-x-auto"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="flex w-max gap-4 md:gap-6 animate-scroll-left motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {loop.map((p, i) => (
            <li
              key={`${p.id}-${i}`}
              aria-hidden={i >= base.length}
              className="flex h-24 md:h-28 w-44 md:w-56 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-5 hover:border-accent/40 transition-colors"
            >
              {p.logo_url ? (
                <img
                  src={p.logo_url}
                  alt={i < base.length ? p.name : ""}
                  loading="lazy"
                  className="max-h-12 md:max-h-14 w-auto max-w-full object-contain grayscale hover:grayscale-0 transition"
                />
              ) : (
                <span className="flex items-center gap-2 text-white/60 font-semibold text-sm text-center">
                  <Building2 size={18} className="shrink-0 text-accent/70" />
                  <span className="line-clamp-2">{p.name}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PartnersMarquee;
