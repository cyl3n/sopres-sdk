# Erste Schritte mit dem soPres SDK

In dieser Anleitung lernst du, wie du das soPres SDK installierst und in dein Projekt integrierst.

## 📦 Installation

Installiere das Core-Paket und den Client über npm:

```bash
npm install @sopres/sdk
```

Das Paket enthält automatisch `@sopres/core` (Typen) und `@sopres/utils` (Hilfsfunktionen).

## 🔧 Konfiguration

Initialisiere den `SopresClient` in deiner Anwendung (z.B. in `src/lib/cms.ts` bei Next.js):

```typescript
import { SopresClient } from "@sopres/sdk";

export const sdk = new SopresClient({
  apiUrl: process.env.SOPRES_API_URL, // Deine API-Basis-URL
  apiKey: process.env.SOPRES_API_KEY, // Optional: Dein API-Key (falls benötigt)
  timeout: 10000, // Optional: Timeout in ms (default: 30000)
});
```

### Konfigurations-Optionen

| Option         | Typ      | Beschreibung                                               |
| :------------- | :------- | :--------------------------------------------------------- |
| `apiUrl`       | `string` | **Erforderlich.** Die Basis-URL deiner soPres Instanz.     |
| `accessToken`  | `string` | Optionaler JWT Access-Token für authentifizierte Anfragen. |
| `refreshToken` | `string` | Optionaler Refresh-Token für automatische Erneuerung.      |
| `timeout`      | `number` | Zeitlimit für API-Anfragen in Millisekunden.               |

## 📡 Erste Abfrage

Sobald der Client konfiguriert ist, kannst du Daten abrufen:

```typescript
async function fetchHome() {
  try {
    const response = await sdk.content.getBySlug("index");

    if (response.success) {
      console.log("Inhalt gefunden:", response.data.title);
    }
  } catch (error) {
    console.error("Fehler beim Abrufen:", error);
  }
}
```

## ⏭️ Wie geht es weiter?

- Lerne mehr über die [Content API](./api/content.md).
- Schau dir an, wie du dich [authentifizierst](./guides/authentication.md).
