import { motion } from "framer-motion";
import { Sparkles, User, Send } from "lucide-react";

const FinalCTA = () => {
  return (
    <section id="demo" className="relative py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row">

        {/* LEFT SIDE: Gold Brand / Mentor Spotlight */}
        <div className="w-full lg:w-1/2 bg-accent p-12 md:p-20 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/10 border border-navy/20 mb-8"
            >
              <Sparkles size={14} className="text-navy" />
              <span className="text-navy text-xs font-bold uppercase tracking-widest">Admissions Open – Active Now</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-7xl font-black text-navy leading-[0.9] mb-8"
            >
              ARCHITECT <br />
              <span className="relative">
                YOUR FUTURE
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-2 bg-navy/20 rounded-full"
                />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-navy/90 text-xl font-medium mb-12 max-w-md"
            >
              Join the elite league of AI-ready professionals. Master the skills that define the next decade.
            </motion.p>

            {/* Mentor Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 w-fit group hover:bg-white/30 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center overflow-hidden">
                <User className="text-accent" size={32} />
              </div>
              <div>
                <div className="text-navy font-bold text-lg">Dr. Aryan Sharma</div>
                <div className="text-navy/60 text-sm font-medium">Chief AI Mentor & Strategist</div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/20 blur-[100px] rounded-full" />
        </div>

        {/* RIGHT SIDE: Navy Glass Form */}
        <div className="w-full lg:w-1/2 gradient-navy p-12 md:p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-morphism bg-white/5 border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />

            <h3 className="text-3xl font-bold text-white mb-8">Secure Your Spot</h3>

            <form className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-white/70 text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Kumar"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white/70 text-xs font-bold uppercase tracking-widest ml-1">WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/70 text-xs font-bold uppercase tracking-widest ml-1">Course</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all appearance-none cursor-pointer">
                    <option className="bg-navy" value="UI/UX Design">UI/UX Design</option>
                    <option className="bg-navy" value="Full Stack Development">Full Stack Development</option>
                    <option className="bg-navy" value="Graphic Designing">Graphic Designing</option>
                    <option className="bg-navy" value="Video Editing">Video Editing</option>
                    <option className="bg-navy" value="Textile & Garment Design">Textile & Garment Design</option>
                    <option className="bg-navy" value="Packaging Design">Packaging Design</option>
                    <option className="bg-navy" value="Fashion CADD">Fashion CADD</option>
                    <option className="bg-navy" value="Tally Prime">Tally Prime</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-white/50 text-xs font-bold uppercase tracking-widest ml-1">Branch</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all appearance-none cursor-pointer">
                    <option className="bg-navy" value="Erode">Erode</option>
                    <option className="bg-navy" value="Coimbatore">Coimbatore</option>
                    <option className="bg-navy" value="Salem">Salem</option>
                    <option className="bg-navy" value="Tiruppur">Tiruppur</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-accent text-navy font-black text-lg py-5 rounded-xl shadow-lg shadow-accent/20 flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                SECURE MY SPOT ✨
                <Send size={20} />
              </motion.button>

              <p className="text-center text-white/50 text-xs mt-6">
                By clicking, you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
