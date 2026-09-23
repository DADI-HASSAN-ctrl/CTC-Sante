// app/api/locations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/lib-auth';
import { prisma } from '@/lib/lib-prisma';
import { UserRole } from '@/types';
import { z } from 'zod';

const updateLocationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  isAvailable: z.boolean(),
});

// PATCH - Update taxi location
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (
      !session?.user ||
      session.user.role !== UserRole.TAXI
    ) {
      return NextResponse.json(
        { error: 'Only taxis can update location' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const data = updateLocationSchema.parse(body);

    // Update taxi profile
    await prisma.taxiProfile.update({
      where: { userId: session.user.id },
      data: {
        lastLat: data.lat,
        lastLng: data.lng,
        isAvailable: data.isAvailable,
        lastSeenAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Location updated',
    });
  } catch (error: any) {
    console.error('Location update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update location' },
      { status: 400 }
    );
  }
}

// GET - List all taxi locations (for map)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only admin and facilities can see all locations
    if (
      ![UserRole.ADMIN, UserRole.ETABLISSEMENT].includes(
        session.user.role as UserRole
      )
    ) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Get all taxis with current locations
    const taxis = await prisma.taxiProfile.findMany({
      where: {
        user: {
          validationStatus: 'APPROVED',
        },
        lastLat: { not: null },
        lastLng: { not: null },
      },
      include: {
        user: true,
      },
    });

    // Get current trip for each taxi
    const taxisWithTrips = await Promise.all(
      taxis.map(async (taxi) => {
        const currentTrip = await prisma.trip.findFirst({
          where: {
            taxiUserId: taxi.userId,
            status: { in: ['ASSIGNED', 'EN_ROUTE'] },
          },
        });

        return {
          id: taxi.userId,
          nom: taxi.nom,
          prenom: taxi.prenom,
          lat: taxi.lastLat,
          lng: taxi.lastLng,
          isAvailable: taxi.isAvailable,
          lastSeen: taxi.lastSeenAt,
          currentTripId: currentTrip?.id,
          currentTripStatus: currentTrip?.status,
          phone: taxi.phone,
          calendarColor: taxi.calendarColor,
        };
      })
    );

    return NextResponse.json({
      taxis: taxisWithTrips,
    });
  } catch (error: any) {
    console.error('Location list error:', error);
    return NextResponse.json(
      { error: 'Failed to list locations' },
      { status: 500 }
    );
  }
}
