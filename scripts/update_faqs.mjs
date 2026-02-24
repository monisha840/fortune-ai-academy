import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const update = async () => {
    console.log('Fetching FAQs with empty or null status...');
    const { data: faqs, error: fetchError } = await supabase
        .from('faqs')
        .select('id, status');

    if (fetchError) {
        console.error('Fetch error:', fetchError);
        return;
    }

    console.log(`Found ${faqs.length} FAQs. Updating to published...`);

    for (const faq of faqs) {
        if (!faq.status || faq.status === '') {
            const { error: updateError } = await supabase
                .from('faqs')
                .update({ status: 'published' })
                .eq('id', faq.id);

            if (updateError) {
                console.error(`Error updating FAQ ${faq.id}:`, updateError);
            } else {
                console.log(`Updated FAQ ${faq.id} to published.`);
            }
        }
    }
    console.log('Update complete.');
};

update();
