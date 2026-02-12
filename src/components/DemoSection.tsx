import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

const DemoSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", course: "", branch: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll reach out to you shortly.");
    setForm({ name: "", phone: "", email: "", course: "", branch: "" });
  };

  return (
    <section id="demo" className="gradient-navy py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Get Started</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Book Your <span className="text-gradient-gold">Free Demo</span> Today
            </h2>
            <p className="text-primary-foreground/60 text-lg mb-8 max-w-md">
              Take the first step toward your tech career. Our expert mentors will guide you through a personalized demo session.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-accent">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse-gold" />
                <span className="text-primary-foreground/80 font-medium">Only 27 seats left for this batch</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-accent" />
                <span className="text-primary-foreground/60 text-sm">98.4% Placement Track Record</span>
              </div>
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-secondary/50 border border-secondary rounded-2xl p-8 space-y-5"
          >
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
              { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 00000 00000" },
              { key: "email", label: "Email Address", type: "email", placeholder: "you@email.com" },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-primary-foreground/70 text-sm font-medium block mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={(form as Record<string, string>)[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full bg-primary/50 border border-secondary rounded-lg px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="text-primary-foreground/70 text-sm font-medium block mb-1.5">Preferred Course</label>
              <select
                required
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                className="w-full bg-primary/50 border border-secondary rounded-lg px-4 py-3 text-primary-foreground focus:outline-none focus:border-accent transition-colors"
              >
                <option value="">Select a course</option>
                <option>Full Stack Web Development</option>
                <option>Data Science & Machine Learning</option>
                <option>Digital Marketing & SEO</option>
                <option>Cloud Computing & DevOps</option>
                <option>UI/UX Design</option>
              </select>
            </div>

            <div>
              <label className="text-primary-foreground/70 text-sm font-medium block mb-1.5">Nearest Branch</label>
              <select
                required
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full bg-primary/50 border border-secondary rounded-lg px-4 py-3 text-primary-foreground focus:outline-none focus:border-accent transition-colors"
              >
                <option value="">Select a branch</option>
                <option>Erode</option>
                <option>Coimbatore</option>
                <option>Salem</option>
                <option>Tiruppur</option>
                <option>Chennai</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground font-semibold py-3.5 rounded-lg hover-scale gold-glow-box flex items-center justify-center gap-2 transition-all duration-300 text-lg"
            >
              Book Free Demo <ArrowRight size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
