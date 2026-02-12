import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, Briefcase, IndianRupee } from "lucide-react";

const courses = [
  {
    title: "Full Stack Web Development",
    overview: "Master front-end and back-end technologies to build complete web applications from scratch.",
    tools: "React, Node.js, MongoDB, Express, TypeScript, Git, AWS",
    duration: "6 Months",
    roles: "Full Stack Developer, Frontend Developer, Backend Developer",
    salary: "₹6–14 LPA",
  },
  {
    title: "Data Science & Machine Learning",
    overview: "Learn to extract insights from data, build predictive models, and deploy ML solutions.",
    tools: "Python, Pandas, Scikit-learn, TensorFlow, SQL, Power BI",
    duration: "6 Months",
    roles: "Data Scientist, ML Engineer, Data Analyst",
    salary: "₹8–18 LPA",
  },
  {
    title: "Digital Marketing & SEO",
    overview: "Master performance marketing, content strategy, and search engine optimization.",
    tools: "Google Ads, Meta Ads, SEMrush, Analytics, WordPress",
    duration: "4 Months",
    roles: "Digital Marketing Manager, SEO Specialist, Performance Marketer",
    salary: "₹4–10 LPA",
  },
  {
    title: "Cloud Computing & DevOps",
    overview: "Build and deploy scalable cloud infrastructure with modern DevOps practices.",
    tools: "AWS, Docker, Kubernetes, Jenkins, Terraform, Linux",
    duration: "5 Months",
    roles: "Cloud Engineer, DevOps Engineer, SRE",
    salary: "₹8–16 LPA",
  },
  {
    title: "UI/UX Design",
    overview: "Design user-centered digital experiences from wireframes to high-fidelity prototypes.",
    tools: "Figma, Adobe XD, Illustrator, Principle, Maze",
    duration: "4 Months",
    roles: "UI Designer, UX Designer, Product Designer",
    salary: "₹5–12 LPA",
  },
];

const CourseSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="courses" className="section-light py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Our Programs</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Career-Focused <span className="text-gradient-gold">Courses</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {courses.map((course, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-border rounded-xl overflow-hidden hover-glow-gold transition-shadow duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <span className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                    {course.title}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">
                        <p className="text-muted-foreground">{course.overview}</p>
                        <div className="flex flex-wrap gap-2">
                          {course.tools.split(", ").map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4 pt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock size={16} className="text-accent" /> {course.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase size={16} className="text-accent" /> {course.roles.split(", ")[0]}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <IndianRupee size={16} className="text-accent" /> {course.salary}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
