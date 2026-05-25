import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from "lucide-react";

const branch = {
  city: "Tiruppur",
  tagline: "Headquarters",
  address: "12, College Road, Tiruppur — 641601",
  // Used for both the map iframe and the directions link — Google will geocode the address.
  mapQuery: "12 College Road, Tiruppur, Tamil Nadu 641601",
  phone: "+91 99522 70424",
  phoneDigits: "919952270424",
  email: "ind.fortuneinnovatives@gmail.com",
  hours: "Mon – Sun · 9 AM – 9 PM",
  whatsappMessage: "Hi, I'd like to know more about your courses.",
};

const BranchSection = () => {
  const whatsappLink = `https://wa.me/${branch.phoneDigits}?text=${encodeURIComponent(branch.whatsappMessage)}`;
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(branch.mapQuery)}&z=17&output=embed`;
  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.mapQuery)}`;

  return (
    <section id="branches" className="section-light py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">Our Campus</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Visit Us in <span className="text-gradient-gold">Tiruppur</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Step into our premium campus designed for the AI era. Experience state-of-the-art infrastructure and collaborative learning spaces.
          </p>
        </motion.div>

        {/* Split layout: info card | map */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* LEFT — Info card */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative gradient-navy rounded-3xl border border-accent/20 p-8 md:p-10 lg:p-12 overflow-hidden gold-glow-box flex flex-col"
          >
            {/* Subtle gold corner glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative z-10 flex flex-col h-full">
              {/* Top: icon + name */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-7 h-7 md:w-8 md:h-8 text-accent" />
                </div>
                <div>
                  <p className="text-accent/80 text-xs font-bold uppercase tracking-widest mb-1">
                    {branch.tagline}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                    {branch.city}
                  </h3>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-accent/40 via-accent/10 to-transparent mb-7" />

              {/* Info rows */}
              <ul className="space-y-5 mb-8">
                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Address</p>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">{branch.address}</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Phone</p>
                    <a
                      href={`tel:${branch.phone.replace(/\s/g, "")}`}
                      className="text-white/90 text-sm md:text-base hover:text-accent transition-colors"
                    >
                      {branch.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Email</p>
                    <a
                      href={`mailto:${branch.email}`}
                      className="text-white/90 text-sm md:text-base hover:text-accent transition-colors break-all"
                    >
                      {branch.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Hours</p>
                    <p className="text-white/90 text-sm md:text-base">{branch.hours}</p>
                  </div>
                </li>
              </ul>

              {/* Spacer to push buttons to bottom on tall cards */}
              <div className="flex-1" />

              {/* Action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <a
                  href={`tel:${branch.phone.replace(/\s/g, "")}`}
                  className="group/btn flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-primary font-bold text-sm shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-accent/30 text-accent font-bold text-sm hover:bg-accent/10 hover:border-accent/60 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/dir flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-white/80 font-semibold text-sm hover:border-accent/40 hover:text-accent transition-all duration-300"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
                <span className="inline-block transition-transform group-hover/dir:translate-x-1">→</span>
              </a>
            </div>
          </motion.aside>

          {/* RIGHT — Live map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border-2 border-accent/20 overflow-hidden bg-primary min-h-[400px] lg:min-h-[500px] shadow-xl shadow-black/20"
          >
            <iframe
              title={`Map of ${branch.city} campus`}
              src={mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />

            {/* Floating gold location chip — overlays the map */}
            <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 rounded-full bg-primary/80 backdrop-blur-md border border-accent/30 px-3 py-1.5 shadow-lg">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span className="text-white text-xs font-semibold tracking-wide">
                Fortune Innovatives · {branch.city}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BranchSection;
