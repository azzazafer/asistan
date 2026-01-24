import React from 'react';
import { Lead } from '@/lib/types';
import { Search, MessageCircle, Instagram, Send, Globe, Phone, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ChatListProps {
    leads: Lead[];
    selectedId: string | null;
    onSelect: (lead: Lead) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function ChatList({ leads, selectedId, onSelect, searchQuery, onSearchChange }: ChatListProps) {
    const filteredLeads = leads
        .filter(l =>
            l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.phone.includes(searchQuery)
        )
        .sort((a, b) => {
            // Sort by last_message_at if available, otherwise by date
            const dateA = new Date(a.last_message_at || a.date).getTime();
            const dateB = new Date(b.last_message_at || b.date).getTime();
            return dateB - dateA;
        });

    const getChannelIcon = (channel: string) => {
        switch (channel) {
            case 'WhatsApp': return <MessageCircle size={14} className="text-green-500" />;
            case 'Instagram': return <Instagram size={14} className="text-pink-500" />;
            case 'Telegram': return <Send size={14} className="text-sky-500" />;
            default: return <Globe size={14} className="text-blue-500" />;
        }
    };

    return (
        <div className="flex flex-col h-full bg-white border-r border-black/5 w-full md:w-[320px] lg:w-[380px] shrink-0">
            <div className="p-4 border-b border-black/5 bg-neutral-50/50">
                <h2 className="text-lg font-black tracking-tighter mb-4">Messages</h2>
                <div className="relative group">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search subjects..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-black/5 rounded-xl text-sm font-bold focus:outline-none focus:border-black/20 focus:shadow-sm transition-all placeholder:text-neutral-400"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
                {filteredLeads.map((lead) => (
                    <button
                        key={lead.id}
                        onClick={() => onSelect(lead)}
                        className={`w-full p-4 flex items-center gap-4 border-b border-black/[0.02] transition-all hover:bg-neutral-50 text-left relative group ${selectedId === lead.id ? 'bg-indigo-50/50 hover:bg-indigo-50' : ''}`}
                    >
                        {selectedId === lead.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />}

                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neutral-100 to-white border border-black/5 flex items-center justify-center shrink-0 shadow-sm relative">
                            <span className="text-sm font-black text-black">{getInitials(lead.name)}</span>
                            {lead.channel && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                                    {getChannelIcon(lead.channel)}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className={`text-sm font-bold truncate ${selectedId === lead.id ? 'text-black' : 'text-neutral-700'}`}>{lead.name}</span>
                                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-tight shrink-0">
                                    {/* Simplistic time display */}
                                    {lead.last_message_at ? new Date(lead.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-neutral-500 truncate pr-2 font-medium">
                                    {lead.history && lead.history.length > 0
                                        ? (lead.history[lead.history.length - 1].content as string).substring(0, 30) + '...'
                                        : 'No messages yet'}
                                </p>
                                {lead.status === 'Randevu Alındı' && (
                                    <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" title="Converted" />
                                )}
                            </div>
                        </div>
                    </button>
                ))}
                {filteredLeads.length === 0 && (
                    <div className="p-8 text-center text-neutral-400">
                        <p className="text-xs font-bold uppercase tracking-widest">No subjects found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function getInitials(name: string) {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
}
