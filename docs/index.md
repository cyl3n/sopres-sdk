# soPres SDK Documentation

Willkommen in der offiziellen Dokumentation für das soPres SDK. Dieses SDK ermöglicht es dir, moderne Web-Applikationen nahtlos mit deinem soPres CMS zu verbinden.

## 📖 Dokumentation nach Themen

### Grundlagen

- [Erste Schritte](./getting-started.md) — Installation und grundlegende Konfiguration.
- [Authentifizierung](./guides/authentication.md) — Login, Token-Management und geschützte Anfragen.

### API Referenz

- [Content API](./api/content.md) — Abrufen von Seiten, Beiträgen und Inhalten.
- [Media API](./api/media.md) — Upload und Verwaltung von Medien-Assets.
- [Project API](./api/projects.md) — Zugriff auf Projektdaten und Walkthroughs.

## 🚀 Schnellstart

```bash
npm install @sopres/sdk
```

```typescript
import { SopresClient } from "@sopres/sdk";

const sdk = new SopresClient({
  apiUrl: "https://your-api.com",
  apiKey: "your-api-key",
});

// Seite abrufen
const { data: page } = await sdk.content.getBySlug("home");
```

## 🛠️ Entwicklung & Support

- [GitHub Repository](https://github.com/cyl3n/sopres-sdk)
- [Issue Tracker](https://github.com/cyl3n/sopres-sdk/issues)
- [NPM Organisation](https://www.npmjs.com/org/sopres)
