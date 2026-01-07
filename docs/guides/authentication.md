# Authentifizierung

Das soPres SDK unterstützt JWT-basierte Authentifizierung für geschützte API-Endpunkte.

## 🔐 Login

Verwende die `auth` Sektion, um dich anzumelden:

```typescript
const response = await sdk.auth.login({
  email: "admin@sopres.com",
  password: "password123",
});

if (response.success) {
  // Tokens werden automatisch im SDK-Client gespeichert
  console.log("Willkommen,", response.data.user.name);
}
```

## 🔄 Token Management

Das SDK verwaltet Tokens intern. Du kannst sie jedoch auch manuell setzen, wenn du sie z.B. aus einem Cookie liest:

```typescript
sdk.setAccessToken("dein-token");
sdk.setRefreshToken("dein-refresh-token");
```

### Abmeldung

Gibt die Tokens frei und sendet den Logout-Request an die API:

```typescript
await sdk.auth.logout();
sdk.clearTokens(); // Lokal löschen
```

## 🛠️ Automatisches Refreshing

Standardmäßig versucht das SDK, ablaufende Access-Tokens mithilfe des Refresh-Tokens automatisch zu erneuern, falls ein Request einen `401 Unauthorized` Fehler zurückgibt.

Dies kann bei der Initialisierung deaktiviert werden:

```typescript
const sdk = new SopresClient({
  apiUrl: "...",
  autoRefreshToken: false, // Standard: true
});
```
