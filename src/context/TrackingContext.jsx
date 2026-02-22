import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'cabin-climber'

const defaultState = {
  targetPoints: 75000,
  myCards: [],
  existingPoints: [],
}

function loadState() {
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

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (_) {}
}

const TrackingContext = createContext(null)

export function TrackingProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const setTargetPoints = useCallback((value) => {
    setState((s) => ({ ...s, targetPoints: value }))
  }, [])

  const addCard = useCallback((cardId) => {
    setState((s) => {
      if (s.myCards.some((e) => (e.cardId || e) === cardId)) return s
      return { ...s, myCards: [...s.myCards, { cardId }] }
    })
  }, [])

  const removeCard = useCallback((cardId) => {
    setState((s) => ({ ...s, myCards: s.myCards.filter((e) => (e.cardId || e) !== cardId) }))
  }, [])

  const updateCard = useCallback((cardId, updates) => {
    setState((s) => ({
      ...s,
      myCards: s.myCards.map((e) =>
        (e.cardId || e) === cardId ? { ...e, ...updates } : e
      ),
    }))
  }, [])

  const addExisting = useCallback((item) => {
    setState((s) => ({ ...s, existingPoints: [...s.existingPoints, item] }))
  }, [])

  const removeExisting = useCallback((index) => {
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
