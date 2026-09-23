# 🚀 CTC Santé - Guide Complet de Déploiement Multi-Plateforme

## 📋 Vue d'ensemble des 3 Plateformes

| Plateforme | Type | Installation | Temps Build | Priorité |
|---|---|---|---|---|
| 🌐 **PWA** | Web Installable | Browser | 2 min | ⭐ Recommandée |
| 📱 **React Native** | Native iOS/Android | App Store/Play Store | 15-20 min | ⭐⭐ Idéale |
| 🖥️ **Electron** | Desktop | .exe/.dmg/.deb | 10-15 min | ⭐⭐ Complète |

---

## 🌐 **PLATEFORME 1 : PWA (Progressive Web App)**

### ✅ Avantages
- ✅ Fonctionne sur tous les appareils (mobile + desktop + web)
- ✅ Installation immédiate (bouton "Installer" dans navigateur)
- ✅ Offline-first (marche sans connexion)
- ✅ Mises à jour automatiques
- ✅ Zéro installation préalable requise
- ✅ Peut utiliser Web Push Notifications

### 📥 Installation pour Développeur

```bash
# 1. Accède au projet Next.js
cd ctc-sante-app

# 2. Installe next-pwa
npm install next-pwa

# 3. Remplace next.config.js par next.config.pwa.js
cp ../next.config.pwa.js ./next.config.js

# 4. Copie le service worker
cp ../service-worker.js ./public/

# 5. Ajoute le manifest au _document.tsx
# (voir section Intégration PWA ci-dessous)

# 6. Lance en développement
npm run dev

# 7. Build pour production
npm run build
npm start
```

### 📲 Utilisation pour l'Utilisateur

**Sur Desktop (Windows/Mac/Linux)** :
1. Ouvre l'app dans Chrome/Edge
2. Clique l'icône "Installer" (barre d'adresse)
3. L'app s'installe comme une app native
4. Lance-la depuis le menu Démarrer / Applications

**Sur Mobile (Android)** :
1. Ouvre l'app dans Chrome
2. Menu → "Installer l'app"
3. Icône apparaît sur l'écran d'accueil

**Sur iOS** :
1. Ouvre l'app dans Safari
2. Partage → "Sur l'écran d'accueil"
3. Icône apparaît sur l'écran d'accueil

### 🔐 Sécurité PWA
- HTTPS obligatoire en production
- Service Worker en sandbox
- CSP (Content Security Policy)
- No inline scripts

### 🚀 Déploiement PWA

```bash
# Vercel (recommandé pour Next.js)
npm install -g vercel
vercel

# Ou avec Docker
docker build -t ctc-sante-pwa .
docker run -p 3000:3000 ctc-sante-pwa

# Ou traditionnellement
npm run build
npm start
```

### 📝 Intégration PWA dans Next.js

Ajoute au `_document.tsx` ou `_app.tsx` :
```tsx
import Head from 'next/head';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" />
        <meta name="theme-color" content="#3A8B8B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <body>
        {/* ... */}
      </body>
    </Html>
  );
}
```

---

## 📱 **PLATEFORME 2 : React Native + Expo**

### ✅ Avantages
- ✅ Vraies apps natives (iOS + Android)
- ✅ Accès aux capteurs (GPS, caméra, notifications)
- ✅ Performance optimale
- ✅ App Store + Google Play Store
- ✅ Une seule codebase JavaScript

### 📥 Installation pour Développeur

```bash
# 1. Installe Expo CLI
npm install -g eas-cli

# 2. Crée un nouveau projet Expo
cd ctc-sante-mobile

# 3. Installe les dépendances
npm install

# 4. Configure app.json avec ton compte Expo
npx eas build:configure

# 5. Lance en développement
npm start
```

### 📲 Test en Développement

**Android** :
```bash
npm run android
```

**iOS** (macOS uniquement) :
```bash
npm run ios
```

**Web** :
```bash
npm run web
```

### 🔐 Sécurité React Native

- Expo Secure Store pour tokens/passwords
- Chiffrement des données locales
- No hardcoded secrets
- Code obfuscation

### 🏗️ Build pour Production

**Android (.apk/.aab)** :
```bash
# Build localement
eas build --platform android --local

# Ou via cloud Expo
eas build --platform android

# Fichier généré : app-release.aab (pour Play Store)
```

**iOS (.ipa)** :
```bash
# Nécessite un Mac + compte Apple Developer
eas build --platform ios

# Fichier généré : app.ipa (pour App Store)
```

### 📤 Publication sur App Store

**Google Play Store** :
```bash
# 1. Crée un compte Google Play Developer ($25 une fois)
# 2. Génère une clé de signature
keytool -genkey -v -keystore ctc-sante.keystore -alias ctc-sante -keyalg RSA -keysize 2048 -validity 10000

# 3. Build et signe l'app
eas build --platform android --release-channel production

# 4. Upload sur Play Store via Play Console
# https://play.google.com/console
```

**Apple App Store** :
```bash
# 1. Crée un compte Apple Developer ($99/an)
# 2. Génère des certificats et profiles de provisioning dans Xcode
# 3. Build avec Expo
eas build --platform ios --release-channel production

# 4. Upload via Xcode ou Transporter
# https://apps.apple.com/app/transporter/id1450874784
```

---

## 🖥️ **PLATEFORME 3 : Electron (Desktop)**

### ✅ Avantages
- ✅ Application desktop pour Windows/Mac/Linux
- ✅ Installation .exe/.dmg/.deb
- ✅ Accès au système de fichiers
- ✅ Base de données locale SQLite
- ✅ Stockage sécurisé (keytar)

### 📥 Installation pour Développeur

```bash
# 1. Accède au dossier
cd ctc-sante-desktop

# 2. Installe les dépendances
npm install

# 3. Lance en développement
npm run electron-dev
```

### 🔐 Sécurité Electron

- **Preload Scripts** : Isolation contexte
- **Keytar** : Stockage sécurisé des tokens
- **SQLite Local** : Base de données locale chiffrée
- **Code Signing** : Signature des binaires
- **Auto-update** : Mises à jour sécurisées

### 🏗️ Build pour Production

**Windows (.exe)** :
```bash
npm run electron-build-win

# Fichier généré : dist/CTC Santé Setup 1.0.0.exe
```

**macOS (.dmg)** :
```bash
npm run electron-build-mac

# Fichier généré : dist/CTC Santé-1.0.0.dmg
```

**Linux (.AppImage/.deb)** :
```bash
npm run electron-build-linux

# Fichiers générés :
# - dist/CTC Santé-1.0.0.AppImage
# - dist/ctc-sante-desktop_1.0.0_amd64.deb
```

### 📦 Distribution

**Windows** :
```bash
# Upload sur un serveur
scp dist/CTC\ Santé\ Setup\ 1.0.0.exe user@server:/var/www/downloads/

# Les utilisateurs téléchargent et exécutent le .exe
```

**macOS** :
```bash
# Notarize le .dmg (Apple requirement)
xcrun altool --notarize-app -f dist/CTC\ Santé-1.0.0.dmg \
  -t osx -u apple_id@gmail.com -p app_password

# Utilisateurs téléchargent le .dmg
```

**Linux** :
```bash
# Pour Debian/Ubuntu
sudo apt-get install ./dist/ctc-sante-desktop_1.0.0_amd64.deb

# Ou directement le AppImage
./CTC\ Santé-1.0.0.AppImage
```

---

## 🔒 **SÉCURITÉ MULTI-PLATEFORME**

### 1️⃣ **Authentification**

```typescript
// JWT Token Storage
// PWA: localStorage + Service Worker
// React Native: Expo.SecureStore
// Electron: keytar + SQLite

const storeToken = async (token: string) => {
  if (typeof window !== 'undefined') {
    // PWA
    localStorage.setItem('authToken', token);
  } else if (window.electronAPI) {
    // Electron
    await window.electronAPI.secureStore.set('authToken', token);
  } else {
    // React Native
    await SecureStore.setItemAsync('authToken', token);
  }
};
```

### 2️⃣ **Chiffrement Données**

```typescript
import CryptoJS from 'crypto-js';

const encryptData = (data: any, key: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

const decryptData = (encrypted: string, key: string) => {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};
```

### 3️⃣ **HTTPS Obligatoire**

```typescript
// PWA + Electron: Forcer HTTPS
if (process.env.NODE_ENV === 'production' && location.protocol !== 'https:') {
  location.protocol = 'https:';
}

// React Native: Certificat pinning
const client = axios.create({
  httpAgent: new http.Agent({ cert: certificate }),
  httpsAgent: new https.Agent({ cert: certificate })
});
```

### 4️⃣ **Headers de Sécurité**

```typescript
// Next.js pour PWA
headers: {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}
```

---

## 📊 **STATISTIQUES DE COUVERTURE**

```
Utilisateurs Android     : ~70% du marché
Utilisateurs iOS         : ~30% du marché
Utilisateurs Desktop     : ~80% (professionnels)
Utilisateurs Web (PWA)   : ~100% (all devices)

RECOMMANDATION HASSAN:
1. PWA immédiatement (accessible partout)
2. Android + iOS ensuite (via Expo)
3. Desktop Windows ensuite (via Electron)
```

---

## ⏱️ **TIMELINE DE DÉPLOIEMENT**

| Phase | Plateforme | Durée | Statut |
|---|---|---|---|
| 1 | PWA | 1-2 sem | ⭐ Prête |
| 2 | Android | 2-3 sem | ⏳ Config App |
| 3 | iOS | 2-3 sem | ⏳ Config App |
| 4 | Windows Desktop | 1-2 sem | ⏳ Config Electron |

---

## 🚀 **DÉMARRAGE IMMÉDIAT**

### Étape 1 : PWA (Aujourd'hui)
```bash
npm install next-pwa
cp next.config.pwa.js ctc-sante-app/next.config.js
cd ctc-sante-app && npm run build
```

### Étape 2 : React Native (Cette semaine)
```bash
cd ctc-sante-mobile
npm install
npx eas build:configure
npm start
```

### Étape 3 : Electron (Prochain)
```bash
cd ctc-sante-desktop
npm install
npm run electron-dev
npm run electron-build-win
```

---

## 💡 **PROCHAINES ÉTAPES**

1. ✅ Choisir la priorité de déploiement
2. ✅ Créer les comptes développeur (Google Play, Apple, Vercel)
3. ✅ Générer les certificats et clés
4. ✅ Builder et tester sur chaque plateforme
5. ✅ Soumettre pour review/publication

**Est-tu prêt à commencer ?** Dis-moi par où ! 🚀
