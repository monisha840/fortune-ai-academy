import type { CourseLandingContent } from "./types";
import { uiUxDesign } from "./ui-ux-design";
import { digitalMarketing } from "./digital-marketing";
import { cadDesign } from "./cad-design";
import { textileGarmentDesign } from "./textile-garment-design";
import { packagingDesign } from "./packaging-design";
import { graphicDesigning } from "./graphic-designing";
import { videoEditing } from "./video-editing";

// Register each course landing page here. The route /courses/:slug resolves
// against this list; unknown slugs fall through to the NotFound page.
export const courseLandingPages: CourseLandingContent[] = [uiUxDesign, digitalMarketing, cadDesign, textileGarmentDesign, packagingDesign, graphicDesigning, videoEditing];

export const getCourseLanding = (slug: string | undefined) =>
  courseLandingPages.find((c) => c.slug === slug);

export type { CourseLandingContent } from "./types";
