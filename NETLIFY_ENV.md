# Netlify Environment Variables Guide

## Required Environment Variables

Add these environment variables in your Netlify dashboard:
Site Settings > Environment Variables

### Database Configuration

```
DATABASE_URL=your_database_connection_string
```

## Database Options for Production

### Option 1: Neon (Recommended - Free PostgreSQL)
1. Sign up at https://neon.tech
2. Create a new project
3. Get your connection string
4. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Run: `npx prisma db push`

Example DATABASE_URL:
```
postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
```

### Option 2: PlanetScale (Free MySQL)
1. Sign up at https://planetscale.com
2. Create a database
3. Get connection string
4. Update schema to use MySQL:
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
     relationMode = "prisma"
   }
   ```

Example DATABASE_URL:
```
mysql://user:password@aws.connect.psdb.cloud/dbname?sslaccept=strict
```

### Option 3: Supabase (Free PostgreSQL)
1. Sign up at https://supabase.com
2. Create a project
3. Get connection string from Settings > Database
4. Use PostgreSQL provider in schema

Example DATABASE_URL:
```
postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
```

### Option 4: Railway (PostgreSQL)
1. Sign up at https://railway.app
2. Create a PostgreSQL database
3. Get connection string

## After Setting Up Database

1. Update your DATABASE_URL in Netlify
2. Run migrations:
   ```bash
   npx prisma db push
   ```
   or
   ```bash
   npx prisma migrate deploy
   ```

3. Redeploy your site on Netlify

## Testing Locally with Production Database

To test with production database locally:

1. Create `.env.production.local`:
   ```
   DATABASE_URL=your_production_database_url
   ```

2. Run:
   ```bash
   npx prisma db push
   npm run build
   npm start
   ```

## Important Notes

- Never commit `.env` files to Git
- Always use `.env.example` for documentation
- SQLite doesn't work on Netlify (use PostgreSQL or MySQL)
- Make sure to run database migrations before deploying
