# Brex Interview Starter

Full-stack scaffold for an AI-assisted coding interview.

## Stack

### Frontend

- Next.js
- React
- Tailwind

### Backend

- Node.js
- Express
- Prisma
- SQLite

## Setup

Clone the repo and install dependencies.

```bash
git clone <repo-url>
cd brex-interview-starter
```

## Run Backend

```bash
cd backend
npm install
npm run dev
```

Runs the Express API server in development mode.

Backend runs on `http://localhost:8080`.

Health check: `http://localhost:8080/health`

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Starts the Next.js development server.

Frontend runs on `http://localhost:3000`.

## Prisma / Database Commands

Generate Prisma client:

```bash
npx prisma generate
```

Creates the Prisma client used to interact with the database.

Create or apply database migrations:

```bash
npx prisma migrate dev --name init
```

Creates the SQLite database and applies schema migrations.

Reset the database:

```bash
npx prisma migrate reset
```

Deletes and recreates the database from migrations.

Open database GUI:

```bash
npx prisma studio
```

Opens a local UI to view and edit database records.

## Backend Commands

Start backend server:

```bash
npm run dev
```

Runs the backend API in development mode.

Build TypeScript:

```bash
npm run build
```

Compiles the backend into the `dist` folder.

Run tests:

```bash
npm test
```

Runs backend unit tests using Vitest.

## Frontend Commands

Start development server:

```bash
npm run dev
```

Runs the Next.js development server.

Build frontend:

```bash
npm run build
```

Creates the production build.

Run production build:

```bash
npm run start
```

Starts the built Next.js app locally.

## Typical Workflow

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

Then open `http://localhost:3000`.
