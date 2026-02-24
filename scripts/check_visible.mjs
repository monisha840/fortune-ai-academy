import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function checkVisibleTables() {
    console.log("--- Checking Visible Tables via API ---");

    // Attempting a hacky way to see what's in the schema cache
    const { data, error } = await supabase.rpc('get_service_status'); // Just to see if rpc works

    // Try to select from a non-existent table to get the error message which often lists schema info
    const { error: err } = await supabase.from('random_table_name_to_force_error').select('*');
    if (err) {
        console.log("Forced Error Message:", err.message);
    }

    // List of common tables to try again post-reload
    const tables = ['leads', 'courses', 'branches'];
    for (const t of tables) {
        const { data: d, error: e } = await supabase.from(t).select('*').limit(1);
        if (e) {
            console.log(`Table '${t}': MISSING - ${e.message}`);
        } else {
            console.log(`Table '${t}': VISIBLE!`);
        }
    }
}

checkVisibleTables();
