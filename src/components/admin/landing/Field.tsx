import type { ReactNode } from "react";

// Label + control + hint + error, in the same dark admin style as the rest of
// the CMS forms.
interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

const Field = ({ label, htmlFor, hint, error, children, className = "" }: FieldProps) => (
  <div className={`space-y-2 ${className}`}>
    <label htmlFor={htmlFor} className="text-sm font-semibold text-white/60">
      {label}
    </label>
    {children}
    {error ? (
      <p className="text-xs font-medium text-red-300" role="alert">
        {error}
      </p>
    ) : hint ? (
      <p className="text-xs text-white/35">{hint}</p>
    ) : null}
  </div>
);

export const inputClass = "bg-white/5 border-white/10 text-white placeholder:text-white/25";

export default Field;
