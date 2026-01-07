# Deployment Guide

This guide covers deploying your soPres Next.js application to various platforms.

## Prerequisites

- A soPres backend instance accessible via HTTPS
- Environment variables configured
- Your application built and tested locally

## Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

### Deploy via GitHub

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   Add these in Vercel project settings:

   ```
   NEXT_PUBLIC_VITECMS_API_URL=https://your-api.example.com
   NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Netlify

### Deploy via GitHub

1. **Push to GitHub** (same as Vercel)

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: Leave empty

4. **Environment Variables**
   Add in Netlify site settings:

   ```
   NEXT_PUBLIC_VITECMS_API_URL=https://your-api.example.com
   NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
   ```

5. **Add Next.js Runtime**
   Create `netlify.toml`:

   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

6. **Deploy**
   Netlify will build and deploy automatically

## Docker

Perfect for self-hosting or cloud platforms.

### 1. Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Update next.config.js

```javascript
const nextConfig = {
  output: "standalone",
  // ... other config
};
```

### 3. Build and Run

```bash
# Build image
docker build -t vitecms-nextjs .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_VITECMS_API_URL=https://your-api.example.com \
  -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  vitecms-nextjs
```

### 4. Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_VITECMS_API_URL=https://your-api.example.com
      - NEXT_PUBLIC_SITE_URL=https://your-domain.com
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## AWS (EC2 + PM2)

### 1. Connect to EC2

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 2. Install Dependencies

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### 3. Deploy Application

```bash
# Clone repository
git clone https://github.com/username/repo.git
cd repo

# Install dependencies
npm ci

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_VITECMS_API_URL=https://your-api.example.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
EOF

# Build
npm run build

# Start with PM2
pm2 start npm --name "vitecms-nextjs" -- start

# Save PM2 config
pm2 save
pm2 startup
```

### 4. Setup Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/vitecms
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/vitecms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Setup SSL with Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Variables Checklist

Before deploying, ensure these variables are set:

- ✅ `NEXT_PUBLIC_VITECMS_API_URL` (required)
- ✅ `NEXT_PUBLIC_SITE_URL` (recommended for SEO)
- ⚪ `VITECMS_ACCESS_TOKEN` (optional, for authenticated requests)
- ⚪ `VITECMS_REFRESH_TOKEN` (optional)
- ⚪ `REVALIDATE_*` (optional, custom revalidation times)

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Check `/sitemap.xml` is accessible
- [ ] Check `/feed.xml` is accessible
- [ ] Verify SEO meta tags with [metatags.io](https://metatags.io)
- [ ] Test performance with Lighthouse
- [ ] Configure custom domain (if needed)
- [ ] Setup analytics (Google Analytics, Plausible, etc.)
- [ ] Configure error monitoring (Sentry, etc.)

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_VITECMS_API_URL: ${{ secrets.VITECMS_API_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Monitoring

### Performance Monitoring

- [Vercel Analytics](https://vercel.com/analytics)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

### Error Tracking

```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs
```

### Uptime Monitoring

- [UptimeRobot](https://uptimerobot.com/)
- [Pingdom](https://www.pingdom.com/)
- [StatusCake](https://www.statuscake.com/)

## Troubleshooting

### Build Fails on Platform

**Solution:** Ensure all environment variables are set correctly

### Pages Not Updating

**Solution:** Check revalidation settings and ISR cache

### API Connection Errors

**Solution:** Verify CORS settings on soPres backend

### 404 on Dynamic Routes

**Solution:** Ensure `generateStaticParams` is implemented correctly

## Support

Need help with deployment? Contact us:

- 📧 Email: support@sopres.dev
- 💬 Discord: [Join our community](https://discord.gg/vitecms)
