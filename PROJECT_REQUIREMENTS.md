# HABITFLOW -- DAILY HABIT TRACKER

## Project Requirements and Build Instructions for Google Antigravity

## 1. Project Overview

**Project name:** HabitFlow -- Daily Habit Tracker\
**Project type:** Frontend web application\
**Level:** Beginner to intermediate\
**Purpose:** Build a simple, useful habit-tracking application while
learning React fundamentals and creating a project that can be explained
in a fresher-level interview.

### Main goal

Users should be able to create daily habits, mark them as completed,
view their progress, and keep their data after refreshing the page.

Build the first version as a frontend-only application. Do not add a
backend or authentication system.

## 2. Technology Stack

Use the following technologies:

-   React.js
-   JavaScript (not TypeScript)
-   Vite
-   HTML5
-   CSS3
-   React Hooks (`useState`, `useEffect`, and `useMemo` where useful)
-   Browser `localStorage` for saving data

Optional libraries: - `date-fns` for date calculations, if it makes the
code easier to understand. - `lucide-react` for simple icons.

Do not add libraries unless they are genuinely needed.

## 3. Main Features

### 3.1 Dashboard

Create a dashboard that displays: - A welcome heading. - Today's date. -
Total number of habits. - Number of habits completed today. - Today's
completion percentage. - A list of the user's habits. - A simple
progress summary.

### 3.2 Add a Habit

The user should be able to add a habit with: - Habit name (required). -
Category (for example: Study, Health, Fitness, Personal). - Optional
short description.

After submission, the new habit should appear in the habit list.

### 3.3 View Habits

Each habit card should display: - Habit name. - Category. - Description,
if provided. - Today's completion status. - A button to mark the habit
as complete or undo completion.

### 3.4 Edit a Habit

Allow the user to update a habit's name, category, and description.

### 3.5 Delete a Habit

Allow the user to delete a habit. Ask for confirmation before deleting
it.

### 3.6 Daily Completion Tracking

-   A user can mark a habit as completed for the current date.
-   A user can undo today's completion.
-   A habit can only be counted once per date.
-   Completing a habit today must not mark it complete on another date.

### 3.7 Progress

Show: - Completed habits today. - Total habits. - Daily completion
percentage. - A simple visual progress bar. - A current streak for each
habit, if practical.

Keep streak logic simple and explainable. A streak is the number of
consecutive dates on which the habit was completed, counting back from
today. If it was not completed today, the calculation may allow the
streak to continue from yesterday.

### 3.8 Activity Calendar

Show a simple calendar or activity grid for recent days (for example,
the last 28 days). Indicate how many habits were completed on each date.

### 3.9 Data Persistence

Use `localStorage` so habits and completion records remain available
after: - Refreshing the page. - Closing and reopening the browser in the
same browser profile.

Handle missing or invalid stored data safely by using sensible default
values.

### 3.10 Responsive Design

The application should work on: - Desktop screens. - Tablets. - Mobile
screens.

On small screens, navigation and cards should fit without horizontal
overflow.

## 4. Suggested Pages and Navigation

Create a simple navigation layout with these pages:

1.  **Dashboard** -- today's progress and habit list.
2.  **Analytics** -- activity calendar and simple progress information.
3.  **Settings** -- basic preferences or a simple option to clear all
    application data.

Do not overbuild the Settings page. If a feature is not needed for the
first version, keep the page minimal.

## 5. Suggested Folder Structure

Use this structure as a guide. You may make small improvements when
necessary, but keep the project easy for a beginner to understand.

``` text
habitflow/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── HabitCard.jsx
│   │   ├── HabitForm.jsx
│   │   ├── HabitList.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── StreakCounter.jsx
│   │   └── CalendarHeatmap.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Analytics.jsx
│   │   └── Settings.jsx
│   ├── hooks/
│   │   ├── useHabits.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── streakUtils.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── dashboard.css
│   │   └── components.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

Do not create every file at once if it is not needed yet. Add files as
each development phase begins.

## 6. Suggested Data Structure

Keep the data model simple.

### Habit object

``` javascript
{
  id: "habit_001",
  name: "Practice Python",
  category: "Study",
  description: "Solve coding problems",
  createdAt: "2026-11-14"
}
```

### Completion records

Store completed dates for each habit. One simple structure is:

``` javascript
{
  "habit_001": [
    "2026-11-14",
    "2026-11-15"
  ],
  "habit_002": [
    "2026-11-14"
  ]
}
```

Use the date format `YYYY-MM-DD` consistently. Avoid comparing dates in
inconsistent formats.

You may adjust the internal structure if needed, but explain the reason
and keep it beginner-friendly.

## 7. Design Guidelines

Aim for a clean, modern, calm dashboard. Avoid excessive decoration.

### Suggested colors

  Purpose           Color
  ----------------- -----------
  Primary           `#6366F1`
  Page background   `#F8FAFC`
  Card background   `#FFFFFF`
  Main text         `#1E293B`
  Secondary text    `#64748B`
  Success           `#16A34A`
  Borders           `#E2E8F0`

### Layout

-   Use a sidebar or simple top navigation.
-   Use cards for habit information.
-   Keep spacing consistent.
-   Use clear labels and readable font sizes.
-   Make buttons easy to identify.
-   Show a useful empty state when the user has not added any habits.
-   Show simple validation messages for invalid form input.
-   Include hover and focus states, but avoid unnecessary animations.

The design should look polished but remain realistic for a
beginner-to-intermediate React project.

## 8. Coding Standards

Follow these rules throughout the project:

1.  Use JavaScript and JSX, not TypeScript.
2.  Use functional React components.
3.  Use React Hooks where appropriate.
4.  Use normal CSS files; do not use a complex styling framework.
5.  Keep components small and focused.
6.  Use clear variable and function names.
7.  Use props to pass data between components.
8.  Use simple functions and array methods such as `map`, `filter`, and
    `find`.
9.  Avoid unnecessary abstraction and advanced patterns.
10. Do not use Redux.
11. Do not add a backend, database, or authentication in version one.
12. Add comments only where the logic may be difficult to understand.
13. Do not put the entire application in one file.
14. Do not install unnecessary packages.
15. Keep the code readable and easy to explain in an interview.

## 9. Development Plan -- Build One Phase at a Time

**Important:** Complete only one phase at a time. After each phase,
explain what was created and wait for approval before continuing.

### Phase 1 -- Project Setup

-   Create a Vite React project.
-   Explain the terminal commands.
-   Explain the important starter files.
-   Remove unused starter content.
-   Confirm that the application runs.

### Phase 2 -- Basic Layout

-   Create the main application layout.
-   Add navigation.
-   Add the dashboard page structure.
-   Add basic responsive CSS.
-   Use temporary sample data only if needed for layout.

### Phase 3 -- Habit Components

-   Create `HabitCard`.
-   Create `HabitForm`.
-   Create `HabitList`.
-   Create `ProgressBar`.
-   Pass data through props.
-   Explain how the components work together.

### Phase 4 -- Habit Management

-   Add a habit.
-   Display all habits.
-   Edit a habit.
-   Delete a habit with confirmation.
-   Validate required fields.

### Phase 5 -- Daily Completion

-   Add the complete/undo button.
-   Save completion dates.
-   Prevent duplicate completion entries for the same habit and date.
-   Explain the date-handling logic.

### Phase 6 -- Local Storage

-   Save habits and completion records in `localStorage`.
-   Load saved data when the application starts.
-   Confirm that data remains after refreshing.
-   Explain `useEffect` and JSON conversion in simple terms.

### Phase 7 -- Progress and Streaks

-   Calculate today's completed habits.
-   Calculate the completion percentage.
-   Display the progress bar.
-   Calculate a simple streak for each habit.
-   Explain the calculations with a small example.

### Phase 8 -- Activity Calendar

-   Display the last 28 days.
-   Show completion activity for each date.
-   Use simple visual levels to represent activity.
-   Explain how dates are generated and compared.

### Phase 9 -- UI Polish and Responsive Design

-   Improve spacing, typography, colors, and cards.
-   Add empty states and helpful messages.
-   Test desktop, tablet, and mobile layouts.
-   Check that buttons and forms work correctly.

### Phase 10 -- Testing and README

-   Test all main features.
-   Fix errors and warnings.
-   Write a README with project overview, features, technologies, setup
    steps, and screenshots section.
-   Explain how to run the project locally.

## 10. Testing Checklist

Before considering the project complete, test the following:

-   [ ] The app starts without errors.
-   [ ] A user can add a habit.
-   [ ] Required habit name validation works.
-   [ ] A user can edit a habit.
-   [ ] A user can delete a habit.
-   [ ] A user can mark a habit complete.
-   [ ] A user can undo today's completion.
-   [ ] The same habit cannot be counted twice on one date.
-   [ ] Daily progress is calculated correctly.
-   [ ] Streak values are reasonable for sample completion histories.
-   [ ] The activity calendar shows the correct dates.
-   [ ] Data remains after refreshing the page.
-   [ ] The empty state appears when there are no habits.
-   [ ] The layout works on mobile and desktop.
-   [ ] There are no major console errors.

## 11. Features Not Included in Version One

Do not add these features unless they are requested later:

-   User registration and login.
-   Firebase or another backend.
-   SQL or other databases.
-   Redux or complex state-management libraries.
-   Payments or subscriptions.
-   AI-based recommendations.
-   Social sharing or friend systems.
-   Complex notification systems.
-   Multi-user synchronization.

The goal is to finish a reliable and understandable first version before
considering extra features.

## 12. Instructions for Google Antigravity

Read this entire document before making changes.

Follow these instructions strictly:

1.  Treat this document as the project requirement.
2.  Start with **Phase 1 only**.
3.  Do not implement all phases in one response or one operation.
4.  Before creating files, briefly explain the steps you are going to
    perform.
5.  Explain terminal commands in beginner-friendly language.
6.  After creating or editing files, explain each important file and the
    reason it exists.
7.  Keep the code simple, readable, and suitable for a
    beginner-to-intermediate React learner.
8.  Use separate files and the suggested folder structure.
9.  Do not add features that are outside the requirements.
10. Do not make unrelated changes to files.
11. After each phase, provide a short manual testing checklist.
12. Stop after the current phase and wait for the user to approve the
    next phase.
13. If a requirement is unclear, ask before making a major design
    decision.
14. Do not claim a feature works until it has been implemented and
    tested.

The purpose is to build a practical learning project. Prioritize correct
functionality, clean code, and clear explanations over unnecessary
complexity.

## 13. First Prompt to Give Antigravity

After saving this document as `PROJECT_REQUIREMENTS.md` in the project
root, send Antigravity this prompt:

> Read `PROJECT_REQUIREMENTS.md` carefully. Start only Phase 1. Explain
> the commands before running them, create the Vite React project, and
> explain the important files you create. Do not implement any other
> phase yet. After Phase 1, show me how to run and test the application,
> then wait for my approval.

## 14. How to Work With the Project

-   Run the application and test each feature yourself.
-   Read the code Antigravity creates.
-   Ask for a simpler explanation whenever a function or React concept
    is unclear.
-   Try small changes yourself instead of asking the tool to do
    everything.
-   Be prepared to explain `useState`, `useEffect`, props, `map`,
    `filter`, `localStorage`, and the streak calculation.
-   Keep a record of issues you fixed and what you learned.

A strong portfolio project is one you can demonstrate, explain, and
maintain yourself.
