-- ============================================================
-- Aura OS: RAG Demo Seed Data — "Altin Demo" Paketi
-- tenant_id: nextoria_demo
--
-- ONEMLI: Bu script embedding kolonunu NULL birakir.
-- rag-service.ts'deki embedKnowledgeBase() fonksiyonu
-- calistirildiktan sonra embedding'ler doldurulur.
-- ============================================================

-- Onceki demo verisini temizle (idempotent)
DELETE FROM public.knowledge_base WHERE tenant_id = 'nextoria_demo';

-- ──────────────────────────────────────────────────────────────
-- KATEGORI: price (Fiyat Bilgileri)
-- ──────────────────────────────────────────────────────────────
INSERT INTO public.knowledge_base (tenant_id, category, content, language) VALUES
(
  'nextoria_demo', 'price',
  'Sac ekimi fiyatlarimiz 2025 yili icin: DHI teknigi ile sac ekimi 2.500 Euro, FUE teknigi ile sac ekimi 1.900 Euro''dur. Bu fiyatlara 5 yildizli otelde 3 gece konaklama, VIP havalimani transferi, kisisel hasta koordinatoru ve 1 yillik ucretsiz takip ziyareti dahildir. Tum islemlerde Saglik Bakanligi onayimiz mevcuttur.',
  'tr'
),
(
  'nextoria_demo', 'price',
  'Hair transplant pricing for 2025: DHI technique costs 2,500 EUR, FUE technique costs 1,900 EUR. Both packages include 3 nights in a 5-star hotel, VIP airport transfers, personal patient coordinator, and 1-year free follow-up consultation. All procedures are Ministry of Health certified.',
  'en'
),
(
  'nextoria_demo', 'price',
  'Dis implant fiyatlarimiz: Straumann marka, Isvicre uretimi implant 600 Euro, Nobel Biocare implant 750 Euro''dur. Ucretsiz panoramik rontgen ve dis eti analizi dahildir. Minimum 4 implant icin %10 grup indirimi uygulanmaktadir. Isvicre protezi ile tamamlanan tedavi paketi 950 Euro''dan baslamaktadir.',
  'tr'
),
(
  'nextoria_demo', 'price',
  'Dental implant pricing: Swiss-made Straumann implant 600 EUR, Nobel Biocare implant 750 EUR. Includes free panoramic X-ray and gum analysis. Group discount of 10% for minimum 4 implants. Complete treatment package with Swiss prosthetics starts from 950 EUR.',
  'en'
),
(
  'nextoria_demo', 'price',
  'Burun estetigi (Rhinoplasty) fiyati: 3.500 Euro. Anesteziolog, ameliyat odasi, 1 gece klinik konaklamasi ve 2 gece otel dahildir. En az 10 yillik deneyime sahip uzman plastik cerrahlarimizla gerceklestirilmektedir.',
  'tr'
);

-- ──────────────────────────────────────────────────────────────
-- KATEGORI: faq (Sik Sorulan Sorular — Psikolojik Engel Kirici)
-- ──────────────────────────────────────────────────────────────
INSERT INTO public.knowledge_base (tenant_id, category, content, language) VALUES
(
  'nextoria_demo', 'faq',
  'Islem sirasinda ac yarir mi? Sac ekimi isleminde yerel anestezi kullanildiginden islem boyunca agri hissetmezsiniz. Anestezi igresi sirasinda hafif bir yanma hissi olabilir, bu 10-15 saniye surer. Islem sonrasi 3-5 gun hafif duyarlilik yasanabilir; size verilen agri kesicilerle rahatca yonetilebilir. Klinigimizdeki hastalarin %94u islem sirasinda hic agri hissetmedigini belirtmistir.',
  'tr'
),
(
  'nextoria_demo', 'faq',
  'Will it hurt during the procedure? During hair transplant surgery, local anesthesia is applied so you will not feel pain throughout the procedure. There may be a slight burning sensation during the anesthesia injection, lasting 10-15 seconds. Post-procedure, mild sensitivity may occur for 3-5 days, easily managed with the prescribed pain relievers. 94% of our patients report feeling no pain during the procedure.',
  'en'
),
(
  'nextoria_demo', 'faq',
  'Turkiye''de ameliyat yaptirmak guvenli mi? Klinigimizdeki cerrahlar Avrupa''daki hastanelerde de aktif olarak calismaktadir. Saglik Bakanligi lisansi, JCI akreditasyonu ve ISO 9001 sertifikamiz mevcuttur. Tum ameliyat ekipmanlarimiz Avrupa standartlarinda sterilizasyon protokolleriyle hazirlaniyor. 2023 yilinda 1.200 uluslararasi hastaya hizmet verdik, sikayet orani sifirdir.',
  'tr'
),
(
  'nextoria_demo', 'faq',
  'Is it safe to have surgery in Turkey? Our surgeons also operate actively in European hospitals. We hold Ministry of Health license, JCI accreditation and ISO 9001 certification. All surgical equipment is prepared with European-standard sterilization protocols. We served 1,200 international patients in 2023 with zero complaints.',
  'en'
),
(
  'nextoria_demo', 'faq',
  'Sac ekimi sonuclari ne kadar kalici? DHI ve FUE tekniklerinde nakledilen sac kokleri genetik olarak dokumlmeye direncli bolgedeki koklerden alinir. Bu nedenle nakledilen saclar omur boyu kalicidir. Ilk 3 ayda dokulme normaldir, gercek sonuc 12. ayda gorunur. Beklenti yonetimi icin hastalarimizin 12. ay fotograflarini gorebilirsiniz.',
  'tr'
),
(
  'nextoria_demo', 'faq',
  'Yabanci uyruklu hastalara ozel destek var mi? Evet. Arapcа, Ingilizce ve Turkce konusan hasta koordinatorumuz havalimani karsilama aninden taburculuga kadar sizinle birliktedir. Vize mektubu, yolculuk organizasyonu ve sigorta konularinda da destek sagliyoruz.',
  'tr'
);

-- ──────────────────────────────────────────────────────────────
-- KATEGORI: doctor_bio (Doktor Biyografileri)
-- ──────────────────────────────────────────────────────────────
INSERT INTO public.knowledge_base (tenant_id, category, content, language) VALUES
(
  'nextoria_demo', 'doctor_bio',
  'Dr. Ahmet Yilmaz, sac ekimi ve plastik cerrahi alaninda 15 yillik deneyime sahiptir. Istanbul Universitesi Tip Fakultesi mezunu olan Dr. Yilmaz, Almanya Heidelberg Universitesi Hastanesi''nde 3 yil uzmanlik egitimi almiştir. Uluslararasi Sac Restorasyonu Dernegi (ISHRS) aktif uyesidir. Bugunе kadar 4.500 den fazla basarili sac ekimi islemini gerceklestirmistir. Patient satisfaction skoru 4.9/5.0 olan Dr. Yilmaz, ozellikle yuksek yogunluklu DHI tekniginde uzmandir.',
  'tr'
),
(
  'nextoria_demo', 'doctor_bio',
  'Dr. Ahmet Yilmaz has 15 years of experience in hair transplant and plastic surgery. A graduate of Istanbul University Faculty of Medicine, Dr. Yilmaz completed 3 years of specialist training at Heidelberg University Hospital in Germany. He is an active member of the International Society of Hair Restoration Surgery (ISHRS) and has performed over 4,500 successful hair transplant procedures. Dr. Yilmaz holds a patient satisfaction score of 4.9/5.0 and specializes in high-density DHI technique.',
  'en'
),
(
  'nextoria_demo', 'doctor_bio',
  'Dr. Zeynep Arslan, dis hekimligi ve implantoloji alaninda uzmandir. 12 yillik klinik deneyimi ile Straumann ve Nobel Biocare sertifikali tek dis hekimlerimizden biridir. Avrupa Implantoloji Dernegi (EAO) uyesidir. Ozellikle agriyi minimize eden minimal invaziv implant teknikleri konusunda uzmandir. Hastalari tarafindan ''agrisiz dis hekimi'' olarak anilmaktadir.',
  'tr'
);

-- ──────────────────────────────────────────────────────────────
-- KATEGORI: procedure (Prosedur ve Sedasyon Bilgisi)
-- ──────────────────────────────────────────────────────────────
INSERT INTO public.knowledge_base (tenant_id, category, content, language) VALUES
(
  'nextoria_demo', 'procedure',
  'DHI Sac Ekimi Proseduru: Islem toplam 6-8 saat surer. Sabah 08:00 klinik karsilama, 09:00 tasarim ve fotograf, 09:30 yerel anestezi uygulamasi, 10:00 kok hasat (FUE/DHI motorla), 13:00 ogle arası ve yemek, 14:00 ekim alani hazirlama, 14:30 kanalac acma ve ekim. 18:00 islem bitis, pansuman ve bakım egitimi. Ilk yikama ertesi gun klinikte yapilir. Ucus 5 gun sonra mumkundur.',
  'tr'
),
(
  'nextoria_demo', 'procedure',
  'Sedasyon ve Agri Yonetimi: Standart sac ekiminde bilinc kaybettirici genel anestezi kullanilmaz. Bunun yerine ''Comfort Package'' secenegimizde hafif intravenoz sedasyon (bilinc acik ama tamamen rahat) uygulanabilir. Bu secenekle hastalarimizin cogу islem boyunca uyuklamaktadir. Ek ucret: 300 Euro. Sedasyon konusunda tereddutleriniz varsa ameliyat oncesi anestezi uzmanımızla ucretsiz gorus yapabilirsiniz.',
  'tr'
),
(
  'nextoria_demo', 'procedure',
  'Pain Management and Sedation: Standard hair transplant does not use general anesthesia. However, our "Comfort Package" offers mild intravenous sedation (conscious but completely relaxed). Most of our patients doze off during the procedure with this option. Additional cost: 300 EUR. If you have concerns about sedation, a free consultation with our anesthesiologist is available before surgery.',
  'en'
);

-- ──────────────────────────────────────────────────────────────
-- KATEGORI: ops (Lojistik ve Paket Operasyonlari)
-- ──────────────────────────────────────────────────────────────
INSERT INTO public.knowledge_base (tenant_id, category, content, language) VALUES
(
  'nextoria_demo', 'ops',
  'VIP Transfer ve Konaklama Paketi: Havalimani VIP karsilama (isimli plakayla), Mercedes Vito ozel transfer, 5 yildizli otelde 3 gece konaklaması (kahvalti dahil), otel-klinik transferleri, kisisel rehber esliginde sehir turu (opsiyonel). Eklenmek istenen extra gece basi 80 Euro''dur. Esler ve refakatciler icin grupo fiyati mevcuttur.',
  'tr'
),
(
  'nextoria_demo', 'ops',
  'VIP Transfer and Accommodation Package: VIP airport reception (name board), private Mercedes Vito transfer, 3-night accommodation in 5-star hotel (breakfast included), hotel-clinic transfers, optional guided city tour. Extra nights at 80 EUR per night. Group pricing available for partners and companions.',
  'en'
),
(
  'nextoria_demo', 'ops',
  'Odeme secenekleri: Banka havalesi, kredi karti (visa/mastercard), Iyzico taksit (6/12 ay), PayPal. Rezervasyon icin %20 depozito alinir, kalan tutar islem gunü odenir. Iptal politikasi: 30 gununden fazla iptal = tam iade, 15-30 gun = %50 iade, 15 gununden az = depozito iadesi yok.',
  'tr'
);

-- ──────────────────────────────────────────────────────────────
-- NOT: Asagidaki komut embedding'leri doldurmak icin
-- rag-service.ts icerisindeki embedKnowledgeBase() fonksiyonunu
-- calistirmalisiniz. Supabase SQL Editor'dan calistirilmaz.
-- Komut: await RagService.embedKnowledgeBase('nextoria_demo')
-- ──────────────────────────────────────────────────────────────
