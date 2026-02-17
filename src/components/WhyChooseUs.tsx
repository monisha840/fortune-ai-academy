import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Laptop, Rocket, RefreshCw, CheckCircle2, Star } from "lucide-react";

const audienceData = {
  students: {
    id: "students",
    label: "College Students",
    icon: GraduationCap,
    title: "Launch Your Global Career",
    desc: "Bridge the gap between academic theory and industry reality. We transform students into high-value professionals.",
    benefits: [
      "Zero-to-One Portfolio Building",
      "Internship placement at top startups",
      "Soft skills & corporate etiquette training"
    ],
    accent: "from-blue-600/20 to-transparent"
  },
  freelancers: {
    id: "freelancers",
    label: "Freelancers",
    icon: Laptop,
    title: "From Gigs to High-Ticket Contracts",
    desc: "Scale your freelance business. Master advanced AI tools and professional workflows to double your hourly rate.",
    benefits: [
      "Personal Branding & Client Acquisition",
      "Advanced Project Management Skills",
      "Integration of AI in Creative Workflows"
    ],
    accent: "from-purple-600/20 to-transparent"
  },
  entrepreneurs: {
    id: "entrepreneurs",
    label: "Entrepreneurs",
    icon: Rocket,
    title: "AI-Powered Business Growth",
    desc: "Build MVPs faster, automate your marketing, and lead with AI-integrated strategies.",
    benefits: [
      "Rapid Prototyping Techniques",
      "AI Automation for Operations",
      "Strategic Tech Advisory"
    ],
    accent: "from-amber-600/20 to-transparent"
  },
  switchers: {
    id: "switchers",
    label: "Career Switchers",
    icon: RefreshCw,
    title: "Pivot to Tech with Confidence",
    desc: "Don't just change jobs. Change your life. We specialize in helping non-tech professionals transition smoothly.",
    benefits: [
      "Industry-Relevant Skill Mapping",
      "Bridge the 'Prior Experience' Gap",
      "Focused Interview Prep for Tech Roles"
    ],
    accent: "from-emerald-600/20 to-transparent"
  }
};

const WhyChooseUs = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof audienceData>("students");
  const data = audienceData[activeTab];

  return (
    <motion.section
      id="why-us"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative py-24 md:py-32 overflow-hidden gradient-navy"
    >
      {/* Parallax Diagonal Textures with Persistent Animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          animate={{ x: [-20, 20], y: [-20, 20] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(255,255,255,0.05)_40px,rgba(255,255,255,0.05)_80px)]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-accent font-semibold tracking-widest uppercase text-sm mb-4"
          >
            Personalized Excellence
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-6xl font-bold text-white mb-12"
          >
            Why It Works <span className="text-gradient-gold">For You</span>
          </motion.h2>

          {/* Audience Selector Pills */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 p-2 bg-white/5 rounded-full border border-white/10 max-w-4xl mx-auto mb-8">
            {(Object.keys(audienceData) as Array<keyof typeof audienceData>).map((key) => {
              const item = audienceData[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 relative group ${isActive
                    ? "text-navy"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-accent rounded-full shadow-lg shadow-accent/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon size={18} />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Transition Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Column: Visual & Transformation Copy */}
              <div className="relative p-5 md:p-12 rounded-2xl md:rounded-[2.5rem] glass-morphism bg-white/5 border-white/10 overflow-hidden group">
                {/* Dynamic Background Accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${data.accent} opacity-30 transition-all duration-700`} />

                <div className="relative z-10 text-left">
                  <motion.div
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-accent/20 flex items-center justify-center mb-4 md:mb-6"
                  >
                    <data.icon className="text-accent w-6 h-6 md:w-8 md:h-8" />
                  </motion.div>
                  <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-3 md:mb-6">
                    {data.title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-lg leading-relaxed mb-4 md:mb-8">
                    {data.desc}
                  </p>

                  <div className="flex items-center gap-3 text-accent">
                    <div className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 font-bold text-[10px] md:text-sm">
                      100% Outcome Focused
                    </div>
                    <Star className="fill-accent animate-spin w-4 h-4 md:w-5 md:h-5" style={{ animationDuration: '3s' }} />
                  </div>
                </div>
              </div>

              {/* Right Column: Benefit Points */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:space-y-4 md:gap-0">
                {data.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="p-3 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30 hover:bg-white/10 transition-all group flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4"
                  >
                    <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent text-accent group-hover:text-navy transition-all">
                      <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <span className="text-xs md:text-xl font-medium text-white leading-tight">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
