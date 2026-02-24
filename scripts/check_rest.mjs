import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function checkRest() {
    console.log("--- REST API CHECK ---");

    // Check root API info
    const res = await fetch(url + '/rest/v1/', {
        headers: { 'apikey': key }
    });
    console.log("Root API Status:", res.status);
    if (res.status === 200) {
        const data = await res.json();
        console.log("Exposed Tables:", Object.keys(data.definitions || {}).join(', '));
    } else {
        console.log("Could not fetch API definitions.");
    }
}

checkRest();
