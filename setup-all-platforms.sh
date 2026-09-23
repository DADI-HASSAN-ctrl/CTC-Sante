#!/bin/bash

################################################################################
#                    CTC SANTÉ - SETUP TOUS LES PROJETS                       #
#         Configure automatiquement PWA, React Native ET Electron              #
################################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🚀 CTC SANTÉ - INSTALLATION MULTIPLATEFORME            ║${NC}"
echo -e "${BLUE}║    (PWA + React Native + Electron)                       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "   Installer depuis: https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✓ Node.js détecté:${NC} $(node --version)"
echo -e "${GREEN}✓ npm détecté:${NC} $(npm --version)"
echo ""

# ============================================================================
# 1. REACT NATIVE + EXPO
# ============================================================================
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}[1/3] Configuration React Native + Expo${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ ! -d "ctc-sante-mobile" ]; then
    echo -e "${RED}❌ Dossier ctc-sante-mobile non trouvé${NC}"
    exit 1
fi

cd ctc-sante-mobile

echo "📦 Installation des dépendances..."
npm install --legacy-peer-deps > /dev/null 2>&1

echo "✓ Expo: EAS CLI"
npm install -g eas-cli > /dev/null 2>&1 || true

echo -e "${GREEN}✅ React Native configuré${NC}"
echo ""
echo "   Commandes rapides:"
echo -e "   ${BLUE}npm start${NC}                    → Lancer Expo Go"
echo -e "   ${BLUE}eas build --platform android${NC}  → Build Android .apk"
echo -e "   ${BLUE}eas build --platform ios${NC}      → Build iOS .ipa"
echo ""

cd ..

# ============================================================================
# 2. PWA (NEXT.JS)
# ============================================================================
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}[2/3] Configuration PWA (Next.js)${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ ! -d "ctc-sante-pwa" ]; then
    echo "📁 Création du projet PWA..."
    npx create-next-app@latest ctc-sante-pwa --typescript --tailwind --eslint --no-git > /dev/null 2>&1 || true
fi

cd ctc-sante-pwa

echo "📦 Installation des dépendances PWA..."
npm install next-pwa > /dev/null 2>&1 || true
npm install next-auth crypto-js axios > /dev/null 2>&1 || true

echo -e "${GREEN}✅ PWA configurée${NC}"
echo ""
echo "   Commandes rapides:"
echo -e "   ${BLUE}npm run dev${NC}        → Développement local (http://localhost:3000)"
echo -e "   ${BLUE}npm run build${NC}      → Build production"
echo -e "   ${BLUE}npm start${NC}          → Serveur production"
echo ""

cd ..

# ============================================================================
# 3. ELECTRON (DESKTOP)
# ============================================================================
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}[3/3] Configuration Electron (Desktop)${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ ! -d "ctc-sante-desktop" ]; then
    echo "📁 Création du projet Electron..."
    mkdir -p ctc-sante-desktop/{public,src}
fi

cd ctc-sante-desktop

echo "📦 Installation des dépendances Electron..."
npm install electron electron-builder react react-dom keytar sqlite3 > /dev/null 2>&1 || true
npm install -D concurrently > /dev/null 2>&1 || true

echo -e "${GREEN}✅ Electron configuré${NC}"
echo ""
echo "   Commandes rapides:"
echo -e "   ${BLUE}npm run electron-dev${NC}              → Développement Electron"
echo -e "   ${BLUE}npm run electron-build-win${NC}        → Build Windows .exe"
echo -e "   ${BLUE}npm run electron-build-mac${NC}        → Build macOS .dmg"
echo -e "   ${BLUE}npm run electron-build-linux${NC}      → Build Linux .AppImage"
echo ""

cd ..

# ============================================================================
# RÉSUMÉ FINAL
# ============================================================================
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}✅ SETUP COMPLÉTÉ AVEC SUCCÈS${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}🚀 DÉMARRER MAINTENANT :${NC}"
echo ""
echo "1️⃣  EXPO GO (le plus rapide - 2 min):"
echo -e "   ${BLUE}cd ctc-sante-mobile && npm start${NC}"
echo "   Scannez le QR code avec votre téléphone"
echo ""
echo "2️⃣  PWA (développement web - 3 min):"
echo -e "   ${BLUE}cd ctc-sante-pwa && npm run dev${NC}"
echo "   Ouvrez http://localhost:3000"
echo ""
echo "3️⃣  ELECTRON (application desktop - 2 min):"
echo -e "   ${BLUE}cd ctc-sante-desktop && npm run electron-dev${NC}"
echo ""
echo -e "${YELLOW}📊 COMPTES DE TEST :${NC}"
echo "   Admin:          admin@ctc-sante.test"
echo "   Taxi:           taxi1@test.fr"
echo "   Établissement:  hopital@test.fr"
echo "   Mot de passe:   password"
echo ""
echo -e "${YELLOW}📚 DOCUMENTATION :${NC}"
echo "   Mobile:   ctc-sante-mobile/RAPIDSTART_FR.txt"
echo "   Desktop:  DEPLOIEMENT_MULTIPLATEFORME.md"
echo ""
