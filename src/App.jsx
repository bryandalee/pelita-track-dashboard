import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import TrackingPage from './pages/TrackingPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<TrackingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <footer className="footer">
          <p>
            Pelita Track is a demo dashboard exploring what a shipment tracking product for
            a China&ndash;Indonesia freight forwarder could look like. Demo data is fictional.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
