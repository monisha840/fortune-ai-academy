import { Star } from "lucide-react";

// Social proof under the hero buttons. Shows only the numbers the CMS provides.
const ProofStrip = ({ items }: { items: { value: string; label: string }[] }) => (
  <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
    {items.map((i, idx) => (
      <div key={i.label} className="flex items-center gap-2">
        {idx === 0 && i.value.endsWith("/5") && <Star size={16} className="fill-accent text-accent" />}
        <dd className="font-display text-lg font-bold text-white">{i.value}</dd>
        <dt className="text-xs text-white/55">{i.label}</dt>
      </div>
    ))}
  </dl>
);

export default ProofStrip;
