import React from 'react';

export default function IntegrationGuidePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 border-b border-gray-800 pb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                        Gerçek Dünya Entegrasyon Rehberi
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Aura OS'u hastane sistemlerinize (HBYS/HIS) bağlamak için adım adım uygulama klavuzu.
                    </p>
                </header>

                <section className="space-y-12">
                    {/* Step 1 */}
                    <div className="bg-[#121214] p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all">
                        <div className="flex items-center mb-6">
                            <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mr-4">1</span>
                            <h2 className="text-2xl font-semibold">Altyapı Hazırlığı (IT Ekibi)</h2>
                        </div>
                        <ul className="space-y-4 text-gray-300 ml-14 list-disc">
                            <li><strong>IP Yetkilendirme:</strong> Hastane sunucularınızın Aura OS bulut sunucularına (IP: 142.250.x.x) erişimi için firewall üzerinden izin verin.</li>
                            <li><strong>VPN/Tunnel:</strong> Eğer yerel ağ (Intranet) kullanıyorsanız, güvenli bir Site-to-Site VPN tüneli oluşturun.</li>
                            <li><strong>API Kullanıcısı:</strong> Mevcut HBYS sisteminizde sadece "Okuma" ve "Rapor Yazma" yetkisi olan özel bir kullanıcı hesabı açın.</li>
                        </ul>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-[#121214] p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all">
                        <div className="flex items-center mb-6">
                            <span className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold mr-4">2</span>
                            <h2 className="text-2xl font-semibold">Adaptör Seçimi</h2>
                        </div>
                        <div className="ml-14 space-y-4">
                            <p className="text-gray-300">Aura OS içinde hazır bulunan adaptörlerden size uygun olanı seçin:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                                    <h3 className="text-blue-400 font-bold mb-2">Modern (FHIR/REST)</h3>
                                    <p className="text-sm text-gray-500">Yeni nesil bulut tabanlı sistemler için önerilir.</p>
                                </div>
                                <div className="p-4 bg-black/40 rounded-xl border border-gray-800">
                                    <h3 className="text-purple-400 font-bold mb-2">Geleneksel (HL7 MLLP)</h3>
                                    <p className="text-sm text-gray-500">Eski tip yerel sunuculu sistemler için standart protokol.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-[#121214] p-8 rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all">
                        <div className="flex items-center mb-6">
                            <span className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold mr-4">3</span>
                            <h2 className="text-2xl font-semibold">Veri Eşleştirme (Mapping)</h2>
                        </div>
                        <p className="text-gray-300 ml-14 mb-4">
                            Hastane sisteminizdeki veri alanları ile Aura OS'u senkronize edin:
                        </p>
                        <div className="ml-14 overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="border-b border-gray-800 text-gray-200">
                                    <tr>
                                        <th className="py-2">Aura Alanı</th>
                                        <th className="py-2">HBYS Karşılığı</th>
                                        <th className="py-2">Tip</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-900">
                                        <td className="py-2">nationalId</td>
                                        <td className="py-2">TC Kimlik / Pasaport</td>
                                        <td className="py-2">String</td>
                                    </tr>
                                    <tr className="border-b border-gray-900">
                                        <td className="py-2">treatmentType</td>
                                        <td className="py-2">Branş / Poliklinik</td>
                                        <td className="py-2">Enum</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Important Note */}
                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <h3 className="text-red-400 font-bold mb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Kritik Güvenlik Notu
                        </h3>
                        <p className="text-red-200/70 text-sm">
                            Canlı bağlantı öncesinde mutlaka "Sandbox" (Test) ortamında deneme yapın. Gerçek hastane veritabanına doğrudan yazma yapmadan önce Aura Forensic Diagnostic raporunu inceleyin.
                        </p>
                    </div>
                </section>

                <footer className="mt-16 text-center text-gray-500 border-t border-gray-800 pt-8">
                    <p>© 2026 Aura Health OS - Global Integration Support</p>
                </footer>
            </div>
        </div>
    );
}
