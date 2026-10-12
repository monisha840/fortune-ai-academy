import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Edit2, Loader2, Plus, Save, Star, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { isMissingTable, type LandingReview } from "@/lib/landingConfig";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import ImageUploadField from "../ImageUploadField";
import Field, { inputClass } from "./Field";

interface Draft {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: string;
  image_url: string;
  display_order: string;
  is_approved: boolean;
}

const empty = (order: number): Draft => ({
  name: "",
  role: "",
  company: "",
  quote: "",
  rating: "",
  image_url: "",
  display_order: String(order),
  is_approved: false,
});

const ReviewsManager = ({ slug }: { slug: string }) => {
  const [reviews, setReviews] = useState<LandingReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(empty(1));
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const refreshPublic = () => queryClient.invalidateQueries({ queryKey: ["landing-reviews", slug] });

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("course_reviews")
      .select("*")
      .eq("course_slug", slug)
      .order("display_order", { ascending: true });
    if (error) {
      setMissing(isMissingTable(error));
      if (!isMissingTable(error)) toast({ variant: "destructive", title: "Could not load reviews", description: error.message });
      setReviews([]);
    } else {
      setMissing(false);
      setReviews((data ?? []) as LandingReview[]);
    }
    setLoading(false);
  }, [slug, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const openDialog = (r: LandingReview | null) => {
    setEditingId(r?.id ?? null);
    setDraft(
      r
        ? {
            name: r.name,
            role: r.role ?? "",
            company: r.company ?? "",
            quote: r.quote,
            rating: r.rating ? String(r.rating) : "",
            image_url: r.image_url ?? "",
            display_order: String(r.display_order),
            is_approved: r.is_approved,
          }
        : empty(reviews.length + 1),
    );
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const quote = draft.quote.trim();
    if (draft.name.trim().length < 2) return toast({ variant: "destructive", title: "Add the learner's name" });
    if (quote.length < 10 || quote.length > 600) {
      return toast({ variant: "destructive", title: "The quote must be 10 to 600 characters", description: `It is ${quote.length} now.` });
    }
    const rating = draft.rating ? Number(draft.rating) : null;
    if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
      return toast({ variant: "destructive", title: "Rating must be a whole number from 1 to 5" });
    }

    setSaving(true);
    const row = {
      course_slug: slug,
      name: draft.name.trim(),
      role: draft.role.trim() || null,
      company: draft.company.trim() || null,
      quote,
      rating,
      image_url: draft.image_url.trim() || null,
      display_order: Number.parseInt(draft.display_order, 10) || 0,
      is_approved: draft.is_approved,
    };
    const { error } = editingId
      ? await supabase.from("course_reviews").update(row).eq("id", editingId)
      : await supabase.from("course_reviews").insert([row]);
    setSaving(false);

    if (error) return toast({ variant: "destructive", title: "Could not save review", description: error.message });
    toast({ title: editingId ? "Review updated" : "Review added" });
    setOpen(false);
    await load();
    refreshPublic();
  };

  const toggleApproved = async (r: LandingReview, value: boolean) => {
    setReviews((list) => list.map((x) => (x.id === r.id ? { ...x, is_approved: value } : x)));
    const { error } = await supabase.from("course_reviews").update({ is_approved: value }).eq("id", r.id);
    if (error) {
      toast({ variant: "destructive", title: "Could not update", description: error.message });
      await load();
    } else {
      toast({ title: value ? "Now visible on the page" : "Hidden from the page" });
      refreshPublic();
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setSaving(true);
    const { error } = await supabase.from("course_reviews").delete().eq("id", toDelete);
    setSaving(false);
    setToDelete(null);
    if (error) return toast({ variant: "destructive", title: "Could not delete", description: error.message });
    toast({ title: "Review deleted" });
    await load();
    refreshPublic();
  };

  if (missing) {
    return (
      <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
        The reviews table does not exist yet. Run <code>course_landing_migration.sql</code> in the Supabase SQL editor, then reload.
      </p>
    );
  }

  const approved = reviews.filter((r) => r.is_approved).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-white/50">
          {approved} of {reviews.length} shown on the page. Only <span className="text-white/80">approved</span> reviews are public.
          Use real, verifiable feedback only.
        </p>
        <Button onClick={() => openDialog(null)} className="gap-2 bg-accent font-bold text-navy hover:bg-gold">
          <Plus size={16} /> Add review
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-accent" size={32} />
        </div>
      ) : reviews.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/5 py-10 text-center text-white/30">
          No reviews yet. The section stays hidden on the page until you approve one.
        </p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-white">
                    {r.name}
                    {(r.role || r.company) && (
                      <span className="ml-2 text-sm font-normal text-white/45">
                        {[r.role, r.company].filter(Boolean).join(" at ")}
                      </span>
                    )}
                  </p>
                  {r.rating ? (
                    <span className="mt-1 flex gap-0.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} size={13} className={i < (r.rating ?? 0) ? "fill-accent text-accent" : "text-white/20"} />
                      ))}
                    </span>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-white/70">"{r.quote}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-semibold text-white/60">
                    {r.is_approved ? <Check size={14} className="text-emerald-400" /> : null}
                    {r.is_approved ? "Visible" : "Hidden"}
                    <Switch checked={r.is_approved} onCheckedChange={(v) => void toggleApproved(r, v)} />
                  </label>
                  <Button variant="ghost" size="icon" onClick={() => openDialog(r)} className="text-white/60 hover:bg-white/10 hover:text-white">
                    <Edit2 size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setToDelete(r.id)} className="text-white/40 hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-white/10 bg-secondary text-white">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold text-accent">
              {editingId ? "Edit review" : "Add review"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={save} className="space-y-5 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Learner name" htmlFor="rv-name">
                <Input id="rv-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputClass} required />
              </Field>
              <Field label="Rating (optional)" htmlFor="rv-rating" hint="Whole number 1 to 5">
                <Input id="rv-rating" inputMode="numeric" value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Role now" htmlFor="rv-role" hint="e.g. UI/UX Designer">
                <Input id="rv-role" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Company" htmlFor="rv-company">
                <Input id="rv-company" value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} className={inputClass} />
              </Field>
            </div>

            <Field label="Quote" htmlFor="rv-quote" hint={`${draft.quote.trim().length} / 600 characters. Use the learner's own words.`}>
              <Textarea id="rv-quote" value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} className={`${inputClass} min-h-[110px]`} required />
            </Field>

            <ImageUploadField
              value={draft.image_url}
              onChange={(url) => setDraft({ ...draft, image_url: url })}
              folder="reviews"
              label="Photo (optional)"
              previewHeight="h-28"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Display order" htmlFor="rv-order" hint="Lower numbers come first">
                <Input id="rv-order" inputMode="numeric" value={draft.display_order} onChange={(e) => setDraft({ ...draft, display_order: e.target.value })} className={inputClass} />
              </Field>
              <div className="flex items-end">
                <label className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-white/80">
                  Show on the landing page
                  <Switch checked={draft.is_approved} onCheckedChange={(v) => setDraft({ ...draft, is_approved: v })} />
                </label>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="min-w-[120px] gap-2 bg-accent font-bold text-navy hover:bg-gold">
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Save review
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        onConfirm={confirmDelete}
        loading={saving}
        title="Delete review?"
        description="This removes the review for good. To only hide it, switch it to Hidden instead."
      />
    </div>
  );
};

export default ReviewsManager;
