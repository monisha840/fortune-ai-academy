import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function minimalInsert() {
    console.log("--- CRM MINIMAL INSERT TEST ---");

    // Using columns we KNOW exist: name, phone, email
    const payload = {
        name: "Minimal Test",
        phone: "1112223334",
        email: "minimal@test.com",
        status: "NEW",
        source: "Sync Debug",
        createdAt: new Date().toISOString()
    };

    const { data, error } = await supabase
        .from('leads')
        .insert([payload])
        .select();

    if (error) {
        console.error("❌ Minimal Insert Failed:", error.message);
        console.error("Details:", JSON.stringify(error, null, 2));
    } else {
        console.log("✅ Minimal Insert Success!");
        console.log(JSON.stringify(data, null, 2));
    }
}

minimalInsert();
