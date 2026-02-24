import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function dumpTestimonials() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*');

    if (error) {
        fs.writeFileSync('scripts/testimonial_dump.json', JSON.stringify({ error: error.message }, null, 2));
        return;
    }

    fs.writeFileSync('scripts/testimonial_dump.json', JSON.stringify(data, null, 2));
    console.log('Dumped to scripts/testimonial_dump.json');
}

dumpTestimonials();
