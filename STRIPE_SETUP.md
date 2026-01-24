# STRIPE KURULUM REHBERİ

## 1. Stripe Hesabı Oluşturma

1. https://stripe.com adresine gidin
2. "Start now" butonuna tıklayın
3. Email ve şifre ile kayıt olun
4. Türkiye için KYC (Know Your Customer) bilgilerini tamamlayın

## 2. API Keys Alma

1. Stripe Dashboard'a giriş yapın
2. Sağ üst köşeden "Developers" > "API keys" seçin
3. Test modunda çalışmak için "Test mode" açık olmalı
4. **Publishable key** ve **Secret key**'i kopyalayın

## 3. Products ve Prices Oluşturma

### Starter Package
1. Dashboard > Products > "+ Add product"
2. Name: "Aura OS - Starter"
3. Description: "100 leads/ay, WhatsApp + Web Chat"
4. Pricing: Recurring, $299/month
5. Save edip **Price ID**'yi kopyalayın (price_... ile başlar)

### Professional Package
1. Dashboard > Products > "+ Add product"
2. Name: "Aura OS - Professional"
3. Description: "500 leads/ay, Tüm kanallar, Lead scoring"
4. Pricing: Recurring, $799/month
5. Save edip **Price ID**'yi kopyalayın

## 4. Webhook Endpoint Oluşturma

1. Dashboard > Developers > Webhooks
2. "+ Add endpoint"
3. Endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Save edip **Signing secret**'i kopyalayın (whsec_... ile başlar)

## 5. Environment Variables

`.env.local` dosyasına ekleyin:

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...

# Supabase (webhook için gerekli)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## 6. Test Etme

### Test Kartları (Stripe tarafından sağlanır):
- **Başarılı:** 4242 4242 4242 4242
- **Başarısız:** 4000 0000 0000 0002
- CVV: Herhangi 3 rakam
- Tarih: Gelecekte herhangi bir tarih

### Test Akışı:
1. `http://localhost:3000/pricing` sayfasına gidin
2. Hastane adı ve email girin
3. "Starter" veya "Professional" seçin
4. Test kartı ile ödeme yapın
5. Başarılı olursa `/onboarding` sayfasına yönlendirileceksiniz
6. Supabase'de `tenants` ve `subscriptions` tablolarını kontrol edin

## 7. Production'a Geçiş

1. Stripe Dashboard'da "Test mode" kapatın
2. Production API keys'i alın
3. Production webhook endpoint oluşturun
4. `.env.production` dosyasını güncelleyin
5. Vercel'de environment variables'ı ayarlayın

## Sorun Giderme

### Webhook çalışmıyor
- Stripe Dashboard > Webhooks > Endpoint'e tıklayın
- "Recent events" kısmından hataları kontrol edin
- Webhook secret doğru mu kontrol edin

### Ödeme başarılı ama tenant oluşmadı
- Vercel logs'u kontrol edin: `vercel logs`
- Supabase RLS policies'i kontrol edin
- Service role key doğru mu kontrol edin

### Checkout session oluşturulamıyor
- Price ID'ler doğru mu kontrol edin
- Stripe secret key doğru mu kontrol edin
- Browser console'da hata var mı kontrol edin
