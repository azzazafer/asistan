"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Building2,
    Mail,
    MapPin,
    Globe,
    Save,
    ShieldCheck,
    Users,
    Settings as SettingsIcon,
    ChevronRight,
    Plus,
    ArrowLeft,
    Key,
    Lock,
    Instagram,
    Send,
    UserPlus
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";
import { supabase } from "@/lib/db";
import { DoctorsTab } from "@/components/settings/doctors-tab";

export default function SettingsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('hospital');
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [hospitalData, setHospitalData] = useState({
        name: "Aura Global Clinic",
        email: "admin@auraglobal.com",
        address: "Fulya Cad. No:1, Şişli, Istanbul",
        website: "www.auraglobal.com",
        timezone: "UTC+3",
        currency: "USD"
    });

    const [apiSettings, setApiSettings] = useState({
        stripe_secret_key: '',
        stripe_publishable_key: '',
        stripe_webhook_secret: '',
        openai_api_key: '',
        openai_org_id: '',
        twilio_account_sid: '',
        twilio_auth_token: '',
        twilio_phone_number: '',
        instagram_verify_token: '',
        instagram_page_access_token: '', // [NEW] Added for sending messages
        telegram_bot_token: ''
    });

    const [tenantId, setTenantId] = useState<string | null>(null);
    const [team, setTeam] = useState<any[]>([]);

    useEffect(() => {
        const checkAuth = async () => {
            if (!supabase) return;
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login");
                return;
            }

            const role = session.user.user_metadata?.role || 'user';
            setUserRole(role);

            // Fetch Profile & Tenant
            const { data: profile } = await supabase.from('profiles').select('tenant_id').eq('id', session.user.id).single();

            if (profile?.tenant_id) {
                setTenantId(profile.tenant_id);
                // Fetch Hospital Data
                const { data: tenant } = await supabase.from('tenants').select('*').eq('id', profile.tenant_id).single();
                if (tenant) {
                    setHospitalData({
                        name: tenant.name || "Aura Global Clinic",
                        email: tenant.email || session.user.email,
                        address: tenant.address || "",
                        website: tenant.website || "",
                        timezone: tenant.timezone || "UTC+3",
                        currency: tenant.currency || "USD"
                    });

                    if (tenant.settings?.api_keys) {
                        setApiSettings(prev => ({ ...prev, ...tenant.settings.api_keys }));
                    }
                }

                // Fetch Team
                const { data: teamMembers } = await supabase.from('profiles').select('*').eq('tenant_id', profile.tenant_id);
                if (teamMembers) {
                    setTeam(teamMembers.map((m: any) => ({
                        id: m.id,
                        name: m.name || m.email, // Fallback
                        role: m.role || 'Member',
                        email: m.email || 'N/A',
                        status: 'Active'
                    })));
                }

            } else {
                // First time setup: Create default tenant if not exists
                // For now, we wait for user to save to create it
            }
        };

        checkAuth();
    }, [router]);

    const handleSave = async () => {
        setLoading(true);
        if (!supabase) return;

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            let targetTenantId = tenantId;

            // 1. Create Tenant if not exists
            if (!targetTenantId) {
                const { data, error } = await supabase.from('tenants').insert({
                    name: hospitalData.name,
                    email: hospitalData.email,
                    address: hospitalData.address,
                    website: hospitalData.website,
                    owner_id: session.user.id
                }).select().single();

                if (error) throw error;
                targetTenantId = data.id;
                setTenantId(targetTenantId);

                // Link Profile to Tenant
                await supabase.from('profiles').upsert({
                    id: session.user.id,
                    tenant_id: targetTenantId,
                    role: 'admin' // Creator is admin
                });
            } else {
                // 2. Update Existing
                const { error } = await supabase.from('tenants').update({
                    name: hospitalData.name,
                    email: hospitalData.email,
                    address: hospitalData.address,
                    website: hospitalData.website,
                    settings: { api_keys: apiSettings }
                }).eq('id', targetTenantId);

                if (error) throw error;
            }

            toast.success("Settings Saved to Secure Core.");

            // Log this action (Real Audit Log)
            await supabase.from('audit_logs').insert({
                tenant_id: targetTenantId,
                event_type: 'SETTINGS_UPDATE',
                description: `Hospital settings updated by ${session.user.email}`,
                user_id: session.user.id
            });

        } catch (error: any) {
            console.error('Save Error:', error);
            toast.error("Failed to save: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-600/10 rounded-xl">
                        <SettingsIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 font-outfit">Control Center</h1>
                        <p className="text-gray-500 text-sm">Manage your hospital ecosystem and team permissions.</p>
                    </div>
                </div>
                <Link href="/dashboard" className="flex items-center gap-2 px-6 py-3 text-black bg-gray-100 hover:bg-black hover:text-white rounded-xl transition-all font-bold text-sm shadow-sm relative z-50">
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Nav */}
                <div className="w-full lg:w-64 space-y-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('hospital')}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${activeTab === 'hospital' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <div className="flex items-center gap-3">
                            <Building2 className="w-5 h-5 shrink-0" />
                            <span className="font-medium text-sm">Hospital Profile</span>
                        </div>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>

                    {userRole === 'admin' && (
                        <>
                            <button
                                onClick={() => setActiveTab('doctors')}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === 'doctors' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <UserPlus className="w-5 h-5" />
                                    <span className="font-medium text-sm">Doctor Management</span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => setActiveTab('team')}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === 'team' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5" />
                                    <span className="font-medium text-sm">Team Management <span className="text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded ml-2">v2.1</span></span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => setActiveTab('security')}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === 'security' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="font-medium text-sm">Permissions (RBAC)</span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => setActiveTab('locations')}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === 'locations' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5" />
                                    <span className="font-medium text-sm">Branches <span className="text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded ml-2">v2.1</span></span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => setActiveTab('integrations')}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === 'integrations' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Key className="w-5 h-5" />
                                    <span className="font-medium text-sm">Integrations & Keys</span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {activeTab === 'hospital' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Hospital Information</h2>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Hospital Name</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={hospitalData.name}
                                            onChange={(e) => setHospitalData({ ...hospitalData, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Official Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={hospitalData.email}
                                            onChange={(e) => setHospitalData({ ...hospitalData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Full Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={hospitalData.address}
                                            onChange={(e) => setHospitalData({ ...hospitalData, address: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Website</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={hospitalData.website}
                                            onChange={(e) => setHospitalData({ ...hospitalData, website: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all disabled:opacity-50"
                                >
                                    {loading ? "Syncing..." : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'doctors' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <DoctorsTab tenantId={tenantId} />
                        </motion.div>
                    )}

                    {activeTab === 'team' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-gray-900">Hospital Staff <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-1 rounded ml-2">v2.1</span></h2>
                                <button onClick={() => toast("Team Invitation System is scheduled for v2.1.", { icon: "👥" })} className="flex items-center gap-2 px-4 py-2 bg-purple-600/10 text-purple-600 rounded-lg font-bold hover:bg-purple-600/20 transition-all">
                                    <Plus className="w-4 h-4" />
                                    Add Member
                                </button>
                            </div>

                            <div className="space-y-4">
                                {team.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{member.name}</h4>
                                                <p className="text-xs text-gray-500">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.role === 'Admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                {member.role}
                                            </span>
                                            <button className="text-gray-400 hover:text-purple-600 transition-all">
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'security' && userRole === 'admin' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Permission Matrix</h2>
                            <div className="space-y-6">
                                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                                    <h3 className="text-indigo-900 font-bold mb-2">Role: Admin</h3>
                                    <p className="text-indigo-700 text-sm">Full access to all system modules, billing, and team management.</p>
                                </div>
                                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 opacity-60">
                                    <h3 className="text-emerald-900 font-bold mb-2">Role: Doctor (Coming Soon)</h3>
                                    <p className="text-emerald-700 text-sm">Access to patient history, biometric data, and timeline management.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'locations' && userRole === 'admin' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-gray-900">Hospital Branches <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-1 rounded ml-2">v2.1</span></h2>
                                <button onClick={() => toast("Multi-Branch Architecture requires Aura v2.1 Enterprise Upgrade.", { icon: "🏢" })} className="flex items-center gap-2 px-4 py-2 bg-purple-600/10 text-purple-600 rounded-lg font-bold hover:bg-purple-600/20 transition-all">
                                    <Plus className="w-4 h-4" />
                                    Add Branch
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-600/10 text-purple-600 rounded-lg flex items-center justify-center font-bold">
                                                1
                                            </div>
                                            <h4 className="font-bold text-gray-900">Aura Central - Istanbul</h4>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">Primary</span>
                                    </div>
                                    <p className="text-sm text-gray-500 ml-11">Sisli, Istanbul, Turkey</p>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 opacity-80">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-600/10 text-purple-600 rounded-lg flex items-center justify-center font-bold">
                                                2
                                            </div>
                                            <h4 className="font-bold text-gray-900">Aura Antalya Clinic</h4>
                                        </div>
                                        <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-bold">Branch</span>
                                    </div>
                                    <p className="text-sm text-gray-500 ml-11">Muratpasa, Antalya, Turkey</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'integrations' && userRole === 'admin' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2">API Integrations</h2>
                                <p className="text-sm text-gray-500">Manage your connection keys for payment, AI, and messaging services. These are encrypted and stored securely.</p>
                            </div>

                            {/* Stripe Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                    Stripe Payments
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500">Secret Key (sk_...)</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="password"
                                                value={apiSettings.stripe_secret_key}
                                                onChange={(e) => setApiSettings({ ...apiSettings, stripe_secret_key: e.target.value })}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none text-sm font-mono"
                                                placeholder="sk_live_..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500">Publishable Key (pk_...)</label>
                                        <input
                                            type="text"
                                            value={apiSettings.stripe_publishable_key}
                                            onChange={(e) => setApiSettings({ ...apiSettings, stripe_publishable_key: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none text-sm font-mono"
                                            placeholder="pk_live_..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500">Webhook Secret (whsec_...)</label>
                                        <input
                                            type="password"
                                            value={apiSettings.stripe_webhook_secret}
                                            onChange={(e) => setApiSettings({ ...apiSettings, stripe_webhook_secret: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none text-sm font-mono"
                                            placeholder="whsec_..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* OpenAI Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    OpenAI Intelligence
                                </h3>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500">API Key (sk-...)</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="password"
                                            value={apiSettings.openai_api_key}
                                            onChange={(e) => setApiSettings({ ...apiSettings, openai_api_key: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none text-sm font-mono"
                                            placeholder="sk-..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Twilio Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    Twilio Communications
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500">Account SID</label>
                                        <input
                                            type="text"
                                            value={apiSettings.twilio_account_sid}
                                            onChange={(e) => setApiSettings({ ...apiSettings, twilio_account_sid: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none text-sm font-mono"
                                            placeholder="AC..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500">Auth Token</label>
                                        <input
                                            type="password"
                                            value={apiSettings.twilio_auth_token}
                                            onChange={(e) => setApiSettings({ ...apiSettings, twilio_auth_token: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none text-sm font-mono"
                                            placeholder="Token"
                                        />
                                    </div>
                                    <div className="space-y-1 col-span-2">
                                        <label className="text-xs font-semibold text-gray-500">Twilio Phone Number</label>
                                        <input
                                            type="text"
                                            value={apiSettings.twilio_phone_number}
                                            onChange={(e) => setApiSettings({ ...apiSettings, twilio_phone_number: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none text-sm font-mono"
                                            placeholder="+1234567890"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Omnichannel Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                                    Omnichannel Bridge
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                            <Instagram className="w-3 h-3" />
                                            Instagram Verify Token
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="password"
                                                value={apiSettings.instagram_verify_token}
                                                onChange={(e) => setApiSettings({ ...apiSettings, instagram_verify_token: e.target.value })}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none text-sm font-mono"
                                                placeholder="verify_token_..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                            <Instagram className="w-3 h-3" />
                                            Instagram Page Access Token (For Sending)
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="password"
                                                value={apiSettings.instagram_page_access_token}
                                                onChange={(e) => setApiSettings({ ...apiSettings, instagram_page_access_token: e.target.value })}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none text-sm font-mono"
                                                placeholder="EAA..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                            <Send className="w-3 h-3" />
                                            Telegram Bot Token
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="password"
                                                value={apiSettings.telegram_bot_token}
                                                onChange={(e) => setApiSettings({ ...apiSettings, telegram_bot_token: e.target.value })}
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 outline-none text-sm font-mono"
                                                placeholder="123456:ABC-..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end border-t border-gray-100">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Save Keys
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab !== 'hospital' && userRole !== 'admin' && (
                        <div className="h-full flex items-center justify-center text-center p-12">
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Access Restricted</h3>
                                <p className="text-gray-500 max-w-xs mx-auto">Only hospital administrators can access this section. Please contact your administrator for more information.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
