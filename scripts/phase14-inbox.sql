-- PHASE 14: UNIFIED INBOX & HUMAN TAKEOVER
-- Bu script "Yapay Zeka Devre Dışı" (Human Takeover) özelliğini aktifleştirir.

-- 1. Leads tablosuna 'ai_paused' kolonu ekle
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS ai_paused BOOLEAN DEFAULT FALSE;

-- 2. Eğer varsa 'last_message_at' kolonu ekle (Sıralama için)
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMPTZ DEFAULT now();

-- 3. RLS Politikaları (Emin olmak için)
-- Adminler her şeyi güncelleyebilir
CREATE POLICY "Admins can update leads" 
ON public.leads 
FOR UPDATE 
TO authenticated 
USING (auth.uid() IN (SELECT id FROM auth.users));

-- Schema Yenile
NOTIFY pgrst, 'reload schema';
