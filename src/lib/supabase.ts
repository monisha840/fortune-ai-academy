import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const crmUrl = import.meta.env.VITE_CRM_SUPABASE_URL;
const crmAnonKey = import.meta.env.VITE_CRM_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const crmSupabase = crmUrl && crmAnonKey
  ? createClient(crmUrl, crmAnonKey)
  : null;
