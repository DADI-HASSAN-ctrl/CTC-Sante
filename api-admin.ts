// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/lib-auth';
import { prisma } from '@/lib/lib-prisma';
import { UserRole } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (session?.user?.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Admin only' },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role');
    const validationStatus = searchParams.get('validationStatus');

    const where: any = {};
    if (role) where.role = role;
    if (validationStatus) where.validationStatus = validationStatus;

    const users = await prisma.user.findMany({
      where,
      include: {
        taxiProfile: true,
        facilityProfile: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error('Admin list error:', error);
    return NextResponse.json(
      { error: 'Failed to list users' },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────
// app/api/admin/users/[id]/route.ts
// ─────────────────────────────────────────────────

import { z } from 'zod';

const updateUserSchema = z.object({
  validationStatus: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
  subscriptionStatus: z.enum(['PENDING', 'ACTIVE', 'LATE', 'SUSPENDED']).optional(),
  commentAdmin: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (session?.user?.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Admin only' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const data = updateUserSchema.parse(body);

    const user = await prisma.user.update({
      where: { id: params.id },
      data,
      include: {
        taxiProfile: true,
        facilityProfile: true,
      },
    });

    return NextResponse.json({
      message: 'User updated',
      user,
    });
  } catch (error: any) {
    console.error('User update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update user' },
      { status: 400 }
    );
  }
}

// ─────────────────────────────────────────────────
// app/api/admin/dashboard/route.ts
// ─────────────────────────────────────────────────

export async function GET_DASHBOARD(request: NextRequest) {
  try {
    const session = await auth();

    if (session?.user?.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Admin only' },
        { status: 403 }
      );
    }

    // Today's trips
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tripsToday = await prisma.trip.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Active taxis
    const activeTaxis = await prisma.taxiProfile.count({
      where: {
        user: {
          validationStatus: 'APPROVED',
          subscriptionStatus: 'ACTIVE',
        },
        isAvailable: true,
      },
    });

    // Pending approvals
    const pendingApprovals = await prisma.user.count({
      where: {
        validationStatus: 'PENDING',
        role: { in: ['TAXI', 'ETABLISSEMENT'] },
      },
    });

    // Trips by status
    const tripsByStatus = await prisma.trip.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    return NextResponse.json({
      tripsToday,
      activeTaxis,
      pendingApprovals,
      tripsByStatus,
      timestamp: new Date(),
    });
  } catch (error: any) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to load dashboard' },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────
// app/api/admin/calendar/route.ts
// ─────────────────────────────────────────────────

export async function GET_CALENDAR(request: NextRequest) {
  try {
    const session = await auth();

    if (session?.user?.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Admin only' },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString(), 10);
    const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString(), 10);
    const taxiUserId = searchParams.get('taxiUserId');

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const where: any = {
      scheduledAt: {
        gte: firstDay,
        lte: lastDay,
      },
    };

    if (taxiUserId) {
      where.taxiUserId = taxiUserId;
    }

    const trips = await prisma.trip.findMany({
      where,
      include: {
        taxiUser: { include: { taxiProfile: true } },
        patient: true,
      },
      orderBy: { scheduledAt: 'asc' },
    });

    // Group by date
    const calendar: any = {};
    trips.forEach((trip) => {
      const date = trip.scheduledAt.toISOString().split('T')[0];
      if (!calendar[date]) {
        calendar[date] = [];
      }
      calendar[date].push(trip);
    });

    return NextResponse.json({
      year,
      month,
      calendar,
      trips,
    });
  } catch (error: any) {
    console.error('Calendar error:', error);
    return NextResponse.json(
      { error: 'Failed to load calendar' },
      { status: 500 }
    );
  }
}
