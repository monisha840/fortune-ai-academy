import type { CourseLandingContent } from "@/content/courses/types";
import { MODES, type LandingConfig } from "@/lib/landingConfig";

// =============================================================================
//  Admin editor model for one landing page.
//
//  Inputs are kept as strings (that is what form fields hold), then converted
//  to the database row on save. Sections that ship with default text in code
//  (FAQ, modules, tools, market stats) carry a "custom" flag: until an admin
//  edits them they are saved as NULL, so the page keeps following the shipped
//  defaults instead of freezing a copy of them.
// =============================================================================

export interface FormState {
  price_inr: string;
  mrp_inr: string;
  price_note: string;
  emi_note: string;
  mode: string;
  city: string;
  batch_label: string;
  batch_start: string;
  seats_left: string;
  timings: string;
  rating: string;
  rating_count: string;
  learners_trained: string;
  placement_percent: string;

  faq: { q: string; a: string }[];
  faqCustom: boolean;
  modules: { title: string; topics: string }[]; // topics: one per line
  modulesCustom: boolean;
  tools: string; // one per line or comma separated
  toolsCustom: boolean;
  stats: { value: string; label: string }[];
  statsCustom: boolean;
  sources: string;
  sourcesCustom: boolean;
}

const s = (v: unknown) => (v === null || v === undefined ? "" : String(v));

export const splitList = (text: string) =>
  text
    .split(/[\n,]+/)
    .map((t) => t.trim())
    .filter(Boolean);

export function configToForm(cfg: LandingConfig | null, defaults: CourseLandingContent): FormState {
  return {
    price_inr: s(cfg?.price_inr),
    mrp_inr: s(cfg?.mrp_inr),
    price_note: s(cfg?.price_note),
    emi_note: s(cfg?.emi_note),
    mode: s(cfg?.mode),
    city: s(cfg?.city),
    batch_label: s(cfg?.batch_label),
    batch_start: s(cfg?.batch_start),
    seats_left: s(cfg?.seats_left),
    timings: s(cfg?.timings),
    rating: s(cfg?.rating),
    rating_count: s(cfg?.rating_count),
    learners_trained: s(cfg?.learners_trained),
    placement_percent: s(cfg?.placement_percent),

    faq: (cfg?.faq ?? defaults.faq).map((f) => ({ ...f })),
    faqCustom: !!cfg?.faq,
    modules: (cfg?.modules ?? defaults.curriculum.modules).map((m) => ({
      title: m.title,
      topics: (m.topics ?? []).join("\n"),
    })),
    modulesCustom: !!cfg?.modules,
    tools: (cfg?.tools ?? defaults.curriculum.tools).join("\n"),
    toolsCustom: !!cfg?.tools,
    stats: (cfg?.demand_stats ?? defaults.demand.stats).map((x) => ({ ...x })),
    statsCustom: !!cfg?.demand_stats,
    sources: cfg?.sources ?? defaults.demand.sources,
    sourcesCustom: !!cfg?.sources,
  };
}

export type FieldErrors = Partial<Record<keyof FormState | string, string>>;

const isWhole = (t: string) => /^\d+$/.test(t.trim());

export function validateForm(f: FormState): FieldErrors {
  const e: FieldErrors = {};
  const price = f.price_inr.trim();
  const mrp = f.mrp_inr.trim();

  if (price && (!isWhole(price) || Number(price) < 1)) e.price_inr = "Enter a whole number of rupees, e.g. 24999.";
  if (mrp && (!isWhole(mrp) || Number(mrp) < 1)) e.mrp_inr = "Enter a whole number of rupees, e.g. 34999.";
  if (mrp && !price) e.price_inr = "Add the price too, or clear the MRP.";
  if (price && mrp && isWhole(price) && isWhole(mrp) && Number(mrp) < Number(price)) {
    e.mrp_inr = "MRP should be the higher number. It is ignored while it is below the price.";
  }

  if (f.mode && !(MODES as readonly string[]).includes(f.mode)) e.mode = "Pick Online Live, Classroom or Hybrid.";
  if (f.batch_start.trim() && !/^\d{4}-\d{2}-\d{2}$/.test(f.batch_start.trim())) e.batch_start = "Use a valid date.";
  if (f.seats_left.trim() && !isWhole(f.seats_left)) e.seats_left = "Whole number, 0 or more.";

  if (f.rating.trim()) {
    const r = Number(f.rating);
    if (!Number.isFinite(r) || r < 0 || r > 5) e.rating = "A rating between 0 and 5, e.g. 4.8.";
    else if (!f.rating_count.trim()) e.rating_count = "Add how many reviews the rating is based on.";
  }
  if (f.rating_count.trim() && !isWhole(f.rating_count)) e.rating_count = "Whole number, 0 or more.";
  if (f.learners_trained.trim() && !isWhole(f.learners_trained)) e.learners_trained = "Whole number, 0 or more.";
  if (f.placement_percent.trim()) {
    const p = f.placement_percent.trim();
    if (!isWhole(p) || Number(p) > 100) e.placement_percent = "A whole number from 0 to 100.";
  }

  if (f.faqCustom) {
    f.faq.forEach((x, i) => {
      if (!x.q.trim() !== !x.a.trim()) e[`faq.${i}`] = "Fill in both the question and the answer, or remove this row.";
    });
  }
  if (f.modulesCustom) {
    f.modules.forEach((m, i) => {
      if (!m.title.trim() && m.topics.trim()) e[`modules.${i}`] = "Give this module a title.";
    });
  }
  if (f.statsCustom) {
    f.stats.forEach((x, i) => {
      if (!x.value.trim() !== !x.label.trim()) e[`stats.${i}`] = "Fill in both the figure and what it means, or remove this row.";
    });
  }
  return e;
}

const n = (t: string) => (t.trim() ? Number(t.trim()) : null);
const txt = (t: string) => (t.trim() ? t.trim() : null);

/** The row to upsert into course_landing. Empty inputs become NULL. */
export function formToPayload(slug: string, f: FormState) {
  const faq = f.faqCustom ? f.faq.map((x) => ({ q: x.q.trim(), a: x.a.trim() })).filter((x) => x.q && x.a) : [];
  const modules = f.modulesCustom
    ? f.modules.map((m) => ({ title: m.title.trim(), topics: splitLines(m.topics) })).filter((m) => m.title)
    : [];
  const tools = f.toolsCustom ? splitList(f.tools) : [];
  const stats = f.statsCustom ? f.stats.map((x) => ({ value: x.value.trim(), label: x.label.trim() })).filter((x) => x.value && x.label) : [];

  return {
    slug,
    price_inr: n(f.price_inr),
    mrp_inr: n(f.mrp_inr),
    price_note: txt(f.price_note),
    emi_note: txt(f.emi_note),
    mode: txt(f.mode),
    city: txt(f.city),
    batch_label: txt(f.batch_label),
    batch_start: txt(f.batch_start),
    seats_left: n(f.seats_left),
    timings: txt(f.timings),
    rating: n(f.rating),
    rating_count: n(f.rating_count),
    learners_trained: n(f.learners_trained),
    placement_percent: n(f.placement_percent),
    faq: faq.length ? faq : null,
    modules: modules.length ? modules : null,
    tools: tools.length ? tools : null,
    demand_stats: stats.length ? stats : null,
    sources: f.sourcesCustom ? txt(f.sources) : null,
  };
}

const splitLines = (t: string) =>
  t
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

// -- launch checklist ---------------------------------------------------------

export interface ChecklistItem {
  key: string;
  label: string;
  done: boolean;
  /** Blocks launch (price/duration), or just improves the page. */
  important: boolean;
  hint: string;
}

export function buildChecklist(args: {
  cfg: LandingConfig | null;
  courseRow: { duration?: string | null } | null;
  approvedReviews: number;
  portfolioCount: number;
  defaults: CourseLandingContent;
}): ChecklistItem[] {
  const { cfg, courseRow, approvedReviews, portfolioCount, defaults } = args;
  const hasModules = (cfg?.modules ?? defaults.curriculum.modules).length > 0;
  const hasSources = !!cfg?.sources || /Sources:/i.test(defaults.demand.sources);
  return [
    { key: "price", label: "Price", done: !!cfg?.price_inr, important: true, hint: "Offer & batch" },
    { key: "duration", label: "Duration", done: !!courseRow?.duration?.trim(), important: true, hint: "Quick facts" },
    { key: "batch", label: "Batch / seats", done: !!(cfg?.batch_label || cfg?.batch_start || cfg?.seats_left !== null && cfg?.seats_left !== undefined), important: false, hint: "Offer & batch" },
    { key: "mode", label: "Mode & city", done: !!(cfg?.mode && cfg?.city), important: false, hint: "Offer & batch" },
    { key: "sources", label: "Market sources", done: hasSources, important: true, hint: "Market facts" },
    { key: "faq", label: "FAQ answers reviewed", done: !!cfg?.faq, important: true, hint: "FAQ" },
    { key: "modules", label: "Syllabus modules", done: hasModules, important: false, hint: "Syllabus & tools" },
    { key: "reviews", label: "Learner reviews", done: approvedReviews > 0, important: false, hint: "Reviews" },
    { key: "work", label: "Student work", done: portfolioCount > 0, important: false, hint: "Student work" },
  ];
}
