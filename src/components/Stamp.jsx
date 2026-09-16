import { STAGES } from '../api/pricing'

export function getStatusMeta(currentStage) {
  if (currentStage >= 5) return { label: 'Delivered', color: 'var(--stamp-green)' }
  if (currentStage === 4) return { label: 'Out for delivery', color: 'var(--stamp-amber)' }
  if (currentStage === 3 || currentStage === 1) return { label: 'At customs', color: 'var(--stamp-amber)' }
  if (currentStage === 2) return { label: 'In transit', color: 'var(--sea)' }
  return { label: 'Picked up', color: 'var(--ink-soft)' }
}

export default function Stamp({ currentStage }) {
  const { label, color } = getStatusMeta(currentStage)
  return (
    <span
      className="stamp"
      style={{ color, borderColor: color }}
      title={`Currently at: ${STAGES[currentStage]}`}
    >
      {label}
    </span>
  )
}
