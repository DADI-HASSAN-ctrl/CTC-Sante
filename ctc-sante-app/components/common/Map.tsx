// components/common/Map.tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface TaxiLocation {
  id: string;
  nom: string;
  prenom: string;
  lat: number;
  lng: number;
  isAvailable: boolean;
  currentTripStatus?: string;
  phone?: string;
  calendarColor?: string;
}

interface MapProps {
  center?: [number, number];
  zoom?: number;
  taxis?: TaxiLocation[];
  onTaxiClick?: (taxi: TaxiLocation) => void;
  height?: string;
}

export function Map({
  center = [50.6292, 3.0573], // Lille
  zoom = 12,
  taxis = [],
  onTaxiClick,
  height = '600px',
}: MapProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const leafletMap = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(leafletMap);

    setMap(leafletMap);

    return () => {
      leafletMap.remove();
    };
  }, []);

  // Update taxi markers
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add new markers
    taxis.forEach((taxi) => {
      const icon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI0IiBmaWxsPSIjM0E4QjhCIi8+PHBhdGggZD0iTTE2IDgiQzEyLjEzIDggOSAxMS4xMyA5IDE1VjI0SDE2VjE1SDE2VzI0SDIzVjE1QzIzIDExLjEzIDE5Ljg3IDggMTYgOFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
      });

      const status = taxi.isAvailable ? 'Disponible' : 'En course';
      const popup = L.popup().setContent(
        `<div class="text-sm">
          <p class="font-bold">${taxi.prenom} ${taxi.nom}</p>
          <p class="text-xs text-gray-600">${status}</p>
          ${taxi.currentTripStatus ? `<p class="text-xs">Trip: ${taxi.currentTripStatus}</p>` : ''}
          ${taxi.phone ? `<p class="text-xs">${taxi.phone}</p>` : ''}
        </div>`
      );

      const marker = L.marker([taxi.lat, taxi.lng], { icon })
        .bindPopup(popup)
        .addTo(map);

      marker.on('click', () => {
        onTaxiClick?.(taxi);
      });
    });
  }, [map, taxis, onTaxiClick]);

  return (
    <div
      ref={mapRef}
      style={{
        height,
        borderRadius: '0.5rem',
        overflow: 'hidden',
        backgroundColor: '#f0f7f7',
      }}
      className="w-full border border-primary-200"
    />
  );
}

export default Map;
