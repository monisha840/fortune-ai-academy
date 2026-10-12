import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Circle, ExternalLink, Loader2, Pencil } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { courseLandingPages, getCourseLanding } from "@/content/courses";
import { isMissingTable, normalizeLandingConfig, type LandingConfig } from "@/lib/landingConfig";
import { buildChecklist } from "@/lib/landingForm";
import { Button } from "@/components/ui/button";
import LandingEditor from "./landing/LandingEditor";

interface Summary {
  cfg: LandingConfig | null;
  duration: string | null;
  approvedReviews: number;
  portfolioCount: number;
}

const List = () => {
  const [loading, setLoading] = useState(true);
  const [tableMissing, setTableMissing] = useState(false);
  const [data, setData] = useState<Record<string, Summary>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [cfgs, courses, reviews, work] = await Promise.all([
        supabase.from("course_landing").select("*"),
        supabase.from("courses").select("title, duration"),
        supabase.from("course_reviews").select("course_slug").eq("is_approved", true),
        supabase.from("gallery_items").select("course_name").eq("type", "portfolio"),
      ]);
      if (cancelled) return;

      setTableMissing(isMissingTable(cfgs.error));

      const cfgBySlug = new Map<string, LandingConfig>();
      (cfgs.data ?? []).forEach((r) => {
        const row = r as Record<string, unknown>;
        const slug = String(row.slug);
        cfgBySlug.set(slug, normalizeLandingConfig(row, slug));
      });
      const durationByTitle = new Map<string, string | null>();
      (courses.data ?? []).forEach((c) => durationByTitle.set(String(c.title).toLowerCase(), c.duration as string | null));
      const reviewCount = new Map<string, number>();
      (reviews.data ?? []).forEach((r) => reviewCount.set(r.course_slug, (reviewCount.get(r.course_slug) ?? 0) + 1));
      const workCount = new Map<string, number>();
      (work.data ?? []).forEach((w) => {
        const k = String(w.course_name ?? "").toLowerCase();
        if (k) workCount.set(k, (workCount.get(k) ?? 0) + 1);
      });

      const out: Record<string, Summary> = {};
      courseLandingPages.forEach((p) => {
        const t = p.courseTitle.toLowerCase();
        out[p.slug] = {
          cfg: cfgBySlug.get(p.slug) ?? null,
          duration: durationByTitle.get(t) ?? null,
          approvedReviews: reviewCount.get(p.slug) ?? 0,
          portfolioCount: workCount.get(t) ?? 0,
        };
      });
      setData(out);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(
    () =>
      courseLandingPages.map((p) => {
        const s = data[p.slug];
        const checklist = buildChecklist({
          cfg: s?.cfg ?? null,
          courseRow: s ? { duration: s.duration } : null,
          approvedReviews: s?.approvedReviews ?? 0,
          portfolioCount: s?.portfolioCount ?? 0,
          defaults: p,
        });
        return { page: p, checklist, done: checklist.filter((c) => c.done).length };
      }),
    [data],
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Landing Pages</h1>
        <p className="mt-1 text-sm text-white/45">
          Price, batch, reviews and the other facts shown on each course landing page. Anything left blank is simply not shown.
        </p>
      </div>

      {tableMissing && (
        <div className="flex gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
          <AlertTriangle className="mt-0.5 shrink-0" size={18} />
          <p>
            The landing-page tables are not in the database yet. Run <code>course_landing_migration.sql</code> (in the project folder) in
            the Supabase SQL editor, then reload. Until then the pages keep working with the text that ships with the site, but nothing
            here can be saved.
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="animate-spin text-accent" size={40} />
        </div>
      ) : (
        <ul className="space-y-4">
          {rows.map(({ page, checklist, done }) => {
            const missingImportant = checklist.filter((c) => !c.done && c.important);
            return (
              <li key={page.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-display text-xl font-bold text-white">{page.courseTitle}</h2>
                    <p className="text-xs text-white/35">/courses/{page.slug}</p>
                    <p className="mt-2 text-sm text-white/50">
                      {done} of {checklist.length} set up
                      {missingImportant.length > 0 && (
                        <span className="ml-2 font-semibold text-amber-300">
                          Needs: {missingImportant.map((c) => c.label.toLowerCase()).join(", ")}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm" className="gap-1.5 text-white/60 hover:text-white">
                      <a href={`/courses/${page.slug}`} target="_blank" rel="noopener noreferrer">
                        View <ExternalLink size={13} />
                      </a>
                    </Button>
                    <Button asChild size="sm" className="gap-1.5 bg-accent font-bold text-navy hover:bg-gold">
                      <Link to={`/admin/landing-pages/${page.slug}`}>
                        <Pencil size={14} /> Edit
                      </Link>
                    </Button>
                  </div>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {checklist.map((c) => (
                    <li
                      key={c.key}
                      title={c.done ? "Set" : `Add in: ${c.hint}`}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                        c.done
                          ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                          : c.important
                            ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
                            : "border-white/10 bg-white/5 text-white/40"
                      }`}
                    >
                      {c.done ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                      {c.label}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const EditorRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = getCourseLanding(slug);
  if (!page) {
    return (
      <div className="space-y-3">
        <p className="text-white/70">There is no landing page called “{slug}”.</p>
        <Link to="/admin/landing-pages" className="text-accent underline">
          Back to all landing pages
        </Link>
      </div>
    );
  }
  // key: switching pages remounts the editor so no state leaks between courses
  return <LandingEditor key={page.slug} page={page} />;
};

const AdminLandingPages = () => (
  <Routes>
    <Route index element={<List />} />
    <Route path=":slug" element={<EditorRoute />} />
  </Routes>
);

export default AdminLandingPages;
