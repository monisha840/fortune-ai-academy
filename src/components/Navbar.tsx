import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Why Us", href: "/why-us" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use dark background if scrolled OR if not on the home page
  const showBackground = scrolled || !isHomePage;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showBackground ? "bg-[#0B1C2D]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <img
            src={logo}
            alt="Fortune Innovatives"
            className="h-8 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="font-display text-xl md:text-2xl font-black text-white tracking-tighter">
            FORTUNE <span className="text-[#D4AF37]">INNOVATIVES</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className={`text-sm font-black transition-all duration-300 ${location.pathname === l.href ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
                }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/apply"
            className="bg-[#D4AF37] text-[#0B1C2D] px-6 py-2.5 rounded-full text-sm font-black hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#0B1C2D] z-[100] md:hidden"
          >
            <div className="flex flex-col h-full px-6 py-14 overflow-y-auto">
              <button className="absolute top-6 right-6 text-white" onClick={() => setOpen(false)}>
                <X size={32} />
              </button>

              <div className="space-y-4">
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className={`text-xl font-black block py-2 transition-colors ${location.pathname === l.href ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
                      }`}
                  >
                    {l.label}
                  </Link>
                ))}

                <Link
                  to="/apply"
                  onClick={() => setOpen(false)}
                  className="block w-full bg-[#D4AF37] text-[#0B1C2D] py-3 rounded-2xl text-base font-black text-center mt-8 shadow-xl"
                >
                  Book Free Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
