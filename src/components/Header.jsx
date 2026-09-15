import logo from '../assets/pelita-logo.png'

export default function Header({ query, onQueryChange }) {
  return (
    <header className="header">
      <div className="header-mark">
        <img src={logo} alt="Pelita Cargo" className="header-logo" />
        <div>
          <h1 className="header-title">Pelita Track</h1>
          <p className="header-sub">China–Indonesia freight, manifest view</p>
        </div>
      </div>
      <label className="header-search">
        <span className="sr-only">Search by waybill or client</span>
        <input
          type="text"
          placeholder="Search waybill or client..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>
    </header>
  )
}
