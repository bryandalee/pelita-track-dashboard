// Illustrative mock data for the Pelita Track dashboard concept.
// Route stages every shipment passes through, in order.
export const STAGES = [
  'Picked up',
  'Export customs',
  'Freight in transit',
  'Import customs',
  'Out for delivery',
  'Delivered',
]

// All-in rates, per CBM (sea) or per KG (air) — no separate duty/VAT/insurance.
export const SEA_CATEGORIES = [
  { id: 'tas', label: 'Tas', ratePerCbm: 6000000 },
  { id: 'barang_umum', label: 'Barang umum', ratePerCbm: 6500000 },
  { id: 'lartas_ringan', label: 'Lartas ringan', ratePerCbm: 7000000 },
  { id: 'lartas_berat', label: 'Lartas berat', ratePerCbm: 7500000 },
  { id: 'semi_garment', label: 'Semi garment', ratePerCbm: 8000000 },
  { id: 'garment', label: 'Garment', ratePerCbm: 10300000 },
]

export const AIR_CATEGORIES = [
  { id: 'branded', label: 'Branded', ratePerKg: 230000 },
  { id: 'non_branded', label: 'Non-branded', ratePerKg: 220000 },
]

export function getCategory(mode, categoryId) {
  const list = mode === 'Air freight' ? AIR_CATEGORIES : SEA_CATEGORIES
  return list.find((c) => c.id === categoryId)
}

export function calcAllInCost(shipment) {
  const category = getCategory(shipment.mode, shipment.category)
  if (shipment.mode === 'Air freight') {
    return Math.round(category.ratePerKg * shipment.weightKg)
  }
  return Math.round(category.ratePerCbm * shipment.volumeCbm)
}

export const SHIPMENTS = [
  {
    id: 'WB-2026-0417',
    client: 'PT Sumber Makmur Elektronik',
    origin: 'Shenzhen',
    destination: 'Jakarta',
    mode: 'Sea freight',
    category: 'lartas_ringan',
    weightKg: 1840,
    volumeCbm: 6.2,
    currentStage: 5,
    dates: ['Mar 02', 'Mar 04', 'Mar 06', 'Mar 24', 'Mar 25', 'Mar 26'],
  },
  {
    id: 'WB-2026-0418',
    client: 'CV Rejeki Tekstil Nusantara',
    origin: 'Guangzhou',
    destination: 'Jakarta',
    mode: 'Sea freight',
    category: 'garment',
    weightKg: 3120,
    volumeCbm: 11.4,
    currentStage: 2,
    dates: ['Mar 18', 'Mar 20', 'Mar 21', null, null, null],
  },
  {
    id: 'WB-2026-0421',
    client: 'Toko Mainan Ceria',
    origin: 'Yiwu',
    destination: 'Surabaya',
    mode: 'Sea freight',
    category: 'barang_umum',
    weightKg: 980,
    volumeCbm: 4.8,
    currentStage: 3,
    dates: ['Mar 15', 'Mar 17', 'Mar 18', 'Apr 05', null, null],
  },
  {
    id: 'WB-2026-0429',
    client: 'PT Cahaya Mesin Presisi',
    origin: 'Ningbo',
    destination: 'Jakarta',
    mode: 'Air freight',
    category: 'non_branded',
    weightKg: 340,
    volumeCbm: 1.1,
    currentStage: 1,
    dates: ['Mar 27', 'Mar 28', null, null, null, null],
  },
  {
    id: 'WB-2026-0431',
    client: 'UD Berkah Rumah Tangga',
    origin: 'Guangzhou',
    destination: 'Jakarta',
    mode: 'Sea freight',
    category: 'barang_umum',
    weightKg: 2260,
    volumeCbm: 8.7,
    currentStage: 4,
    dates: ['Mar 10', 'Mar 12', 'Mar 13', 'Apr 01', 'Apr 02', null],
  },
  {
    id: 'WB-2026-0436',
    client: 'CV Gadget Pintar Indonesia',
    origin: 'Shenzhen',
    destination: 'Surabaya',
    mode: 'Air freight',
    category: 'branded',
    weightKg: 128,
    volumeCbm: 0.6,
    currentStage: 0,
    dates: ['Mar 29', null, null, null, null, null],
  },
]
