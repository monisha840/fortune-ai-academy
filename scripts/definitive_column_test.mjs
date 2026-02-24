import { createClient } from '@supabase/supabase-js';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

const supabase = createClient(url, key);

async function definitiveColumnTest() {
    console.log("--- DEFINITIVE COLUMN EXISTENCE TEST ---");

    const columnsToTest = ['name', 'firstName', 'lastName', 'fullName', 'studentName', 'phone', 'email'];

    for (const col of columnsToTest) {
        const { error } = await supabase.from('leads').select(col).limit(1);
        if (error) {
            if (error.message.includes("column") && error.message.includes("does not exist")) {
                console.log(`❌ Column '${col}': DOES NOT EXIST in the database.`);
            } else {
                console.log(`❓ Column '${col}': Error - ${error.message} (Code: ${error.code})`);
            }
        } else {
            console.log(`✅ Column '${col}': EXISTS in the database.`);
        }
    }
}

definitiveColumnTest();
