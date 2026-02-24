import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function listAll() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('name, display_order')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    console.log('--- ALL TESTIMONIALS ---');
    data.forEach(t => console.log(`${t.display_order}: ${t.name}`));
}

listAll();
