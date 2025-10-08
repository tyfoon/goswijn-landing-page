-- Create table to store Google OAuth tokens
CREATE TABLE IF NOT EXISTS public.google_oauth_tokens (
  id TEXT PRIMARY KEY,
  refresh_token TEXT NOT NULL,
  access_token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.google_oauth_tokens ENABLE ROW LEVEL SECURITY;

-- Only allow service role to access this table (for edge functions)
CREATE POLICY "Service role can manage oauth tokens"
ON public.google_oauth_tokens
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);