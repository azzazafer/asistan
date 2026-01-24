"use client";

import { useState, useEffect } from "react";
import { UserPlus, Trash2, Edit2, Check, X, Clock, Calendar } from "lucide-react";
import { supabase } from "@/lib/db";
import toast from "react-hot-toast";

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    department: string;
    color: string;
    avatar_url?: string;
    languages: string[] | string;
    rating: number;
    availability: any;
}

export function DoctorsTab({ tenantId }: { tenantId: string | null }) {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // New Doctor Form State
    const [newDoctor, setNewDoctor] = useState({
        name: "",
        specialty: "",
        department: "General",
        color: "#4F46E5",
        avatar_url: "",
        languages: "tr, en",
        rating: 5.0
    });

    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

    useEffect(() => {
        if (tenantId) fetchDoctors();
    }, [tenantId]);

    const fetchDoctors = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('doctors')
            .select('*')
            .eq('tenant_id', tenantId);

        if (error) {
            toast.error("Failed to load doctors");
            console.error(error);
        } else {
            setDoctors(data || []);
        }
        setLoading(false);
    };

    const handleAddDoctor = async () => {
        if (!tenantId) return;
        if (!newDoctor.name || !newDoctor.specialty) {
            toast.error("Name and Specialty are required");
            return;
        }

        try {
            const { data, error } = await supabase.from('doctors').insert({
                tenant_id: tenantId,
                name: newDoctor.name,
                specialty: newDoctor.specialty,
                department: newDoctor.department,
                color: newDoctor.color,
                avatar_url: newDoctor.avatar_url || null,
                languages: newDoctor.languages.split(',').map(l => l.trim()),
                rating: newDoctor.rating,
                availability: {
                    monday: [{ start: '09:00', end: '17:00', available: true }],
                    tuesday: [{ start: '09:00', end: '17:00', available: true }],
                    wednesday: [{ start: '09:00', end: '17:00', available: true }],
                    thursday: [{ start: '09:00', end: '17:00', available: true }],
                    friday: [{ start: '09:00', end: '17:00', available: true }],
                    saturday: [],
                    sunday: []
                }
            }).select().single();

            if (error) throw error;

            setDoctors([...doctors, data]);
            setIsAdding(false);
            setNewDoctor({
                name: "",
                specialty: "",
                department: "General",
                color: "#4F46E5",
                avatar_url: "",
                languages: "tr, en",
                rating: 5.0
            });
            toast.success("Doctor added successfully");

        } catch (error: any) {
            toast.error("Error adding doctor: " + error.message);
        }
    };

    const handleUpdateDoctor = async () => {
        if (!editingDoctor) return;
        try {
            const { error } = await supabase
                .from('doctors')
                .update({
                    name: editingDoctor.name,
                    specialty: editingDoctor.specialty,
                    department: editingDoctor.department,
                    color: editingDoctor.color,
                    avatar_url: editingDoctor.avatar_url,
                    languages: Array.isArray(editingDoctor.languages) ? editingDoctor.languages : (editingDoctor as any).languages?.split(',').map((l: string) => l.trim()) || [],
                    rating: editingDoctor.rating,
                    availability: editingDoctor.availability
                })
                .eq('id', editingDoctor.id);

            if (error) throw error;

            setDoctors(doctors.map(d => d.id === editingDoctor.id ? editingDoctor : d));
            setEditingDoctor(null);
            toast.success("Profile updated");
        } catch (error: any) {
            toast.error("Update failed: " + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will remove the doctor from the calendar.")) return;

        const { error } = await supabase.from('doctors').delete().eq('id', id);
        if (error) {
            toast.error("Failed to delete");
        } else {
            setDoctors(doctors.filter(d => d.id !== id));
            toast.success("Doctor deleted");
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Medical Staff</h2>
                    <p className="text-sm text-gray-500">Manage doctors, their specialties, and calendar availability.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-all"
                >
                    {isAdding ? <X size={18} /> : <UserPlus size={18} />}
                    {isAdding ? "Cancel" : "Add Doctor"}
                </button>
            </div>

            {/* Add Doctor Form */}
            {isAdding && (
                <div className="mb-8 p-6 bg-purple-50 rounded-xl border border-purple-100 animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold text-purple-900 mb-4">New Doctor Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-purple-700">Full Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Dr. House"
                                value={newDoctor.name}
                                onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-purple-700">Specialty</label>
                            <input
                                type="text"
                                placeholder="e.g. Cardiology"
                                value={newDoctor.specialty}
                                onChange={e => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-purple-700">Department</label>
                            <select
                                value={newDoctor.department}
                                onChange={e => setNewDoctor({ ...newDoctor, department: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="General">General</option>
                                <option value="Dental">Dental</option>
                                <option value="Hair Transplant">Hair Transplant</option>
                                <option value="Plastic Surgery">Plastic Surgery</option>
                                <option value="Ophthalmology">Ophthalmology</option>
                                <option value="Bariatric">Bariatric</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-purple-700">Calendar Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={newDoctor.color}
                                    onChange={e => setNewDoctor({ ...newDoctor, color: e.target.value })}
                                    className="h-10 w-20 rounded cursor-pointer"
                                />
                                <span className="text-sm text-purple-600 font-mono">{newDoctor.color}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-purple-700">Languages (comma separated)</label>
                            <input
                                type="text"
                                placeholder="tr, en, ar"
                                value={newDoctor.languages}
                                onChange={e => setNewDoctor({ ...newDoctor, languages: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-purple-700">Initial Rating</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={newDoctor.rating}
                                onChange={e => setNewDoctor({ ...newDoctor, rating: parseFloat(e.target.value) })}
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-semibold text-purple-700">Avatar URL</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={newDoctor.avatar_url}
                                onChange={e => setNewDoctor({ ...newDoctor, avatar_url: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleAddDoctor}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 shadow-md shadow-purple-200"
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            )}

            {/* Doctors List */}
            {loading ? (
                <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>
            ) : doctors.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <UserPlus className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No doctors found.</p>
                    <p className="text-sm text-gray-400">Add your first doctor to activate the calendar.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {doctors.map(doc => (
                        <div key={doc.id} className="p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {doc.avatar_url ? (
                                        <img src={doc.avatar_url} alt={doc.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                    ) : (
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm"
                                            style={{ backgroundColor: doc.color || '#4F46E5' }}
                                        >
                                            {doc.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-bold text-gray-900">{doc.name}</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">{doc.department}</span>
                                            <span>•</span>
                                            <span>{doc.specialty}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setEditingDoctor(doc)}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                        title="Edit Doctor"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Schedule Quick View / Edit Toggle could go here */}
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editingDoctor && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-bold text-gray-900">Edit Doctor Profile</h3>
                            <button onClick={() => setEditingDoctor(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        value={editingDoctor.name}
                                        onChange={e => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Specialty</label>
                                    <input
                                        type="text"
                                        value={editingDoctor.specialty}
                                        onChange={e => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Department</label>
                                    <select
                                        value={editingDoctor.department}
                                        onChange={e => setEditingDoctor({ ...editingDoctor, department: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="General">General</option>
                                        <option value="Dental">Dental</option>
                                        <option value="Hair Transplant">Hair Transplant</option>
                                        <option value="Plastic Surgery">Plastic Surgery</option>
                                        <option value="Ophthalmology">Ophthalmology</option>
                                        <option value="Bariatric">Bariatric</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Color</label>
                                    <input
                                        type="color"
                                        value={editingDoctor.color}
                                        onChange={e => setEditingDoctor({ ...editingDoctor, color: e.target.value })}
                                        className="w-full h-10 px-1 py-1 rounded-lg border border-gray-200 cursor-pointer"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Languages</label>
                                    <input
                                        type="text"
                                        value={Array.isArray(editingDoctor.languages) ? editingDoctor.languages.join(', ') : editingDoctor.languages}
                                        onChange={e => setEditingDoctor({ ...editingDoctor, languages: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Rating</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={editingDoctor.rating}
                                        onChange={e => setEditingDoctor({ ...editingDoctor, rating: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-semibold text-gray-700">Avatar URL</label>
                                    <input
                                        type="text"
                                        value={editingDoctor.avatar_url || ""}
                                        onChange={e => setEditingDoctor({ ...editingDoctor, avatar_url: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Clock size={18} />
                                    Weekly Availability
                                </h4>
                                <div className="space-y-4">
                                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                                        <div key={day} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                                            <span className="w-24 font-semibold text-gray-700 capitalize">{day}</span>
                                            <div className="flex-1 flex flex-wrap gap-2">
                                                {editingDoctor.availability[day]?.length > 0 ? (
                                                    editingDoctor.availability[day].map((slot: any, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-gray-200 text-xs">
                                                            <span>{slot.start} - {slot.end}</span>
                                                            <button
                                                                onClick={() => {
                                                                    const newAvail = { ...editingDoctor.availability };
                                                                    newAvail[day] = newAvail[day].filter((_: any, i: number) => i !== idx);
                                                                    setEditingDoctor({ ...editingDoctor, availability: newAvail });
                                                                }}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-gray-400">Off</span>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        const start = prompt("Start time (HH:MM)", "09:00");
                                                        const end = prompt("End time (HH:MM)", "17:00");
                                                        if (start && end) {
                                                            const newAvail = { ...editingDoctor.availability };
                                                            if (!newAvail[day]) newAvail[day] = [];
                                                            newAvail[day].push({ start, end, available: true });
                                                            setEditingDoctor({ ...editingDoctor, availability: newAvail });
                                                        }
                                                    }}
                                                    className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                                                >
                                                    + Add Slot
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
                            <button
                                onClick={() => setEditingDoctor(null)}
                                className="px-6 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateDoctor}
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
