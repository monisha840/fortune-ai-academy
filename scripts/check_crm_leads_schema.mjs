import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const crmUrl = process.env.VITE_CRM_SUPABASE_URL;
const crmKey = process.env.VITE_CRM_SUPABASE_ANON_KEY;

const crmSupabase = createClient(crmUrl, crmKey);

async function checkCrmLeadsSchema() {
    console.log('Fetching sample lead from CRM Supabase...');
    const { data, error } = await crmSupabase
        .from('leads')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    if (data && data.length > 0) {
        console.log('Columns in CRM "leads" table:');
        console.log(Object.keys(data[0]));
        fs.writeFileSync('scripts/leads_schema_crm.json', JSON.stringify(data[0], null, 2));
    } else {
        console.log('No leads found in CRM Supabase.');
    }
}

checkCrmLeadsSchema();
