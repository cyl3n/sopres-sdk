# Content API

Die Content API ist das Herzstück des SDKs. Sie wird verwendet, um Seiten und Inhalte aus deinem soPres CMS abzurufen.

## 🛠️ Zugriff auf die Content API

```typescript
const content = sdk.content;
```

## 📖 Methoden

### `list(options?)`

Ruft eine Liste von Inhalten ab.

```typescript
const { data, meta } = await sdk.content.list({
  status: "PUBLISHED",
  limit: 10,
  page: 1,
});
```

**Optionen:**

- `status`: `'DRAFT' | 'PUBLISHED' | 'ARCHIVED'`
- `limit`: Anzahl der Elemente pro Seite.
- `page`: Aktuelle Seite.
- `search`: Suchstring.

### `get(id)`

Ruft einen spezifischen Inhalt anhand seiner ID ab.

```typescript
const { data } = await sdk.content.get("uuid-id-hier");
```

### `getBySlug(slug)`

Ruft einen Inhalt anhand seines Slugs ab. Ideal für dynamisches Routing.

```typescript
const { data } = await sdk.content.getBySlug("uber-uns");
```

### `search(query, options?)`

Durchsucht alle Inhalte nach einem Stichwort.

```typescript
const { data } = await sdk.content.search("Tutorial");
```

## 🧩 Datentypen

Alle Rückgabetypen sind in `@sopres/core` definiert und werden automatisch vom SDK bereitgestellt:

```typescript
import type { Page } from "@sopres/sdk";

const page: Page = response.data;
```
