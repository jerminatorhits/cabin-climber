import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import { TrackingProvider } from './context/TrackingContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import AuthModal from './components/AuthModal'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import PrivacyPage from './pages/PrivacyPage'
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
          <div className="layout">
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
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
          <footer className="footer">
            <Link to="/privacy">Privacy</Link>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd6cre75mZPp1SjgFP-GDRhPZlDKs51ucJUrNqWx8qFy93PIQ/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Feedback
            </a>
          </footer>
          </div>
        </BrowserRouter>
      </TrackingProvider>
    </AuthProvider>
  )
}
