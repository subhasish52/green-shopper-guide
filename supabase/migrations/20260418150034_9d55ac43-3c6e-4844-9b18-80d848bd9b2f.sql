-- Create leads table for the download funnel
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  completed_step TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can submit a lead
CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No one can read leads via the API (owner reads from dashboard only)
-- (No SELECT policy = no SELECT access)

-- Helpful index for sorting by recency
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);