import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUsers() {
    console.log("Checking Supabase Auth users...");
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) {
        console.error("Error listing users:", error.message);
        return;
    }

    if (users.length === 0) {
        console.log("No users found in Supabase Auth.");
    } else {
        console.log("Found users:");
        users.forEach(u => console.log(`- ${u.email}`));
    }
}

checkUsers();
