import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function listColumns() {
    console.log("--- Listing ALL Columns for 'leads' ---");

    const { data, error } = await supabase.from('leads').select('*').limit(1);

    if (error) {
        console.error("Error:", error.message);
    } else {
        if (data && data.length > 0) {
            console.log("Columns:", Object.keys(data[0]));
        } else {
            console.log("Table is empty. Trying to guess columns...");
            // Probe common columns
            const probe = ['id', 'name', 'firstName', 'lastName', 'phone', 'email', 'courseId', 'branchId', 'createdAt', 'status'];
            for (const p of probe) {
                const { error: e } = await supabase.from('leads').select(p).limit(1);
                if (!e) console.log(`Present: ${p}`);
            }
        }
    }
}

listColumns();
