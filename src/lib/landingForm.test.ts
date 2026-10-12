import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/supabase", () => ({ supabase: {} }));

import { buildChecklist, configToForm, formToPayload, splitList, validateForm } from "./landingForm";
import { normalizeLandingConfig } from "./landingConfig";
import { courseLandingPages } from "@/content/courses";

const ui = courseLandingPages.find((c) => c.slug === "ui-ux-design")!;
const textile = courseLandingPages.find((c) => c.slug === "textile-garment-design")!;
const blank = () => configToForm(null, ui);

describe("configToForm / formToPayload round trip", () => {
  it("a page with no CMS row saves as all-NULL, so defaults keep applying", () => {
    const p = formToPayload(ui.slug, blank());
    expect(p.price_inr).toBeNull();
    expect(p.faq).toBeNull();
    expect(p.modules).toBeNull();
    expect(p.tools).toBeNull();
    expect(p.demand_stats).toBeNull();
    expect(p.sources).toBeNull();
  });

  it("pre-fills editable sections from the shipped defaults", () => {
    const f = blank();
    expect(f.faq).toHaveLength(ui.faq.length);
    expect(f.modules[0].title).toBe(ui.curriculum.modules[0].title);
    expect(f.faqCustom).toBe(false);
  });

  it("only saves a section once it has been marked customised", () => {
    const f = blank();
    f.faq[0].a = "A better answer.";
    expect(formToPayload(ui.slug, f).faq).toBeNull(); // not flagged yet
    f.faqCustom = true;
    expect(formToPayload(ui.slug, f).faq?.[0].a).toBe("A better answer.");
  });

  it("keeps a CMS override across a load and save", () => {
    const cfg = normalizeLandingConfig({ price_inr: 24999, faq: [{ q: "Q?", a: "A." }] }, ui.slug);
    const f = configToForm(cfg, ui);
    expect(f.price_inr).toBe("24999");
    expect(f.faqCustom).toBe(true);
    expect(formToPayload(ui.slug, f).faq).toEqual([{ q: "Q?", a: "A." }]);
  });

  it("splits tools by line or comma and module topics by line", () => {
    expect(splitList("Figma, Maze\nNotion\n")).toEqual(["Figma", "Maze", "Notion"]);
    const f = configToForm(null, textile);
    f.modulesCustom = true;
    f.modules = [{ title: "Pattern Making", topics: "Drafting\n\nGrading" }];
    expect(formToPayload(textile.slug, f).modules).toEqual([{ title: "Pattern Making", topics: ["Drafting", "Grading"] }]);
  });

  it("drops half-filled FAQ rows from the saved payload", () => {
    const f = blank();
    f.faqCustom = true;
    f.faq = [{ q: "Q?", a: "" }, { q: "Q2?", a: "A2." }];
    expect(formToPayload(ui.slug, f).faq).toEqual([{ q: "Q2?", a: "A2." }]);
  });
});

describe("validateForm", () => {
  it("accepts an empty form", () => {
    expect(validateForm(blank())).toEqual({});
  });

  it("rejects bad money, seats, rating and percent", () => {
    const f = blank();
    f.price_inr = "24,999";
    f.seats_left = "-1";
    f.rating = "7";
    f.placement_percent = "120";
    const e = validateForm(f);
    expect(e.price_inr).toBeTruthy();
    expect(e.seats_left).toBeTruthy();
    expect(e.rating).toBeTruthy();
    expect(e.placement_percent).toBeTruthy();
  });

  it("requires a price when an MRP is given, and an MRP above the price", () => {
    const f = blank();
    f.mrp_inr = "30000";
    expect(validateForm(f).price_inr).toBeTruthy();
    f.price_inr = "40000";
    expect(validateForm(f).mrp_inr).toBeTruthy();
    f.price_inr = "25000";
    expect(validateForm(f)).toEqual({});
  });

  it("asks for a review count whenever a rating is shown", () => {
    const f = blank();
    f.rating = "4.8";
    expect(validateForm(f).rating_count).toBeTruthy();
    f.rating_count = "120";
    expect(validateForm(f)).toEqual({});
  });
});

describe("buildChecklist", () => {
  const base = { courseRow: { duration: "4 Months" }, approvedReviews: 0, portfolioCount: 0 };

  it("flags the launch-critical gaps on a fresh page", () => {
    const c = buildChecklist({ cfg: null, defaults: textile, ...base, courseRow: null });
    const by = Object.fromEntries(c.map((i) => [i.key, i]));
    expect(by.price.done).toBe(false);
    expect(by.duration.done).toBe(false);
    expect(by.faq.done).toBe(false);
    expect(by.modules.done).toBe(false); // textile ships without modules
  });

  it("marks things done as they are filled in", () => {
    const cfg = normalizeLandingConfig({ price_inr: 20000, faq: [{ q: "Q?", a: "A." }], seats_left: 0 }, ui.slug);
    const c = buildChecklist({ cfg, defaults: ui, ...base, approvedReviews: 2 });
    const by = Object.fromEntries(c.map((i) => [i.key, i]));
    expect(by.price.done).toBe(true);
    expect(by.duration.done).toBe(true);
    expect(by.faq.done).toBe(true);
    expect(by.batch.done).toBe(true); // seats_left 0 still counts as set
    expect(by.reviews.done).toBe(true);
  });
});
