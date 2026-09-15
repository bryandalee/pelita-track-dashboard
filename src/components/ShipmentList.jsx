import Stamp, { getStatusMeta } from './Stamp'

export default function ShipmentList({ shipments, selectedId, onSelect }) {
  if (shipments.length === 0) {
    return <p className="empty-note">No shipments match that search.</p>
  }

  return (
    <div className="manifest" aria-label="Shipment manifest">
      <div className="manifest-row manifest-head" aria-hidden="true">
        <span>Waybill</span>
        <span>Route</span>
        <span>Client</span>
        <span>Qty</span>
        <span>Status</span>
      </div>
      {shipments.map((s) => {
        const { label: statusLabel } = getStatusMeta(s.currentStage)
        const isAir = s.mode === 'Air freight'
        const qtyLabel = isAir ? `${s.weightKg.toLocaleString()} kg` : `${s.volumeCbm} cbm`
        return (
          <button
            key={s.id}
            className={`manifest-row manifest-row-btn${s.id === selectedId ? ' is-selected' : ''}`}
            onClick={() => onSelect(s.id)}
            aria-pressed={s.id === selectedId}
            aria-label={`${s.id}, ${s.origin} to ${s.destination}, ${s.client}, status ${statusLabel}`}
          >
            <span className="mono" aria-hidden="true">{s.id}</span>
            <span aria-hidden="true">{s.origin} &rarr; {s.destination}</span>
            <span className="manifest-client" aria-hidden="true">{s.client}</span>
            <span className="mono" aria-hidden="true">{qtyLabel}</span>
            <span aria-hidden="true"><Stamp currentStage={s.currentStage} /></span>
          </button>
        )
      })}
    </div>
  )
}
