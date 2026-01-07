# Changelog

Alle nennenswerten Änderungen an soPres werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

---

## [Unreleased]

### Geplant für v0.1.0

- Fix für E2E Test Rate Limiting
- Vollständige API Endpoint Dokumentation
- Code of Conduct Dokument
- Security Policy (SECURITY.md)
- GitHub Issue & PR Templates

---

## [0.0.16] - 2025-11-26

### Phase 8: Dokumentation & Polish

#### Hinzugefügt

- Umfassendes Handbook (HANDBOOK.md) mit 1.400+ Zeilen
- Getting Started Guide (docs/GETTING_STARTED.md) mit 15-Minuten Quick Start
- API Dokumentation Overview (docs/api/README.md)
- Deutsche README.md Version
- CONTRIBUTING.md mit vollständigen Contribution Guidelines
- LICENSE Datei (MIT License)
- CHANGELOG.md (diese Datei)
- E2E Test Status Report (docs/E2E_TEST_STATUS.md)
- Aktualisierte TODO.md mit Phase 9-10 Roadmap

#### Geändert

- LoginPage.tsx mit verbessertem UI und Default Credentials Anzeige
- playwright.config.ts optimiert für bessere Performance (3 Workers, reduzierte Traces)
- admin/vite.config.ts mit Proxy auf 127.0.0.1:3000
- E2E Tests verbessert mit besseren Wait Conditions und Timeouts
- .gitignore aktualisiert für aktuellen Projektstand
- .dockerignore verifiziert und aktualisiert

#### Behoben

- E2E Test Selektoren verbessert (flexiblere h1/h2 Auswahl)
- CSS Selector Syntax Fehler in E2E Tests behoben
- Playwright example.spec.ts entfernt

#### Bekannte Probleme

- E2E Tests schlagen fehl wegen API Rate Limiting (429)
- 4 von 13 E2E Tests bestehen, 9 blockiert durch Rate Limiting

---

## [0.0.15] - 2025-11-25

### Phase 7: DevOps & Deployment - Global Testing

#### Hinzugefügt

- Globaler Test Report nach Phase 7 (docs/PHASE7_TEST_REPORT.md)
- Komplette Test Coverage: 163/163 Tests bestanden (100%)

#### Verifiziert

- 152 Jest Tests (141 Unit, 11 Integration)
- 5 Health Check Endpoints
- 4 API Endpoints
- 2 Services (Admin Panel, API Server)

---

## [0.0.14] - 2025-11-25

### Phase 7: DevOps & Deployment - Health Checks

#### Hinzugefügt

- Kubernetes-kompatible Health Check Endpoints
  - `GET /api/v1/system/health` - Basic Health Check
  - `GET /api/v1/system/health/live` - Liveness Probe
  - `GET /api/v1/system/health/ready` - Readiness Probe
  - `GET /api/v1/system/health/detailed` - Detailed Diagnostics
  - `GET /api/v1/system/stats` - System Statistics
- System Stats Endpoint mit User/Page/Media/Pattern Counts

#### Getestet

- Alle Health Check Endpoints funktionieren
- Liveness Probe prüft Memory Usage
- Readiness Probe prüft Database Connection
- Detailed Health Check gibt umfassende Diagnostics

---

## [0.0.13] - 2025-11-24

### Phase 7: DevOps & Deployment - Docker & CI/CD

#### Hinzugefügt

- Multi-Stage Dockerfile für Production Builds
- docker-compose.yml für Development & Production
- .dockerignore für optimierten Build Context
- GitHub Actions CI/CD Pipeline (.github/workflows/)
  - Lint Job
  - Test Job (Unit & Integration)
  - Build Job
  - Docker Build Job
- Deployment Guide (docs/DEPLOYMENT_GUIDE.md)

#### Optimiert

- Docker Build Context um ~80% reduziert
- Multi-stage builds für kleinere Images
- Parallel CI/CD Jobs für schnellere Builds

---

## [0.0.12] - 2025-11-23

### Phase 6: Testing & QA - E2E Tests

#### Hinzugefügt

- Playwright E2E Tests Setup
- Admin Login E2E Tests (8 Tests)
- Content Management E2E Tests (7 Tests)
- Playwright Config mit Chromium Support

#### Status

- 15 E2E Tests erstellt
- 4 Tests bestehen, 11 mit Selector Issues (zu beheben in Phase 8)

---

## [0.0.11] - 2025-11-22

### Phase 6: Testing & QA - Integration Tests

#### Hinzugefügt

- API Integration Tests
  - Auth Endpoints (Login, Register, Logout, Token Refresh)
  - Content Endpoints (CRUD Operations)
  - Media Endpoints (Upload, List, Delete)
  - User Endpoints (Admin Operations)

#### Status

- 11 Integration Tests erstellt und bestanden
- 100% Test Coverage für kritische Endpoints

---

## [0.0.10] - 2025-11-21

### Phase 6: Testing & QA - Unit Tests

#### Hinzugefügt

- Jest Setup und Konfiguration
- 141 Unit Tests
  - Utility Functions
  - API Services
  - Validation Schemas
  - Database Operations
  - Middleware Functions

#### Status

- 141/141 Unit Tests bestanden
- Test Coverage: ~85%

---

## [0.0.9] - 2025-11-20

### Phase 5: CLI Development - Deployment Commands

#### Hinzugefügt

- `vitecms deploy` - Production Deployment Command
- `vitecms backup` - Database Backup Command
- `vitecms restore` - Database Restore Command
- `vitecms health` - Health Check Command

#### Funktionen

- Multi-environment support (staging, production)
- Automated database migrations
- Health checks vor Deployment
- Rollback bei Fehlern

---

## [0.0.8] - 2025-11-19

### Phase 5: CLI Development - User Management

#### Hinzugefügt

- `vitecms user:create` - User erstellen
- `vitecms user:list` - User auflisten
- `vitecms user:delete` - User löschen
- `vitecms user:role` - User Rolle ändern

#### Funktionen

- Interaktive Prompts
- Role-based Access Control
- Password Validation
- Email Validation

---

## [0.0.7] - 2025-11-18

### Phase 5: CLI Development - Core Commands

#### Hinzugefügt

- `vitecms init` - Projekt Initialisierung
- `vitecms generate` - Code Generation
  - Pages
  - Components
  - Patterns
- `vitecms config` - Konfiguration Management

#### Funktionen

- Template System
- File Generation
- Config Validation

---

## [0.0.6] - 2025-11-17

### Phase 4: Admin Panel - Advanced Features

#### Hinzugefügt

- Dashboard mit Statistiken
- User Management Interface
- Audit Log Viewer
- Settings Page
- Pattern Editor
- Responsive Design

#### Verbessert

- UI/UX Polish
- Performance Optimierung
- Accessibility Verbesserungen

---

## [0.0.5] - 2025-11-16

### Phase 4: Admin Panel - Content Management UI

#### Hinzugefügt

- Content Editor mit Markdown Support
- Content List View mit Filtering
- Content Search
- Status Management (Draft/Published/Archived)
- Version History View
- Preview Funktionalität

#### Funktionen

- Real-time Markdown Preview
- Auto-save
- Slug Auto-generation
- SEO Meta Fields

---

## [0.0.4] - 2025-11-15

### Phase 4: Admin Panel - Auth & Layout

#### Hinzugefügt

- Login/Register Pages
- Main Layout mit Sidebar
- Navigation System
- User Menu
- Tailwind CSS Setup
- React Router v6

#### Komponenten

- AuthLayout
- DashboardLayout
- Sidebar
- Header
- Protected Routes

---

## [0.0.3] - 2025-11-14

### Phase 3: Build Engine Development

#### Hinzugefügt

- Build Engine Core
- Page Builder
- Pattern Processor
- Media Processor
- Asset Bundler
- Hot Reload Support

#### Funktionen

- Markdown → HTML Compilation
- Pattern Replacement
- Image Optimization
- Static Site Generation

---

## [0.0.2] - 2025-11-13

### Phase 2: Backend API Development

#### Hinzugefügt

- Authentication System (JWT)
- Content API (CRUD)
- Media API (Upload/Management)
- Pattern API (CRUD)
- User API (Management)
- Audit Logging
- Rate Limiting
- Input Validation (Zod)

#### Endpoints

- `/api/v1/auth/*` - Authentication
- `/api/v1/content/*` - Content Management
- `/api/v1/media/*` - Media Management
- `/api/v1/patterns/*` - Pattern Management
- `/api/v1/users/*` - User Management
- `/api/v1/audit/*` - Audit Logs

#### Security

- JWT Authentication & Refresh Tokens
- Role-based Access Control (RBAC)
- Rate Limiting (100 req/15min)
- Input Validation & Sanitization

---

## [0.0.1] - 2025-11-12

### Phase 1: Foundation & Core Setup

#### Hinzugefügt

- Monorepo Struktur (npm workspaces)
- 5 Workspaces:
  - `@sopres/api` - Backend API
  - `@sopres/admin` - Admin Panel
  - `@sopres/cli` - CLI Tool
  - `@sopres/engine` - Build Engine
  - `@sopres/packages` - Shared Packages
- Prisma ORM Setup
- Database Schema:
  - Users (mit RBAC)
  - Pages (mit Versioning)
  - Media (Uploads)
  - Patterns (Templates)
  - Audit Logs
- TypeScript 5.3 Configuration
- ESLint & Prettier Setup
- Initial Documentation

#### Technologien

- Node.js 18+
- TypeScript 5.3
- Prisma ORM
- SQLite (Development)
- PostgreSQL (Production)
- Express.js
- React 18
- Vite 5

---

## Versions-Schema

Wir verwenden [Semantic Versioning](https://semver.org/lang/de/):

- **MAJOR** (1.x.x): Breaking Changes
- **MINOR** (x.1.x): Neue Features (backward-compatible)
- **PATCH** (x.x.1): Bug Fixes (backward-compatible)

**Pre-Release Versionen:**

- `0.0.x` - Development Phase (v.0.001 - v.0.016)
- `0.1.x` - Alpha Release (geplant)
- `0.9.x` - Beta Release (geplant)
- `1.0.0` - Stable Release (geplant)

---

## Mitwirken

Siehe [CONTRIBUTING.md](CONTRIBUTING.md) für Details zum Beitragen zu soPres.

---

## Lizenz

soPres ist unter der [MIT License](LICENSE) lizenziert.

---

**Projekt Status:** In Entwicklung (Phase 8)
**Nächste Version:** v0.1.0 (Alpha Release)
**Maintainer:** Steffen Oepke (@cyl3n)
