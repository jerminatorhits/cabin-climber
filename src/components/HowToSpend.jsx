import styles from './HowToSpend.module.css'
export default function HowToSpend() {
  return (
    <section className={styles.section} aria-labelledby="how-to-spend-heading">
      <h2 id="how-to-spend-heading">How to spend your points (Tokyo business)</h2>
      <p className={styles.intro}>Transfer from your card program to an airline, then search and book on that airline’s site.</p>
      <ul className={styles.steps}>
        <li><strong>Chase Ultimate Rewards</strong> → Transfer to <strong>United</strong> (book United or ANA) or <strong>Virgin Atlantic</strong> (book ANA).</li>
        <li><strong>Amex Membership Rewards</strong> → Transfer to <strong>ANA</strong>, <strong>Virgin Atlantic</strong>, or <strong>Delta</strong>.</li>
        <li>Check availability before transferring—transfers are usually one-way and can’t be reversed.</li>
      </ul>
    </section>
  )
}
