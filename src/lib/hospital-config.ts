/**
 * Aura Hospital Configuration System
 * This file serves as the "Digital Twin" of the hospital.
 * Simply update this object to deploy for a new clinic/hospital.
 */

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    availability: string; // e.g., "Mon-Fri 09:00-17:00"
}

export interface HospitalConfig {
    name: string;
    brandName: string;
    location: string;
    departments: string[];
    doctors: Doctor[];
    services: string[];
    phone: string;
}

// Default "Demo" Hospital Configuration
export const DEFAULT_HOSPITAL: HospitalConfig = {
    name: "Global Health Tourism Center",
    brandName: "Aura Health",
    location: "İstanbul, Türkiye",
    departments: ["Saç Ekimi", "Diş Estetiği", "Obezite Cerrahisi", "Göz Sağlığı"],
    doctors: [
        { id: "dr-1", name: "Dr. Can Yılmaz", specialty: "Saç Ekimi Uzmanı", availability: "Hafta içi 09:00 - 18:00" },
        { id: "dr-2", name: "Dr. Ayşe Demir", specialty: "Estetik Diş Hekimi", availability: "Hafta içi 10:00 - 17:00" }
    ],
    services: [
        "VİP Transfer Alım",
        "5 Yıldızlı Konaklama",
        "Ömür Boyu Garanti Sertifikası",
        "7/24 Şahsi Asistan"
    ],
    phone: "+90 212 123 45 67"
};

/**
 * Generates a system context string for the AI based on the hospital config.
 */
export const getHospitalKnowledge = (config: HospitalConfig = DEFAULT_HOSPITAL): string => {
    return `
BRANŞ VE BİLGİ SETİ:
- Kurum Adı: ${config.name} (${config.brandName})
- Lokasyon: ${config.location}
- Departmanlar: ${(config.departments || []).join(', ')}
- Sunulan Hizmetler: ${(config.services || []).join(', ')}

DOKTORLARIMIZ:
${(config.doctors || []).map(d => `- ${d.name} (${d.specialty}) - Müsaitlik: ${d.availability}`).join('\n')}

İLETİŞİM:
- Telefon: ${config.phone}

NOT: Kullanıcılara sadece buradaki departmanlar ve hizmetler hakkında bilgi ver. Bilmediğin konularda "Sizi ilgili uzmana bağlayabilirim" de.
`;
};
