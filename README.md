# AQA Challenge - Full Stack Chat Application

A modern full-stack chat application built with React Router, Express, PostgreSQL, and Socket.IO. This monorepo features real-time messaging, user authentication, and end-to-end testing capabilities.

## Features

- User authentication (register/login)
- Real-time chat with Socket.IO
- Modern UI with TailwindCSS and Shadcn
- End-to-end testing with WebdriverIO and Cucumber
- Docker support for PostgreSQL

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.19.0
- **Yarn** >= 4.8.0 (installed globally)
- **Docker** and **Docker Compose** (for running the database)
- **Git**

### Checking Versions

```bash
node --version  # Should be >= 20.19.0
yarn --version  # Should be >= 4.8.0
docker --version
```

## Technology Stack

### Backend
- **Framework**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO
- **Validation**: Zod
- **Language**: TypeScript

### Frontend
- **Framework**: React 19 with React Router v7
- **Styling**: TailwindCSS 4
- **UI Components**: Shadcn/ui
- **Forms**: React router forms with Zod validation
- **Language**: TypeScript

### DevOps & Tools
- **Monorepo**: Turborepo
- **Package Manager**: Yarn workspaces
- **Testing**: WebdriverIO, Cucumber, Allure
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## Project Structure

```
aqa_challenge/
├── apps/
│   ├── backend/          # Express API server
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   ├── middleware/
│   │   │   └── service_providers/
│   │   └── package.json
│   └── frontend/         # React Router application
│       ├── app/
│       │   ├── components/
│       │   ├── routes/
│       │   └── api/
│       └── package.json
├── packages/
│   ├── eslint-config/   # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── docker-config/        # Docker configuration files for Postgres DB
├── package.json         # Root package.json
└── turbo.json           # Turborepo configuration
```

## Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd aqa_challenge
```

### Step 2: Install Dependencies

Install all dependencies for the monorepo:

```bash
yarn install
```

This will install dependencies for all workspaces (backend, frontend, and shared packages).

### Step 3: Environment Setup

#### Backend Environment Variables

The backend already have default values, but if you wish you can create a `.env` file in the `apps/backend/` directory
The default configuration is:

```env
ENVIRONMENT=development

DB_HOST=localhost
DB_NAME=backend
DB_USER=backend
DB_PASSWORD=backend
BACKEND_DB_HOST=localhost

JWT_SECRET_KEY=AQA_CHALLENGE_AUTH_KEY_Ur5HaRJ06ayFvx0
```

#### Frontend Environment

The frontend will automatically connect to the backend on `http://localhost:3001` (the default backend port).

### Step 4: Database Setup

#### Option A: Using Docker (Recommended)

1. Start the PostgreSQL database:

```bash
cd docker-config
docker-compose up
```

2. Wait for the database to be ready (a few seconds).

3. Run database migrations:

```bash
cd ../../apps/backend
yarn migrate:up
```

#### Option B: Using Local PostgreSQL

If you prefer to use a local PostgreSQL installation:

1. Create a database:

```sql
CREATE DATABASE backend;
CREATE USER backend WITH PASSWORD 'backend';
GRANT ALL PRIVILEGES ON DATABASE backend TO backend;
```

2. Update your `.env` file with your database credentials.

3. Run migrations:

```bash
cd apps/backend
yarn migrate:up
```

## Running the Application

To run both backend and frontend in development mode with hot reload:

```bash
# From the root directory
yarn dev
```

This will start:
- **Backend**: `http://localhost:3001`
- **Frontend**: `http://localhost:5173`

You can also run them separately:

```bash
# Terminal 1 - Backend
cd apps/backend
yarn dev

# Terminal 2 - Frontend
cd apps/frontend
yarn dev
```

## Testing

### Running E2E Tests

From the frontend directory:

```bash
cd apps/frontend
yarn test
```

### Viewing Test Reports

After running tests, view the Allure report:

```bash
cd apps/frontend
yarn test:report
```

This will open the test report at `http://localhost:8000`.

## CI/CD Pipeline

This project includes a GitHub Actions CI pipeline that automatically runs E2E tests on every push and pull request.

### What the CI Does

1. Sets up Node.js, Yarn, and PostgreSQL
2. Installs all dependencies
3. Builds the backend and frontend
4. Runs database migrations
5. Starts the backend and frontend servers
6. Executes E2E tests with WebDriverIO
7. Uploads test results and reports as artifacts

### Running Tests in CI

Tests run automatically on:
- Push to `master`, `main`, or `develop` branches
- Pull requests targeting those branches

Test results and Allure reports are available as downloadable artifacts after each CI run.

For more details, see [`.github/workflows/README.md`](.github/workflows/README.md).

