import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { TrackingProvider } from './context/TrackingContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthModal from './components/AuthModal'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

function NavAuth() {
  const { isAuthEnabled, user, loading, signOut } = useAuth()
  const [authOpen, setAuthOpen] = useState(false)

  if (!isAuthEnabled) return null
  if (loading) return <span className="navbar__auth">...</span>
  if (user) {
    const label = user.displayName || user.email || 'Account'
    return (
      <div className="navbar__auth">
        <span className="navbar__user" title={user.email}>{label}</span>
        <button type="button" className="navbar__btn" onClick={signOut}>Sign out</button>
      </div>
    )
  }
  return (
    <>
      <button type="button" className="navbar__btn" onClick={() => setAuthOpen(true)}>Sign in</button>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
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
              <NavAuth />
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-progress" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </TrackingProvider>
    </AuthProvider>
  )
}
