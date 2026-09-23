# 📂 CTC Santé - Complete Files Guide

This document maps all generated files and their purposes.

---

## 📦 Project Files (Provided)

### Core Configuration

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies & scripts |
| `tsconfig.json` | TypeScript compiler options |
| `tailwind.config.ts` | Tailwind CSS + CTC colors |
| `next.config.js` | Next.js configuration |
| `postcss.config.js` | PostCSS plugins (Tailwind) |
| `.env.example` | Environment variables template |

### Database & ORM

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Complete database schema |
| `prisma/seed.ts` | Test data seeding |
| `prisma/migrations/*` | Database migration files |

### Types

| File | Purpose |
|------|---------|
| `types.ts` | Shared TypeScript enums & interfaces |

### Library / Utilities

| File | Purpose | Key Functions |
|------|---------|---|
| `lib/auth.ts` | NextAuth.js configuration | `handlers`, `auth`, `signIn`, `signOut`, `hashPassword`, `verifyPassword` |
| `lib/prisma.ts` | Prisma client singleton | `prisma` instance |
| `lib/dispatch.ts` | Auto-dispatch logic | `dispatchNearestTaxi()`, `calculateDistance()`, `manualDispatch()` |
| `lib/geolocation.ts` | Nominatim API client | `geolocation.geocode()`, `reverseGeocode()` |
| `lib/stripe.ts` | Stripe integration | `createSubscriptionCheckout()`, `handleCheckoutCompleted()` |
| `lib/rbac.ts` | Role-based access control | `requireAuth()`, `requireRole()`, `requireApproved()`, `requireActiveSubscription()` |

### API Routes (Examples Provided)

| Path | Method | Purpose | Auth |
|------|--------|---------|------|
| `api/auth/register` | POST | User registration | None |
| `api/auth/login` | POST | User login | None |
| `api/auth/logout` | POST | User logout | Required |
| `api/auth/session` | GET | Get current session | Required |
| `api/trips` | POST | Create trip | ÉTABLISSEMENT |
| `api/trips` | GET | List trips (filtered by role) | Required |
| `api/trips/[id]` | PATCH | Update trip | TAXI/ADMIN |
| `api/locations` | PATCH | Update taxi location | TAXI |
| `api/locations` | GET | Get taxi locations | ADMIN/ÉTABLISSEMENT |
| `api/dispatch` | POST | Manual dispatch | ADMIN |
| `api/subscriptions/checkout` | POST | Create Stripe session | TAXI |
| `api/subscriptions/status` | GET | Check subscription | TAXI |
| `api/subscriptions/activate` | POST | Activate (admin) | ADMIN |
| `api/webhooks/stripe` | POST | Stripe webhook | Public |
| `api/admin/users` | GET | List users | ADMIN |
| `api/admin/users/[id]` | PATCH | Update user | ADMIN |
| `api/admin/dashboard` | GET | Dashboard stats | ADMIN |
| `api/admin/calendar` | GET | Calendar data | ADMIN |

### Components (Examples Provided)

| Component | Purpose |
|-----------|---------|
| `components/common/Map.tsx` | Leaflet map with taxi markers |
| `components/common/Calendar.tsx` | Trip calendar (month/week) |
| `components/common/TripCard.tsx` | Trip display card |
| `components/common/Loading.tsx` | Loading spinner |
| `components/common/Error.tsx` | Error message display |

### Pages (Examples Provided)

| Page | Purpose | Role |
|------|---------|------|
| `app/(auth)/login/page.tsx` | Login form | Public |
| `app/(auth)/register/page.tsx` | Multi-role registration | Public |
| `app/(portal)/admin/page.tsx` | Admin dashboard | ADMIN |
| `app/(portal)/taxi/page.tsx` | Taxi dashboard | TAXI |
| `app/(portal)/etablissement/page.tsx` | Facility dashboard | ÉTABLISSEMENT |
| `app/page.tsx` | Landing/redirect | Public |

### Documentation

| File | Content |
|------|---------|
| `README.md` | Main documentation & overview |
| `INSTALLATION_GUIDE.md` | Step-by-step setup guide |
| `FILES_GUIDE.md` | This file |
| `DEPLOYMENT.md` | Production deployment guide |
| `API_REFERENCE.md` | Complete API documentation |

---

## 🛠️ File Implementation Checklist

### Provided Files (Ready to Use)

✅ Configuration Files
- [x] `package.json` - NPM configuration
- [x] `tsconfig.json` - TypeScript config
- [x] `tailwind.config.ts` - CSS with CTC colors
- [x] `next.config.js` - Next.js setup
- [x] `.env.example` - Environment template

✅ Database
- [x] `prisma/schema.prisma` - Full schema
- [x] `prisma/seed.ts` - Test data
- [x] Types and enums in `types.ts`

✅ Core Libraries
- [x] `lib/auth.ts` - NextAuth.js config
- [x] `lib/prisma.ts` - Prisma client
- [x] `lib/dispatch.ts` - Auto-dispatch
- [x] `lib/geolocation.ts` - Nominatim API
- [x] `lib/stripe.ts` - Stripe client
- [x] `lib/rbac.ts` - Access control

✅ API Examples
- [x] `api/auth/register` - Registration
- [x] `api/trips` - Trip CRUD
- [x] `api/locations` - GPS updates
- [x] `api/subscriptions` - Payments
- [x] `api/admin/*` - Admin routes

✅ Components
- [x] `Map.tsx` - Leaflet component
- [x] `Calendar.tsx` - Trip calendar
- [x] Sample pages for each role

✅ Documentation
- [x] `README.md` - Main docs
- [x] `INSTALLATION_GUIDE.md` - Setup
- [x] `FILES_GUIDE.md` - This guide

### Additional Implementation (To Complete)

⏳ Pages to Create (folder structure provided)
- [ ] `app/(auth)/login/page.tsx` - Copy example from provided file
- [ ] `app/(auth)/register/page.tsx` - Multi-role form
- [ ] `app/(portal)/admin/users/page.tsx` - User management table
- [ ] `app/(portal)/admin/trips/page.tsx` - All trips with filters
- [ ] `app/(portal)/admin/map/page.tsx` - Real-time taxi map
- [ ] `app/(portal)/admin/calendar/page.tsx` - Calendar view
- [ ] `app/(portal)/taxi/trips/page.tsx` - My trips list
- [ ] `app/(portal)/taxi/trips/[id]/page.tsx` - Trip detail + actions
- [ ] `app/(portal)/taxi/location/page.tsx` - GPS tracking UI
- [ ] `app/(portal)/taxi/subscription/page.tsx` - Payment page
- [ ] `app/(portal)/etablissement/new-trip/page.tsx` - Create trip form
- [ ] `app/(portal)/etablissement/trips/page.tsx` - My trips
- [ ] `app/(portal)/layout.tsx` - Portal navbar + sidebar
- [ ] `app/layout.tsx` - Root layout

⏳ Components to Create
- [ ] `components/auth/LoginForm.tsx`
- [ ] `components/auth/RegisterForm.tsx`
- [ ] `components/portal/Navbar.tsx`
- [ ] `components/portal/Sidebar.tsx`
- [ ] `components/common/TripForm.tsx` - Trip creation/edit
- [ ] `components/common/SubscriptionCard.tsx` - Status widget
- [ ] `components/admin/UserValidationList.tsx`
- [ ] `components/admin/TaxiReassignModal.tsx`
- [ ] `components/taxi/NavigationButtons.tsx` - Maps/Waze links
- [ ] `components/facility/NewTripForm.tsx`

⏳ API Routes to Create (directory structure provided)
- [ ] Complete all routes listed in API section
- [ ] Add error handling & validation
- [ ] Add logging & monitoring
- [ ] Setup webhook verification for Stripe

⏳ Tests
- [ ] `__tests__/api/trips.test.ts`
- [ ] `__tests__/lib/dispatch.test.ts`
- [ ] `__tests__/components/Map.test.tsx`
- [ ] `__tests__/e2e/taxi-workflow.test.ts`

⏳ Docker & Deployment
- [ ] `Dockerfile` - Container image
- [ ] `docker-compose.yml` - Local dev
- [ ] `.dockerignore` - Docker build exclusions
- [ ] `.github/workflows/ci.yml` - CI/CD pipeline
- [ ] `vercel.json` - Vercel configuration (optional)

---

## 📋 File Organization by Feature

### Authentication Flow
```
1. app/(auth)/register/page.tsx    # User signs up
2. lib/auth.ts                     # NextAuth config
3. api/auth/register               # Register endpoint
4. prisma/schema.prisma            # User model
5. app/(auth)/login/page.tsx       # User logs in
6. api/auth/login                  # Login endpoint
7. app/(portal)/layout.tsx         # Protected redirect
```

### Trip Creation Flow (Facility)
```
1. app/(portal)/etablissement/new-trip/page.tsx
2. components/common/TripForm.tsx
3. api/trips [POST]
4. lib/dispatch.ts                 # Auto-dispatch triggered
5. lib/geolocation.ts              # Geocoding
6. app/(portal)/taxi/page.tsx      # Taxi notified
```

### Real-time Map (Admin)
```
1. app/(portal)/admin/map/page.tsx
2. components/common/Map.tsx       # Leaflet component
3. api/locations [GET]             # Get taxi positions
4. useEffect polling (10s)          # Refresh loop
5. L.marker + L.popup              # Display markers
```

### Subscription Payment (Taxi)
```
1. app/(portal)/taxi/subscription/page.tsx
2. components/common/SubscriptionCard.tsx
3. api/subscriptions/checkout [POST]  # Create session
4. lib/stripe.ts                   # Stripe checkout
5. Stripe Checkout UI              # Payment form
6. api/webhooks/stripe [POST]      # Webhook confirmation
7. prisma update subscriptionStatus
```

---

## 🔄 Data Flow Examples

### Trip Creation & Auto-Dispatch

```
User fills trip form
    ↓
POST /api/trips (ÉTABLISSEMENT auth)
    ↓
validateData (Zod schema)
    ↓
Create Patient record (or find existing)
    ↓
Create Trip (status=NEW)
    ↓
Background: dispatchNearestTaxi(tripId)
    ├→ fetch Trip details
    ├→ geocode pickupAddress
    ├→ findMany eligible taxis (APPROVED + ACTIVE + GPS known)
    ├→ calculate haversine distance
    ├→ find min distance taxi
    └→ update Trip → status=ASSIGNED, taxiUserId=xxx
    
Taxi receives notification
    ↓
Taxi accepts/rejects (Update status → ASSIGNED/CANCELLED)
    ↓
Taxi → EN_ROUTE (navigate to pickup)
    ↓
Taxi → DONE (complete trip)
    ↓
nextApptAt field updated
```

### Taxi Location Polling

```
Taxi App (useEffect every 15s)
    ↓
getCurrentPosition() [Browser GPS]
    ↓
PATCH /api/locations
    ├→ { lat, lng, isAvailable }
    └→ Update TaxiProfile.lastLat/Lng
    
Admin Dashboard (Map component)
    ↓
useEffect polling 10s
    ↓
GET /api/locations
    ├→ Fetch all approved taxis
    ├→ Include lastLat, lastLng, currentTrip
    └→ Return array
    
Leaflet Map re-renders
    ├→ Clear old markers
    ├→ Add new markers at fresh coords
    └→ Show status badge
```

---

## 🔗 File Dependencies

### Critical Dependencies (Do Not Delete)

```
types.ts
  ← used by: lib/*.ts, app/api/**, components/**
  
lib/auth.ts
  ← used by: app/api/** (all protected routes)
  
lib/prisma.ts
  ← used by: lib/*.ts, app/api/**
  
lib/rbac.ts
  ← used by: app/api/** (middleware)

prisma/schema.prisma
  ← used by: prisma generate → @prisma/client
  
tailwind.config.ts
  ← used by: Next.js build (CSS)
```

### Optional Dependencies

```
lib/stripe.ts
  ← only: api/subscriptions/**, api/webhooks/stripe

lib/dispatch.ts
  ← only: api/trips (auto-dispatch trigger)

lib/geolocation.ts
  ← only: lib/dispatch.ts (geocoding)

components/common/Map.tsx
  ← only: app/(portal)/admin/map/page.tsx
```

---

## 🚀 Quick File Reference

**Need to...** | **Edit file**
---|---
Add new env var | `.env.local`, `.env.example`
Change database schema | `prisma/schema.prisma`, then migrate
Create new API endpoint | `app/api/[path]/route.ts`
Add new page | `app/[path]/page.tsx`
Add component | `components/[category]/Name.tsx`
Change colors | `tailwind.config.ts`
Fix auth issues | `lib/auth.ts`
Debug database | `npx prisma studio`
Test locally | `npm run dev` + `npx prisma db seed`

---

## 📊 File Statistics

| Category | Count | Provided |
|----------|-------|----------|
| Configuration | 5 | ✅ 5 |
| Database | 3 | ✅ 3 |
| Types | 1 | ✅ 1 |
| Libraries | 6 | ✅ 6 |
| API Routes | 15+ | 🟡 Examples |
| Components | 10+ | 🟡 Examples |
| Pages | 15+ | 🟡 Examples |
| Tests | 5+ | ⏳ Not included |
| Docs | 3 | ✅ 3 |

**Total lines of code (provided):** ~3,000+
**Implementation time:** 2-4 hours (using examples as templates)

---

## 💾 Saving & Organizing

All files have been created in the scratchpad directory:

```
/tmp/claude-0/.../scratchpad/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── env-example
├── types.ts
├── README.md
├── INSTALLATION_GUIDE.md
├── FILES_GUIDE.md
├── lib-auth.ts → lib/auth.ts
├── lib-prisma.ts → lib/prisma.ts
├── lib-dispatch.ts → lib/dispatch.ts
├── lib-geolocation.ts → lib/geolocation.ts
├── lib-stripe.ts → lib/stripe.ts
├── lib-rbac.ts → lib/rbac.ts
├── prisma-schema.prisma → prisma/schema.prisma
├── prisma-seed.ts → prisma/seed.ts
├── types.ts
├── components-Map.tsx → components/common/Map.tsx
├── components-Calendar.tsx → components/common/Calendar.tsx
├── page-taxi-dashboard.tsx → app/(portal)/taxi/page.tsx
├── api-auth-register.ts → app/api/auth/register/route.ts
├── api-trips.ts → app/api/trips/route.ts
├── api-locations.ts → app/api/locations/route.ts
├── api-subscriptions.ts → app/api/subscriptions/route.ts
├── api-admin.ts → app/api/admin/**/route.ts
└── ... more files
```

All files are ready to download and integrate into your project!

---

**Happy building! 🚕✨**
