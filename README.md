# Cabin Climber

Fly business class to Tokyo on points. Set a goal, track cards, and log your progress.

## Quick start

```bash
npm i
npm run dev
```

## Optional: User accounts (Google, email)

The app works without an account (progress is stored in your browser). To enable sign-in:

1. Create a [Firebase](https://console.firebase.google.com/) project and add a Web app.
2. In **Authentication** → **Sign-in method**, enable **Google** and **Email/Password**.
3. Copy `.env.example` to `.env` and fill in your Firebase config (Project settings → Your apps → SDK setup).
4. In **Firestore Database**, create a database (if needed) and add rules so each user can read/write only their progress:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /progress/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

5. Restart the dev server. You’ll see **Sign in** in the navbar; users can sign in with Google or email/password. **Progress is saved to the signed-in user’s account** (Firestore); when signed out, progress is in-memory only and is not persisted.
