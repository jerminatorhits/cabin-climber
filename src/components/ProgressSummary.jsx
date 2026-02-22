import { useMemo } from 'react'
import { recommendedCards } from '../data/cards'
import { useAuth } from '../context/AuthContext'
import styles from './ProgressSummary.module.css'

function progressPct(current, target) {
  if (!target || target <= 0) return 0
  return Math.min(100, Math.round((current / target) * 100))
}

function saveMessage(isAuthEnabled, user) {
  if (!isAuthEnabled) return 'Your progress is saved in this browser.'
  if (user) return 'Your progress is saved to your account.'
  return 'Sign in to save your progress across devices.'
}

export default function ProgressSummary({ targetPoints, myCards, existingPoints, onScrollToGoal, onScrollToTracker }) {
  const { isAuthEnabled, user } = useAuth()
  const currentPoints = useMemo(() => {
    let fromCards = 0
    for (const entry of myCards) {
      const card = recommendedCards.find((c) => c.id === (entry.cardId || entry))
      if (!card) continue
      const spend = typeof entry.currentSpend === 'number' ? entry.currentSpend : 0
      const earned = entry.bonusEarned === true || (card.spendRequired > 0 && spend >= card.spendRequired)
      if (earned) fromCards += card.bonus
    }
    const fromExisting = existingPoints.reduce((sum, e) => sum + (e.amount || 0), 0)
    return fromCards + fromExisting
  }, [myCards, existingPoints])

  const pointsFromExisting = existingPoints.reduce((s, e) => s + (e.amount || 0), 0)
  const pct = progressPct(currentPoints, targetPoints)
  const hasGoal = targetPoints != null && targetPoints > 0
  const hasAnyTracking = hasGoal && (myCards.length > 0 || existingPoints.length > 0)

  if (!hasGoal) {
    return (
      <aside className={styles.summary} role="region" aria-label="Points progress">
        <p className={styles.cta}>
          <strong>Track your progress.</strong> Set a points goal, add cards you’re working on, and log existing points. {saveMessage(isAuthEnabled, user)}
        </p>
        {onScrollToGoal && (
          <button type="button" className={styles.btn} onClick={onScrollToGoal}>
            Set your goal →
          </button>
        )}
      </aside>
    )
  }

  return (
    <aside className={styles.summary} role="region" aria-label="Points progress">
      <div className={styles.barWrap}>
        <div className={styles.barBg}>
          <div className={styles.barFill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.nums}>
          <span className={styles.current}>{currentPoints.toLocaleString()}</span>
          <span className={styles.sep}>/</span>
          <span className={styles.target}>{targetPoints.toLocaleString()} points</span>
          {pct > 0 && <span className={styles.pct}>({pct}%)</span>}
        </div>
      </div>
      {hasAnyTracking && (
        <p className={styles.detail}>
          From {myCards.length} card{myCards.length !== 1 ? 's' : ''} in your plan
          {pointsFromExisting > 0 && ` + ${pointsFromExisting.toLocaleString()} existing points`}.
        </p>
      )}
      {(onScrollToTracker || onScrollToGoal) && (
        <div className={styles.actions}>
          {onScrollToTracker && <button type="button" className={styles.linkBtn} onClick={onScrollToTracker}>Update progress</button>}
          {onScrollToGoal && <button type="button" className={styles.linkBtn} onClick={onScrollToGoal}>Change goal</button>}
        </div>
      )}
    </aside>
  )
}
