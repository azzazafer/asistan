"use client";

import { useState, useEffect } from 'react';

export type UserSegment = 'SOLO_ENTREPRENEUR' | 'AGENCY_OWNER' | 'TECHNICAL_DEVELOPER' | 'UNKNOWN';

export function useUserSegment() {
    const [segment, setSegment] = useState<UserSegment>('UNKNOWN');

    useEffect(() => {
        // Niyet Tabanlı Tarama (Intent-Based Scanning)
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get('utm_source');
        const ref = params.get('ref');

        const storedSegment = localStorage.getItem('aura_segment') as UserSegment;

        let detected: UserSegment = 'UNKNOWN';

        if (storedSegment && ['SOLO_ENTREPRENEUR', 'AGENCY_OWNER', 'TECHNICAL_DEVELOPER'].includes(storedSegment)) {
            detected = storedSegment;
        } else if (utmSource === 'github' || utmSource === 'dev' || ref === 'tech' || params.has('debug')) {
            detected = 'TECHNICAL_DEVELOPER';
        } else if (utmSource === 'linkedin' || ref === 'agency' || utmSource === 'corporate') {
            detected = 'AGENCY_OWNER';
        } else if (utmSource === 'twitter' || ref === 'solo' || utmSource === 'ig') {
            detected = 'SOLO_ENTREPRENEUR';
        } else {
            // Dil ve ekran özellikleri tabanlı kaba bir segmentasyon fallback (Örneğin TR için GENEL / CLINIC/AGENCY vb)
            // Bu örnekte spesifik segmentasyon fallbackini Solo Girişimci yapalım veya Unknown kalsın
            detected = 'AGENCY_OWNER';
        }

        setSegment(detected);
        if (detected !== 'UNKNOWN') {
            localStorage.setItem('aura_segment', detected);
        }
    }, []);

    useEffect(() => {
        // Niyet/Aksiyon Tabanlı Proaktif Algılama
        const handleContextMenu = () => {
            setManualSegment('TECHNICAL_DEVELOPER');
            window.dispatchEvent(new CustomEvent('aura_log', { detail: 'SYS_EVENT: User Intent Changed: High Affinity for Automation (Right Click)' }));
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                setManualSegment('TECHNICAL_DEVELOPER');
                window.dispatchEvent(new CustomEvent('aura_log', { detail: 'SYS_EVENT: User Intent Changed: High Affinity for Automation (DevTools)' }));
            }
        };

        const startTime = Date.now();
        const handleScroll = () => {
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
            const timeSpent = Date.now() - startTime;
            if (isBottom && timeSpent < 2500) {
                setManualSegment('TECHNICAL_DEVELOPER');
                window.dispatchEvent(new CustomEvent('aura_log', { detail: 'SYS_EVENT: User Intent Changed: High Affinity for Automation (Fast Scroll)' }));
            }
        };

        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const setManualSegment = (newSegment: UserSegment) => {
        setSegment(newSegment);
        localStorage.setItem('aura_segment', newSegment);
    };

    return { segment, setManualSegment };
}
