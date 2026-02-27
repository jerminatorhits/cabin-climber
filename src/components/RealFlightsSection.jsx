import { tokyoBizExamples, tokyoPointRange } from '../data/tokyoExamples'
import styles from './RealFlightsSection.module.css'

const SEATS_AERO_SEARCH = 'https://seats.aero/search'

export default function RealFlightsSection() {
  return (
    <section className={styles.section} aria-labelledby="real-flights-heading">
      <h2 id="real-flights-heading" className={styles.heading}>
        Real business class flights you can book with points
      </h2>
      <p className={styles.subline}>
        One-way award prices we’ve seen. If you can get to this range, Tokyo biz is within reach.
      </p>
      <div className={styles.range}>
        <span>Typical one-way range:</span>{' '}
        <strong>{tokyoPointRange.min.toLocaleString()} – {tokyoPointRange.high.toLocaleString()}+ points</strong>
      </div>
      <ul className={styles.flightList}>
        {tokyoBizExamples.map((row, i) => (
          <li key={i} className={styles.flightCard}>
            <div className={styles.route}>
              <span className={styles.origin}>{row.origin}</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.dest}>Tokyo</span>
            </div>
            <div className={styles.details}>
              <span className={styles.airline}>{row.airline}</span>
              <span className={styles.points}>{row.points.toLocaleString()} pts</span>
              <span className={styles.program}>{row.currency}</span>
              {row.note && <span className={styles.note}>{row.note}</span>}
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.ctaWrap}>
        <a href={SEATS_AERO_SEARCH} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          See live availability for your dates →
        </a>
        <span className={styles.ctaNote}>When you’re ready to book, search there. We help you get the points.</span>
        <span className={styles.attribution}>Powered by seats.aero</span>
      </p>
    </section>
  )
}
