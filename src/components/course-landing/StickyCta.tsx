import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

// Mobile-only bottom bar. Appears after the hero and hides while the lead form
// is on screen, so it never covers the form itself. WhatsApp lives here on
// phones (the floating site-wide WhatsApp button is hidden on landing pages on
// mobile), so nothing floats over the page text.
const StickyCta = ({ label }: { label: string }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById("enquire");
    let formVisible = false;
    const update = () => setShow(window.scrollY > 500 && !formVisible);

    const observer = form
      ? new IntersectionObserver(([entry]) => {
          formVisible = entry.isIntersecting;
          update();
        })
      : null;
    if (form && observer) observer.observe(form);

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 bg-navy-deep/95 backdrop-blur-md border-t border-white/10 px-3 py-3 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <a
        href="#enquire"
        tabIndex={show ? 0 : -1}
        className="min-w-0 flex-1 truncate rounded-full bg-accent text-accent-foreground text-center font-bold py-3 text-sm"
      >
        {label}
      </a>
      <a
        href="https://wa.me/919952270424"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        aria-label="Chat on WhatsApp"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
};

export default StickyCta;
