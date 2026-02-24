import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLeadsSchema() {
    console.log('Fetching sample lead from local Supabase...');
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    if (data && data.length > 0) {
        console.log('Columns in local "leads" table:');
        console.log(Object.keys(data[0]));
        fs.writeFileSync('scripts/leads_schema_local.json', JSON.stringify(data[0], null, 2));
    } else {
        console.log('No leads found in local Supabase.');
    }
}

checkLeadsSchema();
