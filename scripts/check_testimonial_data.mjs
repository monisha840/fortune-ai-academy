import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTestimonials() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .ilike('name', '%Monisha%');

    if (error) {
        console.error('Error fetching testimonials:', error);
        return;
    }

    console.log('Results for Monisha:');
    console.log(JSON.stringify(data, null, 2));
}

checkTestimonials();
