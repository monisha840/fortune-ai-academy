import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

async function checkLeadsDefinition() {
    console.log("--- FULL LEADS DEFINITION ---");

    const res = await fetch(url + '/rest/v1/', {
        headers: { 'apikey': key }
    });

    if (res.status === 200) {
        const data = await res.json();
        const leadsDef = data.definitions.leads;
        if (leadsDef) {
            console.log("All columns in 'leads':");
            console.log(JSON.stringify(Object.keys(leadsDef.properties).sort(), null, 2));
        } else {
            console.log("❌ 'leads' definition NOT FOUND.");
        }
    } else {
        console.log("Error status:", res.status);
    }
}

checkLeadsDefinition();
