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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit2, Trash2, Save, Loader2, BookOpen, Star } from "lucide-react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface Course {
    id: string;
    title: string;
    category: string;
    overview: string;
    tools: string[];
    duration: string;
    roles: string;
    salary: string;
    featured: boolean;
    display_order: number;
}

const AdminCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState<Partial<Course>>({
        title: "",
        category: "",
        overview: "",
        tools: [],
        duration: "",
        roles: "",
        salary: "",
        featured: false,
        display_order: 0,
    });

    const [toolsString, setToolsString] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("courses")
            .select("*")
            .order("display_order", { ascending: true });

        if (error) {
            toast({ variant: "destructive", title: "Error fetching courses", description: error.message });
        } else {
            setCourses(data || []);
        }
        setLoading(false);
    };

    const handleOpenDialog = (course: Course | null = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData(course);
            setToolsString(course.tools.join(", "));
        } else {
            setEditingCourse(null);
            setFormData({
                title: "",
                category: "",
                overview: "",
                tools: [],
                duration: "",
                roles: "",
                salary: "",
                featured: false,
                display_order: courses.length + 1,
            });
            setToolsString("");
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const dataToSave = {
            ...formData,
            tools: toolsString.split(",").map(t => t.trim()).filter(t => t !== ""),
        };

        // Remove ID if it's there
        const { id, ...savePayload } = dataToSave as Course;

        let error;
        if (editingCourse) {
            const { error: updateError } = await supabase
                .from("courses")
                .update(savePayload)
                .eq("id", editingCourse.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("courses")
                .insert([savePayload]);
            error = insertError;
        }

        if (error) {
            toast({ variant: "destructive", title: "Error saving course", description: error.message });
        } else {
            toast({ title: editingCourse ? "Course updated" : "Course created" });
            setIsDialogOpen(false);
            fetchCourses();
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
        const { error } = await supabase.from("courses").delete().eq("id", itemToDelete);

        if (error) {
            toast({ variant: "destructive", title: "Error deleting course", description: error.message });
        } else {
            toast({ title: "Course deleted" });
            fetchCourses();
        }
        setIsSaving(false);
        setIsDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Course Management</h1>
                    <p className="text-white/40 text-sm mt-1">Manage active programs and curriculum details</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-accent hover:bg-gold text-navy font-bold gap-2">
                    <Plus size={18} /> Add New Course
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
                                <TableHead className="text-white/60">Title</TableHead>
                                <TableHead className="text-white/60">Category</TableHead>
                                <TableHead className="text-white/60">Duration</TableHead>
                                <TableHead className="text-white/60">Salary</TableHead>
                                <TableHead className="text-white/60 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-white/20">
                                        No courses found. Add your first course to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                courses.map((course) => (
                                    <TableRow key={course.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                        <TableCell className="font-mono text-white/40">{course.display_order}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-white">{course.title}</span>
                                                {course.featured && <Star size={14} className="text-accent fill-accent" />}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-white/60">{course.category}</TableCell>
                                        <TableCell className="text-white/60">{course.duration}</TableCell>
                                        <TableCell className="text-accent font-semibold">{course.salary}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(course)} className="hover:bg-white/10 text-white/60 hover:text-white">
                                                    <Edit2 size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(course.id)} className="hover:bg-destructive/10 text-white/40 hover:text-destructive">
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
                <DialogContent className="bg-secondary border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold font-display text-accent">
                            {editingCourse ? "Edit Course" : "Add New Course"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">Full Title</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. UI/UX Design"
                                className="bg-white/5 border-white/10 text-white"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60">Category</label>
                                <Input
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g. Design"
                                    className="bg-white/5 border-white/10 text-white"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60">Duration</label>
                                <Input
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    placeholder="e.g. 4 Months"
                                    className="bg-white/5 border-white/10 text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60">Salary Range</label>
                                <Input
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    placeholder="e.g. ₹5–12 LPA"
                                    className="bg-white/5 border-white/10 text-white"
                                    required
                                />
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
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">Overview</label>
                            <Textarea
                                value={formData.overview}
                                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                                placeholder="Brief description of the course..."
                                className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">Tools (comma separated)</label>
                            <Input
                                value={toolsString}
                                onChange={(e) => setToolsString(e.target.value)}
                                placeholder="Figma, Adobe XD, Illustrator"
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60">Target Roles</label>
                            <Input
                                value={formData.roles}
                                onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
                                placeholder="UI Designer, UX Designer, Product Designer"
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>

                        <div className="flex items-center space-x-2 bg-white/5 p-4 rounded-xl border border-white/10">
                            <Checkbox
                                id="featured"
                                checked={formData.featured}
                                onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                                className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:text-navy"
                            />
                            <label
                                htmlFor="featured"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white/80"
                            >
                                Feature this course on home page
                            </label>
                        </div>

                        <DialogFooter className="pt-6">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-white/60 hover:text-white">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-accent hover:bg-gold text-navy font-bold gap-2 min-w-[120px]" disabled={isSaving}>
                                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                {editingCourse ? "Update Course" : "Save Course"}
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
                title="Delete Course?"
                description="Are you sure you want to delete this course? This action cannot be undone."
            />
        </div >
    );
};

export default AdminCourses;
