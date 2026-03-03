"use client";

import { useEffect } from "react";

// Desteklenen diller ve browser prefix'leri
const LANG_MAP: Record<string, string> = {
    tr: "/",
    "tr-tr": "/",
    en: "/en/",
    "en-us": "/en/",
    "en-gb": "/en/",
    de: "/de/",
    "de-de": "/de/",
    ar: "/ar/",
    "ar-sa": "/ar/",
    "ar-ae": "/ar/",
    "ar-eg": "/ar/",
};

// RTL dilleri
const RTL_LANGS = ["ar", "ar-sa", "ar-ae", "ar-eg", "he", "fa"];

export default function LanguageRouter() {
    useEffect(() => {
        // 1. HTML dir ve lang ayarla
        const browserLang = (navigator.language || "tr").toLowerCase();
        const primaryLang = browserLang.split("-")[0];

        // RTL kontrolü
        const isRTL = RTL_LANGS.some(l => browserLang.startsWith(l));
        if (isRTL) {
            document.documentElement.setAttribute("dir", "rtl");
            document.documentElement.setAttribute("lang", primaryLang);
        } else {
            document.documentElement.setAttribute("dir", "ltr");
        }

        // 2. Sadece kök path'teyse yönlendirme yap
        // (zaten /en/ veya /de/ gibi alt path'teyse yönlendirme)
        const currentPath = window.location.pathname;
        const alreadyRouted = ["/en/", "/de/", "/ar/"].some(p => currentPath.startsWith(p));
        if (alreadyRouted) return;

        // 3. Türkçe varsayılan — yönlendirme yok
        if (primaryLang === "tr") return;

        // 4. Bilinen dil haritalaması
        const targetPath = LANG_MAP[browserLang] || LANG_MAP[primaryLang];
        if (targetPath && targetPath !== "/") {
            // Static export'ta gerçek i18n routing yok, sadece future proofing
            // Şimdilik: localStorage'a dil tercihi kaydet
            localStorage.setItem("aura_lang", primaryLang);
            localStorage.setItem("aura_dir", isRTL ? "rtl" : "ltr");
        }

        // 5. META lang güncelle
        document.documentElement.setAttribute("lang", primaryLang || "tr");

        // 6. Arabic RTL: body'ye rtl class ekle
        if (isRTL) {
            document.body.classList.add("rtl");
        }
    }, []);

    return null; // Görsel output yok — sadece side effect
}
