import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_CRM_SUPABASE_URL;
const key = process.env.VITE_CRM_SUPABASE_ANON_KEY;

if (!url || !key) {
    console.error("Missing VITE_CRM_SUPABASE_URL or VITE_CRM_SUPABASE_ANON_KEY");
    process.exit(1);
}

const supabase = createClient(url, key);

async function testCRMInsert() {
    console.log("Testing LIVE INSERT into CRM Supabase...");

    const payload = {
        firstName: "Sync",
        lastName: "Test",
        phone: "9998887776",
        email: "sync@test.com",
        interestedCourse: "UI/UX Design",
        location: "Erode",
        notes: "Real-time sync debug test",
        source: "Debug Script",
        status: "NEW",
        createdAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
        .from('leads')
        .insert([payload])
        .select();

    if (error) {
        console.error("❌ CRM Sync Failure Error:");
        console.error(JSON.stringify(error, null, 2));
    } else {
        console.log("✅ CRM Sync Success!");
        console.log(JSON.stringify(data, null, 2));
    }
}

testCRMInsert();
