// lib/dispatch.ts
import { prisma } from './lib-prisma';
import { geolocation } from './lib-geolocation';

/**
 * Haversine formula to calculate distance between two coordinates (in km)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Main dispatch logic: Find closest available taxi and assign trip
 */
export async function dispatchNearestTaxi(tripId: string): Promise<boolean> {
  try {
    // 1. Get trip details
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        facility: true,
        patient: true,
      },
    });

    if (!trip) {
      console.error(`Trip ${tripId} not found`);
      return false;
    }

    // 2. Geocode pickup address
    const coords = await geolocation.geocode(trip.pickupAddress);
    if (!coords) {
      console.error(`Could not geocode address: ${trip.pickupAddress}`);
      return false;
    }

    const { lat: pickupLat, lng: pickupLng } = coords;

    // 3. Find eligible taxis
    const eligibleTaxis = await prisma.taxiProfile.findMany({
      where: {
        user: {
          validationStatus: 'APPROVED',
          subscriptionStatus: 'ACTIVE',
        },
        isAvailable: true,
        lastLat: { not: null },
        lastLng: { not: null },
      },
      include: {
        user: true,
      },
    });

    if (eligibleTaxis.length === 0) {
      console.log(`No eligible taxis for trip ${tripId}`);
      return false; // Trip stays NEW, queue for admin
    }

    // 4. Calculate distances and find closest
    const taxis_with_distance = eligibleTaxis.map((taxi) => {
      const distance = calculateDistance(
        pickupLat,
        pickupLng,
        taxi.lastLat!,
        taxi.lastLng!
      );
      return { taxi, distance };
    });

    taxis_with_distance.sort((a, b) => a.distance - b.distance);
    const closestTaxi = taxis_with_distance[0];

    if (!closestTaxi) {
      return false;
    }

    // 5. Assign trip to closest taxi
    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: {
        taxiUserId: closestTaxi.taxi.userId,
        status: 'ASSIGNED',
        distanceKm: Math.round(closestTaxi.distance * 100) / 100,
      },
      include: {
        facility: true,
        patient: true,
        taxiUser: { include: { taxiProfile: true } },
      },
    });

    console.log(
      `Trip ${tripId} assigned to taxi ${closestTaxi.taxi.userId} (${closestTaxi.distance.toFixed(2)} km away)`
    );

    // TODO: Send notification to taxi (email/SMS/push)
    // notifyTaxi(closestTaxi.taxi.userId, updatedTrip);

    return true;
  } catch (error) {
    console.error(`Dispatch error for trip ${tripId}:`, error);
    return false;
  }
}

/**
 * Manual dispatch by admin
 */
export async function manualDispatch(
  tripId: string,
  taxiUserId: string
): Promise<boolean> {
  try {
    await prisma.trip.update({
      where: { id: tripId },
      data: {
        taxiUserId,
        status: 'ASSIGNED',
      },
    });
    return true;
  } catch (error) {
    console.error(`Manual dispatch error:`, error);
    return false;
  }
}
