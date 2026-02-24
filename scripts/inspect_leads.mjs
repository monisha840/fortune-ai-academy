import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function inspectLeads() {
    console.log("--- INSPECTING EXISTING LEADS ---");
    const { data, error } = await supabase.from('leads').select('id, branchId, phone').limit(5);
    if (error) {
        console.error("Error fetching leads:", error.message);
    } else {
        console.log("Existing Leads:", JSON.stringify(data, null, 2));
    }
}

inspectLeads();
