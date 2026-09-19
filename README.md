# Pelita Track — Cargo Shipment Dashboard

A full-stack shipment tracking dashboard for China–Indonesia freight forwarding, built as a portfolio project to demonstrate React + a real backend (Supabase/Postgres). The visual language borrows from real freight-forwarding paperwork — customs stamps, shipping manifests, and invoice ledgers — instead of a generic SaaS dashboard look.

**All demo data is fictional.** This project does not contain any real customer data.

## ✨ Features

- **Public tracking page (`/`)** — searchable shipment manifest, per-shipment timeline with real dates, and an all-in cost breakdown, all read live from a Postgres database via Supabase
- **Admin page (`/admin`)** — add new shipments, and advance a shipment's status stage (which records a timestamped event, shown on the tracking timeline)
- **Shipping cost estimator** — a standalone calculator using Pelita Cargo's actual all-in flat-rate pricing (sea billed per CBM by category, air billed per KG by branded/non-branded)

## 🛠️ Tech Stack

- React 19 + Vite, React Router
- Supabase (Postgres + auto-generated REST API) as the backend — no custom server needed
- Plain CSS (custom design system) — IBM Plex Sans / IBM Plex Mono

## 🗄️ Database Schema

Two tables (see `supabase_schema.sql`):

- **`shipments`** — one row per shipment: marking code, customer, category, mode, quantity, rate, all-in total (computed column), route, current stage, invoice/payment info
- **`shipment_events`** — one row per stage transition (`shipment_id`, `stage`, `event_date`), so the tracking timeline can show a real date per stage instead of a single status flag

## ⚙️ Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. In the Supabase SQL Editor, run `supabase_schema.sql` from this repo, then `tighten_rls.sql` — together these create both tables, set up Row Level Security (public read, writes restricted to logged-in users only), and insert 6 fictional demo shipments
3. Create your own admin account: Supabase Dashboard → Authentication → Users → **Add user** (use your own email + a password). This is the only account that will be able to sign in to `/admin` — there is no public sign-up.
4. Copy `.env.example` to `.env.local` and fill in your project's URL and anon public key (found under Project Settings → Data API):

       VITE_SUPABASE_URL=...
       VITE_SUPABASE_ANON_KEY=...

5. Install and run:

       npm install
       npm run dev

## 🔒 Admin authentication

`/admin` is protected by real **Supabase Auth** — signing in requires the email/password of an account created directly in the Supabase dashboard. Write access to the database is enforced by Row Level Security policies that check for a logged-in (`authenticated`) session, at the database level — not by anything in the React code. This means the protection holds even if someone bypasses the UI and calls the API directly.

**Try it:** `/admin` — login with `demo@pelitatrack.app` / `PelitaDemo2026`. All data behind this login is fictional demo data.

## ⚠️ Disclaimer

Shipping rates reflect Pelita Cargo's actual all-in pricing structure at the time this was built, used here for a realistic demo. This is a portfolio project, not a live booking system.
