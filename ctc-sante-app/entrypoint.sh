#!/bin/sh
set -e

echo "Waiting for database to be ready..."
npx prisma db push --skip-generate

echo "Seeding database..."
npm run db:seed || true

echo "Starting Next.js application..."
npm run start
