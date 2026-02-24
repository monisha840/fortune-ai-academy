import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function testPayload() {
    console.log("--- DEBUGGING EXACT PAYLOAD ---");

    const branchIdMap = {
        "Erode": "ae1ebf77-14a0-4a76-a123-11b44b4517d3",
        "Coimbatore": "f0feca6f-a037-43e2-9407-8175a234fc46",
        "Salem": "1e736840-e93c-4259-8fd7-c24c28b14413",
        "Tiruppur": "738587cc-6f2c-4f03-a386-4c3a376f4cc0"
    };

    const payload = {
        id: crypto.randomUUID(),
        firstName: "Debug",
        lastName: "Payload",
        phone: "5555555555",
        email: "debug@payload.com",
        interestedCourse: "UI/UX Design",
        branchId: branchIdMap["Erode"],
        source: "Website Enquiry",
        status: "NEW"
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));

    const { data, error } = await supabase
        .from('leads')
        .insert([payload])
        .select();

    if (error) {
        console.log("❌ Sync Error caught in script:");
        console.log("Message:", error.message);
        console.log("Details:", error.details);
        console.log("Hint:", error.hint);
        console.log("Code:", error.code);
    } else {
        console.log("✅ Sync Success in script!");
        console.log(data);
    }
}

testPayload();
