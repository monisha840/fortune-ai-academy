import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function goldSyncTest() {
    console.log("--- GOLD SYNC TEST ---");

    // Only verified columns from Step 917 and 942
    const payload = {
        name: "Gold Success Test",
        firstName: "Gold",
        lastName: "Success",
        phone: "1234567891",
        email: "gold@success.com",
        status: "NEW",
        createdAt: new Date().toISOString()
    };

    const { error } = await supabase
        .from('leads')
        .insert([payload]);

    if (error) {
        console.error("❌ Gold Sync Failed:", error.message);
        console.error("Details:", JSON.stringify(error, null, 2));
    } else {
        console.log("✅ Gold Sync SUCCESS! The lead is now in the CRM Supabase.");
    }
}

goldSyncTest();
