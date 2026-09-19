-- ============================================================
-- Pelita Track — tighten write access to real Supabase Auth
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- (Run AFTER the original supabase_schema.sql)
-- ============================================================

-- Remove the old "anyone can write" policies
drop policy if exists "Anyone can insert shipments" on shipments;
drop policy if exists "Anyone can update shipments" on shipments;
drop policy if exists "Anyone can insert shipment events" on shipment_events;

-- Only logged-in (Supabase Auth) users can write.
-- Since you'll be the only account that ever gets created, this
-- effectively means "only you, once logged in".
create policy "Authenticated users can insert shipments" on shipments
  for insert to authenticated with check (true);

create policy "Authenticated users can update shipments" on shipments
  for update to authenticated using (true);

create policy "Authenticated users can insert shipment events" on shipment_events
  for insert to authenticated with check (true);

-- Public read access is unchanged — the tracking page stays public.
