# Full-Stack Demo (Express + React / Vite)

A small production-style layout: **Express** REST API on port **5000**, **React** app on port **3000**, with a **Vite dev proxy** so the browser calls `/api/*` without CORS friction during development.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer  
- npm (comes with Node)

## Project layout

```
backend/
  server.js
  config/
  controllers/
  routes/
frontend/
  src/
    pages/
  vite.config.js
```

## Setup

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Run (two terminals)

**Terminal 1 — API**

```bash
cd backend
npm run dev
```

You should see: `API listening on http://localhost:5000`

**Terminal 2 — Frontend**

```bash
cd frontend
npm run dev
```

Open **http://localhost:3000**. The home page fetches:

- `GET /api/health` → plain text: `Server is running`
- `GET /api/message` → JSON: `{ "message": "Hello from backend" }`

Vite proxies `/api` to `http://localhost:5000` (see `frontend/vite.config.js`). The backend also enables **CORS**, so you can point the frontend at the API URL directly if you change your setup later.

## API reference

| Method | Path           | Response                                      |
|--------|----------------|-----------------------------------------------|
| GET    | `/api/health`  | `text/plain`: `Server is running`             |
| GET    | `/api/message` | `application/json`: `{ "message": "..." }`   |

## Production build (frontend)

```bash
cd frontend
npm run build
npm run preview
```

Serve the built static files behind any static host; configure that host or your app to proxy `/api` to the Node server, or set `fetch` to the full API origin with CORS already enabled on the backend.

## Scripts

| Location  | Command       | Purpose                    |
|-----------|---------------|----------------------------|
| `backend` | `npm start`   | Run API once               |
| `backend` | `npm run dev` | API with `--watch` reload  |
| `frontend`| `npm run dev` | Vite dev server (port 3000)|
| `frontend`| `npm run build` | Production bundle        |
