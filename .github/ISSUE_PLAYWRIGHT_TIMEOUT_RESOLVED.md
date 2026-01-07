# Playwright webServer Timeout - Root Cause Analysis & Resolution

**Status:** ✅ RESOLVED
**Date:** 2025-11-27
**Severity:** Critical (blocked CI/CD pipeline)
**Resolution Time:** ~4 hours of debugging

---

## Problem Description

GitHub Actions and local Playwright E2E tests consistently failed with:

```
Error: Timed out waiting 60000ms from config.webServer.
```

The webServer (Vite dev server on port 5173) never started, causing all E2E tests to timeout at the initialization phase.

---

## Root Cause Analysis

### Investigation Timeline

#### Phase 1: Initial Symptoms (Commits: 13a4b7b - 86a3d01)

- **Symptom:** Playwright tests timeout after 60 seconds
- **Initial hypothesis:** Missing Prisma setup in CI
- **Actions taken:**
  - Fixed Prisma schema to use `env("DATABASE_URL")` instead of hardcoded path
  - Added database setup steps to GitHub Actions
  - Fixed DATABASE_URL path: `file:./prisma/test.db` (was `file:./test.db`)

**Result:** Still timing out ❌

#### Phase 2: Local Reproduction (Debugging Session)

- **Method:** Strict separation between error discovery and fixing
- **Discovery:** Prisma couldn't connect to database even with correct ENV variables
- **Error message:**
  ```
  PrismaClientInitializationError:
  error: Error validating datasource `db`: the URL must start with the protocol `file:`.
  ```

**Key insight:** Prisma wasn't seeing `DATABASE_URL` at all!

#### Phase 3: The Real Root Cause (Commits: 8607978, 069b7be)

**Root Cause #1: CWD vs Root Directory**

- Prisma searches for `.env` in Current Working Directory (CWD)
- API server runs from `api/` directory
- `.env` file exists only in root directory
- **Result:** Prisma never found the `.env` file

**Root Cause #2: dotenv.config() Override**
File: `api/src/server.ts:24`

```typescript
dotenv.config(); // ❌ Always loads .env from CWD, ignores ENV variables!
```

This line **overwrote** all environment variables set by playwright.config.ts or GitHub Actions ENV blocks.

**Root Cause #3: Development vs Test Environment Conflict**

- Local `.env` configured for PostgreSQL (development database)
- Tests need SQLite (`file:./prisma/test.db`)
- No environment-specific configuration existed

---

## Solution Implementation

### 1. Environment-Specific .env Files

**Created:** `.env.test`

```bash
DATABASE_URL=file:./prisma/test.db
JWT_SECRET=test-secret-key-for-testing
JWT_REFRESH_SECRET=test-refresh-secret-key-for-testing
NODE_ENV=test
PORT=3000
ADMIN_PORT=5173
SKIP_RATE_LIMIT=true
CORS_ORIGIN=http://127.0.0.1:5173
```

**Why:** Separates test configuration from development configuration.

### 2. Conditional dotenv Loading

**File:** `api/src/server.ts:24-26`

```typescript
// Load environment-specific .env file
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: envFile });
```

**Why:** Loads correct environment file based on NODE_ENV.

### 3. Playwright Configuration

**File:** `playwright.config.ts:38-47`

```typescript
webServer: {
    command: 'dotenv -e .env.test -- npm run dev',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    timeout: 60000,
    env: {
        NODE_ENV: 'test',
        SKIP_RATE_LIMIT: 'true',
    },
}
```

**Why:** Uses dotenv-cli to ensure `.env.test` is loaded for all workspace processes.

### 4. GitHub Actions Workflow

**File:** `.github/workflows/playwright.yml:30-40`

```yaml
- name: Create .env.test file for CI
  run: |
    echo "DATABASE_URL=file:./prisma/test.db" > .env.test
    echo "JWT_SECRET=test-secret-key-for-ci" >> .env.test
    echo "JWT_REFRESH_SECRET=test-refresh-secret-key-for-ci" >> .env.test
    echo "NODE_ENV=test" >> .env.test
    echo "PORT=3000" >> .env.test
    echo "ADMIN_PORT=5173" >> .env.test
    echo "SKIP_RATE_LIMIT=true" >> .env.test
    echo "CORS_ORIGIN=http://127.0.0.1:5173" >> .env.test
```

**Why:** CI environment needs to create `.env.test` since it's gitignored.

---

## Key Learnings

### 1. **Monorepo .env Loading is Complex**

- Each workspace has its own CWD
- dotenv doesn't automatically look in parent directories
- Environment variables from parent processes aren't always inherited

### 2. **dotenv.config() Overrides Everything**

- Calling `dotenv.config()` without parameters loads `.env` from CWD
- **This overrides all previously set environment variables**
- Always check for existing ENV vars or use conditional loading

### 3. **Testing Environment Isolation**

- Never mix development and test database configurations
- Use separate `.env.test` for test environments
- Ensure consistent behavior between local and CI

### 4. **Debugging Strategy**

- **Always reproduce locally first** before fixing
- **Separate error discovery from error fixing**
- Test one hypothesis at a time
- Don't assume dotenv "just works" in complex setups

---

## Files Changed

| File                               | Change                    | Reason                         |
| ---------------------------------- | ------------------------- | ------------------------------ |
| `.env.test`                        | Created                   | Test environment configuration |
| `api/src/server.ts`                | Lines 24-26               | Conditional .env loading       |
| `playwright.config.ts`             | Line 39                   | Use dotenv-cli with .env.test  |
| `.github/workflows/playwright.yml` | Lines 30-40               | Create .env.test in CI         |
| `package.json`                     | Added `dotenv-cli@11.0.0` | Enable .env file selection     |
| `prisma/schema.prisma`             | Line 10                   | Use `env("DATABASE_URL")`      |

---

## Verification

### Local Tests (After Fix)

```bash
npx playwright test --project=chromium
```

**Result:**

- ✅ 3 tests passed
- ❌ 1 test failed (different issue: 500 Internal Server Error)
- ✅ **No more webServer timeout!**

### GitHub Actions (After Fix)

- ✅ webServer starts successfully
- ✅ .env.test loaded correctly
- ⏳ Full test suite results pending

---

## Related Issues

- **500 Internal Server Error in Login Test:** Separate issue, not related to webServer timeout
- Test expects successful login but API returns 500
- Investigation needed in auth controller/middleware

---

## Prevention

### Future Recommendations

1. **Always use environment-specific configs in monorepos**

   ```typescript
   const envFile = `.env.${process.env.NODE_ENV || "development"}`;
   dotenv.config({ path: envFile });
   ```

2. **Document .env file locations in README**
   - Which .env files exist?
   - Where should they be placed?
   - What's the loading order?

3. **Add CI verification step**

   ```yaml
   - name: Verify environment setup
     run: |
       echo "DATABASE_URL=$DATABASE_URL"
       test -f .env.test || exit 1
   ```

4. **Consider using a single .env with overrides**
   - `.env` - base configuration
   - `.env.test` - test overrides
   - `.env.local` - local overrides (gitignored)

---

## Timeline Summary

| Commit  | Description                             | Status             |
| ------- | --------------------------------------- | ------------------ |
| 13a4b7b | Fix: Prisma Schema & GitHub Actions ENV | ❌ Still failing   |
| 5d96b40 | Fix: webServer Timeout & Database path  | ❌ Still failing   |
| 86a3d01 | Fix: DATABASE_URL path correction       | ❌ Still failing   |
| 365328c | Fix: dotenv-cli installation            | ❌ Wrong approach  |
| 8607978 | Fix: Environment-based .env loading     | ✅ Working locally |
| 069b7be | Fix: GitHub Actions creates .env.test   | ✅ CI fix          |
| ea0f9b7 | Debug: Verify dotenv-cli in CI          | ✅ Debug info      |

**Total time:** ~4 hours of intensive debugging
**Commits:** 7
**Lines changed:** ~50

---

## Acknowledgments

This issue was resolved through systematic debugging following the principle:

> "First understand the problem completely, then fix it once."

The strict separation between error discovery and error fixing prevented premature solutions and led to the correct root cause identification.

---

**Generated:** 2025-11-27
**Resolution Status:** ✅ RESOLVED
**Can be closed:** After CI verification passes
