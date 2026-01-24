-- KESİN VE NİHAİ KOD (ÇAKIŞMA KONTROLÜ YOK)
-- "Update 0 rows" dediği için kullanıcının olmadığını biliyoruz.
-- Bu yüzden direkt ekleme yapıyoruz. Hata verirse zaten var demektir.

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
