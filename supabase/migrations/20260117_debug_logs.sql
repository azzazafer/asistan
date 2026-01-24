-- Create Debug Logs table for production monitoring
CREATE TABLE IF NOT EXISTS debug_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name TEXT NOT NULL,
    data JSONB,
    severity TEXT DEFAULT 'INFO',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE debug_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert logs (since we'll be calling this from edge/backend)
CREATE POLICY "Allow anonymous log insertion" ON debug_logs
    FOR INSERT WITH CHECK (true);

-- Allow admins to see logs
CREATE POLICY "Allow admin to view logs" ON debug_logs
    FOR SELECT USING (true);
