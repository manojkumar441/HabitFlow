# HabitFlow — Daily Habit Tracker

> A modern, lightweight habit tracking web application built with **React**, **Vite**, and **Firebase Authentication**. Features clean component architecture, per-user data isolation, responsive design, and explainable logic ideal for fresher-level frontend interviews.

---

## 📖 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Technology Stack](#-technology-stack)
4. [Folder & Component Structure](#-folder--component-structure)
5. [Getting Started Locally](#-getting-started-locally)
6. [Firebase Authentication Setup](#-firebase-authentication-setup)
7. [How It Works (Interview Concepts)](#-how-it-works-interview-concepts)
8. [Testing & Verification Checklist](#-testing--verification-checklist)
9. [License](#-license)

---

## 🎯 Project Overview

HabitFlow helps users build positive, lifelong daily habits and monitor their consistency over time. Users can sign up securely, log in, manage personalized habits, check off daily goals, monitor streaks, and view a 28-day activity heatmap.

Each user's habits and completion logs are strictly isolated using their unique Firebase User ID (`UID`), while preserving existing legacy habit data through an automatic, non-destructive migration engine.

---

## ✨ Key Features

### 1. User Authentication (Firebase Auth)
* **Secure Signup:** Full Name, Email, Password, and Confirm Password with client-side validation and password match checks.
* **Email & Password Login:** Sign in with friendly, translated Firebase error messaging.
* **Forgot Password:** Self-service password reset email link powered by Firebase `sendPasswordResetEmail`.
* **Show/Hide Password:** Interactive toggle (👁️ / 🙈) on all password fields.
* **Session Persistence:** Uses Firebase's `onAuthStateChanged` to maintain authenticated sessions across browser refreshes.
* **Route Protection (`ProtectedRoute`):** Redirects unauthenticated visitors to `/login`, prevents authenticated users from revisiting `/login` or `/signup`, and provides an animated loading spinner during session checks.
* **Navbar User Integration:** Displays the user's name/email avatar pill and an accessible **Logout** button.

### 2. Multi-User Data Isolation & Safe Migration
* **Per-User Namespaces:** Habits and completion records are saved under `habitflow_${userId}_habits` and `habitflow_${userId}_completions`.
* **Zero Data Bleed:** Logging out and logging in as another user switches the workspace cleanly—no user can view or overwrite another user's habits.
* **Safe Migration:** The first user to authenticate automatically inherits any pre-existing unauthenticated habit data without deleting or overwriting old records.
* **Zero Password Storage:** Passwords and credentials are never stored in `localStorage`.

### 3. Daily Dashboard
* **Header & Today's Date:** Displays a greeting and the formatted current date (`e.g., Sat, Nov 14, 2026`).
* **Real-time Overview Metrics:**
  * **Total Habits:** Number of habits currently active.
  * **Completed Today:** Count of habits checked off today.
  * **Daily Progress:** Live completion rate percentage.
  * **Best Streak:** Highest active consecutive day streak across all habits.
* **Visual Progress Bar:** Smoothly animates to reflect today's completion percentage (`completed / total * 100`).
* **Milestone Banners:** Celebrates when 100% of today's habits are completed.

### 4. Habit Management (Full CRUD)
* **Create:** Modal form to add a habit with a required name, category (`Study`, `Health`, `Fitness`, `Personal`), and optional description.
* **Read:** Interactive cards displaying category badges, streak badges, descriptions, and completion status.
* **Update:** Edit any habit in place; the modal re-opens prefilled with existing data.
* **Delete with Confirmation:** Destructive deletion is guarded by a confirmation dialog (`ConfirmModal`) to prevent accidental data loss.
* **Validation & Character Limits:** Inline error banner for empty names; 60 character limit for names and 200 for descriptions.

### 5. Daily Completion Tracking
* **Date-Isolated Logging:** Habits are checked off specifically for the current date (`YYYY-MM-DD`). Completing a habit today never alters past or future records.
* **Duplicate Protection:** Uses JavaScript `Set` to guarantee a habit cannot be logged more than once on the same date.
* **Undo Functionality:** Easily uncheck a completed habit for today; counters and progress bars recalculate immediately.

### 6. Consecutive Day Streak Calculation
* **Consecutive Counting:** Counts consecutive days of completion backwards from today.
* **Streak Preservation:** If a habit was completed yesterday but not yet today, the streak remains intact (`e.g. 2 days`), giving the user the remainder of today to continue the streak!
* **Reset Detection:** If a habit was missed both today and yesterday, the streak resets to `0`.

### 7. 28-Day Activity Heatmap (Analytics Page)
* **4-Week Chronological Grid:** Displays the past 28 days ending on today.
* **Color Intensity Levels:**
  * Level 0: 0 habits (`#F8FAFC`)
  * Level 1: 1 habit (`#DCFCE7` light green)
  * Level 2: 2 habits (`#86EFAC` medium green)
  * Level 3: 3+ habits (`#22C55E` rich green)
* **Today Marker:** Highlighted with a blue focus ring.
* **Interactive Inspection:** Hover to view tooltips; click any cell to inspect the exact habit names completed on that day.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime & Build** | [Vite](https://vite.dev/) | Ultra-fast local dev server and optimized production bundler |
| **UI Framework** | React 19 | Functional components, hooks (`useState`, `useEffect`, `useMemo`, `useContext`) |
| **Authentication** | Firebase Auth | Secure user sign-up, sign-in, session listener, and password reset |
| **Routing** | React Router v7 | Declarative routing (`/login`, `/signup`, `/forgot-password`, `/*`), protected routes |
| **Language** | JavaScript (ES6+ / JSX) | Pure, beginner-friendly JavaScript without TypeScript complexity |
| **Styling** | Vanilla CSS3 | Custom properties (CSS variables), CSS Grid, and Flexbox |
| **Persistence** | Browser `localStorage` | Per-user client-side persistence isolated by Firebase `UID` |
| **Linting** | Oxlint | Fast code analysis ensuring zero warnings and strict React Compiler purity |

---

## 📂 Folder & Component Structure

```text
habitflow/
├── public/
│   └── favicon.svg              # Browser tab icon
├── src/
│   ├── components/              # Modular UI components
│   │   ├── CalendarHeatmap.jsx  # 28-day activity grid with color levels
│   │   ├── ConfirmModal.jsx     # Reusable confirmation dialog for delete/reset
│   │   ├── HabitCard.jsx        # Individual card showing habit info, actions, & status
│   │   ├── HabitForm.jsx        # Modal form for creating & editing habits
│   │   ├── HabitList.jsx        # Container rendering habit cards or empty state
│   │   ├── Navbar.jsx           # Top branding bar with user avatar & Logout button
│   │   ├── ProgressBar.jsx      # Animated percentage progress meter
│   │   ├── ProtectedRoute.jsx   # Route guards (ProtectedRoute & PublicRoute)
│   │   ├── Sidebar.jsx          # Desktop sidebar and mobile navigation drawer
│   │   └── StreakCounter.jsx    # Visual flame streak badge (🔥 X days)
│   ├── context/                 # Global React Context
│   │   ├── authContext.js       # Central AuthContext definition
│   │   └── AuthProvider.jsx     # Firebase Auth session state & functions provider
│   ├── firebase/                # Firebase initialization
│   │   └── config.js            # Modular Firebase app and auth instance
│   ├── hooks/                   # Custom reusable React hooks
│   │   ├── useAuth.js           # Hook to consume AuthContext cleanly
│   │   ├── useHabits.js         # Habit management and CRUD logic (per-user UID isolated)
│   │   └── useLocalStorage.js   # Dynamic key persistence hook
│   ├── pages/                   # View components
│   │   ├── Analytics.jsx        # 28-day activity heatmap and consistency metrics
│   │   ├── Dashboard.jsx        # Main daily dashboard view with filters
│   │   ├── ForgotPassword.jsx   # Password reset request screen
│   │   ├── Login.jsx            # Sign in screen
│   │   ├── Settings.jsx         # Isolated storage controls and account info
│   │   └── Signup.jsx           # Account creation screen
│   ├── styles/                  # Modular stylesheets
│   │   ├── auth.css             # Login, Signup, and ForgotPassword card styling
│   │   ├── components.css       # Styles for cards, buttons, modals, and heatmap
│   │   ├── dashboard.css        # Layout grid, statistics cards, and banners
│   │   └── global.css           # Design tokens, CSS variables, typography reset
│   ├── utils/                   # Pure helper functions
│   │   ├── authErrors.js        # Translates Firebase error codes to friendly text
│   │   ├── dateUtils.js         # YYYY-MM-DD formatting, range generation
│   │   └── streakUtils.js       # Consecutive streak calculation algorithms
│   ├── App.jsx                  # Root router configuring public and protected views
│   ├── index.css                # Global stylesheet entry point
│   └── main.jsx                 # React DOM mount entry with Router and AuthProvider
├── .env.example                 # Template for required Firebase keys
├── index.html                   # HTML host template
├── package.json                 # Project scripts and dependencies
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher recommended)
* `npm` (bundled with Node.js)

### Installation Steps

1. **Clone or navigate to the project directory:**
   ```powershell
   cd "C:\Users\manoj\Desktop\habit tracker\Habitflow"
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Configure Firebase Credentials:**
   * Copy `.env.example` to `.env`:
     ```powershell
     cp .env.example .env
     ```
   * Open `.env` and fill in your Firebase Web App configuration keys (see instructions below).

4. **Start the local development server:**
   ```powershell
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173).

6. **Build for production:**
   ```powershell
   npm run build
   ```

7. **Run linter:**
   ```powershell
   npm run lint
   ```

---

## 🔑 Firebase Authentication Setup

1. Open the [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Navigate to **Build** ➔ **Authentication** ➔ **Sign-in method**, and enable **Email/Password**.
3. Under **Project Settings** ➔ **General** ➔ **Your apps**, click **Add app** (Web `</>`).
4. Copy the config values and paste them into your **`Habitflow/.env`** file:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789...
   VITE_FIREBASE_APP_ID=1:123456789:web:...
   ```

---

## 💡 How It Works (Interview Concepts)

### 1. Per-User Data Isolation Without a Backend Database
```javascript
const habitsKey = userId ? `habitflow_${userId}_habits` : 'habitflow_guest_habits';
const completionsKey = userId ? `habitflow_${userId}_completions` : 'habitflow_guest_completions';
```
Each user's habits and completion history are partitioned under a key tagged with their unique Firebase `UID`. In `App.jsx`, `<HabitTrackerShell key={currentUser?.uid || 'guest'} />` enforces complete recreation of the component tree upon login or logout, eliminating state leakage across sessions.

### 2. Automatic Legacy Migration (Non-Destructive)
When an existing user upgrades and logs in for the first time:
1. The app detects that `habitflow_habits` exists and has not yet been assigned.
2. It safely copies the legacy habits into `habitflow_${userId}_habits`.
3. It sets `habitflow_legacy_migrated_uid = userId` so subsequent accounts receive fresh starter data instead of inheriting the first user's habits.
4. Old data is preserved intact (never deleted).

### 3. Route Protection & Session Recovery
```javascript
export function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}
```
* **No Premature Redirects:** While Firebase inspects browser storage to restore the session upon page reload, `loading` is `true` and renders `<LoadingScreen />`. Once verified, the page renders seamlessly without kicking the user to Login.

---

## ✅ Testing & Verification Checklist

- [x] **Firebase Integration:** Authentication initialized safely via environment variables in `.env`.
- [x] **Signup Flow:** Full Name, Email, Password (min 6), and Confirm Password validated with error feedback.
- [x] **Login Flow:** Sign in with email and password with translated error messages.
- [x] **Forgot Password:** Password reset email link sent via Firebase.
- [x] **Password Show/Hide:** Interactive eye toggle (👁️ / 🙈) working on all password inputs.
- [x] **Route Protection:** Direct access to `/` while logged out redirects to `/login`.
- [x] **Session Persistence:** Refreshing (`F5`) preserves login session without flashing or kicking user out.
- [x] **Navbar User Profile & Logout:** Displays user greeting and avatar; Logout button signs out and redirects to `/login`.
- [x] **User Isolation:** Two different accounts have completely separate habit lists and completion logs.
- [x] **Legacy Migration:** Pre-existing habits are safely preserved and assigned to the first account.
- [x] **Zero Password Storage:** Passwords are never written to `localStorage`.
- [x] **Code Quality:** `oxlint` reports 0 warnings and 0 errors across 28 files; `vite build` passes in < 400ms.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
