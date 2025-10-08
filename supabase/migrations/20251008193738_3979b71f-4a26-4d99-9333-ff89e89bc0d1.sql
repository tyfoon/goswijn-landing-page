-- Fix security issues in booking_rate_limits table
-- Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can insert rate limit entries" ON public.booking_rate_limits;
DROP POLICY IF EXISTS "Users can view their own rate limit entries" ON public.booking_rate_limits;

-- Create restrictive policies that effectively block all public access
-- Service role will bypass these policies anyway, so edge function still works

-- Block all SELECT for non-service-role users
CREATE POLICY "Block public SELECT on rate limits"
ON public.booking_rate_limits
FOR SELECT
USING (false);

-- Block all INSERT for non-service-role users  
CREATE POLICY "Block public INSERT on rate limits"
ON public.booking_rate_limits
FOR INSERT
WITH CHECK (false);

-- Block all UPDATE for non-service-role users
CREATE POLICY "Block public UPDATE on rate limits"
ON public.booking_rate_limits
FOR UPDATE
USING (false);

-- Block all DELETE for non-service-role users
CREATE POLICY "Block public DELETE on rate limits"
ON public.booking_rate_limits
FOR DELETE
USING (false);

-- Add comment explaining the security model
COMMENT ON TABLE public.booking_rate_limits IS 'Internal rate limiting table. Access restricted to service role only. Edge function uses service role credentials to manage rate limits.';