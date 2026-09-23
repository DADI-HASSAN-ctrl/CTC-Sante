# 🚀 Guide Complet : Déployer CTC Santé sur ta Machine

## Résumé
Tu as **deux options** pour utiliser CTC Santé :

### Option A : **Démo Interactive (Immédiate)** ✅ 
- Fichier : `app-pro-v2.html`
- Parfait pour : Tester les fonctionnalités, voir comment ça marche
- Avantage : Zéro installation requise
- Accès : Ouvre simplement le fichier dans ton navigateur
- **Comptes de test inclus** :
  - Admin : admin@ctc-sante.test (voir tarification)
  - Taxi : taxi1@test.fr
  - Établissement : hopital@test.fr

### Option B : **Projet Next.js Complet (Recommandé)** ⭐
- Dépôt : Dossier `ctc-sante-app`
- Parfait pour : Déploiement en production, développement, base de données réelle
- Avantage : Backend complet, PostgreSQL, API REST, Stripe
- Complexité : Nécessite Docker ou npm

---

## 🔥 Option B : Déployer avec Docker (Recommandé)

### Prérequis
```bash
✓ Docker (version 20+)
✓ Docker Compose (intégré dans Docker Desktop)
✓ 4 GB RAM disponible
```

### Étapes

#### 1. Accède au dossier du projet
```bash
cd ctc-sante-app
```

#### 2. Configure les variables d'environnement
Le fichier `.env.local` est déjà configuré, mais tu peux le vérifier :
```bash
cat .env.local
```

#### 3. Lance Docker Compose
```bash
docker compose up --build
```

**Première fois** = ⏳ 5-10 minutes (téléchargement des images)
**Prochaines fois** = ⚡ 30 secondes

#### 4. Accède à l'application
```
🌐 Application : http://localhost:3000
📊 Prisma Studio : http://localhost:5555 (optionnel)
```

#### 5. Comptes de test
```
Email: admin@ctc-sante.test
Mot de passe: admin123

Email: taxi1@test.fr
Mot de passe: taxi123

Email: hopital@test.fr
Mot de passe: hopital123
```

### Arrêter l'application
```bash
docker compose down
```

### Logs en temps réel
```bash
docker compose logs -f
```

---

## 🏗️ Option B Alternative : Avec npm (Si Docker ne fonctionne pas)

### Prérequis
```bash
✓ Node.js 18+ (https://nodejs.org)
✓ PostgreSQL 14+ (https://www.postgresql.org/download)
```

### Étapes

#### 1. Installe les dépendances
```bash
cd ctc-sante-app
npm install
```

#### 2. Démarre PostgreSQL
```bash
# Sur macOS avec Homebrew
brew services start postgresql

# Sur Linux
sudo systemctl start postgresql

# Sur Windows (PostgreSQL Service)
# Assure-toi que PostgreSQL est en cours d'exécution
```

#### 3. Crée la base de données
```bash
createdb ctc_sante -U postgres
```

#### 4. Configure la connexion à la base de données
Édite `.env.local` :
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ctc_sante"
```
Remplace `YOUR_PASSWORD` par ton mot de passe PostgreSQL.

#### 5. Prépare la base de données
```bash
npm run db:push
npm run db:seed
```

#### 6. Lance l'application en développement
```bash
npm run dev
```

#### 7. Accède à l'application
```
🌐 http://localhost:3000
```

---

## 🛠️ Architecture du Projet

```
ctc-sante-app/
├── app/                  # Next.js 14 App Router
│   ├── api/             # Endpoints API REST
│   ├── dashboard/       # Pages principales
│   ├── auth/            # Authentification (NextAuth)
│   └── admin/           # Espace admin
├── components/          # Composants React réutilisables
├── lib/                 # Utilitaires (API, auth, etc.)
├── prisma/              # ORM & schéma de base de données
│   ├── schema.prisma    # Définition des modèles
│   ├── migrations/      # Migrations de base de données
│   └── seed.ts          # Données de test
├── public/              # Fichiers statiques
├── styles/              # Styles globaux
├── .env.local          # Variables d'environnement
└── docker-compose.yml  # Configuration Docker
```

---

## 📋 Fonctionnalités Complètes

### 🚕 Pour les Taxis
- ✅ Tableau de bord avec statistiques
- ✅ Voir les courses disponibles
- ✅ Accepter/Refuser les courses
- ✅ Géolocalisation en temps réel
- ✅ Historique des courses
- ✅ Gestion du profil

### 🏥 Pour les Établissements
- ✅ Créer des courses (avec calendrier + heure)
- ✅ Sélectionner le mode de paiement (Prescription / Bon / Patient)
- ✅ Ajouter des observations médicales détaillées
- ✅ Sélectionner la mobilité (fauteuil, béquilles, etc.)
- ✅ Spécifier les accompagnateurs
- ✅ Voir les tarifs calculés (admin seulement)
- ✅ Historique des courses
- ✅ Gestion de l'abonnement

### 👨‍💼 Pour l'Admin
- ✅ Voir tous les utilisateurs
- ✅ Valider les inscriptions
- ✅ Voir la tarification complète
- ✅ Gérer les tarifs (Hauts-de-France 2026)
- ✅ Statistiques globales
- ✅ Gestion des paiements Stripe

---

## 💰 Tarification Intégrée

**Hauts-de-France 2026** :
- **Prise en charge** : €2.80
- **Tarif au km** : €1.30/km (zone urbaine)
- **Surcharge nuit** (21h-6h) : +50%
- **Surcharge dimanche/jours fériés** : +50%
- **Minimum de course** : €7.50

*Visible uniquement par l'admin* 🔒

---

## 🔐 Sécurité

- ✅ Authentification JWT (NextAuth.js)
- ✅ Hachage des mots de passe (bcryptjs)
- ✅ HTTPS recommandé en production
- ✅ Variables d'environnement sécurisées
- ✅ Validation des entrées (Zod)
- ✅ Contrôle d'accès par rôle (RBAC)

---

## 🐛 Troubleshooting

### "La base de données ne se connecte pas"
```bash
# Vérifie que PostgreSQL fonctionne
docker compose logs postgres

# Réinitialise la base de données
docker compose down -v
docker compose up --build
```

### "npm ERR! 403"
```bash
# Utilise Docker à la place (voir Option B)
# Si tu dois utiliser npm, essaie :
npm cache clean --force
npm install
```

### "Port 3000 déjà en utilisation"
```bash
# Utilise un autre port
npm run dev -- -p 3001
# Ensuite accède à http://localhost:3001
```

---

## 📦 Déploiement en Production

### Sur Vercel (Recommandé pour Next.js)
1. Push ton code sur GitHub
2. Connecte ton repo sur https://vercel.com
3. Vercel configure automatiquement tout
4. ⚡ Déploiement en 1 clic

### Sur un serveur Linux (Docker)
```bash
# 1. Clone le repo
git clone <ton-repo> ctc-sante

# 2. Accède au dossier
cd ctc-sante/ctc-sante-app

# 3. Configure les variables de production
nano .env.production

# 4. Lance avec Docker
docker compose -f docker-compose.yml up -d
```

---

## 📞 Support

Problème ? Besoin d'aide ?
- Vérifie les logs : `docker compose logs -f`
- Réinitialise tout : `docker compose down -v && docker compose up --build`

---

## ✅ Checklist Déploiement

- [ ] Docker installé et fonctionnel
- [ ] Variables d'environnement configurées
- [ ] `docker compose up --build` lancé
- [ ] Application accessible sur http://localhost:3000
- [ ] Login réussi avec un compte test
- [ ] Navigation entre les onglets fonctionne
- [ ] Création d'une course possible
- [ ] Tarifs visibles pour admin seulement

---

**Besoin d'aide ?** Tous les fichiers sont prêts à l'emploi. Commence par la **Démo HTML** si tu veux tester rapidement, puis migre vers **Docker** pour la production.
