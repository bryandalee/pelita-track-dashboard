import { useState } from 'react'
import { SEA_CATEGORIES, AIR_CATEGORIES } from '../api/pricing'
import { addShipment } from '../api/shipments'

const emptyForm = {
  markingCode: '',
  customerName: '',
  customerPhone: '',
  itemDescription: '',
  mode: 'Sea freight',
  category: SEA_CATEGORIES[0].id,
  quantity: '',
  rate: String(SEA_CATEGORIES[0].ratePerCbm),
  additionalCost: '0',
  originCity: '',
  destinationCity: '',
  destinationAddress: '',
  receivedOriginDate: new Date().toISOString().slice(0, 10),
}

export default function AdminForm({ onAdded }) {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const categories = form.mode === 'Air freight' ? AIR_CATEGORIES : SEA_CATEGORIES

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleModeChange(mode) {
    const nextCategories = mode === 'Air freight' ? AIR_CATEGORIES : SEA_CATEGORIES
    const nextCategory = nextCategories[0]
    setForm((f) => ({
      ...f,
      mode,
      category: nextCategory.id,
      rate: String(mode === 'Air freight' ? nextCategory.ratePerKg : nextCategory.ratePerCbm),
    }))
  }

  function handleCategoryChange(categoryId) {
    const cat = categories.find((c) => c.id === categoryId)
    setForm((f) => ({
      ...f,
      category: categoryId,
      rate: String(form.mode === 'Air freight' ? cat.ratePerKg : cat.ratePerCbm),
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.markingCode || !form.customerName || !form.quantity) {
      setError('Marking code, customer name, and quantity are required.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await addShipment(form)
      setForm({
        ...emptyForm,
        receivedOriginDate: new Date().toISOString().slice(0, 10),
      })
      onAdded?.()
    } catch (err) {
      console.error(err)
      setError(err.message ?? 'Failed to save shipment.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Add new shipment</h2>

      <div className="admin-form-grid">
        <label>
          <span>Marking code</span>
          <input value={form.markingCode} onChange={(e) => update('markingCode', e.target.value)} placeholder="SCS-BR-NAME/BY SEA" />
        </label>
        <label>
          <span>Customer name</span>
          <input value={form.customerName} onChange={(e) => update('customerName', e.target.value)} />
        </label>
        <label>
          <span>Customer phone</span>
          <input value={form.customerPhone} onChange={(e) => update('customerPhone', e.target.value)} />
        </label>
        <label>
          <span>Item description</span>
          <input value={form.itemDescription} onChange={(e) => update('itemDescription', e.target.value)} />
        </label>

        <label>
          <span>Freight mode</span>
          <select value={form.mode} onChange={(e) => handleModeChange(e.target.value)}>
            <option>Sea freight</option>
            <option>Air freight</option>
          </select>
        </label>
        <label>
          <span>Category</span>
          <select value={form.category} onChange={(e) => handleCategoryChange(e.target.value)}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{form.mode === 'Air freight' ? 'Weight (KG)' : 'Volume (CBM)'}</span>
          <input type="number" min="0" step="0.1" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} />
        </label>
        <label>
          <span>Rate (IDR, per {form.mode === 'Air freight' ? 'KG' : 'CBM'})</span>
          <input type="number" min="0" value={form.rate} onChange={(e) => update('rate', e.target.value)} />
        </label>
        <label>
          <span>Ongkos tambahan (IDR, optional)</span>
          <input type="number" min="0" value={form.additionalCost} onChange={(e) => update('additionalCost', e.target.value)} />
        </label>

        <label>
          <span>Origin city</span>
          <input value={form.originCity} onChange={(e) => update('originCity', e.target.value)} placeholder="Shenzhen" />
        </label>
        <label>
          <span>Destination city</span>
          <input value={form.destinationCity} onChange={(e) => update('destinationCity', e.target.value)} placeholder="Jakarta" />
        </label>
        <label>
          <span>Destination address</span>
          <input value={form.destinationAddress} onChange={(e) => update('destinationAddress', e.target.value)} />
        </label>
        <label>
          <span>Received date (origin)</span>
          <input type="date" value={form.receivedOriginDate} onChange={(e) => update('receivedOriginDate', e.target.value)} />
        </label>
      </div>

      {error && <p className="estimator-error">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving…' : 'Add shipment'}
      </button>
    </form>
  )
}
