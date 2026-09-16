import { STAGES, categoryLabel } from '../api/pricing'
import { formatIdr } from '../utils/format'

export default function ShipmentDetail({ shipment }) {
  const isAir = shipment.mode === 'Air freight'
  const unit = isAir ? 'KG' : 'CBM'

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
          <span>{categoryLabel(shipment.mode, shipment.category)}</span>
        </div>
        <div className="ledger-row">
          <span>{Number(shipment.quantity).toLocaleString('id-ID')} {unit} &times; {formatIdr(shipment.rate)}/{unit}</span>
          <span className="mono">{formatIdr(shipment.quantity * shipment.rate)}</span>
        </div>
        {shipment.additionalCost > 0 && (
          <div className="ledger-row">
            <span>Ongkos tambahan</span>
            <span className="mono">{formatIdr(shipment.additionalCost)}</span>
          </div>
        )}
        <div className="ledger-row ledger-total">
          <span>Total (all-in)</span>
          <span className="mono">{formatIdr(shipment.totalCost)}</span>
        </div>
        <p className="ledger-note">All-in rate — no separate duty, VAT, or customs fees.</p>
      </div>
    </div>
  )
}
