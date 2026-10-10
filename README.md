# Template Store

A small full-stack app where users register, log in, browse a catalogue of website and app templates, and keep a personal list of favorites.

Built for the Gnxtace Technologies Full Stack Web Developer Intern technical task.

## Tech stack

- Frontend: React 18, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express
- Database: SQLite through Knex.js (better-sqlite3 driver)
- Auth: JSON Web Tokens, passwords hashed with bcryptjs

## Project structure

```
client/                 React app
  src/api/              Axios instance and API calls
  src/context/          Auth state
  src/components/       Navbar, cards, route guards, form pieces
  src/pages/            Login, Register, Templates, TemplateDetail, Favorites
server/
  src/config/           Environment configuration
  src/db/               Knex connection, schema, seed data
  src/controllers/      Request handlers
  src/routes/           Route definitions
  src/middleware/       JWT auth and error handling
  src/utils/            Validators and helpers
  public/thumbnails/    SVG preview images for the seeded templates
```

## Running locally

Requires Node.js 18 or newer.

### 1. Backend

```bash
cd server
cp .env.example .env
npm install
npm start
```

The API runs on http://localhost:5000. On first start the SQLite file is created under `server/data/` and eight sample templates are inserted. To reseed manually, run `npm run seed` (add `-- --reset` to clear and reload the templates).

### 2. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

The app runs on http://localhost:5173. `VITE_API_URL` in `client/.env` must point at the backend.

## Environment variables

Server (`server/.env`):

| Variable | Purpose | Default |
| --- | --- | --- |
| PORT | Port the API listens on | 5000 |
| JWT_SECRET | Secret used to sign tokens (required in production) | development value |
| JWT_EXPIRES_IN | Token lifetime | 7d |
| CLIENT_ORIGIN | Allowed CORS origin(s), comma separated | http://localhost:5173 |
| DB_FILE | SQLite file path | ./data/store.sqlite |

Client (`client/.env`):

| Variable | Purpose |
| --- | --- |
| VITE_API_URL | Base URL of the backend, without `/api` |

## API reference

All responses are JSON. Errors use the shape `{ "message": "...", "errors": { "field": "..." } }`, where `errors` appears for validation failures.

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| POST | /api/auth/register | No | Create an account, returns a token and user |
| POST | /api/auth/login | No | Log in, returns a token and user |
| GET | /api/auth/me | Yes | Current user |
| GET | /api/templates | Optional | List templates. Supports `?search=` and `?category=`. Each item includes `is_favorite` when a valid token is sent |
| GET | /api/templates/categories | No | Distinct categories |
| GET | /api/templates/:id | Optional | Template details |
| GET | /api/favorites | Yes | Favorited templates for the logged-in user |
| POST | /api/favorites/:templateId | Yes | Add a favorite (409 if already added) |
| DELETE | /api/favorites/:templateId | Yes | Remove a favorite |

Status codes used: 200, 201, 400 (validation), 401 (missing or bad credentials or token), 404, 409 (duplicate email or favorite), 500.

Registration requires a name of 2 to 80 characters, a valid email, and a password of at least 8 characters containing a letter and a number.

## Features

- Register, log in and log out with JWT stored in local storage
- Protected `/favorites` route that redirects to login and returns the user to the page they wanted
- Template cards with image, title, category and description
- Favorite and unfavorite from the list, favorites page and detail page, with already favorited templates marked
- Search by keyword and filter by category
- Responsive layout built with Tailwind
- Input validation on both client and server

## Deployment

- Backend (Render): create a Web Service with root directory `server`, build command `npm install`, start command `npm start`. Set `JWT_SECRET`, `CLIENT_ORIGIN` (the frontend URL) and `NODE_ENV=production`. Attach a persistent disk and set `DB_FILE` to a path on it if you want data to survive redeploys.
- Frontend (Vercel or Netlify): root directory `client`, build command `npm run build`, output directory `dist`, and set `VITE_API_URL` to the deployed backend URL. `vercel.json` and `public/_redirects` handle client-side routing.

Live links:

- Frontend: add after deployment
- Backend: add after deployment

## Author

Nishu
GitHub: https://github.com/Nishuk2005
Email: nishu.nidhi20025@gmail.com
