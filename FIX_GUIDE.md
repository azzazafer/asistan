# 🎙️ Aura OS: Ses ve Log Sistemi Aktivasyon Rehberi

Aura'nın canlı sistemde ses vermesini engelleyen son iki teknik engeli (İzinler ve Eksik Tablo) buldum. Aşağıdaki adımları uyguladığınızda sistem %100 devreye girecektir.

## 🛠️ Adım 1: Supabase İzinlerini Tanımlayın (KRİTİK)

Supabase Dashboard'unuza gidin ve **SQL Editor** üzerinden şu komutu çalıştırın. Bu komut, Aura'nın ses dosyalarını kaydetmesini ve log tutmasını sağlayacaktır.

```sql
-- 1. Ses dosyaları için yükleme (INSERT) izni ver
CREATE POLICY "Allow public upload"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'voice-replies');

-- 2. Ses dosyaları için okuma (SELECT) izni ver
CREATE POLICY "Allow public select"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'voice-replies');

-- 3. Hata takibi için log tablosunu oluştur
CREATE TABLE IF NOT EXISTS public.debug_logs (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    event_name TEXT,
    severity TEXT,
    data JSONB
);

-- 4. Log tablosu için izinleri aç
ALTER TABLE public.debug_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert log" ON public.debug_logs FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public read log" ON public.debug_logs FOR SELECT TO public USING (true);
```

---

## 🛠️ Adım 2: Vercel Değişken Temizliği

Vercel Environment Variables kısmında aşağıdaki değerlerin sonunda **boşluk veya gizli karakter (enter)** olmadığından emin olun. Gerekirse silip tekrar yapıştırın:

*   **NEXT_PUBLIC_SUPABASE_URL**: Şu an sonunda boşluk var görünüyor.
*   **AZURE_SPEECH_KEY**: Tam olarak kopyalandığından emin olun.

---

## 🧪 Test Etme

Yukarıdaki adımları yaptıktan sonra WhatsApp'tan şu mesajı atın:
> "Merhaba, sesli konuşarak cevap verebilir misin?"

**Aura artık Emel Hanım'ın sesiyle size dönecek!** ✨🎙️💨
