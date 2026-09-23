// prisma/seed.ts
import { PrismaClient, UserRole, ValidationStatus, SubscriptionStatus, TripType, PaymentMode, TripStatus } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.trip.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.subscriptionPayment.deleteMany();
  await prisma.taxiProfile.deleteMany();
  await prisma.facilityProfile.deleteMany();
  await prisma.user.deleteMany();

  // Hash password
  const passwordHash = await bcryptjs.hash('password123', 10);

  // 1. Create Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ctc-sante.test',
      passwordHash,
      role: UserRole.ADMIN,
      validationStatus: ValidationStatus.APPROVED,
    },
  });
  console.log('✅ Admin créé:', admin.email);

  // 2. Create Taxis
  const taxi1 = await prisma.user.create({
    data: {
      email: 'taxi1@test.fr',
      passwordHash,
      role: UserRole.TAXI,
      validationStatus: ValidationStatus.APPROVED,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      subscriptionEndAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      taxiProfile: {
        create: {
          nom: 'Dupont',
          prenom: 'Jean',
          phone: '+33612345678',
          immatriculation: 'AA-123-BB',
          isAvailable: true,
          lastLat: 50.6292,
          lastLng: 3.0573,
          lastSeenAt: new Date(),
          calendarColor: '#3A8B8B',
        },
      },
    },
    include: { taxiProfile: true },
  });
  console.log('✅ Taxi 1 créé:', taxi1.email);

  const taxi2 = await prisma.user.create({
    data: {
      email: 'taxi2@test.fr',
      passwordHash,
      role: UserRole.TAXI,
      validationStatus: ValidationStatus.APPROVED,
      subscriptionStatus: SubscriptionStatus.ACTIVE,
      subscriptionEndAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      taxiProfile: {
        create: {
          nom: 'Martin',
          prenom: 'Pierre',
          phone: '+33687654321',
          immatriculation: 'CC-456-DD',
          isAvailable: true,
          lastLat: 50.64,
          lastLng: 3.05,
          lastSeenAt: new Date(),
          calendarColor: '#2C4A5E',
        },
      },
    },
    include: { taxiProfile: true },
  });
  console.log('✅ Taxi 2 créé:', taxi2.email);

  const taxi3 = await prisma.user.create({
    data: {
      email: 'taxi3@test.fr',
      passwordHash,
      role: UserRole.TAXI,
      validationStatus: ValidationStatus.PENDING,
      subscriptionStatus: SubscriptionStatus.PENDING,
      taxiProfile: {
        create: {
          nom: 'Bernard',
          prenom: 'Paul',
          phone: '+33698765432',
          immatriculation: 'EE-789-FF',
          isAvailable: false,
          calendarColor: '#C9A854',
        },
      },
    },
    include: { taxiProfile: true },
  });
  console.log('✅ Taxi 3 créé (PENDING):', taxi3.email);

  // 3. Create Facilities
  const hopital = await prisma.user.create({
    data: {
      email: 'hopital@test.fr',
      passwordHash,
      role: UserRole.ETABLISSEMENT,
      validationStatus: ValidationStatus.APPROVED,
      facilityProfile: {
        create: {
          name: 'Hôpital Central Lille',
          address: '1 Avenue Oscar Lambret, 59000 Lille',
          contactName: 'Dr. Smith',
          phone: '+33320445555',
        },
      },
    },
    include: { facilityProfile: true },
  });
  console.log('✅ Hôpital créé:', hopital.email);

  const clinic = await prisma.user.create({
    data: {
      email: 'clinic@test.fr',
      passwordHash,
      role: UserRole.ETABLISSEMENT,
      validationStatus: ValidationStatus.APPROVED,
      facilityProfile: {
        create: {
          name: 'Clinique Privée Nord',
          address: '42 Rue de Turenne, 59000 Lille',
          contactName: 'Mme. Dubois',
          phone: '+33320555566',
        },
      },
    },
    include: { facilityProfile: true },
  });
  console.log('✅ Clinique créée:', clinic.email);

  const pending_facility = await prisma.user.create({
    data: {
      email: 'clinic2@test.fr',
      passwordHash,
      role: UserRole.ETABLISSEMENT,
      validationStatus: ValidationStatus.PENDING,
      facilityProfile: {
        create: {
          name: 'Nouvelle Clinique',
          address: '10 Avenue Jean Jaurès, 59000 Lille',
          contactName: 'Dr. Durand',
          phone: '+33320777777',
        },
      },
    },
    include: { facilityProfile: true },
  });
  console.log('✅ Clinique créée (PENDING):', pending_facility.email);

  // 4. Create Patients
  const patient1 = await prisma.patient.create({
    data: {
      firstName: 'Jean',
      lastName: 'Luchet',
      phone: '+33612111111',
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      firstName: 'Marie',
      lastName: 'Renard',
      phone: '+33612222222',
    },
  });

  const patient3 = await prisma.patient.create({
    data: {
      firstName: 'Michel',
      lastName: 'Lefevre',
    },
  });

  console.log('✅ Patients créés (3)');

  // 5. Create Trips
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  tomorrow.setHours(14, 30, 0, 0);

  const trip1 = await prisma.trip.create({
    data: {
      facilityId: hopital.id,
      patientId: patient1.id,
      service: 'Radiologie',
      chambre: '301',
      pickupAddress: '1 Avenue Oscar Lambret, 59000 Lille',
      dropoffAddress: '123 Rue de la Paix, 59000 Lille',
      scheduledAt: new Date(),
      type: TripType.IMMEDIATE,
      status: TripStatus.ASSIGNED,
      paymentMode: PaymentMode.BON_PRESENT,
      bonVerified: true,
      over150km: false,
      taxiUserId: taxi1.id,
      distanceKm: 2.5,
      commentFacility: 'Visite médicale standard',
    },
  });

  const trip2 = await prisma.trip.create({
    data: {
      facilityId: clinic.id,
      patientId: patient2.id,
      service: 'Suivi post-opératoire',
      chambre: '502',
      pickupAddress: '42 Rue de Turenne, 59000 Lille',
      dropoffAddress: 'Centre de Rééducation, 59110 La Madeleine',
      scheduledAt: tomorrow,
      type: TripType.PROGRAMMED,
      status: TripStatus.NEW,
      paymentMode: PaymentMode.PAYE_PATIENT,
      over150km: false,
      commentFacility: 'Rééducation importante',
    },
  });

  const trip3 = await prisma.trip.create({
    data: {
      facilityId: hopital.id,
      patientId: patient3.id,
      service: 'Dialyse',
      pickupAddress: 'Domicile Particulier, 59650 Villeneuve d\'Ascq',
      dropoffAddress: 'Centre Hémodialyse, 59000 Lille',
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      type: TripType.PROGRAMMED,
      status: TripStatus.DONE,
      paymentMode: PaymentMode.BON_PRESENT,
      bonVerified: true,
      over150km: false,
      taxiUserId: taxi2.id,
      distanceKm: 8.2,
      commentFacility: 'Transport régulier 3x/semaine',
      nextApptAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      nextApptNote: 'Lundi 14h30',
    },
  });

  console.log('✅ Courses créées (3)');

  // 6. Create Subscription Payments
  await prisma.subscriptionPayment.create({
    data: {
      userId: taxi1.id,
      stripeSessionId: 'session_test_1',
      amount: 2999, // €29.99
      status: 'COMPLETED',
    },
  });

  console.log('✅ Paiements d\'abonnement créés');

  console.log('\n✨ Database seeded successfully!');
  console.log('\n📋 Test Accounts:');
  console.log('   Admin:      admin@ctc-sante.test / password123 ✅');
  console.log('   Taxi 1:     taxi1@test.fr / password123 ✅');
  console.log('   Taxi 2:     taxi2@test.fr / password123 ✅');
  console.log('   Taxi 3:     taxi3@test.fr / password123 ⏳ (pending)');
  console.log('   Hôpital:    hopital@test.fr / password123 ✅');
  console.log('   Clinique:   clinic@test.fr / password123 ✅');
  console.log('\n🚀 Start server: npm run dev');
  console.log('📍 URL: http://localhost:3000');
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
