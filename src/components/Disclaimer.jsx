import styles from './Disclaimer.module.css'
export default function Disclaimer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <p className={styles.text}>
        <strong>Disclaimer:</strong> Points and miles valuations and availability change often. Confirm current rates and space with the airline or program before transferring or booking.
      </p>
    </footer>
  )
}
