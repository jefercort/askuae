# askuae

A service provider directory for expats living in Dubai / the United Arab Emirates.

Expat group chats are flooded every day with requests for contacts (visas, lawyers, doctors, movers, nannies...) and the recommendations get lost in the chat. **askuae** brings those contacts together in one place, with categories, city, WhatsApp/social links and community reviews.

> 🚧 Under active development. The frontend still uses mock data for the provider listing while it's being integrated with the API.

## Tech stack

| Layer     | Technologies |
|-----------|--------------|
| Frontend  | React 19, TypeScript, Vite, TanStack Query, React Router, Firebase Auth (Google) |
| Backend   | NestJS 11, Prisma 7 (`@prisma/adapter-pg`), class-validator |
| Database  | PostgreSQL 17 (Docker for local development) |

## Project structure

Monorepo with no root `package.json`: each app manages its own dependencies.

```
askuae/
├── backend/    REST API with NestJS + Prisma
│   ├── prisma/         schema.prisma and migrations
│   └── src/            one module per resource (controller → service → PrismaService)
└── frontend/   SPA with React + Vite
    └── src/
        ├── context/    AuthProvider (Firebase) and ThemeProvider
        ├── pages/      Home, Login
        ├── services/   API calls
        └── types/      shared domain types
```

### Data model

`User` · `ServiceProvider` · `ServiceOffering` · `ServiceCategory` · `Review`

A provider offers one or more services (`ServiceOffering`), each one belonging to a category, and receives reviews from users.

## Running locally

**Requirements:** Node.js 20+, Docker, and a Firebase project with Google sign-in enabled.

### 1. Backend

```bash
cd backend
cp .env.example .env          # fill in your values
docker compose up -d          # starts Postgres on port 5444
npm install
npx prisma migrate dev        # applies the migrations
npm run start:dev             # API at http://localhost:3000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                   # app at http://localhost:5173
```

The Firebase web config lives in `frontend/src/config/firebase.ts`. Replace those values to use your own project.

## API

| Method | Route                 | Description |
|--------|-----------------------|-------------|
| POST   | `/users`              | Create a user |
| GET    | `/users`              | List users |
| GET    | `/users/:emailUser`   | Find a user by email |
| PATCH  | `/users/:id`          | Update a user (UUID) |
| DELETE | `/users/:id`          | Delete a user (UUID) |

## Roadmap

- [x] Google sign-in and user profile creation in the backend
- [x] Data model and migrations with Prisma
- [ ] Replace the frontend mock data with the real API
- [ ] CRUD for providers, categories and services
- [ ] User reviews
- [ ] Search and filters by category and city
- [ ] Deployment

## Useful scripts

```bash
# backend/
npm run lint
npm test              # unit tests (Jest)
npm run test:e2e

# frontend/
npm run lint
npm run build
```

## Author

Kevin Cortes
