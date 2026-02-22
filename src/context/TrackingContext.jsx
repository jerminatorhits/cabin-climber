import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useAuth } from './AuthContext'
import { db, isAuthEnabled } from '../lib/firebase'

const STORAGE_KEY = 'cabin-climber'

const defaultState = {
  targetPoints: 75000,
  myCards: [],
  existingPoints: [],
}

function loadStateFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const data = JSON.parse(raw)
    return {
      targetPoints: data.targetPoints ?? defaultState.targetPoints,
      myCards: Array.isArray(data.myCards) ? data.myCards : defaultState.myCards,
      existingPoints: Array.isArray(data.existingPoints) ? data.existingPoints : defaultState.existingPoints,
    }
  } catch {
    return defaultState
  }
}

function saveStateToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (_) {}
}

function stateFromDoc(data) {
  if (!data) return defaultState
  return {
    targetPoints: data.targetPoints ?? defaultState.targetPoints,
    myCards: Array.isArray(data.myCards) ? data.myCards : defaultState.myCards,
    existingPoints: Array.isArray(data.existingPoints) ? data.existingPoints : defaultState.existingPoints,
  }
}

const TrackingContext = createContext(null)

export function TrackingProvider({ children }) {
  const { user } = useAuth()
  const authEnabled = isAuthEnabled()
  const [state, setState] = useState(() =>
    authEnabled ? defaultState : loadStateFromStorage()
  )
  const stateOriginRef = useRef('user') // 'user' | 'firestore'

  // When auth is toggled on, show default until user/Firestore loads
  useEffect(() => {
    if (authEnabled && !user) {
      setState(defaultState)
    }
  }, [authEnabled, user])

  // Auth enabled + signed in: subscribe to Firestore
  useEffect(() => {
    if (!authEnabled || !user || !db) return
    const progressRef = doc(db, 'progress', user.uid)
    const unsubscribe = onSnapshot(progressRef, (snap) => {
      stateOriginRef.current = 'firestore'
      setState(stateFromDoc(snap.exists() ? snap.data() : null))
    })
    return () => unsubscribe()
  }, [authEnabled, user])

  // Auth enabled + signed in: persist state to Firestore (skip when update came from Firestore)
  useEffect(() => {
    if (!authEnabled || !user || !db) return
    if (stateOriginRef.current === 'firestore') {
      stateOriginRef.current = 'user'
      return
    }
    const progressRef = doc(db, 'progress', user.uid)
    setDoc(progressRef, {
      targetPoints: state.targetPoints,
      myCards: state.myCards,
      existingPoints: state.existingPoints,
      updatedAt: new Date().toISOString(),
    }).catch(() => {})
  }, [authEnabled, user, state])

  // Auth disabled: persist to localStorage
  useEffect(() => {
    if (authEnabled) return
    saveStateToStorage(state)
  }, [authEnabled, state])

  // Auth enabled + sign out: reset to default
  useEffect(() => {
    if (authEnabled && !user) {
      setState(defaultState)
    }
  }, [authEnabled, user])

  const setTargetPoints = useCallback((value) => {
    stateOriginRef.current = 'user'
    setState((s) => ({ ...s, targetPoints: value }))
  }, [])

  const addCard = useCallback((cardId) => {
    stateOriginRef.current = 'user'
    setState((s) => {
      if (s.myCards.some((e) => (e.cardId || e) === cardId)) return s
      return { ...s, myCards: [...s.myCards, { cardId }] }
    })
  }, [])

  const removeCard = useCallback((cardId) => {
    stateOriginRef.current = 'user'
    setState((s) => ({ ...s, myCards: s.myCards.filter((e) => (e.cardId || e) !== cardId) }))
  }, [])

  const updateCard = useCallback((cardId, updates) => {
    stateOriginRef.current = 'user'
    setState((s) => ({
      ...s,
      myCards: s.myCards.map((e) =>
        (e.cardId || e) === cardId ? { ...e, ...updates } : e
      ),
    }))
  }, [])

  const addExisting = useCallback((item) => {
    stateOriginRef.current = 'user'
    setState((s) => ({ ...s, existingPoints: [...s.existingPoints, item] }))
  }, [])

  const removeExisting = useCallback((index) => {
    stateOriginRef.current = 'user'
    setState((s) => ({
      ...s,
      existingPoints: s.existingPoints.filter((_, i) => i !== index),
    }))
  }, [])

  const value = {
    targetPoints: state.targetPoints,
    setTargetPoints,
    myCards: state.myCards,
    existingPoints: state.existingPoints,
    addCard,
    removeCard,
    updateCard,
    addExisting,
    removeExisting,
  }

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  )
}

export function useTracking() {
  const ctx = useContext(TrackingContext)
  if (!ctx) throw new Error('useTracking must be used within TrackingProvider')
  return ctx
}
