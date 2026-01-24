import { supabase } from '../lib/db';

async function seed() {
    console.log('🌱 Seeding Golden Demo Lead...');

    if (!supabase) {
        console.error('❌ Supabase client not initialized. Check env vars.');
        return;
    }

    const demoLead = {
        name: 'Michael Reaves',
        phone: '+15550192834',
        treatment: 'Hair Transplant',
        status: 'Qualified',
        source: 'Instagram_Ads',
        channel: 'WhatsApp',
        culture: 'en',
        notes: 'High-intent VIP client. Asking about FUE vs DHI. Budget flexible.',
        score: 88,
        score_rank: 'PLATINUM',
        date: new Date().toISOString(),
        history: [
            { role: 'user', content: 'Hi, I saw your ad about the Sapphire FUE. How much is it?' },
            { role: 'assistant', content: 'Hello Michael! The Sapphire FUE starts at €2,450. It includes 2 nights hotel and transfer. Are you looking to book for this month?' },
            { role: 'user', content: 'Yes, I am planning for next week. Can I see some results?' },
            { role: 'assistant', content: 'Absolutely. Here is a link to our gallery...' }
        ]
    };

    const { error } = await supabase.from('leads').upsert(demoLead);

    if (error) {
        console.error('❌ Failed to seed lead:', error);
    } else {
        console.log('✅ Golden Demo Lead (Michael Reaves) inserted successfully.');
    }
}

seed();
