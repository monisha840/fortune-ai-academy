// Shared content shape for every course landing page.
// Each section is optional where the Figma copy may not provide it — the page
// template simply skips a section when its data is missing, so nothing renders
// as an empty block or a placeholder.

export type WhyIcon =
  | "mentor"
  | "projects"
  | "feedback"
  | "placement"
  | "beginner"
  | "certificate";

/** Signature hero visual that makes each course page feel distinct. */
export type HeroVisual = "wireframe" | "campaign" | "blueprint" | "garment" | "packaging" | "brand" | "timeline" | "none";

export interface CourseLandingContent {
  /** URL segment: /courses/<slug> */
  slug: string;
  /** Must match the `courses.title` used by the Apply form / CRM. */
  courseTitle: string;
  /** Small label next to the logo, e.g. "UI / UX ACADEMY" */
  academyLabel: string;
  visual: HeroVisual;

  hero: {
    badges: string[];
    /** "Become a job-ready" */
    lead: string;
    /** Highlighted role, e.g. "UI/UX designer" */
    role: string;
    /** ", even if you can't draw and have zero design background." */
    tail: string;
    sub: string;
    programName: string;
    highlights: string[];
    // Duration / salary / roles are intentionally NOT here: they are read from
    // the CMS `courses` table at runtime (see hooks/useCourseFacts.ts).
    chips: string[];
  };

  stuck: {
    title: string;
    sub: string;
    rows: { problem: string; fix: string }[];
  };

  demand: {
    title: string;
    sub: string;
    stats: { value: string; label: string }[];
    chart: {
      title: string;
      caption: string;
      points: { year: string; label: string; value: number }[];
    };
    sources: string;
  };

  why: {
    title: string;
    sub: string;
    cards: { icon: WhyIcon; title: string; body: string }[];
  };

  curriculum: {
    title: string;
    /** Omit when there is no module list to introduce. */
    sub?: string;
    /** `topics` is optional because Figma only supplied module titles. */
    modules: { title: string; topics?: string[] }[];
    tools: string[];
    ctaLabel: string;
  };

  faq: { q: string; a: string }[];

  finalCta: {
    title: string;
    sub: string;
  };
}
