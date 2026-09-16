// Pelita Cargo's real all-in shipping rates and shared reference data.
export const STAGES = [
  'Picked up',
  'Export customs',
  'Freight in transit',
  'Import customs',
  'Out for delivery',
  'Delivered',
]

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

export function categoryLabel(mode, categoryId) {
  return getCategory(mode, categoryId)?.label ?? categoryId
}
