import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth, isAuthEnabled } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(!!auth)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const clearError = useCallback(() => setError(null), [])

  const signInWithGoogle = useCallback(async () => {
    if (!auth) return
    setError(null)
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (err) {
      setError(err.message || 'Google sign-in failed')
    }
  }, [])

  const signInWithEmail = useCallback(async (email, password) => {
    if (!auth) return
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(err.message || 'Sign in failed')
    }
  }, [])

  const signUpWithEmail = useCallback(async (email, password) => {
    if (!auth) return
    setError(null)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(err.message || 'Sign up failed')
    }
  }, [])

  const signOut = useCallback(async () => {
    if (!auth) return
    setError(null)
    try {
      await firebaseSignOut(auth)
    } catch (err) {
      setError(err.message || 'Sign out failed')
    }
  }, [])

  const value = {
    user,
    loading,
    error,
    clearError,
    isAuthEnabled: isAuthEnabled(),
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
