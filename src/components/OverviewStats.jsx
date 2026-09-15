export default function OverviewStats({ shipments }) {
  const active = shipments.filter((s) => s.currentStage < 5).length
  const inTransit = shipments.filter((s) => s.currentStage === 2).length
  const atCustoms = shipments.filter((s) => s.currentStage === 1 || s.currentStage === 3).length
  const delivered = shipments.filter((s) => s.currentStage === 5).length

  const stats = [
    { label: 'Active shipments', value: active },
    { label: 'In transit', value: inTransit },
    { label: 'At customs', value: atCustoms },
    { label: 'Delivered', value: delivered },
  ]

  return (
    <section className="stats" aria-label="Shipment overview">
      {stats.map((s, i) => (
        <div className="stats-item" key={s.label} style={{ borderLeftWidth: i === 0 ? 0 : 1 }}>
          <span className="stats-value mono">{String(s.value).padStart(2, '0')}</span>
          <span className="stats-label">{s.label}</span>
        </div>
      ))}
    </section>
  )
}
