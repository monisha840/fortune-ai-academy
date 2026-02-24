import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function getBranches() {
    console.log("--- FETCHING BRANCHES ---");
    const { data, error } = await supabase.from('branches').select('*');
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Branches:", JSON.stringify(data, null, 2));
    }
}

getBranches();
