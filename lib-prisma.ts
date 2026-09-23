// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Use a global to prevent hot-reload from creating multiple connections
  const globalWithPrisma = global as typeof globalThis & { prisma: PrismaClient };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      log: ['error', 'warn'],
    });
  }
  prisma = globalWithPrisma.prisma;
}

export { prisma };
