import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY; // Use Service Role Key

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function reindexTestimonials() {
    console.log('Fetching all testimonials...');
    const { data: testimonials, error: fetchError } = await supabase
        .from('testimonials')
        .select('id, name, display_order, created_at')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

    if (fetchError) {
        console.error('Error fetching testimonials:', fetchError.message);
        return;
    }

    console.log(`Found ${testimonials.length} testimonials. Re-indexing...`);

    // We'll update them one by one to ensure no conflicts if the DB has constraints
    for (let i = 0; i < testimonials.length; i++) {
        const newOrder = i + 1;
        const student = testimonials[i];

        console.log(`Updating ${student.name}: ${student.display_order} -> ${newOrder}`);
        const { error: updateError, data } = await supabase
            .from('testimonials')
            .update({ display_order: newOrder })
            .eq('id', student.id)
            .select();

        if (updateError) {
            console.error(`Error updating ${student.name}:`, updateError.message);
        } else {
            console.log(`Successfully updated ${student.name} to ${newOrder}`);
        }
    }

    console.log('Re-indexing complete! Verifying order...');
    const { data: verified } = await supabase
        .from('testimonials')
        .select('name, display_order')
        .order('display_order', { ascending: true });

    verified.forEach(v => console.log(`${v.display_order}: ${v.name}`));
}

reindexTestimonials();
