import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugSchema() {
    console.log('--- Supabase Schema Debug ---');

    // 1. Check all tables in public schema
    const { data: tables, error: tableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');

    if (tableError) {
        console.error('Error listing tables:', tableError.message);
    } else {
        console.log('Tables in public schema:', tables.map(t => t.table_name).join(', '));
    }

    // 2. Try to select from leads explicitly
    const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .limit(1);

    if (leadsError) {
        console.error('Error selecting from leads:', leadsError.message);
    } else {
        console.log('Successfully selected from leads.');
        if (leads && leads.length > 0) {
            console.log('Columns:', Object.keys(leads[0]));
        }
    }
}

debugSchema();
