import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import AdminForm from '../components/AdminForm'
import AdminList from '../components/AdminList'
import { fetchShipments } from '../api/shipments'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) setError(signInError.message)
    setSubmitting(false)
  }

  return (
    <main className="main">
      <form className="admin-gate" onSubmit={handleSubmit}>
        <h2>Admin login</h2>
        <p className="estimator-sub">
          Sign in with the admin account created in Supabase. Access is enforced by
          Supabase Auth + Row Level Security, not by the app itself.
        </p>
        <label>
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="estimator-error">{error}</p>}
        <button type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  )
}

export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [sessionChecked, setSessionChecked] = useState(false)
  const [shipments, setShipments] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setSessionChecked(true)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

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
    if (session) reload()
  }, [session])

  if (!sessionChecked) {
    return <main className="main"><p className="empty-note">Checking session…</p></main>
  }

  if (!session) {
    return <LoginForm />
  }

  return (
    <main className="main">
      <div className="admin-topbar">
        <span className="admin-signed-in">Signed in as {session.user.email}</span>
        <button type="button" className="admin-advance-btn" onClick={() => supabase.auth.signOut()}>
          Sign out
        </button>
      </div>

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
