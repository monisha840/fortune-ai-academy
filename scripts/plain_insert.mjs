import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function plainInsert() {
    console.log("--- Testing PLAIN INSERT (No Select) ---");

    const payload = {
        name: "Plain Test",
        phone: "0000000000",
        email: "plain@test.com",
        status: "NEW",
        source: "Debug",
        createdAt: new Date().toISOString()
    };

    const { error } = await supabase
        .from('leads')
        .insert([payload]); // No .select()

    if (error) {
        console.error("❌ Plain Insert Failed:", error.message);
    } else {
        console.log("✅ Plain Insert Success!");
    }
}

plainInsert();
