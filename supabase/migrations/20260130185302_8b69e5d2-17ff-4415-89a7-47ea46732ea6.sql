-- Create user_events table for analytics tracking
CREATE TABLE public.user_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id UUID NOT NULL,
  event_name TEXT NOT NULL,
  event_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient querying by guest_id and event_name
CREATE INDEX idx_user_events_guest_id ON public.user_events(guest_id);
CREATE INDEX idx_user_events_event_name ON public.user_events(event_name);
CREATE INDEX idx_user_events_created_at ON public.user_events(created_at);

-- Create composite index for unique check per day
CREATE UNIQUE INDEX idx_user_events_unique_daily ON public.user_events(guest_id, event_name, event_date);

-- Enable RLS
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert events (public tracking)
CREATE POLICY "Anyone can insert events"
ON public.user_events
FOR INSERT
WITH CHECK (true);

-- Only allow reading via service role (admin access)
CREATE POLICY "Service role can read events"
ON public.user_events
FOR SELECT
USING (false);