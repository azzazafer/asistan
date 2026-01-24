"use client";

import { createBrowserClient } from '@supabase/ssr'
import React, { useEffect, useState } from 'react';
import {
    Building2, Users, CreditCard, Activity,
    Search, Filter, MoreVertical,
    Lock, Unlock, Shield, Zap, UserPlus, Scan, Trash2,
    BookOpen, Edit, Plus, CheckCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Tenant {
    id: string;
    name: string;
    status: 'active' | 'suspended';
    tier: 'PRO' | 'ENTERPRISE' | 'FREE';
    created_at: string;
    owner_id: string;
}

export default function SuperAdminPage() {
    const [supabase] = useState(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    ));
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'clinics' | 'glossary'>('clinics');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newClinic, setNewClinic] = useState({ name: '', tier: 'PRO' });

    // Glossary State
    const [glossary, setGlossary] = useState<any[]>([]);
    const [glossarySearch, setGlossarySearch] = useState('');
    const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
    const [editingTerm, setEditingTerm] = useState<any>(null);

    useEffect(() => {
        fetchTenants();
        fetchGlossary();
    }, []);

    const fetchGlossary = async () => {
        const { data } = await supabase.from('medical_glossary').select('*').order('term');
        if (data) setGlossary(data);
    };

    const fetchTenants = async () => {
        try {
            // Need to run phase6-saas.sql for 'tier' and 'status' columns
            const { data, error } = await supabase
                .from('tenants')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setTenants(data as any);
            }
        } catch (e) {
            console.error('Fetch Tenants Error', e);
        } finally {
            setLoading(false);
        }
    };

    const createClinic = async () => {
        if (!newClinic.name) return toast.error('Clinic Name is required');

        try {
            const { data, error } = await supabase
                .from('tenants')
                .insert({
                    name: newClinic.name,
                    tier: newClinic.tier,
                    status: 'active'
                })
                .select()
                .single();

            if (error) throw error;

            setTenants(prev => [data as any, ...prev]);
            toast.success('Clinic Created Successfully');
            setIsModalOpen(false);
            setNewClinic({ name: '', tier: 'PRO' });
        } catch (e: any) {
            toast.error('Failed to create clinic: ' + e.message);
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
        try {
            const { error } = await supabase
                .from('tenants')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setTenants(prev => prev.map(t => t.id === id ? { ...t, status: newStatus as any } : t));
            toast.success(`Tenant ${newStatus === 'active' ? 'Activated' : 'Suspended'}`);
        } catch (e) {
            toast.error('Failed to update status');
            console.error(e);
        }
    };

    const totalRevenue = tenants.reduce((sum, t) => {
        if (t.status !== 'active') return sum;
        const prices = { 'PRO': 99, 'ENTERPRISE': 499, 'FREE': 0 };
        return sum + (prices[t.tier] || 0);
    }, 0);

    const stats = [
        { label: 'Total Clinics', value: tenants.length, icon: <Building2 className="text-indigo-600" /> },
        { label: 'Active Subscriptions', value: tenants.filter(t => t.status === 'active').length, icon: <CreditCard className="text-emerald-600" /> },
        { label: 'Estimated Monthly Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <Activity className="text-amber-600" /> },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 p-8 font-sans text-neutral-900 relative">
            {/* Header */}
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                        <Shield className="fill-black" size={28} />
                        AURA MASTER CONTROL
                    </h1>
                    <p className="text-neutral-500 font-medium mt-1 tracking-wide text-sm">Super Admin Console • SaaS Operations</p>
                </div>
                <div className="flex gap-3">
                    {/* Portal Navigator (Unicorn Integration) */}
                    <div className="hidden lg:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-black/5 shadow-sm mr-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mr-2">Portals:</span>
                        <a href="/dashboard" className="text-[10px] font-bold text-indigo-600 hover:underline">Hospital</a>
                        <span className="text-neutral-300">|</span>
                        <a href="/agent" className="text-[10px] font-bold text-indigo-600 hover:underline">Agent</a>
                        <span className="text-neutral-300">|</span>
                        <a href="/portal" className="text-[10px] font-bold text-indigo-600 hover:underline">Patient</a>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-5 py-2.5 bg-black text-white rounded-xl font-bold text-sm hover:bg-neutral-800 transition-all shadow-lg shadow-black/20 flex items-center gap-2">
                        <UserPlus size={16} />
                        New Clinic
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('clinics')}
                    className={`px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'clinics' ? 'bg-black text-white shadow-lg' : 'bg-white text-neutral-400 hover:text-black'}`}
                >
                    Clinic Management
                </button>
                <button
                    onClick={() => setActiveTab('glossary')}
                    className={`px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'glossary' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-neutral-400 hover:text-indigo-600'}`}
                >
                    Medical Glossary
                </button>
            </div>

            {activeTab === 'clinics' ? (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                                <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center border border-black/5">
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="text-neutral-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className="text-3xl font-black tracking-tight">{stat.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Table */}
                    <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden min-h-[500px]">
                        {/* Visual Bar */}
                        <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full" />

                        {/* Toolbar */}
                        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search clinics..."
                                    className="pl-10 pr-4 py-2 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/5 w-64"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400"><Filter size={18} /></button>
                                <button onClick={fetchTenants} className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400"><Activity size={18} /></button>
                            </div>
                        </div>

                        {/* Table */}
                        <table className="w-full">
                            <thead className="bg-neutral-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-neutral-400">Clinic Name</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-neutral-400">Tier</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-neutral-400">Created</th>
                                    <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-neutral-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {loading ? (
                                    <tr><td colSpan={5} className="p-10 text-center text-neutral-400">Loading SaaS Data...</td></tr>
                                ) : tenants.length === 0 ? (
                                    <tr><td colSpan={5} className="p-10 text-center text-neutral-400">No clinics found. (Did you run the migration?)</td></tr>
                                ) : tenants.filter(t => t.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((tenant) => (
                                    <tr key={tenant.id} className="group hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs">
                                                    {tenant.name?.[0] || 'C'}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm text-neutral-900">{tenant.name || 'Unnamed Clinic'}</div>
                                                    <div className="text-xs text-neutral-400 font-medium tracking-wide">{tenant.id.substring(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest
                                        ${tenant.tier === 'ENTERPRISE' ? 'bg-purple-50 border-purple-100 text-purple-600' :
                                                    tenant.tier === 'PRO' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' :
                                                        'bg-neutral-50 border-neutral-100 text-neutral-500'}
                                    `}>
                                                {tenant.tier === 'ENTERPRISE' && <Zap size={10} />}
                                                {tenant.tier || 'FREE'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleStatus(tenant.id, tenant.status)}
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all
                                        ${tenant.status === 'active'
                                                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100'
                                                        : 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100'}
                                    `}>
                                                {tenant.status === 'active' ? <Unlock size={12} /> : <Lock size={12} />}
                                                {tenant.status === 'active' ? 'Active' : 'Locked'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-neutral-500 tabular-nums">
                                            {new Date(tenant.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        localStorage.setItem('aura_impersonate_id', tenant.id);
                                                        // Use router.push for same-tab navigation to ensure session persistence
                                                        window.location.href = '/dashboard';
                                                    }}
                                                    title="Gözcü Moduyla Gir"
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md shadow-indigo-200">
                                                    <Scan size={14} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wide">GİRİŞ</span>
                                                </button>

                                                <button
                                                    onClick={async () => {
                                                        if (confirm(`"${tenant.name}" kliniğini silmek istediğinize emin misiniz? Bu işlem geri alınamaz!`)) {
                                                            const { error } = await supabase.from('tenants').delete().eq('id', tenant.id);
                                                            if (error) {
                                                                toast.error("Silme Başarısız: " + error.message);
                                                            } else {
                                                                toast.success("Klinik Silindi");
                                                                fetchTenants(); // Refresh list
                                                            }
                                                        }
                                                    }}
                                                    title="Sil"
                                                    className="p-2 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <GlossaryManager
                    supabase={supabase}
                    glossary={glossary}
                    searchTerm={glossarySearch}
                    onRefresh={fetchGlossary}
                    onSearchChange={setGlossarySearch}
                />
            )}

            {/* CREATE MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-black mb-1">Create New Clinic</h2>
                        <p className="text-neutral-500 text-xs mb-6">Provision a new SaaS tenant environment.</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Clinic Name</label>
                                <input
                                    autoFocus
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black/5 focus:border-neutral-400 outline-none transition-all"
                                    placeholder="e.g. Acme Aesthetic"
                                    value={newClinic.name}
                                    onChange={e => setNewClinic({ ...newClinic, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Plan Tier</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setNewClinic({ ...newClinic, tier: 'PRO' })}
                                        className={`p-3 rounded-xl border text-left transition-all ${newClinic.tier === 'PRO' ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 hover:bg-neutral-50'}`}>
                                        <div className="font-bold text-sm">Pro Plan</div>
                                        <div className="text-[10px] opacity-60">$99/mo</div>
                                    </button>
                                    <button
                                        onClick={() => setNewClinic({ ...newClinic, tier: 'ENTERPRISE' })}
                                        className={`p-3 rounded-xl border text-left transition-all ${newClinic.tier === 'ENTERPRISE' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white border-neutral-200 hover:bg-neutral-50'}`}>
                                        <div className="font-bold text-sm">Enterprise</div>
                                        <div className="text-[10px] opacity-60">$499/mo</div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-xl font-bold text-sm transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={createClinic}
                                className="flex-1 py-3 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-sm transition-colors">
                                Create Tenant
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function GlossaryManager({ supabase, glossary, searchTerm, onRefresh, onSearchChange }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTerm, setEditingTerm] = useState<any>(null);
    const [formData, setFormData] = useState({
        term: '',
        category: 'General',
        definition_tr: '',
        definition_en: '',
        definition_ar: '',
        confidence_score: 0.9,
        verified_by: 'super-admin'
    });

    const categories = ['Surgery', 'Dermatology', 'Diagnostics', 'General', 'Medication', 'Anatomy'];

    const handleSave = async () => {
        if (!formData.term || !formData.definition_tr) return toast.error('Term and TR Definition required');

        try {
            if (editingTerm) {
                const { error } = await supabase.from('medical_glossary').update(formData).eq('id', editingTerm.id);
                if (error) throw error;
                toast.success('Term Updated');
            } else {
                const { error } = await supabase.from('medical_glossary').insert(formData);
                if (error) throw error;
                toast.success('Term Added');
            }
            onRefresh();
            setIsModalOpen(false);
            resetForm();
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    const resetForm = () => {
        setFormData({
            term: '',
            category: 'General',
            definition_tr: '',
            definition_en: '',
            definition_ar: '',
            confidence_score: 0.9,
            verified_by: 'super-admin'
        });
        setEditingTerm(null);
    };

    const filtered = glossary.filter((g: any) =>
        g.term?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search glossary..."
                        className="pl-10 pr-4 py-2 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/5 w-64 bg-white"
                        value={searchTerm}
                        onChange={e => onSearchChange(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                    <Plus size={16} /> Add Term
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-neutral-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-neutral-400">Term</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-neutral-400">Category</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-neutral-400">Definition (TR)</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                            <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-neutral-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {filtered.map((item: any) => (
                            <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-sm">{item.term}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-neutral-100 rounded-md text-[10px] font-bold uppercase text-neutral-600">{item.category}</span>
                                </td>
                                <td className="px-6 py-4 text-xs text-neutral-500 max-w-xs truncate">{item.definition_tr}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600">
                                        <CheckCircle size={12} /> Verified
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => { setEditingTerm(item); setFormData(item); setIsModalOpen(true); }}
                                        className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                                    >
                                        <Edit size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl my-8">
                        <h2 className="text-xl font-black mb-1">{editingTerm ? 'Edit Term' : 'Add New Term'}</h2>
                        <p className="text-neutral-400 text-xs mb-6">Medical Glossary & Jargon Intelligence</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Term / Keyword</label>
                                <input
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black/5 outline-none"
                                    value={formData.term}
                                    onChange={e => setFormData({ ...formData, term: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Category</label>
                                <select
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Confidence Score</label>
                                <input
                                    type="number" step="0.1" max="1" min="0"
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold"
                                    value={formData.confidence_score}
                                    onChange={e => setFormData({ ...formData, confidence_score: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Definition (Turkish)</label>
                                <textarea
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold h-24"
                                    value={formData.definition_tr}
                                    onChange={e => setFormData({ ...formData, definition_tr: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Definition (English)</label>
                                <textarea
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm font-bold h-20"
                                    value={formData.definition_en}
                                    onChange={e => setFormData({ ...formData, definition_en: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-xl font-bold text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm"
                            >
                                {editingTerm ? 'Save Changes' : 'Create Term'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

