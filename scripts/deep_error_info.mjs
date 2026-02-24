import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function deepErrorInfo() {
    console.log("--- DEEP ERROR DIAGNOSTIC ---");

    // We trigger the error on purpose
    const { error } = await supabase.from('leads').insert([{
        firstName: "Test",
        lastName: "User",
        phone: "1234567890",
        status: "NEW"
    }]);

    if (error) {
        console.log("CRITICAL ERROR INFORMATION:");
        console.log("- Message:", error.message);
        console.log("- Code:", error.code);
        console.log("- Details:", error.details);
        console.log("- Hint:", error.hint);

        // Sometimes the underlying error is in the response
        try {
            console.log("- Full Response JSON:", JSON.stringify(error, null, 2));
        } catch (e) { }
    } else {
        console.log("✅ Success? That's unexpected.");
    }
}

deepErrorInfo();
