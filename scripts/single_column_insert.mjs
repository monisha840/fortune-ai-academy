import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function singleColumnInsert() {
    console.log("--- SINGLE COLUMN INSERT TEST ---");

    // Most permissive possible insert
    const { data, error } = await supabase
        .from('leads')
        .insert([{ firstName: "Test" }])
        .select();

    if (error) {
        console.error("❌ Single Column Insert Failed:", error.message);
        console.error("Details:", JSON.stringify(error, null, 2));
    } else {
        console.log("✅ Single Column Insert Success!");
        console.log(JSON.stringify(data, null, 2));
    }
}

singleColumnInsert();
