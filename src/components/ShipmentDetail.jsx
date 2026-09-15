import { STAGES, getCategory, calcAllInCost } from '../data/mockShipments'

function formatIdr(n) {
  return n.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
}

export default function ShipmentDetail({ shipment }) {
  const category = getCategory(shipment.mode, shipment.category)
  const isAir = shipment.mode === 'Air freight'
  const rate = isAir ? category.ratePerKg : category.ratePerCbm
  const quantity = isAir ? shipment.weightKg : shipment.volumeCbm
  const unit = isAir ? 'KG' : 'CBM'
  const total = calcAllInCost(shipment)

  return (
    <div className="detail">
      <div className="detail-head">
        <h2 className="mono">{shipment.id}</h2>
        <p className="detail-route">
          {shipment.origin} &rarr; {shipment.destination} &middot; {shipment.mode} &middot; {shipment.client}
        </p>
      </div>

      <ol className="timeline">
        {STAGES.map((stage, i) => {
          const isFullyDelivered = shipment.currentStage >= STAGES.length - 1
          const done = i <= shipment.currentStage
          const current = i === shipment.currentStage && !isFullyDelivered
          return (
            <li key={stage} className={`timeline-step${done ? ' is-done' : ''}${current ? ' is-current' : ''}`}>
              <span className="timeline-dot" aria-hidden="true" />
              <span className="timeline-label">{stage}</span>
              <span className="timeline-date mono">{shipment.dates[i] ?? '—'}</span>
            </li>
          )
        })}
      </ol>

      <div className="ledger">
        <h3 className="ledger-title">Cost &mdash; all-in rate</h3>
        <div className="ledger-row">
          <span>Category</span>
          <span>{category.label}</span>
        </div>
        <div className="ledger-row">
          <span>{quantity.toLocaleString('id-ID')} {unit} &times; {formatIdr(rate)}/{unit}</span>
          <span className="mono">{formatIdr(total)}</span>
        </div>
        <div className="ledger-row ledger-total">
          <span>Total (all-in)</span>
          <span className="mono">{formatIdr(total)}</span>
        </div>
        <p className="ledger-note">All-in rate — no separate duty, VAT, or customs fees.</p>
      </div>
    </div>
  )
}
