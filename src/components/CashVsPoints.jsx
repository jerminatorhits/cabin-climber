import styles from './CashVsPoints.module.css'
const example = { bizCash: 3000, bizPoints: 75000, economyCash: 600, economyPoints: 50000 }
const extraPoints = example.bizPoints - example.economyPoints
const extraValue = example.bizCash - example.economyCash

export default function CashVsPoints() {
  return (
    <section className={styles.section} aria-labelledby="cash-vs-points-heading">
      <h2 id="cash-vs-points-heading">Why use points for business class?</h2>
      <p className={styles.intro}>The <strong>cash value</strong> of biz is usually much higher than economy, while <strong>extra points</strong> needed are relatively small.</p>
      <div className={styles.grid}>
        <div className={styles.card}><div className={styles.label}>Economy</div><div className={styles.value}>${example.economyCash.toLocaleString()}</div><div className={styles.points}>{example.economyPoints.toLocaleString()} miles</div></div>
        <div className={styles.card}><div className={styles.label}>Business</div><div className={styles.value}>${example.bizCash.toLocaleString()}</div><div className={styles.points}>{example.bizPoints.toLocaleString()} miles</div></div>
      </div>
      <p className={styles.takeaway}>For about <strong>+{extraPoints.toLocaleString()} points</strong> you get <strong>~${extraValue.toLocaleString()} in value</strong>.</p>
    </section>
  )
}
