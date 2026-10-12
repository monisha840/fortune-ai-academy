import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowLeft, ArrowUp, ExternalLink, Loader2, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  MODES,
  discountPercent,
  formatBatchDate,
  formatINR,
  isMissingTable,
  normalizeLandingConfig,
  type LandingConfig,
  type PortfolioItem,
} from "@/lib/landingConfig";
import { configToForm, formToPayload, validateForm, type FormState } from "@/lib/landingForm";
import type { CourseLandingContent } from "@/content/courses/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Field, { inputClass } from "./Field";
import ReviewsManager from "./ReviewsManager";

interface CourseRow {
  id: string;
  title: string;
  duration: string | null;
  salary: string | null;
  roles: string | null;
}

const NONE = "__none__"; // Radix Select cannot hold an empty-string value

const LandingEditor = ({ page }: { page: CourseLandingContent }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(true);
  const [tableMissing, setTableMissing] = useState(false);
  const [form, setForm] = useState<FormState>(() => configToForm(null, page));
  const initial = useRef<string>("");
  const [saving, setSaving] = useState(false);

  const [courseRow, setCourseRow] = useState<CourseRow | null>(null);
  const [facts, setFacts] = useState({ duration: "", salary: "", roles: "" });
  const [factsSaving, setFactsSaving] = useState(false);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    const [cfgRes, courseRes, workRes] = await Promise.all([
      supabase.from("course_landing").select("*").eq("slug", page.slug).maybeSingle(),
      supabase.from("courses").select("id, title, duration, salary, roles").eq("title", page.courseTitle).maybeSingle(),
      supabase
        .from("gallery_items")
        .select("id, image_url, media_type, title, student_name, course_name")
        .eq("type", "portfolio")
        .eq("course_name", page.courseTitle)
        .order("display_order", { ascending: true }),
    ]);

    let cfg: LandingConfig | null = null;
    if (cfgRes.error) {
      setTableMissing(isMissingTable(cfgRes.error));
      if (!isMissingTable(cfgRes.error)) {
        toast({ variant: "destructive", title: "Could not load this page's settings", description: cfgRes.error.message });
      }
    } else {
      setTableMissing(false);
      cfg = cfgRes.data ? normalizeLandingConfig(cfgRes.data as Record<string, unknown>, page.slug) : null;
    }

    const next = configToForm(cfg, page);
    setForm(next);
    initial.current = JSON.stringify(next);

    const row = (courseRes.data as CourseRow | null) ?? null;
    setCourseRow(row);
    setFacts({ duration: row?.duration ?? "", salary: row?.salary ?? "", roles: row?.roles ?? "" });
    setPortfolio((workRes.data ?? []) as PortfolioItem[]);
    setLoading(false);
  }, [page, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const errors = useMemo(() => validateForm(form), [form]);
  const hasErrors = Object.keys(errors).length > 0;
  const dirty = JSON.stringify(form) !== initial.current;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const save = async () => {
    if (hasErrors) {
      toast({ variant: "destructive", title: "Fix the highlighted fields first" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("course_landing").upsert([formToPayload(page.slug, form)], { onConflict: "slug" });
    setSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Could not save", description: error.message });
      return;
    }
    initial.current = JSON.stringify(form);
    toast({ title: "Saved", description: "The landing page is updated." });
    void queryClient.invalidateQueries({ queryKey: ["landing-config", page.slug] });
    setForm((f) => ({ ...f })); // refresh `dirty`
  };

  const saveFacts = async () => {
    if (!courseRow) return;
    if (!facts.duration.trim()) {
      toast({ variant: "destructive", title: "Duration cannot be empty" });
      return;
    }
    setFactsSaving(true);
    const { error } = await supabase
      .from("courses")
      .update({ duration: facts.duration.trim(), salary: facts.salary.trim(), roles: facts.roles.trim() })
      .eq("id", courseRow.id);
    setFactsSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Could not save", description: error.message });
      return;
    }
    toast({ title: "Quick facts saved", description: "Also updates the Courses page and cards." });
    void queryClient.invalidateQueries({ queryKey: ["course-facts", page.courseTitle] });
  };

  // ---- list editing helpers --------------------------------------------------
  const move = <T,>(list: T[], i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return list;
    const copy = [...list];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    return copy;
  };

  const resetSection = (section: "faq" | "modules" | "tools" | "stats" | "sources") => {
    const d = configToForm(null, page);
    setForm((f) => {
      switch (section) {
        case "faq":
          return { ...f, faq: d.faq, faqCustom: false };
        case "modules":
          return { ...f, modules: d.modules, modulesCustom: false };
        case "tools":
          return { ...f, tools: d.tools, toolsCustom: false };
        case "stats":
          return { ...f, stats: d.stats, statsCustom: false };
        default:
          return { ...f, sources: d.sources, sourcesCustom: false };
      }
    });
  };

  const price = Number(form.price_inr) || null;
  const mrp = Number(form.mrp_inr) || null;
  const save_pct = discountPercent(price, mrp);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  const RowBtn = ({ children, onClick, danger = false, label }: { children: React.ReactNode; onClick: () => void; danger?: boolean; label: string }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={onClick}
      className={danger ? "text-white/40 hover:bg-destructive/10 hover:text-destructive" : "text-white/50 hover:bg-white/10 hover:text-white"}
    >
      {children}
    </Button>
  );

  const ResetBtn = ({ section, active }: { section: Parameters<typeof resetSection>[0]; active: boolean }) =>
    active ? (
      <Button type="button" variant="ghost" onClick={() => resetSection(section)} className="gap-2 text-xs text-white/50 hover:text-white">
        <RotateCcw size={14} /> Reset to shipped default
      </Button>
    ) : (
      <span className="text-xs text-white/30">Showing the shipped default. Edit to customise.</span>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link to="/admin/landing-pages" className="mb-2 inline-flex items-center gap-1 text-sm text-white/50 hover:text-white">
            <ArrowLeft size={14} /> All landing pages
          </Link>
          <h1 className="font-display text-3xl font-bold text-white">{page.courseTitle}</h1>
          <p className="text-sm text-white/40">/courses/{page.slug}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="gap-2 text-white/70 hover:text-white">
            <a href={`/courses/${page.slug}`} target="_blank" rel="noopener noreferrer">
              View live page <ExternalLink size={14} />
            </a>
          </Button>
        </div>
      </div>

      {tableMissing && (
        <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
          The landing-page tables are not in the database yet, so changes cannot be saved. Run{" "}
          <code>course_landing_migration.sql</code> in the Supabase SQL editor, then reload this page.
        </p>
      )}

      <Tabs defaultValue="offer" className="space-y-6">
        <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-white/5 p-1">
          {[
            ["offer", "Offer & batch"],
            ["facts", "Quick facts"],
            ["proof", "Social proof"],
            ["syllabus", "Syllabus & tools"],
            ["faq", "FAQ"],
            ["market", "Market facts"],
            ["reviews", "Reviews"],
            ["work", "Student work"],
          ].map(([v, l]) => (
            <TabsTrigger key={v} value={v} className="text-white/60 data-[state=active]:bg-accent data-[state=active]:text-navy">
              {l}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ---- Offer & batch ---------------------------------------------------- */}
        <TabsContent value="offer" className="space-y-6">
          <p className="text-sm text-white/45">Everything here is optional. A blank field is simply not shown on the page.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Price (₹)" htmlFor="price" error={errors.price_inr} hint="Whole rupees, no commas. e.g. 24999">
              <Input id="price" inputMode="numeric" value={form.price_inr} onChange={(e) => set("price_inr", e.target.value)} className={inputClass} />
            </Field>
            <Field label="MRP (₹)" htmlFor="mrp" error={errors.mrp_inr} hint="The struck-through original price. Optional.">
              <Input id="mrp" inputMode="numeric" value={form.mrp_inr} onChange={(e) => set("mrp_inr", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Price note" htmlFor="price_note" hint="e.g. Inclusive of GST">
              <Input id="price_note" value={form.price_note} onChange={(e) => set("price_note", e.target.value)} className={inputClass} />
            </Field>
            <Field label="EMI note" htmlFor="emi_note" hint="e.g. EMI from ₹3,500 / month">
              <Input id="emi_note" value={form.emi_note} onChange={(e) => set("emi_note", e.target.value)} className={inputClass} />
            </Field>
          </div>

          {price ? (
            <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              Shown as <span className="font-bold text-white">{formatINR(price)}</span>
              {mrp && mrp > price ? <span className="ml-2 text-white/40 line-through">{formatINR(mrp)}</span> : null}
              {save_pct ? <span className="ml-2 font-semibold text-emerald-300">Save {save_pct}%</span> : null}
            </p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Mode" htmlFor="mode" error={errors.mode}>
              <Select value={form.mode || NONE} onValueChange={(v) => set("mode", v === NONE ? "" : v)}>
                <SelectTrigger id="mode" className={inputClass}>
                  <SelectValue placeholder="Not shown" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Not shown</SelectItem>
                  {MODES.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="City / branch" htmlFor="city" hint="e.g. Tiruppur">
              <Input id="city" value={form.city} onChange={(e) => set("city", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Batch name" htmlFor="batch_label" hint="e.g. November batch. Wins over the date below when both are set.">
              <Input id="batch_label" value={form.batch_label} onChange={(e) => set("batch_label", e.target.value)} className={inputClass} />
            </Field>
            <Field
              label="Batch start date"
              htmlFor="batch_start"
              error={errors.batch_start}
              hint={form.batch_start && formatBatchDate(form.batch_start) ? `Shown as ${formatBatchDate(form.batch_start)}. Hidden automatically once it has passed.` : "Hidden automatically once the date has passed."}
            >
              <Input id="batch_start" type="date" value={form.batch_start} onChange={(e) => set("batch_start", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Seats left" htmlFor="seats_left" error={errors.seats_left} hint="0 shows “batch full”. Leave blank to hide.">
              <Input id="seats_left" inputMode="numeric" value={form.seats_left} onChange={(e) => set("seats_left", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Class timings" htmlFor="timings" hint="e.g. Mon to Fri, 10 AM to 1 PM">
              <Input id="timings" value={form.timings} onChange={(e) => set("timings", e.target.value)} className={inputClass} />
            </Field>
          </div>
        </TabsContent>

        {/* ---- Quick facts (courses table) ---------------------------------------- */}
        <TabsContent value="facts" className="space-y-6">
          {!courseRow ? (
            <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
              There is no course named <strong>“{page.courseTitle}”</strong> in the Courses list, so duration, salary and roles cannot show
              on this page. Add it under{" "}
              <Link to="/admin/courses" className="underline">
                Courses
              </Link>{" "}
              with exactly that title.
            </p>
          ) : (
            <>
              <p className="text-sm text-white/45">
                These come from the <strong className="text-white/70">Courses</strong> list, so changing them here also updates the course
                cards, the footer and every other place that course appears.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Duration" htmlFor="f-duration" hint="e.g. 4 Months">
                  <Input id="f-duration" value={facts.duration} onChange={(e) => setFacts({ ...facts, duration: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Salary range" htmlFor="f-salary" hint="e.g. ₹5 to 12 LPA">
                  <Input id="f-salary" value={facts.salary} onChange={(e) => setFacts({ ...facts, salary: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Career roles" htmlFor="f-roles" hint="Comma separated" className="sm:col-span-2">
                  <Input id="f-roles" value={facts.roles} onChange={(e) => setFacts({ ...facts, roles: e.target.value })} className={inputClass} />
                </Field>
              </div>
              <Button onClick={saveFacts} disabled={factsSaving} className="gap-2 bg-accent font-bold text-navy hover:bg-gold">
                {factsSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                Save quick facts
              </Button>
            </>
          )}
        </TabsContent>

        {/* ---- Social proof ----------------------------------------------------- */}
        <TabsContent value="proof" className="space-y-6">
          <p className="text-sm text-white/45">
            Only enter numbers you can back up. Each one is shown only when filled in; a blank field is hidden.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Average rating (0 to 5)" htmlFor="rating" error={errors.rating} hint="e.g. 4.8">
              <Input id="rating" inputMode="decimal" value={form.rating} onChange={(e) => set("rating", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Number of reviews behind the rating" htmlFor="rating_count" error={errors.rating_count}>
              <Input id="rating_count" inputMode="numeric" value={form.rating_count} onChange={(e) => set("rating_count", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Learners trained" htmlFor="learners" error={errors.learners_trained} hint="Shown as e.g. 1,000+">
              <Input id="learners" inputMode="numeric" value={form.learners_trained} onChange={(e) => set("learners_trained", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Placement assistance %" htmlFor="placement" error={errors.placement_percent} hint="0 to 100">
              <Input id="placement" inputMode="numeric" value={form.placement_percent} onChange={(e) => set("placement_percent", e.target.value)} className={inputClass} />
            </Field>
          </div>
        </TabsContent>

        {/* ---- Syllabus & tools -------------------------------------------------- */}
        <TabsContent value="syllabus" className="space-y-8">
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-white">Modules</h2>
              <ResetBtn section="modules" active={form.modulesCustom} />
            </div>
            {form.modules.length === 0 && (
              <p className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/45">
                This page ships without a module list, so the syllabus section shows tools only. Add modules to show a timeline.
              </p>
            )}
            {form.modules.map((m, i) => (
              <div key={i} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 shrink-0 text-center font-display font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <Input
                    aria-label={`Module ${i + 1} title`}
                    value={m.title}
                    placeholder="Module title"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, modulesCustom: true, modules: f.modules.map((x, k) => (k === i ? { ...x, title: e.target.value } : x)) }))
                    }
                    className={inputClass}
                  />
                  <RowBtn label="Move up" onClick={() => setForm((f) => ({ ...f, modulesCustom: true, modules: move(f.modules, i, -1) }))}>
                    <ArrowUp size={16} />
                  </RowBtn>
                  <RowBtn label="Move down" onClick={() => setForm((f) => ({ ...f, modulesCustom: true, modules: move(f.modules, i, 1) }))}>
                    <ArrowDown size={16} />
                  </RowBtn>
                  <RowBtn danger label="Remove module" onClick={() => setForm((f) => ({ ...f, modulesCustom: true, modules: f.modules.filter((_, k) => k !== i) }))}>
                    <Trash2 size={16} />
                  </RowBtn>
                </div>
                <Textarea
                  aria-label={`Module ${i + 1} topics`}
                  value={m.topics}
                  placeholder={"Topics, one per line.\nA module with topics becomes expandable."}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, modulesCustom: true, modules: f.modules.map((x, k) => (k === i ? { ...x, topics: e.target.value } : x)) }))
                  }
                  className={`${inputClass} min-h-[84px]`}
                />
                {errors[`modules.${i}`] && <p className="text-xs font-medium text-red-300">{errors[`modules.${i}`]}</p>}
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              onClick={() => setForm((f) => ({ ...f, modulesCustom: true, modules: [...f.modules, { title: "", topics: "" }] }))}
              className="gap-2 text-accent hover:bg-accent/10"
            >
              <Plus size={16} /> Add module
            </Button>
          </section>

          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-white">Tools</h2>
              <ResetBtn section="tools" active={form.toolsCustom} />
            </div>
            <Textarea
              aria-label="Tools"
              value={form.tools}
              onChange={(e) => setForm((f) => ({ ...f, tools: e.target.value, toolsCustom: true }))}
              className={`${inputClass} min-h-[110px]`}
            />
            <p className="text-xs text-white/35">One per line, or separated by commas.</p>
          </section>
        </TabsContent>

        {/* ---- FAQ ------------------------------------------------------------------ */}
        <TabsContent value="faq" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-white/45">
              The answers shipped with the site are placeholders written from the page itself. Review and replace them with the exact
              answers you want to give.
            </p>
            <ResetBtn section="faq" active={form.faqCustom} />
          </div>
          {form.faq.map((x, i) => (
            <div key={i} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2">
                <Input
                  aria-label={`Question ${i + 1}`}
                  value={x.q}
                  placeholder="Question"
                  onChange={(e) => setForm((f) => ({ ...f, faqCustom: true, faq: f.faq.map((y, k) => (k === i ? { ...y, q: e.target.value } : y)) }))}
                  className={`${inputClass} font-semibold`}
                />
                <RowBtn label="Move up" onClick={() => setForm((f) => ({ ...f, faqCustom: true, faq: move(f.faq, i, -1) }))}>
                  <ArrowUp size={16} />
                </RowBtn>
                <RowBtn label="Move down" onClick={() => setForm((f) => ({ ...f, faqCustom: true, faq: move(f.faq, i, 1) }))}>
                  <ArrowDown size={16} />
                </RowBtn>
                <RowBtn danger label="Remove question" onClick={() => setForm((f) => ({ ...f, faqCustom: true, faq: f.faq.filter((_, k) => k !== i) }))}>
                  <Trash2 size={16} />
                </RowBtn>
              </div>
              <Textarea
                aria-label={`Answer ${i + 1}`}
                value={x.a}
                placeholder="Answer"
                onChange={(e) => setForm((f) => ({ ...f, faqCustom: true, faq: f.faq.map((y, k) => (k === i ? { ...y, a: e.target.value } : y)) }))}
                className={`${inputClass} min-h-[90px]`}
              />
              {errors[`faq.${i}`] && <p className="text-xs font-medium text-red-300">{errors[`faq.${i}`]}</p>}
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            onClick={() => setForm((f) => ({ ...f, faqCustom: true, faq: [...f.faq, { q: "", a: "" }] }))}
            className="gap-2 text-accent hover:bg-accent/10"
          >
            <Plus size={16} /> Add question
          </Button>
        </TabsContent>

        {/* ---- Market facts ---------------------------------------------------------- */}
        <TabsContent value="market" className="space-y-8">
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-white">Headline figures</h2>
              <ResetBtn section="stats" active={form.statsCustom} />
            </div>
            {form.stats.map((x, i) => (
              <div key={i} className="grid gap-2 sm:grid-cols-[140px_1fr_auto]">
                <Input
                  aria-label={`Figure ${i + 1}`}
                  value={x.value}
                  placeholder="e.g. 32%"
                  onChange={(e) => setForm((f) => ({ ...f, statsCustom: true, stats: f.stats.map((y, k) => (k === i ? { ...y, value: e.target.value } : y)) }))}
                  className={`${inputClass} font-bold`}
                />
                <Input
                  aria-label={`Figure ${i + 1} meaning`}
                  value={x.label}
                  placeholder="What it means"
                  onChange={(e) => setForm((f) => ({ ...f, statsCustom: true, stats: f.stats.map((y, k) => (k === i ? { ...y, label: e.target.value } : y)) }))}
                  className={inputClass}
                />
                <RowBtn danger label="Remove figure" onClick={() => setForm((f) => ({ ...f, statsCustom: true, stats: f.stats.filter((_, k) => k !== i) }))}>
                  <Trash2 size={16} />
                </RowBtn>
                {errors[`stats.${i}`] && <p className="text-xs font-medium text-red-300 sm:col-span-3">{errors[`stats.${i}`]}</p>}
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              disabled={form.stats.length >= 4}
              onClick={() => setForm((f) => ({ ...f, statsCustom: true, stats: [...f.stats, { value: "", label: "" }] }))}
              className="gap-2 text-accent hover:bg-accent/10"
            >
              <Plus size={16} /> Add figure
            </Button>
          </section>

          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-white">Sources line</h2>
              <ResetBtn section="sources" active={form.sourcesCustom} />
            </div>
            <Textarea
              aria-label="Sources"
              value={form.sources}
              onChange={(e) => setForm((f) => ({ ...f, sources: e.target.value, sourcesCustom: true }))}
              className={`${inputClass} min-h-[130px]`}
            />
            <p className="text-xs text-white/35">
              Shown in small print under the market chart. Name the report or publication for each figure above.
            </p>
          </section>
        </TabsContent>

        {/* ---- Reviews ----------------------------------------------------------------- */}
        <TabsContent value="reviews">
          <ReviewsManager slug={page.slug} />
        </TabsContent>

        {/* ---- Student work -------------------------------------------------------------- */}
        <TabsContent value="work" className="space-y-4">
          <p className="text-sm text-white/45">
            Student work is managed in the <strong className="text-white/70">Gallery</strong>. Add an item of type{" "}
            <strong className="text-white/70">Portfolio</strong> and set its course to <strong className="text-white/70">{page.courseTitle}</strong>;
            it appears on this page automatically (up to 9, in display order).
          </p>
          <Button asChild variant="ghost" className="gap-2 text-accent hover:bg-accent/10">
            <Link to="/admin/gallery">
              Open Gallery <ExternalLink size={14} />
            </Link>
          </Button>
          {portfolio.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/5 py-10 text-center text-white/30">
              None yet. The student-work section stays hidden on the page.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {portfolio.map((p) => (
                <li key={p.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="aspect-[4/3] bg-black/30">
                    {p.media_type === "video" ? (
                      <video src={p.image_url} className="h-full w-full object-cover" muted preload="metadata" />
                    ) : (
                      <img src={p.image_url} alt={p.title ?? ""} className="h-full w-full object-cover" loading="lazy" />
                    )}
                  </div>
                  <p className="truncate p-2 text-xs text-white/60">{p.title || p.student_name || "Untitled"}</p>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>

      {/* Sticky save bar for the landing-page settings (tabs other than Quick facts / Reviews save themselves) */}
      <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-secondary/95 p-4 shadow-2xl backdrop-blur">
        <p className="text-sm text-white/60">
          {hasErrors
            ? "Some fields need attention before you can save."
            : dirty
              ? "You have unsaved changes to Offer, Proof, Syllabus, FAQ or Market facts."
              : "All changes saved."}
        </p>
        <Button onClick={save} disabled={saving || !dirty || hasErrors || tableMissing} className="min-w-[150px] gap-2 bg-accent font-bold text-navy hover:bg-gold">
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default LandingEditor;
