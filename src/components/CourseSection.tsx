import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = ["All", "Design", "Development", "Commerce"] as const;

const courses = [
  {
    title: "UI/UX Design",
    shortTitle: "UI/UX",
    category: "Design",
    overview: "Design user-centered digital experiences from wireframes to high-fidelity prototypes.",
    tools: ["Figma", "Adobe XD", "Illustrator", "Principle", "Maze"],
    duration: "4 Months",
    roles: "UI Designer, UX Designer, Product Designer",
    salary: "₹5–12 LPA",
    featured: true,
  },
  {
    title: "Full Stack Development",
    shortTitle: "Full Stack",
    category: "Development",
    overview: "Master front-end and back-end technologies to build complete web applications from scratch.",
    tools: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Git"],
    duration: "6 Months",
    roles: "Full Stack Developer, Frontend Developer, Backend Developer",
    salary: "₹6–14 LPA",
    featured: true,
  },
  {
    title: "Graphic Designing",
    shortTitle: "Graphics",
    category: "Design",
    overview: "Create stunning visual content for brands, marketing campaigns, and digital media.",
    tools: ["Photoshop", "Illustrator", "InDesign", "CorelDRAW", "Canva"],
    duration: "4 Months",
    roles: "Graphic Designer, Brand Designer, Visual Designer",
    salary: "₹4–10 LPA",
  },
  {
    title: "Video Editing",
    shortTitle: "Video",
    category: "Design",
    overview: "Master professional video editing, motion graphics, and post-production workflows.",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro"],
    duration: "4 Months",
    roles: "Video Editor, Motion Designer, Content Creator",
    salary: "₹4–10 LPA",
  },
  {
    title: "Textile & Garment Design",
    shortTitle: "Textile",
    category: "Design",
    overview: "Learn textile science, pattern making, and garment construction for the fashion industry.",
    tools: ["CAD Software", "Pattern Drafting", "Textile Testing", "Adobe Illustrator"],
    duration: "5 Months",
    roles: "Textile Designer, Garment Technologist, Fashion Designer",
    salary: "₹4–8 LPA",
  },
  {
    title: "Packaging Design",
    shortTitle: "Packaging",
    category: "Design",
    overview: "Design compelling packaging that stands out on shelves with structural and graphic expertise.",
    tools: ["ArtPro", "Illustrator", "Photoshop", "Esko Studio", "3D Mockups"],
    duration: "4 Months",
    roles: "Packaging Designer, Structural Designer, Print Specialist",
    salary: "₹4–9 LPA",
  },
  {
    title: "Fashion CADD",
    shortTitle: "CADD",
    category: "Design",
    overview: "Master computer-aided design for fashion with industry-standard tools and techniques.",
    tools: ["AutoCAD", "Richpeace", "Gerber", "Lectra", "CLO 3D"],
    duration: "4 Months",
    roles: "Fashion CAD Designer, Pattern Maker, Technical Designer",
    salary: "₹4–8 LPA",
  },
  {
    title: "Tally Prime",
    shortTitle: "Tally",
    category: "Commerce",
    overview: "Master Tally Prime for GST accounting, payroll, inventory, and financial reporting.",
    tools: ["Tally Prime", "GST Portal", "Excel", "Banking Software"],
    duration: "3 Months",
    roles: "Accountant, Tax Consultant, Finance Executive",
    salary: "₹3–7 LPA",
  },
];

const CourseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All" ? courses : courses.filter((c) => c.category === activeCategory);
  const activeCourse = filtered[activeIndex] || filtered[0];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  return (
    <section id="courses" className="section-light py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Our Programs</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Career-Focused <span className="text-gradient-gold">Courses</span>
          </h2>
        </motion.div>

        {/* Category tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground gold-glow-box"
                  : "border border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-0 border border-border rounded-2xl overflow-hidden min-h-[480px]">
          {/* Left: Course list */}
          <div className="bg-primary p-2 md:p-4 space-y-1 overflow-y-auto max-h-[520px]">
            {filtered.map((course, i) => (
              <button
                key={course.title}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 group relative ${
                  activeIndex === i
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
                  className={`font-display text-base font-bold transition-colors duration-200 ${
                    activeIndex === i ? "text-accent" : "text-primary-foreground/80 group-hover:text-primary-foreground"
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
            <div className="absolute top-1/2 right-4 -translate-y-1/2 font-display text-[120px] md:text-[180px] font-bold text-foreground/[0.03] leading-none select-none pointer-events-none whitespace-nowrap">
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

                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover-scale gold-glow-box transition-all duration-300"
                >
                  Enroll Now <ArrowRight size={16} />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
