# 🚕 CTC Santé - Quick Start

**Application complète & prête à lancer !**

---

## ⚡ 5 Minute Setup

### 1. Installer dépendances
```bash
npm install
```

### 2. Configurer base de données
```bash
# Créer base PostgreSQL
createdb ctc_sante
# Ou utiliser Supabase/Railway

# Éditer .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/ctc_sante"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Initialiser DB
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Démarrer
```bash
npm run dev
# http://localhost:3000
```

---

## 👤 Comptes Test

| Rôle | Email | Password |
|------|-------|----------|
| Admin | admin@ctc-sante.test | password123 |
| Taxi | taxi1@test.fr | password123 |
| Facility | hopital@test.fr | password123 |

---

## 📂 Structure du Projet

```
ctc-sante-app/
├── app/
│   ├── (auth)/           # Login, Register
│   ├── (portal)/         # Admin, Taxi, Facility
│   ├── api/              # API endpoints
│   ├── layout.tsx
│   ├── page.tsx          # Landing
│   └── globals.css
├── lib/                  # Utilities (auth, db, dispatch, etc)
├── components/           # React components
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Test data
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── types.ts
└── Dockerfile
```

---

## 🎯 Features Incluses

✅ **Authentification** - Email/password avec JWT
✅ **3 Rôles** - ADMIN, TAXI, ÉTABLISSEMENT
✅ **Dispatch Auto** - Taxi le plus proche
✅ **Map Temps Réel** - Leaflet + GPS tracking
✅ **Calendrier** - Vue courses par jour
✅ **Abonnements** - Stripe integration
✅ **RBAC** - Sécurisé
✅ **Mobile-First** - Responsive
✅ **Docker** - Production ready

---

## 📚 Documentation

- `README.md` - Full docs (1000+ lines)
- `INSTALLATION_GUIDE.md` - Detailed setup
- `FILES_GUIDE.md` - File mapping
- `PROJECT_SUMMARY.md` - Overview

---

## 🚀 Next Steps

1. ✅ Setup DB et seed
2. ✅ Tester comptes login
3. ⏳ Customiser branding
4. ⏳ Ajouter pages manquantes
5. ⏳ Configurer Stripe
6. ⏳ Déployer (Vercel/Docker)

---

## 💡 Tips

- **Debug DB:** `npx prisma studio`
- **Reset DB:** `npx prisma migrate reset`
- **Logs:** `npm run dev -- --debug`
- **Docker:** `docker-compose up`

---

**Happy coding! 🎉**
