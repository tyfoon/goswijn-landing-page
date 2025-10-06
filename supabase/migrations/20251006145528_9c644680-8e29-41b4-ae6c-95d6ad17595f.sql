-- Create storage bucket for booking attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('booking-attachments', 'booking-attachments', false);

-- Allow authenticated and anonymous users to upload files
CREATE POLICY "Anyone can upload booking attachments"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'booking-attachments');

-- Allow authenticated and anonymous users to read their uploads
CREATE POLICY "Anyone can view booking attachments"
ON storage.objects
FOR SELECT
USING (bucket_id = 'booking-attachments');