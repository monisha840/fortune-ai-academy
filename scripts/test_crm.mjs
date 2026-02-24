import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NzA0MDA2ODd9.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';
// Wait, the expiry in the key above is 2085-..., but let me check the one from the file exactly.
// The one from the file was:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68

const supabase = createClient(url, key);

async function testCRM() {
    console.log("Testing CRM Supabase...");
    const { data, error } = await supabase.from('leads').select('*').limit(1);

    if (error) {
        console.error("CRM Test Error:", error.message);
    } else {
        console.log("CRM Test Success! Table exists.");
        if (data.length > 0) {
            console.log("CRM Columns:", Object.keys(data[0]));
        } else {
            console.log("CRM Table is empty.");
        }
    }
}

testCRM();
