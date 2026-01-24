-- NÜKLEER ÇÖZÜM: SİL VE YENİDEN YARAT
-- Bu kod kesin çalışacak çünkü önce "yer kaplayan" bozuk kaydı siliyor, sonra yenisini koyuyor.

-- 1. ADIM: Varsa sil (Hata vermez, varsa temizler)
DELETE FROM auth.users WHERE email = 'admin@aura.com';

-- 2. ADIM: Tertemiz oluştur
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change,
    email_change_token_new
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    uuid_generate_v4(),
    'authenticated',
    'authenticated',
    'admin@aura.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"role": "admin", "tenant_id": "default_clinic"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
);
