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
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Save, Loader2, HelpCircle } from "lucide-react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    status: string;
    display_order: number;
}

const AdminFAQs = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState<Partial<FAQ>>({
        question: "",
        answer: "",
        status: "published",
        display_order: 0,
    });

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("faqs")
            .select("*")
            .order("display_order", { ascending: true });

        if (error) {
            toast({ variant: "destructive", title: "Error fetching FAQs", description: error.message });
        } else {
            setFaqs(data || []);
        }
        setLoading(false);
    };

    const handleOpenDialog = (faq: FAQ | null = null) => {
        if (faq) {
            setEditingFaq(faq);
            setFormData(faq);
        } else {
            setEditingFaq(null);
            setFormData({
                question: "",
                answer: "",
                status: "published",
                display_order: faqs.length + 1,
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const { id, ...dataToSave } = formData as FAQ;

        let error;
        if (editingFaq) {
            const { error: updateError } = await supabase
                .from("faqs")
                .update(dataToSave)
                .eq("id", editingFaq.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("faqs")
                .insert([dataToSave]);
            error = insertError;
        }

        if (error) {
            toast({ variant: "destructive", title: "Error saving FAQ", description: error.message });
        } else {
            toast({ title: editingFaq ? "FAQ updated" : "FAQ created" });
            setIsDialogOpen(false);
            fetchFaqs();
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
        const { error } = await supabase.from("faqs").delete().eq("id", itemToDelete);

        if (error) {
            toast({ variant: "destructive", title: "Error deleting FAQ", description: error.message });
        } else {
            toast({ title: "FAQ deleted" });
            fetchFaqs();
        }
        setIsSaving(false);
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
    };


    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">FAQ Management</h1>
                    <p className="text-white/40 text-sm mt-1">Manage frequently asked questions and answers</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-accent hover:bg-gold text-navy font-bold gap-2 w-full sm:w-auto">
                    <Plus size={18} /> Add New FAQ
                </Button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-x-auto">
                {loading && !isDialogOpen ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-accent" size={40} />
                    </div>
                ) : (
                    <Table className="min-w-[600px]">
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="text-white/60 w-20">Order</TableHead>
                                <TableHead className="text-white/60">Question</TableHead>
                                <TableHead className="text-white/60">Status</TableHead>
                                <TableHead className="text-white/60 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {faqs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-12 text-white/20">
                                        No FAQs found. Add your first FAQ to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                faqs.map((faq) => (
                                    <TableRow key={faq.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                        <TableCell className="font-mono text-white/40">{faq.display_order}</TableCell>
                                        <TableCell>
                                            <div className="font-bold text-white max-w-md truncate">{faq.question}</div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${faq.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                {faq.status || 'draft'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(faq)} className="hover:bg-white/10 text-white/60 hover:text-white">
                                                    <Edit2 size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(faq.id)} className="hover:bg-destructive/10 text-white/40 hover:text-destructive">
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
                <DialogContent className="bg-secondary border-white/10 text-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold font-display text-accent">
                            {editingFaq ? "Edit FAQ" : "Add New FAQ"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">Question</label>
                            <Input
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                placeholder="e.g. What are the prerequisites for the course?"
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">Answer</label>
                            <Textarea
                                value={formData.answer}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                placeholder="Provide a detailed answer..."
                                className="bg-white/5 border-white/10 text-white min-h-[150px]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white"
                            >
                                <option value="published" className="bg-secondary">Published</option>
                                <option value="draft" className="bg-secondary">Draft</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">Display Order</label>
                            <Input
                                type="number"
                                value={formData.display_order}
                                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>

                        <DialogFooter className="pt-6">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-white/60 hover:text-white">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-accent hover:bg-gold text-navy font-bold gap-2 min-w-[120px]" disabled={isSaving}>
                                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                {editingFaq ? "Update FAQ" : "Save FAQ"}
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
                title="Delete FAQ?"
                description="Are you sure you want to delete this FAQ? It will be removed from the website immediately."
            />
        </div>
    );
};

export default AdminFAQs;
