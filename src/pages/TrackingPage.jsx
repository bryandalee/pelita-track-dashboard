import { useEffect, useMemo, useState } from 'react'
import OverviewStats from '../components/OverviewStats'
import ShipmentList from '../components/ShipmentList'
import ShipmentDetail from '../components/ShipmentDetail'
import CostEstimator from '../components/CostEstimator'
import { fetchShipments } from '../api/shipments'

export default function TrackingPage() {
  const [shipments, setShipments] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchShipments()
      .then((rows) => {
        if (cancelled) return
        setShipments(rows)
        setSelectedId(rows[0]?.id ?? null)
        setStatus('ready')
      })
      .catch((err) => {
        console.error(err)
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return shipments
    return shipments.filter(
      (s) => s.id.toLowerCase().includes(q) || s.client.toLowerCase().includes(q)
    )
  }, [shipments, query])

  const selected = shipments.find((s) => s.id === selectedId) ?? filtered[0]

  if (status === 'loading') {
    return <main className="main"><p className="empty-note">Loading shipments…</p></main>
  }

  if (status === 'error') {
    return (
      <main className="main">
        <p className="empty-note">
          Couldn't load shipments. Check that your Supabase URL/anon key are set in
          <code> .env.local</code> and that the schema has been run.
        </p>
      </main>
    )
  }

  return (
    <main className="main">
      <div className="toolbar">
        <label className="header-search">
          <span className="sr-only">Search by waybill or client</span>
          <input
            type="text"
            placeholder="Search waybill or client..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <OverviewStats shipments={shipments} />

      <div className="content-grid">
        <section aria-label="Shipment list">
          <ShipmentList
            shipments={filtered}
            selectedId={selected?.id}
            onSelect={setSelectedId}
          />
        </section>

        <section aria-label="Shipment detail">
          {selected ? (
            <ShipmentDetail shipment={selected} />
          ) : (
            <p className="empty-note">Select a shipment to see its manifest detail.</p>
          )}
        </section>
      </div>

      <CostEstimator />
    </main>
  )
}
