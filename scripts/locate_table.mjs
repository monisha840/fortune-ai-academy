import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function locateTable() {
    console.log("--- Locating 'leads' table ---");

    // We can't query information_schema directly with anon key usually,
    // but we can try common schema prefixes

    const schemas = ['public', 'crm', 'auth']; // unlikely auth
    for (const schema of schemas) {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .limit(1)
            .schema(schema);

        if (error) {
            console.log(`Schema '${schema}': leads NOT FOUND - ${error.message}`);
        } else {
            console.log(`Schema '${schema}': leads FOUND!`);
            return;
        }
    }
}

locateTable();
