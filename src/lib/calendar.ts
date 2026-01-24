/**
 * Aura Calendar Integration - Doctor Scheduling
 * Handles doctor availability, appointment slots, and calendar sync
 */

import { supabase } from './db';

// ============================================
// TYPES
// ============================================
export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    department: string;
    languages: string[];
    rating: number;
    avatar_url?: string;
    availability: WeeklySchedule;
}

export interface WeeklySchedule {
    monday: TimeSlot[];
    tuesday: TimeSlot[];
    wednesday: TimeSlot[];
    thursday: TimeSlot[];
    friday: TimeSlot[];
    saturday: TimeSlot[];
    sunday: TimeSlot[];
}

export interface TimeSlot {
    start: string; // HH:MM format
    end: string;
    available: boolean;
}

export interface Appointment {
    id: string;
    doctorId: string;
    patientId: string;
    patientName: string;
    treatment: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    duration: number; // minutes
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
    createdAt: string;
}

// ============================================
// SAMPLE DOCTORS DATABASE
// ============================================
// ============================================
// NO MOCK DATA - LIVE DB ONLY
// ============================================

// ============================================
// NO MOCK DATA - LIVE DB ONLY
// ============================================

// ============================================
// DOCTOR LOOKUP (LIVE DB)
// ============================================
export const getDoctorById = async (id: string, tenantId: string): Promise<Doctor | null> => {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('id', id)
        .eq('tenant_id', tenantId)
        .single();

    if (error) return null;
    return data;
};

export const getDoctorsByDepartment = async (department: string, tenantId: string): Promise<Doctor[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('tenant_id', tenantId)
        .ilike('department', department);

    if (error) return [];
    return data || [];
};

// ============================================
// AVAILABILITY CHECK (LIVE DB)
// ============================================
const getDayOfWeek = (date: string): keyof WeeklySchedule => {
    const days: (keyof WeeklySchedule)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
};

export const getAvailableSlots = async (doctorId: string, date: string, tenantId: string): Promise<TimeSlot[]> => {
    const doctor = await getDoctorById(doctorId, tenantId);
    if (!doctor) return [];

    const dayOfWeek = getDayOfWeek(date);
    const daySlots = doctor.availability[dayOfWeek];

    // Filter out already booked slots from live DB
    const { data: booked } = await supabase
        .from('appointments')
        .select('start_time')
        .eq('doctor_id', doctorId)
        .eq('tenant_id', tenantId)
        .eq('status', 'confirmed')
        .filter('start_time', 'gte', `${date}T00:00:00Z`)
        .filter('start_time', 'lte', `${date}T23:59:59Z`);

    const bookedTimes = booked?.map((a: any) => {
        const d = new Date(a.start_time);
        return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
    }) || [];

    return daySlots.filter(slot =>
        slot.available && !bookedTimes.includes(slot.start)
    );
};

// ============================================
// APPOINTMENT MANAGEMENT (LIVE DB)
// ============================================
export const createAppointment = async (
    params: {
        doctorId: string,
        patientId: string,
        patientName: string,
        treatment: string,
        date: string,
        time: string,
        tenantId: string,
        duration?: number,
        notes?: string
    }
): Promise<Appointment | null> => {
    if (!supabase) return null;

    const startTime = new Date(`${params.date}T${params.time}:00Z`);
    const endTime = new Date(startTime.getTime() + (params.duration || 30) * 60000);

    const { data: appointment, error } = await supabase
        .from('appointments')
        .insert({
            tenant_id: params.tenantId,
            lead_id: params.patientId,
            doctor_id: params.doctorId,
            patient_name: params.patientName,
            title: `${params.patientName} - ${params.treatment}`,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            status: 'pending',
            type: 'consultation',
            notes: params.notes
        })
        .select()
        .single();

    if (error) {
        console.error('[Calendar] Create Fail:', error.message);
        return null;
    }

    return appointment;
};

export const confirmAppointment = async (appointmentId: string, tenantId: string): Promise<boolean> => {
    if (!supabase) return false;
    const { error } = await supabase
        .from('appointments')
        .update({ status: 'confirmed' })
        .eq('id', appointmentId)
        .eq('tenant_id', tenantId);

    return !error;
};

export const cancelAppointment = async (appointmentId: string, tenantId: string, reason?: string): Promise<boolean> => {
    if (!supabase) return false;
    const { error } = await supabase
        .from('appointments')
        .update({
            status: 'cancelled',
            notes: reason ? `Reason: ${reason}` : undefined
        })
        .eq('id', appointmentId)
        .eq('tenant_id', tenantId);

    return !error;
};

export const getPatientAppointments = async (patientId: string, tenantId: string): Promise<Appointment[]> => {
    if (!supabase) return [];
    const { data } = await supabase
        .from('appointments')
        .select('*')
        .eq('lead_id', patientId)
        .eq('tenant_id', tenantId)
        .order('start_time', { ascending: true });

    return data || [];
};

export const getDoctorAppointments = async (doctorId: string, tenantId: string, date?: string): Promise<Appointment[]> => {
    if (!supabase) return [];
    let query = supabase
        .from('appointments')
        .select('*')
        .eq('doctor_id', doctorId)
        .eq('tenant_id', tenantId)
        .neq('status', 'cancelled');

    if (date) {
        query = query.filter('start_time', 'gte', `${date}T00:00:00Z`)
            .filter('start_time', 'lte', `${date}T23:59:59Z`);
    }

    const { data } = await query.order('start_time', { ascending: true });
    return data || [];
};

export const getUpcomingAppointments = async (tenantId: string, limit: number = 10): Promise<Appointment[]> => {
    if (!supabase) return [];
    const today = new Date().toISOString();
    const { data } = await supabase
        .from('appointments')
        .select('*')
        .eq('tenant_id', tenantId)
        .gte('start_time', today)
        .neq('status', 'cancelled')
        .order('start_time', { ascending: true })
        .limit(limit);

    return data || [];
};

// ============================================
// SMART ROUTING (Auto-assign doctor)
// ============================================
export const findBestDoctor = async (
    treatment: string,
    preferredLanguage: string,
    preferredDate: string,
    tenantId: string
): Promise<{ doctor: Doctor; availableSlots: TimeSlot[] } | null> => {
    // Map treatment to department
    const departmentMap: Record<string, string> = {
        'implant': 'Dental',
        'diş': 'Dental',
        'dental': 'Dental',
        'saç': 'Hair Transplant',
        'hair': 'Hair Transplant',
        'transplant': 'Hair Transplant',
        'göz': 'Ophthalmology',
        'eye': 'Ophthalmology',
        'lasik': 'Ophthalmology',
        'burun': 'Plastic Surgery',
        'nose': 'Plastic Surgery',
        'rhinoplasty': 'Plastic Surgery',
        'estetik': 'Plastic Surgery',
        'plastic': 'Plastic Surgery'
    };

    const lowerTreatment = treatment.toLowerCase();
    let department = '';

    for (const [key, dept] of Object.entries(departmentMap)) {
        if (lowerTreatment.includes(key)) {
            department = dept;
            break;
        }
    }

    if (!department) {
        console.warn('[Calendar] Could not determine department for treatment:', treatment);
        return null;
    }

    // Find doctors in department
    let candidates = await getDoctorsByDepartment(department, tenantId);

    // Prefer doctors who speak the patient's language
    const languageSpeakers = candidates.filter(d => d.languages.includes(preferredLanguage));
    if (languageSpeakers.length > 0) {
        candidates = languageSpeakers;
    }

    // Find first available doctor
    for (const doctor of candidates.sort((a, b) => b.rating - a.rating)) {
        const slots = await getAvailableSlots(doctor.id, preferredDate, tenantId);
        if (slots.length > 0) {
            return { doctor, availableSlots: slots };
        }
    }

    return null;
};
