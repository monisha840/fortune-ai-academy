import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// CRM Supabase details from the user's .env
const crmUrl = process.env.VITE_CRM_SUPABASE_URL;
const crmKey = process.env.VITE_CRM_SUPABASE_ANON_KEY;

const crmSupabase = createClient(crmUrl, crmKey);

const branchIdMap = {
    "Erode": "ae1ebf77-14a0-4a76-a123-11b44b4517d3",
    "Coimbatore": "f0feca6f-a037-43e2-9407-8175a234fc46",
    "Salem": "1e736840-e93c-4259-8fd7-c24c28b14413",
    "Tiruppur": "738587cc-6f2c-4f03-a386-4c3a376f4cc0"
};

async function verifySync() {
    console.log("--- VERIFYING CRM SYNC ---");

    const testLead = {
        firstName: "Sync",
        lastName: "Verification",
        phone: "0000000000",
        email: "sync@verification.com",
        interestedCourse: "UI/UX Design",
        branchId: branchIdMap["Erode"], //ae1ebf77-14a0-4a76-a123-11b44b4517d3
        source: "Website enquiry sync test",
        status: "NEW",
        createdAt: new Date().toISOString()
    };

    console.log("Inserting test lead into CRM...");
    const { data, error } = await crmSupabase
        .from("leads")
        .insert([testLead])
        .select();

    if (error) {
        console.error("❌ Sync Verification FAILED:", error.message);
        console.error("Details:", JSON.stringify(error, null, 2));
    } else {
        console.log("✅ Sync Verification SUCCESS!");
        console.log("Inserted Data:", JSON.stringify(data, null, 2));
    }
}

verifySync();
