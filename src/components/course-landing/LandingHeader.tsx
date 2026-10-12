import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

// Landing pages are single-purpose: no section navigation, just the brand and
// one conversion action.
const LandingHeader = ({ academyLabel }: { academyLabel: string }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-deep/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 min-w-0" aria-label="Fortune Innovatives home">
          <img src={logo} alt="" className="h-8 md:h-9 w-auto shrink-0" />
          <span className="flex flex-col leading-none min-w-0">
            <span className="font-display font-black text-white tracking-tight text-[13px] min-[360px]:text-base md:text-lg truncate">
              FORTUNE <span className="text-accent">INNOVATIVES</span>
            </span>
            <span className="text-[8.5px] min-[360px]:text-[9px] md:text-[11px] tracking-[0.1em] min-[360px]:tracking-[0.12em] md:tracking-[0.2em] text-white/60 mt-1 truncate">
              {academyLabel}
            </span>
          </span>
        </Link>

        <a
          href="#enquire"
          className="shrink-0 rounded-full bg-accent text-accent-foreground font-bold text-xs md:text-sm px-3.5 min-[360px]:px-4 md:px-6 py-2.5 hover:scale-105 transition-transform"
        >
          <span className="hidden sm:inline">Book Free Counselling</span>
          <span className="sm:hidden">Enquire</span>
        </a>
      </div>
    </header>
  );
};

export default LandingHeader;
