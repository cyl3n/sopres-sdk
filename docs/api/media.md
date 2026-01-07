# Media API

Verwalte Medien-Assets wie Bilder, Dokumente und Videos.

## 🛠️ Zugriff auf die Media API

```typescript
const media = sdk.media;
```

## 📖 Methoden

### `list(options?)`

Listet alle verfügbaren Medien-Assets auf.

```typescript
const { data } = await sdk.media.list({ limit: 20 });
```

### `get(id)`

Ruft Details zu einem spezifischen Asset ab.

```typescript
const { data } = await sdk.media.get("asset-uuid");
```

### `upload(file, metadata?)`

Lädt eine neue Datei in das soPres CMS hoch.

```typescript
const file = // ... aus einem Input-Feld oder Buffer
const response = await sdk.media.upload(file, {
  alt: 'Beschreibung des Bildes',
  caption: 'Ein schöner Tag am Meer'
});
```

### `delete(id)`

Löscht ein Asset permanent.

```typescript
const { success } = await sdk.media.delete("asset-uuid");
```
