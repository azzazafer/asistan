
import React from 'react';
import { Shield, Lock, Eye, Database, Globe } from 'lucide-react';

export default function PrivacyPolicy() {
   return (
      <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
         <div className="max-w-4xl mx-auto px-6 py-20">

            {/* Header */}
            <header className="mb-20 text-center">
               <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-3xl mb-8 shadow-2xl">
                  <Shield size={32} />
               </div>
               <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                  Privacy <span className="text-neutral-300">Protocol</span>
               </h1>
               <p className="text-lg text-neutral-500 font-bold uppercase tracking-widest">
                  Aura Health OS v4.0 • Data Protection Standards
               </p>
            </header>

            {/* Content */}
            <div className="space-y-16">

               <Section
                  icon={<Lock size={24} />}
                  title="Data Encryption"
                  description="All patient data is encrypted at rest using AES-256 and in transit via TLS 1.3. We utilize deterministic security layers to ensure unauthorized access is mathematically impossible."
               />

               <Section
                  icon={<Eye size={24} />}
                  title="AI Processing & Consent"
                  description="Aura OS utilizes Artificial Intelligence to process communications. By using our services, you consent to the automated analysis of text and media for the purpose of medical coordination. Human oversight is available upon request."
               />

               <Section
                  icon={<Database size={24} />}
                  title="Data Retention"
                  description="We retain communication logs for the duration of the treatment lifecycle plus 5 years for legal compliance. You possess the 'Right to be Forgotten'—requests for deletion can be processed within 24 hours."
               />

               <Section
                  icon={<Globe size={24} />}
                  title="Global Compliance"
                  description="We adhere to KVKK (Turkey), GDPR (Europe), and HIPAA (USA) guidelines regarding the handling of sensitive health information (PHI). Your data typically resides in Frankfurt (EU) or Istanbul (TR) based on tenant configuration."
               />

               <div className="p-8 bg-black/[0.02] rounded-[3rem] border border-black/5 mt-20">
                  <h3 className="text-xl font-black tracking-tighter mb-4">Contact Data Officer</h3>
                  <p className="text-neutral-500 mb-6">For inquiries regarding your data privacy:</p>
                  <a href="mailto:security@aura-os.ai" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                     Contact Security Team
                  </a>
               </div>

            </div>

            <footer className="mt-32 border-t border-black/10 pt-10 text-center">
               <p className="text-xs font-black text-neutral-300 uppercase tracking-[0.2em]">
                  © 2026 Aura Health OS. All systems operational.
               </p>
            </footer>
         </div>
      </div>
   );
}

function Section({ icon, title, description }: any) {
   return (
      <div className="flex flex-col md:flex-row gap-8 items-start group">
         <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
            {icon}
         </div>
         <div>
            <h3 className="text-2xl font-black tracking-tighter mb-3">{title}</h3>
            <p className="text-neutral-600 leading-relaxed font-medium text-lg border-l-2 border-black/10 pl-6">
               {description}
            </p>
         </div>
      </div>
   );
}
