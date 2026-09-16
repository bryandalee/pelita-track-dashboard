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
2. In the Supabase SQL Editor, run `supabase_schema.sql` from this repo — this creates both tables, sets up Row Level Security, and inserts 6 fictional demo shipments
3. Copy `.env.example` to `.env.local` and fill in your project's URL and anon public key (found under Project Settings → Data API), plus a password of your choice for the admin page:

       VITE_SUPABASE_URL=...
       VITE_SUPABASE_ANON_KEY=...
       VITE_ADMIN_PASSWORD=...

4. Install and run:

       npm install
       npm run dev

## ⚠️ Security note — read before using with real data

The `/admin` page is protected by a **client-side password check only** — the password lives in an environment variable that gets bundled into the JavaScript sent to the browser, so it can be read by anyone who inspects the page source. This is fine for a portfolio demo where the "cost" of someone bypassing it is just seeing a form, but it is **not real authentication**.

The database's write access is also intentionally open (see the RLS policies in `supabase_schema.sql`) so the demo works without a login system. **Before this project ever touches real customer data**, both of these need to be replaced with real Supabase Auth (email/password or magic link login) and RLS policies that check `auth.uid()`.

## ⚠️ Disclaimer

Shipping rates reflect Pelita Cargo's actual all-in pricing structure at the time this was built, used here for a realistic demo. This is a portfolio project, not a live booking system.
