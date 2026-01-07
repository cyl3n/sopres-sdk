# @sopres/core

Core types and utilities for soPres packages.

## Installation

```bash
npm install @sopres/core
```

## Usage

```typescript
import { ContentStatus, UserRole, ApiResponse } from "@sopres/core";

// Types
interface Page {
  id: string;
  title: string;
  status: ContentStatus;
}

// Constants
console.log(ContentStatus.PUBLISHED);
console.log(UserRole.ADMIN);
```

## Exports

- **Types**: `ContentStatus`, `UserRole`, `ApiResponse`, `PaginatedResponse`
- **Errors**: `BaseError`, `ValidationError`, `NotFoundError`
- **Validation**: Zod schemas for common data structures
- **Constants**: Status codes, roles, permissions

## License

MIT
