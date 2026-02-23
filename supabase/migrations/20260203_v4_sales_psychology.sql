-- V4 SALES PSYCHOLOGY UPGRADE
-- Migration: 20260203_v4_sales_psychology.sql
-- Purpose: Add tables for delayed responses and sentiment tracking

-- 1. DELAYED RESPONSES TABLE (Manager Approval Queue)
CREATE TABLE IF NOT EXISTS public.delayed_responses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
    response_type text NOT NULL, -- 'manager_approval', 'value_package', 'custom'
    scheduled_at timestamptz NOT NULL,
    message_template text NOT NULL,
    status text DEFAULT 'pending', -- 'pending', 'sent', 'cancelled'
    metadata jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    sent_at timestamptz
);

-- 2. SENTIMENT ANALYSIS LOG (Track emotional states)
CREATE TABLE IF NOT EXISTS public.sentiment_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
    score decimal NOT NULL, -- -1 to +1
    emotional_state text NOT NULL, -- 'neutral', 'positive', 'negative', 'crisis'
    grief_detected boolean DEFAULT false,
    crisis_keywords text[],
    recommended_action text, -- 'proceed', 'delay_3days', 'abort'
    reasoning text,
    created_at timestamptz DEFAULT now()
);

-- 3. INDEXES for Performance
CREATE INDEX IF NOT EXISTS idx_delayed_responses_scheduled 
    ON public.delayed_responses(scheduled_at) 
    WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_delayed_responses_lead 
    ON public.delayed_responses(lead_id, status);

CREATE INDEX IF NOT EXISTS idx_sentiment_logs_lead 
    ON public.sentiment_logs(lead_id, created_at DESC);

-- 4. ROW LEVEL SECURITY
ALTER TABLE public.delayed_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sentiment_logs ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "delayed_responses_service_role" ON public.delayed_responses
    FOR ALL TO service_role USING (true);

CREATE POLICY "sentiment_logs_service_role" ON public.sentiment_logs
    FOR ALL TO service_role USING (true);

-- 5. COMMENTS for Documentation
COMMENT ON TABLE public.delayed_responses IS 'Queue for delayed AI responses (Manager Approval simulation)';
COMMENT ON COLUMN public.delayed_responses.response_type IS 'Type of delayed response: manager_approval, value_package, etc.';
COMMENT ON COLUMN public.delayed_responses.scheduled_at IS 'When this response should be sent';
COMMENT ON COLUMN public.delayed_responses.status IS 'pending = not sent yet, sent = delivered, cancelled = aborted';

COMMENT ON TABLE public.sentiment_logs IS 'Tracks emotional state of leads to prevent insensitive messages';
COMMENT ON COLUMN public.sentiment_logs.score IS 'Emotional valence: -1 (very negative) to +1 (very positive)';
COMMENT ON COLUMN public.sentiment_logs.grief_detected IS 'True if lead is experiencing grief or crisis';
COMMENT ON COLUMN public.sentiment_logs.recommended_action IS 'What AI should do: proceed, delay, or abort';
