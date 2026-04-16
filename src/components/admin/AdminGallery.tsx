import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
    Plus,
    Edit2,
    Trash2,
    Save,
    Loader2,
    Image as ImageIcon,
    Star,
} from "lucide-react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import ImageUploadField from "./ImageUploadField";

type GalleryType = "arena" | "placement";

interface GalleryItem {
    id: string;
    type: GalleryType;
    image_url: string;
    position: string | null;
    company: string | null;
    location: string | null;
    salary: string | null;
    title: string | null;
    description: string | null;
    display_order: number;
    is_featured: boolean;
    created_at?: string;
    updated_at?: string;
}

type FormState = Omit<GalleryItem, "id" | "created_at" | "updated_at">;

const emptyForm = (order: number): FormState => ({
    type: "arena",
    image_url: "",
    position: "",
    company: "",
    location: "",
    salary: "",
    title: "",
    description: "",
    display_order: order,
    is_featured: false,
});

const AdminGallery = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | GalleryType>("all");

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const [formData, setFormData] = useState<FormState>(emptyForm(0));
    const [isSaving, setIsSaving] = useState(false);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const { toast } = useToast();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        setFetchError(null);
        const { data, error } = await supabase
            .from("gallery_items")
            .select("*")
            .order("type", { ascending: true })
            .order("display_order", { ascending: true });

        if (error) {
            const missingTable = /gallery_items/.test(error.message) && /(not find|does not exist|schema cache)/i.test(error.message);
            setFetchError(
                missingTable
                    ? "The gallery_items table doesn't exist yet. Run gallery_items_migration.sql in the Supabase SQL editor to create it."
                    : error.message
            );
            toast({
                variant: "destructive",
                title: "Error fetching gallery items",
                description: error.message,
            });
        } else {
            setItems((data || []) as GalleryItem[]);
        }
        setLoading(false);
    };

    const filteredItems = useMemo(() => {
        if (filter === "all") return items;
        return items.filter((i) => i.type === filter);
    }, [items, filter]);

    const handleOpenDialog = (item: GalleryItem | null = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                type: item.type,
                image_url: item.image_url,
                position: item.position ?? "",
                company: item.company ?? "",
                location: item.location ?? "",
                salary: item.salary ?? "",
                title: item.title ?? "",
                description: item.description ?? "",
                display_order: item.display_order,
                is_featured: item.is_featured,
            });
        } else {
            setEditingItem(null);
            setFormData(emptyForm(items.length + 1));
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Normalise: empty strings become NULL for nullable columns
        const payload = {
            type: formData.type,
            image_url: formData.image_url.trim(),
            position: formData.position?.trim() || null,
            company: formData.company?.trim() || null,
            location: formData.location?.trim() || null,
            salary: formData.salary?.trim() || null,
            title: formData.title?.trim() || null,
            description: formData.description?.trim() || null,
            display_order: Number(formData.display_order) || 0,
            is_featured: Boolean(formData.is_featured),
        };

        let error;
        if (editingItem) {
            ({ error } = await supabase
                .from("gallery_items")
                .update(payload)
                .eq("id", editingItem.id));
        } else {
            ({ error } = await supabase.from("gallery_items").insert([payload]));
        }

        if (error) {
            toast({
                variant: "destructive",
                title: "Error saving gallery item",
                description: error.message,
            });
        } else {
            toast({
                title: editingItem ? "Gallery item updated" : "Gallery item created",
            });
            setIsDialogOpen(false);
            fetchItems();
        }
        setIsSaving(false);
    };

    const handleDeleteClick = (id: string) => {
        setItemToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;

        setIsSaving(true);
        const { error } = await supabase
            .from("gallery_items")
            .delete()
            .eq("id", itemToDelete);

        if (error) {
            toast({
                variant: "destructive",
                title: "Error deleting gallery item",
                description: error.message,
            });
        } else {
            toast({ title: "Gallery item deleted" });
            fetchItems();
        }
        setIsSaving(false);
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const isPlacement = formData.type === "placement";

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">
                        Gallery Management
                    </h1>
                    <p className="text-white/40 text-sm mt-1">
                        Manage Arena &amp; Placement images shown on the public gallery.
                    </p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-accent hover:bg-gold text-navy font-bold gap-2 w-full sm:w-auto"
                >
                    <Plus size={18} /> Add Gallery Item
                </Button>
            </div>

            {fetchError && (
                <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-5 py-4 text-sm">
                    <div className="font-bold text-destructive-foreground mb-1">Can't reach gallery_items table</div>
                    <p className="text-white/70">{fetchError}</p>
                    <p className="text-white/40 mt-2 text-xs">
                        File: <code className="text-accent">fortune-ai-academy/gallery_items_migration.sql</code> — paste it into Supabase → SQL Editor → Run.
                    </p>
                </div>
            )}

            {/* Filter pills */}
            <div className="flex items-center gap-2">
                {(
                    [
                        { key: "all", label: "All", count: items.length },
                        { key: "arena", label: "Arena", count: items.filter((i) => i.type === "arena").length },
                        { key: "placement", label: "Placements", count: items.filter((i) => i.type === "placement").length },
                    ] as const
                ).map((f) => {
                    const active = filter === f.key;
                    return (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                                active
                                    ? "bg-accent text-navy"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {f.label}{" "}
                            <span className={active ? "text-navy/70" : "text-white/30"}>
                                ({f.count})
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-x-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-accent" size={40} />
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="py-20 text-center text-white/40">No gallery items.</div>
                ) : (
                    <Table className="min-w-[900px]">
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="text-white/60 w-16">Order</TableHead>
                                <TableHead className="text-white/60">Image</TableHead>
                                <TableHead className="text-white/60">Type</TableHead>
                                <TableHead className="text-white/60">Position</TableHead>
                                <TableHead className="text-white/60">Company</TableHead>
                                <TableHead className="text-white/60">Location</TableHead>
                                <TableHead className="text-white/60">Salary</TableHead>
                                <TableHead className="text-white/60 text-center">Featured</TableHead>
                                <TableHead className="text-white/60 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <TableCell className="font-mono text-white/40">
                                        {item.display_order}
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-12 w-12 rounded-lg overflow-hidden border border-white/10 bg-navy flex items-center justify-center">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.title || "gallery"}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <ImageIcon size={18} className="text-white/30" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                                                item.type === "arena"
                                                    ? "bg-amber-400/10 text-amber-300 border border-amber-300/20"
                                                    : "bg-blue-400/10 text-blue-300 border border-blue-300/20"
                                            }`}
                                        >
                                            {item.type}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-white/80 font-medium max-w-[200px] truncate">
                                        {item.position || <span className="text-white/30">—</span>}
                                    </TableCell>
                                    <TableCell className="text-white/70 max-w-[180px] truncate">
                                        {item.company || <span className="text-white/30">—</span>}
                                    </TableCell>
                                    <TableCell className="text-white/60 max-w-[140px] truncate">
                                        {item.location || <span className="text-white/30">—</span>}
                                    </TableCell>
                                    <TableCell className="text-accent font-semibold">
                                        {item.salary || <span className="text-white/30">—</span>}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.is_featured ? (
                                            <Star size={16} className="inline text-accent fill-accent" />
                                        ) : (
                                            <span className="text-white/20">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenDialog(item)}
                                                className="hover:bg-white/10 text-white/60 hover:text-white"
                                            >
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteClick(item.id)}
                                                className="hover:bg-destructive/10 text-white/40 hover:text-destructive"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-secondary border-white/10 text-white max-w-xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold font-display text-accent">
                            {editingItem ? "Edit Gallery Item" : "Add Gallery Item"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-5 py-4">
                        {/* Type + display order */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60">Type</label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(v) =>
                                        setFormData({ ...formData, type: v as GalleryType })
                                    }
                                >
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-secondary border-white/10 text-white">
                                        <SelectItem value="arena">Arena</SelectItem>
                                        <SelectItem value="placement">Placement</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60">
                                    Display Order
                                </label>
                                <Input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            display_order: parseInt(e.target.value, 10) || 0,
                                        })
                                    }
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>

                        <ImageUploadField
                            value={formData.image_url}
                            onChange={(url) => setFormData({ ...formData, image_url: url })}
                            folder={formData.type}
                            label="Image"
                            required
                            previewHeight="h-40"
                        />

                        {/* Placement-only fields */}
                        {isPlacement && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-white/60">
                                        Position / Role <span className="text-destructive">*</span>
                                    </label>
                                    <Input
                                        value={formData.position ?? ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, position: e.target.value })
                                        }
                                        placeholder="e.g. UI/UX Designer"
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-white/60">
                                            Company
                                        </label>
                                        <Input
                                            value={formData.company ?? ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, company: e.target.value })
                                            }
                                            placeholder="e.g. Cloud & Clouds"
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-white/60">
                                            Location
                                        </label>
                                        <Input
                                            value={formData.location ?? ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, location: e.target.value })
                                            }
                                            placeholder="e.g. Singapore"
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-white/60">
                                        Salary (optional)
                                    </label>
                                    <Input
                                        value={formData.salary ?? ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, salary: e.target.value })
                                        }
                                        placeholder="e.g. ₹5.2 LPA"
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                </div>
                            </>
                        )}

                        {/* Title / caption — optional for both types */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">
                                {isPlacement ? "Title / Caption (optional)" : "Caption (optional)"}
                            </label>
                            <Input
                                value={formData.title ?? ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                placeholder={
                                    isPlacement
                                        ? "e.g. Tamizharasan — Class of 2025"
                                        : "e.g. Growth & Development Session"
                                }
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">
                                Description (optional)
                            </label>
                            <Textarea
                                value={formData.description ?? ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                placeholder="Additional context for the modal view"
                                className="bg-white/5 border-white/10 text-white min-h-[80px]"
                            />
                        </div>

                        {/* Featured toggle */}
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <Star
                                    size={18}
                                    className={formData.is_featured ? "text-accent fill-accent" : "text-white/30"}
                                />
                                <div>
                                    <div className="font-semibold text-white text-sm">Featured</div>
                                    <div className="text-xs text-white/40">
                                        Highlight this item on the public gallery
                                    </div>
                                </div>
                            </div>
                            <Switch
                                checked={formData.is_featured}
                                onCheckedChange={(v) =>
                                    setFormData({ ...formData, is_featured: v })
                                }
                            />
                        </div>

                        <DialogFooter className="pt-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsDialogOpen(false)}
                                className="text-white/60 hover:text-white"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-accent hover:bg-gold text-navy font-bold gap-2 min-w-[140px]"
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <Save size={18} />
                                )}
                                {editingItem ? "Update Item" : "Save Item"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirmDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                loading={isSaving}
                title="Delete Gallery Item?"
                description="Are you sure you want to delete this image? This action cannot be reverted."
            />
        </div>
    );
};

export default AdminGallery;
