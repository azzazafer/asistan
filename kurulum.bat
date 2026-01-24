@echo off
echo AuraOS Production Sync Basliyor...

:: 1. Temizlik
echo Gecici dosyalar temizleniyor...
if exist ".next" rd /s /q ".next"
echo.

:: 2. Vercel Link (Yeniden Temiz Baglanti)
echo Proje baglantisi kontrol ediliyor...
call npx vercel link --yes
if %errorlevel% neq 0 (
    echo Mevcut baglanti hatali olabilir, yeniden baglaniliyor...
    call npx vercel link
)

:: 3. Anahtarlari Ekle
echo Anahtarlar Vercel'e ekleniyor...
echo YOUR_OPENAI_API_KEY_HERE | npx vercel env add OPENAI_API_KEY production
echo YOUR_SUPABASE_URL_HERE | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo YOUR_SUPABASE_ANON_KEY_HERE | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

:: 4. Deploy Et (Force ignore large files)
echo Site canliya basiliyor...
call npx vercel deploy --prod --yes

echo.
echo ISLEM TAMAM! Siteyi kontrol edebilirsin: https://asistan-orcin.vercel.app/dashboard
pause
