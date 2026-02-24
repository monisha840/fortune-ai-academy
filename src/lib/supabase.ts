import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const crmUrl = import.meta.env.VITE_CRM_SUPABASE_URL;
const crmAnonKey = import.meta.env.VITE_CRM_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const crmSupabase = createClient(crmUrl, crmAnonKey);
