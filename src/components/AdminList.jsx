import { useState } from 'react'
import { STAGES } from '../api/pricing'
import { advanceStage } from '../api/shipments'

export default function AdminList({ shipments, onChanged }) {
  const [busyId, setBusyId] = useState(null)

  async function handleAdvance(shipment) {
    const nextStage = shipment.currentStage + 1
    if (nextStage >= STAGES.length) return
    setBusyId(shipment.dbId)
    try {
      await advanceStage(shipment.dbId, nextStage)
      onChanged?.()
    } catch (err) {
      console.error(err)
      alert('Failed to update stage: ' + err.message)
    } finally {
      setBusyId(null)
    }
  }

  if (shipments.length === 0) {
    return <p className="empty-note">No shipments yet — add one above.</p>
  }

  return (
    <div className="manifest">
      <div className="manifest-row admin-row admin-head" aria-hidden="true">
        <span>Waybill</span>
        <span>Client</span>
        <span>Stage</span>
        <span>Action</span>
      </div>
      {shipments.map((s) => {
        const isFinal = s.currentStage >= STAGES.length - 1
        return (
          <div key={s.dbId} className="manifest-row admin-row">
            <span className="mono">{s.id}</span>
            <span>{s.client}</span>
            <span>{STAGES[s.currentStage]}</span>
            <span>
              <button
                type="button"
                className="admin-advance-btn"
                disabled={isFinal || busyId === s.dbId}
                onClick={() => handleAdvance(s)}
              >
                {isFinal ? 'Delivered' : busyId === s.dbId ? 'Saving…' : `Mark: ${STAGES[s.currentStage + 1]}`}
              </button>
            </span>
          </div>
        )
      })}
    </div>
  )
}
