/**
 * Single source of truth for RANGER charging outlets.
 * Pages, JSON-LD, the sitemap and the build-time prerender all read this file.
 * Imagery comes from the cinematic scene set in scenes.js (illustrative brand imagery).
 */
import { SCENES } from './scenes.js';

export const outletsData = [
  {
    id: 'outlet-01',
    outletNumber: '01',
    title: 'RANGER Outlet #01',
    shortName: 'Ayyasagar',
    subTitle: 'Ayyasagar – Srisailam Highway (NH 765)',
    highway: 'NH 765 (Srisailam Highway)',
    locationArea: 'Ramnunthala, Amangal, Rangareddy',
    address: {
      street: 'Ramnunthala, near Ayyasagar Temple, NH 765',
      locality: 'Amangal',
      district: 'Rangareddy',
      region: 'Telangana',
      postalCode: '509321',
      country: 'IN',
    },
    fullAddress: 'Ramnunthala, Amangal, Rangareddy, Telangana – 509321',
    landmark: 'Ayyasagar Temple',
    openedDate: '2026-08-02',
    openedDisplay: '2 August 2026',
    status: 'operational', // 'operational' | 'coming-soon' | 'maintenance'
    isOperational: true,

    coordinates: { lat: 16.9083245, lng: 78.5285002 },

    specs: {
      chargersCount: 2,
      chargerModel: 'RANGER 60 kW DC Fast Charger',
      powerPerCharger: '60 kW',
      powerKw: 60,
      connectorType: 'CCS2',
      gunsPerCharger: 2,
      totalChargingPoints: 4,
      maxSimultaneousEVs: 4,
      tariff: '₹23/kWh',
      tariffPerKwh: 23,
      operatingHours: 'Open 24×7',
    },

    amenities: [
      { id: 'parking', name: 'Parking' },
      { id: 'food', name: 'Café / Food & Refreshments' },
      { id: 'breakfast', name: 'Breakfast' },
      { id: 'wifi', name: 'Free Wi-Fi' },
      { id: 'toilets', name: 'Toilets' },
      { id: 'rest_area', name: 'Waiting & Rest Area' },
    ],

    images: {
      hero: SCENES['hub-night'],
      card: SCENES['charging-hub'],
    },

    /** "The RANGER experience" gallery — illustrative brand imagery. */
    gallery: ['charging-bay', 'hub-night', 'cafe', 'breakfast', 'lounge', 'parking', 'restrooms', 'charger-product', 'highway-journey'].map((n) => SCENES[n]),
  },
];

/** Outlets that are planned but not yet open (shown on the network map as "coming soon"). */
export const plannedCorridors = [];

export const getOutletById = (id) => outletsData.find((o) => o.id === id);

export const directionsUrl = ({ coordinates: { lat, lng } }) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export const mapEmbedUrl = ({ coordinates: { lat, lng } }) =>
  `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

export const operationalCount = () => outletsData.filter((o) => o.status === 'operational').length;
