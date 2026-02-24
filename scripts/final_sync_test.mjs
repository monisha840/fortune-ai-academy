import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function finalSyncTest() {
    console.log("--- FINAL SYNC TEST ---");

    // We try to satisfy EVERY column we've seen
    const payload = {
        name: "Final Sync Test",
        firstName: "Final",
        lastName: "Sync",
        phone: "1234567890",
        email: "final@sync.com",
        status: "NEW",
        source: "Website Sync",
        location: "Coimbatore",
        createdAt: new Date().toISOString()
    };

    const { error } = await supabase
        .from('leads')
        .insert([payload]);

    if (error) {
        console.error("❌ Sync Failed:", error.message);
        console.error("Details:", JSON.stringify(error, null, 2));
    } else {
        console.log("✅ Sync Success! The lead is now in the CRM Supabase.");
    }
}

finalSyncTest();
