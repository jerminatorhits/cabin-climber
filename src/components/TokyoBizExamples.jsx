import { tokyoBizExamples, tokyoPointRange } from '../data/tokyoExamples'
import styles from './TokyoBizExamples.module.css'

export default function TokyoBizExamples() {
  return (
    <section className={styles.section} aria-labelledby="tokyo-examples-heading">
      <h2 id="tokyo-examples-heading">What does Tokyo business class cost in points?</h2>
      <p className={styles.intro}>
        One-way award costs vary. <strong>Some cost more than others</strong>. Cheaper “saver” space often appears <strong>close-in</strong>—<strong>time flexibility</strong> helps.
      </p>
      <div className={styles.range}>
        <span>Rough range (one-way):</span> <strong>{tokyoPointRange.min.toLocaleString()} – {tokyoPointRange.high.toLocaleString()}+ points</strong>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr><th>Airline</th><th>From</th><th>Points</th><th>Program</th><th>Notes</th></tr>
          </thead>
          <tbody>
            {tokyoBizExamples.map((row, i) => (
              <tr key={i}>
                <td>{row.airline}</td><td>{row.origin}</td>
                <td className={styles.num}>{row.points.toLocaleString()}</td>
                <td>{row.currency}</td><td className={styles.note}>{row.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
