# Contributing to soPres

Vielen Dank für dein Interesse an soPres! Dieses Dokument beschreibt, wie du zum Projekt beitragen kannst.

---

## Inhaltsverzeichnis

1. [Code of Conduct](#code-of-conduct)
2. [Wie kann ich beitragen?](#wie-kann-ich-beitragen)
3. [Entwicklungsumgebung](#entwicklungsumgebung)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Prozess](#pull-request-prozess)

---

## Code of Conduct

Lies bitte unseren [Code of Conduct](CODE_OF_CONDUCT.md). Wir erwarten respektvolles und konstruktives Verhalten.

---

## Wie kann ich beitragen?

### Bugs melden

[Erstelle ein Issue](https://github.com/cyl3n/sopres-sdk/issues/new) mit:

- Bug Beschreibung
- Schritte zur Reproduktion
- Erwartetes vs. tatsächliches Verhalten
- Umgebung (OS, Node Version, Browser)

### Feature Requests

[Erstelle ein Feature Request](https://github.com/cyl3n/sopres-sdk/issues/new) mit:

- Feature Beschreibung
- Use Case / Problem
- Vorgeschlagene Lösung

### Code beitragen

1. Fork das Repository
2. Erstelle einen Feature Branch
3. Implementiere deine Änderungen
4. Schreibe Tests
5. Erstelle einen Pull Request

---

## Entwicklungsumgebung

### Voraussetzungen

- Node.js 18+
- npm 9+
- Git

### Setup

```bash
# Repository klonen
git clone https://github.com/YOUR-USERNAME/sopres-sdk.git
cd sopres-sdk

# Dependencies installieren
npm install

# Build testen
npm run build:packages

# Tests ausführen
npm test
```

---

## Coding Standards

### TypeScript

- Keine `any` Types (außer unvermeidbar)
- Explizite Return Types für Funktionen
- Interfaces bevorzugt über Types

### Code Style

Wir verwenden ESLint und Prettier:

```bash
npm run lint      # Prüfen
npm run lint:fix  # Auto-Fix
npm run format    # Formatieren
```

### Naming Conventions

| Typ        | Convention       | Beispiel          |
| ---------- | ---------------- | ----------------- |
| Components | PascalCase       | `UserProfile.tsx` |
| Functions  | camelCase        | `getUserById()`   |
| Constants  | UPPER_SNAKE_CASE | `API_BASE_URL`    |
| Interfaces | PascalCase       | `IUserData`       |

---

## Commit Guidelines

Wir folgen [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
```

### Types

| Type       | Beschreibung     |
| ---------- | ---------------- |
| `feat`     | Neues Feature    |
| `fix`      | Bug Fix          |
| `docs`     | Dokumentation    |
| `refactor` | Code Refactoring |
| `test`     | Tests            |
| `chore`    | Build/Tools      |

### Beispiele

```bash
git commit -m "feat(sdk): add content API client"
git commit -m "fix(utils): resolve date parsing issue"
git commit -m "docs: update README"
```

---

## Pull Request Prozess

1. Erstelle einen PR mit beschreibendem Titel
2. Fülle die PR-Beschreibung aus
3. Warte auf Review
4. Arbeite Feedback ein
5. Nach Approval wird gemerged

### Checkliste

- [ ] Tests geschrieben
- [ ] Dokumentation aktualisiert
- [ ] Lint-Fehler behoben
- [ ] Branch ist aktuell mit main

---

## Lizenz

Beiträge werden unter der [MIT License](LICENSE) lizenziert.

---

**Fragen?** Kontakt: contact@sopres.com
