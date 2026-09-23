// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/lib-prisma';
import { hashPassword } from '@/lib/lib-auth';
import { UserRole, ValidationStatus } from '@/types';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum([UserRole.ADMIN, UserRole.TAXI, UserRole.ETABLISSEMENT]),
  // Taxi fields
  nom: z.string().optional(),
  prenom: z.string().optional(),
  phone: z.string().optional(),
  immatriculation: z.string().optional(),
  // Facility fields
  facilityName: z.string().optional(),
  facilityAddress: z.string().optional(),
  contactName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        role: data.role,
        validationStatus:
          data.role === UserRole.ADMIN
            ? ValidationStatus.APPROVED
            : ValidationStatus.PENDING,
      },
    });

    // Create role-specific profile
    if (data.role === UserRole.TAXI) {
      await prisma.taxiProfile.create({
        data: {
          userId: user.id,
          nom: data.nom || 'N/A',
          prenom: data.prenom || 'N/A',
          phone: data.phone || '',
          immatriculation: data.immatriculation || '',
        },
      });
    } else if (data.role === UserRole.ETABLISSEMENT) {
      await prisma.facilityProfile.create({
        data: {
          userId: user.id,
          name: data.facilityName || 'N/A',
          address: data.facilityAddress || '',
          contactName: data.contactName || '',
          phone: data.phone || '',
        },
      });
    }

    return NextResponse.json(
      {
        message:
          data.role === UserRole.ADMIN
            ? 'Admin account created'
            : 'Account created. Awaiting admin approval.',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          validationStatus: user.validationStatus,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
}
