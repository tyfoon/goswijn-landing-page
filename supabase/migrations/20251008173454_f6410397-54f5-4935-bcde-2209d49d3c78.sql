-- Drop the existing restrictive policy that's not properly securing the table
DROP POLICY IF EXISTS "Service role can manage oauth tokens" ON public.google_oauth_tokens;

-- Create a proper permissive policy that ONLY allows service_role access
-- This ensures OAuth tokens can only be accessed by edge functions with service role key
CREATE POLICY "Only service role can access oauth tokens"
ON public.google_oauth_tokens
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Add a deny-all policy for authenticated and anon users to be explicit
CREATE POLICY "Deny all access to regular users"
ON public.google_oauth_tokens
FOR ALL
TO authenticated, anon
USING (false)
WITH CHECK (false);