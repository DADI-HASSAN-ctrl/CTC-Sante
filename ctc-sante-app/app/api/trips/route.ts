// app/api/trips/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/lib-auth';
import { prisma } from '@/lib/lib-prisma';
import { dispatchNearestTaxi } from '@/lib/lib-dispatch';
import { CreateTripDTO, PaymentMode, TripType, UserRole } from '@/types';
import { z } from 'zod';

const createTripSchema = z.object({
  patientFirstName: z.string(),
  patientLastName: z.string(),
  patientPhone: z.string().optional(),
  service: z.string(),
  chambre: z.string().optional(),
  pickupAddress: z.string(),
  dropoffAddress: z.string(),
  scheduledAt: z.string().datetime(),
  type: z.enum([TripType.IMMEDIATE, TripType.PROGRAMMED]),
  paymentMode: z.enum([PaymentMode.BON_PRESENT, PaymentMode.PAYE_PATIENT]),
  bonVerified: z.boolean().optional(),
  over150km: z.boolean(),
  accordOk: z.boolean().optional(),
  commentFacility: z.string().optional(),
});

// POST - Create new trip
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== UserRole.ETABLISSEMENT) {
      return NextResponse.json(
        { error: 'Only facilities can create trips' },
        { status: 403 }
      );
    }

    if (session.user.validationStatus !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Your facility account is not approved yet' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const data = createTripSchema.parse(body);

    // Validate over150km logic
    if (data.over150km && data.accordOk === undefined) {
      return NextResponse.json(
        { error: 'accordOk is required for trips over 150km' },
        { status: 400 }
      );
    }

    // Get or create patient
    let patient = await prisma.patient.findFirst({
      where: {
        firstName: data.patientFirstName,
        lastName: data.patientLastName,
      },
    });

    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          firstName: data.patientFirstName,
          lastName: data.patientLastName,
          phone: data.patientPhone,
        },
      });
    }

    // Create trip
    const trip = await prisma.trip.create({
      data: {
        facilityId: session.user.id,
        patientId: patient.id,
        service: data.service,
        chambre: data.chambre,
        pickupAddress: data.pickupAddress,
        dropoffAddress: data.dropoffAddress,
        scheduledAt: new Date(data.scheduledAt),
        type: data.type,
        paymentMode: data.paymentMode,
        bonVerified: data.bonVerified || false,
        over150km: data.over150km,
        accordOk: data.over150km ? data.accordOk : null,
        commentFacility: data.commentFacility,
        status: 'NEW',
      },
      include: {
        facility: true,
        patient: true,
      },
    });

    // Trigger automatic dispatch
    // Run in background - don't wait
    setTimeout(() => {
      dispatchNearestTaxi(trip.id).catch((err) =>
        console.error('Auto-dispatch error:', err)
      );
    }, 100);

    return NextResponse.json(
      {
        message: 'Trip created',
        trip,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Trip creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create trip' },
      { status: 400 }
    );
  }
}

// GET - List trips (filtered by role)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    let where: any = {};

    // Apply filters based on role
    if (session.user.role === UserRole.TAXI) {
      // Taxi: only see their assigned trips
      where.taxiUserId = session.user.id;
    } else if (session.user.role === UserRole.ETABLISSEMENT) {
      // Facility: only see their created trips
      where.facilityId = session.user.id;
    }
    // ADMIN: see all trips

    if (status) {
      where.status = status;
    }

    const trips = await prisma.trip.findMany({
      where,
      include: {
        facility: true,
        patient: true,
        taxiUser: { include: { taxiProfile: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.trip.count({ where });

    return NextResponse.json({
      trips,
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Trip list error:', error);
    return NextResponse.json(
      { error: 'Failed to list trips' },
      { status: 500 }
    );
  }
}
