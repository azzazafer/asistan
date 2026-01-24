-- Add missing columns to doctors table to support advanced routing
ALTER TABLE public.doctors 
ADD COLUMN IF NOT EXISTS languages TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS rating DECIMAL DEFAULT 5.0;

-- Update existing doctors with some defaults if needed
UPDATE public.doctors SET languages = '{tr,en}' WHERE languages = '{}';
UPDATE public.doctors SET rating = 4.8 WHERE rating = 5.0;
