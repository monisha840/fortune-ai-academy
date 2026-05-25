// Build-time sitemap generator.
// Emits public/sitemap.xml from the canonical route registry in src/lib/seo.routes.mjs.
// Hooked into npm's `prebuild` step.

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL, PUBLIC_PATHS } from "../src/lib/seo.routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "public", "sitemap.xml");

const today = new Date().toISOString().slice(0, 10);

const urls = PUBLIC_PATHS.map((path) => {
    const loc = `${SITE_URL}${path === "/" ? "/" : path}`;
    const priority = path === "/" ? "1.0" : "0.8";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(OUT, xml, "utf8");
console.log(`[sitemap] wrote ${PUBLIC_PATHS.length} URLs → ${OUT}`);
