# Cabin Climber

Fly business class to Tokyo on points. Set a goal, track cards, and log your progress.

## Quick start

```bash
npm i
npm run dev
```

## Optional: User accounts (Google, Apple, email)

The app works without an account (progress is stored in your browser). To enable sign-in:

1. Create a [Firebase](https://console.firebase.google.com/) project and add a Web app.
2. In **Authentication** → **Sign-in method**, enable **Google**, **Email/Password**, and optionally **Apple**.
3. Copy `.env.example` to `.env` and fill in your Firebase config (Project settings → Your apps → SDK setup).
4. Restart the dev server. You’ll see **Sign in** in the navbar; users can sign in with Google, Apple, or email/password.
