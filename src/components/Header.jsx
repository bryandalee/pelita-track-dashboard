import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/pelita-logo.png'

export default function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-mark">
        <img src={logo} alt="Pelita Cargo" className="header-logo" />
        <div>
          <h1 className="header-title">Pelita Track</h1>
          <p className="header-sub">China–Indonesia freight, manifest view</p>
        </div>
      </div>
      <nav className="header-nav" aria-label="Main">
        <Link to="/" className={location.pathname === '/' ? 'is-active' : ''}>Track</Link>
        <Link to="/admin" className={location.pathname === '/admin' ? 'is-active' : ''}>Admin</Link>
      </nav>
    </header>
  )
}
