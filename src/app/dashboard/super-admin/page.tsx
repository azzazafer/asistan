'use client';

import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Server, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getSuperAdminStats } from '@/app/actions/super-admin-stats';

export default function SuperAdminPage() {
    const { t } = useI18n();
    const [stats, setStats] = useState<any>({ leads: 0, clinics: 0, recentActivity: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            const data = await getSuperAdminStats();
            if (data) {
                setStats(data);
            }
            setLoading(false);
        };
        loadStats();
    }, []);

    return (
        <div className="space-y-6">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title={t.stats.revenue}
                    value="$124,500"
                    change={`+12.5% ${t.stats.changeMonth}`}
                    icon={<DollarSign className="text-emerald-400" />}
                    color="text-emerald-400"
                />
                <StatCard
                    title={t.stats.activeClinics}
                    value={loading ? '...' : stats.clinics.toString()}
                    change="+2"
                    icon={<Globe className="text-blue-400" />}
                    color="text-blue-400"
                />
                <StatCard
                    title={t.stats.totalLeads}
                    value={loading ? '...' : stats.leads.toString()}
                    change={`${t.stats.changeToday} +${stats.recentActivity.length}`}
                    icon={<Users className="text-amber-400" />}
                    color="text-amber-400"
                />
                <StatCard
                    title={t.stats.systemHealth}
                    value="%99.9"
                    change={t.stats.stable}
                    icon={<Server className="text-purple-400" />}
                    color="text-purple-400"
                />
            </div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Audit Log / Live Feed */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                        <h3 className="font-semibold text-white">{t.feed.title}</h3>
                        <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">{t.feed.liveBadge}</span>
                    </div>
                    <div className="p-0">
                        <div className="divide-y divide-slate-800/50">
                            {loading ? (
                                <div className="p-4 text-slate-500 text-sm">Loading feed...</div>
                            ) : stats.recentActivity.map((activity: any, i: number) => (
                                <div key={i} className="p-4 hover:bg-slate-800/50 transition-colors flex items-start gap-4">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`}></div>
                                    <div>
                                        <p className="text-sm text-slate-300">
                                            <span className="text-purple-400 font-medium">Lead</span> {activity.name} ({activity.status})
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {new Date(activity.created_at).toLocaleTimeString()} • {activity.tenant_id}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {!loading && stats.recentActivity.length === 0 && (
                                <div className="p-4 text-slate-500 text-sm">No recent activity detected.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tenant Health */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-4">{t.tenants.title}</h3>
                    <div className="space-y-4">
                        <TenantStatus name="Estetik Internation" status={t.tenants.healthy} load={42} />
                        <TenantStatus name="Dr. Yaman Surgery" status={t.tenants.warning} load={85} />
                        <TenantStatus name="Global Health" status={t.tenants.healthy} load={24} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function getStatusColor(status: string) {
    if (status === 'Randevu Alındı') return 'bg-green-500';
    if (status === 'İletişime Geçildi') return 'bg-blue-500';
    if (status === 'İptal') return 'bg-red-500';
    return 'bg-slate-500';
}

function StatCard({ title, value, change, icon, color }: any) {
    return (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
                    <p className="text-2xl font-bold text-white mt-2">{value}</p>
                </div>
                <div className={`p-2 bg-slate-800 rounded-lg ${color} bg-opacity-20`}>
                    {icon}
                </div>
            </div>
            <p className={`text-xs mt-4 ${change.includes('+') ? 'text-green-400' : 'text-slate-500'}`}>
                {change}
            </p>
        </div>
    );
}

function TenantStatus({ name, status, load }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${status === 'healthy' || status === 'Sağlıklı' || status === 'صحي' ? 'bg-green-500' : 'bg-amber-500'}`} />
                <span className="text-sm text-slate-300">{name}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${load > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${load}%` }}></div>
                </div>
                <span className="text-xs text-slate-500">%{load}</span>
            </div>
        </div>
    );
}
