-- Drop the faqs table as requested
DROP TABLE IF EXISTS public.faqs;

-- Create the hiring_partners table
CREATE TABLE IF NOT EXISTS public.hiring_partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.hiring_partners ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public Read Hiring Partners" ON public.hiring_partners FOR SELECT USING (true);
CREATE POLICY "Admin All Hiring Partners" ON public.hiring_partners FOR ALL TO authenticated USING (true);
