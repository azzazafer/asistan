import { NextRequest, NextResponse } from 'next/server';
import { LearningService } from '@/lib/ai/learning';
import { supabase } from '@/lib/supabase-client';

/**
 * LEARNING TRIGGER WEBHOOK
 * Called when a lead's status changes to "Randevu Onaylandı" (Appointment Confirmed)
 * Triggers self-learning AI to analyze the winning conversation
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { leadId, newStatus, tenantId } = body;

        console.log(`[Learning Webhook] Lead ${leadId} status changed to: ${newStatus}`);

        // Only trigger learning on successful conversions
        const successStatuses = ['Randevu Onaylandı', 'Deposit Received', 'Converted'];

        if (!successStatuses.includes(newStatus)) {
            return NextResponse.json({
                message: 'Status not a conversion, learning skipped',
                triggered: false
            });
        }

        // Fetch lead details and chat history
        const { data: lead, error: leadError } = await supabase
            .from('leads')
            .select('*')
            .eq('id', leadId)
            .single();

        if (leadError || !lead) {
            console.error('[Learning Webhook] Lead not found:', leadError);
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        // Fetch chat history
        const { data: messages, error: messagesError } = await supabase
            .from('messages')
            .select('*')
            .eq('lead_id', leadId)
            .order('created_at', { ascending: true });

        if (messagesError) {
            console.error('[Learning Webhook] Failed to fetch messages:', messagesError);
            return NextResponse.json({ error: 'Messages fetch failed' }, { status: 500 });
        }

        // Format history for AI analysis
        const chatHistory = messages?.map((m: any) => ({
            role: m.sender_type === 'user' ? 'user' : 'assistant',
            content: m.content,
            timestamp: m.created_at
        })) || [];

        // TRIGGER LEARNING
        await LearningService.analyzeWin(
            leadId,
            chatHistory,
            tenantId || lead.tenant_id || 'default_clinic'
        );

        console.log(`[Learning Webhook] ✅ Learning triggered for lead ${leadId}`);

        return NextResponse.json({
            success: true,
            message: 'Learning analysis triggered',
            leadId,
            messagesAnalyzed: chatHistory.length
        });

    } catch (error: any) {
        console.error('[Learning Webhook] Error:', error);
        return NextResponse.json({
            error: 'Internal server error',
            details: error.message
        }, { status: 500 });
    }
}

/**
 * HEALTH CHECK
 */
export async function GET() {
    return NextResponse.json({
        status: 'active',
        endpoint: '/api/webhooks/lead-status',
        purpose: 'Triggers AI learning on successful conversions'
    });
}
