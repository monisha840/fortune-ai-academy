import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Journey", href: "#journey" },
  { label: "Why Us", href: "#why-us" },
  { label: "Placements", href: "#placements" },
  { label: "Courses", href: "#courses" },
  { label: "Branches", href: "#branches" },
  { label: "Contact", href: "#demo" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-secondary">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#hero" className="font-display text-xl font-bold text-primary-foreground tracking-tight">
          FORTUNE <span className="text-accent">INNOVATIVES</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-primary-foreground/70 hover:text-accent transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#demo"
            className="bg-accent text-accent-foreground px-5 py-2 rounded-md text-sm font-semibold hover-scale"
          >
            Book Free Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-primary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-secondary overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#demo"
                onClick={() => setOpen(false)}
                className="bg-accent text-accent-foreground px-5 py-2.5 rounded-md text-sm font-semibold text-center"
              >
                Book Free Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
