# CI/CD Pipeline

This project uses GitHub Actions for Continuous Integration.

## Workflow Overview

The CI pipeline runs on every push and pull request to the `master`, `main`, and `develop` branches.

## What the Pipeline Does

1. **Setup Environment**
   - Installs Node.js 20.19.0
   - Sets up Yarn 4.8.0
   - Sets up PostgreSQL 16 service

2. **Build Applications**
   - Installs all dependencies
   - Builds the backend (TypeScript compilation)
   - Builds the frontend (React Router build)

3. **Database Setup**
   - Runs database migrations using Drizzle ORM
   - Seeds database with initial data (if needed)

4. **Run Tests**
   - Installs Chrome and ChromeDriver for WebDriverIO
   - Starts the backend server on port 3001
   - Starts the frontend dev server on port 5173
   - Runs E2E tests using WebDriverIO and Cucumber
   - Uploads test results and reports as artifacts

## Environment Variables

The CI uses the following environment variables:

- `DB_HOST`: localhost
- `DB_NAME`: backend
- `DB_USER`: backend
- `DB_PASSWORD`: backend
- `JWT_SECRET_KEY`: AQA_CHALLENGE_AUTH_KEY_Ur5HaRJ06ayFvx0
- `NODE_ENV`: development
- `PORT`: 3001 (backend)

## Test Artifacts

After each test run, the following artifacts are uploaded:
- `allure-results`: Allure test results for detailed reporting
- `test-results`: Complete test execution details

## Running Tests Locally

To run the tests locally:

```bash
# Start database
cd docker-config
docker-compose up -d

# Start backend (in apps/backend)
yarn dev

# In a new terminal, start frontend (in apps/frontend)
yarn dev

# Run tests (in apps/frontend)
yarn test

# View test report
yarn test:report
```

## Troubleshooting

If tests fail in CI, check:
1. Backend logs - ensure the backend is running on port 3001
2. Frontend logs - ensure the frontend is running on port 5173
3. Database connection - verify PostgreSQL service is healthy
4. Chrome/ChromeDriver installation - ensure proper versions are installed
5. Test artifacts - download and review for detailed error messages

