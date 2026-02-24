import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Save, Loader2, Building2, Globe, Image as ImageIcon } from "lucide-react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface HiringPartner {
    id: string;
    name: string;
    logo_url: string;
    website_url: string;
    display_order: number;
}

const AdminHiringPartners = () => {
    const [partners, setPartners] = useState<HiringPartner[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState<HiringPartner | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState<Partial<HiringPartner>>({
        name: "",
        logo_url: "",
        website_url: "",
        display_order: 0,
    });

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("hiring_partners")
            .select("*")
            .order("display_order", { ascending: true });

        if (error) {
            toast({ variant: "destructive", title: "Error fetching partners", description: error.message });
        } else {
            setPartners(data || []);
        }
        setLoading(false);
    };

    const handleOpenDialog = (partner: HiringPartner | null = null) => {
        if (partner) {
            setEditingPartner(partner);
            setFormData(partner);
        } else {
            setEditingPartner(null);
            setFormData({
                name: "",
                logo_url: "",
                website_url: "",
                display_order: partners.length + 1,
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const { id, ...dataToSave } = formData as HiringPartner;

        let error;
        if (editingPartner) {
            const { error: updateError } = await supabase
                .from("hiring_partners")
                .update(dataToSave)
                .eq("id", editingPartner.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("hiring_partners")
                .insert([dataToSave]);
            error = insertError;
        }

        if (error) {
            toast({ variant: "destructive", title: "Error saving partner", description: error.message });
        } else {
            toast({ title: editingPartner ? "Partner updated" : "Partner created" });
            setIsDialogOpen(false);
            fetchPartners();
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
        const { error } = await supabase.from("hiring_partners").delete().eq("id", itemToDelete);

        if (error) {
            toast({ variant: "destructive", title: "Error deleting partner", description: error.message });
        } else {
            toast({ title: "Partner removed" });
            fetchPartners();
        }
        setIsSaving(false);
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
    };


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Hiring Partners</h1>
                    <p className="text-white/40 text-sm mt-1">Manage partner companies and their logos</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-accent hover:bg-gold text-navy font-bold gap-2">
                    <Plus size={18} /> Add New Partner
                </Button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                {loading && !isDialogOpen ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-accent" size={40} />
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="text-white/60 w-20">Order</TableHead>
                                <TableHead className="text-white/60">Partner</TableHead>
                                <TableHead className="text-white/60">Logo URL</TableHead>
                                <TableHead className="text-white/60">Website</TableHead>
                                <TableHead className="text-white/60 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {partners.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-white/20">
                                        No hiring partners found. Add your first partner to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                partners.map((partner) => (
                                    <TableRow key={partner.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                        <TableCell className="font-mono text-white/40">{partner.display_order}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {partner.logo_url && (
                                                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center p-1 overflow-hidden">
                                                        <img src={partner.logo_url} alt={partner.name} className="max-w-full max-h-full object-contain" />
                                                    </div>
                                                )}
                                                <span className="font-bold text-white">{partner.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-white/40 max-w-[200px] truncate font-mono text-xs">
                                            {partner.logo_url}
                                        </TableCell>
                                        <TableCell className="text-white/60 truncate max-w-[200px]">
                                            {partner.website_url ? (
                                                <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent underline inline-flex items-center gap-1">
                                                    {partner.website_url} <Globe size={10} />
                                                </a>
                                            ) : "-"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(partner)} className="hover:bg-white/10 text-white/60 hover:text-white">
                                                    <Edit2 size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(partner.id)} className="hover:bg-destructive/10 text-white/40 hover:text-destructive">
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-secondary border-white/10 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold font-display text-accent">
                            {editingPartner ? "Edit Partner" : "Add New Partner"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Building2 size={14} /> Company Name
                                </label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Google"
                                    className="bg-white/5 border-white/10 text-white"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <ImageIcon size={14} /> Logo URL
                                </label>
                                <Input
                                    value={formData.logo_url}
                                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                    placeholder="https://example.com/logo.png"
                                    className="bg-white/5 border-white/10 text-white"
                                />
                                <p className="text-[10px] text-white/30">Provide a direct URL to a transparent PNG/SVG logo</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Globe size={14} /> Website URL (Optional)
                                </label>
                                <Input
                                    value={formData.website_url}
                                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                    placeholder="https://google.com"
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60">Display Order</label>
                                <Input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>

                        <DialogFooter className="pt-6">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-white/60 hover:text-white">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-accent hover:bg-gold text-navy font-bold gap-2 min-w-[120px]" disabled={isSaving}>
                                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                {editingPartner ? "Update Partner" : "Save Partner"}
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
                title="Remove Hiring Partner?"
                description="Are you sure you want to remove this partner from your list? This will update the website immediately."
            />
        </div>
    );
};

export default AdminHiringPartners;
