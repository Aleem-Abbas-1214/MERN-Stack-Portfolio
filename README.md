# MERN Portfolio + Admin Panel

A full-stack developer portfolio built on MongoDB, Express, React, and Node.js,
with a JWT-protected admin panel for managing projects, skills, and contact
messages — no need to touch the database or redeploy to update content.

## What's included

- **Public site** (`/`): terminal-styled hero, projects grid, skills bars,
  about section, and a working contact form.
- **Admin panel** (`/admin`): login, dashboard, and CRUD screens for
  projects, skills, and incoming messages.
- **REST API**: Express + Mongoose, with JWT auth guarding all write
  operations. Public GET routes power the site; POST/PUT/DELETE require
  an admin token.

## Project structure

```
portfolio-mern/
├── backend/     Express API + MongoDB models
└── frontend/    React (Vite) app — public site + admin panel
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio   # or a MongoDB Atlas URI
JWT_SECRET=some-long-random-string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=ChangeMe123!
```

Create your admin account (reads `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`):

```bash
npm run seed:admin
```

Start the API:

```bash
npm run dev      # nodemon, auto-restarts
# or
npm start
```

The API runs at `http://localhost:5000/api`. Check `GET /api/health`.

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env` if your API isn't on the default port:

```
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

Visit `http://localhost:5173`. Log into the admin panel at
`http://localhost:5173/admin/login` with the credentials from `ADMIN_EMAIL`
/ `ADMIN_PASSWORD`.

## 3. Add your content

Everything on the public site — projects, skills, your name in the hero,
social links in the footer — is either pulled from the database via the
admin panel, or lives as small editable constants:

- `frontend/src/components/TerminalHero.jsx` — name, tagline, terminal lines
- `frontend/src/pages/Home.jsx` — `SOCIAL` object (GitHub/LinkedIn/email)

Add your real projects and skills from `/admin` once logged in — no code
changes needed for those.

## 4. Deploying

- **Backend**: any Node host (Render, Railway, Fly.io, a VPS). Set the same
  environment variables as `.env`, and point `MONGO_URI` at a MongoDB Atlas
  cluster for production.
- **Frontend**: `npm run build` produces a static `dist/` folder — deploy it
  to Vercel, Netlify, or any static host. Set `VITE_API_URL` to your deployed
  backend's URL.
- Update `CLIENT_URL` in the backend `.env` to your deployed frontend URL so
  CORS allows it.

## Security notes

- Passwords are hashed with bcrypt; never stored in plain text.
- JWT tokens expire (`JWT_EXPIRES_IN`, default 7 days) and are required on
  every write endpoint (`protect` middleware).
- The API has basic rate limiting on all `/api/*` routes.
- Change `JWT_SECRET` and the seeded admin password before deploying.
