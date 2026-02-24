import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAnonInsert() {
    console.log('Testing "leads" insertion with ANON key (Schema 2)...');

    const testLead = {
        name: "Test User",
        phone: "1234567890",
        email: "test@example.com",
        course: "UI/UX Design",
        branch: "Coimbatore",
        created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
        .from('leads')
        .insert([testLead]);

    if (error) {
        console.error('Insert failed with ANON key:', error.message);
        console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
        console.log('✅ Insert successful with ANON key!');
    }
}

testAnonInsert();
