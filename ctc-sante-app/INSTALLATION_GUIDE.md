# 🚀 CTC Santé - Installation & Setup Guide

Complete step-by-step guide to get CTC Santé running locally and on production.

---

## ⚡ Quick Start (5 minutes)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ running
- Git

### Steps

```bash
# 1. Clone repo
git clone <your-repo-url> ctc-sante
cd ctc-sante

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL and other secrets

# 4. Setup database
npx prisma migrate dev --name init
npx prisma db seed

# 5. Start development server
npm run dev

# 6. Open browser
# http://localhost:3000
```

**Test Login:**
- Email: `admin@ctc-sante.test`
- Password: `password123`

---

## 📦 Detailed Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/ctc-sante.git
cd ctc-sante
```

### 2. Install Node Dependencies

```bash
npm install
# or
yarn install
```

Check Node version:
```bash
node --version  # Should be 18+
npm --version   # Should be 8+
```

### 3. Setup PostgreSQL

**Option A: Local PostgreSQL**

```bash
# macOS
brew install postgresql
brew services start postgresql

# Create database
createdb ctc_sante

# Verify
psql -l | grep ctc_sante
```

**Option B: Docker**

```bash
docker run --name ctc-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ctc_sante \
  -p 5432:5432 \
  -d postgres:14
```

**Option C: Cloud Database**

Use [Supabase](https://supabase.com), [Railway](https://railway.app), or [Render](https://render.com):
1. Create new project
2. Copy connection string
3. Add to `.env.local`

### 4. Environment Configuration

Create `.env.local`:

```bash
cp .env.example .env.local
```

Edit with your values:

```env
# Database (required)
DATABASE_URL="postgresql://user:password@localhost:5432/ctc_sante"

# NextAuth (required)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Stripe (required for subscription features)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_test_xxx"

# Optional
NODE_ENV="development"
```

**Get Stripe Keys:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to "Developers" → "API Keys"
3. Copy test keys
4. Paste in `.env.local`

**Generate NextAuth Secret:**

```bash
openssl rand -base64 32
# Paste output into NEXTAUTH_SECRET
```

### 5. Database Schema

Initialize Prisma:

```bash
# Generate Prisma client
npx prisma generate

# Create tables
npx prisma migrate dev --name init
# This will:
# - Create schema based on prisma/schema.prisma
# - Generate Prisma client
# - Run migrations

# Seed test data
npx prisma db seed
```

Verify in Prisma Studio:

```bash
npx prisma studio
# Opens: http://localhost:5555
```

### 6. Start Development Server

```bash
npm run dev
# Server: http://localhost:3000
```

In another terminal, optionally watch database:

```bash
npx prisma studio
```

### 7. Test the App

#### Admin Portal
```
Email: admin@ctc-sante.test
Password: password123
URL: http://localhost:3000/admin
```

#### Taxi Portal
```
Email: taxi1@test.fr
Password: password123
URL: http://localhost:3000/taxi
Status: APPROVED + ACTIVE subscription
```

#### Facility Portal
```
Email: hopital@test.fr
Password: password123
URL: http://localhost:3000/etablissement
Status: APPROVED
```

---

## 🔧 Configuration Details

### Database Connection

The app uses Prisma with PostgreSQL. Connection string format:

```
postgresql://[user[:password]@][netloc][:port][/dbname]
```

Examples:
```env
# Local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ctc_sante"

# Supabase
DATABASE_URL="postgresql://postgres:password@db.abcdefg.supabase.co:5432/postgres"

# Railway
DATABASE_URL="postgresql://user:pass@container.railway.app:5432/railway"
```

### Authentication

NextAuth.js configured with:
- **Provider:** Credentials (email + password)
- **Session:** JWT-based
- **Duration:** 30 days
- **Pages:**
  - Login: `/auth/login`
  - Register: `/auth/register`

### API Keys & Secrets

Critical variables:

| Variable | Where to Get | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` | ✅ Yes |
| `NEXTAUTH_URL` | Your app URL | ✅ Yes |
| `STRIPE_SECRET_KEY` | Stripe Dashboard | ✅ Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard | ✅ Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhooks | ⏳ For webhooks |

---

## 📂 Project Structure

```
ctc-sante/
├── app/
│   ├── (auth)/             # Login, Register pages
│   ├── (portal)/           # Portals (admin, taxi, facility)
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing
├── components/             # Reusable React components
├── lib/                    # Utilities (auth, db, dispatch, etc)
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Test data
├── public/                 # Static assets
├── types.ts                # TypeScript types
├── tailwind.config.ts      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
├── package.json
└── .env.local              # Environment variables (DO NOT COMMIT)
```

---

## 🚀 Development Workflows

### Create New Feature

```bash
# 1. Create branch
git checkout -b feature/new-feature

# 2. Make changes
# Edit files, add components, etc.

# 3. If you need database changes:
npx prisma migrate dev --name add_new_field

# 4. Test locally
npm run dev

# 5. Format & lint
npm run format
npm run lint

# 6. Commit
git add .
git commit -m "feat: add new feature"

# 7. Push
git push origin feature/new-feature

# 8. Open PR on GitHub
```

### Modify Database Schema

```bash
# 1. Edit prisma/schema.prisma

# 2. Create migration
npx prisma migrate dev --name descriptive_name

# 3. Test with Prisma Studio
npx prisma studio

# 4. Commit migration files
git add prisma/migrations/
git commit -m "chore: db migration"
```

### Debug Issues

```bash
# Check database connection
npm run dev -- --debug

# Inspect database
npx prisma studio

# View all users
npx prisma db execute --stdin
# Type: SELECT * FROM "User";

# View logs
cat .next/logs/server.log
```

---

## 🐳 Docker Setup (Optional)

### Build & Run with Docker

```bash
# 1. Build image
docker build -t ctc-sante .

# 2. Create .env file
cat > .env << EOF
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/ctc_sante"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
STRIPE_SECRET_KEY="sk_test_xxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
EOF

# 3. Run with docker-compose
docker-compose up

# 4. Open http://localhost:3000
```

### Docker Compose File

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: ctc_sante
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/ctc_sante"
      NEXTAUTH_URL: "http://localhost:3000"
      NEXTAUTH_SECRET: "your-secret"
      STRIPE_SECRET_KEY: "sk_test_xxx"
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "pk_test_xxx"
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    command: sh -c "npx prisma migrate deploy && npm run start"

volumes:
  postgres_data:
```

---

## 🌐 Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free)
- Environment variables ready

### Steps

1. **Push to GitHub**
```bash
git remote add origin https://github.com/yourusername/ctc-sante.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import GitHub repository
- Select `ctc-sante`

3. **Add Environment Variables**
In Vercel dashboard → Settings → Environment Variables:

```
DATABASE_URL = <your PostgreSQL URL>
NEXTAUTH_URL = https://your-app.vercel.app
NEXTAUTH_SECRET = <from .env.local>
STRIPE_SECRET_KEY = sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_xxx
STRIPE_WEBHOOK_SECRET = whsec_xxx
```

4. **Deploy**
- Click "Deploy"
- Wait for build to complete

5. **Run Migrations**
```bash
# Pull environment
vercel env pull

# Run migrations on production
npx prisma migrate deploy

# Seed production (careful!)
npx prisma db seed --preview
```

6. **Test**
Visit `https://your-app.vercel.app`

### Rollback
```bash
# Revert to previous deployment
vercel rollback
```

---

## 🔒 Production Checklist

- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Database URL uses production DB
- [ ] Stripe live keys configured
- [ ] NextAuth secret is secure (32+ chars)
- [ ] NEXTAUTH_URL points to production domain
- [ ] Email notifications configured
- [ ] Error logging setup (Sentry/Rollbar)
- [ ] Database migrations tested
- [ ] Admin account created
- [ ] SSL certificates valid
- [ ] Firewall rules setup
- [ ] Rate limiting enabled
- [ ] Backups automated

---

## ⚠️ Common Issues & Solutions

### "Cannot find module '@prisma/client'"
```bash
npm install
npx prisma generate
```

### "Database connection timeout"
- Check `DATABASE_URL` is correct
- Verify PostgreSQL is running
- Check firewall rules allow connection
```bash
psql $DATABASE_URL  # Test connection
```

### "NEXTAUTH_SECRET is not set"
```bash
# Generate and add to .env.local
openssl rand -base64 32
```

### Port 3000 already in use
```bash
# Kill process
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Geolocation failing
- Nominatim rate limit: max 1 req/sec
- Add delay in `lib/geolocation.ts`:
```typescript
await new Promise(r => setTimeout(r, 1100));
```

### Stripe webhooks not working
- Check `STRIPE_WEBHOOK_SECRET` is set
- Verify endpoint URL in Stripe dashboard
- Enable "Require valid HTTPS" in Stripe settings

---

## 📞 Getting Help

1. **Documentation:** See [README.md](./README.md)
2. **API Docs:** Comments in `app/api/**`
3. **Issues:** GitHub Issues
4. **Discord:** Join community server
5. **Email:** support@ctc-sante.fr

---

## ✅ Next Steps After Setup

1. ✅ Customize branding (colors, logo)
2. ✅ Configure Stripe products/pricing
3. ✅ Setup email notifications (SendGrid/AWS SES)
4. ✅ Create admin user accounts
5. ✅ Test all workflows
6. ✅ Setup monitoring (Sentry/DataDog)
7. ✅ Enable backups
8. ✅ Deploy to production

---

**Happy coding! 🎉**
