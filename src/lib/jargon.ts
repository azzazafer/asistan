/**
 * Aura Jargon Engine v3.0
 * Specialized Medical & Technical Lexicon for Health Tourism
 */

export interface JargonEntry {
    term: string;
    laymanTranslation: string;
    context: string;
    culture?: 'Europe' | 'Middle East' | 'USA' | 'Global';
}

export const MEDICAL_JARGON: Record<string, JargonEntry> = {
    // HAIR TRANSPLANT
    'FUE': {
        term: 'Follicular Unit Extraction',
        laymanTranslation: 'Dikişsiz, tek tek kıl kökü alımı.',
        context: 'Hair Transplant'
    },
    'DHI': {
        term: 'Direct Hair Implantation',
        laymanTranslation: 'Kanal açmadan doğrudan ekim (Choi kalem ile).',
        context: 'Hair Transplant'
    },
    'Graft': {
        term: 'Follicular Unit',
        laymanTranslation: 'Saç kökü grubu (1-4 tel saç içerir).',
        context: 'Hair Transplant'
    },
    'Donor Area': {
        term: 'Donor Site',
        laymanTranslation: 'Kökerin alındığı (genelde ensedeki) güvenli bölge.',
        context: 'Hair Transplant'
    },

    // DENTAL
    'Zirconium': {
        term: 'Zirconium Dioxide Crown',
        laymanTranslation: 'Metal içermeyen, doğal görünümlü sağlam diş kaplaması.',
        context: 'Dental Aesthetics'
    },
    'E-Max': {
        term: 'Lithium Disilicate Ceramic',
        laymanTranslation: 'En yüksek estetik ve ışık geçirgenliğine sahip porselen.',
        context: 'Dental Aesthetics'
    },
    'Sinus Lift': {
        term: 'Sinus Augmentation',
        laymanTranslation: 'Üst çenede implant için yeterli kemik yoksa yapılan kemik ekleme işlemi.',
        context: 'Dental Aesthetics'
    },
    'All-on-4': {
        term: 'Fixed Full-Arch Restoration',
        laymanTranslation: 'Tek bir çeneye 4 implant ile tüm dişlerin sabitlenmesi.',
        context: 'Dental Aesthetics'
    },

    // ANESTHESIA
    'Sedation': {
        term: 'Conscious Sedation',
        laymanTranslation: 'Uyanık ama tamamen rahat, ağrı hissetmediğiniz "derin uyku" hali.',
        context: 'Surgical Comfort'
    }
};

/**
 * Translates professional jargon to layman terms for better patient conversion
 */
export const translateJargon = (text: string): string => {
    let professionalText = text;

    // Reverse engineer search: replace terminology with full context if detected
    Object.keys(MEDICAL_JARGON).forEach(key => {
        const entry = MEDICAL_JARGON[key];
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        if (regex.test(professionalText)) {
            professionalText = professionalText.replace(regex, `${key} [${entry.term}: ${entry.laymanTranslation}]`);
        }
    });

    return professionalText;
};

/**
 * Technical validation for AI context
 */
export const getJargonDetails = (term: string): JargonEntry | undefined => {
    return MEDICAL_JARGON[term.toUpperCase()] ||
        Object.values(MEDICAL_JARGON).find(j => j.term.toLowerCase() === term.toLowerCase());
};
