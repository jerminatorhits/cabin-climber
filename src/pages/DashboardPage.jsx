import { useRef, useMemo } from 'react'
import GoalSetter from '../components/GoalSetter'
import GoalTracker from '../components/GoalTracker'
import ProgressSummary from '../components/ProgressSummary'
import GlobalMap from '../components/GlobalMap'
import { useTracking } from '../context/TrackingContext'
import { useAuth } from '../context/AuthContext'
import { recommendedCards } from '../data/cards'
import styles from './DashboardPage.module.css'

function saveHint(isAuthEnabled, user) {
  if (!isAuthEnabled) return 'Progress is saved in this browser.'
  if (user) return 'Progress is saved to your account.'
  return 'Sign in to save your progress across devices.'
}

function pointsFromCard(entry, card) {
  if (!card) return 0
  const spend = typeof entry.currentSpend === 'number' ? entry.currentSpend : 0
  const earned = entry.bonusEarned === true || (card.spendRequired > 0 && spend >= card.spendRequired)
  return earned ? card.bonus : 0
}

export default function DashboardPage() {
  const { isAuthEnabled, user } = useAuth()
  const {
    targetPoints,
    setTargetPoints,
    myCards,
    existingPoints,
    removeCard,
    updateCard,
    addCard,
    addExisting,
    removeExisting,
  } = useTracking()
  const goalRef = useRef(null)
  const trackerRef = useRef(null)

  const progressPct = useMemo(() => {
    const fromCards = myCards.reduce((sum, entry) => {
      const card = recommendedCards.find((c) => c.id === (entry.cardId || entry))
      return sum + pointsFromCard(entry, card)
    }, 0)
    const fromExisting = existingPoints.reduce((sum, e) => sum + (e.amount || 0), 0)
    const current = fromCards + fromExisting
    if (!targetPoints || targetPoints <= 0) return 0
    return Math.min(100, (current / targetPoints) * 100)
  }, [targetPoints, myCards, existingPoints])

  const scrollToGoal = () => goalRef.current?.scrollIntoView({ behavior: 'smooth' })
  const scrollToTracker = () => trackerRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main className={styles.main}>
      <GlobalMap progress={progressPct} />

      <p className={styles.intro}>
        Your personal progress toward a Tokyo business class trip. Set a points goal, add cards you're working on, and log spend or existing points. {saveHint(isAuthEnabled, user)}
      </p>

      <ProgressSummary
        targetPoints={targetPoints}
        myCards={myCards}
        existingPoints={existingPoints}
        onScrollToGoal={scrollToGoal}
        onScrollToTracker={scrollToTracker}
      />

      <section className={styles.section} aria-label="Add cards">
        <h2 className={styles.subhead}>Add a card to your plan</h2>
        <ul className={styles.cardAddList}>
          {recommendedCards.map((card) => {
            const added = myCards.some((e) => (e.cardId || e) === card.id)
            return (
              <li key={card.id} className={styles.cardAddItem}>
                <span>{card.name}</span>
                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() => addCard(card.id)}
                  disabled={added}
                  aria-label={`Add ${card.name}`}
                >
                  {added ? 'Added' : 'Add'}
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <div ref={goalRef}>
        <GoalSetter currentGoal={targetPoints} onSetGoal={setTargetPoints} />
      </div>

      <div ref={trackerRef}>
        <GoalTracker
          targetPoints={targetPoints}
          myCards={myCards}
          existingPoints={existingPoints}
          onRemoveCard={removeCard}
          onUpdateCard={updateCard}
          onAddExisting={addExisting}
          onRemoveExisting={removeExisting}
        />
      </div>
    </main>
  )
}
