import { useState } from 'react'
import { tokyoPointRange } from '../data/tokyoExamples'
import styles from './GoalSetter.module.css'

export default function GoalSetter({ currentGoal, onSetGoal }) {
  const [input, setInput] = useState(currentGoal ? String(currentGoal) : String(tokyoPointRange.low))

  const handleSubmit = (e) => {
    e.preventDefault()
    const num = parseInt(input.replace(/,/g, ''), 10)
    if (!Number.isNaN(num) && num > 0) {
      onSetGoal(num)
    }
  }

  return (
    <section className={styles.section} aria-labelledby="goal-setter-heading">
      <h2 id="goal-setter-heading">Set your points goal</h2>
      <p className={styles.intro}>
        Based on the Tokyo biz examples above, pick how many points you want to accrue. One-way often runs{' '}
        <strong>{tokyoPointRange.min.toLocaleString()}–{tokyoPointRange.high.toLocaleString()}+</strong>; round-trip is roughly double.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="goal-points">Target points</label>
        <div className={styles.row}>
          <input
            id="goal-points"
            type="text"
            inputMode="numeric"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 75000"
            className={styles.input}
          />
          <button type="submit" className={styles.btn}>Set goal</button>
        </div>
      </form>
      {currentGoal && (
        <p className={styles.current}>Current goal: <strong>{currentGoal.toLocaleString()} points</strong></p>
      )}
    </section>
  )
}
