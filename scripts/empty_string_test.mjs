import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function emptyStringTest() {
    console.log("--- EMPTY STRING NAME TEST ---");

    const payload = {
        name: "", // Try empty string
        firstName: "Empty",
        lastName: "String",
        phone: "5554443332",
        status: "NEW",
        createdAt: new Date().toISOString()
    };

    const { error } = await supabase
        .from('leads')
        .insert([payload]);

    if (error) {
        console.error("❌ Test Failed:", error.message);
    } else {
        console.log("✅ SUCCESS! Empty string worked.");
    }
}

emptyStringTest();
