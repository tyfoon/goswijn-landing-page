-- Create table to track booking rate limits
CREATE TABLE public.booking_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  last_booking_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_booking_rate_limits_email ON public.booking_rate_limits(email);
CREATE INDEX idx_booking_rate_limits_last_booking ON public.booking_rate_limits(last_booking_at);

-- Enable RLS
ALTER TABLE public.booking_rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow public to insert their own rate limit entries
CREATE POLICY "Anyone can insert rate limit entries"
ON public.booking_rate_limits
FOR INSERT
WITH CHECK (true);

-- Allow public to view their own entries (for checking)
CREATE POLICY "Users can view their own rate limit entries"
ON public.booking_rate_limits
FOR SELECT
USING (true);

-- Create function to clean up old rate limit entries (older than 7 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.booking_rate_limits
  WHERE last_booking_at < NOW() - INTERVAL '7 days';
END;
$$;