import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSchema() {
    console.log('Fetching one testimonial row...');
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    if (data && data.length > 0) {
        const row = data[0];
        console.log('Full Row Keys:', Object.keys(row));
        console.log('Sample Row Data:', JSON.stringify(row, null, 2));

        for (const key of Object.keys(row)) {
            console.log(`Column: ${key}, Type: ${typeof row[key]}, Value: ${row[key]}`);
        }
    } else {
        console.log('No testimonials found.');
    }
}

inspectSchema();
