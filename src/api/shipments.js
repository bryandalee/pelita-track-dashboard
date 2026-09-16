import { supabase } from '../lib/supabaseClient'
import { STAGES } from './pricing'

function formatShort(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
}

// Turns the raw Supabase row (+ its joined events) into the shape
// the dashboard components expect: a fixed-length `dates` array
// aligned to STAGES, with a formatted date string or null per stage.
function toViewModel(row) {
  const dates = STAGES.map(() => null)
  for (const ev of row.shipment_events ?? []) {
    if (ev.stage >= 0 && ev.stage < STAGES.length) {
      dates[ev.stage] = formatShort(ev.event_date)
    }
  }
  return {
    id: row.marking_code,
    dbId: row.id,
    client: row.customer_name,
    origin: row.origin_city,
    destination: row.destination_city,
    mode: row.mode,
    category: row.category,
    weightKg: row.mode === 'Air freight' ? Number(row.quantity) : null,
    volumeCbm: row.mode === 'Sea freight' ? Number(row.quantity) : null,
    quantity: Number(row.quantity),
    rate: Number(row.rate),
    additionalCost: Number(row.additional_cost),
    totalCost: Number(row.total_cost),
    currentStage: row.current_stage,
    dates,
    invoiceNumber: row.invoice_number,
    isPaid: row.is_paid,
  }
}

export async function fetchShipments() {
  const { data, error } = await supabase
    .from('shipments')
    .select('*, shipment_events(stage, event_date)')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data.map(toViewModel)
}

export async function addShipment(input) {
  const { data, error } = await supabase
    .from('shipments')
    .insert({
      marking_code: input.markingCode,
      customer_name: input.customerName,
      customer_phone: input.customerPhone || null,
      item_description: input.itemDescription || null,
      category: input.category,
      mode: input.mode,
      quantity: Number(input.quantity),
      rate: Number(input.rate),
      additional_cost: Number(input.additionalCost) || 0,
      origin_city: input.originCity || null,
      destination_city: input.destinationCity || null,
      destination_address: input.destinationAddress || null,
      received_origin_date: input.receivedOriginDate || null,
      current_stage: 0,
    })
    .select()
    .single()

  if (error) throw error

  // Record the first stage event ("Picked up") so the timeline has a start date.
  await supabase.from('shipment_events').insert({
    shipment_id: data.id,
    stage: 0,
    event_date: input.receivedOriginDate || new Date().toISOString().slice(0, 10),
  })

  return data
}

export async function advanceStage(dbId, nextStage) {
  const { error: eventError } = await supabase
    .from('shipment_events')
    .insert({ shipment_id: dbId, stage: nextStage })

  if (eventError) throw eventError

  const { error: updateError } = await supabase
    .from('shipments')
    .update({ current_stage: nextStage })
    .eq('id', dbId)

  if (updateError) throw updateError
}
