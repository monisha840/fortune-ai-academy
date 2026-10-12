import { Mail, MapPin, Phone } from "lucide-react";

const LandingFooter = ({ academyLabel }: { academyLabel: string }) => (
  <footer className="bg-navy-deep text-white/70 pt-14 pb-24 md:pb-10">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display font-black text-white text-xl tracking-tight">
            FORTUNE <span className="text-accent">INNOVATIVES</span>
          </p>
          <p className="mt-1 text-[11px] tracking-[0.2em] text-white/50">{academyLabel}</p>
          <p className="mt-4 text-sm max-w-sm leading-relaxed">
            ISO-certified design and technology training institute in Tiruppur, Tamil Nadu.
          </p>
        </div>

        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <MapPin size={16} className="mt-0.5 text-accent shrink-0" />
            12, College Road, Tiruppur, 641601
          </li>
          <li className="flex items-center gap-3">
            <Phone size={16} className="text-accent shrink-0" />
            <a href="tel:+919952270424" className="hover:text-accent">+91 99522 70424</a>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={16} className="text-accent shrink-0" />
            <a href="mailto:ind.fortuneinnovatives@gmail.com" className="hover:text-accent break-all">
              ind.fortuneinnovatives@gmail.com
            </a>
          </li>
        </ul>

      </div>

      <p className="mt-10 pt-6 border-t border-white/10 text-xs text-white/40">
        © {new Date().getFullYear()} Fortune Innovatives. All rights reserved.
      </p>
    </div>
  </footer>
);

export default LandingFooter;
