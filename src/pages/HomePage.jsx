import { Link } from 'react-router-dom'
import RealFlightsSection from '../components/RealFlightsSection'
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
        <p className={styles.tagline}>Real business class to Tokyo—on points</p>
        <p className={styles.heroIntro}>
          See real flights you can actually book. Then we’ll show you which cards get you the points and how to track your way there.
        </p>
        <div className={styles.ctaBlock}>
          <Link to="/my-progress" className={styles.cta}>Track my progress →</Link>
          <a href="#real-flights-heading" className={styles.ctaSecondary}>I have points—show me flights</a>
        </div>
      </section>

      <RealFlightsSection />

      <section className={styles.howItWorks} aria-labelledby="how-it-works-heading">
        <h2 id="how-it-works-heading">How it works</h2>
        <p className={styles.howIntro}>Four steps from "someday" to boarding.</p>
        <ol className={styles.steps}>
          <li className={styles.step}>
            <span className={styles.stepNum}>1</span>
            <div>
              <strong>See what Tokyo biz costs.</strong> One-way award prices vary by airline and program; we show a rough range and real examples above.
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
              <strong>Track your progress.</strong> Set a points goal, add cards you're working on, and log spend or existing points. Sign in to save across devices.
            </div>
          </li>
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="why-heading">
        <h2 id="why-heading">Why Cabin Climber?</h2>
        <p className={styles.intro}>
          We’re focused on one thing: getting you to Tokyo in business on points. Tools like seats.aero show you what’s available to book—we help you earn and track so you’re ready when you are.
        </p>
        <ul className={styles.valueList}>
          <li><strong>One goal, one number.</strong> We tell you what to aim for (e.g. 75k one-way) and keep everything pointed at that target.</li>
          <li><strong>Card strategy.</strong> Which cards to get, in what order, and how to track each bonus (spend $X in Y months) so you don’t leave points on the table.</li>
          <li><strong>Progress you own.</strong> Set your goal, log your points and spend, and see how close you are. Your data stays yours; sign in to save across devices.</li>
          <li><strong>Tokyo-only.</strong> No generic “travel hacking” overload—just cards and programs that actually get you to Tokyo in biz.</li>
        </ul>
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
