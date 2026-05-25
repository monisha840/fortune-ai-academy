// Typed wrapper around `seo.routes.mjs` for React code.
// The .mjs file is the single source of truth (so build scripts can read it).
import {
    SITE_URL as SITE_URL_RAW,
    DEFAULT_SEO as DEFAULT_SEO_RAW,
    ROUTES as ROUTES_RAW,
    PUBLIC_PATHS as PUBLIC_PATHS_RAW,
    getSeoForPath as getSeoForPathRaw,
} from "./seo.routes.mjs";

export interface GeoMeta {
    region: string;
    placename: string;
    position: string;
    icbm: string;
}

export interface SeoData {
    title: string;
    description: string;
    canonical: string;
    image: string;
    ogType: string;
    twitterCard: string;
    geo: GeoMeta;
    robots: string;
    path?: string;
}

export const SITE_URL: string = SITE_URL_RAW;
export const DEFAULT_SEO: SeoData = DEFAULT_SEO_RAW as SeoData;
export const ROUTES = ROUTES_RAW as Array<Partial<SeoData> & { path: string }>;
export const PUBLIC_PATHS: string[] = PUBLIC_PATHS_RAW;

export function getSeoForPath(path: string): SeoData {
    return getSeoForPathRaw(path) as SeoData;
}

/** Merge a per-page override on top of the resolved route SEO. */
export function buildSeo(path: string, overrides: Partial<SeoData> = {}): SeoData {
    return { ...getSeoForPath(path), ...overrides };
}
