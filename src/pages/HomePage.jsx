import { Link } from 'react-router-dom'
import TokyoBizExamples from '../components/TokyoBizExamples'
import CashVsPoints from '../components/CashVsPoints'
import HowToSpend from '../components/HowToSpend'
import Disclaimer from '../components/Disclaimer'
import { recommendedCards } from '../data/cards'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Cabin Climber</h1>
        <p className={styles.tagline}>Fly business class to Tokyo on points</p>
        <p className={styles.heroIntro}>
          Tokyo business class on points is within reach—everyday spending and a few smart cards can get you there. See what it costs, which cards help, and track your progress.
        </p>
        <Link to="/my-progress" className={styles.cta}>Track my progress →</Link>
      </section>

      <section className={styles.howItWorks} aria-labelledby="how-it-works-heading">
        <h2 id="how-it-works-heading">How it works</h2>
        <p className={styles.howIntro}>Four steps from "someday" to boarding.</p>
        <ol className={styles.steps}>
          <li className={styles.step}>
            <span className={styles.stepNum}>1</span>
            <div>
              <strong>See what Tokyo biz costs.</strong> One-way award prices vary by airline and program; we show a rough range and real examples below.
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNum}>2</span>
            <div>
              <strong>Compare cash vs points.</strong> Business class is expensive in cash but often reachable with a modest points bump over economy.
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNum}>3</span>
            <div>
              <strong>Pick cards that fit.</strong> Chase and Amex cards that transfer to United, ANA, Virgin Atlantic, and others can get you there.
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNum}>4</span>
            <div>
              <strong>Track your progress.</strong> Set a points goal, add cards you're working on, and log spend or existing points—all saved in your browser.
            </div>
          </li>
        </ol>
      </section>

      <TokyoBizExamples />
      <CashVsPoints />

      <section className={styles.section} aria-labelledby="card-recs-heading">
        <h2 id="card-recs-heading">Card recommendations</h2>
        <p className={styles.intro}>
          These Chase and Amex cards earn points you can transfer to airline programs that fly to Tokyo in business. We’ve ordered them by ease of approval and relevance for this goal. Add any to your plan on <strong>My progress</strong> and track spend toward each bonus.
        </p>
        <ul className={styles.cardList}>
          {recommendedCards.map((card) => (
            <li key={card.id} className={styles.cardItem}>
              <strong>{card.name}</strong> — {card.bonus.toLocaleString()} pts after ${card.spendRequired?.toLocaleString()} spend in {card.monthsToSpend} months. {card.note}
            </li>
          ))}
        </ul>
      </section>

      <HowToSpend />
      <Disclaimer />
    </main>
  )
}
