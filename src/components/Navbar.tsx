import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { courses } from "@/lib/constants";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Why Us", href: "#why-us" },
  { label: "Placements", href: "#placements" },
  { label: "Courses", href: "#courses", hasDropdown: true },
  { label: "Branches", href: "#branches" },
  { label: "Contact", href: "#demo" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCourseClick = (title: string) => {
    const event = new CustomEvent("courseSelected", { detail: { title } });
    window.dispatchEvent(event);
    setDropdownOpen(false);
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0B1C2D]/95 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="font-display text-2xl font-black text-white tracking-tighter">
          FORTUNE <span className="text-[#D4AF37]">INNOVATIVES</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <div
              key={l.label}
              className="relative group h-full py-2"
              onMouseEnter={() => l.hasDropdown && setDropdownOpen(true)}
              onMouseLeave={() => l.hasDropdown && setDropdownOpen(false)}
            >
              <a
                href={l.href}
                className="flex items-center gap-1 text-sm font-bold text-white/80 hover:text-[#D4AF37] transition-all duration-300"
              >
                {l.label}
                {l.hasDropdown && (
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                )}
              </a>

              {/* Course Dropdown */}
              {l.hasDropdown && (
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full -left-20 w-[600px] mt-4 p-10 bg-[#0B1C2D] border-2 border-[#D4AF37]/50 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.8)] grid grid-cols-2 gap-x-10 gap-y-6 overflow-hidden"
                    >
                      {/* Decorative background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent pointer-events-none" />

                      {courses.map((course) => (
                        <a
                          key={course.title}
                          href="#courses"
                          onClick={() => handleCourseClick(course.title)}
                          className="group/item relative flex flex-col p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.03] border border-transparent hover:border-white/10"
                        >
                          <span className="text-base font-extrabold text-white group-hover/item:text-[#D4AF37] transition-colors mb-1">
                            {course.title}
                          </span>
                          <span className="text-xs text-white/50 group-hover/item:text-white/80 font-medium">
                            {course.duration} · {course.category}
                          </span>

                          {/* Hover Indicator */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#D4AF37] rounded-r-full transition-all duration-300 group-hover/item:h-8" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <a
            href="/apply"
            className="bg-[#D4AF37] text-[#0B1C2D] px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
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
            <div className="flex flex-col h-full px-8 py-20 overflow-y-auto">
              <button className="absolute top-6 right-6 text-white" onClick={() => setOpen(false)}>
                <X size={32} />
              </button>

              <div className="space-y-8">
                {navLinks.map((l) => (
                  <div key={l.label} className="space-y-4">
                    <a
                      href={l.href}
                      onClick={() => !l.hasDropdown && setOpen(false)}
                      className="text-4xl font-bold text-white hover:text-[#D4AF37] transition-colors flex items-center justify-between"
                    >
                      {l.label}
                    </a>

                    {l.hasDropdown && (
                      <div className="grid grid-cols-1 gap-4 pl-4 border-l-2 border-white/10">
                        {courses.map((course) => (
                          <a
                            key={course.title}
                            href="#courses"
                            onClick={() => handleCourseClick(course.title)}
                            className="text-lg text-white/60 hover:text-[#D4AF37]"
                          >
                            {course.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <a
                  href="#faq"
                  onClick={() => setOpen(false)}
                  className="block w-full bg-[#D4AF37] text-[#0B1C2D] py-5 rounded-2xl text-xl font-bold text-center mt-12"
                >
                  Book Free Demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
