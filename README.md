# soPres SDK

> TypeScript SDK for building modern web applications with soPres CMS

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/cyl3n/sopres-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue)](https://www.typescriptlang.org/)

## 📦 Packages

| Package         | Description                 |
| --------------- | --------------------------- |
| `@sopres/sdk`   | API client for soPres CMS   |
| `@sopres/core`  | Shared types and interfaces |
| `@sopres/utils` | Utility functions           |

## 🚀 Quick Start

```bash
npm install @sopres/sdk
```

```typescript
import { SopresClient } from "@sopres/sdk";

const client = new SopresClient({
  apiUrl: "https://your-sopres-instance.com/api",
  apiKey: "your-api-key",
});

// Fetch content
const pages = await client.content.list();
const page = await client.content.get("page-slug");
```

## 📁 Project Structure

```
sopres-sdk/
├── packages/
│   ├── @sopres/sdk      # API Client
│   ├── @sopres/core     # Types & Interfaces
│   └── @sopres/utils    # Utilities
├── boilerplates/        # Starter templates
└── docs/                # Documentation
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build:packages

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint
```

## 📚 Documentation

- [Getting Started](docs/01-getting-started/)
- [SDK Handbook](docs/handbook/)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT © Steffen Oepke
