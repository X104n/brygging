-- Add photo URL column to bryggeskjema
ALTER TABLE bryggeskjema ADD COLUMN IF NOT EXISTS bilde_url TEXT;

-- Create public storage bucket for schema images
INSERT INTO storage.buckets (id, name, public)
VALUES ('schema-images', 'schema-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for schema-images bucket
CREATE POLICY "Anyone can view schema images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'schema-images');

CREATE POLICY "Users can upload their own schema images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'schema-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own schema images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'schema-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own schema images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'schema-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
