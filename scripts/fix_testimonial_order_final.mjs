import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixOrder() {
    console.log('Fetching all testimonials...');
    const { data: list, error } = await supabase
        .from('testimonials')
        .select('id, name, display_order');

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    // Sort in memory to guarantee deterministic order
    // Primary: display_order, Secondary: name (to handle duplicates)
    list.sort((a, b) => {
        if (a.display_order !== b.display_order) {
            return a.display_order - b.display_order;
        }
        return a.name.localeCompare(b.name);
    });

    console.log('Applying unique sequence...');
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const newOrder = i + 1;

        console.log(`Setting ${item.name} to order ${newOrder} (was ${item.display_order})`);

        const { error: updateError } = await supabase
            .from('testimonials')
            .update({ display_order: newOrder })
            .eq('id', item.id);

        if (updateError) {
            console.error(`Failed to update ${item.name}:`, updateError.message);
        }
    }

    console.log('Done! Verifying...');
    const { data: verified } = await supabase
        .from('testimonials')
        .select('name, display_order')
        .order('display_order', { ascending: true });

    verified.forEach(v => console.log(`${v.display_order}: ${v.name}`));
}

fixOrder();
