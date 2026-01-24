import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, Plane, Stethoscope, HeartPulse, FileText, Calendar } from 'lucide-react';

interface PatientJourneyProps {
    lead: any;
}

const STAGES = [
    { id: 'discovery', label: 'Keşif', icon: <FileText size={14} />, statusMatches: ['Yeni', 'New'] },
    { id: 'consultation', label: 'Konsültasyon', icon: <MessageIcon size={14} />, statusMatches: ['Whatsapp', 'Instagram', 'Telegram', 'Replied'] },
    { id: 'validation', label: 'Doktor Onayı', icon: <Stethoscope size={14} />, statusMatches: ['In Review', 'Analiz'] },
    { id: 'scheduling', label: 'Planlama', icon: <Calendar size={14} />, statusMatches: ['Randevu', 'Deposit', 'Flight'] },
    { id: 'operation', label: 'Operasyon', icon: <HeartPulse size={14} />, statusMatches: ['Operasyon', 'Surgery'] },
    { id: 'aftercare', label: 'Takip', icon: <CheckCircle size={14} />, statusMatches: ['Completed', 'Takip'] },
];

function MessageIcon({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    )
}

export function PatientJourney({ lead }: PatientJourneyProps) {
    // Determine current stage index based on lead status
    const getCurrentStageIndex = () => {
        // 1. Try exact match
        const exactIndex = STAGES.findIndex(s => s.statusMatches.includes(lead.status));
        if (exactIndex !== -1) return exactIndex;

        // 2. Fallback logic
        if (lead.score > 80) return 3; // High score -> Likely scheduling
        if (lead.score > 50) return 2; // Mid score -> Validation
        return 1; // Default to Consultation if not New
    };

    const currentIndex = getCurrentStageIndex();

    return (
        <div className="w-full py-6 px-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between min-w-[600px] relative">
                {/* Connector Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-100 -z-10 rounded-full" />

                {/* Active Line (Progress) */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
                    className="absolute top-1/2 left-0 h-1 bg-black -z-10 rounded-full transition-all duration-1000"
                />

                {STAGES.map((stage, i) => {
                    const isActive = i === currentIndex;
                    const isCompleted = i < currentIndex;
                    const isPending = i > currentIndex;

                    return (
                        <div key={stage.id} className="flex flex-col items-center gap-3 relative group">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 bg-white
                  ${isActive ? 'border-black text-black scale-125 shadow-xl' : ''}
                  ${isCompleted ? 'border-black bg-black text-white' : ''}
                  ${isPending ? 'border-neutral-200 text-neutral-300' : ''}
                `}
                            >
                                {isCompleted ? <CheckCircle size={16} /> : stage.icon}
                            </motion.div>

                            <div className="text-center">
                                <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-black' : 'text-neutral-400'}`}>
                                    {stage.label}
                                </p>
                                {isActive && (
                                    <motion.span
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-[8px] font-bold text-neural-500 bg-black/5 px-2 py-0.5 rounded-full mt-1 inline-block"
                                    >
                                        Current Stage
                                    </motion.span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
