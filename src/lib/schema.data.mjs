// Plain ESM mirror of LOCAL_BUSINESS_SCHEMA in schema.ts.
// Exists so build scripts (Node, no transpilation) can read the schema directly.
// IMPORTANT: keep in sync with src/lib/schema.ts.

import { SITE_URL } from "./seo.routes.mjs";

const ORG_NAME = "Fortune Innovatives";
const ORG_LOGO = `${SITE_URL}/logo.png`;
const ORG_PHONE = "+91 99522 70424";
const ORG_EMAIL = "ind.fortuneinnovatives@gmail.com";

const ADDRESS = {
    "@type": "PostalAddress",
    streetAddress: "12, College Road",
    addressLocality: "Tiruppur",
    addressRegion: "Tamil Nadu",
    postalCode: "641601",
    addressCountry: "IN",
};

const GEO = {
    "@type": "GeoCoordinates",
    latitude: 11.1085,
    longitude: 77.3411,
};

const OPENING_HOURS = {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
};

export const COURSES = [
    { name: "UI/UX Design", description: "Industry-led UI/UX Design course in Tiruppur. Master Figma, design systems, and user research with portfolio projects and 98%+ placement support." },
    { name: "Full Stack Development", description: "Full Stack Development training in Tiruppur — React, Node.js, databases, and deployment. Live projects and dedicated placement assistance." },
    { name: "Graphic Design", description: "Graphic Design course in Tiruppur covering Photoshop, Illustrator, branding, and print/digital media. Career-ready training with placement support." },
    { name: "Textile Design", description: "Textile Design program in Tiruppur — fabric, pattern, and CAD-based textile development. Tailored for the Tiruppur garment industry with placement support." },
    { name: "Garment Design", description: "Garment Design training in Tiruppur — pattern making, draping, construction, and apparel CAD. Direct industry exposure and placement support." },
    { name: "Packaging Design", description: "Packaging Design course in Tiruppur — structural and graphic packaging using ArtPro, Illustrator, and 3D mockups. Job-ready skills with placement support." },
    { name: "Video Editing", description: "Video Editing course in Tiruppur — Premiere Pro, After Effects, and motion graphics. Build a real portfolio with placement support." },
    { name: "CADD", description: "Computer-Aided Design & Drafting (CADD) training in Tiruppur — AutoCAD, Richpeace, Gerber, Lectra, CLO 3D. Career placement support for design roles." },
    { name: "Tally", description: "Tally Prime training in Tiruppur — GST accounting, payroll, inventory, and financial reporting. Job placement support for accounting roles." },
];

const ORG_REF = {
    "@type": "EducationalOrganization",
    name: ORG_NAME,
    sameAs: SITE_URL,
};

const HAS_OFFER_CATALOG = {
    "@type": "OfferCatalog",
    name: "Courses Offered",
    itemListElement: COURSES.map((c) => ({
        "@type": "Course",
        name: c.name,
        description: c.description,
        provider: ORG_REF,
    })),
};

export const LOCAL_BUSINESS_SCHEMA = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
    url: SITE_URL,
    logo: ORG_LOGO,
    image: ORG_LOGO,
    telephone: ORG_PHONE,
    email: ORG_EMAIL,
    address: ADDRESS,
    geo: GEO,
    openingHoursSpecification: OPENING_HOURS,
    hasOfferCatalog: HAS_OFFER_CATALOG,
    sameAs: [],
    priceRange: "₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    areaServed: {
        "@type": "Place",
        name: "Tiruppur, Tamil Nadu, India",
    },
};
