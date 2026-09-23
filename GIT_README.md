# 🚑 CTC Santé - Application Multiplateforme

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Production Ready](https://img.shields.io/badge/Status-Production%20Ready-green.svg)]()
[![Platforms: iOS | Android | Web | Desktop](https://img.shields.io/badge/Platforms-iOS%20%7C%20Android%20%7C%20Web%20%7C%20Desktop-blue.svg)]()

Système de gestion des transports sanitaires et médicaux avec suivi en temps réel, tarification automatique et distribution équitable des revenus pour les taxis.

**[📥 Télécharger l'Application](https://votre-site.com/download)**

---

## ✨ Fonctionnalités

### 🔐 Sécurité
- ✅ Authentification JWT
- ✅ Stockage sécurisé des credentials (SecureStore mobile, Keytar desktop)
- ✅ HTTPS + CSP headers
- ✅ Role-based access control (RBAC)

### 🚕 Gestion des Courses
- ✅ Création de courses médicales
- ✅ Assignation automatique aux taxis
- ✅ Calcul automatique des tarifs (€2.80 + €1.30/km)
- ✅ Observations médicales sécurisées
- ✅ Statut course en temps réel

### 👥 3 Rôles Utilisateur
1. **Administrateur** - Vue globale, suivi taxis, revenue tracking
2. **Taxi** - Gestion de ses courses, statistiques personnelles
3. **Établissement** - Création de courses, suivi patients

### 📊 Admin Dashboard
- ✅ Suivi des taxis
- ✅ Revenue par taxi
- ✅ Distribution équitable (load balancing)
- ✅ Statistiques globales

### 📱 Multi-Plateforme
- ✅ **iOS** - Application native via App Store
- ✅ **Android** - Application native via Google Play
- ✅ **Web (PWA)** - Progressive Web App, offline support
- ✅ **Desktop** - Windows, macOS, Linux via Electron

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm 7+
- Git

### Installation

```bash
# Cloner le repo
git clone https://github.com/VOTRE_USERNAME/CTC-Sante.git
cd CTC-Sante

# Installer les dépendances
cd ctc-sante-mobile
npm install
```

### Lancer l'Application

#### 1️⃣ Expo Go (Le plus rapide - 2 min)
```bash
cd ctc-sante-mobile
npm start
# Scanner le QR code avec Expo Go
```

#### 2️⃣ PWA Web (3 min)
```bash
cd ctc-sante-pwa
npm install
npm run dev
# Ouvrir: http://localhost:3000
```

#### 3️⃣ Electron Desktop (2 min)
```bash
cd ctc-sante-desktop
npm install
npm run electron-dev
```

#### 4️⃣ Android APK (5 min)
```bash
cd ctc-sante-mobile
eas build --platform android
```

#### 5️⃣ iOS IPA (10 min)
```bash
cd ctc-sante-mobile
eas build --platform ios
```

---

## 🔑 Comptes de Test

| Rôle | Email | Mot de Passe |
|------|-------|--------------|
| Admin | `admin@ctc-sante.test` | `password` |
| Taxi | `taxi1@test.fr` | `password` |
| Établissement | `hopital@test.fr` | `password` |

---

## 📁 Structure du Projet

```
CTC-Sante/
├── ctc-sante-mobile/              # React Native + Expo
│   ├── screens/                   # 6 écrans complets
│   ├── store/                     # Zustand state + SecureStore
│   ├── app.json                   # Configuration Expo
│   └── package.json
│
├── ctc-sante-pwa/                 # Next.js PWA
│   ├── app/                       # Pages Next.js
│   ├── next.config.js             # PWA config
│   └── package.json
│
├── ctc-sante-desktop/             # Electron
│   ├── public/
│   │   ├── electron.js            # Main process + SQLite
│   │   └── preload.js             # Secure APIs
│   └── package.json
│
├── Documentation/
│   ├── DEMARRAGE_RAPIDE.md
│   ├── DEPLOIEMENT_RAPIDE.txt
│   ├── STATUS_PROJET.md
│   └── DEPLOIEMENT_MULTIPLATEFORME.md
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🛠️ Tech Stack

### Frontend
- **React Native** - Applications mobiles
- **React** - Web & Desktop
- **Expo** - Mobile deployment
- **Next.js** - PWA
- **Electron** - Desktop apps
- **Zustand** - State management
- **React Navigation** - Mobile routing

### Backend
- **Node.js/npm** - Runtime & package management
- **JWT** - Authentication
- **SQLite** - Local database (Electron)
- **SecureStore** - Mobile secure storage
- **Keytar** - Desktop secure storage

### Security
- **Context Isolation** (Electron)
- **HTTPS + CSP Headers**
- **JWT Tokens**
- **Secure credential storage**
- **RBAC** - Role-based access

---

## 📈 Tarification

**Formule Hauts-de-France 2026:**
- Base: €2.80
- Distance: €1.30 par km
- Surcharges: +50% (nuit/dimanche/jours fériés)

---

## 🔄 Déploiement en Production

### PWA (Vercel - Recommandé)
```bash
npm install -g vercel
cd ctc-sante-pwa
vercel --prod
```

### Android (Google Play Store)
```bash
cd ctc-sante-mobile
eas build --platform android
eas submit --platform android
```

### iOS (App Store)
```bash
cd ctc-sante-mobile
eas build --platform ios
eas submit --platform ios
```

### Desktop (GitHub Releases)
```bash
cd ctc-sante-desktop
npm run electron-build-win    # Windows
npm run electron-build-mac    # macOS
npm run electron-build-linux  # Linux
```

---

## 📚 Documentation Complète

- [Quick Start Guide](./DEMARRAGE_RAPIDE.md)
- [Deployment Guide](./DEPLOIEMENT_MULTIPLATEFORME.md)
- [Quick Commands](./DEPLOIEMENT_RAPIDE.txt)
- [Project Status](./STATUS_PROJET.md)

---

## 🤝 Contribution

Les contributions sont les bienvenues! Pour les changements majeurs:

1. Fork le repo
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour les détails.

---

## 👥 Auteur

**Hassan** - Lille, France  
- 📧 DADI-HASSAN@hotmail.fr
- 🌍 Basé dans les Hauts-de-France

---

## 📞 Support

Pour les questions ou problèmes:
- 📖 Consultez la [documentation complète](./Documentation/)
- 🐛 Ouvrez une [issue](https://github.com/VOTRE_USERNAME/CTC-Sante/issues)
- 💬 Contactez l'auteur

---

## 📊 Status

- ✅ React Native - Production Ready
- ✅ PWA - Production Ready
- ✅ Electron - Production Ready
- ✅ Documentation - Complete
- ✅ Test Accounts - Ready

---

**Dernière mise à jour:** 23 Septembre 2026  
**Version:** 1.0.0

---

🚀 **[Télécharger maintenant](https://votre-site.com/download)**

