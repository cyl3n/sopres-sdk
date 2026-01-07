# @sopres/utils

Utility functions for soPres applications.

## Installation

```bash
npm install @sopres/utils
```

## Usage

```typescript
import {
  isValidEmail,
  isValidSlug,
  sanitizeHtml,
  formatDate,
  parseQueryString,
} from "@sopres/utils";

// Validators
isValidEmail("user@example.com"); // true
isValidSlug("hello-world"); // true
isValidUrl("https://example.com"); // true

// Sanitization
sanitizeHtml('<script>alert("xss")</script>'); // escaped

// Helpers
parseQueryString("?page=1&limit=10"); // { page: '1', limit: '10' }
```

## Functions

### Validators

- `isValidEmail(email)` - Email validation
- `isValidUrl(url)` - URL validation
- `isValidSlug(slug)` - Slug validation
- `isStrongPassword(password)` - Password strength check
- `sanitizeHtml(html)` - XSS sanitization

### Helpers

- `parseQueryString(query)` - Parse query string
- `buildQueryString(params)` - Build query string
- `getFileExtension(filename)` - Extract file extension
- `getMimeType(filename)` - Get MIME type

## License

MIT
