import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugUpdate() {
    console.log('Fetching Monisha...');
    const { data: monisha, error: f1 } = await supabase
        .from('testimonials')
        .select('*')
        .ilike('name', '%Monisha%')
        .single();

    if (f1) return console.error('F1:', f1.message);
    console.log('Monisha Original:', monisha.display_order, monisha.id);

    console.log('Fetching Gayathri...');
    const { data: gayathri, error: f2 } = await supabase
        .from('testimonials')
        .select('*')
        .ilike('name', '%Gayathri%')
        .single();

    if (f2) return console.error('F2:', f2.message);
    console.log('Gayathri Original:', gayathri.display_order, gayathri.id);

    console.log('Attempting to update Gayathri to 8 (far away)...');
    const { data: uData, error: uErr, status, statusText } = await supabase
        .from('testimonials')
        .update({ display_order: 8 })
        .eq('id', gayathri.id)
        .select();

    console.log('Update Result:', { status, statusText, error: uErr?.message, returnedData: uData });

    console.log('Verifying after update...');
    const { data: vGayathri } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', gayathri.id)
        .single();

    console.log('Gayathri After:', vGayathri?.display_order);
}

debugUpdate();
