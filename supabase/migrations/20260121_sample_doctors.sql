-- ==========================================================
-- AURA OS: PHASE 10 SAMPLE DATA (Doctors)
-- Target: Initializing core specialists for the Dashboard
-- ==========================================================

INSERT INTO public.doctors (tenant_id, name, specialty, color)
VALUES 
('default_clinic', 'Dr. Ahmet Yılmaz', 'Diş Hekimi', '#4F46E5'),
('default_clinic', 'Dr. Fatma Kaya', 'Saç Ekim Uzmanı', '#10B981'),
('default_clinic', 'Dr. Mehmet Öz', 'Göz Cerrahı', '#F59E0B'),
('default_clinic', 'Dr. Elif Demir', 'Plastik Cerrah', '#EC4899')
ON CONFLICT DO NOTHING;
