import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { CourseLandingContent } from "@/content/courses/types";

// =============================================================================
//  Landing-page CMS: data shapes, safe parsing, merge with the code defaults.
//
//  Rules:
//   - Every CMS value is optional. A missing value never renders a placeholder:
//     the page simply keeps the text that ships with the site, or hides the block.
//   - CMS JSON is untrusted (admins type it), so it is validated field by field.
//   - If the tables have not been created yet, everything quietly falls back to
//     the defaults. See course_landing_migration.sql.
// =============================================================================

export const MODES = ["Online Live", "Classroom", "Hybrid"] as const;
export type Mode = (typeof MODES)[number];

export interface LandingConfig {
  slug: string;
  price_inr: number | null;
  mrp_inr: number | null;
  price_note: string | null;
  emi_note: string | null;
  mode: Mode | null;
  city: string | null;
  batch_label: string | null;
  batch_start: string | null; // ISO date
  seats_left: number | null;
  timings: string | null;
  rating: number | null;
  rating_count: number | null;
  learners_trained: number | null;
  placement_percent: number | null;
  faq: { q: string; a: string }[] | null;
  modules: { title: string; topics: string[] }[] | null;
  tools: string[] | null;
  demand_stats: { value: string; label: string }[] | null;
  sources: string | null;
}

export interface LandingReview {
  id: string;
  course_slug: string;
  quote: string;
  name: string;
  role: string | null;
  company: string | null;
  image_url: string | null;
  rating: number | null;
  is_approved: boolean;
  display_order: number;
}

export interface PortfolioItem {
  id: string;
  image_url: string;
  media_type: "image" | "video" | null;
  title: string | null;
  student_name: string | null;
  course_name: string | null;
}

/** Error codes that mean "the table / column is not there yet". */
const MISSING_CODES = new Set(["42P01", "42703", "PGRST205", "PGRST204", "PGRST200"]);
export const isMissingTable = (err: { code?: string } | null | undefined) =>
  !!err?.code && MISSING_CODES.has(err.code);

// -- primitive cleaners --------------------------------------------------------

const str = (v: unknown): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t : null;
};
const int = (v: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): number | null => {
  const n = typeof v === "string" && v.trim() !== "" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) && Number.isInteger(n) && n >= min && n <= max ? n : null;
};
const dec = (v: unknown, min: number, max: number): number | null => {
  const n = typeof v === "string" && v.trim() !== "" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) && n >= min && n <= max ? n : null;
};

type Rec = Record<string, unknown>;
const rec = (x: unknown): Rec | null => (x && typeof x === "object" && !Array.isArray(x) ? (x as Rec) : null);

export function parseFaq(v: unknown): { q: string; a: string }[] | null {
  if (!Array.isArray(v)) return null;
  const out = v
    .map((x) => {
      const r = rec(x);
      return r ? { q: str(r.q), a: str(r.a) } : null;
    })
    .filter((x): x is { q: string; a: string } => !!x && !!x.q && !!x.a);
  return out.length ? out : null;
}

export function parseModules(v: unknown): { title: string; topics: string[] }[] | null {
  if (!Array.isArray(v)) return null;
  const out = v
    .map((x) => {
      const r = rec(x);
      if (!r) return null;
      const title = str(r.title);
      const topicsRaw = r.topics;
      const topics = Array.isArray(topicsRaw) ? topicsRaw.map(str).filter((t): t is string => !!t) : [];
      return title ? { title, topics } : null;
    })
    .filter((x): x is { title: string; topics: string[] } => !!x);
  return out.length ? out : null;
}

export function parseStats(v: unknown): { value: string; label: string }[] | null {
  if (!Array.isArray(v)) return null;
  const out = v
    .map((x) => {
      const r = rec(x);
      return r ? { value: str(r.value), label: str(r.label) } : null;
    })
    .filter((x): x is { value: string; label: string } => !!x && !!x.value && !!x.label);
  return out.length ? out : null;
}

export function parseStringList(v: unknown): string[] | null {
  if (!Array.isArray(v)) return null;
  const out = v.map(str).filter((t): t is string => !!t);
  return out.length ? out : null;
}

/** Turn a raw database row into a clean, fully-typed config. */
export function normalizeLandingConfig(row: Record<string, unknown> | null | undefined, slug: string): LandingConfig {
  const r = row ?? {};
  const mode = str(r.mode);
  return {
    slug,
    price_inr: int(r.price_inr, 1),
    mrp_inr: int(r.mrp_inr, 1),
    price_note: str(r.price_note),
    emi_note: str(r.emi_note),
    mode: (MODES as readonly string[]).includes(mode ?? "") ? (mode as Mode) : null,
    city: str(r.city),
    batch_label: str(r.batch_label),
    batch_start: str(r.batch_start),
    seats_left: int(r.seats_left, 0),
    timings: str(r.timings),
    rating: dec(r.rating, 0, 5),
    rating_count: int(r.rating_count, 0),
    learners_trained: int(r.learners_trained, 0),
    placement_percent: int(r.placement_percent, 0, 100),
    faq: parseFaq(r.faq),
    modules: parseModules(r.modules),
    tools: parseStringList(r.tools),
    demand_stats: parseStats(r.demand_stats),
    sources: str(r.sources),
  };
}

// -- formatting ---------------------------------------------------------------

/** 1234567 -> "₹12,34,567" (Indian digit grouping). */
export const formatINR = (n: number) => `₹${new Intl.NumberFormat("en-IN").format(n)}`;

/** Whole-number discount percent, or null when there is no real saving. */
export function discountPercent(price: number | null, mrp: number | null): number | null {
  if (!price || !mrp || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}

/** "2026-11-03" -> "3 Nov 2026" (timezone-safe: parsed as a plain date). */
export function formatBatchDate(iso: string | null): string | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

/** True for a batch that has not started yet (or has no date). */
export const isUpcoming = (iso: string | null, now = new Date()) => {
  if (!iso) return true;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return true;
  const start = Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return start >= today;
};

// -- merge with the defaults that ship in code ----------------------------------

/** The CMS can replace answers, modules, tools and market stats. Nothing else. */
export function applyLandingConfig(content: CourseLandingContent, cfg: LandingConfig | null): CourseLandingContent {
  if (!cfg) return content;
  return {
    ...content,
    faq: cfg.faq ?? content.faq,
    curriculum: {
      ...content.curriculum,
      modules: cfg.modules ?? content.curriculum.modules,
      tools: cfg.tools ?? content.curriculum.tools,
      // A sub-line that introduces modules only makes sense when modules exist.
      sub: (cfg.modules ?? content.curriculum.modules).length > 0 ? content.curriculum.sub : undefined,
    },
    demand: {
      ...content.demand,
      stats: cfg.demand_stats ?? content.demand.stats,
      sources: cfg.sources ?? content.demand.sources,
    },
  };
}

/** What the offer card needs, with only the fields that are actually set. */
export function buildOffer(cfg: LandingConfig | null) {
  if (!cfg) return null;
  const batchDate = isUpcoming(cfg.batch_start) ? formatBatchDate(cfg.batch_start) : null;
  const batch = cfg.batch_label ?? (batchDate ? `${batchDate} batch` : null);
  const offer = {
    price: cfg.price_inr,
    mrp: cfg.mrp_inr && cfg.price_inr && cfg.mrp_inr > cfg.price_inr ? cfg.mrp_inr : null,
    save: discountPercent(cfg.price_inr, cfg.mrp_inr),
    priceNote: cfg.price_note,
    emiNote: cfg.emi_note,
    details: [cfg.mode, cfg.city, batch, cfg.timings].filter((x): x is string => !!x),
    seatsLeft: cfg.seats_left,
    batch,
  };
  const has = offer.price || offer.emiNote || offer.details.length || offer.seatsLeft !== null;
  return has ? offer : null;
}
export type Offer = NonNullable<ReturnType<typeof buildOffer>>;

/** Social-proof strip: only the numbers that are filled in. */
export function buildProof(cfg: LandingConfig | null) {
  if (!cfg) return null;
  const items: { value: string; label: string }[] = [];
  if (cfg.rating !== null && cfg.rating > 0) {
    items.push({
      value: `${cfg.rating.toFixed(1)}/5`,
      label: cfg.rating_count ? `from ${new Intl.NumberFormat("en-IN").format(cfg.rating_count)} reviews` : "learner rating",
    });
  }
  if (cfg.learners_trained) {
    items.push({ value: `${new Intl.NumberFormat("en-IN").format(cfg.learners_trained)}+`, label: "learners trained" });
  }
  if (cfg.placement_percent !== null && cfg.placement_percent > 0) {
    items.push({ value: `${cfg.placement_percent}%`, label: "placement assistance" });
  }
  return items.length ? items : null;
}

// -- hooks --------------------------------------------------------------------

const FIVE_MIN = 5 * 60 * 1000;

/** The CMS row for a landing page, or null (also null if the table is missing). */
export function useLandingConfig(slug: string | undefined) {
  return useQuery({
    queryKey: ["landing-config", slug],
    enabled: !!slug,
    staleTime: FIVE_MIN,
    queryFn: async (): Promise<LandingConfig | null> => {
      const { data, error } = await supabase.from("course_landing").select("*").eq("slug", slug!).maybeSingle();
      if (error || !data) return null;
      return normalizeLandingConfig(data as Record<string, unknown>, slug!);
    },
  });
}

/** Approved learner reviews for a landing page. */
export function useLandingReviews(slug: string | undefined) {
  return useQuery({
    queryKey: ["landing-reviews", slug],
    enabled: !!slug,
    staleTime: FIVE_MIN,
    queryFn: async (): Promise<LandingReview[]> => {
      const { data, error } = await supabase
        .from("course_reviews")
        .select("*")
        .eq("course_slug", slug!)
        .eq("is_approved", true)
        .order("display_order", { ascending: true });
      if (error || !data) return [];
      return (data as LandingReview[]).filter((r) => r.quote && r.name);
    },
  });
}

/** Student work for a course: gallery items of type "portfolio" tagged with this course. */
export function usePortfolioItems(courseTitle: string | undefined) {
  return useQuery({
    queryKey: ["landing-portfolio", courseTitle],
    enabled: !!courseTitle,
    staleTime: FIVE_MIN,
    queryFn: async (): Promise<PortfolioItem[]> => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("id, image_url, media_type, title, student_name, course_name")
        .eq("type", "portfolio")
        .eq("course_name", courseTitle!)
        .order("display_order", { ascending: true })
        .limit(9);
      if (error || !data) return [];
      return (data as PortfolioItem[]).filter((p) => !!p.image_url);
    },
  });
}
