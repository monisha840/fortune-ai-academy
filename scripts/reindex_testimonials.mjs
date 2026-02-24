import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function reindexTestimonials() {
    console.log('Fetching testimonials...');
    const { data: testimonials, error: fetchError } = await supabase
        .from('testimonials')
        .select('id, name, display_order')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

    if (fetchError) {
        console.error('Error fetching testimonials:', fetchError.message);
        return;
    }

    console.log(`Found ${testimonials.length} testimonials. Re-indexing...`);

    for (let i = 0; i < testimonials.length; i++) {
        const newOrder = i + 1;
        const student = testimonials[i];

        if (student.display_order !== newOrder) {
            console.log(`Updating ${student.name}: ${student.display_order} -> ${newOrder}`);
            const { error: updateError } = await supabase
                .from('testimonials')
                .update({ display_order: newOrder })
                .eq('id', student.id);

            if (updateError) {
                console.error(`Error updating ${student.name}:`, updateError.message);
            }
        } else {
            console.log(`${student.name} already has correct order ${newOrder}`);
        }
    }

    console.log('Re-indexing complete!');
}

reindexTestimonials();
