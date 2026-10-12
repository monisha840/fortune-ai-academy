// =============================================================================
//  SEO config — single source of truth
// =============================================================================
//  Plain ESM so it can be imported by both Vite (TypeScript) code AND
//  Node-based build scripts (sitemap generator, prerender-meta script) without
//  any transpilation step.
// =============================================================================

export const SITE_URL = "https://www.fortuneinnovatives.com";

const DEFAULT_IMAGE = `${SITE_URL}/preview.png`;

const GEO = {
    region: "IN-TN",
    placename: "Tiruppur, Tamil Nadu, India",
    position: "11.1085;77.3411",
    icbm: "11.1085, 77.3411",
};

const DEFAULT_TITLE =
    "Fortune Innovatives | Design & Tech Training Institute in Tiruppur";
const DEFAULT_DESCRIPTION =
    "ISO-certified design and technology training institute in Tiruppur, Tamil Nadu. Courses in UI/UX Design, Full Stack Development, Graphic Design, Textile Design, Garment Design, Video Editing, CADD, and Tally. 98%+ placement rate.";

/** Homepage / fallback SEO. Used by index.html and as the merge base. */
export const DEFAULT_SEO = {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonical: `${SITE_URL}/`,
    image: DEFAULT_IMAGE,
    ogType: "website",
    twitterCard: "summary_large_image",
    geo: GEO,
    robots: "index, follow",
};

/**
 * Per-route metadata. Each entry merges over DEFAULT_SEO.
 * Path is the canonical URL path (with leading slash, no trailing slash except `/`).
 */
export const ROUTES = [
    {
        path: "/",
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
    },
    {
        path: "/courses",
        title: "Courses in Tiruppur — UI/UX, Full Stack, Graphic Design & more | Fortune Innovatives",
        description:
            "Job-ready training programs at Fortune Innovatives, Tiruppur. UI/UX Design, Full Stack Development, Graphic Design, Textile & Garment Design, Packaging Design, Video Editing, Fashion CADD, and Tally Prime — with 98%+ placement support.",
    },
    // ── Course landing pages (content: src/content/courses/*.ts) ──────────
    {
        path: "/courses/ui-ux-design",
        title: "UI/UX Design Course in Tiruppur | Job-Ready Program | Fortune Innovatives",
        description:
            "Become a job-ready UI/UX designer with zero design background. Mentor-led Figma, prototyping and portfolio program with 1:1 feedback and placement support at Fortune Innovatives, Tiruppur.",
    },
    {
        path: "/courses/digital-marketing",
        title: "Digital Marketing Course in Tiruppur | SEO, Google Ads & Meta Ads | Fortune Innovatives",
        description:
            "Become a job-ready digital marketer with no prior experience. Mentor-led SEO, Google Ads, Meta Ads and analytics program with live campaigns, 1:1 feedback and placement support at Fortune Innovatives, Tiruppur.",
    },
    {
        path: "/courses/fashion-cadd",
        title: "CAD Design Course in Tiruppur | AutoCAD, SolidWorks & Fusion 360 | Fortune Innovatives",
        description:
            "Become a job-ready CAD designer even if you have never opened AutoCAD. Mentor-led drafting, 3D modelling and GD&T program with live projects, 1:1 feedback and placement support at Fortune Innovatives, Tiruppur.",
    },
    {
        path: "/courses/textile-garment-design",
        title: "Textile & Garment Design Course in Tiruppur | Pattern Making & CLO 3D | Fortune Innovatives",
        description:
            "Become a job-ready textile and garment designer even if you can't sketch. Mentor-led pattern making, draping, Illustrator and CLO 3D program with live projects, 1:1 feedback and placement support at Fortune Innovatives, Tiruppur.",
    },
    {
        path: "/courses/packaging-design",
        title: "Packaging Design Course in Tiruppur | Dielines, Illustrator & Photoshop | Fortune Innovatives",
        description:
            "Become a job-ready package designer even if you can't sketch. Mentor-led Illustrator, Photoshop, structural dielines and print production program with live projects, 1:1 feedback and placement support at Fortune Innovatives, Tiruppur.",
    },
    {
        path: "/courses/graphic-designing",
        title: "Graphic Design Course in Tiruppur | Photoshop, Illustrator & Branding | Fortune Innovatives",
        description:
            "Become a job-ready branding and graphic designer even if you have never designed a logo. Mentor-led Photoshop, Illustrator and InDesign program with live projects, 1:1 feedback and placement support at Fortune Innovatives, Tiruppur.",
    },
    {
        path: "/courses/video-editing",
        title: "Video Editing Course in Tiruppur | Premiere Pro, After Effects & DaVinci | Fortune Innovatives",
        description:
            "Become a job-ready video editor even if you have never edited a video. Mentor-led Premiere Pro, After Effects and DaVinci Resolve program with live projects, 1:1 feedback and placement support at Fortune Innovatives, Tiruppur.",
    },
    {
        path: "/why-us",
        title: "Why Fortune Innovatives — ISO-Certified Institute in Tiruppur",
        description:
            "ISO-certified curriculum, industry-grade tools, live projects, and dedicated placement support. See why students across Tamil Nadu choose Fortune Innovatives in Tiruppur for design & tech careers.",
    },
    {
        path: "/contact",
        title: "Contact Fortune Innovatives — Tiruppur Campus & Admissions",
        description:
            "Visit Fortune Innovatives at 12 College Road, Tiruppur — 641601. Call +91 99522 70424 or message on WhatsApp to enquire about admissions, batch timings, and placement support.",
    },
    {
        path: "/gallery",
        title: "Campus Gallery, Placements & Student Portfolio | Fortune Innovatives Tiruppur",
        description:
            "Explore life at Fortune Innovatives Tiruppur — campus photos, placed-student announcements, and student portfolio work across UI/UX, Graphic Design, Video Editing, Textile Design, and more.",
    },
    {
        path: "/apply",
        title: "Apply Now — Book a Free Demo | Fortune Innovatives Tiruppur",
        description:
            "Reserve your seat at Fortune Innovatives, Tiruppur. Book a free demo, pick your course, and secure your spot in the upcoming batch with 98%+ placement support.",
    },
    {
        path: "/admin/login",
        robots: "noindex, nofollow",
        title: "Admin · Fortune Innovatives",
        description: "",
    },
];

/** Routes that should appear in sitemap.xml */
export const PUBLIC_PATHS = ROUTES
    .filter((r) => !r.robots || !r.robots.includes("noindex"))
    .map((r) => r.path);

/**
 * Resolve the effective SEO metadata for a given path.
 * Falls back to DEFAULT_SEO for anything not explicitly registered.
 */
export function getSeoForPath(path) {
    const normalised = path === "" ? "/" : path;
    const found = ROUTES.find((r) => r.path === normalised);
    return {
        ...DEFAULT_SEO,
        ...(found ?? {}),
        canonical: `${SITE_URL}${normalised === "/" ? "/" : normalised}`,
        geo: DEFAULT_SEO.geo,
    };
}
