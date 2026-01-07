# soPres - Docker Guide

**Last Updated:** 2025-11-26
**Version:** v.0.016

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Docker Architecture](#docker-architecture)
4. [Environment Setup](#environment-setup)
5. [Development Workflow](#development-workflow)
6. [Production Deployment](#production-deployment)
7. [Docker Commands Reference](#docker-commands-reference)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

soPres uses Docker for consistent development and production environments. The multi-stage Dockerfile optimizes build size and security.

### Available Docker Configurations

- **`Dockerfile`** - Multi-stage build for API and Admin
- **`docker-compose.dev.yml`** - Development environment (PostgreSQL + Redis)
- **`docker-compose.prod.yml`** - Production stack (API + Admin + Nginx)
- **`.dockerignore`** - Optimizes Docker build context

---

## 🚀 Quick Start

### Development

```bash
# Start PostgreSQL and Redis
docker-compose -f docker-compose.dev.yml up -d

# Run migrations
npx prisma migrate dev

# Start development servers (outside Docker)
npm run dev:api
npm run dev:admin
```

### Production

```bash
# Build and start production stack
docker-compose -f docker-compose.prod.yml up -d --build

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

## 🏗️ Docker Architecture

### Multi-Stage Dockerfile

The Dockerfile uses multi-stage builds to optimize image size:

```dockerfile
# Stage 1: Builder - Builds all workspaces
FROM node:18-alpine AS builder
# Install dependencies, build application

# Stage 2: API - Production API image
FROM node:18-alpine AS api
# Copy built artifacts, minimal dependencies

# Stage 3: Admin - Nginx serving static files
FROM nginx:alpine AS admin
# Copy built admin panel, nginx config
```

### Image Sizes (Approximate)

- **Builder Stage:** ~800MB (discarded)
- **API Image:** ~300MB
- **Admin Image:** ~50MB

---

## 🌍 Environment Setup

### Development Environment (.env)

```env
NODE_ENV=development
DATABASE_URL="postgresql://vitecms:vitecms@localhost:5432/vitecms"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="dev-secret-change-in-production"
JWT_REFRESH_SECRET="dev-refresh-secret-change-in-production"
```

### Production Environment

Create `.env.production`:

```env
NODE_ENV=production
# Update this to point to the postgres service in docker-compose.prod.yml
DATABASE_URL="postgresql://vitecms:vitecms@postgres:5432/vitecms"
JWT_SECRET="<generated-secret-64-chars>"
JWT_REFRESH_SECRET="<generated-secret-64-chars>"
CORS_ORIGIN="https://your-domain.com"
```

---

## 💻 Development Workflow

### 1. Start Development Services

```bash
# Start PostgreSQL and Redis
docker-compose -f docker-compose.dev.yml up -d

# Verify services are running
docker-compose -f docker-compose.dev.yml ps
```

### 2. Initialize Database

```bash
# Run migrations
npx prisma migrate dev

# Seed database
npx tsx prisma/seed.ts

# (Optional) Open Prisma Studio
npx prisma studio
```

### 3. Develop

```bash
# Terminal 1: API development
npm run dev:api

# Terminal 2: Admin development
npm run dev:admin
```

### 4. Database Management

```bash
# Create migration
npx prisma migrate dev --name add_new_feature

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

### 5. Stop Services

```bash
docker-compose -f docker-compose.dev.yml down

# Remove volumes (WARNING: deletes data)
docker-compose -f docker-compose.dev.yml down -v
```

---

## 🚢 Production Deployment

### 1. Build Images

```bash
# Build all images
docker-compose -f docker-compose.prod.yml build

# Build specific service
docker-compose -f docker-compose.prod.yml build api
docker-compose -f docker-compose.prod.yml build admin
```

### 2. Environment Configuration

Create production environment file:

```bash
cp .env.example .env.production
```

Edit `.env.production` with production values.

### 3. Database Migrations

```bash
# Run migrations in production
docker-compose -f docker-compose.prod.yml run --rm api npx prisma migrate deploy

# Seed database (first time only)
docker-compose -f docker-compose.prod.yml run --rm api npx tsx prisma/seed.ts
```

### 4. Start Production Stack

```bash
# Start all services
docker-compose -f docker-compose.prod.yml up -d

# Check health
curl http://localhost:3000/health
curl http://localhost/  # Admin panel
```

### 5. Monitoring

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker-compose -f docker-compose.prod.yml logs -f api

# Monitor resource usage
docker stats

# Check container health
docker-compose -f docker-compose.prod.yml ps
```

---

## 📚 Docker Commands Reference

### Container Management

```bash
# Start services
docker-compose -f docker-compose.prod.yml up -d

# Stop services
docker-compose -f docker-compose.prod.yml stop

# Remove containers
docker-compose -f docker-compose.prod.yml down

# Restart service
docker-compose -f docker-compose.prod.yml restart api

# View running containers
docker-compose -f docker-compose.prod.yml ps
```

### Logs & Debugging

```bash
# View all logs
docker-compose -f docker-compose.prod.yml logs

# Follow logs
docker-compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker-compose -f docker-compose.prod.yml logs api

# Last 100 lines
docker-compose -f docker-compose.prod.yml logs --tail=100

# Logs since specific time
docker-compose -f docker-compose.prod.yml logs --since 2h
```

### Execute Commands

```bash
# Execute command in running container
docker-compose -f docker-compose.prod.yml exec api sh

# Run one-off command
docker-compose -f docker-compose.prod.yml run --rm api npx prisma migrate deploy

# Run with different user
docker-compose -f docker-compose.prod.yml exec -u root api sh
```

### Image Management

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Build without cache
docker-compose -f docker-compose.prod.yml build --no-cache

# Pull images
docker-compose -f docker-compose.prod.yml pull

# List images
docker images | grep vitecms

# Remove unused images
docker image prune -a
```

### Volume Management

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect vitecms_postgres_data

# Remove all volumes (WARNING: deletes data)
docker-compose -f docker-compose.prod.yml down -v

# Backup volume
docker run --rm -v vitecms_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data
```

### Health Checks

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' vitecms-api

# View health check logs
docker inspect --format='{{json .State.Health}}' vitecms-api | jq
```

---

## 🔧 Advanced Configuration

### Custom Dockerfile Build

Build with specific target:

```bash
# Build only API
docker build --target api -t vitecms-api:latest .

# Build only Admin
docker build --target admin -t vitecms-admin:latest .

# Build with build args
docker build --build-arg NODE_VERSION=20 -t vitecms-api:latest .
```

### Docker Compose Override

Create `docker-compose.override.yml` for local customization:

```yaml
version: "3.8"

services:
  api:
    ports:
      - "3001:3000" # Different port
    environment:
      - DEBUG=true
    volumes:
      - ./api:/app/api:ro # Mount source for hot reload
```

### Multi-Environment Setup

```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Staging
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

---

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs api

# Check if port is already in use
lsof -i :3000

# Check container status
docker-compose ps

# Inspect container
docker inspect vitecms-api
```

### Database Connection Issues

```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Test connection
docker-compose exec postgres psql -U vitecms -d vitecms -c "SELECT 1"

# Check environment variables
docker-compose exec api printenv | grep DATABASE_URL
```

### Build Failures

```bash
# Clean build without cache
docker-compose build --no-cache

# Remove old images
docker image prune -a

# Check Docker disk space
docker system df

# Clean everything
docker system prune -a --volumes
```

### Permission Issues

```bash
# Fix file permissions
chmod -R 755 ./

# Run as different user
docker-compose run --user $(id -u):$(id -g) api sh

# Check file ownership inside container
docker-compose exec api ls -la
```

### Container Resource Issues

```bash
# Check resource usage
docker stats

# Increase memory limit (docker-compose.yml)
services:
  api:
    mem_limit: 1g
    cpus: 2

# Check Docker daemon resources
docker info | grep -i memory
```

---

## 🔒 Security Best Practices

### Image Security

- Use official base images (node:18-alpine)
- Run as non-root user
- Minimize layers
- Use .dockerignore
- Scan images for vulnerabilities

```bash
# Scan image for vulnerabilities
docker scout cves vitecms-api:latest

# Or use trivy
trivy image vitecms-api:latest
```

### Container Security

- Don't run containers as root
- Use read-only root filesystem where possible
- Limit container capabilities
- Use secrets management
- Keep images updated

### Network Security

- Use private networks
- Limit exposed ports
- Use reverse proxy (nginx)
- Enable HTTPS
- Configure firewall rules

---

## 📊 Performance Optimization

### Build Optimization

```dockerfile
# Use .dockerignore to exclude unnecessary files
# Layer caching - put frequently changing files last
# Multi-stage builds to reduce final image size
# Use alpine base images
```

### Runtime Optimization

```yaml
# docker-compose.yml
services:
  api:
    # Resource limits
    cpus: "0.50"
    mem_limit: 512m

    # Health checks
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

    # Restart policy
    restart: unless-stopped
```

---

## 🔄 Backup & Restore

### Backup

```bash
# Backup database volume
docker run --rm \
  -v vitecms_postgres_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/db-backup-$(date +%Y%m%d).tar.gz /data

# Backup uploaded files
docker cp vitecms-api:/app/uploads ./uploads-backup-$(date +%Y%m%d)
```

### Restore

```bash
# Restore database volume
docker run --rm \
  -v vitecms_postgres_data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/db-backup-20251126.tar.gz -C /

# Restore uploaded files
docker cp ./uploads-backup-20251126 vitecms-api:/app/uploads
```

---

## 🎯 Common Workflows

### Update Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build

# Run migrations
docker-compose -f docker-compose.prod.yml exec api npx prisma migrate deploy
```

### View Application Status

```bash
# Check all services
docker-compose -f docker-compose.prod.yml ps

# Check health endpoints
curl http://localhost:3000/health
curl http://localhost:3000/health/detailed

# View metrics
docker stats
```

### Database Maintenance

```bash
# Backup database
docker-compose exec postgres pg_dump -U vitecms vitecms > backup.sql

# Restore database
docker-compose exec -T postgres psql -U vitecms vitecms < backup.sql

# Reset database (development only!)
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
npx prisma migrate dev
```

---

## 📚 Additional Resources

- [Official Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Monitoring Guide](./MONITORING_GUIDE.md)

---

**Questions or issues?** Check the [Troubleshooting section](#troubleshooting) or open a GitHub issue.
