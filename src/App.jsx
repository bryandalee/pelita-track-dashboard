import { useMemo, useState } from 'react'
import Header from './components/Header'
import OverviewStats from './components/OverviewStats'
import ShipmentList from './components/ShipmentList'
import ShipmentDetail from './components/ShipmentDetail'
import CostEstimator from './components/CostEstimator'
import { SHIPMENTS } from './data/mockShipments'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(SHIPMENTS[0].id)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SHIPMENTS
    return SHIPMENTS.filter(
      (s) => s.id.toLowerCase().includes(q) || s.client.toLowerCase().includes(q)
    )
  }, [query])

  const selected = SHIPMENTS.find((s) => s.id === selectedId) ?? filtered[0]

  return (
    <div className="app">
      <Header query={query} onQueryChange={setQuery} />

      <main className="main">
        <OverviewStats shipments={SHIPMENTS} />

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

      <footer className="footer">
        <p>
          Pelita Track is a demo dashboard built to explore what a shipment tracking
          product for a China&ndash;Indonesia freight forwarder could look like. All
          shipment data on this page is illustrative.
        </p>
      </footer>
    </div>
  )
}

export default App
