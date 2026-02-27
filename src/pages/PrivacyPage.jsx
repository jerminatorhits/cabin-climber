import { Link } from 'react-router-dom'
import styles from './PrivacyPage.module.css'

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: February 2026</p>

      <section className={styles.section}>
        <h2>What we collect</h2>
        <p>
          When you sign in (Google or email), we use Firebase Authentication. We receive your email address and, if you use Google, your name and profile picture from the provider. We do not receive or store your password when you use Google sign-in.
        </p>
        <p>
          When you use the app while signed in, we store your progress (points goal, cards, and existing points) in Firebase Firestore, associated with your account. This data is used only to show your progress when you sign in on another device.
        </p>
      </section>

      <section className={styles.section}>
        <h2>How we use it</h2>
        <p>
          We use your progress data only to provide the Cabin Climber service. We do not sell your data to third parties. We do not use your data for advertising.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Third-party services</h2>
        <p>
          We use Google Firebase (Authentication and Firestore) to handle sign-in and to store your progress. Firebase’s privacy practices are governed by Google’s Privacy Policy. Your data is stored by Google in accordance with their terms.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Contact</h2>
        <p>
          If you have questions about this policy or your data, use the Feedback link in the site footer.
        </p>
      </section>

      <p className={styles.back}>
        <Link to="/">← Back to Cabin Climber</Link>
      </p>
    </main>
  )
}
