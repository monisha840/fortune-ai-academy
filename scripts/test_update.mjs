import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSingleUpdate() {
    console.log('Finding Gayathri G...');
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('name', 'Gayathri G')
        .single();

    if (error) {
        console.error('Error finding:', error.message);
        return;
    }

    console.log(`Current Gayathri G order: ${data.display_order}`);

    console.log('Updating Gayathri G to 4...');
    const { error: updateError } = await supabase
        .from('testimonials')
        .update({ display_order: 4 })
        .eq('id', data.id);

    if (updateError) {
        console.error('Update Error:', updateError.message);
    } else {
        console.log('Update successful (according to Supabase)');
    }

    const { data: verify } = await supabase
        .from('testimonials')
        .select('name, display_order')
        .eq('id', data.id)
        .single();

    console.log(`Verified Gayathri G order: ${verify.display_order}`);
}

testSingleUpdate();
