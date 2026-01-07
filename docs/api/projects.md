# Project API

Ermöglicht den Zugriff auf Projektdaten und Walkthroughs (Projektpräsentationen).

## 🛠️ Zugriff auf die Project API

```typescript
const projects = sdk.projects;
```

## 📖 Methoden

### `list(options?)`

Ruft alle verfügbaren Walkthroughs oder Projekte ab.

```typescript
const { data } = await sdk.projects.list();
```

### `featured()`

Gibt eine Liste von hervorgehobenen ("Featured") Projekten zurück.

```typescript
const { data } = await sdk.projects.featured();
```

### `get(id)` / `getBySlug(slug)`

Ruft ein spezifisches Projekt ab.

```typescript
const { data } = await sdk.projects.getBySlug("mein-neues-projekt");
```
