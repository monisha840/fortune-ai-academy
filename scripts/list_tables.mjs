import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function listAllTables() {
    console.log("--- Listing All Tables in CRM Supabase ---");

    // Unfortunately we can't easily list tables with anon key if they are hidden
    // but we can try to RPC or just try common names

    const tablesToTry = ['leads', 'enquiries', 'enquiry', 'applications', 'applicants', 'students', 'lead'];

    for (const table of tablesToTry) {
        const { data, error } = await supabase.from(table).select('*').limit(1);
        if (error) {
            console.log(`Table '${table}': ERROR - ${error.message}`);
        } else {
            console.log(`Table '${table}': EXISTS!`);
            if (data && data.length > 0) {
                console.log(`  Columns: ${Object.keys(data[0]).join(', ')}`);
            } else {
                console.log(`  (Table is empty)`);
            }
        }
    }
}

listAllTables();
