# 🤖 Personal AI Assistant

> **A full-stack conversational productivity platform — three specialized AI agents to manage your memory, goals, and reminders, all in one place.**

[![Backend](https://img.shields.io/badge/Backend-Django%205.2-darkgreen?style=flat-square)](https://www.djangoproject.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-blue?style=flat-square)](https://react.dev/)
[![Auth](https://img.shields.io/badge/Auth-JWT-orange?style=flat-square)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=flat-square)](https://github.com/ShubhamChougale01/AI-work)

---

## What Is This?

Most productivity apps split your brain across five different tools. This project puts three core workflows — remembering things, tracking goals, and setting reminders — into a single conversational interface. You talk to an agent in plain English, and it does the rest.

No complex UI. No learning curve. Just ask.

---

## Agents Overview

| Agent | What It Does | Example Input |
|-------|-------------|---------------|
| 🧠 **Memory Agent** | Store and recall personal notes, facts, and context | `"Remember that my API key expires on July 15"` |
| 🎯 **Goal Tracker** | Create, update, and monitor goals with deadlines | `"Track my goal to finish the project by Friday"` |
| ⏰ **Reminders Agent** | Set time-based reminders in natural language | `"Remind me in 30 minutes to call the client"` |

---

## ⚡ Quick Setup (3 Steps)

### Step 1 — Clone the repo

```bash
git clone https://github.com/ShubhamChougale01/AI-work.git
cd AI-work
```

### Step 2 — Start the backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac / Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Step 3 — Start the frontend

```bash
cd Frontend
npm install
npm run dev
```

Open `http://localhost:3000`. The API runs at `http://localhost:8000`.

> **Tip:** API docs are live at `http://localhost:8000/swagger/` once the backend is running.

---

## Feature Details

---

### 🧠 Memory Agent

Store anything you want to remember — notes, facts, links, context — and retrieve it later by keyword or topic.

**What it does:**
- Detects intent via keywords (`remember`, `store`, `recall`, `find`, `what do I know about`)
- Saves entries with tags for easy filtering
- Returns matching memories ranked by relevance
- Persists across sessions via the database

**Why it matters:**
Your browser has bookmarks. Your phone has notes. But there's no single place that understands "what did I save about that project last month?" — this is that place.

---

### 🎯 Goal Tracking Agent

Create and manage personal goals through conversation. No forms, no dashboards — just tell it what you're working toward.

**What it does:**
- Parses goal text, deadline, and status from natural language
- Tracks status: `pending → in_progress → completed`
- Lists active goals on demand
- Updates or closes goals via follow-up messages

**Why it matters:**
Goals die when tracking them becomes work. Conversational updates lower the friction enough that you actually keep them current.

---

### ⏰ Reminders Agent

Set reminders in plain English — no date pickers, no time zone math.

**What it does:**
- Parses relative time (`in 10 minutes`, `in 2 hours`)
- Parses absolute time (`tomorrow at 9am`, `June 15 at 3pm`)
- Marks reminders as completed when acknowledged
- Background delivery via Celery + Redis

**Why it matters:**
The best reminder system is the one you actually use. If setting a reminder takes less than one sentence, you'll set it.

---

### 🔐 Authentication

Secure, stateless auth so your data stays yours.

**What it does:**
- JWT-based login and registration
- Token refresh without re-login
- Password reset via email
- Every agent endpoint is protected — no public access to your data

---

### 📦 Data Management

Full control over everything the app stores about you.

**What it does:**
- Export all your memories, goals, reminders, and chat history as **JSON** or **CSV**
- Import data to restore or migrate
- One endpoint, all your data — no vendor lock-in

---

## Architecture Flow

```
User types a message in the chat interface
         │
         ▼
  React Frontend (port 3000)
  ChatInterface.tsx → AgentSelector.tsx
         │
         │  POST /api/memory/ | /api/goals/ | /api/reminders/
         │  Authorization: Bearer <JWT>
         ▼
  Django REST Framework (port 8000)
  urls.py → views/memory_agent.py
           views/goal_tracking_agent.py
           views/reminders_agent.py
         │
         ├── services/memory_service.py   ← keyword parsing + DB write/read
         ├── services/goal_service.py     ← status tracking + deadline parsing
         └── services/reminder_service.py ← time parsing + Celery task dispatch
                   │
                   ├── SQLite DB (dev) ← ChatMessage, Memory, Goal, Reminder, UserProfile
                   └── Celery + Redis  ← async reminder delivery
         │
         ▼
  JSON response → React updates chat history
```

---

## Folder Structure

```
AI-work/
├── Backend/                        # Django project root
│   ├── Backend/                    # Django config module
│   │   ├── settings.py             # CORS, JWT, Celery, database config
│   │   ├── urls.py                 # Root URL routing + Swagger docs
│   │   ├── celery.py               # Async task queue setup
│   │   └── asgi.py                 # WebSocket support (Channels)
│   ├── agents/                     # Core application
│   │   ├── models.py               # Memory, Goal, Reminder, ChatMessage, UserProfile
│   │   ├── views/
│   │   │   ├── auth.py             # Register, login, password reset
│   │   │   ├── memory_agent.py     # Memory CRUD + keyword dispatch
│   │   │   ├── goal_tracking_agent.py  # Goal CRUD + status transitions
│   │   │   ├── reminders_agent.py  # Reminder creation + time parsing
│   │   │   ├── search.py           # Cross-agent search
│   │   │   └── data_management.py  # Export / import endpoints
│   │   ├── services/
│   │   │   ├── memory_service.py   # Store + recall logic
│   │   │   ├── goal_service.py     # Goal lifecycle management
│   │   │   └── reminder_service.py # NL time parsing + Celery dispatch
│   │   ├── tasks.py                # Celery background tasks
│   │   ├── consumers.py            # WebSocket consumers (WIP)
│   │   └── migrations/             # Database migration files
│   ├── manage.py
│   └── db.sqlite3                  # SQLite database (dev)
│
└── Frontend/                       # React + Vite project
    ├── src/
    │   ├── pages/                  # Route-level page components
    │   │   ├── Dashboard.tsx       # Main app shell
    │   │   ├── Landing.tsx         # Public homepage
    │   │   ├── Login.tsx / SignUp.tsx
    │   │   └── Profile.tsx / Settings.tsx
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── ChatInterface.tsx   # Core chat component
    │   │   │   └── AgentSelector.tsx   # Switch between agents
    │   │   ├── layout/             # DashboardLayout, AuthLayout
    │   │   └── Sidebar.tsx         # Navigation
    │   ├── services/
    │   │   └── api.ts              # Axios-based API client
    │   ├── config/
    │   │   └── api.ts              # Base URLs + auth headers
    │   ├── contexts/
    │   │   └── ThemeContext.tsx     # Dark mode state
    │   └── App.tsx                 # Root component + routing
    ├── vite.config.ts              # Dev server on port 3000
    ├── tailwind.config.ts
    └── package.json
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register/` | Create a new account |
| `POST` | `/api/auth/login/` | Login and receive JWT tokens |
| `POST` | `/api/auth/token/refresh/` | Refresh access token |
| `POST` | `/api/auth/password/reset/` | Request password reset email |
| `GET/POST` | `/api/memory/` | Recall or store a memory |
| `GET/POST` | `/api/goals/` | List or create a goal |
| `GET/POST` | `/api/reminders/` | List or set a reminder |
| `GET` | `/api/search/` | Search across all agents |
| `GET` | `/api/data/export/` | Export all user data (JSON/CSV) |
| `POST` | `/api/data/import/` | Import/restore user data |
| `GET` | `/swagger/` | Interactive API docs (Swagger UI) |
| `GET` | `/redoc/` | API docs (ReDoc) |

---

## Requirements

**Backend:**
- Python 3.10+
- Redis (for Celery — required for reminders)
- `pip install -r Backend/requirements.txt`

**Frontend:**
- Node.js 18+
- `npm install` inside `/Frontend`

**Environment variables** — create `Backend/.env`:

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CELERY_BROKER_URL=redis://localhost:6379/0
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

---

## FAQ

**Do the agents use an AI/LLM model?**
Not yet. The current agents use keyword matching and regex-based intent parsing. This is intentional for the MVP — it keeps the app fast, free to run, and fully offline. LLM integration is planned.

**What happens to my data?**
Everything is stored locally in a SQLite database during development. No data is sent to any external service. You can export everything at any time via `/api/data/export/`.

**Will anything change my data without asking?**
No write operations happen without an explicit user message. Reminders are marked complete only when you acknowledge them. Goals only update status when you explicitly request it.

**Why SQLite and not PostgreSQL?**
SQLite is used for local development simplicity. The Django ORM is database-agnostic — switching to PostgreSQL for production requires only a settings change and a `pip install psycopg2`.

**Is Redis required?**
Only for the Reminders Agent's async delivery via Celery. The Memory and Goal agents work without it. If Redis is not running, reminders will still be saved but won't fire automatically.

---

## Roadmap

- [ ] LLM-powered intent understanding (replace regex with Claude/GPT)
- [ ] WebSocket real-time chat (Django Channels — in progress)
- [ ] Mobile-responsive PWA
- [ ] Recurring reminders
- [ ] Goal progress charts (Recharts integration)
- [ ] Multi-user support with shared workspaces

---

## License

MIT — free to use, modify, and deploy.

---

<p align="center">Built for people who want one place to think, track, and remember — without the overhead.</p>
