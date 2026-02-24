import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function testCRMInsertV3() {
    console.log("Testing INSERT into CRM with VERIFIED columns...");

    // Using columns from Step 695: name, phone, email, status, source, notes, location, createdAt
    const payload = {
        name: "Sync Test User V3",
        phone: "9988776655",
        email: "syncv3@test.com",
        status: "NEW",
        source: "Website Sync Test",
        notes: "Verifying single 'name' column instead of firstName/lastName",
        location: "Coimbatore",
        createdAt: new Date().toISOString()
    };

    const { data, error } = await supabase
        .from('leads')
        .insert([payload])
        .select();

    if (error) {
        console.error("❌ CRM Sync V3 Failure:");
        console.error(JSON.stringify(error, null, 2));
    } else {
        console.log("✅ CRM Sync V3 Success!");
        console.log(JSON.stringify(data, null, 2));
    }
}

testCRMInsertV3();
