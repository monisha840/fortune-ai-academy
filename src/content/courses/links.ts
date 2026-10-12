import { courseLandingPages } from "./index";

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/**
 * The landing-page URL for a course, matched on the course title used by the
 * CMS `courses` table. Returns undefined for courses that have no landing page
 * (so callers simply don't render a link).
 *
 * Matching is by exact title on purpose: "Fashion CADD" must not resolve to
 * the "CAD Design" landing page, they are different courses.
 */
export function getCourseLandingPath(title: string | undefined | null): string | undefined {
  if (!title) return undefined;
  const hit = courseLandingPages.find((c) => norm(c.courseTitle) === norm(title));
  return hit ? `/courses/${hit.slug}` : undefined;
}

/** /apply with the course preselected. */
export function applyPathFor(title: string): string {
  return `/apply?course=${encodeURIComponent(title)}`;
}
