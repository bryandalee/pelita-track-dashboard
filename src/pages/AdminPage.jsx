import { useEffect, useState } from 'react'
import AdminForm from '../components/AdminForm'
import AdminList from '../components/AdminList'
import { fetchShipments } from '../api/shipments'

const SESSION_KEY = 'pelita-track-admin-ok'

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (value === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onUnlock()
    } else {
      setError('Wrong password.')
    }
  }

  return (
    <main className="main">
      <form className="admin-gate" onSubmit={handleSubmit}>
        <h2>Admin access</h2>
        <p className="estimator-sub">
          This is a simple client-side password check for demo purposes only — it is not
          real authentication. Do not use this page with real customer data.
        </p>
        <label>
          <span>Password</span>
          <input type="password" value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
        </label>
        {error && <p className="estimator-error">{error}</p>}
        <button type="submit">Enter</button>
      </form>
    </main>
  )
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [shipments, setShipments] = useState([])
  const [status, setStatus] = useState('loading')

  function reload() {
    setStatus('loading')
    fetchShipments()
      .then((rows) => {
        setShipments(rows)
        setStatus('ready')
      })
      .catch((err) => {
        console.error(err)
        setStatus('error')
      })
  }

  useEffect(() => {
    if (unlocked) reload()
  }, [unlocked])

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />
  }

  return (
    <main className="main">
      <AdminForm onAdded={reload} />

      <section>
        <h2>All shipments</h2>
        {status === 'loading' && <p className="empty-note">Loading…</p>}
        {status === 'error' && <p className="empty-note">Couldn't load shipments.</p>}
        {status === 'ready' && <AdminList shipments={shipments} onChanged={reload} />}
      </section>
    </main>
  )
}
