"""
Twilio WhatsApp Sandbox Webhook Configurator
Bu script Twilio'nun karmaşık arayüzünü atlayarak
webhook URL'ini direkt API ile ayarlar.
"""

from twilio.rest import Client

# Twilio Console'dan alacağınız bilgiler
# https://console.twilio.com/ -> Account Info bölümünden
ACCOUNT_SID = input("Twilio Account SID'nizi girin: ").strip()
AUTH_TOKEN = input("Twilio Auth Token'ınızı girin: ").strip()

# Aura'nın webhook adresi
WEBHOOK_URL = "https://asistan-orcin.vercel.app/api/webhooks/whatsapp"

print("\n🔧 Twilio API'ye bağlanıyor...")
client = Client(ACCOUNT_SID, AUTH_TOKEN)

try:
    # WhatsApp Sandbox ayarlarını güncelle
    print("📡 Webhook URL ayarlanıyor...")
    
    # Sandbox için incoming message webhook'unu ayarla
    sandbox = client.messaging.v1.services.list(limit=1)
    
    if sandbox:
        service_sid = sandbox[0].sid
        client.messaging.v1.services(service_sid).update(
            inbound_request_url=WEBHOOK_URL,
            inbound_method='POST'
        )
        print(f"✅ BAŞARILI! Webhook ayarlandı: {WEBHOOK_URL}")
        print("\n📱 Şimdi telefonunuzdan 'Merhaba' yazın.")
        print("Aura size Türkçe cevap verecektir!")
    else:
        print("⚠️ Messaging Service bulunamadı.")
        print("Alternatif yöntem deneniyor...")
        
        # Alternatif: Doğrudan sandbox endpoint'ini güncelle
        # Not: Bu Twilio API'nin yeni versiyonlarında değişmiş olabilir
        print("Lütfen Twilio desteğiyle iletişime geçin veya")
        print("console.twilio.com adresinden manuel ayar yapın.")

except Exception as e:
    print(f"❌ HATA: {e}")
    print("\nOlası çözümler:")
    print("1. Account SID ve Auth Token'ı doğru girdiğinizden emin olun")
    print("2. Twilio hesabınızın aktif olduğunu kontrol edin")
    print("3. İnternet bağlantınızı kontrol edin")
