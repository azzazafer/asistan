"use client";

import { useLanguage } from "../context/LanguageContext";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useLanguage();

    return (
        <div className="flex items-center gap-4">
            {/* 1. Theme Toggle (Chameleon) */}
            <button
                onClick={toggleTheme}
                className="relative flex items-center gap-2 p-1 bg-black/40 border border-white/10 rounded-full w-40 h-10 transition-all hover:border-white/25 overflow-hidden group shadow-2xl"
            >
                <div
                    className="absolute inset-y-1 h-8 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-600 transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    style={{
                        left: theme === "CYBER" ? "4px" : "80px",
                        width: "76px"
                    }}
                />
                <div className={`flex-1 text-[10px] font-mono font-bold z-10 text-center transition-colors ${theme === "CYBER" ? "text-white" : "text-gray-500"}`}>CYBER</div>
                <div className={`flex-1 text-[10px] font-mono font-bold z-10 text-center transition-colors ${theme === "STERILE" ? "text-white" : "text-gray-500"}`}>STERILE</div>
            </button>
        </div>
    );
}
