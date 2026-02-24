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
import { Plus, Edit2, Trash2, Save, Loader2, MapPin, Building2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
    id: string;
    name: string;
    company: string;
    location: string;
    image_url: string;
    display_order: number;
}

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState<Partial<Testimonial>>({
        name: "",
        company: "",
        location: "",
        image_url: "",
        display_order: 0,
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("testimonials")
            .select("*")
            .order("display_order", { ascending: true });

        if (error) {
            toast({ variant: "destructive", title: "Error fetching testimonials", description: error.message });
        } else {
            setTestimonials(data || []);
        }
        setLoading(false);
    };

    const handleOpenDialog = (testimonial: Testimonial | null = null) => {
        if (testimonial) {
            setEditingTestimonial(testimonial);
            setFormData(testimonial);
        } else {
            setEditingTestimonial(null);
            setFormData({
                name: "",
                company: "",
                location: "",
                image_url: "",
                display_order: testimonials.length + 1,
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { id, ...dataToSave } = formData as Testimonial;

        let error;
        if (editingTestimonial) {
            const { error: updateError } = await supabase
                .from("testimonials")
                .update(dataToSave)
                .eq("id", editingTestimonial.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("testimonials")
                .insert([dataToSave]);
            error = insertError;
        }

        if (error) {
            toast({ variant: "destructive", title: "Error saving testimonial", description: error.message });
        } else {
            toast({ title: editingTestimonial ? "Testimonial updated" : "Testimonial created" });
            setIsDialogOpen(false);
            fetchTestimonials();
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        setLoading(true);
        const { error } = await supabase.from("testimonials").delete().eq("id", id);

        if (error) {
            toast({ variant: "destructive", title: "Error deleting testimonial", description: error.message });
        } else {
            toast({ title: "Testimonial deleted" });
            fetchTestimonials();
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Testimonial Management</h1>
                    <p className="text-white/40 text-sm mt-1">Manage student placement success stories</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-accent hover:bg-gold text-navy font-bold gap-2">
                    <Plus size={18} /> Add New Success Story
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
                                <TableHead className="text-white/60">Order</TableHead>
                                <TableHead className="text-white/60">Student</TableHead>
                                <TableHead className="text-white/60">Company</TableHead>
                                <TableHead className="text-white/60">Location</TableHead>
                                <TableHead className="text-white/60 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.map((student) => (
                                <TableRow key={student.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                    <TableCell className="font-mono text-white/40">{student.display_order}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border border-white/10">
                                                <AvatarImage src={student.image_url} alt={student.name} />
                                                <AvatarFallback className="bg-navy text-accent font-bold">
                                                    {student.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="font-bold text-white">{student.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-white/80">
                                            <Building2 size={14} className="text-accent" />
                                            {student.company}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-white/60">
                                            <MapPin size={14} />
                                            {student.location}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(student)} className="hover:bg-white/10 text-white/60 hover:text-white">
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(student.id)} className="hover:bg-destructive/10 text-white/40 hover:text-destructive">
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
                <DialogContent className="bg-secondary border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold font-display text-accent">
                            {editingTestimonial ? "Edit Student Record" : "Add New Student Record"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">Student Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Nithyasri V"
                                    className="bg-white/5 border-white/10 text-white pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60">Company</label>
                                <Input
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="e.g. Innovation LLP"
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60">Location</label>
                                <Input
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g. Chennai, India"
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60">Image Path / URL</label>
                                <Input
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    placeholder="e.g. /students/student7.png"
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
                            <Button type="submit" className="bg-accent hover:bg-gold text-navy font-bold gap-2 min-w-[120px]" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                {editingTestimonial ? "Update Record" : "Save Record"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminTestimonials;
