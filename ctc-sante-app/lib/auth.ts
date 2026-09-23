// lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcryptjs from "bcryptjs";
import { prisma } from "./lib-prisma";
import { ValidationStatus, SubscriptionStatus } from "./types";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcryptjs.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          validationStatus: user.validationStatus,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionEndAt: user.subscriptionEndAt,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.validationStatus = user.validationStatus;
        token.subscriptionStatus = user.subscriptionStatus;
        token.subscriptionEndAt = user.subscriptionEndAt;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.validationStatus = token.validationStatus;
        session.user.subscriptionStatus = token.subscriptionStatus;
        session.user.subscriptionEndAt = token.subscriptionEndAt;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Helper to hash password
export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10);
}

// Helper to verify password
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}
