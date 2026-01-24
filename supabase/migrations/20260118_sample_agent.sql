-- Sample Agent for Testing
INSERT INTO public.agents (name, email, phone, referral_code, commission_rate)
VALUES ('Zafer', 'zafer@example.com', '+905320000000', 'ZAFER2026', 15.00)
ON CONFLICT (phone) DO UPDATE SET referral_code = 'ZAFER2026';
