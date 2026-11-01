# 🎬 CineRate — Cinematic Movie Rating & Discovery Platform

> A full-stack MERN application for movie enthusiasts, cinephiles, and casual film fans. Built with a dark cinematic aesthetic inspired by Netflix and IMDb, featuring real-time community reviews, dual-source ratings, official YouTube trailer embeds, watchlists, and moderation controls.

---

## 🌟 Key Highlights & Features

### 1. Cinematic UI / UX
- **Dark Cinematic Atmosphere**: Deep obsidian and navy base (`#0a0c16`, `#111625`) accented with electric purple (`#8b5cf6`) and warm gold (`#f59e0b`).
- **Dynamic Hero Banner**: Backdrops with release years, genre badges, plot synopses, and one-click trailer modals.
- **Micro-Interactions**: Hover scale animations on posters, shimmer skeleton loading states, glassmorphism panels, and instant toast notifications.

### 2. Dual-Rating System & Film Discovery
- **Dual Ratings**: Every film features both official **TMDB Rating** and the calculated dynamic **CineRate Community Score** (1 to 10 scale).
- **Curated Movie Rows**:
  - Trending Now
  - Popular Across The Globe
  - Top Rated All-Time Masterpieces
  - Now Playing in Theaters
  - Upcoming Anticipated Releases
  - Bollywood & Indian Cinema (Pan-India)
  - Hollywood Spectacles
  - Personalized Recommendations
- **Real TMDB API Integration**: Dynamic posters, high-res backdrops, runtimes, cast, crew directors, and embedded YouTube trailers. Includes curated offline fallbacks if no API key is provided.

### 3. Comprehensive Rating & Review Engine
- **1 to 10 Star Rating**: Rate any movie with instant database synchronization and duplicate prevention.
- **Detailed Critiques**: Post reviews with headlines and body text.
- **Review Interactivity**: Like / helpful counters on other users' critiques.
- **Full Author Controls**: Edit or delete your own reviews at any time.

### 4. Personal Cinema Management
- **Watchlist**: Save movies to watch later, toggle watched status, and filter by unwatched / watched.
- **Favorites**: Curate your all-time favorite cinema hall of fame.
- **Recently Viewed**: Local persistence remembering films you have inspected.
- **Quick Share**: One-click URL copy with animated feedback.

### 5. Authentication & Security
- **JWT & Password Security**: Passwords salted and hashed with `bcryptjs`.
- **Protected Routes**: Navigation guards on user dashboards, watchlists, favorites, and admin endpoints.
- **Hardened Backend**: `helmet` security headers, strict CORS policy, rate limiting, and input validation.

### 6. Administration & Moderation Panel
- **Protected Admin Dashboard**: Restricted strictly to users with `role: 'admin'`.
- **System KPIs**: Real-time counts of total users, reviews, ratings, and watchlists.
- **User Management**: Search users, promote/demote between `user` and `admin`, or remove abusive accounts.
- **Review Moderation**: Inspect all platform critiques and remove inappropriate content.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, Tailwind CSS, Lucide React, React Router DOM v6, Axios, React Hot Toast |
| **Backend** | Node.js, Express 4, Mongoose 8, JWT (`jsonwebtoken`), `bcryptjs`, `helmet`, `express-rate-limit`, `cors`, `morgan`, `dotenv` |
| **Database** | MongoDB with Mongoose ODM (Indexes, unique constraints, compound indexes, aggregation pipelines) |
| **API Provider** | The Movie Database (TMDB) API v3 |

---

## 📂 Project Architecture

```
Movie_rating_systeam/
├── package.json                   # Root management & convenience scripts
├── README.md                      # Comprehensive documentation
│
├── server/                        # Express API Backend
│   ├── config/
│   │   └── db.js                 # Resilient MongoDB connection
│   ├── controllers/              # REST Controller handlers
│   │   ├── authController.js
│   │   ├── movieController.js
│   │   ├── ratingController.js
│   │   ├── reviewController.js
│   │   ├── watchlistController.js
│   │   ├── favoriteController.js
│   │   ├── userController.js
│   │   └── adminController.js
│   ├── middleware/               # Auth, Admin & Error handling
│   │   ├── auth.js
│   │   ├── adminAuth.js
│   │   └── errorHandler.js
│   ├── models/                   # Mongoose Schemas & Models
│   │   ├── User.js
│   │   ├── MovieRating.js
│   │   ├── Review.js
│   │   ├── Watchlist.js
│   │   └── Favorite.js
│   ├── routes/                   # API endpoint routers
│   ├── services/                 # TMDB API client & rich fallback catalog
│   │   ├── tmdbService.js
│   │   └── fallbackMovies.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seed.js               # Database seeder with sample accounts & reviews
│   ├── .env.example              # Environment variables template
│   ├── .env                      # Active local backend configuration
│   └── server.js                 # Express application entrypoint
│
└── client/                        # React Single Page Application (SPA)
    ├── public/
    ├── src/
    │   ├── components/common/    # Reusable UI components
    │   │   ├── Navbar.jsx        # Glassmorphic header with search & profile
    │   │   ├── Footer.jsx        # Branding & required TMDB attribution
    │   │   ├── MovieCard.jsx     # Poster card with ratings & watchlist trigger
    │   │   ├── MovieRow.jsx      # Horizontal carousel with smooth scroll
    │   │   ├── HeroBanner.jsx    # Cinematic spotlight with trailer modal
    │   │   ├── StarRating.jsx    # Interactive 1-10 star rating component
    │   │   ├── ReviewModal.jsx   # Write / edit critique dialog
    │   │   ├── SkeletonCard.jsx  # Shimmer skeleton loader
    │   │   └── ProtectedRoute.jsx# Auth & Admin route guards
    │   ├── context/
    │   │   └── AuthContext.jsx   # Global session state & persistence
    │   ├── pages/
    │   │   ├── Home.jsx          # Comprehensive 11-section landing page
    │   │   ├── MovieDetails.jsx  # Dynamic movie details page (/movie/:id)
    │   │   ├── Search.jsx        # Live debounced search & multi-filter
    │   │   ├── Login.jsx         # Sign in with 1-click demo credential buttons
    │   │   ├── Register.jsx      # Sign up with validation
    │   │   ├── Profile.jsx       # User dashboard, personal stats & tabs
    │   │   ├── Watchlist.jsx     # Personal watchlist with watched toggle
    │   │   ├── Favorites.jsx     # Favorited films collection
    │   │   ├── AdminDashboard.jsx# Administrative metrics, users & moderation
    │   │   ├── About.jsx         # Platform story & official TMDB attribution
    │   │   ├── Contact.jsx       # Working inquiry form
    │   │   ├── Terms.jsx         # Terms of Service
    │   │   ├── Privacy.jsx       # Privacy Policy
    │   │   └── NotFound.jsx      # Custom cinematic 404 page
    │   ├── services/             # Axios API service layers
    │   ├── utils/helpers.js      # Image URLs, date & runtime helpers
    │   ├── App.jsx               # Application routing layout
    │   ├── main.jsx              # DOM entrypoint
    │   └── index.css             # Tailwind directives & sleek scrollbar styling
    ├── index.html
    ├── vite.config.js
    └── tailwind.config.js
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017`) or MongoDB Atlas connection string

### 1. Install Dependencies
Run the install command from the root directory to set up both frontend and backend:
```bash
npm run install:all
```
*(Or run `npm install` inside root, `server/`, and `client/` individually)*

---

### 2. Configure Environment Variables

The backend configuration file is located at `server/.env`.
```env
PORT=5000
NODE_ENV=development

# MongoDB Connection String
# Local MongoDB:
MONGO_URI=mongodb://127.0.0.1:27017/cinerate
# Or MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cinerate?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=cinerate_super_secret_jwt_key_2026_cinematic_auth

# TMDB API Key (Optional but recommended for infinite live movies)
# Get your free key at: https://www.themoviedb.org/settings/api
TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Frontend URL for CORS
CLIENT_URL=http://localhost:5173
```

> **Note on TMDB API**: If `TMDB_API_KEY` is left blank, CineRate automatically activates its high-definition fallback catalog with real TMDB IDs, posters, backdrops, cast bios, and trailers (Oppenheimer, Interstellar, The Dark Knight, Dune 2, RRR, 3 Idiots, etc.). Once you add your free TMDB API key to `server/.env`, the app seamlessly switches to live TMDB data worldwide.

---

### 3. Seed Initial Database Data

Populate the database with pre-configured admin accounts, critics, reviews, ratings, and watchlists:
```bash
npm run seed
```

#### Pre-configured Accounts:
| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@cinerate.com` | `Admin@123456` |
| **Standard User** | `user@cinerate.com` | `User@123456` |
| **Film Critic** | `critic@cinerate.com` | `User@123456` |

*(Tip: On the Sign-In page, you can also click the quick **"Admin Demo"** or **"User Demo"** autofill buttons to log in with 1 click).*

---

### 4. Running the Application

You can start both backend and frontend concurrently from the root directory:
```bash
npm run dev
```

Or run them individually in separate terminal windows:
```bash
# Terminal 1: Backend API (runs on http://localhost:5000)
npm run dev:server

# Terminal 2: Vite React Frontend (runs on http://localhost:5173)
npm run dev:client
```

---

## 🌐 Application URLs

- **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🛡️ Attribution & Legal

This product uses the **TMDB API** but is not endorsed or certified by TMDB. All movie images, titles, and metadata are property of their respective copyright owners and The Movie Database.

