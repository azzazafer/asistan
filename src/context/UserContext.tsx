"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type UserRole = 'clinic' | 'agency';

interface UserContextType {
    userRole: UserRole;
    setRole: (role: UserRole) => void;
    isDemoOpen: boolean;
    setDemoOpen: (open: boolean) => void;
    isCoreModulesOpen: boolean;
    setCoreModulesOpen: (open: boolean) => void;
    isLegalModalOpen: boolean;
    setLegalModalOpen: (open: boolean) => void;
    legalType: 'kvkk' | 'terms';
    setLegalType: (type: 'kvkk' | 'terms') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userRole, setUserRole] = useState<UserRole>('clinic');
    const [isDemoOpen, setDemoOpen] = useState(false);
    const [isCoreModulesOpen, setCoreModulesOpen] = useState(false);
    const [isLegalModalOpen, setLegalModalOpen] = useState(false);
    const [legalType, setLegalType] = useState<'kvkk' | 'terms'>('kvkk');
    const [mounted, setMounted] = useState(false);

    // Otonom Hafıza: Initial load from localStorage
    useEffect(() => {
        const savedRole = localStorage.getItem('aura_user_role') as UserRole;
        if (savedRole === 'clinic' || savedRole === 'agency') {
            setUserRole(savedRole);
        }
        setMounted(true);
    }, []);

    // Otonom Hafıza: Sync to localStorage
    const setRole = (role: UserRole) => {
        setUserRole(role);
        localStorage.setItem('aura_user_role', role);
    };

    return (
        <UserContext.Provider value={{ userRole, setRole, isDemoOpen, setDemoOpen, isCoreModulesOpen, setCoreModulesOpen, isLegalModalOpen, setLegalModalOpen, legalType, setLegalType }}>
            <div className={`theme-transition ${mounted ? `${userRole}-theme` : ''}`}>
                {children}
            </div>
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
