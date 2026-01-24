-- KESİN ÇÖZÜM: ADMIN KULLANCISINI SIFIRDAN OLUŞTUR
-- Eğer "Update" çalışmadıysa, kullanıcı yok demektir. Bu kod onu yaratır.

INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    last_sign_in_at,
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
    crypt('admin123', gen_salt('bf')), -- Şifre: admin123
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"role": "admin", "tenant_id": "default_clinic"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
)
ON CONFLICT (email) DO UPDATE SET
    encrypted_password = crypt('admin123', gen_salt('bf')),
    email_confirmed_at = now();
