# Database Setup Guide for soPres

You need PostgreSQL to run the migrations. Here are your options:

## Option 1: Install Docker and Docker Compose (Recommended)

```bash
# Install Docker
sudo apt update
sudo apt install docker.io docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (logout/login required after this)
sudo usermod -aG docker $USER

# Start the databases
docker-compose -f docker-compose.dev.yml up -d

# Run migrations
npm run db:migrate
npm run db:seed
```

## Option 2: Install PostgreSQL Locally

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql << EOF
CREATE USER sopres WITH PASSWORD 'sopres';
CREATE DATABASE sopres OWNER sopres;
GRANT ALL PRIVILEGES ON DATABASE sopres TO sopres;
EOF

# Run migrations
npm run db:migrate
npm run db:seed
```

## Option 3: Use SQLite (Quick Testing)

If you just want to test quickly without PostgreSQL, you can temporarily use SQLite:

1. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. Update `.env`:

```
DATABASE_URL="file:./prisma/dev.db"
```

3. Run migrations:

```bash
npm run db:migrate
npm run db:seed
```

**Note**: SQLite is only for quick testing. For production, use PostgreSQL.

## Verify Database Connection

After setting up the database, verify the connection:

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Or for Docker
docker-compose -f docker-compose.dev.yml ps

# Test connection with Prisma
npx prisma db pull
```

## Automatic Database Switching

soPres includes a helper script to easily switch between SQLite and PostgreSQL, which handles:

1. Updating `prisma/schema.prisma` provider
2. Toggling field types (`String` vs `Json`)
3. Creating a backup of your schema

To switch providers:

```bash
# Switch to PostgreSQL
npm run db:switch postgres

# Switch to SQLite
npm run db:switch sqlite
```

After running the switch command, update your `.env` file with the appropriate `DATABASE_URL` and run migrations.

## Next Steps

Once the database is running:

1. Run migrations: `npm run db:migrate`
2. Seed data: `npm run db:seed`
3. Start API: `npm run dev`
4. Test: `curl http://localhost:3000/health`
