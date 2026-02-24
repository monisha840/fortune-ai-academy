import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const check = async () => {
    console.log('Checking faqs table...');
    const { data, error } = await supabase.from('faqs').select('*').limit(1);

    if (error) {
        console.error('Error selecting from faqs:', error);
        if (error.message.includes('does not exist')) {
            console.log('Table "faqs" does not exist.');
        }
    } else {
        console.log('Table "faqs" exists. Columns found:', Object.keys(data[0] || {}).join(', '));
        console.log('Sample data:', data);
    }
};

check();
