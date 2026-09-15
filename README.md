# Pelita Track — Cargo Shipment Dashboard

A concept dashboard for tracking China–Indonesia freight forwarding shipments, built as a portfolio piece to demonstrate React frontend skills. The visual language borrows from real freight-forwarding paperwork — customs stamps, shipping manifests, and invoice ledgers — instead of a generic SaaS dashboard look.

**All shipment and pricing data on this project is illustrative**, generated to resemble a real cargo forwarding operation like [Pelita Cargo](https://github.com/bryandalee).

## ✨ Features

- **Shipment manifest** — a ruled, table-style list of shipments (waybill code, route, client, quantity, status), searchable by waybill number or client name
- **Status stamps** — shipment status shown as customs-stamp-style badges (Picked up / At customs / In transit / Out for delivery / Delivered) instead of generic colored pills
- **Shipment detail & timeline** — click any shipment to see its full route timeline and an all-in cost breakdown
- **Shipping cost estimator** — an interactive calculator using Pelita Cargo's real all-in flat-rate pricing: sea freight billed per CBM by cargo category (tas, barang umum, lartas ringan/berat, semi garmen, garment), air freight billed per KG by branded/non-branded category — no separate duty or VAT line, since pricing is already all-in

## 🛠️ Tech Stack

- React 19 + Vite
- Plain CSS (custom design system, no UI framework) — IBM Plex Sans / IBM Plex Mono
- No backend — all data is local mock data (`src/data/mockShipments.js`)

## 📂 Project Structure

    src/
    ├── components/
    │   ├── Header.jsx          — top bar + search
    │   ├── OverviewStats.jsx   — summary stats strip
    │   ├── ShipmentList.jsx    — manifest table
    │   ├── ShipmentDetail.jsx  — timeline + cost breakdown for selected shipment
    │   ├── CostEstimator.jsx   — interactive import cost calculator
    │   └── Stamp.jsx           — status stamp badge
    ├── data/
    │   └── mockShipments.js    — mock shipment + cargo category data
    ├── App.jsx
    └── main.jsx

## ⚙️ Running Locally

    npm install
    npm run dev

Then open the local URL Vite prints (usually `http://localhost:5173`).

## 🚀 Build

    npm run build

Outputs a production build to `dist/`, ready to deploy (e.g. to Vercel).

## ⚠️ Disclaimer

Rates reflect Pelita Cargo's actual all-in pricing structure at the time this was built, used here for a realistic demo. This is a portfolio project, not a live booking system — actual quotes may vary and should be confirmed directly.
