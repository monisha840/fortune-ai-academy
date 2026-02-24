import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
    console.log("Creating administrative user...");

    const email = 'admin@fortuneinnovatives.com';
    const password = 'AdminPassword123!'; // User should change this later

    const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true
    });

    if (error) {
        console.error("❌ Error creating admin:", error.message);
    } else {
        console.log("✅ Admin user created successfully!");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log("\nIMPORTANT: Please login with these credentials and change your password immediately.");
    }
}

createAdmin();
