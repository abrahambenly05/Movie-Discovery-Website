# CineScope 🎬

A full-stack movie discovery web application built as a personal portfolio project. CineScope lets users browse trending, popular, and upcoming movies, search by title or genre, view detailed movie information with trailers, and save favorite movies to a personal watchlist.

---

## Features

### Core (no login required)
- **Home** — browse Trending, Popular, and Upcoming movies, plus a collapsible genre filter for quick category browsing
- **Search** — search movies by title with debounced input (no spamming the API while typing)
- **Movie Detail** — poster, title, tagline, rating, runtime, genres, overview, and an embedded YouTube trailer

### Account features (requires login)
- **Register / Login** — email + password authentication secured with JWT
- **Watchlist** — add or remove movies from a personal watchlist, viewable on its own page
- **Protected Routes** — the Watchlist page is only accessible when logged in; unauthenticated visitors are redirected to Login

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, Axios |
| Backend | Python, FastAPI, SQLAlchemy |
| Database | PostgreSQL |
| Authentication | JWT (via `python-jose`), password hashing with `bcrypt` |
| External API | [TMDB API](https://www.themoviedb.org/documentation/api) |
| Version Control | Git & GitHub |

---

## Architecture
```
TMDB API → FastAPI Backend → React Frontend → User
```

The backend acts as a proxy between the frontend and TMDB: all external API calls happen server-side, so the TMDB API key is never exposed to the browser. The backend also owns authentication and the watchlist data, which are stored in PostgreSQL.

---

## Project Structure

This is a monorepo containing both the frontend and backend.
```
Movie-Discovery-Website/
├── backend/
│ ├── app/
│ │ ├── core/ # config, database session, security (JWT/hashing), auth dependency
│ │ ├── models/ # SQLAlchemy models (User, Watchlist)
│ │ ├── schemas/ # Pydantic request/response schemas
│ │ ├── routers/ # API routes (movies, auth, watchlist)
│ │ ├── services/ # TMDB API integration
│ │ └── main.py # FastAPI app entrypoint, CORS, router registration
│ ├── requirements.txt
│ └── .env # TMDB_API_KEY, JWT_SECRET_KEY, DATABASE_URL (not committed)
│
├── frontend/
│ ├── src/
│ │ ├── api/ # axios instance + API call functions
│ │ ├── components/ # Navbar, Layout, MovieCard, MovieGrid, GenreFilter, ProtectedRoute, etc.
│ │ ├── context/ # AuthContext (login state) and useAuth hook
│ │ ├── hooks/ # useDebounce
│ │ ├── pages/ # HomePage, SearchPage, MovieDetailPage, LoginPage, RegisterPage, WatchlistPage
│ │ ├── types/ # shared TypeScript types
│ │ └── router.tsx # route definitions, including the protected /watchlist route
│ └── .env # VITE_API_BASE_URL (not committed)
│
└── README.md
```

---

## API Endpoints (Backend)

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| GET | `/movies/trending` | Trending movies | No |
| GET | `/movies/popular` | Popular movies | No |
| GET | `/movies/upcoming` | Upcoming movies | No |
| GET | `/movies/search?query=` | Search movies by title | No |
| GET | `/movies/genres` | List of genres | No |
| GET | `/movies/discover?genre_id=` | Movies filtered by genre | No |
| GET | `/movies/{movie_id}` | Movie detail (incl. trailer) | No |
| POST | `/auth/register` | Create a new account | No |
| POST | `/auth/login` | Log in, returns a JWT access token | No |
| GET | `/watchlist` | Get the logged-in user's watchlist | Yes |
| POST | `/watchlist` | Add a movie to the watchlist | Yes |
| DELETE | `/watchlist/{tmdb_movie_id}` | Remove a movie from the watchlist | Yes |

---

## Getting Started

### Prerequisites
- Node.js (LTS)
- Python 3.12+
- PostgreSQL (running locally)
- A free [TMDB API](https://www.themoviedb.org/documentation/api) key (Read Access Token, v4 auth)

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
```

Create `backend/.env`
```
TMDB_API_KEY=your_tmdb_v4_read_access_token
JWT_SECRET_KEY=a_long_random_secret_string
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/cinescope_db
```

Run the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`, with interactive docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_BASE_URL=http://localhost:8000
```

Run the dev server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Development Journey

This project was built incrementally, in roughly this order:

1. **Planning** — requirement analysis, user flow, and MVP scope defined upfront (6 pages: Home, Search, Movie Detail, Login, Register, Watchlist)
2. **Repository setup** — monorepo on GitHub, combined `.gitignore` for Node + Python, MIT license
3. **Frontend scaffold** — Vite + React + TypeScript + Tailwind CSS, React Router, Axios
4. **Backend scaffold** — FastAPI with a clean layered structure (core / models / schemas / routers / services), TMDB integration as a proxy service
5. **Home, Search, Movie Detail** — connected to the backend, including a trailer embed and a debounced search
6. **Authentication** — PostgreSQL + SQLAlchemy models, password hashing with `bcrypt`, JWT-based login/register, protected endpoints
7. **Watchlist** — full CRUD on the backend, an Add/Remove button on the Movie Detail page, a dedicated Watchlist page, and a `ProtectedRoute` guarding it on the frontend
8. **Polish** — a collapsible genre filter on Home, UI refinements, and consistent English-language UI copy

---

## Known Limitations

- No "Forgot Password" flow — a lost password currently has no recovery path (would require third-party email delivery)
- Not a streaming service — only trailers (via YouTube embed) are playable; full movies are out of scope
- Currently runs locally only; cloud deployment (Vercel + Render + a managed PostgreSQL instance) was scoped and tested but is not kept running

---

## License

MIT