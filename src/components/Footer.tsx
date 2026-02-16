import { Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowRight } from "lucide-react";

const Footer = () => {
  const courses = [
    ["UI UX Design", "Full Stack", "Video Editing", "Graphic Designing", "Textile Design"],
    ["Garment Design", "Packaging Design", "Fashion CADD", "Tally Prime"]
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/people/Professional-graphic-design-institute/100063905569020/", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/fmpl_delhi?lang=en", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/fortune_innovatives/?hl=en", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@fortuneinnovatives7705", label: "YouTube" },
    { icon: Mail, href: "mailto:ind.fortuneinnovatives@gmail.com", label: "Email" },
    { icon: Linkedin, href: "https://in.linkedin.com/company/fortune-innovatives", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#0B1C2D] py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

          {/* Column 1: Our Courses */}
          <div className="col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">Our Courses</h3>
            <div className="w-12 h-1 bg-[#D4AF37] mb-8 rounded-full" />

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {courses.map((column, colIdx) => (
                <ul key={colIdx} className="space-y-4">
                  {column.map((course) => (
                    <li key={course} className="flex items-center gap-2 group cursor-pointer">
                      <ArrowRight className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                      <span className="text-white/70 group-hover:text-white text-sm transition-colors">
                        {course}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Column 2: Office Information */}
          <div className="col-span-1">
            <div className="bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />

              <h3 className="text-white text-xl font-bold mb-4 relative z-10">Office Information</h3>
              <div className="w-12 h-1 bg-[#D4AF37] mb-8 rounded-full relative z-10" />

              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#0B1C2D]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Call Us</p>
                    <p className="text-white font-bold">99522 70424</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#0B1C2D]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Call Us</p>
                    <p className="text-white font-bold">88708 44424</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Work with us</p>
                    <p className="text-white font-bold text-sm truncate">ind.fortuneinnovatives@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Follow Us */}
          <div className="col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">Follow Us</h3>
            <div className="w-12 h-1 bg-[#D4AF37] mb-8 rounded-full" />

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white rounded-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] shadow-lg group"
                >
                  <social.icon className="w-5 h-5 text-[#0B1C2D]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Fortune Innovatives. All Rights Reserved. <span className="mx-2">|</span> Powered by Sirah Digital
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
