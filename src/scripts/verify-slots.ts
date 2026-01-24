import { HospitalAdapterFactory } from './src/lib/hbys-bridge';
import { SlotMappingManager } from './src/lib/slot-mapping';

async function verifySlotMapping() {
    console.log("--- AURA OS SLOT MAPPING VERIFICATION ---");

    // 1. Test Factory
    console.log("\n[1] Testing Factory...");
    const fonet = HospitalAdapterFactory.getAdapter('fonet');
    const tiga = HospitalAdapterFactory.getAdapter('tiga');
    const native = HospitalAdapterFactory.getAdapter('native');

    console.log(`- Resolved: ${fonet.name} (${fonet.version})`);
    console.log(`- Resolved: ${tiga.name} (${tiga.version})`);
    console.log(`- Resolved: ${native.name} (${native.version})`);

    // 2. Test Availability (Mocked)
    console.log("\n[2] Testing Availability Logic...");
    const date = "2026-02-15";
    const slots = await SlotMappingManager.getRealTimeSlots('default_clinic', 'Dental', date);
    console.log(`- Slots found for ${date}:`, slots.length);

    // 3. Test Booking Flow
    console.log("\n[3] Testing Booking Flow...");
    const bookingResult = await SlotMappingManager.bookSlot('default_clinic', "2026-02-15T10:00:00Z", {
        firstName: "Verification",
        lastName: "Test",
        phone: "+905550000000"
    });

    console.log("- Booking Result:", bookingResult.success ? "SUCCESS" : "FAILED");
    if (bookingResult.appointmentId) console.log(`- AppointmentRef: ${bookingResult.appointmentId}`);

    console.log("\n--- VERIFICATION COMPLETE ---");
}

verifySlotMapping().catch(console.error);
