import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: error.message,
            });
            setLoading(false);
        } else {
            toast({
                title: "Welcome back!",
                description: "Successfully logged in to Admin Dashboard.",
            });
            navigate("/admin");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-navy p-4 overflow-hidden relative">
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="absolute top-8 left-8">
                <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Home</span>
                </Link>
            </div>

            <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl relative z-10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-gold" />
                <CardHeader className="space-y-1 text-center pt-8">
                    <div className="mx-auto w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-accent/20">
                        <ShieldCheck size={32} className="text-navy" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-white tracking-tight">Admin Portal</CardTitle>
                    <CardDescription className="text-white/40">Enter your credentials to manage site content</CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    <Input
                                        type="email"
                                        placeholder="admin@fortuneinnovatives.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:border-accent/50 focus:ring-accent/50 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:border-accent/50 focus:ring-accent/50 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 bg-accent hover:bg-gold text-navy font-bold text-lg rounded-xl shadow-lg shadow-accent/20 active:scale-[0.98] transition-all"
                            disabled={loading}
                        >
                            {loading ? "Authenticating..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;
