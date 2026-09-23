#!/bin/bash

# Script pour générer tous les icons nécessaires
# Installe ImageMagick d'abord: brew install imagemagick (ou apt-get install imagemagick)

echo "🎨 Génération des icones CTC Santé..."

# Crée un icon SVG de base
cat > /tmp/icon-base.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
  <rect fill="#3A8B8B" width="192" height="192"/>
  <circle cx="96" cy="70" r="30" fill="#fff"/>
  <path d="M60 120 Q96 150 132 120" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
  <text x="96" y="170" font-size="20" fill="#fff" text-anchor="middle" font-weight="bold">CTC</text>
</svg>
EOF

# PWA Icons
echo "  → PWA icons..."
convert -background none /tmp/icon-base.svg -resize 192x192 ctc-sante-app/public/icon-192.png
convert -background none /tmp/icon-base.svg -resize 512x512 ctc-sante-app/public/icon-512.png
convert -background none /tmp/icon-base.svg -resize 192x192 ctc-sante-app/public/maskable-icon-192.png
convert -background none /tmp/icon-base.svg -resize 72x72 ctc-sante-app/public/badge-72.png

# React Native Icons
echo "  → React Native icons..."
mkdir -p ctc-sante-mobile/assets
convert -background "#3A8B8B" /tmp/icon-base.svg -resize 192x192 ctc-sante-mobile/assets/icon.png
convert -background "#3A8B8B" /tmp/icon-base.svg -resize 1024x1024 ctc-sante-mobile/assets/adaptive-icon.png
convert -background white -flatten /tmp/icon-base.svg -resize 512x512 ctc-sante-mobile/assets/splash.png
convert -background none /tmp/icon-base.svg -resize 192x192 ctc-sante-mobile/assets/notification-icon.png

# Electron Icons (Windows + macOS + Linux)
echo "  → Electron icons..."
mkdir -p ctc-sante-desktop/assets
convert -background none /tmp/icon-base.svg -resize 256x256 ctc-sante-desktop/assets/icon.png

# Créer .ico pour Windows
convert /tmp/icon-base.svg -define icon:auto-resize=256,128,96,64,48,32,16 ctc-sante-desktop/assets/icon.ico

echo "✅ Icons générées avec succès!"
echo ""
echo "📁 Localisation:"
echo "   PWA:          ctc-sante-app/public/"
echo "   React Native: ctc-sante-mobile/assets/"
echo "   Electron:     ctc-sante-desktop/assets/"
