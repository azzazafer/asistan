/**
 * Aura SEO & Global Metadata Engine v2.0
 * Optimized for Global Edge Computing (CDN Caching)
 */

import { Metadata } from 'next';
import { TenancyManager } from './tenancy';

export const SEO_CONFIG = {
    defaultLanguage: 'en',
    languages: ['tr', 'en', 'ar', 'de', 'fr', 'es', 'ru', 'zh', 'ja', 'pt'],
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://aura-health.app',
};

export interface MetadataConfig {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    canonical: string;
}

export class SEOManager {

    /**
     * Generates a cache-stable key for CDN and Global Edge nodes.
     * Prevents metadata cache poisoning between tenants.
     */
    static getEdgeCacheKey(page: string, lang: string): string {
        const tenantId = TenancyManager.getTenant();
        const tier = TenancyManager.getTier();
        return `aura_seo_v2:${tenantId}:${tier}:${lang}:${page}`;
    }

    /**
     * Dynamically generates global metadata based on language and clinic culture.
     */
    static generateMetadata(page: string, lang: string = 'tr'): Metadata {
        const tenantId = TenancyManager.getTenant();

        const configs: Record<string, { title: string; description: string; keywords: string[] }> = {
            tr: {
                title: 'Aura Health OS | Yapay Zeka Destekli Sağlık Turizmi Yönetimi',
                description: 'Kültürel zeka ve yapay zeka ile sağlık turizmi operasyonlarınızı dijitalleştirin.',
                keywords: ['sağlık turizmi', 'yapay zeka', 'hastane crm'],
            },
            en: {
                title: 'Aura Health OS | AI-Powered Health Tourism Management',
                description: 'Digitalize your health tourism operations with cultural intelligence and AI.',
                keywords: ['health tourism', 'AI healthcare', 'medical CRM'],
            },
            ar: {
                title: 'Aura Health OS | إدارة السياحة الصحية المدعومة بالذكاء الاصطناعي',
                description: 'قم برقمنة عمليات السياحة الصحية الخاصة بك باستخدام الذكاء الثقافي والذكاء الاصطناعي.',
                keywords: ['السياحة الصحية', 'الذكاء الاصطناعي', 'إدارة علاقات العملاء الطبية'],
            }
        };

        const base = configs[lang] || configs['en'];

        return {
            title: `${base.title} | ${tenantId.toUpperCase()}`,
            description: base.description,
            keywords: (base.keywords || []).join(', '),
            metadataBase: new URL(SEO_CONFIG.siteUrl),
            openGraph: {
                title: `${base.title} | ${tenantId.toUpperCase()}`,
                description: base.description,
                url: SEO_CONFIG.siteUrl,
                siteName: 'Aura Health OS',
                type: 'website',
            },
        };
    }
}

// Legacy compatibility wrapper
export function getMetadata(lang: string = 'en'): Metadata {
    return SEOManager.generateMetadata('index', lang);
}
