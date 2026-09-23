// app/(portal)/taxi/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TripStatus, SubscriptionStatus } from '@/types';

interface TaxiTrip {
  id: string;
  patientName: string;
  service: string;
  pickupAddress: string;
  dropoffAddress: string;
  status: TripStatus;
  scheduledAt: string;
  distanceKm?: number;
}

interface SubscriptionInfo {
  status: SubscriptionStatus;
  endAt?: string;
  daysRemaining?: number;
  isExpired?: boolean;
}

export default function TaxiDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [trips, setTrips] = useState<TaxiTrip[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch trips
        const tripsRes = await fetch('/api/trips');
        if (tripsRes.ok) {
          const data = await tripsRes.json();
          setTrips(data.trips || []);
        }

        // Fetch subscription
        const subRes = await fetch('/api/subscriptions/status');
        if (subRes.ok) {
          const data = await subRes.json();
          setSubscription(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchData();
      // Refresh every 30 seconds
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const isSubscriptionActive =
    subscription?.status === SubscriptionStatus.ACTIVE;

  const assignedTrips = trips.filter((t) => t.status === 'ASSIGNED');
  const inRouteTrips = trips.filter((t) => t.status === 'EN_ROUTE');
  const completedTrips = trips.filter((t) => t.status === 'DONE');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-secondary-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-primary-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-secondary-700">
                Bonjour {session?.user?.email}
              </h1>
              <p className="text-neutral-600 mt-1">
                Dashboard chauffeur taxi
              </p>
            </div>
            <Link
              href="/taxi/location"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              📍 Mettre à jour localisation
            </Link>
          </div>
        </div>
      </div>

      {/* Subscription Alert */}
      {!isSubscriptionActive && (
        <div className="bg-accent-50 border-l-4 border-accent-500 p-4 mb-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-accent-900">
                  ⚠️ Abonnement requis
                </h3>
                <p className="text-sm text-accent-800 mt-1">
                  Votre abonnement {subscription?.status.toLowerCase() === 'late' ? 'a expiré' : 'est inactif'}. Vous devez renouveler pour accéder aux courses.
                </p>
              </div>
              <Link
                href="/taxi/subscription"
                className="px-6 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition font-semibold"
              >
                Payer l'abonnement
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Subscription Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-primary-200 p-6 shadow-sm">
            <div className="text-sm text-neutral-600">Status abonnement</div>
            <div className="text-2xl font-bold text-primary-600 mt-2">
              {subscription?.status || 'N/A'}
            </div>
            {subscription?.daysRemaining !== undefined && (
              <div className="text-sm text-neutral-600 mt-2">
                {subscription.daysRemaining > 0
                  ? `${subscription.daysRemaining} jours restants`
                  : 'Expiré'}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg border border-primary-200 p-6 shadow-sm">
            <div className="text-sm text-neutral-600">Courses assignées</div>
            <div className="text-2xl font-bold text-secondary-600 mt-2">
              {assignedTrips.length}
            </div>
            <Link
              href="/taxi/trips"
              className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-block"
            >
              Voir les courses →
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-primary-200 p-6 shadow-sm">
            <div className="text-sm text-neutral-600">Complétées aujourd'hui</div>
            <div className="text-2xl font-bold text-green-600 mt-2">
              {completedTrips.length}
            </div>
          </div>
        </div>

        {/* Active Trips */}
        {isSubscriptionActive && (
          <>
            {/* En route */}
            {inRouteTrips.length > 0 && (
              <div className="bg-white rounded-lg border border-primary-200 shadow-sm overflow-hidden">
                <div className="bg-primary-50 border-b border-primary-200 px-6 py-4">
                  <h2 className="text-xl font-bold text-primary-700">
                    🚗 En route ({inRouteTrips.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {inRouteTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="p-6 hover:bg-neutral-50 transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-secondary-700">
                            {trip.patientName}
                          </h3>
                          <p className="text-sm text-neutral-600 mt-1">
                            {trip.service}
                          </p>
                          <div className="mt-3 space-y-1 text-sm">
                            <p>
                              <span className="text-neutral-600">De:</span> {trip.pickupAddress}
                            </p>
                            <p>
                              <span className="text-neutral-600">À:</span> {trip.dropoffAddress}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <a
                            href={`https://maps.apple.com/?q=${encodeURIComponent(trip.dropoffAddress)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition text-sm font-semibold"
                          >
                            Arrivée 🗺️
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assigned */}
            {assignedTrips.length > 0 && (
              <div className="bg-white rounded-lg border border-primary-200 shadow-sm overflow-hidden">
                <div className="bg-primary-50 border-b border-primary-200 px-6 py-4">
                  <h2 className="text-xl font-bold text-primary-700">
                    ✓ Assignées ({assignedTrips.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {assignedTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="p-6 hover:bg-neutral-50 transition"
                    >
                      <Link href={`/taxi/trips/${trip.id}`}>
                        <div className="flex justify-between items-start cursor-pointer">
                          <div>
                            <h3 className="font-bold text-secondary-700 hover:text-primary-600">
                              {trip.patientName}
                            </h3>
                            <p className="text-sm text-neutral-600 mt-1">
                              {trip.service}
                            </p>
                            {trip.distanceKm && (
                              <p className="text-sm text-primary-600 mt-2">
                                {trip.distanceKm} km
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-secondary-700">
                              {new Date(trip.scheduledAt).toLocaleTimeString(
                                'fr-FR',
                                { hour: '2-digit', minute: '2-digit' }
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* No active trips */}
        {assignedTrips.length === 0 && inRouteTrips.length === 0 && isSubscriptionActive && (
          <div className="bg-white rounded-lg border border-primary-200 p-8 text-center">
            <div className="text-4xl mb-4">🚕</div>
            <h3 className="text-lg font-bold text-secondary-700">
              Pas de courses actuellement
            </h3>
            <p className="text-neutral-600 mt-2">
              Assurez-vous que votre localisation est à jour et que vous êtes disponible
            </p>
            <Link
              href="/taxi/location"
              className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
            >
              Mettre à jour localisation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
