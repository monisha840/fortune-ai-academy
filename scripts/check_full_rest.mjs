import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

async function checkFullRest() {
    console.log("--- FULL REST API CHECK ---");

    const res = await fetch(url + '/rest/v1/', {
        headers: { 'apikey': key }
    });

    if (res.status === 200) {
        const data = await res.json();
        const tables = Object.keys(data.definitions || {});
        console.log("Total Tables:", tables.length);
        console.log("Tables List:", tables.sort().join(', '));

        if (tables.includes('leads')) {
            console.log("✅ 'leads' is in the definitions!");
        } else {
            console.log("❌ 'leads' is NOT in the definitions!");
        }
    } else {
        console.log("Error status:", res.status);
    }
}

checkFullRest();
