import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function triggerTest() {
    console.log("--- TRIGGER TEST ---");

    // We provide partitioned names and hope a trigger fills the mandatory 'name'
    const payload = {
        firstName: "Trigger",
        lastName: "Test",
        phone: "7776665554",
        email: "trigger@test.com",
        status: "NEW",
        createdAt: new Date().toISOString()
    };

    const { error } = await supabase
        .from('leads')
        .insert([payload]);

    if (error) {
        console.error("❌ Trigger Test Failed:", error.message);
        console.error("Details:", JSON.stringify(error, null, 2));
    } else {
        console.log("✅ Trigger Test SUCCESS! The CRM automatically populated the name column.");
    }
}

triggerTest();
