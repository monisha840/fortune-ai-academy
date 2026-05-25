// Post-build per-route meta-tag injector.
//
// Why: this is a Vite SPA, so the same index.html is served for every route by
// default. Link-preview crawlers (WhatsApp, LinkedIn, Facebook, Twitter) do NOT
// execute JavaScript, so they only see whatever meta tags are in the *initial*
// HTML response. Without this script every shared URL would preview as the
// homepage.
//
// What: after `vite build` writes dist/index.html, this script clones it into
// dist/<route>/index.html for each registered public route, and replaces the
// title / description / og:* / twitter:* / canonical tags with route-specific
// values. Vercel's filesystem routing then serves the right HTML per route.
//
// Hooked into npm's `postbuild` step.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL, ROUTES, DEFAULT_SEO, getSeoForPath } from "../src/lib/seo.routes.mjs";
import { LOCAL_BUSINESS_SCHEMA } from "../src/lib/schema.data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const ROOT_HTML = join(DIST, "index.html");

if (!existsSync(ROOT_HTML)) {
    console.error(`[prerender-meta] dist/index.html not found at ${ROOT_HTML}. Did vite build run?`);
    process.exit(1);
}

const template = readFileSync(ROOT_HTML, "utf8");

/** Escape a string so it's safe to embed inside an HTML attribute. */
function escapeAttr(s) {
    return String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/** Replace the first match of a regex; if no match, append before `</head>`. */
function replaceOrAppend(html, regex, replacement) {
    if (regex.test(html)) {
        return html.replace(regex, replacement);
    }
    return html.replace(/<\/head>/i, `  ${replacement}\n</head>`);
}

/**
 * Serialise a JSON-LD object so it's safe to embed inside an HTML <script> tag.
 * Per Google's structured-data guidelines, escape `<` as <.
 */
function jsonLdScript(obj) {
    const json = JSON.stringify(obj).replace(/</g, "\\u003c");
    return `<script type="application/ld+json">${json}</script>`;
}

const LOCAL_BUSINESS_LD = jsonLdScript(LOCAL_BUSINESS_SCHEMA);

const GOOGLE_VERIFICATION_TAG =
    '<meta name="google-site-verification" content="FRGNjxgbqa0_TQBmkWDL94b_3djO_SNIhkX3ys9xeG4" />';

function buildHtmlForRoute(seo) {
    let html = template;

    const title = escapeAttr(seo.title);
    const desc = escapeAttr(seo.description);
    const url = escapeAttr(seo.canonical);
    const img = escapeAttr(seo.image);
    const ogType = escapeAttr(seo.ogType);
    const twCard = escapeAttr(seo.twitterCard);
    const robots = escapeAttr(seo.robots);

    // <title>
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);

    // Standard meta
    html = replaceOrAppend(
        html,
        /<meta\s+name="description"[^>]*>/i,
        `<meta name="description" content="${desc}" />`
    );
    html = replaceOrAppend(
        html,
        /<meta\s+name="robots"[^>]*>/i,
        `<meta name="robots" content="${robots}" />`
    );

    // Canonical
    html = replaceOrAppend(
        html,
        /<link\s+rel="canonical"[^>]*>/i,
        `<link rel="canonical" href="${url}" />`
    );

    // Open Graph
    html = replaceOrAppend(
        html,
        /<meta\s+property="og:title"[^>]*>/i,
        `<meta property="og:title" content="${title}" />`
    );
    html = replaceOrAppend(
        html,
        /<meta\s+property="og:description"[^>]*>/i,
        `<meta property="og:description" content="${desc}" />`
    );
    html = replaceOrAppend(
        html,
        /<meta\s+property="og:type"[^>]*>/i,
        `<meta property="og:type" content="${ogType}" />`
    );
    html = replaceOrAppend(
        html,
        /<meta\s+property="og:url"[^>]*>/i,
        `<meta property="og:url" content="${url}" />`
    );
    html = replaceOrAppend(
        html,
        /<meta\s+property="og:image"[^>]*>/i,
        `<meta property="og:image" content="${img}" />`
    );

    // Twitter
    html = replaceOrAppend(
        html,
        /<meta\s+name="twitter:card"[^>]*>/i,
        `<meta name="twitter:card" content="${twCard}" />`
    );
    html = replaceOrAppend(
        html,
        /<meta\s+name="twitter:title"[^>]*>/i,
        `<meta name="twitter:title" content="${title}" />`
    );
    html = replaceOrAppend(
        html,
        /<meta\s+name="twitter:description"[^>]*>/i,
        `<meta name="twitter:description" content="${desc}" />`
    );
    html = replaceOrAppend(
        html,
        /<meta\s+name="twitter:image"[^>]*>/i,
        `<meta name="twitter:image" content="${img}" />`
    );

    // Inject (or replace) the LocalBusiness + EducationalOrganization JSON-LD.
    // The site-wide schema is identical on every route; per-route Course
    // schemas (on /courses) are added at runtime via <JsonLd>.
    const ldPattern = /<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i;
    if (ldPattern.test(html)) {
        html = html.replace(ldPattern, LOCAL_BUSINESS_LD);
    } else {
        html = html.replace(/<\/head>/i, `  ${LOCAL_BUSINESS_LD}\n</head>`);
    }

    // Defensive: guarantee the Google Search Console verification tag is in
    // every per-route HTML, even if the index.html template ever loses it.
    const gscPattern = /<meta\s+name="google-site-verification"[^>]*>/i;
    if (gscPattern.test(html)) {
        html = html.replace(gscPattern, GOOGLE_VERIFICATION_TAG);
    } else {
        html = html.replace(/<\/head>/i, `  ${GOOGLE_VERIFICATION_TAG}\n</head>`);
    }

    return html;
}

// 1) Rewrite the root index.html (the homepage / SPA fallback)
const rootSeo = getSeoForPath("/");
writeFileSync(ROOT_HTML, buildHtmlForRoute(rootSeo), "utf8");
console.log(`[prerender-meta] / → wrote dist/index.html`);

// 2) For every other registered route, emit dist/<route>/index.html
for (const route of ROUTES) {
    if (route.path === "/") continue;

    const seo = getSeoForPath(route.path);
    const targetDir = join(DIST, ...route.path.split("/").filter(Boolean));
    mkdirSync(targetDir, { recursive: true });
    const targetFile = join(targetDir, "index.html");
    writeFileSync(targetFile, buildHtmlForRoute(seo), "utf8");
    console.log(`[prerender-meta] ${route.path} → wrote ${targetFile.replace(DIST, "dist")}`);
}

// Sanity: confirm SITE_URL and the DEFAULT_SEO baseline
console.log(`[prerender-meta] done. SITE_URL=${SITE_URL}, default title="${DEFAULT_SEO.title}"`);
