// lib/rbac.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib-auth';
import { UserRole, ValidationStatus, SubscriptionStatus } from './types';

/**
 * Middleware to check if user is authenticated
 */
export async function requireAuth(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return session;
}

/**
 * Middleware to check user role
 */
export async function requireRole(
  request: NextRequest,
  allowedRoles: UserRole[]
) {
  const session = await requireAuth(request);

  if (session instanceof NextResponse) {
    return session;
  }

  if (!allowedRoles.includes(session.user.role as UserRole)) {
    return NextResponse.json(
      { error: 'Forbidden: insufficient permissions' },
      { status: 403 }
    );
  }

  return session;
}

/**
 * Middleware to check if user is approved (for TAXI and ETABLISSEMENT)
 */
export async function requireApproved(request: NextRequest) {
  const session = await requireAuth(request);

  if (session instanceof NextResponse) {
    return session;
  }

  if (session.user.validationStatus !== ValidationStatus.APPROVED) {
    return NextResponse.json(
      { error: 'Account not approved yet' },
      { status: 403 }
    );
  }

  return session;
}

/**
 * Middleware to check taxi subscription status
 */
export async function requireActiveSubscription(request: NextRequest) {
  const session = await requireRole(request, [UserRole.TAXI]);

  if (session instanceof NextResponse) {
    return session;
  }

  if (session.user.subscriptionStatus !== SubscriptionStatus.ACTIVE) {
    return NextResponse.json(
      { error: 'Subscription not active. Please renew your subscription.' },
      { status: 403 }
    );
  }

  // Check if subscription hasn't expired
  if (session.user.subscriptionEndAt && new Date() > new Date(session.user.subscriptionEndAt)) {
    return NextResponse.json(
      { error: 'Subscription expired. Please renew.' },
      { status: 403 }
    );
  }

  return session;
}

/**
 * Extract user ID from session
 */
export function getUserIdFromSession(session: any): string | null {
  return session?.user?.id || null;
}

/**
 * Check if user is admin
 */
export function isAdmin(session: any): boolean {
  return session?.user?.role === UserRole.ADMIN;
}

/**
 * Check if user is taxi
 */
export function isTaxi(session: any): boolean {
  return session?.user?.role === UserRole.TAXI;
}

/**
 * Check if user is facility
 */
export function isFacility(session: any): boolean {
  return session?.user?.role === UserRole.ETABLISSEMENT;
}
