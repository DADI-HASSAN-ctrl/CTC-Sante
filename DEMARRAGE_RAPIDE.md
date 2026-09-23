# 🚀 DEMARRAGE RAPIDE - CTC SANTÉ MULTIPLATEFORME

**Temps estimé: 5-10 minutes pour tout mettre en place**

## 📋 Prérequis (une fois)

```bash
# Installer Node.js depuis: https://nodejs.org (version 18+)
# Vérifier:
node --version
npm --version
```

## ⚡ Option 1: EXPO GO - Tester immédiatement sur votre téléphone (2 min)

Le moyen le plus rapide. Pas d'installation, directement sur téléphone.

```bash
# 1. Installer l'app "Expo Go" sur votre téléphone
#    → App Store (iPhone) ou Google Play (Android)

# 2. Lancer l'app:
cd ctc-sante-mobile
npm install
npm start

# 3. Scanner le QR code avec votre téléphone
#    → iPhone: App Appareil photo > Scanner QR
#    → Android: Expo Go > Scan QR
```

**Comptes de test:**
- Admin: `admin@ctc-sante.test` / `password`
- Taxi: `taxi1@test.fr` / `password`
- Établissement: `hopital@test.fr` / `password`

✨ L'app se charge en < 30 secondes!

---

## 🔴 Option 2: BUILD ANDROID - Créer un fichier .apk (5 min)

Crée un fichier `.apk` que vous pouvez partager et installer sur n'importe quel Android.

```bash
cd ctc-sante-mobile

# Configuration (première fois uniquement):
eas build:configure
# Sélectionner: Android (managed)

# Lancer le build:
eas build --platform android

# → Attend 5 minutes
# → Affiche un lien pour télécharger le fichier .apk
# → Installer sur Android
```

---

## 🟢 Option 3: PWA - Application Web Progressive (3 min)

Accédez à l'application dans votre navigateur. Peut être installée comme app web.

```bash
cd ctc-sante-pwa
npm install
npm run dev

# Ouvrez: http://localhost:3000
```

**Caractéristiques:**
- ✓ Fonctionne sur tous les navigateurs
- ✓ Peut être installée comme app (Accueil + mode fullscreen)
- ✓ Fonctionne hors ligne (Progressive Web App)
- ✓ Développement rapide

---

## 🟡 Option 4: ELECTRON - Application Desktop (2 min)

Application native pour Windows, macOS et Linux.

```bash
cd ctc-sante-desktop
npm install
npm run electron-dev

# Lance l'application desktop
```

**Characteristics:**
- ✓ Application native Windows/Mac/Linux
- ✓ Base de données locale SQLite
- ✓ Stockage sécurisé des credentials (Keytar)
- ✓ Performance optimale

---

## 🎯 SETUP COMPLET EN UNE COMMANDE

Si vous voulez configurer tous les projets d'un coup:

```bash
bash setup-all-platforms.sh
```

Cela va:
1. ✓ Installer toutes les dépendances React Native
2. ✓ Créer et configurer le projet PWA
3. ✓ Créer et configurer le projet Electron
4. ✓ Afficher les commandes rapides pour chaque plateforme

---

## ✅ VÉRIFICATION RAPIDE

Après le démarrage, vérifier que:

- [ ] Écran de connexion s'affiche
- [ ] Connexion réussit avec les comptes de test
- [ ] Dashboard affiche "Courses" et "CA"
- [ ] Menu "Mes Courses" fonctionne
- [ ] Menu "Créer Course" accessible
- [ ] Bouton Déconnexion fonctionne

---

## 📱 Résumé des Plateformes

| Plateforme | Temps | Commande | Résultat |
|-----------|-------|----------|----------|
| **Expo Go** | 2 min | `npm start` | Sur téléphone immédiatement |
| **Android APK** | 5 min | `eas build --platform android` | Fichier .apk téléchargeable |
| **iOS IPA** | 10 min | `eas build --platform ios` | Fichier .ipa (app Store) |
| **PWA** | 3 min | `npm run dev` | Web dans navigateur |
| **Electron** | 2 min | `npm run electron-dev` | Application desktop |

---

## 🆘 Dépannage

**Node.js pas trouvé:**
```bash
# Installer depuis: https://nodejs.org
```

**Port déjà utilisé:**
```bash
npm start -- --port 8082
```

**Erreur de métro (metro bundler):**
```bash
# Fermer tout et redémarrer:
npm start
```

**EAS CLI pas trouvé:**
```bash
npm install -g eas-cli
```

---

## 📚 Documentation Complète

- **Mobile:** `ctc-sante-mobile/RAPIDSTART_FR.txt`
- **Déploiement:** `DEPLOIEMENT_MULTIPLATEFORME.md`
- **Commandes:** `COMMANDES_RAPIDES.txt`

---

## 🎓 Architecture

```
CTC Santé
├── ctc-sante-mobile/      (React Native + Expo)
│   ├── screens/           (UI Components)
│   ├── store/            (Zustand State Management)
│   └── app.json          (Configuration Expo)
│
├── ctc-sante-pwa/        (Next.js PWA)
│   ├── app/              (Pages)
│   ├── public/           (Assets)
│   └── next.config.js    (PWA Config)
│
└── ctc-sante-desktop/    (Electron)
    ├── public/           (Electron main process)
    ├── src/              (React components)
    └── package.json      (Build config)
```

---

## 🔐 Sécurité

- ✓ JWT Authentication
- ✓ Secure Storage (SecureStore mobile, Keytar desktop)
- ✓ HTTPS sur toutes les communications
- ✓ Service Worker pour PWA
- ✓ SQLite local encrypted (Electron)

---

**C'est tout! Vous êtes prêt à démarrer. 🚀**
