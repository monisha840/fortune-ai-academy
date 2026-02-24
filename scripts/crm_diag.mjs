import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function diagnoseInsert() {
    console.log("--- CRM INSERT DIAGNOSTIC ---");

    const payload = {
        firstName: "Diag",
        lastName: "Test",
        phone: "1234567890",
        email: "diag@test.com",
        interestedCourse: "UI/UX Design",
        branchId: "ae1ebf77-14a0-4a76-a123-11b44b4517d3",
        source: "Website Enquiry Diagnostic",
        status: "NEW",
        createdAt: new Date().toISOString()
    };

    console.log("Attempting insert with payload...");
    const { data, error } = await supabase
        .from('leads')
        .insert([payload])
        .select();

    if (error) {
        console.log("❌ Error Caught:");
        console.log(JSON.stringify(error, null, 2));
    } else {
        console.log("✅ Insert Success!");
    }
}

diagnoseInsert();
