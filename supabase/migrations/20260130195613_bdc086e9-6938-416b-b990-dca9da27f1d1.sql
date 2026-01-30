-- Drop the restrictive SELECT policies
DROP POLICY IF EXISTS "Service role can read events" ON public.user_events;
DROP POLICY IF EXISTS "Service role can read waitlist" ON public.waitlist_signups;

-- Create permissive SELECT policies for the admin dashboard
-- Note: This allows anyone to read the data. For production, you'd want proper auth.
CREATE POLICY "Allow reading events for analytics"
ON public.user_events
FOR SELECT
USING (true);

CREATE POLICY "Allow reading waitlist for analytics"
ON public.waitlist_signups
FOR SELECT
USING (true);