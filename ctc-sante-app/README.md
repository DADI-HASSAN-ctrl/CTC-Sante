# 🚕 CTC Santé – Centrale Taxi Conventionné

**Application full-stack de gestion de courses sanitaires avec dispatch automatique, système d'abonnement, et portails multi-rôles.**

Branding officiel avec les couleurs du logo CTC Santé :
- **Bleu turquoise primaire:** `#3A8B8B`
- **Bleu foncé secondaire:** `#2C4A5E`
- **Jaune taxi accent:** `#C9A854`

---

## 🚀 Stack Technique

| Composant | Technologie |
|-----------|------------|
| **Frontend** | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| **Backend** | API Routes Next.js |
| **Base de données** | PostgreSQL 14+ |
| **ORM** | Prisma |
| **Authentification** | NextAuth.js v5 + JWT |
| **Paiement** | Stripe Checkout (SDK ready) |
| **Cartes** | Leaflet + OpenStreetMap |
| **Déploiement** | Vercel / Docker |

---

## 📋 Prérequis

- **Node.js:** 18+ (recommandé 20 LTS)
- **PostgreSQL:** 14+ en local ou cloud (Supabase, Railway, etc.)
- **Git** et **npm**
- **Compte Stripe** (free tier suffit)
- **Compte Vercel** (pour déploiement, optionnel)

---

## 🏗️ Installation locale

### 1️⃣ Cloner et installer

```bash
# Cloner le repo
git clone <repo-url> ctc-sante
cd ctc-sante

# Installer dépendances
npm install
```

### 2️⃣ Configurer la base de données

**Option A : PostgreSQL local**

```bash
# Démarrer PostgreSQL
# Sur macOS avec Homebrew
brew services start postgresql
createdb ctc_sante

# Ou directement :
psql -U postgres -c "CREATE DATABASE ctc_sante;"
```

**Option B : Cloud (recommandé pour dev)**

- Créer un projet sur [Supabase](https://supabase.com) ou [Railway](https://railway.app)
- Copier la connection string PostgreSQL

### 3️⃣ Variables d'environnement

Créer `.env.local` à la racine du projet :

```env
# ╔═══════════════════════════════════════════╗
# ║          DATABASE                          ║
# ╚═══════════════════════════════════════════╝
DATABASE_URL="postgresql://user:password@localhost:5432/ctc_sante"

# Pour Supabase :
# DATABASE_URL="postgresql://postgres:password@db.projectid.supabase.co:5432/postgres"

# ╔═══════════════════════════════════════════╗
# ║          NEXTAUTH CONFIGURATION            ║
# ╚═══════════════════════════════════════════╝
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
# Ou utiliser une clé prédéfinie :
# NEXTAUTH_SECRET="your-secret-here-at-least-32-chars"

# ╔═══════════════════════════════════════════╗
# ║          STRIPE (TEST MODE)                ║
# ╚═══════════════════════════════════════════╝
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key_here"
STRIPE_SECRET_KEY="sk_test_your_key_here"
STRIPE_WEBHOOK_SECRET="whsec_test_your_secret_here"

# Obtenir les clés sur : https://dashboard.stripe.com/test/apikeys

# ╔═══════════════════════════════════════════╗
# ║          GEOLOCATION (OPTIONAL)            ║
# ╚═══════════════════════════════════════════╝
NEXT_PUBLIC_GEOLOCATION_PROVIDER="nominatim"

# Nominatim (OpenStreetMap) = pas de clé API requise
# Rate limit : 1 requête/seconde
```

### 4️⃣ Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma migrate dev --name init

# Seed avec données de test
npx prisma db seed
```

### 5️⃣ Démarrer le serveur

```bash
npm run dev
```

Accès : **[http://localhost:3000](http://localhost:3000)**

---

## 👤 Comptes de test (après seed)

| Rôle | Email | Mot de passe | Statut |
|------|-------|------------|--------|
| Admin | `admin@ctc-sante.test` | `password123` | ✅ Approuvé |
| Taxi 1 | `taxi1@test.fr` | `password123` | ⏳ En attente |
| Taxi 2 | `taxi2@test.fr` | `password123` | ⏳ En attente |
| Hôpital | `hopital@test.fr` | `password123` | ⏳ En attente |
| Clinic | `clinic@test.fr` | `password123` | ⏳ En attente |

**Comment approuver les comptes :**

1. Accéder à `http://localhost:3000/admin`
2. Aller à **Users**
3. Sélectionner les taxis/établissements
4. Cliquer **Approve**

---

## 🏛️ Architecture

```
ctc-sante/
│
├─ app/
│  ├─ (auth)/
│  │  ├─ login/          # Formulaire connexion
│  │  ├─ register/       # Inscription multi-rôles
│  │  └─ layout.tsx      # Layout auth (sans navbar)
│  │
│  ├─ (portal)/
│  │  ├─ admin/
│  │  │  ├─ page.tsx           # Dashboard avec stats
│  │  │  ├─ users/page.tsx     # Gestion validation
│  │  │  ├─ trips/page.tsx     # Toutes les courses
│  │  │  ├─ map/page.tsx       # Carte temps réel
│  │  │  └─ calendar/page.tsx  # Calendrier courses
│  │  │
│  │  ├─ taxi/
│  │  │  ├─ page.tsx           # Dashboard taxi
│  │  │  ├─ trips/page.tsx     # Mes courses
│  │  │  ├─ location/page.tsx  # GPS tracking
│  │  │  └─ subscription/       # Paiement abonnement
│  │  │
│  │  ├─ etablissement/
│  │  │  ├─ page.tsx           # Dashboard facility
│  │  │  ├─ new-trip/page.tsx  # Créer course
│  │  │  └─ trips/page.tsx     # Mes courses
│  │  │
│  │  └─ layout.tsx      # Navbar + sidebar portals
│  │
│  ├─ api/
│  │  ├─ auth/           # Auth routes
│  │  ├─ trips/          # CRUD courses
│  │  ├─ locations/      # GPS updates
│  │  ├─ dispatch/       # Auto-dispatch
│  │  ├─ subscriptions/  # Abonnements + Stripe
│  │  ├─ admin/          # Gestion admin
│  │  └─ webhooks/       # Stripe webhooks
│  │
│  ├─ layout.tsx         # Root layout
│  └─ page.tsx           # Landing
│
├─ components/
│  ├─ common/
│  │  ├─ Map.tsx              # Leaflet map
│  │  ├─ Calendar.tsx         # Trip calendar
│  │  ├─ TripCard.tsx         # Trip display
│  │  └─ Loading.tsx
│  │
│  ├─ admin/
│  │  ├─ UserValidationList.tsx
│  │  └─ TripsTable.tsx
│  │
│  ├─ taxi/
│  │  ├─ TripsList.tsx
│  │  └─ LocationUpdater.tsx
│  │
│  └─ etablissement/
│     └─ NewTripForm.tsx
│
├─ lib/
│  ├─ auth.ts            # NextAuth config
│  ├─ prisma.ts          # Prisma client
│  ├─ dispatch.ts        # Logique dispatch auto
│  ├─ geolocation.ts     # Nominatim API
│  ├─ stripe.ts          # Stripe client
│  └─ rbac.ts            # Guards RBAC
│
├─ prisma/
│  ├─ schema.prisma      # Schéma données
│  └─ seed.ts            # Données test
│
├─ public/
│  └─ logo-ctc-sante.png # Logo branding
│
├─ types.ts             # Types TypeScript
├─ tailwind.config.ts   # Tailwind config (colors CTC)
├─ next.config.js       # Next.js config
├─ package.json
├─ tsconfig.json
├─ .env.local          # Variables env (local)
└─ README.md
```

---

## 🔐 Système de rôles & validation

### Matrice d'accès

| Rôle | Inscription | Validation | Abonnement | Accès courses |
|------|------------|-----------|-----------|--------------|
| **ADMIN** | Auto | — | Non applicable | ✅ Toutes |
| **TAXI** | Bloquée | Admin | ✅ Obligatoire (ACTIVE) | ✅ Assignées |
| **ÉTABLISSEMENT** | Bloquée | Admin | Non applicable | ✅ Créées |

### États de validation

- **PENDING** : En attente approbation admin
- **APPROVED** : Accès autorisé
- **REJECTED** : Accès refusé

### États d'abonnement

- **PENDING** : Paiement non effectué
- **ACTIVE** : Actif (accès aux courses)
- **LATE** : Expiré (accès bloqué)
- **SUSPENDED** : Suspendu par admin

---

## 📱 Portails & Fonctionnalités

### 🏥 Portail Établissement

**Accueil** : Vue des courses créées + stats

**Créer course** :
- Sélectionner/créer patient
- Service + chambre
- Adresses départ/arrivée
- Type : immédiate ou programmée
- Prise en charge : bon présent OU paiement patient
- Si >150km → accord obligatoire

**Mes courses** :
- Filtre par statut
- Voir position taxi en temps réel
- Ajouter commentaires
- Historique

### 🚕 Portail Taxi

**Accueil** : Courses assignées + abonnement status

**Mes courses** :
- Voir détails : patient, adresse, distance
- Actions : Accepter → En route → Terminée
- Boutons Maps/Waze (départ + arrivée)
- Champ obligatoire : Prochain RDV patient (après course)

**Localisation** :
- GPS tracking (mise à jour : 10-20s polling)
- Toggle disponibilité
- Voir courses à proximité

**Abonnement** :
- Status + date expiration
- Bouton paiement Stripe
- Historique paiements

### 👨‍💼 Dashboard Admin

**Vue d'ensemble** :
- Stats : courses aujourd'hui, taxis actifs, approbations en attente
- Quick actions

**Gestion utilisateurs** :
- Lister : TAXI, ÉTABLISSEMENT en PENDING
- Approver / Rejeter / Suspendre
- Gérer abonnements (activer/suspendre)
- Voir profils complets

**Toutes les courses** :
- Filtre par statut
- Recherche patient/établissement
- Réassignation manuelle
- Ajouter commentaires admin

**Carte temps réel** :
- Positions taxis live
- Statut : disponible, en route, offline
- Clic sur taxi → détails
- Rafraîchissement polling 10s

**Calendrier** :
- Vue mois/semaine
- Courses par jour
- Couleur par chauffeur
- Afficher prochain RDV patient
- Compteur courses/jour

---

## ⚡ Dispatch automatique

### Flux complet

```
1. ÉTABLISSEMENT crée TRIP (type: IMMEDIATE ou PROGRAMMED)
   ↓
2. API /api/trips → POST
   ↓
3. Trigger dispatchNearestTaxi(tripId)
   ↓
4. Géocode pickupAddress → lat/lng (Nominatim)
   ↓
5. Requête : taxis APPROVED + ACTIVE + isAvailable + coords connues
   ↓
6. Calcul distance Haversine pour chaque taxi
   ↓
7. Assigne au plus proche → status = ASSIGNED
   ↓
8. Notif taxi (toast + email/SMS stub)
   ↓
9. TAXI accepte/refuse
   ↓
10. EN_ROUTE → DONE
```

### Fallback

- **Aucun taxi dispo** → Trip reste NEW
- **Admin peut réassigner** manuellement via `/api/dispatch`

### Performance

- Géocodage : ~500ms (Nominatim rate limit)
- Dispatch : ~200ms (calculs + DB)
- Total : <1s pour l'utilisateur

---

## 💳 Abonnement & Paiement

### Flux taxi

```
INSCRIPTION
  ↓
subscriptionStatus = PENDING (accès bloqué)
  ↓
TAXI clique "Payer"
  ↓
Stripe Checkout session créée
  ↓
TAXI complète paiement
  ↓
Webhook Stripe → /api/webhooks/stripe
  ↓
subscriptionStatus = ACTIVE
subscriptionEndAt = now + 30j
```

### Tarif

- **€29.99 / mois**
- Renouvellement auto possible (placeholder)
- Admin peut activer manuellement

### Statut abonnement

```
ACTIVE → (30j) → LATE (accès bloqué)
                ↓ (Renouvellement)
                ACTIVE
```

---

## 🗺️ Temps réel (MVP)

### Implémentation actuelle

- **Polling GPS** : Taxi update toutes les 10-20s via `/api/locations`
- **Polling Admin Map** : Rafraîchissement toutes les 10s
- **Polling Trip List** : Toutes les 5-10s pour voir changements

### Code exemple (Taxi)

```typescript
// Mettre à jour position
useEffect(() => {
  const updateLocation = async (lat, lng) => {
    await fetch('/api/locations', {
      method: 'PATCH',
      body: JSON.stringify({ lat, lng, isAvailable: true })
    });
  };

  const interval = setInterval(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      updateLocation(pos.coords.latitude, pos.coords.longitude);
    });
  }, 15000); // 15s

  return () => clearInterval(interval);
}, []);
```

### Architecture future

- WebSocket avec Socket.io
- Push notifications (OneSignal/Firebase)
- Offline sync avec LocalStorage

---

## 🚀 Déploiement

### Vercel (recommandé)

```bash
# 1. Push sur GitHub
git push origin main

# 2. Connecter Vercel
vercel link

# 3. Ajouter env vars sur Vercel dashboard
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=<from .env.local>
DATABASE_URL=<PostgreSQL URI>
STRIPE_SECRET_KEY=<from Stripe>
# ... autres

# 4. Déployer
vercel deploy --prod

# 5. Lancer migrations
vercel env pull  # Download env vars locally
npx prisma migrate deploy
```

### Docker (self-hosted)

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npx prisma generate

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]
```

```bash
docker build -t ctc-sante .
docker run -p 3000:3000 \
  -e DATABASE_URL="..." \
  -e NEXTAUTH_URL="https://your-domain" \
  -e NEXTAUTH_SECRET="..." \
  ctc-sante
```

---

## 🛠️ Development

### Scripts

```bash
# Dev server
npm run dev

# Build for production
npm run build
npm run start

# Linter & formatter
npm run lint
npm run format

# Prisma
npx prisma generate      # Regénérer client
npx prisma migrate dev   # Nouvelle migration
npx prisma db seed       # Seed données
npx prisma studio       # GUI pour DB

# Tests (à implémenter)
npm test
```

### Loggers

Activer les logs Prisma :

```typescript
// lib/prisma.ts
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn', 'info'],
});
```

### Debug

```bash
npm run dev -- --debug
# Puis : chrome://inspect
```

---

## 📊 API Endpoints clés

### Auth

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/session
```

### Trips

```
POST   /api/trips                 # Create (ÉTABLISSEMENT)
GET    /api/trips                 # List (filtered by role)
PATCH  /api/trips/[id]            # Update
```

### Dispatch

```
POST   /api/dispatch              # Manual (ADMIN)
POST   /api/dispatch/auto         # Trigger auto
```

### Locations

```
PATCH  /api/locations             # Update (TAXI)
GET    /api/locations             # List for map
```

### Subscriptions

```
POST   /api/subscriptions/checkout
GET    /api/subscriptions/status
```

### Admin

```
GET    /api/admin/users
PATCH  /api/admin/users/[id]
GET    /api/admin/dashboard
GET    /api/admin/calendar
```

---

## 🎨 Branding

**Tailwind Config** : Couleurs CTC Santé préconfigurées

```typescript
// tailwind.config.ts
colors: {
  primary: { 500: '#3A8B8B', ... },      // Teal
  secondary: { 700: '#2C4A5E', ... },    // Dark blue
  accent: { 500: '#C9A854', ... },       // Taxi yellow
}
```

Utilisation :

```jsx
<button className="bg-primary-600 text-white">Dispatcher</button>
<div className="border-secondary-200">Content</div>
<span className="text-accent-500">€29.99</span>
```

---

## 📚 Structure de données (Prisma)

### User

```prisma
User {
  id: String (PK)
  email: String (unique)
  passwordHash: String
  role: ADMIN | TAXI | ÉTABLISSEMENT
  validationStatus: PENDING | APPROVED | REJECTED
  subscriptionStatus: PENDING | ACTIVE | LATE | SUSPENDED
  subscriptionEndAt: DateTime?
  createdAt: DateTime
}
```

### TaxiProfile

```prisma
TaxiProfile {
  id: String (PK)
  userId: String (FK → User)
  nom: String
  prenom: String
  phone: String
  immatriculation: String
  isAvailable: Boolean
  lastLat: Float?
  lastLng: Float?
  lastSeenAt: DateTime?
  calendarColor: String
}
```

### Trip

```prisma
Trip {
  id: String (PK)
  facilityId: String (FK)
  patientId: String (FK)
  taxiUserId: String? (FK)
  status: NEW | ASSIGNED | EN_ROUTE | DONE | CANCELLED
  type: IMMEDIATE | PROGRAMMED
  paymentMode: BON_PRESENT | PAYE_PATIENT
  over150km: Boolean
  accordOk: Boolean?  // Required if over150km
  nextApptAt: DateTime?
  nextApptNote: String?
  commentFacility: String?
  commentAdmin: String?
  commentTaxi: String?
  ... other fields
}
```

---

## 🔧 Troubleshooting

### Port 3000 déjà utilisé

```bash
# Kill le process
lsof -i :3000
kill -9 <PID>

# Ou changer le port
PORT=3001 npm run dev
```

### Erreur Prisma migration

```bash
# Reset la DB
npx prisma migrate reset

# Ou pousser le schéma actuel
npx prisma db push
```

### Nominatim rate limit

Ajouter un delay dans `lib/geolocation.ts` :

```typescript
await new Promise(resolve => setTimeout(resolve, 1100)); // >1s
```

### CORS pour webhooks Stripe

Stripe → Settings → Webhooks → Décocher "Require valid HTTPS"

---

## 📝 Conventions de code

- **TypeScript strict mode** : toujours
- **Composants** : PascalCase + suffixe `.tsx`
- **Dossiers** : kebab-case
- **Variables** : camelCase
- **Constantes** : UPPER_SNAKE_CASE

---

## 🤝 Contribution

1. Créer une branche : `git checkout -b feature/xyz`
2. Commit : `git commit -m "feat: xyz"`
3. Push : `git push origin feature/xyz`
4. Ouvrir PR

---

## 📞 Support & Docs

- **Prisma:** https://www.prisma.io/docs
- **NextAuth:** https://authjs.dev
- **Next.js:** https://nextjs.org/docs
- **Tailwind:** https://tailwindcss.com/docs
- **Stripe:** https://stripe.com/docs
- **Leaflet:** https://leafletjs.com/docs

---

## 📄 Licence

MIT © 2024 CTC Santé

---

## ✅ Checklist Lancement

- [ ] Variables `.env.local` configurées
- [ ] Base de données créée et peuplée (seed)
- [ ] Comptes admin/taxi/établissement validés
- [ ] Stripe test keys ajoutées
- [ ] Logo CTC Santé mis à jour
- [ ] Tailwind colors testées
- [ ] Géocodage nominatim validé
- [ ] Map Leaflet affichée
- [ ] Dispatch auto fonctionne
- [ ] Taxi > location update fonctionnel
- [ ] Polling temps réel OK
- [ ] UI mobile-first responsive
- [ ] Déploiement Vercel/Docker

---

**Prêt à dispatcher ! 🚕✨**
