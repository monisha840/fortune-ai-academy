import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTestimonials() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('name, image_url, company')
        .ilike('name', '%Monisha%');

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    if (data) {
        data.forEach(t => {
            console.log(`Name: ${t.name}`);
            console.log(`Image URL: ${t.image_url}`);
            console.log(`Company: ${t.company}`);
            console.log('---');
        });
    }
}

checkTestimonials();
