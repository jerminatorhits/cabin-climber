import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { TrackingProvider } from './context/TrackingContext'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

export default function App() {
  return (
    <TrackingProvider>
      <BrowserRouter>
        <header className="navbar">
          <NavLink to="/" className="navbar__brand">Cabin Climber</NavLink>
          <nav className="navbar__nav">
            <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
              How it works
            </NavLink>
            <NavLink to="/my-progress" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
              My progress
            </NavLink>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-progress" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </TrackingProvider>
  )
}
