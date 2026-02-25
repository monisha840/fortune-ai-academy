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
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Phone } from "lucide-react";

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    course: string;
    branch: string;
    created_at: string;
}

const AdminLeads = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("leads")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            toast({ variant: "destructive", title: "Error fetching leads", description: error.message });
        } else {
            setLeads(data || []);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Lead Management</h1>
                    <p className="text-white/40 text-sm mt-1">Track and manage business enquiries</p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-x-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-accent" size={40} />
                    </div>
                ) : (
                    <Table className="min-w-[800px]">
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="text-white/60">Date</TableHead>
                                <TableHead className="text-white/60">Lead Name</TableHead>
                                <TableHead className="text-white/60">Contacts</TableHead>
                                <TableHead className="text-white/60">Course & Branch</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-12 text-white/20">
                                        No leads found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                leads.map((lead) => (
                                    <TableRow key={lead.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                        <TableCell className="text-white/40 text-xs">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-bold text-white uppercase text-xs">{lead.name}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold">
                                                    <Mail size={12} className="text-accent/60" />
                                                    {lead.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold">
                                                    <Phone size={12} className="text-accent/60" />
                                                    {lead.phone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-white/80 text-xs font-semibold">{lead.course}</div>
                                            <div className="text-accent text-[10px] font-bold">{lead.branch}</div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
};

export default AdminLeads;
