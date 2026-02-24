import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function checkNullability() {
    console.log("--- Checking Column Nullability ---");

    // We try to insert an empty object to see which column fails first
    const { error: err } = await supabase.from('leads').insert([{}]);

    if (err) {
        console.log("Error:", err.message);
        console.log("Full Error Code:", err.code);
    } else {
        console.log("SUCCESS: Minimal insert worked!");
    }
}

checkNullability();
