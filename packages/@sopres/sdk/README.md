# @sopres/sdk

TypeScript SDK for soPres CMS API.

## Installation

```bash
npm install @sopres/sdk
```

## Usage

```typescript
import { SopresClient } from "@sopres/sdk";

const client = new SopresClient({
  baseUrl: "https://your-sopres-instance.com/api",
  apiKey: "your-api-key",
});

// Fetch content
const pages = await client.content.list();
const page = await client.content.get("page-slug");

// Media
const media = await client.media.list();

// Patterns
const patterns = await client.patterns.list();
```

## API Reference

### Content API

- `client.content.list()` - List all content
- `client.content.get(slug)` - Get content by slug
- `client.content.create(data)` - Create content
- `client.content.update(id, data)` - Update content
- `client.content.delete(id)` - Delete content

### Media API

- `client.media.list()` - List media files
- `client.media.upload(file)` - Upload file
- `client.media.delete(id)` - Delete file

### Patterns API

- `client.patterns.list()` - List patterns
- `client.patterns.get(id)` - Get pattern

## License

MIT
