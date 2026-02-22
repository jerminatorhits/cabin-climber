import { useState } from 'react'
import { recommendedCards } from '../data/cards'
import styles from './GoalTracker.module.css'

function progressPct(current, target) {
  if (!target || target <= 0) return 0
  return Math.min(100, Math.round((current / target) * 100))
}

function milestone(pct) {
  if (pct >= 100) return { label: 'Goal reached!', emoji: '🎉' }
  if (pct >= 75) return { label: 'Almost there', emoji: '✈️' }
  if (pct >= 50) return { label: 'Halfway', emoji: '📈' }
  if (pct >= 25) return { label: 'First quarter', emoji: '🛫' }
  return { label: 'Getting started', emoji: '🎯' }
}

function pointsFromCard(entry, card) {
  if (!card) return 0
  const spend = typeof entry.currentSpend === 'number' ? entry.currentSpend : 0
  const earned = entry.bonusEarned === true || (card.spendRequired > 0 && spend >= card.spendRequired)
  return earned ? card.bonus : 0
}

export default function GoalTracker({
  targetPoints,
  myCards = [],
  existingPoints = [],
  onRemoveCard,
  onUpdateCard,
  onAddExisting,
  onRemoveExisting,
}) {
  const [newExistingAmount, setNewExistingAmount] = useState('')
  const [newExistingLabel, setNewExistingLabel] = useState('')

  const fromCards = myCards.reduce((sum, entry) => {
    const card = recommendedCards.find((c) => c.id === (entry.cardId || entry))
    return sum + pointsFromCard(entry, card)
  }, 0)
  const fromExisting = existingPoints.reduce((sum, e) => sum + (e.amount || 0), 0)
  const currentPoints = fromCards + fromExisting

  const pct = progressPct(currentPoints, targetPoints)
  const ms = milestone(pct)

  const handleAddExisting = (e) => {
    e.preventDefault()
    const amount = parseInt(String(newExistingAmount).replace(/,/g, ''), 10)
    if (!Number.isNaN(amount) && amount > 0) {
      onAddExisting?.({ amount, label: newExistingLabel || 'Other points' })
      setNewExistingAmount('')
      setNewExistingLabel('')
    }
  }

  const handleSpendChange = (cardId, value) => {
    const num = value === '' ? undefined : parseInt(String(value).replace(/,/g, ''), 10)
    onUpdateCard?.(cardId, { currentSpend: Number.isNaN(num) ? undefined : num })
  }

  const handleBonusEarnedChange = (cardId, checked) => {
    onUpdateCard?.(cardId, { bonusEarned: checked })
  }

  if (!targetPoints || targetPoints <= 0) {
    return (
      <section className={styles.section}>
        <p className={styles.placeholder}>Set a points goal above to track your progress.</p>
      </section>
    )
  }

  return (
    <section className={styles.section} aria-labelledby="tracker-heading" id="goal-tracker">
      <h2 id="tracker-heading">Your progress</h2>
      <div className={styles.progressWrap}>
        <div className={styles.barBg}>
          <div className={styles.barFill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.stats}>
          <span className={styles.current}>{currentPoints.toLocaleString()}</span>
          <span className={styles.sep}>/</span>
          <span className={styles.target}>{targetPoints.toLocaleString()} points</span>
        </div>
        <p className={styles.milestone}>{ms.emoji} {ms.label}</p>
      </div>

      <div className={styles.sources}>
        <h3 className={styles.subhead}>From cards in your plan</h3>
        {myCards.length === 0 ? (
          <p className={styles.empty}>Add cards from the list above. Track spend toward each bonus and mark when you’ve earned it.</p>
        ) : (
          <ul className={styles.list}>
            {myCards.map((entry) => {
              const cardId = entry.cardId || entry
              const card = recommendedCards.find((c) => c.id === cardId)
              if (!card) return null
              const earned = pointsFromCard(entry, card) > 0
              const spend = typeof entry.currentSpend === 'number' ? entry.currentSpend : 0
              const spendPct = card.spendRequired > 0 ? Math.min(100, (spend / card.spendRequired) * 100) : 0
              return (
                <li key={cardId} className={styles.cardItem}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardName}>{card.name}</span>
                    <span className={styles.pts}>{earned ? `+${card.bonus.toLocaleString()} ✓` : `Bonus: ${card.bonus.toLocaleString()}`}</span>
                    <button type="button" className={styles.remove} onClick={() => onRemoveCard?.(cardId)} aria-label={`Remove ${card.name}`}>×</button>
                  </div>
                  {card.spendRequired > 0 && (
                    <div className={styles.spendRow}>
                      <label className={styles.spendLabel}>
                        Spend toward bonus: $
                        <input
                          type="text"
                          inputMode="numeric"
                          className={styles.spendInput}
                          placeholder={String(card.spendRequired)}
                          value={entry.currentSpend != null ? String(entry.currentSpend) : ''}
                          onChange={(e) => handleSpendChange(cardId, e.target.value)}
                        />
                        {' '}/ ${card.spendRequired.toLocaleString()}
                      </label>
                      <div className={styles.spendBarBg}>
                        <div className={styles.spendBarFill} style={{ width: `${spendPct}%` }} />
                      </div>
                    </div>
                  )}
                  <label className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      checked={entry.bonusEarned === true || (card.spendRequired > 0 && spend >= card.spendRequired)}
                      onChange={(e) => handleBonusEarnedChange(cardId, e.target.checked)}
                    />
                    <span>Bonus earned (counts toward goal)</span>
                  </label>
                </li>
              )
            })}
          </ul>
        )}

        <h3 className={styles.subhead}>Existing points</h3>
        {existingPoints.length > 0 && (
          <ul className={styles.list}>
            {existingPoints.map((e, i) => (
              <li key={i} className={styles.item}>
                <span>{e.label}</span>
                <span className={styles.pts}>+{(e.amount || 0).toLocaleString()}</span>
                <button type="button" className={styles.remove} onClick={() => onRemoveExisting?.(i)} aria-label={`Remove ${e.label}`}>×</button>
              </li>
            ))}
          </ul>
        )}
        <form className={styles.addExisting} onSubmit={handleAddExisting}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Points"
            value={newExistingAmount}
            onChange={(e) => setNewExistingAmount(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Label (e.g. Chase UR)"
            value={newExistingLabel}
            onChange={(e) => setNewExistingLabel(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.addBtn}>Add</button>
        </form>
      </div>
    </section>
  )
}
