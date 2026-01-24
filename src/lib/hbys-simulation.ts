/**
 * Aura HBYS (Hospital Information Management System) Bridge Simulation
 * This acts as the "Source of Truth" for doctor schedules.
 */

export interface TimeSlot {
    time: string;
    available: boolean;
}

export interface DoctorSchedule {
    doctorId: string;
    name: string;
    specialty: string;
    calendar: Record<string, TimeSlot[]>; // Date (YYYY-MM-DD) -> Slots
}

// Mock Database of Doctor Schedules
const DOCTOR_SCHEDULES: DoctorSchedule[] = [
    {
        doctorId: "dr-1",
        name: "Dr. Can Yılmaz",
        specialty: "Saç Ekimi Uzmanı",
        calendar: {
            "2025-12-22": [
                { time: "09:00", available: false },
                { time: "10:30", available: true },
                { time: "14:00", available: true }
            ],
            "2025-12-23": [
                { time: "09:00", available: true },
                { time: "11:00", available: true }
            ]
        }
    },
    {
        doctorId: "dr-2",
        name: "Dr. Ayşe Demir",
        specialty: "Estetik Diş Hekimi",
        calendar: {
            "2025-12-22": [
                { time: "11:00", available: true },
                { time: "15:00", available: false }
            ]
        }
    }
];

/**
 * Checks if a doctor is available for a specific treatment on a specific date.
 */
export const checkActualAvailability = (treatment: string, date: string) => {
    const normalizedTreatment = treatment.toLowerCase();

    // Find doctor by specialty
    const doctor = DOCTOR_SCHEDULES.find(d =>
        d.specialty.toLowerCase().includes(normalizedTreatment)
    ) || DOCTOR_SCHEDULES[0];

    const slots = doctor.calendar[date] || [
        { time: "09:00", available: true },
        { time: "13:30", available: true },
        { time: "16:00", available: true }
    ];

    return {
        doctor: doctor.name,
        specialty: doctor.specialty,
        availableSlots: slots.filter(s => s.available).map(s => s.time),
        note: doctor.calendar[date] ? "Aura linked to live HBYS feed." : "Default schedule active for this date."
    };
};

/**
 * Commits a booking to the simulated HBYS
 */
export const commitHBYSBooking = (doctorId: string, date: string, time: string) => {
    console.log(`[HBYS Sync] Committing booking for ${doctorId} on ${date} at ${time}`);
    return { success: true, hbysReference: `AURA-${Math.random().toString(36).toUpperCase().substr(2, 6)}` };
};
