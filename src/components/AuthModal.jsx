import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from './AuthModal.module.css'

export default function AuthModal({ isOpen, onClose }) {
  const {
    user,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    error,
    clearError,
  } = useAuth()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setEmail('')
      setPassword('')
      setMode('signin')
      clearError()
    }
  }, [isOpen, clearError])

  useEffect(() => {
    if (isOpen && user) onClose()
  }, [isOpen, user, onClose])

  if (!isOpen) return null

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (mode === 'signup') {
      signUpWithEmail(email, password)
    } else {
      signInWithEmail(email, password)
    }
  }

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label="Sign in or sign up">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className={styles.title}>{mode === 'signup' ? 'Create account' : 'Sign in'}</h2>

        <div className={styles.social}>
          <button type="button" className={styles.btnSocial} onClick={signInWithGoogle}>
            <span className={styles.btnIcon}>G</span>
            Continue with Google
          </button>
        </div>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <form className={styles.form} onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
            minLength={6}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />
          <button type="submit" className={styles.btnPrimary}>
            {mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.toggle}>
          {mode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <button type="button" className={styles.linkBtn} onClick={() => setMode('signup')}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" className={styles.linkBtn} onClick={() => setMode('signin')}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
