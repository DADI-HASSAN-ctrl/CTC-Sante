// lib/geolocation.ts
import axios from 'axios';

interface Coordinates {
  lat: number;
  lng: number;
}

class GeolocationService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org';
  private cache: Map<string, Coordinates> = new Map();

  /**
   * Geocode an address to coordinates using Nominatim
   * Note: Nominatim has rate limits (1 request/second max)
   */
  async geocode(address: string): Promise<Coordinates | null> {
    try {
      // Check cache first
      const cached = this.cache.get(address);
      if (cached) {
        return cached;
      }

      const response = await axios.get(`${this.nominatimUrl}/search`, {
        params: {
          q: address,
          format: 'json',
          limit: 1,
        },
        headers: {
          'User-Agent': 'CTC-Sante/1.0',
        },
        timeout: 5000,
      });

      if (!response.data || response.data.length === 0) {
        console.warn(`No geocoding result for: ${address}`);
        return null;
      }

      const result = response.data[0];
      const coords: Coordinates = {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
      };

      // Cache result
      this.cache.set(address, coords);

      return coords;
    } catch (error) {
      console.error(`Geocoding error for address "${address}":`, error);
      // Return null, trip will stay NEW
      return null;
    }
  }

  /**
   * Reverse geocode coordinates to address
   */
  async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    try {
      const response = await axios.get(`${this.nominatimUrl}/reverse`, {
        params: {
          lat,
          lon: lng,
          format: 'json',
        },
        headers: {
          'User-Agent': 'CTC-Sante/1.0',
        },
        timeout: 5000,
      });

      if (!response.data || !response.data.address) {
        return null;
      }

      return response.data.address.road || response.data.address.town || null;
    } catch (error) {
      console.error(`Reverse geocoding error:`, error);
      return null;
    }
  }

  /**
   * Clear cache (useful for testing)
   */
  clearCache(): void {
    this.cache.clear();
  }
}

export const geolocation = new GeolocationService();
