import type { IGeoService } from '../interfaces';

export const geoGoogleStub: IGeoService = {
  async geocode(query) {
    // TODO: Implement Google Places/Geocoding
    // const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    // const res = await fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
    // );
    // const data = await res.json();
    // return data.results.map(r => ({
    //   lat: r.geometry.location.lat,
    //   lng: r.geometry.location.lng,
    //   label: r.formatted_address,
    // }));
    throw new Error(`[Google Geo] Not implemented. query=${query}`);
  },

  async reverseGeocode(lat, lng) {
    // const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    // const res = await fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    // );
    // const data = await res.json();
    // return { label: data.results[0]?.formatted_address ?? `${lat},${lng}` };
    throw new Error(`[Google Geo] Not implemented. lat=${lat} lng=${lng}`);
  },
};
