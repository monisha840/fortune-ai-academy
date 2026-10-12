import { describe, it, expect, vi } from "vitest";

// The data layer imports the Supabase client, which needs env vars at import
// time. These tests only exercise the pure functions, so stub it out.
vi.mock("@/lib/supabase", () => ({ supabase: {} }));

import {
  applyLandingConfig,
  buildOffer,
  buildProof,
  discountPercent,
  formatBatchDate,
  formatINR,
  isMissingTable,
  isUpcoming,
  normalizeLandingConfig,
  parseFaq,
  parseModules,
} from "./landingConfig";
import { courseLandingPages } from "@/content/courses";

const content = courseLandingPages[0];

describe("normalizeLandingConfig", () => {
  it("turns an empty row into all-null, never throws", () => {
    const c = normalizeLandingConfig({}, "ui-ux-design");
    expect(c.price_inr).toBeNull();
    expect(c.faq).toBeNull();
    expect(c.modules).toBeNull();
    expect(normalizeLandingConfig(null, "x").slug).toBe("x");
  });

  it("accepts numbers typed as strings and rejects junk", () => {
    const c = normalizeLandingConfig(
      { price_inr: "24999", mrp_inr: "abc", seats_left: "-3", rating: "4.8", placement_percent: 140 },
      "x",
    );
    expect(c.price_inr).toBe(24999);
    expect(c.mrp_inr).toBeNull();
    expect(c.seats_left).toBeNull(); // negative
    expect(c.rating).toBe(4.8);
    expect(c.placement_percent).toBeNull(); // over 100
  });

  it("zero price is treated as not set (never show a free course by accident)", () => {
    expect(normalizeLandingConfig({ price_inr: 0 }, "x").price_inr).toBeNull();
  });

  it("rejects an unknown mode", () => {
    expect(normalizeLandingConfig({ mode: "Telepathy" }, "x").mode).toBeNull();
    expect(normalizeLandingConfig({ mode: "Hybrid" }, "x").mode).toBe("Hybrid");
  });
});

describe("JSON content parsing", () => {
  it("keeps only complete FAQ entries", () => {
    expect(parseFaq([{ q: "A?", a: "B" }, { q: "", a: "x" }, { q: "C?" }, null, 4])).toEqual([{ q: "A?", a: "B" }]);
    expect(parseFaq("nope")).toBeNull();
    expect(parseFaq([])).toBeNull();
  });

  it("parses modules with and without topics", () => {
    expect(parseModules([{ title: "One", topics: ["a", " ", "b"] }, { title: "Two" }, { topics: ["x"] }])).toEqual([
      { title: "One", topics: ["a", "b"] },
      { title: "Two", topics: [] },
    ]);
  });
});

describe("formatting", () => {
  it("uses Indian digit grouping", () => {
    expect(formatINR(24999)).toBe("₹24,999");
    expect(formatINR(1250000)).toBe("₹12,50,000");
  });

  it("computes a discount only when MRP is genuinely higher", () => {
    expect(discountPercent(24999, 34999)).toBe(29);
    expect(discountPercent(30000, 30000)).toBeNull();
    expect(discountPercent(40000, 30000)).toBeNull();
    expect(discountPercent(null, 30000)).toBeNull();
  });

  it("formats a batch date without timezone drift", () => {
    expect(formatBatchDate("2026-11-03")).toBe("3 Nov 2026");
    expect(formatBatchDate("garbage")).toBeNull();
    expect(formatBatchDate(null)).toBeNull();
  });

  it("knows whether a batch is still upcoming", () => {
    const now = new Date(2026, 9, 12); // 12 Oct 2026
    expect(isUpcoming("2026-10-12", now)).toBe(true);
    expect(isUpcoming("2026-10-11", now)).toBe(false);
    expect(isUpcoming(null, now)).toBe(true);
  });
});

describe("buildOffer / buildProof", () => {
  it("returns null when nothing is set, so no empty box renders", () => {
    expect(buildOffer(normalizeLandingConfig({}, "x"))).toBeNull();
    expect(buildProof(normalizeLandingConfig({}, "x"))).toBeNull();
    expect(buildOffer(null)).toBeNull();
  });

  it("drops an MRP that is not above the price", () => {
    const o = buildOffer(normalizeLandingConfig({ price_inr: 20000, mrp_inr: 15000 }, "x"));
    expect(o?.mrp).toBeNull();
    expect(o?.save).toBeNull();
  });

  it("hides a past batch date but keeps an explicit label", () => {
    const past = buildOffer(normalizeLandingConfig({ price_inr: 1000, batch_start: "2020-01-01" }, "x"));
    expect(past?.batch).toBeNull();
    const labelled = buildOffer(normalizeLandingConfig({ price_inr: 1000, batch_label: "November batch" }, "x"));
    expect(labelled?.details).toContain("November batch");
  });

  it("keeps seats_left of 0 (sold out) as a real value", () => {
    expect(buildOffer(normalizeLandingConfig({ seats_left: 0 }, "x"))?.seatsLeft).toBe(0);
  });

  it("builds only the proof numbers that are filled in", () => {
    const p = buildProof(normalizeLandingConfig({ rating: 4.8, rating_count: 520, placement_percent: 90 }, "x"));
    expect(p?.map((i) => i.value)).toEqual(["4.8/5", "90%"]);
  });
});

describe("applyLandingConfig", () => {
  it("returns the defaults untouched when there is no config", () => {
    expect(applyLandingConfig(content, null)).toBe(content);
    expect(applyLandingConfig(content, normalizeLandingConfig({}, content.slug)).faq).toEqual(content.faq);
  });

  it("overrides only what the CMS provides", () => {
    const cfg = normalizeLandingConfig(
      { faq: [{ q: "Q?", a: "A." }], tools: ["Figma"], sources: "Cited." },
      content.slug,
    );
    const out = applyLandingConfig(content, cfg);
    expect(out.faq).toEqual([{ q: "Q?", a: "A." }]);
    expect(out.curriculum.tools).toEqual(["Figma"]);
    expect(out.demand.sources).toBe("Cited.");
    // untouched
    expect(out.curriculum.modules).toEqual(content.curriculum.modules);
    expect(out.hero).toBe(content.hero);
  });

  it("lets the CMS add modules to a course that shipped without any", () => {
    const textile = courseLandingPages.find((c) => c.slug === "textile-garment-design")!;
    expect(textile.curriculum.modules).toHaveLength(0);
    const out = applyLandingConfig(
      textile,
      normalizeLandingConfig({ modules: [{ title: "Pattern Making", topics: ["Drafting"] }] }, textile.slug),
    );
    expect(out.curriculum.modules).toHaveLength(1);
  });
});

describe("isMissingTable", () => {
  it("recognises the codes that mean the migration has not been run", () => {
    expect(isMissingTable({ code: "42P01" })).toBe(true);
    expect(isMissingTable({ code: "PGRST205" })).toBe(true);
    expect(isMissingTable({ code: "23505" })).toBe(false);
    expect(isMissingTable(null)).toBe(false);
  });
});
