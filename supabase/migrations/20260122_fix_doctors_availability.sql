
-- 20260122_fix_doctors_availability.sql
-- Missing column for calendar logic

ALTER TABLE public.doctors 
ADD COLUMN IF NOT EXISTS availability JSONB DEFAULT '{
    "monday": [{"start": "09:00", "end": "17:00", "available": true}],
    "tuesday": [{"start": "09:00", "end": "17:00", "available": true}],
    "wednesday": [{"start": "09:00", "end": "17:00", "available": true}],
    "thursday": [{"start": "09:00", "end": "17:00", "available": true}],
    "friday": [{"start": "09:00", "end": "17:00", "available": true}],
    "saturday": [],
    "sunday": []
}'::jsonb;

-- Also add department since calendar.ts logic relies on it (it was using 'specialty' or 'department' loosely)
ALTER TABLE public.doctors 
ADD COLUMN IF NOT EXISTS department TEXT DEFAULT 'General';

-- Add avatar URL for UI
ALTER TABLE public.doctors 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;
