import { useMemo, useState } from 'react'
import { SEA_CATEGORIES, AIR_CATEGORIES } from '../api/pricing'
import { formatIdr } from '../utils/format'

export default function CostEstimator() {
  const [mode, setMode] = useState('Sea freight')
  const isAir = mode === 'Air freight'
  const categories = isAir ? AIR_CATEGORIES : SEA_CATEGORIES

  const [categoryId, setCategoryId] = useState(categories[0].id)
  const [quantity, setQuantity] = useState('5')
  const [error, setError] = useState('')

  function handleModeChange(nextMode) {
    setMode(nextMode)
    const nextCategories = nextMode === 'Air freight' ? AIR_CATEGORIES : SEA_CATEGORIES
    setCategoryId(nextCategories[0].id)
  }

  const category = useMemo(
    () => categories.find((c) => c.id === categoryId) ?? categories[0],
    [categories, categoryId]
  )

  function handleCalculate(e) {
    e.preventDefault()
    const q = Number(quantity)
    if (!quantity || Number.isNaN(q) || q <= 0) {
      setError(`Enter a ${isAir ? 'weight' : 'volume'} greater than zero.`)
      return
    }
    setError('')
  }

  const q = Number(quantity) || 0
  const rate = isAir ? category.ratePerKg : category.ratePerCbm
  const total = Math.round(rate * q)
  const unit = isAir ? 'KG' : 'CBM'

  return (
    <section className="estimator">
      <h2>Shipping cost estimator</h2>
      <p className="estimator-sub">All-in rate by category — no separate duty, VAT, or customs fees.</p>

      <form className="estimator-form" onSubmit={handleCalculate}>
        <label>
          <span>Freight mode</span>
          <select value={mode} onChange={(e) => handleModeChange(e.target.value)}>
            <option>Sea freight</option>
            <option>Air freight</option>
          </select>
        </label>

        <label>
          <span>Cargo category</span>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>

        <label>
          <span>{isAir ? 'Weight (KG)' : 'Volume (CBM)'}</span>
          <input
            type="number"
            min="0"
            step={isAir ? '1' : '0.1'}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>

        <button type="submit">Recalculate</button>
      </form>

      {error && <p className="estimator-error">{error}</p>}

      <div className="ledger">
        <div className="ledger-row">
          <span>Rate ({category.label})</span>
          <span className="mono">{formatIdr(rate)}/{unit}</span>
        </div>
        <div className="ledger-row ledger-total">
          <span>Estimated total</span>
          <span className="mono">{formatIdr(total)}</span>
        </div>
      </div>
    </section>
  )
}
