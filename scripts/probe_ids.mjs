import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function probeIds() {
    console.log("--- Probing for Course & Branch IDs in CRM ---");

    const { data: courses, error: courseError } = await supabase.from('courses').select('id, title').limit(5);
    if (courseError) console.log("Courses Table Error:", courseError.message);
    else console.log("Courses Found:", JSON.stringify(courses));

    const { data: branches, error: branchError } = await supabase.from('branches').select('id, name').limit(5);
    if (branchError) console.log("Branches Table Error:", branchError.message);
    else console.log("Branches Found:", JSON.stringify(branches));
}

probeIds();
