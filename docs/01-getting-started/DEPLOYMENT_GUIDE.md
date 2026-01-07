# soPres - Deployment Guide

**Last Updated:** 2025-11-26
**Version:** v.0.016

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Docker Deployment](#docker-deployment)
4. [Manual Deployment](#manual-deployment)
5. [Production Checklist](#production-checklist)
6. [Health Checks](#health-checks)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### System Requirements

- **Node.js:** 18.x or higher
- **npm:** 9.x or higher
- **Docker:** 20.x or higher (optional, but recommended)
- **Docker Compose:** 2.x or higher (optional)
- **PostgreSQL:** 15.x or higher (if not using Docker)
- **Redis:** 7.x or higher (optional, for caching)

### Required Ports

- **3000:** API Server
- **5173/80:** Admin Panel
- **5432:** PostgreSQL (if using separate DB)
- **6379:** Redis (if using cache)

---

## 🌍 Environment Setup

### 1. Create Environment File

Copy the example environment file and configure:

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` with your production values:

```bash
# Application
NODE_ENV=production
PORT=3000
API_URL=https://api.your-domain.com

# Database
DATABASE_URL="file:./prod.db"
# Or for PostgreSQL:
# DATABASE_URL="postgresql://user:password@localhost:5432/sopres"

# JWT Secrets (MUST be changed in production!)
JWT_SECRET="your-super-secret-jwt-key-min-32-characters"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32-characters"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# CORS
CORS_ORIGIN="https://your-domain.com"

# Admin Panel
VITE_API_URL=https://api.your-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

### 3. Generate Strong Secrets

```bash
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate Refresh Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🐳 Docker Deployment (Recommended)

### Development Environment

```bash
# Start all services (PostgreSQL + Redis)
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### Production Deployment

#### 1. Build Docker Images

```bash
docker-compose -f docker-compose.prod.yml build
```

#### 2. Run Database Migrations

```bash
# Run migrations
docker-compose -f docker-compose.prod.yml run --rm api npx prisma migrate deploy

# Seed database (optional, first time only)
docker-compose -f docker-compose.prod.yml run --rm api npx tsx prisma/seed.ts
```

#### 3. Start Production Stack

```bash
docker-compose -f docker-compose.prod.yml up -d
```

#### 4. Verify Deployment

```bash
# Check container status
docker-compose -f docker-compose.prod.yml ps

# Check API health
curl http://localhost:3000/health

# Check detailed health
curl http://localhost:3000/health/detailed

# View logs
docker-compose -f docker-compose.prod.yml logs -f api
docker-compose -f docker-compose.prod.yml logs -f admin
```

### Docker Commands Reference

```bash
# Start services
docker-compose -f docker-compose.prod.yml up -d

# Stop services
docker-compose -f docker-compose.prod.yml down

# Restart services
docker-compose -f docker-compose.prod.yml restart

# View logs
docker-compose -f docker-compose.prod.yml logs -f [service]

# Execute command in container
docker-compose -f docker-compose.prod.yml exec api [command]

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build

# Remove all containers and volumes
docker-compose -f docker-compose.prod.yml down -v
```

---

## 🔨 Manual Deployment

### 1. Install Dependencies

```bash
npm ci --production
```

### 2. Build Application

```bash
# Build all workspaces
npm run build

# Or build individually
npm run build:packages
npm run build:api
npm run build:admin
npm run build:engine
```

### 3. Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Seed database (first time only)
npx tsx prisma/seed.ts
```

### 4. Start Application

#### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start API
pm2 start npm --name "sopres-api" -- run start:api

# Start Admin (static files need nginx/apache)
# See nginx configuration below

# View logs
pm2 logs sopres-api

# Monitor
pm2 monit

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

#### Using Node directly

```bash
# Start API
cd api && node dist/server.js

# Or with tsx (development)
cd api && npx tsx src/server.ts
```

### 5. Nginx Configuration

Create `/etc/nginx/sites-available/sopres`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Admin Panel (Static Files)
    root /var/www/sopres/admin/dist;
    index index.html;

    # Client max body size
    client_max_body_size 100M;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Admin routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/sopres /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. SSL with Let's Encrypt

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

---

## ✅ Production Checklist

### Before Deployment

- [ ] Change all default passwords and secrets
- [ ] Configure environment variables
- [ ] Set up database backups
- [ ] Configure log rotation
- [ ] Set up monitoring/alerting
- [ ] Test health check endpoints
- [ ] Run security audit (`npm audit`)
- [ ] Test migrations on staging
- [ ] Review CORS settings
- [ ] Configure rate limiting
- [ ] Set up SSL certificates
- [ ] Configure firewall rules

### Security Checklist

- [ ] Use HTTPS in production
- [ ] Enable security headers (CSP, HSTS, etc.)
- [ ] Configure CORS properly
- [ ] Use strong JWT secrets (64+ characters)
- [ ] Enable rate limiting
- [ ] Validate all user inputs
- [ ] Use prepared statements (Prisma does this)
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Disable debug mode in production
- [ ] Configure file upload limits
- [ ] Set up IP whitelisting (if needed)

---

## 🏥 Health Checks

soPres provides multiple health check endpoints:

### 1. Basic Health Check

```bash
curl http://localhost:3000/health
```

Response:

```json
{
  "status": "ok",
  "timestamp": "2025-11-26T10:00:00.000Z"
}
```

### 2. Liveness Probe

```bash
curl http://localhost:3000/health/live
```

Checks if the application is alive and responsive.

### 3. Readiness Probe

```bash
curl http://localhost:3000/health/ready
```

Checks if the application is ready to accept traffic (DB connected, etc.).

### 4. Detailed Health Check

```bash
curl http://localhost:3000/health/detailed
```

Response:

```json
{
  "status": "healthy",
  "checks": {
    "database": {
      "status": "up",
      "responseTime": "OK"
    },
    "memory": {
      "status": "ok",
      "heapUsed": "45 MB",
      "heapTotal": "128 MB",
      "percentage": "35%"
    },
    "process": {
      "uptime": "3600 seconds",
      "nodeVersion": "v18.19.0",
      "pid": 1234
    }
  },
  "timestamp": "2025-11-26T10:00:00.000Z"
}
```

### Kubernetes Health Check Configuration

```yaml
livenessProbe:
  httpGet:
    path: /health/live
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health/ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

---

## 🔍 Monitoring

### System Stats Endpoint

```bash
curl http://localhost:3000/api/v1/system/stats
```

Response:

```json
{
  "success": true,
  "data": {
    "users": 10,
    "pages": 50,
    "media": 100,
    "patterns": 15
  }
}
```

### Log Locations

- **Application Logs:** `./logs/app.log`
- **Error Logs:** `./logs/error.log`
- **Access Logs:** Nginx access log

### Recommended Monitoring Tools

- **Application:** PM2, Docker stats
- **Server:** Prometheus + Grafana
- **Logs:** ELK Stack, Loki
- **Uptime:** UptimeRobot, Pingdom
- **Errors:** Sentry

---

## 🐛 Troubleshooting

### Application Won't Start

1. Check environment variables:

   ```bash
   printenv | grep -E "(DATABASE_URL|JWT_SECRET|NODE_ENV)"
   ```

2. Check database connection:

   ```bash
   npx prisma db pull
   ```

3. Check port availability:
   ```bash
   lsof -i :3000
   ```

### Database Connection Failed

1. Verify DATABASE_URL format
2. Check database is running
3. Test connection manually:
   ```bash
   npx prisma studio
   ```

### High Memory Usage

1. Check for memory leaks:

   ```bash
   curl http://localhost:3000/health/detailed
   ```

2. Restart application:
   ```bash
   pm2 restart sopres-api
   # or
   docker-compose restart api
   ```

### Permission Denied Errors

1. Check file permissions:

   ```bash
   chmod -R 755 /path/to/sopres
   ```

2. Check user running the process
3. Check volume mounts (Docker)

### Build Failures

1. Clear node_modules and reinstall:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Check Node version:

   ```bash
   node --version  # Should be 18+
   ```

3. Clear build cache:
   ```bash
   rm -rf dist .turbo
   ```

---

## 📊 Performance Optimization

### Database

- Enable connection pooling
- Add database indexes
- Use query optimization
- Enable query logging (development only)

### API

- Enable compression (gzip)
- Use caching headers
- Optimize image serving
- Enable HTTP/2

### Static Files

- Use CDN for static assets
- Enable browser caching
- Minify CSS/JS
- Optimize images

---

## 🔄 Updates & Maintenance

### Updating Application

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Run migrations
npx prisma migrate deploy

# Rebuild
npm run build

# Restart (PM2)
pm2 restart sopres-api

# Or restart (Docker)
docker-compose -f docker-compose.prod.yml up -d --build
```

### Database Backups

```bash
# SQLite backup
cp prisma/prod.db prisma/prod.db.backup-$(date +%Y%m%d)

# PostgreSQL backup
pg_dump sopres > backup-$(date +%Y%m%d).sql

# Restore
psql sopres < backup-20251126.sql
```

---

## 🆘 Support

For deployment issues:

1. Check logs first
2. Review health check endpoints
3. Consult troubleshooting section
4. Open GitHub issue with details

---

## 📚 Additional Resources

- [Docker Documentation](./DOCKER_GUIDE.md)
- [API Documentation](./api/)
- [Monitoring Guide](./MONITORING_GUIDE.md)
- [Backup & Restore](./BACKUP_RESTORE.md)
