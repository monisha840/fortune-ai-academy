// Typed wrapper around `schema.data.mjs` for React code.
// The .mjs file is the single source of truth (so build scripts can read it).

import { SITE_URL } from "./seo";
import {
    LOCAL_BUSINESS_SCHEMA as LOCAL_BUSINESS_SCHEMA_RAW,
    COURSES as COURSES_RAW,
} from "./schema.data.mjs";

export const LOCAL_BUSINESS_SCHEMA = LOCAL_BUSINESS_SCHEMA_RAW as Record<string, unknown>;
export const COURSES = COURSES_RAW as Array<{ name: string; description: string }>;

const ORG_NAME = "Fortune Innovatives";
const ORG_LOGO = `${SITE_URL}/logo.png`;

const ADDRESS = {
    "@type": "PostalAddress",
    streetAddress: "12, College Road",
    addressLocality: "Tiruppur",
    addressRegion: "Tamil Nadu",
    postalCode: "641601",
    addressCountry: "IN",
};

/**
 * Build a standalone Course JSON-LD object for a specific course page or
 * course block. Useful when embedding multiple individual schemas on /courses
 * so each course earns its own rich-result eligibility.
 */
export function buildCourseSchema(
    courseName: string,
    courseDescription: string,
    url: string,
): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "Course",
        name: courseName,
        description: courseDescription,
        url,
        provider: {
            "@type": "EducationalOrganization",
            name: ORG_NAME,
            url: SITE_URL,
            logo: ORG_LOGO,
            address: ADDRESS,
        },
    };
}
