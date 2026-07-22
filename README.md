# Task Management Mini App

A small task management app built with Vue 3, showcasing the Composition API, Pinia state management, and Tailwind CSS.

## Features

- View a list of tasks (title, description, status, due date)
- Add a new task with validation (title required, due date must be in the future)
- Edit and delete existing tasks
- Filter tasks by status and search by title
- Loading and error states for data fetching and task actions
- Simulated API layer (mock data + artificial network delay)

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **TypeScript**
- **Pinia** for state management
- **Tailwind CSS** for styling
- **Vue Router**
- **vee-validate** + **yup** for form validation
- **Vitest** for unit tests

## Project Structure

```
src/
├── assets/
├── components/       # TaskCard, TaskList, TaskForm, TaskFilters
├── composables/
├── mock/             # Mock task data
├── pages/            # Home (task list page)
├── router/
├── services/         # taskService — simulated API layer
├── stores/           # Pinia task store
├── types/            # Task type definitions
├── validation/        # yup schema for the task form
├── App.vue
└── main.ts
```

## Setup & Run

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or the port Vite assigns).

4. Build for production:

   ```bash
   npm run build
   ```

5. Run unit tests:
   ```bash
   npm run test
   ```

## Notes

- Task data is served from an in-memory mock (`src/mock/tasks.ts`) through `taskService`, with an artificial delay to simulate a real network request.
- Form validation is handled with `vee-validate` + `yup`: the task title is required, and the due date must be strictly in the future (today does not count).
- Task list filtering (by status) and searching (by title) are computed client-side and update instantly as you type or change the filter.
