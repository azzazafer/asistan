"use client";

import { useState, useEffect, useRef } from "react";
import { createBrowserClient } from '@supabase/ssr';
import { ChatList } from "@/components/inbox/ChatList";
import { ChatWindow } from "@/components/inbox/ChatWindow";
import { Lead } from "@/lib/types";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function InboxPage() {
    const [supabase] = useState(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    ));

    const [leads, setLeads] = useState<Lead[]>([]);
    const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [loading, setLoading] = useState(true);

    const activeLead = leads.find(l => l.id === activeLeadId) || null;

    // Fetch Leads
    const fetchLeads = async () => {
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('date', { ascending: false }); // Should utilize last_message_at eventually

            if (error) throw error;
            if (data) setLeads(data);
        } catch (e) {
            console.error(e);
            toast.error("Failed to sync inbox");
        } finally {
            setLoading(false);
        }
    };

    // Realtime Sync
    useEffect(() => {
        fetchLeads();

        const channel = supabase
            .channel('inbox-realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, (payload) => {
                // Determine if it's the active chat
                if (activeLeadId && payload.new && (payload.new as any).id === activeLeadId) {
                    // Update immediate (Optional: check delta to avoid flicker)
                }
                fetchLeads(); // Brute force refresh for safety
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [activeLeadId]);

    const handleSendMessage = async (text: string) => {
        if (!activeLead) return;
        setIsSending(true);

        try {
            const response = await fetch('/api/chat/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: activeLead.phone,
                    message: text,
                    channel: activeLead.channel || 'WhatsApp'
                })
            });

            if (!response.ok) throw new Error('Send failed');

            // Optimistic Update
            const newMsg = { role: 'assistant', content: text, timestamp: new Date().toISOString() };
            const updatedHistory = [...(activeLead.history || []), newMsg];

            setLeads(prev => prev.map(l => l.id === activeLeadId ? { ...l, history: updatedHistory } : l));

            // Note: Realtime will overwrite this eventually, which is fine.
        } catch (e) {
            toast.error("Message failed to send");
        } finally {
            setIsSending(false);
        }
    };

    const handleToggleAI = async (paused: boolean) => {
        if (!activeLeadId) return;

        const tId = toast.loading(paused ? "Pausing AI..." : "Reactivating AI...");
        try {
            const { error } = await supabase
                .from('leads')
                .update({ ai_paused: paused })
                .eq('id', activeLeadId);

            if (error) throw error;

            toast.success(paused ? "Human Control Active" : "AI Autopilot Engaged", { id: tId });

            // Optimistic update
            setLeads(prev => prev.map(l => l.id === activeLeadId ? { ...l, ai_paused: paused } : l));

        } catch (e) {
            toast.error("Failed to toggle AI", { id: tId });
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 rounded-full border-4 border-black border-t-transparent animate-spin" /></div>;

    return (
        <div className="flex flex-col h-screen w-full bg-white fixed inset-0 z-[2000] overflow-hidden">
            {/* Header for Mobile/Navigation */}
            <div className="h-14 bg-black text-white flex items-center justify-between px-4 shrink-0 md:hidden relative z-[3000]">
                <Link href="/dashboard" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-neutral-300">
                    <ArrowLeft size={14} /> Back to Dashboard
                </Link>
                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Unified Inbox</div>
            </div>

            {/* Desktop Navigation Link (Hidden on Mobile) */}
            <div className="hidden md:flex h-12 bg-black text-white items-center px-6 shrink-0 justify-between">
                <Link href="/dashboard" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft size={12} /> Dashboard
                </Link>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Nextoria Unified Inbox</span>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className={`${activeLeadId ? 'hidden md:flex' : 'flex'} w-full md:w-auto h-full`}>
                    <ChatList
                        leads={leads}
                        selectedId={activeLeadId}
                        onSelect={(l) => setActiveLeadId(l.id || null)}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>
                <div className={`${!activeLeadId ? 'hidden md:flex' : 'flex'} flex-1 h-full`}>
                    {/* Mobile Back Button within Window */}
                    {activeLeadId && (
                        <button onClick={() => setActiveLeadId(null)} className="md:hidden absolute top-2 left-2 z-50 p-2 bg-black/10 rounded-full">
                            <ArrowLeft size={16} />
                        </button>
                    )}
                    <ChatWindow
                        lead={activeLead}
                        onSendMessage={handleSendMessage}
                        onToggleAI={handleToggleAI}
                        isSending={isSending}
                        isAiPaused={activeLead?.ai_paused || false}
                    />
                </div>
            </div>
        </div>
    );
}
