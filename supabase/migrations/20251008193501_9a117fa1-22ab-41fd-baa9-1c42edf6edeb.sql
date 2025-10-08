-- Fix function search path for security
DROP FUNCTION IF EXISTS public.cleanup_old_rate_limits();

CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.booking_rate_limits
  WHERE last_booking_at < NOW() - INTERVAL '7 days';
END;
$$;