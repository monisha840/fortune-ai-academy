import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function finalDebug() {
    console.log("--- CRM FINAL DEBUG ---");

    // 1. Check table existence and columns again via SELECT
    const { data: cols, error: colError } = await supabase.from('leads').select('*').limit(1);

    if (colError) {
        console.error("SELECT Error:", colError.message);
    } else {
        console.log("SUCCESS: Table 'leads' exists.");
        if (cols && cols.length > 0) {
            console.log("Actual Columns in DB:", Object.keys(cols[0]));
        } else {
            console.log("Table is empty, trying to probe columns...");
        }
    }

    // 2. Try Insertion with the schema I thought it had (firstName/lastName)
    console.log("\nAttempting Insert Version A (firstName/lastName)...");
    const { error: errA } = await supabase.from('leads').insert([{
        firstName: "Test",
        lastName: "User",
        phone: "0000000000",
        email: "test@test.com",
        interestedCourse: "Full Stack",
        location: "Coimbatore",
        status: "NEW",
        source: "Website",
        createdAt: new Date().toISOString()
    }]);
    if (errA) console.error("Insert A Failed:", errA.message);
    else console.log("Insert A Success!");

    // 3. Try Insertion with the schema I saw in Step 695 (name/phone/email)
    console.log("\nAttempting Insert Version B (name/phone/email)...");
    const { error: errB } = await supabase.from('leads').insert([{
        name: "Test User",
        phone: "0000000000",
        email: "test@test.com",
        status: "NEW",
        source: "Website",
        location: "Coimbatore",
        createdAt: new Date().toISOString()
    }]);
    if (errB) console.error("Insert B Failed:", errB.message);
    else console.log("Insert B Success!");
}

finalDebug();
