import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Briefcase,
    LogOut,
    Menu,
    X,
    ExternalLink,
    ChevronRight,
    HelpCircle,
    UserCheck
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import AdminCourses from "@/components/admin/AdminCourses";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminHiringPartners from "@/components/admin/AdminHiringPartners";
import AdminLeads from "@/components/admin/AdminLeads";

// Placeholder components for sections
const AdminOverview = () => {
    const [stats, setStats] = useState({ courses: 0, testimonials: 0, partners: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const [courses, testimonials, partners] = await Promise.all([
                supabase.from('courses').select('*', { count: 'exact', head: true }),
                supabase.from('testimonials').select('*', { count: 'exact', head: true }),
                supabase.from('hiring_partners').select('*', { count: 'exact', head: true }),
            ]);

            setStats({
                courses: courses.count || 0,
                testimonials: testimonials.count || 0,
                partners: partners.count || 0,
            });
            setLoading(false);
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold font-display text-white">Dashboard Overview</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { label: "Active Courses", count: stats.courses, icon: BookOpen, color: "text-blue-400", path: "/admin/courses" },
                    { label: "Placed Students", count: stats.testimonials, icon: Users, color: "text-green-400", path: "/admin/testimonials" },
                    { label: "Hiring Partners", count: stats.partners, icon: Briefcase, color: "text-amber-400", path: "/admin/partners" },
                ].map((stat) => (
                    <Link
                        key={stat.label}
                        to={stat.path}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-accent/30 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon className={stat.color} size={24} />
                            <span className="text-white/20 text-xs font-bold uppercase tracking-wider">Manage</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {loading ? "..." : stat.count}
                        </div>
                        <div className="text-white/40 text-sm">{stat.label}</div>
                    </Link>
                ))}
            </div>
            <div className="bg-accent/10 border border-accent/20 p-8 rounded-3xl relative overflow-hidden group">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome to your CMS</h2>
                    <p className="text-white/60 mb-6 max-w-lg">
                        You can now manage all your website content from one central place. Changes you make here will be reflected on the live site instantly.
                    </p>
                    <Link to="/" target="_blank" className="inline-flex items-center gap-2 text-accent font-bold hover:underline">
                        View Live Site <ExternalLink size={16} />
                    </Link>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all" />
            </div>
        </div>
    );
};

const Admin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
    };

    const navItems = [
        { label: "Overview", icon: LayoutDashboard, path: "/admin" },
        { label: "Courses", icon: BookOpen, path: "/admin/courses" },
        { label: "Testimonials", icon: Users, path: "/admin/testimonials" },
        { label: "Hiring Partners", icon: Briefcase, path: "/admin/partners" },
        { label: "Leads", icon: UserCheck, path: "/admin/leads" },
    ];

    return (
        <div className="min-h-screen bg-navy text-white flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-navy/50 backdrop-blur-lg">
                <div className="font-display font-black text-xl text-gradient-gold">FORTUNE ADMIN</div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
        fixed inset-0 z-50 md:relative md:flex flex-col w-72 bg-secondary border-r border-white/10 transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
                <div className="p-8 pb-4 hidden md:block">
                    <div className="font-display font-black text-2xl text-gradient-gold tracking-tight">FORTUNE</div>
                    <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Admin Dashboard</p>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => { if (window.innerWidth < 768) setIsSidebarOpen(false); }}
                            className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/5 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className="text-white/40 group-hover:text-accent transition-colors" />
                                <span className="font-semibold text-white/80 group-hover:text-white">{item.label}</span>
                            </div>
                            <ChevronRight size={14} className="text-white/10 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-destructive/10 text-destructive-foreground transition-colors group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <ScrollArea className="flex-1 p-6 md:p-12">
                    <div className="max-w-5xl mx-auto">
                        <Routes>
                            <Route index element={<AdminOverview />} />
                            <Route path="courses" element={<AdminCourses />} />
                            <Route path="testimonials" element={<AdminTestimonials />} />
                            <Route path="partners" element={<AdminHiringPartners />} />
                            <Route path="leads" element={<AdminLeads />} />
                        </Routes>
                    </div>
                </ScrollArea>
            </main>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Admin;
