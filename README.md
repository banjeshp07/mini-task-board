# Mini Task Board 🚀

A simple and clean full-stack task management web application built to handle day-to-day task tracking. I built this using **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **MySQL**. 

The main goal of this project was to keep the setup as friction-free as possible—meaning you don't have to manually run SQL scripts or create databases; the app handles table bootstrapping automatically on startup.

---

## Tech Stack Used

- **Frontend:** Next.js 15+ (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (Server-side handlers)
- **Database:** MySQL (`mysql2` package with connection pooling and parameterized queries)

---

## What it does (Features)

- **Auto-Initializes DB:** Automatically sets up the database and tasks table if they don't already exist on the server.
- **Full CRUD Support:** Add new tasks, update their status (`todo`, `in-progress`, `done`), and delete them with instant UI feedback.
- **Safe Queries:** Uses parameterized SQL queries everywhere to prevent SQL injection.
- **Input & Error Handling:** Validates inputs (e.g., prevents empty task titles) and handles loading/error states cleanly on the frontend.

---

## Project Structure

```text
mini-task-board/
├── src/
│   ├── app/
│   │   ├── api/tasks/        # Backend API endpoints (GET, POST, PATCH, DELETE)
│   │   ├── globals.css       # Tailwind styles
│   │   └── page.tsx          # Main UI page
│   ├── components/           # Reusable UI components (TaskForm, TaskList)
│   ├── lib/                  # MySQL connection and auto-bootstrapping logic
│   └── types/                # Shared TypeScript interfaces
├── package.json
└── README.md
```

## 1. How to Run Locally
If you want to test or evaluate this project, follow these quick steps:
```text
git clone <https://github.com/banjeshp07/mini-task-board.git>
cd mini-task-board
npm install
```

##2. Setup Environment Variables
Create a .env file in the root folder and add your MySQL credentials:
```text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=task_board_db
```

## 3. Start Development Server
```text
npm run dev
```

Open http://localhost:3000 in your browser.


## API Endpoints Overview
```text
GET /api/tasks - Fetch all tasks
POST /api/tasks - Create a new task
PATCH /api/tasks/:id - Update task status
DELETE /api/tasks/:id - Delete a task
```