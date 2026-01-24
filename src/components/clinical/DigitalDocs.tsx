import React from 'react';
import { FileText, Pill, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { toast } from 'react-hot-toast';

interface DigitalDocsProps {
    lead: any;
}

export function DigitalDocs({ lead }: DigitalDocsProps) {

    const generateConsent = () => {
        try {
            const doc = new jsPDF();
            const date = new Date().toLocaleDateString();
            const doctorName = lead.assigned_doctor_name || 'Dr. Neural AI';

            // Header
            doc.setFontSize(22);
            doc.text('MEDICAL CONSENT FORM', 105, 20, { align: 'center' });

            doc.setFontSize(10);
            doc.text('AURA CLINIC INTERNATIONAL', 105, 28, { align: 'center' });

            // Patient Info
            doc.setFontSize(12);
            doc.text(`Patient Name: ${lead.name}`, 20, 50);
            doc.text(`Date of Birth: ${lead.age || 'N/A'}`, 20, 58);
            doc.text(`Procedure: ${lead.treatment || 'Consultation'}`, 20, 66);
            doc.text(`Date: ${date}`, 150, 50);

            // Body
            doc.setFontSize(10);
            const text = `
I, ${lead.name}, hereby authorize ${doctorName} and the medical staff of Aura Clinic to perform the procedure listed above.

1. I understand the nature of the procedure, its risks, and benefits.
2. I have had the opportunity to ask questions and have received satisfactory answers.
3. I understand that no guarantee has been made as to the results that may be obtained.
4. I consent to the administration of anesthesia as deemed necessary by the physician.
5. I consent to be photographed for medical records and strict confidentiality will be maintained.

I declare that I have disclosed all my medical history including allergies and medications.
        `;

            doc.text(text, 20, 80, { maxWidth: 170 });

            // Signatures
            doc.text('_______________________', 20, 200);
            doc.text('Patient Signature', 20, 208);

            doc.text('_______________________', 120, 200);
            doc.text('Doctor Signature', 120, 208);

            doc.save(`${lead.name.replace(/\s+/g, '_')}_Consent_Form.pdf`);
            toast.success('Consent Form Generated');
        } catch (e) {
            console.error(e);
            toast.error('Failed to generate PDF');
        }
    };

    const generatePrescription = () => {
        try {
            const doc = new jsPDF();
            const date = new Date().toLocaleDateString();
            const doctorName = lead.assigned_doctor_name || 'Dr. Neural AI';

            // Header
            doc.setFillColor(79, 70, 229); // Indigo
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.text('Rx PRESCRIPTION', 20, 25);
            doc.setFontSize(10);
            doc.text(`Aura Clinic - ${doctorName}`, 150, 25);

            // Reset
            doc.setTextColor(0, 0, 0);

            // Patient
            doc.setFontSize(12);
            doc.text(`Patient: ${lead.name}`, 20, 60);
            doc.text(`Date: ${date}`, 160, 60);

            // Meds
            doc.setFontSize(14);
            doc.text('Standard Post-Op Protocol:', 20, 80);

            const meds = [
                { name: 'Amoxicillin 500mg', dose: '1 tab every 8 hours (5 days) - Antibiotic' },
                { name: 'Paracetamol 500mg', dose: '1 tab every 6 hours (if pain) - Painkiller' },
                { name: 'Prednisol 5mg', dose: '1 tab morning/evening (3 days) - Anti-inflammatory' },
                { name: 'Panthenol Foam', dose: 'Apply to recipient area daily (15 mins)' }
            ];

            let y = 100;
            meds.forEach((m, i) => {
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(`${i + 1}. ${m.name}`, 25, y);
                doc.setFont('helvetica', 'normal');
                doc.text(m.dose, 25, y + 7);
                y += 20;
            });

            // Footer
            doc.setFontSize(10);
            doc.text('This is a digitally generated valid prescription.', 105, 250, { align: 'center' });
            doc.text(`${doctorName} - Verified System Identity`, 105, 255, { align: 'center' });

            doc.save(`${lead.name.replace(/\s+/g, '_')}_Prescription.pdf`);
            toast.success('Prescription Generated');
        } catch (e) {
            console.error(e);
            toast.error('Failed to generate PDF');
        }
    };

    return (
        <div className="flex gap-4 mt-6">
            <button onClick={generateConsent} className="flex items-center gap-2 px-4 py-3 bg-white border border-black/5 shadow-sm rounded-xl hover:bg-black/5 transition-all text-xs font-black uppercase tracking-widest text-neutral-600">
                <FileText size={16} className="text-indigo-600" />
                <span>Generate Consent Form</span>
            </button>

            <button onClick={generatePrescription} className="flex items-center gap-2 px-4 py-3 bg-white border border-black/5 shadow-sm rounded-xl hover:bg-black/5 transition-all text-xs font-black uppercase tracking-widest text-neutral-600">
                <Pill size={16} className="text-rose-600" />
                <span>Generate Prescription</span>
            </button>
        </div>
    );
}
