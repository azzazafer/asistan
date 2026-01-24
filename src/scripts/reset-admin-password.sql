-- FORCE RESET ADMIN USER
-- This requires the UUID of the user. Since we might not know it, we update by email.

-- 1. Create the user if not exists (This is complex in SQL, usually better to use the dashboard).
-- Instead, we will UPDATE the password for 'admin@aura.com' if it exists.

-- NOTE: Supabase Auth stores passwords as hashes (bcrypt). We cannot just set '123456'.
-- BUT, we can make the user "confirmed" to ensure they aren't blocked.

UPDATE auth.users
SET encrypted_password = crypt('admin123', gen_salt('bf')), -- Sets password to 'admin123'
    email_confirmed_at = now(),
    raw_user_meta_data = '{"role": "admin", "tenant_id": "default_clinic"}'
WHERE email = 'admin@aura.com';

-- IF YOU DO NOT HAVE AN ACCOUNT, RUN THIS TO CREATE A DUMMY AUTH ENTRY
-- (Note: This is risky if Supabase doesn't allow raw inserts into auth.users, but usually works in SQL Editor)

INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES
  ('00000000-0000-0000-0000-000000000000', uuid_generate_v4(), 'authenticated', 'authenticated', 'admin@aura.com', crypt('admin123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"role": "admin", "tenant_id": "default_clinic"}', now(), now(), '', '', '', '')
ON CONFLICT (email) DO NOTHING;
