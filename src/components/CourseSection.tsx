import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { courses, categories } from "@/lib/constants";

const CourseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  useEffect(() => {
    const handleCourseSelect = (e: CustomEvent<{ title: string }>) => {
      const index = courses.findIndex(c => c.title === e.detail.title);
      if (index !== -1) {
        setActiveCategory("All"); // Reset category to show all so index is correct
        setTimeout(() => {
          setActiveIndex(index);
          // Auto open detail view on mobile if course is selected from elsewhere (e.g. hero)
          if (window.innerWidth < 768) {
            setShowMobileDetail(true);
          }
        }, 0);
      }
    };

    window.addEventListener('courseSelected' as any, handleCourseSelect);
    return () => window.removeEventListener('courseSelected' as any, handleCourseSelect);
  }, []);

  const filtered = activeCategory === "All" ? courses : courses.filter((c) => c.category === activeCategory);
  const activeCourse = filtered[activeIndex] || filtered[0];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  const handleCourseClick = (index: number) => {
    setActiveIndex(index);
    if (window.innerWidth < 768) {
      setShowMobileDetail(true);
    }
  };

  return (
    <section id="courses" className="section-light py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-3">Our Programs</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Career-Focused <span className="text-gradient-gold">Courses</span>
          </h2>
        </motion.div>

        {/* --- MOBILE VIEW: LIST -> DETAIL --- */}
        <div className="block md:hidden relative">
          <AnimatePresence mode="wait">
            {!showMobileDetail ? (
              /* MOBILE STEP 1: Course List */
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Horizontal Categories */}
                <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${activeCategory === cat
                        ? "bg-accent text-accent-foreground gold-glow-box"
                        : "border border-border text-muted-foreground"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {filtered.map((course, i) => (
                    <button
                      key={course.title}
                      onClick={() => handleCourseClick(i)}
                      className="w-full text-left p-5 rounded-2xl bg-primary border border-white/10 active:scale-[0.98] transition-all duration-200 group relative"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-accent/80 font-bold">{course.category}</span>
                        {course.featured && (
                          <span className="text-[9px] uppercase tracking-wider bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">
                            Popular
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-2">{course.title}</h3>
                      <div className="flex items-center gap-3 text-white/50 text-xs">
                        <span>{course.duration}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-accent/90">{course.salary}</span>
                      </div>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <ArrowRight size={14} className="text-accent" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* MOBILE STEP 2: Course Detail */
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-background rounded-3xl border border-border overflow-hidden min-h-[500px] flex flex-col"
              >
                {/* Mobile Detail Header */}
                <div className="p-6 pb-2">
                  <button
                    onClick={() => setShowMobileDetail(false)}
                    className="flex items-center gap-2 text-accent font-semibold text-sm mb-6 active:translate-x-[-4px] transition-transform"
                  >
                    <ArrowRight size={16} className="rotate-180" />
                    Back to List
                  </button>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{activeCourse.category}</span>
                    <span className="w-6 h-px bg-accent/30" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4 leading-tight">
                    {activeCourse.title}
                  </h3>
                  <div className="h-1 w-12 bg-accent rounded-full mb-6" />
                </div>

                <div className="p-6 pt-0 flex-1 space-y-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {activeCourse.overview}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase tracking-widest text-foreground font-bold opacity-50">Technologies</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCourse.tools.map((t) => (
                        <span key={t} className="px-2.5 py-1 bg-primary text-primary-foreground text-[10px] rounded-lg font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
                      <div className="text-[9px] text-muted-foreground uppercase mb-1">Duration</div>
                      <div className="font-display font-bold text-foreground text-xs">{activeCourse.duration}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
                      <div className="text-[9px] text-muted-foreground uppercase mb-1">Salary Range</div>
                      <div className="font-display font-bold text-accent text-xs">{activeCourse.salary}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
                    <div className="text-[9px] text-muted-foreground uppercase mb-1">Top Role</div>
                    <div className="font-display font-bold text-foreground text-xs">{activeCourse.roles.split(", ")[0]}</div>
                  </div>
                </div>

                {/* Mobile Sticky CTA */}
                <div className="p-4 bg-background border-t border-border mt-auto">
                  <Link
                    to="/apply"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-accent text-accent-foreground rounded-2xl font-bold text-sm gold-glow-box shadow-xl active:scale-[0.98] transition-all"
                  >
                    Enroll Now <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- DESKTOP VIEW: SPLIT PANEL (UNCHANGED) --- */}
        <div className="hidden md:grid lg:grid-cols-[1fr_1.3fr] gap-0 border border-border rounded-2xl overflow-hidden min-h-[480px]">
          {/* Left: Course list */}
          <div className="bg-primary p-2 md:p-4 space-y-1 overflow-y-auto max-h-[520px]">
            {filtered.map((course, i) => (
              <button
                key={course.title}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 group relative ${activeIndex === i
                  ? "bg-secondary border border-accent/30"
                  : "hover:bg-secondary/50"
                  }`}
              >
                {activeIndex === i && (
                  <motion.div
                    layoutId="course-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full"
                  />
                )}
                <span
                  className={`font-display text-base font-bold transition-colors duration-200 ${activeIndex === i ? "text-accent" : "text-primary-foreground/80 group-hover:text-primary-foreground"
                    }`}
                >
                  {course.title}
                </span>
                {course.featured && (
                  <span className="ml-2 text-[10px] uppercase tracking-wider bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">
                    Popular
                  </span>
                )}
                <p className="text-primary-foreground/40 text-xs mt-0.5">{course.duration} · {course.salary}</p>
              </button>
            ))}
          </div>

          {/* Right: Course details */}
          <div className="relative bg-background p-8 md:p-12 flex flex-col justify-center overflow-hidden">
            {/* Large faded background text */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 font-display text-[120px] md:text-[180px] font-bold text-foreground/[0.08] leading-none select-none pointer-events-none whitespace-nowrap">
              {activeCourse.shortTitle}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCourse.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold">{activeCourse.category}</span>
                  <span className="w-8 h-px bg-accent" />
                </div>

                <h3 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">
                  {activeCourse.title}
                </h3>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "4rem" }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="h-1 bg-accent rounded-full mb-6"
                />

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                  {activeCourse.overview}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {activeCourse.tools.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-full font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Duration</div>
                    <div className="font-display font-bold text-foreground">{activeCourse.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Salary Range</div>
                    <div className="font-display font-bold text-accent">{activeCourse.salary}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Top Role</div>
                    <div className="font-display font-bold text-foreground text-sm">{activeCourse.roles.split(", ")[0]}</div>
                  </div>
                </div>

                <Link
                  to="/apply"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover-scale gold-glow-box transition-all duration-300"
                >
                  Enroll Now <ArrowRight size={16} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
