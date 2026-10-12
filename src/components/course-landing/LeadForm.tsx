import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { submitLead, validateLead } from "@/lib/submitLead";
import { useCourseFacts } from "@/hooks/useCourseFacts";
import { formatINR, type Offer } from "@/lib/landingConfig";

interface LeadFormProps {
  courseTitle: string;
  slug: string;
  programName: string;
  /** From the landing-page CMS. Every part is optional and only shown when set. */
  offer?: Offer | null;
}

const inputClass =
  "w-full rounded-xl bg-white/[0.07] border border-white/15 px-4 py-3 text-white placeholder:text-white/35 " +
  "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition";

const LeadForm = ({ courseTitle, slug, programName, offer }: LeadFormProps) => {
  const { facts, isLoading } = useCourseFacts(courseTitle);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = validateLead(form);
    if (problem) return setError(problem);

    setStatus("loading");
    try {
      await submitLead({ ...form, course: courseTitle, source: `Landing Page: ${slug}` });
      const w = window as unknown as { dataLayer?: unknown[] };
      (w.dataLayer = w.dataLayer || []).push({
        event: "generate_lead",
        form_purpose: "Course landing page enquiry",
        lead_course: courseTitle,
        landing_slug: slug,
      });
      setStatus("done");
    } catch (err) {
      console.error("Lead submission error:", err);
      setError("Something went wrong. Please try again or message us on WhatsApp.");
      setStatus("idle");
    }
  };

  return (
    <div
      id="enquire"
      className="relative rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-6 md:p-8 gold-glow-box scroll-mt-28"
    >
      <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-1">Free counselling</p>
      <h2 className="font-display text-2xl font-bold text-white leading-tight">{programName}</h2>

      {offer?.price ? (
        <div className="mt-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-3xl font-bold text-white">{formatINR(offer.price)}</span>
            {offer.mrp ? <span className="text-sm text-white/45 line-through">{formatINR(offer.mrp)}</span> : null}
            {offer.save ? (
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-bold text-emerald-300">
                Save {offer.save}%
              </span>
            ) : null}
          </div>
          {offer.priceNote ? <p className="mt-1 text-xs text-white/50">{offer.priceNote}</p> : null}
        </div>
      ) : null}
      {offer?.emiNote ? <p className="mt-2 text-sm font-medium text-accent">{offer.emiNote}</p> : null}

      {isLoading && (
        <div className="mt-5 grid grid-cols-2 gap-2" aria-hidden="true">
          <div className="h-[58px] rounded-xl bg-white/[0.06] animate-pulse" />
          <div className="h-[58px] rounded-xl bg-white/[0.06] animate-pulse" />
        </div>
      )}
      {facts.length > 0 && (
        <dl className="mt-5 grid grid-cols-2 gap-2">
          {facts.map((f) => (
            <div
              key={f.label}
              className={`rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2.5 min-w-0 ${
                f.value.length > 18 ? "col-span-2" : ""
              }`}
            >
              <dd className="font-display font-bold text-accent text-sm md:text-base leading-tight break-words">
                {f.value}
              </dd>
              <dt className="text-[11px] text-white/55 mt-0.5 leading-tight">{f.label}</dt>
            </div>
          ))}
        </dl>
      )}

      {offer && offer.details.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {offer.details.map((d) => (
            <li key={d} className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/80">
              {d}
            </li>
          ))}
        </ul>
      ) : null}
      {offer && offer.seatsLeft !== null ? (
        <p
          className={`mt-3 flex items-center gap-2 text-sm font-semibold ${
            offer.seatsLeft === 0 ? "text-white/70" : "text-amber-300"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${offer.seatsLeft === 0 ? "bg-white/40" : "animate-pulse bg-amber-300"}`} />
          {offer.seatsLeft === 0
            ? "This batch is full. Join the waitlist for the next one."
            : `Only ${offer.seatsLeft} seat${offer.seatsLeft === 1 ? "" : "s"} left${offer.batch ? ` for the ${offer.batch}` : ""}`}
        </p>
      ) : null}

      {status === "done" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 text-center py-6"
          role="status"
        >
          <CheckCircle2 className="mx-auto text-accent mb-3" size={44} />
          <h3 className="font-display text-xl font-bold text-white">Thank you, {form.name.split(" ")[0]}!</h3>
          <p className="text-white/65 mt-2 text-sm">
            Our counsellors will reach out shortly to talk through the next batch.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="lead-name" className="block text-xs font-medium text-white/70 mb-1.5">
              Full name
            </label>
            <input
              id="lead-name"
              name="name"
              value={form.name}
              onChange={onChange}
              autoComplete="name"
              placeholder="Your name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lead-phone" className="block text-xs font-medium text-white/70 mb-1.5">
              Phone / WhatsApp
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              autoComplete="tel"
              inputMode="tel"
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lead-email" className="block text-xs font-medium text-white/70 mb-1.5">
              Email
            </label>
            <input
              id="lead-email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          {error && (
            <p className="flex items-start gap-2 text-sm text-red-300" role="alert">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground font-bold py-3.5 hover:brightness-110 active:scale-[0.99] transition disabled:opacity-60"
          >
            {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            Book Your Free Counselling Call
          </button>
          <p className="text-[11px] text-white/45 text-center">Free, no obligation. We'll never share your details.</p>
        </form>
      )}
    </div>
  );
};

export default LeadForm;
