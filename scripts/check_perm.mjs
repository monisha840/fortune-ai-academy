import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function checkPermission() {
    console.log("--- Checking INSERT Permission ---");

    const { error: errorA } = await supabase.from('leads').insert([{ name: 'test' }]);
    console.log("Insert to 'leads' error:", errorA ? errorA.message : "SUCCESS!");

    const { error: errorB } = await supabase.from('non_existent_table').insert([{ name: 'test' }]);
    console.log("Insert to 'non_existent_table' error:", errorB ? errorB.message : "SUCCESS!");
}

checkPermission();
