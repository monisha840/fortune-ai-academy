import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function columnProbe() {
    console.log("--- COLUMN PROBE ---");

    const columns = ['name', 'firstName', 'lastName', 'phone', 'email', 'status', 'createdAt', 'branchId'];

    for (const col of columns) {
        const payload = { [col]: col === 'branchId' ? 1 : "test" };
        if (col === 'createdAt') payload[col] = new Date().toISOString();

        const { error } = await supabase.from('leads').insert([payload]);

        if (error && error.code === 'PGRST204') {
            console.log(`❌ Column '${col}': BREAKS SCHEMA CACHE`);
        } else if (error) {
            console.log(`✅ Column '${col}': TABLE FOUND (Error: ${error.message})`);
        } else {
            console.log(`✅ Column '${col}': SUCCESS!`);
        }
    }
}

columnProbe();
